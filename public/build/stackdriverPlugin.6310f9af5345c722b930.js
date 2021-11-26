(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["stackdriverPlugin"],{

/***/ "./public/app/plugins/datasource/stackdriver/StackdriverMetricFindQuery.ts":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/stackdriver/StackdriverMetricFindQuery.ts ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isString */ "./node_modules/lodash/isString.js");
/* harmony import */ var lodash_isString__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isString__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./public/app/plugins/datasource/stackdriver/constants.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/stackdriver/types.ts");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./functions */ "./public/app/plugins/datasource/stackdriver/functions.ts");





var StackdriverMetricFindQuery = /** @class */ (function () {
    function StackdriverMetricFindQuery(datasource) {
        this.datasource = datasource;
    }
    StackdriverMetricFindQuery.prototype.execute = function (query) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                try {
                    switch (query.selectedQueryType) {
                        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Services:
                            return [2 /*return*/, this.handleServiceQuery()];
                        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].MetricTypes:
                            return [2 /*return*/, this.handleMetricTypesQuery(query)];
                        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].LabelKeys:
                            return [2 /*return*/, this.handleLabelKeysQuery(query)];
                        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].LabelValues:
                            return [2 /*return*/, this.handleLabelValuesQuery(query)];
                        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].ResourceTypes:
                            return [2 /*return*/, this.handleResourceTypeQuery(query)];
                        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Aligners:
                            return [2 /*return*/, this.handleAlignersQuery(query)];
                        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].AlignmentPeriods:
                            return [2 /*return*/, this.handleAlignmentPeriodQuery()];
                        case _types__WEBPACK_IMPORTED_MODULE_3__["MetricFindQueryTypes"].Aggregations:
                            return [2 /*return*/, this.handleAggregationQuery(query)];
                        default:
                            return [2 /*return*/, []];
                    }
                }
                catch (error) {
                    console.error("Could not run StackdriverMetricFindQuery " + query, error);
                    return [2 /*return*/, []];
                }
                return [2 /*return*/];
            });
        });
    };
    StackdriverMetricFindQuery.prototype.handleServiceQuery = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var metricDescriptors, services;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.datasource.getMetricTypes(this.datasource.projectName)];
                    case 1:
                        metricDescriptors = _a.sent();
                        services = Object(_functions__WEBPACK_IMPORTED_MODULE_4__["extractServicesFromMetricDescriptors"])(metricDescriptors);
                        return [2 /*return*/, services.map(function (s) { return ({
                                text: s.serviceShortName,
                                value: s.service,
                                expandable: true,
                            }); })];
                }
            });
        });
    };
    StackdriverMetricFindQuery.prototype.handleMetricTypesQuery = function (_a) {
        var selectedService = _a.selectedService;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var metricDescriptors;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!selectedService) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.datasource.getMetricTypes(this.datasource.projectName)];
                    case 1:
                        metricDescriptors = _b.sent();
                        return [2 /*return*/, Object(_functions__WEBPACK_IMPORTED_MODULE_4__["getMetricTypesByService"])(metricDescriptors, this.datasource.templateSrv.replace(selectedService)).map(function (s) { return ({
                                text: s.displayName,
                                value: s.type,
                                expandable: true,
                            }); })];
                }
            });
        });
    };
    StackdriverMetricFindQuery.prototype.handleLabelKeysQuery = function (_a) {
        var selectedMetricType = _a.selectedMetricType;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var labelKeys;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!selectedMetricType) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, Object(_functions__WEBPACK_IMPORTED_MODULE_4__["getLabelKeys"])(this.datasource, selectedMetricType)];
                    case 1:
                        labelKeys = _b.sent();
                        return [2 /*return*/, labelKeys.map(this.toFindQueryResult)];
                }
            });
        });
    };
    StackdriverMetricFindQuery.prototype.handleLabelValuesQuery = function (_a) {
        var selectedMetricType = _a.selectedMetricType, labelKey = _a.labelKey;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var refId, labels, interpolatedKey, values;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!selectedMetricType) {
                            return [2 /*return*/, []];
                        }
                        refId = 'handleLabelValuesQuery';
                        return [4 /*yield*/, this.datasource.getLabels(selectedMetricType, refId, [labelKey])];
                    case 1:
                        labels = _b.sent();
                        interpolatedKey = this.datasource.templateSrv.replace(labelKey);
                        values = labels.hasOwnProperty(interpolatedKey) ? labels[interpolatedKey] : [];
                        return [2 /*return*/, values.map(this.toFindQueryResult)];
                }
            });
        });
    };
    StackdriverMetricFindQuery.prototype.handleResourceTypeQuery = function (_a) {
        var selectedMetricType = _a.selectedMetricType;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var refId, labels;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!selectedMetricType) {
                            return [2 /*return*/, []];
                        }
                        refId = 'handleResourceTypeQueryQueryType';
                        return [4 /*yield*/, this.datasource.getLabels(selectedMetricType, refId)];
                    case 1:
                        labels = _b.sent();
                        return [2 /*return*/, labels['resource.type'].map(this.toFindQueryResult)];
                }
            });
        });
    };
    StackdriverMetricFindQuery.prototype.handleAlignersQuery = function (_a) {
        var selectedMetricType = _a.selectedMetricType;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var metricDescriptors, _b, valueType, metricKind;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!selectedMetricType) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.datasource.getMetricTypes(this.datasource.projectName)];
                    case 1:
                        metricDescriptors = _c.sent();
                        _b = metricDescriptors.find(function (m) { return m.type === _this.datasource.templateSrv.replace(selectedMetricType); }), valueType = _b.valueType, metricKind = _b.metricKind;
                        return [2 /*return*/, Object(_functions__WEBPACK_IMPORTED_MODULE_4__["getAlignmentOptionsByMetric"])(valueType, metricKind).map(this.toFindQueryResult)];
                }
            });
        });
    };
    StackdriverMetricFindQuery.prototype.handleAggregationQuery = function (_a) {
        var selectedMetricType = _a.selectedMetricType;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var metricDescriptors, _b, valueType, metricKind;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!selectedMetricType) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, this.datasource.getMetricTypes(this.datasource.projectName)];
                    case 1:
                        metricDescriptors = _c.sent();
                        _b = metricDescriptors.find(function (m) { return m.type === _this.datasource.templateSrv.replace(selectedMetricType); }), valueType = _b.valueType, metricKind = _b.metricKind;
                        return [2 /*return*/, Object(_functions__WEBPACK_IMPORTED_MODULE_4__["getAggregationOptionsByMetric"])(valueType, metricKind).map(this.toFindQueryResult)];
                }
            });
        });
    };
    StackdriverMetricFindQuery.prototype.handleAlignmentPeriodQuery = function () {
        return _constants__WEBPACK_IMPORTED_MODULE_2__["alignmentPeriods"].map(this.toFindQueryResult);
    };
    StackdriverMetricFindQuery.prototype.toFindQueryResult = function (x) {
        return lodash_isString__WEBPACK_IMPORTED_MODULE_1___default()(x) ? { text: x, expandable: true } : Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, x), { expandable: true });
    };
    return StackdriverMetricFindQuery;
}());
/* harmony default export */ __webpack_exports__["default"] = (StackdriverMetricFindQuery);


/***/ }),

/***/ "./public/app/plugins/datasource/stackdriver/annotations_query_ctrl.ts":
/*!*****************************************************************************!*\
  !*** ./public/app/plugins/datasource/stackdriver/annotations_query_ctrl.ts ***!
  \*****************************************************************************/
/*! exports provided: StackdriverAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackdriverAnnotationsQueryCtrl", function() { return StackdriverAnnotationsQueryCtrl; });
var StackdriverAnnotationsQueryCtrl = /** @class */ (function () {
    /** @ngInject */
    function StackdriverAnnotationsQueryCtrl() {
        this.annotation.target = this.annotation.target || {};
        this.onQueryChange = this.onQueryChange.bind(this);
    }
    StackdriverAnnotationsQueryCtrl.prototype.onQueryChange = function (target) {
        Object.assign(this.annotation.target, target);
    };
    StackdriverAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return StackdriverAnnotationsQueryCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/stackdriver/components/VariableQueryEditor.tsx":
/*!**************************************************************************************!*\
  !*** ./public/app/plugins/datasource/stackdriver/components/VariableQueryEditor.tsx ***!
  \**************************************************************************************/
/*! exports provided: StackdriverVariableQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackdriverVariableQueryEditor", function() { return StackdriverVariableQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./public/app/plugins/datasource/stackdriver/components/index.ts");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../functions */ "./public/app/plugins/datasource/stackdriver/functions.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/stackdriver/types.ts");





var StackdriverVariableQueryEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(StackdriverVariableQueryEditor, _super);
    function StackdriverVariableQueryEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.queryTypes = [
            { value: _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].Services, name: 'Services' },
            { value: _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].MetricTypes, name: 'Metric Types' },
            { value: _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].LabelKeys, name: 'Label Keys' },
            { value: _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].LabelValues, name: 'Label Values' },
            { value: _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].ResourceTypes, name: 'Resource Types' },
            { value: _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].Aggregations, name: 'Aggregations' },
            { value: _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].Aligners, name: 'Aligners' },
            { value: _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].AlignmentPeriods, name: 'Alignment Periods' },
        ];
        _this.defaults = {
            selectedQueryType: _this.queryTypes[0].value,
            metricDescriptors: [],
            selectedService: '',
            selectedMetricType: '',
            labels: [],
            labelKey: '',
            metricTypes: [],
            services: [],
        };
        _this.state = Object.assign(_this.defaults, _this.props.query);
        return _this;
    }
    StackdriverVariableQueryEditor.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var metricDescriptors, services, selectedService, _a, metricTypes, selectedMetricType, state, _b;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.props.datasource.getMetricTypes(this.props.datasource.projectName)];
                    case 1:
                        metricDescriptors = _c.sent();
                        services = Object(_functions__WEBPACK_IMPORTED_MODULE_3__["extractServicesFromMetricDescriptors"])(metricDescriptors).map(function (m) { return ({
                            value: m.service,
                            name: m.serviceShortName,
                        }); });
                        selectedService = '';
                        if (services.some(function (s) { return s.value === _this.props.templateSrv.replace(_this.state.selectedService); })) {
                            selectedService = this.state.selectedService;
                        }
                        else if (services && services.length > 0) {
                            selectedService = services[0].value;
                        }
                        _a = Object(_functions__WEBPACK_IMPORTED_MODULE_3__["getMetricTypes"])(metricDescriptors, this.state.selectedMetricType, this.props.templateSrv.replace(this.state.selectedMetricType), this.props.templateSrv.replace(selectedService)), metricTypes = _a.metricTypes, selectedMetricType = _a.selectedMetricType;
                        _b = [{ services: services,
                                selectedService: selectedService,
                                metricTypes: metricTypes,
                                selectedMetricType: selectedMetricType,
                                metricDescriptors: metricDescriptors }];
                        return [4 /*yield*/, this.getLabels(selectedMetricType)];
                    case 2:
                        state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"].apply(void 0, _b.concat([(_c.sent())]));
                        this.setState(state);
                        return [2 /*return*/];
                }
            });
        });
    };
    StackdriverVariableQueryEditor.prototype.onQueryTypeChange = function (event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var state, _a;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = [{ selectedQueryType: event.target.value }];
                        return [4 /*yield*/, this.getLabels(this.state.selectedMetricType, event.target.value)];
                    case 1:
                        state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"].apply(void 0, _a.concat([(_b.sent())]));
                        this.setState(state);
                        return [2 /*return*/];
                }
            });
        });
    };
    StackdriverVariableQueryEditor.prototype.onServiceChange = function (event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, metricTypes, selectedMetricType, state, _b;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = Object(_functions__WEBPACK_IMPORTED_MODULE_3__["getMetricTypes"])(this.state.metricDescriptors, this.state.selectedMetricType, this.props.templateSrv.replace(this.state.selectedMetricType), this.props.templateSrv.replace(event.target.value)), metricTypes = _a.metricTypes, selectedMetricType = _a.selectedMetricType;
                        _b = [{ selectedService: event.target.value, metricTypes: metricTypes,
                                selectedMetricType: selectedMetricType }];
                        return [4 /*yield*/, this.getLabels(selectedMetricType)];
                    case 1:
                        state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"].apply(void 0, _b.concat([(_c.sent())]));
                        this.setState(state);
                        return [2 /*return*/];
                }
            });
        });
    };
    StackdriverVariableQueryEditor.prototype.onMetricTypeChange = function (event) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var state, _a;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = [{ selectedMetricType: event.target.value }];
                        return [4 /*yield*/, this.getLabels(event.target.value)];
                    case 1:
                        state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"].apply(void 0, _a.concat([(_b.sent())]));
                        this.setState(state);
                        return [2 /*return*/];
                }
            });
        });
    };
    StackdriverVariableQueryEditor.prototype.onLabelKeyChange = function (event) {
        this.setState({ labelKey: event.target.value });
    };
    StackdriverVariableQueryEditor.prototype.componentDidUpdate = function () {
        var _this = this;
        var _a = this.state, metricDescriptors = _a.metricDescriptors, labels = _a.labels, metricTypes = _a.metricTypes, services = _a.services, queryModel = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["metricDescriptors", "labels", "metricTypes", "services"]);
        var query = this.queryTypes.find(function (q) { return q.value === _this.state.selectedQueryType; });
        this.props.onChange(queryModel, "Stackdriver - " + query.name);
    };
    StackdriverVariableQueryEditor.prototype.getLabels = function (selectedMetricType, selectedQueryType) {
        if (selectedQueryType === void 0) { selectedQueryType = this.state.selectedQueryType; }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var result, labels, labelKey;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = { labels: this.state.labels, labelKey: this.state.labelKey };
                        if (!(selectedMetricType && selectedQueryType === _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].LabelValues)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Object(_functions__WEBPACK_IMPORTED_MODULE_3__["getLabelKeys"])(this.props.datasource, selectedMetricType)];
                    case 1:
                        labels = _a.sent();
                        labelKey = labels.some(function (l) { return l === _this.props.templateSrv.replace(_this.state.labelKey); })
                            ? this.state.labelKey
                            : labels[0];
                        result = { labels: labels, labelKey: labelKey };
                        _a.label = 2;
                    case 2: return [2 /*return*/, result];
                }
            });
        });
    };
    StackdriverVariableQueryEditor.prototype.insertTemplateVariables = function (options) {
        var templateVariables = this.props.templateSrv.variables.map(function (v) { return ({
            name: "$" + v.name,
            value: "$" + v.name,
        }); });
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(templateVariables, options);
    };
    StackdriverVariableQueryEditor.prototype.renderQueryTypeSwitch = function (queryType) {
        var _this = this;
        switch (queryType) {
            case _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].MetricTypes:
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_2__["SimpleSelect"], { value: this.state.selectedService, options: this.insertTemplateVariables(this.state.services), onValueChange: function (e) { return _this.onServiceChange(e); }, label: "Service" }));
            case _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].LabelKeys:
            case _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].LabelValues:
            case _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].ResourceTypes:
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_2__["SimpleSelect"], { value: this.state.selectedService, options: this.insertTemplateVariables(this.state.services), onValueChange: function (e) { return _this.onServiceChange(e); }, label: "Service" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_2__["SimpleSelect"], { value: this.state.selectedMetricType, options: this.insertTemplateVariables(this.state.metricTypes), onValueChange: function (e) { return _this.onMetricTypeChange(e); }, label: "Metric Type" }),
                    queryType === _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].LabelValues && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_2__["SimpleSelect"], { value: this.state.labelKey, options: this.insertTemplateVariables(this.state.labels.map(function (l) { return ({ value: l, name: l }); })), onValueChange: function (e) { return _this.onLabelKeyChange(e); }, label: "Label Key" }))));
            case _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].Aligners:
            case _types__WEBPACK_IMPORTED_MODULE_4__["MetricFindQueryTypes"].Aggregations:
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_2__["SimpleSelect"], { value: this.state.selectedService, options: this.insertTemplateVariables(this.state.services), onValueChange: function (e) { return _this.onServiceChange(e); }, label: "Service" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_2__["SimpleSelect"], { value: this.state.selectedMetricType, options: this.insertTemplateVariables(this.state.metricTypes), onValueChange: function (e) { return _this.onMetricTypeChange(e); }, label: "Metric Type" })));
            default:
                return '';
        }
    };
    StackdriverVariableQueryEditor.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(___WEBPACK_IMPORTED_MODULE_2__["SimpleSelect"], { value: this.state.selectedQueryType, options: this.queryTypes, onValueChange: function (e) { return _this.onQueryTypeChange(e); }, label: "Query Type" }),
            this.renderQueryTypeSwitch(this.state.selectedQueryType)));
    };
    return StackdriverVariableQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/stackdriver/config_ctrl.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/stackdriver/config_ctrl.ts ***!
  \******************************************************************/
/*! exports provided: StackdriverConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackdriverConfigCtrl", function() { return StackdriverConfigCtrl; });
var StackdriverConfigCtrl = /** @class */ (function () {
    /** @ngInject */
    function StackdriverConfigCtrl(datasourceSrv) {
        this.validationErrors = [];
        this.defaultAuthenticationType = 'jwt';
        this.datasourceSrv = datasourceSrv;
        this.current.jsonData = this.current.jsonData || {};
        this.current.jsonData.authenticationType = this.current.jsonData.authenticationType
            ? this.current.jsonData.authenticationType
            : this.defaultAuthenticationType;
        this.current.secureJsonData = this.current.secureJsonData || {};
        this.current.secureJsonFields = this.current.secureJsonFields || {};
        this.authenticationTypes = [
            { key: this.defaultAuthenticationType, value: 'Google JWT File' },
            { key: 'gce', value: 'GCE Default Service Account' },
        ];
    }
    StackdriverConfigCtrl.prototype.save = function (jwt) {
        this.current.secureJsonData.privateKey = jwt.private_key;
        this.current.jsonData.tokenUri = jwt.token_uri;
        this.current.jsonData.clientEmail = jwt.client_email;
        this.current.jsonData.defaultProject = jwt.project_id;
    };
    StackdriverConfigCtrl.prototype.validateJwt = function (jwt) {
        this.resetValidationMessages();
        if (!jwt.private_key || jwt.private_key.length === 0) {
            this.validationErrors.push('Private key field missing in JWT file.');
        }
        if (!jwt.token_uri || jwt.token_uri.length === 0) {
            this.validationErrors.push('Token URI field missing in JWT file.');
        }
        if (!jwt.client_email || jwt.client_email.length === 0) {
            this.validationErrors.push('Client Email field missing in JWT file.');
        }
        if (!jwt.project_id || jwt.project_id.length === 0) {
            this.validationErrors.push('Project Id field missing in JWT file.');
        }
        if (this.validationErrors.length === 0) {
            this.inputDataValid = true;
            return true;
        }
        return false;
    };
    StackdriverConfigCtrl.prototype.onUpload = function (json) {
        this.jsonText = '';
        if (this.validateJwt(json)) {
            this.save(json);
        }
    };
    StackdriverConfigCtrl.prototype.onPasteJwt = function (e) {
        try {
            var json = JSON.parse(e.originalEvent.clipboardData.getData('text/plain') || this.jsonText);
            if (this.validateJwt(json)) {
                this.save(json);
            }
        }
        catch (error) {
            this.resetValidationMessages();
            this.validationErrors.push("Invalid json: " + error.message);
        }
    };
    StackdriverConfigCtrl.prototype.resetValidationMessages = function () {
        this.validationErrors = [];
        this.inputDataValid = false;
        this.jsonText = '';
        this.current.jsonData = Object.assign({}, { authenticationType: this.current.jsonData.authenticationType });
        this.current.secureJsonData = {};
        this.current.secureJsonFields = {};
    };
    StackdriverConfigCtrl.templateUrl = 'public/app/plugins/datasource/stackdriver/partials/config.html';
    return StackdriverConfigCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/stackdriver/datasource.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/stackdriver/datasource.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./public/app/plugins/datasource/stackdriver/constants.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _StackdriverMetricFindQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StackdriverMetricFindQuery */ "./public/app/plugins/datasource/stackdriver/StackdriverMetricFindQuery.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");







var StackdriverDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(StackdriverDatasource, _super);
    /** @ngInject */
    function StackdriverDatasource(instanceSettings, backendSrv, templateSrv, timeSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.timeSrv = timeSrv;
        _this.baseUrl = "/stackdriver/";
        _this.url = instanceSettings.url;
        _this.projectName = instanceSettings.jsonData.defaultProject || '';
        _this.authenticationType = instanceSettings.jsonData.authenticationType || 'jwt';
        _this.metricTypes = [];
        return _this;
    }
    Object.defineProperty(StackdriverDatasource.prototype, "variables", {
        get: function () {
            return this.templateSrv.variables.map(function (v) { return "$" + v.name; });
        },
        enumerable: true,
        configurable: true
    });
    StackdriverDatasource.prototype.getTimeSeries = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var queries, data;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queries = options.targets
                            .filter(function (target) {
                            return !target.hide && target.metricType;
                        })
                            .map(function (t) {
                            return {
                                refId: t.refId,
                                intervalMs: options.intervalMs,
                                datasourceId: _this.id,
                                metricType: _this.templateSrv.replace(t.metricType, options.scopedVars || {}),
                                crossSeriesReducer: _this.templateSrv.replace(t.crossSeriesReducer || 'REDUCE_MEAN', options.scopedVars || {}),
                                perSeriesAligner: _this.templateSrv.replace(t.perSeriesAligner, options.scopedVars || {}),
                                alignmentPeriod: _this.templateSrv.replace(t.alignmentPeriod, options.scopedVars || {}),
                                groupBys: _this.interpolateGroupBys(t.groupBys, options.scopedVars),
                                view: t.view || 'FULL',
                                filters: _this.interpolateFilters(t.filters, options.scopedVars),
                                aliasBy: _this.templateSrv.replace(t.aliasBy, options.scopedVars || {}),
                                type: 'timeSeriesQuery',
                            };
                        });
                        if (!(queries.length > 0)) return [3 /*break*/, 2];
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
                        return [2 /*return*/, data];
                    case 2: return [2 /*return*/, { results: [] }];
                }
            });
        });
    };
    StackdriverDatasource.prototype.interpolateFilters = function (filters, scopedVars) {
        var _this = this;
        var completeFilter = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.chunk(filters, 4)
            .map(function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 4), key = _b[0], operator = _b[1], value = _b[2], _c = _b[3], condition = _c === void 0 ? 'AND' : _c;
            return ({
                key: key,
                operator: operator,
                value: value,
                condition: condition,
            });
        })
            .reduce(function (res, filter) { return (filter.value ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(res, [filter]) : res); }, []);
        var filterArray = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.flatten(completeFilter.map(function (_a) {
            var key = _a.key, operator = _a.operator, value = _a.value, condition = _a.condition;
            return [key, operator, value, condition];
        }));
        return (filterArray || []).map(function (f) {
            return _this.templateSrv.replace(f, scopedVars || {}, 'regex');
        });
    };
    StackdriverDatasource.prototype.getLabels = function (metricType, refId, groupBys) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var response, result;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTimeSeries({
                            targets: [
                                {
                                    refId: refId,
                                    datasourceId: this.id,
                                    metricType: this.templateSrv.replace(metricType),
                                    groupBys: this.interpolateGroupBys(groupBys || [], {}),
                                    crossSeriesReducer: 'REDUCE_NONE',
                                    view: 'HEADERS',
                                },
                            ],
                            range: this.timeSrv.timeRange(),
                        })];
                    case 1:
                        response = _a.sent();
                        result = response.results[refId];
                        return [2 /*return*/, result && result.meta ? result.meta.labels : {}];
                }
            });
        });
    };
    StackdriverDatasource.prototype.interpolateGroupBys = function (groupBys, scopedVars) {
        var _this = this;
        var interpolatedGroupBys = [];
        (groupBys || []).forEach(function (gb) {
            var interpolated = _this.templateSrv.replace(gb, scopedVars || {}, 'csv').split(',');
            if (Array.isArray(interpolated)) {
                interpolatedGroupBys = interpolatedGroupBys.concat(interpolated);
            }
            else {
                interpolatedGroupBys.push(interpolated);
            }
        });
        return interpolatedGroupBys;
    };
    StackdriverDatasource.prototype.resolvePanelUnitFromTargets = function (targets) {
        var unit;
        if (targets.length > 0 && targets.every(function (t) { return t.unit === targets[0].unit; })) {
            if (_constants__WEBPACK_IMPORTED_MODULE_1__["stackdriverUnitMappings"].hasOwnProperty(targets[0].unit)) {
                // @ts-ignore
                unit = _constants__WEBPACK_IMPORTED_MODULE_1__["stackdriverUnitMappings"][targets[0].unit];
            }
        }
        return unit;
    };
    StackdriverDatasource.prototype.query = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var result, data;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4 /*yield*/, this.getTimeSeries(options)];
                    case 1:
                        data = _a.sent();
                        if (data.results) {
                            Object['values'](data.results).forEach(function (queryRes) {
                                if (!queryRes.series) {
                                    return;
                                }
                                var unit = _this.resolvePanelUnitFromTargets(options.targets);
                                queryRes.series.forEach(function (series) {
                                    var timeSerie = {
                                        target: series.name,
                                        datapoints: series.points,
                                        refId: queryRes.refId,
                                        meta: queryRes.meta,
                                    };
                                    if (unit) {
                                        timeSerie = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, timeSerie), { unit: unit });
                                    }
                                    result.push(timeSerie);
                                });
                            });
                            return [2 /*return*/, { data: result }];
                        }
                        else {
                            return [2 /*return*/, { data: [] }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StackdriverDatasource.prototype.annotationQuery = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var annotation, queries, data, results;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        annotation = options.annotation;
                        queries = [
                            {
                                refId: 'annotationQuery',
                                datasourceId: this.id,
                                metricType: this.templateSrv.replace(annotation.target.metricType, options.scopedVars || {}),
                                crossSeriesReducer: 'REDUCE_NONE',
                                perSeriesAligner: 'ALIGN_NONE',
                                title: this.templateSrv.replace(annotation.target.title, options.scopedVars || {}),
                                text: this.templateSrv.replace(annotation.target.text, options.scopedVars || {}),
                                tags: this.templateSrv.replace(annotation.target.tags, options.scopedVars || {}),
                                view: 'FULL',
                                filters: this.interpolateFilters(annotation.target.filters || [], options.scopedVars),
                                type: 'annotationQuery',
                            },
                        ];
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
                        results = data.results['annotationQuery'].tables[0].rows.map(function (v) {
                            return {
                                annotation: annotation,
                                time: Date.parse(v[0]),
                                title: v[1],
                                tags: [],
                                text: v[3],
                            };
                        });
                        return [2 /*return*/, results];
                }
            });
        });
    };
    StackdriverDatasource.prototype.metricFindQuery = function (query) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var stackdriverMetricFindQuery;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                stackdriverMetricFindQuery = new _StackdriverMetricFindQuery__WEBPACK_IMPORTED_MODULE_4__["default"](this);
                return [2 /*return*/, stackdriverMetricFindQuery.execute(query)];
            });
        });
    };
    StackdriverDatasource.prototype.testDatasource = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var status, message, defaultErrorMessage, projectName, path, response, error_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultErrorMessage = 'Cannot connect to Stackdriver API';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.getDefaultProject()];
                    case 2:
                        projectName = _a.sent();
                        path = "v3/projects/" + projectName + "/metricDescriptors";
                        return [4 /*yield*/, this.doRequest("" + this.baseUrl + path)];
                    case 3:
                        response = _a.sent();
                        if (response.status === 200) {
                            status = 'success';
                            message = 'Successfully queried the Stackdriver API.';
                        }
                        else {
                            status = 'error';
                            message = response.statusText ? response.statusText : defaultErrorMessage;
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        status = 'error';
                        if (lodash__WEBPACK_IMPORTED_MODULE_3___default.a.isString(error_1)) {
                            message = error_1;
                        }
                        else {
                            message = 'Stackdriver: ';
                            message += error_1.statusText ? error_1.statusText : defaultErrorMessage;
                            if (error_1.data && error_1.data.error && error_1.data.error.code) {
                                message += ': ' + error_1.data.error.code + '. ' + error_1.data.error.message;
                            }
                        }
                        return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, {
                            status: status,
                            message: message,
                        }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StackdriverDatasource.prototype.formatStackdriverError = function (error) {
        var message = 'Stackdriver: ';
        message += error.statusText ? error.statusText + ': ' : '';
        if (error.data && error.data.error) {
            try {
                var res = JSON.parse(error.data.error);
                message += res.error.code + '. ' + res.error.message;
            }
            catch (err) {
                message += error.data.error;
            }
        }
        else {
            message += 'Cannot connect to Stackdriver API';
        }
        return message;
    };
    StackdriverDatasource.prototype.getDefaultProject = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var data, error_2;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(this.authenticationType === 'gce' || !this.projectName)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.backendSrv.datasourceRequest({
                                url: '/api/tsdb/query',
                                method: 'POST',
                                data: {
                                    queries: [
                                        {
                                            refId: 'ensureDefaultProjectQuery',
                                            type: 'ensureDefaultProjectQuery',
                                            datasourceId: this.id,
                                        },
                                    ],
                                },
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        this.projectName = data.results.ensureDefaultProjectQuery.meta.defaultProject;
                        return [2 /*return*/, this.projectName];
                    case 2: return [2 /*return*/, this.projectName];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        throw this.formatStackdriverError(error_2);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    StackdriverDatasource.prototype.getMetricTypes = function (projectName) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var metricsApiPath, data, error_3;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!(this.metricTypes.length === 0)) return [3 /*break*/, 2];
                        metricsApiPath = "v3/projects/" + projectName + "/metricDescriptors";
                        return [4 /*yield*/, this.doRequest("" + this.baseUrl + metricsApiPath)];
                    case 1:
                        data = (_a.sent()).data;
                        this.metricTypes = data.metricDescriptors.map(function (m) {
                            var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(m.type.split('/'), 1), service = _a[0];
                            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(service.split('.'), 1), serviceShortName = _b[0];
                            m.service = service;
                            m.serviceShortName = serviceShortName;
                            m.displayName = m.displayName || m.type;
                            return m;
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.metricTypes];
                    case 3:
                        error_3 = _a.sent();
                        app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_6__["CoreEvents"].dsRequestError, { error: { data: { error: this.formatStackdriverError(error_3) } } });
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StackdriverDatasource.prototype.doRequest = function (url, maxRetries) {
        if (maxRetries === void 0) { maxRetries = 1; }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                return [2 /*return*/, this.backendSrv
                        .datasourceRequest({
                        url: this.url + url,
                        method: 'GET',
                    })
                        .catch(function (error) {
                        if (maxRetries > 0) {
                            return _this.doRequest(url, maxRetries - 1);
                        }
                        throw error;
                    })];
            });
        });
    };
    return StackdriverDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["DataSourceApi"]));
/* harmony default export */ __webpack_exports__["default"] = (StackdriverDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/stackdriver/module.ts":
/*!*************************************************************!*\
  !*** ./public/app/plugins/datasource/stackdriver/module.ts ***!
  \*************************************************************/
/*! exports provided: Datasource, QueryCtrl, ConfigCtrl, AnnotationsQueryCtrl, VariableQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/stackdriver/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/stackdriver/query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_1__["StackdriverQueryCtrl"]; });

/* harmony import */ var _config_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config_ctrl */ "./public/app/plugins/datasource/stackdriver/config_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return _config_ctrl__WEBPACK_IMPORTED_MODULE_2__["StackdriverConfigCtrl"]; });

/* harmony import */ var _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./annotations_query_ctrl */ "./public/app/plugins/datasource/stackdriver/annotations_query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return _annotations_query_ctrl__WEBPACK_IMPORTED_MODULE_3__["StackdriverAnnotationsQueryCtrl"]; });

/* harmony import */ var _components_VariableQueryEditor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/VariableQueryEditor */ "./public/app/plugins/datasource/stackdriver/components/VariableQueryEditor.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VariableQueryEditor", function() { return _components_VariableQueryEditor__WEBPACK_IMPORTED_MODULE_4__["StackdriverVariableQueryEditor"]; });









/***/ }),

/***/ "./public/app/plugins/datasource/stackdriver/query_ctrl.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/stackdriver/query_ctrl.ts ***!
  \*****************************************************************/
/*! exports provided: StackdriverQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackdriverQueryCtrl", function() { return StackdriverQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");


var StackdriverQueryCtrl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(StackdriverQueryCtrl, _super);
    /** @ngInject */
    function StackdriverQueryCtrl($scope, $injector, templateSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.templateSrv = templateSrv;
        _this.onQueryChange = _this.onQueryChange.bind(_this);
        _this.onExecuteQuery = _this.onExecuteQuery.bind(_this);
        return _this;
    }
    StackdriverQueryCtrl.prototype.onQueryChange = function (target) {
        Object.assign(this.target, target);
    };
    StackdriverQueryCtrl.prototype.onExecuteQuery = function () {
        this.$scope.ctrl.refresh();
    };
    StackdriverQueryCtrl.templateUrl = 'partials/query.editor.html';
    return StackdriverQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_1__["QueryCtrl"]));



/***/ }),

/***/ "./public/app/plugins/datasource/stackdriver/types.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/stackdriver/types.ts ***!
  \************************************************************/
/*! exports provided: MetricFindQueryTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricFindQueryTypes", function() { return MetricFindQueryTypes; });
var MetricFindQueryTypes;
(function (MetricFindQueryTypes) {
    MetricFindQueryTypes["Services"] = "services";
    MetricFindQueryTypes["MetricTypes"] = "metricTypes";
    MetricFindQueryTypes["LabelKeys"] = "labelKeys";
    MetricFindQueryTypes["LabelValues"] = "labelValues";
    MetricFindQueryTypes["ResourceTypes"] = "resourceTypes";
    MetricFindQueryTypes["Aggregations"] = "aggregations";
    MetricFindQueryTypes["Aligners"] = "aligners";
    MetricFindQueryTypes["AlignmentPeriods"] = "alignmentPeriods";
})(MetricFindQueryTypes || (MetricFindQueryTypes = {}));


/***/ })

}]);
//# sourceMappingURL=stackdriverPlugin.6310f9af5345c722b930.js.map