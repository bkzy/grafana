(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./public/app/core/components/PasswordInput/PasswordInput.tsx":
/*!********************************************************************!*\
  !*** ./public/app/core/components/PasswordInput/PasswordInput.tsx ***!
  \********************************************************************/
/*! exports provided: PasswordInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordInput", function() { return PasswordInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var PasswordInput = Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function (props, ref) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["FormLabel"], { className: "width-8" }, props.label),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], { className: "gf-form-input max-width-22", type: "password", onChange: function (event) { return props.onChange(event.target.value); }, value: props.value }))); });


/***/ }),

/***/ "./public/app/features/profile/ChangePasswordForm.tsx":
/*!************************************************************!*\
  !*** ./public/app/features/profile/ChangePasswordForm.tsx ***!
  \************************************************************/
/*! exports provided: ChangePasswordForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordForm", function() { return ChangePasswordForm; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_PasswordInput_PasswordInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/PasswordInput/PasswordInput */ "./public/app/core/components/PasswordInput/PasswordInput.tsx");





var ChangePasswordForm = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ChangePasswordForm, _super);
    function ChangePasswordForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNew: '',
        };
        _this.onOldPasswordChange = function (oldPassword) {
            _this.setState({ oldPassword: oldPassword });
        };
        _this.onNewPasswordChange = function (newPassword) {
            _this.setState({ newPassword: newPassword });
        };
        _this.onConfirmPasswordChange = function (confirmNew) {
            _this.setState({ confirmNew: confirmNew });
        };
        _this.onSubmitChangePassword = function (event) {
            event.preventDefault();
            _this.props.onChangePassword(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.state));
        };
        return _this;
    }
    ChangePasswordForm.prototype.render = function () {
        var _a = this.state, oldPassword = _a.oldPassword, newPassword = _a.newPassword, confirmNew = _a.confirmNew;
        var isSaving = this.props.isSaving;
        var ldapEnabled = app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].ldapEnabled, authProxyEnabled = app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].authProxyEnabled;
        if (ldapEnabled || authProxyEnabled) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "You cannot change password when ldap or auth proxy authentication is enabled.");
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", { name: "userForm", className: "gf-form-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PasswordInput_PasswordInput__WEBPACK_IMPORTED_MODULE_4__["PasswordInput"], { label: "Old Password", onChange: this.onOldPasswordChange, value: oldPassword })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PasswordInput_PasswordInput__WEBPACK_IMPORTED_MODULE_4__["PasswordInput"], { label: "New Password", onChange: this.onNewPasswordChange, value: newPassword })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PasswordInput_PasswordInput__WEBPACK_IMPORTED_MODULE_4__["PasswordInput"], { label: "Confirm Password", onChange: this.onConfirmPasswordChange, value: confirmNew })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-button-row" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: "primary", onClick: this.onSubmitChangePassword, disabled: isSaving }, "Change Password"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LinkButton"], { variant: "transparent", href: app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].appSubUrl + "/profile" }, "Cancel"))));
    };
    return ChangePasswordForm;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (ChangePasswordForm);


/***/ }),

/***/ "./public/app/features/profile/ChangePasswordPage.tsx":
/*!************************************************************!*\
  !*** ./public/app/features/profile/ChangePasswordPage.tsx ***!
  \************************************************************/
/*! exports provided: ChangePasswordPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPage", function() { return ChangePasswordPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_utils_UserProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/UserProvider */ "./public/app/core/utils/UserProvider.tsx");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _ChangePasswordForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ChangePasswordForm */ "./public/app/features/profile/ChangePasswordForm.tsx");








var ChangePasswordPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ChangePasswordPage, _super);
    function ChangePasswordPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangePasswordPage.prototype.render = function () {
        var navModel = this.props.navModel;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_utils_UserProvider__WEBPACK_IMPORTED_MODULE_5__["UserProvider"], null, function (_a, states) {
                var changePassword = _a.changePassword;
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"].Contents, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-sub-heading" }, "Change Your Password"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ChangePasswordForm__WEBPACK_IMPORTED_MODULE_7__["ChangePasswordForm"], { onChangePassword: changePassword, isSaving: states.changePassword })));
            })));
    };
    return ChangePasswordPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_4__["getNavModel"])(state.navIndex, "change-password"),
    };
}
var mapDispatchToProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ChangePasswordPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=1.6310f9af5345c722b930.js.map