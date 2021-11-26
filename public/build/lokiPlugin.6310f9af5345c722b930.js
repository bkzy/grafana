(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lokiPlugin"],{

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/lodash/escapeRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/escapeRegExp.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = toString(string);
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
}

module.exports = escapeRegExp;


/***/ }),

/***/ "./node_modules/md5/md5.js":
/*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
      utf8 = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8,
      isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js"),
      bin = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js ***!
  \*****************************************************************************/
/*! exports provided: WebSocketSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketSubject", function() { return WebSocketSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ReplaySubject */ "./node_modules/rxjs/_esm5/internal/ReplaySubject.js");
/** PURE_IMPORTS_START tslib,_.._Subject,_.._Subscriber,_.._Observable,_.._Subscription,_.._ReplaySubject PURE_IMPORTS_END */






var DEFAULT_WEBSOCKET_CONFIG = {
    url: '',
    deserializer: function (e) { return JSON.parse(e.data); },
    serializer: function (value) { return JSON.stringify(value); },
};
var WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT = 'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }';
var WebSocketSubject = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WebSocketSubject, _super);
    function WebSocketSubject(urlConfigOrSource, destination) {
        var _this = _super.call(this) || this;
        if (urlConfigOrSource instanceof _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"]) {
            _this.destination = destination;
            _this.source = urlConfigOrSource;
        }
        else {
            var config = _this._config = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DEFAULT_WEBSOCKET_CONFIG);
            _this._output = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
            if (typeof urlConfigOrSource === 'string') {
                config.url = urlConfigOrSource;
            }
            else {
                for (var key in urlConfigOrSource) {
                    if (urlConfigOrSource.hasOwnProperty(key)) {
                        config[key] = urlConfigOrSource[key];
                    }
                }
            }
            if (!config.WebSocketCtor && WebSocket) {
                config.WebSocketCtor = WebSocket;
            }
            else if (!config.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            _this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
        return _this;
    }
    WebSocketSubject.prototype.lift = function (operator) {
        var sock = new WebSocketSubject(this._config, this.destination);
        sock.operator = operator;
        sock.source = this;
        return sock;
    };
    WebSocketSubject.prototype._resetState = function () {
        this._socket = null;
        if (!this.source) {
            this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
        this._output = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    };
    WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
        var self = this;
        return new _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            try {
                self.next(subMsg());
            }
            catch (err) {
                observer.error(err);
            }
            var subscription = self.subscribe(function (x) {
                try {
                    if (messageFilter(x)) {
                        observer.next(x);
                    }
                }
                catch (err) {
                    observer.error(err);
                }
            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
            return function () {
                try {
                    self.next(unsubMsg());
                }
                catch (err) {
                    observer.error(err);
                }
                subscription.unsubscribe();
            };
        });
    };
    WebSocketSubject.prototype._connectSocket = function () {
        var _this = this;
        var _a = this._config, WebSocketCtor = _a.WebSocketCtor, protocol = _a.protocol, url = _a.url, binaryType = _a.binaryType;
        var observer = this._output;
        var socket = null;
        try {
            socket = protocol ?
                new WebSocketCtor(url, protocol) :
                new WebSocketCtor(url);
            this._socket = socket;
            if (binaryType) {
                this._socket.binaryType = binaryType;
            }
        }
        catch (e) {
            observer.error(e);
            return;
        }
        var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_4__["Subscription"](function () {
            _this._socket = null;
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        });
        socket.onopen = function (e) {
            var _socket = _this._socket;
            if (!_socket) {
                socket.close();
                _this._resetState();
                return;
            }
            var openObserver = _this._config.openObserver;
            if (openObserver) {
                openObserver.next(e);
            }
            var queue = _this.destination;
            _this.destination = _Subscriber__WEBPACK_IMPORTED_MODULE_2__["Subscriber"].create(function (x) {
                if (socket.readyState === 1) {
                    try {
                        var serializer = _this._config.serializer;
                        socket.send(serializer(x));
                    }
                    catch (e) {
                        _this.destination.error(e);
                    }
                }
            }, function (e) {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                if (e && e.code) {
                    socket.close(e.code, e.reason);
                }
                else {
                    observer.error(new TypeError(WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT));
                }
                _this._resetState();
            }, function () {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                socket.close();
                _this._resetState();
            });
            if (queue && queue instanceof _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]) {
                subscription.add(queue.subscribe(_this.destination));
            }
        };
        socket.onerror = function (e) {
            _this._resetState();
            observer.error(e);
        };
        socket.onclose = function (e) {
            _this._resetState();
            var closeObserver = _this._config.closeObserver;
            if (closeObserver) {
                closeObserver.next(e);
            }
            if (e.wasClean) {
                observer.complete();
            }
            else {
                observer.error(e);
            }
        };
        socket.onmessage = function (e) {
            try {
                var deserializer = _this._config.deserializer;
                observer.next(deserializer(e));
            }
            catch (err) {
                observer.error(err);
            }
        };
    };
    WebSocketSubject.prototype._subscribe = function (subscriber) {
        var _this = this;
        var source = this.source;
        if (source) {
            return source.subscribe(subscriber);
        }
        if (!this._socket) {
            this._connectSocket();
        }
        this._output.subscribe(subscriber);
        subscriber.add(function () {
            var _socket = _this._socket;
            if (_this._output.observers.length === 0) {
                if (_socket && _socket.readyState === 1) {
                    _socket.close();
                }
                _this._resetState();
            }
        });
        return subscriber;
    };
    WebSocketSubject.prototype.unsubscribe = function () {
        var _socket = this._socket;
        if (_socket && _socket.readyState === 1) {
            _socket.close();
        }
        this._resetState();
        _super.prototype.unsubscribe.call(this);
    };
    return WebSocketSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["AnonymousSubject"]));

//# sourceMappingURL=WebSocketSubject.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js ***!
  \**********************************************************************/
/*! exports provided: webSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webSocket", function() { return webSocket; });
/* harmony import */ var _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebSocketSubject */ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js");
/** PURE_IMPORTS_START _WebSocketSubject PURE_IMPORTS_END */

function webSocket(urlConfigOrSource) {
    return new _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__["WebSocketSubject"](urlConfigOrSource);
}
//# sourceMappingURL=webSocket.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/webSocket/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/_esm5/webSocket/index.js ***!
  \****************************************************/
/*! exports provided: webSocket, WebSocketSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_observable_dom_webSocket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/observable/dom/webSocket */ "./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "webSocket", function() { return _internal_observable_dom_webSocket__WEBPACK_IMPORTED_MODULE_0__["webSocket"]; });

/* harmony import */ var _internal_observable_dom_WebSocketSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/observable/dom/WebSocketSubject */ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebSocketSubject", function() { return _internal_observable_dom_WebSocketSubject__WEBPACK_IMPORTED_MODULE_1__["WebSocketSubject"]; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx":
/*!*************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx ***!
  \*************************************************************************/
/*! exports provided: LokiAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiAnnotationsQueryCtrl", function() { return LokiAnnotationsQueryCtrl; });
/**
 * Just a simple wrapper for a react component that is actually implementing the query editor.
 */
var LokiAnnotationsQueryCtrl = /** @class */ (function () {
    /** @ngInject */
    function LokiAnnotationsQueryCtrl() {
        this.annotation.target = this.annotation.target || {};
        this.onQueryChange = this.onQueryChange.bind(this);
    }
    LokiAnnotationsQueryCtrl.prototype.onQueryChange = function (expr) {
        this.annotation.expr = expr;
    };
    LokiAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return LokiAnnotationsQueryCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");




var DEFAULT_EXAMPLES = ['{job="default/prometheus"}'];
var PREFERRED_LABELS = ['job', 'app', 'k8s_app'];
var EXAMPLES_LIMIT = 5;
var LOGQL_EXAMPLES = [
    {
        title: 'Count over time',
        expression: 'count_over_time({job="mysql"}[5m])',
        label: 'This query counts all the log lines within the last five minutes for the MySQL job.',
    },
    {
        title: 'Rate',
        expression: 'rate(({job="mysql"} |= "error" != "timeout")[10s])',
        label: 'This query gets the per-second rate of all non-timeout errors within the last ten seconds for the MySQL job.',
    },
    {
        title: 'Aggregate, count, and group',
        expression: 'sum(count_over_time({job="mysql"}[5m])) by (level)',
        label: 'Get the count of logs during the last five minutes, grouping by level.',
    },
];
var LokiCheatSheet = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LokiCheatSheet, _super);
    function LokiCheatSheet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            userExamples: DEFAULT_EXAMPLES,
        };
        _this.checkUserLabels = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var provider, labels_1, preferredLabel_1, values, userExamples;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = this.props.datasource.languageProvider;
                        if (!provider.started) return [3 /*break*/, 3];
                        labels_1 = provider.getLabelKeys() || [];
                        preferredLabel_1 = PREFERRED_LABELS.find(function (l) { return labels_1.includes(l); });
                        if (!preferredLabel_1) return [3 /*break*/, 2];
                        return [4 /*yield*/, provider.getLabelValues(preferredLabel_1)];
                    case 1:
                        values = _a.sent();
                        userExamples = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["shuffle"])(values)
                            .slice(0, EXAMPLES_LIMIT)
                            .map(function (value) { return "{" + preferredLabel_1 + "=\"" + value + "\"}"; });
                        this.setState({ userExamples: userExamples });
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        this.scheduleUserLabelChecking();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    LokiCheatSheet.prototype.componentDidMount = function () {
        this.scheduleUserLabelChecking();
    };
    LokiCheatSheet.prototype.componentWillUnmount = function () {
        clearTimeout(this.userLabelTimer);
    };
    LokiCheatSheet.prototype.scheduleUserLabelChecking = function () {
        this.userLabelTimer = setTimeout(this.checkUserLabels, 1000);
    };
    LokiCheatSheet.prototype.renderExpression = function (expr) {
        var onClickExample = this.props.onClickExample;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__example", key: expr, onClick: function (e) { return onClickExample({ refId: 'A', expr: expr }); } },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, expr)));
    };
    LokiCheatSheet.prototype.renderLogsCheatSheet = function () {
        var _this = this;
        var userExamples = this.state.userExamples;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Loki Cheat Sheet"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__title" }, "See your logs"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, "Start by selecting a log stream from the Log labels selector."),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, "Alternatively, you can write a stream selector into the query field:"),
                this.renderExpression('{job="default/prometheus"}'),
                userExamples !== DEFAULT_EXAMPLES && userExamples.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, "Here are some example streams from your logs:"),
                    userExamples.map(function (example) { return _this.renderExpression(example); }))) : null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__title" }, "Combine stream selectors"),
                this.renderExpression('{app="cassandra",namespace="prod"}'),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, "Returns all log lines from streams that have both labels.")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__title" }, "Filtering for search terms."),
                this.renderExpression('{app="cassandra"} |~ "(duration|latency)s*(=|is|of)s*[d.]+"'),
                this.renderExpression('{app="cassandra"} |= "exact match"'),
                this.renderExpression('{app="cassandra"} != "do not match"'),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "https://github.com/grafana/loki/blob/master/docs/logql.md#filter-expression", target: "logql" }, "LogQL"),
                    ' ',
                    "supports exact and regular expression filters."))));
    };
    LokiCheatSheet.prototype.renderMetricsCheatSheet = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "LogQL Cheat Sheet"),
            LOGQL_EXAMPLES.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item", key: item.expression },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__title" }, item.title),
                _this.renderExpression(item.expression),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, item.label))); })));
    };
    LokiCheatSheet.prototype.render = function () {
        var exploreMode = this.props.exploreMode;
        return exploreMode === app_types__WEBPACK_IMPORTED_MODULE_3__["ExploreMode"].Logs ? this.renderLogsCheatSheet() : this.renderMetricsCheatSheet();
    };
    return LokiCheatSheet;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (LokiCheatSheet);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx ***!
  \***************************************************************************/
/*! exports provided: LokiQueryEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiQueryEditor", function() { return LokiQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LokiQueryField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LokiQueryField */ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx");
/* harmony import */ var _useLokiSyntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useLokiSyntax */ "./public/app/plugins/datasource/loki/components/useLokiSyntax.ts");

// Libraries



var LokiQueryEditor = Object(react__WEBPACK_IMPORTED_MODULE_1__["memo"])(function LokiQueryEditor(props) {
    var query = props.query, data = props.data, datasource = props.datasource, onChange = props.onChange, onRunQuery = props.onRunQuery;
    var absolute;
    if (data && data.request) {
        var range = data.request.range;
        absolute = {
            from: range.from.valueOf(),
            to: range.to.valueOf(),
        };
    }
    else {
        absolute = {
            from: Date.now() - 10000,
            to: Date.now(),
        };
    }
    var _a = Object(_useLokiSyntax__WEBPACK_IMPORTED_MODULE_3__["useLokiSyntax"])(datasource.languageProvider, absolute), isSyntaxReady = _a.isSyntaxReady, setActiveOption = _a.setActiveOption, refreshLabels = _a.refreshLabels, syntaxProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["isSyntaxReady", "setActiveOption", "refreshLabels"]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LokiQueryField__WEBPACK_IMPORTED_MODULE_2__["LokiQueryField"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ datasource: datasource, query: query, onChange: onChange, onRunQuery: onRunQuery, history: [], data: data, onLoadOptions: setActiveOption, onLabelsRefresh: refreshLabels, syntaxLoaded: isSyntaxReady, absoluteRange: absolute }, syntaxProps))));
});
/* harmony default export */ __webpack_exports__["default"] = (LokiQueryEditor);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiQueryField.tsx ***!
  \**************************************************************************/
/*! exports provided: LokiQueryField, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiQueryField", function() { return LokiQueryField; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LokiQueryFieldForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LokiQueryFieldForm */ "./public/app/plugins/datasource/loki/components/LokiQueryFieldForm.tsx");
/* harmony import */ var _useLokiSyntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useLokiSyntax */ "./public/app/plugins/datasource/loki/components/useLokiSyntax.ts");




var LokiQueryField = function (_a) {
    var datasource = _a.datasource, otherProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["datasource"]);
    var _b = Object(_useLokiSyntax__WEBPACK_IMPORTED_MODULE_3__["useLokiSyntax"])(datasource.languageProvider, otherProps.absoluteRange), isSyntaxReady = _b.isSyntaxReady, setActiveOption = _b.setActiveOption, refreshLabels = _b.refreshLabels, syntaxProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_b, ["isSyntaxReady", "setActiveOption", "refreshLabels"]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LokiQueryFieldForm__WEBPACK_IMPORTED_MODULE_2__["LokiQueryFieldForm"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ datasource: datasource, syntaxLoaded: isSyntaxReady, 
        /**
         * setActiveOption name is intentional. Because of the way rc-cascader requests additional data
         * https://github.com/react-component/cascader/blob/master/src/Cascader.jsx#L165
         * we are notyfing useLokiSyntax hook, what the active option is, and then it's up to the hook logic
         * to fetch data of options that aren't fetched yet
         */
        onLoadOptions: setActiveOption, onLabelsRefresh: refreshLabels }, syntaxProps, otherProps)));
};
/* harmony default export */ __webpack_exports__["default"] = (LokiQueryField);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/ConfigEditor.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/ConfigEditor.tsx ***!
  \***************************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _MaxLinesField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MaxLinesField */ "./public/app/plugins/datasource/loki/configuration/MaxLinesField.tsx");
/* harmony import */ var _DerivedFields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DerivedFields */ "./public/app/plugins/datasource/loki/configuration/DerivedFields.tsx");





var makeJsonUpdater = function (field) { return function (options, value) {
    var _a;
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), (_a = {}, _a[field] = value, _a)) });
}; };
var setMaxLines = makeJsonUpdater('maxLines');
var setDerivedFields = makeJsonUpdater('derivedFields');
var ConfigEditor = function (props) {
    var options = props.options, onOptionsChange = props.onOptionsChange;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DataSourceHttpSettings"], { defaultUrl: 'http://localhost:3100', dataSourceConfig: options, showAccessOptions: false, onChange: onOptionsChange }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MaxLinesField__WEBPACK_IMPORTED_MODULE_3__["MaxLinesField"], { value: options.jsonData.maxLines, onChange: function (value) { return onOptionsChange(setMaxLines(options, value)); } })))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DerivedFields__WEBPACK_IMPORTED_MODULE_4__["DerivedFields"], { value: options.jsonData.derivedFields, onChange: function (value) { return onOptionsChange(setDerivedFields(options, value)); } })));
};


/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/DebugSection.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/DebugSection.tsx ***!
  \***************************************************************************/
/*! exports provided: DebugSection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebugSection", function() { return DebugSection; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _features_panel_panellinks_linkSuppliers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../features/panel/panellinks/linkSuppliers */ "./public/app/features/panel/panellinks/linkSuppliers.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");







var DebugSection = function (props) {
    var derivedFields = props.derivedFields, className = props.className;
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(''), 2), debugText = _a[0], setDebugText = _a[1];
    var debugFields = [];
    if (debugText && derivedFields) {
        debugFields = makeDebugFields(derivedFields, debugText);
    }
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["FormField"], { labelWidth: 12, label: 'Debug log message', inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("textarea", { placeholder: 'Paste an example log line here to test the regular expressions of your derived fields', className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('gf-form-input gf-form-textarea', Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n                width: 100%;\n              "], ["\n                width: 100%;\n              "])))), value: debugText, onChange: function (event) { return setDebugText(event.currentTarget.value); } }) }),
        !!debugFields.length && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(DebugFields, { fields: debugFields })));
};
var DebugFields = function (_a) {
    var fields = _a.fields;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: 'filter-table' },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Name"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Value"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Url"))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, fields.map(function (field) {
            var value = field.value;
            if (field.error) {
                value = field.error.message;
            }
            else if (field.href) {
                value = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: field.href }, value);
            }
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: field.name + "=" + field.value },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, field.name),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, value),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, field.href ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: field.href }, field.href) : '')));
        }))));
};
function makeDebugFields(derivedFields, debugText) {
    return derivedFields
        .filter(function (field) { return field.name && field.matcherRegex; })
        .map(function (field) {
        try {
            var testMatch = debugText.match(field.matcherRegex);
            var value = testMatch && testMatch[1];
            var link = void 0;
            if (field.url && value) {
                link = Object(_features_panel_panellinks_linkSuppliers__WEBPACK_IMPORTED_MODULE_5__["getLinksFromLogsField"])({
                    name: '',
                    type: _grafana_data__WEBPACK_IMPORTED_MODULE_6__["FieldType"].string,
                    values: new _grafana_data__WEBPACK_IMPORTED_MODULE_6__["ArrayVector"]([value]),
                    config: {
                        links: [{ title: '', url: field.url }],
                    },
                }, 0)[0];
            }
            return {
                name: field.name,
                value: value || '<no match>',
                href: link && link.href,
            };
        }
        catch (error) {
            return {
                name: field.name,
                error: error,
            };
        }
    });
}
var templateObject_1;


/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/DerivedField.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/DerivedField.tsx ***!
  \***************************************************************************/
/*! exports provided: DerivedField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DerivedField", function() { return DerivedField; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");




var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function () { return ({
    firstRow: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    display: flex;\n    align-items: baseline;\n  "], ["\n    display: flex;\n    align-items: baseline;\n  "]))),
    nameField: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    flex: 2;\n  "], ["\n    flex: 2;\n  "]))),
    regexField: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    flex: 3;\n  "], ["\n    flex: 3;\n  "]))),
}); });
var DerivedField = function (props) {
    var value = props.value, onChange = props.onChange, onDelete = props.onDelete, suggestions = props.suggestions, className = props.className;
    var styles = getStyles();
    var handleChange = function (field) { return function (event) {
        var _a;
        onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), (_a = {}, _a[field] = event.currentTarget.value, _a)));
    }; };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: styles.firstRow },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormField"], { className: styles.nameField, labelWidth: 5, 
                // A bit of a hack to prevent using default value for the width from FormField
                inputWidth: null, label: "Name", type: "text", value: value.name, onChange: handleChange('name') }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormField"], { className: styles.regexField, inputWidth: null, label: "Regex", type: "text", value: value.matcherRegex, onChange: handleChange('matcherRegex'), tooltip: 'Use to parse and capture some part of the log message. You can use the captured groups in the template.' }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'inverse', title: "Remove field", icon: 'fa fa-times', onClick: function (event) {
                    event.preventDefault();
                    onDelete();
                }, className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n            margin-left: 8px;\n          "], ["\n            margin-left: 8px;\n          "]))) })),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormField"], { label: "URL", labelWidth: 5, inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DataLinkInput"], { placeholder: 'http://example.com/${__value.raw}', value: value.url || '', onChange: function (newValue) {
                    return onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), { url: newValue }));
                }, suggestions: suggestions }), className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n          width: 100%;\n        "], ["\n          width: 100%;\n        "]))) })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;


/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/DerivedFields.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/DerivedFields.tsx ***!
  \****************************************************************************/
/*! exports provided: DerivedFields */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DerivedFields", function() { return DerivedFields; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _DerivedField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DerivedField */ "./public/app/plugins/datasource/loki/configuration/DerivedField.tsx");
/* harmony import */ var _DebugSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DebugSection */ "./public/app/plugins/datasource/loki/configuration/DebugSection.tsx");






var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function (theme) { return ({
    infoText: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    padding-bottom: ", ";\n    color: ", ";\n  "], ["\n    padding-bottom: ", ";\n    color: ", ";\n  "])), theme.spacing.md, theme.colors.textWeak),
    derivedField: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    margin-bottom: ", ";\n  "], ["\n    margin-bottom: ", ";\n  "])), theme.spacing.sm),
}); });
var DerivedFields = function (props) {
    var value = props.value, onChange = props.onChange;
    var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["useTheme"])();
    var styles = getStyles(theme);
    var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false), 2), showDebug = _a[0], setShowDebug = _a[1];
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Derived fields"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: styles.infoText }, "Derived fields can be used to extract new fields from the log message and create link from it's value."),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            value &&
                value.map(function (field, index) {
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DerivedField__WEBPACK_IMPORTED_MODULE_4__["DerivedField"], { className: styles.derivedField, key: index, value: field, onChange: function (newField) {
                            var newDerivedFields = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(value);
                            newDerivedFields.splice(index, 1, newField);
                            onChange(newDerivedFields);
                        }, onDelete: function () {
                            var newDerivedFields = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(value);
                            newDerivedFields.splice(index, 1);
                            onChange(newDerivedFields);
                        }, suggestions: [
                            {
                                value: _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DataLinkBuiltInVars"].valueRaw,
                                label: 'Raw value',
                                documentation: 'Exact string captured by the regular expression',
                                origin: _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["VariableOrigin"].Value,
                            },
                        ] }));
                }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'inverse', className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n              margin-right: 10px;\n            "], ["\n              margin-right: 10px;\n            "]))), icon: "fa fa-plus", onClick: function (event) {
                        event.preventDefault();
                        var newDerivedFields = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])((value || []), [{ name: '', matcherRegex: '' }]);
                        onChange(newDerivedFields);
                    } }, "Add"),
                value && value.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: "inverse", onClick: function () { return setShowDebug(!showDebug); } }, showDebug ? 'Hide example log message' : 'Show example log message')))),
        showDebug && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DebugSection__WEBPACK_IMPORTED_MODULE_5__["DebugSection"], { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n              margin-bottom: 10px;\n            "], ["\n              margin-bottom: 10px;\n            "]))), derivedFields: value })))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;


/***/ }),

/***/ "./public/app/plugins/datasource/loki/configuration/MaxLinesField.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/configuration/MaxLinesField.tsx ***!
  \****************************************************************************/
/*! exports provided: MaxLinesField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxLinesField", function() { return MaxLinesField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var MaxLinesField = function (props) {
    var value = props.value, onChange = props.onChange;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["FormField"], { label: "Maximum lines", labelWidth: 11, inputWidth: 20, inputEl: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { type: "number", className: "gf-form-input width-8 gf-form-input--has-help-icon", value: value, onChange: function (event) { return onChange(event.currentTarget.value); }, spellCheck: false, placeholder: "1000" }), tooltip: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "Loki queries must contain a limit of the maximum number of lines returned (default: 1000). Increase this limit to have a bigger result set for ad-hoc analysis. Decrease this limit if your browser becomes sluggish when displaying the log results.") }));
};


/***/ }),

/***/ "./public/app/plugins/datasource/loki/datasource.ts":
/*!**********************************************************!*\
  !*** ./public/app/plugins/datasource/loki/datasource.ts ***!
  \**********************************************************/
/*! exports provided: DEFAULT_MAX_LINES, LEGACY_LOKI_ENDPOINT, LOKI_ENDPOINT, LokiDatasource, lokiRegularEscape, lokiSpecialRegexEscape, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MAX_LINES", function() { return DEFAULT_MAX_LINES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LEGACY_LOKI_ENDPOINT", function() { return LEGACY_LOKI_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOKI_ENDPOINT", function() { return LOKI_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiDatasource", function() { return LokiDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiRegularEscape", function() { return lokiRegularEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiSpecialRegexEscape", function() { return lokiSpecialRegexEscape; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/plugins/datasource/prometheus/add_label_to_query */ "./public/app/plugins/datasource/prometheus/add_label_to_query.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/loki/result_transformer.ts");
/* harmony import */ var _query_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./query_utils */ "./public/app/plugins/datasource/loki/query_utils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/loki/types.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _live_streams__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./live_streams */ "./public/app/plugins/datasource/loki/live_streams.ts");
/* harmony import */ var _language_provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./language_provider */ "./public/app/plugins/datasource/loki/language_provider.ts");

// Libraries



// Services & Utils





// Types





var DEFAULT_MAX_LINES = 1000;
var LEGACY_LOKI_ENDPOINT = '/api/prom';
var LOKI_ENDPOINT = '/loki/api/v1';
var LEGACY_QUERY_ENDPOINT = LEGACY_LOKI_ENDPOINT + "/query";
var RANGE_QUERY_ENDPOINT = LOKI_ENDPOINT + "/query_range";
var INSTANT_QUERY_ENDPOINT = LOKI_ENDPOINT + "/query";
var DEFAULT_QUERY_PARAMS = {
    direction: 'BACKWARD',
    limit: DEFAULT_MAX_LINES,
    regexp: '',
    query: '',
};
function serializeParams(data) {
    return Object.keys(data)
        .map(function (k) { return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]); })
        .join('&');
}
var LokiDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LokiDatasource, _super);
    /** @ngInject */
    function LokiDatasource(instanceSettings, backendSrv, templateSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.instanceSettings = instanceSettings;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.streams = new _live_streams__WEBPACK_IMPORTED_MODULE_11__["LiveStreams"]();
        _this.runLegacyQuery = function (target, options) {
            if (target.liveStreaming) {
                return _this.runLiveQuery(target, options);
            }
            var range = options.range
                ? { start: _this.getTime(options.range.from, false), end: _this.getTime(options.range.to, true) }
                : {};
            var query = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, DEFAULT_QUERY_PARAMS), Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["parseQuery"])(target.expr)), range), { limit: Math.min(options.maxDataPoints || Infinity, _this.maxLines), refId: target.refId });
            return _this._request(LEGACY_QUERY_ENDPOINT, query).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) { return _this.throwUnless(err, err.cancelled, target); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (response) { return !response.cancelled; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) { return ({
                data: Object(_result_transformer__WEBPACK_IMPORTED_MODULE_7__["lokiLegacyStreamsToDataframes"])(response.data, query, _this.maxLines, _this.instanceSettings.jsonData, options.reverse),
                key: target.refId + "_log",
            }); }));
        };
        _this.runInstantQuery = function (target, options, responseListLength) {
            var timeNs = _this.getTime(options.range.to, true);
            var query = {
                query: Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["parseQuery"])(target.expr).query,
                time: "" + (timeNs + (1e9 - (timeNs % 1e9))),
                limit: Math.min(options.maxDataPoints || Infinity, _this.maxLines),
            };
            return _this._request(INSTANT_QUERY_ENDPOINT, query).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) { return _this.throwUnless(err, err.cancelled, target); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (response) { return (response.cancelled ? false : true); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
                if (response.data.data.resultType === _types__WEBPACK_IMPORTED_MODULE_9__["LokiResultType"].Stream) {
                    throw new Error('Metrics mode does not support logs. Use an aggregation or switch to Logs mode.');
                }
                return {
                    data: [Object(_result_transformer__WEBPACK_IMPORTED_MODULE_7__["lokiResultsToTableModel"])(response.data.data.result, responseListLength, target.refId, true)],
                    key: target.refId + "_instant",
                };
            }));
        };
        /**
         * Attempts to send a query to /loki/api/v1/query_range but falls back to the legacy endpoint if necessary.
         */
        _this.runRangeQueryWithFallback = function (target, options, responseListLength) {
            if (responseListLength === void 0) { responseListLength = 1; }
            if (target.liveStreaming) {
                return _this.runLiveQuery(target, options);
            }
            var query = _this.createRangeQuery(target, options);
            return _this._request(RANGE_QUERY_ENDPOINT, query).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) { return _this.throwUnless(err, err.cancelled || err.status === 404, target); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (response) { return (response.cancelled ? false : true); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["iif"])(function () { return response.status === 404; }, Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["defer"])(function () { return _this.runLegacyQuery(target, options); }), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["defer"])(function () {
                    return Object(_result_transformer__WEBPACK_IMPORTED_MODULE_7__["processRangeQueryResponse"])(response.data, target, query, responseListLength, _this.maxLines, _this.instanceSettings.jsonData, options.reverse);
                }));
            }));
        };
        /**
         * Runs live queries which in this case means creating a websocket and listening on it for new logs.
         * This returns a bit different dataFrame than runQueries as it returns single dataframe even if there are multiple
         * Loki streams, sets only common labels on dataframe.labels and has additional dataframe.fields.labels for unique
         * labels per row.
         */
        _this.runLiveQuery = function (target, options) {
            var liveTarget = _this.createLiveTarget(target, options);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(_this.getVersion()).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["mergeMap"])(function (version) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["iif"])(function () { return version === 'v1'; }, Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["defer"])(function () { return _this.streams.getStream(liveTarget); }), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["defer"])(function () {
                    var legacyTarget = _this.createLegacyLiveTarget(target, options);
                    return _this.streams.getLegacyStream(legacyTarget);
                }));
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) { return ({
                data: data,
                key: "loki-" + liveTarget.refId,
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Streaming,
            }); }));
        };
        _this.getLogRowContext = function (row, options) {
            var target = _this.prepareLogRowContextQueryTarget(row, (options && options.limit) || 10, (options && options.direction) || 'BACKWARD');
            var reverse = options && options.direction === 'FORWARD';
            return _this._request(RANGE_QUERY_ENDPOINT, target)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
                if (err.status === 404) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(err);
                }
                var error = {
                    message: 'Error during context query. Please check JS console logs.',
                    status: err.status,
                    statusText: err.statusText,
                };
                throw error;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (res) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["iif"])(function () { return res.status === 404; }, _this._request(LEGACY_QUERY_ENDPOINT, target).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
                    var error = {
                        message: 'Error during context query. Please check JS console logs.',
                        status: err.status,
                        statusText: err.statusText,
                    };
                    throw error;
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) { return ({
                    data: res.data ? res.data.streams.map(function (stream) { return Object(_result_transformer__WEBPACK_IMPORTED_MODULE_7__["legacyLogStreamToDataFrame"])(stream, reverse); }) : [],
                }); })), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({
                    data: res.data ? res.data.data.result.map(function (stream) { return Object(_result_transformer__WEBPACK_IMPORTED_MODULE_7__["lokiStreamResultToDataFrame"])(stream, reverse); }) : [],
                }));
            }))
                .toPromise();
        };
        _this.prepareLogRowContextQueryTarget = function (row, limit, direction) {
            var query = Object.keys(row.labels)
                .map(function (label) { return label + "=\"" + row.labels[label] + "\""; })
                .join(',');
            var contextTimeBuffer = 2 * 60 * 60 * 1000; // 2h buffer
            var commonTargetOptions = {
                limit: limit,
                query: "{" + query + "}",
                expr: "{" + query + "}",
                direction: direction,
            };
            var fieldCache = new _grafana_data__WEBPACK_IMPORTED_MODULE_4__["FieldCache"](row.dataFrame);
            var nsField = fieldCache.getFieldByName('tsNs');
            var nsTimestamp = nsField.values.get(row.rowIndex);
            if (direction === 'BACKWARD') {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, commonTargetOptions), { 
                    // convert to ns, we loose some precision here but it is not that important at the far points of the context
                    start: row.timeEpochMs - contextTimeBuffer + '000000', end: nsTimestamp, direction: direction });
            }
            else {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, commonTargetOptions), { 
                    // start param in Loki API is inclusive so we'll have to filter out the row that this request is based from
                    // and any other that were logged in the same ns but before the row. Right now these rows will be lost
                    // because the are before but came it he response that should return only rows after.
                    start: nsTimestamp, 
                    // convert to ns, we loose some precision here but it is not that important at the far points of the context
                    end: row.timeEpochMs + contextTimeBuffer + '000000' });
            }
        };
        _this.throwUnless = function (err, condition, target) {
            if (condition) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(err);
            }
            var error = _this.processError(err, target);
            throw error;
        };
        _this.processError = function (err, target) {
            var error = {
                message: (err && err.statusText) || 'Unknown error during query transaction. Please check JS console logs.',
                refId: target.refId,
            };
            if (err.data) {
                if (typeof err.data === 'string') {
                    error.message = err.data;
                }
                else if (err.data.error) {
                    error.message = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["safeStringifyValue"])(err.data.error);
                }
            }
            else if (err.message) {
                error.message = err.message;
            }
            else if (typeof err === 'string') {
                error.message = err;
            }
            error.status = err.status;
            error.statusText = err.statusText;
            return error;
        };
        _this.languageProvider = new _language_provider__WEBPACK_IMPORTED_MODULE_12__["default"](_this);
        var settingsData = instanceSettings.jsonData || {};
        _this.maxLines = parseInt(settingsData.maxLines, 10) || DEFAULT_MAX_LINES;
        return _this;
    }
    LokiDatasource.prototype.getVersion = function () {
        var _this = this;
        if (this.version) {
            return Promise.resolve(this.version);
        }
        return this._request(RANGE_QUERY_ENDPOINT)
            .toPromise()
            .then(function () {
            _this.version = 'v1';
            return _this.version;
        })
            .catch(function (err) {
            _this.version = err.status !== 404 ? 'v1' : 'v0';
            return _this.version;
        });
    };
    LokiDatasource.prototype._request = function (apiUrl, data, options) {
        var baseUrl = this.instanceSettings.url;
        var params = data ? serializeParams(data) : '';
        var url = "" + baseUrl + apiUrl + (params.length ? "?" + params : '');
        var req = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { url: url });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["from"])(this.backendSrv.datasourceRequest(req));
    };
    LokiDatasource.prototype.query = function (options) {
        var _this = this;
        var subQueries = [];
        var filteredTargets = options.targets
            .filter(function (target) { return target.expr && !target.hide; })
            .map(function (target) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, target), { expr: _this.templateSrv.replace(target.expr, options.scopedVars, _this.interpolateQueryExpr) })); });
        if (options.exploreMode === app_types__WEBPACK_IMPORTED_MODULE_10__["ExploreMode"].Metrics) {
            filteredTargets.forEach(function (target) {
                return subQueries.push(_this.runInstantQuery(target, options, filteredTargets.length), _this.runRangeQueryWithFallback(target, options, filteredTargets.length));
            });
        }
        else {
            filteredTargets.forEach(function (target) {
                return subQueries.push(_this.runRangeQueryWithFallback(target, options, filteredTargets.length).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (dataQueryResponse) {
                    if (options.exploreMode === app_types__WEBPACK_IMPORTED_MODULE_10__["ExploreMode"].Logs && dataQueryResponse.data.find(function (d) { return isTimeSeries(d); })) {
                        throw new Error('Logs mode does not support queries that return time series data. Please perform a logs query or switch to Metrics mode.');
                    }
                    else {
                        return dataQueryResponse;
                    }
                })));
            });
        }
        // No valid targets, return the empty result to save a round trip.
        if (Object(lodash__WEBPACK_IMPORTED_MODULE_1__["isEmpty"])(subQueries)) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({
                data: [],
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Done,
            });
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(subQueries));
    };
    LokiDatasource.prototype.createRangeQuery = function (target, options) {
        var query = Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["parseQuery"])(target.expr).query;
        var range = {};
        if (options.range) {
            var startNs = this.getTime(options.range.from, false);
            var endNs = this.getTime(options.range.to, true);
            var rangeMs = Math.ceil((endNs - startNs) / 1e6);
            var step = Math.ceil(this.adjustInterval(options.intervalMs || 1000, rangeMs) / 1000);
            var alignedTimes = {
                start: startNs - (startNs % 1e9),
                end: endNs + (1e9 - (endNs % 1e9)),
            };
            range = {
                start: alignedTimes.start,
                end: alignedTimes.end,
                step: step,
            };
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, DEFAULT_QUERY_PARAMS), range), { query: query, limit: Math.min(options.maxDataPoints || Infinity, this.maxLines) });
    };
    LokiDatasource.prototype.createLegacyLiveTarget = function (target, options) {
        var _a = Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["parseQuery"])(target.expr), query = _a.query, regexp = _a.regexp;
        var baseUrl = this.instanceSettings.url;
        var params = serializeParams({ query: query });
        return {
            query: query,
            regexp: regexp,
            url: Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["convertToWebSocketUrl"])(baseUrl + "/api/prom/tail?" + params),
            refId: target.refId,
            size: Math.min(options.maxDataPoints || Infinity, this.maxLines),
        };
    };
    LokiDatasource.prototype.createLiveTarget = function (target, options) {
        var _a = Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["parseQuery"])(target.expr), query = _a.query, regexp = _a.regexp;
        var baseUrl = this.instanceSettings.url;
        var params = serializeParams({ query: query });
        return {
            query: query,
            regexp: regexp,
            url: Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_6__["convertToWebSocketUrl"])(baseUrl + "/loki/api/v1/tail?" + params),
            refId: target.refId,
            size: Math.min(options.maxDataPoints || Infinity, this.maxLines),
        };
    };
    LokiDatasource.prototype.interpolateVariablesInQueries = function (queries, scopedVars) {
        var _this = this;
        var expandedQueries = queries;
        if (queries && queries.length) {
            expandedQueries = queries.map(function (query) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { datasource: _this.name, expr: _this.templateSrv.replace(query.expr, scopedVars, _this.interpolateQueryExpr) })); });
        }
        return expandedQueries;
    };
    LokiDatasource.prototype.importQueries = function (queries, originMeta) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.languageProvider.importQueries(queries, originMeta.id)];
            });
        });
    };
    LokiDatasource.prototype.metadataRequest = function (url, params) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var res;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._request(url, params, { silent: true }).toPromise()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, {
                                data: { data: res.data.data || res.data.values || [] },
                            }];
                }
            });
        });
    };
    LokiDatasource.prototype.metricFindQuery = function (query) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var interpolated;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!query) {
                            return [2 /*return*/, Promise.resolve([])];
                        }
                        interpolated = this.templateSrv.replace(query, {}, this.interpolateQueryExpr);
                        return [4 /*yield*/, this.processMetricFindQuery(interpolated)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LokiDatasource.prototype.processMetricFindQuery = function (query) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var labelNamesRegex, labelValuesRegex, labelNames, labelValues;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        labelNamesRegex = /^label_names\(\)\s*$/;
                        labelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\)\s*$/;
                        labelNames = query.match(labelNamesRegex);
                        if (!labelNames) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.labelNamesQuery()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        labelValues = query.match(labelValuesRegex);
                        if (!labelValues) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.labelValuesQuery(labelValues[2])];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, Promise.resolve([])];
                }
            });
        });
    };
    LokiDatasource.prototype.labelNamesQuery = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var url, result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVersion()];
                    case 1:
                        url = (_a.sent()) === 'v0' ? LEGACY_LOKI_ENDPOINT + "/label" : LOKI_ENDPOINT + "/label";
                        return [4 /*yield*/, this.metadataRequest(url)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.data.data.map(function (value) { return ({ text: value }); })];
                }
            });
        });
    };
    LokiDatasource.prototype.labelValuesQuery = function (label) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var url, result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVersion()];
                    case 1:
                        url = (_a.sent()) === 'v0'
                            ? LEGACY_LOKI_ENDPOINT + "/label/" + label + "/values"
                            : LOKI_ENDPOINT + "/label/" + label + "/values";
                        return [4 /*yield*/, this.metadataRequest(url)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.data.data.map(function (value) { return ({ text: value }); })];
                }
            });
        });
    };
    LokiDatasource.prototype.interpolateQueryExpr = function (value, variable) {
        // if no multi or include all do not regexEscape
        if (!variable.multi && !variable.includeAll) {
            return lokiRegularEscape(value);
        }
        if (typeof value === 'string') {
            return lokiSpecialRegexEscape(value);
        }
        var escapedValues = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["map"])(value, lokiSpecialRegexEscape);
        return escapedValues.join('|');
    };
    LokiDatasource.prototype.modifyQuery = function (query, action) {
        var parsed = Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["parseQuery"])(query.expr || '');
        var selector = parsed.query;
        var selectorLabels, selectorFilters;
        switch (action.type) {
            case 'ADD_FILTER': {
                selectorLabels = Object(app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_5__["addLabelToSelector"])(selector, action.key, action.value);
                selectorFilters = Object(app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_5__["keepSelectorFilters"])(selector);
                selector = (selectorLabels + " " + selectorFilters).trim();
                break;
            }
            case 'ADD_FILTER_OUT': {
                selectorLabels = Object(app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_5__["addLabelToSelector"])(selector, action.key, action.value, '!=');
                selectorFilters = Object(app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_5__["keepSelectorFilters"])(selector);
                selector = (selectorLabels + " " + selectorFilters).trim();
                break;
            }
            default:
                break;
        }
        var expression = Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["formatQuery"])(selector, parsed.regexp);
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { expr: expression });
    };
    LokiDatasource.prototype.getHighlighterExpression = function (query) {
        return Object(_query_utils__WEBPACK_IMPORTED_MODULE_8__["getHighlighterExpressionsFromQuery"])(query.expr);
    };
    LokiDatasource.prototype.getTime = function (date, roundUp) {
        if (typeof date === 'string') {
            date = _grafana_data__WEBPACK_IMPORTED_MODULE_4__["dateMath"].parse(date, roundUp);
        }
        return Math.ceil(date.valueOf() * 1e6);
    };
    LokiDatasource.prototype.testDatasource = function () {
        var _this = this;
        // Consider only last 10 minutes otherwise request takes too long
        var startMs = Date.now() - 10 * 60 * 1000;
        var start = startMs + "000000"; // API expects nanoseconds
        return this._request('/loki/api/v1/label', { start: start })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
            if (err.status === 404) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(err);
            }
            throw err;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (response) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["iif"])(function () { return response.status === 404; }, Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["defer"])(function () { return _this._request('/api/prom/label', { start: start }); }), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["defer"])(function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(response); }));
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) {
            var _a, _b, _c, _d;
            var values = ((_b = (_a = res) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) || ((_d = (_c = res) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.values) || [];
            var testResult = values.length > 0
                ? { status: 'success', message: 'Data source connected and labels found.' }
                : {
                    status: 'error',
                    message: 'Data source connected, but no labels received. Verify that Loki and Promtail is configured properly.',
                };
            return testResult;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
            var message = 'Loki: ';
            if (err.statusText) {
                message += err.statusText;
            }
            else {
                message += 'Cannot connect to Loki';
            }
            if (err.status) {
                message += ". " + err.status;
            }
            if (err.data && err.data.message) {
                message += ". " + err.data.message;
            }
            else if (err.data) {
                message += ". " + err.data;
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])({ status: 'error', message: message });
        }))
            .toPromise();
    };
    LokiDatasource.prototype.annotationQuery = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var interpolatedExpr, query, data, annotations, _loop_1, data_1, data_1_1, frame;
            var e_1, _a;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!options.annotation.expr) {
                            return [2 /*return*/, []];
                        }
                        interpolatedExpr = this.templateSrv.replace(options.annotation.expr, {}, this.interpolateQueryExpr);
                        query = { refId: "annotation-" + options.annotation.name, expr: interpolatedExpr };
                        return [4 /*yield*/, this.runRangeQueryWithFallback(query, options).toPromise()];
                    case 1:
                        data = (_b.sent()).data;
                        annotations = [];
                        _loop_1 = function (frame) {
                            var e_2, _a;
                            var tags = [];
                            try {
                                for (var _b = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(frame.fields)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var field = _c.value;
                                    if (field.labels) {
                                        tags.push.apply(tags, Object.values(field.labels));
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            var view = new _grafana_data__WEBPACK_IMPORTED_MODULE_4__["DataFrameView"](frame);
                            view.forEachRow(function (row) {
                                annotations.push({
                                    time: new Date(row.ts).valueOf(),
                                    text: row.line,
                                    tags: tags,
                                });
                            });
                        };
                        try {
                            for (data_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                                frame = data_1_1.value;
                                _loop_1(frame);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [2 /*return*/, annotations];
                }
            });
        });
    };
    LokiDatasource.prototype.adjustInterval = function (interval, range) {
        // Loki will drop queries that might return more than 11000 data points.
        // Calibrate interval if it is too small.
        if (interval !== 0 && range / interval > 11000) {
            interval = Math.ceil(range / 11000);
        }
        return Math.max(interval, 1000);
    };
    return LokiDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["DataSourceApi"]));

function lokiRegularEscape(value) {
    if (typeof value === 'string') {
        return value.replace(/'/g, "\\\\'");
    }
    return value;
}
function lokiSpecialRegexEscape(value) {
    if (typeof value === 'string') {
        return lokiRegularEscape(value.replace(/\\/g, '\\\\\\\\').replace(/[$^*{}\[\]+?.()|]/g, '\\\\$&'));
    }
    return value;
}
/* harmony default export */ __webpack_exports__["default"] = (LokiDatasource);
function isTimeSeries(data) {
    return data.hasOwnProperty('datapoints');
}


/***/ }),

/***/ "./public/app/plugins/datasource/loki/language_provider.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/language_provider.ts ***!
  \*****************************************************************/
/*! exports provided: LABEL_REFRESH_INTERVAL, rangeToParams, addHistoryMetadata, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LABEL_REFRESH_INTERVAL", function() { return LABEL_REFRESH_INTERVAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeToParams", function() { return rangeToParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addHistoryMetadata", function() { return addHistoryMetadata; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/plugins/datasource/prometheus/language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var _syntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./syntax */ "./public/app/plugins/datasource/loki/syntax.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _prometheus_promql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../prometheus/promql */ "./public/app/plugins/datasource/prometheus/promql.ts");

// Libraries

// Services & Utils




var DEFAULT_KEYS = ['job', 'namespace'];
var EMPTY_SELECTOR = '{}';
var HISTORY_ITEM_COUNT = 10;
var HISTORY_COUNT_CUTOFF = 1000 * 60 * 60 * 24; // 24h
var NS_IN_MS = 1000000;
var LABEL_REFRESH_INTERVAL = 1000 * 30; // 30sec
var wrapLabel = function (label) { return ({ label: label }); };
var rangeToParams = function (range) { return ({ start: range.from * NS_IN_MS, end: range.to * NS_IN_MS }); };
function addHistoryMetadata(item, history) {
    var cutoffTs = Date.now() - HISTORY_COUNT_CUTOFF;
    var historyForItem = history.filter(function (h) { return h.ts > cutoffTs && h.query.expr === item.label; });
    var hint = "Queried " + historyForItem.length + " times in the last 24h.";
    var recent = historyForItem[0];
    if (recent) {
        var lastQueried = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["dateTime"])(recent.ts).fromNow();
        hint = hint + " Last queried " + lastQueried + ".";
    }
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, item), { documentation: hint });
}
var LokiLanguageProvider = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LokiLanguageProvider, _super);
    function LokiLanguageProvider(datasource, initialValues) {
        var _this = _super.call(this) || this;
        // Strip syntax chars
        _this.cleanText = function (s) { return s.replace(/[{}[\]="(),!~+\-*/^%]/g, '').trim(); };
        _this.request = function (url, params) {
            return _this.datasource.metadataRequest(url, params);
        };
        /**
         * Initialise the language provider by fetching set of labels. Without this initialisation the provider would return
         * just a set of hardcoded default labels on provideCompletionItems or a recent queries from history.
         */
        _this.start = function () {
            if (!_this.startTask) {
                _this.startTask = _this.fetchLogLabels(_this.initialRange).then(function () {
                    _this.started = true;
                    return [];
                });
            }
            return _this.startTask;
        };
        _this.getBeginningCompletionItems = function (context) {
            return {
                suggestions: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(_this.getEmptyCompletionItems(context).suggestions, _this.getTermCompletionItems().suggestions),
            };
        };
        _this.getTermCompletionItems = function () {
            var suggestions = [];
            suggestions.push({
                prefixMatch: true,
                label: 'Functions',
                items: _syntax__WEBPACK_IMPORTED_MODULE_3__["FUNCTIONS"].map(function (suggestion) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, suggestion), { kind: 'function' })); }),
            });
            return { suggestions: suggestions };
        };
        _this.datasource = datasource;
        _this.labelKeys = {};
        _this.labelValues = {};
        Object.assign(_this, initialValues);
        return _this;
    }
    LokiLanguageProvider.prototype.getSyntax = function () {
        return _syntax__WEBPACK_IMPORTED_MODULE_3__["default"];
    };
    LokiLanguageProvider.prototype.getLabelKeys = function () {
        return this.labelKeys[EMPTY_SELECTOR];
    };
    LokiLanguageProvider.prototype.getLabelValues = function (key) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLabelValues(key, this.initialRange)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.labelValues[EMPTY_SELECTOR][key]];
                }
            });
        });
    };
    /**
     * Return suggestions based on input that can be then plugged into a typeahead dropdown.
     * Keep this DOM-free for testing
     * @param input
     * @param context Is optional in types but is required in case we are doing getLabelCompletionItems
     * @param context.absoluteRange Required in case we are doing getLabelCompletionItems
     * @param context.history Optional used only in getEmptyCompletionItems
     */
    LokiLanguageProvider.prototype.provideCompletionItems = function (input, context) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var wrapperClasses, value, prefix, text, empty, selectedLines, currentLine, nextCharacter, tokenRecognized, prefixUnrecognized, noSuffix, safePrefix, operatorsPattern, isNextOperand;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wrapperClasses = input.wrapperClasses, value = input.value, prefix = input.prefix, text = input.text;
                        empty = value.document.text.length === 0;
                        selectedLines = value.document.getTextsAtRange(value.selection);
                        currentLine = selectedLines.size === 1 ? selectedLines.first().getText() : null;
                        nextCharacter = currentLine ? currentLine[value.selection.anchor.offset] : null;
                        tokenRecognized = wrapperClasses.length > 3;
                        prefixUnrecognized = prefix && !tokenRecognized;
                        noSuffix = !nextCharacter || nextCharacter === ')';
                        safePrefix = prefix && !text.match(/^['"~=\]})\s]+$/) && noSuffix;
                        operatorsPattern = /[+\-*/^%]/;
                        isNextOperand = text.match(operatorsPattern);
                        if (!wrapperClasses.includes('context-range')) return [3 /*break*/, 1];
                        // Suggestions for metric[|]
                        return [2 /*return*/, this.getRangeCompletionItems()];
                    case 1:
                        if (!wrapperClasses.includes('context-labels')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getLabelCompletionItems(input, context)];
                    case 2: 
                    // Suggestions for {|} and {foo=|}
                    return [2 /*return*/, _a.sent()];
                    case 3:
                        if (empty) {
                            // Suggestions for empty query field
                            return [2 /*return*/, this.getEmptyCompletionItems(context)];
                        }
                        else if (prefixUnrecognized && noSuffix && !isNextOperand) {
                            // Show term suggestions in a couple of scenarios
                            return [2 /*return*/, this.getBeginningCompletionItems(context)];
                        }
                        else if (prefixUnrecognized && safePrefix) {
                            // Show term suggestions in a couple of scenarios
                            return [2 /*return*/, this.getTermCompletionItems()];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, {
                            suggestions: [],
                        }];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.getEmptyCompletionItems = function (context) {
        var _a;
        var history = (_a = context) === null || _a === void 0 ? void 0 : _a.history;
        var suggestions = [];
        if (history && history.length) {
            var historyItems = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.chain(history)
                .map(function (h) { return h.query.expr; })
                .filter()
                .uniq()
                .take(HISTORY_ITEM_COUNT)
                .map(wrapLabel)
                .map(function (item) { return addHistoryMetadata(item, history); })
                .value();
            suggestions.push({
                prefixMatch: true,
                skipSort: true,
                label: 'History',
                items: historyItems,
            });
        }
        return { suggestions: suggestions };
    };
    LokiLanguageProvider.prototype.getRangeCompletionItems = function () {
        return {
            context: 'context-range',
            suggestions: [
                {
                    label: 'Range vector',
                    items: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(_prometheus_promql__WEBPACK_IMPORTED_MODULE_5__["RATE_RANGES"]),
                },
            ],
        };
    };
    LokiLanguageProvider.prototype.getLabelCompletionItems = function (_a, _b) {
        var text = _a.text, wrapperClasses = _a.wrapperClasses, labelKey = _a.labelKey, value = _a.value;
        var absoluteRange = _b.absoluteRange;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var context, suggestions, line, cursorOffset, selector, parsedSelector, existingKeys, labelValues, labelKeys, possibleKeys;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        suggestions = [];
                        line = value.anchorBlock.getText();
                        cursorOffset = value.selection.anchor.offset;
                        selector = EMPTY_SELECTOR;
                        try {
                            parsedSelector = Object(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["parseSelector"])(line, cursorOffset);
                        }
                        catch (_d) { }
                        existingKeys = parsedSelector ? parsedSelector.labelKeys : [];
                        if (!((text && text.match(/^!?=~?/)) || wrapperClasses.includes('attr-value'))) return [3 /*break*/, 4];
                        if (!(labelKey && this.labelValues[selector])) return [3 /*break*/, 3];
                        labelValues = this.labelValues[selector][labelKey];
                        if (!!labelValues) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchLabelValues(labelKey, absoluteRange)];
                    case 1:
                        _c.sent();
                        labelValues = this.labelValues[selector][labelKey];
                        _c.label = 2;
                    case 2:
                        context = 'context-label-values';
                        suggestions.push({
                            label: "Label values for \"" + labelKey + "\"",
                            items: labelValues.map(wrapLabel),
                        });
                        _c.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        labelKeys = this.labelKeys[selector] || DEFAULT_KEYS;
                        if (labelKeys) {
                            possibleKeys = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.difference(labelKeys, existingKeys);
                            if (possibleKeys.length) {
                                context = 'context-labels';
                                suggestions.push({ label: "Labels", items: possibleKeys.map(wrapLabel) });
                            }
                        }
                        _c.label = 5;
                    case 5: return [2 /*return*/, { context: context, suggestions: suggestions }];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.importQueries = function (queries, datasourceType) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (datasourceType === 'prometheus') {
                    return [2 /*return*/, Promise.all(queries.map(function (query) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
                            var expr, rest;
                            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.importPrometheusQuery(query.expr)];
                                    case 1:
                                        expr = _a.sent();
                                        rest = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(query, []);
                                        return [2 /*return*/, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, rest), { expr: expr })];
                                }
                            });
                        }); }))];
                }
                // Return a cleaned LokiQuery
                return [2 /*return*/, queries.map(function (query) { return ({
                        refId: query.refId,
                        expr: '',
                    }); })];
            });
        });
    };
    LokiLanguageProvider.prototype.importPrometheusQuery = function (query) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var selectorMatch, selector, labels, existingKeys, labelsToKeep, key, labelKeys, cleanSelector;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!query) {
                            return [2 /*return*/, ''];
                        }
                        selectorMatch = query.match(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["selectorRegexp"]);
                        if (!selectorMatch) {
                            return [2 /*return*/, ''];
                        }
                        selector = selectorMatch[0];
                        labels = {};
                        selector.replace(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["labelRegexp"], function (_, key, operator, value) {
                            labels[key] = { value: value, operator: operator };
                            return '';
                        });
                        // Keep only labels that exist on origin and target datasource
                        return [4 /*yield*/, this.start()];
                    case 1:
                        // Keep only labels that exist on origin and target datasource
                        _a.sent(); // fetches all existing label keys
                        existingKeys = this.labelKeys[EMPTY_SELECTOR];
                        labelsToKeep = {};
                        if (existingKeys && existingKeys.length) {
                            // Check for common labels
                            for (key in labels) {
                                if (existingKeys && existingKeys.includes(key)) {
                                    // Should we check for label value equality here?
                                    labelsToKeep[key] = labels[key];
                                }
                            }
                        }
                        else {
                            // Keep all labels by default
                            labelsToKeep = labels;
                        }
                        labelKeys = Object.keys(labelsToKeep).sort();
                        cleanSelector = labelKeys
                            .map(function (key) { return "" + key + labelsToKeep[key].operator + labelsToKeep[key].value; })
                            .join(',');
                        return [2 /*return*/, ['{', cleanSelector, '}'].join('')];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.fetchLogLabels = function (absoluteRange) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var url, rangeParams, res, labelKeys, e_1;
            var _a, _b;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = '/api/prom/label';
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        this.logLabelFetchTs = Date.now();
                        rangeParams = absoluteRange ? rangeToParams(absoluteRange) : {};
                        return [4 /*yield*/, this.request(url, rangeParams)];
                    case 2:
                        res = _c.sent();
                        labelKeys = res.data.data.slice().sort();
                        this.labelKeys = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.labelKeys), (_a = {}, _a[EMPTY_SELECTOR] = labelKeys, _a));
                        this.labelValues = (_b = {},
                            _b[EMPTY_SELECTOR] = {},
                            _b);
                        this.logLabelOptions = labelKeys.map(function (key) { return ({ label: key, value: key, isLeaf: false }); });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, []];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.refreshLogLabels = function (absoluteRange, forceRefresh) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((this.labelKeys && Date.now() - this.logLabelFetchTs > LABEL_REFRESH_INTERVAL) || forceRefresh)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchLogLabels(absoluteRange)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.fetchLabelValues = function (key, absoluteRange) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var url, rangeParams, res, values_1, exisingValues, nextValues, e_2;
            var _a, _b;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = "/api/prom/label/" + key + "/values";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        rangeParams = absoluteRange ? rangeToParams(absoluteRange) : {};
                        return [4 /*yield*/, this.request(url, rangeParams)];
                    case 2:
                        res = _c.sent();
                        values_1 = res.data.data.slice().sort();
                        // Add to label options
                        this.logLabelOptions = this.logLabelOptions.map(function (keyOption) {
                            if (keyOption.value === key) {
                                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, keyOption), { children: values_1.map(function (value) { return ({ label: value, value: value }); }) });
                            }
                            return keyOption;
                        });
                        exisingValues = this.labelValues[EMPTY_SELECTOR];
                        nextValues = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, exisingValues), (_a = {}, _a[key] = values_1, _a));
                        this.labelValues = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.labelValues), (_b = {}, _b[EMPTY_SELECTOR] = nextValues, _b));
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _c.sent();
                        console.error(e_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LokiLanguageProvider;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["LanguageProvider"]));
/* harmony default export */ __webpack_exports__["default"] = (LokiLanguageProvider);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/live_streams.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/live_streams.ts ***!
  \************************************************************/
/*! exports provided: LiveStreams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveStreams", function() { return LiveStreams; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/webSocket */ "./node_modules/rxjs/_esm5/webSocket/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/loki/result_transformer.ts");




/**
 * Cache of websocket streams that can be returned as observable. In case there already is a stream for particular
 * target it is returned and on subscription returns the latest dataFrame.
 */
var LiveStreams = /** @class */ (function () {
    function LiveStreams() {
        this.streams = {};
    }
    LiveStreams.prototype.getLegacyStream = function (target) {
        var _this = this;
        var stream = this.streams[target.url];
        if (stream) {
            return stream;
        }
        var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["CircularDataFrame"]({ capacity: target.size });
        data.addField({ name: 'ts', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].time, config: { title: 'Time' } });
        data.addField({ name: 'line', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].string }).labels = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["parseLabels"])(target.query);
        data.addField({ name: 'labels', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].other }); // The labels for each line
        data.addField({ name: 'id', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].string });
        stream = Object(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_1__["webSocket"])(target.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
            delete _this.streams[target.url];
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            Object(_result_transformer__WEBPACK_IMPORTED_MODULE_3__["appendLegacyResponseToBufferedData"])(response, data);
            return [data];
        }));
        this.streams[target.url] = stream;
        return stream;
    };
    LiveStreams.prototype.getStream = function (target) {
        var _this = this;
        var stream = this.streams[target.url];
        if (stream) {
            return stream;
        }
        var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["CircularDataFrame"]({ capacity: target.size });
        data.addField({ name: 'ts', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].time, config: { title: 'Time' } });
        data.addField({ name: 'tsNs', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].time, config: { title: 'Time ns' } });
        data.addField({ name: 'line', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].string }).labels = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["parseLabels"])(target.query);
        data.addField({ name: 'labels', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].other }); // The labels for each line
        data.addField({ name: 'id', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].string });
        stream = Object(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_1__["webSocket"])(target.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
            delete _this.streams[target.url];
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
            Object(_result_transformer__WEBPACK_IMPORTED_MODULE_3__["appendResponseToBufferedData"])(response, data);
            return [data];
        }));
        this.streams[target.url] = stream;
        return stream;
    };
    return LiveStreams;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/loki/module.ts":
/*!******************************************************!*\
  !*** ./public/app/plugins/datasource/loki/module.ts ***!
  \******************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/loki/datasource.ts");
/* harmony import */ var _components_LokiCheatSheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/LokiCheatSheet */ "./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx");
/* harmony import */ var _components_LokiQueryField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/LokiQueryField */ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx");
/* harmony import */ var _components_LokiQueryEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/LokiQueryEditor */ "./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx");
/* harmony import */ var _LokiAnnotationsQueryCtrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LokiAnnotationsQueryCtrl */ "./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx");
/* harmony import */ var _configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./configuration/ConfigEditor */ "./public/app/plugins/datasource/loki/configuration/ConfigEditor.tsx");







var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["default"])
    .setQueryEditor(_components_LokiQueryEditor__WEBPACK_IMPORTED_MODULE_4__["default"])
    .setConfigEditor(_configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_6__["ConfigEditor"])
    .setExploreQueryField(_components_LokiQueryField__WEBPACK_IMPORTED_MODULE_3__["default"])
    .setExploreStartPage(_components_LokiCheatSheet__WEBPACK_IMPORTED_MODULE_2__["default"])
    .setAnnotationQueryCtrl(_LokiAnnotationsQueryCtrl__WEBPACK_IMPORTED_MODULE_5__["LokiAnnotationsQueryCtrl"]);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/query_utils.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/loki/query_utils.ts ***!
  \***********************************************************/
/*! exports provided: parseQuery, formatQuery, getHighlighterExpressionsFromQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseQuery", function() { return parseQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatQuery", function() { return formatQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHighlighterExpressionsFromQuery", function() { return getHighlighterExpressionsFromQuery; });
/* harmony import */ var lodash_escapeRegExp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/escapeRegExp */ "./node_modules/lodash/escapeRegExp.js");
/* harmony import */ var lodash_escapeRegExp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_escapeRegExp__WEBPACK_IMPORTED_MODULE_0__);

var selectorRegexp = /(?:^|\s){[^{]*}/g;
function parseQuery(input) {
    input = input || '';
    var match = input.match(selectorRegexp);
    var query = input;
    var regexp = '';
    if (match) {
        // Regexp result is ignored on the server side
        regexp = input.replace(selectorRegexp, '').trim();
        // Keep old-style regexp, otherwise take whole query
        if (regexp && regexp.search(/\|=|\|~|!=|!~/) === -1) {
            query = match[0].trim();
        }
        else {
            regexp = '';
        }
    }
    return { regexp: regexp, query: query };
}
function formatQuery(selector, search) {
    return ((selector || '') + " " + (search || '')).trim();
}
/**
 * Returns search terms from a LogQL query.
 * E.g., `{} |= foo |=bar != baz` returns `['foo', 'bar']`.
 */
function getHighlighterExpressionsFromQuery(input) {
    var parsed = parseQuery(input);
    // Legacy syntax
    if (parsed.regexp) {
        return [parsed.regexp];
    }
    var expression = input;
    var results = [];
    // Consume filter expression from left to right
    while (expression) {
        var filterStart = expression.search(/\|=|\|~|!=|!~/);
        // Nothing more to search
        if (filterStart === -1) {
            break;
        }
        // Drop terms for negative filters
        var filterOperator = expression.substr(filterStart, 2);
        var skip = expression.substr(filterStart).search(/!=|!~/) === 0;
        expression = expression.substr(filterStart + 2);
        if (skip) {
            continue;
        }
        // Check if there is more chained
        var filterEnd = expression.search(/\|=|\|~|!=|!~/);
        var filterTerm = void 0;
        if (filterEnd === -1) {
            filterTerm = expression.trim();
        }
        else {
            filterTerm = expression.substr(0, filterEnd).trim();
            expression = expression.substr(filterEnd);
        }
        // Unwrap the filter term by removing quotes
        var quotedTerm = filterTerm.match(/^"((?:[^\\"]|\\")*)"$/);
        if (quotedTerm) {
            var unwrappedFilterTerm = quotedTerm[1];
            var regexOperator = filterOperator === '|~';
            results.push(regexOperator ? unwrappedFilterTerm : lodash_escapeRegExp__WEBPACK_IMPORTED_MODULE_0___default()(unwrappedFilterTerm));
        }
        else {
            return null;
        }
    }
    return results;
}


/***/ }),

/***/ "./public/app/plugins/datasource/loki/result_transformer.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/result_transformer.ts ***!
  \******************************************************************/
/*! exports provided: legacyLogStreamToDataFrame, lokiStreamResultToDataFrame, appendLegacyResponseToBufferedData, appendResponseToBufferedData, lokiResultsToTableModel, lokiStreamsToDataframes, lokiLegacyStreamsToDataframes, enhanceDataFrame, rangeQueryResponseToTimeSeries, processRangeQueryResponse, isLokiLogsStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "legacyLogStreamToDataFrame", function() { return legacyLogStreamToDataFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiStreamResultToDataFrame", function() { return lokiStreamResultToDataFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendLegacyResponseToBufferedData", function() { return appendLegacyResponseToBufferedData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendResponseToBufferedData", function() { return appendResponseToBufferedData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiResultsToTableModel", function() { return lokiResultsToTableModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiStreamsToDataframes", function() { return lokiStreamsToDataframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lokiLegacyStreamsToDataframes", function() { return lokiLegacyStreamsToDataframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enhanceDataFrame", function() { return enhanceDataFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeQueryResponseToTimeSeries", function() { return rangeQueryResponseToTimeSeries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processRangeQueryResponse", function() { return processRangeQueryResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLokiLogsStream", function() { return isLokiLogsStream; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/loki/types.ts");
/* harmony import */ var _query_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./query_utils */ "./public/app/plugins/datasource/loki/query_utils.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");









/**
 * Transforms LokiLogStream structure into a dataFrame. Used when doing standard queries and older version of Loki.
 */
function legacyLogStreamToDataFrame(stream, reverse, refId) {
    var e_1, _a;
    var labels = stream.parsedLabels;
    if (!labels && stream.labels) {
        labels = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["parseLabels"])(stream.labels);
    }
    var times = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
    var timesNs = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
    var lines = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
    var uids = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
    try {
        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(stream.entries), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            var ts = entry.ts || entry.timestamp;
            // iso string with nano precision, will be truncated but is parse-able
            times.add(ts);
            // So this matches new format, we are loosing precision here, which sucks but no easy way to keep it and this
            // is for old pre 1.0.0 version Loki so probably does not affect that much.
            timesNs.add(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTime"])(ts).valueOf() + '000000');
            lines.add(entry.line);
            uids.add(createUid(ts, stream.labels, entry.line));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return constructDataFrame(times, timesNs, lines, uids, labels, reverse, refId);
}
/**
 * Transforms LokiStreamResult structure into a dataFrame. Used when doing standard queries and newer version of Loki.
 */
function lokiStreamResultToDataFrame(stream, reverse, refId) {
    var e_2, _a;
    var labels = stream.stream;
    var labelsString = Object.entries(labels)
        .map(function (_a) {
        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _b[0], val = _b[1];
        return key + "=\"" + val + "\"";
    })
        .sort()
        .join('');
    var times = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
    var timesNs = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
    var lines = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
    var uids = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]);
    try {
        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(stream.values), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_c.value, 2), ts = _d[0], line = _d[1];
            // num ns epoch in string, we convert it to iso string here so it matches old format
            times.add(new Date(parseInt(ts.substr(0, ts.length - 6), 10)).toISOString());
            timesNs.add(ts);
            lines.add(line);
            uids.add(createUid(ts, labelsString, line));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return constructDataFrame(times, timesNs, lines, uids, labels, reverse, refId);
}
/**
 * Constructs dataFrame with supplied fields and other data. Also makes sure it is properly reversed if needed.
 */
function constructDataFrame(times, timesNs, lines, uids, labels, reverse, refId) {
    var dataFrame = {
        refId: refId,
        fields: [
            { name: 'ts', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time, config: { title: 'Time' }, values: times },
            { name: 'line', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string, config: {}, values: lines, labels: labels },
            { name: 'id', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string, config: {}, values: uids },
            { name: 'tsNs', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time, config: { title: 'Time ns' }, values: timesNs },
        ],
        length: times.length,
    };
    if (reverse) {
        var mutableDataFrame = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["MutableDataFrame"](dataFrame);
        mutableDataFrame.reverse();
        return mutableDataFrame;
    }
    return dataFrame;
}
/**
 * Transform LokiResponse data and appends it to MutableDataFrame. Used for streaming where the dataFrame can be
 * a CircularDataFrame creating a fixed size rolling buffer.
 * TODO: Probably could be unified with the logStreamToDataFrame function.
 * @param response
 * @param data Needs to have ts, line, labels, id as fields
 */
function appendLegacyResponseToBufferedData(response, data) {
    // Should we do anything with: response.dropped_entries?
    var e_3, _a, e_4, _b, e_5, _c;
    var streams = response.streams;
    if (!streams || !streams.length) {
        return;
    }
    var baseLabels = {};
    try {
        for (var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(data.fields), _e = _d.next(); !_e.done; _e = _d.next()) {
            var f = _e.value;
            if (f.type === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string) {
                if (f.labels) {
                    baseLabels = f.labels;
                }
                break;
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        for (var streams_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(streams), streams_1_1 = streams_1.next(); !streams_1_1.done; streams_1_1 = streams_1.next()) {
            var stream = streams_1_1.value;
            // Find unique labels
            var labels = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["parseLabels"])(stream.labels);
            var unique = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["findUniqueLabels"])(labels, baseLabels);
            try {
                // Add each line
                for (var _f = (e_5 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(stream.entries)), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var entry = _g.value;
                    var ts = entry.ts || entry.timestamp;
                    data.values.ts.add(ts);
                    data.values.line.add(entry.line);
                    data.values.labels.add(unique);
                    data.values.id.add(createUid(ts, stream.labels, entry.line));
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (streams_1_1 && !streams_1_1.done && (_b = streams_1.return)) _b.call(streams_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
function appendResponseToBufferedData(response, data) {
    // Should we do anything with: response.dropped_entries?
    var e_6, _a, e_7, _b, e_8, _c;
    var streams = response.streams;
    if (!streams || !streams.length) {
        return;
    }
    var baseLabels = {};
    try {
        for (var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(data.fields), _e = _d.next(); !_e.done; _e = _d.next()) {
            var f = _e.value;
            if (f.type === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string) {
                if (f.labels) {
                    baseLabels = f.labels;
                }
                break;
            }
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_6) throw e_6.error; }
    }
    try {
        for (var streams_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(streams), streams_2_1 = streams_2.next(); !streams_2_1.done; streams_2_1 = streams_2.next()) {
            var stream = streams_2_1.value;
            // Find unique labels
            var unique = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["findUniqueLabels"])(stream.stream, baseLabels);
            var allLabelsString = Object.entries(stream.stream)
                .map(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _b[0], val = _b[1];
                return key + "=\"" + val + "\"";
            })
                .sort()
                .join('');
            try {
                // Add each line
                for (var _f = (e_8 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(stream.values)), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var _h = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_g.value, 2), ts = _h[0], line = _h[1];
                    data.values.ts.add(ts.substr(0, ts.length - 6));
                    data.values.tsNs.add(ts);
                    data.values.line.add(line);
                    data.values.labels.add(unique);
                    data.values.id.add(createUid(ts, allLabelsString, line));
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (streams_2_1 && !streams_2_1.done && (_b = streams_2.return)) _b.call(streams_2);
        }
        finally { if (e_7) throw e_7.error; }
    }
}
function createUid(ts, labelsString, line) {
    return md5__WEBPACK_IMPORTED_MODULE_2___default()(ts + "_" + labelsString + "_" + line);
}
function lokiMatrixToTimeSeries(matrixResult, options) {
    return {
        target: createMetricLabel(matrixResult.metric, options),
        datapoints: lokiPointsToTimeseriesPoints(matrixResult.values, options),
        tags: matrixResult.metric,
    };
}
function lokiPointsToTimeseriesPoints(data, options) {
    var e_9, _a;
    var stepMs = options.step * 1000;
    var datapoints = [];
    var baseTimestampMs = options.start / 1e6;
    try {
        for (var data_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(data_1_1.value, 2), time = _b[0], value = _b[1];
            var datapointValue = parseFloat(value);
            if (isNaN(datapointValue)) {
                datapointValue = null;
            }
            var timestamp = time * 1000;
            for (var t = baseTimestampMs; t < timestamp; t += stepMs) {
                datapoints.push([0, t]);
            }
            baseTimestampMs = timestamp + stepMs;
            datapoints.push([datapointValue, timestamp]);
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
        }
        finally { if (e_9) throw e_9.error; }
    }
    var endTimestamp = options.end / 1e6;
    for (var t = baseTimestampMs; t <= endTimestamp; t += stepMs) {
        datapoints.push([0, t]);
    }
    return datapoints;
}
function lokiResultsToTableModel(lokiResults, resultCount, refId, valueWithRefId) {
    if (!lokiResults || lokiResults.length === 0) {
        return new app_core_table_model__WEBPACK_IMPORTED_MODULE_5__["default"]();
    }
    // Collect all labels across all metrics
    var metricLabels = new Set(lokiResults.reduce(function (acc, cur) { return acc.concat(Object.keys(cur.metric)); }, []));
    // Sort metric labels, create columns for them and record their index
    var sortedLabels = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(metricLabels.values()).sort();
    var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_5__["default"]();
    table.columns = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([
        { text: 'Time', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time }
    ], sortedLabels.map(function (label) { return ({ text: label, filterable: true }); }), [
        { text: resultCount > 1 || valueWithRefId ? "Value #" + refId : 'Value', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time },
    ]);
    // Populate rows, set value to empty string when label not present.
    lokiResults.forEach(function (series) {
        var _a;
        var newSeries = {
            metric: series.metric,
            values: series.value
                ? [series.value]
                : series.values,
        };
        if (!newSeries.values) {
            return;
        }
        if (!newSeries.metric) {
            table.rows.concat(newSeries.values.map(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), a = _b[0], b = _b[1];
                return [a * 1000, parseFloat(b)];
            }));
        }
        else {
            (_a = table.rows).push.apply(_a, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(newSeries.values.map(function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), a = _b[0], b = _b[1];
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([
                    a * 1000
                ], sortedLabels.map(function (label) { return newSeries.metric[label] || ''; }), [
                    parseFloat(b),
                ]);
            })));
        }
    });
    return table;
}
function createMetricLabel(labelData, options) {
    var label = options === undefined || lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(options.legendFormat)
        ? getOriginalMetricName(labelData)
        : renderTemplate(app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_4__["default"].replace(options.legendFormat), labelData);
    if (!label) {
        label = options.query;
    }
    return label;
}
function renderTemplate(aliasPattern, aliasData) {
    var aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
    return aliasPattern.replace(aliasRegex, function (_, g1) { return (aliasData[g1] ? aliasData[g1] : g1); });
}
function getOriginalMetricName(labelData) {
    var metricName = labelData.__name__ || '';
    delete labelData.__name__;
    var labelPart = Object.entries(labelData)
        .map(function (label) { return label[0] + "=\"" + label[1] + "\""; })
        .join(',');
    return metricName + "{" + labelPart + "}";
}
function lokiStreamsToDataframes(data, target, limit, config, reverse) {
    if (reverse === void 0) { reverse = false; }
    var series = data.map(function (stream) {
        var dataFrame = lokiStreamResultToDataFrame(stream, reverse);
        enhanceDataFrame(dataFrame, config);
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, dataFrame), { refId: target.refId, meta: {
                searchWords: Object(_query_utils__WEBPACK_IMPORTED_MODULE_7__["getHighlighterExpressionsFromQuery"])(Object(_query_utils__WEBPACK_IMPORTED_MODULE_7__["formatQuery"])(target.expr, target.regexp)),
                limit: limit,
            } });
    });
    return series;
}
function lokiLegacyStreamsToDataframes(data, target, limit, config, reverse) {
    if (reverse === void 0) { reverse = false; }
    if (Object.keys(data).length === 0) {
        return [];
    }
    if (isLokiLogsStream(data)) {
        return [legacyLogStreamToDataFrame(data, false, target.refId)];
    }
    var series = data.streams.map(function (stream) {
        var dataFrame = legacyLogStreamToDataFrame(stream, reverse);
        enhanceDataFrame(dataFrame, config);
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, dataFrame), { refId: target.refId, meta: {
                searchWords: Object(_query_utils__WEBPACK_IMPORTED_MODULE_7__["getHighlighterExpressionsFromQuery"])(Object(_query_utils__WEBPACK_IMPORTED_MODULE_7__["formatQuery"])(target.query, target.regexp)),
                limit: limit,
            } });
    });
    return series;
}
/**
 * Adds new fields and DataLinks to DataFrame based on DataSource instance config.
 * @param dataFrame
 */
var enhanceDataFrame = function (dataFrame, config) {
    var _a;
    if (!config) {
        return;
    }
    var derivedFields = (_a = config.derivedFields, (_a !== null && _a !== void 0 ? _a : []));
    if (!derivedFields.length) {
        return;
    }
    var fields = derivedFields.reduce(function (acc, field) {
        var config = {};
        if (field.url) {
            config.links = [
                {
                    url: field.url,
                    title: '',
                },
            ];
        }
        var dataFrameField = {
            name: field.name,
            type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string,
            config: config,
            values: new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["ArrayVector"]([]),
        };
        acc[field.name] = dataFrameField;
        return acc;
    }, {});
    var view = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["DataFrameView"](dataFrame);
    view.forEachRow(function (row) {
        var e_10, _a;
        try {
            for (var derivedFields_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(derivedFields), derivedFields_1_1 = derivedFields_1.next(); !derivedFields_1_1.done; derivedFields_1_1 = derivedFields_1.next()) {
                var field = derivedFields_1_1.value;
                var logMatch = row.line.match(field.matcherRegex);
                fields[field.name].values.add(logMatch && logMatch[1]);
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (derivedFields_1_1 && !derivedFields_1_1.done && (_a = derivedFields_1.return)) _a.call(derivedFields_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
    });
    dataFrame.fields = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(dataFrame.fields, Object.values(fields));
};
function rangeQueryResponseToTimeSeries(response, query, target, responseListLength) {
    var transformerOptions = {
        format: target.format,
        legendFormat: target.legendFormat,
        start: query.start,
        end: query.end,
        step: query.step,
        query: query.query,
        responseListLength: responseListLength,
        refId: target.refId,
        valueWithRefId: target.valueWithRefId,
    };
    switch (response.data.resultType) {
        case _types__WEBPACK_IMPORTED_MODULE_6__["LokiResultType"].Vector:
            return response.data.result.map(function (vecResult) {
                return lokiMatrixToTimeSeries({ metric: vecResult.metric, values: [vecResult.value] }, transformerOptions);
            });
        case _types__WEBPACK_IMPORTED_MODULE_6__["LokiResultType"].Matrix:
            return response.data.result.map(function (matrixResult) { return lokiMatrixToTimeSeries(matrixResult, transformerOptions); });
        default:
            return [];
    }
}
function processRangeQueryResponse(response, target, query, responseListLength, limit, config, reverse) {
    if (reverse === void 0) { reverse = false; }
    switch (response.data.resultType) {
        case _types__WEBPACK_IMPORTED_MODULE_6__["LokiResultType"].Stream:
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])({
                data: lokiStreamsToDataframes(response.data.result, target, limit, config, reverse),
                key: target.refId + "_log",
            });
        case _types__WEBPACK_IMPORTED_MODULE_6__["LokiResultType"].Vector:
        case _types__WEBPACK_IMPORTED_MODULE_6__["LokiResultType"].Matrix:
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])({
                data: rangeQueryResponseToTimeSeries(response, query, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, target), { format: 'time_series' }), responseListLength),
                key: target.refId,
            });
        default:
            throw new Error("Unknown result type \"" + response.data.resultType + "\".");
    }
}
function isLokiLogsStream(data) {
    return !data.hasOwnProperty('streams');
}


/***/ }),

/***/ "./public/app/plugins/datasource/loki/syntax.ts":
/*!******************************************************!*\
  !*** ./public/app/plugins/datasource/loki/syntax.ts ***!
  \******************************************************/
/*! exports provided: RANGE_VEC_FUNCTIONS, FUNCTIONS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANGE_VEC_FUNCTIONS", function() { return RANGE_VEC_FUNCTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNCTIONS", function() { return FUNCTIONS; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var AGGREGATION_OPERATORS = [
    {
        label: 'sum',
        insertText: 'sum',
        documentation: 'Calculate sum over dimensions',
    },
    {
        label: 'min',
        insertText: 'min',
        documentation: 'Select minimum over dimensions',
    },
    {
        label: 'max',
        insertText: 'max',
        documentation: 'Select maximum over dimensions',
    },
    {
        label: 'avg',
        insertText: 'avg',
        documentation: 'Calculate the average over dimensions',
    },
    {
        label: 'stddev',
        insertText: 'stddev',
        documentation: 'Calculate population standard deviation over dimensions',
    },
    {
        label: 'stdvar',
        insertText: 'stdvar',
        documentation: 'Calculate population standard variance over dimensions',
    },
    {
        label: 'count',
        insertText: 'count',
        documentation: 'Count number of elements in the vector',
    },
    {
        label: 'bottomk',
        insertText: 'bottomk',
        documentation: 'Smallest k elements by sample value',
    },
    {
        label: 'topk',
        insertText: 'topk',
        documentation: 'Largest k elements by sample value',
    },
];
var RANGE_VEC_FUNCTIONS = [
    {
        insertText: 'count_over_time',
        label: 'count_over_time',
        detail: 'count_over_time(range-vector)',
        documentation: 'The count of all values in the specified interval.',
    },
    {
        insertText: 'rate',
        label: 'rate',
        detail: 'rate(v range-vector)',
        documentation: "Calculates the per-second average rate of increase of the time series in the range vector. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for. Also, the calculation extrapolates to the ends of the time range, allowing for missed scrapes or imperfect alignment of scrape cycles with the range's time period.",
    },
];
var FUNCTIONS = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(AGGREGATION_OPERATORS, RANGE_VEC_FUNCTIONS);
var tokenizer = {
    comment: {
        pattern: /(^|[^\n])#.*/,
        lookbehind: true,
    },
    'context-aggregation': {
        pattern: /((without|by)\s*)\([^)]*\)/,
        lookbehind: true,
        inside: {
            'label-key': {
                pattern: /[^(),\s][^,)]*[^),\s]*/,
                alias: 'attr-name',
            },
            punctuation: /[()]/,
        },
    },
    'context-labels': {
        pattern: /\{[^}]*(?=})/,
        lookbehind: true,
        inside: {
            'label-key': {
                pattern: /[a-z_]\w*(?=\s*(=|!=|=~|!~))/,
                alias: 'attr-name',
            },
            'label-value': {
                pattern: /"(?:\\.|[^\\"])*"/,
                greedy: true,
                alias: 'attr-value',
            },
            punctuation: /[{]/,
        },
    },
    function: new RegExp("\\b(?:" + FUNCTIONS.map(function (f) { return f.label; }).join('|') + ")(?=\\s*\\()", 'i'),
    'context-range': [
        {
            pattern: /\[[^\]]*(?=\])/,
            inside: {
                'range-duration': {
                    pattern: /\b\d+[smhdwy]\b/i,
                    alias: 'number',
                },
            },
        },
        {
            pattern: /(offset\s+)\w+/,
            lookbehind: true,
            inside: {
                'range-duration': {
                    pattern: /\b\d+[smhdwy]\b/i,
                    alias: 'number',
                },
            },
        },
    ],
    number: /\b-?\d+((\.\d*)?([eE][+-]?\d+)?)?\b/,
    operator: new RegExp("/&&?|\\|?\\||!=?|<(?:=>?|<|>)?|>[>=]?", 'i'),
    punctuation: /[{}()`,.]/,
};
/* harmony default export */ __webpack_exports__["default"] = (tokenizer);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/types.ts":
/*!*****************************************************!*\
  !*** ./public/app/plugins/datasource/loki/types.ts ***!
  \*****************************************************/
/*! exports provided: LokiResultType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiResultType", function() { return LokiResultType; });
var LokiResultType;
(function (LokiResultType) {
    LokiResultType["Stream"] = "streams";
    LokiResultType["Vector"] = "vector";
    LokiResultType["Matrix"] = "matrix";
})(LokiResultType || (LokiResultType = {}));


/***/ })

}]);
//# sourceMappingURL=lokiPlugin.6310f9af5345c722b930.js.map