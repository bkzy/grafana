(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["SoloPanelPage"],{

/***/ "./public/app/features/dashboard/containers/SoloPanelPage.tsx":
/*!********************************************************************!*\
  !*** ./public/app/features/dashboard/containers/SoloPanelPage.tsx ***!
  \********************************************************************/
/*! exports provided: SoloPanelPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoloPanelPage", function() { return SoloPanelPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _dashgrid_DashboardPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dashgrid/DashboardPanel */ "./public/app/features/dashboard/dashgrid/DashboardPanel.tsx");
/* harmony import */ var _state_initDashboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../state/initDashboard */ "./public/app/features/dashboard/state/initDashboard.ts");

// Libraries



// Components

// Redux

var SoloPanelPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(SoloPanelPage, _super);
    function SoloPanelPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            panel: null,
            notFound: false,
        };
        return _this;
    }
    SoloPanelPage.prototype.componentDidMount = function () {
        var _a = this.props, $injector = _a.$injector, $scope = _a.$scope, urlUid = _a.urlUid, urlType = _a.urlType, urlSlug = _a.urlSlug, routeInfo = _a.routeInfo;
        this.props.initDashboard({
            $injector: $injector,
            $scope: $scope,
            urlSlug: urlSlug,
            urlUid: urlUid,
            urlType: urlType,
            routeInfo: routeInfo,
            fixUrl: false,
        });
    };
    SoloPanelPage.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, urlPanelId = _a.urlPanelId, dashboard = _a.dashboard;
        if (!dashboard) {
            return;
        }
        // we just got the dashboard!
        if (!prevProps.dashboard) {
            var panelId = parseInt(urlPanelId, 10);
            // need to expand parent row if this panel is inside a row
            dashboard.expandParentRowFor(panelId);
            var panel = dashboard.getPanelById(panelId);
            if (!panel) {
                this.setState({ notFound: true });
                return;
            }
            this.setState({ panel: panel });
        }
    };
    SoloPanelPage.prototype.render = function () {
        var _a = this.props, urlPanelId = _a.urlPanelId, dashboard = _a.dashboard;
        var _b = this.state, notFound = _b.notFound, panel = _b.panel;
        if (notFound) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert alert-error" },
                "Panel with id ",
                urlPanelId,
                " not found");
        }
        if (!panel) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "Loading & initializing dashboard");
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-solo" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_dashgrid_DashboardPanel__WEBPACK_IMPORTED_MODULE_4__["DashboardPanel"], { dashboard: dashboard, panel: panel, isEditing: false, isFullscreen: false, isInView: true })));
    };
    return SoloPanelPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var mapStateToProps = function (state) { return ({
    urlUid: state.location.routeParams.uid,
    urlSlug: state.location.routeParams.slug,
    urlType: state.location.routeParams.type,
    urlPanelId: state.location.query.panelId,
    dashboard: state.dashboard.model,
}); };
var mapDispatchToProps = {
    initDashboard: _state_initDashboard__WEBPACK_IMPORTED_MODULE_5__["initDashboard"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(SoloPanelPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=SoloPanelPage.6310f9af5345c722b930.js.map