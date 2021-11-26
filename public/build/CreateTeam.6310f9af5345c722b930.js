(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["CreateTeam"],{

/***/ "./public/app/features/teams/CreateTeam.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/teams/CreateTeam.tsx ***!
  \**************************************************/
/*! exports provided: CreateTeam, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateTeam", function() { return CreateTeam; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _core_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");









var CreateTeam = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(CreateTeam, _super);
    function CreateTeam() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            name: '',
            email: '',
        };
        _this.create = function (event) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var _a, name, email, result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        event.preventDefault();
                        _a = this.state, name = _a.name, email = _a.email;
                        return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["getBackendSrv"])().post('/api/teams', { name: name, email: email })];
                    case 1:
                        result = _b.sent();
                        if (result.teamId) {
                            this.props.updateLocation({ path: "/org/teams/edit/" + result.teamId });
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onEmailChange = function (event) {
            _this.setState({
                email: event.target.value,
            });
        };
        _this.onNameChange = function (event) {
            _this.setState({
                name: event.target.value,
            });
        };
        return _this;
    }
    CreateTeam.prototype.render = function () {
        var navModel = this.props.navModel;
        var _a = this.state, name = _a.name, email = _a.email;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_2__["default"].Contents, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-sub-heading" }, "New Team"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", { className: "gf-form-group", onSubmit: this.create },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["FormField"], { className: "gf-form", label: "Name", value: name, onChange: this.onNameChange, inputWidth: 30, labelWidth: 10, required: true }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["FormField"], { type: "email", className: "gf-form", label: "Email", value: email, onChange: this.onEmailChange, inputWidth: 30, labelWidth: 10, placeholder: "email@test.com", tooltip: "This is optional and is primarily used for allowing custom team avatars." }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-button-row" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Button"], { type: "submit", variant: "primary" }, "Create")))))));
    };
    return CreateTeam;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__["getNavModel"])(state.navIndex, 'teams'),
    };
}
var mapDispatchToProps = {
    updateLocation: _core_actions__WEBPACK_IMPORTED_MODULE_6__["updateLocation"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(CreateTeam)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=CreateTeam.6310f9af5345c722b930.js.map