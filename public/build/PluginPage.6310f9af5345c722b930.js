(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["PluginPage"],{

/***/ "./public/app/core/components/PluginHelp/PluginHelp.tsx":
/*!**************************************************************!*\
  !*** ./public/app/core/components/PluginHelp/PluginHelp.tsx ***!
  \**************************************************************/
/*! exports provided: PluginHelp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginHelp", function() { return PluginHelp; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");




var PluginHelp = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PluginHelp, _super);
    function PluginHelp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isError: false,
            isLoading: false,
            help: '',
        };
        _this.loadHelp = function () {
            var _a = _this.props, plugin = _a.plugin, type = _a.type;
            _this.setState({ isLoading: true });
            Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])()
                .get("/api/plugins/" + plugin.id + "/markdown/" + type)
                .then(function (response) {
                var helpHtml = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["renderMarkdown"])(response);
                if (response === '' && type === 'help') {
                    _this.setState({
                        isError: false,
                        isLoading: false,
                        help: _this.constructPlaceholderInfo(),
                    });
                }
                else {
                    _this.setState({
                        isError: false,
                        isLoading: false,
                        help: helpHtml,
                    });
                }
            })
                .catch(function () {
                _this.setState({
                    isError: true,
                    isLoading: false,
                });
            });
        };
        return _this;
    }
    PluginHelp.prototype.componentDidMount = function () {
        this.loadHelp();
    };
    PluginHelp.prototype.constructPlaceholderInfo = function () {
        return 'No plugin help or readme markdown file was found';
    };
    PluginHelp.prototype.render = function () {
        var type = this.props.type;
        var _a = this.state, isError = _a.isError, isLoading = _a.isLoading, help = _a.help;
        if (isLoading) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Loading help...");
        }
        if (isError) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "'Error occurred when loading help'");
        }
        if (type === 'panel_help' && help === '') {
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "markdown-html", dangerouslySetInnerHTML: { __html: help } });
    };
    return PluginHelp;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

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

/***/ "./public/app/features/plugins/PluginDashboards.tsx":
/*!**********************************************************!*\
  !*** ./public/app/features/plugins/PluginDashboards.tsx ***!
  \**********************************************************/
/*! exports provided: PluginDashboards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginDashboards", function() { return PluginDashboards; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_features_datasources_DashboardsTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/datasources/DashboardsTable */ "./public/app/features/datasources/DashboardsTable.tsx");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");







var PluginDashboards = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PluginDashboards, _super);
    function PluginDashboards(props) {
        var _this = _super.call(this, props) || this;
        _this.importAll = function () {
            _this.importNext(0);
        };
        _this.importNext = function (index) {
            var dashboards = _this.state.dashboards;
            return _this.import(dashboards[index], true).then(function () {
                if (index + 1 < dashboards.length) {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            _this.importNext(index + 1).then(function () {
                                resolve();
                            });
                        }, 500);
                    });
                }
                else {
                    return Promise.resolve();
                }
            });
        };
        _this.import = function (dash, overwrite) {
            var _a = _this.props, plugin = _a.plugin, datasource = _a.datasource;
            var installCmd = {
                pluginId: plugin.id,
                path: dash.path,
                overwrite: overwrite,
                inputs: [],
            };
            if (datasource) {
                installCmd.inputs.push({
                    name: '*',
                    type: 'datasource',
                    pluginId: datasource.meta.id,
                    value: datasource.name,
                });
            }
            return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])()
                .post("/api/dashboards/import", installCmd)
                .then(function (res) {
                app_core_core__WEBPACK_IMPORTED_MODULE_4__["appEvents"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["AppEvents"].alertSuccess, ['Dashboard Imported', dash.title]);
                lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()(dash, res);
                _this.setState({ dashboards: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(_this.state.dashboards) });
            });
        };
        _this.remove = function (dash) {
            Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])()
                .delete('/api/dashboards/' + dash.importedUri)
                .then(function () {
                dash.imported = false;
                _this.setState({ dashboards: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(_this.state.dashboards) });
            });
        };
        _this.state = {
            loading: true,
            dashboards: [],
        };
        return _this;
    }
    PluginDashboards.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var pluginId;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                pluginId = this.props.plugin.id;
                Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])()
                    .get("/api/plugins/" + pluginId + "/dashboards")
                    .then(function (dashboards) {
                    _this.setState({ dashboards: dashboards, loading: false });
                });
                return [2 /*return*/];
            });
        });
    };
    PluginDashboards.prototype.render = function () {
        var _a = this.state, loading = _a.loading, dashboards = _a.dashboards;
        if (loading) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "loading...");
        }
        if (!dashboards || !dashboards.length) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "No dashboards are included with this plugin");
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_features_datasources_DashboardsTable__WEBPACK_IMPORTED_MODULE_5__["default"], { dashboards: dashboards, onImport: this.import, onRemove: this.remove })));
    };
    return PluginDashboards;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/plugins/PluginPage.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/plugins/PluginPage.tsx ***!
  \****************************************************/
/*! exports provided: getLoadingNav, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoadingNav", function() { return getLoadingNav; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _PluginSettingsCache__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./PluginSettingsCache */ "./public/app/features/plugins/PluginSettingsCache.ts");
/* harmony import */ var _plugin_loader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/nav_model_srv */ "./public/app/core/nav_model_srv.ts");
/* harmony import */ var app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/components/PluginHelp/PluginHelp */ "./public/app/core/components/PluginHelp/PluginHelp.tsx");
/* harmony import */ var _wrappers_AppConfigWrapper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./wrappers/AppConfigWrapper */ "./public/app/features/plugins/wrappers/AppConfigWrapper.tsx");
/* harmony import */ var _PluginDashboards__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./PluginDashboards */ "./public/app/features/plugins/PluginDashboards.tsx");
/* harmony import */ var app_core_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/core/core */ "./public/app/core/core.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");

// Libraries
















function getLoadingNav() {
    var node = {
        text: 'Loading...',
        icon: 'icon-gf icon-gf-panel',
    };
    return {
        node: node,
        main: node,
    };
}
function loadPlugin(pluginId) {
    return Object(_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_9__["getPluginSettings"])(pluginId).then(function (info) {
        if (info.type === _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginType"].app) {
            return Object(_plugin_loader__WEBPACK_IMPORTED_MODULE_10__["importAppPlugin"])(info);
        }
        if (info.type === _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginType"].datasource) {
            return Object(_plugin_loader__WEBPACK_IMPORTED_MODULE_10__["importDataSourcePlugin"])(info);
        }
        if (info.type === _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginType"].panel) {
            return Object(_plugin_loader__WEBPACK_IMPORTED_MODULE_10__["importPanelPlugin"])(pluginId).then(function (plugin) {
                // Panel Meta does not have the *full* settings meta
                return Object(_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_9__["getPluginSettings"])(pluginId).then(function (meta) {
                    plugin.meta = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, meta), plugin.meta);
                    return plugin;
                });
            });
        }
        if (info.type === _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginType"].renderer) {
            return Promise.resolve({ meta: info });
        }
        return Promise.reject('Unknown Plugin type: ' + info.type);
    });
}
var PAGE_ID_README = 'readme';
var PAGE_ID_DASHBOARDS = 'dashboards';
var PAGE_ID_CONFIG_CTRL = 'config';
var PluginPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PluginPage, _super);
    function PluginPage(props) {
        var _this = _super.call(this, props) || this;
        _this.showUpdateInfo = function () {
            app_core_core__WEBPACK_IMPORTED_MODULE_15__["appEvents"].emit(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].showModal, {
                src: 'public/app/features/plugins/partials/update_instructions.html',
                model: _this.state.plugin.meta,
            });
        };
        _this.state = {
            loading: true,
            nav: getLoadingNav(),
            defaultPage: PAGE_ID_README,
        };
        return _this;
    }
    PluginPage.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, pluginId, path, query, $contextSrv, appSubUrl, plugin, _b, defaultPage, nav;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, pluginId = _a.pluginId, path = _a.path, query = _a.query, $contextSrv = _a.$contextSrv;
                        appSubUrl = app_core_config__WEBPACK_IMPORTED_MODULE_16__["config"].appSubUrl;
                        return [4 /*yield*/, loadPlugin(pluginId)];
                    case 1:
                        plugin = _c.sent();
                        if (!plugin) {
                            this.setState({
                                loading: false,
                                nav: Object(app_core_nav_model_srv__WEBPACK_IMPORTED_MODULE_11__["getNotFoundNav"])(),
                            });
                            return [2 /*return*/]; // 404
                        }
                        _b = getPluginTabsNav(plugin, appSubUrl, path, query, $contextSrv.hasRole('Admin')), defaultPage = _b.defaultPage, nav = _b.nav;
                        this.setState({
                            loading: false,
                            plugin: plugin,
                            defaultPage: defaultPage,
                            nav: nav,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PluginPage.prototype.componentDidUpdate = function (prevProps) {
        var prevPage = prevProps.query.page;
        var page = this.props.query.page;
        if (prevPage !== page) {
            var _a = this.state, nav = _a.nav, defaultPage = _a.defaultPage;
            var node = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, nav.node), { children: setActivePage(page, nav.node.children, defaultPage) });
            this.setState({
                nav: {
                    node: node,
                    main: node,
                },
            });
        }
    };
    PluginPage.prototype.renderBody = function () {
        var e_1, _a;
        var query = this.props.query;
        var _b = this.state, plugin = _b.plugin, nav = _b.nav;
        if (!plugin) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["Alert"], { severity: app_types__WEBPACK_IMPORTED_MODULE_5__["AppNotificationSeverity"].Error, title: "Plugin Not Found" });
        }
        var active = nav.main.children.find(function (tab) { return tab.active; });
        if (active) {
            // Find the current config tab
            if (plugin.configPages) {
                try {
                    for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(plugin.configPages), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var tab = _d.value;
                        if (tab.id === active.id) {
                            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(tab.body, { plugin: plugin, query: query });
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            // Apps have some special behavior
            if (plugin.meta.type === _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginType"].app) {
                if (active.id === PAGE_ID_DASHBOARDS) {
                    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PluginDashboards__WEBPACK_IMPORTED_MODULE_14__["PluginDashboards"], { plugin: plugin.meta });
                }
                if (active.id === PAGE_ID_CONFIG_CTRL && plugin.angularConfigCtrl) {
                    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_wrappers_AppConfigWrapper__WEBPACK_IMPORTED_MODULE_13__["AppConfigCtrlWrapper"], { app: plugin });
                }
            }
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_12__["PluginHelp"], { plugin: plugin.meta, type: "help" });
    };
    PluginPage.prototype.renderVersionInfo = function (meta) {
        if (!meta.info.version) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", { className: "page-sidebar-section" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Version"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, meta.info.version),
            meta.hasUpdate && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], { content: meta.latestVersion, theme: "info", placement: "top" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "#", onClick: this.showUpdateInfo }, "Update Available!"))))));
    };
    PluginPage.prototype.renderSidebarIncludeBody = function (item) {
        if (item.type === _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginIncludeType"].page) {
            var pluginId = this.state.plugin.meta.id;
            var page = item.name.toLowerCase().replace(' ', '-');
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "plugins/" + pluginId + "/page/" + page },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: getPluginIcon(item.type) }),
                item.name));
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: getPluginIcon(item.type) }),
            item.name));
    };
    PluginPage.prototype.renderSidebarIncludes = function (includes) {
        var _this = this;
        if (!includes || !includes.length) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", { className: "page-sidebar-section" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Includes"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "ui-list plugin-info-list" }, includes.map(function (include) {
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "plugin-info-list-item", key: include.name }, _this.renderSidebarIncludeBody(include)));
            }))));
    };
    PluginPage.prototype.renderSidebarDependencies = function (dependencies) {
        if (!dependencies) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", { className: "page-sidebar-section" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Dependencies"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "ui-list plugin-info-list" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "plugin-info-list-item" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { src: "public/img/grafana_icon.svg" }),
                    "Grafana ",
                    dependencies.grafanaVersion),
                dependencies.plugins &&
                    dependencies.plugins.map(function (plug) {
                        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "plugin-info-list-item", key: plug.name },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: getPluginIcon(plug.type) }),
                            plug.name,
                            " ",
                            plug.version));
                    }))));
    };
    PluginPage.prototype.renderSidebarLinks = function (info) {
        if (!info.links || !info.links.length) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", { className: "page-sidebar-section" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Links"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "ui-list" }, info.links.map(function (link) {
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { key: link.url },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: link.url, className: "external-link", target: "_blank", rel: "noopener" }, link.name)));
            }))));
    };
    PluginPage.prototype.render = function () {
        var _a = this.state, loading = _a.loading, nav = _a.nav, plugin = _a.plugin;
        var $contextSrv = this.props.$contextSrv;
        var isAdmin = $contextSrv.hasRole('Admin');
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_8__["default"], { navModel: nav },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_8__["default"].Contents, { isLoading: loading }, !loading && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "sidebar-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "sidebar-content" },
                    plugin.loadError && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["Alert"], { severity: app_types__WEBPACK_IMPORTED_MODULE_5__["AppNotificationSeverity"].Error, title: "Error Loading Plugin", children: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                            "Check the server startup logs for more information. ",
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                            "If this plugin was loaded from git, make sure it was compiled.") })),
                    this.renderBody()),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("aside", { className: "page-sidebar" }, plugin && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", { className: "page-sidebar-section" },
                    this.renderVersionInfo(plugin.meta),
                    isAdmin && this.renderSidebarIncludes(plugin.meta.includes),
                    this.renderSidebarDependencies(plugin.meta.dependencies),
                    this.renderSidebarLinks(plugin.meta.info)))))))));
    };
    return PluginPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
function getPluginTabsNav(plugin, appSubUrl, path, query, isAdmin) {
    var e_2, _a;
    var meta = plugin.meta;
    var defaultPage;
    var pages = [];
    if (true) {
        pages.push({
            text: 'Readme',
            icon: 'fa fa-fw fa-file-text-o',
            url: "" + appSubUrl + path + "?page=" + PAGE_ID_README,
            id: PAGE_ID_README,
        });
    }
    // We allow non admins to see plugins but only their readme. Config is hidden even though the API needs to be
    // public for plugins to work properly.
    if (isAdmin) {
        // Only show Config/Pages for app
        if (meta.type === _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginType"].app) {
            // Legacy App Config
            if (plugin.angularConfigCtrl) {
                pages.push({
                    text: 'Config',
                    icon: 'gicon gicon-cog',
                    url: "" + appSubUrl + path + "?page=" + PAGE_ID_CONFIG_CTRL,
                    id: PAGE_ID_CONFIG_CTRL,
                });
                defaultPage = PAGE_ID_CONFIG_CTRL;
            }
            if (plugin.configPages) {
                try {
                    for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(plugin.configPages), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var page = _c.value;
                        pages.push({
                            text: page.title,
                            icon: page.icon,
                            url: "" + appSubUrl + path + "?page=" + page.id,
                            id: page.id,
                        });
                        if (!defaultPage) {
                            defaultPage = page.id;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            // Check for the dashboard pages
            if (lodash_find__WEBPACK_IMPORTED_MODULE_4___default()(meta.includes, { type: _grafana_data__WEBPACK_IMPORTED_MODULE_7__["PluginIncludeType"].dashboard })) {
                pages.push({
                    text: 'Dashboards',
                    icon: 'gicon gicon-dashboard',
                    url: "" + appSubUrl + path + "?page=" + PAGE_ID_DASHBOARDS,
                    id: PAGE_ID_DASHBOARDS,
                });
            }
        }
    }
    if (!defaultPage) {
        defaultPage = pages[0].id; // the first tab
    }
    var node = {
        text: meta.name,
        img: meta.info.logos.large,
        subTitle: meta.info.author.name,
        breadcrumbs: [{ title: 'Plugins', url: 'plugins' }],
        url: "" + appSubUrl + path,
        children: setActivePage(query.page, pages, defaultPage),
    };
    return {
        defaultPage: defaultPage,
        nav: {
            node: node,
            main: node,
        },
    };
}
function setActivePage(pageId, pages, defaultPageId) {
    var found = false;
    var selected = pageId || defaultPageId;
    var changed = pages.map(function (p) {
        var active = !found && selected === p.id;
        if (active) {
            found = true;
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, p), { active: active });
    });
    if (!found) {
        changed[0].active = true;
    }
    return changed;
}
function getPluginIcon(type) {
    switch (type) {
        case 'datasource':
            return 'gicon gicon-datasources';
        case 'panel':
            return 'icon-gf icon-gf-panel';
        case 'app':
            return 'icon-gf icon-gf-apps';
        case 'page':
            return 'icon-gf icon-gf-endpoint-tiny';
        case 'dashboard':
            return 'gicon gicon-dashboard';
        default:
            return 'icon-gf icon-gf-apps';
    }
}
var mapStateToProps = function (state) { return ({
    pluginId: state.location.routeParams.pluginId,
    query: state.location.query,
    path: state.location.path,
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps)(PluginPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/plugins/wrappers/AppConfigWrapper.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/plugins/wrappers/AppConfigWrapper.tsx ***!
  \*******************************************************************/
/*! exports provided: AppConfigCtrlWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfigCtrlWrapper", function() { return AppConfigCtrlWrapper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");

// Libraries








var AppConfigCtrlWrapper = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AppConfigCtrlWrapper, _super);
    function AppConfigCtrlWrapper(props) {
        var _this = _super.call(this, props) || this;
        // Needed for angular scope
        _this.preUpdateHook = function () { return Promise.resolve(); };
        _this.postUpdateHook = function () { return Promise.resolve(); };
        //-----------------------------------------------------------
        // Copied from plugin_edit_ctrl
        //-----------------------------------------------------------
        _this.update = function () {
            var pluginId = _this.model.id;
            _this.preUpdateHook()
                .then(function () {
                var updateCmd = lodash_extend__WEBPACK_IMPORTED_MODULE_3___default()({
                    enabled: _this.model.enabled,
                    pinned: _this.model.pinned,
                    jsonData: _this.model.jsonData,
                    secureJsonData: _this.model.secureJsonData,
                }, {});
                return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_7__["getBackendSrv"])().post("/api/plugins/" + pluginId + "/settings", updateCmd);
            })
                .then(_this.postUpdateHook)
                .then(function (res) {
                window.location.href = window.location.href;
            });
        };
        _this.setPreUpdateHook = function (callback) {
            _this.preUpdateHook = callback;
        };
        _this.setPostUpdateHook = function (callback) {
            _this.postUpdateHook = callback;
        };
        // Stub to avoid unknown function in legacy code
        _this.importDashboards = function () {
            Object(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["deprecationWarning"])('AppConfig', 'importDashboards()');
            return Promise.resolve();
        };
        _this.enable = function () {
            _this.model.enabled = true;
            _this.model.pinned = true;
            _this.update();
        };
        _this.disable = function () {
            _this.model.enabled = false;
            _this.model.pinned = false;
            _this.update();
        };
        _this.state = {
            angularCtrl: null,
            refresh: 0,
        };
        return _this;
    }
    AppConfigCtrlWrapper.prototype.componentDidMount = function () {
        var _this = this;
        // Force a reload after the first mount -- is there a better way to do this?
        setTimeout(function () {
            _this.setState({ refresh: _this.state.refresh + 1 });
        }, 5);
    };
    AppConfigCtrlWrapper.prototype.componentDidUpdate = function (prevProps) {
        if (!this.element || this.state.angularCtrl) {
            return;
        }
        // Set a copy of the meta
        this.model = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default()(this.props.app.meta);
        var loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getAngularLoader"])();
        var template = '<plugin-component type="app-config-ctrl"></plugin-component>';
        var scopeProps = { ctrl: this };
        var angularCtrl = loader.load(this.element, scopeProps, template);
        this.setState({ angularCtrl: angularCtrl });
    };
    AppConfigCtrlWrapper.prototype.render = function () {
        var _this = this;
        var model = this.model;
        var withRightMargin = Object(emotion__WEBPACK_IMPORTED_MODULE_8__["css"])({ marginRight: '8px' });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: function (element) { return (_this.element = element); } }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            model && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                !model.enabled && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: "primary", onClick: this.enable, className: withRightMargin }, "Enable")),
                model.enabled && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: "primary", onClick: this.update, className: withRightMargin }, "Update")),
                model.enabled && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Button"], { variant: "danger", onClick: this.disable, className: withRightMargin }, "Disable"))))));
    };
    return AppConfigCtrlWrapper;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ })

}]);
//# sourceMappingURL=PluginPage.6310f9af5345c722b930.js.map