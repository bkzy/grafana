(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cloudwatchPlugin"],{

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

/***/ "./public/app/plugins/datasource/cloudwatch/annotations_query_ctrl.ts":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/annotations_query_ctrl.ts ***!
  \****************************************************************************/
/*! exports provided: CloudWatchAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchAnnotationsQueryCtrl", function() { return CloudWatchAnnotationsQueryCtrl; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var CloudWatchAnnotationsQueryCtrl = /** @class */ (function () {
    /** @ngInject */
    function CloudWatchAnnotationsQueryCtrl() {
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.defaultsDeep(this.annotation, {
            namespace: '',
            metricName: '',
            expression: '',
            dimensions: {},
            region: 'default',
            id: '',
            alias: '',
            statistics: ['Average'],
            matchExact: true,
            prefixMatching: false,
            actionPrefix: '',
            alarmNamePrefix: '',
        });
        this.onChange = this.onChange.bind(this);
    }
    CloudWatchAnnotationsQueryCtrl.prototype.onChange = function (query) {
        Object.assign(this.annotation, query);
    };
    CloudWatchAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return CloudWatchAnnotationsQueryCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/components/ConfigEditor.tsx":
/*!******************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/components/ConfigEditor.tsx ***!
  \******************************************************************************/
/*! exports provided: ConfigEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/CancelablePromise */ "./public/app/core/utils/CancelablePromise.ts");






var authProviderOptions = [
    { label: 'Access & secret key', value: 'keys' },
    { label: 'Credentials file', value: 'credentials' },
    { label: 'ARN', value: 'arn' },
];
var ConfigEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ConfigEditor, _super);
    function ConfigEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.loadRegionsPromise = null;
        _this.state = {
            regions: [],
        };
        return _this;
    }
    ConfigEditor.prototype.componentDidMount = function () {
        this.loadRegionsPromise = Object(app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_5__["makePromiseCancelable"])(this.loadRegions());
        this.loadRegionsPromise.promise.catch(function (_a) {
            var isCanceled = _a.isCanceled;
            if (isCanceled) {
                console.warn('Cloud Watch ConfigEditor has unmounted, intialization was canceled');
            }
        });
    };
    ConfigEditor.prototype.componentWillUnmount = function () {
        if (this.loadRegionsPromise) {
            this.loadRegionsPromise.cancel();
        }
    };
    ConfigEditor.prototype.loadRegions = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__["getDatasourceSrv"])()
                            .loadDatasource(this.props.options.name)
                            .then(function (ds) {
                            return ds.getRegions();
                        })
                            .then(function (regions) {
                            _this.setState({
                                regions: regions.map(function (region) {
                                    return {
                                        value: region.value,
                                        label: region.text,
                                    };
                                }),
                            });
                        }, function (err) {
                            var regions = [
                                'ap-east-1',
                                'ap-northeast-1',
                                'ap-northeast-2',
                                'ap-northeast-3',
                                'ap-south-1',
                                'ap-southeast-1',
                                'ap-southeast-2',
                                'ca-central-1',
                                'cn-north-1',
                                'cn-northwest-1',
                                'eu-central-1',
                                'eu-north-1',
                                'eu-west-1',
                                'eu-west-2',
                                'eu-west-3',
                                'me-south-1',
                                'sa-east-1',
                                'us-east-1',
                                'us-east-2',
                                'us-gov-east-1',
                                'us-gov-west-1',
                                'us-iso-east-1',
                                'us-isob-east-1',
                                'us-west-1',
                                'us-west-2',
                            ];
                            _this.setState({
                                regions: regions.map(function (region) {
                                    return {
                                        value: region,
                                        label: region,
                                    };
                                }),
                            });
                            // expected to fail when creating new datasource
                            // console.error('failed to get latest regions', err);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ConfigEditor.prototype.render = function () {
        var regions = this.state.regions;
        var options = this.props.options;
        var secureJsonData = (options.secureJsonData || {});
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "CloudWatch Details"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14" }, "Auth Provider"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { className: "width-30", value: authProviderOptions.find(function (authProvider) { return authProvider.value === options.jsonData.authType; }), options: authProviderOptions, defaultValue: options.jsonData.authType, onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceJsonDataOptionSelect"])(this.props, 'authType') }))),
                options.jsonData.authType === 'credentials' && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14", tooltip: "Credentials profile name, as specified in ~/.aws/credentials, leave blank for default." }, "Credentials Profile Name"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-30" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", placeholder: "default", value: options.jsonData.database, onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceOption"])(this.props, 'database') }))))),
                options.jsonData.authType === 'keys' && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                    options.secureJsonFields.accessKey ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14" }, "Access Key ID"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-25", placeholder: "Configured", disabled: true })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "max-width-30 gf-form-inline" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: "secondary", type: "button", onClick: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceResetOption"])(this.props, 'accessKey') }, "Reset"))))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14" }, "Access Key ID"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-30" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", value: secureJsonData.accessKey || '', onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceSecureJsonDataOption"])(this.props, 'accessKey') }))))),
                    options.secureJsonFields.secretKey ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14" }, "Secret Access Key"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-25", placeholder: "Configured", disabled: true })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "max-width-30 gf-form-inline" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], { variant: "secondary", type: "button", onClick: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceResetOption"])(this.props, 'secretKey') }, "Reset"))))) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14" }, "Secret Access Key"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-30" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", value: secureJsonData.secretKey || '', onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceSecureJsonDataOption"])(this.props, 'secretKey') }))))))),
                options.jsonData.authType === 'arn' && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14", tooltip: "ARN of Assume Role" }, "Assume Role ARN"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-30" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", placeholder: "arn:aws:iam:*", value: options.jsonData.assumeRoleArn || '', onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceJsonDataOption"])(this.props, 'assumeRoleArn') }))))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14", tooltip: "Specify the region, such as for US West (Oregon) use ` us-west-2 ` as the region." }, "Default Region"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { className: "width-30", value: regions.find(function (region) { return region.value === options.jsonData.defaultRegion; }), options: regions, defaultValue: options.jsonData.defaultRegion, onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceJsonDataOptionSelect"])(this.props, 'defaultRegion') }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { className: "width-14", tooltip: "Namespaces of Custom Metrics." }, "Custom Metrics"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "width-30", placeholder: "Namespace1,Namespace2", value: options.jsonData.customMetricsNamespaces || '', onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["onUpdateDatasourceJsonDataOption"])(this.props, 'customMetricsNamespaces') }))))));
    };
    return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (ConfigEditor);


/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/components/QueryEditor.tsx":
/*!*****************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/components/QueryEditor.tsx ***!
  \*****************************************************************************/
/*! exports provided: QueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryEditor", function() { return QueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ */ "./public/app/plugins/datasource/cloudwatch/components/index.ts");
var _a;




var idValidationEvents = (_a = {},
    _a[_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["EventsWithValidation"].onBlur] = [
        {
            rule: function (value) { return new RegExp(/^$|^[a-z][a-zA-Z0-9_]*$/).test(value); },
            errorMessage: 'Invalid format. Only alphanumeric characters and underscores are allowed',
        },
    ],
    _a);
var QueryEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryEditor, _super);
    function QueryEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { showMeta: false };
        return _this;
    }
    QueryEditor.getDerivedStateFromProps = function (props, state) {
        var query = props.query;
        if (!query.namespace) {
            query.namespace = '';
        }
        if (!query.metricName) {
            query.metricName = '';
        }
        if (!query.expression) {
            query.expression = '';
        }
        if (!query.dimensions) {
            query.dimensions = {};
        }
        if (!query.region) {
            query.region = 'default';
        }
        if (!query.id) {
            query.id = '';
        }
        if (!query.alias) {
            query.alias = '';
        }
        if (!query.statistics || !query.statistics.length) {
            query.statistics = ['Average'];
        }
        if (!query.hasOwnProperty('matchExact')) {
            query.matchExact = true;
        }
        return state;
    };
    QueryEditor.prototype.onChange = function (query) {
        var _a = this.props, onChange = _a.onChange, onRunQuery = _a.onRunQuery;
        onChange(query);
        onRunQuery();
    };
    QueryEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, query = _a.query, onRunQuery = _a.onRunQuery;
        var showMeta = this.state.showMeta;
        var metaDataExist = data && Object.values(data).length && data.state === 'Done';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_3__["QueryFieldsEditor"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.props)),
            query.statistics.length <= 1 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_3__["QueryField"], { label: "Id", tooltip: "Id can include numbers, letters, and underscore, and must start with a lowercase letter." },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "gf-form-input width-8", onBlur: onRunQuery, onChange: function (event) {
                                return _this.onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { id: event.target.value }));
                            }, validationEvents: idValidationEvents, value: query.id || '' }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_3__["QueryField"], { className: "gf-form--grow", label: "Expression", tooltip: "Optionally you can add an expression here. Please note that if a math expression that is referencing other queries is being used, it will not be possible to create an alert rule based on this query" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "gf-form-input", onBlur: onRunQuery, value: query.expression || '', onChange: function (event) {
                                return _this.onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { expression: event.target.value }));
                            } }))))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_3__["QueryField"], { label: "Period", tooltip: "Minimum interval between points in seconds" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Input"], { className: "gf-form-input width-8", value: query.period || '', placeholder: "auto", onBlur: onRunQuery, onChange: function (event) {
                                return _this.onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { period: event.target.value }));
                            } }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_3__["QueryField"], { label: "Alias", tooltip: "Alias replacement variables: {{metric}}, {{stat}}, {{namespace}}, {{region}}, {{period}}, {{label}}, {{YOUR_DIMENSION_NAME}}" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_3__["Alias"], { value: query.alias, onChange: function (value) { return _this.onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { alias: value })); } })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Switch"], { label: "Match Exact", labelClass: "query-keyword", tooltip: "Only show metrics that exactly match all defined dimension names.", checked: query.matchExact, onChange: function () { return _this.onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { matchExact: !query.matchExact })); } }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "gf-form-label" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { onClick: function () {
                                return metaDataExist &&
                                    _this.setState({
                                        showMeta: !showMeta,
                                    });
                            } },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-caret-" + (showMeta ? 'down' : 'right') }),
                            " ",
                            showMeta ? 'Hide' : 'Show',
                            " Query Preview"))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-label gf-form-label--grow" })),
                showMeta && metaDataExist && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: "filter-table form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Metric Data Query ID"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Metric Data Query Expression"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Period"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, data.series[0].meta.gmdMeta.map(function (_a) {
                        var ID = _a.ID, Expression = _a.Expression, Period = _a.Period;
                        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: ID },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, ID),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, Expression),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, Period)));
                    })))))));
    };
    return QueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/components/ThrottlingErrorMessage.tsx":
/*!****************************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/components/ThrottlingErrorMessage.tsx ***!
  \****************************************************************************************/
/*! exports provided: ThrottlingErrorMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThrottlingErrorMessage", function() { return ThrottlingErrorMessage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ThrottlingErrorMessage = function (_a) {
    var region = _a.region;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null,
        "Please visit the\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { target: "_blank", className: "text-link", href: "https://" + region + ".console.aws.amazon.com/servicequotas/home?region=" + region + "#!/services/monitoring/quotas/L-5E141212" }, "AWS Service Quotas console"),
        "\u00A0to request a quota increase or see our\u00A0",
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { target: "_blank", className: "text-link", href: "https://grafana.com/docs/features/datasources/cloudwatch/#service-quotas" }, "documentation"),
        "\u00A0to learn more."));
};


/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/datasource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/datasource.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/copy/appNotification */ "./public/app/core/copy/appNotification.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var app_store_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/store/store */ "./public/app/store/store.ts");
/* harmony import */ var app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/utils/kbn */ "./public/app/core/utils/kbn.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _components_ThrottlingErrorMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/ThrottlingErrorMessage */ "./public/app/plugins/datasource/cloudwatch/components/ThrottlingErrorMessage.tsx");
/* harmony import */ var _memoizedDebounce__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./memoizedDebounce */ "./public/app/plugins/datasource/cloudwatch/memoizedDebounce.ts");












var displayAlert = function (datasourceName, region) {
    return app_store_store__WEBPACK_IMPORTED_MODULE_7__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_4__["notifyApp"])(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_5__["createErrorNotification"])("CloudWatch request limit reached in " + region + " for data source " + datasourceName, '', react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_ThrottlingErrorMessage__WEBPACK_IMPORTED_MODULE_10__["ThrottlingErrorMessage"], { region: region }, null))));
};
var displayCustomError = function (title, message) {
    return app_store_store__WEBPACK_IMPORTED_MODULE_7__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_4__["notifyApp"])(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_5__["createErrorNotification"])(title, message)));
};
var CloudWatchDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(CloudWatchDatasource, _super);
    /** @ngInject */
    function CloudWatchDatasource(instanceSettings, backendSrv, templateSrv, timeSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.timeSrv = timeSrv;
        _this.type = 'cloudwatch';
        _this.proxyUrl = instanceSettings.url;
        _this.defaultRegion = instanceSettings.jsonData.defaultRegion;
        _this.datasourceName = instanceSettings.name;
        _this.standardStatistics = ['Average', 'Maximum', 'Minimum', 'Sum', 'SampleCount'];
        _this.debouncedAlert = Object(_memoizedDebounce__WEBPACK_IMPORTED_MODULE_11__["default"])(displayAlert, app_types__WEBPACK_IMPORTED_MODULE_6__["AppNotificationTimeout"].Error);
        _this.debouncedCustomAlert = Object(_memoizedDebounce__WEBPACK_IMPORTED_MODULE_11__["default"])(displayCustomError, app_types__WEBPACK_IMPORTED_MODULE_6__["AppNotificationTimeout"].Error);
        return _this;
    }
    CloudWatchDatasource.prototype.query = function (options) {
        var _this = this;
        options = angular__WEBPACK_IMPORTED_MODULE_2___default.a.copy(options);
        var queries = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.filter(options.targets, function (item) {
            return ((item.id !== '' || item.hide !== true) &&
                ((!!item.region && !!item.namespace && !!item.metricName && !lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isEmpty(item.statistics)) ||
                    item.expression.length > 0));
        }).map(function (item) {
            item.region = _this.replace(_this.getActualRegion(item.region), options.scopedVars, true, 'region');
            item.namespace = _this.replace(item.namespace, options.scopedVars, true, 'namespace');
            item.metricName = _this.replace(item.metricName, options.scopedVars, true, 'metric name');
            item.dimensions = _this.convertDimensionFormat(item.dimensions, options.scopedVars);
            item.statistics = item.statistics.map(function (stat) { return _this.replace(stat, options.scopedVars, true, 'statistics'); });
            item.period = String(_this.getPeriod(item, options)); // use string format for period in graph query, and alerting
            item.id = _this.templateSrv.replace(item.id, options.scopedVars);
            item.expression = _this.templateSrv.replace(item.expression, options.scopedVars);
            // valid ExtendedStatistics is like p90.00, check the pattern
            var hasInvalidStatistics = item.statistics.some(function (s) {
                if (s.indexOf('p') === 0) {
                    var matches = /^p\d{2}(?:\.\d{1,2})?$/.exec(s);
                    return !matches || matches[0] !== s;
                }
                return false;
            });
            if (hasInvalidStatistics) {
                throw { message: 'Invalid extended statistics' };
            }
            return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend({
                refId: item.refId,
                intervalMs: options.intervalMs,
                maxDataPoints: options.maxDataPoints,
                datasourceId: _this.id,
                type: 'timeSeriesQuery',
            }, item);
        });
        // No valid targets, return the empty result to save a round trip.
        if (lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isEmpty(queries)) {
            return Promise.resolve({ data: [] });
        }
        var request = {
            from: options.range.from.valueOf().toString(),
            to: options.range.to.valueOf().toString(),
            queries: queries,
        };
        return this.performTimeSeriesQuery(request, options.range);
    };
    Object.defineProperty(CloudWatchDatasource.prototype, "variables", {
        get: function () {
            return this.templateSrv.variables.map(function (v) { return "$" + v.name; });
        },
        enumerable: true,
        configurable: true
    });
    CloudWatchDatasource.prototype.getPeriod = function (target, options) {
        var period = this.templateSrv.replace(target.period, options.scopedVars);
        if (period && period.toLowerCase() !== 'auto') {
            if (/^\d+$/.test(period)) {
                period = parseInt(period, 10);
            }
            else {
                period = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_8__["default"].interval_to_seconds(period);
            }
            if (period < 1) {
                period = 1;
            }
        }
        return period || '';
    };
    CloudWatchDatasource.prototype.buildCloudwatchConsoleUrl = function (_a, start, end, title, gmdMeta) {
        var region = _a.region, namespace = _a.namespace, metricName = _a.metricName, dimensions = _a.dimensions, statistics = _a.statistics, expression = _a.expression;
        region = this.getActualRegion(region);
        var conf = {
            view: 'timeSeries',
            stacked: false,
            title: title,
            start: start,
            end: end,
            region: region,
        };
        var isSearchExpression = gmdMeta && gmdMeta.length && gmdMeta.every(function (_a) {
            var expression = _a.Expression;
            return /SEARCH().*/.test(expression);
        });
        var isMathExpression = !isSearchExpression && expression;
        if (isMathExpression) {
            return '';
        }
        if (isSearchExpression) {
            var metrics = gmdMeta && gmdMeta.length ? gmdMeta.map(function (_a) {
                var expression = _a.Expression;
                return ({ expression: expression });
            }) : [{ expression: expression }];
            conf = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, conf), { metrics: metrics });
        }
        else {
            conf = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, conf), { metrics: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(statistics.map(function (stat) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([
                    namespace,
                    metricName
                ], Object.entries(dimensions).reduce(function (acc, _a) {
                    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _b[0], value = _b[1];
                    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(acc, [key, value[0]]);
                }, []), [
                    {
                        stat: stat,
                        period: gmdMeta.length ? gmdMeta[0].Period : 60,
                    },
                ]); })) });
        }
        return "https://" + region + ".console.aws.amazon.com/cloudwatch/deeplink.js?region=" + region + "#metricsV2:graph=" + encodeURIComponent(JSON.stringify(conf));
    };
    CloudWatchDatasource.prototype.performTimeSeriesQuery = function (request, _a) {
        var _this = this;
        var from = _a.from, to = _a.to;
        return this.awsRequest('/api/tsdb/query', request)
            .then(function (res) {
            if (!res.results) {
                return { data: [] };
            }
            return Object.values(request.queries).reduce(function (_a, queryRequest) {
                var data = _a.data, error = _a.error;
                var queryResult = res.results[queryRequest.refId];
                if (!queryResult) {
                    return { data: data, error: error };
                }
                var link = _this.buildCloudwatchConsoleUrl(queryRequest, from.toISOString(), to.toISOString(), queryRequest.refId, queryResult.meta.gmdMeta);
                return {
                    error: error || queryResult.error ? { message: queryResult.error } : null,
                    data: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(data, queryResult.series.map(function (_a) {
                        var e_1, _b;
                        var name = _a.name, points = _a.points;
                        var dataFrame = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_9__["toDataFrame"])({
                            target: name,
                            datapoints: points,
                            refId: queryRequest.refId,
                            meta: queryResult.meta,
                        });
                        if (link) {
                            try {
                                for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(dataFrame.fields), _d = _c.next(); !_d.done; _d = _c.next()) {
                                    var field = _d.value;
                                    field.config.links = [
                                        {
                                            url: link,
                                            title: 'View in CloudWatch console',
                                            targetBlank: true,
                                        },
                                    ];
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        return dataFrame;
                    })),
                };
            }, { data: [], error: null });
        })
            .catch(function (err) {
            if (err === void 0) { err = { data: { error: '' } }; }
            if (/^Throttling:.*/.test(err.data.message)) {
                var failedRedIds_1 = Object.keys(err.data.results);
                var regionsAffected = Object.values(request.queries).reduce(function (res, _a) {
                    var refId = _a.refId, region = _a.region;
                    return !failedRedIds_1.includes(refId) || res.includes(region) ? res : Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(res, [region]);
                }, []);
                regionsAffected.forEach(function (region) { return _this.debouncedAlert(_this.datasourceName, _this.getActualRegion(region)); });
            }
            if (err.data && err.data.message === 'Metric request error' && err.data.error) {
                err.data.message = err.data.error;
            }
            throw err;
        });
    };
    CloudWatchDatasource.prototype.transformSuggestDataFromTable = function (suggestData) {
        return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(suggestData.results['metricFindQuery'].tables[0].rows, function (v) {
            return {
                text: v[0],
                value: v[1],
                label: v[1],
            };
        });
    };
    CloudWatchDatasource.prototype.doMetricQueryRequest = function (subtype, parameters) {
        var _this = this;
        var range = this.timeSrv.timeRange();
        return this.awsRequest('/api/tsdb/query', {
            from: range.from.valueOf().toString(),
            to: range.to.valueOf().toString(),
            queries: [
                lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend({
                    refId: 'metricFindQuery',
                    intervalMs: 1,
                    maxDataPoints: 1,
                    datasourceId: this.id,
                    type: 'metricFindQuery',
                    subtype: subtype,
                }, parameters),
            ],
        }).then(function (r) {
            return _this.transformSuggestDataFromTable(r);
        });
    };
    CloudWatchDatasource.prototype.getRegions = function () {
        return this.doMetricQueryRequest('regions', null).then(function (regions) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])([
            { label: 'default', value: 'default', text: 'default' }
        ], regions); });
    };
    CloudWatchDatasource.prototype.getNamespaces = function () {
        return this.doMetricQueryRequest('namespaces', null);
    };
    CloudWatchDatasource.prototype.getMetrics = function (namespace, region) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (!namespace) {
                    return [2 /*return*/, []];
                }
                return [2 /*return*/, this.doMetricQueryRequest('metrics', {
                        region: this.templateSrv.replace(this.getActualRegion(region)),
                        namespace: this.templateSrv.replace(namespace),
                    })];
            });
        });
    };
    CloudWatchDatasource.prototype.getDimensionKeys = function (namespace, region) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                if (!namespace) {
                    return [2 /*return*/, []];
                }
                return [2 /*return*/, this.doMetricQueryRequest('dimension_keys', {
                        region: this.templateSrv.replace(this.getActualRegion(region)),
                        namespace: this.templateSrv.replace(namespace),
                    })];
            });
        });
    };
    CloudWatchDatasource.prototype.getDimensionValues = function (region, namespace, metricName, dimensionKey, filterDimensions) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var values;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!namespace || !metricName) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.doMetricQueryRequest('dimension_values', {
                                region: this.templateSrv.replace(this.getActualRegion(region)),
                                namespace: this.templateSrv.replace(namespace),
                                metricName: this.templateSrv.replace(metricName.trim()),
                                dimensionKey: this.templateSrv.replace(dimensionKey),
                                dimensions: this.convertDimensionFormat(filterDimensions, {}),
                            })];
                    case 1:
                        values = _a.sent();
                        return [2 /*return*/, values];
                }
            });
        });
    };
    CloudWatchDatasource.prototype.getEbsVolumeIds = function (region, instanceId) {
        return this.doMetricQueryRequest('ebs_volume_ids', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            instanceId: this.templateSrv.replace(instanceId),
        });
    };
    CloudWatchDatasource.prototype.getEc2InstanceAttribute = function (region, attributeName, filters) {
        return this.doMetricQueryRequest('ec2_instance_attribute', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            attributeName: this.templateSrv.replace(attributeName),
            filters: filters,
        });
    };
    CloudWatchDatasource.prototype.getResourceARNs = function (region, resourceType, tags) {
        return this.doMetricQueryRequest('resource_arns', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            resourceType: this.templateSrv.replace(resourceType),
            tags: tags,
        });
    };
    CloudWatchDatasource.prototype.metricFindQuery = function (query) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var region, namespace, metricName, filterJson, regionQuery, namespaceQuery, metricNameQuery, dimensionKeysQuery, dimensionValuesQuery, dimensionKey, ebsVolumeIdsQuery, instanceId, ec2InstanceAttributeQuery, targetAttributeName, resourceARNsQuery, resourceType, tagsJSON, statsQuery;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                regionQuery = query.match(/^regions\(\)/);
                if (regionQuery) {
                    return [2 /*return*/, this.getRegions()];
                }
                namespaceQuery = query.match(/^namespaces\(\)/);
                if (namespaceQuery) {
                    return [2 /*return*/, this.getNamespaces()];
                }
                metricNameQuery = query.match(/^metrics\(([^\)]+?)(,\s?([^,]+?))?\)/);
                if (metricNameQuery) {
                    namespace = metricNameQuery[1];
                    region = metricNameQuery[3];
                    return [2 /*return*/, this.getMetrics(namespace, region)];
                }
                dimensionKeysQuery = query.match(/^dimension_keys\(([^\)]+?)(,\s?([^,]+?))?\)/);
                if (dimensionKeysQuery) {
                    namespace = dimensionKeysQuery[1];
                    region = dimensionKeysQuery[3];
                    return [2 /*return*/, this.getDimensionKeys(namespace, region)];
                }
                dimensionValuesQuery = query.match(/^dimension_values\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?)(,\s?(.+))?\)/);
                if (dimensionValuesQuery) {
                    region = dimensionValuesQuery[1];
                    namespace = dimensionValuesQuery[2];
                    metricName = dimensionValuesQuery[3];
                    dimensionKey = dimensionValuesQuery[4];
                    filterJson = {};
                    if (dimensionValuesQuery[6]) {
                        filterJson = JSON.parse(this.templateSrv.replace(dimensionValuesQuery[6]));
                    }
                    return [2 /*return*/, this.getDimensionValues(region, namespace, metricName, dimensionKey, filterJson)];
                }
                ebsVolumeIdsQuery = query.match(/^ebs_volume_ids\(([^,]+?),\s?([^,]+?)\)/);
                if (ebsVolumeIdsQuery) {
                    region = ebsVolumeIdsQuery[1];
                    instanceId = ebsVolumeIdsQuery[2];
                    return [2 /*return*/, this.getEbsVolumeIds(region, instanceId)];
                }
                ec2InstanceAttributeQuery = query.match(/^ec2_instance_attribute\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/);
                if (ec2InstanceAttributeQuery) {
                    region = ec2InstanceAttributeQuery[1];
                    targetAttributeName = ec2InstanceAttributeQuery[2];
                    filterJson = JSON.parse(this.templateSrv.replace(ec2InstanceAttributeQuery[3]));
                    return [2 /*return*/, this.getEc2InstanceAttribute(region, targetAttributeName, filterJson)];
                }
                resourceARNsQuery = query.match(/^resource_arns\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/);
                if (resourceARNsQuery) {
                    region = resourceARNsQuery[1];
                    resourceType = resourceARNsQuery[2];
                    tagsJSON = JSON.parse(this.templateSrv.replace(resourceARNsQuery[3]));
                    return [2 /*return*/, this.getResourceARNs(region, resourceType, tagsJSON)];
                }
                statsQuery = query.match(/^statistics\(\)/);
                if (statsQuery) {
                    return [2 /*return*/, this.standardStatistics.map(function (s) { return ({ value: s, label: s, text: s }); })];
                }
                return [2 /*return*/, Promise.resolve([])];
            });
        });
    };
    CloudWatchDatasource.prototype.annotationQuery = function (options) {
        var _this = this;
        var annotation = options.annotation;
        var statistics = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(annotation.statistics, function (s) {
            return _this.templateSrv.replace(s);
        });
        var defaultPeriod = annotation.prefixMatching ? '' : '300';
        var period = annotation.period || defaultPeriod;
        period = parseInt(period, 10);
        var parameters = {
            prefixMatching: annotation.prefixMatching,
            region: this.templateSrv.replace(this.getActualRegion(annotation.region)),
            namespace: this.templateSrv.replace(annotation.namespace),
            metricName: this.templateSrv.replace(annotation.metricName),
            dimensions: this.convertDimensionFormat(annotation.dimensions, {}),
            statistics: statistics,
            period: period,
            actionPrefix: annotation.actionPrefix || '',
            alarmNamePrefix: annotation.alarmNamePrefix || '',
        };
        return this.awsRequest('/api/tsdb/query', {
            from: options.range.from.valueOf().toString(),
            to: options.range.to.valueOf().toString(),
            queries: [
                lodash__WEBPACK_IMPORTED_MODULE_3___default.a.extend({
                    refId: 'annotationQuery',
                    intervalMs: 1,
                    maxDataPoints: 1,
                    datasourceId: this.id,
                    type: 'annotationQuery',
                }, parameters),
            ],
        }).then(function (r) {
            return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(r.results['annotationQuery'].tables[0].rows, function (v) {
                return {
                    annotation: annotation,
                    time: Date.parse(v[0]),
                    title: v[1],
                    tags: [v[2]],
                    text: v[3],
                };
            });
        });
    };
    CloudWatchDatasource.prototype.targetContainsTemplate = function (target) {
        var _this = this;
        return (this.templateSrv.variableExists(target.region) ||
            this.templateSrv.variableExists(target.namespace) ||
            this.templateSrv.variableExists(target.metricName) ||
            lodash__WEBPACK_IMPORTED_MODULE_3___default.a.find(target.dimensions, function (v, k) {
                return _this.templateSrv.variableExists(k) || _this.templateSrv.variableExists(v);
            }));
    };
    CloudWatchDatasource.prototype.testDatasource = function () {
        // use billing metrics for test
        var region = this.defaultRegion;
        var namespace = 'AWS/Billing';
        var metricName = 'EstimatedCharges';
        var dimensions = {};
        return this.getDimensionValues(region, namespace, metricName, 'ServiceName', dimensions).then(function () {
            return { status: 'success', message: 'Data source is working' };
        });
    };
    CloudWatchDatasource.prototype.awsRequest = function (url, data) {
        var options = {
            method: 'POST',
            url: url,
            data: data,
        };
        return this.backendSrv.datasourceRequest(options).then(function (result) {
            return result.data;
        });
    };
    CloudWatchDatasource.prototype.getDefaultRegion = function () {
        return this.defaultRegion;
    };
    CloudWatchDatasource.prototype.getActualRegion = function (region) {
        if (region === 'default' || lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isEmpty(region)) {
            return this.getDefaultRegion();
        }
        return region;
    };
    CloudWatchDatasource.prototype.convertToCloudWatchTime = function (date, roundUp) {
        if (lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isString(date)) {
            date = _grafana_data__WEBPACK_IMPORTED_MODULE_9__["dateMath"].parse(date, roundUp);
        }
        return Math.round(date.valueOf() / 1000);
    };
    CloudWatchDatasource.prototype.convertDimensionFormat = function (dimensions, scopedVars) {
        var _this = this;
        return Object.entries(dimensions).reduce(function (result, _a) {
            var _b, _c, _d, _e;
            var _f = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _f[0], value = _f[1];
            key = _this.replace(key, scopedVars, true, 'dimension keys');
            if (Array.isArray(value)) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), (_b = {}, _b[key] = value, _b));
            }
            var valueVar = _this.templateSrv.variables.find(function (_a) {
                var name = _a.name;
                return name === _this.templateSrv.getVariableName(value);
            });
            if (valueVar) {
                if (valueVar.multi) {
                    var values = _this.templateSrv.replace(value, scopedVars, 'pipe').split('|');
                    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), (_c = {}, _c[key] = values, _c));
                }
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), (_d = {}, _d[key] = [_this.templateSrv.replace(value, scopedVars)], _d));
            }
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, result), (_e = {}, _e[key] = [value], _e));
        }, {});
    };
    CloudWatchDatasource.prototype.replace = function (target, scopedVars, displayErrorIfIsMultiTemplateVariable, fieldName) {
        var _this = this;
        if (displayErrorIfIsMultiTemplateVariable) {
            var variable = this.templateSrv.variables.find(function (_a) {
                var name = _a.name;
                return name === _this.templateSrv.getVariableName(target);
            });
            if (variable && variable.multi) {
                this.debouncedCustomAlert('CloudWatch templating error', "Multi template variables are not supported for " + (fieldName || target));
            }
        }
        return this.templateSrv.replace(target, scopedVars);
    };
    return CloudWatchDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_9__["DataSourceApi"]));
/* harmony default export */ __webpack_exports__["default"] = (CloudWatchDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/memoizedDebounce.ts":
/*!**********************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/memoizedDebounce.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (func, wait) {
    if (wait === void 0) { wait = 7000; }
    var mem = Object(lodash__WEBPACK_IMPORTED_MODULE_1__["memoize"])(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Object(lodash__WEBPACK_IMPORTED_MODULE_1__["debounce"])(func, wait, {
            leading: true,
        });
    }, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return JSON.stringify(args);
    });
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return mem.apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(args)).apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(args));
    };
});


/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/module.tsx":
/*!*************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/module.tsx ***!
  \*************************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _query_parameter_ctrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query_parameter_ctrl */ "./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ConfigEditor */ "./public/app/plugins/datasource/cloudwatch/components/ConfigEditor.tsx");
/* harmony import */ var _components_QueryEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/QueryEditor */ "./public/app/plugins/datasource/cloudwatch/components/QueryEditor.tsx");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/cloudwatch/datasource.ts");
/* harmony import */ var _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./annotations_query_ctrl */ "./public/app/plugins/datasource/cloudwatch/annotations_query_ctrl.ts");






var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_4__["default"])
    .setConfigEditor(_components_ConfigEditor__WEBPACK_IMPORTED_MODULE_2__["ConfigEditor"])
    .setQueryEditor(_components_QueryEditor__WEBPACK_IMPORTED_MODULE_3__["QueryEditor"])
    .setExploreQueryField(_components_QueryEditor__WEBPACK_IMPORTED_MODULE_3__["QueryEditor"])
    .setAnnotationQueryCtrl(_annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_5__["CloudWatchAnnotationsQueryCtrl"]);


/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts ***!
  \**************************************************************************/
/*! exports provided: CloudWatchQueryParameterCtrl, cloudWatchQueryParameter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchQueryParameterCtrl", function() { return CloudWatchQueryParameterCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloudWatchQueryParameter", function() { return cloudWatchQueryParameter; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



var CloudWatchQueryParameterCtrl = /** @class */ (function () {
    /** @ngInject */
    function CloudWatchQueryParameterCtrl($scope, templateSrv, uiSegmentSrv, datasourceSrv) {
        $scope.init = function () {
            var target = $scope.target;
            target.namespace = target.namespace || '';
            target.metricName = target.metricName || '';
            target.statistics = target.statistics || ['Average'];
            target.dimensions = target.dimensions || {};
            target.period = target.period || '';
            target.region = target.region || 'default';
            target.id = target.id || '';
            target.expression = target.expression || '';
            $scope.regionSegment = uiSegmentSrv.getSegmentForValue($scope.target.region, 'select region');
            $scope.namespaceSegment = uiSegmentSrv.getSegmentForValue($scope.target.namespace, 'select namespace');
            $scope.metricSegment = uiSegmentSrv.getSegmentForValue($scope.target.metricName, 'select metric');
            $scope.dimSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.reduce($scope.target.dimensions, function (memo, value, key) {
                memo.push(uiSegmentSrv.newKey(key));
                memo.push(uiSegmentSrv.newOperator('='));
                memo.push(uiSegmentSrv.newKeyValue(value));
                return memo;
            }, []);
            $scope.statSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map($scope.target.statistics, function (stat) {
                return uiSegmentSrv.getSegmentForValue(stat);
            });
            $scope.ensurePlusButton($scope.statSegments);
            $scope.ensurePlusButton($scope.dimSegments);
            $scope.removeDimSegment = uiSegmentSrv.newSegment({
                fake: true,
                value: '-- remove dimension --',
            });
            $scope.removeStatSegment = uiSegmentSrv.newSegment({
                fake: true,
                value: '-- remove stat --',
            });
            if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty($scope.target.region)) {
                $scope.target.region = 'default';
            }
            if (!$scope.onChange) {
                $scope.onChange = function () { };
            }
        };
        $scope.getStatSegments = function () {
            return Promise.resolve(lodash__WEBPACK_IMPORTED_MODULE_2___default.a.flatten([
                angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy($scope.removeStatSegment),
                lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map($scope.datasource.standardStatistics, function (s) {
                    return uiSegmentSrv.getSegmentForValue(s);
                }),
                uiSegmentSrv.getSegmentForValue('pNN.NN'),
            ]));
        };
        $scope.statSegmentChanged = function (segment, index) {
            if (segment.value === $scope.removeStatSegment.value) {
                $scope.statSegments.splice(index, 1);
            }
            else {
                segment.type = 'value';
            }
            $scope.target.statistics = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.reduce($scope.statSegments, function (memo, seg) {
                if (!seg.fake) {
                    memo.push(seg.value);
                }
                return memo;
            }, []);
            $scope.ensurePlusButton($scope.statSegments);
            $scope.onChange();
        };
        $scope.ensurePlusButton = function (segments) {
            var count = segments.length;
            var lastSegment = segments[Math.max(count - 1, 0)];
            if (!lastSegment || lastSegment.type !== 'plus-button') {
                segments.push(uiSegmentSrv.newPlusButton());
            }
        };
        $scope.getDimSegments = function (segment, $index) {
            if (segment.type === 'operator') {
                return Promise.resolve([]);
            }
            var target = $scope.target;
            var query = Promise.resolve([]);
            if (segment.type === 'key' || segment.type === 'plus-button') {
                query = $scope.datasource.getDimensionKeys($scope.target.namespace, $scope.target.region);
            }
            else if (segment.type === 'value') {
                var dimensionKey = $scope.dimSegments[$index - 2].value;
                delete target.dimensions[dimensionKey];
                query = $scope.datasource.getDimensionValues(target.region, target.namespace, target.metricName, dimensionKey, target.dimensions);
            }
            return query.then($scope.transformToSegments(true)).then(function (results) {
                if (segment.type === 'key') {
                    results.splice(0, 0, angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy($scope.removeDimSegment));
                }
                return results;
            });
        };
        $scope.dimSegmentChanged = function (segment, index) {
            $scope.dimSegments[index] = segment;
            if (segment.value === $scope.removeDimSegment.value) {
                $scope.dimSegments.splice(index, 3);
            }
            else if (segment.type === 'plus-button') {
                $scope.dimSegments.push(uiSegmentSrv.newOperator('='));
                $scope.dimSegments.push(uiSegmentSrv.newFake('select dimension value', 'value', 'query-segment-value'));
                segment.type = 'key';
                segment.cssClass = 'query-segment-key';
            }
            $scope.syncDimSegmentsWithModel();
            $scope.ensurePlusButton($scope.dimSegments);
            $scope.onChange();
        };
        $scope.syncDimSegmentsWithModel = function () {
            var dims = {};
            var length = $scope.dimSegments.length;
            for (var i = 0; i < length - 2; i += 3) {
                var keySegment = $scope.dimSegments[i];
                var valueSegment = $scope.dimSegments[i + 2];
                if (!valueSegment.fake) {
                    dims[keySegment.value] = valueSegment.value;
                }
            }
            $scope.target.dimensions = dims;
        };
        $scope.getRegions = function () {
            return $scope.datasource
                .metricFindQuery('regions()')
                .then(function (results) {
                results.unshift({ text: 'default' });
                return results;
            })
                .then($scope.transformToSegments(true));
        };
        $scope.getNamespaces = function () {
            return $scope.datasource.metricFindQuery('namespaces()').then($scope.transformToSegments(true));
        };
        $scope.getMetrics = function () {
            return $scope.datasource
                .metricFindQuery('metrics(' + $scope.target.namespace + ',' + $scope.target.region + ')')
                .then($scope.transformToSegments(true));
        };
        $scope.regionChanged = function () {
            $scope.target.region = $scope.regionSegment.value;
            $scope.onChange();
        };
        $scope.namespaceChanged = function () {
            $scope.target.namespace = $scope.namespaceSegment.value;
            $scope.onChange();
        };
        $scope.metricChanged = function () {
            $scope.target.metricName = $scope.metricSegment.value;
            $scope.onChange();
        };
        $scope.transformToSegments = function (addTemplateVars) {
            return function (results) {
                var segments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(results, function (segment) {
                    return uiSegmentSrv.newSegment({
                        value: segment.text,
                        expandable: segment.expandable,
                    });
                });
                if (addTemplateVars) {
                    lodash__WEBPACK_IMPORTED_MODULE_2___default.a.each(templateSrv.variables, function (variable) {
                        segments.unshift(uiSegmentSrv.newSegment({
                            type: 'template',
                            value: '$' + variable.name,
                            expandable: true,
                        }));
                    });
                }
                return segments;
            };
        };
        $scope.init();
    }
    return CloudWatchQueryParameterCtrl;
}());

function cloudWatchQueryParameter() {
    return {
        templateUrl: 'public/app/plugins/datasource/cloudwatch/partials/query.parameter.html',
        controller: CloudWatchQueryParameterCtrl,
        restrict: 'E',
        scope: {
            target: '=',
            datasource: '=',
            onChange: '&',
        },
    };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_1__["default"].directive('cloudwatchQueryParameter', cloudWatchQueryParameter);


/***/ })

}]);
//# sourceMappingURL=cloudwatchPlugin.6310f9af5345c722b930.js.map