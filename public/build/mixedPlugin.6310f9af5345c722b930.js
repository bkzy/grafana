(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mixedPlugin"],{

/***/ "./public/app/plugins/datasource/mixed/MixedDataSource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/mixed/MixedDataSource.ts ***!
  \****************************************************************/
/*! exports provided: MIXED_DATASOURCE_NAME, MixedDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIXED_DATASOURCE_NAME", function() { return MIXED_DATASOURCE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MixedDatasource", function() { return MixedDatasource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_groupBy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/groupBy */ "./node_modules/lodash/groupBy.js");
/* harmony import */ var lodash_groupBy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_groupBy__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");








var MIXED_DATASOURCE_NAME = '-- Mixed --';
var MixedDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MixedDatasource, _super);
    function MixedDatasource(instanceSettings) {
        return _super.call(this, instanceSettings) || this;
    }
    MixedDatasource.prototype.query = function (request) {
        // Remove any invalid queries
        var queries = request.targets.filter(function (t) {
            return t.datasource !== MIXED_DATASOURCE_NAME;
        });
        if (!queries.length) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])({ data: [] }); // nothing
        }
        // Build groups of queries to run in parallel
        var sets = lodash_groupBy__WEBPACK_IMPORTED_MODULE_2___default()(queries, 'datasource');
        var mixed = [];
        for (var key in sets) {
            var targets = sets[key];
            var dsName = targets[0].datasource;
            mixed.push({
                datasource: Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getDataSourceSrv"])().get(dsName),
                targets: targets,
            });
        }
        return this.batchQueries(mixed, request);
    };
    MixedDatasource.prototype.batchQueries = function (mixed, request) {
        var observables = [];
        var runningSubRequests = 0;
        var _loop_1 = function (i) {
            var query = mixed[i];
            if (!query.targets || !query.targets.length) {
                return "continue";
            }
            var observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(query.datasource).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function (dataSourceApi) {
                var datasourceRequest = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(request);
                datasourceRequest.requestId = "mixed-" + i + "-" + (datasourceRequest.requestId || '');
                datasourceRequest.targets = query.targets;
                runningSubRequests++;
                var hasCountedAsDone = false;
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(dataSourceApi.query(datasourceRequest)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (response) {
                    if (hasCountedAsDone ||
                        response.state === _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Streaming ||
                        response.state === _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Loading) {
                        return;
                    }
                    runningSubRequests--;
                    hasCountedAsDone = true;
                }, function () {
                    if (hasCountedAsDone) {
                        return;
                    }
                    hasCountedAsDone = true;
                    runningSubRequests--;
                }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
                    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, response), { data: response.data || [], state: runningSubRequests === 0 ? _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Done : _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LoadingState"].Loading, key: "mixed-" + i + "-" + (response.key || '') });
                }));
            }));
            observables.push(observable);
        };
        for (var i = 0; i < mixed.length; i++) {
            _loop_1(i);
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_3__["merge"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(observables));
    };
    MixedDatasource.prototype.testDatasource = function () {
        return Promise.resolve({});
    };
    return MixedDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["DataSourceApi"]));



/***/ }),

/***/ "./public/app/plugins/datasource/mixed/module.ts":
/*!*******************************************************!*\
  !*** ./public/app/plugins/datasource/mixed/module.ts ***!
  \*******************************************************/
/*! exports provided: MixedDatasource, Datasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MixedDataSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MixedDataSource */ "./public/app/plugins/datasource/mixed/MixedDataSource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MixedDatasource", function() { return _MixedDataSource__WEBPACK_IMPORTED_MODULE_0__["MixedDatasource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _MixedDataSource__WEBPACK_IMPORTED_MODULE_0__["MixedDatasource"]; });





/***/ })

}]);
//# sourceMappingURL=mixedPlugin.6310f9af5345c722b930.js.map