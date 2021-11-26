(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DataSourceDashboards"],{

/***/ "./public/app/features/datasources/DashboardsTable.tsx":
/*!*************************************************************!*\
  !*** ./public/app/features/datasources/DashboardsTable.tsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var DashboardsTable = function (_a) {
    var dashboards = _a.dashboards, onImport = _a.onImport, onRemove = _a.onRemove;
    function buttonText(dashboard) {
        return dashboard.revision !== dashboard.importedRevision ? 'Update' : 'Re-import';
    }
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", { className: "filter-table" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, dashboards.map(function (dashboard, index) {
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: dashboard.dashboardId + "-" + index },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "width-1" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "gicon gicon-dashboard" })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, dashboard.imported ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { href: dashboard.importedUrl }, dashboard.title)) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, dashboard.title))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { style: { textAlign: 'right' } },
                    !dashboard.imported ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { className: "btn btn-secondary btn-small", onClick: function () { return onImport(dashboard, false); } }, "Import")) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { className: "btn btn-secondary btn-small", onClick: function () { return onImport(dashboard, true); } }, buttonText(dashboard))),
                    dashboard.imported && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { className: "btn btn-danger btn-small", onClick: function () { return onRemove(dashboard); } },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fa fa-trash" }))))));
        }))));
};
/* harmony default export */ __webpack_exports__["default"] = (DashboardsTable);


/***/ }),

/***/ "./public/app/features/datasources/DataSourceDashboards.tsx":
/*!******************************************************************!*\
  !*** ./public/app/features/datasources/DataSourceDashboards.tsx ***!
  \******************************************************************/
/*! exports provided: DataSourceDashboards, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceDashboards", function() { return DataSourceDashboards; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _DashboardsTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DashboardsTable */ "./public/app/features/datasources/DashboardsTable.tsx");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_selectors_location__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/datasources/state/actions.ts");
/* harmony import */ var _plugins_state_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../plugins/state/actions */ "./public/app/features/plugins/state/actions.ts");
/* harmony import */ var _dashboard_state_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../dashboard/state/actions */ "./public/app/features/dashboard/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/datasources/state/selectors.ts");

// Libraries



// Components


// Actions & Selectors






var DataSourceDashboards = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataSourceDashboards, _super);
    function DataSourceDashboards() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onImport = function (dashboard, overwrite) {
            var _a = _this.props, dataSource = _a.dataSource, importDashboard = _a.importDashboard;
            var data = {
                pluginId: dashboard.pluginId,
                path: dashboard.path,
                overwrite: overwrite,
                inputs: [],
            };
            if (dataSource) {
                data.inputs.push({
                    name: '*',
                    type: 'datasource',
                    pluginId: dataSource.type,
                    value: dataSource.name,
                });
            }
            importDashboard(data, dashboard.title);
        };
        _this.onRemove = function (dashboard) {
            _this.props.removeDashboard(dashboard.importedUri);
        };
        return _this;
    }
    DataSourceDashboards.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, loadDataSource, pageId;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, loadDataSource = _a.loadDataSource, pageId = _a.pageId;
                        return [4 /*yield*/, loadDataSource(pageId)];
                    case 1:
                        _b.sent();
                        this.props.loadPluginDashboards();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataSourceDashboards.prototype.render = function () {
        var _this = this;
        var _a = this.props, dashboards = _a.dashboards, navModel = _a.navModel, isLoading = _a.isLoading;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: isLoading },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DashboardsTable__WEBPACK_IMPORTED_MODULE_5__["default"], { dashboards: dashboards, onImport: function (dashboard, overwrite) { return _this.onImport(dashboard, overwrite); }, onRemove: function (dashboard) { return _this.onRemove(dashboard); } }))));
    };
    return DataSourceDashboards;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    var pageId = Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_7__["getRouteParamsId"])(state.location);
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_6__["getNavModel"])(state.navIndex, "datasource-dashboards-" + pageId),
        pageId: pageId,
        dashboards: state.plugins.dashboards,
        dataSource: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_11__["getDataSource"])(state.dataSources, pageId),
        isLoading: state.plugins.isLoadingPluginDashboards,
    };
}
var mapDispatchToProps = {
    importDashboard: _dashboard_state_actions__WEBPACK_IMPORTED_MODULE_10__["importDashboard"],
    loadDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_8__["loadDataSource"],
    loadPluginDashboards: _plugins_state_actions__WEBPACK_IMPORTED_MODULE_9__["loadPluginDashboards"],
    removeDashboard: _dashboard_state_actions__WEBPACK_IMPORTED_MODULE_10__["removeDashboard"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(DataSourceDashboards)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=DataSourceDashboards.6310f9af5345c722b930.js.map