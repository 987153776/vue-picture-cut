module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1f8f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_mask_vue_vue_type_style_index_0_id_b1f21cd4_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d690");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_mask_vue_vue_type_style_index_0_id_b1f21cd4_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_mask_vue_vue_type_style_index_0_id_b1f21cd4_prod_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "79d2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_menu_vue_vue_type_style_index_0_id_4c0ae36e_prod_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c5fa");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_menu_vue_vue_type_style_index_0_id_4c0ae36e_prod_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_menu_vue_vue_type_style_index_0_id_4c0ae36e_prod_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "ab39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_vue_vue_type_style_index_0_id_d2016dc0_prod_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("fbc0");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_vue_vue_type_style_index_0_id_d2016dc0_prod_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_vue_picture_cut_vue_vue_type_style_index_0_id_d2016dc0_prod_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "c5fa":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d690":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "VuePictureCut", function() { return /* reexport */ vue_picture_cut; });
__webpack_require__.d(__webpack_exports__, "VuePictureCutMask", function() { return /* reexport */ vue_picture_cut_mask; });
__webpack_require__.d(__webpack_exports__, "VuePictureCutMenu", function() { return /* reexport */ vue_picture_cut_menu; });
__webpack_require__.d(__webpack_exports__, "Bezier", function() { return /* reexport */ Bezier; });
__webpack_require__.d(__webpack_exports__, "createAnimation", function() { return /* reexport */ createAnimation; });
__webpack_require__.d(__webpack_exports__, "Tool", function() { return /* reexport */ tool; });
__webpack_require__.d(__webpack_exports__, "createUtils", function() { return /* reexport */ createUtils; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var setPublicPath_src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (setPublicPath_src) {
    __webpack_require__.p = setPublicPath_src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"28b04d81-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/views/vue-picture-cut.vue?vue&type=template&id=d2016dc0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-picture-cut",class:{'_default': !_vm.backgroundColor},style:({'background-color': _vm.backgroundColor || '#fff'})},[_c('div',{ref:"main",staticClass:"vue-picture-cut_main",class:[_vm.menuPosition],style:(_vm.mainPosition)},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.loading),expression:"loading"}],staticClass:"vue-picture-cut_main-loading"},[_vm._v("loading...")]),_c('vue-picture-cut-canvas',{attrs:{"loading":_vm.loading,"angle":_vm.initAngle},on:{"update:loading":function($event){_vm.loading=$event}}}),_vm._t("default",[_c('vue-picture-cut-mask',_vm._b({},'vue-picture-cut-mask',_vm.mskOption,false))])],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.thickness > 0),expression:"thickness > 0"}],staticClass:"vue-picture-cut_menu-box",class:[_vm.menuPosition],style:(_vm.memuPosition)},[_vm._t("menu",[_c('div',{staticClass:"vue-picture-cut_default-menu"},[(_vm.rotateControl)?_c('div',{staticClass:"vue-picture-cut_slider"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sliderAngle),expression:"sliderAngle"}],attrs:{"type":"range","min":-180,"max":180},domProps:{"value":(_vm.sliderAngle)},on:{"__r":function($event){_vm.sliderAngle=$event.target.value}}}),_c('div',{staticClass:"vue-picture-cut_slider-box"},[_c('div',{staticClass:"vue-picture-cut_slider-box-bar",style:({left: _vm.sliderAngle * 100 / 361 + 50 + '%'})},[_c('div',{staticClass:"vue-picture-cut_slider-box-tips"},[_vm._v(" "+_vm._s(_vm.sliderAngle)+"° ")])])])]):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.src),expression:"src"}],staticClass:"vue-picture-cut_button",on:{"click":_vm.sureCut}},[_vm._v("ok")])])])],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut.vue?vue&type=template&id=d2016dc0&

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
/**
  * vue-class-component v7.2.3
  * (c) 2015-present Evan You
  * @license MIT
  */


function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
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
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
  return function (target, key, index) {
    var Ctor = typeof target === 'function' ? target : target.constructor;

    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }

    if (typeof index !== 'number') {
      index = undefined;
    }

    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index);
    });
  };
}
function mixins() {
  for (var _len = arguments.length, Ctors = new Array(_len), _key = 0; _key < _len; _key++) {
    Ctors[_key] = arguments[_key];
  }

  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    mixins: Ctors
  });
}
function isPrimitive(value) {
  var type = _typeof(value);

  return value == null || type !== 'object' && type !== 'function';
}
function warn(message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message);
  }
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this;

    // proxy to actual vm
    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get: function get() {
            return vm[key];
          },
          set: function set(value) {
            vm[key] = value;
          },
          configurable: true
        });
      }
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (false) {}

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];
function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof external_commonjs_vue_commonjs2_vue_root_Vue_default.a ? superProto.constructor : external_commonjs_vue_commonjs2_vue_root_Vue_default.a;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}
var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // Skip the properties that should not be overwritten
    if (shouldIgnore[key]) {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (false) {}

    Object.defineProperty(Extended, key, descriptor);
  });
}

function vue_class_component_esm_Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

vue_class_component_esm_Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

/* harmony default export */ var vue_class_component_esm = (vue_class_component_esm_Component);


// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/Emit.js
var Emit_spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (_target, propertyKey, descriptor) {
        var key = hyphenate(propertyKey);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var emit = function (returnValue) {
                var emitName = event || key;
                if (returnValue === undefined) {
                    if (args.length === 0) {
                        _this.$emit(emitName);
                    }
                    else if (args.length === 1) {
                        _this.$emit(emitName, args[0]);
                    }
                    else {
                        _this.$emit.apply(_this, Emit_spreadArrays([emitName], args));
                    }
                }
                else {
                    args.unshift(returnValue);
                    _this.$emit.apply(_this, Emit_spreadArrays([emitName], args));
                }
            };
            var returnValue = original.apply(this, args);
            if (isPromise(returnValue)) {
                returnValue.then(emit);
            }
            else {
                emit(returnValue);
            }
            return returnValue;
        };
    };
}
function isPromise(obj) {
    return obj instanceof Promise || (obj && typeof obj.then === 'function');
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/Inject.js

/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
function Inject(options) {
    return createDecorator(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key;
        }
    });
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/helpers/provideInject.js
function needToProduceProvide(original) {
    return (typeof original !== 'function' ||
        (!original.managed && !original.managedReactive));
}
function produceProvide(original) {
    var provide = function () {
        var _this = this;
        var rv = typeof original === 'function' ? original.call(this) : original;
        rv = Object.create(rv || null);
        // set reactive services (propagates previous services if necessary)
        rv[reactiveInjectKey] = Object.create(this[reactiveInjectKey] || {});
        for (var i in provide.managed) {
            rv[provide.managed[i]] = this[i];
        }
        var _loop_1 = function (i) {
            rv[provide.managedReactive[i]] = this_1[i]; // Duplicates the behavior of `@Provide`
            Object.defineProperty(rv[reactiveInjectKey], provide.managedReactive[i], {
                enumerable: true,
                configurable: true,
                get: function () { return _this[i]; },
            });
        };
        var this_1 = this;
        for (var i in provide.managedReactive) {
            _loop_1(i);
        }
        return rv;
    };
    provide.managed = {};
    provide.managedReactive = {};
    return provide;
}
/** Used for keying reactive provide/inject properties */
var reactiveInjectKey = '__reactiveInject__';
function inheritInjected(componentOptions) {
    // inject parent reactive services (if any)
    if (!Array.isArray(componentOptions.inject)) {
        componentOptions.inject = componentOptions.inject || {};
        componentOptions.inject[reactiveInjectKey] = {
            from: reactiveInjectKey,
            default: {},
        };
    }
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/InjectReactive.js


/**
 * decorator of a reactive inject
 * @param from key
 * @return PropertyDecorator
 */
function InjectReactive(options) {
    return createDecorator(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            var fromKey_1 = !!options ? options.from || options : key;
            var defaultVal_1 = (!!options && options.default) || undefined;
            if (!componentOptions.computed)
                componentOptions.computed = {};
            componentOptions.computed[key] = function () {
                var obj = this[reactiveInjectKey];
                return obj ? obj[fromKey_1] : defaultVal_1;
            };
            componentOptions.inject[reactiveInjectKey] = reactiveInjectKey;
        }
    });
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/helpers/metadata.js
/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
function applyMetadata(options, target, key) {
    if (reflectMetadataIsSupported) {
        if (!Array.isArray(options) &&
            typeof options !== 'function' &&
            !options.hasOwnProperty('type') &&
            typeof options.type === 'undefined') {
            var type = Reflect.getMetadata('design:type', target, key);
            if (type !== Object) {
                options.type = type;
            }
        }
    }
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/Model.js


/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
            componentOptions.model = { prop: k, event: event || k };
        })(target, key);
    };
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/ModelSync.js


/**
 * decorator of synced model and prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
function ModelSync(propName, event, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[propName] = options;
            componentOptions.model = { prop: propName, event: event || k };
            (componentOptions.computed || (componentOptions.computed = {}))[k] = {
                get: function () {
                    return this[propName];
                },
                set: function (value) {
                    // @ts-ignore
                    this.$emit(event, value);
                },
            };
        })(target, key);
    };
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/Prop.js


/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/PropSync.js


/**
 * decorator of a synced prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param options the options for the synced prop
 * @return PropertyDecorator | void
 */
function PropSync(propName, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[propName] = options;
            (componentOptions.computed || (componentOptions.computed = {}))[k] = {
                get: function () {
                    return this[propName];
                },
                set: function (value) {
                    this.$emit("update:" + propName, value);
                },
            };
        })(target, key);
    };
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/Provide.js


/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        inheritInjected(componentOptions);
        if (needToProduceProvide(provide)) {
            provide = componentOptions.provide = produceProvide(provide);
        }
        provide.managed[k] = key || k;
    });
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/ProvideReactive.js


/**
 * decorator of a reactive provide
 * @param key key
 * @return PropertyDecorator | void
 */
function ProvideReactive(key) {
    return createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        inheritInjected(componentOptions);
        if (needToProduceProvide(provide)) {
            provide = componentOptions.provide = produceProvide(provide);
        }
        provide.managedReactive[k] = key || k;
    });
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/Ref.js

/**
 * decorator of a ref prop
 * @param refKey the ref key defined in template
 */
function Ref(refKey) {
    return createDecorator(function (options, key) {
        options.computed = options.computed || {};
        options.computed[key] = {
            cache: false,
            get: function () {
                return this.$refs[refKey || key];
            },
        };
    });
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/VModel.js

/**
 * decorator for capturings v-model binding to component
 * @param options the options for the prop
 */
function VModel(options) {
    if (options === void 0) { options = {}; }
    var valueKey = 'value';
    return createDecorator(function (componentOptions, key) {
        ;
        (componentOptions.props || (componentOptions.props = {}))[valueKey] = options;
        (componentOptions.computed || (componentOptions.computed = {}))[key] = {
            get: function () {
                return this[valueKey];
            },
            set: function (value) {
                this.$emit('input', value);
            },
        };
    });
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/decorators/Watch.js

/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return createDecorator(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        var watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
    });
}

// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/index.js
/** vue-property-decorator verson 9.1.2 MIT LICENSE copyright 2020 kaorun343 */
/// <reference types='reflect-metadata'/>
















// CONCATENATED MODULE: ./src/lib/views/tool.ts
// 剪裁用
var canvas = document.createElement('canvas');
canvas.style.display = 'none';
var ctx = canvas.getContext('2d');
/**
 * 绘制矩形的内切椭圆
 * @param ctx
 * @param x
 * @param y
 * @param w
 * @param h
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
 * 得到椭圆参数方程的参数，
 * 椭圆参数方程为：
 *      A * x^2 + B * x * y + C * y^2 + F = 0
 * @param a       长轴半径
 * @param b       短轴半径
 * @param angle   旋转角度，逆时针
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
 * @param A
 * @param B
 * @param C
 * @param F
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
 * @param x
 * @param y
 * @param angle
 */
function tool_rotatePoint(x, y, angle) {
  var a = Math.sqrt(x * x + y * y);
  var r1 = Math.atan2(x, y);
  var r2 = angle * Math.PI / 180 + r1;
  return {
    x: a * Math.sin(r2),
    y: a * Math.cos(r2)
  };
}
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
 * @param src
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
/* harmony default export */ var tool = ({
  rotatePoint: tool_rotatePoint,
  loadCrossDomainImg: loadCrossDomainImg,
  cloneJSON: function cloneJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * 加载图片
   * @param src
   * @returns {Promise<any>}
   */loadImg: function loadImg(src) {
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
   * @param img
   * @param width           // 裁剪宽
   * @param height          // 裁剪高
   * @param showRect        // 显示图片的矩形
   * @param encoderOptions  // 压缩率
   * @param format          // 导出格式
   * @param pathDone        // 绘制剪裁路径
   * @returns {string}
   */clipBy: function clipBy(img, width, height, showRect) {
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
   * @param img
   * @param width           // 裁剪宽
   * @param height          // 裁剪高
   * @param showRect        // 显示图片的矩形
   * @param encoderOptions
   * @param format
   */clipByRound: function clipByRound(img, width, height, showRect) {
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
   * @param img {HTMLImageElement}
   * @param max {number}
   * @param encoderOptions {number}
   */clipByMax: function clipByMax(img) {
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
   * @param base64
   * @param format
   */base64ToBlob: function base64ToBlob(base64) {
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
      var win = window;
      var BlobBuilder = win.BlobBuilder || win.WebKitBlobBuilder || win.MozBlobBuilder || win.MSBlobBuilder;
      if (e.name === 'TypeError' && BlobBuilder) {
        var bb = new BlobBuilder();
        bb.append(uBuffer.buffer);
        blob = bb.getBlob(format);
      } else if (e.name === 'InvalidStateError') {
        blob = new Blob([aBuffer], {
          type: format
        });
      }
    }
    return blob;
  },
  /**
   * 移动端双指处理
   * @param tp1
   * @param tp2
   */doubleTouche: function doubleTouche(tp1, tp2) {
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
   * @param w
   * @param h
   * @param angle
   */getEllipseRectByRect: function getEllipseRectByRect(w, h, angle) {
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
   * @param w
   * @param h
   * @param angle
   */getRectByRect: function getRectByRect(w, h, angle) {
    if (!(angle / 180)) {
      return {
        x: -w / 2,
        y: -h / 2,
        w: w,
        h: h
      };
    }
    var p1 = tool_rotatePoint(-w / 2, -h / 2, angle);
    var p2 = tool_rotatePoint(w / 2, -h / 2, angle);
    var nx = Math.max(Math.abs(p1.x), Math.abs(p2.x));
    var ny = Math.max(Math.abs(p1.y), Math.abs(p2.y));
    return {
      x: -nx,
      y: -ny,
      w: nx + nx,
      h: ny + ny
    };
  }
});
// CONCATENATED MODULE: ./src/lib/views/PhotoRoot.ts
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var PhotoRoot_PhotoRoot = /*#__PURE__*/function () {
  function PhotoRoot() {
    _classCallCheck(this, PhotoRoot);
    this.debug = false;
    // 是否是火狐
    this.isFirefox = navigator.userAgent.indexOf("Firefox") > 0;
    // 事件队列
    this.eventList = new Map();
    // 事件优先队列
    this.priorityEvent = null;
    // 记录滚轮触发时间
    this.wheelTime = 0;
    this.wheelTimeOut = 0;
    // 记录滚轮状态
    this.wheelstatus = false;
  }
  _createClass(PhotoRoot, [{
    key: "init",
    value: function init(el) {
      var magnification = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1.5;
      this.root = el;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
      this.drawWidth = Math.floor(this.width * magnification);
      this.drawHeight = Math.floor(this.height * magnification);
      this.magnification = magnification;
      this.core = {
        x: Math.floor(this.drawWidth / 2),
        y: Math.floor(this.drawHeight / 2)
      };
      this._eventInit();
    }
    /**
     * 鼠标样式
     */
  }, {
    key: "cursor",
    set: function set(value) {
      this.root.style.cursor = value;
    }
    /**
     * 添加对象到事件队列中
     * @param pe
     */
  }, {
    key: "addEventList",
    value: function addEventList(pe) {
      this.eventList.set(pe.className, pe);
    }
    /**
     * 从事件队列中获取对象
     * @param className
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
     * @param className
     */
  }, {
    key: "deleteEventList",
    value: function deleteEventList(className) {
      this.eventList.delete(className);
    }
    /**
     * 添加对象到事件优先队列
     * @param pe
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
        var e = event || window.event;
        e.preventDefault();
        var delta = e.detail * -40;
        _this._mouseWheel(delta, {
          x: e.layerX * _this.magnification - _this.core.x,
          y: e.layerY * _this.magnification - _this.core.y
        });
      }, false) : this.root.addEventListener('mousewheel', function (event) {
        var e = event || window.event;
        e.preventDefault();
        var delta = e.wheelDelta || e.detail;
        _this._mouseWheel(delta, {
          x: e.offsetX * _this.magnification - _this.core.x,
          y: e.offsetY * _this.magnification - _this.core.y
        });
      }, false);
    }
  }, {
    key: "_touchStart",
    value: function _touchStart(touches) {
      var _this2 = this;
      var cts = Array.from(touches).map(function (t) {
        return _this2._getTouchePoint(t);
      });
      if (this.priorityEvent) {
        this.priorityEvent.touchStart(tool.cloneJSON(cts));
      } else {
        var _pes = [];
        var _iterator = _createForOfIteratorHelper(this.eventList.values()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var pe = _step.value;
            pe.touchStart(tool.cloneJSON(cts));
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
            return pe.touchEnd(tool.cloneJSON(cts));
          });
        }
      }
    }
  }, {
    key: "_touchEnd",
    value: function _touchEnd(touches) {
      var _this3 = this;
      var cts = Array.from(touches).map(function (t) {
        return _this3._getTouchePoint(t);
      });
      if (this.priorityEvent) {
        this.priorityEvent.touchEnd(tool.cloneJSON(cts));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.touchEnd(tool.cloneJSON(cts));
        });
      }
    }
  }, {
    key: "_touchMove",
    value: function _touchMove(touches) {
      var _this4 = this;
      var cts = Array.from(touches).map(function (t) {
        return _this4._getTouchePoint(t);
      });
      if (this.priorityEvent) {
        this.priorityEvent.touchMove(tool.cloneJSON(cts));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.touchMove(tool.cloneJSON(cts));
        });
      }
    }
  }, {
    key: "_mouseDown",
    value: function _mouseDown(e) {
      var cts = [this._getMousePoint(e)];
      if (this.priorityEvent) {
        this.priorityEvent.touchStart(tool.cloneJSON(cts));
      } else {
        var _pes = [];
        var _iterator2 = _createForOfIteratorHelper(this.eventList.values()),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var pe = _step2.value;
            pe.touchStart(tool.cloneJSON(cts));
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
            return pe.touchEnd(tool.cloneJSON(cts));
          });
        }
      }
    }
  }, {
    key: "_mouseUp",
    value: function _mouseUp(e) {
      var cts = [this._getMousePoint(e)];
      if (this.priorityEvent) {
        this.priorityEvent.touchEnd(tool.cloneJSON(cts));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.touchEnd(tool.cloneJSON(cts));
        });
      }
    }
  }, {
    key: "_mouseMove",
    value: function _mouseMove(e) {
      var cts = [this._getMousePoint(e)];
      if (this.priorityEvent) {
        this.priorityEvent.touchMove(tool.cloneJSON(cts));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.touchMove(tool.cloneJSON(cts));
        });
      }
    }
  }, {
    key: "_mouseWheel",
    value: function _mouseWheel(zoom, point) {
      var _this5 = this;
      clearTimeout(this.wheelTimeOut);
      var now = Date.now();
      var isStart = now - this.wheelTime > 400 && !this.wheelstatus;
      if (isStart) {
        // 滚轮开始
        this.wheelstatus = true;
        this._wheelStart(zoom, point);
      }
      this.wheelTime = now;
      this.wheelTimeOut = setTimeout(function () {
        // 滚轮结束
        _this5.wheelstatus = false;
        _this5._wheelEnd(zoom, point);
      }, 400);
      isStart || this._wheelChange(zoom, point);
    }
  }, {
    key: "_wheelStart",
    value: function _wheelStart(zoom, point) {
      if (this.priorityEvent) {
        this.priorityEvent.wheelStart(zoom, tool.cloneJSON(point));
      } else {
        var _pes = [];
        var _iterator3 = _createForOfIteratorHelper(this.eventList.values()),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var pe = _step3.value;
            pe.wheelStart(zoom, tool.cloneJSON(point));
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
            return pe.wheelEnd(zoom, tool.cloneJSON(point));
          });
        }
      }
    }
  }, {
    key: "_wheelChange",
    value: function _wheelChange(zoom, point) {
      if (this.priorityEvent) {
        this.priorityEvent.wheelChange(zoom, tool.cloneJSON(point));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.wheelChange(zoom, tool.cloneJSON(point));
        });
      }
    }
  }, {
    key: "_wheelEnd",
    value: function _wheelEnd(zoom, point) {
      if (this.priorityEvent) {
        this.priorityEvent.wheelEnd(zoom, tool.cloneJSON(point));
      } else {
        this.eventList.forEach(function (pe) {
          return pe.wheelEnd(zoom, tool.cloneJSON(point));
        });
      }
    }
    /**
     * 获取手指
     * @param ct
     * @private
     */
  }, {
    key: "_getTouchePoint",
    value: function _getTouchePoint(ct) {
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
     * @param ct
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
     * @param el
     * @param p
     * @private
     */
  }, {
    key: "_getClientPosition",
    value: function _getClientPosition(el, p) {
      var rect = el.getBoundingClientRect();
      p.x += rect.left;
      p.y += rect.top;
      return p;
    }
  }]);
  return PhotoRoot;
}();

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"28b04d81-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/views/vue-picture-cut-canvas.vue?vue&type=template&id=57590d46&
var vue_picture_cut_canvasvue_type_template_id_57590d46_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('canvas',{staticClass:"vue-picture-cut_canvas"})}
var vue_picture_cut_canvasvue_type_template_id_57590d46_staticRenderFns = []


// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-canvas.vue?vue&type=template&id=57590d46&

// CONCATENATED MODULE: ./src/lib/views/Bezier.ts
function Bezier_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Bezier_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Bezier_createClass(Constructor, protoProps, staticProps) { if (protoProps) Bezier_defineProperties(Constructor.prototype, protoProps); if (staticProps) Bezier_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * 常用贝塞尔预设
 */
var BEZIER = {
  'linear': [[0, 0], [1, 1]],
  'ease': [[0, 0], [0.25, 0.1], [1, 1]],
  'ease-in': [[0, 0], [0.42, 0], [1, 1]],
  'ease-out': [[0, 0], [0.58, 1], [1, 1]],
  'ease-in-out': [[0, 0], [0.42, 0], [0.58, 1], [1, 1]]
};
/**
 * n次贝塞尔
 */
var Bezier = /*#__PURE__*/function () {
  function Bezier() {
    Bezier_classCallCheck(this, Bezier);
    this.bezierCtrlNodesArr = [];
  }
  Bezier_createClass(Bezier, [{
    key: "setOpt",
    value: function setOpt() {
      var Nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.bezierCtrlNodesArr = Nodes;
      return this;
    }
  }, {
    key: "getPoint",
    value: function getPoint(t) {
      var _this = this;
      var bezierCtrlNodesArr = this.bezierCtrlNodesArr,
        n = bezierCtrlNodesArr.length - 1;
      var x = 0,
        y = 0;
      bezierCtrlNodesArr.forEach(function (item, index) {
        if (!index) {
          x += item[0] * Math.pow(1 - t, n - index) * Math.pow(t, index);
          y += item[1] * Math.pow(1 - t, n - index) * Math.pow(t, index);
        } else {
          x += _this.factorial(n) / _this.factorial(index) / _this.factorial(n - index) * item[0] * Math.pow(1 - t, n - index) * Math.pow(t, index);
          y += _this.factorial(n) / _this.factorial(index) / _this.factorial(n - index) * item[1] * Math.pow(1 - t, n - index) * Math.pow(t, index);
        }
      });
      return {
        x: x,
        y: y
      };
    }
    /**
     * 递归阶乘
     * @param num
     */
  }, {
    key: "factorial",
    value: function factorial(num) {
      if (num <= 1) {
        return 1;
      } else {
        return num * this.factorial(num - 1);
      }
    }
  }]);
  return Bezier;
}();

// CONCATENATED MODULE: ./src/lib/views/animation.ts
function animation_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function animation_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function animation_createClass(Constructor, protoProps, staticProps) { if (protoProps) animation_defineProperties(Constructor.prototype, protoProps); if (staticProps) animation_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

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
var animation_Animation = /*#__PURE__*/function () {
  function Animation(option) {
    animation_classCallCheck(this, Animation);
    this.bezier = new Bezier();
    /**
     * 动画持续时间，单位毫秒，
     * 默认1000毫秒。
     */
    this.duration = 1000;
    /**
     * 动画的过渡类型：
     * linear(线性过渡)；
     * ease(默认，平滑过渡)；
     * ease-in(由慢到快)；
     * ease-out(由快到慢)；
     * ease-in-out(由慢到快再到慢)；
     * [[x1,y1],[x1,y1]...](数组,[x1,y1]表示点1的坐标,[x2,y2]表示点2的坐标)。
     */
    this.timing = [];
    /**
     * 动画的延迟时间，单位毫秒，
     * 默认0毫秒。
     */
    this.delay = 0;
    /**
     * 动画循环次数，infinite为无限循环
     * 默认1次。
     */
    this.iteration = 1;
    /**
     * 动画在循环中是否反向运动：
     * normal(默认，正向运动)；
     * reverse(反向运行)；
     * alternate(先正向，后反向，并交替)；
     * alternate-reverse(先反向，后正向，并交替)。
     */
    this.direction = 'normal';
    /**
     * 回调函数，接收参数x，x在0~1之间
     */
    this.change = function () {
      return false;
    };
    /**
     * 回调函数，动画结束时执行
     */
    this.end = function () {
      return undefined;
    };
    /**
     * 动画开始时的时间
     */
    this.startTime = 0;
    /**
     * 动画状态
     */
    this.id = 0;
    if (option.duration !== void 0) this.duration = option.duration;
    if (option.timing !== void 0) {
      if (typeof option.timing === "string") {
        this.timing = BEZIER[option.timing] || BEZIER['linear'];
      } else {
        this.timing = option.timing;
      }
    }
    if (option.delay !== void 0) this.delay = option.delay;
    if (option.iteration !== void 0) this.iteration = option.iteration;
    if (option.direction !== void 0) this.direction = option.direction;
    if (option.change !== void 0) this.change = option.change;
    if (option.end !== void 0) this.end = option.end;
    // 包含循环的总的时间
    var times = this.iteration === 'infinite' ? 9999999999999 : this.iteration * this.duration;
    // 如果动画正反向交替进行，则总时间乘以2
    this.times = this.direction === 'alternate' || this.direction === 'alternate-reverse' ? 2 * times : times;
    this.bezier.setOpt(this.timing);
  }
  /**
   * 开始动画
   */
  animation_createClass(Animation, [{
    key: "start",
    value: function start() {
      var _this = this;
      // 动画开始时的时间
      this.startTime = 0;
      // 判断延迟执行
      if (this.delay) {
        setTimeout(function () {
          _this.startTime = Date.now();
          _this._do();
        }, this.delay);
      } else {
        this.startTime = Date.now();
        this._do();
      }
      return this;
    }
  }, {
    key: "_do",
    value: function _do() {
      var _this2 = this;
      this.id = requestAnimationFrame(function () {
        // 动画运行的时间，毫秒
        var difT = Date.now() - _this2.startTime;
        var difT2 = difT / _this2.duration;
        // 运行的次数
        var n = parseInt(String(difT2));
        difT2 = difT2 - n;
        switch (_this2.direction) {
          case 'normal':
            // 正向运行
            difT2 = difT < _this2.times ? difT2 : 1;
            break;
          case 'reverse':
            // 反向运行
            difT2 = difT < _this2.times ? 1 - difT2 : 0;
            break;
          case 'alternate':
            // 先正向，后反向，并交替
            if (n % 2) difT2 = difT < _this2.times ? 1 - difT2 : 0;else difT2 = difT < _this2.times ? difT2 : 1;
            if (n / 2 === _this2.iteration) difT2 = 0;
            break;
          case 'alternate-reverse':
            // 先反向，后正向，并交替
            if (n % 2) difT2 = difT < _this2.times ? difT2 : 1;else difT2 = difT < _this2.times ? 1 - difT2 : 0;
            if (n / 2 === _this2.iteration) difT2 = 1;
            break;
        }
        var _this2$bezier$getPoin = _this2.bezier.getPoint(difT2),
          x = _this2$bezier$getPoin.x,
          y = _this2$bezier$getPoin.y;
        var c = _this2.change(x, y);
        if (c !== false && difT < _this2.times) {
          _this2._do();
        } else _this2.end();
      });
    }
    /**
     * 中止动画
     * @param doEnd 是否执行动画结束时的回调
     */
  }, {
    key: "abort",
    value: function abort() {
      var doEnd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.id > 0 && cancelAnimationFrame(this.id);
      this.id = 0;
      doEnd && this.end();
    }
  }]);
  return Animation;
}();
function createAnimation(option) {
  return new animation_Animation(option);
}
// CONCATENATED MODULE: ./src/lib/views/PhotoMain.ts
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || PhotoMain_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function PhotoMain_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return PhotoMain_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return PhotoMain_arrayLikeToArray(o, minLen); }
function PhotoMain_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { PhotoMain_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function PhotoMain_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function PhotoMain_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function PhotoMain_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function PhotoMain_createClass(Constructor, protoProps, staticProps) { if (protoProps) PhotoMain_defineProperties(Constructor.prototype, protoProps); if (staticProps) PhotoMain_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


/**
 * 主画布
 */
var PhotoMain_PhotoMain = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param el
   * @param root
   */
  function PhotoMain(el, root) {
    PhotoMain_classCallCheck(this, PhotoMain);
    this.className = 'PhotoMain';
    // 图片矩形
    this.imgRect = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
    };
    // 显示矩形
    this.showRect = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      r: 0,
      sV: 1,
      sH: 1
    };
    // 图片可移动范围
    this.moveRect = {
      minX: null,
      minY: null,
      maxX: null,
      maxY: null
    };
    // 当前触点
    this.touchList = [];
    // 当前状态
    this.status = null;
    // 单指(或双指中心)初始偏移量
    this.touchstartPoint = {
      x: 0,
      y: 0
    };
    // 初始触点记录
    this.touchstartEvent = tool.doubleTouche({
      x: 0,
      y: 0,
      id: 0
    });
    this.animation = undefined;
    this.scaleTimer = null;
    /**
     * 供外部使用，注入的方法会在每次加载图片后执行
     */
    this.loadImgEd = new Map();
    el.width = root.drawWidth;
    el.height = root.drawHeight;
    root.addEventList(this);
    this.root = root;
    this.canvas = el;
    this.ctx = el.getContext('2d');
    this.ctx.translate(this.root.core.x, this.root.core.y);
  }
  /**
   * 载入图片
   * @param src
   * @param angle
   * @param _n
   */
  PhotoMain_createClass(PhotoMain, [{
    key: "setSrc",
    value: function setSrc(src) {
      var _this = this;
      var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.showRect.r;
      var _n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      this.clear();
      this.src = src;
      this.loadingEvent && this.loadingEvent(true);
      tool.loadImg(src).then(function (img) {
        if (!_n) {
          _this.originalImg = img;
        }
        var result = tool.clipByMax(img, 1500);
        if (result) {
          _this.setSrc(result.src, angle, ++_n);
          return;
        }
        _this.img = img;
        _this._initRect();
        _this.showRect.r = angle;
        if (!_this.moveRect.minX || !_this.moveRect.minY) {
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
        _this.loadingEvent && _this.loadingEvent(false);
        _this.root.onPhotoChange && _this.root.onPhotoChange({
          target: _this,
          type: 'imageInit'
        });
      }, function () {
        _this.loadingEvent && _this.loadingEvent(false);
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
        if (!this.moveRect.minX || !this.moveRect.minY) {
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
          var range = this._checkRange();
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
        this.root.onPhotoChange && this.root.onPhotoChange({
          target: this,
          type: 'imageReset'
        });
      }
    }
    /**
     * 设置图片可移动范围
     * @param minX
     * @param minY
     * @param maxX
     * @param maxY
     * @param offPoint  中心偏移量
     * @param zoom      放大系数
     * @return          计算之后的图片坐标偏移量
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
        var range = this._checkRange(_objectSpread(_objectSpread({}, offPoint), {}, {
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
     * @param angle       // 角度
     * @param animation   // 是否动画
     */
  }, {
    key: "setAngle",
    value: function setAngle(angle) {
      var _this2 = this;
      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.img) {
        if (animation && this.animation) {
          this.animation.abort();
        }
        this.loadImgEd.forEach(function (v) {
          v && v({
            showRect: _objectSpread(_objectSpread({}, _this2.showRect), {}, {
              r: angle
            })
          }, animation);
        });
        this.root.onPhotoChange && this.root.onPhotoChange({
          target: this,
          type: 'imageAngle'
        });
      } else {
        this.showRect.r = angle;
      }
    }
    /**
     * 设置图片翻折
     * @param sV  垂直翻折
     * @param sH  水平翻折
     * @param animation   // 是否动画
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
          var _this$animation;
          (_this$animation = this.animation) === null || _this$animation === void 0 ? void 0 : _this$animation.abort();
          this.doAnimation(0, 0, 0, 0, 0, sV, sH);
        }
      }
      this.root.onPhotoChange && this.root.onPhotoChange({
        target: this,
        type: 'imageFlip'
      });
    }
    /**
     * 设置图片垂直翻折
     * @param sV  垂直翻折
     * @param animation   // 是否动画
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
          var _this$animation2;
          (_this$animation2 = this.animation) === null || _this$animation2 === void 0 ? void 0 : _this$animation2.abort();
          this.doAnimation(0, 0, 0, 0, 0, sV);
        }
        this.root.onPhotoChange && this.root.onPhotoChange({
          target: this,
          type: 'imageFlipV'
        });
      }
    }
    /**
     * 设置图片水平翻折
     * @param sH  水平翻折
     * @param animation   // 是否动画
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
          var _this$animation3;
          (_this$animation3 = this.animation) === null || _this$animation3 === void 0 ? void 0 : _this$animation3.abort();
          this.doAnimation(0, 0, 0, 0, 0, undefined, sH);
        }
        this.root.onPhotoChange && this.root.onPhotoChange({
          target: this,
          type: 'imageFlipH'
        });
      }
    }
    /**
     * 缩放
     * @param zoom  缩放系数，大于1(放大)，大于0小于1(缩小)
     */
  }, {
    key: "scale",
    value: function scale(zoom) {
      var _this$animation4,
        _this3 = this;
      if (!this.img || zoom < 0 || zoom === 1) return;
      this.scaleTimer !== null && clearTimeout(this.scaleTimer);
      (_this$animation4 = this.animation) === null || _this$animation4 === void 0 ? void 0 : _this$animation4.abort();
      this.touchstartPoint = {
        x: 0,
        y: 0
      };
      var offPoint = this._changePointByCanvas(this.showRect);
      this._scaleByZoom(zoom, offPoint);
      this._draw(this.imgRect, this.showRect);
      this.scaleTimer = setTimeout(function () {
        var _this3$_checkRange = _this3._checkRange(),
          _this3$_checkRange2 = _slicedToArray(_this3$_checkRange, 4),
          offX = _this3$_checkRange2[0],
          offY = _this3$_checkRange2[1],
          offW = _this3$_checkRange2[2],
          offH = _this3$_checkRange2[3];
        _this3.doAnimation(offX, offY, offW, offH, 0);
      }, 500);
    }
    /**
     * 监听图片加载过程
     * @param callback
     */
  }, {
    key: "onLoading",
    value: function onLoading(callback) {
      this.loadingEvent = callback;
    }
    /**
     * 设置图片矩形
     * @param showRect
     */
  }, {
    key: "setShowRect",
    value: function setShowRect(showRect) {
      if (this.img) {
        this.showRect = showRect;
        this._draw(this.imgRect, this.showRect);
      }
    }
    /**
     * 将图片上的坐标映射到画布上
     * @param point
     */
  }, {
    key: "_changePointByCanvas",
    value: function _changePointByCanvas(point) {
      var r = this.showRect.r;
      return tool.rotatePoint(point.x, point.y, r);
    }
    /**
     * 将画布上的坐标映射到图片上
     * @param point
     */
  }, {
    key: "_changePointByImage",
    value: function _changePointByImage(point) {
      var r = this.showRect.r;
      return tool.rotatePoint(point.x, point.y, -r);
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
      var pw = this.root.drawWidth;
      var ph = this.root.drawHeight;
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
        var pw = this.root.drawWidth;
        var ph = this.root.drawHeight;
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
        this.moveRect = {
          minX: minX,
          minY: minY,
          maxX: maxX,
          maxY: maxY
        };
      } else {
        this.moveRect = {
          minX: minX,
          minY: minY,
          maxX: maxX,
          maxY: maxY
        };
      }
    }
    /**
     * 绘制画布
     * @param imgRect   图片矩形
     * @param showRect  将要显示的矩形
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
        var ctx = this.ctx;
        ctx.save();
        ctx.rotate(-r * Math.PI / 180);
        ctx.translate(x, y);
        ctx.scale(sH, sV);
        ctx.drawImage(this.img, imgRect.x, imgRect.y, imgRect.w, imgRect.h, -w / 2, -h / 2, w, h);
        ctx.scale(-sH, -sV);
        ctx.translate(-x, -y);
        if (this.root.debug) {
          ctx.strokeStyle = '#0f0';
          ctx.lineWidth = 2;
          for (var i = 0; i < this.root.drawHeight / 200; i++) {
            ctx.beginPath();
            ctx.moveTo(-this.root.core.x, i * 100 + 50);
            ctx.lineTo(this.root.core.x, i * 100 + 50);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(-this.root.core.x, -i * 100 - 50);
            ctx.lineTo(this.root.core.x, -i * 100 - 50);
            ctx.stroke();
            ctx.closePath();
          }
          for (var _i2 = 0; _i2 < this.root.drawWidth / 200; _i2++) {
            ctx.beginPath();
            ctx.moveTo(_i2 * 100 + 50, -this.root.core.y);
            ctx.lineTo(_i2 * 100 + 50, this.root.core.y);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.moveTo(-_i2 * 100 - 50, -this.root.core.y);
            ctx.lineTo(-_i2 * 100 - 50, this.root.core.y);
            ctx.stroke();
            ctx.closePath();
          }
          if (this.moveRect.minX !== null && this.moveRect.maxX !== null && this.moveRect.minY !== null && this.moveRect.maxY !== null) {
            ctx.strokeStyle = '#00f';
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.moveRect.minX, this.moveRect.minY, this.moveRect.maxX - this.moveRect.minX, this.moveRect.maxY - this.moveRect.minY);
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
      this.ctx.clearRect(-this.root.core.x, -this.root.core.y, this.root.drawWidth, this.root.drawHeight);
    }
  }, {
    key: "touchEnd",
    value: function touchEnd(tps) {
      if (!this.img) return;
      if (!this.touchList.length) {
        return;
      }
      tps = this.touchList.filter(function (v) {
        return v.id !== tps[0].id;
      });
      if (tps.length === 0) {
        this.wheelEnd();
      } else if (tps.length === 1) {
        this._touchStart1(tps[0]);
      }
      this.touchList = tps;
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
        var ids = this.touchList.map(function (v) {
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
      var _this$animation5;
      if (!this.img) return;
      (_this$animation5 = this.animation) === null || _this$animation5 === void 0 ? void 0 : _this$animation5.abort();
      var tp = tps[0];
      if (!this.touchList.length) {
        this.touchList.push(tp);
        this._touchStart1(tp);
      } else if (this.touchList.length === 1) {
        // 判断触点是否重复
        if (this.touchList[0].id !== tp.id) {
          this.touchList.push(tp);
          this._touchStart2(this.touchList[0], this.touchList[1]);
        }
      }
    }
  }, {
    key: "wheelStart",
    value: function wheelStart(zoom, point) {
      if (!this.img) return;
      this.status = 'scale';
      this.wheelChange(zoom, point);
    }
  }, {
    key: "wheelChange",
    value: function wheelChange(zoom, point) {
      var _this$animation6;
      if (!this.img) return;
      (_this$animation6 = this.animation) === null || _this$animation6 === void 0 ? void 0 : _this$animation6.abort();
      this.touchstartEvent = tool.doubleTouche(point);
      var core = this.touchstartEvent.core;
      var offPoint = this._changePointByImage(core);
      this.touchstartPoint = this._getPointerLocation(offPoint);
      this.root.setPriority(this);
      zoom = 1 + zoom * 0.0005;
      zoom = zoom > 1.08 ? 1.08 : zoom < 0.92593 ? 0.92593 : zoom;
      this._scaleByZoom(zoom, point);
      this._draw(this.imgRect, this.showRect);
    }
  }, {
    key: "wheelEnd",
    value: function wheelEnd() {
      if (!this.img) return;
      this.status = null;
      this.touchstartEvent = tool.doubleTouche({
        x: 0,
        y: 0,
        id: 0
      });
      this.touchstartPoint = {
        x: 0,
        y: 0
      };
      var _this$_checkRange3 = this._checkRange(),
        _this$_checkRange4 = _slicedToArray(_this$_checkRange3, 4),
        offX = _this$_checkRange4[0],
        offY = _this$_checkRange4[1],
        offW = _this$_checkRange4[2],
        offH = _this$_checkRange4[3];
      if (offX || offY || offW || offH) {
        this.doAnimation(offX, offY, offW, offH, 0);
      }
      this.root.deletePriority(this.className);
    }
  }, {
    key: "_touchStart1",
    value: function _touchStart1(tp) {
      this.status = 'move';
      this.touchstartEvent = tool.doubleTouche(tp);
      var offPoint = this._changePointByImage(tp);
      this.touchstartPoint = this._getPointerLocation(offPoint);
    }
  }, {
    key: "_touchStart2",
    value: function _touchStart2(tp1, tp2) {
      var _this$showRect4 = this.showRect,
        sV = _this$showRect4.sV,
        sH = _this$showRect4.sH;
      this.status = 'scale';
      if (!sV && sH || sV && !sH) {
        this.touchstartEvent = tool.doubleTouche(tp2, tp1);
      } else {
        this.touchstartEvent = tool.doubleTouche(tp1, tp2);
      }
      var core = this.touchstartEvent.core;
      var offPoint = this._changePointByImage(core);
      this.touchstartPoint = this._getPointerLocation(offPoint);
      this.root.setPriority(this);
      this.root.onPhotoChange && this.root.onPhotoChange({
        target: this,
        type: 'imageTouchStart2'
      });
    }
  }, {
    key: "_touchMove1",
    value: function _touchMove1(tp) {
      if (this.status === 'move') {
        this.root.setPriority(this);
        this.touchList[0] = tp;
        this._move(tp);
        this._draw(this.imgRect, this.showRect);
        this.root.onPhotoChange && this.root.onPhotoChange({
          target: this,
          type: 'imageMove'
        });
      }
    }
  }, {
    key: "_touchMove2",
    value: function _touchMove2(tp1, tp2) {
      if (this.status === 'scale') {
        this.touchList = [tp1, tp2];
        var doubleToucheEvent = tool.doubleTouche(tp1, tp2);
        this._scaleByLocation(doubleToucheEvent);
        this._draw(this.imgRect, this.showRect);
      }
    }
    /**
     * 获取core相对图片的位置
     * @param core
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
     * @private
     */
  }, {
    key: "_move",
    value: function _move(core) {
      var pl = this.touchstartPoint;
      var offPoint = this._changePointByImage(core);
      this.showRect.x = offPoint.x - pl.x;
      this.showRect.y = offPoint.y - pl.y;
    }
    /**
     * 缩放图片
     * @param e
     * @private
     */
  }, {
    key: "_scaleByLocation",
    value: function _scaleByLocation(e) {
      var zoom = e.length / this.touchstartEvent.length;
      zoom = zoom < 0.9091 ? 0.9091 : zoom;
      zoom = zoom > 1.1 ? 1.1 : zoom;
      this._scaleByZoom(zoom, e.core);
      this.touchstartEvent = e;
    }
    /**
     * 缩放图片
     * @param zoom-
     * @param core
     * @param angle
     * @private
     */
  }, {
    key: "_scaleByZoom",
    value: function _scaleByZoom() {
      var zoom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var core = arguments.length > 1 ? arguments[1] : undefined;
      var angle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var pl = this.touchstartPoint;
      this.touchstartPoint = {
        x: pl.x * zoom,
        y: pl.y * zoom
      };
      pl = this.touchstartPoint;
      var _this$showRect5 = this.showRect,
        w = _this$showRect5.w,
        h = _this$showRect5.h,
        r = _this$showRect5.r,
        sV = _this$showRect5.sV,
        sH = _this$showRect5.sH;
      var offPoint = this._changePointByImage(core);
      var showRect = this.showRect = {
        x: offPoint.x - pl.x,
        y: offPoint.y - pl.y,
        w: w * zoom,
        h: h * zoom,
        r: r + angle,
        sV: sV,
        sH: sH
      };
      var _this$_checkRange5 = this._checkRange(showRect),
        _this$_checkRange6 = _slicedToArray(_this$_checkRange5, 4),
        offX = _this$_checkRange6[0],
        offY = _this$_checkRange6[1],
        offW = _this$_checkRange6[2],
        offH = _this$_checkRange6[3];
      var isDiff = offX || offY || offW || offH;
      if (isDiff) {
        this.showRect = this._getShowRect(offX, offY, offW, offH, 0);
      }
      this.root.onPhotoChange && this.root.onPhotoChange({
        target: this,
        type: 'imageScale'
      });
      if (isDiff) {
        this.showRect = showRect;
      }
    }
    /**
     * 检查图片是否在可移动范围内
     * @param showRect
     * @private
     * @return    坐标偏移量
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
      var _this$moveRect = this.moveRect,
        minX = _this$moveRect.minX,
        minY = _this$moveRect.minY,
        maxX = _this$moveRect.maxX,
        maxY = _this$moveRect.maxY;
      minX = minX || 0;
      minY = minY || 0;
      maxX = maxX || 0;
      maxY = maxY || 0;
      var nx = cx,
        ny = cy,
        nw = cw,
        nh = ch;
      var rl = this._getPohtoByRangeLocation([cx, cy, cw, ch]);
      var imgOff = cw / ch;
      if (rl[4] <= 0) {
        nw = maxX - minX;
        nh = nw / imgOff;
        nx = cx + (cw - nw) / 2;
        ny = cy + (ch - nh) / 2;
      }
      rl = this._getPohtoByRangeLocation([nx, ny, nw, nh]);
      if (rl[5] <= 0) {
        nh = maxY - minY;
        nw = nh * imgOff;
        nx = cx + (cw - nw) / 2;
        ny = cy + (ch - nh) / 2;
      }
      rl = this._getPohtoByRangeLocation([nx, ny, nw, nh]);
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
     * @param newLocation
     * @private
     */
  }, {
    key: "_getPohtoByRangeLocation",
    value: function _getPohtoByRangeLocation(newLocation) {
      var _this$showRect6 = this.showRect,
        x = _this$showRect6.x,
        y = _this$showRect6.y,
        w = _this$showRect6.w,
        h = _this$showRect6.h;
      var _this$moveRect2 = this.moveRect,
        minX = _this$moveRect2.minX,
        minY = _this$moveRect2.minY,
        maxX = _this$moveRect2.maxX,
        maxY = _this$moveRect2.maxY;
      if (newLocation) {
        var _newLocation = _slicedToArray(newLocation, 4);
        x = _newLocation[0];
        y = _newLocation[1];
        w = _newLocation[2];
        h = _newLocation[3];
      }
      return [x - (minX || 0), y - (minY || 0), x + w - (maxX || 0), y + h - (maxY || 0), w - (maxX || 0) + (minX || 0), h - (maxY || 0) + (minY || 0)];
    }
    /**
     *
     * @param offX 偏移量
     * @param offY 偏移量
     * @param offW 偏移量
     * @param offH 偏移量
     * @param offR 偏移量
     * @param offSV 偏移量
     * @param offSH 偏移量
     * @private
     */
  }, {
    key: "_getShowRect",
    value: function _getShowRect(offX, offY, offW, offH, offR, offSV, offSH) {
      var _this$showRect7 = this.showRect,
        x = _this$showRect7.x,
        y = _this$showRect7.y,
        w = _this$showRect7.w,
        h = _this$showRect7.h,
        r = _this$showRect7.r,
        sV = _this$showRect7.sV,
        sH = _this$showRect7.sH;
      offSV = offSV === void 0 ? sV === -1 : offSV;
      offSH = offSH === void 0 ? sH === -1 : offSH;
      return {
        x: x + offX,
        y: y + offY,
        w: w + offW,
        h: h + offH,
        r: r + offR,
        sV: offSV ? -1 : 1,
        sH: offSH ? -1 : 1
      };
    }
    /**
     * 动画
     * @param offX 偏移量
     * @param offY 偏移量
     * @param offW 偏移量
     * @param offH 偏移量
     * @param offR 偏移量
     * @param offSV 偏移量
     * @param offSH 偏移量
     * @param endCallback 结束时的回调
     * @private
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
      var showRect = this._getShowRect(offX, offY, offW, offH, offR, offSV, offSH);
      var _offSV = showRect.sV - sV;
      var _offSH = showRect.sH - sH;
      if (!offX && !offY && !offW && !offH && !offR && !_offSH && !_offSV) {
        return;
      }
      this._showRect = this.showRect;
      this.showRect = showRect;
      this.animation = createAnimation({
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
  return PhotoMain;
}();

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/views/vue-picture-cut-canvas.vue?vue&type=script&lang=ts&
function vue_picture_cut_canvasvue_type_script_lang_ts_typeof(obj) { "@babel/helpers - typeof"; return vue_picture_cut_canvasvue_type_script_lang_ts_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, vue_picture_cut_canvasvue_type_script_lang_ts_typeof(obj); }
function vue_picture_cut_canvasvue_type_script_lang_ts_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function vue_picture_cut_canvasvue_type_script_lang_ts_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function vue_picture_cut_canvasvue_type_script_lang_ts_createClass(Constructor, protoProps, staticProps) { if (protoProps) vue_picture_cut_canvasvue_type_script_lang_ts_defineProperties(Constructor.prototype, protoProps); if (staticProps) vue_picture_cut_canvasvue_type_script_lang_ts_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (vue_picture_cut_canvasvue_type_script_lang_ts_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var vue_picture_cut_canvasvue_type_script_lang_ts_VuePictureCutCanvas = /*#__PURE__*/function (_Vue) {
  _inherits(VuePictureCutCanvas, _Vue);
  var _super = _createSuper(VuePictureCutCanvas);
  function VuePictureCutCanvas() {
    var _this;
    vue_picture_cut_canvasvue_type_script_lang_ts_classCallCheck(this, VuePictureCutCanvas);
    _this = _super.apply(this, arguments);
    _this.photoMain = null;
    return _this;
  }
  vue_picture_cut_canvasvue_type_script_lang_ts_createClass(VuePictureCutCanvas, [{
    key: "photoRoot",
    get: function get() {
      var _this$cutRoot;
      return (_this$cutRoot = this.cutRoot) === null || _this$cutRoot === void 0 ? void 0 : _this$cutRoot.photoRoot;
    }
  }, {
    key: "watchAngle",
    value: function watchAngle(to) {
      if (this.photoMain && to !== undefined) {
        this.photoMain.setAngle(to, true);
      }
    }
  }, {
    key: "created",
    value: function created() {
      this.cutRoot = this.getCutRoot();
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var _this2 = this;
      setTimeout(function () {
        _this2.photoMain = new PhotoMain_PhotoMain(_this2.$el, _this2.photoRoot);
        _this2.photoMain.onLoading(function (loading) {
          _this2._loading = loading;
        });
      }, 0);
    }
  }]);
  return VuePictureCutCanvas;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);
__decorate([Prop({
  type: Number,
  required: false
})], vue_picture_cut_canvasvue_type_script_lang_ts_VuePictureCutCanvas.prototype, "angle", void 0);
__decorate([PropSync('loading', {
  type: Boolean,
  default: false
})], vue_picture_cut_canvasvue_type_script_lang_ts_VuePictureCutCanvas.prototype, "_loading", void 0);
__decorate([Watch('angle')], vue_picture_cut_canvasvue_type_script_lang_ts_VuePictureCutCanvas.prototype, "watchAngle", null);
__decorate([Inject('getCutRoot')], vue_picture_cut_canvasvue_type_script_lang_ts_VuePictureCutCanvas.prototype, "getCutRoot", void 0);
vue_picture_cut_canvasvue_type_script_lang_ts_VuePictureCutCanvas = __decorate([vue_class_component_esm({
  name: 'VuePictureCutCanvas'
})], vue_picture_cut_canvasvue_type_script_lang_ts_VuePictureCutCanvas);
/* harmony default export */ var vue_picture_cut_canvasvue_type_script_lang_ts_ = (vue_picture_cut_canvasvue_type_script_lang_ts_VuePictureCutCanvas);
// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-canvas.vue?vue&type=script&lang=ts&
 /* harmony default export */ var views_vue_picture_cut_canvasvue_type_script_lang_ts_ = (vue_picture_cut_canvasvue_type_script_lang_ts_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
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

// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-canvas.vue





/* normalize component */

var component = normalizeComponent(
  views_vue_picture_cut_canvasvue_type_script_lang_ts_,
  vue_picture_cut_canvasvue_type_template_id_57590d46_render,
  vue_picture_cut_canvasvue_type_template_id_57590d46_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_picture_cut_canvas = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"28b04d81-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/views/vue-picture-cut-mask.vue?vue&type=template&id=b1f21cd4&scoped=true&
var vue_picture_cut_maskvue_type_template_id_b1f21cd4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"vue-picture-cut_mask",attrs:{"preserveAspectRatio":"none","viewBox":_vm.viewBox}},[_c('path',{staticClass:"cls-1",attrs:{"fill":_vm.color || 'rgba(0,0,0,.5)',"d":("M0,0 H" + _vm.drawWidth + " V" + _vm.drawHeight + " H0 V0 Z " + _vm.round)}}),(_vm.thisResize || !_vm.thisRound)?_c('rect',_vm._b({staticClass:"cls-3",style:({ 'stroke-dasharray': _vm.border, stroke: _vm.thisRound ? 'rgba(255,255,255,.7)' : _vm.borderColor || '#ff5500' })},'rect',_vm.rect,false)):_vm._e(),(_vm.thisRound)?_c('path',{staticClass:"cls-2",attrs:{"stroke":_vm.borderColor || '#ff5500',"d":_vm.round}}):_vm._e(),(_vm.thisResize)?_c('path',{staticClass:"cls-4",attrs:{"d":_vm.TLHorn}}):_vm._e(),(_vm.thisResize)?_c('path',{staticClass:"cls-4",attrs:{"d":_vm.TRHorn}}):_vm._e(),(_vm.thisResize)?_c('path',{staticClass:"cls-4",attrs:{"d":_vm.BLHorn}}):_vm._e(),(_vm.thisResize)?_c('path',{staticClass:"cls-4",attrs:{"d":_vm.BRHorn}}):_vm._e(),(_vm.cutRoot && _vm.cutRoot.cutSize)?_c('text',{staticClass:"text",attrs:{"x":_vm.rect.x,"y":_vm.rect.y - 10}},[_vm._t("text",[_vm._v(" "+_vm._s(_vm.cutRoot.cutSize.w + ' x ' + _vm.cutRoot.cutSize.h)+" ")])],2):_vm._e()])}
var vue_picture_cut_maskvue_type_template_id_b1f21cd4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-mask.vue?vue&type=template&id=b1f21cd4&scoped=true&

// CONCATENATED MODULE: ./src/lib/views/PhotoMask.ts
function PhotoMask_slicedToArray(arr, i) { return PhotoMask_arrayWithHoles(arr) || PhotoMask_iterableToArrayLimit(arr, i) || PhotoMask_unsupportedIterableToArray(arr, i) || PhotoMask_nonIterableRest(); }
function PhotoMask_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function PhotoMask_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return PhotoMask_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return PhotoMask_arrayLikeToArray(o, minLen); }
function PhotoMask_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function PhotoMask_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function PhotoMask_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function PhotoMask_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function PhotoMask_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function PhotoMask_createClass(Constructor, protoProps, staticProps) { if (protoProps) PhotoMask_defineProperties(Constructor.prototype, protoProps); if (staticProps) PhotoMask_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var cursorConfig = new Map([['Top Left', 'nw-resize'], ['Top Right', 'ne-resize'], ['Bottom Left', 'sw-resize'], ['Bottom Right', 'se-resize'], ['Top', 'n-resize'], ['Left', 'w-resize'], ['Right', 'e-resize'], ['Bottom', 's-resize']]);
/**
 * 遮罩
 */
var PhotoMask_PhotoMask = /*#__PURE__*/function () {
  /**
   * 构造函数
   * @param root    PhotoRoot引用
   * @param width   裁剪框宽
   * @param height  裁剪框高
   * @param resize  是否可以调整比例
   * @param draw
   */
  function PhotoMask(root, width, height, resize, draw) {
    var _this = this;
    PhotoMask_classCallCheck(this, PhotoMask);
    this.className = 'PhotoMask';
    // 是否圆形裁剪
    this._isRound = false;
    // 当前触点
    this.touche = null;
    this.touchePosition = undefined;
    this.animation = undefined;
    root.addEventList(this);
    this.root = root;
    this.width = width || 1;
    this.height = height || 1;
    this.resize = resize;
    this.faultTolerant = 8 * root.magnification;
    var mr = this.maskRect = this._getMaskRect();
    this._draw = draw;
    draw(this.maskRect, false, this);
    var photoMain = this.root.getEventList('PhotoMain');
    if (photoMain) {
      photoMain.loadImgEd.set(this.className, function () {
        var newObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var animation = arguments.length > 1 ? arguments[1] : undefined;
        return _this._reset(photoMain, newObj, animation);
      });
      photoMain.setMoveRange(mr.x, mr.y, mr.x + mr.w, mr.y + mr.h);
    }
  }
  PhotoMask_createClass(PhotoMask, [{
    key: "getMaskRect",
    value: function getMaskRect() {
      return this.maskRect;
    }
    /**
     * 重新设置裁剪框宽高比例
     * @param photoMain   // 原PhotoMain对象
     * @param newObj      // 该json会与photoMain合并
     * @param animation   // 改变图片的矩形是否经过动画
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
      var newRect = this._isRound ? tool.getEllipseRectByRect(r.w, r.h, showRect.r) : tool.getRectByRect(r.w, r.h, showRect.r);
      var _photoMain$setMoveRan = photoMain.setMoveRange(newRect.x, newRect.y, newRect.x + newRect.w, newRect.y + newRect.h),
        _photoMain$setMoveRan2 = PhotoMask_slicedToArray(_photoMain$setMoveRan, 4),
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
     * @param width
     * @param height
     */
  }, {
    key: "reset",
    value: function reset(width, height) {
      this.width = width || 1;
      this.height = height || 1;
      var r = this._getMaskRect();
      var offX = r.x - this.maskRect.x;
      var offY = r.y - this.maskRect.y;
      var offW = r.w - this.maskRect.w;
      var offH = r.h - this.maskRect.h;
      var photoMain = this.root.getEventList('PhotoMain');
      if (photoMain) {
        var showRect = photoMain.showRect;
        var zoom = r.w / this.maskRect.w;
        var rotatePoint = tool.rotatePoint(this.maskRect.x + this.maskRect.w / 2, this.maskRect.y + this.maskRect.h / 2, -showRect.r);
        var offPoint = {
          x: (showRect.x - rotatePoint.x) * zoom,
          y: (showRect.y - rotatePoint.y) * zoom
        };
        var newRect = this._isRound ? tool.getEllipseRectByRect(r.w, r.h, showRect.r) : tool.getRectByRect(r.w, r.h, showRect.r);
        var _photoMain$setMoveRan3 = photoMain.setMoveRange(newRect.x, newRect.y, newRect.x + newRect.w, newRect.y + newRect.h, offPoint, zoom),
          _photoMain$setMoveRan4 = PhotoMask_slicedToArray(_photoMain$setMoveRan3, 4),
          _offX = _photoMain$setMoveRan4[0],
          _offY = _photoMain$setMoveRan4[1],
          _offW = _photoMain$setMoveRan4[2],
          _offH = _photoMain$setMoveRan4[3];
        photoMain.doAnimation(_offX, _offY, _offW, _offH, 0);
      }
      this._animation(offX, offY, offW, offH);
      this.root.onPhotoChange && this.root.onPhotoChange({
        target: this,
        type: 'maskReset'
      });
    }
  }, {
    key: "isRound",
    get: function get() {
      return this._isRound;
    },
    set: function set(value) {
      this._isRound = value;
      this._draw(this.maskRect, false, this);
      this.reset(this.maskRect.w, this.maskRect.h);
    }
    /**
     * 设置是否可拖动改变裁剪框比例
     * @param value
     */
  }, {
    key: "setResize",
    value: function setResize(value) {
      if (!value) {
        this.touchEnd();
      }
      this.resize = value;
      this._draw(this.maskRect, false, this);
      this.root.onPhotoChange && this.root.onPhotoChange({
        target: this,
        type: 'maskResize'
      });
    }
  }, {
    key: "getResize",
    value: function getResize() {
      return this.resize;
    }
    /**
     * 获取裁剪信息
     * @param maxPixel 裁剪长边像素
     */
  }, {
    key: "getCutInfo",
    value: function getCutInfo(maxPixel) {
      var photoMain = this.root.getEventList('PhotoMain');
      if (!photoMain || !photoMain.originalImg || !photoMain.img) {
        return null;
      }
      var originalImg = photoMain.originalImg;
      var showRect = photoMain.showRect;
      var maskRect = this.maskRect;
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
      var cutSize = {
        w: Math.round(maskRect.w * r),
        h: Math.round(maskRect.h * r)
      };
      var showInfo = {
        x: (showRect.x - showRect.w / 2) * r,
        y: (showRect.y - showRect.h / 2) * r,
        w: showRect.w * r,
        h: showRect.h * r,
        r: showRect.r,
        sV: showRect.sV,
        sH: showRect.sH
      };
      return {
        cutSize: cutSize,
        showInfo: showInfo
      };
    }
    /**
     * 裁剪
     * @maxPixel          裁剪长边像素
     * @encoderOptions    裁剪压缩率(仅jpg)
     * @format            裁剪格式
     */
  }, {
    key: "clip",
    value: function clip(maxPixel, encoderOptions, format) {
      var photoMain = this.root.getEventList('PhotoMain');
      if (!photoMain || !photoMain.originalImg || !photoMain.img) {
        return null;
      }
      var originalImg = photoMain.originalImg;
      var _this$getCutInfo = this.getCutInfo(maxPixel),
        cutSize = _this$getCutInfo.cutSize,
        showInfo = _this$getCutInfo.showInfo;
      var base64 = this._isRound ? tool.clipByRound(originalImg, cutSize.w, cutSize.h, showInfo, encoderOptions, format) : tool.clipBy(originalImg, cutSize.w, cutSize.h, showInfo, encoderOptions, format);
      return {
        src: base64,
        file: tool.base64ToBlob(base64)
      };
    }
    /**
     * 计算裁剪框矩形
     */
  }, {
    key: "_getMaskRect",
    value: function _getMaskRect() {
      var k1 = this.width / this.height;
      var k2 = this.root.drawWidth / this.root.drawHeight;
      var w, h;
      if (k1 < k2) {
        h = this.root.drawHeight * 0.75;
        w = k1 * h;
      } else {
        w = this.root.drawWidth * 0.75;
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
     * @private
     */
  }, {
    key: "_animation",
    value: function _animation(offX, offY, offW, offH) {
      var _this2 = this;
      if (!offX && !offY && !offW && !offH) {
        return;
      }
      var _this$maskRect = this.maskRect,
        x = _this$maskRect.x,
        y = _this$maskRect.y,
        w = _this$maskRect.w,
        h = _this$maskRect.h;
      this._maskRect = this.maskRect;
      this.maskRect = {
        x: x + offX,
        y: y + offY,
        w: w + offW,
        h: h + offH
      };
      this.animation = createAnimation({
        duration: 300,
        timing: 'ease-in-out',
        change: function change(i, j) {
          _this2._maskRect = {
            x: x + j * offX,
            y: y + j * offY,
            w: w + j * offW,
            h: h + j * offH
          };
          _this2._draw(_this2._maskRect, false, _this2);
        },
        end: function end() {
          if (_this2._maskRect) {
            _this2.maskRect = _this2._maskRect;
            _this2._maskRect = undefined;
          }
        }
      }).start();
    }
    /**
     * 指定坐标与裁剪框边框的碰撞检测
     * @param x
     * @param y
     * @private
     * @return 返回碰撞位置
     */
  }, {
    key: "_isHover",
    value: function _isHover(x, y) {
      var ft = this.faultTolerant;
      var lw = 2;
      var _this$maskRect2 = this.maskRect,
        mx = _this$maskRect2.x,
        my = _this$maskRect2.y,
        mw = _this$maskRect2.w,
        mh = _this$maskRect2.h;
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
  }, {
    key: "touchStart",
    value: function touchStart(tps) {
      if (this.resize && this.touche === null) {
        var tp = tps[0];
        this.touchePosition = this._isHover(tp.x, tp.y);
        if (this.touchePosition) {
          this.root.setPriority(this);
          this.touche = tp;
          this._draw(this.maskRect, true, this);
        }
      }
    }
  }, {
    key: "touchEnd",
    value: function touchEnd() {
      if (this.touche !== null && this.touchePosition) {
        this.touche = null;
        if (this.maskRect.w < 0) {
          this.maskRect.x += this.maskRect.w;
          this.maskRect.w *= -1;
        }
        if (this.maskRect.h < 0) {
          this.maskRect.y += this.maskRect.h;
          this.maskRect.h *= -1;
        }
        this.reset(this.maskRect.w, this.maskRect.h);
        this.root.deletePriority(this.className);
        this.touchePosition = undefined;
        this._draw(this._maskRect || this.maskRect, false, this);
        this.root.cursor = 'default';
      }
    }
  }, {
    key: "touchMove",
    value: function touchMove(tps) {
      var _this3 = this;
      if (this.resize && this.touche !== null && this.touchePosition) {
        var toucheId = this.touche.id;
        var tp = tps.find(function (t) {
          return t.id === toucheId;
        });
        if (tp) {
          this.touchePosition.split(' ').forEach(function (str) {
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
          this.touche = tp;
          this._draw(this.maskRect, true, this);
          this.root.onPhotoChange && this.root.onPhotoChange({
            target: this,
            type: 'maskMove'
          });
        }
      } else if (this.resize) {
        var touchePosition = this._isHover(tps[0].x, tps[0].y);
        this.root.cursor = touchePosition && cursorConfig.get(touchePosition) || 'move';
      }
    }
  }, {
    key: "wheelStart",
    value: function wheelStart() {
      return;
    }
  }, {
    key: "wheelEnd",
    value: function wheelEnd() {
      return;
    }
  }, {
    key: "wheelChange",
    value: function wheelChange() {
      return;
    }
  }, {
    key: "_moveTop",
    value: function _moveTop(tp) {
      var _y = tp.y - this.touche.y;
      this.maskRect.y += _y;
      this.maskRect.h -= _y;
    }
  }, {
    key: "_moveBottom",
    value: function _moveBottom(tp) {
      var _y = tp.y - this.touche.y;
      this.maskRect.h += _y;
    }
  }, {
    key: "_moveLeft",
    value: function _moveLeft(tp) {
      var _x = tp.x - this.touche.x;
      this.maskRect.x += _x;
      this.maskRect.w -= _x;
    }
  }, {
    key: "_moveRight",
    value: function _moveRight(tp) {
      var _x = tp.x - this.touche.x;
      this.maskRect.w += _x;
    }
  }]);
  return PhotoMask;
}();

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/views/vue-picture-cut-mask.vue?vue&type=script&lang=ts&
function vue_picture_cut_maskvue_type_script_lang_ts_typeof(obj) { "@babel/helpers - typeof"; return vue_picture_cut_maskvue_type_script_lang_ts_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, vue_picture_cut_maskvue_type_script_lang_ts_typeof(obj); }
function vue_picture_cut_maskvue_type_script_lang_ts_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function vue_picture_cut_maskvue_type_script_lang_ts_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function vue_picture_cut_maskvue_type_script_lang_ts_createClass(Constructor, protoProps, staticProps) { if (protoProps) vue_picture_cut_maskvue_type_script_lang_ts_defineProperties(Constructor.prototype, protoProps); if (staticProps) vue_picture_cut_maskvue_type_script_lang_ts_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function vue_picture_cut_maskvue_type_script_lang_ts_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) vue_picture_cut_maskvue_type_script_lang_ts_setPrototypeOf(subClass, superClass); }
function vue_picture_cut_maskvue_type_script_lang_ts_setPrototypeOf(o, p) { vue_picture_cut_maskvue_type_script_lang_ts_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return vue_picture_cut_maskvue_type_script_lang_ts_setPrototypeOf(o, p); }
function vue_picture_cut_maskvue_type_script_lang_ts_createSuper(Derived) { var hasNativeReflectConstruct = vue_picture_cut_maskvue_type_script_lang_ts_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = vue_picture_cut_maskvue_type_script_lang_ts_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = vue_picture_cut_maskvue_type_script_lang_ts_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return vue_picture_cut_maskvue_type_script_lang_ts_possibleConstructorReturn(this, result); }; }
function vue_picture_cut_maskvue_type_script_lang_ts_possibleConstructorReturn(self, call) { if (call && (vue_picture_cut_maskvue_type_script_lang_ts_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return vue_picture_cut_maskvue_type_script_lang_ts_assertThisInitialized(self); }
function vue_picture_cut_maskvue_type_script_lang_ts_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function vue_picture_cut_maskvue_type_script_lang_ts_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function vue_picture_cut_maskvue_type_script_lang_ts_getPrototypeOf(o) { vue_picture_cut_maskvue_type_script_lang_ts_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return vue_picture_cut_maskvue_type_script_lang_ts_getPrototypeOf(o); }



var vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask = /*#__PURE__*/function (_Vue) {
  vue_picture_cut_maskvue_type_script_lang_ts_inherits(VuePictureCutMask, _Vue);
  var _super = vue_picture_cut_maskvue_type_script_lang_ts_createSuper(VuePictureCutMask);
  function VuePictureCutMask() {
    var _this;
    vue_picture_cut_maskvue_type_script_lang_ts_classCallCheck(this, VuePictureCutMask);
    _this = _super.apply(this, arguments);
    _this.mask = null;
    _this.viewBox = '0 0 0 0';
    _this.drawWidth = 0;
    _this.drawHeight = 0;
    _this.round = 'M0,150 V+150 a150,150 0 1 0 0,-1';
    _this.rect = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    _this.border = '10, 5';
    _this.thisRound = false;
    _this.thisResize = true;
    return _this;
  }
  vue_picture_cut_maskvue_type_script_lang_ts_createClass(VuePictureCutMask, [{
    key: "photoRoot",
    get: function get() {
      var _this$cutRoot;
      return (_this$cutRoot = this.cutRoot) === null || _this$cutRoot === void 0 ? void 0 : _this$cutRoot.photoRoot;
    }
  }, {
    key: "TLHorn",
    get: function get() {
      var x = this.rect.x;
      var y = this.rect.y;
      return "M".concat(x, ",").concat(y, " H").concat(x, " V").concat(y + 15, " H").concat(x - 5, " V").concat(y + 15, " H").concat(x - 5, " V").concat(y - 5, " H").concat(x + 15, " V").concat(y - 5, " H").concat(x + 15, " V").concat(y, " Z");
    }
  }, {
    key: "TRHorn",
    get: function get() {
      var x = this.rect.x + this.rect.width;
      var y = this.rect.y;
      return "M".concat(x, ",").concat(y, " H").concat(x, " V").concat(y + 15, " H").concat(x + 5, " V").concat(y + 15, " H").concat(x + 5, " V").concat(y - 5, " H").concat(x - 15, " V").concat(y - 5, " H").concat(x - 15, " V").concat(y, " Z");
    }
  }, {
    key: "BLHorn",
    get: function get() {
      var x = this.rect.x;
      var y = this.rect.y + this.rect.height;
      return "M".concat(x, ",").concat(y, " H").concat(x, " V").concat(y - 15, " H").concat(x - 5, " V").concat(y - 15, " H").concat(x - 5, " V").concat(y + 5, " H").concat(x + 15, " V").concat(y + 5, " H").concat(x + 15, " V").concat(y, " Z");
    }
  }, {
    key: "BRHorn",
    get: function get() {
      var x = this.rect.x + this.rect.width;
      var y = this.rect.y + this.rect.height;
      return "M".concat(x, ",").concat(y, " H").concat(x, " V").concat(y - 15, " H").concat(x + 5, " V").concat(y - 15, " H").concat(x + 5, " V").concat(y + 5, " H").concat(x - 15, " V").concat(y + 5, " H").concat(x - 15, " V").concat(y, " Z");
    }
  }, {
    key: "watchWidth",
    value: function watchWidth(to) {
      this.mask && this.mask.reset(to, this.height);
    }
  }, {
    key: "watchHeight",
    value: function watchHeight(to) {
      this.mask && this.mask.reset(this.width, to);
    }
  }, {
    key: "watchIsRound",
    value: function watchIsRound(to) {
      this.mask && (this.mask.isRound = to);
    }
  }, {
    key: "watchResize",
    value: function watchResize(to) {
      this.mask && this.mask.setResize(to);
    }
  }, {
    key: "watchThisRound",
    value: function watchThisRound(to) {
      if (this.mask && this.mask.isRound !== to) {
        this.mask.isRound = to;
      }
    }
  }, {
    key: "watchThisResize",
    value: function watchThisResize(to) {
      if (this.mask && this.mask.getResize() !== to) {
        this.mask.setResize(to);
      }
    }
  }, {
    key: "created",
    value: function created() {
      this.cutRoot = this.getCutRoot();
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var _this2 = this;
      this.thisRound = this.isRound;
      this.thisResize = this.resize;
      setTimeout(function () {
        _this2.viewBox = "0 0 ".concat(_this2.photoRoot.drawWidth, " ").concat(_this2.photoRoot.drawHeight);
        _this2.drawWidth = _this2.photoRoot.drawWidth;
        _this2.drawHeight = _this2.photoRoot.drawHeight;
        _this2.mask = new PhotoMask_PhotoMask(_this2.photoRoot, _this2.width, _this2.height, _this2.resize, function (rect) {
          var touchePosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var mask = arguments.length > 2 ? arguments[2] : undefined;
          _this2.setPathOption(rect, touchePosition, mask);
        });
        _this2.mask.isRound = _this2.isRound;
      }, 0);
    }
    /*******事件********/
  }, {
    key: "setPathOption",
    value: function setPathOption(rect) {
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
  }]);
  return VuePictureCutMask;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);
__decorate([Prop({
  type: String,
  default: 'rgba(0,0,0,.5)'
})], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "color", void 0);
__decorate([Prop({
  type: String,
  default: '#ff5500'
})], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "borderColor", void 0);
__decorate([Prop({
  type: Number,
  default: 1
})], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "width", void 0);
__decorate([Prop({
  type: Number,
  default: 1
})], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "height", void 0);
__decorate([Prop({
  type: Boolean,
  default: false
})], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "isRound", void 0);
__decorate([Prop({
  type: Boolean,
  default: true
})], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "resize", void 0);
__decorate([Watch('width')], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "watchWidth", null);
__decorate([Watch('height')], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "watchHeight", null);
__decorate([Watch('isRound')], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "watchIsRound", null);
__decorate([Watch('resize')], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "watchResize", null);
__decorate([Watch('thisRound')], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "watchThisRound", null);
__decorate([Watch('thisResize')], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "watchThisResize", null);
__decorate([Inject('getCutRoot')], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask.prototype, "getCutRoot", void 0);
vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask = __decorate([vue_class_component_esm({
  name: 'VuePictureCutMask'
})], vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask);
/* harmony default export */ var vue_picture_cut_maskvue_type_script_lang_ts_ = (vue_picture_cut_maskvue_type_script_lang_ts_VuePictureCutMask);
// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-mask.vue?vue&type=script&lang=ts&
 /* harmony default export */ var views_vue_picture_cut_maskvue_type_script_lang_ts_ = (vue_picture_cut_maskvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/lib/views/vue-picture-cut-mask.vue?vue&type=style&index=0&id=b1f21cd4&prod&scoped=true&lang=css&
var vue_picture_cut_maskvue_type_style_index_0_id_b1f21cd4_prod_scoped_true_lang_css_ = __webpack_require__("1f8f");

// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-mask.vue






/* normalize component */

var vue_picture_cut_mask_component = normalizeComponent(
  views_vue_picture_cut_maskvue_type_script_lang_ts_,
  vue_picture_cut_maskvue_type_template_id_b1f21cd4_scoped_true_render,
  vue_picture_cut_maskvue_type_template_id_b1f21cd4_scoped_true_staticRenderFns,
  false,
  null,
  "b1f21cd4",
  null
  
)

/* harmony default export */ var vue_picture_cut_mask = (vue_picture_cut_mask_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/views/vue-picture-cut.vue?vue&type=script&lang=ts&
function vue_picture_cutvue_type_script_lang_ts_typeof(obj) { "@babel/helpers - typeof"; return vue_picture_cutvue_type_script_lang_ts_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, vue_picture_cutvue_type_script_lang_ts_typeof(obj); }
function vue_picture_cutvue_type_script_lang_ts_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function vue_picture_cutvue_type_script_lang_ts_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function vue_picture_cutvue_type_script_lang_ts_createClass(Constructor, protoProps, staticProps) { if (protoProps) vue_picture_cutvue_type_script_lang_ts_defineProperties(Constructor.prototype, protoProps); if (staticProps) vue_picture_cutvue_type_script_lang_ts_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function vue_picture_cutvue_type_script_lang_ts_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) vue_picture_cutvue_type_script_lang_ts_setPrototypeOf(subClass, superClass); }
function vue_picture_cutvue_type_script_lang_ts_setPrototypeOf(o, p) { vue_picture_cutvue_type_script_lang_ts_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return vue_picture_cutvue_type_script_lang_ts_setPrototypeOf(o, p); }
function vue_picture_cutvue_type_script_lang_ts_createSuper(Derived) { var hasNativeReflectConstruct = vue_picture_cutvue_type_script_lang_ts_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = vue_picture_cutvue_type_script_lang_ts_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = vue_picture_cutvue_type_script_lang_ts_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return vue_picture_cutvue_type_script_lang_ts_possibleConstructorReturn(this, result); }; }
function vue_picture_cutvue_type_script_lang_ts_possibleConstructorReturn(self, call) { if (call && (vue_picture_cutvue_type_script_lang_ts_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return vue_picture_cutvue_type_script_lang_ts_assertThisInitialized(self); }
function vue_picture_cutvue_type_script_lang_ts_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function vue_picture_cutvue_type_script_lang_ts_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function vue_picture_cutvue_type_script_lang_ts_getPrototypeOf(o) { vue_picture_cutvue_type_script_lang_ts_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return vue_picture_cutvue_type_script_lang_ts_getPrototypeOf(o); }





var vue_picture_cutvue_type_script_lang_ts_VuePictureCut = /*#__PURE__*/function (_Vue) {
  vue_picture_cutvue_type_script_lang_ts_inherits(VuePictureCut, _Vue);
  var _super = vue_picture_cutvue_type_script_lang_ts_createSuper(VuePictureCut);
  function VuePictureCut() {
    var _this;
    vue_picture_cutvue_type_script_lang_ts_classCallCheck(this, VuePictureCut);
    _this = _super.apply(this, arguments);
    _this.loading = false;
    // 是否有菜单组件
    _this.hasMenu = false;
    // 角度
    _this.sliderAngle = 0;
    // 图片将要裁剪的宽高
    _this.cutSize = null;
    _this.photoRoot = new PhotoRoot_PhotoRoot();
    return _this;
  }
  vue_picture_cutvue_type_script_lang_ts_createClass(VuePictureCut, [{
    key: "thickness",
    get: function get() {
      if (this.menuThickness === void 0 || this.menuThickness < 0) {
        return this.hasMenu ? 120 : 50;
      }
      return this.menuThickness;
    }
  }, {
    key: "mainPosition",
    get: function get() {
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
    }
  }, {
    key: "memuPosition",
    get: function get() {
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
  }, {
    key: "watchSrc",
    value: function watchSrc(to) {
      if (to) {
        this.setImg();
      }
    }
  }, {
    key: "watchInitAngle",
    value: function watchInitAngle(to) {
      if (to === undefined) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        var angle2 = (main.showRect.r + to) % 360;
        this.sliderAngle = angle2 > 180 ? angle2 - 360 : angle2 < -180 ? angle2 + 360 : angle2;
      }
    }
  }, {
    key: "watchSliderAngle",
    value: function watchSliderAngle(to) {
      var photoMain = this.photoRoot.getEventList('PhotoMain');
      if (photoMain) {
        photoMain.setAngle(parseInt(to));
      }
    }
    /*******生命周期********/
  }, {
    key: "created",
    value: function created() {
      this.watchInitAngle(this.initAngle);
      if (this.$slots.menu) {
        this.hasMenu = true;
      }
      this.photoRoot.onPhotoChange = this.onStateChange;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var _this2 = this;
      this.photoRoot.init(this.main, this.magnification);
      setTimeout(function () {
        _this2.setImg();
      }, 0);
    }
    /*******事件********/
  }, {
    key: "onChangeEvent",
    value: function onChangeEvent(blob, base64) {
      return {
        blob: blob,
        base64: base64
      };
    }
  }, {
    key: "onStateChange",
    value: function onStateChange(_ref) {
      var type = _ref.type;
      if (['imageInit', 'imageAngle', 'imageReset', 'imageScale', 'maskMove'].indexOf(type) > -1) {
        var photoMask = this.photoRoot.getEventList('PhotoMask');
        if (photoMask) {
          var _this$cutSize, _this$cutSize2;
          var info = photoMask.getCutInfo(this.maxPixel);
          var cutSize = info === null || info === void 0 ? void 0 : info.cutSize;
          if ((cutSize === null || cutSize === void 0 ? void 0 : cutSize.w) !== ((_this$cutSize = this.cutSize) === null || _this$cutSize === void 0 ? void 0 : _this$cutSize.w) || (cutSize === null || cutSize === void 0 ? void 0 : cutSize.h) !== ((_this$cutSize2 = this.cutSize) === null || _this$cutSize2 === void 0 ? void 0 : _this$cutSize2.h)) {
            this.cutSize = cutSize || null;
          }
        }
      }
    }
    /**********方法**********/
  }, {
    key: "getCutRoot",
    value: function getCutRoot() {
      return this;
    }
  }, {
    key: "setImg",
    value: function setImg() {
      var photoMain = this.photoRoot.getEventList('PhotoMain');
      var src = this.src;
      if (src && photoMain) {
        photoMain.setSrc(src, this.initAngle);
      }
      if (this.initAngle !== undefined) {
        this.sliderAngle = this.initAngle % 180;
      }
    }
    // 默认裁剪
  }, {
    key: "sureCut",
    value: function sureCut() {
      var mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        var result = mask.clip(this.maxPixel, this.encoderOptions, this.format);
        if (result) {
          this.onChangeEvent(result.file, result.src);
        }
      }
    }
    // 缩放
  }, {
    key: "scale",
    value: function scale(zoom) {
      var photoMain = this.photoRoot.getEventList('PhotoMain');
      photoMain === null || photoMain === void 0 ? void 0 : photoMain.scale(zoom);
    }
  }]);
  return VuePictureCut;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);
__decorate([Prop({
  type: String,
  required: false
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "backgroundColor", void 0);
__decorate([Prop({
  type: Number,
  default: 1.5
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "magnification", void 0);
__decorate([Prop({
  type: String,
  default: null
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "src", void 0);
__decorate([Prop({
  type: Number,
  required: false
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "initAngle", void 0);
__decorate([Prop({
  type: Number,
  required: false
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "maxPixel", void 0);
__decorate([Prop({
  type: Number,
  required: false
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "encoderOptions", void 0);
__decorate([Prop({
  type: String,
  required: false
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "format", void 0);
__decorate([Prop({
  type: Object,
  default: function _default() {
    return {
      width: 1,
      height: 1,
      isRound: false,
      resize: true
    };
  }
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "mskOption", void 0);
__decorate([Prop({
  type: Boolean,
  required: false
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "rotateControl", void 0);
__decorate([Prop({
  type: Number,
  required: false
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "menuThickness", void 0);
__decorate([Prop({
  type: String,
  default: 'bottom'
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "menuPosition", void 0);
__decorate([Ref()], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "main", void 0);
__decorate([Watch('src')], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "watchSrc", null);
__decorate([Watch('initAngle')], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "watchInitAngle", null);
__decorate([Watch('sliderAngle')], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "watchSliderAngle", null);
__decorate([Emit('on-change')], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "onChangeEvent", null);
__decorate([Provide('getCutRoot')], vue_picture_cutvue_type_script_lang_ts_VuePictureCut.prototype, "getCutRoot", null);
vue_picture_cutvue_type_script_lang_ts_VuePictureCut = __decorate([vue_class_component_esm({
  name: 'VuePictureCut',
  components: {
    VuePictureCutCanvas: vue_picture_cut_canvas,
    VuePictureCutMask: vue_picture_cut_mask
  }
})], vue_picture_cutvue_type_script_lang_ts_VuePictureCut);
/* harmony default export */ var vue_picture_cutvue_type_script_lang_ts_ = (vue_picture_cutvue_type_script_lang_ts_VuePictureCut);
// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut.vue?vue&type=script&lang=ts&
 /* harmony default export */ var views_vue_picture_cutvue_type_script_lang_ts_ = (vue_picture_cutvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/lib/views/vue-picture-cut.vue?vue&type=style&index=0&id=d2016dc0&prod&lang=scss&
var vue_picture_cutvue_type_style_index_0_id_d2016dc0_prod_lang_scss_ = __webpack_require__("ab39");

// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut.vue






/* normalize component */

var vue_picture_cut_component = normalizeComponent(
  views_vue_picture_cutvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_picture_cut = (vue_picture_cut_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"28b04d81-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/views/vue-picture-cut-menu.vue?vue&type=template&id=4c0ae36e&
var vue_picture_cut_menuvue_type_template_id_4c0ae36e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-picture-cut-menu dark-theme",class:[
       ['default', 'dark', 'gray'].indexOf(_vm.theme) > -1 ?
       _vm.theme + '-theme' :
       'default-theme'
       ]},[_c('div',{staticClass:"vue-picture-cut-menu_slider"},[_c('div',{staticClass:"vue-picture-cut-menu_slider-box"},[_c('span',[_vm._v(_vm._s(_vm.menuRotateName))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sliderAngle),expression:"sliderAngle"}],attrs:{"type":"range","min":-180,"max":180},domProps:{"value":(_vm.sliderAngle)},on:{"__r":function($event){_vm.sliderAngle=$event.target.value}}}),_c('div',{staticClass:"vue-picture-cut-menu_slider-box-bar"},[_c('div',{staticClass:"vue-picture-cut-menu_slider-box-button",style:({left: _vm.sliderAngle * 100 / 361 + 50 + '%'})},[_c('div',{staticClass:"vue-picture-cut-menu_slider-box-tips"},[_vm._v(" "+_vm._s(_vm.sliderAngle)+"° ")])])])])]),_c('div',{staticClass:"vue-picture-cut-menu_box"},[_c('div',{staticClass:"vue-picture-cut-menu_box-content"},[_c('div',{staticClass:"vue-picture-cut-menu_box-list",staticStyle:{"width":"558px"}},[_c('div',{staticClass:"vue-picture-cut-menu_box-item v-p-icon_flip-v",on:{"click":_vm.setFlipV}}),_c('div',{staticClass:"vue-picture-cut-menu_box-item v-p-icon_flip-h",on:{"click":_vm.setFlipH}}),_c('span'),_c('div',{staticClass:"vue-picture-cut-menu_box-item v-p-icon_rotate-left",on:{"click":function($event){return _vm.rotate(90, true)}}}),_c('div',{staticClass:"vue-picture-cut-menu_box-item v-p-icon_rotate-right",on:{"click":function($event){return _vm.rotate(-90, true)}}}),_c('span'),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":_vm.setMaskResize}},[_c('div',{staticClass:"__mask"},[_vm._v(_vm._s(_vm.sizeAutoName))])]),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":_vm.setMaskSizeToOriginal}},[_c('div',{staticClass:"__mask"},[_vm._v(_vm._s(_vm.sizeRawName))])]),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":function($event){return _vm.setMaskSize(1,1)}}},[_c('div',{staticClass:"__mask"},[_vm._v("1:1")])]),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":function($event){return _vm.setMaskSize(4,3)}}},[_c('div',{staticClass:"__mask _5_4"},[_vm._v("4:3")])]),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":function($event){return _vm.setMaskSize(3,4)}}},[_c('div',{staticClass:"__mask _4_5"},[_vm._v("3:4")])]),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":function($event){return _vm.setMaskSize(16,9)}}},[_c('div',{staticClass:"__mask _5_4"},[_vm._v("16:9")])]),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":function($event){return _vm.setMaskSize(9,16)}}},[_c('div',{staticClass:"__mask _4_5"},[_vm._v("9:16")])]),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":function($event){return _vm.setMaskSize(3,2)}}},[_c('div',{staticClass:"__mask _5_4"},[_vm._v("3:2")])]),_c('div',{staticClass:"vue-picture-cut-menu_box-item __mask",on:{"click":function($event){return _vm.setMaskSize(2,3)}}},[_c('div',{staticClass:"__mask _4_5"},[_vm._v("2:3")])])])])]),_c('div',{staticClass:"vue-picture-cut-menu_confirm",staticStyle:{"max-width":"558px"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.cancel),expression:"cancel"}],staticClass:"__cancel",on:{"click":_vm.onCancelEvent}},[_vm._v(_vm._s(_vm.cancelName))]),_c('div',{staticClass:"__sure",class:{'__center': !_vm.cancel},on:{"click":_vm.sureCut}},[_vm._v(_vm._s(_vm.confirmName))])])])}
var vue_picture_cut_menuvue_type_template_id_4c0ae36e_staticRenderFns = []


// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-menu.vue?vue&type=template&id=4c0ae36e&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/lib/views/vue-picture-cut-menu.vue?vue&type=script&lang=ts&
function vue_picture_cut_menuvue_type_script_lang_ts_typeof(obj) { "@babel/helpers - typeof"; return vue_picture_cut_menuvue_type_script_lang_ts_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, vue_picture_cut_menuvue_type_script_lang_ts_typeof(obj); }
function vue_picture_cut_menuvue_type_script_lang_ts_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function vue_picture_cut_menuvue_type_script_lang_ts_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function vue_picture_cut_menuvue_type_script_lang_ts_createClass(Constructor, protoProps, staticProps) { if (protoProps) vue_picture_cut_menuvue_type_script_lang_ts_defineProperties(Constructor.prototype, protoProps); if (staticProps) vue_picture_cut_menuvue_type_script_lang_ts_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function vue_picture_cut_menuvue_type_script_lang_ts_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) vue_picture_cut_menuvue_type_script_lang_ts_setPrototypeOf(subClass, superClass); }
function vue_picture_cut_menuvue_type_script_lang_ts_setPrototypeOf(o, p) { vue_picture_cut_menuvue_type_script_lang_ts_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return vue_picture_cut_menuvue_type_script_lang_ts_setPrototypeOf(o, p); }
function vue_picture_cut_menuvue_type_script_lang_ts_createSuper(Derived) { var hasNativeReflectConstruct = vue_picture_cut_menuvue_type_script_lang_ts_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = vue_picture_cut_menuvue_type_script_lang_ts_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = vue_picture_cut_menuvue_type_script_lang_ts_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return vue_picture_cut_menuvue_type_script_lang_ts_possibleConstructorReturn(this, result); }; }
function vue_picture_cut_menuvue_type_script_lang_ts_possibleConstructorReturn(self, call) { if (call && (vue_picture_cut_menuvue_type_script_lang_ts_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return vue_picture_cut_menuvue_type_script_lang_ts_assertThisInitialized(self); }
function vue_picture_cut_menuvue_type_script_lang_ts_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function vue_picture_cut_menuvue_type_script_lang_ts_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function vue_picture_cut_menuvue_type_script_lang_ts_getPrototypeOf(o) { vue_picture_cut_menuvue_type_script_lang_ts_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return vue_picture_cut_menuvue_type_script_lang_ts_getPrototypeOf(o); }


var VuePictureCutMenu = /*#__PURE__*/function (_Vue) {
  vue_picture_cut_menuvue_type_script_lang_ts_inherits(VuePictureCutMenu, _Vue);
  var _super = vue_picture_cut_menuvue_type_script_lang_ts_createSuper(VuePictureCutMenu);
  function VuePictureCutMenu() {
    var _this;
    vue_picture_cut_menuvue_type_script_lang_ts_classCallCheck(this, VuePictureCutMenu);
    _this = _super.apply(this, arguments);
    _this.root = null;
    _this.sliderAngle = 0;
    return _this;
  }
  vue_picture_cut_menuvue_type_script_lang_ts_createClass(VuePictureCutMenu, [{
    key: "photoRoot",
    get: function get() {
      var _this$root, _this$cutRoot;
      return ((_this$root = this.root) === null || _this$root === void 0 ? void 0 : _this$root.photoRoot) || ((_this$cutRoot = this.cutRoot) === null || _this$cutRoot === void 0 ? void 0 : _this$cutRoot.photoRoot);
    }
  }, {
    key: "watchSliderAngle",
    value: function watchSliderAngle(to) {
      if (!this.photoRoot) return;
      var photoMain = this.photoRoot.getEventList('PhotoMain');
      if (photoMain) {
        photoMain.setAngle(parseInt(to));
      }
    }
  }, {
    key: "created",
    value: function created() {
      if (this.getCutRoot) {
        this.cutRoot = this.getCutRoot();
      }
    }
    /*******事件********/
  }, {
    key: "onChangeEvent",
    value: function onChangeEvent(blob, base64) {
      return {
        blob: blob,
        base64: base64
      };
    }
  }, {
    key: "onCancelEvent",
    value: function onCancelEvent() {
      return;
    }
    /*******事件********/
    // 裁剪
  }, {
    key: "sureCut",
    value: function sureCut() {
      if (!this.photoRoot) return;
      var mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        var result = mask.clip(this.maxPixel, this.encoderOptions, this.format);
        if (result) {
          this.onChangeEvent(result.file, result.src);
        }
      }
    }
    // 设置剪裁框
  }, {
    key: "setMaskSize",
    value: function setMaskSize(w, h) {
      if (!this.photoRoot) return;
      var mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        mask.reset(w, h);
        mask.setResize(false);
      }
    }
    // 设置剪裁框
  }, {
    key: "setMaskSizeToOriginal",
    value: function setMaskSizeToOriginal() {
      if (!this.photoRoot) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        this.setMaskSize(main.imgRect.w, main.imgRect.h);
      }
    }
    // 设置剪裁框
  }, {
    key: "setMaskResize",
    value: function setMaskResize() {
      var resize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.photoRoot) return;
      var mask = this.photoRoot.getEventList('PhotoMask');
      if (mask) {
        mask.setResize(resize);
      }
    }
    // 旋转
  }, {
    key: "rotate",
    value: function rotate(angle) {
      var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.photoRoot || angle % 360 === 0) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        var angle2 = (main.showRect.r + angle) % 360;
        this.sliderAngle = angle2 > 180 ? angle2 - 360 : angle2 < -180 ? angle2 + 360 : angle2;
        main.setAngle(main.showRect.r + angle, animation);
      }
    }
    /**
     * 设置图片垂直翻折
     */
  }, {
    key: "setFlipV",
    value: function setFlipV() {
      if (!this.photoRoot) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        main.setFlipV(main.showRect.sV === 1, true);
      }
    }
    /**
     * 设置图片水平翻折
     */
  }, {
    key: "setFlipH",
    value: function setFlipH() {
      if (!this.photoRoot) return;
      var main = this.photoRoot.getEventList('PhotoMain');
      if (main) {
        main.setFlipH(main.showRect.sH === 1, true);
      }
    }
  }]);
  return VuePictureCutMenu;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);
__decorate([Prop({
  type: Object,
  default: null
})], VuePictureCutMenu.prototype, "root", void 0);
__decorate([Prop({
  type: String,
  default: 'default'
})], VuePictureCutMenu.prototype, "theme", void 0);
__decorate([Prop({
  type: Number,
  required: false
})], VuePictureCutMenu.prototype, "maxPixel", void 0);
__decorate([Prop({
  type: Number,
  required: false
})], VuePictureCutMenu.prototype, "encoderOptions", void 0);
__decorate([Prop({
  type: String,
  required: false
})], VuePictureCutMenu.prototype, "format", void 0);
__decorate([Prop({
  type: Boolean,
  default: true
})], VuePictureCutMenu.prototype, "cancel", void 0);
__decorate([Prop({
  type: String,
  default: 'Cancel'
})], VuePictureCutMenu.prototype, "cancelName", void 0);
__decorate([Prop({
  type: String,
  default: 'Ok'
})], VuePictureCutMenu.prototype, "confirmName", void 0);
__decorate([Prop({
  type: String,
  default: 'auto'
})], VuePictureCutMenu.prototype, "sizeAutoName", void 0);
__decorate([Prop({
  type: String,
  default: 'raw'
})], VuePictureCutMenu.prototype, "sizeRawName", void 0);
__decorate([Prop({
  type: String,
  default: 'Rotate'
})], VuePictureCutMenu.prototype, "menuRotateName", void 0);
__decorate([Watch('sliderAngle')], VuePictureCutMenu.prototype, "watchSliderAngle", null);
__decorate([Inject({
  from: 'getCutRoot',
  default: null
})], VuePictureCutMenu.prototype, "getCutRoot", void 0);
__decorate([Emit('on-change')], VuePictureCutMenu.prototype, "onChangeEvent", null);
__decorate([Emit('on-cancel')], VuePictureCutMenu.prototype, "onCancelEvent", null);
VuePictureCutMenu = __decorate([vue_class_component_esm({
  name: 'VuePictureCutMenu'
})], VuePictureCutMenu);
/* harmony default export */ var vue_picture_cut_menuvue_type_script_lang_ts_ = (VuePictureCutMenu);
// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-menu.vue?vue&type=script&lang=ts&
 /* harmony default export */ var views_vue_picture_cut_menuvue_type_script_lang_ts_ = (vue_picture_cut_menuvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/lib/views/vue-picture-cut-menu.vue?vue&type=style&index=0&id=4c0ae36e&prod&lang=scss&
var vue_picture_cut_menuvue_type_style_index_0_id_4c0ae36e_prod_lang_scss_ = __webpack_require__("79d2");

// CONCATENATED MODULE: ./src/lib/views/vue-picture-cut-menu.vue






/* normalize component */

var vue_picture_cut_menu_component = normalizeComponent(
  views_vue_picture_cut_menuvue_type_script_lang_ts_,
  vue_picture_cut_menuvue_type_template_id_4c0ae36e_render,
  vue_picture_cut_menuvue_type_template_id_4c0ae36e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_picture_cut_menu = (vue_picture_cut_menu_component.exports);
// CONCATENATED MODULE: ./src/lib/views/Utils.ts
function Utils_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function Utils_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? Utils_ownKeys(Object(source), !0).forEach(function (key) { Utils_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : Utils_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Utils_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function Utils_typeof(obj) { "@babel/helpers - typeof"; return Utils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, Utils_typeof(obj); }
function Utils_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function Utils_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function Utils_createClass(Constructor, protoProps, staticProps) { if (protoProps) Utils_defineProperties(Constructor.prototype, protoProps); if (staticProps) Utils_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
/**
 * 二次包装工具类
 * 简化api，方便自定义菜单等
 */
var Utils = /*#__PURE__*/function () {
  function Utils(cut) {
    Utils_classCallCheck(this, Utils);
    this.photoRoot = cut.photoRoot;
  }
  Utils_createClass(Utils, [{
    key: "getPhotoMask",
    value: function getPhotoMask() {
      if (this.photoRoot) {
        return this.photoRoot.getEventList('PhotoMask');
      }
      return null;
    }
  }, {
    key: "getPhotoMain",
    value: function getPhotoMain() {
      if (this.photoRoot) {
        return this.photoRoot.getEventList('PhotoMain');
      }
      return null;
    }
  }, {
    key: "cut",
    value: function cut(opt, encoderOptions, format) {
      if (!this.photoRoot) return null;
      var mask = this.getPhotoMask();
      if (mask) {
        if (Utils_typeof(opt) === "object") {
          return mask.clip(opt === null || opt === void 0 ? void 0 : opt.maxPixel, opt === null || opt === void 0 ? void 0 : opt.encoderOptions, opt === null || opt === void 0 ? void 0 : opt.format);
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
      main === null || main === void 0 ? void 0 : main.reset();
    }
    /**
     * 设置剪裁框是否圆形
     * @param isRound
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
     * @param w   比例宽
     * @param h   比例高
     */
  }, {
    key: "setMaskSize",
    value: function setMaskSize(w, h) {
      if (!this.photoRoot) return;
      var mask = this.getPhotoMask();
      mask === null || mask === void 0 ? void 0 : mask.reset(w, h);
    }
    /**
     * 按图片宽高比例设置剪裁框尺寸
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
     * @param resize
     */
  }, {
    key: "setMaskResize",
    value: function setMaskResize() {
      var resize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.photoRoot) return;
      var mask = this.getPhotoMask();
      mask === null || mask === void 0 ? void 0 : mask.setResize(resize);
    }
    /**
     * 图片旋转
     * @param angle       逆时针角度
     * @param animation   是否动画
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
     * @param angle       逆时针角度
     * @param animation   是否动画
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
     * @param animation   是否动画
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
     * @param animation   是否动画
     */
  }, {
    key: "setFlipH",
    value: function setFlipH(animation) {
      if (!this.photoRoot) return;
      var main = this.getPhotoMain();
      if (main) {
        main.setFlipH(main.showRect.sH === 1, animation);
        return main.showRect.sH === -1;
      }
    }
    /**
     * 设置图片翻转
     * @param sV          垂直
     * @param sH          水平
     * @param animation   是否动画
     */
  }, {
    key: "setFlip",
    value: function setFlip(sV, sH, animation) {
      if (!this.photoRoot) return;
      var main = this.getPhotoMain();
      main === null || main === void 0 ? void 0 : main.setFlip(sV, sH, animation);
    }
    /**
     * 图片缩放
     * @param zoom    缩放系数
     */
  }, {
    key: "scale",
    value: function scale(zoom) {
      var photoMain = this.getPhotoMain();
      photoMain === null || photoMain === void 0 ? void 0 : photoMain.scale(zoom);
    }
    /**
     * 获取控件参数
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
          imgRect: Utils_objectSpread({}, imgRect),
          showRect: Utils_objectSpread({}, showRect)
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
  return Utils;
}();
function createUtils(cut) {
  if (!cut || !cut.photoRoot) {
    throw new Error("createUtils\u9700\u8981\u4E00\u4E2A\u4E3AVuePictureCut\u5B9E\u4F8B\u7684\u53C2\u6570\uFF0C\u4F46\u662F\u5F53\u524D\u5F97\u5230\u7684\u662F".concat(cut, "!\n\n      \"createUtils\" requires an argument for the \"VuePictureCut\" instance, but the current result is ").concat(cut, "!"));
  } else {
    return new Utils(cut);
  }
}
// CONCATENATED MODULE: ./src/lib/index.ts








/* harmony default export */ var lib = ({
  install: function install(Vue) {
    Vue.component('vue-picture-cut', vue_picture_cut);
    Vue.component('vue-picture-cut-mask', vue_picture_cut_mask);
    Vue.component('vue-picture-cut-menu', vue_picture_cut_menu);
  }
});
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (lib);



/***/ }),

/***/ "fbc0":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });