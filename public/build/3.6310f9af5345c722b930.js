(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./public/app/features/admin/LicenseChrome.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/admin/LicenseChrome.tsx ***!
  \*****************************************************/
/*! exports provided: LicenseChrome, Circle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LicenseChrome", function() { return LicenseChrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");




var title = { fontWeight: 500, fontSize: '26px', lineHeight: '123%' };
var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["stylesFactory"])(function (theme) {
    var backgroundUrl = theme.isDark
        ? '/public/img/licensing/header_dark.svg'
        : '/public/img/licensing/header_light.svg';
    var footerBg = theme.isDark ? theme.colors.dark9 : theme.colors.gray6;
    return {
        container: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      padding: 36px 79px;\n      background: ", ";\n    "], ["\n      padding: 36px 79px;\n      background: ", ";\n    "])), theme.colors.panelBg),
        footer: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      text-align: center;\n      padding: 16px;\n      background: ", ";\n    "], ["\n      text-align: center;\n      padding: 16px;\n      background: ", ";\n    "])), footerBg),
        header: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n      height: 137px;\n      padding: 40px 0 0 79px;\n      position: relative;\n      background: url('", "') right;\n  "], ["\n      height: 137px;\n      padding: 40px 0 0 79px;\n      position: relative;\n      background: url('", "') right;\n  "])), backgroundUrl),
    };
});
var LicenseChrome = function (_a) {
    var header = _a.header, editionNotice = _a.editionNotice, subheader = _a.subheader, children = _a.children;
    var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["useTheme"])();
    var styles = getStyles(theme);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: styles.header },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { style: title }, header),
            subheader && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, subheader),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Circle, { size: "128px", style: {
                    boxShadow: '0px 0px 24px rgba(24, 58, 110, 0.45)',
                    background: '#0A1C36',
                    position: 'absolute',
                    top: '19px',
                    left: '71%',
                } },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: "/public/img/grafana_icon.svg", alt: "Grafana", width: "80px", style: { position: 'absolute', left: '23px', top: '20px' } }))),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: styles.container }, children),
        editionNotice && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: styles.footer }, editionNotice)));
};
var Circle = function (_a) {
    var size = _a.size, style = _a.style, children = _a.children;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ width: size, height: size, position: 'absolute', bottom: 0, right: 0, borderRadius: '50%' }, style) }, children));
};
var templateObject_1, templateObject_2, templateObject_3;


/***/ }),

/***/ "./public/app/features/admin/UpgradePage.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/admin/UpgradePage.tsx ***!
  \***************************************************/
/*! exports provided: UpgradePage, UpgradeInfo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpgradePage", function() { return UpgradePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpgradeInfo", function() { return UpgradeInfo; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _LicenseChrome__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LicenseChrome */ "./public/app/features/admin/LicenseChrome.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");









var UpgradePage = function (_a) {
    var navModel = _a.navModel;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], { navModel: navModel },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(UpgradeInfo, { editionNotice: "You are running the open-source version of Grafana.\r\n        You have to install the Enterprise edition in order enable Enterprise features." }))));
};
var titleStyles = { fontWeight: 500, fontSize: '26px', lineHeight: '123%' };
var UpgradeInfo = function (_a) {
    var editionNotice = _a.editionNotice;
    var columnStyles = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    display: grid;\n    grid-template-columns: 100%;\n    column-gap: 20px;\n    row-gap: 40px;\n\n    @media (min-width: 1050px) {\n      grid-template-columns: 50% 50%;\n    }\n  "], ["\n    display: grid;\n    grid-template-columns: 100%;\n    column-gap: 20px;\n    row-gap: 40px;\n\n    @media (min-width: 1050px) {\n      grid-template-columns: 50% 50%;\n    }\n  "])));
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LicenseChrome__WEBPACK_IMPORTED_MODULE_4__["LicenseChrome"], { header: "Grafana Enterprise", subheader: "Get your free trial", editionNotice: editionNotice },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: columnStyles },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FeatureInfo, null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ServiceInfo, null))));
};
var GetEnterprise = function () {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { marginTop: '40px', marginBottom: '30px' } },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", { style: titleStyles }, "Get Grafana Enterprise"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(CallToAction, null),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { style: { paddingTop: '12px' } },
            "You can use the trial version for free for ",
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "30 days"),
            ". We will remind you about it",
            ' ',
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "5 days before the trial period ends"),
            ".")));
};
var CallToAction = function () {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["Forms"].LinkButton, { variant: "primary", size: "lg", href: "https://grafana.com/contact?about=grafana-enterprise&utm_source=grafana-upgrade-page" }, "Contact us and get a free trial"));
};
var ServiceInfo = function () {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "At your service"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(List, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Enterprise Plugins", image: "/public/img/licensing/plugin_enterprise.svg" }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Critical SLA: 2 hours", image: "/public/img/licensing/sla.svg" }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Unlimited Expert Support", image: "/public/img/licensing/customer_support.svg" },
                "24x7x365 support via",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(List, { nested: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Email" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Private slack channel" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Phone" }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Hand-in-hand support", image: "/public/img/licensing/handinhand_support.svg" }, "in the upgrade process")),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { marginTop: '20px' } },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("strong", null, "Also included:"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            "Indemnification, working with Grafana Labs on future prioritization, and training from the core Grafana team.")));
};
var FeatureInfo = function () {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { paddingRight: '11px' } },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Enhanced Functionality"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(FeatureListing, null),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(GetEnterprise, null)));
};
var FeatureListing = function () {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(List, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Data source permissions" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Reporting" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "SAML Authentication" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Enhanced LDAP Integration" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Team Sync" }, "LDAP, GitHub OAuth, Auth Proxy"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "White labeling" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Enterprise Plugins" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(List, { nested: true },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Oracle" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Splunk" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Service Now" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "Dynatrace" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "DataDog" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Item, { title: "AppDynamics" })))));
};
var List = function (_a) {
    var children = _a.children, nested = _a.nested;
    var listStyle = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    display: flex;\n    flex-direction: column;\n    padding-top: 8px;\n\n    > div {\n      margin-bottom: ", "px;\n    }\n  "], ["\n    display: flex;\n    flex-direction: column;\n    padding-top: 8px;\n\n    > div {\n      margin-bottom: ", "px;\n    }\n  "])), nested ? 0 : 8);
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: listStyle }, children);
};
var Item = function (_a) {
    var children = _a.children, title = _a.title, image = _a.image;
    var imageUrl = image ? image : '/public/img/licensing/checkmark.svg';
    var itemStyle = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    display: flex;\n\n    > img {\n      display: block;\n      height: 22px;\n      flex-grow: 0;\n      padding-right: 12px;\n    }\n  "], ["\n    display: flex;\n\n    > img {\n      display: block;\n      height: 22px;\n      flex-grow: 0;\n      padding-right: 12px;\n    }\n  "])));
    var titleStyle = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    font-weight: 500;\n    line-height: 1.7;\n  "], ["\n    font-weight: 500;\n    line-height: 1.7;\n  "])));
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: itemStyle },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: imageUrl }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: titleStyle }, title),
            children)));
};
var mapStateToProps = function (state) { return ({
    navModel: Object(_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__["getNavModel"])(state.navIndex, 'upgrading'),
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_6__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps)(UpgradePage)));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=3.6310f9af5345c722b930.js.map