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

// ../../node_modules/.pnpm/valibot@0.41.0_typescript@5.7.3/node_modules/valibot/dist/index.cjs
var require_dist2 = __commonJS({
  "../../node_modules/.pnpm/valibot@0.41.0_typescript@5.7.3/node_modules/valibot/dist/index.cjs"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
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
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export(src_exports, {
      BASE64_REGEX: () => BASE64_REGEX,
      BIC_REGEX: () => BIC_REGEX,
      CUID2_REGEX: () => CUID2_REGEX,
      DECIMAL_REGEX: () => DECIMAL_REGEX,
      EMAIL_REGEX: () => EMAIL_REGEX,
      EMOJI_REGEX: () => EMOJI_REGEX,
      HEXADECIMAL_REGEX: () => HEXADECIMAL_REGEX,
      HEX_COLOR_REGEX: () => HEX_COLOR_REGEX,
      IMEI_REGEX: () => IMEI_REGEX,
      IPV4_REGEX: () => IPV4_REGEX,
      IPV6_REGEX: () => IPV6_REGEX,
      IP_REGEX: () => IP_REGEX,
      ISO_DATE_REGEX: () => ISO_DATE_REGEX,
      ISO_DATE_TIME_REGEX: () => ISO_DATE_TIME_REGEX,
      ISO_TIMESTAMP_REGEX: () => ISO_TIMESTAMP_REGEX,
      ISO_TIME_REGEX: () => ISO_TIME_REGEX,
      ISO_TIME_SECOND_REGEX: () => ISO_TIME_SECOND_REGEX,
      ISO_WEEK_REGEX: () => ISO_WEEK_REGEX,
      MAC48_REGEX: () => MAC48_REGEX,
      MAC64_REGEX: () => MAC64_REGEX,
      MAC_REGEX: () => MAC_REGEX,
      NANO_ID_REGEX: () => NANO_ID_REGEX,
      OCTAL_REGEX: () => OCTAL_REGEX,
      ULID_REGEX: () => ULID_REGEX,
      UUID_REGEX: () => UUID_REGEX,
      ValiError: () => ValiError,
      _addIssue: () => _addIssue,
      _isLuhnAlgo: () => _isLuhnAlgo,
      _isValidObjectKey: () => _isValidObjectKey,
      _joinExpects: () => _joinExpects,
      _stringify: () => _stringify,
      any: () => any,
      array: () => array,
      arrayAsync: () => arrayAsync,
      awaitAsync: () => awaitAsync,
      base64: () => base64,
      bic: () => bic,
      bigint: () => bigint,
      blob: () => blob,
      boolean: () => boolean,
      brand: () => brand,
      bytes: () => bytes,
      check: () => check,
      checkAsync: () => checkAsync,
      checkItems: () => checkItems,
      config: () => config,
      creditCard: () => creditCard,
      cuid2: () => cuid2,
      custom: () => custom,
      customAsync: () => customAsync,
      date: () => date,
      decimal: () => decimal,
      deleteGlobalConfig: () => deleteGlobalConfig,
      deleteGlobalMessage: () => deleteGlobalMessage,
      deleteSchemaMessage: () => deleteSchemaMessage,
      deleteSpecificMessage: () => deleteSpecificMessage,
      description: () => description,
      email: () => email,
      emoji: () => emoji,
      empty: () => empty,
      endsWith: () => endsWith,
      entriesFromList: () => entriesFromList,
      enum: () => enum_,
      enum_: () => enum_,
      everyItem: () => everyItem,
      excludes: () => excludes,
      fallback: () => fallback,
      fallbackAsync: () => fallbackAsync,
      file: () => file,
      filterItems: () => filterItems,
      findItem: () => findItem,
      finite: () => finite,
      flatten: () => flatten,
      forward: () => forward,
      forwardAsync: () => forwardAsync,
      function: () => function_,
      function_: () => function_,
      getDefault: () => getDefault,
      getDefaults: () => getDefaults,
      getDefaultsAsync: () => getDefaultsAsync,
      getDotPath: () => getDotPath,
      getFallback: () => getFallback,
      getFallbacks: () => getFallbacks,
      getFallbacksAsync: () => getFallbacksAsync,
      getGlobalConfig: () => getGlobalConfig,
      getGlobalMessage: () => getGlobalMessage,
      getSchemaMessage: () => getSchemaMessage,
      getSpecificMessage: () => getSpecificMessage,
      hash: () => hash,
      hexColor: () => hexColor,
      hexadecimal: () => hexadecimal,
      imei: () => imei,
      includes: () => includes,
      instance: () => instance,
      integer: () => integer,
      intersect: () => intersect,
      intersectAsync: () => intersectAsync,
      ip: () => ip,
      ipv4: () => ipv4,
      ipv6: () => ipv6,
      is: () => is,
      isOfKind: () => isOfKind,
      isOfType: () => isOfType,
      isValiError: () => isValiError,
      isoDate: () => isoDate,
      isoDateTime: () => isoDateTime,
      isoTime: () => isoTime,
      isoTimeSecond: () => isoTimeSecond,
      isoTimestamp: () => isoTimestamp,
      isoWeek: () => isoWeek,
      keyof: () => keyof,
      lazy: () => lazy,
      lazyAsync: () => lazyAsync,
      length: () => length,
      literal: () => literal,
      looseObject: () => looseObject,
      looseObjectAsync: () => looseObjectAsync,
      looseTuple: () => looseTuple,
      looseTupleAsync: () => looseTupleAsync,
      mac: () => mac,
      mac48: () => mac48,
      mac64: () => mac64,
      map: () => map,
      mapAsync: () => mapAsync,
      mapItems: () => mapItems,
      maxBytes: () => maxBytes,
      maxLength: () => maxLength,
      maxSize: () => maxSize,
      maxValue: () => maxValue,
      mimeType: () => mimeType,
      minBytes: () => minBytes,
      minLength: () => minLength,
      minSize: () => minSize,
      minValue: () => minValue,
      multipleOf: () => multipleOf,
      nan: () => nan,
      nanoid: () => nanoid,
      never: () => never,
      nonEmpty: () => nonEmpty,
      nonNullable: () => nonNullable,
      nonNullableAsync: () => nonNullableAsync,
      nonNullish: () => nonNullish,
      nonNullishAsync: () => nonNullishAsync,
      nonOptional: () => nonOptional,
      nonOptionalAsync: () => nonOptionalAsync,
      normalize: () => normalize,
      notBytes: () => notBytes,
      notLength: () => notLength,
      notSize: () => notSize,
      notValue: () => notValue,
      null: () => null_,
      null_: () => null_,
      nullable: () => nullable,
      nullableAsync: () => nullableAsync,
      nullish: () => nullish,
      nullishAsync: () => nullishAsync,
      number: () => number,
      object: () => object,
      objectAsync: () => objectAsync,
      objectWithRest: () => objectWithRest,
      objectWithRestAsync: () => objectWithRestAsync,
      octal: () => octal,
      omit: () => omit,
      optional: () => optional,
      optionalAsync: () => optionalAsync,
      parse: () => parse,
      parseAsync: () => parseAsync,
      parser: () => parser,
      parserAsync: () => parserAsync,
      partial: () => partial,
      partialAsync: () => partialAsync,
      partialCheck: () => partialCheck,
      partialCheckAsync: () => partialCheckAsync,
      pick: () => pick,
      picklist: () => picklist,
      pipe: () => pipe,
      pipeAsync: () => pipeAsync,
      promise: () => promise,
      rawCheck: () => rawCheck,
      rawCheckAsync: () => rawCheckAsync,
      rawTransform: () => rawTransform,
      rawTransformAsync: () => rawTransformAsync,
      readonly: () => readonly,
      record: () => record,
      recordAsync: () => recordAsync,
      reduceItems: () => reduceItems,
      regex: () => regex,
      required: () => required,
      requiredAsync: () => requiredAsync,
      safeInteger: () => safeInteger,
      safeParse: () => safeParse,
      safeParseAsync: () => safeParseAsync,
      safeParser: () => safeParser,
      safeParserAsync: () => safeParserAsync,
      set: () => set,
      setAsync: () => setAsync,
      setGlobalConfig: () => setGlobalConfig,
      setGlobalMessage: () => setGlobalMessage,
      setSchemaMessage: () => setSchemaMessage,
      setSpecificMessage: () => setSpecificMessage,
      size: () => size,
      someItem: () => someItem,
      sortItems: () => sortItems,
      startsWith: () => startsWith,
      strictObject: () => strictObject,
      strictObjectAsync: () => strictObjectAsync,
      strictTuple: () => strictTuple,
      strictTupleAsync: () => strictTupleAsync,
      string: () => string,
      symbol: () => symbol,
      toLowerCase: () => toLowerCase,
      toMaxValue: () => toMaxValue,
      toMinValue: () => toMinValue,
      toUpperCase: () => toUpperCase,
      transform: () => transform,
      transformAsync: () => transformAsync,
      trim: () => trim,
      trimEnd: () => trimEnd,
      trimStart: () => trimStart,
      tuple: () => tuple,
      tupleAsync: () => tupleAsync,
      tupleWithRest: () => tupleWithRest,
      tupleWithRestAsync: () => tupleWithRestAsync,
      ulid: () => ulid,
      undefined: () => undefined_,
      undefined_: () => undefined_,
      undefinedable: () => undefinedable,
      undefinedableAsync: () => undefinedableAsync,
      union: () => union,
      unionAsync: () => unionAsync,
      unknown: () => unknown,
      unwrap: () => unwrap,
      url: () => url,
      uuid: () => uuid,
      value: () => value,
      variant: () => variant,
      variantAsync: () => variantAsync,
      void: () => void_,
      void_: () => void_
    });
    module.exports = __toCommonJS(src_exports);
    function awaitAsync() {
      return {
        kind: "transformation",
        type: "await",
        reference: awaitAsync,
        async: true,
        async _run(dataset) {
          dataset.value = await dataset.value;
          return dataset;
        }
      };
    }
    var BASE64_REGEX = /^(?:[\da-z+/]{4})*(?:[\da-z+/]{2}==|[\da-z+/]{3}=)?$/iu;
    var BIC_REGEX = /^[A-Z]{6}(?!00)[\dA-Z]{2}(?:[\dA-Z]{3})?$/u;
    var CUID2_REGEX = /^[a-z][\da-z]*$/u;
    var DECIMAL_REGEX = /^\d+$/u;
    var EMAIL_REGEX = /^[\w+-]+(?:\.[\w+-]+)*@[\da-z]+(?:[.-][\da-z]+)*\.[a-z]{2,}$/iu;
    var EMOJI_REGEX = (
      // eslint-disable-next-line redos-detector/no-unsafe-regex, regexp/no-dupe-disjunctions -- false positives
      /^(?:[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}))*)+$/u
    );
    var HEXADECIMAL_REGEX = /^(?:0[hx])?[\da-f]+$/iu;
    var HEX_COLOR_REGEX = /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/iu;
    var IMEI_REGEX = /^\d{15}$|^\d{2}-\d{6}-\d{6}-\d$/u;
    var IPV4_REGEX = (
      // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive
      /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$/u
    );
    var IPV6_REGEX = /^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
    var IP_REGEX = /^(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])(?:\.(?:(?:[1-9]|1\d|2[0-4])?\d|25[0-5])){3}$|^(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:|(?:[\da-f]{1,4}:){1,6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,5}(?::[\da-f]{1,4}){1,2}|(?:[\da-f]{1,4}:){1,4}(?::[\da-f]{1,4}){1,3}|(?:[\da-f]{1,4}:){1,3}(?::[\da-f]{1,4}){1,4}|(?:[\da-f]{1,4}:){1,2}(?::[\da-f]{1,4}){1,5}|[\da-f]{1,4}:(?::[\da-f]{1,4}){1,6}|:(?:(?::[\da-f]{1,4}){1,7}|:)|fe80:(?::[\da-f]{0,4}){0,4}%[\da-z]+|::(?:f{4}(?::0{1,4})?:)?(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d)|(?:[\da-f]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1?\d)?\d)\.){3}(?:25[0-5]|(?:2[0-4]|1?\d)?\d))$/iu;
    var ISO_DATE_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])$/u;
    var ISO_DATE_TIME_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])T(?:0\d|1\d|2[0-3]):[0-5]\d$/u;
    var ISO_TIME_REGEX = /^(?:0\d|1\d|2[0-3]):[0-5]\d$/u;
    var ISO_TIME_SECOND_REGEX = /^(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}$/u;
    var ISO_TIMESTAMP_REGEX = /^\d{4}-(?:0[1-9]|1[0-2])-(?:[12]\d|0[1-9]|3[01])T(?:0\d|1\d|2[0-3])(?::[0-5]\d){2}(?:\.\d{1,9})?(?:Z|[+-](?:0\d|1\d|2[0-3])(?::?[0-5]\d)?)$/u;
    var ISO_WEEK_REGEX = /^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/u;
    var MAC48_REGEX = /^(?:[\da-f]{2}:){5}[\da-f]{2}$|^(?:[\da-f]{2}-){5}[\da-f]{2}$|^(?:[\da-f]{4}\.){2}[\da-f]{4}$/iu;
    var MAC64_REGEX = /^(?:[\da-f]{2}:){7}[\da-f]{2}$|^(?:[\da-f]{2}-){7}[\da-f]{2}$|^(?:[\da-f]{4}\.){3}[\da-f]{4}$|^(?:[\da-f]{4}:){3}[\da-f]{4}$/iu;
    var MAC_REGEX = /^(?:[\da-f]{2}:){5}[\da-f]{2}$|^(?:[\da-f]{2}-){5}[\da-f]{2}$|^(?:[\da-f]{4}\.){2}[\da-f]{4}$|^(?:[\da-f]{2}:){7}[\da-f]{2}$|^(?:[\da-f]{2}-){7}[\da-f]{2}$|^(?:[\da-f]{4}\.){3}[\da-f]{4}$|^(?:[\da-f]{4}:){3}[\da-f]{4}$/iu;
    var NANO_ID_REGEX = /^[\w-]+$/u;
    var OCTAL_REGEX = /^(?:0o)?[0-7]+$/iu;
    var ULID_REGEX = /^[\da-hjkmnp-tv-z]{26}$/iu;
    var UUID_REGEX = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/iu;
    var store;
    function setGlobalConfig(config2) {
      store = { ...store, ...config2 };
    }
    function getGlobalConfig(config2) {
      return {
        lang: config2?.lang ?? store?.lang,
        message: config2?.message,
        abortEarly: config2?.abortEarly ?? store?.abortEarly,
        abortPipeEarly: config2?.abortPipeEarly ?? store?.abortPipeEarly
      };
    }
    function deleteGlobalConfig() {
      store = void 0;
    }
    var store2;
    function setGlobalMessage(message, lang) {
      if (!store2) store2 = /* @__PURE__ */ new Map();
      store2.set(lang, message);
    }
    function getGlobalMessage(lang) {
      return store2?.get(lang);
    }
    function deleteGlobalMessage(lang) {
      store2?.delete(lang);
    }
    var store3;
    function setSchemaMessage(message, lang) {
      if (!store3) store3 = /* @__PURE__ */ new Map();
      store3.set(lang, message);
    }
    function getSchemaMessage(lang) {
      return store3?.get(lang);
    }
    function deleteSchemaMessage(lang) {
      store3?.delete(lang);
    }
    var store4;
    function setSpecificMessage(reference, message, lang) {
      if (!store4) store4 = /* @__PURE__ */ new Map();
      if (!store4.get(reference)) store4.set(reference, /* @__PURE__ */ new Map());
      store4.get(reference).set(lang, message);
    }
    function getSpecificMessage(reference, lang) {
      return store4?.get(reference)?.get(lang);
    }
    function deleteSpecificMessage(reference, lang) {
      store4?.get(reference)?.delete(lang);
    }
    function _stringify(input) {
      const type = typeof input;
      if (type === "string") {
        return `"${input}"`;
      }
      if (type === "number" || type === "bigint" || type === "boolean") {
        return `${input}`;
      }
      if (type === "object" || type === "function") {
        return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
      }
      return type;
    }
    function _addIssue(context, label, dataset, config2, other) {
      const input = other && "input" in other ? other.input : dataset.value;
      const expected = other?.expected ?? context.expects ?? null;
      const received = other?.received ?? _stringify(input);
      const issue = {
        kind: context.kind,
        type: context.type,
        input,
        expected,
        received,
        message: `Invalid ${label}: ${expected ? `Expected ${expected} but r` : "R"}eceived ${received}`,
        // @ts-expect-error
        requirement: context.requirement,
        path: other?.path,
        issues: other?.issues,
        lang: config2.lang,
        abortEarly: config2.abortEarly,
        abortPipeEarly: config2.abortPipeEarly
      };
      const isSchema = context.kind === "schema";
      const message = other?.message ?? // @ts-expect-error
      context.message ?? getSpecificMessage(context.reference, issue.lang) ?? (isSchema ? getSchemaMessage(issue.lang) : null) ?? config2.message ?? getGlobalMessage(issue.lang);
      if (message) {
        issue.message = typeof message === "function" ? message(issue) : message;
      }
      if (isSchema) {
        dataset.typed = false;
      }
      if (dataset.issues) {
        dataset.issues.push(issue);
      } else {
        dataset.issues = [issue];
      }
    }
    var NON_DIGIT_REGEX = /\D/gu;
    function _isLuhnAlgo(input) {
      const number2 = input.replace(NON_DIGIT_REGEX, "");
      let length2 = number2.length;
      let bit = 1;
      let sum = 0;
      while (length2) {
        const value2 = +number2[--length2];
        bit ^= 1;
        sum += bit ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][value2] : value2;
      }
      return sum % 10 === 0;
    }
    function _isValidObjectKey(object2, key) {
      return Object.hasOwn(object2, key) && key !== "__proto__" && key !== "prototype" && key !== "constructor";
    }
    function _joinExpects(values, separator) {
      const list = [...new Set(values)];
      if (list.length > 1) {
        return `(${list.join(` ${separator} `)})`;
      }
      return list[0] ?? "never";
    }
    function entriesFromList(list, schema) {
      const entries = {};
      for (const key of list) {
        entries[key] = schema;
      }
      return entries;
    }
    function getDotPath(issue) {
      if (issue.path) {
        let key = "";
        for (const item of issue.path) {
          if (typeof item.key === "string" || typeof item.key === "number") {
            if (key) {
              key += `.${item.key}`;
            } else {
              key += item.key;
            }
          } else {
            return null;
          }
        }
        return key;
      }
      return null;
    }
    function isOfKind(kind, object2) {
      return object2.kind === kind;
    }
    function isOfType(type, object2) {
      return object2.type === type;
    }
    function isValiError(error) {
      return error instanceof ValiError;
    }
    var ValiError = class extends Error {
      /**
       * The error issues.
       */
      issues;
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
    function base64(message) {
      return {
        kind: "validation",
        type: "base64",
        reference: base64,
        async: false,
        expects: null,
        requirement: BASE64_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "Base64", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function bic(message) {
      return {
        kind: "validation",
        type: "bic",
        reference: bic,
        async: false,
        expects: null,
        requirement: BIC_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "BIC", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function brand(name) {
      return {
        kind: "transformation",
        type: "brand",
        reference: brand,
        async: false,
        name,
        _run(dataset) {
          return dataset;
        }
      };
    }
    function bytes(requirement, message) {
      return {
        kind: "validation",
        type: "bytes",
        reference: bytes,
        async: false,
        expects: `${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed) {
            const length2 = new TextEncoder().encode(dataset.value).length;
            if (length2 !== this.requirement) {
              _addIssue(this, "bytes", dataset, config2, {
                received: `${length2}`
              });
            }
          }
          return dataset;
        }
      };
    }
    function check(requirement, message) {
      return {
        kind: "validation",
        type: "check",
        reference: check,
        async: false,
        expects: null,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement(dataset.value)) {
            _addIssue(this, "input", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function checkAsync(requirement, message) {
      return {
        kind: "validation",
        type: "check",
        reference: checkAsync,
        async: true,
        expects: null,
        requirement,
        message,
        async _run(dataset, config2) {
          if (dataset.typed && !await this.requirement(dataset.value)) {
            _addIssue(this, "input", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function checkItems(requirement, message) {
      return {
        kind: "validation",
        type: "check_items",
        reference: checkItems,
        async: false,
        expects: null,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed) {
            for (let index2 = 0; index2 < dataset.value.length; index2++) {
              const item = dataset.value[index2];
              if (!this.requirement(item, index2, dataset.value)) {
                _addIssue(this, "item", dataset, config2, {
                  input: item,
                  path: [
                    {
                      type: "array",
                      origin: "value",
                      input: dataset.value,
                      key: index2,
                      value: item
                    }
                  ]
                });
              }
            }
          }
          return dataset;
        }
      };
    }
    var CREDIT_CARD_REGEX = /^(?:\d{14,19}|\d{4}(?: \d{3,6}){2,4}|\d{4}(?:-\d{3,6}){2,4})$/u;
    var SANITIZE_REGEX = /[- ]/gu;
    var PROVIDER_REGEX_LIST = [
      // American Express
      /^3[47]\d{13}$/u,
      // Diners Club
      /^3(?:0[0-5]|[68]\d)\d{11,13}$/u,
      // Discover
      /^6(?:011|5\d{2})\d{12,15}$/u,
      // JCB
      /^(?:2131|1800|35\d{3})\d{11}$/u,
      // Mastercard
      /^5[1-5]\d{2}|(?:222\d|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)\d{12}$/u,
      // UnionPay
      /^(?:6[27]\d{14,17}|81\d{14,17})$/u,
      // Visa
      /^4\d{12}(?:\d{3,6})?$/u
    ];
    function creditCard(message) {
      return {
        kind: "validation",
        type: "credit_card",
        reference: creditCard,
        async: false,
        expects: null,
        requirement(input) {
          let sanitized;
          return CREDIT_CARD_REGEX.test(input) && // Remove any hyphens and blanks
          (sanitized = input.replace(SANITIZE_REGEX, "")) && // Check if it matches a provider
          PROVIDER_REGEX_LIST.some((regex2) => regex2.test(sanitized)) && // Check if passes luhn algorithm
          _isLuhnAlgo(sanitized);
        },
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement(dataset.value)) {
            _addIssue(this, "credit card", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function cuid2(message) {
      return {
        kind: "validation",
        type: "cuid2",
        reference: cuid2,
        async: false,
        expects: null,
        requirement: CUID2_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "Cuid2", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function decimal(message) {
      return {
        kind: "validation",
        type: "decimal",
        reference: decimal,
        async: false,
        expects: null,
        requirement: DECIMAL_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "decimal", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function description(description_) {
      return {
        kind: "metadata",
        type: "description",
        reference: description,
        description: description_
      };
    }
    function email(message) {
      return {
        kind: "validation",
        type: "email",
        reference: email,
        expects: null,
        async: false,
        requirement: EMAIL_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "email", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function emoji(message) {
      return {
        kind: "validation",
        type: "emoji",
        reference: emoji,
        async: false,
        expects: null,
        requirement: EMOJI_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "emoji", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function empty(message) {
      return {
        kind: "validation",
        type: "empty",
        reference: empty,
        async: false,
        expects: "0",
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.length > 0) {
            _addIssue(this, "length", dataset, config2, {
              received: `${dataset.value.length}`
            });
          }
          return dataset;
        }
      };
    }
    function endsWith(requirement, message) {
      return {
        kind: "validation",
        type: "ends_with",
        reference: endsWith,
        async: false,
        expects: `"${requirement}"`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !dataset.value.endsWith(this.requirement)) {
            _addIssue(this, "end", dataset, config2, {
              received: `"${dataset.value.slice(-this.requirement.length)}"`
            });
          }
          return dataset;
        }
      };
    }
    function everyItem(requirement, message) {
      return {
        kind: "validation",
        type: "every_item",
        reference: everyItem,
        async: false,
        expects: null,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !dataset.value.every(this.requirement)) {
            _addIssue(this, "item", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function excludes(requirement, message) {
      const received = _stringify(requirement);
      return {
        kind: "validation",
        type: "excludes",
        reference: excludes,
        async: false,
        expects: `!${received}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.includes(this.requirement)) {
            _addIssue(this, "content", dataset, config2, { received });
          }
          return dataset;
        }
      };
    }
    function filterItems(operation) {
      return {
        kind: "transformation",
        type: "filter_items",
        reference: filterItems,
        async: false,
        operation,
        _run(dataset) {
          dataset.value = dataset.value.filter(this.operation);
          return dataset;
        }
      };
    }
    function findItem(operation) {
      return {
        kind: "transformation",
        type: "find_item",
        reference: findItem,
        async: false,
        operation,
        _run(dataset) {
          dataset.value = dataset.value.find(this.operation);
          return dataset;
        }
      };
    }
    function finite(message) {
      return {
        kind: "validation",
        type: "finite",
        reference: finite,
        async: false,
        expects: null,
        requirement: Number.isFinite,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement(dataset.value)) {
            _addIssue(this, "finite", dataset, config2);
          }
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
    function hash(types, message) {
      return {
        kind: "validation",
        type: "hash",
        reference: hash,
        expects: null,
        async: false,
        requirement: RegExp(
          types.map((type) => `^[a-f0-9]{${HASH_LENGTHS[type]}}$`).join("|"),
          "iu"
        ),
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "hash", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function hexadecimal(message) {
      return {
        kind: "validation",
        type: "hexadecimal",
        reference: hexadecimal,
        async: false,
        expects: null,
        requirement: HEXADECIMAL_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "hexadecimal", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function hexColor(message) {
      return {
        kind: "validation",
        type: "hex_color",
        reference: hexColor,
        async: false,
        expects: null,
        requirement: HEX_COLOR_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "hex color", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function imei(message) {
      return {
        kind: "validation",
        type: "imei",
        reference: imei,
        async: false,
        expects: null,
        requirement(input) {
          return IMEI_REGEX.test(input) && _isLuhnAlgo(input);
        },
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement(dataset.value)) {
            _addIssue(this, "IMEI", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function includes(requirement, message) {
      const expects = _stringify(requirement);
      return {
        kind: "validation",
        type: "includes",
        reference: includes,
        async: false,
        expects,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !dataset.value.includes(this.requirement)) {
            _addIssue(this, "content", dataset, config2, {
              received: `!${expects}`
            });
          }
          return dataset;
        }
      };
    }
    function integer(message) {
      return {
        kind: "validation",
        type: "integer",
        reference: integer,
        async: false,
        expects: null,
        requirement: Number.isInteger,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement(dataset.value)) {
            _addIssue(this, "integer", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function ip(message) {
      return {
        kind: "validation",
        type: "ip",
        reference: ip,
        async: false,
        expects: null,
        requirement: IP_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "IP", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function ipv4(message) {
      return {
        kind: "validation",
        type: "ipv4",
        reference: ipv4,
        async: false,
        expects: null,
        requirement: IPV4_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "IPv4", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function ipv6(message) {
      return {
        kind: "validation",
        type: "ipv6",
        reference: ipv6,
        async: false,
        expects: null,
        requirement: IPV6_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "IPv6", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function isoDate(message) {
      return {
        kind: "validation",
        type: "iso_date",
        reference: isoDate,
        async: false,
        expects: null,
        requirement: ISO_DATE_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "date", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function isoDateTime(message) {
      return {
        kind: "validation",
        type: "iso_date_time",
        reference: isoDateTime,
        async: false,
        expects: null,
        requirement: ISO_DATE_TIME_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "date-time", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function isoTime(message) {
      return {
        kind: "validation",
        type: "iso_time",
        reference: isoTime,
        async: false,
        expects: null,
        requirement: ISO_TIME_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "time", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function isoTimeSecond(message) {
      return {
        kind: "validation",
        type: "iso_time_second",
        reference: isoTimeSecond,
        async: false,
        expects: null,
        requirement: ISO_TIME_SECOND_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "time-second", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function isoTimestamp(message) {
      return {
        kind: "validation",
        type: "iso_timestamp",
        reference: isoTimestamp,
        async: false,
        expects: null,
        requirement: ISO_TIMESTAMP_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "timestamp", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function isoWeek(message) {
      return {
        kind: "validation",
        type: "iso_week",
        reference: isoWeek,
        async: false,
        expects: null,
        requirement: ISO_WEEK_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "week", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function length(requirement, message) {
      return {
        kind: "validation",
        type: "length",
        reference: length,
        async: false,
        expects: `${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.length !== this.requirement) {
            _addIssue(this, "length", dataset, config2, {
              received: `${dataset.value.length}`
            });
          }
          return dataset;
        }
      };
    }
    function mac(message) {
      return {
        kind: "validation",
        type: "mac",
        reference: mac,
        async: false,
        expects: null,
        requirement: MAC_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "MAC", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function mac48(message) {
      return {
        kind: "validation",
        type: "mac48",
        reference: mac48,
        async: false,
        expects: null,
        requirement: MAC48_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "48-bit MAC", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function mac64(message) {
      return {
        kind: "validation",
        type: "mac64",
        reference: mac64,
        async: false,
        expects: null,
        requirement: MAC64_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "64-bit MAC", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function mapItems(operation) {
      return {
        kind: "transformation",
        type: "map_items",
        reference: mapItems,
        async: false,
        operation,
        _run(dataset) {
          dataset.value = dataset.value.map(this.operation);
          return dataset;
        }
      };
    }
    function maxBytes(requirement, message) {
      return {
        kind: "validation",
        type: "max_bytes",
        reference: maxBytes,
        async: false,
        expects: `<=${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed) {
            const length2 = new TextEncoder().encode(dataset.value).length;
            if (length2 > this.requirement) {
              _addIssue(this, "bytes", dataset, config2, {
                received: `${length2}`
              });
            }
          }
          return dataset;
        }
      };
    }
    function maxLength(requirement, message) {
      return {
        kind: "validation",
        type: "max_length",
        reference: maxLength,
        async: false,
        expects: `<=${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.length > this.requirement) {
            _addIssue(this, "length", dataset, config2, {
              received: `${dataset.value.length}`
            });
          }
          return dataset;
        }
      };
    }
    function maxSize(requirement, message) {
      return {
        kind: "validation",
        type: "max_size",
        reference: maxSize,
        async: false,
        expects: `<=${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.size > this.requirement) {
            _addIssue(this, "size", dataset, config2, {
              received: `${dataset.value.size}`
            });
          }
          return dataset;
        }
      };
    }
    function maxValue(requirement, message) {
      return {
        kind: "validation",
        type: "max_value",
        reference: maxValue,
        async: false,
        expects: `<=${requirement instanceof Date ? requirement.toJSON() : _stringify(requirement)}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value > this.requirement) {
            _addIssue(this, "value", dataset, config2, {
              received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value)
            });
          }
          return dataset;
        }
      };
    }
    function mimeType(requirement, message) {
      return {
        kind: "validation",
        type: "mime_type",
        reference: mimeType,
        async: false,
        expects: _joinExpects(
          requirement.map((option) => `"${option}"`),
          "|"
        ),
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.includes(dataset.value.type)) {
            _addIssue(this, "MIME type", dataset, config2, {
              received: `"${dataset.value.type}"`
            });
          }
          return dataset;
        }
      };
    }
    function minBytes(requirement, message) {
      return {
        kind: "validation",
        type: "min_bytes",
        reference: minBytes,
        async: false,
        expects: `>=${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed) {
            const length2 = new TextEncoder().encode(dataset.value).length;
            if (length2 < this.requirement) {
              _addIssue(this, "bytes", dataset, config2, {
                received: `${length2}`
              });
            }
          }
          return dataset;
        }
      };
    }
    function minLength(requirement, message) {
      return {
        kind: "validation",
        type: "min_length",
        reference: minLength,
        async: false,
        expects: `>=${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.length < this.requirement) {
            _addIssue(this, "length", dataset, config2, {
              received: `${dataset.value.length}`
            });
          }
          return dataset;
        }
      };
    }
    function minSize(requirement, message) {
      return {
        kind: "validation",
        type: "min_size",
        reference: minSize,
        async: false,
        expects: `>=${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.size < this.requirement) {
            _addIssue(this, "size", dataset, config2, {
              received: `${dataset.value.size}`
            });
          }
          return dataset;
        }
      };
    }
    function minValue(requirement, message) {
      return {
        kind: "validation",
        type: "min_value",
        reference: minValue,
        async: false,
        expects: `>=${requirement instanceof Date ? requirement.toJSON() : _stringify(requirement)}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value < this.requirement) {
            _addIssue(this, "value", dataset, config2, {
              received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value)
            });
          }
          return dataset;
        }
      };
    }
    function multipleOf(requirement, message) {
      return {
        kind: "validation",
        type: "multiple_of",
        reference: multipleOf,
        async: false,
        expects: `%${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value % this.requirement !== 0) {
            _addIssue(this, "multiple", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function nanoid(message) {
      return {
        kind: "validation",
        type: "nanoid",
        reference: nanoid,
        async: false,
        expects: null,
        requirement: NANO_ID_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "Nano ID", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function nonEmpty(message) {
      return {
        kind: "validation",
        type: "non_empty",
        reference: nonEmpty,
        async: false,
        expects: "!0",
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.length === 0) {
            _addIssue(this, "length", dataset, config2, {
              received: "0"
            });
          }
          return dataset;
        }
      };
    }
    function normalize(form) {
      return {
        kind: "transformation",
        type: "normalize",
        reference: normalize,
        async: false,
        form,
        _run(dataset) {
          dataset.value = dataset.value.normalize(this.form);
          return dataset;
        }
      };
    }
    function notBytes(requirement, message) {
      return {
        kind: "validation",
        type: "not_bytes",
        reference: notBytes,
        async: false,
        expects: `!${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed) {
            const length2 = new TextEncoder().encode(dataset.value).length;
            if (length2 === this.requirement) {
              _addIssue(this, "bytes", dataset, config2, {
                received: `${length2}`
              });
            }
          }
          return dataset;
        }
      };
    }
    function notLength(requirement, message) {
      return {
        kind: "validation",
        type: "not_length",
        reference: notLength,
        async: false,
        expects: `!${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.length === this.requirement) {
            _addIssue(this, "length", dataset, config2, {
              received: `${dataset.value.length}`
            });
          }
          return dataset;
        }
      };
    }
    function notSize(requirement, message) {
      return {
        kind: "validation",
        type: "not_size",
        reference: notSize,
        async: false,
        expects: `!${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.size === this.requirement) {
            _addIssue(this, "size", dataset, config2, {
              received: `${dataset.value.size}`
            });
          }
          return dataset;
        }
      };
    }
    function notValue(requirement, message) {
      return {
        kind: "validation",
        type: "not_value",
        reference: notValue,
        async: false,
        expects: requirement instanceof Date ? `!${requirement.toJSON()}` : `!${_stringify(requirement)}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && this.requirement <= dataset.value && this.requirement >= dataset.value) {
            _addIssue(this, "value", dataset, config2, {
              received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value)
            });
          }
          return dataset;
        }
      };
    }
    function octal(message) {
      return {
        kind: "validation",
        type: "octal",
        reference: octal,
        async: false,
        expects: null,
        requirement: OCTAL_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "octal", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function _isPartiallyTyped(dataset, pathList) {
      if (dataset.issues) {
        for (const path2 of pathList) {
          for (const issue of dataset.issues) {
            let typed = false;
            const bound = Math.min(path2.length, issue.path?.length ?? 0);
            for (let index2 = 0; index2 < bound; index2++) {
              if (path2[index2] !== issue.path[index2].key) {
                typed = true;
                break;
              }
            }
            if (!typed) {
              return false;
            }
          }
        }
      }
      return true;
    }
    function partialCheck(pathList, requirement, message) {
      return {
        kind: "validation",
        type: "partial_check",
        reference: partialCheck,
        async: false,
        expects: null,
        requirement,
        message,
        _run(dataset, config2) {
          if (_isPartiallyTyped(dataset, pathList) && // @ts-expect-error
          !this.requirement(dataset.value)) {
            _addIssue(this, "input", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function partialCheckAsync(pathList, requirement, message) {
      return {
        kind: "validation",
        type: "partial_check",
        reference: partialCheckAsync,
        async: true,
        expects: null,
        requirement,
        message,
        async _run(dataset, config2) {
          if (_isPartiallyTyped(dataset, pathList) && // @ts-expect-error
          !await this.requirement(dataset.value)) {
            _addIssue(this, "input", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function rawCheck(action) {
      return {
        kind: "validation",
        type: "raw_check",
        reference: rawCheck,
        async: false,
        expects: null,
        _run(dataset, config2) {
          action({
            dataset,
            config: config2,
            addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config2, info)
          });
          return dataset;
        }
      };
    }
    function rawCheckAsync(action) {
      return {
        kind: "validation",
        type: "raw_check",
        reference: rawCheckAsync,
        async: true,
        expects: null,
        async _run(dataset, config2) {
          await action({
            dataset,
            config: config2,
            addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config2, info)
          });
          return dataset;
        }
      };
    }
    function rawTransform(action) {
      return {
        kind: "transformation",
        type: "raw_transform",
        reference: rawTransform,
        async: false,
        _run(dataset, config2) {
          const output = action({
            dataset,
            config: config2,
            addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config2, info),
            NEVER: null
          });
          if (dataset.issues) {
            dataset.typed = false;
          } else {
            dataset.value = output;
          }
          return dataset;
        }
      };
    }
    function rawTransformAsync(action) {
      return {
        kind: "transformation",
        type: "raw_transform",
        reference: rawTransformAsync,
        async: true,
        async _run(dataset, config2) {
          const output = await action({
            dataset,
            config: config2,
            addIssue: (info) => _addIssue(this, info?.label ?? "input", dataset, config2, info),
            NEVER: null
          });
          if (dataset.issues) {
            dataset.typed = false;
          } else {
            dataset.value = output;
          }
          return dataset;
        }
      };
    }
    function readonly() {
      return {
        kind: "transformation",
        type: "readonly",
        reference: readonly,
        async: false,
        _run(dataset) {
          return dataset;
        }
      };
    }
    function reduceItems(operation, initial) {
      return {
        kind: "transformation",
        type: "reduce_items",
        reference: reduceItems,
        async: false,
        operation,
        initial,
        _run(dataset) {
          dataset.value = dataset.value.reduce(this.operation, this.initial);
          return dataset;
        }
      };
    }
    function regex(requirement, message) {
      return {
        kind: "validation",
        type: "regex",
        reference: regex,
        async: false,
        expects: `${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "format", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function safeInteger(message) {
      return {
        kind: "validation",
        type: "safe_integer",
        reference: safeInteger,
        async: false,
        expects: null,
        requirement: Number.isSafeInteger,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement(dataset.value)) {
            _addIssue(this, "safe integer", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function size(requirement, message) {
      return {
        kind: "validation",
        type: "size",
        reference: size,
        async: false,
        expects: `${requirement}`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && dataset.value.size !== this.requirement) {
            _addIssue(this, "size", dataset, config2, {
              received: `${dataset.value.size}`
            });
          }
          return dataset;
        }
      };
    }
    function someItem(requirement, message) {
      return {
        kind: "validation",
        type: "some_item",
        reference: someItem,
        async: false,
        expects: null,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !dataset.value.some(this.requirement)) {
            _addIssue(this, "item", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function sortItems(operation) {
      return {
        kind: "transformation",
        type: "sort_items",
        reference: sortItems,
        async: false,
        operation,
        _run(dataset) {
          dataset.value = dataset.value.sort(this.operation);
          return dataset;
        }
      };
    }
    function startsWith(requirement, message) {
      return {
        kind: "validation",
        type: "starts_with",
        reference: startsWith,
        async: false,
        expects: `"${requirement}"`,
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !dataset.value.startsWith(this.requirement)) {
            _addIssue(this, "start", dataset, config2, {
              received: `"${dataset.value.slice(0, this.requirement.length)}"`
            });
          }
          return dataset;
        }
      };
    }
    function toLowerCase() {
      return {
        kind: "transformation",
        type: "to_lower_case",
        reference: toLowerCase,
        async: false,
        _run(dataset) {
          dataset.value = dataset.value.toLowerCase();
          return dataset;
        }
      };
    }
    function toMaxValue(requirement) {
      return {
        kind: "transformation",
        type: "to_max_value",
        reference: toMaxValue,
        async: false,
        requirement,
        _run(dataset) {
          dataset.value = dataset.value > this.requirement ? this.requirement : dataset.value;
          return dataset;
        }
      };
    }
    function toMinValue(requirement) {
      return {
        kind: "transformation",
        type: "to_min_value",
        reference: toMinValue,
        async: false,
        requirement,
        _run(dataset) {
          dataset.value = dataset.value < this.requirement ? this.requirement : dataset.value;
          return dataset;
        }
      };
    }
    function toUpperCase() {
      return {
        kind: "transformation",
        type: "to_upper_case",
        reference: toUpperCase,
        async: false,
        _run(dataset) {
          dataset.value = dataset.value.toUpperCase();
          return dataset;
        }
      };
    }
    function transform(operation) {
      return {
        kind: "transformation",
        type: "transform",
        reference: transform,
        async: false,
        operation,
        _run(dataset) {
          dataset.value = this.operation(dataset.value);
          return dataset;
        }
      };
    }
    function transformAsync(operation) {
      return {
        kind: "transformation",
        type: "transform",
        reference: transformAsync,
        async: true,
        operation,
        async _run(dataset) {
          dataset.value = await this.operation(dataset.value);
          return dataset;
        }
      };
    }
    function trim() {
      return {
        kind: "transformation",
        type: "trim",
        reference: trim,
        async: false,
        _run(dataset) {
          dataset.value = dataset.value.trim();
          return dataset;
        }
      };
    }
    function trimEnd() {
      return {
        kind: "transformation",
        type: "trim_end",
        reference: trimEnd,
        async: false,
        _run(dataset) {
          dataset.value = dataset.value.trimEnd();
          return dataset;
        }
      };
    }
    function trimStart() {
      return {
        kind: "transformation",
        type: "trim_start",
        reference: trimStart,
        async: false,
        _run(dataset) {
          dataset.value = dataset.value.trimStart();
          return dataset;
        }
      };
    }
    function ulid(message) {
      return {
        kind: "validation",
        type: "ulid",
        reference: ulid,
        async: false,
        expects: null,
        requirement: ULID_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "ULID", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function url(message) {
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
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement(dataset.value)) {
            _addIssue(this, "URL", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function uuid(message) {
      return {
        kind: "validation",
        type: "uuid",
        reference: uuid,
        async: false,
        expects: null,
        requirement: UUID_REGEX,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !this.requirement.test(dataset.value)) {
            _addIssue(this, "UUID", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function value(requirement, message) {
      return {
        kind: "validation",
        type: "value",
        reference: value,
        async: false,
        expects: requirement instanceof Date ? requirement.toJSON() : _stringify(requirement),
        requirement,
        message,
        _run(dataset, config2) {
          if (dataset.typed && !(this.requirement <= dataset.value && this.requirement >= dataset.value)) {
            _addIssue(this, "value", dataset, config2, {
              received: dataset.value instanceof Date ? dataset.value.toJSON() : _stringify(dataset.value)
            });
          }
          return dataset;
        }
      };
    }
    function config(schema, config2) {
      return {
        ...schema,
        _run(dataset, config_) {
          return schema._run(dataset, { ...config_, ...config2 });
        }
      };
    }
    function getFallback(schema, dataset, config2) {
      return typeof schema.fallback === "function" ? (
        // @ts-expect-error
        schema.fallback(dataset, config2)
      ) : (
        // @ts-expect-error
        schema.fallback
      );
    }
    function fallback(schema, fallback2) {
      return {
        ...schema,
        fallback: fallback2,
        _run(dataset, config2) {
          const outputDataset = schema._run(dataset, config2);
          return outputDataset.issues ? { typed: true, value: getFallback(this, outputDataset, config2) } : outputDataset;
        }
      };
    }
    function fallbackAsync(schema, fallback2) {
      return {
        ...schema,
        fallback: fallback2,
        async: true,
        async _run(dataset, config2) {
          const outputDataset = await schema._run(dataset, config2);
          return outputDataset.issues ? (
            // @ts-expect-error
            { typed: true, value: await getFallback(this, outputDataset, config2) }
          ) : outputDataset;
        }
      };
    }
    function flatten(issues) {
      const flatErrors = {};
      for (const issue of issues) {
        if (issue.path) {
          const dotPath = getDotPath(issue);
          if (dotPath) {
            if (!flatErrors.nested) {
              flatErrors.nested = {};
            }
            if (flatErrors.nested[dotPath]) {
              flatErrors.nested[dotPath].push(issue.message);
            } else {
              flatErrors.nested[dotPath] = [issue.message];
            }
          } else {
            if (flatErrors.other) {
              flatErrors.other.push(issue.message);
            } else {
              flatErrors.other = [issue.message];
            }
          }
        } else {
          if (flatErrors.root) {
            flatErrors.root.push(issue.message);
          } else {
            flatErrors.root = [issue.message];
          }
        }
      }
      return flatErrors;
    }
    function forward(action, pathKeys) {
      return {
        ...action,
        _run(dataset, config2) {
          const prevIssues = dataset.issues && [...dataset.issues];
          action._run(dataset, config2);
          if (dataset.issues) {
            for (const issue of dataset.issues) {
              if (!prevIssues?.includes(issue)) {
                let pathInput = dataset.value;
                for (const key of pathKeys) {
                  const pathValue = pathInput[key];
                  const pathItem = {
                    type: "unknown",
                    origin: "value",
                    input: pathInput,
                    key,
                    value: pathValue
                  };
                  if (issue.path) {
                    issue.path.push(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  if (!pathValue) {
                    break;
                  }
                  pathInput = pathValue;
                }
              }
            }
          }
          return dataset;
        }
      };
    }
    function forwardAsync(action, pathKeys) {
      return {
        ...action,
        async: true,
        async _run(dataset, config2) {
          const prevIssues = dataset.issues && [...dataset.issues];
          await action._run(dataset, config2);
          if (dataset.issues) {
            for (const issue of dataset.issues) {
              if (!prevIssues?.includes(issue)) {
                let pathInput = dataset.value;
                for (const key of pathKeys) {
                  const pathValue = pathInput[key];
                  const pathItem = {
                    type: "unknown",
                    origin: "value",
                    input: pathInput,
                    key,
                    value: pathValue
                  };
                  if (issue.path) {
                    issue.path.push(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  if (!pathValue) {
                    break;
                  }
                  pathInput = pathValue;
                }
              }
            }
          }
          return dataset;
        }
      };
    }
    function getDefault(schema, dataset, config2) {
      return typeof schema.default === "function" ? (
        // @ts-expect-error
        schema.default(dataset, config2)
      ) : (
        // @ts-expect-error
        schema.default
      );
    }
    function getDefaults(schema) {
      if ("entries" in schema) {
        const object2 = {};
        for (const key in schema.entries) {
          object2[key] = getDefaults(schema.entries[key]);
        }
        return object2;
      }
      if ("items" in schema) {
        return schema.items.map(getDefaults);
      }
      return getDefault(schema);
    }
    async function getDefaultsAsync(schema) {
      if ("entries" in schema) {
        return Object.fromEntries(
          await Promise.all(
            Object.entries(schema.entries).map(async ([key, value2]) => [
              key,
              await getDefaultsAsync(value2)
            ])
          )
        );
      }
      if ("items" in schema) {
        return Promise.all(schema.items.map(getDefaultsAsync));
      }
      return getDefault(schema);
    }
    function getFallbacks(schema) {
      if ("entries" in schema) {
        const object2 = {};
        for (const key in schema.entries) {
          object2[key] = getFallbacks(schema.entries[key]);
        }
        return object2;
      }
      if ("items" in schema) {
        return schema.items.map(getFallbacks);
      }
      return getFallback(schema);
    }
    async function getFallbacksAsync(schema) {
      if ("entries" in schema) {
        return Object.fromEntries(
          await Promise.all(
            Object.entries(schema.entries).map(async ([key, value2]) => [
              key,
              await getFallbacksAsync(value2)
            ])
          )
        );
      }
      if ("items" in schema) {
        return Promise.all(schema.items.map(getFallbacksAsync));
      }
      return getFallback(schema);
    }
    function is(schema, input) {
      return !schema._run({ typed: false, value: input }, { abortEarly: true }).issues;
    }
    function any() {
      return {
        kind: "schema",
        type: "any",
        reference: any,
        expects: "any",
        async: false,
        _run(dataset) {
          dataset.typed = true;
          return dataset;
        }
      };
    }
    function array(item, message) {
      return {
        kind: "schema",
        type: "array",
        reference: array,
        expects: "Array",
        async: false,
        item,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < input.length; key++) {
              const value2 = input[key];
              const itemDataset = this.item._run({ typed: false, value: value2 }, config2);
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function arrayAsync(item, message) {
      return {
        kind: "schema",
        type: "array",
        reference: arrayAsync,
        expects: "Array",
        async: true,
        item,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const itemDatasets = await Promise.all(
              input.map((value2) => this.item._run({ typed: false, value: value2 }, config2))
            );
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
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function bigint(message) {
      return {
        kind: "schema",
        type: "bigint",
        reference: bigint,
        expects: "bigint",
        async: false,
        message,
        _run(dataset, config2) {
          if (typeof dataset.value === "bigint") {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function blob(message) {
      return {
        kind: "schema",
        type: "blob",
        reference: blob,
        expects: "Blob",
        async: false,
        message,
        _run(dataset, config2) {
          if (dataset.value instanceof Blob) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function boolean(message) {
      return {
        kind: "schema",
        type: "boolean",
        reference: boolean,
        expects: "boolean",
        async: false,
        message,
        _run(dataset, config2) {
          if (typeof dataset.value === "boolean") {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function custom(check2, message) {
      return {
        kind: "schema",
        type: "custom",
        reference: custom,
        expects: "unknown",
        async: false,
        check: check2,
        message,
        _run(dataset, config2) {
          if (this.check(dataset.value)) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function customAsync(check2, message) {
      return {
        kind: "schema",
        type: "custom",
        reference: customAsync,
        expects: "unknown",
        async: true,
        check: check2,
        message,
        async _run(dataset, config2) {
          if (await this.check(dataset.value)) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function date(message) {
      return {
        kind: "schema",
        type: "date",
        reference: date,
        expects: "Date",
        async: false,
        message,
        _run(dataset, config2) {
          if (dataset.value instanceof Date) {
            if (!isNaN(dataset.value)) {
              dataset.typed = true;
            } else {
              _addIssue(this, "type", dataset, config2, {
                received: '"Invalid Date"'
              });
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function enum_(enum__, message) {
      const options = Object.entries(enum__).filter(([key]) => isNaN(+key)).map(([, value2]) => value2);
      return {
        kind: "schema",
        type: "enum",
        reference: enum_,
        expects: _joinExpects(options.map(_stringify), "|"),
        async: false,
        enum: enum__,
        options,
        message,
        _run(dataset, config2) {
          if (this.options.includes(dataset.value)) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function file(message) {
      return {
        kind: "schema",
        type: "file",
        reference: file,
        expects: "File",
        async: false,
        message,
        _run(dataset, config2) {
          if (dataset.value instanceof File) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function function_(message) {
      return {
        kind: "schema",
        type: "function",
        reference: function_,
        expects: "Function",
        async: false,
        message,
        _run(dataset, config2) {
          if (typeof dataset.value === "function") {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function instance(class_, message) {
      return {
        kind: "schema",
        type: "instance",
        reference: instance,
        expects: class_.name,
        async: false,
        class: class_,
        message,
        _run(dataset, config2) {
          if (dataset.value instanceof this.class) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function _merge(value1, value2) {
      if (typeof value1 === typeof value2) {
        if (value1 === value2 || value1 instanceof Date && value2 instanceof Date && +value1 === +value2) {
          return { value: value1 };
        }
        if (value1 && value2 && value1.constructor === Object && value2.constructor === Object) {
          for (const key in value2) {
            if (key in value1) {
              const dataset = _merge(value1[key], value2[key]);
              if (dataset.issue) {
                return dataset;
              }
              value1[key] = dataset.value;
            } else {
              value1[key] = value2[key];
            }
          }
          return { value: value1 };
        }
        if (Array.isArray(value1) && Array.isArray(value2)) {
          if (value1.length === value2.length) {
            for (let index2 = 0; index2 < value1.length; index2++) {
              const dataset = _merge(value1[index2], value2[index2]);
              if (dataset.issue) {
                return dataset;
              }
              value1[index2] = dataset.value;
            }
            return { value: value1 };
          }
        }
      }
      return { issue: true };
    }
    function intersect(options, message) {
      return {
        kind: "schema",
        type: "intersect",
        reference: intersect,
        expects: _joinExpects(
          options.map((option) => option.expects),
          "&"
        ),
        async: false,
        options,
        message,
        _run(dataset, config2) {
          if (this.options.length) {
            const input = dataset.value;
            let outputs;
            dataset.typed = true;
            for (const schema of this.options) {
              const optionDataset = schema._run(
                { typed: false, value: input },
                config2
              );
              if (optionDataset.issues) {
                if (dataset.issues) {
                  dataset.issues.push(...optionDataset.issues);
                } else {
                  dataset.issues = optionDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!optionDataset.typed) {
                dataset.typed = false;
              }
              if (dataset.typed) {
                if (outputs) {
                  outputs.push(optionDataset.value);
                } else {
                  outputs = [optionDataset.value];
                }
              }
            }
            if (dataset.typed) {
              dataset.value = outputs[0];
              for (let index2 = 1; index2 < outputs.length; index2++) {
                const mergeDataset = _merge(dataset.value, outputs[index2]);
                if (mergeDataset.issue) {
                  _addIssue(this, "type", dataset, config2, {
                    received: "unknown"
                  });
                  break;
                }
                dataset.value = mergeDataset.value;
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function intersectAsync(options, message) {
      return {
        kind: "schema",
        type: "intersect",
        reference: intersectAsync,
        expects: _joinExpects(
          options.map((option) => option.expects),
          "&"
        ),
        async: true,
        options,
        message,
        async _run(dataset, config2) {
          if (this.options.length) {
            const input = dataset.value;
            let outputs;
            dataset.typed = true;
            const optionDatasets = await Promise.all(
              this.options.map(
                (schema) => schema._run({ typed: false, value: input }, config2)
              )
            );
            for (const optionDataset of optionDatasets) {
              if (optionDataset.issues) {
                if (dataset.issues) {
                  dataset.issues.push(...optionDataset.issues);
                } else {
                  dataset.issues = optionDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!optionDataset.typed) {
                dataset.typed = false;
              }
              if (dataset.typed) {
                if (outputs) {
                  outputs.push(optionDataset.value);
                } else {
                  outputs = [optionDataset.value];
                }
              }
            }
            if (dataset.typed) {
              dataset.value = outputs[0];
              for (let index2 = 1; index2 < outputs.length; index2++) {
                const mergeDataset = _merge(dataset.value, outputs[index2]);
                if (mergeDataset.issue) {
                  _addIssue(this, "type", dataset, config2, {
                    received: "unknown"
                  });
                  break;
                }
                dataset.value = mergeDataset.value;
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function lazy(getter) {
      return {
        kind: "schema",
        type: "lazy",
        reference: lazy,
        expects: "unknown",
        async: false,
        getter,
        _run(dataset, config2) {
          return this.getter(dataset.value)._run(dataset, config2);
        }
      };
    }
    function lazyAsync(getter) {
      return {
        kind: "schema",
        type: "lazy",
        reference: lazyAsync,
        expects: "unknown",
        async: true,
        getter,
        async _run(dataset, config2) {
          return (await this.getter(dataset.value))._run(dataset, config2);
        }
      };
    }
    function literal(literal_, message) {
      return {
        kind: "schema",
        type: "literal",
        reference: literal,
        expects: _stringify(literal_),
        async: false,
        literal: literal_,
        message,
        _run(dataset, config2) {
          if (dataset.value === this.literal) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function looseObject(entries, message) {
      return {
        kind: "schema",
        type: "loose_object",
        reference: looseObject,
        expects: "Object",
        async: false,
        entries,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const key in this.entries) {
              const value2 = input[key];
              const valueDataset = this.entries[key]._run(
                { typed: false, value: value2 },
                config2
              );
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              if (valueDataset.value !== void 0 || key in input) {
                dataset.value[key] = valueDataset.value;
              }
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (const key in input) {
                if (_isValidObjectKey(input, key) && !(key in this.entries)) {
                  dataset.value[key] = input[key];
                }
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function looseObjectAsync(entries, message) {
      return {
        kind: "schema",
        type: "loose_object",
        reference: looseObjectAsync,
        expects: "Object",
        async: true,
        entries,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const valueDatasets = await Promise.all(
              Object.entries(this.entries).map(async ([key, schema]) => {
                const value2 = input[key];
                return [
                  key,
                  value2,
                  await schema._run({ typed: false, value: value2 }, config2)
                ];
              })
            );
            for (const [key, value2, valueDataset] of valueDatasets) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              if (valueDataset.value !== void 0 || key in input) {
                dataset.value[key] = valueDataset.value;
              }
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (const key in input) {
                if (_isValidObjectKey(input, key) && !(key in this.entries)) {
                  dataset.value[key] = input[key];
                }
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function looseTuple(items, message) {
      return {
        kind: "schema",
        type: "loose_tuple",
        reference: looseTuple,
        expects: "Array",
        async: false,
        items,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < this.items.length; key++) {
              const value2 = input[key];
              const itemDataset = this.items[key]._run(
                { typed: false, value: value2 },
                config2
              );
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (let key = this.items.length; key < input.length; key++) {
                dataset.value.push(input[key]);
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function looseTupleAsync(items, message) {
      return {
        kind: "schema",
        type: "loose_tuple",
        reference: looseTupleAsync,
        expects: "Array",
        async: true,
        items,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const itemDatasets = await Promise.all(
              this.items.map(async (item, key) => {
                const value2 = input[key];
                return [
                  key,
                  value2,
                  await item._run({ typed: false, value: value2 }, config2)
                ];
              })
            );
            for (const [key, value2, itemDataset] of itemDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (let key = this.items.length; key < input.length; key++) {
                dataset.value.push(input[key]);
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function map(key, value2, message) {
      return {
        kind: "schema",
        type: "map",
        reference: map,
        expects: "Map",
        async: false,
        key,
        value: value2,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (input instanceof Map) {
            dataset.typed = true;
            dataset.value = /* @__PURE__ */ new Map();
            for (const [inputKey, inputValue] of input) {
              const keyDataset = this.key._run(
                { typed: false, value: inputKey },
                config2
              );
              if (keyDataset.issues) {
                const pathItem = {
                  type: "map",
                  origin: "key",
                  input,
                  key: inputKey,
                  value: inputValue
                };
                for (const issue of keyDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = keyDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              const valueDataset = this.value._run(
                { typed: false, value: inputValue },
                config2
              );
              if (valueDataset.issues) {
                const pathItem = {
                  type: "map",
                  origin: "value",
                  input,
                  key: inputKey,
                  value: inputValue
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!keyDataset.typed || !valueDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.set(keyDataset.value, valueDataset.value);
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function mapAsync(key, value2, message) {
      return {
        kind: "schema",
        type: "map",
        reference: mapAsync,
        expects: "Map",
        async: true,
        key,
        value: value2,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (input instanceof Map) {
            dataset.typed = true;
            dataset.value = /* @__PURE__ */ new Map();
            const datasets = await Promise.all(
              [...input].map(
                ([inputKey, inputValue]) => Promise.all([
                  inputKey,
                  inputValue,
                  this.key._run({ typed: false, value: inputKey }, config2),
                  this.value._run({ typed: false, value: inputValue }, config2)
                ])
              )
            );
            for (const [
              inputKey,
              inputValue,
              keyDataset,
              valueDataset
            ] of datasets) {
              if (keyDataset.issues) {
                const pathItem = {
                  type: "map",
                  origin: "key",
                  input,
                  key: inputKey,
                  value: inputValue
                };
                for (const issue of keyDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = keyDataset.issues;
                }
                if (config2.abortEarly) {
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
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!keyDataset.typed || !valueDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.set(keyDataset.value, valueDataset.value);
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function nan(message) {
      return {
        kind: "schema",
        type: "nan",
        reference: nan,
        expects: "NaN",
        async: false,
        message,
        _run(dataset, config2) {
          if (Number.isNaN(dataset.value)) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function never(message) {
      return {
        kind: "schema",
        type: "never",
        reference: never,
        expects: "never",
        async: false,
        message,
        _run(dataset, config2) {
          _addIssue(this, "type", dataset, config2);
          return dataset;
        }
      };
    }
    function nonNullable(wrapped, message) {
      return {
        kind: "schema",
        type: "non_nullable",
        reference: nonNullable,
        expects: "!null",
        async: false,
        wrapped,
        message,
        _run(dataset, config2) {
          if (dataset.value === null) {
            _addIssue(this, "type", dataset, config2);
            return dataset;
          }
          return this.wrapped._run(dataset, config2);
        }
      };
    }
    function nonNullableAsync(wrapped, message) {
      return {
        kind: "schema",
        type: "non_nullable",
        reference: nonNullableAsync,
        expects: "!null",
        async: true,
        wrapped,
        message,
        async _run(dataset, config2) {
          if (dataset.value === null) {
            _addIssue(this, "type", dataset, config2);
            return dataset;
          }
          return this.wrapped._run(dataset, config2);
        }
      };
    }
    function nonNullish(wrapped, message) {
      return {
        kind: "schema",
        type: "non_nullish",
        reference: nonNullish,
        expects: "(!null & !undefined)",
        async: false,
        wrapped,
        message,
        _run(dataset, config2) {
          if (dataset.value === null || dataset.value === void 0) {
            _addIssue(this, "type", dataset, config2);
            return dataset;
          }
          return this.wrapped._run(dataset, config2);
        }
      };
    }
    function nonNullishAsync(wrapped, message) {
      return {
        kind: "schema",
        type: "non_nullish",
        reference: nonNullishAsync,
        expects: "(!null & !undefined)",
        async: true,
        wrapped,
        message,
        async _run(dataset, config2) {
          if (dataset.value === null || dataset.value === void 0) {
            _addIssue(this, "type", dataset, config2);
            return dataset;
          }
          return this.wrapped._run(dataset, config2);
        }
      };
    }
    function nonOptional(wrapped, message) {
      return {
        kind: "schema",
        type: "non_optional",
        reference: nonOptional,
        expects: "!undefined",
        async: false,
        wrapped,
        message,
        _run(dataset, config2) {
          if (dataset.value === void 0) {
            _addIssue(this, "type", dataset, config2);
            return dataset;
          }
          return this.wrapped._run(dataset, config2);
        }
      };
    }
    function nonOptionalAsync(wrapped, message) {
      return {
        kind: "schema",
        type: "non_optional",
        reference: nonOptionalAsync,
        expects: "!undefined",
        async: true,
        wrapped,
        message,
        async _run(dataset, config2) {
          if (dataset.value === void 0) {
            _addIssue(this, "type", dataset, config2);
            return dataset;
          }
          return this.wrapped._run(dataset, config2);
        }
      };
    }
    function null_(message) {
      return {
        kind: "schema",
        type: "null",
        reference: null_,
        expects: "null",
        async: false,
        message,
        _run(dataset, config2) {
          if (dataset.value === null) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function nullable(wrapped, ...args) {
      const schema = {
        kind: "schema",
        type: "nullable",
        reference: nullable,
        expects: `(${wrapped.expects} | null)`,
        async: false,
        wrapped,
        _run(dataset, config2) {
          if (dataset.value === null) {
            if ("default" in this) {
              dataset.value = getDefault(
                this,
                dataset,
                config2
              );
            }
            if (dataset.value === null) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped._run(dataset, config2);
        }
      };
      if (0 in args) {
        schema.default = args[0];
      }
      return schema;
    }
    function nullableAsync(wrapped, ...args) {
      const schema = {
        kind: "schema",
        type: "nullable",
        reference: nullableAsync,
        expects: `(${wrapped.expects} | null)`,
        async: true,
        wrapped,
        async _run(dataset, config2) {
          if (dataset.value === null) {
            if ("default" in this) {
              dataset.value = await getDefault(
                this,
                dataset,
                config2
              );
            }
            if (dataset.value === null) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped._run(dataset, config2);
        }
      };
      if (0 in args) {
        schema.default = args[0];
      }
      return schema;
    }
    function nullish(wrapped, ...args) {
      const schema = {
        kind: "schema",
        type: "nullish",
        reference: nullish,
        expects: `(${wrapped.expects} | null | undefined)`,
        async: false,
        wrapped,
        _run(dataset, config2) {
          if (dataset.value === null || dataset.value === void 0) {
            if ("default" in this) {
              dataset.value = getDefault(
                this,
                dataset,
                config2
              );
            }
            if (dataset.value === null || dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped._run(dataset, config2);
        }
      };
      if (0 in args) {
        schema.default = args[0];
      }
      return schema;
    }
    function nullishAsync(wrapped, ...args) {
      const schema = {
        kind: "schema",
        type: "nullish",
        reference: nullishAsync,
        expects: `(${wrapped.expects} | null | undefined)`,
        async: true,
        wrapped,
        async _run(dataset, config2) {
          if (dataset.value === null || dataset.value === void 0) {
            if ("default" in this) {
              dataset.value = await getDefault(
                this,
                dataset,
                config2
              );
            }
            if (dataset.value === null || dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped._run(dataset, config2);
        }
      };
      if (0 in args) {
        schema.default = args[0];
      }
      return schema;
    }
    function number(message) {
      return {
        kind: "schema",
        type: "number",
        reference: number,
        expects: "number",
        async: false,
        message,
        _run(dataset, config2) {
          if (typeof dataset.value === "number" && !isNaN(dataset.value)) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function object(entries, message) {
      return {
        kind: "schema",
        type: "object",
        reference: object,
        expects: "Object",
        async: false,
        entries,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const key in this.entries) {
              const value2 = input[key];
              const valueDataset = this.entries[key]._run(
                { typed: false, value: value2 },
                config2
              );
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              if (valueDataset.value !== void 0 || key in input) {
                dataset.value[key] = valueDataset.value;
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function objectAsync(entries, message) {
      return {
        kind: "schema",
        type: "object",
        reference: objectAsync,
        expects: "Object",
        async: true,
        entries,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const valueDatasets = await Promise.all(
              Object.entries(this.entries).map(async ([key, schema]) => {
                const value2 = input[key];
                return [
                  key,
                  value2,
                  await schema._run({ typed: false, value: value2 }, config2)
                ];
              })
            );
            for (const [key, value2, valueDataset] of valueDatasets) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              if (valueDataset.value !== void 0 || key in input) {
                dataset.value[key] = valueDataset.value;
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function objectWithRest(entries, rest, message) {
      return {
        kind: "schema",
        type: "object_with_rest",
        reference: objectWithRest,
        expects: "Object",
        async: false,
        entries,
        rest,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const key in this.entries) {
              const value2 = input[key];
              const valueDataset = this.entries[key]._run(
                { typed: false, value: value2 },
                config2
              );
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              if (valueDataset.value !== void 0 || key in input) {
                dataset.value[key] = valueDataset.value;
              }
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (const key in input) {
                if (_isValidObjectKey(input, key) && !(key in this.entries)) {
                  const value2 = input[key];
                  const valueDataset = this.rest._run(
                    { typed: false, value: value2 },
                    config2
                  );
                  if (valueDataset.issues) {
                    const pathItem = {
                      type: "object",
                      origin: "value",
                      input,
                      key,
                      value: value2
                    };
                    for (const issue of valueDataset.issues) {
                      if (issue.path) {
                        issue.path.unshift(pathItem);
                      } else {
                        issue.path = [pathItem];
                      }
                      dataset.issues?.push(issue);
                    }
                    if (!dataset.issues) {
                      dataset.issues = valueDataset.issues;
                    }
                    if (config2.abortEarly) {
                      dataset.typed = false;
                      break;
                    }
                  }
                  if (!valueDataset.typed) {
                    dataset.typed = false;
                  }
                  dataset.value[key] = valueDataset.value;
                }
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function objectWithRestAsync(entries, rest, message) {
      return {
        kind: "schema",
        type: "object_with_rest",
        reference: objectWithRestAsync,
        expects: "Object",
        async: true,
        entries,
        rest,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const [normalDatasets, restDatasets] = await Promise.all([
              // Parse schema of each normal entry
              // Hint: We do not distinguish between missing and `undefined` entries.
              // The reason for this decision is that it reduces the bundle size, and
              // we also expect that most users will expect this behavior.
              Promise.all(
                Object.entries(this.entries).map(async ([key, schema]) => {
                  const value2 = input[key];
                  return [
                    key,
                    value2,
                    await schema._run({ typed: false, value: value2 }, config2)
                  ];
                })
              ),
              // Parse other entries with rest schema
              // Hint: We exclude specific keys for security reasons
              Promise.all(
                Object.entries(input).filter(
                  ([key]) => _isValidObjectKey(input, key) && !(key in this.entries)
                ).map(
                  async ([key, value2]) => [
                    key,
                    value2,
                    await this.rest._run({ typed: false, value: value2 }, config2)
                  ]
                )
              )
            ]);
            for (const [key, value2, valueDataset] of normalDatasets) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              if (valueDataset.value !== void 0 || key in input) {
                dataset.value[key] = valueDataset.value;
              }
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (const [key, value2, valueDataset] of restDatasets) {
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key,
                    value: value2
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) {
                      issue.path.unshift(pathItem);
                    } else {
                      issue.path = [pathItem];
                    }
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) {
                    dataset.issues = valueDataset.issues;
                  }
                  if (config2.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!valueDataset.typed) {
                  dataset.typed = false;
                }
                dataset.value[key] = valueDataset.value;
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function optional(wrapped, ...args) {
      const schema = {
        kind: "schema",
        type: "optional",
        reference: optional,
        expects: `(${wrapped.expects} | undefined)`,
        async: false,
        wrapped,
        _run(dataset, config2) {
          if (dataset.value === void 0) {
            if ("default" in this) {
              dataset.value = getDefault(
                this,
                dataset,
                config2
              );
            }
            if (dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped._run(dataset, config2);
        }
      };
      if (0 in args) {
        schema.default = args[0];
      }
      return schema;
    }
    function optionalAsync(wrapped, ...args) {
      const schema = {
        kind: "schema",
        type: "optional",
        reference: optionalAsync,
        expects: `(${wrapped.expects} | undefined)`,
        async: true,
        wrapped,
        async _run(dataset, config2) {
          if (dataset.value === void 0) {
            if ("default" in this) {
              dataset.value = await getDefault(
                this,
                dataset,
                config2
              );
            }
            if (dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped._run(dataset, config2);
        }
      };
      if (0 in args) {
        schema.default = args[0];
      }
      return schema;
    }
    function picklist(options, message) {
      return {
        kind: "schema",
        type: "picklist",
        reference: picklist,
        expects: _joinExpects(options.map(_stringify), "|"),
        async: false,
        options,
        message,
        _run(dataset, config2) {
          if (this.options.includes(dataset.value)) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function promise(message) {
      return {
        kind: "schema",
        type: "promise",
        reference: promise,
        expects: "Promise",
        async: false,
        message,
        _run(dataset, config2) {
          if (dataset.value instanceof Promise) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function record(key, value2, message) {
      return {
        kind: "schema",
        type: "record",
        reference: record,
        expects: "Object",
        async: false,
        key,
        value: value2,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const entryKey in input) {
              if (_isValidObjectKey(input, entryKey)) {
                const entryValue = input[entryKey];
                const keyDataset = this.key._run(
                  { typed: false, value: entryKey },
                  config2
                );
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
                  if (!dataset.issues) {
                    dataset.issues = keyDataset.issues;
                  }
                  if (config2.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                const valueDataset = this.value._run(
                  { typed: false, value: entryValue },
                  config2
                );
                if (valueDataset.issues) {
                  const pathItem = {
                    type: "object",
                    origin: "value",
                    input,
                    key: entryKey,
                    value: entryValue
                  };
                  for (const issue of valueDataset.issues) {
                    if (issue.path) {
                      issue.path.unshift(pathItem);
                    } else {
                      issue.path = [pathItem];
                    }
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) {
                    dataset.issues = valueDataset.issues;
                  }
                  if (config2.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!keyDataset.typed || !valueDataset.typed) {
                  dataset.typed = false;
                }
                if (keyDataset.typed) {
                  dataset.value[keyDataset.value] = valueDataset.value;
                }
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function recordAsync(key, value2, message) {
      return {
        kind: "schema",
        type: "record",
        reference: recordAsync,
        expects: "Object",
        async: true,
        key,
        value: value2,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const datasets = await Promise.all(
              Object.entries(input).filter(([key2]) => _isValidObjectKey(input, key2)).map(
                ([entryKey, entryValue]) => Promise.all([
                  entryKey,
                  entryValue,
                  this.key._run({ typed: false, value: entryKey }, config2),
                  this.value._run({ typed: false, value: entryValue }, config2)
                ])
              )
            );
            for (const [
              entryKey,
              entryValue,
              keyDataset,
              valueDataset
            ] of datasets) {
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
                if (!dataset.issues) {
                  dataset.issues = keyDataset.issues;
                }
                if (config2.abortEarly) {
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
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!keyDataset.typed || !valueDataset.typed) {
                dataset.typed = false;
              }
              if (keyDataset.typed) {
                dataset.value[keyDataset.value] = valueDataset.value;
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function set(value2, message) {
      return {
        kind: "schema",
        type: "set",
        reference: set,
        expects: "Set",
        async: false,
        value: value2,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (input instanceof Set) {
            dataset.typed = true;
            dataset.value = /* @__PURE__ */ new Set();
            for (const inputValue of input) {
              const valueDataset = this.value._run(
                { typed: false, value: inputValue },
                config2
              );
              if (valueDataset.issues) {
                const pathItem = {
                  type: "set",
                  origin: "value",
                  input,
                  key: null,
                  value: inputValue
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.add(valueDataset.value);
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function setAsync(value2, message) {
      return {
        kind: "schema",
        type: "set",
        reference: setAsync,
        expects: "Set",
        async: true,
        value: value2,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (input instanceof Set) {
            dataset.typed = true;
            dataset.value = /* @__PURE__ */ new Set();
            const valueDatasets = await Promise.all(
              [...input].map(
                async (inputValue) => [
                  inputValue,
                  await this.value._run(
                    { typed: false, value: inputValue },
                    config2
                  )
                ]
              )
            );
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
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.add(valueDataset.value);
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function strictObject(entries, message) {
      return {
        kind: "schema",
        type: "strict_object",
        reference: strictObject,
        expects: "Object",
        async: false,
        entries,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            for (const key in this.entries) {
              const value2 = input[key];
              const valueDataset = this.entries[key]._run(
                { typed: false, value: value2 },
                config2
              );
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              if (valueDataset.value !== void 0 || key in input) {
                dataset.value[key] = valueDataset.value;
              }
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (const key in input) {
                if (!(key in this.entries)) {
                  const value2 = input[key];
                  _addIssue(this, "type", dataset, config2, {
                    input: value2,
                    expected: "never",
                    path: [
                      {
                        type: "object",
                        origin: "value",
                        input,
                        key,
                        value: value2
                      }
                    ]
                  });
                  break;
                }
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function strictObjectAsync(entries, message) {
      return {
        kind: "schema",
        type: "strict_object",
        reference: strictObjectAsync,
        expects: "Object",
        async: true,
        entries,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            dataset.typed = true;
            dataset.value = {};
            const valueDatasets = await Promise.all(
              Object.entries(this.entries).map(async ([key, schema]) => {
                const value2 = input[key];
                return [
                  key,
                  value2,
                  await schema._run({ typed: false, value: value2 }, config2)
                ];
              })
            );
            for (const [key, value2, valueDataset] of valueDatasets) {
              if (valueDataset.issues) {
                const pathItem = {
                  type: "object",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of valueDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = valueDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!valueDataset.typed) {
                dataset.typed = false;
              }
              if (valueDataset.value !== void 0 || key in input) {
                dataset.value[key] = valueDataset.value;
              }
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (const key in input) {
                if (!(key in this.entries)) {
                  const value2 = input[key];
                  _addIssue(this, "type", dataset, config2, {
                    input: value2,
                    expected: "never",
                    path: [
                      {
                        type: "object",
                        origin: "value",
                        input,
                        key,
                        value: value2
                      }
                    ]
                  });
                  break;
                }
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function strictTuple(items, message) {
      return {
        kind: "schema",
        type: "strict_tuple",
        reference: strictTuple,
        expects: "Array",
        async: false,
        items,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < this.items.length; key++) {
              const value2 = input[key];
              const itemDataset = this.items[key]._run(
                { typed: false, value: value2 },
                config2
              );
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
            if (!(dataset.issues && config2.abortEarly) && this.items.length < input.length) {
              const value2 = input[items.length];
              _addIssue(this, "type", dataset, config2, {
                input: value2,
                expected: "never",
                path: [
                  {
                    type: "array",
                    origin: "value",
                    input,
                    key: this.items.length,
                    value: value2
                  }
                ]
              });
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function strictTupleAsync(items, message) {
      return {
        kind: "schema",
        type: "strict_tuple",
        reference: strictTupleAsync,
        expects: "Array",
        async: true,
        items,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const itemDatasets = await Promise.all(
              this.items.map(async (item, key) => {
                const value2 = input[key];
                return [
                  key,
                  value2,
                  await item._run({ typed: false, value: value2 }, config2)
                ];
              })
            );
            for (const [key, value2, itemDataset] of itemDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
            if (!(dataset.issues && config2.abortEarly) && this.items.length < input.length) {
              const value2 = input[items.length];
              _addIssue(this, "type", dataset, config2, {
                input: value2,
                expected: "never",
                path: [
                  {
                    type: "array",
                    origin: "value",
                    input,
                    key: this.items.length,
                    value: value2
                  }
                ]
              });
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function string(message) {
      return {
        kind: "schema",
        type: "string",
        reference: string,
        expects: "string",
        async: false,
        message,
        _run(dataset, config2) {
          if (typeof dataset.value === "string") {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function symbol(message) {
      return {
        kind: "schema",
        type: "symbol",
        reference: symbol,
        expects: "symbol",
        async: false,
        message,
        _run(dataset, config2) {
          if (typeof dataset.value === "symbol") {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function tuple(items, message) {
      return {
        kind: "schema",
        type: "tuple",
        reference: tuple,
        expects: "Array",
        async: false,
        items,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < this.items.length; key++) {
              const value2 = input[key];
              const itemDataset = this.items[key]._run(
                { typed: false, value: value2 },
                config2
              );
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function tupleAsync(items, message) {
      return {
        kind: "schema",
        type: "tuple",
        reference: tupleAsync,
        expects: "Array",
        async: true,
        items,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const itemDatasets = await Promise.all(
              this.items.map(async (item, key) => {
                const value2 = input[key];
                return [
                  key,
                  value2,
                  await item._run({ typed: false, value: value2 }, config2)
                ];
              })
            );
            for (const [key, value2, itemDataset] of itemDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function tupleWithRest(items, rest, message) {
      return {
        kind: "schema",
        type: "tuple_with_rest",
        reference: tupleWithRest,
        expects: "Array",
        async: false,
        items,
        rest,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            for (let key = 0; key < this.items.length; key++) {
              const value2 = input[key];
              const itemDataset = this.items[key]._run(
                { typed: false, value: value2 },
                config2
              );
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (let key = this.items.length; key < input.length; key++) {
                const value2 = input[key];
                const itemDataset = this.rest._run({ typed: false, value: value2 }, config2);
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value2
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) {
                      issue.path.unshift(pathItem);
                    } else {
                      issue.path = [pathItem];
                    }
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) {
                    dataset.issues = itemDataset.issues;
                  }
                  if (config2.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) {
                  dataset.typed = false;
                }
                dataset.value.push(itemDataset.value);
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function tupleWithRestAsync(items, rest, message) {
      return {
        kind: "schema",
        type: "tuple_with_rest",
        reference: tupleWithRestAsync,
        expects: "Array",
        async: true,
        items,
        rest,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (Array.isArray(input)) {
            dataset.typed = true;
            dataset.value = [];
            const [normalDatasets, restDatasets] = await Promise.all([
              // Parse schema of each normal item
              Promise.all(
                this.items.map(async (item, key) => {
                  const value2 = input[key];
                  return [
                    key,
                    value2,
                    await item._run({ typed: false, value: value2 }, config2)
                  ];
                })
              ),
              // Parse other items with rest schema
              Promise.all(
                input.slice(this.items.length).map(async (value2, key) => {
                  return [
                    key + this.items.length,
                    value2,
                    await this.rest._run({ typed: false, value: value2 }, config2)
                  ];
                })
              )
            ]);
            for (const [key, value2, itemDataset] of normalDatasets) {
              if (itemDataset.issues) {
                const pathItem = {
                  type: "array",
                  origin: "value",
                  input,
                  key,
                  value: value2
                };
                for (const issue of itemDataset.issues) {
                  if (issue.path) {
                    issue.path.unshift(pathItem);
                  } else {
                    issue.path = [pathItem];
                  }
                  dataset.issues?.push(issue);
                }
                if (!dataset.issues) {
                  dataset.issues = itemDataset.issues;
                }
                if (config2.abortEarly) {
                  dataset.typed = false;
                  break;
                }
              }
              if (!itemDataset.typed) {
                dataset.typed = false;
              }
              dataset.value.push(itemDataset.value);
            }
            if (!dataset.issues || !config2.abortEarly) {
              for (const [key, value2, itemDataset] of restDatasets) {
                if (itemDataset.issues) {
                  const pathItem = {
                    type: "array",
                    origin: "value",
                    input,
                    key,
                    value: value2
                  };
                  for (const issue of itemDataset.issues) {
                    if (issue.path) {
                      issue.path.unshift(pathItem);
                    } else {
                      issue.path = [pathItem];
                    }
                    dataset.issues?.push(issue);
                  }
                  if (!dataset.issues) {
                    dataset.issues = itemDataset.issues;
                  }
                  if (config2.abortEarly) {
                    dataset.typed = false;
                    break;
                  }
                }
                if (!itemDataset.typed) {
                  dataset.typed = false;
                }
                dataset.value.push(itemDataset.value);
              }
            }
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function undefined_(message) {
      return {
        kind: "schema",
        type: "undefined",
        reference: undefined_,
        expects: "undefined",
        async: false,
        message,
        _run(dataset, config2) {
          if (dataset.value === void 0) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function undefinedable(wrapped, ...args) {
      const schema = {
        kind: "schema",
        type: "undefinedable",
        reference: undefinedable,
        expects: `(${wrapped.expects} | undefined)`,
        async: false,
        wrapped,
        _run(dataset, config2) {
          if (dataset.value === void 0) {
            if ("default" in this) {
              dataset.value = getDefault(
                this,
                dataset,
                config2
              );
            }
            if (dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped._run(dataset, config2);
        }
      };
      if (0 in args) {
        schema.default = args[0];
      }
      return schema;
    }
    function undefinedableAsync(wrapped, ...args) {
      const schema = {
        kind: "schema",
        type: "undefinedable",
        reference: undefinedableAsync,
        expects: `(${wrapped.expects} | undefined)`,
        async: true,
        wrapped,
        async _run(dataset, config2) {
          if (dataset.value === void 0) {
            if ("default" in this) {
              dataset.value = await getDefault(
                this,
                dataset,
                config2
              );
            }
            if (dataset.value === void 0) {
              dataset.typed = true;
              return dataset;
            }
          }
          return this.wrapped._run(dataset, config2);
        }
      };
      if (0 in args) {
        schema.default = args[0];
      }
      return schema;
    }
    function _subIssues(datasets) {
      let issues;
      if (datasets) {
        for (const dataset of datasets) {
          if (issues) {
            issues.push(...dataset.issues);
          } else {
            issues = dataset.issues;
          }
        }
      }
      return issues;
    }
    function union(options, message) {
      return {
        kind: "schema",
        type: "union",
        reference: union,
        expects: _joinExpects(
          options.map((option) => option.expects),
          "|"
        ),
        async: false,
        options,
        message,
        _run(dataset, config2) {
          let validDataset;
          let typedDatasets;
          let untypedDatasets;
          for (const schema of this.options) {
            const optionDataset = schema._run(
              { typed: false, value: dataset.value },
              config2
            );
            if (optionDataset.typed) {
              if (optionDataset.issues) {
                if (typedDatasets) {
                  typedDatasets.push(optionDataset);
                } else {
                  typedDatasets = [optionDataset];
                }
              } else {
                validDataset = optionDataset;
                break;
              }
            } else {
              if (untypedDatasets) {
                untypedDatasets.push(optionDataset);
              } else {
                untypedDatasets = [optionDataset];
              }
            }
          }
          if (validDataset) {
            return validDataset;
          }
          if (typedDatasets) {
            if (typedDatasets.length === 1) {
              return typedDatasets[0];
            }
            _addIssue(this, "type", dataset, config2, {
              issues: _subIssues(typedDatasets)
            });
            dataset.typed = true;
          } else if (untypedDatasets?.length === 1) {
            return untypedDatasets[0];
          } else {
            _addIssue(this, "type", dataset, config2, {
              issues: _subIssues(untypedDatasets)
            });
          }
          return dataset;
        }
      };
    }
    function unionAsync(options, message) {
      return {
        kind: "schema",
        type: "union",
        reference: unionAsync,
        expects: _joinExpects(
          options.map((option) => option.expects),
          "|"
        ),
        async: true,
        options,
        message,
        async _run(dataset, config2) {
          let validDataset;
          let typedDatasets;
          let untypedDatasets;
          for (const schema of this.options) {
            const optionDataset = await schema._run(
              { typed: false, value: dataset.value },
              config2
            );
            if (optionDataset.typed) {
              if (optionDataset.issues) {
                if (typedDatasets) {
                  typedDatasets.push(optionDataset);
                } else {
                  typedDatasets = [optionDataset];
                }
              } else {
                validDataset = optionDataset;
                break;
              }
            } else {
              if (untypedDatasets) {
                untypedDatasets.push(optionDataset);
              } else {
                untypedDatasets = [optionDataset];
              }
            }
          }
          if (validDataset) {
            return validDataset;
          }
          if (typedDatasets) {
            if (typedDatasets.length === 1) {
              return typedDatasets[0];
            }
            _addIssue(this, "type", dataset, config2, {
              issues: _subIssues(typedDatasets)
            });
            dataset.typed = true;
          } else if (untypedDatasets?.length === 1) {
            return untypedDatasets[0];
          } else {
            _addIssue(this, "type", dataset, config2, {
              issues: _subIssues(untypedDatasets)
            });
          }
          return dataset;
        }
      };
    }
    function unknown() {
      return {
        kind: "schema",
        type: "unknown",
        reference: unknown,
        expects: "unknown",
        async: false,
        _run(dataset) {
          dataset.typed = true;
          return dataset;
        }
      };
    }
    function variant(key, options, message) {
      return {
        kind: "schema",
        type: "variant",
        reference: variant,
        expects: "Object",
        async: false,
        key,
        options,
        message,
        _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            let outputDataset;
            let maxDiscriminatorPriority = 0;
            let invalidDiscriminatorKey = this.key;
            let expectedDiscriminators = [];
            const parseOptions = (variant2, allKeys) => {
              for (const schema of variant2.options) {
                if (schema.type === "variant") {
                  parseOptions(schema, new Set(allKeys).add(schema.key));
                } else {
                  let keysAreValid = true;
                  let currentPriority = 0;
                  for (const currentKey of allKeys) {
                    if (schema.entries[currentKey]._run(
                      // @ts-expect-error
                      { typed: false, value: input[currentKey] },
                      config2
                    ).issues) {
                      keysAreValid = false;
                      if (invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input))) {
                        maxDiscriminatorPriority = currentPriority;
                        invalidDiscriminatorKey = currentKey;
                        expectedDiscriminators = [];
                      }
                      if (invalidDiscriminatorKey === currentKey) {
                        expectedDiscriminators.push(
                          schema.entries[currentKey].expects
                        );
                      }
                      break;
                    }
                    currentPriority++;
                  }
                  if (keysAreValid) {
                    const optionDataset = schema._run(
                      { typed: false, value: input },
                      config2
                    );
                    if (!outputDataset || !outputDataset.typed && optionDataset.typed) {
                      outputDataset = optionDataset;
                    }
                  }
                }
                if (outputDataset && !outputDataset.issues) {
                  break;
                }
              }
            };
            parseOptions(this, /* @__PURE__ */ new Set([this.key]));
            if (outputDataset) {
              return outputDataset;
            }
            _addIssue(this, "type", dataset, config2, {
              // @ts-expect-error
              input: input[invalidDiscriminatorKey],
              expected: _joinExpects(expectedDiscriminators, "|"),
              path: [
                {
                  type: "object",
                  origin: "value",
                  input,
                  key: invalidDiscriminatorKey,
                  // @ts-expect-error
                  value: input[invalidDiscriminatorKey]
                }
              ]
            });
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function variantAsync(key, options, message) {
      return {
        kind: "schema",
        type: "variant",
        reference: variantAsync,
        expects: "Object",
        async: true,
        key,
        options,
        message,
        async _run(dataset, config2) {
          const input = dataset.value;
          if (input && typeof input === "object") {
            let outputDataset;
            let maxDiscriminatorPriority = 0;
            let invalidDiscriminatorKey = this.key;
            let expectedDiscriminators = [];
            const parseOptions = async (variant2, allKeys) => {
              for (const schema of variant2.options) {
                if (schema.type === "variant") {
                  await parseOptions(schema, new Set(allKeys).add(schema.key));
                } else {
                  let keysAreValid = true;
                  let currentPriority = 0;
                  for (const currentKey of allKeys) {
                    if ((await schema.entries[currentKey]._run(
                      // @ts-expect-error
                      { typed: false, value: input[currentKey] },
                      config2
                    )).issues) {
                      keysAreValid = false;
                      if (invalidDiscriminatorKey !== currentKey && (maxDiscriminatorPriority < currentPriority || maxDiscriminatorPriority === currentPriority && currentKey in input && !(invalidDiscriminatorKey in input))) {
                        maxDiscriminatorPriority = currentPriority;
                        invalidDiscriminatorKey = currentKey;
                        expectedDiscriminators = [];
                      }
                      if (invalidDiscriminatorKey === currentKey) {
                        expectedDiscriminators.push(
                          schema.entries[currentKey].expects
                        );
                      }
                      break;
                    }
                    currentPriority++;
                  }
                  if (keysAreValid) {
                    const optionDataset = await schema._run(
                      { typed: false, value: input },
                      config2
                    );
                    if (!outputDataset || !outputDataset.typed && optionDataset.typed) {
                      outputDataset = optionDataset;
                    }
                  }
                }
                if (outputDataset && !outputDataset.issues) {
                  break;
                }
              }
            };
            await parseOptions(this, /* @__PURE__ */ new Set([this.key]));
            if (outputDataset) {
              return outputDataset;
            }
            _addIssue(this, "type", dataset, config2, {
              // @ts-expect-error
              input: input[invalidDiscriminatorKey],
              expected: _joinExpects(expectedDiscriminators, "|"),
              path: [
                {
                  type: "object",
                  origin: "value",
                  input,
                  key: invalidDiscriminatorKey,
                  // @ts-expect-error
                  value: input[invalidDiscriminatorKey]
                }
              ]
            });
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function void_(message) {
      return {
        kind: "schema",
        type: "void",
        reference: void_,
        expects: "void",
        async: false,
        message,
        _run(dataset, config2) {
          if (dataset.value === void 0) {
            dataset.typed = true;
          } else {
            _addIssue(this, "type", dataset, config2);
          }
          return dataset;
        }
      };
    }
    function keyof(schema, message) {
      return picklist(Object.keys(schema.entries), message);
    }
    function omit(schema, keys) {
      const entries = {
        ...schema.entries
      };
      for (const key of keys) {
        delete entries[key];
      }
      return { ...schema, entries };
    }
    function parse(schema, input, config2) {
      const dataset = schema._run(
        { typed: false, value: input },
        getGlobalConfig(config2)
      );
      if (dataset.issues) {
        throw new ValiError(dataset.issues);
      }
      return dataset.value;
    }
    async function parseAsync(schema, input, config2) {
      const dataset = await schema._run(
        { typed: false, value: input },
        getGlobalConfig(config2)
      );
      if (dataset.issues) {
        throw new ValiError(dataset.issues);
      }
      return dataset.value;
    }
    function parser(schema, config2) {
      const func = (input) => parse(schema, input, config2);
      func.schema = schema;
      func.config = config2;
      return func;
    }
    function parserAsync(schema, config2) {
      const func = (input) => parseAsync(schema, input, config2);
      func.schema = schema;
      func.config = config2;
      return func;
    }
    function partial(schema, keys) {
      const entries = {};
      for (const key in schema.entries) {
        entries[key] = !keys || keys.includes(key) ? optional(schema.entries[key]) : schema.entries[key];
      }
      return { ...schema, entries };
    }
    function partialAsync(schema, keys) {
      const entries = {};
      for (const key in schema.entries) {
        entries[key] = !keys || keys.includes(key) ? optionalAsync(schema.entries[key]) : schema.entries[key];
      }
      return { ...schema, entries };
    }
    function pick(schema, keys) {
      const entries = {};
      for (const key of keys) {
        entries[key] = schema.entries[key];
      }
      return { ...schema, entries };
    }
    function pipe(...pipe2) {
      return {
        ...pipe2[0],
        pipe: pipe2,
        _run(dataset, config2) {
          for (const item of pipe2) {
            if (item.kind !== "metadata") {
              if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
                dataset.typed = false;
                break;
              }
              if (!dataset.issues || !config2.abortEarly && !config2.abortPipeEarly) {
                dataset = item._run(dataset, config2);
              }
            }
          }
          return dataset;
        }
      };
    }
    function pipeAsync(...pipe2) {
      return {
        ...pipe2[0],
        pipe: pipe2,
        async: true,
        async _run(dataset, config2) {
          for (const item of pipe2) {
            if (item.kind !== "metadata") {
              if (dataset.issues && (item.kind === "schema" || item.kind === "transformation")) {
                dataset.typed = false;
                break;
              }
              if (!dataset.issues || !config2.abortEarly && !config2.abortPipeEarly) {
                dataset = await item._run(dataset, config2);
              }
            }
          }
          return dataset;
        }
      };
    }
    function required(schema, arg2, arg3) {
      const keys = Array.isArray(arg2) ? arg2 : void 0;
      const message = Array.isArray(arg2) ? arg3 : arg2;
      const entries = {};
      for (const key in schema.entries) {
        entries[key] = !keys || keys.includes(key) ? nonOptional(schema.entries[key], message) : schema.entries[key];
      }
      return { ...schema, entries };
    }
    function requiredAsync(schema, arg2, arg3) {
      const keys = Array.isArray(arg2) ? arg2 : void 0;
      const message = Array.isArray(arg2) ? arg3 : arg2;
      const entries = {};
      for (const key in schema.entries) {
        entries[key] = !keys || keys.includes(key) ? nonOptionalAsync(schema.entries[key], message) : schema.entries[key];
      }
      return { ...schema, entries };
    }
    function safeParse(schema, input, config2) {
      const dataset = schema._run(
        { typed: false, value: input },
        getGlobalConfig(config2)
      );
      return {
        typed: dataset.typed,
        success: !dataset.issues,
        output: dataset.value,
        issues: dataset.issues
      };
    }
    async function safeParseAsync(schema, input, config2) {
      const dataset = await schema._run(
        { typed: false, value: input },
        getGlobalConfig(config2)
      );
      return {
        typed: dataset.typed,
        success: !dataset.issues,
        output: dataset.value,
        issues: dataset.issues
      };
    }
    function safeParser(schema, config2) {
      const func = (input) => safeParse(schema, input, config2);
      func.schema = schema;
      func.config = config2;
      return func;
    }
    function safeParserAsync(schema, config2) {
      const func = (input) => safeParseAsync(schema, input, config2);
      func.schema = schema;
      func.config = config2;
      return func;
    }
    function unwrap(schema) {
      return schema.wrapped;
    }
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"(exports, module) {
    "use strict";
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js"(exports, module) {
    "use strict";
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js
var require_root = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js"(exports, module) {
    "use strict";
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js"(exports, module) {
    "use strict";
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js"(exports, module) {
    "use strict";
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js"(exports, module) {
    "use strict";
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js"(exports, module) {
    "use strict";
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js"(exports, module) {
    "use strict";
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js"(exports, module) {
    "use strict";
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js"(exports, module) {
    "use strict";
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js"(exports, module) {
    "use strict";
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js"(exports, module) {
    "use strict";
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js"(exports, module) {
    "use strict";
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js
var require_eq = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js"(exports, module) {
    "use strict";
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index2 = assocIndexOf(data, key);
      return index2 < 0 ? void 0 : data[index2][1];
    }
    module.exports = listCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js"(exports, module) {
    "use strict";
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js"(exports, module) {
    "use strict";
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js"(exports, module) {
    "use strict";
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js"(exports, module) {
    "use strict";
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/memoize.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_memoizeCapped.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToPath.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayMap.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseToString.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toString.js
var require_toString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toString.js"(exports, module) {
    "use strict";
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castPath.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGet.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js"(exports, module) {
    "use strict";
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    module.exports = defineProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js
var require_assignValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assignValue.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseSet.js
var require_baseSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseSet.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePickBy.js
var require_basePickBy = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePickBy.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js"(exports, module) {
    "use strict";
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js"(exports, module) {
    "use strict";
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(/* @__PURE__ */ function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js"(exports, module) {
    "use strict";
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js"(exports, module) {
    "use strict";
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path2) {
      return object != null && hasPath(object, path2, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePick.js
var require_basePick = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePick.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isFlattenable.js
var require_isFlattenable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isFlattenable.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFlatten.js
var require_baseFlatten = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFlatten.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/flatten.js
var require_flatten = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/flatten.js"(exports, module) {
    "use strict";
    var baseFlatten = require_baseFlatten();
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }
    module.exports = flatten;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_apply.js
var require_apply = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_apply.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overRest.js
var require_overRest = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overRest.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/constant.js
var require_constant = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/constant.js"(exports, module) {
    "use strict";
    function constant(value) {
      return function() {
        return value;
      };
    }
    module.exports = constant;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js
var require_identity = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js"(exports, module) {
    "use strict";
    function identity(value) {
      return value;
    }
    module.exports = identity;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseSetToString.js
var require_baseSetToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseSetToString.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_shortOut.js
var require_shortOut = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_shortOut.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToString.js
var require_setToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToString.js"(exports, module) {
    "use strict";
    var baseSetToString = require_baseSetToString();
    var shortOut = require_shortOut();
    var setToString = shortOut(baseSetToString);
    module.exports = setToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_flatRest.js
var require_flatRest = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_flatRest.js"(exports, module) {
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

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/pick.js
var require_pick = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/pick.js"(exports, module) {
    "use strict";
    var basePick = require_basePick();
    var flatRest = require_flatRest();
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });
    module.exports = pick;
  }
});

// ../../node_modules/.pnpm/@react-router+dev@7.1.2_@react-router+serve@7.1.5_react-router@7.1.5_react-dom@18.2.0_react@1_7k2ml56brf2tye7wm4udkhrntm/node_modules/@react-router/dev/dist/routes.js
var require_routes = __commonJS({
  "../../node_modules/.pnpm/@react-router+dev@7.1.2_@react-router+serve@7.1.5_react-router@7.1.5_react-dom@18.2.0_react@1_7k2ml56brf2tye7wm4udkhrntm/node_modules/@react-router/dev/dist/routes.js"(exports, module) {
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
        id: v.optional(v.string()),
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
import path from "node:path";
function getAddonRoutesConfig(routesConfig, addonsInfo) {
  let resultRoutesConfig = [];
  for (const routeConfig of routesConfig) {
    const containsAddonModule = addonsInfo.find(
      (addon) => routeConfig.file.includes(addon.name)
    );
    if (containsAddonModule) {
      routeConfig.file = path.join(
        containsAddonModule.modulePath,
        routeConfig.file.replace(containsAddonModule.name, "")
      );
    }
    switch (routeConfig.type) {
      case "route":
        if (routeConfig.options) {
          resultRoutesConfig.push(
            (0, import_routes.route)(routeConfig.path, routeConfig.file, routeConfig.options)
          );
        } else if (routeConfig.children) {
          resultRoutesConfig.push(
            (0, import_routes.route)(
              routeConfig.path,
              routeConfig.file,
              routeConfig.options || {},
              getAddonRoutesConfig(
                routeConfig.children,
                addonsInfo
              )
            )
          );
        } else {
          resultRoutesConfig.push((0, import_routes.route)(routeConfig.path, routeConfig.file));
        }
        break;
      case "index":
        resultRoutesConfig.push((0, import_routes.index)(routeConfig.file, routeConfig.options));
        break;
      case "layout":
        if (routeConfig.options) {
          resultRoutesConfig.push(
            (0, import_routes.layout)(routeConfig.file, routeConfig.options)
          );
        }
        if (routeConfig.children) {
          resultRoutesConfig.push(
            (0, import_routes.layout)(
              routeConfig.file,
              routeConfig.options || {},
              getAddonRoutesConfig(
                routeConfig.children,
                addonsInfo
              )
            )
          );
        }
        break;
      case "prefix":
        console.log("prefix not implemented yet");
        break;
      default:
        break;
    }
  }
  return resultRoutesConfig;
}
export {
  getAddonRoutesConfig
};
/*! Bundled license information:

@react-router/dev/dist/routes.js:
  (**
   * @react-router/dev v7.1.2
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
