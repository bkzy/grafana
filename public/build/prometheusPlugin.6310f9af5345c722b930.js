(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["prometheusPlugin"],{

/***/ "./node_modules/lru-cache/index.js":
/*!*****************************************!*\
  !*** ./node_modules/lru-cache/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// A linked list to keep track of recently-used-ness
const Yallist = __webpack_require__(/*! yallist */ "./node_modules/yallist/yallist.js")

const MAX = Symbol('max')
const LENGTH = Symbol('length')
const LENGTH_CALCULATOR = Symbol('lengthCalculator')
const ALLOW_STALE = Symbol('allowStale')
const MAX_AGE = Symbol('maxAge')
const DISPOSE = Symbol('dispose')
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
const LRU_LIST = Symbol('lruList')
const CACHE = Symbol('cache')
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')

const naiveLength = () => 1

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options }

    if (!options)
      options = {}

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity

    const lc = options.length || naiveLength
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc
    this[ALLOW_STALE] = options.stale || false
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0
    this[DISPOSE] = options.dispose
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
    this.reset()
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity
    trim(this)
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA
    trim(this)
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      })
    }
    trim(this)
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev
      forEachStep(this, fn, walker, thisp)
      walker = prev
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next
      forEachStep(this, fn, walker, thisp)
      walker = next
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value))
    }

    this[CACHE] = new Map() // hash of items by key
    this[LRU_LIST] = new Yallist() // list of items in order of use recency
    this[LENGTH] = 0 // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0
    const len = this[LENGTH_CALCULATOR](value, key)

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key))
        return false
      }

      const node = this[CACHE].get(key)
      const item = node.value

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value)
      }

      item.now = now
      item.maxAge = maxAge
      item.value = value
      this[LENGTH] += len - item.length
      item.length = len
      this.get(key)
      trim(this)
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge)

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value)

      return false
    }

    this[LENGTH] += hit.length
    this[LRU_LIST].unshift(hit)
    this[CACHE].set(key, this[LRU_LIST].head)
    trim(this)
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail
    if (!node)
      return null

    del(this, node)
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key))
  }

  load (arr) {
    // reset the cache
    this.reset()

    const now = Date.now()
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l]
      const expiresAt = hit.e || 0
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v)
      else {
        const maxAge = expiresAt - now
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge)
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false))
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key)
  if (node) {
    const hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now()
        self[LRU_LIST].unshiftNode(node)
      }
    }
    return hit.value
  }
}

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
}

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

const del = (self, node) => {
  if (node) {
    const hit = node.value
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value)

    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge || 0
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE])
      hit = undefined
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self)
}

module.exports = LRUCache


/***/ }),

/***/ "./node_modules/yallist/iterator.js":
/*!******************************************!*\
  !*** ./node_modules/yallist/iterator.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ "./node_modules/yallist/yallist.js":
/*!*****************************************!*\
  !*** ./node_modules/yallist/yallist.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount /*, ...nodes */) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 2; i < arguments.length; i++) {
    walker = insert(this, walker, arguments[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(/*! ./iterator.js */ "./node_modules/yallist/iterator.js")(Yallist)
} catch (er) {}


/***/ }),

/***/ "./public/app/core/utils/CancelablePromise.ts":
/*!****************************************************!*\
  !*** ./public/app/core/utils/CancelablePromise.ts ***!
  \****************************************************/
/*! exports provided: makePromiseCancelable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePromiseCancelable", function() { return makePromiseCancelable; });
// https://github.com/facebook/react/issues/5465
var makePromiseCancelable = function (promise) {
    var hasCanceled_ = false;
    var wrappedPromise = new Promise(function (resolve, reject) {
        promise.then(function (val) { return (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)); });
        promise.catch(function (error) { return (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)); });
    });
    return {
        promise: wrappedPromise,
        cancel: function () {
            hasCanceled_ = true;
        },
    };
};


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CHEAT_SHEET_ITEMS = [
    {
        title: 'Request Rate',
        expression: 'rate(http_request_total[5m])',
        label: 'Given an HTTP request counter, this query calculates the per-second average request rate over the last 5 minutes.',
    },
    {
        title: '95th Percentile of Request Latencies',
        expression: 'histogram_quantile(0.95, sum(rate(prometheus_http_request_duration_seconds_bucket[5m])) by (le))',
        label: 'Calculates the 95th percentile of HTTP request rate over 5 minute windows.',
    },
    {
        title: 'Alerts Firing',
        expression: 'sort_desc(sum(sum_over_time(ALERTS{alertstate="firing"}[24h])) by (alertname))',
        label: 'Sums up the alerts that have been firing over the last 24 hours.',
    },
    {
        title: 'Step',
        label: 'Defines the graph resolution using a duration format (15s, 1m, 3h, ...). Small steps create high-resolution graphs but can be slow over larger time ranges. Using a longer step lowers the resolution and smooths the graph by producing fewer datapoints. If no step is given the resolution is calculated automatically.',
    },
];
/* harmony default export */ __webpack_exports__["default"] = (function (props) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "PromQL Cheat Sheet"),
    CHEAT_SHEET_ITEMS.map(function (item, index) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item", key: index },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item__title" }, item.title),
        item.expression ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item__example", onClick: function (e) { return props.onClickExample({ refId: 'A', expr: item.expression }); } },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, item.expression))) : null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item__label" }, item.label))); }))); });


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromExploreQueryEditor.tsx":
/*!****************************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromExploreQueryEditor.tsx ***!
  \****************************************************************************************/
/*! exports provided: PromExploreQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromExploreQueryEditor", function() { return PromExploreQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _PromQueryField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PromQueryField */ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx");




var PromExploreQueryEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PromExploreQueryEditor, _super);
    function PromExploreQueryEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onFieldChange = function (query, override) {
            _this.query.expr = query.expr;
        };
        _this.onIntervalChange = function (e) {
            var interval = e.currentTarget.value;
            _this.query.interval = interval;
            _this.setState({ interval: interval });
        };
        _this.onRunQuery = function () {
            var query = _this.query;
            _this.props.onChange(query);
            _this.props.onRunQuery();
        };
        _this.onReturnKeyDown = function (e) {
            if (e.key === 'Enter') {
                _this.onRunQuery();
            }
        };
        var query = props.query;
        _this.query = query;
        // Query target properties that are fully controlled inputs
        _this.state = {
            // Fully controlled text inputs
            interval: query.interval,
        };
        return _this;
    }
    PromExploreQueryEditor.prototype.render = function () {
        var _a = this.props, datasource = _a.datasource, query = _a.query, data = _a.data, history = _a.history;
        var interval = this.state.interval;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PromQueryField__WEBPACK_IMPORTED_MODULE_3__["default"], { datasource: datasource, query: query, onRunQuery: this.onRunQuery, onChange: this.onFieldChange, history: history, data: data },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline explore-input--ml" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { width: 4 }, "Step"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", { type: "text", className: "gf-form-input width-6", placeholder: 'auto', onChange: this.onIntervalChange, onKeyDown: this.onReturnKeyDown, value: interval }))))));
    };
    return PromExploreQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromLink.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromLink.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");




var PromLink = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PromLink, _super);
    function PromLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { href: null };
        return _this;
    }
    PromLink.prototype.componentDidUpdate = function (prevProps) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var href;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(prevProps.panelData !== this.props.panelData && this.props.panelData.request)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getExternalLink()];
                    case 1:
                        href = _a.sent();
                        this.setState({ href: href });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PromLink.prototype.getExternalLink = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var _a, query, panelData, target, datasourceName, datasource, _b, range, start, end, rangeDiff, endTime, options, queryOptions, expr, args;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, query = _a.query, panelData = _a.panelData;
                        target = panelData.request.targets.length > 0 ? panelData.request.targets[0] : { datasource: null };
                        datasourceName = target.datasource;
                        if (!datasourceName) return [3 /*break*/, 2];
                        return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__["getDatasourceSrv"])().get(datasourceName)];
                    case 1:
                        _b = (_c.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        _b = this.props.datasource;
                        _c.label = 3;
                    case 3:
                        datasource = _b;
                        range = panelData.request.range;
                        start = datasource.getPrometheusTime(range.from, false);
                        end = datasource.getPrometheusTime(range.to, true);
                        rangeDiff = Math.ceil(end - start);
                        endTime = range.to.utc().format('YYYY-MM-DD HH:mm');
                        options = {
                            interval: panelData.request.interval,
                        };
                        queryOptions = datasource.createQuery(query, options, start, end);
                        expr = {
                            'g0.expr': queryOptions.expr,
                            'g0.range_input': rangeDiff + 's',
                            'g0.end_input': endTime,
                            'g0.step_input': queryOptions.step,
                            'g0.tab': 0,
                        };
                        args = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(expr, function (v, k) {
                            return k + '=' + encodeURIComponent(v);
                        }).join('&');
                        return [2 /*return*/, datasource.directUrl + "/graph?" + args];
                }
            });
        });
    };
    PromLink.prototype.render = function () {
        var href = this.state.href;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: href, target: "_blank", rel: "noopener" },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-share-square-o" }),
            " Prometheus"));
    };
    return PromLink;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PromLink);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx ***!
  \*********************************************************************************/
/*! exports provided: PromQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromQueryEditor", function() { return PromQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _PromQueryField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PromQueryField */ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx");
/* harmony import */ var _PromLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PromLink */ "./public/app/plugins/datasource/prometheus/components/PromLink.tsx");



// Types



var FORMAT_OPTIONS = [
    { label: 'Time series', value: 'time_series' },
    { label: 'Table', value: 'table' },
    { label: 'Heatmap', value: 'heatmap' },
];
var INTERVAL_FACTOR_OPTIONS = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map([1, 2, 3, 4, 5, 10], function (value) { return ({
    value: value,
    label: '1/' + value,
}); });
var PromQueryEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PromQueryEditor, _super);
    function PromQueryEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onFieldChange = function (query, override) {
            _this.query.expr = query.expr;
        };
        _this.onFormatChange = function (option) {
            _this.query.format = option.value;
            _this.setState({ formatOption: option }, _this.onRunQuery);
        };
        _this.onInstantChange = function (e) {
            var instant = e.target.checked;
            _this.query.instant = instant;
            _this.setState({ instant: instant }, _this.onRunQuery);
        };
        _this.onIntervalChange = function (e) {
            var interval = e.currentTarget.value;
            _this.query.interval = interval;
            _this.setState({ interval: interval });
        };
        _this.onIntervalFactorChange = function (option) {
            _this.query.intervalFactor = option.value;
            _this.setState({ intervalFactorOption: option }, _this.onRunQuery);
        };
        _this.onLegendChange = function (e) {
            var legendFormat = e.currentTarget.value;
            _this.query.legendFormat = legendFormat;
            _this.setState({ legendFormat: legendFormat });
        };
        _this.onRunQuery = function () {
            var query = _this.query;
            _this.props.onChange(query);
            _this.props.onRunQuery();
        };
        var query = props.query;
        _this.query = query;
        // Query target properties that are fully controlled inputs
        _this.state = {
            // Fully controlled text inputs
            interval: query.interval,
            legendFormat: query.legendFormat,
            // Select options
            formatOption: FORMAT_OPTIONS.find(function (option) { return option.value === query.format; }) || FORMAT_OPTIONS[0],
            intervalFactorOption: INTERVAL_FACTOR_OPTIONS.find(function (option) { return option.value === query.intervalFactor; }) || INTERVAL_FACTOR_OPTIONS[0],
            // Switch options
            instant: Boolean(query.instant),
        };
        return _this;
    }
    PromQueryEditor.prototype.render = function () {
        var _a = this.props, datasource = _a.datasource, query = _a.query, data = _a.data;
        var _b = this.state, formatOption = _b.formatOption, instant = _b.instant, interval = _b.interval, intervalFactorOption = _b.intervalFactorOption, legendFormat = _b.legendFormat;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_PromQueryField__WEBPACK_IMPORTED_MODULE_4__["default"], { datasource: datasource, query: query, onRunQuery: this.onRunQuery, onChange: this.onFieldChange, history: [], data: data }),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { width: 7, tooltip: "Controls the name of the time series, using name or pattern. For example\r\n        {{hostname}} will be replaced with label value for the label hostname." }, "Legend"),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", { type: "text", className: "gf-form-input", placeholder: "legend format", value: legendFormat, onChange: this.onLegendChange, onBlur: this.onRunQuery })),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { width: 7, tooltip: react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
                            "An additional lower limit for the step parameter of the Prometheus query and for the",
                            ' ',
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("code", null, "$__interval"),
                            " variable. The limit is absolute and not modified by the \"Resolution\" setting.") }, "Min step"),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", { type: "text", className: "gf-form-input width-8", placeholder: interval, onChange: this.onIntervalChange, onBlur: this.onRunQuery, value: interval })),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form-label" }, "Resolution"),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], { isSearchable: false, options: INTERVAL_FACTOR_OPTIONS, onChange: this.onIntervalFactorChange, value: intervalFactorOption })),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form-label" }, "Format"),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], { isSearchable: false, options: FORMAT_OPTIONS, onChange: this.onFormatChange, value: formatOption }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Instant", checked: instant, onChange: this.onInstantChange }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { width: 10, tooltip: "Link to Graph in Prometheus" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_PromLink__WEBPACK_IMPORTED_MODULE_5__["default"], { datasource: datasource, query: this.query, panelData: data }))))));
    };
    return PromQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx ***!
  \********************************************************************************/
/*! exports provided: RECORDING_RULES_GROUP, groupMetricsByPrefix, willApplySuggestion, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECORDING_RULES_GROUP", function() { return RECORDING_RULES_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupMetricsByPrefix", function() { return groupMetricsByPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "willApplySuggestion", function() { return willApplySuggestion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/CancelablePromise */ "./public/app/core/utils/CancelablePromise.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");








var HISTOGRAM_GROUP = '__histograms__';
var PRISM_SYNTAX = 'promql';
var RECORDING_RULES_GROUP = '__recording_rules__';
function getChooserText(hasSyntax, metrics) {
    if (!hasSyntax) {
        return 'Loading metrics...';
    }
    if (metrics && metrics.length === 0) {
        return '(No metrics found)';
    }
    return 'Metrics';
}
function addMetricsMetadata(metric, metadata) {
    var option = { label: metric, value: metric };
    if (metadata && metadata[metric]) {
        var _a = metadata[metric][0], _b = _a.type, type = _b === void 0 ? '' : _b, help = _a.help;
        option.title = [metric, type.toUpperCase(), help].join('\n');
    }
    return option;
}
function groupMetricsByPrefix(metrics, metadata) {
    // Filter out recording rules and insert as first option
    var ruleRegex = /:\w+:/;
    var ruleNames = metrics.filter(function (metric) { return ruleRegex.test(metric); });
    var rulesOption = {
        label: 'Recording rules',
        value: RECORDING_RULES_GROUP,
        children: ruleNames
            .slice()
            .sort()
            .map(function (name) { return ({ label: name, value: name }); }),
    };
    var options = ruleNames.length > 0 ? [rulesOption] : [];
    var delimiter = '_';
    var metricsOptions = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.chain(metrics)
        .filter(function (metric) { return !ruleRegex.test(metric); })
        .groupBy(function (metric) { return metric.split(delimiter)[0]; })
        .map(function (metricsForPrefix, prefix) {
        var prefixIsMetric = metricsForPrefix.length === 1 && metricsForPrefix[0] === prefix;
        var children = prefixIsMetric ? [] : metricsForPrefix.sort().map(function (m) { return addMetricsMetadata(m, metadata); });
        return {
            children: children,
            label: prefix,
            value: prefix,
        };
    })
        .sortBy('label')
        .value();
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(options, metricsOptions);
}
function willApplySuggestion(suggestion, _a) {
    var typeaheadContext = _a.typeaheadContext, typeaheadText = _a.typeaheadText;
    // Modify suggestion based on context
    switch (typeaheadContext) {
        case 'context-labels': {
            var nextChar = _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DOMUtil"].getNextCharacter();
            if (!nextChar || nextChar === '}' || nextChar === ',') {
                suggestion += '=';
            }
            break;
        }
        case 'context-label-values': {
            // Always add quotes and remove existing ones instead
            if (!typeaheadText.match(/^(!?=~?"|")/)) {
                suggestion = "\"" + suggestion;
            }
            if (_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DOMUtil"].getNextCharacter() !== '"') {
                suggestion = suggestion + "\"";
            }
            break;
        }
        default:
    }
    return suggestion;
}
var PromQueryField = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PromQueryField, _super);
    function PromQueryField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.refreshHint = function () {
            var _a = _this.props, datasource = _a.datasource, query = _a.query, data = _a.data;
            if (!data || data.series.length === 0) {
                _this.setState({ hint: null });
                return;
            }
            var result = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["isDataFrame"])(data.series[0]) ? data.series.map(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["toLegacyResponseData"]) : data.series;
            var hints = datasource.getQueryHints(query, result);
            var hint = hints && hints.length > 0 ? hints[0] : null;
            _this.setState({ hint: hint });
        };
        _this.refreshMetrics = function (cancelablePromise) {
            _this.languageProviderInitializationPromise = cancelablePromise;
            _this.languageProviderInitializationPromise.promise
                .then(function (remaining) {
                remaining.map(function (task) { return task.then(_this.onUpdateLanguage).catch(function () { }); });
            })
                .then(function () { return _this.onUpdateLanguage(); })
                .catch(function (_a) {
                var isCanceled = _a.isCanceled;
                if (isCanceled) {
                    console.warn('PromQueryField has unmounted, language provider intialization was canceled');
                }
            });
        };
        _this.onChangeMetrics = function (values, selectedOptions) {
            var query;
            if (selectedOptions.length === 1) {
                if (selectedOptions[0].children.length === 0) {
                    query = selectedOptions[0].value;
                }
                else {
                    // Ignore click on group
                    return;
                }
            }
            else {
                var prefix = selectedOptions[0].value;
                var metric = selectedOptions[1].value;
                if (prefix === HISTOGRAM_GROUP) {
                    query = "histogram_quantile(0.95, sum(rate(" + metric + "[5m])) by (le))";
                }
                else {
                    query = metric;
                }
            }
            _this.onChangeQuery(query, true);
        };
        _this.onChangeQuery = function (value, override) {
            // Send text change to parent
            var _a = _this.props, query = _a.query, onChange = _a.onChange, onRunQuery = _a.onRunQuery;
            if (onChange) {
                var nextQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { expr: value });
                onChange(nextQuery);
                if (override && onRunQuery) {
                    onRunQuery();
                }
            }
        };
        _this.onClickHintFix = function () {
            var _a = _this.props, datasource = _a.datasource, query = _a.query, onChange = _a.onChange, onRunQuery = _a.onRunQuery;
            var hint = _this.state.hint;
            onChange(datasource.modifyQuery(query, hint.fix.action));
            onRunQuery();
        };
        _this.onUpdateLanguage = function () {
            var _a = _this.languageProvider, histogramMetrics = _a.histogramMetrics, metrics = _a.metrics, metricsMetadata = _a.metricsMetadata, lookupsDisabled = _a.lookupsDisabled, lookupMetricsThreshold = _a.lookupMetricsThreshold;
            if (!metrics) {
                return;
            }
            // Build metrics tree
            var metricsByPrefix = groupMetricsByPrefix(metrics, metricsMetadata);
            var histogramOptions = histogramMetrics.map(function (hm) { return ({ label: hm, value: hm }); });
            var metricsOptions = histogramMetrics.length > 0
                ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([
                    { label: 'Histograms', value: HISTOGRAM_GROUP, children: histogramOptions, isLeaf: false }
                ], metricsByPrefix) : metricsByPrefix;
            // Hint for big disabled lookups
            var hint;
            if (lookupsDisabled) {
                hint = {
                    label: "Dynamic label lookup is disabled for datasources with more than " + lookupMetricsThreshold + " metrics.",
                    type: 'INFO',
                };
            }
            _this.setState({ hint: hint, metricsOptions: metricsOptions, syntaxLoaded: true });
        };
        _this.onTypeahead = function (typeahead) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
            var history, prefix, text, value, wrapperClasses, labelKey, result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.languageProvider) {
                            return [2 /*return*/, { suggestions: [] }];
                        }
                        history = this.props.history;
                        prefix = typeahead.prefix, text = typeahead.text, value = typeahead.value, wrapperClasses = typeahead.wrapperClasses, labelKey = typeahead.labelKey;
                        return [4 /*yield*/, this.languageProvider.provideCompletionItems({ text: text, value: value, prefix: prefix, wrapperClasses: wrapperClasses, labelKey: labelKey }, { history: history })];
                    case 1:
                        result = _a.sent();
                        // console.log('handleTypeahead', wrapperClasses, text, prefix, labelKey, result.context);
                        return [2 /*return*/, result];
                }
            });
        }); };
        if (props.datasource.languageProvider) {
            _this.languageProvider = props.datasource.languageProvider;
        }
        _this.plugins = [
            Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["BracesPlugin"])(),
            Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["SlatePrism"])({
                onlyIn: function (node) { return node.type === 'code_block'; },
                getSyntax: function (node) { return 'promql'; },
            }),
        ];
        _this.state = {
            metricsOptions: [],
            syntaxLoaded: false,
            hint: null,
        };
        return _this;
    }
    PromQueryField.prototype.componentDidMount = function () {
        if (this.languageProvider) {
            prismjs__WEBPACK_IMPORTED_MODULE_4___default.a.languages[PRISM_SYNTAX] = this.languageProvider.syntax;
            this.refreshMetrics(Object(app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_5__["makePromiseCancelable"])(this.languageProvider.start()));
        }
        this.refreshHint();
    };
    PromQueryField.prototype.componentWillUnmount = function () {
        if (this.languageProviderInitializationPromise) {
            this.languageProviderInitializationPromise.cancel();
        }
    };
    PromQueryField.prototype.componentDidUpdate = function (prevProps) {
        var data = this.props.data;
        if (data && prevProps.data && prevProps.data.series !== data.series) {
            this.refreshHint();
        }
    };
    PromQueryField.prototype.render = function () {
        var _a = this.props, data = _a.data, query = _a.query, children = _a.children;
        var _b = this.state, metricsOptions = _b.metricsOptions, syntaxLoaded = _b.syntaxLoaded, hint = _b.hint;
        var cleanText = this.languageProvider ? this.languageProvider.cleanText : undefined;
        var chooserText = getChooserText(syntaxLoaded, metricsOptions);
        var buttonDisabled = !(syntaxLoaded && metricsOptions && metricsOptions.length > 0);
        var showError = data && data.error && data.error.refId === query.refId;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form-inline gf-form-inline--nowrap flex-grow-1" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form flex-shrink-0" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ButtonCascader"], { options: metricsOptions, disabled: buttonDisabled, onChange: this.onChangeMetrics }, chooserText)),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form gf-form--grow flex-shrink-1" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["QueryField"], { additionalPlugins: this.plugins, cleanText: cleanText, query: query.expr, onTypeahead: this.onTypeahead, onWillApplySuggestion: willApplySuggestion, onBlur: this.props.onBlur, onChange: this.onChangeQuery, onRunQuery: this.props.onRunQuery, placeholder: "Enter a PromQL query", portalOrigin: "prometheus", syntaxLoaded: syntaxLoaded })),
                children),
            showError ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "query-row-break" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "prom-query-field-info text-error" }, data.error.message))) : null,
            hint ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "query-row-break" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "prom-query-field-info text-warning" },
                    hint.label,
                    ' ',
                    hint.fix ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { className: "text-link muted", onClick: this.onClickHintFix }, hint.fix.label)) : null))) : null));
    };
    return PromQueryField;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.PureComponent));
/* harmony default export */ __webpack_exports__["default"] = (PromQueryField);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/configuration/ConfigEditor.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/configuration/ConfigEditor.tsx ***!
  \*********************************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _PromSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PromSettings */ "./public/app/plugins/datasource/prometheus/configuration/PromSettings.tsx");



var ConfigEditor = function (props) {
    var options = props.options, onOptionsChange = props.onOptionsChange;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], { defaultUrl: "http://localhost:9090", dataSourceConfig: options, onChange: onOptionsChange }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PromSettings__WEBPACK_IMPORTED_MODULE_2__["PromSettings"], { value: options, onChange: onOptionsChange })));
};


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/configuration/PromSettings.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/configuration/PromSettings.tsx ***!
  \*********************************************************************************/
/*! exports provided: PromSettings, promSettingsValidationEvents, getValueFromEventItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromSettings", function() { return PromSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promSettingsValidationEvents", function() { return promSettingsValidationEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValueFromEventItem", function() { return getValueFromEventItem; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
var _a;



var httpOptions = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
];
var PromSettings = function (props) {
    var value = props.value, onChange = props.onChange;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { label: "Scrape interval", labelWidth: 13, placeholder: "15s", inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-6", value: value.jsonData.timeInterval, spellCheck: false, onChange: onChangeHandler('timeInterval', value, onChange), validationEvents: promSettingsValidationEvents }), tooltip: "Set this to the typical scrape and evaluation interval configured in Prometheus. Defaults to 15s." }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { label: "Query timeout", labelWidth: 13, inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-6", value: value.jsonData.queryTimeout, onChange: onChangeHandler('queryTimeout', value, onChange), spellCheck: false, placeholder: "60s", validationEvents: promSettingsValidationEvents }), tooltip: "Set the Prometheus query timeout." }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { width: 13, tooltip: "Specify the HTTP Method to query Prometheus. (POST is only available in Prometheus >= v2.1.0)" }, "HTTP Method"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { options: httpOptions, value: httpOptions.find(function (o) { return o.value === value.jsonData.httpMethod; }), onChange: onChangeHandler('httpMethod', value, onChange), width: 7 }))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Misc"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { label: "Custom query parameters", labelWidth: 14, tooltip: "Add Custom parameters to Prometheus or Thanos queries.", inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-25", value: value.jsonData.customQueryParameters, onChange: onChangeHandler('customQueryParameters', value, onChange), spellCheck: false, placeholder: "Example: max_source_resolution=5m&timeout=10" }) }))))));
};
var promSettingsValidationEvents = (_a = {},
    _a[_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["EventsWithValidation"].onBlur] = [
        Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["regexValidation"])(/^$|^\d+(ms|[Mwdhmsy])$/, 'Value is not valid, you can use number with time unit specifier: y, M, w, d, h, m, s'),
    ],
    _a);
var getValueFromEventItem = function (eventItem) {
    if (!eventItem) {
        return '';
    }
    if (eventItem.hasOwnProperty('currentTarget')) {
        return eventItem.currentTarget.value;
    }
    return eventItem.value;
};
var onChangeHandler = function (key, value, onChange) { return function (eventItem) {
    var _a;
    onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value.jsonData), (_a = {}, _a[key] = getValueFromEventItem(eventItem), _a)) }));
}; };


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/datasource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/datasource.ts ***!
  \****************************************************************/
/*! exports provided: PrometheusDatasource, alignRange, extractRuleMappingFromGroups, prometheusRegularEscape, prometheusSpecialRegexEscape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrometheusDatasource", function() { return PrometheusDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alignRange", function() { return alignRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractRuleMappingFromGroups", function() { return extractRuleMappingFromGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prometheusRegularEscape", function() { return prometheusRegularEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prometheusSpecialRegexEscape", function() { return prometheusSpecialRegexEscape; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/defaults */ "./node_modules/lodash/defaults.js");
/* harmony import */ var lodash_defaults__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_defaults__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/kbn */ "./public/app/core/utils/kbn.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _metric_find_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./metric_find_query */ "./public/app/plugins/datasource/prometheus/metric_find_query.ts");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/prometheus/result_transformer.ts");
/* harmony import */ var _language_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./language_provider */ "./public/app/plugins/datasource/prometheus/language_provider.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var _add_label_to_query__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./add_label_to_query */ "./public/app/plugins/datasource/prometheus/add_label_to_query.ts");
/* harmony import */ var _query_hints__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./query_hints */ "./public/app/plugins/datasource/prometheus/query_hints.ts");
/* harmony import */ var _language_utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");

// Libraries



// Services & Utils














var PrometheusDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PrometheusDatasource, _super);
    function PrometheusDatasource(instanceSettings) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.init = function () {
            _this.loadRules();
        };
        _this.processResult = function (response, query, target, responseListLength) {
            // Keeping original start/end for transformers
            var transformerOptions = {
                format: target.format,
                step: query.step,
                legendFormat: target.legendFormat,
                start: query.start,
                end: query.end,
                query: query.expr,
                responseListLength: responseListLength,
                refId: target.refId,
                valueWithRefId: target.valueWithRefId,
            };
            var series = _this.resultTransformer.transform(response, transformerOptions);
            return series;
        };
        _this.prepareTargets = function (options, start, end) {
            var e_1, _a;
            var queries = [];
            var activeTargets = [];
            try {
                for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(options.targets), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var target = _c.value;
                    if (!target.expr || target.hide) {
                        continue;
                    }
                    target.requestId = options.panelId + target.refId;
                    if (options.app !== _grafana_data__WEBPACK_IMPORTED_MODULE_5__["CoreApp"].Explore) {
                        activeTargets.push(target);
                        queries.push(_this.createQuery(target, options, start, end));
                        continue;
                    }
                    if (target.showingTable) {
                        // create instant target only if Table is showed in Explore
                        var instantTarget = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(target);
                        instantTarget.format = 'table';
                        instantTarget.instant = true;
                        instantTarget.valueWithRefId = true;
                        delete instantTarget.maxDataPoints;
                        instantTarget.requestId += '_instant';
                        activeTargets.push(instantTarget);
                        queries.push(_this.createQuery(instantTarget, options, start, end));
                    }
                    if (target.showingGraph) {
                        // create time series target only if Graph is showed in Explore
                        target.format = 'time_series';
                        target.instant = false;
                        activeTargets.push(target);
                        queries.push(_this.createQuery(target, options, start, end));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return {
                queries: queries,
                activeTargets: activeTargets,
            };
        };
        _this.handleErrors = function (err, target) {
            var error = {
                message: (err && err.statusText) || 'Unknown error during query transaction. Please check JS console logs.',
                refId: target.refId,
            };
            if (err.data) {
                if (typeof err.data === 'string') {
                    error.message = err.data;
                }
                else if (err.data.error) {
                    error.message = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__["safeStringifyValue"])(err.data.error);
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
        _this.type = 'prometheus';
        _this.editorSrc = 'app/features/prometheus/partials/query.editor.html';
        _this.url = instanceSettings.url;
        _this.basicAuth = instanceSettings.basicAuth;
        _this.withCredentials = instanceSettings.withCredentials;
        _this.interval = instanceSettings.jsonData.timeInterval || '15s';
        _this.queryTimeout = instanceSettings.jsonData.queryTimeout;
        _this.httpMethod = instanceSettings.jsonData.httpMethod || 'GET';
        _this.directUrl = instanceSettings.jsonData.directUrl;
        _this.resultTransformer = new _result_transformer__WEBPACK_IMPORTED_MODULE_9__["ResultTransformer"](app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_16__["default"]);
        _this.ruleMappings = {};
        _this.languageProvider = new _language_provider__WEBPACK_IMPORTED_MODULE_10__["default"](_this);
        _this.customQueryParameters = new URLSearchParams(instanceSettings.jsonData.customQueryParameters);
        return _this;
    }
    PrometheusDatasource.prototype.getQueryDisplayText = function (query) {
        return query.expr;
    };
    PrometheusDatasource.prototype._addTracingHeaders = function (httpOptions, options) {
        httpOptions.headers = {};
        var proxyMode = !this.url.match(/^http/);
        if (proxyMode) {
            httpOptions.headers['X-Dashboard-Id'] = options.dashboardId;
            httpOptions.headers['X-Panel-Id'] = options.panelId;
        }
    };
    PrometheusDatasource.prototype._request = function (url, data, options) {
        if (data === void 0) { data = {}; }
        options = lodash_defaults__WEBPACK_IMPORTED_MODULE_2___default()(options || {}, {
            url: this.url + url,
            method: this.httpMethod,
            headers: {},
        });
        if (options.method === 'GET') {
            if (data && Object.keys(data).length) {
                options.url =
                    options.url +
                        '?' +
                        Object.entries(data)
                            .map(function (_a) {
                            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), k = _b[0], v = _b[1];
                            return encodeURIComponent(k) + "=" + encodeURIComponent(v);
                        })
                            .join('&');
            }
        }
        else {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.transformRequest = function (data) { return jquery__WEBPACK_IMPORTED_MODULE_3___default.a.param(data); };
            options.data = data;
        }
        if (this.basicAuth || this.withCredentials) {
            options.withCredentials = true;
        }
        if (this.basicAuth) {
            options.headers.Authorization = this.basicAuth;
        }
        return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_11__["getBackendSrv"])().datasourceRequest(options);
    };
    // Use this for tab completion features, wont publish response to other components
    PrometheusDatasource.prototype.metadataRequest = function (url) {
        return this._request(url, null, { method: 'GET', silent: true });
    };
    PrometheusDatasource.prototype.interpolateQueryExpr = function (value, variable) {
        if (value === void 0) { value = []; }
        // if no multi or include all do not regexEscape
        if (!variable.multi && !variable.includeAll) {
            return prometheusRegularEscape(value);
        }
        if (typeof value === 'string') {
            return prometheusSpecialRegexEscape(value);
        }
        var escapedValues = value.map(function (val) { return prometheusSpecialRegexEscape(val); });
        return escapedValues.join('|');
    };
    PrometheusDatasource.prototype.targetContainsTemplate = function (target) {
        return app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_16__["default"].variableExists(target.expr);
    };
    PrometheusDatasource.prototype.query = function (options) {
        var start = this.getPrometheusTime(options.range.from, false);
        var end = this.getPrometheusTime(options.range.to, true);
        var _a = this.prepareTargets(options, start, end), queries = _a.queries, activeTargets = _a.activeTargets;
        // No valid targets, return the empty result to save a round trip.
        if (!queries || !queries.length) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])({
                data: [],
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Done,
            });
        }
        if (options.app === _grafana_data__WEBPACK_IMPORTED_MODULE_5__["CoreApp"].Explore) {
            return this.exploreQuery(queries, activeTargets, end);
        }
        return this.panelsQuery(queries, activeTargets, end, options.requestId);
    };
    PrometheusDatasource.prototype.exploreQuery = function (queries, activeTargets, end) {
        var _this = this;
        var runningQueriesCount = queries.length;
        var subQueries = queries.map(function (query, index) {
            var target = activeTargets[index];
            var observable = null;
            if (query.instant) {
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(_this.performInstantQuery(query, end));
            }
            else {
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(_this.performTimeSeriesQuery(query, query.start, query.end));
            }
            return observable.pipe(
            // Decrease the counter here. We assume that each request returns only single value and then completes
            // (should hold until there is some streaming requests involved).
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["tap"])(function () { return runningQueriesCount--; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (response) { return (response.cancelled ? false : true); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (response) {
                var data = _this.processResult(response, query, target, queries.length);
                return {
                    data: data,
                    key: query.requestId,
                    state: runningQueriesCount === 0 ? _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Done : _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Loading,
                };
            }));
        });
        return rxjs__WEBPACK_IMPORTED_MODULE_6__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(subQueries));
    };
    PrometheusDatasource.prototype.panelsQuery = function (queries, activeTargets, end, requestId) {
        var _this = this;
        var observables = queries.map(function (query, index) {
            var target = activeTargets[index];
            var observable = null;
            if (query.instant) {
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(_this.performInstantQuery(query, end));
            }
            else {
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["from"])(_this.performTimeSeriesQuery(query, query.start, query.end));
            }
            return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["filter"])(function (response) { return (response.cancelled ? false : true); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (response) {
                var data = _this.processResult(response, query, target, queries.length);
                return data;
            }));
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["forkJoin"])(observables).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(function (results) {
            var data = results.reduce(function (result, current) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(result, current);
            }, []);
            return {
                data: data,
                key: requestId,
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Done,
            };
        }));
    };
    PrometheusDatasource.prototype.createQuery = function (target, options, start, end) {
        var query = {
            hinting: target.hinting,
            instant: target.instant,
            step: 0,
            expr: '',
            requestId: target.requestId,
            refId: target.refId,
            start: 0,
            end: 0,
        };
        var range = Math.ceil(end - start);
        // options.interval is the dynamically calculated interval
        var interval = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_4__["default"].interval_to_seconds(options.interval);
        // Minimum interval ("Min step"), if specified for the query or datasource. or same as interval otherwise
        var minInterval = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_4__["default"].interval_to_seconds(app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_16__["default"].replace(target.interval, options.scopedVars) || options.interval);
        var intervalFactor = target.intervalFactor || 1;
        // Adjust the interval to take into account any specified minimum and interval factor plus Prometheus limits
        var adjustedInterval = this.adjustInterval(interval, minInterval, range, intervalFactor);
        var scopedVars = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.scopedVars), this.getRangeScopedVars(options.range));
        // If the interval was adjusted, make a shallow copy of scopedVars with updated interval vars
        if (interval !== adjustedInterval) {
            interval = adjustedInterval;
            scopedVars = Object.assign({}, options.scopedVars, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ __interval: { text: interval + 's', value: interval + 's' }, __interval_ms: { text: interval * 1000, value: interval * 1000 } }, this.getRangeScopedVars(options.range)));
        }
        query.step = interval;
        var expr = target.expr;
        // Apply adhoc filters
        var adhocFilters = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_16__["default"].getAdhocFilters(this.name);
        expr = adhocFilters.reduce(function (acc, filter) {
            var key = filter.key, operator = filter.operator;
            var value = filter.value;
            if (operator === '=~' || operator === '!~') {
                value = prometheusRegularEscape(value);
            }
            return Object(_add_label_to_query__WEBPACK_IMPORTED_MODULE_12__["default"])(acc, key, value, operator);
        }, expr);
        // Only replace vars in expression after having (possibly) updated interval vars
        query.expr = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_16__["default"].replace(expr, scopedVars, this.interpolateQueryExpr);
        // Align query interval with step to allow query caching and to ensure
        // that about-same-time query results look the same.
        var adjusted = alignRange(start, end, query.step, Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_17__["getTimeSrv"])()
            .timeRange()
            .to.utcOffset() * 60);
        query.start = adjusted.start;
        query.end = adjusted.end;
        this._addTracingHeaders(query, options);
        return query;
    };
    PrometheusDatasource.prototype.adjustInterval = function (interval, minInterval, range, intervalFactor) {
        // Prometheus will drop queries that might return more than 11000 data points.
        // Calculate a safe interval as an additional minimum to take into account.
        var safeInterval = Math.ceil(range / 11000);
        return Math.max(interval * intervalFactor, minInterval, safeInterval, 1);
    };
    PrometheusDatasource.prototype.performTimeSeriesQuery = function (query, start, end) {
        var e_2, _a;
        var _this = this;
        if (start > end) {
            throw { message: 'Invalid time range' };
        }
        var url = '/api/v1/query_range';
        var data = {
            query: query.expr,
            start: start,
            end: end,
            step: query.step,
        };
        if (this.queryTimeout) {
            data['timeout'] = this.queryTimeout;
        }
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.customQueryParameters), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_c.value, 2), key = _d[0], value = _d[1];
                if (data[key] == null) {
                    data[key] = value;
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
        return this._request(url, data, { requestId: query.requestId, headers: query.headers }).catch(function (err) {
            if (err.cancelled) {
                return err;
            }
            throw _this.handleErrors(err, query);
        });
    };
    PrometheusDatasource.prototype.performInstantQuery = function (query, time) {
        var e_3, _a;
        var _this = this;
        var url = '/api/v1/query';
        var data = {
            query: query.expr,
            time: time,
        };
        if (this.queryTimeout) {
            data['timeout'] = this.queryTimeout;
        }
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.customQueryParameters), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_c.value, 2), key = _d[0], value = _d[1];
                if (data[key] == null) {
                    data[key] = value;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return this._request(url, data, { requestId: query.requestId, headers: query.headers }).catch(function (err) {
            if (err.cancelled) {
                return err;
            }
            throw _this.handleErrors(err, query);
        });
    };
    PrometheusDatasource.prototype.performSuggestQuery = function (query, cache) {
        if (cache === void 0) { cache = false; }
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var response;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (cache && ((_a = this.metricsNameCache) === null || _a === void 0 ? void 0 : _a.expire) > Date.now()) {
                            return [2 /*return*/, this.metricsNameCache.data.filter(function (metricName) { return metricName.indexOf(query) !== 1; })];
                        }
                        return [4 /*yield*/, this.metadataRequest('/api/v1/label/__name__/values')];
                    case 1:
                        response = _b.sent();
                        this.metricsNameCache = {
                            data: response.data.data,
                            expire: Date.now() + 60 * 1000,
                        };
                        return [2 /*return*/, response.data.data.filter(function (metricName) { return metricName.indexOf(query) !== 1; })];
                }
            });
        });
    };
    PrometheusDatasource.prototype.metricFindQuery = function (query) {
        if (!query) {
            return Promise.resolve([]);
        }
        var scopedVars = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ __interval: { text: this.interval, value: this.interval }, __interval_ms: { text: app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_4__["default"].interval_to_ms(this.interval), value: app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_4__["default"].interval_to_ms(this.interval) } }, this.getRangeScopedVars(Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_17__["getTimeSrv"])().timeRange()));
        var interpolated = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_16__["default"].replace(query, scopedVars, this.interpolateQueryExpr);
        var metricFindQuery = new _metric_find_query__WEBPACK_IMPORTED_MODULE_8__["default"](this, interpolated);
        return metricFindQuery.process();
    };
    PrometheusDatasource.prototype.getRangeScopedVars = function (range) {
        if (range === void 0) { range = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_17__["getTimeSrv"])().timeRange(); }
        var msRange = range.to.diff(range.from);
        var sRange = Math.round(msRange / 1000);
        var regularRange = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_4__["default"].secondsToHms(msRange / 1000);
        return {
            __range_ms: { text: msRange, value: msRange },
            __range_s: { text: sRange, value: sRange },
            __range: { text: regularRange, value: regularRange },
        };
    };
    PrometheusDatasource.prototype.annotationQuery = function (options) {
        var _a, _b, _c, _d;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var annotation, _e, expr, _f, tagKeys, _g, titleFormat, _h, textFormat, _j, step, start, end, queryOptions, minStep, queryModel, query, self, response, eventList, splitKeys;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        annotation = options.annotation;
                        _e = annotation.expr, expr = _e === void 0 ? '' : _e, _f = annotation.tagKeys, tagKeys = _f === void 0 ? '' : _f, _g = annotation.titleFormat, titleFormat = _g === void 0 ? '' : _g, _h = annotation.textFormat, textFormat = _h === void 0 ? '' : _h, _j = annotation.step, step = _j === void 0 ? '60s' : _j;
                        if (!expr) {
                            return [2 /*return*/, Promise.resolve([])];
                        }
                        start = this.getPrometheusTime(options.range.from, false);
                        end = this.getPrometheusTime(options.range.to, true);
                        queryOptions = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { interval: step });
                        minStep = '1s';
                        queryModel = {
                            expr: expr,
                            interval: minStep,
                            refId: 'X',
                            requestId: "prom-query-" + annotation.name,
                        };
                        query = this.createQuery(queryModel, queryOptions, start, end);
                        self = this;
                        return [4 /*yield*/, this.performTimeSeriesQuery(query, query.start, query.end)];
                    case 1:
                        response = _l.sent();
                        eventList = [];
                        splitKeys = tagKeys.split(',');
                        if (response.cancelled) {
                            return [2 /*return*/, []];
                        }
                        (_d = (_c = (_b = (_a = response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.result) === null || _d === void 0 ? void 0 : _d.forEach(function (series) {
                            var e_4, _a;
                            var tags = Object.entries(series.metric)
                                .filter(function (_a) {
                                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 1), k = _b[0];
                                return splitKeys.includes(k);
                            })
                                .map(function (_a) {
                                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), _k = _b[0], v = _b[1];
                                return v;
                            });
                            var dupCheck = {};
                            try {
                                for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(series.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var value = _c.value;
                                    var valueIsTrue = value[1] === '1'; // e.g. ALERTS
                                    if (valueIsTrue || annotation.useValueForTime) {
                                        var event = {
                                            annotation: annotation,
                                            title: self.resultTransformer.renderTemplate(titleFormat, series.metric),
                                            tags: tags,
                                            text: self.resultTransformer.renderTemplate(textFormat, series.metric),
                                        };
                                        if (annotation.useValueForTime) {
                                            var timestampValue = Math.floor(parseFloat(value[1]));
                                            if (dupCheck[timestampValue]) {
                                                continue;
                                            }
                                            dupCheck[timestampValue] = true;
                                            event.time = timestampValue;
                                        }
                                        else {
                                            event.time = Math.floor(parseFloat(value[0])) * 1000;
                                        }
                                        eventList.push(event);
                                    }
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                        });
                        return [2 /*return*/, eventList];
                }
            });
        });
    };
    PrometheusDatasource.prototype.getTagKeys = function () {
        var _a, _b, _c, _d;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.metadataRequest('/api/v1/labels')];
                    case 1:
                        result = _e.sent();
                        return [2 /*return*/, (_d = (_c = (_b = (_a = result) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.map(function (value) { return ({ text: value }); }), (_d !== null && _d !== void 0 ? _d : []))];
                }
            });
        });
    };
    PrometheusDatasource.prototype.getTagValues = function (options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c, _d;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.metadataRequest("/api/v1/label/" + options.key + "/values")];
                    case 1:
                        result = _e.sent();
                        return [2 /*return*/, (_d = (_c = (_b = (_a = result) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.map(function (value) { return ({ text: value }); }), (_d !== null && _d !== void 0 ? _d : []))];
                }
            });
        });
    };
    PrometheusDatasource.prototype.testDatasource = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var now, query, response;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date().getTime();
                        query = { expr: '1+1' };
                        return [4 /*yield*/, this.performInstantQuery(query, now / 1000)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.status === 'success'
                                ? { status: 'success', message: 'Data source is working' }
                                : { status: 'error', message: response.error }];
                }
            });
        });
    };
    PrometheusDatasource.prototype.interpolateVariablesInQueries = function (queries, scopedVars) {
        var _this = this;
        var expandedQueries = queries;
        if (queries && queries.length) {
            expandedQueries = queries.map(function (query) {
                var expandedQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { datasource: _this.name, expr: app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_16__["default"].replace(query.expr, scopedVars, _this.interpolateQueryExpr) });
                return expandedQuery;
            });
        }
        return expandedQueries;
    };
    PrometheusDatasource.prototype.getQueryHints = function (query, result) {
        var _a;
        return Object(_query_hints__WEBPACK_IMPORTED_MODULE_13__["getQueryHints"])((_a = query.expr, (_a !== null && _a !== void 0 ? _a : '')), result, this);
    };
    PrometheusDatasource.prototype.loadRules = function () {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var res, body, groups, e_5;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.metadataRequest('/api/v1/rules')];
                    case 1:
                        res = _c.sent();
                        body = res.data || res.json();
                        groups = (_b = (_a = body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.groups;
                        if (groups) {
                            this.ruleMappings = extractRuleMappingFromGroups(groups);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _c.sent();
                        console.log('Rules API is experimental. Ignore next error.');
                        console.error(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrometheusDatasource.prototype.modifyQuery = function (query, action) {
        var _a;
        var expression = (_a = query.expr, (_a !== null && _a !== void 0 ? _a : ''));
        switch (action.type) {
            case 'ADD_FILTER': {
                expression = Object(_add_label_to_query__WEBPACK_IMPORTED_MODULE_12__["default"])(expression, action.key, action.value);
                break;
            }
            case 'ADD_HISTOGRAM_QUANTILE': {
                expression = "histogram_quantile(0.95, sum(rate(" + expression + "[5m])) by (le))";
                break;
            }
            case 'ADD_RATE': {
                expression = "rate(" + expression + "[5m])";
                break;
            }
            case 'ADD_SUM': {
                expression = "sum(" + expression.trim() + ") by ($1)";
                break;
            }
            case 'EXPAND_RULES': {
                if (action.mapping) {
                    expression = Object(_language_utils__WEBPACK_IMPORTED_MODULE_14__["expandRecordingRules"])(expression, action.mapping);
                }
                break;
            }
            default:
                break;
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { expr: expression });
    };
    PrometheusDatasource.prototype.getPrometheusTime = function (date, roundUp) {
        if (typeof date === 'string') {
            date = _grafana_data__WEBPACK_IMPORTED_MODULE_5__["dateMath"].parse(date, roundUp);
        }
        return Math.ceil(date.valueOf() / 1000);
    };
    PrometheusDatasource.prototype.getTimeRange = function () {
        var range = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_17__["getTimeSrv"])().timeRange();
        return {
            start: this.getPrometheusTime(range.from, false),
            end: this.getPrometheusTime(range.to, true),
        };
    };
    PrometheusDatasource.prototype.getOriginalMetricName = function (labelData) {
        return this.resultTransformer.getOriginalMetricName(labelData);
    };
    return PrometheusDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["DataSourceApi"]));

/**
 * Align query range to step.
 * Rounds start and end down to a multiple of step.
 * @param start Timestamp marking the beginning of the range.
 * @param end Timestamp marking the end of the range.
 * @param step Interval to align start and end with.
 * @param utcOffsetSec Number of seconds current timezone is offset from UTC
 */
function alignRange(start, end, step, utcOffsetSec) {
    var alignedEnd = Math.floor((end + utcOffsetSec) / step) * step - utcOffsetSec;
    var alignedStart = Math.floor((start + utcOffsetSec) / step) * step - utcOffsetSec;
    return {
        end: alignedEnd,
        start: alignedStart,
    };
}
function extractRuleMappingFromGroups(groups) {
    return groups.reduce(function (mapping, group) {
        return group.rules
            .filter(function (rule) { return rule.type === 'recording'; })
            .reduce(function (acc, rule) {
            var _a;
            return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc), (_a = {}, _a[rule.name] = rule.query, _a)));
        }, mapping);
    }, {});
}
function prometheusRegularEscape(value) {
    return typeof value === 'string' ? value.replace(/'/g, "\\\\'") : value;
}
function prometheusSpecialRegexEscape(value) {
    return typeof value === 'string'
        ? prometheusRegularEscape(value.replace(/\\/g, '\\\\\\\\').replace(/[$^*{}\[\]+?.()|]/g, '\\\\$&'))
        : value;
}


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/language_provider.ts":
/*!***********************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/language_provider.ts ***!
  \***********************************************************************/
/*! exports provided: DEFAULT_LOOKUP_METRICS_THRESHOLD, addHistoryMetadata, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_LOOKUP_METRICS_THRESHOLD", function() { return DEFAULT_LOOKUP_METRICS_THRESHOLD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addHistoryMetadata", function() { return addHistoryMetadata; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lru-cache */ "./node_modules/lru-cache/index.js");
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lru_cache__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _language_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var _promql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./promql */ "./public/app/plugins/datasource/prometheus/promql.ts");






var DEFAULT_KEYS = ['job', 'instance'];
var EMPTY_SELECTOR = '{}';
var HISTORY_ITEM_COUNT = 5;
var HISTORY_COUNT_CUTOFF = 1000 * 60 * 60 * 24; // 24h
var DEFAULT_LOOKUP_METRICS_THRESHOLD = 10000; // number of metrics defining an installation that's too big
var wrapLabel = function (label) { return ({ label: label }); };
var setFunctionKind = function (suggestion) {
    suggestion.kind = 'function';
    return suggestion;
};
function addHistoryMetadata(item, history) {
    var cutoffTs = Date.now() - HISTORY_COUNT_CUTOFF;
    var historyForItem = history.filter(function (h) { return h.ts > cutoffTs && h.query === item.label; });
    var count = historyForItem.length;
    var recent = historyForItem[0];
    var hint = "Queried " + count + " times in the last 24h.";
    if (recent) {
        var lastQueried = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTime"])(recent.ts).fromNow();
        hint = hint + " Last queried " + lastQueried + ".";
    }
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, item), { documentation: hint });
}
function addMetricsMetadata(metric, metadata) {
    var item = { label: metric };
    if (metadata && metadata[metric]) {
        var _a = metadata[metric][0], type = _a.type, help = _a.help;
        item.documentation = type.toUpperCase() + ": " + help;
    }
    return item;
}
var PREFIX_DELIMITER_REGEX = /(="|!="|=~"|!~"|\{|\[|\(|\+|-|\/|\*|%|\^|\band\b|\bor\b|\bunless\b|==|>=|!=|<=|>|<|=|~|,)/;
var PromQlLanguageProvider = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PromQlLanguageProvider, _super);
    function PromQlLanguageProvider(datasource, initialValues) {
        var _this = _super.call(this) || this;
        /**
         *  Cache for labels of series. This is bit simplistic in the sense that it just counts responses each as a 1 and does
         *  not account for different size of a response. If that is needed a `length` function can be added in the options.
         *  10 as a max size is totally arbitrary right now.
         */
        _this.labelsCache = new lru_cache__WEBPACK_IMPORTED_MODULE_2___default.a(10);
        _this.request = function (url, defaultValue) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
            var res, body, error_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.datasource.metadataRequest(url)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, (res.data || res.json())];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, body.data];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, defaultValue];
                }
            });
        }); };
        _this.start = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
            var _a, _b;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.request('/api/v1/label/__name__/values', [])];
                    case 1:
                        _a.metrics = _c.sent();
                        this.lookupsDisabled = this.metrics.length > this.lookupMetricsThreshold;
                        _b = this;
                        return [4 /*yield*/, this.request('/api/v1/metadata', {})];
                    case 2:
                        _b.metricsMetadata = _c.sent();
                        this.processHistogramMetrics(this.metrics);
                        return [2 /*return*/, []];
                }
            });
        }); };
        _this.processHistogramMetrics = function (data) {
            var values = Object(_language_utils__WEBPACK_IMPORTED_MODULE_4__["processHistogramLabels"])(data).values;
            if (values && values['__name__']) {
                _this.histogramMetrics = values['__name__'].slice().sort();
            }
        };
        _this.provideCompletionItems = function (_a, context) {
            var prefix = _a.prefix, text = _a.text, value = _a.value, labelKey = _a.labelKey, wrapperClasses = _a.wrapperClasses;
            if (context === void 0) { context = { history: [] }; }
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
                var empty, selectedLines, currentLine, nextCharacter, tokenRecognized, prefixUnrecognized, noSuffix, safePrefix, operatorsPattern, isNextOperand;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                    empty = value.document.text.length === 0;
                    selectedLines = value.document.getTextsAtRange(value.selection);
                    currentLine = selectedLines.size === 1 ? selectedLines.first().getText() : null;
                    nextCharacter = currentLine ? currentLine[value.selection.anchor.offset] : null;
                    tokenRecognized = wrapperClasses.length > 3;
                    prefixUnrecognized = prefix && !tokenRecognized;
                    noSuffix = !nextCharacter || nextCharacter === ')';
                    safePrefix = prefix && !text.match(/^[\]})\s]+$/) && noSuffix;
                    operatorsPattern = /[+\-*/^%]/;
                    isNextOperand = text.match(operatorsPattern);
                    // Determine candidates by CSS context
                    if (wrapperClasses.includes('context-range')) {
                        // Suggestions for metric[|]
                        return [2 /*return*/, this.getRangeCompletionItems()];
                    }
                    else if (wrapperClasses.includes('context-labels')) {
                        // Suggestions for metric{|} and metric{foo=|}, as well as metric-independent label queries like {|}
                        return [2 /*return*/, this.getLabelCompletionItems({ prefix: prefix, text: text, value: value, labelKey: labelKey, wrapperClasses: wrapperClasses })];
                    }
                    else if (wrapperClasses.includes('context-aggregation')) {
                        // Suggestions for sum(metric) by (|)
                        return [2 /*return*/, this.getAggregationCompletionItems(value)];
                    }
                    else if (empty) {
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
                    return [2 /*return*/, {
                            suggestions: [],
                        }];
                });
            });
        };
        _this.getBeginningCompletionItems = function (context) {
            return {
                suggestions: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(_this.getEmptyCompletionItems(context).suggestions, _this.getTermCompletionItems().suggestions),
            };
        };
        _this.getEmptyCompletionItems = function (context) {
            var history = context.history;
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
        _this.getTermCompletionItems = function () {
            var _a = _this, metrics = _a.metrics, metricsMetadata = _a.metricsMetadata;
            var suggestions = [];
            suggestions.push({
                prefixMatch: true,
                label: 'Functions',
                items: _promql__WEBPACK_IMPORTED_MODULE_5__["FUNCTIONS"].map(setFunctionKind),
            });
            if (metrics && metrics.length) {
                suggestions.push({
                    label: 'Metrics',
                    items: metrics.map(function (m) { return addMetricsMetadata(m, metricsMetadata); }),
                });
            }
            return { suggestions: suggestions };
        };
        _this.getAggregationCompletionItems = function (value) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
            var suggestions, queryOffset, queryText, openParensAggregationIndex, openParensSelectorIndex, closeParensSelectorIndex, closeParensAggregationIndex, result, selectorString, selector, labelValues;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        suggestions = [];
                        queryText = value.document.getBlocks().reduce(function (text, block) {
                            var blockText = block.getText();
                            if (value.anchorBlock.key === block.key) {
                                // Newline characters are not accounted for but this is irrelevant
                                // for the purpose of extracting the selector string
                                queryOffset = value.selection.anchor.offset + text.length;
                            }
                            return text + blockText;
                        }, '');
                        openParensAggregationIndex = queryText.lastIndexOf('(', queryOffset);
                        openParensSelectorIndex = queryText.lastIndexOf('(', openParensAggregationIndex - 1);
                        closeParensSelectorIndex = queryText.indexOf(')', openParensSelectorIndex);
                        // Try search for selector part of an alternate aggregation clause, such as `sum by (l) (m)`
                        if (openParensSelectorIndex === -1) {
                            closeParensAggregationIndex = queryText.indexOf(')', queryOffset);
                            closeParensSelectorIndex = queryText.indexOf(')', closeParensAggregationIndex + 1);
                            openParensSelectorIndex = queryText.lastIndexOf('(', closeParensSelectorIndex);
                        }
                        result = {
                            suggestions: suggestions,
                            context: 'context-aggregation',
                        };
                        // Suggestions are useless for alternative aggregation clauses without a selector in context
                        if (openParensSelectorIndex === -1) {
                            return [2 /*return*/, result];
                        }
                        selectorString = queryText
                            .slice(openParensSelectorIndex + 1, closeParensSelectorIndex)
                            .replace(/\[[^\]]+\]$/, '');
                        selector = Object(_language_utils__WEBPACK_IMPORTED_MODULE_4__["parseSelector"])(selectorString, selectorString.length - 2).selector;
                        return [4 /*yield*/, this.getLabelValues(selector)];
                    case 1:
                        labelValues = _a.sent();
                        if (labelValues) {
                            suggestions.push({ label: 'Labels', items: Object.keys(labelValues).map(wrapLabel) });
                        }
                        return [2 /*return*/, result];
                }
            });
        }); };
        _this.getLabelCompletionItems = function (_a) {
            var text = _a.text, wrapperClasses = _a.wrapperClasses, labelKey = _a.labelKey, value = _a.value;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
                var suggestions, line, cursorOffset, suffix, prefix, isValueStart, isValueEnd, isPreValue, isValueEmpty, hasValuePrefix, selector, parsedSelector, containsMetric, existingKeys, labelValues, context, labelKeys, possibleKeys, newItems, newSuggestion;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            suggestions = [];
                            line = value.anchorBlock.getText();
                            cursorOffset = value.selection.anchor.offset;
                            suffix = line.substr(cursorOffset);
                            prefix = line.substr(0, cursorOffset);
                            isValueStart = text.match(/^(=|=~|!=|!~)/);
                            isValueEnd = suffix.match(/^"?[,}]/);
                            isPreValue = prefix.match(/(=|=~|!=|!~)$/) && suffix.match(/^"/);
                            isValueEmpty = isValueStart && isValueEnd;
                            hasValuePrefix = isValueEnd && !isValueStart;
                            if ((!isValueEmpty && !hasValuePrefix) || isPreValue) {
                                return [2 /*return*/, { suggestions: suggestions }];
                            }
                            try {
                                parsedSelector = Object(_language_utils__WEBPACK_IMPORTED_MODULE_4__["parseSelector"])(line, cursorOffset);
                                selector = parsedSelector.selector;
                            }
                            catch (_c) {
                                selector = EMPTY_SELECTOR;
                            }
                            containsMetric = selector.includes('__name__=');
                            existingKeys = parsedSelector ? parsedSelector.labelKeys : [];
                            if (!selector) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.getLabelValues(selector, !containsMetric)];
                        case 1:
                            labelValues = _b.sent();
                            _b.label = 2;
                        case 2:
                            if (!labelValues) {
                                console.warn("Server did not return any values for selector = " + selector);
                                return [2 /*return*/, { suggestions: suggestions }];
                            }
                            if ((text && isValueStart) || wrapperClasses.includes('attr-value')) {
                                // Label values
                                if (labelKey && labelValues[labelKey]) {
                                    context = 'context-label-values';
                                    suggestions.push({
                                        label: "Label values for \"" + labelKey + "\"",
                                        items: labelValues[labelKey].map(wrapLabel),
                                    });
                                }
                            }
                            else {
                                labelKeys = labelValues ? Object.keys(labelValues) : containsMetric ? null : DEFAULT_KEYS;
                                if (labelKeys) {
                                    possibleKeys = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.difference(labelKeys, existingKeys);
                                    if (possibleKeys.length) {
                                        context = 'context-labels';
                                        newItems = possibleKeys.map(function (key) { return ({ label: key }); });
                                        newSuggestion = { label: "Labels", items: newItems };
                                        suggestions.push(newSuggestion);
                                    }
                                }
                            }
                            return [2 /*return*/, { context: context, suggestions: suggestions }];
                    }
                });
            });
        };
        _this.fetchLabelValues = function (key) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
            var data;
            var _a;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.request("/api/v1/label/" + key + "/values", [])];
                    case 1:
                        data = _b.sent();
                        return [2 /*return*/, (_a = {}, _a[key] = data, _a)];
                }
            });
        }); };
        /**
         * Fetch labels for a series. This is cached by it's args but also by the global timeRange currently selected as
         * they can change over requested time.
         * @param name
         * @param withName
         */
        _this.fetchSeriesLabels = function (name, withName) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
            var tRange, url, cacheKey, value, data, values;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tRange = this.datasource.getTimeRange();
                        url = "/api/v1/series?match[]=" + name + "&start=" + tRange['start'] + "&end=" + tRange['end'];
                        cacheKey = "/api/v1/series?match[]=" + name + "&start=" + this.roundToMinutes(tRange['start']) + "&end=" + this.roundToMinutes(tRange['end']) + "&withName=" + !!withName;
                        value = this.labelsCache.get(cacheKey);
                        if (!!value) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.request(url, [])];
                    case 1:
                        data = _a.sent();
                        values = Object(_language_utils__WEBPACK_IMPORTED_MODULE_4__["processLabels"])(data, withName).values;
                        value = values;
                        this.labelsCache.set(cacheKey, value);
                        _a.label = 2;
                    case 2: return [2 /*return*/, value];
                }
            });
        }); };
        /**
         * Fetch this only one as we assume this won't change over time. This is cached differently from fetchSeriesLabels
         * because we can cache more aggressively here and also we do not want to invalidate this cache the same way as in
         * fetchSeriesLabels.
         */
        _this.fetchDefaultLabels = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.once(function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var values;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(DEFAULT_KEYS.map(function (key) { return _this.fetchLabelValues(key); }))];
                    case 1:
                        values = _a.sent();
                        return [2 /*return*/, values.reduce(function (acc, value) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc), value)); }, {})];
                }
            });
        }); });
        _this.datasource = datasource;
        _this.histogramMetrics = [];
        _this.timeRange = { start: 0, end: 0 };
        _this.metrics = [];
        // Disable lookups until we know the instance is small enough
        _this.lookupMetricsThreshold = DEFAULT_LOOKUP_METRICS_THRESHOLD;
        _this.lookupsDisabled = true;
        Object.assign(_this, initialValues);
        return _this;
    }
    // Strip syntax chars so that typeahead suggestions can work on clean inputs
    PromQlLanguageProvider.prototype.cleanText = function (s) {
        var parts = s.split(PREFIX_DELIMITER_REGEX);
        var last = parts.pop();
        return last
            .trimLeft()
            .replace(/"$/, '')
            .replace(/^"/, '');
    };
    Object.defineProperty(PromQlLanguageProvider.prototype, "syntax", {
        get: function () {
            return _promql__WEBPACK_IMPORTED_MODULE_5__["default"];
        },
        enumerable: true,
        configurable: true
    });
    PromQlLanguageProvider.prototype.getRangeCompletionItems = function () {
        return {
            context: 'context-range',
            suggestions: [
                {
                    label: 'Range vector',
                    items: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(_promql__WEBPACK_IMPORTED_MODULE_5__["RATE_RANGES"]),
                },
            ],
        };
    };
    PromQlLanguageProvider.prototype.getLabelValues = function (selector, withName) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var error_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.lookupsDisabled) {
                            return [2 /*return*/, undefined];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(selector === EMPTY_SELECTOR)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fetchDefaultLabels()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, this.fetchSeriesLabels(selector, withName)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        // TODO: better error handling
                        console.error(error_2);
                        return [2 /*return*/, undefined];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    PromQlLanguageProvider.prototype.roundToMinutes = function (seconds) {
        return Math.floor(seconds / 60);
    };
    return PromQlLanguageProvider;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["LanguageProvider"]));
/* harmony default export */ __webpack_exports__["default"] = (PromQlLanguageProvider);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/metric_find_query.ts":
/*!***********************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/metric_find_query.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");


var PrometheusMetricFindQuery = /** @class */ (function () {
    function PrometheusMetricFindQuery(datasource, query) {
        this.datasource = datasource;
        this.query = query;
        this.datasource = datasource;
        this.query = query;
        this.range = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_1__["getTimeSrv"])().timeRange();
    }
    PrometheusMetricFindQuery.prototype.process = function () {
        var labelNamesRegex = /^label_names\(\)\s*$/;
        var labelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\)\s*$/;
        var metricNamesRegex = /^metrics\((.+)\)\s*$/;
        var queryResultRegex = /^query_result\((.+)\)\s*$/;
        var labelNamesQuery = this.query.match(labelNamesRegex);
        if (labelNamesQuery) {
            return this.labelNamesQuery();
        }
        var labelValuesQuery = this.query.match(labelValuesRegex);
        if (labelValuesQuery) {
            if (labelValuesQuery[1]) {
                return this.labelValuesQuery(labelValuesQuery[2], labelValuesQuery[1]);
            }
            else {
                return this.labelValuesQuery(labelValuesQuery[2], null);
            }
        }
        var metricNamesQuery = this.query.match(metricNamesRegex);
        if (metricNamesQuery) {
            return this.metricNameQuery(metricNamesQuery[1]);
        }
        var queryResultQuery = this.query.match(queryResultRegex);
        if (queryResultQuery) {
            return this.queryResultQuery(queryResultQuery[1]);
        }
        // if query contains full metric name, return metric name and label list
        return this.metricNameAndLabelsQuery(this.query);
    };
    PrometheusMetricFindQuery.prototype.labelNamesQuery = function () {
        var url = '/api/v1/labels';
        return this.datasource.metadataRequest(url).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (value) {
                return { text: value };
            });
        });
    };
    PrometheusMetricFindQuery.prototype.labelValuesQuery = function (label, metric) {
        var url;
        if (!metric) {
            // return label values globally
            url = '/api/v1/label/' + label + '/values';
            return this.datasource.metadataRequest(url).then(function (result) {
                return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (value) {
                    return { text: value };
                });
            });
        }
        else {
            var start = this.datasource.getPrometheusTime(this.range.from, false);
            var end = this.datasource.getPrometheusTime(this.range.to, true);
            url = '/api/v1/series?match[]=' + encodeURIComponent(metric) + '&start=' + start + '&end=' + end;
            return this.datasource.metadataRequest(url).then(function (result) {
                var _labels = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (metric) {
                    return metric[label] || '';
                }).filter(function (label) {
                    return label !== '';
                });
                return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(_labels).map(function (metric) {
                    return {
                        text: metric,
                        expandable: true,
                    };
                });
            });
        }
    };
    PrometheusMetricFindQuery.prototype.metricNameQuery = function (metricFilterPattern) {
        var url = '/api/v1/label/__name__/values';
        return this.datasource.metadataRequest(url).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(result.data.data)
                .filter(function (metricName) {
                var r = new RegExp(metricFilterPattern);
                return r.test(metricName);
            })
                .map(function (matchedMetricName) {
                return {
                    text: matchedMetricName,
                    expandable: true,
                };
            })
                .value();
        });
    };
    PrometheusMetricFindQuery.prototype.queryResultQuery = function (query) {
        var end = this.datasource.getPrometheusTime(this.range.to, true);
        var instantQuery = { expr: query };
        return this.datasource.performInstantQuery(instantQuery, end).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data.result, function (metricData) {
                var text = metricData.metric.__name__ || '';
                delete metricData.metric.__name__;
                text +=
                    '{' +
                        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(metricData.metric, function (v, k) {
                            return k + '="' + v + '"';
                        }).join(',') +
                        '}';
                text += ' ' + metricData.value[1] + ' ' + metricData.value[0] * 1000;
                return {
                    text: text,
                    expandable: true,
                };
            });
        });
    };
    PrometheusMetricFindQuery.prototype.metricNameAndLabelsQuery = function (query) {
        var start = this.datasource.getPrometheusTime(this.range.from, false);
        var end = this.datasource.getPrometheusTime(this.range.to, true);
        var url = '/api/v1/series?match[]=' + encodeURIComponent(query) + '&start=' + start + '&end=' + end;
        var self = this;
        return this.datasource.metadataRequest(url).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (metric) {
                return {
                    text: self.datasource.getOriginalMetricName(metric),
                    expandable: true,
                };
            });
        });
    };
    return PrometheusMetricFindQuery;
}());
/* harmony default export */ __webpack_exports__["default"] = (PrometheusMetricFindQuery);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/module.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/module.ts ***!
  \************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/prometheus/datasource.ts");
/* harmony import */ var _components_PromQueryEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/PromQueryEditor */ "./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx");
/* harmony import */ var _components_PromCheatSheet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/PromCheatSheet */ "./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx");
/* harmony import */ var _components_PromExploreQueryEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/PromExploreQueryEditor */ "./public/app/plugins/datasource/prometheus/components/PromExploreQueryEditor.tsx");
/* harmony import */ var _configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configuration/ConfigEditor */ "./public/app/plugins/datasource/prometheus/configuration/ConfigEditor.tsx");






var PrometheusAnnotationsQueryCtrl = /** @class */ (function () {
    function PrometheusAnnotationsQueryCtrl() {
    }
    PrometheusAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return PrometheusAnnotationsQueryCtrl;
}());
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["PrometheusDatasource"])
    .setQueryEditor(_components_PromQueryEditor__WEBPACK_IMPORTED_MODULE_2__["PromQueryEditor"])
    .setConfigEditor(_configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_5__["ConfigEditor"])
    .setExploreMetricsQueryField(_components_PromExploreQueryEditor__WEBPACK_IMPORTED_MODULE_4__["PromExploreQueryEditor"])
    .setAnnotationQueryCtrl(PrometheusAnnotationsQueryCtrl)
    .setExploreStartPage(_components_PromCheatSheet__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/query_hints.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/query_hints.ts ***!
  \*****************************************************************/
/*! exports provided: SUM_HINT_THRESHOLD_COUNT, getQueryHints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUM_HINT_THRESHOLD_COUNT", function() { return SUM_HINT_THRESHOLD_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryHints", function() { return getQueryHints; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Number of time series results needed before starting to suggest sum aggregation hints
 */
var SUM_HINT_THRESHOLD_COUNT = 20;
function getQueryHints(query, series, datasource) {
    var _a, _b;
    var hints = [];
    // ..._bucket metric needs a histogram_quantile()
    var histogramMetric = query.trim().match(/^\w+_bucket$/);
    if (histogramMetric) {
        var label = 'Time series has buckets, you probably wanted a histogram.';
        hints.push({
            type: 'HISTOGRAM_QUANTILE',
            label: label,
            fix: {
                label: 'Fix by adding histogram_quantile().',
                action: {
                    type: 'ADD_HISTOGRAM_QUANTILE',
                    query: query,
                },
            },
        });
    }
    // Check for need of rate()
    if (query.indexOf('rate(') === -1) {
        // Use metric metadata for exact types
        var nameMatch = query.match(/\b(\w+_(total|sum|count))\b/);
        var counterNameMetric = nameMatch ? nameMatch[1] : '';
        var metricsMetadata_1 = (_b = (_a = datasource) === null || _a === void 0 ? void 0 : _a.languageProvider) === null || _b === void 0 ? void 0 : _b.metricsMetadata;
        var certain_1 = false;
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.size(metricsMetadata_1) > 0) {
            counterNameMetric = Object.keys(metricsMetadata_1).find(function (metricName) {
                // Only considering first type information, could be non-deterministic
                var metadata = metricsMetadata_1[metricName][0];
                if (metadata.type.toLowerCase() === 'counter') {
                    var metricRegex = new RegExp("\\b" + metricName + "\\b");
                    if (query.match(metricRegex)) {
                        certain_1 = true;
                        return true;
                    }
                }
                return false;
            });
        }
        if (counterNameMetric) {
            var simpleMetric = query.trim().match(/^\w+$/);
            var verb = certain_1 ? 'is' : 'looks like';
            var label = "Metric " + counterNameMetric + " " + verb + " a counter.";
            var fix = void 0;
            if (simpleMetric) {
                fix = {
                    label: 'Fix by adding rate().',
                    action: {
                        type: 'ADD_RATE',
                        query: query,
                    },
                };
            }
            else {
                label = label + " Try applying a rate() function.";
            }
            hints.push({
                type: 'APPLY_RATE',
                label: label,
                fix: fix,
            });
        }
    }
    // Check for recording rules expansion
    if (datasource && datasource.ruleMappings) {
        var mapping_1 = datasource.ruleMappings;
        var mappingForQuery = Object.keys(mapping_1).reduce(function (acc, ruleName) {
            var _a;
            if (query.search(ruleName) > -1) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc), (_a = {}, _a[ruleName] = mapping_1[ruleName], _a));
            }
            return acc;
        }, {});
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.size(mappingForQuery) > 0) {
            var label = 'Query contains recording rules.';
            hints.push({
                type: 'EXPAND_RULES',
                label: label,
                fix: {
                    label: 'Expand rules',
                    action: {
                        type: 'EXPAND_RULES',
                        query: query,
                        mapping: mappingForQuery,
                    },
                },
            });
        }
    }
    if (series && series.length >= SUM_HINT_THRESHOLD_COUNT) {
        var simpleMetric = query.trim().match(/^\w+$/);
        if (simpleMetric) {
            hints.push({
                type: 'ADD_SUM',
                label: 'Many time series results returned.',
                fix: {
                    label: 'Consider aggregating with sum().',
                    action: {
                        type: 'ADD_SUM',
                        query: query,
                        preventSubmit: true,
                    },
                },
            });
        }
    }
    return hints.length > 0 ? hints : null;
}


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/result_transformer.ts":
/*!************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/result_transformer.ts ***!
  \************************************************************************/
/*! exports provided: ResultTransformer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultTransformer", function() { return ResultTransformer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");




var ResultTransformer = /** @class */ (function () {
    function ResultTransformer(templateSrv) {
        this.templateSrv = templateSrv;
    }
    ResultTransformer.prototype.transform = function (response, options) {
        var e_1, _a, e_2, _b;
        var prometheusResult = response.data.data.result;
        if (options.format === 'table') {
            return [
                this.transformMetricDataToTable(prometheusResult, options.responseListLength, options.refId, options.valueWithRefId),
            ];
        }
        else if (prometheusResult && options.format === 'heatmap') {
            var seriesList = [];
            try {
                for (var prometheusResult_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(prometheusResult), prometheusResult_1_1 = prometheusResult_1.next(); !prometheusResult_1_1.done; prometheusResult_1_1 = prometheusResult_1.next()) {
                    var metricData = prometheusResult_1_1.value;
                    seriesList.push(this.transformMetricData(metricData, options, options.start, options.end));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (prometheusResult_1_1 && !prometheusResult_1_1.done && (_a = prometheusResult_1.return)) _a.call(prometheusResult_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            seriesList.sort(sortSeriesByLabel);
            seriesList = this.transformToHistogramOverTime(seriesList);
            return seriesList;
        }
        else if (prometheusResult) {
            var seriesList = [];
            try {
                for (var prometheusResult_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(prometheusResult), prometheusResult_2_1 = prometheusResult_2.next(); !prometheusResult_2_1.done; prometheusResult_2_1 = prometheusResult_2.next()) {
                    var metricData = prometheusResult_2_1.value;
                    if (response.data.data.resultType === 'matrix') {
                        seriesList.push(this.transformMetricData(metricData, options, options.start, options.end));
                    }
                    else if (response.data.data.resultType === 'vector') {
                        seriesList.push(this.transformInstantMetricData(metricData, options));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (prometheusResult_2_1 && !prometheusResult_2_1.done && (_b = prometheusResult_2.return)) _b.call(prometheusResult_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return seriesList;
        }
        return [];
    };
    ResultTransformer.prototype.transformMetricData = function (metricData, options, start, end) {
        var e_3, _a;
        var dps = [];
        var metricLabel = null;
        metricLabel = this.createMetricLabel(metricData.metric, options);
        var stepMs = parseInt(options.step, 10) * 1000;
        var baseTimestamp = start * 1000;
        if (metricData.values === undefined) {
            throw new Error('Prometheus heatmap error: data should be a time series');
        }
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(metricData.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                var dpValue = parseFloat(value[1]);
                if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNaN(dpValue)) {
                    dpValue = null;
                }
                var timestamp = parseFloat(value[0]) * 1000;
                for (var t = baseTimestamp; t < timestamp; t += stepMs) {
                    dps.push([null, t]);
                }
                baseTimestamp = timestamp + stepMs;
                dps.push([dpValue, timestamp]);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var endTimestamp = end * 1000;
        for (var t = baseTimestamp; t <= endTimestamp; t += stepMs) {
            dps.push([null, t]);
        }
        return {
            datapoints: dps,
            query: options.query,
            refId: options.refId,
            target: metricLabel,
            tags: metricData.metric,
        };
    };
    ResultTransformer.prototype.transformMetricDataToTable = function (md, resultCount, refId, valueWithRefId) {
        var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_2__["default"]();
        table.refId = refId;
        var i, j;
        var metricLabels = {};
        if (!md || md.length === 0) {
            return table;
        }
        // Collect all labels across all metrics
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(md, function (series) {
            for (var label in series.metric) {
                if (!metricLabels.hasOwnProperty(label)) {
                    metricLabels[label] = 1;
                }
            }
        });
        // Sort metric labels, create columns for them and record their index
        var sortedLabels = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.keys(metricLabels).sort();
        table.columns.push({ text: 'Time', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time });
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(sortedLabels, function (label, labelIndex) {
            metricLabels[label] = labelIndex + 1;
            table.columns.push({ text: label, filterable: true });
        });
        var valueText = resultCount > 1 || valueWithRefId ? "Value #" + refId : 'Value';
        table.columns.push({ text: valueText });
        // Populate rows, set value to empty string when label not present.
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(md, function (series) {
            if (series.value) {
                series.values = [series.value];
            }
            if (series.values) {
                for (i = 0; i < series.values.length; i++) {
                    var values = series.values[i];
                    var reordered = [values[0] * 1000];
                    if (series.metric) {
                        for (j = 0; j < sortedLabels.length; j++) {
                            var label = sortedLabels[j];
                            if (series.metric.hasOwnProperty(label)) {
                                reordered.push(series.metric[label]);
                            }
                            else {
                                reordered.push('');
                            }
                        }
                    }
                    reordered.push(parseFloat(values[1]));
                    table.rows.push(reordered);
                }
            }
        });
        return table;
    };
    ResultTransformer.prototype.transformInstantMetricData = function (md, options) {
        var dps = [];
        var metricLabel = null;
        metricLabel = this.createMetricLabel(md.metric, options);
        dps.push([parseFloat(md.value[1]), md.value[0] * 1000]);
        return { target: metricLabel, datapoints: dps, tags: md.metric, refId: options.refId };
    };
    ResultTransformer.prototype.createMetricLabel = function (labelData, options) {
        var label = '';
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isUndefined(options) || lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(options.legendFormat)) {
            label = this.getOriginalMetricName(labelData);
        }
        else {
            label = this.renderTemplate(this.templateSrv.replace(options.legendFormat), labelData);
        }
        if (!label || label === '{}') {
            label = options.query;
        }
        return label;
    };
    ResultTransformer.prototype.renderTemplate = function (aliasPattern, aliasData) {
        var aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
        return aliasPattern.replace(aliasRegex, function (match, g1) {
            if (aliasData[g1]) {
                return aliasData[g1];
            }
            return g1;
        });
    };
    ResultTransformer.prototype.getOriginalMetricName = function (labelData) {
        var metricName = labelData.__name__ || '';
        delete labelData.__name__;
        var labelPart = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.toPairs(labelData), function (label) {
            return label[0] + '="' + label[1] + '"';
        }).join(',');
        return metricName + '{' + labelPart + '}';
    };
    ResultTransformer.prototype.transformToHistogramOverTime = function (seriesList) {
        /*      t1 = timestamp1, t2 = timestamp2 etc.
                t1  t2  t3          t1  t2  t3
        le10    10  10  0     =>    10  10  0
        le20    20  10  30    =>    10  0   30
        le30    30  10  35    =>    10  0   5
        */
        for (var i = seriesList.length - 1; i > 0; i--) {
            var topSeries = seriesList[i].datapoints;
            var bottomSeries = seriesList[i - 1].datapoints;
            if (!topSeries || !bottomSeries) {
                throw new Error('Prometheus heatmap transform error: data should be a time series');
            }
            for (var j = 0; j < topSeries.length; j++) {
                var bottomPoint = bottomSeries[j] || [0];
                topSeries[j][0] -= bottomPoint[0];
            }
        }
        return seriesList;
    };
    return ResultTransformer;
}());

function sortSeriesByLabel(s1, s2) {
    var le1, le2;
    try {
        // fail if not integer. might happen with bad queries
        le1 = parseHistogramLabel(s1.target);
        le2 = parseHistogramLabel(s2.target);
    }
    catch (err) {
        console.log(err);
        return 0;
    }
    if (le1 > le2) {
        return 1;
    }
    if (le1 < le2) {
        return -1;
    }
    return 0;
}
function parseHistogramLabel(le) {
    if (le === '+Inf') {
        return +Infinity;
    }
    return Number(le);
}


/***/ })

}]);
//# sourceMappingURL=prometheusPlugin.6310f9af5345c722b930.js.map