(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~DashboardPage~SoloPanelPage"],{

/***/ "./node_modules/react-draggable/dist/react-draggable.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-draggable/dist/react-draggable.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"), __webpack_require__(/*! react */ "./node_modules/react/index.js")) :
	undefined;
}(this, (function (ReactDOM,React) { 'use strict';

	ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;
	React = React && React.hasOwnProperty('default') ? React['default'] : React;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	var emptyFunction_1 = emptyFunction;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	{
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	var invariant_1 = invariant;

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction_1;

	{
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	var warning_1 = warning;

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	var ReactPropTypesSecret_1 = ReactPropTypesSecret;

	{
	  var invariant$1 = invariant_1;
	  var warning$1 = warning_1;
	  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
	        } catch (ex) {
	          error = ex;
	        }
	        warning$1(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning$1(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	var checkPropTypes_1 = checkPropTypes;

	var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret_1) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant_1(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if ( true && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning_1(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
	      return emptyFunction_1.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
	      return emptyFunction_1.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning_1(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction_1.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = objectAssign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes_1;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	var propTypes = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
	}
	});

	var classnames = createCommonjsModule(function (module) {
	/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if ( true && module.exports) {
			module.exports = classNames;
		} else if (false) {} else {
			window.classNames = classNames;
		}
	}());
	});

	// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
	function findInArray(array /*: Array<any> | TouchList*/, callback /*: Function*/) /*: any*/ {
	  for (var i = 0, length = array.length; i < length; i++) {
	    if (callback.apply(callback, [array[i], i, array])) return array[i];
	  }
	}

	function isFunction(func /*: any*/) /*: boolean*/ {
	  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
	}

	function isNum(num /*: any*/) /*: boolean*/ {
	  return typeof num === 'number' && !isNaN(num);
	}

	function int(a /*: string*/) /*: number*/ {
	  return parseInt(a, 10);
	}

	function dontSetMe(props /*: Object*/, propName /*: string*/, componentName /*: string*/) {
	  if (props[propName]) {
	    return new Error('Invalid prop ' + propName + ' passed to ' + componentName + ' - do not set this, set it on the child.');
	  }
	}

	var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	function getPrefix() /*: string*/ {
	  var prop /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

	  // Checking specifically for 'window.document' is for pseudo-browser server-side
	  // environments that define 'window' as the global context.
	  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
	  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

	  var style = window.document.documentElement.style;

	  if (prop in style) return '';

	  for (var i = 0; i < prefixes.length; i++) {
	    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
	  }

	  return '';
	}

	function browserPrefixToKey(prop /*: string*/, prefix /*: string*/) /*: string*/ {
	  return prefix ? '' + prefix + kebabToTitleCase(prop) : prop;
	}

	function kebabToTitleCase(str /*: string*/) /*: string*/ {
	  var out = '';
	  var shouldCapitalize = true;
	  for (var i = 0; i < str.length; i++) {
	    if (shouldCapitalize) {
	      out += str[i].toUpperCase();
	      shouldCapitalize = false;
	    } else if (str[i] === '-') {
	      shouldCapitalize = true;
	    } else {
	      out += str[i];
	    }
	  }
	  return out;
	}

	// Default export is the prefix itself, like 'Moz', 'Webkit', etc
	// Note that you may have to re-test for certain things; for instance, Chrome 50
	// can handle unprefixed `transform`, but not unprefixed `user-select`
	var browserPrefix = getPrefix();

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

	var defineProperty = function (obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

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

	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

	/*:: import type {ControlPosition, PositionOffsetControlPosition, MouseTouchEvent} from './types';*/


	var matchesSelectorFunc = '';
	function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/ {
	  if (!matchesSelectorFunc) {
	    matchesSelectorFunc = findInArray(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
	      // $FlowIgnore: Doesn't think elements are indexable
	      return isFunction(el[method]);
	    });
	  }

	  // Might not be found entirely (not an Element?) - in that case, bail
	  // $FlowIgnore: Doesn't think elements are indexable
	  if (!isFunction(el[matchesSelectorFunc])) return false;

	  // $FlowIgnore: Doesn't think elements are indexable
	  return el[matchesSelectorFunc](selector);
	}

	// Works up the tree to the draggable itself attempting to match selector.
	function matchesSelectorAndParentsTo(el /*: Node*/, selector /*: string*/, baseNode /*: Node*/) /*: boolean*/ {
	  var node = el;
	  do {
	    if (matchesSelector(node, selector)) return true;
	    if (node === baseNode) return false;
	    node = node.parentNode;
	  } while (node);

	  return false;
	}

	function addEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
	  if (!el) {
	    return;
	  }
	  if (el.attachEvent) {
	    el.attachEvent('on' + event, handler);
	  } else if (el.addEventListener) {
	    el.addEventListener(event, handler, true);
	  } else {
	    // $FlowIgnore: Doesn't think elements are indexable
	    el['on' + event] = handler;
	  }
	}

	function removeEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
	  if (!el) {
	    return;
	  }
	  if (el.detachEvent) {
	    el.detachEvent('on' + event, handler);
	  } else if (el.removeEventListener) {
	    el.removeEventListener(event, handler, true);
	  } else {
	    // $FlowIgnore: Doesn't think elements are indexable
	    el['on' + event] = null;
	  }
	}

	function outerHeight(node /*: HTMLElement*/) /*: number*/ {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetTop which is including margin. See getBoundPosition
	  var height = node.clientHeight;
	  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
	  height += int(computedStyle.borderTopWidth);
	  height += int(computedStyle.borderBottomWidth);
	  return height;
	}

	function outerWidth(node /*: HTMLElement*/) /*: number*/ {
	  // This is deliberately excluding margin for our calculations, since we are using
	  // offsetLeft which is including margin. See getBoundPosition
	  var width = node.clientWidth;
	  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
	  width += int(computedStyle.borderLeftWidth);
	  width += int(computedStyle.borderRightWidth);
	  return width;
	}
	function innerHeight(node /*: HTMLElement*/) /*: number*/ {
	  var height = node.clientHeight;
	  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
	  height -= int(computedStyle.paddingTop);
	  height -= int(computedStyle.paddingBottom);
	  return height;
	}

	function innerWidth(node /*: HTMLElement*/) /*: number*/ {
	  var width = node.clientWidth;
	  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
	  width -= int(computedStyle.paddingLeft);
	  width -= int(computedStyle.paddingRight);
	  return width;
	}

	// Get from offsetParent
	function offsetXYFromParent(evt /*: {clientX: number, clientY: number}*/, offsetParent /*: HTMLElement*/) /*: ControlPosition*/ {
	  var isBody = offsetParent === offsetParent.ownerDocument.body;
	  var offsetParentRect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect();

	  var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
	  var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

	  return { x: x, y: y };
	}

	function createCSSTransform(controlPos /*: ControlPosition*/, positionOffset /*: PositionOffsetControlPosition*/) /*: Object*/ {
	  var translation = getTranslation(controlPos, positionOffset, 'px');
	  return defineProperty({}, browserPrefixToKey('transform', browserPrefix), translation);
	}

	function createSVGTransform(controlPos /*: ControlPosition*/, positionOffset /*: PositionOffsetControlPosition*/) /*: string*/ {
	  var translation = getTranslation(controlPos, positionOffset, '');
	  return translation;
	}
	function getTranslation(_ref2, positionOffset /*: PositionOffsetControlPosition*/, unitSuffix /*: string*/) /*: string*/ {
	  var x = _ref2.x,
	      y = _ref2.y;

	  var translation = 'translate(' + x + unitSuffix + ',' + y + unitSuffix + ')';
	  if (positionOffset) {
	    var defaultX = '' + (typeof positionOffset.x === 'string' ? positionOffset.x : positionOffset.x + unitSuffix);
	    var defaultY = '' + (typeof positionOffset.y === 'string' ? positionOffset.y : positionOffset.y + unitSuffix);
	    translation = 'translate(' + defaultX + ', ' + defaultY + ')' + translation;
	  }
	  return translation;
	}

	function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{clientX: number, clientY: number}*/ {
	  return e.targetTouches && findInArray(e.targetTouches, function (t) {
	    return identifier === t.identifier;
	  }) || e.changedTouches && findInArray(e.changedTouches, function (t) {
	    return identifier === t.identifier;
	  });
	}

	function getTouchIdentifier(e /*: MouseTouchEvent*/) /*: ?number*/ {
	  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
	  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
	}

	// User-select Hacks:
	//
	// Useful for preventing blue highlights all over everything when dragging.

	// Note we're passing `document` b/c we could be iframed
	function addUserSelectStyles(doc /*: ?Document*/) {
	  if (!doc) return;
	  var styleEl = doc.getElementById('react-draggable-style-el');
	  if (!styleEl) {
	    styleEl = doc.createElement('style');
	    styleEl.type = 'text/css';
	    styleEl.id = 'react-draggable-style-el';
	    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
	    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {all: inherit;}\n';
	    doc.getElementsByTagName('head')[0].appendChild(styleEl);
	  }
	  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
	}

	function removeUserSelectStyles(doc /*: ?Document*/) {
	  try {
	    if (doc && doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection');
	    // $FlowIgnore: IE
	    if (doc.selection) {
	      // $FlowIgnore: IE
	      doc.selection.empty();
	    } else {
	      window.getSelection().removeAllRanges(); // remove selection caused by scroll
	    }
	  } catch (e) {
	    // probably IE
	  }
	}

	function styleHacks() /*: Object*/ {
	  var childStyle /*: Object*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  // Workaround IE pointer events; see #51
	  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
	  return _extends({
	    touchAction: 'none'
	  }, childStyle);
	}

	function addClassName(el /*: HTMLElement*/, className /*: string*/) {
	  if (el.classList) {
	    el.classList.add(className);
	  } else {
	    if (!el.className.match(new RegExp('(?:^|\\s)' + className + '(?!\\S)'))) {
	      el.className += ' ' + className;
	    }
	  }
	}

	function removeClassName(el /*: HTMLElement*/, className /*: string*/) {
	  if (el.classList) {
	    el.classList.remove(className);
	  } else {
	    el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'g'), '');
	  }
	}

	/*:: import type Draggable from '../Draggable';*/
	/*:: import type {Bounds, ControlPosition, DraggableData, MouseTouchEvent} from './types';*/
	/*:: import type DraggableCore from '../DraggableCore';*/


	function getBoundPosition(draggable /*: Draggable*/, x /*: number*/, y /*: number*/) /*: [number, number]*/ {
	  // If no bounds, short-circuit and move on
	  if (!draggable.props.bounds) return [x, y];

	  // Clone new bounds
	  var bounds = draggable.props.bounds;

	  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
	  var node = findDOMNode(draggable);

	  if (typeof bounds === 'string') {
	    var ownerDocument = node.ownerDocument;

	    var ownerWindow = ownerDocument.defaultView;
	    var boundNode = void 0;
	    if (bounds === 'parent') {
	      boundNode = node.parentNode;
	    } else {
	      boundNode = ownerDocument.querySelector(bounds);
	    }
	    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
	      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
	    }
	    var nodeStyle = ownerWindow.getComputedStyle(node);
	    var boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
	    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
	    bounds = {
	      left: -node.offsetLeft + int(boundNodeStyle.paddingLeft) + int(nodeStyle.marginLeft),
	      top: -node.offsetTop + int(boundNodeStyle.paddingTop) + int(nodeStyle.marginTop),
	      right: innerWidth(boundNode) - outerWidth(node) - node.offsetLeft + int(boundNodeStyle.paddingRight) - int(nodeStyle.marginRight),
	      bottom: innerHeight(boundNode) - outerHeight(node) - node.offsetTop + int(boundNodeStyle.paddingBottom) - int(nodeStyle.marginBottom)
	    };
	  }

	  // Keep x and y below right and bottom limits...
	  if (isNum(bounds.right)) x = Math.min(x, bounds.right);
	  if (isNum(bounds.bottom)) y = Math.min(y, bounds.bottom);

	  // But above left and top limits.
	  if (isNum(bounds.left)) x = Math.max(x, bounds.left);
	  if (isNum(bounds.top)) y = Math.max(y, bounds.top);

	  return [x, y];
	}

	function snapToGrid(grid /*: [number, number]*/, pendingX /*: number*/, pendingY /*: number*/) /*: [number, number]*/ {
	  var x = Math.round(pendingX / grid[0]) * grid[0];
	  var y = Math.round(pendingY / grid[1]) * grid[1];
	  return [x, y];
	}

	function canDragX(draggable /*: Draggable*/) /*: boolean*/ {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
	}

	function canDragY(draggable /*: Draggable*/) /*: boolean*/ {
	  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
	}

	// Get {x, y} positions from event.
	function getControlPosition(e /*: MouseTouchEvent*/, touchIdentifier /*: ?number*/, draggableCore /*: DraggableCore*/) /*: ?ControlPosition*/ {
	  var touchObj = typeof touchIdentifier === 'number' ? getTouch(e, touchIdentifier) : null;
	  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
	  var node = findDOMNode(draggableCore);
	  // User can provide an offsetParent if desired.
	  var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
	  return offsetXYFromParent(touchObj || e, offsetParent);
	}

	// Create an data object exposed by <DraggableCore>'s events
	function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/ {
	  var state = draggable.state;
	  var isStart = !isNum(state.lastX);
	  var node = findDOMNode(draggable);

	  if (isStart) {
	    // If this is our first move, use the x and y as last coords.
	    return {
	      node: node,
	      deltaX: 0, deltaY: 0,
	      lastX: x, lastY: y,
	      x: x, y: y
	    };
	  } else {
	    // Otherwise calculate proper values.
	    return {
	      node: node,
	      deltaX: x - state.lastX, deltaY: y - state.lastY,
	      lastX: state.lastX, lastY: state.lastY,
	      x: x, y: y
	    };
	  }
	}

	// Create an data exposed by <Draggable>'s events
	function createDraggableData(draggable /*: Draggable*/, coreData /*: DraggableData*/) /*: DraggableData*/ {
	  var scale = draggable.props.scale;
	  return {
	    node: coreData.node,
	    x: draggable.state.x + coreData.deltaX / scale,
	    y: draggable.state.y + coreData.deltaY / scale,
	    deltaX: coreData.deltaX / scale,
	    deltaY: coreData.deltaY / scale,
	    lastX: draggable.state.x,
	    lastY: draggable.state.y
	  };
	}

	// A lot faster than stringify/parse
	function cloneBounds(bounds /*: Bounds*/) /*: Bounds*/ {
	  return {
	    left: bounds.left,
	    top: bounds.top,
	    right: bounds.right,
	    bottom: bounds.bottom
	  };
	}

	function findDOMNode(draggable /*: Draggable | DraggableCore*/) /*: HTMLElement*/ {
	  var node = ReactDOM.findDOMNode(draggable);
	  if (!node) {
	    throw new Error('<DraggableCore>: Unmounted during event!');
	  }
	  // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
	  return node;
	}

	/*eslint no-console:0*/
	function log() {
	}

	/*:: import type {EventHandler, MouseTouchEvent} from './utils/types';*/


	// Simple abstraction for dragging events names.
	/*:: import type {Element as ReactElement} from 'react';*/
	var eventsFor = {
	  touch: {
	    start: 'touchstart',
	    move: 'touchmove',
	    stop: 'touchend'
	  },
	  mouse: {
	    start: 'mousedown',
	    move: 'mousemove',
	    stop: 'mouseup'
	  }
	};

	// Default to mouse events.
	var dragEventFor = eventsFor.mouse;

	/*:: type DraggableCoreState = {
	  dragging: boolean,
	  lastX: number,
	  lastY: number,
	  touchIdentifier: ?number
	};*/
	/*:: export type DraggableBounds = {
	  left: number,
	  right: number,
	  top: number,
	  bottom: number,
	};*/
	/*:: export type DraggableData = {
	  node: HTMLElement,
	  x: number, y: number,
	  deltaX: number, deltaY: number,
	  lastX: number, lastY: number,
	};*/
	/*:: export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void;*/
	/*:: export type ControlPosition = {x: number, y: number};*/
	/*:: export type PositionOffsetControlPosition = {x: number|string, y: number|string};*/


	//
	// Define <DraggableCore>.
	//
	// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
	// work well with libraries that require more control over the element.
	//

	/*:: export type DraggableCoreProps = {
	  allowAnyClick: boolean,
	  cancel: string,
	  children: ReactElement<any>,
	  disabled: boolean,
	  enableUserSelectHack: boolean,
	  offsetParent: HTMLElement,
	  grid: [number, number],
	  handle: string,
	  onStart: DraggableEventHandler,
	  onDrag: DraggableEventHandler,
	  onStop: DraggableEventHandler,
	  onMouseDown: (e: MouseEvent) => void,
	};*/

	var DraggableCore = function (_React$Component) {
	  inherits(DraggableCore, _React$Component);

	  function DraggableCore() {
	    var _ref;

	    var _temp, _this, _ret;

	    classCallCheck(this, DraggableCore);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = DraggableCore.__proto__ || Object.getPrototypeOf(DraggableCore)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
	      dragging: false,
	      // Used while dragging to determine deltas.
	      lastX: NaN, lastY: NaN,
	      touchIdentifier: null
	    }, _this.handleDragStart = function (e) {
	      // Make it possible to attach event handlers on top of this one.
	      _this.props.onMouseDown(e);

	      // Only accept left-clicks.
	      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

	      // Get nodes. Be sure to grab relative document (could be iframed)
	      var thisNode = ReactDOM.findDOMNode(_this);
	      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
	        throw new Error('<DraggableCore> not mounted on DragStart!');
	      }
	      var ownerDocument = thisNode.ownerDocument;

	      // Short circuit if handle or cancel prop was provided and selector doesn't match.

	      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !matchesSelectorAndParentsTo(e.target, _this.props.handle, thisNode) || _this.props.cancel && matchesSelectorAndParentsTo(e.target, _this.props.cancel, thisNode)) {
	        return;
	      }

	      // Set touch identifier in component state if this is a touch event. This allows us to
	      // distinguish between individual touches on multitouch screens by identifying which
	      // touchpoint was set to this element.
	      var touchIdentifier = getTouchIdentifier(e);
	      _this.setState({ touchIdentifier: touchIdentifier });

	      // Get the current drag point from the event. This is used as the offset.
	      var position = getControlPosition(e, touchIdentifier, _this);
	      if (position == null) return; // not possible but satisfies flow
	      var x = position.x,
	          y = position.y;

	      // Create an event object with all the data parents need to make a decision here.

	      var coreEvent = createCoreData(_this, x, y);

	      // Call event handler. If it returns explicit false, cancel.
	      log('calling', _this.props.onStart);
	      var shouldUpdate = _this.props.onStart(e, coreEvent);
	      if (shouldUpdate === false) return;

	      // Add a style to the body to disable user-select. This prevents text from
	      // being selected all over the page.
	      if (_this.props.enableUserSelectHack) addUserSelectStyles(ownerDocument);

	      // Initiate dragging. Set the current x and y as offsets
	      // so we know how much we've moved during the drag. This allows us
	      // to drag elements around even if they have been moved, without issue.
	      _this.setState({
	        dragging: true,

	        lastX: x,
	        lastY: y
	      });

	      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
	      // this element. We use different events depending on whether or not we have detected that this
	      // is a touch-capable device.
	      addEvent(ownerDocument, dragEventFor.move, _this.handleDrag);
	      addEvent(ownerDocument, dragEventFor.stop, _this.handleDragStop);
	    }, _this.handleDrag = function (e) {

	      // Prevent scrolling on mobile devices, like ipad/iphone.
	      if (e.type === 'touchmove') e.preventDefault();

	      // Get the current drag point from the event. This is used as the offset.
	      var position = getControlPosition(e, _this.state.touchIdentifier, _this);
	      if (position == null) return;
	      var x = position.x,
	          y = position.y;

	      // Snap to grid if prop has been provided

	      if (Array.isArray(_this.props.grid)) {
	        var _deltaX = x - _this.state.lastX,
	            _deltaY = y - _this.state.lastY;

	        var _snapToGrid = snapToGrid(_this.props.grid, _deltaX, _deltaY);

	        var _snapToGrid2 = slicedToArray(_snapToGrid, 2);

	        _deltaX = _snapToGrid2[0];
	        _deltaY = _snapToGrid2[1];

	        if (!_deltaX && !_deltaY) return; // skip useless drag
	        x = _this.state.lastX + _deltaX, y = _this.state.lastY + _deltaY;
	      }

	      var coreEvent = createCoreData(_this, x, y);

	      // Call event handler. If it returns explicit false, trigger end.
	      var shouldUpdate = _this.props.onDrag(e, coreEvent);
	      if (shouldUpdate === false) {
	        try {
	          // $FlowIgnore
	          _this.handleDragStop(new MouseEvent('mouseup'));
	        } catch (err) {
	          // Old browsers
	          var event = ((document.createEvent('MouseEvents') /*: any*/) /*: MouseTouchEvent*/);
	          // I see why this insanity was deprecated
	          // $FlowIgnore
	          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	          _this.handleDragStop(event);
	        }
	        return;
	      }

	      _this.setState({
	        lastX: x,
	        lastY: y
	      });
	    }, _this.handleDragStop = function (e) {
	      if (!_this.state.dragging) return;

	      var position = getControlPosition(e, _this.state.touchIdentifier, _this);
	      if (position == null) return;
	      var x = position.x,
	          y = position.y;

	      var coreEvent = createCoreData(_this, x, y);

	      var thisNode = ReactDOM.findDOMNode(_this);
	      if (thisNode) {
	        // Remove user-select hack
	        if (_this.props.enableUserSelectHack) removeUserSelectStyles(thisNode.ownerDocument);
	      }

	      // Reset the el.
	      _this.setState({
	        dragging: false,
	        lastX: NaN,
	        lastY: NaN
	      });

	      // Call event handler
	      _this.props.onStop(e, coreEvent);

	      if (thisNode) {
	        removeEvent(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
	        removeEvent(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
	      }
	    }, _this.onMouseDown = function (e) {
	      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

	      return _this.handleDragStart(e);
	    }, _this.onMouseUp = function (e) {
	      dragEventFor = eventsFor.mouse;

	      return _this.handleDragStop(e);
	    }, _this.onTouchStart = function (e) {
	      // We're on a touch device now, so change the event handlers
	      dragEventFor = eventsFor.touch;

	      return _this.handleDragStart(e);
	    }, _this.onTouchEnd = function (e) {
	      // We're on a touch device now, so change the event handlers
	      dragEventFor = eventsFor.touch;

	      return _this.handleDragStop(e);
	    }, _temp), possibleConstructorReturn(_this, _ret);
	  }

	  createClass(DraggableCore, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      // Remove any leftover event handlers. Remove both touch and mouse handlers in case
	      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
	      var thisNode = ReactDOM.findDOMNode(this);
	      if (thisNode) {
	        var ownerDocument = thisNode.ownerDocument;

	        removeEvent(ownerDocument, eventsFor.mouse.move, this.handleDrag);
	        removeEvent(ownerDocument, eventsFor.touch.move, this.handleDrag);
	        removeEvent(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
	        removeEvent(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
	        if (this.props.enableUserSelectHack) removeUserSelectStyles(ownerDocument);
	      }
	    }

	    // Same as onMouseDown (start drag), but now consider this a touch device.

	  }, {
	    key: 'render',
	    value: function render() {
	      // Reuse the child provided
	      // This makes it flexible to use whatever element is wanted (div, ul, etc)
	      return React.cloneElement(React.Children.only(this.props.children), {
	        style: styleHacks(this.props.children.props.style),

	        // Note: mouseMove handler is attached to document so it will still function
	        // when the user drags quickly and leaves the bounds of the element.
	        onMouseDown: this.onMouseDown,
	        onTouchStart: this.onTouchStart,
	        onMouseUp: this.onMouseUp,
	        onTouchEnd: this.onTouchEnd
	      });
	    }
	  }]);
	  return DraggableCore;
	}(React.Component);

	DraggableCore.displayName = 'DraggableCore';
	DraggableCore.propTypes = {
	  /**
	   * `allowAnyClick` allows dragging using any mouse button.
	   * By default, we only accept the left button.
	   *
	   * Defaults to `false`.
	   */
	  allowAnyClick: propTypes.bool,

	  /**
	   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
	   * with the exception of `onMouseDown`, will not fire.
	   */
	  disabled: propTypes.bool,

	  /**
	   * By default, we add 'user-select:none' attributes to the document body
	   * to prevent ugly text selection during drag. If this is causing problems
	   * for your app, set this to `false`.
	   */
	  enableUserSelectHack: propTypes.bool,

	  /**
	   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
	   * instead of using the parent node.
	   */
	  offsetParent: function offsetParent(props /*: DraggableCoreProps*/, propName /*: $Keys<DraggableCoreProps>*/) {
	    if (props[propName] && props[propName].nodeType !== 1) {
	      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
	    }
	  },

	  /**
	   * `grid` specifies the x and y that dragging should snap to.
	   */
	  grid: propTypes.arrayOf(propTypes.number),

	  /**
	   * `scale` specifies the scale of the area you are dragging inside of. It allows
	   * the drag deltas to scale correctly with how far zoomed in/out you are.
	   */
	  scale: propTypes.number,

	  /**
	   * `handle` specifies a selector to be used as the handle that initiates drag.
	   *
	   * Example:
	   *
	   * ```jsx
	   *   let App = React.createClass({
	   *       render: function () {
	   *         return (
	   *            <Draggable handle=".handle">
	   *              <div>
	   *                  <div className="handle">Click me to drag</div>
	   *                  <div>This is some other content</div>
	   *              </div>
	   *           </Draggable>
	   *         );
	   *       }
	   *   });
	   * ```
	   */
	  handle: propTypes.string,

	  /**
	   * `cancel` specifies a selector to be used to prevent drag initialization.
	   *
	   * Example:
	   *
	   * ```jsx
	   *   let App = React.createClass({
	   *       render: function () {
	   *           return(
	   *               <Draggable cancel=".cancel">
	   *                   <div>
	   *                     <div className="cancel">You can't drag from here</div>
	   *                     <div>Dragging here works fine</div>
	   *                   </div>
	   *               </Draggable>
	   *           );
	   *       }
	   *   });
	   * ```
	   */
	  cancel: propTypes.string,

	  /**
	   * Called when dragging starts.
	   * If this function returns the boolean false, dragging will be canceled.
	   */
	  onStart: propTypes.func,

	  /**
	   * Called while dragging.
	   * If this function returns the boolean false, dragging will be canceled.
	   */
	  onDrag: propTypes.func,

	  /**
	   * Called when dragging stops.
	   * If this function returns the boolean false, the drag will remain active.
	   */
	  onStop: propTypes.func,

	  /**
	   * A workaround option which can be passed if onMouseDown needs to be accessed,
	   * since it'll always be blocked (as there is internal use of onMouseDown)
	   */
	  onMouseDown: propTypes.func,

	  /**
	   * These properties should be defined on the child, not here.
	   */
	  className: dontSetMe,
	  style: dontSetMe,
	  transform: dontSetMe
	};
	DraggableCore.defaultProps = {
	  allowAnyClick: false, // by default only accept left click
	  cancel: null,
	  disabled: false,
	  enableUserSelectHack: true,
	  offsetParent: null,
	  handle: null,
	  grid: null,
	  transform: null,
	  onStart: function onStart() {},
	  onDrag: function onDrag() {},
	  onStop: function onStop() {},
	  onMouseDown: function onMouseDown() {}
	};

	/*:: import type {DraggableEventHandler} from './utils/types';*/
	/*:: import type {Element as ReactElement} from 'react';*/
	/*:: type DraggableState = {
	  dragging: boolean,
	  dragged: boolean,
	  x: number, y: number,
	  slackX: number, slackY: number,
	  isElementSVG: boolean
	};*/


	//
	// Define <Draggable>
	//

	/*:: export type DraggableProps = {
	  ...$Exact<DraggableCoreProps>,
	  axis: 'both' | 'x' | 'y' | 'none',
	  bounds: DraggableBounds | string | false,
	  defaultClassName: string,
	  defaultClassNameDragging: string,
	  defaultClassNameDragged: string,
	  defaultPosition: ControlPosition,
	  positionOffset: PositionOffsetControlPosition,
	  position: ControlPosition,
	  scale: number
	};*/

	var Draggable = function (_React$Component) {
	  inherits(Draggable, _React$Component);

	  function Draggable(props /*: DraggableProps*/) {
	    classCallCheck(this, Draggable);

	    var _this = possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));

	    _this.onDragStart = function (e, coreData) {

	      // Short-circuit if user's callback killed it.
	      var shouldStart = _this.props.onStart(e, createDraggableData(_this, coreData));
	      // Kills start event on core as well, so move handlers are never bound.
	      if (shouldStart === false) return false;

	      _this.setState({ dragging: true, dragged: true });
	    };

	    _this.onDrag = function (e, coreData) {
	      if (!_this.state.dragging) return false;

	      var uiData = createDraggableData(_this, coreData);

	      var newState /*: $Shape<DraggableState>*/ = {
	        x: uiData.x,
	        y: uiData.y
	      };

	      // Keep within bounds.
	      if (_this.props.bounds) {
	        // Save original x and y.
	        var _x = newState.x,
	            _y = newState.y;

	        // Add slack to the values used to calculate bound position. This will ensure that if
	        // we start removing slack, the element won't react to it right away until it's been
	        // completely removed.

	        newState.x += _this.state.slackX;
	        newState.y += _this.state.slackY;

	        // Get bound position. This will ceil/floor the x and y within the boundaries.

	        var _getBoundPosition = getBoundPosition(_this, newState.x, newState.y),
	            _getBoundPosition2 = slicedToArray(_getBoundPosition, 2),
	            newStateX = _getBoundPosition2[0],
	            newStateY = _getBoundPosition2[1];

	        newState.x = newStateX;
	        newState.y = newStateY;

	        // Recalculate slack by noting how much was shaved by the boundPosition handler.
	        newState.slackX = _this.state.slackX + (_x - newState.x);
	        newState.slackY = _this.state.slackY + (_y - newState.y);

	        // Update the event we fire to reflect what really happened after bounds took effect.
	        uiData.x = newState.x;
	        uiData.y = newState.y;
	        uiData.deltaX = newState.x - _this.state.x;
	        uiData.deltaY = newState.y - _this.state.y;
	      }

	      // Short-circuit if user's callback killed it.
	      var shouldUpdate = _this.props.onDrag(e, uiData);
	      if (shouldUpdate === false) return false;

	      _this.setState(newState);
	    };

	    _this.onDragStop = function (e, coreData) {
	      if (!_this.state.dragging) return false;

	      // Short-circuit if user's callback killed it.
	      var shouldStop = _this.props.onStop(e, createDraggableData(_this, coreData));
	      if (shouldStop === false) return false;

	      var newState /*: $Shape<DraggableState>*/ = {
	        dragging: false,
	        slackX: 0,
	        slackY: 0
	      };

	      // If this is a controlled component, the result of this operation will be to
	      // revert back to the old position. We expect a handler on `onDragStop`, at the least.
	      var controlled = Boolean(_this.props.position);
	      if (controlled) {
	        var _this$props$position = _this.props.position,
	            _x2 = _this$props$position.x,
	            _y2 = _this$props$position.y;

	        newState.x = _x2;
	        newState.y = _y2;
	      }

	      _this.setState(newState);
	    };

	    _this.state = {
	      // Whether or not we are currently dragging.
	      dragging: false,

	      // Whether or not we have been dragged before.
	      dragged: false,

	      // Current transform x and y.
	      x: props.position ? props.position.x : props.defaultPosition.x,
	      y: props.position ? props.position.y : props.defaultPosition.y,

	      // Used for compensating for out-of-bounds drags
	      slackX: 0, slackY: 0,

	      // Can only determine if SVG after mounting
	      isElementSVG: false
	    };

	    if (props.position && !(props.onDrag || props.onStop)) {
	      // eslint-disable-next-line no-console
	      console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
	    }
	    return _this;
	  }

	  createClass(Draggable, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Check to see if the element passed is an instanceof SVGElement
	      if (typeof window.SVGElement !== 'undefined' && ReactDOM.findDOMNode(this) instanceof window.SVGElement) {
	        this.setState({ isElementSVG: true });
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps /*: Object*/) {
	      // Set x/y if position has changed
	      if (nextProps.position && (!this.props.position || nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y)) {
	        this.setState({ x: nextProps.position.x, y: nextProps.position.y });
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.setState({ dragging: false }); // prevents invariant if unmounted while dragging
	    }
	  }, {
	    key: 'render',
	    value: function render() /*: ReactElement<any>*/ {
	      var _classNames;

	      var style = {},
	          svgTransform = null;

	      // If this is controlled, we don't want to move it - unless it's dragging.
	      var controlled = Boolean(this.props.position);
	      var draggable = !controlled || this.state.dragging;

	      var position = this.props.position || this.props.defaultPosition;
	      var transformOpts = {
	        // Set left if horizontal drag is enabled
	        x: canDragX(this) && draggable ? this.state.x : position.x,

	        // Set top if vertical drag is enabled
	        y: canDragY(this) && draggable ? this.state.y : position.y
	      };

	      // If this element was SVG, we use the `transform` attribute.
	      if (this.state.isElementSVG) {
	        svgTransform = createSVGTransform(transformOpts, this.props.positionOffset);
	      } else {
	        // Add a CSS transform to move the element around. This allows us to move the element around
	        // without worrying about whether or not it is relatively or absolutely positioned.
	        // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	        // has a clean slate.
	        style = createCSSTransform(transformOpts, this.props.positionOffset);
	      }

	      var _props = this.props,
	          defaultClassName = _props.defaultClassName,
	          defaultClassNameDragging = _props.defaultClassNameDragging,
	          defaultClassNameDragged = _props.defaultClassNameDragged;


	      var children = React.Children.only(this.props.children);

	      // Mark with class while dragging
	      var className = classnames(children.props.className || '', defaultClassName, (_classNames = {}, defineProperty(_classNames, defaultClassNameDragging, this.state.dragging), defineProperty(_classNames, defaultClassNameDragged, this.state.dragged), _classNames));

	      // Reuse the child provided
	      // This makes it flexible to use whatever element is wanted (div, ul, etc)
	      return React.createElement(
	        DraggableCore,
	        _extends({}, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }),
	        React.cloneElement(children, {
	          className: className,
	          style: _extends({}, children.props.style, style),
	          transform: svgTransform
	        })
	      );
	    }
	  }]);
	  return Draggable;
	}(React.Component);

	Draggable.displayName = 'Draggable';
	Draggable.propTypes = _extends({}, DraggableCore.propTypes, {

	  /**
	   * `axis` determines which axis the draggable can move.
	   *
	   *  Note that all callbacks will still return data as normal. This only
	   *  controls flushing to the DOM.
	   *
	   * 'both' allows movement horizontally and vertically.
	   * 'x' limits movement to horizontal axis.
	   * 'y' limits movement to vertical axis.
	   * 'none' limits all movement.
	   *
	   * Defaults to 'both'.
	   */
	  axis: propTypes.oneOf(['both', 'x', 'y', 'none']),

	  /**
	   * `bounds` determines the range of movement available to the element.
	   * Available values are:
	   *
	   * 'parent' restricts movement within the Draggable's parent node.
	   *
	   * Alternatively, pass an object with the following properties, all of which are optional:
	   *
	   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
	   *
	   * All values are in px.
	   *
	   * Example:
	   *
	   * ```jsx
	   *   let App = React.createClass({
	   *       render: function () {
	   *         return (
	   *            <Draggable bounds={{right: 300, bottom: 300}}>
	   *              <div>Content</div>
	   *           </Draggable>
	   *         );
	   *       }
	   *   });
	   * ```
	   */
	  bounds: propTypes.oneOfType([propTypes.shape({
	    left: propTypes.number,
	    right: propTypes.number,
	    top: propTypes.number,
	    bottom: propTypes.number
	  }), propTypes.string, propTypes.oneOf([false])]),

	  defaultClassName: propTypes.string,
	  defaultClassNameDragging: propTypes.string,
	  defaultClassNameDragged: propTypes.string,

	  /**
	   * `defaultPosition` specifies the x and y that the dragged item should start at
	   *
	   * Example:
	   *
	   * ```jsx
	   *      let App = React.createClass({
	   *          render: function () {
	   *              return (
	   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
	   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	   *                  </Draggable>
	   *              );
	   *          }
	   *      });
	   * ```
	   */
	  defaultPosition: propTypes.shape({
	    x: propTypes.number,
	    y: propTypes.number
	  }),
	  positionOffset: propTypes.shape({
	    x: propTypes.oneOfType([propTypes.number, propTypes.string]),
	    y: propTypes.oneOfType([propTypes.number, propTypes.string])
	  }),

	  /**
	   * `position`, if present, defines the current position of the element.
	   *
	   *  This is similar to how form elements in React work - if no `position` is supplied, the component
	   *  is uncontrolled.
	   *
	   * Example:
	   *
	   * ```jsx
	   *      let App = React.createClass({
	   *          render: function () {
	   *              return (
	   *                  <Draggable position={{x: 25, y: 25}}>
	   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	   *                  </Draggable>
	   *              );
	   *          }
	   *      });
	   * ```
	   */
	  position: propTypes.shape({
	    x: propTypes.number,
	    y: propTypes.number
	  }),

	  /**
	   * These properties should be defined on the child, not here.
	   */
	  className: dontSetMe,
	  style: dontSetMe,
	  transform: dontSetMe
	});
	Draggable.defaultProps = _extends({}, DraggableCore.defaultProps, {
	  axis: 'both',
	  bounds: false,
	  defaultClassName: 'react-draggable',
	  defaultClassNameDragging: 'react-draggable-dragging',
	  defaultClassNameDragged: 'react-draggable-dragged',
	  defaultPosition: { x: 0, y: 0 },
	  position: null,
	  scale: 1
	});

	// Previous versions of this lib exported <Draggable> as the root export. As to not break
	// them, or TypeScript, we export *both* as the root and as 'default'.
	// See https://github.com/mzabriskie/react-draggable/pull/254
	// and https://github.com/mzabriskie/react-draggable/issues/266
	Draggable.default = Draggable;
	Draggable.DraggableCore = DraggableCore;

	return Draggable;

})));
//# sourceMappingURL=react-draggable.js.map


/***/ }),

/***/ "./public/app/core/components/CopyToClipboard/CopyToClipboard.tsx":
/*!************************************************************************!*\
  !*** ./public/app/core/components/CopyToClipboard/CopyToClipboard.tsx ***!
  \************************************************************************/
/*! exports provided: CopyToClipboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CopyToClipboard", function() { return CopyToClipboard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_2__);



var CopyToClipboard = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(CopyToClipboard, _super);
    function CopyToClipboard(props) {
        var _this = _super.call(this, props) || this;
        _this.getElementType = function () {
            return _this.props.elType || 'button';
        };
        _this.myRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
        return _this;
    }
    CopyToClipboard.prototype.componentDidMount = function () {
        var _a = this.props, text = _a.text, onSuccess = _a.onSuccess, onError = _a.onError;
        this.clipboardjs = new clipboard__WEBPACK_IMPORTED_MODULE_2___default.a(this.myRef.current, {
            text: text,
        });
        if (onSuccess) {
            this.clipboardjs.on('success', function (evt) {
                evt.clearSelection();
                onSuccess(evt);
            });
        }
        if (onError) {
            this.clipboardjs.on('error', function (evt) {
                console.error('Action:', evt.action);
                console.error('Trigger:', evt.trigger);
                onError(evt);
            });
        }
    };
    CopyToClipboard.prototype.componentWillUnmount = function () {
        if (this.clipboardjs) {
            this.clipboardjs.destroy();
        }
    };
    CopyToClipboard.prototype.render = function () {
        var _a = this.props, elType = _a.elType, text = _a.text, children = _a.children, onError = _a.onError, onSuccess = _a.onSuccess, restProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["elType", "text", "children", "onError", "onSuccess"]);
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(this.getElementType(), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ ref: this.myRef }, restProps), this.props.children);
    };
    return CopyToClipboard;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

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

/***/ "./public/app/core/components/PluginHelp/PluginHelp.tsx":
/*!**************************************************************!*\
  !*** ./public/app/core/components/PluginHelp/PluginHelp.tsx ***!
  \**************************************************************/
/*! exports provided: PluginHelp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PluginHelp", function() { return PluginHelp; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");




var PluginHelp = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PluginHelp, _super);
    function PluginHelp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isError: false,
            isLoading: false,
            help: '',
        };
        _this.loadHelp = function () {
            var _a = _this.props, plugin = _a.plugin, type = _a.type;
            _this.setState({ isLoading: true });
            Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])()
                .get("/api/plugins/" + plugin.id + "/markdown/" + type)
                .then(function (response) {
                var helpHtml = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["renderMarkdown"])(response);
                if (response === '' && type === 'help') {
                    _this.setState({
                        isError: false,
                        isLoading: false,
                        help: _this.constructPlaceholderInfo(),
                    });
                }
                else {
                    _this.setState({
                        isError: false,
                        isLoading: false,
                        help: helpHtml,
                    });
                }
            })
                .catch(function () {
                _this.setState({
                    isError: true,
                    isLoading: false,
                });
            });
        };
        return _this;
    }
    PluginHelp.prototype.componentDidMount = function () {
        this.loadHelp();
    };
    PluginHelp.prototype.constructPlaceholderInfo = function () {
        return 'No plugin help or readme markdown file was found';
    };
    PluginHelp.prototype.render = function () {
        var type = this.props.type;
        var _a = this.state, isError = _a.isError, isLoading = _a.isLoading, help = _a.help;
        if (isLoading) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Loading help...");
        }
        if (isError) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, "'Error occurred when loading help'");
        }
        if (type === 'panel_help' && help === '') {
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "markdown-html", dangerouslySetInnerHTML: { __html: help } });
    };
    return PluginHelp;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/alerting/AlertTab.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/alerting/AlertTab.tsx ***!
  \***************************************************/
/*! exports provided: mapStateToProps, AlertTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertTab", function() { return AlertTab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var _getAlertingValidationMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getAlertingValidationMessage */ "./public/app/features/alerting/getAlertingValidationMessage.ts");
/* harmony import */ var _dashboard_panel_editor_EditorTabBody__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dashboard/panel_editor/EditorTabBody */ "./public/app/features/dashboard/panel_editor/EditorTabBody.tsx");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
/* harmony import */ var _StateHistory__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./StateHistory */ "./public/app/features/alerting/StateHistory.tsx");
/* harmony import */ var app_features_alerting_AlertTabCtrl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/features/alerting/AlertTabCtrl */ "./public/app/features/alerting/AlertTabCtrl.ts");
/* harmony import */ var _TestRuleResult__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./TestRuleResult */ "./public/app/features/alerting/TestRuleResult.tsx");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _dashboard_panel_editor_state_reducers__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../dashboard/panel_editor/state/reducers */ "./public/app/features/dashboard/panel_editor/state/reducers.ts");
/* harmony import */ var _dashboard_panel_editor_state_actions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../dashboard/panel_editor/state/actions */ "./public/app/features/dashboard/panel_editor/state/actions.ts");


















var UnConnectedAlertTab = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(UnConnectedAlertTab, _super);
    function UnConnectedAlertTab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            validatonMessage: '',
        };
        _this.stateHistory = function () {
            return {
                title: 'State history',
                render: function () {
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_StateHistory__WEBPACK_IMPORTED_MODULE_11__["default"], { dashboard: _this.props.dashboard, panelId: _this.props.panel.id, onRefresh: _this.panelCtrl.refresh }));
                },
            };
        };
        _this.deleteAlert = function () {
            var panel = _this.props.panel;
            return {
                title: 'Delete',
                btnType: 'danger',
                onClick: function () {
                    app_core_app_events__WEBPACK_IMPORTED_MODULE_7__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_14__["CoreEvents"].showConfirmModal, {
                        title: 'Delete Alert',
                        text: 'Are you sure you want to delete this alert rule?',
                        text2: 'You need to save dashboard for the delete to take effect',
                        icon: 'fa-trash',
                        yesText: 'Delete',
                        onConfirm: function () {
                            delete panel.alert;
                            panel.thresholds = [];
                            _this.panelCtrl.alertState = null;
                            _this.panelCtrl.render();
                            _this.forceUpdate();
                        },
                    });
                },
            };
        };
        _this.renderTestRuleResult = function () {
            var _a = _this.props, panel = _a.panel, dashboard = _a.dashboard;
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TestRuleResult__WEBPACK_IMPORTED_MODULE_13__["TestRuleResult"], { panelId: panel.id, dashboard: dashboard });
        };
        _this.testRule = function () { return ({
            title: 'Test Rule',
            render: function () { return _this.renderTestRuleResult(); },
        }); };
        _this.onAddAlert = function () {
            _this.panelCtrl._enableAlert();
            _this.component.digest();
            _this.forceUpdate();
        };
        _this.switchToQueryTab = function () {
            var changePanelEditorTab = _this.props.changePanelEditorTab;
            changePanelEditorTab(Object(_dashboard_panel_editor_state_reducers__WEBPACK_IMPORTED_MODULE_15__["getPanelEditorTab"])(_dashboard_panel_editor_state_reducers__WEBPACK_IMPORTED_MODULE_15__["PanelEditorTabIds"].Queries));
        };
        _this.renderValidationMessage = function () {
            var validatonMessage = _this.state.validatonMessage;
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n          width: 508px;\n          margin: 128px auto;\n        "], ["\n          width: 508px;\n          margin: 128px auto;\n        "]))) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, validatonMessage),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-group" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["Button"], { size: 'md', variant: 'secondary', icon: "fa fa-arrow-left", onClick: _this.switchToQueryTab }, "Go back to Queries"))));
        };
        return _this;
    }
    UnConnectedAlertTab.prototype.componentDidMount = function () {
        if (this.shouldLoadAlertTab()) {
            this.loadAlertTab();
        }
    };
    UnConnectedAlertTab.prototype.componentDidUpdate = function (prevProps) {
        if (this.shouldLoadAlertTab()) {
            this.loadAlertTab();
        }
    };
    UnConnectedAlertTab.prototype.shouldLoadAlertTab = function () {
        return this.props.angularPanel && this.element && !this.component;
    };
    UnConnectedAlertTab.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    UnConnectedAlertTab.prototype.loadAlertTab = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, angularPanel, panel, scope, loader, template, scopeProps, validatonMessage;
            var _this = this;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, angularPanel = _a.angularPanel, panel = _a.panel;
                        scope = angularPanel.getScope();
                        // When full page reloading in edit mode the angular panel has on fully compiled & instantiated yet
                        if (!scope.$$childHead) {
                            setTimeout(function () {
                                _this.forceUpdate();
                            });
                            return [2 /*return*/];
                        }
                        this.panelCtrl = scope.$$childHead.ctrl;
                        loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getAngularLoader"])();
                        template = '<alert-tab />';
                        scopeProps = { ctrl: this.panelCtrl };
                        this.component = loader.load(this.element, scopeProps, template);
                        return [4 /*yield*/, Object(_getAlertingValidationMessage__WEBPACK_IMPORTED_MODULE_8__["getAlertingValidationMessage"])(panel.transformations, panel.targets, Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getDataSourceSrv"])(), panel.datasource)];
                    case 1:
                        validatonMessage = _b.sent();
                        if (validatonMessage) {
                            this.setState({ validatonMessage: validatonMessage });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UnConnectedAlertTab.prototype.render = function () {
        var _this = this;
        var _a = this.props.panel, alert = _a.alert, transformations = _a.transformations;
        var validatonMessage = this.state.validatonMessage;
        var hasTransformations = transformations && transformations.length > 0;
        if (!alert && validatonMessage) {
            return this.renderValidationMessage();
        }
        var toolbarItems = alert ? [this.stateHistory(), this.testRule(), this.deleteAlert()] : [];
        var model = {
            title: 'Panel has no alert rule defined',
            buttonIcon: 'gicon gicon-alert',
            onClick: this.onAddAlert,
            buttonTitle: 'Create Alert',
        };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_dashboard_panel_editor_EditorTabBody__WEBPACK_IMPORTED_MODULE_9__["EditorTabBody"], { heading: "Alert", toolbarItems: toolbarItems },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                alert && hasTransformations && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["Alert"], { severity: app_types__WEBPACK_IMPORTED_MODULE_14__["AppNotificationSeverity"].Error, title: "Transformations are not supported in alert queries" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: function (element) { return (_this.element = element); } }),
                !alert && !validatonMessage && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_10__["default"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, model)))));
    };
    return UnConnectedAlertTab;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = { changePanelEditorTab: _dashboard_panel_editor_state_actions__WEBPACK_IMPORTED_MODULE_16__["changePanelEditorTab"] };
var AlertTab = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(UnConnectedAlertTab));
var templateObject_1;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/alerting/StateHistory.tsx":
/*!*******************************************************!*\
  !*** ./public/app/features/alerting/StateHistory.tsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _state_alertDef__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state/alertDef */ "./public/app/features/alerting/state/alertDef.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _core_app_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");






var StateHistory = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(StateHistory, _super);
    function StateHistory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            stateHistoryItems: [],
        };
        _this.clearHistory = function () {
            var _a = _this.props, dashboard = _a.dashboard, onRefresh = _a.onRefresh, panelId = _a.panelId;
            _core_app_events__WEBPACK_IMPORTED_MODULE_4__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].showConfirmModal, {
                title: 'Delete Alert History',
                text: 'Are you sure you want to remove all history & annotations for this alert?',
                icon: 'fa-trash',
                yesText: 'Yes',
                onConfirm: function () {
                    Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])()
                        .post('/api/annotations/mass-delete', {
                        dashboardId: dashboard.id,
                        panelId: panelId,
                    })
                        .then(function () {
                        _this.setState({
                            stateHistoryItems: [],
                        });
                        onRefresh();
                    });
                },
            });
        };
        return _this;
    }
    StateHistory.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, dashboard = _a.dashboard, panelId = _a.panelId;
        Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getBackendSrv"])()
            .get("/api/annotations?dashboardId=" + dashboard.id + "&panelId=" + panelId + "&limit=50&type=alert")
            .then(function (res) {
            var items = res.map(function (item) {
                return {
                    stateModel: _state_alertDef__WEBPACK_IMPORTED_MODULE_2__["default"].getStateDisplayModel(item.newState),
                    time: dashboard.formatDate(item.time, 'MMM D, YYYY HH:mm:ss'),
                    info: _state_alertDef__WEBPACK_IMPORTED_MODULE_2__["default"].getAlertAnnotationInfo(item),
                };
            });
            _this.setState({
                stateHistoryItems: items,
            });
        });
    };
    StateHistory.prototype.render = function () {
        var stateHistoryItems = this.state.stateHistoryItems;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            stateHistoryItems.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "p-b-1" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "muted" }, "Last 50 state changes"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-small btn-danger pull-right", onClick: this.clearHistory },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-trash" }),
                    " ", " Clear history"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ol", { className: "alert-rule-list" }, stateHistoryItems.length > 0 ? (stateHistoryItems.map(function (item, index) {
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { className: "alert-rule-item", key: item.time + "-" + index },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__icon " + item.stateModel.stateClass },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: item.stateModel.iconClass })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__body" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__header" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", { className: "alert-rule-item__name" }, item.alertName),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__text" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "" + item.stateModel.stateClass }, item.stateModel.text))),
                        item.info),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "alert-rule-item__time" }, item.time)));
            })) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", null, "No state changes recorded")))));
    };
    return StateHistory;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (StateHistory);


/***/ }),

/***/ "./public/app/features/alerting/TestRuleResult.tsx":
/*!*********************************************************!*\
  !*** ./public/app/features/alerting/TestRuleResult.tsx ***!
  \*********************************************************/
/*! exports provided: TestRuleResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestRuleResult", function() { return TestRuleResult; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_components_CopyToClipboard_CopyToClipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/CopyToClipboard/CopyToClipboard */ "./public/app/core/components/CopyToClipboard/CopyToClipboard.tsx");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");







var TestRuleResult = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(TestRuleResult, _super);
    function TestRuleResult(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isLoading: false,
            allNodesExpanded: null,
            testRuleResponse: {},
        };
        _this.backendSrv = null;
        _this.setFormattedJson = function (formattedJson) {
            _this.formattedJson = formattedJson;
        };
        _this.getTextForClipboard = function () {
            return JSON.stringify(_this.formattedJson, null, 2);
        };
        _this.onClipboardSuccess = function () {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_3__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["AppEvents"].alertSuccess, ['Content copied to clipboard']);
        };
        _this.onToggleExpand = function () {
            _this.setState(function (prevState) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prevState), { allNodesExpanded: !_this.state.allNodesExpanded })); });
        };
        _this.getNrOfOpenNodes = function () {
            if (_this.state.allNodesExpanded === null) {
                return 3; // 3 is default, ie when state is null
            }
            else if (_this.state.allNodesExpanded) {
                return 20;
            }
            return 1;
        };
        _this.renderExpandCollapse = function () {
            var allNodesExpanded = _this.state.allNodesExpanded;
            var collapse = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-minus-square-o" }),
                " Collapse All"));
            var expand = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-plus-square-o" }),
                " Expand All"));
            return allNodesExpanded ? collapse : expand;
        };
        _this.backendSrv = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_5__["getBackendSrv"])();
        return _this;
    }
    TestRuleResult.prototype.componentDidMount = function () {
        this.testRule();
    };
    TestRuleResult.prototype.testRule = function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var _a, panelId, dashboard, payload, testRuleResponse;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, panelId = _a.panelId, dashboard = _a.dashboard;
                        payload = { dashboard: dashboard.getSaveModelClone(), panelId: panelId };
                        this.setState({ isLoading: true });
                        return [4 /*yield*/, this.backendSrv.post("/api/alerts/test", payload)];
                    case 1:
                        testRuleResponse = _b.sent();
                        this.setState({ isLoading: false, testRuleResponse: testRuleResponse });
                        return [2 /*return*/];
                }
            });
        });
    };
    TestRuleResult.prototype.render = function () {
        var _a = this.state, testRuleResponse = _a.testRuleResponse, isLoading = _a.isLoading;
        if (isLoading === true) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["LoadingPlaceholder"], { text: "Evaluating rule" });
        }
        var openNodes = this.getNrOfOpenNodes();
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "pull-right" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-transparent btn-p-x-0 m-r-1", onClick: this.onToggleExpand }, this.renderExpandCollapse()),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_CopyToClipboard_CopyToClipboard__WEBPACK_IMPORTED_MODULE_4__["CopyToClipboard"], { className: "btn btn-transparent btn-p-x-0", text: this.getTextForClipboard, onSuccess: this.onClipboardSuccess },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-clipboard" }),
                    " Copy to Clipboard")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["JSONFormatter"], { json: testRuleResponse, open: openNodes, onDidRender: this.setFormattedJson })));
    };
    return TestRuleResult;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/components/AddPanelWidget/AddPanelWidget.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/features/dashboard/components/AddPanelWidget/AddPanelWidget.tsx ***!
  \************************************************************************************/
/*! exports provided: AddPanelWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddPanelWidget", function() { return AddPanelWidget; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_e2e__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/e2e */ "./packages/grafana-e2e/src/index.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var app_store_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/store/store */ "./public/app/store/store.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_core_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/constants */ "./public/app/core/constants.ts");

// Libraries



// Utils


// Store



var AddPanelWidget = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(AddPanelWidget, _super);
    function AddPanelWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.onCreateNewPanel = function (tab) {
            if (tab === void 0) { tab = 'queries'; }
            var dashboard = _this.props.dashboard;
            var gridPos = _this.props.panel.gridPos;
            var newPanel = {
                type: 'graph',
                title: 'Panel Title',
                gridPos: { x: gridPos.x, y: gridPos.y, w: gridPos.w, h: gridPos.h },
            };
            dashboard.addPanel(newPanel);
            dashboard.removePanel(_this.props.panel);
            var location = {
                query: {
                    panelId: newPanel.id,
                    edit: true,
                    fullscreen: true,
                },
                partial: true,
            };
            if (tab === 'visualization') {
                location.query.tab = 'visualization';
                location.query.openVizPicker = true;
            }
            app_store_store__WEBPACK_IMPORTED_MODULE_6__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_7__["updateLocation"])(location));
        };
        _this.onPasteCopiedPanel = function (panelPluginInfo) {
            var dashboard = _this.props.dashboard;
            var gridPos = _this.props.panel.gridPos;
            var newPanel = {
                type: panelPluginInfo.id,
                title: 'Panel Title',
                gridPos: {
                    x: gridPos.x,
                    y: gridPos.y,
                    w: panelPluginInfo.defaults.gridPos.w,
                    h: panelPluginInfo.defaults.gridPos.h,
                },
            };
            // apply panel template / defaults
            if (panelPluginInfo.defaults) {
                lodash__WEBPACK_IMPORTED_MODULE_2___default.a.defaults(newPanel, panelPluginInfo.defaults);
                newPanel.title = panelPluginInfo.defaults.title;
                app_core_store__WEBPACK_IMPORTED_MODULE_5__["default"].delete(app_core_constants__WEBPACK_IMPORTED_MODULE_8__["LS_PANEL_COPY_KEY"]);
            }
            dashboard.addPanel(newPanel);
            dashboard.removePanel(_this.props.panel);
        };
        _this.onCreateNewRow = function () {
            var dashboard = _this.props.dashboard;
            var newRow = {
                type: 'row',
                title: 'Row title',
                gridPos: { x: 0, y: 0 },
            };
            dashboard.addPanel(newRow);
            dashboard.removePanel(_this.props.panel);
        };
        _this.renderOptionLink = function (icon, text, onClick) {
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "#", onClick: onClick, className: "add-panel-widget__link btn btn-inverse", "aria-label": _grafana_e2e__WEBPACK_IMPORTED_MODULE_3__["e2e"].pages.AddDashboard.selectors.ctaButtons(text) },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-panel-widget__icon" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "gicon gicon-" + icon })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, text))));
        };
        _this.handleCloseAddPanel = _this.handleCloseAddPanel.bind(_this);
        _this.state = {
            copiedPanelPlugins: _this.getCopiedPanelPlugins(),
        };
        return _this;
    }
    AddPanelWidget.prototype.getCopiedPanelPlugins = function () {
        var panels = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.chain(app_core_config__WEBPACK_IMPORTED_MODULE_4__["default"].panels)
            .filter({ hideFromList: false })
            .map(function (item) { return item; })
            .value();
        var copiedPanels = [];
        var copiedPanelJson = app_core_store__WEBPACK_IMPORTED_MODULE_5__["default"].get(app_core_constants__WEBPACK_IMPORTED_MODULE_8__["LS_PANEL_COPY_KEY"]);
        if (copiedPanelJson) {
            var copiedPanel = JSON.parse(copiedPanelJson);
            var pluginInfo = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.find(panels, { id: copiedPanel.type });
            if (pluginInfo) {
                var pluginCopy = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.cloneDeep(pluginInfo);
                pluginCopy.name = copiedPanel.title;
                pluginCopy.sort = -1;
                pluginCopy.defaults = copiedPanel;
                copiedPanels.push(pluginCopy);
            }
        }
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.sortBy(copiedPanels, 'sort');
    };
    AddPanelWidget.prototype.handleCloseAddPanel = function (evt) {
        evt.preventDefault();
        this.props.dashboard.removePanel(this.props.panel);
    };
    AddPanelWidget.prototype.render = function () {
        var _this = this;
        var copiedPanelPlugins = this.state.copiedPanelPlugins;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-container add-panel-widget-container" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-panel-widget" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-panel-widget__header grid-drag-handle" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "gicon gicon-add-panel" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "add-panel-widget__title" }, "New Panel"),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "add-panel-widget__close", onClick: this.handleCloseAddPanel },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-close" }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-panel-widget__btn-container" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-panel-widget__create" },
                        this.renderOptionLink('queries', 'Add Query', this.onCreateNewPanel),
                        this.renderOptionLink('visualization', 'Choose Visualization', function () {
                            return _this.onCreateNewPanel('visualization');
                        })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-panel-widget__actions" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-inverse add-panel-widget__action", onClick: this.onCreateNewRow }, "Convert to row"),
                        copiedPanelPlugins.length === 1 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-inverse add-panel-widget__action", onClick: function () { return _this.onPasteCopiedPanel(copiedPanelPlugins[0]); } }, "Paste copied panel")))))));
    };
    return AddPanelWidget;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));



/***/ }),

/***/ "./public/app/features/dashboard/components/AddPanelWidget/index.ts":
/*!**************************************************************************!*\
  !*** ./public/app/features/dashboard/components/AddPanelWidget/index.ts ***!
  \**************************************************************************/
/*! exports provided: AddPanelWidget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AddPanelWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddPanelWidget */ "./public/app/features/dashboard/components/AddPanelWidget/AddPanelWidget.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AddPanelWidget", function() { return _AddPanelWidget__WEBPACK_IMPORTED_MODULE_0__["AddPanelWidget"]; });




/***/ }),

/***/ "./public/app/features/dashboard/components/DashboardRow/DashboardRow.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/dashboard/components/DashboardRow/DashboardRow.tsx ***!
  \********************************************************************************/
/*! exports provided: DashboardRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRow", function() { return DashboardRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");






var DashboardRow = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DashboardRow, _super);
    function DashboardRow(props) {
        var _this = _super.call(this, props) || this;
        _this.onVariableUpdated = function () {
            _this.forceUpdate();
        };
        _this.onToggle = function () {
            _this.props.dashboard.toggleRow(_this.props.panel);
            _this.setState(function (prevState) {
                return { collapsed: !prevState.collapsed };
            });
        };
        _this.onUpdate = function () {
            _this.props.dashboard.processRepeats();
            _this.forceUpdate();
        };
        _this.onOpenSettings = function () {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_4__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].showModal, {
                templateHtml: "<row-options row=\"model.row\" on-updated=\"model.onUpdated()\" dismiss=\"dismiss()\"></row-options>",
                modalClass: 'modal--narrow',
                model: {
                    row: _this.props.panel,
                    onUpdated: _this.onUpdate,
                },
            });
        };
        _this.onDelete = function () {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_4__["default"].emit(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].showConfirmModal, {
                title: 'Delete Row',
                text: 'Are you sure you want to remove this row and all its panels?',
                altActionText: 'Delete row only',
                icon: 'fa-trash',
                onConfirm: function () {
                    _this.props.dashboard.removeRow(_this.props.panel, true);
                },
                onAltAction: function () {
                    _this.props.dashboard.removeRow(_this.props.panel, false);
                },
            });
        };
        _this.state = {
            collapsed: _this.props.panel.collapsed,
        };
        _this.props.dashboard.on(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].templateVariableValueUpdated, _this.onVariableUpdated);
        return _this;
    }
    DashboardRow.prototype.componentWillUnmount = function () {
        this.props.dashboard.off(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].templateVariableValueUpdated, this.onVariableUpdated);
    };
    DashboardRow.prototype.render = function () {
        var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'dashboard-row': true,
            'dashboard-row--collapsed': this.state.collapsed,
        });
        var chevronClass = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            fa: true,
            'fa-chevron-down': !this.state.collapsed,
            'fa-chevron-right': this.state.collapsed,
        });
        var title = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_3__["default"].replaceWithText(this.props.panel.title, this.props.panel.scopedVars);
        var count = this.props.panel.panels ? this.props.panel.panels.length : 0;
        var panels = count === 1 ? 'panel' : 'panels';
        var canEdit = this.props.dashboard.meta.canEdit === true;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: classes },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "dashboard-row__title pointer", onClick: this.onToggle },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: chevronClass }),
                title,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "dashboard-row__panel_count" },
                    "(",
                    count,
                    " ",
                    panels,
                    ")")),
            canEdit && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "dashboard-row__actions" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "pointer", onClick: this.onOpenSettings },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "gicon gicon-cog" })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "pointer", onClick: this.onDelete },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-trash" })))),
            this.state.collapsed === true && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "dashboard-row__toggle-target", onClick: this.onToggle }, "\u00A0")),
            canEdit && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "dashboard-row__drag grid-drag-handle" })));
    };
    return DashboardRow;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component));



/***/ }),

/***/ "./public/app/features/dashboard/components/DashboardRow/index.ts":
/*!************************************************************************!*\
  !*** ./public/app/features/dashboard/components/DashboardRow/index.ts ***!
  \************************************************************************/
/*! exports provided: DashboardRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DashboardRow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardRow */ "./public/app/features/dashboard/components/DashboardRow/DashboardRow.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DashboardRow", function() { return _DashboardRow__WEBPACK_IMPORTED_MODULE_0__["DashboardRow"]; });




/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/DashboardPanel.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/DashboardPanel.tsx ***!
  \*******************************************************************/
/*! exports provided: DashboardPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardPanel", function() { return DashboardPanel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-virtualized-auto-sizer */ "./node_modules/react-virtualized-auto-sizer/dist/index.esm.js");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/plugins/plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var _components_AddPanelWidget__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/AddPanelWidget */ "./public/app/features/dashboard/components/AddPanelWidget/index.ts");
/* harmony import */ var _components_DashboardRow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/DashboardRow */ "./public/app/features/dashboard/components/DashboardRow/index.ts");
/* harmony import */ var _PanelChrome__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./PanelChrome */ "./public/app/features/dashboard/dashgrid/PanelChrome.tsx");
/* harmony import */ var _panel_editor_PanelEditor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../panel_editor/PanelEditor */ "./public/app/features/dashboard/panel_editor/PanelEditor.tsx");
/* harmony import */ var _PanelResizer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PanelResizer */ "./public/app/features/dashboard/dashgrid/PanelResizer.tsx");

// Libraries



// Utils & Services


// Components





var DashboardPanel = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(DashboardPanel, _super);
    function DashboardPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.specialPanels = {};
        _this.onPluginTypeChange = function (plugin) {
            _this.loadPlugin(plugin.id);
        };
        _this.onMouseEnter = function () {
            _this.props.dashboard.setPanelFocus(_this.props.panel.id);
        };
        _this.onMouseLeave = function () {
            _this.props.dashboard.setPanelFocus(0);
        };
        _this.state = {
            plugin: null,
            angularPanel: null,
            isLazy: !props.isInView,
        };
        _this.specialPanels['row'] = _this.renderRow.bind(_this);
        _this.specialPanels['add-panel'] = _this.renderAddPanel.bind(_this);
        return _this;
    }
    DashboardPanel.prototype.isSpecial = function (pluginId) {
        return this.specialPanels[pluginId];
    };
    DashboardPanel.prototype.renderRow = function () {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_DashboardRow__WEBPACK_IMPORTED_MODULE_7__["DashboardRow"], { panel: this.props.panel, dashboard: this.props.dashboard });
    };
    DashboardPanel.prototype.renderAddPanel = function () {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_AddPanelWidget__WEBPACK_IMPORTED_MODULE_6__["AddPanelWidget"], { panel: this.props.panel, dashboard: this.props.dashboard });
    };
    DashboardPanel.prototype.loadPlugin = function (pluginId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
            var panel, plugin;
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isSpecial(pluginId)) {
                            return [2 /*return*/];
                        }
                        panel = this.props.panel;
                        if (!(!this.state.plugin || this.state.plugin.meta.id !== pluginId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Object(app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_5__["importPanelPlugin"])(pluginId)];
                    case 1:
                        plugin = _a.sent();
                        // unmount angular panel
                        this.cleanUpAngularPanel();
                        if (panel.type !== pluginId) {
                            panel.changePlugin(plugin);
                        }
                        else {
                            panel.pluginLoaded(plugin);
                        }
                        this.setState({ plugin: plugin, angularPanel: null });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DashboardPanel.prototype.componentDidMount = function () {
        this.loadPlugin(this.props.panel.type);
    };
    DashboardPanel.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.isLazy && this.props.isInView) {
            this.setState({ isLazy: false });
        }
        if (!this.element || this.state.angularPanel) {
            return;
        }
        var loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_4__["getAngularLoader"])();
        var template = '<plugin-component type="panel" class="panel-height-helper"></plugin-component>';
        var scopeProps = { panel: this.props.panel, dashboard: this.props.dashboard };
        var angularPanel = loader.load(this.element, scopeProps, template);
        this.setState({ angularPanel: angularPanel });
    };
    DashboardPanel.prototype.cleanUpAngularPanel = function () {
        if (this.state.angularPanel) {
            this.state.angularPanel.destroy();
            this.element = null;
        }
    };
    DashboardPanel.prototype.componentWillUnmount = function () {
        this.cleanUpAngularPanel();
    };
    DashboardPanel.prototype.renderPanel = function () {
        var _this = this;
        var _a = this.props, dashboard = _a.dashboard, panel = _a.panel, isFullscreen = _a.isFullscreen, isInView = _a.isInView;
        var plugin = this.state.plugin;
        if (plugin.angularPanelCtrl) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: function (element) { return (_this.element = element); }, className: "panel-height-helper" });
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_virtualized_auto_sizer__WEBPACK_IMPORTED_MODULE_3__["default"], null, function (_a) {
            var width = _a.width, height = _a.height;
            if (width === 0) {
                return null;
            }
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PanelChrome__WEBPACK_IMPORTED_MODULE_8__["PanelChrome"], { plugin: plugin, panel: panel, dashboard: dashboard, isFullscreen: isFullscreen, isInView: isInView, width: width, height: height }));
        }));
    };
    DashboardPanel.prototype.render = function () {
        var _this = this;
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard, isFullscreen = _a.isFullscreen, isEditing = _a.isEditing;
        var _b = this.state, plugin = _b.plugin, angularPanel = _b.angularPanel, isLazy = _b.isLazy;
        if (this.isSpecial(panel.type)) {
            return this.specialPanels[panel.type]();
        }
        // if we have not loaded plugin exports yet, wait
        if (!plugin) {
            return null;
        }
        // If we are lazy state don't render anything
        if (isLazy) {
            return null;
        }
        var editorContainerClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'panel-editor-container': isEditing,
            'panel-height-helper': !isEditing,
        });
        var panelWrapperClass = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'panel-wrapper': true,
            'panel-wrapper--edit': isEditing,
            'panel-wrapper--view': isFullscreen && !isEditing,
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: editorContainerClasses },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PanelResizer__WEBPACK_IMPORTED_MODULE_10__["PanelResizer"], { isEditing: isEditing, panel: panel, render: function (styles) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: panelWrapperClass, onMouseEnter: _this.onMouseEnter, onMouseLeave: _this.onMouseLeave, style: styles }, _this.renderPanel())); } }),
            panel.isEditing && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_panel_editor_PanelEditor__WEBPACK_IMPORTED_MODULE_9__["PanelEditor"], { panel: panel, plugin: plugin, dashboard: dashboard, angularPanel: angularPanel, onPluginTypeChange: this.onPluginTypeChange }))));
    };
    return DashboardPanel;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelChrome.tsx":
/*!****************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelChrome.tsx ***!
  \****************************************************************/
/*! exports provided: PanelChrome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelChrome", function() { return PanelChrome; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PanelHeader_PanelHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PanelHeader/PanelHeader */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeader.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _services_TimeSrv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/dashboard/utils/panel */ "./public/app/features/dashboard/utils/panel.ts");
/* harmony import */ var app_core_profiler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/profiler */ "./public/app/core/profiler.ts");
/* harmony import */ var _state_runRequest__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../state/runRequest */ "./public/app/features/dashboard/state/runRequest.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/constants */ "./public/app/core/constants.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

// Libraries


// Components


// Utils & Services








var DEFAULT_PLUGIN_ERROR = 'Error in plugin';
var PanelChrome = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PanelChrome, _super);
    function PanelChrome(props) {
        var _this = _super.call(this, props) || this;
        _this.timeSrv = Object(_services_TimeSrv__WEBPACK_IMPORTED_MODULE_5__["getTimeSrv"])();
        _this.onRefresh = function () {
            var _a = _this.props, panel = _a.panel, isInView = _a.isInView, width = _a.width;
            if (!isInView) {
                console.log('Refresh when panel is visible', panel.id);
                _this.setState({ refreshWhenInView: true });
                return;
            }
            var timeData = Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_6__["applyPanelTimeOverrides"])(panel, _this.timeSrv.timeRange());
            // Issue Query
            if (_this.wantsQueryExecution) {
                if (width < 0) {
                    console.log('Refresh skippted, no width yet... wait till we know');
                    return;
                }
                var queryRunner = panel.getQueryRunner();
                if (!_this.querySubscription) {
                    _this.querySubscription = queryRunner.getData().subscribe({
                        next: function (data) { return _this.onDataUpdate(data); },
                    });
                }
                queryRunner.run({
                    datasource: panel.datasource,
                    queries: panel.targets,
                    panelId: panel.id,
                    dashboardId: _this.props.dashboard.id,
                    timezone: _this.props.dashboard.getTimezone(),
                    timeRange: timeData.timeRange,
                    timeInfo: timeData.timeInfo,
                    widthPixels: width,
                    maxDataPoints: panel.maxDataPoints,
                    minInterval: panel.interval,
                    scopedVars: panel.scopedVars,
                    cacheTimeout: panel.cacheTimeout,
                    transformations: panel.transformations,
                });
            }
        };
        _this.onRender = function () {
            var stateUpdate = { renderCounter: _this.state.renderCounter + 1 };
            _this.setState(stateUpdate);
        };
        _this.onOptionsChange = function (options) {
            _this.props.panel.updateOptions(options);
        };
        _this.replaceVariables = function (value, extraVars, format) {
            var vars = _this.props.panel.scopedVars;
            if (extraVars) {
                vars = vars ? Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, vars), extraVars) : extraVars;
            }
            return app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_9__["default"].replace(value, vars, format);
        };
        _this.onPanelError = function (message) {
            if (_this.state.errorMessage !== message) {
                _this.setState({ errorMessage: message });
            }
        };
        _this.onChangeTimeRange = function (timeRange) {
            _this.timeSrv.setTime({
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_12__["toUtc"])(timeRange.from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_12__["toUtc"])(timeRange.to),
            });
        };
        _this.state = {
            isFirstLoad: true,
            renderCounter: 0,
            errorMessage: null,
            refreshWhenInView: false,
            data: {
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].NotStarted,
                series: [],
                timeRange: _grafana_data__WEBPACK_IMPORTED_MODULE_12__["DefaultTimeRange"],
            },
        };
        return _this;
    }
    PanelChrome.prototype.componentDidMount = function () {
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard;
        panel.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_12__["PanelEvents"].refresh, this.onRefresh);
        panel.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_12__["PanelEvents"].render, this.onRender);
        dashboard.panelInitialized(this.props.panel);
        // Move snapshot data into the query response
        if (this.hasPanelSnapshot) {
            this.setState({
                data: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, this.state.data), { state: _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].Done, series: Object(_state_runRequest__WEBPACK_IMPORTED_MODULE_8__["getProcessedDataFrames"])(panel.snapshotData) }),
                isFirstLoad: false,
            });
        }
        else if (!this.wantsQueryExecution) {
            this.setState({ isFirstLoad: false });
        }
    };
    PanelChrome.prototype.componentWillUnmount = function () {
        this.props.panel.events.off(_grafana_data__WEBPACK_IMPORTED_MODULE_12__["PanelEvents"].refresh, this.onRefresh);
        this.props.panel.events.off(_grafana_data__WEBPACK_IMPORTED_MODULE_12__["PanelEvents"].render, this.onRender);
        if (this.querySubscription) {
            this.querySubscription.unsubscribe();
            this.querySubscription = null;
        }
    };
    PanelChrome.prototype.componentDidUpdate = function (prevProps) {
        var isInView = this.props.isInView;
        // View state has changed
        if (isInView !== prevProps.isInView) {
            if (isInView) {
                // Check if we need a delayed refresh
                if (this.state.refreshWhenInView) {
                    this.onRefresh();
                }
            }
            else if (this.querySubscription) {
                this.querySubscription.unsubscribe();
                this.querySubscription = null;
            }
        }
    };
    // Updates the response with information from the stream
    // The next is outside a react synthetic event so setState is not batched
    // So in this context we can only do a single call to setState
    PanelChrome.prototype.onDataUpdate = function (data) {
        if (!this.props.isInView) {
            // Ignore events when not visible.
            // The call will be repeated when the panel comes into view
            return;
        }
        var isFirstLoad = this.state.isFirstLoad;
        var errorMessage = null;
        switch (data.state) {
            case _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].Loading:
                // Skip updating state data if it is already in loading state
                // This is to avoid rendering partial loading responses
                if (this.state.data.state === _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].Loading) {
                    return;
                }
                break;
            case _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].Error:
                var error = data.error;
                if (error) {
                    if (errorMessage !== error.message) {
                        errorMessage = error.message;
                    }
                }
                break;
            case _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].Done:
                // If we are doing a snapshot save data in panel model
                if (this.props.dashboard.snapshot) {
                    this.props.panel.snapshotData = data.series.map(function (frame) { return Object(_grafana_data__WEBPACK_IMPORTED_MODULE_12__["toDataFrameDTO"])(frame); });
                }
                if (isFirstLoad) {
                    isFirstLoad = false;
                }
                break;
        }
        this.setState({ isFirstLoad: isFirstLoad, errorMessage: errorMessage, data: data });
    };
    Object.defineProperty(PanelChrome.prototype, "hasPanelSnapshot", {
        get: function () {
            var panel = this.props.panel;
            return panel.snapshotData && panel.snapshotData.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelChrome.prototype, "wantsQueryExecution", {
        get: function () {
            return !(this.props.plugin.meta.skipDataQuery || this.hasPanelSnapshot);
        },
        enumerable: true,
        configurable: true
    });
    PanelChrome.prototype.renderPanel = function (width, height) {
        var _a = this.props, panel = _a.panel, plugin = _a.plugin;
        var _b = this.state, renderCounter = _b.renderCounter, data = _b.data, isFirstLoad = _b.isFirstLoad;
        var theme = app_core_config__WEBPACK_IMPORTED_MODULE_10__["default"].theme;
        // This is only done to increase a counter that is used by backend
        // image rendering (phantomjs/headless chrome) to know when to capture image
        var loading = data.state;
        if (loading === _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].Done) {
            app_core_profiler__WEBPACK_IMPORTED_MODULE_7__["profiler"].renderingCompleted();
        }
        // do not render component until we have first data
        if (isFirstLoad && (loading === _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].Loading || loading === _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].NotStarted)) {
            return this.renderLoadingState();
        }
        var PanelComponent = plugin.panel;
        var timeRange = data.timeRange || this.timeSrv.timeRange();
        var headerHeight = this.hasOverlayHeader() ? 0 : theme.panelHeaderHeight;
        var chromePadding = plugin.noPadding ? 0 : theme.panelPadding;
        var panelWidth = width - chromePadding * 2 - app_core_constants__WEBPACK_IMPORTED_MODULE_11__["PANEL_BORDER"];
        var innerPanelHeight = height - headerHeight - chromePadding * 2 - app_core_constants__WEBPACK_IMPORTED_MODULE_11__["PANEL_BORDER"];
        var panelContentClassNames = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'panel-content': true,
            'panel-content--no-padding': plugin.noPadding,
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            loading === _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].Loading && this.renderLoadingState(),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: panelContentClassNames },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(PanelComponent, { id: panel.id, data: data, timeRange: timeRange, timeZone: this.props.dashboard.getTimezone(), options: panel.getOptions(), transparent: panel.transparent, width: panelWidth, height: innerPanelHeight, renderCounter: renderCounter, replaceVariables: this.replaceVariables, onOptionsChange: this.onOptionsChange, onChangeTimeRange: this.onChangeTimeRange }))));
    };
    PanelChrome.prototype.renderLoadingState = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-loading" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-spinner fa-spin" })));
    };
    PanelChrome.prototype.hasOverlayHeader = function () {
        var panel = this.props.panel;
        var _a = this.state, errorMessage = _a.errorMessage, data = _a.data;
        // always show normal header if we have an error message
        if (errorMessage) {
            return false;
        }
        // always show normal header if we have time override
        if (data.request && data.request.timeInfo) {
            return false;
        }
        return !panel.hasTitle();
    };
    PanelChrome.prototype.render = function () {
        var _this = this;
        var _a = this.props, dashboard = _a.dashboard, panel = _a.panel, isFullscreen = _a.isFullscreen, width = _a.width, height = _a.height;
        var _b = this.state, errorMessage = _b.errorMessage, data = _b.data;
        var transparent = panel.transparent;
        var containerClassNames = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'panel-container': true,
            'panel-container--absolute': true,
            'panel-container--transparent': transparent,
            'panel-container--no-title': this.hasOverlayHeader(),
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: containerClassNames },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PanelHeader_PanelHeader__WEBPACK_IMPORTED_MODULE_3__["PanelHeader"], { panel: panel, dashboard: dashboard, timeInfo: data.request ? data.request.timeInfo : null, title: panel.title, description: panel.description, scopedVars: panel.scopedVars, links: panel.links, error: errorMessage, isFullscreen: isFullscreen }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["ErrorBoundary"], null, function (_a) {
                var error = _a.error, errorInfo = _a.errorInfo;
                if (errorInfo) {
                    _this.onPanelError(error.message || DEFAULT_PLUGIN_ERROR);
                    return null;
                }
                return _this.renderPanel(width, height);
            })));
    };
    return PanelChrome;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeader.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeader.tsx ***!
  \****************************************************************************/
/*! exports provided: PanelHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelHeader", function() { return PanelHeader; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_e2e__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/e2e */ "./packages/grafana-e2e/src/index.ts");
/* harmony import */ var _PanelHeaderCorner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PanelHeaderCorner */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderCorner.tsx");
/* harmony import */ var _PanelHeaderMenu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PanelHeaderMenu */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenu.tsx");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_features_panel_panellinks_linkSuppliers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/features/panel/panellinks/linkSuppliers */ "./public/app/features/panel/panellinks/linkSuppliers.ts");










var PanelHeader = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PanelHeader, _super);
    function PanelHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.clickCoordinates = { x: 0, y: 0 };
        _this.state = {
            panelMenuOpen: false,
            clickCoordinates: { x: 0, y: 0 },
        };
        _this.eventToClickCoordinates = function (event) {
            return {
                x: event.clientX,
                y: event.clientY,
            };
        };
        _this.onMouseDown = function (event) {
            _this.clickCoordinates = _this.eventToClickCoordinates(event);
        };
        _this.isClick = function (clickCoordinates) {
            return Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isEqual"])(clickCoordinates, _this.clickCoordinates);
        };
        _this.onMenuToggle = function (event) {
            if (_this.isClick(_this.eventToClickCoordinates(event))) {
                event.stopPropagation();
                _this.setState(function (prevState) { return ({
                    panelMenuOpen: !prevState.panelMenuOpen,
                }); });
            }
        };
        _this.closeMenu = function () {
            _this.setState({
                panelMenuOpen: false,
            });
        };
        return _this;
    }
    PanelHeader.prototype.render = function () {
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard, timeInfo = _a.timeInfo, scopedVars = _a.scopedVars, error = _a.error, isFullscreen = _a.isFullscreen;
        var title = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_8__["default"].replaceWithText(panel.title, scopedVars);
        var panelHeaderClass = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
            'panel-header': true,
            'grid-drag-handle': !isFullscreen,
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: panelHeaderClass },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PanelHeaderCorner__WEBPACK_IMPORTED_MODULE_6__["default"], { panel: panel, title: panel.title, description: panel.description, scopedVars: panel.scopedVars, links: Object(app_features_panel_panellinks_linkSuppliers__WEBPACK_IMPORTED_MODULE_9__["getPanelLinksSupplier"])(panel), error: error }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-title-container", onClick: this.onMenuToggle, onMouseDown: this.onMouseDown, "aria-label": _grafana_e2e__WEBPACK_IMPORTED_MODULE_5__["e2e"].pages.Dashboard.Panels.Panel.selectors.title(title) },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-title" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "icon-gf panel-alert-icon" }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "panel-title-text" },
                            title,
                            " ",
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "fa fa-caret-down panel-menu-toggle" })),
                        this.state.panelMenuOpen && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["ClickOutsideWrapper"], { onClick: this.closeMenu },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PanelHeaderMenu__WEBPACK_IMPORTED_MODULE_7__["PanelHeaderMenu"], { panel: panel, dashboard: dashboard }))),
                        timeInfo && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "panel-time-info" },
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-clock-o" }),
                            " ",
                            timeInfo)))))));
    };
    return PanelHeader;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderCorner.tsx":
/*!**********************************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderCorner.tsx ***!
  \**********************************************************************************/
/*! exports provided: PanelHeaderCorner, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelHeaderCorner", function() { return PanelHeaderCorner; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/templating/template_srv */ "./public/app/features/templating/template_srv.ts");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");







var InfoMode;
(function (InfoMode) {
    InfoMode["Error"] = "Error";
    InfoMode["Info"] = "Info";
    InfoMode["Links"] = "Links";
})(InfoMode || (InfoMode = {}));
var PanelHeaderCorner = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PanelHeaderCorner, _super);
    function PanelHeaderCorner() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeSrv = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_5__["getTimeSrv"])();
        _this.getInfoMode = function () {
            var _a = _this.props, panel = _a.panel, error = _a.error;
            if (error) {
                return InfoMode.Error;
            }
            if (!!panel.description) {
                return InfoMode.Info;
            }
            if (panel.links && panel.links.length) {
                return InfoMode.Links;
            }
            return undefined;
        };
        _this.getInfoContent = function () {
            var panel = _this.props.panel;
            var markdown = panel.description || '';
            var interpolatedMarkdown = app_features_templating_template_srv__WEBPACK_IMPORTED_MODULE_4__["default"].replace(markdown, panel.scopedVars);
            var markedInterpolatedMarkdown = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["renderMarkdown"])(interpolatedMarkdown);
            var links = _this.props.links && _this.props.links.getLinks(panel);
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-info-content markdown-html" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { dangerouslySetInnerHTML: { __html: markedInterpolatedMarkdown } }),
                links && links.length > 0 && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "panel-info-corner-links" }, links.map(function (link, idx) {
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", { key: idx },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "panel-info-corner-links__item", href: link.href, target: link.target }, link.title)));
                })))));
        };
        /**
         * Open the Panel Inspector when we click on an error
         */
        _this.onClickError = function () {
            Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["getLocationSrv"])().update({ partial: true, query: { inspect: _this.props.panel.id } });
        };
        return _this;
    }
    PanelHeaderCorner.prototype.renderCornerType = function (infoMode, content, onClick) {
        var theme = infoMode === InfoMode.Error ? 'error' : 'info';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], { content: content, placement: "top-start", theme: theme },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-info-corner panel-info-corner--" + infoMode.toLowerCase(), onClick: onClick },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "panel-info-corner-inner" }))));
    };
    PanelHeaderCorner.prototype.render = function () {
        var infoMode = this.getInfoMode();
        if (!infoMode) {
            return null;
        }
        if (infoMode === InfoMode.Error) {
            return this.renderCornerType(infoMode, this.props.error, this.onClickError);
        }
        if (infoMode === InfoMode.Info || infoMode === InfoMode.Links) {
            return this.renderCornerType(infoMode, this.getInfoContent);
        }
        return null;
    };
    return PanelHeaderCorner;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (PanelHeaderCorner);


/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenu.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenu.tsx ***!
  \********************************************************************************/
/*! exports provided: PanelHeaderMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelHeaderMenu", function() { return PanelHeaderMenu; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PanelHeaderMenuItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PanelHeaderMenuItem */ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenuItem.tsx");
/* harmony import */ var app_features_dashboard_utils_getPanelMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/dashboard/utils/getPanelMenu */ "./public/app/features/dashboard/utils/getPanelMenu.ts");




var PanelHeaderMenu = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PanelHeaderMenu, _super);
    function PanelHeaderMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderItems = function (menu, isSubMenu) {
            if (isSubMenu === void 0) { isSubMenu = false; }
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", { className: "dropdown-menu dropdown-menu--menu panel-menu", role: isSubMenu ? '' : 'menu' }, menu.map(function (menuItem, idx) {
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_PanelHeaderMenuItem__WEBPACK_IMPORTED_MODULE_2__["PanelHeaderMenuItem"], { key: "" + menuItem.text + idx, type: menuItem.type, text: menuItem.text, iconClassName: menuItem.iconClassName, onClick: menuItem.onClick, shortcut: menuItem.shortcut }, menuItem.subMenu && _this.renderItems(menuItem.subMenu, true)));
            })));
        };
        return _this;
    }
    PanelHeaderMenu.prototype.render = function () {
        var _a = this.props, dashboard = _a.dashboard, panel = _a.panel;
        var menu = Object(app_features_dashboard_utils_getPanelMenu__WEBPACK_IMPORTED_MODULE_3__["getPanelMenu"])(dashboard, panel);
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-menu-container dropdown open" }, this.renderItems(menu));
    };
    return PanelHeaderMenu;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenuItem.tsx":
/*!************************************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelHeader/PanelHeaderMenuItem.tsx ***!
  \************************************************************************************/
/*! exports provided: PanelHeaderMenuItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelHeaderMenuItem", function() { return PanelHeaderMenuItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_e2e__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/e2e */ "./packages/grafana-e2e/src/index.ts");


var PanelHeaderMenuItem = function (props) {
    var isSubMenu = props.type === 'submenu';
    var isDivider = props.type === 'divider';
    return isDivider ? (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", { className: "divider" })) : (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", { className: isSubMenu ? 'dropdown-submenu' : null },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", { onClick: props.onClick },
            props.iconClassName && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: props.iconClassName }),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "dropdown-item-text", "aria-label": _grafana_e2e__WEBPACK_IMPORTED_MODULE_1__["e2e"].pages.Dashboard.Panels.Panel.selectors.headerItems(props.text) }, props.text),
            props.shortcut && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "dropdown-menu-item-shortcut" }, props.shortcut)),
        props.children));
};


/***/ }),

/***/ "./public/app/features/dashboard/dashgrid/PanelResizer.tsx":
/*!*****************************************************************!*\
  !*** ./public/app/features/dashboard/dashgrid/PanelResizer.tsx ***!
  \*****************************************************************/
/*! exports provided: PanelResizer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelResizer", function() { return PanelResizer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-draggable */ "./node_modules/react-draggable/dist/react-draggable.js");
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_3__);




var PanelResizer = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(PanelResizer, _super);
    function PanelResizer(props) {
        var _this = _super.call(this, props) || this;
        _this.initialHeight = Math.floor(document.documentElement.scrollHeight * 0.3);
        _this.noStyles = {};
        _this.changeHeight = function (height) {
            var sh = _this.smallestHeight;
            var lh = _this.largestHeight;
            height = height < sh ? sh : height;
            height = height > lh ? lh : height;
            _this.prevEditorHeight = _this.state.editorHeight;
            _this.setState({
                editorHeight: height,
            });
        };
        _this.onDrag = function (evt, data) {
            var newHeight = _this.state.editorHeight + data.y;
            _this.throttledChangeHeight(newHeight);
            _this.throttledResizeDone();
        };
        var panel = _this.props.panel;
        _this.state = {
            editorHeight: _this.initialHeight,
        };
        _this.throttledChangeHeight = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["throttle"])(_this.changeHeight, 20, { trailing: true });
        _this.throttledResizeDone = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["throttle"])(function () {
            panel.resizeDone();
        }, 50);
        return _this;
    }
    Object.defineProperty(PanelResizer.prototype, "largestHeight", {
        get: function () {
            return document.documentElement.scrollHeight * 0.9;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelResizer.prototype, "smallestHeight", {
        get: function () {
            return 100;
        },
        enumerable: true,
        configurable: true
    });
    PanelResizer.prototype.render = function () {
        var _a = this.props, render = _a.render, isEditing = _a.isEditing;
        var editorHeight = this.state.editorHeight;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            render(isEditing ? { height: editorHeight } : this.noStyles),
            isEditing && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor-container__resizer" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_draggable__WEBPACK_IMPORTED_MODULE_3___default.a, { axis: "y", grid: [100, 1], onDrag: this.onDrag, position: { x: 0, y: 0 } },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor-resizer" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor-resizer__handle" })))))));
    };
    return PanelResizer;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/DataSourceOption.tsx":
/*!*************************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/DataSourceOption.tsx ***!
  \*************************************************************************/
/*! exports provided: DataSourceOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourceOption", function() { return DataSourceOption; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var DataSourceOption = function (_a) {
    var label = _a.label, placeholder = _a.placeholder, name = _a.name, value = _a.value, onBlur = _a.onBlur, onChange = _a.onChange, tooltipInfo = _a.tooltipInfo;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form gf-form--flex-end" },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["FormLabel"], { tooltip: tooltipInfo }, label),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], { type: "text", className: "gf-form-input width-6", placeholder: placeholder, name: name, spellCheck: false, onBlur: onBlur, onChange: onChange, value: value })));
};


/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/EditorTabBody.tsx":
/*!**********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/EditorTabBody.tsx ***!
  \**********************************************************************/
/*! exports provided: EditorTabBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditorTabBody", function() { return EditorTabBody; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/Animations/FadeIn */ "./public/app/core/components/Animations/FadeIn.tsx");

// Libraries

// Components


var EditorTabBody = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(EditorTabBody, _super);
    function EditorTabBody(props) {
        var _this = _super.call(this, props) || this;
        _this.onToggleToolBarView = function (item) {
            _this.setState({
                openView: item,
                isOpen: _this.state.openView !== item || !_this.state.isOpen,
            });
        };
        _this.onCloseOpenView = function () {
            _this.setState({ isOpen: false });
        };
        _this.state = {
            openView: null,
            fadeIn: false,
            isOpen: false,
        };
        return _this;
    }
    EditorTabBody.prototype.componentDidMount = function () {
        this.setState({ fadeIn: true });
    };
    EditorTabBody.getDerivedStateFromProps = function (props, state) {
        if (state.openView) {
            var activeToolbarItem = props.toolbarItems.find(function (item) { return item.title === state.openView.title && item.icon === state.openView.icon; });
            if (activeToolbarItem) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, state), { openView: activeToolbarItem });
            }
        }
        return state;
    };
    EditorTabBody.prototype.renderButton = function (view) {
        var _this = this;
        var onClick = function () {
            if (view.onClick) {
                view.onClick();
            }
            if (view.render) {
                _this.onToggleToolBarView(view);
            }
        };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "nav-buttons", key: view.title + view.icon },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button", onClick: onClick, disabled: view.disabled },
                view.icon && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: view.icon }),
                " ",
                view.title)));
    };
    EditorTabBody.prototype.renderOpenView = function (view) {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["PanelOptionsGroup"], { title: view.title || view.heading, onClose: this.onCloseOpenView }, view.render()));
    };
    EditorTabBody.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, renderToolbar = _a.renderToolbar, heading = _a.heading, toolbarItems = _a.toolbarItems, scrollTop = _a.scrollTop, setScrollTop = _a.setScrollTop;
        var _b = this.state, openView = _b.openView, fadeIn = _b.fadeIn, isOpen = _b.isOpen;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "toolbar" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "toolbar__left" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "toolbar__heading" }, heading),
                    renderToolbar && renderToolbar()),
                toolbarItems.map(function (item) { return _this.renderButton(item); })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor__scroll" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["CustomScrollbar"], { autoHide: false, scrollTop: scrollTop, setScrollTop: setScrollTop, updateAfterMountMs: 300 },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor__content" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_3__["FadeIn"], { in: isOpen, duration: 200, unmountOnExit: true }, openView && this.renderOpenView(openView)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_3__["FadeIn"], { in: fadeIn, duration: 50 }, children))))));
    };
    EditorTabBody.defaultProps = {
        toolbarItems: [],
    };
    return EditorTabBody;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/GeneralTab.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/GeneralTab.tsx ***!
  \*******************************************************************/
/*! exports provided: GeneralTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralTab", function() { return GeneralTab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _EditorTabBody__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorTabBody */ "./public/app/features/dashboard/panel_editor/EditorTabBody.tsx");
/* harmony import */ var _panel_GeneralTabCtrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../panel/GeneralTabCtrl */ "./public/app/features/panel/GeneralTabCtrl.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_features_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/panel/panellinks/link_srv */ "./public/app/features/panel/panellinks/link_srv.ts");

// Libraries

// Components





var GeneralTab = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(GeneralTab, _super);
    function GeneralTab(props) {
        var _this = _super.call(this, props) || this;
        _this.onDataLinksChanged = function (links, callback) {
            _this.props.panel.links = links;
            _this.props.panel.render();
            _this.forceUpdate(callback);
        };
        return _this;
    }
    GeneralTab.prototype.componentDidMount = function () {
        if (!this.element) {
            return;
        }
        var panel = this.props.panel;
        var loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getAngularLoader"])();
        var template = '<panel-general-tab />';
        var scopeProps = {
            ctrl: {
                panel: panel,
            },
        };
        this.component = loader.load(this.element, scopeProps, template);
    };
    GeneralTab.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    GeneralTab.prototype.render = function () {
        var _this = this;
        var panel = this.props.panel;
        var suggestions = Object(app_features_panel_panellinks_link_srv__WEBPACK_IMPORTED_MODULE_6__["getPanelLinksVariableSuggestions"])();
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EditorTabBody__WEBPACK_IMPORTED_MODULE_3__["EditorTabBody"], { heading: "General", toolbarItems: [] },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: function (element) { return (_this.element = element); } }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["PanelOptionsGroup"], { title: "Panel links" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["DataLinksEditor"], { value: panel.links, onChange: this.onDataLinksChanged, suggestions: suggestions, maxLinks: 10 })))));
    };
    return GeneralTab;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/PanelEditor.tsx":
/*!********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/PanelEditor.tsx ***!
  \********************************************************************/
/*! exports provided: mapStateToProps, PanelEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStateToProps", function() { return mapStateToProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PanelEditor", function() { return PanelEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var _grafana_e2e__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/e2e */ "./packages/grafana-e2e/src/index.ts");
/* harmony import */ var _QueriesTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./QueriesTab */ "./public/app/features/dashboard/panel_editor/QueriesTab.tsx");
/* harmony import */ var _VisualizationTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VisualizationTab */ "./public/app/features/dashboard/panel_editor/VisualizationTab.tsx");
/* harmony import */ var _GeneralTab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./GeneralTab */ "./public/app/features/dashboard/panel_editor/GeneralTab.tsx");
/* harmony import */ var _alerting_AlertTab__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../alerting/AlertTab */ "./public/app/features/alerting/AlertTab.tsx");
/* harmony import */ var _state_reducers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/reducers */ "./public/app/features/dashboard/panel_editor/state/reducers.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/dashboard/panel_editor/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/dashboard/panel_editor/state/selectors.ts");















var UnConnectedPanelEditor = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(UnConnectedPanelEditor, _super);
    function UnConnectedPanelEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.refreshFromState = function (meta) {
            var _a = _this.props, refreshPanelEditor = _a.refreshPanelEditor, plugin = _a.plugin;
            meta = meta || plugin.meta;
            refreshPanelEditor({
                hasQueriesTab: !meta.skipDataQuery,
                usesGraphPlugin: meta.id === 'graph',
                alertingEnabled: _grafana_runtime__WEBPACK_IMPORTED_MODULE_6__["config"].alertingEnabled,
            });
        };
        _this.onChangeTab = function (tab) {
            var changePanelEditorTab = _this.props.changePanelEditorTab;
            // Angular Query Components can potentially refresh the PanelModel
            // onBlur so this makes sure we change tab after that
            setTimeout(function () { return changePanelEditorTab(tab); }, 10);
        };
        _this.onPluginTypeChange = function (newType) {
            var onPluginTypeChange = _this.props.onPluginTypeChange;
            onPluginTypeChange(newType);
            _this.refreshFromState(newType);
        };
        return _this;
    }
    UnConnectedPanelEditor.prototype.componentDidMount = function () {
        this.refreshFromState();
    };
    UnConnectedPanelEditor.prototype.componentWillUnmount = function () {
        var panelEditorCleanUp = this.props.panelEditorCleanUp;
        panelEditorCleanUp();
    };
    UnConnectedPanelEditor.prototype.renderCurrentTab = function (activeTab) {
        var _a = this.props, panel = _a.panel, dashboard = _a.dashboard, plugin = _a.plugin, angularPanel = _a.angularPanel;
        switch (activeTab) {
            case 'advanced':
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_GeneralTab__WEBPACK_IMPORTED_MODULE_10__["GeneralTab"], { panel: panel });
            case 'queries':
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueriesTab__WEBPACK_IMPORTED_MODULE_8__["QueriesTab"], { panel: panel, dashboard: dashboard });
            case 'alert':
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_alerting_AlertTab__WEBPACK_IMPORTED_MODULE_11__["AlertTab"], { angularPanel: angularPanel, dashboard: dashboard, panel: panel });
            case 'visualization':
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_VisualizationTab__WEBPACK_IMPORTED_MODULE_9__["default"], { panel: panel, dashboard: dashboard, plugin: plugin, onPluginTypeChange: this.onPluginTypeChange, angularPanel: angularPanel }));
            default:
                return null;
        }
    };
    UnConnectedPanelEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, activeTab = _a.activeTab, tabs = _a.tabs;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor-container__editor" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor-tabs" }, tabs.map(function (tab) {
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(TabItem, { tab: tab, activeTab: activeTab, onClick: _this.onChangeTab, key: tab.id });
            })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor__right" }, this.renderCurrentTab(activeTab))));
    };
    return UnConnectedPanelEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var mapStateToProps = function (state) { return Object(_state_selectors__WEBPACK_IMPORTED_MODULE_14__["getActiveTabAndTabs"])(state.location, state.panelEditor); };
var mapDispatchToProps = { refreshPanelEditor: _state_actions__WEBPACK_IMPORTED_MODULE_13__["refreshPanelEditor"], panelEditorCleanUp: _state_reducers__WEBPACK_IMPORTED_MODULE_12__["panelEditorCleanUp"], changePanelEditorTab: _state_actions__WEBPACK_IMPORTED_MODULE_13__["changePanelEditorTab"] };
var PanelEditor = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(UnConnectedPanelEditor));
function TabItem(_a) {
    var tab = _a.tab, activeTab = _a.activeTab, onClick = _a.onClick;
    var tabClasses = classnames__WEBPACK_IMPORTED_MODULE_2___default()({
        'panel-editor-tabs__link': true,
        active: activeTab === tab.id,
    });
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "panel-editor-tabs__item", onClick: function () { return onClick(tab); } },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: tabClasses, "aria-label": _grafana_e2e__WEBPACK_IMPORTED_MODULE_7__["e2e"].pages.Dashboard.Panels.EditPanel.selectors.tabItems(tab.text) },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["Tooltip"], { content: "" + tab.text, placement: "auto" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "gicon gicon-" + tab.id + (activeTab === tab.id ? '-active' : '') })))));
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/QueriesTab.tsx":
/*!*******************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/QueriesTab.tsx ***!
  \*******************************************************************/
/*! exports provided: QueriesTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueriesTab", function() { return QueriesTab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _EditorTabBody__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorTabBody */ "./public/app/features/dashboard/panel_editor/EditorTabBody.tsx");
/* harmony import */ var app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
/* harmony import */ var _QueryInspector__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./QueryInspector */ "./public/app/features/dashboard/panel_editor/QueryInspector.tsx");
/* harmony import */ var _QueryOptions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./QueryOptions */ "./public/app/features/dashboard/panel_editor/QueryOptions.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _QueryEditorRows__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./QueryEditorRows */ "./public/app/features/dashboard/panel_editor/QueryEditorRows.tsx");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/core/components/PluginHelp/PluginHelp */ "./public/app/core/components/PluginHelp/PluginHelp.tsx");
/* harmony import */ var app_core_utils_query__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/core/utils/query */ "./public/app/core/utils/query.ts");
/* harmony import */ var app_plugins_datasource_dashboard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/plugins/datasource/dashboard */ "./public/app/plugins/datasource/dashboard/index.ts");
/* harmony import */ var app_features_expressions_ExpressionDatasource__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! app/features/expressions/ExpressionDatasource */ "./public/app/features/expressions/ExpressionDatasource.ts");

// Libraries


// Components






// Services








var QueriesTab = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueriesTab, _super);
    function QueriesTab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datasources = Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_9__["getDatasourceSrv"])().getMetricSources();
        _this.backendSrv = Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_10__["getBackendSrv"])();
        _this.state = {
            isLoadingHelp: false,
            currentDS: _this.findCurrentDataSource(),
            helpContent: null,
            isPickerOpen: false,
            isAddingMixed: false,
            scrollTop: 0,
            data: {
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].NotStarted,
                series: [],
                timeRange: _grafana_data__WEBPACK_IMPORTED_MODULE_12__["DefaultTimeRange"],
            },
        };
        _this.onChangeDataSource = function (datasource) {
            var e_1, _a;
            var panel = _this.props.panel;
            var currentDS = _this.state.currentDS;
            // switching to mixed
            if (datasource.meta.mixed) {
                // Set the datasource on all targets
                panel.targets.forEach(function (target) {
                    if (target.datasource !== app_features_expressions_ExpressionDatasource__WEBPACK_IMPORTED_MODULE_16__["ExpressionDatasourceID"]) {
                        target.datasource = panel.datasource;
                        if (!target.datasource) {
                            target.datasource = app_core_config__WEBPACK_IMPORTED_MODULE_11__["default"].defaultDatasource;
                        }
                    }
                });
            }
            else if (currentDS) {
                // if switching from mixed
                if (currentDS.meta.mixed) {
                    try {
                        // Remove the explicit datasource
                        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(panel.targets), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var target = _c.value;
                            if (target.datasource !== app_features_expressions_ExpressionDatasource__WEBPACK_IMPORTED_MODULE_16__["ExpressionDatasourceID"]) {
                                delete target.datasource;
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
                }
                else if (currentDS.meta.id !== datasource.meta.id) {
                    // we are changing data source type, clear queries
                    panel.targets = [{ refId: 'A' }];
                }
            }
            panel.datasource = datasource.value;
            panel.refresh();
            _this.setState({
                currentDS: datasource,
            });
        };
        _this.renderQueryInspector = function () {
            var panel = _this.props.panel;
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryInspector__WEBPACK_IMPORTED_MODULE_5__["QueryInspector"], { panel: panel });
        };
        _this.renderHelp = function () {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_13__["PluginHelp"], { plugin: _this.state.currentDS.meta, type: "query_help" });
        };
        /**
         * Sets the queries for the panel
         */
        _this.onUpdateQueries = function (queries) {
            _this.props.panel.targets = queries;
            _this.forceUpdate();
        };
        _this.onAddQueryClick = function () {
            if (_this.state.currentDS.meta.mixed) {
                _this.setState({ isAddingMixed: true });
                return;
            }
            _this.onUpdateQueries(Object(app_core_utils_query__WEBPACK_IMPORTED_MODULE_14__["addQuery"])(_this.props.panel.targets));
            _this.onScrollBottom();
        };
        _this.onAddExpressionClick = function () {
            _this.onUpdateQueries(Object(app_core_utils_query__WEBPACK_IMPORTED_MODULE_14__["addQuery"])(_this.props.panel.targets, app_features_expressions_ExpressionDatasource__WEBPACK_IMPORTED_MODULE_16__["expressionDatasource"].newQuery()));
            _this.onScrollBottom();
        };
        _this.onScrollBottom = function () {
            _this.setState({ scrollTop: _this.state.scrollTop + 10000 });
        };
        _this.renderToolbar = function () {
            var _a = _this.state, currentDS = _a.currentDS, isAddingMixed = _a.isAddingMixed;
            var showAddButton = !(isAddingMixed || Object(app_plugins_datasource_dashboard__WEBPACK_IMPORTED_MODULE_15__["isSharedDashboardQuery"])(currentDS.name));
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_4__["DataSourcePicker"], { datasources: _this.datasources, onChange: _this.onChangeDataSource, current: currentDS }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "flex-grow-1" }),
                showAddButton && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button", onClick: _this.onAddQueryClick }, "Add Query")),
                isAddingMixed && _this.renderMixedPicker(),
                app_core_config__WEBPACK_IMPORTED_MODULE_11__["default"].featureToggles.expressions && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button", onClick: _this.onAddExpressionClick }, "Add Expression"))));
        };
        _this.renderMixedPicker = function () {
            // We cannot filter on mixed flag as some mixed data sources like external plugin
            // meta queries data source is mixed but also supports it's own queries
            var filteredDsList = _this.datasources.filter(function (ds) { return ds.meta.id !== 'mixed'; });
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_4__["DataSourcePicker"], { datasources: filteredDsList, onChange: _this.onAddMixedQuery, current: null, autoFocus: true, onBlur: _this.onMixedPickerBlur, openMenuOnFocus: true }));
        };
        _this.onAddMixedQuery = function (datasource) {
            _this.props.panel.targets = Object(app_core_utils_query__WEBPACK_IMPORTED_MODULE_14__["addQuery"])(_this.props.panel.targets, { datasource: datasource.name });
            _this.setState({ isAddingMixed: false, scrollTop: _this.state.scrollTop + 10000 });
            _this.forceUpdate();
        };
        _this.onMixedPickerBlur = function () {
            _this.setState({ isAddingMixed: false });
        };
        _this.onQueryChange = function (query, index) {
            _this.props.panel.changeQuery(query, index);
            _this.forceUpdate();
        };
        _this.onTransformersChange = function (transformers) {
            _this.props.panel.setTransformations(transformers);
            _this.forceUpdate();
        };
        _this.setScrollTop = function (event) {
            var target = event.target;
            _this.setState({ scrollTop: target.scrollTop });
        };
        _this.renderQueryBody = function () {
            var _a = _this.props, panel = _a.panel, dashboard = _a.dashboard;
            var _b = _this.state, currentDS = _b.currentDS, data = _b.data;
            if (Object(app_plugins_datasource_dashboard__WEBPACK_IMPORTED_MODULE_15__["isSharedDashboardQuery"])(currentDS.name)) {
                return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_plugins_datasource_dashboard__WEBPACK_IMPORTED_MODULE_15__["DashboardQueryEditor"], { panel: panel, panelData: data, onChange: function (query) { return _this.onUpdateQueries([query]); } });
            }
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryEditorRows__WEBPACK_IMPORTED_MODULE_8__["QueryEditorRows"], { queries: panel.targets, datasource: currentDS, onChangeQueries: _this.onUpdateQueries, onScrollBottom: _this.onScrollBottom, panel: panel, dashboard: dashboard, data: data }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["PanelOptionsGroup"], null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryOptions__WEBPACK_IMPORTED_MODULE_6__["QueryOptions"], { panel: panel, datasource: currentDS }))));
        };
        return _this;
    }
    QueriesTab.prototype.componentDidMount = function () {
        var _this = this;
        var panel = this.props.panel;
        var queryRunner = panel.getQueryRunner();
        this.querySubscription = queryRunner.getData(false).subscribe({
            next: function (data) { return _this.onPanelDataUpdate(data); },
        });
    };
    QueriesTab.prototype.componentWillUnmount = function () {
        if (this.querySubscription) {
            this.querySubscription.unsubscribe();
            this.querySubscription = null;
        }
    };
    QueriesTab.prototype.onPanelDataUpdate = function (data) {
        this.setState({ data: data });
    };
    QueriesTab.prototype.findCurrentDataSource = function () {
        var panel = this.props.panel;
        return this.datasources.find(function (datasource) { return datasource.value === panel.datasource; }) || this.datasources[0];
    };
    QueriesTab.prototype.render = function () {
        var _a = this.state, scrollTop = _a.scrollTop, data = _a.data;
        var queryInspector = {
            title: 'Query Inspector',
            render: this.renderQueryInspector,
        };
        var dsHelp = {
            heading: 'Help',
            icon: 'fa fa-question',
            render: this.renderHelp,
        };
        var enableTransformations = app_core_config__WEBPACK_IMPORTED_MODULE_11__["default"].featureToggles.transformations;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EditorTabBody__WEBPACK_IMPORTED_MODULE_3__["EditorTabBody"], { heading: "Query", renderToolbar: this.renderToolbar, toolbarItems: [queryInspector, dsHelp], setScrollTop: this.setScrollTop, scrollTop: scrollTop },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                this.renderQueryBody(),
                enableTransformations && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["PanelOptionsGroup"], { title: react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                        "Query results",
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["AlphaNotice"], { state: _grafana_data__WEBPACK_IMPORTED_MODULE_12__["PluginState"].alpha, className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n                      margin-left: 16px;\n                    "], ["\n                      margin-left: 16px;\n                    "]))) })) }, this.state.data.state !== _grafana_data__WEBPACK_IMPORTED_MODULE_12__["LoadingState"].NotStarted && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["TransformationsEditor"], { transformations: this.props.panel.transformations || [], onChange: this.onTransformersChange, dataFrames: data.series })))))));
    };
    return QueriesTab;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var templateObject_1;


/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/QueryEditorRows.tsx":
/*!************************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/QueryEditorRows.tsx ***!
  \************************************************************************/
/*! exports provided: QueryEditorRows */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryEditorRows", function() { return QueryEditorRows; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _QueryEditorRow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryEditorRow */ "./public/app/features/dashboard/panel_editor/QueryEditorRow.tsx");
/* harmony import */ var app_core_utils_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/query */ "./public/app/core/utils/query.ts");

// Libraries

// @ts-ignore ignoring this for now, otherwise we would have to extend _ interface with move



var QueryEditorRows = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryEditorRows, _super);
    function QueryEditorRows() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onAddQuery = function (query) {
            var _a = _this.props, queries = _a.queries, onChangeQueries = _a.onChangeQueries;
            onChangeQueries(Object(app_core_utils_query__WEBPACK_IMPORTED_MODULE_4__["addQuery"])(queries, query));
            _this.props.onScrollBottom();
        };
        _this.onRemoveQuery = function (query) {
            var _a = _this.props, queries = _a.queries, onChangeQueries = _a.onChangeQueries, panel = _a.panel;
            var removed = queries.filter(function (q) {
                return q !== query;
            });
            onChangeQueries(removed);
            panel.refresh();
        };
        _this.onMoveQuery = function (query, direction) {
            var _a = _this.props, queries = _a.queries, onChangeQueries = _a.onChangeQueries, panel = _a.panel;
            var index = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.indexOf(queries, query);
            // @ts-ignore
            lodash__WEBPACK_IMPORTED_MODULE_2___default.a.move(queries, index, index + direction);
            onChangeQueries(queries);
            panel.refresh();
        };
        return _this;
    }
    QueryEditorRows.prototype.onChangeQuery = function (query, index) {
        var _a = this.props, queries = _a.queries, onChangeQueries = _a.onChangeQueries;
        // ensure refId is maintained
        query.refId = queries[index].refId;
        // update query in array
        onChangeQueries(queries.map(function (item, itemIndex) {
            if (itemIndex === index) {
                return query;
            }
            return item;
        }));
    };
    QueryEditorRows.prototype.render = function () {
        var _this = this;
        var props = this.props;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-editor-rows" }, props.queries.map(function (query, index) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryEditorRow__WEBPACK_IMPORTED_MODULE_3__["QueryEditorRow"], { dataSourceValue: query.datasource || props.datasource.value, key: query.refId, panel: props.panel, dashboard: props.dashboard, data: props.data, query: query, onChange: function (query) { return _this.onChangeQuery(query, index); }, onRemoveQuery: _this.onRemoveQuery, onAddQuery: _this.onAddQuery, onMoveQuery: _this.onMoveQuery, inMixedMode: props.datasource.meta.mixed })); })));
    };
    return QueryEditorRows;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/QueryInspector.tsx":
/*!***********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/QueryInspector.tsx ***!
  \***********************************************************************/
/*! exports provided: QueryInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryInspector", function() { return QueryInspector; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_app_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/app_events */ "./public/app/core/app_events.ts");
/* harmony import */ var app_core_components_CopyToClipboard_CopyToClipboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/components/CopyToClipboard/CopyToClipboard */ "./public/app/core/components/CopyToClipboard/CopyToClipboard.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");







var QueryInspector = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryInspector, _super);
    function QueryInspector(props) {
        var _this = _super.call(this, props) || this;
        _this.onPanelRefresh = function () {
            _this.setState(function (prevState) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prevState), { dsQuery: {
                    isLoading: true,
                    response: {},
                } })); });
        };
        _this.onRequestError = function (err) {
            _this.onDataSourceResponse(err);
        };
        _this.onDataSourceResponse = function (response) {
            if (response === void 0) { response = {}; }
            if (_this.state.isMocking) {
                _this.handleMocking(response);
                return;
            }
            response = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, response); // clone - dont modify the response
            if (response.headers) {
                delete response.headers;
            }
            if (response.config) {
                response.request = response.config;
                delete response.config;
                delete response.request.transformRequest;
                delete response.request.transformResponse;
                delete response.request.paramSerializer;
                delete response.request.jsonpCallbackParam;
                delete response.request.headers;
                delete response.request.requestId;
                delete response.request.inspect;
                delete response.request.retry;
                delete response.request.timeout;
            }
            if (response.data) {
                response.response = response.data;
                delete response.data;
                delete response.status;
                delete response.statusText;
                delete response.$$config;
            }
            _this.setState(function (prevState) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prevState), { dsQuery: {
                    isLoading: false,
                    response: response,
                } })); });
        };
        _this.setFormattedJson = function (formattedJson) {
            _this.formattedJson = formattedJson;
        };
        _this.getTextForClipboard = function () {
            return JSON.stringify(_this.formattedJson, null, 2);
        };
        _this.onClipboardSuccess = function () {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["AppEvents"].alertSuccess, ['Content copied to clipboard']);
        };
        _this.onToggleExpand = function () {
            _this.setState(function (prevState) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prevState), { allNodesExpanded: !_this.state.allNodesExpanded })); });
        };
        _this.onToggleMocking = function () {
            _this.setState(function (prevState) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prevState), { isMocking: !_this.state.isMocking })); });
        };
        _this.getNrOfOpenNodes = function () {
            if (_this.state.allNodesExpanded === null) {
                return 3; // 3 is default, ie when state is null
            }
            else if (_this.state.allNodesExpanded) {
                return 20;
            }
            return 1;
        };
        _this.setMockedResponse = function (evt) {
            var mockedResponse = evt.target.value;
            _this.setState(function (prevState) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, prevState), { mockedResponse: mockedResponse })); });
        };
        _this.renderExpandCollapse = function () {
            var allNodesExpanded = _this.state.allNodesExpanded;
            var collapse = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-minus-square-o" }),
                " Collapse All"));
            var expand = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-plus-square-o" }),
                " Expand All"));
            return allNodesExpanded ? collapse : expand;
        };
        _this.state = {
            allNodesExpanded: null,
            isMocking: false,
            mockedResponse: '',
            dsQuery: {
                isLoading: false,
                response: {},
            },
        };
        return _this;
    }
    QueryInspector.prototype.componentDidMount = function () {
        var panel = this.props.panel;
        app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].on(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].dsRequestResponse, this.onDataSourceResponse);
        app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].on(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].dsRequestError, this.onRequestError);
        panel.events.on(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["PanelEvents"].refresh, this.onPanelRefresh);
        panel.refresh();
    };
    QueryInspector.prototype.componentWillUnmount = function () {
        var panel = this.props.panel;
        app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].off(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].dsRequestResponse, this.onDataSourceResponse);
        app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].on(app_types__WEBPACK_IMPORTED_MODULE_5__["CoreEvents"].dsRequestError, this.onRequestError);
        panel.events.off(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["PanelEvents"].refresh, this.onPanelRefresh);
    };
    QueryInspector.prototype.handleMocking = function (response) {
        var mockedResponse = this.state.mockedResponse;
        var mockedData;
        try {
            mockedData = JSON.parse(mockedResponse);
        }
        catch (err) {
            app_core_app_events__WEBPACK_IMPORTED_MODULE_2__["default"].emit(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["AppEvents"].alertError, ['R: Failed to parse mocked response']);
            return;
        }
        response.data = mockedData;
    };
    QueryInspector.prototype.render = function () {
        var _a = this.state.dsQuery, response = _a.response, isLoading = _a.isLoading;
        var openNodes = this.getNrOfOpenNodes();
        if (isLoading) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["LoadingPlaceholder"], { text: "Loading query inspector..." });
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "pull-right" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-transparent btn-p-x-0 m-r-1", onClick: this.onToggleExpand }, this.renderExpandCollapse()),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_CopyToClipboard_CopyToClipboard__WEBPACK_IMPORTED_MODULE_3__["CopyToClipboard"], { className: "btn btn-transparent btn-p-x-0", text: this.getTextForClipboard, onSuccess: this.onClipboardSuccess },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-clipboard" }),
                    " Copy to Clipboard")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["JSONFormatter"], { json: response, open: openNodes, onDidRender: this.setFormattedJson })));
    };
    return QueryInspector;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/QueryOptions.tsx":
/*!*********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/QueryOptions.tsx ***!
  \*********************************************************************/
/*! exports provided: QueryOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryOptions", function() { return QueryOptions; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _DataSourceOption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataSourceOption */ "./public/app/features/dashboard/panel_editor/DataSourceOption.tsx");
var _a;

// Libraries

// Utils

// Components


var timeRangeValidationEvents = (_a = {},
    _a[_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["EventsWithValidation"].onBlur] = [
        {
            rule: function (value) {
                if (!value) {
                    return true;
                }
                return _grafana_data__WEBPACK_IMPORTED_MODULE_2__["rangeUtil"].isValidTimeSpan(value);
            },
            errorMessage: 'Not a valid timespan',
        },
    ],
    _a);
var emptyToNull = function (value) {
    return value === '' ? null : value;
};
var QueryOptions = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(QueryOptions, _super);
    function QueryOptions(props) {
        var _this = _super.call(this, props) || this;
        _this.allOptions = {
            cacheTimeout: {
                label: 'Cache timeout',
                placeholder: '60',
                name: 'cacheTimeout',
                tooltipInfo: (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, "If your time series store has a query cache this option can override the default cache timeout. Specify a numeric value in seconds.")),
            },
            maxDataPoints: {
                label: 'Max data points',
                placeholder: 'auto',
                name: 'maxDataPoints',
                tooltipInfo: (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, "The maximum data points the query should return. For graphs this is automatically set to one data point per pixel. For some data sources this can also be capped in the datasource settings page. With streaming data, this value is used for the rolling buffer.")),
            },
            minInterval: {
                label: 'Min time interval',
                placeholder: '0',
                name: 'minInterval',
                panelKey: 'interval',
                tooltipInfo: (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    "A lower limit for the auto group by time interval. Recommended to be set to write frequency, for example",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, "1m"),
                    " if your data is written every minute. Access auto interval via variable",
                    ' ',
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, "$__interval"),
                    " for time range string and ",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, "$__interval_ms"),
                    " for numeric variable that can be used in math expressions.")),
            },
        };
        _this.onRelativeTimeChange = function (event) {
            _this.setState({
                relativeTime: event.target.value,
            });
        };
        _this.onTimeShiftChange = function (event) {
            _this.setState({
                timeShift: event.target.value,
            });
        };
        _this.onOverrideTime = function (event, status) {
            var value = event.target.value;
            var panel = _this.props.panel;
            var emptyToNullValue = emptyToNull(value);
            if (status === _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["InputStatus"].Valid && panel.timeFrom !== emptyToNullValue) {
                panel.timeFrom = emptyToNullValue;
                panel.refresh();
            }
        };
        _this.onTimeShift = function (event, status) {
            var value = event.target.value;
            var panel = _this.props.panel;
            var emptyToNullValue = emptyToNull(value);
            if (status === _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["InputStatus"].Valid && panel.timeShift !== emptyToNullValue) {
                panel.timeShift = emptyToNullValue;
                panel.refresh();
            }
        };
        _this.onToggleTimeOverride = function () {
            var panel = _this.props.panel;
            _this.setState({ hideTimeOverride: !_this.state.hideTimeOverride }, function () {
                panel.hideTimeOverride = _this.state.hideTimeOverride;
                panel.refresh();
            });
        };
        _this.onDataSourceOptionBlur = function (panelKey) { return function () {
            var panel = _this.props.panel;
            // @ts-ignore
            panel[panelKey] = _this.state[panelKey];
            panel.refresh();
        }; };
        _this.onDataSourceOptionChange = function (panelKey) { return function (event) {
            var _a;
            _this.setState(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])(Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.state), (_a = {}, _a[panelKey] = event.target.value, _a)));
        }; };
        /**
         * Show options for any value that is set, or values that the
         * current datasource says it will use
         */
        _this.renderOptions = function () {
            var datasource = _this.props.datasource;
            var queryOptions = datasource.meta.queryOptions || {};
            return Object.keys(_this.allOptions).map(function (key) {
                var options = _this.allOptions[key];
                var panelKey = options.panelKey || key;
                // @ts-ignore
                var value = _this.state[panelKey];
                if (queryOptions[key]) {
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_DataSourceOption__WEBPACK_IMPORTED_MODULE_4__["DataSourceOption"], Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ key: key }, options, { onChange: _this.onDataSourceOptionChange(panelKey), onBlur: _this.onDataSourceOptionBlur(panelKey), value: value })));
                }
                return null; // nothing to render
            });
        };
        _this.state = {
            relativeTime: props.panel.timeFrom || '',
            timeShift: props.panel.timeShift || '',
            cacheTimeout: props.panel.cacheTimeout || '',
            maxDataPoints: props.panel.maxDataPoints || '',
            interval: props.panel.interval || '',
            hideTimeOverride: props.panel.hideTimeOverride || false,
        };
        return _this;
    }
    QueryOptions.prototype.render = function () {
        var hideTimeOverride = this.state.hideTimeOverride;
        var _a = this.state, relativeTime = _a.relativeTime, timeShift = _a.timeShift;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
            this.renderOptions(),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], null, "Relative time"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], { type: "text", className: "width-6", placeholder: "1h", onChange: this.onRelativeTimeChange, onBlur: this.onOverrideTime, validationEvents: timeRangeValidationEvents, hideErrorMessage: true, value: relativeTime })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "gf-form-label" }, "Time shift"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Input"], { type: "text", className: "width-6", placeholder: "1h", onChange: this.onTimeShiftChange, onBlur: this.onTimeShift, validationEvents: timeRangeValidationEvents, hideErrorMessage: true, value: timeShift })),
            (timeShift || relativeTime) && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Hide time info", checked: hideTimeOverride, onChange: this.onToggleTimeOverride })))));
    };
    return QueryOptions;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/VisualizationTab.tsx":
/*!*************************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/VisualizationTab.tsx ***!
  \*************************************************************************/
/*! exports provided: VisualizationTab, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizationTab", function() { return VisualizationTab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_core_utils_connectWithReduxStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/utils/connectWithReduxStore */ "./public/app/core/utils/connectWithReduxStore.tsx");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _EditorTabBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditorTabBody */ "./public/app/features/dashboard/panel_editor/EditorTabBody.tsx");
/* harmony import */ var _VizTypePicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VizTypePicker */ "./public/app/features/dashboard/panel_editor/VizTypePicker.tsx");
/* harmony import */ var app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/PluginHelp/PluginHelp */ "./public/app/core/components/PluginHelp/PluginHelp.tsx");
/* harmony import */ var app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/components/Animations/FadeIn */ "./public/app/core/components/Animations/FadeIn.tsx");
/* harmony import */ var _VizPickerSearch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VizPickerSearch */ "./public/app/features/dashboard/panel_editor/VizPickerSearch.tsx");
/* harmony import */ var app_features_plugins_PluginStateInfo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/features/plugins/PluginStateInfo */ "./public/app/features/plugins/PluginStateInfo.tsx");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

// Libraries

// Utils & Services



// Components







var VisualizationTab = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(VisualizationTab, _super);
    function VisualizationTab(props) {
        var _this = _super.call(this, props) || this;
        _this.getReactPanelOptions = function () {
            var panel = _this.props.panel;
            return panel.getOptions();
        };
        _this.clearQuery = function () {
            _this.setState({ searchQuery: '' });
        };
        _this.onPanelOptionsChanged = function (options, callback) {
            _this.props.panel.updateOptions(options);
            _this.forceUpdate(callback);
        };
        _this.onOpenVizPicker = function () {
            _this.setState({ isVizPickerOpen: true, scrollTop: 0 });
        };
        _this.onCloseVizPicker = function () {
            if (_this.props.urlOpenVizPicker) {
                _this.props.updateLocation({ query: { openVizPicker: null }, partial: true });
            }
            _this.setState({ isVizPickerOpen: false, hasBeenFocused: false });
        };
        _this.onSearchQueryChange = function (value) {
            _this.setState({
                searchQuery: value,
            });
        };
        _this.renderToolbar = function () {
            var plugin = _this.props.plugin;
            var _a = _this.state, isVizPickerOpen = _a.isVizPickerOpen, searchQuery = _a.searchQuery;
            var meta = plugin.meta;
            if (isVizPickerOpen) {
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_VizPickerSearch__WEBPACK_IMPORTED_MODULE_9__["VizPickerSearch"], { plugin: meta, searchQuery: searchQuery, onChange: _this.onSearchQueryChange, onClose: _this.onCloseVizPicker }));
            }
            else {
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "toolbar__main", onClick: _this.onOpenVizPicker },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { className: "toolbar__main-image", src: meta.info.logos.small }),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "toolbar__main-name" }, meta.name),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-caret-down" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_features_plugins_PluginStateInfo__WEBPACK_IMPORTED_MODULE_10__["default"], { state: meta.state })));
            }
        };
        _this.onPluginTypeChange = function (plugin) {
            if (plugin.id === _this.props.plugin.meta.id) {
                _this.setState({ isVizPickerOpen: false });
            }
            else {
                _this.props.onPluginTypeChange(plugin);
            }
        };
        _this.renderHelp = function () { return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_PluginHelp_PluginHelp__WEBPACK_IMPORTED_MODULE_7__["PluginHelp"], { plugin: _this.props.plugin.meta, type: "help" }); };
        _this.setScrollTop = function (event) {
            var target = event.target;
            _this.setState({ scrollTop: target.scrollTop });
        };
        _this.state = {
            isVizPickerOpen: _this.props.urlOpenVizPicker,
            hasBeenFocused: false,
            searchQuery: '',
            scrollTop: 0,
            data: {
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_11__["LoadingState"].NotStarted,
                series: [],
                timeRange: _grafana_data__WEBPACK_IMPORTED_MODULE_11__["DefaultTimeRange"],
            },
        };
        return _this;
    }
    VisualizationTab.prototype.renderPanelOptions = function () {
        var _this = this;
        var _a = this.props, plugin = _a.plugin, angularPanel = _a.angularPanel;
        if (angularPanel) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: function (element) { return (_this.element = element); } });
        }
        if (plugin.editor) {
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(plugin.editor, { data: this.state.data, options: this.getReactPanelOptions(), onOptionsChange: this.onPanelOptionsChanged }));
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", null, "Visualization has no options");
    };
    VisualizationTab.prototype.componentDidMount = function () {
        var _this = this;
        var panel = this.props.panel;
        var queryRunner = panel.getQueryRunner();
        if (this.shouldLoadAngularOptions()) {
            this.loadAngularOptions();
        }
        this.querySubscription = queryRunner.getData().subscribe({
            next: function (data) { return _this.setState({ data: data }); },
        });
    };
    VisualizationTab.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.plugin !== prevProps.plugin) {
            this.cleanUpAngularOptions();
        }
        if (this.shouldLoadAngularOptions()) {
            this.loadAngularOptions();
        }
    };
    VisualizationTab.prototype.shouldLoadAngularOptions = function () {
        return this.props.angularPanel && this.element && !this.angularOptions;
    };
    VisualizationTab.prototype.loadAngularOptions = function () {
        var _this = this;
        var angularPanel = this.props.angularPanel;
        var scope = angularPanel.getScope();
        // When full page reloading in edit mode the angular panel has on fully compiled & instantiated yet
        if (!scope.$$childHead) {
            setTimeout(function () {
                _this.forceUpdate();
            });
            return;
        }
        var panelCtrl = scope.$$childHead.ctrl;
        panelCtrl.initEditMode();
        panelCtrl.onPluginTypeChange = this.onPluginTypeChange;
        var template = '';
        for (var i = 0; i < panelCtrl.editorTabs.length; i++) {
            template +=
                "\n      <div class=\"panel-options-group\" ng-cloak>" +
                    (i > 0
                        ? "<div class=\"panel-options-group__header\">\n           <span class=\"panel-options-group__title\">{{ctrl.editorTabs[" + i + "].title}}\n           </span>\n         </div>"
                        : '') +
                    ("<div class=\"panel-options-group__body\">\n          <panel-editor-tab editor-tab=\"ctrl.editorTabs[" + i + "]\" ctrl=\"ctrl\"></panel-editor-tab>\n        </div>\n      </div>\n      ");
        }
        var loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getAngularLoader"])();
        var scopeProps = { ctrl: panelCtrl };
        this.angularOptions = loader.load(this.element, scopeProps, template);
    };
    VisualizationTab.prototype.componentWillUnmount = function () {
        if (this.querySubscription) {
            this.querySubscription.unsubscribe();
        }
        this.cleanUpAngularOptions();
    };
    VisualizationTab.prototype.cleanUpAngularOptions = function () {
        if (this.angularOptions) {
            this.angularOptions.destroy();
            this.angularOptions = null;
        }
    };
    VisualizationTab.prototype.render = function () {
        var plugin = this.props.plugin;
        var _a = this.state, isVizPickerOpen = _a.isVizPickerOpen, searchQuery = _a.searchQuery, scrollTop = _a.scrollTop;
        var meta = plugin.meta;
        var pluginHelp = {
            heading: 'Help',
            icon: 'fa fa-question',
            render: this.renderHelp,
        };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_EditorTabBody__WEBPACK_IMPORTED_MODULE_5__["EditorTabBody"], { heading: "Visualization", renderToolbar: this.renderToolbar, toolbarItems: [pluginHelp], scrollTop: scrollTop, setScrollTop: this.setScrollTop },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_8__["FadeIn"], { in: isVizPickerOpen, duration: 200, unmountOnExit: true, onExited: this.clearQuery },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_VizTypePicker__WEBPACK_IMPORTED_MODULE_6__["VizTypePicker"], { current: meta, onTypeChange: this.onPluginTypeChange, searchQuery: searchQuery, onClose: this.onCloseVizPicker })),
                this.renderPanelOptions())));
    };
    return VisualizationTab;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

var mapStateToProps = function (state) { return ({
    urlOpenVizPicker: !!state.location.query.openVizPicker,
}); };
var mapDispatchToProps = {
    updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_4__["updateLocation"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(app_core_utils_connectWithReduxStore__WEBPACK_IMPORTED_MODULE_3__["connectWithStore"])(VisualizationTab, mapStateToProps, mapDispatchToProps));


/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/VizPickerSearch.tsx":
/*!************************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/VizPickerSearch.tsx ***!
  \************************************************************************/
/*! exports provided: VizPickerSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VizPickerSearch", function() { return VizPickerSearch; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");



var VizPickerSearch = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(VizPickerSearch, _super);
    function VizPickerSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VizPickerSearch.prototype.render = function () {
        var _a = this.props, searchQuery = _a.searchQuery, onChange = _a.onChange, onClose = _a.onClose;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_2__["FilterInput"], { labelClassName: "gf-form--has-input-icon", inputClassName: "gf-form-input width-13", placeholder: "", onChange: onChange, value: searchQuery, ref: function (element) { return element && element.focus(); } }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-link toolbar__close", onClick: onClose },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-chevron-up" }))));
    };
    return VizPickerSearch;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/VizTypePicker.tsx":
/*!**********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/VizTypePicker.tsx ***!
  \**********************************************************************/
/*! exports provided: VizTypePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VizTypePicker", function() { return VizTypePicker; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _VizTypePickerPlugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./VizTypePickerPlugin */ "./public/app/features/dashboard/panel_editor/VizTypePickerPlugin.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");





var VizTypePicker = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(VizTypePicker, _super);
    function VizTypePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.pluginList = _this.getPanelPlugins;
        _this.renderVizPlugin = function (plugin, index) {
            var onTypeChange = _this.props.onTypeChange;
            var isCurrent = plugin.id === _this.props.current.id;
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_VizTypePickerPlugin__WEBPACK_IMPORTED_MODULE_3__["default"], { key: plugin.id, isCurrent: isCurrent, plugin: plugin, onClick: function () { return onTypeChange(plugin); } }));
        };
        _this.getFilteredPluginList = function () {
            var searchQuery = _this.props.searchQuery;
            var regex = new RegExp(searchQuery, 'i');
            var pluginList = _this.pluginList;
            var filtered = pluginList.filter(function (item) {
                return regex.test(item.name);
            });
            return filtered;
        };
        return _this;
    }
    Object.defineProperty(VizTypePicker.prototype, "maxSelectedIndex", {
        get: function () {
            var filteredPluginList = this.getFilteredPluginList();
            return filteredPluginList.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VizTypePicker.prototype, "getPanelPlugins", {
        get: function () {
            var allPanels = app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].panels;
            return Object.keys(allPanels)
                .filter(function (key) { return allPanels[key]['hideFromList'] === false; })
                .map(function (key) { return allPanels[key]; })
                .sort(function (a, b) { return a.sort - b.sort; });
        },
        enumerable: true,
        configurable: true
    });
    VizTypePicker.prototype.render = function () {
        var _this = this;
        var filteredPluginList = this.getFilteredPluginList();
        var hasResults = filteredPluginList.length > 0;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "viz-picker" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "viz-picker-list" }, hasResults ? (filteredPluginList.map(function (plugin, index) { return _this.renderVizPlugin(plugin, index); })) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["EmptySearchResult"], null, "Could not find anything matching your query")))));
    };
    return VizTypePicker;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/VizTypePickerPlugin.tsx":
/*!****************************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/VizTypePickerPlugin.tsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);


var VizTypePickerPlugin = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(function (_a) {
    var isCurrent = _a.isCurrent, plugin = _a.plugin, onClick = _a.onClick;
    var cssClass = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
        'viz-picker__item': true,
        'viz-picker__item--current': isCurrent,
    });
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: cssClass, onClick: onClick, title: plugin.name },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "viz-picker__item-name" }, plugin.name),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", { className: "viz-picker__item-img", src: plugin.info.logos.small })));
}, function (prevProps, nextProps) {
    if (prevProps.isCurrent === nextProps.isCurrent) {
        return true;
    }
    return false;
});
/* harmony default export */ __webpack_exports__["default"] = (VizTypePickerPlugin);


/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/state/actions.ts":
/*!*********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/state/actions.ts ***!
  \*********************************************************************/
/*! exports provided: refreshPanelEditor, changePanelEditorTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshPanelEditor", function() { return refreshPanelEditor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changePanelEditorTab", function() { return changePanelEditorTab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ "./public/app/features/dashboard/panel_editor/state/reducers.ts");
/* harmony import */ var _core_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../core/actions */ "./public/app/core/actions/index.ts");



var refreshPanelEditor = function (props) {
    return function (dispatch, getState) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        var activeTab, hasQueriesTab, usesGraphPlugin, alertingEnabled, tabs;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            activeTab = getState().panelEditor.activeTab || _reducers__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabIds"].Queries;
            hasQueriesTab = props.hasQueriesTab, usesGraphPlugin = props.usesGraphPlugin, alertingEnabled = props.alertingEnabled;
            tabs = [
                Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["getPanelEditorTab"])(_reducers__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabIds"].Queries),
                Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["getPanelEditorTab"])(_reducers__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabIds"].Visualization),
                Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["getPanelEditorTab"])(_reducers__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabIds"].Advanced),
            ];
            // handle panels that do not have queries tab
            if (!hasQueriesTab) {
                // remove queries tab
                tabs.shift();
                // switch tab
                if (activeTab === _reducers__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabIds"].Queries) {
                    activeTab = _reducers__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabIds"].Visualization;
                }
            }
            if (alertingEnabled && usesGraphPlugin) {
                tabs.push(Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["getPanelEditorTab"])(_reducers__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabIds"].Alert));
            }
            dispatch(Object(_reducers__WEBPACK_IMPORTED_MODULE_1__["panelEditorInitCompleted"])({ activeTab: activeTab, tabs: tabs }));
            return [2 /*return*/];
        });
    }); };
};
var changePanelEditorTab = function (activeTab) {
    return function (dispatch) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(void 0, void 0, void 0, function () {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            dispatch(Object(_core_actions__WEBPACK_IMPORTED_MODULE_2__["updateLocation"])({ query: { tab: activeTab.id, openVizPicker: null }, partial: true }));
            return [2 /*return*/];
        });
    }); };
};


/***/ }),

/***/ "./public/app/features/dashboard/panel_editor/state/selectors.ts":
/*!***********************************************************************!*\
  !*** ./public/app/features/dashboard/panel_editor/state/selectors.ts ***!
  \***********************************************************************/
/*! exports provided: getActiveTabAndTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getActiveTabAndTabs", function() { return getActiveTabAndTabs; });
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducers */ "./public/app/features/dashboard/panel_editor/state/reducers.ts");


var getActiveTabAndTabs = Object(memoize_one__WEBPACK_IMPORTED_MODULE_0__["default"])(function (location, panelEditor) {
    var panelEditorTab = panelEditor.tabs.length > 0 ? panelEditor.tabs[0].id : _reducers__WEBPACK_IMPORTED_MODULE_1__["PanelEditorTabIds"].Queries;
    return {
        activeTab: location.query.tab || panelEditorTab,
        tabs: panelEditor.tabs,
    };
});


/***/ }),

/***/ "./public/app/features/dashboard/state/initDashboard.ts":
/*!**************************************************************!*\
  !*** ./public/app/features/dashboard/state/initDashboard.ts ***!
  \**************************************************************/
/*! exports provided: initDashboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initDashboard", function() { return initDashboard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/copy/appNotification */ "./public/app/core/copy/appNotification.ts");
/* harmony import */ var app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/services/backend_srv */ "./public/app/core/services/backend_srv.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_core_utils_location_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/location_util */ "./public/app/core/utils/location_util.ts");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions */ "./public/app/features/dashboard/state/actions.ts");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _DashboardModel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DashboardModel */ "./public/app/features/dashboard/state/DashboardModel.ts");

// Services & Utils


// Actions




// Types


function redirectToNewUrl(slug, dispatch, currentPath) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function () {
        var res, newUrl, url;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().getDashboardBySlug(slug)];
                case 1:
                    res = _a.sent();
                    if (res) {
                        newUrl = res.meta.url;
                        // fix solo route urls
                        if (currentPath.indexOf('dashboard-solo') !== -1) {
                            newUrl = newUrl.replace('/d/', '/d-solo/');
                        }
                        url = app_core_utils_location_util__WEBPACK_IMPORTED_MODULE_4__["default"].stripBaseFromUrl(newUrl);
                        dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({ path: url, partial: true, replace: true }));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function fetchDashboard(args, dispatch, getState) {
    return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, Promise, function () {
        var _a, dashDTO, newUrl, loaderSrv, dashDTO, dashboardUrl, currentPath, err_1;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 8, , 9]);
                    _a = args.routeInfo;
                    switch (_a) {
                        case app_types__WEBPACK_IMPORTED_MODULE_6__["DashboardRouteInfo"].Home: return [3 /*break*/, 1];
                        case app_types__WEBPACK_IMPORTED_MODULE_6__["DashboardRouteInfo"].Normal: return [3 /*break*/, 3];
                        case app_types__WEBPACK_IMPORTED_MODULE_6__["DashboardRouteInfo"].New: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 6];
                case 1: return [4 /*yield*/, Object(app_core_services_backend_srv__WEBPACK_IMPORTED_MODULE_2__["getBackendSrv"])().get('/api/dashboards/home')];
                case 2:
                    dashDTO = _b.sent();
                    // if user specified a custom home dashboard redirect to that
                    if (dashDTO.redirectUri) {
                        newUrl = app_core_utils_location_util__WEBPACK_IMPORTED_MODULE_4__["default"].stripBaseFromUrl(dashDTO.redirectUri);
                        dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({ path: newUrl, replace: true }));
                        return [2 /*return*/, null];
                    }
                    // disable some actions on the default home dashboard
                    dashDTO.meta.canSave = false;
                    dashDTO.meta.canShare = false;
                    dashDTO.meta.canStar = false;
                    return [2 /*return*/, dashDTO];
                case 3:
                    // for old db routes we redirect
                    if (args.urlType === 'db') {
                        redirectToNewUrl(args.urlSlug, dispatch, getState().location.path);
                        return [2 /*return*/, null];
                    }
                    loaderSrv = args.$injector.get('dashboardLoaderSrv');
                    return [4 /*yield*/, loaderSrv.loadDashboard(args.urlType, args.urlSlug, args.urlUid)];
                case 4:
                    dashDTO = _b.sent();
                    if (args.fixUrl && dashDTO.meta.url) {
                        dashboardUrl = app_core_utils_location_util__WEBPACK_IMPORTED_MODULE_4__["default"].stripBaseFromUrl(dashDTO.meta.url);
                        currentPath = getState().location.path;
                        if (dashboardUrl !== currentPath) {
                            // replace url to not create additional history items and then return so that initDashboard below isn't executed multiple times.
                            dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({ path: dashboardUrl, partial: true, replace: true }));
                            return [2 /*return*/, null];
                        }
                    }
                    return [2 /*return*/, dashDTO];
                case 5:
                    {
                        return [2 /*return*/, getNewDashboardModelData(args.urlFolderId)];
                    }
                    _b.label = 6;
                case 6: throw { message: 'Unknown route ' + args.routeInfo };
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_1 = _b.sent();
                    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_5__["dashboardInitFailed"])({ message: 'Failed to fetch dashboard', error: err_1 }));
                    console.log(err_1);
                    return [2 /*return*/, null];
                case 9: return [2 /*return*/];
            }
        });
    });
}
/**
 * This action (or saga) does everything needed to bootstrap a dashboard & dashboard model.
 * First it handles the process of fetching the dashboard, correcting the url if required (causing redirects/url updates)
 *
 * This is used both for single dashboard & solo panel routes, home & new dashboard routes.
 *
 * Then it handles the initializing of the old angular services that the dashboard components & panels still depend on
 *
 */
function initDashboard(args) {
    var _this = this;
    return function (dispatch, getState) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, function () {
        var dashDTO, dashboard, storeState, timeSrv, annotationsSrv, variableSrv, keybindingSrv, unsavedChangesSrv, dashboardSrv, _a, panelId, queries, err_2, queryParams;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // set fetching state
                    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_5__["dashboardInitFetching"])());
                    // Detect slow loading / initializing and set state flag
                    // This is in order to not show loading indication for fast loading dashboards as it creates blinking/flashing
                    setTimeout(function () {
                        if (getState().dashboard.model === null) {
                            dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_5__["dashboardInitSlow"])());
                        }
                    }, 500);
                    return [4 /*yield*/, fetchDashboard(args, dispatch, getState)];
                case 1:
                    dashDTO = _b.sent();
                    // returns null if there was a redirect or error
                    if (!dashDTO) {
                        return [2 /*return*/];
                    }
                    // set initializing state
                    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_5__["dashboardInitServices"])());
                    try {
                        dashboard = new _DashboardModel__WEBPACK_IMPORTED_MODULE_7__["DashboardModel"](dashDTO.dashboard, dashDTO.meta);
                    }
                    catch (err) {
                        dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_5__["dashboardInitFailed"])({ message: 'Failed create dashboard model', error: err }));
                        console.log(err);
                        return [2 /*return*/];
                    }
                    storeState = getState();
                    if (!storeState.location.query.orgId) {
                        dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["updateLocation"])({ query: { orgId: storeState.user.orgId }, partial: true, replace: true }));
                    }
                    timeSrv = args.$injector.get('timeSrv');
                    annotationsSrv = args.$injector.get('annotationsSrv');
                    variableSrv = args.$injector.get('variableSrv');
                    keybindingSrv = args.$injector.get('keybindingSrv');
                    unsavedChangesSrv = args.$injector.get('unsavedChangesSrv');
                    dashboardSrv = args.$injector.get('dashboardSrv');
                    timeSrv.init(dashboard);
                    annotationsSrv.init(dashboard);
                    _a = storeState.dashboard.modifiedQueries, panelId = _a.panelId, queries = _a.queries;
                    dashboard.meta.fromExplore = !!(panelId && queries);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, variableSrv.init(dashboard)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _b.sent();
                    dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["notifyApp"])(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_1__["createErrorNotification"])('Templating init failed', err_2)));
                    console.log(err_2);
                    return [3 /*break*/, 5];
                case 5:
                    try {
                        dashboard.processRepeats();
                        dashboard.updateSubmenuVisibility();
                        queryParams = getState().location.query;
                        if (queryParams.autofitpanels) {
                            dashboard.autoFitPanels(window.innerHeight, queryParams.kiosk);
                        }
                        // init unsaved changes tracking
                        unsavedChangesSrv.init(dashboard, args.$scope);
                        keybindingSrv.setupDashboardBindings(args.$scope, dashboard);
                    }
                    catch (err) {
                        dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_3__["notifyApp"])(Object(app_core_copy_appNotification__WEBPACK_IMPORTED_MODULE_1__["createErrorNotification"])('Dashboard init failed', err)));
                        console.log(err);
                    }
                    if (dashboard.meta.fromExplore) {
                        updateQueriesWhenComingFromExplore(dispatch, dashboard, panelId, queries);
                    }
                    // legacy srv state
                    dashboardSrv.setCurrent(dashboard);
                    // yay we are done
                    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_5__["dashboardInitCompleted"])(dashboard));
                    return [2 /*return*/];
            }
        });
    }); };
}
function getNewDashboardModelData(urlFolderId) {
    var data = {
        meta: {
            canStar: false,
            canShare: false,
            isNew: true,
            folderId: 0,
        },
        dashboard: {
            title: 'New dashboard',
            panels: [
                {
                    type: 'add-panel',
                    gridPos: { x: 0, y: 0, w: 12, h: 9 },
                    title: 'Panel Title',
                },
            ],
        },
    };
    if (urlFolderId) {
        data.meta.folderId = parseInt(urlFolderId, 10);
    }
    return data;
}
function updateQueriesWhenComingFromExplore(dispatch, dashboard, originPanelId, queries) {
    var panelArrId = dashboard.panels.findIndex(function (panel) { return panel.id === originPanelId; });
    if (panelArrId > -1) {
        dashboard.panels[panelArrId].targets = queries;
    }
    // Clear update state now that we're done
    dispatch(Object(_actions__WEBPACK_IMPORTED_MODULE_5__["clearDashboardQueriesToUpdate"])());
}


/***/ }),

/***/ "./public/app/features/dashboard/utils/getPanelMenu.ts":
/*!*************************************************************!*\
  !*** ./public/app/features/dashboard/utils/getPanelMenu.ts ***!
  \*************************************************************/
/*! exports provided: getPanelMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPanelMenu", function() { return getPanelMenu; });
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var app_store_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/store/store */ "./public/app/store/store.ts");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/dashboard/utils/panel */ "./public/app/features/dashboard/utils/panel.ts");
/* harmony import */ var _core_services_context_srv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../core/services/context_srv */ "./public/app/core/services/context_srv.ts");
/* harmony import */ var _explore_state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../explore/state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _core_utils_explore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var _services_TimeSrv__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");









var getPanelMenu = function (dashboard, panel) {
    var onViewPanel = function (event) {
        event.preventDefault();
        app_store_store__WEBPACK_IMPORTED_MODULE_1__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_0__["updateLocation"])({
            query: {
                panelId: panel.id,
                edit: null,
                fullscreen: true,
            },
            partial: true,
        }));
    };
    var onEditPanel = function (event) {
        event.preventDefault();
        app_store_store__WEBPACK_IMPORTED_MODULE_1__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_0__["updateLocation"])({
            query: {
                panelId: panel.id,
                edit: true,
                fullscreen: true,
            },
            partial: true,
        }));
    };
    var onNewEditPanel = function (event) {
        event.preventDefault();
        app_store_store__WEBPACK_IMPORTED_MODULE_1__["store"].dispatch(Object(app_core_actions__WEBPACK_IMPORTED_MODULE_0__["updateLocation"])({
            query: {
                editPanel: panel.id,
            },
            partial: true,
        }));
    };
    var onSharePanel = function (event) {
        event.preventDefault();
        Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_4__["sharePanel"])(dashboard, panel);
    };
    var onInspectPanel = function (event) {
        event.preventDefault();
        Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getLocationSrv"])().update({
            partial: true,
            query: {
                inspect: panel.id,
            },
        });
    };
    var onMore = function (event) {
        event.preventDefault();
    };
    var onDuplicatePanel = function (event) {
        event.preventDefault();
        Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_4__["duplicatePanel"])(dashboard, panel);
    };
    var onCopyPanel = function (event) {
        event.preventDefault();
        Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_4__["copyPanel"])(panel);
    };
    var onEditPanelJson = function (event) {
        event.preventDefault();
        Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_4__["editPanelJson"])(dashboard, panel);
    };
    var onRemovePanel = function (event) {
        event.preventDefault();
        Object(app_features_dashboard_utils_panel__WEBPACK_IMPORTED_MODULE_4__["removePanel"])(dashboard, panel, true);
    };
    var onNavigateToExplore = function (event) {
        event.preventDefault();
        var openInNewWindow = event.ctrlKey || event.metaKey ? function (url) { return window.open(url); } : undefined;
        app_store_store__WEBPACK_IMPORTED_MODULE_1__["store"].dispatch(Object(_explore_state_actions__WEBPACK_IMPORTED_MODULE_6__["navigateToExplore"])(panel, { getDataSourceSrv: _grafana_runtime__WEBPACK_IMPORTED_MODULE_3__["getDataSourceSrv"], getTimeSrv: _services_TimeSrv__WEBPACK_IMPORTED_MODULE_8__["getTimeSrv"], getExploreUrl: _core_utils_explore__WEBPACK_IMPORTED_MODULE_7__["getExploreUrl"], openInNewWindow: openInNewWindow }));
    };
    var menu = [];
    menu.push({
        text: 'View',
        iconClassName: 'gicon gicon-viewer',
        onClick: onViewPanel,
        shortcut: 'v',
    });
    if (dashboard.canEditPanel(panel)) {
        menu.push({
            text: 'Edit',
            iconClassName: 'gicon gicon-editor',
            onClick: onEditPanel,
            shortcut: 'e',
        });
    }
    menu.push({
        text: 'Share',
        iconClassName: 'fa fa-fw fa-share',
        onClick: onSharePanel,
        shortcut: 'p s',
    });
    if (_core_services_context_srv__WEBPACK_IMPORTED_MODULE_5__["contextSrv"].hasAccessToExplore() && panel.datasource) {
        menu.push({
            text: 'Explore',
            iconClassName: 'gicon gicon-explore',
            shortcut: 'x',
            onClick: onNavigateToExplore,
        });
    }
    if (app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].featureToggles.inspect) {
        menu.push({
            text: 'Inspect',
            iconClassName: 'fa fa-fw fa-info-circle',
            onClick: onInspectPanel,
            shortcut: 'p i',
        });
    }
    if (app_core_config__WEBPACK_IMPORTED_MODULE_2__["default"].featureToggles.newEdit) {
        menu.push({
            text: 'New edit',
            iconClassName: 'gicon gicon-editor',
            onClick: onNewEditPanel,
            shortcut: 'p i',
        });
    }
    var subMenu = [];
    if (!panel.fullscreen && dashboard.canEditPanel(panel)) {
        subMenu.push({
            text: 'Duplicate',
            onClick: onDuplicatePanel,
            shortcut: 'p d',
        });
        subMenu.push({
            text: 'Copy',
            onClick: onCopyPanel,
        });
    }
    subMenu.push({
        text: 'Panel JSON',
        onClick: onEditPanelJson,
    });
    menu.push({
        type: 'submenu',
        text: 'More...',
        iconClassName: 'fa fa-fw fa-cube',
        subMenu: subMenu,
        onClick: onMore,
    });
    if (dashboard.canEditPanel(panel)) {
        menu.push({ type: 'divider' });
        menu.push({
            text: 'Remove',
            iconClassName: 'fa fa-fw fa-trash',
            onClick: onRemovePanel,
            shortcut: 'p r',
        });
    }
    return menu;
};


/***/ }),

/***/ "./public/app/features/panel/GeneralTabCtrl.ts":
/*!*****************************************************!*\
  !*** ./public/app/features/panel/GeneralTabCtrl.ts ***!
  \*****************************************************/
/*! exports provided: GeneralTabCtrl, generalTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralTabCtrl", function() { return GeneralTabCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generalTab", function() { return generalTab; });
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");

var obj2string = function (obj) {
    return Object.keys(obj)
        .reduce(function (acc, curr) { return acc.concat(curr + '=' + obj[curr]); }, [])
        .join();
};
var GeneralTabCtrl = /** @class */ (function () {
    /** @ngInject */
    function GeneralTabCtrl($scope) {
        var _this = this;
        this.panelCtrl = $scope.ctrl;
        var updatePanel = function () {
            console.log('panel.render()');
            _this.panelCtrl.panel.render();
        };
        var generateValueFromPanel = function (scope) {
            var panel = scope.ctrl.panel;
            var panelPropsToTrack = ['title', 'description', 'transparent', 'repeat', 'repeatDirection', 'minSpan'];
            var panelPropsString = panelPropsToTrack
                .map(function (prop) { return prop + '=' + (panel[prop] && panel[prop].toString ? panel[prop].toString() : panel[prop]); })
                .join();
            var panelLinks = panel.links || [];
            var panelLinksString = panelLinks.map(obj2string).join();
            return panelPropsString + panelLinksString;
        };
        $scope.$watch(generateValueFromPanel, updatePanel, true);
    }
    return GeneralTabCtrl;
}());

/** @ngInject */
function generalTab() {
    'use strict';
    return {
        restrict: 'E',
        templateUrl: 'public/app/features/panel/partials/general_tab.html',
        controller: GeneralTabCtrl,
    };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_0__["default"].directive('panelGeneralTab', generalTab);


/***/ }),

/***/ "./public/app/features/plugins/PluginStateInfo.tsx":
/*!*********************************************************!*\
  !*** ./public/app/features/plugins/PluginStateInfo.tsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");





function getPluginStateInfoText(state) {
    switch (state) {
        case _grafana_data__WEBPACK_IMPORTED_MODULE_3__["PluginState"].alpha:
            return 'Alpha Plugin: This plugin is a work in progress and updates may include breaking changes';
        case _grafana_data__WEBPACK_IMPORTED_MODULE_3__["PluginState"].beta:
            return 'Beta Plugin: There could be bugs and minor breaking changes to this plugin';
    }
    return null;
}
var PluginStateinfo = function (props) {
    var text = getPluginStateInfoText(props.state);
    if (!text) {
        return null;
    }
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["AlphaNotice"], { state: props.state, text: text, className: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_1 || (templateObject_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"])(["\n        margin-left: 16px;\n      "], ["\n        margin-left: 16px;\n      "]))) }));
};
/* harmony default export */ __webpack_exports__["default"] = (PluginStateinfo);
var templateObject_1;


/***/ })

}]);
//# sourceMappingURL=default~DashboardPage~SoloPanelPage.6310f9af5345c722b930.js.map