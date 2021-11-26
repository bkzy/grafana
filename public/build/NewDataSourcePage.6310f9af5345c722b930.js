(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["NewDataSourcePage"],{

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

/***/ "./public/app/features/datasources/NewDataSourcePage.tsx":
/*!***************************************************************!*\
  !*** ./public/app/features/datasources/NewDataSourcePage.tsx ***!
  \***************************************************************/
/*! exports provided: getNavModel, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNavModel", function() { return getNavModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/e2e */ "./packages/grafana-e2e/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/datasources/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/datasources/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/datasources/state/reducers.ts");












var NewDataSourcePage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(NewDataSourcePage, _super);
    function NewDataSourcePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDataSourceTypeClicked = function (plugin) {
            _this.props.addDataSource(plugin);
        };
        _this.onSearchQueryChange = function (value) {
            _this.props.setDataSourceTypeSearchQuery(value);
        };
        _this.onLearnMoreClick = function (evt) {
            evt.stopPropagation();
        };
        return _this;
    }
    NewDataSourcePage.prototype.componentDidMount = function () {
        this.props.loadDataSourcePlugins();
        this.searchInput.focus();
    };
    NewDataSourcePage.prototype.renderPlugins = function (plugins) {
        var _this = this;
        if (!plugins || !plugins.length) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["List"], { items: plugins, getItemKey: function (item) { return item.id.toString(); }, renderItem: function (item) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(DataSourceTypeCard, { plugin: item, onClick: function () { return _this.onDataSourceTypeClicked(item); }, onLearnMoreClick: _this.onLearnMoreClick })); } }));
    };
    NewDataSourcePage.prototype.renderCategories = function () {
        var _this = this;
        var categories = this.props.categories;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            categories.map(function (category) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-category", key: category.id },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-category__header" }, category.title),
                _this.renderPlugins(category.plugins))); }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-more" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-inverse", href: "https://grafana.com/plugins?type=datasource&utm_source=grafana_add_ds", target: "_blank", rel: "noopener" }, "Find more data source plugins on grafana.com"))));
    };
    NewDataSourcePage.prototype.render = function () {
        var _this = this;
        var _a = this.props, navModel = _a.navModel, isLoading = _a.isLoading, searchQuery = _a.searchQuery, plugins = _a.plugins;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_7__["default"].Contents, { isLoading: isLoading },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_10__["FilterInput"], { ref: function (elem) { return (_this.searchInput = elem); }, labelClassName: "gf-form--has-input-icon", inputClassName: "gf-form-input width-30", value: searchQuery, onChange: this.onSearchQueryChange, placeholder: "Filter by name or type" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-secondary", href: "datasources" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                    searchQuery && this.renderPlugins(plugins),
                    !searchQuery && this.renderCategories()))));
    };
    return NewDataSourcePage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var DataSourceTypeCard = function (props) {
    var plugin = props.plugin, onLearnMoreClick = props.onLearnMoreClick;
    var isPhantom = plugin.module === 'phantom';
    var onClick = !isPhantom ? props.onClick : function () { };
    // find first plugin info link
    var learnMoreLink = plugin.info.links && plugin.info.links.length > 0 ? plugin.info.links[0] : null;
    var mainClassName = classnames__WEBPACK_IMPORTED_MODULE_2___default()('add-data-source-item', {
        'add-data-source-item--phantom': isPhantom,
    });
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: mainClassName, onClick: onClick, "aria-label": _grafana_e2e__WEBPACK_IMPORTED_MODULE_6__["e2e"].pages.AddDataSource.selectors.dataSourcePlugins(plugin.name) },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { className: "add-data-source-item-logo", src: plugin.info.logos.small }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-item-text-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "add-data-source-item-text" }, plugin.name),
            plugin.info.description && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "add-data-source-item-desc" }, plugin.info.description)),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-item-actions" },
            learnMoreLink && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-inverse", href: learnMoreLink.url + "?utm_source=grafana_add_ds", target: "_blank", rel: "noopener", onClick: onLearnMoreClick },
                learnMoreLink.name,
                " ",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-external-link add-datasource-item-actions__btn-icon" }))),
            !isPhantom && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-primary" }, "Select"))));
};
function getNavModel() {
    var main = {
        icon: 'gicon gicon-add-datasources',
        id: 'datasource-new',
        text: 'Add data source',
        href: 'datasources/new',
        subTitle: 'Choose a data source type',
    };
    return {
        main: main,
        node: main,
    };
}
function mapStateToProps(state) {
    return {
        navModel: getNavModel(),
        plugins: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getDataSourcePlugins"])(state.dataSources),
        searchQuery: state.dataSources.dataSourceTypeSearchQuery,
        categories: state.dataSources.categories,
        isLoading: state.dataSources.isLoadingDataSources,
    };
}
var mapDispatchToProps = {
    addDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_8__["addDataSource"],
    loadDataSourcePlugins: _state_actions__WEBPACK_IMPORTED_MODULE_8__["loadDataSourcePlugins"],
    setDataSourceTypeSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_11__["setDataSourceTypeSearchQuery"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(NewDataSourcePage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=NewDataSourcePage.6310f9af5345c722b930.js.map