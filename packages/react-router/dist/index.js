var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/pathe@1.1.2/node_modules/pathe/dist/shared/pathe.1f0a373c.cjs
var require_pathe_1f0a373c = __commonJS({
  "../../node_modules/.pnpm/pathe@1.1.2/node_modules/pathe/dist/shared/pathe.1f0a373c.cjs"(exports) {
    "use strict";
    var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
    function normalizeWindowsPath(input = "") {
      if (!input) {
        return input;
      }
      return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
    }
    var _UNC_REGEX = /^[/\\]{2}/;
    var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
    var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
    var _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/;
    var sep = "/";
    var delimiter = ":";
    var normalize = function(path3) {
      if (path3.length === 0) {
        return ".";
      }
      path3 = normalizeWindowsPath(path3);
      const isUNCPath = path3.match(_UNC_REGEX);
      const isPathAbsolute = isAbsolute(path3);
      const trailingSeparator = path3[path3.length - 1] === "/";
      path3 = normalizeString(path3, !isPathAbsolute);
      if (path3.length === 0) {
        if (isPathAbsolute) {
          return "/";
        }
        return trailingSeparator ? "./" : ".";
      }
      if (trailingSeparator) {
        path3 += "/";
      }
      if (_DRIVE_LETTER_RE.test(path3)) {
        path3 += "/";
      }
      if (isUNCPath) {
        if (!isPathAbsolute) {
          return `//./${path3}`;
        }
        return `//${path3}`;
      }
      return isPathAbsolute && !isAbsolute(path3) ? `/${path3}` : path3;
    };
    var join = function(...arguments_) {
      if (arguments_.length === 0) {
        return ".";
      }
      let joined;
      for (const argument of arguments_) {
        if (argument && argument.length > 0) {
          if (joined === void 0) {
            joined = argument;
          } else {
            joined += `/${argument}`;
          }
        }
      }
      if (joined === void 0) {
        return ".";
      }
      return normalize(joined.replace(/\/\/+/g, "/"));
    };
    function cwd() {
      if (typeof process !== "undefined" && typeof process.cwd === "function") {
        return process.cwd().replace(/\\/g, "/");
      }
      return "/";
    }
    var resolve = function(...arguments_) {
      arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
      let resolvedPath = "";
      let resolvedAbsolute = false;
      for (let index2 = arguments_.length - 1; index2 >= -1 && !resolvedAbsolute; index2--) {
        const path3 = index2 >= 0 ? arguments_[index2] : cwd();
        if (!path3 || path3.length === 0) {
          continue;
        }
        resolvedPath = `${path3}/${resolvedPath}`;
        resolvedAbsolute = isAbsolute(path3);
      }
      resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
      if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
        return `/${resolvedPath}`;
      }
      return resolvedPath.length > 0 ? resolvedPath : ".";
    };
    function normalizeString(path3, allowAboveRoot) {
      let res = "";
      let lastSegmentLength = 0;
      let lastSlash = -1;
      let dots = 0;
      let char = null;
      for (let index2 = 0; index2 <= path3.length; ++index2) {
        if (index2 < path3.length) {
          char = path3[index2];
        } else if (char === "/") {
          break;
        } else {
          char = "/";
        }
        if (char === "/") {
          if (lastSlash === index2 - 1 || dots === 1) ;
          else if (dots === 2) {
            if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
              if (res.length > 2) {
                const lastSlashIndex = res.lastIndexOf("/");
                if (lastSlashIndex === -1) {
                  res = "";
                  lastSegmentLength = 0;
                } else {
                  res = res.slice(0, lastSlashIndex);
                  lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
                }
                lastSlash = index2;
                dots = 0;
                continue;
              } else if (res.length > 0) {
                res = "";
                lastSegmentLength = 0;
                lastSlash = index2;
                dots = 0;
                continue;
              }
            }
            if (allowAboveRoot) {
              res += res.length > 0 ? "/.." : "..";
              lastSegmentLength = 2;
            }
          } else {
            if (res.length > 0) {
              res += `/${path3.slice(lastSlash + 1, index2)}`;
            } else {
              res = path3.slice(lastSlash + 1, index2);
            }
            lastSegmentLength = index2 - lastSlash - 1;
          }
          lastSlash = index2;
          dots = 0;
        } else if (char === "." && dots !== -1) {
          ++dots;
        } else {
          dots = -1;
        }
      }
      return res;
    }
    var isAbsolute = function(p) {
      return _IS_ABSOLUTE_RE.test(p);
    };
    var toNamespacedPath = function(p) {
      return normalizeWindowsPath(p);
    };
    var _EXTNAME_RE = /.(\.[^./]+)$/;
    var extname = function(p) {
      const match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
      return match && match[1] || "";
    };
    var relative2 = function(from, to) {
      const _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/");
      const _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
      if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0]) {
        return _to.join("/");
      }
      const _fromCopy = [..._from];
      for (const segment of _fromCopy) {
        if (_to[0] !== segment) {
          break;
        }
        _from.shift();
        _to.shift();
      }
      return [..._from.map(() => ".."), ..._to].join("/");
    };
    var dirname = function(p) {
      const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
      if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
        segments[0] += "/";
      }
      return segments.join("/") || (isAbsolute(p) ? "/" : ".");
    };
    var format = function(p) {
      const segments = [p.root, p.dir, p.base ?? p.name + p.ext].filter(Boolean);
      return normalizeWindowsPath(
        p.root ? resolve(...segments) : segments.join("/")
      );
    };
    var basename = function(p, extension) {
      const lastSegment = normalizeWindowsPath(p).split("/").pop();
      return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
    };
    var parse = function(p) {
      const root = normalizeWindowsPath(p).split("/").shift() || "/";
      const base = basename(p);
      const extension = extname(base);
      return {
        root,
        dir: dirname(p),
        base,
        ext: extension,
        name: base.slice(0, base.length - extension.length)
      };
    };
    var path2 = {
      __proto__: null,
      basename,
      delimiter,
      dirname,
      extname,
      format,
      isAbsolute,
      join,
      normalize,
      normalizeString,
      parse,
      relative: relative2,
      resolve,
      sep,
      toNamespacedPath
    };
    exports.basename = basename;
    exports.delimiter = delimiter;
    exports.dirname = dirname;
    exports.extname = extname;
    exports.format = format;
    exports.isAbsolute = isAbsolute;
    exports.join = join;
    exports.normalize = normalize;
    exports.normalizeString = normalizeString;
    exports.normalizeWindowsPath = normalizeWindowsPath;
    exports.parse = parse;
    exports.path = path2;
    exports.relative = relative2;
    exports.resolve = resolve;
    exports.sep = sep;
    exports.toNamespacedPath = toNamespacedPath;
  }
});

// ../../node_modules/.pnpm/pathe@1.1.2/node_modules/pathe/dist/index.cjs
var require_dist = __commonJS({
  "../../node_modules/.pnpm/pathe@1.1.2/node_modules/pathe/dist/index.cjs"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var index2 = require_pathe_1f0a373c();
    exports.basename = index2.basename;
    exports.default = index2.path;
    exports.delimiter = index2.delimiter;
    exports.dirname = index2.dirname;
    exports.extname = index2.extname;
    exports.format = index2.format;
    exports.isAbsolute = index2.isAbsolute;
    exports.join = index2.join;
    exports.normalize = index2.normalize;
    exports.normalizeString = index2.normalizeString;
    exports.parse = index2.parse;
    exports.relative = index2.relative;
    exports.resolve = index2.resolve;
    exports.sep = index2.sep;
    exports.toNamespacedPath = index2.toNamespacedPath;
  }
});

// ../../node_modules/.pnpm/valibot@1.2.0_typescript@5.9.2/node_modules/valibot/dist/index.cjs
var require_dist2 = __commonJS({
  "../../node_modules/.pnpm/valibot@1.2.0_typescript@5.9.2/node_modules/valibot/dist/index.cjs"(exports) {
    "use strict";
    var store$4;
    function setGlobalConfig(config$1) {
      store$4 = {
        ...store$4,
        ...config$1
      };
    }
    // @__NO_SIDE_EFFECTS__
    function getGlobalConfig(config$1) {
      return {
        lang: config$1?.lang ?? store$4?.lang,
        message: config$1?.message,
        abortEarly: config$1?.abortEarly ?? store$4?.abortEarly,
        abortPipeEarly: config$1?.abortPipeEarly ?? store$4?.abortPipeEarly
      };
    }
    function deleteGlobalConfig() {
      store$4 = void 0;
    }
    var store$3;
    function setGlobalMessage(message$1, lang) {
      if (!store$3) store$3 = /* @__PURE__ */ new Map();
      store$3.set(lang, message$1);
    }
    // @__NO_SIDE_EFFECTS__
    function getGlobalMessage(lang) {
      return store$3?.get(lang);
    }
    function deleteGlobalMessage(lang) {
      store$3?.delete(lang);
    }
    var store$2;
    function setSchemaMessage(message$1, lang) {
      if (!store$2) store$2 = /* @__PURE__ */ new Map();
      store$2.set(lang, message$1);
    }
    // @__NO_SIDE_EFFECTS__
    function getSchemaMessage(lang) {
      return store$2?.get(lang);
    }
    function deleteSchemaMessage(lang) {
      store$2?.delete(lang);
    }
    var store$1;
    function setSpecificMessage(reference, message$1, lang) {
      if (!store$1) store$1 = /* @__PURE__ */ new Map();
      if (!store$1.get(reference)) store$1.set(reference, /* @__PURE__ */ new Map());
      store$1.get(reference).set(lang, message$1);
    }
    // @__NO_SIDE_EFFECTS__
    function getSpecificMessage(reference, lang) {
      return store$1?.get(reference)?.get(lang);
    }
    function deleteSpecificMessage(reference, lang) {
      store$1?.get(reference)?.delete(lang);
    }
    // @__NO_SIDE_EFFECTS__
    function _stringify(input) {
      const type = typeof input;
      if (type === "string") return `"${input}"`;
      if (type === "number" || type === "bigint" || type === "boolean") return `${input}`;
      if (type === "object" || type === "function") return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
      return type;
    }
    function _addIssue(context, label, dataset, config$1, other) {
      const input = other && "input" in other ? other.input : dataset.value;
      const expected = other?.expected ?? context.expects ?? null;
      const received = other?.received ?? /* @__PURE__ */ _stringify(input);
      const issue = {
        kind: context.kind,
        type: context.type,
        input,
        expected,
        received,
        message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
        requirement: context.requirement,
        path: other?.path,
        issues: other?.issues,
        lang: config$1.lang,
        abortEarly: config$1.abortEarly,
        abortPipeEarly: config$1.abortPipeEarly
      };
      const isSchema = context.kind === "schema";
      const message$1 = other?.message ?? context.message ?? /* @__PURE__ */ getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? /* @__PURE__ */ getSchemaMessage(issue.lang) : null) ?? config$1.message ?? /* @__PURE__ */ getGlobalMessage(issue.lang);
      if (message$1 !== void 0) issue.message = typeof message$1 === "function" ? message$1(issue) : message$1;
      if (isSchema) dataset.typed = false;
      if (dataset.issues) dataset.issues.push(issue);
      else dataset.issues = [issue];
    }
    var textEncoder;
    // @__NO_SIDE_EFFECTS__
    function _getByteCount(input) {
      if (!textEncoder) textEncoder = new TextEncoder();
      return textEncoder.encode(input).length;
    }
    var segmenter;
    // @__NO_SIDE_EFFECTS__
    function _getGraphemeCount(input) {
      if (!segmenter) segmenter = new Intl.Segmenter();
      const segments = segmenter.segment(input);
      let count = 0;
      for (const _ of segments) count++;
      return count;
    }
    // @__NO_SIDE_EFFECTS__
    function _getLastMetadata(schema, type) {
      if ("pipe" in schema) {
        const nestedSchemas = [];
        for (let index2 = schema.pipe.length - 1; index2 >= 0; index2--) {
          const item = schema.pipe[index2];
          if (item.kind === "schema" && "pipe" in item) nestedSchemas.push(item);
          else if (item.kind === "metadata" && item.type === type) return item[type];
        }
        for (const nestedSchema of nestedSchemas) {
          const result = /* @__PURE__ */ _getLastMetadata(nestedSchema, type);
          if (result !== void 0) return result;
        }
      }
    }
    // @__NO_SIDE_EFFECTS__
    function _getStandardProps(context) {
      return {
        version: 1,
        vendor: "valibot",
        validate(value$1) {
          return context["~run"]({ value: value$1 }, /* @__PURE__ */ getGlobalConfig());
        }
      };
    }
    var store;
    // @__NO_SIDE_EFFECTS__
    function _getWordCount(locales, input) {
      if (!store) store = /* @__PURE__ */ new Map();
      if (!store.get(locales)) store.set(locales, new Intl.Segmenter(locales, { granularity: "word" }));
      const segments = store.get(locales).segment(input);
      let count = 0;
      for (const segment of segments) if (segment.isWordLike) count++;
      return count;
    }
    var NON_DIGIT_REGEX = /\D/gu;
    // @__NO_SIDE_EFFECTS__
    function _isLuhnAlgo(input) {
      const number$1 = input.replace(NON_DIGIT_REGEX, "");
      let length$1 = number$1.length;
      let bit = 1;
      let sum = 0;
      while (length$1) {
        const value$1 = +number$1[--length$1];
        bit ^= 1;
        sum += bit ? [
          0,
          2,
          4,
          6,
          8,
          1,
          3,
          5,
          7,
          9
        ][value$1] : value$1;
      }
      return sum % 10 === 0;
    }
    // @__NO_SIDE_EFFECTS__
    function _isValidObjectKey(object$1, key) {
      return Object.hasOwn(object$1, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
    }
    // @__NO_SIDE_EFFECTS__
    function _joinExpects(values$1, separator) {
      const list = [...new Set(values$1)];
      if (list.length > 1) return `(${list.join(` ${separator} `)})`;
      return list[0] ?? "never";
    }
    // @__NO_SIDE_EFFECTS__
    function entriesFromList(list, schema) {
      const entries$1 = {};
      for (const key of list) entries$1[key] = schema;
      return entries$1;
    }
    // @__NO_SIDE_EFFECTS__
    function entriesFromObjects(schemas) {
      const entries$1 = {};
      for (const schema of schemas) Object.assign(entries$1, schema.entries);
      return entries$1;
    }
    // @__NO_SIDE_EFFECTS__
    function getDotPath(issue) {
      if (issue.path) {
        let key = "";
        for (const item of issue.path) if (typeof item.key === "string" || typeof item.key === "number") if (key) key += `.${item.key}`;
        else key += item.key;
        else return null;
        return key;
      }
      return null;
    }
    // @__NO_SIDE_EFFECTS__
    function isOfKind(kind, object$1) {
      return object$1.kind === kind;
    }
    // @__NO_SIDE_EFFECTS__
    function isOfType(type, object$1) {
      return object$1.type === type;
    }
    // @__NO_SIDE_EFFECTS__
    function isValiError(error) {
      return error instanceof ValiError;
    }
    var ValiError = class extends Error {
      /**
      * Creates a Valibot error with useful information.
      *
      * @param issues The error issues.
      */
      constructor(issues) {
        super(issues[0].message);
        this.name = "ValiError";
        this.issues = issues;
      }
    };
    // @__NO_SIDE_EFFECTS__
    function args(schema) {
      return {
        kind: "transformation",
        type: "args",
        reference: args,
        async: false,
        schema,
        "~run"(dataset, config$1) {
          const func = dataset.value;
          dataset.value = (...args_) => {
            const argsDataset = this.schema["~run"]({ value: args_ }, config$1);
            if (argsDataset.issues) throw new ValiError(argsDataset.issues);
            return func(...argsDataset.value);
          };
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function argsAsync(schema) {
      return {
        kind: "transformation",
        type: "args",
        reference: argsAsync,
        async: false,
        schema,
        "~run"(dataset, config$1) {
          const func = dataset.value;
          dataset.value = async (...args$1) => {
            const argsDataset = await schema["~run"]({ value: args$1 }, config$1);
            if (argsDataset.issues) throw new ValiError(argsDataset.issues);
            return func(...argsDataset.value);
          };
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function awaitAsync() {
      return {
        kind: "transformation",
        type: "await",
        reference: awaitAsync,
        async: true,
        async "~run"(dataset) {
          dataset.value = await dataset.value;
          return dataset;
        }
      };
    }
    var BASE64_REGEX = /^(?:[\da-z+/]{4})*(?:[\da-z+/]{2}==|[\da-z+/]{3}=)?$/iu;
    var BIC_REGEX = /^[A-Z]{6}(?!00)[\dA-Z]{2}(?:[\dA-Z]{3})?$/u;
    var CUID2_REGEX = /^[a-z][\da-z]*$/u;
    var DECIMAL_REGEX = /^[+-]?(?:\d*\.)?\d+$/u;
    var DIGITS_REGEX = /^\d+$/u;
    var EMAIL_REGEX = /^[\w+-]+(?:\.[\w+-]+)*@[\da-z]+(?:[.-][\da-z]+)*\.[a-z]{2,}$/iu;
    var EMOJI_REGEX = /^(?:[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|(?![\p{Emoji_Modifier_Base}\u{1F1E6}-\u{1F1FF}])\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|(?![\p{Emoji_Modifier_Base}\u{1F1E6}-\u{1F1FF}])\p{Emoji_Presentation}))*)+$/u;
    var HEXADECIMAL_REGEX = /^(?:0[hx])?[\da-fA-F]+$/u;
    var HEX_COLOR_REGEX = /^#(?:[\da-fA-F]{3,4}|[\da-fA-F]{6}|[\da-fA-F]{8})$/u;
    var IMEI_REGEX = /^\d{15}$|^\d{2}-\d{6}-\d{6}-\d$/u;
    var IPV4_REGEX = /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$/u;
    var IPV6_REGEX = /^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
    var IP_REGEX = /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$|^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
    var ISO_DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])$/u;
    var ISO_DATE_TIME_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])[T ](?:0\d|1\d|2[0-3]):[0-5]\d$/u;
    var ISO_TIME_REGEX = /^(?:0\d|1\d|2[0-3]):[0-5]\d$/u;
    var ISO_TIME_SECOND_REGEX = /^(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}$/u;
    var ISO_TIMESTAMP_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])[T ](?:0\d|1\d|2[0-3])(?::[0-5]\d){2}(?:\.\d{1,9})?(?:Z|[+-](?:0\d|1\d|2[0-3])(?::?[0-5]\d)?)$/u;
    var ISO_WEEK_REGEX = /^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/u;
    var MAC48_REGEX = /^(?:[\da-f]{2}:){5}[\da-f]{2}$|^(?:[\da-f]{2}-){5}[\da-f]{2}$|^(?:[\da-f]{4}\.){2}[\da-f]{4}$/iu;
    var MAC64_REGEX = /^(?:[\da-f]{2}:){7}[\da-f]{2}$|^(?:[\da-f]{2}-){7}[\da-f]{2}$|^(?:[\da-f]{4}\.){3}[\da-f]{4}$|^(?:[\da-f]{4}:){3}[\da-f]{4}$/iu;
    var MAC_REGEX = /^(?:[\da-f]{2}:){5}[\da-f]{2}$|^(?:[\da-f]{2}-){5}[\da-f]{2}$|^(?:[\da-f]{4}\.){2}[\da-f]{4}$|^(?:[\da-f]{2}:){7}[\da-f]{2}$|^(?:[\da-f]{2}-){7}[\da-f]{2}$|^(?:[\da-f]{4}\.){3}[\da-f]{4}$|^(?:[\da-f]{4}:){3}[\da-f]{4}$/iu;
    var NANO_ID_REGEX = /^[\w-]+$/u;
    var OCTAL_REGEX = /^(?:0o)?[0-7]+$/u;
    var RFC_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var SLUG_REGEX = /^[\da-z]+(?:[-_][\da-z]+)*$/u;
    var ULID_REGEX = /^[\da-hjkmnp-tv-zA-HJKMNP-TV-Z]{26}$/u;
    var UUID_REGEX = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/iu;
    // @__NO_SIDE_EFFECTS__
    function base64(message$1) {
      return {
        kind: "validation",
        type: "base64",
        reference: base64,
        async: false,
        expects: null,
        requirement: BASE64_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Base64", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function bic(message$1) {
      return {
        kind: "validation",
        type: "bic",
        reference: bic,
        async: false,
        expects: null,
        requirement: BIC_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "BIC", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function brand(name) {
      return {
        kind: "transformation",
        type: "brand",
        reference: brand,
        async: false,
        name,
        "~run"(dataset) {
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function bytes(requirement, message$1) {
      return {
        kind: "validation",
        type: "bytes",
        reference: bytes,
        async: false,
        expects: `${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
            if (length$1 !== this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function check(requirement, message$1) {
      return {
        kind: "validation",
        type: "check",
        reference: check,
        async: false,
        expects: null,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function checkAsync(requirement, message$1) {
      return {
        kind: "validation",
        type: "check",
        reference: checkAsync,
        async: true,
        expects: null,
        requirement,
        message: message$1,
        async "~run"(dataset, config$1) {
          if (dataset.typed && !await this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function checkItems(requirement, message$1) {
      return {
        kind: "validation",
        type: "check_items",
        reference: checkItems,
        async: false,
        expects: null,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) for (let index2 = 0; index2 < dataset.value.length; index2++) {
            const item = dataset.value[index2];
            if (!this.requirement(item, index2, dataset.value)) _addIssue(this, "item", dataset, config$1, {
              input: item,
              path: [{
                type: "array",
                origin: "value",
                input: dataset.value,
                key: index2,
                value: item
              }]
            });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function checkItemsAsync(requirement, message$1) {
      return {
        kind: "validation",
        type: "check_items",
        reference: checkItemsAsync,
        async: true,
        expects: null,
        requirement,
        message: message$1,
        async "~run"(dataset, config$1) {
          if (dataset.typed) {
            const requirementResults = await Promise.all(dataset.value.map(this.requirement));
            for (let index2 = 0; index2 < dataset.value.length; index2++) if (!requirementResults[index2]) {
              const item = dataset.value[index2];
              _addIssue(this, "item", dataset, config$1, {
                input: item,
                path: [{
                  type: "array",
                  origin: "value",
                  input: dataset.value,
                  key: index2,
                  value: item
                }]
              });
            }
          }
          return dataset;
        }
      };
    }
    var CREDIT_CARD_REGEX = /^(?:\d{14,19}|\d{4}(?: \d{3,6}){2,4}|\d{4}(?:-\d{3,6}){2,4})$/u;
    var SANITIZE_REGEX = /[- ]/gu;
    var PROVIDER_REGEX_LIST = [
      /^3[47]\d{13}$/u,
      /^3(?:0[0-5]|[68]\d)\d{11,13}$/u,
      /^6(?:011|5\d{2})\d{12,15}$/u,
      /^(?:2131|1800|35\d{3})\d{11}$/u,
      /^5[1-5]\d{2}|(?:222\d|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/u,
      /^(?:6[27]\d{14,17}|81\d{14,17})$/u,
      /^4\d{12}(?:\d{3,6})?$/u
    ];
    // @__NO_SIDE_EFFECTS__
    function creditCard(message$1) {
      return {
        kind: "validation",
        type: "credit_card",
        reference: creditCard,
        async: false,
        expects: null,
        requirement(input) {
          let sanitized;
          return CREDIT_CARD_REGEX.test(input) && (sanitized = input.replace(SANITIZE_REGEX, "")) && PROVIDER_REGEX_LIST.some((regex$1) => regex$1.test(sanitized)) && /* @__PURE__ */ _isLuhnAlgo(sanitized);
        },
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "credit card", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function cuid2(message$1) {
      return {
        kind: "validation",
        type: "cuid2",
        reference: cuid2,
        async: false,
        expects: null,
        requirement: CUID2_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Cuid2", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function decimal(message$1) {
      return {
        kind: "validation",
        type: "decimal",
        reference: decimal,
        async: false,
        expects: null,
        requirement: DECIMAL_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "decimal", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function description(description_) {
      return {
        kind: "metadata",
        type: "description",
        reference: description,
        description: description_
      };
    }
    // @__NO_SIDE_EFFECTS__
    function digits(message$1) {
      return {
        kind: "validation",
        type: "digits",
        reference: digits,
        async: false,
        expects: null,
        requirement: DIGITS_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "digits", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function email(message$1) {
      return {
        kind: "validation",
        type: "email",
        reference: email,
        expects: null,
        async: false,
        requirement: EMAIL_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "email", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function emoji(message$1) {
      return {
        kind: "validation",
        type: "emoji",
        reference: emoji,
        async: false,
        expects: null,
        requirement: EMOJI_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "emoji", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function empty(message$1) {
      return {
        kind: "validation",
        type: "empty",
        reference: empty,
        async: false,
        expects: "0",
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.length > 0) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function endsWith(requirement, message$1) {
      return {
        kind: "validation",
        type: "ends_with",
        reference: endsWith,
        async: false,
        expects: `"${requirement}"`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !dataset.value.endsWith(this.requirement)) _addIssue(this, "end", dataset, config$1, { received: `"${dataset.value.slice(-this.requirement.length)}"` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function entries(requirement, message$1) {
      return {
        kind: "validation",
        type: "entries",
        reference: entries,
        async: false,
        expects: `${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (!dataset.typed) return dataset;
          const count = Object.keys(dataset.value).length;
          if (dataset.typed && count !== this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function everyItem(requirement, message$1) {
      return {
        kind: "validation",
        type: "every_item",
        reference: everyItem,
        async: false,
        expects: null,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !dataset.value.every(this.requirement)) _addIssue(this, "item", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function examples(examples_) {
      return {
        kind: "metadata",
        type: "examples",
        reference: examples,
        examples: examples_
      };
    }
    // @__NO_SIDE_EFFECTS__
    function excludes(requirement, message$1) {
      const received = /* @__PURE__ */ _stringify(requirement);
      return {
        kind: "validation",
        type: "excludes",
        reference: excludes,
        async: false,
        expects: `!${received}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.includes(this.requirement)) _addIssue(this, "content", dataset, config$1, { received });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function filterItems(operation) {
      return {
        kind: "transformation",
        type: "filter_items",
        reference: filterItems,
        async: false,
        operation,
        "~run"(dataset) {
          dataset.value = dataset.value.filter(this.operation);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function findItem(operation) {
      return {
        kind: "transformation",
        type: "find_item",
        reference: findItem,
        async: false,
        operation,
        "~run"(dataset) {
          dataset.value = dataset.value.find(this.operation);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function finite(message$1) {
      return {
        kind: "validation",
        type: "finite",
        reference: finite,
        async: false,
        expects: null,
        requirement: Number.isFinite,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "finite", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function flavor(name) {
      return {
        kind: "transformation",
        type: "flavor",
        reference: flavor,
        async: false,
        name,
        "~run"(dataset) {
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function graphemes(requirement, message$1) {
      return {
        kind: "validation",
        type: "graphemes",
        reference: graphemes,
        async: false,
        expects: `${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
            if (count !== this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function gtValue(requirement, message$1) {
      return {
        kind: "validation",
        type: "gt_value",
        reference: gtValue,
        async: false,
        expects: `>${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !(dataset.value > this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
          return dataset;
        }
      };
    }
    var HASH_LENGTHS = {
      md4: 32,
      md5: 32,
      sha1: 40,
      sha256: 64,
      sha384: 96,
      sha512: 128,
      ripemd128: 32,
      ripemd160: 40,
      tiger128: 32,
      tiger160: 40,
      tiger192: 48,
      crc32: 8,
      crc32b: 8,
      adler32: 8
    };
    // @__NO_SIDE_EFFECTS__
    function hash(types, message$1) {
      return {
        kind: "validation",
        type: "hash",
        reference: hash,
        expects: null,
        async: false,
        requirement: RegExp(types.map((type) => `^[a-f0-9]{${HASH_LENGTHS[type]}}$`).join("|"), "iu"),
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hash", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function hexadecimal(message$1) {
      return {
        kind: "validation",
        type: "hexadecimal",
        reference: hexadecimal,
        async: false,
        expects: null,
        requirement: HEXADECIMAL_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hexadecimal", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function hexColor(message$1) {
      return {
        kind: "validation",
        type: "hex_color",
        reference: hexColor,
        async: false,
        expects: null,
        requirement: HEX_COLOR_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "hex color", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function imei(message$1) {
      return {
        kind: "validation",
        type: "imei",
        reference: imei,
        async: false,
        expects: null,
        requirement(input) {
          return IMEI_REGEX.test(input) && /* @__PURE__ */ _isLuhnAlgo(input);
        },
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "IMEI", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function includes(requirement, message$1) {
      const expects = /* @__PURE__ */ _stringify(requirement);
      return {
        kind: "validation",
        type: "includes",
        reference: includes,
        async: false,
        expects,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !dataset.value.includes(this.requirement)) _addIssue(this, "content", dataset, config$1, { received: `!${expects}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function integer(message$1) {
      return {
        kind: "validation",
        type: "integer",
        reference: integer,
        async: false,
        expects: null,
        requirement: Number.isInteger,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "integer", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function ip(message$1) {
      return {
        kind: "validation",
        type: "ip",
        reference: ip,
        async: false,
        expects: null,
        requirement: IP_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IP", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function ipv4(message$1) {
      return {
        kind: "validation",
        type: "ipv4",
        reference: ipv4,
        async: false,
        expects: null,
        requirement: IPV4_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IPv4", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function ipv6(message$1) {
      return {
        kind: "validation",
        type: "ipv6",
        reference: ipv6,
        async: false,
        expects: null,
        requirement: IPV6_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "IPv6", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function isoDate(message$1) {
      return {
        kind: "validation",
        type: "iso_date",
        reference: isoDate,
        async: false,
        expects: null,
        requirement: ISO_DATE_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "date", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function isoDateTime(message$1) {
      return {
        kind: "validation",
        type: "iso_date_time",
        reference: isoDateTime,
        async: false,
        expects: null,
        requirement: ISO_DATE_TIME_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "date-time", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function isoTime(message$1) {
      return {
        kind: "validation",
        type: "iso_time",
        reference: isoTime,
        async: false,
        expects: null,
        requirement: ISO_TIME_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "time", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function isoTimeSecond(message$1) {
      return {
        kind: "validation",
        type: "iso_time_second",
        reference: isoTimeSecond,
        async: false,
        expects: null,
        requirement: ISO_TIME_SECOND_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "time-second", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function isoTimestamp(message$1) {
      return {
        kind: "validation",
        type: "iso_timestamp",
        reference: isoTimestamp,
        async: false,
        expects: null,
        requirement: ISO_TIMESTAMP_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "timestamp", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function isoWeek(message$1) {
      return {
        kind: "validation",
        type: "iso_week",
        reference: isoWeek,
        async: false,
        expects: null,
        requirement: ISO_WEEK_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "week", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function length(requirement, message$1) {
      return {
        kind: "validation",
        type: "length",
        reference: length,
        async: false,
        expects: `${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.length !== this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function ltValue(requirement, message$1) {
      return {
        kind: "validation",
        type: "lt_value",
        reference: ltValue,
        async: false,
        expects: `<${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !(dataset.value < this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function mac(message$1) {
      return {
        kind: "validation",
        type: "mac",
        reference: mac,
        async: false,
        expects: null,
        requirement: MAC_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "MAC", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function mac48(message$1) {
      return {
        kind: "validation",
        type: "mac48",
        reference: mac48,
        async: false,
        expects: null,
        requirement: MAC48_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "48-bit MAC", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function mac64(message$1) {
      return {
        kind: "validation",
        type: "mac64",
        reference: mac64,
        async: false,
        expects: null,
        requirement: MAC64_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "64-bit MAC", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function mapItems(operation) {
      return {
        kind: "transformation",
        type: "map_items",
        reference: mapItems,
        async: false,
        operation,
        "~run"(dataset) {
          dataset.value = dataset.value.map(this.operation);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function maxBytes(requirement, message$1) {
      return {
        kind: "validation",
        type: "max_bytes",
        reference: maxBytes,
        async: false,
        expects: `<=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
            if (length$1 > this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function maxEntries(requirement, message$1) {
      return {
        kind: "validation",
        type: "max_entries",
        reference: maxEntries,
        async: false,
        expects: `<=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (!dataset.typed) return dataset;
          const count = Object.keys(dataset.value).length;
          if (dataset.typed && count > this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function maxGraphemes(requirement, message$1) {
      return {
        kind: "validation",
        type: "max_graphemes",
        reference: maxGraphemes,
        async: false,
        expects: `<=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
            if (count > this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function maxLength(requirement, message$1) {
      return {
        kind: "validation",
        type: "max_length",
        reference: maxLength,
        async: false,
        expects: `<=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.length > this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function maxSize(requirement, message$1) {
      return {
        kind: "validation",
        type: "max_size",
        reference: maxSize,
        async: false,
        expects: `<=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.size > this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function maxValue(requirement, message$1) {
      return {
        kind: "validation",
        type: "max_value",
        reference: maxValue,
        async: false,
        expects: `<=${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !(dataset.value <= this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function maxWords(locales, requirement, message$1) {
      return {
        kind: "validation",
        type: "max_words",
        reference: maxWords,
        async: false,
        expects: `<=${requirement}`,
        locales,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
            if (count > this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function metadata(metadata_) {
      return {
        kind: "metadata",
        type: "metadata",
        reference: metadata,
        metadata: metadata_
      };
    }
    // @__NO_SIDE_EFFECTS__
    function mimeType(requirement, message$1) {
      return {
        kind: "validation",
        type: "mime_type",
        reference: mimeType,
        async: false,
        expects: /* @__PURE__ */ _joinExpects(requirement.map((option) => `"${option}"`), "|"),
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.includes(dataset.value.type)) _addIssue(this, "MIME type", dataset, config$1, { received: `"${dataset.value.type}"` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function minBytes(requirement, message$1) {
      return {
        kind: "validation",
        type: "min_bytes",
        reference: minBytes,
        async: false,
        expects: `>=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
            if (length$1 < this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function minEntries(requirement, message$1) {
      return {
        kind: "validation",
        type: "min_entries",
        reference: minEntries,
        async: false,
        expects: `>=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (!dataset.typed) return dataset;
          const count = Object.keys(dataset.value).length;
          if (dataset.typed && count < this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function minGraphemes(requirement, message$1) {
      return {
        kind: "validation",
        type: "min_graphemes",
        reference: minGraphemes,
        async: false,
        expects: `>=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
            if (count < this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function minLength(requirement, message$1) {
      return {
        kind: "validation",
        type: "min_length",
        reference: minLength,
        async: false,
        expects: `>=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.length < this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function minSize(requirement, message$1) {
      return {
        kind: "validation",
        type: "min_size",
        reference: minSize,
        async: false,
        expects: `>=${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.size < this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function minValue(requirement, message$1) {
      return {
        kind: "validation",
        type: "min_value",
        reference: minValue,
        async: false,
        expects: `>=${requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement)}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !(dataset.value >= this.requirement)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function minWords(locales, requirement, message$1) {
      return {
        kind: "validation",
        type: "min_words",
        reference: minWords,
        async: false,
        expects: `>=${requirement}`,
        locales,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
            if (count < this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function multipleOf(requirement, message$1) {
      return {
        kind: "validation",
        type: "multiple_of",
        reference: multipleOf,
        async: false,
        expects: `%${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value % this.requirement != 0) _addIssue(this, "multiple", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nanoid(message$1) {
      return {
        kind: "validation",
        type: "nanoid",
        reference: nanoid,
        async: false,
        expects: null,
        requirement: NANO_ID_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "Nano ID", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nonEmpty(message$1) {
      return {
        kind: "validation",
        type: "non_empty",
        reference: nonEmpty,
        async: false,
        expects: "!0",
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.length === 0) _addIssue(this, "length", dataset, config$1, { received: "0" });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function normalize(form) {
      return {
        kind: "transformation",
        type: "normalize",
        reference: normalize,
        async: false,
        form,
        "~run"(dataset) {
          dataset.value = dataset.value.normalize(this.form);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function notBytes(requirement, message$1) {
      return {
        kind: "validation",
        type: "not_bytes",
        reference: notBytes,
        async: false,
        expects: `!${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const length$1 = /* @__PURE__ */ _getByteCount(dataset.value);
            if (length$1 === this.requirement) _addIssue(this, "bytes", dataset, config$1, { received: `${length$1}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function notEntries(requirement, message$1) {
      return {
        kind: "validation",
        type: "not_entries",
        reference: notEntries,
        async: false,
        expects: `!${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (!dataset.typed) return dataset;
          const count = Object.keys(dataset.value).length;
          if (dataset.typed && count === this.requirement) _addIssue(this, "entries", dataset, config$1, { received: `${count}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function notGraphemes(requirement, message$1) {
      return {
        kind: "validation",
        type: "not_graphemes",
        reference: notGraphemes,
        async: false,
        expects: `!${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const count = /* @__PURE__ */ _getGraphemeCount(dataset.value);
            if (count === this.requirement) _addIssue(this, "graphemes", dataset, config$1, { received: `${count}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function notLength(requirement, message$1) {
      return {
        kind: "validation",
        type: "not_length",
        reference: notLength,
        async: false,
        expects: `!${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.length === this.requirement) _addIssue(this, "length", dataset, config$1, { received: `${dataset.value.length}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function notSize(requirement, message$1) {
      return {
        kind: "validation",
        type: "not_size",
        reference: notSize,
        async: false,
        expects: `!${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.size === this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function notValue(requirement, message$1) {
      return {
        kind: "validation",
        type: "not_value",
        reference: notValue,
        async: false,
        expects: requirement instanceof Date ? `!${requirement.toJSON()}` : `!${/* @__PURE__ */ _stringify(requirement)}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && this.requirement <= dataset.value && this.requirement >= dataset.value) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function notValues(requirement, message$1) {
      return {
        kind: "validation",
        type: "not_values",
        reference: notValues,
        async: false,
        expects: `!${/* @__PURE__ */ _joinExpects(requirement.map((value$1) => value$1 instanceof Date ? value$1.toJSON() : /* @__PURE__ */ _stringify(value$1)), "|")}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && this.requirement.some((value$1) => value$1 <= dataset.value && value$1 >= dataset.value)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function notWords(locales, requirement, message$1) {
      return {
        kind: "validation",
        type: "not_words",
        reference: notWords,
        async: false,
        expects: `!${requirement}`,
        locales,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
            if (count === this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function octal(message$1) {
      return {
        kind: "validation",
        type: "octal",
        reference: octal,
        async: false,
        expects: null,
        requirement: OCTAL_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "octal", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function parseJson(config$1, message$1) {
      return {
        kind: "transformation",
        type: "parse_json",
        reference: parseJson,
        config: config$1,
        message: message$1,
        async: false,
        "~run"(dataset, config$2) {
          try {
            dataset.value = JSON.parse(dataset.value, this.config?.reviver);
          } catch (error) {
            if (error instanceof Error) {
              _addIssue(this, "JSON", dataset, config$2, { received: `"${error.message}"` });
              dataset.typed = false;
            } else throw error;
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function _isPartiallyTyped(dataset, paths) {
      if (dataset.issues) for (const path2 of paths) for (const issue of dataset.issues) {
        let typed = false;
        const bound = Math.min(path2.length, issue.path?.length ?? 0);
        for (let index2 = 0; index2 < bound; index2++) if (path2[index2] !== issue.path[index2].key && (path2[index2] !== "$" || issue.path[index2].type !== "array")) {
          typed = true;
          break;
        }
        if (!typed) return false;
      }
      return true;
    }
    // @__NO_SIDE_EFFECTS__
    function partialCheck(paths, requirement, message$1) {
      return {
        kind: "validation",
        type: "partial_check",
        reference: partialCheck,
        async: false,
        expects: null,
        paths,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if ((dataset.typed || /* @__PURE__ */ _isPartiallyTyped(dataset, paths)) && !this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function partialCheckAsync(paths, requirement, message$1) {
      return {
        kind: "validation",
        type: "partial_check",
        reference: partialCheckAsync,
        async: true,
        expects: null,
        paths,
        requirement,
        message: message$1,
        async "~run"(dataset, config$1) {
          if ((dataset.typed || /* @__PURE__ */ _isPartiallyTyped(dataset, paths)) && !await this.requirement(dataset.value)) _addIssue(this, "input", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function rawCheck(action) {
      return {
        kind: "validation",
        type: "raw_check",
        reference: rawCheck,
        async: false,
        expects: null,
        "~run"(dataset, config$1) {
          action({
            dataset,
            config: config$1,
            addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info)
          });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function rawCheckAsync(action) {
      return {
        kind: "validation",
        type: "raw_check",
        reference: rawCheckAsync,
        async: true,
        expects: null,
        async "~run"(dataset, config$1) {
          await action({
            dataset,
            config: config$1,
            addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info)
          });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function rawTransform(action) {
      return {
        kind: "transformation",
        type: "raw_transform",
        reference: rawTransform,
        async: false,
        "~run"(dataset, config$1) {
          const output = action({
            dataset,
            config: config$1,
            addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info),
            NEVER: null
          });
          if (dataset.issues) dataset.typed = false;
          else dataset.value = output;
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function rawTransformAsync(action) {
      return {
        kind: "transformation",
        type: "raw_transform",
        reference: rawTransformAsync,
        async: true,
        async "~run"(dataset, config$1) {
          const output = await action({
            dataset,
            config: config$1,
            addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config$1, info),
            NEVER: null
          });
          if (dataset.issues) dataset.typed = false;
          else dataset.value = output;
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function readonly() {
      return {
        kind: "transformation",
        type: "readonly",
        reference: readonly,
        async: false,
        "~run"(dataset) {
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function reduceItems(operation, initial) {
      return {
        kind: "transformation",
        type: "reduce_items",
        reference: reduceItems,
        async: false,
        operation,
        initial,
        "~run"(dataset) {
          dataset.value = dataset.value.reduce(this.operation, this.initial);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function regex(requirement, message$1) {
      return {
        kind: "validation",
        type: "regex",
        reference: regex,
        async: false,
        expects: `${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "format", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function returns(schema) {
      return {
        kind: "transformation",
        type: "returns",
        reference: returns,
        async: false,
        schema,
        "~run"(dataset, config$1) {
          const func = dataset.value;
          dataset.value = (...args_) => {
            const returnsDataset = this.schema["~run"]({ value: func(...args_) }, config$1);
            if (returnsDataset.issues) throw new ValiError(returnsDataset.issues);
            return returnsDataset.value;
          };
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function returnsAsync(schema) {
      return {
        kind: "transformation",
        type: "returns",
        reference: returnsAsync,
        async: false,
        schema,
        "~run"(dataset, config$1) {
          const func = dataset.value;
          dataset.value = async (...args_) => {
            const returnsDataset = await this.schema["~run"]({ value: await func(...args_) }, config$1);
            if (returnsDataset.issues) throw new ValiError(returnsDataset.issues);
            return returnsDataset.value;
          };
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function rfcEmail(message$1) {
      return {
        kind: "validation",
        type: "rfc_email",
        reference: rfcEmail,
        expects: null,
        async: false,
        requirement: RFC_EMAIL_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "email", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function safeInteger(message$1) {
      return {
        kind: "validation",
        type: "safe_integer",
        reference: safeInteger,
        async: false,
        expects: null,
        requirement: Number.isSafeInteger,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "safe integer", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function size(requirement, message$1) {
      return {
        kind: "validation",
        type: "size",
        reference: size,
        async: false,
        expects: `${requirement}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && dataset.value.size !== this.requirement) _addIssue(this, "size", dataset, config$1, { received: `${dataset.value.size}` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function slug(message$1) {
      return {
        kind: "validation",
        type: "slug",
        reference: slug,
        async: false,
        expects: null,
        requirement: SLUG_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "slug", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function someItem(requirement, message$1) {
      return {
        kind: "validation",
        type: "some_item",
        reference: someItem,
        async: false,
        expects: null,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !dataset.value.some(this.requirement)) _addIssue(this, "item", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function sortItems(operation) {
      return {
        kind: "transformation",
        type: "sort_items",
        reference: sortItems,
        async: false,
        operation,
        "~run"(dataset) {
          dataset.value = dataset.value.sort(this.operation);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function startsWith(requirement, message$1) {
      return {
        kind: "validation",
        type: "starts_with",
        reference: startsWith,
        async: false,
        expects: `"${requirement}"`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !dataset.value.startsWith(this.requirement)) _addIssue(this, "start", dataset, config$1, { received: `"${dataset.value.slice(0, this.requirement.length)}"` });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function stringifyJson(config$1, message$1) {
      return {
        kind: "transformation",
        type: "stringify_json",
        reference: stringifyJson,
        message: message$1,
        config: config$1,
        async: false,
        "~run"(dataset, config$2) {
          try {
            const output = JSON.stringify(dataset.value, this.config?.replacer, this.config?.space);
            if (output === void 0) {
              _addIssue(this, "JSON", dataset, config$2);
              dataset.typed = false;
            }
            dataset.value = output;
          } catch (error) {
            if (error instanceof Error) {
              _addIssue(this, "JSON", dataset, config$2, { received: `"${error.message}"` });
              dataset.typed = false;
            } else throw error;
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function title(title_) {
      return {
        kind: "metadata",
        type: "title",
        reference: title,
        title: title_
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toBigint(message$1) {
      return {
        kind: "transformation",
        type: "to_bigint",
        reference: toBigint,
        async: false,
        message: message$1,
        "~run"(dataset, config$1) {
          try {
            dataset.value = BigInt(dataset.value);
          } catch {
            _addIssue(this, "bigint", dataset, config$1);
            dataset.typed = false;
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toBoolean() {
      return {
        kind: "transformation",
        type: "to_boolean",
        reference: toBoolean,
        async: false,
        "~run"(dataset) {
          dataset.value = Boolean(dataset.value);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toDate(message$1) {
      return {
        kind: "transformation",
        type: "to_date",
        reference: toDate,
        async: false,
        message: message$1,
        "~run"(dataset, config$1) {
          try {
            dataset.value = new Date(dataset.value);
            if (isNaN(dataset.value)) {
              _addIssue(this, "date", dataset, config$1, { received: '"Invalid Date"' });
              dataset.typed = false;
            }
          } catch {
            _addIssue(this, "date", dataset, config$1);
            dataset.typed = false;
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toLowerCase() {
      return {
        kind: "transformation",
        type: "to_lower_case",
        reference: toLowerCase,
        async: false,
        "~run"(dataset) {
          dataset.value = dataset.value.toLowerCase();
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toMaxValue(requirement) {
      return {
        kind: "transformation",
        type: "to_max_value",
        reference: toMaxValue,
        async: false,
        requirement,
        "~run"(dataset) {
          dataset.value = dataset.value > this.requirement ? this.requirement : dataset.value;
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toMinValue(requirement) {
      return {
        kind: "transformation",
        type: "to_min_value",
        reference: toMinValue,
        async: false,
        requirement,
        "~run"(dataset) {
          dataset.value = dataset.value < this.requirement ? this.requirement : dataset.value;
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toNumber(message$1) {
      return {
        kind: "transformation",
        type: "to_number",
        reference: toNumber,
        async: false,
        message: message$1,
        "~run"(dataset, config$1) {
          try {
            dataset.value = Number(dataset.value);
            if (isNaN(dataset.value)) {
              _addIssue(this, "number", dataset, config$1);
              dataset.typed = false;
            }
          } catch {
            _addIssue(this, "number", dataset, config$1);
            dataset.typed = false;
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toString(message$1) {
      return {
        kind: "transformation",
        type: "to_string",
        reference: toString,
        async: false,
        message: message$1,
        "~run"(dataset, config$1) {
          try {
            dataset.value = String(dataset.value);
          } catch {
            _addIssue(this, "string", dataset, config$1);
            dataset.typed = false;
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function toUpperCase() {
      return {
        kind: "transformation",
        type: "to_upper_case",
        reference: toUpperCase,
        async: false,
        "~run"(dataset) {
          dataset.value = dataset.value.toUpperCase();
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function transform(operation) {
      return {
        kind: "transformation",
        type: "transform",
        reference: transform,
        async: false,
        operation,
        "~run"(dataset) {
          dataset.value = this.operation(dataset.value);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function transformAsync(operation) {
      return {
        kind: "transformation",
        type: "transform",
        reference: transformAsync,
        async: true,
        operation,
        async "~run"(dataset) {
          dataset.value = await this.operation(dataset.value);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function trim() {
      return {
        kind: "transformation",
        type: "trim",
        reference: trim,
        async: false,
        "~run"(dataset) {
          dataset.value = dataset.value.trim();
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function trimEnd() {
      return {
        kind: "transformation",
        type: "trim_end",
        reference: trimEnd,
        async: false,
        "~run"(dataset) {
          dataset.value = dataset.value.trimEnd();
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function trimStart() {
      return {
        kind: "transformation",
        type: "trim_start",
        reference: trimStart,
        async: false,
        "~run"(dataset) {
          dataset.value = dataset.value.trimStart();
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function ulid(message$1) {
      return {
        kind: "validation",
        type: "ulid",
        reference: ulid,
        async: false,
        expects: null,
        requirement: ULID_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "ULID", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function url(message$1) {
      return {
        kind: "validation",
        type: "url",
        reference: url,
        async: false,
        expects: null,
        requirement(input) {
          try {
            new URL(input);
            return true;
          } catch {
            return false;
          }
        },
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement(dataset.value)) _addIssue(this, "URL", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function uuid(message$1) {
      return {
        kind: "validation",
        type: "uuid",
        reference: uuid,
        async: false,
        expects: null,
        requirement: UUID_REGEX,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.test(dataset.value)) _addIssue(this, "UUID", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function value(requirement, message$1) {
      return {
        kind: "validation",
        type: "value",
        reference: value,
        async: false,
        expects: requirement instanceof Date ? requirement.toJSON() : /* @__PURE__ */ _stringify(requirement),
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !(this.requirement <= dataset.value && this.requirement >= dataset.value)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function values(requirement, message$1) {
      return {
        kind: "validation",
        type: "values",
        reference: values,
        async: false,
        expects: `${/* @__PURE__ */ _joinExpects(requirement.map((value$1) => value$1 instanceof Date ? value$1.toJSON() : /* @__PURE__ */ _stringify(value$1)), "|")}`,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed && !this.requirement.some((value$1) => value$1 <= dataset.value && value$1 >= dataset.value)) _addIssue(this, "value", dataset, config$1, { received: dataset.value instanceof Date ? dataset.value.toJSON() : /* @__PURE__ */ _stringify(dataset.value) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function words(locales, requirement, message$1) {
      return {
        kind: "validation",
        type: "words",
        reference: words,
        async: false,
        expects: `${requirement}`,
        locales,
        requirement,
        message: message$1,
        "~run"(dataset, config$1) {
          if (dataset.typed) {
            const count = /* @__PURE__ */ _getWordCount(this.locales, dataset.value);
            if (count !== this.requirement) _addIssue(this, "words", dataset, config$1, { received: `${count}` });
          }
          return dataset;
        }
      };
    }
    function assert(schema, input) {
      const issues = schema["~run"]({ value: input }, { abortEarly: true }).issues;
      if (issues) throw new ValiError(issues);
    }
    // @__NO_SIDE_EFFECTS__
    function config(schema, config$1) {
      return {
        ...schema,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config_) {
          return schema["~run"](dataset, {
            ...config_,
            ...config$1
          });
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function getFallback(schema, dataset, config$1) {
      return typeof schema.fallback === "function" ? schema.fallback(dataset, config$1) : schema.fallback;
    }
    // @__NO_SIDE_EFFECTS__
    function fallback(schema, fallback$1) {
      return {
        ...schema,
        fallback: fallback$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const outputDataset = schema["~run"](dataset, config$1);
          return outputDataset.issues ? {
            typed: true,
            value: /* @__PURE__ */ getFallback(this, outputDataset, config$1)
          } : outputDataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function fallbackAsync(schema, fallback$1) {
      return {
        ...schema,
        fallback: fallback$1,
        async: true,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const outputDataset = await schema["~run"](dataset, config$1);
          return outputDataset.issues ? {
            typed: true,
            value: await /* @__PURE__ */ getFallback(this, outputDataset, config$1)
          } : outputDataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function flatten(issues) {
      const flatErrors = {};
      for (const issue of issues) if (issue.path) {
        const dotPath = /* @__PURE__ */ getDotPath(issue);
        if (dotPath) {
          if (!flatErrors.nested) flatErrors.nested = {};
          if (flatErrors.nested[dotPath]) flatErrors.nested[dotPath].push(issue.message);
          else flatErrors.nested[dotPath] = [issue.message];
        } else if (flatErrors.other) flatErrors.other.push(issue.message);
        else flatErrors.other = [issue.message];
      } else if (flatErrors.root) flatErrors.root.push(issue.message);
      else flatErrors.root = [issue.message];
      return flatErrors;
    }
    // @__NO_SIDE_EFFECTS__
    function forward(action, path2) {
      return {
        ...action,
        "~run"(dataset, config$1) {
          const prevIssues = dataset.issues && [...dataset.issues];
          dataset = action["~run"](dataset, config$1);
          if (dataset.issues) {
            for (const issue of dataset.issues) if (!prevIssues?.includes(issue)) {
              let pathInput = dataset.value;
              for (const key of path2) {
                const pathValue = pathInput[key];
                const pathItem = {
                  type: "unknown",
                  origin: "value",
                  input: pathInput,
                  key,
                  value: pathValue
                };
                if (issue.path) issue.path.push(pathItem);
                else issue.path = [pathItem];
                if (!pathValue) break;
                pathInput = pathValue;
              }
            }
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function forwardAsync(action, path2) {
      return {
        ...action,
        async: true,
        async "~run"(dataset, config$1) {
          const prevIssues = dataset.issues && [...dataset.issues];
          dataset = await action["~run"](dataset, config$1);
          if (dataset.issues) {
            for (const issue of dataset.issues) if (!prevIssues?.includes(issue)) {
              let pathInput = dataset.value;
              for (const key of path2) {
                const pathValue = pathInput[key];
                const pathItem = {
                  type: "unknown",
                  origin: "value",
                  input: pathInput,
                  key,
                  value: pathValue
                };
                if (issue.path) issue.path.push(pathItem);
                else issue.path = [pathItem];
                if (!pathValue) break;
                pathInput = pathValue;
              }
            }
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function getDefault(schema, dataset, config$1) {
      return typeof schema.default === "function" ? schema.default(dataset, config$1) : schema.default;
    }
    // @__NO_SIDE_EFFECTS__
    function getDefaults(schema) {
      if ("entries" in schema) {
        const object$1 = {};
        for (const key in schema.entries) object$1[key] = /* @__PURE__ */ getDefaults(schema.entries[key]);
        return object$1;
      }
      if ("items" in schema) return schema.items.map(getDefaults);
      return /* @__PURE__ */ getDefault(schema);
    }
    // @__NO_SIDE_EFFECTS__
    async function getDefaultsAsync(schema) {
      if ("entries" in schema) return Object.fromEntries(await Promise.all(Object.entries(schema.entries).map(async ([key, value$1]) => [key, await /* @__PURE__ */ getDefaultsAsync(value$1)])));
      if ("items" in schema) return Promise.all(schema.items.map(getDefaultsAsync));
      return /* @__PURE__ */ getDefault(schema);
    }
    // @__NO_SIDE_EFFECTS__
    function getDescription(schema) {
      return /* @__PURE__ */ _getLastMetadata(schema, "description");
    }
    // @__NO_SIDE_EFFECTS__
    function getExamples(schema) {
      const examples$1 = [];
      function depthFirstCollect(schema$1) {
        if ("pipe" in schema$1) {
          for (const item of schema$1.pipe) if (item.kind === "schema" && "pipe" in item) depthFirstCollect(item);
          else if (item.kind === "metadata" && item.type === "examples") examples$1.push(...item.examples);
        }
      }
      depthFirstCollect(schema);
      return examples$1;
    }
    // @__NO_SIDE_EFFECTS__
    function getFallbacks(schema) {
      if ("entries" in schema) {
        const object$1 = {};
        for (const key in schema.entries) object$1[key] = /* @__PURE__ */ getFallbacks(schema.entries[key]);
        return object$1;
      }
      if ("items" in schema) return schema.items.map(getFallbacks);
      return /* @__PURE__ */ getFallback(schema);
    }
    // @__NO_SIDE_EFFECTS__
    async function getFallbacksAsync(schema) {
      if ("entries" in schema) return Object.fromEntries(await Promise.all(Object.entries(schema.entries).map(async ([key, value$1]) => [key, await /* @__PURE__ */ getFallbacksAsync(value$1)])));
      if ("items" in schema) return Promise.all(schema.items.map(getFallbacksAsync));
      return /* @__PURE__ */ getFallback(schema);
    }
    // @__NO_SIDE_EFFECTS__
    function getMetadata(schema) {
      const result = {};
      function depthFirstMerge(schema$1) {
        if ("pipe" in schema$1) {
          for (const item of schema$1.pipe) if (item.kind === "schema" && "pipe" in item) depthFirstMerge(item);
          else if (item.kind === "metadata" && item.type === "metadata") Object.assign(result, item.metadata);
        }
      }
      depthFirstMerge(schema);
      return result;
    }
    // @__NO_SIDE_EFFECTS__
    function getTitle(schema) {
      return /* @__PURE__ */ _getLastMetadata(schema, "title");
    }
    // @__NO_SIDE_EFFECTS__
    function is(schema, input) {
      return !schema["~run"]({ value: input }, { abortEarly: true }).issues;
    }
    // @__NO_SIDE_EFFECTS__
    function any() {
      return {
        kind: "schema",
        type: "any",
        reference: any,
        expects: "any",
        async: false,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset) {
          dataset.typed = true;
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function array(item, message$1) {
      return {
        kind: "schema",
        type: "array",
        reference: array,
        expects: "Array",
        async: false,
        item,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < input.length; key++) {
              const value$1 = input[key];
              const itemDataset = this.item["~run"]({ value: value$1 }, config$1);
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function arrayAsync(item, message$1) {
      return {
        kind: "schema",
        type: "array",
        reference: arrayAsync,
        expects: "Array",
        async: true,
        item,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const itemDatasets = await Promise.all(input.map((value$1) => this.item["~run"]({ value: value$1 }, config$1)));
            for (let key = 0; key < itemDatasets.length; key++) {
              const itemDataset = itemDatasets[key];
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: input[key]
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function bigint(message$1) {
      return {
        kind: "schema",
        type: "bigint",
        reference: bigint,
        expects: "bigint",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (typeof dataset.value === "bigint") dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function blob(message$1) {
      return {
        kind: "schema",
        type: "blob",
        reference: blob,
        expects: "Blob",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value instanceof Blob) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function boolean(message$1) {
      return {
        kind: "schema",
        type: "boolean",
        reference: boolean,
        expects: "boolean",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (typeof dataset.value === "boolean") dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function custom(check$1, message$1) {
      return {
        kind: "schema",
        type: "custom",
        reference: custom,
        expects: "unknown",
        async: false,
        check: check$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (this.check(dataset.value)) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function customAsync(check$1, message$1) {
      return {
        kind: "schema",
        type: "custom",
        reference: customAsync,
        expects: "unknown",
        async: true,
        check: check$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (await this.check(dataset.value)) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function date(message$1) {
      return {
        kind: "schema",
        type: "date",
        reference: date,
        expects: "Date",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value instanceof Date) if (!isNaN(dataset.value)) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1, { received: '"Invalid Date"' });
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function enum_(enum__, message$1) {
      const options = [];
      for (const key in enum__) if (`${+key}` !== key || typeof enum__[key] !== "string" || !Object.is(enum__[enum__[key]], +key)) options.push(enum__[key]);
      return {
        kind: "schema",
        type: "enum",
        reference: enum_,
        expects: /* @__PURE__ */ _joinExpects(options.map(_stringify), "|"),
        async: false,
        enum: enum__,
        options,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (this.options.includes(dataset.value)) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function exactOptional(wrapped, default_) {
      return {
        kind: "schema",
        type: "exact_optional",
        reference: exactOptional,
        expects: wrapped.expects,
        async: false,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function exactOptionalAsync(wrapped, default_) {
      return {
        kind: "schema",
        type: "exact_optional",
        reference: exactOptionalAsync,
        expects: wrapped.expects,
        async: true,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function file(message$1) {
      return {
        kind: "schema",
        type: "file",
        reference: file,
        expects: "File",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value instanceof File) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function function_(message$1) {
      return {
        kind: "schema",
        type: "function",
        reference: function_,
        expects: "Function",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (typeof dataset.value === "function") dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function instance(class_, message$1) {
      return {
        kind: "schema",
        type: "instance",
        reference: instance,
        expects: class_.name,
        async: false,
        class: class_,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value instanceof this.class) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function _merge(value1, value2) {
      if (typeof value1 === typeof value2) {
        if (value1 === value2 || value1 instanceof Date && value2 instanceof Date && +value1 === +value2) return { value: value1 };
        if (value1 && value2 && value1.constructor === Object && value2.constructor === Object) {
          for (const key in value2) if (key in value1) {
            const dataset = /* @__PURE__ */ _merge(value1[key], value2[key]);
            if (dataset.issue) return dataset;
            value1[key] = dataset.value;
          } else value1[key] = value2[key];
          return { value: value1 };
        }
        if (Array.isArray(value1) && Array.isArray(value2)) {
          if (value1.length === value2.length) {
            for (let index2 = 0; index2 < value1.length; index2++) {
              const dataset = /* @__PURE__ */ _merge(value1[index2], value2[index2]);
              if (dataset.issue) return dataset;
              value1[index2] = dataset.value;
            }
            return { value: value1 };
          }
        }
      }
      return { issue: true };
    }
    // @__NO_SIDE_EFFECTS__
    function intersect(options, message$1) {
      return {
        kind: "schema",
        type: "intersect",
        reference: intersect,
        expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "&"),
        async: false,
        options,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (this.options.length) {
            const input = dataset.value;
            let outputs;
            dataset.typed = true;
            for (const schema of this.options) {
              const optionDataset = schema["~run"]({ value: input }, config$1);
              if (optionDataset.issues) {
                if (dataset.issues) dataset.issues.push(...optionDataset.issues);
                else dataset.issues = optionDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!optionDataset.typed) dataset.typed = false;
              if (dataset.typed) if (outputs) outputs.push(optionDataset.value);
              else outputs = [optionDataset.value];
            }
            if (dataset.typed) {
              dataset.value = outputs[0];
              for (let index2 = 1; index2 < outputs.length; index2++) {
                const mergeDataset = /* @__PURE__ */ _merge(dataset.value, outputs[index2]);
                if (mergeDataset.issue) {
                  _addIssue(this, "type", dataset, config$1, { received: "unknown" });
                  break;
                }
                dataset.value = mergeDataset.value;
              }
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function intersectAsync(options, message$1) {
      return {
        kind: "schema",
        type: "intersect",
        reference: intersectAsync,
        expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "&"),
        async: true,
        options,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (this.options.length) {
            const input = dataset.value;
            let outputs;
            dataset.typed = true;
            const optionDatasets = await Promise.all(this.options.map((schema) => schema["~run"]({ value: input }, config$1)));
            for (const optionDataset of optionDatasets) {
              if (optionDataset.issues) {
                if (dataset.issues) dataset.issues.push(...optionDataset.issues);
                else dataset.issues = optionDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!optionDataset.typed) dataset.typed = false;
              if (dataset.typed) if (outputs) outputs.push(optionDataset.value);
              else outputs = [optionDataset.value];
            }
            if (dataset.typed) {
              dataset.value = outputs[0];
              for (let index2 = 1; index2 < outputs.length; index2++) {
                const mergeDataset = /* @__PURE__ */ _merge(dataset.value, outputs[index2]);
                if (mergeDataset.issue) {
                  _addIssue(this, "type", dataset, config$1, { received: "unknown" });
                  break;
                }
                dataset.value = mergeDataset.value;
              }
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function lazy(getter) {
      return {
        kind: "schema",
        type: "lazy",
        reference: lazy,
        expects: "unknown",
        async: false,
        getter,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          return this.getter(dataset.value)["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function lazyAsync(getter) {
      return {
        kind: "schema",
        type: "lazy",
        reference: lazyAsync,
        expects: "unknown",
        async: true,
        getter,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          return (await this.getter(dataset.value))["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function literal(literal_, message$1) {
      return {
        kind: "schema",
        type: "literal",
        reference: literal,
        expects: /* @__PURE__ */ _stringify(literal_),
        async: false,
        literal: literal_,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value === this.literal) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function looseObject(entries$1, message$1) {
      return {
        kind: "schema",
        type: "loose_object",
        reference: looseObject,
        expects: "Object",
        async: false,
        entries: entries$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const key in this.entries) {
              const valueSchema = this.entries[key];
              if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
                const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
              else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                _addIssue(this, "key", dataset, config$1, {
                  input: void 0,
                  expected: `"${key}"`,
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: input[key]
                  }]
                });
                if (config$1.abortEarly) break;
              }
            }
            if (!dataset.issues || !config$1.abortEarly) {
              for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)) dataset.value[key] = input[key];
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function looseObjectAsync(entries$1, message$1) {
      return {
        kind: "schema",
        type: "loose_object",
        reference: looseObjectAsync,
        expects: "Object",
        async: true,
        entries: entries$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
              if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
                return [
                  key,
                  value$1,
                  valueSchema,
                  await valueSchema["~run"]({ value: value$1 }, config$1)
                ];
              }
              return [
                key,
                input[key],
                valueSchema,
                null
              ];
            }));
            for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) dataset.typed = false;
              dataset.value[key] = valueDataset.value;
            } else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
            else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
              _addIssue(this, "key", dataset, config$1, {
                input: void 0,
                expected: `"${key}"`,
                path: [{
                  type: "object",
                  origin: "key",
                  input,
                  key,
                  value: value$1
                }]
              });
              if (config$1.abortEarly) break;
            }
            if (!dataset.issues || !config$1.abortEarly) {
              for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)) dataset.value[key] = input[key];
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function looseTuple(items, message$1) {
      return {
        kind: "schema",
        type: "loose_tuple",
        reference: looseTuple,
        expects: "Array",
        async: false,
        items,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < this.items.length; key++) {
              const value$1 = input[key];
              const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
            if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) dataset.value.push(input[key]);
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function looseTupleAsync(items, message$1) {
      return {
        kind: "schema",
        type: "loose_tuple",
        reference: looseTupleAsync,
        expects: "Array",
        async: true,
        items,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
              const value$1 = input[key];
              return [
                key,
                value$1,
                await item["~run"]({ value: value$1 }, config$1)
              ];
            }));
            for (const [key, value$1, itemDataset] of itemDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
            if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) dataset.value.push(input[key]);
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function map(key, value$1, message$1) {
      return {
        kind: "schema",
        type: "map",
        reference: map,
        expects: "Map",
        async: false,
        key,
        value: value$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input instanceof Map) {
            dataset.typed = true;
            dataset.value = /* @__PURE__ */ new Map();
            for (const [inputKey, inputValue] of input) {
              const keyDataset = this.key["~run"]({ value: inputKey }, config$1);
              if (keyDataset.issues) {
                const pathItem = {
                  type: "map",
                  origin: "key",
                  input,
                  key: inputKey,
                  value: inputValue
                };
                for (const issue of keyDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = keyDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              const valueDataset = this.value["~run"]({ value: inputValue }, config$1);
              if (valueDataset.issues) {
                const pathItem = {
                  type: "map",
                  origin: "value",
                  input,
                  key: inputKey,
                  value: inputValue
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
              dataset.value.set(keyDataset.value, valueDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function mapAsync(key, value$1, message$1) {
      return {
        kind: "schema",
        type: "map",
        reference: mapAsync,
        expects: "Map",
        async: true,
        key,
        value: value$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input instanceof Map) {
            dataset.typed = true;
            dataset.value = /* @__PURE__ */ new Map();
            const datasets = await Promise.all([...input].map(([inputKey, inputValue]) => Promise.all([
              inputKey,
              inputValue,
              this.key["~run"]({ value: inputKey }, config$1),
              this.value["~run"]({ value: inputValue }, config$1)
            ])));
            for (const [inputKey, inputValue, keyDataset, valueDataset] of datasets) {
              if (keyDataset.issues) {
                const pathItem = {
                  type: "map",
                  origin: "key",
                  input,
                  key: inputKey,
                  value: inputValue
                };
                for (const issue of keyDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = keyDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (valueDataset.issues) {
                const pathItem = {
                  type: "map",
                  origin: "value",
                  input,
                  key: inputKey,
                  value: inputValue
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
              dataset.value.set(keyDataset.value, valueDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nan(message$1) {
      return {
        kind: "schema",
        type: "nan",
        reference: nan,
        expects: "NaN",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (Number.isNaN(dataset.value)) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function never(message$1) {
      return {
        kind: "schema",
        type: "never",
        reference: never,
        expects: "never",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nonNullable(wrapped, message$1) {
      return {
        kind: "schema",
        type: "non_nullable",
        reference: nonNullable,
        expects: "!null",
        async: false,
        wrapped,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value !== null) dataset = this.wrapped["~run"](dataset, config$1);
          if (dataset.value === null) _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nonNullableAsync(wrapped, message$1) {
      return {
        kind: "schema",
        type: "non_nullable",
        reference: nonNullableAsync,
        expects: "!null",
        async: true,
        wrapped,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (dataset.value !== null) dataset = await this.wrapped["~run"](dataset, config$1);
          if (dataset.value === null) _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nonNullish(wrapped, message$1) {
      return {
        kind: "schema",
        type: "non_nullish",
        reference: nonNullish,
        expects: "(!null & !undefined)",
        async: false,
        wrapped,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (!(dataset.value === null || dataset.value === void 0)) dataset = this.wrapped["~run"](dataset, config$1);
          if (dataset.value === null || dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nonNullishAsync(wrapped, message$1) {
      return {
        kind: "schema",
        type: "non_nullish",
        reference: nonNullishAsync,
        expects: "(!null & !undefined)",
        async: true,
        wrapped,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (!(dataset.value === null || dataset.value === void 0)) dataset = await this.wrapped["~run"](dataset, config$1);
          if (dataset.value === null || dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nonOptional(wrapped, message$1) {
      return {
        kind: "schema",
        type: "non_optional",
        reference: nonOptional,
        expects: "!undefined",
        async: false,
        wrapped,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value !== void 0) dataset = this.wrapped["~run"](dataset, config$1);
          if (dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nonOptionalAsync(wrapped, message$1) {
      return {
        kind: "schema",
        type: "non_optional",
        reference: nonOptionalAsync,
        expects: "!undefined",
        async: true,
        wrapped,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (dataset.value !== void 0) dataset = await this.wrapped["~run"](dataset, config$1);
          if (dataset.value === void 0) _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function null_(message$1) {
      return {
        kind: "schema",
        type: "null",
        reference: null_,
        expects: "null",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value === null) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nullable(wrapped, default_) {
      return {
        kind: "schema",
        type: "nullable",
        reference: nullable,
        expects: `(${wrapped.expects} | null)`,
        async: false,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value === null) {
            if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
            if (dataset.value === null) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nullableAsync(wrapped, default_) {
      return {
        kind: "schema",
        type: "nullable",
        reference: nullableAsync,
        expects: `(${wrapped.expects} | null)`,
        async: true,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (dataset.value === null) {
            if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
            if (dataset.value === null) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nullish(wrapped, default_) {
      return {
        kind: "schema",
        type: "nullish",
        reference: nullish,
        expects: `(${wrapped.expects} | null | undefined)`,
        async: false,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value === null || dataset.value === void 0) {
            if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
            if (dataset.value === null || dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function nullishAsync(wrapped, default_) {
      return {
        kind: "schema",
        type: "nullish",
        reference: nullishAsync,
        expects: `(${wrapped.expects} | null | undefined)`,
        async: true,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (dataset.value === null || dataset.value === void 0) {
            if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
            if (dataset.value === null || dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function number(message$1) {
      return {
        kind: "schema",
        type: "number",
        reference: number,
        expects: "number",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (typeof dataset.value === "number" && !isNaN(dataset.value)) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function object(entries$1, message$1) {
      return {
        kind: "schema",
        type: "object",
        reference: object,
        expects: "Object",
        async: false,
        entries: entries$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const key in this.entries) {
              const valueSchema = this.entries[key];
              if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
                const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
              else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                _addIssue(this, "key", dataset, config$1, {
                  input: void 0,
                  expected: `"${key}"`,
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: input[key]
                  }]
                });
                if (config$1.abortEarly) break;
              }
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function objectAsync(entries$1, message$1) {
      return {
        kind: "schema",
        type: "object",
        reference: objectAsync,
        expects: "Object",
        async: true,
        entries: entries$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
              if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
                return [
                  key,
                  value$1,
                  valueSchema,
                  await valueSchema["~run"]({ value: value$1 }, config$1)
                ];
              }
              return [
                key,
                input[key],
                valueSchema,
                null
              ];
            }));
            for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) dataset.typed = false;
              dataset.value[key] = valueDataset.value;
            } else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
            else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
              _addIssue(this, "key", dataset, config$1, {
                input: void 0,
                expected: `"${key}"`,
                path: [{
                  type: "object",
                  origin: "key",
                  input,
                  key,
                  value: value$1
                }]
              });
              if (config$1.abortEarly) break;
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function objectWithRest(entries$1, rest, message$1) {
      return {
        kind: "schema",
        type: "object_with_rest",
        reference: objectWithRest,
        expects: "Object",
        async: false,
        entries: entries$1,
        rest,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const key in this.entries) {
              const valueSchema = this.entries[key];
              if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
                const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
              else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                _addIssue(this, "key", dataset, config$1, {
                  input: void 0,
                  expected: `"${key}"`,
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: input[key]
                  }]
                });
                if (config$1.abortEarly) break;
              }
            }
            if (!dataset.issues || !config$1.abortEarly) {
              for (const key in input) if (/* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)) {
                const valueDataset = this.rest["~run"]({ value: input[key] }, config$1);
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: input[key]
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              }
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function objectWithRestAsync(entries$1, rest, message$1) {
      return {
        kind: "schema",
        type: "object_with_rest",
        reference: objectWithRestAsync,
        expects: "Object",
        async: true,
        entries: entries$1,
        rest,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const [normalDatasets, restDatasets] = await Promise.all([Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
              if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
                return [
                  key,
                  value$1,
                  valueSchema,
                  await valueSchema["~run"]({ value: value$1 }, config$1)
                ];
              }
              return [
                key,
                input[key],
                valueSchema,
                null
              ];
            })), Promise.all(Object.entries(input).filter(([key]) => /* @__PURE__ */ _isValidObjectKey(input, key) && !(key in this.entries)).map(async ([key, value$1]) => [
              key,
              value$1,
              await this.rest["~run"]({ value: value$1 }, config$1)
            ]))]);
            for (const [key, value$1, valueSchema, valueDataset] of normalDatasets) if (valueDataset) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) dataset.typed = false;
              dataset.value[key] = valueDataset.value;
            } else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
            else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
              _addIssue(this, "key", dataset, config$1, {
                input: void 0,
                expected: `"${key}"`,
                path: [{
                  type: "object",
                  origin: "key",
                  input,
                  key,
                  value: value$1
                }]
              });
              if (config$1.abortEarly) break;
            }
            if (!dataset.issues || !config$1.abortEarly) for (const [key, value$1, valueDataset] of restDatasets) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) dataset.typed = false;
              dataset.value[key] = valueDataset.value;
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function optional(wrapped, default_) {
      return {
        kind: "schema",
        type: "optional",
        reference: optional,
        expects: `(${wrapped.expects} | undefined)`,
        async: false,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value === void 0) {
            if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
            if (dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function optionalAsync(wrapped, default_) {
      return {
        kind: "schema",
        type: "optional",
        reference: optionalAsync,
        expects: `(${wrapped.expects} | undefined)`,
        async: true,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (dataset.value === void 0) {
            if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
            if (dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function picklist(options, message$1) {
      return {
        kind: "schema",
        type: "picklist",
        reference: picklist,
        expects: /* @__PURE__ */ _joinExpects(options.map(_stringify), "|"),
        async: false,
        options,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (this.options.includes(dataset.value)) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function promise(message$1) {
      return {
        kind: "schema",
        type: "promise",
        reference: promise,
        expects: "Promise",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value instanceof Promise) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function record(key, value$1, message$1) {
      return {
        kind: "schema",
        type: "record",
        reference: record,
        expects: "Object",
        async: false,
        key,
        value: value$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const entryKey in input) if (/* @__PURE__ */ _isValidObjectKey(input, entryKey)) {
              const entryValue = input[entryKey];
              const keyDataset = this.key["~run"]({ value: entryKey }, config$1);
              if (keyDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "key",
                  input,
                  key: entryKey,
                  value: entryValue
                };
                for (const issue of keyDataset.issues) {
                  issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = keyDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              const valueDataset = this.value["~run"]({ value: entryValue }, config$1);
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key: entryKey,
                  value: entryValue
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
              if (keyDataset.typed) dataset.value[keyDataset.value] = valueDataset.value;
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function recordAsync(key, value$1, message$1) {
      return {
        kind: "schema",
        type: "record",
        reference: recordAsync,
        expects: "Object",
        async: true,
        key,
        value: value$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const datasets = await Promise.all(Object.entries(input).filter(([key$1]) => /* @__PURE__ */ _isValidObjectKey(input, key$1)).map(([entryKey, entryValue]) => Promise.all([
              entryKey,
              entryValue,
              this.key["~run"]({ value: entryKey }, config$1),
              this.value["~run"]({ value: entryValue }, config$1)
            ])));
            for (const [entryKey, entryValue, keyDataset, valueDataset] of datasets) {
              if (keyDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "key",
                  input,
                  key: entryKey,
                  value: entryValue
                };
                for (const issue of keyDataset.issues) {
                  issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = keyDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key: entryKey,
                  value: entryValue
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!keyDataset.typed || !valueDataset.typed) dataset.typed = false;
              if (keyDataset.typed) dataset.value[keyDataset.value] = valueDataset.value;
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function set(value$1, message$1) {
      return {
        kind: "schema",
        type: "set",
        reference: set,
        expects: "Set",
        async: false,
        value: value$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input instanceof Set) {
            dataset.typed = true;
            dataset.value = /* @__PURE__ */ new Set();
            for (const inputValue of input) {
              const valueDataset = this.value["~run"]({ value: inputValue }, config$1);
              if (valueDataset.issues) {
                const pathItem = {
                  type: "set",
                  origin: "value",
                  input,
                  key: null,
                  value: inputValue
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) dataset.typed = false;
              dataset.value.add(valueDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function setAsync(value$1, message$1) {
      return {
        kind: "schema",
        type: "set",
        reference: setAsync,
        expects: "Set",
        async: true,
        value: value$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input instanceof Set) {
            dataset.typed = true;
            dataset.value = /* @__PURE__ */ new Set();
            const valueDatasets = await Promise.all([...input].map(async (inputValue) => [inputValue, await this.value["~run"]({ value: inputValue }, config$1)]));
            for (const [inputValue, valueDataset] of valueDatasets) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "set",
                  origin: "value",
                  input,
                  key: null,
                  value: inputValue
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) dataset.typed = false;
              dataset.value.add(valueDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function strictObject(entries$1, message$1) {
      return {
        kind: "schema",
        type: "strict_object",
        reference: strictObject,
        expects: "Object",
        async: false,
        entries: entries$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const key in this.entries) {
              const valueSchema = this.entries[key];
              if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                const value$1 = key in input ? input[key] : /* @__PURE__ */ getDefault(valueSchema);
                const valueDataset = valueSchema["~run"]({ value: value$1 }, config$1);
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value$1
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) issue.path.unshift(pathItem);
                    else issue.path = [pathItem];
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) dataset.issues = valueDataset.issues;
                  if (config$1.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) dataset.typed = false;
                dataset.value[key] = valueDataset.value;
              } else if (valueSchema.fallback !== void 0) dataset.value[key] = /* @__PURE__ */ getFallback(valueSchema);
              else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
                _addIssue(this, "key", dataset, config$1, {
                  input: void 0,
                  expected: `"${key}"`,
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: input[key]
                  }]
                });
                if (config$1.abortEarly) break;
              }
            }
            if (!dataset.issues || !config$1.abortEarly) {
              for (const key in input) if (!(key in this.entries)) {
                _addIssue(this, "key", dataset, config$1, {
                  input: key,
                  expected: "never",
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: input[key]
                  }]
                });
                break;
              }
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function strictObjectAsync(entries$1, message$1) {
      return {
        kind: "schema",
        type: "strict_object",
        reference: strictObjectAsync,
        expects: "Object",
        async: true,
        entries: entries$1,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const valueDatasets = await Promise.all(Object.entries(this.entries).map(async ([key, valueSchema]) => {
              if (key in input || (valueSchema.type === "exact_optional" || valueSchema.type === "optional" || valueSchema.type === "nullish") && valueSchema.default !== void 0) {
                const value$1 = key in input ? input[key] : await /* @__PURE__ */ getDefault(valueSchema);
                return [
                  key,
                  value$1,
                  valueSchema,
                  await valueSchema["~run"]({ value: value$1 }, config$1)
                ];
              }
              return [
                key,
                input[key],
                valueSchema,
                null
              ];
            }));
            for (const [key, value$1, valueSchema, valueDataset] of valueDatasets) if (valueDataset) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = valueDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) dataset.typed = false;
              dataset.value[key] = valueDataset.value;
            } else if (valueSchema.fallback !== void 0) dataset.value[key] = await /* @__PURE__ */ getFallback(valueSchema);
            else if (valueSchema.type !== "exact_optional" && valueSchema.type !== "optional" && valueSchema.type !== "nullish") {
              _addIssue(this, "key", dataset, config$1, {
                input: void 0,
                expected: `"${key}"`,
                path: [{
                  type: "object",
                  origin: "key",
                  input,
                  key,
                  value: value$1
                }]
              });
              if (config$1.abortEarly) break;
            }
            if (!dataset.issues || !config$1.abortEarly) {
              for (const key in input) if (!(key in this.entries)) {
                _addIssue(this, "key", dataset, config$1, {
                  input: key,
                  expected: "never",
                  path: [{
                    type: "object",
                    origin: "key",
                    input,
                    key,
                    value: input[key]
                  }]
                });
                break;
              }
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function strictTuple(items, message$1) {
      return {
        kind: "schema",
        type: "strict_tuple",
        reference: strictTuple,
        expects: "Array",
        async: false,
        items,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < this.items.length; key++) {
              const value$1 = input[key];
              const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
            if (!(dataset.issues && config$1.abortEarly) && this.items.length < input.length) _addIssue(this, "type", dataset, config$1, {
              input: input[this.items.length],
              expected: "never",
              path: [{
                type: "array",
                origin: "value",
                input,
                key: this.items.length,
                value: input[this.items.length]
              }]
            });
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function strictTupleAsync(items, message$1) {
      return {
        kind: "schema",
        type: "strict_tuple",
        reference: strictTupleAsync,
        expects: "Array",
        async: true,
        items,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
              const value$1 = input[key];
              return [
                key,
                value$1,
                await item["~run"]({ value: value$1 }, config$1)
              ];
            }));
            for (const [key, value$1, itemDataset] of itemDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
            if (!(dataset.issues && config$1.abortEarly) && this.items.length < input.length) _addIssue(this, "type", dataset, config$1, {
              input: input[this.items.length],
              expected: "never",
              path: [{
                type: "array",
                origin: "value",
                input,
                key: this.items.length,
                value: input[this.items.length]
              }]
            });
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function string(message$1) {
      return {
        kind: "schema",
        type: "string",
        reference: string,
        expects: "string",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (typeof dataset.value === "string") dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function symbol(message$1) {
      return {
        kind: "schema",
        type: "symbol",
        reference: symbol,
        expects: "symbol",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (typeof dataset.value === "symbol") dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function tuple(items, message$1) {
      return {
        kind: "schema",
        type: "tuple",
        reference: tuple,
        expects: "Array",
        async: false,
        items,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < this.items.length; key++) {
              const value$1 = input[key];
              const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function tupleAsync(items, message$1) {
      return {
        kind: "schema",
        type: "tuple",
        reference: tupleAsync,
        expects: "Array",
        async: true,
        items,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const itemDatasets = await Promise.all(this.items.map(async (item, key) => {
              const value$1 = input[key];
              return [
                key,
                value$1,
                await item["~run"]({ value: value$1 }, config$1)
              ];
            }));
            for (const [key, value$1, itemDataset] of itemDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function tupleWithRest(items, rest, message$1) {
      return {
        kind: "schema",
        type: "tuple_with_rest",
        reference: tupleWithRest,
        expects: "Array",
        async: false,
        items,
        rest,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < this.items.length; key++) {
              const value$1 = input[key];
              const itemDataset = this.items[key]["~run"]({ value: value$1 }, config$1);
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
            if (!dataset.issues || !config$1.abortEarly) for (let key = this.items.length; key < input.length; key++) {
              const value$1 = input[key];
              const itemDataset = this.rest["~run"]({ value: value$1 }, config$1);
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function tupleWithRestAsync(items, rest, message$1) {
      return {
        kind: "schema",
        type: "tuple_with_rest",
        reference: tupleWithRestAsync,
        expects: "Array",
        async: true,
        items,
        rest,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const [normalDatasets, restDatasets] = await Promise.all([Promise.all(this.items.map(async (item, key) => {
              const value$1 = input[key];
              return [
                key,
                value$1,
                await item["~run"]({ value: value$1 }, config$1)
              ];
            })), Promise.all(input.slice(this.items.length).map(async (value$1, key) => {
              return [
                key + this.items.length,
                value$1,
                await this.rest["~run"]({ value: value$1 }, config$1)
              ];
            }))]);
            for (const [key, value$1, itemDataset] of normalDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
            if (!dataset.issues || !config$1.abortEarly) for (const [key, value$1, itemDataset] of restDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value$1
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) issue.path.unshift(pathItem);
                  else issue.path = [pathItem];
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) dataset.issues = itemDataset.issues;
                if (config$1.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) dataset.typed = false;
              dataset.value.push(itemDataset.value);
            }
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function undefined_(message$1) {
      return {
        kind: "schema",
        type: "undefined",
        reference: undefined_,
        expects: "undefined",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value === void 0) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function undefinedable(wrapped, default_) {
      return {
        kind: "schema",
        type: "undefinedable",
        reference: undefinedable,
        expects: `(${wrapped.expects} | undefined)`,
        async: false,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value === void 0) {
            if (this.default !== void 0) dataset.value = /* @__PURE__ */ getDefault(this, dataset, config$1);
            if (dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function undefinedableAsync(wrapped, default_) {
      return {
        kind: "schema",
        type: "undefinedable",
        reference: undefinedableAsync,
        expects: `(${wrapped.expects} | undefined)`,
        async: true,
        wrapped,
        default: default_,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          if (dataset.value === void 0) {
            if (this.default !== void 0) dataset.value = await /* @__PURE__ */ getDefault(this, dataset, config$1);
            if (dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped["~run"](dataset, config$1);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function _subIssues(datasets) {
      let issues;
      if (datasets) for (const dataset of datasets) if (issues) issues.push(...dataset.issues);
      else issues = dataset.issues;
      return issues;
    }
    // @__NO_SIDE_EFFECTS__
    function union(options, message$1) {
      return {
        kind: "schema",
        type: "union",
        reference: union,
        expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
        async: false,
        options,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          let validDataset;
          let typedDatasets;
          let untypedDatasets;
          for (const schema of this.options) {
            const optionDataset = schema["~run"]({ value: dataset.value }, config$1);
            if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
            else typedDatasets = [optionDataset];
            else {
              validDataset = optionDataset;
              break;
            }
            else if (untypedDatasets) untypedDatasets.push(optionDataset);
            else untypedDatasets = [optionDataset];
          }
          if (validDataset) return validDataset;
          if (typedDatasets) {
            if (typedDatasets.length === 1) return typedDatasets[0];
            _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
            dataset.typed = true;
          } else if (untypedDatasets?.length === 1) return untypedDatasets[0];
          else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function unionAsync(options, message$1) {
      return {
        kind: "schema",
        type: "union",
        reference: unionAsync,
        expects: /* @__PURE__ */ _joinExpects(options.map((option) => option.expects), "|"),
        async: true,
        options,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          let validDataset;
          let typedDatasets;
          let untypedDatasets;
          for (const schema of this.options) {
            const optionDataset = await schema["~run"]({ value: dataset.value }, config$1);
            if (optionDataset.typed) if (optionDataset.issues) if (typedDatasets) typedDatasets.push(optionDataset);
            else typedDatasets = [optionDataset];
            else {
              validDataset = optionDataset;
              break;
            }
            else if (untypedDatasets) untypedDatasets.push(optionDataset);
            else untypedDatasets = [optionDataset];
          }
          if (validDataset) return validDataset;
          if (typedDatasets) {
            if (typedDatasets.length === 1) return typedDatasets[0];
            _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(typedDatasets) });
            dataset.typed = true;
          } else if (untypedDatasets?.length === 1) return untypedDatasets[0];
          else _addIssue(this, "type", dataset, config$1, { issues: /* @__PURE__ */ _subIssues(untypedDatasets) });
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function unknown() {
      return {
        kind: "schema",
        type: "unknown",
        reference: unknown,
        expects: "unknown",
        async: false,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset) {
          dataset.typed = true;
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function variant(key, options, message$1) {
      return {
        kind: "schema",
        type: "variant",
        reference: variant,
        expects: "Object",
        async: false,
        key,
        options,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            let outputDataset;
            let maxDiscriminatorPriority = 0;
            let invalidDiscriminatorKey = this.key;
            let expectedDiscriminators = [];
            const parseOptions = (variant$1, allKeys) => {
              for (const schema of variant$1.options) {
                if (schema.type === "variant") parseOptions(schema, new Set(allKeys).add(schema.key));
                else {
                  let keysAreValid = true;
                  let currentPriority = 0;
                  for (const currentKey of allKeys) {
                    const discriminatorSchema = schema.entries[currentKey];
                    if (currentKey in input ? discriminatorSchema["~run"]({
                      typed: false,
                      value: input[currentKey]
                    }, { abortEarly: true }).issues : discriminatorSchema.type !== "exact_optional" && discriminatorSchema.type !== "optional" && discriminatorSchema.type !== "nullish") {
                      keysAreValid = false;
                      if (invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input))) {
                        maxDiscriminatorPriority = currentPriority;
                        invalidDiscriminatorKey = currentKey;
                        expectedDiscriminators = [];
                      }
                      if (invalidDiscriminatorKey === currentKey) expectedDiscriminators.push(schema.entries[currentKey].expects);
                      break;
                    }
                    currentPriority++;
                  }
                  if (keysAreValid) {
                    const optionDataset = schema["~run"]({ value: input }, config$1);
                    if (!outputDataset || !outputDataset.typed && optionDataset.typed) outputDataset = optionDataset;
                  }
                }
                if (outputDataset && !outputDataset.issues) break;
              }
            };
            parseOptions(this, /* @__PURE__ */ new Set([this.key]));
            if (outputDataset) return outputDataset;
            _addIssue(this, "type", dataset, config$1, {
              input: input[invalidDiscriminatorKey],
              expected: /* @__PURE__ */ _joinExpects(expectedDiscriminators, "|"),
              path: [{
                type: "object",
                origin: "value",
                input,
                key: invalidDiscriminatorKey,
                value: input[invalidDiscriminatorKey]
              }]
            });
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function variantAsync(key, options, message$1) {
      return {
        kind: "schema",
        type: "variant",
        reference: variantAsync,
        expects: "Object",
        async: true,
        key,
        options,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            let outputDataset;
            let maxDiscriminatorPriority = 0;
            let invalidDiscriminatorKey = this.key;
            let expectedDiscriminators = [];
            const parseOptions = async (variant$1, allKeys) => {
              for (const schema of variant$1.options) {
                if (schema.type === "variant") await parseOptions(schema, new Set(allKeys).add(schema.key));
                else {
                  let keysAreValid = true;
                  let currentPriority = 0;
                  for (const currentKey of allKeys) {
                    const discriminatorSchema = schema.entries[currentKey];
                    if (currentKey in input ? (await discriminatorSchema["~run"]({
                      typed: false,
                      value: input[currentKey]
                    }, { abortEarly: true })).issues : discriminatorSchema.type !== "exact_optional" && discriminatorSchema.type !== "optional" && discriminatorSchema.type !== "nullish") {
                      keysAreValid = false;
                      if (invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input))) {
                        maxDiscriminatorPriority = currentPriority;
                        invalidDiscriminatorKey = currentKey;
                        expectedDiscriminators = [];
                      }
                      if (invalidDiscriminatorKey === currentKey) expectedDiscriminators.push(schema.entries[currentKey].expects);
                      break;
                    }
                    currentPriority++;
                  }
                  if (keysAreValid) {
                    const optionDataset = await schema["~run"]({ value: input }, config$1);
                    if (!outputDataset || !outputDataset.typed && optionDataset.typed) outputDataset = optionDataset;
                  }
                }
                if (outputDataset && !outputDataset.issues) break;
              }
            };
            await parseOptions(this, /* @__PURE__ */ new Set([this.key]));
            if (outputDataset) return outputDataset;
            _addIssue(this, "type", dataset, config$1, {
              input: input[invalidDiscriminatorKey],
              expected: /* @__PURE__ */ _joinExpects(expectedDiscriminators, "|"),
              path: [{
                type: "object",
                origin: "value",
                input,
                key: invalidDiscriminatorKey,
                value: input[invalidDiscriminatorKey]
              }]
            });
          } else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function void_(message$1) {
      return {
        kind: "schema",
        type: "void",
        reference: void_,
        expects: "void",
        async: false,
        message: message$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          if (dataset.value === void 0) dataset.typed = true;
          else _addIssue(this, "type", dataset, config$1);
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function keyof(schema, message$1) {
      return /* @__PURE__ */ picklist(Object.keys(schema.entries), message$1);
    }
    // @__NO_SIDE_EFFECTS__
    function message(schema, message_) {
      return {
        ...schema,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          return schema["~run"](dataset, {
            ...config$1,
            message: message_
          });
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function omit(schema, keys) {
      const entries$1 = { ...schema.entries };
      for (const key of keys) delete entries$1[key];
      return {
        ...schema,
        entries: entries$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        }
      };
    }
    function parse(schema, input, config$1) {
      const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
      if (dataset.issues) throw new ValiError(dataset.issues);
      return dataset.value;
    }
    async function parseAsync(schema, input, config$1) {
      const dataset = await schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
      if (dataset.issues) throw new ValiError(dataset.issues);
      return dataset.value;
    }
    // @__NO_SIDE_EFFECTS__
    function parser(schema, config$1) {
      const func = (input) => parse(schema, input, config$1);
      func.schema = schema;
      func.config = config$1;
      return func;
    }
    // @__NO_SIDE_EFFECTS__
    function parserAsync(schema, config$1) {
      const func = (input) => parseAsync(schema, input, config$1);
      func.schema = schema;
      func.config = config$1;
      return func;
    }
    // @__NO_SIDE_EFFECTS__
    function partial(schema, keys) {
      const entries$1 = {};
      for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ optional(schema.entries[key]) : schema.entries[key];
      return {
        ...schema,
        entries: entries$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function partialAsync(schema, keys) {
      const entries$1 = {};
      for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ optionalAsync(schema.entries[key]) : schema.entries[key];
      return {
        ...schema,
        entries: entries$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function pick(schema, keys) {
      const entries$1 = {};
      for (const key of keys) entries$1[key] = schema.entries[key];
      return {
        ...schema,
        entries: entries$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function pipe(...pipe$1) {
      return {
        ...pipe$1[0],
        pipe: pipe$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        "~run"(dataset, config$1) {
          for (const item of pipe$1) if (item.kind !== "metadata") {
            if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
              dataset.typed = false;
              break;
            }
            if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = item["~run"](dataset, config$1);
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function pipeAsync(...pipe$1) {
      return {
        ...pipe$1[0],
        pipe: pipe$1,
        async: true,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        },
        async "~run"(dataset, config$1) {
          for (const item of pipe$1) if (item.kind !== "metadata") {
            if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
              dataset.typed = false;
              break;
            }
            if (!dataset.issues || !config$1.abortEarly && !config$1.abortPipeEarly) dataset = await item["~run"](dataset, config$1);
          }
          return dataset;
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function required(schema, arg2, arg3) {
      const keys = Array.isArray(arg2) ? arg2 : void 0;
      const message$1 = Array.isArray(arg2) ? arg3 : arg2;
      const entries$1 = {};
      for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ nonOptional(schema.entries[key], message$1) : schema.entries[key];
      return {
        ...schema,
        entries: entries$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function requiredAsync(schema, arg2, arg3) {
      const keys = Array.isArray(arg2) ? arg2 : void 0;
      const message$1 = Array.isArray(arg2) ? arg3 : arg2;
      const entries$1 = {};
      for (const key in schema.entries) entries$1[key] = !keys || keys.includes(key) ? /* @__PURE__ */ nonOptionalAsync(schema.entries[key], message$1) : schema.entries[key];
      return {
        ...schema,
        entries: entries$1,
        get "~standard"() {
          return /* @__PURE__ */ _getStandardProps(this);
        }
      };
    }
    // @__NO_SIDE_EFFECTS__
    function safeParse(schema, input, config$1) {
      const dataset = schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
      return {
        typed: dataset.typed,
        success: !dataset.issues,
        output: dataset.value,
        issues: dataset.issues
      };
    }
    // @__NO_SIDE_EFFECTS__
    async function safeParseAsync(schema, input, config$1) {
      const dataset = await schema["~run"]({ value: input }, /* @__PURE__ */ getGlobalConfig(config$1));
      return {
        typed: dataset.typed,
        success: !dataset.issues,
        output: dataset.value,
        issues: dataset.issues
      };
    }
    // @__NO_SIDE_EFFECTS__
    function safeParser(schema, config$1) {
      const func = (input) => /* @__PURE__ */ safeParse(schema, input, config$1);
      func.schema = schema;
      func.config = config$1;
      return func;
    }
    // @__NO_SIDE_EFFECTS__
    function safeParserAsync(schema, config$1) {
      const func = (input) => /* @__PURE__ */ safeParseAsync(schema, input, config$1);
      func.schema = schema;
      func.config = config$1;
      return func;
    }
    // @__NO_SIDE_EFFECTS__
    function summarize(issues) {
      let summary = "";
      for (const issue of issues) {
        if (summary) summary += "\n";
        summary += `\xD7 ${issue.message}`;
        const dotPath = /* @__PURE__ */ getDotPath(issue);
        if (dotPath) summary += `
  \u2192 at ${dotPath}`;
      }
      return summary;
    }
    // @__NO_SIDE_EFFECTS__
    function unwrap(schema) {
      return schema.wrapped;
    }
    exports.BASE64_REGEX = BASE64_REGEX;
    exports.BIC_REGEX = BIC_REGEX;
    exports.CUID2_REGEX = CUID2_REGEX;
    exports.DECIMAL_REGEX = DECIMAL_REGEX;
    exports.DIGITS_REGEX = DIGITS_REGEX;
    exports.EMAIL_REGEX = EMAIL_REGEX;
    exports.EMOJI_REGEX = EMOJI_REGEX;
    exports.HEXADECIMAL_REGEX = HEXADECIMAL_REGEX;
    exports.HEX_COLOR_REGEX = HEX_COLOR_REGEX;
    exports.IMEI_REGEX = IMEI_REGEX;
    exports.IPV4_REGEX = IPV4_REGEX;
    exports.IPV6_REGEX = IPV6_REGEX;
    exports.IP_REGEX = IP_REGEX;
    exports.ISO_DATE_REGEX = ISO_DATE_REGEX;
    exports.ISO_DATE_TIME_REGEX = ISO_DATE_TIME_REGEX;
    exports.ISO_TIMESTAMP_REGEX = ISO_TIMESTAMP_REGEX;
    exports.ISO_TIME_REGEX = ISO_TIME_REGEX;
    exports.ISO_TIME_SECOND_REGEX = ISO_TIME_SECOND_REGEX;
    exports.ISO_WEEK_REGEX = ISO_WEEK_REGEX;
    exports.MAC48_REGEX = MAC48_REGEX;
    exports.MAC64_REGEX = MAC64_REGEX;
    exports.MAC_REGEX = MAC_REGEX;
    exports.NANO_ID_REGEX = NANO_ID_REGEX;
    exports.OCTAL_REGEX = OCTAL_REGEX;
    exports.RFC_EMAIL_REGEX = RFC_EMAIL_REGEX;
    exports.SLUG_REGEX = SLUG_REGEX;
    exports.ULID_REGEX = ULID_REGEX;
    exports.UUID_REGEX = UUID_REGEX;
    exports.ValiError = ValiError;
    exports._addIssue = _addIssue;
    exports._getByteCount = _getByteCount;
    exports._getGraphemeCount = _getGraphemeCount;
    exports._getLastMetadata = _getLastMetadata;
    exports._getStandardProps = _getStandardProps;
    exports._getWordCount = _getWordCount;
    exports._isLuhnAlgo = _isLuhnAlgo;
    exports._isValidObjectKey = _isValidObjectKey;
    exports._joinExpects = _joinExpects;
    exports._stringify = _stringify;
    exports.any = any;
    exports.args = args;
    exports.argsAsync = argsAsync;
    exports.array = array;
    exports.arrayAsync = arrayAsync;
    exports.assert = assert;
    exports.awaitAsync = awaitAsync;
    exports.base64 = base64;
    exports.bic = bic;
    exports.bigint = bigint;
    exports.blob = blob;
    exports.boolean = boolean;
    exports.brand = brand;
    exports.bytes = bytes;
    exports.check = check;
    exports.checkAsync = checkAsync;
    exports.checkItems = checkItems;
    exports.checkItemsAsync = checkItemsAsync;
    exports.config = config;
    exports.creditCard = creditCard;
    exports.cuid2 = cuid2;
    exports.custom = custom;
    exports.customAsync = customAsync;
    exports.date = date;
    exports.decimal = decimal;
    exports.deleteGlobalConfig = deleteGlobalConfig;
    exports.deleteGlobalMessage = deleteGlobalMessage;
    exports.deleteSchemaMessage = deleteSchemaMessage;
    exports.deleteSpecificMessage = deleteSpecificMessage;
    exports.description = description;
    exports.digits = digits;
    exports.email = email;
    exports.emoji = emoji;
    exports.empty = empty;
    exports.endsWith = endsWith;
    exports.entries = entries;
    exports.entriesFromList = entriesFromList;
    exports.entriesFromObjects = entriesFromObjects;
    exports.enum = enum_;
    exports.enum_ = enum_;
    exports.everyItem = everyItem;
    exports.exactOptional = exactOptional;
    exports.exactOptionalAsync = exactOptionalAsync;
    exports.examples = examples;
    exports.excludes = excludes;
    exports.fallback = fallback;
    exports.fallbackAsync = fallbackAsync;
    exports.file = file;
    exports.filterItems = filterItems;
    exports.findItem = findItem;
    exports.finite = finite;
    exports.flatten = flatten;
    exports.flavor = flavor;
    exports.forward = forward;
    exports.forwardAsync = forwardAsync;
    exports.function = function_;
    exports.function_ = function_;
    exports.getDefault = getDefault;
    exports.getDefaults = getDefaults;
    exports.getDefaultsAsync = getDefaultsAsync;
    exports.getDescription = getDescription;
    exports.getDotPath = getDotPath;
    exports.getExamples = getExamples;
    exports.getFallback = getFallback;
    exports.getFallbacks = getFallbacks;
    exports.getFallbacksAsync = getFallbacksAsync;
    exports.getGlobalConfig = getGlobalConfig;
    exports.getGlobalMessage = getGlobalMessage;
    exports.getMetadata = getMetadata;
    exports.getSchemaMessage = getSchemaMessage;
    exports.getSpecificMessage = getSpecificMessage;
    exports.getTitle = getTitle;
    exports.graphemes = graphemes;
    exports.gtValue = gtValue;
    exports.hash = hash;
    exports.hexColor = hexColor;
    exports.hexadecimal = hexadecimal;
    exports.imei = imei;
    exports.includes = includes;
    exports.instance = instance;
    exports.integer = integer;
    exports.intersect = intersect;
    exports.intersectAsync = intersectAsync;
    exports.ip = ip;
    exports.ipv4 = ipv4;
    exports.ipv6 = ipv6;
    exports.is = is;
    exports.isOfKind = isOfKind;
    exports.isOfType = isOfType;
    exports.isValiError = isValiError;
    exports.isoDate = isoDate;
    exports.isoDateTime = isoDateTime;
    exports.isoTime = isoTime;
    exports.isoTimeSecond = isoTimeSecond;
    exports.isoTimestamp = isoTimestamp;
    exports.isoWeek = isoWeek;
    exports.keyof = keyof;
    exports.lazy = lazy;
    exports.lazyAsync = lazyAsync;
    exports.length = length;
    exports.literal = literal;
    exports.looseObject = looseObject;
    exports.looseObjectAsync = looseObjectAsync;
    exports.looseTuple = looseTuple;
    exports.looseTupleAsync = looseTupleAsync;
    exports.ltValue = ltValue;
    exports.mac = mac;
    exports.mac48 = mac48;
    exports.mac64 = mac64;
    exports.map = map;
    exports.mapAsync = mapAsync;
    exports.mapItems = mapItems;
    exports.maxBytes = maxBytes;
    exports.maxEntries = maxEntries;
    exports.maxGraphemes = maxGraphemes;
    exports.maxLength = maxLength;
    exports.maxSize = maxSize;
    exports.maxValue = maxValue;
    exports.maxWords = maxWords;
    exports.message = message;
    exports.metadata = metadata;
    exports.mimeType = mimeType;
    exports.minBytes = minBytes;
    exports.minEntries = minEntries;
    exports.minGraphemes = minGraphemes;
    exports.minLength = minLength;
    exports.minSize = minSize;
    exports.minValue = minValue;
    exports.minWords = minWords;
    exports.multipleOf = multipleOf;
    exports.nan = nan;
    exports.nanoid = nanoid;
    exports.never = never;
    exports.nonEmpty = nonEmpty;
    exports.nonNullable = nonNullable;
    exports.nonNullableAsync = nonNullableAsync;
    exports.nonNullish = nonNullish;
    exports.nonNullishAsync = nonNullishAsync;
    exports.nonOptional = nonOptional;
    exports.nonOptionalAsync = nonOptionalAsync;
    exports.normalize = normalize;
    exports.notBytes = notBytes;
    exports.notEntries = notEntries;
    exports.notGraphemes = notGraphemes;
    exports.notLength = notLength;
    exports.notSize = notSize;
    exports.notValue = notValue;
    exports.notValues = notValues;
    exports.notWords = notWords;
    exports.null = null_;
    exports.null_ = null_;
    exports.nullable = nullable;
    exports.nullableAsync = nullableAsync;
    exports.nullish = nullish;
    exports.nullishAsync = nullishAsync;
    exports.number = number;
    exports.object = object;
    exports.objectAsync = objectAsync;
    exports.objectWithRest = objectWithRest;
    exports.objectWithRestAsync = objectWithRestAsync;
    exports.octal = octal;
    exports.omit = omit;
    exports.optional = optional;
    exports.optionalAsync = optionalAsync;
    exports.parse = parse;
    exports.parseAsync = parseAsync;
    exports.parseJson = parseJson;
    exports.parser = parser;
    exports.parserAsync = parserAsync;
    exports.partial = partial;
    exports.partialAsync = partialAsync;
    exports.partialCheck = partialCheck;
    exports.partialCheckAsync = partialCheckAsync;
    exports.pick = pick;
    exports.picklist = picklist;
    exports.pipe = pipe;
    exports.pipeAsync = pipeAsync;
    exports.promise = promise;
    exports.rawCheck = rawCheck;
    exports.rawCheckAsync = rawCheckAsync;
    exports.rawTransform = rawTransform;
    exports.rawTransformAsync = rawTransformAsync;
    exports.readonly = readonly;
    exports.record = record;
    exports.recordAsync = recordAsync;
    exports.reduceItems = reduceItems;
    exports.regex = regex;
    exports.required = required;
    exports.requiredAsync = requiredAsync;
    exports.returns = returns;
    exports.returnsAsync = returnsAsync;
    exports.rfcEmail = rfcEmail;
    exports.safeInteger = safeInteger;
    exports.safeParse = safeParse;
    exports.safeParseAsync = safeParseAsync;
    exports.safeParser = safeParser;
    exports.safeParserAsync = safeParserAsync;
    exports.set = set;
    exports.setAsync = setAsync;
    exports.setGlobalConfig = setGlobalConfig;
    exports.setGlobalMessage = setGlobalMessage;
    exports.setSchemaMessage = setSchemaMessage;
    exports.setSpecificMessage = setSpecificMessage;
    exports.size = size;
    exports.slug = slug;
    exports.someItem = someItem;
    exports.sortItems = sortItems;
    exports.startsWith = startsWith;
    exports.strictObject = strictObject;
    exports.strictObjectAsync = strictObjectAsync;
    exports.strictTuple = strictTuple;
    exports.strictTupleAsync = strictTupleAsync;
    exports.string = string;
    exports.stringifyJson = stringifyJson;
    exports.summarize = summarize;
    exports.symbol = symbol;
    exports.title = title;
    exports.toBigint = toBigint;
    exports.toBoolean = toBoolean;
    exports.toDate = toDate;
    exports.toLowerCase = toLowerCase;
    exports.toMaxValue = toMaxValue;
    exports.toMinValue = toMinValue;
    exports.toNumber = toNumber;
    exports.toString = toString;
    exports.toUpperCase = toUpperCase;
    exports.transform = transform;
    exports.transformAsync = transformAsync;
    exports.trim = trim;
    exports.trimEnd = trimEnd;
    exports.trimStart = trimStart;
    exports.tuple = tuple;
    exports.tupleAsync = tupleAsync;
    exports.tupleWithRest = tupleWithRest;
    exports.tupleWithRestAsync = tupleWithRestAsync;
    exports.ulid = ulid;
    exports.undefined = undefined_;
    exports.undefined_ = undefined_;
    exports.undefinedable = undefinedable;
    exports.undefinedableAsync = undefinedableAsync;
    exports.union = union;
    exports.unionAsync = unionAsync;
    exports.unknown = unknown;
    exports.unwrap = unwrap;
    exports.url = url;
    exports.uuid = uuid;
    exports.value = value;
    exports.values = values;
    exports.variant = variant;
    exports.variantAsync = variantAsync;
    exports.void = void_;
    exports.void_ = void_;
    exports.words = words;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArray.js"(exports, module) {
    "use strict";
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_freeGlobal.js"(exports, module) {
    "use strict";
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_root.js
var require_root = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_root.js"(exports, module) {
    "use strict";
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Symbol.js"(exports, module) {
    "use strict";
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getRawTag.js"(exports, module) {
    "use strict";
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_objectToString.js"(exports, module) {
    "use strict";
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGetTag.js"(exports, module) {
    "use strict";
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObjectLike.js"(exports, module) {
    "use strict";
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isSymbol.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKey.js"(exports, module) {
    "use strict";
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isObject.js"(exports, module) {
    "use strict";
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isFunction.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_coreJsData.js"(exports, module) {
    "use strict";
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isMasked.js"(exports, module) {
    "use strict";
    var coreJsData = require_coreJsData();
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    })();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toSource.js"(exports, module) {
    "use strict";
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsNative.js"(exports, module) {
    "use strict";
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getValue.js"(exports, module) {
    "use strict";
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getNative.js"(exports, module) {
    "use strict";
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_nativeCreate.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashClear.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashDelete.js"(exports, module) {
    "use strict";
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashGet.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashHas.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hashSet.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Hash.js"(exports, module) {
    "use strict";
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheClear.js"(exports, module) {
    "use strict";
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/eq.js
var require_eq = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/eq.js"(exports, module) {
    "use strict";
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assocIndexOf.js"(exports, module) {
    "use strict";
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheDelete.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index2 == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index2, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheGet.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    module.exports = listCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheHas.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_listCacheSet.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      if (index2 < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index2][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_ListCache.js"(exports, module) {
    "use strict";
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_Map.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheClear.js"(exports, module) {
    "use strict";
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isKeyable.js"(exports, module) {
    "use strict";
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_getMapData.js"(exports, module) {
    "use strict";
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheGet.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheHas.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_mapCacheSet.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_MapCache.js"(exports, module) {
    "use strict";
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index2 = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index2 < length) {
        var entry = entries[index2];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/memoize.js"(exports, module) {
    "use strict";
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_memoizeCapped.js"(exports, module) {
    "use strict";
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_stringToPath.js"(exports, module) {
    "use strict";
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayMap.js"(exports, module) {
    "use strict";
    function arrayMap(array, iteratee) {
      var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index2 < length) {
        result[index2] = iteratee(array[index2], index2, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseToString.js"(exports, module) {
    "use strict";
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toString.js
var require_toString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/toString.js"(exports, module) {
    "use strict";
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_castPath.js"(exports, module) {
    "use strict";
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_toKey.js"(exports, module) {
    "use strict";
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseGet.js"(exports, module) {
    "use strict";
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path2) {
      path2 = castPath(path2, object);
      var index2 = 0, length = path2.length;
      while (object != null && index2 < length) {
        object = object[toKey(path2[index2++])];
      }
      return index2 && index2 == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_defineProperty.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var defineProperty = (function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    })();
    module.exports = defineProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseAssignValue.js"(exports, module) {
    "use strict";
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_assignValue.js"(exports, module) {
    "use strict";
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isIndex.js"(exports, module) {
    "use strict";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSet.js
var require_baseSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSet.js"(exports, module) {
    "use strict";
    var assignValue = require_assignValue();
    var castPath = require_castPath();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    var toKey = require_toKey();
    function baseSet(object, path2, value, customizer) {
      if (!isObject(object)) {
        return object;
      }
      path2 = castPath(path2, object);
      var index2 = -1, length = path2.length, lastIndex = length - 1, nested = object;
      while (nested != null && ++index2 < length) {
        var key = toKey(path2[index2]), newValue = value;
        if (key === "__proto__" || key === "constructor" || key === "prototype") {
          return object;
        }
        if (index2 != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : void 0;
          if (newValue === void 0) {
            newValue = isObject(objValue) ? objValue : isIndex(path2[index2 + 1]) ? [] : {};
          }
        }
        assignValue(nested, key, newValue);
        nested = nested[key];
      }
      return object;
    }
    module.exports = baseSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_basePickBy.js
var require_basePickBy = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_basePickBy.js"(exports, module) {
    "use strict";
    var baseGet = require_baseGet();
    var baseSet = require_baseSet();
    var castPath = require_castPath();
    function basePickBy(object, paths, predicate) {
      var index2 = -1, length = paths.length, result = {};
      while (++index2 < length) {
        var path2 = paths[index2], value = baseGet(object, path2);
        if (predicate(value, path2)) {
          baseSet(result, castPath(path2, object), value);
        }
      }
      return result;
    }
    module.exports = basePickBy;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseHasIn.js"(exports, module) {
    "use strict";
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseIsArguments.js"(exports, module) {
    "use strict";
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isArguments.js"(exports, module) {
    "use strict";
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
      return arguments;
    })()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/isLength.js"(exports, module) {
    "use strict";
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_hasPath.js"(exports, module) {
    "use strict";
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path2, hasFunc) {
      path2 = castPath(path2, object);
      var index2 = -1, length = path2.length, result = false;
      while (++index2 < length) {
        var key = toKey(path2[index2]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index2 != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/hasIn.js"(exports, module) {
    "use strict";
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path2) {
      return object != null && hasPath(object, path2, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_basePick.js
var require_basePick = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_basePick.js"(exports, module) {
    "use strict";
    var basePickBy = require_basePickBy();
    var hasIn = require_hasIn();
    function basePick(object, paths) {
      return basePickBy(object, paths, function(value, path2) {
        return hasIn(object, path2);
      });
    }
    module.exports = basePick;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_arrayPush.js"(exports, module) {
    "use strict";
    function arrayPush(array, values) {
      var index2 = -1, length = values.length, offset = array.length;
      while (++index2 < length) {
        array[offset + index2] = values[index2];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_isFlattenable.js"(exports, module) {
    "use strict";
    var Symbol2 = require_Symbol();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
    function isFlattenable(value) {
      return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
    }
    module.exports = isFlattenable;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseFlatten.js"(exports, module) {
    "use strict";
    var arrayPush = require_arrayPush();
    var isFlattenable = require_isFlattenable();
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index2 = -1, length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index2 < length) {
        var value = array[index2];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    module.exports = baseFlatten;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/flatten.js
var require_flatten = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/flatten.js"(exports, module) {
    "use strict";
    var baseFlatten = require_baseFlatten();
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }
    module.exports = flatten;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_apply.js
var require_apply = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_apply.js"(exports, module) {
    "use strict";
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    module.exports = apply;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_overRest.js
var require_overRest = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_overRest.js"(exports, module) {
    "use strict";
    var apply = require_apply();
    var nativeMax = Math.max;
    function overRest(func, start, transform) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index2 < length) {
          array[index2] = args[start + index2];
        }
        index2 = -1;
        var otherArgs = Array(start + 1);
        while (++index2 < start) {
          otherArgs[index2] = args[index2];
        }
        otherArgs[start] = transform(array);
        return apply(func, this, otherArgs);
      };
    }
    module.exports = overRest;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/constant.js
var require_constant = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/constant.js"(exports, module) {
    "use strict";
    function constant(value) {
      return function() {
        return value;
      };
    }
    module.exports = constant;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/identity.js
var require_identity = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/identity.js"(exports, module) {
    "use strict";
    function identity(value) {
      return value;
    }
    module.exports = identity;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSetToString.js
var require_baseSetToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_baseSetToString.js"(exports, module) {
    "use strict";
    var constant = require_constant();
    var defineProperty = require_defineProperty();
    var identity = require_identity();
    var baseSetToString = !defineProperty ? identity : function(func, string) {
      return defineProperty(func, "toString", {
        "configurable": true,
        "enumerable": false,
        "value": constant(string),
        "writable": true
      });
    };
    module.exports = baseSetToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_shortOut.js
var require_shortOut = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_shortOut.js"(exports, module) {
    "use strict";
    var HOT_COUNT = 800;
    var HOT_SPAN = 16;
    var nativeNow = Date.now;
    function shortOut(func) {
      var count = 0, lastCalled = 0;
      return function() {
        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(void 0, arguments);
      };
    }
    module.exports = shortOut;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setToString.js
var require_setToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_setToString.js"(exports, module) {
    "use strict";
    var baseSetToString = require_baseSetToString();
    var shortOut = require_shortOut();
    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_flatRest.js
var require_flatRest = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/_flatRest.js"(exports, module) {
    "use strict";
    var flatten = require_flatten();
    var overRest = require_overRest();
    var setToString = require_setToString();
    function flatRest(func) {
      return setToString(overRest(func, void 0, flatten), func + "");
    }
    module.exports = flatRest;
  }
});

// ../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/pick.js
var require_pick = __commonJS({
  "../../node_modules/.pnpm/lodash@4.18.1/node_modules/lodash/pick.js"(exports, module) {
    "use strict";
    var basePick = require_basePick();
    var flatRest = require_flatRest();
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });
    module.exports = pick;
  }
});

// ../../node_modules/.pnpm/@react-router+dev@7.14.0_@react-router+serve@7.14.0_react-router@7.14.0_react-dom@19.2._ec11c05ad7feecef203217fd751c918f/node_modules/@react-router/dev/dist/routes.js
var require_routes = __commonJS({
  "../../node_modules/.pnpm/@react-router+dev@7.14.0_@react-router+serve@7.14.0_react-router@7.14.0_react-dom@19.2._ec11c05ad7feecef203217fd751c918f/node_modules/@react-router/dev/dist/routes.js"(exports, module) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var routes_exports = {};
    __export(routes_exports, {
      getAppDirectory: () => getAppDirectory,
      index: () => index2,
      layout: () => layout2,
      prefix: () => prefix2,
      relative: () => relative2,
      route: () => route2
    });
    module.exports = __toCommonJS(routes_exports);
    var Path = __toESM2(require_dist());
    var v = __toESM2(require_dist2());
    var import_pick = __toESM2(require_pick());
    function invariant(value, message) {
      if (value === false || value === null || typeof value === "undefined") {
        console.error(
          "The following error is a bug in React Router; please open an issue! https://github.com/remix-run/react-router/issues/new/choose"
        );
        throw new Error(message);
      }
    }
    function getAppDirectory() {
      invariant(globalThis.__reactRouterAppDirectory);
      return globalThis.__reactRouterAppDirectory;
    }
    var routeConfigEntrySchema = v.pipe(
      v.custom((value) => {
        return !(typeof value === "object" && value !== null && "then" in value && "catch" in value);
      }, "Invalid type: Expected object but received a promise. Did you forget to await?"),
      v.object({
        id: v.optional(
          v.pipe(
            v.string(),
            v.notValue("root", "A route cannot use the reserved id 'root'.")
          )
        ),
        path: v.optional(v.string()),
        index: v.optional(v.boolean()),
        caseSensitive: v.optional(v.boolean()),
        file: v.string(),
        children: v.optional(v.array(v.lazy(() => routeConfigEntrySchema)))
      })
    );
    var resolvedRouteConfigSchema = v.array(routeConfigEntrySchema);
    var createConfigRouteOptionKeys = [
      "id",
      "index",
      "caseSensitive"
    ];
    function route2(path2, file, optionsOrChildren, children) {
      let options = {};
      if (Array.isArray(optionsOrChildren) || !optionsOrChildren) {
        children = optionsOrChildren;
      } else {
        options = optionsOrChildren;
      }
      return {
        file,
        children,
        path: path2 ?? void 0,
        ...(0, import_pick.default)(options, createConfigRouteOptionKeys)
      };
    }
    var createIndexOptionKeys = ["id"];
    function index2(file, options) {
      return {
        file,
        index: true,
        ...(0, import_pick.default)(options, createIndexOptionKeys)
      };
    }
    var createLayoutOptionKeys = ["id"];
    function layout2(file, optionsOrChildren, children) {
      let options = {};
      if (Array.isArray(optionsOrChildren) || !optionsOrChildren) {
        children = optionsOrChildren;
      } else {
        options = optionsOrChildren;
      }
      return {
        file,
        children,
        ...(0, import_pick.default)(options, createLayoutOptionKeys)
      };
    }
    function prefix2(prefixPath, routes) {
      return routes.map((route22) => {
        if (route22.index || typeof route22.path === "string") {
          return {
            ...route22,
            path: route22.path ? joinRoutePaths(prefixPath, route22.path) : prefixPath,
            children: route22.children
          };
        } else if (route22.children) {
          return {
            ...route22,
            children: prefix2(prefixPath, route22.children)
          };
        }
        return route22;
      });
    }
    function relative2(directory) {
      return {
        /**
         * Helper function for creating a route config entry, for use within
         * `routes.ts`. Note that this helper has been scoped, meaning that file
         * path will be resolved relative to the directory provided to the
         * `relative` call that created this helper.
         */
        route: (path2, file, ...rest) => {
          return route2(path2, Path.resolve(directory, file), ...rest);
        },
        /**
         * Helper function for creating a route config entry for an index route, for
         * use within `routes.ts`. Note that this helper has been scoped, meaning
         * that file path will be resolved relative to the directory provided to the
         * `relative` call that created this helper.
         */
        index: (file, ...rest) => {
          return index2(Path.resolve(directory, file), ...rest);
        },
        /**
         * Helper function for creating a route config entry for a layout route, for
         * use within `routes.ts`. Note that this helper has been scoped, meaning
         * that file path will be resolved relative to the directory provided to the
         * `relative` call that created this helper.
         */
        layout: (file, ...rest) => {
          return layout2(Path.resolve(directory, file), ...rest);
        },
        // Passthrough of helper functions that don't need relative scoping so that
        // a complete API is still provided.
        prefix: prefix2
      };
    }
    function joinRoutePaths(path1, path2) {
      return [
        path1.replace(/\/+$/, ""),
        // Remove trailing slashes
        path2.replace(/^\/+/, "")
        // Remove leading slashes
      ].join("/");
    }
  }
});

// src/index.ts
var import_routes = __toESM(require_routes(), 1);
import { createCookie, redirect } from "react-router";
import path from "path";
function getAddonRoutesConfig(routesConfig, addonsInfo) {
  const resultRoutesConfig = [];
  for (const routeConfig of routesConfig) {
    if (routeConfig.type !== "prefix") {
      const containsAddonModule = addonsInfo.find(
        (addon) => routeConfig.file.includes(addon.name)
      );
      if (containsAddonModule) {
        routeConfig.file = path.join(
          containsAddonModule.modulePath,
          routeConfig.file.replace(containsAddonModule.name, "")
        );
      }
    }
    switch (routeConfig.type) {
      case "route": {
        const children = routeConfig.children ? getAddonRoutesConfig(
          routeConfig.children,
          addonsInfo
        ) : void 0;
        resultRoutesConfig.push(
          (0, import_routes.route)(
            routeConfig.path,
            routeConfig.file,
            routeConfig.options || {},
            children
          )
        );
        break;
      }
      case "index":
        resultRoutesConfig.push((0, import_routes.index)(routeConfig.file, routeConfig.options));
        break;
      case "layout": {
        const children = routeConfig.children ? getAddonRoutesConfig(
          routeConfig.children,
          addonsInfo
        ) : void 0;
        resultRoutesConfig.push(
          (0, import_routes.layout)(routeConfig.file, routeConfig.options || {}, children)
        );
        break;
      }
      case "prefix":
        resultRoutesConfig.push(
          ...(0, import_routes.prefix)(
            routeConfig.path,
            getAddonRoutesConfig(routeConfig.children, addonsInfo)
          )
        );
        break;
      default:
        break;
    }
  }
  return resultRoutesConfig;
}
var secret = process.env.COOKIE_SECRET || "default";
if (secret === "default" && process.env.NODE_ENV === "production") {
  console.warn(
    "\u{1F6A8} No COOKIE_SECRET environment variable set, using default. The app is insecure in production."
  );
}
var cookie = createCookie("auth_seven", {
  secrets: [secret],
  // 30 days
  // maxAge: 30 * 24 * 60 * 60,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax"
});
async function getAuthFromRequest(request) {
  let token;
  try {
    token = await cookie.parse(request.headers.get("Cookie"));
  } catch {
  }
  return token ?? void 0;
}
async function setAuthOnResponse(response, token, options) {
  const header = await cookie.serialize(token, options);
  response.headers.append("Set-Cookie", header);
  return response;
}
async function clearAuthOnResponse(response, options) {
  const header = await getClearAuthCookieHeader(options);
  response.headers.append("Set-Cookie", header);
  return response;
}
async function getClearAuthCookieHeader(options) {
  return await cookie.serialize("", {
    maxAge: 0,
    ...options
  });
}
async function requireAuthCookie(request) {
  const token = await getAuthFromRequest(request);
  if (!token) {
    throw await redirectWithClearedCookie("/login");
  }
  return token;
}
async function redirectIfLoggedInLoader({
  request
}) {
  const token = await getAuthFromRequest(request);
  if (token) {
    throw redirect("/");
  }
  return null;
}
async function redirectWithClearedCookie(url = "/") {
  return clearAuthOnResponse(redirect(url));
}
export {
  clearAuthOnResponse,
  cookie,
  getAddonRoutesConfig,
  getAuthFromRequest,
  getClearAuthCookieHeader,
  redirectIfLoggedInLoader,
  redirectWithClearedCookie,
  requireAuthCookie,
  setAuthOnResponse
};
/*! Bundled license information:

@react-router/dev/dist/routes.js:
  (**
   * @react-router/dev v7.14.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
