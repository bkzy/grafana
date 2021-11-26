webpackHotUpdate("default~app",{

/***/ "./packages/grafana-data/src/index.ts":
/*!*********************************************************************************!*\
  !*** d:/Code/Go/src/github.com/bkzy/grafana/packages/grafana-data/src/index.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./packages/grafana-data/src/utils/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Registry", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["Registry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onUpdateDatasourceOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["onUpdateDatasourceOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onUpdateDatasourceJsonDataOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["onUpdateDatasourceJsonDataOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onUpdateDatasourceSecureJsonDataOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["onUpdateDatasourceSecureJsonDataOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onUpdateDatasourceJsonDataOptionSelect", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["onUpdateDatasourceJsonDataOptionSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onUpdateDatasourceSecureJsonDataOptionSelect", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["onUpdateDatasourceSecureJsonDataOptionSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "onUpdateDatasourceResetOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["onUpdateDatasourceResetOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateDatasourcePluginOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["updateDatasourcePluginOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateDatasourcePluginJsonDataOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["updateDatasourcePluginJsonDataOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateDatasourcePluginSecureJsonDataOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["updateDatasourcePluginSecureJsonDataOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateDatasourcePluginResetOption", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["updateDatasourcePluginResetOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deprecationWarning", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["deprecationWarning"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSVHeaderStyle", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["CSVHeaderStyle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "readCSV", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["readCSV"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CSVReader", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["CSVReader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toCSV", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toCSV"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLogLevel", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getLogLevel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLogLevelFromKey", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getLogLevelFromKey"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addLogLevelToSeries", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["addLogLevelToSeries"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogsParsers", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["LogsParsers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateFieldStats", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["calculateFieldStats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateLogsLabelStats", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["calculateLogsLabelStats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateStats", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["calculateStats"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getParser", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseLabels", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["parseLabels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findCommonLabels", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["findCommonLabels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findUniqueLabels", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["findUniqueLabels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatLabels", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["formatLabels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objRemoveUndefined", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["objRemoveUndefined"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColorDefinitionByName", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getColorDefinitionByName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColorDefinition", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getColorDefinition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColorName", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getColorName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColorByName", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getColorByName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColorFromHexRgbOrName", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getColorFromHexRgbOrName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColorForTheme", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getColorForTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getNamedColorPalette", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getNamedColorPalette"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSeriesTimeStep", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getSeriesTimeStep"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasMsResolution", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["hasMsResolution"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getMappedValue", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getMappedValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFlotPairs", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getFlotPairs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFlotPairsConstant", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getFlotPairsConstant"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/grafana-data/src/types/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if(["Registry","onUpdateDatasourceOption","onUpdateDatasourceJsonDataOption","onUpdateDatasourceSecureJsonDataOption","onUpdateDatasourceJsonDataOptionSelect","onUpdateDatasourceSecureJsonDataOptionSelect","onUpdateDatasourceResetOption","updateDatasourcePluginOption","updateDatasourcePluginJsonDataOption","updateDatasourcePluginSecureJsonDataOption","updateDatasourcePluginResetOption","deprecationWarning","CSVHeaderStyle","readCSV","CSVReader","toCSV","getLogLevel","getLogLevelFromKey","addLogLevelToSeries","LogsParsers","calculateFieldStats","calculateLogsLabelStats","calculateStats","getParser","parseLabels","findCommonLabels","findUniqueLabels","formatLabels","objRemoveUndefined","getColorDefinitionByName","getColorDefinition","getColorName","getColorByName","getColorFromHexRgbOrName","getColorForTheme","getNamedColorPalette","getSeriesTimeStep","hasMsResolution","getMappedValue","getFlotPairs","getFlotPairsConstant","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./vector */ "./packages/grafana-data/src/vector/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppendedVectors", function() { return _vector__WEBPACK_IMPORTED_MODULE_2__["AppendedVectors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayVector", function() { return _vector__WEBPACK_IMPORTED_MODULE_2__["ArrayVector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CircularVector", function() { return _vector__WEBPACK_IMPORTED_MODULE_2__["CircularVector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConstantVector", function() { return _vector__WEBPACK_IMPORTED_MODULE_2__["ConstantVector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScaledVector", function() { return _vector__WEBPACK_IMPORTED_MODULE_2__["ScaledVector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SortedVector", function() { return _vector__WEBPACK_IMPORTED_MODULE_2__["SortedVector"]; });

/* harmony import */ var _dataframe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataframe */ "./packages/grafana-data/src/dataframe/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataFrameView", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["DataFrameView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldCache", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["FieldCache"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CircularDataFrame", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["CircularDataFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MISSING_VALUE", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["MISSING_VALUE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MutableDataFrame", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["MutableDataFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "guessFieldTypeFromValue", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["guessFieldTypeFromValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "guessFieldTypeForField", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["guessFieldTypeForField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "guessFieldTypes", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["guessFieldTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTableData", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["isTableData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDataFrame", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["isDataFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toDataFrame", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["toDataFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toLegacyResponseData", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["toLegacyResponseData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortDataFrame", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["sortDataFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reverseDataFrame", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["reverseDataFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTimeField", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["getTimeField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDataFrameRow", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["getDataFrameRow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toDataFrameDTO", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["toDataFrameDTO"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createDimension", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["createDimension"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColumnsFromDimension", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["getColumnsFromDimension"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getColumnFromDimension", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["getColumnFromDimension"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getValueFromDimension", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["getValueFromDimension"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAllValuesFromDimension", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["getAllValuesFromDimension"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDimensionByName", function() { return _dataframe__WEBPACK_IMPORTED_MODULE_3__["getDimensionByName"]; });

/* harmony import */ var _transformations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transformations */ "./packages/grafana-data/src/transformations/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MatcherID", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["MatcherID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldMatcherID", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["FieldMatcherID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FrameMatcherID", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["FrameMatcherID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataTransformerID", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["DataTransformerID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fieldMatchers", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["fieldMatchers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "frameMatchers", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["frameMatchers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFieldMatcher", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["getFieldMatcher"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFrameMatchers", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["getFrameMatchers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformDataFrame", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["transformDataFrame"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformersRegistry", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["transformersRegistry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReduceTransformerOptions", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["ReduceTransformerOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterFieldsByNameTransformerOptions", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["FilterFieldsByNameTransformerOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReducerID", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["ReducerID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduceField", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["reduceField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fieldReducers", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["fieldReducers"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilterFramesByRefIdTransformerOptions", function() { return _transformations__WEBPACK_IMPORTED_MODULE_4__["FilterFramesByRefIdTransformerOptions"]; });

/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datetime */ "./packages/grafana-data/src/datetime/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ISO_8601", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["ISO_8601"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLocale", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["setLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLocaleData", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["getLocaleData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDateTime", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["isDateTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toUtc", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["toUtc"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toDuration", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["toDuration"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTime", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["dateTime"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTimeAsMoment", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["dateTimeAsMoment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateTimeForTimeZone", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["dateTimeForTimeZone"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTimeZoneGroups", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["getTimeZoneGroups"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_DATE_TIME_FORMAT", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_DATE_TIME_FORMAT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MS_DATE_TIME_FORMAT", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["MS_DATE_TIME_FORMAT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateMath", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["dateMath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rangeUtil", function() { return _datetime__WEBPACK_IMPORTED_MODULE_5__["rangeUtil"]; });

/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./text */ "./packages/grafana-data/src/text/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "escapeStringForRegex", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["escapeStringForRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unEscapeStringFromRegex", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["unEscapeStringFromRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringStartsAsRegEx", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["stringStartsAsRegEx"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToJsRegex", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["stringToJsRegex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToMs", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["stringToMs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toNumberString", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["toNumberString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toIntegerOrUndefined", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["toIntegerOrUndefined"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toFloatOrUndefined", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["toFloatOrUndefined"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setMarkdownOptions", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["setMarkdownOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "renderMarkdown", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["renderMarkdown"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findHighlightChunksInText", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["findHighlightChunksInText"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findMatchesInText", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["findMatchesInText"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseFlags", function() { return _text__WEBPACK_IMPORTED_MODULE_6__["parseFlags"]; });

/* harmony import */ var _valueFormats__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./valueFormats */ "./packages/grafana-data/src/valueFormats/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formattedValueToString", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["formattedValueToString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toFixed", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["toFixed"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toFixedScaled", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["toFixedScaled"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toFixedUnit", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["toFixedUnit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scaledUnits", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["scaledUnits"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "locale", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["locale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "simpleCountUnit", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["simpleCountUnit"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getValueFormat", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["getValueFormat"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getValueFormatterIndex", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["getValueFormatterIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getValueFormats", function() { return _valueFormats__WEBPACK_IMPORTED_MODULE_7__["getValueFormats"]; });

/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./field */ "./packages/grafana-data/src/field/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAR_SERIES_NAME", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["VAR_SERIES_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAR_FIELD_NAME", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["VAR_FIELD_NAME"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAR_CALC", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["VAR_CALC"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VAR_CELL_PREFIX", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["VAR_CELL_PREFIX"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_FIELD_DISPLAY_VALUES_LIMIT", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["DEFAULT_FIELD_DISPLAY_VALUES_LIMIT"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getFieldDisplayValues", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["getFieldDisplayValues"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDisplayValueAlignmentFactors", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["getDisplayValueAlignmentFactors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDisplayProcessor", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["getDisplayProcessor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDecimalsForValue", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["getDecimalsForValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getScaleCalculator", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["getScaleCalculator"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getActiveThreshold", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["getActiveThreshold"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortThresholds", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["sortThresholds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyFieldOverrides", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["applyFieldOverrides"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateFieldConfig", function() { return _field__WEBPACK_IMPORTED_MODULE_8__["validateFieldConfig"]; });












/***/ }),

/***/ "./packages/grafana-runtime/src/index.ts":
/*!************************************************************************************!*\
  !*** d:/Code/Go/src/github.com/bkzy/grafana/packages/grafana-runtime/src/index.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./packages/grafana-runtime/src/services/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setBackendSrv", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["setBackendSrv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getBackendSrv", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["getBackendSrv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setAngularLoader", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["setAngularLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAngularLoader", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["getAngularLoader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setDataSourceSrv", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["setDataSourceSrv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDataSourceSrv", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["getDataSourceSrv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setLocationSrv", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["setLocationSrv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLocationSrv", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["getLocationSrv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EchoEventType", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["EchoEventType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setEchoSrv", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["setEchoSrv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEchoSrv", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["getEchoSrv"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerEchoBackend", function() { return _services__WEBPACK_IMPORTED_MODULE_0__["registerEchoBackend"]; });

/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./packages/grafana-runtime/src/config.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GrafanaBootConfig", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["GrafanaBootConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "config", function() { return _config__WEBPACK_IMPORTED_MODULE_1__["config"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./packages/grafana-runtime/src/types/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_2__) if(["loadPluginCss","SystemJS","reportMetaAnalytics","DataSourceWithBackend","setBackendSrv","getBackendSrv","setAngularLoader","getAngularLoader","setDataSourceSrv","getDataSourceSrv","setLocationSrv","getLocationSrv","EchoEventType","setEchoSrv","getEchoSrv","registerEchoBackend","GrafanaBootConfig","config","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _utils_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/plugin */ "./packages/grafana-runtime/src/utils/plugin.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadPluginCss", function() { return _utils_plugin__WEBPACK_IMPORTED_MODULE_3__["loadPluginCss"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SystemJS", function() { return _utils_plugin__WEBPACK_IMPORTED_MODULE_3__["SystemJS"]; });

/* harmony import */ var _utils_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/analytics */ "./packages/grafana-runtime/src/utils/analytics.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reportMetaAnalytics", function() { return _utils_analytics__WEBPACK_IMPORTED_MODULE_4__["reportMetaAnalytics"]; });

/* harmony import */ var _utils_DataSourceWithBackend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/DataSourceWithBackend */ "./packages/grafana-runtime/src/utils/DataSourceWithBackend.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataSourceWithBackend", function() { return _utils_DataSourceWithBackend__WEBPACK_IMPORTED_MODULE_5__["DataSourceWithBackend"]; });









/***/ }),

/***/ "./packages/grafana-ui/src/index.ts":
/*!*******************************************************************************!*\
  !*** d:/Code/Go/src/github.com/bkzy/grafana/packages/grafana-ui/src/index.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ "./packages/grafana-ui/src/components/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfirmButton", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ConfirmButton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeleteButton", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["DeleteButton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Tooltip"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopoverContent", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["PopoverContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PopoverController", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["PopoverController"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popover", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Popover"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Portal", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Portal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CustomScrollbar", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["CustomScrollbar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Button"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinkButton", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LinkButton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Select", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsyncSelect", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["AsyncSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IndicatorsContainer", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["IndicatorsContainer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoOptionsMessage", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["NoOptionsMessage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resetSelectStyles", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["resetSelectStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonSelect", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ButtonSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ButtonCascader", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ButtonCascader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cascader", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Cascader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CascaderOption", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["CascaderOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormLabel", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["FormLabel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormField", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["FormField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecretFormField", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SecretFormField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoadingPlaceholder", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LoadingPlaceholder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorPicker", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ColorPicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SeriesColorPicker", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SeriesColorPicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SeriesColorPickerPopover", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SeriesColorPickerPopover"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SeriesColorPickerPopoverWithTheme", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SeriesColorPickerPopoverWithTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelOptionsGroup", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["PanelOptionsGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PanelOptionsGrid", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["PanelOptionsGrid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueMappingsEditor", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ValueMappingsEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Switch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmptySearchResult", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["EmptySearchResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PieChart", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["PieChart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PieChartType", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["PieChartType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnitPicker", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["UnitPicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StatsPicker", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["StatsPicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Input"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InputStatus", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["InputStatus"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RefreshPicker", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["RefreshPicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimePicker", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["TimePicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeOfDayPicker", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["TimeOfDayPicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "List", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["List"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TagsInput", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["TagsInput"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Modal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfirmModal", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ConfirmModal"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryField", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["QueryField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SetInterval", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SetInterval"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Table"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TableInputCSV", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["TableInputCSV"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabsBar", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["TabsBar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Tab"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabContent", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["TabContent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BigValue", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["BigValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BigValueColorMode", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["BigValueColorMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BigValueSparkline", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["BigValueSparkline"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BigValueGraphMode", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["BigValueGraphMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BigValueJustifyMode", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["BigValueJustifyMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Gauge", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Gauge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Graph", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Graph"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphLegend", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["GraphLegend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphWithLegend", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["GraphWithLegend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphContextMenu", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["GraphContextMenu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BarGauge", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["BarGauge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BarGaugeDisplayMode", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["BarGaugeDisplayMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphTooltipOptions", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["GraphTooltipOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VizRepeater", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["VizRepeater"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendOptions", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LegendOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendBasicOptions", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LegendBasicOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendRenderOptions", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LegendRenderOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendList", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LegendList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendTable", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LegendTable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendItem", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LegendItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendPlacement", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LegendPlacement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendDisplayMode", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LegendDisplayMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Alert", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Alert"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlertVariant", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["AlertVariant"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphSeriesToggler", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["GraphSeriesToggler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphSeriesTogglerAPI", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["GraphSeriesTogglerAPI"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Collapse", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Collapse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogLabels", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LogLabels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogRows", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["LogRows"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLogRowStyles", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["getLogRowStyles"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleButtonGroup", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ToggleButtonGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ToggleButton"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThresholdsEditor", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ThresholdsEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClickOutsideWrapper", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ClickOutsideWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldDisplayEditor", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["FieldDisplayEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldPropertiesEditor", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["FieldPropertiesEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SingleStatBaseOptions", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SingleStatBaseOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sharedSingleStatPanelChangedHandler", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["sharedSingleStatPanelChangedHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sharedSingleStatMigrationHandler", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["sharedSingleStatMigrationHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "convertOldAngularValueMapping", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["convertOldAngularValueMapping"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CallToActionCard", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["CallToActionCard"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ContextMenu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextMenuItem", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ContextMenuItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextMenuGroup", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ContextMenuGroup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextMenuProps", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ContextMenuProps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VariableSuggestion", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["VariableSuggestion"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VariableOrigin", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["VariableOrigin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataLinksEditor", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["DataLinksEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataLinkInput", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["DataLinkInput"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataLinksContextMenu", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["DataLinksContextMenu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SeriesIcon", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SeriesIcon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transformersUIRegistry", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["transformersUIRegistry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformationRow", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["TransformationRow"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformationsEditor", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["TransformationsEditor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JSONFormatter", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["JSONFormatter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JsonExplorer", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["JsonExplorer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorBoundary", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ErrorBoundary"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorBoundaryAlert", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ErrorBoundaryAlert"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ErrorWithStack", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["ErrorWithStack"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AlphaNotice", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["AlphaNotice"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataSourceHttpSettings", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["DataSourceHttpSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spinner", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Spinner"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FadeTransition", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["FadeTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlideOutTransition", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SlideOutTransition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Segment", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Segment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SegmentAsync", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SegmentAsync"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SegmentInput", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SegmentInput"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SegmentSelect", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["SegmentSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Chart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Icon"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Drawer", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Drawer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Forms", function() { return _components__WEBPACK_IMPORTED_MODULE_0__["Forms"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./packages/grafana-ui/src/types/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_1__) if(["ConfirmButton","DeleteButton","Tooltip","PopoverContent","PopoverController","Popover","Portal","CustomScrollbar","Button","LinkButton","Select","AsyncSelect","IndicatorsContainer","NoOptionsMessage","resetSelectStyles","ButtonSelect","ButtonCascader","Cascader","CascaderOption","FormLabel","FormField","SecretFormField","LoadingPlaceholder","ColorPicker","SeriesColorPicker","SeriesColorPickerPopover","SeriesColorPickerPopoverWithTheme","PanelOptionsGroup","PanelOptionsGrid","ValueMappingsEditor","Switch","EmptySearchResult","PieChart","PieChartType","UnitPicker","StatsPicker","Input","InputStatus","RefreshPicker","TimePicker","TimeOfDayPicker","List","TagsInput","Modal","ConfirmModal","QueryField","SetInterval","Table","TableInputCSV","TabsBar","Tab","TabContent","BigValue","BigValueColorMode","BigValueSparkline","BigValueGraphMode","BigValueJustifyMode","Gauge","Graph","GraphLegend","GraphWithLegend","GraphContextMenu","BarGauge","BarGaugeDisplayMode","GraphTooltipOptions","VizRepeater","LegendOptions","LegendBasicOptions","LegendRenderOptions","LegendList","LegendTable","LegendItem","LegendPlacement","LegendDisplayMode","Alert","AlertVariant","GraphSeriesToggler","GraphSeriesTogglerAPI","Collapse","LogLabels","LogRows","getLogRowStyles","ToggleButtonGroup","ToggleButton","ThresholdsEditor","ClickOutsideWrapper","FieldDisplayEditor","FieldPropertiesEditor","SingleStatBaseOptions","sharedSingleStatPanelChangedHandler","sharedSingleStatMigrationHandler","convertOldAngularValueMapping","CallToActionCard","ContextMenu","ContextMenuItem","ContextMenuGroup","ContextMenuProps","VariableSuggestion","VariableOrigin","DataLinksEditor","DataLinkInput","DataLinksContextMenu","SeriesIcon","transformersUIRegistry","TransformationRow","TransformationsEditor","JSONFormatter","JsonExplorer","ErrorBoundary","ErrorBoundaryAlert","ErrorWithStack","AlphaNotice","DataSourceHttpSettings","Spinner","FadeTransition","SlideOutTransition","Segment","SegmentAsync","SegmentInput","SegmentSelect","Chart","Icon","Drawer","Forms","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./packages/grafana-ui/src/utils/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PALETTE_ROWS", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["PALETTE_ROWS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PALETTE_COLUMNS", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["PALETTE_COLUMNS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ANNOTATION_COLOR", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_ANNOTATION_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OK_COLOR", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["OK_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ALERTING_COLOR", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["ALERTING_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NO_DATA_COLOR", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["NO_DATA_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PENDING_COLOR", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["PENDING_COLOR"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "REGION_FILL_ALPHA", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["REGION_FILL_ALPHA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["colors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortedColors", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["sortedColors"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsWithValidation", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["EventsWithValidation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["validate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasValidationEvent", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["hasValidationEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "regexValidation", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["regexValidation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SCHEMA", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["SCHEMA"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeFragment", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["makeFragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "makeValue", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["makeValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataLinkBuiltInVars", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["DataLinkBuiltInVars"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "linkModelToContextMenuItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["linkModelToContextMenuItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTagColorsFromName", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["getTagColorsFromName"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "measureText", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["measureText"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateFontSize", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["calculateFontSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ansicolor", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["ansicolor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DOMUtil", function() { return _utils__WEBPACK_IMPORTED_MODULE_2__["DOMUtil"]; });

/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./themes */ "./packages/grafana-ui/src/themes/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stylesFactory", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["stylesFactory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeContext", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["ThemeContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["withTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mockTheme", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["mockTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getTheme", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["getTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectThemeVariant", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["selectThemeVariant"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTheme", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["useTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mockThemeContext", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["mockThemeContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "styleMixins", function() { return _themes__WEBPACK_IMPORTED_MODULE_3__["styleMixins"]; });

/* harmony import */ var _slate_plugins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slate-plugins */ "./packages/grafana-ui/src/slate-plugins/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BracesPlugin", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["BracesPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClearPlugin", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["ClearPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClipboardPlugin", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["ClipboardPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IndentationPlugin", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["IndentationPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewlinePlugin", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["NewlinePlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RunnerPlugin", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["RunnerPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SelectionShortcutsPlugin", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["SelectionShortcutsPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SlatePrism", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["SlatePrism"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SuggestionsPlugin", function() { return _slate_plugins__WEBPACK_IMPORTED_MODULE_4__["SuggestionsPlugin"]; });








/***/ })

})
//# sourceMappingURL=default~app.3be89b10bc2fa3533f8c.hot-update.js.map