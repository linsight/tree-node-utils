(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tree-node-utils", [], factory);
	else if(typeof exports === 'object')
		exports["tree-node-utils"] = factory();
	else
		root["tree-node-utils"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TreeNodeUtils = __webpack_require__(1);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TreeNodeUtils).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TreeNodeUtils = function () {
  function TreeNodeUtils() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, TreeNodeUtils);

    this.keyField = config.keyField || 'key';
    this.childrenField = config.childrenField || 'children';
  }

  _createClass(TreeNodeUtils, [{
    key: 'hasChildren',
    value: function hasChildren(nodeData) {
      var children = nodeData[this.childrenField];
      return children && children.length > 0;
    }
  }, {
    key: 'isBranch',
    value: function isBranch(nodeData) {
      var children = nodeData[this.childrenField];
      return children && children.length >= 0;
    }
  }, {
    key: 'getNodeByKey',
    value: function getNodeByKey(nodes, key) {
      var found = null;
      var self = this;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          if (node[self.keyField] === key) {
            found = node;
          } else if (self.hasChildren(node)) {
            found = self.getNodeByKey(node.children, key);
          }

          if (found) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return found;
    }
  }, {
    key: 'findNodes',
    value: function findNodes(nodes, predicate) {
      var found = [];
      var self = this;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;

          if (predicate(node)) {
            found = [].concat(_toConsumableArray(found), [node]);
          }

          if (self.hasChildren(node)) {
            var foundChildren = self.findNodes(node.children, predicate);
            found = [].concat(_toConsumableArray(found), _toConsumableArray(foundChildren));
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return found;
    }
  }, {
    key: 'filterNode',
    value: function filterNode(node, predicate, keepBranch) {
      var res = null;
      var self = this;

      var filteredChildren = self.isBranch(node) ? node.children.map(function (childNode) {
        return self.filterNode(childNode, predicate, keepBranch);
      }).filter(function (i) {
        return i !== null;
      }) : null;

      var hasChildrenMatched = filteredChildren && filteredChildren.length > 0;
      var isNodeItselfMatched = predicate(node);
      var shouldKeep = keepBranch && self.isBranch(node);

      if (isNodeItselfMatched || hasChildrenMatched || shouldKeep) {
        var childrenData = filteredChildren ? { children: filteredChildren } : {};
        res = Object.assign({}, node, childrenData);
      }

      return res;
    }
  }, {
    key: 'filterNodes',
    value: function filterNodes(nodes, predicate) {
      var _this = this;

      var filterFunc = function filterFunc(node) {
        return _this.filterNode(node, predicate);
      };
      return nodes.map(function (node) {
        return _this.filterNode(node, filterFunc);
      }).filter(function (i) {
        return i !== null;
      });
    }
  }, {
    key: 'sortNode',
    value: function sortNode(node, compareFunction) {
      var self = this;
      if (self.hasChildren(node)) {
        var children = [].concat(_toConsumableArray(node[self.childrenField])).sort(compareFunction).map(function (childNode) {
          return self.sortNode(childNode, compareFunction);
        });
        return _extends({}, node, { children: children });
      }

      return node;
    }
  }, {
    key: 'sortNodes',
    value: function sortNodes(nodes, compareFunction) {
      var _this2 = this;

      return nodes.sort(compareFunction).map(function (node) {
        return _this2.sortNode(node, compareFunction);
      });
    }
  }]);

  return TreeNodeUtils;
}();

exports.default = TreeNodeUtils;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=tree-node-utils.js.map