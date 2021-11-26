(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["FolderPermissions"],{

/***/ "./public/app/features/folders/FolderPermissions.tsx":
/*!***********************************************************!*\
  !*** ./public/app/features/folders/FolderPermissions.tsx ***!
  \***********************************************************/
/*! exports provided: FolderPermissions, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FolderPermissions", function() { return FolderPermissions; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/Animations/SlideDown */ "./public/app/core/components/Animations/SlideDown.tsx");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/folders/state/actions.ts");
/* harmony import */ var _state_navModel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/navModel */ "./public/app/features/folders/state/navModel.ts");
/* harmony import */ var app_core_components_PermissionList_PermissionList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/components/PermissionList/PermissionList */ "./public/app/core/components/PermissionList/PermissionList.tsx");
/* harmony import */ var app_core_components_PermissionList_AddPermission__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/components/PermissionList/AddPermission */ "./public/app/core/components/PermissionList/AddPermission.tsx");
/* harmony import */ var app_core_components_PermissionList_PermissionsInfo__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/components/PermissionList/PermissionsInfo */ "./public/app/core/components/PermissionList/PermissionsInfo.tsx");













var FolderPermissions = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(FolderPermissions, _super);
    function FolderPermissions(props) {
        var _this = _super.call(this, props) || this;
        _this.onOpenAddPermissions = function () {
            _this.setState({ isAdding: true });
        };
        _this.onRemoveItem = function (item) {
            _this.props.removeFolderPermission(item);
        };
        _this.onPermissionChanged = function (item, level) {
            _this.props.updateFolderPermission(item, level);
        };
        _this.onAddPermission = function (newItem) {
            return _this.props.addFolderPermission(newItem);
        };
        _this.onCancelAddPermission = function () {
            _this.setState({ isAdding: false });
        };
        _this.state = {
            isAdding: false,
        };
        return _this;
    }
    FolderPermissions.prototype.componentDidMount = function () {
        this.props.getFolderByUid(this.props.folderUid);
        this.props.getFolderPermissions(this.props.folderUid);
    };
    FolderPermissions.prototype.render = function () {
        var _a = this.props, navModel = _a.navModel, folder = _a.folder;
        var isAdding = this.state.isAdding;
        if (folder.id === 0) {
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null))));
        }
        var folderInfo = { title: folder.title, url: folder.url, id: folder.id };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-sub-heading" }, "Folder Permissions"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["Tooltip"], { placement: "auto", content: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PermissionList_PermissionsInfo__WEBPACK_IMPORTED_MODULE_12__["default"], null) },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-sub-heading-icon" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "gicon gicon-question gicon--has-hover" }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-primary pull-right", onClick: this.onOpenAddPermissions, disabled: isAdding }, "Add Permission")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_6__["SlideDown"], { in: isAdding },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PermissionList_AddPermission__WEBPACK_IMPORTED_MODULE_11__["default"], { onAddPermission: this.onAddPermission, onCancel: this.onCancelAddPermission })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PermissionList_PermissionList__WEBPACK_IMPORTED_MODULE_10__["default"], { items: folder.permissions, onRemoveItem: this.onRemoveItem, onPermissionChanged: this.onPermissionChanged, isFetching: false, folderInfo: folderInfo }))));
    };
    return FolderPermissions;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var mapStateToProps = function (state) {
    var uid = state.location.routeParams.uid;
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_7__["getNavModel"])(state.navIndex, "folder-permissions-" + uid, Object(_state_navModel__WEBPACK_IMPORTED_MODULE_9__["getLoadingNav"])(1)),
        folderUid: uid,
        folder: state.folder,
    };
};
var mapDispatchToProps = {
    getFolderByUid: _state_actions__WEBPACK_IMPORTED_MODULE_8__["getFolderByUid"],
    getFolderPermissions: _state_actions__WEBPACK_IMPORTED_MODULE_8__["getFolderPermissions"],
    updateFolderPermission: _state_actions__WEBPACK_IMPORTED_MODULE_8__["updateFolderPermission"],
    removeFolderPermission: _state_actions__WEBPACK_IMPORTED_MODULE_8__["removeFolderPermission"],
    addFolderPermission: _state_actions__WEBPACK_IMPORTED_MODULE_8__["addFolderPermission"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(FolderPermissions)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=FolderPermissions.6310f9af5345c722b930.js.map