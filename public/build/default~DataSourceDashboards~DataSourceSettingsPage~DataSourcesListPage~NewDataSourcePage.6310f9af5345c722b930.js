(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~DataSourceDashboards~DataSourceSettingsPage~DataSourcesListPage~NewDataSourcePage"],{

/***/ "./public/app/features/datasources/state/actions.ts":
/*!**********************************************************!*\
  !*** ./public/app/features/datasources/state/actions.ts ***!
  \**********************************************************/
/*! exports provided: loadDataSources, loadDataSource, addDataSource, loadDataSourcePlugins, updateDataSource, deleteDataSource, nameExits, findNewName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDataSources", function() { return loadDataSources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDataSource", function() { return loadDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDataSource", function() { return addDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDataSourcePlugins", function() { return loadDataSourcePlugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateDataSource", function() { return updateDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteDataSource", function() { return deleteDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nameExits", function() { return nameExits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findNewName", function() { return findNewName; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _navModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navModel */ "./public/app/features/datasources/state/navModel.ts");
/* harmony import */ var app_features_plugins_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/plugins/PluginSettingsCache */ "./public/app/features/plugins/PluginSettingsCache.ts");
/* harmony import */ var app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/features/plugins/plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reducers */ "./public/app/features/datasources/state/reducers.ts");
/* harmony import */ var _buildCategories__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./buildCategories */ "./public/app/features/datasources/state/buildCategories.ts");










function loadDataSources() {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var response;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get('/api/datasources')];
                case 1:
                    response = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_8__["dataSourcesLoaded"])(response));
                    return [2 /*return*/];
            }
        });
    }); };
}
function loadDataSource(id) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var dataSource, pluginInfo, plugin;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get("/api/datasources/" + id)];
                case 1:
                    dataSource = _a.sent();
                    return [4 /*yield*/, Object(app_features_plugins_PluginSettingsCache__WEBPACK_IMPORTED_MODULE_6__["getPluginSettings"])(dataSource.type)];
                case 2:
                    pluginInfo = (_a.sent());
                    return [4 /*yield*/, Object(app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_7__["importDataSourcePlugin"])(pluginInfo)];
                case 3:
                    plugin = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_8__["dataSourceLoaded"])(dataSource));
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_8__["dataSourceMetaLoaded"])(pluginInfo));
                    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_4__["updateNavIndex"])(Object(_navModel__WEBPACK_IMPORTED_MODULE_5__["buildNavModel"])(dataSource, plugin)));
                    return [2 /*return*/];
            }
        });
    }); };
}
function addDataSource(plugin) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var dataSources, newInstance, result;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dispatch(loadDataSources())];
                case 1:
                    _a.sent();
                    dataSources = getStore().dataSources.dataSources;
                    newInstance = {
                        name: plugin.name,
                        type: plugin.id,
                        access: 'proxy',
                        isDefault: dataSources.length === 0,
                    };
                    if (nameExits(dataSources, newInstance.name)) {
                        newInstance.name = findNewName(dataSources, newInstance.name);
                    }
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().post('/api/datasources', newInstance)];
                case 2:
                    result = _a.sent();
                    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_4__["updateLocation"])({ path: "/datasources/edit/" + result.id }));
                    return [2 /*return*/];
            }
        });
    }); };
}
function loadDataSourcePlugins() {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var plugins, categories;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_8__["dataSourcePluginsLoad"])());
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get('/api/plugins', { enabled: 1, type: 'datasource' })];
                case 1:
                    plugins = _a.sent();
                    categories = Object(_buildCategories__WEBPACK_IMPORTED_MODULE_9__["buildCategories"])(plugins);
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_8__["dataSourcePluginsLoaded"])({ plugins: plugins, categories: categories }));
                    return [2 /*return*/];
            }
        });
    }); };
}
function updateDataSource(dataSource) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().put("/api/datasources/" + dataSource.id, dataSource)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, updateFrontendSettings()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, dispatch(loadDataSource(dataSource.id))];
            }
        });
    }); };
}
function deleteDataSource() {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var dataSource;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dataSource = getStore().dataSources.dataSource;
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().delete("/api/datasources/" + dataSource.id)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, updateFrontendSettings()];
                case 2:
                    _a.sent();
                    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_4__["updateLocation"])({ path: '/datasources' }));
                    return [2 /*return*/];
            }
        });
    }); };
}
function nameExits(dataSources, name) {
    return (dataSources.filter(function (dataSource) {
        return dataSource.name.toLowerCase() === name.toLowerCase();
    }).length > 0);
}
function findNewName(dataSources, name) {
    // Need to loop through current data sources to make sure
    // the name doesn't exist
    while (nameExits(dataSources, name)) {
        // If there's a duplicate name that doesn't end with '-x'
        // we can add -1 to the name and be done.
        if (!nameHasSuffix(name)) {
            name = name + "-1";
        }
        else {
            // if there's a duplicate name that ends with '-x'
            // we can try to increment the last digit until the name is unique
            // remove the 'x' part and replace it with the new number
            name = "" + getNewName(name) + incrementLastDigit(getLastDigit(name));
        }
    }
    return name;
}
function updateFrontendSettings() {
    return Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])()
        .get('/api/frontend/settings')
        .then(function (settings) {
        _core_config__WEBPACK_IMPORTED_MODULE_1__["default"].datasources = settings.datasources;
        _core_config__WEBPACK_IMPORTED_MODULE_1__["default"].defaultDatasource = settings.defaultDatasource;
        Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__["getDatasourceSrv"])().init();
    });
}
function nameHasSuffix(name) {
    return name.endsWith('-', name.length - 1);
}
function getLastDigit(name) {
    return parseInt(name.slice(-1), 10);
}
function incrementLastDigit(digit) {
    return isNaN(digit) ? 1 : digit + 1;
}
function getNewName(name) {
    return name.slice(0, name.length - 1);
}


/***/ }),

/***/ "./public/app/features/datasources/state/buildCategories.ts":
/*!******************************************************************!*\
  !*** ./public/app/features/datasources/state/buildCategories.ts ***!
  \******************************************************************/
/*! exports provided: buildCategories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildCategories", function() { return buildCategories; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");


function buildCategories(plugins) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    var categories = [
        { id: 'tsdb', title: 'Time series databases', plugins: [] },
        { id: 'logging', title: 'Logging & document databases', plugins: [] },
        { id: 'sql', title: 'SQL', plugins: [] },
        { id: 'cloud', title: 'Cloud', plugins: [] },
        { id: 'enterprise', title: 'Enterprise plugins', plugins: [] },
        { id: 'other', title: 'Others', plugins: [] },
    ];
    var categoryIndex = {};
    var pluginIndex = {};
    var enterprisePlugins = getEnterprisePhantomPlugins();
    try {
        // build indices
        for (var categories_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(categories), categories_1_1 = categories_1.next(); !categories_1_1.done; categories_1_1 = categories_1.next()) {
            var category = categories_1_1.value;
            categoryIndex[category.id] = category;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (categories_1_1 && !categories_1_1.done && (_a = categories_1.return)) _a.call(categories_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var _loop_1 = function (plugin) {
        var e_5, _a;
        // Force category for enterprise plugins
        if (enterprisePlugins.find(function (item) { return item.id === plugin.id; })) {
            plugin.category = 'enterprise';
        }
        // Fix link name
        if (plugin.info.links) {
            try {
                for (var _b = (e_5 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(plugin.info.links)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var link = _c.value;
                    link.name = 'Learn more';
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        var category = categories.find(function (item) { return item.id === plugin.category; }) || categoryIndex['other'];
        category.plugins.push(plugin);
        // add to plugin index
        pluginIndex[plugin.id] = plugin;
    };
    try {
        for (var plugins_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(plugins), plugins_1_1 = plugins_1.next(); !plugins_1_1.done; plugins_1_1 = plugins_1.next()) {
            var plugin = plugins_1_1.value;
            _loop_1(plugin);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (plugins_1_1 && !plugins_1_1.done && (_b = plugins_1.return)) _b.call(plugins_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var categories_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(categories), categories_2_1 = categories_2.next(); !categories_2_1.done; categories_2_1 = categories_2.next()) {
            var category = categories_2_1.value;
            // add phantom plugin
            if (category.id === 'cloud') {
                category.plugins.push(getGrafanaCloudPhantomPlugin());
            }
            // add phantom plugins
            if (category.id === 'enterprise') {
                try {
                    for (var enterprisePlugins_1 = (e_4 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(enterprisePlugins)), enterprisePlugins_1_1 = enterprisePlugins_1.next(); !enterprisePlugins_1_1.done; enterprisePlugins_1_1 = enterprisePlugins_1.next()) {
                        var plugin = enterprisePlugins_1_1.value;
                        if (!pluginIndex[plugin.id]) {
                            category.plugins.push(plugin);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (enterprisePlugins_1_1 && !enterprisePlugins_1_1.done && (_d = enterprisePlugins_1.return)) _d.call(enterprisePlugins_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            sortPlugins(category.plugins);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (categories_2_1 && !categories_2_1.done && (_c = categories_2.return)) _c.call(categories_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return categories;
}
function sortPlugins(plugins) {
    var sortingRules = {
        prometheus: 100,
        graphite: 95,
        loki: 90,
        mysql: 80,
        postgres: 79,
        gcloud: -1,
    };
    plugins.sort(function (a, b) {
        var aSort = sortingRules[a.id] || 0;
        var bSort = sortingRules[b.id] || 0;
        if (aSort > bSort) {
            return -1;
        }
        if (aSort < bSort) {
            return 1;
        }
        return a.name > b.name ? -1 : 1;
    });
}
function getEnterprisePhantomPlugins() {
    return [
        getPhantomPlugin({
            id: 'grafana-splunk-datasource',
            name: 'Splunk',
            description: 'Visualize & explore Splunk logs',
            imgUrl: 'public/img/plugins/splunk_logo_128.png',
        }),
        getPhantomPlugin({
            id: 'grafana-oracle-datasource',
            name: 'Oracle',
            description: 'Visualize & explore Oracle SQL',
            imgUrl: 'public/img/plugins/oracle.png',
        }),
        getPhantomPlugin({
            id: 'grafana-dynatrace-datasource',
            name: 'Dynatrace',
            description: 'Visualize & explore Dynatrace data',
            imgUrl: 'public/img/plugins/dynatrace.png',
        }),
        getPhantomPlugin({
            id: 'grafana-servicenow-datasource',
            description: 'ServiceNow integration & data source',
            name: 'ServiceNow',
            imgUrl: 'public/img/plugins/servicenow.svg',
        }),
        getPhantomPlugin({
            id: 'grafana-datadog-datasource',
            description: 'DataDog integration & data source',
            name: 'DataDog',
            imgUrl: 'public/img/plugins/datadog.png',
        }),
        getPhantomPlugin({
            id: 'grafana-newrelic-datasource',
            description: 'New Relic integration & data source',
            name: 'New Relic',
            imgUrl: 'public/img/plugins/newrelic.svg',
        }),
    ];
}
function getGrafanaCloudPhantomPlugin() {
    return {
        id: 'gcloud',
        name: 'Grafana Cloud',
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PluginType"].datasource,
        module: 'phantom',
        baseUrl: '',
        info: {
            description: 'Hosted Graphite, Prometheus and Loki',
            logos: { small: 'public/img/grafana_icon.svg', large: 'asd' },
            author: { name: 'Grafana Labs' },
            links: [
                {
                    url: 'https://grafana.com/products/cloud/',
                    name: 'Learn more',
                },
            ],
            screenshots: [],
            updated: '2019-05-10',
            version: '1.0.0',
        },
    };
}
function getPhantomPlugin(options) {
    return {
        id: options.id,
        name: options.name,
        type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PluginType"].datasource,
        module: 'phantom',
        baseUrl: '',
        info: {
            description: options.description,
            logos: { small: options.imgUrl, large: options.imgUrl },
            author: { name: 'Grafana Labs' },
            links: [
                {
                    url: 'https://grafana.com/grafana/plugins/' + options.id,
                    name: 'Install now',
                },
            ],
            screenshots: [],
            updated: '2019-05-10',
            version: '1.0.0',
        },
    };
}


/***/ }),

/***/ "./public/app/features/datasources/state/navModel.ts":
/*!***********************************************************!*\
  !*** ./public/app/features/datasources/state/navModel.ts ***!
  \***********************************************************/
/*! exports provided: buildNavModel, getDataSourceLoadingNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildNavModel", function() { return buildNavModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourceLoadingNav", function() { return getDataSourceLoadingNav; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");



function buildNavModel(dataSource, plugin) {
    var e_1, _a;
    var pluginMeta = plugin.meta;
    var navModel = {
        img: pluginMeta.info.logos.large,
        id: 'datasource-' + dataSource.id,
        subTitle: "Type: " + pluginMeta.name,
        url: '',
        text: dataSource.name,
        breadcrumbs: [{ title: 'Data Sources', url: 'datasources' }],
        children: [
            {
                active: false,
                icon: 'fa fa-fw fa-sliders',
                id: "datasource-settings-" + dataSource.id,
                text: 'Settings',
                url: "datasources/edit/" + dataSource.id + "/",
            },
        ],
    };
    if (plugin.configPages) {
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(plugin.configPages), _c = _b.next(); !_c.done; _c = _b.next()) {
                var page = _c.value;
                navModel.children.push({
                    active: false,
                    text: page.title,
                    icon: page.icon,
                    url: "datasources/edit/" + dataSource.id + "/?page=" + page.id,
                    id: "datasource-page-" + page.id,
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    if (pluginMeta.includes && hasDashboards(pluginMeta.includes)) {
        navModel.children.push({
            active: false,
            icon: 'fa fa-fw fa-th-large',
            id: "datasource-dashboards-" + dataSource.id,
            text: 'Dashboards',
            url: "datasources/edit/" + dataSource.id + "/dashboards",
        });
    }
    if (app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].licenseInfo.hasLicense) {
        navModel.children.push({
            active: false,
            icon: 'fa fa-fw fa-lock',
            id: "datasource-permissions-" + dataSource.id,
            text: 'Permissions',
            url: "datasources/edit/" + dataSource.id + "/permissions",
        });
    }
    return navModel;
}
function getDataSourceLoadingNav(pageName) {
    var e_2, _a;
    var main = buildNavModel({
        access: '',
        basicAuth: false,
        basicAuthUser: '',
        basicAuthPassword: '',
        withCredentials: false,
        database: '',
        id: 1,
        isDefault: false,
        jsonData: { authType: 'credentials', defaultRegion: 'eu-west-2' },
        name: 'Loading',
        orgId: 1,
        password: '',
        readOnly: false,
        type: 'Loading',
        typeLogoUrl: 'public/img/icn-datasource.svg',
        url: '',
        user: '',
    }, {
        meta: {
            id: '1',
            type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["PluginType"].datasource,
            name: '',
            info: {
                author: {
                    name: '',
                    url: '',
                },
                description: '',
                links: [{ name: '', url: '' }],
                logos: {
                    large: '',
                    small: '',
                },
                screenshots: [],
                updated: '',
                version: '',
            },
            includes: [],
            module: '',
            baseUrl: '',
        },
    });
    var node;
    try {
        // find active page
        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(main.children), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            if (child.id.indexOf(pageName) > 0) {
                child.active = true;
                node = child;
                break;
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
    return {
        main: main,
        node: node,
    };
}
function hasDashboards(includes) {
    return (includes.find(function (include) {
        return include.type === 'dashboard';
    }) !== undefined);
}


/***/ }),

/***/ "./public/app/features/datasources/state/selectors.ts":
/*!************************************************************!*\
  !*** ./public/app/features/datasources/state/selectors.ts ***!
  \************************************************************/
/*! exports provided: getDataSources, getDataSourcePlugins, getDataSource, getDataSourceMeta, getDataSourcesSearchQuery, getDataSourcesLayoutMode, getDataSourcesCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSources", function() { return getDataSources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcePlugins", function() { return getDataSourcePlugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSource", function() { return getDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourceMeta", function() { return getDataSourceMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesSearchQuery", function() { return getDataSourcesSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesLayoutMode", function() { return getDataSourcesLayoutMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesCount", function() { return getDataSourcesCount; });
var getDataSources = function (state) {
    var regex = new RegExp(state.searchQuery, 'i');
    return state.dataSources.filter(function (dataSource) {
        return regex.test(dataSource.name) || regex.test(dataSource.database);
    });
};
var getDataSourcePlugins = function (state) {
    var regex = new RegExp(state.dataSourceTypeSearchQuery, 'i');
    return state.plugins.filter(function (type) {
        return regex.test(type.name);
    });
};
var getDataSource = function (state, dataSourceId) {
    if (state.dataSource.id === parseInt(dataSourceId, 10)) {
        return state.dataSource;
    }
    return {};
};
var getDataSourceMeta = function (state, type) {
    if (state.dataSourceMeta.id === type) {
        return state.dataSourceMeta;
    }
    return {};
};
var getDataSourcesSearchQuery = function (state) { return state.searchQuery; };
var getDataSourcesLayoutMode = function (state) { return state.layoutMode; };
var getDataSourcesCount = function (state) { return state.dataSourcesCount; };


/***/ })

}]);
//# sourceMappingURL=default~DataSourceDashboards~DataSourceSettingsPage~DataSourcesListPage~NewDataSourcePage.6310f9af5345c722b930.js.map