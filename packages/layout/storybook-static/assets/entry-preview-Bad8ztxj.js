const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./test-utils-CAuJqoVv.js","./index-CFtE-bf8.js","./react-18-DTejT3It.js","./index-d0xbMisk.js"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./iframe-DB5sSH-w.js";
import { _ as __toESM, a as __commonJS, b as __export } from "./chunk-XP5HYGXS-BF4Vd9N7.js";
import { r as reactExports, R as React, a as React3 } from "./index-CFtE-bf8.js";
var define_process_env_default = {};
const { global } = __STORYBOOK_MODULE_GLOBAL__;
var require_constants = __commonJS({ "../../node_modules/semver/internal/constants.js"(exports, module) {
  var SEMVER_SPEC_VERSION = "2.0.0", MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991, MAX_SAFE_COMPONENT_LENGTH = 16, MAX_SAFE_BUILD_LENGTH = 250, RELEASE_TYPES = ["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"];
  module.exports = { MAX_LENGTH: 256, MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_SAFE_INTEGER, RELEASE_TYPES, SEMVER_SPEC_VERSION, FLAG_INCLUDE_PRERELEASE: 1, FLAG_LOOSE: 2 };
} });
var require_debug = __commonJS({ "../../node_modules/semver/internal/debug.js"(exports, module) {
  var debug = typeof process == "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  module.exports = debug;
} });
var require_re = __commonJS({ "../../node_modules/semver/internal/re.js"(exports, module) {
  var { MAX_SAFE_COMPONENT_LENGTH, MAX_SAFE_BUILD_LENGTH, MAX_LENGTH } = require_constants(), debug = require_debug();
  exports = module.exports = {};
  var re = exports.re = [], safeRe = exports.safeRe = [], src = exports.src = [], safeSrc = exports.safeSrc = [], t = exports.t = {}, R = 0, LETTERDASHNUMBER = "[a-zA-Z0-9-]", safeRegexReplacements = [["\\s", 1], ["\\d", MAX_LENGTH], [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]], makeSafeRegex = (value) => {
    for (let [token, max] of safeRegexReplacements) value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    return value;
  }, createToken = (name, value, isGlobal) => {
    let safe = makeSafeRegex(value), index = R++;
    debug(name, index, value), t[name] = index, src[index] = value, safeSrc[index] = safe, re[index] = new RegExp(value, isGlobal ? "g" : void 0), safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
  createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
  createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
  createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
  createToken("FULL", `^${src[t.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
  createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("COERCEPLAIN", `(^|[^\\d])(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
  createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
  createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t.COERCE], true);
  createToken("COERCERTLFULL", src[t.COERCEFULL], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
} });
var require_parse_options = __commonJS({ "../../node_modules/semver/internal/parse-options.js"(exports, module) {
  var looseOption = Object.freeze({ loose: true }), emptyOpts = Object.freeze({}), parseOptions = (options) => options ? typeof options != "object" ? looseOption : options : emptyOpts;
  module.exports = parseOptions;
} });
var require_identifiers = __commonJS({ "../../node_modules/semver/internal/identifiers.js"(exports, module) {
  var numeric = /^[0-9]+$/, compareIdentifiers = (a, b) => {
    let anum = numeric.test(a), bnum = numeric.test(b);
    return anum && bnum && (a = +a, b = +b), a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  }, rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
  module.exports = { compareIdentifiers, rcompareIdentifiers };
} });
var require_semver = __commonJS({ "../../node_modules/semver/classes/semver.js"(exports, module) {
  var debug = require_debug(), { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants(), { safeRe: re, safeSrc: src, t } = require_re(), parseOptions = require_parse_options(), { compareIdentifiers } = require_identifiers(), SemVer = class _SemVer {
    constructor(version2, options) {
      if (options = parseOptions(options), version2 instanceof _SemVer) {
        if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) return version2;
        version2 = version2.version;
      } else if (typeof version2 != "string") throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
      if (version2.length > MAX_LENGTH) throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
      debug("SemVer", version2, options), this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease;
      let m = version2.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
      if (!m) throw new TypeError(`Invalid Version: ${version2}`);
      if (this.raw = version2, this.major = +m[1], this.minor = +m[2], this.patch = +m[3], this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
      m[4] ? this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          let num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
        }
        return id;
      }) : this.prerelease = [], this.build = m[5] ? m[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      if (debug("SemVer.compare", this.version, this.options, other), !(other instanceof _SemVer)) {
        if (typeof other == "string" && other === this.version) return 0;
        other = new _SemVer(other, this.options);
      }
      return other.version === this.version ? 0 : this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      return other instanceof _SemVer || (other = new _SemVer(other, this.options)), compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
      if (other instanceof _SemVer || (other = new _SemVer(other, this.options)), this.prerelease.length && !other.prerelease.length) return -1;
      if (!this.prerelease.length && other.prerelease.length) return 1;
      if (!this.prerelease.length && !other.prerelease.length) return 0;
      let i = 0;
      do {
        let a = this.prerelease[i], b = other.prerelease[i];
        if (debug("prerelease compare", i, a, b), a === void 0 && b === void 0) return 0;
        if (b === void 0) return 1;
        if (a === void 0) return -1;
        if (a === b) continue;
        return compareIdentifiers(a, b);
      } while (++i);
    }
    compareBuild(other) {
      other instanceof _SemVer || (other = new _SemVer(other, this.options));
      let i = 0;
      do {
        let a = this.build[i], b = other.build[i];
        if (debug("build compare", i, a, b), a === void 0 && b === void 0) return 0;
        if (b === void 0) return 1;
        if (a === void 0) return -1;
        if (a === b) continue;
        return compareIdentifiers(a, b);
      } while (++i);
    }
    inc(release, identifier, identifierBase) {
      if (release.startsWith("pre")) {
        if (!identifier && identifierBase === false) throw new Error("invalid increment argument: identifier is empty");
        if (identifier) {
          let r = new RegExp(`^${this.options.loose ? src[t.PRERELEASELOOSE] : src[t.PRERELEASE]}$`), match = `-${identifier}`.match(r);
          if (!match || match[1] !== identifier) throw new Error(`invalid identifier: ${identifier}`);
        }
      }
      switch (release) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", identifier, identifierBase), this.inc("pre", identifier, identifierBase);
          break;
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", identifier, identifierBase), this.inc("pre", identifier, identifierBase);
          break;
        case "release":
          if (this.prerelease.length === 0) throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        case "pre": {
          let base = Number(identifierBase) ? 1 : 0;
          if (this.prerelease.length === 0) this.prerelease = [base];
          else {
            let i = this.prerelease.length;
            for (; --i >= 0; ) typeof this.prerelease[i] == "number" && (this.prerelease[i]++, i = -2);
            if (i === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            identifierBase === false && (prerelease = [identifier]), compareIdentifiers(this.prerelease[0], identifier) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = prerelease) : this.prerelease = prerelease;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  };
  module.exports = SemVer;
} });
var require_parse = __commonJS({ "../../node_modules/semver/functions/parse.js"(exports, module) {
  var SemVer = require_semver(), parse = (version2, options, throwErrors = false) => {
    if (version2 instanceof SemVer) return version2;
    try {
      return new SemVer(version2, options);
    } catch (er) {
      if (!throwErrors) return null;
      throw er;
    }
  };
  module.exports = parse;
} });
var require_valid = __commonJS({ "../../node_modules/semver/functions/valid.js"(exports, module) {
  var parse = require_parse(), valid = (version2, options) => {
    let v = parse(version2, options);
    return v ? v.version : null;
  };
  module.exports = valid;
} });
var require_clean = __commonJS({ "../../node_modules/semver/functions/clean.js"(exports, module) {
  var parse = require_parse(), clean = (version2, options) => {
    let s = parse(version2.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  };
  module.exports = clean;
} });
var require_inc = __commonJS({ "../../node_modules/semver/functions/inc.js"(exports, module) {
  var SemVer = require_semver(), inc = (version2, release, options, identifier, identifierBase) => {
    typeof options == "string" && (identifierBase = identifier, identifier = options, options = void 0);
    try {
      return new SemVer(version2 instanceof SemVer ? version2.version : version2, options).inc(release, identifier, identifierBase).version;
    } catch {
      return null;
    }
  };
  module.exports = inc;
} });
var require_diff = __commonJS({ "../../node_modules/semver/functions/diff.js"(exports, module) {
  var parse = require_parse(), diff = (version1, version2) => {
    let v1 = parse(version1, null, true), v2 = parse(version2, null, true), comparison = v1.compare(v2);
    if (comparison === 0) return null;
    let v1Higher = comparison > 0, highVersion = v1Higher ? v1 : v2, lowVersion = v1Higher ? v2 : v1, highHasPre = !!highVersion.prerelease.length;
    if (!!lowVersion.prerelease.length && !highHasPre) {
      if (!lowVersion.patch && !lowVersion.minor) return "major";
      if (lowVersion.compareMain(highVersion) === 0) return lowVersion.minor && !lowVersion.patch ? "minor" : "patch";
    }
    let prefix = highHasPre ? "pre" : "";
    return v1.major !== v2.major ? prefix + "major" : v1.minor !== v2.minor ? prefix + "minor" : v1.patch !== v2.patch ? prefix + "patch" : "prerelease";
  };
  module.exports = diff;
} });
var require_major = __commonJS({ "../../node_modules/semver/functions/major.js"(exports, module) {
  var SemVer = require_semver(), major = (a, loose) => new SemVer(a, loose).major;
  module.exports = major;
} });
var require_minor = __commonJS({ "../../node_modules/semver/functions/minor.js"(exports, module) {
  var SemVer = require_semver(), minor = (a, loose) => new SemVer(a, loose).minor;
  module.exports = minor;
} });
var require_patch = __commonJS({ "../../node_modules/semver/functions/patch.js"(exports, module) {
  var SemVer = require_semver(), patch = (a, loose) => new SemVer(a, loose).patch;
  module.exports = patch;
} });
var require_prerelease = __commonJS({ "../../node_modules/semver/functions/prerelease.js"(exports, module) {
  var parse = require_parse(), prerelease = (version2, options) => {
    let parsed = parse(version2, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  };
  module.exports = prerelease;
} });
var require_compare = __commonJS({ "../../node_modules/semver/functions/compare.js"(exports, module) {
  var SemVer = require_semver(), compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
  module.exports = compare;
} });
var require_rcompare = __commonJS({ "../../node_modules/semver/functions/rcompare.js"(exports, module) {
  var compare = require_compare(), rcompare = (a, b, loose) => compare(b, a, loose);
  module.exports = rcompare;
} });
var require_compare_loose = __commonJS({ "../../node_modules/semver/functions/compare-loose.js"(exports, module) {
  var compare = require_compare(), compareLoose = (a, b) => compare(a, b, true);
  module.exports = compareLoose;
} });
var require_compare_build = __commonJS({ "../../node_modules/semver/functions/compare-build.js"(exports, module) {
  var SemVer = require_semver(), compareBuild = (a, b, loose) => {
    let versionA = new SemVer(a, loose), versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
  };
  module.exports = compareBuild;
} });
var require_sort = __commonJS({ "../../node_modules/semver/functions/sort.js"(exports, module) {
  var compareBuild = require_compare_build(), sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
  module.exports = sort;
} });
var require_rsort = __commonJS({ "../../node_modules/semver/functions/rsort.js"(exports, module) {
  var compareBuild = require_compare_build(), rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
  module.exports = rsort;
} });
var require_gt = __commonJS({ "../../node_modules/semver/functions/gt.js"(exports, module) {
  var compare = require_compare(), gt = (a, b, loose) => compare(a, b, loose) > 0;
  module.exports = gt;
} });
var require_lt = __commonJS({ "../../node_modules/semver/functions/lt.js"(exports, module) {
  var compare = require_compare(), lt = (a, b, loose) => compare(a, b, loose) < 0;
  module.exports = lt;
} });
var require_eq = __commonJS({ "../../node_modules/semver/functions/eq.js"(exports, module) {
  var compare = require_compare(), eq = (a, b, loose) => compare(a, b, loose) === 0;
  module.exports = eq;
} });
var require_neq = __commonJS({ "../../node_modules/semver/functions/neq.js"(exports, module) {
  var compare = require_compare(), neq = (a, b, loose) => compare(a, b, loose) !== 0;
  module.exports = neq;
} });
var require_gte = __commonJS({ "../../node_modules/semver/functions/gte.js"(exports, module) {
  var compare = require_compare(), gte = (a, b, loose) => compare(a, b, loose) >= 0;
  module.exports = gte;
} });
var require_lte = __commonJS({ "../../node_modules/semver/functions/lte.js"(exports, module) {
  var compare = require_compare(), lte = (a, b, loose) => compare(a, b, loose) <= 0;
  module.exports = lte;
} });
var require_cmp = __commonJS({ "../../node_modules/semver/functions/cmp.js"(exports, module) {
  var eq = require_eq(), neq = require_neq(), gt = require_gt(), gte = require_gte(), lt = require_lt(), lte = require_lte(), cmp = (a, op, b, loose) => {
    switch (op) {
      case "===":
        return typeof a == "object" && (a = a.version), typeof b == "object" && (b = b.version), a === b;
      case "!==":
        return typeof a == "object" && (a = a.version), typeof b == "object" && (b = b.version), a !== b;
      case "":
      case "=":
      case "==":
        return eq(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError(`Invalid operator: ${op}`);
    }
  };
  module.exports = cmp;
} });
var require_coerce = __commonJS({ "../../node_modules/semver/functions/coerce.js"(exports, module) {
  var SemVer = require_semver(), parse = require_parse(), { safeRe: re, t } = require_re(), coerce = (version2, options) => {
    if (version2 instanceof SemVer) return version2;
    if (typeof version2 == "number" && (version2 = String(version2)), typeof version2 != "string") return null;
    options = options || {};
    let match = null;
    if (!options.rtl) match = version2.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
    else {
      let coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL], next;
      for (; (next = coerceRtlRegex.exec(version2)) && (!match || match.index + match[0].length !== version2.length); ) (!match || next.index + next[0].length !== match.index + match[0].length) && (match = next), coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
      coerceRtlRegex.lastIndex = -1;
    }
    if (match === null) return null;
    let major = match[2], minor = match[3] || "0", patch = match[4] || "0", prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "", build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
    return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
  };
  module.exports = coerce;
} });
var require_lrucache = __commonJS({ "../../node_modules/semver/internal/lrucache.js"(exports, module) {
  var LRUCache = class {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(key) {
      let value = this.map.get(key);
      if (value !== void 0) return this.map.delete(key), this.map.set(key, value), value;
    }
    delete(key) {
      return this.map.delete(key);
    }
    set(key, value) {
      if (!this.delete(key) && value !== void 0) {
        if (this.map.size >= this.max) {
          let firstKey = this.map.keys().next().value;
          this.delete(firstKey);
        }
        this.map.set(key, value);
      }
      return this;
    }
  };
  module.exports = LRUCache;
} });
var require_range = __commonJS({ "../../node_modules/semver/classes/range.js"(exports, module) {
  var SPACE_CHARACTERS = /\s+/g, Range = class _Range {
    constructor(range, options) {
      if (options = parseOptions(options), range instanceof _Range) return range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease ? range : new _Range(range.raw, options);
      if (range instanceof Comparator) return this.raw = range.value, this.set = [[range]], this.formatted = void 0, this;
      if (this.options = options, this.loose = !!options.loose, this.includePrerelease = !!options.includePrerelease, this.raw = range.trim().replace(SPACE_CHARACTERS, " "), this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length), !this.set.length) throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        let first = this.set[0];
        if (this.set = this.set.filter((c) => !isNullSet(c[0])), this.set.length === 0) this.set = [first];
        else if (this.set.length > 1) {
          for (let c of this.set) if (c.length === 1 && isAny(c[0])) {
            this.set = [c];
            break;
          }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let i = 0; i < this.set.length; i++) {
          i > 0 && (this.formatted += "||");
          let comps = this.set[i];
          for (let k = 0; k < comps.length; k++) k > 0 && (this.formatted += " "), this.formatted += comps[k].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range) {
      let memoKey = ((this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE)) + ":" + range, cached = cache.get(memoKey);
      if (cached) return cached;
      let loose = this.options.loose, hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace(this.options.includePrerelease)), debug("hyphen replace", range), range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace), debug("comparator trim", range), range = range.replace(re[t.TILDETRIM], tildeTrimReplace), debug("tilde trim", range), range = range.replace(re[t.CARETTRIM], caretTrimReplace), debug("caret trim", range);
      let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      loose && (rangeList = rangeList.filter((comp) => (debug("loose invalid filter", comp, this.options), !!comp.match(re[t.COMPARATORLOOSE])))), debug("range list", rangeList);
      let rangeMap = /* @__PURE__ */ new Map(), comparators = rangeList.map((comp) => new Comparator(comp, this.options));
      for (let comp of comparators) {
        if (isNullSet(comp)) return [comp];
        rangeMap.set(comp.value, comp);
      }
      rangeMap.size > 1 && rangeMap.has("") && rangeMap.delete("");
      let result = [...rangeMap.values()];
      return cache.set(memoKey, result), result;
    }
    intersects(range, options) {
      if (!(range instanceof _Range)) throw new TypeError("a Range is required");
      return this.set.some((thisComparators) => isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => rangeComparators.every((rangeComparator) => thisComparator.intersects(rangeComparator, options)))));
    }
    test(version2) {
      if (!version2) return false;
      if (typeof version2 == "string") try {
        version2 = new SemVer(version2, this.options);
      } catch {
        return false;
      }
      for (let i = 0; i < this.set.length; i++) if (testSet(this.set[i], version2, this.options)) return true;
      return false;
    }
  };
  module.exports = Range;
  var LRU = require_lrucache(), cache = new LRU(), parseOptions = require_parse_options(), Comparator = require_comparator(), debug = require_debug(), SemVer = require_semver(), { safeRe: re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = require_re(), { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants(), isNullSet = (c) => c.value === "<0.0.0-0", isAny = (c) => c.value === "", isSatisfiable = (comparators, options) => {
    let result = true, remainingComparators = comparators.slice(), testComparator = remainingComparators.pop();
    for (; result && remainingComparators.length; ) result = remainingComparators.every((otherComparator) => testComparator.intersects(otherComparator, options)), testComparator = remainingComparators.pop();
    return result;
  }, parseComparator = (comp, options) => (debug("comp", comp, options), comp = replaceCarets(comp, options), debug("caret", comp), comp = replaceTildes(comp, options), debug("tildes", comp), comp = replaceXRanges(comp, options), debug("xrange", comp), comp = replaceStars(comp, options), debug("stars", comp), comp), isX = (id) => !id || id.toLowerCase() === "x" || id === "*", replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" "), replaceTilde = (comp, options) => {
    let r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("tilde", comp, _, M, m, p, pr);
      let ret;
      return isX(M) ? ret = "" : isX(m) ? ret = `>=${M}.0.0 <${+M + 1}.0.0-0` : isX(p) ? ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0` : pr ? (debug("replaceTilde pr", pr), ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`) : ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`, debug("tilde return", ret), ret;
    });
  }, replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" "), replaceCaret = (comp, options) => {
    debug("caret", comp, options);
    let r = options.loose ? re[t.CARETLOOSE] : re[t.CARET], z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("caret", comp, _, M, m, p, pr);
      let ret;
      return isX(M) ? ret = "" : isX(m) ? ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0` : isX(p) ? M === "0" ? ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0` : ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0` : pr ? (debug("replaceCaret pr", pr), M === "0" ? m === "0" ? ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0` : ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0` : ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`) : (debug("no pr"), M === "0" ? m === "0" ? ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0` : ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0` : ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`), debug("caret return", ret), ret;
    });
  }, replaceXRanges = (comp, options) => (debug("replaceXRanges", comp, options), comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ")), replaceXRange = (comp, options) => {
    comp = comp.trim();
    let r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug("xRange", comp, ret, gtlt, M, m, p, pr);
      let xM = isX(M), xm = xM || isX(m), xp = xm || isX(p), anyX = xp;
      return gtlt === "=" && anyX && (gtlt = ""), pr = options.includePrerelease ? "-0" : "", xM ? gtlt === ">" || gtlt === "<" ? ret = "<0.0.0-0" : ret = "*" : gtlt && anyX ? (xm && (m = 0), p = 0, gtlt === ">" ? (gtlt = ">=", xm ? (M = +M + 1, m = 0, p = 0) : (m = +m + 1, p = 0)) : gtlt === "<=" && (gtlt = "<", xm ? M = +M + 1 : m = +m + 1), gtlt === "<" && (pr = "-0"), ret = `${gtlt + M}.${m}.${p}${pr}`) : xm ? ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0` : xp && (ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`), debug("xRange return", ret), ret;
    });
  }, replaceStars = (comp, options) => (debug("replaceStars", comp, options), comp.trim().replace(re[t.STAR], "")), replaceGTE0 = (comp, options) => (debug("replaceGTE0", comp, options), comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "")), hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => (isX(fM) ? from = "" : isX(fm) ? from = `>=${fM}.0.0${incPr ? "-0" : ""}` : isX(fp) ? from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}` : fpr ? from = `>=${from}` : from = `>=${from}${incPr ? "-0" : ""}`, isX(tM) ? to = "" : isX(tm) ? to = `<${+tM + 1}.0.0-0` : isX(tp) ? to = `<${tM}.${+tm + 1}.0-0` : tpr ? to = `<=${tM}.${tm}.${tp}-${tpr}` : incPr ? to = `<${tM}.${tm}.${+tp + 1}-0` : to = `<=${to}`, `${from} ${to}`.trim()), testSet = (set, version2, options) => {
    for (let i = 0; i < set.length; i++) if (!set[i].test(version2)) return false;
    if (version2.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++) if (debug(set[i].semver), set[i].semver !== Comparator.ANY && set[i].semver.prerelease.length > 0) {
        let allowed = set[i].semver;
        if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) return true;
      }
      return false;
    }
    return true;
  };
} });
var require_comparator = __commonJS({ "../../node_modules/semver/classes/comparator.js"(exports, module) {
  var ANY = Symbol("SemVer ANY"), Comparator = class _Comparator {
    static get ANY() {
      return ANY;
    }
    constructor(comp, options) {
      if (options = parseOptions(options), comp instanceof _Comparator) {
        if (comp.loose === !!options.loose) return comp;
        comp = comp.value;
      }
      comp = comp.trim().split(/\s+/).join(" "), debug("comparator", comp, options), this.options = options, this.loose = !!options.loose, this.parse(comp), this.semver === ANY ? this.value = "" : this.value = this.operator + this.semver.version, debug("comp", this);
    }
    parse(comp) {
      let r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR], m = comp.match(r);
      if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
      this.operator = m[1] !== void 0 ? m[1] : "", this.operator === "=" && (this.operator = ""), m[2] ? this.semver = new SemVer(m[2], this.options.loose) : this.semver = ANY;
    }
    toString() {
      return this.value;
    }
    test(version2) {
      if (debug("Comparator.test", version2, this.options.loose), this.semver === ANY || version2 === ANY) return true;
      if (typeof version2 == "string") try {
        version2 = new SemVer(version2, this.options);
      } catch {
        return false;
      }
      return cmp(version2, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof _Comparator)) throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? true : new Range(comp.value, options).test(this.value) : comp.operator === "" ? comp.value === "" ? true : new Range(this.value, options).test(comp.semver) : (options = parseOptions(options), options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0") || !options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0")) ? false : !!(this.operator.startsWith(">") && comp.operator.startsWith(">") || this.operator.startsWith("<") && comp.operator.startsWith("<") || this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=") || cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<") || cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")));
    }
  };
  module.exports = Comparator;
  var parseOptions = require_parse_options(), { safeRe: re, t } = require_re(), cmp = require_cmp(), debug = require_debug(), SemVer = require_semver(), Range = require_range();
} });
var require_satisfies = __commonJS({ "../../node_modules/semver/functions/satisfies.js"(exports, module) {
  var Range = require_range(), satisfies = (version2, range, options) => {
    try {
      range = new Range(range, options);
    } catch {
      return false;
    }
    return range.test(version2);
  };
  module.exports = satisfies;
} });
var require_to_comparators = __commonJS({ "../../node_modules/semver/ranges/to-comparators.js"(exports, module) {
  var Range = require_range(), toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
  module.exports = toComparators;
} });
var require_max_satisfying = __commonJS({ "../../node_modules/semver/ranges/max-satisfying.js"(exports, module) {
  var SemVer = require_semver(), Range = require_range(), maxSatisfying = (versions, range, options) => {
    let max = null, maxSV = null, rangeObj = null;
    try {
      rangeObj = new Range(range, options);
    } catch {
      return null;
    }
    return versions.forEach((v) => {
      rangeObj.test(v) && (!max || maxSV.compare(v) === -1) && (max = v, maxSV = new SemVer(max, options));
    }), max;
  };
  module.exports = maxSatisfying;
} });
var require_min_satisfying = __commonJS({ "../../node_modules/semver/ranges/min-satisfying.js"(exports, module) {
  var SemVer = require_semver(), Range = require_range(), minSatisfying = (versions, range, options) => {
    let min = null, minSV = null, rangeObj = null;
    try {
      rangeObj = new Range(range, options);
    } catch {
      return null;
    }
    return versions.forEach((v) => {
      rangeObj.test(v) && (!min || minSV.compare(v) === 1) && (min = v, minSV = new SemVer(min, options));
    }), min;
  };
  module.exports = minSatisfying;
} });
var require_min_version = __commonJS({ "../../node_modules/semver/ranges/min-version.js"(exports, module) {
  var SemVer = require_semver(), Range = require_range(), gt = require_gt(), minVersion = (range, loose) => {
    range = new Range(range, loose);
    let minver = new SemVer("0.0.0");
    if (range.test(minver) || (minver = new SemVer("0.0.0-0"), range.test(minver))) return minver;
    minver = null;
    for (let i = 0; i < range.set.length; ++i) {
      let comparators = range.set[i], setMin = null;
      comparators.forEach((comparator) => {
        let compver = new SemVer(comparator.semver.version);
        switch (comparator.operator) {
          case ">":
            compver.prerelease.length === 0 ? compver.patch++ : compver.prerelease.push(0), compver.raw = compver.format();
          case "":
          case ">=":
            (!setMin || gt(compver, setMin)) && (setMin = compver);
            break;
          case "<":
          case "<=":
            break;
          default:
            throw new Error(`Unexpected operation: ${comparator.operator}`);
        }
      }), setMin && (!minver || gt(minver, setMin)) && (minver = setMin);
    }
    return minver && range.test(minver) ? minver : null;
  };
  module.exports = minVersion;
} });
var require_valid2 = __commonJS({ "../../node_modules/semver/ranges/valid.js"(exports, module) {
  var Range = require_range(), validRange = (range, options) => {
    try {
      return new Range(range, options).range || "*";
    } catch {
      return null;
    }
  };
  module.exports = validRange;
} });
var require_outside = __commonJS({ "../../node_modules/semver/ranges/outside.js"(exports, module) {
  var SemVer = require_semver(), Comparator = require_comparator(), { ANY } = Comparator, Range = require_range(), satisfies = require_satisfies(), gt = require_gt(), lt = require_lt(), lte = require_lte(), gte = require_gte(), outside = (version2, range, hilo, options) => {
    version2 = new SemVer(version2, options), range = new Range(range, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt, ltefn = lte, ltfn = lt, comp = ">", ecomp = ">=";
        break;
      case "<":
        gtfn = lt, ltefn = gte, ltfn = gt, comp = "<", ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version2, range, options)) return false;
    for (let i = 0; i < range.set.length; ++i) {
      let comparators = range.set[i], high = null, low = null;
      if (comparators.forEach((comparator) => {
        comparator.semver === ANY && (comparator = new Comparator(">=0.0.0")), high = high || comparator, low = low || comparator, gtfn(comparator.semver, high.semver, options) ? high = comparator : ltfn(comparator.semver, low.semver, options) && (low = comparator);
      }), high.operator === comp || high.operator === ecomp || (!low.operator || low.operator === comp) && ltefn(version2, low.semver)) return false;
      if (low.operator === ecomp && ltfn(version2, low.semver)) return false;
    }
    return true;
  };
  module.exports = outside;
} });
var require_gtr = __commonJS({ "../../node_modules/semver/ranges/gtr.js"(exports, module) {
  var outside = require_outside(), gtr = (version2, range, options) => outside(version2, range, ">", options);
  module.exports = gtr;
} });
var require_ltr = __commonJS({ "../../node_modules/semver/ranges/ltr.js"(exports, module) {
  var outside = require_outside(), ltr = (version2, range, options) => outside(version2, range, "<", options);
  module.exports = ltr;
} });
var require_intersects = __commonJS({ "../../node_modules/semver/ranges/intersects.js"(exports, module) {
  var Range = require_range(), intersects = (r1, r2, options) => (r1 = new Range(r1, options), r2 = new Range(r2, options), r1.intersects(r2, options));
  module.exports = intersects;
} });
var require_simplify = __commonJS({ "../../node_modules/semver/ranges/simplify.js"(exports, module) {
  var satisfies = require_satisfies(), compare = require_compare();
  module.exports = (versions, range, options) => {
    let set = [], first = null, prev = null, v = versions.sort((a, b) => compare(a, b, options));
    for (let version2 of v) satisfies(version2, range, options) ? (prev = version2, first || (first = version2)) : (prev && set.push([first, prev]), prev = null, first = null);
    first && set.push([first, null]);
    let ranges = [];
    for (let [min, max] of set) min === max ? ranges.push(min) : !max && min === v[0] ? ranges.push("*") : max ? min === v[0] ? ranges.push(`<=${max}`) : ranges.push(`${min} - ${max}`) : ranges.push(`>=${min}`);
    let simplified = ranges.join(" || "), original = typeof range.raw == "string" ? range.raw : String(range);
    return simplified.length < original.length ? simplified : range;
  };
} });
var require_subset = __commonJS({ "../../node_modules/semver/ranges/subset.js"(exports, module) {
  var Range = require_range(), Comparator = require_comparator(), { ANY } = Comparator, satisfies = require_satisfies(), compare = require_compare(), subset = (sub, dom, options = {}) => {
    if (sub === dom) return true;
    sub = new Range(sub, options), dom = new Range(dom, options);
    let sawNonNull = false;
    OUTER: for (let simpleSub of sub.set) {
      for (let simpleDom of dom.set) {
        let isSub = simpleSubset(simpleSub, simpleDom, options);
        if (sawNonNull = sawNonNull || isSub !== null, isSub) continue OUTER;
      }
      if (sawNonNull) return false;
    }
    return true;
  }, minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")], minimumVersion = [new Comparator(">=0.0.0")], simpleSubset = (sub, dom, options) => {
    if (sub === dom) return true;
    if (sub.length === 1 && sub[0].semver === ANY) {
      if (dom.length === 1 && dom[0].semver === ANY) return true;
      options.includePrerelease ? sub = minimumVersionWithPreRelease : sub = minimumVersion;
    }
    if (dom.length === 1 && dom[0].semver === ANY) {
      if (options.includePrerelease) return true;
      dom = minimumVersion;
    }
    let eqSet = /* @__PURE__ */ new Set(), gt, lt;
    for (let c of sub) c.operator === ">" || c.operator === ">=" ? gt = higherGT(gt, c, options) : c.operator === "<" || c.operator === "<=" ? lt = lowerLT(lt, c, options) : eqSet.add(c.semver);
    if (eqSet.size > 1) return null;
    let gtltComp;
    if (gt && lt) {
      if (gtltComp = compare(gt.semver, lt.semver, options), gtltComp > 0) return null;
      if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) return null;
    }
    for (let eq of eqSet) {
      if (gt && !satisfies(eq, String(gt), options) || lt && !satisfies(eq, String(lt), options)) return null;
      for (let c of dom) if (!satisfies(eq, String(c), options)) return false;
      return true;
    }
    let higher, lower, hasDomLT, hasDomGT, needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false, needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0 && (needDomLTPre = false);
    for (let c of dom) {
      if (hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=", hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=", gt) {
        if (needDomGTPre && c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch && (needDomGTPre = false), c.operator === ">" || c.operator === ">=") {
          if (higher = higherGT(gt, c, options), higher === c && higher !== gt) return false;
        } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) return false;
      }
      if (lt) {
        if (needDomLTPre && c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch && (needDomLTPre = false), c.operator === "<" || c.operator === "<=") {
          if (lower = lowerLT(lt, c, options), lower === c && lower !== lt) return false;
        } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) return false;
      }
      if (!c.operator && (lt || gt) && gtltComp !== 0) return false;
    }
    return !(gt && hasDomLT && !lt && gtltComp !== 0 || lt && hasDomGT && !gt && gtltComp !== 0 || needDomGTPre || needDomLTPre);
  }, higherGT = (a, b, options) => {
    if (!a) return b;
    let comp = compare(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 || b.operator === ">" && a.operator === ">=" ? b : a;
  }, lowerLT = (a, b, options) => {
    if (!a) return b;
    let comp = compare(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 || b.operator === "<" && a.operator === "<=" ? b : a;
  };
  module.exports = subset;
} });
var require_semver2 = __commonJS({ "../../node_modules/semver/index.js"(exports, module) {
  var internalRe = require_re(), constants = require_constants(), SemVer = require_semver(), identifiers = require_identifiers(), parse = require_parse(), valid = require_valid(), clean = require_clean(), inc = require_inc(), diff = require_diff(), major = require_major(), minor = require_minor(), patch = require_patch(), prerelease = require_prerelease(), compare = require_compare(), rcompare = require_rcompare(), compareLoose = require_compare_loose(), compareBuild = require_compare_build(), sort = require_sort(), rsort = require_rsort(), gt = require_gt(), lt = require_lt(), eq = require_eq(), neq = require_neq(), gte = require_gte(), lte = require_lte(), cmp = require_cmp(), coerce = require_coerce(), Comparator = require_comparator(), Range = require_range(), satisfies = require_satisfies(), toComparators = require_to_comparators(), maxSatisfying = require_max_satisfying(), minSatisfying = require_min_satisfying(), minVersion = require_min_version(), validRange = require_valid2(), outside = require_outside(), gtr = require_gtr(), ltr = require_ltr(), intersects = require_intersects(), simplifyRange = require_simplify(), subset = require_subset();
  module.exports = { parse, valid, clean, inc, diff, major, minor, patch, prerelease, compare, rcompare, compareLoose, compareBuild, sort, rsort, gt, lt, eq, neq, gte, lte, cmp, coerce, Comparator, Range, satisfies, toComparators, maxSatisfying, minSatisfying, minVersion, validRange, outside, gtr, ltr, intersects, simplifyRange, subset, SemVer, re: internalRe.re, src: internalRe.src, tokens: internalRe.t, SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION, RELEASE_TYPES: constants.RELEASE_TYPES, compareIdentifiers: identifiers.compareIdentifiers, rcompareIdentifiers: identifiers.rcompareIdentifiers };
} });
var entry_preview_exports = {};
__export(entry_preview_exports, { beforeAll: () => beforeAll, decorators: () => decorators, mount: () => mount, parameters: () => parameters, render: () => render, renderToCanvas: () => renderToCanvas });
var import_semver = __toESM(require_semver2());
var clonedReact = { ...React3 };
function setReactActEnvironment(isReactActEnvironment) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = isReactActEnvironment;
}
function getReactActEnvironment() {
  return globalThis.IS_REACT_ACT_ENVIRONMENT;
}
var getAct = async () => {
  var _a;
  if (typeof clonedReact.act == "function") ;
  else {
    let deprecatedTestUtils = await __vitePreload(() => import("./test-utils-CAuJqoVv.js").then((n) => n.t), true ? __vite__mapDeps([0,1]) : void 0, import.meta.url);
    ((_a = deprecatedTestUtils == null ? void 0 : deprecatedTestUtils.default) == null ? void 0 : _a.act) ?? deprecatedTestUtils.act;
  }
  return (cb) => cb();
};
var render = (args, context) => {
  let { id, component: Component2 } = context;
  if (!Component2) throw new Error(`Unable to render story ${id} as the component annotation is missing from the default export`);
  return React.createElement(Component2, { ...args });
};
var { FRAMEWORK_OPTIONS } = global, ErrorBoundary = class extends reactExports.Component {
  constructor() {
    super(...arguments);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidMount() {
    let { hasError } = this.state, { showMain } = this.props;
    hasError || showMain();
  }
  componentDidCatch(err) {
    let { showException } = this.props;
    showException(err);
  }
  render() {
    let { hasError } = this.state, { children } = this.props;
    return hasError ? null : children;
  }
}, Wrapper = (FRAMEWORK_OPTIONS == null ? void 0 : FRAMEWORK_OPTIONS.strictMode) ? reactExports.StrictMode : reactExports.Fragment, actQueue = [], isActing = false, processActQueue = async () => {
  if (isActing || actQueue.length === 0) return;
  isActing = true;
  let actTask = actQueue.shift();
  actTask && await actTask(), isActing = false, processActQueue();
};
async function renderToCanvas({ storyContext, unboundStoryFn, showMain, showException, forceRemount }, canvasElement) {
  let { renderElement, unmountElement } = await __vitePreload(async () => {
    const { renderElement: renderElement2, unmountElement: unmountElement2 } = await import("./react-18-DTejT3It.js");
    return { renderElement: renderElement2, unmountElement: unmountElement2 };
  }, true ? __vite__mapDeps([2,1,3]) : void 0, import.meta.url), Story = unboundStoryFn, content = storyContext.parameters.__isPortableStory ? React.createElement(Story, { ...storyContext }) : React.createElement(ErrorBoundary, { showMain, showException }, React.createElement(Story, { ...storyContext })), element = Wrapper ? React.createElement(Wrapper, null, content) : content;
  forceRemount && unmountElement(canvasElement);
  let act = await getAct();
  return await new Promise(async (resolve, reject) => {
    actQueue.push(async () => {
      try {
        await act(async () => {
          var _a, _b;
          await renderElement(element, canvasElement, (_b = (_a = storyContext == null ? void 0 : storyContext.parameters) == null ? void 0 : _a.react) == null ? void 0 : _b.rootOptions);
        }), resolve();
      } catch (e) {
        reject(e);
      }
    }), processActQueue();
  }), async () => {
    await act(() => {
      unmountElement(canvasElement);
    });
  };
}
var mount = (context) => async (ui) => (ui != null && (context.originalStoryFn = () => ui), await context.renderToCanvas(), context.canvas);
var parameters = { renderer: "react" }, decorators = [(story, context) => {
  var _a, _b;
  if (!((_b = (_a = context.parameters) == null ? void 0 : _a.react) == null ? void 0 : _b.rsc)) return story();
  let major = import_semver.default.major(reactExports.version), minor = import_semver.default.minor(reactExports.version);
  if (major < 18 || major === 18 && minor < 3) throw new Error("React Server Components require React >= 18.3");
  return reactExports.createElement(reactExports.Suspense, null, story());
}], beforeAll = async () => {
  try {
    let { configure } = await __vitePreload(async () => {
      const { configure: configure2 } = await import("./index-BX6B_iXa.js").then((n) => n.a);
      return { configure: configure2 };
    }, true ? [] : void 0, import.meta.url), act = await getAct();
    configure({ unstable_advanceTimersWrapper: (cb) => act(cb), asyncWrapper: async (cb) => {
      let previousActEnvironment = getReactActEnvironment();
      setReactActEnvironment(false);
      try {
        let result = await cb();
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 0), jestFakeTimersAreEnabled() && jest.advanceTimersByTime(0);
        }), result;
      } finally {
        setReactActEnvironment(previousActEnvironment);
      }
    }, eventWrapper: (cb) => {
      let result;
      return act(() => (result = cb(), result)), result;
    } });
  } catch {
  }
};
function jestFakeTimersAreEnabled() {
  return typeof jest < "u" && jest !== null ? setTimeout._isMockFunction === true || Object.prototype.hasOwnProperty.call(setTimeout, "clock") : false;
}
export {
  beforeAll,
  decorators,
  mount,
  parameters,
  render,
  renderToCanvas
};
