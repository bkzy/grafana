(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~FolderPermissions~FolderSettingsPage"],{

/***/ "./public/app/features/folders/state/actions.ts":
/*!******************************************************!*\
  !*** ./public/app/features/folders/state/actions.ts ***!
  \******************************************************/
/*! exports provided: getFolderByUid, saveFolder, deleteFolder, getFolderPermissions, updateFolderPermission, removeFolderPermission, addFolderPermission */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFolderByUid", function() { return getFolderByUid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveFolder", function() { return saveFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteFolder", function() { return deleteFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFolderPermissions", function() { return getFolderPermissions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFolderPermission", function() { return updateFolderPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFolderPermission", function() { return removeFolderPermission; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFolderPermission", function() { return addFolderPermission; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _navModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navModel */ "./public/app/features/folders/state/navModel.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reducers */ "./public/app/features/folders/state/reducers.ts");







function getFolderByUid(uid) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var folder;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().getFolderByUid(uid)];
                case 1:
                    folder = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_6__["loadFolder"])(folder));
                    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateNavIndex"])(Object(_navModel__WEBPACK_IMPORTED_MODULE_4__["buildNavModel"])(folder)));
                    return [2 /*return*/];
            }
        });
    }); };
}
function saveFolder(folder) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var res;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().put("/api/folders/" + folder.uid, {
                        title: folder.title,
                        version: folder.version,
                    })];
                case 1:
                    res = _a.sent();
                    // this should be redux action at some point
                    app_core_app_events__WEBPACK_IMPORTED_MODULE_5__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["AppEvents"].alertSuccess, ['Folder saved']);
                    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({ path: res.url + "/settings" }));
                    return [2 /*return*/];
            }
        });
    }); };
}
function deleteFolder(uid) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().deleteFolder(uid, true)];
                case 1:
                    _a.sent();
                    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({ path: "dashboards" }));
                    return [2 /*return*/];
            }
        });
    }); };
}
function getFolderPermissions(uid) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var permissions;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get("/api/folders/" + uid + "/permissions")];
                case 1:
                    permissions = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_6__["loadFolderPermissions"])(permissions));
                    return [2 /*return*/];
            }
        });
    }); };
}
function toUpdateItem(item) {
    return {
        userId: item.userId,
        teamId: item.teamId,
        role: item.role,
        permission: item.permission,
    };
}
function updateFolderPermission(itemToUpdate, level) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var folder, itemsToUpdate, _a, _b, item, updated;
        var e_1, _c;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
            switch (_d.label) {
                case 0:
                    folder = getStore().folder;
                    itemsToUpdate = [];
                    try {
                        for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(folder.permissions), _b = _a.next(); !_b.done; _b = _a.next()) {
                            item = _b.value;
                            if (item.inherited) {
                                continue;
                            }
                            updated = toUpdateItem(item);
                            // if this is the item we want to update, update it's permission
                            if (itemToUpdate === item) {
                                updated.permission = level;
                            }
                            itemsToUpdate.push(updated);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().post("/api/folders/" + folder.uid + "/permissions", { items: itemsToUpdate })];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, dispatch(getFolderPermissions(folder.uid))];
                case 2:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); };
}
function removeFolderPermission(itemToDelete) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var folder, itemsToUpdate, _a, _b, item;
        var e_2, _c;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
            switch (_d.label) {
                case 0:
                    folder = getStore().folder;
                    itemsToUpdate = [];
                    try {
                        for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(folder.permissions), _b = _a.next(); !_b.done; _b = _a.next()) {
                            item = _b.value;
                            if (item.inherited || item === itemToDelete) {
                                continue;
                            }
                            itemsToUpdate.push(toUpdateItem(item));
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().post("/api/folders/" + folder.uid + "/permissions", { items: itemsToUpdate })];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, dispatch(getFolderPermissions(folder.uid))];
                case 2:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); };
}
function addFolderPermission(newItem) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var folder, itemsToUpdate, _a, _b, item;
        var e_3, _c;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_d) {
            switch (_d.label) {
                case 0:
                    folder = getStore().folder;
                    itemsToUpdate = [];
                    try {
                        for (_a = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(folder.permissions), _b = _a.next(); !_b.done; _b = _a.next()) {
                            item = _b.value;
                            if (item.inherited) {
                                continue;
                            }
                            itemsToUpdate.push(toUpdateItem(item));
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    itemsToUpdate.push({
                        userId: newItem.userId,
                        teamId: newItem.teamId,
                        role: newItem.role,
                        permission: newItem.permission,
                    });
                    return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().post("/api/folders/" + folder.uid + "/permissions", { items: itemsToUpdate })];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, dispatch(getFolderPermissions(folder.uid))];
                case 2:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); };
}


/***/ }),

/***/ "./public/app/features/folders/state/navModel.ts":
/*!*******************************************************!*\
  !*** ./public/app/features/folders/state/navModel.ts ***!
  \*******************************************************/
/*! exports provided: buildNavModel, getLoadingNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildNavModel", function() { return buildNavModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLoadingNav", function() { return getLoadingNav; });
function buildNavModel(folder) {
    return {
        icon: 'fa fa-folder-open',
        id: 'manage-folder',
        subTitle: 'Manage folder dashboards & permissions',
        url: '',
        text: folder.title,
        breadcrumbs: [{ title: 'Dashboards', url: 'dashboards' }],
        children: [
            {
                active: false,
                icon: 'fa fa-fw fa-th-large',
                id: "folder-dashboards-" + folder.uid,
                text: 'Dashboards',
                url: folder.url,
            },
            {
                active: false,
                icon: 'fa fa-fw fa-lock',
                id: "folder-permissions-" + folder.uid,
                text: 'Permissions',
                url: folder.url + "/permissions",
            },
            {
                active: false,
                icon: 'gicon gicon-cog',
                id: "folder-settings-" + folder.uid,
                text: 'Settings',
                url: folder.url + "/settings",
            },
        ],
    };
}
function getLoadingNav(tabIndex) {
    var main = buildNavModel({
        id: 1,
        uid: 'loading',
        title: 'Loading',
        url: 'url',
        canSave: false,
        version: 0,
    });
    main.children[tabIndex].active = true;
    return {
        main: main,
        node: main.children[tabIndex],
    };
}


/***/ })

}]);
//# sourceMappingURL=default~FolderPermissions~FolderSettingsPage.6310f9af5345c722b930.js.map