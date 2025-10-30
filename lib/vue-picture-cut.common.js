/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 41:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var defineWellKnownSymbol = __webpack_require__(6389);

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(4160);
var fill = __webpack_require__(1267);
var addToUnscopables = __webpack_require__(3331);

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ 113:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-array-prototype-lastindexof -- safe */
var apply = __webpack_require__(3663);
var toIndexedObject = __webpack_require__(5067);
var toIntegerOrInfinity = __webpack_require__(2809);
var lengthOfArrayLike = __webpack_require__(2420);
var arrayMethodIsStrict = __webpack_require__(2964);

var min = Math.min;
var $lastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = lengthOfArrayLike(O);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : $lastIndexOf;


/***/ }),

/***/ 127:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 182:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(9461);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 253:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 259:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var DOMIterables = __webpack_require__(8326);
var DOMTokenListPrototype = __webpack_require__(4938);
var ArrayIteratorMethods = __webpack_require__(8078);
var createNonEnumerableProperty = __webpack_require__(297);
var wellKnownSymbol = __webpack_require__(9461);

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ 297:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(1434);
var definePropertyModule = __webpack_require__(8247);
var createPropertyDescriptor = __webpack_require__(2062);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 357:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);
var toIntegerOrInfinity = __webpack_require__(2809);
var toString = __webpack_require__(8129);
var requireObjectCoercible = __webpack_require__(6516);

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ 378:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var $filter = (__webpack_require__(8767).filter);
var arrayMethodHasSpeciesSupport = __webpack_require__(5047);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 489:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $findIndex = (__webpack_require__(8767).findIndex);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
exportTypedArrayMethod('findIndex', function findIndex(predicate /* , thisArg */) {
  return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 569:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var floor = Math.floor;

// `%TypedArray%.prototype.reverse` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
exportTypedArrayMethod('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});


/***/ }),

/***/ 673:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(4457);
var iteratorClose = __webpack_require__(8469);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7589);
var isCallable = __webpack_require__(8559);
var create = __webpack_require__(8910);
var getPrototypeOf = __webpack_require__(5929);
var redefine = __webpack_require__(5024);
var wellKnownSymbol = __webpack_require__(9461);
var IS_PURE = __webpack_require__(6377);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  redefine(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(4457);

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 718:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7589);
var isCallable = __webpack_require__(8559);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 834:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(6242);

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

module.exports = !!webkit && +webkit[1];


/***/ }),

/***/ 874:
/***/ ((module) => {

// a string of all valid unicode whitespaces
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 920:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(4160);
var DESCRIPTORS = __webpack_require__(1434);
var ownKeys = __webpack_require__(5877);
var toIndexedObject = __webpack_require__(5067);
var getOwnPropertyDescriptorModule = __webpack_require__(8229);
var createProperty = __webpack_require__(2690);

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ 1055:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var call = __webpack_require__(4067);
var isObject = __webpack_require__(6756);
var isSymbol = __webpack_require__(5515);
var getMethod = __webpack_require__(9808);
var ordinaryToPrimitive = __webpack_require__(4128);
var wellKnownSymbol = __webpack_require__(9461);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 1098:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(3410);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 1195:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);
var fails = __webpack_require__(7589);
var isCallable = __webpack_require__(8559);
var classof = __webpack_require__(1893);
var getBuiltIn = __webpack_require__(6877);
var inspectSource = __webpack_require__(4560);

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function (argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function (argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
    // we can't check .prototype since constructors produced by .bind haven't it
  } return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
};

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ 1267:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(5895);
var toAbsoluteIndex = __webpack_require__(8460);
var lengthOfArrayLike = __webpack_require__(2420);

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ 1330:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);
var isForced = __webpack_require__(718);
var redefine = __webpack_require__(5024);
var InternalMetadataModule = __webpack_require__(7005);
var iterate = __webpack_require__(2942);
var anInstance = __webpack_require__(4849);
var isCallable = __webpack_require__(8559);
var isObject = __webpack_require__(6756);
var fails = __webpack_require__(7589);
var checkCorrectnessOfIteration = __webpack_require__(3910);
var setToStringTag = __webpack_require__(7169);
var inheritIfRequired = __webpack_require__(6841);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY]);
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  var REPLACE = isForced(
    CONSTRUCTOR_NAME,
    !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
      new NativeConstructor().entries().next();
    }))
  );

  if (REPLACE) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.enable();
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new -- required for testing
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, NativePrototype);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ 1434:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7589);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 1460:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var $map = (__webpack_require__(8767).map);
var arrayMethodHasSpeciesSupport = __webpack_require__(5047);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 1484:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(679).IteratorPrototype);
var create = __webpack_require__(8910);
var createPropertyDescriptor = __webpack_require__(2062);
var setToStringTag = __webpack_require__(7169);
var Iterators = __webpack_require__(5635);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 1572:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var getBuiltIn = __webpack_require__(6877);
var apply = __webpack_require__(3663);
var uncurryThis = __webpack_require__(5190);
var fails = __webpack_require__(7589);

var Array = global.Array;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

var FORCED = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  $({ target: 'JSON', stat: true, forced: FORCED }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      for (var i = 0, l = arguments.length, args = Array(l); i < l; i++) args[i] = arguments[i];
      var result = apply($stringify, null, args);
      return typeof result == 'string' ? replace(result, tester, fix) : result;
    }
  });
}


/***/ }),

/***/ 1610:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isConstructor = __webpack_require__(1195);
var tryToString = __webpack_require__(9141);

var TypeError = global.TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ 1612:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var fails = __webpack_require__(7589);
var isArray = __webpack_require__(6014);
var isObject = __webpack_require__(6756);
var toObject = __webpack_require__(5895);
var lengthOfArrayLike = __webpack_require__(2420);
var createProperty = __webpack_require__(2690);
var arraySpeciesCreate = __webpack_require__(6931);
var arrayMethodHasSpeciesSupport = __webpack_require__(5047);
var wellKnownSymbol = __webpack_require__(9461);
var V8_VERSION = __webpack_require__(8966);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError = global.TypeError;

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 1701:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(6756);

var floor = Math.floor;

// `IsIntegralNumber` abstract operation
// https://tc39.es/ecma262/#sec-isintegralnumber
// eslint-disable-next-line es/no-number-isinteger -- safe
module.exports = Number.isInteger || function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ 1753:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var exec = __webpack_require__(9661);

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ 1814:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(6242);
var global = __webpack_require__(5545);

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ 1829:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var getBuiltIn = __webpack_require__(6877);
var apply = __webpack_require__(3663);
var call = __webpack_require__(4067);
var uncurryThis = __webpack_require__(5190);
var IS_PURE = __webpack_require__(6377);
var DESCRIPTORS = __webpack_require__(1434);
var NATIVE_SYMBOL = __webpack_require__(3410);
var fails = __webpack_require__(7589);
var hasOwn = __webpack_require__(5743);
var isArray = __webpack_require__(6014);
var isCallable = __webpack_require__(8559);
var isObject = __webpack_require__(6756);
var isPrototypeOf = __webpack_require__(2891);
var isSymbol = __webpack_require__(5515);
var anObject = __webpack_require__(4457);
var toObject = __webpack_require__(5895);
var toIndexedObject = __webpack_require__(5067);
var toPropertyKey = __webpack_require__(7491);
var $toString = __webpack_require__(8129);
var createPropertyDescriptor = __webpack_require__(2062);
var nativeObjectCreate = __webpack_require__(8910);
var objectKeys = __webpack_require__(6510);
var getOwnPropertyNamesModule = __webpack_require__(6890);
var getOwnPropertyNamesExternal = __webpack_require__(8864);
var getOwnPropertySymbolsModule = __webpack_require__(8799);
var getOwnPropertyDescriptorModule = __webpack_require__(8229);
var definePropertyModule = __webpack_require__(8247);
var propertyIsEnumerableModule = __webpack_require__(8487);
var arraySlice = __webpack_require__(3478);
var redefine = __webpack_require__(5024);
var shared = __webpack_require__(7307);
var sharedKey = __webpack_require__(2789);
var hiddenKeys = __webpack_require__(127);
var uid = __webpack_require__(6585);
var wellKnownSymbol = __webpack_require__(9461);
var wrappedWellKnownSymbolModule = __webpack_require__(9505);
var defineWellKnownSymbol = __webpack_require__(6389);
var setToStringTag = __webpack_require__(7169);
var InternalStateModule = __webpack_require__(6527);
var $forEach = (__webpack_require__(8767).forEach);

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);

var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError = global.TypeError;
var QObject = global.QObject;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis([].push);

var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPropertyKey(P);
  anObject(Attributes);
  if (hasOwn(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (isPrototypeOf(SymbolPrototype, this)) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
      if (hasOwn(this, HIDDEN) && hasOwn(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  redefine(SymbolPrototype, 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = $toString(key);
    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (isCallable($replacer)) value = call($replacer, this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return apply($stringify, null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!SymbolPrototype[TO_PRIMITIVE]) {
  var valueOf = SymbolPrototype.valueOf;
  // eslint-disable-next-line no-unused-vars -- required for .length
  redefine(SymbolPrototype, TO_PRIMITIVE, function (hint) {
    // TODO: improve hint logic
    return call(valueOf, this);
  });
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ 1882:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(5743);
var ownKeys = __webpack_require__(5877);
var getOwnPropertyDescriptorModule = __webpack_require__(8229);
var definePropertyModule = __webpack_require__(8247);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ 1893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var TO_STRING_TAG_SUPPORT = __webpack_require__(182);
var isCallable = __webpack_require__(8559);
var classofRaw = __webpack_require__(9362);
var wellKnownSymbol = __webpack_require__(9461);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 1936:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isCallable = __webpack_require__(8559);

var String = global.String;
var TypeError = global.TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw TypeError("Can't set " + String(argument) + ' as a prototype');
};


/***/ }),

/***/ 2062:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 2151:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(4457);
var aConstructor = __webpack_require__(1610);
var wellKnownSymbol = __webpack_require__(9461);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ 2249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(9046);
var call = __webpack_require__(4067);
var aConstructor = __webpack_require__(1610);
var toObject = __webpack_require__(5895);
var lengthOfArrayLike = __webpack_require__(2420);
var getIterator = __webpack_require__(5803);
var getIteratorMethod = __webpack_require__(9925);
var isArrayIteratorMethod = __webpack_require__(2391);
var aTypedArrayConstructor = (__webpack_require__(3106).aTypedArrayConstructor);

module.exports = function from(source /* , mapfn, thisArg */) {
  var C = aConstructor(this);
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator, next;
  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    O = [];
    while (!(step = call(next, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike(O);
  result = new (aTypedArrayConstructor(C))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ 2268:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);

module.exports = global.Promise;


/***/ }),

/***/ 2334:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-iterator-helpers
var $ = __webpack_require__(4160);
var apply = __webpack_require__(3663);
var aCallable = __webpack_require__(5092);
var anObject = __webpack_require__(4457);
var createIteratorProxy = __webpack_require__(6224);
var callWithSafeIterationClosing = __webpack_require__(673);

var IteratorProxy = createIteratorProxy(function (args) {
  var iterator = this.iterator;
  var filterer = this.filterer;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(apply(next, iterator, args));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, filterer, value)) return value;
  }
});

$({ target: 'Iterator', proto: true, real: true }, {
  filter: function filter(filterer) {
    return new IteratorProxy({
      iterator: anObject(this),
      filterer: aCallable(filterer)
    });
  }
});


/***/ }),

/***/ 2391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(9461);
var Iterators = __webpack_require__(5635);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 2420:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(7104);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 2472:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $findLast = (__webpack_require__(3353).findLast);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 2491:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(5545);
var apply = __webpack_require__(3663);
var ArrayBufferViewCore = __webpack_require__(3106);
var fails = __webpack_require__(7589);
var arraySlice = __webpack_require__(3478);

var Int8Array = global.Int8Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;

// iOS Safari 6.x fails here
var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
  $toLocaleString.call(new Int8Array(1));
});

var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
exportTypedArrayMethod('toLocaleString', function toLocaleString() {
  return apply(
    $toLocaleString,
    TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
    arraySlice(arguments)
  );
}, FORCED);


/***/ }),

/***/ 2622:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7589);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ 2690:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPropertyKey = __webpack_require__(7491);
var definePropertyModule = __webpack_require__(8247);
var createPropertyDescriptor = __webpack_require__(2062);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 2738:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var defineWellKnownSymbol = __webpack_require__(6389);

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');


/***/ }),

/***/ 2784:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var aCallable = __webpack_require__(5092);
var toObject = __webpack_require__(5895);
var IndexedObject = __webpack_require__(7509);
var lengthOfArrayLike = __webpack_require__(2420);

var TypeError = global.TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};


/***/ }),

/***/ 2789:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(7307);
var uid = __webpack_require__(6585);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 2809:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- safe
  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};


/***/ }),

/***/ 2891:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 2922:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(9362);
var global = __webpack_require__(5545);

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ 2942:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var bind = __webpack_require__(9046);
var call = __webpack_require__(4067);
var anObject = __webpack_require__(4457);
var tryToString = __webpack_require__(9141);
var isArrayIteratorMethod = __webpack_require__(2391);
var lengthOfArrayLike = __webpack_require__(2420);
var isPrototypeOf = __webpack_require__(2891);
var getIterator = __webpack_require__(5803);
var getIteratorMethod = __webpack_require__(9925);
var iteratorClose = __webpack_require__(8469);

var TypeError = global.TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 2964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7589);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 2975:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $some = (__webpack_require__(8767).some);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.some` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
exportTypedArrayMethod('some', function some(callbackfn /* , thisArg */) {
  return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 3003:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(5895);
var toAbsoluteIndex = __webpack_require__(8460);
var lengthOfArrayLike = __webpack_require__(2420);

var min = Math.min;

// `Array.prototype.copyWithin` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.copywithin
// eslint-disable-next-line es/no-array-prototype-copywithin -- safe
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = lengthOfArrayLike(O);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ 3065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);

module.exports = global;


/***/ }),

/***/ 3106:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(3674);
var DESCRIPTORS = __webpack_require__(1434);
var global = __webpack_require__(5545);
var isCallable = __webpack_require__(8559);
var isObject = __webpack_require__(6756);
var hasOwn = __webpack_require__(5743);
var classof = __webpack_require__(1893);
var tryToString = __webpack_require__(9141);
var createNonEnumerableProperty = __webpack_require__(297);
var redefine = __webpack_require__(5024);
var defineProperty = (__webpack_require__(8247).f);
var isPrototypeOf = __webpack_require__(2891);
var getPrototypeOf = __webpack_require__(5929);
var setPrototypeOf = __webpack_require__(3285);
var wellKnownSymbol = __webpack_require__(9461);
var uid = __webpack_require__(6585);

var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = uid('TYPED_ARRAY_CONSTRUCTOR');
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) { /* empty */ }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) createNonEnumerableProperty(Prototype, TYPED_ARRAY_CONSTRUCTOR, Constructor);
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ 3210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var apply = __webpack_require__(3663);
var $lastIndexOf = __webpack_require__(113);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
exportTypedArrayMethod('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  var length = arguments.length;
  return apply($lastIndexOf, aTypedArray(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
});


/***/ }),

/***/ 3283:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(1434);
var fails = __webpack_require__(7589);
var createElement = __webpack_require__(7981);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 3285:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(5190);
var anObject = __webpack_require__(4457);
var aPossiblePrototype = __webpack_require__(1936);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 3331:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(9461);
var create = __webpack_require__(8910);
var definePropertyModule = __webpack_require__(8247);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 3353:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(9046);
var IndexedObject = __webpack_require__(7509);
var toObject = __webpack_require__(5895);
var lengthOfArrayLike = __webpack_require__(2420);

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE == 1;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var index = lengthOfArrayLike(self);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

module.exports = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod(1)
};


/***/ }),

/***/ 3366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySlice = __webpack_require__(3478);

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ 3384:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineProperty = (__webpack_require__(8247).f);
var create = __webpack_require__(8910);
var redefineAll = __webpack_require__(8314);
var bind = __webpack_require__(9046);
var anInstance = __webpack_require__(4849);
var iterate = __webpack_require__(2942);
var defineIterator = __webpack_require__(5020);
var setSpecies = __webpack_require__(3431);
var DESCRIPTORS = __webpack_require__(1434);
var fastKey = (__webpack_require__(7005).fastKey);
var InternalStateModule = __webpack_require__(6527);

var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor = wrapper(function (that, iterable) {
      anInstance(that, Prototype);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var Prototype = Constructor.prototype;

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(Prototype, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(Prototype, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(Prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return Constructor;
  },
  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
    // https://tc39.es/ecma262/#sec-map.prototype.entries
    // https://tc39.es/ecma262/#sec-map.prototype.keys
    // https://tc39.es/ecma262/#sec-map.prototype.values
    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
    // https://tc39.es/ecma262/#sec-set.prototype.entries
    // https://tc39.es/ecma262/#sec-set.prototype.keys
    // https://tc39.es/ecma262/#sec-set.prototype.values
    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // `{ Map, Set }.prototype[@@species]` accessors
    // https://tc39.es/ecma262/#sec-get-map-@@species
    // https://tc39.es/ecma262/#sec-get-set-@@species
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ 3391:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var uncurryThis = __webpack_require__(5190);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var $join = uncurryThis([].join);

// `%TypedArray%.prototype.join` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
exportTypedArrayMethod('join', function join(separator) {
  return $join(aTypedArray(this), separator);
});


/***/ }),

/***/ 3410:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(8966);
var fails = __webpack_require__(7589);

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 3431:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(6877);
var definePropertyModule = __webpack_require__(8247);
var wellKnownSymbol = __webpack_require__(9461);
var DESCRIPTORS = __webpack_require__(1434);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ 3478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);

module.exports = uncurryThis([].slice);


/***/ }),

/***/ 3522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);

// `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue
module.exports = uncurryThis(1.0.valueOf);


/***/ }),

/***/ 3598:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 3620:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var uncurryThis = __webpack_require__(5190);
var IndexedObject = __webpack_require__(7509);
var toIndexedObject = __webpack_require__(5067);
var arrayMethodIsStrict = __webpack_require__(2964);

var un$Join = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 3657:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__(4160);
var DESCRIPTORS = __webpack_require__(1434);
var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);
var hasOwn = __webpack_require__(5743);
var isCallable = __webpack_require__(8559);
var isPrototypeOf = __webpack_require__(2891);
var toString = __webpack_require__(8129);
var defineProperty = (__webpack_require__(8247).f);
var copyConstructorProperties = __webpack_require__(1882);

var NativeSymbol = global.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0]);
    var result = isPrototypeOf(SymbolPrototype, this)
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;

  var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
  var symbolToString = uncurryThis(SymbolPrototype.toString);
  var symbolValueOf = uncurryThis(SymbolPrototype.valueOf);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace = uncurryThis(''.replace);
  var stringSlice = uncurryThis(''.slice);

  defineProperty(SymbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = symbolValueOf(this);
      var string = symbolToString(symbol);
      if (hasOwn(EmptyStringDescriptionStore, symbol)) return '';
      var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ 3663:
/***/ ((module) => {

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (bind ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 3674:
/***/ ((module) => {

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ 3804:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var isArray = __webpack_require__(6014);
var isConstructor = __webpack_require__(1195);
var isObject = __webpack_require__(6756);
var toAbsoluteIndex = __webpack_require__(8460);
var lengthOfArrayLike = __webpack_require__(2420);
var toIndexedObject = __webpack_require__(5067);
var createProperty = __webpack_require__(2690);
var wellKnownSymbol = __webpack_require__(9461);
var arrayMethodHasSpeciesSupport = __webpack_require__(5047);
var un$Slice = __webpack_require__(3478);

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ 3901:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(6242);

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ 3910:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(9461);

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 3919:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var toPositiveInteger = __webpack_require__(6728);

var RangeError = global.RangeError;

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ 4067:
/***/ ((module) => {

var call = Function.prototype.call;

module.exports = call.bind ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 4112:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var toLength = __webpack_require__(7104);
var toAbsoluteIndex = __webpack_require__(8460);
var typedArraySpeciesConstructor = __webpack_require__(5918);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.subarray` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
exportTypedArrayMethod('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  var C = typedArraySpeciesConstructor(O);
  return new C(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});


/***/ }),

/***/ 4128:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var call = __webpack_require__(4067);
var isCallable = __webpack_require__(8559);
var isObject = __webpack_require__(6756);

var TypeError = global.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 4160:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var getOwnPropertyDescriptor = (__webpack_require__(8229).f);
var createNonEnumerableProperty = __webpack_require__(297);
var redefine = __webpack_require__(5024);
var setGlobal = __webpack_require__(3598);
var copyConstructorProperties = __webpack_require__(1882);
var isForced = __webpack_require__(718);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 4261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $forEach = (__webpack_require__(8767).forEach);
var arrayMethodIsStrict = __webpack_require__(2964);

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ 4294:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var exportTypedArrayMethod = (__webpack_require__(3106).exportTypedArrayMethod);
var fails = __webpack_require__(7589);
var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);

var Uint8Array = global.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var join = uncurryThis([].join);

if (fails(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return join(this);
  };
}

var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

// `%TypedArray%.prototype.toString` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);


/***/ }),

/***/ 4333:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var typedArraySpeciesConstructor = __webpack_require__(5918);
var fails = __webpack_require__(7589);
var arraySlice = __webpack_require__(3478);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
exportTypedArrayMethod('slice', function slice(start, end) {
  var list = arraySlice(aTypedArray(this), start, end);
  var C = typedArraySpeciesConstructor(this);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);


/***/ }),

/***/ 4380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);
var requireObjectCoercible = __webpack_require__(6516);
var toString = __webpack_require__(8129);
var whitespaces = __webpack_require__(874);

var replace = uncurryThis(''.replace);
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = toString(requireObjectCoercible($this));
    if (TYPE & 1) string = replace(string, ltrim, '');
    if (TYPE & 2) string = replace(string, rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ 4384:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(1434);
var FUNCTION_NAME_EXISTS = (__webpack_require__(8812).EXISTS);
var uncurryThis = __webpack_require__(5190);
var defineProperty = (__webpack_require__(8247).f);

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /^\s*function ([^ (]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 4450:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);
var hasOwn = __webpack_require__(5743);
var toIndexedObject = __webpack_require__(5067);
var indexOf = (__webpack_require__(8287).indexOf);
var hiddenKeys = __webpack_require__(127);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 4457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isObject = __webpack_require__(6756);

var String = global.String;
var TypeError = global.TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};


/***/ }),

/***/ 4560:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);
var isCallable = __webpack_require__(8559);
var store = __webpack_require__(8795);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 4651:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var $find = (__webpack_require__(8767).find);
var addToUnscopables = __webpack_require__(3331);

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ 4715:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var apply = __webpack_require__(3663);
var bind = __webpack_require__(9046);
var isCallable = __webpack_require__(8559);
var hasOwn = __webpack_require__(5743);
var fails = __webpack_require__(7589);
var html = __webpack_require__(8647);
var arraySlice = __webpack_require__(3478);
var createElement = __webpack_require__(7981);
var IS_IOS = __webpack_require__(3901);
var IS_NODE = __webpack_require__(2922);

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(isCallable(fn) ? fn : Function(fn), undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 4756:
/***/ ((module) => {

module.exports = function (Constructor, list) {
  var index = 0;
  var length = list.length;
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};


/***/ }),

/***/ 4823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-new -- required for testing */
var global = __webpack_require__(5545);
var fails = __webpack_require__(7589);
var checkCorrectnessOfIteration = __webpack_require__(3910);
var NATIVE_ARRAY_BUFFER_VIEWS = (__webpack_require__(3106).NATIVE_ARRAY_BUFFER_VIEWS);

var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ 4849:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isPrototypeOf = __webpack_require__(2891);

var TypeError = global.TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw TypeError('Incorrect invocation');
};


/***/ }),

/***/ 4938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__(7981);

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ 4990:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var lengthOfArrayLike = __webpack_require__(2420);
var toIntegerOrInfinity = __webpack_require__(2809);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod('at', function at(index) {
  var O = aTypedArray(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});


/***/ }),

/***/ 5008:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var IS_PURE = __webpack_require__(6377);
var global = __webpack_require__(5545);
var getBuiltIn = __webpack_require__(6877);
var call = __webpack_require__(4067);
var NativePromise = __webpack_require__(2268);
var redefine = __webpack_require__(5024);
var redefineAll = __webpack_require__(8314);
var setPrototypeOf = __webpack_require__(3285);
var setToStringTag = __webpack_require__(7169);
var setSpecies = __webpack_require__(3431);
var aCallable = __webpack_require__(5092);
var isCallable = __webpack_require__(8559);
var isObject = __webpack_require__(6756);
var anInstance = __webpack_require__(4849);
var inspectSource = __webpack_require__(4560);
var iterate = __webpack_require__(2942);
var checkCorrectnessOfIteration = __webpack_require__(3910);
var speciesConstructor = __webpack_require__(2151);
var task = (__webpack_require__(4715).set);
var microtask = __webpack_require__(5389);
var promiseResolve = __webpack_require__(7728);
var hostReportErrors = __webpack_require__(5639);
var newPromiseCapabilityModule = __webpack_require__(5209);
var perform = __webpack_require__(253);
var InternalStateModule = __webpack_require__(6527);
var isForced = __webpack_require__(718);
var wellKnownSymbol = __webpack_require__(9461);
var IS_BROWSER = __webpack_require__(6200);
var IS_NODE = __webpack_require__(2922);
var V8_VERSION = __webpack_require__(8966);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromisePrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            call(then, result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromisePrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromisePrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reactions = state.reactions;
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
      reaction.fail = isCallable(onRejected) && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      reactions[reactions.length] = reaction;
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 5020:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var call = __webpack_require__(4067);
var IS_PURE = __webpack_require__(6377);
var FunctionName = __webpack_require__(8812);
var isCallable = __webpack_require__(8559);
var createIteratorConstructor = __webpack_require__(1484);
var getPrototypeOf = __webpack_require__(5929);
var setPrototypeOf = __webpack_require__(3285);
var setToStringTag = __webpack_require__(7169);
var createNonEnumerableProperty = __webpack_require__(297);
var redefine = __webpack_require__(5024);
var wellKnownSymbol = __webpack_require__(9461);
var Iterators = __webpack_require__(5635);
var IteratorsCore = __webpack_require__(679);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          redefine(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    redefine(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ 5022:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $includes = (__webpack_require__(8287).includes);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.includes` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
exportTypedArrayMethod('includes', function includes(searchElement /* , fromIndex */) {
  return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 5024:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isCallable = __webpack_require__(8559);
var hasOwn = __webpack_require__(5743);
var createNonEnumerableProperty = __webpack_require__(297);
var setGlobal = __webpack_require__(3598);
var inspectSource = __webpack_require__(4560);
var InternalStateModule = __webpack_require__(6527);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(8812).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;
  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
      createNonEnumerableProperty(value, 'name', name);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ 5047:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7589);
var wellKnownSymbol = __webpack_require__(9461);
var V8_VERSION = __webpack_require__(8966);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 5067:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7509);
var requireObjectCoercible = __webpack_require__(6516);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 5092:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isCallable = __webpack_require__(8559);
var tryToString = __webpack_require__(9141);

var TypeError = global.TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 5113:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $findLastIndex = (__webpack_require__(3353).findLastIndex);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 5190:
/***/ ((module) => {

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var callBind = bind && bind.bind(call);

module.exports = bind ? function (fn) {
  return fn && callBind(call, fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aCallable = __webpack_require__(5092);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 5226:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
var fails = __webpack_require__(7589);

module.exports = fails(function () {
  if (typeof ArrayBuffer == 'function') {
    var buffer = new ArrayBuffer(8);
    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  }
});


/***/ }),

/***/ 5237:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var call = __webpack_require__(4067);
var DESCRIPTORS = __webpack_require__(1434);
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(4823);
var ArrayBufferViewCore = __webpack_require__(3106);
var ArrayBufferModule = __webpack_require__(9468);
var anInstance = __webpack_require__(4849);
var createPropertyDescriptor = __webpack_require__(2062);
var createNonEnumerableProperty = __webpack_require__(297);
var isIntegralNumber = __webpack_require__(1701);
var toLength = __webpack_require__(7104);
var toIndex = __webpack_require__(6794);
var toOffset = __webpack_require__(3919);
var toPropertyKey = __webpack_require__(7491);
var hasOwn = __webpack_require__(5743);
var classof = __webpack_require__(1893);
var isObject = __webpack_require__(6756);
var isSymbol = __webpack_require__(5515);
var create = __webpack_require__(8910);
var isPrototypeOf = __webpack_require__(2891);
var setPrototypeOf = __webpack_require__(3285);
var getOwnPropertyNames = (__webpack_require__(6890).f);
var typedArrayFrom = __webpack_require__(2249);
var forEach = (__webpack_require__(8767).forEach);
var setSpecies = __webpack_require__(3431);
var definePropertyModule = __webpack_require__(8247);
var getOwnPropertyDescriptorModule = __webpack_require__(8229);
var InternalStateModule = __webpack_require__(6527);
var inheritIfRequired = __webpack_require__(6841);

var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError = global.RangeError;
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer.prototype;
var DataView = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore.TypedArray;
var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore.isTypedArray;
var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
var WRONG_LENGTH = 'Wrong length';

var fromList = function (C, list) {
  aTypedArrayConstructor(C);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index) result[index] = list[index++];
  return result;
};

var addGetter = function (it, key) {
  nativeDefineProperty(it, key, { get: function () {
    return getInternalState(this)[key];
  } });
};

var isArrayBuffer = function (it) {
  var klass;
  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
};

var isTypedArrayIndex = function (target, key) {
  return isTypedArray(target)
    && !isSymbol(key)
    && key in target
    && isIntegralNumber(+key)
    && key >= 0;
};

var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key)
    ? createPropertyDescriptor(2, target[key])
    : nativeGetOwnPropertyDescriptor(target, key);
};

var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
  key = toPropertyKey(key);
  if (isTypedArrayIndex(target, key)
    && isObject(descriptor)
    && hasOwn(descriptor, 'value')
    && !hasOwn(descriptor, 'get')
    && !hasOwn(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable
    && (!hasOwn(descriptor, 'writable') || descriptor.writable)
    && (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)
  ) {
    target[key] = descriptor.value;
    return target;
  } return nativeDefineProperty(target, key, descriptor);
};

if (DESCRIPTORS) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  module.exports = function (TYPE, wrapper, CLAMPED) {
    var BYTES = TYPE.match(/\d+$/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
        anInstance(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired(function () {
          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
          if (isArrayBuffer(data)) return $length !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
            : typedArrayOffset !== undefined
              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
              : new NativeTypedArrayConstructor(data);
          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
          return call(typedArrayFrom, TypedArrayConstructor, data);
        }(), dummy, TypedArrayConstructor);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR, TypedArrayConstructor);

    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ 5291:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var createTypedArrayConstructor = __webpack_require__(5237);

// `Uint8Array` constructor
// https://tc39.es/ecma262/#sec-typedarray-objects
createTypedArrayConstructor('Uint8', function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 5389:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var bind = __webpack_require__(9046);
var getOwnPropertyDescriptor = (__webpack_require__(8229).f);
var macrotask = (__webpack_require__(4715).set);
var IS_IOS = __webpack_require__(3901);
var IS_IOS_PEBBLE = __webpack_require__(1814);
var IS_WEBOS_WEBKIT = __webpack_require__(9555);
var IS_NODE = __webpack_require__(2922);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ 5498:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(1434);
var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);
var isForced = __webpack_require__(718);
var redefine = __webpack_require__(5024);
var hasOwn = __webpack_require__(5743);
var inheritIfRequired = __webpack_require__(6841);
var isPrototypeOf = __webpack_require__(2891);
var isSymbol = __webpack_require__(5515);
var toPrimitive = __webpack_require__(1055);
var fails = __webpack_require__(7589);
var getOwnPropertyNames = (__webpack_require__(6890).f);
var getOwnPropertyDescriptor = (__webpack_require__(8229).f);
var defineProperty = (__webpack_require__(8247).f);
var thisNumberValue = __webpack_require__(3522);
var trim = (__webpack_require__(4380).trim);

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError = global.TypeError;
var arraySlice = uncurryThis(''.slice);
var charCodeAt = uncurryThis(''.charCodeAt);

// `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric
var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
};

// `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError('Cannot convert a Symbol value to a number');
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = arraySlice(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt(digits, index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this;
    // check on 1..constructor(foo) case
    return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ 5515:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var getBuiltIn = __webpack_require__(6877);
var isCallable = __webpack_require__(8559);
var isPrototypeOf = __webpack_require__(2891);
var USE_SYMBOL_AS_UID = __webpack_require__(1098);

var Object = global.Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};


/***/ }),

/***/ 5545:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 5554:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var call = __webpack_require__(4067);
var $fill = __webpack_require__(1267);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.fill` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
exportTypedArrayMethod('fill', function fill(value /* , start, end */) {
  var length = arguments.length;
  return call(
    $fill,
    aTypedArray(this),
    value,
    length > 1 ? arguments[1] : undefined,
    length > 2 ? arguments[2] : undefined
  );
});


/***/ }),

/***/ 5575:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-iterator-helpers
var $ = __webpack_require__(4160);
var iterate = __webpack_require__(2942);
var aCallable = __webpack_require__(5092);
var anObject = __webpack_require__(4457);

$({ target: 'Iterator', proto: true, real: true }, {
  find: function find(fn) {
    anObject(this);
    aCallable(fn);
    return iterate(this, function (value, stop) {
      if (fn(value)) return stop(value);
    }, { IS_ITERATOR: true, INTERRUPTED: true }).result;
  }
});


/***/ }),

/***/ 5581:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7589);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 5635:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 5639:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ 5729:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7589);
var global = __webpack_require__(5545);

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ 5743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);
var toObject = __webpack_require__(5895);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 5751:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(5545);
var ArrayBufferViewCore = __webpack_require__(3106);
var lengthOfArrayLike = __webpack_require__(2420);
var toOffset = __webpack_require__(3919);
var toObject = __webpack_require__(5895);
var fails = __webpack_require__(7589);

var RangeError = global.RangeError;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var FORCED = fails(function () {
  // eslint-disable-next-line es/no-typed-arrays -- required for testing
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);


/***/ }),

/***/ 5803:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var call = __webpack_require__(4067);
var aCallable = __webpack_require__(5092);
var anObject = __webpack_require__(4457);
var tryToString = __webpack_require__(9141);
var getIteratorMethod = __webpack_require__(9925);

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 5877:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(6877);
var uncurryThis = __webpack_require__(5190);
var getOwnPropertyNamesModule = __webpack_require__(6890);
var getOwnPropertySymbolsModule = __webpack_require__(8799);
var anObject = __webpack_require__(4457);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 5895:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var requireObjectCoercible = __webpack_require__(6516);

var Object = global.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 5912:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $every = (__webpack_require__(8767).every);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.every` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
exportTypedArrayMethod('every', function every(callbackfn /* , thisArg */) {
  return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 5918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ArrayBufferViewCore = __webpack_require__(3106);
var speciesConstructor = __webpack_require__(2151);

var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore.TYPED_ARRAY_CONSTRUCTOR;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

// a part of `TypedArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#typedarray-species-create
module.exports = function (originalArray) {
  return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
};


/***/ }),

/***/ 5929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var hasOwn = __webpack_require__(5743);
var isCallable = __webpack_require__(8559);
var toObject = __webpack_require__(5895);
var sharedKey = __webpack_require__(2789);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(5581);

var IE_PROTO = sharedKey('IE_PROTO');
var Object = global.Object;
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 6014:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(9362);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 6015:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var fails = __webpack_require__(7589);
var global = __webpack_require__(5545);

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

exports.UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ 6059:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var collection = __webpack_require__(1330);
var collectionStrong = __webpack_require__(3384);

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);


/***/ }),

/***/ 6134:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(4160);
var toObject = __webpack_require__(5895);
var nativeKeys = __webpack_require__(6510);
var fails = __webpack_require__(7589);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ 6200:
/***/ ((module) => {

module.exports = typeof window == 'object';


/***/ }),

/***/ 6210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var DOMIterables = __webpack_require__(8326);
var DOMTokenListPrototype = __webpack_require__(4938);
var forEach = __webpack_require__(4261);
var createNonEnumerableProperty = __webpack_require__(297);

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ 6224:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var call = __webpack_require__(4067);
var aCallable = __webpack_require__(5092);
var anObject = __webpack_require__(4457);
var create = __webpack_require__(8910);
var createNonEnumerableProperty = __webpack_require__(297);
var redefineAll = __webpack_require__(8314);
var wellKnownSymbol = __webpack_require__(9461);
var InternalStateModule = __webpack_require__(6527);
var getMethod = __webpack_require__(9808);
var IteratorPrototype = (__webpack_require__(679).IteratorPrototype);

var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.get;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (nextHandler, IS_ITERATOR) {
  var IteratorProxy = function Iterator(state) {
    state.next = aCallable(state.iterator.next);
    state.done = false;
    state.ignoreArg = !IS_ITERATOR;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = redefineAll(create(IteratorPrototype), {
    next: function next(arg) {
      var state = getInternalState(this);
      var args = arguments.length ? [state.ignoreArg ? undefined : arg] : IS_ITERATOR ? [] : [undefined];
      state.ignoreArg = false;
      var result = state.done ? undefined : call(nextHandler, state, args);
      return { done: state.done, value: result };
    },
    'return': function (value) {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      var $$return = getMethod(iterator, 'return');
      return { done: true, value: $$return ? anObject(call($$return, iterator, value)).value : value };
    },
    'throw': function (value) {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      var $$throw = getMethod(iterator, 'throw');
      if ($$throw) return call($$throw, iterator, value);
      throw value;
    }
  });

  if (!IS_ITERATOR) {
    createNonEnumerableProperty(IteratorProxy.prototype, TO_STRING_TAG, 'Generator');
  }

  return IteratorProxy;
};


/***/ }),

/***/ 6242:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(6877);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 6312:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(4160);
var from = __webpack_require__(8898);
var checkCorrectnessOfIteration = __webpack_require__(3910);

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ 6344:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $find = (__webpack_require__(8767).find);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.find` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
exportTypedArrayMethod('find', function find(predicate /* , thisArg */) {
  return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 6348:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// IEEE754 conversions based on https://github.com/feross/ieee754
var global = __webpack_require__(5545);

var Array = global.Array;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

var pack = function (number, mantissaLength, bytes) {
  var buffer = Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare -- NaN check
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare -- NaN check
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpack = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

module.exports = {
  pack: pack,
  unpack: unpack
};


/***/ }),

/***/ 6377:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 6389:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(3065);
var hasOwn = __webpack_require__(5743);
var wrappedWellKnownSymbolModule = __webpack_require__(9505);
var defineProperty = (__webpack_require__(8247).f);

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ 6443:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(1434);
var uncurryThis = __webpack_require__(5190);
var call = __webpack_require__(4067);
var fails = __webpack_require__(7589);
var objectKeys = __webpack_require__(6510);
var getOwnPropertySymbolsModule = __webpack_require__(8799);
var propertyIsEnumerableModule = __webpack_require__(8487);
var toObject = __webpack_require__(5895);
var IndexedObject = __webpack_require__(7509);

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 6501:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isCallable = __webpack_require__(8559);
var inspectSource = __webpack_require__(4560);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 6510:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(4450);
var enumBugKeys = __webpack_require__(9049);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 6516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);

var TypeError = global.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6527:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(6501);
var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);
var isObject = __webpack_require__(6756);
var createNonEnumerableProperty = __webpack_require__(297);
var hasOwn = __webpack_require__(5743);
var shared = __webpack_require__(8795);
var sharedKey = __webpack_require__(2789);
var hiddenKeys = __webpack_require__(127);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 6585:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 6659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isArray = __webpack_require__(6014);
var isConstructor = __webpack_require__(1195);
var isObject = __webpack_require__(6756);
var wellKnownSymbol = __webpack_require__(9461);

var SPECIES = wellKnownSymbol('species');
var Array = global.Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 6681:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $reduce = (__webpack_require__(2784).left);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduce` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
exportTypedArrayMethod('reduce', function reduce(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduce(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 6688:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var UA = __webpack_require__(6242);

module.exports = /MSIE|Trident/.test(UA);


/***/ }),

/***/ 6728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var toIntegerOrInfinity = __webpack_require__(2809);

var RangeError = global.RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ 6733:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);
var PROPER_FUNCTION_NAME = (__webpack_require__(8812).PROPER);
var ArrayBufferViewCore = __webpack_require__(3106);
var ArrayIterators = __webpack_require__(8078);
var wellKnownSymbol = __webpack_require__(9461);

var ITERATOR = wellKnownSymbol('iterator');
var Uint8Array = global.Uint8Array;
var arrayValues = uncurryThis(ArrayIterators.values);
var arrayKeys = uncurryThis(ArrayIterators.keys);
var arrayEntries = uncurryThis(ArrayIterators.entries);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var PROPER_ARRAY_VALUES_NAME = !!nativeTypedArrayIterator && nativeTypedArrayIterator.name === 'values';

var typedArrayValues = function values() {
  return arrayValues(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
exportTypedArrayMethod('entries', function entries() {
  return arrayEntries(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
exportTypedArrayMethod('keys', function keys() {
  return arrayKeys(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
exportTypedArrayMethod('values', typedArrayValues, PROPER_FUNCTION_NAME && !PROPER_ARRAY_VALUES_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
exportTypedArrayMethod(ITERATOR, typedArrayValues, PROPER_FUNCTION_NAME && !PROPER_ARRAY_VALUES_NAME);


/***/ }),

/***/ 6756:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(8559);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 6794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var toIntegerOrInfinity = __webpack_require__(2809);
var toLength = __webpack_require__(7104);

var RangeError = global.RangeError;

// `ToIndex` abstract operation
// https://tc39.es/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toIntegerOrInfinity(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ 6841:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(8559);
var isObject = __webpack_require__(6756);
var setPrototypeOf = __webpack_require__(3285);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 6877:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isCallable = __webpack_require__(8559);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 6890:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(4450);
var enumBugKeys = __webpack_require__(9049);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 6931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(6659);

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ 6955:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var uncurryThis = __webpack_require__(5190);
var fails = __webpack_require__(7589);
var ArrayBufferModule = __webpack_require__(9468);
var anObject = __webpack_require__(4457);
var toAbsoluteIndex = __webpack_require__(8460);
var toLength = __webpack_require__(7104);
var speciesConstructor = __webpack_require__(2151);

var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var DataViewPrototype = DataView.prototype;
var un$ArrayBufferSlice = uncurryThis(ArrayBuffer.prototype.slice);
var getUint8 = uncurryThis(DataViewPrototype.getUint8);
var setUint8 = uncurryThis(DataViewPrototype.setUint8);

var INCORRECT_SLICE = fails(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
$({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (un$ArrayBufferSlice && end === undefined) {
      return un$ArrayBufferSlice(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      setUint8(viewTarget, index++, getUint8(viewSource, first++));
    } return result;
  }
});


/***/ }),

/***/ 7005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(4160);
var uncurryThis = __webpack_require__(5190);
var hiddenKeys = __webpack_require__(127);
var isObject = __webpack_require__(6756);
var hasOwn = __webpack_require__(5743);
var defineProperty = (__webpack_require__(8247).f);
var getOwnPropertyNamesModule = __webpack_require__(6890);
var getOwnPropertyNamesExternalModule = __webpack_require__(8864);
var isExtensible = __webpack_require__(8110);
var uid = __webpack_require__(6585);
var FREEZING = __webpack_require__(2622);

var REQUIRED = false;
var METADATA = uid('meta');
var id = 0;

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + id++, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!hasOwn(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  return it;
};

var enable = function () {
  meta.enable = function () { /* empty */ };
  REQUIRED = true;
  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  var splice = uncurryThis([].splice);
  var test = {};
  test[METADATA] = 1;

  // prevent exposing of metadata key
  if (getOwnPropertyNames(test).length) {
    getOwnPropertyNamesModule.f = function (it) {
      var result = getOwnPropertyNames(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice(result, i, 1);
          break;
        }
      } return result;
    };

    $({ target: 'Object', stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};

var meta = module.exports = {
  enable: enable,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;


/***/ }),

/***/ 7010:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $reduceRight = (__webpack_require__(2784).right);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
exportTypedArrayMethod('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  var length = arguments.length;
  return $reduceRight(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 7041:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var TO_STRING_TAG_SUPPORT = __webpack_require__(182);
var redefine = __webpack_require__(5024);
var toString = __webpack_require__(7465);

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ 7096:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-iterator-helpers
var $ = __webpack_require__(4160);
var apply = __webpack_require__(3663);
var aCallable = __webpack_require__(5092);
var anObject = __webpack_require__(4457);
var createIteratorProxy = __webpack_require__(6224);
var callWithSafeIterationClosing = __webpack_require__(673);

var IteratorProxy = createIteratorProxy(function (args) {
  var iterator = this.iterator;
  var result = anObject(apply(this.next, iterator, args));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, result.value);
});

$({ target: 'Iterator', proto: true, real: true }, {
  map: function map(mapper) {
    return new IteratorProxy({
      iterator: anObject(this),
      mapper: aCallable(mapper)
    });
  }
});


/***/ }),

/***/ 7104:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(2809);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7169:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = (__webpack_require__(8247).f);
var hasOwn = __webpack_require__(5743);
var wellKnownSymbol = __webpack_require__(9461);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !hasOwn(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 7304:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(6242);

var firefox = userAgent.match(/firefox\/(\d+)/i);

module.exports = !!firefox && +firefox[1];


/***/ }),

/***/ 7307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6377);
var store = __webpack_require__(8795);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.19.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 7393:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $indexOf = (__webpack_require__(8287).indexOf);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
exportTypedArrayMethod('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 7395:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(4160);
var assign = __webpack_require__(6443);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ 7465:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(182);
var classof = __webpack_require__(1893);

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ 7491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(1055);
var isSymbol = __webpack_require__(5515);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 7509:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);
var fails = __webpack_require__(7589);
var classof = __webpack_require__(9362);

var Object = global.Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 7524:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7589);
var global = __webpack_require__(5545);

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ 7589:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 7728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(4457);
var isObject = __webpack_require__(6756);
var newPromiseCapability = __webpack_require__(5209);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 7779:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);
var fails = __webpack_require__(7589);
var aCallable = __webpack_require__(5092);
var internalSort = __webpack_require__(3366);
var ArrayBufferViewCore = __webpack_require__(3106);
var FF = __webpack_require__(7304);
var IE_OR_EDGE = __webpack_require__(6688);
var V8 = __webpack_require__(8966);
var WEBKIT = __webpack_require__(834);

var Array = global.Array;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var Uint16Array = global.Uint16Array;
var un$Sort = Uint16Array && uncurryThis(Uint16Array.prototype.sort);

// WebKit
var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails(function () {
  un$Sort(new Uint16Array(2), null);
}) && fails(function () {
  un$Sort(new Uint16Array(2), {});
}));

var STABLE_SORT = !!un$Sort && !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 74;
  if (FF) return FF < 67;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 602;

  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;

  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }

  un$Sort(array, function (a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });

  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index]) return true;
  }
});

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (y !== y) return -1;
    // eslint-disable-next-line no-self-compare -- NaN check
    if (x !== x) return 1;
    if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};

// `%TypedArray%.prototype.sort` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
exportTypedArrayMethod('sort', function sort(comparefn) {
  if (comparefn !== undefined) aCallable(comparefn);
  if (STABLE_SORT) return un$Sort(this, comparefn);

  return internalSort(aTypedArray(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);


/***/ }),

/***/ 7899:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(5190);
var PROPER_FUNCTION_NAME = (__webpack_require__(8812).PROPER);
var redefine = __webpack_require__(5024);
var anObject = __webpack_require__(4457);
var isPrototypeOf = __webpack_require__(2891);
var $toString = __webpack_require__(8129);
var fails = __webpack_require__(7589);
var regExpFlags = __webpack_require__(697);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];
var getFlags = uncurryThis(regExpFlags);

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && isPrototypeOf(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ 7981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var isObject = __webpack_require__(6756);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 7995:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(1434);
var definePropertyModule = __webpack_require__(8247);
var anObject = __webpack_require__(4457);
var toIndexedObject = __webpack_require__(5067);
var objectKeys = __webpack_require__(6510);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 8018:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-iterator-helpers
var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var anInstance = __webpack_require__(4849);
var isCallable = __webpack_require__(8559);
var createNonEnumerableProperty = __webpack_require__(297);
var fails = __webpack_require__(7589);
var hasOwn = __webpack_require__(5743);
var wellKnownSymbol = __webpack_require__(9461);
var IteratorPrototype = (__webpack_require__(679).IteratorPrototype);
var IS_PURE = __webpack_require__(6377);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var NativeIterator = global.Iterator;

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) {
  createNonEnumerableProperty(IteratorPrototype, TO_STRING_TAG, 'Iterator');
}

if (FORCED || !hasOwn(IteratorPrototype, 'constructor') || IteratorPrototype.constructor === Object) {
  createNonEnumerableProperty(IteratorPrototype, 'constructor', IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

$({ global: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});


/***/ }),

/***/ 8078:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5067);
var addToUnscopables = __webpack_require__(3331);
var Iterators = __webpack_require__(5635);
var InternalStateModule = __webpack_require__(6527);
var defineIterator = __webpack_require__(5020);

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 8110:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7589);
var isObject = __webpack_require__(6756);
var classof = __webpack_require__(9362);
var ARRAY_BUFFER_NON_EXTENSIBLE = __webpack_require__(5226);

// eslint-disable-next-line es/no-object-isextensible -- safe
var $isExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1); });

// `Object.isExtensible` method
// https://tc39.es/ecma262/#sec-object.isextensible
module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  if (!isObject(it)) return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) == 'ArrayBuffer') return false;
  return $isExtensible ? $isExtensible(it) : true;
} : $isExtensible;


/***/ }),

/***/ 8129:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var classof = __webpack_require__(1893);

var String = global.String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String(argument);
};


/***/ }),

/***/ 8229:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(1434);
var call = __webpack_require__(4067);
var propertyIsEnumerableModule = __webpack_require__(8487);
var createPropertyDescriptor = __webpack_require__(2062);
var toIndexedObject = __webpack_require__(5067);
var toPropertyKey = __webpack_require__(7491);
var hasOwn = __webpack_require__(5743);
var IE8_DOM_DEFINE = __webpack_require__(3283);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8247:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var DESCRIPTORS = __webpack_require__(1434);
var IE8_DOM_DEFINE = __webpack_require__(3283);
var anObject = __webpack_require__(4457);
var toPropertyKey = __webpack_require__(7491);

var TypeError = global.TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 8260:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var uncurryThis = __webpack_require__(5190);
var ArrayBufferViewCore = __webpack_require__(3106);
var $ArrayCopyWithin = __webpack_require__(3003);

var u$ArrayCopyWithin = uncurryThis($ArrayCopyWithin);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
exportTypedArrayMethod('copyWithin', function copyWithin(target, start /* , end */) {
  return u$ArrayCopyWithin(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});


/***/ }),

/***/ 8287:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(5067);
var toAbsoluteIndex = __webpack_require__(8460);
var lengthOfArrayLike = __webpack_require__(2420);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 8314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(5024);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 8326:
/***/ ((module) => {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ 8460:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(2809);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 8469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(4067);
var anObject = __webpack_require__(4457);
var getMethod = __webpack_require__(9808);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 8486:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var charAt = (__webpack_require__(357).charAt);
var toString = __webpack_require__(8129);
var InternalStateModule = __webpack_require__(6527);
var defineIterator = __webpack_require__(5020);

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 8487:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 8559:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 8647:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(6877);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 8767:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(9046);
var uncurryThis = __webpack_require__(5190);
var IndexedObject = __webpack_require__(7509);
var toObject = __webpack_require__(5895);
var lengthOfArrayLike = __webpack_require__(2420);
var arraySpeciesCreate = __webpack_require__(6931);

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ 8787:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-iterator-helpers
var $ = __webpack_require__(4160);
var iterate = __webpack_require__(2942);
var anObject = __webpack_require__(4457);

$({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    iterate(anObject(this), fn, { IS_ITERATOR: true });
  }
});


/***/ }),

/***/ 8795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var setGlobal = __webpack_require__(3598);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ 8799:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 8812:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(1434);
var hasOwn = __webpack_require__(5743);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 8864:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var classof = __webpack_require__(9362);
var toIndexedObject = __webpack_require__(5067);
var $getOwnPropertyNames = (__webpack_require__(6890).f);
var arraySlice = __webpack_require__(3478);

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return arraySlice(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && classof(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ 8898:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(5545);
var bind = __webpack_require__(9046);
var call = __webpack_require__(4067);
var toObject = __webpack_require__(5895);
var callWithSafeIterationClosing = __webpack_require__(673);
var isArrayIteratorMethod = __webpack_require__(2391);
var isConstructor = __webpack_require__(1195);
var lengthOfArrayLike = __webpack_require__(2420);
var createProperty = __webpack_require__(2690);
var getIterator = __webpack_require__(5803);
var getIteratorMethod = __webpack_require__(9925);

var Array = global.Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ 8910:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(4457);
var defineProperties = __webpack_require__(7995);
var enumBugKeys = __webpack_require__(9049);
var hiddenKeys = __webpack_require__(127);
var html = __webpack_require__(8647);
var documentCreateElement = __webpack_require__(7981);
var sharedKey = __webpack_require__(2789);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ 8966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var userAgent = __webpack_require__(6242);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 9046:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);
var aCallable = __webpack_require__(5092);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : bind ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 9049:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 9124:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__(1753);
var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var call = __webpack_require__(4067);
var uncurryThis = __webpack_require__(5190);
var isCallable = __webpack_require__(8559);
var isObject = __webpack_require__(6756);

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var Error = global.Error;
var un$Test = uncurryThis(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);
    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});


/***/ }),

/***/ 9141:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9201:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(4160);
var global = __webpack_require__(5545);
var arrayBufferModule = __webpack_require__(9468);
var setSpecies = __webpack_require__(3431);

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.es/ecma262/#sec-arraybuffer-constructor
$({ global: true, forced: NativeArrayBuffer !== ArrayBuffer }, {
  ArrayBuffer: ArrayBuffer
});

setSpecies(ARRAY_BUFFER);


/***/ }),

/***/ 9362:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(5190);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 9381:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $filter = (__webpack_require__(8767).filter);
var fromSpeciesAndList = __webpack_require__(9811);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.filter` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
exportTypedArrayMethod('filter', function filter(callbackfn /* , thisArg */) {
  var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  return fromSpeciesAndList(this, list);
});


/***/ }),

/***/ 9461:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(5545);
var shared = __webpack_require__(7307);
var hasOwn = __webpack_require__(5743);
var uid = __webpack_require__(6585);
var NATIVE_SYMBOL = __webpack_require__(3410);
var USE_SYMBOL_AS_UID = __webpack_require__(1098);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 9468:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(5545);
var uncurryThis = __webpack_require__(5190);
var DESCRIPTORS = __webpack_require__(1434);
var NATIVE_ARRAY_BUFFER = __webpack_require__(3674);
var FunctionName = __webpack_require__(8812);
var createNonEnumerableProperty = __webpack_require__(297);
var redefineAll = __webpack_require__(8314);
var fails = __webpack_require__(7589);
var anInstance = __webpack_require__(4849);
var toIntegerOrInfinity = __webpack_require__(2809);
var toLength = __webpack_require__(7104);
var toIndex = __webpack_require__(6794);
var IEEE754 = __webpack_require__(6348);
var getPrototypeOf = __webpack_require__(5929);
var setPrototypeOf = __webpack_require__(3285);
var getOwnPropertyNames = (__webpack_require__(6890).f);
var defineProperty = (__webpack_require__(8247).f);
var arrayFill = __webpack_require__(1267);
var arraySlice = __webpack_require__(3478);
var setToStringTag = __webpack_require__(7169);
var InternalStateModule = __webpack_require__(6527);

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global[DATA_VIEW];
var DataViewPrototype = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype = Object.prototype;
var Array = global.Array;
var RangeError = global.RangeError;
var fill = uncurryThis(arrayFill);
var reverse = uncurryThis([].reverse);

var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = arraySlice(bytes, start, start + count);
  return isLittleEndian ? pack : reverse(pack);
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var intIndex = toIndex(index);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, ArrayBufferPrototype);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: fill(Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE];

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, DataViewPrototype);
    anInstance(buffer, ArrayBufferPrototype);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toIntegerOrInfinity(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  DataViewPrototype = $DataView[PROTOTYPE];

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll(DataViewPrototype, {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER;
  /* eslint-disable no-new -- required for testing */
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1);
  }) || fails(function () {
    new NativeArrayBuffer();
    new NativeArrayBuffer(1.5);
    new NativeArrayBuffer(NaN);
    return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
  /* eslint-enable no-new -- required for testing */
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, ArrayBufferPrototype);
      return new NativeArrayBuffer(toIndex(length));
    };

    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype;

    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
      }
    }

    ArrayBufferPrototype.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER);
  }

  // WebKit bug - the same parent prototype for typed arrays and data view
  if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
    setPrototypeOf(DataViewPrototype, ObjectPrototype);
  }

  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = uncurryThis(DataViewPrototype.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll(DataViewPrototype, {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);

module.exports = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};


/***/ }),

/***/ 9489:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $map = (__webpack_require__(8767).map);
var typedArraySpeciesConstructor = __webpack_require__(5918);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.map` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
exportTypedArrayMethod('map', function map(mapfn /* , thisArg */) {
  return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
    return new (typedArraySpeciesConstructor(O))(length);
  });
});


/***/ }),

/***/ 9505:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(9461);

exports.f = wellKnownSymbol;


/***/ }),

/***/ 9555:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var userAgent = __webpack_require__(6242);

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ 9606:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(5743);
var redefine = __webpack_require__(5024);
var dateToPrimitive = __webpack_require__(9842);
var wellKnownSymbol = __webpack_require__(9461);

var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var DatePrototype = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
if (!hasOwn(DatePrototype, TO_PRIMITIVE)) {
  redefine(DatePrototype, TO_PRIMITIVE, dateToPrimitive);
}


/***/ }),

/***/ 9661:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__(4067);
var uncurryThis = __webpack_require__(5190);
var toString = __webpack_require__(8129);
var regexpFlags = __webpack_require__(697);
var stickyHelpers = __webpack_require__(6015);
var shared = __webpack_require__(7307);
var create = __webpack_require__(8910);
var getInternalState = (__webpack_require__(6527).get);
var UNSUPPORTED_DOT_ALL = __webpack_require__(5729);
var UNSUPPORTED_NCG = __webpack_require__(7524);

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  // eslint-disable-next-line max-statements -- TODO
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 9808:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(5092);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 9811:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayFromConstructorAndList = __webpack_require__(4756);
var typedArraySpeciesConstructor = __webpack_require__(5918);

module.exports = function (instance, list) {
  return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list);
};


/***/ }),

/***/ 9842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(5545);
var anObject = __webpack_require__(4457);
var ordinaryToPrimitive = __webpack_require__(4128);

var TypeError = global.TypeError;

// `Date.prototype[@@toPrimitive](hint)` method implementation
// https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
module.exports = function (hint) {
  anObject(this);
  if (hint === 'string' || hint === 'default') hint = 'string';
  else if (hint !== 'number') throw TypeError('Incorrect hint');
  return ordinaryToPrimitive(this, hint);
};


/***/ }),

/***/ 9872:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(3106);
var $forEach = (__webpack_require__(8767).forEach);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.forEach` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
exportTypedArrayMethod('forEach', function forEach(callbackfn /* , thisArg */) {
  $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 9901:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(4160);
var fails = __webpack_require__(7589);
var toIndexedObject = __webpack_require__(5067);
var nativeGetOwnPropertyDescriptor = (__webpack_require__(8229).f);
var DESCRIPTORS = __webpack_require__(1434);

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ 9925:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(1893);
var getMethod = __webpack_require__(9808);
var Iterators = __webpack_require__(5635);
var wellKnownSymbol = __webpack_require__(9461);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Bezier: () => (/* reexport */ Bezier),
  Tool: () => (/* reexport */ views_tool),
  VuePictureCut: () => (/* reexport */ VuePictureCut),
  VuePictureCutMask: () => (/* reexport */ VuePictureCutMask),
  VuePictureCutMenu: () => (/* reexport */ VuePictureCutMenu),
  createAnimation: () => (/* reexport */ createAnimation),
  createUtils: () => (/* reexport */ createUtils),
  "default": () => (/* binding */ entry_lib)
});

;// ./node_modules/.pnpm/@vue+cli-service@5.0.9_anpjcph3rirw56hxoqkekl6qaq/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) // removed by dead control flow
{ var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ const setPublicPath = (null);

;// ./node_modules/.pnpm/babel-loader@8.4.1_6oggrsbr24fqdvcbswklugv3se/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCut.vue?vue&type=template&id=b0a0e3f6
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "vue-picture-cut",
    class: {
      '_default': !_vm.backgroundColor
    },
    style: {
      'background-color': _vm.backgroundColor || '#fff'
    }
  }, [_c('div', {
    ref: "main",
    staticClass: "vue-picture-cut_main",
    class: [_vm.menuPosition],
    style: _vm.mainPosition
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.loading,
      expression: "loading"
    }],
    staticClass: "vue-picture-cut_main-loading"
  }, [_vm._v("loading...")]), _c('vue-picture-cut-canvas', {
    attrs: {
      "loading": _vm.loading,
      "angle": _vm.initAngle
    },
    on: {
      "update:loading": function updateLoading($event) {
        _vm.loading = $event;
      }
    }
  }), _vm._t("default", function () {
    return [_c('vue-picture-cut-mask', _vm._b({}, 'vue-picture-cut-mask', _vm.mskOption, false))];
  })], 2), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.thickness > 0,
      expression: "thickness > 0"
    }],
    staticClass: "vue-picture-cut_menu-box",
    class: [_vm.menuPosition],
    style: _vm.memuPosition
  }, [_vm._t("menu", function () {
    return [_c('div', {
      staticClass: "vue-picture-cut_default-menu"
    }, [_vm.rotateControl ? _c('div', {
      staticClass: "vue-picture-cut_slider"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.sliderAngle,
        expression: "sliderAngle"
      }],
      attrs: {
        "type": "range",
        "min": -180,
        "max": 180
      },
      domProps: {
        "value": _vm.sliderAngle
      },
      on: {
        "__r": function __r($event) {
          _vm.sliderAngle = $event.target.value;
        }
      }
    }), _c('div', {
      staticClass: "vue-picture-cut_slider-box"
    }, [_c('div', {
      staticClass: "vue-picture-cut_slider-box-bar",
      style: {
        left: _vm.sliderAngle * 100 / 361 + 50 + '%'
      }
    }, [_c('div', {
      staticClass: "vue-picture-cut_slider-box-tips"
    }, [_vm._v(" " + _vm._s(_vm.sliderAngle) + "° ")])])])]) : _vm._e(), _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.src,
        expression: "src"
      }],
      staticClass: "vue-picture-cut_button",
      on: {
        "click": _vm.sureCut
      }
    }, [_vm._v("ok")])])];
  })], 2)]);
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__(5498);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__(1829);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__(3657);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__(41);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__(8078);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__(7041);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__(8486);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__(259);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__(6312);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__(3804);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__(4384);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__(1753);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.regexp.test.js
var es_regexp_test = __webpack_require__(9124);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__(7899);
;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js









function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js








function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = !0, o = r;
    },
    f: function f() {
      try {
        a || null == t["return"] || t["return"]();
      } finally {
        if (u) throw o;
      }
    }
  };
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/typeof.js







function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.symbol.to-primitive.js
var es_symbol_to_primitive = __webpack_require__(2738);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.date.to-primitive.js
var es_date_to_primitive = __webpack_require__(9606);
;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/toPrimitive.js




function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/createClass.js

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__(1460);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.map.js
var es_map = __webpack_require__(6059);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/esnext.iterator.constructor.js
var esnext_iterator_constructor = __webpack_require__(8018);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/esnext.iterator.for-each.js
var esnext_iterator_for_each = __webpack_require__(8787);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/esnext.iterator.map.js
var esnext_iterator_map = __webpack_require__(7096);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__(6210);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__(3620);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array-buffer.constructor.js
var es_array_buffer_constructor = __webpack_require__(9201);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array-buffer.slice.js
var es_array_buffer_slice = __webpack_require__(6955);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.json.stringify.js
var es_json_stringify = __webpack_require__(1572);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__(6134);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__(5008);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.uint8-array.js
var es_typed_array_uint8_array = __webpack_require__(5291);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.at.js
var es_typed_array_at = __webpack_require__(4990);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.copy-within.js
var es_typed_array_copy_within = __webpack_require__(8260);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.every.js
var es_typed_array_every = __webpack_require__(5912);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.fill.js
var es_typed_array_fill = __webpack_require__(5554);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.filter.js
var es_typed_array_filter = __webpack_require__(9381);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.find.js
var es_typed_array_find = __webpack_require__(6344);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.find-index.js
var es_typed_array_find_index = __webpack_require__(489);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.for-each.js
var es_typed_array_for_each = __webpack_require__(9872);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.includes.js
var es_typed_array_includes = __webpack_require__(5022);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.index-of.js
var es_typed_array_index_of = __webpack_require__(7393);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.iterator.js
var es_typed_array_iterator = __webpack_require__(6733);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.join.js
var es_typed_array_join = __webpack_require__(3391);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.last-index-of.js
var es_typed_array_last_index_of = __webpack_require__(3210);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.map.js
var es_typed_array_map = __webpack_require__(9489);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.reduce.js
var es_typed_array_reduce = __webpack_require__(6681);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.reduce-right.js
var es_typed_array_reduce_right = __webpack_require__(7010);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.reverse.js
var es_typed_array_reverse = __webpack_require__(569);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.set.js
var es_typed_array_set = __webpack_require__(5751);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.slice.js
var es_typed_array_slice = __webpack_require__(4333);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.some.js
var es_typed_array_some = __webpack_require__(2975);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.sort.js
var es_typed_array_sort = __webpack_require__(7779);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.subarray.js
var es_typed_array_subarray = __webpack_require__(4112);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.to-locale-string.js
var es_typed_array_to_locale_string = __webpack_require__(2491);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.typed-array.to-string.js
var es_typed_array_to_string = __webpack_require__(4294);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/esnext.typed-array.find-last.js
var esnext_typed_array_find_last = __webpack_require__(2472);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/esnext.typed-array.find-last-index.js
var esnext_typed_array_find_last_index = __webpack_require__(5113);
;// ./src/lib/views/tool.js




































// 剪裁用
var canvas = document.createElement('canvas');
canvas.style.display = 'none';
/**
 * 创建一个canvas
 * @type {CanvasRenderingContext2D}
 */
// @ts-ignore
var ctx = canvas.getContext('2d');

/**
 * 绘制矩形的内切椭圆
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
function ellipsePath(ctx, x, y, w, h) {
  var a = 0.5 * w;
  var b = 0.5 * h;
  var k = .5522848,
    ox = a * k,
    oy = b * k;
  ctx.moveTo(x - a, y);
  ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
  ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
  ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
  ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
}

/**
 * 根据椭圆的主轴和次轴半径以及旋转角度(默认圆心在原点)
 *  得到椭圆参数方程的参数，
 *  椭圆参数方程为：
 *  A * x^2 + B * x * y + C * y^2 + F = 0
 * @param {number} a - 长轴半径
 * @param {number} b - 短轴半径
 * @param {number} angle - 旋转角度，逆时针
 * @returns {{A: number, B: number, C: number, F: number}}
 */
function getEllipseParam(a, b, angle) {
  var sinTheta = Math.sin(angle * Math.PI / 180);
  var cosTheta = Math.cos(angle * Math.PI / 180);
  var A = Math.pow(a, 2) * Math.pow(sinTheta, 2) + Math.pow(b, 2) * Math.pow(cosTheta, 2);
  var B = 2 * (Math.pow(a, 2) - Math.pow(b, 2)) * sinTheta * cosTheta;
  var C = Math.pow(a, 2) * Math.pow(cosTheta, 2) + Math.pow(b, 2) * Math.pow(sinTheta, 2);
  var F = -Math.pow(a, 2) * Math.pow(b, 2);
  return {
    A: A,
    B: B,
    C: C,
    F: F
  };
}

/**
 * 根据椭圆参数方程的参数，得到椭圆的外接矩形
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @param {number} F
 * @returns {module:vue-picture-cut.Rect}
 */
function getEllipseRect(A, B, C, F) {
  var k = Math.pow(B, 2) - 4 * A * C;
  // 椭圆左右外接点的横坐标值
  var x = Math.sqrt(4 * C * F / k);
  // 椭圆上下外接点的纵坐标值
  var y = Math.sqrt(4 * A * F / k);
  return {
    x: -Math.abs(x),
    y: -Math.abs(y),
    w: 2 * Math.abs(x),
    h: 2 * Math.abs(y)
  };
}

/**
 * 将一个点绕原点旋转angle度后，
 * 计算新的点的坐标
 * @param {number} x
 * @param {number} y
 * @param {number} angle
 * @returns {module:vue-picture-cut.Point}
 */
function rotatePoint(x, y, angle) {
  var a = Math.sqrt(x * x + y * y);
  var r1 = Math.atan2(x, y);
  var r2 = angle * Math.PI / 180 + r1;
  return {
    x: a * Math.sin(r2),
    y: a * Math.cos(r2)
  };
}

/**
 * 将一个二进制数组转换成base64
 * @param {ArrayBuffer} arrayBuffer
 * @param {string} type
 * @returns {string}
 */
function arrayBuffer2String(arrayBuffer, type) {
  var uInt8Array = new Uint8Array(arrayBuffer);
  var i = uInt8Array.length;
  var binaryString = new Array(i);
  while (i--) {
    binaryString[i] = String.fromCharCode(uInt8Array[i]);
  }
  var data = binaryString.join('');
  var base64 = window.btoa(data);
  return "data:" + type + ";base64," + base64;
}

/**
 * 加载跨域图片
 * @param {string} src
 * @returns {Promise<string>}
 */
function loadCrossDomainImg(src) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (this.status === 200) {
        var blob = xhr.response;
        var oFileReader = new FileReader();
        oFileReader.addEventListener('loadend', function (e) {
          if (e.target) {
            if (typeof e.target.result === 'string') {
              resolve(e.target.result);
            } else if (e.target.result !== null) {
              arrayBuffer2String(e.target.result, blob.type);
            } else {
              reject();
            }
          } else {
            reject();
          }
        });
        oFileReader.readAsDataURL(blob);
      } else {
        reject();
      }
    };
    xhr.onerror = function (e) {
      reject(e);
    };
    xhr.send();
  });
}

/**
 * 工具类
 * @type {module:vue-picture-cut.Tool}
 */
var tool = {
  rotatePoint: rotatePoint,
  loadCrossDomainImg: loadCrossDomainImg,
  /**
   * 克隆对象
   * @param {any} obj
   * @returns {any}
   */
  cloneJSON: function cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * 加载图片
   * @param {string} src
   * @returns {Promise<HTMLImageElement>}
   */
  loadImg: function loadImg(src) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      image.addEventListener('load', function () {
        resolve && resolve(image);
      });
      image.addEventListener('error', function () {
        reject && reject(image);
      });
      image.src = src;
    });
  },
  /**
   * 根据坐标剪裁图像
   * @param {HTMLImageElement} img
   * @param {number} width - 裁剪宽
   * @param {number} height - 裁剪高
   * @param {module:vue-picture-cut.RectFull} showRect - 显示图片的矩形
   * @param {number} [encoderOptions=0.8] - 压缩率
   * @param {string} [format='image/jpeg'] - 导出格式
   * @param {module:vue-picture-cut.PathDone} [pathDone] - 绘制剪裁路径
   * @returns {string}
   */
  clipBy: function clipBy(img, width, height, showRect) {
    var encoderOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.8;
    var format = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'image/jpeg';
    var pathDone = arguments.length > 6 ? arguments[6] : undefined;
    var x = showRect.x,
      y = showRect.y,
      w = showRect.w,
      h = showRect.h,
      r = showRect.r,
      sH = showRect.sH,
      sV = showRect.sV;
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    if (format === 'image/jpeg' || format === 'image/jpg') {
      ctx.fillStyle = '#fff';
      ctx.fillRect(-width / 2, -height / 2, width, height);
    }
    pathDone && pathDone(ctx, width, height);
    if (r / 360) {
      ctx.rotate(-r * Math.PI / 180);
    }
    ctx.translate(x + w / 2, y + h / 2);
    ctx.scale(sH, sV);
    ctx.drawImage(img, 0, 0, img.width, img.height, -w / 2, -h / 2, w, h);
    ctx.scale(sH, sV);
    ctx.translate(-x - w / 2 - width / 2, -y - h / 2 - height / 2);
    ctx.restore();
    return canvas.toDataURL(format, encoderOptions);
  },
  /**
   * 根据坐标内切圆剪裁图像
   * @param {HTMLImageElement} img
   * @param {number} width - 裁剪宽
   * @param {number} height - 裁剪高
   * @param {module:vue-picture-cut.RectFull} showRect - 显示图片的矩形
   * @param {number} [encoderOptions=0.8] - 压缩率
   * @param {string} [format='image/jpeg'] - 导出格式
   * @returns {string}
   */
  clipByRound: function clipByRound(img, width, height, showRect) {
    var encoderOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.8;
    var format = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'image/jpeg';
    return this.clipBy(img, width, height, showRect, encoderOptions, format, function (ctx) {
      // 剪切椭圆形状
      ctx.beginPath();
      ellipsePath(ctx, 0, 0, width, height);
      ctx.clip();
      ctx.closePath();
    });
  },
  /**
   * 若图片宽或高大于max，则压缩图片
   * @param {HTMLImageElement} img
   * @param {number} [max=2000]
   * @param {number} [encoderOptions=1]
   * @returns {module:vue-picture-cut.ClipResult|void}
   */
  clipByMax: function clipByMax(img) {
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
    var encoderOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    if (img.width > max || img.height > max) {
      var offset = img.width / img.height;
      var nw = img.width;
      var nh = img.height;
      if (img.width > max) {
        nw = max;
        nh = nw / offset;
      }
      if (img.height > max) {
        nh = max;
        nw = nh * offset;
      }
      var newShow = {
        x: -nw / 2,
        y: -nh / 2,
        w: nw,
        h: nh,
        r: 0,
        sV: 1,
        sH: 1
      };
      var base64 = this.clipBy(img, nw, nh, newShow, encoderOptions);
      return {
        src: base64,
        file: this.base64ToBlob(base64)
      };
    }
  },
  /**
   * 将base64转Blob对象
   * @param {string} base64
   * @param {string} [format='image/jpeg']
   * @returns {Blob | null}
   */
  base64ToBlob: function base64ToBlob(base64) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'image/jpeg';
    if (!window.atob) {
      return null;
    }
    var code = window.atob(base64.split(',')[1]);
    var aBuffer = new ArrayBuffer(code.length);
    var uBuffer = new Uint8Array(aBuffer);
    for (var i = 0, l = code.length; i < l; i++) {
      uBuffer[i] = code.charCodeAt(i) & 0xff;
    }
    var blob = null;
    try {
      blob = new Blob([uBuffer], {
        type: format
      });
    } catch (e) {
      /**
       * @type {module:vue-picture-cut.Window}
       */
      var win = window;
      var BlobBuilder = win.BlobBuilder || win.WebKitBlobBuilder || win.MozBlobBuilder || win.MSBlobBuilder;
      // @ts-ignore
      if (e.name === 'TypeError' && BlobBuilder) {
        var bb = new BlobBuilder();
        bb.append(uBuffer.buffer);
        blob = bb.getBlob(format);
      }
      // @ts-ignore
      else if (e.name === 'InvalidStateError') {
        blob = new Blob([aBuffer], {
          type: format
        });
      }
    }
    return blob;
  },
  /**
   * 移动端双指处理
   * @param {module:vue-picture-cut.TouchePoint|module:vue-picture-cut.Point} tp1
   * @param {module:vue-picture-cut.TouchePoint} [tp2]
   * @returns {module:vue-picture-cut.DoubleToucheEvent}
   */
  doubleTouche: function doubleTouche(tp1, tp2) {
    if (tp2 === undefined) {
      return {
        core: {
          x: tp1.x,
          y: tp1.y
        },
        length: 0,
        lengthX: 0,
        lengthY: 0,
        angle: 0
      };
    }
    var core = {
      x: (tp1.x + tp2.x) / 2,
      y: (tp1.y + tp2.y) / 2
    };
    var lengthX = tp2.x - tp1.x;
    var lengthY = tp2.y - tp1.y;
    var length = Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2));
    var angle = Math.acos(lengthX / length) * 180 / Math.PI;
    return {
      core: core,
      length: length,
      lengthX: lengthX,
      lengthY: lengthY,
      angle: angle
    };
  },
  /**
   * 将一个正矩形的内切椭圆旋转angle度，
   * 计算该椭圆的外接正矩形
   * (假设矩形中心为原点)
   * @param {number} w
   * @param {number} h
   * @param {number} angle
   * @returns {module:vue-picture-cut.Rect}
   */
  getEllipseRectByRect: function getEllipseRectByRect(w, h, angle) {
    if (!(angle / 180)) {
      return {
        x: -w / 2,
        y: -h / 2,
        w: w,
        h: h
      };
    }
    var a = w / 2;
    var b = h / 2;
    var _getEllipseParam = getEllipseParam(a, b, angle),
      A = _getEllipseParam.A,
      B = _getEllipseParam.B,
      C = _getEllipseParam.C,
      F = _getEllipseParam.F;
    return getEllipseRect(A, B, C, F);
  },
  /**
   * 将一个正矩形旋转angle度，
   * 计算该矩形的外接正矩形
   * (假设矩形中心为原点)
   * @param {number} w
   * @param {number} h
   * @param {number} angle
   * @returns {module:vue-picture-cut.Rect}
   */
  getRectByRect: function getRectByRect(w, h, angle) {
    if (!(angle / 180)) {
      return {
        x: -w / 2,
        y: -h / 2,
        w: w,
        h: h
      };
    }
    var p1 = rotatePoint(-w / 2, -h / 2, angle);
    var p2 = rotatePoint(w / 2, -h / 2, angle);
    var nx = Math.max(Math.abs(p1.x), Math.abs(p2.x));
    var ny = Math.max(Math.abs(p1.y), Math.abs(p2.y));
    return {
      x: -nx,
      y: -ny,
      w: nx + nx,
      h: ny + ny
    };
  },
  /**
   * 函数防抖
   * @param {function} func
   * @param {number} [delay=300] - 延迟时间
   * @param {boolean} [immediate=false] - 是否立即执行
   * @returns {function}
   */
  debounce: function debounce(func) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timer = null;
    return function () {
      var _this = this;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var callNow = immediate && !timer;
      if (timer) {
        clearTimeout(timer);
      }
      if (callNow) {
        // @ts-ignore
        func.apply(this, args);
      }
      timer = setTimeout(function () {
        timer = null; // 重置 timer，为下一次立即执行做准备
        if (!immediate) {
          // @ts-ignore
          func.apply(_this, args);
        }
      }, delay);
    };
  },
  /**
   * 函数节流
   * @param {function} func
   * @param {number} [delay=300] - 延迟时间
   * @returns {function}
   */
  throttle: function throttle(func) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var previous = 0; // 上一次执行的时间戳
    return function () {
      var now = Date.now(); // 获取当前时间

      // 如果距离上一次执行的时间超过了 delay，则执行函数
      if (now - previous >= delay) {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        // @ts-ignore{
        func.apply(this, args);
        previous = now; // 更新上一次执行的时间
      }
    };
  }
};
/* harmony default export */ const views_tool = (tool);
;// ./src/lib/views/PhotoRoot.js

















/**
 @class {module:vue-picture-cut.PhotoRoot} PhotoRoot
 */
var PhotoRoot = /*#__PURE__*/function () {
  function PhotoRoot() {
    _classCallCheck(this, PhotoRoot);
    /**
     * @type {boolean}
     */
    _defineProperty(this, "debug", false);
    /**
     * 是否是火狐
     * @type {boolean}
     */
    _defineProperty(this, "isFirefox", navigator.userAgent.indexOf("Firefox") > 0);
    /**
     * 最外层dom
     * @type {HTMLElement|null}
     */
    _defineProperty(this, "root", null);
    /**
     * 画布宽
     * @type {number}
     */
    _defineProperty(this, "width", 0);
    /**
     * 画布高
     * @type {number}
     */
    _defineProperty(this, "height", 0);
    /**
     * 绘制宽
     * @type {number}
     */
    _defineProperty(this, "drawWidth", 0);
    /**
     * 绘制高
     * @type {number}
     */
    _defineProperty(this, "drawHeight", 0);
    /**
     * 缩放率
     * @type {number}
     */
    _defineProperty(this, "magnification", window.devicePixelRatio);
    /**
     * 开启边缘检测
     * @type {boolean}
     */
    _defineProperty(this, "_edgeDetection", false);
    /**
     * 画布中心
     * @type {module:vue-picture-cut.Point}
     */
    _defineProperty(this, "core", void 0);
    /**
     * 事件队列
     * @type {module:vue-picture-cut.EventList}
     * @private
     */
    _defineProperty(this, "eventList", new Map());
    /**
     * 事件优先队列
     * @type {module:vue-picture-cut.PhotoBasic|null}
     */
    _defineProperty(this, "priorityEvent", null);
    /**
     * 记录滚轮触发时间
     * @type {number}
     * @private
     */
    _defineProperty(this, "_wheelTime", 0);
    /**
     * 记录滚轮触发时间
     * @type {number}
     * @private
     */
    _defineProperty(this, "_wheelTimeOut", 0);
    /**
     * 记录滚轮状态
     * @type {boolean}
     * @private
     */
    _defineProperty(this, "_wheelStatus", false);
  }

  /**
   * 初始化
   * @param {HTMLDivElement} el
   * @param {module:vue-picture-cut.PhotoRootInitParams} [options={}]
   */
  return _createClass(PhotoRoot, [{
    key: "edgeDetection",
    get: function get() {
      return this._edgeDetection;
    },
    set: function set(value) {
      this._edgeDetection = value;
      var photoMain = this.getEventList('PhotoMain');
      if (photoMain) {
        photoMain.emitCheckRange();
      }
    }

    /**
     * 鼠标样式
     * @param {string} value
     */
  }, {
    key: "cursor",
    set: function set(value) {
      if (!this.root) return;
      this.root.style.cursor = value;
    }
  }, {
    key: "init",
    value: function init(el) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var magnification = options.magnification || 1.5;
      var edgeDetection = !!options.edgeDetection || false;
      this.root = el;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
      this.drawWidth = Math.floor(this.width * magnification);
      this.drawHeight = Math.floor(this.height * magnification);
      this.magnification = magnification;
      this.edgeDetection = edgeDetection;
      this.core = {
        x: Math.floor(this.drawWidth / 2),
        y: Math.floor(this.drawHeight / 2)
      };
      this._eventInit();
    }

    /**
     * 添加对象到事件队列中
     * @param {module:vue-picture-cut.PhotoBasic} pe
     */
  }, {
    key: "addEventList",
    value: function addEventList(pe) {
      this.eventList.set(pe.className, pe);
    }

    /**
     * 从事件队列中获取对象
     * @param {string} className
     * @returns {any|null}
     */
  }, {
    key: "getEventList",
    value: function getEventList(className) {
      var t = this.eventList.get(className);
      if (t) {
        return t;
      }
      return null;
    }

    /**
     * 从事件队列中移除对象
     * @param {string} className
     */
  }, {
    key: "deleteEventList",
    value: function deleteEventList(className) {
      this.eventList.delete(className);
    }

    /**
     * 添加对象到事件优先队列
     * @param {module:vue-picture-cut.PhotoBasic} pe
     */
  }, {
    key: "setPriority",
    value: function setPriority(pe) {
      if (!this.priorityEvent) {
        this.priorityEvent = pe;
      }
    }

    /**
     * 从事件优先队列中获取对象
     * @returns {module:vue-picture-cut.PhotoBasic|null}
     */
  }, {
    key: "getPriority",
    value: function getPriority() {
      if (this.priorityEvent) {
        return this.priorityEvent;
      }
      return null;
    }

    /**
     * 从事件优先队列中移除对象
     * @param className
     */
  }, {
    key: "deletePriority",
    value: function deletePriority(className) {
      if (this.priorityEvent && this.priorityEvent.className === className) {
        this.priorityEvent = null;
      }
    }

    /**
     * 事件初始化
     * @private
     */
  }, {
    key: "_eventInit",
    value: function _eventInit() {
      var _this = this;
      if (!this.root) return;
      this.root.addEventListener('touchstart', function (event) {
        var e = event || window.event;
        e.preventDefault();
        var touches = e.changedTouches;
        _this._touchStart(touches);
      }, false);
      this.root.addEventListener('touchend', function (event) {
        var e = event || window.event;
        e.preventDefault();
        var touches = e.changedTouches;
        _this._touchEnd(touches);
      }, false);
      this.root.addEventListener('touchmove', function (event) {
        var e = event || window.event;
        e.preventDefault();
        var touches = e.changedTouches;
        _this._touchMove(touches);
      }, false);
      this.root.addEventListener('mousedown', function (event) {
        var e = event || window.event;
        e.preventDefault();
        _this._mouseDown(e);
      }, false);
      this.root.addEventListener('mouseup', function (event) {
        var e = event || window.event;
        e.preventDefault();
        _this._mouseUp(e);
      }, false);
      this.root.addEventListener('mouseleave', function (event) {
        var e = event || window.event;
        e.preventDefault();
        _this._mouseUp(e);
      }, false);
      this.root.addEventListener('mousemove', function (event) {
        var e = event || window.event;
        e.preventDefault();
        _this._mouseMove(e);
      }, false);
      this.isFirefox ? this.root.addEventListener('DOMMouseScroll', function (event) {
        /**
         * 鼠标滚轮事件
         * @type {WheelEvent}
         */
        // @ts-ignore
        var e = event || window.event;
        e.preventDefault();
        var delta = e.detail * -40;
        _this._mouseWheel(delta, {
          x: e.layerX * _this.magnification - _this.core.x,
          y: e.layerY * _this.magnification - _this.core.y
        });
      }, false) : this.root.addEventListener('mousewheel', function (event) {
        /**
         * 鼠标滚轮事件
         * @type {WheelEvent}
         */
        // @ts-ignore
        var e = event || window.event;
        e.preventDefault();
        // @ts-ignore
        var delta = e.wheelDelta || e.detail;
        _this._mouseWheel(delta, {
          x: e.offsetX * _this.magnification - _this.core.x,
          y: e.offsetY * _this.magnification - _this.core.y
        });
      }, false);
    }

    /**
     * 触摸事件
     * @param {TouchList} touches
     * @private
     */
  }, {
    key: "_touchStart",
    value: function _touchStart(touches) {
      var _this2 = this;
      var cts = Array.from(touches).map(function (t) {
        return _this2._getTouchePoint(t);
      });
      if (this.priorityEvent) {
        this.priorityEvent.touchStart(views_tool.cloneJSON(cts));
      } else {
        var _pes = [];
        var _iterator = _createForOfIteratorHelper(this.eventList.values()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var pe = _step.value;
            pe.touchStart(views_tool.cloneJSON(cts));
            if (!this.priorityEvent) {
              _pes.push(pe);
            } else {
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (this.priorityEvent) {
          _pes.forEach(function (pe) {
            return pe.touchEnd(views_tool.cloneJSON(cts));
          });
        }
      }
    }

    /**
     * 触摸事件
     * @param {TouchList} touches
     * @private
     */
  }, {
    key: "_touchEnd",
    value: function _touchEnd(touches) {
      var _this3 = this;
      var cts = Array.from(touches).map(function (t) {
        return _this3._getTouchePoint(t);
      });
      if (this.priorityEvent) {
        this.priorityEvent.touchEnd(views_tool.cloneJSON(cts));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.touchEnd(views_tool.cloneJSON(cts));
        });
      }
    }

    /**
     * 触摸事件
     * @param {TouchList} touches
     * @private
     */
  }, {
    key: "_touchMove",
    value: function _touchMove(touches) {
      var _this4 = this;
      var cts = Array.from(touches).map(function (t) {
        return _this4._getTouchePoint(t);
      });
      if (this.priorityEvent) {
        this.priorityEvent.touchMove(views_tool.cloneJSON(cts));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.touchMove(views_tool.cloneJSON(cts));
        });
      }
    }

    /**
     * 鼠标事件
     * @param {MouseEvent} e
     * @private
     */
  }, {
    key: "_mouseDown",
    value: function _mouseDown(e) {
      var cts = [this._getMousePoint(e)];
      if (this.priorityEvent) {
        this.priorityEvent.touchStart(views_tool.cloneJSON(cts));
      } else {
        var _pes = [];
        var _iterator2 = _createForOfIteratorHelper(this.eventList.values()),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var pe = _step2.value;
            pe.touchStart(views_tool.cloneJSON(cts));
            if (!this.priorityEvent) {
              _pes.push(pe);
            } else {
              break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (this.priorityEvent) {
          _pes.forEach(function (pe) {
            return pe.touchEnd(views_tool.cloneJSON(cts));
          });
        }
      }
    }

    /**
     * 鼠标事件
     * @param {MouseEvent} e
     * @private
     */
  }, {
    key: "_mouseUp",
    value: function _mouseUp(e) {
      var cts = [this._getMousePoint(e)];
      if (this.priorityEvent) {
        this.priorityEvent.touchEnd(views_tool.cloneJSON(cts));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.touchEnd(views_tool.cloneJSON(cts));
        });
      }
    }

    /**
     * 鼠标事件
     * @param {MouseEvent} e
     * @private
     */
  }, {
    key: "_mouseMove",
    value: function _mouseMove(e) {
      var cts = [this._getMousePoint(e)];
      if (this.priorityEvent) {
        this.priorityEvent.touchMove(views_tool.cloneJSON(cts));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.touchMove(views_tool.cloneJSON(cts));
        });
      }
    }

    /**
     * 鼠标滚轮事件
     * @param {number} zoom
     * @param {module:vue-picture-cut.Point} point
     * @private
     */
  }, {
    key: "_mouseWheel",
    value: function _mouseWheel(zoom, point) {
      var _this5 = this;
      clearTimeout(this._wheelTimeOut);
      var now = Date.now();
      var isStart = now - this._wheelTime > 400 && !this._wheelStatus;
      if (isStart) {
        // 滚轮开始
        this._wheelStatus = true;
        this._wheelStart(zoom, point);
      }
      this._wheelTime = now;
      this._wheelTimeOut = setTimeout(function () {
        // 滚轮结束
        _this5._wheelStatus = false;
        _this5._wheelEnd(zoom, point);
      }, 400);
      isStart || this._wheelChange(zoom, point);
    }

    /**
     * 滚轮事件
     * @param {number} zoom
     * @param {module:vue-picture-cut.Point} point
     * @private
     */
  }, {
    key: "_wheelStart",
    value: function _wheelStart(zoom, point) {
      if (this.priorityEvent) {
        this.priorityEvent.wheelStart(zoom, views_tool.cloneJSON(point));
      } else {
        var _pes = [];
        var _iterator3 = _createForOfIteratorHelper(this.eventList.values()),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var pe = _step3.value;
            pe.wheelStart(zoom, views_tool.cloneJSON(point));
            if (!this.priorityEvent) {
              _pes.push(pe);
            } else {
              break;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        if (this.priorityEvent) {
          _pes.forEach(function (pe) {
            return pe.wheelEnd(zoom, views_tool.cloneJSON(point));
          });
        }
      }
    }

    /**
     * 滚轮事件
     * @param {number} zoom
     * @param {module:vue-picture-cut.Point} point
     * @private
     */
  }, {
    key: "_wheelChange",
    value: function _wheelChange(zoom, point) {
      if (this.priorityEvent) {
        this.priorityEvent.wheelChange(zoom, views_tool.cloneJSON(point));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.wheelChange(zoom, views_tool.cloneJSON(point));
        });
      }
    }

    /**
     * 滚轮事件
     * @param {number} zoom
     * @param {module:vue-picture-cut.Point} point
     * @private
     */
  }, {
    key: "_wheelEnd",
    value: function _wheelEnd(zoom, point) {
      if (this.priorityEvent) {
        this.priorityEvent.wheelEnd(zoom, views_tool.cloneJSON(point));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.wheelEnd(zoom, views_tool.cloneJSON(point));
        });
      }
    }

    /**
     * 获取手指
     * @param {Touch} ct
     * @returns {module:vue-picture-cut.TouchePoint|void}
     * @private
     */
  }, {
    key: "_getTouchePoint",
    value: function _getTouchePoint(ct) {
      if (!this.root) return;
      var elOffset = this._getClientPosition(this.root, {
        x: 0,
        y: 0
      });
      return {
        x: (ct.clientX - elOffset.x) * this.magnification - this.core.x,
        y: (ct.clientY - elOffset.y) * this.magnification - this.core.y,
        id: ct.identifier
      };
    }

    /**
     * 获取鼠标
     * @param {MouseEvent} ct
     * @returns {module:vue-picture-cut.TouchePoint}
     * @private
     */
  }, {
    key: "_getMousePoint",
    value: function _getMousePoint(ct) {
      return {
        x: (this.isFirefox ? ct.layerX : ct.offsetX) * this.magnification - this.core.x,
        y: (this.isFirefox ? ct.layerY : ct.offsetY) * this.magnification - this.core.y,
        id: 0
      };
    }

    /**
     * 计算dom元素相对于网页左上角的绝对坐标
     * @param {HTMLElement} el
     * @param {module:vue-picture-cut.Point} p
     * @returns {module:vue-picture-cut.Point}
     * @private
     */
  }, {
    key: "_getClientPosition",
    value: function _getClientPosition(el, p) {
      // const rect = el.getClientRects()[0];
      var rect = el.getBoundingClientRect();
      p.x += rect.left;
      p.y += rect.top;
      return p;
    }
  }]);
}();

;// ./node_modules/.pnpm/babel-loader@8.4.1_6oggrsbr24fqdvcbswklugv3se/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCutCanvas.vue?vue&type=template&id=6ba17ef3
var VuePictureCutCanvasvue_type_template_id_6ba17ef3_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('canvas', {
    staticClass: "vue-picture-cut_canvas"
  });
};
var VuePictureCutCanvasvue_type_template_id_6ba17ef3_staticRenderFns = [];

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js







function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__(378);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__(9901);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__(920);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/esnext.iterator.filter.js
var esnext_iterator_filter = __webpack_require__(2334);
;// ./node_modules/.pnpm/@babel+runtime@7.28.4/node_modules/@babel/runtime/helpers/esm/objectSpread2.js











function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__(49);
;// ./src/lib/views/Bezier.js







/**
 * 常用贝塞尔预设
 */
var BEZIER = {
  'linear': [[0, 0], [1, 1]],
  // 线性过渡
  'ease': [[0, 0], [0.25, 0.1], [1, 1]],
  // 平滑过渡
  'ease-in': [[0, 0], [0.42, 0], [1, 1]],
  // 由慢到快
  'ease-out': [[0, 0], [0.58, 1], [1, 1]],
  // 由快到慢
  'ease-in-out': [[0, 0], [0.42, 0], [0.58, 1], [1, 1]] // 由慢到快再到慢
};

/**
 * n次贝塞尔
 * @class {module:vue-picture-cut.Bezier} PhotoMain
 */
var Bezier = /*#__PURE__*/function () {
  function Bezier() {
    _classCallCheck(this, Bezier);
    /**
     * 贝塞尔曲线控制点
     * @type {[number, number][]}
     * @private
     */
    _defineProperty(this, "_bezierCtrlNodesArr", []);
  }

  /**
   * 设置贝塞尔曲线控制点
   * @param {[number, number][]} Nodes
   * @returns {module:vue-picture-cut.Bezier}
   */
  return _createClass(Bezier, [{
    key: "setOpt",
    value: function setOpt() {
      var Nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this._bezierCtrlNodesArr = Nodes;
      return this;
    }

    /**
     * 获取贝塞尔曲线点
     * @param {number} t 时间
     * @returns {module:vue-picture-cut.Point}
     */
  }, {
    key: "getPoint",
    value: function getPoint(t) {
      var _this = this;
      var bezierCtrlNodesArr = this._bezierCtrlNodesArr,
        n = bezierCtrlNodesArr.length - 1;
      var x = 0,
        y = 0;
      bezierCtrlNodesArr.forEach(function (item, index) {
        if (!index) {
          x += item[0] * Math.pow(1 - t, n - index) * Math.pow(t, index);
          y += item[1] * Math.pow(1 - t, n - index) * Math.pow(t, index);
        } else {
          x += _this._factorial(n) / _this._factorial(index) / _this._factorial(n - index) * item[0] * Math.pow(1 - t, n - index) * Math.pow(t, index);
          y += _this._factorial(n) / _this._factorial(index) / _this._factorial(n - index) * item[1] * Math.pow(1 - t, n - index) * Math.pow(t, index);
        }
      });
      return {
        x: x,
        y: y
      };
    }

    /**
     * 递归阶乘
     * @param {number} num
     * @returns {number}
     * @private
     */
  }, {
    key: "_factorial",
    value: function _factorial(num) {
      //递归阶乘
      if (num <= 1) {
        return 1;
      } else {
        return num * this._factorial(num - 1);
      }
    }
  }]);
}();

;// ./src/lib/views/animation.js




(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
    // Webkit中此取消方法的名字变了
    window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})();

/**
 * 主画布
 * @class {module:vue-picture-cut.Animation} Animation
 */
var Animation = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param {module:vue-picture-cut.AnimationParams} option
   */
  function Animation(option) {
    _classCallCheck(this, Animation);
    /**
     * 贝塞尔曲线
     * @type {module:vue-picture-cut.Bezier}
     * @private
     */
    _defineProperty(this, "_bezier", new Bezier());
    /**
     * 动画持续时间，单位毫秒，
     * 默认1000毫秒。
     * @type {number}
     */
    _defineProperty(this, "_duration", 1000);
    /**
     * 动画的过渡类型：
     * linear(线性过渡)；
     * ease(默认，平滑过渡)；
     * ease-in(由慢到快)；
     * ease-out(由快到慢)；
     * ease-in-out(由慢到快再到慢)；
     * [[x1,y1],[x1,y1]...](数组,[x1,y1]表示点1的坐标,[x2,y2]表示点2的坐标)。
     * @type {module:vue-picture-cut.Bezier|string}
     */
    _defineProperty(this, "_timing", []);
    /**
     * 动画的延迟时间，单位毫秒，
     * 默认0毫秒。
     * @type {number}
     */
    _defineProperty(this, "_delay", 0);
    /**
     * 动画循环次数，infinite为无限循环
     * 默认1次。
     * @type {number | string}
     */
    _defineProperty(this, "_iteration", 1);
    /**
     * 动画在循环中是否反向运动：
     * normal(默认，正向运动)；
     * reverse(反向运行)；
     * alternate(先正向，后反向，并交替)；
     * alternate-reverse(先反向，后正向，并交替)。
     * @type {string}
     */
    _defineProperty(this, "_direction", 'normal');
    /**
     * 回调函数，接收参数x，x在0~1之间
     * @type {module:vue-picture-cut.AnimationParamsChange}
     */
    _defineProperty(this, "_change", function () {
      return false;
    });
    /**
     * 回调函数，动画结束时执行
     * @type {module:vue-picture-cut.AnimationParamsEnd}
     */
    _defineProperty(this, "_end", function () {
      return undefined;
    });
    /**
     * 包含循环的总的时间
     * @type {number}
     */
    _defineProperty(this, "_times", void 0);
    /**
     * 动画开始时的时间
     * @type {number}
     */
    _defineProperty(this, "_startTime", 0);
    /**
     * 动画状态
     * @type {number}
     */
    _defineProperty(this, "_id", 0);
    if (option.duration !== void 0) this._duration = option.duration;
    if (option.timing !== void 0) {
      if (typeof option.timing === "string") {
        this._timing = BEZIER[option.timing] || BEZIER['linear'];
      } else {
        this._timing = option.timing;
      }
    }
    if (option.delay !== void 0) this._delay = option.delay;
    if (option.iteration !== void 0) this._iteration = option.iteration;
    if (option.direction !== void 0) this._direction = option.direction;
    if (option.change !== void 0) this._change = option.change;
    if (option.end !== void 0) this._end = option.end;

    // 包含循环的总的时间
    // @ts-ignore
    var times = this._iteration === 'infinite' ? Infinity : this._iteration * this._duration;
    // 如果动画正反向交替进行，则总时间乘以2
    this._times = this._direction === 'alternate' || this._direction === 'alternate-reverse' ? 2 * times : times;
    this._bezier.setOpt(this._timing);
  }

  /**
   * 开始动画
   */
  return _createClass(Animation, [{
    key: "start",
    value: function start() {
      var _this = this;
      // 动画开始时的时间
      this._startTime = 0;
      // 判断延迟执行
      if (this._delay) {
        setTimeout(function () {
          _this._startTime = Date.now();
          _this._do();
        }, this._delay);
      } else {
        this._startTime = Date.now();
        this._do();
      }
      return this;
    }
  }, {
    key: "_do",
    value: function _do() {
      var _this2 = this;
      this._id = requestAnimationFrame(function () {
        // 动画运行的时间，毫秒
        var difT = Date.now() - _this2._startTime;
        var difT2 = difT / _this2._duration;
        // 运行的次数
        var n = parseInt(String(difT2));
        difT2 = difT2 - n;
        switch (_this2._direction) {
          case 'normal':
            // 正向运行
            difT2 = difT < _this2._times ? difT2 : 1;
            break;
          case 'reverse':
            // 反向运行
            difT2 = difT < _this2._times ? 1 - difT2 : 0;
            break;
          case 'alternate':
            // 先正向，后反向，并交替
            if (n % 2) difT2 = difT < _this2._times ? 1 - difT2 : 0;else difT2 = difT < _this2._times ? difT2 : 1;
            if (n / 2 === _this2._iteration) difT2 = 0;
            break;
          case 'alternate-reverse':
            // 先反向，后正向，并交替
            if (n % 2) difT2 = difT < _this2._times ? difT2 : 1;else difT2 = difT < _this2._times ? 1 - difT2 : 0;
            if (n / 2 === _this2._iteration) difT2 = 1;
            break;
        }
        var _this2$_bezier$getPoi = _this2._bezier.getPoint(difT2),
          x = _this2$_bezier$getPoi.x,
          y = _this2$_bezier$getPoi.y;
        var c = _this2._change(x, y);
        if (c !== false && difT < _this2._times) {
          _this2._do();
        } else _this2._end();
      });
    }

    /**
     * 中止动画
     * @param {boolean} doEnd 是否执行动画结束时的回调
     */
  }, {
    key: "abort",
    value: function abort() {
      var doEnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this._id > 0 && cancelAnimationFrame(this._id);
      this._id = 0;
      doEnd && this._end();
    }
  }]);
}();
function createAnimation(option) {
  return new Animation(option);
}
;// ./src/lib/views/PhotoMain.js





















/**
 * 主画布
 * @class {module:vue-picture-cut.PhotoMain} PhotoMain
 */
var PhotoMain = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param {HTMLCanvasElement} el - canvas画布
   * @param {module:vue-picture-cut.PhotoRoot} root
   */
  function PhotoMain(el, root) {
    _classCallCheck(this, PhotoMain);
    _defineProperty(this, "className", 'PhotoMain');
    /**
     * @type {HTMLCanvasElement}
     * @private
     */
    _defineProperty(this, "_canvas", void 0);
    /**
     * @type {CanvasRenderingContext2D}
     * @private
     */
    _defineProperty(this, "_ctx", void 0);
    /**
     * @type {module:vue-picture-cut.PhotoRoot}
     * @private
     */
    _defineProperty(this, "_root", void 0);
    /**
     * 当前展示的图片的源src
     * @type {string | undefined}
     * @private
     */
    _defineProperty(this, "_src", void 0);
    /**
     * 当前展示的图片（原始未处理的）
     * @type {HTMLImageElement | undefined}
     * @private
     */
    _defineProperty(this, "originalImg", void 0);
    /**
     * 当前展示的图片（已被处理成宽高小于1500像素）
     * @type {HTMLImageElement | undefined}
     * @private
     */
    _defineProperty(this, "img", void 0);
    /**
     * 图片矩形
     * @type {module:vue-picture-cut.Rect}
     */
    _defineProperty(this, "imgRect", {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    });
    /**
     * 显示矩形
     * @type {module:vue-picture-cut.RectFull}
     */
    _defineProperty(this, "showRect", {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      r: 0,
      sV: 1,
      sH: 1
    });
    /**
     * @type {module:vue-picture-cut.RectFull}
     * @private
     */
    _defineProperty(this, "_showRect", void 0);
    /**
     * 图片可移动范围
     * @type {module:vue-picture-cut.Rect2}
     * @private
     */
    _defineProperty(this, "_moveRect", {
      minX: null,
      minY: null,
      maxX: null,
      maxY: null
    });
    /**
     * 当前触点
     * @type {module:vue-picture-cut.TouchePoint[]}
     * @private
     */
    _defineProperty(this, "_touchList", []);
    /**
     * 当前状态
     * @type {string | null}
     * @private
     */
    _defineProperty(this, "_status", null);
    /**
     * 单指(或双指中心)初始偏移量
     * @type {module:vue-picture-cut.Point}
     * @private
     */
    _defineProperty(this, "_touchstartPoint", {
      x: 0,
      y: 0
    });
    /**
     * 初始触点记录
     * @type {module:vue-picture-cut.DoubleToucheEvent}
     * @private
     */
    _defineProperty(this, "_touchstartEvent", views_tool.doubleTouche({
      x: 0,
      y: 0,
      id: 0
    }));
    /**
     * @type {module:vue-picture-cut.Animation|undefined}
     * @private
     */
    _defineProperty(this, "_animation", undefined);
    /**
     * @type {number | null}
     * @private
     */
    _defineProperty(this, "_scaleTimer", null);
    /**
     * @type {module:vue-picture-cut.LoadImgCallback|undefined}
     * @private
     */
    _defineProperty(this, "_loadingEvent", undefined);
    /**
     * 供外部使用，注入的方法会在每次加载图片后执行
     * @type {module:vue-picture-cut.LoadImgCallbackMap}
     */
    _defineProperty(this, "loadImgEd", new Map());
    /**
     * 缩放图片
     * @param {number} zoom=1
     * @param {module:vue-picture-cut.Point} core
     * @param {number} [angle=0]
     * @private
     */
    _defineProperty(this, "__scaleByZoom", views_tool.throttle(this._scaleByZoom, 16));
    el.width = root.drawWidth;
    el.height = root.drawHeight;
    root.addEventList(this);
    this._root = root;
    this._canvas = el;
    // @ts-ignore
    this._ctx = el.getContext('2d');
    this._ctx.translate(this._root.core.x, this._root.core.y);
  }

  /**
   * 载入图片
   * @param {string} src - 图片地址
   * @param {number} angle - 图片旋转角度
   * @param {number} _n - 递归次数
   */
  return _createClass(PhotoMain, [{
    key: "setSrc",
    value: function setSrc(src) {
      var _this = this;
      var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.showRect.r;
      var _n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      this.clear();
      this._src = src;
      this._loadingEvent && this._loadingEvent(true);
      views_tool.loadImg(src).then(function (img) {
        if (!_n) {
          _this.originalImg = img;
        }
        var result = views_tool.clipByMax(img, 1500);
        if (result) {
          _this.setSrc(result.src, angle, ++_n);
          return;
        }
        _this.img = img;
        _this._initRect();
        _this.showRect.r = angle;
        if (!_this._moveRect.minX || !_this._moveRect.minY) {
          _this._initMoveRange();
        } else {
          _this.loadImgEd.forEach(function (v) {
            v && v();
          });
          var _this$showRect = _this.showRect,
            x = _this$showRect.x,
            y = _this$showRect.y,
            w = _this$showRect.w,
            h = _this$showRect.h,
            r = _this$showRect.r,
            sV = _this$showRect.sV,
            sH = _this$showRect.sH;
          var range = _this._checkRange({
            x: x,
            y: y,
            w: w,
            h: h,
            r: r,
            sV: sV,
            sH: sH
          });
          _this.showRect = {
            x: x + range[0],
            y: y + range[1],
            w: w + range[2],
            h: h + range[3],
            r: r,
            sV: sV,
            sH: sH
          };
        }
        _this._draw(_this.imgRect, _this.showRect);
        _this.showRect.r = angle;
        _this._loadingEvent && _this._loadingEvent(false);
      }, function () {
        _this._loadingEvent && _this._loadingEvent(false);
      });
    }

    /**
     * 重置状态
     */
  }, {
    key: "reset",
    value: function reset() {
      if (this.img) {
        this._initRect();
        this.showRect.r = 0;
        this.showRect.sV = 1;
        this.showRect.sH = 1;
        if (!this._moveRect.minX || !this._moveRect.minY) {
          this._initMoveRange();
        } else {
          this.loadImgEd.forEach(function (v) {
            v && v();
          });
          var _this$showRect2 = this.showRect,
            x = _this$showRect2.x,
            y = _this$showRect2.y,
            w = _this$showRect2.w,
            h = _this$showRect2.h,
            r = _this$showRect2.r,
            sV = _this$showRect2.sV,
            sH = _this$showRect2.sH;
          var range = this._checkRange({
            x: x,
            y: y,
            w: w,
            h: h,
            r: r,
            sV: sV,
            sH: sH
          });
          this.showRect = {
            x: x + range[0],
            y: y + range[1],
            w: w + range[2],
            h: h + range[3],
            r: r,
            sV: sV,
            sH: sH
          };
        }
        this._draw(this.imgRect, this.showRect);
      }
    }

    /**
     * 设置图片可移动范围
     * @param {number} minX
     * @param {number} minY
     * @param {number} maxX
     * @param {number} maxY
     * @param {module:vue-picture-cut.Point} [offPoint] - 中心偏移量
     * @param {number} [zoom] - 放大系数
     * @return {[number, number, number, number]} - 计算之后的图片坐标偏移量
     */
  }, {
    key: "setMoveRange",
    value: function setMoveRange(minX, minY, maxX, maxY, offPoint, zoom) {
      this._initMoveRange(minX, minY, maxX, maxY);
      if (!this.img) return [0, 0, 0, 0];
      if (offPoint && zoom) {
        var _this$showRect3 = this.showRect,
          x = _this$showRect3.x,
          y = _this$showRect3.y,
          w = _this$showRect3.w,
          h = _this$showRect3.h,
          r = _this$showRect3.r,
          sV = _this$showRect3.sV,
          sH = _this$showRect3.sH;
        var offX = offPoint.x - x;
        var offY = offPoint.y - y;
        var offW = w * zoom - w;
        var offH = h * zoom - h;
        var range = this._checkRange(_objectSpread2(_objectSpread2({}, offPoint), {}, {
          w: w * zoom,
          h: h * zoom,
          r: r,
          sV: sV,
          sH: sH
        }));
        return [offX + range[0], offY + range[1], offW + range[2], offH + range[3]];
      } else {
        var _this$_checkRange = this._checkRange(),
          _this$_checkRange2 = _slicedToArray(_this$_checkRange, 4),
          _offX = _this$_checkRange2[0],
          _offY = _this$_checkRange2[1],
          _offW = _this$_checkRange2[2],
          _offH = _this$_checkRange2[3];
        return [_offX, _offY, _offW, _offH];
      }
    }

    /**
     * 设置旋转角度
     * @param {number} angle - 角度
     * @param {boolean} animation=false - 是否动画
     */
  }, {
    key: "setAngle",
    value: function setAngle(angle) {
      var _this2 = this;
      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.img) {
        if (animation && this._animation) {
          this._animation.abort();
        }
        this.loadImgEd.forEach(function (v) {
          v && v({
            showRect: _objectSpread2(_objectSpread2({}, _this2.showRect), {}, {
              r: angle
            })
          }, animation);
        });
      } else {
        this.showRect.r = angle;
      }
    }

    /**
     * 设置图片翻折
     * @param {boolean} sV - 垂直翻折
     * @param {boolean} sH - 水平翻折
     * @param {boolean} animation=false - 是否动画
     */
  }, {
    key: "setFlip",
    value: function setFlip(sV, sH) {
      var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var sh = this.showRect.sH === -1;
      var sv = this.showRect.sV === -1;
      if (sh === sH && sv === sV) return;
      if (this.img) {
        if (!animation) {
          this.showRect.sV = sV ? -1 : 1;
          this.showRect.sH = sH ? -1 : 1;
          this._draw(this.imgRect, this.showRect);
        } else {
          var _this$_animation;
          (_this$_animation = this._animation) === null || _this$_animation === void 0 || _this$_animation.abort();
          this.doAnimation(0, 0, 0, 0, 0, sV, sH);
        }
      }
    }

    /**
     * 设置图片垂直翻折
     * @param {boolean} sV - 垂直翻折
     * @param {boolean} animation=false - 是否动画
     */
  }, {
    key: "setFlipV",
    value: function setFlipV(sV) {
      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sv = this.showRect.sV === -1;
      if (sv === sV) return;
      if (this.img) {
        if (!animation) {
          this.showRect.sV = sV ? -1 : 1;
          this._draw(this.imgRect, this.showRect);
        } else {
          var _this$_animation2;
          (_this$_animation2 = this._animation) === null || _this$_animation2 === void 0 || _this$_animation2.abort();
          this.doAnimation(0, 0, 0, 0, 0, sV);
        }
      }
    }

    /**
     * 设置图片水平翻折
     * @param {boolean} sH - 水平翻折
     * @param {boolean} animation=false - 是否动画
     */
  }, {
    key: "setFlipH",
    value: function setFlipH(sH) {
      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var sh = this.showRect.sH === -1;
      if (sh === sH) return;
      if (this.img) {
        if (!animation) {
          this.showRect.sH = sH ? -1 : 1;
          this._draw(this.imgRect, this.showRect);
        } else {
          var _this$_animation3;
          (_this$_animation3 = this._animation) === null || _this$_animation3 === void 0 || _this$_animation3.abort();
          this.doAnimation(0, 0, 0, 0, 0, undefined, sH);
        }
      }
    }

    /**
     * 缩放
     * @param {number} zoom - 缩放系数，大于1(放大)，大于0小于1(缩小)
     */
  }, {
    key: "scale",
    value: function scale(zoom) {
      var _this$_animation4,
        _this3 = this;
      if (!this.img || zoom < 0 || zoom === 1) return;
      this._scaleTimer !== null && clearTimeout(this._scaleTimer);
      (_this$_animation4 = this._animation) === null || _this$_animation4 === void 0 || _this$_animation4.abort();
      this._touchstartPoint = {
        x: 0,
        y: 0
      };
      var offPoint = this._changePointByCanvas(this.showRect);
      this._scaleByZoom(zoom, offPoint);
      this._draw(this.imgRect, this.showRect);
      this._scaleTimer = setTimeout(function () {
        _this3.emitCheckRange();
      }, 500);
    }

    /**
     * 监听图片加载过程
     * @param {(loading: boolean) => void} callback
     */
  }, {
    key: "onLoading",
    value: function onLoading(callback) {
      this._loadingEvent = callback;
    }

    /**
     * 设置图片矩形
     * @param {module:vue-picture-cut.RectFull} showRect - 矩形
     */
  }, {
    key: "setShowRect",
    value: function setShowRect(showRect) {
      if (this.img) {
        this.showRect = showRect;
        this._draw(this.imgRect, this._showRect || this.showRect);
      }
    }

    /**
     * 将图片上的坐标映射到画布上
     * @param {module:vue-picture-cut.Point} point
     * @returns {module:vue-picture-cut.Point}
     * @private
     */
  }, {
    key: "_changePointByCanvas",
    value: function _changePointByCanvas(point) {
      var r = this.showRect.r;
      return views_tool.rotatePoint(point.x, point.y, r);
    }

    /**
     * 将画布上的坐标映射到图片上
     * @param {module:vue-picture-cut.Point} point
     * @returns {module:vue-picture-cut.Point}
     * @private
     */
  }, {
    key: "_changePointByImage",
    value: function _changePointByImage(point) {
      var r = this.showRect.r;
      return views_tool.rotatePoint(point.x, point.y, -r);
    }

    /**
     * 初始化矩形
     * @private
     */
  }, {
    key: "_initRect",
    value: function _initRect() {
      var img = this.img;
      if (!img) return;
      var pw = this._root.drawWidth;
      var ph = this._root.drawHeight;
      var dw = img.width / pw;
      var dh = img.height / ph;
      var d = dw < dh ? dh : dw;
      var cw = img.width / d;
      var ch = img.height / d;
      this.imgRect = {
        x: 0,
        y: 0,
        w: img.width,
        h: img.height
      };
      this.showRect = {
        x: 0,
        y: 0,
        w: cw,
        h: ch,
        r: this.showRect.r,
        sV: this.showRect.sV,
        sH: this.showRect.sH
      };
    }

    /**
     * 初始化图片可移动范围
     * @param {number | null} minX=null
     * @param {number | null} minY=null
     * @param {number | null} maxX=null
     * @param {number | null} maxY=null
     * @private
     */
  }, {
    key: "_initMoveRange",
    value: function _initMoveRange() {
      var minX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var minY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var maxX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var maxY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (minX === null || minY === null || maxX === null || maxY === null) {
        var _this$imgRect = this.imgRect,
          w = _this$imgRect.w,
          h = _this$imgRect.h;
        if (w === 0) return;
        var pw = this._root.drawWidth;
        var ph = this._root.drawHeight;
        var d1 = pw / ph;
        var d2 = w / h;
        if (d1 > d2) {
          var nw = ph * d2;
          var nh = ph;
          minX = -nw / 2;
          minY = -nh / 2;
        } else {
          var _nw = pw;
          var _nh = pw / d2;
          minX = -_nw / 2;
          minY = -_nh / 2;
        }
        maxX = -minX;
        maxY = -minY;
        this._moveRect = {
          minX: minX,
          minY: minY,
          maxX: maxX,
          maxY: maxY
        };
      } else {
        this._moveRect = {
          minX: minX,
          minY: minY,
          maxX: maxX,
          maxY: maxY
        };
      }
    }

    /**
     * 绘制画布
     * @param {module:vue-picture-cut.Rect} imgRect - 图片矩形
     * @param {module:vue-picture-cut.RectFull} showRect - 将要显示的矩形
     * @private
     */
  }, {
    key: "_draw",
    value: function _draw(imgRect, showRect) {
      this.clear();
      if (this.img) {
        var x = showRect.x,
          y = showRect.y,
          w = showRect.w,
          h = showRect.h,
          r = showRect.r,
          sV = showRect.sV,
          sH = showRect.sH;
        var ctx = this._ctx;
        ctx.save();
        ctx.rotate(-r * Math.PI / 180);
        ctx.translate(x, y);
        ctx.scale(sH, sV);
        ctx.drawImage(this.img, imgRect.x, imgRect.y, imgRect.w, imgRect.h, -w / 2, -h / 2, w, h);
        ctx.scale(-sH, -sV);
        ctx.translate(-x, -y);
        if (this._root.debug) {
          var _this$_root$core = this._root.core,
            coreX = _this$_root$core.x,
            coreY = _this$_root$core.y;
          var _this$_moveRect = this._moveRect,
            minX = _this$_moveRect.minX,
            minY = _this$_moveRect.minY,
            maxX = _this$_moveRect.maxX,
            maxY = _this$_moveRect.maxY;
          ctx.strokeStyle = '#0f0';
          ctx.lineWidth = 2;
          for (var i = 0; i < this._root.drawHeight / 200; i++) {
            ctx.beginPath();
            ctx.moveTo(-coreX, i * 100 + 50);
            ctx.lineTo(coreX, i * 100 + 50);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(-coreX, -i * 100 - 50);
            ctx.lineTo(coreX, -i * 100 - 50);
            ctx.stroke();
            ctx.closePath();
          }
          for (var _i = 0; _i < this._root.drawWidth / 200; _i++) {
            ctx.beginPath();
            ctx.moveTo(_i * 100 + 50, -coreY);
            ctx.lineTo(_i * 100 + 50, coreY);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(-_i * 100 - 50, -coreY);
            ctx.lineTo(-_i * 100 - 50, coreY);
            ctx.stroke();
            ctx.closePath();
          }
          if (minX !== null && maxX !== null && minY !== null && maxY !== null) {
            ctx.strokeStyle = '#00f';
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.lineWidth = 2;
            ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
          }
          ctx.beginPath();
          ctx.fillStyle = '#fff';
          ctx.arc(0, 0, 6, 0, 2 * Math.PI);
          ctx.fill();
          ctx.closePath();
        }
        ctx.restore();
      }
    }

    /**
     * 清除画布
     */
  }, {
    key: "clear",
    value: function clear() {
      this._ctx.clearRect(-this._root.core.x, -this._root.core.y, this._root.drawWidth, this._root.drawHeight);
    }
  }, {
    key: "touchEnd",
    value: function touchEnd(tps) {
      if (!this.img) return;
      if (!this._touchList.length) {
        return;
      }
      tps = this._touchList.filter(function (v) {
        return v.id !== tps[0].id;
      });
      if (tps.length === 0) {
        this.wheelEnd();
      } else if (tps.length === 1) {
        this._touchStart1(tps[0]);
      }
      this._touchList = tps;
    }
  }, {
    key: "touchMove",
    value: function touchMove(tps) {
      if (!this.img) return;
      if (tps.length === 1) {
        this._touchMove1(tps[0]);
      } else if (tps.length === 2) {
        this._touchMove2(tps[0], tps[1]);
      } else if (tps.length > 2) {
        var ids = this._touchList.map(function (v) {
          return v.id;
        });
        tps = tps.filter(function (v) {
          return ids.indexOf(v.id) > -1;
        });
        if (tps.length === 2) {
          this._touchMove2(tps[0], tps[1]);
        }
      }
    }
  }, {
    key: "touchStart",
    value: function touchStart(tps) {
      var _this$_animation5;
      if (!this.img) return;
      (_this$_animation5 = this._animation) === null || _this$_animation5 === void 0 || _this$_animation5.abort();
      var tp = tps[0];
      if (!this._touchList.length) {
        this._touchList.push(tp);
        this._touchStart1(tp);
      } else if (this._touchList.length === 1) {
        // 判断触点是否重复
        if (this._touchList[0].id !== tp.id) {
          this._touchList.push(tp);
          this._touchStart2(this._touchList[0], this._touchList[1]);
        }
      }
    }
  }, {
    key: "wheelStart",
    value: function wheelStart(zoom, point) {
      if (!this.img) return;
      this._status = 'scale';
      this.wheelChange(zoom, point);
    }
  }, {
    key: "wheelChange",
    value: function wheelChange(zoom, point) {
      var _this$_animation6;
      if (!this.img) return;
      (_this$_animation6 = this._animation) === null || _this$_animation6 === void 0 || _this$_animation6.abort();
      this._touchstartEvent = views_tool.doubleTouche(point);
      var core = this._touchstartEvent.core;
      var offPoint = this._changePointByImage(core);
      this._touchstartPoint = this._getPointerLocation(offPoint);
      this._root.setPriority(this);
      var _this$showRect4 = this.showRect,
        w = _this$showRect4.w,
        h = _this$showRect4.h;
      var size = Math.max(w, h);
      zoom = 1 + zoom * 0.0005;
      zoom = (size - 700 + 700 * zoom) / size;
      zoom = zoom > 1.08 ? 1.08 : zoom < 0.92593 ? 0.92593 : zoom;
      this.__scaleByZoom(zoom, point);
      this._draw(this.imgRect, this.showRect);
    }
  }, {
    key: "wheelEnd",
    value: function wheelEnd() {
      if (!this.img) return;
      this._status = null;
      this._touchstartEvent = views_tool.doubleTouche({
        x: 0,
        y: 0,
        id: 0
      });
      this._touchstartPoint = {
        x: 0,
        y: 0
      };
      this.emitCheckRange();
      this._root.deletePriority(this.className);
    }
  }, {
    key: "_touchStart1",
    value: function _touchStart1(tp) {
      this._status = 'move';
      this._touchstartEvent = views_tool.doubleTouche(tp);
      var offPoint = this._changePointByImage(tp);
      this._touchstartPoint = this._getPointerLocation(offPoint);
    }
  }, {
    key: "_touchStart2",
    value: function _touchStart2(tp1, tp2) {
      var _this$showRect5 = this.showRect,
        sV = _this$showRect5.sV,
        sH = _this$showRect5.sH;
      this._status = 'scale';
      if (!sV && sH || sV && !sH) {
        this._touchstartEvent = views_tool.doubleTouche(tp2, tp1);
      } else {
        this._touchstartEvent = views_tool.doubleTouche(tp1, tp2);
      }
      var core = this._touchstartEvent.core;
      var offPoint = this._changePointByImage(core);
      this._touchstartPoint = this._getPointerLocation(offPoint);
      this._root.setPriority(this);
    }
  }, {
    key: "_touchMove1",
    value: function _touchMove1(tp) {
      if (this._status === 'move') {
        this._root.setPriority(this);
        this._touchList[0] = tp;
        this._move(tp);
        this._draw(this.imgRect, this.showRect);
      }
    }
  }, {
    key: "_touchMove2",
    value: function _touchMove2(tp1, tp2) {
      if (this._status === 'scale') {
        this._touchList = [tp1, tp2];
        var doubleToucheEvent = views_tool.doubleTouche(tp1, tp2);
        this._scaleByLocation(doubleToucheEvent);
        this._draw(this.imgRect, this.showRect);
      }
    }

    /**
     * 获取core相对图片的位置
     * @param {module:vue-picture-cut.Point} core
     * @returns {module:vue-picture-cut.Point}
     * @private
     */
  }, {
    key: "_getPointerLocation",
    value: function _getPointerLocation(core) {
      return {
        x: core.x - this.showRect.x,
        y: core.y - this.showRect.y
      };
    }

    /**
     * 移动图片
     * @param {module:vue-picture-cut.Point} core
     * @private
     */
  }, {
    key: "_move",
    value: function _move(core) {
      var pl = this._touchstartPoint;
      var offPoint = this._changePointByImage(core);
      this.showRect.x = offPoint.x - pl.x;
      this.showRect.y = offPoint.y - pl.y;
    }

    /**
     * 缩放图片
     * @param {module:vue-picture-cut.DoubleToucheEvent} e
     * @private
     */
  }, {
    key: "_scaleByLocation",
    value: function _scaleByLocation(e) {
      var zoom = e.length / this._touchstartEvent.length;
      zoom = zoom < 0.9091 ? 0.9091 : zoom;
      zoom = zoom > 1.1 ? 1.1 : zoom;
      this._scaleByZoom(zoom, e.core);
      this._touchstartEvent = e;
    }
  }, {
    key: "_scaleByZoom",
    value:
    /**
     * 缩放图片
     * @param {number} zoom
     * @param {module:vue-picture-cut.Point} core
     * @param {number} [angle=0]
     * @private
     */
    function _scaleByZoom(zoom, core) {
      var angle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var pl = this._touchstartPoint;
      this._touchstartPoint = {
        x: pl.x * zoom,
        y: pl.y * zoom
      };
      pl = this._touchstartPoint;
      var _this$showRect6 = this.showRect,
        w = _this$showRect6.w,
        h = _this$showRect6.h,
        r = _this$showRect6.r,
        sV = _this$showRect6.sV,
        sH = _this$showRect6.sH;
      var offPoint = this._changePointByImage(core);
      this.showRect = {
        x: offPoint.x - pl.x,
        y: offPoint.y - pl.y,
        w: w * zoom,
        h: h * zoom,
        r: r + angle,
        sV: sV,
        sH: sH
      };
    }

    /**
     * 触发边缘检测
     */
  }, {
    key: "emitCheckRange",
    value: function emitCheckRange() {
      var _this$_checkRange3 = this._checkRange(),
        _this$_checkRange4 = _slicedToArray(_this$_checkRange3, 4),
        offX = _this$_checkRange4[0],
        offY = _this$_checkRange4[1],
        offW = _this$_checkRange4[2],
        offH = _this$_checkRange4[3];
      this.doAnimation(offX, offY, offW, offH, 0);
    }

    /**
     * 检查图片是否在可移动范围内
     * @param {module:vue-picture-cut.RectFull} showRect
     * @returns {[number, number, number, number]}
     * @private
     */
  }, {
    key: "_checkRange",
    value: function _checkRange() {
      var showRect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.showRect;
      var cx = showRect.x,
        cy = showRect.y;
      var cw = showRect.w,
        ch = showRect.h;
      cx -= cw / 2;
      cy -= ch / 2;
      var _this$_moveRect2 = this._moveRect,
        minX = _this$_moveRect2.minX,
        minY = _this$_moveRect2.minY,
        maxX = _this$_moveRect2.maxX,
        maxY = _this$_moveRect2.maxY;
      minX = minX || 0;
      minY = minY || 0;
      maxX = maxX || 0;
      maxY = maxY || 0;
      var nx = cx,
        ny = cy,
        nw = cw,
        nh = ch;
      var rl = this._getPhotoByRangeLocation([cx, cy, cw, ch]);
      var imgOff = cw / ch;
      if (rl[4] <= 0) {
        nw = maxX - minX;
        nh = nw / imgOff;
        nx = cx + (cw - nw) / 2;
        ny = cy + (ch - nh) / 2;
      }
      rl = this._getPhotoByRangeLocation([nx, ny, nw, nh]);
      if (rl[5] <= 0) {
        nh = maxY - minY;
        nw = nh * imgOff;
        nx = cx + (cw - nw) / 2;
        ny = cy + (ch - nh) / 2;
      }
      rl = this._getPhotoByRangeLocation([nx, ny, nw, nh]);
      if (rl[0] > 0) nx -= rl[0];
      if (rl[1] > 0) ny -= rl[1];
      if (rl[2] < 0) nx -= rl[2];
      if (rl[3] < 0) ny -= rl[3];
      var offW = nw - cw,
        offH = nh - ch;
      return [nx - cx + offW / 2, ny - cy + offH / 2, offW, offH];
    }

    /**
     * 获取图片相对可移动范围的各边坐标的偏移量
     * @param {[number, number, number, number]} [newLocation]
     * @returns {[number, number, number, number, number, number]} - 坐标偏移量
     * @private
     */
  }, {
    key: "_getPhotoByRangeLocation",
    value: function _getPhotoByRangeLocation(newLocation) {
      var edgeDetection = this._root.edgeDetection;
      var _this$showRect7 = this.showRect,
        x = _this$showRect7.x,
        y = _this$showRect7.y,
        w = _this$showRect7.w,
        h = _this$showRect7.h;
      var _this$_moveRect3 = this._moveRect,
        minX = _this$_moveRect3.minX,
        minY = _this$_moveRect3.minY,
        maxX = _this$_moveRect3.maxX,
        maxY = _this$_moveRect3.maxY;
      if (newLocation) {
        var _newLocation = _slicedToArray(newLocation, 4);
        x = _newLocation[0];
        y = _newLocation[1];
        w = _newLocation[2];
        h = _newLocation[3];
      }
      if (edgeDetection) {
        return [x - (minX || 0), y - (minY || 0), x + w - (maxX || 0), y + h - (maxY || 0), w - (maxX || 0) + (minX || 0), h - (maxY || 0) + (minY || 0)];
      } else {
        return [x - (maxX || 0), y - (maxY || 0), x + w - (minX || 0), y + h - (minY || 0), w - (minX || 0) + (maxX || 0), h - (minY || 0) + (maxY || 0)];
      }
    }

    /**
     * 动画
     * @param {number} offX - 偏移量
     * @param {number} offY - 偏移量
     * @param {number} offW - 偏移量
     * @param {number} offH - 偏移量
     * @param {number} offR - 偏移量
     * @param {boolean} [offSV] - 偏移量
     * @param {boolean} [offSH] - 偏移量
     * @param {Function} [endCallback] - 结束时的回调
     */
  }, {
    key: "doAnimation",
    value: function doAnimation(offX, offY, offW, offH, offR, offSV, offSH, endCallback) {
      var _this4 = this;
      if (!offX && !offY && !offW && !offH && !offR && offSV === undefined && offSH === undefined) {
        return;
      }
      var _this$showRect8 = this.showRect,
        x = _this$showRect8.x,
        y = _this$showRect8.y,
        w = _this$showRect8.w,
        h = _this$showRect8.h,
        r = _this$showRect8.r,
        sV = _this$showRect8.sV,
        sH = _this$showRect8.sH;
      offSV = offSV === void 0 ? sV === -1 : offSV;
      offSH = offSH === void 0 ? sH === -1 : offSH;
      var showRect = {
        x: x + offX,
        y: y + offY,
        w: w + offW,
        h: h + offH,
        r: r + offR,
        sV: offSV ? -1 : 1,
        sH: offSH ? -1 : 1
      };
      var _offSV = showRect.sV - sV;
      var _offSH = showRect.sH - sH;
      if (!offX && !offY && !offW && !offH && !offR && !_offSH && !_offSV) {
        return;
      }
      this._showRect = this.showRect;
      this.showRect = showRect;
      this._animation = createAnimation({
        duration: 300,
        timing: 'ease-in-out',
        change: function change(i, j) {
          _this4._showRect = {
            x: x + j * offX,
            y: y + j * offY,
            w: w + j * offW,
            h: h + j * offH,
            r: r + j * offR,
            sV: sV + j * _offSV,
            sH: sH + j * _offSH
          };
          // 重新绘制画布
          _this4._draw(_this4.imgRect, _this4._showRect);
        },
        end: function end() {
          if (_this4._showRect) {
            _this4.showRect = _this4._showRect;
            _this4._showRect = undefined;
          }
          endCallback && endCallback();
        }
      }).start();
    }
  }]);
}();

;// ./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCutCanvas.vue?vue&type=script&lang=ts



/* harmony default export */ const VuePictureCutCanvasvue_type_script_lang_ts = ({
  name: 'VuePictureCutCanvas',
  inject: {
    photoRoot: {
      from: 'vuePictureCut',
      default: null
    }
  },
  props: {
    angle: {
      type: Number,
      required: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      photoMain: null
    }
  },
  watch: {
    angle (to) {
      if (this.photoMain && to !== undefined) {
        this.photoMain.setAngle(to, true);
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.photoMain = new PhotoMain(
        this.$el,
        this.photoRoot
      );
      this.photoMain.onLoading(loading => {
        this.$emit('update:loading', loading)
      })
    }, 0);
  }
});

;// ./src/lib/views/VuePictureCutCanvas.vue?vue&type=script&lang=ts
 /* harmony default export */ const views_VuePictureCutCanvasvue_type_script_lang_ts = (VuePictureCutCanvasvue_type_script_lang_ts); 
;// ./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// ./src/lib/views/VuePictureCutCanvas.vue





/* normalize component */
;
var component = normalizeComponent(
  views_VuePictureCutCanvasvue_type_script_lang_ts,
  VuePictureCutCanvasvue_type_template_id_6ba17ef3_render,
  VuePictureCutCanvasvue_type_template_id_6ba17ef3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const VuePictureCutCanvas = (component.exports);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__(1612);
;// ./node_modules/.pnpm/babel-loader@8.4.1_6oggrsbr24fqdvcbswklugv3se/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCutMask.vue?vue&type=template&id=0cbda13e&scoped=true

var VuePictureCutMaskvue_type_template_id_0cbda13e_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('svg', {
    staticClass: "vue-picture-cut_mask",
    attrs: {
      "preserveAspectRatio": "none",
      "viewBox": _vm.viewBox
    }
  }, [_c('path', {
    staticClass: "cls-1",
    attrs: {
      "fill": _vm.color || 'rgba(0,0,0,.5)',
      "d": "M0,0 H".concat(_vm.drawWidth, " V").concat(_vm.drawHeight, " H0 V0 Z ").concat(_vm.round)
    }
  }), _vm.thisResize || !_vm.thisRound ? _c('rect', _vm._b({
    staticClass: "cls-3",
    style: {
      'stroke-dasharray': _vm.border,
      stroke: _vm.thisRound ? 'rgba(255,255,255,.7)' : _vm.borderColor || '#ff5500'
    }
  }, 'rect', _vm.rect, false)) : _vm._e(), _vm.thisRound ? _c('path', {
    staticClass: "cls-2",
    attrs: {
      "stroke": _vm.borderColor || '#ff5500',
      "d": _vm.round
    }
  }) : _vm._e(), _vm.thisResize ? _c('path', {
    staticClass: "cls-4",
    attrs: {
      "d": _vm.TLHorn
    }
  }) : _vm._e(), _vm.thisResize ? _c('path', {
    staticClass: "cls-4",
    attrs: {
      "d": _vm.TRHorn
    }
  }) : _vm._e(), _vm.thisResize ? _c('path', {
    staticClass: "cls-4",
    attrs: {
      "d": _vm.BLHorn
    }
  }) : _vm._e(), _vm.thisResize ? _c('path', {
    staticClass: "cls-4",
    attrs: {
      "d": _vm.BRHorn
    }
  }) : _vm._e()]);
};
var VuePictureCutMaskvue_type_template_id_0cbda13e_scoped_true_staticRenderFns = [];

;// ./src/lib/views/VuePictureCutMask.vue?vue&type=template&id=0cbda13e&scoped=true

// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__(4651);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__(7395);
// EXTERNAL MODULE: ./node_modules/.pnpm/core-js@3.19.1/node_modules/core-js/modules/esnext.iterator.find.js
var esnext_iterator_find = __webpack_require__(5575);
;// ./src/lib/views/PhotoMask.js

















var cursorConfig = new Map([['Top Left', 'nw-resize'], ['Top Right', 'ne-resize'], ['Bottom Left', 'sw-resize'], ['Bottom Right', 'se-resize'], ['Top', 'n-resize'], ['Left', 'w-resize'], ['Right', 'e-resize'], ['Bottom', 's-resize']]);

/**
 * 遮罩
 * @class {module:vue-picture-cut.PhotoMask} PhotoMask
 */
var PhotoMask = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param {module:vue-picture-cut.PhotoRoot} root - PhotoRoot引用
   * @param {number} width - 裁剪框宽
   * @param {number} height - 裁剪框高
   * @param {boolean} resize - 是否可以调整比例
   * @param {module:vue-picture-cut.Draw} draw
   */
  function PhotoMask(root, width, height, resize, draw) {
    var _this = this;
    _classCallCheck(this, PhotoMask);
    _defineProperty(this, "className", 'PhotoMask');
    _defineProperty(this, "_root", void 0);
    // 裁剪框宽高比例
    _defineProperty(this, "width", void 0);
    _defineProperty(this, "height", void 0);
    // 是否圆形裁剪
    _defineProperty(this, "_isRound", false);
    // 是否可以调整比例
    _defineProperty(this, "_resize", void 0);
    // 触点容错：5个像素
    _defineProperty(this, "_faultTolerant", void 0);
    _defineProperty(this, "_maskRect", void 0);
    _defineProperty(this, "__maskRect", void 0);
    /**
     * @type {module:vue-picture-cut.TouchePoint|null}
     * @private
     */
    _defineProperty(this, "_touche", null);
    /**
     * @type {string | void}
     * @private
     */
    _defineProperty(this, "_touchePosition", undefined);
    /**
     * 当前触点
     * @type {module:vue-picture-cut.Animation|void}
     * @private
     */
    _defineProperty(this, "__animation", undefined);
    _defineProperty(this, "_draw", void 0);
    root.addEventList(this);
    this._root = root;
    this.width = width || 1;
    this.height = height || 1;
    this._resize = resize;
    this._faultTolerant = 8 * root.magnification;
    var mr = this._maskRect = this._getMaskRect();
    this._draw = draw;
    draw(this._maskRect, false, this);
    var photoMain = this._root.getEventList('PhotoMain');
    if (photoMain) {
      photoMain.loadImgEd.set(this.className, function () {
        var newObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var animation = arguments.length > 1 ? arguments[1] : undefined;
        return _this._reset(photoMain, newObj, animation);
      });
      photoMain.setMoveRange(mr.x, mr.y, mr.x + mr.w, mr.y + mr.h);
    }
  }

  /**
   * 获取裁剪框矩形
   * @return {module:vue-picture-cut.Rect}
   */
  return _createClass(PhotoMask, [{
    key: "getMaskRect",
    value: function getMaskRect() {
      return this._maskRect;
    }

    /**
     * 重新设置裁剪框宽高比例
     * @param {module:vue-picture-cut.PhotoMain} photoMain - 原PhotoMain对象
     * @param {{}} newObj - 该json会与photoMain合并
     * @param {boolean} animation=false - 改变图片的矩形是否经过动画
     * @private
     */
  }, {
    key: "_reset",
    value: function _reset(photoMain) {
      var newObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var newPhotoMain = Object.assign({}, photoMain, newObj);
      var r = this._getMaskRect();
      var showRect = newPhotoMain.showRect;
      var newRect = this._isRound ? views_tool.getEllipseRectByRect(r.w, r.h, showRect.r) : views_tool.getRectByRect(r.w, r.h, showRect.r);
      var _photoMain$setMoveRan = photoMain.setMoveRange(newRect.x, newRect.y, newRect.x + newRect.w, newRect.y + newRect.h),
        _photoMain$setMoveRan2 = _slicedToArray(_photoMain$setMoveRan, 4),
        offX = _photoMain$setMoveRan2[0],
        offY = _photoMain$setMoveRan2[1],
        offW = _photoMain$setMoveRan2[2],
        offH = _photoMain$setMoveRan2[3];
      if (animation) {
        photoMain.doAnimation(offX, offY, offW, offH, showRect.r - photoMain.showRect.r);
      } else {
        photoMain.setShowRect({
          x: showRect.x + offX,
          y: showRect.y + offY,
          w: showRect.w + offW,
          h: showRect.h + offH,
          r: showRect.r,
          sV: showRect.sV,
          sH: showRect.sH
        });
      }
    }

    /**
     * 重新设置裁剪框宽高比例
     * @param {number} width
     * @param {number} height
     */
  }, {
    key: "reset",
    value: function reset(width, height) {
      this.width = width || 1;
      this.height = height || 1;
      var r = this._getMaskRect();
      var offX = r.x - this._maskRect.x;
      var offY = r.y - this._maskRect.y;
      var offW = r.w - this._maskRect.w;
      var offH = r.h - this._maskRect.h;
      var photoMain = this._root.getEventList('PhotoMain');
      if (photoMain) {
        var showRect = photoMain.showRect;
        var zoom = r.w / this._maskRect.w;
        var rotatePoint = views_tool.rotatePoint(this._maskRect.x + this._maskRect.w / 2, this._maskRect.y + this._maskRect.h / 2, -showRect.r);
        var offPoint = {
          x: (showRect.x - rotatePoint.x) * zoom,
          y: (showRect.y - rotatePoint.y) * zoom
        };
        var newRect = this._isRound ? views_tool.getEllipseRectByRect(r.w, r.h, showRect.r) : views_tool.getRectByRect(r.w, r.h, showRect.r);
        var _photoMain$setMoveRan3 = photoMain.setMoveRange(newRect.x, newRect.y, newRect.x + newRect.w, newRect.y + newRect.h, offPoint, zoom),
          _photoMain$setMoveRan4 = _slicedToArray(_photoMain$setMoveRan3, 4),
          _offX = _photoMain$setMoveRan4[0],
          _offY = _photoMain$setMoveRan4[1],
          _offW = _photoMain$setMoveRan4[2],
          _offH = _photoMain$setMoveRan4[3];
        photoMain.doAnimation(_offX, _offY, _offW, _offH, 0);
      }
      this._animation(offX, offY, offW, offH);
    }

    /**
     * 是否圆形裁剪
     * @returns {boolean}
     */
  }, {
    key: "isRound",
    get: function get() {
      return this._isRound;
    }

    /**
     * 设置圆形裁剪
     * @param {boolean} value
     */,
    set: function set(value) {
      this._isRound = value;
      this._draw(this._maskRect, false, this);
      this.reset(this._maskRect.w, this._maskRect.h);
    }

    /**
     * 设置是否可拖动改变裁剪框比例
     * @param {boolean} value
     */
  }, {
    key: "setResize",
    value: function setResize(value) {
      if (!value) {
        this.touchEnd();
      }
      this._resize = value;
      this._draw(this._maskRect, false, this);
    }

    /**
     * 获取是否可拖动改变裁剪框比例
     * @returns {boolean}
     */
  }, {
    key: "getResize",
    value: function getResize() {
      return this._resize;
    }

    /**
     * 裁剪
     * @param {number} [maxPixel] - 裁剪长边像素
     * @param {number} [encoderOptions] - 裁剪压缩率(仅jpg)
     * @param {string} [format] - 裁剪格式
     * @returns {module:vue-picture-cut.ClipResult|null}
     */
  }, {
    key: "clip",
    value: function clip(maxPixel, encoderOptions, format) {
      var photoMain = this._root.getEventList('PhotoMain');
      if (!photoMain || !photoMain.originalImg || !photoMain.img) {
        return null;
      }
      var originalImg = photoMain.originalImg;
      var showRect = photoMain.showRect;
      var maskRect = this._maskRect;
      var r; // 缩放比例
      if (maxPixel) {
        var k = maskRect.w / maskRect.h;
        if (k < 1) {
          r = maxPixel * k / maskRect.w;
        } else {
          r = maxPixel / maskRect.w;
        }
      } else {
        r = originalImg.width / showRect.w;
      }
      var nmw = Math.round(maskRect.w * r);
      var nmh = Math.round(maskRect.h * r);
      var newShow = {
        x: (showRect.x - showRect.w / 2) * r,
        y: (showRect.y - showRect.h / 2) * r,
        w: showRect.w * r,
        h: showRect.h * r,
        r: showRect.r,
        sV: showRect.sV,
        sH: showRect.sH
      };
      var base64 = this._isRound ? views_tool.clipByRound(originalImg, nmw, nmh, newShow, encoderOptions, format) : views_tool.clipBy(originalImg, nmw, nmh, newShow, encoderOptions, format);
      return {
        src: base64,
        file: views_tool.base64ToBlob(base64)
      };
    }

    /**
     * 计算裁剪框矩形
     * @returns {module:vue-picture-cut.Rect}
     * @private
     */
  }, {
    key: "_getMaskRect",
    value: function _getMaskRect() {
      var k1 = this.width / this.height;
      var k2 = this._root.drawWidth / this._root.drawHeight;
      var w, h;
      if (k1 < k2) {
        h = this._root.drawHeight * 0.75;
        w = k1 * h;
      } else {
        w = this._root.drawWidth * 0.75;
        h = w / k1;
      }
      return {
        x: -w / 2,
        y: -h / 2,
        w: w,
        h: h
      };
    }

    /**
     * 动画
     * @param {number} offX
     * @param {number} offY
     * @param {number} offW
     * @param {number} offH
     * @private
     */
  }, {
    key: "_animation",
    value: function _animation(offX, offY, offW, offH) {
      var _this2 = this;
      if (!offX && !offY && !offW && !offH) {
        return;
      }
      var _this$_maskRect = this._maskRect,
        x = _this$_maskRect.x,
        y = _this$_maskRect.y,
        w = _this$_maskRect.w,
        h = _this$_maskRect.h;
      this.__maskRect = this._maskRect;
      this._maskRect = {
        x: x + offX,
        y: y + offY,
        w: w + offW,
        h: h + offH
      };
      this.__animation = createAnimation({
        duration: 300,
        timing: 'ease-in-out',
        change: function change(i, j) {
          _this2.__maskRect = {
            x: x + j * offX,
            y: y + j * offY,
            w: w + j * offW,
            h: h + j * offH
          };
          _this2._draw(_this2.__maskRect, false, _this2);
        },
        end: function end() {
          if (_this2.__maskRect) {
            _this2._maskRect = _this2.__maskRect;
            _this2.__maskRect = undefined;
          }
        }
      }).start();
    }

    /**
     * 指定坐标与裁剪框边框的碰撞检测
     * @param {number} x
     * @param {number} y
     * @returns {string | void} - 返回碰撞位置
     * @private
     */
  }, {
    key: "_isHover",
    value: function _isHover(x, y) {
      var ft = this._faultTolerant;
      var lw = 2;
      var _this$_maskRect2 = this._maskRect,
        mx = _this$_maskRect2.x,
        my = _this$_maskRect2.y,
        mw = _this$_maskRect2.w,
        mh = _this$_maskRect2.h;
      if (x >= mx - ft - lw && x <= mx + ft && y >= my - ft - lw && y <= my + ft) {
        return 'Top Left';
      } else if (x >= mx + mw - ft - lw && x <= mx + mw + ft && y >= my - ft - lw && y <= my + ft) {
        return 'Top Right';
      } else if (x >= mx - ft - lw && x <= mx + ft && y >= my + mh - ft - lw && y <= my + mh + ft) {
        return 'Bottom Left';
      } else if (x >= mx + mw - ft - lw && x <= mx + mw + ft && y >= my + mh - ft - lw && y <= my + mh + ft) {
        return 'Bottom Right';
      } else if (x >= mx && x <= mx + mw && y >= my - ft - lw && y <= my + ft) {
        return 'Top';
      } else if (x >= mx - ft - lw && x <= mx + ft && y >= my && y <= my + mh) {
        return 'Left';
      } else if (x >= mx + mw - ft - lw && x <= mx + mw + ft && y >= my && y <= my + mh) {
        return 'Right';
      } else if (x >= mx && x <= mx + mw && y >= my + mh - ft - lw && y <= my + mh + ft) {
        return 'Bottom';
      }
    }

    /**
     * 触摸开始
     * @param {module:vue-picture-cut.TouchePoint[]} tps
     */
  }, {
    key: "touchStart",
    value: function touchStart(tps) {
      if (this._resize && this._touche === null) {
        var tp = tps[0];
        this._touchePosition = this._isHover(tp.x, tp.y);
        if (this._touchePosition) {
          this._root.setPriority(this);
          this._touche = tp;
          this._draw(this._maskRect, true, this);
        }
      }
    }

    /**
     * 触摸结束
     */
  }, {
    key: "touchEnd",
    value: function touchEnd() {
      if (this._touche !== null && this._touchePosition) {
        this._touche = null;
        if (this._maskRect.w < 0) {
          this._maskRect.x += this._maskRect.w;
          this._maskRect.w *= -1;
        }
        if (this._maskRect.h < 0) {
          this._maskRect.y += this._maskRect.h;
          this._maskRect.h *= -1;
        }
        this.reset(this._maskRect.w, this._maskRect.h);
        this._root.deletePriority(this.className);
        this._touchePosition = undefined;
        this._draw(this.__maskRect || this._maskRect, false, this);
        this._root.cursor = 'default';
      }
    }

    /**
     * 触摸移动
     * @param {module:vue-picture-cut.TouchePoint[]} tps
     */
  }, {
    key: "touchMove",
    value: function touchMove(tps) {
      var _this3 = this;
      if (this._resize && this._touche !== null && this._touchePosition) {
        var toucheId = this._touche.id;
        var tp = tps.find(function (t) {
          return t.id === toucheId;
        });
        if (tp) {
          this._touchePosition.split(' ').forEach(function (str) {
            switch (str) {
              case 'Top':
                _this3._moveTop(tp);
                break;
              case 'Bottom':
                _this3._moveBottom(tp);
                break;
              case 'Left':
                _this3._moveLeft(tp);
                break;
              case 'Right':
                _this3._moveRight(tp);
                break;
            }
          });
          this._touche = tp;
          this._draw(this._maskRect, true, this);
        }
      } else if (this._resize) {
        var touchePosition = this._isHover(tps[0].x, tps[0].y);
        this._root.cursor = touchePosition && cursorConfig.get(touchePosition) || 'move';
      }
    }
  }, {
    key: "wheelStart",
    value: function wheelStart() {}
  }, {
    key: "wheelEnd",
    value: function wheelEnd() {}
  }, {
    key: "wheelChange",
    value: function wheelChange() {}

    /**
     * 移动上边框
     * @param {module:vue-picture-cut.TouchePoint} tp
     * @private
     */
  }, {
    key: "_moveTop",
    value: function _moveTop(tp) {
      var _y = tp.y - this._touche.y;
      this._maskRect.y += _y;
      this._maskRect.h -= _y;
    }

    /**
     * 移动下边框
     * @param {module:vue-picture-cut.TouchePoint} tp
     * @private
     */
  }, {
    key: "_moveBottom",
    value: function _moveBottom(tp) {
      var _y = tp.y - this._touche.y;
      this._maskRect.h += _y;
    }

    /**
     * 移动左边框
     * @param {module:vue-picture-cut.TouchePoint} tp
     * @private
     */
  }, {
    key: "_moveLeft",
    value: function _moveLeft(tp) {
      var _x = tp.x - this._touche.x;
      this._maskRect.x += _x;
      this._maskRect.w -= _x;
    }

    /**
     * 移动右边框
     * @param {module:vue-picture-cut.TouchePoint} tp
     * @private
     */
  }, {
    key: "_moveRight",
    value: function _moveRight(tp) {
      var _x = tp.x - this._touche.x;
      this._maskRect.w += _x;
    }
  }]);
}();

;// ./node_modules/.pnpm/thread-loader@3.0.4_webpack@5.102.1/node_modules/thread-loader/dist/cjs.js!./node_modules/.pnpm/babel-loader@8.4.1_6oggrsbr24fqdvcbswklugv3se/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCutMask.vue?vue&type=script&lang=js



/* harmony default export */ const VuePictureCutMaskvue_type_script_lang_js = ({
  name: 'VuePictureCutMask',
  inject: {
    photoRoot: {
      from: 'vuePictureCut',
      default: null
    }
  },
  props: {
    // 前景色
    color: {
      type: String,
      default: 'rgba(0,0,0,.5)'
    },
    // 裁剪框颜色
    borderColor: {
      type: String,
      default: '#ff5500'
    },
    // 裁剪框（圆的外切矩形）宽高比
    width: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1
    },
    // 是否圆形剪裁
    isRound: {
      type: Boolean,
      default: false
    },
    // 是否可以调整比例
    resize: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      mask: null,
      viewBox: '0 0 0 0',
      drawWidth: 0,
      drawHeight: 0,
      round: 'M0,150 V+150 a150,150 0 1 0 0,-1',
      rect: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      border: '10, 5',
      thisRound: false,
      thisResize: true
    };
  },
  computed: {
    TLHorn: function TLHorn() {
      var x = this.rect.x;
      var y = this.rect.y;
      return "M".concat(x, ",").concat(y, " H").concat(x, " V").concat(y + 15, " H").concat(x - 5, " V").concat(y + 15, " H").concat(x - 5, " V").concat(y - 5, " H").concat(x + 15, " V").concat(y - 5, " H").concat(x + 15, " V").concat(y, " Z");
    },
    TRHorn: function TRHorn() {
      var x = this.rect.x + this.rect.width;
      var y = this.rect.y;
      return "M".concat(x, ",").concat(y, " H").concat(x, " V").concat(y + 15, " H").concat(x + 5, " V").concat(y + 15, " H").concat(x + 5, " V").concat(y - 5, " H").concat(x - 15, " V").concat(y - 5, " H").concat(x - 15, " V").concat(y, " Z");
    },
    BLHorn: function BLHorn() {
      var x = this.rect.x;
      var y = this.rect.y + this.rect.height;
      return "M".concat(x, ",").concat(y, " H").concat(x, " V").concat(y - 15, " H").concat(x - 5, " V").concat(y - 15, " H").concat(x - 5, " V").concat(y + 5, " H").concat(x + 15, " V").concat(y + 5, " H").concat(x + 15, " V").concat(y, " Z");
    },
    BRHorn: function BRHorn() {
      var x = this.rect.x + this.rect.width;
      var y = this.rect.y + this.rect.height;
      return "M".concat(x, ",").concat(y, " H").concat(x, " V").concat(y - 15, " H").concat(x + 5, " V").concat(y - 15, " H").concat(x + 5, " V").concat(y + 5, " H").concat(x - 15, " V").concat(y + 5, " H").concat(x - 15, " V").concat(y, " Z");
    }
  },
  watch: {
    width: function width(to) {
      this.mask && this.mask.reset(to, this.height);
    },
    height: function height(to) {
      this.mask && this.mask.reset(this.width, to);
    },
    isRound: function isRound(to) {
      this.mask && (this.mask.isRound = to);
    },
    resize: function resize(to) {
      this.mask && this.mask.setResize(to);
    },
    thisRound: function thisRound(to) {
      if (this.mask && this.mask.isRound !== to) {
        this.mask.isRound = to;
      }
    },
    thisResize: function thisResize(to) {
      if (this.mask && this.mask.getResize() !== to) {
        this.mask.setResize(to);
      }
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.thisRound = this.isRound;
    this.thisResize = this.resize;
    setTimeout(function () {
      _this.viewBox = "0 0 ".concat(_this.photoRoot.drawWidth, " ").concat(_this.photoRoot.drawHeight);
      _this.drawWidth = _this.photoRoot.drawWidth;
      _this.drawHeight = _this.photoRoot.drawHeight;
      _this.mask = new PhotoMask(_this.photoRoot, _this.width, _this.height, _this.resize, function (rect) {
        var touchePosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var mask = arguments.length > 2 ? arguments[2] : undefined;
        _this.setPathOption(rect, touchePosition, mask);
      });
      _this.mask.isRound = _this.isRound;
    }, 0);
  },
  methods: {
    setPathOption: function setPathOption(rect) {
      var touchePosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var mask = arguments.length > 2 ? arguments[2] : undefined;
      this.thisRound = mask.isRound;
      this.thisResize = mask.getResize();
      var x = rect.x,
        y = rect.y,
        w = rect.w,
        h = rect.h;
      x += this.photoRoot.core.x;
      y += this.photoRoot.core.y;
      if (w < 0) {
        x += w;
        w *= -1;
      }
      if (h < 0) {
        y += h;
        h *= -1;
      }
      var r1 = w / 2;
      var r2 = h / 2;
      if (this.thisRound) {
        this.round = "M".concat(x, ",").concat(y + r2, " a").concat(r1, ",").concat(r2, " 0 1 0 0,-1");
      } else {
        this.round = "M".concat(x, ",").concat(y, " H").concat(w + x, " V").concat(h + y, " H").concat(x, " V").concat(y);
      }
      this.rect = {
        x: x,
        y: y,
        width: w,
        height: h
      };
      this.border = touchePosition ? '10, 0' : '10, 5';
    }
  }
});
;// ./src/lib/views/VuePictureCutMask.vue?vue&type=script&lang=js
 /* harmony default export */ const views_VuePictureCutMaskvue_type_script_lang_js = (VuePictureCutMaskvue_type_script_lang_js); 
;// ./node_modules/.pnpm/mini-css-extract-plugin@2.9.4_webpack@5.102.1/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-12.use[0]!./node_modules/.pnpm/css-loader@6.11.0_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-12.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@6.2.1_d62eqwprb7jtbin55hwm476dvy/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-12.use[2]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCutMask.vue?vue&type=style&index=0&id=0cbda13e&prod&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/lib/views/VuePictureCutMask.vue?vue&type=style&index=0&id=0cbda13e&prod&scoped=true&lang=css

;// ./src/lib/views/VuePictureCutMask.vue



;


/* normalize component */

var VuePictureCutMask_component = normalizeComponent(
  views_VuePictureCutMaskvue_type_script_lang_js,
  VuePictureCutMaskvue_type_template_id_0cbda13e_scoped_true_render,
  VuePictureCutMaskvue_type_template_id_0cbda13e_scoped_true_staticRenderFns,
  false,
  null,
  "0cbda13e",
  null
  
)

/* harmony default export */ const VuePictureCutMask = (VuePictureCutMask_component.exports);
;// ./node_modules/.pnpm/thread-loader@3.0.4_webpack@5.102.1/node_modules/thread-loader/dist/cjs.js!./node_modules/.pnpm/babel-loader@8.4.1_6oggrsbr24fqdvcbswklugv3se/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCut.vue?vue&type=script&lang=js




/* harmony default export */ const VuePictureCutvue_type_script_lang_js = ({
  name: 'VuePictureCut',
  provide: function provide() {
    return {
      vuePictureCut: this.photoRoot
    };
  },
  components: {
    VuePictureCutCanvas: VuePictureCutCanvas,
    VuePictureCutMask: VuePictureCutMask
  },
  props: {
    // 背景色
    backgroundColor: {
      type: String,
      required: false
    },
    // 缩放率
    magnification: {
      type: Number,
      default: 1.5
    },
    // 图片
    src: {
      type: String,
      default: null
    },
    // 旋转
    initAngle: {
      type: Number,
      required: false
    },
    // 裁剪长边像素
    maxPixel: {
      type: Number,
      required: false
    },
    // 裁剪压缩率
    encoderOptions: {
      type: Number,
      required: false
    },
    // 导出格式
    format: {
      type: String,
      required: false
    },
    // 遮罩
    mskOption: {
      type: Object,
      default: function _default() {
        return {
          width: 1,
          height: 1,
          isRound: false,
          resize: true
        };
      }
    },
    // 是否显示旋转控件
    rotateControl: {
      type: Boolean,
      default: false
    },
    // 菜单栏宽度/高度
    menuThickness: {
      type: Number,
      required: false
    },
    // 菜单栏位置
    menuPosition: {
      type: String,
      default: 'bottom'
    },
    // 是否开启边缘检测
    edgeDetection: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      loading: false,
      // 是否有菜单组件
      hasMenu: false,
      // 角度
      sliderAngle: 0,
      photoRoot: new PhotoRoot()
    };
  },
  computed: {
    thickness: function thickness() {
      if (this.menuThickness === void 0 || this.menuThickness < 0) {
        return this.hasMenu ? 120 : 50;
      }
      return this.menuThickness;
    },
    mainPosition: function mainPosition() {
      var thickness = this.thickness + 'px';
      var position = {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0'
      };
      if (this.menuPosition === 'top') {
        position.top = thickness;
      } else if (this.menuPosition === 'left') {
        position.left = thickness;
      } else if (this.menuPosition === 'right') {
        position.right = thickness;
      } else {
        position.bottom = thickness;
      }
      return position;
    },
    memuPosition: function memuPosition() {
      var thickness = this.thickness + 'px';
      if (this.menuPosition === 'top') {
        return {
          top: '0',
          left: '0',
          right: '0',
          height: thickness
        };
      } else if (this.menuPosition === 'left') {
        return {
          top: '0',
          left: '0',
          bottom: '0',
          width: thickness
        };
      } else if (this.menuPosition === 'right') {
        return {
          top: '0',
          right: '0',
          bottom: '0',
          width: thickness
        };
      } else {
        return {
          left: '0',
          right: '0',
          bottom: '0',
          height: thickness
        };
      }
    }
  },
  watch: {
    src: function src(to) {
      if (to) {
        this.setImg();
      }
    },
    initAngle: function initAngle(to) {
      this.watchInitAngle(to);
    },
    sliderAngle: function sliderAngle(to) {
      var photoMain = this.photoRoot.getEventList('PhotoMain');
      if (photoMain) {
        photoMain.setAngle(parseInt(to));
      }
    },
    edgeDetection: function edgeDetection(to) {
      this.photoRoot.edgeDetection = to;
    }
  },
  created: function created() {
    this.watchInitAngle(this.initAngle);
    if (this.$slots.menu) {
      this.hasMenu = true;
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.photoRoot.init(this.$refs.main, this.magnification);
    setTimeout(function () {
      _this.setImg();
    }, 0);
  },
  methods: {
    watchInitAngle: function watchInitAngle(to) {
      if (to === undefined) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        var angle2 = (main.showRect.r + to) % 360;
        this.sliderAngle = angle2 > 180 ? angle2 - 360 : angle2 < -180 ? angle2 + 360 : angle2;
      }
    },
    onChangeEvent: function onChangeEvent(blob, base64) {
      return this.$emit('on-change', {
        blob: blob,
        base64: base64
      });
    },
    setImg: function setImg() {
      var photoMain = this.photoRoot.getEventList('PhotoMain');
      var src = this.src;
      if (src && photoMain) {
        photoMain.setSrc(src, this.initAngle);
      }
      if (this.initAngle !== undefined) {
        this.sliderAngle = this.initAngle % 180;
      }
    },
    // 默认裁剪
    sureCut: function sureCut() {
      var mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        var result = mask.clip(this.maxPixel, this.encoderOptions, this.format);
        if (result) {
          this.onChangeEvent(result.file, result.src);
        }
      }
    },
    // 缩放
    scale: function scale(zoom) {
      var photoMain = this.photoRoot.getEventList('PhotoMain');
      photoMain === null || photoMain === void 0 || photoMain.scale(zoom);
    }
  }
});
;// ./src/lib/views/VuePictureCut.vue?vue&type=script&lang=js
 /* harmony default export */ const views_VuePictureCutvue_type_script_lang_js = (VuePictureCutvue_type_script_lang_js); 
;// ./node_modules/.pnpm/mini-css-extract-plugin@2.9.4_webpack@5.102.1/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/.pnpm/css-loader@6.11.0_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@6.2.1_d62eqwprb7jtbin55hwm476dvy/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/.pnpm/sass-loader@12.6.0_6gdgsie7xlgdsfenrdyqpsogeu/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCut.vue?vue&type=style&index=0&id=b0a0e3f6&prod&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/lib/views/VuePictureCut.vue?vue&type=style&index=0&id=b0a0e3f6&prod&lang=scss

;// ./src/lib/views/VuePictureCut.vue



;


/* normalize component */

var VuePictureCut_component = normalizeComponent(
  views_VuePictureCutvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const VuePictureCut = (VuePictureCut_component.exports);
;// ./node_modules/.pnpm/babel-loader@8.4.1_6oggrsbr24fqdvcbswklugv3se/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCutMenu.vue?vue&type=template&id=2e155919
var VuePictureCutMenuvue_type_template_id_2e155919_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "vue-picture-cut-menu dark-theme",
    class: [['default', 'dark', 'gray'].indexOf(_vm.theme) > -1 ? _vm.theme + '-theme' : 'default-theme']
  }, [_c('div', {
    staticClass: "vue-picture-cut-menu_slider"
  }, [_c('div', {
    staticClass: "vue-picture-cut-menu_slider-box"
  }, [_c('span', [_vm._v(_vm._s(_vm.menuRotateName))]), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.sliderAngle,
      expression: "sliderAngle"
    }],
    attrs: {
      "type": "range",
      "min": -180,
      "max": 180
    },
    domProps: {
      "value": _vm.sliderAngle
    },
    on: {
      "__r": function __r($event) {
        _vm.sliderAngle = $event.target.value;
      }
    }
  }), _c('div', {
    staticClass: "vue-picture-cut-menu_slider-box-bar"
  }, [_c('div', {
    staticClass: "vue-picture-cut-menu_slider-box-button",
    style: {
      left: _vm.sliderAngle * 100 / 361 + 50 + '%'
    }
  }, [_c('div', {
    staticClass: "vue-picture-cut-menu_slider-box-tips"
  }, [_vm._v(" " + _vm._s(_vm.sliderAngle) + "° ")])])])])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box"
  }, [_c('div', {
    staticClass: "vue-picture-cut-menu_box-content"
  }, [_c('div', {
    staticClass: "vue-picture-cut-menu_box-list",
    staticStyle: {
      "width": "558px"
    }
  }, [_c('div', {
    staticClass: "vue-picture-cut-menu_box-item v-p-icon_flip-v",
    on: {
      "click": _vm.setFlipV
    }
  }), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item v-p-icon_flip-h",
    on: {
      "click": _vm.setFlipH
    }
  }), _c('span'), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item v-p-icon_rotate-left",
    on: {
      "click": function click($event) {
        return _vm.rotate(90, true);
      }
    }
  }), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item v-p-icon_rotate-right",
    on: {
      "click": function click($event) {
        return _vm.rotate(-90, true);
      }
    }
  }), _c('span'), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": _vm.setMaskResize
    }
  }, [_c('div', {
    staticClass: "__mask"
  }, [_vm._v(_vm._s(_vm.sizeAutoName))])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": _vm.setMaskSizeToOriginal
    }
  }, [_c('div', {
    staticClass: "__mask"
  }, [_vm._v(_vm._s(_vm.sizeRawName))])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": function click($event) {
        return _vm.setMaskSize(1, 1);
      }
    }
  }, [_c('div', {
    staticClass: "__mask"
  }, [_vm._v("1:1")])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": function click($event) {
        return _vm.setMaskSize(4, 3);
      }
    }
  }, [_c('div', {
    staticClass: "__mask _5_4"
  }, [_vm._v("4:3")])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": function click($event) {
        return _vm.setMaskSize(3, 4);
      }
    }
  }, [_c('div', {
    staticClass: "__mask _4_5"
  }, [_vm._v("3:4")])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": function click($event) {
        return _vm.setMaskSize(16, 9);
      }
    }
  }, [_c('div', {
    staticClass: "__mask _5_4"
  }, [_vm._v("16:9")])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": function click($event) {
        return _vm.setMaskSize(9, 16);
      }
    }
  }, [_c('div', {
    staticClass: "__mask _4_5"
  }, [_vm._v("9:16")])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": function click($event) {
        return _vm.setMaskSize(3, 2);
      }
    }
  }, [_c('div', {
    staticClass: "__mask _5_4"
  }, [_vm._v("3:2")])]), _c('div', {
    staticClass: "vue-picture-cut-menu_box-item __mask",
    on: {
      "click": function click($event) {
        return _vm.setMaskSize(2, 3);
      }
    }
  }, [_c('div', {
    staticClass: "__mask _4_5"
  }, [_vm._v("2:3")])])])])]), _c('div', {
    staticClass: "vue-picture-cut-menu_confirm",
    staticStyle: {
      "max-width": "558px"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.cancel,
      expression: "cancel"
    }],
    staticClass: "__cancel",
    on: {
      "click": _vm.onCancelEvent
    }
  }, [_vm._v(_vm._s(_vm.cancelName))]), _c('div', {
    staticClass: "__sure",
    class: {
      '__center': !_vm.cancel
    },
    on: {
      "click": _vm.sureCut
    }
  }, [_vm._v(_vm._s(_vm.confirmName))])])]);
};
var VuePictureCutMenuvue_type_template_id_2e155919_staticRenderFns = [];

;// ./node_modules/.pnpm/thread-loader@3.0.4_webpack@5.102.1/node_modules/thread-loader/dist/cjs.js!./node_modules/.pnpm/babel-loader@8.4.1_6oggrsbr24fqdvcbswklugv3se/node_modules/babel-loader/lib/index.js??clonedRuleSet-40.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCutMenu.vue?vue&type=script&lang=js

/* harmony default export */ const VuePictureCutMenuvue_type_script_lang_js = ({
  name: 'VuePictureCutMenu',
  inject: {
    pRoot: {
      from: 'vuePictureCut',
      default: null
    }
  },
  props: {
    root: {
      type: Object,
      required: false
    },
    theme: {
      type: String,
      default: 'default'
    },
    // 裁剪长边像素
    maxPixel: {
      type: Number,
      required: false
    },
    // 裁剪压缩率
    encoderOptions: {
      type: Number,
      required: false
    },
    // 裁剪压缩率
    format: {
      type: String,
      required: false
    },
    // 是否需要关闭按钮
    cancel: {
      type: Boolean,
      default: true
    },
    cancelName: {
      type: String,
      default: 'Cancel'
    },
    confirmName: {
      type: String,
      default: 'Ok'
    },
    sizeAutoName: {
      type: String,
      default: 'auto'
    },
    sizeRawName: {
      type: String,
      default: 'raw'
    },
    menuRotateName: {
      type: String,
      default: 'Rotate'
    }
  },
  data: function data() {
    return {
      sliderAngle: 0
    };
  },
  computed: {
    photoRoot: function photoRoot() {
      return this.root ? this.root.photoRoot : this.pRoot;
    }
  },
  watch: {
    sliderAngle: function sliderAngle(to) {
      if (!this.photoRoot) return;
      var photoMain = this.photoRoot.getEventList('PhotoMain');
      if (photoMain) {
        photoMain.setAngle(parseInt(to));
      }
    }
  },
  methods: {
    onChangeEvent: function onChangeEvent(blob, base64) {
      this.$emit('on-change', {
        blob: blob,
        base64: base64
      });
    },
    onCancelEvent: function onCancelEvent() {
      this.$emit('on-cancel');
    },
    // 裁剪
    sureCut: function sureCut() {
      if (!this.photoRoot) return;
      var mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        var result = mask.clip(this.maxPixel, this.encoderOptions, this.format);
        if (result) {
          this.onChangeEvent(result.file, result.src);
        }
      }
    },
    // 设置剪裁框
    setMaskSize: function setMaskSize(w, h) {
      if (!this.photoRoot) return;
      var mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        mask.reset(w, h);
        mask.setResize(false);
      }
    },
    // 设置剪裁框
    setMaskSizeToOriginal: function setMaskSizeToOriginal() {
      if (!this.photoRoot) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        this.setMaskSize(main.imgRect.w, main.imgRect.h);
      }
    },
    // 设置剪裁框
    setMaskResize: function setMaskResize() {
      var resize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.photoRoot) return;
      var mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        mask.setResize(resize);
      }
    },
    // 旋转
    rotate: function rotate(angle) {
      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.photoRoot || angle % 360 === 0) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        var angle2 = (main.showRect.r + angle) % 360;
        this.sliderAngle = angle2 > 180 ? angle2 - 360 : angle2 < -180 ? angle2 + 360 : angle2;
        main.setAngle(main.showRect.r + angle, animation);
      }
    },
    /**
     * 设置图片垂直翻折
     */
    setFlipV: function setFlipV() {
      if (!this.photoRoot) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        main.setFlipV(main.showRect.sV === 1, true);
      }
    },
    /**
     * 设置图片水平翻折
     */
    setFlipH: function setFlipH() {
      if (!this.photoRoot) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        main.setFlipH(main.showRect.sH === 1, true);
      }
    }
  }
});
;// ./src/lib/views/VuePictureCutMenu.vue?vue&type=script&lang=js
 /* harmony default export */ const views_VuePictureCutMenuvue_type_script_lang_js = (VuePictureCutMenuvue_type_script_lang_js); 
;// ./node_modules/.pnpm/mini-css-extract-plugin@2.9.4_webpack@5.102.1/node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-22.use[0]!./node_modules/.pnpm/css-loader@6.11.0_webpack@5.102.1/node_modules/css-loader/dist/cjs.js??clonedRuleSet-22.use[1]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/.pnpm/postcss-loader@6.2.1_d62eqwprb7jtbin55hwm476dvy/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-22.use[2]!./node_modules/.pnpm/sass-loader@12.6.0_6gdgsie7xlgdsfenrdyqpsogeu/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-22.use[3]!./node_modules/.pnpm/vue-loader@15.11.1_losm54fuiy3d5ljumjlamnudu4/node_modules/vue-loader/lib/index.js??vue-loader-options!./src/lib/views/VuePictureCutMenu.vue?vue&type=style&index=0&id=2e155919&prod&lang=scss
// extracted by mini-css-extract-plugin

;// ./src/lib/views/VuePictureCutMenu.vue?vue&type=style&index=0&id=2e155919&prod&lang=scss

;// ./src/lib/views/VuePictureCutMenu.vue



;


/* normalize component */

var VuePictureCutMenu_component = normalizeComponent(
  views_VuePictureCutMenuvue_type_script_lang_js,
  VuePictureCutMenuvue_type_template_id_2e155919_render,
  VuePictureCutMenuvue_type_template_id_2e155919_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const VuePictureCutMenu = (VuePictureCutMenu_component.exports);
;// ./src/lib/views/Utils.js






/**
 * 二次包装工具类
 * 简化api，方便自定义菜单等
 */
var Utils = /*#__PURE__*/function () {
  /**
   * 工具类
   * @param {module:vue-picture-cut.CutInterface} cut
   */
  function Utils(cut) {
    _classCallCheck(this, Utils);
    _defineProperty(this, "photoRoot", void 0);
    this.photoRoot = cut.photoRoot;
  }

  /**
   * 获取图片剪裁
   * @returns {module:vue-picture-cut.PhotoMask|null}
   */
  return _createClass(Utils, [{
    key: "getPhotoMask",
    value: function getPhotoMask() {
      if (this.photoRoot) {
        return this.photoRoot.getEventList('PhotoMask');
      }
      return null;
    }

    /**
     * 获取图片主控件
     * @returns {module:vue-picture-cut.PhotoMain|null}
     */
  }, {
    key: "getPhotoMain",
    value: function getPhotoMain() {
      if (this.photoRoot) {
        return this.photoRoot.getEventList('PhotoMain');
      }
      return null;
    }

    /**
     * 裁剪
     * @param {number|{maxPixel,encoderOptions,format}} [opt] - 最大像素
     * @param {number} [encoderOptions] - 压缩率
     * @param {string} [format] - 导出格式
     * @returns {module:vue-picture-cut.ClipResult|null}
     */
  }, {
    key: "cut",
    value: function cut(opt, encoderOptions, format) {
      if (!this.photoRoot) return null;
      var mask = this.getPhotoMask();
      if (mask) {
        if (_typeof(opt) === "object") {
          return mask.clip(opt.maxPixel, opt.encoderOptions, opt.format);
        } else if (typeof opt === "number") {
          return mask.clip(opt, encoderOptions, format);
        }
        return mask.clip();
      }
      return null;
    }

    /**
     * 重置图片状态
     */
  }, {
    key: "reset",
    value: function reset() {
      if (!this.photoRoot) return;
      var main = this.getPhotoMain();
      main === null || main === void 0 || main.reset();
    }

    /**
     * 设置剪裁框是否圆形
     * @param {boolean} isRound=true
     */
  }, {
    key: "setMaskRound",
    value: function setMaskRound() {
      var isRound = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.photoRoot) return;
      var mask = this.getPhotoMask();
      if (mask) {
        mask.isRound = isRound;
      }
    }

    /**
     * 设置剪裁框
     * @param {number} w - 比例宽
     * @param {number} h - 比例高
     */
  }, {
    key: "setMaskSize",
    value: function setMaskSize(w, h) {
      if (!this.photoRoot) return;
      var mask = this.getPhotoMask();
      mask === null || mask === void 0 || mask.reset(w, h);
    }

    /**
     * 按图片宽高比例设置剪裁框尺寸
     * @returns {{width: number, height: number} | void}
     */
  }, {
    key: "setMaskSizeToOriginal",
    value: function setMaskSizeToOriginal() {
      if (!this.photoRoot) return;
      var main = this.getPhotoMain();
      if (main) {
        this.setMaskSize(main.imgRect.w, main.imgRect.h);
        return {
          width: main.imgRect.w,
          height: main.imgRect.h
        };
      }
    }

    /**
     * 设置剪裁框是否可拖动改变大小
     * @param {boolean} resize=true
     */
  }, {
    key: "setMaskResize",
    value: function setMaskResize() {
      var resize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.photoRoot) return;
      var mask = this.getPhotoMask();
      mask === null || mask === void 0 || mask.setResize(resize);
    }

    /**
     * 图片旋转
     * @param {number} angle - 逆时针角度
     * @param {boolean} animation=false - 是否动画
     * @returns {number | void}
     */
  }, {
    key: "rotate",
    value: function rotate(angle) {
      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.photoRoot || angle % 360 === 0) return;
      var main = this.getPhotoMain();
      if (main) {
        var newAngle = main.showRect.r + angle;
        main.setAngle(newAngle, animation);
        return newAngle;
      }
    }

    /**
     * 图片旋转到指定角度
     * @param {number} angle - 逆时针角度
     * @param {boolean} animation=false - 是否动画
     */
  }, {
    key: "rotateTo",
    value: function rotateTo(angle) {
      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.photoRoot) return;
      var main = this.getPhotoMain();
      if (main && main.showRect.r + angle % 360) {
        main.setAngle(angle, animation);
      }
    }

    /**
     * 设置图片垂直翻转
     * @param {boolean} animation=false - 是否动画
     * @returns {boolean | void}
     */
  }, {
    key: "setFlipV",
    value: function setFlipV(animation) {
      if (!this.photoRoot) return;
      var main = this.getPhotoMain();
      if (main) {
        main.setFlipV(main.showRect.sV === 1, animation);
        return main.showRect.sV === -1;
      }
    }

    /**
     * 设置图片水平翻转
     * @param {boolean} animation=false - 是否动画
     * @returns {boolean | void}
     */
  }, {
    key: "setFlipH",
    value: function setFlipH() {
      var animation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.photoRoot) return;
      var main = this.getPhotoMain();
      if (main) {
        main.setFlipH(main.showRect.sH === 1, animation);
        return main.showRect.sH === -1;
      }
    }

    /**
     * 设置图片翻转
     * @param {boolean} sV - 垂直
     * @param {boolean} sH - 水平
     * @param {boolean} animation=false - 是否动画
     */
  }, {
    key: "setFlip",
    value: function setFlip(sV, sH) {
      var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!this.photoRoot) return;
      var main = this.getPhotoMain();
      main === null || main === void 0 || main.setFlip(sV, sH, animation);
    }

    /**
     * 图片缩放
     * @param {number} zoom - 缩放系数
     */
  }, {
    key: "scale",
    value: function scale(zoom) {
      var photoMain = this.getPhotoMain();
      photoMain === null || photoMain === void 0 || photoMain.scale(zoom);
    }

    /**
     * 获取控件参数
     * @returns {module:vue-picture-cut.CutOptions|null}
     */
  }, {
    key: "getOptions",
    value: function getOptions() {
      var root = this.photoRoot;
      if (!root) return null;
      var main = root.getEventList('PhotoMain');
      var mask = root.getEventList('PhotoMask');
      var imgOpt, maskOpt;
      if (main) {
        var _main$originalImg;
        var imgRect = main.imgRect;
        var showRect = main.showRect;
        imgOpt = {
          src: (_main$originalImg = main.originalImg) === null || _main$originalImg === void 0 ? void 0 : _main$originalImg.src,
          imgRect: _objectSpread2({}, imgRect),
          showRect: _objectSpread2({}, showRect)
        };
        imgOpt.showRect.x -= imgOpt.showRect.w / 2;
        imgOpt.showRect.y -= imgOpt.showRect.y / 2;
      }
      if (mask) {
        var maskRect = mask.getMaskRect();
        maskOpt = {
          isRound: mask.isRound,
          x: maskRect.x - maskRect.w / 2,
          y: maskRect.y - maskRect.h / 2,
          w: maskRect.w,
          h: maskRect.h
        };
      }
      return {
        canvas: {
          width: root.width,
          height: root.height,
          drawWidth: root.drawWidth,
          drawHeight: root.drawHeight,
          magnification: root.magnification
        },
        img: imgOpt || {},
        mask: maskOpt || {}
      };
    }
  }]);
}();

/**
 * 创建工具类
 * @param cut
 * @returns {Utils}
 */
function createUtils(cut) {
  if (!cut || !cut.photoRoot) {
    throw new Error("createUtils\u9700\u8981\u4E00\u4E2A\u4E3AVuePictureCut\u5B9E\u4F8B\u7684\u53C2\u6570\uFF0C\u4F46\u662F\u5F53\u524D\u5F97\u5230\u7684\u662F".concat(cut, "!\n\n      \"createUtils\" requires an argument for the \"VuePictureCut\" instance, but the current result is ").concat(cut, "!"));
  } else {
    return new Utils(cut);
  }
}
;// ./src/lib/index.js








/* harmony default export */ const lib = ({
  install: function install(Vue) {
    Vue.component('vue-picture-cut', VuePictureCut);
    Vue.component('vue-picture-cut-mask', VuePictureCutMask);
    Vue.component('vue-picture-cut-menu', VuePictureCutMenu);
  }
});
;// ./node_modules/.pnpm/@vue+cli-service@5.0.9_anpjcph3rirw56hxoqkekl6qaq/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ const entry_lib = (lib);


})();

module.exports = __webpack_exports__;
/******/ })()
;