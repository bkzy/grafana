(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["testDataDSPlugin"],{

/***/ "./public/app/plugins/datasource/testdata/ConfigEditor.tsx":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/ConfigEditor.tsx ***!
  \*****************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Libraries

/**
 * Empty Config Editor -- settings to save
 */
var ConfigEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ConfigEditor, _super);
    function ConfigEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConfigEditor.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null);
    };
    return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/testdata/LogIpsum.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/LogIpsum.ts ***!
  \************************************************************/
/*! exports provided: getRandomLogLevel, getNextWord, getRandomLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomLogLevel", function() { return getRandomLogLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextWord", function() { return getNextWord; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomLine", function() { return getRandomLine; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

var index = 0;
function getRandomLogLevel() {
    var v = Math.random();
    if (v > 0.9) {
        return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].critical;
    }
    if (v > 0.8) {
        return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].error;
    }
    if (v > 0.7) {
        return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].warning;
    }
    if (v > 0.4) {
        return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].info;
    }
    if (v > 0.3) {
        return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].debug;
    }
    if (v > 0.1) {
        return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].trace;
    }
    return _grafana_data__WEBPACK_IMPORTED_MODULE_0__["LogLevel"].unknown;
}
function getNextWord() {
    index = (index + Math.floor(Math.random() * 5)) % words.length;
    return words[index];
}
function getRandomLine(length) {
    if (length === void 0) { length = 60; }
    var line = getNextWord();
    while (line.length < length) {
        line += ' ' + getNextWord();
    }
    return line;
}
var words = [
    'At',
    'vero',
    'eos',
    'et',
    'accusamus',
    'et',
    'iusto',
    'odio',
    'dignissimos',
    'ducimus',
    'qui',
    'blanditiis',
    'praesentium',
    'voluptatum',
    'deleniti',
    'atque',
    'corrupti',
    'quos',
    'dolores',
    'et',
    'quas',
    'molestias',
    'excepturi',
    'sint',
    'occaecati',
    'cupiditate',
    'non',
    'provident',
    'similique',
    'sunt',
    'in',
    'culpa',
    'qui',
    'officia',
    'deserunt',
    'mollitia',
    'animi',
    'id',
    'est',
    'laborum',
    'et',
    'dolorum',
    'fuga',
    'Et',
    'harum',
    'quidem',
    'rerum',
    'facilis',
    'est',
    'et',
    'expedita',
    'distinctio',
    'Nam',
    'libero',
    'tempore',
    'cum',
    'soluta',
    'nobis',
    'est',
    'eligendi',
    'optio',
    'cumque',
    'nihil',
    'impedit',
    'quo',
    'minus',
    'id',
    'quod',
    'maxime',
    'placeat',
    'facere',
    'possimus',
    'omnis',
    'voluptas',
    'assumenda',
    'est',
    'omnis',
    'dolor',
    'repellendus',
    'Temporibus',
    'autem',
    'quibusdam',
    'et',
    'aut',
    'officiis',
    'debitis',
    'aut',
    'rerum',
    'necessitatibus',
    'saepe',
    'eveniet',
    'ut',
    'et',
    'voluptates',
    'repudiandae',
    'sint',
    'et',
    'molestiae',
    'non',
    'recusandae',
    'Itaque',
    'earum',
    'rerum',
    'hic',
    'tenetur',
    'a',
    'sapiente',
    'delectus',
    'ut',
    'aut',
    'reiciendis',
    'voluptatibus',
    'maiores',
    'alias',
    'consequatur',
    'aut',
    'perferendis',
    'doloribus',
    'asperiores',
    'repellat',
];


/***/ }),

/***/ "./public/app/plugins/datasource/testdata/TestInfoTab.tsx":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/TestInfoTab.tsx ***!
  \****************************************************************/
/*! exports provided: TestInfoTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestInfoTab", function() { return TestInfoTab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Libraries

var TestInfoTab = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TestInfoTab, _super);
    function TestInfoTab(props) {
        return _super.call(this, props) || this;
    }
    TestInfoTab.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            "See github for more information about setting up a reproducable test environment.",
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-inverse", href: "https://github.com/grafana/grafana/tree/master/devenv", target: "_blank", rel: "noopener" }, "Github"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null)));
    };
    return TestInfoTab;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/testdata/datasource.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/datasource.ts ***!
  \**************************************************************/
/*! exports provided: TestDataDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestDataDataSource", function() { return TestDataDataSource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var _metricTree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metricTree */ "./public/app/plugins/datasource/testdata/metricTree.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _runStreams__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./runStreams */ "./public/app/plugins/datasource/testdata/runStreams.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var _features_templating_variable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../features/templating/variable */ "./public/app/features/templating/variable.ts");








var TestDataDataSource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TestDataDataSource, _super);
    function TestDataDataSource(instanceSettings) {
        return _super.call(this, instanceSettings) || this;
    }
    TestDataDataSource.prototype.query = function (options) {
        var e_1, _a;
        var _this = this;
        var queries = [];
        var streams = [];
        try {
            // Start streams and prepare queries
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(options.targets), _c = _b.next(); !_c.done; _c = _b.next()) {
                var target = _c.value;
                if (target.hide) {
                    continue;
                }
                if (target.scenarioId === 'streaming_client') {
                    streams.push(Object(_runStreams__WEBPACK_IMPORTED_MODULE_5__["runStream"])(target, options));
                }
                else {
                    queries.push(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, target), { intervalMs: options.intervalMs, maxDataPoints: options.maxDataPoints, datasourceId: this.id, alias: app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_6__["default"].replace(target.alias || '') }));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (queries.length) {
            var req = Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])()
                .datasourceRequest({
                method: 'POST',
                url: '/api/tsdb/query',
                data: {
                    from: options.range.from.valueOf().toString(),
                    to: options.range.to.valueOf().toString(),
                    queries: queries,
                },
                // This sets up a cancel token
                requestId: options.requestId,
            })
                .then(function (res) { return _this.processQueryResult(queries, res); });
            streams.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(req));
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(streams));
    };
    TestDataDataSource.prototype.processQueryResult = function (queries, res) {
        var e_2, _a, e_3, _b, e_4, _c;
        var data = [];
        var error = undefined;
        try {
            for (var queries_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(queries), queries_1_1 = queries_1.next(); !queries_1_1.done; queries_1_1 = queries_1.next()) {
                var query = queries_1_1.value;
                var results = res.data.results[query.refId];
                try {
                    for (var _d = (e_3 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(results.tables || [])), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var t = _e.value;
                        var table = t;
                        table.refId = query.refId;
                        table.name = query.alias;
                        data.push(table);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                try {
                    for (var _f = (e_4 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(results.series || [])), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var series = _g.value;
                        data.push({ target: series.name, datapoints: series.points, refId: query.refId, tags: series.tags });
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                if (results.error) {
                    error = {
                        message: results.error,
                    };
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (queries_1_1 && !queries_1_1.done && (_a = queries_1.return)) _a.call(queries_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return { data: data, error: error };
    };
    TestDataDataSource.prototype.annotationQuery = function (options) {
        var timeWalker = options.range.from.valueOf();
        var to = options.range.to.valueOf();
        var events = [];
        var eventCount = 10;
        var step = (to - timeWalker) / eventCount;
        for (var i = 0; i < eventCount; i++) {
            events.push({
                annotation: options.annotation,
                time: timeWalker,
                text: 'This is the text, <a href="https://grafana.com">Grafana.com</a>',
                tags: ['text', 'server'],
            });
            timeWalker += step;
        }
        return Promise.resolve(events);
    };
    TestDataDataSource.prototype.getQueryDisplayText = function (query) {
        if (query.alias) {
            return query.scenarioId + ' as ' + query.alias;
        }
        return query.scenarioId;
    };
    TestDataDataSource.prototype.testDatasource = function () {
        return Promise.resolve({
            status: 'success',
            message: 'Data source is working',
        });
    };
    TestDataDataSource.prototype.getScenarios = function () {
        return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get('/api/tsdb/testdata/scenarios');
    };
    TestDataDataSource.prototype.metricFindQuery = function (query, options) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var interpolatedQuery = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_6__["default"].replace(query, Object(_features_templating_variable__WEBPACK_IMPORTED_MODULE_7__["getSearchFilterScopedVar"])({ query: query, wildcardChar: '*', options: options }));
                var children = Object(_metricTree__WEBPACK_IMPORTED_MODULE_3__["queryMetricTree"])(interpolatedQuery);
                var items = children.map(function (item) { return ({ value: item.name, text: item.name }); });
                resolve(items);
            }, 100);
        });
    };
    return TestDataDataSource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]));



/***/ }),

/***/ "./public/app/plugins/datasource/testdata/metricTree.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/metricTree.ts ***!
  \**************************************************************/
/*! exports provided: queryMetricTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryMetricTree", function() { return queryMetricTree; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

/*
 *  Builds a nested tree like
 *  [
 *    {
 *      name: 'A',
 *      children: [
 *        { name: 'AA', children: [] },
 *        { name: 'AB', children: [] },
 *      ]
 *    }
 *  ]
 */
function buildMetricTree(parent, depth) {
    var e_1, _a;
    var chars = ['A', 'B', 'C'];
    var children = [];
    if (depth > 3) {
        return [];
    }
    try {
        for (var chars_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(chars), chars_1_1 = chars_1.next(); !chars_1_1.done; chars_1_1 = chars_1.next()) {
            var letter = chars_1_1.value;
            var nodeName = "" + parent + letter;
            children.push({
                name: nodeName,
                children: buildMetricTree(nodeName, depth + 1),
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (chars_1_1 && !chars_1_1.done && (_a = chars_1.return)) _a.call(chars_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return children;
}
function queryTree(children, query, queryIndex) {
    var e_2, _a, e_3, _b;
    if (queryIndex >= query.length) {
        return children;
    }
    if (query[queryIndex] === '*') {
        return children;
    }
    var nodeQuery = query[queryIndex];
    var result = [];
    var namesToMatch = [nodeQuery];
    // handle glob queries
    if (nodeQuery.startsWith('{')) {
        namesToMatch = nodeQuery.replace(/\{|\}/g, '').split(',');
    }
    try {
        for (var children_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(children), children_1_1 = children_1.next(); !children_1_1.done; children_1_1 = children_1.next()) {
            var node = children_1_1.value;
            try {
                for (var namesToMatch_1 = (e_3 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(namesToMatch)), namesToMatch_1_1 = namesToMatch_1.next(); !namesToMatch_1_1.done; namesToMatch_1_1 = namesToMatch_1.next()) {
                    var nameToMatch = namesToMatch_1_1.value;
                    if (nameToMatch.indexOf('*') !== -1) {
                        var pattern = nameToMatch.replace('*', '');
                        var regex = new RegExp("^" + pattern + ".*", 'gi');
                        if (regex.test(node.name)) {
                            result = result.concat(queryTree([node], query, queryIndex + 1));
                        }
                    }
                    else if (node.name === nameToMatch) {
                        result = result.concat(queryTree(node.children, query, queryIndex + 1));
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (namesToMatch_1_1 && !namesToMatch_1_1.done && (_b = namesToMatch_1.return)) _b.call(namesToMatch_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return result;
}
function queryMetricTree(query) {
    var children = buildMetricTree('', 0);
    return queryTree(children, query.split('.'), 0);
}


/***/ }),

/***/ "./public/app/plugins/datasource/testdata/module.tsx":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/module.tsx ***!
  \***********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/testdata/datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/testdata/query_ctrl.ts");
/* harmony import */ var _TestInfoTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TestInfoTab */ "./public/app/plugins/datasource/testdata/TestInfoTab.tsx");
/* harmony import */ var _ConfigEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConfigEditor */ "./public/app/plugins/datasource/testdata/ConfigEditor.tsx");





var TestDataAnnotationsQueryCtrl = /** @class */ (function () {
    function TestDataAnnotationsQueryCtrl() {
    }
    TestDataAnnotationsQueryCtrl.template = '<h2>Annotation scenario</h2>';
    return TestDataAnnotationsQueryCtrl;
}());
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["TestDataDataSource"])
    .setConfigEditor(_ConfigEditor__WEBPACK_IMPORTED_MODULE_4__["ConfigEditor"])
    .setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_2__["TestDataQueryCtrl"])
    .setAnnotationQueryCtrl(TestDataAnnotationsQueryCtrl)
    .addConfigPage({
    title: 'Setup',
    icon: 'fa fa-list-alt',
    body: _TestInfoTab__WEBPACK_IMPORTED_MODULE_3__["TestInfoTab"],
    id: 'setup',
});


/***/ }),

/***/ "./public/app/plugins/datasource/testdata/query_ctrl.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/query_ctrl.ts ***!
  \**************************************************************/
/*! exports provided: defaultPulse, defaultCSVWave, TestDataQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultPulse", function() { return defaultPulse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCSVWave", function() { return defaultCSVWave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestDataQueryCtrl", function() { return TestDataQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_e2e__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e */ "./packages/grafana-e2e/src/index.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var _runStreams__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./runStreams */ "./public/app/plugins/datasource/testdata/runStreams.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");







var defaultPulse = {
    timeStep: 60,
    onCount: 3,
    onValue: 2,
    offCount: 3,
    offValue: 1,
};
var defaultCSVWave = {
    timeStep: 60,
    valuesCSV: '0,0,2,2,1,1',
};
var showLabelsFor = ['random_walk', 'predictable_pulse', 'predictable_csv_wave'];
var TestDataQueryCtrl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TestDataQueryCtrl, _super);
    /** @ngInject */
    function TestDataQueryCtrl($scope, $injector) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.showLabels = false;
        _this.target.scenarioId = _this.target.scenarioId || 'random_walk';
        _this.scenarioList = [];
        _this.newPointTime = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTime"])();
        _this.selectedPoint = { text: 'Select point', value: null };
        _this.showLabels = showLabelsFor.includes(_this.target.scenarioId);
        _this.selectors = _grafana_e2e__WEBPACK_IMPORTED_MODULE_3__["e2e"].pages.Dashboard.Panels.DataSource.TestData.QueryTab.selectors;
        return _this;
    }
    TestDataQueryCtrl.prototype.getPoints = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.target.points, function (point, index) {
            return {
                text: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTime"])(point[1]).format('MMMM Do YYYY, H:mm:ss') + ' : ' + point[0],
                value: index,
            };
        });
    };
    TestDataQueryCtrl.prototype.pointSelected = function (option) {
        this.selectedPoint = option;
    };
    TestDataQueryCtrl.prototype.deletePoint = function () {
        this.target.points.splice(this.selectedPoint.value, 1);
        this.selectedPoint = { text: 'Select point', value: null };
        this.refresh();
    };
    TestDataQueryCtrl.prototype.addPoint = function () {
        this.target.points = this.target.points || [];
        this.newPointTime = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateMath"].parse(this.newPointTime);
        this.target.points.push([this.newPointValue, this.newPointTime.valueOf()]);
        this.target.points = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.sortBy(this.target.points, function (p) { return p[1]; });
        this.refresh();
    };
    TestDataQueryCtrl.prototype.$onInit = function () {
        var _this = this;
        return Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_6__["getBackendSrv"])()
            .get('/api/tsdb/testdata/scenarios')
            .then(function (res) {
            _this.scenarioList = res;
            _this.scenario = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(_this.scenarioList, { id: _this.target.scenarioId });
        });
    };
    TestDataQueryCtrl.prototype.scenarioChanged = function () {
        this.scenario = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(this.scenarioList, { id: this.target.scenarioId });
        this.target.stringInput = this.scenario.stringInput;
        this.showLabels = showLabelsFor.includes(this.target.scenarioId);
        if (this.target.scenarioId === 'manual_entry') {
            this.target.points = this.target.points || [];
        }
        else {
            delete this.target.points;
        }
        if (this.target.scenarioId === 'streaming_client') {
            this.target.stream = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.defaults(this.target.stream || {}, _runStreams__WEBPACK_IMPORTED_MODULE_5__["defaultQuery"]);
        }
        else {
            delete this.target.stream;
        }
        if (this.target.scenarioId === 'predictable_pulse') {
            this.target.pulseWave = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.defaults(this.target.pulseWave || {}, defaultPulse);
        }
        else {
            delete this.target.pulseWave;
        }
        if (this.target.scenarioId === 'predictable_csv_wave') {
            this.target.csvWave = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.defaults(this.target.csvWave || {}, defaultCSVWave);
        }
        else {
            delete this.target.csvWave;
        }
        this.refresh();
    };
    TestDataQueryCtrl.prototype.streamChanged = function () {
        this.refresh();
    };
    TestDataQueryCtrl.templateUrl = 'partials/query.editor.html';
    return TestDataQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_4__["QueryCtrl"]));



/***/ }),

/***/ "./public/app/plugins/datasource/testdata/runStreams.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/testdata/runStreams.ts ***!
  \**************************************************************/
/*! exports provided: defaultQuery, runStream, runSignalStream, runLogsStream, runFetchStream */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultQuery", function() { return defaultQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runStream", function() { return runStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runSignalStream", function() { return runSignalStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runLogsStream", function() { return runLogsStream; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runFetchStream", function() { return runFetchStream; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _LogIpsum__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LogIpsum */ "./public/app/plugins/datasource/testdata/LogIpsum.ts");





var defaultQuery = {
    type: 'signal',
    speed: 250,
    spread: 3.5,
    noise: 2.2,
    bands: 1,
};
function runStream(target, req) {
    var query = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["defaults"])(target.stream, defaultQuery);
    if ('signal' === query.type) {
        return runSignalStream(target, query, req);
    }
    if ('logs' === query.type) {
        return runLogsStream(target, query, req);
    }
    if ('fetch' === query.type) {
        return runFetchStream(target, query, req);
    }
    throw new Error("Unknown Stream Type: " + query.type);
}
function runSignalStream(target, query, req) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subscriber) {
        var streamId = "signal-" + req.panelId + "-" + target.refId;
        var maxDataPoints = req.maxDataPoints || 1000;
        var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["CircularDataFrame"]({
            append: 'tail',
            capacity: maxDataPoints,
        });
        data.refId = target.refId;
        data.name = target.alias || 'Signal ' + target.refId;
        data.addField({ name: 'time', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time });
        data.addField({ name: 'value', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].number });
        var spread = query.spread, speed = query.speed, bands = query.bands, noise = query.noise;
        for (var i = 0; i < bands; i++) {
            var suffix = bands > 1 ? " " + (i + 1) : '';
            data.addField({ name: 'Min' + suffix, type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].number });
            data.addField({ name: 'Max' + suffix, type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].number });
        }
        var value = Math.random() * 100;
        var timeoutId = null;
        var addNextRow = function (time) {
            value += (Math.random() - 0.5) * spread;
            var idx = 0;
            data.fields[idx++].values.add(time);
            data.fields[idx++].values.add(value);
            var min = value;
            var max = value;
            for (var i = 0; i < bands; i++) {
                min = min - Math.random() * noise;
                max = max + Math.random() * noise;
                data.fields[idx++].values.add(min);
                data.fields[idx++].values.add(max);
            }
        };
        // Fill the buffer on init
        if (true) {
            var time = Date.now() - maxDataPoints * speed;
            for (var i = 0; i < maxDataPoints; i++) {
                addNextRow(time);
                time += speed;
            }
        }
        var pushNextEvent = function () {
            addNextRow(Date.now());
            subscriber.next({
                data: [data],
                key: streamId,
            });
            timeoutId = setTimeout(pushNextEvent, speed);
        };
        // Send first event in 5ms
        setTimeout(pushNextEvent, 5);
        return function () {
            console.log('unsubscribing to stream ' + streamId);
            clearTimeout(timeoutId);
        };
    });
}
function runLogsStream(target, query, req) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subscriber) {
        var streamId = "logs-" + req.panelId + "-" + target.refId;
        var maxDataPoints = req.maxDataPoints || 1000;
        var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["CircularDataFrame"]({
            append: 'tail',
            capacity: maxDataPoints,
        });
        data.refId = target.refId;
        data.name = target.alias || 'Logs ' + target.refId;
        data.addField({ name: 'time', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time });
        data.addField({ name: 'line', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].string });
        var speed = query.speed;
        var timeoutId = null;
        var pushNextEvent = function () {
            data.values.time.add(Date.now());
            data.values.line.add(Object(_LogIpsum__WEBPACK_IMPORTED_MODULE_4__["getRandomLine"])());
            subscriber.next({
                data: [data],
                key: streamId,
            });
            timeoutId = setTimeout(pushNextEvent, speed);
        };
        // Send first event in 5ms
        setTimeout(pushNextEvent, 5);
        return function () {
            console.log('unsubscribing to stream ' + streamId);
            clearTimeout(timeoutId);
        };
    });
}
function runFetchStream(target, query, req) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"](function (subscriber) {
        var streamId = "fetch-" + req.panelId + "-" + target.refId;
        var maxDataPoints = req.maxDataPoints || 1000;
        var data = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["CircularDataFrame"]({
            append: 'tail',
            capacity: maxDataPoints,
        });
        data.refId = target.refId;
        data.name = target.alias || 'Fetch ' + target.refId;
        var reader;
        var csv = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["CSVReader"]({
            callback: {
                onHeader: function (fields) {
                    var e_1, _a;
                    // Clear any existing fields
                    if (data.fields.length) {
                        data = new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["CircularDataFrame"]({
                            append: 'tail',
                            capacity: maxDataPoints,
                        });
                        data.refId = target.refId;
                        data.name = 'Fetch ' + target.refId;
                    }
                    try {
                        for (var fields_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                            var field = fields_1_1.value;
                            data.addField(field);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                },
                onRow: function (row) {
                    data.add(row);
                },
            },
        });
        var processChunk = function (value) {
            if (value.value) {
                var text = new TextDecoder().decode(value.value);
                csv.readCSV(text);
            }
            subscriber.next({
                data: [data],
                key: streamId,
                state: value.done ? _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Done : _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Streaming,
            });
            if (value.done) {
                console.log('Finished stream');
                subscriber.complete(); // necessary?
                return;
            }
            return reader.read().then(processChunk);
        };
        fetch(new Request(query.url)).then(function (response) {
            reader = response.body.getReader();
            reader.read().then(processChunk);
        });
        return function () {
            // Cancel fetch?
            console.log('unsubscribing to stream ' + streamId);
        };
    });
}


/***/ })

}]);
//# sourceMappingURL=testDataDSPlugin.6310f9af5345c722b930.js.map