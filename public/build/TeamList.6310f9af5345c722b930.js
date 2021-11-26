(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TeamList"],{

/***/ "./public/app/core/components/connectWithCleanUp.tsx":
/*!***********************************************************!*\
  !*** ./public/app/core/components/connectWithCleanUp.tsx ***!
  \***********************************************************/
/*! exports provided: connectWithCleanUp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectWithCleanUp", function() { return connectWithCleanUp; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_cleanUp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/cleanUp */ "./public/app/core/actions/cleanUp.ts");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__);





var connectWithCleanUp = function (mapStateToProps, mapDispatchToProps, stateSelector) { return function (Component) {
    var ConnectedComponent = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps
    // @ts-ignore
    )(Component);
    var ConnectedComponentWithCleanUp = function (props) {
        var dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useDispatch"])();
        Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
            return function cleanUp() {
                dispatch(Object(_actions_cleanUp__WEBPACK_IMPORTED_MODULE_2__["cleanUpAction"])({ stateSelector: stateSelector }));
            };
        }, []);
        // @ts-ignore
        return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(ConnectedComponent, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, props));
    };
    ConnectedComponentWithCleanUp.displayName = "ConnectWithCleanUp(" + ConnectedComponent.displayName + ")";
    hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4___default()(ConnectedComponentWithCleanUp, Component);
    return ConnectedComponentWithCleanUp;
}; };


/***/ }),

/***/ "./public/app/features/teams/TeamList.tsx":
/*!************************************************!*\
  !*** ./public/app/features/teams/TeamList.tsx ***!
  \************************************************/
/*! exports provided: TeamList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamList", function() { return TeamList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/services/context_srv */ "./public/app/core/services/context_srv.ts");
/* harmony import */ var _core_components_connectWithCleanUp__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../core/components/connectWithCleanUp */ "./public/app/core/components/connectWithCleanUp.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/teams/state/reducers.ts");















var TeamList = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TeamList, _super);
    function TeamList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deleteTeam = function (team) {
            _this.props.deleteTeam(team.id);
        };
        _this.onSearchQueryChange = function (value) {
            _this.props.setSearchQuery(value);
        };
        return _this;
    }
    TeamList.prototype.componentDidMount = function () {
        this.fetchTeams();
    };
    TeamList.prototype.fetchTeams = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadTeams()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TeamList.prototype.renderTeam = function (team) {
        var _this = this;
        var _a = this.props, editorsCanAdmin = _a.editorsCanAdmin, signedInUser = _a.signedInUser;
        var permission = team.permission;
        var teamUrl = "org/teams/edit/" + team.id;
        var canDelete = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_8__["isPermissionTeamAdmin"])({ permission: permission, editorsCanAdmin: editorsCanAdmin, signedInUser: signedInUser });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: team.id },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "width-4 text-center link-td" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: teamUrl },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { className: "filter-table__avatar", src: team.avatarUrl }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "link-td" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: teamUrl }, team.name)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "link-td" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: teamUrl }, team.email)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "link-td" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: teamUrl }, team.memberCount)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["DeleteButton"], { size: "sm", disabled: !canDelete, onConfirm: function () { return _this.deleteTeam(team); } }))));
    };
    TeamList.prototype.renderEmptyList = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_5__["default"], { title: "You haven't created any teams yet.", buttonIcon: "gicon gicon-team", buttonLink: "org/teams/new", buttonTitle: " New team", proTip: "Assign folder and dashboard permissions to teams instead of users to ease administration.", proTipLink: "", proTipLinkTitle: "", proTipTarget: "_blank" }));
    };
    TeamList.prototype.renderTeamList = function () {
        var _this = this;
        var _a = this.props, teams = _a.teams, searchQuery = _a.searchQuery, editorsCanAdmin = _a.editorsCanAdmin, signedInUser = _a.signedInUser;
        var isCanAdminAndViewer = editorsCanAdmin && signedInUser.orgRole === app_types__WEBPACK_IMPORTED_MODULE_6__["OrgRole"].Viewer;
        var disabledClass = isCanAdminAndViewer ? ' disabled' : '';
        var newTeamHref = isCanAdminAndViewer ? '#' : 'org/teams/new';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_10__["FilterInput"], { labelClassName: "gf-form--has-input-icon gf-form--grow", inputClassName: "gf-form-input", placeholder: "Search teams", value: searchQuery, onChange: this.onSearchQueryChange })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-primary" + disabledClass, href: newTeamHref }, "New team")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "admin-list-table" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: "filter-table filter-table--hover form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Name"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Email"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Members"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { style: { width: '1%' } }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, teams.map(function (team) { return _this.renderTeam(team); }))))));
    };
    TeamList.prototype.renderList = function () {
        var teamsCount = this.props.teamsCount;
        if (teamsCount > 0) {
            return this.renderTeamList();
        }
        else {
            return this.renderEmptyList();
        }
    };
    TeamList.prototype.render = function () {
        var _a = this.props, hasFetched = _a.hasFetched, navModel = _a.navModel;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_3__["default"].Contents, { isLoading: !hasFetched }, hasFetched && this.renderList())));
    };
    return TeamList;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_9__["getNavModel"])(state.navIndex, 'teams'),
        teams: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_8__["getTeams"])(state.teams),
        searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_8__["getSearchQuery"])(state.teams),
        teamsCount: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_8__["getTeamsCount"])(state.teams),
        hasFetched: state.teams.hasFetched,
        editorsCanAdmin: app_core_config__WEBPACK_IMPORTED_MODULE_11__["config"].editorsCanAdmin,
        signedInUser: app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_12__["contextSrv"].user,
    };
}
var mapDispatchToProps = {
    loadTeams: _state_actions__WEBPACK_IMPORTED_MODULE_7__["loadTeams"],
    deleteTeam: _state_actions__WEBPACK_IMPORTED_MODULE_7__["deleteTeam"],
    setSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_14__["setSearchQuery"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(_core_components_connectWithCleanUp__WEBPACK_IMPORTED_MODULE_13__["connectWithCleanUp"])(mapStateToProps, mapDispatchToProps, function (state) { return state.teams; })(TeamList)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=TeamList.6310f9af5345c722b930.js.map