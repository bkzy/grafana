(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["AppRootPage"],{

/***/ "./public/app/features/plugins/AppRootPage.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/plugins/AppRootPage.tsx ***!
  \*****************************************************/
/*! exports provided: getAppPluginPageError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAppPluginPageError", function() { return getAppPluginPageError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _PluginSettingsCache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PluginSettingsCache */ "./public/app/features/plugins/PluginSettingsCache.ts");
/* harmony import */ var _plugin_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _PluginPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PluginPage */ "./public/app/features/plugins/PluginPage.tsx");
/* harmony import */ var app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/nav_model_srv */ "./public/app/core/nav_model_srv.ts");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");

// Libraries










function getAppPluginPageError(meta) {
    if (!meta) {
        return 'Unknown Plugin';
    }
    if (meta.type !== _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginType"].app) {
        return 'Plugin must be an app';
    }
    if (!meta.enabled) {
        return 'Application Not Enabled';
    }
    return null;
}
var AppRootPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AppRootPage, _super);
    function AppRootPage(props) {
        var _this = _super.call(this, props) || this;
        _this.onNavChanged = function (nav) {
            _this.setState({ nav: nav });
        };
        _this.state = {
            loading: true,
            nav: Object(_PluginPage__WEBPACK_IMPORTED_MODULE_8__["getLoadingNav"])(),
        };
        return _this;
    }
    AppRootPage.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var pluginId, app, err_1;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pluginId = this.props.pluginId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Object(_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_5__["getPluginSettings"])(pluginId).then(function (info) {
                                var error = getAppPluginPageError(info);
                                if (error) {
                                    app_core_core__WEBPACK_IMPORTED_MODULE_10__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_7__["AppEvents"].alertError, [error]);
                                    _this.setState({ nav: Object(app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_9__["getWarningNav"])(error) });
                                    return null;
                                }
                                return Object(_plugin_loader__WEBPACK_IMPORTED_MODULE_6__["importAppPlugin"])(info);
                            })];
                    case 2:
                        app = _a.sent();
                        this.setState({ plugin: app, loading: false });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.setState({ plugin: null, loading: false, nav: Object(app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_9__["getNotFoundNav"])() });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppRootPage.prototype.render = function () {
        var _a = this.props, path = _a.path, query = _a.query;
        var _b = this.state, loading = _b.loading, plugin = _b.plugin, nav = _b.nav;
        if (plugin && !plugin.root) {
            // TODO? redirect to plugin page?
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "No Root App");
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: nav },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: loading }, !loading && plugin && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(plugin.root, { meta: plugin.meta, query: query, path: path, onNavChanged: this.onNavChanged })))));
    };
    return AppRootPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));
var mapStateToProps = function (state) { return ({
    pluginId: state.location.routeParams.pluginId,
    slug: state.location.routeParams.slug,
    query: state.location.query,
    path: state.location.path,
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps)(AppRootPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=AppRootPage.6310f9af5345c722b930.js.map