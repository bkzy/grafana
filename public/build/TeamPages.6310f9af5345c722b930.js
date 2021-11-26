(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TeamPages"],{

/***/ "./public/app/core/components/WithFeatureToggle.tsx":
/*!**********************************************************!*\
  !*** ./public/app/core/components/WithFeatureToggle.tsx ***!
  \**********************************************************/
/*! exports provided: WithFeatureToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WithFeatureToggle", function() { return WithFeatureToggle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var WithFeatureToggle = function (_a) {
    var featureToggle = _a.featureToggle, children = _a.children;
    if (featureToggle === true) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, children);
    }
    return null;
};


/***/ }),

/***/ "./public/app/features/teams/TeamGroupSync.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/teams/TeamGroupSync.tsx ***!
  \*****************************************************/
/*! exports provided: TeamGroupSync, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamGroupSync", function() { return TeamGroupSync; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Animations/SlideDown */ "./public/app/core/components/Animations/SlideDown.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");








var headerTooltip = "Sync LDAP or OAuth groups with your Grafana teams.";
var TeamGroupSync = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TeamGroupSync, _super);
    function TeamGroupSync(props) {
        var _this = _super.call(this, props) || this;
        _this.onToggleAdding = function () {
            _this.setState({ isAdding: !_this.state.isAdding });
        };
        _this.onNewGroupIdChanged = function (event) {
            _this.setState({ newGroupId: event.target.value });
        };
        _this.onAddGroup = function (event) {
            event.preventDefault();
            _this.props.addTeamGroup(_this.state.newGroupId);
            _this.setState({ isAdding: false, newGroupId: '' });
        };
        _this.onRemoveGroup = function (group) {
            _this.props.removeTeamGroup(group.groupId);
        };
        _this.state = { isAdding: false, newGroupId: '' };
        return _this;
    }
    TeamGroupSync.prototype.componentDidMount = function () {
        this.fetchTeamGroups();
    };
    TeamGroupSync.prototype.fetchTeamGroups = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadTeamGroups()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TeamGroupSync.prototype.isNewGroupValid = function () {
        return this.state.newGroupId.length > 1;
    };
    TeamGroupSync.prototype.renderGroup = function (group) {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: group.groupId },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, group.groupId),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { style: { width: '1%' } },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-danger btn-small", onClick: function () { return _this.onRemoveGroup(group); } },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-remove" })))));
    };
    TeamGroupSync.prototype.render = function () {
        var _this = this;
        var _a = this.state, isAdding = _a.isAdding, newGroupId = _a.newGroupId;
        var groups = this.props.groups;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-sub-heading" }, "External group sync"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], { placement: "auto", content: headerTooltip },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-sub-heading-icon" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "gicon gicon-question gicon--has-hover" }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                groups.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-primary pull-right", onClick: this.onToggleAdding },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-plus" }),
                    " Add group"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_3__["SlideDown"], { in: isAdding },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cta-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "cta-form__close btn btn-transparent", onClick: this.onToggleAdding },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-close" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", null, "Add External Group"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", { className: "gf-form-inline", onSubmit: this.onAddGroup },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Input"], { type: "text", className: "gf-form-input width-30", value: newGroupId, onChange: this.onNewGroupIdChanged, placeholder: "cn=ops,ou=groups,dc=grafana,dc=org" })),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-primary gf-form-btn", type: "submit", disabled: !this.isNewGroupValid() }, "Add group"))))),
            groups.length === 0 && !isAdding && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_7__["default"], { onClick: this.onToggleAdding, buttonIcon: "gicon gicon-team", title: "There are no external groups to sync with", buttonTitle: "Add Group", proTip: headerTooltip, proTipLinkTitle: "Learn more", proTipLink: "http://docs.grafana.org/auth/enhanced_ldap/", proTipTarget: "_blank" })),
            groups.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "admin-list-table" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: "filter-table filter-table--hover form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "External Group ID"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { style: { width: '1%' } }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, groups.map(function (group) { return _this.renderGroup(group); })))))));
    };
    return TeamGroupSync;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        groups: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_6__["getTeamGroups"])(state.team),
    };
}
var mapDispatchToProps = {
    loadTeamGroups: _state_actions__WEBPACK_IMPORTED_MODULE_5__["loadTeamGroups"],
    addTeamGroup: _state_actions__WEBPACK_IMPORTED_MODULE_5__["addTeamGroup"],
    removeTeamGroup: _state_actions__WEBPACK_IMPORTED_MODULE_5__["removeTeamGroup"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TeamGroupSync));


/***/ }),

/***/ "./public/app/features/teams/TeamMemberRow.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/teams/TeamMemberRow.tsx ***!
  \*****************************************************/
/*! exports provided: TeamMemberRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamMemberRow", function() { return TeamMemberRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var app_core_components_WithFeatureToggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/WithFeatureToggle */ "./public/app/core/components/WithFeatureToggle.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/TagFilter/TagBadge */ "./public/app/core/components/TagFilter/TagBadge.tsx");








var TeamMemberRow = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TeamMemberRow, _super);
    function TeamMemberRow(props) {
        var _this = _super.call(this, props) || this;
        _this.onPermissionChange = function (item, member) {
            var permission = item.value;
            var updatedTeamMember = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, member), { permission: permission });
            _this.props.updateTeamMember(updatedTeamMember);
        };
        _this.renderLabels = _this.renderLabels.bind(_this);
        _this.renderPermissions = _this.renderPermissions.bind(_this);
        return _this;
    }
    TeamMemberRow.prototype.onRemoveMember = function (member) {
        this.props.removeTeamMember(member.userId);
    };
    TeamMemberRow.prototype.renderPermissions = function (member) {
        var _this = this;
        var _a = this.props, editorsCanAdmin = _a.editorsCanAdmin, signedInUserIsTeamAdmin = _a.signedInUserIsTeamAdmin;
        var value = app_types__WEBPACK_IMPORTED_MODULE_4__["teamsPermissionLevels"].find(function (dp) { return dp.value === member.permission; });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_WithFeatureToggle__WEBPACK_IMPORTED_MODULE_5__["WithFeatureToggle"], { featureToggle: editorsCanAdmin },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "width-5 team-permissions" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    signedInUserIsTeamAdmin && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], { isSearchable: false, options: app_types__WEBPACK_IMPORTED_MODULE_4__["teamsPermissionLevels"], onChange: function (item) { return _this.onPermissionChange(item, member); }, className: "gf-form-select-box__control--menu-right", value: value })),
                    !signedInUserIsTeamAdmin && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, value.label)))));
    };
    TeamMemberRow.prototype.renderLabels = function (labels) {
        if (!labels) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null);
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, labels.map(function (label) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_7__["TagBadge"], { key: label, label: label, removeIcon: false, count: 0, onClick: function () { } })); })));
    };
    TeamMemberRow.prototype.render = function () {
        var _this = this;
        var _a = this.props, member = _a.member, syncEnabled = _a.syncEnabled, signedInUserIsTeamAdmin = _a.signedInUserIsTeamAdmin;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: member.userId },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "width-4 text-center" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { className: "filter-table__avatar", src: member.avatarUrl })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, member.login),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, member.email),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, member.name),
            this.renderPermissions(member),
            syncEnabled && this.renderLabels(member.labels),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DeleteButton"], { size: "sm", disabled: !signedInUserIsTeamAdmin, onConfirm: function () { return _this.onRemoveMember(member); } }))));
    };
    return TeamMemberRow;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {};
}
var mapDispatchToProps = {
    removeTeamMember: _state_actions__WEBPACK_IMPORTED_MODULE_6__["removeTeamMember"],
    updateTeamMember: _state_actions__WEBPACK_IMPORTED_MODULE_6__["updateTeamMember"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TeamMemberRow));


/***/ }),

/***/ "./public/app/features/teams/TeamMembers.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/teams/TeamMembers.tsx ***!
  \***************************************************/
/*! exports provided: TeamMembers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamMembers", function() { return TeamMembers; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Animations/SlideDown */ "./public/app/core/components/Animations/SlideDown.tsx");
/* harmony import */ var app_core_components_Select_UserPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Select/UserPicker */ "./public/app/core/components/Select/UserPicker.tsx");
/* harmony import */ var app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/TagFilter/TagBadge */ "./public/app/core/components/TagFilter/TagBadge.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var app_core_components_WithFeatureToggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/components/WithFeatureToggle */ "./public/app/core/components/WithFeatureToggle.tsx");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/services/context_srv */ "./public/app/core/services/context_srv.ts");
/* harmony import */ var _TeamMemberRow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./TeamMemberRow */ "./public/app/features/teams/TeamMemberRow.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/teams/state/reducers.ts");














var TeamMembers = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TeamMembers, _super);
    function TeamMembers(props) {
        var _this = _super.call(this, props) || this;
        _this.onSearchQueryChange = function (value) {
            _this.props.setSearchMemberQuery(value);
        };
        _this.onToggleAdding = function () {
            _this.setState({ isAdding: !_this.state.isAdding });
        };
        _this.onUserSelected = function (user) {
            _this.setState({ newTeamMember: user });
        };
        _this.onAddUserToTeam = function () { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                this.props.addTeamMember(this.state.newTeamMember.id);
                this.setState({ newTeamMember: null });
                return [2 /*return*/];
            });
        }); };
        _this.state = { isAdding: false, newTeamMember: null };
        return _this;
    }
    TeamMembers.prototype.renderLabels = function (labels) {
        if (!labels) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null);
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, labels.map(function (label) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_TagFilter_TagBadge__WEBPACK_IMPORTED_MODULE_5__["TagBadge"], { key: label, label: label, removeIcon: false, count: 0, onClick: function () { } })); })));
    };
    TeamMembers.prototype.render = function () {
        var isAdding = this.state.isAdding;
        var _a = this.props, searchMemberQuery = _a.searchMemberQuery, members = _a.members, syncEnabled = _a.syncEnabled, editorsCanAdmin = _a.editorsCanAdmin, signedInUser = _a.signedInUser;
        var isTeamAdmin = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["isSignedInUserTeamAdmin"])({ members: members, editorsCanAdmin: editorsCanAdmin, signedInUser: signedInUser });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_8__["FilterInput"], { labelClassName: "gf-form--has-input-icon gf-form--grow", inputClassName: "gf-form-input", placeholder: "Search members", value: searchMemberQuery, onChange: this.onSearchQueryChange })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-primary pull-right", onClick: this.onToggleAdding, disabled: isAdding || !isTeamAdmin }, "Add member")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Animations_SlideDown__WEBPACK_IMPORTED_MODULE_3__["SlideDown"], { in: isAdding },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cta-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "cta-form__close btn btn-transparent", onClick: this.onToggleAdding },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-close" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h5", null, "Add team member"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Select_UserPicker__WEBPACK_IMPORTED_MODULE_4__["UserPicker"], { onSelected: this.onUserSelected, className: "min-width-30" }),
                        this.state.newTeamMember && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-primary gf-form-btn", type: "submit", onClick: this.onAddUserToTeam }, "Add to team"))))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "admin-list-table" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: "filter-table filter-table--hover form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Login"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Email"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Name"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_WithFeatureToggle__WEBPACK_IMPORTED_MODULE_9__["WithFeatureToggle"], { featureToggle: editorsCanAdmin },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Permission")),
                            syncEnabled && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { style: { width: '1%' } }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, members &&
                        members.map(function (member) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TeamMemberRow__WEBPACK_IMPORTED_MODULE_12__["default"], { key: member.userId, member: member, syncEnabled: syncEnabled, editorsCanAdmin: editorsCanAdmin, signedInUserIsTeamAdmin: isTeamAdmin })); }))))));
    };
    return TeamMembers;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        searchMemberQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["getSearchMemberQuery"])(state.team),
        editorsCanAdmin: app_core_config__WEBPACK_IMPORTED_MODULE_10__["config"].editorsCanAdmin,
        signedInUser: app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_11__["contextSrv"].user,
    };
}
var mapDispatchToProps = {
    addTeamMember: _state_actions__WEBPACK_IMPORTED_MODULE_6__["addTeamMember"],
    setSearchMemberQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_13__["setSearchMemberQuery"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TeamMembers));


/***/ }),

/***/ "./public/app/features/teams/TeamPages.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/teams/TeamPages.tsx ***!
  \*************************************************/
/*! exports provided: TeamPages, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamPages", function() { return TeamPages; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _TeamMembers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./TeamMembers */ "./public/app/features/teams/TeamMembers.tsx");
/* harmony import */ var _TeamSettings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TeamSettings */ "./public/app/features/teams/TeamSettings.tsx");
/* harmony import */ var _TeamGroupSync__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TeamGroupSync */ "./public/app/features/teams/TeamGroupSync.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var _state_navModel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/navModel */ "./public/app/features/teams/state/navModel.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _core_selectors_location__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/core/services/context_srv */ "./public/app/core/services/context_srv.ts");
















var PageTypes;
(function (PageTypes) {
    PageTypes["Members"] = "members";
    PageTypes["Settings"] = "settings";
    PageTypes["GroupSync"] = "groupsync";
})(PageTypes || (PageTypes = {}));
var TeamPages = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TeamPages, _super);
    function TeamPages(props) {
        var _this = _super.call(this, props) || this;
        _this.textsAreEqual = function (text1, text2) {
            if (!text1 && !text2) {
                return true;
            }
            if (!text1 || !text2) {
                return false;
            }
            return text1.toLocaleLowerCase() === text2.toLocaleLowerCase();
        };
        _this.hideTabsFromNonTeamAdmin = function (navModel, isSignedInUserTeamAdmin) {
            if (!isSignedInUserTeamAdmin && navModel.main && navModel.main.children) {
                navModel.main.children
                    .filter(function (navItem) { return !_this.textsAreEqual(navItem.text, PageTypes.Members); })
                    .map(function (navItem) {
                    navItem.hideFromTabs = true;
                });
            }
            return navModel;
        };
        _this.state = {
            isLoading: false,
            isSyncEnabled: app_core_config__WEBPACK_IMPORTED_MODULE_5__["default"].licenseInfo.hasLicense,
        };
        return _this;
    }
    TeamPages.prototype.componentDidMount = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchTeam()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TeamPages.prototype.fetchTeam = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, loadTeam, teamId, team;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, loadTeam = _a.loadTeam, teamId = _a.teamId;
                        this.setState({ isLoading: true });
                        return [4 /*yield*/, loadTeam(teamId)];
                    case 1:
                        team = _b.sent();
                        return [4 /*yield*/, this.props.loadTeamMembers()];
                    case 2:
                        _b.sent();
                        this.setState({ isLoading: false });
                        return [2 /*return*/, team];
                }
            });
        });
    };
    TeamPages.prototype.getCurrentPage = function () {
        var pages = ['members', 'settings', 'groupsync'];
        var currentPage = this.props.pageName;
        return lodash__WEBPACK_IMPORTED_MODULE_3___default.a.includes(pages, currentPage) ? currentPage : pages[0];
    };
    TeamPages.prototype.renderPage = function (isSignedInUserTeamAdmin) {
        var isSyncEnabled = this.state.isSyncEnabled;
        var members = this.props.members;
        var currentPage = this.getCurrentPage();
        switch (currentPage) {
            case PageTypes.Members:
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TeamMembers__WEBPACK_IMPORTED_MODULE_7__["default"], { syncEnabled: isSyncEnabled, members: members });
            case PageTypes.Settings:
                return isSignedInUserTeamAdmin && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TeamSettings__WEBPACK_IMPORTED_MODULE_8__["default"], null);
            case PageTypes.GroupSync:
                return isSignedInUserTeamAdmin && isSyncEnabled && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TeamGroupSync__WEBPACK_IMPORTED_MODULE_9__["default"], null);
        }
        return null;
    };
    TeamPages.prototype.render = function () {
        var _a = this.props, team = _a.team, navModel = _a.navModel, members = _a.members, editorsCanAdmin = _a.editorsCanAdmin, signedInUser = _a.signedInUser;
        var isTeamAdmin = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_11__["isSignedInUserTeamAdmin"])({ members: members, editorsCanAdmin: editorsCanAdmin, signedInUser: signedInUser });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"], { navModel: this.hideTabsFromNonTeamAdmin(navModel, isTeamAdmin) },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"].Contents, { isLoading: this.state.isLoading }, team && Object.keys(team).length !== 0 && this.renderPage(isTeamAdmin))));
    };
    return TeamPages;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    var teamId = Object(_core_selectors_location__WEBPACK_IMPORTED_MODULE_14__["getRouteParamsId"])(state.location);
    var pageName = Object(_core_selectors_location__WEBPACK_IMPORTED_MODULE_14__["getRouteParamsPage"])(state.location) || 'members';
    var teamLoadingNav = Object(_state_navModel__WEBPACK_IMPORTED_MODULE_12__["getTeamLoadingNav"])(pageName);
    var navModel = Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_13__["getNavModel"])(state.navIndex, "team-" + pageName + "-" + teamId, teamLoadingNav);
    var team = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_11__["getTeam"])(state.team, teamId);
    var members = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_11__["getTeamMembers"])(state.team);
    return {
        navModel: navModel,
        teamId: teamId,
        pageName: pageName,
        team: team,
        members: members,
        editorsCanAdmin: app_core_config__WEBPACK_IMPORTED_MODULE_5__["default"].editorsCanAdmin,
        signedInUser: app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_15__["contextSrv"].user,
    };
}
var mapDispatchToProps = {
    loadTeam: _state_actions__WEBPACK_IMPORTED_MODULE_10__["loadTeam"],
    loadTeamMembers: _state_actions__WEBPACK_IMPORTED_MODULE_10__["loadTeamMembers"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TeamPages)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/teams/TeamSettings.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/teams/TeamSettings.tsx ***!
  \****************************************************/
/*! exports provided: TeamSettings, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamSettings", function() { return TeamSettings; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/SharedPreferences/SharedPreferences */ "./public/app/core/components/SharedPreferences/SharedPreferences.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var app_core_selectors_location__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/selectors/location */ "./public/app/core/selectors/location.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");








var TeamSettings = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TeamSettings, _super);
    function TeamSettings(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeName = function (event) {
            _this.setState({ name: event.target.value });
        };
        _this.onChangeEmail = function (event) {
            _this.setState({ email: event.target.value });
        };
        _this.onUpdate = function (event) {
            var _a = _this.state, name = _a.name, email = _a.email;
            event.preventDefault();
            _this.props.updateTeam(name, email);
        };
        _this.state = {
            name: props.team.name,
            email: props.team.email,
        };
        return _this;
    }
    TeamSettings.prototype.render = function () {
        var team = this.props.team;
        var _a = this.state, name = _a.name, email = _a.email;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", { className: "page-sub-heading" }, "Team Settings"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", { name: "teamDetailsForm", className: "gf-form-group", onSubmit: this.onUpdate },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], null, "Name"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], { type: "text", required: true, value: name, className: "gf-form-input max-width-22", onChange: this.onChangeName })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form max-width-30" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { tooltip: "This is optional and is primarily used to set the team profile avatar (via gravatar service)" }, "Email"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], { type: "email", className: "gf-form-input max-width-22", value: email, placeholder: "team@email.com", onChange: this.onChangeEmail })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-button-row" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { type: "submit", className: "btn btn-primary" }, "Update"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_4__["SharedPreferences"], { resourceUri: "teams/" + team.id })));
    };
    return TeamSettings;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));

function mapStateToProps(state) {
    var teamId = Object(app_core_selectors_location__WEBPACK_IMPORTED_MODULE_6__["getRouteParamsId"])(state.location);
    return {
        team: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_7__["getTeam"])(state.team, teamId),
    };
}
var mapDispatchToProps = {
    updateTeam: _state_actions__WEBPACK_IMPORTED_MODULE_5__["updateTeam"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TeamSettings));


/***/ })

}]);
//# sourceMappingURL=TeamPages.6310f9af5345c722b930.js.map