(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AlertRuleList"],{

/***/ "./public/app/core/components/FilterInput/FilterInput.tsx":
/*!****************************************************************!*\
  !*** ./public/app/core/components/FilterInput/FilterInput.tsx ***!
  \****************************************************************/
/*! exports provided: FilterInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterInput", function() { return FilterInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");


var FilterInput = Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function (props, ref) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: props.labelClassName },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { ref: ref, type: "text", className: props.inputClassName, value: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["unEscapeStringFromRegex"])(props.value), onChange: function (event) { return props.onChange(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["escapeStringForRegex"])(event.target.value)); }, placeholder: props.placeholder ? props.placeholder : null }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "gf-form-input-icon fa fa-search" }))); });


/***/ }),

/***/ "./public/app/features/alerting/AlertRuleItem.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/alerting/AlertRuleItem.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-highlight-words */ "./node_modules/react-highlight-words/dist/main.js");
/* harmony import */ var react_highlight_words__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_highlight_words__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);


// @ts-ignore


var AlertRuleItem = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AlertRuleItem, _super);
    function AlertRuleItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertRuleItem.prototype.renderText = function (text) {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_highlight_words__WEBPACK_IMPORTED_MODULE_2___default.a, { highlightClassName: "highlight-search-match", textToHighlight: text, searchWords: [this.props.search] }));
    };
    AlertRuleItem.prototype.render = function () {
        var _a = this.props, rule = _a.rule, onTogglePause = _a.onTogglePause;
        var iconClassName = classnames__WEBPACK_IMPORTED_MODULE_3___default()({
            fa: true,
            'fa-play': rule.state === 'paused',
            'fa-pause': rule.state !== 'paused',
        });
        var ruleUrl = rule.url + "?panelId=" + rule.panelId + "&fullscreen&edit&tab=alert";
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "alert-rule-item" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "alert-rule-item__icon " + rule.stateClass },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: rule.stateIcon })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__body" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__header" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__name" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: ruleUrl }, this.renderText(rule.name))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__text" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "" + rule.stateClass }, this.renderText(rule.stateText)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "alert-rule-item__time" },
                            " for ",
                            rule.stateAge))),
                rule.info && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "small muted alert-rule-item__info" }, this.renderText(rule.info))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__actions" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-small btn-inverse alert-list__btn width-2", title: "Pausing an alert rule prevents it from executing", onClick: onTogglePause },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: iconClassName })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-small btn-inverse alert-list__btn width-2", href: ruleUrl, title: "Edit alert rule" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "gicon gicon-cog" })))));
    };
    return AlertRuleItem;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (AlertRuleItem);


/***/ }),

/***/ "./public/app/features/alerting/AlertRuleList.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/alerting/AlertRuleList.tsx ***!
  \********************************************************/
/*! exports provided: AlertRuleList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertRuleList", function() { return AlertRuleList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _AlertRuleItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AlertRuleItem */ "./public/app/features/alerting/AlertRuleItem.tsx");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/alerting/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/alerting/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/alerting/state/reducers.ts");














var AlertRuleList = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AlertRuleList, _super);
    function AlertRuleList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stateFilters = [
            { text: 'All', value: 'all' },
            { text: 'OK', value: 'ok' },
            { text: 'Not OK', value: 'not_ok' },
            { text: 'Alerting', value: 'alerting' },
            { text: 'No Data', value: 'no_data' },
            { text: 'Paused', value: 'paused' },
            { text: 'Pending', value: 'pending' },
        ];
        _this.onStateFilterChanged = function (evt) {
            _this.props.updateLocation({
                query: { state: evt.target.value },
            });
        };
        _this.onOpenHowTo = function () {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_6__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_9__["CoreEvents"].showModal, {
                src: 'public/app/features/alerting/partials/alert_howto.html',
                modalClass: 'confirm-modal',
                model: {},
            });
        };
        _this.onSearchQueryChange = function (value) {
            _this.props.setSearchQuery(value);
        };
        _this.onTogglePause = function (rule) {
            _this.props.togglePauseAlertRule(rule.id, { paused: rule.state !== 'paused' });
        };
        _this.alertStateFilterOption = function (_a) {
            var text = _a.text, value = _a.value;
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", { key: value, value: value }, text));
        };
        return _this;
    }
    AlertRuleList.prototype.componentDidMount = function () {
        this.fetchRules();
    };
    AlertRuleList.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.stateFilter !== this.props.stateFilter) {
            this.fetchRules();
        }
    };
    AlertRuleList.prototype.fetchRules = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.getAlertRulesAsync({ state: this.getStateFilter() })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlertRuleList.prototype.getStateFilter = function () {
        var stateFilter = this.props.stateFilter;
        if (stateFilter) {
            return stateFilter.toString();
        }
        return 'all';
    };
    AlertRuleList.prototype.render = function () {
        var _this = this;
        var _a = this.props, navModel = _a.navModel, alertRules = _a.alertRules, search = _a.search, isLoading = _a.isLoading;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: isLoading },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_12__["FilterInput"], { labelClassName: "gf-form--has-input-icon gf-form--grow", inputClassName: "gf-form-input", placeholder: "Search alerts", value: search, onChange: this.onSearchQueryChange })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "gf-form-label" }, "States"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-select-wrapper width-13" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", { className: "gf-form-input", onChange: this.onStateFilterChanged, value: this.getStateFilter() }, this.stateFilters.map(this.alertStateFilterOption)))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-secondary", onClick: this.onOpenHowTo }, "How to add an alert")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ol", { className: "alert-rule-list" }, alertRules.map(function (rule) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AlertRuleItem__WEBPACK_IMPORTED_MODULE_5__["default"], { rule: rule, key: rule.id, search: search, onTogglePause: function () { return _this.onTogglePause(rule); } })); }))))));
    };
    return AlertRuleList;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var mapStateToProps = function (state) { return ({
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__["getNavModel"])(state.navIndex, 'alert-list'),
    alertRules: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_11__["getAlertRuleItems"])(state.alertRules),
    stateFilter: state.location.query.state,
    search: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_11__["getSearchQuery"])(state.alertRules),
    isLoading: state.alertRules.isLoading,
}); };
var mapDispatchToProps = {
    updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_7__["updateLocation"],
    getAlertRulesAsync: _state_actions__WEBPACK_IMPORTED_MODULE_10__["getAlertRulesAsync"],
    setSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_13__["setSearchQuery"],
    togglePauseAlertRule: _state_actions__WEBPACK_IMPORTED_MODULE_10__["togglePauseAlertRule"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(AlertRuleList)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/alerting/state/actions.ts":
/*!*******************************************************!*\
  !*** ./public/app/features/alerting/state/actions.ts ***!
  \*******************************************************/
/*! exports provided: getAlertRulesAsync, togglePauseAlertRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAlertRulesAsync", function() { return getAlertRulesAsync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "togglePauseAlertRule", function() { return togglePauseAlertRule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers */ "./public/app/features/alerting/state/reducers.ts");



function getAlertRulesAsync(options) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var rules;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_2__["loadAlertRules"])());
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/alerts', options)];
                case 1:
                    rules = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_2__["loadedAlertRules"])(rules));
                    return [2 /*return*/];
            }
        });
    }); };
}
function togglePauseAlertRule(id, options) {
    var _this = this;
    return function (dispatch, getState) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var stateFilter;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post("/api/alerts/" + id + "/pause", options)];
                case 1:
                    _a.sent();
                    stateFilter = getState().location.query.state || 'all';
                    dispatch(getAlertRulesAsync({ state: stateFilter.toString() }));
                    return [2 /*return*/];
            }
        });
    }); };
}


/***/ }),

/***/ "./public/app/features/alerting/state/selectors.ts":
/*!*********************************************************!*\
  !*** ./public/app/features/alerting/state/selectors.ts ***!
  \*********************************************************/
/*! exports provided: getSearchQuery, getAlertRuleItems */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchQuery", function() { return getSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAlertRuleItems", function() { return getAlertRuleItems; });
var getSearchQuery = function (state) { return state.searchQuery; };
var getAlertRuleItems = function (state) {
    var regex = new RegExp(state.searchQuery, 'i');
    return state.items.filter(function (item) {
        return regex.test(item.name) || regex.test(item.stateText) || regex.test(item.info);
    });
};


/***/ })

}]);
//# sourceMappingURL=AlertRuleList.6310f9af5345c722b930.js.map