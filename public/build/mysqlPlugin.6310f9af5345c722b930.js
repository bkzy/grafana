(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mysqlPlugin"],{

/***/ "./public/app/core/components/sql_part/sql_part.ts":
/*!*********************************************************!*\
  !*** ./public/app/core/components/sql_part/sql_part.ts ***!
  \*********************************************************/
/*! exports provided: SqlPartDef, SqlPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqlPartDef", function() { return SqlPartDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SqlPart", function() { return SqlPart; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var SqlPartDef = /** @class */ (function () {
    function SqlPartDef(options) {
        this.type = options.type;
        if (options.label) {
            this.label = options.label;
        }
        else {
            this.label = this.type[0].toUpperCase() + this.type.substring(1) + ':';
        }
        this.style = options.style;
        if (this.style === 'function') {
            this.wrapOpen = '(';
            this.wrapClose = ')';
            this.separator = ', ';
        }
        else {
            this.wrapOpen = ' ';
            this.wrapClose = ' ';
            this.separator = ' ';
        }
        this.params = options.params;
        this.defaultParams = options.defaultParams;
    }
    return SqlPartDef;
}());

var SqlPart = /** @class */ (function () {
    function SqlPart(part, def) {
        this.part = part;
        this.def = def;
        if (!this.def) {
            throw { message: 'Could not find sql part ' + part.type };
        }
        this.datatype = part.datatype;
        if (part.name) {
            this.name = part.name;
            this.label = def.label + ' ' + part.name;
        }
        else {
            this.name = '';
            this.label = def.label;
        }
        part.params = part.params || lodash__WEBPACK_IMPORTED_MODULE_0___default.a.clone(this.def.defaultParams);
        this.params = part.params;
    }
    SqlPart.prototype.updateParam = function (strValue, index) {
        // handle optional parameters
        if (strValue === '' && this.def.params[index].optional) {
            this.params.splice(index, 1);
        }
        else {
            this.params[index] = strValue;
        }
        this.part.params = this.params;
    };
    return SqlPart;
}());



/***/ }),

/***/ "./public/app/features/datasources/utils/passwordHandlers.ts":
/*!*******************************************************************!*\
  !*** ./public/app/features/datasources/utils/passwordHandlers.ts ***!
  \*******************************************************************/
/*! exports provided: PasswordFieldEnum, createResetHandler, createChangeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordFieldEnum", function() { return PasswordFieldEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createResetHandler", function() { return createResetHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createChangeHandler", function() { return createChangeHandler; });
/**
 * Set of handlers for secure password field in Angular components. They handle backward compatibility with
 * passwords stored in plain text fields.
 */
var PasswordFieldEnum;
(function (PasswordFieldEnum) {
    PasswordFieldEnum["Password"] = "password";
    PasswordFieldEnum["BasicAuthPassword"] = "basicAuthPassword";
})(PasswordFieldEnum || (PasswordFieldEnum = {}));
var createResetHandler = function (ctrl, field) { return function (event) {
    event.preventDefault();
    // Reset also normal plain text password to remove it and only save it in secureJsonData.
    ctrl.current[field] = null;
    ctrl.current.secureJsonFields[field] = false;
    ctrl.current.secureJsonData = ctrl.current.secureJsonData || {};
    ctrl.current.secureJsonData[field] = '';
}; };
var createChangeHandler = function (ctrl, field) { return function (event) {
    ctrl.current.secureJsonData = ctrl.current.secureJsonData || {};
    ctrl.current.secureJsonData[field] = event.currentTarget.value;
}; };


/***/ }),

/***/ "./public/app/plugins/datasource/mysql/datasource.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/datasource.ts ***!
  \***********************************************************/
/*! exports provided: MysqlDatasource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MysqlDatasource", function() { return MysqlDatasource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _response_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./response_parser */ "./public/app/plugins/datasource/mysql/response_parser.ts");
/* harmony import */ var app_plugins_datasource_mysql_mysql_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/plugins/datasource/mysql/mysql_query */ "./public/app/plugins/datasource/mysql/mysql_query.ts");
/* harmony import */ var _features_templating_variable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../features/templating/variable */ "./public/app/features/templating/variable.ts");





var MysqlDatasource = /** @class */ (function () {
    /** @ngInject */
    function MysqlDatasource(instanceSettings, backendSrv, templateSrv, timeSrv) {
        var _this = this;
        this.backendSrv = backendSrv;
        this.templateSrv = templateSrv;
        this.timeSrv = timeSrv;
        this.interpolateVariable = function (value, variable) {
            if (typeof value === 'string') {
                if (variable.multi || variable.includeAll) {
                    var result = _this.queryModel.quoteLiteral(value);
                    return result;
                }
                else {
                    return value;
                }
            }
            if (typeof value === 'number') {
                return value;
            }
            var quotedValues = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(value, function (v) {
                return _this.queryModel.quoteLiteral(v);
            });
            return quotedValues.join(',');
        };
        this.name = instanceSettings.name;
        this.id = instanceSettings.id;
        this.responseParser = new _response_parser__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.queryModel = new app_plugins_datasource_mysql_mysql_query__WEBPACK_IMPORTED_MODULE_3__["default"]({});
        this.interval = (instanceSettings.jsonData || {}).timeInterval || '1m';
    }
    MysqlDatasource.prototype.interpolateVariablesInQueries = function (queries, scopedVars) {
        var _this = this;
        var expandedQueries = queries;
        if (queries && queries.length > 0) {
            expandedQueries = queries.map(function (query) {
                var expandedQuery = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, query), { datasource: _this.name, rawSql: _this.templateSrv.replace(query.rawSql, scopedVars, _this.interpolateVariable) });
                return expandedQuery;
            });
        }
        return expandedQueries;
    };
    MysqlDatasource.prototype.query = function (options) {
        var _this = this;
        var queries = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(options.targets, function (target) {
            return target.hide !== true;
        }).map(function (target) {
            var queryModel = new app_plugins_datasource_mysql_mysql_query__WEBPACK_IMPORTED_MODULE_3__["default"](target, _this.templateSrv, options.scopedVars);
            return {
                refId: target.refId,
                intervalMs: options.intervalMs,
                maxDataPoints: options.maxDataPoints,
                datasourceId: _this.id,
                rawSql: queryModel.render(_this.interpolateVariable),
                format: target.format,
            };
        });
        if (queries.length === 0) {
            return Promise.resolve({ data: [] });
        }
        return this.backendSrv
            .datasourceRequest({
            url: '/api/tsdb/query',
            method: 'POST',
            data: {
                from: options.range.from.valueOf().toString(),
                to: options.range.to.valueOf().toString(),
                queries: queries,
            },
        })
            .then(this.responseParser.processQueryResult);
    };
    MysqlDatasource.prototype.annotationQuery = function (options) {
        var _this = this;
        if (!options.annotation.rawQuery) {
            return Promise.reject({
                message: 'Query missing in annotation definition',
            });
        }
        var query = {
            refId: options.annotation.name,
            datasourceId: this.id,
            rawSql: this.templateSrv.replace(options.annotation.rawQuery, options.scopedVars, this.interpolateVariable),
            format: 'table',
        };
        return this.backendSrv
            .datasourceRequest({
            url: '/api/tsdb/query',
            method: 'POST',
            data: {
                from: options.range.from.valueOf().toString(),
                to: options.range.to.valueOf().toString(),
                queries: [query],
            },
        })
            .then(function (data) { return _this.responseParser.transformAnnotationResponse(options, data); });
    };
    MysqlDatasource.prototype.metricFindQuery = function (query, optionalOptions) {
        var _this = this;
        var refId = 'tempvar';
        if (optionalOptions && optionalOptions.variable && optionalOptions.variable.name) {
            refId = optionalOptions.variable.name;
        }
        var rawSql = this.templateSrv.replace(query, Object(_features_templating_variable__WEBPACK_IMPORTED_MODULE_4__["getSearchFilterScopedVar"])({ query: query, wildcardChar: '%', options: optionalOptions }), this.interpolateVariable);
        var interpolatedQuery = {
            refId: refId,
            datasourceId: this.id,
            rawSql: rawSql,
            format: 'table',
        };
        var range = this.timeSrv.timeRange();
        var data = {
            queries: [interpolatedQuery],
            from: range.from.valueOf().toString(),
            to: range.to.valueOf().toString(),
        };
        if (optionalOptions && optionalOptions.range && optionalOptions.range.from) {
            data['from'] = optionalOptions.range.from.valueOf().toString();
        }
        if (optionalOptions && optionalOptions.range && optionalOptions.range.to) {
            data['to'] = optionalOptions.range.to.valueOf().toString();
        }
        return this.backendSrv
            .datasourceRequest({
            url: '/api/tsdb/query',
            method: 'POST',
            data: data,
        })
            .then(function (data) { return _this.responseParser.parseMetricFindQueryResult(refId, data); });
    };
    MysqlDatasource.prototype.testDatasource = function () {
        return this.backendSrv
            .datasourceRequest({
            url: '/api/tsdb/query',
            method: 'POST',
            data: {
                from: '5m',
                to: 'now',
                queries: [
                    {
                        refId: 'A',
                        intervalMs: 1,
                        maxDataPoints: 1,
                        datasourceId: this.id,
                        rawSql: 'SELECT 1',
                        format: 'table',
                    },
                ],
            },
        })
            .then(function (res) {
            return { status: 'success', message: 'Database Connection OK' };
        })
            .catch(function (err) {
            console.log(err);
            if (err.data && err.data.message) {
                return { status: 'error', message: err.data.message };
            }
            else {
                return { status: 'error', message: err.status };
            }
        });
    };
    MysqlDatasource.prototype.targetContainsTemplate = function (target) {
        var rawSql = '';
        if (target.rawQuery) {
            rawSql = target.rawSql;
        }
        else {
            var query = new app_plugins_datasource_mysql_mysql_query__WEBPACK_IMPORTED_MODULE_3__["default"](target);
            rawSql = query.buildQuery();
        }
        rawSql = rawSql.replace('$__', '');
        return this.templateSrv.variableExists(rawSql);
    };
    return MysqlDatasource;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/mysql/meta_query.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/meta_query.ts ***!
  \***********************************************************/
/*! exports provided: MysqlMetaQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MysqlMetaQuery", function() { return MysqlMetaQuery; });
var MysqlMetaQuery = /** @class */ (function () {
    function MysqlMetaQuery(target, queryModel) {
        this.target = target;
        this.queryModel = queryModel;
    }
    MysqlMetaQuery.prototype.getOperators = function (datatype) {
        switch (datatype) {
            case 'double':
            case 'float': {
                return ['=', '!=', '<', '<=', '>', '>='];
            }
            case 'text':
            case 'tinytext':
            case 'mediumtext':
            case 'longtext':
            case 'varchar':
            case 'char': {
                return ['=', '!=', '<', '<=', '>', '>=', 'IN', 'NOT IN', 'LIKE', 'NOT LIKE'];
            }
            default: {
                return ['=', '!=', '<', '<=', '>', '>=', 'IN', 'NOT IN'];
            }
        }
    };
    // quote identifier as literal to use in metadata queries
    MysqlMetaQuery.prototype.quoteIdentAsLiteral = function (value) {
        return this.queryModel.quoteLiteral(this.queryModel.unquoteIdentifier(value));
    };
    MysqlMetaQuery.prototype.findMetricTable = function () {
        // query that returns first table found that has a timestamp(tz) column and a float column
        var query = "\n  SELECT\n    table_name as table_name,\n    ( SELECT\n        column_name as column_name\n      FROM information_schema.columns c\n      WHERE\n        c.table_schema = t.table_schema AND\n        c.table_name = t.table_name AND\n        c.data_type IN ('timestamp', 'datetime')\n      ORDER BY ordinal_position LIMIT 1\n    ) AS time_column,\n    ( SELECT\n        column_name AS column_name\n      FROM information_schema.columns c\n      WHERE\n        c.table_schema = t.table_schema AND\n        c.table_name = t.table_name AND\n        c.data_type IN('float', 'int', 'bigint')\n      ORDER BY ordinal_position LIMIT 1\n    ) AS value_column\n  FROM information_schema.tables t\n  WHERE\n    t.table_schema = database() AND\n    EXISTS\n    ( SELECT 1\n      FROM information_schema.columns c\n      WHERE\n        c.table_schema = t.table_schema AND\n        c.table_name = t.table_name AND\n        c.data_type IN ('timestamp', 'datetime')\n    ) AND\n    EXISTS\n    ( SELECT 1\n      FROM information_schema.columns c\n      WHERE\n        c.table_schema = t.table_schema AND\n        c.table_name = t.table_name AND\n        c.data_type IN('float', 'int', 'bigint')\n    )\n  LIMIT 1\n;";
        return query;
    };
    MysqlMetaQuery.prototype.buildTableConstraint = function (table) {
        var query = '';
        // check for schema qualified table
        if (table.includes('.')) {
            var parts = table.split('.');
            query = 'table_schema = ' + this.quoteIdentAsLiteral(parts[0]);
            query += ' AND table_name = ' + this.quoteIdentAsLiteral(parts[1]);
            return query;
        }
        else {
            query = 'table_schema = database() AND table_name = ' + this.quoteIdentAsLiteral(table);
            return query;
        }
    };
    MysqlMetaQuery.prototype.buildTableQuery = function () {
        return 'SELECT table_name FROM information_schema.tables WHERE table_schema = database() ORDER BY table_name';
    };
    MysqlMetaQuery.prototype.buildColumnQuery = function (type) {
        var query = 'SELECT column_name FROM information_schema.columns WHERE ';
        query += this.buildTableConstraint(this.target.table);
        switch (type) {
            case 'time': {
                query += " AND data_type IN ('timestamp','datetime','bigint','int','double','float')";
                break;
            }
            case 'metric': {
                query += " AND data_type IN ('text','tinytext','mediumtext','longtext','varchar','char')";
                break;
            }
            case 'value': {
                query += " AND data_type IN ('bigint','int','smallint','mediumint','tinyint','double','decimal','float')";
                query += ' AND column_name <> ' + this.quoteIdentAsLiteral(this.target.timeColumn);
                break;
            }
            case 'group': {
                query += " AND data_type IN ('text','tinytext','mediumtext','longtext','varchar','char')";
                break;
            }
        }
        query += ' ORDER BY column_name';
        return query;
    };
    MysqlMetaQuery.prototype.buildValueQuery = function (column) {
        var query = 'SELECT DISTINCT QUOTE(' + column + ')';
        query += ' FROM ' + this.target.table;
        query += ' WHERE $__timeFilter(' + this.target.timeColumn + ')';
        query += ' ORDER BY 1 LIMIT 100';
        return query;
    };
    MysqlMetaQuery.prototype.buildDatatypeQuery = function (column) {
        var query = "\nSELECT data_type\nFROM information_schema.columns\nWHERE ";
        query += ' table_name = ' + this.quoteIdentAsLiteral(this.target.table);
        query += ' AND column_name = ' + this.quoteIdentAsLiteral(column);
        return query;
    };
    return MysqlMetaQuery;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/mysql/module.ts":
/*!*******************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/module.ts ***!
  \*******************************************************/
/*! exports provided: MysqlDatasource, Datasource, QueryCtrl, ConfigCtrl, AnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return MysqlConfigCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return MysqlAnnotationsQueryCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/mysql/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MysqlDatasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["MysqlDatasource"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["MysqlDatasource"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/mysql/query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_1__["MysqlQueryCtrl"]; });

/* harmony import */ var _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../features/datasources/utils/passwordHandlers */ "./public/app/features/datasources/utils/passwordHandlers.ts");



var MysqlConfigCtrl = /** @class */ (function () {
    function MysqlConfigCtrl() {
        this.onPasswordReset = Object(_features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__["createResetHandler"])(this, _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__["PasswordFieldEnum"].Password);
        this.onPasswordChange = Object(_features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__["createChangeHandler"])(this, _features_datasources_utils_passwordHandlers__WEBPACK_IMPORTED_MODULE_2__["PasswordFieldEnum"].Password);
    }
    MysqlConfigCtrl.templateUrl = 'partials/config.html';
    return MysqlConfigCtrl;
}());
var defaultQuery = "SELECT\n    UNIX_TIMESTAMP(<time_column>) as time_sec,\n    <text_column> as text,\n    <tags_column> as tags\n  FROM <table name>\n  WHERE $__timeFilter(time_column)\n  ORDER BY <time_column> ASC\n  LIMIT 100\n  ";
var MysqlAnnotationsQueryCtrl = /** @class */ (function () {
    /** @ngInject */
    function MysqlAnnotationsQueryCtrl() {
        this.annotation.rawQuery = this.annotation.rawQuery || defaultQuery;
    }
    MysqlAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return MysqlAnnotationsQueryCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/mysql/mysql_query.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/mysql_query.ts ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


var MysqlQuery = /** @class */ (function () {
    /** @ngInject */
    function MysqlQuery(target, templateSrv, scopedVars) {
        this.target = target;
        this.templateSrv = templateSrv;
        this.scopedVars = scopedVars;
        target.format = target.format || 'time_series';
        target.timeColumn = target.timeColumn || 'time';
        target.metricColumn = target.metricColumn || 'none';
        target.group = target.group || [];
        target.where = target.where || [{ type: 'macro', name: '$__timeFilter', params: [] }];
        target.select = target.select || [[{ type: 'column', params: ['value'] }]];
        // handle pre query gui panels gracefully
        if (!('rawQuery' in this.target)) {
            if ('rawSql' in target) {
                // pre query gui panel
                target.rawQuery = true;
            }
            else {
                // new panel
                target.rawQuery = false;
            }
        }
        // give interpolateQueryStr access to this
        this.interpolateQueryStr = this.interpolateQueryStr.bind(this);
    }
    // remove identifier quoting from identifier to use in metadata queries
    MysqlQuery.prototype.unquoteIdentifier = function (value) {
        if (value[0] === '"' && value[value.length - 1] === '"') {
            return value.substring(1, value.length - 1).replace(/""/g, '"');
        }
        else {
            return value;
        }
    };
    MysqlQuery.prototype.quoteIdentifier = function (value) {
        return '"' + value.replace(/"/g, '""') + '"';
    };
    MysqlQuery.prototype.quoteLiteral = function (value) {
        return "'" + value.replace(/'/g, "''") + "'";
    };
    MysqlQuery.prototype.escapeLiteral = function (value) {
        return String(value).replace(/'/g, "''");
    };
    MysqlQuery.prototype.hasTimeGroup = function () {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(this.target.group, function (g) { return g.type === 'time'; });
    };
    MysqlQuery.prototype.hasMetricColumn = function () {
        return this.target.metricColumn !== 'none';
    };
    MysqlQuery.prototype.interpolateQueryStr = function (value, variable, defaultFormatFn) {
        // if no multi or include all do not regexEscape
        if (!variable.multi && !variable.includeAll) {
            return this.escapeLiteral(value);
        }
        if (typeof value === 'string') {
            return this.quoteLiteral(value);
        }
        var escapedValues = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(value, this.quoteLiteral);
        return escapedValues.join(',');
    };
    MysqlQuery.prototype.render = function (interpolate) {
        var target = this.target;
        // new query with no table set yet
        if (!this.target.rawQuery && !('table' in this.target)) {
            return '';
        }
        if (!target.rawQuery) {
            target.rawSql = this.buildQuery();
        }
        if (interpolate) {
            return this.templateSrv.replace(target.rawSql, this.scopedVars, this.interpolateQueryStr);
        }
        else {
            return target.rawSql;
        }
    };
    MysqlQuery.prototype.hasUnixEpochTimecolumn = function () {
        return ['int', 'bigint', 'double'].indexOf(this.target.timeColumnType) > -1;
    };
    MysqlQuery.prototype.buildTimeColumn = function (alias) {
        if (alias === void 0) { alias = true; }
        var timeGroup = this.hasTimeGroup();
        var query;
        var macro = '$__timeGroup';
        if (timeGroup) {
            var args = void 0;
            if (timeGroup.params.length > 1 && timeGroup.params[1] !== 'none') {
                args = timeGroup.params.join(',');
            }
            else {
                args = timeGroup.params[0];
            }
            if (this.hasUnixEpochTimecolumn()) {
                macro = '$__unixEpochGroup';
            }
            if (alias) {
                macro += 'Alias';
            }
            query = macro + '(' + this.target.timeColumn + ',' + args + ')';
        }
        else {
            query = this.target.timeColumn;
            if (alias) {
                query += ' AS "time"';
            }
        }
        return query;
    };
    MysqlQuery.prototype.buildMetricColumn = function () {
        if (this.hasMetricColumn()) {
            return this.target.metricColumn + ' AS metric';
        }
        return '';
    };
    MysqlQuery.prototype.buildValueColumns = function () {
        var e_1, _a;
        var query = '';
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.target.select), _c = _b.next(); !_c.done; _c = _b.next()) {
                var column = _c.value;
                query += ',\n  ' + this.buildValueColumn(column);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return query;
    };
    MysqlQuery.prototype.buildValueColumn = function (column) {
        var query = '';
        var columnName = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(column, function (g) { return g.type === 'column'; });
        query = columnName.params[0];
        var aggregate = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(column, function (g) { return g.type === 'aggregate'; });
        if (aggregate) {
            var func = aggregate.params[0];
            query = func + '(' + query + ')';
        }
        var alias = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(column, function (g) { return g.type === 'alias'; });
        if (alias) {
            query += ' AS ' + this.quoteIdentifier(alias.params[0]);
        }
        return query;
    };
    MysqlQuery.prototype.buildWhereClause = function () {
        var _this = this;
        var query = '';
        var conditions = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.target.where, function (tag, index) {
            switch (tag.type) {
                case 'macro':
                    return tag.name + '(' + _this.target.timeColumn + ')';
                    break;
                case 'expression':
                    return tag.params.join(' ');
                    break;
            }
        });
        if (conditions.length > 0) {
            query = '\nWHERE\n  ' + conditions.join(' AND\n  ');
        }
        return query;
    };
    MysqlQuery.prototype.buildGroupClause = function () {
        var query = '';
        var groupSection = '';
        for (var i = 0; i < this.target.group.length; i++) {
            var part = this.target.group[i];
            if (i > 0) {
                groupSection += ', ';
            }
            if (part.type === 'time') {
                groupSection += '1';
            }
            else {
                groupSection += part.params[0];
            }
        }
        if (groupSection.length) {
            query = '\nGROUP BY ' + groupSection;
            if (this.hasMetricColumn()) {
                query += ',2';
            }
        }
        return query;
    };
    MysqlQuery.prototype.buildQuery = function () {
        var query = 'SELECT';
        query += '\n  ' + this.buildTimeColumn();
        if (this.hasMetricColumn()) {
            query += ',\n  ' + this.buildMetricColumn();
        }
        query += this.buildValueColumns();
        query += '\nFROM ' + this.target.table;
        query += this.buildWhereClause();
        query += this.buildGroupClause();
        query += '\nORDER BY ' + this.buildTimeColumn(false);
        return query;
    };
    return MysqlQuery;
}());
/* harmony default export */ __webpack_exports__["default"] = (MysqlQuery);


/***/ }),

/***/ "./public/app/plugins/datasource/mysql/query_ctrl.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/query_ctrl.ts ***!
  \***********************************************************/
/*! exports provided: MysqlQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MysqlQueryCtrl", function() { return MysqlQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _meta_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meta_query */ "./public/app/plugins/datasource/mysql/meta_query.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");
/* harmony import */ var _mysql_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mysql_query */ "./public/app/plugins/datasource/mysql/mysql_query.ts");
/* harmony import */ var _sql_part__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sql_part */ "./public/app/plugins/datasource/mysql/sql_part.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");









var defaultQuery = "SELECT\n  UNIX_TIMESTAMP(<time_column>) as time_sec,\n  <value column> as value,\n  <series name column> as metric\nFROM <table name>\nWHERE $__timeFilter(time_column)\nORDER BY <time_column> ASC\n";
var MysqlQueryCtrl = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(MysqlQueryCtrl, _super);
    /** @ngInject */
    function MysqlQueryCtrl($scope, $injector, templateSrv, uiSegmentSrv) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.templateSrv = templateSrv;
        _this.uiSegmentSrv = uiSegmentSrv;
        _this.target = _this.target;
        _this.queryModel = new _mysql_query__WEBPACK_IMPORTED_MODULE_5__["default"](_this.target, templateSrv, _this.panel.scopedVars);
        _this.metaBuilder = new _meta_query__WEBPACK_IMPORTED_MODULE_3__["MysqlMetaQuery"](_this.target, _this.queryModel);
        _this.updateProjection();
        _this.formats = [
            { text: 'Time series', value: 'time_series' },
            { text: 'Table', value: 'table' },
        ];
        if (!_this.target.rawSql) {
            // special handling when in table panel
            if (_this.panelCtrl.panel.type === 'table') {
                _this.target.format = 'table';
                _this.target.rawSql = 'SELECT 1';
                _this.target.rawQuery = true;
            }
            else {
                _this.target.rawSql = defaultQuery;
                _this.datasource.metricFindQuery(_this.metaBuilder.findMetricTable()).then(function (result) {
                    if (result.length > 0) {
                        _this.target.table = result[0].text;
                        var segment = _this.uiSegmentSrv.newSegment(_this.target.table);
                        _this.tableSegment.html = segment.html;
                        _this.tableSegment.value = segment.value;
                        _this.target.timeColumn = result[1].text;
                        segment = _this.uiSegmentSrv.newSegment(_this.target.timeColumn);
                        _this.timeColumnSegment.html = segment.html;
                        _this.timeColumnSegment.value = segment.value;
                        _this.target.timeColumnType = 'timestamp';
                        _this.target.select = [[{ type: 'column', params: [result[2].text] }]];
                        _this.updateProjection();
                        _this.updateRawSqlAndRefresh();
                    }
                });
            }
        }
        if (!_this.target.table) {
            _this.tableSegment = uiSegmentSrv.newSegment({ value: 'select table', fake: true });
        }
        else {
            _this.tableSegment = uiSegmentSrv.newSegment(_this.target.table);
        }
        _this.timeColumnSegment = uiSegmentSrv.newSegment(_this.target.timeColumn);
        _this.metricColumnSegment = uiSegmentSrv.newSegment(_this.target.metricColumn);
        _this.buildSelectMenu();
        _this.whereAdd = _this.uiSegmentSrv.newPlusButton();
        _this.groupAdd = _this.uiSegmentSrv.newPlusButton();
        _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_8__["PanelEvents"].dataReceived, _this.onDataReceived.bind(_this), $scope);
        _this.panelCtrl.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_8__["PanelEvents"].dataError, _this.onDataError.bind(_this), $scope);
        return _this;
    }
    MysqlQueryCtrl.prototype.updateRawSqlAndRefresh = function () {
        if (!this.target.rawQuery) {
            this.target.rawSql = this.queryModel.buildQuery();
        }
        this.panelCtrl.refresh();
    };
    MysqlQueryCtrl.prototype.updateProjection = function () {
        this.selectParts = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.target.select, function (parts) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(parts, _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create).filter(function (n) { return n; });
        });
        this.whereParts = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.target.where, _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create).filter(function (n) { return n; });
        this.groupParts = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.target.group, _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create).filter(function (n) { return n; });
    };
    MysqlQueryCtrl.prototype.updatePersistedParts = function () {
        this.target.select = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.selectParts, function (selectParts) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(selectParts, function (part) {
                return { type: part.def.type, datatype: part.datatype, params: part.params };
            });
        });
        this.target.where = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.whereParts, function (part) {
            return { type: part.def.type, datatype: part.datatype, name: part.name, params: part.params };
        });
        this.target.group = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.groupParts, function (part) {
            return { type: part.def.type, datatype: part.datatype, params: part.params };
        });
    };
    MysqlQueryCtrl.prototype.buildSelectMenu = function () {
        this.selectMenu = [];
        var aggregates = {
            text: 'Aggregate Functions',
            value: 'aggregate',
            submenu: [
                { text: 'Average', value: 'avg' },
                { text: 'Count', value: 'count' },
                { text: 'Maximum', value: 'max' },
                { text: 'Minimum', value: 'min' },
                { text: 'Sum', value: 'sum' },
                { text: 'Standard deviation', value: 'stddev' },
                { text: 'Variance', value: 'variance' },
            ],
        };
        this.selectMenu.push(aggregates);
        this.selectMenu.push({ text: 'Alias', value: 'alias' });
        this.selectMenu.push({ text: 'Column', value: 'column' });
    };
    MysqlQueryCtrl.prototype.toggleEditorMode = function () {
        var _this = this;
        if (this.target.rawQuery) {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_7__["CoreEvents"].showConfirmModal, {
                title: 'Warning',
                text2: 'Switching to query builder may overwrite your raw SQL.',
                icon: 'fa-exclamation',
                yesText: 'Switch',
                onConfirm: function () {
                    _this.target.rawQuery = !_this.target.rawQuery;
                },
            });
        }
        else {
            this.target.rawQuery = !this.target.rawQuery;
        }
    };
    MysqlQueryCtrl.prototype.resetPlusButton = function (button) {
        var plusButton = this.uiSegmentSrv.newPlusButton();
        button.html = plusButton.html;
        button.value = plusButton.value;
    };
    MysqlQueryCtrl.prototype.getTableSegments = function () {
        return this.datasource
            .metricFindQuery(this.metaBuilder.buildTableQuery())
            .then(this.transformToSegments({}))
            .catch(this.handleQueryError.bind(this));
    };
    MysqlQueryCtrl.prototype.tableChanged = function () {
        var _this = this;
        this.target.table = this.tableSegment.value;
        this.target.where = [];
        this.target.group = [];
        this.updateProjection();
        var segment = this.uiSegmentSrv.newSegment('none');
        this.metricColumnSegment.html = segment.html;
        this.metricColumnSegment.value = segment.value;
        this.target.metricColumn = 'none';
        var task1 = this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery('time')).then(function (result) {
            // check if time column is still valid
            if (result.length > 0 && !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(result, function (r) { return r.text === _this.target.timeColumn; })) {
                var segment_1 = _this.uiSegmentSrv.newSegment(result[0].text);
                _this.timeColumnSegment.html = segment_1.html;
                _this.timeColumnSegment.value = segment_1.value;
            }
            return _this.timeColumnChanged(false);
        });
        var task2 = this.datasource.metricFindQuery(this.metaBuilder.buildColumnQuery('value')).then(function (result) {
            if (result.length > 0) {
                _this.target.select = [[{ type: 'column', params: [result[0].text] }]];
                _this.updateProjection();
            }
        });
        Promise.all([task1, task2]).then(function () {
            _this.updateRawSqlAndRefresh();
        });
    };
    MysqlQueryCtrl.prototype.getTimeColumnSegments = function () {
        return this.datasource
            .metricFindQuery(this.metaBuilder.buildColumnQuery('time'))
            .then(this.transformToSegments({}))
            .catch(this.handleQueryError.bind(this));
    };
    MysqlQueryCtrl.prototype.timeColumnChanged = function (refresh) {
        var _this = this;
        this.target.timeColumn = this.timeColumnSegment.value;
        return this.datasource
            .metricFindQuery(this.metaBuilder.buildDatatypeQuery(this.target.timeColumn))
            .then(function (result) {
            if (result.length === 1) {
                if (_this.target.timeColumnType !== result[0].text) {
                    _this.target.timeColumnType = result[0].text;
                }
                var partModel = void 0;
                if (_this.queryModel.hasUnixEpochTimecolumn()) {
                    partModel = _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: 'macro', name: '$__unixEpochFilter', params: [] });
                }
                else {
                    partModel = _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: 'macro', name: '$__timeFilter', params: [] });
                }
                if (_this.whereParts.length >= 1 && _this.whereParts[0].def.type === 'macro') {
                    // replace current macro
                    _this.whereParts[0] = partModel;
                }
                else {
                    _this.whereParts.splice(0, 0, partModel);
                }
            }
            _this.updatePersistedParts();
            if (refresh !== false) {
                _this.updateRawSqlAndRefresh();
            }
        });
    };
    MysqlQueryCtrl.prototype.getMetricColumnSegments = function () {
        return this.datasource
            .metricFindQuery(this.metaBuilder.buildColumnQuery('metric'))
            .then(this.transformToSegments({ addNone: true }))
            .catch(this.handleQueryError.bind(this));
    };
    MysqlQueryCtrl.prototype.metricColumnChanged = function () {
        this.target.metricColumn = this.metricColumnSegment.value;
        this.updateRawSqlAndRefresh();
    };
    MysqlQueryCtrl.prototype.onDataReceived = function (dataList) {
        this.lastQueryMeta = null;
        this.lastQueryError = null;
        var anySeriesFromQuery = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(dataList, { refId: this.target.refId });
        if (anySeriesFromQuery) {
            this.lastQueryMeta = anySeriesFromQuery.meta;
        }
    };
    MysqlQueryCtrl.prototype.onDataError = function (err) {
        if (err.data && err.data.results) {
            var queryRes = err.data.results[this.target.refId];
            if (queryRes) {
                this.lastQueryMeta = queryRes.meta;
                this.lastQueryError = queryRes.error;
            }
        }
    };
    MysqlQueryCtrl.prototype.transformToSegments = function (config) {
        var _this = this;
        return function (results) {
            var e_1, _a;
            var segments = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(results, function (segment) {
                return _this.uiSegmentSrv.newSegment({
                    value: segment.text,
                    expandable: segment.expandable,
                });
            });
            if (config.addTemplateVars) {
                try {
                    for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.templateSrv.variables), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var variable = _c.value;
                        var value = void 0;
                        value = '$' + variable.name;
                        if (config.templateQuoter && variable.multi === false) {
                            value = config.templateQuoter(value);
                        }
                        segments.unshift(_this.uiSegmentSrv.newSegment({
                            type: 'template',
                            value: value,
                            expandable: true,
                        }));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (config.addNone) {
                segments.unshift(_this.uiSegmentSrv.newSegment({ type: 'template', value: 'none', expandable: true }));
            }
            return segments;
        };
    };
    MysqlQueryCtrl.prototype.findAggregateIndex = function (selectParts) {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.findIndex(selectParts, function (p) { return p.def.type === 'aggregate' || p.def.type === 'percentile'; });
    };
    MysqlQueryCtrl.prototype.findWindowIndex = function (selectParts) {
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.findIndex(selectParts, function (p) { return p.def.type === 'window' || p.def.type === 'moving_window'; });
    };
    MysqlQueryCtrl.prototype.addSelectPart = function (selectParts, item, subItem) {
        var partType = item.value;
        if (subItem && subItem.type) {
            partType = subItem.type;
        }
        var partModel = _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: partType });
        if (subItem) {
            partModel.params[0] = subItem.value;
        }
        var addAlias = false;
        switch (partType) {
            case 'column':
                var parts = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(selectParts, function (part) {
                    return _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: part.def.type, params: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.clone(part.params) });
                });
                this.selectParts.push(parts);
                break;
            case 'percentile':
            case 'aggregate':
                // add group by if no group by yet
                if (this.target.group.length === 0) {
                    this.addGroup('time', '$__interval');
                }
                var aggIndex = this.findAggregateIndex(selectParts);
                if (aggIndex !== -1) {
                    // replace current aggregation
                    selectParts[aggIndex] = partModel;
                }
                else {
                    selectParts.splice(1, 0, partModel);
                }
                if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(selectParts, function (p) { return p.def.type === 'alias'; })) {
                    addAlias = true;
                }
                break;
            case 'moving_window':
            case 'window':
                var windowIndex = this.findWindowIndex(selectParts);
                if (windowIndex !== -1) {
                    // replace current window function
                    selectParts[windowIndex] = partModel;
                }
                else {
                    var aggIndex_1 = this.findAggregateIndex(selectParts);
                    if (aggIndex_1 !== -1) {
                        selectParts.splice(aggIndex_1 + 1, 0, partModel);
                    }
                    else {
                        selectParts.splice(1, 0, partModel);
                    }
                }
                if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.find(selectParts, function (p) { return p.def.type === 'alias'; })) {
                    addAlias = true;
                }
                break;
            case 'alias':
                addAlias = true;
                break;
        }
        if (addAlias) {
            // set initial alias name to column name
            partModel = _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: 'alias', params: [selectParts[0].params[0].replace(/"/g, '')] });
            if (selectParts[selectParts.length - 1].def.type === 'alias') {
                selectParts[selectParts.length - 1] = partModel;
            }
            else {
                selectParts.push(partModel);
            }
        }
        this.updatePersistedParts();
        this.updateRawSqlAndRefresh();
    };
    MysqlQueryCtrl.prototype.removeSelectPart = function (selectParts, part) {
        if (part.def.type === 'column') {
            // remove all parts of column unless its last column
            if (this.selectParts.length > 1) {
                var modelsIndex = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.indexOf(this.selectParts, selectParts);
                this.selectParts.splice(modelsIndex, 1);
            }
        }
        else {
            var partIndex = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.indexOf(selectParts, part);
            selectParts.splice(partIndex, 1);
        }
        this.updatePersistedParts();
    };
    MysqlQueryCtrl.prototype.handleSelectPartEvent = function (selectParts, part, evt) {
        switch (evt.name) {
            case 'get-param-options': {
                switch (part.def.type) {
                    // case 'aggregate':
                    //   return this.datasource
                    //     .metricFindQuery(this.metaBuilder.buildAggregateQuery())
                    //     .then(this.transformToSegments({}))
                    //     .catch(this.handleQueryError.bind(this));
                    case 'column':
                        return this.datasource
                            .metricFindQuery(this.metaBuilder.buildColumnQuery('value'))
                            .then(this.transformToSegments({}))
                            .catch(this.handleQueryError.bind(this));
                }
            }
            case 'part-param-changed': {
                this.updatePersistedParts();
                this.updateRawSqlAndRefresh();
                break;
            }
            case 'action': {
                this.removeSelectPart(selectParts, part);
                this.updateRawSqlAndRefresh();
                break;
            }
            case 'get-part-actions': {
                return Promise.resolve([{ text: 'Remove', value: 'remove-part' }]);
            }
        }
    };
    MysqlQueryCtrl.prototype.handleGroupPartEvent = function (part, index, evt) {
        switch (evt.name) {
            case 'get-param-options': {
                return this.datasource
                    .metricFindQuery(this.metaBuilder.buildColumnQuery())
                    .then(this.transformToSegments({}))
                    .catch(this.handleQueryError.bind(this));
            }
            case 'part-param-changed': {
                this.updatePersistedParts();
                this.updateRawSqlAndRefresh();
                break;
            }
            case 'action': {
                this.removeGroup(part, index);
                this.updateRawSqlAndRefresh();
                break;
            }
            case 'get-part-actions': {
                return Promise.resolve([{ text: 'Remove', value: 'remove-part' }]);
            }
        }
    };
    MysqlQueryCtrl.prototype.addGroup = function (partType, value) {
        var e_2, _a;
        var params = [value];
        if (partType === 'time') {
            params = ['$__interval', 'none'];
        }
        var partModel = _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: partType, params: params });
        if (partType === 'time') {
            // put timeGroup at start
            this.groupParts.splice(0, 0, partModel);
        }
        else {
            this.groupParts.push(partModel);
        }
        try {
            // add aggregates when adding group by
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(this.selectParts), _c = _b.next(); !_c.done; _c = _b.next()) {
                var selectParts = _c.value;
                if (!selectParts.some(function (part) { return part.def.type === 'aggregate'; })) {
                    var aggregate = _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: 'aggregate', params: ['avg'] });
                    selectParts.splice(1, 0, aggregate);
                    if (!selectParts.some(function (part) { return part.def.type === 'alias'; })) {
                        var alias = _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: 'alias', params: [selectParts[0].part.params[0]] });
                        selectParts.push(alias);
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this.updatePersistedParts();
    };
    MysqlQueryCtrl.prototype.removeGroup = function (part, index) {
        if (part.def.type === 'time') {
            // remove aggregations
            this.selectParts = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(this.selectParts, function (s) {
                return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(s, function (part) {
                    if (part.def.type === 'aggregate' || part.def.type === 'percentile') {
                        return false;
                    }
                    return true;
                });
            });
        }
        this.groupParts.splice(index, 1);
        this.updatePersistedParts();
    };
    MysqlQueryCtrl.prototype.handleWherePartEvent = function (whereParts, part, evt, index) {
        var _this = this;
        switch (evt.name) {
            case 'get-param-options': {
                switch (evt.param.name) {
                    case 'left':
                        return this.datasource
                            .metricFindQuery(this.metaBuilder.buildColumnQuery())
                            .then(this.transformToSegments({}))
                            .catch(this.handleQueryError.bind(this));
                    case 'right':
                        if (['int', 'bigint', 'double', 'datetime'].indexOf(part.datatype) > -1) {
                            // don't do value lookups for numerical fields
                            return Promise.resolve([]);
                        }
                        else {
                            return this.datasource
                                .metricFindQuery(this.metaBuilder.buildValueQuery(part.params[0]))
                                .then(this.transformToSegments({
                                addTemplateVars: true,
                                templateQuoter: function (v) {
                                    return _this.queryModel.quoteLiteral(v);
                                },
                            }))
                                .catch(this.handleQueryError.bind(this));
                        }
                    case 'op':
                        return Promise.resolve(this.uiSegmentSrv.newOperators(this.metaBuilder.getOperators(part.datatype)));
                    default:
                        return Promise.resolve([]);
                }
            }
            case 'part-param-changed': {
                this.updatePersistedParts();
                this.datasource.metricFindQuery(this.metaBuilder.buildDatatypeQuery(part.params[0])).then(function (d) {
                    if (d.length === 1) {
                        part.datatype = d[0].text;
                    }
                });
                this.updateRawSqlAndRefresh();
                break;
            }
            case 'action': {
                // remove element
                whereParts.splice(index, 1);
                this.updatePersistedParts();
                this.updateRawSqlAndRefresh();
                break;
            }
            case 'get-part-actions': {
                return Promise.resolve([{ text: 'Remove', value: 'remove-part' }]);
            }
        }
    };
    MysqlQueryCtrl.prototype.getWhereOptions = function () {
        var options = [];
        if (this.queryModel.hasUnixEpochTimecolumn()) {
            options.push(this.uiSegmentSrv.newSegment({ type: 'macro', value: '$__unixEpochFilter' }));
        }
        else {
            options.push(this.uiSegmentSrv.newSegment({ type: 'macro', value: '$__timeFilter' }));
        }
        options.push(this.uiSegmentSrv.newSegment({ type: 'expression', value: 'Expression' }));
        return Promise.resolve(options);
    };
    MysqlQueryCtrl.prototype.addWhereAction = function (part, index) {
        switch (this.whereAdd.type) {
            case 'macro': {
                var partModel = _sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: 'macro', name: this.whereAdd.value, params: [] });
                if (this.whereParts.length >= 1 && this.whereParts[0].def.type === 'macro') {
                    // replace current macro
                    this.whereParts[0] = partModel;
                }
                else {
                    this.whereParts.splice(0, 0, partModel);
                }
                break;
            }
            default: {
                this.whereParts.push(_sql_part__WEBPACK_IMPORTED_MODULE_6__["default"].create({ type: 'expression', params: ['value', '=', 'value'] }));
            }
        }
        this.updatePersistedParts();
        this.resetPlusButton(this.whereAdd);
        this.updateRawSqlAndRefresh();
    };
    MysqlQueryCtrl.prototype.getGroupOptions = function () {
        var _this = this;
        return this.datasource
            .metricFindQuery(this.metaBuilder.buildColumnQuery('group'))
            .then(function (tags) {
            var e_3, _a;
            var options = [];
            if (!_this.queryModel.hasTimeGroup()) {
                options.push(_this.uiSegmentSrv.newSegment({ type: 'time', value: 'time($__interval,none)' }));
            }
            try {
                for (var tags_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(tags), tags_1_1 = tags_1.next(); !tags_1_1.done; tags_1_1 = tags_1.next()) {
                    var tag = tags_1_1.value;
                    options.push(_this.uiSegmentSrv.newSegment({ type: 'column', value: tag.text }));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (tags_1_1 && !tags_1_1.done && (_a = tags_1.return)) _a.call(tags_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return options;
        })
            .catch(this.handleQueryError.bind(this));
    };
    MysqlQueryCtrl.prototype.addGroupAction = function () {
        switch (this.groupAdd.value) {
            default: {
                this.addGroup(this.groupAdd.type, this.groupAdd.value);
            }
        }
        this.resetPlusButton(this.groupAdd);
        this.updateRawSqlAndRefresh();
    };
    MysqlQueryCtrl.prototype.handleQueryError = function (err) {
        this.error = err.message || 'Failed to issue metric query';
        return [];
    };
    MysqlQueryCtrl.templateUrl = 'partials/query.editor.html';
    return MysqlQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_4__["QueryCtrl"]));



/***/ }),

/***/ "./public/app/plugins/datasource/mysql/response_parser.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/response_parser.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


var ResponseParser = /** @class */ (function () {
    function ResponseParser() {
    }
    ResponseParser.prototype.processQueryResult = function (res) {
        var e_1, _a, e_2, _b;
        var data = [];
        if (!res.data.results) {
            return { data: data };
        }
        for (var key in res.data.results) {
            var queryRes = res.data.results[key];
            if (queryRes.series) {
                try {
                    for (var _c = (e_1 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(queryRes.series)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var series = _d.value;
                        data.push({
                            target: series.name,
                            datapoints: series.points,
                            refId: queryRes.refId,
                            meta: queryRes.meta,
                        });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (queryRes.tables) {
                try {
                    for (var _e = (e_2 = void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(queryRes.tables)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var table = _f.value;
                        table.type = 'table';
                        table.refId = queryRes.refId;
                        table.meta = queryRes.meta;
                        data.push(table);
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
        return { data: data };
    };
    ResponseParser.prototype.parseMetricFindQueryResult = function (refId, results) {
        if (!results || results.data.length === 0 || results.data.results[refId].meta.rowCount === 0) {
            return [];
        }
        var columns = results.data.results[refId].tables[0].columns;
        var rows = results.data.results[refId].tables[0].rows;
        var textColIndex = this.findColIndex(columns, '__text');
        var valueColIndex = this.findColIndex(columns, '__value');
        if (columns.length === 2 && textColIndex !== -1 && valueColIndex !== -1) {
            return this.transformToKeyValueList(rows, textColIndex, valueColIndex);
        }
        return this.transformToSimpleList(rows);
    };
    ResponseParser.prototype.transformToKeyValueList = function (rows, textColIndex, valueColIndex) {
        var res = [];
        for (var i = 0; i < rows.length; i++) {
            if (!this.containsKey(res, rows[i][textColIndex])) {
                res.push({
                    text: rows[i][textColIndex],
                    value: rows[i][valueColIndex],
                });
            }
        }
        return res;
    };
    ResponseParser.prototype.transformToSimpleList = function (rows) {
        var res = [];
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < rows[i].length; j++) {
                var value = rows[i][j];
                if (res.indexOf(value) === -1) {
                    res.push(value);
                }
            }
        }
        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(res, function (value) {
            return { text: value };
        });
    };
    ResponseParser.prototype.findColIndex = function (columns, colName) {
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].text === colName) {
                return i;
            }
        }
        return -1;
    };
    ResponseParser.prototype.containsKey = function (res, key) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].text === key) {
                return true;
            }
        }
        return false;
    };
    ResponseParser.prototype.transformAnnotationResponse = function (options, data) {
        var table = data.data.results[options.annotation.name].tables[0];
        var timeColumnIndex = -1;
        var timeEndColumnIndex = -1;
        var textColumnIndex = -1;
        var tagsColumnIndex = -1;
        for (var i = 0; i < table.columns.length; i++) {
            if (table.columns[i].text === 'time_sec' || table.columns[i].text === 'time') {
                timeColumnIndex = i;
            }
            else if (table.columns[i].text === 'timeend') {
                timeEndColumnIndex = i;
            }
            else if (table.columns[i].text === 'title') {
                return Promise.reject({
                    message: 'The title column for annotations is deprecated, now only a column named text is returned',
                });
            }
            else if (table.columns[i].text === 'text') {
                textColumnIndex = i;
            }
            else if (table.columns[i].text === 'tags') {
                tagsColumnIndex = i;
            }
        }
        if (timeColumnIndex === -1) {
            return Promise.reject({
                message: 'Missing mandatory time column (with time_sec column alias) in annotation query.',
            });
        }
        var list = [];
        for (var i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];
            var timeEnd = timeEndColumnIndex !== -1 && row[timeEndColumnIndex] ? Math.floor(row[timeEndColumnIndex]) : undefined;
            list.push({
                annotation: options.annotation,
                time: Math.floor(row[timeColumnIndex]),
                timeEnd: timeEnd,
                text: row[textColumnIndex] ? row[textColumnIndex].toString() : '',
                tags: row[tagsColumnIndex] ? row[tagsColumnIndex].trim().split(/\s*,\s*/) : [],
            });
        }
        return list;
    };
    return ResponseParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (ResponseParser);


/***/ }),

/***/ "./public/app/plugins/datasource/mysql/sql_part.ts":
/*!*********************************************************!*\
  !*** ./public/app/plugins/datasource/mysql/sql_part.ts ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var app_core_components_sql_part_sql_part__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/components/sql_part/sql_part */ "./public/app/core/components/sql_part/sql_part.ts");

var index = [];
function createPart(part) {
    var def = index[part.type];
    if (!def) {
        return null;
    }
    return new app_core_components_sql_part_sql_part__WEBPACK_IMPORTED_MODULE_0__["SqlPart"](part, def);
}
function register(options) {
    index[options.type] = new app_core_components_sql_part_sql_part__WEBPACK_IMPORTED_MODULE_0__["SqlPartDef"](options);
}
register({
    type: 'column',
    style: 'label',
    params: [{ type: 'column', dynamicLookup: true }],
    defaultParams: ['value'],
});
register({
    type: 'expression',
    style: 'expression',
    label: 'Expr:',
    params: [
        { name: 'left', type: 'string', dynamicLookup: true },
        { name: 'op', type: 'string', dynamicLookup: true },
        { name: 'right', type: 'string', dynamicLookup: true },
    ],
    defaultParams: ['value', '=', 'value'],
});
register({
    type: 'macro',
    style: 'label',
    label: 'Macro:',
    params: [],
    defaultParams: [],
});
register({
    type: 'aggregate',
    style: 'label',
    params: [
        {
            name: 'name',
            type: 'string',
            options: ['avg', 'count', 'min', 'max', 'sum', 'stddev', 'variance'],
        },
    ],
    defaultParams: ['avg'],
});
register({
    type: 'alias',
    style: 'label',
    params: [{ name: 'name', type: 'string', quote: 'double' }],
    defaultParams: ['alias'],
});
register({
    type: 'time',
    style: 'function',
    label: 'time',
    params: [
        {
            name: 'interval',
            type: 'interval',
            options: ['$__interval', '1s', '10s', '1m', '5m', '10m', '15m', '1h'],
        },
        {
            name: 'fill',
            type: 'string',
            options: ['none', 'NULL', 'previous', '0'],
        },
    ],
    defaultParams: ['$__interval', 'none'],
});
/* harmony default export */ __webpack_exports__["default"] = ({
    create: createPart,
});


/***/ })

}]);
//# sourceMappingURL=mysqlPlugin.6310f9af5345c722b930.js.map