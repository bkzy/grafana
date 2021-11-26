(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["inputDatasourcePlugin"],{

/***/ "./public/app/plugins/datasource/input/InputConfigEditor.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/plugins/datasource/input/InputConfigEditor.tsx ***!
  \*******************************************************************/
/*! exports provided: InputConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputConfigEditor", function() { return InputConfigEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./public/app/plugins/datasource/input/utils.ts");

// Libraries




var InputConfigEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InputConfigEditor, _super);
    function InputConfigEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            text: '',
        };
        _this.onSeriesParsed = function (data, text) {
            var _a = _this.props, options = _a.options, onOptionsChange = _a.onOptionsChange;
            if (!data) {
                data = [new _grafana_data__WEBPACK_IMPORTED_MODULE_3__["MutableDataFrame"]()];
            }
            // data is a property on 'jsonData'
            var jsonData = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options.jsonData), { data: data });
            onOptionsChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { jsonData: jsonData }));
            _this.setState({ text: text });
        };
        return _this;
    }
    InputConfigEditor.prototype.componentDidMount = function () {
        var options = this.props.options;
        if (options.jsonData.data) {
            var text = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["dataFrameToCSV"])(options.jsonData.data);
            this.setState({ text: text });
        }
    };
    InputConfigEditor.prototype.render = function () {
        var text = this.state.text;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h4", null, "Shared Data:"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Enter CSV"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["TableInputCSV"], { text: text, onSeriesParsed: this.onSeriesParsed, width: '100%', height: 200 })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "grafana-info-box" },
                "This data is stored in the datasource json and is returned to every user in the initial request for any datasource. This is an appropriate place to enter a few values. Large datasets will perform better in other datasources.",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", null, "NOTE:"),
                " Changes to this data will only be reflected after a browser refresh.")));
    };
    return InputConfigEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/input/InputDatasource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/input/InputDatasource.ts ***!
  \****************************************************************/
/*! exports provided: InputDatasource, describeDataFrame, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputDatasource", function() { return InputDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "describeDataFrame", function() { return describeDataFrame; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

// Types

var InputDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InputDatasource, _super);
    function InputDatasource(instanceSettings) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.data = [];
        if (instanceSettings.jsonData.data) {
            _this.data = instanceSettings.jsonData.data.map(function (v) { return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["toDataFrame"])(v); });
        }
        return _this;
    }
    /**
     * Convert a query to a simple text string
     */
    InputDatasource.prototype.getQueryDisplayText = function (query) {
        if (query.data) {
            return 'Panel Data: ' + describeDataFrame(query.data);
        }
        return "Shared Data From: " + this.name + " (" + describeDataFrame(this.data) + ")";
    };
    InputDatasource.prototype.metricFindQuery = function (query, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var e_1, _a, e_2, _b;
            var names = [];
            try {
                for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.data), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var series = _d.value;
                    try {
                        for (var _e = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(series.fields)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var field = _f.value;
                            // TODO, match query/options?
                            names.push({
                                text: field.name,
                            });
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
            resolve(names);
        });
    };
    InputDatasource.prototype.query = function (options) {
        var e_3, _a;
        var results = [];
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(options.targets), _c = _b.next(); !_c.done; _c = _b.next()) {
                var query = _c.value;
                if (query.hide) {
                    continue;
                }
                var data = this.data;
                if (query.data) {
                    data = query.data.map(function (v) { return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["toDataFrame"])(v); });
                }
                for (var i = 0; i < data.length; i++) {
                    results.push(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, data[i]), { refId: query.refId }));
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return Promise.resolve({ data: results });
    };
    InputDatasource.prototype.testDatasource = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var e_4, _a;
            var rowCount = 0;
            var info = _this.data.length + " Series:";
            try {
                for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var series = _c.value;
                    var length = series.length;
                    info += " [" + series.fields.length + " Fields, " + length + " Rows]";
                    rowCount += length;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            if (rowCount > 0) {
                resolve({
                    status: 'success',
                    message: info,
                });
            }
            reject({
                status: 'error',
                message: 'No Data Entered',
            });
        });
    };
    return InputDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]));

function getLength(data) {
    if (!data || !data.fields || !data.fields.length) {
        return 0;
    }
    if (data.hasOwnProperty('length')) {
        return data.length;
    }
    return data.fields[0].values.length;
}
function describeDataFrame(data) {
    if (!data || !data.length) {
        return '';
    }
    if (data.length > 1) {
        var count = data.reduce(function (acc, series) {
            return acc + getLength(series);
        }, 0);
        return data.length + " Series, " + count + " Rows";
    }
    var series = data[0];
    if (!series.fields) {
        return 'Missing Fields';
    }
    var length = getLength(series);
    return series.fields.length + " Fields, " + length + " Rows";
}
/* harmony default export */ __webpack_exports__["default"] = (InputDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/input/InputQueryEditor.tsx":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/input/InputQueryEditor.tsx ***!
  \******************************************************************/
/*! exports provided: InputQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputQueryEditor", function() { return InputQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _InputDatasource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputDatasource */ "./public/app/plugins/datasource/input/InputDatasource.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./public/app/plugins/datasource/input/utils.ts");

// Libraries

// Types




var options = [
    { value: 'panel', label: 'Panel', description: 'Save data in the panel configuration.' },
    { value: 'shared', label: 'Shared', description: 'Save data in the shared datasource object.' },
];
var InputQueryEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InputQueryEditor, _super);
    function InputQueryEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            text: '',
        };
        _this.onSourceChange = function (item) {
            var _a = _this.props, datasource = _a.datasource, query = _a.query, onChange = _a.onChange, onRunQuery = _a.onRunQuery;
            var data = undefined;
            if (item.value === 'panel') {
                if (query.data) {
                    return;
                }
                data = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(datasource.data);
                if (!data) {
                    data = [new _grafana_data__WEBPACK_IMPORTED_MODULE_4__["MutableDataFrame"]()];
                }
                _this.setState({ text: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["toCSV"])(data) });
            }
            onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { data: data }));
            onRunQuery();
        };
        _this.onSeriesParsed = function (data, text) {
            var _a = _this.props, query = _a.query, onChange = _a.onChange, onRunQuery = _a.onRunQuery;
            _this.setState({ text: text });
            if (!data) {
                data = [new _grafana_data__WEBPACK_IMPORTED_MODULE_4__["MutableDataFrame"]()];
            }
            onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { data: data }));
            onRunQuery();
        };
        return _this;
    }
    InputQueryEditor.prototype.onComponentDidMount = function () {
        var query = this.props.query;
        var text = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["dataFrameToCSV"])(query.data);
        this.setState({ text: text });
    };
    InputQueryEditor.prototype.render = function () {
        var _a = this.props, datasource = _a.datasource, query = _a.query;
        var id = datasource.id, name = datasource.name;
        var text = this.state.text;
        var selected = query.data ? options[0] : options[1];
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { width: 4 }, "Data"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], { width: 6, options: options, value: selected, onChange: this.onSourceChange }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "btn btn-link" }, query.data ? (Object(_InputDatasource__WEBPACK_IMPORTED_MODULE_2__["describeDataFrame"])(query.data)) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "datasources/edit/" + id + "/" },
                    name,
                    ": ",
                    Object(_InputDatasource__WEBPACK_IMPORTED_MODULE_2__["describeDataFrame"])(datasource.data),
                    " \u00A0\u00A0",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-pencil-square-o" }))))),
            query.data && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["TableInputCSV"], { text: text, onSeriesParsed: this.onSeriesParsed, width: '100%', height: 200 })));
    };
    return InputQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/input/module.ts":
/*!*******************************************************!*\
  !*** ./public/app/plugins/datasource/input/module.ts ***!
  \*******************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _InputDatasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputDatasource */ "./public/app/plugins/datasource/input/InputDatasource.ts");
/* harmony import */ var _InputQueryEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputQueryEditor */ "./public/app/plugins/datasource/input/InputQueryEditor.tsx");
/* harmony import */ var _InputConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InputConfigEditor */ "./public/app/plugins/datasource/input/InputConfigEditor.tsx");




var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["DataSourcePlugin"](_InputDatasource__WEBPACK_IMPORTED_MODULE_1__["InputDatasource"])
    .setConfigEditor(_InputConfigEditor__WEBPACK_IMPORTED_MODULE_3__["InputConfigEditor"])
    .setQueryEditor(_InputQueryEditor__WEBPACK_IMPORTED_MODULE_2__["InputQueryEditor"]);


/***/ }),

/***/ "./public/app/plugins/datasource/input/utils.ts":
/*!******************************************************!*\
  !*** ./public/app/plugins/datasource/input/utils.ts ***!
  \******************************************************/
/*! exports provided: dataFrameToCSV */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataFrameToCSV", function() { return dataFrameToCSV; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

function dataFrameToCSV(dto) {
    if (!dto || !dto.length) {
        return '';
    }
    return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["toCSV"])(dto.map(function (v) { return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["toDataFrame"])(v); }));
}


/***/ })

}]);
//# sourceMappingURL=inputDatasourcePlugin.6310f9af5345c722b930.js.map