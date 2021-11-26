(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["azureMonitorPlugin"],{

/***/ "./public/app/core/utils/CancelablePromise.ts":
/*!****************************************************!*\
  !*** ./public/app/core/utils/CancelablePromise.ts ***!
  \****************************************************/
/*! exports provided: makePromiseCancelable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePromiseCancelable", function() { return makePromiseCancelable; });
// https://github.com/facebook/react/issues/5465
var makePromiseCancelable = function (promise) {
    var hasCanceled_ = false;
    var wrappedPromise = new Promise(function (resolve, reject) {
        promise.then(function (val) { return (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)); });
        promise.catch(function (error) { return (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)); });
    });
    return {
        promise: wrappedPromise,
        cancel: function () {
            hasCanceled_ = true;
        },
    };
};


/***/ }),

/***/ "./public/app/features/explore/slate-plugins/prism/index.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/explore/slate-plugins/prism/index.tsx ***!
  \*******************************************************************/
/*! exports provided: setPrismTokens, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPrismTokens", function() { return setPrismTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PrismPlugin; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_2__);



var TOKEN_MARK = 'prism-token';
function setPrismTokens(language, field, values, alias) {
    if (alias === void 0) { alias = 'variable'; }
    prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.languages[language][field] = {
        alias: alias,
        pattern: new RegExp("(?:^|\\s)(" + values.join('|') + ")(?:$|\\s)"),
    };
}
/**
 * Code-highlighting plugin based on Prism and
 * https://github.com/ianstormtaylor/slate/blob/master/examples/code-highlighting/index.js
 *
 * (Adapted to handle nested grammar definitions.)
 */
function PrismPlugin(_a) {
    var definition = _a.definition, language = _a.language;
    if (definition) {
        // Don't override exising modified definitions
        prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.languages[language] = prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.languages[language] || definition;
    }
    return {
        /**
         * Render a Slate mark with appropiate CSS class names
         *
         * @param {Object} props
         * @return {Element}
         */
        renderDecoration: function (props, editor, next) {
            var children = props.children, decoration = props.decoration;
            // Only apply spans to marks identified by this plugin
            if (decoration.type !== TOKEN_MARK) {
                return next();
            }
            var className = "token " + decoration.data.get('types');
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: className }, children);
        },
        /**
         * Decorate code blocks with Prism.js highlighting.
         *
         * @param {Node} node
         * @return {Array}
         */
        decorateNode: function (node, editor, next) {
            var e_1, _a;
            if (node.type !== 'paragraph') {
                return [];
            }
            var texts = node.getTexts().toArray();
            var tstring = texts.map(function (t) { return t.text; }).join('\n');
            var grammar = prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.languages[language];
            var tokens = prismjs__WEBPACK_IMPORTED_MODULE_2___default.a.tokenize(tstring, grammar);
            var decorations = [];
            var startText = texts.shift();
            var endText = startText;
            var startOffset = 0;
            var endOffset = 0;
            var start = 0;
            function processToken(token, acc) {
                var e_2, _a;
                // Accumulate token types down the tree
                var types = (acc || '') + " " + (token.type || '') + " " + (token.alias || '');
                // Add mark for token node
                if (typeof token === 'string' || typeof token.content === 'string') {
                    startText = endText;
                    startOffset = endOffset;
                    var content = typeof token === 'string' ? token : token.content;
                    var newlines = content.split('\n').length - 1;
                    var length = content.length - newlines;
                    var end = start + length;
                    var available = startText.text.length - startOffset;
                    var remaining = length;
                    endOffset = startOffset + remaining;
                    while (available < remaining) {
                        endText = texts.shift();
                        remaining = length - available;
                        available = endText.text.length;
                        endOffset = remaining;
                    }
                    // Inject marks from up the tree (acc) as well
                    if (typeof token !== 'string' || acc) {
                        var range = node.createDecoration({
                            anchor: {
                                key: startText.key,
                                offset: startOffset,
                            },
                            focus: {
                                key: endText.key,
                                offset: endOffset,
                            },
                            type: TOKEN_MARK,
                            data: { types: types },
                        });
                        decorations.push(range);
                    }
                    start = end;
                }
                else if (token.content && token.content.length) {
                    try {
                        // Tokens can be nested
                        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(token.content), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var subToken = _c.value;
                            processToken(subToken, types);
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
            }
            try {
                // Process top-level tokens
                for (var tokens_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(tokens), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                    var token = tokens_1_1.value;
                    processToken(token);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return decorations;
        },
    };
}


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/annotations_query_ctrl.ts":
/*!**************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/annotations_query_ctrl.ts ***!
  \**************************************************************************************************/
/*! exports provided: AzureMonitorAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureMonitorAnnotationsQueryCtrl", function() { return AzureMonitorAnnotationsQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var AzureMonitorAnnotationsQueryCtrl = /** @class */ (function () {
    /** @ngInject */
    function AzureMonitorAnnotationsQueryCtrl(templateSrv) {
        var _this = this;
        this.templateSrv = templateSrv;
        this.defaultQuery = '<your table>\n| where $__timeFilter() \n| project TimeGenerated, Text=YourTitleColumn, Tags="tag1,tag2"';
        this.getAzureLogAnalyticsSchema = function () {
            return _this.getWorkspaces()
                .then(function () {
                return _this.datasource.azureLogAnalyticsDatasource.getSchema(_this.annotation.workspace);
            })
                .catch(function () { });
        };
        this.onSubscriptionChange = function () {
            _this.getWorkspaces(true);
        };
        this.onLogAnalyticsQueryChange = function (nextQuery) {
            _this.annotation.rawQuery = nextQuery;
        };
        this.annotation.queryType = this.annotation.queryType || 'Azure Log Analytics';
        this.annotation.rawQuery = this.annotation.rawQuery || this.defaultQuery;
        this.initDropdowns();
    }
    AzureMonitorAnnotationsQueryCtrl.prototype.initDropdowns = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSubscriptions()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getWorkspaces()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AzureMonitorAnnotationsQueryCtrl.prototype.getSubscriptions = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (!this.datasource.azureMonitorDatasource.isConfigured()) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, this.datasource.azureMonitorDatasource.getSubscriptions().then(function (subs) {
                        _this.subscriptions = subs;
                        if (!_this.annotation.subscription && _this.annotation.queryType === 'Azure Log Analytics') {
                            _this.annotation.subscription = _this.datasource.azureLogAnalyticsDatasource.subscriptionId;
                        }
                        if (!_this.annotation.subscription && _this.subscriptions.length > 0) {
                            _this.annotation.subscription = _this.subscriptions[0].value;
                        }
                    })];
            });
        });
    };
    AzureMonitorAnnotationsQueryCtrl.prototype.getWorkspaces = function (bustCache) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (!bustCache && this.workspaces && this.workspaces.length > 0) {
                    return [2 /*return*/, this.workspaces];
                }
                return [2 /*return*/, this.datasource
                        .getAzureLogAnalyticsWorkspaces(this.annotation.subscription)
                        .then(function (list) {
                        _this.workspaces = list;
                        if (list.length > 0 && !_this.annotation.workspace) {
                            _this.annotation.workspace = list[0].value;
                        }
                        return _this.workspaces;
                    })
                        .catch(function () { })];
            });
        });
    };
    Object.defineProperty(AzureMonitorAnnotationsQueryCtrl.prototype, "templateVariables", {
        get: function () {
            return this.templateSrv.variables.map(function (t) { return '$' + t.name; });
        },
        enumerable: true,
        configurable: true
    });
    AzureMonitorAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return AzureMonitorAnnotationsQueryCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/app_insights_datasource.ts":
/*!****************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/app_insights_datasource.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../time_grain_converter */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts");
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/response_parser.ts");





var AppInsightsDatasource = /** @class */ (function () {
    /** @ngInject */
    function AppInsightsDatasource(instanceSettings, backendSrv, templateSrv) {
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.version = 'beta';
        this.logAnalyticsColumns = {};
        this.id = instanceSettings.id;
        this.applicationId = instanceSettings.jsonData.appInsightsAppId;
        this.baseUrl = "/appinsights/" + this.version + "/apps/" + this.applicationId;
        this.url = instanceSettings.url;
    }
    AppInsightsDatasource.prototype.isConfigured = function () {
        return !!this.applicationId && this.applicationId.length > 0;
    };
    AppInsightsDatasource.prototype.createRawQueryRequest = function (item, options, target) {
        if (item.xaxis && !item.timeColumn) {
            item.timeColumn = item.xaxis;
        }
        if (item.yaxis && !item.valueColumn) {
            item.valueColumn = item.yaxis;
        }
        if (item.spliton && !item.segmentColumn) {
            item.segmentColumn = item.spliton;
        }
        return {
            type: 'timeSeriesQuery',
            raw: false,
            appInsights: {
                rawQuery: true,
                rawQueryString: this.templateSrv.replace(item.rawQueryString, options.scopedVars),
                timeColumn: item.timeColumn,
                valueColumn: item.valueColumn,
                segmentColumn: item.segmentColumn,
            },
        };
    };
    AppInsightsDatasource.prototype.createMetricsRequest = function (item, options, target) {
        // fix for timeGrainUnit which is a deprecated/removed field name
        if (item.timeGrainCount) {
            item.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createISO8601Duration(item.timeGrainCount, item.timeGrainUnit);
        }
        else if (item.timeGrainUnit && item.timeGrain !== 'auto') {
            item.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createISO8601Duration(item.timeGrain, item.timeGrainUnit);
        }
        // migration for non-standard names
        if (item.groupBy && !item.dimension) {
            item.dimension = item.groupBy;
        }
        if (item.filter && !item.dimensionFilter) {
            item.dimensionFilter = item.filter;
        }
        return {
            type: 'timeSeriesQuery',
            raw: false,
            appInsights: {
                rawQuery: false,
                timeGrain: this.templateSrv.replace((item.timeGrain || '').toString(), options.scopedVars),
                allowedTimeGrainsMs: item.allowedTimeGrainsMs,
                metricName: this.templateSrv.replace(item.metricName, options.scopedVars),
                aggregation: this.templateSrv.replace(item.aggregation, options.scopedVars),
                dimension: this.templateSrv.replace(item.dimension, options.scopedVars),
                dimensionFilter: this.templateSrv.replace(item.dimensionFilter, options.scopedVars),
                alias: item.alias,
                format: target.format,
            },
        };
    };
    AppInsightsDatasource.prototype.query = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var queries, data, result;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queries = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(options.targets, function (item) {
                            return item.hide !== true;
                        }).map(function (target) {
                            var item = target.appInsights;
                            var query;
                            if (item.rawQuery) {
                                query = _this.createRawQueryRequest(item, options, target);
                            }
                            else {
                                query = _this.createMetricsRequest(item, options, target);
                            }
                            query.refId = target.refId;
                            query.intervalMs = options.intervalMs;
                            query.datasourceId = _this.id;
                            query.queryType = 'Application Insights';
                            return query;
                        });
                        if (!queries || queries.length === 0) {
                            // @ts-ignore
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.backendSrv.datasourceRequest({
                                url: '/api/tsdb/query',
                                method: 'POST',
                                data: {
                                    from: options.range.from.valueOf().toString(),
                                    to: options.range.to.valueOf().toString(),
                                    queries: queries,
                                },
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        result = [];
                        if (data.results) {
                            Object.values(data.results).forEach(function (queryRes) {
                                if (queryRes.meta && queryRes.meta.columns) {
                                    var columnNames = queryRes.meta.columns;
                                    _this.logAnalyticsColumns[queryRes.refId] = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(columnNames, function (n) { return ({ text: n, value: n }); });
                                }
                                if (!queryRes.series) {
                                    return;
                                }
                                queryRes.series.forEach(function (series) {
                                    var timeSerie = {
                                        target: series.name,
                                        datapoints: series.points,
                                        refId: queryRes.refId,
                                        meta: queryRes.meta,
                                    };
                                    result.push(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["toDataFrame"])(timeSerie));
                                });
                            });
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, Promise.resolve([])];
                }
            });
        });
    };
    AppInsightsDatasource.prototype.doQueries = function (queries) {
        var _this = this;
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(queries, function (query) {
            return _this.doRequest(query.url)
                .then(function (result) {
                return {
                    result: result,
                    query: query,
                };
            })
                .catch(function (err) {
                throw {
                    error: err,
                    query: query,
                };
            });
        });
    };
    AppInsightsDatasource.prototype.annotationQuery = function (options) { };
    AppInsightsDatasource.prototype.metricFindQuery = function (query) {
        var appInsightsMetricNameQuery = query.match(/^AppInsightsMetricNames\(\)/i);
        if (appInsightsMetricNameQuery) {
            return this.getMetricNames();
        }
        var appInsightsGroupByQuery = query.match(/^AppInsightsGroupBys\(([^\)]+?)(,\s?([^,]+?))?\)/i);
        if (appInsightsGroupByQuery) {
            var metricName = appInsightsGroupByQuery[1];
            return this.getGroupBys(this.templateSrv.replace(metricName));
        }
        return undefined;
    };
    AppInsightsDatasource.prototype.testDatasource = function () {
        var url = this.baseUrl + "/metrics/metadata";
        return this.doRequest(url)
            .then(function (response) {
            if (response.status === 200) {
                return {
                    status: 'success',
                    message: 'Successfully queried the Application Insights service.',
                    title: 'Success',
                };
            }
            return {
                status: 'error',
                message: 'Returned http status code ' + response.status,
            };
        })
            .catch(function (error) {
            var message = 'Application Insights: ';
            message += error.statusText ? error.statusText + ': ' : '';
            if (error.data && error.data.error && error.data.error.code === 'PathNotFoundError') {
                message += 'Invalid Application Id for Application Insights service.';
            }
            else if (error.data && error.data.error) {
                message += error.data.error.code + '. ' + error.data.error.message;
            }
            else {
                message += 'Cannot connect to Application Insights REST API.';
            }
            return {
                status: 'error',
                message: message,
            };
        });
    };
    AppInsightsDatasource.prototype.doRequest = function (url, maxRetries) {
        var _this = this;
        if (maxRetries === void 0) { maxRetries = 1; }
        return this.backendSrv
            .datasourceRequest({
            url: this.url + url,
            method: 'GET',
        })
            .catch(function (error) {
            if (maxRetries > 0) {
                return _this.doRequest(url, maxRetries - 1);
            }
            throw error;
        });
    };
    AppInsightsDatasource.prototype.getMetricNames = function () {
        var url = this.baseUrl + "/metrics/metadata";
        return this.doRequest(url).then(_response_parser__WEBPACK_IMPORTED_MODULE_4__["default"].parseMetricNames);
    };
    AppInsightsDatasource.prototype.getMetricMetadata = function (metricName) {
        var url = this.baseUrl + "/metrics/metadata";
        return this.doRequest(url).then(function (result) {
            return new _response_parser__WEBPACK_IMPORTED_MODULE_4__["default"](result).parseMetadata(metricName);
        });
    };
    AppInsightsDatasource.prototype.getGroupBys = function (metricName) {
        return this.getMetricMetadata(metricName).then(function (result) {
            return new _response_parser__WEBPACK_IMPORTED_MODULE_4__["default"](result).parseGroupBys();
        });
    };
    AppInsightsDatasource.prototype.getQuerySchema = function () {
        var url = this.baseUrl + "/query/schema";
        return this.doRequest(url).then(function (result) {
            var schema = new _response_parser__WEBPACK_IMPORTED_MODULE_4__["default"](result).parseQuerySchema();
            // console.log(schema);
            return schema;
        });
    };
    return AppInsightsDatasource;
}());
/* harmony default export */ __webpack_exports__["default"] = (AppInsightsDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/response_parser.ts":
/*!********************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/response_parser.ts ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");


var ResponseParser = /** @class */ (function () {
    function ResponseParser(results) {
        this.results = results;
    }
    ResponseParser.prototype.parseQueryResult = function () {
        var data = [];
        var columns = [];
        for (var i = 0; i < this.results.length; i++) {
            if (this.results[i].query.raw) {
                var xaxis = this.results[i].query.xaxis;
                var yaxises = this.results[i].query.yaxis;
                var spliton = this.results[i].query.spliton;
                columns = this.results[i].result.data.Tables[0].Columns;
                var rows = this.results[i].result.data.Tables[0].Rows;
                data = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(data, this.parseRawQueryResultRow(this.results[i].query, columns, rows, xaxis, yaxises, spliton));
            }
            else {
                var value = this.results[i].result.data.value;
                var alias = this.results[i].query.alias;
                data = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.concat(data, this.parseQueryResultRow(this.results[i].query, value, alias));
            }
        }
        return data;
    };
    ResponseParser.prototype.parseRawQueryResultRow = function (query, columns, rows, xaxis, yaxises, spliton) {
        var data = [];
        var columnsForDropdown = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(columns, function (column) { return ({ text: column.ColumnName, value: column.ColumnName }); });
        var xaxisColumn = columns.findIndex(function (column) { return column.ColumnName === xaxis; });
        var yaxisesSplit = yaxises.split(',');
        var yaxisColumns = {};
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(yaxisesSplit, function (yaxis) {
            yaxisColumns[yaxis] = columns.findIndex(function (column) { return column.ColumnName === yaxis; });
        });
        var splitonColumn = columns.findIndex(function (column) { return column.ColumnName === spliton; });
        var convertTimestamp = xaxis === 'timestamp';
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(rows, function (row) {
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(yaxisColumns, function (yaxisColumn, yaxisName) {
                var bucket = splitonColumn === -1
                    ? ResponseParser.findOrCreateBucket(data, yaxisName)
                    : ResponseParser.findOrCreateBucket(data, row[splitonColumn]);
                var epoch = convertTimestamp ? ResponseParser.dateTimeToEpoch(row[xaxisColumn]) : row[xaxisColumn];
                bucket.datapoints.push([row[yaxisColumn], epoch]);
                bucket.refId = query.refId;
                bucket.query = query.query;
                bucket.columnsForDropdown = columnsForDropdown;
            });
        });
        return data;
    };
    ResponseParser.prototype.parseQueryResultRow = function (query, value, alias) {
        var data = [];
        if (ResponseParser.isSingleValue(value)) {
            var metricName = ResponseParser.getMetricFieldKey(value);
            var aggField = ResponseParser.getKeyForAggregationField(value[metricName]);
            var epoch = ResponseParser.dateTimeToEpoch(value.end);
            data.push({
                target: metricName,
                datapoints: [[value[metricName][aggField], epoch]],
                refId: query.refId,
                query: query.query,
            });
            return data;
        }
        var groupedBy = ResponseParser.hasSegmentsField(value.segments[0]);
        if (!groupedBy) {
            var metricName = ResponseParser.getMetricFieldKey(value.segments[0]);
            var dataTarget = ResponseParser.findOrCreateBucket(data, metricName);
            for (var i = 0; i < value.segments.length; i++) {
                var epoch = ResponseParser.dateTimeToEpoch(value.segments[i].end);
                var aggField = ResponseParser.getKeyForAggregationField(value.segments[i][metricName]);
                dataTarget.datapoints.push([value.segments[i][metricName][aggField], epoch]);
            }
            dataTarget.refId = query.refId;
            dataTarget.query = query.query;
        }
        else {
            for (var i = 0; i < value.segments.length; i++) {
                var epoch = ResponseParser.dateTimeToEpoch(value.segments[i].end);
                for (var j = 0; j < value.segments[i].segments.length; j++) {
                    var metricName = ResponseParser.getMetricFieldKey(value.segments[i].segments[j]);
                    var aggField = ResponseParser.getKeyForAggregationField(value.segments[i].segments[j][metricName]);
                    var target = this.getTargetName(value.segments[i].segments[j], alias);
                    var bucket = ResponseParser.findOrCreateBucket(data, target);
                    bucket.datapoints.push([value.segments[i].segments[j][metricName][aggField], epoch]);
                    bucket.refId = query.refId;
                    bucket.meta = {
                        query: query.query,
                    };
                }
            }
        }
        return data;
    };
    ResponseParser.prototype.getTargetName = function (segment, alias) {
        var metric = '';
        var segmentName = '';
        var segmentValue = '';
        for (var prop in segment) {
            if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(segment[prop])) {
                metric = prop;
            }
            else {
                segmentName = prop;
                segmentValue = segment[prop];
            }
        }
        if (alias) {
            var regex = /\{\{([\s\S]+?)\}\}/g;
            return alias.replace(regex, function (match, g1, g2) {
                var group = g1 || g2;
                if (group === 'metric') {
                    return metric;
                }
                else if (group === 'groupbyname') {
                    return segmentName;
                }
                else if (group === 'groupbyvalue') {
                    return segmentValue;
                }
                return match;
            });
        }
        return metric + ("{" + segmentName + "=\"" + segmentValue + "\"}");
    };
    ResponseParser.isSingleValue = function (value) {
        return !ResponseParser.hasSegmentsField(value);
    };
    ResponseParser.findOrCreateBucket = function (data, target) {
        var dataTarget = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(data, ['target', target]);
        if (!dataTarget) {
            dataTarget = { target: target, datapoints: [] };
            data.push(dataTarget);
        }
        return dataTarget;
    };
    ResponseParser.hasSegmentsField = function (obj) {
        var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(obj);
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.indexOf(keys, 'segments') > -1;
    };
    ResponseParser.getMetricFieldKey = function (segment) {
        var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(segment);
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.without(keys, 'start', 'end'), function (key) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isObject(segment[key]);
        })[0];
    };
    ResponseParser.getKeyForAggregationField = function (dataObj) {
        var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(dataObj);
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.intersection(keys, ['sum', 'avg', 'min', 'max', 'count', 'unique'])[0];
    };
    ResponseParser.dateTimeToEpoch = function (dateTimeValue) {
        return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["dateTime"])(dateTimeValue).valueOf();
    };
    ResponseParser.parseMetricNames = function (result) {
        var keys = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(result.data.metrics);
        return ResponseParser.toTextValueList(keys);
    };
    ResponseParser.prototype.parseMetadata = function (metricName) {
        var metric = this.results.data.metrics[metricName];
        if (!metric) {
            throw Error('No data found for metric: ' + metricName);
        }
        return {
            primaryAggType: metric.defaultAggregation,
            supportedAggTypes: metric.supportedAggregations,
            supportedGroupBy: metric.supportedGroupBy.all,
        };
    };
    ResponseParser.prototype.parseGroupBys = function () {
        return ResponseParser.toTextValueList(this.results.supportedGroupBy);
    };
    ResponseParser.prototype.parseQuerySchema = function () {
        var result = {
            Type: 'AppInsights',
            Tables: {},
        };
        if (this.results && this.results.data && this.results.data.Tables) {
            for (var i = 0; i < this.results.data.Tables[0].Rows.length; i++) {
                var column = this.results.data.Tables[0].Rows[i];
                var columnTable = column[0];
                var columnName = column[1];
                var columnType = column[2];
                if (result.Tables[columnTable]) {
                    result.Tables[columnTable].OrderedColumns.push({ Name: columnName, Type: columnType });
                }
                else {
                    result.Tables[columnTable] = {
                        Name: columnTable,
                        OrderedColumns: [{ Name: columnName, Type: columnType }],
                    };
                }
            }
        }
        return result;
    };
    ResponseParser.toTextValueList = function (values) {
        var list = [];
        for (var i = 0; i < values.length; i++) {
            list.push({
                text: values[i],
                value: values[i],
            });
        }
        return list;
    };
    return ResponseParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (ResponseParser);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/azure_log_analytics_datasource.ts":
/*!******************************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/azure_log_analytics_datasource.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _log_analytics_querystring_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../log_analytics/querystring_builder */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/log_analytics/querystring_builder.ts");
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/response_parser.ts");




var AzureLogAnalyticsDatasource = /** @class */ (function () {
    /** @ngInject */
    function AzureLogAnalyticsDatasource(instanceSettings, backendSrv, templateSrv) {
        this.instanceSettings = instanceSettings;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.id = instanceSettings.id;
        this.baseUrl = '/loganalyticsazure';
        this.url = instanceSettings.url;
        this.defaultOrFirstWorkspace = this.instanceSettings.jsonData.logAnalyticsDefaultWorkspace;
        this.setWorkspaceUrl();
    }
    AzureLogAnalyticsDatasource.prototype.isConfigured = function () {
        return ((!!this.instanceSettings.jsonData.logAnalyticsSubscriptionId &&
            this.instanceSettings.jsonData.logAnalyticsSubscriptionId.length > 0) ||
            !!this.instanceSettings.jsonData.azureLogAnalyticsSameAs);
    };
    AzureLogAnalyticsDatasource.prototype.setWorkspaceUrl = function () {
        if (!!this.instanceSettings.jsonData.subscriptionId || !!this.instanceSettings.jsonData.azureLogAnalyticsSameAs) {
            this.subscriptionId = this.instanceSettings.jsonData.subscriptionId;
            var azureCloud = this.instanceSettings.jsonData.cloudName || 'azuremonitor';
            this.azureMonitorUrl = "/" + azureCloud + "/subscriptions";
        }
        else {
            this.subscriptionId = this.instanceSettings.jsonData.logAnalyticsSubscriptionId;
            this.azureMonitorUrl = "/workspacesloganalytics/subscriptions";
        }
    };
    AzureLogAnalyticsDatasource.prototype.getWorkspaces = function (subscription) {
        var subscriptionId = this.templateSrv.replace(subscription || this.subscriptionId);
        var workspaceListUrl = this.azureMonitorUrl +
            ("/" + subscriptionId + "/providers/Microsoft.OperationalInsights/workspaces?api-version=2017-04-26-preview");
        return this.doRequest(workspaceListUrl).then(function (response) {
            return (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(response.data.value, function (val) {
                return { text: val.name, value: val.properties.customerId };
            }) || []);
        });
    };
    AzureLogAnalyticsDatasource.prototype.getSchema = function (workspace) {
        if (!workspace) {
            return Promise.resolve();
        }
        var url = this.baseUrl + "/" + workspace + "/metadata";
        return this.doRequest(url).then(function (response) {
            return new _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"](response.data).parseSchemaResult();
        });
    };
    AzureLogAnalyticsDatasource.prototype.query = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var queries, promises;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                queries = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(options.targets, function (item) {
                    return item.hide !== true;
                }).map(function (target) {
                    var item = target.azureLogAnalytics;
                    var querystringBuilder = new _log_analytics_querystring_builder__WEBPACK_IMPORTED_MODULE_2__["default"](_this.templateSrv.replace(item.query, options.scopedVars, _this.interpolateVariable), options, 'TimeGenerated');
                    var generated = querystringBuilder.generate();
                    var workspace = _this.templateSrv.replace(item.workspace, options.scopedVars);
                    if (!workspace && _this.defaultOrFirstWorkspace) {
                        workspace = _this.defaultOrFirstWorkspace;
                    }
                    var url = _this.baseUrl + "/" + workspace + "/query?" + generated.uriString;
                    return {
                        refId: target.refId,
                        intervalMs: options.intervalMs,
                        maxDataPoints: options.maxDataPoints,
                        datasourceId: _this.id,
                        url: url,
                        query: generated.rawQuery,
                        format: target.format,
                        resultFormat: item.resultFormat,
                    };
                });
                if (!queries || queries.length === 0) {
                    return [2 /*return*/];
                }
                promises = this.doQueries(queries);
                return [2 /*return*/, Promise.all(promises).then(function (results) {
                        return new _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"](results).parseQueryResult();
                    })];
            });
        });
    };
    AzureLogAnalyticsDatasource.prototype.metricFindQuery = function (query) {
        var _this = this;
        return this.getDefaultOrFirstWorkspace().then(function (workspace) {
            var queries = _this.buildQuery(query, null, workspace);
            var promises = _this.doQueries(queries);
            return Promise.all(promises)
                .then(function (results) {
                return new _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"](results).parseToVariables();
            })
                .catch(function (err) {
                if (err.error &&
                    err.error.data &&
                    err.error.data.error &&
                    err.error.data.error.innererror &&
                    err.error.data.error.innererror.innererror) {
                    throw { message: err.error.data.error.innererror.innererror.message };
                }
                else if (err.error && err.error.data && err.error.data.error) {
                    throw { message: err.error.data.error.message };
                }
            });
        });
    };
    AzureLogAnalyticsDatasource.prototype.buildQuery = function (query, options, workspace) {
        var querystringBuilder = new _log_analytics_querystring_builder__WEBPACK_IMPORTED_MODULE_2__["default"](this.templateSrv.replace(query, {}, this.interpolateVariable), options, 'TimeGenerated');
        var querystring = querystringBuilder.generate().uriString;
        var url = this.baseUrl + "/" + workspace + "/query?" + querystring;
        var queries = [];
        queries.push({
            datasourceId: this.id,
            url: url,
            resultFormat: 'table',
        });
        return queries;
    };
    AzureLogAnalyticsDatasource.prototype.interpolateVariable = function (value, variable) {
        if (typeof value === 'string') {
            if (variable.multi || variable.includeAll) {
                return "'" + value + "'";
            }
            else {
                return value;
            }
        }
        if (typeof value === 'number') {
            return value;
        }
        var quotedValues = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(value, function (val) {
            if (typeof value === 'number') {
                return value;
            }
            return "'" + val + "'";
        });
        return quotedValues.join(',');
    };
    AzureLogAnalyticsDatasource.prototype.getDefaultOrFirstWorkspace = function () {
        var _this = this;
        if (this.defaultOrFirstWorkspace) {
            return Promise.resolve(this.defaultOrFirstWorkspace);
        }
        return this.getWorkspaces(this.subscriptionId).then(function (workspaces) {
            _this.defaultOrFirstWorkspace = workspaces[0].value;
            return _this.defaultOrFirstWorkspace;
        });
    };
    AzureLogAnalyticsDatasource.prototype.annotationQuery = function (options) {
        if (!options.annotation.rawQuery) {
            return Promise.reject({
                message: 'Query missing in annotation definition',
            });
        }
        var queries = this.buildQuery(options.annotation.rawQuery, options, options.annotation.workspace);
        var promises = this.doQueries(queries);
        return Promise.all(promises).then(function (results) {
            var annotations = new _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"](results).transformToAnnotations(options);
            return annotations;
        });
    };
    AzureLogAnalyticsDatasource.prototype.doQueries = function (queries) {
        var _this = this;
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(queries, function (query) {
            return _this.doRequest(query.url)
                .then(function (result) {
                return {
                    result: result,
                    query: query,
                };
            })
                .catch(function (err) {
                throw {
                    error: err,
                    query: query,
                };
            });
        });
    };
    AzureLogAnalyticsDatasource.prototype.doRequest = function (url, maxRetries) {
        var _this = this;
        if (maxRetries === void 0) { maxRetries = 1; }
        return this.backendSrv
            .datasourceRequest({
            url: this.url + url,
            method: 'GET',
        })
            .catch(function (error) {
            if (maxRetries > 0) {
                return _this.doRequest(url, maxRetries - 1);
            }
            throw error;
        });
    };
    AzureLogAnalyticsDatasource.prototype.testDatasource = function () {
        var _this = this;
        var validationError = this.isValidConfig();
        if (validationError) {
            return validationError;
        }
        return this.getDefaultOrFirstWorkspace()
            .then(function (ws) {
            var url = _this.baseUrl + "/" + ws + "/metadata";
            return _this.doRequest(url);
        })
            .then(function (response) {
            if (response.status === 200) {
                return {
                    status: 'success',
                    message: 'Successfully queried the Azure Log Analytics service.',
                    title: 'Success',
                };
            }
            return {
                status: 'error',
                message: 'Returned http status code ' + response.status,
            };
        })
            .catch(function (error) {
            var message = 'Azure Log Analytics: ';
            if (error.config && error.config.url && error.config.url.indexOf('workspacesloganalytics') > -1) {
                message = 'Azure Log Analytics requires access to Azure Monitor but had the following error: ';
            }
            message = _this.getErrorMessage(message, error);
            return {
                status: 'error',
                message: message,
            };
        });
    };
    AzureLogAnalyticsDatasource.prototype.getErrorMessage = function (message, error) {
        message += error.statusText ? error.statusText + ': ' : '';
        if (error.data && error.data.error && error.data.error.code) {
            message += error.data.error.code + '. ' + error.data.error.message;
        }
        else if (error.data && error.data.error) {
            message += error.data.error;
        }
        else if (error.data) {
            message += error.data;
        }
        else {
            message += 'Cannot connect to Azure Log Analytics REST API.';
        }
        return message;
    };
    AzureLogAnalyticsDatasource.prototype.isValidConfig = function () {
        if (this.instanceSettings.jsonData.azureLogAnalyticsSameAs) {
            return undefined;
        }
        if (!this.isValidConfigField(this.instanceSettings.jsonData.logAnalyticsSubscriptionId)) {
            return {
                status: 'error',
                message: 'The Subscription Id field is required.',
            };
        }
        if (!this.isValidConfigField(this.instanceSettings.jsonData.logAnalyticsTenantId)) {
            return {
                status: 'error',
                message: 'The Tenant Id field is required.',
            };
        }
        if (!this.isValidConfigField(this.instanceSettings.jsonData.logAnalyticsClientId)) {
            return {
                status: 'error',
                message: 'The Client Id field is required.',
            };
        }
        return undefined;
    };
    AzureLogAnalyticsDatasource.prototype.isValidConfigField = function (field) {
        return field && field.length > 0;
    };
    return AzureLogAnalyticsDatasource;
}());
/* harmony default export */ __webpack_exports__["default"] = (AzureLogAnalyticsDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/response_parser.ts":
/*!***************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/response_parser.ts ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");



var ResponseParser = /** @class */ (function () {
    function ResponseParser(results) {
        this.results = results;
    }
    ResponseParser.prototype.parseQueryResult = function () {
        var data = [];
        var columns = [];
        for (var i = 0; i < this.results.length; i++) {
            if (this.results[i].result.data.tables.length === 0) {
                continue;
            }
            columns = this.results[i].result.data.tables[0].columns;
            var rows = this.results[i].result.data.tables[0].rows;
            if (this.results[i].query.resultFormat === 'time_series') {
                data = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.concat(data, this.parseTimeSeriesResult(this.results[i].query, columns, rows));
            }
            else {
                data = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.concat(data, this.parseTableResult(this.results[i].query, columns, rows));
            }
        }
        return data;
    };
    ResponseParser.prototype.parseTimeSeriesResult = function (query, columns, rows) {
        var data = [];
        var timeIndex = -1;
        var metricIndex = -1;
        var valueIndex = -1;
        for (var i = 0; i < columns.length; i++) {
            if (timeIndex === -1 && columns[i].type === 'datetime') {
                timeIndex = i;
            }
            if (metricIndex === -1 && columns[i].type === 'string') {
                metricIndex = i;
            }
            if (valueIndex === -1 && ['int', 'long', 'real', 'double'].indexOf(columns[i].type) > -1) {
                valueIndex = i;
            }
        }
        if (timeIndex === -1) {
            throw new Error('No datetime column found in the result. The Time Series format requires a time column.');
        }
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(rows, function (row) {
            var epoch = ResponseParser.dateTimeToEpoch(row[timeIndex]);
            var metricName = metricIndex > -1 ? row[metricIndex] : columns[valueIndex].name;
            var bucket = ResponseParser.findOrCreateBucket(data, metricName);
            bucket.datapoints.push([row[valueIndex], epoch]);
            bucket.refId = query.refId;
            bucket.meta = {
                query: query.query,
            };
        });
        return data;
    };
    ResponseParser.prototype.parseTableResult = function (query, columns, rows) {
        var tableResult = {
            type: 'table',
            columns: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(columns, function (col) {
                return { text: col.name, type: col.type };
            }),
            rows: rows,
            refId: query.refId,
            meta: {
                query: query.query,
            },
        };
        return tableResult;
    };
    ResponseParser.prototype.parseToVariables = function () {
        var queryResult = this.parseQueryResult();
        var variables = [];
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(queryResult, function (result) {
            lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flattenDeep(result.rows), function (row) {
                variables.push({
                    text: row,
                    value: row,
                });
            });
        });
        return variables;
    };
    ResponseParser.prototype.transformToAnnotations = function (options) {
        var queryResult = this.parseQueryResult();
        var list = [];
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(queryResult, function (result) {
            var timeIndex = -1;
            var textIndex = -1;
            var tagsIndex = -1;
            for (var i = 0; i < result.columns.length; i++) {
                if (timeIndex === -1 && result.columns[i].type === 'datetime') {
                    timeIndex = i;
                }
                if (textIndex === -1 && result.columns[i].text.toLowerCase() === 'text') {
                    textIndex = i;
                }
                if (tagsIndex === -1 && result.columns[i].text.toLowerCase() === 'tags') {
                    tagsIndex = i;
                }
            }
            lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(result.rows, function (row) {
                list.push({
                    annotation: options.annotation,
                    time: Math.floor(ResponseParser.dateTimeToEpoch(row[timeIndex])),
                    text: row[textIndex] ? row[textIndex].toString() : '',
                    tags: row[tagsIndex] ? row[tagsIndex].trim().split(/\s*,\s*/) : [],
                });
            });
        });
        return list;
    };
    ResponseParser.prototype.parseSchemaResult = function () {
        return {
            Plugins: [
                {
                    Name: 'pivot',
                },
            ],
            Databases: this.createSchemaDatabaseWithTables(),
        };
    };
    ResponseParser.prototype.createSchemaDatabaseWithTables = function () {
        var databases = {
            Default: {
                Name: 'Default',
                Tables: this.createSchemaTables(),
                Functions: this.createSchemaFunctions(),
            },
        };
        return databases;
    };
    ResponseParser.prototype.createSchemaTables = function () {
        var e_1, _a, e_2, _b;
        var tables = {};
        try {
            for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.results.tables), _d = _c.next(); !_d.done; _d = _c.next()) {
                var table = _d.value;
                tables[table.name] = {
                    Name: table.name,
                    OrderedColumns: [],
                };
                try {
                    for (var _e = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(table.columns)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var col = _f.value;
                        tables[table.name].OrderedColumns.push(this.convertToKustoColumn(col));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
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
        return tables;
    };
    ResponseParser.prototype.convertToKustoColumn = function (col) {
        return {
            Name: col.name,
            Type: col.type,
        };
    };
    ResponseParser.prototype.createSchemaFunctions = function () {
        var e_3, _a;
        var functions = {};
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.results.functions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var func = _c.value;
                functions[func.name] = {
                    Name: func.name,
                    Body: func.body,
                    DocString: func.displayName,
                    Folder: func.category,
                    FunctionKind: 'Unknown',
                    InputParameters: [],
                    OutputColumns: [],
                };
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return functions;
    };
    ResponseParser.findOrCreateBucket = function (data, target) {
        var dataTarget = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(data, ['target', target]);
        if (!dataTarget) {
            dataTarget = { target: target, datapoints: [], refId: '', query: '' };
            data.push(dataTarget);
        }
        return dataTarget;
    };
    ResponseParser.dateTimeToEpoch = function (dateTimeValue) {
        return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTime"])(dateTimeValue).valueOf();
    };
    return ResponseParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (ResponseParser);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/azure_monitor_datasource.ts":
/*!******************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/azure_monitor_datasource.ts ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _url_builder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url_builder */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/url_builder.ts");
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/response_parser.ts");
/* harmony import */ var _supported_namespaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./supported_namespaces */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/supported_namespaces.ts");
/* harmony import */ var _time_grain_converter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../time_grain_converter */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");







var AzureMonitorDatasource = /** @class */ (function () {
    /** @ngInject */
    function AzureMonitorDatasource(instanceSettings, backendSrv, templateSrv) {
        this.instanceSettings = instanceSettings;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.apiVersion = '2018-01-01';
        this.apiPreviewVersion = '2017-12-01-preview';
        this.defaultDropdownValue = 'select';
        this.supportedMetricNamespaces = [];
        this.id = instanceSettings.id;
        this.subscriptionId = instanceSettings.jsonData.subscriptionId;
        this.cloudName = instanceSettings.jsonData.cloudName || 'azuremonitor';
        this.baseUrl = "/" + this.cloudName + "/subscriptions";
        this.url = instanceSettings.url;
        this.supportedMetricNamespaces = new _supported_namespaces__WEBPACK_IMPORTED_MODULE_4__["default"](this.cloudName).get();
    }
    AzureMonitorDatasource.prototype.isConfigured = function () {
        return !!this.subscriptionId && this.subscriptionId.length > 0;
    };
    AzureMonitorDatasource.prototype.query = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var queries, data, result;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queries = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(options.targets, function (item) {
                            return (item.hide !== true &&
                                item.azureMonitor.resourceGroup &&
                                item.azureMonitor.resourceGroup !== _this.defaultDropdownValue &&
                                item.azureMonitor.resourceName &&
                                item.azureMonitor.resourceName !== _this.defaultDropdownValue &&
                                item.azureMonitor.metricDefinition &&
                                item.azureMonitor.metricDefinition !== _this.defaultDropdownValue &&
                                item.azureMonitor.metricName &&
                                item.azureMonitor.metricName !== _this.defaultDropdownValue);
                        }).map(function (target) {
                            var item = target.azureMonitor;
                            // fix for timeGrainUnit which is a deprecated/removed field name
                            if (item.timeGrainUnit && item.timeGrain !== 'auto') {
                                item.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_5__["default"].createISO8601Duration(item.timeGrain, item.timeGrainUnit);
                            }
                            var subscriptionId = _this.templateSrv.replace(target.subscription || _this.subscriptionId, options.scopedVars);
                            var resourceGroup = _this.templateSrv.replace(item.resourceGroup, options.scopedVars);
                            var resourceName = _this.templateSrv.replace(item.resourceName, options.scopedVars);
                            var metricNamespace = _this.templateSrv.replace(item.metricNamespace, options.scopedVars);
                            var metricDefinition = _this.templateSrv.replace(item.metricDefinition, options.scopedVars);
                            var timeGrain = _this.templateSrv.replace((item.timeGrain || '').toString(), options.scopedVars);
                            var aggregation = _this.templateSrv.replace(item.aggregation, options.scopedVars);
                            var top = _this.templateSrv.replace(item.top || '', options.scopedVars);
                            return {
                                refId: target.refId,
                                intervalMs: options.intervalMs,
                                datasourceId: _this.id,
                                subscription: subscriptionId,
                                queryType: 'Azure Monitor',
                                type: 'timeSeriesQuery',
                                raw: false,
                                azureMonitor: {
                                    resourceGroup: resourceGroup,
                                    resourceName: resourceName,
                                    metricDefinition: metricDefinition,
                                    timeGrain: timeGrain,
                                    allowedTimeGrainsMs: item.allowedTimeGrainsMs,
                                    metricName: _this.templateSrv.replace(item.metricName, options.scopedVars),
                                    metricNamespace: metricNamespace && metricNamespace !== _this.defaultDropdownValue ? metricNamespace : metricDefinition,
                                    aggregation: aggregation,
                                    dimension: _this.templateSrv.replace(item.dimension, options.scopedVars),
                                    top: top || '10',
                                    dimensionFilter: _this.templateSrv.replace(item.dimensionFilter, options.scopedVars),
                                    alias: item.alias,
                                    format: target.format,
                                },
                            };
                        });
                        if (!queries || queries.length === 0) {
                            return [2 /*return*/, Promise.resolve([])];
                        }
                        return [4 /*yield*/, this.backendSrv.datasourceRequest({
                                url: '/api/tsdb/query',
                                method: 'POST',
                                data: {
                                    from: options.range.from.valueOf().toString(),
                                    to: options.range.to.valueOf().toString(),
                                    queries: queries,
                                },
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        result = [];
                        if (data.results) {
                            Object['values'](data.results).forEach(function (queryRes) {
                                if (!queryRes.series) {
                                    return;
                                }
                                queryRes.series.forEach(function (series) {
                                    var timeSerie = {
                                        target: series.name,
                                        datapoints: series.points,
                                        refId: queryRes.refId,
                                        meta: queryRes.meta,
                                    };
                                    result.push(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["toDataFrame"])(timeSerie));
                                });
                            });
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/, Promise.resolve([])];
                }
            });
        });
    };
    AzureMonitorDatasource.prototype.annotationQuery = function (options) { };
    AzureMonitorDatasource.prototype.metricFindQuery = function (query) {
        var subscriptionsQuery = query.match(/^Subscriptions\(\)/i);
        if (subscriptionsQuery) {
            return this.getSubscriptions();
        }
        var resourceGroupsQuery = query.match(/^ResourceGroups\(\)/i);
        if (resourceGroupsQuery) {
            return this.getResourceGroups(this.subscriptionId);
        }
        var resourceGroupsQueryWithSub = query.match(/^ResourceGroups\(([^\)]+?)(,\s?([^,]+?))?\)/i);
        if (resourceGroupsQueryWithSub) {
            return this.getResourceGroups(this.toVariable(resourceGroupsQueryWithSub[1]));
        }
        var metricDefinitionsQuery = query.match(/^Namespaces\(([^\)]+?)(,\s?([^,]+?))?\)/i);
        if (metricDefinitionsQuery) {
            if (!metricDefinitionsQuery[3]) {
                return this.getMetricDefinitions(this.subscriptionId, this.toVariable(metricDefinitionsQuery[1]));
            }
        }
        var metricDefinitionsQueryWithSub = query.match(/^Namespaces\(([^,]+?),\s?([^,]+?)\)/i);
        if (metricDefinitionsQueryWithSub) {
            return this.getMetricDefinitions(this.toVariable(metricDefinitionsQueryWithSub[1]), this.toVariable(metricDefinitionsQueryWithSub[2]));
        }
        var resourceNamesQuery = query.match(/^ResourceNames\(([^,]+?),\s?([^,]+?)\)/i);
        if (resourceNamesQuery) {
            var resourceGroup = this.toVariable(resourceNamesQuery[1]);
            var metricDefinition = this.toVariable(resourceNamesQuery[2]);
            return this.getResourceNames(this.subscriptionId, resourceGroup, metricDefinition);
        }
        var resourceNamesQueryWithSub = query.match(/^ResourceNames\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/i);
        if (resourceNamesQueryWithSub) {
            var subscription = this.toVariable(resourceNamesQueryWithSub[1]);
            var resourceGroup = this.toVariable(resourceNamesQueryWithSub[2]);
            var metricDefinition = this.toVariable(resourceNamesQueryWithSub[3]);
            return this.getResourceNames(subscription, resourceGroup, metricDefinition);
        }
        var metricNamespaceQuery = query.match(/^MetricNamespace\(([^,]+?),\s?([^,]+?),\s?([^,]+?)\)/i);
        if (metricNamespaceQuery) {
            var resourceGroup = this.toVariable(metricNamespaceQuery[1]);
            var metricDefinition = this.toVariable(metricNamespaceQuery[2]);
            var resourceName = this.toVariable(metricNamespaceQuery[3]);
            return this.getMetricNamespaces(this.subscriptionId, resourceGroup, metricDefinition, resourceName);
        }
        var metricNamespaceQueryWithSub = query.match(/^metricnamespace\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?)\)/i);
        if (metricNamespaceQueryWithSub) {
            var subscription = this.toVariable(metricNamespaceQueryWithSub[1]);
            var resourceGroup = this.toVariable(metricNamespaceQueryWithSub[2]);
            var metricDefinition = this.toVariable(metricNamespaceQueryWithSub[3]);
            var resourceName = this.toVariable(metricNamespaceQueryWithSub[4]);
            return this.getMetricNamespaces(subscription, resourceGroup, metricDefinition, resourceName);
        }
        var metricNamesQuery = query.match(/^MetricNames\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?)\)/i);
        if (metricNamesQuery) {
            if (metricNamesQuery[3].indexOf(',') === -1) {
                var resourceGroup = this.toVariable(metricNamesQuery[1]);
                var metricDefinition = this.toVariable(metricNamesQuery[2]);
                var resourceName = this.toVariable(metricNamesQuery[3]);
                var metricNamespace = this.toVariable(metricNamesQuery[4]);
                return this.getMetricNames(this.subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace);
            }
        }
        var metricNamesQueryWithSub = query.match(/^MetricNames\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?(.+?)\)/i);
        if (metricNamesQueryWithSub) {
            var subscription = this.toVariable(metricNamesQueryWithSub[1]);
            var resourceGroup = this.toVariable(metricNamesQueryWithSub[2]);
            var metricDefinition = this.toVariable(metricNamesQueryWithSub[3]);
            var resourceName = this.toVariable(metricNamesQueryWithSub[4]);
            var metricNamespace = this.toVariable(metricNamesQueryWithSub[5]);
            return this.getMetricNames(subscription, resourceGroup, metricDefinition, resourceName, metricNamespace);
        }
        return undefined;
    };
    AzureMonitorDatasource.prototype.toVariable = function (metric) {
        return this.templateSrv.replace((metric || '').trim());
    };
    AzureMonitorDatasource.prototype.getSubscriptions = function (route) {
        var url = "/" + (route || this.cloudName) + "/subscriptions?api-version=2019-03-01";
        return this.doRequest(url).then(function (result) {
            return _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"].parseSubscriptions(result);
        });
    };
    AzureMonitorDatasource.prototype.getResourceGroups = function (subscriptionId) {
        var url = this.baseUrl + "/" + subscriptionId + "/resourceGroups?api-version=" + this.apiVersion;
        return this.doRequest(url).then(function (result) {
            return _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"].parseResponseValues(result, 'name', 'name');
        });
    };
    AzureMonitorDatasource.prototype.getMetricDefinitions = function (subscriptionId, resourceGroup) {
        var _this = this;
        var url = this.baseUrl + "/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/resources?api-version=" + this.apiVersion;
        return this.doRequest(url)
            .then(function (result) {
            return _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"].parseResponseValues(result, 'type', 'type');
        })
            .then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(result, function (t) {
                for (var i = 0; i < _this.supportedMetricNamespaces.length; i++) {
                    if (t.value.toLowerCase() === _this.supportedMetricNamespaces[i].toLowerCase()) {
                        return true;
                    }
                }
                return false;
            });
        })
            .then(function (result) {
            var shouldHardcodeBlobStorage = false;
            for (var i = 0; i < result.length; i++) {
                if (result[i].value === 'Microsoft.Storage/storageAccounts') {
                    shouldHardcodeBlobStorage = true;
                    break;
                }
            }
            if (shouldHardcodeBlobStorage) {
                result.push({
                    text: 'Microsoft.Storage/storageAccounts/blobServices',
                    value: 'Microsoft.Storage/storageAccounts/blobServices',
                });
                result.push({
                    text: 'Microsoft.Storage/storageAccounts/fileServices',
                    value: 'Microsoft.Storage/storageAccounts/fileServices',
                });
                result.push({
                    text: 'Microsoft.Storage/storageAccounts/tableServices',
                    value: 'Microsoft.Storage/storageAccounts/tableServices',
                });
                result.push({
                    text: 'Microsoft.Storage/storageAccounts/queueServices',
                    value: 'Microsoft.Storage/storageAccounts/queueServices',
                });
            }
            return result;
        });
    };
    AzureMonitorDatasource.prototype.getResourceNames = function (subscriptionId, resourceGroup, metricDefinition) {
        var url = this.baseUrl + "/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/resources?api-version=" + this.apiVersion;
        return this.doRequest(url).then(function (result) {
            if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.startsWith(metricDefinition, 'Microsoft.Storage/storageAccounts/')) {
                return _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"].parseResourceNames(result, metricDefinition);
            }
            var list = _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"].parseResourceNames(result, 'Microsoft.Storage/storageAccounts');
            for (var i = 0; i < list.length; i++) {
                list[i].text += '/default';
                list[i].value += '/default';
            }
            return list;
        });
    };
    AzureMonitorDatasource.prototype.getMetricNamespaces = function (subscriptionId, resourceGroup, metricDefinition, resourceName) {
        var url = _url_builder__WEBPACK_IMPORTED_MODULE_2__["default"].buildAzureMonitorGetMetricNamespacesUrl(this.baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, this.apiPreviewVersion);
        return this.doRequest(url).then(function (result) {
            return _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"].parseResponseValues(result, 'name', 'properties.metricNamespaceName');
        });
    };
    AzureMonitorDatasource.prototype.getMetricNames = function (subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace) {
        var url = _url_builder__WEBPACK_IMPORTED_MODULE_2__["default"].buildAzureMonitorGetMetricNamesUrl(this.baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, this.apiVersion);
        return this.doRequest(url).then(function (result) {
            return _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"].parseResponseValues(result, 'name.localizedValue', 'name.value');
        });
    };
    AzureMonitorDatasource.prototype.getMetricMetadata = function (subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, metricName) {
        var url = _url_builder__WEBPACK_IMPORTED_MODULE_2__["default"].buildAzureMonitorGetMetricNamesUrl(this.baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, this.apiVersion);
        return this.doRequest(url).then(function (result) {
            return _response_parser__WEBPACK_IMPORTED_MODULE_3__["default"].parseMetadata(result, metricName);
        });
    };
    AzureMonitorDatasource.prototype.testDatasource = function () {
        if (!this.isValidConfigField(this.instanceSettings.jsonData.tenantId)) {
            return {
                status: 'error',
                message: 'The Tenant Id field is required.',
            };
        }
        if (!this.isValidConfigField(this.instanceSettings.jsonData.clientId)) {
            return {
                status: 'error',
                message: 'The Client Id field is required.',
            };
        }
        var url = "/" + this.cloudName + "/subscriptions?api-version=2019-03-01";
        return this.doRequest(url)
            .then(function (response) {
            if (response.status === 200) {
                return {
                    status: 'success',
                    message: 'Successfully queried the Azure Monitor service.',
                    title: 'Success',
                };
            }
            return {
                status: 'error',
                message: 'Returned http status code ' + response.status,
            };
        })
            .catch(function (error) {
            var message = 'Azure Monitor: ';
            message += error.statusText ? error.statusText + ': ' : '';
            if (error.data && error.data.error && error.data.error.code) {
                message += error.data.error.code + '. ' + error.data.error.message;
            }
            else if (error.data && error.data.error) {
                message += error.data.error;
            }
            else if (error.data) {
                message += error.data;
            }
            else {
                message += 'Cannot connect to Azure Monitor REST API.';
            }
            return {
                status: 'error',
                message: message,
            };
        });
    };
    AzureMonitorDatasource.prototype.isValidConfigField = function (field) {
        return field && field.length > 0;
    };
    AzureMonitorDatasource.prototype.doRequest = function (url, maxRetries) {
        var _this = this;
        if (maxRetries === void 0) { maxRetries = 1; }
        return this.backendSrv
            .datasourceRequest({
            url: this.url + url,
            method: 'GET',
        })
            .catch(function (error) {
            if (maxRetries > 0) {
                return _this.doRequest(url, maxRetries - 1);
            }
            throw error;
        });
    };
    return AzureMonitorDatasource;
}());
/* harmony default export */ __webpack_exports__["default"] = (AzureMonitorDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/response_parser.ts":
/*!*********************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/response_parser.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _time_grain_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../time_grain_converter */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts");


var ResponseParser = /** @class */ (function () {
    function ResponseParser() {
    }
    ResponseParser.parseResponseValues = function (result, textFieldName, valueFieldName) {
        var list = [];
        if (!result) {
            return list;
        }
        for (var i = 0; i < result.data.value.length; i++) {
            if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(list, ['value', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)])) {
                var value = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName);
                var text = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], textFieldName, value);
                list.push({
                    text: text,
                    value: value,
                });
            }
        }
        return list;
    };
    ResponseParser.parseResourceNames = function (result, metricDefinition) {
        var list = [];
        if (!result) {
            return list;
        }
        for (var i = 0; i < result.data.value.length; i++) {
            if (result.data.value[i].type === metricDefinition) {
                list.push({
                    text: result.data.value[i].name,
                    value: result.data.value[i].name,
                });
            }
        }
        return list;
    };
    ResponseParser.parseMetadata = function (result, metricName) {
        var defaultAggTypes = ['None', 'Average', 'Minimum', 'Maximum', 'Total', 'Count'];
        if (!result) {
            return {
                primaryAggType: '',
                supportedAggTypes: defaultAggTypes,
                supportedTimeGrains: [],
                dimensions: [],
            };
        }
        var metricData = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(result.data.value, function (o) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(o, 'name.value') === metricName;
        });
        return {
            primaryAggType: metricData.primaryAggregationType,
            supportedAggTypes: metricData.supportedAggregationTypes || defaultAggTypes,
            supportedTimeGrains: ResponseParser.parseTimeGrains(metricData.metricAvailabilities || []),
            dimensions: ResponseParser.parseDimensions(metricData),
        };
    };
    ResponseParser.parseTimeGrains = function (metricAvailabilities) {
        var timeGrains = [];
        if (!metricAvailabilities) {
            return timeGrains;
        }
        metricAvailabilities.forEach(function (avail) {
            if (avail.timeGrain) {
                timeGrains.push({
                    text: _time_grain_converter__WEBPACK_IMPORTED_MODULE_1__["default"].createTimeGrainFromISO8601Duration(avail.timeGrain),
                    value: avail.timeGrain,
                });
            }
        });
        return timeGrains;
    };
    ResponseParser.parseDimensions = function (metricData) {
        var dimensions = [];
        if (!metricData.dimensions || metricData.dimensions.length === 0) {
            return dimensions;
        }
        if (!metricData.isDimensionRequired) {
            dimensions.push({ text: 'None', value: 'None' });
        }
        for (var i = 0; i < metricData.dimensions.length; i++) {
            var text = metricData.dimensions[i].localizedValue;
            var value = metricData.dimensions[i].value;
            dimensions.push({
                text: !text ? value : text,
                value: value,
            });
        }
        return dimensions;
    };
    ResponseParser.parseSubscriptions = function (result) {
        var list = [];
        if (!result) {
            return list;
        }
        var valueFieldName = 'subscriptionId';
        var textFieldName = 'displayName';
        for (var i = 0; i < result.data.value.length; i++) {
            if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(list, ['value', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)])) {
                list.push({
                    text: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], textFieldName) + " - " + lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName),
                    value: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName),
                });
            }
        }
        return list;
    };
    ResponseParser.parseSubscriptionsForSelect = function (result) {
        var list = [];
        if (!result) {
            return list;
        }
        var valueFieldName = 'subscriptionId';
        var textFieldName = 'displayName';
        for (var i = 0; i < result.data.value.length; i++) {
            if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(list, ['value', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName)])) {
                list.push({
                    label: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], textFieldName) + " - " + lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName),
                    value: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], valueFieldName),
                });
            }
        }
        return list;
    };
    ResponseParser.parseWorkspacesForSelect = function (result) {
        var list = [];
        if (!result) {
            return list;
        }
        var valueFieldName = 'customerId';
        var textFieldName = 'name';
        for (var i = 0; i < result.data.value.length; i++) {
            if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(list, ['value', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i].properties, valueFieldName)])) {
                list.push({
                    label: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i], textFieldName),
                    value: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(result.data.value[i].properties, valueFieldName),
                });
            }
        }
        return list;
    };
    return ResponseParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (ResponseParser);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/supported_namespaces.ts":
/*!**************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/supported_namespaces.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var SupportedNamespaces = /** @class */ (function () {
    function SupportedNamespaces(cloudName) {
        this.cloudName = cloudName;
        this.supportedMetricNamespaces = {
            azuremonitor: [
                'Microsoft.AnalysisServices/servers',
                'Microsoft.ApiManagement/service',
                'Microsoft.Automation/automationAccounts',
                'Microsoft.Batch/batchAccounts',
                'Microsoft.Cache/redis',
                'Microsoft.ClassicCompute/virtualMachines',
                'Microsoft.ClassicCompute/domainNames/slots/roles',
                'Microsoft.CognitiveServices/accounts',
                'Microsoft.Compute/virtualMachines',
                'Microsoft.Compute/virtualMachineScaleSets',
                'Microsoft.ContainerInstance/containerGroups',
                'Microsoft.ContainerRegistry/registries',
                'Microsoft.ContainerService/managedClusters',
                'Microsoft.CustomerInsights/hubs',
                'Microsoft.DataBoxEdge/dataBoxEdgeDevices',
                'Microsoft.DataFactory/datafactories',
                'Microsoft.DataFactory/factories',
                'Microsoft.DataLakeAnalytics/accounts',
                'Microsoft.DataLakeStore/accounts',
                'Microsoft.DBforMariaDB/servers',
                'Microsoft.DBforMySQL/servers',
                'Microsoft.DBforPostgreSQL/servers',
                'Microsoft.Devices/IotHubs',
                'Microsoft.Devices/provisioningServices',
                'Microsoft.DocumentDB/databaseAccounts',
                'Microsoft.EventGrid/topics',
                'Microsoft.EventGrid/eventSubscriptions',
                'Microsoft.EventGrid/extensionTopics',
                'Microsoft.EventHub/namespaces',
                'Microsoft.EventHub/clusters',
                'Microsoft.HDInsight/clusters',
                'Microsoft.Insights/AutoscaleSettings',
                'Microsoft.Insights/components',
                'Microsoft.KeyVault/vaults',
                'Microsoft.Kusto/clusters',
                'Microsoft.LocationBasedServices/accounts',
                'Microsoft.Logic/workflows',
                'Microsoft.Logic/integrationServiceEnvironments',
                'Microsoft.NetApp/netAppAccounts/capacityPools',
                'Microsoft.NetApp/netAppAccounts/capacityPools/Volumes',
                'Microsoft.Network/networkInterfaces',
                'Microsoft.Network/loadBalancers',
                'Microsoft.Network/dnsZones',
                'Microsoft.Network/publicIPAddresses',
                'Microsoft.Network/azureFirewalls',
                'Microsoft.Network/applicationGateways',
                'Microsoft.Network/virtualNetworkGateways',
                'Microsoft.Network/expressRouteCircuits',
                'Microsoft.Network/expressRouteCircuits/Peerings',
                'Microsoft.Network/connections',
                'Microsoft.Network/trafficManagerProfiles',
                'Microsoft.Network/networkWatchers/connectionMonitors',
                'Microsoft.Network/frontdoors',
                'Microsoft.NotificationHubs/namespaces/notificationHubs',
                'Microsoft.OperationalInsights/workspaces',
                'Microsoft.PowerBIDedicated/capacities',
                'Microsoft.Relay/namespaces',
                'Microsoft.Search/searchServices',
                'Microsoft.ServiceBus/namespaces',
                'Microsoft.Sql/servers/databases',
                'Microsoft.Sql/servers/elasticPools',
                'Microsoft.Sql/managedInstances',
                'Microsoft.Storage/storageAccounts',
                'Microsoft.Storage/storageAccounts/blobServices',
                'Microsoft.Storage/storageAccounts/fileServices',
                'Microsoft.Storage/storageAccounts/queueServices',
                'Microsoft.Storage/storageAccounts/tableServices',
                'Microsoft.StorageSync/storageSyncServices',
                'Microsoft.StorageSync/storageSyncServices/syncGroups',
                'Microsoft.StorageSync/storageSyncServices/syncGroups/serverEndpoints',
                'Microsoft.StorageSync/storageSyncServices/registeredServers',
                'Microsoft.StreamAnalytics/streamingJobs',
                'Microsoft.Web/serverfarms',
                'Microsoft.Web/sites',
                'Microsoft.Web/sites/slots',
                'Microsoft.Web/hostingEnvironments/multiRolePools',
                'Microsoft.Web/hostingEnvironments/workerPools',
            ],
            govazuremonitor: [
                'Microsoft.AnalysisServices/servers',
                'Microsoft.ApiManagement/service',
                'Microsoft.Batch/batchAccounts',
                'Microsoft.Cache/redis',
                'Microsoft.ClassicCompute/virtualMachines',
                'Microsoft.ClassicCompute/domainNames/slots/roles',
                'Microsoft.CognitiveServices/accounts',
                'Microsoft.Compute/virtualMachines',
                'Microsoft.Compute/virtualMachineScaleSets',
                'Microsoft.ContainerRegistry/registries',
                'Microsoft.DBforMySQL/servers',
                'Microsoft.DBforPostgreSQL/servers',
                'Microsoft.Devices/IotHubs',
                'Microsoft.Devices/provisioningServices',
                'Microsoft.EventGrid/topics',
                'Microsoft.EventGrid/eventSubscriptions',
                'Microsoft.EventGrid/extensionTopics',
                'Microsoft.EventHub/namespaces',
                'Microsoft.EventHub/clusters',
                'Microsoft.Insights/AutoscaleSettings',
                'Microsoft.KeyVault/vaults',
                'Microsoft.Logic/workflows',
                'Microsoft.Network/networkInterfaces',
                'Microsoft.Network/loadBalancers',
                'Microsoft.Network/dnsZones',
                'Microsoft.Network/publicIPAddresses',
                'Microsoft.Network/azureFirewalls',
                'Microsoft.Network/applicationGateways',
                'Microsoft.Network/virtualNetworkGateways',
                'Microsoft.Network/expressRouteCircuits',
                'Microsoft.Network/expressRouteCircuits/Peerings',
                'Microsoft.Network/connections',
                'Microsoft.Network/trafficManagerProfiles',
                'Microsoft.Network/networkWatchers/connectionMonitors',
                'Microsoft.Network/frontdoors',
                'Microsoft.NotificationHubs/namespaces/notificationHubs',
                'Microsoft.OperationalInsights/workspaces',
                'Microsoft.PowerBIDedicated/capacities',
                'Microsoft.Relay/namespaces',
                'Microsoft.ServiceBus/namespaces',
                'Microsoft.Sql/servers/databases',
                'Microsoft.Sql/servers/elasticPools',
                'Microsoft.Sql/managedInstances',
                'Microsoft.Storage/storageAccounts',
                'Microsoft.Storage/storageAccounts/blobServices',
                'Microsoft.Storage/storageAccounts/fileServices',
                'Microsoft.Storage/storageAccounts/queueServices',
                'Microsoft.Storage/storageAccounts/tableServices',
                'Microsoft.Web/serverfarms',
                'Microsoft.Web/sites',
                'Microsoft.Web/sites/slots',
                'Microsoft.Web/hostingEnvironments/multiRolePools',
                'Microsoft.Web/hostingEnvironments/workerPools',
            ],
            germanyazuremonitor: [
                'Microsoft.AnalysisServices/servers',
                'Microsoft.Batch/batchAccounts',
                'Microsoft.Cache/redis',
                'Microsoft.ClassicCompute/virtualMachines',
                'Microsoft.ClassicCompute/domainNames/slots/roles',
                'Microsoft.Compute/virtualMachines',
                'Microsoft.Compute/virtualMachineScaleSets',
                'Microsoft.DBforMySQL/servers',
                'Microsoft.DBforPostgreSQL/servers',
                'Microsoft.Devices/IotHubs',
                'Microsoft.Devices/provisioningServices',
                'Microsoft.EventHub/namespaces',
                'Microsoft.EventHub/clusters',
                'Microsoft.Insights/AutoscaleSettings',
                'Microsoft.KeyVault/vaults',
                'Microsoft.Network/networkInterfaces',
                'Microsoft.Network/loadBalancers',
                'Microsoft.Network/dnsZones',
                'Microsoft.Network/publicIPAddresses',
                'Microsoft.Network/azureFirewalls',
                'Microsoft.Network/applicationGateways',
                'Microsoft.Network/virtualNetworkGateways',
                'Microsoft.Network/expressRouteCircuits',
                'Microsoft.Network/expressRouteCircuits/Peerings',
                'Microsoft.Network/connections',
                'Microsoft.Network/trafficManagerProfiles',
                'Microsoft.Network/networkWatchers/connectionMonitors',
                'Microsoft.Network/frontdoors',
                'Microsoft.NotificationHubs/namespaces/notificationHubs',
                'Microsoft.OperationalInsights/workspaces',
                'Microsoft.PowerBIDedicated/capacities',
                'Microsoft.Relay/namespaces',
                'Microsoft.ServiceBus/namespaces',
                'Microsoft.Sql/servers/databases',
                'Microsoft.Sql/servers/elasticPools',
                'Microsoft.Sql/managedInstances',
                'Microsoft.Storage/storageAccounts',
                'Microsoft.Storage/storageAccounts/blobServices',
                'Microsoft.Storage/storageAccounts/fileServices',
                'Microsoft.Storage/storageAccounts/queueServices',
                'Microsoft.Storage/storageAccounts/tableServices',
                'Microsoft.StreamAnalytics/streamingJobs',
                'Microsoft.Web/serverfarms',
                'Microsoft.Web/sites',
                'Microsoft.Web/sites/slots',
                'Microsoft.Web/hostingEnvironments/multiRolePools',
                'Microsoft.Web/hostingEnvironments/workerPools',
            ],
            chinaazuremonitor: [
                'Microsoft.AnalysisServices/servers',
                'Microsoft.Batch/batchAccounts',
                'Microsoft.Cache/redis',
                'Microsoft.ClassicCompute/virtualMachines',
                'Microsoft.ClassicCompute/domainNames/slots/roles',
                'Microsoft.CognitiveServices/accounts',
                'Microsoft.Compute/virtualMachines',
                'Microsoft.Compute/virtualMachineScaleSets',
                'Microsoft.ContainerRegistry/registries',
                'Microsoft.DBforMySQL/servers',
                'Microsoft.DBforPostgreSQL/servers',
                'Microsoft.Devices/IotHubs',
                'Microsoft.Devices/provisioningServices',
                'Microsoft.EventHub/namespaces',
                'Microsoft.Insights/AutoscaleSettings',
                'Microsoft.KeyVault/vaults',
                'Microsoft.Logic/workflows',
                'Microsoft.Network/networkInterfaces',
                'Microsoft.Network/loadBalancers',
                'Microsoft.Network/dnsZones',
                'Microsoft.Network/publicIPAddresses',
                'Microsoft.Network/azureFirewalls',
                'Microsoft.Network/applicationGateways',
                'Microsoft.Network/virtualNetworkGateways',
                'Microsoft.Network/expressRouteCircuits',
                'Microsoft.Network/expressRouteCircuits/Peerings',
                'Microsoft.Network/connections',
                'Microsoft.Network/trafficManagerProfiles',
                'Microsoft.Network/networkWatchers/connectionMonitors',
                'Microsoft.Network/frontdoors',
                'Microsoft.NotificationHubs/namespaces/notificationHubs',
                'Microsoft.PowerBIDedicated/capacities',
                'Microsoft.Relay/namespaces',
                'Microsoft.ServiceBus/namespaces',
                'Microsoft.Sql/servers/databases',
                'Microsoft.Sql/servers/elasticPools',
                'Microsoft.Sql/managedInstances',
                'Microsoft.Storage/storageAccounts',
                'Microsoft.Storage/storageAccounts/blobServices',
                'Microsoft.Storage/storageAccounts/fileServices',
                'Microsoft.Storage/storageAccounts/queueServices',
                'Microsoft.Storage/storageAccounts/tableServices',
                'Microsoft.StreamAnalytics/streamingJobs',
                'Microsoft.Web/serverfarms',
                'Microsoft.Web/sites',
                'Microsoft.Web/sites/slots',
                'Microsoft.Web/hostingEnvironments/multiRolePools',
                'Microsoft.Web/hostingEnvironments/workerPools',
            ],
        };
    }
    SupportedNamespaces.prototype.get = function () {
        return this.supportedMetricNamespaces[this.cloudName];
    };
    return SupportedNamespaces;
}());
/* harmony default export */ __webpack_exports__["default"] = (SupportedNamespaces);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/url_builder.ts":
/*!*****************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/url_builder.ts ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var UrlBuilder = /** @class */ (function () {
    function UrlBuilder() {
    }
    UrlBuilder.buildAzureMonitorGetMetricNamespacesUrl = function (baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, apiVersion) {
        if ((metricDefinition.match(/\//g) || []).length > 1) {
            var rn = resourceName.split('/');
            var service = metricDefinition.substring(metricDefinition.lastIndexOf('/') + 1);
            var md = metricDefinition.substring(0, metricDefinition.lastIndexOf('/'));
            return (baseUrl + "/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/providers/" + md + "/" + rn[0] + "/" + service + "/" + rn[1] +
                ("/providers/microsoft.insights/metricNamespaces?api-version=" + apiVersion));
        }
        return (baseUrl + "/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/providers/" + metricDefinition + "/" + resourceName +
            ("/providers/microsoft.insights/metricNamespaces?api-version=" + apiVersion));
    };
    UrlBuilder.buildAzureMonitorGetMetricNamesUrl = function (baseUrl, subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, apiVersion) {
        if ((metricDefinition.match(/\//g) || []).length > 1) {
            var rn = resourceName.split('/');
            var service = metricDefinition.substring(metricDefinition.lastIndexOf('/') + 1);
            var md = metricDefinition.substring(0, metricDefinition.lastIndexOf('/'));
            return (baseUrl + "/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/providers/" + md + "/" + rn[0] + "/" + service + "/" + rn[1] +
                ("/providers/microsoft.insights/metricdefinitions?api-version=" + apiVersion + "&metricnamespace=" + encodeURIComponent(metricNamespace)));
        }
        return (baseUrl + "/" + subscriptionId + "/resourceGroups/" + resourceGroup + "/providers/" + metricDefinition + "/" + resourceName +
            ("/providers/microsoft.insights/metricdefinitions?api-version=" + apiVersion + "&metricnamespace=" + encodeURIComponent(metricNamespace)));
    };
    return UrlBuilder;
}());
/* harmony default export */ __webpack_exports__["default"] = (UrlBuilder);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AnalyticsConfig.tsx":
/*!*******************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AnalyticsConfig.tsx ***!
  \*******************************************************************************************************/
/*! exports provided: AnalyticsConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnalyticsConfig", function() { return AnalyticsConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AzureCredentialsForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AzureCredentialsForm */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AzureCredentialsForm.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");




var AnalyticsConfig = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AnalyticsConfig, _super);
    function AnalyticsConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onLogAnalyticsTenantIdChange = function (event) {
            _this.props.onUpdateOption('logAnalyticsTenantId', event.target.value);
        };
        _this.onLogAnalyticsClientIdChange = function (event) {
            _this.props.onUpdateOption('logAnalyticsClientId', event.target.value);
        };
        _this.onLogAnalyticsClientSecretChange = function (event) {
            _this.props.onUpdateSecureOption('logAnalyticsClientSecret', event.target.value);
        };
        _this.onLogAnalyticsSubscriptionSelect = function (logAnalyticsSubscription) {
            _this.props.onUpdateOption('logAnalyticsSubscriptionId', logAnalyticsSubscription.value);
        };
        _this.onWorkspaceSelectChange = function (logAnalyticsDefaultWorkspace) {
            _this.props.onUpdateOption('logAnalyticsDefaultWorkspace', logAnalyticsDefaultWorkspace.value);
        };
        _this.onAzureLogAnalyticsSameAsChange = function () {
            var _a = _this.props, options = _a.options, onUpdateOptions = _a.onUpdateOptions, makeSameAs = _a.makeSameAs;
            if (!options.jsonData.azureLogAnalyticsSameAs && options.secureJsonData.clientSecret) {
                makeSameAs();
            }
            else if (!options.jsonData.azureLogAnalyticsSameAs) {
                // if currently off, clear monitor secret
                onUpdateOptions(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), { azureLogAnalyticsSameAs: !options.jsonData.azureLogAnalyticsSameAs }), secureJsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.secureJsonData), { clientSecret: '' }), secureJsonFields: {
                        clientSecret: false,
                    } }));
            }
            else {
                _this.props.onUpdateOption('azureLogAnalyticsSameAs', !options.jsonData.azureLogAnalyticsSameAs);
            }
            // init popover to warn secret needs to be re-entered
        };
        _this.onLogAnalyticsResetClientSecret = function () {
            _this.props.onResetOptionKey('logAnalyticsClientSecret');
        };
        _this.hasWorkspaceRequiredFields = function () {
            var _a = _this.props.options, jsonData = _a.jsonData, secureJsonData = _a.secureJsonData, secureJsonFields = _a.secureJsonFields;
            if (jsonData.azureLogAnalyticsSameAs) {
                return (jsonData.tenantId &&
                    jsonData.clientId &&
                    jsonData.subscriptionId &&
                    (secureJsonData.clientSecret || secureJsonFields.clientSecret));
            }
            return (jsonData.logAnalyticsTenantId &&
                jsonData.logAnalyticsTenantId.length &&
                jsonData.logAnalyticsClientId &&
                jsonData.logAnalyticsClientId.length &&
                jsonData.logAnalyticsSubscriptionId &&
                (secureJsonFields.logAnalyticsClientSecret || secureJsonData.logAnalyticsClientSecret));
        };
        return _this;
    }
    AnalyticsConfig.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.options, jsonData = _b.jsonData, secureJsonData = _b.secureJsonData, secureJsonFields = _b.secureJsonFields, subscriptions = _a.subscriptions, workspaces = _a.workspaces;
        if (!jsonData.hasOwnProperty('azureLogAnalyticsSameAs')) {
            jsonData.azureLogAnalyticsSameAs = true;
        }
        var addtlAttrs = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, (jsonData.azureLogAnalyticsSameAs && {
            tooltip: 'Workspaces are pulled from default subscription selected above.',
        }));
        var showSameAsHelpMsg = jsonData.azureLogAnalyticsSameAs &&
            secureJsonFields &&
            !secureJsonFields.clientSecret &&
            !secureJsonData.clientSecret;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Azure Log Analytics API Details"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ label: "Same details as Azure Monitor API", checked: jsonData.azureLogAnalyticsSameAs, onChange: this.onAzureLogAnalyticsSameAsChange }, addtlAttrs)),
            showSameAsHelpMsg && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "grafana-info-box m-t-2" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-body" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Re-enter your Azure Monitor Client Secret to use this setting.")))),
            !jsonData.azureLogAnalyticsSameAs && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AzureCredentialsForm__WEBPACK_IMPORTED_MODULE_2__["AzureCredentialsForm"], { subscriptionOptions: subscriptions, selectedSubscription: jsonData.logAnalyticsSubscriptionId, tenantId: jsonData.logAnalyticsTenantId, clientId: jsonData.logAnalyticsClientId, clientSecret: secureJsonData.logAnalyticsClientSecret, clientSecretConfigured: secureJsonFields.logAnalyticsClientSecret, onSubscriptionSelectChange: this.onLogAnalyticsSubscriptionSelect, onTenantIdChange: this.onLogAnalyticsTenantIdChange, onClientIdChange: this.onLogAnalyticsClientIdChange, onClientSecretChange: this.onLogAnalyticsClientSecretChange, onResetClientSecret: this.onLogAnalyticsResetClientSecret, onLoadSubscriptions: function () { return _this.props.onLoadSubscriptions('workspacesloganalytics'); } })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { className: "width-12", tooltip: "Choose the default/preferred Workspace for Azure Log Analytics queries." }, "Default Workspace"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-25" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], { value: workspaces.find(function (workspace) { return workspace.value === jsonData.logAnalyticsDefaultWorkspace; }), options: workspaces, defaultValue: jsonData.logAnalyticsDefaultWorkspace, onChange: this.onWorkspaceSelectChange })))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "max-width-30 gf-form-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: "secondary", size: "sm", type: "button", onClick: function () { return _this.props.onLoadWorkspaces(); }, disabled: !this.hasWorkspaceRequiredFields() }, "Load Workspaces")))))));
    };
    return AnalyticsConfig;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (AnalyticsConfig);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AzureCredentialsForm.tsx":
/*!************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AzureCredentialsForm.tsx ***!
  \************************************************************************************************************/
/*! exports provided: AzureCredentialsForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureCredentialsForm", function() { return AzureCredentialsForm; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");



var AzureCredentialsForm = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AzureCredentialsForm, _super);
    function AzureCredentialsForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AzureCredentialsForm.prototype.render = function () {
        var _a = this.props, selectedAzureCloud = _a.selectedAzureCloud, selectedSubscription = _a.selectedSubscription, tenantId = _a.tenantId, clientId = _a.clientId, clientSecret = _a.clientSecret, clientSecretConfigured = _a.clientSecretConfigured, azureCloudOptions = _a.azureCloudOptions, subscriptionOptions = _a.subscriptionOptions, onAzureCloudChange = _a.onAzureCloudChange, onSubscriptionSelectChange = _a.onSubscriptionSelectChange, onTenantIdChange = _a.onTenantIdChange, onClientIdChange = _a.onClientIdChange, onClientSecretChange = _a.onClientSecretChange, onResetClientSecret = _a.onResetClientSecret, onLoadSubscriptions = _a.onLoadSubscriptions;
        var hasRequiredFields = tenantId && clientId && (clientSecret || clientSecretConfigured);
        var hasSubscriptions = onLoadSubscriptions && subscriptionOptions;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                azureCloudOptions && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12", tooltip: "Choose an Azure Cloud." }, "Azure Cloud"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { className: "width-15", value: azureCloudOptions.find(function (azureCloud) { return azureCloud.value === selectedAzureCloud; }), options: azureCloudOptions, defaultValue: selectedAzureCloud, onChange: onAzureCloudChange })))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12" }, "Directory (tenant) ID"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-15" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", value: tenantId || '', onChange: onTenantIdChange })))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12" }, "Application (client) ID"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-15" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", value: clientId || '', onChange: onClientIdChange })))),
                clientSecretConfigured ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12" }, "Client Secret"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-25", placeholder: "configured", disabled: true })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "max-width-30 gf-form-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: "secondary", type: "button", onClick: onResetClientSecret }, "reset"))))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12" }, "Client Secret"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-15" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", value: clientSecret || '', onChange: onClientSecretChange }))))),
                hasSubscriptions && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12" }, "Default Subscription"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-25" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { value: subscriptionOptions.find(function (subscription) { return subscription.value === selectedSubscription; }), options: subscriptionOptions, defaultValue: selectedSubscription, onChange: onSubscriptionSelectChange })))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "max-width-30 gf-form-inline" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: "secondary", size: "sm", type: "button", onClick: onLoadSubscriptions, disabled: !hasRequiredFields }, "Load Subscriptions")))))))));
    };
    return AzureCredentialsForm;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (AzureCredentialsForm);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/ConfigEditor.tsx":
/*!****************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/ConfigEditor.tsx ***!
  \****************************************************************************************************/
/*! exports provided: ConfigEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _MonitorConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MonitorConfig */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/MonitorConfig.tsx");
/* harmony import */ var _AnalyticsConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnalyticsConfig */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AnalyticsConfig.tsx");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var _InsightsConfig__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InsightsConfig */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/InsightsConfig.tsx");
/* harmony import */ var _azure_monitor_response_parser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../azure_monitor/response_parser */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/response_parser.ts");
/* harmony import */ var app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/utils/CancelablePromise */ "./public/app/core/utils/CancelablePromise.ts");










var ConfigEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ConfigEditor, _super);
    function ConfigEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.initPromise = null;
        _this.backendSrv = null;
        _this.templateSrv = null;
        _this.init = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSubscriptions()];
                    case 1:
                        _a.sent();
                        if (!!this.props.options.jsonData.azureLogAnalyticsSameAs) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getLogAnalyticsSubscriptions()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.updateOption = function (key, val) {
            Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["updateDatasourcePluginJsonDataOption"])(_this.props, key, val);
        };
        _this.updateSecureOption = function (key, val) {
            Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["updateDatasourcePluginSecureJsonDataOption"])(_this.props, key, val);
        };
        _this.resetKey = function (key) {
            Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["updateDatasourcePluginResetOption"])(_this.props, key);
        };
        _this.makeSameAs = function (updatedClientSecret) {
            var options = _this.props.options;
            var clientSecret = updatedClientSecret || options.secureJsonData.clientSecret;
            _this.updateOptions(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), { azureLogAnalyticsSameAs: true, logAnalyticsSubscriptionId: options.jsonData.subscriptionId, logAnalyticsTenantId: options.jsonData.tenantId, logAnalyticsClientId: options.jsonData.clientId }), secureJsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.secureJsonData), { clientSecret: clientSecret, logAnalyticsClientSecret: clientSecret }) }));
        };
        _this.updateOptions = function (options) {
            if (options.hasOwnProperty('secureJsonData')) {
                if (options.secureJsonData.hasOwnProperty('clientSecret') && options.secureJsonData.clientSecret.length === 0) {
                    delete options.secureJsonData.clientSecret;
                }
                if (options.secureJsonData.hasOwnProperty('logAnalyticsClientSecret') &&
                    options.secureJsonData.logAnalyticsClientSecret.length === 0) {
                    delete options.secureJsonData.logAnalyticsClientSecret;
                }
                if (options.secureJsonData.hasOwnProperty('appInsightsApiKey') &&
                    options.secureJsonData.appInsightsApiKey.length === 0) {
                    delete options.secureJsonData.appInsightsApiKey;
                }
            }
            _this.props.onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options));
        };
        _this.hasNecessaryCredentials = function () {
            if (!_this.props.options.secureJsonFields.clientSecret && !_this.props.options.secureJsonData.clientSecret) {
                return false;
            }
            if (!_this.props.options.jsonData.clientId || !_this.props.options.jsonData.tenantId) {
                return false;
            }
            return true;
        };
        _this.logAnalyticsHasNecessaryCredentials = function () {
            if (!_this.props.options.secureJsonFields.logAnalyticsClientSecret &&
                !_this.props.options.secureJsonData.logAnalyticsClientSecret) {
                return false;
            }
            if (!_this.props.options.jsonData.logAnalyticsClientId || !_this.props.options.jsonData.logAnalyticsTenantId) {
                return false;
            }
            return true;
        };
        _this.onLoadSubscriptions = function (type) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.backendSrv
                            .put("/api/datasources/" + this.props.options.id, this.props.options)
                            .then(function (result) {
                            Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["updateDatasourcePluginOption"])(_this.props, 'version', result.version);
                        })];
                    case 1:
                        _a.sent();
                        if (type && type === 'workspacesloganalytics') {
                            this.getLogAnalyticsSubscriptions();
                        }
                        else {
                            this.getSubscriptions();
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.loadSubscriptions = function (route) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var url, result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "/" + (route || this.props.options.jsonData.cloudName) + "/subscriptions?api-version=2019-03-01";
                        return [4 /*yield*/, this.backendSrv.datasourceRequest({
                                url: this.props.options.url + url,
                                method: 'GET',
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, _azure_monitor_response_parser__WEBPACK_IMPORTED_MODULE_8__["default"].parseSubscriptionsForSelect(result)];
                }
            });
        }); };
        _this.loadWorkspaces = function (subscription) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var _a, azureLogAnalyticsSameAs, cloudName, logAnalyticsSubscriptionId, azureMonitorUrl, subscriptionId, azureCloud, workspaceListUrl, result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props.options.jsonData, azureLogAnalyticsSameAs = _a.azureLogAnalyticsSameAs, cloudName = _a.cloudName, logAnalyticsSubscriptionId = _a.logAnalyticsSubscriptionId;
                        azureMonitorUrl = '', subscriptionId = this.templateSrv.replace(subscription || this.props.options.jsonData.subscriptionId);
                        if (!!subscriptionId || !!azureLogAnalyticsSameAs) {
                            azureCloud = cloudName || 'azuremonitor';
                            azureMonitorUrl = "/" + azureCloud + "/subscriptions";
                        }
                        else {
                            subscriptionId = logAnalyticsSubscriptionId;
                            azureMonitorUrl = "/workspacesloganalytics/subscriptions";
                        }
                        workspaceListUrl = azureMonitorUrl +
                            ("/" + subscriptionId + "/providers/Microsoft.OperationalInsights/workspaces?api-version=2017-04-26-preview");
                        return [4 /*yield*/, this.backendSrv.datasourceRequest({
                                url: this.props.options.url + workspaceListUrl,
                                method: 'GET',
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, _azure_monitor_response_parser__WEBPACK_IMPORTED_MODULE_8__["default"].parseWorkspacesForSelect(result)];
                }
            });
        }); };
        _this.getSubscriptions = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var subscriptions;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasNecessaryCredentials()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadSubscriptions()];
                    case 1:
                        subscriptions = ((_a.sent()) || []);
                        if (subscriptions && subscriptions.length > 0) {
                            this.setState({ subscriptions: subscriptions });
                            this.updateOption('subscriptionId', this.props.options.jsonData.subscriptionId || subscriptions[0].value);
                        }
                        if (!(this.props.options.jsonData.subscriptionId && this.props.options.jsonData.azureLogAnalyticsSameAs)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getWorkspaces()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getLogAnalyticsSubscriptions = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var logAnalyticsSubscriptions;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.logAnalyticsHasNecessaryCredentials()) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadSubscriptions('workspacesloganalytics')];
                    case 1:
                        logAnalyticsSubscriptions = ((_a.sent()) ||
                            []);
                        if (logAnalyticsSubscriptions && logAnalyticsSubscriptions.length > 0) {
                            this.setState({ logAnalyticsSubscriptions: logAnalyticsSubscriptions });
                            this.updateOption('logAnalyticsSubscriptionId', this.props.options.jsonData.logAnalyticsSubscriptionId || logAnalyticsSubscriptions[0].value);
                        }
                        if (!this.props.options.jsonData.logAnalyticsSubscriptionId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getWorkspaces()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getWorkspaces = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var sameAs, logAnalyticsWorkspaces;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sameAs = this.props.options.jsonData.azureLogAnalyticsSameAs && this.props.options.jsonData.subscriptionId;
                        if (!sameAs && !this.props.options.jsonData.logAnalyticsSubscriptionId) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.loadWorkspaces(sameAs ? this.props.options.jsonData.subscriptionId : this.props.options.jsonData.logAnalyticsSubscriptionId)];
                    case 1:
                        logAnalyticsWorkspaces = _a.sent();
                        if (logAnalyticsWorkspaces.length > 0) {
                            this.setState({ logAnalyticsWorkspaces: logAnalyticsWorkspaces });
                            this.updateOption('logAnalyticsDefaultWorkspace', this.props.options.jsonData.logAnalyticsDefaultWorkspace || logAnalyticsWorkspaces[0].value);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            subscriptions: [],
            logAnalyticsSubscriptions: [],
            logAnalyticsWorkspaces: [],
            subscriptionId: '',
            logAnalyticsSubscriptionId: '',
        };
        _this.backendSrv = Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_6__["getBackendSrv"])();
        _this.templateSrv = new app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_5__["TemplateSrv"]();
        if (_this.props.options.id) {
            Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["updateDatasourcePluginOption"])(_this.props, 'url', '/api/datasources/proxy/' + _this.props.options.id);
        }
        return _this;
    }
    ConfigEditor.prototype.componentDidMount = function () {
        this.initPromise = Object(app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_9__["makePromiseCancelable"])(this.init());
        this.initPromise.promise.catch(function (_a) {
            var isCanceled = _a.isCanceled;
            if (isCanceled) {
                console.warn('Azure Monitor ConfigEditor has unmounted, intialization was canceled');
            }
        });
    };
    ConfigEditor.prototype.componentWillUnmount = function () {
        this.initPromise.cancel();
    };
    ConfigEditor.prototype.render = function () {
        var _a = this.state, subscriptions = _a.subscriptions, logAnalyticsSubscriptions = _a.logAnalyticsSubscriptions, logAnalyticsWorkspaces = _a.logAnalyticsWorkspaces;
        var options = this.props.options;
        options.jsonData.cloudName = options.jsonData.cloudName || 'azuremonitor';
        options.secureJsonData = (options.secureJsonData || {});
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MonitorConfig__WEBPACK_IMPORTED_MODULE_3__["MonitorConfig"], { options: options, subscriptions: subscriptions, makeSameAs: this.makeSameAs, onLoadSubscriptions: this.onLoadSubscriptions, onUpdateOption: this.updateOption, onUpdateSecureOption: this.updateSecureOption, onResetOptionKey: this.resetKey }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AnalyticsConfig__WEBPACK_IMPORTED_MODULE_4__["AnalyticsConfig"], { options: options, workspaces: logAnalyticsWorkspaces, subscriptions: logAnalyticsSubscriptions, makeSameAs: this.makeSameAs, onUpdateOptions: this.updateOptions, onUpdateOption: this.updateOption, onUpdateSecureOption: this.updateSecureOption, onResetOptionKey: this.resetKey, onLoadSubscriptions: this.onLoadSubscriptions, onLoadWorkspaces: this.getWorkspaces }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_InsightsConfig__WEBPACK_IMPORTED_MODULE_7__["InsightsConfig"], { options: options, onUpdateOption: this.updateOption, onResetOptionKey: this.resetKey })));
    };
    return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (ConfigEditor);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/InsightsConfig.tsx":
/*!******************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/InsightsConfig.tsx ***!
  \******************************************************************************************************/
/*! exports provided: InsightsConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsightsConfig", function() { return InsightsConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");



var InsightsConfig = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InsightsConfig, _super);
    function InsightsConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAppInsightsAppIdChange = function (event) {
            _this.props.onUpdateOption('appInsightsAppId', event.target.value, false);
        };
        _this.onAppInsightsApiKeyChange = function (event) {
            _this.props.onUpdateOption('appInsightsApiKey', event.target.value, true);
        };
        _this.onAppInsightsResetApiKey = function () {
            _this.props.onResetOptionKey('appInsightsApiKey');
        };
        return _this;
    }
    InsightsConfig.prototype.render = function () {
        var options = this.props.options;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Application Insights Details"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                options.secureJsonFields.appInsightsApiKey ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12" }, "API Key"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-25", placeholder: "configured", disabled: true })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "max-width-30 gf-form-inline" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: "secondary", type: "button", onClick: this.onAppInsightsResetApiKey }, "reset"))))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12" }, "API Key"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-15" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", placeholder: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX", value: options.secureJsonData.appInsightsApiKey || '', onChange: this.onAppInsightsApiKeyChange }))))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-12" }, "Application ID"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-15" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", value: options.jsonData.appInsightsAppId || '', onChange: this.onAppInsightsAppIdChange })))))));
    };
    return InsightsConfig;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (InsightsConfig);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/MonitorConfig.tsx":
/*!*****************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/MonitorConfig.tsx ***!
  \*****************************************************************************************************/
/*! exports provided: MonitorConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonitorConfig", function() { return MonitorConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AzureCredentialsForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AzureCredentialsForm */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/AzureCredentialsForm.tsx");



var azureClouds = [
    { value: 'azuremonitor', label: 'Azure' },
    { value: 'govazuremonitor', label: 'Azure US Government' },
    { value: 'germanyazuremonitor', label: 'Azure Germany' },
    { value: 'chinaazuremonitor', label: 'Azure China' },
];
var MonitorConfig = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MonitorConfig, _super);
    function MonitorConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAzureCloudSelect = function (cloudName) {
            _this.props.onUpdateOption('cloudName', cloudName.value);
        };
        _this.onTenantIdChange = function (event) {
            _this.props.onUpdateOption('tenantId', event.target.value);
        };
        _this.onClientIdChange = function (event) {
            _this.props.onUpdateOption('clientId', event.target.value);
        };
        _this.onClientSecretChange = function (event) {
            var _a = _this.props, options = _a.options, makeSameAs = _a.makeSameAs;
            if (options.jsonData.azureLogAnalyticsSameAs && event.target.value) {
                makeSameAs(event.target.value);
            }
            else {
                _this.props.onUpdateSecureOption('clientSecret', event.target.value);
            }
        };
        _this.onResetClientSecret = function () {
            _this.props.onResetOptionKey('clientSecret');
        };
        _this.onSubscriptionSelect = function (subscription) {
            _this.props.onUpdateOption('subscriptionId', subscription.value);
        };
        return _this;
    }
    MonitorConfig.prototype.render = function () {
        var _a = this.props, options = _a.options, subscriptions = _a.subscriptions;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Azure Monitor Details"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AzureCredentialsForm__WEBPACK_IMPORTED_MODULE_2__["AzureCredentialsForm"], { selectedAzureCloud: options.jsonData.cloudName || 'azuremonitor', azureCloudOptions: azureClouds, subscriptionOptions: subscriptions, selectedSubscription: options.jsonData.subscriptionId, tenantId: options.jsonData.tenantId, clientId: options.jsonData.clientId, clientSecret: options.secureJsonData.clientSecret, clientSecretConfigured: options.secureJsonFields.clientSecret, onAzureCloudChange: this.onAzureCloudSelect, onSubscriptionSelectChange: this.onSubscriptionSelect, onTenantIdChange: this.onTenantIdChange, onClientIdChange: this.onClientIdChange, onClientSecretChange: this.onClientSecretChange, onResetClientSecret: this.onResetClientSecret, onLoadSubscriptions: this.props.onLoadSubscriptions })));
    };
    return MonitorConfig;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (MonitorConfig);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/datasource.ts":
/*!**************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/datasource.ts ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _azure_monitor_azure_monitor_datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./azure_monitor/azure_monitor_datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_monitor/azure_monitor_datasource.ts");
/* harmony import */ var _app_insights_app_insights_datasource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app_insights/app_insights_datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/app_insights/app_insights_datasource.ts");
/* harmony import */ var _azure_log_analytics_azure_log_analytics_datasource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./azure_log_analytics/azure_log_analytics_datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/azure_log_analytics/azure_log_analytics_datasource.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");






var Datasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Datasource, _super);
    /** @ngInject */
    function Datasource(instanceSettings, backendSrv, templateSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.azureMonitorDatasource = new _azure_monitor_azure_monitor_datasource__WEBPACK_IMPORTED_MODULE_2__["default"](instanceSettings, _this.backendSrv, _this.templateSrv);
        _this.appInsightsDatasource = new _app_insights_app_insights_datasource__WEBPACK_IMPORTED_MODULE_3__["default"](instanceSettings, _this.backendSrv, _this.templateSrv);
        _this.azureLogAnalyticsDatasource = new _azure_log_analytics_azure_log_analytics_datasource__WEBPACK_IMPORTED_MODULE_4__["default"](instanceSettings, _this.backendSrv, _this.templateSrv);
        return _this;
    }
    Datasource.prototype.query = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var promises, azureMonitorOptions, appInsightsOptions, azureLogAnalyticsOptions, amPromise, aiPromise, alaPromise;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                promises = [];
                azureMonitorOptions = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(options);
                appInsightsOptions = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(options);
                azureLogAnalyticsOptions = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(options);
                azureMonitorOptions.targets = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(azureMonitorOptions.targets, ['queryType', 'Azure Monitor']);
                appInsightsOptions.targets = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(appInsightsOptions.targets, ['queryType', 'Application Insights']);
                azureLogAnalyticsOptions.targets = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(azureLogAnalyticsOptions.targets, ['queryType', 'Azure Log Analytics']);
                if (azureMonitorOptions.targets.length > 0) {
                    amPromise = this.azureMonitorDatasource.query(azureMonitorOptions);
                    if (amPromise) {
                        promises.push(amPromise);
                    }
                }
                if (appInsightsOptions.targets.length > 0) {
                    aiPromise = this.appInsightsDatasource.query(appInsightsOptions);
                    if (aiPromise) {
                        promises.push(aiPromise);
                    }
                }
                if (azureLogAnalyticsOptions.targets.length > 0) {
                    alaPromise = this.azureLogAnalyticsDatasource.query(azureLogAnalyticsOptions);
                    if (alaPromise) {
                        promises.push(alaPromise);
                    }
                }
                if (promises.length === 0) {
                    return [2 /*return*/, Promise.resolve({ data: [] })];
                }
                return [2 /*return*/, Promise.all(promises).then(function (results) {
                        return { data: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flatten(results) };
                    })];
            });
        });
    };
    Datasource.prototype.annotationQuery = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.azureLogAnalyticsDatasource.annotationQuery(options)];
            });
        });
    };
    Datasource.prototype.metricFindQuery = function (query) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var aiResult, amResult, alaResult;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (!query) {
                    return [2 /*return*/, Promise.resolve([])];
                }
                aiResult = this.appInsightsDatasource.metricFindQuery(query);
                if (aiResult) {
                    return [2 /*return*/, aiResult];
                }
                amResult = this.azureMonitorDatasource.metricFindQuery(query);
                if (amResult) {
                    return [2 /*return*/, amResult];
                }
                alaResult = this.azureLogAnalyticsDatasource.metricFindQuery(query);
                if (alaResult) {
                    return [2 /*return*/, alaResult];
                }
                return [2 /*return*/, Promise.resolve([])];
            });
        });
    };
    Datasource.prototype.testDatasource = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var promises;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                promises = [];
                if (this.azureMonitorDatasource.isConfigured()) {
                    promises.push(this.azureMonitorDatasource.testDatasource());
                }
                if (this.appInsightsDatasource.isConfigured()) {
                    promises.push(this.appInsightsDatasource.testDatasource());
                }
                if (this.azureLogAnalyticsDatasource.isConfigured()) {
                    promises.push(this.azureLogAnalyticsDatasource.testDatasource());
                }
                if (promises.length === 0) {
                    return [2 /*return*/, {
                            status: 'error',
                            message: "Nothing configured. At least one of the API's must be configured.",
                            title: 'Error',
                        }];
                }
                return [2 /*return*/, Promise.all(promises).then(function (results) {
                        var status = 'success';
                        var message = '';
                        for (var i = 0; i < results.length; i++) {
                            if (results[i].status !== 'success') {
                                status = results[i].status;
                            }
                            message += i + 1 + ". " + results[i].message + " ";
                        }
                        return {
                            status: status,
                            message: message,
                            title: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.upperFirst(status),
                        };
                    })];
            });
        });
    };
    /* Azure Monitor REST API methods */
    Datasource.prototype.getResourceGroups = function (subscriptionId) {
        return this.azureMonitorDatasource.getResourceGroups(subscriptionId);
    };
    Datasource.prototype.getMetricDefinitions = function (subscriptionId, resourceGroup) {
        return this.azureMonitorDatasource.getMetricDefinitions(subscriptionId, resourceGroup);
    };
    Datasource.prototype.getResourceNames = function (subscriptionId, resourceGroup, metricDefinition) {
        return this.azureMonitorDatasource.getResourceNames(subscriptionId, resourceGroup, metricDefinition);
    };
    Datasource.prototype.getMetricNames = function (subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace) {
        return this.azureMonitorDatasource.getMetricNames(subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace);
    };
    Datasource.prototype.getMetricNamespaces = function (subscriptionId, resourceGroup, metricDefinition, resourceName) {
        return this.azureMonitorDatasource.getMetricNamespaces(subscriptionId, resourceGroup, metricDefinition, resourceName);
    };
    Datasource.prototype.getMetricMetadata = function (subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, metricName) {
        return this.azureMonitorDatasource.getMetricMetadata(subscriptionId, resourceGroup, metricDefinition, resourceName, metricNamespace, metricName);
    };
    /* Application Insights API method */
    Datasource.prototype.getAppInsightsMetricNames = function () {
        return this.appInsightsDatasource.getMetricNames();
    };
    Datasource.prototype.getAppInsightsMetricMetadata = function (metricName) {
        return this.appInsightsDatasource.getMetricMetadata(metricName);
    };
    Datasource.prototype.getAppInsightsColumns = function (refId) {
        return this.appInsightsDatasource.logAnalyticsColumns[refId];
    };
    /*Azure Log Analytics */
    Datasource.prototype.getAzureLogAnalyticsWorkspaces = function (subscriptionId) {
        return this.azureLogAnalyticsDatasource.getWorkspaces(subscriptionId);
    };
    Datasource.prototype.getSubscriptions = function () {
        return this.azureMonitorDatasource.getSubscriptions();
    };
    return Datasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["DataSourceApi"]));
/* harmony default export */ __webpack_exports__["default"] = (Datasource);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/KustoQueryField.tsx":
/*!***************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/KustoQueryField.tsx ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var slate_plain_serializer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! slate-plain-serializer */ "./node_modules/slate-plain-serializer/lib/slate-plain-serializer.es.js");
/* harmony import */ var _query_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./query_field */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/query_field.tsx");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _kusto_kusto__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./kusto/kusto */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/kusto/kusto.ts");







// import '../sass/editor.base.scss';
var TYPEAHEAD_DELAY = 100;
var defaultSchema = function () { return ({
    Databases: {
        Default: {},
    },
}); };
var cleanText = function (s) { return s.replace(/[{}[\]="(),!~+\-*/^%]/g, '').trim(); };
var wrapText = function (text) { return ({ text: text }); };
var KustoQueryField = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(KustoQueryField, _super);
    function KustoQueryField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.onTypeahead = function (force) {
            if (force === void 0) { force = false; }
            var selection = window.getSelection();
            if (selection.anchorNode) {
                var wrapperNode = selection.anchorNode.parentElement;
                if (wrapperNode === null) {
                    return;
                }
                var editorNode = wrapperNode.closest('.slate-query-field');
                if (!editorNode || _this.state.value.isBlurred) {
                    // Not inside this editor
                    return;
                }
                // DOM ranges
                var range = selection.getRangeAt(0);
                var text = selection.anchorNode.textContent;
                if (text === null) {
                    return;
                }
                var offset = range.startOffset;
                var prefix_1 = cleanText(text.substr(0, offset));
                // Model ranges
                var modelOffset = _this.state.value.anchorOffset;
                var modelPrefix = _this.state.value.anchorText.text.slice(0, modelOffset);
                // Determine candidates by context
                var suggestionGroups = [];
                var wrapperClasses = wrapperNode.classList;
                var typeaheadContext = null;
                // Built-in functions
                if (wrapperClasses.contains('function-context')) {
                    typeaheadContext = 'context-function';
                    suggestionGroups = _this.getColumnSuggestions();
                    // where
                }
                else if (modelPrefix.match(/(where\s(\w+\b)?$)/i)) {
                    typeaheadContext = 'context-where';
                    suggestionGroups = _this.getColumnSuggestions();
                    // summarize by
                }
                else if (modelPrefix.match(/(summarize\s(\w+\b)?$)/i)) {
                    typeaheadContext = 'context-summarize';
                    suggestionGroups = _this.getFunctionSuggestions();
                }
                else if (modelPrefix.match(/(summarize\s(.+\s)?by\s+([^,\s]+,\s*)*([^,\s]+\b)?$)/i)) {
                    typeaheadContext = 'context-summarize-by';
                    suggestionGroups = _this.getColumnSuggestions();
                    // order by, top X by, ... by ...
                }
                else if (modelPrefix.match(/(by\s+([^,\s]+,\s*)*([^,\s]+\b)?$)/i)) {
                    typeaheadContext = 'context-by';
                    suggestionGroups = _this.getColumnSuggestions();
                    // join
                }
                else if (modelPrefix.match(/(on\s(.+\b)?$)/i)) {
                    typeaheadContext = 'context-join-on';
                    suggestionGroups = _this.getColumnSuggestions();
                }
                else if (modelPrefix.match(/(join\s+(\(\s+)?(\w+\b)?$)/i)) {
                    typeaheadContext = 'context-join';
                    suggestionGroups = _this.getTableSuggestions();
                    // distinct
                }
                else if (modelPrefix.match(/(distinct\s(.+\b)?$)/i)) {
                    typeaheadContext = 'context-distinct';
                    suggestionGroups = _this.getColumnSuggestions();
                    // database()
                }
                else if (modelPrefix.match(/(database\(\"(\w+)\"\)\.(.+\b)?$)/i)) {
                    typeaheadContext = 'context-database-table';
                    var db = _this.getDBFromDatabaseFunction(modelPrefix);
                    console.log(db);
                    suggestionGroups = _this.getTableSuggestions(db);
                    prefix_1 = prefix_1.replace('.', '');
                    // new
                }
                else if (normalizeQuery(slate_plain_serializer__WEBPACK_IMPORTED_MODULE_2__["default"].serialize(_this.state.value)).match(/^\s*\w*$/i)) {
                    typeaheadContext = 'context-new';
                    if (_this.schema) {
                        suggestionGroups = _this.getInitialSuggestions();
                    }
                    else {
                        _this.fetchSchema();
                        setTimeout(_this.onTypeahead, 0);
                        return;
                    }
                    // built-in
                }
                else if (prefix_1 && !wrapperClasses.contains('argument') && !force) {
                    // Use only last typed word as a prefix for searching
                    if (modelPrefix.match(/\s$/i)) {
                        prefix_1 = '';
                        return;
                    }
                    prefix_1 = getLastWord(prefix_1);
                    typeaheadContext = 'context-builtin';
                    suggestionGroups = _this.getKeywordSuggestions();
                }
                else if (force === true) {
                    typeaheadContext = 'context-builtin-forced';
                    if (modelPrefix.match(/\s$/i)) {
                        prefix_1 = '';
                    }
                    suggestionGroups = _this.getKeywordSuggestions();
                }
                var results_1 = 0;
                prefix_1 = prefix_1.toLowerCase();
                var filteredSuggestions = suggestionGroups
                    .map(function (group) {
                    if (group.items && prefix_1 && !group.skipFilter) {
                        group.items = group.items.filter(function (c) { return c.text.length >= prefix_1.length; });
                        if (group.prefixMatch) {
                            group.items = group.items.filter(function (c) { return c.text.toLowerCase().indexOf(prefix_1) === 0; });
                        }
                        else {
                            group.items = group.items.filter(function (c) { return c.text.toLowerCase().indexOf(prefix_1) > -1; });
                        }
                    }
                    results_1 += group.items.length;
                    return group;
                })
                    .filter(function (group) { return group.items.length > 0; });
                // console.log('onTypeahead', selection.anchorNode, wrapperClasses, text, offset, prefix, typeaheadContext);
                // console.log('onTypeahead', prefix, typeaheadContext, force);
                _this.setState({
                    typeaheadPrefix: prefix_1,
                    typeaheadContext: typeaheadContext,
                    typeaheadText: text,
                    suggestions: results_1 > 0 ? filteredSuggestions : [],
                });
            }
        };
        _this.applyTypeahead = function (editor, suggestion) {
            var _a = _this.state, typeaheadPrefix = _a.typeaheadPrefix, typeaheadContext = _a.typeaheadContext, typeaheadText = _a.typeaheadText;
            var suggestionText = suggestion.text || suggestion;
            var move = 0;
            // Modify suggestion based on context
            var nextChar = _grafana_ui__WEBPACK_IMPORTED_MODULE_5__["DOMUtil"].getNextCharacter();
            if (suggestion.type === 'function') {
                if (!nextChar || nextChar !== '(') {
                    suggestionText += '(';
                }
            }
            else if (typeaheadContext === 'context-function') {
                if (!nextChar || nextChar !== ')') {
                    suggestionText += ')';
                }
            }
            else {
                if (!nextChar || nextChar !== ' ') {
                    suggestionText += ' ';
                }
            }
            // Remove the current, incomplete text and replace it with the selected suggestion
            var backward = suggestion.deleteBackwards || typeaheadPrefix.length;
            var text = cleanText(typeaheadText);
            var suffixLength = text.length - typeaheadPrefix.length;
            var offset = typeaheadText.indexOf(typeaheadPrefix);
            var midWord = typeaheadPrefix && ((suffixLength > 0 && offset > -1) || suggestionText === typeaheadText);
            var forward = midWord ? suffixLength + offset : 0;
            _this.resetTypeahead(function () {
                return editor
                    .deleteBackward(backward)
                    .deleteForward(forward)
                    .insertText(suggestionText)
                    .moveForward(move)
                    .focus();
            });
            return editor;
        };
        _this.schema = defaultSchema();
        _this.onTypeahead = lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default()(_this.onTypeahead, TYPEAHEAD_DELAY);
        return _this;
    }
    KustoQueryField.prototype.componentDidMount = function () {
        _super.prototype.componentDidMount.call(this);
        this.fetchSchema();
    };
    // private _getFieldsSuggestions(): SuggestionGroup[] {
    //   return [
    //     {
    //       prefixMatch: true,
    //       label: 'Fields',
    //       items: this.fields.map(wrapText)
    //     },
    //     {
    //       prefixMatch: true,
    //       label: 'Variables',
    //       items: this.props.templateVariables.map(wrapText)
    //     }
    //   ];
    // }
    // private _getAfterFromSuggestions(): SuggestionGroup[] {
    //   return [
    //     {
    //       skipFilter: true,
    //       label: 'Events',
    //       items: this.events.map(wrapText)
    //     },
    //     {
    //       prefixMatch: true,
    //       label: 'Variables',
    //       items: this.props.templateVariables
    //         .map(wrapText)
    //         .map(suggestion => {
    //           suggestion.deleteBackwards = 0;
    //           return suggestion;
    //         })
    //     }
    //   ];
    // }
    // private _getAfterSelectSuggestions(): SuggestionGroup[] {
    //   return [
    //     {
    //       prefixMatch: true,
    //       label: 'Fields',
    //       items: this.fields.map(wrapText)
    //     },
    //     {
    //       prefixMatch: true,
    //       label: 'Functions',
    //       items: FUNCTIONS.map((s: any) => { s.type = 'function'; return s; })
    //     },
    //     {
    //       prefixMatch: true,
    //       label: 'Variables',
    //       items: this.props.templateVariables.map(wrapText)
    //     }
    //   ];
    // }
    KustoQueryField.prototype.getInitialSuggestions = function () {
        return this.getTableSuggestions();
    };
    KustoQueryField.prototype.getKeywordSuggestions = function () {
        return [
            {
                prefixMatch: true,
                label: 'Keywords',
                items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_6__["KEYWORDS"].map(wrapText),
            },
            {
                prefixMatch: true,
                label: 'Operators',
                items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_6__["operatorTokens"],
            },
            {
                prefixMatch: true,
                label: 'Functions',
                items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_6__["functionTokens"].map(function (s) {
                    s.type = 'function';
                    return s;
                }),
            },
            {
                prefixMatch: true,
                label: 'Macros',
                items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_6__["grafanaMacros"].map(function (s) {
                    s.type = 'function';
                    return s;
                }),
            },
            {
                prefixMatch: true,
                label: 'Tables',
                items: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.schema.Databases.Default.Tables, function (t) { return ({ text: t.Name }); }),
            },
        ];
    };
    KustoQueryField.prototype.getFunctionSuggestions = function () {
        return [
            {
                prefixMatch: true,
                label: 'Functions',
                items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_6__["functionTokens"].map(function (s) {
                    s.type = 'function';
                    return s;
                }),
            },
            {
                prefixMatch: true,
                label: 'Macros',
                items: _kusto_kusto__WEBPACK_IMPORTED_MODULE_6__["grafanaMacros"].map(function (s) {
                    s.type = 'function';
                    return s;
                }),
            },
        ];
    };
    KustoQueryField.prototype.getTableSuggestions = function (db) {
        if (db === void 0) { db = 'Default'; }
        // @ts-ignore
        if (this.schema.Databases[db]) {
            return [
                {
                    prefixMatch: true,
                    label: 'Tables',
                    // @ts-ignore
                    items: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.schema.Databases[db].Tables, function (t) { return ({ text: t.Name }); }),
                },
            ];
        }
        else {
            return [];
        }
    };
    KustoQueryField.prototype.getColumnSuggestions = function () {
        var table = this.getTableFromContext();
        if (table) {
            var tableSchema = this.schema.Databases.Default.Tables[table];
            if (tableSchema) {
                return [
                    {
                        prefixMatch: true,
                        label: 'Fields',
                        items: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(tableSchema.OrderedColumns, function (f) { return ({
                            text: f.Name,
                            hint: f.Type,
                        }); }),
                    },
                ];
            }
        }
        return [];
    };
    KustoQueryField.prototype.getTableFromContext = function () {
        var query = slate_plain_serializer__WEBPACK_IMPORTED_MODULE_2__["default"].serialize(this.state.value);
        var tablePattern = /^\s*(\w+)\s*|/g;
        var normalizedQuery = normalizeQuery(query);
        var match = tablePattern.exec(normalizedQuery);
        if (match && match.length > 1 && match[0] && match[1]) {
            return match[1];
        }
        else {
            return null;
        }
    };
    KustoQueryField.prototype.getDBFromDatabaseFunction = function (prefix) {
        var databasePattern = /database\(\"(\w+)\"\)/gi;
        var match = databasePattern.exec(prefix);
        if (match && match.length > 1 && match[0] && match[1]) {
            return match[1];
        }
        else {
            return null;
        }
    };
    KustoQueryField.prototype.fetchSchema = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var schema;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.getSchema()];
                    case 1:
                        schema = _a.sent();
                        if (schema) {
                            if (schema.Type === 'AppInsights') {
                                schema = castSchema(schema);
                            }
                            this.schema = schema;
                        }
                        else {
                            this.schema = defaultSchema();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return KustoQueryField;
}(_query_field__WEBPACK_IMPORTED_MODULE_3__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (KustoQueryField);
/**
 * Cast schema from App Insights to default Kusto schema
 */
function castSchema(schema) {
    var defaultSchemaTemplate = defaultSchema();
    defaultSchemaTemplate.Databases.Default = schema;
    return defaultSchemaTemplate;
}
function normalizeQuery(query) {
    var commentPattern = /\/\/.*$/gm;
    var normalizedQuery = query.replace(commentPattern, '');
    normalizedQuery = normalizedQuery.replace('\n', ' ');
    return normalizedQuery;
}
function getLastWord(str) {
    var lastWordPattern = /(?:.*\s)?([^\s]+\s*)$/gi;
    var match = lastWordPattern.exec(str);
    if (match && match.length > 1) {
        return match[1];
    }
    return '';
}


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/editor_component.tsx":
/*!****************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/editor_component.tsx ***!
  \****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _KustoQueryField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KustoQueryField */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/KustoQueryField.tsx");
/* harmony import */ var _kusto_kusto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kusto/kusto */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/kusto/kusto.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");





var Editor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Editor, _super);
    function Editor(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeQuery = function (value) {
            var _a = _this.props, index = _a.index, change = _a.change;
            var query = _this.state.query;
            var edited = query !== value;
            _this.setState({ edited: edited, query: value });
            if (change) {
                change(value, index);
            }
        };
        _this.onPressEnter = function () {
            var execute = _this.props.execute;
            if (execute) {
                execute();
            }
        };
        _this.state = {
            edited: false,
            query: props.query || '',
        };
        return _this;
    }
    Editor.prototype.render = function () {
        var _a = this.props, variables = _a.variables, getSchema = _a.getSchema, placeholder = _a.placeholder;
        var _b = this.state, edited = _b.edited, query = _b.query;
        return (react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", { className: "gf-form-input", style: { height: 'auto' } },
            react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_KustoQueryField__WEBPACK_IMPORTED_MODULE_1__["default"], { initialQuery: edited ? null : query, onPressEnter: this.onPressEnter, onQueryChange: this.onChangeQuery, prismLanguage: "kusto", prismDefinition: _kusto_kusto__WEBPACK_IMPORTED_MODULE_2__["default"], placeholder: placeholder, templateVariables: variables, getSchema: getSchema })));
    };
    Editor.defaultProps = {
        placeholder: 'Enter a query',
    };
    return Editor;
}(react__WEBPACK_IMPORTED_MODULE_3__["Component"]));
app_core_core_module__WEBPACK_IMPORTED_MODULE_4__["default"].directive('kustoEditor', [
    'reactDirective',
    function (reactDirective) {
        return reactDirective(Editor, [
            'change',
            'database',
            'execute',
            'query',
            'variables',
            'placeholder',
            ['getSchema', { watchDepth: 'reference' }],
        ]);
    },
]);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/kusto/kusto.ts":
/*!**********************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/kusto/kusto.ts ***!
  \**********************************************************************************************/
/*! exports provided: operatorTokens, functionTokens, KEYWORDS, grafanaMacros, DURATION, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "operatorTokens", function() { return operatorTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "functionTokens", function() { return functionTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEYWORDS", function() { return KEYWORDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grafanaMacros", function() { return grafanaMacros; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DURATION", function() { return DURATION; });
/* tslint:disable:max-line-length */
var operatorTokens = [
    { text: '!between', hint: 'Matches the input that is outside the inclusive range.' },
    { text: 'as', hint: "Binds a name to the operator's input tabular expression." },
    { text: 'between', hint: 'Matches the input that is inside the inclusive range.' },
    {
        text: 'consume',
        hint: 'The `consume` operator consumes the tabular data stream handed to it. It is\r\nmostly used for triggering the query side-effect without actually returning\r\nthe results back to the caller.',
    },
    { text: 'count', hint: 'Returns the number of records in the input record set.' },
    { text: 'datatable', hint: 'Returns a table whose schema and values are defined in the query itself.' },
    {
        text: 'distinct',
        hint: 'Produces a table with the distinct combination of the provided columns of the input table.',
    },
    { text: 'evaluate', hint: 'Invokes a service-side query extension (plugin).' },
    { text: 'extend', hint: 'Create calculated columns and append them to the result set.' },
    {
        text: 'externaldata',
        hint: 'Returns a table whose schema is defined in the query itself, and whose data is read from an external raw file.',
    },
    {
        text: 'facet',
        hint: 'Returns a set of tables, one for each specified column.\r\nEach table specifies the list of values taken by its column.\r\nAn additional table can be created by using the `with` clause.',
    },
    { text: 'find', hint: 'Finds rows that match a predicate across a set of tables.' },
    { text: 'fork', hint: 'Runs multiple consumer operators in parallel.' },
    { text: 'getschema', hint: 'Produce a table that represents a tabular schema of the input.' },
    { text: 'in', hint: 'Filters a recordset based on the provided set of values.' },
    { text: 'invoke', hint: 'Invokes lambda that receives the source of `invoke` as tabular parameter argument.' },
    {
        text: 'join',
        hint: 'Merge the rows of two tables to form a new table by matching values of the specified column(s) from each table.',
    },
    { text: 'limit', hint: 'Return up to the specified number of rows.' },
    { text: 'make-series', hint: 'Create series of specified aggregated values along specified axis.' },
    { text: 'mvexpand', hint: 'Expands multi-value array or property bag.' },
    { text: 'order', hint: 'Sort the rows of the input table into order by one or more columns.' },
    { text: 'parse', hint: 'Evaluates a string expression and parses its value into one or more calculated columns.' },
    {
        text: 'print',
        hint: 'Evaluates one or more scalar expressions and inserts the results (as a single-row table with as many columns as there are expressions) into the output.',
    },
    { text: 'project', hint: 'Select the columns to include, rename or drop, and insert new computed columns.' },
    { text: 'project-away', hint: 'Select what  columns to exclude from the input.' },
    { text: 'project-rename', hint: 'Renames columns in the result output.' },
    { text: 'range', hint: 'Generates a single-column table of values.' },
    { text: 'reduce', hint: 'Groups a set of strings together based on values similarity.' },
    { text: 'render', hint: 'Instructs the user agent to render the results of the query in a particular way.' },
    { text: 'sample', hint: 'Returns up to the specified number of random rows from the input table.' },
    {
        text: 'sample-distinct',
        hint: 'Returns a single column that contains up to the specified number of distinct values of the requested column.',
    },
    { text: 'search', hint: 'The search operator provides a multi-table/multi-column search experience.' },
    { text: 'serialize', hint: 'Marks that order of the input row set is safe for window functions usage.' },
    { text: 'sort', hint: 'Sort the rows of the input table into order by one or more columns.' },
    { text: 'summarize', hint: 'Produces a table that aggregates the content of the input table.' },
    { text: 'take', hint: 'Return up to the specified number of rows.' },
    { text: 'top', hint: 'Returns the first *N* records sorted by the specified columns.' },
    {
        text: 'top-hitters',
        hint: 'Returns an approximation of the first *N* results (assuming skewed distribution of the input).',
    },
    {
        text: 'top-nested',
        hint: 'Produces hierarchical top results, where each level is a drill-down based on previous level values.',
    },
    { text: 'union', hint: 'Takes two or more tables and returns the rows of all of them.' },
    { text: 'where', hint: 'Filters a table to the subset of rows that satisfy a predicate.' },
];
var functionTokens = [
    { text: 'abs', hint: 'Calculates the absolute value of the input.' },
    {
        text: 'acos',
        hint: 'Returns the angle whose cosine is the specified number (the inverse operation of [`cos()`](cosfunction.md)) .',
    },
    { text: 'ago', hint: 'Subtracts the given timespan from the current UTC clock time.' },
    { text: 'any', hint: 'Returns random non-empty value from the specified expression values.' },
    {
        text: 'arg_max',
        hint: 'Finds a row in the group that maximizes *ExprToMaximize*, and returns the value of *ExprToReturn* (or `*` to return the entire row).',
    },
    {
        text: 'arg_min',
        hint: 'Finds a row in the group that minimizes *ExprToMinimize*, and returns the value of *ExprToReturn* (or `*` to return the entire row).',
    },
    {
        text: 'argmax',
        hint: 'Finds a row in the group that maximizes *ExprToMaximize*, and returns the value of *ExprToReturn* (or `*` to return the entire row).',
    },
    {
        text: 'argmin',
        hint: 'Finds a row in the group that minimizes *ExprToMinimize*, and returns the value of *ExprToReturn* (or `*` to return the entire row).',
    },
    { text: 'array_concat', hint: 'Concatenates a number of dynamic arrays to a single array.' },
    { text: 'array_length', hint: 'Calculates the number of elements in a dynamic array.' },
    { text: 'array_slice', hint: 'Extracts a slice of a dynamic array.' },
    {
        text: 'array_split',
        hint: 'Splits an array to multiple arrays according to the split indices and packs the generated array in a dynamic array.',
    },
    {
        text: 'asin',
        hint: 'Returns the angle whose sine is the specified number (the inverse operation of [`sin()`](sinfunction.md)) .',
    },
    {
        text: 'assert',
        hint: 'Checks for a condition; if the condition is false, outputs error messages and fails the query.',
    },
    {
        text: 'atan',
        hint: 'Returns the angle whose tangent is the specified number (the inverse operation of [`tan()`](tanfunction.md)) .',
    },
    {
        text: 'atan2',
        hint: 'Calculates the angle, in radians, between the positive x-axis and the ray from the origin to the point (y, x).',
    },
    { text: 'avg', hint: 'Calculates the average of *Expr* across the group.' },
    {
        text: 'avgif',
        hint: 'Calculates the [average](avg-aggfunction.md) of *Expr* across the group for which *Predicate* evaluates to `true`.',
    },
    { text: 'bag_keys', hint: 'Enumerates all the root keys in a dynamic property-bag object.' },
    { text: 'base64_decodestring', hint: 'Decodes a base64 string to a UTF-8 string' },
    { text: 'base64_encodestring', hint: 'Encodes a string as base64 string' },
    { text: 'beta_cdf', hint: 'Returns the standard cumulative beta distribution function.' },
    { text: 'beta_inv', hint: 'Returns the inverse of the beta cumulative probability beta density function.' },
    { text: 'beta_pdf', hint: 'Returns the probability density beta function.' },
    { text: 'bin', hint: 'Rounds values down to an integer multiple of a given bin size.' },
    {
        text: 'bin_at',
        hint: "Rounds values down to a fixed-size 'bin', with control over the bin's starting point.\r\n(See also [`bin function`](./binfunction.md).)",
    },
    {
        text: 'bin_auto',
        hint: "Rounds values down to a fixed-size 'bin', with control over the bin size and starting point provided by a query property.",
    },
    { text: 'binary_and', hint: 'Returns a result of the bitwise `and` operation between two values.' },
    { text: 'binary_not', hint: 'Returns a bitwise negation of the input value.' },
    { text: 'binary_or', hint: 'Returns a result of the bitwise `or` operation of the two values.' },
    { text: 'binary_shift_left', hint: 'Returns binary shift left operation on a pair of numbers.' },
    { text: 'binary_shift_right', hint: 'Returns binary shift right operation on a pair of numbers.' },
    { text: 'binary_xor', hint: 'Returns a result of the bitwise `xor` operation of the two values.' },
    { text: 'buildschema', hint: 'Returns the minimal schema that admits all values of *DynamicExpr*.' },
    {
        text: 'case',
        hint: 'Evaluates a list of predicates and returns the first result expression whose predicate is satisfied.',
    },
    {
        text: 'ceiling',
        hint: 'Calculates the smallest integer greater than, or equal to, the specified numeric expression.',
    },
    { text: 'cluster', hint: 'Changes the reference of the query to a remote cluster.' },
    {
        text: 'coalesce',
        hint: 'Evaluates a list of expressions and returns the first non-null (or non-empty for string) expression.',
    },
    { text: 'cos', hint: 'Returns the cosine function.' },
    { text: 'cot', hint: 'Calculates the trigonometric cotangent of the specified angle, in radians.' },
    {
        text: 'count',
        hint: 'Returns a count of the records per summarization group (or in total if summarization is done without grouping).',
    },
    { text: 'countif', hint: 'Returns a count of rows for which *Predicate* evaluates to `true`.' },
    {
        text: 'countof',
        hint: 'Counts occurrences of a substring in a string. Plain string matches may overlap; regex matches do not.',
    },
    { text: 'current_principal', hint: 'Returns the current principal running this query.' },
    {
        text: 'cursor_after',
        hint: 'A predicate over the records of a table to compare their ingestion time\r\nagainst a database cursor.',
    },
    {
        text: 'cursor_before_or_at',
        hint: 'A predicate over the records of a table to compare their ingestion time\r\nagainst a database cursor.',
    },
    { text: 'database', hint: 'Changes the reference of the query to a specific database within the cluster scope.' },
    {
        text: 'datetime_add',
        hint: 'Calculates a new [datetime](./scalar-data-types/datetime.md) from a specified datepart multiplied by a specified amount, added to a specified [datetime](./scalar-data-types/datetime.md).',
    },
    {
        text: 'datetime_diff',
        hint: 'Calculates calendarian difference between two [datetime](./scalar-data-types/datetime.md) values.',
    },
    { text: 'datetime_part', hint: 'Extracts the requested date part as an integer value.' },
    { text: 'dayofmonth', hint: 'Returns the integer number representing the day number of the given month' },
    { text: 'dayofweek', hint: 'Returns the integer number of days since the preceding Sunday, as a `timespan`.' },
    { text: 'dayofyear', hint: 'Returns the integer number represents the day number of the given year.' },
    { text: 'dcount', hint: 'Returns an estimate of the number of distinct values of *Expr* in the group.' },
    {
        text: 'dcount_hll',
        hint: 'Calculates the dcount from hll results (which was generated by [hll](hll-aggfunction.md) or [hll_merge](hll-merge-aggfunction.md)).',
    },
    {
        text: 'dcountif',
        hint: 'Returns an estimate of the number of distinct values of *Expr* of rows for which *Predicate* evaluates to `true`.',
    },
    {
        text: 'degrees',
        hint: 'Converts angle value in radians into value in degrees, using formula `degrees = (180 / PI ) * angle_in_radians`',
    },
    { text: 'distance', hint: 'Returns the distance between two points in meters.' },
    { text: 'endofday', hint: 'Returns the end of the day containing the date, shifted by an offset, if provided.' },
    { text: 'endofmonth', hint: 'Returns the end of the month containing the date, shifted by an offset, if provided.' },
    { text: 'endofweek', hint: 'Returns the end of the week containing the date, shifted by an offset, if provided.' },
    { text: 'endofyear', hint: 'Returns the end of the year containing the date, shifted by an offset, if provided.' },
    {
        text: 'estimate_data_size',
        hint: 'Returns an estimated data size of the selected columns of the tabular expression.',
    },
    { text: 'exp', hint: 'The base-e exponential function of x, which is e raised to the power x: e^x.' },
    {
        text: 'exp10',
        hint: 'The base-10 exponential function of x, which is 10 raised to the power x: 10^x.  \r\n**Syntax**',
    },
    { text: 'exp2', hint: 'The base-2 exponential function of x, which is 2 raised to the power x: 2^x.' },
    {
        text: 'extent_id',
        hint: 'Returns a unique identifier that identifies the data shard ("extent") that the current record resides in.',
    },
    {
        text: 'extent_tags',
        hint: 'Returns a dynamic array with the [tags](../management/extents-overview.md#extent-tagging) of the data shard ("extent") that the current record resides in.',
    },
    { text: 'extract', hint: 'Get a match for a [regular expression](./re2.md) from a text string.' },
    { text: 'extract_all', hint: 'Get all matches for a [regular expression](./re2.md) from a text string.' },
    { text: 'extractjson', hint: 'Get a specified element out of a JSON text using a path expression.' },
    { text: 'floor', hint: 'An alias for [`bin()`](binfunction.md).' },
    { text: 'format_datetime', hint: 'Formats a datetime parameter based on the format pattern parameter.' },
    { text: 'format_timespan', hint: 'Formats a timespan parameter based on the format pattern parameter.' },
    { text: 'gamma', hint: 'Computes [gamma function](https://en.wikipedia.org/wiki/Gamma_function)' },
    { text: 'getmonth', hint: 'Get the month number (1-12) from a datetime.' },
    { text: 'gettype', hint: 'Returns the runtime type of its single argument.' },
    { text: 'getyear', hint: 'Returns the year part of the `datetime` argument.' },
    { text: 'hash', hint: 'Returns a hash value for the input value.' },
    { text: 'hash_sha256', hint: 'Returns a sha256 hash value for the input value.' },
    { text: 'hll', hint: 'Calculates the Intermediate results of [dcount](dcount-aggfunction.md) across the group.' },
    {
        text: 'hll_merge',
        hint: 'Merges hll results (scalar version of the aggregate version [`hll_merge()`](hll-merge-aggfunction.md)).',
    },
    { text: 'hourofday', hint: 'Returns the integer number representing the hour number of the given date' },
    {
        text: 'iff',
        hint: 'Evaluates the first argument (the predicate), and returns the value of either the second or third arguments, depending on whether the predicate evaluated to `true` (second) or `false` (third).',
    },
    {
        text: 'iif',
        hint: 'Evaluates the first argument (the predicate), and returns the value of either the second or third arguments, depending on whether the predicate evaluated to `true` (second) or `false` (third).',
    },
    {
        text: 'indexof',
        hint: 'Function reports the zero-based index of the first occurrence of a specified string within input string.',
    },
    { text: 'ingestion_time', hint: "Retrieves the record's `$IngestionTime` hidden `datetime` column, or null." },
    {
        text: 'iscolumnexists',
        hint: 'Returns a boolean value indicating if the given string argument exists in the schema produced by the preceding tabular operator.',
    },
    { text: 'isempty', hint: 'Returns `true` if the argument is an empty string or is null.' },
    { text: 'isfinite', hint: 'Returns whether input is a finite value (is neither infinite nor NaN).' },
    { text: 'isinf', hint: 'Returns whether input is an infinite (positive or negative) value.' },
    { text: 'isnan', hint: 'Returns whether input is Not-a-Number (NaN) value.' },
    { text: 'isnotempty', hint: 'Returns `true` if the argument is not an empty string nor it is a null.' },
    { text: 'isnotnull', hint: 'Returns `true` if the argument is not null.' },
    {
        text: 'isnull',
        hint: 'Evaluates its sole argument and returns a `bool` value indicating if the argument evaluates to a null value.',
    },
    { text: 'log', hint: 'Returns the natural logarithm function.' },
    { text: 'log10', hint: 'Returns the common (base-10) logarithm function.' },
    { text: 'log2', hint: 'Returns the base-2 logarithm function.' },
    {
        text: 'loggamma',
        hint: 'Computes log of absolute value of the [gamma function](https://en.wikipedia.org/wiki/Gamma_function)',
    },
    {
        text: 'make_datetime',
        hint: 'Creates a [datetime](./scalar-data-types/datetime.md) scalar value from the specified date and time.',
    },
    {
        text: 'make_dictionary',
        hint: 'Returns a `dynamic` (JSON) property-bag (dictionary) of all the values of *Expr* in the group.',
    },
    { text: 'make_string', hint: 'Returns the string generated by the Unicode characters.' },
    {
        text: 'make_timespan',
        hint: 'Creates a [timespan](./scalar-data-types/timespan.md) scalar value from the specified time period.',
    },
    { text: 'makelist', hint: 'Returns a `dynamic` (JSON) array of all the values of *Expr* in the group.' },
    {
        text: 'makeset',
        hint: 'Returns a `dynamic` (JSON) array of the set of distinct values that *Expr* takes in the group.',
    },
    {
        text: 'materialize',
        hint: 'Allows caching a sub-query result during the time of query execution in a way that other subqueries can reference the partial result.',
    },
    { text: 'max', hint: 'Returns the maximum value across the group.' },
    { text: 'max_of', hint: 'Returns the maximum value of several evaluated numeric expressions.' },
    {
        text: 'merge_tdigests',
        hint: 'Merges tdigest results (scalar version of the aggregate version [`merge_tdigests()`](merge-tdigests-aggfunction.md)).',
    },
    { text: 'min', hint: 'Returns the minimum value agross the group.' },
    { text: 'min_of', hint: 'Returns the minimum value of several evaluated numeric expressions.' },
    { text: 'monthofyear', hint: 'Returns the integer number represents the month number of the given year.' },
    {
        text: 'next',
        hint: 'Returns the value of a column in a row that it at some offset following the\r\ncurrent row in a [serialized row set](./windowsfunctions.md#serialized-row-set).',
    },
    { text: 'not', hint: 'Reverses the value of its `bool` argument.' },
    {
        text: 'now',
        hint: 'Returns the current UTC clock time, optionally offset by a given timespan.\r\nThis function can be used multiple times in a statement and the clock time being referenced will be the same for all instances.',
    },
    { text: 'pack', hint: 'Creates a `dynamic` object (property bag) from a list of names and values.' },
    {
        text: 'pack_all',
        hint: 'Creates a `dynamic` object (property bag) from all the columns of the tabular expression.',
    },
    { text: 'pack_array', hint: 'Packs all input values into a dynamic array.' },
    { text: 'parse_ipv4', hint: 'Converts input to integer (signed 64-bit) number representation.' },
    {
        text: 'parse_json',
        hint: 'Interprets a `string` as a [JSON value](https://json.org/)) and returns the value as [`dynamic`](./scalar-data-types/dynamic.md). \r\nIt is superior to using [extractjson() function](./extractjsonfunction.md)\r\nwhen you need to extract more than one element of a JSON compound object.',
    },
    {
        text: 'parse_path',
        hint: 'Parses a file path `string` and returns a [`dynamic`](./scalar-data-types/dynamic.md) object that contains the following parts of the path: \r\nScheme, RootPath, DirectoryPath, DirectoryName, FileName, Extension, AlternateDataStreamName.\r\nIn addition to the simple paths with both types of slashes, supports paths with schemas (e.g. "file://..."), shared paths (e.g. "\\\\shareddrive\\users..."), long paths (e.g "\\\\?\\C:...""), alternate data streams (e.g. "file1.exe:file2.exe")',
    },
    {
        text: 'parse_url',
        hint: 'Parses an absolute URL `string` and returns a [`dynamic`](./scalar-data-types/dynamic.md) object contains all parts of the URL (Scheme, Host, Port, Path, Username, Password, Query Parameters, Fragment).',
    },
    {
        text: 'parse_urlquery',
        hint: 'Parses a url query `string` and returns a [`dynamic`](./scalar-data-types/dynamic.md) object contains the Query parameters.',
    },
    {
        text: 'parse_user_agent',
        hint: "Interprets a user-agent string, which identifies the user's browser and provides certain system details to servers hosting the websites the user visits. The result is returned as [`dynamic`](./scalar-data-types/dynamic.md).",
    },
    { text: 'parse_version', hint: 'Converts input string representation of version to a comparable decimal number.' },
    {
        text: 'parse_xml',
        hint: 'Interprets a `string` as a XML value, converts the value to a [JSON value](https://json.org/) and returns the value as  [`dynamic`](./scalar-data-types/dynamic.md).',
    },
    {
        text: 'percentile',
        hint: 'Returns an estimate for the specified [nearest-rank percentile](#nearest-rank-percentile) of the population defined by *Expr*. \r\nThe accuracy depends on the density of population in the region of the percentile.',
    },
    {
        text: 'percentile_tdigest',
        hint: 'Calculates the percentile result from tdigest results (which was generated by [tdigest](tdigest-aggfunction.md) or [merge-tdigests](merge-tdigests-aggfunction.md))',
    },
    {
        text: 'percentrank_tdigest',
        hint: "Calculates the approximate rank of the value in a set where rank is expressed as percentage of set's size. \r\nThis function can be viewed as the inverse of the percentile.",
    },
    { text: 'pi', hint: 'Returns the constant value of Pi (π).' },
    { text: 'point', hint: 'Returns a dynamic array representation of a point.' },
    { text: 'pow', hint: 'Returns a result of raising to power' },
    {
        text: 'prev',
        hint: 'Returns the value of a column in a row that it at some offset prior to the\r\ncurrent row in a [serialized row set](./windowsfunctions.md#serialized-row-set).',
    },
    {
        text: 'radians',
        hint: 'Converts angle value in degrees into value in radians, using formula `radians = (PI / 180 ) * angle_in_degrees`',
    },
    { text: 'rand', hint: 'Returns a random number.' },
    { text: 'range', hint: 'Generates a dynamic array holding a series of equally-spaced values.' },
    { text: 'repeat', hint: 'Generates a dynamic array holding a series of equal values.' },
    { text: 'replace', hint: 'Replace all regex matches with another string.' },
    { text: 'reverse', hint: 'Function makes reverse of input string.' },
    { text: 'round', hint: 'Returns the rounded source to the specified precision.' },
    {
        text: 'row_cumsum',
        hint: 'Calculates the cumulative sum of a column in a [serialized row set](./windowsfunctions.md#serialized-row-set).',
    },
    {
        text: 'row_number',
        hint: "Returns the current row's index in a [serialized row set](./windowsfunctions.md#serialized-row-set).\r\nThe row index starts by default at `1` for the first row, and is incremented by `1` for each additional row.\r\nOptionally, the row index can start at a different value than `1`.\r\nAdditionally, the row index may be reset according to some provided predicate.",
    },
    { text: 'series_add', hint: 'Calculates the element-wise addition of two numeric series inputs.' },
    { text: 'series_decompose', hint: 'Applies a decomposition transformation on a series.' },
    {
        text: 'series_decompose_anomalies',
        hint: 'Anomaly Detection based on series decomposition (refer to [series_decompose()](series-decomposefunction.md))',
    },
    { text: 'series_decompose_forecast', hint: 'Forecast based on series decomposition.' },
    { text: 'series_divide', hint: 'Calculates the element-wise division of two numeric series inputs.' },
    {
        text: 'series_equals',
        hint: 'Calculates the element-wise equals (`==`) logic operation of two numeric series inputs.',
    },
    { text: 'series_fill_backward', hint: 'Performs backward fill interpolation of missing values in a series.' },
    { text: 'series_fill_const', hint: 'Replaces missing values in a series with a specified constant value.' },
    { text: 'series_fill_forward', hint: 'Performs forward fill interpolation of missing values in a series.' },
    { text: 'series_fill_linear', hint: 'Performs linear interpolation of missing values in a series.' },
    { text: 'series_fir', hint: 'Applies a Finite Impulse Response filter on a series.' },
    {
        text: 'series_fit_2lines',
        hint: 'Applies two segments linear regression on a series, returning multiple columns.',
    },
    {
        text: 'series_fit_2lines_dynamic',
        hint: 'Applies two segments linear regression on a series, returning dynamic object.',
    },
    { text: 'series_fit_line', hint: 'Applies linear regression on a series, returning multiple columns.' },
    { text: 'series_fit_line_dynamic', hint: 'Applies linear regression on a series, returning dynamic object.' },
    {
        text: 'series_greater',
        hint: 'Calculates the element-wise greater (`>`) logic operation of two numeric series inputs.',
    },
    {
        text: 'series_greater_equals',
        hint: 'Calculates the element-wise greater or equals (`>=`) logic operation of two numeric series inputs.',
    },
    { text: 'series_iir', hint: 'Applies a Infinite Impulse Response filter on a series.' },
    { text: 'series_less', hint: 'Calculates the element-wise less (`<`) logic operation of two numeric series inputs.' },
    {
        text: 'series_less_equals',
        hint: 'Calculates the element-wise less or equal (`<=`) logic operation of two numeric series inputs.',
    },
    { text: 'series_multiply', hint: 'Calculates the element-wise multiplication of two numeric series inputs.' },
    {
        text: 'series_not_equals',
        hint: 'Calculates the element-wise not equals (`!=`) logic operation of two numeric series inputs.',
    },
    { text: 'series_outliers', hint: 'Scores anomaly points in a series.' },
    { text: 'series_periods_detect', hint: 'Finds the most significant periods that exist in a time series.' },
    {
        text: 'series_periods_validate',
        hint: 'Checks whether a time series contains periodic patterns of given lengths.',
    },
    {
        text: 'series_seasonal',
        hint: 'Calculates the seasonal component of a series according to the detected or given seasonal period.',
    },
    { text: 'series_stats', hint: 'Returns statistics for a series in multiple columns.' },
    { text: 'series_stats_dynamic', hint: 'Returns statistics for a series in dynamic object.' },
    { text: 'series_subtract', hint: 'Calculates the element-wise subtraction of two numeric series inputs.' },
    { text: 'sign', hint: 'Sign of a numeric expression' },
    { text: 'sin', hint: 'Returns the sine function.' },
    {
        text: 'split',
        hint: 'Splits a given string according to a given delimiter and returns a string array with the contained substrings.',
    },
    { text: 'sqrt', hint: 'Returns the square root function.' },
    { text: 'startofday', hint: 'Returns the start of the day containing the date, shifted by an offset, if provided.' },
    {
        text: 'startofmonth',
        hint: 'Returns the start of the month containing the date, shifted by an offset, if provided.',
    },
    {
        text: 'startofweek',
        hint: 'Returns the start of the week containing the date, shifted by an offset, if provided.',
    },
    {
        text: 'startofyear',
        hint: 'Returns the start of the year containing the date, shifted by an offset, if provided.',
    },
    {
        text: 'stdev',
        hint: 'Calculates the standard deviation of *Expr* across the group, considering the group as a [sample](https://en.wikipedia.org/wiki/Sample_%28statistics%29).',
    },
    {
        text: 'stdevif',
        hint: 'Calculates the [stdev](stdev-aggfunction.md) of *Expr* across the group for which *Predicate* evaluates to `true`.',
    },
    {
        text: 'stdevp',
        hint: 'Calculates the standard deviation of *Expr* across the group, considering the group as a [population](https://en.wikipedia.org/wiki/Statistical_population).',
    },
    { text: 'strcat', hint: 'Concatenates between 1 and 64 arguments.' },
    { text: 'strcat_array', hint: 'Creates a concatenated string of array values using specified delimiter.' },
    {
        text: 'strcat_delim',
        hint: 'Concatenates between 2 and 64 arguments, with delimiter, provided as first argument.',
    },
    { text: 'strcmp', hint: 'Compares two strings.' },
    { text: 'string_size', hint: 'Returns the size, in bytes, of the input string.' },
    { text: 'strlen', hint: 'Returns the length, in characters, of the input string.' },
    { text: 'strrep', hint: 'Repeats given [string](./scalar-data-types/string.md) provided amount of times.' },
    {
        text: 'substring',
        hint: 'Extracts a substring from a source string starting from some index to the end of the string.',
    },
    { text: 'sum', hint: 'Calculates the sum of *Expr* across the group.' },
    { text: 'sumif', hint: 'Returns a sum of *Expr* for which *Predicate* evaluates to `true`.' },
    { text: 'table', hint: 'References specific table using an query-time evaluated string-expression.' },
    { text: 'tan', hint: 'Returns the tangent function.' },
    {
        text: 'tdigest',
        hint: 'Calculates the Intermediate results of [`percentiles()`](percentiles-aggfunction.md) across the group.',
    },
    {
        text: 'tdigest_merge',
        hint: 'Merges tdigest results (scalar version of the aggregate version [`tdigest_merge()`](tdigest-merge-aggfunction.md)).',
    },
    { text: 'tobool', hint: 'Converts input to boolean (signed 8-bit) representation.' },
    { text: 'todatetime', hint: 'Converts input to [datetime](./scalar-data-types/datetime.md) scalar.' },
    { text: 'todecimal', hint: 'Converts input to decimal number representation.' },
    {
        text: 'todouble',
        hint: 'Converts the input to a value of type `real`. (`todouble()` and `toreal()` are synonyms.)',
    },
    {
        text: 'todynamic',
        hint: 'Interprets a `string` as a [JSON value](https://json.org/) and returns the value as [`dynamic`](./scalar-data-types/dynamic.md).',
    },
    { text: 'toguid', hint: 'Converts input to [`guid`](./scalar-data-types/guid.md) representation.' },
    { text: 'tohex', hint: 'Converts input to a hexadecimal string.' },
    { text: 'toint', hint: 'Converts input to integer (signed 32-bit) number representation.' },
    { text: 'tolong', hint: 'Converts input to long (signed 64-bit) number representation.' },
    { text: 'tolower', hint: 'Converts input string to lower case.' },
    { text: 'toscalar', hint: 'Returns a scalar constant value of the evaluated expression.' },
    { text: 'tostring', hint: 'Converts input to a string representation.' },
    { text: 'totimespan', hint: 'Converts input  to [timespan](./scalar-data-types/timespan.md) scalar.' },
    { text: 'toupper', hint: 'Converts a string to upper case.' },
    {
        text: 'translate',
        hint: "Replaces a set of characters ('searchList') with another set of characters ('replacementList') in a given a string.\r\nThe function searches for characters in the 'searchList' and replaces them with the corresponding characters in 'replacementList'",
    },
    { text: 'treepath', hint: 'Enumerates all the path expressions that identify leaves in a dynamic object.' },
    { text: 'trim', hint: 'Removes all leading and trailing matches of the specified regular expression.' },
    { text: 'trim_end', hint: 'Removes trailing match of the specified regular expression.' },
    { text: 'trim_start', hint: 'Removes leading match of the specified regular expression.' },
    { text: 'url_decode', hint: 'The function converts encoded URL into a to regular URL representation.' },
    {
        text: 'url_encode',
        hint: 'The function converts characters of the input URL into a format that can be transmitted over the Internet.',
    },
    {
        text: 'variance',
        hint: 'Calculates the variance of *Expr* across the group, considering the group as a [sample](https://en.wikipedia.org/wiki/Sample_%28statistics%29).',
    },
    {
        text: 'varianceif',
        hint: 'Calculates the [variance](variance-aggfunction.md) of *Expr* across the group for which *Predicate* evaluates to `true`.',
    },
    {
        text: 'variancep',
        hint: 'Calculates the variance of *Expr* across the group, considering the group as a [population](https://en.wikipedia.org/wiki/Statistical_population).',
    },
    { text: 'weekofyear', hint: 'Returns the integer number represents the week number.' },
    {
        text: 'welch_test',
        hint: 'Computes the p_value of the [Welch-test function](https://en.wikipedia.org/wiki/Welch%27s_t-test)',
    },
    {
        text: 'zip',
        hint: 'The `zip` function accepts any number of `dynamic` arrays, and returns an\r\narray whose elements are each an array holding the elements of the input\r\narrays of the same index.',
    },
];
var KEYWORDS = [
    'by',
    'on',
    'contains',
    'notcontains',
    'containscs',
    'notcontainscs',
    'startswith',
    'has',
    'matches',
    'regex',
    'true',
    'false',
    'and',
    'or',
    'typeof',
    'int',
    'string',
    'date',
    'datetime',
    'time',
    'long',
    'real',
    '​boolean',
    'bool',
];
var grafanaMacros = [
    {
        text: '$__timeFilter',
        display: '$__timeFilter()',
        hint: 'Macro that uses the selected timerange in Grafana to filter the query.',
    },
    {
        text: '$__timeTo',
        display: '$__timeTo()',
        hint: 'Returns the From datetime from the Grafana picker. Example: datetime(2018-06-05T20:09:58.907Z).',
    },
    {
        text: '$__timeFrom',
        display: '$__timeFrom()',
        hint: 'Returns the From datetime from the Grafana picker. Example: datetime(2018-06-05T18:09:58.907Z).',
    },
    {
        text: '$__escapeMulti',
        display: '$__escapeMulti()',
        hint: 'Macro to escape multi-value template variables that contain illegal characters.',
    },
    { text: '$__contains', display: '$__contains()', hint: 'Macro for multi-value template variables.' },
];
// Kusto operators
// export const OPERATORS = ['+', '-', '*', '/', '>', '<', '==', '<>', '<=', '>=', '~', '!~'];
var DURATION = ['SECONDS', 'MINUTES', 'HOURS', 'DAYS', 'WEEKS', 'MONTHS', 'YEARS'];
var tokenizer = {
    comment: {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true,
    },
    'function-context': {
        pattern: /[a-z0-9_]+\([^)]*\)?/i,
        inside: {},
    },
    duration: {
        pattern: new RegExp(DURATION.join('?|') + "?", 'i'),
        alias: 'number',
    },
    builtin: new RegExp("\\b(?:" + functionTokens.map(function (f) { return f.text; }).join('|') + ")(?=\\s*\\()", 'i'),
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true,
    },
    keyword: new RegExp("\\b(?:" + KEYWORDS.join('|') + "|" + operatorTokens.map(function (f) { return f.text; }).join('|') + "|\\*)\\b", 'i'),
    boolean: /\b(?:true|false)\b/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /-|\+|\*|\/|>|<|==|<=?|>=?|<>|!~|~|=|\|/,
    punctuation: /[{};(),.:]/,
    variable: /(\[\[(.+?)\]\])|(\$(.+?))\b/,
};
tokenizer['function-context'].inside = {
    argument: {
        pattern: /[a-z0-9_]+(?=:)/i,
        alias: 'symbol',
    },
    duration: tokenizer.duration,
    number: tokenizer.number,
    builtin: tokenizer.builtin,
    string: tokenizer.string,
    variable: tokenizer.variable,
};
// console.log(tokenizer.builtin);
/* harmony default export */ __webpack_exports__["default"] = (tokenizer);
// function escapeRegExp(str: string): string {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
// }


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/query_field.tsx":
/*!***********************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/query_field.tsx ***!
  \***********************************************************************************************/
/*! exports provided: makeFragment, getInitialValue, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeFragment", function() { return makeFragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitialValue", function() { return getInitialValue; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var app_features_explore_slate_plugins_prism__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/features/explore/slate-plugins/prism */ "./public/app/features/explore/slate-plugins/prism/index.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _typeahead__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./typeahead */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/typeahead.tsx");
/* harmony import */ var app_core_services_keybindingSrv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/services/keybindingSrv */ "./public/app/core/services/keybindingSrv.ts");
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! slate */ "./node_modules/slate/lib/slate.es.js");
/* harmony import */ var _grafana_slate_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/slate-react */ "./node_modules/@grafana/slate-react/lib/slate-react.es.js");
/* harmony import */ var slate_plain_serializer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! slate-plain-serializer */ "./node_modules/slate-plain-serializer/lib/slate-plain-serializer.es.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);










function flattenSuggestions(s) {
    return s ? s.reduce(function (acc, g) { return acc.concat(g.items); }, []) : [];
}
var makeFragment = function (text) {
    var lines = text.split('\n').map(function (line) {
        return slate__WEBPACK_IMPORTED_MODULE_5__["Block"].create({
            type: 'paragraph',
            nodes: [slate__WEBPACK_IMPORTED_MODULE_5__["Text"].create(line)],
        });
    });
    var fragment = slate__WEBPACK_IMPORTED_MODULE_5__["Document"].create({
        nodes: lines,
    });
    return fragment;
};
var getInitialValue = function (query) { return slate__WEBPACK_IMPORTED_MODULE_5__["Value"].create({ document: makeFragment(query) }); };
var Portal = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Portal, _super);
    function Portal(props) {
        var _this = _super.call(this, props) || this;
        var _a = props.index, index = _a === void 0 ? 0 : _a, _b = props.prefix, prefix = _b === void 0 ? 'query' : _b;
        _this.node = document.createElement('div');
        _this.node.classList.add("slate-typeahead", "slate-typeahead-" + prefix + "-" + index);
        document.body.appendChild(_this.node);
        return _this;
    }
    Portal.prototype.componentWillUnmount = function () {
        document.body.removeChild(this.node);
    };
    Portal.prototype.render = function () {
        return react_dom__WEBPACK_IMPORTED_MODULE_8___default.a.createPortal(this.props.children, this.node);
    };
    return Portal;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component));
var QueryField = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryField, _super);
    function QueryField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.keybindingSrv = Object(app_core_services_keybindingSrv__WEBPACK_IMPORTED_MODULE_4__["getKeybindingSrv"])();
        _this.onChange = function (_a) {
            var value = _a.value;
            var changed = value.document !== _this.state.value.document;
            _this.setState({ value: value }, function () {
                if (changed) {
                    // call typeahead only if query changed
                    requestAnimationFrame(function () { return _this.onTypeahead(); });
                    _this.onChangeQuery();
                }
            });
        };
        _this.request = function (url) {
            if (_this.props.request) {
                return _this.props.request(url);
            }
            return fetch(url);
        };
        _this.onChangeQuery = function () {
            // Send text change to parent
            var onQueryChange = _this.props.onQueryChange;
            if (onQueryChange) {
                onQueryChange(slate_plain_serializer__WEBPACK_IMPORTED_MODULE_7__["default"].serialize(_this.state.value));
            }
        };
        _this.onKeyDown = function (event, editor, next) {
            var _a = _this.state, typeaheadIndex = _a.typeaheadIndex, suggestions = _a.suggestions;
            var keyboardEvent = event;
            switch (keyboardEvent.key) {
                case 'Escape': {
                    if (_this.menuEl) {
                        keyboardEvent.preventDefault();
                        keyboardEvent.stopPropagation();
                        _this.resetTypeahead();
                        return true;
                    }
                    break;
                }
                case ' ': {
                    if (keyboardEvent.ctrlKey) {
                        keyboardEvent.preventDefault();
                        _this.onTypeahead(true);
                        return true;
                    }
                    break;
                }
                case 'Tab':
                case 'Enter': {
                    if (_this.menuEl) {
                        // Dont blur input
                        keyboardEvent.preventDefault();
                        if (!suggestions || !suggestions.length) {
                            return next();
                        }
                        // Get the currently selected suggestion
                        var flattenedSuggestions = flattenSuggestions(suggestions);
                        var selected = Math.abs(typeaheadIndex);
                        var selectedIndex = selected % flattenedSuggestions.length || 0;
                        var suggestion = flattenedSuggestions[selectedIndex];
                        return _this.applyTypeahead(editor, suggestion);
                    }
                    break;
                }
                case 'ArrowDown': {
                    if (_this.menuEl) {
                        // Select next suggestion
                        keyboardEvent.preventDefault();
                        _this.setState({ typeaheadIndex: typeaheadIndex + 1 });
                    }
                    break;
                }
                case 'ArrowUp': {
                    if (_this.menuEl) {
                        // Select previous suggestion
                        keyboardEvent.preventDefault();
                        _this.setState({ typeaheadIndex: Math.max(0, typeaheadIndex - 1) });
                    }
                    break;
                }
                default: {
                    // console.log('default key', event.key, event.which, event.charCode, event.locale, data.key);
                    break;
                }
            }
            return next();
        };
        _this.onTypeahead = function (change, item) {
            if (change === void 0) { change = false; }
            return change;
        };
        _this.applyTypeahead = function (editor, suggestion) {
            return { value: new slate__WEBPACK_IMPORTED_MODULE_5__["Value"]() };
        };
        _this.resetTypeahead = function (callback) {
            _this.setState({
                suggestions: [],
                typeaheadIndex: 0,
                typeaheadPrefix: '',
                typeaheadContext: null,
            }, callback);
        };
        _this.handleBlur = function (event, editor, next) {
            var onBlur = _this.props.onBlur;
            // If we dont wait here, menu clicks wont work because the menu
            // will be gone.
            _this.resetTimer = setTimeout(_this.resetTypeahead, 100);
            if (onBlur) {
                onBlur();
            }
            _this.restoreEscapeKeyBinding();
            return next();
        };
        _this.handleFocus = function (event, editor, next) {
            var onFocus = _this.props.onFocus;
            if (onFocus) {
                onFocus();
            }
            // Don't go back to dashboard if Escape pressed inside the editor.
            _this.removeEscapeKeyBinding();
            return next();
        };
        _this.onClickItem = function (item) {
            var suggestions = _this.state.suggestions;
            if (!suggestions || suggestions.length === 0) {
                return;
            }
            // Manually triggering change
            var change = _this.applyTypeahead();
            _this.onChange(change);
        };
        _this.updateMenu = function () {
            var suggestions = _this.state.suggestions;
            var menu = _this.menuEl;
            var selection = window.getSelection();
            var node = selection.anchorNode;
            // No menu, nothing to do
            if (!menu) {
                return;
            }
            // No suggestions or blur, remove menu
            var hasSuggesstions = suggestions && suggestions.length > 0;
            if (!hasSuggesstions) {
                menu.removeAttribute('style');
                return;
            }
            // Align menu overlay to editor node
            if (node && node.parentElement) {
                // Read from DOM
                var rect = node.parentElement.getBoundingClientRect();
                var scrollX = window.scrollX;
                var scrollY = window.scrollY;
                var screenHeight = window.innerHeight;
                var menuLeft_1 = rect.left + scrollX - 2;
                var menuTop_1 = rect.top + scrollY + rect.height + 4;
                var menuHeight_1 = screenHeight - menuTop_1 - 10;
                // Write DOM
                requestAnimationFrame(function () {
                    menu.style.opacity = 1;
                    menu.style.top = menuTop_1 + "px";
                    menu.style.left = menuLeft_1 + "px";
                    menu.style.maxHeight = menuHeight_1 + "px";
                });
            }
        };
        _this.menuRef = function (el) {
            _this.menuEl = el;
        };
        _this.renderMenu = function () {
            var portalPrefix = _this.props.portalPrefix;
            var suggestions = _this.state.suggestions;
            var hasSuggesstions = suggestions && suggestions.length > 0;
            if (!hasSuggesstions) {
                return null;
            }
            // Guard selectedIndex to be within the length of the suggestions
            var selectedIndex = Math.max(_this.state.typeaheadIndex, 0);
            var flattenedSuggestions = flattenSuggestions(suggestions);
            selectedIndex = selectedIndex % flattenedSuggestions.length || 0;
            var selectedKeys = (flattenedSuggestions.length > 0 ? [flattenedSuggestions[selectedIndex]] : []).map(function (i) {
                return typeof i === 'object' ? i.text : i;
            });
            // Create typeahead in DOM root so we can later position it absolutely
            return (react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(Portal, { prefix: portalPrefix },
                react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_typeahead__WEBPACK_IMPORTED_MODULE_3__["default"], { menuRef: _this.menuRef, selectedItems: selectedKeys, onClickItem: _this.onClickItem, groupedItems: suggestions })));
        };
        var _a = props.prismDefinition, prismDefinition = _a === void 0 ? {} : _a, _b = props.prismLanguage, prismLanguage = _b === void 0 ? 'kusto' : _b;
        _this.plugins = [
            Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["BracesPlugin"])(),
            Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ClearPlugin"])(),
            Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["RunnerPlugin"])({ handler: props.onPressEnter }),
            Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["NewlinePlugin"])(),
            Object(app_features_explore_slate_plugins_prism__WEBPACK_IMPORTED_MODULE_1__["default"])({ definition: prismDefinition, language: prismLanguage }),
        ];
        _this.state = {
            labelKeys: {},
            labelValues: {},
            suggestions: [],
            typeaheadIndex: 0,
            typeaheadPrefix: '',
            value: getInitialValue(props.initialQuery || ''),
        };
        return _this;
    }
    QueryField.prototype.componentDidMount = function () {
        this.updateMenu();
    };
    QueryField.prototype.componentWillUnmount = function () {
        this.restoreEscapeKeyBinding();
        clearTimeout(this.resetTimer);
    };
    QueryField.prototype.componentDidUpdate = function () {
        this.updateMenu();
    };
    QueryField.prototype.removeEscapeKeyBinding = function () {
        this.keybindingSrv.unbind('esc', 'keydown');
    };
    QueryField.prototype.restoreEscapeKeyBinding = function () {
        this.keybindingSrv.setupGlobal();
    };
    QueryField.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", { className: "slate-query-field" },
            this.renderMenu(),
            react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_grafana_slate_react__WEBPACK_IMPORTED_MODULE_6__["Editor"], { autoCorrect: false, onBlur: this.handleBlur, onKeyDown: this.onKeyDown, onChange: this.onChange, onFocus: this.handleFocus, placeholder: this.props.placeholder, plugins: this.plugins, spellCheck: false, value: this.state.value })));
    };
    return QueryField;
}(react__WEBPACK_IMPORTED_MODULE_9___default.a.Component));
/* harmony default export */ __webpack_exports__["default"] = (QueryField);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/typeahead.tsx":
/*!*********************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/typeahead.tsx ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function scrollIntoView(el) {
    if (!el || !el.offsetParent) {
        return;
    }
    var container = el.offsetParent;
    if (el.offsetTop > container.scrollTop + container.offsetHeight || el.offsetTop < container.scrollTop) {
        container.scrollTop = el.offsetTop - container.offsetTop;
    }
}
var TypeaheadItem = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TypeaheadItem, _super);
    function TypeaheadItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRef = function (el) {
            _this.el = el;
        };
        return _this;
    }
    TypeaheadItem.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.isSelected && !prevProps.isSelected) {
            scrollIntoView(this.el);
        }
    };
    TypeaheadItem.prototype.render = function () {
        var _a = this.props, hint = _a.hint, isSelected = _a.isSelected, label = _a.label, onClickItem = _a.onClickItem;
        var className = isSelected ? 'typeahead-item typeahead-item__selected' : 'typeahead-item';
        var onClick = function () { return onClickItem(label); };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { ref: this.getRef, className: className, onClick: onClick },
            label,
            hint && isSelected ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "typeahead-item-hint" }, hint) : null));
    };
    return TypeaheadItem;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));
var TypeaheadGroup = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TypeaheadGroup, _super);
    function TypeaheadGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeaheadGroup.prototype.render = function () {
        var _a = this.props, items = _a.items, label = _a.label, selected = _a.selected, onClickItem = _a.onClickItem;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "typeahead-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "typeahead-group__title" }, label),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "typeahead-group__list" }, items.map(function (item) {
                var text = typeof item === 'object' ? item.text : item;
                var label = typeof item === 'object' ? item.display || item.text : item;
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TypeaheadItem, { key: text, onClickItem: onClickItem, isSelected: selected.indexOf(text) > -1, hint: item.hint, label: label }));
            }))));
    };
    return TypeaheadGroup;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));
var Typeahead = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Typeahead, _super);
    function Typeahead() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Typeahead.prototype.render = function () {
        var _a = this.props, groupedItems = _a.groupedItems, menuRef = _a.menuRef, selectedItems = _a.selectedItems, onClickItem = _a.onClickItem;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "typeahead", ref: menuRef }, groupedItems.map(function (g) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TypeaheadGroup, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ key: g.label, onClickItem: onClickItem, selected: selectedItems }, g))); })));
    };
    return Typeahead;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));
/* harmony default export */ __webpack_exports__["default"] = (Typeahead);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/log_analytics/querystring_builder.ts":
/*!*************************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/log_analytics/querystring_builder.ts ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

var LogAnalyticsQuerystringBuilder = /** @class */ (function () {
    function LogAnalyticsQuerystringBuilder(rawQueryString, options, defaultTimeField) {
        this.rawQueryString = rawQueryString;
        this.options = options;
        this.defaultTimeField = defaultTimeField;
    }
    LogAnalyticsQuerystringBuilder.prototype.generate = function () {
        var _this = this;
        var queryString = this.rawQueryString;
        var macroRegexp = /\$__([_a-zA-Z0-9]+)\(([^\)]*)\)/gi;
        queryString = queryString.replace(macroRegexp, function (match, p1, p2) {
            if (p1 === 'contains') {
                return _this.getMultiContains(p2);
            }
            return match;
        });
        queryString = queryString.replace(/\$__escapeMulti\(('[^]*')\)/gi, function (match, p1) { return _this.escape(p1); });
        if (this.options) {
            queryString = queryString.replace(macroRegexp, function (match, p1, p2) {
                if (p1 === 'timeFilter') {
                    return _this.getTimeFilter(p2, _this.options);
                }
                if (p1 === 'timeFrom') {
                    return _this.getFrom(_this.options);
                }
                if (p1 === 'timeTo') {
                    return _this.getUntil(_this.options);
                }
                return match;
            });
            queryString = queryString.replace(/\$__interval/gi, this.options.interval);
        }
        var rawQuery = queryString;
        queryString = encodeURIComponent(queryString);
        var uriString = "query=" + queryString;
        return { uriString: uriString, rawQuery: rawQuery };
    };
    LogAnalyticsQuerystringBuilder.prototype.getFrom = function (options) {
        var from = options.range.from;
        return "datetime(" + Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(from)
            .startOf('minute')
            .toISOString() + ")";
    };
    LogAnalyticsQuerystringBuilder.prototype.getUntil = function (options) {
        if (options.rangeRaw.to === 'now') {
            var now = Date.now();
            return "datetime(" + Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(now)
                .startOf('minute')
                .toISOString() + ")";
        }
        else {
            var until = options.range.to;
            return "datetime(" + Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(until)
                .startOf('minute')
                .toISOString() + ")";
        }
    };
    LogAnalyticsQuerystringBuilder.prototype.getTimeFilter = function (timeFieldArg, options) {
        var timeField = timeFieldArg || this.defaultTimeField;
        if (options.rangeRaw.to === 'now') {
            return timeField + " >= " + this.getFrom(options);
        }
        else {
            return timeField + "  >= " + this.getFrom(options) + " and " + timeField + " <= " + this.getUntil(options);
        }
    };
    LogAnalyticsQuerystringBuilder.prototype.getMultiContains = function (inputs) {
        var firstCommaIndex = inputs.indexOf(',');
        var field = inputs.substring(0, firstCommaIndex);
        var templateVar = inputs.substring(inputs.indexOf(',') + 1);
        if (templateVar && templateVar.toLowerCase().trim() === 'all') {
            return '1 == 1';
        }
        return field.trim() + " in (" + templateVar.trim() + ")";
    };
    LogAnalyticsQuerystringBuilder.prototype.escape = function (inputs) {
        return inputs
            .substring(1, inputs.length - 1)
            .split("','")
            .map(function (v) { return "@'" + v + "'"; })
            .join(', ');
    };
    return LogAnalyticsQuerystringBuilder;
}());
/* harmony default export */ __webpack_exports__["default"] = (LogAnalyticsQuerystringBuilder);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/module.tsx":
/*!***********************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/module.tsx ***!
  \***********************************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/query_ctrl.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/datasource.ts");
/* harmony import */ var _components_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ConfigEditor */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/components/ConfigEditor.tsx");
/* harmony import */ var _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotations_query_ctrl */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/annotations_query_ctrl.ts");





var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_2__["default"])
    .setConfigEditor(_components_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__["ConfigEditor"])
    .setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_1__["AzureMonitorQueryCtrl"])
    .setAnnotationQueryCtrl(_annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_4__["AzureMonitorAnnotationsQueryCtrl"]);


/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/query_ctrl.ts":
/*!**************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/query_ctrl.ts ***!
  \**************************************************************************************/
/*! exports provided: AzureMonitorQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AzureMonitorQueryCtrl", function() { return AzureMonitorQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./time_grain_converter */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts");
/* harmony import */ var _editor_editor_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor/editor_component */ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/editor/editor_component.tsx");
/* harmony import */ var app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/kbn */ "./public/app/core/utils/kbn.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");



// import './css/query_editor.css';




var AzureMonitorQueryCtrl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AzureMonitorQueryCtrl, _super);
    /** @ngInject */
    function AzureMonitorQueryCtrl($scope, $injector, templateSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.templateSrv = templateSrv;
        _this.defaultDropdownValue = 'select';
        _this.defaults = {
            queryType: 'Azure Monitor',
            azureMonitor: {
                resourceGroup: _this.defaultDropdownValue,
                metricDefinition: _this.defaultDropdownValue,
                resourceName: _this.defaultDropdownValue,
                metricNamespace: _this.defaultDropdownValue,
                metricName: _this.defaultDropdownValue,
                dimensionFilter: '*',
                timeGrain: 'auto',
                top: '10',
                aggOptions: [],
                timeGrains: [],
            },
            azureLogAnalytics: {
                query: [
                    '//change this example to create your own time series query',
                    '<table name>                                                              ' +
                        '//the table to query (e.g. Usage, Heartbeat, Perf)',
                    '| where $__timeFilter(TimeGenerated)                                      ' +
                        '//this is a macro used to show the full chart’s time range, choose the datetime column here',
                    '| summarize count() by <group by column>, bin(TimeGenerated, $__interval) ' +
                        '//change “group by column” to a column in your table, such as “Computer”. ' +
                        'The $__interval macro is used to auto-select the time grain. Can also use 1h, 5m etc.',
                    '| order by TimeGenerated asc',
                ].join('\n'),
                resultFormat: 'time_series',
                workspace: _this.datasource && _this.datasource.azureLogAnalyticsDatasource
                    ? _this.datasource.azureLogAnalyticsDatasource.defaultOrFirstWorkspace
                    : '',
            },
            appInsights: {
                metricName: _this.defaultDropdownValue,
                rawQuery: false,
                rawQueryString: '',
                dimension: 'none',
                timeGrain: 'auto',
                timeColumn: 'timestamp',
                valueColumn: '',
            },
        };
        /* Azure Log Analytics */
        _this.getWorkspaces = function () {
            return _this.datasource.azureLogAnalyticsDatasource
                .getWorkspaces(_this.target.subscription)
                .then(function (list) {
                _this.workspaces = list;
                if (list.length > 0 && !_this.target.azureLogAnalytics.workspace) {
                    if (_this.datasource.azureLogAnalyticsDatasource.defaultOrFirstWorkspace) {
                        _this.target.azureLogAnalytics.workspace = _this.datasource.azureLogAnalyticsDatasource.defaultOrFirstWorkspace;
                    }
                    if (!_this.target.azureLogAnalytics.workspace) {
                        _this.target.azureLogAnalytics.workspace = list[0].value;
                    }
                }
                return _this.workspaces;
            })
                .catch(_this.handleQueryCtrlError.bind(_this));
        };
        _this.getAzureLogAnalyticsSchema = function () {
            return _this.getWorkspaces()
                .then(function () {
                return _this.datasource.azureLogAnalyticsDatasource.getSchema(_this.target.azureLogAnalytics.workspace);
            })
                .catch(_this.handleQueryCtrlError.bind(_this));
        };
        _this.onLogAnalyticsQueryChange = function (nextQuery) {
            _this.target.azureLogAnalytics.query = nextQuery;
        };
        _this.onLogAnalyticsQueryExecute = function () {
            _this.panelCtrl.refresh();
        };
        _this.onAppInsightsQueryChange = function (nextQuery) {
            _this.target.appInsights.rawQueryString = nextQuery;
        };
        _this.onAppInsightsQueryExecute = function () {
            return _this.refresh();
        };
        _this.getAppInsightsQuerySchema = function () {
            return _this.datasource.appInsightsDatasource.getQuerySchema().catch(_this.handleQueryCtrlError.bind(_this));
        };
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.defaultsDeep(_this.target, _this.defaults);
        _this.migrateTimeGrains();
        _this.migrateToFromTimes();
        _this.migrateToDefaultNamespace();
        _this.migrateApplicationInsightsKeys();
        _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["PanelEvents"].dataReceived, _this.onDataReceived.bind(_this), $scope);
        _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["PanelEvents"].dataError, _this.onDataError.bind(_this), $scope);
        _this.resultFormats = [
            { text: 'Time series', value: 'time_series' },
            { text: 'Table', value: 'table' },
        ];
        _this.getSubscriptions();
        if (_this.target.queryType === 'Azure Log Analytics') {
            _this.getWorkspaces();
        }
        return _this;
    }
    AzureMonitorQueryCtrl.prototype.onDataReceived = function (dataList) {
        this.lastQueryError = undefined;
        this.lastQuery = '';
        var anySeriesFromQuery = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(dataList, { refId: this.target.refId });
        if (anySeriesFromQuery && anySeriesFromQuery.meta) {
            this.lastQuery = anySeriesFromQuery.meta.query;
        }
    };
    AzureMonitorQueryCtrl.prototype.onDataError = function (err) {
        this.handleQueryCtrlError(err);
    };
    AzureMonitorQueryCtrl.prototype.handleQueryCtrlError = function (err) {
        if (err.query && err.query.refId && err.query.refId !== this.target.refId) {
            return;
        }
        if (err.error && err.error.data && err.error.data.error && err.error.data.error.innererror) {
            if (err.error.data.error.innererror.innererror) {
                this.lastQueryError = err.error.data.error.innererror.innererror.message;
            }
            else {
                this.lastQueryError = err.error.data.error.innererror.message;
            }
        }
        else if (err.error && err.error.data && err.error.data.error) {
            this.lastQueryError = err.error.data.error.message;
        }
        else if (err.error && err.error.data) {
            this.lastQueryError = err.error.data.message;
        }
        else if (err.data && err.data.error) {
            this.lastQueryError = err.data.error.message;
        }
        else if (err.data && err.data.message) {
            this.lastQueryError = err.data.message;
        }
        else {
            this.lastQueryError = err;
        }
    };
    AzureMonitorQueryCtrl.prototype.migrateTimeGrains = function () {
        if (this.target.azureMonitor.timeGrainUnit) {
            if (this.target.azureMonitor.timeGrain !== 'auto') {
                this.target.azureMonitor.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createISO8601Duration(this.target.azureMonitor.timeGrain, this.target.azureMonitor.timeGrainUnit);
            }
            delete this.target.azureMonitor.timeGrainUnit;
            this.onMetricNameChange();
        }
        if (this.target.appInsights.timeGrainUnit) {
            if (this.target.appInsights.timeGrain !== 'auto') {
                if (this.target.appInsights.timeGrainCount) {
                    this.target.appInsights.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createISO8601Duration(this.target.appInsights.timeGrainCount, this.target.appInsights.timeGrainUnit);
                }
                else {
                    this.target.appInsights.timeGrainCount = this.target.appInsights.timeGrain;
                    this.target.appInsights.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createISO8601Duration(this.target.appInsights.timeGrain, this.target.appInsights.timeGrainUnit);
                }
            }
        }
        if (this.target.azureMonitor.timeGrains &&
            this.target.azureMonitor.timeGrains.length > 0 &&
            (!this.target.azureMonitor.allowedTimeGrainsMs || this.target.azureMonitor.allowedTimeGrainsMs.length === 0)) {
            this.target.azureMonitor.allowedTimeGrainsMs = this.convertTimeGrainsToMs(this.target.azureMonitor.timeGrains);
        }
        if (this.target.appInsights.timeGrains &&
            this.target.appInsights.timeGrains.length > 0 &&
            (!this.target.appInsights.allowedTimeGrainsMs || this.target.appInsights.allowedTimeGrainsMs.length === 0)) {
            this.target.appInsights.allowedTimeGrainsMs = this.convertTimeGrainsToMs(this.target.appInsights.timeGrains);
        }
    };
    AzureMonitorQueryCtrl.prototype.migrateToFromTimes = function () {
        this.target.azureLogAnalytics.query = this.target.azureLogAnalytics.query.replace(/\$__from\s/gi, '$__timeFrom() ');
        this.target.azureLogAnalytics.query = this.target.azureLogAnalytics.query.replace(/\$__to\s/gi, '$__timeTo() ');
    };
    AzureMonitorQueryCtrl.prototype.migrateToDefaultNamespace = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (this.target.azureMonitor.metricNamespace &&
                    this.target.azureMonitor.metricNamespace !== this.defaultDropdownValue &&
                    this.target.azureMonitor.metricDefinition) {
                    return [2 /*return*/];
                }
                this.target.azureMonitor.metricNamespace = this.target.azureMonitor.metricDefinition;
                return [2 /*return*/];
            });
        });
    };
    AzureMonitorQueryCtrl.prototype.migrateApplicationInsightsKeys = function () {
        var appInsights = this.target.appInsights;
        // Migrate old app insights data keys to match other datasources
        var mappings = {
            xaxis: 'timeColumn',
            yaxis: 'valueColumn',
            spliton: 'segmentColumn',
            groupBy: 'dimension',
            groupByOptions: 'dimensions',
            filter: 'dimensionFilter',
        };
        for (var old in mappings) {
            if (appInsights[old]) {
                appInsights[mappings[old]] = appInsights[old];
                delete appInsights[old];
            }
        }
    };
    AzureMonitorQueryCtrl.prototype.replace = function (variable) {
        return this.templateSrv.replace(variable, this.panelCtrl.panel.scopedVars);
    };
    AzureMonitorQueryCtrl.prototype.onQueryTypeChange = function () {
        if (this.target.queryType === 'Azure Log Analytics') {
            return this.getWorkspaces();
        }
    };
    AzureMonitorQueryCtrl.prototype.getSubscriptions = function () {
        var _this = this;
        if (!this.datasource.azureMonitorDatasource.isConfigured()) {
            return;
        }
        return this.datasource.azureMonitorDatasource.getSubscriptions().then(function (subs) {
            _this.subscriptions = subs;
            if (!_this.target.subscription && _this.target.queryType === 'Azure Monitor') {
                _this.target.subscription = _this.datasource.azureMonitorDatasource.subscriptionId;
            }
            else if (!_this.target.subscription && _this.target.queryType === 'Azure Log Analytics') {
                _this.target.subscription = _this.datasource.azureLogAnalyticsDatasource.logAnalyticsSubscriptionId;
            }
            if (!_this.target.subscription && _this.subscriptions.length > 0) {
                _this.target.subscription = _this.subscriptions[0].value;
            }
            return _this.subscriptions;
        });
    };
    AzureMonitorQueryCtrl.prototype.onSubscriptionChange = function () {
        if (this.target.queryType === 'Azure Log Analytics') {
            return this.getWorkspaces();
        }
        if (this.target.queryType === 'Azure Monitor') {
            this.target.azureMonitor.resourceGroup = this.defaultDropdownValue;
            this.target.azureMonitor.metricDefinition = this.defaultDropdownValue;
            this.target.azureMonitor.resourceName = this.defaultDropdownValue;
            this.target.azureMonitor.metricName = this.defaultDropdownValue;
            this.target.azureMonitor.aggregation = '';
            this.target.azureMonitor.timeGrains = [];
            this.target.azureMonitor.timeGrain = '';
            this.target.azureMonitor.dimensions = [];
            this.target.azureMonitor.dimension = '';
        }
    };
    /* Azure Monitor Section */
    AzureMonitorQueryCtrl.prototype.getResourceGroups = function (query) {
        if (this.target.queryType !== 'Azure Monitor' || !this.datasource.azureMonitorDatasource.isConfigured()) {
            return;
        }
        return this.datasource
            .getResourceGroups(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId))
            .catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getMetricDefinitions = function (query) {
        if (this.target.queryType !== 'Azure Monitor' ||
            !this.target.azureMonitor.resourceGroup ||
            this.target.azureMonitor.resourceGroup === this.defaultDropdownValue) {
            return;
        }
        return this.datasource
            .getMetricDefinitions(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId), this.replace(this.target.azureMonitor.resourceGroup))
            .catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getResourceNames = function (query) {
        if (this.target.queryType !== 'Azure Monitor' ||
            !this.target.azureMonitor.resourceGroup ||
            this.target.azureMonitor.resourceGroup === this.defaultDropdownValue ||
            !this.target.azureMonitor.metricDefinition ||
            this.target.azureMonitor.metricDefinition === this.defaultDropdownValue) {
            return;
        }
        return this.datasource
            .getResourceNames(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId), this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition))
            .catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getMetricNamespaces = function () {
        if (this.target.queryType !== 'Azure Monitor' ||
            !this.target.azureMonitor.resourceGroup ||
            this.target.azureMonitor.resourceGroup === this.defaultDropdownValue ||
            !this.target.azureMonitor.metricDefinition ||
            this.target.azureMonitor.metricDefinition === this.defaultDropdownValue ||
            !this.target.azureMonitor.resourceName ||
            this.target.azureMonitor.resourceName === this.defaultDropdownValue) {
            return;
        }
        return this.datasource
            .getMetricNamespaces(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId), this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName))
            .catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getMetricNames = function () {
        if (this.target.queryType !== 'Azure Monitor' ||
            !this.target.azureMonitor.resourceGroup ||
            this.target.azureMonitor.resourceGroup === this.defaultDropdownValue ||
            !this.target.azureMonitor.metricDefinition ||
            this.target.azureMonitor.metricDefinition === this.defaultDropdownValue ||
            !this.target.azureMonitor.resourceName ||
            this.target.azureMonitor.resourceName === this.defaultDropdownValue ||
            !this.target.azureMonitor.metricNamespace ||
            this.target.azureMonitor.metricNamespace === this.defaultDropdownValue) {
            return;
        }
        return this.datasource
            .getMetricNames(this.replace(this.target.subscription || this.datasource.azureMonitorDatasource.subscriptionId), this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName), this.replace(this.target.azureMonitor.metricNamespace))
            .catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.onResourceGroupChange = function () {
        this.target.azureMonitor.metricDefinition = this.defaultDropdownValue;
        this.target.azureMonitor.resourceName = this.defaultDropdownValue;
        this.target.azureMonitor.metricNamespace = this.defaultDropdownValue;
        this.target.azureMonitor.metricName = this.defaultDropdownValue;
        this.target.azureMonitor.aggregation = '';
        this.target.azureMonitor.timeGrains = [];
        this.target.azureMonitor.timeGrain = '';
        this.target.azureMonitor.dimensions = [];
        this.target.azureMonitor.dimension = '';
        this.refresh();
    };
    AzureMonitorQueryCtrl.prototype.onMetricDefinitionChange = function () {
        this.target.azureMonitor.resourceName = this.defaultDropdownValue;
        this.target.azureMonitor.metricNamespace = this.defaultDropdownValue;
        this.target.azureMonitor.metricName = this.defaultDropdownValue;
        this.target.azureMonitor.aggregation = '';
        this.target.azureMonitor.timeGrains = [];
        this.target.azureMonitor.timeGrain = '';
        this.target.azureMonitor.dimensions = [];
        this.target.azureMonitor.dimension = '';
    };
    AzureMonitorQueryCtrl.prototype.onResourceNameChange = function () {
        this.target.azureMonitor.metricNamespace = this.defaultDropdownValue;
        this.target.azureMonitor.metricName = this.defaultDropdownValue;
        this.target.azureMonitor.aggregation = '';
        this.target.azureMonitor.timeGrains = [];
        this.target.azureMonitor.timeGrain = '';
        this.target.azureMonitor.dimensions = [];
        this.target.azureMonitor.dimension = '';
        this.refresh();
    };
    AzureMonitorQueryCtrl.prototype.onMetricNamespacesChange = function () {
        this.target.azureMonitor.metricName = this.defaultDropdownValue;
        this.target.azureMonitor.dimensions = [];
        this.target.azureMonitor.dimension = '';
    };
    AzureMonitorQueryCtrl.prototype.onMetricNameChange = function () {
        var _this = this;
        if (!this.target.azureMonitor.metricName || this.target.azureMonitor.metricName === this.defaultDropdownValue) {
            return Promise.resolve();
        }
        return this.datasource
            .getMetricMetadata(this.replace(this.target.subscription), this.replace(this.target.azureMonitor.resourceGroup), this.replace(this.target.azureMonitor.metricDefinition), this.replace(this.target.azureMonitor.resourceName), this.replace(this.target.azureMonitor.metricNamespace), this.replace(this.target.azureMonitor.metricName))
            .then(function (metadata) {
            _this.target.azureMonitor.aggOptions = metadata.supportedAggTypes || [metadata.primaryAggType];
            _this.target.azureMonitor.aggregation = metadata.primaryAggType;
            _this.target.azureMonitor.timeGrains = [{ text: 'auto', value: 'auto' }].concat(metadata.supportedTimeGrains);
            _this.target.azureMonitor.timeGrain = 'auto';
            _this.target.azureMonitor.allowedTimeGrainsMs = _this.convertTimeGrainsToMs(metadata.supportedTimeGrains || []);
            _this.target.azureMonitor.dimensions = metadata.dimensions;
            if (metadata.dimensions.length > 0) {
                _this.target.azureMonitor.dimension = metadata.dimensions[0].value;
            }
            return _this.refresh();
        })
            .catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.convertTimeGrainsToMs = function (timeGrains) {
        var allowedTimeGrainsMs = [];
        timeGrains.forEach(function (tg) {
            if (tg.value !== 'auto') {
                allowedTimeGrainsMs.push(app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_5__["default"].interval_to_ms(_time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createKbnUnitFromISO8601Duration(tg.value)));
            }
        });
        return allowedTimeGrainsMs;
    };
    AzureMonitorQueryCtrl.prototype.generateAutoUnits = function (timeGrain, timeGrains) {
        if (timeGrain === 'auto') {
            return _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].findClosestTimeGrain(this.templateSrv.getBuiltInIntervalValue(), lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(timeGrains, function (o) { return _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createKbnUnitFromISO8601Duration(o.value); }) || [
                '1m',
                '5m',
                '15m',
                '30m',
                '1h',
                '6h',
                '12h',
                '1d',
            ]);
        }
        return '';
    };
    AzureMonitorQueryCtrl.prototype.getAzureMonitorAutoInterval = function () {
        return this.generateAutoUnits(this.target.azureMonitor.timeGrain, this.target.azureMonitor.timeGrains);
    };
    AzureMonitorQueryCtrl.prototype.getApplicationInsightAutoInterval = function () {
        return this.generateAutoUnits(this.target.appInsights.timeGrain, this.target.appInsights.timeGrains);
    };
    Object.defineProperty(AzureMonitorQueryCtrl.prototype, "templateVariables", {
        get: function () {
            return this.templateSrv.variables.map(function (t) { return '$' + t.name; });
        },
        enumerable: true,
        configurable: true
    });
    /* Application Insights Section */
    AzureMonitorQueryCtrl.prototype.getAppInsightsAutoInterval = function () {
        var interval = this.templateSrv.getBuiltInIntervalValue();
        if (interval[interval.length - 1] === 's') {
            return '1m';
        }
        return interval;
    };
    AzureMonitorQueryCtrl.prototype.getAppInsightsMetricNames = function () {
        if (!this.datasource.appInsightsDatasource.isConfigured()) {
            return;
        }
        return this.datasource.getAppInsightsMetricNames().catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getAppInsightsColumns = function () {
        return this.datasource.getAppInsightsColumns(this.target.refId);
    };
    AzureMonitorQueryCtrl.prototype.onAppInsightsColumnChange = function () {
        return this.refresh();
    };
    AzureMonitorQueryCtrl.prototype.onAppInsightsMetricNameChange = function () {
        var _this = this;
        if (!this.target.appInsights.metricName || this.target.appInsights.metricName === this.defaultDropdownValue) {
            return;
        }
        return this.datasource
            .getAppInsightsMetricMetadata(this.replace(this.target.appInsights.metricName))
            .then(function (aggData) {
            _this.target.appInsights.aggOptions = aggData.supportedAggTypes;
            _this.target.appInsights.dimensions = aggData.supportedGroupBy;
            _this.target.appInsights.aggregation = aggData.primaryAggType;
            return _this.refresh();
        })
            .catch(this.handleQueryCtrlError.bind(this));
    };
    AzureMonitorQueryCtrl.prototype.getAppInsightsGroupBySegments = function (query) {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.target.appInsights.dimensions, function (option) {
            return { text: option, value: option };
        });
    };
    AzureMonitorQueryCtrl.prototype.resetAppInsightsGroupBy = function () {
        this.target.appInsights.dimension = 'none';
        this.refresh();
    };
    AzureMonitorQueryCtrl.prototype.toggleEditorMode = function () {
        this.target.appInsights.rawQuery = !this.target.appInsights.rawQuery;
    };
    AzureMonitorQueryCtrl.prototype.updateTimeGrainType = function () {
        if (this.target.appInsights.timeGrainType === 'specific') {
            this.target.appInsights.timeGrainCount = '1';
            this.target.appInsights.timeGrainUnit = 'minute';
            this.target.appInsights.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createISO8601Duration(this.target.appInsights.timeGrainCount, this.target.appInsights.timeGrainUnit);
        }
        else {
            this.target.appInsights.timeGrainCount = '';
            this.target.appInsights.timeGrainUnit = '';
        }
    };
    AzureMonitorQueryCtrl.prototype.updateAppInsightsTimeGrain = function () {
        if (this.target.appInsights.timeGrainUnit && this.target.appInsights.timeGrainCount) {
            this.target.appInsights.timeGrain = _time_grain_converter__WEBPACK_IMPORTED_MODULE_3__["default"].createISO8601Duration(this.target.appInsights.timeGrainCount, this.target.appInsights.timeGrainUnit);
        }
        this.refresh();
    };
    AzureMonitorQueryCtrl.templateUrl = 'partials/query.editor.html';
    return AzureMonitorQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__["QueryCtrl"]));



/***/ }),

/***/ "./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts":
/*!************************************************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana-azure-monitor-datasource/time_grain_converter.ts ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/utils/kbn */ "./public/app/core/utils/kbn.ts");


var TimeGrainConverter = /** @class */ (function () {
    function TimeGrainConverter() {
    }
    TimeGrainConverter.createISO8601Duration = function (timeGrain, timeGrainUnit) {
        var timeIntervals = ['hour', 'minute', 'h', 'm'];
        if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(timeIntervals, timeGrainUnit)) {
            return "PT" + timeGrain + timeGrainUnit[0].toUpperCase();
        }
        return "P" + timeGrain + timeGrainUnit[0].toUpperCase();
    };
    TimeGrainConverter.createISO8601DurationFromInterval = function (interval) {
        var timeGrain = +interval.slice(0, interval.length - 1);
        var unit = interval[interval.length - 1];
        if (interval.indexOf('ms') > -1) {
            return TimeGrainConverter.createISO8601Duration(1, 'm');
        }
        if (interval[interval.length - 1] === 's') {
            var toMinutes = (timeGrain * 60) % 60;
            if (toMinutes < 1) {
                toMinutes = 1;
            }
            return TimeGrainConverter.createISO8601Duration(toMinutes, 'm');
        }
        return TimeGrainConverter.createISO8601Duration(timeGrain, unit);
    };
    TimeGrainConverter.findClosestTimeGrain = function (interval, allowedTimeGrains) {
        var timeGrains = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(allowedTimeGrains, function (o) { return o !== 'auto'; });
        var closest = timeGrains[0];
        var intervalMs = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["default"].interval_to_ms(interval);
        for (var i = 0; i < timeGrains.length; i++) {
            // abs (num - val) < abs (num - curr):
            if (intervalMs > app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["default"].interval_to_ms(timeGrains[i])) {
                if (i + 1 < timeGrains.length) {
                    closest = timeGrains[i + 1];
                }
                else {
                    closest = timeGrains[i];
                }
            }
        }
        return closest;
    };
    TimeGrainConverter.createTimeGrainFromISO8601Duration = function (duration) {
        var offset = 1;
        if (duration.substring(0, 2) === 'PT') {
            offset = 2;
        }
        var value = duration.substring(offset, duration.length - 1);
        var unit = duration.substring(duration.length - 1);
        return value + ' ' + TimeGrainConverter.timeUnitToText(+value, unit);
    };
    TimeGrainConverter.timeUnitToText = function (value, unit) {
        var text = '';
        if (unit === 'S') {
            text = 'second';
        }
        if (unit === 'M') {
            text = 'minute';
        }
        if (unit === 'H') {
            text = 'hour';
        }
        if (unit === 'D') {
            text = 'day';
        }
        if (value > 1) {
            return text + 's';
        }
        return text;
    };
    TimeGrainConverter.createKbnUnitFromISO8601Duration = function (duration) {
        if (duration === 'auto') {
            return 'auto';
        }
        var offset = 1;
        if (duration.substring(0, 2) === 'PT') {
            offset = 2;
        }
        var value = duration.substring(offset, duration.length - 1);
        var unit = duration.substring(duration.length - 1);
        return value + TimeGrainConverter.timeUnitToKbn(+value, unit);
    };
    TimeGrainConverter.timeUnitToKbn = function (value, unit) {
        if (unit === 'S') {
            return 's';
        }
        if (unit === 'M') {
            return 'm';
        }
        if (unit === 'H') {
            return 'h';
        }
        if (unit === 'D') {
            return 'd';
        }
        return '';
    };
    return TimeGrainConverter;
}());
/* harmony default export */ __webpack_exports__["default"] = (TimeGrainConverter);


/***/ })

}]);
//# sourceMappingURL=azureMonitorPlugin.6310f9af5345c722b930.js.map