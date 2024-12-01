(function () {
  'use strict';

  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  function generateNonce() {
    return Math.random().toString(36).substring(2);
  }
  function generateHmac(_x, _x2, _x3) {
    return _generateHmac.apply(this, arguments);
  }
  function _generateHmac() {
    _generateHmac = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(appId, appSecret, nonce) {
      var data, signature;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            data = "".concat(appId, ":").concat(nonce);
            HMacGenerator.initializeConstants();
            signature = HMacGenerator.sign(appSecret, data);
            return _context.abrupt("return", HMacGenerator.hex(signature));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _generateHmac.apply(this, arguments);
  }
  var HMacGenerator = {
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
    getFractionalBits: function getFractionalBits(n) {
      return (n - (n | 0)) * this.pow(2, 32) | 0;
    },
    initializeConstants: function initializeConstants() {
      var n = 2,
        nPrime = 0;
      var x = 64;
      while (nPrime < x) {
        // isPrime() was in-lined from its original form to save
        // a few bytes
        var isPrime = true;
        for (var factor = 2; factor <= n / 2; factor++) {
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
    convertEndian: function convertEndian(word) {
      if (this.LittleEndian) {
        return (
          // byte 1 -> byte 4
          word >>> 24 |
          // byte 2 -> byte 3
          (word >>> 16 & 0xff) << 8 |
          // byte 3 -> byte 2
          (word & 0xff00) << 8 |
          // byte 4 -> byte 1
          word << 24
        );
      } else {
        return word;
      }
    },
    rightRotate: function rightRotate(word, bits) {
      return word >>> bits | word << 32 - bits;
    },
    sha256: function sha256(data) {
      var _this = this;
      // Copy default state
      var STATE = this.DEFAULT_STATE.slice();
      var length = data.length;

      // Pad data
      var bitLength = length * 8;
      var newBitLength = 512 - (bitLength + 64) % 512 - 1 + bitLength + 65;
      var bytes = new this.uint8Array(newBitLength / 8);
      var words = new this.uint32Array(bytes.buffer);
      bytes.set(data, 0);
      bytes[length] = 128;
      words[words.length - 1] = this.convertEndian(bitLength);
      for (var block = 0; block < newBitLength / 32; block += 16) {
        var workingState = STATE.slice();
        for (var round = 0; round < 64; round++) {
          var MRound = void 0;
          if (round < 16) {
            MRound = this.convertEndian(words[block + round]);
          } else {
            var gamma0x = this.M[round - 15];
            var gamma1x = this.M[round - 2];
            MRound = this.M[round - 7] + this.M[round - 16] + (this.rightRotate(gamma0x, 7) ^ this.rightRotate(gamma0x, 18) ^ gamma0x >>> 3) + (this.rightRotate(gamma1x, 17) ^ this.rightRotate(gamma1x, 19) ^ gamma1x >>> 10);
          }
          this.M[round] = MRound |= 0;
          var t1 = (this.rightRotate(workingState[4], 6) ^ this.rightRotate(workingState[4], 11) ^ this.rightRotate(workingState[4], 25)) + (workingState[4] & workingState[5] ^ ~workingState[4] & workingState[6]) + workingState[7] + MRound + this.ROUND_CONSTANTS[round];
          var t2 = (this.rightRotate(workingState[0], 2) ^ this.rightRotate(workingState[0], 13) ^ this.rightRotate(workingState[0], 22)) + (workingState[0] & workingState[1] ^ workingState[2] & (workingState[0] ^ workingState[1]));
          for (var i = 7; i > 0; i--) {
            workingState[i] = workingState[i - 1];
          }
          workingState[0] = t1 + t2 | 0;
          workingState[4] = workingState[4] + t1 | 0;
        }
        for (var _round = 0; _round < 8; _round++) {
          STATE[_round] = STATE[_round] + workingState[_round] | 0;
        }
      }
      return new this.uint8Array(new this.uint32Array(STATE.map(function (val) {
        return _this.convertEndian(val);
      })).buffer);
    },
    hmac: function hmac(key, data) {
      if (key.length > 64) {
        key = this.sha256(key);
      }
      if (key.length < 64) {
        var tmp = new Uint8Array(64);
        tmp.set(key, 0);
        key = tmp;
      }
      var innerKey = new Uint8Array(64);
      var outerKey = new Uint8Array(64);
      for (var i = 0; i < 64; i++) {
        innerKey[i] = 0x36 ^ key[i];
        outerKey[i] = 0x5c ^ key[i];
      }
      var msg = new Uint8Array(data.length + 64);
      msg.set(innerKey, 0);
      msg.set(data, 64);
      var result = new Uint8Array(64 + 32);
      result.set(outerKey, 0);
      result.set(this.sha256(msg), 64);
      return this.sha256(result);
    },
    sign: function sign(inputKey, inputData) {
      var encoder = new TextEncoder("utf-8");
      var key = typeof inputKey === "string" ? encoder.encode(inputKey) : inputKey;
      var data = typeof inputData === "string" ? encoder.encode(inputData) : inputData;
      return this.hmac(key, data);
    },
    hash: function hash(str) {
      var encoder = new TextEncoder("utf-8");
      return this.hex(this.sha256(encoder.encode(str)));
    },
    hex: function hex(bin) {
      var x = bin.reduce(function (acc, val) {
        return acc + ("00" + val.toString(16)).slice(-2);
      }, "");
      return x;
    }
  };

  var PartnerAppRequestLogModel = /*#__PURE__*/_createClass(function PartnerAppRequestLogModel(appId, signature, nonce, appUserId, appRequestData, sessionId) {
    var deviceId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
    _classCallCheck(this, PartnerAppRequestLogModel);
    this.AppId = appId || "";
    this.Signature = signature || "";
    this.Nonce = nonce || "";
    this.AppUserId = appUserId || "";
    this.AppRequestData = appRequestData || "";
    this.SessionId = sessionId || "";
    this.deviceId = deviceId || "";
  });

  var ClimateStatus = {
    NotSet: 0,
    NotGreenOnContract: 1,
    NotGreenOnCarbonBudget: 2,
    NotGreenOnBoth: 3,
    NotGreenOnDeviceCarbonBudget: 4,
    GreenOnContract: 5,
    GreenOnCarbonBudget: 6,
    GreenOnBoth: 7,
    GreenOnDeviceCarbonBudget: 8,
    GreenOnEACs: 9
  };
  var ClimateStatusModel = {
    Green: 0,
    Aligned: 1,
    Red: 2,
    Undefined: 9
  };
  function mapClimateStatusToModel(status) {
    switch (status) {
      case ClimateStatus.GreenOnContract:
      case ClimateStatus.GreenOnBoth:
      case ClimateStatus.GreenOnEACs:
        return ClimateStatusModel.Green;
      case ClimateStatus.NotGreenOnContract:
      case ClimateStatus.NotGreenOnCarbonBudget:
      case ClimateStatus.NotGreenOnBoth:
      case ClimateStatus.NotGreenOnDeviceCarbonBudget:
        return ClimateStatusModel.Red;
      case ClimateStatus.GreenOnDeviceCarbonBudget:
      case ClimateStatus.GreenOnCarbonBudget:
      case ClimateStatus.NotSet:
        return ClimateStatusModel.Aligned;
      default:
        return ClimateStatusModel.Undefined;
    }
  }

  var ApiHandlers = {
    partnerAppRequestLogRegister: function partnerAppRequestLogRegister(model) {
      try {
        var queryString = new URLSearchParams(model).toString();
        var fullUrl = "umweltify://v1/partnerAppRequestLogRegister?".concat(queryString);
        this.simulateCustomProtocolCall(fullUrl);
      } catch (_unused) {}
    },
    getDeviceStatus: function getDeviceStatus(model, getDeviceStatusCallback) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var apiUrl, apiKeyName, apiKeyValue, attempt, maxAttempts, timeout, _responseData$Data, _responseData$Data$Cl, _responseData$Data2, _responseData$Data3, response, responseData, isGreen, climateStatusModel, deviceId;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              apiUrl = "https://localhost:7152/v1/PartnerAppProtocol/GetDeviceStatus";
              apiKeyName = "UMWELTIFY-API-KEY";
              apiKeyValue = "n1Sxz6ksSNj3BNnD3pU3AUDu0aSApStd";
              attempt = 0;
              maxAttempts = 20;
              timeout = 1000;
            case 6:
              if (!(attempt < maxAttempts)) {
                _context.next = 36;
                break;
              }
              _context.prev = 7;
              _context.next = 10;
              return fetch(apiUrl, {
                method: "POST",
                headers: _defineProperty({
                  "Content-Type": "application/json"
                }, apiKeyName, apiKeyValue),
                body: JSON.stringify(model)
              });
            case 10:
              response = _context.sent;
              if (response.ok) {
                _context.next = 13;
                break;
              }
              throw new Error("HTTP error! Status: ".concat(response.status));
            case 13:
              _context.next = 15;
              return response.json();
            case 15:
              responseData = _context.sent;
              isGreen = ((_responseData$Data = responseData.Data) === null || _responseData$Data === void 0 ? void 0 : _responseData$Data.IsGreen) || false;
              climateStatusModel = mapClimateStatusToModel((_responseData$Data$Cl = (_responseData$Data2 = responseData.Data) === null || _responseData$Data2 === void 0 ? void 0 : _responseData$Data2.ClimateStatus) !== null && _responseData$Data$Cl !== void 0 ? _responseData$Data$Cl : ClimateStatusModel.Undefined);
              deviceId = (_responseData$Data3 = responseData.Data) === null || _responseData$Data3 === void 0 ? void 0 : _responseData$Data3.DeviceId;
              if (!deviceId) {
                _context.next = 22;
                break;
              }
              _context.next = 22;
              return _this.saveDeviceIdToIndexedDB(deviceId);
            case 22:
              getDeviceStatusCallback(isGreen, climateStatusModel);
              return _context.abrupt("break", 36);
            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](7);
              attempt++;
              if (!(attempt >= maxAttempts)) {
                _context.next = 31;
                break;
              }
              return _context.abrupt("return", {
                isGreen: false,
                climateStatusModel: ClimateStatusModel.Undefined
              });
            case 31:
              _context.next = 33;
              return new Promise(function (resolve) {
                return setTimeout(resolve, timeout);
              });
            case 33:
              timeout += 500;
            case 34:
              _context.next = 6;
              break;
            case 36:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[7, 26]]);
      }))();
    },
    getDeviceStatusByDeviceId: function getDeviceStatusByDeviceId(model, getDeviceStatusCallback) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var apiUrl, apiKeyName, apiKeyValue, _responseData$Data4, _responseData$Data$Cl2, _responseData$Data5, response, responseData, isGreen, climateStatusModel;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              apiUrl = "https://localhost:7152/v1/PartnerAppProtocol/GetDeviceStatusByDeviceId";
              apiKeyName = "UMWELTIFY-API-KEY";
              apiKeyValue = "n1Sxz6ksSNj3BNnD3pU3AUDu0aSApStd";
              _context2.prev = 3;
              _context2.next = 6;
              return fetch(apiUrl, {
                method: "POST",
                headers: _defineProperty({
                  "Content-Type": "application/json"
                }, apiKeyName, apiKeyValue),
                body: JSON.stringify(model)
              });
            case 6:
              response = _context2.sent;
              if (response.ok) {
                _context2.next = 9;
                break;
              }
              throw new Error("HTTP error! Status: ".concat(response.status));
            case 9:
              _context2.next = 11;
              return response.json();
            case 11:
              responseData = _context2.sent;
              isGreen = ((_responseData$Data4 = responseData.Data) === null || _responseData$Data4 === void 0 ? void 0 : _responseData$Data4.IsGreen) || false;
              climateStatusModel = (_responseData$Data$Cl2 = (_responseData$Data5 = responseData.Data) === null || _responseData$Data5 === void 0 ? void 0 : _responseData$Data5.ClimateStatus) !== null && _responseData$Data$Cl2 !== void 0 ? _responseData$Data$Cl2 : ClimateStatusModel.Undefined;
              getDeviceStatusCallback(isGreen, climateStatusModel);
              _context2.next = 20;
              break;
            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", {
                isGreen: false,
                climateStatusModel: ClimateStatusModel.Undefined
              });
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 17]]);
      }))();
    },
    simulateCustomProtocolCall: function simulateCustomProtocolCall(url) {
      var a = document.createElement("a");
      a.href = url;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    saveDeviceIdToIndexedDB: function saveDeviceIdToIndexedDB(deviceId) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                var request = indexedDB.open('PersistentStorage', 2);
                request.onupgradeneeded = function (event) {
                  var db = event.target.result;
                  if (!db.objectStoreNames.contains('deviceData')) {
                    db.createObjectStore('deviceData', {
                      keyPath: 'key'
                    });
                  }
                };
                request.onsuccess = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event) {
                    var db, transaction, store, putRequest;
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          db = event.target.result;
                          transaction = db.transaction('deviceData', 'readwrite');
                          store = transaction.objectStore('deviceData');
                          putRequest = store.put({
                            key: 'DeviceId',
                            value: deviceId
                          });
                          putRequest.onsuccess = function () {
                            resolve();
                          };
                          putRequest.onerror = function (event) {
                            reject(event.target.error);
                          };
                        case 6:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  }));
                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }();
                request.onerror = function (event) {
                  reject(event.target.error);
                };
              }));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    }
  };

  var ClimateinProtocol = {
    delay: function delay(ms) {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve) {
                return setTimeout(resolve, ms);
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    getDeviceStatus: function getDeviceStatus(appId, appSecret, getDeviceStatusCallback) {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var deviceId, sessionId, model, _sessionId, _model;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.getDeviceIdFromIndexedDB();
            case 2:
              deviceId = _context2.sent;
              if (!(deviceId === undefined || deviceId === null)) {
                _context2.next = 12;
                break;
              }
              sessionId = _this.generateSessionId();
              _context2.next = 7;
              return _this.generateModel(appId, appSecret, sessionId);
            case 7:
              model = _context2.sent;
              ApiHandlers.partnerAppRequestLogRegister(model);
              return _context2.abrupt("return", ApiHandlers.getDeviceStatus(model, getDeviceStatusCallback));
            case 12:
              _sessionId = _this.generateSessionId();
              _context2.next = 15;
              return _this.generateModel(appId, appSecret, _sessionId, deviceId);
            case 15:
              _model = _context2.sent;
              return _context2.abrupt("return", ApiHandlers.getDeviceStatusByDeviceId(_model, getDeviceStatusCallback));
            case 17:
              console.error = function () {};
              console.warn = function () {};
              console.log = function () {};
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    generateSessionId: function generateSessionId() {
      return Math.random().toString(36).substring(2);
    },
    generateModel: function generateModel(appId, appSecret, sessionId) {
      var _arguments = arguments;
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var deviceId, nonce, signature;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              deviceId = _arguments.length > 3 && _arguments[3] !== undefined ? _arguments[3] : "";
              nonce = generateNonce();
              _context3.next = 4;
              return generateHmac(appId, appSecret, nonce);
            case 4:
              signature = _context3.sent;
              return _context3.abrupt("return", new PartnerAppRequestLogModel(appId, signature, nonce, "", "", sessionId, deviceId));
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    },
    getDeviceIdFromIndexedDB: function getDeviceIdFromIndexedDB() {
      return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                var request = indexedDB.open('PersistentStorage', 2);
                request.onupgradeneeded = function (event) {
                  var db = event.target.result;
                  if (!db.objectStoreNames.contains('deviceData')) {
                    db.createObjectStore('deviceData', {
                      keyPath: 'key'
                    });
                  }
                };
                request.onsuccess = function (event) {
                  var db = event.target.result;
                  if (!db.objectStoreNames.contains('deviceData')) {
                    resolve(undefined);
                    return;
                  }
                  var transaction = db.transaction('deviceData', 'readonly');
                  var store = transaction.objectStore('deviceData');
                  var getRequest = store.get('DeviceId');
                  getRequest.onsuccess = function (event) {
                    if (event.target.result) {
                      resolve(event.target.result.value);
                    } else {
                      resolve(null);
                    }
                  };
                  getRequest.onerror = function (event) {
                    reject(event.target.error);
                  };
                };
                request.onerror = function (event) {
                  reject(event.target.error);
                };
              }));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    }
  };
  window.ClimateinProtocol = ClimateinProtocol;

  window.ClimateinProtocol = ClimateinProtocol;

  //export {
  //    ClimateinProtocol,
  //    generateNonce, generateHmac,
  //    PartnerAppRequestLogModel,
  //    ApiHandlers
  //}

})();
//# sourceMappingURL=bundle.js.map
