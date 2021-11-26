(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~TeamList~TeamPages"],{

/***/ "./public/app/core/components/FilterInput/FilterInput.tsx":
/*!****************************************************************!*\
  !*** ./public/app/core/components/FilterInput/FilterInput.tsx ***!
  \****************************************************************/
/*! exports provided: FilterInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterInput", function() { return FilterInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");


var FilterInput = Object(react__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function (props, ref) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", { className: props.labelClassName },
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", { ref: ref, type: "text", className: props.inputClassName, value: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["unEscapeStringFromRegex"])(props.value), onChange: function (event) { return props.onChange(Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["escapeStringForRegex"])(event.target.value)); }, placeholder: props.placeholder ? props.placeholder : null }),
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "gf-form-input-icon fa fa-search" }))); });


/***/ }),

/***/ "./public/app/features/teams/state/actions.ts":
/*!****************************************************!*\
  !*** ./public/app/features/teams/state/actions.ts ***!
  \****************************************************/
/*! exports provided: loadTeams, loadTeam, loadTeamMembers, addTeamMember, removeTeamMember, updateTeam, loadTeamGroups, addTeamGroup, removeTeamGroup, deleteTeam, updateTeamMember */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTeams", function() { return loadTeams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTeam", function() { return loadTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTeamMembers", function() { return loadTeamMembers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTeamMember", function() { return addTeamMember; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTeamMember", function() { return removeTeamMember; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTeam", function() { return updateTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTeamGroups", function() { return loadTeamGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTeamGroup", function() { return addTeamGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeTeamGroup", function() { return removeTeamGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteTeam", function() { return deleteTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTeamMember", function() { return updateTeamMember; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _navModel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navModel */ "./public/app/features/teams/state/navModel.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers */ "./public/app/features/teams/state/reducers.ts");





function loadTeams() {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var response;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/teams/search', { perpage: 1000, page: 1 })];
                case 1:
                    response = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["teamsLoaded"])(response.teams));
                    return [2 /*return*/];
            }
        });
    }); };
}
function loadTeam(id) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var response;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/teams/" + id)];
                case 1:
                    response = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["teamLoaded"])(response));
                    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_2__["updateNavIndex"])(Object(_navModel__WEBPACK_IMPORTED_MODULE_3__["buildNavModel"])(response)));
                    return [2 /*return*/];
            }
        });
    }); };
}
function loadTeamMembers() {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var team, response;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    team = getStore().team.team;
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/teams/" + team.id + "/members")];
                case 1:
                    response = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["teamMembersLoaded"])(response));
                    return [2 /*return*/];
            }
        });
    }); };
}
function addTeamMember(id) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var team;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    team = getStore().team.team;
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post("/api/teams/" + team.id + "/members", { userId: id })];
                case 1:
                    _a.sent();
                    dispatch(loadTeamMembers());
                    return [2 /*return*/];
            }
        });
    }); };
}
function removeTeamMember(id) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var team;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    team = getStore().team.team;
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().delete("/api/teams/" + team.id + "/members/" + id)];
                case 1:
                    _a.sent();
                    dispatch(loadTeamMembers());
                    return [2 /*return*/];
            }
        });
    }); };
}
function updateTeam(name, email) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var team;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    team = getStore().team.team;
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().put("/api/teams/" + team.id, { name: name, email: email })];
                case 1:
                    _a.sent();
                    dispatch(loadTeam(team.id));
                    return [2 /*return*/];
            }
        });
    }); };
}
function loadTeamGroups() {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var team, response;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    team = getStore().team.team;
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get("/api/teams/" + team.id + "/groups")];
                case 1:
                    response = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_4__["teamGroupsLoaded"])(response));
                    return [2 /*return*/];
            }
        });
    }); };
}
function addTeamGroup(groupId) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var team;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    team = getStore().team.team;
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().post("/api/teams/" + team.id + "/groups", { groupId: groupId })];
                case 1:
                    _a.sent();
                    dispatch(loadTeamGroups());
                    return [2 /*return*/];
            }
        });
    }); };
}
function removeTeamGroup(groupId) {
    var _this = this;
    return function (dispatch, getStore) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var team;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    team = getStore().team.team;
                    return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().delete("/api/teams/" + team.id + "/groups/" + encodeURIComponent(groupId))];
                case 1:
                    _a.sent();
                    dispatch(loadTeamGroups());
                    return [2 /*return*/];
            }
        });
    }); };
}
function deleteTeam(id) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().delete("/api/teams/" + id)];
                case 1:
                    _a.sent();
                    dispatch(loadTeams());
                    return [2 /*return*/];
            }
        });
    }); };
}
function updateTeamMember(member) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().put("/api/teams/" + member.teamId + "/members/" + member.userId, {
                        permission: member.permission,
                    })];
                case 1:
                    _a.sent();
                    dispatch(loadTeamMembers());
                    return [2 /*return*/];
            }
        });
    }); };
}


/***/ }),

/***/ "./public/app/features/teams/state/navModel.ts":
/*!*****************************************************!*\
  !*** ./public/app/features/teams/state/navModel.ts ***!
  \*****************************************************/
/*! exports provided: buildNavModel, getTeamLoadingNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildNavModel", function() { return buildNavModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamLoadingNav", function() { return getTeamLoadingNav; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");



function buildNavModel(team) {
    var navModel = {
        img: team.avatarUrl,
        id: 'team-' + team.id,
        subTitle: 'Manage members & settings',
        url: '',
        text: team.name,
        breadcrumbs: [{ title: 'Teams', url: 'org/teams' }],
        children: [
            {
                active: false,
                icon: 'gicon gicon-team',
                id: "team-members-" + team.id,
                text: 'Members',
                url: "org/teams/edit/" + team.id + "/members",
            },
            {
                active: false,
                icon: 'fa fa-fw fa-sliders',
                id: "team-settings-" + team.id,
                text: 'Settings',
                url: "org/teams/edit/" + team.id + "/settings",
            },
        ],
    };
    if (app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].licenseInfo.hasLicense) {
        navModel.children.push({
            active: false,
            icon: 'fa fa-fw fa-refresh',
            id: "team-groupsync-" + team.id,
            text: 'External group sync',
            url: "org/teams/edit/" + team.id + "/groupsync",
        });
    }
    return navModel;
}
function getTeamLoadingNav(pageName) {
    var e_1, _a;
    var main = buildNavModel({
        avatarUrl: 'public/img/user_profile.png',
        id: 1,
        name: 'Loading',
        email: 'loading',
        memberCount: 0,
        permission: app_types__WEBPACK_IMPORTED_MODULE_1__["TeamPermissionLevel"].Member,
    });
    var node;
    try {
        // find active page
        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(main.children), _c = _b.next(); !_c.done; _c = _b.next()) {
            var child = _c.value;
            if (child.id.indexOf(pageName) > 0) {
                child.active = true;
                node = child;
                break;
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
    return {
        main: main,
        node: node,
    };
}


/***/ }),

/***/ "./public/app/features/teams/state/selectors.ts":
/*!******************************************************!*\
  !*** ./public/app/features/teams/state/selectors.ts ***!
  \******************************************************/
/*! exports provided: getSearchQuery, getSearchMemberQuery, getTeamGroups, getTeamsCount, getTeam, getTeams, getTeamMembers, isSignedInUserTeamAdmin, isPermissionTeamAdmin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchQuery", function() { return getSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchMemberQuery", function() { return getSearchMemberQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamGroups", function() { return getTeamGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamsCount", function() { return getTeamsCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeam", function() { return getTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeams", function() { return getTeams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamMembers", function() { return getTeamMembers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSignedInUserTeamAdmin", function() { return isSignedInUserTeamAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPermissionTeamAdmin", function() { return isPermissionTeamAdmin; });
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");

var getSearchQuery = function (state) { return state.searchQuery; };
var getSearchMemberQuery = function (state) { return state.searchMemberQuery; };
var getTeamGroups = function (state) { return state.groups; };
var getTeamsCount = function (state) { return state.teams.length; };
var getTeam = function (state, currentTeamId) {
    if (state.team.id === parseInt(currentTeamId, 10)) {
        return state.team;
    }
    return null;
};
var getTeams = function (state) {
    var regex = RegExp(state.searchQuery, 'i');
    return state.teams.filter(function (team) {
        return regex.test(team.name);
    });
};
var getTeamMembers = function (state) {
    var regex = RegExp(state.searchMemberQuery, 'i');
    return state.members.filter(function (member) {
        return regex.test(member.login) || regex.test(member.email) || regex.test(member.name);
    });
};
var isSignedInUserTeamAdmin = function (config) {
    var members = config.members, signedInUser = config.signedInUser, editorsCanAdmin = config.editorsCanAdmin;
    var userInMembers = members.find(function (m) { return m.userId === signedInUser.id; });
    var permission = userInMembers ? userInMembers.permission : app_types__WEBPACK_IMPORTED_MODULE_0__["TeamPermissionLevel"].Member;
    return isPermissionTeamAdmin({ permission: permission, signedInUser: signedInUser, editorsCanAdmin: editorsCanAdmin });
};
var isPermissionTeamAdmin = function (config) {
    var permission = config.permission, signedInUser = config.signedInUser, editorsCanAdmin = config.editorsCanAdmin;
    var isAdmin = signedInUser.isGrafanaAdmin || signedInUser.orgRole === app_types__WEBPACK_IMPORTED_MODULE_0__["OrgRole"].Admin;
    var userIsTeamAdmin = permission === app_types__WEBPACK_IMPORTED_MODULE_0__["TeamPermissionLevel"].Admin;
    var isSignedInUserTeamAdmin = isAdmin || userIsTeamAdmin;
    return isSignedInUserTeamAdmin || !editorsCanAdmin;
};


/***/ })

}]);
//# sourceMappingURL=default~TeamList~TeamPages.6310f9af5345c722b930.js.map