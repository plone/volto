import { _ as __toESM, a as __commonJS, c as __esm, d as __toCommonJS, b as __export } from "./chunk-XP5HYGXS-BF4Vd9N7.js";
import { c as cn, n as nn, y as yn, g as gt, z, o as on, j as je, l, B, a as oe, Y } from "./index-BJ2pi0x4.js";
import { r as reactExports, R as React } from "./index-CFtE-bf8.js";
const { logger } = __STORYBOOK_MODULE_CLIENT_LOGGER__;
const { defaultDecorateStory, addons, useEffect } = __STORYBOOK_MODULE_PREVIEW_API__;
var require_ReactPropTypesSecret = __commonJS({ "../../node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  module.exports = ReactPropTypesSecret;
} });
var require_factoryWithThrowingShims = __commonJS({ "../../node_modules/prop-types/factoryWithThrowingShims.js"(exports, module) {
  var ReactPropTypesSecret = require_ReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  module.exports = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret !== ReactPropTypesSecret) {
        var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        throw err.name = "Invariant Violation", err;
      }
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = { array: shim, bigint: shim, bool: shim, func: shim, number: shim, object: shim, string: shim, symbol: shim, any: shim, arrayOf: getShim, element: shim, elementType: shim, instanceOf: getShim, node: shim, objectOf: getShim, oneOf: getShim, oneOfType: getShim, shape: getShim, exact: getShim, checkPropTypes: emptyFunctionWithReset, resetWarningCache: emptyFunction };
    return ReactPropTypes.PropTypes = ReactPropTypes, ReactPropTypes;
  };
} });
var require_prop_types = __commonJS({ "../../node_modules/prop-types/index.js"(exports, module) {
  module.exports = require_factoryWithThrowingShims()();
} });
var require_html_tags = __commonJS({ "../../node_modules/html-tags/html-tags.json"(exports, module) {
  module.exports = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "search", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];
} });
var require_html_tags2 = __commonJS({ "../../node_modules/html-tags/index.js"(exports, module) {
  module.exports = require_html_tags();
} });
var require_estraverse = __commonJS({ "../../node_modules/estraverse/estraverse.js"(exports) {
  (function clone(exports2) {
    var Syntax, VisitorOption, VisitorKeys, BREAK, SKIP, REMOVE;
    function deepCopy(obj) {
      var ret = {}, key, val;
      for (key in obj) obj.hasOwnProperty(key) && (val = obj[key], typeof val == "object" && val !== null ? ret[key] = deepCopy(val) : ret[key] = val);
      return ret;
    }
    function upperBound(array, func) {
      var diff, len, i, current2;
      for (len = array.length, i = 0; len; ) diff = len >>> 1, current2 = i + diff, func(array[current2]) ? len = diff : (i = current2 + 1, len -= diff + 1);
      return i;
    }
    Syntax = { AssignmentExpression: "AssignmentExpression", AssignmentPattern: "AssignmentPattern", ArrayExpression: "ArrayExpression", ArrayPattern: "ArrayPattern", ArrowFunctionExpression: "ArrowFunctionExpression", AwaitExpression: "AwaitExpression", BlockStatement: "BlockStatement", BinaryExpression: "BinaryExpression", BreakStatement: "BreakStatement", CallExpression: "CallExpression", CatchClause: "CatchClause", ChainExpression: "ChainExpression", ClassBody: "ClassBody", ClassDeclaration: "ClassDeclaration", ClassExpression: "ClassExpression", ComprehensionBlock: "ComprehensionBlock", ComprehensionExpression: "ComprehensionExpression", ConditionalExpression: "ConditionalExpression", ContinueStatement: "ContinueStatement", DebuggerStatement: "DebuggerStatement", DirectiveStatement: "DirectiveStatement", DoWhileStatement: "DoWhileStatement", EmptyStatement: "EmptyStatement", ExportAllDeclaration: "ExportAllDeclaration", ExportDefaultDeclaration: "ExportDefaultDeclaration", ExportNamedDeclaration: "ExportNamedDeclaration", ExportSpecifier: "ExportSpecifier", ExpressionStatement: "ExpressionStatement", ForStatement: "ForStatement", ForInStatement: "ForInStatement", ForOfStatement: "ForOfStatement", FunctionDeclaration: "FunctionDeclaration", FunctionExpression: "FunctionExpression", GeneratorExpression: "GeneratorExpression", Identifier: "Identifier", IfStatement: "IfStatement", ImportExpression: "ImportExpression", ImportDeclaration: "ImportDeclaration", ImportDefaultSpecifier: "ImportDefaultSpecifier", ImportNamespaceSpecifier: "ImportNamespaceSpecifier", ImportSpecifier: "ImportSpecifier", Literal: "Literal", LabeledStatement: "LabeledStatement", LogicalExpression: "LogicalExpression", MemberExpression: "MemberExpression", MetaProperty: "MetaProperty", MethodDefinition: "MethodDefinition", ModuleSpecifier: "ModuleSpecifier", NewExpression: "NewExpression", ObjectExpression: "ObjectExpression", ObjectPattern: "ObjectPattern", PrivateIdentifier: "PrivateIdentifier", Program: "Program", Property: "Property", PropertyDefinition: "PropertyDefinition", RestElement: "RestElement", ReturnStatement: "ReturnStatement", SequenceExpression: "SequenceExpression", SpreadElement: "SpreadElement", Super: "Super", SwitchStatement: "SwitchStatement", SwitchCase: "SwitchCase", TaggedTemplateExpression: "TaggedTemplateExpression", TemplateElement: "TemplateElement", TemplateLiteral: "TemplateLiteral", ThisExpression: "ThisExpression", ThrowStatement: "ThrowStatement", TryStatement: "TryStatement", UnaryExpression: "UnaryExpression", UpdateExpression: "UpdateExpression", VariableDeclaration: "VariableDeclaration", VariableDeclarator: "VariableDeclarator", WhileStatement: "WhileStatement", WithStatement: "WithStatement", YieldExpression: "YieldExpression" }, VisitorKeys = { AssignmentExpression: ["left", "right"], AssignmentPattern: ["left", "right"], ArrayExpression: ["elements"], ArrayPattern: ["elements"], ArrowFunctionExpression: ["params", "body"], AwaitExpression: ["argument"], BlockStatement: ["body"], BinaryExpression: ["left", "right"], BreakStatement: ["label"], CallExpression: ["callee", "arguments"], CatchClause: ["param", "body"], ChainExpression: ["expression"], ClassBody: ["body"], ClassDeclaration: ["id", "superClass", "body"], ClassExpression: ["id", "superClass", "body"], ComprehensionBlock: ["left", "right"], ComprehensionExpression: ["blocks", "filter", "body"], ConditionalExpression: ["test", "consequent", "alternate"], ContinueStatement: ["label"], DebuggerStatement: [], DirectiveStatement: [], DoWhileStatement: ["body", "test"], EmptyStatement: [], ExportAllDeclaration: ["source"], ExportDefaultDeclaration: ["declaration"], ExportNamedDeclaration: ["declaration", "specifiers", "source"], ExportSpecifier: ["exported", "local"], ExpressionStatement: ["expression"], ForStatement: ["init", "test", "update", "body"], ForInStatement: ["left", "right", "body"], ForOfStatement: ["left", "right", "body"], FunctionDeclaration: ["id", "params", "body"], FunctionExpression: ["id", "params", "body"], GeneratorExpression: ["blocks", "filter", "body"], Identifier: [], IfStatement: ["test", "consequent", "alternate"], ImportExpression: ["source"], ImportDeclaration: ["specifiers", "source"], ImportDefaultSpecifier: ["local"], ImportNamespaceSpecifier: ["local"], ImportSpecifier: ["imported", "local"], Literal: [], LabeledStatement: ["label", "body"], LogicalExpression: ["left", "right"], MemberExpression: ["object", "property"], MetaProperty: ["meta", "property"], MethodDefinition: ["key", "value"], ModuleSpecifier: [], NewExpression: ["callee", "arguments"], ObjectExpression: ["properties"], ObjectPattern: ["properties"], PrivateIdentifier: [], Program: ["body"], Property: ["key", "value"], PropertyDefinition: ["key", "value"], RestElement: ["argument"], ReturnStatement: ["argument"], SequenceExpression: ["expressions"], SpreadElement: ["argument"], Super: [], SwitchStatement: ["discriminant", "cases"], SwitchCase: ["test", "consequent"], TaggedTemplateExpression: ["tag", "quasi"], TemplateElement: [], TemplateLiteral: ["quasis", "expressions"], ThisExpression: [], ThrowStatement: ["argument"], TryStatement: ["block", "handler", "finalizer"], UnaryExpression: ["argument"], UpdateExpression: ["argument"], VariableDeclaration: ["declarations"], VariableDeclarator: ["id", "init"], WhileStatement: ["test", "body"], WithStatement: ["object", "body"], YieldExpression: ["argument"] }, BREAK = {}, SKIP = {}, REMOVE = {}, VisitorOption = { Break: BREAK, Skip: SKIP, Remove: REMOVE };
    function Reference(parent, key) {
      this.parent = parent, this.key = key;
    }
    Reference.prototype.replace = function(node) {
      this.parent[this.key] = node;
    }, Reference.prototype.remove = function() {
      return Array.isArray(this.parent) ? (this.parent.splice(this.key, 1), true) : (this.replace(null), false);
    };
    function Element(node, path, wrap, ref2) {
      this.node = node, this.path = path, this.wrap = wrap, this.ref = ref2;
    }
    function Controller() {
    }
    Controller.prototype.path = function() {
      var i, iz, j, jz, result, element;
      function addToPath(result2, path2) {
        if (Array.isArray(path2)) for (j = 0, jz = path2.length; j < jz; ++j) result2.push(path2[j]);
        else result2.push(path2);
      }
      if (!this.__current.path) return null;
      for (result = [], i = 2, iz = this.__leavelist.length; i < iz; ++i) element = this.__leavelist[i], addToPath(result, element.path);
      return addToPath(result, this.__current.path), result;
    }, Controller.prototype.type = function() {
      var node = this.current();
      return node.type || this.__current.wrap;
    }, Controller.prototype.parents = function() {
      var i, iz, result;
      for (result = [], i = 1, iz = this.__leavelist.length; i < iz; ++i) result.push(this.__leavelist[i].node);
      return result;
    }, Controller.prototype.current = function() {
      return this.__current.node;
    }, Controller.prototype.__execute = function(callback, element) {
      var previous, result;
      return result = void 0, previous = this.__current, this.__current = element, this.__state = null, callback && (result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node)), this.__current = previous, result;
    }, Controller.prototype.notify = function(flag) {
      this.__state = flag;
    }, Controller.prototype.skip = function() {
      this.notify(SKIP);
    }, Controller.prototype.break = function() {
      this.notify(BREAK);
    }, Controller.prototype.remove = function() {
      this.notify(REMOVE);
    }, Controller.prototype.__initialize = function(root, visitor) {
      this.visitor = visitor, this.root = root, this.__worklist = [], this.__leavelist = [], this.__current = null, this.__state = null, this.__fallback = null, visitor.fallback === "iteration" ? this.__fallback = Object.keys : typeof visitor.fallback == "function" && (this.__fallback = visitor.fallback), this.__keys = VisitorKeys, visitor.keys && (this.__keys = Object.assign(Object.create(this.__keys), visitor.keys));
    };
    function isNode(node) {
      return node == null ? false : typeof node == "object" && typeof node.type == "string";
    }
    function isProperty(nodeType, key) {
      return (nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && key === "properties";
    }
    function candidateExistsInLeaveList(leavelist, candidate) {
      for (var i = leavelist.length - 1; i >= 0; --i) if (leavelist[i].node === candidate) return true;
      return false;
    }
    Controller.prototype.traverse = function(root, visitor) {
      var worklist, leavelist, element, node, nodeType, ret, key, current2, current22, candidates, candidate, sentinel;
      for (this.__initialize(root, visitor), sentinel = {}, worklist = this.__worklist, leavelist = this.__leavelist, worklist.push(new Element(root, null, null, null)), leavelist.push(new Element(null, null, null, null)); worklist.length; ) {
        if (element = worklist.pop(), element === sentinel) {
          if (element = leavelist.pop(), ret = this.__execute(visitor.leave, element), this.__state === BREAK || ret === BREAK) return;
          continue;
        }
        if (element.node) {
          if (ret = this.__execute(visitor.enter, element), this.__state === BREAK || ret === BREAK) return;
          if (worklist.push(sentinel), leavelist.push(element), this.__state === SKIP || ret === SKIP) continue;
          if (node = element.node, nodeType = node.type || element.wrap, candidates = this.__keys[nodeType], !candidates) if (this.__fallback) candidates = this.__fallback(node);
          else throw new Error("Unknown node type " + nodeType + ".");
          for (current2 = candidates.length; (current2 -= 1) >= 0; ) if (key = candidates[current2], candidate = node[key], !!candidate) {
            if (Array.isArray(candidate)) {
              for (current22 = candidate.length; (current22 -= 1) >= 0; ) if (candidate[current22] && !candidateExistsInLeaveList(leavelist, candidate[current22])) {
                if (isProperty(nodeType, candidates[current2])) element = new Element(candidate[current22], [key, current22], "Property", null);
                else if (isNode(candidate[current22])) element = new Element(candidate[current22], [key, current22], null, null);
                else continue;
                worklist.push(element);
              }
            } else if (isNode(candidate)) {
              if (candidateExistsInLeaveList(leavelist, candidate)) continue;
              worklist.push(new Element(candidate, key, null, null));
            }
          }
        }
      }
    }, Controller.prototype.replace = function(root, visitor) {
      var worklist, leavelist, node, nodeType, target, element, current2, current22, candidates, candidate, sentinel, outer, key;
      function removeElem(element2) {
        var i, key2, nextElem, parent;
        if (element2.ref.remove()) {
          for (key2 = element2.ref.key, parent = element2.ref.parent, i = worklist.length; i--; ) if (nextElem = worklist[i], nextElem.ref && nextElem.ref.parent === parent) {
            if (nextElem.ref.key < key2) break;
            --nextElem.ref.key;
          }
        }
      }
      for (this.__initialize(root, visitor), sentinel = {}, worklist = this.__worklist, leavelist = this.__leavelist, outer = { root }, element = new Element(root, null, null, new Reference(outer, "root")), worklist.push(element), leavelist.push(element); worklist.length; ) {
        if (element = worklist.pop(), element === sentinel) {
          if (element = leavelist.pop(), target = this.__execute(visitor.leave, element), target !== void 0 && target !== BREAK && target !== SKIP && target !== REMOVE && element.ref.replace(target), (this.__state === REMOVE || target === REMOVE) && removeElem(element), this.__state === BREAK || target === BREAK) return outer.root;
          continue;
        }
        if (target = this.__execute(visitor.enter, element), target !== void 0 && target !== BREAK && target !== SKIP && target !== REMOVE && (element.ref.replace(target), element.node = target), (this.__state === REMOVE || target === REMOVE) && (removeElem(element), element.node = null), this.__state === BREAK || target === BREAK) return outer.root;
        if (node = element.node, !!node && (worklist.push(sentinel), leavelist.push(element), !(this.__state === SKIP || target === SKIP))) {
          if (nodeType = node.type || element.wrap, candidates = this.__keys[nodeType], !candidates) if (this.__fallback) candidates = this.__fallback(node);
          else throw new Error("Unknown node type " + nodeType + ".");
          for (current2 = candidates.length; (current2 -= 1) >= 0; ) if (key = candidates[current2], candidate = node[key], !!candidate) if (Array.isArray(candidate)) {
            for (current22 = candidate.length; (current22 -= 1) >= 0; ) if (candidate[current22]) {
              if (isProperty(nodeType, candidates[current2])) element = new Element(candidate[current22], [key, current22], "Property", new Reference(candidate, current22));
              else if (isNode(candidate[current22])) element = new Element(candidate[current22], [key, current22], null, new Reference(candidate, current22));
              else continue;
              worklist.push(element);
            }
          } else isNode(candidate) && worklist.push(new Element(candidate, key, null, new Reference(node, key)));
        }
      }
      return outer.root;
    };
    function traverse(root, visitor) {
      var controller = new Controller();
      return controller.traverse(root, visitor);
    }
    function replace(root, visitor) {
      var controller = new Controller();
      return controller.replace(root, visitor);
    }
    function extendCommentRange(comment, tokens) {
      var target;
      return target = upperBound(tokens, function(token) {
        return token.range[0] > comment.range[0];
      }), comment.extendedRange = [comment.range[0], comment.range[1]], target !== tokens.length && (comment.extendedRange[1] = tokens[target].range[0]), target -= 1, target >= 0 && (comment.extendedRange[0] = tokens[target].range[1]), comment;
    }
    function attachComments(tree, providedComments, tokens) {
      var comments = [], comment, len, i, cursor;
      if (!tree.range) throw new Error("attachComments needs range information");
      if (!tokens.length) {
        if (providedComments.length) {
          for (i = 0, len = providedComments.length; i < len; i += 1) comment = deepCopy(providedComments[i]), comment.extendedRange = [0, tree.range[0]], comments.push(comment);
          tree.leadingComments = comments;
        }
        return tree;
      }
      for (i = 0, len = providedComments.length; i < len; i += 1) comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
      return cursor = 0, traverse(tree, { enter: function(node) {
        for (var comment2; cursor < comments.length && (comment2 = comments[cursor], !(comment2.extendedRange[1] > node.range[0])); ) comment2.extendedRange[1] === node.range[0] ? (node.leadingComments || (node.leadingComments = []), node.leadingComments.push(comment2), comments.splice(cursor, 1)) : cursor += 1;
        if (cursor === comments.length) return VisitorOption.Break;
        if (comments[cursor].extendedRange[0] > node.range[1]) return VisitorOption.Skip;
      } }), cursor = 0, traverse(tree, { leave: function(node) {
        for (var comment2; cursor < comments.length && (comment2 = comments[cursor], !(node.range[1] < comment2.extendedRange[0])); ) node.range[1] === comment2.extendedRange[0] ? (node.trailingComments || (node.trailingComments = []), node.trailingComments.push(comment2), comments.splice(cursor, 1)) : cursor += 1;
        if (cursor === comments.length) return VisitorOption.Break;
        if (comments[cursor].extendedRange[0] > node.range[1]) return VisitorOption.Skip;
      } }), tree;
    }
    return exports2.Syntax = Syntax, exports2.traverse = traverse, exports2.replace = replace, exports2.attachComments = attachComments, exports2.VisitorKeys = VisitorKeys, exports2.VisitorOption = VisitorOption, exports2.Controller = Controller, exports2.cloneEnvironment = function() {
      return clone({});
    }, exports2;
  })(exports);
} });
var require_ast = __commonJS({ "../../node_modules/esutils/lib/ast.js"(exports, module) {
  (function() {
    function isExpression(node) {
      if (node == null) return false;
      switch (node.type) {
        case "ArrayExpression":
        case "AssignmentExpression":
        case "BinaryExpression":
        case "CallExpression":
        case "ConditionalExpression":
        case "FunctionExpression":
        case "Identifier":
        case "Literal":
        case "LogicalExpression":
        case "MemberExpression":
        case "NewExpression":
        case "ObjectExpression":
        case "SequenceExpression":
        case "ThisExpression":
        case "UnaryExpression":
        case "UpdateExpression":
          return true;
      }
      return false;
    }
    function isIterationStatement(node) {
      if (node == null) return false;
      switch (node.type) {
        case "DoWhileStatement":
        case "ForInStatement":
        case "ForStatement":
        case "WhileStatement":
          return true;
      }
      return false;
    }
    function isStatement(node) {
      if (node == null) return false;
      switch (node.type) {
        case "BlockStatement":
        case "BreakStatement":
        case "ContinueStatement":
        case "DebuggerStatement":
        case "DoWhileStatement":
        case "EmptyStatement":
        case "ExpressionStatement":
        case "ForInStatement":
        case "ForStatement":
        case "IfStatement":
        case "LabeledStatement":
        case "ReturnStatement":
        case "SwitchStatement":
        case "ThrowStatement":
        case "TryStatement":
        case "VariableDeclaration":
        case "WhileStatement":
        case "WithStatement":
          return true;
      }
      return false;
    }
    function isSourceElement(node) {
      return isStatement(node) || node != null && node.type === "FunctionDeclaration";
    }
    function trailingStatement(node) {
      switch (node.type) {
        case "IfStatement":
          return node.alternate != null ? node.alternate : node.consequent;
        case "LabeledStatement":
        case "ForStatement":
        case "ForInStatement":
        case "WhileStatement":
        case "WithStatement":
          return node.body;
      }
      return null;
    }
    function isProblematicIfStatement(node) {
      var current2;
      if (node.type !== "IfStatement" || node.alternate == null) return false;
      current2 = node.consequent;
      do {
        if (current2.type === "IfStatement" && current2.alternate == null) return true;
        current2 = trailingStatement(current2);
      } while (current2);
      return false;
    }
    module.exports = { isExpression, isStatement, isIterationStatement, isSourceElement, isProblematicIfStatement, trailingStatement };
  })();
} });
var require_code = __commonJS({ "../../node_modules/esutils/lib/code.js"(exports, module) {
  (function() {
    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;
    ES5Regex = { NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/, NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/ }, ES6Regex = { NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/, NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/ };
    function isDecimalDigit2(ch2) {
      return 48 <= ch2 && ch2 <= 57;
    }
    function isHexDigit2(ch2) {
      return 48 <= ch2 && ch2 <= 57 || 97 <= ch2 && ch2 <= 102 || 65 <= ch2 && ch2 <= 70;
    }
    function isOctalDigit2(ch2) {
      return ch2 >= 48 && ch2 <= 55;
    }
    NON_ASCII_WHITESPACES = [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279];
    function isWhiteSpace(ch2) {
      return ch2 === 32 || ch2 === 9 || ch2 === 11 || ch2 === 12 || ch2 === 160 || ch2 >= 5760 && NON_ASCII_WHITESPACES.indexOf(ch2) >= 0;
    }
    function isLineTerminator(ch2) {
      return ch2 === 10 || ch2 === 13 || ch2 === 8232 || ch2 === 8233;
    }
    function fromCodePoint(cp) {
      if (cp <= 65535) return String.fromCharCode(cp);
      var cu1 = String.fromCharCode(Math.floor((cp - 65536) / 1024) + 55296), cu2 = String.fromCharCode((cp - 65536) % 1024 + 56320);
      return cu1 + cu2;
    }
    for (IDENTIFIER_START = new Array(128), ch = 0; ch < 128; ++ch) IDENTIFIER_START[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch === 36 || ch === 95;
    for (IDENTIFIER_PART = new Array(128), ch = 0; ch < 128; ++ch) IDENTIFIER_PART[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57 || ch === 36 || ch === 95;
    function isIdentifierStartES5(ch2) {
      return ch2 < 128 ? IDENTIFIER_START[ch2] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch2));
    }
    function isIdentifierPartES5(ch2) {
      return ch2 < 128 ? IDENTIFIER_PART[ch2] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch2));
    }
    function isIdentifierStartES6(ch2) {
      return ch2 < 128 ? IDENTIFIER_START[ch2] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch2));
    }
    function isIdentifierPartES6(ch2) {
      return ch2 < 128 ? IDENTIFIER_PART[ch2] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch2));
    }
    module.exports = { isDecimalDigit: isDecimalDigit2, isHexDigit: isHexDigit2, isOctalDigit: isOctalDigit2, isWhiteSpace, isLineTerminator, isIdentifierStartES5, isIdentifierPartES5, isIdentifierStartES6, isIdentifierPartES6 };
  })();
} });
var require_keyword = __commonJS({ "../../node_modules/esutils/lib/keyword.js"(exports, module) {
  (function() {
    var code = require_code();
    function isStrictModeReservedWordES6(id) {
      switch (id) {
        case "implements":
        case "interface":
        case "package":
        case "private":
        case "protected":
        case "public":
        case "static":
        case "let":
          return true;
        default:
          return false;
      }
    }
    function isKeywordES5(id, strict) {
      return !strict && id === "yield" ? false : isKeywordES6(id, strict);
    }
    function isKeywordES6(id, strict) {
      if (strict && isStrictModeReservedWordES6(id)) return true;
      switch (id.length) {
        case 2:
          return id === "if" || id === "in" || id === "do";
        case 3:
          return id === "var" || id === "for" || id === "new" || id === "try";
        case 4:
          return id === "this" || id === "else" || id === "case" || id === "void" || id === "with" || id === "enum";
        case 5:
          return id === "while" || id === "break" || id === "catch" || id === "throw" || id === "const" || id === "yield" || id === "class" || id === "super";
        case 6:
          return id === "return" || id === "typeof" || id === "delete" || id === "switch" || id === "export" || id === "import";
        case 7:
          return id === "default" || id === "finally" || id === "extends";
        case 8:
          return id === "function" || id === "continue" || id === "debugger";
        case 10:
          return id === "instanceof";
        default:
          return false;
      }
    }
    function isReservedWordES5(id, strict) {
      return id === "null" || id === "true" || id === "false" || isKeywordES5(id, strict);
    }
    function isReservedWordES6(id, strict) {
      return id === "null" || id === "true" || id === "false" || isKeywordES6(id, strict);
    }
    function isRestrictedWord(id) {
      return id === "eval" || id === "arguments";
    }
    function isIdentifierNameES5(id) {
      var i, iz, ch;
      if (id.length === 0 || (ch = id.charCodeAt(0), !code.isIdentifierStartES5(ch))) return false;
      for (i = 1, iz = id.length; i < iz; ++i) if (ch = id.charCodeAt(i), !code.isIdentifierPartES5(ch)) return false;
      return true;
    }
    function decodeUtf16(lead, trail) {
      return (lead - 55296) * 1024 + (trail - 56320) + 65536;
    }
    function isIdentifierNameES6(id) {
      var i, iz, ch, lowCh, check;
      if (id.length === 0) return false;
      for (check = code.isIdentifierStartES6, i = 0, iz = id.length; i < iz; ++i) {
        if (ch = id.charCodeAt(i), 55296 <= ch && ch <= 56319) {
          if (++i, i >= iz || (lowCh = id.charCodeAt(i), !(56320 <= lowCh && lowCh <= 57343))) return false;
          ch = decodeUtf16(ch, lowCh);
        }
        if (!check(ch)) return false;
        check = code.isIdentifierPartES6;
      }
      return true;
    }
    function isIdentifierES5(id, strict) {
      return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
    }
    function isIdentifierES6(id, strict) {
      return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
    }
    module.exports = { isKeywordES5, isKeywordES6, isReservedWordES5, isReservedWordES6, isRestrictedWord, isIdentifierNameES5, isIdentifierNameES6, isIdentifierES5, isIdentifierES6 };
  })();
} });
var require_utils = __commonJS({ "../../node_modules/esutils/lib/utils.js"(exports) {
  (function() {
    exports.ast = require_ast(), exports.code = require_code(), exports.keyword = require_keyword();
  })();
} });
var require_base64 = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/base64.js"(exports) {
  var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  exports.encode = function(number) {
    if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
    throw new TypeError("Must be between 0 and 63: " + number);
  };
  exports.decode = function(charCode) {
    var bigA = 65, bigZ = 90, littleA = 97, littleZ = 122, zero = 48, nine = 57, plus = 43, slash = 47, littleOffset = 26, numberOffset = 52;
    return bigA <= charCode && charCode <= bigZ ? charCode - bigA : littleA <= charCode && charCode <= littleZ ? charCode - littleA + littleOffset : zero <= charCode && charCode <= nine ? charCode - zero + numberOffset : charCode == plus ? 62 : charCode == slash ? 63 : -1;
  };
} });
var require_base64_vlq = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/base64-vlq.js"(exports) {
  var base64 = require_base64(), VLQ_BASE_SHIFT = 5, VLQ_BASE = 1 << VLQ_BASE_SHIFT, VLQ_BASE_MASK = VLQ_BASE - 1, VLQ_CONTINUATION_BIT = VLQ_BASE;
  function toVLQSigned(aValue) {
    return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
  }
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1, shifted = aValue >> 1;
    return isNegative ? -shifted : shifted;
  }
  exports.encode = function(aValue) {
    var encoded = "", digit, vlq = toVLQSigned(aValue);
    do
      digit = vlq & VLQ_BASE_MASK, vlq >>>= VLQ_BASE_SHIFT, vlq > 0 && (digit |= VLQ_CONTINUATION_BIT), encoded += base64.encode(digit);
    while (vlq > 0);
    return encoded;
  };
  exports.decode = function(aStr, aIndex, aOutParam) {
    var strLen = aStr.length, result = 0, shift = 0, continuation, digit;
    do {
      if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
      if (digit = base64.decode(aStr.charCodeAt(aIndex++)), digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      continuation = !!(digit & VLQ_CONTINUATION_BIT), digit &= VLQ_BASE_MASK, result = result + (digit << shift), shift += VLQ_BASE_SHIFT;
    } while (continuation);
    aOutParam.value = fromVLQSigned(result), aOutParam.rest = aIndex;
  };
} });
var require_util = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/util.js"(exports) {
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) return aArgs[aName];
    if (arguments.length === 3) return aDefaultValue;
    throw new Error('"' + aName + '" is a required argument.');
  }
  exports.getArg = getArg;
  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, dataUrlRegexp = /^data:.+\,.+$/;
  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    return match ? { scheme: match[1], auth: match[2], host: match[3], port: match[4], path: match[5] } : null;
  }
  exports.urlParse = urlParse;
  function urlGenerate(aParsedUrl) {
    var url = "";
    return aParsedUrl.scheme && (url += aParsedUrl.scheme + ":"), url += "//", aParsedUrl.auth && (url += aParsedUrl.auth + "@"), aParsedUrl.host && (url += aParsedUrl.host), aParsedUrl.port && (url += ":" + aParsedUrl.port), aParsedUrl.path && (url += aParsedUrl.path), url;
  }
  exports.urlGenerate = urlGenerate;
  function normalize(aPath) {
    var path = aPath, url = urlParse(aPath);
    if (url) {
      if (!url.path) return aPath;
      path = url.path;
    }
    for (var isAbsolute = exports.isAbsolute(path), parts = path.split(/\/+/), part, up = 0, i = parts.length - 1; i >= 0; i--) part = parts[i], part === "." ? parts.splice(i, 1) : part === ".." ? up++ : up > 0 && (part === "" ? (parts.splice(i + 1, up), up = 0) : (parts.splice(i, 2), up--));
    return path = parts.join("/"), path === "" && (path = isAbsolute ? "/" : "."), url ? (url.path = path, urlGenerate(url)) : path;
  }
  exports.normalize = normalize;
  function join(aRoot, aPath) {
    aRoot === "" && (aRoot = "."), aPath === "" && (aPath = ".");
    var aPathUrl = urlParse(aPath), aRootUrl = urlParse(aRoot);
    if (aRootUrl && (aRoot = aRootUrl.path || "/"), aPathUrl && !aPathUrl.scheme) return aRootUrl && (aPathUrl.scheme = aRootUrl.scheme), urlGenerate(aPathUrl);
    if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) return aRootUrl.host = aPath, urlGenerate(aRootUrl);
    var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
    return aRootUrl ? (aRootUrl.path = joined, urlGenerate(aRootUrl)) : joined;
  }
  exports.join = join;
  exports.isAbsolute = function(aPath) {
    return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
  };
  function relative(aRoot, aPath) {
    aRoot === "" && (aRoot = "."), aRoot = aRoot.replace(/\/$/, "");
    for (var level = 0; aPath.indexOf(aRoot + "/") !== 0; ) {
      var index = aRoot.lastIndexOf("/");
      if (index < 0 || (aRoot = aRoot.slice(0, index), aRoot.match(/^([^\/]+:\/)?\/*$/))) return aPath;
      ++level;
    }
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  }
  exports.relative = relative;
  var supportsNullProto = function() {
    var obj = /* @__PURE__ */ Object.create(null);
    return !("__proto__" in obj);
  }();
  function identity(s) {
    return s;
  }
  function toSetString(aStr) {
    return isProtoString(aStr) ? "$" + aStr : aStr;
  }
  exports.toSetString = supportsNullProto ? identity : toSetString;
  function fromSetString(aStr) {
    return isProtoString(aStr) ? aStr.slice(1) : aStr;
  }
  exports.fromSetString = supportsNullProto ? identity : fromSetString;
  function isProtoString(s) {
    if (!s) return false;
    var length = s.length;
    if (length < 9 || s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
    for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
    return true;
  }
  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = strcmp(mappingA.source, mappingB.source);
    return cmp !== 0 || (cmp = mappingA.originalLine - mappingB.originalLine, cmp !== 0) || (cmp = mappingA.originalColumn - mappingB.originalColumn, cmp !== 0 || onlyCompareOriginal) || (cmp = mappingA.generatedColumn - mappingB.generatedColumn, cmp !== 0) || (cmp = mappingA.generatedLine - mappingB.generatedLine, cmp !== 0) ? cmp : strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByOriginalPositions = compareByOriginalPositions;
  function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    return cmp !== 0 || (cmp = mappingA.generatedColumn - mappingB.generatedColumn, cmp !== 0 || onlyCompareGenerated) || (cmp = strcmp(mappingA.source, mappingB.source), cmp !== 0) || (cmp = mappingA.originalLine - mappingB.originalLine, cmp !== 0) || (cmp = mappingA.originalColumn - mappingB.originalColumn, cmp !== 0) ? cmp : strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
  function strcmp(aStr1, aStr2) {
    return aStr1 === aStr2 ? 0 : aStr1 === null ? 1 : aStr2 === null ? -1 : aStr1 > aStr2 ? 1 : -1;
  }
  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    return cmp !== 0 || (cmp = mappingA.generatedColumn - mappingB.generatedColumn, cmp !== 0) || (cmp = strcmp(mappingA.source, mappingB.source), cmp !== 0) || (cmp = mappingA.originalLine - mappingB.originalLine, cmp !== 0) || (cmp = mappingA.originalColumn - mappingB.originalColumn, cmp !== 0) ? cmp : strcmp(mappingA.name, mappingB.name);
  }
  exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
  function parseSourceMapInput(str) {
    return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
  }
  exports.parseSourceMapInput = parseSourceMapInput;
  function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
    if (sourceURL = sourceURL || "", sourceRoot && (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/" && (sourceRoot += "/"), sourceURL = sourceRoot + sourceURL), sourceMapURL) {
      var parsed = urlParse(sourceMapURL);
      if (!parsed) throw new Error("sourceMapURL could not be parsed");
      if (parsed.path) {
        var index = parsed.path.lastIndexOf("/");
        index >= 0 && (parsed.path = parsed.path.substring(0, index + 1));
      }
      sourceURL = join(urlGenerate(parsed), sourceURL);
    }
    return normalize(sourceURL);
  }
  exports.computeSourceURL = computeSourceURL;
} });
var require_array_set = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/array-set.js"(exports) {
  var util = require_util(), has2 = Object.prototype.hasOwnProperty, hasNativeMap = typeof Map < "u";
  function ArraySet() {
    this._array = [], this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  ArraySet.fromArray = function(aArray, aAllowDuplicates) {
    for (var set = new ArraySet(), i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
    return set;
  };
  ArraySet.prototype.size = function() {
    return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  };
  ArraySet.prototype.add = function(aStr, aAllowDuplicates) {
    var sStr = hasNativeMap ? aStr : util.toSetString(aStr), isDuplicate = hasNativeMap ? this.has(aStr) : has2.call(this._set, sStr), idx = this._array.length;
    (!isDuplicate || aAllowDuplicates) && this._array.push(aStr), isDuplicate || (hasNativeMap ? this._set.set(aStr, idx) : this._set[sStr] = idx);
  };
  ArraySet.prototype.has = function(aStr) {
    if (hasNativeMap) return this._set.has(aStr);
    var sStr = util.toSetString(aStr);
    return has2.call(this._set, sStr);
  };
  ArraySet.prototype.indexOf = function(aStr) {
    if (hasNativeMap) {
      var idx = this._set.get(aStr);
      if (idx >= 0) return idx;
    } else {
      var sStr = util.toSetString(aStr);
      if (has2.call(this._set, sStr)) return this._set[sStr];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };
  ArraySet.prototype.at = function(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
    throw new Error("No element indexed by " + aIdx);
  };
  ArraySet.prototype.toArray = function() {
    return this._array.slice();
  };
  exports.ArraySet = ArraySet;
} });
var require_mapping_list = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/mapping-list.js"(exports) {
  var util = require_util();
  function generatedPositionAfter(mappingA, mappingB) {
    var lineA = mappingA.generatedLine, lineB = mappingB.generatedLine, columnA = mappingA.generatedColumn, columnB = mappingB.generatedColumn;
    return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
  }
  function MappingList() {
    this._array = [], this._sorted = true, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  MappingList.prototype.unsortedForEach = function(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };
  MappingList.prototype.add = function(aMapping) {
    generatedPositionAfter(this._last, aMapping) ? (this._last = aMapping, this._array.push(aMapping)) : (this._sorted = false, this._array.push(aMapping));
  };
  MappingList.prototype.toArray = function() {
    return this._sorted || (this._array.sort(util.compareByGeneratedPositionsInflated), this._sorted = true), this._array;
  };
  exports.MappingList = MappingList;
} });
var require_source_map_generator = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/source-map-generator.js"(exports) {
  var base64VLQ = require_base64_vlq(), util = require_util(), ArraySet = require_array_set().ArraySet, MappingList = require_mapping_list().MappingList;
  function SourceMapGenerator(aArgs) {
    aArgs || (aArgs = {}), this._file = util.getArg(aArgs, "file", null), this._sourceRoot = util.getArg(aArgs, "sourceRoot", null), this._skipValidation = util.getArg(aArgs, "skipValidation", false), this._sources = new ArraySet(), this._names = new ArraySet(), this._mappings = new MappingList(), this._sourcesContents = null;
  }
  SourceMapGenerator.prototype._version = 3;
  SourceMapGenerator.fromSourceMap = function(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot, generator = new SourceMapGenerator({ file: aSourceMapConsumer.file, sourceRoot });
    return aSourceMapConsumer.eachMapping(function(mapping) {
      var newMapping = { generated: { line: mapping.generatedLine, column: mapping.generatedColumn } };
      mapping.source != null && (newMapping.source = mapping.source, sourceRoot != null && (newMapping.source = util.relative(sourceRoot, newMapping.source)), newMapping.original = { line: mapping.originalLine, column: mapping.originalColumn }, mapping.name != null && (newMapping.name = mapping.name)), generator.addMapping(newMapping);
    }), aSourceMapConsumer.sources.forEach(function(sourceFile) {
      var sourceRelative = sourceFile;
      sourceRoot !== null && (sourceRelative = util.relative(sourceRoot, sourceFile)), generator._sources.has(sourceRelative) || generator._sources.add(sourceRelative);
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      content != null && generator.setSourceContent(sourceFile, content);
    }), generator;
  };
  SourceMapGenerator.prototype.addMapping = function(aArgs) {
    var generated = util.getArg(aArgs, "generated"), original = util.getArg(aArgs, "original", null), source = util.getArg(aArgs, "source", null), name = util.getArg(aArgs, "name", null);
    this._skipValidation || this._validateMapping(generated, original, source, name), source != null && (source = String(source), this._sources.has(source) || this._sources.add(source)), name != null && (name = String(name), this._names.has(name) || this._names.add(name)), this._mappings.add({ generatedLine: generated.line, generatedColumn: generated.column, originalLine: original != null && original.line, originalColumn: original != null && original.column, source, name });
  };
  SourceMapGenerator.prototype.setSourceContent = function(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    this._sourceRoot != null && (source = util.relative(this._sourceRoot, source)), aSourceContent != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[util.toSetString(source)] = aSourceContent) : this._sourcesContents && (delete this._sourcesContents[util.toSetString(source)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  };
  SourceMapGenerator.prototype.applySourceMap = function(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    sourceRoot != null && (sourceFile = util.relative(sourceRoot, sourceFile));
    var newSources = new ArraySet(), newNames = new ArraySet();
    this._mappings.unsortedForEach(function(mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        var original = aSourceMapConsumer.originalPositionFor({ line: mapping.originalLine, column: mapping.originalColumn });
        original.source != null && (mapping.source = original.source, aSourceMapPath != null && (mapping.source = util.join(aSourceMapPath, mapping.source)), sourceRoot != null && (mapping.source = util.relative(sourceRoot, mapping.source)), mapping.originalLine = original.line, mapping.originalColumn = original.column, original.name != null && (mapping.name = original.name));
      }
      var source = mapping.source;
      source != null && !newSources.has(source) && newSources.add(source);
      var name = mapping.name;
      name != null && !newNames.has(name) && newNames.add(name);
    }, this), this._sources = newSources, this._names = newNames, aSourceMapConsumer.sources.forEach(function(sourceFile2) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
      content != null && (aSourceMapPath != null && (sourceFile2 = util.join(aSourceMapPath, sourceFile2)), sourceRoot != null && (sourceFile2 = util.relative(sourceRoot, sourceFile2)), this.setSourceContent(sourceFile2, content));
    }, this);
  };
  SourceMapGenerator.prototype._validateMapping = function(aGenerated, aOriginal, aSource, aName) {
    if (aOriginal && typeof aOriginal.line != "number" && typeof aOriginal.column != "number") throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
    if (!(aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName)) {
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
      throw new Error("Invalid mapping: " + JSON.stringify({ generated: aGenerated, source: aSource, original: aOriginal, name: aName }));
    }
  };
  SourceMapGenerator.prototype._serializeMappings = function() {
    for (var previousGeneratedColumn = 0, previousGeneratedLine = 1, previousOriginalColumn = 0, previousOriginalLine = 0, previousName = 0, previousSource = 0, result = "", next, mapping, nameIdx, sourceIdx, mappings = this._mappings.toArray(), i = 0, len = mappings.length; i < len; i++) {
      if (mapping = mappings[i], next = "", mapping.generatedLine !== previousGeneratedLine) for (previousGeneratedColumn = 0; mapping.generatedLine !== previousGeneratedLine; ) next += ";", previousGeneratedLine++;
      else if (i > 0) {
        if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
        next += ",";
      }
      next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn), previousGeneratedColumn = mapping.generatedColumn, mapping.source != null && (sourceIdx = this._sources.indexOf(mapping.source), next += base64VLQ.encode(sourceIdx - previousSource), previousSource = sourceIdx, next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine), previousOriginalLine = mapping.originalLine - 1, next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn), previousOriginalColumn = mapping.originalColumn, mapping.name != null && (nameIdx = this._names.indexOf(mapping.name), next += base64VLQ.encode(nameIdx - previousName), previousName = nameIdx)), result += next;
    }
    return result;
  };
  SourceMapGenerator.prototype._generateSourcesContent = function(aSources, aSourceRoot) {
    return aSources.map(function(source) {
      if (!this._sourcesContents) return null;
      aSourceRoot != null && (source = util.relative(aSourceRoot, source));
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
    }, this);
  };
  SourceMapGenerator.prototype.toJSON = function() {
    var map = { version: this._version, sources: this._sources.toArray(), names: this._names.toArray(), mappings: this._serializeMappings() };
    return this._file != null && (map.file = this._file), this._sourceRoot != null && (map.sourceRoot = this._sourceRoot), this._sourcesContents && (map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot)), map;
  };
  SourceMapGenerator.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  };
  exports.SourceMapGenerator = SourceMapGenerator;
} });
var require_binary_search = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/binary-search.js"(exports) {
  exports.GREATEST_LOWER_BOUND = 1;
  exports.LEAST_UPPER_BOUND = 2;
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
    var mid = Math.floor((aHigh - aLow) / 2) + aLow, cmp = aCompare(aNeedle, aHaystack[mid], true);
    return cmp === 0 ? mid : cmp > 0 ? aHigh - mid > 1 ? recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? aHigh < aHaystack.length ? aHigh : -1 : mid : mid - aLow > 1 ? recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? mid : aLow < 0 ? -1 : aLow;
  }
  exports.search = function(aNeedle, aHaystack, aCompare, aBias) {
    if (aHaystack.length === 0) return -1;
    var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    if (index < 0) return -1;
    for (; index - 1 >= 0 && aCompare(aHaystack[index], aHaystack[index - 1], true) === 0; ) --index;
    return index;
  };
} });
var require_quick_sort = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/quick-sort.js"(exports) {
  function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y], ary[y] = temp;
  }
  function randomIntInRange(low, high) {
    return Math.round(low + Math.random() * (high - low));
  }
  function doQuickSort(ary, comparator, p, r) {
    if (p < r) {
      var pivotIndex = randomIntInRange(p, r), i = p - 1;
      swap(ary, pivotIndex, r);
      for (var pivot = ary[r], j = p; j < r; j++) comparator(ary[j], pivot) <= 0 && (i += 1, swap(ary, i, j));
      swap(ary, i + 1, j);
      var q = i + 1;
      doQuickSort(ary, comparator, p, q - 1), doQuickSort(ary, comparator, q + 1, r);
    }
  }
  exports.quickSort = function(ary, comparator) {
    doQuickSort(ary, comparator, 0, ary.length - 1);
  };
} });
var require_source_map_consumer = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/source-map-consumer.js"(exports) {
  var util = require_util(), binarySearch = require_binary_search(), ArraySet = require_array_set().ArraySet, base64VLQ = require_base64_vlq(), quickSort = require_quick_sort().quickSort;
  function SourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    return typeof aSourceMap == "string" && (sourceMap = util.parseSourceMapInput(aSourceMap)), sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
  }
  SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
  };
  SourceMapConsumer.prototype._version = 3;
  SourceMapConsumer.prototype.__generatedMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", { configurable: true, enumerable: true, get: function() {
    return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
  } });
  SourceMapConsumer.prototype.__originalMappings = null;
  Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", { configurable: true, enumerable: true, get: function() {
    return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
  } });
  SourceMapConsumer.prototype._charIsMappingSeparator = function(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };
  SourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };
  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;
  SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
  SourceMapConsumer.LEAST_UPPER_BOUND = 2;
  SourceMapConsumer.prototype.eachMapping = function(aCallback, aContext, aOrder) {
    var context = aContext || null, order = aOrder || SourceMapConsumer.GENERATED_ORDER, mappings;
    switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var sourceRoot = this.sourceRoot;
    mappings.map(function(mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      return source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL), { source, generatedLine: mapping.generatedLine, generatedColumn: mapping.generatedColumn, originalLine: mapping.originalLine, originalColumn: mapping.originalColumn, name: mapping.name === null ? null : this._names.at(mapping.name) };
    }, this).forEach(aCallback, context);
  };
  SourceMapConsumer.prototype.allGeneratedPositionsFor = function(aArgs) {
    var line = util.getArg(aArgs, "line"), needle = { source: util.getArg(aArgs, "source"), originalLine: line, originalColumn: util.getArg(aArgs, "column", 0) };
    if (needle.source = this._findSourceIndex(needle.source), needle.source < 0) return [];
    var mappings = [], index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (aArgs.column === void 0) for (var originalLine = mapping.originalLine; mapping && mapping.originalLine === originalLine; ) mappings.push({ line: util.getArg(mapping, "generatedLine", null), column: util.getArg(mapping, "generatedColumn", null), lastColumn: util.getArg(mapping, "lastGeneratedColumn", null) }), mapping = this._originalMappings[++index];
      else for (var originalColumn = mapping.originalColumn; mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn; ) mappings.push({ line: util.getArg(mapping, "generatedLine", null), column: util.getArg(mapping, "generatedColumn", null), lastColumn: util.getArg(mapping, "lastGeneratedColumn", null) }), mapping = this._originalMappings[++index];
    }
    return mappings;
  };
  exports.SourceMapConsumer = SourceMapConsumer;
  function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    typeof aSourceMap == "string" && (sourceMap = util.parseSourceMapInput(aSourceMap));
    var version2 = util.getArg(sourceMap, "version"), sources = util.getArg(sourceMap, "sources"), names = util.getArg(sourceMap, "names", []), sourceRoot = util.getArg(sourceMap, "sourceRoot", null), sourcesContent = util.getArg(sourceMap, "sourcesContent", null), mappings = util.getArg(sourceMap, "mappings"), file = util.getArg(sourceMap, "file", null);
    if (version2 != this._version) throw new Error("Unsupported version: " + version2);
    sourceRoot && (sourceRoot = util.normalize(sourceRoot)), sources = sources.map(String).map(util.normalize).map(function(source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
    }), this._names = ArraySet.fromArray(names.map(String), true), this._sources = ArraySet.fromArray(sources, true), this._absoluteSources = this._sources.toArray().map(function(s) {
      return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
    }), this.sourceRoot = sourceRoot, this.sourcesContent = sourcesContent, this._mappings = mappings, this._sourceMapURL = aSourceMapURL, this.file = file;
  }
  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
  BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    var relativeSource = aSource;
    if (this.sourceRoot != null && (relativeSource = util.relative(this.sourceRoot, relativeSource)), this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
    var i;
    for (i = 0; i < this._absoluteSources.length; ++i) if (this._absoluteSources[i] == aSource) return i;
    return -1;
  };
  BasicSourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype), names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true), sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot, smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot), smc.file = aSourceMap._file, smc._sourceMapURL = aSourceMapURL, smc._absoluteSources = smc._sources.toArray().map(function(s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });
    for (var generatedMappings = aSourceMap._mappings.toArray().slice(), destGeneratedMappings = smc.__generatedMappings = [], destOriginalMappings = smc.__originalMappings = [], i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i], destMapping = new Mapping();
      destMapping.generatedLine = srcMapping.generatedLine, destMapping.generatedColumn = srcMapping.generatedColumn, srcMapping.source && (destMapping.source = sources.indexOf(srcMapping.source), destMapping.originalLine = srcMapping.originalLine, destMapping.originalColumn = srcMapping.originalColumn, srcMapping.name && (destMapping.name = names.indexOf(srcMapping.name)), destOriginalMappings.push(destMapping)), destGeneratedMappings.push(destMapping);
    }
    return quickSort(smc.__originalMappings, util.compareByOriginalPositions), smc;
  };
  BasicSourceMapConsumer.prototype._version = 3;
  Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", { get: function() {
    return this._absoluteSources.slice();
  } });
  function Mapping() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
  }
  BasicSourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    for (var generatedLine = 1, previousGeneratedColumn = 0, previousOriginalLine = 0, previousOriginalColumn = 0, previousSource = 0, previousName = 0, length = aStr.length, index = 0, cachedSegments = {}, temp = {}, originalMappings = [], generatedMappings = [], mapping, str, segment, end, value; index < length; ) if (aStr.charAt(index) === ";") generatedLine++, index++, previousGeneratedColumn = 0;
    else if (aStr.charAt(index) === ",") index++;
    else {
      for (mapping = new Mapping(), mapping.generatedLine = generatedLine, end = index; end < length && !this._charIsMappingSeparator(aStr, end); end++) ;
      if (str = aStr.slice(index, end), segment = cachedSegments[str], segment) index += str.length;
      else {
        for (segment = []; index < end; ) base64VLQ.decode(aStr, index, temp), value = temp.value, index = temp.rest, segment.push(value);
        if (segment.length === 2) throw new Error("Found a source, but no line and column");
        if (segment.length === 3) throw new Error("Found a source and line, but no column");
        cachedSegments[str] = segment;
      }
      mapping.generatedColumn = previousGeneratedColumn + segment[0], previousGeneratedColumn = mapping.generatedColumn, segment.length > 1 && (mapping.source = previousSource + segment[1], previousSource += segment[1], mapping.originalLine = previousOriginalLine + segment[2], previousOriginalLine = mapping.originalLine, mapping.originalLine += 1, mapping.originalColumn = previousOriginalColumn + segment[3], previousOriginalColumn = mapping.originalColumn, segment.length > 4 && (mapping.name = previousName + segment[4], previousName += segment[4])), generatedMappings.push(mapping), typeof mapping.originalLine == "number" && originalMappings.push(mapping);
    }
    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated), this.__generatedMappings = generatedMappings, quickSort(originalMappings, util.compareByOriginalPositions), this.__originalMappings = originalMappings;
  };
  BasicSourceMapConsumer.prototype._findMapping = function(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
    if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
    if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };
  BasicSourceMapConsumer.prototype.computeColumnSpans = function() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];
        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }
      mapping.lastGeneratedColumn = 1 / 0;
    }
  };
  BasicSourceMapConsumer.prototype.originalPositionFor = function(aArgs) {
    var needle = { generatedLine: util.getArg(aArgs, "line"), generatedColumn: util.getArg(aArgs, "column") }, index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._generatedMappings[index];
      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, "source", null);
        source !== null && (source = this._sources.at(source), source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL));
        var name = util.getArg(mapping, "name", null);
        return name !== null && (name = this._names.at(name)), { source, line: util.getArg(mapping, "originalLine", null), column: util.getArg(mapping, "originalColumn", null), name };
      }
    }
    return { source: null, line: null, column: null, name: null };
  };
  BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function() {
    return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
      return sc == null;
    }) : false;
  };
  BasicSourceMapConsumer.prototype.sourceContentFor = function(aSource, nullOnMissing) {
    if (!this.sourcesContent) return null;
    var index = this._findSourceIndex(aSource);
    if (index >= 0) return this.sourcesContent[index];
    var relativeSource = aSource;
    this.sourceRoot != null && (relativeSource = util.relative(this.sourceRoot, relativeSource));
    var url;
    if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
      if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
    }
    if (nullOnMissing) return null;
    throw new Error('"' + relativeSource + '" is not in the SourceMap.');
  };
  BasicSourceMapConsumer.prototype.generatedPositionFor = function(aArgs) {
    var source = util.getArg(aArgs, "source");
    if (source = this._findSourceIndex(source), source < 0) return { line: null, column: null, lastColumn: null };
    var needle = { source, originalLine: util.getArg(aArgs, "line"), originalColumn: util.getArg(aArgs, "column") }, index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (mapping.source === needle.source) return { line: util.getArg(mapping, "generatedLine", null), column: util.getArg(mapping, "generatedColumn", null), lastColumn: util.getArg(mapping, "lastGeneratedColumn", null) };
    }
    return { line: null, column: null, lastColumn: null };
  };
  exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
  function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    typeof aSourceMap == "string" && (sourceMap = util.parseSourceMapInput(aSourceMap));
    var version2 = util.getArg(sourceMap, "version"), sections = util.getArg(sourceMap, "sections");
    if (version2 != this._version) throw new Error("Unsupported version: " + version2);
    this._sources = new ArraySet(), this._names = new ArraySet();
    var lastOffset = { line: -1, column: 0 };
    this._sections = sections.map(function(s) {
      if (s.url) throw new Error("Support for url field in sections not implemented.");
      var offset2 = util.getArg(s, "offset"), offsetLine = util.getArg(offset2, "line"), offsetColumn = util.getArg(offset2, "column");
      if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
      return lastOffset = offset2, { generatedOffset: { generatedLine: offsetLine + 1, generatedColumn: offsetColumn + 1 }, consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL) };
    });
  }
  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
  IndexedSourceMapConsumer.prototype._version = 3;
  Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", { get: function() {
    for (var sources = [], i = 0; i < this._sections.length; i++) for (var j = 0; j < this._sections[i].consumer.sources.length; j++) sources.push(this._sections[i].consumer.sources[j]);
    return sources;
  } });
  IndexedSourceMapConsumer.prototype.originalPositionFor = function(aArgs) {
    var needle = { generatedLine: util.getArg(aArgs, "line"), generatedColumn: util.getArg(aArgs, "column") }, sectionIndex = binarySearch.search(needle, this._sections, function(needle2, section2) {
      var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
      return cmp || needle2.generatedColumn - section2.generatedOffset.generatedColumn;
    }), section = this._sections[sectionIndex];
    return section ? section.consumer.originalPositionFor({ line: needle.generatedLine - (section.generatedOffset.generatedLine - 1), column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0), bias: aArgs.bias }) : { source: null, line: null, column: null, name: null };
  };
  IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function() {
    return this._sections.every(function(s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };
  IndexedSourceMapConsumer.prototype.sourceContentFor = function(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i], content = section.consumer.sourceContentFor(aSource, true);
      if (content) return content;
    }
    if (nullOnMissing) return null;
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  };
  IndexedSourceMapConsumer.prototype.generatedPositionFor = function(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) !== -1) {
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = { line: generatedPosition.line + (section.generatedOffset.generatedLine - 1), column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0) };
          return ret;
        }
      }
    }
    return { line: null, column: null };
  };
  IndexedSourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) for (var section = this._sections[i], sectionMappings = section.consumer._generatedMappings, j = 0; j < sectionMappings.length; j++) {
      var mapping = sectionMappings[j], source = section.consumer._sources.at(mapping.source);
      source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL), this._sources.add(source), source = this._sources.indexOf(source);
      var name = null;
      mapping.name && (name = section.consumer._names.at(mapping.name), this._names.add(name), name = this._names.indexOf(name));
      var adjustedMapping = { source, generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1), generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0), originalLine: mapping.originalLine, originalColumn: mapping.originalColumn, name };
      this.__generatedMappings.push(adjustedMapping), typeof adjustedMapping.originalLine == "number" && this.__originalMappings.push(adjustedMapping);
    }
    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated), quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };
  exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
} });
var require_source_node = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/lib/source-node.js"(exports) {
  var SourceMapGenerator = require_source_map_generator().SourceMapGenerator, util = require_util(), REGEX_NEWLINE = /(\r?\n)/, NEWLINE_CODE = 10, isSourceNode = "$$$isSourceNode$$$";
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [], this.sourceContents = {}, this.line = aLine ?? null, this.column = aColumn ?? null, this.source = aSource ?? null, this.name = aName ?? null, this[isSourceNode] = true, aChunks != null && this.add(aChunks);
  }
  SourceNode.fromStringWithSourceMap = function(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    var node = new SourceNode(), remainingLines = aGeneratedCode.split(REGEX_NEWLINE), remainingLinesIndex = 0, shiftNextLine = function() {
      var lineContents = getNextLine(), newLine = getNextLine() || "";
      return lineContents + newLine;
      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
      }
    }, lastGeneratedLine = 1, lastGeneratedColumn = 0, lastMapping = null;
    return aSourceMapConsumer.eachMapping(function(mapping) {
      if (lastMapping !== null) if (lastGeneratedLine < mapping.generatedLine) addMappingWithCode(lastMapping, shiftNextLine()), lastGeneratedLine++, lastGeneratedColumn = 0;
      else {
        var nextLine = remainingLines[remainingLinesIndex] || "", code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn), lastGeneratedColumn = mapping.generatedColumn, addMappingWithCode(lastMapping, code), lastMapping = mapping;
        return;
      }
      for (; lastGeneratedLine < mapping.generatedLine; ) node.add(shiftNextLine()), lastGeneratedLine++;
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || "";
        node.add(nextLine.substr(0, mapping.generatedColumn)), remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn), lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this), remainingLinesIndex < remainingLines.length && (lastMapping && addMappingWithCode(lastMapping, shiftNextLine()), node.add(remainingLines.splice(remainingLinesIndex).join(""))), aSourceMapConsumer.sources.forEach(function(sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      content != null && (aRelativePath != null && (sourceFile = util.join(aRelativePath, sourceFile)), node.setSourceContent(sourceFile, content));
    }), node;
    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === void 0) node.add(code);
      else {
        var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
        node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
      }
    }
  };
  SourceNode.prototype.add = function(aChunk) {
    if (Array.isArray(aChunk)) aChunk.forEach(function(chunk) {
      this.add(chunk);
    }, this);
    else if (aChunk[isSourceNode] || typeof aChunk == "string") aChunk && this.children.push(aChunk);
    else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    return this;
  };
  SourceNode.prototype.prepend = function(aChunk) {
    if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]);
    else if (aChunk[isSourceNode] || typeof aChunk == "string") this.children.unshift(aChunk);
    else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
    return this;
  };
  SourceNode.prototype.walk = function(aFn) {
    for (var chunk, i = 0, len = this.children.length; i < len; i++) chunk = this.children[i], chunk[isSourceNode] ? chunk.walk(aFn) : chunk !== "" && aFn(chunk, { source: this.source, line: this.line, column: this.column, name: this.name });
  };
  SourceNode.prototype.join = function(aSep) {
    var newChildren, i, len = this.children.length;
    if (len > 0) {
      for (newChildren = [], i = 0; i < len - 1; i++) newChildren.push(this.children[i]), newChildren.push(aSep);
      newChildren.push(this.children[i]), this.children = newChildren;
    }
    return this;
  };
  SourceNode.prototype.replaceRight = function(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    return lastChild[isSourceNode] ? lastChild.replaceRight(aPattern, aReplacement) : typeof lastChild == "string" ? this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement) : this.children.push("".replace(aPattern, aReplacement)), this;
  };
  SourceNode.prototype.setSourceContent = function(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };
  SourceNode.prototype.walkSourceContents = function(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) this.children[i][isSourceNode] && this.children[i].walkSourceContents(aFn);
    for (var sources = Object.keys(this.sourceContents), i = 0, len = sources.length; i < len; i++) aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
  };
  SourceNode.prototype.toString = function() {
    var str = "";
    return this.walk(function(chunk) {
      str += chunk;
    }), str;
  };
  SourceNode.prototype.toStringWithSourceMap = function(aArgs) {
    var generated = { code: "", line: 1, column: 0 }, map = new SourceMapGenerator(aArgs), sourceMappingActive = false, lastOriginalSource = null, lastOriginalLine = null, lastOriginalColumn = null, lastOriginalName = null;
    return this.walk(function(chunk, original) {
      generated.code += chunk, original.source !== null && original.line !== null && original.column !== null ? ((lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) && map.addMapping({ source: original.source, original: { line: original.line, column: original.column }, generated: { line: generated.line, column: generated.column }, name: original.name }), lastOriginalSource = original.source, lastOriginalLine = original.line, lastOriginalColumn = original.column, lastOriginalName = original.name, sourceMappingActive = true) : sourceMappingActive && (map.addMapping({ generated: { line: generated.line, column: generated.column } }), lastOriginalSource = null, sourceMappingActive = false);
      for (var idx = 0, length = chunk.length; idx < length; idx++) chunk.charCodeAt(idx) === NEWLINE_CODE ? (generated.line++, generated.column = 0, idx + 1 === length ? (lastOriginalSource = null, sourceMappingActive = false) : sourceMappingActive && map.addMapping({ source: original.source, original: { line: original.line, column: original.column }, generated: { line: generated.line, column: generated.column }, name: original.name })) : generated.column++;
    }), this.walkSourceContents(function(sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    }), { code: generated.code, map };
  };
  exports.SourceNode = SourceNode;
} });
var require_source_map = __commonJS({ "../../node_modules/escodegen/node_modules/source-map/source-map.js"(exports) {
  exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
  exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
  exports.SourceNode = require_source_node().SourceNode;
} });
var require_package = __commonJS({ "../../node_modules/escodegen/package.json"(exports, module) {
  module.exports = { name: "escodegen", description: "ECMAScript code generator", homepage: "http://github.com/estools/escodegen", main: "escodegen.js", bin: { esgenerate: "./bin/esgenerate.js", escodegen: "./bin/escodegen.js" }, files: ["LICENSE.BSD", "README.md", "bin", "escodegen.js", "package.json"], version: "2.1.0", engines: { node: ">=6.0" }, maintainers: [{ name: "Yusuke Suzuki", email: "utatane.tea@gmail.com", web: "http://github.com/Constellation" }], repository: { type: "git", url: "http://github.com/estools/escodegen.git" }, dependencies: { estraverse: "^5.2.0", esutils: "^2.0.2", esprima: "^4.0.1" }, optionalDependencies: { "source-map": "~0.6.1" }, devDependencies: { acorn: "^8.0.4", bluebird: "^3.4.7", "bower-registry-client": "^1.0.0", chai: "^4.2.0", "chai-exclude": "^2.0.2", "commonjs-everywhere": "^0.9.7", gulp: "^4.0.2", "gulp-eslint": "^6.0.0", "gulp-mocha": "^7.0.2", minimist: "^1.2.5", optionator: "^0.9.1", semver: "^7.3.4" }, license: "BSD-2-Clause", scripts: { test: "gulp travis", "unit-test": "gulp test", lint: "gulp lint", release: "node tools/release.js", "build-min": "./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js", build: "./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js" } };
} });
var require_escodegen = __commonJS({ "../../node_modules/escodegen/escodegen.js"(exports) {
  (function() {
    var Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, base2, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse5, sourceMap, sourceCode, preserveBlankLines, FORMAT_MINIFY, FORMAT_DEFAULTS;
    estraverse = require_estraverse(), esutils = require_utils(), Syntax = estraverse.Syntax;
    function isExpression(node) {
      return CodeGenerator.Expression.hasOwnProperty(node.type);
    }
    function isStatement(node) {
      return CodeGenerator.Statement.hasOwnProperty(node.type);
    }
    Precedence = { Sequence: 0, Yield: 1, Assignment: 1, Conditional: 2, ArrowFunction: 2, Coalesce: 3, LogicalOR: 4, LogicalAND: 5, BitwiseOR: 6, BitwiseXOR: 7, BitwiseAND: 8, Equality: 9, Relational: 10, BitwiseSHIFT: 11, Additive: 12, Multiplicative: 13, Exponentiation: 14, Await: 15, Unary: 15, Postfix: 16, OptionalChaining: 17, Call: 18, New: 19, TaggedTemplate: 20, Member: 21, Primary: 22 }, BinaryPrecedence = { "??": Precedence.Coalesce, "||": Precedence.LogicalOR, "&&": Precedence.LogicalAND, "|": Precedence.BitwiseOR, "^": Precedence.BitwiseXOR, "&": Precedence.BitwiseAND, "==": Precedence.Equality, "!=": Precedence.Equality, "===": Precedence.Equality, "!==": Precedence.Equality, is: Precedence.Equality, isnt: Precedence.Equality, "<": Precedence.Relational, ">": Precedence.Relational, "<=": Precedence.Relational, ">=": Precedence.Relational, in: Precedence.Relational, instanceof: Precedence.Relational, "<<": Precedence.BitwiseSHIFT, ">>": Precedence.BitwiseSHIFT, ">>>": Precedence.BitwiseSHIFT, "+": Precedence.Additive, "-": Precedence.Additive, "*": Precedence.Multiplicative, "%": Precedence.Multiplicative, "/": Precedence.Multiplicative, "**": Precedence.Exponentiation };
    var F_ALLOW_IN = 1, F_ALLOW_CALL = 2, F_ALLOW_UNPARATH_NEW = 4, F_FUNC_BODY = 8, F_DIRECTIVE_CTX = 16, F_SEMICOLON_OPT = 32, F_FOUND_COALESCE = 64, E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TTF = F_ALLOW_IN | F_ALLOW_CALL, E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TFF = F_ALLOW_IN, E_FFT = F_ALLOW_UNPARATH_NEW, E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW, S_TFFF = F_ALLOW_IN, S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT, S_FFFF = 0, S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX, S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
    function getDefaultOptions() {
      return { indent: null, base: null, parse: null, comment: false, format: { indent: { style: "    ", base: 0, adjustMultilineComment: false }, newline: `
`, space: " ", json: false, renumber: false, hexadecimal: false, quotes: "single", escapeless: false, compact: false, parentheses: true, semicolons: true, safeConcatenation: false, preserveBlankLines: false }, moz: { comprehensionExpressionStartsWithAssignment: false, starlessGenerator: false }, sourceMap: null, sourceMapRoot: null, sourceMapWithCode: false, directive: false, raw: true, verbatim: null, sourceCode: null };
    }
    function stringRepeat(str, num) {
      var result = "";
      for (num |= 0; num > 0; num >>>= 1, str += str) num & 1 && (result += str);
      return result;
    }
    function hasLineTerminator(str) {
      return /[\r\n]/g.test(str);
    }
    function endsWithLineTerminator(str) {
      var len = str.length;
      return len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
    }
    function merge(target, override) {
      var key;
      for (key in override) override.hasOwnProperty(key) && (target[key] = override[key]);
      return target;
    }
    function updateDeeply(target, override) {
      var key, val;
      function isHashObject(target2) {
        return typeof target2 == "object" && target2 instanceof Object && !(target2 instanceof RegExp);
      }
      for (key in override) override.hasOwnProperty(key) && (val = override[key], isHashObject(val) ? isHashObject(target[key]) ? updateDeeply(target[key], val) : target[key] = updateDeeply({}, val) : target[key] = val);
      return target;
    }
    function generateNumber(value) {
      var result, point, temp, exponent, pos;
      if (value !== value) throw new Error("Numeric literal whose value is NaN");
      if (value < 0 || value === 0 && 1 / value < 0) throw new Error("Numeric literal whose value is negative");
      if (value === 1 / 0) return json ? "null" : renumber ? "1e400" : "1e+400";
      if (result = "" + value, !renumber || result.length < 3) return result;
      for (point = result.indexOf("."), !json && result.charCodeAt(0) === 48 && point === 1 && (point = 0, result = result.slice(1)), temp = result, result = result.replace("e+", "e"), exponent = 0, (pos = temp.indexOf("e")) > 0 && (exponent = +temp.slice(pos + 1), temp = temp.slice(0, pos)), point >= 0 && (exponent -= temp.length - point - 1, temp = +(temp.slice(0, point) + temp.slice(point + 1)) + ""), pos = 0; temp.charCodeAt(temp.length + pos - 1) === 48; ) --pos;
      return pos !== 0 && (exponent -= pos, temp = temp.slice(0, pos)), exponent !== 0 && (temp += "e" + exponent), (temp.length < result.length || hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = "0x" + value.toString(16)).length < result.length) && +temp === value && (result = temp), result;
    }
    function escapeRegExpCharacter(ch, previousIsBackslash) {
      return (ch & -2) === 8232 ? (previousIsBackslash ? "u" : "\\u") + (ch === 8232 ? "2028" : "2029") : ch === 10 || ch === 13 ? (previousIsBackslash ? "" : "\\") + (ch === 10 ? "n" : "r") : String.fromCharCode(ch);
    }
    function generateRegExp(reg) {
      var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;
      if (result = reg.toString(), reg.source) {
        if (match = result.match(/\/([^/]*)$/), !match) return result;
        for (flags = match[1], result = "", characterInBrack = false, previousIsBackslash = false, i = 0, iz = reg.source.length; i < iz; ++i) ch = reg.source.charCodeAt(i), previousIsBackslash ? (result += escapeRegExpCharacter(ch, previousIsBackslash), previousIsBackslash = false) : (characterInBrack ? ch === 93 && (characterInBrack = false) : ch === 47 ? result += "\\" : ch === 91 && (characterInBrack = true), result += escapeRegExpCharacter(ch, previousIsBackslash), previousIsBackslash = ch === 92);
        return "/" + result + "/" + flags;
      }
      return result;
    }
    function escapeAllowedCharacter(code, next) {
      var hex;
      return code === 8 ? "\\b" : code === 12 ? "\\f" : code === 9 ? "\\t" : (hex = code.toString(16).toUpperCase(), json || code > 255 ? "\\u" + "0000".slice(hex.length) + hex : code === 0 && !esutils.code.isDecimalDigit(next) ? "\\0" : code === 11 ? "\\x0B" : "\\x" + "00".slice(hex.length) + hex);
    }
    function escapeDisallowedCharacter(code) {
      if (code === 92) return "\\\\";
      if (code === 10) return "\\n";
      if (code === 13) return "\\r";
      if (code === 8232) return "\\u2028";
      if (code === 8233) return "\\u2029";
      throw new Error("Incorrectly classified character");
    }
    function escapeDirective(str) {
      var i, iz, code, quote;
      for (quote = quotes === "double" ? '"' : "'", i = 0, iz = str.length; i < iz; ++i) if (code = str.charCodeAt(i), code === 39) {
        quote = '"';
        break;
      } else if (code === 34) {
        quote = "'";
        break;
      } else code === 92 && ++i;
      return quote + str + quote;
    }
    function escapeString(str) {
      var result = "", i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
      for (i = 0, len = str.length; i < len; ++i) {
        if (code = str.charCodeAt(i), code === 39) ++singleQuotes;
        else if (code === 34) ++doubleQuotes;
        else if (code === 47 && json) result += "\\";
        else if (esutils.code.isLineTerminator(code) || code === 92) {
          result += escapeDisallowedCharacter(code);
          continue;
        } else if (!esutils.code.isIdentifierPartES5(code) && (json && code < 32 || !json && !escapeless && (code < 32 || code > 126))) {
          result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
          continue;
        }
        result += String.fromCharCode(code);
      }
      if (single = !(quotes === "double" || quotes === "auto" && doubleQuotes < singleQuotes), quote = single ? "'" : '"', !(single ? singleQuotes : doubleQuotes)) return quote + result + quote;
      for (str = result, result = quote, i = 0, len = str.length; i < len; ++i) code = str.charCodeAt(i), (code === 39 && single || code === 34 && !single) && (result += "\\"), result += String.fromCharCode(code);
      return result + quote;
    }
    function flattenToString(arr) {
      var i, iz, elem, result = "";
      for (i = 0, iz = arr.length; i < iz; ++i) elem = arr[i], result += Array.isArray(elem) ? flattenToString(elem) : elem;
      return result;
    }
    function toSourceNodeWhenNeeded(generated, node) {
      if (!sourceMap) return Array.isArray(generated) ? flattenToString(generated) : generated;
      if (node == null) {
        if (generated instanceof SourceNode) return generated;
        node = {};
      }
      return node.loc == null ? new SourceNode(null, null, sourceMap, generated, node.name || null) : new SourceNode(node.loc.start.line, node.loc.start.column, sourceMap === true ? node.loc.source || null : sourceMap, generated, node.name || null);
    }
    function noEmptySpace() {
      return space || " ";
    }
    function join(left, right) {
      var leftSource, rightSource, leftCharCode, rightCharCode;
      return leftSource = toSourceNodeWhenNeeded(left).toString(), leftSource.length === 0 ? [right] : (rightSource = toSourceNodeWhenNeeded(right).toString(), rightSource.length === 0 ? [left] : (leftCharCode = leftSource.charCodeAt(leftSource.length - 1), rightCharCode = rightSource.charCodeAt(0), (leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode) || leftCharCode === 47 && rightCharCode === 105 ? [left, noEmptySpace(), right] : esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) || esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode) ? [left, right] : [left, space, right]));
    }
    function addIndent(stmt) {
      return [base2, stmt];
    }
    function withIndent(fn) {
      var previousBase;
      previousBase = base2, base2 += indent, fn(base2), base2 = previousBase;
    }
    function calculateSpaces(str) {
      var i;
      for (i = str.length - 1; i >= 0 && !esutils.code.isLineTerminator(str.charCodeAt(i)); --i) ;
      return str.length - 1 - i;
    }
    function adjustMultilineComment(value, specialBase) {
      var array, i, len, line, j, spaces, previousBase, sn;
      for (array = value.split(/\r\n|[\r\n]/), spaces = Number.MAX_VALUE, i = 1, len = array.length; i < len; ++i) {
        for (line = array[i], j = 0; j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j)); ) ++j;
        spaces > j && (spaces = j);
      }
      for (typeof specialBase < "u" ? (previousBase = base2, array[1][spaces] === "*" && (specialBase += " "), base2 = specialBase) : (spaces & 1 && --spaces, previousBase = base2), i = 1, len = array.length; i < len; ++i) sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces))), array[i] = sourceMap ? sn.join("") : sn;
      return base2 = previousBase, array.join(`
`);
    }
    function generateComment(comment, specialBase) {
      if (comment.type === "Line") {
        if (endsWithLineTerminator(comment.value)) return "//" + comment.value;
        var result = "//" + comment.value;
        return preserveBlankLines || (result += `
`), result;
      }
      return extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value) ? adjustMultilineComment("/*" + comment.value + "*/", specialBase) : "/*" + comment.value + "*/";
    }
    function addComments(stmt, result) {
      var i, len, comment, save, tailingToStatement, specialBase, fragment, extRange, range, prevRange, prefix, infix, suffix, count;
      if (stmt.leadingComments && stmt.leadingComments.length > 0) {
        if (save = result, preserveBlankLines) {
          for (comment = stmt.leadingComments[0], result = [], extRange = comment.extendedRange, range = comment.range, prefix = sourceCode.substring(extRange[0], range[0]), count = (prefix.match(/\n/g) || []).length, count > 0 ? (result.push(stringRepeat(`
`, count)), result.push(addIndent(generateComment(comment)))) : (result.push(prefix), result.push(generateComment(comment))), prevRange = range, i = 1, len = stmt.leadingComments.length; i < len; i++) comment = stmt.leadingComments[i], range = comment.range, infix = sourceCode.substring(prevRange[1], range[0]), count = (infix.match(/\n/g) || []).length, result.push(stringRepeat(`
`, count)), result.push(addIndent(generateComment(comment))), prevRange = range;
          suffix = sourceCode.substring(range[1], extRange[1]), count = (suffix.match(/\n/g) || []).length, result.push(stringRepeat(`
`, count));
        } else for (comment = stmt.leadingComments[0], result = [], safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0 && result.push(`
`), result.push(generateComment(comment)), endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) || result.push(`
`), i = 1, len = stmt.leadingComments.length; i < len; ++i) comment = stmt.leadingComments[i], fragment = [generateComment(comment)], endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString()) || fragment.push(`
`), result.push(addIndent(fragment));
        result.push(addIndent(save));
      }
      if (stmt.trailingComments) if (preserveBlankLines) comment = stmt.trailingComments[0], extRange = comment.extendedRange, range = comment.range, prefix = sourceCode.substring(extRange[0], range[0]), count = (prefix.match(/\n/g) || []).length, count > 0 ? (result.push(stringRepeat(`
`, count)), result.push(addIndent(generateComment(comment)))) : (result.push(prefix), result.push(generateComment(comment)));
      else for (tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()), specialBase = stringRepeat(" ", calculateSpaces(toSourceNodeWhenNeeded([base2, result, indent]).toString())), i = 0, len = stmt.trailingComments.length; i < len; ++i) comment = stmt.trailingComments[i], tailingToStatement ? (i === 0 ? result = [result, indent] : result = [result, specialBase], result.push(generateComment(comment, specialBase))) : result = [result, addIndent(generateComment(comment))], i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) && (result = [result, `
`]);
      return result;
    }
    function generateBlankLines(start, end, result) {
      var j, newlineCount = 0;
      for (j = start; j < end; j++) sourceCode[j] === `
` && newlineCount++;
      for (j = 1; j < newlineCount; j++) result.push(newline);
    }
    function parenthesize(text, current2, should) {
      return current2 < should ? ["(", text, ")"] : text;
    }
    function generateVerbatimString(string) {
      var i, iz, result;
      for (result = string.split(/\r\n|\n/), i = 1, iz = result.length; i < iz; i++) result[i] = newline + base2 + result[i];
      return result;
    }
    function generateVerbatim(expr, precedence) {
      var verbatim, result, prec;
      return verbatim = expr[extra.verbatim], typeof verbatim == "string" ? result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, precedence) : (result = generateVerbatimString(verbatim.content), prec = verbatim.precedence != null ? verbatim.precedence : Precedence.Sequence, result = parenthesize(result, prec, precedence)), toSourceNodeWhenNeeded(result, expr);
    }
    function CodeGenerator() {
    }
    CodeGenerator.prototype.maybeBlock = function(stmt, flags) {
      var result, noLeadingComment, that = this;
      return noLeadingComment = !extra.comment || !stmt.leadingComments, stmt.type === Syntax.BlockStatement && noLeadingComment ? [space, this.generateStatement(stmt, flags)] : stmt.type === Syntax.EmptyStatement && noLeadingComment ? ";" : (withIndent(function() {
        result = [newline, addIndent(that.generateStatement(stmt, flags))];
      }), result);
    }, CodeGenerator.prototype.maybeBlockSuffix = function(stmt, result) {
      var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
      return stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends ? [result, space] : ends ? [result, base2] : [result, newline, base2];
    };
    function generateIdentifier(node) {
      return toSourceNodeWhenNeeded(node.name, node);
    }
    function generateAsyncPrefix(node, spaceRequired) {
      return node.async ? "async" + (spaceRequired ? noEmptySpace() : space) : "";
    }
    function generateStarSuffix(node) {
      var isGenerator = node.generator && !extra.moz.starlessGenerator;
      return isGenerator ? "*" + space : "";
    }
    function generateMethodPrefix(prop) {
      var func = prop.value, prefix = "";
      return func.async && (prefix += generateAsyncPrefix(func, !prop.computed)), func.generator && (prefix += generateStarSuffix(func) ? "*" : ""), prefix;
    }
    CodeGenerator.prototype.generatePattern = function(node, precedence, flags) {
      return node.type === Syntax.Identifier ? generateIdentifier(node) : this.generateExpression(node, precedence, flags);
    }, CodeGenerator.prototype.generateFunctionParams = function(node) {
      var i, iz, result, hasDefault;
      if (hasDefault = false, node.type === Syntax.ArrowFunctionExpression && !node.rest && (!node.defaults || node.defaults.length === 0) && node.params.length === 1 && node.params[0].type === Syntax.Identifier) result = [generateAsyncPrefix(node, true), generateIdentifier(node.params[0])];
      else {
        for (result = node.type === Syntax.ArrowFunctionExpression ? [generateAsyncPrefix(node, false)] : [], result.push("("), node.defaults && (hasDefault = true), i = 0, iz = node.params.length; i < iz; ++i) hasDefault && node.defaults[i] ? result.push(this.generateAssignment(node.params[i], node.defaults[i], "=", Precedence.Assignment, E_TTT)) : result.push(this.generatePattern(node.params[i], Precedence.Assignment, E_TTT)), i + 1 < iz && result.push("," + space);
        node.rest && (node.params.length && result.push("," + space), result.push("..."), result.push(generateIdentifier(node.rest))), result.push(")");
      }
      return result;
    }, CodeGenerator.prototype.generateFunctionBody = function(node) {
      var result, expr;
      return result = this.generateFunctionParams(node), node.type === Syntax.ArrowFunctionExpression && (result.push(space), result.push("=>")), node.expression ? (result.push(space), expr = this.generateExpression(node.body, Precedence.Assignment, E_TTT), expr.toString().charAt(0) === "{" && (expr = ["(", expr, ")"]), result.push(expr)) : result.push(this.maybeBlock(node.body, S_TTFF)), result;
    }, CodeGenerator.prototype.generateIterationForStatement = function(operator, stmt, flags) {
      var result = ["for" + (stmt.await ? noEmptySpace() + "await" : "") + space + "("], that = this;
      return withIndent(function() {
        stmt.left.type === Syntax.VariableDeclaration ? withIndent(function() {
          result.push(stmt.left.kind + noEmptySpace()), result.push(that.generateStatement(stmt.left.declarations[0], S_FFFF));
        }) : result.push(that.generateExpression(stmt.left, Precedence.Call, E_TTT)), result = join(result, operator), result = [join(result, that.generateExpression(stmt.right, Precedence.Assignment, E_TTT)), ")"];
      }), result.push(this.maybeBlock(stmt.body, flags)), result;
    }, CodeGenerator.prototype.generatePropertyKey = function(expr, computed) {
      var result = [];
      return computed && result.push("["), result.push(this.generateExpression(expr, Precedence.Assignment, E_TTT)), computed && result.push("]"), result;
    }, CodeGenerator.prototype.generateAssignment = function(left, right, operator, precedence, flags) {
      return Precedence.Assignment < precedence && (flags |= F_ALLOW_IN), parenthesize([this.generateExpression(left, Precedence.Call, flags), space + operator + space, this.generateExpression(right, Precedence.Assignment, flags)], Precedence.Assignment, precedence);
    }, CodeGenerator.prototype.semicolon = function(flags) {
      return !semicolons && flags & F_SEMICOLON_OPT ? "" : ";";
    }, CodeGenerator.Statement = { BlockStatement: function(stmt, flags) {
      var range, content, result = ["{", newline], that = this;
      return withIndent(function() {
        stmt.body.length === 0 && preserveBlankLines && (range = stmt.range, range[1] - range[0] > 2 && (content = sourceCode.substring(range[0] + 1, range[1] - 1), content[0] === `
` && (result = ["{"]), result.push(content)));
        var i, iz, fragment, bodyFlags;
        for (bodyFlags = S_TFFF, flags & F_FUNC_BODY && (bodyFlags |= F_DIRECTIVE_CTX), i = 0, iz = stmt.body.length; i < iz; ++i) preserveBlankLines && (i === 0 && (stmt.body[0].leadingComments && (range = stmt.body[0].leadingComments[0].extendedRange, content = sourceCode.substring(range[0], range[1]), content[0] === `
` && (result = ["{"])), stmt.body[0].leadingComments || generateBlankLines(stmt.range[0], stmt.body[0].range[0], result)), i > 0 && !stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments && generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result)), i === iz - 1 && (bodyFlags |= F_SEMICOLON_OPT), stmt.body[i].leadingComments && preserveBlankLines ? fragment = that.generateStatement(stmt.body[i], bodyFlags) : fragment = addIndent(that.generateStatement(stmt.body[i], bodyFlags)), result.push(fragment), endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString()) || preserveBlankLines && i < iz - 1 && stmt.body[i + 1].leadingComments || result.push(newline), preserveBlankLines && i === iz - 1 && (stmt.body[i].trailingComments || generateBlankLines(stmt.body[i].range[1], stmt.range[1], result));
      }), result.push(addIndent("}")), result;
    }, BreakStatement: function(stmt, flags) {
      return stmt.label ? "break " + stmt.label.name + this.semicolon(flags) : "break" + this.semicolon(flags);
    }, ContinueStatement: function(stmt, flags) {
      return stmt.label ? "continue " + stmt.label.name + this.semicolon(flags) : "continue" + this.semicolon(flags);
    }, ClassBody: function(stmt, flags) {
      var result = ["{", newline], that = this;
      return withIndent(function(indent2) {
        var i, iz;
        for (i = 0, iz = stmt.body.length; i < iz; ++i) result.push(indent2), result.push(that.generateExpression(stmt.body[i], Precedence.Sequence, E_TTT)), i + 1 < iz && result.push(newline);
      }), endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) || result.push(newline), result.push(base2), result.push("}"), result;
    }, ClassDeclaration: function(stmt, flags) {
      var result, fragment;
      return result = ["class"], stmt.id && (result = join(result, this.generateExpression(stmt.id, Precedence.Sequence, E_TTT))), stmt.superClass && (fragment = join("extends", this.generateExpression(stmt.superClass, Precedence.Unary, E_TTT)), result = join(result, fragment)), result.push(space), result.push(this.generateStatement(stmt.body, S_TFFT)), result;
    }, DirectiveStatement: function(stmt, flags) {
      return extra.raw && stmt.raw ? stmt.raw + this.semicolon(flags) : escapeDirective(stmt.directive) + this.semicolon(flags);
    }, DoWhileStatement: function(stmt, flags) {
      var result = join("do", this.maybeBlock(stmt.body, S_TFFF));
      return result = this.maybeBlockSuffix(stmt.body, result), join(result, ["while" + space + "(", this.generateExpression(stmt.test, Precedence.Sequence, E_TTT), ")" + this.semicolon(flags)]);
    }, CatchClause: function(stmt, flags) {
      var result, that = this;
      return withIndent(function() {
        var guard;
        stmt.param ? (result = ["catch" + space + "(", that.generateExpression(stmt.param, Precedence.Sequence, E_TTT), ")"], stmt.guard && (guard = that.generateExpression(stmt.guard, Precedence.Sequence, E_TTT), result.splice(2, 0, " if ", guard))) : result = ["catch"];
      }), result.push(this.maybeBlock(stmt.body, S_TFFF)), result;
    }, DebuggerStatement: function(stmt, flags) {
      return "debugger" + this.semicolon(flags);
    }, EmptyStatement: function(stmt, flags) {
      return ";";
    }, ExportDefaultDeclaration: function(stmt, flags) {
      var result = ["export"], bodyFlags;
      return bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF, result = join(result, "default"), isStatement(stmt.declaration) ? result = join(result, this.generateStatement(stmt.declaration, bodyFlags)) : result = join(result, this.generateExpression(stmt.declaration, Precedence.Assignment, E_TTT) + this.semicolon(flags)), result;
    }, ExportNamedDeclaration: function(stmt, flags) {
      var result = ["export"], bodyFlags, that = this;
      return bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF, stmt.declaration ? join(result, this.generateStatement(stmt.declaration, bodyFlags)) : (stmt.specifiers && (stmt.specifiers.length === 0 ? result = join(result, "{" + space + "}") : stmt.specifiers[0].type === Syntax.ExportBatchSpecifier ? result = join(result, this.generateExpression(stmt.specifiers[0], Precedence.Sequence, E_TTT)) : (result = join(result, "{"), withIndent(function(indent2) {
        var i, iz;
        for (result.push(newline), i = 0, iz = stmt.specifiers.length; i < iz; ++i) result.push(indent2), result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT)), i + 1 < iz && result.push("," + newline);
      }), endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) || result.push(newline), result.push(base2 + "}")), stmt.source ? result = join(result, ["from" + space, this.generateExpression(stmt.source, Precedence.Sequence, E_TTT), this.semicolon(flags)]) : result.push(this.semicolon(flags))), result);
    }, ExportAllDeclaration: function(stmt, flags) {
      return ["export" + space, "*" + space, "from" + space, this.generateExpression(stmt.source, Precedence.Sequence, E_TTT), this.semicolon(flags)];
    }, ExpressionStatement: function(stmt, flags) {
      var result, fragment;
      function isClassPrefixed(fragment2) {
        var code;
        return fragment2.slice(0, 5) !== "class" ? false : (code = fragment2.charCodeAt(5), code === 123 || esutils.code.isWhiteSpace(code) || esutils.code.isLineTerminator(code));
      }
      function isFunctionPrefixed(fragment2) {
        var code;
        return fragment2.slice(0, 8) !== "function" ? false : (code = fragment2.charCodeAt(8), code === 40 || esutils.code.isWhiteSpace(code) || code === 42 || esutils.code.isLineTerminator(code));
      }
      function isAsyncPrefixed(fragment2) {
        var code, i, iz;
        if (fragment2.slice(0, 5) !== "async" || !esutils.code.isWhiteSpace(fragment2.charCodeAt(5))) return false;
        for (i = 6, iz = fragment2.length; i < iz && esutils.code.isWhiteSpace(fragment2.charCodeAt(i)); ++i) ;
        return i === iz || fragment2.slice(i, i + 8) !== "function" ? false : (code = fragment2.charCodeAt(i + 8), code === 40 || esutils.code.isWhiteSpace(code) || code === 42 || esutils.code.isLineTerminator(code));
      }
      return result = [this.generateExpression(stmt.expression, Precedence.Sequence, E_TTT)], fragment = toSourceNodeWhenNeeded(result).toString(), fragment.charCodeAt(0) === 123 || isClassPrefixed(fragment) || isFunctionPrefixed(fragment) || isAsyncPrefixed(fragment) || directive && flags & F_DIRECTIVE_CTX && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value == "string" ? result = ["(", result, ")" + this.semicolon(flags)] : result.push(this.semicolon(flags)), result;
    }, ImportDeclaration: function(stmt, flags) {
      var result, cursor, that = this;
      return stmt.specifiers.length === 0 ? ["import", space, this.generateExpression(stmt.source, Precedence.Sequence, E_TTT), this.semicolon(flags)] : (result = ["import"], cursor = 0, stmt.specifiers[cursor].type === Syntax.ImportDefaultSpecifier && (result = join(result, [this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)]), ++cursor), stmt.specifiers[cursor] && (cursor !== 0 && result.push(","), stmt.specifiers[cursor].type === Syntax.ImportNamespaceSpecifier ? result = join(result, [space, this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)]) : (result.push(space + "{"), stmt.specifiers.length - cursor === 1 ? (result.push(space), result.push(this.generateExpression(stmt.specifiers[cursor], Precedence.Sequence, E_TTT)), result.push(space + "}" + space)) : (withIndent(function(indent2) {
        var i, iz;
        for (result.push(newline), i = cursor, iz = stmt.specifiers.length; i < iz; ++i) result.push(indent2), result.push(that.generateExpression(stmt.specifiers[i], Precedence.Sequence, E_TTT)), i + 1 < iz && result.push("," + newline);
      }), endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) || result.push(newline), result.push(base2 + "}" + space)))), result = join(result, ["from" + space, this.generateExpression(stmt.source, Precedence.Sequence, E_TTT), this.semicolon(flags)]), result);
    }, VariableDeclarator: function(stmt, flags) {
      var itemFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;
      return stmt.init ? [this.generateExpression(stmt.id, Precedence.Assignment, itemFlags), space, "=", space, this.generateExpression(stmt.init, Precedence.Assignment, itemFlags)] : this.generatePattern(stmt.id, Precedence.Assignment, itemFlags);
    }, VariableDeclaration: function(stmt, flags) {
      var result, i, iz, node, bodyFlags, that = this;
      result = [stmt.kind], bodyFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF;
      function block() {
        for (node = stmt.declarations[0], extra.comment && node.leadingComments ? (result.push(`
`), result.push(addIndent(that.generateStatement(node, bodyFlags)))) : (result.push(noEmptySpace()), result.push(that.generateStatement(node, bodyFlags))), i = 1, iz = stmt.declarations.length; i < iz; ++i) node = stmt.declarations[i], extra.comment && node.leadingComments ? (result.push("," + newline), result.push(addIndent(that.generateStatement(node, bodyFlags)))) : (result.push("," + space), result.push(that.generateStatement(node, bodyFlags)));
      }
      return stmt.declarations.length > 1 ? withIndent(block) : block(), result.push(this.semicolon(flags)), result;
    }, ThrowStatement: function(stmt, flags) {
      return [join("throw", this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)), this.semicolon(flags)];
    }, TryStatement: function(stmt, flags) {
      var result, i, iz, guardedHandlers;
      if (result = ["try", this.maybeBlock(stmt.block, S_TFFF)], result = this.maybeBlockSuffix(stmt.block, result), stmt.handlers) for (i = 0, iz = stmt.handlers.length; i < iz; ++i) result = join(result, this.generateStatement(stmt.handlers[i], S_TFFF)), (stmt.finalizer || i + 1 !== iz) && (result = this.maybeBlockSuffix(stmt.handlers[i].body, result));
      else {
        for (guardedHandlers = stmt.guardedHandlers || [], i = 0, iz = guardedHandlers.length; i < iz; ++i) result = join(result, this.generateStatement(guardedHandlers[i], S_TFFF)), (stmt.finalizer || i + 1 !== iz) && (result = this.maybeBlockSuffix(guardedHandlers[i].body, result));
        if (stmt.handler) if (Array.isArray(stmt.handler)) for (i = 0, iz = stmt.handler.length; i < iz; ++i) result = join(result, this.generateStatement(stmt.handler[i], S_TFFF)), (stmt.finalizer || i + 1 !== iz) && (result = this.maybeBlockSuffix(stmt.handler[i].body, result));
        else result = join(result, this.generateStatement(stmt.handler, S_TFFF)), stmt.finalizer && (result = this.maybeBlockSuffix(stmt.handler.body, result));
      }
      return stmt.finalizer && (result = join(result, ["finally", this.maybeBlock(stmt.finalizer, S_TFFF)])), result;
    }, SwitchStatement: function(stmt, flags) {
      var result, fragment, i, iz, bodyFlags, that = this;
      if (withIndent(function() {
        result = ["switch" + space + "(", that.generateExpression(stmt.discriminant, Precedence.Sequence, E_TTT), ")" + space + "{" + newline];
      }), stmt.cases) for (bodyFlags = S_TFFF, i = 0, iz = stmt.cases.length; i < iz; ++i) i === iz - 1 && (bodyFlags |= F_SEMICOLON_OPT), fragment = addIndent(this.generateStatement(stmt.cases[i], bodyFlags)), result.push(fragment), endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString()) || result.push(newline);
      return result.push(addIndent("}")), result;
    }, SwitchCase: function(stmt, flags) {
      var result, fragment, i, iz, bodyFlags, that = this;
      return withIndent(function() {
        for (stmt.test ? result = [join("case", that.generateExpression(stmt.test, Precedence.Sequence, E_TTT)), ":"] : result = ["default:"], i = 0, iz = stmt.consequent.length, iz && stmt.consequent[0].type === Syntax.BlockStatement && (fragment = that.maybeBlock(stmt.consequent[0], S_TFFF), result.push(fragment), i = 1), i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) && result.push(newline), bodyFlags = S_TFFF; i < iz; ++i) i === iz - 1 && flags & F_SEMICOLON_OPT && (bodyFlags |= F_SEMICOLON_OPT), fragment = addIndent(that.generateStatement(stmt.consequent[i], bodyFlags)), result.push(fragment), i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString()) && result.push(newline);
      }), result;
    }, IfStatement: function(stmt, flags) {
      var result, bodyFlags, semicolonOptional, that = this;
      return withIndent(function() {
        result = ["if" + space + "(", that.generateExpression(stmt.test, Precedence.Sequence, E_TTT), ")"];
      }), semicolonOptional = flags & F_SEMICOLON_OPT, bodyFlags = S_TFFF, semicolonOptional && (bodyFlags |= F_SEMICOLON_OPT), stmt.alternate ? (result.push(this.maybeBlock(stmt.consequent, S_TFFF)), result = this.maybeBlockSuffix(stmt.consequent, result), stmt.alternate.type === Syntax.IfStatement ? result = join(result, ["else ", this.generateStatement(stmt.alternate, bodyFlags)]) : result = join(result, join("else", this.maybeBlock(stmt.alternate, bodyFlags)))) : result.push(this.maybeBlock(stmt.consequent, bodyFlags)), result;
    }, ForStatement: function(stmt, flags) {
      var result, that = this;
      return withIndent(function() {
        result = ["for" + space + "("], stmt.init ? stmt.init.type === Syntax.VariableDeclaration ? result.push(that.generateStatement(stmt.init, S_FFFF)) : (result.push(that.generateExpression(stmt.init, Precedence.Sequence, E_FTT)), result.push(";")) : result.push(";"), stmt.test && (result.push(space), result.push(that.generateExpression(stmt.test, Precedence.Sequence, E_TTT))), result.push(";"), stmt.update && (result.push(space), result.push(that.generateExpression(stmt.update, Precedence.Sequence, E_TTT))), result.push(")");
      }), result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)), result;
    }, ForInStatement: function(stmt, flags) {
      return this.generateIterationForStatement("in", stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
    }, ForOfStatement: function(stmt, flags) {
      return this.generateIterationForStatement("of", stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF);
    }, LabeledStatement: function(stmt, flags) {
      return [stmt.label.name + ":", this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)];
    }, Program: function(stmt, flags) {
      var result, fragment, i, iz, bodyFlags;
      for (iz = stmt.body.length, result = [safeConcatenation && iz > 0 ? `
` : ""], bodyFlags = S_TFTF, i = 0; i < iz; ++i) !safeConcatenation && i === iz - 1 && (bodyFlags |= F_SEMICOLON_OPT), preserveBlankLines && (i === 0 && (stmt.body[0].leadingComments || generateBlankLines(stmt.range[0], stmt.body[i].range[0], result)), i > 0 && !stmt.body[i - 1].trailingComments && !stmt.body[i].leadingComments && generateBlankLines(stmt.body[i - 1].range[1], stmt.body[i].range[0], result)), fragment = addIndent(this.generateStatement(stmt.body[i], bodyFlags)), result.push(fragment), i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString()) && (preserveBlankLines && stmt.body[i + 1].leadingComments || result.push(newline)), preserveBlankLines && i === iz - 1 && (stmt.body[i].trailingComments || generateBlankLines(stmt.body[i].range[1], stmt.range[1], result));
      return result;
    }, FunctionDeclaration: function(stmt, flags) {
      return [generateAsyncPrefix(stmt, true), "function", generateStarSuffix(stmt) || noEmptySpace(), stmt.id ? generateIdentifier(stmt.id) : "", this.generateFunctionBody(stmt)];
    }, ReturnStatement: function(stmt, flags) {
      return stmt.argument ? [join("return", this.generateExpression(stmt.argument, Precedence.Sequence, E_TTT)), this.semicolon(flags)] : ["return" + this.semicolon(flags)];
    }, WhileStatement: function(stmt, flags) {
      var result, that = this;
      return withIndent(function() {
        result = ["while" + space + "(", that.generateExpression(stmt.test, Precedence.Sequence, E_TTT), ")"];
      }), result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)), result;
    }, WithStatement: function(stmt, flags) {
      var result, that = this;
      return withIndent(function() {
        result = ["with" + space + "(", that.generateExpression(stmt.object, Precedence.Sequence, E_TTT), ")"];
      }), result.push(this.maybeBlock(stmt.body, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)), result;
    } }, merge(CodeGenerator.prototype, CodeGenerator.Statement), CodeGenerator.Expression = { SequenceExpression: function(expr, precedence, flags) {
      var result, i, iz;
      for (Precedence.Sequence < precedence && (flags |= F_ALLOW_IN), result = [], i = 0, iz = expr.expressions.length; i < iz; ++i) result.push(this.generateExpression(expr.expressions[i], Precedence.Assignment, flags)), i + 1 < iz && result.push("," + space);
      return parenthesize(result, Precedence.Sequence, precedence);
    }, AssignmentExpression: function(expr, precedence, flags) {
      return this.generateAssignment(expr.left, expr.right, expr.operator, precedence, flags);
    }, ArrowFunctionExpression: function(expr, precedence, flags) {
      return parenthesize(this.generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
    }, ConditionalExpression: function(expr, precedence, flags) {
      return Precedence.Conditional < precedence && (flags |= F_ALLOW_IN), parenthesize([this.generateExpression(expr.test, Precedence.Coalesce, flags), space + "?" + space, this.generateExpression(expr.consequent, Precedence.Assignment, flags), space + ":" + space, this.generateExpression(expr.alternate, Precedence.Assignment, flags)], Precedence.Conditional, precedence);
    }, LogicalExpression: function(expr, precedence, flags) {
      return expr.operator === "??" && (flags |= F_FOUND_COALESCE), this.BinaryExpression(expr, precedence, flags);
    }, BinaryExpression: function(expr, precedence, flags) {
      var result, leftPrecedence, rightPrecedence, currentPrecedence, fragment, leftSource;
      return currentPrecedence = BinaryPrecedence[expr.operator], leftPrecedence = expr.operator === "**" ? Precedence.Postfix : currentPrecedence, rightPrecedence = expr.operator === "**" ? currentPrecedence : currentPrecedence + 1, currentPrecedence < precedence && (flags |= F_ALLOW_IN), fragment = this.generateExpression(expr.left, leftPrecedence, flags), leftSource = fragment.toString(), leftSource.charCodeAt(leftSource.length - 1) === 47 && esutils.code.isIdentifierPartES5(expr.operator.charCodeAt(0)) ? result = [fragment, noEmptySpace(), expr.operator] : result = join(fragment, expr.operator), fragment = this.generateExpression(expr.right, rightPrecedence, flags), expr.operator === "/" && fragment.toString().charAt(0) === "/" || expr.operator.slice(-1) === "<" && fragment.toString().slice(0, 3) === "!--" ? (result.push(noEmptySpace()), result.push(fragment)) : result = join(result, fragment), expr.operator === "in" && !(flags & F_ALLOW_IN) ? ["(", result, ")"] : (expr.operator === "||" || expr.operator === "&&") && flags & F_FOUND_COALESCE ? ["(", result, ")"] : parenthesize(result, currentPrecedence, precedence);
    }, CallExpression: function(expr, precedence, flags) {
      var result, i, iz;
      for (result = [this.generateExpression(expr.callee, Precedence.Call, E_TTF)], expr.optional && result.push("?."), result.push("("), i = 0, iz = expr.arguments.length; i < iz; ++i) result.push(this.generateExpression(expr.arguments[i], Precedence.Assignment, E_TTT)), i + 1 < iz && result.push("," + space);
      return result.push(")"), flags & F_ALLOW_CALL ? parenthesize(result, Precedence.Call, precedence) : ["(", result, ")"];
    }, ChainExpression: function(expr, precedence, flags) {
      Precedence.OptionalChaining < precedence && (flags |= F_ALLOW_CALL);
      var result = this.generateExpression(expr.expression, Precedence.OptionalChaining, flags);
      return parenthesize(result, Precedence.OptionalChaining, precedence);
    }, NewExpression: function(expr, precedence, flags) {
      var result, length, i, iz, itemFlags;
      if (length = expr.arguments.length, itemFlags = flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0 ? E_TFT : E_TFF, result = join("new", this.generateExpression(expr.callee, Precedence.New, itemFlags)), !(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
        for (result.push("("), i = 0, iz = length; i < iz; ++i) result.push(this.generateExpression(expr.arguments[i], Precedence.Assignment, E_TTT)), i + 1 < iz && result.push("," + space);
        result.push(")");
      }
      return parenthesize(result, Precedence.New, precedence);
    }, MemberExpression: function(expr, precedence, flags) {
      var result, fragment;
      return result = [this.generateExpression(expr.object, Precedence.Call, flags & F_ALLOW_CALL ? E_TTF : E_TFF)], expr.computed ? (expr.optional && result.push("?."), result.push("["), result.push(this.generateExpression(expr.property, Precedence.Sequence, flags & F_ALLOW_CALL ? E_TTT : E_TFT)), result.push("]")) : (!expr.optional && expr.object.type === Syntax.Literal && typeof expr.object.value == "number" && (fragment = toSourceNodeWhenNeeded(result).toString(), fragment.indexOf(".") < 0 && !/[eExX]/.test(fragment) && esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) && !(fragment.length >= 2 && fragment.charCodeAt(0) === 48) && result.push(" ")), result.push(expr.optional ? "?." : "."), result.push(generateIdentifier(expr.property))), parenthesize(result, Precedence.Member, precedence);
    }, MetaProperty: function(expr, precedence, flags) {
      var result;
      return result = [], result.push(typeof expr.meta == "string" ? expr.meta : generateIdentifier(expr.meta)), result.push("."), result.push(typeof expr.property == "string" ? expr.property : generateIdentifier(expr.property)), parenthesize(result, Precedence.Member, precedence);
    }, UnaryExpression: function(expr, precedence, flags) {
      var result, fragment, rightCharCode, leftSource, leftCharCode;
      return fragment = this.generateExpression(expr.argument, Precedence.Unary, E_TTT), space === "" ? result = join(expr.operator, fragment) : (result = [expr.operator], expr.operator.length > 2 ? result = join(result, fragment) : (leftSource = toSourceNodeWhenNeeded(result).toString(), leftCharCode = leftSource.charCodeAt(leftSource.length - 1), rightCharCode = fragment.toString().charCodeAt(0), ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils.code.isIdentifierPartES5(leftCharCode) && esutils.code.isIdentifierPartES5(rightCharCode)) && result.push(noEmptySpace()), result.push(fragment))), parenthesize(result, Precedence.Unary, precedence);
    }, YieldExpression: function(expr, precedence, flags) {
      var result;
      return expr.delegate ? result = "yield*" : result = "yield", expr.argument && (result = join(result, this.generateExpression(expr.argument, Precedence.Yield, E_TTT))), parenthesize(result, Precedence.Yield, precedence);
    }, AwaitExpression: function(expr, precedence, flags) {
      var result = join(expr.all ? "await*" : "await", this.generateExpression(expr.argument, Precedence.Await, E_TTT));
      return parenthesize(result, Precedence.Await, precedence);
    }, UpdateExpression: function(expr, precedence, flags) {
      return expr.prefix ? parenthesize([expr.operator, this.generateExpression(expr.argument, Precedence.Unary, E_TTT)], Precedence.Unary, precedence) : parenthesize([this.generateExpression(expr.argument, Precedence.Postfix, E_TTT), expr.operator], Precedence.Postfix, precedence);
    }, FunctionExpression: function(expr, precedence, flags) {
      var result = [generateAsyncPrefix(expr, true), "function"];
      return expr.id ? (result.push(generateStarSuffix(expr) || noEmptySpace()), result.push(generateIdentifier(expr.id))) : result.push(generateStarSuffix(expr) || space), result.push(this.generateFunctionBody(expr)), result;
    }, ArrayPattern: function(expr, precedence, flags) {
      return this.ArrayExpression(expr, precedence, flags, true);
    }, ArrayExpression: function(expr, precedence, flags, isPattern) {
      var result, multiline, that = this;
      return expr.elements.length ? (multiline = isPattern ? false : expr.elements.length > 1, result = ["[", multiline ? newline : ""], withIndent(function(indent2) {
        var i, iz;
        for (i = 0, iz = expr.elements.length; i < iz; ++i) expr.elements[i] ? (result.push(multiline ? indent2 : ""), result.push(that.generateExpression(expr.elements[i], Precedence.Assignment, E_TTT))) : (multiline && result.push(indent2), i + 1 === iz && result.push(",")), i + 1 < iz && result.push("," + (multiline ? newline : space));
      }), multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) && result.push(newline), result.push(multiline ? base2 : ""), result.push("]"), result) : "[]";
    }, RestElement: function(expr, precedence, flags) {
      return "..." + this.generatePattern(expr.argument);
    }, ClassExpression: function(expr, precedence, flags) {
      var result, fragment;
      return result = ["class"], expr.id && (result = join(result, this.generateExpression(expr.id, Precedence.Sequence, E_TTT))), expr.superClass && (fragment = join("extends", this.generateExpression(expr.superClass, Precedence.Unary, E_TTT)), result = join(result, fragment)), result.push(space), result.push(this.generateStatement(expr.body, S_TFFT)), result;
    }, MethodDefinition: function(expr, precedence, flags) {
      var result, fragment;
      return expr.static ? result = ["static" + space] : result = [], expr.kind === "get" || expr.kind === "set" ? fragment = [join(expr.kind, this.generatePropertyKey(expr.key, expr.computed)), this.generateFunctionBody(expr.value)] : fragment = [generateMethodPrefix(expr), this.generatePropertyKey(expr.key, expr.computed), this.generateFunctionBody(expr.value)], join(result, fragment);
    }, Property: function(expr, precedence, flags) {
      return expr.kind === "get" || expr.kind === "set" ? [expr.kind, noEmptySpace(), this.generatePropertyKey(expr.key, expr.computed), this.generateFunctionBody(expr.value)] : expr.shorthand ? expr.value.type === "AssignmentPattern" ? this.AssignmentPattern(expr.value, Precedence.Sequence, E_TTT) : this.generatePropertyKey(expr.key, expr.computed) : expr.method ? [generateMethodPrefix(expr), this.generatePropertyKey(expr.key, expr.computed), this.generateFunctionBody(expr.value)] : [this.generatePropertyKey(expr.key, expr.computed), ":" + space, this.generateExpression(expr.value, Precedence.Assignment, E_TTT)];
    }, ObjectExpression: function(expr, precedence, flags) {
      var multiline, result, fragment, that = this;
      return expr.properties.length ? (multiline = expr.properties.length > 1, withIndent(function() {
        fragment = that.generateExpression(expr.properties[0], Precedence.Sequence, E_TTT);
      }), !multiline && !hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString()) ? ["{", space, fragment, space, "}"] : (withIndent(function(indent2) {
        var i, iz;
        if (result = ["{", newline, indent2, fragment], multiline) for (result.push("," + newline), i = 1, iz = expr.properties.length; i < iz; ++i) result.push(indent2), result.push(that.generateExpression(expr.properties[i], Precedence.Sequence, E_TTT)), i + 1 < iz && result.push("," + newline);
      }), endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) || result.push(newline), result.push(base2), result.push("}"), result)) : "{}";
    }, AssignmentPattern: function(expr, precedence, flags) {
      return this.generateAssignment(expr.left, expr.right, "=", precedence, flags);
    }, ObjectPattern: function(expr, precedence, flags) {
      var result, i, iz, multiline, property, that = this;
      if (!expr.properties.length) return "{}";
      if (multiline = false, expr.properties.length === 1) property = expr.properties[0], property.type === Syntax.Property && property.value.type !== Syntax.Identifier && (multiline = true);
      else for (i = 0, iz = expr.properties.length; i < iz; ++i) if (property = expr.properties[i], property.type === Syntax.Property && !property.shorthand) {
        multiline = true;
        break;
      }
      return result = ["{", multiline ? newline : ""], withIndent(function(indent2) {
        var i2, iz2;
        for (i2 = 0, iz2 = expr.properties.length; i2 < iz2; ++i2) result.push(multiline ? indent2 : ""), result.push(that.generateExpression(expr.properties[i2], Precedence.Sequence, E_TTT)), i2 + 1 < iz2 && result.push("," + (multiline ? newline : space));
      }), multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString()) && result.push(newline), result.push(multiline ? base2 : ""), result.push("}"), result;
    }, ThisExpression: function(expr, precedence, flags) {
      return "this";
    }, Super: function(expr, precedence, flags) {
      return "super";
    }, Identifier: function(expr, precedence, flags) {
      return generateIdentifier(expr);
    }, ImportDefaultSpecifier: function(expr, precedence, flags) {
      return generateIdentifier(expr.id || expr.local);
    }, ImportNamespaceSpecifier: function(expr, precedence, flags) {
      var result = ["*"], id = expr.id || expr.local;
      return id && result.push(space + "as" + noEmptySpace() + generateIdentifier(id)), result;
    }, ImportSpecifier: function(expr, precedence, flags) {
      var imported = expr.imported, result = [imported.name], local = expr.local;
      return local && local.name !== imported.name && result.push(noEmptySpace() + "as" + noEmptySpace() + generateIdentifier(local)), result;
    }, ExportSpecifier: function(expr, precedence, flags) {
      var local = expr.local, result = [local.name], exported = expr.exported;
      return exported && exported.name !== local.name && result.push(noEmptySpace() + "as" + noEmptySpace() + generateIdentifier(exported)), result;
    }, Literal: function(expr, precedence, flags) {
      var raw;
      if (expr.hasOwnProperty("raw") && parse5 && extra.raw) try {
        if (raw = parse5(expr.raw).body[0].expression, raw.type === Syntax.Literal && raw.value === expr.value) return expr.raw;
      } catch {
      }
      return expr.regex ? "/" + expr.regex.pattern + "/" + expr.regex.flags : typeof expr.value == "bigint" ? expr.value.toString() + "n" : expr.bigint ? expr.bigint + "n" : expr.value === null ? "null" : typeof expr.value == "string" ? escapeString(expr.value) : typeof expr.value == "number" ? generateNumber(expr.value) : typeof expr.value == "boolean" ? expr.value ? "true" : "false" : generateRegExp(expr.value);
    }, GeneratorExpression: function(expr, precedence, flags) {
      return this.ComprehensionExpression(expr, precedence, flags);
    }, ComprehensionExpression: function(expr, precedence, flags) {
      var result, i, iz, fragment, that = this;
      return result = expr.type === Syntax.GeneratorExpression ? ["("] : ["["], extra.moz.comprehensionExpressionStartsWithAssignment && (fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT), result.push(fragment)), expr.blocks && withIndent(function() {
        for (i = 0, iz = expr.blocks.length; i < iz; ++i) fragment = that.generateExpression(expr.blocks[i], Precedence.Sequence, E_TTT), i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment ? result = join(result, fragment) : result.push(fragment);
      }), expr.filter && (result = join(result, "if" + space), fragment = this.generateExpression(expr.filter, Precedence.Sequence, E_TTT), result = join(result, ["(", fragment, ")"])), extra.moz.comprehensionExpressionStartsWithAssignment || (fragment = this.generateExpression(expr.body, Precedence.Assignment, E_TTT), result = join(result, fragment)), result.push(expr.type === Syntax.GeneratorExpression ? ")" : "]"), result;
    }, ComprehensionBlock: function(expr, precedence, flags) {
      var fragment;
      return expr.left.type === Syntax.VariableDeclaration ? fragment = [expr.left.kind, noEmptySpace(), this.generateStatement(expr.left.declarations[0], S_FFFF)] : fragment = this.generateExpression(expr.left, Precedence.Call, E_TTT), fragment = join(fragment, expr.of ? "of" : "in"), fragment = join(fragment, this.generateExpression(expr.right, Precedence.Sequence, E_TTT)), ["for" + space + "(", fragment, ")"];
    }, SpreadElement: function(expr, precedence, flags) {
      return ["...", this.generateExpression(expr.argument, Precedence.Assignment, E_TTT)];
    }, TaggedTemplateExpression: function(expr, precedence, flags) {
      var itemFlags = E_TTF;
      flags & F_ALLOW_CALL || (itemFlags = E_TFF);
      var result = [this.generateExpression(expr.tag, Precedence.Call, itemFlags), this.generateExpression(expr.quasi, Precedence.Primary, E_FFT)];
      return parenthesize(result, Precedence.TaggedTemplate, precedence);
    }, TemplateElement: function(expr, precedence, flags) {
      return expr.value.raw;
    }, TemplateLiteral: function(expr, precedence, flags) {
      var result, i, iz;
      for (result = ["`"], i = 0, iz = expr.quasis.length; i < iz; ++i) result.push(this.generateExpression(expr.quasis[i], Precedence.Primary, E_TTT)), i + 1 < iz && (result.push("${" + space), result.push(this.generateExpression(expr.expressions[i], Precedence.Sequence, E_TTT)), result.push(space + "}"));
      return result.push("`"), result;
    }, ModuleSpecifier: function(expr, precedence, flags) {
      return this.Literal(expr, precedence, flags);
    }, ImportExpression: function(expr, precedence, flag) {
      return parenthesize(["import(", this.generateExpression(expr.source, Precedence.Assignment, E_TTT), ")"], Precedence.Call, precedence);
    } }, merge(CodeGenerator.prototype, CodeGenerator.Expression), CodeGenerator.prototype.generateExpression = function(expr, precedence, flags) {
      var result, type;
      return type = expr.type || Syntax.Property, extra.verbatim && expr.hasOwnProperty(extra.verbatim) ? generateVerbatim(expr, precedence) : (result = this[type](expr, precedence, flags), extra.comment && (result = addComments(expr, result)), toSourceNodeWhenNeeded(result, expr));
    }, CodeGenerator.prototype.generateStatement = function(stmt, flags) {
      var result, fragment;
      return result = this[stmt.type](stmt, flags), extra.comment && (result = addComments(stmt, result)), fragment = toSourceNodeWhenNeeded(result).toString(), stmt.type === Syntax.Program && !safeConcatenation && newline === "" && fragment.charAt(fragment.length - 1) === `
` && (result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, "") : fragment.replace(/\s+$/, "")), toSourceNodeWhenNeeded(result, stmt);
    };
    function generateInternal(node) {
      var codegen;
      if (codegen = new CodeGenerator(), isStatement(node)) return codegen.generateStatement(node, S_TFFF);
      if (isExpression(node)) return codegen.generateExpression(node, Precedence.Sequence, E_TTT);
      throw new Error("Unknown node type: " + node.type);
    }
    function generate2(node, options) {
      var defaultOptions2 = getDefaultOptions(), result, pair;
      return options != null ? (typeof options.indent == "string" && (defaultOptions2.format.indent.style = options.indent), typeof options.base == "number" && (defaultOptions2.format.indent.base = options.base), options = updateDeeply(defaultOptions2, options), indent = options.format.indent.style, typeof options.base == "string" ? base2 = options.base : base2 = stringRepeat(indent, options.format.indent.base)) : (options = defaultOptions2, indent = options.format.indent.style, base2 = stringRepeat(indent, options.format.indent.base)), json = options.format.json, renumber = options.format.renumber, hexadecimal = json ? false : options.format.hexadecimal, quotes = json ? "double" : options.format.quotes, escapeless = options.format.escapeless, newline = options.format.newline, space = options.format.space, options.format.compact && (newline = space = indent = base2 = ""), parentheses = options.format.parentheses, semicolons = options.format.semicolons, safeConcatenation = options.format.safeConcatenation, directive = options.directive, parse5 = json ? null : options.parse, sourceMap = options.sourceMap, sourceCode = options.sourceCode, preserveBlankLines = options.format.preserveBlankLines && sourceCode !== null, extra = options, sourceMap && (exports.browser ? SourceNode = global.sourceMap.SourceNode : SourceNode = require_source_map().SourceNode), result = generateInternal(node), sourceMap ? (pair = result.toStringWithSourceMap({ file: options.file, sourceRoot: options.sourceMapRoot }), options.sourceContent && pair.map.setSourceContent(options.sourceMap, options.sourceContent), options.sourceMapWithCode ? pair : pair.map.toString()) : (pair = { code: result.toString(), map: null }, options.sourceMapWithCode ? pair : pair.code);
    }
    FORMAT_MINIFY = { indent: { style: "", base: 0 }, renumber: true, hexadecimal: true, quotes: "auto", escapeless: true, compact: true, parentheses: false, semicolons: false }, FORMAT_DEFAULTS = getDefaultOptions().format, exports.version = require_package().version, exports.generate = generate2, exports.attachComments = estraverse.attachComments, exports.Precedence = updateDeeply({}, Precedence), exports.browser = false, exports.FORMAT_MINIFY = FORMAT_MINIFY, exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
  })();
} });
var acorn_exports = {};
__export(acorn_exports, { Node: () => Node, Parser: () => Parser, Position: () => Position, SourceLocation: () => SourceLocation, TokContext: () => TokContext, Token: () => Token, TokenType: () => TokenType, defaultOptions: () => defaultOptions, getLineInfo: () => getLineInfo, isIdentifierChar: () => isIdentifierChar, isIdentifierStart: () => isIdentifierStart, isNewLine: () => isNewLine, keywordTypes: () => keywords$1, lineBreak: () => lineBreak, lineBreakG: () => lineBreakG, nonASCIIwhitespace: () => nonASCIIwhitespace, parse: () => parse3, parseExpressionAt: () => parseExpressionAt2, tokContexts: () => types$1, tokTypes: () => types, tokenizer: () => tokenizer2, version: () => version });
function isInAstralSet(code, set) {
  for (var pos = 65536, i = 0; i < set.length; i += 2) {
    if (pos += set[i], pos > code) return false;
    if (pos += set[i + 1], pos >= code) return true;
  }
}
function isIdentifierStart(code, astral) {
  return code < 65 ? code === 36 : code < 91 ? true : code < 97 ? code === 95 : code < 123 ? true : code <= 65535 ? code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code)) : astral === false ? false : isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code, astral) {
  return code < 48 ? code === 36 : code < 58 ? true : code < 65 ? false : code < 91 ? true : code < 97 ? code === 95 : code < 123 ? true : code <= 65535 ? code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code)) : astral === false ? false : isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
function binop(name, prec) {
  return new TokenType(name, { beforeExpr: true, binop: prec });
}
function kw(name, options) {
  return options === void 0 && (options = {}), options.keyword = name, keywords$1[name] = new TokenType(name, options);
}
function isNewLine(code, ecma2019String) {
  return code === 10 || code === 13 || !ecma2019String && (code === 8232 || code === 8233);
}
function has(obj, propName) {
  return hasOwnProperty.call(obj, propName);
}
function wordsRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
}
function getLineInfo(input, offset2) {
  for (var line = 1, cur = 0; ; ) {
    lineBreakG.lastIndex = cur;
    var match = lineBreakG.exec(input);
    if (match && match.index < offset2) ++line, cur = match.index + match[0].length;
    else return new Position(line, offset2 - cur);
  }
}
function getOptions(opts) {
  var options = {};
  for (var opt in defaultOptions) options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
  if (options.ecmaVersion >= 2015 && (options.ecmaVersion -= 2009), options.allowReserved == null && (options.allowReserved = options.ecmaVersion < 5), isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function(token) {
      return tokens.push(token);
    };
  }
  return isArray(options.onComment) && (options.onComment = pushComment(options, options.onComment)), options;
}
function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    var comment = { type: block ? "Block" : "Line", value: text, start, end };
    options.locations && (comment.loc = new SourceLocation(this, startLoc, endLoc)), options.ranges && (comment.range = [start, end]), array.push(comment);
  };
}
function functionFlags(async, generator) {
  return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
}
function DestructuringErrors() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
}
function finishNodeAt(node, type, pos, loc) {
  return node.type = type, node.end = pos, this.options.locations && (node.loc.end = loc), this.options.ranges && (node.range[1] = pos), node;
}
function buildUnicodeData(ecmaVersion) {
  var d = data[ecmaVersion] = { binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues), nonBinary: { General_Category: wordsRegexp(unicodeGeneralCategoryValues), Script: wordsRegexp(unicodeScriptValues[ecmaVersion]) } };
  d.nonBinary.Script_Extensions = d.nonBinary.Script, d.nonBinary.gc = d.nonBinary.General_Category, d.nonBinary.sc = d.nonBinary.Script, d.nonBinary.scx = d.nonBinary.Script_Extensions;
}
function codePointToString(ch) {
  return ch <= 65535 ? String.fromCharCode(ch) : (ch -= 65536, String.fromCharCode((ch >> 10) + 55296, (ch & 1023) + 56320));
}
function isSyntaxCharacter(ch) {
  return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
}
function isRegExpIdentifierStart(ch) {
  return isIdentifierStart(ch, true) || ch === 36 || ch === 95;
}
function isRegExpIdentifierPart(ch) {
  return isIdentifierChar(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
}
function isControlLetter(ch) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
}
function isValidUnicode(ch) {
  return ch >= 0 && ch <= 1114111;
}
function isCharacterClassEscape(ch) {
  return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
}
function isUnicodePropertyNameCharacter(ch) {
  return isControlLetter(ch) || ch === 95;
}
function isUnicodePropertyValueCharacter(ch) {
  return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
}
function isDecimalDigit(ch) {
  return ch >= 48 && ch <= 57;
}
function isHexDigit(ch) {
  return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
function hexToInt(ch) {
  return ch >= 65 && ch <= 70 ? 10 + (ch - 65) : ch >= 97 && ch <= 102 ? 10 + (ch - 97) : ch - 48;
}
function isOctalDigit(ch) {
  return ch >= 48 && ch <= 55;
}
function stringToNumber(str, isLegacyOctalNumericLiteral) {
  return isLegacyOctalNumericLiteral ? parseInt(str, 8) : parseFloat(str.replace(/_/g, ""));
}
function stringToBigInt(str) {
  return typeof BigInt != "function" ? null : BigInt(str.replace(/_/g, ""));
}
function codePointToString$1(code) {
  return code <= 65535 ? String.fromCharCode(code) : (code -= 65536, String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320));
}
function parse3(input, options) {
  return Parser.parse(input, options);
}
function parseExpressionAt2(input, pos, options) {
  return Parser.parseExpressionAt(input, pos, options);
}
function tokenizer2(input, options) {
  return Parser.tokenizer(input, options);
}
var reservedWords, ecma5AndLessKeywords, keywords, keywordRelationalOperator, nonASCIIidentifierStartChars, nonASCIIidentifierChars, nonASCIIidentifierStart, nonASCIIidentifier, astralIdentifierStartCodes, astralIdentifierCodes, TokenType, beforeExpr, startsExpr, keywords$1, types, lineBreak, lineBreakG, nonASCIIwhitespace, skipWhiteSpace, ref, hasOwnProperty, toString, isArray, Position, SourceLocation, defaultOptions, SCOPE_TOP, SCOPE_FUNCTION, SCOPE_VAR, SCOPE_ASYNC, SCOPE_GENERATOR, SCOPE_ARROW, SCOPE_SIMPLE_CATCH, SCOPE_SUPER, SCOPE_DIRECT_SUPER, BIND_NONE, BIND_VAR, BIND_LEXICAL, BIND_FUNCTION, BIND_SIMPLE_CATCH, BIND_OUTSIDE, Parser, prototypeAccessors, pp, literal, pp$1, loopLabel, switchLabel, empty, FUNC_STATEMENT, FUNC_HANGING_STATEMENT, FUNC_NULLABLE_ID, pp$2, pp$3, empty$1, pp$4, pp$5, Scope, Node, pp$6, TokContext, types$1, pp$7, ecma9BinaryProperties, ecma10BinaryProperties, ecma11BinaryProperties, unicodeBinaryProperties, unicodeGeneralCategoryValues, ecma9ScriptValues, ecma10ScriptValues, ecma11ScriptValues, unicodeScriptValues, data, pp$8, RegExpValidationState, Token, pp$9, INVALID_TEMPLATE_ESCAPE_ERROR, version, init_acorn = __esm({ "../../node_modules/acorn/dist/acorn.mjs"() {
  reservedWords = { 3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile", 5: "class enum extends super const export import", 6: "enum", strict: "implements interface let package private protected public static yield", strictBind: "eval arguments" }, ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", keywords = { 5: ecma5AndLessKeywords, "5module": ecma5AndLessKeywords + " export import", 6: ecma5AndLessKeywords + " const class extends export import super" }, keywordRelationalOperator = /^in(stanceof)?$/, nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿", nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
  nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
  astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938], astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
  TokenType = function(label, conf) {
    conf === void 0 && (conf = {}), this.label = label, this.keyword = conf.keyword, this.beforeExpr = !!conf.beforeExpr, this.startsExpr = !!conf.startsExpr, this.isLoop = !!conf.isLoop, this.isAssign = !!conf.isAssign, this.prefix = !!conf.prefix, this.postfix = !!conf.postfix, this.binop = conf.binop || null, this.updateContext = null;
  };
  beforeExpr = { beforeExpr: true }, startsExpr = { startsExpr: true }, keywords$1 = {};
  types = { num: new TokenType("num", startsExpr), regexp: new TokenType("regexp", startsExpr), string: new TokenType("string", startsExpr), name: new TokenType("name", startsExpr), eof: new TokenType("eof"), bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }), bracketR: new TokenType("]"), braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }), braceR: new TokenType("}"), parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }), parenR: new TokenType(")"), comma: new TokenType(",", beforeExpr), semi: new TokenType(";", beforeExpr), colon: new TokenType(":", beforeExpr), dot: new TokenType("."), question: new TokenType("?", beforeExpr), questionDot: new TokenType("?."), arrow: new TokenType("=>", beforeExpr), template: new TokenType("template"), invalidTemplate: new TokenType("invalidTemplate"), ellipsis: new TokenType("...", beforeExpr), backQuote: new TokenType("`", startsExpr), dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }), eq: new TokenType("=", { beforeExpr: true, isAssign: true }), assign: new TokenType("_=", { beforeExpr: true, isAssign: true }), incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }), prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }), logicalOR: binop("||", 1), logicalAND: binop("&&", 2), bitwiseOR: binop("|", 3), bitwiseXOR: binop("^", 4), bitwiseAND: binop("&", 5), equality: binop("==/!=/===/!==", 6), relational: binop("</>/<=/>=", 7), bitShift: binop("<</>>/>>>", 8), plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }), modulo: binop("%", 10), star: binop("*", 10), slash: binop("/", 10), starstar: new TokenType("**", { beforeExpr: true }), coalesce: binop("??", 1), _break: kw("break"), _case: kw("case", beforeExpr), _catch: kw("catch"), _continue: kw("continue"), _debugger: kw("debugger"), _default: kw("default", beforeExpr), _do: kw("do", { isLoop: true, beforeExpr: true }), _else: kw("else", beforeExpr), _finally: kw("finally"), _for: kw("for", { isLoop: true }), _function: kw("function", startsExpr), _if: kw("if"), _return: kw("return", beforeExpr), _switch: kw("switch"), _throw: kw("throw", beforeExpr), _try: kw("try"), _var: kw("var"), _const: kw("const"), _while: kw("while", { isLoop: true }), _with: kw("with"), _new: kw("new", { beforeExpr: true, startsExpr: true }), _this: kw("this", startsExpr), _super: kw("super", startsExpr), _class: kw("class", startsExpr), _extends: kw("extends", beforeExpr), _export: kw("export"), _import: kw("import", startsExpr), _null: kw("null", startsExpr), _true: kw("true", startsExpr), _false: kw("false", startsExpr), _in: kw("in", { beforeExpr: true, binop: 7 }), _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }), _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }), _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }), _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true }) }, lineBreak = /\r\n?|\n|\u2028|\u2029/, lineBreakG = new RegExp(lineBreak.source, "g");
  nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, ref = Object.prototype, hasOwnProperty = ref.hasOwnProperty, toString = ref.toString;
  isArray = Array.isArray || function(obj) {
    return toString.call(obj) === "[object Array]";
  };
  Position = function(line, col) {
    this.line = line, this.column = col;
  };
  Position.prototype.offset = function(n) {
    return new Position(this.line, this.column + n);
  };
  SourceLocation = function(p, start, end) {
    this.start = start, this.end = end, p.sourceFile !== null && (this.source = p.sourceFile);
  };
  defaultOptions = { ecmaVersion: 10, sourceType: "script", onInsertedSemicolon: null, onTrailingComma: null, allowReserved: null, allowReturnOutsideFunction: false, allowImportExportEverywhere: false, allowAwaitOutsideFunction: false, allowHashBang: false, locations: false, onToken: null, onComment: null, ranges: false, program: null, sourceFile: null, directSourceFile: null, preserveParens: false };
  SCOPE_TOP = 1, SCOPE_FUNCTION = 2, SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION, SCOPE_ASYNC = 4, SCOPE_GENERATOR = 8, SCOPE_ARROW = 16, SCOPE_SIMPLE_CATCH = 32, SCOPE_SUPER = 64, SCOPE_DIRECT_SUPER = 128;
  BIND_NONE = 0, BIND_VAR = 1, BIND_LEXICAL = 2, BIND_FUNCTION = 3, BIND_SIMPLE_CATCH = 4, BIND_OUTSIDE = 5, Parser = function(options, input, startPos) {
    this.options = options = getOptions(options), this.sourceFile = options.sourceFile, this.keywords = wordsRegexp(keywords[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
    var reserved = "";
    if (options.allowReserved !== true) {
      for (var v = options.ecmaVersion; !(reserved = reservedWords[v]); v--) ;
      options.sourceType === "module" && (reserved += " await");
    }
    this.reservedWords = wordsRegexp(reserved);
    var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
    this.reservedWordsStrict = wordsRegexp(reservedStrict), this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind), this.input = String(input), this.containsEsc = false, startPos ? (this.pos = startPos, this.lineStart = this.input.lastIndexOf(`
`, startPos - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = types.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = true, this.inModule = options.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = {}, this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(SCOPE_TOP), this.regexpState = null;
  }, prototypeAccessors = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true } };
  Parser.prototype.parse = function() {
    var node = this.options.program || this.startNode();
    return this.nextToken(), this.parseTopLevel(node);
  };
  prototypeAccessors.inFunction.get = function() {
    return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
  };
  prototypeAccessors.inGenerator.get = function() {
    return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
  };
  prototypeAccessors.inAsync.get = function() {
    return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
  };
  prototypeAccessors.allowSuper.get = function() {
    return (this.currentThisScope().flags & SCOPE_SUPER) > 0;
  };
  prototypeAccessors.allowDirectSuper.get = function() {
    return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
  };
  prototypeAccessors.treatFunctionsAsVar.get = function() {
    return this.treatFunctionsAsVarInScope(this.currentScope());
  };
  Parser.prototype.inNonArrowFunction = function() {
    return (this.currentThisScope().flags & SCOPE_FUNCTION) > 0;
  };
  Parser.extend = function() {
    for (var plugins = [], len = arguments.length; len--; ) plugins[len] = arguments[len];
    for (var cls = this, i = 0; i < plugins.length; i++) cls = plugins[i](cls);
    return cls;
  };
  Parser.parse = function(input, options) {
    return new this(options, input).parse();
  };
  Parser.parseExpressionAt = function(input, pos, options) {
    var parser = new this(options, input, pos);
    return parser.nextToken(), parser.parseExpression();
  };
  Parser.tokenizer = function(input, options) {
    return new this(options, input);
  };
  Object.defineProperties(Parser.prototype, prototypeAccessors);
  pp = Parser.prototype, literal = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
  pp.strictDirective = function(start) {
    for (; ; ) {
      skipWhiteSpace.lastIndex = start, start += skipWhiteSpace.exec(this.input)[0].length;
      var match = literal.exec(this.input.slice(start));
      if (!match) return false;
      if ((match[1] || match[2]) === "use strict") {
        skipWhiteSpace.lastIndex = start + match[0].length;
        var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length, next = this.input.charAt(end);
        return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
      }
      start += match[0].length, skipWhiteSpace.lastIndex = start, start += skipWhiteSpace.exec(this.input)[0].length, this.input[start] === ";" && start++;
    }
  };
  pp.eat = function(type) {
    return this.type === type ? (this.next(), true) : false;
  };
  pp.isContextual = function(name) {
    return this.type === types.name && this.value === name && !this.containsEsc;
  };
  pp.eatContextual = function(name) {
    return this.isContextual(name) ? (this.next(), true) : false;
  };
  pp.expectContextual = function(name) {
    this.eatContextual(name) || this.unexpected();
  };
  pp.canInsertSemicolon = function() {
    return this.type === types.eof || this.type === types.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };
  pp.insertSemicolon = function() {
    if (this.canInsertSemicolon()) return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), true;
  };
  pp.semicolon = function() {
    !this.eat(types.semi) && !this.insertSemicolon() && this.unexpected();
  };
  pp.afterTrailingComma = function(tokType, notNext) {
    if (this.type === tokType) return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), notNext || this.next(), true;
  };
  pp.expect = function(type) {
    this.eat(type) || this.unexpected();
  };
  pp.unexpected = function(pos) {
    this.raise(pos ?? this.start, "Unexpected token");
  };
  pp.checkPatternErrors = function(refDestructuringErrors, isAssign) {
    if (refDestructuringErrors) {
      refDestructuringErrors.trailingComma > -1 && this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
      var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
      parens > -1 && this.raiseRecoverable(parens, "Parenthesized pattern");
    }
  };
  pp.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
    if (!refDestructuringErrors) return false;
    var shorthandAssign = refDestructuringErrors.shorthandAssign, doubleProto = refDestructuringErrors.doubleProto;
    if (!andThrow) return shorthandAssign >= 0 || doubleProto >= 0;
    shorthandAssign >= 0 && this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns"), doubleProto >= 0 && this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
  };
  pp.checkYieldAwaitInDefaultParams = function() {
    this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
  };
  pp.isSimpleAssignTarget = function(expr) {
    return expr.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(expr.expression) : expr.type === "Identifier" || expr.type === "MemberExpression";
  };
  pp$1 = Parser.prototype;
  pp$1.parseTopLevel = function(node) {
    var exports = {};
    for (node.body || (node.body = []); this.type !== types.eof; ) {
      var stmt = this.parseStatement(null, true, exports);
      node.body.push(stmt);
    }
    if (this.inModule) for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1) {
      var name = list[i];
      this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
    }
    return this.adaptDirectivePrologue(node.body), this.next(), node.sourceType = this.options.sourceType, this.finishNode(node, "Program");
  };
  loopLabel = { kind: "loop" }, switchLabel = { kind: "switch" };
  pp$1.isLet = function(context) {
    if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return false;
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
    if (nextCh === 91) return true;
    if (context) return false;
    if (nextCh === 123) return true;
    if (isIdentifierStart(nextCh, true)) {
      for (var pos = next + 1; isIdentifierChar(this.input.charCodeAt(pos), true); ) ++pos;
      var ident = this.input.slice(next, pos);
      if (!keywordRelationalOperator.test(ident)) return true;
    }
    return false;
  };
  pp$1.isAsyncFunction = function() {
    if (this.options.ecmaVersion < 8 || !this.isContextual("async")) return false;
    skipWhiteSpace.lastIndex = this.pos;
    var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length;
    return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !isIdentifierChar(this.input.charAt(next + 8)));
  };
  pp$1.parseStatement = function(context, topLevel, exports) {
    var starttype = this.type, node = this.startNode(), kind;
    switch (this.isLet(context) && (starttype = types._var, kind = "let"), starttype) {
      case types._break:
      case types._continue:
        return this.parseBreakContinueStatement(node, starttype.keyword);
      case types._debugger:
        return this.parseDebuggerStatement(node);
      case types._do:
        return this.parseDoStatement(node);
      case types._for:
        return this.parseForStatement(node);
      case types._function:
        return context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(node, false, !context);
      case types._class:
        return context && this.unexpected(), this.parseClass(node, true);
      case types._if:
        return this.parseIfStatement(node);
      case types._return:
        return this.parseReturnStatement(node);
      case types._switch:
        return this.parseSwitchStatement(node);
      case types._throw:
        return this.parseThrowStatement(node);
      case types._try:
        return this.parseTryStatement(node);
      case types._const:
      case types._var:
        return kind = kind || this.value, context && kind !== "var" && this.unexpected(), this.parseVarStatement(node, kind);
      case types._while:
        return this.parseWhileStatement(node);
      case types._with:
        return this.parseWithStatement(node);
      case types.braceL:
        return this.parseBlock(true, node);
      case types.semi:
        return this.parseEmptyStatement(node);
      case types._export:
      case types._import:
        if (this.options.ecmaVersion > 10 && starttype === types._import) {
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input), next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
          if (nextCh === 40 || nextCh === 46) return this.parseExpressionStatement(node, this.parseExpression());
        }
        return this.options.allowImportExportEverywhere || (topLevel || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), starttype === types._import ? this.parseImport(node) : this.parseExport(node, exports);
      default:
        if (this.isAsyncFunction()) return context && this.unexpected(), this.next(), this.parseFunctionStatement(node, true, !context);
        var maybeName = this.value, expr = this.parseExpression();
        return starttype === types.name && expr.type === "Identifier" && this.eat(types.colon) ? this.parseLabeledStatement(node, maybeName, expr, context) : this.parseExpressionStatement(node, expr);
    }
  };
  pp$1.parseBreakContinueStatement = function(node, keyword) {
    var isBreak = keyword === "break";
    this.next(), this.eat(types.semi) || this.insertSemicolon() ? node.label = null : this.type !== types.name ? this.unexpected() : (node.label = this.parseIdent(), this.semicolon());
    for (var i = 0; i < this.labels.length; ++i) {
      var lab = this.labels[i];
      if ((node.label == null || lab.name === node.label.name) && (lab.kind != null && (isBreak || lab.kind === "loop") || node.label && isBreak)) break;
    }
    return i === this.labels.length && this.raise(node.start, "Unsyntactic " + keyword), this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
  };
  pp$1.parseDebuggerStatement = function(node) {
    return this.next(), this.semicolon(), this.finishNode(node, "DebuggerStatement");
  };
  pp$1.parseDoStatement = function(node) {
    return this.next(), this.labels.push(loopLabel), node.body = this.parseStatement("do"), this.labels.pop(), this.expect(types._while), node.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(types.semi) : this.semicolon(), this.finishNode(node, "DoWhileStatement");
  };
  pp$1.parseForStatement = function(node) {
    this.next();
    var awaitAt = this.options.ecmaVersion >= 9 && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction) && this.eatContextual("await") ? this.lastTokStart : -1;
    if (this.labels.push(loopLabel), this.enterScope(0), this.expect(types.parenL), this.type === types.semi) return awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node, null);
    var isLet = this.isLet();
    if (this.type === types._var || this.type === types._const || isLet) {
      var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
      return this.next(), this.parseVar(init$1, true, kind), this.finishNode(init$1, "VariableDeclaration"), (this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === types._in ? awaitAt > -1 && this.unexpected(awaitAt) : node.await = awaitAt > -1), this.parseForIn(node, init$1)) : (awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node, init$1));
    }
    var refDestructuringErrors = new DestructuringErrors(), init = this.parseExpression(true, refDestructuringErrors);
    return this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of") ? (this.options.ecmaVersion >= 9 && (this.type === types._in ? awaitAt > -1 && this.unexpected(awaitAt) : node.await = awaitAt > -1), this.toAssignable(init, false, refDestructuringErrors), this.checkLVal(init), this.parseForIn(node, init)) : (this.checkExpressionErrors(refDestructuringErrors, true), awaitAt > -1 && this.unexpected(awaitAt), this.parseFor(node, init));
  };
  pp$1.parseFunctionStatement = function(node, isAsync, declarationPosition) {
    return this.next(), this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
  };
  pp$1.parseIfStatement = function(node) {
    return this.next(), node.test = this.parseParenExpression(), node.consequent = this.parseStatement("if"), node.alternate = this.eat(types._else) ? this.parseStatement("if") : null, this.finishNode(node, "IfStatement");
  };
  pp$1.parseReturnStatement = function(node) {
    return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(types.semi) || this.insertSemicolon() ? node.argument = null : (node.argument = this.parseExpression(), this.semicolon()), this.finishNode(node, "ReturnStatement");
  };
  pp$1.parseSwitchStatement = function(node) {
    this.next(), node.discriminant = this.parseParenExpression(), node.cases = [], this.expect(types.braceL), this.labels.push(switchLabel), this.enterScope(0);
    for (var cur, sawDefault = false; this.type !== types.braceR; ) if (this.type === types._case || this.type === types._default) {
      var isCase = this.type === types._case;
      cur && this.finishNode(cur, "SwitchCase"), node.cases.push(cur = this.startNode()), cur.consequent = [], this.next(), isCase ? cur.test = this.parseExpression() : (sawDefault && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), sawDefault = true, cur.test = null), this.expect(types.colon);
    } else cur || this.unexpected(), cur.consequent.push(this.parseStatement(null));
    return this.exitScope(), cur && this.finishNode(cur, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(node, "SwitchStatement");
  };
  pp$1.parseThrowStatement = function(node) {
    return this.next(), lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), node.argument = this.parseExpression(), this.semicolon(), this.finishNode(node, "ThrowStatement");
  };
  empty = [];
  pp$1.parseTryStatement = function(node) {
    if (this.next(), node.block = this.parseBlock(), node.handler = null, this.type === types._catch) {
      var clause = this.startNode();
      if (this.next(), this.eat(types.parenL)) {
        clause.param = this.parseBindingAtom();
        var simple2 = clause.param.type === "Identifier";
        this.enterScope(simple2 ? SCOPE_SIMPLE_CATCH : 0), this.checkLVal(clause.param, simple2 ? BIND_SIMPLE_CATCH : BIND_LEXICAL), this.expect(types.parenR);
      } else this.options.ecmaVersion < 10 && this.unexpected(), clause.param = null, this.enterScope(0);
      clause.body = this.parseBlock(false), this.exitScope(), node.handler = this.finishNode(clause, "CatchClause");
    }
    return node.finalizer = this.eat(types._finally) ? this.parseBlock() : null, !node.handler && !node.finalizer && this.raise(node.start, "Missing catch or finally clause"), this.finishNode(node, "TryStatement");
  };
  pp$1.parseVarStatement = function(node, kind) {
    return this.next(), this.parseVar(node, false, kind), this.semicolon(), this.finishNode(node, "VariableDeclaration");
  };
  pp$1.parseWhileStatement = function(node) {
    return this.next(), node.test = this.parseParenExpression(), this.labels.push(loopLabel), node.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(node, "WhileStatement");
  };
  pp$1.parseWithStatement = function(node) {
    return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), node.object = this.parseParenExpression(), node.body = this.parseStatement("with"), this.finishNode(node, "WithStatement");
  };
  pp$1.parseEmptyStatement = function(node) {
    return this.next(), this.finishNode(node, "EmptyStatement");
  };
  pp$1.parseLabeledStatement = function(node, maybeName, expr, context) {
    for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1) {
      var label = list[i$1];
      label.name === maybeName && this.raise(expr.start, "Label '" + maybeName + "' is already declared");
    }
    for (var kind = this.type.isLoop ? "loop" : this.type === types._switch ? "switch" : null, i = this.labels.length - 1; i >= 0; i--) {
      var label$1 = this.labels[i];
      if (label$1.statementStart === node.start) label$1.statementStart = this.start, label$1.kind = kind;
      else break;
    }
    return this.labels.push({ name: maybeName, kind, statementStart: this.start }), node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label"), this.labels.pop(), node.label = expr, this.finishNode(node, "LabeledStatement");
  };
  pp$1.parseExpressionStatement = function(node, expr) {
    return node.expression = expr, this.semicolon(), this.finishNode(node, "ExpressionStatement");
  };
  pp$1.parseBlock = function(createNewLexicalScope, node, exitStrict) {
    for (createNewLexicalScope === void 0 && (createNewLexicalScope = true), node === void 0 && (node = this.startNode()), node.body = [], this.expect(types.braceL), createNewLexicalScope && this.enterScope(0); this.type !== types.braceR; ) {
      var stmt = this.parseStatement(null);
      node.body.push(stmt);
    }
    return exitStrict && (this.strict = false), this.next(), createNewLexicalScope && this.exitScope(), this.finishNode(node, "BlockStatement");
  };
  pp$1.parseFor = function(node, init) {
    return node.init = init, this.expect(types.semi), node.test = this.type === types.semi ? null : this.parseExpression(), this.expect(types.semi), node.update = this.type === types.parenR ? null : this.parseExpression(), this.expect(types.parenR), node.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(node, "ForStatement");
  };
  pp$1.parseForIn = function(node, init) {
    var isForIn = this.type === types._in;
    return this.next(), init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier") ? this.raise(init.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer") : init.type === "AssignmentPattern" && this.raise(init.start, "Invalid left-hand side in for-loop"), node.left = init, node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign(), this.expect(types.parenR), node.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
  };
  pp$1.parseVar = function(node, isFor, kind) {
    for (node.declarations = [], node.kind = kind; ; ) {
      var decl = this.startNode();
      if (this.parseVarId(decl, kind), this.eat(types.eq) ? decl.init = this.parseMaybeAssign(isFor) : kind === "const" && !(this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : decl.id.type !== "Identifier" && !(isFor && (this.type === types._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : decl.init = null, node.declarations.push(this.finishNode(decl, "VariableDeclarator")), !this.eat(types.comma)) break;
    }
    return node;
  };
  pp$1.parseVarId = function(decl, kind) {
    decl.id = this.parseBindingAtom(), this.checkLVal(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
  };
  FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;
  pp$1.parseFunction = function(node, statement, allowExpressionBody, isAsync) {
    this.initFunction(node), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) && (this.type === types.star && statement & FUNC_HANGING_STATEMENT && this.unexpected(), node.generator = this.eat(types.star)), this.options.ecmaVersion >= 8 && (node.async = !!isAsync), statement & FUNC_STATEMENT && (node.id = statement & FUNC_NULLABLE_ID && this.type !== types.name ? null : this.parseIdent(), node.id && !(statement & FUNC_HANGING_STATEMENT) && this.checkLVal(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION));
    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(functionFlags(node.async, node.generator)), statement & FUNC_STATEMENT || (node.id = this.type === types.name ? this.parseIdent() : null), this.parseFunctionParams(node), this.parseFunctionBody(node, allowExpressionBody, false), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
  };
  pp$1.parseFunctionParams = function(node) {
    this.expect(types.parenL), node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
  };
  pp$1.parseClass = function(node, isStatement) {
    this.next();
    var oldStrict = this.strict;
    this.strict = true, this.parseClassId(node, isStatement), this.parseClassSuper(node);
    var classBody = this.startNode(), hadConstructor = false;
    for (classBody.body = [], this.expect(types.braceL); this.type !== types.braceR; ) {
      var element = this.parseClassElement(node.superClass !== null);
      element && (classBody.body.push(element), element.type === "MethodDefinition" && element.kind === "constructor" && (hadConstructor && this.raise(element.start, "Duplicate constructor in the same class"), hadConstructor = true));
    }
    return this.strict = oldStrict, this.next(), node.body = this.finishNode(classBody, "ClassBody"), this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
  };
  pp$1.parseClassElement = function(constructorAllowsSuper) {
    var this$1$1 = this;
    if (this.eat(types.semi)) return null;
    var method = this.startNode(), tryContextual = function(k, noLineBreak) {
      noLineBreak === void 0 && (noLineBreak = false);
      var start = this$1$1.start, startLoc = this$1$1.startLoc;
      return this$1$1.eatContextual(k) ? this$1$1.type !== types.parenL && (!noLineBreak || !this$1$1.canInsertSemicolon()) ? true : (method.key && this$1$1.unexpected(), method.computed = false, method.key = this$1$1.startNodeAt(start, startLoc), method.key.name = k, this$1$1.finishNode(method.key, "Identifier"), false) : false;
    };
    method.kind = "method", method.static = tryContextual("static");
    var isGenerator = this.eat(types.star), isAsync = false;
    isGenerator || (this.options.ecmaVersion >= 8 && tryContextual("async", true) ? (isAsync = true, isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star)) : tryContextual("get") ? method.kind = "get" : tryContextual("set") && (method.kind = "set")), method.key || this.parsePropertyName(method);
    var key = method.key, allowsDirectSuper = false;
    return !method.computed && !method.static && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor") ? (method.kind !== "method" && this.raise(key.start, "Constructor can't have get/set modifier"), isGenerator && this.raise(key.start, "Constructor can't be a generator"), isAsync && this.raise(key.start, "Constructor can't be an async method"), method.kind = "constructor", allowsDirectSuper = constructorAllowsSuper) : method.static && key.type === "Identifier" && key.name === "prototype" && this.raise(key.start, "Classes may not have a static property named prototype"), this.parseClassMethod(method, isGenerator, isAsync, allowsDirectSuper), method.kind === "get" && method.value.params.length !== 0 && this.raiseRecoverable(method.value.start, "getter should have no params"), method.kind === "set" && method.value.params.length !== 1 && this.raiseRecoverable(method.value.start, "setter should have exactly one param"), method.kind === "set" && method.value.params[0].type === "RestElement" && this.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params"), method;
  };
  pp$1.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
    return method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper), this.finishNode(method, "MethodDefinition");
  };
  pp$1.parseClassId = function(node, isStatement) {
    this.type === types.name ? (node.id = this.parseIdent(), isStatement && this.checkLVal(node.id, BIND_LEXICAL, false)) : (isStatement === true && this.unexpected(), node.id = null);
  };
  pp$1.parseClassSuper = function(node) {
    node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
  };
  pp$1.parseExport = function(node, exports) {
    if (this.next(), this.eat(types.star)) return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (node.exported = this.parseIdent(true), this.checkExport(exports, node.exported.name, this.lastTokStart)) : node.exported = null), this.expectContextual("from"), this.type !== types.string && this.unexpected(), node.source = this.parseExprAtom(), this.semicolon(), this.finishNode(node, "ExportAllDeclaration");
    if (this.eat(types._default)) {
      this.checkExport(exports, "default", this.lastTokStart);
      var isAsync;
      if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
        var fNode = this.startNode();
        this.next(), isAsync && this.next(), node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
      } else if (this.type === types._class) {
        var cNode = this.startNode();
        node.declaration = this.parseClass(cNode, "nullableID");
      } else node.declaration = this.parseMaybeAssign(), this.semicolon();
      return this.finishNode(node, "ExportDefaultDeclaration");
    }
    if (this.shouldParseExportStatement()) node.declaration = this.parseStatement(null), node.declaration.type === "VariableDeclaration" ? this.checkVariableExport(exports, node.declaration.declarations) : this.checkExport(exports, node.declaration.id.name, node.declaration.id.start), node.specifiers = [], node.source = null;
    else {
      if (node.declaration = null, node.specifiers = this.parseExportSpecifiers(exports), this.eatContextual("from")) this.type !== types.string && this.unexpected(), node.source = this.parseExprAtom();
      else {
        for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
          var spec = list[i];
          this.checkUnreserved(spec.local), this.checkLocalExport(spec.local);
        }
        node.source = null;
      }
      this.semicolon();
    }
    return this.finishNode(node, "ExportNamedDeclaration");
  };
  pp$1.checkExport = function(exports, name, pos) {
    exports && (has(exports, name) && this.raiseRecoverable(pos, "Duplicate export '" + name + "'"), exports[name] = true);
  };
  pp$1.checkPatternExport = function(exports, pat) {
    var type = pat.type;
    if (type === "Identifier") this.checkExport(exports, pat.name, pat.start);
    else if (type === "ObjectPattern") for (var i = 0, list = pat.properties; i < list.length; i += 1) {
      var prop = list[i];
      this.checkPatternExport(exports, prop);
    }
    else if (type === "ArrayPattern") for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
      var elt = list$1[i$1];
      elt && this.checkPatternExport(exports, elt);
    }
    else type === "Property" ? this.checkPatternExport(exports, pat.value) : type === "AssignmentPattern" ? this.checkPatternExport(exports, pat.left) : type === "RestElement" ? this.checkPatternExport(exports, pat.argument) : type === "ParenthesizedExpression" && this.checkPatternExport(exports, pat.expression);
  };
  pp$1.checkVariableExport = function(exports, decls) {
    if (exports) for (var i = 0, list = decls; i < list.length; i += 1) {
      var decl = list[i];
      this.checkPatternExport(exports, decl.id);
    }
  };
  pp$1.shouldParseExportStatement = function() {
    return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
  };
  pp$1.parseExportSpecifiers = function(exports) {
    var nodes = [], first = true;
    for (this.expect(types.braceL); !this.eat(types.braceR); ) {
      if (first) first = false;
      else if (this.expect(types.comma), this.afterTrailingComma(types.braceR)) break;
      var node = this.startNode();
      node.local = this.parseIdent(true), node.exported = this.eatContextual("as") ? this.parseIdent(true) : node.local, this.checkExport(exports, node.exported.name, node.exported.start), nodes.push(this.finishNode(node, "ExportSpecifier"));
    }
    return nodes;
  };
  pp$1.parseImport = function(node) {
    return this.next(), this.type === types.string ? (node.specifiers = empty, node.source = this.parseExprAtom()) : (node.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected()), this.semicolon(), this.finishNode(node, "ImportDeclaration");
  };
  pp$1.parseImportSpecifiers = function() {
    var nodes = [], first = true;
    if (this.type === types.name) {
      var node = this.startNode();
      if (node.local = this.parseIdent(), this.checkLVal(node.local, BIND_LEXICAL), nodes.push(this.finishNode(node, "ImportDefaultSpecifier")), !this.eat(types.comma)) return nodes;
    }
    if (this.type === types.star) {
      var node$1 = this.startNode();
      return this.next(), this.expectContextual("as"), node$1.local = this.parseIdent(), this.checkLVal(node$1.local, BIND_LEXICAL), nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier")), nodes;
    }
    for (this.expect(types.braceL); !this.eat(types.braceR); ) {
      if (first) first = false;
      else if (this.expect(types.comma), this.afterTrailingComma(types.braceR)) break;
      var node$2 = this.startNode();
      node$2.imported = this.parseIdent(true), this.eatContextual("as") ? node$2.local = this.parseIdent() : (this.checkUnreserved(node$2.imported), node$2.local = node$2.imported), this.checkLVal(node$2.local, BIND_LEXICAL), nodes.push(this.finishNode(node$2, "ImportSpecifier"));
    }
    return nodes;
  };
  pp$1.adaptDirectivePrologue = function(statements) {
    for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) statements[i].directive = statements[i].expression.raw.slice(1, -1);
  };
  pp$1.isDirectiveCandidate = function(statement) {
    return statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value == "string" && (this.input[statement.start] === '"' || this.input[statement.start] === "'");
  };
  pp$2 = Parser.prototype;
  pp$2.toAssignable = function(node, isBinding, refDestructuringErrors) {
    if (this.options.ecmaVersion >= 6 && node) switch (node.type) {
      case "Identifier":
        this.inAsync && node.name === "await" && this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        node.type = "ObjectPattern", refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, true);
        for (var i = 0, list = node.properties; i < list.length; i += 1) {
          var prop = list[i];
          this.toAssignable(prop, isBinding), prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern") && this.raise(prop.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        node.kind !== "init" && this.raise(node.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(node.value, isBinding);
        break;
      case "ArrayExpression":
        node.type = "ArrayPattern", refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, true), this.toAssignableList(node.elements, isBinding);
        break;
      case "SpreadElement":
        node.type = "RestElement", this.toAssignable(node.argument, isBinding), node.argument.type === "AssignmentPattern" && this.raise(node.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        node.operator !== "=" && this.raise(node.left.end, "Only '=' operator can be used for specifying default value."), node.type = "AssignmentPattern", delete node.operator, this.toAssignable(node.left, isBinding);
      case "AssignmentPattern":
        break;
      case "ParenthesizedExpression":
        this.toAssignable(node.expression, isBinding, refDestructuringErrors);
        break;
      case "ChainExpression":
        this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!isBinding) break;
      default:
        this.raise(node.start, "Assigning to rvalue");
    }
    else refDestructuringErrors && this.checkPatternErrors(refDestructuringErrors, true);
    return node;
  };
  pp$2.toAssignableList = function(exprList, isBinding) {
    for (var end = exprList.length, i = 0; i < end; i++) {
      var elt = exprList[i];
      elt && this.toAssignable(elt, isBinding);
    }
    if (end) {
      var last = exprList[end - 1];
      this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier" && this.unexpected(last.argument.start);
    }
    return exprList;
  };
  pp$2.parseSpread = function(refDestructuringErrors) {
    var node = this.startNode();
    return this.next(), node.argument = this.parseMaybeAssign(false, refDestructuringErrors), this.finishNode(node, "SpreadElement");
  };
  pp$2.parseRestBinding = function() {
    var node = this.startNode();
    return this.next(), this.options.ecmaVersion === 6 && this.type !== types.name && this.unexpected(), node.argument = this.parseBindingAtom(), this.finishNode(node, "RestElement");
  };
  pp$2.parseBindingAtom = function() {
    if (this.options.ecmaVersion >= 6) switch (this.type) {
      case types.bracketL:
        var node = this.startNode();
        return this.next(), node.elements = this.parseBindingList(types.bracketR, true, true), this.finishNode(node, "ArrayPattern");
      case types.braceL:
        return this.parseObj(true);
    }
    return this.parseIdent();
  };
  pp$2.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
    for (var elts = [], first = true; !this.eat(close); ) if (first ? first = false : this.expect(types.comma), allowEmpty && this.type === types.comma) elts.push(null);
    else {
      if (allowTrailingComma && this.afterTrailingComma(close)) break;
      if (this.type === types.ellipsis) {
        var rest = this.parseRestBinding();
        this.parseBindingListItem(rest), elts.push(rest), this.type === types.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.expect(close);
        break;
      } else {
        var elem = this.parseMaybeDefault(this.start, this.startLoc);
        this.parseBindingListItem(elem), elts.push(elem);
      }
    }
    return elts;
  };
  pp$2.parseBindingListItem = function(param) {
    return param;
  };
  pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
    if (left = left || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(types.eq)) return left;
    var node = this.startNodeAt(startPos, startLoc);
    return node.left = left, node.right = this.parseMaybeAssign(), this.finishNode(node, "AssignmentPattern");
  };
  pp$2.checkLVal = function(expr, bindingType, checkClashes) {
    switch (bindingType === void 0 && (bindingType = BIND_NONE), expr.type) {
      case "Identifier":
        bindingType === BIND_LEXICAL && expr.name === "let" && this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name"), this.strict && this.reservedWordsStrictBind.test(expr.name) && this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode"), checkClashes && (has(checkClashes, expr.name) && this.raiseRecoverable(expr.start, "Argument name clash"), checkClashes[expr.name] = true), bindingType !== BIND_NONE && bindingType !== BIND_OUTSIDE && this.declareName(expr.name, bindingType, expr.start);
        break;
      case "ChainExpression":
        this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        bindingType && this.raiseRecoverable(expr.start, "Binding member expression");
        break;
      case "ObjectPattern":
        for (var i = 0, list = expr.properties; i < list.length; i += 1) {
          var prop = list[i];
          this.checkLVal(prop, bindingType, checkClashes);
        }
        break;
      case "Property":
        this.checkLVal(expr.value, bindingType, checkClashes);
        break;
      case "ArrayPattern":
        for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
          var elem = list$1[i$1];
          elem && this.checkLVal(elem, bindingType, checkClashes);
        }
        break;
      case "AssignmentPattern":
        this.checkLVal(expr.left, bindingType, checkClashes);
        break;
      case "RestElement":
        this.checkLVal(expr.argument, bindingType, checkClashes);
        break;
      case "ParenthesizedExpression":
        this.checkLVal(expr.expression, bindingType, checkClashes);
        break;
      default:
        this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
    }
  };
  pp$3 = Parser.prototype;
  pp$3.checkPropClash = function(prop, propHash, refDestructuringErrors) {
    if (!(this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))) {
      var key = prop.key, name;
      switch (key.type) {
        case "Identifier":
          name = key.name;
          break;
        case "Literal":
          name = String(key.value);
          break;
        default:
          return;
      }
      var kind = prop.kind;
      if (this.options.ecmaVersion >= 6) {
        name === "__proto__" && kind === "init" && (propHash.proto && (refDestructuringErrors ? refDestructuringErrors.doubleProto < 0 && (refDestructuringErrors.doubleProto = key.start) : this.raiseRecoverable(key.start, "Redefinition of __proto__ property")), propHash.proto = true);
        return;
      }
      name = "$" + name;
      var other = propHash[name];
      if (other) {
        var redefinition;
        kind === "init" ? redefinition = this.strict && other.init || other.get || other.set : redefinition = other.init || other[kind], redefinition && this.raiseRecoverable(key.start, "Redefinition of property");
      } else other = propHash[name] = { init: false, get: false, set: false };
      other[kind] = true;
    }
  };
  pp$3.parseExpression = function(noIn, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc, expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
    if (this.type === types.comma) {
      var node = this.startNodeAt(startPos, startLoc);
      for (node.expressions = [expr]; this.eat(types.comma); ) node.expressions.push(this.parseMaybeAssign(noIn, refDestructuringErrors));
      return this.finishNode(node, "SequenceExpression");
    }
    return expr;
  };
  pp$3.parseMaybeAssign = function(noIn, refDestructuringErrors, afterLeftParse) {
    if (this.isContextual("yield")) {
      if (this.inGenerator) return this.parseYield(noIn);
      this.exprAllowed = false;
    }
    var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1;
    refDestructuringErrors ? (oldParenAssign = refDestructuringErrors.parenthesizedAssign, oldTrailingComma = refDestructuringErrors.trailingComma, refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1) : (refDestructuringErrors = new DestructuringErrors(), ownDestructuringErrors = true);
    var startPos = this.start, startLoc = this.startLoc;
    (this.type === types.parenL || this.type === types.name) && (this.potentialArrowAt = this.start);
    var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
    if (afterLeftParse && (left = afterLeftParse.call(this, left, startPos, startLoc)), this.type.isAssign) {
      var node = this.startNodeAt(startPos, startLoc);
      return node.operator = this.value, node.left = this.type === types.eq ? this.toAssignable(left, false, refDestructuringErrors) : left, ownDestructuringErrors || (refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1), refDestructuringErrors.shorthandAssign >= node.left.start && (refDestructuringErrors.shorthandAssign = -1), this.checkLVal(left), this.next(), node.right = this.parseMaybeAssign(noIn), this.finishNode(node, "AssignmentExpression");
    } else ownDestructuringErrors && this.checkExpressionErrors(refDestructuringErrors, true);
    return oldParenAssign > -1 && (refDestructuringErrors.parenthesizedAssign = oldParenAssign), oldTrailingComma > -1 && (refDestructuringErrors.trailingComma = oldTrailingComma), left;
  };
  pp$3.parseMaybeConditional = function(noIn, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc, expr = this.parseExprOps(noIn, refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
    if (this.eat(types.question)) {
      var node = this.startNodeAt(startPos, startLoc);
      return node.test = expr, node.consequent = this.parseMaybeAssign(), this.expect(types.colon), node.alternate = this.parseMaybeAssign(noIn), this.finishNode(node, "ConditionalExpression");
    }
    return expr;
  };
  pp$3.parseExprOps = function(noIn, refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc, expr = this.parseMaybeUnary(refDestructuringErrors, false);
    return this.checkExpressionErrors(refDestructuringErrors) || expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn);
  };
  pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
    var prec = this.type.binop;
    if (prec != null && (!noIn || this.type !== types._in) && prec > minPrec) {
      var logical = this.type === types.logicalOR || this.type === types.logicalAND, coalesce = this.type === types.coalesce;
      coalesce && (prec = types.logicalAND.binop);
      var op = this.value;
      this.next();
      var startPos = this.start, startLoc = this.startLoc, right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn), node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
      return (logical && this.type === types.coalesce || coalesce && (this.type === types.logicalOR || this.type === types.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
    }
    return left;
  };
  pp$3.buildBinary = function(startPos, startLoc, left, right, op, logical) {
    var node = this.startNodeAt(startPos, startLoc);
    return node.left = left, node.operator = op, node.right = right, this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
  };
  pp$3.parseMaybeUnary = function(refDestructuringErrors, sawUnary) {
    var startPos = this.start, startLoc = this.startLoc, expr;
    if (this.isContextual("await") && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction)) expr = this.parseAwait(), sawUnary = true;
    else if (this.type.prefix) {
      var node = this.startNode(), update = this.type === types.incDec;
      node.operator = this.value, node.prefix = true, this.next(), node.argument = this.parseMaybeUnary(null, true), this.checkExpressionErrors(refDestructuringErrors, true), update ? this.checkLVal(node.argument) : this.strict && node.operator === "delete" && node.argument.type === "Identifier" ? this.raiseRecoverable(node.start, "Deleting local variable in strict mode") : sawUnary = true, expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
    } else {
      if (expr = this.parseExprSubscripts(refDestructuringErrors), this.checkExpressionErrors(refDestructuringErrors)) return expr;
      for (; this.type.postfix && !this.canInsertSemicolon(); ) {
        var node$1 = this.startNodeAt(startPos, startLoc);
        node$1.operator = this.value, node$1.prefix = false, node$1.argument = expr, this.checkLVal(expr), this.next(), expr = this.finishNode(node$1, "UpdateExpression");
      }
    }
    return !sawUnary && this.eat(types.starstar) ? this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false) : expr;
  };
  pp$3.parseExprSubscripts = function(refDestructuringErrors) {
    var startPos = this.start, startLoc = this.startLoc, expr = this.parseExprAtom(refDestructuringErrors);
    if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") return expr;
    var result = this.parseSubscripts(expr, startPos, startLoc);
    return refDestructuringErrors && result.type === "MemberExpression" && (refDestructuringErrors.parenthesizedAssign >= result.start && (refDestructuringErrors.parenthesizedAssign = -1), refDestructuringErrors.parenthesizedBind >= result.start && (refDestructuringErrors.parenthesizedBind = -1)), result;
  };
  pp$3.parseSubscripts = function(base2, startPos, startLoc, noCalls) {
    for (var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base2.type === "Identifier" && base2.name === "async" && this.lastTokEnd === base2.end && !this.canInsertSemicolon() && base2.end - base2.start === 5 && this.potentialArrowAt === base2.start, optionalChained = false; ; ) {
      var element = this.parseSubscript(base2, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained);
      if (element.optional && (optionalChained = true), element === base2 || element.type === "ArrowFunctionExpression") {
        if (optionalChained) {
          var chainNode = this.startNodeAt(startPos, startLoc);
          chainNode.expression = element, element = this.finishNode(chainNode, "ChainExpression");
        }
        return element;
      }
      base2 = element;
    }
  };
  pp$3.parseSubscript = function(base2, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained) {
    var optionalSupported = this.options.ecmaVersion >= 11, optional = optionalSupported && this.eat(types.questionDot);
    noCalls && optional && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
    var computed = this.eat(types.bracketL);
    if (computed || optional && this.type !== types.parenL && this.type !== types.backQuote || this.eat(types.dot)) {
      var node = this.startNodeAt(startPos, startLoc);
      node.object = base2, node.property = computed ? this.parseExpression() : this.parseIdent(this.options.allowReserved !== "never"), node.computed = !!computed, computed && this.expect(types.bracketR), optionalSupported && (node.optional = optional), base2 = this.finishNode(node, "MemberExpression");
    } else if (!noCalls && this.eat(types.parenL)) {
      var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
      this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
      var exprList = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
      if (maybeAsyncArrow && !optional && !this.canInsertSemicolon() && this.eat(types.arrow)) return this.checkPatternErrors(refDestructuringErrors, false), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true);
      this.checkExpressionErrors(refDestructuringErrors, true), this.yieldPos = oldYieldPos || this.yieldPos, this.awaitPos = oldAwaitPos || this.awaitPos, this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
      var node$1 = this.startNodeAt(startPos, startLoc);
      node$1.callee = base2, node$1.arguments = exprList, optionalSupported && (node$1.optional = optional), base2 = this.finishNode(node$1, "CallExpression");
    } else if (this.type === types.backQuote) {
      (optional || optionalChained) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
      var node$2 = this.startNodeAt(startPos, startLoc);
      node$2.tag = base2, node$2.quasi = this.parseTemplate({ isTagged: true }), base2 = this.finishNode(node$2, "TaggedTemplateExpression");
    }
    return base2;
  };
  pp$3.parseExprAtom = function(refDestructuringErrors) {
    this.type === types.slash && this.readRegexp();
    var node, canBeArrow = this.potentialArrowAt === this.start;
    switch (this.type) {
      case types._super:
        return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), node = this.startNode(), this.next(), this.type === types.parenL && !this.allowDirectSuper && this.raise(node.start, "super() call outside constructor of a subclass"), this.type !== types.dot && this.type !== types.bracketL && this.type !== types.parenL && this.unexpected(), this.finishNode(node, "Super");
      case types._this:
        return node = this.startNode(), this.next(), this.finishNode(node, "ThisExpression");
      case types.name:
        var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc, id = this.parseIdent(false);
        if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types._function)) return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true);
        if (canBeArrow && !this.canInsertSemicolon()) {
          if (this.eat(types.arrow)) return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false);
          if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types.name && !containsEsc) return id = this.parseIdent(false), (this.canInsertSemicolon() || !this.eat(types.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true);
        }
        return id;
      case types.regexp:
        var value = this.value;
        return node = this.parseLiteral(value.value), node.regex = { pattern: value.pattern, flags: value.flags }, node;
      case types.num:
      case types.string:
        return this.parseLiteral(this.value);
      case types._null:
      case types._true:
      case types._false:
        return node = this.startNode(), node.value = this.type === types._null ? null : this.type === types._true, node.raw = this.type.keyword, this.next(), this.finishNode(node, "Literal");
      case types.parenL:
        var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow);
        return refDestructuringErrors && (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr) && (refDestructuringErrors.parenthesizedAssign = start), refDestructuringErrors.parenthesizedBind < 0 && (refDestructuringErrors.parenthesizedBind = start)), expr;
      case types.bracketL:
        return node = this.startNode(), this.next(), node.elements = this.parseExprList(types.bracketR, true, true, refDestructuringErrors), this.finishNode(node, "ArrayExpression");
      case types.braceL:
        return this.parseObj(false, refDestructuringErrors);
      case types._function:
        return node = this.startNode(), this.next(), this.parseFunction(node, 0);
      case types._class:
        return this.parseClass(this.startNode(), false);
      case types._new:
        return this.parseNew();
      case types.backQuote:
        return this.parseTemplate();
      case types._import:
        return this.options.ecmaVersion >= 11 ? this.parseExprImport() : this.unexpected();
      default:
        this.unexpected();
    }
  };
  pp$3.parseExprImport = function() {
    var node = this.startNode();
    this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import");
    var meta = this.parseIdent(true);
    switch (this.type) {
      case types.parenL:
        return this.parseDynamicImport(node);
      case types.dot:
        return node.meta = meta, this.parseImportMeta(node);
      default:
        this.unexpected();
    }
  };
  pp$3.parseDynamicImport = function(node) {
    if (this.next(), node.source = this.parseMaybeAssign(), !this.eat(types.parenR)) {
      var errorPos = this.start;
      this.eat(types.comma) && this.eat(types.parenR) ? this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()") : this.unexpected(errorPos);
    }
    return this.finishNode(node, "ImportExpression");
  };
  pp$3.parseImportMeta = function(node) {
    this.next();
    var containsEsc = this.containsEsc;
    return node.property = this.parseIdent(true), node.property.name !== "meta" && this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'"), containsEsc && this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module"), this.finishNode(node, "MetaProperty");
  };
  pp$3.parseLiteral = function(value) {
    var node = this.startNode();
    return node.value = value, node.raw = this.input.slice(this.start, this.end), node.raw.charCodeAt(node.raw.length - 1) === 110 && (node.bigint = node.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(node, "Literal");
  };
  pp$3.parseParenExpression = function() {
    this.expect(types.parenL);
    var val = this.parseExpression();
    return this.expect(types.parenR), val;
  };
  pp$3.parseParenAndDistinguishExpression = function(canBeArrow) {
    var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
    if (this.options.ecmaVersion >= 6) {
      this.next();
      var innerStartPos = this.start, innerStartLoc = this.startLoc, exprList = [], first = true, lastIsComma = false, refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
      for (this.yieldPos = 0, this.awaitPos = 0; this.type !== types.parenR; ) if (first ? first = false : this.expect(types.comma), allowTrailingComma && this.afterTrailingComma(types.parenR, true)) {
        lastIsComma = true;
        break;
      } else if (this.type === types.ellipsis) {
        spreadStart = this.start, exprList.push(this.parseParenItem(this.parseRestBinding())), this.type === types.comma && this.raise(this.start, "Comma is not permitted after the rest element");
        break;
      } else exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
      var innerEndPos = this.start, innerEndLoc = this.startLoc;
      if (this.expect(types.parenR), canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) return this.checkPatternErrors(refDestructuringErrors, false), this.checkYieldAwaitInDefaultParams(), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.parseParenArrowList(startPos, startLoc, exprList);
      (!exprList.length || lastIsComma) && this.unexpected(this.lastTokStart), spreadStart && this.unexpected(spreadStart), this.checkExpressionErrors(refDestructuringErrors, true), this.yieldPos = oldYieldPos || this.yieldPos, this.awaitPos = oldAwaitPos || this.awaitPos, exprList.length > 1 ? (val = this.startNodeAt(innerStartPos, innerStartLoc), val.expressions = exprList, this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc)) : val = exprList[0];
    } else val = this.parseParenExpression();
    if (this.options.preserveParens) {
      var par = this.startNodeAt(startPos, startLoc);
      return par.expression = val, this.finishNode(par, "ParenthesizedExpression");
    } else return val;
  };
  pp$3.parseParenItem = function(item) {
    return item;
  };
  pp$3.parseParenArrowList = function(startPos, startLoc, exprList) {
    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
  };
  empty$1 = [];
  pp$3.parseNew = function() {
    this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
    var node = this.startNode(), meta = this.parseIdent(true);
    if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
      node.meta = meta;
      var containsEsc = this.containsEsc;
      return node.property = this.parseIdent(true), node.property.name !== "target" && this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'"), containsEsc && this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters"), this.inNonArrowFunction() || this.raiseRecoverable(node.start, "'new.target' can only be used in functions"), this.finishNode(node, "MetaProperty");
    }
    var startPos = this.start, startLoc = this.startLoc, isImport = this.type === types._import;
    return node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true), isImport && node.callee.type === "ImportExpression" && this.raise(startPos, "Cannot use new with import()"), this.eat(types.parenL) ? node.arguments = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false) : node.arguments = empty$1, this.finishNode(node, "NewExpression");
  };
  pp$3.parseTemplateElement = function(ref2) {
    var isTagged = ref2.isTagged, elem = this.startNode();
    return this.type === types.invalidTemplate ? (isTagged || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), elem.value = { raw: this.value, cooked: null }) : elem.value = { raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`), cooked: this.value }, this.next(), elem.tail = this.type === types.backQuote, this.finishNode(elem, "TemplateElement");
  };
  pp$3.parseTemplate = function(ref2) {
    ref2 === void 0 && (ref2 = {});
    var isTagged = ref2.isTagged;
    isTagged === void 0 && (isTagged = false);
    var node = this.startNode();
    this.next(), node.expressions = [];
    var curElt = this.parseTemplateElement({ isTagged });
    for (node.quasis = [curElt]; !curElt.tail; ) this.type === types.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(types.dollarBraceL), node.expressions.push(this.parseExpression()), this.expect(types.braceR), node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
    return this.next(), this.finishNode(node, "TemplateLiteral");
  };
  pp$3.isAsyncProp = function(prop) {
    return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types.name || this.type === types.num || this.type === types.string || this.type === types.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  };
  pp$3.parseObj = function(isPattern, refDestructuringErrors) {
    var node = this.startNode(), first = true, propHash = {};
    for (node.properties = [], this.next(); !this.eat(types.braceR); ) {
      if (first) first = false;
      else if (this.expect(types.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(types.braceR)) break;
      var prop = this.parseProperty(isPattern, refDestructuringErrors);
      isPattern || this.checkPropClash(prop, propHash, refDestructuringErrors), node.properties.push(prop);
    }
    return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
  };
  pp$3.parseProperty = function(isPattern, refDestructuringErrors) {
    var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
    if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) return isPattern ? (prop.argument = this.parseIdent(false), this.type === types.comma && this.raise(this.start, "Comma is not permitted after the rest element"), this.finishNode(prop, "RestElement")) : (this.type === types.parenL && refDestructuringErrors && (refDestructuringErrors.parenthesizedAssign < 0 && (refDestructuringErrors.parenthesizedAssign = this.start), refDestructuringErrors.parenthesizedBind < 0 && (refDestructuringErrors.parenthesizedBind = this.start)), prop.argument = this.parseMaybeAssign(false, refDestructuringErrors), this.type === types.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0 && (refDestructuringErrors.trailingComma = this.start), this.finishNode(prop, "SpreadElement"));
    this.options.ecmaVersion >= 6 && (prop.method = false, prop.shorthand = false, (isPattern || refDestructuringErrors) && (startPos = this.start, startLoc = this.startLoc), isPattern || (isGenerator = this.eat(types.star)));
    var containsEsc = this.containsEsc;
    return this.parsePropertyName(prop), !isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop) ? (isAsync = true, isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star), this.parsePropertyName(prop, refDestructuringErrors)) : isAsync = false, this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc), this.finishNode(prop, "Property");
  };
  pp$3.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
    if ((isGenerator || isAsync) && this.type === types.colon && this.unexpected(), this.eat(types.colon)) prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors), prop.kind = "init";
    else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) isPattern && this.unexpected(), prop.kind = "init", prop.method = true, prop.value = this.parseMethod(isGenerator, isAsync);
    else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type !== types.comma && this.type !== types.braceR && this.type !== types.eq) {
      (isGenerator || isAsync) && this.unexpected(), prop.kind = prop.key.name, this.parsePropertyName(prop), prop.value = this.parseMethod(false);
      var paramCount = prop.kind === "get" ? 0 : 1;
      if (prop.value.params.length !== paramCount) {
        var start = prop.value.start;
        prop.kind === "get" ? this.raiseRecoverable(start, "getter should have no params") : this.raiseRecoverable(start, "setter should have exactly one param");
      } else prop.kind === "set" && prop.value.params[0].type === "RestElement" && this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
    } else this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier" ? ((isGenerator || isAsync) && this.unexpected(), this.checkUnreserved(prop.key), prop.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = startPos), prop.kind = "init", isPattern ? prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key) : this.type === types.eq && refDestructuringErrors ? (refDestructuringErrors.shorthandAssign < 0 && (refDestructuringErrors.shorthandAssign = this.start), prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key)) : prop.value = prop.key, prop.shorthand = true) : this.unexpected();
  };
  pp$3.parsePropertyName = function(prop) {
    if (this.options.ecmaVersion >= 6) {
      if (this.eat(types.bracketL)) return prop.computed = true, prop.key = this.parseMaybeAssign(), this.expect(types.bracketR), prop.key;
      prop.computed = false;
    }
    return prop.key = this.type === types.num || this.type === types.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
  };
  pp$3.initFunction = function(node) {
    node.id = null, this.options.ecmaVersion >= 6 && (node.generator = node.expression = false), this.options.ecmaVersion >= 8 && (node.async = false);
  };
  pp$3.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
    var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    return this.initFunction(node), this.options.ecmaVersion >= 6 && (node.generator = isGenerator), this.options.ecmaVersion >= 8 && (node.async = !!isAsync), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0)), this.expect(types.parenL), node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(node, false, true), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node, "FunctionExpression");
  };
  pp$3.parseArrowExpression = function(node, params, isAsync) {
    var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
    return this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW), this.initFunction(node), this.options.ecmaVersion >= 8 && (node.async = !!isAsync), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, node.params = this.toAssignableList(params, true), this.parseFunctionBody(node, true, false), this.yieldPos = oldYieldPos, this.awaitPos = oldAwaitPos, this.awaitIdentPos = oldAwaitIdentPos, this.finishNode(node, "ArrowFunctionExpression");
  };
  pp$3.parseFunctionBody = function(node, isArrowFunction, isMethod) {
    var isExpression = isArrowFunction && this.type !== types.braceL, oldStrict = this.strict, useStrict = false;
    if (isExpression) node.body = this.parseMaybeAssign(), node.expression = true, this.checkParams(node, false);
    else {
      var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
      (!oldStrict || nonSimple) && (useStrict = this.strictDirective(this.end), useStrict && nonSimple && this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
      var oldLabels = this.labels;
      this.labels = [], useStrict && (this.strict = true), this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params)), this.strict && node.id && this.checkLVal(node.id, BIND_OUTSIDE), node.body = this.parseBlock(false, void 0, useStrict && !oldStrict), node.expression = false, this.adaptDirectivePrologue(node.body.body), this.labels = oldLabels;
    }
    this.exitScope();
  };
  pp$3.isSimpleParamList = function(params) {
    for (var i = 0, list = params; i < list.length; i += 1) {
      var param = list[i];
      if (param.type !== "Identifier") return false;
    }
    return true;
  };
  pp$3.checkParams = function(node, allowDuplicates) {
    for (var nameHash = {}, i = 0, list = node.params; i < list.length; i += 1) {
      var param = list[i];
      this.checkLVal(param, BIND_VAR, allowDuplicates ? null : nameHash);
    }
  };
  pp$3.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
    for (var elts = [], first = true; !this.eat(close); ) {
      if (first) first = false;
      else if (this.expect(types.comma), allowTrailingComma && this.afterTrailingComma(close)) break;
      var elt = void 0;
      allowEmpty && this.type === types.comma ? elt = null : this.type === types.ellipsis ? (elt = this.parseSpread(refDestructuringErrors), refDestructuringErrors && this.type === types.comma && refDestructuringErrors.trailingComma < 0 && (refDestructuringErrors.trailingComma = this.start)) : elt = this.parseMaybeAssign(false, refDestructuringErrors), elts.push(elt);
    }
    return elts;
  };
  pp$3.checkUnreserved = function(ref2) {
    var start = ref2.start, end = ref2.end, name = ref2.name;
    if (this.inGenerator && name === "yield" && this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && name === "await" && this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function"), this.keywords.test(name) && this.raise(start, "Unexpected keyword '" + name + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1)) {
      var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
      re.test(name) && (!this.inAsync && name === "await" && this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(start, "The keyword '" + name + "' is reserved"));
    }
  };
  pp$3.parseIdent = function(liberal, isBinding) {
    var node = this.startNode();
    return this.type === types.name ? node.name = this.value : this.type.keyword ? (node.name = this.type.keyword, (node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop()) : this.unexpected(), this.next(!!liberal), this.finishNode(node, "Identifier"), liberal || (this.checkUnreserved(node), node.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = node.start)), node;
  };
  pp$3.parseYield = function(noIn) {
    this.yieldPos || (this.yieldPos = this.start);
    var node = this.startNode();
    return this.next(), this.type === types.semi || this.canInsertSemicolon() || this.type !== types.star && !this.type.startsExpr ? (node.delegate = false, node.argument = null) : (node.delegate = this.eat(types.star), node.argument = this.parseMaybeAssign(noIn)), this.finishNode(node, "YieldExpression");
  };
  pp$3.parseAwait = function() {
    this.awaitPos || (this.awaitPos = this.start);
    var node = this.startNode();
    return this.next(), node.argument = this.parseMaybeUnary(null, false), this.finishNode(node, "AwaitExpression");
  };
  pp$4 = Parser.prototype;
  pp$4.raise = function(pos, message) {
    var loc = getLineInfo(this.input, pos);
    message += " (" + loc.line + ":" + loc.column + ")";
    var err = new SyntaxError(message);
    throw err.pos = pos, err.loc = loc, err.raisedAt = this.pos, err;
  };
  pp$4.raiseRecoverable = pp$4.raise;
  pp$4.curPosition = function() {
    if (this.options.locations) return new Position(this.curLine, this.pos - this.lineStart);
  };
  pp$5 = Parser.prototype, Scope = function(flags) {
    this.flags = flags, this.var = [], this.lexical = [], this.functions = [];
  };
  pp$5.enterScope = function(flags) {
    this.scopeStack.push(new Scope(flags));
  };
  pp$5.exitScope = function() {
    this.scopeStack.pop();
  };
  pp$5.treatFunctionsAsVarInScope = function(scope) {
    return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
  };
  pp$5.declareName = function(name, bindingType, pos) {
    var redeclared = false;
    if (bindingType === BIND_LEXICAL) {
      var scope = this.currentScope();
      redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1, scope.lexical.push(name), this.inModule && scope.flags & SCOPE_TOP && delete this.undefinedExports[name];
    } else if (bindingType === BIND_SIMPLE_CATCH) {
      var scope$1 = this.currentScope();
      scope$1.lexical.push(name);
    } else if (bindingType === BIND_FUNCTION) {
      var scope$2 = this.currentScope();
      this.treatFunctionsAsVar ? redeclared = scope$2.lexical.indexOf(name) > -1 : redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1, scope$2.functions.push(name);
    } else for (var i = this.scopeStack.length - 1; i >= 0; --i) {
      var scope$3 = this.scopeStack[i];
      if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
        redeclared = true;
        break;
      }
      if (scope$3.var.push(name), this.inModule && scope$3.flags & SCOPE_TOP && delete this.undefinedExports[name], scope$3.flags & SCOPE_VAR) break;
    }
    redeclared && this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
  };
  pp$5.checkLocalExport = function(id) {
    this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1 && (this.undefinedExports[id.name] = id);
  };
  pp$5.currentScope = function() {
    return this.scopeStack[this.scopeStack.length - 1];
  };
  pp$5.currentVarScope = function() {
    for (var i = this.scopeStack.length - 1; ; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & SCOPE_VAR) return scope;
    }
  };
  pp$5.currentThisScope = function() {
    for (var i = this.scopeStack.length - 1; ; i--) {
      var scope = this.scopeStack[i];
      if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) return scope;
    }
  };
  Node = function(parser, pos, loc) {
    this.type = "", this.start = pos, this.end = 0, parser.options.locations && (this.loc = new SourceLocation(parser, loc)), parser.options.directSourceFile && (this.sourceFile = parser.options.directSourceFile), parser.options.ranges && (this.range = [pos, 0]);
  }, pp$6 = Parser.prototype;
  pp$6.startNode = function() {
    return new Node(this, this.start, this.startLoc);
  };
  pp$6.startNodeAt = function(pos, loc) {
    return new Node(this, pos, loc);
  };
  pp$6.finishNode = function(node, type) {
    return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
  };
  pp$6.finishNodeAt = function(node, type, pos, loc) {
    return finishNodeAt.call(this, node, type, pos, loc);
  };
  TokContext = function(token, isExpr, preserveSpace, override, generator) {
    this.token = token, this.isExpr = !!isExpr, this.preserveSpace = !!preserveSpace, this.override = override, this.generator = !!generator;
  }, types$1 = { b_stat: new TokContext("{", false), b_expr: new TokContext("{", true), b_tmpl: new TokContext("${", false), p_stat: new TokContext("(", false), p_expr: new TokContext("(", true), q_tmpl: new TokContext("`", true, true, function(p) {
    return p.tryReadTemplateToken();
  }), f_stat: new TokContext("function", false), f_expr: new TokContext("function", true), f_expr_gen: new TokContext("function", true, false, null, true), f_gen: new TokContext("function", false, false, null, true) }, pp$7 = Parser.prototype;
  pp$7.initialContext = function() {
    return [types$1.b_stat];
  };
  pp$7.braceIsBlock = function(prevType) {
    var parent = this.curContext();
    return parent === types$1.f_expr || parent === types$1.f_stat ? true : prevType === types.colon && (parent === types$1.b_stat || parent === types$1.b_expr) ? !parent.isExpr : prevType === types._return || prevType === types.name && this.exprAllowed ? lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) : prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType === types.arrow ? true : prevType === types.braceL ? parent === types$1.b_stat : prevType === types._var || prevType === types._const || prevType === types.name ? false : !this.exprAllowed;
  };
  pp$7.inGeneratorContext = function() {
    for (var i = this.context.length - 1; i >= 1; i--) {
      var context = this.context[i];
      if (context.token === "function") return context.generator;
    }
    return false;
  };
  pp$7.updateContext = function(prevType) {
    var update, type = this.type;
    type.keyword && prevType === types.dot ? this.exprAllowed = false : (update = type.updateContext) ? update.call(this, prevType) : this.exprAllowed = type.beforeExpr;
  };
  types.parenR.updateContext = types.braceR.updateContext = function() {
    if (this.context.length === 1) {
      this.exprAllowed = true;
      return;
    }
    var out = this.context.pop();
    out === types$1.b_stat && this.curContext().token === "function" && (out = this.context.pop()), this.exprAllowed = !out.isExpr;
  };
  types.braceL.updateContext = function(prevType) {
    this.context.push(this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr), this.exprAllowed = true;
  };
  types.dollarBraceL.updateContext = function() {
    this.context.push(types$1.b_tmpl), this.exprAllowed = true;
  };
  types.parenL.updateContext = function(prevType) {
    var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
    this.context.push(statementParens ? types$1.p_stat : types$1.p_expr), this.exprAllowed = true;
  };
  types.incDec.updateContext = function() {
  };
  types._function.updateContext = types._class.updateContext = function(prevType) {
    prevType.beforeExpr && prevType !== types.semi && prevType !== types._else && !(prevType === types._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat) ? this.context.push(types$1.f_expr) : this.context.push(types$1.f_stat), this.exprAllowed = false;
  };
  types.backQuote.updateContext = function() {
    this.curContext() === types$1.q_tmpl ? this.context.pop() : this.context.push(types$1.q_tmpl), this.exprAllowed = false;
  };
  types.star.updateContext = function(prevType) {
    if (prevType === types._function) {
      var index = this.context.length - 1;
      this.context[index] === types$1.f_expr ? this.context[index] = types$1.f_expr_gen : this.context[index] = types$1.f_gen;
    }
    this.exprAllowed = true;
  };
  types.name.updateContext = function(prevType) {
    var allowed = false;
    this.options.ecmaVersion >= 6 && prevType !== types.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (allowed = true), this.exprAllowed = allowed;
  };
  ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic", ecma11BinaryProperties = ecma10BinaryProperties, unicodeBinaryProperties = { 9: ecma9BinaryProperties, 10: ecma10BinaryProperties, 11: ecma11BinaryProperties }, unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", ecma9ScriptValues = "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", unicodeScriptValues = { 9: ecma9ScriptValues, 10: ecma10ScriptValues, 11: ecma11ScriptValues }, data = {};
  buildUnicodeData(9);
  buildUnicodeData(10);
  buildUnicodeData(11);
  pp$8 = Parser.prototype, RegExpValidationState = function(parser) {
    this.parser = parser, this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : ""), this.unicodeProperties = data[parser.options.ecmaVersion >= 11 ? 11 : parser.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = false, this.switchN = false, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = false, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = [], this.backReferenceNames = [];
  };
  RegExpValidationState.prototype.reset = function(start, pattern, flags) {
    var unicode = flags.indexOf("u") !== -1;
    this.start = start | 0, this.source = pattern + "", this.flags = flags, this.switchU = unicode && this.parser.options.ecmaVersion >= 6, this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
  };
  RegExpValidationState.prototype.raise = function(message) {
    this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
  };
  RegExpValidationState.prototype.at = function(i, forceU) {
    forceU === void 0 && (forceU = false);
    var s = this.source, l2 = s.length;
    if (i >= l2) return -1;
    var c = s.charCodeAt(i);
    if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l2) return c;
    var next = s.charCodeAt(i + 1);
    return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
  };
  RegExpValidationState.prototype.nextIndex = function(i, forceU) {
    forceU === void 0 && (forceU = false);
    var s = this.source, l2 = s.length;
    if (i >= l2) return l2;
    var c = s.charCodeAt(i), next;
    return !(forceU || this.switchU) || c <= 55295 || c >= 57344 || i + 1 >= l2 || (next = s.charCodeAt(i + 1)) < 56320 || next > 57343 ? i + 1 : i + 2;
  };
  RegExpValidationState.prototype.current = function(forceU) {
    return forceU === void 0 && (forceU = false), this.at(this.pos, forceU);
  };
  RegExpValidationState.prototype.lookahead = function(forceU) {
    return forceU === void 0 && (forceU = false), this.at(this.nextIndex(this.pos, forceU), forceU);
  };
  RegExpValidationState.prototype.advance = function(forceU) {
    forceU === void 0 && (forceU = false), this.pos = this.nextIndex(this.pos, forceU);
  };
  RegExpValidationState.prototype.eat = function(ch, forceU) {
    return forceU === void 0 && (forceU = false), this.current(forceU) === ch ? (this.advance(forceU), true) : false;
  };
  pp$8.validateRegExpFlags = function(state) {
    for (var validFlags = state.validFlags, flags = state.flags, i = 0; i < flags.length; i++) {
      var flag = flags.charAt(i);
      validFlags.indexOf(flag) === -1 && this.raise(state.start, "Invalid regular expression flag"), flags.indexOf(flag, i + 1) > -1 && this.raise(state.start, "Duplicate regular expression flag");
    }
  };
  pp$8.validateRegExpPattern = function(state) {
    this.regexp_pattern(state), !state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0 && (state.switchN = true, this.regexp_pattern(state));
  };
  pp$8.regexp_pattern = function(state) {
    state.pos = 0, state.lastIntValue = 0, state.lastStringValue = "", state.lastAssertionIsQuantifiable = false, state.numCapturingParens = 0, state.maxBackReference = 0, state.groupNames.length = 0, state.backReferenceNames.length = 0, this.regexp_disjunction(state), state.pos !== state.source.length && (state.eat(41) && state.raise("Unmatched ')'"), (state.eat(93) || state.eat(125)) && state.raise("Lone quantifier brackets")), state.maxBackReference > state.numCapturingParens && state.raise("Invalid escape");
    for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
      var name = list[i];
      state.groupNames.indexOf(name) === -1 && state.raise("Invalid named capture referenced");
    }
  };
  pp$8.regexp_disjunction = function(state) {
    for (this.regexp_alternative(state); state.eat(124); ) this.regexp_alternative(state);
    this.regexp_eatQuantifier(state, true) && state.raise("Nothing to repeat"), state.eat(123) && state.raise("Lone quantifier brackets");
  };
  pp$8.regexp_alternative = function(state) {
    for (; state.pos < state.source.length && this.regexp_eatTerm(state); ) ;
  };
  pp$8.regexp_eatTerm = function(state) {
    return this.regexp_eatAssertion(state) ? (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state) && state.switchU && state.raise("Invalid quantifier"), true) : (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) ? (this.regexp_eatQuantifier(state), true) : false;
  };
  pp$8.regexp_eatAssertion = function(state) {
    var start = state.pos;
    if (state.lastAssertionIsQuantifiable = false, state.eat(94) || state.eat(36)) return true;
    if (state.eat(92)) {
      if (state.eat(66) || state.eat(98)) return true;
      state.pos = start;
    }
    if (state.eat(40) && state.eat(63)) {
      var lookbehind = false;
      if (this.options.ecmaVersion >= 9 && (lookbehind = state.eat(60)), state.eat(61) || state.eat(33)) return this.regexp_disjunction(state), state.eat(41) || state.raise("Unterminated group"), state.lastAssertionIsQuantifiable = !lookbehind, true;
    }
    return state.pos = start, false;
  };
  pp$8.regexp_eatQuantifier = function(state, noError) {
    return noError === void 0 && (noError = false), this.regexp_eatQuantifierPrefix(state, noError) ? (state.eat(63), true) : false;
  };
  pp$8.regexp_eatQuantifierPrefix = function(state, noError) {
    return state.eat(42) || state.eat(43) || state.eat(63) || this.regexp_eatBracedQuantifier(state, noError);
  };
  pp$8.regexp_eatBracedQuantifier = function(state, noError) {
    var start = state.pos;
    if (state.eat(123)) {
      var min = 0, max = -1;
      if (this.regexp_eatDecimalDigits(state) && (min = state.lastIntValue, state.eat(44) && this.regexp_eatDecimalDigits(state) && (max = state.lastIntValue), state.eat(125))) return max !== -1 && max < min && !noError && state.raise("numbers out of order in {} quantifier"), true;
      state.switchU && !noError && state.raise("Incomplete quantifier"), state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatAtom = function(state) {
    return this.regexp_eatPatternCharacters(state) || state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
  };
  pp$8.regexp_eatReverseSolidusAtomEscape = function(state) {
    var start = state.pos;
    if (state.eat(92)) {
      if (this.regexp_eatAtomEscape(state)) return true;
      state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatUncapturingGroup = function(state) {
    var start = state.pos;
    if (state.eat(40)) {
      if (state.eat(63) && state.eat(58)) {
        if (this.regexp_disjunction(state), state.eat(41)) return true;
        state.raise("Unterminated group");
      }
      state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatCapturingGroup = function(state) {
    if (state.eat(40)) {
      if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(state) : state.current() === 63 && state.raise("Invalid group"), this.regexp_disjunction(state), state.eat(41)) return state.numCapturingParens += 1, true;
      state.raise("Unterminated group");
    }
    return false;
  };
  pp$8.regexp_eatExtendedAtom = function(state) {
    return state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
  };
  pp$8.regexp_eatInvalidBracedQuantifier = function(state) {
    return this.regexp_eatBracedQuantifier(state, true) && state.raise("Nothing to repeat"), false;
  };
  pp$8.regexp_eatSyntaxCharacter = function(state) {
    var ch = state.current();
    return isSyntaxCharacter(ch) ? (state.lastIntValue = ch, state.advance(), true) : false;
  };
  pp$8.regexp_eatPatternCharacters = function(state) {
    for (var start = state.pos, ch = 0; (ch = state.current()) !== -1 && !isSyntaxCharacter(ch); ) state.advance();
    return state.pos !== start;
  };
  pp$8.regexp_eatExtendedPatternCharacter = function(state) {
    var ch = state.current();
    return ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124 ? (state.advance(), true) : false;
  };
  pp$8.regexp_groupSpecifier = function(state) {
    if (state.eat(63)) {
      if (this.regexp_eatGroupName(state)) {
        state.groupNames.indexOf(state.lastStringValue) !== -1 && state.raise("Duplicate capture group name"), state.groupNames.push(state.lastStringValue);
        return;
      }
      state.raise("Invalid group");
    }
  };
  pp$8.regexp_eatGroupName = function(state) {
    if (state.lastStringValue = "", state.eat(60)) {
      if (this.regexp_eatRegExpIdentifierName(state) && state.eat(62)) return true;
      state.raise("Invalid capture group name");
    }
    return false;
  };
  pp$8.regexp_eatRegExpIdentifierName = function(state) {
    if (state.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(state)) {
      for (state.lastStringValue += codePointToString(state.lastIntValue); this.regexp_eatRegExpIdentifierPart(state); ) state.lastStringValue += codePointToString(state.lastIntValue);
      return true;
    }
    return false;
  };
  pp$8.regexp_eatRegExpIdentifierStart = function(state) {
    var start = state.pos, forceU = this.options.ecmaVersion >= 11, ch = state.current(forceU);
    return state.advance(forceU), ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU) && (ch = state.lastIntValue), isRegExpIdentifierStart(ch) ? (state.lastIntValue = ch, true) : (state.pos = start, false);
  };
  pp$8.regexp_eatRegExpIdentifierPart = function(state) {
    var start = state.pos, forceU = this.options.ecmaVersion >= 11, ch = state.current(forceU);
    return state.advance(forceU), ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU) && (ch = state.lastIntValue), isRegExpIdentifierPart(ch) ? (state.lastIntValue = ch, true) : (state.pos = start, false);
  };
  pp$8.regexp_eatAtomEscape = function(state) {
    return this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state) ? true : (state.switchU && (state.current() === 99 && state.raise("Invalid unicode escape"), state.raise("Invalid escape")), false);
  };
  pp$8.regexp_eatBackReference = function(state) {
    var start = state.pos;
    if (this.regexp_eatDecimalEscape(state)) {
      var n = state.lastIntValue;
      if (state.switchU) return n > state.maxBackReference && (state.maxBackReference = n), true;
      if (n <= state.numCapturingParens) return true;
      state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatKGroupName = function(state) {
    if (state.eat(107)) {
      if (this.regexp_eatGroupName(state)) return state.backReferenceNames.push(state.lastStringValue), true;
      state.raise("Invalid named reference");
    }
    return false;
  };
  pp$8.regexp_eatCharacterEscape = function(state) {
    return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
  };
  pp$8.regexp_eatCControlLetter = function(state) {
    var start = state.pos;
    if (state.eat(99)) {
      if (this.regexp_eatControlLetter(state)) return true;
      state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatZero = function(state) {
    return state.current() === 48 && !isDecimalDigit(state.lookahead()) ? (state.lastIntValue = 0, state.advance(), true) : false;
  };
  pp$8.regexp_eatControlEscape = function(state) {
    var ch = state.current();
    return ch === 116 ? (state.lastIntValue = 9, state.advance(), true) : ch === 110 ? (state.lastIntValue = 10, state.advance(), true) : ch === 118 ? (state.lastIntValue = 11, state.advance(), true) : ch === 102 ? (state.lastIntValue = 12, state.advance(), true) : ch === 114 ? (state.lastIntValue = 13, state.advance(), true) : false;
  };
  pp$8.regexp_eatControlLetter = function(state) {
    var ch = state.current();
    return isControlLetter(ch) ? (state.lastIntValue = ch % 32, state.advance(), true) : false;
  };
  pp$8.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
    forceU === void 0 && (forceU = false);
    var start = state.pos, switchU = forceU || state.switchU;
    if (state.eat(117)) {
      if (this.regexp_eatFixedHexDigits(state, 4)) {
        var lead = state.lastIntValue;
        if (switchU && lead >= 55296 && lead <= 56319) {
          var leadSurrogateEnd = state.pos;
          if (state.eat(92) && state.eat(117) && this.regexp_eatFixedHexDigits(state, 4)) {
            var trail = state.lastIntValue;
            if (trail >= 56320 && trail <= 57343) return state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536, true;
          }
          state.pos = leadSurrogateEnd, state.lastIntValue = lead;
        }
        return true;
      }
      if (switchU && state.eat(123) && this.regexp_eatHexDigits(state) && state.eat(125) && isValidUnicode(state.lastIntValue)) return true;
      switchU && state.raise("Invalid unicode escape"), state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatIdentityEscape = function(state) {
    if (state.switchU) return this.regexp_eatSyntaxCharacter(state) ? true : state.eat(47) ? (state.lastIntValue = 47, true) : false;
    var ch = state.current();
    return ch !== 99 && (!state.switchN || ch !== 107) ? (state.lastIntValue = ch, state.advance(), true) : false;
  };
  pp$8.regexp_eatDecimalEscape = function(state) {
    state.lastIntValue = 0;
    var ch = state.current();
    if (ch >= 49 && ch <= 57) {
      do
        state.lastIntValue = 10 * state.lastIntValue + (ch - 48), state.advance();
      while ((ch = state.current()) >= 48 && ch <= 57);
      return true;
    }
    return false;
  };
  pp$8.regexp_eatCharacterClassEscape = function(state) {
    var ch = state.current();
    if (isCharacterClassEscape(ch)) return state.lastIntValue = -1, state.advance(), true;
    if (state.switchU && this.options.ecmaVersion >= 9 && (ch === 80 || ch === 112)) {
      if (state.lastIntValue = -1, state.advance(), state.eat(123) && this.regexp_eatUnicodePropertyValueExpression(state) && state.eat(125)) return true;
      state.raise("Invalid property name");
    }
    return false;
  };
  pp$8.regexp_eatUnicodePropertyValueExpression = function(state) {
    var start = state.pos;
    if (this.regexp_eatUnicodePropertyName(state) && state.eat(61)) {
      var name = state.lastStringValue;
      if (this.regexp_eatUnicodePropertyValue(state)) {
        var value = state.lastStringValue;
        return this.regexp_validateUnicodePropertyNameAndValue(state, name, value), true;
      }
    }
    if (state.pos = start, this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
      var nameOrValue = state.lastStringValue;
      return this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue), true;
    }
    return false;
  };
  pp$8.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
    has(state.unicodeProperties.nonBinary, name) || state.raise("Invalid property name"), state.unicodeProperties.nonBinary[name].test(value) || state.raise("Invalid property value");
  };
  pp$8.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
    state.unicodeProperties.binary.test(nameOrValue) || state.raise("Invalid property name");
  };
  pp$8.regexp_eatUnicodePropertyName = function(state) {
    var ch = 0;
    for (state.lastStringValue = ""; isUnicodePropertyNameCharacter(ch = state.current()); ) state.lastStringValue += codePointToString(ch), state.advance();
    return state.lastStringValue !== "";
  };
  pp$8.regexp_eatUnicodePropertyValue = function(state) {
    var ch = 0;
    for (state.lastStringValue = ""; isUnicodePropertyValueCharacter(ch = state.current()); ) state.lastStringValue += codePointToString(ch), state.advance();
    return state.lastStringValue !== "";
  };
  pp$8.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
    return this.regexp_eatUnicodePropertyValue(state);
  };
  pp$8.regexp_eatCharacterClass = function(state) {
    if (state.eat(91)) {
      if (state.eat(94), this.regexp_classRanges(state), state.eat(93)) return true;
      state.raise("Unterminated character class");
    }
    return false;
  };
  pp$8.regexp_classRanges = function(state) {
    for (; this.regexp_eatClassAtom(state); ) {
      var left = state.lastIntValue;
      if (state.eat(45) && this.regexp_eatClassAtom(state)) {
        var right = state.lastIntValue;
        state.switchU && (left === -1 || right === -1) && state.raise("Invalid character class"), left !== -1 && right !== -1 && left > right && state.raise("Range out of order in character class");
      }
    }
  };
  pp$8.regexp_eatClassAtom = function(state) {
    var start = state.pos;
    if (state.eat(92)) {
      if (this.regexp_eatClassEscape(state)) return true;
      if (state.switchU) {
        var ch$1 = state.current();
        (ch$1 === 99 || isOctalDigit(ch$1)) && state.raise("Invalid class escape"), state.raise("Invalid escape");
      }
      state.pos = start;
    }
    var ch = state.current();
    return ch !== 93 ? (state.lastIntValue = ch, state.advance(), true) : false;
  };
  pp$8.regexp_eatClassEscape = function(state) {
    var start = state.pos;
    if (state.eat(98)) return state.lastIntValue = 8, true;
    if (state.switchU && state.eat(45)) return state.lastIntValue = 45, true;
    if (!state.switchU && state.eat(99)) {
      if (this.regexp_eatClassControlLetter(state)) return true;
      state.pos = start;
    }
    return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
  };
  pp$8.regexp_eatClassControlLetter = function(state) {
    var ch = state.current();
    return isDecimalDigit(ch) || ch === 95 ? (state.lastIntValue = ch % 32, state.advance(), true) : false;
  };
  pp$8.regexp_eatHexEscapeSequence = function(state) {
    var start = state.pos;
    if (state.eat(120)) {
      if (this.regexp_eatFixedHexDigits(state, 2)) return true;
      state.switchU && state.raise("Invalid escape"), state.pos = start;
    }
    return false;
  };
  pp$8.regexp_eatDecimalDigits = function(state) {
    var start = state.pos, ch = 0;
    for (state.lastIntValue = 0; isDecimalDigit(ch = state.current()); ) state.lastIntValue = 10 * state.lastIntValue + (ch - 48), state.advance();
    return state.pos !== start;
  };
  pp$8.regexp_eatHexDigits = function(state) {
    var start = state.pos, ch = 0;
    for (state.lastIntValue = 0; isHexDigit(ch = state.current()); ) state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch), state.advance();
    return state.pos !== start;
  };
  pp$8.regexp_eatLegacyOctalEscapeSequence = function(state) {
    if (this.regexp_eatOctalDigit(state)) {
      var n1 = state.lastIntValue;
      if (this.regexp_eatOctalDigit(state)) {
        var n2 = state.lastIntValue;
        n1 <= 3 && this.regexp_eatOctalDigit(state) ? state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue : state.lastIntValue = n1 * 8 + n2;
      } else state.lastIntValue = n1;
      return true;
    }
    return false;
  };
  pp$8.regexp_eatOctalDigit = function(state) {
    var ch = state.current();
    return isOctalDigit(ch) ? (state.lastIntValue = ch - 48, state.advance(), true) : (state.lastIntValue = 0, false);
  };
  pp$8.regexp_eatFixedHexDigits = function(state, length) {
    var start = state.pos;
    state.lastIntValue = 0;
    for (var i = 0; i < length; ++i) {
      var ch = state.current();
      if (!isHexDigit(ch)) return state.pos = start, false;
      state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch), state.advance();
    }
    return true;
  };
  Token = function(p) {
    this.type = p.type, this.value = p.value, this.start = p.start, this.end = p.end, p.options.locations && (this.loc = new SourceLocation(p, p.startLoc, p.endLoc)), p.options.ranges && (this.range = [p.start, p.end]);
  }, pp$9 = Parser.prototype;
  pp$9.next = function(ignoreEscapeSequenceInKeyword) {
    !ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Token(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
  };
  pp$9.getToken = function() {
    return this.next(), new Token(this);
  };
  typeof Symbol < "u" && (pp$9[Symbol.iterator] = function() {
    var this$1$1 = this;
    return { next: function() {
      var token = this$1$1.getToken();
      return { done: token.type === types.eof, value: token };
    } };
  });
  pp$9.curContext = function() {
    return this.context[this.context.length - 1];
  };
  pp$9.nextToken = function() {
    var curContext = this.curContext();
    if ((!curContext || !curContext.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length) return this.finishToken(types.eof);
    if (curContext.override) return curContext.override(this);
    this.readToken(this.fullCharCodeAtPos());
  };
  pp$9.readToken = function(code) {
    return isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 ? this.readWord() : this.getTokenFromCode(code);
  };
  pp$9.fullCharCodeAtPos = function() {
    var code = this.input.charCodeAt(this.pos);
    if (code <= 55295 || code >= 57344) return code;
    var next = this.input.charCodeAt(this.pos + 1);
    return (code << 10) + next - 56613888;
  };
  pp$9.skipBlockComment = function() {
    var startLoc = this.options.onComment && this.curPosition(), start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
    if (end === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = end + 2, this.options.locations) {
      lineBreakG.lastIndex = start;
      for (var match; (match = lineBreakG.exec(this.input)) && match.index < this.pos; ) ++this.curLine, this.lineStart = match.index + match[0].length;
    }
    this.options.onComment && this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
  };
  pp$9.skipLineComment = function(startSkip) {
    for (var start = this.pos, startLoc = this.options.onComment && this.curPosition(), ch = this.input.charCodeAt(this.pos += startSkip); this.pos < this.input.length && !isNewLine(ch); ) ch = this.input.charCodeAt(++this.pos);
    this.options.onComment && this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
  };
  pp$9.skipSpace = function() {
    loop: for (; this.pos < this.input.length; ) {
      var ch = this.input.charCodeAt(this.pos);
      switch (ch) {
        case 32:
        case 160:
          ++this.pos;
          break;
        case 13:
          this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
        case 10:
        case 8232:
        case 8233:
          ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
          break;
        case 47:
          switch (this.input.charCodeAt(this.pos + 1)) {
            case 42:
              this.skipBlockComment();
              break;
            case 47:
              this.skipLineComment(2);
              break;
            default:
              break loop;
          }
          break;
        default:
          if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) ++this.pos;
          else break loop;
      }
    }
  };
  pp$9.finishToken = function(type, val) {
    this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
    var prevType = this.type;
    this.type = type, this.value = val, this.updateContext(prevType);
  };
  pp$9.readToken_dot = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next >= 48 && next <= 57) return this.readNumber(true);
    var next2 = this.input.charCodeAt(this.pos + 2);
    return this.options.ecmaVersion >= 6 && next === 46 && next2 === 46 ? (this.pos += 3, this.finishToken(types.ellipsis)) : (++this.pos, this.finishToken(types.dot));
  };
  pp$9.readToken_slash = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    return this.exprAllowed ? (++this.pos, this.readRegexp()) : next === 61 ? this.finishOp(types.assign, 2) : this.finishOp(types.slash, 1);
  };
  pp$9.readToken_mult_modulo_exp = function(code) {
    var next = this.input.charCodeAt(this.pos + 1), size = 1, tokentype = code === 42 ? types.star : types.modulo;
    return this.options.ecmaVersion >= 7 && code === 42 && next === 42 && (++size, tokentype = types.starstar, next = this.input.charCodeAt(this.pos + 2)), next === 61 ? this.finishOp(types.assign, size + 1) : this.finishOp(tokentype, size);
  };
  pp$9.readToken_pipe_amp = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    if (next === code) {
      if (this.options.ecmaVersion >= 12) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 === 61) return this.finishOp(types.assign, 3);
      }
      return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2);
    }
    return next === 61 ? this.finishOp(types.assign, 2) : this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1);
  };
  pp$9.readToken_caret = function() {
    var next = this.input.charCodeAt(this.pos + 1);
    return next === 61 ? this.finishOp(types.assign, 2) : this.finishOp(types.bitwiseXOR, 1);
  };
  pp$9.readToken_plus_min = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    return next === code ? next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(types.incDec, 2) : next === 61 ? this.finishOp(types.assign, 2) : this.finishOp(types.plusMin, 1);
  };
  pp$9.readToken_lt_gt = function(code) {
    var next = this.input.charCodeAt(this.pos + 1), size = 1;
    return next === code ? (size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + size) === 61 ? this.finishOp(types.assign, size + 1) : this.finishOp(types.bitShift, size)) : next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (next === 61 && (size = 2), this.finishOp(types.relational, size));
  };
  pp$9.readToken_eq_excl = function(code) {
    var next = this.input.charCodeAt(this.pos + 1);
    return next === 61 ? this.finishOp(types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : code === 61 && next === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(types.arrow)) : this.finishOp(code === 61 ? types.eq : types.prefix, 1);
  };
  pp$9.readToken_question = function() {
    var ecmaVersion = this.options.ecmaVersion;
    if (ecmaVersion >= 11) {
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 46) {
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (next2 < 48 || next2 > 57) return this.finishOp(types.questionDot, 2);
      }
      if (next === 63) {
        if (ecmaVersion >= 12) {
          var next2$1 = this.input.charCodeAt(this.pos + 2);
          if (next2$1 === 61) return this.finishOp(types.assign, 3);
        }
        return this.finishOp(types.coalesce, 2);
      }
    }
    return this.finishOp(types.question, 1);
  };
  pp$9.getTokenFromCode = function(code) {
    switch (code) {
      case 46:
        return this.readToken_dot();
      case 40:
        return ++this.pos, this.finishToken(types.parenL);
      case 41:
        return ++this.pos, this.finishToken(types.parenR);
      case 59:
        return ++this.pos, this.finishToken(types.semi);
      case 44:
        return ++this.pos, this.finishToken(types.comma);
      case 91:
        return ++this.pos, this.finishToken(types.bracketL);
      case 93:
        return ++this.pos, this.finishToken(types.bracketR);
      case 123:
        return ++this.pos, this.finishToken(types.braceL);
      case 125:
        return ++this.pos, this.finishToken(types.braceR);
      case 58:
        return ++this.pos, this.finishToken(types.colon);
      case 96:
        if (this.options.ecmaVersion < 6) break;
        return ++this.pos, this.finishToken(types.backQuote);
      case 48:
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 120 || next === 88) return this.readRadixNumber(16);
        if (this.options.ecmaVersion >= 6) {
          if (next === 111 || next === 79) return this.readRadixNumber(8);
          if (next === 98 || next === 66) return this.readRadixNumber(2);
        }
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return this.readNumber(false);
      case 34:
      case 39:
        return this.readString(code);
      case 47:
        return this.readToken_slash();
      case 37:
      case 42:
        return this.readToken_mult_modulo_exp(code);
      case 124:
      case 38:
        return this.readToken_pipe_amp(code);
      case 94:
        return this.readToken_caret();
      case 43:
      case 45:
        return this.readToken_plus_min(code);
      case 60:
      case 62:
        return this.readToken_lt_gt(code);
      case 61:
      case 33:
        return this.readToken_eq_excl(code);
      case 63:
        return this.readToken_question();
      case 126:
        return this.finishOp(types.prefix, 1);
    }
    this.raise(this.pos, "Unexpected character '" + codePointToString$1(code) + "'");
  };
  pp$9.finishOp = function(type, size) {
    var str = this.input.slice(this.pos, this.pos + size);
    return this.pos += size, this.finishToken(type, str);
  };
  pp$9.readRegexp = function() {
    for (var escaped, inClass, start = this.pos; ; ) {
      this.pos >= this.input.length && this.raise(start, "Unterminated regular expression");
      var ch = this.input.charAt(this.pos);
      if (lineBreak.test(ch) && this.raise(start, "Unterminated regular expression"), escaped) escaped = false;
      else {
        if (ch === "[") inClass = true;
        else if (ch === "]" && inClass) inClass = false;
        else if (ch === "/" && !inClass) break;
        escaped = ch === "\\";
      }
      ++this.pos;
    }
    var pattern = this.input.slice(start, this.pos);
    ++this.pos;
    var flagsStart = this.pos, flags = this.readWord1();
    this.containsEsc && this.unexpected(flagsStart);
    var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
    state.reset(start, pattern, flags), this.validateRegExpFlags(state), this.validateRegExpPattern(state);
    var value = null;
    try {
      value = new RegExp(pattern, flags);
    } catch {
    }
    return this.finishToken(types.regexp, { pattern, flags, value });
  };
  pp$9.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
    for (var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0, isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48, start = this.pos, total = 0, lastCode = 0, i = 0, e = len ?? 1 / 0; i < e; ++i, ++this.pos) {
      var code = this.input.charCodeAt(this.pos), val = void 0;
      if (allowSeparators && code === 95) {
        isLegacyOctalNumericLiteral && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), lastCode === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), i === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), lastCode = code;
        continue;
      }
      if (code >= 97 ? val = code - 97 + 10 : code >= 65 ? val = code - 65 + 10 : code >= 48 && code <= 57 ? val = code - 48 : val = 1 / 0, val >= radix) break;
      lastCode = code, total = total * radix + val;
    }
    return allowSeparators && lastCode === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === start || len != null && this.pos - start !== len ? null : total;
  };
  pp$9.readRadixNumber = function(radix) {
    var start = this.pos;
    this.pos += 2;
    var val = this.readInt(radix);
    return val == null && this.raise(this.start + 2, "Expected number in radix " + radix), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (val = stringToBigInt(this.input.slice(start, this.pos)), ++this.pos) : isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(types.num, val);
  };
  pp$9.readNumber = function(startsWithDot) {
    var start = this.pos;
    !startsWithDot && this.readInt(10, void 0, true) === null && this.raise(start, "Invalid number");
    var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
    octal && this.strict && this.raise(start, "Invalid number");
    var next = this.input.charCodeAt(this.pos);
    if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
      var val$1 = stringToBigInt(this.input.slice(start, this.pos));
      return ++this.pos, isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(types.num, val$1);
    }
    octal && /[89]/.test(this.input.slice(start, this.pos)) && (octal = false), next === 46 && !octal && (++this.pos, this.readInt(10), next = this.input.charCodeAt(this.pos)), (next === 69 || next === 101) && !octal && (next = this.input.charCodeAt(++this.pos), (next === 43 || next === 45) && ++this.pos, this.readInt(10) === null && this.raise(start, "Invalid number")), isIdentifierStart(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
    var val = stringToNumber(this.input.slice(start, this.pos), octal);
    return this.finishToken(types.num, val);
  };
  pp$9.readCodePoint = function() {
    var ch = this.input.charCodeAt(this.pos), code;
    if (ch === 123) {
      this.options.ecmaVersion < 6 && this.unexpected();
      var codePos = ++this.pos;
      code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, code > 1114111 && this.invalidStringToken(codePos, "Code point out of bounds");
    } else code = this.readHexChar(4);
    return code;
  };
  pp$9.readString = function(quote) {
    for (var out = "", chunkStart = ++this.pos; ; ) {
      this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
      var ch = this.input.charCodeAt(this.pos);
      if (ch === quote) break;
      ch === 92 ? (out += this.input.slice(chunkStart, this.pos), out += this.readEscapedChar(false), chunkStart = this.pos) : (isNewLine(ch, this.options.ecmaVersion >= 10) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
    }
    return out += this.input.slice(chunkStart, this.pos++), this.finishToken(types.string, out);
  };
  INVALID_TEMPLATE_ESCAPE_ERROR = {};
  pp$9.tryReadTemplateToken = function() {
    this.inTemplateElement = true;
    try {
      this.readTmplToken();
    } catch (err) {
      if (err === INVALID_TEMPLATE_ESCAPE_ERROR) this.readInvalidTemplateToken();
      else throw err;
    }
    this.inTemplateElement = false;
  };
  pp$9.invalidStringToken = function(position, message) {
    if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw INVALID_TEMPLATE_ESCAPE_ERROR;
    this.raise(position, message);
  };
  pp$9.readTmplToken = function() {
    for (var out = "", chunkStart = this.pos; ; ) {
      this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
      var ch = this.input.charCodeAt(this.pos);
      if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) return this.pos === this.start && (this.type === types.template || this.type === types.invalidTemplate) ? ch === 36 ? (this.pos += 2, this.finishToken(types.dollarBraceL)) : (++this.pos, this.finishToken(types.backQuote)) : (out += this.input.slice(chunkStart, this.pos), this.finishToken(types.template, out));
      if (ch === 92) out += this.input.slice(chunkStart, this.pos), out += this.readEscapedChar(true), chunkStart = this.pos;
      else if (isNewLine(ch)) {
        switch (out += this.input.slice(chunkStart, this.pos), ++this.pos, ch) {
          case 13:
            this.input.charCodeAt(this.pos) === 10 && ++this.pos;
          case 10:
            out += `
`;
            break;
          default:
            out += String.fromCharCode(ch);
            break;
        }
        this.options.locations && (++this.curLine, this.lineStart = this.pos), chunkStart = this.pos;
      } else ++this.pos;
    }
  };
  pp$9.readInvalidTemplateToken = function() {
    for (; this.pos < this.input.length; this.pos++) switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{") break;
      case "`":
        return this.finishToken(types.invalidTemplate, this.input.slice(this.start, this.pos));
    }
    this.raise(this.start, "Unterminated template");
  };
  pp$9.readEscapedChar = function(inTemplate) {
    var ch = this.input.charCodeAt(++this.pos);
    switch (++this.pos, ch) {
      case 110:
        return `
`;
      case 114:
        return "\r";
      case 120:
        return String.fromCharCode(this.readHexChar(2));
      case 117:
        return codePointToString$1(this.readCodePoint());
      case 116:
        return "	";
      case 98:
        return "\b";
      case 118:
        return "\v";
      case 102:
        return "\f";
      case 13:
        this.input.charCodeAt(this.pos) === 10 && ++this.pos;
      case 10:
        return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
      case 56:
      case 57:
        if (inTemplate) {
          var codePos = this.pos - 1;
          return this.invalidStringToken(codePos, "Invalid escape sequence in template string"), null;
        }
      default:
        if (ch >= 48 && ch <= 55) {
          var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], octal = parseInt(octalStr, 8);
          return octal > 255 && (octalStr = octalStr.slice(0, -1), octal = parseInt(octalStr, 8)), this.pos += octalStr.length - 1, ch = this.input.charCodeAt(this.pos), (octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate) && this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode"), String.fromCharCode(octal);
        }
        return isNewLine(ch) ? "" : String.fromCharCode(ch);
    }
  };
  pp$9.readHexChar = function(len) {
    var codePos = this.pos, n = this.readInt(16, len);
    return n === null && this.invalidStringToken(codePos, "Bad character escape sequence"), n;
  };
  pp$9.readWord1 = function() {
    this.containsEsc = false;
    for (var word = "", first = true, chunkStart = this.pos, astral = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
      var ch = this.fullCharCodeAtPos();
      if (isIdentifierChar(ch, astral)) this.pos += ch <= 65535 ? 1 : 2;
      else if (ch === 92) {
        this.containsEsc = true, word += this.input.slice(chunkStart, this.pos);
        var escStart = this.pos;
        this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
        var esc = this.readCodePoint();
        (first ? isIdentifierStart : isIdentifierChar)(esc, astral) || this.invalidStringToken(escStart, "Invalid Unicode escape"), word += codePointToString$1(esc), chunkStart = this.pos;
      } else break;
      first = false;
    }
    return word + this.input.slice(chunkStart, this.pos);
  };
  pp$9.readWord = function() {
    var word = this.readWord1(), type = types.name;
    return this.keywords.test(word) && (type = keywords$1[word]), this.finishToken(type, word);
  };
  version = "7.4.1";
  Parser.acorn = { Parser, version, defaultOptions, Position, SourceLocation, getLineInfo, Node, TokenType, tokTypes: types, keywordTypes: keywords$1, TokContext, tokContexts: types$1, isIdentifierChar, isIdentifierStart, Token, isNewLine, lineBreak, lineBreakG, nonASCIIwhitespace };
} });
var require_xhtml = __commonJS({ "../../node_modules/acorn-jsx/xhtml.js"(exports, module) {
  module.exports = { quot: '"', amp: "&", apos: "'", lt: "<", gt: ">", nbsp: " ", iexcl: "¡", cent: "¢", pound: "£", curren: "¤", yen: "¥", brvbar: "¦", sect: "§", uml: "¨", copy: "©", ordf: "ª", laquo: "«", not: "¬", shy: "­", reg: "®", macr: "¯", deg: "°", plusmn: "±", sup2: "²", sup3: "³", acute: "´", micro: "µ", para: "¶", middot: "·", cedil: "¸", sup1: "¹", ordm: "º", raquo: "»", frac14: "¼", frac12: "½", frac34: "¾", iquest: "¿", Agrave: "À", Aacute: "Á", Acirc: "Â", Atilde: "Ã", Auml: "Ä", Aring: "Å", AElig: "Æ", Ccedil: "Ç", Egrave: "È", Eacute: "É", Ecirc: "Ê", Euml: "Ë", Igrave: "Ì", Iacute: "Í", Icirc: "Î", Iuml: "Ï", ETH: "Ð", Ntilde: "Ñ", Ograve: "Ò", Oacute: "Ó", Ocirc: "Ô", Otilde: "Õ", Ouml: "Ö", times: "×", Oslash: "Ø", Ugrave: "Ù", Uacute: "Ú", Ucirc: "Û", Uuml: "Ü", Yacute: "Ý", THORN: "Þ", szlig: "ß", agrave: "à", aacute: "á", acirc: "â", atilde: "ã", auml: "ä", aring: "å", aelig: "æ", ccedil: "ç", egrave: "è", eacute: "é", ecirc: "ê", euml: "ë", igrave: "ì", iacute: "í", icirc: "î", iuml: "ï", eth: "ð", ntilde: "ñ", ograve: "ò", oacute: "ó", ocirc: "ô", otilde: "õ", ouml: "ö", divide: "÷", oslash: "ø", ugrave: "ù", uacute: "ú", ucirc: "û", uuml: "ü", yacute: "ý", thorn: "þ", yuml: "ÿ", OElig: "Œ", oelig: "œ", Scaron: "Š", scaron: "š", Yuml: "Ÿ", fnof: "ƒ", circ: "ˆ", tilde: "˜", Alpha: "Α", Beta: "Β", Gamma: "Γ", Delta: "Δ", Epsilon: "Ε", Zeta: "Ζ", Eta: "Η", Theta: "Θ", Iota: "Ι", Kappa: "Κ", Lambda: "Λ", Mu: "Μ", Nu: "Ν", Xi: "Ξ", Omicron: "Ο", Pi: "Π", Rho: "Ρ", Sigma: "Σ", Tau: "Τ", Upsilon: "Υ", Phi: "Φ", Chi: "Χ", Psi: "Ψ", Omega: "Ω", alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", zeta: "ζ", eta: "η", theta: "θ", iota: "ι", kappa: "κ", lambda: "λ", mu: "μ", nu: "ν", xi: "ξ", omicron: "ο", pi: "π", rho: "ρ", sigmaf: "ς", sigma: "σ", tau: "τ", upsilon: "υ", phi: "φ", chi: "χ", psi: "ψ", omega: "ω", thetasym: "ϑ", upsih: "ϒ", piv: "ϖ", ensp: " ", emsp: " ", thinsp: " ", zwnj: "‌", zwj: "‍", lrm: "‎", rlm: "‏", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", sbquo: "‚", ldquo: "“", rdquo: "”", bdquo: "„", dagger: "†", Dagger: "‡", bull: "•", hellip: "…", permil: "‰", prime: "′", Prime: "″", lsaquo: "‹", rsaquo: "›", oline: "‾", frasl: "⁄", euro: "€", image: "ℑ", weierp: "℘", real: "ℜ", trade: "™", alefsym: "ℵ", larr: "←", uarr: "↑", rarr: "→", darr: "↓", harr: "↔", crarr: "↵", lArr: "⇐", uArr: "⇑", rArr: "⇒", dArr: "⇓", hArr: "⇔", forall: "∀", part: "∂", exist: "∃", empty: "∅", nabla: "∇", isin: "∈", notin: "∉", ni: "∋", prod: "∏", sum: "∑", minus: "−", lowast: "∗", radic: "√", prop: "∝", infin: "∞", ang: "∠", and: "∧", or: "∨", cap: "∩", cup: "∪", int: "∫", there4: "∴", sim: "∼", cong: "≅", asymp: "≈", ne: "≠", equiv: "≡", le: "≤", ge: "≥", sub: "⊂", sup: "⊃", nsub: "⊄", sube: "⊆", supe: "⊇", oplus: "⊕", otimes: "⊗", perp: "⊥", sdot: "⋅", lceil: "⌈", rceil: "⌉", lfloor: "⌊", rfloor: "⌋", lang: "〈", rang: "〉", loz: "◊", spades: "♠", clubs: "♣", hearts: "♥", diams: "♦" };
} });
var require_acorn_jsx = __commonJS({ "../../node_modules/acorn-jsx/index.js"(exports, module) {
  var XHTMLEntities = require_xhtml(), hexNumber = /^[\da-fA-F]+$/, decimalNumber = /^\d+$/, acornJsxMap = /* @__PURE__ */ new WeakMap();
  function getJsxTokens(acorn) {
    acorn = acorn.Parser.acorn || acorn;
    let acornJsx = acornJsxMap.get(acorn);
    if (!acornJsx) {
      let tt = acorn.tokTypes, TokContext3 = acorn.TokContext, TokenType3 = acorn.TokenType, tc_oTag = new TokContext3("<tag", false), tc_cTag = new TokContext3("</tag", false), tc_expr = new TokContext3("<tag>...</tag>", true, true), tokContexts = { tc_oTag, tc_cTag, tc_expr }, tokTypes = { jsxName: new TokenType3("jsxName"), jsxText: new TokenType3("jsxText", { beforeExpr: true }), jsxTagStart: new TokenType3("jsxTagStart", { startsExpr: true }), jsxTagEnd: new TokenType3("jsxTagEnd") };
      tokTypes.jsxTagStart.updateContext = function() {
        this.context.push(tc_expr), this.context.push(tc_oTag), this.exprAllowed = false;
      }, tokTypes.jsxTagEnd.updateContext = function(prevType) {
        let out = this.context.pop();
        out === tc_oTag && prevType === tt.slash || out === tc_cTag ? (this.context.pop(), this.exprAllowed = this.curContext() === tc_expr) : this.exprAllowed = true;
      }, acornJsx = { tokContexts, tokTypes }, acornJsxMap.set(acorn, acornJsx);
    }
    return acornJsx;
  }
  function getQualifiedJSXName(object) {
    if (!object) return object;
    if (object.type === "JSXIdentifier") return object.name;
    if (object.type === "JSXNamespacedName") return object.namespace.name + ":" + object.name.name;
    if (object.type === "JSXMemberExpression") return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
  }
  module.exports = function(options) {
    return options = options || {}, function(Parser3) {
      return plugin({ allowNamespaces: options.allowNamespaces !== false, allowNamespacedObjects: !!options.allowNamespacedObjects }, Parser3);
    };
  };
  Object.defineProperty(module.exports, "tokTypes", { get: function() {
    return getJsxTokens((init_acorn(), __toCommonJS(acorn_exports))).tokTypes;
  }, configurable: true, enumerable: true });
  function plugin(options, Parser3) {
    let acorn = Parser3.acorn || (init_acorn(), __toCommonJS(acorn_exports)), acornJsx = getJsxTokens(acorn), tt = acorn.tokTypes, tok = acornJsx.tokTypes, tokContexts = acorn.tokContexts, tc_oTag = acornJsx.tokContexts.tc_oTag, tc_cTag = acornJsx.tokContexts.tc_cTag, tc_expr = acornJsx.tokContexts.tc_expr, isNewLine2 = acorn.isNewLine, isIdentifierStart2 = acorn.isIdentifierStart, isIdentifierChar2 = acorn.isIdentifierChar;
    return class extends Parser3 {
      static get acornJsx() {
        return acornJsx;
      }
      jsx_readToken() {
        let out = "", chunkStart = this.pos;
        for (; ; ) {
          this.pos >= this.input.length && this.raise(this.start, "Unterminated JSX contents");
          let ch = this.input.charCodeAt(this.pos);
          switch (ch) {
            case 60:
            case 123:
              return this.pos === this.start ? ch === 60 && this.exprAllowed ? (++this.pos, this.finishToken(tok.jsxTagStart)) : this.getTokenFromCode(ch) : (out += this.input.slice(chunkStart, this.pos), this.finishToken(tok.jsxText, out));
            case 38:
              out += this.input.slice(chunkStart, this.pos), out += this.jsx_readEntity(), chunkStart = this.pos;
              break;
            case 62:
            case 125:
              this.raise(this.pos, "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (ch === 62 ? "&gt;" : "&rbrace;") + '` or `{"' + this.input[this.pos] + '"}`?');
            default:
              isNewLine2(ch) ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readNewLine(true), chunkStart = this.pos) : ++this.pos;
          }
        }
      }
      jsx_readNewLine(normalizeCRLF) {
        let ch = this.input.charCodeAt(this.pos), out;
        return ++this.pos, ch === 13 && this.input.charCodeAt(this.pos) === 10 ? (++this.pos, out = normalizeCRLF ? `
` : `\r
`) : out = String.fromCharCode(ch), this.options.locations && (++this.curLine, this.lineStart = this.pos), out;
      }
      jsx_readString(quote) {
        let out = "", chunkStart = ++this.pos;
        for (; ; ) {
          this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
          let ch = this.input.charCodeAt(this.pos);
          if (ch === quote) break;
          ch === 38 ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readEntity(), chunkStart = this.pos) : isNewLine2(ch) ? (out += this.input.slice(chunkStart, this.pos), out += this.jsx_readNewLine(false), chunkStart = this.pos) : ++this.pos;
        }
        return out += this.input.slice(chunkStart, this.pos++), this.finishToken(tt.string, out);
      }
      jsx_readEntity() {
        let str = "", count = 0, entity, ch = this.input[this.pos];
        ch !== "&" && this.raise(this.pos, "Entity must start with an ampersand");
        let startPos = ++this.pos;
        for (; this.pos < this.input.length && count++ < 10; ) {
          if (ch = this.input[this.pos++], ch === ";") {
            str[0] === "#" ? str[1] === "x" ? (str = str.substr(2), hexNumber.test(str) && (entity = String.fromCharCode(parseInt(str, 16)))) : (str = str.substr(1), decimalNumber.test(str) && (entity = String.fromCharCode(parseInt(str, 10)))) : entity = XHTMLEntities[str];
            break;
          }
          str += ch;
        }
        return entity || (this.pos = startPos, "&");
      }
      jsx_readWord() {
        let ch, start = this.pos;
        do
          ch = this.input.charCodeAt(++this.pos);
        while (isIdentifierChar2(ch) || ch === 45);
        return this.finishToken(tok.jsxName, this.input.slice(start, this.pos));
      }
      jsx_parseIdentifier() {
        let node = this.startNode();
        return this.type === tok.jsxName ? node.name = this.value : this.type.keyword ? node.name = this.type.keyword : this.unexpected(), this.next(), this.finishNode(node, "JSXIdentifier");
      }
      jsx_parseNamespacedName() {
        let startPos = this.start, startLoc = this.startLoc, name = this.jsx_parseIdentifier();
        if (!options.allowNamespaces || !this.eat(tt.colon)) return name;
        var node = this.startNodeAt(startPos, startLoc);
        return node.namespace = name, node.name = this.jsx_parseIdentifier(), this.finishNode(node, "JSXNamespacedName");
      }
      jsx_parseElementName() {
        if (this.type === tok.jsxTagEnd) return "";
        let startPos = this.start, startLoc = this.startLoc, node = this.jsx_parseNamespacedName();
        for (this.type === tt.dot && node.type === "JSXNamespacedName" && !options.allowNamespacedObjects && this.unexpected(); this.eat(tt.dot); ) {
          let newNode = this.startNodeAt(startPos, startLoc);
          newNode.object = node, newNode.property = this.jsx_parseIdentifier(), node = this.finishNode(newNode, "JSXMemberExpression");
        }
        return node;
      }
      jsx_parseAttributeValue() {
        switch (this.type) {
          case tt.braceL:
            let node = this.jsx_parseExpressionContainer();
            return node.expression.type === "JSXEmptyExpression" && this.raise(node.start, "JSX attributes must only be assigned a non-empty expression"), node;
          case tok.jsxTagStart:
          case tt.string:
            return this.parseExprAtom();
          default:
            this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
        }
      }
      jsx_parseEmptyExpression() {
        let node = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
        return this.finishNodeAt(node, "JSXEmptyExpression", this.start, this.startLoc);
      }
      jsx_parseExpressionContainer() {
        let node = this.startNode();
        return this.next(), node.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression(), this.expect(tt.braceR), this.finishNode(node, "JSXExpressionContainer");
      }
      jsx_parseAttribute() {
        let node = this.startNode();
        return this.eat(tt.braceL) ? (this.expect(tt.ellipsis), node.argument = this.parseMaybeAssign(), this.expect(tt.braceR), this.finishNode(node, "JSXSpreadAttribute")) : (node.name = this.jsx_parseNamespacedName(), node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null, this.finishNode(node, "JSXAttribute"));
      }
      jsx_parseOpeningElementAt(startPos, startLoc) {
        let node = this.startNodeAt(startPos, startLoc);
        node.attributes = [];
        let nodeName = this.jsx_parseElementName();
        for (nodeName && (node.name = nodeName); this.type !== tt.slash && this.type !== tok.jsxTagEnd; ) node.attributes.push(this.jsx_parseAttribute());
        return node.selfClosing = this.eat(tt.slash), this.expect(tok.jsxTagEnd), this.finishNode(node, nodeName ? "JSXOpeningElement" : "JSXOpeningFragment");
      }
      jsx_parseClosingElementAt(startPos, startLoc) {
        let node = this.startNodeAt(startPos, startLoc), nodeName = this.jsx_parseElementName();
        return nodeName && (node.name = nodeName), this.expect(tok.jsxTagEnd), this.finishNode(node, nodeName ? "JSXClosingElement" : "JSXClosingFragment");
      }
      jsx_parseElementAt(startPos, startLoc) {
        let node = this.startNodeAt(startPos, startLoc), children = [], openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc), closingElement = null;
        if (!openingElement.selfClosing) {
          contents: for (; ; ) switch (this.type) {
            case tok.jsxTagStart:
              if (startPos = this.start, startLoc = this.startLoc, this.next(), this.eat(tt.slash)) {
                closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
                break contents;
              }
              children.push(this.jsx_parseElementAt(startPos, startLoc));
              break;
            case tok.jsxText:
              children.push(this.parseExprAtom());
              break;
            case tt.braceL:
              children.push(this.jsx_parseExpressionContainer());
              break;
            default:
              this.unexpected();
          }
          getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name) && this.raise(closingElement.start, "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
        }
        let fragmentOrElement = openingElement.name ? "Element" : "Fragment";
        return node["opening" + fragmentOrElement] = openingElement, node["closing" + fragmentOrElement] = closingElement, node.children = children, this.type === tt.relational && this.value === "<" && this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag"), this.finishNode(node, "JSX" + fragmentOrElement);
      }
      jsx_parseText() {
        let node = this.parseLiteral(this.value);
        return node.type = "JSXText", node;
      }
      jsx_parseElement() {
        let startPos = this.start, startLoc = this.startLoc;
        return this.next(), this.jsx_parseElementAt(startPos, startLoc);
      }
      parseExprAtom(refShortHandDefaultPos) {
        return this.type === tok.jsxText ? this.jsx_parseText() : this.type === tok.jsxTagStart ? this.jsx_parseElement() : super.parseExprAtom(refShortHandDefaultPos);
      }
      readToken(code) {
        let context = this.curContext();
        if (context === tc_expr) return this.jsx_readToken();
        if (context === tc_oTag || context === tc_cTag) {
          if (isIdentifierStart2(code)) return this.jsx_readWord();
          if (code == 62) return ++this.pos, this.finishToken(tok.jsxTagEnd);
          if ((code === 34 || code === 39) && context == tc_oTag) return this.jsx_readString(code);
        }
        return code === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33 ? (++this.pos, this.finishToken(tok.jsxTagStart)) : super.readToken(code);
      }
      updateContext(prevType) {
        if (this.type == tt.braceL) {
          var curContext = this.curContext();
          curContext == tc_oTag ? this.context.push(tokContexts.b_expr) : curContext == tc_expr ? this.context.push(tokContexts.b_tmpl) : super.updateContext(prevType), this.exprAllowed = true;
        } else if (this.type === tt.slash && prevType === tok.jsxTagStart) this.context.length -= 2, this.context.push(tc_cTag), this.exprAllowed = false;
        else return super.updateContext(prevType);
      }
    };
  }
} });
var require_dist = __commonJS({ "../../node_modules/@base2/pretty-print-object/dist/index.js"(exports) {
  var __assign = exports && exports.__assign || function() {
    return __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
      }
      return t;
    }, __assign.apply(this, arguments);
  }, __spreadArrays = exports && exports.__spreadArrays || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var seen = [];
  function isObj(value) {
    var type = typeof value;
    return value !== null && (type === "object" || type === "function");
  }
  function isRegexp(value) {
    return Object.prototype.toString.call(value) === "[object RegExp]";
  }
  function getOwnEnumPropSymbols(object) {
    return Object.getOwnPropertySymbols(object).filter(function(keySymbol) {
      return Object.prototype.propertyIsEnumerable.call(object, keySymbol);
    });
  }
  function prettyPrint2(input, options, pad) {
    pad === void 0 && (pad = "");
    var defaultOptions2 = { indent: "	", singleQuotes: true }, combinedOptions = __assign(__assign({}, defaultOptions2), options), tokens;
    combinedOptions.inlineCharacterLimit === void 0 ? tokens = { newLine: `
`, newLineOrSpace: `
`, pad, indent: pad + combinedOptions.indent } : tokens = { newLine: "@@__PRETTY_PRINT_NEW_LINE__@@", newLineOrSpace: "@@__PRETTY_PRINT_NEW_LINE_OR_SPACE__@@", pad: "@@__PRETTY_PRINT_PAD__@@", indent: "@@__PRETTY_PRINT_INDENT__@@" };
    var expandWhiteSpace = function(string) {
      if (combinedOptions.inlineCharacterLimit === void 0) return string;
      var oneLined = string.replace(new RegExp(tokens.newLine, "g"), "").replace(new RegExp(tokens.newLineOrSpace, "g"), " ").replace(new RegExp(tokens.pad + "|" + tokens.indent, "g"), "");
      return oneLined.length <= combinedOptions.inlineCharacterLimit ? oneLined : string.replace(new RegExp(tokens.newLine + "|" + tokens.newLineOrSpace, "g"), `
`).replace(new RegExp(tokens.pad, "g"), pad).replace(new RegExp(tokens.indent, "g"), pad + combinedOptions.indent);
    };
    if (seen.indexOf(input) !== -1) return '"[Circular]"';
    if (input == null || typeof input == "number" || typeof input == "boolean" || typeof input == "function" || typeof input == "symbol" || isRegexp(input)) return String(input);
    if (input instanceof Date) return "new Date('" + input.toISOString() + "')";
    if (Array.isArray(input)) {
      if (input.length === 0) return "[]";
      seen.push(input);
      var ret = "[" + tokens.newLine + input.map(function(el, i) {
        var eol = input.length - 1 === i ? tokens.newLine : "," + tokens.newLineOrSpace, value = prettyPrint2(el, combinedOptions, pad + combinedOptions.indent);
        return combinedOptions.transform && (value = combinedOptions.transform(input, i, value)), tokens.indent + value + eol;
      }).join("") + tokens.pad + "]";
      return seen.pop(), expandWhiteSpace(ret);
    }
    if (isObj(input)) {
      var objKeys_1 = __spreadArrays(Object.keys(input), getOwnEnumPropSymbols(input));
      if (combinedOptions.filter && (objKeys_1 = objKeys_1.filter(function(el) {
        return combinedOptions.filter && combinedOptions.filter(input, el);
      })), objKeys_1.length === 0) return "{}";
      seen.push(input);
      var ret = "{" + tokens.newLine + objKeys_1.map(function(el, i) {
        var eol = objKeys_1.length - 1 === i ? tokens.newLine : "," + tokens.newLineOrSpace, isSymbol = typeof el == "symbol", isClassic = !isSymbol && /^[a-z$_][a-z$_0-9]*$/i.test(el.toString()), key = isSymbol || isClassic ? el : prettyPrint2(el, combinedOptions), value = prettyPrint2(input[el], combinedOptions, pad + combinedOptions.indent);
        return combinedOptions.transform && (value = combinedOptions.transform(input, el, value)), tokens.indent + String(key) + ": " + value + eol;
      }).join("") + tokens.pad + "}";
      return seen.pop(), expandWhiteSpace(ret);
    }
    return input = String(input).replace(/[\r\n]/g, function(x) {
      return x === `
` ? "\\n" : "\\r";
    }), combinedOptions.singleQuotes ? (input = input.replace(/\\?'/g, "\\'"), "'" + input + "'") : (input = input.replace(/"/g, '\\"'), '"' + input + '"');
  }
  exports.prettyPrint = prettyPrint2;
} });
var require_react_is_production_min2 = __commonJS({ "../../node_modules/react-element-to-jsx-string/node_modules/react-is/cjs/react-is.production.min.js"(exports) {
  var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), k = Symbol.for("react.server_context"), l2 = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u;
  u = Symbol.for("react.module.reference");
  function v(a) {
    if (typeof a == "object" && a !== null) {
      var r = a.$$typeof;
      switch (r) {
        case b:
          switch (a = a.type, a) {
            case d:
            case f:
            case e:
            case m:
            case n:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case h:
                case l2:
                case q:
                case p:
                case g:
                  return a;
                default:
                  return r;
              }
          }
        case c:
          return r;
      }
    }
  }
  exports.ContextConsumer = h;
  exports.ContextProvider = g;
  exports.Element = b;
  exports.ForwardRef = l2;
  exports.Fragment = d;
  exports.Lazy = q;
  exports.Memo = p;
  exports.Portal = c;
  exports.Profiler = f;
  exports.StrictMode = e;
  exports.Suspense = m;
  exports.SuspenseList = n;
  exports.isAsyncMode = function() {
    return false;
  };
  exports.isConcurrentMode = function() {
    return false;
  };
  exports.isContextConsumer = function(a) {
    return v(a) === h;
  };
  exports.isContextProvider = function(a) {
    return v(a) === g;
  };
  exports.isElement = function(a) {
    return typeof a == "object" && a !== null && a.$$typeof === b;
  };
  exports.isForwardRef = function(a) {
    return v(a) === l2;
  };
  exports.isFragment = function(a) {
    return v(a) === d;
  };
  exports.isLazy = function(a) {
    return v(a) === q;
  };
  exports.isMemo = function(a) {
    return v(a) === p;
  };
  exports.isPortal = function(a) {
    return v(a) === c;
  };
  exports.isProfiler = function(a) {
    return v(a) === f;
  };
  exports.isStrictMode = function(a) {
    return v(a) === e;
  };
  exports.isSuspense = function(a) {
    return v(a) === m;
  };
  exports.isSuspenseList = function(a) {
    return v(a) === n;
  };
  exports.isValidElementType = function(a) {
    return typeof a == "string" || typeof a == "function" || a === d || a === f || a === e || a === m || a === n || a === t || typeof a == "object" && a !== null && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l2 || a.$$typeof === u || a.getModuleId !== void 0);
  };
  exports.typeOf = v;
} });
var require_react_is2 = __commonJS({ "../../node_modules/react-element-to-jsx-string/node_modules/react-is/index.js"(exports, module) {
  module.exports = require_react_is_production_min2();
} });
var entry_preview_docs_exports = {};
__export(entry_preview_docs_exports, { applyDecorators: () => applyDecorators, argTypesEnhancers: () => argTypesEnhancers, decorators: () => decorators, parameters: () => parameters });
var import_prop_types = __toESM(require_prop_types());
var CUSTOM_CAPTION = "custom", OBJECT_CAPTION = "object", ARRAY_CAPTION = "array", CLASS_CAPTION = "class", FUNCTION_CAPTION = "func", ELEMENT_CAPTION = "element";
var import_html_tags = __toESM(require_html_tags2());
function isHtmlTag(tagName) {
  return import_html_tags.default.includes(tagName.toLowerCase());
}
var import_escodegen = __toESM(require_escodegen());
function dedent(templ) {
  for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
  var strings = Array.from(typeof templ == "string" ? [templ] : templ);
  strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var indentLengths = strings.reduce(function(arr, str) {
    var matches = str.match(/\n([\t ]+|(?!\s).)/g);
    return matches ? arr.concat(matches.map(function(match) {
      var _a, _b;
      return (_b = (_a = match.match(/[\t ]/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    })) : arr;
  }, []);
  if (indentLengths.length) {
    var pattern_1 = new RegExp(`
[	 ]{` + Math.min.apply(Math, indentLengths) + "}", "g");
    strings = strings.map(function(str) {
      return str.replace(pattern_1, `
`);
    });
  }
  strings[0] = strings[0].replace(/^\r?\n/, "");
  var string = strings[0];
  return values.forEach(function(value, i) {
    var endentations = string.match(/(?:^|\n)( *)$/), endentation = endentations ? endentations[1] : "", indentedValue = value;
    typeof value == "string" && value.includes(`
`) && (indentedValue = String(value).split(`
`).map(function(str, i2) {
      return i2 === 0 ? str : "" + endentation + str;
    }).join(`
`)), string += indentedValue + strings[i + 1];
  }), string;
}
var BASIC_OPTIONS = { format: { indent: { style: "  " }, semicolons: false } }, COMPACT_OPTIONS = { ...BASIC_OPTIONS, format: { newline: "" } }, PRETTY_OPTIONS = { ...BASIC_OPTIONS };
function generateCode(ast, compact = false) {
  return (0, import_escodegen.generate)(ast, compact ? COMPACT_OPTIONS : PRETTY_OPTIONS);
}
function generateObjectCode(ast, compact = false) {
  return compact ? generateCompactObjectCode(ast) : generateCode(ast);
}
function generateCompactObjectCode(ast) {
  let result = generateCode(ast, true);
  return result.endsWith(" }") || (result = `${result.slice(0, -1)} }`), result;
}
function generateArrayCode(ast, compact = false) {
  return compact ? generateCompactArrayCode(ast) : generateMultilineArrayCode(ast);
}
function generateMultilineArrayCode(ast) {
  let result = generateCode(ast);
  return result.endsWith("  }]") && (result = dedent(result)), result;
}
function generateCompactArrayCode(ast) {
  let result = generateCode(ast, true);
  return result.startsWith("[    ") && (result = result.replace("[    ", "[")), result;
}
var isMemo = (component) => component.$$typeof === Symbol.for("react.memo"), isForwardRef = (component) => component.$$typeof === Symbol.for("react.forward_ref");
init_acorn();
var import_acorn_jsx = __toESM(require_acorn_jsx());
function simple(node, visitors, baseVisitor, state, override) {
  baseVisitor || (baseVisitor = base), function c(node2, st, override2) {
    var type = override2 || node2.type, found = visitors[type];
    baseVisitor[type](node2, st, c), found && found(node2, st);
  }(node, state, override);
}
function ancestor(node, visitors, baseVisitor, state, override) {
  var ancestors = [];
  baseVisitor || (baseVisitor = base), function c(node2, st, override2) {
    var type = override2 || node2.type, found = visitors[type], isNew = node2 !== ancestors[ancestors.length - 1];
    isNew && ancestors.push(node2), baseVisitor[type](node2, st, c), found && found(node2, st || ancestors, ancestors), isNew && ancestors.pop();
  }(node, state, override);
}
function skipThrough(node, st, c) {
  c(node, st);
}
function ignore(_node, _st, _c) {
}
var base = {};
base.Program = base.BlockStatement = function(node, st, c) {
  for (var i = 0, list = node.body; i < list.length; i += 1) {
    var stmt = list[i];
    c(stmt, st, "Statement");
  }
};
base.Statement = skipThrough;
base.EmptyStatement = ignore;
base.ExpressionStatement = base.ParenthesizedExpression = base.ChainExpression = function(node, st, c) {
  return c(node.expression, st, "Expression");
};
base.IfStatement = function(node, st, c) {
  c(node.test, st, "Expression"), c(node.consequent, st, "Statement"), node.alternate && c(node.alternate, st, "Statement");
};
base.LabeledStatement = function(node, st, c) {
  return c(node.body, st, "Statement");
};
base.BreakStatement = base.ContinueStatement = ignore;
base.WithStatement = function(node, st, c) {
  c(node.object, st, "Expression"), c(node.body, st, "Statement");
};
base.SwitchStatement = function(node, st, c) {
  c(node.discriminant, st, "Expression");
  for (var i$1 = 0, list$1 = node.cases; i$1 < list$1.length; i$1 += 1) {
    var cs = list$1[i$1];
    cs.test && c(cs.test, st, "Expression");
    for (var i = 0, list = cs.consequent; i < list.length; i += 1) {
      var cons = list[i];
      c(cons, st, "Statement");
    }
  }
};
base.SwitchCase = function(node, st, c) {
  node.test && c(node.test, st, "Expression");
  for (var i = 0, list = node.consequent; i < list.length; i += 1) {
    var cons = list[i];
    c(cons, st, "Statement");
  }
};
base.ReturnStatement = base.YieldExpression = base.AwaitExpression = function(node, st, c) {
  node.argument && c(node.argument, st, "Expression");
};
base.ThrowStatement = base.SpreadElement = function(node, st, c) {
  return c(node.argument, st, "Expression");
};
base.TryStatement = function(node, st, c) {
  c(node.block, st, "Statement"), node.handler && c(node.handler, st), node.finalizer && c(node.finalizer, st, "Statement");
};
base.CatchClause = function(node, st, c) {
  node.param && c(node.param, st, "Pattern"), c(node.body, st, "Statement");
};
base.WhileStatement = base.DoWhileStatement = function(node, st, c) {
  c(node.test, st, "Expression"), c(node.body, st, "Statement");
};
base.ForStatement = function(node, st, c) {
  node.init && c(node.init, st, "ForInit"), node.test && c(node.test, st, "Expression"), node.update && c(node.update, st, "Expression"), c(node.body, st, "Statement");
};
base.ForInStatement = base.ForOfStatement = function(node, st, c) {
  c(node.left, st, "ForInit"), c(node.right, st, "Expression"), c(node.body, st, "Statement");
};
base.ForInit = function(node, st, c) {
  node.type === "VariableDeclaration" ? c(node, st) : c(node, st, "Expression");
};
base.DebuggerStatement = ignore;
base.FunctionDeclaration = function(node, st, c) {
  return c(node, st, "Function");
};
base.VariableDeclaration = function(node, st, c) {
  for (var i = 0, list = node.declarations; i < list.length; i += 1) {
    var decl = list[i];
    c(decl, st);
  }
};
base.VariableDeclarator = function(node, st, c) {
  c(node.id, st, "Pattern"), node.init && c(node.init, st, "Expression");
};
base.Function = function(node, st, c) {
  node.id && c(node.id, st, "Pattern");
  for (var i = 0, list = node.params; i < list.length; i += 1) {
    var param = list[i];
    c(param, st, "Pattern");
  }
  c(node.body, st, node.expression ? "Expression" : "Statement");
};
base.Pattern = function(node, st, c) {
  node.type === "Identifier" ? c(node, st, "VariablePattern") : node.type === "MemberExpression" ? c(node, st, "MemberPattern") : c(node, st);
};
base.VariablePattern = ignore;
base.MemberPattern = skipThrough;
base.RestElement = function(node, st, c) {
  return c(node.argument, st, "Pattern");
};
base.ArrayPattern = function(node, st, c) {
  for (var i = 0, list = node.elements; i < list.length; i += 1) {
    var elt = list[i];
    elt && c(elt, st, "Pattern");
  }
};
base.ObjectPattern = function(node, st, c) {
  for (var i = 0, list = node.properties; i < list.length; i += 1) {
    var prop = list[i];
    prop.type === "Property" ? (prop.computed && c(prop.key, st, "Expression"), c(prop.value, st, "Pattern")) : prop.type === "RestElement" && c(prop.argument, st, "Pattern");
  }
};
base.Expression = skipThrough;
base.ThisExpression = base.Super = base.MetaProperty = ignore;
base.ArrayExpression = function(node, st, c) {
  for (var i = 0, list = node.elements; i < list.length; i += 1) {
    var elt = list[i];
    elt && c(elt, st, "Expression");
  }
};
base.ObjectExpression = function(node, st, c) {
  for (var i = 0, list = node.properties; i < list.length; i += 1) {
    var prop = list[i];
    c(prop, st);
  }
};
base.FunctionExpression = base.ArrowFunctionExpression = base.FunctionDeclaration;
base.SequenceExpression = function(node, st, c) {
  for (var i = 0, list = node.expressions; i < list.length; i += 1) {
    var expr = list[i];
    c(expr, st, "Expression");
  }
};
base.TemplateLiteral = function(node, st, c) {
  for (var i = 0, list = node.quasis; i < list.length; i += 1) {
    var quasi = list[i];
    c(quasi, st);
  }
  for (var i$1 = 0, list$1 = node.expressions; i$1 < list$1.length; i$1 += 1) {
    var expr = list$1[i$1];
    c(expr, st, "Expression");
  }
};
base.TemplateElement = ignore;
base.UnaryExpression = base.UpdateExpression = function(node, st, c) {
  c(node.argument, st, "Expression");
};
base.BinaryExpression = base.LogicalExpression = function(node, st, c) {
  c(node.left, st, "Expression"), c(node.right, st, "Expression");
};
base.AssignmentExpression = base.AssignmentPattern = function(node, st, c) {
  c(node.left, st, "Pattern"), c(node.right, st, "Expression");
};
base.ConditionalExpression = function(node, st, c) {
  c(node.test, st, "Expression"), c(node.consequent, st, "Expression"), c(node.alternate, st, "Expression");
};
base.NewExpression = base.CallExpression = function(node, st, c) {
  if (c(node.callee, st, "Expression"), node.arguments) for (var i = 0, list = node.arguments; i < list.length; i += 1) {
    var arg = list[i];
    c(arg, st, "Expression");
  }
};
base.MemberExpression = function(node, st, c) {
  c(node.object, st, "Expression"), node.computed && c(node.property, st, "Expression");
};
base.ExportNamedDeclaration = base.ExportDefaultDeclaration = function(node, st, c) {
  node.declaration && c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression"), node.source && c(node.source, st, "Expression");
};
base.ExportAllDeclaration = function(node, st, c) {
  node.exported && c(node.exported, st), c(node.source, st, "Expression");
};
base.ImportDeclaration = function(node, st, c) {
  for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
    var spec = list[i];
    c(spec, st);
  }
  c(node.source, st, "Expression");
};
base.ImportExpression = function(node, st, c) {
  c(node.source, st, "Expression");
};
base.ImportSpecifier = base.ImportDefaultSpecifier = base.ImportNamespaceSpecifier = base.Identifier = base.Literal = ignore;
base.TaggedTemplateExpression = function(node, st, c) {
  c(node.tag, st, "Expression"), c(node.quasi, st, "Expression");
};
base.ClassDeclaration = base.ClassExpression = function(node, st, c) {
  return c(node, st, "Class");
};
base.Class = function(node, st, c) {
  node.id && c(node.id, st, "Pattern"), node.superClass && c(node.superClass, st, "Expression"), c(node.body, st);
};
base.ClassBody = function(node, st, c) {
  for (var i = 0, list = node.body; i < list.length; i += 1) {
    var elt = list[i];
    c(elt, st);
  }
};
base.MethodDefinition = base.Property = function(node, st, c) {
  node.computed && c(node.key, st, "Expression"), c(node.value, st, "Expression");
};
var ACORN_WALK_VISITORS = { ...base, JSXElement: () => {
} }, acornParser = Parser.extend((0, import_acorn_jsx.default)());
function extractIdentifierName(identifierNode) {
  return identifierNode != null ? identifierNode.name : null;
}
function filterAncestors(ancestors) {
  return ancestors.filter((x) => x.type === "ObjectExpression" || x.type === "ArrayExpression");
}
function calculateNodeDepth(node) {
  let depths = [];
  return ancestor(node, { ObjectExpression(_, ancestors) {
    depths.push(filterAncestors(ancestors).length);
  }, ArrayExpression(_, ancestors) {
    depths.push(filterAncestors(ancestors).length);
  } }, ACORN_WALK_VISITORS), Math.max(...depths);
}
function parseIdentifier(identifierNode) {
  return { inferredType: { type: "Identifier", identifier: extractIdentifierName(identifierNode) }, ast: identifierNode };
}
function parseLiteral(literalNode) {
  return { inferredType: { type: "Literal" }, ast: literalNode };
}
function parseFunction(funcNode) {
  let innerJsxElementNode;
  simple(funcNode.body, { JSXElement(node) {
    innerJsxElementNode = node;
  } }, ACORN_WALK_VISITORS);
  let inferredType = { type: innerJsxElementNode != null ? "Element" : "Function", params: funcNode.params, hasParams: funcNode.params.length !== 0 }, identifierName = extractIdentifierName(funcNode.id);
  return identifierName != null && (inferredType.identifier = identifierName), { inferredType, ast: funcNode };
}
function parseClass(classNode) {
  let innerJsxElementNode;
  return simple(classNode.body, { JSXElement(node) {
    innerJsxElementNode = node;
  } }, ACORN_WALK_VISITORS), { inferredType: { type: innerJsxElementNode != null ? "Element" : "Class", identifier: extractIdentifierName(classNode.id) }, ast: classNode };
}
function parseJsxElement(jsxElementNode) {
  let inferredType = { type: "Element" }, identifierName = extractIdentifierName(jsxElementNode.openingElement.name);
  return identifierName != null && (inferredType.identifier = identifierName), { inferredType, ast: jsxElementNode };
}
function parseCall(callNode) {
  let identifierNode = callNode.callee.type === "MemberExpression" ? callNode.callee.property : callNode.callee;
  return extractIdentifierName(identifierNode) === "shape" ? parseObject(callNode.arguments[0]) : null;
}
function parseObject(objectNode) {
  return { inferredType: { type: "Object", depth: calculateNodeDepth(objectNode) }, ast: objectNode };
}
function parseArray(arrayNode) {
  return { inferredType: { type: "Array", depth: calculateNodeDepth(arrayNode) }, ast: arrayNode };
}
function parseExpression(expression) {
  switch (expression.type) {
    case "Identifier":
      return parseIdentifier(expression);
    case "Literal":
      return parseLiteral(expression);
    case "FunctionExpression":
    case "ArrowFunctionExpression":
      return parseFunction(expression);
    case "ClassExpression":
      return parseClass(expression);
    case "JSXElement":
      return parseJsxElement(expression);
    case "CallExpression":
      return parseCall(expression);
    case "ObjectExpression":
      return parseObject(expression);
    case "ArrayExpression":
      return parseArray(expression);
    default:
      return null;
  }
}
function parse4(value) {
  let ast = acornParser.parse(`(${value})`, { ecmaVersion: 2020 }), parsingResult = { inferredType: { type: "Unknown" }, ast };
  if (ast.body[0] != null) {
    let rootNode = ast.body[0];
    switch (rootNode.type) {
      case "ExpressionStatement": {
        let expressionResult = parseExpression(rootNode.expression);
        expressionResult != null && (parsingResult = expressionResult);
        break;
      }
    }
  }
  return parsingResult;
}
function inspectValue(value) {
  try {
    return { ...parse4(value) };
  } catch {
  }
  return { inferredType: { type: "Unknown" } };
}
function generateArray({ inferredType, ast }) {
  let { depth } = inferredType;
  if (depth <= 2) {
    let compactArray = generateArrayCode(ast, true);
    if (!oe(compactArray)) return l(compactArray);
  }
  return l(ARRAY_CAPTION, generateArrayCode(ast));
}
function generateObject({ inferredType, ast }) {
  let { depth } = inferredType;
  if (depth === 1) {
    let compactObject = generateObjectCode(ast, true);
    if (!oe(compactObject)) return l(compactObject);
  }
  return l(OBJECT_CAPTION, generateObjectCode(ast));
}
function getPrettyFuncIdentifier(identifier, hasArguments) {
  return hasArguments ? `${identifier}( ... )` : `${identifier}()`;
}
function getPrettyElementIdentifier(identifier) {
  return `<${identifier} />`;
}
function getPrettyIdentifier(inferredType) {
  let { type, identifier } = inferredType;
  switch (type) {
    case "Function":
      return getPrettyFuncIdentifier(identifier, inferredType.hasParams);
    case "Element":
      return getPrettyElementIdentifier(identifier);
    default:
      return identifier;
  }
}
function generateFunc({ inferredType, ast }) {
  let { identifier } = inferredType;
  if (identifier != null) return l(getPrettyIdentifier(inferredType), generateCode(ast));
  let prettyCaption = generateCode(ast, true);
  return oe(prettyCaption) ? l(FUNCTION_CAPTION, generateCode(ast)) : l(prettyCaption);
}
function generateElement(defaultValue, inspectionResult) {
  let { inferredType } = inspectionResult, { identifier } = inferredType;
  if (identifier != null && !isHtmlTag(identifier)) {
    let prettyIdentifier = getPrettyIdentifier(inferredType);
    return l(prettyIdentifier, defaultValue);
  }
  return oe(defaultValue) ? l(ELEMENT_CAPTION, defaultValue) : l(defaultValue);
}
function createDefaultValue(defaultValue) {
  try {
    let inspectionResult = inspectValue(defaultValue);
    switch (inspectionResult.inferredType.type) {
      case "Object":
        return generateObject(inspectionResult);
      case "Function":
        return generateFunc(inspectionResult);
      case "Element":
        return generateElement(defaultValue, inspectionResult);
      case "Array":
        return generateArray(inspectionResult);
      default:
        return null;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}
function isFunction(value) {
  return typeof value == "function";
}
function isString(value) {
  return typeof value == "string" || value instanceof String;
}
function isPlainObject(object) {
  var _a;
  if (typeof object != "object" || object == null) return false;
  if (Object.getPrototypeOf(object) === null) return true;
  if (Object.prototype.toString.call(object) !== "[object Object]") {
    let tag = object[Symbol.toStringTag];
    return tag == null || !((_a = Object.getOwnPropertyDescriptor(object, Symbol.toStringTag)) == null ? void 0 : _a.writable) ? false : object.toString() === `[object ${tag}]`;
  }
  let proto = object;
  for (; Object.getPrototypeOf(proto) !== null; ) proto = Object.getPrototypeOf(proto);
  return Object.getPrototypeOf(object) === proto;
}
function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainObject2(o) {
  var ctor, prot;
  return isObject(o) === false ? false : (ctor = o.constructor, ctor === void 0 ? true : (prot = ctor.prototype, !(isObject(prot) === false || prot.hasOwnProperty("isPrototypeOf") === false)));
}
var import_pretty_print_object = __toESM(require_dist()), import_react_is = __toESM(require_react_is2());
var spacer = function(times, tabStop) {
  return times === 0 ? "" : new Array(times * tabStop).fill(" ").join("");
};
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && typeof Symbol == "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol < "u" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (o) {
    if (typeof o == "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor && (n = o.constructor.name), n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
}
function _arrayLikeToArray(arr, len) {
  (len == null || len > arr.length) && (len = arr.length);
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function safeSortObject(value, seen) {
  return value === null || _typeof(value) !== "object" || value instanceof Date || value instanceof RegExp || reactExports.isValidElement(value) ? value : (seen.add(value), Array.isArray(value) ? value.map(function(v) {
    return safeSortObject(v, seen);
  }) : Object.keys(value).sort().reduce(function(result, key) {
    return key === "_owner" || (key === "current" || seen.has(value[key]) ? result[key] = "[Circular]" : result[key] = safeSortObject(value[key], seen)), result;
  }, {}));
}
function sortObject(value) {
  return safeSortObject(value, /* @__PURE__ */ new WeakSet());
}
var createStringTreeNode = function(value) {
  return { type: "string", value };
}, createNumberTreeNode = function(value) {
  return { type: "number", value };
}, createReactElementTreeNode = function(displayName, props, defaultProps, childrens) {
  return { type: "ReactElement", displayName, props, defaultProps, childrens };
}, createReactFragmentTreeNode = function(key, childrens) {
  return { type: "ReactFragment", key, childrens };
}, supportFragment = !!reactExports.Fragment, getFunctionTypeName = function(functionType) {
  return !functionType.name || functionType.name === "_default" ? "No Display Name" : functionType.name;
}, getWrappedComponentDisplayName = function getWrappedComponentDisplayName2(Component) {
  switch (true) {
    case !!Component.displayName:
      return Component.displayName;
    case Component.$$typeof === import_react_is.Memo:
      return getWrappedComponentDisplayName2(Component.type);
    case Component.$$typeof === import_react_is.ForwardRef:
      return getWrappedComponentDisplayName2(Component.render);
    default:
      return getFunctionTypeName(Component);
  }
}, getReactElementDisplayName = function(element) {
  switch (true) {
    case typeof element.type == "string":
      return element.type;
    case typeof element.type == "function":
      return element.type.displayName ? element.type.displayName : getFunctionTypeName(element.type);
    case (0, import_react_is.isForwardRef)(element):
    case (0, import_react_is.isMemo)(element):
      return getWrappedComponentDisplayName(element.type);
    case (0, import_react_is.isContextConsumer)(element):
      return "".concat(element.type._context.displayName || "Context", ".Consumer");
    case (0, import_react_is.isContextProvider)(element):
      return "".concat(element.type._context.displayName || "Context", ".Provider");
    case (0, import_react_is.isLazy)(element):
      return "Lazy";
    case (0, import_react_is.isProfiler)(element):
      return "Profiler";
    case (0, import_react_is.isStrictMode)(element):
      return "StrictMode";
    case (0, import_react_is.isSuspense)(element):
      return "Suspense";
    default:
      return "UnknownElementType";
  }
}, noChildren = function(propsValue, propName) {
  return propName !== "children";
}, onlyMeaningfulChildren = function(children) {
  return children !== true && children !== false && children !== null && children !== "";
}, filterProps = function(originalProps, cb) {
  var filteredProps = {};
  return Object.keys(originalProps).filter(function(key) {
    return cb(originalProps[key], key);
  }).forEach(function(key) {
    return filteredProps[key] = originalProps[key];
  }), filteredProps;
}, parseReactElement = function parseReactElement2(element, options) {
  var _options$displayName = options.displayName, displayNameFn = _options$displayName === void 0 ? getReactElementDisplayName : _options$displayName;
  if (typeof element == "string") return createStringTreeNode(element);
  if (typeof element == "number") return createNumberTreeNode(element);
  if (!React.isValidElement(element)) throw new Error("react-element-to-jsx-string: Expected a React.Element, got `".concat(_typeof(element), "`"));
  var displayName = displayNameFn(element), props = filterProps(element.props, noChildren);
  element.ref !== null && (props.ref = element.ref);
  var key = element.key;
  typeof key == "string" && key.search(/^\./) && (props.key = key);
  var defaultProps = filterProps(element.type.defaultProps || {}, noChildren), childrens = React.Children.toArray(element.props.children).filter(onlyMeaningfulChildren).map(function(child) {
    return parseReactElement2(child, options);
  });
  return supportFragment && element.type === reactExports.Fragment ? createReactFragmentTreeNode(key, childrens) : createReactElementTreeNode(displayName, props, defaultProps, childrens);
};
function noRefCheck() {
}
var inlineFunction = function(fn) {
  return fn.toString().split(`
`).map(function(line) {
    return line.trim();
  }).join("");
};
var defaultFunctionValue = inlineFunction, formatFunction = function(fn, options) {
  var _options$functionValu = options.functionValue, functionValue = _options$functionValu === void 0 ? defaultFunctionValue : _options$functionValu, showFunctions = options.showFunctions;
  return functionValue(!showFunctions && functionValue === defaultFunctionValue ? noRefCheck : fn);
}, formatComplexDataStructure = function(value, inline, lvl, options) {
  var normalizedValue = sortObject(value), stringifiedValue = (0, import_pretty_print_object.prettyPrint)(normalizedValue, { transform: function(currentObj, prop, originalResult) {
    var currentValue = currentObj[prop];
    return currentValue && reactExports.isValidElement(currentValue) ? formatTreeNode(parseReactElement(currentValue, options), true, lvl, options) : typeof currentValue == "function" ? formatFunction(currentValue, options) : originalResult;
  } });
  return inline ? stringifiedValue.replace(/\s+/g, " ").replace(/{ /g, "{").replace(/ }/g, "}").replace(/\[ /g, "[").replace(/ ]/g, "]") : stringifiedValue.replace(/\t/g, spacer(1, options.tabStop)).replace(/\n([^$])/g, `
`.concat(spacer(lvl + 1, options.tabStop), "$1"));
}, escape$1 = function(s) {
  return s.replace(/"/g, "&quot;");
}, formatPropValue = function(propValue, inline, lvl, options) {
  if (typeof propValue == "number") return "{".concat(String(propValue), "}");
  if (typeof propValue == "string") return '"'.concat(escape$1(propValue), '"');
  if (_typeof(propValue) === "symbol") {
    var symbolDescription = propValue.valueOf().toString().replace(/Symbol\((.*)\)/, "$1");
    return symbolDescription ? "{Symbol('".concat(symbolDescription, "')}") : "{Symbol()}";
  }
  return typeof propValue == "function" ? "{".concat(formatFunction(propValue, options), "}") : reactExports.isValidElement(propValue) ? "{".concat(formatTreeNode(parseReactElement(propValue, options), true, lvl, options), "}") : propValue instanceof Date ? isNaN(propValue.valueOf()) ? "{new Date(NaN)}" : '{new Date("'.concat(propValue.toISOString(), '")}') : isPlainObject2(propValue) || Array.isArray(propValue) ? "{".concat(formatComplexDataStructure(propValue, inline, lvl, options), "}") : "{".concat(String(propValue), "}");
}, formatProp = function(name, hasValue, value, hasDefaultValue, defaultValue, inline, lvl, options) {
  if (!hasValue && !hasDefaultValue) throw new Error('The prop "'.concat(name, '" has no value and no default: could not be formatted'));
  var usedValue = hasValue ? value : defaultValue, useBooleanShorthandSyntax = options.useBooleanShorthandSyntax, tabStop = options.tabStop, formattedPropValue = formatPropValue(usedValue, inline, lvl, options), attributeFormattedInline = " ", attributeFormattedMultiline = `
`.concat(spacer(lvl + 1, tabStop)), isMultilineAttribute = formattedPropValue.includes(`
`);
  return useBooleanShorthandSyntax && formattedPropValue === "{false}" && !hasDefaultValue ? (attributeFormattedInline = "", attributeFormattedMultiline = "") : useBooleanShorthandSyntax && formattedPropValue === "{true}" ? (attributeFormattedInline += "".concat(name), attributeFormattedMultiline += "".concat(name)) : (attributeFormattedInline += "".concat(name, "=").concat(formattedPropValue), attributeFormattedMultiline += "".concat(name, "=").concat(formattedPropValue)), { attributeFormattedInline, attributeFormattedMultiline, isMultilineAttribute };
}, mergeSiblingPlainStringChildrenReducer = function(previousNodes, currentNode) {
  var nodes = previousNodes.slice(0, previousNodes.length > 0 ? previousNodes.length - 1 : 0), previousNode = previousNodes[previousNodes.length - 1];
  return previousNode && (currentNode.type === "string" || currentNode.type === "number") && (previousNode.type === "string" || previousNode.type === "number") ? nodes.push(createStringTreeNode(String(previousNode.value) + String(currentNode.value))) : (previousNode && nodes.push(previousNode), nodes.push(currentNode)), nodes;
}, isKeyOrRefProps = function(propName) {
  return ["key", "ref"].includes(propName);
}, sortPropsByNames = function(shouldSortUserProps) {
  return function(props) {
    var haveKeyProp = props.includes("key"), haveRefProp = props.includes("ref"), userPropsOnly = props.filter(function(oneProp) {
      return !isKeyOrRefProps(oneProp);
    }), sortedProps = _toConsumableArray(shouldSortUserProps ? userPropsOnly.sort() : userPropsOnly);
    return haveRefProp && sortedProps.unshift("ref"), haveKeyProp && sortedProps.unshift("key"), sortedProps;
  };
};
function createPropFilter(props, filter) {
  return Array.isArray(filter) ? function(key) {
    return filter.indexOf(key) === -1;
  } : function(key) {
    return filter(props[key], key);
  };
}
var compensateMultilineStringElementIndentation = function(element, formattedElement, inline, lvl, options) {
  var tabStop = options.tabStop;
  return element.type === "string" ? formattedElement.split(`
`).map(function(line, offset2) {
    return offset2 === 0 ? line : "".concat(spacer(lvl, tabStop)).concat(line);
  }).join(`
`) : formattedElement;
}, formatOneChildren = function(inline, lvl, options) {
  return function(element) {
    return compensateMultilineStringElementIndentation(element, formatTreeNode(element, inline, lvl, options), inline, lvl, options);
  };
}, onlyPropsWithOriginalValue = function(defaultProps, props) {
  return function(propName) {
    var haveDefaultValue = Object.keys(defaultProps).includes(propName);
    return !haveDefaultValue || haveDefaultValue && defaultProps[propName] !== props[propName];
  };
}, isInlineAttributeTooLong = function(attributes, inlineAttributeString, lvl, tabStop, maxInlineAttributesLineLength) {
  return maxInlineAttributesLineLength ? spacer(lvl, tabStop).length + inlineAttributeString.length > maxInlineAttributesLineLength : attributes.length > 1;
}, shouldRenderMultilineAttr = function(attributes, inlineAttributeString, containsMultilineAttr, inline, lvl, tabStop, maxInlineAttributesLineLength) {
  return (isInlineAttributeTooLong(attributes, inlineAttributeString, lvl, tabStop, maxInlineAttributesLineLength) || containsMultilineAttr) && !inline;
}, formatReactElementNode = function(node, inline, lvl, options) {
  var type = node.type, _node$displayName = node.displayName, displayName = _node$displayName === void 0 ? "" : _node$displayName, childrens = node.childrens, _node$props = node.props, props = _node$props === void 0 ? {} : _node$props, _node$defaultProps = node.defaultProps, defaultProps = _node$defaultProps === void 0 ? {} : _node$defaultProps;
  if (type !== "ReactElement") throw new Error('The "formatReactElementNode" function could only format node of type "ReactElement". Given:  '.concat(type));
  var filterProps3 = options.filterProps, maxInlineAttributesLineLength = options.maxInlineAttributesLineLength, showDefaultProps = options.showDefaultProps, sortProps = options.sortProps, tabStop = options.tabStop, out = "<".concat(displayName), outInlineAttr = out, outMultilineAttr = out, containsMultilineAttr = false, visibleAttributeNames = [], propFilter = createPropFilter(props, filterProps3);
  Object.keys(props).filter(propFilter).filter(onlyPropsWithOriginalValue(defaultProps, props)).forEach(function(propName) {
    return visibleAttributeNames.push(propName);
  }), Object.keys(defaultProps).filter(propFilter).filter(function() {
    return showDefaultProps;
  }).filter(function(defaultPropName) {
    return !visibleAttributeNames.includes(defaultPropName);
  }).forEach(function(defaultPropName) {
    return visibleAttributeNames.push(defaultPropName);
  });
  var attributes = sortPropsByNames(sortProps)(visibleAttributeNames);
  if (attributes.forEach(function(attributeName) {
    var _formatProp = formatProp(attributeName, Object.keys(props).includes(attributeName), props[attributeName], Object.keys(defaultProps).includes(attributeName), defaultProps[attributeName], inline, lvl, options), attributeFormattedInline = _formatProp.attributeFormattedInline, attributeFormattedMultiline = _formatProp.attributeFormattedMultiline, isMultilineAttribute = _formatProp.isMultilineAttribute;
    isMultilineAttribute && (containsMultilineAttr = true), outInlineAttr += attributeFormattedInline, outMultilineAttr += attributeFormattedMultiline;
  }), outMultilineAttr += `
`.concat(spacer(lvl, tabStop)), shouldRenderMultilineAttr(attributes, outInlineAttr, containsMultilineAttr, inline, lvl, tabStop, maxInlineAttributesLineLength) ? out = outMultilineAttr : out = outInlineAttr, childrens && childrens.length > 0) {
    var newLvl = lvl + 1;
    out += ">", inline || (out += `
`, out += spacer(newLvl, tabStop)), out += childrens.reduce(mergeSiblingPlainStringChildrenReducer, []).map(formatOneChildren(inline, newLvl, options)).join(inline ? "" : `
`.concat(spacer(newLvl, tabStop))), inline || (out += `
`, out += spacer(newLvl - 1, tabStop)), out += "</".concat(displayName, ">");
  } else isInlineAttributeTooLong(attributes, outInlineAttr, lvl, tabStop, maxInlineAttributesLineLength) || (out += " "), out += "/>";
  return out;
}, REACT_FRAGMENT_TAG_NAME_SHORT_SYNTAX = "", REACT_FRAGMENT_TAG_NAME_EXPLICIT_SYNTAX = "React.Fragment", toReactElementTreeNode = function(displayName, key, childrens) {
  var props = {};
  return key && (props = { key }), { type: "ReactElement", displayName, props, defaultProps: {}, childrens };
}, isKeyedFragment = function(_ref) {
  var key = _ref.key;
  return !!key;
}, hasNoChildren = function(_ref2) {
  var childrens = _ref2.childrens;
  return childrens.length === 0;
}, formatReactFragmentNode = function(node, inline, lvl, options) {
  var type = node.type, key = node.key, childrens = node.childrens;
  if (type !== "ReactFragment") throw new Error('The "formatReactFragmentNode" function could only format node of type "ReactFragment". Given: '.concat(type));
  var useFragmentShortSyntax = options.useFragmentShortSyntax, displayName;
  return useFragmentShortSyntax ? hasNoChildren(node) || isKeyedFragment(node) ? displayName = REACT_FRAGMENT_TAG_NAME_EXPLICIT_SYNTAX : displayName = REACT_FRAGMENT_TAG_NAME_SHORT_SYNTAX : displayName = REACT_FRAGMENT_TAG_NAME_EXPLICIT_SYNTAX, formatReactElementNode(toReactElementTreeNode(displayName, key, childrens), inline, lvl, options);
}, jsxStopChars = ["<", ">", "{", "}"], shouldBeEscaped = function(s) {
  return jsxStopChars.some(function(jsxStopChar) {
    return s.includes(jsxStopChar);
  });
}, escape2 = function(s) {
  return shouldBeEscaped(s) ? "{`".concat(s, "`}") : s;
}, preserveTrailingSpace = function(s) {
  var result = s;
  return result.endsWith(" ") && (result = result.replace(/^(.*?)(\s+)$/, "$1{'$2'}")), result.startsWith(" ") && (result = result.replace(/^(\s+)(.*)$/, "{'$1'}$2")), result;
}, formatTreeNode = function(node, inline, lvl, options) {
  if (node.type === "number") return String(node.value);
  if (node.type === "string") return node.value ? "".concat(preserveTrailingSpace(escape2(String(node.value)))) : "";
  if (node.type === "ReactElement") return formatReactElementNode(node, inline, lvl, options);
  if (node.type === "ReactFragment") return formatReactFragmentNode(node, inline, lvl, options);
  throw new TypeError('Unknow format type "'.concat(node.type, '"'));
}, formatTree = function(node, options) {
  return formatTreeNode(node, false, 0, options);
}, reactElementToJsxString = function(element) {
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$filterProps = _ref.filterProps, filterProps3 = _ref$filterProps === void 0 ? [] : _ref$filterProps, _ref$showDefaultProps = _ref.showDefaultProps, showDefaultProps = _ref$showDefaultProps === void 0 ? true : _ref$showDefaultProps, _ref$showFunctions = _ref.showFunctions, showFunctions = _ref$showFunctions === void 0 ? false : _ref$showFunctions, functionValue = _ref.functionValue, _ref$tabStop = _ref.tabStop, tabStop = _ref$tabStop === void 0 ? 2 : _ref$tabStop, _ref$useBooleanShorth = _ref.useBooleanShorthandSyntax, useBooleanShorthandSyntax = _ref$useBooleanShorth === void 0 ? true : _ref$useBooleanShorth, _ref$useFragmentShort = _ref.useFragmentShortSyntax, useFragmentShortSyntax = _ref$useFragmentShort === void 0 ? true : _ref$useFragmentShort, _ref$sortProps = _ref.sortProps, sortProps = _ref$sortProps === void 0 ? true : _ref$sortProps, maxInlineAttributesLineLength = _ref.maxInlineAttributesLineLength, displayName = _ref.displayName;
  if (!element) throw new Error("react-element-to-jsx-string: Expected a ReactElement");
  var options = { filterProps: filterProps3, showDefaultProps, showFunctions, functionValue, tabStop, useBooleanShorthandSyntax, useFragmentShortSyntax, sortProps, maxInlineAttributesLineLength, displayName };
  return formatTree(parseReactElement(element, options), options);
};
var reactElementToJSXString = reactElementToJsxString;
function isReactElement(element) {
  return element.$$typeof != null;
}
function extractFunctionName(func, propName) {
  let { name } = func;
  return name !== "" && name !== "anonymous" && name !== propName ? name : null;
}
var stringResolver = (rawDefaultProp) => l(JSON.stringify(rawDefaultProp));
function generateReactObject(rawDefaultProp) {
  let { type } = rawDefaultProp, { displayName } = type, jsx2 = reactElementToJSXString(rawDefaultProp, {});
  if (displayName != null) {
    let prettyIdentifier = getPrettyElementIdentifier(displayName);
    return l(prettyIdentifier, jsx2);
  }
  if (isString(type) && isHtmlTag(type)) {
    let jsxSummary = reactElementToJSXString(rawDefaultProp, { tabStop: 0 }).replace(/\r?\n|\r/g, "");
    if (!oe(jsxSummary)) return l(jsxSummary);
  }
  return l(ELEMENT_CAPTION, jsx2);
}
var objectResolver = (rawDefaultProp) => {
  if (isReactElement(rawDefaultProp) && rawDefaultProp.type != null) return generateReactObject(rawDefaultProp);
  if (isPlainObject(rawDefaultProp)) {
    let inspectionResult = inspectValue(JSON.stringify(rawDefaultProp));
    return generateObject(inspectionResult);
  }
  if (Array.isArray(rawDefaultProp)) {
    let inspectionResult = inspectValue(JSON.stringify(rawDefaultProp));
    return generateArray(inspectionResult);
  }
  return l(OBJECT_CAPTION);
}, functionResolver = (rawDefaultProp, propDef) => {
  let isElement = false, inspectionResult;
  if (isFunction(rawDefaultProp.render)) isElement = true;
  else if (rawDefaultProp.prototype != null && isFunction(rawDefaultProp.prototype.render)) isElement = true;
  else {
    let innerElement;
    try {
      inspectionResult = inspectValue(rawDefaultProp.toString());
      let { hasParams, params } = inspectionResult.inferredType;
      hasParams ? params.length === 1 && params[0].type === "ObjectPattern" && (innerElement = rawDefaultProp({})) : innerElement = rawDefaultProp(), innerElement != null && isReactElement(innerElement) && (isElement = true);
    } catch {
    }
  }
  let funcName = extractFunctionName(rawDefaultProp, propDef.name);
  if (funcName != null) {
    if (isElement) return l(getPrettyElementIdentifier(funcName));
    inspectionResult != null && (inspectionResult = inspectValue(rawDefaultProp.toString()));
    let { hasParams } = inspectionResult.inferredType;
    return l(getPrettyFuncIdentifier(funcName, hasParams));
  }
  return l(isElement ? ELEMENT_CAPTION : FUNCTION_CAPTION);
}, defaultResolver = (rawDefaultProp) => l(rawDefaultProp.toString()), DEFAULT_TYPE_RESOLVERS = { string: stringResolver, object: objectResolver, function: functionResolver, default: defaultResolver };
function createTypeResolvers(customResolvers = {}) {
  return { ...DEFAULT_TYPE_RESOLVERS, ...customResolvers };
}
function createDefaultValueFromRawDefaultProp(rawDefaultProp, propDef, typeResolvers = DEFAULT_TYPE_RESOLVERS) {
  try {
    switch (typeof rawDefaultProp) {
      case "string":
        return typeResolvers.string(rawDefaultProp, propDef);
      case "object":
        return typeResolvers.object(rawDefaultProp, propDef);
      case "function":
        return typeResolvers.function(rawDefaultProp, propDef);
      default:
        return typeResolvers.default(rawDefaultProp, propDef);
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}
function generateFuncSignature(params, returns) {
  let hasParams = params != null, hasReturns = returns != null;
  if (!hasParams && !hasReturns) return "";
  let funcParts = [];
  if (hasParams) {
    let funcParams = params.map((x) => {
      let prettyName = x.getPrettyName(), typeName = x.getTypeName();
      return typeName != null ? `${prettyName}: ${typeName}` : prettyName;
    });
    funcParts.push(`(${funcParams.join(", ")})`);
  } else funcParts.push("()");
  return hasReturns && funcParts.push(`=> ${returns.getTypeName()}`), funcParts.join(" ");
}
function generateShortFuncSignature(params, returns) {
  let hasParams = params != null, hasReturns = returns != null;
  if (!hasParams && !hasReturns) return "";
  let funcParts = [];
  return hasParams ? funcParts.push("( ... )") : funcParts.push("()"), hasReturns && funcParts.push(`=> ${returns.getTypeName()}`), funcParts.join(" ");
}
function toMultilineSignature(signature) {
  return signature.replace(/,/g, `,\r
`);
}
var MAX_FUNC_LENGTH = 150;
function createTypeDef({ name, short, compact, full, inferredType }) {
  return { name, short, compact, full: full ?? short, inferredType };
}
function cleanPropTypes(value) {
  return value.replace(/PropTypes./g, "").replace(/.isRequired/g, "");
}
function splitIntoLines(value) {
  return value.split(/\r?\n/);
}
function prettyObject(ast, compact = false) {
  return cleanPropTypes(generateObjectCode(ast, compact));
}
function prettyArray(ast, compact = false) {
  return cleanPropTypes(generateCode(ast, compact));
}
function getCaptionForInspectionType(type) {
  switch (type) {
    case "Object":
      return OBJECT_CAPTION;
    case "Array":
      return ARRAY_CAPTION;
    case "Class":
      return CLASS_CAPTION;
    case "Function":
      return FUNCTION_CAPTION;
    case "Element":
      return ELEMENT_CAPTION;
    default:
      return CUSTOM_CAPTION;
  }
}
function generateTypeFromString(value, originalTypeName) {
  let { inferredType, ast } = inspectValue(value), { type } = inferredType, short, compact, full;
  switch (type) {
    case "Identifier":
    case "Literal":
      short = value, compact = value;
      break;
    case "Object": {
      let { depth } = inferredType;
      short = OBJECT_CAPTION, compact = depth === 1 ? prettyObject(ast, true) : null, full = prettyObject(ast);
      break;
    }
    case "Element": {
      let { identifier } = inferredType;
      short = identifier != null && !isHtmlTag(identifier) ? identifier : ELEMENT_CAPTION, compact = splitIntoLines(value).length === 1 ? value : null, full = value;
      break;
    }
    case "Array": {
      let { depth } = inferredType;
      short = ARRAY_CAPTION, compact = depth <= 2 ? prettyArray(ast, true) : null, full = prettyArray(ast);
      break;
    }
    default:
      short = getCaptionForInspectionType(type), compact = splitIntoLines(value).length === 1 ? value : null, full = value;
      break;
  }
  return createTypeDef({ name: originalTypeName, short, compact, full, inferredType: type });
}
function generateCustom({ raw }) {
  return raw != null ? generateTypeFromString(raw, "custom") : createTypeDef({ name: "custom", short: CUSTOM_CAPTION, compact: CUSTOM_CAPTION });
}
function generateFunc2(extractedProp) {
  let { jsDocTags } = extractedProp;
  return jsDocTags != null && (jsDocTags.params != null || jsDocTags.returns != null) ? createTypeDef({ name: "func", short: generateShortFuncSignature(jsDocTags.params, jsDocTags.returns), compact: null, full: generateFuncSignature(jsDocTags.params, jsDocTags.returns) }) : createTypeDef({ name: "func", short: FUNCTION_CAPTION, compact: FUNCTION_CAPTION });
}
function generateShape(type, extractedProp) {
  let fields = Object.keys(type.value).map((key) => `${key}: ${generateType(type.value[key], extractedProp).full}`).join(", "), { inferredType, ast } = inspectValue(`{ ${fields} }`), { depth } = inferredType;
  return createTypeDef({ name: "shape", short: OBJECT_CAPTION, compact: depth === 1 && ast ? prettyObject(ast, true) : null, full: ast ? prettyObject(ast) : null });
}
function objectOf(of) {
  return `objectOf(${of})`;
}
function generateObjectOf(type, extractedProp) {
  let { short, compact, full } = generateType(type.value, extractedProp);
  return createTypeDef({ name: "objectOf", short: objectOf(short), compact: compact != null ? objectOf(compact) : null, full: full && objectOf(full) });
}
function generateUnion(type, extractedProp) {
  if (Array.isArray(type.value)) {
    let values = type.value.reduce((acc, v) => {
      let { short, compact, full } = generateType(v, extractedProp);
      return acc.short.push(short), acc.compact.push(compact), acc.full.push(full), acc;
    }, { short: [], compact: [], full: [] });
    return createTypeDef({ name: "union", short: values.short.join(" | "), compact: values.compact.every((x) => x != null) ? values.compact.join(" | ") : null, full: values.full.join(" | ") });
  }
  return createTypeDef({ name: "union", short: type.value, compact: null });
}
function generateEnumValue({ value, computed }) {
  return computed ? generateTypeFromString(value, "enumvalue") : createTypeDef({ name: "enumvalue", short: value, compact: value });
}
function generateEnum(type) {
  if (Array.isArray(type.value)) {
    let values = type.value.reduce((acc, v) => {
      let { short, compact, full } = generateEnumValue(v);
      return acc.short.push(short), acc.compact.push(compact), acc.full.push(full), acc;
    }, { short: [], compact: [], full: [] });
    return createTypeDef({ name: "enum", short: values.short.join(" | "), compact: values.compact.every((x) => x != null) ? values.compact.join(" | ") : null, full: values.full.join(" | ") });
  }
  return createTypeDef({ name: "enum", short: type.value, compact: type.value });
}
function braceAfter(of) {
  return `${of}[]`;
}
function braceAround(of) {
  return `[${of}]`;
}
function createArrayOfObjectTypeDef(short, compact, full) {
  return createTypeDef({ name: "arrayOf", short: braceAfter(short), compact: compact != null ? braceAround(compact) : null, full: full && braceAround(full) });
}
function generateArray2(type, extractedProp) {
  let { name, short, compact, full, inferredType } = generateType(type.value, extractedProp);
  if (name === "custom") {
    if (inferredType === "Object") return createArrayOfObjectTypeDef(short, compact, full);
  } else if (name === "shape") return createArrayOfObjectTypeDef(short, compact, full);
  return createTypeDef({ name: "arrayOf", short: braceAfter(short), compact: braceAfter(short) });
}
function generateType(type, extractedProp) {
  try {
    switch (type.name) {
      case "custom":
        return generateCustom(type);
      case "func":
        return generateFunc2(extractedProp);
      case "shape":
        return generateShape(type, extractedProp);
      case "instanceOf":
        return createTypeDef({ name: "instanceOf", short: type.value, compact: type.value });
      case "objectOf":
        return generateObjectOf(type, extractedProp);
      case "union":
        return generateUnion(type, extractedProp);
      case "enum":
        return generateEnum(type);
      case "arrayOf":
        return generateArray2(type, extractedProp);
      default:
        return createTypeDef({ name: type.name, short: type.name, compact: type.name });
    }
  } catch (e) {
    console.error(e);
  }
  return createTypeDef({ name: "unknown", short: "unknown", compact: "unknown" });
}
function createType(extractedProp) {
  let { type } = extractedProp.docgenInfo;
  if (type == null) return null;
  try {
    switch (type.name) {
      case "custom":
      case "shape":
      case "instanceOf":
      case "objectOf":
      case "union":
      case "enum":
      case "arrayOf": {
        let { short, compact, full } = generateType(type, extractedProp);
        return compact != null && !B(compact) ? l(compact) : full ? l(short, full) : l(short);
      }
      case "func": {
        let { short, full } = generateType(type, extractedProp), summary = short, detail;
        return full && full.length < MAX_FUNC_LENGTH ? summary = full : full && (detail = toMultilineSignature(full)), l(summary, detail);
      }
      default:
        return null;
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}
var funcResolver = (rawDefaultProp, { name, type }) => {
  let isElement = (type == null ? void 0 : type.summary) === "element" || (type == null ? void 0 : type.summary) === "elementType", funcName = extractFunctionName(rawDefaultProp, name);
  if (funcName != null) {
    if (isElement) return l(getPrettyElementIdentifier(funcName));
    let { hasParams } = inspectValue(rawDefaultProp.toString()).inferredType;
    return l(getPrettyFuncIdentifier(funcName, hasParams));
  }
  return l(isElement ? ELEMENT_CAPTION : FUNCTION_CAPTION);
}, rawDefaultPropTypeResolvers = createTypeResolvers({ function: funcResolver });
function keepOriginalDefinitionOrder(extractedProps, component) {
  let { propTypes } = component;
  return propTypes != null ? Object.keys(propTypes).map((x) => extractedProps.find((y) => y.name === x)).filter(Boolean) : extractedProps;
}
function enhancePropTypesProp(extractedProp, rawDefaultProp) {
  let { propDef } = extractedProp, newtype = createType(extractedProp);
  newtype != null && (propDef.type = newtype);
  let { defaultValue } = extractedProp.docgenInfo;
  if (defaultValue != null && defaultValue.value != null) {
    let newDefaultValue = createDefaultValue(defaultValue.value);
    newDefaultValue != null && (propDef.defaultValue = newDefaultValue);
  } else if (rawDefaultProp != null) {
    let newDefaultValue = createDefaultValueFromRawDefaultProp(rawDefaultProp, propDef, rawDefaultPropTypeResolvers);
    newDefaultValue != null && (propDef.defaultValue = newDefaultValue);
  }
  return propDef;
}
function enhancePropTypesProps(extractedProps, component) {
  let rawDefaultProps = component.defaultProps != null ? component.defaultProps : {}, enhancedProps = extractedProps.map((x) => enhancePropTypesProp(x, rawDefaultProps[x.propDef.name]));
  return keepOriginalDefinitionOrder(enhancedProps, component);
}
function enhanceTypeScriptProp(extractedProp, rawDefaultProp) {
  let { propDef } = extractedProp, { defaultValue } = extractedProp.docgenInfo;
  if (defaultValue != null && defaultValue.value != null) {
    let newDefaultValue = createDefaultValue(defaultValue.value);
    newDefaultValue != null && (propDef.defaultValue = newDefaultValue);
  }
  return propDef;
}
function enhanceTypeScriptProps(extractedProps) {
  return extractedProps.map((prop) => enhanceTypeScriptProp(prop));
}
var propTypesMap = /* @__PURE__ */ new Map();
Object.keys(import_prop_types.default).forEach((typeName) => {
  let type = import_prop_types.default[typeName];
  propTypesMap.set(type, typeName), propTypesMap.set(type.isRequired, typeName);
});
function getPropDefs(component, section) {
  let processedComponent = component;
  !z(component) && !component.propTypes && isMemo(component) && (processedComponent = component.type);
  let extractedProps = on(processedComponent, section);
  if (extractedProps.length === 0) return [];
  switch (extractedProps[0].typeSystem) {
    case je.JAVASCRIPT:
      return enhancePropTypesProps(extractedProps, component);
    case je.TYPESCRIPT:
      return enhanceTypeScriptProps(extractedProps);
    default:
      return extractedProps.map((x) => x.propDef);
  }
}
var extractProps = (component) => ({ rows: getPropDefs(component, "props") });
var extractArgTypes = (component) => {
  if (component) {
    let { rows } = extractProps(component);
    if (rows) return rows.reduce((acc, row) => {
      let { name, description, type, sbType, defaultValue: defaultSummary, jsDocTags, required } = row;
      return acc[name] = { name, description, type: { required, ...sbType }, table: { type: type ?? void 0, jsDocTags, defaultValue: defaultSummary ?? void 0 } }, acc;
    }, {});
  }
  return null;
};
var reactElementToJSXString2 = reactElementToJsxString, toPascalCase = (str) => str.charAt(0).toUpperCase() + str.slice(1), getReactSymbolName = (elementType) => (elementType.$$typeof || elementType).toString().replace(/^Symbol\((.*)\)$/, "$1").split(".").map((segment) => segment.split("_").map(toPascalCase).join("")).join(".");
function simplifyNodeForStringify(node) {
  if (reactExports.isValidElement(node)) {
    let props = Object.keys(node.props).reduce((acc, cur) => (acc[cur] = simplifyNodeForStringify(node.props[cur]), acc), {});
    return { ...node, props, _owner: null };
  }
  return Array.isArray(node) ? node.map(simplifyNodeForStringify) : node;
}
var renderJsx = (code, options) => {
  if (typeof code > "u") return logger.warn("Too many skip or undefined component"), null;
  let renderedJSX = code, Type = renderedJSX.type;
  for (let i = 0; i < (options == null ? void 0 : options.skip); i += 1) {
    if (typeof renderedJSX > "u") return logger.warn("Cannot skip undefined element"), null;
    if (React.Children.count(renderedJSX) > 1) return logger.warn("Trying to skip an array of elements"), null;
    typeof renderedJSX.props.children > "u" ? (logger.warn("Not enough children to skip elements."), typeof renderedJSX.type == "function" && renderedJSX.type.name === "" && (renderedJSX = React.createElement(Type, { ...renderedJSX.props }))) : typeof renderedJSX.props.children == "function" ? renderedJSX = renderedJSX.props.children() : renderedJSX = renderedJSX.props.children;
  }
  let displayNameDefaults;
  typeof (options == null ? void 0 : options.displayName) == "string" ? displayNameDefaults = { showFunctions: true, displayName: () => options.displayName } : displayNameDefaults = { displayName: (el) => {
    var _a;
    return el.type.displayName ? el.type.displayName : Y(el.type, "displayName") ? Y(el.type, "displayName") : ((_a = el.type.render) == null ? void 0 : _a.displayName) ? el.type.render.displayName : typeof el.type == "symbol" || el.type.$$typeof && typeof el.type.$$typeof == "symbol" ? getReactSymbolName(el.type) : el.type.name && el.type.name !== "_default" ? el.type.name : typeof el.type == "function" ? "No Display Name" : isForwardRef(el.type) ? el.type.render.name : isMemo(el.type) ? el.type.type.name : el.type;
  } };
  let opts = { ...displayNameDefaults, ...{ filterProps: (value, key) => value !== void 0 }, ...options };
  return React.Children.map(code, (c) => {
    let child = typeof c == "number" ? c.toString() : c, string = (typeof reactElementToJSXString2 == "function" ? reactElementToJSXString2 : reactElementToJSXString2.default)(simplifyNodeForStringify(child), opts);
    if (string.indexOf("&quot;") > -1) {
      let matches = string.match(/\S+=\\"([^"]*)\\"/g);
      matches && matches.forEach((match) => {
        string = string.replace(match, match.replace(/&quot;/g, "'"));
      });
    }
    return string;
  }).join(`
`).replace(/function\s+noRefCheck\(\)\s*\{\}/g, "() => {}");
}, defaultOpts = { skip: 0, showFunctions: false, enableBeautify: true, showDefaultProps: false }, skipJsxRender = (context) => {
  var _a;
  let sourceParams = (_a = context == null ? void 0 : context.parameters.docs) == null ? void 0 : _a.source, isArgsStory = context == null ? void 0 : context.parameters.__isArgsStory;
  return (sourceParams == null ? void 0 : sourceParams.type) === gt.DYNAMIC ? false : !isArgsStory || (sourceParams == null ? void 0 : sourceParams.code) || (sourceParams == null ? void 0 : sourceParams.type) === gt.CODE;
}, isMdx = (node) => {
  var _a, _b;
  return ((_a = node.type) == null ? void 0 : _a.displayName) === "MDXCreateElement" && !!((_b = node.props) == null ? void 0 : _b.mdxType);
}, mdxToJsx = (node) => {
  if (!isMdx(node)) return node;
  let { mdxType, originalType, children, ...rest } = node.props, jsxChildren = [];
  return children && (jsxChildren = (Array.isArray(children) ? children : [children]).map(mdxToJsx)), reactExports.createElement(originalType, rest, ...jsxChildren);
}, jsxDecorator = (storyFn, context) => {
  var _a, _b;
  let channel = addons.getChannel(), skip = skipJsxRender(context), jsx2 = "";
  useEffect(() => {
    if (!skip) {
      let { id, unmappedArgs } = context;
      channel.emit(yn, { id, source: jsx2, args: unmappedArgs });
    }
  });
  let story = storyFn();
  if (skip) return story;
  let options = { ...defaultOpts, ...(context == null ? void 0 : context.parameters.jsx) || {} }, storyJsx = ((_b = (_a = context == null ? void 0 : context.parameters.docs) == null ? void 0 : _a.source) == null ? void 0 : _b.excludeDecorators) ? context.originalStoryFn(context.args, context) : story, sourceJsx = mdxToJsx(storyJsx), rendered = renderJsx(sourceJsx, options);
  return rendered && (jsx2 = rendered), story;
};
var applyDecorators = (storyFn, decorators2) => {
  let jsxIndex = decorators2.findIndex((d) => d.originalFn === jsxDecorator), reorderedDecorators = jsxIndex === -1 ? decorators2 : [...decorators2.splice(jsxIndex, 1), ...decorators2];
  return defaultDecorateStory(storyFn, reorderedDecorators);
};
var parameters = { docs: { story: { inline: true }, extractArgTypes, extractComponentDescription: nn } }, decorators = [jsxDecorator], argTypesEnhancers = [cn];
export {
  applyDecorators,
  argTypesEnhancers,
  decorators,
  parameters
};
