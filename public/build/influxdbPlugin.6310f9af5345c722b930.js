(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["influxdbPlugin"],{

/***/ "./public/app/features/explore/AdHocFilter.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/AdHocFilter.tsx ***!
  \*****************************************************/
/*! exports provided: AdHocFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdHocFilter", function() { return AdHocFilter; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");




var getStyles = function (theme) { return ({
    keyValueContainer: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n    label: key-value-container;\n    display: flex;\n    flex-flow: row nowrap;\n  "], ["\n    label: key-value-container;\n    display: flex;\n    flex-flow: row nowrap;\n  "]))),
}); };
var ChangeType;
(function (ChangeType) {
    ChangeType["Key"] = "key";
    ChangeType["Value"] = "value";
    ChangeType["Operator"] = "operator";
})(ChangeType || (ChangeType = {}));
var AdHocFilter = function (props) {
    var theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ThemeContext"]);
    var styles = getStyles(theme);
    var onChange = function (changeType) { return function (item) {
        var onKeyChanged = props.onKeyChanged, onValueChanged = props.onValueChanged, onOperatorChanged = props.onOperatorChanged;
        if (!item.value) {
            return;
        }
        switch (changeType) {
            case ChangeType.Key:
                onKeyChanged(item.value);
                break;
            case ChangeType.Operator:
                onOperatorChanged(item.value);
                break;
            case ChangeType.Value:
                onValueChanged(item.value);
                break;
        }
    }; };
    var stringToOption = function (value) { return ({ label: value, value: value }); };
    var keys = props.keys, initialKey = props.initialKey, keysPlaceHolder = props.keysPlaceHolder, initialOperator = props.initialOperator, values = props.values, initialValue = props.initialValue, valuesPlaceHolder = props.valuesPlaceHolder;
    var operators = ['=', '!='];
    var keysAsOptions = keys ? keys.map(stringToOption) : [];
    var selectedKey = initialKey ? keysAsOptions.filter(function (option) { return option.value === initialKey; }) : undefined;
    var valuesAsOptions = values ? values.map(stringToOption) : [];
    var selectedValue = initialValue ? valuesAsOptions.filter(function (option) { return option.value === initialValue; }) : undefined;
    var operatorsAsOptions = operators.map(stringToOption);
    var selectedOperator = initialOperator
        ? operatorsAsOptions.filter(function (option) { return option.value === initialOperator; })
        : undefined;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["cx"])([styles.keyValueContainer]) },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { options: keysAsOptions, isSearchable: true, value: selectedKey, onChange: onChange(ChangeType.Key), placeholder: keysPlaceHolder }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { options: operatorsAsOptions, value: selectedOperator, onChange: onChange(ChangeType.Operator) }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { options: valuesAsOptions, isSearchable: true, value: selectedValue, onChange: onChange(ChangeType.Value), placeholder: valuesPlaceHolder })));
};
var templateObject_1;


/***/ }),

/***/ "./public/app/features/explore/AdHocFilterField.tsx":
/*!**********************************************************!*\
  !*** ./public/app/features/explore/AdHocFilterField.tsx ***!
  \**********************************************************/
/*! exports provided: DEFAULT_REMOVE_FILTER_VALUE, AdHocFilterField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_REMOVE_FILTER_VALUE", function() { return DEFAULT_REMOVE_FILTER_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdHocFilterField", function() { return AdHocFilterField; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AdHocFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AdHocFilter */ "./public/app/features/explore/AdHocFilter.tsx");




var DEFAULT_REMOVE_FILTER_VALUE = '-- remove filter --';
var addFilterButton = function (onAddFilter) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn query-part", onClick: onAddFilter },
    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-plus" }))); };
var AdHocFilterField = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AdHocFilterField, _super);
    function AdHocFilterField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { pairs: [] };
        _this.loadTagKeys = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var _a, datasource, extendedOptions, options, tagKeys, _b, keys;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, datasource = _a.datasource, extendedOptions = _a.extendedOptions;
                        options = extendedOptions || {};
                        if (!datasource.getTagKeys) return [3 /*break*/, 2];
                        return [4 /*yield*/, datasource.getTagKeys(options)];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = [];
                        _c.label = 3;
                    case 3:
                        tagKeys = _b;
                        keys = tagKeys.map(function (tagKey) { return tagKey.text; });
                        return [2 /*return*/, keys];
                }
            });
        }); };
        _this.loadTagValues = function (key) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var _a, datasource, extendedOptions, options, tagValues, _b, values;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, datasource = _a.datasource, extendedOptions = _a.extendedOptions;
                        options = extendedOptions || {};
                        if (!datasource.getTagValues) return [3 /*break*/, 2];
                        return [4 /*yield*/, datasource.getTagValues(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { key: key }))];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _b = [];
                        _c.label = 3;
                    case 3:
                        tagValues = _b;
                        values = tagValues.map(function (tagValue) { return tagValue.text; });
                        return [2 /*return*/, values];
                }
            });
        }); };
        _this.onKeyChanged = function (index) { return function (key) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var onPairsChanged_1, values, pairs_1;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(key !== DEFAULT_REMOVE_FILTER_VALUE)) return [3 /*break*/, 2];
                        onPairsChanged_1 = this.props.onPairsChanged;
                        return [4 /*yield*/, this.loadTagValues(key)];
                    case 1:
                        values = _a.sent();
                        pairs_1 = this.updatePairs(this.state.pairs, index, { key: key, values: values });
                        this.setState({ pairs: pairs_1 }, function () { return onPairsChanged_1(pairs_1); });
                        return [3 /*break*/, 3];
                    case 2:
                        this.onRemoveFilter(index);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); }; };
        _this.onValueChanged = function (index) { return function (value) {
            var pairs = _this.updatePairs(_this.state.pairs, index, { value: value });
            _this.setState({ pairs: pairs }, function () { return _this.props.onPairsChanged(pairs); });
        }; };
        _this.onOperatorChanged = function (index) { return function (operator) {
            var pairs = _this.updatePairs(_this.state.pairs, index, { operator: operator });
            _this.setState({ pairs: pairs }, function () { return _this.props.onPairsChanged(pairs); });
        }; };
        _this.onAddFilter = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var keys, pairs;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadTagKeys()];
                    case 1:
                        keys = _a.sent();
                        pairs = this.state.pairs.concat(this.updatePairs([], 0, { keys: keys }));
                        this.setState({ pairs: pairs }, function () { return _this.props.onPairsChanged(pairs); });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onRemoveFilter = function (index) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var pairs;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                pairs = this.state.pairs.reduce(function (allPairs, pair, pairIndex) {
                    if (pairIndex === index) {
                        return allPairs;
                    }
                    return allPairs.concat(pair);
                }, []);
                this.setState({ pairs: pairs });
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    AdHocFilterField.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEqual(prevProps.extendedOptions, this.props.extendedOptions) === false) {
            var pairs_2 = [];
            this.setState({ pairs: pairs_2 }, function () { return _this.props.onPairsChanged(pairs_2); });
        }
    };
    AdHocFilterField.prototype.updatePairs = function (pairs, index, pair) {
        if (pairs.length === 0) {
            return [
                {
                    key: pair.key || '',
                    keys: pair.keys || [],
                    operator: pair.operator || '',
                    value: pair.value || '',
                    values: pair.values || [],
                },
            ];
        }
        var newPairs = [];
        for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
            var newPair = pairs[pairIndex];
            if (index === pairIndex) {
                newPairs.push(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, newPair), { key: pair.key || newPair.key, value: pair.value || newPair.value, operator: pair.operator || newPair.operator, keys: pair.keys || newPair.keys, values: pair.values || newPair.values }));
                continue;
            }
            newPairs.push(newPair);
        }
        return newPairs;
    };
    AdHocFilterField.prototype.render = function () {
        var _this = this;
        var pairs = this.state.pairs;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            pairs.length < 1 && addFilterButton(this.onAddFilter),
            pairs.map(function (pair, index) {
                var adHocKey = "adhoc-filter-" + index + "-" + pair.key + "-" + pair.value;
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "align-items-center flex-grow-1", key: adHocKey },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_AdHocFilter__WEBPACK_IMPORTED_MODULE_3__["AdHocFilter"], { keys: [DEFAULT_REMOVE_FILTER_VALUE].concat(pair.keys), values: pair.values, initialKey: pair.key, initialOperator: pair.operator, initialValue: pair.value, onKeyChanged: _this.onKeyChanged(index), onOperatorChanged: _this.onOperatorChanged(index), onValueChanged: _this.onValueChanged(index) }),
                    index < pairs.length - 1 && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "\u00A0AND\u00A0"),
                    index === pairs.length - 1 && addFilterButton(_this.onAddFilter)));
            })));
    };
    return AdHocFilterField;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));



/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/components/ConfigEditor.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/components/ConfigEditor.tsx ***!
  \****************************************************************************/
/*! exports provided: ConfigEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");




var httpModes = [
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
];
var ConfigEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ConfigEditor, _super);
    function ConfigEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onResetPassword = function () {
            Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["updateDatasourcePluginResetOption"])(_this.props, 'password');
        };
        return _this;
    }
    ConfigEditor.prototype.render = function () {
        var _a = this.props, options = _a.options, onOptionsChange = _a.onOptionsChange;
        var secureJsonFields = options.secureJsonFields;
        var secureJsonData = (options.secureJsonData || {});
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DataSourceHttpSettings"], { showAccessOptions: true, dataSourceConfig: options, defaultUrl: "http://localhost:8086", onChange: onOptionsChange }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "InfluxDB Details"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { className: "width-10" }, "Database"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-20" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], { className: "width-20", value: options.database || '', onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceOption"])(this.props, 'database') })))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { className: "width-10" }, "User"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-10" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], { className: "width-20", value: options.user || '', onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceOption"])(this.props, 'user') })))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["SecretFormField"], { isConfigured: (secureJsonFields && secureJsonFields.password), value: secureJsonData.password || '', label: "Password", labelWidth: 10, inputWidth: 20, onReset: this.onResetPassword, onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceSecureJsonDataOption"])(this.props, 'password') }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { className: "width-10", tooltip: "You can use either GET or POST HTTP method to query your InfluxDB database. The POST\r\n          method allows you to perform heavy requests (with a lots of WHERE clause) while the GET method\r\n          will restrict you and return an error if the query is too large." }, "HTTP Method"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], { className: "width-10", value: httpModes.find(function (httpMode) { return httpMode.value === options.jsonData.httpMode; }), options: httpModes, defaultValue: options.jsonData.httpMode, onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOptionSelect"])(this.props, 'httpMode') })))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "grafana-info-box" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", null, "Database Access"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null,
                        "Setting the database for this datasource does not deny access to other databases. The InfluxDB query syntax allows switching the database in the query. For example:",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, "SHOW MEASUREMENTS ON _internal"),
                        " or ",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, "SELECT * FROM \"_internal\"..\"database\" LIMIT 10"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                        "To support data isolation and security, make sure appropriate permissions are configured in InfluxDB."))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { className: "width-10", tooltip: "A lower limit for the auto group by time interval. Recommended to be set to write frequency,\r\n\t\t\t\tfor example 1m if your data is written every minute." }, "Min time interval"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "width-10" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], { className: "width-10", placeholder: "10s", value: options.jsonData.timeInterval || '', onChange: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["onUpdateDatasourceJsonDataOption"])(this.props, 'timeInterval') })))))));
    };
    return ConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (ConfigEditor);


/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/components/InfluxCheatSheet.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/components/InfluxCheatSheet.tsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CHEAT_SHEET_ITEMS = [
    {
        title: 'Getting started',
        label: 'Start by selecting a measurement and field from the dropdown above. You can then use the tag selector to further narrow your search.',
    },
];
/* harmony default export */ __webpack_exports__["default"] = (function (props) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "InfluxDB Cheat Sheet"),
    CHEAT_SHEET_ITEMS.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item", key: item.title },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item__title" }, item.title),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item__label" }, item.label))); }))); });


/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/components/InfluxLogsQueryField.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/components/InfluxLogsQueryField.tsx ***!
  \************************************************************************************/
/*! exports provided: pairsAreValid, InfluxLogsQueryField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pairsAreValid", function() { return pairsAreValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfluxLogsQueryField", function() { return InfluxLogsQueryField; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _influx_query_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../influx_query_model */ "./public/app/plugins/datasource/influxdb/influx_query_model.ts");
/* harmony import */ var app_features_explore_AdHocFilterField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/explore/AdHocFilterField */ "./public/app/features/explore/AdHocFilterField.tsx");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var _query_builder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../query_builder */ "./public/app/plugins/datasource/influxdb/query_builder.ts");







// Helper function for determining if a collection of pairs are valid
// where a valid pair is either fully defined, or not defined at all, but not partially defined
function pairsAreValid(pairs) {
    return (!pairs ||
        pairs.every(function (pair) {
            var allDefined = !!(pair.key && pair.operator && pair.value);
            var allEmpty = pair.key === undefined && pair.operator === undefined && pair.value === undefined;
            return allDefined || allEmpty;
        }));
}
function getChooserText(_a) {
    var measurement = _a.measurement, field = _a.field, error = _a.error;
    if (error) {
        return '(No measurement found)';
    }
    if (measurement) {
        return "Measurements (" + measurement + "/" + field + ")";
    }
    return 'Measurements';
}
var InfluxLogsQueryField = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InfluxLogsQueryField, _super);
    function InfluxLogsQueryField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.templateSrv = new app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_5__["TemplateSrv"]();
        _this.state = { measurements: [], measurement: null, field: null, error: null };
        _this.onMeasurementsChange = function (values) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            var query, measurement, field;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                query = this.props.query;
                measurement = values[0];
                field = values[1];
                this.setState({ measurement: measurement, field: field }, function () {
                    _this.onPairsChanged(query.tags);
                });
                return [2 /*return*/];
            });
        }); };
        _this.onPairsChanged = function (pairs) {
            var query = _this.props.query;
            var _a = _this.state, measurement = _a.measurement, field = _a.field;
            var queryModel = new _influx_query_model__WEBPACK_IMPORTED_MODULE_3__["default"](Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { resultFormat: 'table', groupBy: [], select: [[{ type: 'field', params: [field] }]], tags: pairs, limit: '1000', measurement: measurement }), _this.templateSrv);
            _this.props.onChange(queryModel.target);
            // Only run the query if measurement & field are set, and there are no invalid pairs
            if (measurement && field && pairsAreValid(pairs)) {
                _this.props.onRunQuery();
            }
        };
        return _this;
    }
    InfluxLogsQueryField.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var datasource, queryBuilder, measureMentsQuery, influxMeasurements, measurements, index, measurementObj, queryBuilder_1, fieldsQuery, influxFields, fields, error_1, message;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datasource = this.props.datasource;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        queryBuilder = new _query_builder__WEBPACK_IMPORTED_MODULE_6__["InfluxQueryBuilder"]({ measurement: '', tags: [] }, datasource.database);
                        measureMentsQuery = queryBuilder.buildExploreQuery('MEASUREMENTS');
                        return [4 /*yield*/, datasource.metricFindQuery(measureMentsQuery)];
                    case 2:
                        influxMeasurements = _a.sent();
                        measurements = [];
                        index = 0;
                        _a.label = 3;
                    case 3:
                        if (!(index < influxMeasurements.length)) return [3 /*break*/, 6];
                        measurementObj = influxMeasurements[index];
                        queryBuilder_1 = new _query_builder__WEBPACK_IMPORTED_MODULE_6__["InfluxQueryBuilder"]({ measurement: measurementObj.text, tags: [] }, datasource.database);
                        fieldsQuery = queryBuilder_1.buildExploreQuery('FIELDS');
                        return [4 /*yield*/, datasource.metricFindQuery(fieldsQuery)];
                    case 4:
                        influxFields = _a.sent();
                        fields = influxFields.map(function (field) { return ({
                            label: field.text,
                            value: field.text,
                            children: [],
                        }); });
                        measurements.push({
                            label: measurementObj.text,
                            value: measurementObj.text,
                            items: fields,
                        });
                        _a.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 3];
                    case 6:
                        this.setState({ measurements: measurements });
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        message = error_1 && error_1.message ? error_1.message : error_1;
                        this.setState({ error: message });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    InfluxLogsQueryField.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.query.measurement && !this.props.query.measurement) {
            this.setState({ measurement: null, field: null });
        }
    };
    InfluxLogsQueryField.prototype.render = function () {
        var datasource = this.props.datasource;
        var _a = this.state, measurements = _a.measurements, measurement = _a.measurement, field = _a.field, error = _a.error;
        var cascadeText = getChooserText({ measurement: measurement, field: field, error: error });
        var hasMeasurement = measurements && measurements.length > 0;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline gf-form-inline--nowrap" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form flex-shrink-0" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["ButtonCascader"], { options: measurements, disabled: !hasMeasurement, value: [measurement, field], onChange: this.onMeasurementsChange }, cascadeText)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "flex-shrink-1 flex-flow-column-nowrap" },
                measurement && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_features_explore_AdHocFilterField__WEBPACK_IMPORTED_MODULE_4__["AdHocFilterField"], { onPairsChanged: this.onPairsChanged, datasource: datasource, extendedOptions: { measurement: measurement } })),
                error ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "gf-form-label gf-form-label--transparent gf-form-label--error m-l-2" }, error)) : null)));
    };
    return InfluxLogsQueryField;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));



/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/components/InfluxStartPage.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/components/InfluxStartPage.tsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _InfluxCheatSheet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InfluxCheatSheet */ "./public/app/plugins/datasource/influxdb/components/InfluxCheatSheet.tsx");



var InfluxStartPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InfluxStartPage, _super);
    function InfluxStartPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InfluxStartPage.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_InfluxCheatSheet__WEBPACK_IMPORTED_MODULE_2__["default"], { onClickExample: this.props.onClickExample });
    };
    return InfluxStartPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (InfluxStartPage);


/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/datasource.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/datasource.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _influx_series__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./influx_series */ "./public/app/plugins/datasource/influxdb/influx_series.ts");
/* harmony import */ var _influx_query_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./influx_query_model */ "./public/app/plugins/datasource/influxdb/influx_query_model.ts");
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/influxdb/response_parser.ts");
/* harmony import */ var _query_builder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./query_builder */ "./public/app/plugins/datasource/influxdb/query_builder.ts");







var InfluxDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InfluxDatasource, _super);
    /** @ngInject */
    function InfluxDatasource(instanceSettings, backendSrv, templateSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.type = 'influxdb';
        _this.urls = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(instanceSettings.url.split(','), function (url) {
            return url.trim();
        });
        _this.username = instanceSettings.username;
        _this.password = instanceSettings.password;
        _this.name = instanceSettings.name;
        _this.database = instanceSettings.database;
        _this.basicAuth = instanceSettings.basicAuth;
        _this.withCredentials = instanceSettings.withCredentials;
        var settingsData = instanceSettings.jsonData || {};
        _this.interval = settingsData.timeInterval;
        _this.httpMode = settingsData.httpMode || 'GET';
        _this.responseParser = new _response_parser__WEBPACK_IMPORTED_MODULE_5__["default"]();
        return _this;
    }
    InfluxDatasource.prototype.query = function (options) {
        var _this = this;
        var timeFilter = this.getTimeFilter(options);
        var scopedVars = options.scopedVars;
        var targets = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(options.targets);
        var queryTargets = [];
        var queryModel;
        var i, y;
        var allQueries = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(targets, function (target) {
            if (target.hide) {
                return '';
            }
            queryTargets.push(target);
            // backward compatibility
            scopedVars.interval = scopedVars.__interval;
            queryModel = new _influx_query_model__WEBPACK_IMPORTED_MODULE_4__["default"](target, _this.templateSrv, scopedVars);
            return queryModel.render(true);
        }).reduce(function (acc, current) {
            if (current !== '') {
                acc += ';' + current;
            }
            return acc;
        });
        if (allQueries === '') {
            return Promise.resolve({ data: [] });
        }
        // add global adhoc filters to timeFilter
        var adhocFilters = this.templateSrv.getAdhocFilters(this.name);
        if (adhocFilters.length > 0) {
            timeFilter += ' AND ' + queryModel.renderAdhocFilters(adhocFilters);
        }
        // replace grafana variables
        scopedVars.timeFilter = { value: timeFilter };
        // replace templated variables
        allQueries = this.templateSrv.replace(allQueries, scopedVars);
        return this._seriesQuery(allQueries, options).then(function (data) {
            if (!data || !data.results) {
                return [];
            }
            var seriesList = [];
            for (i = 0; i < data.results.length; i++) {
                var result = data.results[i];
                if (!result || !result.series) {
                    continue;
                }
                var target = queryTargets[i];
                var alias = target.alias;
                if (alias) {
                    alias = _this.templateSrv.replace(target.alias, options.scopedVars);
                }
                var influxSeries = new _influx_series__WEBPACK_IMPORTED_MODULE_3__["default"]({
                    series: data.results[i].series,
                    alias: alias,
                });
                switch (target.resultFormat) {
                    case 'table': {
                        seriesList.push(influxSeries.getTable());
                        break;
                    }
                    default: {
                        var timeSeries = influxSeries.getTimeSeries();
                        for (y = 0; y < timeSeries.length; y++) {
                            seriesList.push(timeSeries[y]);
                        }
                        break;
                    }
                }
            }
            return { data: seriesList };
        });
    };
    InfluxDatasource.prototype.annotationQuery = function (options) {
        if (!options.annotation.query) {
            return Promise.reject({
                message: 'Query missing in annotation definition',
            });
        }
        var timeFilter = this.getTimeFilter({ rangeRaw: options.rangeRaw, timezone: options.timezone });
        var query = options.annotation.query.replace('$timeFilter', timeFilter);
        query = this.templateSrv.replace(query, null, 'regex');
        return this._seriesQuery(query, options).then(function (data) {
            if (!data || !data.results || !data.results[0]) {
                throw { message: 'No results in response from InfluxDB' };
            }
            return new _influx_series__WEBPACK_IMPORTED_MODULE_3__["default"]({
                series: data.results[0].series,
                annotation: options.annotation,
            }).getAnnotations();
        });
    };
    InfluxDatasource.prototype.targetContainsTemplate = function (target) {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(target.groupBy), _d = _c.next(); !_d.done; _d = _c.next()) {
                var group = _d.value;
                try {
                    for (var _e = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(group.params)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var param = _f.value;
                        if (this.templateSrv.variableExists(param)) {
                            return true;
                        }
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
        for (var i in target.tags) {
            if (this.templateSrv.variableExists(target.tags[i].value)) {
                return true;
            }
        }
        return false;
    };
    InfluxDatasource.prototype.interpolateVariablesInQueries = function (queries, scopedVars) {
        var _this = this;
        if (!queries || queries.length === 0) {
            return [];
        }
        var expandedQueries = queries;
        if (queries && queries.length > 0) {
            expandedQueries = queries.map(function (query) {
                var expandedQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { datasource: _this.name, measurement: _this.templateSrv.replace(query.measurement, scopedVars, 'regex') });
                if (query.rawQuery) {
                    expandedQuery.query = _this.templateSrv.replace(query.query, scopedVars, 'regex');
                }
                if (query.tags) {
                    var expandedTags = query.tags.map(function (tag) {
                        var expandedTag = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, tag), { value: _this.templateSrv.replace(tag.value, null, 'regex') });
                        return expandedTag;
                    });
                    expandedQuery.tags = expandedTags;
                }
                return expandedQuery;
            });
        }
        return expandedQueries;
    };
    InfluxDatasource.prototype.metricFindQuery = function (query, options) {
        var interpolated = this.templateSrv.replace(query, null, 'regex');
        return this._seriesQuery(interpolated, options).then(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.curry(this.responseParser.parse)(query));
    };
    InfluxDatasource.prototype.getTagKeys = function (options) {
        if (options === void 0) { options = {}; }
        var queryBuilder = new _query_builder__WEBPACK_IMPORTED_MODULE_6__["InfluxQueryBuilder"]({ measurement: options.measurement || '', tags: [] }, this.database);
        var query = queryBuilder.buildExploreQuery('TAG_KEYS');
        return this.metricFindQuery(query, options);
    };
    InfluxDatasource.prototype.getTagValues = function (options) {
        if (options === void 0) { options = {}; }
        var queryBuilder = new _query_builder__WEBPACK_IMPORTED_MODULE_6__["InfluxQueryBuilder"]({ measurement: options.measurement || '', tags: [] }, this.database);
        var query = queryBuilder.buildExploreQuery('TAG_VALUES', options.key);
        return this.metricFindQuery(query, options);
    };
    InfluxDatasource.prototype._seriesQuery = function (query, options) {
        if (!query) {
            return Promise.resolve({ results: [] });
        }
        if (options && options.range) {
            var timeFilter = this.getTimeFilter({ rangeRaw: options.range, timezone: options.timezone });
            query = query.replace('$timeFilter', timeFilter);
        }
        return this._influxRequest(this.httpMode, '/query', { q: query, epoch: 'ms' }, options);
    };
    InfluxDatasource.prototype.serializeParams = function (params) {
        if (!params) {
            return '';
        }
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce(params, function (memo, value, key) {
            if (value === null || value === undefined) {
                return memo;
            }
            memo.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
            return memo;
        }, []).join('&');
    };
    InfluxDatasource.prototype.testDatasource = function () {
        var queryBuilder = new _query_builder__WEBPACK_IMPORTED_MODULE_6__["InfluxQueryBuilder"]({ measurement: '', tags: [] }, this.database);
        var query = queryBuilder.buildExploreQuery('RETENTION POLICIES');
        return this._seriesQuery(query)
            .then(function (res) {
            var error = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(res, 'results[0].error');
            if (error) {
                return { status: 'error', message: error };
            }
            return { status: 'success', message: 'Data source is working' };
        })
            .catch(function (err) {
            return { status: 'error', message: err.message };
        });
    };
    InfluxDatasource.prototype._influxRequest = function (method, url, data, options) {
        var currentUrl = this.urls.shift();
        this.urls.push(currentUrl);
        var params = {};
        if (this.username) {
            params.u = this.username;
            params.p = this.password;
        }
        if (options && options.database) {
            params.db = options.database;
        }
        else if (this.database) {
            params.db = this.database;
        }
        if (method === 'POST' && lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(data, 'q')) {
            // verb is POST and 'q' param is defined
            lodash__WEBPACK_IMPORTED_MODULE_1___default.a.extend(params, lodash__WEBPACK_IMPORTED_MODULE_1___default.a.omit(data, ['q']));
            data = this.serializeParams(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pick(data, ['q']));
        }
        else if (method === 'GET' || method === 'POST') {
            // verb is GET, or POST without 'q' param
            lodash__WEBPACK_IMPORTED_MODULE_1___default.a.extend(params, data);
            data = null;
        }
        var req = {
            method: method,
            url: currentUrl + url,
            params: params,
            data: data,
            precision: 'ms',
            inspect: { type: 'influxdb' },
            paramSerializer: this.serializeParams,
        };
        req.headers = req.headers || {};
        if (this.basicAuth || this.withCredentials) {
            req.withCredentials = true;
        }
        if (this.basicAuth) {
            req.headers.Authorization = this.basicAuth;
        }
        if (method === 'POST') {
            req.headers['Content-type'] = 'application/x-www-form-urlencoded';
        }
        return this.backendSrv.datasourceRequest(req).then(function (result) {
            return result.data;
        }, function (err) {
            if (err.status !== 0 || err.status >= 300) {
                if (err.data && err.data.error) {
                    throw {
                        message: 'InfluxDB Error: ' + err.data.error,
                        data: err.data,
                        config: err.config,
                    };
                }
                else {
                    throw {
                        message: 'Network Error: ' + err.statusText + '(' + err.status + ')',
                        data: err.data,
                        config: err.config,
                    };
                }
            }
        });
    };
    InfluxDatasource.prototype.getTimeFilter = function (options) {
        var from = this.getInfluxTime(options.rangeRaw.from, false, options.timezone);
        var until = this.getInfluxTime(options.rangeRaw.to, true, options.timezone);
        var fromIsAbsolute = from[from.length - 1] === 'ms';
        if (until === 'now()' && !fromIsAbsolute) {
            return 'time >= ' + from;
        }
        return 'time >= ' + from + ' and time <= ' + until;
    };
    InfluxDatasource.prototype.getInfluxTime = function (date, roundUp, timezone) {
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(date)) {
            if (date === 'now') {
                return 'now()';
            }
            var parts = /^now-(\d+)([dhms])$/.exec(date);
            if (parts) {
                var amount = parseInt(parts[1], 10);
                var unit = parts[2];
                return 'now() - ' + amount + unit;
            }
            date = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateMath"].parse(date, roundUp, timezone);
        }
        return date.valueOf() + 'ms';
    };
    return InfluxDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["DataSourceApi"]));
/* harmony default export */ __webpack_exports__["default"] = (InfluxDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/influx_query_model.ts":
/*!**********************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/influx_query_model.ts ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _query_part__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_part */ "./public/app/plugins/datasource/influxdb/query_part.ts");
/* harmony import */ var app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/utils/kbn */ "./public/app/core/utils/kbn.ts");



var InfluxQueryModel = /** @class */ (function () {
    /** @ngInject */
    function InfluxQueryModel(target, templateSrv, scopedVars) {
        this.target = target;
        this.templateSrv = templateSrv;
        this.scopedVars = scopedVars;
        target.policy = target.policy || 'default';
        target.resultFormat = target.resultFormat || 'time_series';
        target.orderByTime = target.orderByTime || 'ASC';
        target.tags = target.tags || [];
        target.groupBy = target.groupBy || [
            { type: 'time', params: ['$__interval'] },
            { type: 'fill', params: ['null'] },
        ];
        target.select = target.select || [
            [
                { type: 'field', params: ['value'] },
                { type: 'mean', params: [] },
            ],
        ];
        this.updateProjection();
    }
    InfluxQueryModel.prototype.updateProjection = function () {
        this.selectModels = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.target.select, function (parts) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(parts, _query_part__WEBPACK_IMPORTED_MODULE_1__["default"].create);
        });
        this.groupByParts = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.target.groupBy, _query_part__WEBPACK_IMPORTED_MODULE_1__["default"].create);
    };
    InfluxQueryModel.prototype.updatePersistedParts = function () {
        this.target.select = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.selectModels, function (selectParts) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(selectParts, function (part) {
                return { type: part.def.type, params: part.params };
            });
        });
    };
    InfluxQueryModel.prototype.hasGroupByTime = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(this.target.groupBy, function (g) { return g.type === 'time'; });
    };
    InfluxQueryModel.prototype.hasFill = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.find(this.target.groupBy, function (g) { return g.type === 'fill'; });
    };
    InfluxQueryModel.prototype.addGroupBy = function (value) {
        var stringParts = value.match(/^(\w+)\((.*)\)$/);
        var typePart = stringParts[1];
        var arg = stringParts[2];
        var partModel = _query_part__WEBPACK_IMPORTED_MODULE_1__["default"].create({ type: typePart, params: [arg] });
        var partCount = this.target.groupBy.length;
        if (partCount === 0) {
            this.target.groupBy.push(partModel.part);
        }
        else if (typePart === 'time') {
            this.target.groupBy.splice(0, 0, partModel.part);
        }
        else if (typePart === 'tag') {
            if (this.target.groupBy[partCount - 1].type === 'fill') {
                this.target.groupBy.splice(partCount - 1, 0, partModel.part);
            }
            else {
                this.target.groupBy.push(partModel.part);
            }
        }
        else {
            this.target.groupBy.push(partModel.part);
        }
        this.updateProjection();
    };
    InfluxQueryModel.prototype.removeGroupByPart = function (part, index) {
        var categories = _query_part__WEBPACK_IMPORTED_MODULE_1__["default"].getCategories();
        if (part.def.type === 'time') {
            // remove fill
            this.target.groupBy = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(this.target.groupBy, function (g) { return g.type !== 'fill'; });
            // remove aggregations
            this.target.select = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.target.select, function (s) {
                return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(s, function (part) {
                    var partModel = _query_part__WEBPACK_IMPORTED_MODULE_1__["default"].create(part);
                    if (partModel.def.category === categories.Aggregations) {
                        return false;
                    }
                    if (partModel.def.category === categories.Selectors) {
                        return false;
                    }
                    return true;
                });
            });
        }
        this.target.groupBy.splice(index, 1);
        this.updateProjection();
    };
    InfluxQueryModel.prototype.removeSelect = function (index) {
        this.target.select.splice(index, 1);
        this.updateProjection();
    };
    InfluxQueryModel.prototype.removeSelectPart = function (selectParts, part) {
        // if we remove the field remove the whole statement
        if (part.def.type === 'field') {
            if (this.selectModels.length > 1) {
                var modelsIndex = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.indexOf(this.selectModels, selectParts);
                this.selectModels.splice(modelsIndex, 1);
            }
        }
        else {
            var partIndex = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.indexOf(selectParts, part);
            selectParts.splice(partIndex, 1);
        }
        this.updatePersistedParts();
    };
    InfluxQueryModel.prototype.addSelectPart = function (selectParts, type) {
        var partModel = _query_part__WEBPACK_IMPORTED_MODULE_1__["default"].create({ type: type });
        partModel.def.addStrategy(selectParts, partModel, this);
        this.updatePersistedParts();
    };
    InfluxQueryModel.prototype.renderTagCondition = function (tag, index, interpolate) {
        var str = '';
        var operator = tag.operator;
        var value = tag.value;
        if (index > 0) {
            str = (tag.condition || 'AND') + ' ';
        }
        if (!operator) {
            if (/^\/.*\/$/.test(value)) {
                operator = '=~';
            }
            else {
                operator = '=';
            }
        }
        // quote value unless regex
        if (operator !== '=~' && operator !== '!~') {
            if (interpolate) {
                value = this.templateSrv.replace(value, this.scopedVars);
            }
            if (operator !== '>' && operator !== '<') {
                value = "'" + value.replace(/\\/g, '\\\\').replace(/\'/g, "\\'") + "'";
            }
        }
        else if (interpolate) {
            value = this.templateSrv.replace(value, this.scopedVars, 'regex');
        }
        return str + '"' + tag.key + '" ' + operator + ' ' + value;
    };
    InfluxQueryModel.prototype.getMeasurementAndPolicy = function (interpolate) {
        var policy = this.target.policy;
        var measurement = this.target.measurement || 'measurement';
        if (!measurement.match('^/.*/$')) {
            measurement = '"' + measurement + '"';
        }
        else if (interpolate) {
            measurement = this.templateSrv.replace(measurement, this.scopedVars, 'regex');
        }
        if (policy !== 'default') {
            policy = '"' + this.target.policy + '".';
        }
        else {
            policy = '';
        }
        return policy + measurement;
    };
    InfluxQueryModel.prototype.interpolateQueryStr = function (value, variable, defaultFormatFn) {
        // if no multi or include all do not regexEscape
        if (!variable.multi && !variable.includeAll) {
            return value;
        }
        if (typeof value === 'string') {
            return app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_2__["default"].regexEscape(value);
        }
        var escapedValues = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(value, app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_2__["default"].regexEscape);
        return '(' + escapedValues.join('|') + ')';
    };
    InfluxQueryModel.prototype.render = function (interpolate) {
        var _this = this;
        var target = this.target;
        if (target.rawQuery) {
            if (interpolate) {
                return this.templateSrv.replace(target.query, this.scopedVars, this.interpolateQueryStr);
            }
            else {
                return target.query;
            }
        }
        var query = 'SELECT ';
        var i, y;
        for (i = 0; i < this.selectModels.length; i++) {
            var parts = this.selectModels[i];
            var selectText = '';
            for (y = 0; y < parts.length; y++) {
                var part = parts[y];
                selectText = part.render(selectText);
            }
            if (i > 0) {
                query += ', ';
            }
            query += selectText;
        }
        query += ' FROM ' + this.getMeasurementAndPolicy(interpolate) + ' WHERE ';
        var conditions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(target.tags, function (tag, index) {
            return _this.renderTagCondition(tag, index, interpolate);
        });
        if (conditions.length > 0) {
            query += '(' + conditions.join(' ') + ') AND ';
        }
        query += '$timeFilter';
        var groupBySection = '';
        for (i = 0; i < this.groupByParts.length; i++) {
            var part = this.groupByParts[i];
            if (i > 0) {
                // for some reason fill has no separator
                groupBySection += part.def.type === 'fill' ? ' ' : ', ';
            }
            groupBySection += part.render('');
        }
        if (groupBySection.length) {
            query += ' GROUP BY ' + groupBySection;
        }
        if (target.fill) {
            query += ' fill(' + target.fill + ')';
        }
        if (target.orderByTime === 'DESC') {
            query += ' ORDER BY time DESC';
        }
        if (target.limit) {
            query += ' LIMIT ' + target.limit;
        }
        if (target.slimit) {
            query += ' SLIMIT ' + target.slimit;
        }
        if (target.tz) {
            query += " tz('" + target.tz + "')";
        }
        return query;
    };
    InfluxQueryModel.prototype.renderAdhocFilters = function (filters) {
        var _this = this;
        var conditions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(filters, function (tag, index) {
            return _this.renderTagCondition(tag, index, true);
        });
        return conditions.join(' ');
    };
    return InfluxQueryModel;
}());
/* harmony default export */ __webpack_exports__["default"] = (InfluxQueryModel);


/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/influx_series.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/influx_series.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");



var InfluxSeries = /** @class */ (function () {
    function InfluxSeries(options) {
        this.series = options.series;
        this.alias = options.alias;
        this.annotation = options.annotation;
    }
    InfluxSeries.prototype.getTimeSeries = function () {
        var _this = this;
        var output = [];
        var i, j;
        if (this.series.length === 0) {
            return output;
        }
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.series, function (series) {
            var columns = series.columns.length;
            var tags = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(series.tags, function (value, key) {
                return key + ': ' + value;
            });
            for (j = 1; j < columns; j++) {
                var seriesName = series.name;
                var columnName = series.columns[j];
                if (columnName !== 'value') {
                    seriesName = seriesName + '.' + columnName;
                }
                if (_this.alias) {
                    seriesName = _this._getSeriesName(series, j);
                }
                else if (series.tags) {
                    seriesName = seriesName + ' {' + tags.join(', ') + '}';
                }
                var datapoints = [];
                if (series.values) {
                    for (i = 0; i < series.values.length; i++) {
                        datapoints[i] = [series.values[i][j], series.values[i][0]];
                    }
                }
                output.push({ target: seriesName, datapoints: datapoints });
            }
        });
        return output;
    };
    InfluxSeries.prototype._getSeriesName = function (series, index) {
        var regex = /\$(\w+)|\[\[([\s\S]+?)\]\]/g;
        var segments = series.name.split('.');
        return this.alias.replace(regex, function (match, g1, g2) {
            var group = g1 || g2;
            var segIndex = parseInt(group, 10);
            if (group === 'm' || group === 'measurement') {
                return series.name;
            }
            if (group === 'col') {
                return series.columns[index];
            }
            if (!isNaN(segIndex)) {
                return segments[segIndex];
            }
            if (group.indexOf('tag_') !== 0) {
                return match;
            }
            var tag = group.replace('tag_', '');
            if (!series.tags) {
                return match;
            }
            return series.tags[tag];
        });
    };
    InfluxSeries.prototype.getAnnotations = function () {
        var _this = this;
        var list = [];
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.series, function (series) {
            var titleCol = null;
            var timeCol = null;
            var tagsCol = [];
            var textCol = null;
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(series.columns, function (column, index) {
                if (column === 'time') {
                    timeCol = index;
                    return;
                }
                if (column === 'sequence_number') {
                    return;
                }
                if (column === _this.annotation.titleColumn) {
                    titleCol = index;
                    return;
                }
                if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes((_this.annotation.tagsColumn || '').replace(' ', '').split(','), column)) {
                    tagsCol.push(index);
                    return;
                }
                if (column === _this.annotation.textColumn) {
                    textCol = index;
                    return;
                }
                // legacy case
                if (!titleCol && textCol !== index) {
                    titleCol = index;
                }
            });
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(series.values, function (value) {
                var data = {
                    annotation: _this.annotation,
                    time: +new Date(value[timeCol]),
                    title: value[titleCol],
                    // Remove empty values, then split in different tags for comma separated values
                    tags: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.flatten(tagsCol
                        .filter(function (t) {
                        return value[t];
                    })
                        .map(function (t) {
                        return value[t].split(',');
                    })),
                    text: value[textCol],
                };
                list.push(data);
            });
        });
        return list;
    };
    InfluxSeries.prototype.getTable = function () {
        var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_1__["default"]();
        var i, j;
        if (this.series.length === 0) {
            return table;
        }
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(this.series, function (series, seriesIndex) {
            if (seriesIndex === 0) {
                j = 0;
                // Check that the first column is indeed 'time'
                if (series.columns[0] === 'time') {
                    // Push this now before the tags and with the right type
                    table.columns.push({ text: 'Time', type: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["FieldType"].time });
                    j++;
                }
                lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.keys(series.tags), function (key) {
                    table.columns.push({ text: key });
                });
                for (; j < series.columns.length; j++) {
                    table.columns.push({ text: series.columns[j] });
                }
            }
            if (series.values) {
                for (i = 0; i < series.values.length; i++) {
                    var values = series.values[i];
                    var reordered = [values[0]];
                    if (series.tags) {
                        for (var key in series.tags) {
                            if (series.tags.hasOwnProperty(key)) {
                                reordered.push(series.tags[key]);
                            }
                        }
                    }
                    for (j = 1; j < values.length; j++) {
                        reordered.push(values[j]);
                    }
                    table.rows.push(reordered);
                }
            }
        });
        return table;
    };
    return InfluxSeries;
}());
/* harmony default export */ __webpack_exports__["default"] = (InfluxSeries);


/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/module.ts":
/*!**********************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/module.ts ***!
  \**********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/influxdb/datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/influxdb/query_ctrl.ts");
/* harmony import */ var _components_InfluxLogsQueryField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/InfluxLogsQueryField */ "./public/app/plugins/datasource/influxdb/components/InfluxLogsQueryField.tsx");
/* harmony import */ var _components_InfluxStartPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/InfluxStartPage */ "./public/app/plugins/datasource/influxdb/components/InfluxStartPage.tsx");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _components_ConfigEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ConfigEditor */ "./public/app/plugins/datasource/influxdb/components/ConfigEditor.tsx");






var InfluxAnnotationsQueryCtrl = /** @class */ (function () {
    function InfluxAnnotationsQueryCtrl() {
    }
    InfluxAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return InfluxAnnotationsQueryCtrl;
}());
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_4__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_0__["default"])
    .setConfigEditor(_components_ConfigEditor__WEBPACK_IMPORTED_MODULE_5__["default"])
    .setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_1__["InfluxQueryCtrl"])
    .setAnnotationQueryCtrl(InfluxAnnotationsQueryCtrl)
    .setExploreLogsQueryField(_components_InfluxLogsQueryField__WEBPACK_IMPORTED_MODULE_2__["InfluxLogsQueryField"])
    .setExploreStartPage(_components_InfluxStartPage__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/query_builder.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/query_builder.ts ***!
  \*****************************************************************/
/*! exports provided: InfluxQueryBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfluxQueryBuilder", function() { return InfluxQueryBuilder; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/utils/kbn */ "./public/app/core/utils/kbn.ts");


function renderTagCondition(tag, index) {
    var str = '';
    var operator = tag.operator;
    var value = tag.value;
    if (index > 0) {
        str = (tag.condition || 'AND') + ' ';
    }
    if (!operator) {
        if (/^\/.*\/$/.test(tag.value)) {
            operator = '=~';
        }
        else {
            operator = '=';
        }
    }
    // quote value unless regex or number
    if (operator !== '=~' && operator !== '!~' && isNaN(+value)) {
        value = "'" + value + "'";
    }
    return str + '"' + tag.key + '" ' + operator + ' ' + value;
}
var InfluxQueryBuilder = /** @class */ (function () {
    function InfluxQueryBuilder(target, database) {
        this.target = target;
        this.database = database;
    }
    InfluxQueryBuilder.prototype.buildExploreQuery = function (type, withKey, withMeasurementFilter) {
        var query;
        var measurement;
        var policy;
        if (type === 'TAG_KEYS') {
            query = 'SHOW TAG KEYS';
            measurement = this.target.measurement;
            policy = this.target.policy;
        }
        else if (type === 'TAG_VALUES') {
            query = 'SHOW TAG VALUES';
            measurement = this.target.measurement;
            policy = this.target.policy;
        }
        else if (type === 'MEASUREMENTS') {
            query = 'SHOW MEASUREMENTS';
            if (withMeasurementFilter) {
                query += ' WITH MEASUREMENT =~ /' + app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_1__["default"].regexEscape(withMeasurementFilter) + '/';
            }
        }
        else if (type === 'FIELDS') {
            measurement = this.target.measurement;
            policy = this.target.policy;
            if (!measurement.match('^/.*/')) {
                measurement = '"' + measurement + '"';
                if (policy && policy !== 'default') {
                    policy = '"' + policy + '"';
                    measurement = policy + '.' + measurement;
                }
            }
            return 'SHOW FIELD KEYS FROM ' + measurement;
        }
        else if (type === 'RETENTION POLICIES') {
            query = 'SHOW RETENTION POLICIES on "' + this.database + '"';
            return query;
        }
        if (measurement) {
            if (!measurement.match('^/.*/') && !measurement.match(/^merge\(.*\)/)) {
                measurement = '"' + measurement + '"';
            }
            if (policy && policy !== 'default') {
                policy = '"' + policy + '"';
                measurement = policy + '.' + measurement;
            }
            query += ' FROM ' + measurement;
        }
        if (withKey) {
            query += ' WITH KEY = "' + withKey + '"';
        }
        if (this.target.tags && this.target.tags.length > 0) {
            var whereConditions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(this.target.tags, function (memo, tag) {
                // do not add a condition for the key we want to explore for
                if (tag.key === withKey) {
                    return memo;
                }
                memo.push(renderTagCondition(tag, memo.length));
                return memo;
            }, []);
            if (whereConditions.length > 0) {
                query += ' WHERE ' + whereConditions.join(' ');
            }
        }
        if (type === 'MEASUREMENTS') {
            query += ' LIMIT 100';
            //Solve issue #2524 by limiting the number of measurements returned
            //LIMIT must be after WITH MEASUREMENT and WHERE clauses
            //This also could be used for TAG KEYS and TAG VALUES, if desired
        }
        return query;
    };
    return InfluxQueryBuilder;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/query_ctrl.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/query_ctrl.ts ***!
  \**************************************************************/
/*! exports provided: InfluxQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfluxQueryCtrl", function() { return InfluxQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _query_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./query_builder */ "./public/app/plugins/datasource/influxdb/query_builder.ts");
/* harmony import */ var _influx_query_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./influx_query_model */ "./public/app/plugins/datasource/influxdb/influx_query_model.ts");
/* harmony import */ var _query_part__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./query_part */ "./public/app/plugins/datasource/influxdb/query_part.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");







var InfluxQueryCtrl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InfluxQueryCtrl, _super);
    /** @ngInject */
    function InfluxQueryCtrl($scope, $injector, templateSrv, uiSegmentSrv) {
        var e_1, _a;
        var _this = _super.call(this, $scope, $injector) || this;
        _this.templateSrv = templateSrv;
        _this.uiSegmentSrv = uiSegmentSrv;
        _this.target = _this.target;
        _this.queryModel = new _influx_query_model__WEBPACK_IMPORTED_MODULE_4__["default"](_this.target, templateSrv, _this.panel.scopedVars);
        _this.queryBuilder = new _query_builder__WEBPACK_IMPORTED_MODULE_3__["InfluxQueryBuilder"](_this.target, _this.datasource.database);
        _this.groupBySegment = _this.uiSegmentSrv.newPlusButton();
        _this.resultFormats = [
            { text: 'Time series', value: 'time_series' },
            { text: 'Table', value: 'table' },
        ];
        _this.policySegment = uiSegmentSrv.newSegment(_this.target.policy);
        if (!_this.target.measurement) {
            _this.measurementSegment = uiSegmentSrv.newSelectMeasurement();
        }
        else {
            _this.measurementSegment = uiSegmentSrv.newSegment(_this.target.measurement);
        }
        _this.tagSegments = [];
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.target.tags), _c = _b.next(); !_c.done; _c = _b.next()) {
                var tag = _c.value;
                if (!tag.operator) {
                    if (/^\/.*\/$/.test(tag.value)) {
                        tag.operator = '=~';
                    }
                    else {
                        tag.operator = '=';
                    }
                }
                if (tag.condition) {
                    _this.tagSegments.push(uiSegmentSrv.newCondition(tag.condition));
                }
                _this.tagSegments.push(uiSegmentSrv.newKey(tag.key));
                _this.tagSegments.push(uiSegmentSrv.newOperator(tag.operator));
                _this.tagSegments.push(uiSegmentSrv.newKeyValue(tag.value));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        _this.fixTagSegments();
        _this.buildSelectMenu();
        _this.removeTagFilterSegment = uiSegmentSrv.newSegment({
            fake: true,
            value: '-- remove tag filter --',
        });
        return _this;
    }
    InfluxQueryCtrl.prototype.removeOrderByTime = function () {
        this.target.orderByTime = 'ASC';
    };
    InfluxQueryCtrl.prototype.buildSelectMenu = function () {
        var categories = _query_part__WEBPACK_IMPORTED_MODULE_5__["default"].getCategories();
        this.selectMenu = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.reduce(categories, function (memo, cat, key) {
            var menu = {
                text: key,
                submenu: cat.map(function (item) {
                    return { text: item.type, value: item.type };
                }),
            };
            memo.push(menu);
            return memo;
        }, []);
    };
    InfluxQueryCtrl.prototype.getGroupByOptions = function () {
        var _this = this;
        var query = this.queryBuilder.buildExploreQuery('TAG_KEYS');
        return this.datasource
            .metricFindQuery(query)
            .then(function (tags) {
            var e_2, _a;
            var options = [];
            if (!_this.queryModel.hasFill()) {
                options.push(_this.uiSegmentSrv.newSegment({ value: 'fill(null)' }));
            }
            if (!_this.target.limit) {
                options.push(_this.uiSegmentSrv.newSegment({ value: 'LIMIT' }));
            }
            if (!_this.target.slimit) {
                options.push(_this.uiSegmentSrv.newSegment({ value: 'SLIMIT' }));
            }
            if (!_this.target.tz) {
                options.push(_this.uiSegmentSrv.newSegment({ value: 'tz' }));
            }
            if (_this.target.orderByTime === 'ASC') {
                options.push(_this.uiSegmentSrv.newSegment({ value: 'ORDER BY time DESC' }));
            }
            if (!_this.queryModel.hasGroupByTime()) {
                options.push(_this.uiSegmentSrv.newSegment({ value: 'time($interval)' }));
            }
            try {
                for (var tags_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(tags), tags_1_1 = tags_1.next(); !tags_1_1.done; tags_1_1 = tags_1.next()) {
                    var tag = tags_1_1.value;
                    options.push(_this.uiSegmentSrv.newSegment({ value: 'tag(' + tag.text + ')' }));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (tags_1_1 && !tags_1_1.done && (_a = tags_1.return)) _a.call(tags_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return options;
        })
            .catch(this.handleQueryError.bind(this));
    };
    InfluxQueryCtrl.prototype.groupByAction = function () {
        switch (this.groupBySegment.value) {
            case 'LIMIT': {
                this.target.limit = 10;
                break;
            }
            case 'SLIMIT': {
                this.target.slimit = 10;
                break;
            }
            case 'tz': {
                this.target.tz = 'UTC';
                break;
            }
            case 'ORDER BY time DESC': {
                this.target.orderByTime = 'DESC';
                break;
            }
            default: {
                this.queryModel.addGroupBy(this.groupBySegment.value);
            }
        }
        var plusButton = this.uiSegmentSrv.newPlusButton();
        this.groupBySegment.value = plusButton.value;
        this.groupBySegment.html = plusButton.html;
        this.panelCtrl.refresh();
    };
    InfluxQueryCtrl.prototype.addSelectPart = function (selectParts, cat, subitem) {
        this.queryModel.addSelectPart(selectParts, subitem.value);
        this.panelCtrl.refresh();
    };
    InfluxQueryCtrl.prototype.handleSelectPartEvent = function (selectParts, part, evt) {
        switch (evt.name) {
            case 'get-param-options': {
                var fieldsQuery = this.queryBuilder.buildExploreQuery('FIELDS');
                return this.datasource
                    .metricFindQuery(fieldsQuery)
                    .then(this.transformToSegments(true))
                    .catch(this.handleQueryError.bind(this));
            }
            case 'part-param-changed': {
                this.panelCtrl.refresh();
                break;
            }
            case 'action': {
                this.queryModel.removeSelectPart(selectParts, part);
                this.panelCtrl.refresh();
                break;
            }
            case 'get-part-actions': {
                return Promise.resolve([{ text: 'Remove', value: 'remove-part' }]);
            }
        }
    };
    InfluxQueryCtrl.prototype.handleGroupByPartEvent = function (part, index, evt) {
        switch (evt.name) {
            case 'get-param-options': {
                var tagsQuery = this.queryBuilder.buildExploreQuery('TAG_KEYS');
                return this.datasource
                    .metricFindQuery(tagsQuery)
                    .then(this.transformToSegments(true))
                    .catch(this.handleQueryError.bind(this));
            }
            case 'part-param-changed': {
                this.panelCtrl.refresh();
                break;
            }
            case 'action': {
                this.queryModel.removeGroupByPart(part, index);
                this.panelCtrl.refresh();
                break;
            }
            case 'get-part-actions': {
                return Promise.resolve([{ text: 'Remove', value: 'remove-part' }]);
            }
        }
    };
    InfluxQueryCtrl.prototype.fixTagSegments = function () {
        var count = this.tagSegments.length;
        var lastSegment = this.tagSegments[Math.max(count - 1, 0)];
        if (!lastSegment || lastSegment.type !== 'plus-button') {
            this.tagSegments.push(this.uiSegmentSrv.newPlusButton());
        }
    };
    InfluxQueryCtrl.prototype.measurementChanged = function () {
        this.target.measurement = this.measurementSegment.value;
        this.panelCtrl.refresh();
    };
    InfluxQueryCtrl.prototype.getPolicySegments = function () {
        var policiesQuery = this.queryBuilder.buildExploreQuery('RETENTION POLICIES');
        return this.datasource
            .metricFindQuery(policiesQuery)
            .then(this.transformToSegments(false))
            .catch(this.handleQueryError.bind(this));
    };
    InfluxQueryCtrl.prototype.policyChanged = function () {
        this.target.policy = this.policySegment.value;
        this.panelCtrl.refresh();
    };
    InfluxQueryCtrl.prototype.toggleEditorMode = function () {
        try {
            this.target.query = this.queryModel.render(false);
        }
        catch (err) {
            console.log('query render error');
        }
        this.target.rawQuery = !this.target.rawQuery;
    };
    InfluxQueryCtrl.prototype.getMeasurements = function (measurementFilter) {
        var query = this.queryBuilder.buildExploreQuery('MEASUREMENTS', undefined, measurementFilter);
        return this.datasource
            .metricFindQuery(query)
            .then(this.transformToSegments(true))
            .catch(this.handleQueryError.bind(this));
    };
    InfluxQueryCtrl.prototype.handleQueryError = function (err) {
        this.error = err.message || 'Failed to issue metric query';
        return [];
    };
    InfluxQueryCtrl.prototype.transformToSegments = function (addTemplateVars) {
        var _this = this;
        return function (results) {
            var e_3, _a;
            var segments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(results, function (segment) {
                return _this.uiSegmentSrv.newSegment({
                    value: segment.text,
                    expandable: segment.expandable,
                });
            });
            if (addTemplateVars) {
                try {
                    for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.templateSrv.variables), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var variable = _c.value;
                        segments.unshift(_this.uiSegmentSrv.newSegment({
                            type: 'value',
                            value: '/^$' + variable.name + '$/',
                            expandable: true,
                        }));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            return segments;
        };
    };
    InfluxQueryCtrl.prototype.getTagsOrValues = function (segment, index) {
        var _this = this;
        if (segment.type === 'condition') {
            return Promise.resolve([this.uiSegmentSrv.newSegment('AND'), this.uiSegmentSrv.newSegment('OR')]);
        }
        if (segment.type === 'operator') {
            var nextValue = this.tagSegments[index + 1].value;
            if (/^\/.*\/$/.test(nextValue)) {
                return Promise.resolve(this.uiSegmentSrv.newOperators(['=~', '!~']));
            }
            else {
                return Promise.resolve(this.uiSegmentSrv.newOperators(['=', '!=', '<>', '<', '>']));
            }
        }
        var query, addTemplateVars;
        if (segment.type === 'key' || segment.type === 'plus-button') {
            query = this.queryBuilder.buildExploreQuery('TAG_KEYS');
            addTemplateVars = false;
        }
        else if (segment.type === 'value') {
            query = this.queryBuilder.buildExploreQuery('TAG_VALUES', this.tagSegments[index - 2].value);
            addTemplateVars = true;
        }
        return this.datasource
            .metricFindQuery(query)
            .then(this.transformToSegments(addTemplateVars))
            .then(function (results) {
            if (segment.type === 'key') {
                results.splice(0, 0, angular__WEBPACK_IMPORTED_MODULE_1___default.a.copy(_this.removeTagFilterSegment));
            }
            return results;
        })
            .catch(this.handleQueryError.bind(this));
    };
    InfluxQueryCtrl.prototype.getFieldSegments = function () {
        var fieldsQuery = this.queryBuilder.buildExploreQuery('FIELDS');
        return this.datasource
            .metricFindQuery(fieldsQuery)
            .then(this.transformToSegments(false))
            .catch(this.handleQueryError);
    };
    InfluxQueryCtrl.prototype.tagSegmentUpdated = function (segment, index) {
        this.tagSegments[index] = segment;
        // handle remove tag condition
        if (segment.value === this.removeTagFilterSegment.value) {
            this.tagSegments.splice(index, 3);
            if (this.tagSegments.length === 0) {
                this.tagSegments.push(this.uiSegmentSrv.newPlusButton());
            }
            else if (this.tagSegments.length > 2) {
                this.tagSegments.splice(Math.max(index - 1, 0), 1);
                if (this.tagSegments[this.tagSegments.length - 1].type !== 'plus-button') {
                    this.tagSegments.push(this.uiSegmentSrv.newPlusButton());
                }
            }
        }
        else {
            if (segment.type === 'plus-button') {
                if (index > 2) {
                    this.tagSegments.splice(index, 0, this.uiSegmentSrv.newCondition('AND'));
                }
                this.tagSegments.push(this.uiSegmentSrv.newOperator('='));
                this.tagSegments.push(this.uiSegmentSrv.newFake('select tag value', 'value', 'query-segment-value'));
                segment.type = 'key';
                segment.cssClass = 'query-segment-key';
            }
            if (index + 1 === this.tagSegments.length) {
                this.tagSegments.push(this.uiSegmentSrv.newPlusButton());
            }
        }
        this.rebuildTargetTagConditions();
    };
    InfluxQueryCtrl.prototype.rebuildTargetTagConditions = function () {
        var _this = this;
        var tags = [];
        var tagIndex = 0;
        var tagOperator = '';
        lodash__WEBPACK_IMPORTED_MODULE_2___default.a.each(this.tagSegments, function (segment2, index) {
            if (segment2.type === 'key') {
                if (tags.length === 0) {
                    tags.push({});
                }
                tags[tagIndex].key = segment2.value;
            }
            else if (segment2.type === 'value') {
                tagOperator = _this.getTagValueOperator(segment2.value, tags[tagIndex].operator);
                if (tagOperator) {
                    _this.tagSegments[index - 1] = _this.uiSegmentSrv.newOperator(tagOperator);
                    tags[tagIndex].operator = tagOperator;
                }
                tags[tagIndex].value = segment2.value;
            }
            else if (segment2.type === 'condition') {
                tags.push({ condition: segment2.value });
                tagIndex += 1;
            }
            else if (segment2.type === 'operator') {
                tags[tagIndex].operator = segment2.value;
            }
        });
        this.target.tags = tags;
        this.panelCtrl.refresh();
    };
    InfluxQueryCtrl.prototype.getTagValueOperator = function (tagValue, tagOperator) {
        if (tagOperator !== '=~' && tagOperator !== '!~' && /^\/.*\/$/.test(tagValue)) {
            return '=~';
        }
        else if ((tagOperator === '=~' || tagOperator === '!~') && /^(?!\/.*\/$)/.test(tagValue)) {
            return '=';
        }
        return null;
    };
    InfluxQueryCtrl.prototype.getCollapsedText = function () {
        return this.queryModel.render(false);
    };
    InfluxQueryCtrl.templateUrl = 'partials/query.editor.html';
    return InfluxQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_6__["QueryCtrl"]));



/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/query_part.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/query_part.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/components/query_part/query_part */ "./public/app/core/components/query_part/query_part.ts");


var index = [];
var categories = {
    Aggregations: [],
    Selectors: [],
    Transformations: [],
    Predictors: [],
    Math: [],
    Aliasing: [],
    Fields: [],
};
function createPart(part) {
    var def = index[part.type];
    if (!def) {
        throw { message: 'Could not find query part ' + part.type };
    }
    return new app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["QueryPart"](part, def);
}
function register(options) {
    index[options.type] = new app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["QueryPartDef"](options);
    options.category.push(index[options.type]);
}
var groupByTimeFunctions = [];
function aliasRenderer(part, innerExpr) {
    return innerExpr + ' AS ' + '"' + part.params[0] + '"';
}
function fieldRenderer(part, innerExpr) {
    if (part.params[0] === '*') {
        return '*';
    }
    return '"' + part.params[0] + '"';
}
function replaceAggregationAddStrategy(selectParts, partModel) {
    // look for existing aggregation
    for (var i = 0; i < selectParts.length; i++) {
        var part = selectParts[i];
        if (part.def.category === categories.Aggregations) {
            if (part.def.type === partModel.def.type) {
                return;
            }
            // count distinct is allowed
            if (part.def.type === 'count' && partModel.def.type === 'distinct') {
                break;
            }
            // remove next aggregation if distinct was replaced
            if (part.def.type === 'distinct') {
                var morePartsAvailable = selectParts.length >= i + 2;
                if (partModel.def.type !== 'count' && morePartsAvailable) {
                    var nextPart = selectParts[i + 1];
                    if (nextPart.def.category === categories.Aggregations) {
                        selectParts.splice(i + 1, 1);
                    }
                }
                else if (partModel.def.type === 'count') {
                    if (!morePartsAvailable || selectParts[i + 1].def.type !== 'count') {
                        selectParts.splice(i + 1, 0, partModel);
                    }
                    return;
                }
            }
            selectParts[i] = partModel;
            return;
        }
        if (part.def.category === categories.Selectors) {
            selectParts[i] = partModel;
            return;
        }
    }
    selectParts.splice(1, 0, partModel);
}
function addTransformationStrategy(selectParts, partModel) {
    var i;
    // look for index to add transformation
    for (i = 0; i < selectParts.length; i++) {
        var part = selectParts[i];
        if (part.def.category === categories.Math || part.def.category === categories.Aliasing) {
            break;
        }
    }
    selectParts.splice(i, 0, partModel);
}
function addMathStrategy(selectParts, partModel) {
    var partCount = selectParts.length;
    if (partCount > 0) {
        // if last is math, replace it
        if (selectParts[partCount - 1].def.type === 'math') {
            selectParts[partCount - 1] = partModel;
            return;
        }
        // if next to last is math, replace it
        if (partCount > 1 && selectParts[partCount - 2].def.type === 'math') {
            selectParts[partCount - 2] = partModel;
            return;
        }
        else if (selectParts[partCount - 1].def.type === 'alias') {
            // if last is alias add it before
            selectParts.splice(partCount - 1, 0, partModel);
            return;
        }
    }
    selectParts.push(partModel);
}
function addAliasStrategy(selectParts, partModel) {
    var partCount = selectParts.length;
    if (partCount > 0) {
        // if last is alias, replace it
        if (selectParts[partCount - 1].def.type === 'alias') {
            selectParts[partCount - 1] = partModel;
            return;
        }
    }
    selectParts.push(partModel);
}
function addFieldStrategy(selectParts, partModel, query) {
    // copy all parts
    var parts = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(selectParts, function (part) {
        return createPart({ type: part.def.type, params: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(part.params) });
    });
    query.selectModels.push(parts);
}
register({
    type: 'field',
    addStrategy: addFieldStrategy,
    category: categories.Fields,
    params: [{ type: 'field', dynamicLookup: true }],
    defaultParams: ['value'],
    renderer: fieldRenderer,
});
// Aggregations
register({
    type: 'count',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Aggregations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'distinct',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Aggregations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'integral',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Aggregations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'mean',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Aggregations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'median',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Aggregations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'mode',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Aggregations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'sum',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Aggregations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
// transformations
register({
    type: 'derivative',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [
        {
            name: 'duration',
            type: 'interval',
            options: ['1s', '10s', '1m', '5m', '10m', '15m', '1h'],
        },
    ],
    defaultParams: ['10s'],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'spread',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'non_negative_derivative',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [
        {
            name: 'duration',
            type: 'interval',
            options: ['1s', '10s', '1m', '5m', '10m', '15m', '1h'],
        },
    ],
    defaultParams: ['10s'],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'difference',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'non_negative_difference',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'moving_average',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [{ name: 'window', type: 'int', options: [5, 10, 20, 30, 40] }],
    defaultParams: [10],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'cumulative_sum',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'stddev',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'time',
    category: groupByTimeFunctions,
    params: [
        {
            name: 'interval',
            type: 'time',
            options: ['$__interval', '1s', '10s', '1m', '5m', '10m', '15m', '1h'],
        },
    ],
    defaultParams: ['$__interval'],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'fill',
    category: groupByTimeFunctions,
    params: [
        {
            name: 'fill',
            type: 'string',
            options: ['none', 'null', '0', 'previous', 'linear'],
        },
    ],
    defaultParams: ['null'],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'elapsed',
    addStrategy: addTransformationStrategy,
    category: categories.Transformations,
    params: [
        {
            name: 'duration',
            type: 'interval',
            options: ['1s', '10s', '1m', '5m', '10m', '15m', '1h'],
        },
    ],
    defaultParams: ['10s'],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
// predictions
register({
    type: 'holt_winters',
    addStrategy: addTransformationStrategy,
    category: categories.Predictors,
    params: [
        { name: 'number', type: 'int', options: [5, 10, 20, 30, 40] },
        { name: 'season', type: 'int', options: [0, 1, 2, 5, 10] },
    ],
    defaultParams: [10, 2],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'holt_winters_with_fit',
    addStrategy: addTransformationStrategy,
    category: categories.Predictors,
    params: [
        { name: 'number', type: 'int', options: [5, 10, 20, 30, 40] },
        { name: 'season', type: 'int', options: [0, 1, 2, 5, 10] },
    ],
    defaultParams: [10, 2],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
// Selectors
register({
    type: 'bottom',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Selectors,
    params: [{ name: 'count', type: 'int' }],
    defaultParams: [3],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'first',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Selectors,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'last',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Selectors,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'max',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Selectors,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'min',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Selectors,
    params: [],
    defaultParams: [],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'percentile',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Selectors,
    params: [{ name: 'nth', type: 'int' }],
    defaultParams: [95],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'top',
    addStrategy: replaceAggregationAddStrategy,
    category: categories.Selectors,
    params: [{ name: 'count', type: 'int' }],
    defaultParams: [3],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["functionRenderer"],
});
register({
    type: 'tag',
    category: groupByTimeFunctions,
    params: [{ name: 'tag', type: 'string', dynamicLookup: true }],
    defaultParams: ['tag'],
    renderer: fieldRenderer,
});
register({
    type: 'math',
    addStrategy: addMathStrategy,
    category: categories.Math,
    params: [{ name: 'expr', type: 'string' }],
    defaultParams: [' / 100'],
    renderer: app_core_components_query_part_query_part__WEBPACK_IMPORTED_MODULE_1__["suffixRenderer"],
});
register({
    type: 'alias',
    addStrategy: addAliasStrategy,
    category: categories.Aliasing,
    params: [{ name: 'name', type: 'string', quote: 'double' }],
    defaultParams: ['alias'],
    renderMode: 'suffix',
    renderer: aliasRenderer,
});
/* harmony default export */ __webpack_exports__["default"] = ({
    create: createPart,
    getCategories: function () {
        return categories;
    },
    replaceAggregationAdd: replaceAggregationAddStrategy,
});


/***/ }),

/***/ "./public/app/plugins/datasource/influxdb/response_parser.ts":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/influxdb/response_parser.ts ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var ResponseParser = /** @class */ (function () {
    function ResponseParser() {
    }
    ResponseParser.prototype.parse = function (query, results) {
        if (!results || results.results.length === 0) {
            return [];
        }
        var influxResults = results.results[0];
        if (!influxResults.series) {
            return [];
        }
        var normalizedQuery = query.toLowerCase();
        var isValueFirst = normalizedQuery.indexOf('show field keys') >= 0 || normalizedQuery.indexOf('show retention policies') >= 0;
        var res = {};
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(influxResults.series, function (serie) {
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(serie.values, function (value) {
                if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isArray(value)) {
                    // In general, there are 2 possible shapes for the returned value.
                    // The first one is a two-element array,
                    // where the first element is somewhat a metadata value:
                    // the tag name for SHOW TAG VALUES queries,
                    // the time field for SELECT queries, etc.
                    // The second shape is an one-element array,
                    // that is containing an immediate value.
                    // For example, SHOW FIELD KEYS queries return such shape.
                    // Note, pre-0.11 versions return
                    // the second shape for SHOW TAG VALUES queries
                    // (while the newer versions—first).
                    if (isValueFirst) {
                        addUnique(res, value[0]);
                    }
                    else if (value[1] !== undefined) {
                        addUnique(res, value[1]);
                    }
                    else {
                        addUnique(res, value[0]);
                    }
                }
                else {
                    addUnique(res, value);
                }
            });
        });
        // @ts-ignore problems with typings for this _.map only accepts [] but this needs to be object
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(res, function (value) {
            // @ts-ignore
            return { text: value.toString() };
        });
    };
    return ResponseParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (ResponseParser);
function addUnique(arr, value) {
    arr[value] = value;
}


/***/ })

}]);
//# sourceMappingURL=influxdbPlugin.6310f9af5345c722b930.js.map