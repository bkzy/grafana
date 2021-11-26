(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["PluginListPage"],{

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

/***/ "./public/app/core/components/OrgActionBar/OrgActionBar.tsx":
/*!******************************************************************!*\
  !*** ./public/app/core/components/OrgActionBar/OrgActionBar.tsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LayoutSelector/LayoutSelector */ "./public/app/core/components/LayoutSelector/LayoutSelector.tsx");
/* harmony import */ var _FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");




var OrgActionBar = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(OrgActionBar, _super);
    function OrgActionBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrgActionBar.prototype.render = function () {
        var _a = this.props, searchQuery = _a.searchQuery, layoutMode = _a.layoutMode, onSetLayoutMode = _a.onSetLayoutMode, linkButton = _a.linkButton, setSearchQuery = _a.setSearchQuery, target = _a.target;
        var linkProps = { href: linkButton.href };
        if (target) {
            linkProps.target = target;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_3__["FilterInput"], { labelClassName: "gf-form--has-input-icon", inputClassName: "gf-form-input width-20", value: searchQuery, onChange: setSearchQuery, placeholder: 'Filter by name or type' }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_2__["default"], { mode: layoutMode, onLayoutModeChanged: function (mode) { return onSetLayoutMode(mode); } })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ className: "btn btn-primary" }, linkProps), linkButton.title)));
    };
    return OrgActionBar;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (OrgActionBar);


/***/ }),

/***/ "./public/app/features/plugins/PluginList.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/plugins/PluginList.tsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PluginListItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PluginListItem */ "./public/app/features/plugins/PluginListItem.tsx");
/* harmony import */ var _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/components/LayoutSelector/LayoutSelector */ "./public/app/core/components/LayoutSelector/LayoutSelector.tsx");




var PluginList = function (props) {
    var plugins = props.plugins, layoutMode = props.layoutMode;
    var listStyle = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'card-section': true,
        'card-list-layout-grid': layoutMode === _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_3__["LayoutModes"].Grid,
        'card-list-layout-list': layoutMode === _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_3__["LayoutModes"].List,
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", { className: listStyle },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ol", { className: "card-list" }, plugins.map(function (plugin, index) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PluginListItem__WEBPACK_IMPORTED_MODULE_2__["default"], { plugin: plugin, key: plugin.name + "-" + index });
        }))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginList);


/***/ }),

/***/ "./public/app/features/plugins/PluginListItem.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/plugins/PluginListItem.tsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var PluginListItem = function (props) {
    var plugin = props.plugin;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", { className: "card-item-wrapper" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { className: "card-item", href: "plugins/" + plugin.id + "/" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "card-item-header" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "card-item-type" }, plugin.type),
                plugin.hasUpdate && (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "card-item-notice" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { "bs-tooltip": "plugin.latestVersion" }, "Update available!")))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "card-item-body" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("figure", { className: "card-item-figure" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { src: plugin.info.logos.small })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "card-item-details" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "card-item-name" }, plugin.name),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "card-item-sub-name" }, "By " + plugin.info.author.name))))));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginListItem);


/***/ }),

/***/ "./public/app/features/plugins/PluginListPage.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/plugins/PluginListPage.tsx ***!
  \********************************************************/
/*! exports provided: PluginListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginListPage", function() { return PluginListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var app_core_components_OrgActionBar_OrgActionBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/OrgActionBar/OrgActionBar */ "./public/app/core/components/OrgActionBar/OrgActionBar.tsx");
/* harmony import */ var _PluginList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PluginList */ "./public/app/features/plugins/PluginList.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/plugins/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/plugins/state/selectors.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/plugins/state/reducers.ts");











var PluginListPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PluginListPage, _super);
    function PluginListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PluginListPage.prototype.componentDidMount = function () {
        this.fetchPlugins();
    };
    PluginListPage.prototype.fetchPlugins = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadPlugins()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginListPage.prototype.render = function () {
        var _a = this.props, hasFetched = _a.hasFetched, navModel = _a.navModel, plugins = _a.plugins, layoutMode = _a.layoutMode, setPluginsLayoutMode = _a.setPluginsLayoutMode, setPluginsSearchQuery = _a.setPluginsSearchQuery, searchQuery = _a.searchQuery;
        var linkButton = {
            href: 'https://grafana.com/plugins?utm_source=grafana_plugin_list',
            title: 'Find more plugins on Grafana.com',
        };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: !hasFetched },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_OrgActionBar_OrgActionBar__WEBPACK_IMPORTED_MODULE_5__["default"], { searchQuery: searchQuery, layoutMode: layoutMode, onSetLayoutMode: function (mode) { return setPluginsLayoutMode(mode); }, setSearchQuery: function (query) { return setPluginsSearchQuery(query); }, linkButton: linkButton }),
                    hasFetched && plugins && plugins && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PluginList__WEBPACK_IMPORTED_MODULE_6__["default"], { plugins: plugins, layoutMode: layoutMode })))));
    };
    return PluginListPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__["getNavModel"])(state.navIndex, 'plugins'),
        plugins: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getPlugins"])(state.plugins),
        layoutMode: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getLayoutMode"])(state.plugins),
        searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getPluginsSearchQuery"])(state.plugins),
        hasFetched: state.plugins.hasFetched,
    };
}
var mapDispatchToProps = {
    loadPlugins: _state_actions__WEBPACK_IMPORTED_MODULE_7__["loadPlugins"],
    setPluginsLayoutMode: _state_reducers__WEBPACK_IMPORTED_MODULE_10__["setPluginsLayoutMode"],
    setPluginsSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_10__["setPluginsSearchQuery"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(PluginListPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/plugins/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/plugins/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: getPlugins, getPluginsSearchQuery, getLayoutMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPlugins", function() { return getPlugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPluginsSearchQuery", function() { return getPluginsSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLayoutMode", function() { return getLayoutMode; });
var getPlugins = function (state) {
    var regex = new RegExp(state.searchQuery, 'i');
    return state.plugins.filter(function (item) {
        return regex.test(item.name) || regex.test(item.info.author.name) || regex.test(item.info.description);
    });
};
var getPluginsSearchQuery = function (state) { return state.searchQuery; };
var getLayoutMode = function (state) { return state.layoutMode; };


/***/ })

}]);
//# sourceMappingURL=PluginListPage.6310f9af5345c722b930.js.map