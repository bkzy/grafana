(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["grafanaPlugin"],{

/***/ "./public/app/plugins/datasource/grafana/datasource.ts":
/*!*************************************************************!*\
  !*** ./public/app/plugins/datasource/grafana/datasource.ts ***!
  \*************************************************************/
/*! exports provided: GrafanaDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrafanaDatasource", function() { return GrafanaDatasource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


var GrafanaDatasource = /** @class */ (function () {
    /** @ngInject */
    function GrafanaDatasource(backendSrv, templateSrv) {
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
    }
    GrafanaDatasource.prototype.query = function (options) {
        return this.backendSrv
            .get('/api/tsdb/testdata/random-walk', {
            from: options.range.from.valueOf(),
            to: options.range.to.valueOf(),
            intervalMs: options.intervalMs,
            maxDataPoints: options.maxDataPoints,
        })
            .then(function (res) {
            var data = [];
            if (res.results) {
                lodash__WEBPACK_IMPORTED_MODULE_1___default.a.forEach(res.results, function (queryRes) {
                    var e_1, _a;
                    try {
                        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(queryRes.series), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var series = _c.value;
                            data.push({
                                target: series.name,
                                datapoints: series.points,
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
                });
            }
            return { data: data };
        });
    };
    GrafanaDatasource.prototype.metricFindQuery = function (options) {
        return Promise.resolve({ data: [] });
    };
    GrafanaDatasource.prototype.annotationQuery = function (options) {
        var e_2, _a, e_3, _b;
        var params = {
            from: options.range.from.valueOf(),
            to: options.range.to.valueOf(),
            limit: options.annotation.limit,
            tags: options.annotation.tags,
            matchAny: options.annotation.matchAny,
        };
        if (options.annotation.type === 'dashboard') {
            // if no dashboard id yet return
            if (!options.dashboard.id) {
                return Promise.resolve([]);
            }
            // filter by dashboard id
            params.dashboardId = options.dashboard.id;
            // remove tags filter if any
            delete params.tags;
        }
        else {
            // require at least one tag
            if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray(options.annotation.tags) || options.annotation.tags.length === 0) {
                return Promise.resolve([]);
            }
            var delimiter_1 = '__delimiter__';
            var tags = [];
            try {
                for (var _c = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(params.tags), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var t = _d.value;
                    var renderedValues = this.templateSrv.replace(t, {}, function (value) {
                        if (typeof value === 'string') {
                            return value;
                        }
                        return value.join(delimiter_1);
                    });
                    try {
                        for (var _e = (e_3 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(renderedValues.split(delimiter_1))), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var tt = _f.value;
                            tags.push(tt);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
            params.tags = tags;
        }
        return this.backendSrv.get('/api/annotations', params);
    };
    return GrafanaDatasource;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/grafana/module.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/grafana/module.ts ***!
  \*********************************************************/
/*! exports provided: GrafanaDatasource, Datasource, QueryCtrl, AnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return GrafanaQueryCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return GrafanaAnnotationsQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/grafana/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GrafanaDatasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_1__["GrafanaDatasource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_1__["GrafanaDatasource"]; });

/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");



var GrafanaQueryCtrl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(GrafanaQueryCtrl, _super);
    function GrafanaQueryCtrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GrafanaQueryCtrl.templateUrl = 'partials/query.editor.html';
    return GrafanaQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__["QueryCtrl"]));
var GrafanaAnnotationsQueryCtrl = /** @class */ (function () {
    function GrafanaAnnotationsQueryCtrl() {
        this.types = [
            { text: 'Dashboard', value: 'dashboard' },
            { text: 'Tags', value: 'tags' },
        ];
        this.annotation.type = this.annotation.type || 'tags';
        this.annotation.limit = this.annotation.limit || 100;
    }
    GrafanaAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return GrafanaAnnotationsQueryCtrl;
}());



/***/ })

}]);
//# sourceMappingURL=grafanaPlugin.6310f9af5345c722b930.js.map