(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["graphitePlugin"],{

/***/ "./public/app/core/utils/version.ts":
/*!******************************************!*\
  !*** ./public/app/core/utils/version.ts ***!
  \******************************************/
/*! exports provided: SemVersion, isVersionGtOrEq */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SemVersion", function() { return SemVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVersionGtOrEq", function() { return isVersionGtOrEq; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var versionPattern = /^(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:-([0-9A-Za-z\.]+))?/;
var SemVersion = /** @class */ (function () {
    function SemVersion(version) {
        var match = versionPattern.exec(version);
        if (match) {
            this.major = Number(match[1]);
            this.minor = Number(match[2] || 0);
            this.patch = Number(match[3] || 0);
            this.meta = match[4];
        }
    }
    SemVersion.prototype.isGtOrEq = function (version) {
        var compared = new SemVersion(version);
        for (var i = 0; i < this.comparable.length; ++i) {
            if (this.comparable[i] > compared.comparable[i]) {
                return true;
            }
            if (this.comparable[i] < compared.comparable[i]) {
                return false;
            }
        }
        return true;
    };
    SemVersion.prototype.isValid = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isNumber(this.major);
    };
    Object.defineProperty(SemVersion.prototype, "comparable", {
        get: function () {
            return [this.major, this.minor, this.patch];
        },
        enumerable: true,
        configurable: true
    });
    return SemVersion;
}());

function isVersionGtOrEq(a, b) {
    var aSemver = new SemVersion(a);
    return aSemver.isGtOrEq(b);
}


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/MetricTankMetaInspector.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/MetricTankMetaInspector.tsx ***!
  \****************************************************************************/
/*! exports provided: MetricTankMetaInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetricTankMetaInspector", function() { return MetricTankMetaInspector; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _meta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meta */ "./public/app/plugins/datasource/graphite/meta.ts");



var MetricTankMetaInspector = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MetricTankMetaInspector, _super);
    function MetricTankMetaInspector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { index: 0 };
        _this.renderInfo = function (info, frame) {
            var buckets = Object(_meta__WEBPACK_IMPORTED_MODULE_2__["parseSchemaRetentions"])(info['schema-retentions']);
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "Info"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, buckets.map(function (row) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: row.interval },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            row.interval,
                            " \u00A0"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            row.retention,
                            " \u00A0"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            row.chunkspan,
                            " \u00A0"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            row.numchunks,
                            " \u00A0"),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                            row.ready,
                            " \u00A0"))); }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("pre", null, JSON.stringify(info, null, 2))));
        };
        return _this;
    }
    MetricTankMetaInspector.prototype.render = function () {
        var _this = this;
        var _a;
        var data = this.props.data;
        if (!data || !data.length) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, "No Metadata");
        }
        var frame = data[this.state.index];
        var meta = (_a = frame.meta) === null || _a === void 0 ? void 0 : _a.custom;
        if (!meta || !meta.info) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, "No Metadatata on DataFrame");
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "MetricTank Request"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("pre", null, JSON.stringify(meta.request, null, 2)),
            meta.info.map(function (info) { return _this.renderInfo(info, frame); })));
    };
    return MetricTankMetaInspector;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/graphite/add_graphite_func.ts":
/*!*********************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/add_graphite_func.ts ***!
  \*********************************************************************/
/*! exports provided: graphiteAddFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphiteAddFunc", function() { return graphiteAddFunc; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tether_drop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tether-drop */ "./node_modules/tether-drop/dist/js/drop.js");
/* harmony import */ var tether_drop__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tether_drop__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");



// @ts-ignore


/** @ngInject */
function graphiteAddFunc($compile) {
    var inputTemplate = '<input type="text"' + ' class="gf-form-input"' + ' spellcheck="false" style="display:none"></input>';
    var buttonTemplate = '<a class="gf-form-label query-part dropdown-toggle"' +
        ' tabindex="1" gf-dropdown="functionMenu" data-toggle="dropdown">' +
        '<i class="fa fa-plus"></i></a>';
    return {
        link: function ($scope, elem) {
            var _this = this;
            var ctrl = $scope.ctrl;
            var $input = jquery__WEBPACK_IMPORTED_MODULE_2___default()(inputTemplate);
            var $button = jquery__WEBPACK_IMPORTED_MODULE_2___default()(buttonTemplate);
            $input.appendTo(elem);
            $button.appendTo(elem);
            ctrl.datasource.getFuncDefs().then(function (funcDefs) {
                var allFunctions = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(funcDefs, 'name').sort();
                $scope.functionMenu = createFunctionDropDownMenu(funcDefs);
                $input.attr('data-provide', 'typeahead');
                $input.typeahead({
                    source: allFunctions,
                    minLength: 1,
                    items: 10,
                    updater: function (value) {
                        var funcDef = ctrl.datasource.getFuncDef(value);
                        if (!funcDef) {
                            // try find close match
                            value = value.toLowerCase();
                            funcDef = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(allFunctions, function (funcName) {
                                return funcName.toLowerCase().indexOf(value) === 0;
                            });
                            if (!funcDef) {
                                return '';
                            }
                        }
                        $scope.$apply(function () {
                            ctrl.addFunction(funcDef);
                        });
                        $input.trigger('blur');
                        return '';
                    },
                });
                $button.click(function () {
                    $button.hide();
                    $input.show();
                    $input.focus();
                });
                $input.keyup(function () {
                    elem.toggleClass('open', $input.val() === '');
                });
                $input.blur(function () {
                    // clicking the function dropdown menu won't
                    // work if you remove class at once
                    setTimeout(function () {
                        $input.val('');
                        $input.hide();
                        $button.show();
                        elem.removeClass('open');
                    }, 200);
                });
                $compile(elem.contents())($scope);
            });
            var drop;
            var cleanUpDrop = function () {
                if (drop) {
                    drop.destroy();
                    drop = null;
                }
            };
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(elem)
                .on('mouseenter', 'ul.dropdown-menu li', function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
                var funcDef, shortDesc, contentElement, rst2html;
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cleanUpDrop();
                            try {
                                funcDef = ctrl.datasource.getFuncDef(jquery__WEBPACK_IMPORTED_MODULE_2___default()('a', this).text());
                            }
                            catch (e) {
                                // ignore
                            }
                            if (!(funcDef && funcDef.description)) return [3 /*break*/, 2];
                            shortDesc = funcDef.description;
                            if (shortDesc.length > 500) {
                                shortDesc = shortDesc.substring(0, 497) + '...';
                            }
                            contentElement = document.createElement('div');
                            return [4 /*yield*/, __webpack_require__.e(/*! import() | rst2html */ "rst2html").then(__webpack_require__.t.bind(null, /*! rst2html */ "./node_modules/rst2html/dist/rst2html.min.js", 7))];
                        case 1:
                            rst2html = (_a.sent()).default;
                            contentElement.innerHTML = '<h4>' + funcDef.name + '</h4>' + rst2html(shortDesc);
                            drop = new tether_drop__WEBPACK_IMPORTED_MODULE_3___default.a({
                                target: this,
                                content: contentElement,
                                classes: 'drop-popover',
                                openOn: 'always',
                                tetherOptions: {
                                    attachment: 'bottom left',
                                    targetAttachment: 'bottom right',
                                },
                            });
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); })
                .on('mouseout', 'ul.dropdown-menu li', function () {
                cleanUpDrop();
            });
            $scope.$on('$destroy', cleanUpDrop);
        },
    };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_4__["default"].directive('graphiteAddFunc', graphiteAddFunc);
function createFunctionDropDownMenu(funcDefs) {
    var categories = {};
    lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(funcDefs, function (funcDef) {
        if (!funcDef.category) {
            return;
        }
        if (!categories[funcDef.category]) {
            categories[funcDef.category] = [];
        }
        categories[funcDef.category].push({
            text: funcDef.name,
            click: "ctrl.addFunction('" + funcDef.name + "')",
        });
    });
    return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.sortBy(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(categories, function (submenu, category) {
        return {
            text: category,
            submenu: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.sortBy(submenu, 'text'),
        };
    }), 'text');
}


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/configuration/ConfigEditor.tsx":
/*!*******************************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/configuration/ConfigEditor.tsx ***!
  \*******************************************************************************/
/*! exports provided: ConfigEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigEditor", function() { return ConfigEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _GraphiteDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GraphiteDetails */ "./public/app/plugins/datasource/graphite/configuration/GraphiteDetails.tsx");



var ConfigEditor = function (props) {
    var options = props.options, onOptionsChange = props.onOptionsChange;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["DataSourceHttpSettings"], { defaultUrl: "http://localhost:8080", dataSourceConfig: options, onChange: onOptionsChange }),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GraphiteDetails__WEBPACK_IMPORTED_MODULE_2__["GraphiteDetails"], { value: options, onChange: onOptionsChange })));
};


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/configuration/GraphiteDetails.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/configuration/GraphiteDetails.tsx ***!
  \**********************************************************************************/
/*! exports provided: GraphiteDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphiteDetails", function() { return GraphiteDetails; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/graphite/types.ts");




var graphiteVersions = [
    { label: '0.9.x', value: '0.9' },
    { label: '1.0.x', value: '1.0' },
    { label: '1.1.x', value: '1.1' },
];
var graphiteTypes = Object.keys(_types__WEBPACK_IMPORTED_MODULE_3__["GraphiteType"]).map(function (key) { return ({
    label: key,
    value: _types__WEBPACK_IMPORTED_MODULE_3__["GraphiteType"][key],
}); });
var GraphiteDetails = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(GraphiteDetails, _super);
    function GraphiteDetails(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeHandler = function (key) { return function (newValue) {
            var _a;
            var _b = _this.props, value = _b.value, onChange = _b.onChange;
            onChange(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value), { jsonData: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, value.jsonData), (_a = {}, _a[key] = newValue.value, _a)) }));
        }; };
        _this.state = {
            showMetricTankHelp: false,
        };
        return _this;
    }
    GraphiteDetails.prototype.render = function () {
        var _this = this;
        var _a;
        var value = this.props.value;
        var showMetricTankHelp = this.state.showMetricTankHelp;
        var currentVersion = (_a = graphiteVersions.find(function (item) { return item.value === value.jsonData.graphiteVersion; }), (_a !== null && _a !== void 0 ? _a : graphiteVersions[2]));
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-heading" }, "Graphite details"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], { tooltip: "This option controls what functions are available in the Graphite query editor." }, "Version"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { value: currentVersion, options: graphiteVersions, width: 8, onChange: this.onChangeHandler('graphiteVersion') })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["FormLabel"], null, "Type"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { options: graphiteTypes, value: graphiteTypes.find(function (type) { return type.value === value.jsonData.graphiteType; }), width: 8, onChange: this.onChangeHandler('graphiteType') }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Button"], { style: { marginLeft: '8px', marginTop: '5px' }, variant: "secondary", size: "sm", onClick: function () {
                            return _this.setState(function (prevState) { return ({ showMetricTankHelp: !prevState.showMetricTankHelp }); });
                        } },
                        "Help ",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: showMetricTankHelp ? 'fa fa-caret-down' : 'fa fa-caret-right' }))),
                showMetricTankHelp && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "grafana-info-box m-t-2" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-body" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null,
                            "There are different types of Graphite compatible backends. Here you can specify the type you are using. If you are using",
                            ' ',
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "https://github.com/grafana/metrictank", className: "pointer", target: "_blank" }, "Metrictank"),
                            ' ',
                            "then select that here. This will enable Metrictank specific features like query processing meta data. Metrictank is a multi-tenant timeseries engine for Graphite and friends.")))))));
    };
    return GraphiteDetails;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/graphite/datasource.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/datasource.ts ***!
  \**************************************************************/
/*! exports provided: GraphiteDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphiteDatasource", function() { return GraphiteDatasource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_utils_version__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/utils/version */ "./public/app/core/utils/version.ts");
/* harmony import */ var _gfunc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gfunc */ "./public/app/plugins/datasource/graphite/gfunc.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/graphite/types.ts");
/* harmony import */ var _features_templating_variable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../features/templating/variable */ "./public/app/features/templating/variable.ts");





//Types


var GraphiteDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(GraphiteDatasource, _super);
    /** @ngInject */
    function GraphiteDatasource(instanceSettings, backendSrv, templateSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.funcDefs = null;
        _this.funcDefsPromise = null;
        _this.convertResponseToDataFrames = function (result) {
            var data = [];
            if (!result || !result.data) {
                return { data: data };
            }
            // Series are either at the root or under a node called 'series'
            var series = result.data.series || result.data;
            if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray(series)) {
                throw { message: 'Missing series in result', data: result };
            }
            for (var i = 0; i < series.length; i++) {
                var s = series[i];
                for (var y = 0; y < s.datapoints.length; y++) {
                    s.datapoints[y][1] *= 1000;
                }
                var frame = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["toDataFrame"])(s);
                // Metrictank metadata
                if (s.meta) {
                    frame.meta = {
                        datasource: _this.name,
                        custom: {
                            request: result.data.meta,
                            info: s.meta,
                        },
                    };
                }
                data.push(frame);
            }
            return { data: data };
        };
        _this.basicAuth = instanceSettings.basicAuth;
        _this.url = instanceSettings.url;
        _this.name = instanceSettings.name;
        _this.graphiteVersion = instanceSettings.jsonData.graphiteVersion || '0.9';
        _this.isMetricTank = instanceSettings.jsonData.graphiteType === _types__WEBPACK_IMPORTED_MODULE_5__["GraphiteType"].Metrictank;
        _this.supportsTags = supportsTags(_this.graphiteVersion);
        _this.cacheTimeout = instanceSettings.cacheTimeout;
        _this.withCredentials = instanceSettings.withCredentials;
        _this.funcDefs = null;
        _this.funcDefsPromise = null;
        _this._seriesRefLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return _this;
    }
    GraphiteDatasource.prototype.getQueryOptionsInfo = function () {
        return {
            maxDataPoints: true,
            cacheTimeout: true,
            links: [
                {
                    text: 'Help',
                    url: 'http://docs.grafana.org/features/datasources/graphite/#using-graphite-in-grafana',
                },
            ],
        };
    };
    GraphiteDatasource.prototype.query = function (options) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
            var graphOptions, params, httpOptions;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                graphOptions = {
                    from: this.translateTime(options.rangeRaw.from, false, options.timezone),
                    until: this.translateTime(options.rangeRaw.to, true, options.timezone),
                    targets: options.targets,
                    format: options.format,
                    cacheTimeout: options.cacheTimeout || this.cacheTimeout,
                    maxDataPoints: options.maxDataPoints,
                };
                params = this.buildGraphiteParams(graphOptions, options.scopedVars);
                if (params.length === 0) {
                    return [2 /*return*/, Promise.resolve({ data: [] })];
                }
                if (this.isMetricTank) {
                    params.push('meta=true');
                }
                httpOptions = {
                    method: 'POST',
                    url: '/render',
                    data: params.join('&'),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                };
                this.addTracingHeaders(httpOptions, options);
                if (options.panelId) {
                    httpOptions.requestId = this.name + '.panelId.' + options.panelId;
                }
                return [2 /*return*/, this.doGraphiteRequest(httpOptions).then(this.convertResponseToDataFrames)];
            });
        });
    };
    GraphiteDatasource.prototype.addTracingHeaders = function (httpOptions, options) {
        var proxyMode = !this.url.match(/^http/);
        if (proxyMode) {
            httpOptions.headers['X-Dashboard-Id'] = options.dashboardId;
            httpOptions.headers['X-Panel-Id'] = options.panelId;
        }
    };
    GraphiteDatasource.prototype.parseTags = function (tagString) {
        var tags = [];
        tags = tagString.split(',');
        if (tags.length === 1) {
            tags = tagString.split(' ');
            if (tags[0] === '') {
                tags = [];
            }
        }
        return tags;
    };
    GraphiteDatasource.prototype.interpolateVariablesInQueries = function (queries, scopedVars) {
        var _this = this;
        var expandedQueries = queries;
        if (queries && queries.length > 0) {
            expandedQueries = queries.map(function (query) {
                var expandedQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { datasource: _this.name, target: _this.templateSrv.replace(query.target, scopedVars) });
                return expandedQuery;
            });
        }
        return expandedQueries;
    };
    GraphiteDatasource.prototype.annotationQuery = function (options) {
        var _this = this;
        // Graphite metric as annotation
        if (options.annotation.target) {
            var target = this.templateSrv.replace(options.annotation.target, {}, 'glob');
            var graphiteQuery = {
                rangeRaw: options.rangeRaw,
                targets: [{ target: target }],
                format: 'json',
                maxDataPoints: 100,
            };
            return this.query(graphiteQuery).then(function (result) {
                var list = [];
                for (var i = 0; i < result.data.length; i++) {
                    var target_1 = result.data[i];
                    for (var y = 0; y < target_1.length; y++) {
                        var time = target_1.fields[1].values.get(y);
                        var value = target_1.fields[0].values.get(y);
                        if (!value) {
                            continue;
                        }
                        list.push({
                            annotation: options.annotation,
                            time: time,
                            title: target_1.name,
                        });
                    }
                }
                return list;
            });
        }
        else {
            // Graphite event as annotation
            var tags = this.templateSrv.replace(options.annotation.tags);
            return this.events({ range: options.rangeRaw, tags: tags }).then(function (results) {
                var list = [];
                for (var i = 0; i < results.data.length; i++) {
                    var e = results.data[i];
                    var tags_1 = e.tags;
                    if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(e.tags)) {
                        tags_1 = _this.parseTags(e.tags);
                    }
                    list.push({
                        annotation: options.annotation,
                        time: e.when * 1000,
                        title: e.what,
                        tags: tags_1,
                        text: e.data,
                    });
                }
                return list;
            });
        }
    };
    GraphiteDatasource.prototype.events = function (options) {
        try {
            var tags = '';
            if (options.tags) {
                tags = '&tags=' + options.tags;
            }
            return this.doGraphiteRequest({
                method: 'GET',
                url: '/events/get_data?from=' +
                    this.translateTime(options.range.from, false, options.timezone) +
                    '&until=' +
                    this.translateTime(options.range.to, true, options.timezone) +
                    tags,
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    GraphiteDatasource.prototype.targetContainsTemplate = function (target) {
        return this.templateSrv.variableExists(target.target);
    };
    GraphiteDatasource.prototype.translateTime = function (date, roundUp, timezone) {
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(date)) {
            if (date === 'now') {
                return 'now';
            }
            else if (date.indexOf('now-') >= 0 && date.indexOf('/') === -1) {
                date = date.substring(3);
                date = date.replace('m', 'min');
                date = date.replace('M', 'mon');
                return date;
            }
            date = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateMath"].parse(date, roundUp, timezone);
        }
        // graphite' s from filter is exclusive
        // here we step back one minute in order
        // to guarantee that we get all the data that
        // exists for the specified range
        if (roundUp) {
            if (date.get('s')) {
                date.add(1, 's');
            }
        }
        else if (roundUp === false) {
            if (date.get('s')) {
                date.subtract(1, 's');
            }
        }
        return date.unix();
    };
    GraphiteDatasource.prototype.metricFindQuery = function (query, optionalOptions) {
        var options = optionalOptions || {};
        var interpolatedQuery = this.templateSrv.replace(query, Object(_features_templating_variable__WEBPACK_IMPORTED_MODULE_6__["getSearchFilterScopedVar"])({ query: query, wildcardChar: '', options: optionalOptions }));
        // special handling for tag_values(<tag>[,<expression>]*), this is used for template variables
        var matches = interpolatedQuery.match(/^tag_values\(([^,]+)((, *[^,]+)*)\)$/);
        if (matches) {
            var expressions = [];
            var exprRegex = /, *([^,]+)/g;
            var match = exprRegex.exec(matches[2]);
            while (match !== null) {
                expressions.push(match[1]);
                match = exprRegex.exec(matches[2]);
            }
            options.limit = 10000;
            return this.getTagValuesAutoComplete(expressions, matches[1], undefined, options);
        }
        // special handling for tags(<expression>[,<expression>]*), this is used for template variables
        matches = interpolatedQuery.match(/^tags\(([^,]*)((, *[^,]+)*)\)$/);
        if (matches) {
            var expressions = [];
            if (matches[1]) {
                expressions.push(matches[1]);
                var exprRegex = /, *([^,]+)/g;
                var match = exprRegex.exec(matches[2]);
                while (match !== null) {
                    expressions.push(match[1]);
                    match = exprRegex.exec(matches[2]);
                }
            }
            options.limit = 10000;
            return this.getTagsAutoComplete(expressions, undefined, options);
        }
        interpolatedQuery = this.templateSrv.replace(query, Object(_features_templating_variable__WEBPACK_IMPORTED_MODULE_6__["getSearchFilterScopedVar"])({ query: query, wildcardChar: '*', options: optionalOptions }));
        var httpOptions = {
            method: 'POST',
            url: '/metrics/find',
            params: {},
            data: "query=" + interpolatedQuery,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            // for cancellations
            requestId: options.requestId,
        };
        if (options.range) {
            httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
            httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
        }
        return this.doGraphiteRequest(httpOptions).then(function (results) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(results.data, function (metric) {
                return {
                    text: metric.text,
                    expandable: metric.expandable ? true : false,
                };
            });
        });
    };
    GraphiteDatasource.prototype.getTags = function (optionalOptions) {
        var options = optionalOptions || {};
        var httpOptions = {
            method: 'GET',
            url: '/tags',
            // for cancellations
            requestId: options.requestId,
        };
        if (options.range) {
            httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
            httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
        }
        return this.doGraphiteRequest(httpOptions).then(function (results) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(results.data, function (tag) {
                return {
                    text: tag.tag,
                    id: tag.id,
                };
            });
        });
    };
    GraphiteDatasource.prototype.getTagValues = function (options) {
        if (options === void 0) { options = {}; }
        var httpOptions = {
            method: 'GET',
            url: '/tags/' + this.templateSrv.replace(options.key),
            // for cancellations
            requestId: options.requestId,
        };
        if (options.range) {
            httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
            httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
        }
        return this.doGraphiteRequest(httpOptions).then(function (results) {
            if (results.data && results.data.values) {
                return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(results.data.values, function (value) {
                    return {
                        text: value.value,
                        id: value.id,
                    };
                });
            }
            else {
                return [];
            }
        });
    };
    GraphiteDatasource.prototype.getTagsAutoComplete = function (expressions, tagPrefix, optionalOptions) {
        var _this = this;
        var options = optionalOptions || {};
        var httpOptions = {
            method: 'GET',
            url: '/tags/autoComplete/tags',
            params: {
                expr: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(expressions, function (expression) { return _this.templateSrv.replace((expression || '').trim()); }),
            },
            // for cancellations
            requestId: options.requestId,
        };
        if (tagPrefix) {
            httpOptions.params.tagPrefix = tagPrefix;
        }
        if (options.limit) {
            httpOptions.params.limit = options.limit;
        }
        if (options.range) {
            httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
            httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
        }
        return this.doGraphiteRequest(httpOptions).then(function (results) {
            if (results.data) {
                return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(results.data, function (tag) {
                    return { text: tag };
                });
            }
            else {
                return [];
            }
        });
    };
    GraphiteDatasource.prototype.getTagValuesAutoComplete = function (expressions, tag, valuePrefix, optionalOptions) {
        var _this = this;
        var options = optionalOptions || {};
        var httpOptions = {
            method: 'GET',
            url: '/tags/autoComplete/values',
            params: {
                expr: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(expressions, function (expression) { return _this.templateSrv.replace((expression || '').trim()); }),
                tag: this.templateSrv.replace((tag || '').trim()),
            },
            // for cancellations
            requestId: options.requestId,
        };
        if (valuePrefix) {
            httpOptions.params.valuePrefix = valuePrefix;
        }
        if (options.limit) {
            httpOptions.params.limit = options.limit;
        }
        if (options.range) {
            httpOptions.params.from = this.translateTime(options.range.from, false, options.timezone);
            httpOptions.params.until = this.translateTime(options.range.to, true, options.timezone);
        }
        return this.doGraphiteRequest(httpOptions).then(function (results) {
            if (results.data) {
                return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(results.data, function (value) {
                    return { text: value };
                });
            }
            else {
                return [];
            }
        });
    };
    GraphiteDatasource.prototype.getVersion = function (optionalOptions) {
        var options = optionalOptions || {};
        var httpOptions = {
            method: 'GET',
            url: '/version',
            requestId: options.requestId,
        };
        return this.doGraphiteRequest(httpOptions)
            .then(function (results) {
            if (results.data) {
                var semver = new app_core_utils_version__WEBPACK_IMPORTED_MODULE_3__["SemVersion"](results.data);
                return semver.isValid() ? results.data : '';
            }
            return '';
        })
            .catch(function () {
            return '';
        });
    };
    GraphiteDatasource.prototype.createFuncInstance = function (funcDef, options) {
        return _gfunc__WEBPACK_IMPORTED_MODULE_4__["default"].createFuncInstance(funcDef, options, this.funcDefs);
    };
    GraphiteDatasource.prototype.getFuncDef = function (name) {
        return _gfunc__WEBPACK_IMPORTED_MODULE_4__["default"].getFuncDef(name, this.funcDefs);
    };
    GraphiteDatasource.prototype.waitForFuncDefsLoaded = function () {
        return this.getFuncDefs();
    };
    GraphiteDatasource.prototype.getFuncDefs = function () {
        var _this = this;
        if (this.funcDefsPromise !== null) {
            return this.funcDefsPromise;
        }
        if (!supportsFunctionIndex(this.graphiteVersion)) {
            this.funcDefs = _gfunc__WEBPACK_IMPORTED_MODULE_4__["default"].getFuncDefs(this.graphiteVersion);
            this.funcDefsPromise = Promise.resolve(this.funcDefs);
            return this.funcDefsPromise;
        }
        var httpOptions = {
            method: 'GET',
            url: '/functions',
        };
        this.funcDefsPromise = this.doGraphiteRequest(httpOptions)
            .then(function (results) {
            if (results.status !== 200 || typeof results.data !== 'object') {
                _this.funcDefs = _gfunc__WEBPACK_IMPORTED_MODULE_4__["default"].getFuncDefs(_this.graphiteVersion);
            }
            else {
                _this.funcDefs = _gfunc__WEBPACK_IMPORTED_MODULE_4__["default"].parseFuncDefs(results.data);
            }
            return _this.funcDefs;
        })
            .catch(function (err) {
            console.log('Fetching graphite functions error', err);
            _this.funcDefs = _gfunc__WEBPACK_IMPORTED_MODULE_4__["default"].getFuncDefs(_this.graphiteVersion);
            return _this.funcDefs;
        });
        return this.funcDefsPromise;
    };
    GraphiteDatasource.prototype.testDatasource = function () {
        var query = {
            panelId: 3,
            rangeRaw: { from: 'now-1h', to: 'now' },
            targets: [{ target: 'constantLine(100)' }],
            maxDataPoints: 300,
        };
        return this.query(query).then(function () {
            return { status: 'success', message: 'Data source is working' };
        });
    };
    GraphiteDatasource.prototype.doGraphiteRequest = function (options) {
        if (this.basicAuth || this.withCredentials) {
            options.withCredentials = true;
        }
        if (this.basicAuth) {
            options.headers = options.headers || {};
            options.headers.Authorization = this.basicAuth;
        }
        options.url = this.url + options.url;
        options.inspect = { type: 'graphite' };
        return this.backendSrv.datasourceRequest(options);
    };
    GraphiteDatasource.prototype.buildGraphiteParams = function (options, scopedVars) {
        var graphiteOptions = ['from', 'until', 'rawData', 'format', 'maxDataPoints', 'cacheTimeout'];
        var cleanOptions = [], targets = {};
        var target, targetValue, i;
        var regex = /\#([A-Z])/g;
        var intervalFormatFixRegex = /'(\d+)m'/gi;
        var hasTargets = false;
        options['format'] = 'json';
        function fixIntervalFormat(match) {
            return match.replace('m', 'min').replace('M', 'mon');
        }
        for (i = 0; i < options.targets.length; i++) {
            target = options.targets[i];
            if (!target.target) {
                continue;
            }
            if (!target.refId) {
                target.refId = this._seriesRefLetters[i];
            }
            targetValue = this.templateSrv.replace(target.target, scopedVars);
            targetValue = targetValue.replace(intervalFormatFixRegex, fixIntervalFormat);
            targets[target.refId] = targetValue;
        }
        function nestedSeriesRegexReplacer(match, g1) {
            return targets[g1] || match;
        }
        for (i = 0; i < options.targets.length; i++) {
            target = options.targets[i];
            if (!target.target) {
                continue;
            }
            targetValue = targets[target.refId];
            targetValue = targetValue.replace(regex, nestedSeriesRegexReplacer);
            targets[target.refId] = targetValue;
            if (!target.hide) {
                hasTargets = true;
                cleanOptions.push('target=' + encodeURIComponent(targetValue));
            }
        }
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(options, function (value, key) {
            if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.indexOf(graphiteOptions, key) === -1) {
                return;
            }
            if (value) {
                cleanOptions.push(key + '=' + encodeURIComponent(value));
            }
        });
        if (!hasTargets) {
            return [];
        }
        return cleanOptions;
    };
    return GraphiteDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["DataSourceApi"]));

function supportsTags(version) {
    return Object(app_core_utils_version__WEBPACK_IMPORTED_MODULE_3__["isVersionGtOrEq"])(version, '1.1');
}
function supportsFunctionIndex(version) {
    return Object(app_core_utils_version__WEBPACK_IMPORTED_MODULE_3__["isVersionGtOrEq"])(version, '1.1');
}


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/func_editor.ts":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/func_editor.ts ***!
  \***************************************************************/
/*! exports provided: graphiteFuncEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphiteFuncEditor", function() { return graphiteFuncEditor; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");



/** @ngInject */
function graphiteFuncEditor($compile, templateSrv) {
    var funcSpanTemplate = "\n    <function-editor\n      func=\"func\"\n      onRemove=\"ctrl.handleRemoveFunction\"\n      onMoveLeft=\"ctrl.handleMoveLeft\"\n      onMoveRight=\"ctrl.handleMoveRight\"\n    /><span>(</span>\n  ";
    var paramTemplate = '<input type="text" style="display:none"' + ' class="input-small tight-form-func-param"></input>';
    return {
        restrict: 'A',
        link: function postLink($scope, elem) {
            var $funcLink = jquery__WEBPACK_IMPORTED_MODULE_1___default()(funcSpanTemplate);
            var ctrl = $scope.ctrl;
            var func = $scope.func;
            var scheduledRelink = false;
            var paramCountAtLink = 0;
            var cancelBlur = null;
            ctrl.handleRemoveFunction = function (func) {
                ctrl.removeFunction(func);
            };
            ctrl.handleMoveLeft = function (func) {
                ctrl.moveFunction(func, -1);
            };
            ctrl.handleMoveRight = function (func) {
                ctrl.moveFunction(func, 1);
            };
            function clickFuncParam(paramIndex) {
                /*jshint validthis:true */
                var $link = jquery__WEBPACK_IMPORTED_MODULE_1___default()(this);
                var $comma = $link.prev('.comma');
                var $input = $link.next();
                $input.val(func.params[paramIndex]);
                $comma.removeClass('query-part__last');
                $link.hide();
                $input.show();
                $input.focus();
                $input.select();
                var typeahead = $input.data('typeahead');
                if (typeahead) {
                    $input.val('');
                    typeahead.lookup();
                }
            }
            function scheduledRelinkIfNeeded() {
                if (paramCountAtLink === func.params.length) {
                    return;
                }
                if (!scheduledRelink) {
                    scheduledRelink = true;
                    setTimeout(function () {
                        relink();
                        scheduledRelink = false;
                    }, 200);
                }
            }
            function paramDef(index) {
                if (index < func.def.params.length) {
                    return func.def.params[index];
                }
                if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(func.def.params).multiple) {
                    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(func.def.params), { optional: true });
                }
                return {};
            }
            function switchToLink(inputElem, paramIndex) {
                /*jshint validthis:true */
                var $input = jquery__WEBPACK_IMPORTED_MODULE_1___default()(inputElem);
                clearTimeout(cancelBlur);
                cancelBlur = null;
                var $link = $input.prev();
                var $comma = $link.prev('.comma');
                var newValue = $input.val();
                // remove optional empty params
                if (newValue !== '' || paramDef(paramIndex).optional) {
                    func.updateParam(newValue, paramIndex);
                    $link.html(newValue ? templateSrv.highlightVariablesAsHtml(newValue) : '&nbsp;');
                }
                scheduledRelinkIfNeeded();
                $scope.$apply(function () {
                    ctrl.targetChanged();
                });
                if ($link.hasClass('query-part__last') && newValue === '') {
                    $comma.addClass('query-part__last');
                }
                else {
                    $link.removeClass('query-part__last');
                }
                $input.hide();
                $link.show();
            }
            // this = input element
            function inputBlur(paramIndex) {
                /*jshint validthis:true */
                var inputElem = this;
                // happens long before the click event on the typeahead options
                // need to have long delay because the blur
                cancelBlur = setTimeout(function () {
                    switchToLink(inputElem, paramIndex);
                }, 200);
            }
            function inputKeyPress(paramIndex, e) {
                /*jshint validthis:true */
                if (e.which === 13) {
                    jquery__WEBPACK_IMPORTED_MODULE_1___default()(this).blur();
                }
            }
            function inputKeyDown() {
                /*jshint validthis:true */
                this.style.width = (3 + this.value.length) * 8 + 'px';
            }
            function addTypeahead($input, paramIndex) {
                $input.attr('data-provide', 'typeahead');
                var options = paramDef(paramIndex).options;
                if (paramDef(paramIndex).type === 'int') {
                    options = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(options, function (val) {
                        return val.toString();
                    });
                }
                $input.typeahead({
                    source: options,
                    minLength: 0,
                    items: 20,
                    updater: function (value) {
                        $input.val(value);
                        switchToLink($input[0], paramIndex);
                        return value;
                    },
                });
                var typeahead = $input.data('typeahead');
                typeahead.lookup = function () {
                    this.query = this.$element.val() || '';
                    return this.process(this.source);
                };
            }
            function addElementsAndCompile() {
                $funcLink.appendTo(elem);
                var defParams = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(func.def.params);
                var lastParam = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(func.def.params);
                while (func.params.length >= defParams.length && lastParam && lastParam.multiple) {
                    defParams.push(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, lastParam, { optional: true }));
                }
                lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(defParams, function (param, index) {
                    if (param.optional && func.params.length < index) {
                        return false;
                    }
                    var paramValue = templateSrv.highlightVariablesAsHtml(func.params[index]);
                    var hasValue = paramValue !== null && paramValue !== undefined;
                    var last = index >= func.params.length - 1 && param.optional && !hasValue;
                    if (last && param.multiple) {
                        paramValue = '+';
                    }
                    if (index > 0) {
                        jquery__WEBPACK_IMPORTED_MODULE_1___default()('<span class="comma' + (last ? ' query-part__last' : '') + '">, </span>').appendTo(elem);
                    }
                    var $paramLink = jquery__WEBPACK_IMPORTED_MODULE_1___default()('<a ng-click="" class="graphite-func-param-link' +
                        (last ? ' query-part__last' : '') +
                        '">' +
                        (hasValue ? paramValue : '&nbsp;') +
                        '</a>');
                    var $input = jquery__WEBPACK_IMPORTED_MODULE_1___default()(paramTemplate);
                    $input.attr('placeholder', param.name);
                    paramCountAtLink++;
                    $paramLink.appendTo(elem);
                    $input.appendTo(elem);
                    $input.blur(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(inputBlur, index));
                    $input.keyup(inputKeyDown);
                    $input.keypress(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(inputKeyPress, index));
                    $paramLink.click(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.partial(clickFuncParam, index));
                    if (param.options) {
                        addTypeahead($input, index);
                    }
                    return true;
                });
                jquery__WEBPACK_IMPORTED_MODULE_1___default()('<span>)</span>').appendTo(elem);
                $compile(elem.contents())($scope);
            }
            function ifJustAddedFocusFirstParam() {
                if ($scope.func.added) {
                    $scope.func.added = false;
                    setTimeout(function () {
                        elem
                            .find('.graphite-func-param-link')
                            .first()
                            .click();
                    }, 10);
                }
            }
            function relink() {
                elem.children().remove();
                addElementsAndCompile();
                ifJustAddedFocusFirstParam();
            }
            relink();
        },
    };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_2__["default"].directive('graphiteFuncEditor', graphiteFuncEditor);


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/gfunc.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/gfunc.ts ***!
  \*********************************************************/
/*! exports provided: FuncInstance, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FuncInstance", function() { return FuncInstance; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_utils_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/utils/version */ "./public/app/core/utils/version.ts");


var index = {};
function addFuncDef(funcDef) {
    funcDef.params = funcDef.params || [];
    funcDef.defaultParams = funcDef.defaultParams || [];
    index[funcDef.name] = funcDef;
    if (funcDef.shortName) {
        index[funcDef.shortName] = funcDef;
    }
}
var optionalSeriesRefArgs = [{ name: 'other', type: 'value_or_series', optional: true, multiple: true }];
addFuncDef({
    name: 'scaleToSeconds',
    category: 'Transform',
    params: [{ name: 'seconds', type: 'int' }],
    defaultParams: [1],
});
addFuncDef({
    name: 'perSecond',
    category: 'Transform',
    params: [{ name: 'max value', type: 'int', optional: true }],
    defaultParams: [],
});
addFuncDef({
    name: 'holtWintersForecast',
    category: 'Calculate',
});
addFuncDef({
    name: 'holtWintersConfidenceBands',
    category: 'Calculate',
    params: [{ name: 'delta', type: 'int' }],
    defaultParams: [3],
});
addFuncDef({
    name: 'holtWintersAberration',
    category: 'Calculate',
    params: [{ name: 'delta', type: 'int' }],
    defaultParams: [3],
});
addFuncDef({
    name: 'nPercentile',
    category: 'Calculate',
    params: [{ name: 'Nth percentile', type: 'int' }],
    defaultParams: [95],
});
addFuncDef({
    name: 'diffSeries',
    params: optionalSeriesRefArgs,
    defaultParams: ['#A'],
    category: 'Combine',
});
addFuncDef({
    name: 'stddevSeries',
    params: optionalSeriesRefArgs,
    defaultParams: [''],
    category: 'Combine',
});
addFuncDef({
    name: 'divideSeries',
    params: optionalSeriesRefArgs,
    defaultParams: ['#A'],
    category: 'Combine',
});
addFuncDef({
    name: 'multiplySeries',
    params: optionalSeriesRefArgs,
    defaultParams: ['#A'],
    category: 'Combine',
});
addFuncDef({
    name: 'asPercent',
    params: optionalSeriesRefArgs,
    defaultParams: ['#A'],
    category: 'Combine',
});
addFuncDef({
    name: 'group',
    params: optionalSeriesRefArgs,
    defaultParams: ['#A', '#B'],
    category: 'Combine',
});
addFuncDef({
    name: 'sumSeries',
    shortName: 'sum',
    category: 'Combine',
    params: optionalSeriesRefArgs,
    defaultParams: [''],
});
addFuncDef({
    name: 'averageSeries',
    shortName: 'avg',
    category: 'Combine',
    params: optionalSeriesRefArgs,
    defaultParams: [''],
});
addFuncDef({
    name: 'rangeOfSeries',
    category: 'Combine',
});
addFuncDef({
    name: 'percentileOfSeries',
    category: 'Combine',
    params: [
        { name: 'n', type: 'int' },
        { name: 'interpolate', type: 'boolean', options: ['true', 'false'] },
    ],
    defaultParams: [95, 'false'],
});
addFuncDef({
    name: 'sumSeriesWithWildcards',
    category: 'Combine',
    params: [{ name: 'node', type: 'int', multiple: true }],
    defaultParams: [3],
});
addFuncDef({
    name: 'maxSeries',
    shortName: 'max',
    category: 'Combine',
});
addFuncDef({
    name: 'minSeries',
    shortName: 'min',
    category: 'Combine',
});
addFuncDef({
    name: 'averageSeriesWithWildcards',
    category: 'Combine',
    params: [{ name: 'node', type: 'int', multiple: true }],
    defaultParams: [3],
});
addFuncDef({
    name: 'alias',
    category: 'Alias',
    params: [{ name: 'alias', type: 'string' }],
    defaultParams: ['alias'],
});
addFuncDef({
    name: 'aliasSub',
    category: 'Alias',
    params: [
        { name: 'search', type: 'string' },
        { name: 'replace', type: 'string' },
    ],
    defaultParams: ['', '\\1'],
});
addFuncDef({
    name: 'consolidateBy',
    category: 'Special',
    params: [
        {
            name: 'function',
            type: 'string',
            options: ['sum', 'average', 'min', 'max'],
        },
    ],
    defaultParams: ['max'],
});
addFuncDef({
    name: 'cumulative',
    category: 'Special',
    params: [],
    defaultParams: [],
});
addFuncDef({
    name: 'groupByNode',
    category: 'Combine',
    params: [
        {
            name: 'node',
            type: 'int',
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
        },
        {
            name: 'function',
            type: 'string',
            options: ['sum', 'avg', 'maxSeries'],
        },
    ],
    defaultParams: [3, 'sum'],
});
addFuncDef({
    name: 'aliasByNode',
    category: 'Alias',
    params: [
        {
            name: 'node',
            type: 'int',
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
            multiple: true,
        },
    ],
    defaultParams: [3],
});
addFuncDef({
    name: 'substr',
    category: 'Special',
    params: [
        {
            name: 'start',
            type: 'int',
            options: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
        },
        {
            name: 'stop',
            type: 'int',
            options: [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
        },
    ],
    defaultParams: [0, 0],
});
addFuncDef({
    name: 'sortByName',
    category: 'Sorting',
    params: [
        {
            name: 'natural',
            type: 'boolean',
            options: ['true', 'false'],
            optional: true,
        },
    ],
    defaultParams: ['false'],
});
addFuncDef({
    name: 'sortByMaxima',
    category: 'Sorting',
});
addFuncDef({
    name: 'sortByMinima',
    category: 'Sorting',
});
addFuncDef({
    name: 'sortByTotal',
    category: 'Sorting',
});
addFuncDef({
    name: 'aliasByMetric',
    category: 'Alias',
});
addFuncDef({
    name: 'randomWalk',
    fake: true,
    category: 'Special',
    params: [{ name: 'name', type: 'string' }],
    defaultParams: ['randomWalk'],
});
addFuncDef({
    name: 'countSeries',
    category: 'Combine',
});
addFuncDef({
    name: 'constantLine',
    category: 'Special',
    params: [{ name: 'value', type: 'int' }],
    defaultParams: [10],
});
addFuncDef({
    name: 'cactiStyle',
    category: 'Special',
});
addFuncDef({
    name: 'keepLastValue',
    category: 'Transform',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [100],
});
addFuncDef({
    name: 'changed',
    category: 'Special',
    params: [],
    defaultParams: [],
});
addFuncDef({
    name: 'scale',
    category: 'Transform',
    params: [{ name: 'factor', type: 'int' }],
    defaultParams: [1],
});
addFuncDef({
    name: 'offset',
    category: 'Transform',
    params: [{ name: 'amount', type: 'int' }],
    defaultParams: [10],
});
addFuncDef({
    name: 'transformNull',
    category: 'Transform',
    params: [{ name: 'amount', type: 'int' }],
    defaultParams: [0],
});
addFuncDef({
    name: 'integral',
    category: 'Transform',
});
addFuncDef({
    name: 'derivative',
    category: 'Transform',
});
addFuncDef({
    name: 'nonNegativeDerivative',
    category: 'Transform',
    params: [{ name: 'max value or 0', type: 'int', optional: true }],
    defaultParams: [''],
});
addFuncDef({
    name: 'timeShift',
    category: 'Transform',
    params: [
        {
            name: 'amount',
            type: 'select',
            options: ['1h', '6h', '12h', '1d', '2d', '7d', '14d', '30d'],
        },
    ],
    defaultParams: ['1d'],
});
addFuncDef({
    name: 'timeStack',
    category: 'Transform',
    params: [
        {
            name: 'timeShiftUnit',
            type: 'select',
            options: ['1h', '6h', '12h', '1d', '2d', '7d', '14d', '30d'],
        },
        { name: 'timeShiftStart', type: 'int' },
        { name: 'timeShiftEnd', type: 'int' },
    ],
    defaultParams: ['1d', 0, 7],
});
addFuncDef({
    name: 'summarize',
    category: 'Transform',
    params: [
        { name: 'interval', type: 'string' },
        {
            name: 'func',
            type: 'select',
            options: ['sum', 'avg', 'min', 'max', 'last'],
        },
        {
            name: 'alignToFrom',
            type: 'boolean',
            optional: true,
            options: ['false', 'true'],
        },
    ],
    defaultParams: ['1h', 'sum', 'false'],
});
addFuncDef({
    name: 'smartSummarize',
    category: 'Transform',
    params: [
        { name: 'interval', type: 'string' },
        {
            name: 'func',
            type: 'select',
            options: ['sum', 'avg', 'min', 'max', 'last'],
        },
    ],
    defaultParams: ['1h', 'sum'],
});
addFuncDef({
    name: 'absolute',
    category: 'Transform',
});
addFuncDef({
    name: 'hitcount',
    category: 'Transform',
    params: [{ name: 'interval', type: 'string' }],
    defaultParams: ['10s'],
});
addFuncDef({
    name: 'log',
    category: 'Transform',
    params: [{ name: 'base', type: 'int' }],
    defaultParams: ['10'],
});
addFuncDef({
    name: 'averageAbove',
    category: 'Filter Series',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [25],
});
addFuncDef({
    name: 'averageBelow',
    category: 'Filter Series',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [25],
});
addFuncDef({
    name: 'currentAbove',
    category: 'Filter Series',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [25],
});
addFuncDef({
    name: 'currentBelow',
    category: 'Filter Series',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [25],
});
addFuncDef({
    name: 'maximumAbove',
    category: 'Filter Series',
    params: [{ name: 'value', type: 'int' }],
    defaultParams: [0],
});
addFuncDef({
    name: 'maximumBelow',
    category: 'Filter Series',
    params: [{ name: 'value', type: 'int' }],
    defaultParams: [0],
});
addFuncDef({
    name: 'minimumAbove',
    category: 'Filter Series',
    params: [{ name: 'value', type: 'int' }],
    defaultParams: [0],
});
addFuncDef({
    name: 'minimumBelow',
    category: 'Filter Series',
    params: [{ name: 'value', type: 'int' }],
    defaultParams: [0],
});
addFuncDef({
    name: 'limit',
    category: 'Filter Series',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'mostDeviant',
    category: 'Filter Series',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [10],
});
addFuncDef({
    name: 'exclude',
    category: 'Filter Series',
    params: [{ name: 'exclude', type: 'string' }],
    defaultParams: ['exclude'],
});
addFuncDef({
    name: 'highestCurrent',
    category: 'Filter Series',
    params: [{ name: 'count', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'highestMax',
    category: 'Filter Series',
    params: [{ name: 'count', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'lowestCurrent',
    category: 'Filter Series',
    params: [{ name: 'count', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'movingAverage',
    category: 'Calculate',
    params: [
        {
            name: 'windowSize',
            type: 'int_or_interval',
            options: ['5', '7', '10', '5min', '10min', '30min', '1hour'],
        },
    ],
    defaultParams: [10],
});
addFuncDef({
    name: 'movingMedian',
    category: 'Calculate',
    params: [
        {
            name: 'windowSize',
            type: 'int_or_interval',
            options: ['5', '7', '10', '5min', '10min', '30min', '1hour'],
        },
    ],
    defaultParams: ['5'],
});
addFuncDef({
    name: 'stdev',
    category: 'Calculate',
    params: [
        { name: 'n', type: 'int' },
        { name: 'tolerance', type: 'int' },
    ],
    defaultParams: [5, 0.1],
});
addFuncDef({
    name: 'highestAverage',
    category: 'Filter Series',
    params: [{ name: 'count', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'lowestAverage',
    category: 'Filter Series',
    params: [{ name: 'count', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'removeAbovePercentile',
    category: 'Filter Data',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'removeAboveValue',
    category: 'Filter Data',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'removeBelowPercentile',
    category: 'Filter Data',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'removeBelowValue',
    category: 'Filter Data',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [5],
});
addFuncDef({
    name: 'useSeriesAbove',
    category: 'Filter Series',
    params: [
        { name: 'value', type: 'int' },
        { name: 'search', type: 'string' },
        { name: 'replace', type: 'string' },
    ],
    defaultParams: [0, 'search', 'replace'],
});
////////////////////
// Graphite 1.0.x //
////////////////////
addFuncDef({
    name: 'aggregateLine',
    category: 'Calculate',
    params: [
        {
            name: 'func',
            type: 'select',
            options: ['sum', 'avg', 'min', 'max', 'last'],
        },
    ],
    defaultParams: ['avg'],
    version: '1.0',
});
addFuncDef({
    name: 'averageOutsidePercentile',
    category: 'Filter Series',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [95],
    version: '1.0',
});
addFuncDef({
    name: 'delay',
    category: 'Transform',
    params: [{ name: 'steps', type: 'int' }],
    defaultParams: [1],
    version: '1.0',
});
addFuncDef({
    name: 'exponentialMovingAverage',
    category: 'Calculate',
    params: [
        {
            name: 'windowSize',
            type: 'int_or_interval',
            options: ['5', '7', '10', '5min', '10min', '30min', '1hour'],
        },
    ],
    defaultParams: [10],
    version: '1.0',
});
addFuncDef({
    name: 'fallbackSeries',
    category: 'Special',
    params: [{ name: 'fallback', type: 'string' }],
    defaultParams: ['constantLine(0)'],
    version: '1.0',
});
addFuncDef({
    name: 'grep',
    category: 'Filter Series',
    params: [{ name: 'grep', type: 'string' }],
    defaultParams: ['grep'],
    version: '1.0',
});
addFuncDef({
    name: 'groupByNodes',
    category: 'Combine',
    params: [
        {
            name: 'function',
            type: 'string',
            options: ['sum', 'avg', 'maxSeries'],
        },
        {
            name: 'node',
            type: 'int',
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
            multiple: true,
        },
    ],
    defaultParams: ['sum', 3],
    version: '1.0',
});
addFuncDef({
    name: 'integralByInterval',
    category: 'Transform',
    params: [
        {
            name: 'intervalUnit',
            type: 'select',
            options: ['1h', '6h', '12h', '1d', '2d', '7d', '14d', '30d'],
        },
    ],
    defaultParams: ['1d'],
    version: '1.0',
});
addFuncDef({
    name: 'interpolate',
    category: 'Transform',
    params: [{ name: 'limit', type: 'int', optional: true }],
    defaultParams: [],
    version: '1.0',
});
addFuncDef({
    name: 'invert',
    category: 'Transform',
    version: '1.0',
});
addFuncDef({
    name: 'isNonNull',
    category: 'Combine',
    version: '1.0',
});
addFuncDef({
    name: 'linearRegression',
    category: 'Calculate',
    params: [
        {
            name: 'startSourceAt',
            type: 'select',
            options: ['-1h', '-6h', '-12h', '-1d', '-2d', '-7d', '-14d', '-30d'],
            optional: true,
        },
        {
            name: 'endSourceAt',
            type: 'select',
            options: ['-1h', '-6h', '-12h', '-1d', '-2d', '-7d', '-14d', '-30d'],
            optional: true,
        },
    ],
    defaultParams: [],
    version: '1.0',
});
addFuncDef({
    name: 'mapSeries',
    shortName: 'map',
    params: [{ name: 'node', type: 'int' }],
    defaultParams: [3],
    category: 'Combine',
    version: '1.0',
});
addFuncDef({
    name: 'movingMin',
    category: 'Calculate',
    params: [
        {
            name: 'windowSize',
            type: 'int_or_interval',
            options: ['5', '7', '10', '5min', '10min', '30min', '1hour'],
        },
    ],
    defaultParams: [10],
    version: '1.0',
});
addFuncDef({
    name: 'movingMax',
    category: 'Calculate',
    params: [
        {
            name: 'windowSize',
            type: 'int_or_interval',
            options: ['5', '7', '10', '5min', '10min', '30min', '1hour'],
        },
    ],
    defaultParams: [10],
    version: '1.0',
});
addFuncDef({
    name: 'movingSum',
    category: 'Calculate',
    params: [
        {
            name: 'windowSize',
            type: 'int_or_interval',
            options: ['5', '7', '10', '5min', '10min', '30min', '1hour'],
        },
    ],
    defaultParams: [10],
    version: '1.0',
});
addFuncDef({
    name: 'multiplySeriesWithWildcards',
    category: 'Combine',
    params: [
        {
            name: 'position',
            type: 'int',
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
            multiple: true,
        },
    ],
    defaultParams: [2],
    version: '1.0',
});
addFuncDef({
    name: 'offsetToZero',
    category: 'Transform',
    version: '1.0',
});
addFuncDef({
    name: 'pow',
    category: 'Transform',
    params: [{ name: 'factor', type: 'int' }],
    defaultParams: [10],
    version: '1.0',
});
addFuncDef({
    name: 'powSeries',
    category: 'Transform',
    params: optionalSeriesRefArgs,
    defaultParams: [''],
    version: '1.0',
});
addFuncDef({
    name: 'reduceSeries',
    shortName: 'reduce',
    params: [
        {
            name: 'function',
            type: 'string',
            options: ['asPercent', 'diffSeries', 'divideSeries'],
        },
        {
            name: 'reduceNode',
            type: 'int',
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        },
        { name: 'reduceMatchers', type: 'string', multiple: true },
    ],
    defaultParams: ['asPercent', 2, 'used_bytes'],
    category: 'Combine',
    version: '1.0',
});
addFuncDef({
    name: 'removeBetweenPercentile',
    category: 'Filter Series',
    params: [{ name: 'n', type: 'int' }],
    defaultParams: [95],
    version: '1.0',
});
addFuncDef({
    name: 'removeEmptySeries',
    category: 'Filter Series',
    version: '1.0',
});
addFuncDef({
    name: 'squareRoot',
    category: 'Transform',
    version: '1.0',
});
addFuncDef({
    name: 'timeSlice',
    category: 'Transform',
    params: [
        {
            name: 'startSliceAt',
            type: 'select',
            options: ['-1h', '-6h', '-12h', '-1d', '-2d', '-7d', '-14d', '-30d'],
        },
        {
            name: 'endSliceAt',
            type: 'select',
            options: ['-1h', '-6h', '-12h', '-1d', '-2d', '-7d', '-14d', '-30d'],
            optional: true,
        },
    ],
    defaultParams: ['-1h'],
    version: '1.0',
});
addFuncDef({
    name: 'weightedAverage',
    category: 'Combine',
    params: [
        { name: 'other', type: 'value_or_series', optional: true },
        {
            name: 'node',
            type: 'int',
            options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
        },
    ],
    defaultParams: ['#A', 4],
    version: '1.0',
});
addFuncDef({
    name: 'seriesByTag',
    category: 'Special',
    params: [{ name: 'tagExpression', type: 'string', multiple: true }],
    version: '1.1',
});
addFuncDef({
    name: 'groupByTags',
    category: 'Combine',
    params: [
        {
            name: 'function',
            type: 'string',
            options: ['sum', 'avg', 'maxSeries'],
        },
        { name: 'tag', type: 'string', multiple: true },
    ],
    defaultParams: ['sum', 'tag'],
    version: '1.1',
});
addFuncDef({
    name: 'aliasByTags',
    category: 'Alias',
    params: [{ name: 'tag', type: 'string', multiple: true }],
    defaultParams: ['tag'],
    version: '1.1',
});
function isVersionRelatedFunction(obj, graphiteVersion) {
    return !obj.version || Object(app_core_utils_version__WEBPACK_IMPORTED_MODULE_1__["isVersionGtOrEq"])(graphiteVersion, obj.version);
}
var FuncInstance = /** @class */ (function () {
    function FuncInstance(funcDef, options) {
        this.def = funcDef;
        this.params = [];
        if (options && options.withDefaultParams) {
            this.params = funcDef.defaultParams.slice(0);
        }
        this.updateText();
    }
    FuncInstance.prototype.render = function (metricExp, replaceVariables) {
        var _this = this;
        var str = this.def.name + '(';
        var parameters = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(this.params, function (value, index) {
            var paramType;
            if (index < _this.def.params.length) {
                paramType = _this.def.params[index].type;
            }
            else if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(_this.def.params), 'multiple')) {
                paramType = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(_this.def.params), 'type');
            }
            // param types that should never be quoted
            if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(['value_or_series', 'boolean', 'int', 'float', 'node'], paramType)) {
                return value;
            }
            var valueInterpolated = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(value) ? replaceVariables(value) : value;
            // param types that might be quoted
            // To quote variables correctly we need to interpolate it to check if it contains a numeric or string value
            if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.includes(['int_or_interval', 'node_or_tag'], paramType) && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isFinite(+valueInterpolated)) {
                return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString(value);
            }
            return "'" + value + "'";
        });
        // don't send any blank parameters to graphite
        while (parameters[parameters.length - 1] === '') {
            parameters.pop();
        }
        if (metricExp) {
            parameters.unshift(metricExp);
        }
        return str + parameters.join(', ') + ')';
    };
    FuncInstance.prototype._hasMultipleParamsInString = function (strValue, index) {
        if (strValue.indexOf(',') === -1) {
            return false;
        }
        if (this.def.params[index + 1] && this.def.params[index + 1].optional) {
            return true;
        }
        if (index + 1 >= this.def.params.length && lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.last(this.def.params), 'multiple')) {
            return true;
        }
        return false;
    };
    FuncInstance.prototype.updateParam = function (strValue, index) {
        var _this = this;
        // handle optional parameters
        // if string contains ',' and next param is optional, split and update both
        if (this._hasMultipleParamsInString(strValue, index)) {
            lodash__WEBPACK_IMPORTED_MODULE_0___default.a.each(strValue.split(','), function (partVal, idx) {
                _this.updateParam(partVal.trim(), index + idx);
            });
            return;
        }
        if (strValue === '' && (index >= this.def.params.length || this.def.params[index].optional)) {
            this.params.splice(index, 1);
        }
        else {
            this.params[index] = strValue;
        }
        this.updateText();
    };
    FuncInstance.prototype.updateText = function () {
        if (this.params.length === 0) {
            this.text = this.def.name + '()';
            return;
        }
        var text = this.def.name + '(';
        text += this.params.join(', ');
        text += ')';
        this.text = text;
    };
    return FuncInstance;
}());

function createFuncInstance(funcDef, options, idx) {
    if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(funcDef)) {
        funcDef = getFuncDef(funcDef, idx);
    }
    return new FuncInstance(funcDef, options);
}
function getFuncDef(name, idx) {
    if (!(idx || index)[name]) {
        throw { message: 'Method not found ' + name };
    }
    return (idx || index)[name];
}
function getFuncDefs(graphiteVersion, idx) {
    var funcs = {};
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(idx || index, function (funcDef) {
        if (isVersionRelatedFunction(funcDef, graphiteVersion)) {
            funcs[funcDef.name] = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.assign({}, funcDef, {
                params: lodash__WEBPACK_IMPORTED_MODULE_0___default.a.filter(funcDef.params, function (param) {
                    return isVersionRelatedFunction(param, graphiteVersion);
                }),
            });
        }
    });
    return funcs;
}
// parse response from graphite /functions endpoint into internal format
function parseFuncDefs(rawDefs) {
    var funcDefs = {};
    lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(rawDefs || {}, function (funcDef, funcName) {
        // skip graphite graph functions
        if (funcDef.group === 'Graph') {
            return;
        }
        var description = funcDef.description;
        if (description) {
            // tidy up some pydoc syntax that rst2html can't handle
            description = description
                .replace(/:py:func:`(.+)( <[^>]*>)?`/g, '``$1``')
                .replace(/.. seealso:: /g, 'See also: ')
                .replace(/.. code-block *:: *none/g, '.. code-block::');
        }
        var func = {
            name: funcDef.name,
            description: description,
            category: funcDef.group,
            params: [],
            defaultParams: [],
            fake: false,
        };
        // get rid of the first "seriesList" param
        if (/^seriesLists?$/.test(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(funcDef, 'params[0].type', ''))) {
            // handle functions that accept multiple seriesLists
            // we leave the param in place but mark it optional, so users can add more series if they wish
            if (funcDef.params[0].multiple) {
                funcDef.params[0].required = false;
                // otherwise chop off the first param, it'll be handled separately
            }
            else {
                funcDef.params.shift();
            }
            // tag function as fake
        }
        else {
            func.fake = true;
        }
        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.forEach(funcDef.params, function (rawParam) {
            var param = {
                name: rawParam.name,
                type: 'string',
                optional: !rawParam.required,
                multiple: !!rawParam.multiple,
                options: undefined,
            };
            if (rawParam.default !== undefined) {
                func.defaultParams.push(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString(rawParam.default));
            }
            else if (rawParam.suggestions) {
                func.defaultParams.push(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString(rawParam.suggestions[0]));
            }
            else {
                func.defaultParams.push('');
            }
            if (rawParam.type === 'boolean') {
                param.type = 'boolean';
                param.options = ['true', 'false'];
            }
            else if (rawParam.type === 'integer') {
                param.type = 'int';
            }
            else if (rawParam.type === 'float') {
                param.type = 'float';
            }
            else if (rawParam.type === 'node') {
                param.type = 'node';
                param.options = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            }
            else if (rawParam.type === 'nodeOrTag') {
                param.type = 'node_or_tag';
                param.options = ['name', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            }
            else if (rawParam.type === 'intOrInterval') {
                param.type = 'int_or_interval';
            }
            else if (rawParam.type === 'seriesList') {
                param.type = 'value_or_series';
            }
            if (rawParam.options) {
                param.options = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(rawParam.options, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString);
            }
            else if (rawParam.suggestions) {
                param.options = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(rawParam.suggestions, lodash__WEBPACK_IMPORTED_MODULE_0___default.a.toString);
            }
            func.params.push(param);
        });
        funcDefs[funcName] = func;
    });
    return funcDefs;
}
/* harmony default export */ __webpack_exports__["default"] = ({
    createFuncInstance: createFuncInstance,
    getFuncDef: getFuncDef,
    getFuncDefs: getFuncDefs,
    parseFuncDefs: parseFuncDefs,
});


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/graphite_query.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/graphite_query.ts ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser */ "./public/app/plugins/datasource/graphite/parser.ts");



var GraphiteQuery = /** @class */ (function () {
    /** @ngInject */
    function GraphiteQuery(datasource, target, templateSrv, scopedVars) {
        this.datasource = datasource;
        this.target = target;
        this.templateSrv = templateSrv;
        this.scopedVars = scopedVars;
        this.parseTarget();
        this.removeTagValue = '-- remove tag --';
    }
    GraphiteQuery.prototype.parseTarget = function () {
        this.functions = [];
        this.segments = [];
        this.tags = [];
        this.seriesByTagUsed = false;
        this.error = null;
        if (this.target.textEditor) {
            return;
        }
        var parser = new _parser__WEBPACK_IMPORTED_MODULE_2__["Parser"](this.target.target);
        var astNode = parser.getAst();
        if (astNode === null) {
            this.checkOtherSegmentsIndex = 0;
            return;
        }
        if (astNode.type === 'error') {
            this.error = astNode.message + ' at position: ' + astNode.pos;
            this.target.textEditor = true;
            return;
        }
        try {
            this.parseTargetRecursive(astNode, null);
        }
        catch (err) {
            console.log('error parsing target:', err.message);
            this.error = err.message;
            this.target.textEditor = true;
        }
        this.checkOtherSegmentsIndex = this.segments.length - 1;
    };
    GraphiteQuery.prototype.getSegmentPathUpTo = function (index) {
        var arr = this.segments.slice(0, index);
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce(arr, function (result, segment) {
            return result ? result + '.' + segment.value : segment.value;
        }, '');
    };
    GraphiteQuery.prototype.parseTargetRecursive = function (astNode, func) {
        var _this = this;
        if (astNode === null) {
            return null;
        }
        switch (astNode.type) {
            case 'function':
                var innerFunc_1 = this.datasource.createFuncInstance(astNode.name, {
                    withDefaultParams: false,
                });
                lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(astNode.params, function (param) {
                    _this.parseTargetRecursive(param, innerFunc_1);
                });
                innerFunc_1.updateText();
                this.functions.push(innerFunc_1);
                // extract tags from seriesByTag function and hide function
                if (innerFunc_1.def.name === 'seriesByTag' && !this.seriesByTagUsed) {
                    this.seriesByTagUsed = true;
                    innerFunc_1.hidden = true;
                    this.tags = this.splitSeriesByTagParams(innerFunc_1);
                }
                break;
            case 'series-ref':
                if (this.segments.length > 0 || this.getSeriesByTagFuncIndex() >= 0) {
                    this.addFunctionParameter(func, astNode.value);
                }
                else {
                    this.segments.push(astNode);
                }
                break;
            case 'bool':
            case 'string':
            case 'number':
                this.addFunctionParameter(func, astNode.value);
                break;
            case 'metric':
                if (this.segments.length || this.tags.length) {
                    this.addFunctionParameter(func, lodash__WEBPACK_IMPORTED_MODULE_1___default.a.join(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(astNode.segments, 'value'), '.'));
                }
                else {
                    this.segments = astNode.segments;
                }
                break;
        }
    };
    GraphiteQuery.prototype.updateSegmentValue = function (segment, index) {
        this.segments[index].value = segment.value;
    };
    GraphiteQuery.prototype.addSelectMetricSegment = function () {
        this.segments.push({ value: 'select metric' });
    };
    GraphiteQuery.prototype.addFunction = function (newFunc) {
        this.functions.push(newFunc);
    };
    GraphiteQuery.prototype.addFunctionParameter = function (func, value) {
        if (func.params.length >= func.def.params.length && !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.last(func.def.params), 'multiple', false)) {
            throw { message: 'too many parameters for function ' + func.def.name };
        }
        func.params.push(value);
    };
    GraphiteQuery.prototype.removeFunction = function (func) {
        this.functions = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.without(this.functions, func);
    };
    GraphiteQuery.prototype.moveFunction = function (func, offset) {
        var index = this.functions.indexOf(func);
        // @ts-ignore
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.move(this.functions, index, index + offset);
    };
    GraphiteQuery.prototype.updateModelTarget = function (targets) {
        var e_1, _a;
        var _this = this;
        var wrapFunction = function (target, func) {
            return func.render(target, function (value) {
                return _this.templateSrv.replace(value, _this.scopedVars);
            });
        };
        if (!this.target.textEditor) {
            var metricPath = this.getSegmentPathUpTo(this.segments.length).replace(/\.select metric$/, '');
            this.target.target = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce(this.functions, wrapFunction, metricPath);
        }
        this.updateRenderedTarget(this.target, targets);
        try {
            // loop through other queries and update targetFull as needed
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(targets || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var target = _c.value;
                if (target.refId !== this.target.refId) {
                    this.updateRenderedTarget(target, targets);
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
    };
    GraphiteQuery.prototype.updateRenderedTarget = function (target, targets) {
        // render nested query
        var targetsByRefId = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.keyBy(targets, 'refId');
        // no references to self
        delete targetsByRefId[target.refId];
        var nestedSeriesRefRegex = /\#([A-Z])/g;
        var targetWithNestedQueries = target.target;
        // Use ref count to track circular references
        function countTargetRefs(targetsByRefId, refId) {
            var refCount = 0;
            lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(targetsByRefId, function (t, id) {
                if (id !== refId) {
                    var match = nestedSeriesRefRegex.exec(t.target);
                    var count = match && match.length ? match.length - 1 : 0;
                    refCount += count;
                }
            });
            targetsByRefId[refId].refCount = refCount;
        }
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(targetsByRefId, function (t, id) {
            countTargetRefs(targetsByRefId, id);
        });
        // Keep interpolating until there are no query references
        // The reason for the loop is that the referenced query might contain another reference to another query
        while (targetWithNestedQueries.match(nestedSeriesRefRegex)) {
            var updated = targetWithNestedQueries.replace(nestedSeriesRefRegex, function (match, g1) {
                var t = targetsByRefId[g1];
                if (!t) {
                    return match;
                }
                // no circular references
                if (t.refCount === 0) {
                    delete targetsByRefId[g1];
                }
                t.refCount--;
                return t.target;
            });
            if (updated === targetWithNestedQueries) {
                break;
            }
            targetWithNestedQueries = updated;
        }
        delete target.targetFull;
        if (target.target !== targetWithNestedQueries) {
            target.targetFull = targetWithNestedQueries;
        }
    };
    GraphiteQuery.prototype.splitSeriesByTagParams = function (func) {
        var tagPattern = /([^\!=~]+)(\!?=~?)(.*)/;
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flatten(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(func.params, function (param) {
            var matches = tagPattern.exec(param);
            if (matches) {
                var tag = matches.slice(1);
                if (tag.length === 3) {
                    return {
                        key: tag[0],
                        operator: tag[1],
                        value: tag[2],
                    };
                }
            }
            return [];
        }));
    };
    GraphiteQuery.prototype.getSeriesByTagFuncIndex = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.findIndex(this.functions, function (func) { return func.def.name === 'seriesByTag'; });
    };
    GraphiteQuery.prototype.getSeriesByTagFunc = function () {
        var seriesByTagFuncIndex = this.getSeriesByTagFuncIndex();
        if (seriesByTagFuncIndex >= 0) {
            return this.functions[seriesByTagFuncIndex];
        }
        else {
            return undefined;
        }
    };
    GraphiteQuery.prototype.addTag = function (tag) {
        var newTagParam = renderTagString(tag);
        this.getSeriesByTagFunc().params.push(newTagParam);
        this.tags.push(tag);
    };
    GraphiteQuery.prototype.removeTag = function (index) {
        this.getSeriesByTagFunc().params.splice(index, 1);
        this.tags.splice(index, 1);
    };
    GraphiteQuery.prototype.updateTag = function (tag, tagIndex) {
        this.error = null;
        if (tag.key === this.removeTagValue) {
            this.removeTag(tagIndex);
            return;
        }
        var newTagParam = renderTagString(tag);
        this.getSeriesByTagFunc().params[tagIndex] = newTagParam;
        this.tags[tagIndex] = tag;
    };
    GraphiteQuery.prototype.renderTagExpressions = function (excludeIndex) {
        if (excludeIndex === void 0) { excludeIndex = -1; }
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.compact(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.tags, function (tagExpr, index) {
            // Don't render tag that we want to lookup
            if (index !== excludeIndex) {
                return tagExpr.key + tagExpr.operator + tagExpr.value;
            }
        }));
    };
    return GraphiteQuery;
}());
/* harmony default export */ __webpack_exports__["default"] = (GraphiteQuery);
function renderTagString(tag) {
    return tag.key + tag.operator + tag.value;
}


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/lexer.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/lexer.ts ***!
  \*********************************************************/
/*! exports provided: Lexer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lexer", function() { return Lexer; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

// This is auto generated from the unicode tables.
// The tables are at:
// http://www.fileformat.info/info/unicode/category/Lu/list.htm
// http://www.fileformat.info/info/unicode/category/Ll/list.htm
// http://www.fileformat.info/info/unicode/category/Lt/list.htm
// http://www.fileformat.info/info/unicode/category/Lm/list.htm
// http://www.fileformat.info/info/unicode/category/Lo/list.htm
// http://www.fileformat.info/info/unicode/category/Nl/list.htm
var unicodeLetterTable = [
    170,
    170,
    181,
    181,
    186,
    186,
    192,
    214,
    216,
    246,
    248,
    705,
    710,
    721,
    736,
    740,
    748,
    748,
    750,
    750,
    880,
    884,
    886,
    887,
    890,
    893,
    902,
    902,
    904,
    906,
    908,
    908,
    910,
    929,
    931,
    1013,
    1015,
    1153,
    1162,
    1319,
    1329,
    1366,
    1369,
    1369,
    1377,
    1415,
    1488,
    1514,
    1520,
    1522,
    1568,
    1610,
    1646,
    1647,
    1649,
    1747,
    1749,
    1749,
    1765,
    1766,
    1774,
    1775,
    1786,
    1788,
    1791,
    1791,
    1808,
    1808,
    1810,
    1839,
    1869,
    1957,
    1969,
    1969,
    1994,
    2026,
    2036,
    2037,
    2042,
    2042,
    2048,
    2069,
    2074,
    2074,
    2084,
    2084,
    2088,
    2088,
    2112,
    2136,
    2308,
    2361,
    2365,
    2365,
    2384,
    2384,
    2392,
    2401,
    2417,
    2423,
    2425,
    2431,
    2437,
    2444,
    2447,
    2448,
    2451,
    2472,
    2474,
    2480,
    2482,
    2482,
    2486,
    2489,
    2493,
    2493,
    2510,
    2510,
    2524,
    2525,
    2527,
    2529,
    2544,
    2545,
    2565,
    2570,
    2575,
    2576,
    2579,
    2600,
    2602,
    2608,
    2610,
    2611,
    2613,
    2614,
    2616,
    2617,
    2649,
    2652,
    2654,
    2654,
    2674,
    2676,
    2693,
    2701,
    2703,
    2705,
    2707,
    2728,
    2730,
    2736,
    2738,
    2739,
    2741,
    2745,
    2749,
    2749,
    2768,
    2768,
    2784,
    2785,
    2821,
    2828,
    2831,
    2832,
    2835,
    2856,
    2858,
    2864,
    2866,
    2867,
    2869,
    2873,
    2877,
    2877,
    2908,
    2909,
    2911,
    2913,
    2929,
    2929,
    2947,
    2947,
    2949,
    2954,
    2958,
    2960,
    2962,
    2965,
    2969,
    2970,
    2972,
    2972,
    2974,
    2975,
    2979,
    2980,
    2984,
    2986,
    2990,
    3001,
    3024,
    3024,
    3077,
    3084,
    3086,
    3088,
    3090,
    3112,
    3114,
    3123,
    3125,
    3129,
    3133,
    3133,
    3160,
    3161,
    3168,
    3169,
    3205,
    3212,
    3214,
    3216,
    3218,
    3240,
    3242,
    3251,
    3253,
    3257,
    3261,
    3261,
    3294,
    3294,
    3296,
    3297,
    3313,
    3314,
    3333,
    3340,
    3342,
    3344,
    3346,
    3386,
    3389,
    3389,
    3406,
    3406,
    3424,
    3425,
    3450,
    3455,
    3461,
    3478,
    3482,
    3505,
    3507,
    3515,
    3517,
    3517,
    3520,
    3526,
    3585,
    3632,
    3634,
    3635,
    3648,
    3654,
    3713,
    3714,
    3716,
    3716,
    3719,
    3720,
    3722,
    3722,
    3725,
    3725,
    3732,
    3735,
    3737,
    3743,
    3745,
    3747,
    3749,
    3749,
    3751,
    3751,
    3754,
    3755,
    3757,
    3760,
    3762,
    3763,
    3773,
    3773,
    3776,
    3780,
    3782,
    3782,
    3804,
    3805,
    3840,
    3840,
    3904,
    3911,
    3913,
    3948,
    3976,
    3980,
    4096,
    4138,
    4159,
    4159,
    4176,
    4181,
    4186,
    4189,
    4193,
    4193,
    4197,
    4198,
    4206,
    4208,
    4213,
    4225,
    4238,
    4238,
    4256,
    4293,
    4304,
    4346,
    4348,
    4348,
    4352,
    4680,
    4682,
    4685,
    4688,
    4694,
    4696,
    4696,
    4698,
    4701,
    4704,
    4744,
    4746,
    4749,
    4752,
    4784,
    4786,
    4789,
    4792,
    4798,
    4800,
    4800,
    4802,
    4805,
    4808,
    4822,
    4824,
    4880,
    4882,
    4885,
    4888,
    4954,
    4992,
    5007,
    5024,
    5108,
    5121,
    5740,
    5743,
    5759,
    5761,
    5786,
    5792,
    5866,
    5870,
    5872,
    5888,
    5900,
    5902,
    5905,
    5920,
    5937,
    5952,
    5969,
    5984,
    5996,
    5998,
    6000,
    6016,
    6067,
    6103,
    6103,
    6108,
    6108,
    6176,
    6263,
    6272,
    6312,
    6314,
    6314,
    6320,
    6389,
    6400,
    6428,
    6480,
    6509,
    6512,
    6516,
    6528,
    6571,
    6593,
    6599,
    6656,
    6678,
    6688,
    6740,
    6823,
    6823,
    6917,
    6963,
    6981,
    6987,
    7043,
    7072,
    7086,
    7087,
    7104,
    7141,
    7168,
    7203,
    7245,
    7247,
    7258,
    7293,
    7401,
    7404,
    7406,
    7409,
    7424,
    7615,
    7680,
    7957,
    7960,
    7965,
    7968,
    8005,
    8008,
    8013,
    8016,
    8023,
    8025,
    8025,
    8027,
    8027,
    8029,
    8029,
    8031,
    8061,
    8064,
    8116,
    8118,
    8124,
    8126,
    8126,
    8130,
    8132,
    8134,
    8140,
    8144,
    8147,
    8150,
    8155,
    8160,
    8172,
    8178,
    8180,
    8182,
    8188,
    8305,
    8305,
    8319,
    8319,
    8336,
    8348,
    8450,
    8450,
    8455,
    8455,
    8458,
    8467,
    8469,
    8469,
    8473,
    8477,
    8484,
    8484,
    8486,
    8486,
    8488,
    8488,
    8490,
    8493,
    8495,
    8505,
    8508,
    8511,
    8517,
    8521,
    8526,
    8526,
    8544,
    8584,
    11264,
    11310,
    11312,
    11358,
    11360,
    11492,
    11499,
    11502,
    11520,
    11557,
    11568,
    11621,
    11631,
    11631,
    11648,
    11670,
    11680,
    11686,
    11688,
    11694,
    11696,
    11702,
    11704,
    11710,
    11712,
    11718,
    11720,
    11726,
    11728,
    11734,
    11736,
    11742,
    11823,
    11823,
    12293,
    12295,
    12321,
    12329,
    12337,
    12341,
    12344,
    12348,
    12353,
    12438,
    12445,
    12447,
    12449,
    12538,
    12540,
    12543,
    12549,
    12589,
    12593,
    12686,
    12704,
    12730,
    12784,
    12799,
    13312,
    13312,
    19893,
    19893,
    19968,
    19968,
    40907,
    40907,
    40960,
    42124,
    42192,
    42237,
    42240,
    42508,
    42512,
    42527,
    42538,
    42539,
    42560,
    42606,
    42623,
    42647,
    42656,
    42735,
    42775,
    42783,
    42786,
    42888,
    42891,
    42894,
    42896,
    42897,
    42912,
    42921,
    43002,
    43009,
    43011,
    43013,
    43015,
    43018,
    43020,
    43042,
    43072,
    43123,
    43138,
    43187,
    43250,
    43255,
    43259,
    43259,
    43274,
    43301,
    43312,
    43334,
    43360,
    43388,
    43396,
    43442,
    43471,
    43471,
    43520,
    43560,
    43584,
    43586,
    43588,
    43595,
    43616,
    43638,
    43642,
    43642,
    43648,
    43695,
    43697,
    43697,
    43701,
    43702,
    43705,
    43709,
    43712,
    43712,
    43714,
    43714,
    43739,
    43741,
    43777,
    43782,
    43785,
    43790,
    43793,
    43798,
    43808,
    43814,
    43816,
    43822,
    43968,
    44002,
    44032,
    44032,
    55203,
    55203,
    55216,
    55238,
    55243,
    55291,
    63744,
    64045,
    64048,
    64109,
    64112,
    64217,
    64256,
    64262,
    64275,
    64279,
    64285,
    64285,
    64287,
    64296,
    64298,
    64310,
    64312,
    64316,
    64318,
    64318,
    64320,
    64321,
    64323,
    64324,
    64326,
    64433,
    64467,
    64829,
    64848,
    64911,
    64914,
    64967,
    65008,
    65019,
    65136,
    65140,
    65142,
    65276,
    65313,
    65338,
    65345,
    65370,
    65382,
    65470,
    65474,
    65479,
    65482,
    65487,
    65490,
    65495,
    65498,
    65500,
    65536,
    65547,
    65549,
    65574,
    65576,
    65594,
    65596,
    65597,
    65599,
    65613,
    65616,
    65629,
    65664,
    65786,
    65856,
    65908,
    66176,
    66204,
    66208,
    66256,
    66304,
    66334,
    66352,
    66378,
    66432,
    66461,
    66464,
    66499,
    66504,
    66511,
    66513,
    66517,
    66560,
    66717,
    67584,
    67589,
    67592,
    67592,
    67594,
    67637,
    67639,
    67640,
    67644,
    67644,
    67647,
    67669,
    67840,
    67861,
    67872,
    67897,
    68096,
    68096,
    68112,
    68115,
    68117,
    68119,
    68121,
    68147,
    68192,
    68220,
    68352,
    68405,
    68416,
    68437,
    68448,
    68466,
    68608,
    68680,
    69635,
    69687,
    69763,
    69807,
    73728,
    74606,
    74752,
    74850,
    77824,
    78894,
    92160,
    92728,
    110592,
    110593,
    119808,
    119892,
    119894,
    119964,
    119966,
    119967,
    119970,
    119970,
    119973,
    119974,
    119977,
    119980,
    119982,
    119993,
    119995,
    119995,
    119997,
    120003,
    120005,
    120069,
    120071,
    120074,
    120077,
    120084,
    120086,
    120092,
    120094,
    120121,
    120123,
    120126,
    120128,
    120132,
    120134,
    120134,
    120138,
    120144,
    120146,
    120485,
    120488,
    120512,
    120514,
    120538,
    120540,
    120570,
    120572,
    120596,
    120598,
    120628,
    120630,
    120654,
    120656,
    120686,
    120688,
    120712,
    120714,
    120744,
    120746,
    120770,
    120772,
    120779,
    131072,
    131072,
    173782,
    173782,
    173824,
    173824,
    177972,
    177972,
    177984,
    177984,
    178205,
    178205,
    194560,
    195101,
];
var identifierStartTable = [];
for (var i = 0; i < 128; i++) {
    identifierStartTable[i] =
        (i >= 48 && i <= 57) || // 0-9
            i === 36 || // $
            i === 126 || // ~
            i === 124 || // |
            (i >= 65 && i <= 90) || // A-Z
            i === 95 || // _
            i === 45 || // -
            i === 42 || // *
            i === 58 || // :
            i === 91 || // templateStart [
            i === 93 || // templateEnd ]
            i === 63 || // ?
            i === 37 || // %
            i === 35 || // #
            i === 61 || // =
            (i >= 97 && i <= 122); // a-z
}
var identifierPartTable = identifierStartTable;
var Lexer = /** @class */ (function () {
    function Lexer(expression) {
        this.input = expression;
        this.char = 1;
        this.from = 1;
    }
    Lexer.prototype.peek = function (i) {
        return this.input.charAt(i || 0);
    };
    Lexer.prototype.skip = function (i) {
        i = i || 1;
        this.char += i;
        this.input = this.input.slice(i);
    };
    Lexer.prototype.tokenize = function () {
        var list = [];
        var token = this.next();
        while (token) {
            list.push(token);
            token = this.next();
        }
        return list;
    };
    Lexer.prototype.next = function () {
        this.from = this.char;
        // Move to the next non-space character.
        if (/\s/.test(this.peek())) {
            while (/\s/.test(this.peek())) {
                this.from += 1;
                this.skip();
            }
            if (this.peek() === '') {
                // EOL
                return null;
            }
        }
        var match = this.scanStringLiteral();
        if (match) {
            return match;
        }
        match = this.scanPunctuator() || this.scanNumericLiteral() || this.scanIdentifier() || this.scanTemplateSequence();
        if (match) {
            this.skip(match.value.length);
            return match;
        }
        // No token could be matched, give up.
        return null;
    };
    Lexer.prototype.scanTemplateSequence = function () {
        if (this.peek() === '[' && this.peek(1) === '[') {
            return {
                type: 'templateStart',
                value: '[[',
                pos: this.char,
            };
        }
        if (this.peek() === ']' && this.peek(1) === ']') {
            return {
                type: 'templateEnd',
                value: '[[',
                pos: this.char,
            };
        }
        return null;
    };
    /*
     * Extract a JavaScript identifier out of the next sequence of
     * characters or return 'null' if its not possible. In addition,
     * to Identifier this method can also produce BooleanLiteral
     * (true/false) and NullLiteral (null).
     */
    Lexer.prototype.scanIdentifier = function () {
        var id = '';
        var index = 0;
        var type, char;
        // Detects any character in the Unicode categories "Uppercase
        // letter (Lu)", "Lowercase letter (Ll)", "Titlecase letter
        // (Lt)", "Modifier letter (Lm)", "Other letter (Lo)", or
        // "Letter number (Nl)".
        //
        // Both approach and unicodeLetterTable were borrowed from
        // Google's Traceur.
        function isUnicodeLetter(code) {
            for (var i = 0; i < unicodeLetterTable.length;) {
                if (code < unicodeLetterTable[i++]) {
                    return false;
                }
                if (code <= unicodeLetterTable[i++]) {
                    return true;
                }
            }
            return false;
        }
        function isHexDigit(str) {
            return /^[0-9a-fA-F]$/.test(str);
        }
        var readUnicodeEscapeSequence = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function () {
            /*jshint validthis:true */
            index += 1;
            if (this.peek(index) !== 'u') {
                return null;
            }
            var ch1 = this.peek(index + 1);
            var ch2 = this.peek(index + 2);
            var ch3 = this.peek(index + 3);
            var ch4 = this.peek(index + 4);
            var code;
            if (isHexDigit(ch1) && isHexDigit(ch2) && isHexDigit(ch3) && isHexDigit(ch4)) {
                code = parseInt(ch1 + ch2 + ch3 + ch4, 16);
                if (isUnicodeLetter(code)) {
                    index += 5;
                    return '\\u' + ch1 + ch2 + ch3 + ch4;
                }
                return null;
            }
            return null;
        }, this);
        var getIdentifierStart = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function () {
            /*jshint validthis:true */
            var chr = this.peek(index);
            var code = chr.charCodeAt(0);
            if (chr === '*') {
                index += 1;
                return chr;
            }
            if (code === 92) {
                return readUnicodeEscapeSequence();
            }
            if (code < 128) {
                if (identifierStartTable[code]) {
                    index += 1;
                    return chr;
                }
                return null;
            }
            if (isUnicodeLetter(code)) {
                index += 1;
                return chr;
            }
            return null;
        }, this);
        var getIdentifierPart = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.bind(function () {
            /*jshint validthis:true */
            var chr = this.peek(index);
            var code = chr.charCodeAt(0);
            if (code === 92) {
                return readUnicodeEscapeSequence();
            }
            if (code < 128) {
                if (identifierPartTable[code]) {
                    index += 1;
                    return chr;
                }
                return null;
            }
            if (isUnicodeLetter(code)) {
                index += 1;
                return chr;
            }
            return null;
        }, this);
        char = getIdentifierStart();
        if (char === null) {
            return null;
        }
        id = char;
        for (;;) {
            char = getIdentifierPart();
            if (char === null) {
                break;
            }
            id += char;
        }
        switch (id) {
            case 'true': {
                type = 'bool';
                break;
            }
            case 'false': {
                type = 'bool';
                break;
            }
            default:
                type = 'identifier';
        }
        return {
            type: type,
            value: id,
            pos: this.char,
        };
    };
    /*
     * Extract a numeric literal out of the next sequence of
     * characters or return 'null' if its not possible. This method
     * supports all numeric literals described in section 7.8.3
     * of the EcmaScript 5 specification.
     *
     * This method's implementation was heavily influenced by the
     * scanNumericLiteral function in the Esprima parser's source code.
     */
    Lexer.prototype.scanNumericLiteral = function () {
        var index = 0;
        var value = '';
        var length = this.input.length;
        var char = this.peek(index);
        var bad;
        function isDecimalDigit(str) {
            return /^[0-9]$/.test(str);
        }
        function isOctalDigit(str) {
            return /^[0-7]$/.test(str);
        }
        function isHexDigit(str) {
            return /^[0-9a-fA-F]$/.test(str);
        }
        function isIdentifierStart(ch) {
            return ch === '$' || ch === '_' || ch === '\\' || (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
        }
        // handle negative num literals
        if (char === '-') {
            value += char;
            index += 1;
            char = this.peek(index);
        }
        // Numbers must start either with a decimal digit or a point.
        if (char !== '.' && !isDecimalDigit(char)) {
            return null;
        }
        if (char !== '.') {
            value += this.peek(index);
            index += 1;
            char = this.peek(index);
            if (value === '0') {
                // Base-16 numbers.
                if (char === 'x' || char === 'X') {
                    index += 1;
                    value += char;
                    while (index < length) {
                        char = this.peek(index);
                        if (!isHexDigit(char)) {
                            break;
                        }
                        value += char;
                        index += 1;
                    }
                    if (value.length <= 2) {
                        // 0x
                        return {
                            type: 'number',
                            value: value,
                            isMalformed: true,
                            pos: this.char,
                        };
                    }
                    if (index < length) {
                        char = this.peek(index);
                        if (isIdentifierStart(char)) {
                            return null;
                        }
                    }
                    return {
                        type: 'number',
                        value: value,
                        base: 16,
                        isMalformed: false,
                        pos: this.char,
                    };
                }
                // Base-8 numbers.
                if (isOctalDigit(char)) {
                    index += 1;
                    value += char;
                    bad = false;
                    while (index < length) {
                        char = this.peek(index);
                        // Numbers like '019' (note the 9) are not valid octals
                        // but we still parse them and mark as malformed.
                        if (isDecimalDigit(char)) {
                            bad = true;
                        }
                        if (!isOctalDigit(char)) {
                            // if the char is a non punctuator then its not a valid number
                            if (!this.isPunctuator(char)) {
                                return null;
                            }
                            break;
                        }
                        value += char;
                        index += 1;
                    }
                    if (index < length) {
                        char = this.peek(index);
                        if (isIdentifierStart(char)) {
                            return null;
                        }
                    }
                    return {
                        type: 'number',
                        value: value,
                        base: 8,
                        isMalformed: bad,
                    };
                }
                // Decimal numbers that start with '0' such as '09' are illegal
                // but we still parse them and return as malformed.
                if (isDecimalDigit(char)) {
                    index += 1;
                    value += char;
                }
            }
            while (index < length) {
                char = this.peek(index);
                if (!isDecimalDigit(char)) {
                    break;
                }
                value += char;
                index += 1;
            }
        }
        // Decimal digits.
        if (char === '.') {
            value += char;
            index += 1;
            while (index < length) {
                char = this.peek(index);
                if (!isDecimalDigit(char)) {
                    break;
                }
                value += char;
                index += 1;
            }
        }
        // Exponent part.
        if (char === 'e' || char === 'E') {
            value += char;
            index += 1;
            char = this.peek(index);
            if (char === '+' || char === '-') {
                value += this.peek(index);
                index += 1;
            }
            char = this.peek(index);
            if (isDecimalDigit(char)) {
                value += char;
                index += 1;
                while (index < length) {
                    char = this.peek(index);
                    if (!isDecimalDigit(char)) {
                        break;
                    }
                    value += char;
                    index += 1;
                }
            }
            else {
                return null;
            }
        }
        if (index < length) {
            char = this.peek(index);
            if (!this.isPunctuator(char)) {
                return null;
            }
        }
        return {
            type: 'number',
            value: value,
            base: 10,
            pos: this.char,
            isMalformed: !isFinite(+value),
        };
    };
    Lexer.prototype.isPunctuator = function (ch1) {
        switch (ch1) {
            case '.':
            case '(':
            case ')':
            case ',':
            case '{':
            case '}':
                return true;
        }
        return false;
    };
    Lexer.prototype.scanPunctuator = function () {
        var ch1 = this.peek();
        if (this.isPunctuator(ch1)) {
            return {
                type: ch1,
                value: ch1,
                pos: this.char,
            };
        }
        return null;
    };
    /*
     * Extract a string out of the next sequence of characters and/or
     * lines or return 'null' if its not possible. Since strings can
     * span across multiple lines this method has to move the char
     * pointer.
     *
     * This method recognizes pseudo-multiline JavaScript strings:
     *
     *   var str = "hello\
     *   world";
     */
    Lexer.prototype.scanStringLiteral = function () {
        /*jshint loopfunc:true */
        var quote = this.peek();
        // String must start with a quote.
        if (quote !== '"' && quote !== "'") {
            return null;
        }
        var value = '';
        this.skip();
        while (this.peek() !== quote) {
            if (this.peek() === '') {
                // End Of Line
                return {
                    type: 'string',
                    value: value,
                    isUnclosed: true,
                    quote: quote,
                    pos: this.char,
                };
            }
            var char = this.peek();
            var jump = 1; // A length of a jump, after we're done
            // parsing this character.
            value += char;
            this.skip(jump);
        }
        this.skip();
        return {
            type: 'string',
            value: value,
            isUnclosed: false,
            quote: quote,
            pos: this.char,
        };
    };
    return Lexer;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/graphite/meta.ts":
/*!********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/meta.ts ***!
  \********************************************************/
/*! exports provided: parseSchemaRetentions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSchemaRetentions", function() { return parseSchemaRetentions; });
function toInteger(val) {
    if (val) {
        return parseInt(val, 10);
    }
    return undefined;
}
function toBooleanOrTimestamp(val) {
    if (val) {
        if (val === 'true') {
            return true;
        }
        if (val === 'false') {
            return false;
        }
        return parseInt(val, 10);
    }
    return undefined;
}
function parseSchemaRetentions(spec) {
    if (!spec) {
        return [];
    }
    return spec.split(',').map(function (str) {
        var vals = str.split(':');
        return {
            interval: vals[0],
            retention: vals[1],
            chunkspan: vals[2],
            numchunks: toInteger(vals[3]),
            ready: toBooleanOrTimestamp(vals[4]),
        };
    });
}


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/module.ts":
/*!**********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/module.ts ***!
  \**********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/graphite/datasource.ts");
/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/graphite/query_ctrl.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration/ConfigEditor */ "./public/app/plugins/datasource/graphite/configuration/ConfigEditor.tsx");
/* harmony import */ var _MetricTankMetaInspector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MetricTankMetaInspector */ "./public/app/plugins/datasource/graphite/MetricTankMetaInspector.tsx");





var AnnotationsQueryCtrl = /** @class */ (function () {
    function AnnotationsQueryCtrl() {
    }
    AnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return AnnotationsQueryCtrl;
}());
var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_0__["GraphiteDatasource"])
    .setQueryCtrl(_query_ctrl__WEBPACK_IMPORTED_MODULE_1__["GraphiteQueryCtrl"])
    .setConfigEditor(_configuration_ConfigEditor__WEBPACK_IMPORTED_MODULE_3__["ConfigEditor"])
    .setMetadataInspector(_MetricTankMetaInspector__WEBPACK_IMPORTED_MODULE_4__["MetricTankMetaInspector"])
    .setAnnotationQueryCtrl(AnnotationsQueryCtrl);


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/parser.ts":
/*!**********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/parser.ts ***!
  \**********************************************************/
/*! exports provided: Parser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parser", function() { return Parser; });
/* harmony import */ var _lexer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lexer */ "./public/app/plugins/datasource/graphite/lexer.ts");

var Parser = /** @class */ (function () {
    function Parser(expression) {
        this.expression = expression;
        this.lexer = new _lexer__WEBPACK_IMPORTED_MODULE_0__["Lexer"](expression);
        this.tokens = this.lexer.tokenize();
        this.index = 0;
    }
    Parser.prototype.getAst = function () {
        return this.start();
    };
    Parser.prototype.start = function () {
        try {
            return this.functionCall() || this.metricExpression();
        }
        catch (e) {
            return {
                type: 'error',
                message: e.message,
                pos: e.pos,
            };
        }
    };
    Parser.prototype.curlyBraceSegment = function () {
        if (this.match('identifier', '{') || this.match('{')) {
            var curlySegment = '';
            while (!this.match('') && !this.match('}')) {
                curlySegment += this.consumeToken().value;
            }
            if (!this.match('}')) {
                this.errorMark("Expected closing '}'");
            }
            curlySegment += this.consumeToken().value;
            // if curly segment is directly followed by identifier
            // include it in the segment
            if (this.match('identifier')) {
                curlySegment += this.consumeToken().value;
            }
            return {
                type: 'segment',
                value: curlySegment,
            };
        }
        else {
            return null;
        }
    };
    Parser.prototype.metricSegment = function () {
        var curly = this.curlyBraceSegment();
        if (curly) {
            return curly;
        }
        if (this.match('identifier') || this.match('number')) {
            // hack to handle float numbers in metric segments
            var parts = this.consumeToken().value.split('.');
            if (parts.length === 2) {
                this.tokens.splice(this.index, 0, { type: '.' });
                this.tokens.splice(this.index + 1, 0, {
                    type: 'number',
                    value: parts[1],
                });
            }
            return {
                type: 'segment',
                value: parts[0],
            };
        }
        if (!this.match('templateStart')) {
            this.errorMark('Expected metric identifier');
        }
        this.consumeToken();
        if (!this.match('identifier')) {
            this.errorMark('Expected identifier after templateStart');
        }
        var node = {
            type: 'template',
            value: this.consumeToken().value,
        };
        if (!this.match('templateEnd')) {
            this.errorMark('Expected templateEnd');
        }
        this.consumeToken();
        return node;
    };
    Parser.prototype.metricExpression = function () {
        if (!this.match('templateStart') && !this.match('identifier') && !this.match('number') && !this.match('{')) {
            return null;
        }
        var node = {
            type: 'metric',
            segments: [],
        };
        node.segments.push(this.metricSegment());
        while (this.match('.')) {
            this.consumeToken();
            var segment = this.metricSegment();
            if (!segment) {
                this.errorMark('Expected metric identifier');
            }
            node.segments.push(segment);
        }
        return node;
    };
    Parser.prototype.functionCall = function () {
        if (!this.match('identifier', '(')) {
            return null;
        }
        var node = {
            type: 'function',
            name: this.consumeToken().value,
        };
        // consume left parenthesis
        this.consumeToken();
        node.params = this.functionParameters();
        if (!this.match(')')) {
            this.errorMark('Expected closing parenthesis');
        }
        this.consumeToken();
        return node;
    };
    Parser.prototype.boolExpression = function () {
        if (!this.match('bool')) {
            return null;
        }
        return {
            type: 'bool',
            value: this.consumeToken().value === 'true',
        };
    };
    Parser.prototype.functionParameters = function () {
        if (this.match(')') || this.match('')) {
            return [];
        }
        var param = this.functionCall() ||
            this.numericLiteral() ||
            this.seriesRefExpression() ||
            this.boolExpression() ||
            this.metricExpression() ||
            this.stringLiteral();
        if (!this.match(',')) {
            return [param];
        }
        this.consumeToken();
        return [param].concat(this.functionParameters());
    };
    Parser.prototype.seriesRefExpression = function () {
        if (!this.match('identifier')) {
            return null;
        }
        var value = this.tokens[this.index].value;
        if (!value.match(/\#[A-Z]/)) {
            return null;
        }
        var token = this.consumeToken();
        return {
            type: 'series-ref',
            value: token.value,
        };
    };
    Parser.prototype.numericLiteral = function () {
        if (!this.match('number')) {
            return null;
        }
        return {
            type: 'number',
            value: parseFloat(this.consumeToken().value),
        };
    };
    Parser.prototype.stringLiteral = function () {
        if (!this.match('string')) {
            return null;
        }
        var token = this.consumeToken();
        if (token.isUnclosed) {
            throw { message: 'Unclosed string parameter', pos: token.pos };
        }
        return {
            type: 'string',
            value: token.value,
        };
    };
    Parser.prototype.errorMark = function (text) {
        var currentToken = this.tokens[this.index];
        var type = currentToken ? currentToken.type : 'end of string';
        throw {
            message: text + ' instead found ' + type,
            pos: currentToken ? currentToken.pos : this.lexer.char,
        };
    };
    // returns token value and incre
    Parser.prototype.consumeToken = function () {
        this.index++;
        return this.tokens[this.index - 1];
    };
    Parser.prototype.matchToken = function (type, index) {
        var token = this.tokens[this.index + index];
        return (token === undefined && type === '') || (token && token.type === type);
    };
    Parser.prototype.match = function (token1, token2) {
        return this.matchToken(token1, 0) && (!token2 || this.matchToken(token2, 1));
    };
    return Parser;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/graphite/query_ctrl.ts":
/*!**************************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/query_ctrl.ts ***!
  \**************************************************************/
/*! exports provided: GraphiteQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphiteQueryCtrl", function() { return GraphiteQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _add_graphite_func__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add_graphite_func */ "./public/app/plugins/datasource/graphite/add_graphite_func.ts");
/* harmony import */ var _func_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./func_editor */ "./public/app/plugins/datasource/graphite/func_editor.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _graphite_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graphite_query */ "./public/app/plugins/datasource/graphite/graphite_query.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");








var GRAPHITE_TAG_OPERATORS = ['=', '!=', '=~', '!=~'];
var TAG_PREFIX = 'tag: ';
var GraphiteQueryCtrl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(GraphiteQueryCtrl, _super);
    /** @ngInject */
    function GraphiteQueryCtrl($scope, $injector, uiSegmentSrv, templateSrv, $timeout) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.uiSegmentSrv = uiSegmentSrv;
        _this.templateSrv = templateSrv;
        _this.supportsTags = _this.datasource.supportsTags;
        _this.paused = false;
        _this.target.target = _this.target.target || '';
        _this.datasource.waitForFuncDefsLoaded().then(function () {
            _this.queryModel = new _graphite_query__WEBPACK_IMPORTED_MODULE_4__["default"](_this.datasource, _this.target, templateSrv);
            _this.buildSegments(false);
        });
        _this.removeTagValue = '-- remove tag --';
        return _this;
    }
    GraphiteQueryCtrl.prototype.parseTarget = function () {
        this.queryModel.parseTarget();
        this.buildSegments();
    };
    GraphiteQueryCtrl.prototype.toggleEditorMode = function () {
        this.target.textEditor = !this.target.textEditor;
        this.parseTarget();
    };
    GraphiteQueryCtrl.prototype.buildSegments = function (modifyLastSegment) {
        var _this = this;
        if (modifyLastSegment === void 0) { modifyLastSegment = true; }
        this.segments = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(this.queryModel.segments, function (segment) {
            return _this.uiSegmentSrv.newSegment(segment);
        });
        var checkOtherSegmentsIndex = this.queryModel.checkOtherSegmentsIndex || 0;
        this.checkOtherSegments(checkOtherSegmentsIndex, modifyLastSegment);
        if (this.queryModel.seriesByTagUsed) {
            this.fixTagSegments();
        }
    };
    GraphiteQueryCtrl.prototype.addSelectMetricSegment = function () {
        this.queryModel.addSelectMetricSegment();
        this.segments.push(this.uiSegmentSrv.newSelectMetric());
    };
    GraphiteQueryCtrl.prototype.checkOtherSegments = function (fromIndex, modifyLastSegment) {
        var _this = this;
        if (modifyLastSegment === void 0) { modifyLastSegment = true; }
        if (this.queryModel.segments.length === 1 && this.queryModel.segments[0].type === 'series-ref') {
            return;
        }
        if (fromIndex === 0) {
            this.addSelectMetricSegment();
            return;
        }
        var path = this.queryModel.getSegmentPathUpTo(fromIndex + 1);
        if (path === '') {
            return Promise.resolve();
        }
        return this.datasource
            .metricFindQuery(path)
            .then(function (segments) {
            if (segments.length === 0) {
                if (path !== '' && modifyLastSegment) {
                    _this.queryModel.segments = _this.queryModel.segments.splice(0, fromIndex);
                    _this.segments = _this.segments.splice(0, fromIndex);
                    _this.addSelectMetricSegment();
                }
            }
            else if (segments[0].expandable) {
                if (_this.segments.length === fromIndex) {
                    _this.addSelectMetricSegment();
                }
                else {
                    return _this.checkOtherSegments(fromIndex + 1);
                }
            }
        })
            .catch(function (err) {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_6__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_7__["AppEvents"].alertError, ['Error', err]);
        });
    };
    GraphiteQueryCtrl.prototype.setSegmentFocus = function (segmentIndex) {
        lodash__WEBPACK_IMPORTED_MODULE_3___default.a.each(this.segments, function (segment, index) {
            segment.focus = segmentIndex === index;
        });
    };
    GraphiteQueryCtrl.prototype.getAltSegments = function (index, prefix) {
        var _this = this;
        var query = prefix && prefix.length > 0 ? '*' + prefix + '*' : '*';
        if (index > 0) {
            query = this.queryModel.getSegmentPathUpTo(index) + '.' + query;
        }
        var options = {
            range: this.panelCtrl.range,
            requestId: 'get-alt-segments',
        };
        return this.datasource
            .metricFindQuery(query, options)
            .then(function (segments) {
            var altSegments = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(segments, function (segment) {
                return _this.uiSegmentSrv.newSegment({
                    value: segment.text,
                    expandable: segment.expandable,
                });
            });
            if (index > 0 && altSegments.length === 0) {
                return altSegments;
            }
            // add query references
            if (index === 0) {
                lodash__WEBPACK_IMPORTED_MODULE_3___default.a.eachRight(_this.panelCtrl.panel.targets, function (target) {
                    if (target.refId === _this.queryModel.target.refId) {
                        return;
                    }
                    altSegments.unshift(_this.uiSegmentSrv.newSegment({
                        type: 'series-ref',
                        value: '#' + target.refId,
                        expandable: false,
                    }));
                });
            }
            // add template variables
            lodash__WEBPACK_IMPORTED_MODULE_3___default.a.eachRight(_this.templateSrv.variables, function (variable) {
                altSegments.unshift(_this.uiSegmentSrv.newSegment({
                    type: 'template',
                    value: '$' + variable.name,
                    expandable: true,
                }));
            });
            // add wildcard option
            altSegments.unshift(_this.uiSegmentSrv.newSegment('*'));
            if (_this.supportsTags && index === 0) {
                _this.removeTaggedEntry(altSegments);
                return _this.addAltTagSegments(prefix, altSegments);
            }
            else {
                return altSegments;
            }
        })
            .catch(function (err) {
            return [];
        });
    };
    GraphiteQueryCtrl.prototype.addAltTagSegments = function (prefix, altSegments) {
        return this.getTagsAsSegments(prefix).then(function (tagSegments) {
            tagSegments = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(tagSegments, function (segment) {
                segment.value = TAG_PREFIX + segment.value;
                return segment;
            });
            return altSegments.concat.apply(altSegments, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(tagSegments));
        });
    };
    GraphiteQueryCtrl.prototype.removeTaggedEntry = function (altSegments) {
        altSegments = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.remove(altSegments, function (s) { return s.value === '_tagged'; });
    };
    GraphiteQueryCtrl.prototype.segmentValueChanged = function (segment, segmentIndex) {
        var _this = this;
        this.error = null;
        this.queryModel.updateSegmentValue(segment, segmentIndex);
        if (this.queryModel.functions.length > 0 && this.queryModel.functions[0].def.fake) {
            this.queryModel.functions = [];
        }
        if (segment.type === 'tag') {
            var tag = removeTagPrefix(segment.value);
            this.pause();
            this.addSeriesByTagFunc(tag);
            return;
        }
        if (segment.expandable) {
            return this.checkOtherSegments(segmentIndex + 1).then(function () {
                _this.setSegmentFocus(segmentIndex + 1);
                _this.targetChanged();
            });
        }
        else {
            this.spliceSegments(segmentIndex + 1);
        }
        this.setSegmentFocus(segmentIndex + 1);
        this.targetChanged();
    };
    GraphiteQueryCtrl.prototype.spliceSegments = function (index) {
        this.segments = this.segments.splice(0, index);
        this.queryModel.segments = this.queryModel.segments.splice(0, index);
    };
    GraphiteQueryCtrl.prototype.emptySegments = function () {
        this.queryModel.segments = [];
        this.segments = [];
    };
    GraphiteQueryCtrl.prototype.targetTextChanged = function () {
        this.updateModelTarget();
        this.refresh();
    };
    GraphiteQueryCtrl.prototype.updateModelTarget = function () {
        this.queryModel.updateModelTarget(this.panelCtrl.panel.targets);
    };
    GraphiteQueryCtrl.prototype.targetChanged = function () {
        if (this.queryModel.error) {
            return;
        }
        var oldTarget = this.queryModel.target.target;
        this.updateModelTarget();
        if (this.queryModel.target !== oldTarget && !this.paused) {
            this.panelCtrl.refresh();
        }
    };
    GraphiteQueryCtrl.prototype.addFunction = function (funcDef) {
        var newFunc = this.datasource.createFuncInstance(funcDef, {
            withDefaultParams: true,
        });
        newFunc.added = true;
        this.queryModel.addFunction(newFunc);
        this.smartlyHandleNewAliasByNode(newFunc);
        if (this.segments.length === 1 && this.segments[0].fake) {
            this.emptySegments();
        }
        if (!newFunc.params.length && newFunc.added) {
            this.targetChanged();
        }
        if (newFunc.def.name === 'seriesByTag') {
            this.parseTarget();
        }
    };
    GraphiteQueryCtrl.prototype.removeFunction = function (func) {
        this.queryModel.removeFunction(func);
        this.targetChanged();
    };
    GraphiteQueryCtrl.prototype.moveFunction = function (func, offset) {
        this.queryModel.moveFunction(func, offset);
        this.targetChanged();
    };
    GraphiteQueryCtrl.prototype.addSeriesByTagFunc = function (tag) {
        var newFunc = this.datasource.createFuncInstance('seriesByTag', {
            withDefaultParams: false,
        });
        var tagParam = tag + "=";
        newFunc.params = [tagParam];
        this.queryModel.addFunction(newFunc);
        newFunc.added = true;
        this.emptySegments();
        this.targetChanged();
        this.parseTarget();
    };
    GraphiteQueryCtrl.prototype.smartlyHandleNewAliasByNode = function (func) {
        if (func.def.name !== 'aliasByNode') {
            return;
        }
        for (var i = 0; i < this.segments.length; i++) {
            if (this.segments[i].value.indexOf('*') >= 0) {
                func.params[0] = i;
                func.added = false;
                this.targetChanged();
                return;
            }
        }
    };
    GraphiteQueryCtrl.prototype.getAllTags = function () {
        var _this = this;
        return this.datasource.getTags().then(function (values) {
            var altTags = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(values, 'text');
            altTags.splice(0, 0, _this.removeTagValue);
            return mapToDropdownOptions(altTags);
        });
    };
    GraphiteQueryCtrl.prototype.getTags = function (index, tagPrefix) {
        var _this = this;
        var tagExpressions = this.queryModel.renderTagExpressions(index);
        return this.datasource.getTagsAutoComplete(tagExpressions, tagPrefix).then(function (values) {
            var altTags = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(values, 'text');
            altTags.splice(0, 0, _this.removeTagValue);
            return mapToDropdownOptions(altTags);
        });
    };
    GraphiteQueryCtrl.prototype.getTagsAsSegments = function (tagPrefix) {
        var _this = this;
        var tagExpressions = this.queryModel.renderTagExpressions();
        return this.datasource.getTagsAutoComplete(tagExpressions, tagPrefix).then(function (values) {
            return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(values, function (val) {
                return _this.uiSegmentSrv.newSegment({
                    value: val.text,
                    type: 'tag',
                    expandable: false,
                });
            });
        });
    };
    GraphiteQueryCtrl.prototype.getTagOperators = function () {
        return mapToDropdownOptions(GRAPHITE_TAG_OPERATORS);
    };
    GraphiteQueryCtrl.prototype.getAllTagValues = function (tag) {
        var tagKey = tag.key;
        return this.datasource.getTagValues(tagKey).then(function (values) {
            var altValues = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(values, 'text');
            return mapToDropdownOptions(altValues);
        });
    };
    GraphiteQueryCtrl.prototype.getTagValues = function (tag, index, valuePrefix) {
        var _this = this;
        var tagExpressions = this.queryModel.renderTagExpressions(index);
        var tagKey = tag.key;
        return this.datasource.getTagValuesAutoComplete(tagExpressions, tagKey, valuePrefix).then(function (values) {
            var altValues = lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(values, 'text');
            // Add template variables as additional values
            lodash__WEBPACK_IMPORTED_MODULE_3___default.a.eachRight(_this.templateSrv.variables, function (variable) {
                altValues.push('${' + variable.name + ':regex}');
            });
            return mapToDropdownOptions(altValues);
        });
    };
    GraphiteQueryCtrl.prototype.tagChanged = function (tag, tagIndex) {
        this.queryModel.updateTag(tag, tagIndex);
        this.targetChanged();
    };
    GraphiteQueryCtrl.prototype.addNewTag = function (segment) {
        var newTagKey = segment.value;
        var newTag = { key: newTagKey, operator: '=', value: '' };
        this.queryModel.addTag(newTag);
        this.targetChanged();
        this.fixTagSegments();
    };
    GraphiteQueryCtrl.prototype.removeTag = function (index) {
        this.queryModel.removeTag(index);
        this.targetChanged();
    };
    GraphiteQueryCtrl.prototype.fixTagSegments = function () {
        // Adding tag with the same name as just removed works incorrectly if single segment is used (instead of array)
        this.addTagSegments = [this.uiSegmentSrv.newPlusButton()];
    };
    GraphiteQueryCtrl.prototype.showDelimiter = function (index) {
        return index !== this.queryModel.tags.length - 1;
    };
    GraphiteQueryCtrl.prototype.pause = function () {
        this.paused = true;
    };
    GraphiteQueryCtrl.prototype.unpause = function () {
        this.paused = false;
        this.panelCtrl.refresh();
    };
    GraphiteQueryCtrl.prototype.getCollapsedText = function () {
        return this.target.target;
    };
    GraphiteQueryCtrl.templateUrl = 'partials/query.editor.html';
    return GraphiteQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_5__["QueryCtrl"]));

function mapToDropdownOptions(results) {
    return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.map(results, function (value) {
        return { text: value, value: value };
    });
}
function removeTagPrefix(value) {
    return value.replace(TAG_PREFIX, '');
}


/***/ }),

/***/ "./public/app/plugins/datasource/graphite/types.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/graphite/types.ts ***!
  \*********************************************************/
/*! exports provided: GraphiteType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphiteType", function() { return GraphiteType; });
var GraphiteType;
(function (GraphiteType) {
    GraphiteType["Default"] = "default";
    GraphiteType["Metrictank"] = "metrictank";
})(GraphiteType || (GraphiteType = {}));


/***/ })

}]);
//# sourceMappingURL=graphitePlugin.6310f9af5345c722b930.js.map