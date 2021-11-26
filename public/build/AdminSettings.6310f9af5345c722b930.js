(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AdminSettings"],{

/***/ "./public/app/features/admin/AdminSettings.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/admin/AdminSettings.tsx ***!
  \*****************************************************/
/*! exports provided: AdminSettings, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminSettings", function() { return AdminSettings; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");







var backendSrv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getBackendSrv"])();
var AdminSettings = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AdminSettings, _super);
    function AdminSettings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            settings: {},
            isLoading: true,
        };
        return _this;
    }
    AdminSettings.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var settings;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, backendSrv.get('/api/admin/settings')];
                    case 1:
                        settings = _a.sent();
                        this.setState({
                            settings: settings,
                            isLoading: false,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminSettings.prototype.render = function () {
        var _a = this.state, settings = _a.settings, isLoading = _a.isLoading;
        var navModel = this.props.navModel;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"].Contents, { isLoading: isLoading },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "grafana-info-box span8", style: { margin: '20px 0 25px 0' } }, "These system settings are defined in grafana.ini or custom.ini (or overridden in ENV variables). To change these you currently need to restart grafana."),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: "filter-table" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, Object.entries(settings).map(function (_a, i) {
                        var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), sectionName = _b[0], sectionSettings = _b[1];
                        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, { key: "section-" + i },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "admin-settings-section" }, sectionName),
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null)),
                            Object.entries(sectionSettings).map(function (_a, j) {
                                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), settingName = _b[0], settingValue = _b[1];
                                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: "property-" + j },
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { style: { paddingLeft: '25px' } }, settingName),
                                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, settingValue)));
                            })));
                    }))))));
    };
    return AdminSettings;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));

var mapStateToProps = function (state) { return ({
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_5__["getNavModel"])(state.navIndex, 'server-settings'),
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(AdminSettings)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=AdminSettings.6310f9af5345c722b930.js.map