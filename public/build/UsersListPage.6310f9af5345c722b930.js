(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["UsersListPage"],{

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

/***/ "./public/app/features/users/InviteeRow.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/users/InviteeRow.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/users/state/actions.ts");




var InviteeRow = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InviteeRow, _super);
    function InviteeRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.copyUrlRef = Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])();
        _this.copyToClipboard = function () {
            var node = _this.copyUrlRef.current;
            if (node) {
                node.select();
                document.execCommand('copy');
            }
        };
        return _this;
    }
    InviteeRow.prototype.render = function () {
        var _a = this.props, invitee = _a.invitee, revokeInvite = _a.revokeInvite;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, invitee.email),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, invitee.name),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-inverse btn-small", onClick: this.copyToClipboard },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("textarea", { readOnly: true, value: invitee.url, style: { position: 'absolute', bottom: 0, right: 0, opacity: 0, zIndex: -10 }, ref: this.copyUrlRef }),
                    "Copy Invite"),
                "\u00A0"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-danger btn-small", onClick: function () { return revokeInvite(invitee.code); } },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-remove" })))));
    };
    return InviteeRow;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var mapDispatchToProps = {
    revokeInvite: _state_actions__WEBPACK_IMPORTED_MODULE_3__["revokeInvite"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(function () {
    return {};
}, mapDispatchToProps)(InviteeRow));


/***/ }),

/***/ "./public/app/features/users/InviteesTable.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/users/InviteesTable.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _InviteeRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InviteeRow */ "./public/app/features/users/InviteeRow.tsx");



var InviteesTable = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InviteesTable, _super);
    function InviteesTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InviteesTable.prototype.render = function () {
        var invitees = this.props.invitees;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: "filter-table form-inline" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Email"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Name"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { style: { width: '34px' } }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, invitees.map(function (invitee, index) {
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_InviteeRow__WEBPACK_IMPORTED_MODULE_2__["default"], { key: invitee.id + "-" + index, invitee: invitee });
            }))));
    };
    return InviteesTable;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (InviteesTable);


/***/ }),

/***/ "./public/app/features/users/UsersActionBar.tsx":
/*!******************************************************!*\
  !*** ./public/app/features/users/UsersActionBar.tsx ***!
  \******************************************************/
/*! exports provided: UsersActionBar, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersActionBar", function() { return UsersActionBar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/users/state/reducers.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/users/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");







var UsersActionBar = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(UsersActionBar, _super);
    function UsersActionBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsersActionBar.prototype.render = function () {
        var _a = this.props, canInvite = _a.canInvite, externalUserMngLinkName = _a.externalUserMngLinkName, externalUserMngLinkUrl = _a.externalUserMngLinkUrl, searchQuery = _a.searchQuery, pendingInvitesCount = _a.pendingInvitesCount, setUsersSearchQuery = _a.setUsersSearchQuery, onShowInvites = _a.onShowInvites, showInvites = _a.showInvites;
        var pendingInvitesButtonStyle = classnames__WEBPACK_IMPORTED_MODULE_3___default()({
            btn: true,
            'toggle-btn': true,
            active: showInvites,
        });
        var usersButtonStyle = classnames__WEBPACK_IMPORTED_MODULE_3___default()({
            btn: true,
            'toggle-btn': true,
            active: !showInvites,
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_6__["FilterInput"], { labelClassName: "gf-form--has-input-icon", inputClassName: "gf-form-input width-20", value: searchQuery, onChange: setUsersSearchQuery, placeholder: "Filter by email, login or name" }),
                pendingInvitesCount > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: { marginLeft: '1rem' } },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: usersButtonStyle, key: "users", onClick: onShowInvites }, "Users"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: pendingInvitesButtonStyle, onClick: onShowInvites, key: "pending-invites" },
                        "Pending Invites (",
                        pendingInvitesCount,
                        ")"))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                canInvite && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-primary", href: "org/users/invite" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, "Invite"))),
                externalUserMngLinkUrl && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-primary", href: externalUserMngLinkUrl, target: "_blank", rel: "noopener" }, externalUserMngLinkName)))));
    };
    return UsersActionBar;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_5__["getUsersSearchQuery"])(state.users),
        pendingInvitesCount: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_5__["getInviteesCount"])(state.users),
        externalUserMngLinkName: state.users.externalUserMngLinkName,
        externalUserMngLinkUrl: state.users.externalUserMngLinkUrl,
        canInvite: state.users.canInvite,
    };
}
var mapDispatchToProps = {
    setUsersSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_4__["setUsersSearchQuery"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(UsersActionBar));


/***/ }),

/***/ "./public/app/features/users/UsersListPage.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/users/UsersListPage.tsx ***!
  \*****************************************************/
/*! exports provided: UsersListPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersListPage", function() { return UsersListPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _UsersActionBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UsersActionBar */ "./public/app/features/users/UsersActionBar.tsx");
/* harmony import */ var _UsersTable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UsersTable */ "./public/app/features/users/UsersTable.tsx");
/* harmony import */ var _InviteesTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./InviteesTable */ "./public/app/features/users/InviteesTable.tsx");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/users/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/users/state/selectors.ts");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/users/state/reducers.ts");















var UsersListPage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(UsersListPage, _super);
    function UsersListPage(props) {
        var _this = _super.call(this, props) || this;
        _this.onRoleChange = function (role, user) {
            var updatedUser = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, user), { role: role });
            _this.props.updateUser(updatedUser);
        };
        _this.onRemoveUser = function (user) {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_10__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_9__["CoreEvents"].showConfirmModal, {
                title: 'Delete',
                text: 'Are you sure you want to delete user ' + user.login + '?',
                yesText: 'Delete',
                icon: 'fa-warning',
                onConfirm: function () {
                    _this.props.removeUser(user.userId);
                },
            });
        };
        _this.onShowInvites = function () {
            _this.setState(function (prevState) { return ({
                showInvites: !prevState.showInvites,
            }); });
        };
        if (_this.props.externalUserMngInfo) {
            _this.externalUserMngInfoHtml = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["renderMarkdown"])(_this.props.externalUserMngInfo);
        }
        _this.state = {
            showInvites: false,
        };
        return _this;
    }
    UsersListPage.prototype.componentDidMount = function () {
        this.fetchUsers();
        this.fetchInvitees();
    };
    UsersListPage.prototype.fetchUsers = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadUsers()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersListPage.prototype.fetchInvitees = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadInvitees()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersListPage.prototype.renderTable = function () {
        var _this = this;
        var _a = this.props, invitees = _a.invitees, users = _a.users;
        if (this.state.showInvites) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_InviteesTable__WEBPACK_IMPORTED_MODULE_8__["default"], { invitees: invitees });
        }
        else {
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_UsersTable__WEBPACK_IMPORTED_MODULE_7__["default"], { users: users, onRoleChange: function (role, user) { return _this.onRoleChange(role, user); }, onRemoveUser: function (user) { return _this.onRemoveUser(user); } }));
        }
    };
    UsersListPage.prototype.render = function () {
        var _a = this.props, navModel = _a.navModel, hasFetched = _a.hasFetched;
        var externalUserMngInfoHtml = this.externalUserMngInfoHtml;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_5__["default"].Contents, { isLoading: !hasFetched },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_UsersActionBar__WEBPACK_IMPORTED_MODULE_6__["default"], { onShowInvites: this.onShowInvites, showInvites: this.state.showInvites }),
                    externalUserMngInfoHtml && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "grafana-info-box", dangerouslySetInnerHTML: { __html: externalUserMngInfoHtml } })),
                    hasFetched && this.renderTable()))));
    };
    return UsersListPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_12__["getNavModel"])(state.navIndex, 'users'),
        users: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_13__["getUsers"])(state.users),
        searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_13__["getUsersSearchQuery"])(state.users),
        invitees: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_13__["getInvitees"])(state.users),
        externalUserMngInfo: state.users.externalUserMngInfo,
        hasFetched: state.users.hasFetched,
    };
}
var mapDispatchToProps = {
    loadUsers: _state_actions__WEBPACK_IMPORTED_MODULE_11__["loadUsers"],
    loadInvitees: _state_actions__WEBPACK_IMPORTED_MODULE_11__["loadInvitees"],
    setUsersSearchQuery: _state_reducers__WEBPACK_IMPORTED_MODULE_14__["setUsersSearchQuery"],
    updateUser: _state_actions__WEBPACK_IMPORTED_MODULE_11__["updateUser"],
    removeUser: _state_actions__WEBPACK_IMPORTED_MODULE_11__["removeUser"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(UsersListPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/users/UsersTable.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/users/UsersTable.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var UsersTable = function (props) {
    var users = props.users, onRoleChange = props.onRoleChange, onRemoveUser = props.onRemoveUser;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", { className: "filter-table form-inline" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null,
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Login"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Email"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Name"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Seen"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Role"),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", { style: { width: '34px' } }))),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, users.map(function (user, index) {
            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", { key: user.userId + "-" + index },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", { className: "width-4 text-center" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { className: "filter-table__avatar", src: user.avatarUrl })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.login),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "ellipsis" }, user.email)),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.name),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, user.lastSeenAtAge),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-select-wrapper width-12" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", { value: user.role, className: "gf-form-input", onChange: function (event) { return onRoleChange(event.target.value, user); } }, ['Viewer', 'Editor', 'Admin'].map(function (option, index) {
                            return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", { value: option, key: option + "-" + index }, option));
                        })))),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null,
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { onClick: function () { return onRemoveUser(user); }, className: "btn btn-danger btn-small" },
                        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fa fa-remove" })))));
        }))));
};
/* harmony default export */ __webpack_exports__["default"] = (UsersTable);


/***/ }),

/***/ "./public/app/features/users/state/actions.ts":
/*!****************************************************!*\
  !*** ./public/app/features/users/state/actions.ts ***!
  \****************************************************/
/*! exports provided: loadUsers, loadInvitees, updateUser, removeUser, revokeInvite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadUsers", function() { return loadUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadInvitees", function() { return loadInvitees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUser", function() { return updateUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeUser", function() { return removeUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "revokeInvite", function() { return revokeInvite; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers */ "./public/app/features/users/state/reducers.ts");



function loadUsers() {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var users;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/org/users')];
                case 1:
                    users = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_2__["usersLoaded"])(users));
                    return [2 /*return*/];
            }
        });
    }); };
}
function loadInvitees() {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var invitees;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().get('/api/org/invites')];
                case 1:
                    invitees = _a.sent();
                    dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_2__["inviteesLoaded"])(invitees));
                    return [2 /*return*/];
            }
        });
    }); };
}
function updateUser(user) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().patch("/api/org/users/" + user.userId, { role: user.role })];
                case 1:
                    _a.sent();
                    dispatch(loadUsers());
                    return [2 /*return*/];
            }
        });
    }); };
}
function removeUser(userId) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().delete("/api/org/users/" + userId)];
                case 1:
                    _a.sent();
                    dispatch(loadUsers());
                    return [2 /*return*/];
            }
        });
    }); };
}
function revokeInvite(code) {
    var _this = this;
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_1__["getBackendSrv"])().patch("/api/org/invites/" + code + "/revoke", {})];
                case 1:
                    _a.sent();
                    dispatch(loadInvitees());
                    return [2 /*return*/];
            }
        });
    }); };
}


/***/ }),

/***/ "./public/app/features/users/state/selectors.ts":
/*!******************************************************!*\
  !*** ./public/app/features/users/state/selectors.ts ***!
  \******************************************************/
/*! exports provided: getUsers, getInvitees, getInviteesCount, getUsersSearchQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsers", function() { return getUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInvitees", function() { return getInvitees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInviteesCount", function() { return getInviteesCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsersSearchQuery", function() { return getUsersSearchQuery; });
var getUsers = function (state) {
    var regex = new RegExp(state.searchQuery, 'i');
    return state.users.filter(function (user) {
        return regex.test(user.login) || regex.test(user.email) || regex.test(user.name);
    });
};
var getInvitees = function (state) {
    var regex = new RegExp(state.searchQuery, 'i');
    return state.invitees.filter(function (invitee) {
        return regex.test(invitee.name) || regex.test(invitee.email);
    });
};
var getInviteesCount = function (state) { return state.invitees.length; };
var getUsersSearchQuery = function (state) { return state.searchQuery; };


/***/ })

}]);
//# sourceMappingURL=UsersListPage.6310f9af5345c722b930.js.map