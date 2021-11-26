(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["elasticsearchPlugin"],{

/***/ "./public/app/plugins/datasource/elasticsearch/bucket_agg.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/bucket_agg.ts ***!
  \*******************************************************************/
/*! exports provided: ElasticBucketAggCtrl, elasticBucketAgg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticBucketAggCtrl", function() { return ElasticBucketAggCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticBucketAgg", function() { return elasticBucketAgg; });
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");




var ElasticBucketAggCtrl = /** @class */ (function () {
    /** @ngInject */
    function ElasticBucketAggCtrl($scope, uiSegmentSrv, $rootScope) {
        var bucketAggs = $scope.target.bucketAggs;
        $scope.orderByOptions = [];
        $scope.getBucketAggTypes = function () {
            return _query_def__WEBPACK_IMPORTED_MODULE_2__["bucketAggTypes"];
        };
        $scope.getOrderOptions = function () {
            return _query_def__WEBPACK_IMPORTED_MODULE_2__["orderOptions"];
        };
        $scope.getSizeOptions = function () {
            return _query_def__WEBPACK_IMPORTED_MODULE_2__["sizeOptions"];
        };
        $rootScope.onAppEvent(app_types__WEBPACK_IMPORTED_MODULE_3__["CoreEvents"].elasticQueryUpdated, function () {
            $scope.validateModel();
        }, $scope);
        $scope.init = function () {
            $scope.agg = bucketAggs[$scope.index];
            $scope.validateModel();
        };
        $scope.onChangeInternal = function () {
            $scope.onChange();
        };
        $scope.onTypeChanged = function () {
            $scope.agg.settings = {};
            $scope.showOptions = false;
            switch ($scope.agg.type) {
                case 'date_histogram':
                case 'histogram':
                case 'terms': {
                    delete $scope.agg.query;
                    $scope.agg.field = 'select field';
                    break;
                }
                case 'filters': {
                    delete $scope.agg.field;
                    $scope.agg.query = '*';
                    break;
                }
                case 'geohash_grid': {
                    $scope.agg.settings.precision = 3;
                    break;
                }
            }
            $scope.validateModel();
            $scope.onChange();
        };
        $scope.validateModel = function () {
            $scope.index = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.indexOf(bucketAggs, $scope.agg);
            $scope.isFirst = $scope.index === 0;
            $scope.bucketAggCount = bucketAggs.length;
            var settingsLinkText = '';
            var settings = $scope.agg.settings || {};
            switch ($scope.agg.type) {
                case 'terms': {
                    settings.order = settings.order || 'desc';
                    settings.size = settings.size || '10';
                    settings.min_doc_count = settings.min_doc_count || 1;
                    settings.orderBy = settings.orderBy || '_term';
                    if (settings.size !== '0') {
                        settingsLinkText = _query_def__WEBPACK_IMPORTED_MODULE_2__["describeOrder"](settings.order) + ' ' + settings.size + ', ';
                    }
                    if (settings.min_doc_count > 0) {
                        settingsLinkText += 'Min Doc Count: ' + settings.min_doc_count + ', ';
                    }
                    settingsLinkText += 'Order by: ' + _query_def__WEBPACK_IMPORTED_MODULE_2__["describeOrderBy"](settings.orderBy, $scope.target);
                    if (settings.size === '0') {
                        settingsLinkText += ' (' + settings.order + ')';
                    }
                    break;
                }
                case 'filters': {
                    settings.filters = settings.filters || [{ query: '*' }];
                    settingsLinkText = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce(settings.filters, function (memo, value, index) {
                        memo += 'Q' + (index + 1) + '  = ' + value.query + ' ';
                        return memo;
                    }, '');
                    if (settingsLinkText.length > 50) {
                        settingsLinkText = settingsLinkText.substr(0, 50) + '...';
                    }
                    settingsLinkText = 'Filter Queries (' + settings.filters.length + ')';
                    break;
                }
                case 'date_histogram': {
                    settings.interval = settings.interval || 'auto';
                    settings.min_doc_count = settings.min_doc_count || 0;
                    $scope.agg.field = $scope.target.timeField;
                    settingsLinkText = 'Interval: ' + settings.interval;
                    if (settings.min_doc_count > 0) {
                        settingsLinkText += ', Min Doc Count: ' + settings.min_doc_count;
                    }
                    if (settings.trimEdges === undefined || settings.trimEdges < 0) {
                        settings.trimEdges = 0;
                    }
                    if (settings.trimEdges && settings.trimEdges > 0) {
                        settingsLinkText += ', Trim edges: ' + settings.trimEdges;
                    }
                    break;
                }
                case 'histogram': {
                    settings.interval = settings.interval || 1000;
                    settings.min_doc_count = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.defaultTo(settings.min_doc_count, 1);
                    settingsLinkText = 'Interval: ' + settings.interval;
                    if (settings.min_doc_count > 0) {
                        settingsLinkText += ', Min Doc Count: ' + settings.min_doc_count;
                    }
                    break;
                }
                case 'geohash_grid': {
                    // limit precision to 7
                    settings.precision = Math.max(Math.min(settings.precision, 7), 1);
                    settingsLinkText = 'Precision: ' + settings.precision;
                    break;
                }
            }
            $scope.settingsLinkText = settingsLinkText;
            $scope.agg.settings = settings;
            return true;
        };
        $scope.addFiltersQuery = function () {
            $scope.agg.settings.filters.push({ query: '*' });
        };
        $scope.removeFiltersQuery = function (filter) {
            $scope.agg.settings.filters = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.without($scope.agg.settings.filters, filter);
        };
        $scope.toggleOptions = function () {
            $scope.showOptions = !$scope.showOptions;
        };
        $scope.getOrderByOptions = function () {
            return _query_def__WEBPACK_IMPORTED_MODULE_2__["getOrderByOptions"]($scope.target);
        };
        $scope.getFieldsInternal = function () {
            if ($scope.agg.type === 'date_histogram') {
                return $scope.getFields({ $fieldType: 'date' });
            }
            else {
                return $scope.getFields();
            }
        };
        $scope.getIntervalOptions = function () {
            return Promise.resolve(uiSegmentSrv.transformToSegments(true, 'interval')(_query_def__WEBPACK_IMPORTED_MODULE_2__["intervalOptions"]));
        };
        $scope.addBucketAgg = function () {
            // if last is date histogram add it before
            var lastBucket = bucketAggs[bucketAggs.length - 1];
            var addIndex = bucketAggs.length - 1;
            if (lastBucket && lastBucket.type === 'date_histogram') {
                addIndex -= 1;
            }
            var id = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce($scope.target.bucketAggs.concat($scope.target.metrics), function (max, val) {
                return parseInt(val.id, 10) > max ? parseInt(val.id, 10) : max;
            }, 0);
            bucketAggs.splice(addIndex, 0, { type: 'terms', field: 'select field', id: (id + 1).toString(), fake: true });
            $scope.onChange();
        };
        $scope.removeBucketAgg = function () {
            bucketAggs.splice($scope.index, 1);
            $scope.onChange();
        };
        $scope.init();
    }
    return ElasticBucketAggCtrl;
}());

function elasticBucketAgg() {
    return {
        templateUrl: 'public/app/plugins/datasource/elasticsearch/partials/bucket_agg.html',
        controller: ElasticBucketAggCtrl,
        restrict: 'E',
        scope: {
            target: '=',
            index: '=',
            onChange: '&',
            getFields: '&',
        },
    };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].directive('elasticBucketAgg', elasticBucketAgg);


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/components/ElasticsearchQueryField.tsx":
/*!********************************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/components/ElasticsearchQueryField.tsx ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");



var ElasticsearchQueryField = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ElasticsearchQueryField, _super);
    function ElasticsearchQueryField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.onChangeQuery = function (value, override) {
            // Send text change to parent
            var _a = _this.props, query = _a.query, onChange = _a.onChange, onRunQuery = _a.onRunQuery;
            if (onChange) {
                var nextQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { query: value, isLogsQuery: true });
                onChange(nextQuery);
                if (override && onRunQuery) {
                    onRunQuery();
                }
            }
        };
        _this.plugins = [
            Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["SlatePrism"])({
                onlyIn: function (node) { return node.type === 'code_block'; },
                getSyntax: function (node) { return 'lucene'; },
            }),
        ];
        _this.state = {
            syntaxLoaded: false,
        };
        return _this;
    }
    ElasticsearchQueryField.prototype.componentDidMount = function () {
        if (!this.props.query.isLogsQuery) {
            this.onChangeQuery('', true);
        }
    };
    ElasticsearchQueryField.prototype.componentWillUnmount = function () { };
    ElasticsearchQueryField.prototype.componentDidUpdate = function (prevProps) {
        // if query changed from the outside (i.e. cleared via explore toolbar)
        if (!this.props.query.isLogsQuery) {
            this.onChangeQuery('', true);
        }
    };
    ElasticsearchQueryField.prototype.render = function () {
        var _a = this.props, data = _a.data, query = _a.query;
        var syntaxLoaded = this.state.syntaxLoaded;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline gf-form-inline--nowrap" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow flex-shrink-1" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["QueryField"], { additionalPlugins: this.plugins, query: query.query, onChange: this.onChangeQuery, onRunQuery: this.props.onRunQuery, placeholder: "Enter a Lucene query", portalOrigin: "elasticsearch", syntaxLoaded: syntaxLoaded }))),
            data && data.error ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "prom-query-field-info text-error" }, data.error.message) : null));
    };
    return ElasticsearchQueryField;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));
/* harmony default export */ __webpack_exports__["default"] = (ElasticsearchQueryField);


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/ConfigEditor.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/ConfigEditor.tsx ***!
  \************************************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _ElasticDetails__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ElasticDetails */ "./public/app/plugins/datasource/elasticsearch/configuration/ElasticDetails.tsx");
/* harmony import */ var _LogsConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LogsConfig */ "./public/app/plugins/datasource/elasticsearch/configuration/LogsConfig.tsx");
/* harmony import */ var _DataLinks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataLinks */ "./public/app/plugins/datasource/elasticsearch/configuration/DataLinks.tsx");






var ConfigEditor = function (props) {
    var options = props.options, onOptionsChange = props.onOptionsChange;
    // Apply some defaults on initial render
    Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
        var esVersion = options.jsonData.esVersion || 5;
        onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), { timeField: options.jsonData.timeField || '@timestamp', esVersion: esVersion, maxConcurrentShardRequests: options.jsonData.maxConcurrentShardRequests || Object(_ElasticDetails__WEBPACK_IMPORTED_MODULE_3__["defaultMaxConcurrentShardRequests"])(esVersion), logMessageField: options.jsonData.logMessageField || '', logLevelField: options.jsonData.logLevelField || '' }) }));
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DataSourceHttpSettings"], { defaultUrl: 'http://localhost:9200', dataSourceConfig: options, showAccessOptions: true, onChange: onOptionsChange }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ElasticDetails__WEBPACK_IMPORTED_MODULE_3__["ElasticDetails"], { value: options, onChange: onOptionsChange }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogsConfig__WEBPACK_IMPORTED_MODULE_4__["LogsConfig"], { value: options.jsonData, onChange: function (newValue) {
                return onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { jsonData: newValue }));
            } }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DataLinks__WEBPACK_IMPORTED_MODULE_5__["DataLinks"], { value: options.jsonData.dataLinks, onChange: function (newValue) {
                onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), { dataLinks: newValue }) }));
            } })));
};


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/DataLink.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/DataLink.tsx ***!
  \********************************************************************************/
/*! exports provided: DataLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataLink", function() { return DataLink; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");




var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function () { return ({
    firstRow: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    display: flex;\n  "], ["\n    display: flex;\n  "]))),
    nameField: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    flex: 2;\n  "], ["\n    flex: 2;\n  "]))),
    regexField: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    flex: 3;\n  "], ["\n    flex: 3;\n  "]))),
}); });
var DataLink = function (props) {
    var value = props.value, onChange = props.onChange, onDelete = props.onDelete, suggestions = props.suggestions, className = props.className;
    var styles = getStyles();
    var handleChange = function (field) { return function (event) {
        var _a;
        onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), (_a = {}, _a[field] = event.currentTarget.value, _a)));
    }; };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: styles.firstRow },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormField"], { className: styles.nameField, labelWidth: 6, 
                // A bit of a hack to prevent using default value for the width from FormField
                inputWidth: null, label: "Field", type: "text", value: value.field, tooltip: 'Can be exact field name or a regex pattern that will match on the field name.', onChange: handleChange('field') }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'inverse', title: "Remove field", icon: 'fa fa-times', onClick: function (event) {
                    event.preventDefault();
                    onDelete();
                } })),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormField"], { label: "URL", labelWidth: 6, inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DataLinkInput"], { placeholder: 'http://example.com/${__value.raw}', value: value.url || '', onChange: function (newValue) {
                    return onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), { url: newValue }));
                }, suggestions: suggestions }), className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_4 || (templateObject_4 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n          width: 100%;\n        "], ["\n          width: 100%;\n        "]))) })));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/DataLinks.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/DataLinks.tsx ***!
  \*********************************************************************************/
/*! exports provided: DataLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataLinks", function() { return DataLinks; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _DataLink__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataLink */ "./public/app/plugins/datasource/elasticsearch/configuration/DataLink.tsx");





var getStyles = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"])(function (theme) { return ({
    infoText: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    padding-bottom: ", ";\n    color: ", ";\n  "], ["\n    padding-bottom: ", ";\n    color: ", ";\n  "])), theme.spacing.md, theme.colors.textWeak),
    dataLink: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    margin-bottom: ", ";\n  "], ["\n    margin-bottom: ", ";\n  "])), theme.spacing.sm),
}); });
var DataLinks = function (props) {
    var value = props.value, onChange = props.onChange;
    var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["useTheme"])();
    var styles = getStyles(theme);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Data links"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: styles.infoText }, "Add links to existing fields. Links will be shown in log row details next to the field value."),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            value &&
                value.map(function (field, index) {
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DataLink__WEBPACK_IMPORTED_MODULE_4__["DataLink"], { className: styles.dataLink, key: index, value: field, onChange: function (newField) {
                            var newDataLinks = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(value);
                            newDataLinks.splice(index, 1, newField);
                            onChange(newDataLinks);
                        }, onDelete: function () {
                            var newDataLinks = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(value);
                            newDataLinks.splice(index, 1);
                            onChange(newDataLinks);
                        }, suggestions: [
                            {
                                value: _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DataLinkBuiltInVars"].valueRaw,
                                label: 'Raw value',
                                documentation: 'Raw value of the field',
                                origin: _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["VariableOrigin"].Value,
                            },
                        ] }));
                }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Button"], { variant: 'inverse', className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n              margin-right: 10px;\n            "], ["\n              margin-right: 10px;\n            "]))), icon: "fa fa-plus", onClick: function (event) {
                        event.preventDefault();
                        var newDataLinks = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])((value || []), [{ field: '', url: '' }]);
                        onChange(newDataLinks);
                    } }, "Add")))));
};
var templateObject_1, templateObject_2, templateObject_3;


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/ElasticDetails.tsx":
/*!**************************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/ElasticDetails.tsx ***!
  \**************************************************************************************/
/*! exports provided: ElasticDetails, defaultMaxConcurrentShardRequests */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticDetails", function() { return ElasticDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMaxConcurrentShardRequests", function() { return defaultMaxConcurrentShardRequests; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");



var indexPatternTypes = [
    { label: 'No pattern', value: 'none' },
    { label: 'Hourly', value: 'Hourly', example: '[logstash-]YYYY.MM.DD.HH' },
    { label: 'Daily', value: 'Daily', example: '[logstash-]YYYY.MM.DD' },
    { label: 'Weekly', value: 'Weekly', example: '[logstash-]GGGG.WW' },
    { label: 'Monthly', value: 'Monthly', example: '[logstash-]YYYY.MM' },
    { label: 'Yearly', value: 'Yearly', example: '[logstash-]YYYY' },
];
var esVersions = [
    { label: '2.x', value: 2 },
    { label: '5.x', value: 5 },
    { label: '5.6+', value: 56 },
    { label: '6.0+', value: 60 },
    { label: '7.0+', value: 70 },
];
var ElasticDetails = function (props) {
    var _a;
    var value = props.value, onChange = props.onChange;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Elasticsearch details"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-25" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { labelWidth: 10, inputWidth: 15, label: "Index name", value: value.database || '', onChange: changeHandler('database', value, onChange), placeholder: 'es-index-name', required: true })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form width-14" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { labelWidth: 10, label: "Pattern", inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { options: indexPatternTypes, onChange: intervalHandler(value, onChange), value: indexPatternTypes.find(function (pattern) {
                                return pattern.value === (value.jsonData.interval === undefined ? 'none' : value.jsonData.interval);
                            }) }) }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-25" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { labelWidth: 10, inputWidth: 15, label: "Time field name", value: value.jsonData.timeField || '', onChange: jsonDataChangeHandler('timeField', value, onChange), required: true })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "gf-form-select-wrapper" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { labelWidth: 10, label: "Version", inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { options: esVersions, onChange: function (option) {
                                var maxConcurrentShardRequests = getMaxConcurrenShardRequestOrDefault(value.jsonData.maxConcurrentShardRequests, option.value);
                                onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value.jsonData), { esVersion: option.value, maxConcurrentShardRequests: maxConcurrentShardRequests }) }));
                            }, value: esVersions.find(function (version) { return version.value === value.jsonData.esVersion; }) }) }))),
            value.jsonData.esVersion >= 56 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { "aria-label": 'Max concurrent Shard Requests input', labelWidth: 15, label: "Max concurrent Shard Requests", value: value.jsonData.maxConcurrentShardRequests || '', onChange: jsonDataChangeHandler('maxConcurrentShardRequests', value, onChange) }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { labelWidth: 10, label: "Min time interval", inputEl: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: 'width-6', value: value.jsonData.timeInterval || '', onChange: jsonDataChangeHandler('timeInterval', value, onChange), placeholder: "10s", validationEvents: (_a = {},
                                _a[_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["EventsWithValidation"].onBlur] = [
                                    Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["regexValidation"])(/^\d+(ms|[Mwdhmsy])$/, 'Value is not valid, you can use number with time unit specifier: y, M, w, d, h, m, s'),
                                ],
                                _a) }), tooltip: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                            "A lower limit for the auto group by time interval. Recommended to be set to write frequency, for example ",
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, "1m"),
                            " if your data is written every minute.") }))))));
};
var changeHandler = function (key, value, onChange) { return function (event) {
    var _a;
    onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), (_a = {}, _a[key] = event.currentTarget.value, _a)));
}; };
var jsonDataChangeHandler = function (key, value, onChange) { return function (event) {
    var _a;
    onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value.jsonData), (_a = {}, _a[key] = event.currentTarget.value, _a)) }));
}; };
var intervalHandler = function (value, onChange) { return function (option) {
    var database = value.database;
    // If option value is undefined it will send its label instead so we have to convert made up value to undefined here.
    var newInterval = option.value === 'none' ? undefined : option.value;
    if (!database || database.length === 0 || database.startsWith('[logstash-]')) {
        var newDatabase = '';
        if (newInterval !== undefined) {
            var pattern = indexPatternTypes.find(function (pattern) { return pattern.value === newInterval; });
            if (pattern) {
                newDatabase = pattern.example;
            }
        }
        onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), { database: newDatabase, jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value.jsonData), { interval: newInterval }) }));
    }
    else {
        onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value.jsonData), { interval: newInterval }) }));
    }
}; };
function getMaxConcurrenShardRequestOrDefault(maxConcurrentShardRequests, version) {
    if (maxConcurrentShardRequests === 5 && version < 70) {
        return 256;
    }
    if (maxConcurrentShardRequests === 256 && version >= 70) {
        return 5;
    }
    return maxConcurrentShardRequests || defaultMaxConcurrentShardRequests(version);
}
function defaultMaxConcurrentShardRequests(version) {
    return version >= 70 ? 5 : 256;
}


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/configuration/LogsConfig.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/configuration/LogsConfig.tsx ***!
  \**********************************************************************************/
/*! exports provided: LogsConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsConfig", function() { return LogsConfig; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");



var LogsConfig = function (props) {
    var value = props.value, onChange = props.onChange;
    var changeHandler = function (key) { return function (event) {
        var _a;
        onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), (_a = {}, _a[key] = event.currentTarget.value, _a)));
    }; };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Logs"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { labelWidth: 11, label: "Message field name", value: value.logMessageField, onChange: changeHandler('logMessageField'), placeholder: "_source" })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormField"], { labelWidth: 11, label: "Level field name", value: value.logLevelField, onChange: changeHandler('logLevelField') })))));
};


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/datasource.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/datasource.ts ***!
  \*******************************************************************/
/*! exports provided: ElasticDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticDatasource", function() { return ElasticDatasource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _elastic_response__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./elastic_response */ "./public/app/plugins/datasource/elasticsearch/elastic_response.ts");
/* harmony import */ var _index_pattern__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./index_pattern */ "./public/app/plugins/datasource/elasticsearch/index_pattern.ts");
/* harmony import */ var _query_builder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./query_builder */ "./public/app/plugins/datasource/elasticsearch/query_builder.ts");
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");









var ElasticDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ElasticDatasource, _super);
    /** @ngInject */
    function ElasticDatasource(instanceSettings, backendSrv, templateSrv, timeSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.timeSrv = timeSrv;
        _this.basicAuth = instanceSettings.basicAuth;
        _this.withCredentials = instanceSettings.withCredentials;
        _this.url = instanceSettings.url;
        _this.name = instanceSettings.name;
        _this.index = instanceSettings.database;
        var settingsData = instanceSettings.jsonData || {};
        _this.timeField = settingsData.timeField;
        _this.esVersion = settingsData.esVersion;
        _this.indexPattern = new _index_pattern__WEBPACK_IMPORTED_MODULE_5__["IndexPattern"](_this.index, settingsData.interval);
        _this.interval = settingsData.timeInterval;
        _this.maxConcurrentShardRequests = settingsData.maxConcurrentShardRequests;
        _this.queryBuilder = new _query_builder__WEBPACK_IMPORTED_MODULE_6__["ElasticQueryBuilder"]({
            timeField: _this.timeField,
            esVersion: _this.esVersion,
        });
        _this.logMessageField = settingsData.logMessageField || '';
        _this.logLevelField = settingsData.logLevelField || '';
        _this.dataLinks = settingsData.dataLinks || [];
        if (_this.logMessageField === '') {
            _this.logMessageField = null;
        }
        if (_this.logLevelField === '') {
            _this.logLevelField = null;
        }
        return _this;
    }
    ElasticDatasource.prototype.request = function (method, url, data) {
        var options = {
            url: this.url + '/' + url,
            method: method,
            data: data,
        };
        if (this.basicAuth || this.withCredentials) {
            options.withCredentials = true;
        }
        if (this.basicAuth) {
            options.headers = {
                Authorization: this.basicAuth,
            };
        }
        return this.backendSrv.datasourceRequest(options);
    };
    ElasticDatasource.prototype.get = function (url) {
        var range = this.timeSrv.timeRange();
        var indexList = this.indexPattern.getIndexList(range.from.valueOf(), range.to.valueOf());
        if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isArray(indexList) && indexList.length) {
            return this.request('GET', indexList[0] + url).then(function (results) {
                results.data.$$config = results.config;
                return results.data;
            });
        }
        else {
            return this.request('GET', this.indexPattern.getIndexForToday() + url).then(function (results) {
                results.data.$$config = results.config;
                return results.data;
            });
        }
    };
    ElasticDatasource.prototype.post = function (url, data) {
        return this.request('POST', url, data)
            .then(function (results) {
            results.data.$$config = results.config;
            return results.data;
        })
            .catch(function (err) {
            if (err.data && err.data.error) {
                throw {
                    message: 'Elasticsearch error: ' + err.data.error.reason,
                    error: err.data.error,
                };
            }
            throw err;
        });
    };
    ElasticDatasource.prototype.annotationQuery = function (options) {
        var annotation = options.annotation;
        var timeField = annotation.timeField || '@timestamp';
        var timeEndField = annotation.timeEndField || null;
        var queryString = annotation.query || '*';
        var tagsField = annotation.tagsField || 'tags';
        var textField = annotation.textField || null;
        var dateRanges = [];
        var rangeStart = {};
        rangeStart[timeField] = {
            from: options.range.from.valueOf(),
            to: options.range.to.valueOf(),
            format: 'epoch_millis',
        };
        dateRanges.push({ range: rangeStart });
        if (timeEndField) {
            var rangeEnd = {};
            rangeEnd[timeEndField] = {
                from: options.range.from.valueOf(),
                to: options.range.to.valueOf(),
                format: 'epoch_millis',
            };
            dateRanges.push({ range: rangeEnd });
        }
        var queryInterpolated = this.templateSrv.replace(queryString, {}, 'lucene');
        var query = {
            bool: {
                filter: [
                    {
                        bool: {
                            should: dateRanges,
                            minimum_should_match: 1,
                        },
                    },
                    {
                        query_string: {
                            query: queryInterpolated,
                        },
                    },
                ],
            },
        };
        var data = {
            query: query,
            size: 10000,
        };
        // fields field not supported on ES 5.x
        if (this.esVersion < 5) {
            data['fields'] = [timeField, '_source'];
        }
        var header = {
            search_type: 'query_then_fetch',
            ignore_unavailable: true,
        };
        // old elastic annotations had index specified on them
        if (annotation.index) {
            header.index = annotation.index;
        }
        else {
            header.index = this.indexPattern.getIndexList(options.range.from, options.range.to);
        }
        var payload = angular__WEBPACK_IMPORTED_MODULE_1___default.a.toJson(header) + '\n' + angular__WEBPACK_IMPORTED_MODULE_1___default.a.toJson(data) + '\n';
        return this.post('_msearch', payload).then(function (res) {
            var list = [];
            var hits = res.responses[0].hits.hits;
            var getFieldFromSource = function (source, fieldName) {
                if (!fieldName) {
                    return;
                }
                var fieldNames = fieldName.split('.');
                var fieldValue = source;
                for (var i = 0; i < fieldNames.length; i++) {
                    fieldValue = fieldValue[fieldNames[i]];
                    if (!fieldValue) {
                        console.log('could not find field in annotation: ', fieldName);
                        return '';
                    }
                }
                return fieldValue;
            };
            for (var i = 0; i < hits.length; i++) {
                var source = hits[i]._source;
                var time = getFieldFromSource(source, timeField);
                if (typeof hits[i].fields !== 'undefined') {
                    var fields = hits[i].fields;
                    if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isString(fields[timeField]) || lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isNumber(fields[timeField])) {
                        time = fields[timeField];
                    }
                }
                var event = {
                    annotation: annotation,
                    time: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["toUtc"])(time).valueOf(),
                    text: getFieldFromSource(source, textField),
                    tags: getFieldFromSource(source, tagsField),
                };
                if (timeEndField) {
                    var timeEnd = getFieldFromSource(source, timeEndField);
                    if (timeEnd) {
                        event.timeEnd = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["toUtc"])(timeEnd).valueOf();
                    }
                }
                // legacy support for title tield
                if (annotation.titleField) {
                    var title = getFieldFromSource(source, annotation.titleField);
                    if (title) {
                        event.text = title + '\n' + event.text;
                    }
                }
                if (typeof event.tags === 'string') {
                    event.tags = event.tags.split(',');
                }
                list.push(event);
            }
            return list;
        });
    };
    ElasticDatasource.prototype.interpolateVariablesInQueries = function (queries, scopedVars) {
        var _this = this;
        var expandedQueries = queries;
        if (queries && queries.length > 0) {
            expandedQueries = queries.map(function (query) {
                var expandedQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { datasource: _this.name, query: _this.templateSrv.replace(query.query, scopedVars, 'lucene') });
                return expandedQuery;
            });
        }
        return expandedQueries;
    };
    ElasticDatasource.prototype.testDatasource = function () {
        var _this = this;
        // validate that the index exist and has date field
        return this.getFields({ type: 'date' }).then(function (dateFields) {
            var timeField = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.find(dateFields, { text: _this.timeField });
            if (!timeField) {
                return {
                    status: 'error',
                    message: 'No date field named ' + _this.timeField + ' found',
                };
            }
            return { status: 'success', message: 'Index OK. Time field name OK.' };
        }, function (err) {
            console.log(err);
            if (err.data && err.data.error) {
                var message = angular__WEBPACK_IMPORTED_MODULE_1___default.a.toJson(err.data.error);
                if (err.data.error.reason) {
                    message = err.data.error.reason;
                }
                return { status: 'error', message: message };
            }
            else {
                return { status: 'error', message: err.status };
            }
        });
    };
    ElasticDatasource.prototype.getQueryHeader = function (searchType, timeFrom, timeTo) {
        var queryHeader = {
            search_type: searchType,
            ignore_unavailable: true,
            index: this.indexPattern.getIndexList(timeFrom, timeTo),
        };
        if (this.esVersion >= 56 && this.esVersion < 70) {
            queryHeader['max_concurrent_shard_requests'] = this.maxConcurrentShardRequests;
        }
        return angular__WEBPACK_IMPORTED_MODULE_1___default.a.toJson(queryHeader);
    };
    ElasticDatasource.prototype.query = function (options) {
        var e_1, _a;
        var _this = this;
        var payload = '';
        var targets = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.cloneDeep(options.targets);
        var sentTargets = [];
        // add global adhoc filters to timeFilter
        var adhocFilters = this.templateSrv.getAdhocFilters(this.name);
        try {
            for (var targets_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(targets), targets_1_1 = targets_1.next(); !targets_1_1.done; targets_1_1 = targets_1.next()) {
                var target = targets_1_1.value;
                if (target.hide) {
                    continue;
                }
                var queryString = this.templateSrv.replace(target.query, options.scopedVars, 'lucene');
                // Elasticsearch queryString should always be '*' if empty string
                if (!queryString || queryString === '') {
                    queryString = '*';
                }
                var queryObj = void 0;
                if (target.isLogsQuery || _query_def__WEBPACK_IMPORTED_MODULE_7__["hasMetricOfType"](target, 'logs')) {
                    target.bucketAggs = [_query_def__WEBPACK_IMPORTED_MODULE_7__["defaultBucketAgg"]()];
                    target.metrics = [_query_def__WEBPACK_IMPORTED_MODULE_7__["defaultMetricAgg"]()];
                    // Setting this for metrics queries that are typed as logs
                    target.isLogsQuery = true;
                    queryObj = this.queryBuilder.getLogsQuery(target, adhocFilters, queryString);
                }
                else {
                    if (target.alias) {
                        target.alias = this.templateSrv.replace(target.alias, options.scopedVars, 'lucene');
                    }
                    queryObj = this.queryBuilder.build(target, adhocFilters, queryString);
                }
                var esQuery = angular__WEBPACK_IMPORTED_MODULE_1___default.a.toJson(queryObj);
                var searchType = queryObj.size === 0 && this.esVersion < 5 ? 'count' : 'query_then_fetch';
                var header = this.getQueryHeader(searchType, options.range.from, options.range.to);
                payload += header + '\n';
                payload += esQuery + '\n';
                sentTargets.push(target);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (targets_1_1 && !targets_1_1.done && (_a = targets_1.return)) _a.call(targets_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (sentTargets.length === 0) {
            return Promise.resolve({ data: [] });
        }
        payload = payload.replace(/\$timeFrom/g, options.range.from.valueOf().toString());
        payload = payload.replace(/\$timeTo/g, options.range.to.valueOf().toString());
        payload = this.templateSrv.replace(payload, options.scopedVars);
        var url = this.getMultiSearchUrl();
        return this.post(url, payload).then(function (res) {
            var e_2, _a;
            var er = new _elastic_response__WEBPACK_IMPORTED_MODULE_4__["ElasticResponse"](sentTargets, res);
            if (sentTargets.some(function (target) { return target.isLogsQuery; })) {
                var response = er.getLogs(_this.logMessageField, _this.logLevelField);
                try {
                    for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(response.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var dataFrame = _c.value;
                        _this.enhanceDataFrame(dataFrame);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return response;
            }
            return er.getTimeSeries();
        });
    };
    ElasticDatasource.prototype.getFields = function (query) {
        var configuredEsVersion = this.esVersion;
        return this.get('/_mapping').then(function (result) {
            var typeMap = {
                float: 'number',
                double: 'number',
                integer: 'number',
                long: 'number',
                date: 'date',
                string: 'string',
                text: 'string',
                scaled_float: 'number',
                nested: 'nested',
            };
            function shouldAddField(obj, key, query) {
                if (key[0] === '_') {
                    return false;
                }
                if (!query.type) {
                    return true;
                }
                // equal query type filter, or via typemap translation
                return query.type === obj.type || query.type === typeMap[obj.type];
            }
            // Store subfield names: [system, process, cpu, total] -> system.process.cpu.total
            var fieldNameParts = [];
            var fields = {};
            function getFieldsRecursively(obj) {
                for (var key in obj) {
                    var subObj = obj[key];
                    // Check mapping field for nested fields
                    if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isObject(subObj.properties)) {
                        fieldNameParts.push(key);
                        getFieldsRecursively(subObj.properties);
                    }
                    if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isObject(subObj.fields)) {
                        fieldNameParts.push(key);
                        getFieldsRecursively(subObj.fields);
                    }
                    if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isString(subObj.type)) {
                        var fieldName = fieldNameParts.concat(key).join('.');
                        // Hide meta-fields and check field type
                        if (shouldAddField(subObj, key, query)) {
                            fields[fieldName] = {
                                text: fieldName,
                                type: subObj.type,
                            };
                        }
                    }
                }
                fieldNameParts.pop();
            }
            for (var indexName in result) {
                var index = result[indexName];
                if (index && index.mappings) {
                    var mappings = index.mappings;
                    if (configuredEsVersion < 70) {
                        for (var typeName in mappings) {
                            var properties = mappings[typeName].properties;
                            getFieldsRecursively(properties);
                        }
                    }
                    else {
                        var properties = mappings.properties;
                        getFieldsRecursively(properties);
                    }
                }
            }
            // transform to array
            return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(fields, function (value) {
                return value;
            });
        });
    };
    ElasticDatasource.prototype.getTerms = function (queryDef) {
        var range = this.timeSrv.timeRange();
        var searchType = this.esVersion >= 5 ? 'query_then_fetch' : 'count';
        var header = this.getQueryHeader(searchType, range.from, range.to);
        var esQuery = angular__WEBPACK_IMPORTED_MODULE_1___default.a.toJson(this.queryBuilder.getTermsQuery(queryDef));
        esQuery = esQuery.replace(/\$timeFrom/g, range.from.valueOf().toString());
        esQuery = esQuery.replace(/\$timeTo/g, range.to.valueOf().toString());
        esQuery = header + '\n' + esQuery + '\n';
        var url = this.getMultiSearchUrl();
        return this.post(url, esQuery).then(function (res) {
            if (!res.responses[0].aggregations) {
                return [];
            }
            var buckets = res.responses[0].aggregations['1'].buckets;
            return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(buckets, function (bucket) {
                return {
                    text: bucket.key_as_string || bucket.key,
                    value: bucket.key,
                };
            });
        });
    };
    ElasticDatasource.prototype.getMultiSearchUrl = function () {
        if (this.esVersion >= 70 && this.maxConcurrentShardRequests) {
            return "_msearch?max_concurrent_shard_requests=" + this.maxConcurrentShardRequests;
        }
        return '_msearch';
    };
    ElasticDatasource.prototype.metricFindQuery = function (query) {
        query = angular__WEBPACK_IMPORTED_MODULE_1___default.a.fromJson(query);
        if (!query) {
            return Promise.resolve([]);
        }
        if (query.find === 'fields') {
            query.field = this.templateSrv.replace(query.field, {}, 'lucene');
            return this.getFields(query);
        }
        if (query.find === 'terms') {
            query.field = this.templateSrv.replace(query.field, {}, 'lucene');
            query.query = this.templateSrv.replace(query.query || '*', {}, 'lucene');
            return this.getTerms(query);
        }
    };
    ElasticDatasource.prototype.getTagKeys = function () {
        return this.getFields({});
    };
    ElasticDatasource.prototype.getTagValues = function (options) {
        return this.getTerms({ field: options.key, query: '*' });
    };
    ElasticDatasource.prototype.targetContainsTemplate = function (target) {
        var e_3, _a, e_4, _b;
        if (this.templateSrv.variableExists(target.query) || this.templateSrv.variableExists(target.alias)) {
            return true;
        }
        try {
            for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(target.bucketAggs), _d = _c.next(); !_d.done; _d = _c.next()) {
                var bucketAgg = _d.value;
                if (this.templateSrv.variableExists(bucketAgg.field) || this.objectContainsTemplate(bucketAgg.settings)) {
                    return true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var _e = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(target.metrics), _f = _e.next(); !_f.done; _f = _e.next()) {
                var metric = _f.value;
                if (this.templateSrv.variableExists(metric.field) ||
                    this.objectContainsTemplate(metric.settings) ||
                    this.objectContainsTemplate(metric.meta)) {
                    return true;
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
    };
    ElasticDatasource.prototype.enhanceDataFrame = function (dataFrame) {
        var e_5, _a;
        if (this.dataLinks.length) {
            var _loop_1 = function (field) {
                var dataLink = this_1.dataLinks.find(function (dataLink) { return field.name && field.name.match(dataLink.field); });
                if (dataLink) {
                    field.config = field.config || {};
                    field.config.links = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])((field.config.links || []), [
                        {
                            url: dataLink.url,
                            title: '',
                        },
                    ]);
                }
            };
            var this_1 = this;
            try {
                for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(dataFrame.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var field = _c.value;
                    _loop_1(field);
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
    };
    ElasticDatasource.prototype.isPrimitive = function (obj) {
        if (obj === null || obj === undefined) {
            return true;
        }
        if (['string', 'number', 'boolean'].some(function (type) { return type === typeof true; })) {
            return true;
        }
        return false;
    };
    ElasticDatasource.prototype.objectContainsTemplate = function (obj) {
        var e_6, _a, e_7, _b;
        if (!obj) {
            return false;
        }
        try {
            for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object.keys(obj)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var key = _d.value;
                if (this.isPrimitive(obj[key])) {
                    if (this.templateSrv.variableExists(obj[key])) {
                        return true;
                    }
                }
                else if (Array.isArray(obj[key])) {
                    try {
                        for (var _e = (e_7 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(obj[key])), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var item = _f.value;
                            if (this.objectContainsTemplate(item)) {
                                return true;
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                }
                else {
                    if (this.objectContainsTemplate(obj[key])) {
                        return true;
                    }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return false;
    };
    return ElasticDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["DataSourceApi"]));



/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/elastic_response.ts":
/*!*************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/elastic_response.ts ***!
  \*************************************************************************/
/*! exports provided: ElasticResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticResponse", function() { return ElasticResponse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_utils_flatten__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/utils/flatten */ "./public/app/core/utils/flatten.ts");
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");






var ElasticResponse = /** @class */ (function () {
    function ElasticResponse(targets, response) {
        this.targets = targets;
        this.response = response;
        this.targets = targets;
        this.response = response;
    }
    ElasticResponse.prototype.processMetrics = function (esAgg, target, seriesList, props) {
        var metric, y, i, newSeries, bucket, value;
        for (y = 0; y < target.metrics.length; y++) {
            metric = target.metrics[y];
            if (metric.hide) {
                continue;
            }
            switch (metric.type) {
                case 'count': {
                    newSeries = { datapoints: [], metric: 'count', props: props };
                    for (i = 0; i < esAgg.buckets.length; i++) {
                        bucket = esAgg.buckets[i];
                        value = bucket.doc_count;
                        newSeries.datapoints.push([value, bucket.key]);
                    }
                    seriesList.push(newSeries);
                    break;
                }
                case 'percentiles': {
                    if (esAgg.buckets.length === 0) {
                        break;
                    }
                    var firstBucket = esAgg.buckets[0];
                    var percentiles = firstBucket[metric.id].values;
                    for (var percentileName in percentiles) {
                        newSeries = {
                            datapoints: [],
                            metric: 'p' + percentileName,
                            props: props,
                            field: metric.field,
                        };
                        for (i = 0; i < esAgg.buckets.length; i++) {
                            bucket = esAgg.buckets[i];
                            var values = bucket[metric.id].values;
                            newSeries.datapoints.push([values[percentileName], bucket.key]);
                        }
                        seriesList.push(newSeries);
                    }
                    break;
                }
                case 'extended_stats': {
                    for (var statName in metric.meta) {
                        if (!metric.meta[statName]) {
                            continue;
                        }
                        newSeries = {
                            datapoints: [],
                            metric: statName,
                            props: props,
                            field: metric.field,
                        };
                        for (i = 0; i < esAgg.buckets.length; i++) {
                            bucket = esAgg.buckets[i];
                            var stats = bucket[metric.id];
                            // add stats that are in nested obj to top level obj
                            stats.std_deviation_bounds_upper = stats.std_deviation_bounds.upper;
                            stats.std_deviation_bounds_lower = stats.std_deviation_bounds.lower;
                            newSeries.datapoints.push([stats[statName], bucket.key]);
                        }
                        seriesList.push(newSeries);
                    }
                    break;
                }
                default: {
                    newSeries = {
                        datapoints: [],
                        metric: metric.type,
                        field: metric.field,
                        metricId: metric.id,
                        props: props,
                    };
                    for (i = 0; i < esAgg.buckets.length; i++) {
                        bucket = esAgg.buckets[i];
                        value = bucket[metric.id];
                        if (value !== undefined) {
                            if (value.normalized_value) {
                                newSeries.datapoints.push([value.normalized_value, bucket.key]);
                            }
                            else {
                                newSeries.datapoints.push([value.value, bucket.key]);
                            }
                        }
                    }
                    seriesList.push(newSeries);
                    break;
                }
            }
        }
    };
    ElasticResponse.prototype.processAggregationDocs = function (esAgg, aggDef, target, table, props) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        // add columns
        if (table.columns.length === 0) {
            try {
                for (var _e = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.keys(props)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var propKey = _f.value;
                    table.addColumn({ text: propKey, filterable: true });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            table.addColumn({ text: aggDef.field, filterable: true });
        }
        // helper func to add values to value array
        var addMetricValue = function (values, metricName, value) {
            table.addColumn({ text: metricName });
            values.push(value);
        };
        try {
            for (var _g = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(esAgg.buckets), _h = _g.next(); !_h.done; _h = _g.next()) {
                var bucket = _h.value;
                var values = [];
                try {
                    for (var _j = (e_3 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.values(props))), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var propValues = _k.value;
                        values.push(propValues);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                // add bucket key (value)
                values.push(bucket.key);
                try {
                    for (var _l = (e_4 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(target.metrics)), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var metric = _m.value;
                        switch (metric.type) {
                            case 'count': {
                                addMetricValue(values, this.getMetricName(metric.type), bucket.doc_count);
                                break;
                            }
                            case 'extended_stats': {
                                for (var statName in metric.meta) {
                                    if (!metric.meta[statName]) {
                                        continue;
                                    }
                                    var stats = bucket[metric.id];
                                    // add stats that are in nested obj to top level obj
                                    stats.std_deviation_bounds_upper = stats.std_deviation_bounds.upper;
                                    stats.std_deviation_bounds_lower = stats.std_deviation_bounds.lower;
                                    addMetricValue(values, this.getMetricName(statName), stats[statName]);
                                }
                                break;
                            }
                            case 'percentiles': {
                                var percentiles = bucket[metric.id].values;
                                for (var percentileName in percentiles) {
                                    addMetricValue(values, "p" + percentileName + " " + metric.field, percentiles[percentileName]);
                                }
                                break;
                            }
                            default: {
                                var metricName = this.getMetricName(metric.type);
                                var otherMetrics = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(target.metrics, { type: metric.type });
                                // if more of the same metric type include field field name in property
                                if (otherMetrics.length > 1) {
                                    metricName += ' ' + metric.field;
                                }
                                addMetricValue(values, metricName, bucket[metric.id].value);
                                break;
                            }
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                table.rows.push(values);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    // This is quite complex
    // need to recurse down the nested buckets to build series
    ElasticResponse.prototype.processBuckets = function (aggs, target, seriesList, table, props, depth) {
        var bucket, aggDef, esAgg, aggId;
        var maxDepth = target.bucketAggs.length - 1;
        for (aggId in aggs) {
            aggDef = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(target.bucketAggs, { id: aggId });
            esAgg = aggs[aggId];
            if (!aggDef) {
                continue;
            }
            if (depth === maxDepth) {
                if (aggDef.type === 'date_histogram') {
                    this.processMetrics(esAgg, target, seriesList, props);
                }
                else {
                    this.processAggregationDocs(esAgg, aggDef, target, table, props);
                }
            }
            else {
                for (var nameIndex in esAgg.buckets) {
                    bucket = esAgg.buckets[nameIndex];
                    props = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(props);
                    if (bucket.key !== void 0) {
                        props[aggDef.field] = bucket.key;
                    }
                    else {
                        props['filter'] = nameIndex;
                    }
                    if (bucket.key_as_string) {
                        props[aggDef.field] = bucket.key_as_string;
                    }
                    this.processBuckets(bucket, target, seriesList, table, props, depth + 1);
                }
            }
        }
    };
    ElasticResponse.prototype.getMetricName = function (metric) {
        var metricDef = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(_query_def__WEBPACK_IMPORTED_MODULE_3__["metricAggTypes"], { value: metric });
        if (!metricDef) {
            metricDef = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(_query_def__WEBPACK_IMPORTED_MODULE_3__["extendedStats"], { value: metric });
        }
        return metricDef ? metricDef.text : metric;
    };
    ElasticResponse.prototype.getSeriesName = function (series, target, metricTypeCount) {
        var e_5, _a;
        var metricName = this.getMetricName(series.metric);
        if (target.alias) {
            var regex = /\{\{([\s\S]+?)\}\}/g;
            return target.alias.replace(regex, function (match, g1, g2) {
                var group = g1 || g2;
                if (group.indexOf('term ') === 0) {
                    return series.props[group.substring(5)];
                }
                if (series.props[group] !== void 0) {
                    return series.props[group];
                }
                if (group === 'metric') {
                    return metricName;
                }
                if (group === 'field') {
                    return series.field || '';
                }
                return match;
            });
        }
        if (series.field && _query_def__WEBPACK_IMPORTED_MODULE_3__["isPipelineAgg"](series.metric)) {
            if (series.metric && _query_def__WEBPACK_IMPORTED_MODULE_3__["isPipelineAggWithMultipleBucketPaths"](series.metric)) {
                var agg = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(target.metrics, { id: series.metricId });
                if (agg && agg.settings.script) {
                    metricName = agg.settings.script;
                    try {
                        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(agg.pipelineVariables), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var pv = _c.value;
                            var appliedAgg = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(target.metrics, { id: pv.pipelineAgg });
                            if (appliedAgg) {
                                metricName = metricName.replace('params.' + pv.name, _query_def__WEBPACK_IMPORTED_MODULE_3__["describeMetric"](appliedAgg));
                            }
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
                else {
                    metricName = 'Unset';
                }
            }
            else {
                var appliedAgg = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(target.metrics, { id: series.field });
                if (appliedAgg) {
                    metricName += ' ' + _query_def__WEBPACK_IMPORTED_MODULE_3__["describeMetric"](appliedAgg);
                }
                else {
                    metricName = 'Unset';
                }
            }
        }
        else if (series.field) {
            metricName += ' ' + series.field;
        }
        var propKeys = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.keys(series.props);
        if (propKeys.length === 0) {
            return metricName;
        }
        var name = '';
        for (var propName in series.props) {
            name += series.props[propName] + ' ';
        }
        if (metricTypeCount === 1) {
            return name.trim();
        }
        return name.trim() + ' ' + metricName;
    };
    ElasticResponse.prototype.nameSeries = function (seriesList, target) {
        var metricTypeCount = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.uniq(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(seriesList, 'metric')).length;
        for (var i = 0; i < seriesList.length; i++) {
            var series = seriesList[i];
            series.target = this.getSeriesName(series, target, metricTypeCount);
        }
    };
    ElasticResponse.prototype.processHits = function (hits, seriesList) {
        var hitsTotal = typeof hits.total === 'number' ? hits.total : hits.total.value; // <- Works with Elasticsearch 7.0+
        var series = {
            target: 'docs',
            type: 'docs',
            datapoints: [],
            total: hitsTotal,
            filterable: true,
        };
        var propName, hit, doc, i;
        for (i = 0; i < hits.hits.length; i++) {
            hit = hits.hits[i];
            doc = {
                _id: hit._id,
                _type: hit._type,
                _index: hit._index,
            };
            if (hit._source) {
                for (propName in hit._source) {
                    doc[propName] = hit._source[propName];
                }
            }
            for (propName in hit.fields) {
                doc[propName] = hit.fields[propName];
            }
            series.datapoints.push(doc);
        }
        seriesList.push(series);
    };
    ElasticResponse.prototype.trimDatapoints = function (aggregations, target) {
        var histogram = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(target.bucketAggs, { type: 'date_histogram' });
        var shouldDropFirstAndLast = histogram && histogram.settings && histogram.settings.trimEdges;
        if (shouldDropFirstAndLast) {
            var trim = histogram.settings.trimEdges;
            for (var prop in aggregations) {
                var points = aggregations[prop];
                if (points.datapoints.length > trim * 2) {
                    points.datapoints = points.datapoints.slice(trim, points.datapoints.length - trim);
                }
            }
        }
    };
    ElasticResponse.prototype.getErrorFromElasticResponse = function (response, err) {
        var result = {};
        result.data = JSON.stringify(err, null, 4);
        if (err.root_cause && err.root_cause.length > 0 && err.root_cause[0].reason) {
            result.message = err.root_cause[0].reason;
        }
        else {
            result.message = err.reason || 'Unkown elastic error response';
        }
        if (response.$$config) {
            result.config = response.$$config;
        }
        return result;
    };
    ElasticResponse.prototype.getTimeSeries = function () {
        var seriesList = [];
        for (var i = 0; i < this.response.responses.length; i++) {
            var response = this.response.responses[i];
            if (response.error) {
                throw this.getErrorFromElasticResponse(this.response, response.error);
            }
            if (response.hits && response.hits.hits.length > 0) {
                this.processHits(response.hits, seriesList);
            }
            if (response.aggregations) {
                var aggregations = response.aggregations;
                var target = this.targets[i];
                var tmpSeriesList = [];
                var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_4__["default"]();
                this.processBuckets(aggregations, target, tmpSeriesList, table, {}, 0);
                this.trimDatapoints(tmpSeriesList, target);
                this.nameSeries(tmpSeriesList, target);
                for (var y = 0; y < tmpSeriesList.length; y++) {
                    seriesList.push(tmpSeriesList[y]);
                }
                if (table.rows.length > 0) {
                    seriesList.push(table);
                }
            }
        }
        return { data: seriesList };
    };
    ElasticResponse.prototype.getLogs = function (logMessageField, logLevelField) {
        var e_6, _a, e_7, _b, e_8, _c, e_9, _d;
        var dataFrame = [];
        var docs = [];
        for (var n = 0; n < this.response.responses.length; n++) {
            var response = this.response.responses[n];
            if (response.error) {
                throw this.getErrorFromElasticResponse(this.response, response.error);
            }
            // We keep a list of all props so that we can create all the fields in the dataFrame, this can lead
            // to wide sparse dataframes in case the scheme is different per document.
            var propNames = [];
            try {
                for (var _e = (e_6 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(response.hits.hits)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var hit = _f.value;
                    var flattened = hit._source ? Object(app_core_utils_flatten__WEBPACK_IMPORTED_MODULE_2__["default"])(hit._source, null) : {};
                    var doc = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ _id: hit._id, _type: hit._type, _index: hit._index, _source: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, flattened) }, flattened);
                    try {
                        for (var _g = (e_7 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object.keys(doc))), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var propName = _h.value;
                            if (propNames.indexOf(propName) === -1) {
                                propNames.push(propName);
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    docs.push(doc);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_6) throw e_6.error; }
            }
            if (docs.length > 0) {
                propNames = propNames.sort();
                var series = new _grafana_data__WEBPACK_IMPORTED_MODULE_5__["MutableDataFrame"]({ fields: [] });
                series.addField({
                    name: this.targets[0].timeField,
                    type: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["FieldType"].time,
                });
                if (logMessageField) {
                    series.addField({
                        name: logMessageField,
                        type: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["FieldType"].string,
                    }).parse = function (v) {
                        return v || '';
                    };
                }
                else {
                    series.addField({
                        name: '_source',
                        type: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["FieldType"].string,
                    }).parse = function (v) {
                        return JSON.stringify(v, null, 2);
                    };
                }
                if (logLevelField) {
                    series.addField({
                        name: 'level',
                        type: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["FieldType"].string,
                    }).parse = function (v) {
                        return v || '';
                    };
                }
                try {
                    for (var propNames_1 = (e_8 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(propNames)), propNames_1_1 = propNames_1.next(); !propNames_1_1.done; propNames_1_1 = propNames_1.next()) {
                        var propName = propNames_1_1.value;
                        if (propName === this.targets[0].timeField || propName === '_source') {
                            continue;
                        }
                        series.addField({
                            name: propName,
                            type: _grafana_data__WEBPACK_IMPORTED_MODULE_5__["FieldType"].string,
                        }).parse = function (v) {
                            return v || '';
                        };
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (propNames_1_1 && !propNames_1_1.done && (_c = propNames_1.return)) _c.call(propNames_1);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                try {
                    // Add a row for each document
                    for (var docs_1 = (e_9 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(docs)), docs_1_1 = docs_1.next(); !docs_1_1.done; docs_1_1 = docs_1.next()) {
                        var doc = docs_1_1.value;
                        series.add(doc);
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (docs_1_1 && !docs_1_1.done && (_d = docs_1.return)) _d.call(docs_1);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
                dataFrame.push(series);
            }
            if (response.aggregations) {
                var aggregations = response.aggregations;
                var target = this.targets[n];
                var tmpSeriesList = [];
                var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_4__["default"]();
                this.processBuckets(aggregations, target, tmpSeriesList, table, {}, 0);
                this.trimDatapoints(tmpSeriesList, target);
                this.nameSeries(tmpSeriesList, target);
                for (var y = 0; y < tmpSeriesList.length; y++) {
                    var series = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["toDataFrame"])(tmpSeriesList[y]);
                    dataFrame.push(series);
                }
            }
        }
        return { data: dataFrame };
    };
    return ElasticResponse;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/index_pattern.ts":
/*!**********************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/index_pattern.ts ***!
  \**********************************************************************/
/*! exports provided: IndexPattern */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexPattern", function() { return IndexPattern; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

var intervalMap = {
    Hourly: { startOf: 'hour', amount: 'hours' },
    Daily: { startOf: 'day', amount: 'days' },
    Weekly: { startOf: 'isoWeek', amount: 'weeks' },
    Monthly: { startOf: 'month', amount: 'months' },
    Yearly: { startOf: 'year', amount: 'years' },
};
var IndexPattern = /** @class */ (function () {
    function IndexPattern(pattern, interval) {
        this.pattern = pattern;
        this.interval = interval;
    }
    IndexPattern.prototype.getIndexForToday = function () {
        if (this.interval) {
            return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["toUtc"])().format(this.pattern);
        }
        else {
            return this.pattern;
        }
    };
    IndexPattern.prototype.getIndexList = function (from, to) {
        if (!this.interval) {
            return this.pattern;
        }
        var intervalInfo = intervalMap[this.interval];
        var start = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(from)
            .utc()
            .startOf(intervalInfo.startOf);
        var endEpoch = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["dateTime"])(to)
            .utc()
            .startOf(intervalInfo.startOf)
            .valueOf();
        var indexList = [];
        while (start.valueOf() <= endEpoch) {
            indexList.push(start.format(this.pattern));
            start.add(1, intervalInfo.amount);
        }
        return indexList;
    };
    return IndexPattern;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/metric_agg.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/metric_agg.ts ***!
  \*******************************************************************/
/*! exports provided: ElasticMetricAggCtrl, elasticMetricAgg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticMetricAggCtrl", function() { return ElasticMetricAggCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticMetricAgg", function() { return elasticMetricAgg; });
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");




var ElasticMetricAggCtrl = /** @class */ (function () {
    /** @ngInject */
    function ElasticMetricAggCtrl($scope, uiSegmentSrv, $rootScope) {
        var metricAggs = $scope.target.metrics;
        $scope.metricAggTypes = _query_def__WEBPACK_IMPORTED_MODULE_2__["getMetricAggTypes"]($scope.esVersion);
        $scope.extendedStats = _query_def__WEBPACK_IMPORTED_MODULE_2__["extendedStats"];
        $scope.pipelineAggOptions = [];
        $scope.modelSettingsValues = {};
        $scope.init = function () {
            $scope.agg = metricAggs[$scope.index];
            $scope.validateModel();
            $scope.updatePipelineAggOptions();
        };
        $scope.updatePipelineAggOptions = function () {
            $scope.pipelineAggOptions = _query_def__WEBPACK_IMPORTED_MODULE_2__["getPipelineAggOptions"]($scope.target);
        };
        $rootScope.onAppEvent(app_types__WEBPACK_IMPORTED_MODULE_3__["CoreEvents"].elasticQueryUpdated, function () {
            $scope.index = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.indexOf(metricAggs, $scope.agg);
            $scope.updatePipelineAggOptions();
            $scope.validateModel();
        }, $scope);
        $scope.validateModel = function () {
            $scope.isFirst = $scope.index === 0;
            $scope.isSingle = metricAggs.length === 1;
            $scope.settingsLinkText = '';
            $scope.variablesLinkText = '';
            $scope.aggDef = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find($scope.metricAggTypes, { value: $scope.agg.type });
            if (_query_def__WEBPACK_IMPORTED_MODULE_2__["isPipelineAgg"]($scope.agg.type)) {
                if (_query_def__WEBPACK_IMPORTED_MODULE_2__["isPipelineAggWithMultipleBucketPaths"]($scope.agg.type)) {
                    $scope.variablesLinkText = 'Options';
                    if ($scope.agg.settings.script) {
                        $scope.variablesLinkText = 'Script: ' + $scope.agg.settings.script.replace(new RegExp('params.', 'g'), '');
                    }
                }
                else {
                    $scope.agg.pipelineAgg = $scope.agg.pipelineAgg || 'select metric';
                    $scope.agg.field = $scope.agg.pipelineAgg;
                }
                var pipelineOptions = _query_def__WEBPACK_IMPORTED_MODULE_2__["getPipelineOptions"]($scope.agg);
                if (pipelineOptions.length > 0) {
                    lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(pipelineOptions, function (opt) {
                        $scope.agg.settings[opt.text] = $scope.agg.settings[opt.text] || opt.default;
                    });
                    $scope.settingsLinkText = 'Options';
                }
            }
            else if (!$scope.agg.field) {
                $scope.agg.field = 'select field';
            }
            switch ($scope.agg.type) {
                case 'cardinality': {
                    var precisionThreshold = $scope.agg.settings.precision_threshold || '';
                    $scope.settingsLinkText = 'Precision threshold: ' + precisionThreshold;
                    break;
                }
                case 'percentiles': {
                    $scope.agg.settings.percents = $scope.agg.settings.percents || [25, 50, 75, 95, 99];
                    $scope.settingsLinkText = 'Values: ' + $scope.agg.settings.percents.join(',');
                    break;
                }
                case 'extended_stats': {
                    if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.keys($scope.agg.meta).length === 0) {
                        $scope.agg.meta.std_deviation_bounds_lower = true;
                        $scope.agg.meta.std_deviation_bounds_upper = true;
                    }
                    var stats = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce($scope.agg.meta, function (memo, val, key) {
                        if (val) {
                            var def = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find($scope.extendedStats, { value: key });
                            memo.push(def.text);
                        }
                        return memo;
                    }, []);
                    $scope.settingsLinkText = 'Stats: ' + stats.join(', ');
                    break;
                }
                case 'moving_avg': {
                    $scope.movingAvgModelTypes = _query_def__WEBPACK_IMPORTED_MODULE_2__["movingAvgModelOptions"];
                    $scope.modelSettings = _query_def__WEBPACK_IMPORTED_MODULE_2__["getMovingAvgSettings"]($scope.agg.settings.model, true);
                    $scope.updateMovingAvgModelSettings();
                    break;
                }
                case 'raw_document': {
                    $scope.agg.settings.size = $scope.agg.settings.size || 500;
                    $scope.settingsLinkText = 'Size: ' + $scope.agg.settings.size;
                    $scope.target.metrics.splice(0, $scope.target.metrics.length, $scope.agg);
                    $scope.target.bucketAggs = [];
                    break;
                }
            }
            if ($scope.aggDef.supportsInlineScript) {
                // I know this stores the inline script twice
                // but having it like this simplifes the query_builder
                var inlineScript = $scope.agg.inlineScript;
                if (inlineScript) {
                    $scope.agg.settings.script = { inline: inlineScript };
                }
                else {
                    delete $scope.agg.settings.script;
                }
                if ($scope.settingsLinkText === '') {
                    $scope.settingsLinkText = 'Options';
                }
            }
        };
        $scope.toggleOptions = function () {
            $scope.showOptions = !$scope.showOptions;
            $scope.updatePipelineAggOptions();
        };
        $scope.toggleVariables = function () {
            $scope.showVariables = !$scope.showVariables;
        };
        $scope.onChangeInternal = function () {
            $scope.onChange();
        };
        $scope.updateMovingAvgModelSettings = function () {
            var modelSettingsKeys = [];
            var modelSettings = _query_def__WEBPACK_IMPORTED_MODULE_2__["getMovingAvgSettings"]($scope.agg.settings.model, false);
            for (var i = 0; i < modelSettings.length; i++) {
                modelSettingsKeys.push(modelSettings[i].value);
            }
            for (var key in $scope.agg.settings.settings) {
                if ($scope.agg.settings.settings[key] === null || modelSettingsKeys.indexOf(key) === -1) {
                    delete $scope.agg.settings.settings[key];
                }
            }
        };
        $scope.onChangeClearInternal = function () {
            delete $scope.agg.settings.minimize;
            $scope.onChange();
        };
        $scope.onTypeChange = function () {
            $scope.agg.settings = {};
            $scope.agg.meta = {};
            $scope.showOptions = false;
            // reset back to metric/group by query
            if ($scope.target.bucketAggs.length === 0 && $scope.agg.type !== 'raw_document') {
                $scope.target.bucketAggs = [_query_def__WEBPACK_IMPORTED_MODULE_2__["defaultBucketAgg"]()];
            }
            $scope.showVariables = _query_def__WEBPACK_IMPORTED_MODULE_2__["isPipelineAggWithMultipleBucketPaths"]($scope.agg.type);
            $scope.updatePipelineAggOptions();
            $scope.onChange();
        };
        $scope.getFieldsInternal = function () {
            if ($scope.agg.type === 'cardinality') {
                return $scope.getFields();
            }
            return $scope.getFields({ $fieldType: 'number' });
        };
        $scope.addMetricAgg = function () {
            var addIndex = metricAggs.length;
            var id = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce($scope.target.bucketAggs.concat($scope.target.metrics), function (max, val) {
                return parseInt(val.id, 10) > max ? parseInt(val.id, 10) : max;
            }, 0);
            metricAggs.splice(addIndex, 0, { type: 'count', field: 'select field', id: (id + 1).toString() });
            $scope.onChange();
        };
        $scope.removeMetricAgg = function () {
            metricAggs.splice($scope.index, 1);
            $scope.onChange();
        };
        $scope.toggleShowMetric = function () {
            $scope.agg.hide = !$scope.agg.hide;
            if (!$scope.agg.hide) {
                delete $scope.agg.hide;
            }
            $scope.onChange();
        };
        $scope.init();
    }
    return ElasticMetricAggCtrl;
}());

function elasticMetricAgg() {
    return {
        templateUrl: 'public/app/plugins/datasource/elasticsearch/partials/metric_agg.html',
        controller: ElasticMetricAggCtrl,
        restrict: 'E',
        scope: {
            target: '=',
            index: '=',
            onChange: '&',
            getFields: '&',
            esVersion: '=',
        },
    };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].directive('elasticMetricAgg', elasticMetricAgg);


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/module.ts":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/module.ts ***!
  \***************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/elasticsearch/datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/elasticsearch/query_ctrl.ts");
/* harmony import */ var _components_ElasticsearchQueryField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ElasticsearchQueryField */ "./public/app/plugins/datasource/elasticsearch/components/ElasticsearchQueryField.tsx");
/* harmony import */ var _configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./configuration/ConfigEditor */ "./public/app/plugins/datasource/elasticsearch/configuration/ConfigEditor.tsx");





var ElasticAnnotationsQueryCtrl = /** @class */ (function () {
    function ElasticAnnotationsQueryCtrl() {
    }
    ElasticAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return ElasticAnnotationsQueryCtrl;
}());
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_1__["ElasticDatasource"])
    .setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_2__["ElasticQueryCtrl"])
    .setConfigEditor(_configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_4__["ConfigEditor"])
    .setExploreLogsQueryField(_components_ElasticsearchQueryField__WEBPACK_IMPORTED_MODULE_3__["default"])
    .setAnnotationQueryCtrl(ElasticAnnotationsQueryCtrl);


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/pipeline_variables.ts":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/pipeline_variables.ts ***!
  \***************************************************************************/
/*! exports provided: elasticPipelineVariables, ElasticPipelineVariablesCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elasticPipelineVariables", function() { return elasticPipelineVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticPipelineVariablesCtrl", function() { return ElasticPipelineVariablesCtrl; });
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");

function elasticPipelineVariables() {
    return {
        templateUrl: 'public/app/plugins/datasource/elasticsearch/partials/pipeline_variables.html',
        controller: 'ElasticPipelineVariablesCtrl',
        restrict: 'E',
        scope: {
            onChange: '&',
            variables: '=',
            options: '=',
        },
    };
}
var newVariable = function (index) {
    return {
        name: 'var' + index,
        pipelineAgg: 'select metric',
    };
};
var ElasticPipelineVariablesCtrl = /** @class */ (function () {
    /** @ngInject */
    function ElasticPipelineVariablesCtrl($scope) {
        $scope.variables = $scope.variables || [newVariable(1)];
        $scope.onChangeInternal = function () {
            $scope.onChange();
        };
        $scope.add = function () {
            $scope.variables.push(newVariable($scope.variables.length + 1));
            $scope.onChange();
        };
        $scope.remove = function (index) {
            $scope.variables.splice(index, 1);
            $scope.onChange();
        };
    }
    return ElasticPipelineVariablesCtrl;
}());

app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].directive('elasticPipelineVariables', elasticPipelineVariables);
app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].controller('ElasticPipelineVariablesCtrl', ElasticPipelineVariablesCtrl);


/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/query_builder.ts":
/*!**********************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/query_builder.ts ***!
  \**********************************************************************/
/*! exports provided: ElasticQueryBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticQueryBuilder", function() { return ElasticQueryBuilder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");


var ElasticQueryBuilder = /** @class */ (function () {
    function ElasticQueryBuilder(options) {
        this.timeField = options.timeField;
        this.esVersion = options.esVersion;
    }
    ElasticQueryBuilder.prototype.getRangeFilter = function () {
        var filter = {};
        filter[this.timeField] = {
            gte: '$timeFrom',
            lte: '$timeTo',
            format: 'epoch_millis',
        };
        return filter;
    };
    ElasticQueryBuilder.prototype.buildTermsAgg = function (aggDef, queryNode, target) {
        var metricRef, metric, y;
        queryNode.terms = { field: aggDef.field };
        if (!aggDef.settings) {
            return queryNode;
        }
        queryNode.terms.size = parseInt(aggDef.settings.size, 10) === 0 ? 500 : parseInt(aggDef.settings.size, 10);
        if (aggDef.settings.orderBy !== void 0) {
            queryNode.terms.order = {};
            if (aggDef.settings.orderBy === '_term' && this.esVersion >= 60) {
                queryNode.terms.order['_key'] = aggDef.settings.order;
            }
            else {
                queryNode.terms.order[aggDef.settings.orderBy] = aggDef.settings.order;
            }
            // if metric ref, look it up and add it to this agg level
            metricRef = parseInt(aggDef.settings.orderBy, 10);
            if (!isNaN(metricRef)) {
                for (y = 0; y < target.metrics.length; y++) {
                    metric = target.metrics[y];
                    if (metric.id === aggDef.settings.orderBy) {
                        queryNode.aggs = {};
                        queryNode.aggs[metric.id] = {};
                        queryNode.aggs[metric.id][metric.type] = { field: metric.field };
                        break;
                    }
                }
            }
        }
        if (aggDef.settings.min_doc_count !== void 0) {
            queryNode.terms.min_doc_count = parseInt(aggDef.settings.min_doc_count, 10);
        }
        if (aggDef.settings.missing) {
            queryNode.terms.missing = aggDef.settings.missing;
        }
        return queryNode;
    };
    ElasticQueryBuilder.prototype.getDateHistogramAgg = function (aggDef) {
        var esAgg = {};
        var settings = aggDef.settings || {};
        esAgg.interval = settings.interval;
        esAgg.field = this.timeField;
        esAgg.min_doc_count = settings.min_doc_count || 0;
        esAgg.extended_bounds = { min: '$timeFrom', max: '$timeTo' };
        esAgg.format = 'epoch_millis';
        if (settings.offset !== '') {
            esAgg.offset = settings.offset;
        }
        if (esAgg.interval === 'auto') {
            esAgg.interval = '$__interval';
        }
        if (settings.missing) {
            esAgg.missing = settings.missing;
        }
        return esAgg;
    };
    ElasticQueryBuilder.prototype.getHistogramAgg = function (aggDef) {
        var esAgg = {};
        var settings = aggDef.settings || {};
        esAgg.interval = settings.interval;
        esAgg.field = aggDef.field;
        esAgg.min_doc_count = settings.min_doc_count || 0;
        if (settings.missing) {
            esAgg.missing = settings.missing;
        }
        return esAgg;
    };
    ElasticQueryBuilder.prototype.getFiltersAgg = function (aggDef) {
        var filterObj = {};
        for (var i = 0; i < aggDef.settings.filters.length; i++) {
            var query = aggDef.settings.filters[i].query;
            var label = aggDef.settings.filters[i].label;
            label = label === '' || label === undefined ? query : label;
            filterObj[label] = {
                query_string: {
                    query: query,
                    analyze_wildcard: true,
                },
            };
        }
        return filterObj;
    };
    ElasticQueryBuilder.prototype.documentQuery = function (query, size) {
        query.size = size;
        query.sort = {};
        query.sort[this.timeField] = { order: 'desc', unmapped_type: 'boolean' };
        // fields field not supported on ES 5.x
        if (this.esVersion < 5) {
            query.fields = ['*', '_source'];
        }
        query.script_fields = {};
        return query;
    };
    ElasticQueryBuilder.prototype.addAdhocFilters = function (query, adhocFilters) {
        if (!adhocFilters) {
            return;
        }
        var i, filter, condition, queryCondition;
        for (i = 0; i < adhocFilters.length; i++) {
            filter = adhocFilters[i];
            condition = {};
            condition[filter.key] = filter.value;
            queryCondition = {};
            queryCondition[filter.key] = { query: filter.value };
            switch (filter.operator) {
                case '=':
                    if (!query.query.bool.must) {
                        query.query.bool.must = [];
                    }
                    query.query.bool.must.push({ match_phrase: queryCondition });
                    break;
                case '!=':
                    if (!query.query.bool.must_not) {
                        query.query.bool.must_not = [];
                    }
                    query.query.bool.must_not.push({ match_phrase: queryCondition });
                    break;
                case '<':
                    condition[filter.key] = { lt: filter.value };
                    query.query.bool.filter.push({ range: condition });
                    break;
                case '>':
                    condition[filter.key] = { gt: filter.value };
                    query.query.bool.filter.push({ range: condition });
                    break;
                case '=~':
                    query.query.bool.filter.push({ regexp: condition });
                    break;
                case '!~':
                    query.query.bool.filter.push({
                        bool: { must_not: { regexp: condition } },
                    });
                    break;
            }
        }
    };
    ElasticQueryBuilder.prototype.build = function (target, adhocFilters, queryString) {
        // make sure query has defaults;
        target.metrics = target.metrics || [_query_def__WEBPACK_IMPORTED_MODULE_1__["defaultMetricAgg"]()];
        target.bucketAggs = target.bucketAggs || [_query_def__WEBPACK_IMPORTED_MODULE_1__["defaultBucketAgg"]()];
        target.timeField = this.timeField;
        var i, j, pv, nestedAggs, metric;
        var query = {
            size: 0,
            query: {
                bool: {
                    filter: [
                        { range: this.getRangeFilter() },
                        {
                            query_string: {
                                analyze_wildcard: true,
                                query: queryString,
                            },
                        },
                    ],
                },
            },
        };
        this.addAdhocFilters(query, adhocFilters);
        // handle document query
        if (target.bucketAggs.length === 0) {
            metric = target.metrics[0];
            if (!metric || metric.type !== 'raw_document') {
                throw { message: 'Invalid query' };
            }
            var size = (metric.settings && metric.settings.size) || 500;
            return this.documentQuery(query, size);
        }
        nestedAggs = query;
        for (i = 0; i < target.bucketAggs.length; i++) {
            var aggDef = target.bucketAggs[i];
            var esAgg = {};
            switch (aggDef.type) {
                case 'date_histogram': {
                    esAgg['date_histogram'] = this.getDateHistogramAgg(aggDef);
                    break;
                }
                case 'histogram': {
                    esAgg['histogram'] = this.getHistogramAgg(aggDef);
                    break;
                }
                case 'filters': {
                    esAgg['filters'] = { filters: this.getFiltersAgg(aggDef) };
                    break;
                }
                case 'terms': {
                    this.buildTermsAgg(aggDef, esAgg, target);
                    break;
                }
                case 'geohash_grid': {
                    esAgg['geohash_grid'] = {
                        field: aggDef.field,
                        precision: aggDef.settings.precision,
                    };
                    break;
                }
            }
            nestedAggs.aggs = nestedAggs.aggs || {};
            nestedAggs.aggs[aggDef.id] = esAgg;
            nestedAggs = esAgg;
        }
        nestedAggs.aggs = {};
        for (i = 0; i < target.metrics.length; i++) {
            metric = target.metrics[i];
            if (metric.type === 'count') {
                continue;
            }
            var aggField = {};
            var metricAgg = null;
            if (_query_def__WEBPACK_IMPORTED_MODULE_1__["isPipelineAgg"](metric.type)) {
                if (_query_def__WEBPACK_IMPORTED_MODULE_1__["isPipelineAggWithMultipleBucketPaths"](metric.type)) {
                    if (metric.pipelineVariables) {
                        metricAgg = {
                            buckets_path: {},
                        };
                        for (j = 0; j < metric.pipelineVariables.length; j++) {
                            pv = metric.pipelineVariables[j];
                            if (pv.name && pv.pipelineAgg && /^\d*$/.test(pv.pipelineAgg)) {
                                var appliedAgg = _query_def__WEBPACK_IMPORTED_MODULE_1__["findMetricById"](target.metrics, pv.pipelineAgg);
                                if (appliedAgg) {
                                    if (appliedAgg.type === 'count') {
                                        metricAgg.buckets_path[pv.name] = '_count';
                                    }
                                    else {
                                        metricAgg.buckets_path[pv.name] = pv.pipelineAgg;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }
                else {
                    if (metric.pipelineAgg && /^\d*$/.test(metric.pipelineAgg)) {
                        var appliedAgg = _query_def__WEBPACK_IMPORTED_MODULE_1__["findMetricById"](target.metrics, metric.pipelineAgg);
                        if (appliedAgg) {
                            if (appliedAgg.type === 'count') {
                                metricAgg = { buckets_path: '_count' };
                            }
                            else {
                                metricAgg = { buckets_path: metric.pipelineAgg };
                            }
                        }
                    }
                    else {
                        continue;
                    }
                }
            }
            else {
                metricAgg = { field: metric.field };
            }
            for (var prop in metric.settings) {
                if (metric.settings.hasOwnProperty(prop) && metric.settings[prop] !== null) {
                    metricAgg[prop] = metric.settings[prop];
                }
            }
            aggField[metric.type] = metricAgg;
            nestedAggs.aggs[metric.id] = aggField;
        }
        return query;
    };
    ElasticQueryBuilder.prototype.getTermsQuery = function (queryDef) {
        var query = {
            size: 0,
            query: {
                bool: {
                    filter: [{ range: this.getRangeFilter() }],
                },
            },
        };
        if (queryDef.query) {
            query.query.bool.filter.push({
                query_string: {
                    analyze_wildcard: true,
                    query: queryDef.query,
                },
            });
        }
        var size = 500;
        if (queryDef.size) {
            size = queryDef.size;
        }
        query.aggs = {
            '1': {
                terms: {
                    field: queryDef.field,
                    size: size,
                    order: {},
                },
            },
        };
        // Default behaviour is to order results by { _key: asc }
        // queryDef.order allows selection of asc/desc
        // queryDef.orderBy allows selection of doc_count ordering (defaults desc)
        var _a = queryDef.orderBy, orderBy = _a === void 0 ? 'key' : _a, _b = queryDef.order, order = _b === void 0 ? orderBy === 'doc_count' ? 'desc' : 'asc' : _b;
        if (['asc', 'desc'].indexOf(order) < 0) {
            throw { message: "Invalid query sort order " + order };
        }
        switch (orderBy) {
            case 'key':
            case 'term':
                var keyname = this.esVersion >= 60 ? '_key' : '_term';
                query.aggs['1'].terms.order[keyname] = order;
                break;
            case 'doc_count':
                query.aggs['1'].terms.order['_count'] = order;
                break;
            default:
                throw { message: "Invalid query sort type " + orderBy };
        }
        return query;
    };
    ElasticQueryBuilder.prototype.getLogsQuery = function (target, adhocFilters, querystring) {
        var query = {
            size: 0,
            query: {
                bool: {
                    filter: [{ range: this.getRangeFilter() }],
                },
            },
        };
        this.addAdhocFilters(query, adhocFilters);
        if (target.query) {
            query.query.bool.filter.push({
                query_string: {
                    analyze_wildcard: true,
                    query: querystring,
                },
            });
        }
        query = this.documentQuery(query, 500);
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { aggs: this.build(target, null, querystring).aggs });
    };
    return ElasticQueryBuilder;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/query_ctrl.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/query_ctrl.ts ***!
  \*******************************************************************/
/*! exports provided: ElasticQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElasticQueryCtrl", function() { return ElasticQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _bucket_agg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bucket_agg */ "./public/app/plugins/datasource/elasticsearch/bucket_agg.ts");
/* harmony import */ var _metric_agg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metric_agg */ "./public/app/plugins/datasource/elasticsearch/metric_agg.ts");
/* harmony import */ var _pipeline_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pipeline_variables */ "./public/app/plugins/datasource/elasticsearch/pipeline_variables.ts");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _query_def__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./query_def */ "./public/app/plugins/datasource/elasticsearch/query_def.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");









var ElasticQueryCtrl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ElasticQueryCtrl, _super);
    /** @ngInject */
    function ElasticQueryCtrl($scope, $injector, $rootScope, uiSegmentSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.$rootScope = $rootScope;
        _this.uiSegmentSrv = uiSegmentSrv;
        _this.esVersion = _this.datasource.esVersion;
        _this.target = _this.target || {};
        _this.target.metrics = _this.target.metrics || [_query_def__WEBPACK_IMPORTED_MODULE_6__["defaultMetricAgg"]()];
        _this.target.bucketAggs = _this.target.bucketAggs || [_query_def__WEBPACK_IMPORTED_MODULE_6__["defaultBucketAgg"]()];
        if (_this.target.bucketAggs.length === 0) {
            var metric = _this.target.metrics[0];
            if (!metric || metric.type !== 'raw_document') {
                _this.target.bucketAggs = [_query_def__WEBPACK_IMPORTED_MODULE_6__["defaultBucketAgg"]()];
            }
            _this.refresh();
        }
        _this.queryUpdated();
        return _this;
    }
    ElasticQueryCtrl.prototype.getFields = function (type) {
        var jsonStr = angular__WEBPACK_IMPORTED_MODULE_4___default.a.toJson({ find: 'fields', type: type });
        return this.datasource
            .metricFindQuery(jsonStr)
            .then(this.uiSegmentSrv.transformToSegments(false))
            .catch(this.handleQueryError.bind(this));
    };
    ElasticQueryCtrl.prototype.queryUpdated = function () {
        var newJson = angular__WEBPACK_IMPORTED_MODULE_4___default.a.toJson(this.datasource.queryBuilder.build(this.target), true);
        if (this.rawQueryOld && newJson !== this.rawQueryOld) {
            this.refresh();
        }
        this.rawQueryOld = newJson;
        this.$rootScope.appEvent(app_types__WEBPACK_IMPORTED_MODULE_8__["CoreEvents"].elasticQueryUpdated);
    };
    ElasticQueryCtrl.prototype.getCollapsedText = function () {
        var metricAggs = this.target.metrics;
        var bucketAggs = this.target.bucketAggs;
        var metricAggTypes = _query_def__WEBPACK_IMPORTED_MODULE_6__["getMetricAggTypes"](this.esVersion);
        var bucketAggTypes = _query_def__WEBPACK_IMPORTED_MODULE_6__["bucketAggTypes"];
        var text = '';
        if (this.target.query) {
            text += 'Query: ' + this.target.query + ', ';
        }
        text += 'Metrics: ';
        lodash__WEBPACK_IMPORTED_MODULE_5___default.a.each(metricAggs, function (metric, index) {
            var aggDef = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(metricAggTypes, { value: metric.type });
            text += aggDef.text + '(';
            if (aggDef.requiresField) {
                text += metric.field;
            }
            if (aggDef.supportsMultipleBucketPaths) {
                text += metric.settings.script.replace(new RegExp('params.', 'g'), '');
            }
            text += '), ';
        });
        lodash__WEBPACK_IMPORTED_MODULE_5___default.a.each(bucketAggs, function (bucketAgg, index) {
            if (index === 0) {
                text += ' Group by: ';
            }
            var aggDef = lodash__WEBPACK_IMPORTED_MODULE_5___default.a.find(bucketAggTypes, { value: bucketAgg.type });
            text += aggDef.text + '(';
            if (aggDef.requiresField) {
                text += bucketAgg.field;
            }
            text += '), ';
        });
        if (this.target.alias) {
            text += 'Alias: ' + this.target.alias;
        }
        return text;
    };
    ElasticQueryCtrl.prototype.handleQueryError = function (err) {
        this.error = err.message || 'Failed to issue metric query';
        return [];
    };
    ElasticQueryCtrl.templateUrl = 'partials/query.editor.html';
    return ElasticQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_7__["QueryCtrl"]));



/***/ }),

/***/ "./public/app/plugins/datasource/elasticsearch/query_def.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/elasticsearch/query_def.ts ***!
  \******************************************************************/
/*! exports provided: metricAggTypes, bucketAggTypes, orderByOptions, orderOptions, sizeOptions, extendedStats, intervalOptions, movingAvgModelOptions, pipelineOptions, movingAvgModelSettings, getMetricAggTypes, getPipelineOptions, isPipelineAgg, isPipelineAggWithMultipleBucketPaths, getPipelineAggOptions, getMovingAvgSettings, getOrderByOptions, describeOrder, describeMetric, describeOrderBy, defaultMetricAgg, defaultBucketAgg, findMetricById, hasMetricOfType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metricAggTypes", function() { return metricAggTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bucketAggTypes", function() { return bucketAggTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderByOptions", function() { return orderByOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderOptions", function() { return orderOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeOptions", function() { return sizeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendedStats", function() { return extendedStats; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intervalOptions", function() { return intervalOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "movingAvgModelOptions", function() { return movingAvgModelOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipelineOptions", function() { return pipelineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "movingAvgModelSettings", function() { return movingAvgModelSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMetricAggTypes", function() { return getMetricAggTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPipelineOptions", function() { return getPipelineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPipelineAgg", function() { return isPipelineAgg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPipelineAggWithMultipleBucketPaths", function() { return isPipelineAggWithMultipleBucketPaths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPipelineAggOptions", function() { return getPipelineAggOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMovingAvgSettings", function() { return getMovingAvgSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrderByOptions", function() { return getOrderByOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "describeOrder", function() { return describeOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "describeMetric", function() { return describeMetric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "describeOrderBy", function() { return describeOrderBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMetricAgg", function() { return defaultMetricAgg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultBucketAgg", function() { return defaultBucketAgg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findMetricById", function() { return findMetricById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMetricOfType", function() { return hasMetricOfType; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var metricAggTypes = [
    { text: 'Count', value: 'count', requiresField: false },
    {
        text: 'Average',
        value: 'avg',
        requiresField: true,
        supportsInlineScript: true,
        supportsMissing: true,
    },
    {
        text: 'Sum',
        value: 'sum',
        requiresField: true,
        supportsInlineScript: true,
        supportsMissing: true,
    },
    {
        text: 'Max',
        value: 'max',
        requiresField: true,
        supportsInlineScript: true,
        supportsMissing: true,
    },
    {
        text: 'Min',
        value: 'min',
        requiresField: true,
        supportsInlineScript: true,
        supportsMissing: true,
    },
    {
        text: 'Extended Stats',
        value: 'extended_stats',
        requiresField: true,
        supportsMissing: true,
        supportsInlineScript: true,
    },
    {
        text: 'Percentiles',
        value: 'percentiles',
        requiresField: true,
        supportsMissing: true,
        supportsInlineScript: true,
    },
    {
        text: 'Unique Count',
        value: 'cardinality',
        requiresField: true,
        supportsMissing: true,
    },
    {
        text: 'Moving Average',
        value: 'moving_avg',
        requiresField: false,
        isPipelineAgg: true,
        minVersion: 2,
    },
    {
        text: 'Derivative',
        value: 'derivative',
        requiresField: false,
        isPipelineAgg: true,
        minVersion: 2,
    },
    {
        text: 'Bucket Script',
        value: 'bucket_script',
        requiresField: false,
        isPipelineAgg: true,
        supportsMultipleBucketPaths: true,
        minVersion: 2,
    },
    { text: 'Raw Document', value: 'raw_document', requiresField: false },
    { text: 'Logs', value: 'logs', requiresField: false },
];
var bucketAggTypes = [
    { text: 'Terms', value: 'terms', requiresField: true },
    { text: 'Filters', value: 'filters' },
    { text: 'Geo Hash Grid', value: 'geohash_grid', requiresField: true },
    { text: 'Date Histogram', value: 'date_histogram', requiresField: true },
    { text: 'Histogram', value: 'histogram', requiresField: true },
];
var orderByOptions = [
    { text: 'Doc Count', value: '_count' },
    { text: 'Term value', value: '_term' },
];
var orderOptions = [
    { text: 'Top', value: 'desc' },
    { text: 'Bottom', value: 'asc' },
];
var sizeOptions = [
    { text: 'No limit', value: '0' },
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
    { text: '5', value: '5' },
    { text: '10', value: '10' },
    { text: '15', value: '15' },
    { text: '20', value: '20' },
];
var extendedStats = [
    { text: 'Avg', value: 'avg' },
    { text: 'Min', value: 'min' },
    { text: 'Max', value: 'max' },
    { text: 'Sum', value: 'sum' },
    { text: 'Count', value: 'count' },
    { text: 'Std Dev', value: 'std_deviation' },
    { text: 'Std Dev Upper', value: 'std_deviation_bounds_upper' },
    { text: 'Std Dev Lower', value: 'std_deviation_bounds_lower' },
];
var intervalOptions = [
    { text: 'auto', value: 'auto' },
    { text: '10s', value: '10s' },
    { text: '1m', value: '1m' },
    { text: '5m', value: '5m' },
    { text: '10m', value: '10m' },
    { text: '20m', value: '20m' },
    { text: '1h', value: '1h' },
    { text: '1d', value: '1d' },
];
var movingAvgModelOptions = [
    { text: 'Simple', value: 'simple' },
    { text: 'Linear', value: 'linear' },
    { text: 'Exponentially Weighted', value: 'ewma' },
    { text: 'Holt Linear', value: 'holt' },
    { text: 'Holt Winters', value: 'holt_winters' },
];
var pipelineOptions = {
    moving_avg: [
        { text: 'window', default: 5 },
        { text: 'model', default: 'simple' },
        { text: 'predict', default: undefined },
        { text: 'minimize', default: false },
    ],
    derivative: [{ text: 'unit', default: undefined }],
    bucket_script: [],
};
var movingAvgModelSettings = {
    simple: [],
    linear: [],
    ewma: [{ text: 'Alpha', value: 'alpha', default: undefined }],
    holt: [
        { text: 'Alpha', value: 'alpha', default: undefined },
        { text: 'Beta', value: 'beta', default: undefined },
    ],
    holt_winters: [
        { text: 'Alpha', value: 'alpha', default: undefined },
        { text: 'Beta', value: 'beta', default: undefined },
        { text: 'Gamma', value: 'gamma', default: undefined },
        { text: 'Period', value: 'period', default: undefined },
        { text: 'Pad', value: 'pad', default: undefined, isCheckbox: true },
    ],
};
function getMetricAggTypes(esVersion) {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(metricAggTypes, function (f) {
        if (f.minVersion) {
            return f.minVersion <= esVersion;
        }
        else {
            return true;
        }
    });
}
function getPipelineOptions(metric) {
    if (!isPipelineAgg(metric.type)) {
        return [];
    }
    return pipelineOptions[metric.type];
}
function isPipelineAgg(metricType) {
    if (metricType) {
        var po = pipelineOptions[metricType];
        return po !== null && po !== undefined;
    }
    return false;
}
function isPipelineAggWithMultipleBucketPaths(metricType) {
    if (metricType) {
        return metricAggTypes.find(function (t) { return t.value === metricType && t.supportsMultipleBucketPaths; }) !== undefined;
    }
    return false;
}
function getPipelineAggOptions(targets) {
    var result = [];
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(targets.metrics, function (metric) {
        if (!isPipelineAgg(metric.type)) {
            result.push({ text: describeMetric(metric), value: metric.id });
        }
    });
    return result;
}
function getMovingAvgSettings(model, filtered) {
    var filteredResult = [];
    if (filtered) {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(movingAvgModelSettings[model], function (setting) {
            if (!setting.isCheckbox) {
                filteredResult.push(setting);
            }
        });
        return filteredResult;
    }
    return movingAvgModelSettings[model];
}
function getOrderByOptions(target) {
    var metricRefs = [];
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(target.metrics, function (metric) {
        if (metric.type !== 'count') {
            metricRefs.push({ text: describeMetric(metric), value: metric.id });
        }
    });
    return orderByOptions.concat(metricRefs);
}
function describeOrder(order) {
    var def = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(orderOptions, { value: order });
    return def.text;
}
function describeMetric(metric) {
    var def = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(metricAggTypes, { value: metric.type });
    if (!def.requiresField && !isPipelineAgg(metric.type)) {
        return def.text;
    }
    return def.text + ' ' + metric.field;
}
function describeOrderBy(orderBy, target) {
    var def = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(orderByOptions, { value: orderBy });
    if (def) {
        return def.text;
    }
    var metric = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(target.metrics, { id: orderBy });
    if (metric) {
        return describeMetric(metric);
    }
    else {
        return 'metric not found';
    }
}
function defaultMetricAgg() {
    return { type: 'count', id: '1' };
}
function defaultBucketAgg() {
    return { type: 'date_histogram', id: '2', settings: { interval: 'auto' } };
}
var findMetricById = function (metrics, id) {
    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(metrics, { id: id });
};
function hasMetricOfType(target, type) {
    return target && target.metrics && target.metrics.some(function (m) { return m.type === type; });
}


/***/ })

}]);
//# sourceMappingURL=elasticsearchPlugin.6310f9af5345c722b930.js.map