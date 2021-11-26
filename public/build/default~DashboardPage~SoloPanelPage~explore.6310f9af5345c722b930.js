(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~DashboardPage~SoloPanelPage~explore"],{

/***/ "./node_modules/react-virtualized-auto-sizer/dist/index.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-virtualized-auto-sizer/dist/index.esm.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Detect Element Resize.
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * Forked from version 0.5.3; includes the following modifications:
 * 1) Guard against unsafe 'window' and 'document' references (to support SSR).
 * 2) Defer initialization code via a top-level function wrapper (to support SSR).
 * 3) Avoid unnecessary reflows by not measuring size for scroll events bubbling from children.
 * 4) Add nonce for style element.
 **/

function createDetectElementResize(nonce) {
  // Check `document` and `window` in case of server-side rendering
  var _window;
  if (typeof window !== 'undefined') {
    _window = window;
  } else if (typeof self !== 'undefined') {
    _window = self;
  } else {
    _window = global;
  }

  var attachEvent = typeof document !== 'undefined' && document.attachEvent;

  if (!attachEvent) {
    var requestFrame = function () {
      var raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (fn) {
        return _window.setTimeout(fn, 20);
      };
      return function (fn) {
        return raf(fn);
      };
    }();

    var cancelFrame = function () {
      var cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
      return function (id) {
        return cancel(id);
      };
    }();

    var resetTriggers = function resetTriggers(element) {
      var triggers = element.__resizeTriggers__,
          expand = triggers.firstElementChild,
          contract = triggers.lastElementChild,
          expandChild = expand.firstElementChild;
      contract.scrollLeft = contract.scrollWidth;
      contract.scrollTop = contract.scrollHeight;
      expandChild.style.width = expand.offsetWidth + 1 + 'px';
      expandChild.style.height = expand.offsetHeight + 1 + 'px';
      expand.scrollLeft = expand.scrollWidth;
      expand.scrollTop = expand.scrollHeight;
    };

    var checkTriggers = function checkTriggers(element) {
      return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
    };

    var scrollListener = function scrollListener(e) {
      // Don't measure (which forces) reflow for scrolls that happen inside of children!
      if (e.target.className.indexOf('contract-trigger') < 0 && e.target.className.indexOf('expand-trigger') < 0) {
        return;
      }

      var element = this;
      resetTriggers(this);
      if (this.__resizeRAF__) {
        cancelFrame(this.__resizeRAF__);
      }
      this.__resizeRAF__ = requestFrame(function () {
        if (checkTriggers(element)) {
          element.__resizeLast__.width = element.offsetWidth;
          element.__resizeLast__.height = element.offsetHeight;
          element.__resizeListeners__.forEach(function (fn) {
            fn.call(element, e);
          });
        }
      });
    };

    /* Detect CSS Animations support to detect element display/re-attach */
    var animation = false,
        keyframeprefix = '',
        animationstartevent = 'animationstart',
        domPrefixes = 'Webkit Moz O ms'.split(' '),
        startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
        pfx = '';
    {
      var elm = document.createElement('fakeelement');
      if (elm.style.animationName !== undefined) {
        animation = true;
      }

      if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
          if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            pfx = domPrefixes[i];
            keyframeprefix = '-' + pfx.toLowerCase() + '-';
            animationstartevent = startEvents[i];
            animation = true;
            break;
          }
        }
      }
    }

    var animationName = 'resizeanim';
    var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
    var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
  }

  var createStyles = function createStyles(doc) {
    if (!doc.getElementById('detectElementResize')) {
      //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
      var css = (animationKeyframes ? animationKeyframes : '') + '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' + '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
          head = doc.head || doc.getElementsByTagName('head')[0],
          style = doc.createElement('style');

      style.id = 'detectElementResize';
      style.type = 'text/css';

      if (nonce != null) {
        style.setAttribute('nonce', nonce);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(doc.createTextNode(css));
      }

      head.appendChild(style);
    }
  };

  var addResizeListener = function addResizeListener(element, fn) {
    if (attachEvent) {
      element.attachEvent('onresize', fn);
    } else {
      if (!element.__resizeTriggers__) {
        var doc = element.ownerDocument;
        var elementStyle = _window.getComputedStyle(element);
        if (elementStyle && elementStyle.position == 'static') {
          element.style.position = 'relative';
        }
        createStyles(doc);
        element.__resizeLast__ = {};
        element.__resizeListeners__ = [];
        (element.__resizeTriggers__ = doc.createElement('div')).className = 'resize-triggers';
        element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' + '<div class="contract-trigger"></div>';
        element.appendChild(element.__resizeTriggers__);
        resetTriggers(element);
        element.addEventListener('scroll', scrollListener, true);

        /* Listen for a css animation to detect element display/re-attach */
        if (animationstartevent) {
          element.__resizeTriggers__.__animationListener__ = function animationListener(e) {
            if (e.animationName == animationName) {
              resetTriggers(element);
            }
          };
          element.__resizeTriggers__.addEventListener(animationstartevent, element.__resizeTriggers__.__animationListener__);
        }
      }
      element.__resizeListeners__.push(fn);
    }
  };

  var removeResizeListener = function removeResizeListener(element, fn) {
    if (attachEvent) {
      element.detachEvent('onresize', fn);
    } else {
      element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
      if (!element.__resizeListeners__.length) {
        element.removeEventListener('scroll', scrollListener, true);
        if (element.__resizeTriggers__.__animationListener__) {
          element.__resizeTriggers__.removeEventListener(animationstartevent, element.__resizeTriggers__.__animationListener__);
          element.__resizeTriggers__.__animationListener__ = null;
        }
        try {
          element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
        } catch (e) {
          // Preact compat; see developit/preact-compat/issues/228
        }
      }
    }
  };

  return {
    addResizeListener: addResizeListener,
    removeResizeListener: removeResizeListener
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var AutoSizer = function (_React$PureComponent) {
  inherits(AutoSizer, _React$PureComponent);

  function AutoSizer() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, AutoSizer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = AutoSizer.__proto__ || Object.getPrototypeOf(AutoSizer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      height: _this.props.defaultHeight || 0,
      width: _this.props.defaultWidth || 0
    }, _this._onResize = function () {
      var _this$props = _this.props,
          disableHeight = _this$props.disableHeight,
          disableWidth = _this$props.disableWidth,
          onResize = _this$props.onResize;


      if (_this._parentNode) {
        // Guard against AutoSizer component being removed from the DOM immediately after being added.
        // This can result in invalid style values which can result in NaN values if we don't handle them.
        // See issue #150 for more context.

        var _height = _this._parentNode.offsetHeight || 0;
        var _width = _this._parentNode.offsetWidth || 0;

        var _style = window.getComputedStyle(_this._parentNode) || {};
        var paddingLeft = parseInt(_style.paddingLeft, 10) || 0;
        var paddingRight = parseInt(_style.paddingRight, 10) || 0;
        var paddingTop = parseInt(_style.paddingTop, 10) || 0;
        var paddingBottom = parseInt(_style.paddingBottom, 10) || 0;

        var newHeight = _height - paddingTop - paddingBottom;
        var newWidth = _width - paddingLeft - paddingRight;

        if (!disableHeight && _this.state.height !== newHeight || !disableWidth && _this.state.width !== newWidth) {
          _this.setState({
            height: _height - paddingTop - paddingBottom,
            width: _width - paddingLeft - paddingRight
          });

          onResize({ height: _height, width: _width });
        }
      }
    }, _this._setRef = function (autoSizer) {
      _this._autoSizer = autoSizer;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(AutoSizer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var nonce = this.props.nonce;

      if (this._autoSizer && this._autoSizer.parentNode && this._autoSizer.parentNode.ownerDocument && this._autoSizer.parentNode.ownerDocument.defaultView && this._autoSizer.parentNode instanceof this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement) {
        // Delay access of parentNode until mount.
        // This handles edge-cases where the component has already been unmounted before its ref has been set,
        // As well as libraries like react-lite which have a slightly different lifecycle.
        this._parentNode = this._autoSizer.parentNode;

        // Defer requiring resize handler in order to support server-side rendering.
        // See issue #41
        this._detectElementResize = createDetectElementResize(nonce);
        this._detectElementResize.addResizeListener(this._parentNode, this._onResize);

        this._onResize();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._detectElementResize && this._parentNode) {
        this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          disableHeight = _props.disableHeight,
          disableWidth = _props.disableWidth,
          style = _props.style;
      var _state = this.state,
          height = _state.height,
          width = _state.width;

      // Outer div should not force width/height since that may prevent containers from shrinking.
      // Inner component should overflow and use calculated width/height.
      // See issue #68 for more information.

      var outerStyle = { overflow: 'visible' };
      var childParams = {};

      // Avoid rendering children before the initial measurements have been collected.
      // At best this would just be wasting cycles.
      var bailoutOnChildren = false;

      if (!disableHeight) {
        if (height === 0) {
          bailoutOnChildren = true;
        }
        outerStyle.height = 0;
        childParams.height = height;
      }

      if (!disableWidth) {
        if (width === 0) {
          bailoutOnChildren = true;
        }
        outerStyle.width = 0;
        childParams.width = width;
      }

      return Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(
        'div',
        {
          className: className,
          ref: this._setRef,
          style: _extends({}, outerStyle, style) },
        !bailoutOnChildren && children(childParams)
      );
    }
  }]);
  return AutoSizer;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

AutoSizer.defaultProps = {
  onResize: function onResize() {},
  disableHeight: false,
  disableWidth: false,
  style: {}
};

/* harmony default export */ __webpack_exports__["default"] = (AutoSizer);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./public/app/core/components/Animations/FadeIn.tsx":
/*!**********************************************************!*\
  !*** ./public/app/core/components/Animations/FadeIn.tsx ***!
  \**********************************************************/
/*! exports provided: FadeIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FadeIn", function() { return FadeIn; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group/Transition */ "./node_modules/react-transition-group/Transition.js");
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2__);



var FadeIn = function (props) {
    var defaultStyle = {
        transition: "opacity " + props.duration + "ms linear",
        opacity: 0,
    };
    var transitionStyles = {
        exited: { opacity: 0, display: 'none' },
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2___default.a, { in: props.in, timeout: props.duration, unmountOnExit: props.unmountOnExit || false, onExited: props.onExited }, function (state) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultStyle), transitionStyles[state]) }, props.children)); }));
};


/***/ }),

/***/ "./public/app/core/components/Select/DataSourcePicker.tsx":
/*!****************************************************************!*\
  !*** ./public/app/core/components/Select/DataSourcePicker.tsx ***!
  \****************************************************************/
/*! exports provided: DataSourcePicker, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcePicker", function() { return DataSourcePicker; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");

// Libraries

// Components

var DataSourcePicker = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DataSourcePicker, _super);
    function DataSourcePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (item) {
            var ds = _this.props.datasources.find(function (ds) { return ds.name === item.value; });
            _this.props.onChange(ds);
        };
        return _this;
    }
    DataSourcePicker.prototype.render = function () {
        var _a = this.props, datasources = _a.datasources, current = _a.current, autoFocus = _a.autoFocus, hideTextValue = _a.hideTextValue, onBlur = _a.onBlur, openMenuOnFocus = _a.openMenuOnFocus, showLoading = _a.showLoading;
        var options = datasources.map(function (ds) { return ({
            value: ds.name,
            label: ds.name,
            imgUrl: ds.meta.info.logos.small,
        }); });
        var value = current && {
            label: current.name.substr(0, 37),
            value: current.name,
            imgUrl: current.meta.info.logos.small,
            loading: showLoading,
            hideText: hideTextValue,
        };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { className: "ds-picker", isMulti: false, isClearable: false, backspaceRemovesValue: false, onChange: this.onChange, options: options, autoFocus: autoFocus, onBlur: onBlur, openMenuOnFocus: openMenuOnFocus, maxMenuHeight: 500, placeholder: "Select datasource", noOptionsMessage: function () { return 'No datasources found'; }, value: value })));
    };
    DataSourcePicker.defaultProps = {
        autoFocus: false,
        openMenuOnFocus: false,
    };
    return DataSourcePicker;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (DataSourcePicker);


/***/ }),

/***/ "./public/app/features/explore/state/actions.ts":
/*!******************************************************!*\
  !*** ./public/app/features/explore/state/actions.ts ***!
  \******************************************************/
/*! exports provided: addQueryRow, changeDatasource, changeMode, changeQuery, changeSize, updateTimeRange, changeRefreshInterval, clearQueries, loadExploreDatasourcesAndSetDatasource, initializeExplore, loadDatasourceReady, importQueries, loadDatasource, modifyQueries, runQueries, stateSave, updateTime, scanStart, setQueries, splitClose, splitOpen, syncTimes, toggleGraph, toggleTable, changeDedupStrategy, refreshExplore, navigateToExplore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addQueryRow", function() { return addQueryRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDatasource", function() { return changeDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeMode", function() { return changeMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeQuery", function() { return changeQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeSize", function() { return changeSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTimeRange", function() { return updateTimeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeRefreshInterval", function() { return changeRefreshInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearQueries", function() { return clearQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExploreDatasourcesAndSetDatasource", function() { return loadExploreDatasourcesAndSetDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeExplore", function() { return initializeExplore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDatasourceReady", function() { return loadDatasourceReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importQueries", function() { return importQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDatasource", function() { return loadDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifyQueries", function() { return modifyQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runQueries", function() { return runQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stateSave", function() { return stateSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTime", function() { return updateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scanStart", function() { return scanStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setQueries", function() { return setQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitClose", function() { return splitClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitOpen", function() { return splitOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncTimes", function() { return syncTimes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleGraph", function() { return toggleGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleTable", function() { return toggleTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDedupStrategy", function() { return changeDedupStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshExplore", function() { return refreshExplore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigateToExplore", function() { return navigateToExplore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/features/profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/utils/timePicker */ "./public/app/core/utils/timePicker.ts");
/* harmony import */ var _core_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var _dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../dashboard/state/runRequest */ "./public/app/features/dashboard/state/runRequest.ts");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./selectors */ "./public/app/features/explore/state/selectors.ts");

// Libraries




// Services & Utils











/**
 * Updates UI state and save it to the URL
 */
var updateExploreUIState = function (exploreId, uiStateFragment) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["updateUIStateAction"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ exploreId: exploreId }, uiStateFragment)));
        dispatch(stateSave());
    };
};
/**
 * Adds a query row after the row with the given index.
 */
function addQueryRow(exploreId, index) {
    return function (dispatch, getState) {
        var queries = getState().explore[exploreId].queries;
        var query = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["generateEmptyQuery"])(queries, index);
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["addQueryRowAction"])({ exploreId: exploreId, index: index, query: query }));
    };
}
/**
 * Loads a new datasource identified by the given name.
 */
function changeDatasource(exploreId, datasource) {
    var _this = this;
    return function (dispatch, getState) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var newDataSourceInstance, currentDataSourceInstance, queries, orgId, datasourceVersion, _a, prometheusToLoki;
        var _b, _c, _d, _e;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_f) {
            switch (_f.label) {
                case 0:
                    newDataSourceInstance = null;
                    if (!!datasource) return [3 /*break*/, 2];
                    return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_6__["getDatasourceSrv"])().get()];
                case 1:
                    newDataSourceInstance = _f.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_6__["getDatasourceSrv"])().get(datasource)];
                case 3:
                    newDataSourceInstance = _f.sent();
                    _f.label = 4;
                case 4:
                    currentDataSourceInstance = getState().explore[exploreId].datasourceInstance;
                    queries = getState().explore[exploreId].queries;
                    orgId = getState().user.orgId;
                    _a = newDataSourceInstance.getVersion;
                    if (!_a) return [3 /*break*/, 6];
                    return [4 /*yield*/, newDataSourceInstance.getVersion()];
                case 5:
                    _a = (_f.sent());
                    _f.label = 6;
                case 6:
                    datasourceVersion = _a;
                    prometheusToLoki = ((_c = (_b = currentDataSourceInstance) === null || _b === void 0 ? void 0 : _b.meta) === null || _c === void 0 ? void 0 : _c.name) === 'Prometheus' && ((_e = (_d = newDataSourceInstance) === null || _d === void 0 ? void 0 : _d.meta) === null || _e === void 0 ? void 0 : _e.name) === 'Loki';
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["updateDatasourceInstanceAction"])({
                        exploreId: exploreId,
                        datasourceInstance: newDataSourceInstance,
                        version: datasourceVersion,
                        mode: prometheusToLoki ? app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs : undefined,
                    }));
                    return [4 /*yield*/, dispatch(importQueries(exploreId, queries, currentDataSourceInstance, newDataSourceInstance))];
                case 7:
                    _f.sent();
                    if (getState().explore[exploreId].isLive) {
                        dispatch(changeRefreshInterval(exploreId, _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["RefreshPicker"].offOption.value));
                    }
                    return [4 /*yield*/, dispatch(loadDatasource(exploreId, newDataSourceInstance, orgId))];
                case 8:
                    _f.sent();
                    dispatch(runQueries(exploreId));
                    return [2 /*return*/];
            }
        });
    }); };
}
/**
 * Change the display mode in Explore.
 */
function changeMode(exploreId, mode) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeModeAction"])({ exploreId: exploreId, mode: mode }));
    };
}
/**
 * Query change handler for the query row with the given index.
 * If `override` is reset the query modifications and run the queries. Use this to set queries via a link.
 */
function changeQuery(exploreId, query, index, override) {
    if (override === void 0) { override = false; }
    return function (dispatch, getState) {
        // Null query means reset
        if (query === null) {
            var queries = getState().explore[exploreId].queries;
            var _a = queries[index], refId = _a.refId, key = _a.key;
            query = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["generateNewKeyAndAddRefIdIfMissing"])({ refId: refId, key: key }, queries, index);
        }
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeQueryAction"])({ exploreId: exploreId, query: query, index: index, override: override }));
        if (override) {
            dispatch(runQueries(exploreId));
        }
    };
}
/**
 * Keep track of the Explore container size, in particular the width.
 * The width will be used to calculate graph intervals (number of datapoints).
 */
function changeSize(exploreId, _a) {
    var height = _a.height, width = _a.width;
    return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeSizeAction"])({ exploreId: exploreId, height: height, width: width });
}
var updateTimeRange = function (options) {
    return function (dispatch, getState) {
        var syncedTimes = getState().explore.syncedTimes;
        if (syncedTimes) {
            dispatch(updateTime(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left })));
            dispatch(runQueries(app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left));
            dispatch(updateTime(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options), { exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right })));
            dispatch(runQueries(app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right));
        }
        else {
            dispatch(updateTime(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options)));
            dispatch(runQueries(options.exploreId));
        }
    };
};
/**
 * Change the refresh interval of Explore. Called from the Refresh picker.
 */
function changeRefreshInterval(exploreId, refreshInterval) {
    return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeRefreshIntervalAction"])({ exploreId: exploreId, refreshInterval: refreshInterval });
}
/**
 * Clear all queries and results.
 */
function clearQueries(exploreId) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["scanStopAction"])({ exploreId: exploreId }));
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["clearQueriesAction"])({ exploreId: exploreId }));
        dispatch(stateSave());
    };
}
/**
 * Loads all explore data sources and sets the chosen datasource.
 * If there are no datasources a missing datasource action is dispatched.
 */
function loadExploreDatasourcesAndSetDatasource(exploreId, datasourceName) {
    return function (dispatch) {
        var exploreDatasources = Object(_selectors__WEBPACK_IMPORTED_MODULE_15__["getExploreDatasources"])();
        if (exploreDatasources.length >= 1) {
            dispatch(changeDatasource(exploreId, datasourceName));
        }
        else {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["loadDatasourceMissingAction"])({ exploreId: exploreId }));
        }
    };
}
/**
 * Initialize Explore state with state from the URL and the React component.
 * Call this only on components for with the Explore state has not been initialized.
 */
function initializeExplore(exploreId, datasourceName, queries, range, mode, containerWidth, eventBridge, ui, originPanelId) {
    var _this = this;
    return function (dispatch, getState) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            dispatch(loadExploreDatasourcesAndSetDatasource(exploreId, datasourceName));
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["initializeExploreAction"])({
                exploreId: exploreId,
                containerWidth: containerWidth,
                eventBridge: eventBridge,
                queries: queries,
                range: range,
                mode: mode,
                ui: ui,
                originPanelId: originPanelId,
            }));
            dispatch(updateTime({ exploreId: exploreId }));
            return [2 /*return*/];
        });
    }); };
}
/**
 * Datasource loading was successfully completed.
 */
var loadDatasourceReady = function (exploreId, instance, orgId) {
    var historyKey = "grafana.explore.history." + instance.meta.id;
    var history = app_core_store__WEBPACK_IMPORTED_MODULE_5__["default"].getObject(historyKey, []);
    // Save last-used datasource
    app_core_store__WEBPACK_IMPORTED_MODULE_5__["default"].set(Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["lastUsedDatasourceKeyForOrgId"])(orgId), instance.name);
    return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["loadDatasourceReadyAction"])({
        exploreId: exploreId,
        history: history,
    });
};
/**
 * Import queries from previous datasource if possible eg Loki and Prometheus have similar query language so the
 * labels part can be reused to get similar data.
 * @param exploreId
 * @param queries
 * @param sourceDataSource
 * @param targetDataSource
 */
var importQueries = function (exploreId, queries, sourceDataSource, targetDataSource) {
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var importedQueries, nextQueries;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sourceDataSource) {
                        // explore not initialized
                        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["queriesImportedAction"])({ exploreId: exploreId, queries: queries }));
                        return [2 /*return*/];
                    }
                    importedQueries = queries;
                    if (!(sourceDataSource.meta.id === targetDataSource.meta.id)) return [3 /*break*/, 1];
                    // Keep same queries if same type of datasource
                    importedQueries = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(queries);
                    return [3 /*break*/, 4];
                case 1:
                    if (!targetDataSource.importQueries) return [3 /*break*/, 3];
                    return [4 /*yield*/, targetDataSource.importQueries(queries, sourceDataSource.meta)];
                case 2:
                    // Datasource-specific importers
                    importedQueries = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    // Default is blank queries
                    importedQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["ensureQueries"])();
                    _a.label = 4;
                case 4:
                    nextQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["ensureQueries"])(importedQueries);
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["queriesImportedAction"])({ exploreId: exploreId, queries: nextQueries }));
                    return [2 /*return*/];
            }
        });
    }); };
};
/**
 * Main action to asynchronously load a datasource. Dispatches lots of smaller actions for feedback.
 */
var loadDatasource = function (exploreId, instance, orgId) {
    return function (dispatch, getState) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var datasourceName;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            datasourceName = instance.name;
            // Keep ID to track selection
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["loadDatasourcePendingAction"])({ exploreId: exploreId, requestedDatasourceName: datasourceName }));
            if (instance.init) {
                try {
                    instance.init();
                }
                catch (err) {
                    console.log(err);
                }
            }
            if (datasourceName !== getState().explore[exploreId].requestedDatasourceName) {
                // User already changed datasource, discard results
                return [2 /*return*/];
            }
            dispatch(loadDatasourceReady(exploreId, instance, orgId));
            return [2 /*return*/];
        });
    }); };
};
/**
 * Action to modify a query given a datasource-specific modifier action.
 * @param exploreId Explore area
 * @param modification Action object with a type, e.g., ADD_FILTER
 * @param index Optional query row index. If omitted, the modification is applied to all query rows.
 * @param modifier Function that executes the modification, typically `datasourceInstance.modifyQueries`.
 */
function modifyQueries(exploreId, modification, modifier, index) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["modifyQueriesAction"])({ exploreId: exploreId, modification: modification, index: index, modifier: modifier }));
        if (!modification.preventSubmit) {
            dispatch(runQueries(exploreId));
        }
    };
}
/**
 * Main action to run queries and dispatches sub-actions based on which result viewers are active
 */
var runQueries = function (exploreId) {
    return function (dispatch, getState) {
        dispatch(updateTime({ exploreId: exploreId }));
        var exploreItemState = getState().explore[exploreId];
        var datasourceInstance = exploreItemState.datasourceInstance, queries = exploreItemState.queries, containerWidth = exploreItemState.containerWidth, live = exploreItemState.isLive, range = exploreItemState.range, scanning = exploreItemState.scanning, queryResponse = exploreItemState.queryResponse, querySubscription = exploreItemState.querySubscription, history = exploreItemState.history, mode = exploreItemState.mode, showingGraph = exploreItemState.showingGraph, showingTable = exploreItemState.showingTable;
        if (!Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["hasNonEmptyQuery"])(queries)) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["clearQueriesAction"])({ exploreId: exploreId }));
            dispatch(stateSave()); // Remember to save to state and update location
            return;
        }
        // Some datasource's query builders allow per-query interval limits,
        // but we're using the datasource interval limit for now
        var minInterval = datasourceInstance.interval;
        Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["stopQueryState"])(querySubscription);
        var queryOptions = {
            minInterval: minInterval,
            // This is used for logs streaming for buffer size, with undefined it falls back to datasource config if it
            // supports that.
            maxDataPoints: mode === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs ? undefined : containerWidth,
            liveStreaming: live,
            showingGraph: showingGraph,
            showingTable: showingTable,
            mode: mode,
        };
        var datasourceId = datasourceInstance.meta.id;
        var transaction = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["buildQueryTransaction"])(queries, queryOptions, range, scanning);
        var firstResponse = true;
        var newQuerySub = Object(_dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__["runRequest"])(datasourceInstance, transaction.request)
            .pipe(
        // Simple throttle for live tailing, in case of > 1000 rows per interval we spend about 200ms on processing and
        // rendering. In case this is optimized this can be tweaked, but also it should be only as fast as user
        // actually can see what is happening.
        live ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["throttleTime"])(500) : rxjs__WEBPACK_IMPORTED_MODULE_2__["identity"], Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (data) { return Object(_dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__["preProcessPanelData"])(data, queryResponse); }))
            .subscribe(function (data) {
            if (!data.error && firstResponse) {
                // Side-effect: Saving history in localstorage
                var nextHistory = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["updateHistory"])(history, datasourceId, queries);
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["historyUpdatedAction"])({ exploreId: exploreId, history: nextHistory }));
                // We save queries to the URL here so that only successfully run queries change the URL.
                dispatch(stateSave());
            }
            firstResponse = false;
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["queryStreamUpdatedAction"])({ exploreId: exploreId, response: data }));
            // Keep scanning for results if this was the last scanning transaction
            if (getState().explore[exploreId].scanning) {
                if (data.state === _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Done && data.series.length === 0) {
                    var range_1 = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__["getShiftedTimeRange"])(-1, getState().explore[exploreId].range);
                    dispatch(updateTime({ exploreId: exploreId, absoluteRange: range_1 }));
                    dispatch(runQueries(exploreId));
                }
                else {
                    // We can stop scanning if we have a result
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["scanStopAction"])({ exploreId: exploreId }));
                }
            }
        });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["queryStoreSubscriptionAction"])({ exploreId: exploreId, querySubscription: newQuerySub }));
    };
};
var toRawTimeRange = function (range) {
    var from = range.raw.from;
    if (Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["isDateTime"])(from)) {
        from = from.valueOf().toString(10);
    }
    var to = range.raw.to;
    if (Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["isDateTime"])(to)) {
        to = to.valueOf().toString(10);
    }
    return {
        from: from,
        to: to,
    };
};
/**
 * Save local redux state back to the URL. Should be called when there is some change that should affect the URL.
 * Not all of the redux state is reflected in URL though.
 */
var stateSave = function () {
    return function (dispatch, getState) {
        var _a = getState().explore, left = _a.left, right = _a.right, split = _a.split;
        var orgId = getState().user.orgId.toString();
        var replace = left && left.urlReplaced === false;
        var urlStates = { orgId: orgId };
        var leftUrlState = {
            datasource: left.datasourceInstance.name,
            queries: left.queries.map(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["clearQueryKeys"]),
            range: toRawTimeRange(left.range),
            mode: left.mode,
            ui: {
                showingGraph: left.showingGraph,
                showingLogs: true,
                showingTable: left.showingTable,
                dedupStrategy: left.dedupStrategy,
            },
        };
        urlStates.left = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["serializeStateToUrlParam"])(leftUrlState, true);
        if (split) {
            var rightUrlState = {
                datasource: right.datasourceInstance.name,
                queries: right.queries.map(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["clearQueryKeys"]),
                range: toRawTimeRange(right.range),
                mode: right.mode,
                ui: {
                    showingGraph: right.showingGraph,
                    showingLogs: true,
                    showingTable: right.showingTable,
                    dedupStrategy: right.dedupStrategy,
                },
            };
            urlStates.right = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["serializeStateToUrlParam"])(rightUrlState, true);
        }
        dispatch(Object(_core_actions__WEBPACK_IMPORTED_MODULE_12__["updateLocation"])({ query: urlStates, replace: replace }));
        if (replace) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["setUrlReplacedAction"])({ exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left }));
        }
    };
};
var updateTime = function (config) {
    return function (dispatch, getState) {
        var exploreId = config.exploreId, absRange = config.absoluteRange, actionRange = config.rawRange;
        var itemState = getState().explore[exploreId];
        var timeZone = Object(app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getTimeZone"])(getState().user);
        var rangeInState = itemState.range;
        var rawRange = rangeInState.raw;
        if (absRange) {
            rawRange = {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["dateTimeForTimeZone"])(timeZone, absRange.from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_4__["dateTimeForTimeZone"])(timeZone, absRange.to),
            };
        }
        if (actionRange) {
            rawRange = actionRange;
        }
        var range = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["getTimeRange"])(timeZone, rawRange);
        var absoluteRange = { from: range.from.valueOf(), to: range.to.valueOf() };
        Object(_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__["getTimeSrv"])().init({
            time: range.raw,
            refresh: false,
            getTimezone: function () { return timeZone; },
            timeRangeUpdated: function () { return undefined; },
        });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeRangeAction"])({ exploreId: exploreId, range: range, absoluteRange: absoluteRange }));
    };
};
/**
 * Start a scan for more results using the given scanner.
 * @param exploreId Explore area
 * @param scanner Function that a) returns a new time range and b) triggers a query run for the new range
 */
function scanStart(exploreId) {
    return function (dispatch, getState) {
        // Register the scanner
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["scanStartAction"])({ exploreId: exploreId }));
        // Scanning must trigger query run, and return the new range
        var range = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__["getShiftedTimeRange"])(-1, getState().explore[exploreId].range);
        // Set the new range to be displayed
        dispatch(updateTime({ exploreId: exploreId, absoluteRange: range }));
        dispatch(runQueries(exploreId));
    };
}
/**
 * Reset queries to the given queries. Any modifications will be discarded.
 * Use this action for clicks on query examples. Triggers a query run.
 */
function setQueries(exploreId, rawQueries) {
    return function (dispatch, getState) {
        // Inject react keys into query objects
        var queries = getState().explore[exploreId].queries;
        var nextQueries = rawQueries.map(function (query, index) { return Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["generateNewKeyAndAddRefIdIfMissing"])(query, queries, index); });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["setQueriesAction"])({ exploreId: exploreId, queries: nextQueries }));
        dispatch(runQueries(exploreId));
    };
}
/**
 * Close the split view and save URL state.
 */
function splitClose(itemId) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["splitCloseAction"])({ itemId: itemId }));
        dispatch(stateSave());
    };
}
/**
 * Open the split view and copy the left state to be the right state.
 * The right state is automatically initialized.
 * The copy keeps all query modifications but wipes the query results.
 */
function splitOpen() {
    return function (dispatch, getState) {
        // Clone left state to become the right state
        var leftState = getState().explore[app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left];
        var queryState = getState().location.query[app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left];
        var urlState = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["parseUrlState"])(queryState);
        var itemState = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, leftState), { queries: leftState.queries.slice(), urlState: urlState });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["splitOpenAction"])({ itemState: itemState }));
        dispatch(stateSave());
    };
}
/**
 * Syncs time interval, if they are not synced on both panels in a split mode.
 * Unsyncs time interval, if they are synced on both panels in a split mode.
 */
function syncTimes(exploreId) {
    return function (dispatch, getState) {
        if (exploreId === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left) {
            var leftState = getState().explore.left;
            dispatch(updateTimeRange({ exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].right, rawRange: leftState.range.raw }));
        }
        else {
            var rightState = getState().explore.right;
            dispatch(updateTimeRange({ exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreId"].left, rawRange: rightState.range.raw }));
        }
        var isTimeSynced = getState().explore.syncedTimes;
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["syncTimesAction"])({ syncedTimes: !isTimeSynced }));
        dispatch(stateSave());
    };
}
/**
 * Creates action to collapse graph/logs/table panel. When panel is collapsed,
 * queries won't be run
 */
var togglePanelActionCreator = function (actionCreator) { return function (exploreId, isPanelVisible) {
    return function (dispatch) {
        var uiFragmentStateUpdate;
        var shouldRunQueries = !isPanelVisible;
        switch (actionCreator.type) {
            case _actionTypes__WEBPACK_IMPORTED_MODULE_9__["toggleGraphAction"].type:
                uiFragmentStateUpdate = { showingGraph: !isPanelVisible };
                break;
            case _actionTypes__WEBPACK_IMPORTED_MODULE_9__["toggleTableAction"].type:
                uiFragmentStateUpdate = { showingTable: !isPanelVisible };
                break;
        }
        dispatch(actionCreator({ exploreId: exploreId }));
        dispatch(updateExploreUIState(exploreId, uiFragmentStateUpdate));
        if (shouldRunQueries) {
            dispatch(runQueries(exploreId));
        }
    };
}; };
/**
 * Expand/collapse the graph result viewer. When collapsed, graph queries won't be run.
 */
var toggleGraph = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["toggleGraphAction"]);
/**
 * Expand/collapse the table result viewer. When collapsed, table queries won't be run.
 */
var toggleTable = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["toggleTableAction"]);
/**
 * Change logs deduplication strategy and update URL.
 */
var changeDedupStrategy = function (exploreId, dedupStrategy) {
    return function (dispatch) {
        dispatch(updateExploreUIState(exploreId, { dedupStrategy: dedupStrategy }));
    };
};
/**
 * Reacts to changes in URL state that we need to sync back to our redux state. Checks the internal update variable
 * to see which parts change and need to be synced.
 * @param exploreId
 */
function refreshExplore(exploreId) {
    return function (dispatch, getState) {
        var itemState = getState().explore[exploreId];
        if (!itemState.initialized) {
            return;
        }
        var urlState = itemState.urlState, update = itemState.update, containerWidth = itemState.containerWidth, eventBridge = itemState.eventBridge;
        var datasource = urlState.datasource, queries = urlState.queries, urlRange = urlState.range, mode = urlState.mode, ui = urlState.ui, originPanelId = urlState.originPanelId;
        var refreshQueries = [];
        for (var index = 0; index < queries.length; index++) {
            var query = queries[index];
            refreshQueries.push(Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["generateNewKeyAndAddRefIdIfMissing"])(query, refreshQueries, index));
        }
        var timeZone = Object(app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_10__["getTimeZone"])(getState().user);
        var range = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["getTimeRangeFromUrl"])(urlRange, timeZone);
        // need to refresh datasource
        if (update.datasource) {
            var initialQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["ensureQueries"])(queries);
            dispatch(initializeExplore(exploreId, datasource, initialQueries, range, mode, containerWidth, eventBridge, ui, originPanelId));
            return;
        }
        if (update.range) {
            dispatch(updateTime({ exploreId: exploreId, rawRange: range.raw }));
        }
        // need to refresh ui state
        if (update.ui) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["updateUIStateAction"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, ui), { exploreId: exploreId })));
        }
        // need to refresh queries
        if (update.queries) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["setQueriesAction"])({ exploreId: exploreId, queries: refreshQueries }));
        }
        // need to refresh mode
        if (update.mode) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_9__["changeModeAction"])({ exploreId: exploreId, mode: mode }));
        }
        // always run queries when refresh is needed
        if (update.queries || update.ui || update.range) {
            dispatch(runQueries(exploreId));
        }
    };
}
var navigateToExplore = function (panel, dependencies) {
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var getDataSourceSrv, getTimeSrv, getExploreUrl, openInNewWindow, datasourceSrv, datasource, path, query;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getDataSourceSrv = dependencies.getDataSourceSrv, getTimeSrv = dependencies.getTimeSrv, getExploreUrl = dependencies.getExploreUrl, openInNewWindow = dependencies.openInNewWindow;
                    datasourceSrv = getDataSourceSrv();
                    return [4 /*yield*/, datasourceSrv.get(panel.datasource)];
                case 1:
                    datasource = _a.sent();
                    return [4 /*yield*/, getExploreUrl({
                            panel: panel,
                            panelTargets: panel.targets,
                            panelDatasource: datasource,
                            datasourceSrv: datasourceSrv,
                            timeSrv: getTimeSrv(),
                        })];
                case 2:
                    path = _a.sent();
                    if (openInNewWindow) {
                        openInNewWindow(path);
                        return [2 /*return*/];
                    }
                    query = {};
                    dispatch(Object(_core_actions__WEBPACK_IMPORTED_MODULE_12__["updateLocation"])({ path: path, query: query }));
                    return [2 /*return*/];
            }
        });
    }); };
};


/***/ }),

/***/ "./public/app/features/explore/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/explore/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: deduplicatedRowsSelector, getExploreDatasources */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deduplicatedRowsSelector", function() { return deduplicatedRowsSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExploreDatasources", function() { return getExploreDatasources; });
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");
/* harmony import */ var _plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");



var logsRowsSelector = function (state) { return state.logsResult && state.logsResult.rows; };
var hiddenLogLevelsSelector = function (state) { return state.hiddenLogLevels; };
var dedupStrategySelector = function (state) { return state.dedupStrategy; };
var deduplicatedRowsSelector = Object(reselect__WEBPACK_IMPORTED_MODULE_0__["createSelector"])(logsRowsSelector, hiddenLogLevelsSelector, dedupStrategySelector, function dedupRows(rows, hiddenLogLevels, dedupStrategy) {
    if (!(rows && rows.length)) {
        return rows;
    }
    var filteredRows = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__["filterLogLevels"])(rows, new Set(hiddenLogLevels));
    return Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__["dedupLogRows"])(filteredRows, dedupStrategy);
});
var getExploreDatasources = function () {
    return Object(_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_2__["getDatasourceSrv"])()
        .getExternal()
        .map(function (ds) {
        return ({
            value: ds.name,
            name: ds.name,
            meta: ds.meta,
        });
    });
};


/***/ }),

/***/ "./public/app/features/profile/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/profile/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: getTimeZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeZone", function() { return getTimeZone; });
var getTimeZone = function (state) { return state.timeZone; };


/***/ })

}]);
//# sourceMappingURL=default~DashboardPage~SoloPanelPage~explore.6310f9af5345c722b930.js.map