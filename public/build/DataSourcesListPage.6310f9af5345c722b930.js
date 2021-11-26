(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["DataSourcesListPage"],{

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

/***/ "./public/app/features/datasources/DataSourcesList.tsx":
/*!*************************************************************!*\
  !*** ./public/app/features/datasources/DataSourcesList.tsx ***!
  \*************************************************************/
/*! exports provided: DataSourcesList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcesList", function() { return DataSourcesList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DataSourcesListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DataSourcesListItem */ "./public/app/features/datasources/DataSourcesListItem.tsx");
/* harmony import */ var _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/components/LayoutSelector/LayoutSelector */ "./public/app/core/components/LayoutSelector/LayoutSelector.tsx");

// Libraries


// Components


var DataSourcesList = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataSourcesList, _super);
    function DataSourcesList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourcesList.prototype.render = function () {
        var _a = this.props, dataSources = _a.dataSources, layoutMode = _a.layoutMode;
        var listStyle = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'card-section': true,
            'card-list-layout-grid': layoutMode === _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_4__["LayoutModes"].Grid,
            'card-list-layout-list': layoutMode === _core_components_LayoutSelector_LayoutSelector__WEBPACK_IMPORTED_MODULE_4__["LayoutModes"].List,
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", { className: listStyle },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ol", { className: "card-list" }, dataSources.map(function (dataSource, index) {
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DataSourcesListItem__WEBPACK_IMPORTED_MODULE_3__["default"], { dataSource: dataSource, key: dataSource.id + "-" + index });
            }))));
    };
    return DataSourcesList;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (DataSourcesList);


/***/ }),

/***/ "./public/app/features/datasources/DataSourcesListItem.tsx":
/*!*****************************************************************!*\
  !*** ./public/app/features/datasources/DataSourcesListItem.tsx ***!
  \*****************************************************************/
/*! exports provided: DataSourcesListItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcesListItem", function() { return DataSourcesListItem; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_e2e__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/e2e */ "./packages/grafana-e2e/src/index.ts");



var DataSourcesListItem = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataSourcesListItem, _super);
    function DataSourcesListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourcesListItem.prototype.render = function () {
        var dataSource = this.props.dataSource;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "card-item-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "card-item", href: "datasources/edit/" + dataSource.id },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "card-item-header" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "card-item-type" }, dataSource.type)),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "card-item-body" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("figure", { className: "card-item-figure" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: dataSource.typeLogoUrl, alt: dataSource.name })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "card-item-details" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "card-item-name", "aria-label": _grafana_e2e__WEBPACK_IMPORTED_MODULE_2__["e2e"].pages.DataSources.selectors.dataSources(dataSource.name) },
                            dataSource.name,
                            dataSource.isDefault && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "btn btn-secondary btn-small card-item-label" }, "default")),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "card-item-sub-name" }, dataSource.url))))));
    };
    return DataSourcesListItem;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (DataSourcesListItem);


/***/ }),

/***/ "./public/app/features/datasources/DataSourcesListPage.tsx":
/*!*****************************************************************!*\
  !*** ./public/app/features/datasources/DataSourcesListPage.tsx ***!
  \*****************************************************************/
/*! exports provided: DataSourcesListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcesListPage", function() { return DataSourcesListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var app_core_components_OrgActionBar_OrgActionBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/OrgActionBar/OrgActionBar */ "./public/app/core/components/OrgActionBar/OrgActionBar.tsx");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
/* harmony import */ var _DataSourcesList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DataSourcesList */ "./public/app/features/datasources/DataSourcesList.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/datasources/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/datasources/state/selectors.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/datasources/state/reducers.ts");

// Libraries



// Components




// Actions




var emptyListModel = {
    title: 'There are no data sources defined yet',
    buttonIcon: 'gicon gicon-datasources',
    buttonLink: 'datasources/new',
    buttonTitle: 'Add data source',
    proTip: 'You can also define data sources through configuration files.',
    proTipLink: 'http://docs.grafana.org/administration/provisioning/#datasources?utm_source=grafana_ds_list',
    proTipLinkTitle: 'Learn more',
    proTipTarget: '_blank',
};
var DataSourcesListPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataSourcesListPage, _super);
    function DataSourcesListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSourcesListPage.prototype.componentDidMount = function () {
        this.fetchDataSources();
    };
    DataSourcesListPage.prototype.fetchDataSources = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadDataSources()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DataSourcesListPage.prototype.render = function () {
        var _a = this.props, dataSources = _a.dataSources, dataSourcesCount = _a.dataSourcesCount, navModel = _a.navModel, layoutMode = _a.layoutMode, searchQuery = _a.searchQuery, setDataSourcesSearchQuery = _a.setDataSourcesSearchQuery, setDataSourcesLayoutMode = _a.setDataSourcesLayoutMode, hasFetched = _a.hasFetched;
        var linkButton = {
            href: 'datasources/new',
            title: 'Add data source',
        };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: !hasFetched },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    hasFetched && dataSourcesCount === 0 && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_6__["default"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, emptyListModel)),
                    hasFetched &&
                        dataSourcesCount > 0 && [
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_OrgActionBar_OrgActionBar__WEBPACK_IMPORTED_MODULE_5__["default"], { layoutMode: layoutMode, searchQuery: searchQuery, onSetLayoutMode: function (mode) { return setDataSourcesLayoutMode(mode); }, setSearchQuery: function (query) { return setDataSourcesSearchQuery(query); }, linkButton: linkButton, key: "action-bar" }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DataSourcesList__WEBPACK_IMPORTED_MODULE_7__["default"], { dataSources: dataSources, layoutMode: layoutMode, key: "list" }),
                    ]))));
    };
    return DataSourcesListPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_9__["getNavModel"])(state.navIndex, 'datasources'),
        dataSources: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getDataSources"])(state.dataSources),
        layoutMode: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getDataSourcesLayoutMode"])(state.dataSources),
        dataSourcesCount: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getDataSourcesCount"])(state.dataSources),
        searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getDataSourcesSearchQuery"])(state.dataSources),
        hasFetched: state.dataSources.hasFetched,
    };
}
var mapDispatchToProps = {
    loadDataSources: _state_actions__WEBPACK_IMPORTED_MODULE_8__["loadDataSources"],
    setDataSourcesSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_11__["setDataSourcesSearchQuery"],
    setDataSourcesLayoutMode: _state_reducers__WEBPACK_IMPORTED_MODULE_11__["setDataSourcesLayoutMode"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(DataSourcesListPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=DataSourcesListPage.6310f9af5345c722b930.js.map