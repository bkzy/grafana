(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["FolderSettingsPage"],{

/***/ "./public/app/features/folders/FolderSettingsPage.tsx":
/*!************************************************************!*\
  !*** ./public/app/features/folders/FolderSettingsPage.tsx ***!
  \************************************************************/
/*! exports provided: FolderSettingsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FolderSettingsPage", function() { return FolderSettingsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/folders/state/actions.ts");
/* harmony import */ var _state_navModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/navModel */ "./public/app/features/folders/state/navModel.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/folders/state/reducers.ts");












var FolderSettingsPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FolderSettingsPage, _super);
    function FolderSettingsPage(props) {
        var _this = _super.call(this, props) || this;
        _this.onTitleChange = function (evt) {
            _this.props.setFolderTitle(evt.target.value);
        };
        _this.onSave = function (evt) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evt.preventDefault();
                        evt.stopPropagation();
                        this.setState({ isLoading: true });
                        return [4 /*yield*/, this.props.saveFolder(this.props.folder)];
                    case 1:
                        _a.sent();
                        this.setState({ isLoading: false });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onDelete = function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            app_core_app_events__WEBPACK_IMPORTED_MODULE_6__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_8__["CoreEvents"].showConfirmModal, {
                title: 'Delete',
                text: "Do you want to delete this folder and all its dashboards?",
                icon: 'fa-trash',
                yesText: 'Delete',
                onConfirm: function () {
                    _this.props.deleteFolder(_this.props.folder.uid);
                },
            });
        };
        _this.state = {
            isLoading: false,
        };
        return _this;
    }
    FolderSettingsPage.prototype.componentDidMount = function () {
        this.props.getFolderByUid(this.props.folderUid);
    };
    FolderSettingsPage.prototype.render = function () {
        var _a = this.props, navModel = _a.navModel, folder = _a.folder;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, { isLoading: this.state.isLoading },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-sub-heading" }, "Folder Settings"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "section gf-form-group" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", { name: "folderSettingsForm", onSubmit: this.onSave },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("label", { className: "gf-form-label width-7" }, "Name"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Input"], { type: "text", className: "gf-form-input width-30", value: folder.title, onChange: this.onTitleChange })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-button-row" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { type: "submit", className: "btn btn-primary", disabled: !folder.canSave || !folder.hasChanged }, "Save"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-danger", onClick: this.onDelete, disabled: !folder.canSave }, "Delete")))))));
    };
    return FolderSettingsPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var mapStateToProps = function (state) {
    var uid = state.location.routeParams.uid;
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__["getNavModel"])(state.navIndex, "folder-settings-" + uid, Object(_state_navModel__WEBPACK_IMPORTED_MODULE_10__["getLoadingNav"])(2)),
        folderUid: uid,
        folder: state.folder,
    };
};
var mapDispatchToProps = {
    getFolderByUid: _state_actions__WEBPACK_IMPORTED_MODULE_9__["getFolderByUid"],
    saveFolder: _state_actions__WEBPACK_IMPORTED_MODULE_9__["saveFolder"],
    setFolderTitle: _state_reducers__WEBPACK_IMPORTED_MODULE_11__["setFolderTitle"],
    deleteFolder: _state_actions__WEBPACK_IMPORTED_MODULE_9__["deleteFolder"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(FolderSettingsPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=FolderSettingsPage.6310f9af5345c722b930.js.map