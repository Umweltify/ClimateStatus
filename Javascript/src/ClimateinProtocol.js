import { generateNonce, generateHmac } from "./HmacUtils.js";
import { PartnerAppRequestLogModel } from "./PartnerAppRequestLogModel.js";
import { ApiHandlers } from "./ApiHandlers.js";

const ClimateinProtocol = {
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    async getDeviceStatus(appId, appSecret, getDeviceStatusCallback) {
        const deviceId = await this.getDeviceIdFromIndexedDB();
        if (deviceId === undefined || deviceId === null) {
            const sessionId = this.generateSessionId();
            const model = await this.generateModel(appId, appSecret, sessionId);

            ApiHandlers.partnerAppRequestLogRegister(model);
            return ApiHandlers.getDeviceStatus(model, getDeviceStatusCallback);
        }
        else {
            const sessionId = this.generateSessionId();
            const model = await this.generateModel(appId, appSecret, sessionId, deviceId);
            return ApiHandlers.getDeviceStatusByDeviceId(model, getDeviceStatusCallback);
        }

        console.error = () => { };
        console.warn = () => { };
        console.log = () => { };
    },

    generateSessionId() {
        return Math.random().toString(36).substring(2);
    },

    async generateModel(appId, appSecret, sessionId, deviceId="") {
        const nonce = generateNonce();
        const signature = await generateHmac(appId, appSecret, nonce);

        return new PartnerAppRequestLogModel(appId, signature, nonce, "", "", sessionId, deviceId);
    },
    async getDeviceIdFromIndexedDB() {
        return new Promise((resolve, reject) => {

            const request = indexedDB.open('PersistentStorage', 2);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('deviceData')) {
                    db.createObjectStore('deviceData', { keyPath: 'key' });
                }
            };

            request.onsuccess = (event) => {
                const db = event.target.result;

                if (!db.objectStoreNames.contains('deviceData')) {
                    resolve(undefined);
                    return;
                }

                const transaction = db.transaction('deviceData', 'readonly');
                const store = transaction.objectStore('deviceData');
                const getRequest = store.get('DeviceId');

                getRequest.onsuccess = (event) => {
                    if (event.target.result) {
                        resolve(event.target.result.value);
                    } else {
                        resolve(null);
                    }
                };

                getRequest.onerror = (event) => {
                    reject(event.target.error);
                };
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
};

export { ClimateinProtocol }

window.ClimateinProtocol = ClimateinProtocol;