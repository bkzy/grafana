(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./public/app/plugins/datasource/dashboard/datasource.ts":
/*!***************************************************************!*\
  !*** ./public/app/plugins/datasource/dashboard/datasource.ts ***!
  \***************************************************************/
/*! exports provided: DashboardDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardDatasource", function() { return DashboardDatasource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");


/**
 * This should not really be called
 */
var DashboardDatasource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DashboardDatasource, _super);
    function DashboardDatasource(instanceSettings) {
        return _super.call(this, instanceSettings) || this;
    }
    DashboardDatasource.prototype.getCollapsedText = function (query) {
        return "Dashboard Reference: " + query.panelId;
    };
    DashboardDatasource.prototype.query = function (options) {
        return Promise.reject('This should not be called directly');
    };
    DashboardDatasource.prototype.testDatasource = function () {
        return Promise.resolve({});
    };
    return DashboardDatasource;
}(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourceApi"]));



/***/ }),

/***/ "./public/app/plugins/datasource/dashboard/module.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/dashboard/module.ts ***!
  \***********************************************************/
/*! exports provided: plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/dashboard/datasource.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");


var plugin = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["DataSourcePlugin"](_datasource__WEBPACK_IMPORTED_MODULE_0__["DashboardDatasource"]);


/***/ })

}]);
//# sourceMappingURL=4.6310f9af5345c722b930.js.map