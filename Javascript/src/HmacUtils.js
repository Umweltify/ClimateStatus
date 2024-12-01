function generateNonce() {
    return Math.random().toString(36).substring(2);
}

async function generateHmac(appId, appSecret, nonce) {
    const data = `${appId}:${nonce}`
    HMacGenerator.initializeConstants();
    const signature = HMacGenerator.sign(appSecret, data);
    return HMacGenerator.hex(signature);
}


const HMacGenerator = {
    // To ensure cross-browser support even without a proper SubtleCrypto
    // implementation (or without access to the implementation, as is the case with
    // Chrome loaded over HTTP instead of HTTPS), this library can create SHA-256
    // HMAC signatures using nothing but raw JavaScript

    /* eslint-disable no-magic-numbers, id-length, no-param-reassign, new-cap */

    // By giving internal names that we can mangle, future calls to
    // them are reduced to a single byte (minor space savings in minified file)
    uint8Array: Uint8Array,
    uint32Array: Uint32Array,
    pow: Math.pow,

    // Will be initialized below
    // Using a Uint32Array instead of a simple array makes the minified code
    // a bit bigger (we lose our `unshift()` hack), but comes with huge
    // performance gains
    DEFAULT_STATE: new Uint32Array(8),
    ROUND_CONSTANTS: [],

    // Reusable object for expanded message
    // Using a Uint32Array instead of a simple array makes the minified code
    // 7 bytes larger, but comes with huge performance gains
    M: new Uint32Array(64),

    // After minification the code to compute the default state and round
    // constants is smaller than the output. More importantly, this serves as a
    // good educational aide for anyone wondering where the magic numbers come
    // from. No magic numbers FTW!
    getFractionalBits(n) {
        return ((n - (n | 0)) * this.pow(2, 32)) | 0;
    },

    initializeConstants() {
        let n = 2, nPrime = 0;
        const x = 64;

        while (nPrime < x) {
            // isPrime() was in-lined from its original form to save
            // a few bytes
            let isPrime = true;

            for (let factor = 2; factor <= n / 2; factor++) {
                if (n % factor === 0) {
                    isPrime = false;
                }
            }
            if (isPrime) {
                if (nPrime < 8) {
                    this.DEFAULT_STATE[nPrime] = this.getFractionalBits(this.pow(n, 1 / 2));
                }
                this.ROUND_CONSTANTS[nPrime] = this.getFractionalBits(this.pow(n, 1 / 3));
                nPrime++;
            }

            n++;
        }
    },

    // For cross-platform support we need to ensure that all 32-bit words are
    // in the same endianness. A UTF-8 TextEncoder will return BigEndian data,
    // so upon reading or writing to our ArrayBuffer we'll only swap the bytes
    // if our system is LittleEndian (which is about 99% of CPUs)
    LittleEndian: !!new Uint8Array(new Uint32Array([1]).buffer)[0],

    convertEndian(word) {
        if (this.LittleEndian) {
            return (
                // byte 1 -> byte 4
                (word >>> 24) |
                // byte 2 -> byte 3
                (((word >>> 16) & 0xff) << 8) |
                // byte 3 -> byte 2
                ((word & 0xff00) << 8) |
                // byte 4 -> byte 1
                (word << 24)
            );
        } else {
            return word;
        }
    },

    rightRotate(word, bits) {
        return (word >>> bits) | (word << (32 - bits));
    },

    sha256(data) {
        // Copy default state
        const STATE = this.DEFAULT_STATE.slice();

        const length = data.length;

        // Pad data
        const bitLength = length * 8;
        const newBitLength = (512 - ((bitLength + 64) % 512) - 1) + bitLength + 65;

        const bytes = new this.uint8Array(newBitLength / 8);
        const words = new this.uint32Array(bytes.buffer);

        bytes.set(data, 0);
        bytes[length] = 0b10000000;
        words[words.length - 1] = this.convertEndian(bitLength);

        for (let block = 0; block < newBitLength / 32; block += 16) {
            const workingState = STATE.slice();

            for (let round = 0; round < 64; round++) {
                let MRound;
                if (round < 16) {
                    MRound = this.convertEndian(words[block + round]);
                } else {
                    const gamma0x = this.M[round - 15];
                    const gamma1x = this.M[round - 2];
                    MRound = this.M[round - 7] + this.M[round - 16] +
                        (this.rightRotate(gamma0x, 7) ^ this.rightRotate(gamma0x, 18) ^ (gamma0x >>> 3)) +
                        (this.rightRotate(gamma1x, 17) ^ this.rightRotate(gamma1x, 19) ^ (gamma1x >>> 10));
                }

                this.M[round] = MRound |= 0;

                const t1 =
                    (this.rightRotate(workingState[4], 6) ^ this.rightRotate(workingState[4], 11) ^ this.rightRotate(workingState[4], 25)) +
                    ((workingState[4] & workingState[5]) ^ (~workingState[4] & workingState[6])) +
                    workingState[7] + MRound + this.ROUND_CONSTANTS[round];
                const t2 =
                    (this.rightRotate(workingState[0], 2) ^ this.rightRotate(workingState[0], 13) ^ this.rightRotate(workingState[0], 22)) +
                    ((workingState[0] & workingState[1]) ^ (workingState[2] & (workingState[0] ^ workingState[1])));

                for (let i = 7; i > 0; i--) {
                    workingState[i] = workingState[i - 1];
                }
                workingState[0] = (t1 + t2) | 0;
                workingState[4] = (workingState[4] + t1) | 0;
            }

            for (let round = 0; round < 8; round++) {
                STATE[round] = (STATE[round] + workingState[round]) | 0;
            }
        }

        return new this.uint8Array(new this.uint32Array(
            STATE.map((val) => this.convertEndian(val))
        ).buffer);
    },

    hmac(key, data) {
        if (key.length > 64) {
            key = this.sha256(key);
        }

        if (key.length < 64) {
            const tmp = new Uint8Array(64);
            tmp.set(key, 0);
            key = tmp;
        }

        const innerKey = new Uint8Array(64);
        const outerKey = new Uint8Array(64);
        for (let i = 0; i < 64; i++) {
            innerKey[i] = 0x36 ^ key[i];
            outerKey[i] = 0x5c ^ key[i];
        }

        const msg = new Uint8Array(data.length + 64);
        msg.set(innerKey, 0);
        msg.set(data, 64);

        const result = new Uint8Array(64 + 32);
        result.set(outerKey, 0);
        result.set(this.sha256(msg), 64);

        return this.sha256(result);
    },

    sign(inputKey, inputData) {
        const encoder = new TextEncoder("utf-8");
        const key = typeof inputKey === "string" ? encoder.encode(inputKey) : inputKey;
        const data = typeof inputData === "string" ? encoder.encode(inputData) : inputData;
        return this.hmac(key, data);
    },

    hash(str) {
        const encoder = new TextEncoder("utf-8");
        return this.hex(this.sha256(encoder.encode(str)));
    },

    hex(bin) {
        let x = bin.reduce((acc, val) =>
            acc + ("00" + val.toString(16)).slice(-2), "");
        return x;
    }
};

export { generateNonce, generateHmac, HMacGenerator };