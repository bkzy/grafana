(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["explore"],{

/***/ "./node_modules/lodash/_baseHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = baseHas;


/***/ }),

/***/ "./node_modules/lodash/has.js":
/*!************************************!*\
  !*** ./node_modules/lodash/has.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseHas = __webpack_require__(/*! ./_baseHas */ "./node_modules/lodash/_baseHas.js"),
    hasPath = __webpack_require__(/*! ./_hasPath */ "./node_modules/lodash/_hasPath.js");

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

module.exports = has;


/***/ }),

/***/ "./node_modules/lodash/negate.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/negate.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0: return !predicate.call(this);
      case 1: return !predicate.call(this, args[0]);
      case 2: return !predicate.call(this, args[0], args[1]);
      case 3: return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}

module.exports = negate;


/***/ }),

/***/ "./node_modules/lodash/omitBy.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/omitBy.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    negate = __webpack_require__(/*! ./negate */ "./node_modules/lodash/negate.js"),
    pickBy = __webpack_require__(/*! ./pickBy */ "./node_modules/lodash/pickBy.js");

/**
 * The opposite of `_.pickBy`; this method creates an object composed of
 * the own and inherited enumerable string keyed properties of `object` that
 * `predicate` doesn't return truthy for. The predicate is invoked with two
 * arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omitBy(object, _.isNumber);
 * // => { 'b': '2' }
 */
function omitBy(object, predicate) {
  return pickBy(object, negate(baseIteratee(predicate)));
}

module.exports = omitBy;


/***/ }),

/***/ "./node_modules/lodash/pickBy.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/pickBy.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    basePickBy = __webpack_require__(/*! ./_basePickBy */ "./node_modules/lodash/_basePickBy.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "./node_modules/lodash/_getAllKeysIn.js");

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap(getAllKeysIn(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee(predicate);
  return basePickBy(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}

module.exports = pickBy;


/***/ }),

/***/ "./public/app/features/explore/ElapsedTime.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/ElapsedTime.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");



var INTERVAL = 150;
/**
 * Shows an incremental time ticker of elapsed time from some event.
 */
var ElapsedTime = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ElapsedTime, _super);
    function ElapsedTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            elapsed: 0,
        };
        _this.tick = function () {
            var jetzt = Date.now();
            var elapsed = jetzt - _this.offset;
            _this.setState({ elapsed: elapsed });
        };
        return _this;
    }
    ElapsedTime.prototype.start = function () {
        this.offset = Date.now();
        this.timer = window.setInterval(this.tick, INTERVAL);
    };
    ElapsedTime.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.time) {
            clearInterval(this.timer);
        }
        else if (this.props.time) {
            this.start();
        }
        if (nextProps.resetKey !== this.props.resetKey) {
            clearInterval(this.timer);
            this.start();
        }
    };
    ElapsedTime.prototype.componentDidMount = function () {
        this.start();
    };
    ElapsedTime.prototype.componentWillUnmount = function () {
        clearInterval(this.timer);
    };
    ElapsedTime.prototype.render = function () {
        var elapsed = this.state.elapsed;
        var _a = this.props, className = _a.className, time = _a.time, humanize = _a.humanize;
        var value = (time || elapsed) / 1000;
        var displayValue = value.toFixed(1) + "s";
        if (humanize) {
            var duration = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["toDuration"])(elapsed);
            var hours = duration.hours();
            var minutes = duration.minutes();
            var seconds = duration.seconds();
            displayValue = hours ? hours + "h " + minutes + "m " + seconds + "s" : minutes ? " " + minutes + "m " + seconds + "s" : seconds + "s";
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "elapsed-time " + className }, displayValue);
    };
    return ElapsedTime;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ElapsedTime);


/***/ }),

/***/ "./public/app/features/explore/ErrorContainer.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/ErrorContainer.tsx ***!
  \********************************************************/
/*! exports provided: ErrorContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorContainer", function() { return ErrorContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/components/Animations/FadeIn */ "./public/app/core/components/Animations/FadeIn.tsx");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");



var ErrorContainer = function (props) {
    var queryErrors = props.queryErrors;
    var refId = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_2__["getValueWithRefId"])(queryErrors);
    var queryError = refId ? null : Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_2__["getFirstQueryErrorWithoutRefId"])(queryErrors);
    var showError = queryError ? true : false;
    var duration = showError ? 100 : 10;
    var message = queryError ? queryError.message : null;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_1__["FadeIn"], { in: showError, duration: duration },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-error alert" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fa fa-exclamation-triangle" })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-body" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-title" }, message))))));
};


/***/ }),

/***/ "./public/app/features/explore/Explore.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/explore/Explore.tsx ***!
  \*************************************************/
/*! exports provided: Explore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Explore", function() { return Explore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-virtualized-auto-sizer */ "./node_modules/react-virtualized-auto-sizer/dist/index.esm.js");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _LogsContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LogsContainer */ "./public/app/features/explore/LogsContainer.tsx");
/* harmony import */ var _QueryRows__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./QueryRows */ "./public/app/features/explore/QueryRows.tsx");
/* harmony import */ var _TableContainer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TableContainer */ "./public/app/features/explore/TableContainer.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_core_utils_emitter__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/core/utils/emitter */ "./public/app/core/utils/emitter.ts");
/* harmony import */ var _ExploreToolbar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ExploreToolbar */ "./public/app/features/explore/ExploreToolbar.tsx");
/* harmony import */ var _NoDataSourceCallToAction__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./NoDataSourceCallToAction */ "./public/app/features/explore/NoDataSourceCallToAction.tsx");
/* harmony import */ var _profile_state_selectors__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var _ErrorContainer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ErrorContainer */ "./public/app/features/explore/ErrorContainer.tsx");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var _ExploreGraphPanel__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./ExploreGraphPanel */ "./public/app/features/explore/ExploreGraphPanel.tsx");

// Libraries






// Services & Utils

// Components




// Actions

// Types










var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_6__["default"])(function () {
    return {
        logsMain: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: logsMain;\n      // Is needed for some transition animations to work.\n      position: relative;\n    "], ["\n      label: logsMain;\n      // Is needed for some transition animations to work.\n      position: relative;\n    "]))),
        exploreAddButton: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      margin-top: 1em;\n    "], ["\n      margin-top: 1em;\n    "]))),
    };
});
/**
 * Explore provides an area for quick query iteration for a given datasource.
 * Once a datasource is selected it populates the query section at the top.
 * When queries are run, their results are being displayed in the main section.
 * The datasource determines what kind of query editor it brings, and what kind
 * of results viewers it supports. The state is managed entirely in Redux.
 *
 * SPLIT VIEW
 *
 * Explore can have two Explore areas side-by-side. This is handled in `Wrapper.tsx`.
 * Since there can be multiple Explores (e.g., left and right) each action needs
 * the `exploreId` as first parameter so that the reducer knows which Explore state
 * is affected.
 *
 * DATASOURCE REQUESTS
 *
 * A click on Run Query creates transactions for all DataQueries for all expanded
 * result viewers. New runs are discarding previous runs. Upon completion a transaction
 * saves the result. The result viewers construct their data from the currently existing
 * transactions.
 *
 * The result viewers determine some of the query options sent to the datasource, e.g.,
 * `format`, to indicate eventual transformations by the datasources' result transformers.
 */
var Explore = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Explore, _super);
    function Explore(props) {
        var _this = _super.call(this, props) || this;
        _this.getRef = function (el) {
            _this.el = el;
        };
        _this.onChangeTime = function (rawRange) {
            var _a = _this.props, updateTimeRange = _a.updateTimeRange, exploreId = _a.exploreId;
            updateTimeRange({ exploreId: exploreId, rawRange: rawRange });
        };
        // Use this in help pages to set page to a single query
        _this.onClickExample = function (query) {
            _this.props.setQueries(_this.props.exploreId, [query]);
        };
        _this.onClickFilterLabel = function (key, value) {
            _this.onModifyQueries({ type: 'ADD_FILTER', key: key, value: value });
        };
        _this.onClickFilterOutLabel = function (key, value) {
            _this.onModifyQueries({ type: 'ADD_FILTER_OUT', key: key, value: value });
        };
        _this.onClickAddQueryRowButton = function () {
            var _a = _this.props, exploreId = _a.exploreId, queryKeys = _a.queryKeys;
            _this.props.addQueryRow(exploreId, queryKeys.length);
        };
        _this.onModifyQueries = function (action, index) {
            var _a;
            var datasourceInstance = _this.props.datasourceInstance;
            if ((_a = datasourceInstance) === null || _a === void 0 ? void 0 : _a.modifyQuery) {
                var modifier = function (queries, modification) {
                    return datasourceInstance.modifyQuery(queries, modification);
                };
                _this.props.modifyQueries(_this.props.exploreId, action, modifier, index);
            }
        };
        _this.onResize = function (size) {
            _this.props.changeSize(_this.props.exploreId, size);
        };
        _this.onStartScanning = function () {
            // Scanner will trigger a query
            _this.props.scanStart(_this.props.exploreId);
        };
        _this.onStopScanning = function () {
            _this.props.scanStopAction({ exploreId: _this.props.exploreId });
        };
        _this.onToggleGraph = function (showingGraph) {
            var _a = _this.props, toggleGraph = _a.toggleGraph, exploreId = _a.exploreId;
            toggleGraph(exploreId, showingGraph);
        };
        _this.onUpdateTimeRange = function (absoluteRange) {
            var _a = _this.props, exploreId = _a.exploreId, updateTimeRange = _a.updateTimeRange;
            updateTimeRange({ exploreId: exploreId, absoluteRange: absoluteRange });
        };
        _this.refreshExplore = function () {
            var _a = _this.props, exploreId = _a.exploreId, update = _a.update;
            if (update.queries || update.ui || update.range || update.datasource || update.mode) {
                _this.props.refreshExplore(exploreId);
            }
        };
        _this.renderEmptyState = function () {
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_NoDataSourceCallToAction__WEBPACK_IMPORTED_MODULE_18__["NoDataSourceCallToAction"], null)));
        };
        _this.exploreEvents = new app_core_utils_emitter__WEBPACK_IMPORTED_MODULE_16__["Emitter"]();
        return _this;
    }
    Explore.prototype.componentDidMount = function () {
        var _a = this.props, initialized = _a.initialized, exploreId = _a.exploreId, initialDatasource = _a.initialDatasource, initialQueries = _a.initialQueries, initialRange = _a.initialRange, mode = _a.mode, initialUI = _a.initialUI, originPanelId = _a.originPanelId;
        var width = this.el ? this.el.offsetWidth : 0;
        // initialize the whole explore first time we mount and if browser history contains a change in datasource
        if (!initialized) {
            this.props.initializeExplore(exploreId, initialDatasource, initialQueries, initialRange, mode, width, this.exploreEvents, initialUI, originPanelId);
        }
    };
    Explore.prototype.componentWillUnmount = function () {
        this.exploreEvents.removeAllListeners();
    };
    Explore.prototype.componentDidUpdate = function (prevProps) {
        this.refreshExplore();
    };
    Explore.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, datasourceInstance = _c.datasourceInstance, datasourceMissing = _c.datasourceMissing, exploreId = _c.exploreId, split = _c.split, queryKeys = _c.queryKeys, mode = _c.mode, graphResult = _c.graphResult, loading = _c.loading, absoluteRange = _c.absoluteRange, showingGraph = _c.showingGraph, showingTable = _c.showingTable, timeZone = _c.timeZone, queryResponse = _c.queryResponse, syncedTimes = _c.syncedTimes, isLive = _c.isLive;
        var exploreClass = split ? 'explore explore-split' : 'explore';
        var styles = getStyles();
        var StartPage = (_b = (_a = datasourceInstance) === null || _a === void 0 ? void 0 : _a.components) === null || _b === void 0 ? void 0 : _b.ExploreStartPage;
        var showStartPage = !queryResponse || queryResponse.state === _grafana_data__WEBPACK_IMPORTED_MODULE_13__["LoadingState"].NotStarted;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: exploreClass, ref: this.getRef },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ExploreToolbar__WEBPACK_IMPORTED_MODULE_17__["ExploreToolbar"], { exploreId: exploreId, onChangeTime: this.onChangeTime }),
            datasourceMissing ? this.renderEmptyState() : null,
            datasourceInstance && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryRows__WEBPACK_IMPORTED_MODULE_10__["default"], { exploreEvents: this.exploreEvents, exploreId: exploreId, queryKeys: queryKeys }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { "aria-label": "Add row button", className: "gf-form-label gf-form-label--btn " + styles.exploreAddButton, onClick: this.onClickAddQueryRowButton, disabled: isLive },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: 'fa fa-fw fa-plus icon-margin-right' }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "btn-title" }, '\xA0' + 'Add query'))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorContainer__WEBPACK_IMPORTED_MODULE_20__["ErrorContainer"], { queryErrors: queryResponse.error ? [queryResponse.error] : undefined }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_5__["default"], { onResize: this.onResize, disableHeight: true }, function (_a) {
                    var width = _a.width;
                    if (width === 0) {
                        return null;
                    }
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", { className: "m-t-2 " + styles.logsMain, style: { width: width } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_8__["ErrorBoundaryAlert"], null,
                            showStartPage && StartPage && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "grafana-info-box grafana-info-box--max-lg" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StartPage, { onClickExample: _this.onClickExample, datasource: datasourceInstance, exploreMode: mode }))),
                            !showStartPage && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                mode === app_types_explore__WEBPACK_IMPORTED_MODULE_14__["ExploreMode"].Metrics && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ExploreGraphPanel__WEBPACK_IMPORTED_MODULE_22__["ExploreGraphPanel"], { series: graphResult, width: width, loading: loading, absoluteRange: absoluteRange, isStacked: false, showPanel: true, showingGraph: showingGraph, showingTable: showingTable, timeZone: timeZone, onToggleGraph: _this.onToggleGraph, onUpdateTimeRange: _this.onUpdateTimeRange, showBars: false, showLines: true })),
                                mode === app_types_explore__WEBPACK_IMPORTED_MODULE_14__["ExploreMode"].Metrics && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TableContainer__WEBPACK_IMPORTED_MODULE_11__["default"], { width: width, exploreId: exploreId, onClickCell: _this.onClickFilterLabel })),
                                mode === app_types_explore__WEBPACK_IMPORTED_MODULE_14__["ExploreMode"].Logs && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogsContainer__WEBPACK_IMPORTED_MODULE_9__["default"], { width: width, exploreId: exploreId, syncedTimes: syncedTimes, onClickFilterLabel: _this.onClickFilterLabel, onClickFilterOutLabel: _this.onClickFilterOutLabel, onStartScanning: _this.onStartScanning, onStopScanning: _this.onStopScanning })))))));
                })))));
    };
    return Explore;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));

var ensureQueriesMemoized = Object(memoize_one__WEBPACK_IMPORTED_MODULE_6__["default"])(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__["ensureQueries"]);
var getTimeRangeFromUrlMemoized = Object(memoize_one__WEBPACK_IMPORTED_MODULE_6__["default"])(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__["getTimeRangeFromUrl"]);
function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    var split = explore.split, syncedTimes = explore.syncedTimes;
    var item = explore[exploreId];
    var timeZone = Object(_profile_state_selectors__WEBPACK_IMPORTED_MODULE_19__["getTimeZone"])(state.user);
    var datasourceInstance = item.datasourceInstance, datasourceMissing = item.datasourceMissing, initialized = item.initialized, queryKeys = item.queryKeys, urlState = item.urlState, update = item.update, isLive = item.isLive, supportedModes = item.supportedModes, mode = item.mode, graphResult = item.graphResult, loading = item.loading, showingGraph = item.showingGraph, showingTable = item.showingTable, absoluteRange = item.absoluteRange, queryResponse = item.queryResponse;
    var _b = (urlState ||
        {}), datasource = _b.datasource, queries = _b.queries, urlRange = _b.range, urlMode = _b.mode, ui = _b.ui, originPanelId = _b.originPanelId;
    var initialDatasource = datasource || app_core_store__WEBPACK_IMPORTED_MODULE_7__["default"].get(Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__["lastUsedDatasourceKeyForOrgId"])(state.user.orgId));
    var initialQueries = ensureQueriesMemoized(queries);
    var initialRange = urlRange
        ? getTimeRangeFromUrlMemoized(urlRange, timeZone)
        : Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__["getTimeRange"])(timeZone, app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__["DEFAULT_RANGE"]);
    var newMode;
    if (supportedModes.length) {
        var urlModeIsValid = supportedModes.includes(urlMode);
        var modeStateIsValid = supportedModes.includes(mode);
        if (modeStateIsValid) {
            newMode = mode;
        }
        else if (urlModeIsValid) {
            newMode = urlMode;
        }
        else {
            newMode = supportedModes[0];
        }
    }
    else {
        newMode = [app_types_explore__WEBPACK_IMPORTED_MODULE_14__["ExploreMode"].Metrics, app_types_explore__WEBPACK_IMPORTED_MODULE_14__["ExploreMode"].Logs].includes(urlMode) ? urlMode : undefined;
    }
    var initialUI = ui || app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__["DEFAULT_UI_STATE"];
    return {
        datasourceInstance: datasourceInstance,
        datasourceMissing: datasourceMissing,
        initialized: initialized,
        split: split,
        queryKeys: queryKeys,
        update: update,
        initialDatasource: initialDatasource,
        initialQueries: initialQueries,
        initialRange: initialRange,
        mode: newMode,
        initialUI: initialUI,
        isLive: isLive,
        graphResult: graphResult,
        loading: loading,
        showingGraph: showingGraph,
        showingTable: showingTable,
        absoluteRange: absoluteRange,
        queryResponse: queryResponse,
        originPanelId: originPanelId,
        syncedTimes: syncedTimes,
        timeZone: timeZone,
    };
}
var mapDispatchToProps = {
    changeSize: _state_actions__WEBPACK_IMPORTED_MODULE_12__["changeSize"],
    initializeExplore: _state_actions__WEBPACK_IMPORTED_MODULE_12__["initializeExplore"],
    modifyQueries: _state_actions__WEBPACK_IMPORTED_MODULE_12__["modifyQueries"],
    refreshExplore: _state_actions__WEBPACK_IMPORTED_MODULE_12__["refreshExplore"],
    scanStart: _state_actions__WEBPACK_IMPORTED_MODULE_12__["scanStart"],
    scanStopAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_21__["scanStopAction"],
    setQueries: _state_actions__WEBPACK_IMPORTED_MODULE_12__["setQueries"],
    updateTimeRange: _state_actions__WEBPACK_IMPORTED_MODULE_12__["updateTimeRange"],
    toggleGraph: _state_actions__WEBPACK_IMPORTED_MODULE_12__["toggleGraph"],
    addQueryRow: _state_actions__WEBPACK_IMPORTED_MODULE_12__["addQueryRow"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(
// @ts-ignore
Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(Explore)));
var templateObject_1, templateObject_2;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/ExploreGraphPanel.tsx":
/*!***********************************************************!*\
  !*** ./public/app/features/explore/ExploreGraphPanel.tsx ***!
  \***********************************************************/
/*! exports provided: ExploreGraphPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreGraphPanel", function() { return ExploreGraphPanel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");





var MAX_NUMBER_OF_TIME_SERIES = 20;
var getStyles = function (theme) { return ({
    timeSeriesDisclaimer: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    label: time-series-disclaimer;\n    width: 300px;\n    margin: ", " auto;\n    padding: 10px 0;\n    border-radius: ", ";\n    text-align: center;\n    background-color: ", ";\n  "], ["\n    label: time-series-disclaimer;\n    width: 300px;\n    margin: ", " auto;\n    padding: 10px 0;\n    border-radius: ", ";\n    text-align: center;\n    background-color: ", ";\n  "])), theme.spacing.sm, theme.border.radius.md, Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["selectThemeVariant"])({ light: theme.colors.white, dark: theme.colors.dark4 }, theme.type)),
    disclaimerIcon: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    label: disclaimer-icon;\n    color: ", ";\n    margin-right: ", ";\n  "], ["\n    label: disclaimer-icon;\n    color: ", ";\n    margin-right: ", ";\n  "])), theme.colors.yellow, theme.spacing.xs),
    showAllTimeSeries: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    label: show-all-time-series;\n    cursor: pointer;\n    color: ", ";\n  "], ["\n    label: show-all-time-series;\n    cursor: pointer;\n    color: ", ";\n  "])), theme.colors.linkExternal),
}); };
var UnThemedExploreGraphPanel = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(UnThemedExploreGraphPanel, _super);
    function UnThemedExploreGraphPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hiddenSeries: [],
            showAllTimeSeries: false,
        };
        _this.onShowAllTimeSeries = function () {
            _this.setState({
                showAllTimeSeries: true,
            });
        };
        _this.onClickGraphButton = function () {
            var _a = _this.props, onToggleGraph = _a.onToggleGraph, showingGraph = _a.showingGraph;
            if (onToggleGraph) {
                onToggleGraph((showingGraph !== null && showingGraph !== void 0 ? showingGraph : false));
            }
        };
        _this.onChangeTime = function (from, to) {
            var onUpdateTimeRange = _this.props.onUpdateTimeRange;
            onUpdateTimeRange({ from: from, to: to });
        };
        _this.renderGraph = function () {
            var _a = _this.props, width = _a.width, series = _a.series, onHiddenSeriesChanged = _a.onHiddenSeriesChanged, timeZone = _a.timeZone, absoluteRange = _a.absoluteRange, showPanel = _a.showPanel, showingGraph = _a.showingGraph, showingTable = _a.showingTable, showBars = _a.showBars, showLines = _a.showLines, isStacked = _a.isStacked;
            var showAllTimeSeries = _this.state.showAllTimeSeries;
            if (!series) {
                return null;
            }
            var timeRange = {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absoluteRange.from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absoluteRange.to),
                raw: {
                    from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absoluteRange.from),
                    to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absoluteRange.to),
                },
            };
            var height = showPanel === false ? 100 : showingGraph && showingTable ? 200 : 400;
            var lineWidth = showLines ? 1 : 5;
            var seriesToShow = showAllTimeSeries ? series : series.slice(0, MAX_NUMBER_OF_TIME_SERIES);
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["GraphSeriesToggler"], { series: seriesToShow, onHiddenSeriesChanged: onHiddenSeriesChanged }, function (_a) {
                var onSeriesToggle = _a.onSeriesToggle, toggledSeries = _a.toggledSeries;
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["GraphWithLegend"], { displayMode: _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["LegendDisplayMode"].List, height: height, isLegendVisible: true, placement: 'under', width: width, timeRange: timeRange, timeZone: timeZone, showBars: showBars, showLines: showLines, showPoints: false, onToggleSort: function () { }, series: toggledSeries, isStacked: isStacked, lineWidth: lineWidth, onSeriesToggle: onSeriesToggle, onHorizontalRegionSelected: _this.onChangeTime },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Chart"].Tooltip, { mode: showBars ? 'multi' : 'single' })));
            }));
        };
        return _this;
    }
    UnThemedExploreGraphPanel.prototype.render = function () {
        var _a = this.props, series = _a.series, showPanel = _a.showPanel, showingGraph = _a.showingGraph, loading = _a.loading, theme = _a.theme;
        var showAllTimeSeries = this.state.showAllTimeSeries;
        var style = getStyles(theme);
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            series && series.length > MAX_NUMBER_OF_TIME_SERIES && !showAllTimeSeries && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([style.timeSeriesDisclaimer]) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(['fa fa-fw fa-warning', style.disclaimerIcon]) }), "Showing only " + MAX_NUMBER_OF_TIME_SERIES + " time series. ",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([style.showAllTimeSeries]), onClick: this.onShowAllTimeSeries }, "Show all " + series.length))),
            showPanel && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { label: "Graph", collapsible: true, isOpen: showingGraph, loading: loading, onToggle: this.onClickGraphButton }, this.renderGraph())),
            !showPanel && this.renderGraph()));
    };
    return UnThemedExploreGraphPanel;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var ExploreGraphPanel = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["withTheme"])(UnThemedExploreGraphPanel);
ExploreGraphPanel.displayName = 'ExploreGraphPanel';
var templateObject_1, templateObject_2, templateObject_3;


/***/ }),

/***/ "./public/app/features/explore/ExploreTimeControls.tsx":
/*!*************************************************************!*\
  !*** ./public/app/features/explore/ExploreTimeControls.tsx ***!
  \*************************************************************/
/*! exports provided: ExploreTimeControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreTimeControls", function() { return ExploreTimeControls; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _TimeSyncButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeSyncButton */ "./public/app/features/explore/TimeSyncButton.tsx");
/* harmony import */ var app_core_components_TimePicker_TimePickerWithHistory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/TimePicker/TimePickerWithHistory */ "./public/app/core/components/TimePicker/TimePickerWithHistory.tsx");
/* harmony import */ var app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/timePicker */ "./public/app/core/utils/timePicker.ts");

// Libaries


// State
// Components


// Utils & Services

var ExploreTimeControls = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ExploreTimeControls, _super);
    function ExploreTimeControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMoveTimePicker = function (direction) {
            var _a = _this.props, range = _a.range, onChangeTime = _a.onChangeTime, timeZone = _a.timeZone;
            var _b = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_5__["getShiftedTimeRange"])(direction, range), from = _b.from, to = _b.to;
            var nextTimeRange = {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTimeForTimeZone"])(timeZone, from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTimeForTimeZone"])(timeZone, to),
            };
            onChangeTime(nextTimeRange);
        };
        _this.onMoveForward = function () { return _this.onMoveTimePicker(1); };
        _this.onMoveBack = function () { return _this.onMoveTimePicker(-1); };
        _this.onChangeTimePicker = function (timeRange) {
            _this.props.onChangeTime(timeRange.raw);
        };
        _this.onZoom = function () {
            var _a = _this.props, range = _a.range, onChangeTime = _a.onChangeTime, timeZone = _a.timeZone;
            var _b = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_5__["getZoomedTimeRange"])(range, 2), from = _b.from, to = _b.to;
            var nextTimeRange = {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTimeForTimeZone"])(timeZone, from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTimeForTimeZone"])(timeZone, to),
            };
            onChangeTime(nextTimeRange);
        };
        return _this;
    }
    ExploreTimeControls.prototype.render = function () {
        var _a = this.props, range = _a.range, timeZone = _a.timeZone, splitted = _a.splitted, syncedTimes = _a.syncedTimes, onChangeTimeSync = _a.onChangeTimeSync, hideText = _a.hideText;
        var timeSyncButton = splitted ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TimeSyncButton__WEBPACK_IMPORTED_MODULE_3__["TimeSyncButton"], { onClick: onChangeTimeSync, isSynced: syncedTimes }) : undefined;
        var timePickerCommonProps = {
            value: range,
            timeZone: timeZone,
            onMoveBackward: this.onMoveBack,
            onMoveForward: this.onMoveForward,
            onZoom: this.onZoom,
            hideText: hideText,
        };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_TimePicker_TimePickerWithHistory__WEBPACK_IMPORTED_MODULE_4__["TimePickerWithHistory"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, timePickerCommonProps, { timeSyncButton: timeSyncButton, isSynced: syncedTimes, onChange: this.onChangeTimePicker })));
    };
    return ExploreTimeControls;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "./public/app/features/explore/ExploreToolbar.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/ExploreToolbar.tsx ***!
  \********************************************************/
/*! exports provided: UnConnectedExploreToolbar, ExploreToolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnConnectedExploreToolbar", function() { return UnConnectedExploreToolbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreToolbar", function() { return ExploreToolbar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash_omitBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/omitBy */ "./node_modules/lodash/omitBy.js");
/* harmony import */ var lodash_omitBy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_omitBy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _profile_state_selectors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var _dashboard_services_DashboardSrv__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../dashboard/services/DashboardSrv */ "./public/app/features/dashboard/services/DashboardSrv.ts");
/* harmony import */ var _core_utils_kbn__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../core/utils/kbn */ "./public/app/core/utils/kbn.ts");
/* harmony import */ var _ExploreTimeControls__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ExploreTimeControls */ "./public/app/features/explore/ExploreTimeControls.tsx");
/* harmony import */ var _LiveTailButton__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./LiveTailButton */ "./public/app/features/explore/LiveTailButton.tsx");
/* harmony import */ var _ResponsiveButton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ResponsiveButton */ "./public/app/features/explore/ResponsiveButton.tsx");
/* harmony import */ var _RunButton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./RunButton */ "./public/app/features/explore/RunButton.tsx");
/* harmony import */ var _useLiveTailControls__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./useLiveTailControls */ "./public/app/features/explore/useLiveTailControls.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/explore/state/selectors.ts");
/* harmony import */ var _dashboard_state_actions__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../dashboard/state/actions */ "./public/app/features/dashboard/state/actions.ts");























var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_5__["default"])(function () {
    return {
        liveTailButtons: Object(emotion__WEBPACK_IMPORTED_MODULE_7__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      margin-left: 10px;\n      @media (max-width: 1110px) {\n        margin-left: 4px;\n      }\n    "], ["\n      margin-left: 10px;\n      @media (max-width: 1110px) {\n        margin-left: 4px;\n      }\n    "]))),
    };
});
var UnConnectedExploreToolbar = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(UnConnectedExploreToolbar, _super);
    function UnConnectedExploreToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeDatasource = function (option) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                this.props.changeDatasource(this.props.exploreId, option.value);
                return [2 /*return*/];
            });
        }); };
        _this.onClearAll = function () {
            _this.props.clearAll(_this.props.exploreId);
        };
        _this.onRunQuery = function () {
            return _this.props.runQueries(_this.props.exploreId);
        };
        _this.onChangeRefreshInterval = function (item) {
            var _a = _this.props, changeRefreshInterval = _a.changeRefreshInterval, exploreId = _a.exploreId;
            changeRefreshInterval(exploreId, item);
        };
        _this.onModeChange = function (mode) {
            var _a = _this.props, changeMode = _a.changeMode, exploreId = _a.exploreId;
            changeMode(exploreId, mode);
        };
        _this.onChangeTimeSync = function () {
            var _a = _this.props, syncTimes = _a.syncTimes, exploreId = _a.exploreId;
            syncTimes(exploreId);
        };
        _this.returnToPanel = function (_a) {
            var _b = (_a === void 0 ? {} : _a).withChanges, withChanges = _b === void 0 ? false : _b;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
                var _c, originPanelId, queries, dashboardSrv, dash, titleSlug, dashViewOptions;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
                    _c = this.props, originPanelId = _c.originPanelId, queries = _c.queries;
                    dashboardSrv = Object(_dashboard_services_DashboardSrv__WEBPACK_IMPORTED_MODULE_14__["getDashboardSrv"])();
                    dash = dashboardSrv.getCurrent();
                    titleSlug = _core_utils_kbn__WEBPACK_IMPORTED_MODULE_15__["default"].slugifyForUrl(dash.title);
                    if (withChanges) {
                        this.props.setDashboardQueriesToUpdateOnLoad(originPanelId, this.cleanQueries(queries));
                    }
                    dashViewOptions = {
                        fullscreen: withChanges || dash.meta.fullscreen,
                        edit: withChanges || dash.meta.isEditing,
                    };
                    this.props.updateLocation({
                        path: "/d/" + dash.uid + "/:" + titleSlug,
                        query: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, lodash_omitBy__WEBPACK_IMPORTED_MODULE_1___default()(dashViewOptions, function (v) { return !v; })), { panelId: originPanelId }),
                    });
                    return [2 /*return*/];
                });
            });
        };
        _this.getSelectedDatasource = function () {
            var datasourceName = _this.props.datasourceName;
            var exploreDatasources = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_21__["getExploreDatasources"])();
            return datasourceName ? exploreDatasources.find(function (datasource) { return datasource.name === datasourceName; }) : undefined;
        };
        return _this;
    }
    // Remove explore specific parameters from queries
    UnConnectedExploreToolbar.prototype.cleanQueries = function (queries) {
        return queries.map(function (query) {
            delete query.context;
            delete query.key;
            return query;
        });
    };
    UnConnectedExploreToolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, datasourceMissing = _a.datasourceMissing, closeSplit = _a.closeSplit, exploreId = _a.exploreId, loading = _a.loading, range = _a.range, timeZone = _a.timeZone, splitted = _a.splitted, syncedTimes = _a.syncedTimes, refreshInterval = _a.refreshInterval, onChangeTime = _a.onChangeTime, split = _a.split, supportedModes = _a.supportedModes, selectedMode = _a.selectedMode, hasLiveOption = _a.hasLiveOption, isLive = _a.isLive, isPaused = _a.isPaused, originPanelId = _a.originPanelId, datasourceLoading = _a.datasourceLoading, containerWidth = _a.containerWidth;
        var styles = getStyles();
        var originDashboardIsEditable = originPanelId && Number.isInteger(originPanelId);
        var panelReturnClasses = classnames__WEBPACK_IMPORTED_MODULE_6___default()('btn', 'navbar-button', {
            'btn--radius-right-0': originDashboardIsEditable,
            'navbar-button navbar-button--border-right-0': originDashboardIsEditable,
        });
        var showSmallDataSourcePicker = (splitted ? containerWidth < 700 : containerWidth < 800) || false;
        var showSmallTimePicker = splitted || containerWidth < 1210;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: splitted ? 'explore-toolbar splitted' : 'explore-toolbar' },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-item" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-header" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-header-title" }, exploreId === 'left' && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "navbar-page-btn" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "gicon gicon-explore" }),
                        "Explore"))),
                    splitted && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { className: "explore-toolbar-header-close", onClick: function () { return closeSplit(exploreId); } },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-times fa-fw" }))))),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-item" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content" },
                    !datasourceMissing ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: classnames__WEBPACK_IMPORTED_MODULE_6___default()('explore-ds-picker', showSmallDataSourcePicker ? 'explore-ds-picker--small' : '') },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_10__["DataSourcePicker"], { onChange: this.onChangeDatasource, datasources: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_21__["getExploreDatasources"])(), current: this.getSelectedDatasource(), showLoading: datasourceLoading, hideTextValue: showSmallDataSourcePicker })),
                        supportedModes.length > 1 ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "query-type-toggle" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["ToggleButtonGroup"], { label: "", transparent: true },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["ToggleButton"], { key: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics, value: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics, onChange: this.onModeChange, selected: selectedMode === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics }, 'Metrics'),
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["ToggleButton"], { key: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs, value: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs, onChange: this.onModeChange, selected: selectedMode === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs }, 'Logs')))) : null)) : null,
                    originPanelId && Number.isInteger(originPanelId) && !splitted && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["Tooltip"], { content: 'Return to panel', placement: "bottom" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", { className: panelReturnClasses, onClick: function () { return _this.returnToPanel(); } },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-arrow-left" }))),
                        originDashboardIsEditable && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["ButtonSelect"], { className: "navbar-button--attached btn--radius-left-0$", options: [{ label: 'Return to panel with changes', value: '' }], onChange: function () { return _this.returnToPanel({ withChanges: true }); }, maxMenuHeight: 380 })))),
                    exploreId === 'left' && !splitted ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item explore-icon-align" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ResponsiveButton__WEBPACK_IMPORTED_MODULE_18__["ResponsiveButton"], { splitted: splitted, title: "Split", onClick: split, iconClassName: "fa fa-fw fa-columns icon-margin-right", disabled: isLive }))) : null,
                    !isLive && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ExploreTimeControls__WEBPACK_IMPORTED_MODULE_16__["ExploreTimeControls"], { exploreId: exploreId, range: range, timeZone: timeZone, onChangeTime: onChangeTime, splitted: splitted, syncedTimes: syncedTimes, onChangeTimeSync: this.onChangeTimeSync, hideText: showSmallTimePicker }))),
                    !isLive && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item explore-icon-align" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ResponsiveButton__WEBPACK_IMPORTED_MODULE_18__["ResponsiveButton"], { splitted: splitted, title: "Clear All", onClick: this.onClearAll, iconClassName: "fa fa-fw fa-trash icon-margin-right" }))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_RunButton__WEBPACK_IMPORTED_MODULE_19__["RunButton"], { refreshInterval: refreshInterval, onChangeRefreshInterval: this.onChangeRefreshInterval, splitted: splitted, loading: loading || (isLive && !isPaused), onRun: this.onRunQuery, showDropdown: !isLive }),
                        refreshInterval && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["SetInterval"], { func: this.onRunQuery, interval: refreshInterval, loading: loading })),
                    hasLiveOption && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item " + styles.liveTailButtons },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_useLiveTailControls__WEBPACK_IMPORTED_MODULE_20__["LiveTailControls"], { exploreId: exploreId }, function (controls) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_LiveTailButton__WEBPACK_IMPORTED_MODULE_17__["LiveTailButton"], { splitted: splitted, isLive: isLive, isPaused: isPaused, start: controls.start, pause: controls.pause, resume: controls.resume, stop: controls.stop })); })))))));
    };
    return UnConnectedExploreToolbar;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));

var mapStateToProps = function (state, _a) {
    var exploreId = _a.exploreId;
    var _b, _c, _d;
    var splitted = state.explore.split;
    var syncedTimes = state.explore.syncedTimes;
    var exploreItem = state.explore[exploreId];
    var datasourceInstance = exploreItem.datasourceInstance, datasourceMissing = exploreItem.datasourceMissing, range = exploreItem.range, refreshInterval = exploreItem.refreshInterval, loading = exploreItem.loading, supportedModes = exploreItem.supportedModes, mode = exploreItem.mode, isLive = exploreItem.isLive, isPaused = exploreItem.isPaused, originPanelId = exploreItem.originPanelId, queries = exploreItem.queries, datasourceLoading = exploreItem.datasourceLoading, containerWidth = exploreItem.containerWidth;
    var hasLiveOption = ((_c = (_b = datasourceInstance) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.streaming) && mode === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs;
    return {
        datasourceMissing: datasourceMissing,
        datasourceName: (_d = datasourceInstance) === null || _d === void 0 ? void 0 : _d.name,
        loading: loading,
        range: range,
        timeZone: Object(_profile_state_selectors__WEBPACK_IMPORTED_MODULE_13__["getTimeZone"])(state.user),
        splitted: splitted,
        refreshInterval: refreshInterval,
        supportedModes: supportedModes,
        selectedMode: supportedModes.includes(mode) ? mode : supportedModes[0],
        hasLiveOption: hasLiveOption,
        isLive: isLive,
        isPaused: isPaused,
        originPanelId: originPanelId,
        queries: queries,
        syncedTimes: syncedTimes,
        datasourceLoading: datasourceLoading,
        containerWidth: containerWidth,
    };
};
var mapDispatchToProps = {
    changeDatasource: _state_actions__WEBPACK_IMPORTED_MODULE_11__["changeDatasource"],
    updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_12__["updateLocation"],
    changeRefreshInterval: _state_actions__WEBPACK_IMPORTED_MODULE_11__["changeRefreshInterval"],
    clearAll: _state_actions__WEBPACK_IMPORTED_MODULE_11__["clearQueries"],
    runQueries: _state_actions__WEBPACK_IMPORTED_MODULE_11__["runQueries"],
    closeSplit: _state_actions__WEBPACK_IMPORTED_MODULE_11__["splitClose"],
    split: _state_actions__WEBPACK_IMPORTED_MODULE_11__["splitOpen"],
    syncTimes: _state_actions__WEBPACK_IMPORTED_MODULE_11__["syncTimes"],
    changeMode: _state_actions__WEBPACK_IMPORTED_MODULE_11__["changeMode"],
    setDashboardQueriesToUpdateOnLoad: _dashboard_state_actions__WEBPACK_IMPORTED_MODULE_22__["setDashboardQueriesToUpdateOnLoad"],
};
var ExploreToolbar = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(UnConnectedExploreToolbar));
var templateObject_1;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/LiveLogs.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/explore/LiveLogs.tsx ***!
  \**************************************************/
/*! exports provided: LiveLogsWithTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveLogsWithTheme", function() { return LiveLogsWithTheme; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tinycolor2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _ElapsedTime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ElapsedTime */ "./public/app/features/explore/ElapsedTime.tsx");






var getStyles = function (theme) { return ({
    logsRowsLive: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    label: logs-rows-live;\n    font-family: ", ";\n    font-size: ", ";\n    display: flex;\n    flex-flow: column nowrap;\n    height: 65vh;\n    overflow-y: auto;\n    :first-child {\n      margin-top: auto !important;\n    }\n  "], ["\n    label: logs-rows-live;\n    font-family: ", ";\n    font-size: ", ";\n    display: flex;\n    flex-flow: column nowrap;\n    height: 65vh;\n    overflow-y: auto;\n    :first-child {\n      margin-top: auto !important;\n    }\n  "])), theme.typography.fontFamily.monospace, theme.typography.size.sm),
    logsRowFade: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    label: logs-row-fresh;\n    color: ", ";\n    background-color: ", ";\n    animation: fade 1s ease-out 1s 1 normal forwards;\n    @keyframes fade {\n      from {\n        background-color: ", ";\n      }\n      to {\n        background-color: transparent;\n      }\n    }\n  "], ["\n    label: logs-row-fresh;\n    color: ", ";\n    background-color: ",
        ";\n    animation: fade 1s ease-out 1s 1 normal forwards;\n    @keyframes fade {\n      from {\n        background-color: ",
        ";\n      }\n      to {\n        background-color: transparent;\n      }\n    }\n  "])), theme.colors.text, tinycolor2__WEBPACK_IMPORTED_MODULE_3___default()(theme.colors.blueLight)
        .setAlpha(0.25)
        .toString(), tinycolor2__WEBPACK_IMPORTED_MODULE_3___default()(theme.colors.blueLight)
        .setAlpha(0.25)
        .toString()),
    logsRowsIndicator: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    font-size: ", ";\n    padding-top: ", ";\n    display: flex;\n    align-items: center;\n  "], ["\n    font-size: ", ";\n    padding-top: ", ";\n    display: flex;\n    align-items: center;\n  "])), theme.typography.size.md, theme.spacing.sm),
    button: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    margin-right: ", ";\n  "], ["\n    margin-right: ", ";\n  "])), theme.spacing.sm),
    fullWidth: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    width: 100%;\n  "], ["\n    width: 100%;\n  "]))),
}); };
var LiveLogs = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LiveLogs, _super);
    function LiveLogs(props) {
        var _this = _super.call(this, props) || this;
        _this.liveEndDiv = null;
        _this.scrollContainerRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
        _this.lastScrollPos = null;
        /**
         * Handle pausing when user scrolls up so that we stop resetting his position to the bottom when new row arrives.
         * We do not need to throttle it here much, adding new rows should be throttled/buffered itself in the query epics
         * and after you pause we remove the handler and add it after you manually resume, so this should not be fired often.
         */
        _this.onScroll = function (event) {
            var _a = _this.props, isPaused = _a.isPaused, onPause = _a.onPause;
            var _b = event.currentTarget, scrollTop = _b.scrollTop, clientHeight = _b.clientHeight, scrollHeight = _b.scrollHeight;
            var distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
            if (distanceFromBottom >= 5 && !isPaused) {
                onPause();
                _this.lastScrollPos = distanceFromBottom;
            }
        };
        _this.rowsToRender = function () {
            var isPaused = _this.props.isPaused;
            var _a = _this.state.logRowsToRender, rowsToRender = _a === void 0 ? [] : _a;
            if (!isPaused) {
                // A perf optimisation here. Show just 100 rows when streaming and full length when the streaming is paused.
                rowsToRender = rowsToRender.slice(-100);
            }
            return rowsToRender;
        };
        _this.state = {
            logRowsToRender: props.logRows,
        };
        return _this;
    }
    LiveLogs.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.isPaused && this.props.isPaused) {
            // So we paused the view and we changed the content size, but we want to keep the relative offset from the bottom.
            if (this.lastScrollPos && this.scrollContainerRef.current) {
                // There is last scroll pos from when user scrolled up a bit so go to that position.
                var _a = this.scrollContainerRef.current, clientHeight = _a.clientHeight, scrollHeight = _a.scrollHeight;
                var scrollTop = scrollHeight - (this.lastScrollPos + clientHeight);
                this.scrollContainerRef.current.scrollTo(0, scrollTop);
                this.lastScrollPos = null;
            }
            else {
                // We do not have any position to jump to su the assumption is user just clicked pause. We can just scroll
                // to the bottom.
                if (this.liveEndDiv) {
                    this.liveEndDiv.scrollIntoView(false);
                }
            }
        }
    };
    LiveLogs.getDerivedStateFromProps = function (nextProps, state) {
        if (!nextProps.isPaused) {
            return {
                // We update what we show only if not paused. We keep any background subscriptions running and keep updating
                // our state, but we do not show the updates, this allows us start again showing correct result after resuming
                // without creating a gap in the log results.
                logRowsToRender: nextProps.logRows,
            };
        }
        else {
            return null;
        }
    };
    LiveLogs.prototype.render = function () {
        var _this = this;
        var _a = this.props, theme = _a.theme, timeZone = _a.timeZone, onPause = _a.onPause, onResume = _a.onResume, isPaused = _a.isPaused;
        var styles = getStyles(theme);
        var showUtc = timeZone === 'utc';
        var _b = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["getLogRowStyles"])(theme), logsRow = _b.logsRow, logsRowLocalTime = _b.logsRowLocalTime, logsRowMessage = _b.logsRowMessage;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: styles.fullWidth },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", { onScroll: isPaused ? undefined : this.onScroll, className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(['logs-rows', styles.logsRowsLive]), ref: this.scrollContainerRef },
                    this.rowsToRender().map(function (row) {
                        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(logsRow, styles.logsRowFade), key: row.uid },
                            showUtc && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(logsRowLocalTime), title: "Local: " + row.timeLocal + " (" + row.timeFromNow + ")" }, row.timeUtc)),
                            !showUtc && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(logsRowLocalTime), title: row.timeUtc + " (" + row.timeFromNow + ")" }, row.timeLocal)),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(logsRowMessage) }, row.entry)));
                    }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { ref: function (element) {
                            _this.liveEndDiv = element;
                            // This is triggered on every update so on every new row. It keeps the view scrolled at the bottom by
                            // default.
                            if (_this.liveEndDiv && !isPaused) {
                                _this.liveEndDiv.scrollIntoView(false);
                            }
                        } }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([styles.logsRowsIndicator]) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { onClick: isPaused ? onResume : onPause, className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])('btn btn-secondary', styles.button) },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])('fa', isPaused ? 'fa-play' : 'fa-pause') }),
                    "\u00A0",
                    isPaused ? 'Resume' : 'Pause'),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { onClick: this.props.stopLive, className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])('btn btn-inverse', styles.button) },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: 'fa fa-stop' }),
                    "\u00A0 Exit live mode"),
                isPaused || (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null,
                    "Last line received: ",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ElapsedTime__WEBPACK_IMPORTED_MODULE_5__["default"], { resetKey: this.props.logRows, humanize: true }),
                    " ago")))));
    };
    return LiveLogs;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var LiveLogsWithTheme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["withTheme"])(LiveLogs);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;


/***/ }),

/***/ "./public/app/features/explore/LiveTailButton.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/LiveTailButton.tsx ***!
  \********************************************************/
/*! exports provided: LiveTailButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveTailButton", function() { return LiveTailButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tinycolor2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _ResponsiveButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ResponsiveButton */ "./public/app/features/explore/ResponsiveButton.tsx");







//Components

var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["stylesFactory"])(function (theme) {
    var bgColor = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["selectThemeVariant"])({ light: theme.colors.gray5, dark: theme.colors.dark1 }, theme.type);
    var orangeLighter = tinycolor2__WEBPACK_IMPORTED_MODULE_3___default()(theme.colors.orangeDark)
        .lighten(10)
        .toString();
    var pulseTextColor = tinycolor2__WEBPACK_IMPORTED_MODULE_3___default()(theme.colors.orangeDark)
        .desaturate(90)
        .toString();
    return {
        noRightBorderStyle: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: noRightBorderStyle;\n      border-right: 0;\n    "], ["\n      label: noRightBorderStyle;\n      border-right: 0;\n    "]))),
        liveButton: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: liveButton;\n      margin: 0;\n    "], ["\n      label: liveButton;\n      margin: 0;\n    "]))),
        isLive: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: isLive;\n      border-color: ", ";\n      color: ", ";\n      background: transparent;\n      &:focus {\n        background: transparent;\n        border-color: ", ";\n        color: ", ";\n      }\n      &:hover {\n        background-color: ", ";\n      }\n      &:active,\n      &:hover {\n        border-color: ", ";\n        color: ", ";\n      }\n    "], ["\n      label: isLive;\n      border-color: ", ";\n      color: ", ";\n      background: transparent;\n      &:focus {\n        background: transparent;\n        border-color: ", ";\n        color: ", ";\n      }\n      &:hover {\n        background-color: ", ";\n      }\n      &:active,\n      &:hover {\n        border-color: ", ";\n        color: ", ";\n      }\n    "])), theme.colors.orangeDark, theme.colors.orangeDark, theme.colors.orangeDark, theme.colors.orangeDark, bgColor, orangeLighter, orangeLighter),
        isPaused: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: isPaused;\n      border-color: ", ";\n      background: transparent;\n      animation: pulse 3s ease-out 0s infinite normal forwards;\n      &:focus {\n        background: transparent;\n        border-color: ", ";\n      }\n      &:hover {\n        background-color: ", ";\n      }\n      &:active,\n      &:hover {\n        border-color: ", ";\n      }\n      @keyframes pulse {\n        0% {\n          color: ", ";\n        }\n        50% {\n          color: ", ";\n        }\n        100% {\n          color: ", ";\n        }\n      }\n    "], ["\n      label: isPaused;\n      border-color: ", ";\n      background: transparent;\n      animation: pulse 3s ease-out 0s infinite normal forwards;\n      &:focus {\n        background: transparent;\n        border-color: ", ";\n      }\n      &:hover {\n        background-color: ", ";\n      }\n      &:active,\n      &:hover {\n        border-color: ", ";\n      }\n      @keyframes pulse {\n        0% {\n          color: ", ";\n        }\n        50% {\n          color: ", ";\n        }\n        100% {\n          color: ", ";\n        }\n      }\n    "])), theme.colors.orangeDark, theme.colors.orangeDark, bgColor, orangeLighter, pulseTextColor, theme.colors.orangeDark, pulseTextColor),
        stopButtonEnter: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_5 || (templateObject_5 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: stopButtonEnter;\n      width: 0;\n      opacity: 0;\n      overflow: hidden;\n    "], ["\n      label: stopButtonEnter;\n      width: 0;\n      opacity: 0;\n      overflow: hidden;\n    "]))),
        stopButtonEnterActive: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_6 || (templateObject_6 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: stopButtonEnterActive;\n      opacity: 1;\n      width: 32px;\n    "], ["\n      label: stopButtonEnterActive;\n      opacity: 1;\n      width: 32px;\n    "]))),
        stopButtonExit: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_7 || (templateObject_7 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: stopButtonExit;\n      width: 32px;\n      opacity: 1;\n      overflow: hidden;\n    "], ["\n      label: stopButtonExit;\n      width: 32px;\n      opacity: 1;\n      overflow: hidden;\n    "]))),
        stopButtonExitActive: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_8 || (templateObject_8 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: stopButtonExitActive;\n      opacity: 0;\n      width: 0;\n    "], ["\n      label: stopButtonExitActive;\n      opacity: 0;\n      width: 0;\n    "]))),
    };
});
var defaultLiveTooltip = function () {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, "Live");
};
function LiveTailButton(props) {
    var _a;
    var start = props.start, pause = props.pause, resume = props.resume, isLive = props.isLive, isPaused = props.isPaused, stop = props.stop, splitted = props.splitted;
    var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["useTheme"])();
    var styles = getStyles(theme);
    var onClickMain = isLive ? (isPaused ? resume : pause) : start;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], { content: defaultLiveTooltip, placement: "bottom" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ResponsiveButton__WEBPACK_IMPORTED_MODULE_7__["ResponsiveButton"], { splitted: splitted, buttonClassName: classnames__WEBPACK_IMPORTED_MODULE_2___default()('btn navbar-button', styles.liveButton, (_a = {},
                    _a["btn--radius-right-0 explore-active-button-glow " + styles.noRightBorderStyle] = isLive,
                    _a[styles.isLive] = isLive && !isPaused,
                    _a[styles.isPaused] = isLive && isPaused,
                    _a)), iconClassName: classnames__WEBPACK_IMPORTED_MODULE_2___default()('fa', isPaused || !isLive ? 'fa-play' : 'fa-pause', isLive && 'icon-brand-gradient'), onClick: onClickMain, title: '\xa0Live' })),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_5__["CSSTransition"], { mountOnEnter: true, unmountOnExit: true, timeout: 500, in: isLive, classNames: {
                enter: styles.stopButtonEnter,
                enterActive: styles.stopButtonEnterActive,
                exit: styles.stopButtonExit,
                exitActive: styles.stopButtonExitActive,
            } },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--attached explore-active-button-glow " + styles.isLive, onClick: stop },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('fa fa-stop icon-brand-gradient') }))))));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;


/***/ }),

/***/ "./public/app/features/explore/Logs.tsx":
/*!**********************************************!*\
  !*** ./public/app/features/explore/Logs.tsx ***!
  \**********************************************/
/*! exports provided: Logs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logs", function() { return Logs; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var _ExploreGraphPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ExploreGraphPanel */ "./public/app/features/explore/ExploreGraphPanel.tsx");






var SETTINGS_KEYS = {
    showLabels: 'grafana.explore.logs.showLabels',
    showTime: 'grafana.explore.logs.showTime',
    wrapLogMessage: 'grafana.explore.logs.wrapLogMessage',
};
function renderMetaItem(value, kind) {
    if (kind === _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsMetaKind"].LabelsMap) {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-meta-item__labels" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LogLabels"], { labels: value })));
    }
    return value;
}
var Logs = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Logs, _super);
    function Logs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showLabels: app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].getBool(SETTINGS_KEYS.showLabels, false),
            showTime: app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].getBool(SETTINGS_KEYS.showTime, true),
            wrapLogMessage: app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].getBool(SETTINGS_KEYS.wrapLogMessage, true),
        };
        _this.onChangeDedup = function (dedup) {
            var onDedupStrategyChange = _this.props.onDedupStrategyChange;
            if (_this.props.dedupStrategy === dedup) {
                return onDedupStrategyChange(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsDedupStrategy"].none);
            }
            return onDedupStrategyChange(dedup);
        };
        _this.onChangeLabels = function (event) {
            var target = event && event.target;
            if (target) {
                var showLabels = target.checked;
                _this.setState({
                    showLabels: showLabels,
                });
                app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].set(SETTINGS_KEYS.showLabels, showLabels);
            }
        };
        _this.onChangeTime = function (event) {
            var target = event && event.target;
            if (target) {
                var showTime = target.checked;
                _this.setState({
                    showTime: showTime,
                });
                app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].set(SETTINGS_KEYS.showTime, showTime);
            }
        };
        _this.onChangewrapLogMessage = function (event) {
            var target = event && event.target;
            if (target) {
                var wrapLogMessage = target.checked;
                _this.setState({
                    wrapLogMessage: wrapLogMessage,
                });
                app_core_store__WEBPACK_IMPORTED_MODULE_4__["default"].set(SETTINGS_KEYS.wrapLogMessage, wrapLogMessage);
            }
        };
        _this.onToggleLogLevel = function (hiddenRawLevels) {
            var hiddenLogLevels = hiddenRawLevels.map(function (level) { return _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogLevel"][level]; });
            _this.props.onToggleLogLevel(hiddenLogLevels);
        };
        _this.onClickScan = function (event) {
            event.preventDefault();
            if (_this.props.onStartScanning) {
                _this.props.onStartScanning();
            }
        };
        _this.onClickStopScan = function (event) {
            event.preventDefault();
            if (_this.props.onStopScanning) {
                _this.props.onStopScanning();
            }
        };
        return _this;
    }
    Logs.prototype.render = function () {
        var _this = this;
        var _a = this.props, logRows = _a.logRows, logsMeta = _a.logsMeta, logsSeries = _a.logsSeries, highlighterExpressions = _a.highlighterExpressions, _b = _a.loading, loading = _b === void 0 ? false : _b, onClickFilterLabel = _a.onClickFilterLabel, onClickFilterOutLabel = _a.onClickFilterOutLabel, timeZone = _a.timeZone, scanning = _a.scanning, scanRange = _a.scanRange, width = _a.width, dedupedRows = _a.dedupedRows, absoluteRange = _a.absoluteRange, onChangeTime = _a.onChangeTime, getFieldLinks = _a.getFieldLinks;
        if (!logRows) {
            return null;
        }
        var _c = this.state, showLabels = _c.showLabels, showTime = _c.showTime, wrapLogMessage = _c.wrapLogMessage;
        var dedupStrategy = this.props.dedupStrategy;
        var hasData = logRows && logRows.length > 0;
        var dedupCount = dedupedRows
            ? dedupedRows.reduce(function (sum, row) { return (row.duplicates ? sum + row.duplicates : sum); }, 0)
            : 0;
        var meta = logsMeta ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(logsMeta) : [];
        if (dedupStrategy !== _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsDedupStrategy"].none) {
            meta.push({
                label: 'Dedup count',
                value: dedupCount,
                kind: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsMetaKind"].Number,
            });
        }
        var scanText = scanRange ? "Scanning " + _grafana_data__WEBPACK_IMPORTED_MODULE_2__["rangeUtil"].describeTimeRange(scanRange) : 'Scanning...';
        var series = logsSeries ? logsSeries : [];
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-graph" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ExploreGraphPanel__WEBPACK_IMPORTED_MODULE_5__["ExploreGraphPanel"], { series: series, width: width, onHiddenSeriesChanged: this.onToggleLogLevel, loading: loading, absoluteRange: absoluteRange, isStacked: true, showPanel: false, showingGraph: true, showingTable: true, timeZone: timeZone, showBars: true, showLines: false, onUpdateTimeRange: onChangeTime })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-options" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-controls" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Time", checked: showTime, onChange: this.onChangeTime, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Unique labels", checked: showLabels, onChange: this.onChangeLabels, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Wrap lines", checked: wrapLogMessage, onChange: this.onChangewrapLogMessage, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ToggleButtonGroup"], { label: "Dedup", transparent: true }, Object.keys(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsDedupStrategy"]).map(function (dedupType, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ToggleButton"], { key: i, value: dedupType, onChange: _this.onChangeDedup, selected: dedupStrategy === dedupType, 
                        // @ts-ignore
                        tooltip: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsDedupDescription"][dedupType] }, dedupType)); })))),
            hasData && meta && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-meta" }, meta.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-meta__item", key: item.label },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-panel-meta__label" },
                    item.label,
                    ":"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-panel-meta__value" }, renderMetaItem(item.value, item.kind)))); }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LogRows"], { logRows: logRows, deduplicatedRows: dedupedRows, dedupStrategy: dedupStrategy, getRowContext: this.props.getRowContext, highlighterExpressions: highlighterExpressions, rowLimit: logRows ? logRows.length : undefined, onClickFilterLabel: onClickFilterLabel, onClickFilterOutLabel: onClickFilterOutLabel, showLabels: showLabels, showTime: showTime, wrapLogMessage: wrapLogMessage, timeZone: timeZone, getFieldLinks: getFieldLinks }),
            !loading && !hasData && !scanning && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-nodata" },
                "No logs found.",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "link", onClick: this.onClickScan }, "Scan for older logs"))),
            scanning && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-nodata" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, scanText),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "link", onClick: this.onClickStopScan }, "Stop scan")))));
    };
    return Logs;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/explore/LogsContainer.tsx":
/*!*******************************************************!*\
  !*** ./public/app/features/explore/LogsContainer.tsx ***!
  \*******************************************************/
/*! exports provided: LogsContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsContainer", function() { return LogsContainer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var app_features_explore_state_actionTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/features/explore/state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var app_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/features/explore/state/selectors */ "./public/app/features/explore/state/selectors.ts");
/* harmony import */ var _profile_state_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var _LiveLogs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./LiveLogs */ "./public/app/features/explore/LiveLogs.tsx");
/* harmony import */ var _Logs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Logs */ "./public/app/features/explore/Logs.tsx");
/* harmony import */ var _utils_LogsCrossFadeTransition__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/LogsCrossFadeTransition */ "./public/app/features/explore/utils/LogsCrossFadeTransition.tsx");
/* harmony import */ var _useLiveTailControls__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./useLiveTailControls */ "./public/app/features/explore/useLiveTailControls.ts");
/* harmony import */ var _panel_panellinks_linkSuppliers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../panel/panellinks/linkSuppliers */ "./public/app/features/panel/panellinks/linkSuppliers.ts");















var LogsContainer = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LogsContainer, _super);
    function LogsContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeTime = function (absoluteRange) {
            var _a = _this.props, exploreId = _a.exploreId, updateTimeRange = _a.updateTimeRange;
            updateTimeRange({ exploreId: exploreId, absoluteRange: absoluteRange });
        };
        _this.handleDedupStrategyChange = function (dedupStrategy) {
            _this.props.changeDedupStrategy(_this.props.exploreId, dedupStrategy);
        };
        _this.handleToggleLogLevel = function (hiddenLogLevels) {
            var exploreId = _this.props.exploreId;
            _this.props.toggleLogLevelAction({
                exploreId: exploreId,
                hiddenLogLevels: hiddenLogLevels,
            });
        };
        _this.getLogRowContext = function (row, options) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, Promise, function () {
            var datasourceInstance;
            var _a;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                datasourceInstance = this.props.datasourceInstance;
                if ((_a = datasourceInstance) === null || _a === void 0 ? void 0 : _a.getLogRowContext) {
                    return [2 /*return*/, datasourceInstance.getLogRowContext(row, options)];
                }
                return [2 /*return*/, []];
            });
        }); };
        return _this;
    }
    LogsContainer.prototype.render = function () {
        var _this = this;
        var _a = this.props, loading = _a.loading, logsHighlighterExpressions = _a.logsHighlighterExpressions, logRows = _a.logRows, logsMeta = _a.logsMeta, logsSeries = _a.logsSeries, dedupedRows = _a.dedupedRows, onClickFilterLabel = _a.onClickFilterLabel, onClickFilterOutLabel = _a.onClickFilterOutLabel, onStartScanning = _a.onStartScanning, onStopScanning = _a.onStopScanning, absoluteRange = _a.absoluteRange, timeZone = _a.timeZone, scanning = _a.scanning, range = _a.range, width = _a.width, isLive = _a.isLive, exploreId = _a.exploreId;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_LogsCrossFadeTransition__WEBPACK_IMPORTED_MODULE_12__["LogsCrossFadeTransition"], { visible: isLive },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { label: "Logs", loading: false, isOpen: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_useLiveTailControls__WEBPACK_IMPORTED_MODULE_13__["LiveTailControls"], { exploreId: exploreId }, function (controls) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LiveLogs__WEBPACK_IMPORTED_MODULE_10__["LiveLogsWithTheme"], { logRows: logRows, timeZone: timeZone, stopLive: controls.stop, isPaused: _this.props.isPaused, onPause: controls.pause, onResume: controls.resume })); }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_LogsCrossFadeTransition__WEBPACK_IMPORTED_MODULE_12__["LogsCrossFadeTransition"], { visible: !isLive },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { label: "Logs", loading: loading, isOpen: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Logs__WEBPACK_IMPORTED_MODULE_11__["Logs"], { dedupStrategy: this.props.dedupStrategy || _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LogsDedupStrategy"].none, logRows: logRows, logsMeta: logsMeta, logsSeries: logsSeries, dedupedRows: dedupedRows, highlighterExpressions: logsHighlighterExpressions, loading: loading, onChangeTime: this.onChangeTime, onClickFilterLabel: onClickFilterLabel, onClickFilterOutLabel: onClickFilterOutLabel, onStartScanning: onStartScanning, onStopScanning: onStopScanning, onDedupStrategyChange: this.handleDedupStrategyChange, onToggleLogLevel: this.handleToggleLogLevel, absoluteRange: absoluteRange, timeZone: timeZone, scanning: scanning, scanRange: range.raw, width: width, getRowContext: this.getLogRowContext, getFieldLinks: _panel_panellinks_linkSuppliers__WEBPACK_IMPORTED_MODULE_14__["getLinksFromLogsField"] })))));
    };
    return LogsContainer;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    // @ts-ignore
    var item = explore[exploreId];
    var logsHighlighterExpressions = item.logsHighlighterExpressions, logsResult = item.logsResult, loading = item.loading, scanning = item.scanning, datasourceInstance = item.datasourceInstance, isLive = item.isLive, isPaused = item.isPaused, range = item.range, absoluteRange = item.absoluteRange, dedupStrategy = item.dedupStrategy;
    var dedupedRows = Object(app_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_8__["deduplicatedRowsSelector"])(item);
    var timeZone = Object(_profile_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getTimeZone"])(state.user);
    return {
        loading: loading,
        logsHighlighterExpressions: logsHighlighterExpressions,
        logRows: logsResult && logsResult.rows,
        logsMeta: logsResult && logsResult.meta,
        logsSeries: logsResult && logsResult.series,
        scanning: scanning,
        timeZone: timeZone,
        dedupStrategy: dedupStrategy,
        dedupedRows: dedupedRows,
        datasourceInstance: datasourceInstance,
        isLive: isLive,
        isPaused: isPaused,
        range: range,
        absoluteRange: absoluteRange,
    };
}
var mapDispatchToProps = {
    changeDedupStrategy: _state_actions__WEBPACK_IMPORTED_MODULE_6__["changeDedupStrategy"],
    toggleLogLevelAction: app_features_explore_state_actionTypes__WEBPACK_IMPORTED_MODULE_7__["toggleLogLevelAction"],
    updateTimeRange: _state_actions__WEBPACK_IMPORTED_MODULE_6__["updateTimeRange"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(LogsContainer)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/NoDataSourceCallToAction.tsx":
/*!******************************************************************!*\
  !*** ./public/app/features/explore/NoDataSourceCallToAction.tsx ***!
  \******************************************************************/
/*! exports provided: NoDataSourceCallToAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoDataSourceCallToAction", function() { return NoDataSourceCallToAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");




var NoDataSourceCallToAction = function () {
    var theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ThemeContext"]);
    var message = 'Explore requires at least one data source. Once you have added a data source, you can query it here.';
    var footer = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-rocket" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, " ProTip: You can also define data sources through configuration files. "),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "http://docs.grafana.org/administration/provisioning/#datasources?utm_source=explore", target: "_blank", rel: "noopener", className: "text-link" }, "Learn more")));
    var ctaElement = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LinkButton"], { size: "lg", href: "/datasources/new", icon: "gicon gicon-datasources" }, "Add data source"));
    var cardClassName = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    max-width: ", ";\n    margin-top: ", ";\n    align-self: center;\n  "], ["\n    max-width: ", ";\n    margin-top: ", ";\n    align-self: center;\n  "])), theme.breakpoints.lg, theme.spacing.md);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["CallToActionCard"], { callToActionElement: ctaElement, className: cardClassName, footer: footer, message: message, theme: theme }));
};
var templateObject_1;


/***/ }),

/***/ "./public/app/features/explore/QueryEditor.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/QueryEditor.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/plugins/plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

// Libraries

// Services




var QueryEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryEditor, _super);
    function QueryEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryEditor.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, datasource, initialQuery, exploreEvents, range, loader, template, target, scopeProps;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                if (!this.element) {
                    return [2 /*return*/];
                }
                _a = this.props, datasource = _a.datasource, initialQuery = _a.initialQuery, exploreEvents = _a.exploreEvents, range = _a.range;
                this.initTimeSrv(range);
                loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getAngularLoader"])();
                template = '<plugin-component type="query-ctrl"> </plugin-component>';
                target = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ datasource: datasource.name }, initialQuery);
                scopeProps = {
                    ctrl: {
                        datasource: datasource,
                        target: target,
                        refresh: function () {
                            setTimeout(function () {
                                var _a, _b, _c, _d;
                                (_b = (_a = _this.props).onQueryChange) === null || _b === void 0 ? void 0 : _b.call(_a, target);
                                (_d = (_c = _this.props).onExecuteQuery) === null || _d === void 0 ? void 0 : _d.call(_c);
                            }, 1);
                        },
                        onQueryChange: function () {
                            setTimeout(function () {
                                var _a, _b;
                                (_b = (_a = _this.props).onQueryChange) === null || _b === void 0 ? void 0 : _b.call(_a, target);
                            }, 1);
                        },
                        events: exploreEvents,
                        panel: { datasource: datasource, targets: [target] },
                        dashboard: {},
                    },
                };
                this.component = loader.load(this.element, scopeProps, template);
                this.angularScope = scopeProps.ctrl;
                setTimeout(function () {
                    var _a, _b, _c, _d;
                    (_b = (_a = _this.props).onQueryChange) === null || _b === void 0 ? void 0 : _b.call(_a, target);
                    (_d = (_c = _this.props).onExecuteQuery) === null || _d === void 0 ? void 0 : _d.call(_c);
                }, 1);
                return [2 /*return*/];
            });
        });
    };
    QueryEditor.prototype.componentDidUpdate = function (prevProps) {
        var hasToggledEditorMode = prevProps.textEditModeEnabled !== this.props.textEditModeEnabled;
        var hasNewError = prevProps.error !== this.props.error;
        if (this.component) {
            if (hasToggledEditorMode && this.angularScope && this.angularScope.toggleEditorMode) {
                this.angularScope.toggleEditorMode();
            }
            if (hasNewError || hasToggledEditorMode) {
                // Some query controllers listen to data error events and need a digest
                // for some reason this needs to be done in next tick
                setTimeout(this.component.digest);
            }
        }
    };
    QueryEditor.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    QueryEditor.prototype.initTimeSrv = function (range) {
        var timeSrv = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_3__["getTimeSrv"])();
        timeSrv.init({
            time: {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["dateTime"])(range.from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["dateTime"])(range.to),
            },
            refresh: false,
            getTimezone: function () { return 'utc'; },
            timeRangeUpdated: function () { return console.log('refreshDashboard!'); },
        });
    };
    QueryEditor.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-query", ref: function (element) { return (_this.element = element); }, style: { width: '100%' } });
    };
    return QueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryEditor);


/***/ }),

/***/ "./public/app/features/explore/QueryRow.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/explore/QueryRow.tsx ***!
  \**************************************************/
/*! exports provided: QueryRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryRow", function() { return QueryRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/has */ "./node_modules/lodash/has.js");
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _QueryEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./QueryEditor */ "./public/app/features/explore/QueryEditor.tsx");
/* harmony import */ var _QueryRowActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./QueryRowActions */ "./public/app/features/explore/QueryRowActions.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");

// Libraries




// @ts-ignore

// Components


// Actions




// Empty function to override blur execution on query field
var noopOnBlur = function () { };
var QueryRow = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryRow, _super);
    function QueryRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            textEditModeEnabled: false,
        };
        _this.onRunQuery = function () {
            var exploreId = _this.props.exploreId;
            _this.props.runQueries(exploreId);
        };
        _this.onChange = function (query, override) {
            var _a = _this.props, datasourceInstance = _a.datasourceInstance, exploreId = _a.exploreId, index = _a.index;
            _this.props.changeQuery(exploreId, query, index, override);
            if (query && !override && datasourceInstance.getHighlighterExpression && index === 0) {
                // Live preview of log search matches. Only use on first row for now
                _this.updateLogsHighlights(query);
            }
        };
        _this.onClickToggleDisabled = function () {
            var _a = _this.props, exploreId = _a.exploreId, index = _a.index, query = _a.query;
            var newQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { hide: !query.hide });
            _this.props.changeQuery(exploreId, newQuery, index, true);
        };
        _this.onClickRemoveButton = function () {
            var _a = _this.props, exploreId = _a.exploreId, index = _a.index;
            _this.props.removeQueryRowAction({ exploreId: exploreId, index: index });
            _this.props.runQueries(exploreId);
        };
        _this.onClickToggleEditorMode = function () {
            _this.setState({ textEditModeEnabled: !_this.state.textEditModeEnabled });
        };
        _this.updateLogsHighlights = lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()(function (value) {
            var datasourceInstance = _this.props.datasourceInstance;
            if (datasourceInstance.getHighlighterExpression) {
                var exploreId = _this.props.exploreId;
                var expressions = datasourceInstance.getHighlighterExpression(value);
                _this.props.highlightLogsExpressionAction({ exploreId: exploreId, expressions: expressions });
            }
        }, 500);
        return _this;
    }
    QueryRow.prototype.componentWillUnmount = function () {
        console.log('QueryRow will unmount');
    };
    QueryRow.prototype.render = function () {
        var _a, _b, _c;
        var _d = this.props, datasourceInstance = _d.datasourceInstance, history = _d.history, query = _d.query, exploreEvents = _d.exploreEvents, range = _d.range, absoluteRange = _d.absoluteRange, queryResponse = _d.queryResponse, mode = _d.mode, latency = _d.latency;
        var canToggleEditorModes = mode === app_types_explore__WEBPACK_IMPORTED_MODULE_10__["ExploreMode"].Metrics && lodash_has__WEBPACK_IMPORTED_MODULE_3___default()(datasourceInstance, 'components.QueryCtrl.prototype.toggleEditorMode');
        var isNotStarted = queryResponse.state === _grafana_data__WEBPACK_IMPORTED_MODULE_9__["LoadingState"].NotStarted;
        var queryErrors = queryResponse.error && queryResponse.error.refId === query.refId ? [queryResponse.error] : [];
        var QueryField;
        if (mode === app_types_explore__WEBPACK_IMPORTED_MODULE_10__["ExploreMode"].Metrics && ((_a = datasourceInstance.components) === null || _a === void 0 ? void 0 : _a.ExploreMetricsQueryField)) {
            QueryField = datasourceInstance.components.ExploreMetricsQueryField;
        }
        else if (mode === app_types_explore__WEBPACK_IMPORTED_MODULE_10__["ExploreMode"].Logs && ((_b = datasourceInstance.components) === null || _b === void 0 ? void 0 : _b.ExploreLogsQueryField)) {
            QueryField = datasourceInstance.components.ExploreLogsQueryField;
        }
        else {
            QueryField = (_c = datasourceInstance.components) === null || _c === void 0 ? void 0 : _c.ExploreQueryField;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row-field flex-shrink-1" }, QueryField ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(QueryField, { datasource: datasourceInstance, query: query, history: history, onRunQuery: this.onRunQuery, onBlur: noopOnBlur, onChange: this.onChange, data: queryResponse, absoluteRange: absoluteRange })) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryEditor__WEBPACK_IMPORTED_MODULE_6__["default"], { error: queryErrors, datasource: datasourceInstance, onQueryChange: this.onChange, onExecuteQuery: this.onRunQuery, initialQuery: query, exploreEvents: exploreEvents, range: range, textEditModeEnabled: this.state.textEditModeEnabled }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryRowActions__WEBPACK_IMPORTED_MODULE_7__["QueryRowActions"], { canToggleEditorModes: canToggleEditorModes, isDisabled: query.hide, isNotStarted: isNotStarted, latency: latency, onClickToggleEditorMode: this.onClickToggleEditorMode, onClickToggleDisabled: this.onClickToggleDisabled, onClickRemoveButton: this.onClickRemoveButton })));
    };
    return QueryRow;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId, index = _a.index;
    var explore = state.explore;
    var item = explore[exploreId];
    var datasourceInstance = item.datasourceInstance, history = item.history, queries = item.queries, range = item.range, absoluteRange = item.absoluteRange, mode = item.mode, queryResponse = item.queryResponse, latency = item.latency;
    var query = queries[index];
    return {
        datasourceInstance: datasourceInstance,
        history: history,
        query: query,
        range: range,
        absoluteRange: absoluteRange,
        queryResponse: queryResponse,
        mode: mode,
        latency: latency,
    };
}
var mapDispatchToProps = {
    changeQuery: _state_actions__WEBPACK_IMPORTED_MODULE_8__["changeQuery"],
    highlightLogsExpressionAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_11__["highlightLogsExpressionAction"],
    modifyQueries: _state_actions__WEBPACK_IMPORTED_MODULE_8__["modifyQueries"],
    removeQueryRowAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_11__["removeQueryRowAction"],
    runQueries: _state_actions__WEBPACK_IMPORTED_MODULE_8__["runQueries"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(QueryRow)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/QueryRowActions.tsx":
/*!*********************************************************!*\
  !*** ./public/app/features/explore/QueryRowActions.tsx ***!
  \*********************************************************/
/*! exports provided: QueryRowActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryRowActions", function() { return QueryRowActions; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function formatLatency(value) {
    return (value / 1000).toFixed(1) + "s";
}
function QueryRowActions(props) {
    var canToggleEditorModes = props.canToggleEditorModes, onClickToggleEditorMode = props.onClickToggleEditorMode, onClickToggleDisabled = props.onClickToggleDisabled, onClickRemoveButton = props.onClickRemoveButton, isDisabled = props.isDisabled, isNotStarted = props.isNotStarted, latency = props.latency;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-inline flex-shrink-0" },
        canToggleEditorModes && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { "aria-label": "Edit mode button", className: "gf-form-label gf-form-label--btn", onClick: onClickToggleEditorMode },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fa fa-pencil" })))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { disabled: true, className: "gf-form-label", title: "Query row latency" }, formatLatency(latency))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { disabled: isNotStarted, className: "gf-form-label gf-form-label--btn", onClick: onClickToggleDisabled, title: "Disable/enable query" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: isDisabled ? 'fa fa-eye-slash' : 'fa fa-eye' }))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", onClick: onClickRemoveButton, title: "Remove query" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fa fa-minus" })))));
}


/***/ }),

/***/ "./public/app/features/explore/QueryRows.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/explore/QueryRows.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _QueryRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryRow */ "./public/app/features/explore/QueryRow.tsx");

// Libraries

// Components

var QueryRows = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryRows, _super);
    function QueryRows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryRows.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, exploreEvents = _a.exploreEvents, exploreId = _a.exploreId, queryKeys = _a.queryKeys;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className }, queryKeys.map(function (key, index) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryRow__WEBPACK_IMPORTED_MODULE_2__["default"], { key: key, exploreEvents: exploreEvents, exploreId: exploreId, index: index });
        })));
    };
    return QueryRows;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryRows);


/***/ }),

/***/ "./public/app/features/explore/ResponsiveButton.tsx":
/*!**********************************************************!*\
  !*** ./public/app/features/explore/ResponsiveButton.tsx ***!
  \**********************************************************/
/*! exports provided: IconSide, ResponsiveButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconSide", function() { return IconSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponsiveButton", function() { return ResponsiveButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var IconSide;
(function (IconSide) {
    IconSide["left"] = "left";
    IconSide["right"] = "right";
})(IconSide || (IconSide = {}));
function formatBtnTitle(title, iconSide) {
    return iconSide === IconSide.left ? '\xA0' + title : iconSide === IconSide.right ? title + '\xA0' : title;
}
var ResponsiveButton = Object(react__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function (props, ref) {
    var defaultProps = {
        iconSide: IconSide.left,
    };
    props = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultProps), props);
    var title = props.title, onClick = props.onClick, buttonClassName = props.buttonClassName, iconClassName = props.iconClassName, splitted = props.splitted, iconSide = props.iconSide, disabled = props.disabled, divElementProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(props, ["title", "onClick", "buttonClassName", "iconClassName", "splitted", "iconSide", "disabled"]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ ref: ref }, divElementProps),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button " + (buttonClassName ? buttonClassName : ''), onClick: onClick, disabled: disabled || false },
            iconClassName && iconSide === IconSide.left ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "" + iconClassName }) : null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "btn-title" }, !splitted ? formatBtnTitle(title, iconSide) : ''),
            iconClassName && iconSide === IconSide.right ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "" + iconClassName }) : null)));
});


/***/ }),

/***/ "./public/app/features/explore/RunButton.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/explore/RunButton.tsx ***!
  \***************************************************/
/*! exports provided: RunButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RunButton", function() { return RunButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ResponsiveButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ResponsiveButton */ "./public/app/features/explore/ResponsiveButton.tsx");







var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_3__["default"])(function () {
    return {
        selectButtonOverride: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: selectButtonOverride;\n      .select-button-value {\n        color: white !important;\n      }\n    "], ["\n      label: selectButtonOverride;\n      .select-button-value {\n        color: white !important;\n      }\n    "]))),
    };
});
function RunButton(props) {
    var splitted = props.splitted, loading = props.loading, onRun = props.onRun, onChangeRefreshInterval = props.onChangeRefreshInterval, refreshInterval = props.refreshInterval, showDropdown = props.showDropdown;
    var styles = getStyles();
    var runButton = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ResponsiveButton__WEBPACK_IMPORTED_MODULE_6__["ResponsiveButton"], { splitted: splitted, title: "Run Query", onClick: onRun, buttonClassName: classnames__WEBPACK_IMPORTED_MODULE_5___default()('navbar-button--secondary', { 'btn--radius-right-0': showDropdown }), iconClassName: loading ? 'fa fa-spinner fa-fw fa-spin run-icon' : 'fa fa-refresh fa-fw' }));
    if (showDropdown) {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["RefreshPicker"], { onIntervalChanged: onChangeRefreshInterval, value: refreshInterval, buttonSelectClassName: "navbar-button--secondary " + styles.selectButtonOverride, refreshButton: runButton }));
    }
    return runButton;
}
var templateObject_1;


/***/ }),

/***/ "./public/app/features/explore/TableContainer.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/TableContainer.tsx ***!
  \********************************************************/
/*! exports provided: TableContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableContainer", function() { return TableContainer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/constants */ "./public/app/core/constants.ts");








var TableContainer = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TableContainer, _super);
    function TableContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickTableButton = function () {
            _this.props.toggleTable(_this.props.exploreId, _this.props.showingTable);
        };
        return _this;
    }
    TableContainer.prototype.getTableHeight = function () {
        var tableResult = this.props.tableResult;
        if (!tableResult || tableResult.length === 0) {
            return 200;
        }
        // tries to estimate table height
        return Math.max(Math.min(600, tableResult.length * 35) + 35);
    };
    TableContainer.prototype.render = function () {
        var _a = this.props, loading = _a.loading, onClickCell = _a.onClickCell, showingTable = _a.showingTable, tableResult = _a.tableResult, width = _a.width;
        var height = this.getTableHeight();
        var tableWidth = width - app_core_config__WEBPACK_IMPORTED_MODULE_6__["config"].theme.panelPadding * 2 - app_core_constants__WEBPACK_IMPORTED_MODULE_7__["PANEL_BORDER"];
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { label: "Table", loading: loading, collapsible: true, isOpen: showingTable, onToggle: this.onClickTableButton }, tableResult && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Table"], { data: tableResult, width: tableWidth, height: height, onCellClick: onClickCell })));
    };
    return TableContainer;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    // @ts-ignore
    var item = explore[exploreId];
    var loadingInState = item.loading, showingTable = item.showingTable, tableResult = item.tableResult;
    var loading = tableResult && tableResult.length > 0 ? false : loadingInState;
    return { loading: loading, showingTable: showingTable, tableResult: tableResult };
}
var mapDispatchToProps = {
    toggleTable: _state_actions__WEBPACK_IMPORTED_MODULE_5__["toggleTable"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(TableContainer)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/TimeSyncButton.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/TimeSyncButton.tsx ***!
  \********************************************************/
/*! exports provided: TimeSyncButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeSyncButton", function() { return TimeSyncButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");





var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["stylesFactory"])(function (theme) {
    return {
        timePickerSynced: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: timePickerSynced;\n      border-color: ", ";\n      background-image: none;\n      background-color: transparent;\n      color: ", ";\n      &:focus,\n      :hover {\n        color: ", ";\n        background-image: none;\n        background-color: transparent;\n      }\n    "], ["\n      label: timePickerSynced;\n      border-color: ", ";\n      background-image: none;\n      background-color: transparent;\n      color: ", ";\n      &:focus,\n      :hover {\n        color: ", ";\n        background-image: none;\n        background-color: transparent;\n      }\n    "])), theme.colors.orangeDark, theme.colors.orangeDark, theme.colors.orangeDark),
        noRightBorderStyle: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: noRightBorderStyle;\n      border-right: 0;\n    "], ["\n      label: noRightBorderStyle;\n      border-right: 0;\n    "]))),
        /*
         * Required top-padding, otherwise is fa-link icon in active state
         * cut off on top due to fontAwesome icon position
         */
        topPadding: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: topPadding;\n      padding-top: 1px;\n    "], ["\n      label: topPadding;\n      padding-top: 1px;\n    "]))),
    };
});
function TimeSyncButton(props) {
    var _a;
    var onClick = props.onClick, isSynced = props.isSynced;
    var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["useTheme"])();
    var styles = getStyles(theme);
    var syncTimesTooltip = function () {
        var isSynced = props.isSynced;
        var tooltip = isSynced ? 'Unsync all views' : 'Sync all views to this time range';
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, tooltip);
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { content: syncTimesTooltip, placement: "bottom" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('btn navbar-button navbar-button--attached', (_a = {},
                _a["explore-active-button-glow " + styles.timePickerSynced] = isSynced,
                _a)), "aria-label": isSynced ? 'Synced times' : 'Unsynced times', onClick: function () { return onClick(); } },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('fa fa-link', styles.topPadding, isSynced && 'icon-brand-gradient') }))));
}
var templateObject_1, templateObject_2, templateObject_3;


/***/ }),

/***/ "./public/app/features/explore/Wrapper.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/explore/Wrapper.tsx ***!
  \*************************************************/
/*! exports provided: Wrapper, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wrapper", function() { return Wrapper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _Explore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Explore */ "./public/app/features/explore/Explore.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");








var Wrapper = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.componentWillUnmount = function () {
        this.props.resetExploreAction({});
    };
    Wrapper.prototype.render = function () {
        var split = this.props.split;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-scrollbar-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["CustomScrollbar"], { autoHeightMin: '100%', autoHeightMax: '', className: "custom-scrollbar--page" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-wrapper" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["ErrorBoundaryAlert"], { style: "page" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Explore__WEBPACK_IMPORTED_MODULE_5__["default"], { exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_4__["ExploreId"].left })),
                    split && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["ErrorBoundaryAlert"], { style: "page" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Explore__WEBPACK_IMPORTED_MODULE_5__["default"], { exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_4__["ExploreId"].right })))))));
    };
    return Wrapper;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var mapStateToProps = function (state) {
    var split = state.explore.split;
    return { split: split };
};
var mapDispatchToProps = {
    resetExploreAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_7__["resetExploreAction"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Wrapper)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/useLiveTailControls.ts":
/*!************************************************************!*\
  !*** ./public/app/features/explore/useLiveTailControls.ts ***!
  \************************************************************/
/*! exports provided: useLiveTailControls, LiveTailControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLiveTailControls", function() { return useLiveTailControls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveTailControls", function() { return LiveTailControls; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");





/**
 * Hook that gives you all the functions needed to control the live tailing.
 */
function useLiveTailControls(exploreId) {
    var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
    var pause = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
        dispatch(Object(_state_actionTypes__WEBPACK_IMPORTED_MODULE_3__["setPausedStateAction"])({ exploreId: exploreId, isPaused: true }));
    }, [exploreId, dispatch]);
    var resume = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
        dispatch(Object(_state_actionTypes__WEBPACK_IMPORTED_MODULE_3__["setPausedStateAction"])({ exploreId: exploreId, isPaused: false }));
    }, [exploreId, dispatch]);
    var stop = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
        // We need to pause here first because there is transition where we are not live but live logs are still shown
        // to cross fade with the normal view. This will prevent reordering of the logs in the live view during the
        // transition.
        pause();
        // TODO referencing this from perspective of refresh picker when there is designated button for it now is not
        //  great. Needs a bit of refactoring.
        dispatch(Object(_state_actions__WEBPACK_IMPORTED_MODULE_2__["changeRefreshInterval"])(exploreId, _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["RefreshPicker"].offOption.value));
        dispatch(Object(_state_actions__WEBPACK_IMPORTED_MODULE_2__["runQueries"])(exploreId));
    }, [exploreId, dispatch, pause]);
    var start = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(function () {
        dispatch(Object(_state_actions__WEBPACK_IMPORTED_MODULE_2__["changeRefreshInterval"])(exploreId, _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["RefreshPicker"].liveOption.value));
    }, [exploreId, dispatch]);
    return {
        pause: pause,
        resume: resume,
        stop: stop,
        start: start,
    };
}
/**
 * If you can't use the hook you can use this as a render prop pattern.
 */
function LiveTailControls(props) {
    var controls = useLiveTailControls(props.exploreId);
    return props.children(controls);
}


/***/ }),

/***/ "./public/app/features/explore/utils/LogsCrossFadeTransition.tsx":
/*!***********************************************************************!*\
  !*** ./public/app/features/explore/utils/LogsCrossFadeTransition.tsx ***!
  \***********************************************************************/
/*! exports provided: LogsCrossFadeTransition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsCrossFadeTransition", function() { return LogsCrossFadeTransition; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_4__);





var transitionDuration = 500;
// We add a bit of delay to the transition as another perf optimisation. As at the start we need to render
// quite a bit of new rows, if we start transition at the same time there can be frame rate drop. This gives time
// for react to first render them and then do the animation.
var transitionDelay = 100;
var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_2__["default"])(function () {
    return {
        logsEnter: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: logsEnter;\n      position: absolute;\n      opacity: 0;\n      height: auto;\n      width: 100%;\n    "], ["\n      label: logsEnter;\n      position: absolute;\n      opacity: 0;\n      height: auto;\n      width: 100%;\n    "]))),
        logsEnterActive: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: logsEnterActive;\n      opacity: 1;\n      transition: opacity ", "ms ease-out ", "ms;\n    "], ["\n      label: logsEnterActive;\n      opacity: 1;\n      transition: opacity ", "ms ease-out ", "ms;\n    "])), transitionDuration, transitionDelay),
        logsExit: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: logsExit;\n      position: absolute;\n      opacity: 1;\n      height: auto;\n      width: 100%;\n    "], ["\n      label: logsExit;\n      position: absolute;\n      opacity: 1;\n      height: auto;\n      width: 100%;\n    "]))),
        logsExitActive: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      label: logsExitActive;\n      opacity: 0;\n      transition: opacity ", "ms ease-out ", "ms;\n    "], ["\n      label: logsExitActive;\n      opacity: 0;\n      transition: opacity ", "ms ease-out ", "ms;\n    "])), transitionDuration, transitionDelay),
    };
});
/**
 * Cross fade transition component that is tied a bit too much to the logs containers so not very useful elsewhere
 * right now.
 */
function LogsCrossFadeTransition(props) {
    var visible = props.visible, children = props.children;
    var styles = getStyles();
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_4__["CSSTransition"], { in: visible, mountOnEnter: true, unmountOnExit: true, timeout: transitionDuration + transitionDelay, classNames: {
            enter: styles.logsEnter,
            enterActive: styles.logsEnterActive,
            exit: styles.logsExit,
            exitActive: styles.logsExitActive,
        } }, children));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;


/***/ })

}]);
//# sourceMappingURL=explore.6310f9af5345c722b930.js.map