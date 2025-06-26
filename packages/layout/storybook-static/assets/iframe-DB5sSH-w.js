const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./App.stories-CwwTu7pH.js","./jsx-runtime-ChbgMHDT.js","./App-DBWePUAt.js","./SlotRenderer-FIE8NxhS.js","./index-NvtfmQ2G.js","./Header.stories-CZOyr_G7.js","./Header-DWs9IDPp.js","./chunk-DDZFNAN4-BkXFyrin.js","./index-CFtE-bf8.js","./index-d0xbMisk.js","./Logo.stories-CDkwnt2E.js","./Logo-DSr7yn3I.js","./Navigation.stories-DzPpUJo_.js","./Navigation-C0nDt2bV.js","./preview-D7sfXr67.js","./preview-cC1IwC3H.css","./entry-preview-Bad8ztxj.js","./chunk-XP5HYGXS-BF4Vd9N7.js","./entry-preview-docs-SvAANoI5.js","./index-BJ2pi0x4.js","./preview-wekBJc4A.js","./index-BdOSk9or.js","./preview-CtNj_3Tt.js","./preview-VMy2o69I.js","./index-BX6B_iXa.js"])))=>i.map(i=>d[i]);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const scriptRel = "modulepreload";
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (deps && deps.length > 0) {
    const links = document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = (cspNonceMeta == null ? void 0 : cspNonceMeta.nonce) || (cspNonceMeta == null ? void 0 : cspNonceMeta.getAttribute("nonce"));
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep, importerUrl);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        const isBaseRelative = !!importerUrl;
        if (isBaseRelative) {
          for (let i = links.length - 1; i >= 0; i--) {
            const link2 = links[i];
            if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
              return;
            }
          }
        } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};
var tl = Object.create;
var et = Object.defineProperty;
var ol = Object.getOwnPropertyDescriptor;
var nl = Object.getOwnPropertyNames;
var sl = Object.getPrototypeOf, il = Object.prototype.hasOwnProperty;
var n = (r, e) => et(r, "name", { value: e, configurable: true }), cr = /* @__PURE__ */ ((r) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(r, {
  get: (e, t) => (typeof require < "u" ? require : e)[t]
}) : r)(function(r) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + r + '" is not supported');
});
var q = (r, e) => () => (e || r((e = { exports: {} }).exports, e), e.exports), _e = (r, e) => {
  for (var t in e)
    et(r, t, { get: e[t], enumerable: true });
}, al = (r, e, t, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s2 of nl(e))
      !il.call(r, s2) && s2 !== t && et(r, s2, { get: () => e[s2], enumerable: !(o = ol(e, s2)) || o.enumerable });
  return r;
};
var ue = (r, e, t) => (t = r != null ? tl(sl(r)) : {}, al(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  et(t, "default", { value: r, enumerable: true }),
  r
));
var it = q((ys, So) => {
  (function(r) {
    if (typeof ys == "object" && typeof So < "u")
      So.exports = r();
    else if (typeof define == "function" && define.amd)
      define([], r);
    else {
      var e;
      typeof window < "u" ? e = window : typeof global < "u" ? e = global : typeof self < "u" ? e = self : e = this, e.memoizerific = r();
    }
  })(function() {
    return (/* @__PURE__ */ n(function o(s2, i, a) {
      function c(u, d) {
        if (!i[u]) {
          if (!s2[u]) {
            var h = typeof cr == "function" && cr;
            if (!d && h) return h(u, true);
            if (l) return l(u, true);
            var S2 = new Error("Cannot find module '" + u + "'");
            throw S2.code = "MODULE_NOT_FOUND", S2;
          }
          var m = i[u] = { exports: {} };
          s2[u][0].call(m.exports, function(T2) {
            var y2 = s2[u][1][T2];
            return c(y2 || T2);
          }, m, m.exports, o, s2, i, a);
        }
        return i[u].exports;
      }
      n(c, "s");
      for (var l = typeof cr == "function" && cr, p = 0; p < a.length; p++) c(a[p]);
      return c;
    }, "e"))({ 1: [function(o, s2, i) {
      s2.exports = function(a) {
        if (typeof Map != "function" || a) {
          var c = o("./similar");
          return new c();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(o, s2, i) {
      function a() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      n(a, "Similar"), a.prototype.get = function(c) {
        var l;
        if (this.lastItem && this.isEqual(this.lastItem.key, c))
          return this.lastItem.val;
        if (l = this.indexOf(c), l >= 0)
          return this.lastItem = this.list[l], this.list[l].val;
      }, a.prototype.set = function(c, l) {
        var p;
        return this.lastItem && this.isEqual(this.lastItem.key, c) ? (this.lastItem.val = l, this) : (p = this.indexOf(c), p >= 0 ? (this.lastItem = this.list[p], this.list[p].val = l, this) : (this.lastItem = { key: c, val: l }, this.list.push(this.lastItem), this.size++, this));
      }, a.prototype.delete = function(c) {
        var l;
        if (this.lastItem && this.isEqual(this.lastItem.key, c) && (this.lastItem = void 0), l = this.indexOf(c), l >= 0)
          return this.size--, this.list.splice(l, 1)[0];
      }, a.prototype.has = function(c) {
        var l;
        return this.lastItem && this.isEqual(this.lastItem.key, c) ? true : (l = this.indexOf(c), l >= 0 ? (this.lastItem = this.list[l], true) : false);
      }, a.prototype.forEach = function(c, l) {
        var p;
        for (p = 0; p < this.size; p++)
          c.call(l || this, this.list[p].val, this.list[p].key, this);
      }, a.prototype.indexOf = function(c) {
        var l;
        for (l = 0; l < this.size; l++)
          if (this.isEqual(this.list[l].key, c))
            return l;
        return -1;
      }, a.prototype.isEqual = function(c, l) {
        return c === l || c !== c && l !== l;
      }, s2.exports = a;
    }, {}], 3: [function(o, s2, i) {
      var a = o("map-or-similar");
      s2.exports = function(u) {
        var d = new a(false), h = [];
        return function(S2) {
          var m = /* @__PURE__ */ n(function() {
            var T2 = d, y2, R2, x2 = arguments.length - 1, g = Array(x2 + 1), b2 = true, v2;
            if ((m.numArgs || m.numArgs === 0) && m.numArgs !== x2 + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (v2 = 0; v2 < x2; v2++) {
              if (g[v2] = {
                cacheItem: T2,
                arg: arguments[v2]
              }, T2.has(arguments[v2])) {
                T2 = T2.get(arguments[v2]);
                continue;
              }
              b2 = false, y2 = new a(false), T2.set(arguments[v2], y2), T2 = y2;
            }
            return b2 && (T2.has(arguments[x2]) ? R2 = T2.get(arguments[x2]) : b2 = false), b2 || (R2 = S2.apply(null, arguments), T2.set(arguments[x2], R2)), u > 0 && (g[x2] = {
              cacheItem: T2,
              arg: arguments[x2]
            }, b2 ? c(h, g) : h.push(g), h.length > u && l(h.shift())), m.wasMemoized = b2, m.numArgs = x2 + 1, R2;
          }, "memoizerific");
          return m.limit = u, m.wasMemoized = false, m.cache = d, m.lru = h, m;
        };
      };
      function c(u, d) {
        var h = u.length, S2 = d.length, m, T2, y2;
        for (T2 = 0; T2 < h; T2++) {
          for (m = true, y2 = 0; y2 < S2; y2++)
            if (!p(u[T2][y2].arg, d[y2].arg)) {
              m = false;
              break;
            }
          if (m)
            break;
        }
        u.push(u.splice(T2, 1)[0]);
      }
      n(c, "moveToMostRecentLru");
      function l(u) {
        var d = u.length, h = u[d - 1], S2, m;
        for (h.cacheItem.delete(h.arg), m = d - 2; m >= 0 && (h = u[m], S2 = h.cacheItem.get(h.arg), !S2 || !S2.size); m--)
          h.cacheItem.delete(h.arg);
      }
      n(l, "removeCachedResult");
      function p(u, d) {
        return u === d || u !== u && d !== d;
      }
      n(p, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});
var wi = q((Tn) => {
  Object.defineProperty(Tn, "__esModule", { value: true }), Tn.isEqual = /* @__PURE__ */ function() {
    var r = Object.prototype.toString, e = Object.getPrototypeOf, t = Object.getOwnPropertySymbols ? function(o) {
      return Object.keys(o).concat(Object.getOwnPropertySymbols(o));
    } : Object.keys;
    return function(o, s2) {
      return (/* @__PURE__ */ n(function i(a, c, l) {
        var p, u, d, h = r.call(a), S2 = r.call(c);
        if (a === c) return true;
        if (a == null || c == null) return false;
        if (l.indexOf(a) > -1 && l.indexOf(c) > -1) return true;
        if (l.push(a, c), h != S2 || (p = t(a), u = t(c), p.length != u.length || p.some(function(m) {
          return !i(a[m], c[m], l);
        }))) return false;
        switch (h.slice(8, -1)) {
          case "Symbol":
            return a.valueOf() == c.valueOf();
          case "Date":
          case "Number":
            return +a == +c || +a != +a && +c != +c;
          case "RegExp":
          case "Function":
          case "String":
          case "Boolean":
            return "" + a == "" + c;
          case "Set":
          case "Map":
            p = a.entries(), u = c.entries();
            do
              if (!i((d = p.next()).value, u.next().value, l)) return false;
            while (!d.done);
            return true;
          case "ArrayBuffer":
            a = new Uint8Array(a), c = new Uint8Array(c);
          case "DataView":
            a = new Uint8Array(a.buffer), c = new Uint8Array(c.buffer);
          case "Float32Array":
          case "Float64Array":
          case "Int8Array":
          case "Int16Array":
          case "Int32Array":
          case "Uint8Array":
          case "Uint16Array":
          case "Uint32Array":
          case "Uint8ClampedArray":
          case "Arguments":
          case "Array":
            if (a.length != c.length) return false;
            for (d = 0; d < a.length; d++) if ((d in a || d in c) && (d in a != d in c || !i(a[d], c[d], l))) return false;
            return true;
          case "Object":
            return i(e(a), e(c), l);
          default:
            return false;
        }
      }, "n"))(o, s2, []);
    };
  }();
});
var qn = q((Gn) => {
  Object.defineProperty(Gn, "__esModule", { value: true });
  Gn.encodeString = mu;
  var le = Array.from({ length: 256 }, (r, e) => "%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase()), yu = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  function mu(r) {
    let e = r.length;
    if (e === 0)
      return "";
    let t = "", o = 0, s2 = 0;
    e: for (; s2 < e; s2++) {
      let i = r.charCodeAt(s2);
      for (; i < 128; ) {
        if (yu[i] !== 1 && (o < s2 && (t += r.slice(o, s2)), o = s2 + 1, t += le[i]), ++s2 === e)
          break e;
        i = r.charCodeAt(s2);
      }
      if (o < s2 && (t += r.slice(o, s2)), i < 2048) {
        o = s2 + 1, t += le[192 | i >> 6] + le[128 | i & 63];
        continue;
      }
      if (i < 55296 || i >= 57344) {
        o = s2 + 1, t += le[224 | i >> 12] + le[128 | i >> 6 & 63] + le[128 | i & 63];
        continue;
      }
      if (++s2, s2 >= e)
        throw new Error("URI malformed");
      let a = r.charCodeAt(s2) & 1023;
      o = s2 + 1, i = 65536 + ((i & 1023) << 10 | a), t += le[240 | i >> 18] + le[128 | i >> 12 & 63] + le[128 | i >> 6 & 63] + le[128 | i & 63];
    }
    return o === 0 ? r : o < e ? t + r.slice(o) : t;
  }
  n(mu, "encodeString");
});
var It = q((ce) => {
  Object.defineProperty(ce, "__esModule", { value: true });
  ce.defaultOptions = ce.defaultShouldSerializeObject = ce.defaultValueSerializer = void 0;
  var Bn = qn(), hu = /* @__PURE__ */ n((r) => {
    switch (typeof r) {
      case "string":
        return (0, Bn.encodeString)(r);
      case "bigint":
      case "boolean":
        return "" + r;
      case "number":
        if (Number.isFinite(r))
          return r < 1e21 ? "" + r : (0, Bn.encodeString)("" + r);
        break;
    }
    return r instanceof Date ? (0, Bn.encodeString)(r.toISOString()) : "";
  }, "defaultValueSerializer");
  ce.defaultValueSerializer = hu;
  var gu = /* @__PURE__ */ n((r) => r instanceof Date, "defaultShouldSerializeObject");
  ce.defaultShouldSerializeObject = gu;
  var Zi = /* @__PURE__ */ n((r) => r, "identityFunc");
  ce.defaultOptions = {
    nesting: true,
    nestingSyntax: "dot",
    arrayRepeat: false,
    arrayRepeatSyntax: "repeat",
    delimiter: 38,
    valueDeserializer: Zi,
    valueSerializer: ce.defaultValueSerializer,
    keyDeserializer: Zi,
    shouldSerializeObject: ce.defaultShouldSerializeObject
  };
});
var Vn = q((Ft) => {
  Object.defineProperty(Ft, "__esModule", { value: true });
  Ft.getDeepObject = Tu;
  Ft.stringifyObject = ea;
  var Ge = It(), Su = qn();
  function bu(r) {
    return r === "__proto__" || r === "constructor" || r === "prototype";
  }
  n(bu, "isPrototypeKey");
  function Tu(r, e, t, o, s2) {
    if (bu(e))
      return r;
    let i = r[e];
    return typeof i == "object" && i !== null ? i : !o && (s2 || typeof t == "number" || typeof t == "string" && t * 0 === 0 && t.indexOf(".") === -1) ? r[e] = [] : r[e] = {};
  }
  n(Tu, "getDeepObject");
  var Eu = 20, Ru = "[]", Au = "[", xu = "]", vu = ".";
  function ea(r, e, t = 0, o, s2) {
    let { nestingSyntax: i = Ge.defaultOptions.nestingSyntax, arrayRepeat: a = Ge.defaultOptions.arrayRepeat, arrayRepeatSyntax: c = Ge.defaultOptions.arrayRepeatSyntax, nesting: l = Ge.defaultOptions.nesting, delimiter: p = Ge.defaultOptions.delimiter, valueSerializer: u = Ge.defaultOptions.valueSerializer, shouldSerializeObject: d = Ge.defaultOptions.shouldSerializeObject } = e, h = typeof p == "number" ? String.fromCharCode(
      p
    ) : p, S2 = s2 === true && a, m = i === "dot" || i === "js" && !s2;
    if (t > Eu)
      return "";
    let T2 = "", y2 = true, R2 = false;
    for (let x2 in r) {
      let g = r[x2], b2;
      o ? (b2 = o, S2 ? c === "bracket" && (b2 += Ru) : m ? (b2 += vu, b2 += x2) : (b2 += Au, b2 += x2, b2 += xu)) : b2 = x2, y2 || (T2 += h), typeof g == "object" && g !== null && !d(g) ? (R2 = g.pop !== void 0, (l || a && R2) && (T2 += ea(g, e, t + 1, b2, R2))) : (T2 += (0, Su.encodeString)(b2), T2 += "=", T2 += u(g, x2)), y2 && (y2 = false);
    }
    return T2;
  }
  n(ea, "stringifyObject");
});
var na = q((zb, oa) => {
  var ra = 12, wu = 0, Hn = [
    // The first part of the table maps bytes to character to a transition.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    // The second part of the table maps a state to a new state when adding a
    // transition.
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    // The third part maps the current transition to a mask that needs to apply
    // to the byte.
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  function _u(r) {
    var e = r.indexOf("%");
    if (e === -1) return r;
    for (var t = r.length, o = "", s2 = 0, i = 0, a = e, c = ra; e > -1 && e < t; ) {
      var l = ta(r[e + 1], 4), p = ta(r[e + 2], 0), u = l | p, d = Hn[u];
      if (c = Hn[256 + c + d], i = i << 6 | u & Hn[364 + d], c === ra)
        o += r.slice(s2, a), o += i <= 65535 ? String.fromCharCode(i) : String.fromCharCode(
          55232 + (i >> 10),
          56320 + (i & 1023)
        ), i = 0, s2 = e + 3, e = a = r.indexOf("%", s2);
      else {
        if (c === wu)
          return null;
        if (e += 3, e < t && r.charCodeAt(e) === 37) continue;
        return null;
      }
    }
    return o + r.slice(s2);
  }
  n(_u, "decodeURIComponent");
  var Cu = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  function ta(r, e) {
    var t = Cu[r];
    return t === void 0 ? 255 : t << e;
  }
  n(ta, "hexCodeToInt");
  oa.exports = _u;
});
var la = q((he) => {
  var Pu = he && he.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(he, "__esModule", { value: true });
  he.numberValueDeserializer = he.numberKeyDeserializer = void 0;
  he.parse = Fu;
  var Dt = Vn(), qe = It(), sa = Pu(na()), Ou = /* @__PURE__ */ n((r) => {
    let e = Number(r);
    return Number.isNaN(e) ? r : e;
  }, "numberKeyDeserializer");
  he.numberKeyDeserializer = Ou;
  var Iu = /* @__PURE__ */ n((r) => {
    let e = Number(r);
    return Number.isNaN(e) ? r : e;
  }, "numberValueDeserializer");
  he.numberValueDeserializer = Iu;
  var ia = /\+/g, aa = /* @__PURE__ */ n(function() {
  }, "Empty");
  aa.prototype = /* @__PURE__ */ Object.create(null);
  function Nt(r, e, t, o, s2) {
    let i = r.substring(e, t);
    return o && (i = i.replace(ia, " ")), s2 && (i = (0, sa.default)(i) || i), i;
  }
  n(Nt, "computeKeySlice");
  function Fu(r, e) {
    let { valueDeserializer: t = qe.defaultOptions.valueDeserializer, keyDeserializer: o = qe.defaultOptions.keyDeserializer, arrayRepeatSyntax: s2 = qe.defaultOptions.arrayRepeatSyntax, nesting: i = qe.defaultOptions.nesting, arrayRepeat: a = qe.defaultOptions.arrayRepeat, nestingSyntax: c = qe.defaultOptions.nestingSyntax, delimiter: l = qe.defaultOptions.delimiter } = e ?? {}, p = typeof l == "string" ? l.charCodeAt(0) : l, u = c === "js", d = new aa();
    if (typeof r != "string")
      return d;
    let h = r.length, S2 = "", m = -1, T2 = -1, y2 = -1, R2 = d, x2, g = "", b2 = "", v2 = false, C2 = false, F = false, U2 = false, B = false, W2 = false, se = false, P2 = 0, D2 = -1, M2 = -1, L2 = -1;
    for (let N2 = 0; N2 < h + 1; N2++) {
      if (P2 = N2 !== h ? r.charCodeAt(N2) : p, P2 === p) {
        if (se = T2 > m, se || (T2 = N2), y2 !== T2 - 1 && (b2 = Nt(r, y2 + 1, D2 > -1 ? D2 : T2, F, v2), g = o(b2), x2 !== void 0 && (R2 = (0, Dt.getDeepObject)(
          R2,
          x2,
          g,
          u && B,
          u && W2
        ))), se || g !== "") {
          se && (S2 = r.slice(T2 + 1, N2), U2 && (S2 = S2.replace(ia, " ")), C2 && (S2 = (0, sa.default)(S2) || S2));
          let H2 = t(S2, g);
          if (a) {
            let re = R2[g];
            re === void 0 ? D2 > -1 ? R2[g] = [H2] : R2[g] = H2 : re.pop ? re.push(H2) : R2[g] = [re, H2];
          } else
            R2[g] = H2;
        }
        S2 = "", m = N2, T2 = N2, v2 = false, C2 = false, F = false, U2 = false, B = false, W2 = false, D2 = -1, y2 = N2, R2 = d, x2 = void 0, g = "";
      } else P2 === 93 ? (a && s2 === "bracket" && L2 === 91 && (D2 = M2), i && (c === "index" || u) && T2 <= m && (y2 !== M2 && (b2 = Nt(
        r,
        y2 + 1,
        N2,
        F,
        v2
      ), g = o(b2), x2 !== void 0 && (R2 = (0, Dt.getDeepObject)(R2, x2, g, void 0, u)), x2 = g, F = false, v2 = false), y2 = N2, W2 = true, B = false)) : P2 === 46 ? i && (c === "dot" || u) && T2 <= m && (y2 !== M2 && (b2 = Nt(r, y2 + 1, N2, F, v2), g = o(b2), x2 !== void 0 && (R2 = (0, Dt.getDeepObject)(
        R2,
        x2,
        g,
        u
      )), x2 = g, F = false, v2 = false), B = true, W2 = false, y2 = N2) : P2 === 91 ? i && (c === "index" || u) && T2 <= m && (y2 !== M2 && (b2 = Nt(
        r,
        y2 + 1,
        N2,
        F,
        v2
      ), g = o(b2), u && x2 !== void 0 && (R2 = (0, Dt.getDeepObject)(R2, x2, g, u)), x2 = g, F = false, v2 = false, B = false, W2 = true), y2 = N2) : P2 === 61 ? T2 <= m ? T2 = N2 : C2 = true : P2 === 43 ? T2 > m ? U2 = true : F = true : P2 === 37 && (T2 > m ? C2 = true : v2 = true);
      M2 = N2, L2 = P2;
    }
    return d;
  }
  n(Fu, "parse");
});
var ca = q((zn) => {
  Object.defineProperty(zn, "__esModule", { value: true });
  zn.stringify = Nu;
  var Du = Vn();
  function Nu(r, e) {
    if (r === null || typeof r != "object")
      return "";
    let t = e ?? {};
    return (0, Du.stringifyObject)(r, t);
  }
  n(Nu, "stringify");
});
var kt = q((ne) => {
  var ku = ne && ne.__createBinding || (Object.create ? function(r, e, t, o) {
    o === void 0 && (o = t);
    var s2 = Object.getOwnPropertyDescriptor(e, t);
    (!s2 || ("get" in s2 ? !e.__esModule : s2.writable || s2.configurable)) && (s2 = { enumerable: true, get: /* @__PURE__ */ n(function() {
      return e[t];
    }, "get") }), Object.defineProperty(r, o, s2);
  } : function(r, e, t, o) {
    o === void 0 && (o = t), r[o] = e[t];
  }), Lu = ne && ne.__exportStar || function(r, e) {
    for (var t in r) t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && ku(e, r, t);
  };
  Object.defineProperty(ne, "__esModule", { value: true });
  ne.stringify = ne.parse = void 0;
  var ju = la();
  Object.defineProperty(ne, "parse", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ju.parse;
  }, "get") });
  var Mu = ca();
  Object.defineProperty(ne, "stringify", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return Mu.stringify;
  }, "get") });
  Lu(It(), ne);
});
var Kn = q((lT, zu) => {
  zu.exports = {
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    amp: "&",
    AMP: "&",
    andand: "⩕",
    And: "⩓",
    and: "∧",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angmsd: "∡",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    apacir: "⩯",
    ap: "≈",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    barwed: "⌅",
    Barwed: "⌆",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    because: "∵",
    Because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxdl: "┐",
    boxdL: "╕",
    boxDl: "╖",
    boxDL: "╗",
    boxdr: "┌",
    boxdR: "╒",
    boxDr: "╓",
    boxDR: "╔",
    boxh: "─",
    boxH: "═",
    boxhd: "┬",
    boxHd: "╤",
    boxhD: "╥",
    boxHD: "╦",
    boxhu: "┴",
    boxHu: "╧",
    boxhU: "╨",
    boxHU: "╩",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxul: "┘",
    boxuL: "╛",
    boxUl: "╜",
    boxUL: "╝",
    boxur: "└",
    boxuR: "╘",
    boxUr: "╙",
    boxUR: "╚",
    boxv: "│",
    boxV: "║",
    boxvh: "┼",
    boxvH: "╪",
    boxVh: "╫",
    boxVH: "╬",
    boxvl: "┤",
    boxvL: "╡",
    boxVl: "╢",
    boxVL: "╣",
    boxvr: "├",
    boxvR: "╞",
    boxVr: "╟",
    boxVR: "╠",
    bprime: "‵",
    breve: "˘",
    Breve: "˘",
    brvbar: "¦",
    bscr: "𝒷",
    Bscr: "ℬ",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsolb: "⧅",
    bsol: "\\",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    cap: "∩",
    Cap: "⋒",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    centerdot: "·",
    CenterDot: "·",
    cfr: "𝔠",
    Cfr: "ℭ",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cir: "○",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    colon: ":",
    Colon: "∷",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    conint: "∮",
    Conint: "∯",
    ContourIntegral: "∮",
    copf: "𝕔",
    Copf: "ℂ",
    coprod: "∐",
    Coproduct: "∐",
    copy: "©",
    COPY: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    cross: "✗",
    Cross: "⨯",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    cupbrcap: "⩈",
    cupcap: "⩆",
    CupCap: "≍",
    cup: "∪",
    Cup: "⋓",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    dagger: "†",
    Dagger: "‡",
    daleth: "ℸ",
    darr: "↓",
    Darr: "↡",
    dArr: "⇓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    ddagger: "‡",
    ddarr: "⇊",
    DD: "ⅅ",
    dd: "ⅆ",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    diamond: "⋄",
    Diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrowBar: "⤓",
    downarrow: "↓",
    DownArrow: "↓",
    Downarrow: "⇓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVectorBar: "⥖",
    DownLeftVector: "↽",
    DownRightTeeVector: "⥟",
    DownRightVectorBar: "⥗",
    DownRightVector: "⇁",
    DownTeeArrow: "↧",
    DownTee: "⊤",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    Ecirc: "Ê",
    ecirc: "ê",
    ecir: "≖",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    edot: "ė",
    eDot: "≑",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp13: " ",
    emsp14: " ",
    emsp: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    escr: "ℯ",
    Escr: "ℰ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    exponentiale: "ⅇ",
    ExponentialE: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    forall: "∀",
    ForAll: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    fscr: "𝒻",
    Fscr: "ℱ",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    ge: "≥",
    gE: "≧",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    gescc: "⪩",
    ges: "⩾",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    gg: "≫",
    Gg: "⋙",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gla: "⪥",
    gl: "≷",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gne: "⪈",
    gnE: "≩",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    gtcc: "⪧",
    gtcir: "⩺",
    gt: ">",
    GT: ">",
    Gt: "≫",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    harrcir: "⥈",
    harr: "↔",
    hArr: "⇔",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    hfr: "𝔥",
    Hfr: "ℌ",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    hopf: "𝕙",
    Hopf: "ℍ",
    horbar: "―",
    HorizontalLine: "─",
    hscr: "𝒽",
    Hscr: "ℋ",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    ifr: "𝔦",
    Ifr: "ℑ",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    Im: "ℑ",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    incare: "℅",
    in: "∈",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    intcal: "⊺",
    int: "∫",
    Int: "∬",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    iscr: "𝒾",
    Iscr: "ℐ",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    lang: "⟨",
    Lang: "⟪",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    larrb: "⇤",
    larrbfs: "⤟",
    larr: "←",
    Larr: "↞",
    lArr: "⇐",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    latail: "⤙",
    lAtail: "⤛",
    lat: "⪫",
    late: "⪭",
    lates: "⪭︀",
    lbarr: "⤌",
    lBarr: "⤎",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    le: "≤",
    lE: "≦",
    LeftAngleBracket: "⟨",
    LeftArrowBar: "⇤",
    leftarrow: "←",
    LeftArrow: "←",
    Leftarrow: "⇐",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVectorBar: "⥙",
    LeftDownVector: "⇃",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    leftrightarrow: "↔",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTeeArrow: "↤",
    LeftTee: "⊣",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangleBar: "⧏",
    LeftTriangle: "⊲",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVectorBar: "⥘",
    LeftUpVector: "↿",
    LeftVectorBar: "⥒",
    LeftVector: "↼",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    lescc: "⪨",
    les: "⩽",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    llarr: "⇇",
    ll: "≪",
    Ll: "⋘",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoustache: "⎰",
    lmoust: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lne: "⪇",
    lnE: "≨",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    longleftarrow: "⟵",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftrightarrow: "⟷",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longmapsto: "⟼",
    longrightarrow: "⟶",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    lscr: "𝓁",
    Lscr: "ℒ",
    lsh: "↰",
    Lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    ltcc: "⪦",
    ltcir: "⩹",
    lt: "<",
    LT: "<",
    Lt: "≪",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    midast: "*",
    midcir: "⫰",
    mid: "∣",
    middot: "·",
    minusb: "⊟",
    minus: "−",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    mscr: "𝓂",
    Mscr: "ℳ",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natural: "♮",
    naturals: "ℕ",
    natur: "♮",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    nearhk: "⤤",
    nearr: "↗",
    neArr: "⇗",
    nearrow: "↗",
    ne: "≠",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: `
`,
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nharr: "↮",
    nhArr: "⇎",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlarr: "↚",
    nlArr: "⇍",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nleftarrow: "↚",
    nLeftarrow: "⇍",
    nleftrightarrow: "↮",
    nLeftrightarrow: "⇎",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    nopf: "𝕟",
    Nopf: "ℕ",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangle: "⋪",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangle: "⋫",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    nparallel: "∦",
    npar: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    nprec: "⊀",
    npreceq: "⪯̸",
    npre: "⪯̸",
    nrarrc: "⤳̸",
    nrarr: "↛",
    nrArr: "⇏",
    nrarrw: "↝̸",
    nrightarrow: "↛",
    nRightarrow: "⇏",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nvdash: "⊬",
    nvDash: "⊭",
    nVdash: "⊮",
    nVDash: "⊯",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwarr: "↖",
    nwArr: "⇖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    Ocirc: "Ô",
    ocirc: "ô",
    ocir: "⊚",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    orarr: "↻",
    Or: "⩔",
    or: "∨",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    otimesas: "⨶",
    Otimes: "⨷",
    otimes: "⊗",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    para: "¶",
    parallel: "∥",
    par: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plus: "+",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    popf: "𝕡",
    Popf: "ℙ",
    pound: "£",
    prap: "⪷",
    Pr: "⪻",
    pr: "≺",
    prcue: "≼",
    precapprox: "⪷",
    prec: "≺",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    pre: "⪯",
    prE: "⪳",
    precsim: "≾",
    prime: "′",
    Prime: "″",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportional: "∝",
    Proportion: "∷",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    qopf: "𝕢",
    Qopf: "ℚ",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    quot: '"',
    QUOT: '"',
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    rang: "⟩",
    Rang: "⟫",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarr: "→",
    Rarr: "↠",
    rArr: "⇒",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    ratail: "⤚",
    rAtail: "⤜",
    ratio: "∶",
    rationals: "ℚ",
    rbarr: "⤍",
    rBarr: "⤏",
    RBarr: "⤐",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    Re: "ℜ",
    rect: "▭",
    reg: "®",
    REG: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    rfr: "𝔯",
    Rfr: "ℜ",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrowBar: "⇥",
    rightarrow: "→",
    RightArrow: "→",
    Rightarrow: "⇒",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVectorBar: "⥕",
    RightDownVector: "⇂",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTeeArrow: "↦",
    RightTee: "⊢",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangleBar: "⧐",
    RightTriangle: "⊳",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVectorBar: "⥔",
    RightUpVector: "↾",
    RightVectorBar: "⥓",
    RightVector: "⇀",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoustache: "⎱",
    rmoust: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    ropf: "𝕣",
    Ropf: "ℝ",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    rscr: "𝓇",
    Rscr: "ℛ",
    rsh: "↱",
    Rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    Sc: "⪼",
    sc: "≻",
    sccue: "≽",
    sce: "⪰",
    scE: "⪴",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdotb: "⊡",
    sdot: "⋅",
    sdote: "⩦",
    searhk: "⤥",
    searr: "↘",
    seArr: "⇘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    solbar: "⌿",
    solb: "⧄",
    sol: "/",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    square: "□",
    Square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squ: "□",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    sub: "⊂",
    Sub: "⋐",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    subset: "⊂",
    Subset: "⋐",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succapprox: "⪸",
    succ: "≻",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    sum: "∑",
    Sum: "∑",
    sung: "♪",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    sup: "⊃",
    Sup: "⋑",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    supset: "⊃",
    Supset: "⋑",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swarr: "↙",
    swArr: "⇙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "	",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    therefore: "∴",
    Therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    ThinSpace: " ",
    thinsp: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    tilde: "˜",
    Tilde: "∼",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    timesbar: "⨱",
    timesb: "⊠",
    times: "×",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    topbot: "⌶",
    topcir: "⫱",
    top: "⊤",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    trade: "™",
    TRADE: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    uarr: "↑",
    Uarr: "↟",
    uArr: "⇑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrowBar: "⤒",
    uparrow: "↑",
    UpArrow: "↑",
    Uparrow: "⇑",
    UpArrowDownArrow: "⇅",
    updownarrow: "↕",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    upsi: "υ",
    Upsi: "ϒ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTeeArrow: "↥",
    UpTee: "⊥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    varr: "↕",
    vArr: "⇕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    vBar: "⫨",
    Vbar: "⫫",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    vdash: "⊢",
    vDash: "⊨",
    Vdash: "⊩",
    VDash: "⊫",
    Vdashl: "⫦",
    veebar: "⊻",
    vee: "∨",
    Vee: "⋁",
    veeeq: "≚",
    vellip: "⋮",
    verbar: "|",
    Verbar: "‖",
    vert: "|",
    Vert: "‖",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    wedge: "∧",
    Wedge: "⋀",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xharr: "⟷",
    xhArr: "⟺",
    Xi: "Ξ",
    xi: "ξ",
    xlarr: "⟵",
    xlArr: "⟸",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrarr: "⟶",
    xrArr: "⟹",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    yuml: "ÿ",
    Yuml: "Ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    zfr: "𝔷",
    Zfr: "ℨ",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    zopf: "𝕫",
    Zopf: "ℤ",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "‍",
    zwnj: "‌"
  };
});
var ha = q((cT, Wu) => {
  Wu.exports = {
    Aacute: "Á",
    aacute: "á",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    AElig: "Æ",
    aelig: "æ",
    Agrave: "À",
    agrave: "à",
    amp: "&",
    AMP: "&",
    Aring: "Å",
    aring: "å",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    brvbar: "¦",
    Ccedil: "Ç",
    ccedil: "ç",
    cedil: "¸",
    cent: "¢",
    copy: "©",
    COPY: "©",
    curren: "¤",
    deg: "°",
    divide: "÷",
    Eacute: "É",
    eacute: "é",
    Ecirc: "Ê",
    ecirc: "ê",
    Egrave: "È",
    egrave: "è",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    frac12: "½",
    frac14: "¼",
    frac34: "¾",
    gt: ">",
    GT: ">",
    Iacute: "Í",
    iacute: "í",
    Icirc: "Î",
    icirc: "î",
    iexcl: "¡",
    Igrave: "Ì",
    igrave: "ì",
    iquest: "¿",
    Iuml: "Ï",
    iuml: "ï",
    laquo: "«",
    lt: "<",
    LT: "<",
    macr: "¯",
    micro: "µ",
    middot: "·",
    nbsp: " ",
    not: "¬",
    Ntilde: "Ñ",
    ntilde: "ñ",
    Oacute: "Ó",
    oacute: "ó",
    Ocirc: "Ô",
    ocirc: "ô",
    Ograve: "Ò",
    ograve: "ò",
    ordf: "ª",
    ordm: "º",
    Oslash: "Ø",
    oslash: "ø",
    Otilde: "Õ",
    otilde: "õ",
    Ouml: "Ö",
    ouml: "ö",
    para: "¶",
    plusmn: "±",
    pound: "£",
    quot: '"',
    QUOT: '"',
    raquo: "»",
    reg: "®",
    REG: "®",
    sect: "§",
    shy: "­",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    szlig: "ß",
    THORN: "Þ",
    thorn: "þ",
    times: "×",
    Uacute: "Ú",
    uacute: "ú",
    Ucirc: "Û",
    ucirc: "û",
    Ugrave: "Ù",
    ugrave: "ù",
    uml: "¨",
    Uuml: "Ü",
    uuml: "ü",
    Yacute: "Ý",
    yacute: "ý",
    yen: "¥",
    yuml: "ÿ"
  };
});
var Xn = q((pT, $u) => {
  $u.exports = { amp: "&", apos: "'", gt: ">", lt: "<", quot: '"' };
});
var ga = q((dT, Yu) => {
  Yu.exports = {
    "0": 65533,
    "128": 8364,
    "130": 8218,
    "131": 402,
    "132": 8222,
    "133": 8230,
    "134": 8224,
    "135": 8225,
    "136": 710,
    "137": 8240,
    "138": 352,
    "139": 8249,
    "140": 338,
    "142": 381,
    "145": 8216,
    "146": 8217,
    "147": 8220,
    "148": 8221,
    "149": 8226,
    "150": 8211,
    "151": 8212,
    "152": 732,
    "153": 8482,
    "154": 353,
    "155": 8250,
    "156": 339,
    "158": 382,
    "159": 376
  };
});
var ba = q((zr) => {
  var Ku = zr && zr.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(zr, "__esModule", { value: true });
  var Sa = Ku(ga()), Xu = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.fromCodePoint || function(r) {
      var e = "";
      return r > 65535 && (r -= 65536, e += String.fromCharCode(r >>> 10 & 1023 | 55296), r = 56320 | r & 1023), e += String.fromCharCode(r), e;
    }
  );
  function Ju(r) {
    return r >= 55296 && r <= 57343 || r > 1114111 ? "�" : (r in Sa.default && (r = Sa.default[r]), Xu(r));
  }
  n(Ju, "decodeCodePoint");
  zr.default = Ju;
});
var Qn = q((pe) => {
  var Lt = pe && pe.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(pe, "__esModule", { value: true });
  pe.decodeHTML = pe.decodeHTMLStrict = pe.decodeXML = void 0;
  var Jn = Lt(Kn()), Qu = Lt(ha()), Zu = Lt(Xn()), Ta = Lt(ba()), ef = /&(?:[a-zA-Z0-9]+|#[xX][\da-fA-F]+|#\d+);/g;
  pe.decodeXML = Ra(Zu.default);
  pe.decodeHTMLStrict = Ra(Jn.default);
  function Ra(r) {
    var e = Aa(r);
    return function(t) {
      return String(t).replace(ef, e);
    };
  }
  n(Ra, "getStrictDecoder");
  var Ea = /* @__PURE__ */ n(function(r, e) {
    return r < e ? 1 : -1;
  }, "sorter");
  pe.decodeHTML = function() {
    for (var r = Object.keys(Qu.default).sort(Ea), e = Object.keys(Jn.default).sort(Ea), t = 0, o = 0; t < e.length; t++)
      r[o] === e[t] ? (e[t] += ";?", o++) : e[t] += ";";
    var s2 = new RegExp("&(?:" + e.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), i = Aa(Jn.default);
    function a(c) {
      return c.substr(-1) !== ";" && (c += ";"), i(c);
    }
    return n(a, "replacer"), function(c) {
      return String(c).replace(s2, a);
    };
  }();
  function Aa(r) {
    return /* @__PURE__ */ n(function(t) {
      if (t.charAt(1) === "#") {
        var o = t.charAt(2);
        return o === "X" || o === "x" ? Ta.default(parseInt(t.substr(3), 16)) : Ta.default(parseInt(t.substr(2), 10));
      }
      return r[t.slice(1, -1)] || t;
    }, "replace");
  }
  n(Aa, "getReplacer");
});
var es = q((J) => {
  var xa = J && J.__importDefault || function(r) {
    return r && r.__esModule ? r : { default: r };
  };
  Object.defineProperty(J, "__esModule", { value: true });
  J.escapeUTF8 = J.escape = J.encodeNonAsciiHTML = J.encodeHTML = J.encodeXML = void 0;
  var rf = xa(Xn()), va = _a(rf.default), wa = Ca(va);
  J.encodeXML = Ia(va);
  var tf = xa(Kn()), Zn = _a(tf.default), of = Ca(Zn);
  J.encodeHTML = sf(Zn, of);
  J.encodeNonAsciiHTML = Ia(Zn);
  function _a(r) {
    return Object.keys(r).sort().reduce(function(e, t) {
      return e[r[t]] = "&" + t + ";", e;
    }, {});
  }
  n(_a, "getInverseObj");
  function Ca(r) {
    for (var e = [], t = [], o = 0, s2 = Object.keys(r); o < s2.length; o++) {
      var i = s2[o];
      i.length === 1 ? e.push("\\" + i) : t.push(i);
    }
    e.sort();
    for (var a = 0; a < e.length - 1; a++) {
      for (var c = a; c < e.length - 1 && e[c].charCodeAt(1) + 1 === e[c + 1].charCodeAt(1); )
        c += 1;
      var l = 1 + c - a;
      l < 3 || e.splice(a, l, e[a] + "-" + e[c]);
    }
    return t.unshift("[" + e.join("") + "]"), new RegExp(t.join("|"), "g");
  }
  n(Ca, "getInverseReplacer");
  var Pa = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, nf = (
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    String.prototype.codePointAt != null ? (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      function(r) {
        return r.codePointAt(0);
      }
    ) : (
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      function(r) {
        return (r.charCodeAt(0) - 55296) * 1024 + r.charCodeAt(1) - 56320 + 65536;
      }
    )
  );
  function jt(r) {
    return "&#x" + (r.length > 1 ? nf(r) : r.charCodeAt(0)).toString(16).toUpperCase() + ";";
  }
  n(jt, "singleCharReplacer");
  function sf(r, e) {
    return function(t) {
      return t.replace(e, function(o) {
        return r[o];
      }).replace(Pa, jt);
    };
  }
  n(sf, "getInverse");
  var Oa = new RegExp(wa.source + "|" + Pa.source, "g");
  function af(r) {
    return r.replace(Oa, jt);
  }
  n(af, "escape");
  J.escape = af;
  function lf(r) {
    return r.replace(wa, jt);
  }
  n(lf, "escapeUTF8");
  J.escapeUTF8 = lf;
  function Ia(r) {
    return function(e) {
      return e.replace(Oa, function(t) {
        return r[t] || jt(t);
      });
    };
  }
  n(Ia, "getASCIIEncoder");
});
var Da = q((O2) => {
  Object.defineProperty(O2, "__esModule", { value: true });
  O2.decodeXMLStrict = O2.decodeHTML5Strict = O2.decodeHTML4Strict = O2.decodeHTML5 = O2.decodeHTML4 = O2.decodeHTMLStrict = O2.decodeHTML = O2.decodeXML = O2.encodeHTML5 = O2.encodeHTML4 = O2.escapeUTF8 = O2.escape = O2.encodeNonAsciiHTML = O2.encodeHTML = O2.encodeXML = O2.encode = O2.decodeStrict = O2.decode = void 0;
  var Mt = Qn(), Fa = es();
  function cf(r, e) {
    return (!e || e <= 0 ? Mt.decodeXML : Mt.decodeHTML)(r);
  }
  n(cf, "decode");
  O2.decode = cf;
  function pf(r, e) {
    return (!e || e <= 0 ? Mt.decodeXML : Mt.decodeHTMLStrict)(r);
  }
  n(pf, "decodeStrict");
  O2.decodeStrict = pf;
  function df(r, e) {
    return (!e || e <= 0 ? Fa.encodeXML : Fa.encodeHTML)(r);
  }
  n(df, "encode");
  O2.encode = df;
  var Ve = es();
  Object.defineProperty(O2, "encodeXML", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return Ve.encodeXML;
  }, "get") });
  Object.defineProperty(O2, "encodeHTML", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return Ve.encodeHTML;
  }, "get") });
  Object.defineProperty(O2, "encodeNonAsciiHTML", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return Ve.encodeNonAsciiHTML;
  }, "get") });
  Object.defineProperty(O2, "escape", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return Ve.escape;
  }, "get") });
  Object.defineProperty(O2, "escapeUTF8", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return Ve.escapeUTF8;
  }, "get") });
  Object.defineProperty(O2, "encodeHTML4", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return Ve.encodeHTML;
  }, "get") });
  Object.defineProperty(O2, "encodeHTML5", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return Ve.encodeHTML;
  }, "get") });
  var ve = Qn();
  Object.defineProperty(O2, "decodeXML", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ve.decodeXML;
  }, "get") });
  Object.defineProperty(O2, "decodeHTML", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ve.decodeHTML;
  }, "get") });
  Object.defineProperty(O2, "decodeHTMLStrict", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ve.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O2, "decodeHTML4", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ve.decodeHTML;
  }, "get") });
  Object.defineProperty(O2, "decodeHTML5", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ve.decodeHTML;
  }, "get") });
  Object.defineProperty(O2, "decodeHTML4Strict", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ve.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O2, "decodeHTML5Strict", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ve.decodeHTMLStrict;
  }, "get") });
  Object.defineProperty(O2, "decodeXMLStrict", { enumerable: true, get: /* @__PURE__ */ n(function() {
    return ve.decodeXML;
  }, "get") });
});
var Ha = q((TT, Va) => {
  function uf(r, e) {
    if (!(r instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  n(uf, "_classCallCheck");
  function Na(r, e) {
    for (var t = 0; t < e.length; t++) {
      var o = e[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(r, o.key, o);
    }
  }
  n(Na, "_defineProperties");
  function ff(r, e, t) {
    return e && Na(r.prototype, e), t && Na(r, t), r;
  }
  n(ff, "_createClass");
  function Ga(r, e) {
    var t = typeof Symbol < "u" && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = yf(r)) || e && r && typeof r.length == "number") {
        t && (r = t);
        var o = 0, s2 = /* @__PURE__ */ n(function() {
        }, "F");
        return { s: s2, n: /* @__PURE__ */ n(function() {
          return o >= r.length ? { done: true } : { done: false, value: r[o++] };
        }, "n"), e: /* @__PURE__ */ n(function(p) {
          throw p;
        }, "e"), f: s2 };
      }
      throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var i = true, a = false, c;
    return { s: /* @__PURE__ */ n(function() {
      t = t.call(r);
    }, "s"), n: /* @__PURE__ */ n(function() {
      var p = t.next();
      return i = p.done, p;
    }, "n"), e: /* @__PURE__ */ n(function(p) {
      a = true, c = p;
    }, "e"), f: /* @__PURE__ */ n(function() {
      try {
        !i && t.return != null && t.return();
      } finally {
        if (a) throw c;
      }
    }, "f") };
  }
  n(Ga, "_createForOfIteratorHelper");
  function yf(r, e) {
    if (r) {
      if (typeof r == "string") return ka(r, e);
      var t = Object.prototype.toString.call(r).slice(8, -1);
      if (t === "Object" && r.constructor && (t = r.constructor.name), t === "Map" || t === "Set") return Array.from(r);
      if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return ka(r, e);
    }
  }
  n(yf, "_unsupportedIterableToArray");
  function ka(r, e) {
    (e == null || e > r.length) && (e = r.length);
    for (var t = 0, o = new Array(e); t < e; t++)
      o[t] = r[t];
    return o;
  }
  n(ka, "_arrayLikeToArray");
  var mf = Da(), La = {
    fg: "#FFF",
    bg: "#000",
    newline: false,
    escapeXML: false,
    stream: false,
    colors: hf()
  };
  function hf() {
    var r = {
      0: "#000",
      1: "#A00",
      2: "#0A0",
      3: "#A50",
      4: "#00A",
      5: "#A0A",
      6: "#0AA",
      7: "#AAA",
      8: "#555",
      9: "#F55",
      10: "#5F5",
      11: "#FF5",
      12: "#55F",
      13: "#F5F",
      14: "#5FF",
      15: "#FFF"
    };
    return Ut(0, 5).forEach(function(e) {
      Ut(0, 5).forEach(function(t) {
        Ut(0, 5).forEach(function(o) {
          return gf(e, t, o, r);
        });
      });
    }), Ut(0, 23).forEach(function(e) {
      var t = e + 232, o = qa(e * 10 + 8);
      r[t] = "#" + o + o + o;
    }), r;
  }
  n(hf, "getDefaultColors");
  function gf(r, e, t, o) {
    var s2 = 16 + r * 36 + e * 6 + t, i = r > 0 ? r * 40 + 55 : 0, a = e > 0 ? e * 40 + 55 : 0, c = t > 0 ? t * 40 + 55 : 0;
    o[s2] = Sf([i, a, c]);
  }
  n(gf, "setStyleColor");
  function qa(r) {
    for (var e = r.toString(16); e.length < 2; )
      e = "0" + e;
    return e;
  }
  n(qa, "toHexString");
  function Sf(r) {
    var e = [], t = Ga(r), o;
    try {
      for (t.s(); !(o = t.n()).done; ) {
        var s2 = o.value;
        e.push(qa(s2));
      }
    } catch (i) {
      t.e(i);
    } finally {
      t.f();
    }
    return "#" + e.join("");
  }
  n(Sf, "toColorHexString");
  function ja(r, e, t, o) {
    var s2;
    return e === "text" ? s2 = Rf(t, o) : e === "display" ? s2 = Tf(r, t, o) : e === "xterm256Foreground" ? s2 = qt(r, o.colors[t]) : e === "xterm256Background" ? s2 = Bt(r, o.colors[t]) : e === "rgb" && (s2 = bf(r, t)), s2;
  }
  n(ja, "generateOutput");
  function bf(r, e) {
    e = e.substring(2).slice(0, -1);
    var t = +e.substr(0, 2), o = e.substring(5).split(";"), s2 = o.map(function(i) {
      return ("0" + Number(i).toString(16)).substr(-2);
    }).join("");
    return Gt(r, (t === 38 ? "color:#" : "background-color:#") + s2);
  }
  n(bf, "handleRgb");
  function Tf(r, e, t) {
    e = parseInt(e, 10);
    var o = {
      "-1": /* @__PURE__ */ n(function() {
        return "<br/>";
      }, "_"),
      0: /* @__PURE__ */ n(function() {
        return r.length && Ba(r);
      }, "_"),
      1: /* @__PURE__ */ n(function() {
        return we(r, "b");
      }, "_"),
      3: /* @__PURE__ */ n(function() {
        return we(r, "i");
      }, "_"),
      4: /* @__PURE__ */ n(function() {
        return we(r, "u");
      }, "_"),
      8: /* @__PURE__ */ n(function() {
        return Gt(r, "display:none");
      }, "_"),
      9: /* @__PURE__ */ n(function() {
        return we(r, "strike");
      }, "_"),
      22: /* @__PURE__ */ n(function() {
        return Gt(r, "font-weight:normal;text-decoration:none;font-style:normal");
      }, "_"),
      23: /* @__PURE__ */ n(function() {
        return Ua(r, "i");
      }, "_"),
      24: /* @__PURE__ */ n(function() {
        return Ua(r, "u");
      }, "_"),
      39: /* @__PURE__ */ n(function() {
        return qt(r, t.fg);
      }, "_"),
      49: /* @__PURE__ */ n(function() {
        return Bt(r, t.bg);
      }, "_"),
      53: /* @__PURE__ */ n(function() {
        return Gt(r, "text-decoration:overline");
      }, "_")
    }, s2;
    return o[e] ? s2 = o[e]() : 4 < e && e < 7 ? s2 = we(r, "blink") : 29 < e && e < 38 ? s2 = qt(r, t.colors[e - 30]) : 39 < e && e < 48 ? s2 = Bt(r, t.colors[e - 40]) : 89 < e && e < 98 ? s2 = qt(r, t.colors[8 + (e - 90)]) : 99 < e && e < 108 && (s2 = Bt(r, t.colors[8 + (e - 100)])), s2;
  }
  n(Tf, "handleDisplay");
  function Ba(r) {
    var e = r.slice(0);
    return r.length = 0, e.reverse().map(function(t) {
      return "</" + t + ">";
    }).join("");
  }
  n(Ba, "resetStyles");
  function Ut(r, e) {
    for (var t = [], o = r; o <= e; o++)
      t.push(o);
    return t;
  }
  n(Ut, "range");
  function Ef(r) {
    return function(e) {
      return (r === null || e.category !== r) && r !== "all";
    };
  }
  n(Ef, "notCategory");
  function Ma(r) {
    r = parseInt(r, 10);
    var e = null;
    return r === 0 ? e = "all" : r === 1 ? e = "bold" : 2 < r && r < 5 ? e = "underline" : 4 < r && r < 7 ? e = "blink" : r === 8 ? e = "hide" : r === 9 ? e = "strike" : 29 < r && r < 38 || r === 39 || 89 < r && r < 98 ? e = "foreground-color" : (39 < r && r < 48 || r === 49 || 99 < r && r < 108) && (e = "background-color"), e;
  }
  n(Ma, "categoryForCode");
  function Rf(r, e) {
    return e.escapeXML ? mf.encodeXML(r) : r;
  }
  n(Rf, "pushText");
  function we(r, e, t) {
    return t || (t = ""), r.push(e), "<".concat(e).concat(t ? ' style="'.concat(t, '"') : "", ">");
  }
  n(we, "pushTag");
  function Gt(r, e) {
    return we(r, "span", e);
  }
  n(Gt, "pushStyle");
  function qt(r, e) {
    return we(r, "span", "color:" + e);
  }
  n(qt, "pushForegroundColor");
  function Bt(r, e) {
    return we(r, "span", "background-color:" + e);
  }
  n(Bt, "pushBackgroundColor");
  function Ua(r, e) {
    var t;
    if (r.slice(-1)[0] === e && (t = r.pop()), t)
      return "</" + e + ">";
  }
  n(Ua, "closeTag");
  function Af(r, e, t) {
    var o = false, s2 = 3;
    function i() {
      return "";
    }
    n(i, "remove");
    function a(v2, C2) {
      return t("xterm256Foreground", C2), "";
    }
    n(a, "removeXterm256Foreground");
    function c(v2, C2) {
      return t("xterm256Background", C2), "";
    }
    n(c, "removeXterm256Background");
    function l(v2) {
      return e.newline ? t("display", -1) : t("text", v2), "";
    }
    n(l, "newline");
    function p(v2, C2) {
      o = true, C2.trim().length === 0 && (C2 = "0"), C2 = C2.trimRight(";").split(";");
      var F = Ga(C2), U2;
      try {
        for (F.s(); !(U2 = F.n()).done; ) {
          var B = U2.value;
          t("display", B);
        }
      } catch (W2) {
        F.e(W2);
      } finally {
        F.f();
      }
      return "";
    }
    n(p, "ansiMess");
    function u(v2) {
      return t("text", v2), "";
    }
    n(u, "realText");
    function d(v2) {
      return t("rgb", v2), "";
    }
    n(d, "rgb");
    var h = [{
      pattern: /^\x08+/,
      sub: i
    }, {
      pattern: /^\x1b\[[012]?K/,
      sub: i
    }, {
      pattern: /^\x1b\[\(B/,
      sub: i
    }, {
      pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/,
      sub: d
    }, {
      pattern: /^\x1b\[38;5;(\d+)m/,
      sub: a
    }, {
      pattern: /^\x1b\[48;5;(\d+)m/,
      sub: c
    }, {
      pattern: /^\n/,
      sub: l
    }, {
      pattern: /^\r+\n/,
      sub: l
    }, {
      pattern: /^\r/,
      sub: l
    }, {
      pattern: /^\x1b\[((?:\d{1,3};?)+|)m/,
      sub: p
    }, {
      // CSI n J
      // ED - Erase in Display Clears part of the screen.
      // If n is 0 (or missing), clear from cursor to end of screen.
      // If n is 1, clear from cursor to beginning of the screen.
      // If n is 2, clear entire screen (and moves cursor to upper left on DOS ANSI.SYS).
      // If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
      //   (this feature was added for xterm and is supported by other terminal applications).
      pattern: /^\x1b\[\d?J/,
      sub: i
    }, {
      // CSI n ; m f
      // HVP - Horizontal Vertical Position Same as CUP
      pattern: /^\x1b\[\d{0,3};\d{0,3}f/,
      sub: i
    }, {
      // catch-all for CSI sequences?
      pattern: /^\x1b\[?[\d;]{0,3}/,
      sub: i
    }, {
      /**
       * extracts real text - not containing:
       * - `\x1b' - ESC - escape (Ascii 27)
       * - '\x08' - BS - backspace (Ascii 8)
       * - `\n` - Newline - linefeed (LF) (ascii 10)
       * - `\r` - Windows Carriage Return (CR)
       */
      pattern: /^(([^\x1b\x08\r\n])+)/,
      sub: u
    }];
    function S2(v2, C2) {
      C2 > s2 && o || (o = false, r = r.replace(v2.pattern, v2.sub));
    }
    n(S2, "process");
    var m = [], T2 = r, y2 = T2.length;
    e: for (; y2 > 0; ) {
      for (var R2 = 0, x2 = 0, g = h.length; x2 < g; R2 = ++x2) {
        var b2 = h[R2];
        if (S2(b2, R2), r.length !== y2) {
          y2 = r.length;
          continue e;
        }
      }
      if (r.length === y2)
        break;
      m.push(0), y2 = r.length;
    }
    return m;
  }
  n(Af, "tokenize");
  function xf(r, e, t) {
    return e !== "text" && (r = r.filter(Ef(Ma(t))), r.push({
      token: e,
      data: t,
      category: Ma(t)
    })), r;
  }
  n(xf, "updateStickyStack");
  var vf = /* @__PURE__ */ function() {
    function r(e) {
      uf(this, r), e = e || {}, e.colors && (e.colors = Object.assign({}, La.colors, e.colors)), this.options = Object.assign({}, La, e), this.stack = [], this.stickyStack = [];
    }
    return n(r, "Filter"), ff(r, [{
      key: "toHtml",
      value: /* @__PURE__ */ n(function(t) {
        var o = this;
        t = typeof t == "string" ? [t] : t;
        var s2 = this.stack, i = this.options, a = [];
        return this.stickyStack.forEach(function(c) {
          var l = ja(s2, c.token, c.data, i);
          l && a.push(l);
        }), Af(t.join(""), i, function(c, l) {
          var p = ja(s2, c, l, i);
          p && a.push(p), i.stream && (o.stickyStack = xf(o.stickyStack, c, l));
        }), s2.length && a.push(Ba(s2)), a.join("");
      }, "toHtml")
    }]), r;
  }();
  Va.exports = vf;
});
var Za = q((is, as) => {
  (function(r, e) {
    typeof is == "object" && typeof as < "u" ? as.exports = e() : typeof define == "function" && define.amd ? define(e) : (r = typeof globalThis < "u" ? globalThis : r || self).BrowserDetector = e();
  })(is, function() {
    function r(a, c) {
      for (var l = 0; l < c.length; l++) {
        var p = c[l];
        p.enumerable = p.enumerable || false, p.configurable = true, "value" in p && (p.writable = true), Object.defineProperty(a, (u = p.key, d = void 0, typeof (d = function(h, S2) {
          if (typeof h != "object" || h === null) return h;
          var m = h[Symbol.toPrimitive];
          if (m !== void 0) {
            var T2 = m.call(h, S2);
            if (typeof T2 != "object") return T2;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (S2 === "string" ? String : Number)(h);
        }(u, "string")) == "symbol" ? d : String(d)), p);
      }
      var u, d;
    }
    n(r, "e");
    var e = { chrome: "Google Chrome", brave: "Brave", crios: "Google Chrome", edge: "Microsoft Edge", edg: "Microsoft Edge", edgios: "Microsoft Edge", fennec: "Mozilla Firefox", jsdom: "JsDOM", mozilla: "Mozilla Firefox", fxios: "Mozilla Firefox", msie: "Microsoft Internet Explorer", opera: "Opera", opios: "Opera", opr: "Opera", opt: "Opera", rv: "Microsoft Internet Explorer", safari: "Safari", samsungbrowser: "Samsung Browser", electron: "Electron" }, t = {
      android: "Android",
      androidTablet: "Android Tablet",
      cros: "Chrome OS",
      fennec: "Android Tablet",
      ipad: "IPad",
      iphone: "IPhone",
      jsdom: "JsDOM",
      linux: "Linux",
      mac: "Macintosh",
      tablet: "Android Tablet",
      win: "Windows",
      "windows phone": "Windows Phone",
      xbox: "Microsoft Xbox"
    }, o = /* @__PURE__ */ n(function(a) {
      var c = new RegExp("^-?\\d+(?:.\\d{0,".concat(arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1, "})?")), l = Number(
        a
      ).toString().match(c);
      return l ? l[0] : null;
    }, "n"), s2 = /* @__PURE__ */ n(function() {
      return typeof window < "u" ? window.navigator : null;
    }, "i"), i = function() {
      function a(u) {
        var d;
        (function(h, S2) {
          if (!(h instanceof S2)) throw new TypeError("Cannot call a class as a function");
        })(this, a), this.userAgent = u || ((d = s2()) === null || d === void 0 ? void 0 : d.userAgent) || null;
      }
      n(a, "t");
      var c, l, p;
      return c = a, l = [{ key: "parseUserAgent", value: /* @__PURE__ */ n(function(u) {
        var d, h, S2, m = {}, T2 = u || this.userAgent || "", y2 = T2.toLowerCase().replace(/\s\s+/g, " "), R2 = /(edge)\/([\w.]+)/.exec(y2) || /(edg)[/]([\w.]+)/.exec(y2) || /(opr)[/]([\w.]+)/.exec(y2) || /(opt)[/]([\w.]+)/.exec(y2) || /(fxios)[/]([\w.]+)/.exec(y2) || /(edgios)[/]([\w.]+)/.exec(y2) || /(jsdom)[/]([\w.]+)/.exec(y2) || /(samsungbrowser)[/]([\w.]+)/.exec(y2) || /(electron)[/]([\w.]+)/.exec(y2) || /(chrome)[/]([\w.]+)/.exec(
          y2
        ) || /(crios)[/]([\w.]+)/.exec(y2) || /(opios)[/]([\w.]+)/.exec(y2) || /(version)(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(
          y2
        ) || /(webkit)[/]([\w.]+).*(version)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(y2) || /(applewebkit)[/]([\w.]+).*(safari)[/]([\w.]+)/.exec(
          y2
        ) || /(webkit)[/]([\w.]+)/.exec(y2) || /(opera)(?:.*version|)[/]([\w.]+)/.exec(y2) || /(msie) ([\w.]+)/.exec(y2) || /(fennec)[/]([\w.]+)/.exec(y2) || y2.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(y2) || y2.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(y2) || [], x2 = /(ipad)/.exec(y2) || /(ipod)/.exec(y2) || /(iphone)/.exec(y2) || /(jsdom)/.exec(y2) || /(windows phone)/.exec(y2) || /(xbox)/.exec(y2) || /(win)/.exec(y2) || /(tablet)/.exec(y2) || /(android)/.test(y2) && /(mobile)/.test(y2) === false && ["androidTablet"] || /(android)/.exec(y2) || /(mac)/.exec(y2) || /(linux)/.exec(y2) || /(cros)/.exec(y2) || [], g = R2[5] || R2[3] || R2[1] || null, b2 = x2[0] || null, v2 = R2[4] || R2[2] || null, C2 = s2();
        g === "chrome" && typeof (C2 == null || (d = C2.brave) === null || d === void 0 ? void 0 : d.isBrave) == "function" && (g = "brave"), g && (m[g] = true), b2 && (m[b2] = true);
        var F = !!(m.tablet || m.android || m.androidTablet), U2 = !!(m.ipad || m.tablet || m.androidTablet), B = !!(m.android || m.androidTablet || m.tablet || m.ipad || m.ipod || m.iphone || m["windows phone"]), W2 = !!(m.cros || m.mac || m.linux || m.win), se = !!(m.brave || m.chrome || m.crios || m.opr || m.safari || m.edg || m.electron), P2 = !!(m.msie || m.rv);
        return {
          name: (h = e[g]) !== null && h !== void 0 ? h : null,
          platform: (S2 = t[b2]) !== null && S2 !== void 0 ? S2 : null,
          userAgent: T2,
          version: v2,
          shortVersion: v2 ? o(parseFloat(v2), 2) : null,
          isAndroid: F,
          isTablet: U2,
          isMobile: B,
          isDesktop: W2,
          isWebkit: se,
          isIE: P2
        };
      }, "value") }, { key: "getBrowserInfo", value: /* @__PURE__ */ n(function() {
        var u = this.parseUserAgent();
        return { name: u.name, platform: u.platform, userAgent: u.userAgent, version: u.version, shortVersion: u.shortVersion };
      }, "value") }], p = [{ key: "VERSION", get: /* @__PURE__ */ n(function() {
        return "3.4.0";
      }, "get") }], l && r(c.prototype, l), p && r(c, p), Object.defineProperty(c, "prototype", { writable: false }), a;
    }();
    return i;
  });
});
var Ht = {};
_e(Ht, {
  global: () => E$1
});
var E$1 = (() => {
  let r;
  return typeof window < "u" ? r = window : typeof globalThis < "u" ? r = globalThis : typeof global < "u" ? r = global : typeof self < "u" ? r = self : r = {}, r;
})();
var ge = {};
_e(ge, {
  ARGTYPES_INFO_REQUEST: () => fo,
  ARGTYPES_INFO_RESPONSE: () => nt,
  CHANNEL_CREATED: () => cl,
  CHANNEL_WS_DISCONNECT: () => Wt,
  CONFIG_ERROR: () => $t,
  CREATE_NEW_STORYFILE_REQUEST: () => pl,
  CREATE_NEW_STORYFILE_RESPONSE: () => dl,
  CURRENT_STORY_WAS_SET: () => rt,
  DOCS_PREPARED: () => Yt,
  DOCS_RENDERED: () => pr,
  FILE_COMPONENT_SEARCH_REQUEST: () => ul,
  FILE_COMPONENT_SEARCH_RESPONSE: () => fl,
  FORCE_REMOUNT: () => Kt,
  FORCE_RE_RENDER: () => dr,
  GLOBALS_UPDATED: () => Ce,
  NAVIGATE_URL: () => yl,
  PLAY_FUNCTION_THREW_EXCEPTION: () => Xt,
  PRELOAD_ENTRIES: () => Qt,
  PREVIEW_BUILDER_PROGRESS: () => ml,
  PREVIEW_KEYDOWN: () => Zt,
  REGISTER_SUBSCRIPTION: () => hl,
  REQUEST_WHATS_NEW_DATA: () => wl,
  RESET_STORY_ARGS: () => ur,
  RESULT_WHATS_NEW_DATA: () => _l,
  SAVE_STORY_REQUEST: () => Ol,
  SAVE_STORY_RESPONSE: () => Il,
  SELECT_STORY: () => gl,
  SET_CONFIG: () => Sl,
  SET_CURRENT_STORY: () => eo,
  SET_FILTER: () => bl,
  SET_GLOBALS: () => ro,
  SET_INDEX: () => Tl,
  SET_STORIES: () => El,
  SET_WHATS_NEW_CACHE: () => Cl,
  SHARED_STATE_CHANGED: () => Rl,
  SHARED_STATE_SET: () => Al,
  STORIES_COLLAPSE_ALL: () => xl,
  STORIES_EXPAND_ALL: () => vl,
  STORY_ARGS_UPDATED: () => to,
  STORY_CHANGED: () => oo,
  STORY_ERRORED: () => no,
  STORY_FINISHED: () => ot,
  STORY_INDEX_INVALIDATED: () => so,
  STORY_MISSING: () => tt,
  STORY_PREPARED: () => io,
  STORY_RENDERED: () => We,
  STORY_RENDER_PHASE_CHANGED: () => Pe,
  STORY_SPECIFIED: () => ao,
  STORY_THREW_EXCEPTION: () => lo,
  STORY_UNCHANGED: () => co,
  TELEMETRY_ERROR: () => uo,
  TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: () => Ll,
  TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: () => jl,
  TESTING_MODULE_CRASH_REPORT: () => Fl,
  TESTING_MODULE_PROGRESS_REPORT: () => Dl,
  TESTING_MODULE_RUN_ALL_REQUEST: () => kl,
  TESTING_MODULE_RUN_REQUEST: () => Nl,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: () => Pl,
  UNHANDLED_ERRORS_WHILE_PLAYING: () => Jt,
  UPDATE_GLOBALS: () => fr,
  UPDATE_QUERY_PARAMS: () => po,
  UPDATE_STORY_ARGS: () => yr,
  default: () => ll
});
var zt = /* @__PURE__ */ ((A) => (A.CHANNEL_WS_DISCONNECT = "channelWSDisconnect", A.CHANNEL_CREATED = "channelCreated", A.CONFIG_ERROR = "configError", A.STORY_INDEX_INVALIDATED = "storyIndexInvalidated", A.STORY_SPECIFIED = "storySpecified", A.SET_CONFIG = "setConfig", A.SET_STORIES = "setStories", A.SET_INDEX = "setIndex", A.SET_CURRENT_STORY = "setCurrentStory", A.CURRENT_STORY_WAS_SET = "currentStoryWasSet", A.FORCE_RE_RENDER = "forceReRender", A.FORCE_REMOUNT = "forceRemount", A.PRELOAD_ENTRIES = "preloadStories", A.STORY_PREPARED = "storyPrepared", A.DOCS_PREPARED = "docsPrepared", A.STORY_CHANGED = "storyChanged", A.STORY_UNCHANGED = "storyUnchanged", A.STORY_RENDERED = "storyRendered", A.STORY_FINISHED = "storyFinished", A.STORY_MISSING = "storyMissing", A.STORY_ERRORED = "storyErrored", A.STORY_THREW_EXCEPTION = "storyThrewException", A.STORY_RENDER_PHASE_CHANGED = "storyRenderPhaseChanged", A.PLAY_FUNCTION_THREW_EXCEPTION = "playFunctionThrewException", A.UNHANDLED_ERRORS_WHILE_PLAYING = "unhandledErrorsWhilePlaying", A.UPDATE_STORY_ARGS = "updateStoryArgs", A.STORY_ARGS_UPDATED = "storyArgsUpdated", A.RESET_STORY_ARGS = "resetStoryArgs", A.SET_FILTER = "setFilter", A.SET_GLOBALS = "setGlobals", A.UPDATE_GLOBALS = "updateGlobals", A.GLOBALS_UPDATED = "globalsUpdated", A.REGISTER_SUBSCRIPTION = "registerSubscription", A.PREVIEW_KEYDOWN = "previewKeydown", A.PREVIEW_BUILDER_PROGRESS = "preview_builder_progress", A.SELECT_STORY = "selectStory", A.STORIES_COLLAPSE_ALL = "storiesCollapseAll", A.STORIES_EXPAND_ALL = "storiesExpandAll", A.DOCS_RENDERED = "docsRendered", A.SHARED_STATE_CHANGED = "sharedStateChanged", A.SHARED_STATE_SET = "sharedStateSet", A.NAVIGATE_URL = "navigateUrl", A.UPDATE_QUERY_PARAMS = "updateQueryParams", A.REQUEST_WHATS_NEW_DATA = "requestWhatsNewData", A.RESULT_WHATS_NEW_DATA = "resultWhatsNewData", A.SET_WHATS_NEW_CACHE = "setWhatsNewCache", A.TOGGLE_WHATS_NEW_NOTIFICATIONS = "toggleWhatsNewNotifications", A.TELEMETRY_ERROR = "telemetryError", A.FILE_COMPONENT_SEARCH_REQUEST = "fileComponentSearchRequest", A.FILE_COMPONENT_SEARCH_RESPONSE = "fileComponentSearchResponse", A.SAVE_STORY_REQUEST = "saveStoryRequest", A.SAVE_STORY_RESPONSE = "saveStoryResponse", A.ARGTYPES_INFO_REQUEST = "argtypesInfoRequest", A.ARGTYPES_INFO_RESPONSE = "argtypesInfoResponse", A.CREATE_NEW_STORYFILE_REQUEST = "createNewStoryfileRequest", A.CREATE_NEW_STORYFILE_RESPONSE = "createNewStoryfileResponse", A.TESTING_MODULE_CRASH_REPORT = "testingModuleCrashReport", A.TESTING_MODULE_PROGRESS_REPORT = "testingModuleProgressReport", A.TESTING_MODULE_RUN_REQUEST = "testingModuleRunRequest", A.TESTING_MODULE_RUN_ALL_REQUEST = "testingModuleRunAllRequest", A.TESTING_MODULE_CANCEL_TEST_RUN_REQUEST = "testingModuleCancelTestRunRequest", A.TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE = "testingModuleCancelTestRunResponse", A))(zt || {}), ll = zt, {
  CHANNEL_WS_DISCONNECT: Wt,
  CHANNEL_CREATED: cl,
  CONFIG_ERROR: $t,
  CREATE_NEW_STORYFILE_REQUEST: pl,
  CREATE_NEW_STORYFILE_RESPONSE: dl,
  CURRENT_STORY_WAS_SET: rt,
  DOCS_PREPARED: Yt,
  DOCS_RENDERED: pr,
  FILE_COMPONENT_SEARCH_REQUEST: ul,
  FILE_COMPONENT_SEARCH_RESPONSE: fl,
  FORCE_RE_RENDER: dr,
  FORCE_REMOUNT: Kt,
  GLOBALS_UPDATED: Ce,
  NAVIGATE_URL: yl,
  PLAY_FUNCTION_THREW_EXCEPTION: Xt,
  UNHANDLED_ERRORS_WHILE_PLAYING: Jt,
  PRELOAD_ENTRIES: Qt,
  PREVIEW_BUILDER_PROGRESS: ml,
  PREVIEW_KEYDOWN: Zt,
  REGISTER_SUBSCRIPTION: hl,
  RESET_STORY_ARGS: ur,
  SELECT_STORY: gl,
  SET_CONFIG: Sl,
  SET_CURRENT_STORY: eo,
  SET_FILTER: bl,
  SET_GLOBALS: ro,
  SET_INDEX: Tl,
  SET_STORIES: El,
  SHARED_STATE_CHANGED: Rl,
  SHARED_STATE_SET: Al,
  STORIES_COLLAPSE_ALL: xl,
  STORIES_EXPAND_ALL: vl,
  STORY_ARGS_UPDATED: to,
  STORY_CHANGED: oo,
  STORY_ERRORED: no,
  STORY_INDEX_INVALIDATED: so,
  STORY_MISSING: tt,
  STORY_PREPARED: io,
  STORY_RENDER_PHASE_CHANGED: Pe,
  STORY_RENDERED: We,
  STORY_FINISHED: ot,
  STORY_SPECIFIED: ao,
  STORY_THREW_EXCEPTION: lo,
  STORY_UNCHANGED: co,
  UPDATE_GLOBALS: fr,
  UPDATE_QUERY_PARAMS: po,
  UPDATE_STORY_ARGS: yr,
  REQUEST_WHATS_NEW_DATA: wl,
  RESULT_WHATS_NEW_DATA: _l,
  SET_WHATS_NEW_CACHE: Cl,
  TOGGLE_WHATS_NEW_NOTIFICATIONS: Pl,
  TELEMETRY_ERROR: uo,
  SAVE_STORY_REQUEST: Ol,
  SAVE_STORY_RESPONSE: Il,
  ARGTYPES_INFO_REQUEST: fo,
  ARGTYPES_INFO_RESPONSE: nt,
  TESTING_MODULE_CRASH_REPORT: Fl,
  TESTING_MODULE_PROGRESS_REPORT: Dl,
  TESTING_MODULE_RUN_REQUEST: Nl,
  TESTING_MODULE_RUN_ALL_REQUEST: kl,
  TESTING_MODULE_CANCEL_TEST_RUN_REQUEST: Ll,
  TESTING_MODULE_CANCEL_TEST_RUN_RESPONSE: jl
} = zt;
var yo = {
  "@storybook/global": "__STORYBOOK_MODULE_GLOBAL__",
  "storybook/internal/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "@storybook/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "@storybook/core/channels": "__STORYBOOK_MODULE_CHANNELS__",
  "storybook/internal/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "@storybook/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "@storybook/core/client-logger": "__STORYBOOK_MODULE_CLIENT_LOGGER__",
  "storybook/internal/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "@storybook/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "@storybook/core/core-events": "__STORYBOOK_MODULE_CORE_EVENTS__",
  "storybook/internal/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "@storybook/core-events/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "@storybook/core/preview-errors": "__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__",
  "storybook/internal/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "@storybook/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "@storybook/core/preview-api": "__STORYBOOK_MODULE_PREVIEW_API__",
  "storybook/internal/types": "__STORYBOOK_MODULE_TYPES__",
  "@storybook/types": "__STORYBOOK_MODULE_TYPES__",
  "@storybook/core/types": "__STORYBOOK_MODULE_TYPES__"
}, cs = Object.keys(yo);
var br = {};
_e(br, {
  Channel: () => ie,
  HEARTBEAT_INTERVAL: () => Po,
  HEARTBEAT_MAX_LATENCY: () => Oo,
  PostMessageTransport: () => Qe,
  WebsocketTransport: () => Ze,
  createBrowserChannel: () => kd,
  default: () => Nd
});
function _$1(r) {
  for (var e = [], t = 1; t < arguments.length; t++)
    e[t - 1] = arguments[t];
  var o = Array.from(typeof r == "string" ? [r] : r);
  o[o.length - 1] = o[o.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var s2 = o.reduce(function(c, l) {
    var p = l.match(/\n([\t ]+|(?!\s).)/g);
    return p ? c.concat(p.map(function(u) {
      var d, h;
      return (h = (d = u.match(/[\t ]/g)) === null || d === void 0 ? void 0 : d.length) !== null && h !== void 0 ? h : 0;
    })) : c;
  }, []);
  if (s2.length) {
    var i = new RegExp(`
[	 ]{` + Math.min.apply(Math, s2) + "}", "g");
    o = o.map(function(c) {
      return c.replace(i, `
`);
    });
  }
  o[0] = o[0].replace(/^\r?\n/, "");
  var a = o[0];
  return e.forEach(function(c, l) {
    var p = a.match(/(?:^|\n)( *)$/), u = p ? p[1] : "", d = c;
    typeof c == "string" && c.includes(`
`) && (d = String(c).split(`
`).map(function(h, S2) {
      return S2 === 0 ? h : "" + u + h;
    }).join(`
`)), a += d + o[l + 1];
  }), a;
}
n(_$1, "dedent");
var ps = _$1;
var mo = /* @__PURE__ */ new Map();
var Ml = "UNIVERSAL_STORE:", ee = {
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED"
}, w = class w2 {
  constructor(e, t) {
    this.debugging = false;
    this.listeners = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set()]]);
    this.getState = /* @__PURE__ */ n(() => (this.debug("getState", { state: this.state }), this.state), "getState");
    this.subscribe = /* @__PURE__ */ n((e2, t2) => {
      let o = typeof e2 == "function", s2 = o ? "*" : e2, i = o ? e2 : t2;
      if (this.debug("subscribe", { eventType: s2, listener: i }), !i)
        throw new TypeError(
          `Missing first subscribe argument, or second if first is the event type, when subscribing to a UniversalStore with id '${this.id}'`
        );
      return this.listeners.has(s2) || this.listeners.set(s2, /* @__PURE__ */ new Set()), this.listeners.get(s2).add(i), () => {
        var _a;
        this.debug("unsubscribe", { eventType: s2, listener: i }), this.listeners.has(s2) && (this.listeners.get(s2).delete(i), ((_a = this.listeners.get(s2)) == null ? void 0 : _a.size) === 0 && this.listeners.delete(s2));
      };
    }, "subscribe");
    this.send = /* @__PURE__ */ n((e2) => {
      if (this.debug("send", { event: e2 }), this.status !== w2.Status.READY)
        throw new TypeError(
          _$1`Cannot send event before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
            {
              event: e2,
              id: this.id,
              actor: this.actor,
              environment: this.environment
            },
            null,
            2
          )}`
        );
      this.emitToListeners(e2, { actor: this.actor }), this.emitToChannel(e2, { actor: this.actor });
    }, "send");
    if (this.debugging = e.debug ?? false, !w2.isInternalConstructing)
      throw new TypeError(
        "UniversalStore is not constructable - use UniversalStore.create() instead"
      );
    if (w2.isInternalConstructing = false, this.id = e.id, this.actorId = Date.now().toString(36) + Math.random().toString(36).substring(2), this.actorType = e.leader ? w2.ActorType.LEADER : w2.ActorType.FOLLOWER, this.state = e.initialState, this.channelEventName = `${Ml}${this.id}`, this.debug("constructor", {
      options: e,
      environmentOverrides: t,
      channelEventName: this.channelEventName
    }), this.actor.type === w2.ActorType.LEADER)
      this.syncing = {
        state: ee.RESOLVED,
        promise: Promise.resolve()
      };
    else {
      let o, s2, i = new Promise((a, c) => {
        o = /* @__PURE__ */ n(() => {
          this.syncing.state === ee.PENDING && (this.syncing.state = ee.RESOLVED, a());
        }, "syncingResolve"), s2 = /* @__PURE__ */ n((l) => {
          this.syncing.state === ee.PENDING && (this.syncing.state = ee.REJECTED, c(l));
        }, "syncingReject");
      });
      this.syncing = {
        state: ee.PENDING,
        promise: i,
        resolve: o,
        reject: s2
      };
    }
    this.getState = this.getState.bind(this), this.setState = this.setState.bind(this), this.subscribe = this.subscribe.bind(this), this.onStateChange = this.onStateChange.bind(this), this.send = this.send.bind(this), this.emitToChannel = this.emitToChannel.bind(this), this.prepareThis = this.prepareThis.bind(this), this.emitToListeners = this.emitToListeners.bind(this), this.handleChannelEvents = this.handleChannelEvents.bind(
      this
    ), this.debug = this.debug.bind(this), this.channel = (t == null ? void 0 : t.channel) ?? w2.preparation.channel, this.environment = (t == null ? void 0 : t.environment) ?? w2.preparation.environment, this.channel && this.environment ? this.prepareThis({ channel: this.channel, environment: this.environment }) : w2.preparation.promise.then(this.prepareThis);
  }
  static setupPreparationPromise() {
    let e, t, o = new Promise(
      (s2, i) => {
        e = /* @__PURE__ */ n((a) => {
          s2(a);
        }, "resolveRef"), t = /* @__PURE__ */ n((...a) => {
          i(a);
        }, "rejectRef");
      }
    );
    w2.preparation = {
      resolve: e,
      reject: t,
      promise: o
    };
  }
  /** The actor object representing the store instance with a unique ID and a type */
  get actor() {
    return Object.freeze({
      id: this.actorId,
      type: this.actorType,
      environment: this.environment ?? w2.Environment.UNKNOWN
    });
  }
  /**
   * The current state of the store, that signals both if the store is prepared by Storybook and
   * also - in the case of a follower - if the state has been synced with the leader's state.
   */
  get status() {
    var _a;
    if (!this.channel || !this.environment)
      return w2.Status.UNPREPARED;
    switch ((_a = this.syncing) == null ? void 0 : _a.state) {
      case ee.PENDING:
      case void 0:
        return w2.Status.SYNCING;
      case ee.REJECTED:
        return w2.Status.ERROR;
      case ee.RESOLVED:
      default:
        return w2.Status.READY;
    }
  }
  /**
   * A promise that resolves when the store is fully ready. A leader will be ready when the store
   * has been prepared by Storybook, which is almost instantly.
   *
   * A follower will be ready when the state has been synced with the leader's state, within a few
   * hundred milliseconds.
   */
  untilReady() {
    var _a;
    return Promise.all([w2.preparation.promise, (_a = this.syncing) == null ? void 0 : _a.promise]);
  }
  /** Creates a new instance of UniversalStore */
  static create(e) {
    if (!e || typeof (e == null ? void 0 : e.id) != "string")
      throw new TypeError("id is required and must be a string, when creating a UniversalStore");
    e.debug && console.debug(
      _$1`[UniversalStore]
        create`,
      { options: e }
    );
    let t = mo.get(e.id);
    if (t)
      return console.warn(_$1`UniversalStore with id "${e.id}" already exists in this environment, re-using existing.
        You should reuse the existing instance instead of trying to create a new one.`), t;
    w2.isInternalConstructing = true;
    let o = new w2(e);
    return mo.set(e.id, o), o;
  }
  /**
   * Used by Storybook to set the channel for all instances of UniversalStore in the given
   * environment.
   *
   * @internal
   */
  static __prepare(e, t) {
    w2.preparation.channel = e, w2.preparation.environment = t, w2.preparation.resolve({ channel: e, environment: t });
  }
  /**
   * Updates the store's state
   *
   * Either a new state or a state updater function can be passed to the method.
   */
  setState(e) {
    let t = this.state, o = typeof e == "function" ? e(t) : e;
    if (this.debug("setState", { newState: o, previousState: t, updater: e }), this.status !== w2.Status.READY)
      throw new TypeError(
        _$1`Cannot set state before store is ready. You can get the current status with store.status,
        or await store.readyPromise to wait for the store to be ready before sending events.
        ${JSON.stringify(
          {
            newState: o,
            id: this.id,
            actor: this.actor,
            environment: this.environment
          },
          null,
          2
        )}`
      );
    this.state = o;
    let s2 = {
      type: w2.InternalEventType.SET_STATE,
      payload: {
        state: o,
        previousState: t
      }
    };
    this.emitToChannel(s2, { actor: this.actor }), this.emitToListeners(s2, { actor: this.actor });
  }
  /**
   * Subscribes to state changes
   *
   * @returns Unsubscribe function
   */
  onStateChange(e) {
    return this.debug("onStateChange", { listener: e }), this.subscribe(
      w2.InternalEventType.SET_STATE,
      ({ payload: t }, o) => {
        e(t.state, t.previousState, o);
      }
    );
  }
  emitToChannel(e, t) {
    var _a;
    this.debug("emitToChannel", { event: e, eventInfo: t, channel: this.channel }), (_a = this.channel) == null ? void 0 : _a.emit(this.channelEventName, {
      event: e,
      eventInfo: t
    });
  }
  prepareThis({
    channel: e,
    environment: t
  }) {
    this.channel = e, this.environment = t, this.debug("prepared", { channel: e, environment: t }), this.channel.on(this.channelEventName, this.handleChannelEvents), this.actor.type === w2.ActorType.LEADER ? this.emitToChannel(
      { type: w2.InternalEventType.LEADER_CREATED },
      { actor: this.actor }
    ) : (this.emitToChannel(
      { type: w2.InternalEventType.FOLLOWER_CREATED },
      { actor: this.actor }
    ), this.emitToChannel(
      { type: w2.InternalEventType.EXISTING_STATE_REQUEST },
      { actor: this.actor }
    ), setTimeout(() => {
      this.syncing.reject(
        new TypeError(
          `No existing state found for follower with id: '${this.id}'. Make sure a leader with the same id exists before creating a follower.`
        )
      );
    }, 1e3));
  }
  emitToListeners(e, t) {
    let o = this.listeners.get(e.type), s2 = this.listeners.get("*");
    this.debug("emitToListeners", {
      event: e,
      eventInfo: t,
      eventTypeListeners: o,
      everythingListeners: s2
    }), [...o ?? [], ...s2 ?? []].forEach(
      (i) => i(e, t)
    );
  }
  handleChannelEvents(e) {
    var _a, _b, _c2, _d2, _e2;
    let { event: t, eventInfo: o } = e;
    if ([o.actor.id, (_a = o.forwardingActor) == null ? void 0 : _a.id].includes(this.actor.id)) {
      this.debug("handleChannelEvents: Ignoring event from self", { channelEvent: e });
      return;
    } else if (((_b = this.syncing) == null ? void 0 : _b.state) === ee.PENDING && t.type !== w2.InternalEventType.EXISTING_STATE_RESPONSE) {
      this.debug("handleChannelEvents: Ignoring event while syncing", { channelEvent: e });
      return;
    }
    if (this.debug("handleChannelEvents", { channelEvent: e }), this.actor.type === w2.ActorType.LEADER) {
      let s2 = true;
      switch (t.type) {
        case w2.InternalEventType.EXISTING_STATE_REQUEST:
          s2 = false;
          let i = {
            type: w2.InternalEventType.EXISTING_STATE_RESPONSE,
            payload: this.state
          };
          this.debug("handleChannelEvents: responding to existing state request", {
            responseEvent: i
          }), this.emitToChannel(i, { actor: this.actor });
          break;
        case w2.InternalEventType.LEADER_CREATED:
          s2 = false, this.syncing.state = ee.REJECTED, this.debug("handleChannelEvents: erroring due to second leader being created", {
            event: t
          }), console.error(
            _$1`Detected multiple UniversalStore leaders created with the same id "${this.id}".
            Only one leader can exists at a time, your stores are now in an invalid state.
            Leaders detected:
            this: ${JSON.stringify(this.actor, null, 2)}
            other: ${JSON.stringify(o.actor, null, 2)}`
          );
          break;
      }
      s2 && (this.debug("handleChannelEvents: forwarding event", { channelEvent: e }), this.emitToChannel(t, { actor: o.actor, forwardingActor: this.actor }));
    }
    if (this.actor.type === w2.ActorType.FOLLOWER)
      switch (t.type) {
        case w2.InternalEventType.EXISTING_STATE_RESPONSE:
          if (this.debug("handleChannelEvents: Setting state from leader's existing state response", {
            event: t
          }), ((_c2 = this.syncing) == null ? void 0 : _c2.state) !== ee.PENDING)
            break;
          (_e2 = (_d2 = this.syncing).resolve) == null ? void 0 : _e2.call(_d2);
          let s2 = {
            type: w2.InternalEventType.SET_STATE,
            payload: {
              state: t.payload,
              previousState: this.state
            }
          };
          this.state = t.payload, this.emitToListeners(s2, o);
          break;
      }
    switch (t.type) {
      case w2.InternalEventType.SET_STATE:
        this.debug("handleChannelEvents: Setting state", { event: t }), this.state = t.payload.state;
        break;
    }
    this.emitToListeners(t, { actor: o.actor });
  }
  debug(e, t) {
    this.debugging && console.debug(
      _$1`[UniversalStore::${this.id}::${this.environment ?? w2.Environment.UNKNOWN}]
        ${e}`,
      JSON.stringify(
        {
          data: t,
          actor: this.actor,
          state: this.state,
          status: this.status
        },
        null,
        2
      )
    );
  }
  /**
   * Used to reset the static fields of the UniversalStore class when cleaning up tests
   *
   * @internal
   */
  static __reset() {
    w2.preparation.reject(new Error("reset")), w2.setupPreparationPromise(), w2.isInternalConstructing = false;
  }
};
n(w, "UniversalStore"), /**
* Defines the possible actor types in the store system
*
* @readonly
*/
w.ActorType = {
  LEADER: "LEADER",
  FOLLOWER: "FOLLOWER"
}, /**
* Defines the possible environments the store can run in
*
* @readonly
*/
w.Environment = {
  SERVER: "SERVER",
  MANAGER: "MANAGER",
  PREVIEW: "PREVIEW",
  UNKNOWN: "UNKNOWN",
  MOCK: "MOCK"
}, /**
* Internal event types used for store synchronization
*
* @readonly
*/
w.InternalEventType = {
  EXISTING_STATE_REQUEST: "__EXISTING_STATE_REQUEST",
  EXISTING_STATE_RESPONSE: "__EXISTING_STATE_RESPONSE",
  SET_STATE: "__SET_STATE",
  LEADER_CREATED: "__LEADER_CREATED",
  FOLLOWER_CREATED: "__FOLLOWER_CREATED"
}, w.Status = {
  UNPREPARED: "UNPREPARED",
  SYNCING: "SYNCING",
  READY: "READY",
  ERROR: "ERROR"
}, // This is used to check if constructor was called from the static factory create()
w.isInternalConstructing = false, w.setupPreparationPromise();
var Q = w;
var Ul = /* @__PURE__ */ n((r) => r.transports !== void 0, "isMulti"), Gl = /* @__PURE__ */ n(() => Math.random().toString(16).slice(2), "generateRandomId"), ho = class ho2 {
  constructor(e = {}) {
    this.sender = Gl();
    this.events = {};
    this.data = {};
    this.transports = [];
    this.isAsync = e.async || false, Ul(e) ? (this.transports = e.transports || [], this.transports.forEach((t) => {
      t.setHandler((o) => this.handleEvent(o));
    })) : this.transports = e.transport ? [e.transport] : [], this.transports.forEach((t) => {
      t.setHandler((o) => this.handleEvent(o));
    });
  }
  get hasTransport() {
    return this.transports.length > 0;
  }
  addListener(e, t) {
    this.events[e] = this.events[e] || [], this.events[e].push(t);
  }
  emit(e, ...t) {
    let o = { type: e, args: t, from: this.sender }, s2 = {};
    t.length >= 1 && t[0] && t[0].options && (s2 = t[0].options);
    let i = /* @__PURE__ */ n(() => {
      this.transports.forEach((a) => {
        a.send(o, s2);
      }), this.handleEvent(o);
    }, "handler");
    this.isAsync ? setImmediate(i) : i();
  }
  last(e) {
    return this.data[e];
  }
  eventNames() {
    return Object.keys(this.events);
  }
  listenerCount(e) {
    let t = this.listeners(e);
    return t ? t.length : 0;
  }
  listeners(e) {
    return this.events[e] || void 0;
  }
  once(e, t) {
    let o = this.onceListener(e, t);
    this.addListener(e, o);
  }
  removeAllListeners(e) {
    e ? this.events[e] && delete this.events[e] : this.events = {};
  }
  removeListener(e, t) {
    let o = this.listeners(e);
    o && (this.events[e] = o.filter((s2) => s2 !== t));
  }
  on(e, t) {
    this.addListener(e, t);
  }
  off(e, t) {
    this.removeListener(e, t);
  }
  handleEvent(e) {
    let t = this.listeners(e.type);
    t && t.length && t.forEach((o) => {
      o.apply(e, e.args);
    }), this.data[e.type] = e.args;
  }
  onceListener(e, t) {
    let o = /* @__PURE__ */ n((...s2) => (this.removeListener(e, o), t(...s2)), "onceListener");
    return o;
  }
};
n(ho, "Channel");
var ie = ho;
var mr = {};
_e(mr, {
  deprecate: () => ae,
  logger: () => I$1,
  once: () => j$1,
  pretty: () => X
});
var { LOGLEVEL: ql } = E$1, Se = {
  trace: 1,
  debug: 2,
  info: 3,
  warn: 4,
  error: 5,
  silent: 10
}, Bl = ql, $e = Se[Bl] || Se.info, I$1 = {
  trace: /* @__PURE__ */ n((r, ...e) => {
    $e <= Se.trace && console.trace(r, ...e);
  }, "trace"),
  debug: /* @__PURE__ */ n((r, ...e) => {
    $e <= Se.debug && console.debug(r, ...e);
  }, "debug"),
  info: /* @__PURE__ */ n((r, ...e) => {
    $e <= Se.info && console.info(r, ...e);
  }, "info"),
  warn: /* @__PURE__ */ n((r, ...e) => {
    $e <= Se.warn && console.warn(r, ...e);
  }, "warn"),
  error: /* @__PURE__ */ n((r, ...e) => {
    $e <= Se.error && console.error(r, ...e);
  }, "error"),
  log: /* @__PURE__ */ n((r, ...e) => {
    $e < Se.silent && console.log(r, ...e);
  }, "log")
}, go = /* @__PURE__ */ new Set(), j$1 = /* @__PURE__ */ n((r) => (e, ...t) => {
  if (!go.has(e))
    return go.add(e), I$1[r](e, ...t);
}, "once");
j$1.clear = () => go.clear();
j$1.trace = j$1("trace");
j$1.debug = j$1("debug");
j$1.info = j$1("info");
j$1.warn = j$1("warn");
j$1.error = j$1("error");
j$1.log = j$1("log");
var ae = j$1("warn"), X = /* @__PURE__ */ n((r) => (...e) => {
  let t = [];
  if (e.length) {
    let o = /<span\s+style=(['"])([^'"]*)\1\s*>/gi, s2 = /<\/span>/gi, i;
    for (t.push(e[0].replace(o, "%c").replace(s2, "%c")); i = o.exec(e[0]); )
      t.push(i[2]), t.push("");
    for (let a = 1; a < e.length; a++)
      t.push(e[a]);
  }
  I$1[r].apply(I$1, t);
}, "pretty");
X.trace = X("trace");
X.debug = X("debug");
X.info = X("info");
X.warn = X("warn");
X.error = X("error");
var Vl = Object.create, ds = Object.defineProperty, Hl = Object.getOwnPropertyDescriptor, us = Object.getOwnPropertyNames, zl = Object.getPrototypeOf, Wl = Object.prototype.hasOwnProperty, Z = /* @__PURE__ */ n((r, e) => /* @__PURE__ */ n(function() {
  return e || (0, r[us(r)[0]])((e = { exports: {} }).exports, e), e.exports;
}, "__require"), "__commonJS"), $l = /* @__PURE__ */ n((r, e, t, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s2 of us(e))
      !Wl.call(r, s2) && s2 !== t && ds(r, s2, { get: /* @__PURE__ */ n(() => e[s2], "get"), enumerable: !(o = Hl(e, s2)) || o.enumerable });
  return r;
}, "__copyProps"), st = /* @__PURE__ */ n((r, e, t) => (t = r != null ? Vl(zl(r)) : {}, $l(
  e || !r || !r.__esModule ? ds(t, "default", { value: r, enumerable: true }) : t,
  r
)), "__toESM"), Yl = [
  "bubbles",
  "cancelBubble",
  "cancelable",
  "composed",
  "currentTarget",
  "defaultPrevented",
  "eventPhase",
  "isTrusted",
  "returnValue",
  "srcElement",
  "target",
  "timeStamp",
  "type"
], Kl = ["detail"];
function fs(r) {
  let e = Yl.filter((t) => r[t] !== void 0).reduce((t, o) => ({ ...t, [o]: r[o] }), {});
  return r instanceof CustomEvent && Kl.filter((t) => r[t] !== void 0).forEach((t) => {
    e[t] = r[t];
  }), e;
}
n(fs, "extractEventHiddenProperties");
var Ps = ue(it());
var Ts = Z({
  "node_modules/has-symbols/shams.js"(r, e) {
    e.exports = /* @__PURE__ */ n(function() {
      if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
        return false;
      if (typeof Symbol.iterator == "symbol")
        return true;
      var o = {}, s2 = Symbol("test"), i = Object(s2);
      if (typeof s2 == "string" || Object.prototype.toString.call(s2) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]")
        return false;
      var a = 42;
      o[s2] = a;
      for (s2 in o)
        return false;
      if (typeof Object.keys == "function" && Object.keys(o).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(
        o
      ).length !== 0)
        return false;
      var c = Object.getOwnPropertySymbols(o);
      if (c.length !== 1 || c[0] !== s2 || !Object.prototype.propertyIsEnumerable.call(o, s2))
        return false;
      if (typeof Object.getOwnPropertyDescriptor == "function") {
        var l = Object.getOwnPropertyDescriptor(o, s2);
        if (l.value !== a || l.enumerable !== true)
          return false;
      }
      return true;
    }, "hasSymbols");
  }
}), Es = Z({
  "node_modules/has-symbols/index.js"(r, e) {
    var t = typeof Symbol < "u" && Symbol, o = Ts();
    e.exports = /* @__PURE__ */ n(function() {
      return typeof t != "function" || typeof Symbol != "function" || typeof t("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? false : o();
    }, "hasNativeSymbols");
  }
}), Xl = Z({
  "node_modules/function-bind/implementation.js"(r, e) {
    var t = "Function.prototype.bind called on incompatible ", o = Array.prototype.slice, s2 = Object.prototype.toString, i = "[object Function]";
    e.exports = /* @__PURE__ */ n(function(c) {
      var l = this;
      if (typeof l != "function" || s2.call(l) !== i)
        throw new TypeError(t + l);
      for (var p = o.call(arguments, 1), u, d = /* @__PURE__ */ n(function() {
        if (this instanceof u) {
          var y2 = l.apply(
            this,
            p.concat(o.call(arguments))
          );
          return Object(y2) === y2 ? y2 : this;
        } else
          return l.apply(
            c,
            p.concat(o.call(arguments))
          );
      }, "binder"), h = Math.max(0, l.length - p.length), S2 = [], m = 0; m < h; m++)
        S2.push("$" + m);
      if (u = Function("binder", "return function (" + S2.join(",") + "){ return binder.apply(this,arguments); }")(d), l.prototype) {
        var T2 = /* @__PURE__ */ n(function() {
        }, "Empty2");
        T2.prototype = l.prototype, u.prototype = new T2(), T2.prototype = null;
      }
      return u;
    }, "bind");
  }
}), To = Z({
  "node_modules/function-bind/index.js"(r, e) {
    var t = Xl();
    e.exports = Function.prototype.bind || t;
  }
}), Jl = Z({
  "node_modules/has/src/index.js"(r, e) {
    var t = To();
    e.exports = t.call(Function.call, Object.prototype.hasOwnProperty);
  }
}), Rs = Z({
  "node_modules/get-intrinsic/index.js"(r, e) {
    var t, o = SyntaxError, s2 = Function, i = TypeError, a = /* @__PURE__ */ n(function(P2) {
      try {
        return s2('"use strict"; return (' + P2 + ").constructor;")();
      } catch {
      }
    }, "getEvalledConstructor"), c = Object.getOwnPropertyDescriptor;
    if (c)
      try {
        c({}, "");
      } catch {
        c = null;
      }
    var l = /* @__PURE__ */ n(function() {
      throw new i();
    }, "throwTypeError"), p = c ? function() {
      try {
        return arguments.callee, l;
      } catch {
        try {
          return c(arguments, "callee").get;
        } catch {
          return l;
        }
      }
    }() : l, u = Es()(), d = Object.getPrototypeOf || function(P2) {
      return P2.__proto__;
    }, h = {}, S2 = typeof Uint8Array > "u" ? t : d(Uint8Array), m = {
      "%AggregateError%": typeof AggregateError > "u" ? t : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer > "u" ? t : ArrayBuffer,
      "%ArrayIteratorPrototype%": u ? d([][Symbol.iterator]()) : t,
      "%AsyncFromSyncIteratorPrototype%": t,
      "%AsyncFunction%": h,
      "%AsyncGenerator%": h,
      "%AsyncGeneratorFunction%": h,
      "%AsyncIteratorPrototype%": h,
      "%Atomics%": typeof Atomics > "u" ? t : Atomics,
      "%BigInt%": typeof BigInt > "u" ? t : BigInt,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView > "u" ? t : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%Float32Array%": typeof Float32Array > "u" ? t : Float32Array,
      "%Float64Array%": typeof Float64Array > "u" ? t : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? t : FinalizationRegistry,
      "%Function%": s2,
      "%GeneratorFunction%": h,
      "%Int8Array%": typeof Int8Array > "u" ? t : Int8Array,
      "%Int16Array%": typeof Int16Array > "u" ? t : Int16Array,
      "%Int32Array%": typeof Int32Array > "u" ? t : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": u ? d(d([][Symbol.iterator]())) : t,
      "%JSON%": typeof JSON == "object" ? JSON : t,
      "%Map%": typeof Map > "u" ? t : Map,
      "%MapIteratorPrototype%": typeof Map > "u" || !u ? t : d((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise > "u" ? t : Promise,
      "%Proxy%": typeof Proxy > "u" ? t : Proxy,
      "%RangeError%": RangeError,
      "%ReferenceError%": ReferenceError,
      "%Reflect%": typeof Reflect > "u" ? t : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set > "u" ? t : Set,
      "%SetIteratorPrototype%": typeof Set > "u" || !u ? t : d((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? t : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": u ? d(""[Symbol.iterator]()) : t,
      "%Symbol%": u ? Symbol : t,
      "%SyntaxError%": o,
      "%ThrowTypeError%": p,
      "%TypedArray%": S2,
      "%TypeError%": i,
      "%Uint8Array%": typeof Uint8Array > "u" ? t : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? t : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array > "u" ? t : Uint16Array,
      "%Uint32Array%": typeof Uint32Array > "u" ? t : Uint32Array,
      "%URIError%": URIError,
      "%WeakMap%": typeof WeakMap > "u" ? t : WeakMap,
      "%WeakRef%": typeof WeakRef > "u" ? t : WeakRef,
      "%WeakSet%": typeof WeakSet > "u" ? t : WeakSet
    }, T2 = /* @__PURE__ */ n(function P2(D2) {
      var M2;
      if (D2 === "%AsyncFunction%")
        M2 = a("async function () {}");
      else if (D2 === "%GeneratorFunction%")
        M2 = a("function* () {}");
      else if (D2 === "%AsyncGeneratorFunction%")
        M2 = a("async function* () {}");
      else if (D2 === "%AsyncGenerator%") {
        var L2 = P2("%AsyncGeneratorFunction%");
        L2 && (M2 = L2.prototype);
      } else if (D2 === "%AsyncIteratorPrototype%") {
        var N2 = P2("%AsyncGenerator%");
        N2 && (M2 = d(N2.prototype));
      }
      return m[D2] = M2, M2;
    }, "doEval2"), y2 = {
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    }, R2 = To(), x2 = Jl(), g = R2.call(Function.call, Array.prototype.concat), b2 = R2.call(Function.apply, Array.prototype.splice), v2 = R2.call(
      Function.call,
      String.prototype.replace
    ), C2 = R2.call(Function.call, String.prototype.slice), F = R2.call(Function.call, RegExp.prototype.exec), U2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, B = /\\(\\)?/g, W2 = /* @__PURE__ */ n(
      function(D2) {
        var M2 = C2(D2, 0, 1), L2 = C2(D2, -1);
        if (M2 === "%" && L2 !== "%")
          throw new o("invalid intrinsic syntax, expected closing `%`");
        if (L2 === "%" && M2 !== "%")
          throw new o("invalid intrinsic syntax, expected opening `%`");
        var N2 = [];
        return v2(D2, U2, function(H2, re, K2, Kr) {
          N2[N2.length] = K2 ? v2(Kr, B, "$1") : re || H2;
        }), N2;
      },
      "stringToPath3"
    ), se = /* @__PURE__ */ n(function(D2, M2) {
      var L2 = D2, N2;
      if (x2(y2, L2) && (N2 = y2[L2], L2 = "%" + N2[0] + "%"), x2(m, L2)) {
        var H2 = m[L2];
        if (H2 === h && (H2 = T2(L2)), typeof H2 > "u" && !M2)
          throw new i("intrinsic " + D2 + " exists, but is not available. Please file an issue!");
        return {
          alias: N2,
          name: L2,
          value: H2
        };
      }
      throw new o("intrinsic " + D2 + " does not exist!");
    }, "getBaseIntrinsic2");
    e.exports = /* @__PURE__ */ n(function(D2, M2) {
      if (typeof D2 != "string" || D2.length === 0)
        throw new i("intrinsic name must be a non-empty string");
      if (arguments.length > 1 && typeof M2 != "boolean")
        throw new i('"allowMissing" argument must be a boolean');
      if (F(/^%?[^%]*%?$/, D2) === null)
        throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      var L2 = W2(D2), N2 = L2.length > 0 ? L2[0] : "", H2 = se("%" + N2 + "%", M2), re = H2.name, K2 = H2.value, Kr = false, Vt = H2.alias;
      Vt && (N2 = Vt[0], b2(L2, g([0, 1], Vt)));
      for (var Xr = 1, lr = true; Xr < L2.length; Xr += 1) {
        var de = L2[Xr], Jr = C2(de, 0, 1), Qr = C2(de, -1);
        if ((Jr === '"' || Jr === "'" || Jr === "`" || Qr === '"' || Qr === "'" || Qr === "`") && Jr !== Qr)
          throw new o("property names with quotes must have matching quotes");
        if ((de === "constructor" || !lr) && (Kr = true), N2 += "." + de, re = "%" + N2 + "%", x2(m, re))
          K2 = m[re];
        else if (K2 != null) {
          if (!(de in K2)) {
            if (!M2)
              throw new i("base intrinsic for " + D2 + " exists, but the property is not available.");
            return;
          }
          if (c && Xr + 1 >= L2.length) {
            var Zr = c(K2, de);
            lr = !!Zr, lr && "get" in Zr && !("originalValue" in Zr.get) ? K2 = Zr.get : K2 = K2[de];
          } else
            lr = x2(K2, de), K2 = K2[de];
          lr && !Kr && (m[re] = K2);
        }
      }
      return K2;
    }, "GetIntrinsic");
  }
}), Ql = Z({
  "node_modules/call-bind/index.js"(r, e) {
    var t = To(), o = Rs(), s2 = o("%Function.prototype.apply%"), i = o("%Function.prototype.call%"), a = o("%Reflect.apply%", true) || t.call(
      i,
      s2
    ), c = o("%Object.getOwnPropertyDescriptor%", true), l = o("%Object.defineProperty%", true), p = o("%Math.max%");
    if (l)
      try {
        l({}, "a", { value: 1 });
      } catch {
        l = null;
      }
    e.exports = /* @__PURE__ */ n(function(h) {
      var S2 = a(t, i, arguments);
      if (c && l) {
        var m = c(S2, "length");
        m.configurable && l(
          S2,
          "length",
          { value: 1 + p(0, h.length - (arguments.length - 1)) }
        );
      }
      return S2;
    }, "callBind");
    var u = /* @__PURE__ */ n(function() {
      return a(t, s2, arguments);
    }, "applyBind2");
    l ? l(e.exports, "apply", { value: u }) : e.exports.apply = u;
  }
}), Zl = Z({
  "node_modules/call-bind/callBound.js"(r, e) {
    var t = Rs(), o = Ql(), s2 = o(t("String.prototype.indexOf"));
    e.exports = /* @__PURE__ */ n(function(a, c) {
      var l = t(a, !!c);
      return typeof l == "function" && s2(a, ".prototype.") > -1 ? o(l) : l;
    }, "callBoundIntrinsic");
  }
}), ec = Z({
  "node_modules/has-tostringtag/shams.js"(r, e) {
    var t = Ts();
    e.exports = /* @__PURE__ */ n(function() {
      return t() && !!Symbol.toStringTag;
    }, "hasToStringTagShams");
  }
}), rc = Z({
  "node_modules/is-regex/index.js"(r, e) {
    var t = Zl(), o = ec()(), s2, i, a, c;
    o && (s2 = t("Object.prototype.hasOwnProperty"), i = t("RegExp.prototype.exec"), a = {}, l = /* @__PURE__ */ n(function() {
      throw a;
    }, "throwRegexMarker"), c = {
      toString: l,
      valueOf: l
    }, typeof Symbol.toPrimitive == "symbol" && (c[Symbol.toPrimitive] = l));
    var l, p = t("Object.prototype.toString"), u = Object.getOwnPropertyDescriptor, d = "[object RegExp]";
    e.exports = /* @__PURE__ */ n(o ? function(S2) {
      if (!S2 || typeof S2 != "object")
        return false;
      var m = u(S2, "lastIndex"), T2 = m && s2(m, "value");
      if (!T2)
        return false;
      try {
        i(S2, c);
      } catch (y2) {
        return y2 === a;
      }
    } : function(S2) {
      return !S2 || typeof S2 != "object" && typeof S2 != "function" ? false : p(S2) === d;
    }, "isRegex");
  }
}), tc = Z({
  "node_modules/is-function/index.js"(r, e) {
    e.exports = o;
    var t = Object.prototype.toString;
    function o(s2) {
      if (!s2)
        return false;
      var i = t.call(s2);
      return i === "[object Function]" || typeof s2 == "function" && i !== "[object RegExp]" || typeof window < "u" && (s2 === window.setTimeout || s2 === window.alert || s2 === window.confirm || s2 === window.prompt);
    }
    n(o, "isFunction3");
  }
}), oc = Z({
  "node_modules/is-symbol/index.js"(r, e) {
    var t = Object.prototype.toString, o = Es()();
    o ? (s2 = Symbol.prototype.toString, i = /^Symbol\(.*\)$/, a = /* @__PURE__ */ n(function(l) {
      return typeof l.valueOf() != "symbol" ? false : i.test(s2.call(l));
    }, "isRealSymbolObject"), e.exports = /* @__PURE__ */ n(function(l) {
      if (typeof l == "symbol")
        return true;
      if (t.call(l) !== "[object Symbol]")
        return false;
      try {
        return a(l);
      } catch {
        return false;
      }
    }, "isSymbol3")) : e.exports = /* @__PURE__ */ n(function(l) {
      return false;
    }, "isSymbol3");
    var s2, i, a;
  }
}), nc = st(rc()), sc = st(tc()), ic = st(oc());
function ac(r) {
  return r != null && typeof r == "object" && Array.isArray(r) === false;
}
n(ac, "isObject");
var lc = typeof global == "object" && global && global.Object === Object && global, cc = lc, pc = typeof self == "object" && self && self.Object === Object && self, dc = cc || pc || Function("return this")(), Eo = dc, uc = Eo.Symbol, Ye = uc, As = Object.prototype, fc = As.hasOwnProperty, yc = As.toString, hr = Ye ? Ye.toStringTag : void 0;
function mc(r) {
  var e = fc.call(r, hr), t = r[hr];
  try {
    r[hr] = void 0;
    var o = true;
  } catch {
  }
  var s2 = yc.call(r);
  return o && (e ? r[hr] = t : delete r[hr]), s2;
}
n(mc, "getRawTag");
var hc = mc, gc = Object.prototype, Sc = gc.toString;
function bc(r) {
  return Sc.call(r);
}
n(bc, "objectToString");
var Tc = bc, Ec = "[object Null]", Rc = "[object Undefined]", ms = Ye ? Ye.toStringTag : void 0;
function Ac(r) {
  return r == null ? r === void 0 ? Rc : Ec : ms && ms in Object(r) ? hc(r) : Tc(r);
}
n(Ac, "baseGetTag");
var xs = Ac;
function xc(r) {
  return r != null && typeof r == "object";
}
n(xc, "isObjectLike");
var vc = xc, wc = "[object Symbol]";
function _c(r) {
  return typeof r == "symbol" || vc(r) && xs(r) == wc;
}
n(_c, "isSymbol");
var Ro = _c;
function Cc(r, e) {
  for (var t = -1, o = r == null ? 0 : r.length, s2 = Array(o); ++t < o; )
    s2[t] = e(r[t], t, r);
  return s2;
}
n(Cc, "arrayMap");
var Pc = Cc, Oc = Array.isArray, Ao = Oc, hs = Ye ? Ye.prototype : void 0, gs = hs ? hs.toString : void 0;
function vs(r) {
  if (typeof r == "string")
    return r;
  if (Ao(r))
    return Pc(r, vs) + "";
  if (Ro(r))
    return gs ? gs.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -Infinity ? "-0" : e;
}
n(vs, "baseToString");
var Fc = vs;
function Dc(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
n(Dc, "isObject2");
var ws = Dc, Nc = "[object AsyncFunction]", kc = "[object Function]", Lc = "[object GeneratorFunction]", jc = "[object Proxy]";
function Mc(r) {
  if (!ws(r))
    return false;
  var e = xs(r);
  return e == kc || e == Lc || e == Nc || e == jc;
}
n(Mc, "isFunction");
var Uc = Mc, Gc = Eo["__core-js_shared__"], bo = Gc, Ss = function() {
  var r = /[^.]+$/.exec(bo && bo.keys && bo.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function qc(r) {
  return !!Ss && Ss in r;
}
n(qc, "isMasked");
var Bc = qc, Vc = Function.prototype, Hc = Vc.toString;
function zc(r) {
  if (r != null) {
    try {
      return Hc.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
n(zc, "toSource");
var Wc = zc, $c = /[\\^$.*+?()[\]{}|]/g, Yc = /^\[object .+?Constructor\]$/, Kc = Function.prototype, Xc = Object.prototype, Jc = Kc.toString, Qc = Xc.hasOwnProperty, Zc = RegExp(
  "^" + Jc.call(Qc).replace($c, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ep(r) {
  if (!ws(r) || Bc(r))
    return false;
  var e = Uc(r) ? Zc : Yc;
  return e.test(Wc(r));
}
n(ep, "baseIsNative");
var rp = ep;
function tp(r, e) {
  return r == null ? void 0 : r[e];
}
n(tp, "getValue");
var op = tp;
function np(r, e) {
  var t = op(r, e);
  return rp(t) ? t : void 0;
}
n(np, "getNative");
var _s = np;
function sp(r, e) {
  return r === e || r !== r && e !== e;
}
n(sp, "eq");
var ip = sp, ap = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, lp = /^\w*$/;
function cp(r, e) {
  if (Ao(r))
    return false;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || Ro(r) ? true : lp.test(r) || !ap.test(r) || e != null && r in Object(
    e
  );
}
n(cp, "isKey");
var pp = cp, dp = _s(Object, "create"), gr = dp;
function up() {
  this.__data__ = gr ? gr(null) : {}, this.size = 0;
}
n(up, "hashClear");
var fp = up;
function yp(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
n(yp, "hashDelete");
var mp = yp, hp = "__lodash_hash_undefined__", gp = Object.prototype, Sp = gp.hasOwnProperty;
function bp(r) {
  var e = this.__data__;
  if (gr) {
    var t = e[r];
    return t === hp ? void 0 : t;
  }
  return Sp.call(e, r) ? e[r] : void 0;
}
n(bp, "hashGet");
var Tp = bp, Ep = Object.prototype, Rp = Ep.hasOwnProperty;
function Ap(r) {
  var e = this.__data__;
  return gr ? e[r] !== void 0 : Rp.call(e, r);
}
n(Ap, "hashHas");
var xp = Ap, vp = "__lodash_hash_undefined__";
function wp(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = gr && e === void 0 ? vp : e, this;
}
n(wp, "hashSet");
var _p = wp;
function Ke(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(Ke, "Hash");
Ke.prototype.clear = fp;
Ke.prototype.delete = mp;
Ke.prototype.get = Tp;
Ke.prototype.has = xp;
Ke.prototype.set = _p;
var bs = Ke;
function Cp() {
  this.__data__ = [], this.size = 0;
}
n(Cp, "listCacheClear");
var Pp = Cp;
function Op(r, e) {
  for (var t = r.length; t--; )
    if (ip(r[t][0], e))
      return t;
  return -1;
}
n(Op, "assocIndexOf");
var lt = Op, Ip = Array.prototype, Fp = Ip.splice;
function Dp(r) {
  var e = this.__data__, t = lt(e, r);
  if (t < 0)
    return false;
  var o = e.length - 1;
  return t == o ? e.pop() : Fp.call(e, t, 1), --this.size, true;
}
n(Dp, "listCacheDelete");
var Np = Dp;
function kp(r) {
  var e = this.__data__, t = lt(e, r);
  return t < 0 ? void 0 : e[t][1];
}
n(kp, "listCacheGet");
var Lp = kp;
function jp(r) {
  return lt(this.__data__, r) > -1;
}
n(jp, "listCacheHas");
var Mp = jp;
function Up(r, e) {
  var t = this.__data__, o = lt(t, r);
  return o < 0 ? (++this.size, t.push([r, e])) : t[o][1] = e, this;
}
n(Up, "listCacheSet");
var Gp = Up;
function Xe(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(Xe, "ListCache");
Xe.prototype.clear = Pp;
Xe.prototype.delete = Np;
Xe.prototype.get = Lp;
Xe.prototype.has = Mp;
Xe.prototype.set = Gp;
var qp = Xe, Bp = _s(Eo, "Map"), Vp = Bp;
function Hp() {
  this.size = 0, this.__data__ = {
    hash: new bs(),
    map: new (Vp || qp)(),
    string: new bs()
  };
}
n(Hp, "mapCacheClear");
var zp = Hp;
function Wp(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
n(Wp, "isKeyable");
var $p = Wp;
function Yp(r, e) {
  var t = r.__data__;
  return $p(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
n(Yp, "getMapData");
var ct = Yp;
function Kp(r) {
  var e = ct(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
n(Kp, "mapCacheDelete");
var Xp = Kp;
function Jp(r) {
  return ct(this, r).get(r);
}
n(Jp, "mapCacheGet");
var Qp = Jp;
function Zp(r) {
  return ct(this, r).has(r);
}
n(Zp, "mapCacheHas");
var ed = Zp;
function rd(r, e) {
  var t = ct(this, r), o = t.size;
  return t.set(r, e), this.size += t.size == o ? 0 : 1, this;
}
n(rd, "mapCacheSet");
var td = rd;
function Je(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var o = r[e];
    this.set(o[0], o[1]);
  }
}
n(Je, "MapCache");
Je.prototype.clear = zp;
Je.prototype.delete = Xp;
Je.prototype.get = Qp;
Je.prototype.has = ed;
Je.prototype.set = td;
var Cs = Je, od = "Expected a function";
function xo(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(od);
  var t = /* @__PURE__ */ n(function() {
    var o = arguments, s2 = e ? e.apply(this, o) : o[0], i = t.cache;
    if (i.has(s2))
      return i.get(s2);
    var a = r.apply(this, o);
    return t.cache = i.set(s2, a) || i, a;
  }, "memoized");
  return t.cache = new (xo.Cache || Cs)(), t;
}
n(xo, "memoize");
xo.Cache = Cs;
var nd = xo, sd = 500;
function id(r) {
  var e = nd(r, function(o) {
    return t.size === sd && t.clear(), o;
  }), t = e.cache;
  return e;
}
n(id, "memoizeCapped");
var ad = id, ld = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, cd = /\\(\\)?/g, pd = ad(
  function(r) {
    var e = [];
    return r.charCodeAt(0) === 46 && e.push(""), r.replace(ld, function(t, o, s2, i) {
      e.push(s2 ? i.replace(cd, "$1") : o || t);
    }), e;
  }
), dd = pd;
function ud(r) {
  return r == null ? "" : Fc(r);
}
n(ud, "toString");
var fd = ud;
function yd(r, e) {
  return Ao(r) ? r : pp(r, e) ? [r] : dd(fd(r));
}
n(yd, "castPath");
var md = yd;
function gd(r) {
  if (typeof r == "string" || Ro(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -Infinity ? "-0" : e;
}
n(gd, "toKey");
var Sd = gd;
function bd(r, e) {
  e = md(e, r);
  for (var t = 0, o = e.length; r != null && t < o; )
    r = r[Sd(e[t++])];
  return t && t == o ? r : void 0;
}
n(bd, "baseGet");
var Td = bd;
function Ed(r, e, t) {
  var o = r == null ? void 0 : Td(r, e);
  return o === void 0 ? t : o;
}
n(Ed, "get");
var Rd = Ed, at = ac, Ad = /* @__PURE__ */ n((r) => {
  let e = null, t = false, o = false, s2 = false, i = "";
  if (r.indexOf("//") >= 0 || r.indexOf("/*") >= 0)
    for (let a = 0; a < r.length; a += 1)
      !e && !t && !o && !s2 ? r[a] === '"' || r[a] === "'" || r[a] === "`" ? e = r[a] : r[a] === "/" && r[a + 1] === "*" ? t = true : r[a] === "/" && r[a + 1] === "/" ? o = true : r[a] === "/" && r[a + 1] !== "/" && (s2 = true) : (e && (r[a] === e && r[a - 1] !== "\\" || r[a] === `
` && e !== "`") && (e = null), s2 && (r[a] === "/" && r[a - 1] !== "\\" || r[a] === `
`) && (s2 = false), t && r[a - 1] === "/" && r[a - 2] === "*" && (t = false), o && r[a] === `
` && (o = false)), !t && !o && (i += r[a]);
  else
    i = r;
  return i;
}, "removeCodeComments"), xd = (0, Ps.default)(1e4)(
  (r) => Ad(r).replace(/\n\s*/g, "").trim()
), vd = /* @__PURE__ */ n(function(e, t) {
  let o = t.slice(0, t.indexOf("{")), s2 = t.slice(t.indexOf("{"));
  if (o.includes("=>") || o.includes("function"))
    return t;
  let i = o;
  return i = i.replace(e, "function"), i + s2;
}, "convertShorthandMethods2"), wd = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/, Sr = /* @__PURE__ */ n(
  (r) => r.match(/^[\[\{\"\}].*[\]\}\"]$/),
  "isJSON"
);
function Os(r) {
  if (!at(r))
    return r;
  let e = r, t = false;
  return typeof Event < "u" && r instanceof Event && (e = fs(e), t = true), e = Object.keys(e).reduce((o, s2) => {
    try {
      e[s2] && e[s2].toJSON, o[s2] = e[s2];
    } catch {
      t = true;
    }
    return o;
  }, {}), t ? e : r;
}
n(Os, "convertUnconventionalData");
var _d = /* @__PURE__ */ n(function(e) {
  let t, o, s2, i;
  return /* @__PURE__ */ n(function(c, l) {
    try {
      if (c === "")
        return i = [], t = /* @__PURE__ */ new Map([[l, "[]"]]), o = /* @__PURE__ */ new Map(), s2 = [], l;
      let p = o.get(this) || this;
      for (; s2.length && p !== s2[0]; )
        s2.shift(), i.pop();
      if (typeof l == "boolean")
        return l;
      if (l === void 0)
        return e.allowUndefined ? "_undefined_" : void 0;
      if (l === null)
        return null;
      if (typeof l == "number")
        return l === -1 / 0 ? "_-Infinity_" : l === 1 / 0 ? "_Infinity_" : Number.isNaN(l) ? "_NaN_" : l;
      if (typeof l == "bigint")
        return `_bigint_${l.toString()}`;
      if (typeof l == "string")
        return wd.test(l) ? e.allowDate ? `_date_${l}` : void 0 : l;
      if ((0, nc.default)(l))
        return e.allowRegExp ? `_regexp_${l.flags}|${l.source}` : void 0;
      if ((0, sc.default)(l)) {
        if (!e.allowFunction)
          return;
        let { name: d } = l, h = l.toString();
        return h.match(
          /(\[native code\]|WEBPACK_IMPORTED_MODULE|__webpack_exports__|__webpack_require__)/
        ) ? `_function_${d}|${(() => {
        }).toString()}` : `_function_${d}|${xd(vd(c, h))}`;
      }
      if ((0, ic.default)(l)) {
        if (!e.allowSymbol)
          return;
        let d = Symbol.keyFor(l);
        return d !== void 0 ? `_gsymbol_${d}` : `_symbol_${l.toString().slice(7, -1)}`;
      }
      if (s2.length >= e.maxDepth)
        return Array.isArray(l) ? `[Array(${l.length})]` : "[Object]";
      if (l === this)
        return `_duplicate_${JSON.stringify(i)}`;
      if (l instanceof Error && e.allowError)
        return {
          __isConvertedError__: true,
          errorProperties: {
            ...l.cause ? { cause: l.cause } : {},
            ...l,
            name: l.name,
            message: l.message,
            stack: l.stack,
            "_constructor-name_": l.constructor.name
          }
        };
      if (l.constructor && l.constructor.name && l.constructor.name !== "Object" && !Array.isArray(l) && !e.allowClass)
        return;
      let u = t.get(l);
      if (!u) {
        let d = Array.isArray(l) ? l : Os(l);
        if (l.constructor && l.constructor.name && l.constructor.name !== "Object" && !Array.isArray(l) && e.allowClass)
          try {
            Object.assign(d, { "_constructor-name_": l.constructor.name });
          } catch {
          }
        return i.push(c), s2.unshift(d), t.set(l, JSON.stringify(i)), l !== d && o.set(l, d), d;
      }
      return `_duplicate_${u}`;
    } catch {
      return;
    }
  }, "replace");
}, "replacer2"), Cd = /* @__PURE__ */ n(function reviver(options) {
  let refs = [], root;
  return /* @__PURE__ */ n(function revive(key, value) {
    if (key === "" && (root = value, refs.forEach(({ target: r, container: e, replacement: t }) => {
      let o = Sr(t) ? JSON.parse(t) : t.split(".");
      o.length === 0 ? e[r] = root : e[r] = Rd(root, o);
    })), key === "_constructor-name_")
      return value;
    if (at(value) && value.__isConvertedError__) {
      let { message: r, ...e } = value.errorProperties, t = new Error(r);
      return Object.assign(t, e), t;
    }
    if (at(value) && value["_constructor-name_"] && options.allowFunction) {
      let r = value["_constructor-name_"];
      if (r !== "Object") {
        let e = new Function(`return function ${r.replace(/[^a-zA-Z0-9$_]+/g, "")}(){}`)();
        Object.setPrototypeOf(value, new e());
      }
      return delete value["_constructor-name_"], value;
    }
    if (typeof value == "string" && value.startsWith("_function_") && options.allowFunction) {
      let [, name, source] = value.match(/_function_([^|]*)\|(.*)/) || [], sourceSanitized = source.replace(/[(\(\))|\\| |\]|`]*$/, "");
      if (!options.lazyEval)
        return eval(`(${sourceSanitized})`);
      let result = /* @__PURE__ */ n((...args) => {
        let f = eval(`(${sourceSanitized})`);
        return f(...args);
      }, "result");
      return Object.defineProperty(result, "toString", {
        value: /* @__PURE__ */ n(() => sourceSanitized, "value")
      }), Object.defineProperty(result, "name", {
        value: name
      }), result;
    }
    if (typeof value == "string" && value.startsWith("_regexp_") && options.allowRegExp) {
      let [, r, e] = value.match(/_regexp_([^|]*)\|(.*)/) || [];
      return new RegExp(e, r);
    }
    return typeof value == "string" && value.startsWith("_date_") && options.allowDate ? new Date(value.replace("_date_", "")) : typeof value == "string" && value.startsWith("_duplicate_") ? (refs.push({ target: key, container: this, replacement: value.replace(/^_duplicate_/, "") }), null) : typeof value == "string" && value.startsWith("_symbol_") && options.allowSymbol ? Symbol(value.replace("_symbol_", "")) : typeof value == "string" && value.startsWith("_gsymbol_") && options.allowSymbol ? Symbol.for(value.replace("_gsymbol_", "")) : typeof value == "string" && value === "_-Infinity_" ? -1 / 0 : typeof value == "string" && value === "_Infinity_" ? 1 / 0 : typeof value == "string" && value === "_NaN_" ? NaN : typeof value == "string" && value.startsWith("_bigint_") && typeof BigInt == "function" ? BigInt(value.replace("_bigint_", "")) : value;
  }, "revive");
}, "reviver"), Is = {
  maxDepth: 10,
  space: void 0,
  allowFunction: true,
  allowRegExp: true,
  allowDate: true,
  allowClass: true,
  allowError: true,
  allowUndefined: true,
  allowSymbol: true,
  lazyEval: true
}, pt = /* @__PURE__ */ n((r, e = {}) => {
  let t = { ...Is, ...e };
  return JSON.stringify(Os(r), _d(t), e.space);
}, "stringify"), Pd = /* @__PURE__ */ n(() => {
  let r = /* @__PURE__ */ new Map();
  return /* @__PURE__ */ n(function e(t) {
    at(t) && Object.entries(t).forEach(([o, s2]) => {
      s2 === "_undefined_" ? t[o] = void 0 : r.get(s2) || (r.set(s2, true), e(s2));
    }), Array.isArray(t) && t.forEach((o, s2) => {
      o === "_undefined_" ? (r.set(o, true), t[s2] = void 0) : r.get(o) || (r.set(o, true), e(o));
    });
  }, "mutateUndefined");
}, "mutator"), dt = /* @__PURE__ */ n((r, e = {}) => {
  let t = { ...Is, ...e }, o = JSON.parse(r, Cd(t));
  return Pd()(o), o;
}, "parse");
var vo = "Invariant failed";
function fe(r, e) {
  if (!r) {
    throw new Error(vo);
  }
}
n(fe, "invariant");
var Fs = /* @__PURE__ */ n((r) => {
  let e = Array.from(
    document.querySelectorAll("iframe[data-is-storybook]")
  ), [t, ...o] = e.filter((i) => {
    var _a, _b;
    try {
      return ((_a = i.contentWindow) == null ? void 0 : _a.location.origin) === r.source.location.origin && ((_b = i.contentWindow) == null ? void 0 : _b.location.pathname) === r.source.location.pathname;
    } catch {
    }
    try {
      return i.contentWindow === r.source;
    } catch {
    }
    let a = i.getAttribute("src"), c;
    try {
      if (!a)
        return false;
      ({ origin: c } = new URL(a, document.location.toString()));
    } catch {
      return false;
    }
    return c === r.origin;
  }), s2 = t == null ? void 0 : t.getAttribute("src");
  if (s2 && o.length === 0) {
    let { protocol: i, host: a, pathname: c } = new URL(s2, document.location.toString());
    return `${i}//${a}${c}`;
  }
  return o.length > 0 && I$1.error("found multiple candidates for event source"), null;
}, "getEventSourceUrl");
var { document: wo, location: _o } = E$1, Ds = "storybook-channel", Id = { allowFunction: false, maxDepth: 25 }, Co = class Co2 {
  constructor(e) {
    this.config = e;
    this.connected = false;
    if (this.buffer = [], typeof (E$1 == null ? void 0 : E$1.addEventListener) == "function" && E$1.addEventListener("message", this.handleEvent.bind(this), false), e.page !== "manager" && e.page !== "preview")
      throw new Error(`postmsg-channel: "config.page" cannot be "${e.page}"`);
  }
  setHandler(e) {
    this.handler = (...t) => {
      e.apply(this, t), !this.connected && this.getLocalFrame().length && (this.flush(), this.connected = true);
    };
  }
  /**
   * Sends `event` to the associated window. If the window does not yet exist the event will be
   * stored in a buffer and sent when the window exists.
   *
   * @param event
   */
  send(e, t) {
    let {
      target: o,
      // telejson options
      allowRegExp: s2,
      allowFunction: i,
      allowSymbol: a,
      allowDate: c,
      allowError: l,
      allowUndefined: p,
      allowClass: u,
      maxDepth: d,
      space: h,
      lazyEval: S2
    } = t || {}, m = Object.fromEntries(
      Object.entries({
        allowRegExp: s2,
        allowFunction: i,
        allowSymbol: a,
        allowDate: c,
        allowError: l,
        allowUndefined: p,
        allowClass: u,
        maxDepth: d,
        space: h,
        lazyEval: S2
      }).filter(([g, b2]) => typeof b2 < "u")
    ), T2 = {
      ...Id,
      ...E$1.CHANNEL_OPTIONS || {},
      ...m
    }, y2 = this.getFrames(o), R2 = new URLSearchParams((_o == null ? void 0 : _o.search) || ""), x2 = pt(
      {
        key: Ds,
        event: e,
        refId: R2.get("refId")
      },
      T2
    );
    return y2.length ? (this.buffer.length && this.flush(), y2.forEach((g) => {
      try {
        g.postMessage(x2, "*");
      } catch {
        I$1.error("sending over postmessage fail");
      }
    }), Promise.resolve(null)) : new Promise((g, b2) => {
      this.buffer.push({ event: e, resolve: g, reject: b2 });
    });
  }
  flush() {
    let { buffer: e } = this;
    this.buffer = [], e.forEach((t) => {
      this.send(t.event).then(t.resolve).catch(t.reject);
    });
  }
  getFrames(e) {
    if (this.config.page === "manager") {
      let o = Array.from(
        wo.querySelectorAll("iframe[data-is-storybook][data-is-loaded]")
      ).flatMap((s2) => {
        try {
          return s2.contentWindow && s2.dataset.isStorybook !== void 0 && s2.id === e ? [s2.contentWindow] : [];
        } catch {
          return [];
        }
      });
      return (o == null ? void 0 : o.length) ? o : this.getCurrentFrames();
    }
    return E$1 && E$1.parent && E$1.parent !== E$1.self ? [E$1.parent] : [];
  }
  getCurrentFrames() {
    return this.config.page === "manager" ? Array.from(
      wo.querySelectorAll('[data-is-storybook="true"]')
    ).flatMap((t) => t.contentWindow ? [t.contentWindow] : []) : E$1 && E$1.parent ? [E$1.parent] : [];
  }
  getLocalFrame() {
    return this.config.page === "manager" ? Array.from(
      wo.querySelectorAll("#storybook-preview-iframe")
    ).flatMap((t) => t.contentWindow ? [t.contentWindow] : []) : E$1 && E$1.parent ? [E$1.parent] : [];
  }
  handleEvent(e) {
    try {
      let { data: t } = e, { key: o, event: s2, refId: i } = typeof t == "string" && Sr(t) ? dt(t, E$1.CHANNEL_OPTIONS || {}) : t;
      if (o === Ds) {
        let a = this.config.page === "manager" ? '<span style="color: #37D5D3; background: black"> manager </span>' : '<span style="color: #1EA7FD; background: black"> preview </span>', c = Object.values(ge).includes(s2.type) ? `<span style="color: #FF4785">${s2.type}</span>` : `<span style="color: #FFAE00">${s2.type}</span>`;
        if (i && (s2.refId = i), s2.source = this.config.page === "preview" ? e.origin : Fs(e), !s2.source) {
          X.error(
            `${a} received ${c} but was unable to determine the source of the event`
          );
          return;
        }
        let l = `${a} received ${c} (${t.length})`;
        X.debug(
          _o.origin !== s2.source ? l : `${l} <span style="color: gray">(on ${_o.origin} from ${s2.source})</span>`,
          ...s2.args
        ), fe(this.handler, "ChannelHandler should be set"), this.handler(s2);
      }
    } catch (t) {
      I$1.error(t);
    }
  }
};
n(Co, "PostMessageTransport");
var Qe = Co;
var { WebSocket: Fd } = E$1, Po = 15e3, Oo = 5e3, Io = class Io2 {
  constructor({ url: e, onError: t, page: o }) {
    this.buffer = [];
    this.isReady = false;
    this.isClosed = false;
    this.pingTimeout = 0;
    this.socket = new Fd(e), this.socket.onopen = () => {
      this.isReady = true, this.heartbeat(), this.flush();
    }, this.socket.onmessage = ({ data: s2 }) => {
      let i = typeof s2 == "string" && Sr(s2) ? dt(s2) : s2;
      fe(this.handler), this.handler(i), i.type === "ping" && (this.heartbeat(), this.send({ type: "pong" }));
    }, this.socket.onerror = (s2) => {
      t && t(s2);
    }, this.socket.onclose = (s2) => {
      fe(this.handler), this.handler({
        type: Wt,
        args: [{ reason: s2.reason, code: s2.code }],
        from: o || "preview"
      }), this.isClosed = true, clearTimeout(this.pingTimeout);
    };
  }
  heartbeat() {
    clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
      this.socket.close(3008, "timeout");
    }, Po + Oo);
  }
  setHandler(e) {
    this.handler = e;
  }
  send(e) {
    this.isClosed || (this.isReady ? this.sendNow(e) : this.sendLater(e));
  }
  sendLater(e) {
    this.buffer.push(e);
  }
  sendNow(e) {
    let t = pt(e, {
      maxDepth: 15,
      allowFunction: false,
      ...E$1.CHANNEL_OPTIONS
    });
    this.socket.send(t);
  }
  flush() {
    let { buffer: e } = this;
    this.buffer = [], e.forEach((t) => this.send(t));
  }
};
n(Io, "WebsocketTransport");
var Ze = Io;
var { CONFIG_TYPE: Dd } = E$1, Nd = ie;
function kd({ page: r, extraTransports: e = [] }) {
  let t = [new Qe({ page: r }), ...e];
  if (Dd === "DEVELOPMENT") {
    let s2 = window.location.protocol === "http:" ? "ws" : "wss", { hostname: i, port: a } = window.location, c = `${s2}://${i}:${a}/storybook-server-channel`;
    t.push(new Ze({ url: c, onError: /* @__PURE__ */ n(() => {
    }, "onError"), page: r }));
  }
  let o = new ie({ transports: t });
  return Q.__prepare(
    o,
    r === "manager" ? Q.Environment.MANAGER : Q.Environment.PREVIEW
  ), o;
}
n(kd, "createBrowserChannel");
var Tr = {};
_e(Tr, {
  Addon_TypesEnum: () => Ns
});
var Ns = /* @__PURE__ */ ((p) => (p.TAB = "tab", p.PANEL = "panel", p.TOOL = "tool", p.TOOLEXTRA = "toolextra", p.PREVIEW = "preview", p.experimental_PAGE = "page", p.experimental_SIDEBAR_BOTTOM = "sidebar-bottom", p.experimental_SIDEBAR_TOP = "sidebar-top", p.experimental_TEST_PROVIDER = "test-provider", p))(Ns || {});
var Yr = {};
_e(Yr, {
  DocsContext: () => me,
  HooksContext: () => be,
  Preview: () => Me,
  PreviewWeb: () => Wr,
  PreviewWithSelection: () => Ue,
  ReporterAPI: () => Ee,
  StoryStore: () => Le,
  UrlStore: () => Be,
  WebView: () => He,
  addons: () => te$1,
  applyHooks: () => ft,
  combineArgs: () => tr,
  combineParameters: () => Y,
  composeConfigs: () => ke,
  composeStepRunners: () => Ct,
  composeStories: () => qi,
  composeStory: () => Pn,
  createPlaywrightTest: () => Bi,
  decorateStory: () => xn,
  defaultDecorateStory: () => vt,
  definePreview: () => ks,
  experimental_MockUniversalStore: () => gt,
  experimental_UniversalStore: () => Q,
  experimental_useUniversalStore: () => Si,
  filterArgTypes: () => Mr,
  getCsfFactoryAnnotations: () => Pt,
  inferControls: () => ir,
  makeDecorator: () => $s,
  mockChannel: () => ut,
  normalizeProjectAnnotations: () => Ne,
  normalizeStory: () => De,
  prepareMeta: () => wt,
  prepareStory: () => sr,
  sanitizeStoryContextUpdate: () => vn,
  setDefaultProjectAnnotations: () => Ui,
  setProjectAnnotations: () => Gi,
  simulateDOMContentLoaded: () => $r,
  simulatePageLoad: () => ss,
  sortStoriesV7: () => Ki,
  useArgs: () => zs,
  useCallback: () => er,
  useChannel: () => Vs,
  useEffect: () => Er,
  useGlobals: () => Ws,
  useMemo: () => Ms,
  useParameter: () => Hs,
  useReducer: () => Bs,
  useRef: () => Gs,
  useState: () => mt,
  useStoryContext: () => Rr,
  userOrAutoTitle: () => Wi,
  userOrAutoTitleFromSpecifier: () => Fn
});
function ut() {
  let r = {
    setHandler: /* @__PURE__ */ n(() => {
    }, "setHandler"),
    send: /* @__PURE__ */ n(() => {
    }, "send")
  };
  return new ie({ transport: r });
}
n(ut, "mockChannel");
var No = class No2 {
  constructor() {
    this.getChannel = /* @__PURE__ */ n(() => {
      if (!this.channel) {
        let e = ut();
        return this.setChannel(e), e;
      }
      return this.channel;
    }, "getChannel");
    this.ready = /* @__PURE__ */ n(() => this.promise, "ready");
    this.hasChannel = /* @__PURE__ */ n(() => !!this.channel, "hasChannel");
    this.setChannel = /* @__PURE__ */ n((e) => {
      this.channel = e, this.resolve();
    }, "setChannel");
    this.promise = new Promise((e) => {
      this.resolve = () => e(this.getChannel());
    });
  }
};
n(No, "AddonStore");
var Do = No, Fo = "__STORYBOOK_ADDONS_PREVIEW";
function Ld() {
  return E$1[Fo] || (E$1[Fo] = new Do()), E$1[Fo];
}
n(Ld, "getAddonsStore");
var te$1 = Ld();
function ks(r) {
  return r;
}
n(ks, "definePreview");
var Mo = class Mo2 {
  constructor() {
    this.hookListsMap = void 0;
    this.mountedDecorators = void 0;
    this.prevMountedDecorators = void 0;
    this.currentHooks = void 0;
    this.nextHookIndex = void 0;
    this.currentPhase = void 0;
    this.currentEffects = void 0;
    this.prevEffects = void 0;
    this.currentDecoratorName = void 0;
    this.hasUpdates = void 0;
    this.currentContext = void 0;
    this.renderListener = /* @__PURE__ */ n((e) => {
      var _a;
      e === ((_a = this.currentContext) == null ? void 0 : _a.id) && (this.triggerEffects(), this.currentContext = null, this.removeRenderListeners());
    }, "renderListener");
    this.init();
  }
  init() {
    this.hookListsMap = /* @__PURE__ */ new WeakMap(), this.mountedDecorators = /* @__PURE__ */ new Set(), this.prevMountedDecorators = /* @__PURE__ */ new Set(), this.currentHooks = [], this.nextHookIndex = 0, this.currentPhase = "NONE", this.currentEffects = [], this.prevEffects = [], this.currentDecoratorName = null, this.hasUpdates = false, this.currentContext = null;
  }
  clean() {
    this.prevEffects.forEach((e) => {
      e.destroy && e.destroy();
    }), this.init(), this.removeRenderListeners();
  }
  getNextHook() {
    let e = this.currentHooks[this.nextHookIndex];
    return this.nextHookIndex += 1, e;
  }
  triggerEffects() {
    this.prevEffects.forEach((e) => {
      !this.currentEffects.includes(e) && e.destroy && e.destroy();
    }), this.currentEffects.forEach((e) => {
      this.prevEffects.includes(e) || (e.destroy = e.create());
    }), this.prevEffects = this.currentEffects, this.currentEffects = [];
  }
  addRenderListeners() {
    this.removeRenderListeners(), te$1.getChannel().on(We, this.renderListener);
  }
  removeRenderListeners() {
    te$1.getChannel().removeListener(We, this.renderListener);
  }
};
n(Mo, "HooksContext");
var be = Mo;
function Ls(r) {
  let e = /* @__PURE__ */ n((...t) => {
    let { hooks: o } = typeof t[0] == "function" ? t[1] : t[0], s2 = o.currentPhase, i = o.currentHooks, a = o.nextHookIndex, c = o.currentDecoratorName;
    o.currentDecoratorName = r.name, o.prevMountedDecorators.has(r) ? (o.currentPhase = "UPDATE", o.currentHooks = o.hookListsMap.get(r) || []) : (o.currentPhase = "MOUNT", o.currentHooks = [], o.hookListsMap.set(r, o.currentHooks), o.prevMountedDecorators.add(r)), o.nextHookIndex = 0;
    let l = E$1.STORYBOOK_HOOKS_CONTEXT;
    E$1.STORYBOOK_HOOKS_CONTEXT = o;
    let p = r(...t);
    if (E$1.STORYBOOK_HOOKS_CONTEXT = l, o.currentPhase === "UPDATE" && o.getNextHook() != null)
      throw new Error(
        "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
      );
    return o.currentPhase = s2, o.currentHooks = i, o.nextHookIndex = a, o.currentDecoratorName = c, p;
  }, "hookified");
  return e.originalFn = r, e;
}
n(Ls, "hookify");
var ko = 0, jd = 25, ft = /* @__PURE__ */ n((r) => (e, t) => {
  let o = r(
    Ls(e),
    t.map((s2) => Ls(s2))
  );
  return (s2) => {
    let { hooks: i } = s2;
    i.prevMountedDecorators ?? (i.prevMountedDecorators = /* @__PURE__ */ new Set()), i.mountedDecorators = /* @__PURE__ */ new Set([e, ...t]), i.currentContext = s2, i.hasUpdates = false;
    let a = o(s2);
    for (ko = 1; i.hasUpdates; )
      if (i.hasUpdates = false, i.currentEffects = [], a = o(s2), ko += 1, ko > jd)
        throw new Error(
          "Too many re-renders. Storybook limits the number of renders to prevent an infinite loop."
        );
    return i.addRenderListeners(), a;
  };
}, "applyHooks"), Md = /* @__PURE__ */ n((r, e) => r.length === e.length && r.every((t, o) => t === e[o]), "areDepsEqual"), Lo = /* @__PURE__ */ n(
  () => new Error("Storybook preview hooks can only be called inside decorators and story functions."),
  "invalidHooksError"
);
function js() {
  return E$1.STORYBOOK_HOOKS_CONTEXT || null;
}
n(js, "getHooksContextOrNull");
function jo() {
  let r = js();
  if (r == null)
    throw Lo();
  return r;
}
n(jo, "getHooksContextOrThrow");
function Ud(r, e, t) {
  let o = jo();
  if (o.currentPhase === "MOUNT") {
    t != null && !Array.isArray(t) && I$1.warn(
      `${r} received a final argument that is not an array (instead, received ${t}). When specified, the final argument must be an array.`
    );
    let s2 = { name: r, deps: t };
    return o.currentHooks.push(s2), e(s2), s2;
  }
  if (o.currentPhase === "UPDATE") {
    let s2 = o.getNextHook();
    if (s2 == null)
      throw new Error("Rendered more hooks than during the previous render.");
    return s2.name !== r && I$1.warn(
      `Storybook has detected a change in the order of Hooks${o.currentDecoratorName ? ` called by ${o.currentDecoratorName}` : ""}. This will lead to bugs and errors if not fixed.`
    ), t != null && s2.deps == null && I$1.warn(
      `${r} received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.`
    ), t != null && s2.deps != null && t.length !== s2.deps.length && I$1.warn(`The final argument passed to ${r} changed size between renders. The order and size of this array must remain constant.
Previous: ${s2.deps}
Incoming: ${t}`), (t == null || s2.deps == null || !Md(t, s2.deps)) && (e(s2), s2.deps = t), s2;
  }
  throw Lo();
}
n(Ud, "useHook");
function yt(r, e, t) {
  let { memoizedState: o } = Ud(
    r,
    (s2) => {
      s2.memoizedState = e();
    },
    t
  );
  return o;
}
n(yt, "useMemoLike");
function Ms(r, e) {
  return yt("useMemo", r, e);
}
n(Ms, "useMemo");
function er(r, e) {
  return yt("useCallback", () => r, e);
}
n(er, "useCallback");
function Us(r, e) {
  return yt(r, () => ({ current: e }), []);
}
n(Us, "useRefLike");
function Gs(r) {
  return Us("useRef", r);
}
n(Gs, "useRef");
function Gd() {
  let r = js();
  if (r != null && r.currentPhase !== "NONE")
    r.hasUpdates = true;
  else
    try {
      te$1.getChannel().emit(dr);
    } catch {
      I$1.warn("State updates of Storybook preview hooks work only in browser");
    }
}
n(Gd, "triggerUpdate");
function qs(r, e) {
  let t = Us(
    r,
    // @ts-expect-error S type should never be function, but there's no way to tell that to TypeScript
    typeof e == "function" ? e() : e
  ), o = /* @__PURE__ */ n((s2) => {
    t.current = typeof s2 == "function" ? s2(t.current) : s2, Gd();
  }, "setState");
  return [t.current, o];
}
n(qs, "useStateLike");
function mt(r) {
  return qs("useState", r);
}
n(mt, "useState");
function Bs(r, e, t) {
  let o = t != null ? () => t(e) : e, [s2, i] = qs("useReducer", o);
  return [s2, /* @__PURE__ */ n((c) => i((l) => r(l, c)), "dispatch")];
}
n(Bs, "useReducer");
function Er(r, e) {
  let t = jo(), o = yt("useEffect", () => ({ create: r }), e);
  t.currentEffects.includes(o) || t.currentEffects.push(o);
}
n(Er, "useEffect");
function Vs(r, e = []) {
  let t = te$1.getChannel();
  return Er(() => (Object.entries(r).forEach(([o, s2]) => t.on(o, s2)), () => {
    Object.entries(r).forEach(
      ([o, s2]) => t.removeListener(o, s2)
    );
  }), [...Object.keys(r), ...e]), er(t.emit.bind(t), [t]);
}
n(Vs, "useChannel");
function Rr() {
  let { currentContext: r } = jo();
  if (r == null)
    throw Lo();
  return r;
}
n(Rr, "useStoryContext");
function Hs(r, e) {
  let { parameters: t } = Rr();
  if (r)
    return t[r] ?? e;
}
n(Hs, "useParameter");
function zs() {
  let r = te$1.getChannel(), { id: e, args: t } = Rr(), o = er(
    (i) => r.emit(yr, { storyId: e, updatedArgs: i }),
    [r, e]
  ), s2 = er(
    (i) => r.emit(ur, { storyId: e, argNames: i }),
    [r, e]
  );
  return [t, o, s2];
}
n(zs, "useArgs");
function Ws() {
  let r = te$1.getChannel(), { globals: e } = Rr(), t = er(
    (o) => r.emit(fr, { globals: o }),
    [r]
  );
  return [e, t];
}
n(Ws, "useGlobals");
var $s = /* @__PURE__ */ n(({
  name: r,
  parameterName: e,
  wrapper: t,
  skipIfNoParametersOrOptions: o = false
}) => {
  let s2 = /* @__PURE__ */ n((i) => (a, c) => {
    let l = c.parameters && c.parameters[e];
    return l && l.disable || o && !i && !l ? a(c) : t(a, c, {
      options: i,
      parameters: l
    });
  }, "decorator");
  return (...i) => typeof i[0] == "function" ? s2()(...i) : (...a) => {
    if (a.length > 1)
      return i.length > 1 ? s2(i)(...a) : s2(...i)(...a);
    throw new Error(
      `Passing stories directly into ${r}() is not allowed,
        instead use addDecorator(${r}) and pass options with the '${e}' parameter`
    );
  };
}, "makeDecorator");
function Uo(r, e) {
  let t = {}, o = Object.entries(r);
  for (let s2 = 0; s2 < o.length; s2++) {
    let [i, a] = o[s2];
    e(a, i) || (t[i] = a);
  }
  return t;
}
n(Uo, "omitBy");
function Go(r, e) {
  let t = {};
  for (let o = 0; o < e.length; o++) {
    let s2 = e[o];
    Object.prototype.hasOwnProperty.call(r, s2) && (t[s2] = r[s2]);
  }
  return t;
}
n(Go, "pick");
function qo(r, e) {
  let t = {}, o = Object.entries(r);
  for (let s2 = 0; s2 < o.length; s2++) {
    let [i, a] = o[s2];
    e(a, i) && (t[i] = a);
  }
  return t;
}
n(qo, "pickBy");
function $$1(r) {
  if (typeof r != "object" || r == null)
    return false;
  if (Object.getPrototypeOf(r) === null)
    return true;
  if (r.toString() !== "[object Object]")
    return false;
  let e = r;
  for (; Object.getPrototypeOf(e) !== null; )
    e = Object.getPrototypeOf(e);
  return Object.getPrototypeOf(r) === e;
}
n($$1, "isPlainObject");
function oe(r, e) {
  let t = {}, o = Object.keys(r);
  for (let s2 = 0; s2 < o.length; s2++) {
    let i = o[s2], a = r[i];
    t[i] = e(a, i, r);
  }
  return t;
}
n(oe, "mapValues");
var Ys = "[object RegExp]", Ks = "[object String]", Xs = "[object Number]", Js = "[object Boolean]", Bo = "[object Arguments]", Qs = "[object Symbol]", Zs = "[object Date]", ei = "[object Map]", ri = "[object Set]", ti = "[object Array]", oi = "[object Function]", ni = "[object ArrayBuffer]", ht = "[object Object]", si = "[object Error]", ii = "[object DataView]", ai = "[object Uint8Array]", li = "[object Uint8ClampedArray]", ci = "[object Uint16Array]", pi = "[object Uint32Array]", di = "[object BigUint64Array]", ui = "[object Int8Array]", fi = "[object Int16Array]", yi = "[object Int32Array]", mi = "[object BigInt64Array]", hi = "[object Float32Array]", gi = "[object Float64Array]";
function Vo(r) {
  return Object.getOwnPropertySymbols(r).filter((e) => Object.prototype.propertyIsEnumerable.call(r, e));
}
n(Vo, "getSymbols");
function Ho(r) {
  return r == null ? r === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(r);
}
n(Ho, "getTag");
function Ar(r, e) {
  if (typeof r == typeof e)
    switch (typeof r) {
      case "bigint":
      case "string":
      case "boolean":
      case "symbol":
      case "undefined":
        return r === e;
      case "number":
        return r === e || Object.is(r, e);
      case "function":
        return r === e;
      case "object":
        return ye(r, e);
    }
  return ye(r, e);
}
n(Ar, "isEqual");
function ye(r, e, t) {
  if (Object.is(r, e))
    return true;
  let o = Ho(r), s2 = Ho(e);
  if (o === Bo && (o = ht), s2 === Bo && (s2 = ht), o !== s2)
    return false;
  switch (o) {
    case Ks:
      return r.toString() === e.toString();
    case Xs: {
      let c = r.valueOf(), l = e.valueOf();
      return c === l || Number.isNaN(c) && Number.isNaN(l);
    }
    case Js:
    case Zs:
    case Qs:
      return Object.is(r.valueOf(), e.valueOf());
    case Ys:
      return r.source === e.source && r.flags === e.flags;
    case oi:
      return r === e;
  }
  t = t ?? /* @__PURE__ */ new Map();
  let i = t.get(r), a = t.get(e);
  if (i != null && a != null)
    return i === e;
  t.set(r, e), t.set(e, r);
  try {
    switch (o) {
      case ei: {
        if (r.size !== e.size)
          return false;
        for (let [c, l] of r.entries())
          if (!e.has(c) || !ye(l, e.get(c), t))
            return false;
        return true;
      }
      case ri: {
        if (r.size !== e.size)
          return false;
        let c = Array.from(r.values()), l = Array.from(e.values());
        for (let p = 0; p < c.length; p++) {
          let u = c[p], d = l.findIndex((h) => ye(u, h, t));
          if (d === -1)
            return false;
          l.splice(d, 1);
        }
        return true;
      }
      case ti:
      case ai:
      case li:
      case ci:
      case pi:
      case di:
      case ui:
      case fi:
      case yi:
      case mi:
      case hi:
      case gi: {
        if (typeof Buffer < "u" && Buffer.isBuffer(r) !== Buffer.isBuffer(e) || r.length !== e.length)
          return false;
        for (let c = 0; c < r.length; c++)
          if (!ye(r[c], e[c], t))
            return false;
        return true;
      }
      case ni:
        return r.byteLength !== e.byteLength ? false : ye(new Uint8Array(r), new Uint8Array(e), t);
      case ii:
        return r.byteLength !== e.byteLength || r.byteOffset !== e.byteOffset ? false : ye(r.buffer, e.buffer, t);
      case si:
        return r.name === e.name && r.message === e.message;
      case ht: {
        if (!(ye(r.constructor, e.constructor, t) || $$1(r) && $$1(e)))
          return false;
        let l = [...Object.keys(r), ...Vo(r)], p = [...Object.keys(e), ...Vo(e)];
        if (l.length !== p.length)
          return false;
        for (let u = 0; u < l.length; u++) {
          let d = l[u], h = r[d];
          if (!Object.prototype.hasOwnProperty.call(e, d))
            return false;
          let S2 = e[d];
          if (!ye(h, S2, t))
            return false;
        }
        return true;
      }
      default:
        return false;
    }
  } finally {
    t.delete(r), t.delete(e);
  }
}
n(ye, "areObjectsEqual");
var Si = /* @__PURE__ */ n((r, e) => {
  let [t, o] = mt(
    e ? e(r.getState()) : r.getState()
  );
  return Er(() => r.onStateChange((s2, i) => {
    if (!e) {
      o(s2);
      return;
    }
    let a = e(s2), c = e(i);
    !Ar(a, c) && o(a);
  }), [r, o, e]), [t, r.setState];
}, "useUniversalStore");
var St = class St2 extends Q {
  constructor(e, t) {
    Q.isInternalConstructing = true, super(
      { ...e, leader: true },
      { channel: new ie({}), environment: Q.Environment.MOCK }
    ), Q.isInternalConstructing = false, typeof (t == null ? void 0 : t.fn) == "function" && (this.testUtils = t, this.getState = t.fn(this.getState), this.setState = t.fn(this.setState), this.subscribe = t.fn(this.subscribe), this.onStateChange = t.fn(this.onStateChange), this.send = t.fn(this.send));
  }
  /** Create a mock universal store. This is just an alias for the constructor */
  static create(e, t) {
    return new St2(e, t);
  }
  unsubscribeAll() {
    var _a, _b;
    if (!this.testUtils)
      throw new Error(
        ps`Cannot call unsubscribeAll on a store that does not have testUtils.
        Please provide testUtils as the second argument when creating the store.`
      );
    let e = /* @__PURE__ */ n((t) => {
      try {
        t.value();
      } catch {
      }
    }, "callReturnedUnsubscribeFn");
    (_a = this.subscribe.mock) == null ? void 0 : _a.results.forEach(e), (_b = this.onStateChange.mock) == null ? void 0 : _b.results.forEach(e);
  }
};
n(St, "MockUniversalStore");
var gt = St;
var kr = {};
_e(kr, {
  CalledExtractOnStoreError: () => vr,
  CalledPreviewMethodBeforeInitializationError: () => V,
  Category: () => Ti,
  EmptyIndexError: () => Pr,
  ImplicitActionsDuringRendering: () => zo,
  MdxFileWithNoCsfReferencesError: () => Cr,
  MissingRenderToCanvasError: () => wr,
  MissingStoryAfterHmrError: () => xr,
  MissingStoryFromCsfFileError: () => Ir,
  MountMustBeDestructuredError: () => Oe,
  NextJsSharpError: () => Wo,
  NextjsRouterMocksNotAvailable: () => $o,
  NoRenderFunctionError: () => Dr,
  NoStoryMatchError: () => Or,
  NoStoryMountedError: () => Nr,
  StoryIndexFetchError: () => _r,
  StoryStoreAccessedBeforeInitializationError: () => Fr,
  UnknownArgTypesError: () => Yo,
  UnsupportedViewportDimensionError: () => Ko
});
function bi({
  code: r,
  category: e
}) {
  let t = String(r).padStart(4, "0");
  return `SB_${e}_${t}`;
}
n(bi, "parseErrorCode");
var bt = class bt2 extends Error {
  constructor(t) {
    super(bt2.getFullMessage(t));
    this.data = {};
    this.fromStorybook = true;
    this.category = t.category, this.documentation = t.documentation ?? false, this.code = t.code;
  }
  get fullErrorCode() {
    return bi({ code: this.code, category: this.category });
  }
  /** Overrides the default `Error.name` property in the format: SB_<CATEGORY>_<CODE>. */
  get name() {
    let t = this.constructor.name;
    return `${this.fullErrorCode} (${t})`;
  }
  /** Generates the error message along with additional documentation link (if applicable). */
  static getFullMessage({
    documentation: t,
    code: o,
    category: s2,
    message: i
  }) {
    let a;
    return t === true ? a = `https://storybook.js.org/error/${bi({ code: o, category: s2 })}` : typeof t == "string" ? a = t : Array.isArray(t) && (a = `
${t.map((c) => `	- ${c}`).join(`
`)}`), `${i}${a != null ? `

More info: ${a}
` : ""}`;
  }
};
n(bt, "StorybookError");
var G = bt;
var Ti = /* @__PURE__ */ ((b2) => (b2.BLOCKS = "BLOCKS", b2.DOCS_TOOLS = "DOCS-TOOLS", b2.PREVIEW_CLIENT_LOGGER = "PREVIEW_CLIENT-LOGGER", b2.PREVIEW_CHANNELS = "PREVIEW_CHANNELS", b2.PREVIEW_CORE_EVENTS = "PREVIEW_CORE-EVENTS", b2.PREVIEW_INSTRUMENTER = "PREVIEW_INSTRUMENTER", b2.PREVIEW_API = "PREVIEW_API", b2.PREVIEW_REACT_DOM_SHIM = "PREVIEW_REACT-DOM-SHIM", b2.PREVIEW_ROUTER = "PREVIEW_ROUTER", b2.PREVIEW_THEMING = "PREVIEW_THEMING", b2.RENDERER_HTML = "RENDERER_HTML", b2.RENDERER_PREACT = "RENDERER_PREACT", b2.RENDERER_REACT = "RENDERER_REACT", b2.RENDERER_SERVER = "RENDERER_SERVER", b2.RENDERER_SVELTE = "RENDERER_SVELTE", b2.RENDERER_VUE = "RENDERER_VUE", b2.RENDERER_VUE3 = "RENDERER_VUE3", b2.RENDERER_WEB_COMPONENTS = "RENDERER_WEB-COMPONENTS", b2.FRAMEWORK_NEXTJS = "FRAMEWORK_NEXTJS", b2.ADDON_VITEST = "ADDON_VITEST", b2))(Ti || {}), Xo = class Xo2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 1,
      message: _$1`
        Couldn't find story matching id '${t.storyId}' after HMR.
        - Did you just rename a story?
        - Did you remove it from your CSF file?
        - Are you sure a story with the id '${t.storyId}' exists?
        - Please check the values in the stories field of your main.js config and see if they would match your CSF File.
        - Also check the browser console and terminal for potential error messages.`
    });
    this.data = t;
  }
};
n(Xo, "MissingStoryAfterHmrError");
var xr = Xo, Jo = class Jo2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 2,
      documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#using-implicit-actions-during-rendering-is-deprecated-for-example-in-the-play-function",
      message: _$1`
        We detected that you use an implicit action arg while ${t.phase} of your story.  
        ${t.deprecated ? `
This is deprecated and won't work in Storybook 8 anymore.
` : ""}
        Please provide an explicit spy to your args like this:
          import { fn } from '@storybook/test';
          ... 
          args: {
           ${t.name}: fn()
          }`
    });
    this.data = t;
  }
};
n(Jo, "ImplicitActionsDuringRendering");
var zo = Jo, Qo = class Qo2 extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 3,
      message: _$1`
        Cannot call \`storyStore.extract()\` without calling \`storyStore.cacheAllCsfFiles()\` first.

        You probably meant to call \`await preview.extract()\` which does the above for you.`
    });
  }
};
n(Qo, "CalledExtractOnStoreError");
var vr = Qo, Zo = class Zo2 extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 4,
      message: _$1`
        Expected your framework's preset to export a \`renderToCanvas\` field.

        Perhaps it needs to be upgraded for Storybook 7.0?`,
      documentation: "https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#mainjs-framework-field"
    });
  }
};
n(Zo, "MissingRenderToCanvasError");
var wr = Zo, en = class en2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 5,
      message: _$1`
        Called \`Preview.${t.methodName}()\` before initialization.
        
        The preview needs to load the story index before most methods can be called. If you want
        to call \`${t.methodName}\`, try \`await preview.initializationPromise;\` first.
        
        If you didn't call the above code, then likely it was called by an addon that needs to
        do the above.`
    });
    this.data = t;
  }
};
n(en, "CalledPreviewMethodBeforeInitializationError");
var V = en, rn = class rn2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 6,
      message: _$1`
        Error fetching \`/index.json\`:
        
        ${t.text}

        If you are in development, this likely indicates a problem with your Storybook process,
        check the terminal for errors.

        If you are in a deployed Storybook, there may have been an issue deploying the full Storybook
        build.`
    });
    this.data = t;
  }
};
n(rn, "StoryIndexFetchError");
var _r = rn, tn = class tn2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 7,
      message: _$1`
        Tried to render docs entry ${t.storyId} but it is a MDX file that has no CSF
        references, or autodocs for a CSF file that some doesn't refer to itself.
        
        This likely is an internal error in Storybook's indexing, or you've attached the
        \`attached-mdx\` tag to an MDX file that is not attached.`
    });
    this.data = t;
  }
};
n(tn, "MdxFileWithNoCsfReferencesError");
var Cr = tn, on = class on2 extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 8,
      message: _$1`
        Couldn't find any stories in your Storybook.

        - Please check your stories field of your main.js config: does it match correctly?
        - Also check the browser console and terminal for error messages.`
    });
  }
};
n(on, "EmptyIndexError");
var Pr = on, nn = class nn2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 9,
      message: _$1`
        Couldn't find story matching '${t.storySpecifier}'.

        - Are you sure a story with that id exists?
        - Please check your stories field of your main.js config.
        - Also check the browser console and terminal for error messages.`
    });
    this.data = t;
  }
};
n(nn, "NoStoryMatchError");
var Or = nn, sn = class sn2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 10,
      message: _$1`
        Couldn't find story matching id '${t.storyId}' after importing a CSF file.

        The file was indexed as if the story was there, but then after importing the file in the browser
        we didn't find the story. Possible reasons:
        - You are using a custom story indexer that is misbehaving.
        - You have a custom file loader that is removing or renaming exports.

        Please check your browser console and terminal for errors that may explain the issue.`
    });
    this.data = t;
  }
};
n(sn, "MissingStoryFromCsfFileError");
var Ir = sn, an = class an2 extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 11,
      message: _$1`
        Cannot access the Story Store until the index is ready.

        It is not recommended to use methods directly on the Story Store anyway, in Storybook 9 we will
        remove access to the store entirely`
    });
  }
};
n(an, "StoryStoreAccessedBeforeInitializationError");
var Fr = an, ln = class ln2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 12,
      message: _$1`
      Incorrect use of mount in the play function.
      
      To use mount in the play function, you must satisfy the following two requirements: 
      
      1. You *must* destructure the mount property from the \`context\` (the argument passed to your play function). 
         This makes sure that Storybook does not start rendering the story before the play function begins.
      
      2. Your Storybook framework or builder must be configured to transpile to ES2017 or newer. 
         This is because destructuring statements and async/await usages are otherwise transpiled away, 
         which prevents Storybook from recognizing your usage of \`mount\`.
      
      Note that Angular is not supported. As async/await is transpiled to support the zone.js polyfill. 
      
      More info: https://storybook.js.org/docs/writing-tests/interaction-testing#run-code-before-the-component-gets-rendered
      
      Received the following play function:
      ${t.playFunction}`
    });
    this.data = t;
  }
};
n(ln, "MountMustBeDestructuredError");
var Oe = ln, cn = class cn2 extends G {
  constructor(t) {
    super({
      category: "PREVIEW_API",
      code: 14,
      message: _$1`
        No render function available for storyId '${t.id}'
      `
    });
    this.data = t;
  }
};
n(cn, "NoRenderFunctionError");
var Dr = cn, pn = class pn2 extends G {
  constructor() {
    super({
      category: "PREVIEW_API",
      code: 15,
      message: _$1`
        No component is mounted in your story.
        
        This usually occurs when you destructure mount in the play function, but forget to call it.
        
        For example:

        async play({ mount, canvasElement }) {
          // 👈 mount should be called: await mount(); 
          const canvas = within(canvasElement);
          const button = await canvas.findByRole('button');
          await userEvent.click(button);
        };

        Make sure to either remove it or call mount in your play function.
      `
    });
  }
};
n(pn, "NoStoryMountedError");
var Nr = pn, dn = class dn2 extends G {
  constructor() {
    super({
      category: "FRAMEWORK_NEXTJS",
      code: 1,
      documentation: "https://storybook.js.org/docs/get-started/nextjs#faq",
      message: _$1`
      You are importing avif images, but you don't have sharp installed.

      You have to install sharp in order to use image optimization features in Next.js.
      `
    });
  }
};
n(dn, "NextJsSharpError");
var Wo = dn, un = class un2 extends G {
  constructor(t) {
    super({
      category: "FRAMEWORK_NEXTJS",
      code: 2,
      message: _$1`
        Tried to access router mocks from "${t.importType}" but they were not created yet. You might be running code in an unsupported environment.
      `
    });
    this.data = t;
  }
};
n(un, "NextjsRouterMocksNotAvailable");
var $o = un, fn = class fn2 extends G {
  constructor(t) {
    super({
      category: "DOCS-TOOLS",
      code: 1,
      documentation: "https://github.com/storybookjs/storybook/issues/26606",
      message: _$1`
        There was a failure when generating detailed ArgTypes in ${t.language} for:
        ${JSON.stringify(t.type, null, 2)} 
        
        Storybook will fall back to use a generic type description instead.

        This type is either not supported or it is a bug in the docgen generation in Storybook.
        If you think this is a bug, please detail it as much as possible in the Github issue.
      `
    });
    this.data = t;
  }
};
n(fn, "UnknownArgTypesError");
var Yo = fn, yn = class yn2 extends G {
  constructor(t) {
    super({
      category: "ADDON_VITEST",
      code: 1,
      // TODO: Add documentation about viewports support
      // documentation: '',
      message: _$1`
        Encountered an unsupported value "${t.value}" when setting the viewport ${t.dimension} dimension.
        
        The Storybook plugin only supports values in the following units:
        - px, vh, vw, em, rem and %.
        
        You can either change the viewport for this story to use one of the supported units or skip the test by adding '!test' to the story's tags per https://storybook.js.org/docs/writing-stories/tags
      `
    });
    this.data = t;
  }
};
n(yn, "UnsupportedViewportDimensionError");
var Ko = yn;
var Ot = ue(it());
var rr = Symbol("incompatible"), mn = /* @__PURE__ */ n((r, e) => {
  let t = e.type;
  if (r == null || !t || e.mapping)
    return r;
  switch (t.name) {
    case "string":
      return String(r);
    case "enum":
      return r;
    case "number":
      return Number(r);
    case "boolean":
      return String(r) === "true";
    case "array":
      return !t.value || !Array.isArray(r) ? rr : r.reduce((o, s2, i) => {
        let a = mn(s2, { type: t.value });
        return a !== rr && (o[i] = a), o;
      }, new Array(r.length));
    case "object":
      return typeof r == "string" || typeof r == "number" ? r : !t.value || typeof r != "object" ? rr : Object.entries(r).reduce((o, [s2, i]) => {
        let a = mn(i, { type: t.value[s2] });
        return a === rr ? o : Object.assign(o, { [s2]: a });
      }, {});
    default:
      return rr;
  }
}, "map"), Ei = /* @__PURE__ */ n((r, e) => Object.entries(r).reduce((t, [o, s2]) => {
  if (!e[o])
    return t;
  let i = mn(s2, e[o]);
  return i === rr ? t : Object.assign(t, { [o]: i });
}, {}), "mapArgsToTypes"), tr = /* @__PURE__ */ n((r, e) => Array.isArray(r) && Array.isArray(e) ? e.reduce(
  (t, o, s2) => (t[s2] = tr(r[s2], e[s2]), t),
  [...r]
).filter((t) => t !== void 0) : !$$1(r) || !$$1(e) ? e : Object.keys({ ...r, ...e }).reduce((t, o) => {
  if (o in e) {
    let s2 = tr(r[o], e[o]);
    s2 !== void 0 && (t[o] = s2);
  } else
    t[o] = r[o];
  return t;
}, {}), "combineArgs"), Ri = /* @__PURE__ */ n((r, e) => Object.entries(e).reduce((t, [o, { options: s2 }]) => {
  function i() {
    return o in r && (t[o] = r[o]), t;
  }
  if (n(i, "allowArg"), !s2)
    return i();
  if (!Array.isArray(s2))
    return j$1.error(_$1`
        Invalid argType: '${o}.options' should be an array.

        More info: https://storybook.js.org/docs/api/arg-types
      `), i();
  if (s2.some((d) => d && ["object", "function"].includes(typeof d)))
    return j$1.error(_$1`
        Invalid argType: '${o}.options' should only contain primitives. Use a 'mapping' for complex values.

        More info: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
      `), i();
  let a = Array.isArray(r[o]), c = a && r[o].findIndex((d) => !s2.includes(d)), l = a && c === -1;
  if (r[o] === void 0 || s2.includes(r[o]) || l)
    return i();
  let p = a ? `${o}[${c}]` : o, u = s2.map((d) => typeof d == "string" ? `'${d}'` : String(d)).join(", ");
  return j$1.warn(`Received illegal value for '${p}'. Supported options: ${u}`), t;
}, {}), "validateOptions"), Ie = Symbol("Deeply equal"), or = /* @__PURE__ */ n((r, e) => {
  if (typeof r != typeof e)
    return e;
  if (Ar(r, e))
    return Ie;
  if (Array.isArray(r) && Array.isArray(e)) {
    let t = e.reduce((o, s2, i) => {
      let a = or(r[i], s2);
      return a !== Ie && (o[i] = a), o;
    }, new Array(e.length));
    return e.length >= r.length ? t : t.concat(new Array(r.length - e.length).fill(void 0));
  }
  return $$1(r) && $$1(e) ? Object.keys({ ...r, ...e }).reduce((t, o) => {
    let s2 = or(r == null ? void 0 : r[o], e == null ? void 0 : e[o]);
    return s2 === Ie ? t : Object.assign(t, { [o]: s2 });
  }, {}) : e;
}, "deepDiff"), hn = "UNTARGETED";
function Ai({
  args: r,
  argTypes: e
}) {
  let t = {};
  return Object.entries(r).forEach(([o, s2]) => {
    let { target: i = hn } = e[o] || {};
    t[i] = t[i] || {}, t[i][o] = s2;
  }), t;
}
n(Ai, "groupArgsByTarget");
function qd(r) {
  return Object.keys(r).forEach((e) => r[e] === void 0 && delete r[e]), r;
}
n(qd, "deleteUndefined");
var gn = class gn2 {
  constructor() {
    this.initialArgsByStoryId = {};
    this.argsByStoryId = {};
  }
  get(e) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    return this.argsByStoryId[e];
  }
  setInitial(e) {
    if (!this.initialArgsByStoryId[e.id])
      this.initialArgsByStoryId[e.id] = e.initialArgs, this.argsByStoryId[e.id] = e.initialArgs;
    else if (this.initialArgsByStoryId[e.id] !== e.initialArgs) {
      let t = or(this.initialArgsByStoryId[e.id], this.argsByStoryId[e.id]);
      this.initialArgsByStoryId[e.id] = e.initialArgs, this.argsByStoryId[e.id] = e.initialArgs, t !== Ie && this.updateFromDelta(e, t);
    }
  }
  updateFromDelta(e, t) {
    let o = Ri(t, e.argTypes);
    this.argsByStoryId[e.id] = tr(this.argsByStoryId[e.id], o);
  }
  updateFromPersisted(e, t) {
    let o = Ei(t, e.argTypes);
    return this.updateFromDelta(e, o);
  }
  update(e, t) {
    if (!(e in this.argsByStoryId))
      throw new Error(`No args known for ${e} -- has it been rendered yet?`);
    this.argsByStoryId[e] = qd({
      ...this.argsByStoryId[e],
      ...t
    });
  }
};
n(gn, "ArgsStore");
var Tt = gn;
var Et = /* @__PURE__ */ n((r = {}) => Object.entries(r).reduce((e, [t, { defaultValue: o }]) => (typeof o < "u" && (e[t] = o), e), {}), "getValuesFromArgTypes");
var Sn = class Sn2 {
  constructor({
    globals: e = {},
    globalTypes: t = {}
  }) {
    this.set({ globals: e, globalTypes: t });
  }
  set({ globals: e = {}, globalTypes: t = {} }) {
    let o = this.initialGlobals && or(this.initialGlobals, this.globals);
    this.allowedGlobalNames = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
    let s2 = Et(t);
    this.initialGlobals = { ...s2, ...e }, this.globals = this.initialGlobals, o && o !== Ie && this.updateFromPersisted(o);
  }
  filterAllowedGlobals(e) {
    return Object.entries(e).reduce((t, [o, s2]) => (this.allowedGlobalNames.has(o) ? t[o] = s2 : I$1.warn(
      `Attempted to set a global (${o}) that is not defined in initial globals or globalTypes`
    ), t), {});
  }
  updateFromPersisted(e) {
    let t = this.filterAllowedGlobals(e);
    this.globals = { ...this.globals, ...t };
  }
  get() {
    return this.globals;
  }
  update(e) {
    this.globals = { ...this.globals, ...this.filterAllowedGlobals(e) };
  }
};
n(Sn, "GlobalsStore");
var Rt = Sn;
var xi = ue(it());
var Bd = (0, xi.default)(1)(
  (r) => Object.values(r).reduce(
    (e, t) => (e[t.importPath] = e[t.importPath] || t, e),
    {}
  )
), bn = class bn2 {
  constructor({ entries: e } = { v: 5, entries: {} }) {
    this.entries = e;
  }
  entryFromSpecifier(e) {
    let t = Object.values(this.entries);
    if (e === "*")
      return t[0];
    if (typeof e == "string")
      return this.entries[e] ? this.entries[e] : t.find((i) => i.id.startsWith(e));
    let { name: o, title: s2 } = e;
    return t.find((i) => i.name === o && i.title === s2);
  }
  storyIdToEntry(e) {
    let t = this.entries[e];
    if (!t)
      throw new xr({ storyId: e });
    return t;
  }
  importPathToEntry(e) {
    return Bd(this.entries)[e];
  }
};
n(bn, "StoryIndexStore");
var At = bn;
var Vd = /* @__PURE__ */ n((r) => typeof r == "string" ? { name: r } : r, "normalizeType"), Hd = /* @__PURE__ */ n((r) => typeof r == "string" ? { type: r } : r, "normalizeControl"), zd = /* @__PURE__ */ n((r, e) => {
  let { type: t, control: o, ...s2 } = r, i = {
    name: e,
    ...s2
  };
  return t && (i.type = Vd(t)), o ? i.control = Hd(o) : o === false && (i.control = { disable: true }), i;
}, "normalizeInputType"), Fe = /* @__PURE__ */ n((r) => oe(r, zd), "normalizeInputTypes");
function vi(r) {
  return r.replace(/_/g, " ").replace(/-/g, " ").replace(/\./g, " ").replace(/([^\n])([A-Z])([a-z])/g, (e, t, o, s2) => `${t} ${o}${s2}`).replace(
    /([a-z])([A-Z])/g,
    (e, t, o) => `${t} ${o}`
  ).replace(/([a-z])([0-9])/gi, (e, t, o) => `${t} ${o}`).replace(/([0-9])([a-z])/gi, (e, t, o) => `${t} ${o}`).replace(/(\s|^)(\w)/g, (e, t, o) => `${t}${o.toUpperCase()}`).replace(/ +/g, " ").trim();
}
n(vi, "toStartCaseStr");
var En = ue(wi());
var _i = /* @__PURE__ */ n((r) => r.map((e) => typeof e < "u").filter(Boolean).length, "count"), Wd = /* @__PURE__ */ n((r, e) => {
  let { exists: t, eq: o, neq: s2, truthy: i } = r;
  if (_i([t, o, s2, i]) > 1)
    throw new Error(`Invalid conditional test ${JSON.stringify({ exists: t, eq: o, neq: s2 })}`);
  if (typeof o < "u")
    return (0, En.isEqual)(e, o);
  if (typeof s2 < "u")
    return !(0, En.isEqual)(e, s2);
  if (typeof t < "u") {
    let c = typeof e < "u";
    return t ? c : !c;
  }
  return (typeof i > "u" ? true : i) ? !!e : !e;
}, "testValue"), Rn = /* @__PURE__ */ n((r, e, t) => {
  if (!r.if)
    return true;
  let { arg: o, global: s2 } = r.if;
  if (_i([o, s2]) !== 1)
    throw new Error(`Invalid conditional value ${JSON.stringify({ arg: o, global: s2 })}`);
  let i = o ? e[o] : t[s2];
  return Wd(r.if, i);
}, "includeConditionalArg");
function nr(r) {
  return r != null && typeof r == "object" && "_tag" in r && (r == null ? void 0 : r._tag) === "Story";
}
n(nr, "isStory");
var An = /* @__PURE__ */ n((r) => r.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(
  /-+/g,
  "-"
).replace(/^-+/, "").replace(/-+$/, ""), "sanitize"), Ci = /* @__PURE__ */ n((r, e) => {
  let t = An(r);
  if (t === "")
    throw new Error(`Invalid ${e} '${r}', must include alphanumeric characters`);
  return t;
}, "sanitizeSafe"), Oi = /* @__PURE__ */ n((r, e) => `${Ci(r, "kind")}${e ? `--${Ci(e, "name")}` : ""}`, "toId"), Ii = /* @__PURE__ */ n((r) => vi(
  r
), "storyNameFromExport");
function Pi(r, e) {
  return Array.isArray(e) ? e.includes(r) : r.match(e);
}
n(Pi, "matches");
function Lr(r, { includeStories: e, excludeStories: t }) {
  return (
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    r !== "__esModule" && (!e || Pi(r, e)) && (!t || !Pi(r, t))
  );
}
n(Lr, "isExportStory");
var Fi = /* @__PURE__ */ n((...r) => {
  let e = r.reduce((t, o) => (o.startsWith("!") ? t.delete(o.slice(1)) : t.add(o), t), /* @__PURE__ */ new Set());
  return Array.from(e);
}, "combineTags");
var k = /* @__PURE__ */ n((r) => Array.isArray(r) ? r : r ? [r] : [], "normalizeArrays");
var $d = _$1`
CSF .story annotations deprecated; annotate story functions directly:
- StoryFn.story.name => StoryFn.storyName
- StoryFn.story.(parameters|decorators) => StoryFn.(parameters|decorators)
See https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#hoisted-csf-annotations for details and codemod.
`;
function De(r, e, t) {
  let o = e, s2 = typeof e == "function" ? e : null, { story: i } = o;
  i && (I$1.debug("deprecated story", i), ae($d));
  let a = Ii(r), c = typeof o != "function" && o.name || o.storyName || (i == null ? void 0 : i.name) || a, l = [
    ...k(o.decorators),
    ...k(i == null ? void 0 : i.decorators)
  ], p = { ...i == null ? void 0 : i.parameters, ...o.parameters }, u = { ...i == null ? void 0 : i.args, ...o.args }, d = { ...i == null ? void 0 : i.argTypes, ...o.argTypes }, h = [...k(o.loaders), ...k(
    i == null ? void 0 : i.loaders
  )], S2 = [
    ...k(o.beforeEach),
    ...k(i == null ? void 0 : i.beforeEach)
  ], m = [
    ...k(o.experimental_afterEach),
    ...k(i == null ? void 0 : i.experimental_afterEach)
  ], { render: T2, play: y2, tags: R2 = [], globals: x2 = {} } = o, g = p.__id || Oi(t.id, a);
  return {
    moduleExport: e,
    id: g,
    name: c,
    tags: R2,
    decorators: l,
    parameters: p,
    args: u,
    argTypes: Fe(d),
    loaders: h,
    beforeEach: S2,
    experimental_afterEach: m,
    globals: x2,
    ...T2 && { render: T2 },
    ...s2 && { userStoryFn: s2 },
    ...y2 && { play: y2 }
  };
}
n(De, "normalizeStory");
function jr(r, e = r.title, t) {
  let { id: o, argTypes: s2 } = r;
  return {
    id: An(o || e),
    ...r,
    title: e,
    ...s2 && { argTypes: Fe(s2) },
    parameters: {
      fileName: t,
      ...r.parameters
    }
  };
}
n(jr, "normalizeComponentAnnotations");
var Yd = /* @__PURE__ */ n((r) => {
  let { globals: e, globalTypes: t } = r;
  (e || t) && I$1.error(
    "Global args/argTypes can only be set globally",
    JSON.stringify({
      globals: e,
      globalTypes: t
    })
  );
}, "checkGlobals"), Kd = /* @__PURE__ */ n((r) => {
  let { options: e } = r;
  (e == null ? void 0 : e.storySort) && I$1.error("The storySort option parameter can only be set globally");
}, "checkStorySort"), xt = /* @__PURE__ */ n((r) => {
  r && (Yd(r), Kd(r));
}, "checkDisallowedParameters");
function Di(r, e, t) {
  let { default: o, __namedExportsOrder: s2, ...i } = r, a = Object.values(i)[0];
  if (nr(a)) {
    let p = jr(a.meta.input, t, e);
    xt(p.parameters);
    let u = { meta: p, stories: {}, moduleExports: r };
    return Object.keys(i).forEach((d) => {
      if (Lr(d, p)) {
        let h = De(d, i[d].input, p);
        xt(h.parameters), u.stories[h.id] = h;
      }
    }), u.projectAnnotations = a.meta.preview.composed, u;
  }
  let c = jr(
    o,
    t,
    e
  );
  xt(c.parameters);
  let l = { meta: c, stories: {}, moduleExports: r };
  return Object.keys(i).forEach((p) => {
    if (Lr(p, c)) {
      let u = De(p, i[p], c);
      xt(u.parameters), l.stories[u.id] = u;
    }
  }), l;
}
n(Di, "processCSFFile");
function ki(r) {
  return r != null && Xd(r).includes("mount");
}
n(ki, "mountDestructured");
function Xd(r) {
  let e = r.toString().match(/[^(]*\(([^)]*)/);
  if (!e)
    return [];
  let t = Ni(e[1]);
  if (!t.length)
    return [];
  let o = t[0];
  return o.startsWith("{") && o.endsWith("}") ? Ni(o.slice(1, -1).replace(/\s/g, "")).map((i) => i.replace(/:.*|=.*/g, "")) : [];
}
n(Xd, "getUsedProps");
function Ni(r) {
  let e = [], t = [], o = 0;
  for (let i = 0; i < r.length; i++)
    if (r[i] === "{" || r[i] === "[")
      t.push(r[i] === "{" ? "}" : "]");
    else if (r[i] === t[t.length - 1])
      t.pop();
    else if (!t.length && r[i] === ",") {
      let a = r.substring(o, i).trim();
      a && e.push(a), o = i + 1;
    }
  let s2 = r.substring(o).trim();
  return s2 && e.push(s2), e;
}
n(Ni, "splitByComma");
function xn(r, e, t) {
  let o = t(r);
  return (s2) => e(o, s2);
}
n(xn, "decorateStory");
function vn({
  componentId: r,
  title: e,
  kind: t,
  id: o,
  name: s2,
  story: i,
  parameters: a,
  initialArgs: c,
  argTypes: l,
  ...p
} = {}) {
  return p;
}
n(vn, "sanitizeStoryContextUpdate");
function vt(r, e) {
  let t = {}, o = /* @__PURE__ */ n((i) => (a) => {
    if (!t.value)
      throw new Error("Decorated function called without init");
    return t.value = {
      ...t.value,
      ...vn(a)
    }, i(t.value);
  }, "bindWithContext"), s2 = e.reduce(
    (i, a) => xn(i, a, o),
    r
  );
  return (i) => (t.value = i, s2(i));
}
n(vt, "defaultDecorateStory");
var Y = /* @__PURE__ */ n((...r) => {
  let e = {}, t = r.filter(Boolean), o = t.reduce((s2, i) => (Object.entries(i).forEach(([a, c]) => {
    let l = s2[a];
    Array.isArray(c) || typeof l > "u" ? s2[a] = c : $$1(c) && $$1(l) ? e[a] = true : typeof c < "u" && (s2[a] = c);
  }), s2), {});
  return Object.keys(e).forEach((s2) => {
    let i = t.filter(Boolean).map((a) => a[s2]).filter((a) => typeof a < "u");
    i.every((a) => $$1(a)) ? o[s2] = Y(...i) : o[s2] = i[i.length - 1];
  }), o;
}, "combineParameters");
function sr(r, e, t) {
  let { moduleExport: o, id: s2, name: i } = r || {}, a = Li(
    r,
    e,
    t
  ), c = /* @__PURE__ */ n(async (C2) => {
    let F = {};
    for (let U2 of [
      ..."__STORYBOOK_TEST_LOADERS__" in E$1 && Array.isArray(E$1.__STORYBOOK_TEST_LOADERS__) ? [E$1.__STORYBOOK_TEST_LOADERS__] : [],
      k(t.loaders),
      k(e.loaders),
      k(r.loaders)
    ]) {
      if (C2.abortSignal.aborted)
        return F;
      let B = await Promise.all(U2.map((W2) => W2(C2)));
      Object.assign(F, ...B);
    }
    return F;
  }, "applyLoaders"), l = /* @__PURE__ */ n(async (C2) => {
    let F = new Array();
    for (let U2 of [
      ...k(t.beforeEach),
      ...k(e.beforeEach),
      ...k(r.beforeEach)
    ]) {
      if (C2.abortSignal.aborted)
        return F;
      let B = await U2(C2);
      B && F.push(B);
    }
    return F;
  }, "applyBeforeEach"), p = /* @__PURE__ */ n(async (C2) => {
    let F = [
      ...k(t.experimental_afterEach),
      ...k(e.experimental_afterEach),
      ...k(r.experimental_afterEach)
    ].reverse();
    for (let U2 of F) {
      if (C2.abortSignal.aborted)
        return;
      await U2(C2);
    }
  }, "applyAfterEach"), u = /* @__PURE__ */ n((C2) => C2.originalStoryFn(C2.args, C2), "undecoratedStoryFn"), { applyDecorators: d = vt, runStep: h } = t, S2 = [
    ...k(r == null ? void 0 : r.decorators),
    ...k(e == null ? void 0 : e.decorators),
    ...k(t == null ? void 0 : t.decorators)
  ], m = (r == null ? void 0 : r.userStoryFn) || (r == null ? void 0 : r.render) || e.render || t.render, T2 = ft(d)(u, S2), y2 = /* @__PURE__ */ n((C2) => T2(C2), "unboundStoryFn"), R2 = (r == null ? void 0 : r.play) ?? (e == null ? void 0 : e.play), x2 = ki(R2);
  if (!m && !x2)
    throw new Dr({ id: s2 });
  let g = /* @__PURE__ */ n((C2) => async () => (await C2.renderToCanvas(), C2.canvas), "defaultMount"), b2 = r.mount ?? e.mount ?? t.mount ?? g, v2 = t.testingLibraryRender;
  return {
    storyGlobals: {},
    ...a,
    moduleExport: o,
    id: s2,
    name: i,
    story: i,
    originalStoryFn: m,
    undecoratedStoryFn: u,
    unboundStoryFn: y2,
    applyLoaders: c,
    applyBeforeEach: l,
    applyAfterEach: p,
    playFunction: R2,
    runStep: h,
    mount: b2,
    testingLibraryRender: v2,
    renderToCanvas: t.renderToCanvas,
    usesMount: x2
  };
}
n(sr, "prepareStory");
function wt(r, e, t) {
  return {
    ...Li(void 0, r, e),
    moduleExport: t
  };
}
n(wt, "prepareMeta");
function Li(r, e, t) {
  var _a;
  let o = ["dev", "test"], s2 = ((_a = E$1.DOCS_OPTIONS) == null ? void 0 : _a.autodocs) === true ? ["autodocs"] : [], i = Fi(
    ...o,
    ...s2,
    ...t.tags ?? [],
    ...e.tags ?? [],
    ...(r == null ? void 0 : r.tags) ?? []
  ), a = Y(
    t.parameters,
    e.parameters,
    r == null ? void 0 : r.parameters
  ), { argTypesEnhancers: c = [], argsEnhancers: l = [] } = t, p = Y(
    t.argTypes,
    e.argTypes,
    r == null ? void 0 : r.argTypes
  );
  if (r) {
    let R2 = (r == null ? void 0 : r.userStoryFn) || (r == null ? void 0 : r.render) || e.render || t.render;
    a.__isArgsStory = R2 && R2.length > 0;
  }
  let u = {
    ...t.args,
    ...e.args,
    ...r == null ? void 0 : r.args
  }, d = {
    ...e.globals,
    ...r == null ? void 0 : r.globals
  }, h = {
    componentId: e.id,
    title: e.title,
    kind: e.title,
    // Back compat
    id: (r == null ? void 0 : r.id) || e.id,
    // if there's no story name, we create a fake one since enhancers expect a name
    name: (r == null ? void 0 : r.name) || "__meta",
    story: (r == null ? void 0 : r.name) || "__meta",
    // Back compat
    component: e.component,
    subcomponents: e.subcomponents,
    tags: i,
    parameters: a,
    initialArgs: u,
    argTypes: p,
    storyGlobals: d
  };
  h.argTypes = c.reduce(
    (R2, x2) => x2({ ...h, argTypes: R2 }),
    h.argTypes
  );
  let S2 = { ...u };
  h.initialArgs = l.reduce(
    (R2, x2) => ({
      ...R2,
      ...x2({
        ...h,
        initialArgs: R2
      })
    }),
    S2
  );
  let { name: m, story: T2, ...y2 } = h;
  return y2;
}
n(Li, "preparePartialAnnotations");
function _t(r) {
  var _a;
  let { args: e } = r, t = {
    ...r,
    allArgs: void 0,
    argsByTarget: void 0
  };
  if ((_a = E$1.FEATURES) == null ? void 0 : _a.argTypeTargetsV7) {
    let i = Ai(r);
    t = {
      ...r,
      allArgs: r.args,
      argsByTarget: i,
      args: i[hn] || {}
    };
  }
  let o = Object.entries(t.args).reduce((i, [a, c]) => {
    var _a2;
    if (!((_a2 = t.argTypes[a]) == null ? void 0 : _a2.mapping))
      return i[a] = c, i;
    let l = /* @__PURE__ */ n((p) => {
      let u = t.argTypes[a].mapping;
      return u && p in u ? u[p] : p;
    }, "mappingFn");
    return i[a] = Array.isArray(c) ? c.map(l) : l(c), i;
  }, {}), s2 = Object.entries(o).reduce((i, [a, c]) => {
    let l = t.argTypes[a] || {};
    return Rn(l, o, t.globals) && (i[a] = c), i;
  }, {});
  return { ...t, unmappedArgs: e, args: s2 };
}
n(_t, "prepareContext");
var wn = /* @__PURE__ */ n((r, e, t) => {
  let o = typeof r;
  switch (o) {
    case "boolean":
    case "string":
    case "number":
    case "function":
    case "symbol":
      return { name: o };
  }
  return r ? t.has(r) ? (I$1.warn(_$1`
        We've detected a cycle in arg '${e}'. Args should be JSON-serializable.

        Consider using the mapping feature or fully custom args:
        - Mapping: https://storybook.js.org/docs/writing-stories/args#mapping-to-complex-arg-values
        - Custom args: https://storybook.js.org/docs/essentials/controls#fully-custom-args
      `), { name: "other", value: "cyclic object" }) : (t.add(r), Array.isArray(r) ? { name: "array", value: r.length > 0 ? wn(r[0], e, new Set(
    t
  )) : { name: "other", value: "unknown" } } : { name: "object", value: oe(r, (i) => wn(i, e, new Set(t))) }) : { name: "object", value: {} };
}, "inferType"), _n = /* @__PURE__ */ n((r) => {
  let { id: e, argTypes: t = {}, initialArgs: o = {} } = r, s2 = oe(o, (a, c) => ({
    name: c,
    type: wn(a, `${e}.${c}`, /* @__PURE__ */ new Set())
  })), i = oe(t, (a, c) => ({
    name: c
  }));
  return Y(s2, i, t);
}, "inferArgTypes");
_n.secondPass = true;
var ji = /* @__PURE__ */ n((r, e) => Array.isArray(e) ? e.includes(r) : r.match(e), "matches"), Mr = /* @__PURE__ */ n((r, e, t) => !e && !t ? r : r && qo(r, (o, s2) => {
  let i = o.name || s2.toString();
  return !!(!e || ji(i, e)) && (!t || !ji(i, t));
}), "filterArgTypes");
var Jd = /* @__PURE__ */ n((r, e, t) => {
  let { type: o, options: s2 } = r;
  if (o) {
    if (t.color && t.color.test(e)) {
      let i = o.name;
      if (i === "string")
        return { control: { type: "color" } };
      i !== "enum" && I$1.warn(
        `Addon controls: Control of type color only supports string, received "${i}" instead`
      );
    }
    if (t.date && t.date.test(e))
      return { control: { type: "date" } };
    switch (o.name) {
      case "array":
        return { control: { type: "object" } };
      case "boolean":
        return { control: { type: "boolean" } };
      case "string":
        return { control: { type: "text" } };
      case "number":
        return { control: { type: "number" } };
      case "enum": {
        let { value: i } = o;
        return { control: { type: (i == null ? void 0 : i.length) <= 5 ? "radio" : "select" }, options: i };
      }
      case "function":
      case "symbol":
        return null;
      default:
        return { control: { type: s2 ? "select" : "object" } };
    }
  }
}, "inferControl"), ir = /* @__PURE__ */ n((r) => {
  let {
    argTypes: e,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    parameters: { __isArgsStory: t, controls: { include: o = null, exclude: s2 = null, matchers: i = {} } = {} }
  } = r;
  if (!t)
    return e;
  let a = Mr(e, o, s2), c = oe(a, (l, p) => (l == null ? void 0 : l.type) && Jd(l, p.toString(), i));
  return Y(c, a);
}, "inferControls");
ir.secondPass = true;
function Ne({
  argTypes: r,
  globalTypes: e,
  argTypesEnhancers: t,
  decorators: o,
  loaders: s2,
  beforeEach: i,
  experimental_afterEach: a,
  globals: c,
  initialGlobals: l,
  ...p
}) {
  return c && Object.keys(c).length > 0 && ae(_$1`
      The preview.js 'globals' field is deprecated and will be removed in Storybook 9.0.
      Please use 'initialGlobals' instead. Learn more:

      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#previewjs-globals-renamed-to-initialglobals
    `), {
    ...r && { argTypes: Fe(r) },
    ...e && { globalTypes: Fe(e) },
    decorators: k(o),
    loaders: k(s2),
    beforeEach: k(i),
    experimental_afterEach: k(a),
    argTypesEnhancers: [
      ...t || [],
      _n,
      // inferControls technically should only run if the user is using the controls addon,
      // and so should be added by a preset there. However, as it seems some code relies on controls
      // annotations (in particular the angular implementation's `cleanArgsDecorator`), for backwards
      // compatibility reasons, we will leave this in the store until 7.0
      ir
    ],
    initialGlobals: Y(l, c),
    ...p
  };
}
n(Ne, "normalizeProjectAnnotations");
var Mi = /* @__PURE__ */ n((r) => async () => {
  let e = [];
  for (let t of r) {
    let o = await t();
    o && e.unshift(o);
  }
  return async () => {
    for (let t of e)
      await t();
  };
}, "composeBeforeAllHooks");
function Ct(r) {
  return async (e, t, o) => {
    await r.reduceRight(
      (i, a) => async () => a(e, i, o),
      async () => t(o)
    )();
  };
}
n(Ct, "composeStepRunners");
function Gr(r, e) {
  return r.map((t) => {
    var _a;
    return ((_a = t.default) == null ? void 0 : _a[e]) ?? t[e];
  }).filter(Boolean);
}
n(Gr, "getField");
function Te(r, e, t = {}) {
  return Gr(r, e).reduce((o, s2) => {
    let i = k(s2);
    return t.reverseFileOrder ? [...i, ...o] : [...o, ...i];
  }, []);
}
n(Te, "getArrayField");
function Ur(r, e) {
  return Object.assign({}, ...Gr(r, e));
}
n(Ur, "getObjectField");
function ar(r, e) {
  return Gr(r, e).pop();
}
n(ar, "getSingletonField");
function ke(r) {
  var _a;
  let e = Te(r, "argTypesEnhancers"), t = Gr(r, "runStep"), o = Te(r, "beforeAll");
  return {
    parameters: Y(...Gr(r, "parameters")),
    decorators: Te(r, "decorators", {
      reverseFileOrder: !(((_a = E$1.FEATURES) == null ? void 0 : _a.legacyDecoratorFileOrder) ?? false)
    }),
    args: Ur(r, "args"),
    argsEnhancers: Te(r, "argsEnhancers"),
    argTypes: Ur(r, "argTypes"),
    argTypesEnhancers: [
      ...e.filter((s2) => !s2.secondPass),
      ...e.filter((s2) => s2.secondPass)
    ],
    globals: Ur(r, "globals"),
    initialGlobals: Ur(r, "initialGlobals"),
    globalTypes: Ur(r, "globalTypes"),
    loaders: Te(r, "loaders"),
    beforeAll: Mi(o),
    beforeEach: Te(r, "beforeEach"),
    experimental_afterEach: Te(r, "experimental_afterEach"),
    render: ar(r, "render"),
    renderToCanvas: ar(r, "renderToCanvas"),
    renderToDOM: ar(r, "renderToDOM"),
    // deprecated
    applyDecorators: ar(r, "applyDecorators"),
    runStep: Ct(t),
    tags: Te(r, "tags"),
    mount: ar(r, "mount"),
    testingLibraryRender: ar(r, "testingLibraryRender")
  };
}
n(ke, "composeConfigs");
var Cn = class Cn2 {
  constructor() {
    this.reports = [];
  }
  async addReport(e) {
    this.reports.push(e);
  }
};
n(Cn, "ReporterAPI");
var Ee = Cn;
function Pt(r, e, t) {
  return nr(r) ? {
    story: r.input,
    meta: r.meta.input,
    preview: r.meta.preview.composed
  } : { story: r, meta: e, preview: t };
}
n(Pt, "getCsfFactoryAnnotations");
function Ui(r) {
  globalThis.defaultProjectAnnotations = r;
}
n(Ui, "setDefaultProjectAnnotations");
var Qd = "ComposedStory", Zd = "Unnamed Story";
function eu(r) {
  return r ? ke([r]) : {};
}
n(eu, "extractAnnotation");
function Gi(r) {
  let e = Array.isArray(r) ? r : [r];
  return globalThis.globalProjectAnnotations = ke([
    globalThis.defaultProjectAnnotations ?? {},
    ke(e.map(eu))
  ]), globalThis.globalProjectAnnotations ?? {};
}
n(Gi, "setProjectAnnotations");
var Re = [];
function Pn(r, e, t, o, s2) {
  var _a;
  if (r === void 0)
    throw new Error("Expected a story but received undefined.");
  e.title = e.title ?? Qd;
  let i = jr(e), a = s2 || r.storyName || ((_a = r.story) == null ? void 0 : _a.name) || r.name || Zd, c = De(
    a,
    r,
    i
  ), l = Ne(
    ke([
      o ?? globalThis.globalProjectAnnotations ?? {},
      t ?? {}
    ])
  ), p = sr(
    c,
    i,
    l
  ), d = {
    // TODO: remove loading from globalTypes in 9.0
    ...Et(l.globalTypes),
    ...l.initialGlobals,
    ...p.storyGlobals
  }, h = new Ee(), S2 = /* @__PURE__ */ n(() => {
    let g = _t({
      hooks: new be(),
      globals: d,
      args: { ...p.initialArgs },
      viewMode: "story",
      reporting: h,
      loaded: {},
      abortSignal: new AbortController().signal,
      step: /* @__PURE__ */ n((b2, v2) => p.runStep(b2, v2, g), "step"),
      canvasElement: null,
      canvas: {},
      globalTypes: l.globalTypes,
      ...p,
      context: null,
      mount: null
    });
    return g.parameters.__isPortableStory = true, g.context = g, p.renderToCanvas && (g.renderToCanvas = async () => {
      var _a2;
      let b2 = await ((_a2 = p.renderToCanvas) == null ? void 0 : _a2.call(
        p,
        {
          componentId: p.componentId,
          title: p.title,
          id: p.id,
          name: p.name,
          tags: p.tags,
          showMain: /* @__PURE__ */ n(() => {
          }, "showMain"),
          showError: /* @__PURE__ */ n((v2) => {
            throw new Error(`${v2.title}
${v2.description}`);
          }, "showError"),
          showException: /* @__PURE__ */ n((v2) => {
            throw v2;
          }, "showException"),
          forceRemount: true,
          storyContext: g,
          storyFn: /* @__PURE__ */ n(() => p.unboundStoryFn(g), "storyFn"),
          unboundStoryFn: p.unboundStoryFn
        },
        g.canvasElement
      ));
      b2 && Re.push(b2);
    }), g.mount = p.mount(g), g;
  }, "initializeContext"), m, T2 = /* @__PURE__ */ n(async (g) => {
    var _a2;
    let b2 = S2();
    return b2.canvasElement ?? (b2.canvasElement = (_a2 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a2.body), m && (b2.loaded = m.loaded), Object.assign(b2, g), p.playFunction(b2);
  }, "play"), y2 = /* @__PURE__ */ n((g) => {
    let b2 = S2();
    return Object.assign(b2, g), tu(p, b2);
  }, "run"), R2 = p.playFunction ? T2 : void 0;
  return Object.assign(
    /* @__PURE__ */ n(function(b2) {
      let v2 = S2();
      return m && (v2.loaded = m.loaded), v2.args = {
        ...v2.initialArgs,
        ...b2
      }, p.unboundStoryFn(v2);
    }, "storyFn"),
    {
      id: p.id,
      storyName: a,
      load: /* @__PURE__ */ n(async () => {
        for (let b2 of [...Re].reverse())
          await b2();
        Re.length = 0;
        let g = S2();
        g.loaded = await p.applyLoaders(g), Re.push(...(await p.applyBeforeEach(g)).filter(Boolean)), m = g;
      }, "load"),
      globals: d,
      args: p.initialArgs,
      parameters: p.parameters,
      argTypes: p.argTypes,
      play: R2,
      run: y2,
      reporting: h,
      tags: p.tags
    }
  );
}
n(Pn, "composeStory");
var ru = /* @__PURE__ */ n((r, e, t, o) => Pn(r, e, t, {}, o), "defaultComposeStory");
function qi(r, e, t = ru) {
  let { default: o, __esModule: s2, __namedExportsOrder: i, ...a } = r, c = o;
  return Object.entries(a).reduce(
    (p, [u, d]) => {
      let { story: h, meta: S2 } = Pt(d);
      return !c && S2 && (c = S2), Lr(u, c) ? Object.assign(p, {
        [u]: t(h, c, e, u)
      }) : p;
    },
    {}
  );
}
n(qi, "composeStories");
function Bi(r) {
  return r.extend({
    mount: /* @__PURE__ */ n(async ({ mount: e, page: t }, o) => {
      await o(async (s2, ...i) => {
        if (!("__pw_type" in s2) || "__pw_type" in s2 && s2.__pw_type !== "jsx")
          throw new Error(_$1`
              Portable stories in Playwright CT only work when referencing JSX elements.
              Please use JSX format for your components such as:

              instead of:
              await mount(MyComponent, { props: { foo: 'bar' } })

              do:
              await mount(<MyComponent foo="bar"/>)

              More info: https://storybook.js.org/docs/api/portable-stories-playwright
            `);
        await t.evaluate(async (c) => {
          var _a, _b, _c2;
          let l = await ((_a = globalThis.__pwUnwrapObject) == null ? void 0 : _a.call(globalThis, c));
          return (_c2 = (_b = "__pw_type" in l ? l.type : l) == null ? void 0 : _b.load) == null ? void 0 : _c2.call(_b);
        }, s2);
        let a = await e(s2, ...i);
        return await t.evaluate(async (c) => {
          var _a, _b;
          let l = await ((_a = globalThis.__pwUnwrapObject) == null ? void 0 : _a.call(globalThis, c)), p = "__pw_type" in l ? l.type : l, u = document.querySelector("#root");
          return (_b = p == null ? void 0 : p.play) == null ? void 0 : _b.call(p, { canvasElement: u });
        }, s2), a;
      });
    }, "mount")
  });
}
n(Bi, "createPlaywrightTest");
async function tu(r, e) {
  var _a, _b;
  for (let s2 of [...Re].reverse())
    await s2();
  if (Re.length = 0, !e.canvasElement) {
    let s2 = document.createElement("div");
    (_b = (_a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a.body) == null ? void 0 : _b.appendChild(s2), e.canvasElement = s2, Re.push(() => {
      var _a2, _b2, _c2, _d2;
      ((_b2 = (_a2 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a2.body) == null ? void 0 : _b2.contains(s2)) && ((_d2 = (_c2 = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _c2.body) == null ? void 0 : _d2.removeChild(s2));
    });
  }
  if (e.loaded = await r.applyLoaders(e), e.abortSignal.aborted)
    return;
  Re.push(...(await r.applyBeforeEach(e)).filter(Boolean));
  let t = r.playFunction, o = r.usesMount;
  o || await e.mount(), !e.abortSignal.aborted && (t && (o || (e.mount = async () => {
    throw new Oe({ playFunction: t.toString() });
  }), await t(e)), await r.applyAfterEach(e));
}
n(tu, "runStory");
function Vi(r, e) {
  return Uo(Go(r, e), (t) => t === void 0);
}
n(Vi, "picky");
var Hi = 1e3, ou = 1e4, On = class On2 {
  constructor(e, t, o) {
    this.importFn = t;
    this.getStoriesJsonData = /* @__PURE__ */ n(() => {
      let e2 = this.getSetStoriesPayload(), t2 = ["fileName", "docsOnly", "framework", "__id", "__isArgsStory"];
      return {
        v: 3,
        stories: oe(e2.stories, (s3) => {
          let { importPath: i2 } = this.storyIndex.entries[s3.id];
          return {
            ...Vi(s3, ["id", "name", "title"]),
            importPath: i2,
            // These 3 fields were going to be dropped in v7, but instead we will keep them for the
            // 7.x cycle so that v7 Storybooks can be composed successfully in v6 Storybook.
            // In v8 we will (likely) completely drop support for `extract` and `getStoriesJsonData`
            kind: s3.title,
            story: s3.name,
            parameters: {
              ...Vi(s3.parameters, t2),
              fileName: i2
            }
          };
        })
      };
    }, "getStoriesJsonData");
    this.storyIndex = new At(e), this.projectAnnotations = Ne(o);
    let { initialGlobals: s2, globalTypes: i } = this.projectAnnotations;
    this.args = new Tt(), this.userGlobals = new Rt({ globals: s2, globalTypes: i }), this.hooks = {}, this.cleanupCallbacks = {}, this.processCSFFileWithCache = (0, Ot.default)(Hi)(Di), this.prepareMetaWithCache = (0, Ot.default)(Hi)(wt), this.prepareStoryWithCache = (0, Ot.default)(ou)(sr);
  }
  setProjectAnnotations(e) {
    this.projectAnnotations = Ne(e);
    let { initialGlobals: t, globalTypes: o } = e;
    this.userGlobals.set({ globals: t, globalTypes: o });
  }
  // This means that one of the CSF files has changed.
  // If the `importFn` has changed, we will invalidate both caches.
  // If the `storyIndex` data has changed, we may or may not invalidate the caches, depending
  // on whether we've loaded the relevant files yet.
  async onStoriesChanged({
    importFn: e,
    storyIndex: t
  }) {
    e && (this.importFn = e), t && (this.storyIndex.entries = t.entries), this.cachedCSFFiles && await this.cacheAllCSFFiles();
  }
  // Get an entry from the index, waiting on initialization if necessary
  async storyIdToEntry(e) {
    return this.storyIndex.storyIdToEntry(e);
  }
  // To load a single CSF file to service a story we need to look up the importPath in the index
  async loadCSFFileByStoryId(e) {
    let { importPath: t, title: o } = this.storyIndex.storyIdToEntry(e), s2 = await this.importFn(t);
    return this.processCSFFileWithCache(s2, t, o);
  }
  async loadAllCSFFiles() {
    let e = {};
    return Object.entries(this.storyIndex.entries).forEach(([o, { importPath: s2 }]) => {
      e[s2] = o;
    }), (await Promise.all(
      Object.entries(e).map(async ([o, s2]) => ({
        importPath: o,
        csfFile: await this.loadCSFFileByStoryId(s2)
      }))
    )).reduce(
      (o, { importPath: s2, csfFile: i }) => (o[s2] = i, o),
      {}
    );
  }
  async cacheAllCSFFiles() {
    this.cachedCSFFiles = await this.loadAllCSFFiles();
  }
  preparedMetaFromCSFFile({ csfFile: e }) {
    let t = e.meta;
    return this.prepareMetaWithCache(
      t,
      this.projectAnnotations,
      e.moduleExports.default
    );
  }
  // Load the CSF file for a story and prepare the story from it and the project annotations.
  async loadStory({ storyId: e }) {
    let t = await this.loadCSFFileByStoryId(e);
    return this.storyFromCSFFile({ storyId: e, csfFile: t });
  }
  // This function is synchronous for convenience -- often times if you have a CSF file already
  // it is easier not to have to await `loadStory`.
  storyFromCSFFile({
    storyId: e,
    csfFile: t
  }) {
    let o = t.stories[e];
    if (!o)
      throw new Ir({ storyId: e });
    let s2 = t.meta, i = this.prepareStoryWithCache(
      o,
      s2,
      t.projectAnnotations ?? this.projectAnnotations
    );
    return this.args.setInitial(i), this.hooks[i.id] = this.hooks[i.id] || new be(), i;
  }
  // If we have a CSF file we can get all the stories from it synchronously
  componentStoriesFromCSFFile({
    csfFile: e
  }) {
    return Object.keys(this.storyIndex.entries).filter((t) => !!e.stories[t]).map((t) => this.storyFromCSFFile({ storyId: t, csfFile: e }));
  }
  async loadEntry(e) {
    let t = await this.storyIdToEntry(e), o = t.type === "docs" ? t.storiesImports : [], [s2, ...i] = await Promise.all([
      this.importFn(t.importPath),
      ...o.map((a) => {
        let c = this.storyIndex.importPathToEntry(a);
        return this.loadCSFFileByStoryId(c.id);
      })
    ]);
    return { entryExports: s2, csfFiles: i };
  }
  // A prepared story does not include args, globals or hooks. These are stored in the story store
  // and updated separtely to the (immutable) story.
  getStoryContext(e, { forceInitialArgs: t = false } = {}) {
    let o = this.userGlobals.get(), { initialGlobals: s2 } = this.userGlobals, i = new Ee();
    return _t({
      ...e,
      args: t ? e.initialArgs : this.args.get(e.id),
      initialGlobals: s2,
      globalTypes: this.projectAnnotations.globalTypes,
      userGlobals: o,
      reporting: i,
      globals: {
        ...o,
        ...e.storyGlobals
      },
      hooks: this.hooks[e.id]
    });
  }
  addCleanupCallbacks(e, t) {
    this.cleanupCallbacks[e.id] = t;
  }
  async cleanupStory(e) {
    this.hooks[e.id].clean();
    let t = this.cleanupCallbacks[e.id];
    if (t)
      for (let o of [...t].reverse())
        await o();
    delete this.cleanupCallbacks[e.id];
  }
  extract(e = { includeDocsOnly: false }) {
    let { cachedCSFFiles: t } = this;
    if (!t)
      throw new vr();
    return Object.entries(this.storyIndex.entries).reduce(
      (o, [s2, { type: i, importPath: a }]) => {
        if (i === "docs")
          return o;
        let c = t[a], l = this.storyFromCSFFile({ storyId: s2, csfFile: c });
        return !e.includeDocsOnly && l.parameters.docsOnly || (o[s2] = Object.entries(l).reduce(
          (p, [u, d]) => u === "moduleExport" || typeof d == "function" ? p : Array.isArray(d) ? Object.assign(p, { [u]: d.slice().sort() }) : Object.assign(p, { [u]: d }),
          {
            //
            args: l.initialArgs,
            globals: {
              ...this.userGlobals.initialGlobals,
              ...this.userGlobals.globals,
              ...l.storyGlobals
            }
          }
        )), o;
      },
      {}
    );
  }
  // TODO: Remove in 9.0
  getSetStoriesPayload() {
    let e = this.extract({ includeDocsOnly: true }), t = Object.values(e).reduce(
      (o, { title: s2 }) => (o[s2] = {}, o),
      {}
    );
    return {
      v: 2,
      globals: this.userGlobals.get(),
      globalParameters: {},
      kindParameters: t,
      stories: e
    };
  }
  raw() {
    return ae(
      "StoryStore.raw() is deprecated and will be removed in 9.0, please use extract() instead"
    ), Object.values(this.extract()).map(({ id: e }) => this.fromId(e)).filter(Boolean);
  }
  fromId(e) {
    if (ae(
      "StoryStore.fromId() is deprecated and will be removed in 9.0, please use loadStory() instead"
    ), !this.cachedCSFFiles)
      throw new Error("Cannot call fromId/raw() unless you call cacheAllCSFFiles() first.");
    let t;
    try {
      ({ importPath: t } = this.storyIndex.storyIdToEntry(e));
    } catch {
      return null;
    }
    let o = this.cachedCSFFiles[t], s2 = this.storyFromCSFFile({ storyId: e, csfFile: o });
    return {
      ...s2,
      storyFn: /* @__PURE__ */ n((i) => {
        let a = {
          ...this.getStoryContext(s2),
          abortSignal: new AbortController().signal,
          canvasElement: null,
          loaded: {},
          step: /* @__PURE__ */ n((c, l) => s2.runStep(c, l, a), "step"),
          context: null,
          mount: null,
          canvas: {},
          viewMode: "story"
        };
        return s2.unboundStoryFn({ ...a, ...i });
      }, "storyFn")
    };
  }
};
n(On, "StoryStore");
var Le = On;
function In(r) {
  return r.startsWith("\\\\?\\") ? r : r.replace(/\\/g, "/");
}
n(In, "slash");
var nu = /* @__PURE__ */ n((r) => {
  if (r.length === 0)
    return r;
  let e = r[r.length - 1], t = e == null ? void 0 : e.replace(/(?:[.](?:story|stories))?([.][^.]+)$/i, "");
  if (r.length === 1)
    return [t];
  let o = r[r.length - 2];
  return t && o && t.toLowerCase() === o.toLowerCase() ? [...r.slice(0, -2), t] : t && (/^(story|stories)([.][^.]+)$/i.test(e) || /^index$/i.test(t)) ? r.slice(0, -1) : [...r.slice(0, -1), t];
}, "sanitize");
function zi(r) {
  return r.flatMap((e) => e.split("/")).filter(Boolean).join("/");
}
n(zi, "pathJoin");
var Fn = /* @__PURE__ */ n((r, e, t) => {
  let { directory: o, importPathMatcher: s2, titlePrefix: i = "" } = e || {};
  typeof r == "number" && j$1.warn(_$1`
      CSF Auto-title received a numeric fileName. This typically happens when
      webpack is mis-configured in production mode. To force webpack to produce
      filenames, set optimization.moduleIds = "named" in your webpack config.
    `);
  let a = In(String(r));
  if (s2.exec(a)) {
    if (!t) {
      let c = a.replace(o, ""), l = zi([i, c]).split("/");
      return l = nu(l), l.join("/");
    }
    return i ? zi([i, t]) : t;
  }
}, "userOrAutoTitleFromSpecifier"), Wi = /* @__PURE__ */ n((r, e, t) => {
  for (let o = 0; o < e.length; o += 1) {
    let s2 = Fn(r, e[o], t);
    if (s2)
      return s2;
  }
  return t || void 0;
}, "userOrAutoTitle");
var $i = /\s*\/\s*/, Yi = /* @__PURE__ */ n((r = {}) => (e, t) => {
  if (e.title === t.title && !r.includeNames)
    return 0;
  let o = r.method || "configure", s2 = r.order || [], i = e.title.trim().split($i), a = t.title.trim().split($i);
  r.includeNames && (i.push(e.name), a.push(t.name));
  let c = 0;
  for (; i[c] || a[c]; ) {
    if (!i[c])
      return -1;
    if (!a[c])
      return 1;
    let l = i[c], p = a[c];
    if (l !== p) {
      let d = s2.indexOf(l), h = s2.indexOf(p), S2 = s2.indexOf("*");
      return d !== -1 || h !== -1 ? (d === -1 && (S2 !== -1 ? d = S2 : d = s2.length), h === -1 && (S2 !== -1 ? h = S2 : h = s2.length), d - h) : o === "configure" ? 0 : l.localeCompare(p, r.locales ? r.locales : void 0, {
        numeric: true,
        sensitivity: "accent"
      });
    }
    let u = s2.indexOf(l);
    u === -1 && (u = s2.indexOf("*")), s2 = u !== -1 && Array.isArray(s2[u + 1]) ? s2[u + 1] : [], c += 1;
  }
  return 0;
}, "storySort");
var su = /* @__PURE__ */ n((r, e, t) => {
  if (e) {
    let o;
    typeof e == "function" ? o = e : o = Yi(e), r.sort(o);
  } else
    r.sort(
      (o, s2) => t.indexOf(o.importPath) - t.indexOf(s2.importPath)
    );
  return r;
}, "sortStoriesCommon"), Ki = /* @__PURE__ */ n((r, e, t) => {
  try {
    return su(r, e, t);
  } catch (o) {
    throw new Error(_$1`
    Error sorting stories with sort parameter ${e}:

    > ${o.message}
    
    Are you using a V6-style sort function in V7 mode?

    More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#v7-style-story-sort
  `);
  }
}, "sortStoriesV7");
var Ae = new Error("prepareAborted");
var { AbortController: Xi } = globalThis;
function Ji(r) {
  try {
    let { name: e = "Error", message: t = String(r), stack: o } = r;
    return { name: e, message: t, stack: o };
  } catch {
    return { name: "Error", message: String(r) };
  }
}
n(Ji, "serializeError");
var Dn = class Dn2 {
  constructor(e, t, o, s2, i, a, c = { autoplay: true, forceInitialArgs: false }, l) {
    this.channel = e;
    this.store = t;
    this.renderToScreen = o;
    this.callbacks = s2;
    this.id = i;
    this.viewMode = a;
    this.renderOptions = c;
    this.type = "story";
    this.notYetRendered = true;
    this.rerenderEnqueued = false;
    this.disableKeyListeners = false;
    this.teardownRender = /* @__PURE__ */ n(() => {
    }, "teardownRender");
    this.torndown = false;
    this.abortController = new Xi(), l && (this.story = l, this.phase = "preparing");
  }
  async runPhase(e, t, o) {
    this.phase = t, this.channel.emit(Pe, { newPhase: this.phase, storyId: this.id }), o && (await o(), this.checkIfAborted(e));
  }
  checkIfAborted(e) {
    return e.aborted ? (this.phase = "aborted", this.channel.emit(Pe, { newPhase: this.phase, storyId: this.id }), true) : false;
  }
  async prepare() {
    if (await this.runPhase(this.abortController.signal, "preparing", async () => {
      this.story = await this.store.loadStory({ storyId: this.id });
    }), this.abortController.signal.aborted)
      throw await this.store.cleanupStory(this.story), Ae;
  }
  // The two story "renders" are equal and have both loaded the same story
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  isPreparing() {
    return ["preparing"].includes(this.phase);
  }
  isPending() {
    return ["loading", "beforeEach", "rendering", "playing", "afterEach"].includes(
      this.phase
    );
  }
  async renderToElement(e) {
    return this.canvasElement = e, this.render({ initial: true, forceRemount: true });
  }
  storyContext() {
    if (!this.story)
      throw new Error("Cannot call storyContext before preparing");
    let { forceInitialArgs: e } = this.renderOptions;
    return this.store.getStoryContext(this.story, { forceInitialArgs: e });
  }
  async render({
    initial: e = false,
    forceRemount: t = false
  } = {}) {
    var _a, _b, _c2, _d2;
    let { canvasElement: o } = this;
    if (!this.story)
      throw new Error("cannot render when not prepared");
    let s2 = this.story;
    if (!o)
      throw new Error("cannot render when canvasElement is unset");
    let {
      id: i,
      componentId: a,
      title: c,
      name: l,
      tags: p,
      applyLoaders: u,
      applyBeforeEach: d,
      applyAfterEach: h,
      unboundStoryFn: S2,
      playFunction: m,
      runStep: T2
    } = s2;
    t && !e && (this.cancelRender(), this.abortController = new Xi());
    let y2 = this.abortController.signal, R2 = false, x2 = s2.usesMount;
    try {
      let g = {
        ...this.storyContext(),
        viewMode: this.viewMode,
        abortSignal: y2,
        canvasElement: o,
        loaded: {},
        step: /* @__PURE__ */ n((P2, D2) => T2(P2, D2, g), "step"),
        context: null,
        canvas: {},
        renderToCanvas: /* @__PURE__ */ n(async () => {
          let P2 = await this.renderToScreen(b2, o);
          this.teardownRender = P2 || (() => {
          }), R2 = true;
        }, "renderToCanvas"),
        // The story provides (set in a renderer) a mount function that is a higher order function
        // (context) => (...args) => Canvas
        //
        // Before assigning it to the context, we resolve the context dependency,
        // so that a user can just call it as await mount(...args) in their play function.
        mount: /* @__PURE__ */ n(async (...P2) => {
          var _a2, _b2;
          (_b2 = (_a2 = this.callbacks).showStoryDuringRender) == null ? void 0 : _b2.call(_a2);
          let D2 = null;
          return await this.runPhase(y2, "rendering", async () => {
            D2 = await s2.mount(g)(...P2);
          }), x2 && await this.runPhase(y2, "playing"), D2;
        }, "mount")
      };
      g.context = g;
      let b2 = {
        componentId: a,
        title: c,
        kind: c,
        id: i,
        name: l,
        story: l,
        tags: p,
        ...this.callbacks,
        showError: /* @__PURE__ */ n((P2) => (this.phase = "errored", this.callbacks.showError(P2)), "showError"),
        showException: /* @__PURE__ */ n((P2) => (this.phase = "errored", this.callbacks.showException(P2)), "showException"),
        forceRemount: t || this.notYetRendered,
        storyContext: g,
        storyFn: /* @__PURE__ */ n(() => S2(g), "storyFn"),
        unboundStoryFn: S2
      };
      if (await this.runPhase(y2, "loading", async () => {
        g.loaded = await u(g);
      }), y2.aborted)
        return;
      let v2 = await d(g);
      if (this.store.addCleanupCallbacks(s2, v2), this.checkIfAborted(y2) || (!R2 && !x2 && await g.mount(), this.notYetRendered = false, y2.aborted))
        return;
      let C2 = ((_b = (_a = this.story.parameters) == null ? void 0 : _a.test) == null ? void 0 : _b.dangerouslyIgnoreUnhandledErrors) === true, F = /* @__PURE__ */ new Set(), U2 = /* @__PURE__ */ n((P2) => F.add("error" in P2 ? P2.error : P2.reason), "onError");
      if (this.renderOptions.autoplay && t && m && this.phase !== "errored") {
        window.addEventListener("error", U2), window.addEventListener("unhandledrejection", U2), this.disableKeyListeners = true;
        try {
          if (x2 ? await m(g) : (g.mount = async () => {
            throw new Oe({ playFunction: m.toString() });
          }, await this.runPhase(y2, "playing", async () => m(g))), !R2)
            throw new Nr();
          this.checkIfAborted(y2), !C2 && F.size > 0 ? await this.runPhase(y2, "errored") : await this.runPhase(y2, "played");
        } catch (P2) {
          if ((_d2 = (_c2 = this.callbacks).showStoryDuringRender) == null ? void 0 : _d2.call(_c2), await this.runPhase(y2, "errored", async () => {
            this.channel.emit(Xt, Ji(P2));
          }), this.story.parameters.throwPlayFunctionExceptions !== false)
            throw P2;
          console.error(P2);
        }
        if (!C2 && F.size > 0 && this.channel.emit(
          Jt,
          Array.from(F).map(Ji)
        ), this.disableKeyListeners = false, window.removeEventListener("unhandledrejection", U2), window.removeEventListener("error", U2), y2.aborted)
          return;
      }
      await this.runPhase(
        y2,
        "completed",
        async () => this.channel.emit(We, i)
      ), this.phase !== "errored" && await this.runPhase(y2, "afterEach", async () => {
        await h(g);
      });
      let B = !C2 && F.size > 0, W2 = g.reporting.reports.some(
        (P2) => P2.status === "failed"
      ), se = B || W2;
      await this.runPhase(
        y2,
        "finished",
        async () => this.channel.emit(ot, {
          storyId: i,
          status: se ? "error" : "success",
          reporters: g.reporting.reports
        })
      );
    } catch (g) {
      this.phase = "errored", this.callbacks.showException(g), await this.runPhase(
        y2,
        "finished",
        async () => this.channel.emit(ot, {
          storyId: i,
          status: "error",
          reporters: []
        })
      );
    }
    this.rerenderEnqueued && (this.rerenderEnqueued = false, this.render());
  }
  /**
   * Rerender the story. If the story is currently pending (loading/rendering), the rerender will be
   * enqueued, and will be executed after the current render is completed. Rerendering while playing
   * will not be enqueued, and will be executed immediately, to support rendering args changes while
   * playing.
   */
  async rerender() {
    if (this.isPending() && this.phase !== "playing")
      this.rerenderEnqueued = true;
    else
      return this.render();
  }
  async remount() {
    return await this.teardown(), this.render({ forceRemount: true });
  }
  // If the story is torn down (either a new story is rendered or the docs page removes it)
  // we need to consider the fact that the initial render may not be finished
  // (possibly the loaders or the play function are still running). We use the controller
  // as a method to abort them, ASAP, but this is not foolproof as we cannot control what
  // happens inside the user's code.
  cancelRender() {
    var _a;
    (_a = this.abortController) == null ? void 0 : _a.abort();
  }
  async teardown() {
    this.torndown = true, this.cancelRender(), this.story && await this.store.cleanupStory(this.story);
    for (let e = 0; e < 3; e += 1) {
      if (!this.isPending()) {
        await this.teardownRender();
        return;
      }
      await new Promise((t) => setTimeout(t, 0));
    }
    window.location.reload(), await new Promise(() => {
    });
  }
};
n(Dn, "StoryRender");
var je = Dn;
var { fetch: iu } = E$1, au = "./index.json", Nn = class Nn2 {
  constructor(e, t, o = te$1.getChannel(), s2 = true) {
    this.importFn = e;
    this.getProjectAnnotations = t;
    this.channel = o;
    this.storyRenders = [];
    this.storeInitializationPromise = new Promise((i, a) => {
      this.resolveStoreInitializationPromise = i, this.rejectStoreInitializationPromise = a;
    }), s2 && this.initialize();
  }
  // Create a proxy object for `__STORYBOOK_STORY_STORE__` and `__STORYBOOK_PREVIEW__.storyStore`
  // That proxies through to the store once ready, and errors beforehand. This means we can set
  // `__STORYBOOK_STORY_STORE__ = __STORYBOOK_PREVIEW__.storyStore` without having to wait, and
  // similarly integrators can access the `storyStore` on the preview at any time, although
  // it is considered deprecated and we will no longer allow access in 9.0
  get storyStore() {
    return new Proxy(
      {},
      {
        get: /* @__PURE__ */ n((e, t) => {
          if (this.storyStoreValue)
            return ae("Accessing the Story Store is deprecated and will be removed in 9.0"), this.storyStoreValue[t];
          throw new Fr();
        }, "get")
      }
    );
  }
  // INITIALIZATION
  async initialize() {
    this.setupListeners();
    try {
      let e = await this.getProjectAnnotationsOrRenderError();
      await this.runBeforeAllHook(e), await this.initializeWithProjectAnnotations(e);
    } catch (e) {
      this.rejectStoreInitializationPromise(e);
    }
  }
  ready() {
    return this.storeInitializationPromise;
  }
  setupListeners() {
    this.channel.on(so, this.onStoryIndexChanged.bind(this)), this.channel.on(fr, this.onUpdateGlobals.bind(this)), this.channel.on(yr, this.onUpdateArgs.bind(this)), this.channel.on(fo, this.onRequestArgTypesInfo.bind(this)), this.channel.on(ur, this.onResetArgs.bind(this)), this.channel.on(dr, this.onForceReRender.bind(this)), this.channel.on(Kt, this.onForceRemount.bind(this));
  }
  async getProjectAnnotationsOrRenderError() {
    try {
      let e = await this.getProjectAnnotations();
      if (this.renderToCanvas = e.renderToCanvas, !this.renderToCanvas)
        throw new wr();
      return e;
    } catch (e) {
      throw this.renderPreviewEntryError("Error reading preview.js:", e), e;
    }
  }
  // If initialization gets as far as project annotations, this function runs.
  async initializeWithProjectAnnotations(e) {
    this.projectAnnotationsBeforeInitialization = e;
    try {
      let t = await this.getStoryIndexFromServer();
      return this.initializeWithStoryIndex(t);
    } catch (t) {
      throw this.renderPreviewEntryError("Error loading story index:", t), t;
    }
  }
  async runBeforeAllHook(e) {
    var _a, _b;
    try {
      await ((_a = this.beforeAllCleanup) == null ? void 0 : _a.call(this)), this.beforeAllCleanup = await ((_b = e.beforeAll) == null ? void 0 : _b.call(e));
    } catch (t) {
      throw this.renderPreviewEntryError("Error in beforeAll hook:", t), t;
    }
  }
  async getStoryIndexFromServer() {
    let e = await iu(au);
    if (e.status === 200)
      return e.json();
    throw new _r({ text: await e.text() });
  }
  // If initialization gets as far as the story index, this function runs.
  initializeWithStoryIndex(e) {
    if (!this.projectAnnotationsBeforeInitialization)
      throw new Error("Cannot call initializeWithStoryIndex until project annotations resolve");
    this.storyStoreValue = new Le(
      e,
      this.importFn,
      this.projectAnnotationsBeforeInitialization
    ), delete this.projectAnnotationsBeforeInitialization, this.setInitialGlobals(), this.resolveStoreInitializationPromise();
  }
  async setInitialGlobals() {
    this.emitGlobals();
  }
  emitGlobals() {
    if (!this.storyStoreValue)
      throw new V({ methodName: "emitGlobals" });
    let e = {
      globals: this.storyStoreValue.userGlobals.get() || {},
      globalTypes: this.storyStoreValue.projectAnnotations.globalTypes || {}
    };
    this.channel.emit(ro, e);
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: e
  }) {
    delete this.previewEntryError, this.getProjectAnnotations = e;
    let t = await this.getProjectAnnotationsOrRenderError();
    if (await this.runBeforeAllHook(t), !this.storyStoreValue) {
      await this.initializeWithProjectAnnotations(t);
      return;
    }
    this.storyStoreValue.setProjectAnnotations(t), this.emitGlobals();
  }
  async onStoryIndexChanged() {
    if (delete this.previewEntryError, !(!this.storyStoreValue && !this.projectAnnotationsBeforeInitialization))
      try {
        let e = await this.getStoryIndexFromServer();
        if (this.projectAnnotationsBeforeInitialization) {
          this.initializeWithStoryIndex(e);
          return;
        }
        await this.onStoriesChanged({ storyIndex: e });
      } catch (e) {
        throw this.renderPreviewEntryError("Error loading story index:", e), e;
      }
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: e,
    storyIndex: t
  }) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "onStoriesChanged" });
    await this.storyStoreValue.onStoriesChanged({ importFn: e, storyIndex: t });
  }
  async onUpdateGlobals({
    globals: e,
    currentStory: t
  }) {
    if (this.storyStoreValue || await this.storeInitializationPromise, !this.storyStoreValue)
      throw new V({ methodName: "onUpdateGlobals" });
    if (this.storyStoreValue.userGlobals.update(e), t) {
      let { initialGlobals: o, storyGlobals: s2, userGlobals: i, globals: a } = this.storyStoreValue.getStoryContext(t);
      this.channel.emit(Ce, {
        initialGlobals: o,
        userGlobals: i,
        storyGlobals: s2,
        globals: a
      });
    } else {
      let { initialGlobals: o, globals: s2 } = this.storyStoreValue.userGlobals;
      this.channel.emit(Ce, {
        initialGlobals: o,
        userGlobals: s2,
        storyGlobals: {},
        globals: s2
      });
    }
    await Promise.all(this.storyRenders.map((o) => o.rerender()));
  }
  async onUpdateArgs({ storyId: e, updatedArgs: t }) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "onUpdateArgs" });
    this.storyStoreValue.args.update(e, t), await Promise.all(
      this.storyRenders.filter((o) => o.id === e && !o.renderOptions.forceInitialArgs).map(
        (o) => (
          // We only run the play function, with in a force remount.
          // But when mount is destructured, the rendering happens inside of the play function.
          o.story && o.story.usesMount ? o.remount() : o.rerender()
        )
      )
    ), this.channel.emit(to, {
      storyId: e,
      args: this.storyStoreValue.args.get(e)
    });
  }
  async onRequestArgTypesInfo({ id: e, payload: t }) {
    var _a;
    try {
      await this.storeInitializationPromise;
      let o = await ((_a = this.storyStoreValue) == null ? void 0 : _a.loadStory(t));
      this.channel.emit(nt, {
        id: e,
        success: true,
        payload: { argTypes: (o == null ? void 0 : o.argTypes) || {} },
        error: null
      });
    } catch (o) {
      this.channel.emit(nt, {
        id: e,
        success: false,
        error: o == null ? void 0 : o.message
      });
    }
  }
  async onResetArgs({ storyId: e, argNames: t }) {
    var _a;
    if (!this.storyStoreValue)
      throw new V({ methodName: "onResetArgs" });
    let s2 = ((_a = this.storyRenders.find((c) => c.id === e)) == null ? void 0 : _a.story) || await this.storyStoreValue.loadStory({ storyId: e }), a = (t || [
      .../* @__PURE__ */ new Set([
        ...Object.keys(s2.initialArgs),
        ...Object.keys(this.storyStoreValue.args.get(e))
      ])
    ]).reduce((c, l) => (c[l] = s2.initialArgs[l], c), {});
    await this.onUpdateArgs({ storyId: e, updatedArgs: a });
  }
  // ForceReRender does not include a story id, so we simply must
  // re-render all stories in case they are relevant
  async onForceReRender() {
    await Promise.all(this.storyRenders.map((e) => e.rerender()));
  }
  async onForceRemount({ storyId: e }) {
    await Promise.all(this.storyRenders.filter((t) => t.id === e).map((t) => t.remount()));
  }
  // Used by docs to render a story to a given element
  // Note this short-circuits the `prepare()` phase of the StoryRender,
  // main to be consistent with the previous behaviour. In the future,
  // we will change it to go ahead and load the story, which will end up being
  // "instant", although async.
  renderStoryToElement(e, t, o, s2) {
    if (!this.renderToCanvas || !this.storyStoreValue)
      throw new V({
        methodName: "renderStoryToElement"
      });
    let i = new je(
      this.channel,
      this.storyStoreValue,
      this.renderToCanvas,
      o,
      e.id,
      "docs",
      s2,
      e
    );
    return i.renderToElement(t), this.storyRenders.push(i), async () => {
      await this.teardownRender(i);
    };
  }
  async teardownRender(e, { viewModeChanged: t } = {}) {
    var _a;
    this.storyRenders = this.storyRenders.filter((o) => o !== e), await ((_a = e == null ? void 0 : e.teardown) == null ? void 0 : _a.call(e, { viewModeChanged: t }));
  }
  // API
  async loadStory({ storyId: e }) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "loadStory" });
    return this.storyStoreValue.loadStory({ storyId: e });
  }
  getStoryContext(e, { forceInitialArgs: t = false } = {}) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "getStoryContext" });
    return this.storyStoreValue.getStoryContext(e, { forceInitialArgs: t });
  }
  async extract(e) {
    if (!this.storyStoreValue)
      throw new V({ methodName: "extract" });
    if (this.previewEntryError)
      throw this.previewEntryError;
    return await this.storyStoreValue.cacheAllCSFFiles(), this.storyStoreValue.extract(e);
  }
  // UTILITIES
  renderPreviewEntryError(e, t) {
    this.previewEntryError = t, I$1.error(e), I$1.error(t), this.channel.emit($t, t);
  }
};
n(Nn, "Preview");
var Me = Nn;
var kn = class kn2 {
  constructor(e, t, o, s2) {
    this.channel = e;
    this.store = t;
    this.renderStoryToElement = o;
    this.storyIdByName = /* @__PURE__ */ n((e2) => {
      let t2 = this.nameToStoryId.get(e2);
      if (t2)
        return t2;
      throw new Error(`No story found with that name: ${e2}`);
    }, "storyIdByName");
    this.componentStories = /* @__PURE__ */ n(() => this.componentStoriesValue, "componentStories");
    this.componentStoriesFromCSFFile = /* @__PURE__ */ n((e2) => this.store.componentStoriesFromCSFFile({ csfFile: e2 }), "componentStoriesFromCSFFile");
    this.storyById = /* @__PURE__ */ n((e2) => {
      if (!e2) {
        if (!this.primaryStory)
          throw new Error(
            "No primary story defined for docs entry. Did you forget to use `<Meta>`?"
          );
        return this.primaryStory;
      }
      let t2 = this.storyIdToCSFFile.get(e2);
      if (!t2)
        throw new Error(`Called \`storyById\` for story that was never loaded: ${e2}`);
      return this.store.storyFromCSFFile({ storyId: e2, csfFile: t2 });
    }, "storyById");
    this.getStoryContext = /* @__PURE__ */ n((e2) => ({
      ...this.store.getStoryContext(e2),
      loaded: {},
      viewMode: "docs"
    }), "getStoryContext");
    this.loadStory = /* @__PURE__ */ n((e2) => this.store.loadStory({ storyId: e2 }), "loadStory");
    this.componentStoriesValue = [], this.storyIdToCSFFile = /* @__PURE__ */ new Map(), this.exportToStory = /* @__PURE__ */ new Map(), this.exportsToCSFFile = /* @__PURE__ */ new Map(), this.nameToStoryId = /* @__PURE__ */ new Map(), this.attachedCSFFiles = /* @__PURE__ */ new Set(), s2.forEach((i, a) => {
      this.referenceCSFFile(i);
    });
  }
  // This docs entry references this CSF file and can synchronously load the stories, as well
  // as reference them by module export. If the CSF is part of the "component" stories, they
  // can also be referenced by name and are in the componentStories list.
  referenceCSFFile(e) {
    this.exportsToCSFFile.set(e.moduleExports, e), this.exportsToCSFFile.set(e.moduleExports.default, e), this.store.componentStoriesFromCSFFile(
      { csfFile: e }
    ).forEach((o) => {
      let s2 = e.stories[o.id];
      this.storyIdToCSFFile.set(s2.id, e), this.exportToStory.set(s2.moduleExport, o);
    });
  }
  attachCSFFile(e) {
    if (!this.exportsToCSFFile.has(e.moduleExports))
      throw new Error("Cannot attach a CSF file that has not been referenced");
    if (this.attachedCSFFiles.has(e))
      return;
    this.attachedCSFFiles.add(e), this.store.componentStoriesFromCSFFile({ csfFile: e }).forEach((o) => {
      this.nameToStoryId.set(o.name, o.id), this.componentStoriesValue.push(o), this.primaryStory || (this.primaryStory = o);
    });
  }
  referenceMeta(e, t) {
    let o = this.resolveModuleExport(e);
    if (o.type !== "meta")
      throw new Error(
        "<Meta of={} /> must reference a CSF file module export or meta export. Did you mistakenly reference your component instead of your CSF file?"
      );
    t && this.attachCSFFile(o.csfFile);
  }
  get projectAnnotations() {
    let { projectAnnotations: e } = this.store;
    if (!e)
      throw new Error("Can't get projectAnnotations from DocsContext before they are initialized");
    return e;
  }
  resolveAttachedModuleExportType(e) {
    if (e === "story") {
      if (!this.primaryStory)
        throw new Error(
          "No primary story attached to this docs file, did you forget to use <Meta of={} />?"
        );
      return { type: "story", story: this.primaryStory };
    }
    if (this.attachedCSFFiles.size === 0)
      throw new Error(
        "No CSF file attached to this docs file, did you forget to use <Meta of={} />?"
      );
    let t = Array.from(this.attachedCSFFiles)[0];
    if (e === "meta")
      return { type: "meta", csfFile: t };
    let { component: o } = t.meta;
    if (!o)
      throw new Error(
        "Attached CSF file does not defined a component, did you forget to export one?"
      );
    return { type: "component", component: o };
  }
  resolveModuleExport(e) {
    let t = this.exportsToCSFFile.get(e);
    if (t)
      return { type: "meta", csfFile: t };
    let o = this.exportToStory.get(
      nr(e) ? e.input : e
    );
    return o ? { type: "story", story: o } : { type: "component", component: e };
  }
  resolveOf(e, t = []) {
    let o;
    if (["component", "meta", "story"].includes(e)) {
      let s2 = e;
      o = this.resolveAttachedModuleExportType(s2);
    } else
      o = this.resolveModuleExport(e);
    if (t.length && !t.includes(o.type)) {
      let s2 = o.type === "component" ? "component or unknown" : o.type;
      throw new Error(_$1`Invalid value passed to the 'of' prop. The value was resolved to a '${s2}' type but the only types for this block are: ${t.join(
        ", "
      )}.
        - Did you pass a component to the 'of' prop when the block only supports a story or a meta?
        - ... or vice versa?
        - Did you pass a story, CSF file or meta to the 'of' prop that is not indexed, ie. is not targeted by the 'stories' globs in the main configuration?`);
    }
    switch (o.type) {
      case "component":
        return {
          ...o,
          projectAnnotations: this.projectAnnotations
        };
      case "meta":
        return {
          ...o,
          preparedMeta: this.store.preparedMetaFromCSFFile({ csfFile: o.csfFile })
        };
      case "story":
      default:
        return o;
    }
  }
};
n(kn, "DocsContext");
var me = kn;
var Ln = class Ln2 {
  constructor(e, t, o, s2) {
    this.channel = e;
    this.store = t;
    this.entry = o;
    this.callbacks = s2;
    this.type = "docs";
    this.subtype = "csf";
    this.torndown = false;
    this.disableKeyListeners = false;
    this.preparing = false;
    this.id = o.id;
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = true;
    let { entryExports: e, csfFiles: t = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw Ae;
    let { importPath: o, title: s2 } = this.entry, i = this.store.processCSFFileWithCache(
      e,
      o,
      s2
    ), a = Object.keys(i.stories)[0];
    this.story = this.store.storyFromCSFFile({ storyId: a, csfFile: i }), this.csfFiles = [i, ...t], this.preparing = false;
  }
  isEqual(e) {
    return !!(this.id === e.id && this.story && this.story === e.story);
  }
  docsContext(e) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let t = new me(
      this.channel,
      this.store,
      e,
      this.csfFiles
    );
    return this.csfFiles.forEach((o) => t.attachCSFFile(o)), t;
  }
  async renderToElement(e, t) {
    if (!this.story || !this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(t), { docs: s2 } = this.story.parameters || {};
    if (!s2)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let i = await s2.renderer(), { render: a } = i, c = /* @__PURE__ */ n(async () => {
      try {
        await a(o, s2, e), this.channel.emit(pr, this.id);
      } catch (l) {
        this.callbacks.showException(l);
      }
    }, "renderDocs");
    return this.rerender = async () => c(), this.teardownRender = async ({ viewModeChanged: l }) => {
      !l || !e || i.unmount(e);
    }, c();
  }
  async teardown({ viewModeChanged: e } = {}) {
    var _a;
    (_a = this.teardownRender) == null ? void 0 : _a.call(this, { viewModeChanged: e }), this.torndown = true;
  }
};
n(Ln, "CsfDocsRender");
var qr = Ln;
var jn = class jn2 {
  constructor(e, t, o, s2) {
    this.channel = e;
    this.store = t;
    this.entry = o;
    this.callbacks = s2;
    this.type = "docs";
    this.subtype = "mdx";
    this.torndown = false;
    this.disableKeyListeners = false;
    this.preparing = false;
    this.id = o.id;
  }
  isPreparing() {
    return this.preparing;
  }
  async prepare() {
    this.preparing = true;
    let { entryExports: e, csfFiles: t = [] } = await this.store.loadEntry(this.id);
    if (this.torndown)
      throw Ae;
    this.csfFiles = t, this.exports = e, this.preparing = false;
  }
  isEqual(e) {
    return !!(this.id === e.id && this.exports && this.exports === e.exports);
  }
  docsContext(e) {
    if (!this.csfFiles)
      throw new Error("Cannot render docs before preparing");
    return new me(
      this.channel,
      this.store,
      e,
      this.csfFiles
    );
  }
  async renderToElement(e, t) {
    if (!this.exports || !this.csfFiles || !this.store.projectAnnotations)
      throw new Error("Cannot render docs before preparing");
    let o = this.docsContext(t), { docs: s2 } = this.store.projectAnnotations.parameters || {};
    if (!s2)
      throw new Error(
        "Cannot render a story in viewMode=docs if `@storybook/addon-docs` is not installed"
      );
    let i = { ...s2, page: this.exports.default }, a = await s2.renderer(), { render: c } = a, l = /* @__PURE__ */ n(async () => {
      try {
        await c(o, i, e), this.channel.emit(pr, this.id);
      } catch (p) {
        this.callbacks.showException(p);
      }
    }, "renderDocs");
    return this.rerender = async () => l(), this.teardownRender = async ({ viewModeChanged: p } = {}) => {
      !p || !e || (a.unmount(e), this.torndown = true);
    }, l();
  }
  async teardown({ viewModeChanged: e } = {}) {
    var _a;
    (_a = this.teardownRender) == null ? void 0 : _a.call(this, { viewModeChanged: e }), this.torndown = true;
  }
};
n(jn, "MdxDocsRender");
var Br = jn;
var lu = globalThis;
function cu(r) {
  let e = r.composedPath && r.composedPath()[0] || r.target;
  return /input|textarea/i.test(e.tagName) || e.getAttribute("contenteditable") !== null;
}
n(cu, "focusInInput");
var Qi = "attached-mdx", pu = "unattached-mdx";
function du({ tags: r }) {
  return (r == null ? void 0 : r.includes(pu)) || (r == null ? void 0 : r.includes(Qi));
}
n(du, "isMdxEntry");
function Mn(r) {
  return r.type === "story";
}
n(Mn, "isStoryRender");
function uu(r) {
  return r.type === "docs";
}
n(uu, "isDocsRender");
function fu(r) {
  return uu(r) && r.subtype === "csf";
}
n(fu, "isCsfDocsRender");
var Un = class Un2 extends Me {
  constructor(t, o, s2, i) {
    super(t, o, void 0, false);
    this.importFn = t;
    this.getProjectAnnotations = o;
    this.selectionStore = s2;
    this.view = i;
    this.initialize();
  }
  setupListeners() {
    super.setupListeners(), lu.onkeydown = this.onKeydown.bind(this), this.channel.on(eo, this.onSetCurrentStory.bind(this)), this.channel.on(
      po,
      this.onUpdateQueryParams.bind(this)
    ), this.channel.on(Qt, this.onPreloadStories.bind(this));
  }
  async setInitialGlobals() {
    if (!this.storyStoreValue)
      throw new V({ methodName: "setInitialGlobals" });
    let { globals: t } = this.selectionStore.selectionSpecifier || {};
    t && this.storyStoreValue.userGlobals.updateFromPersisted(t), this.emitGlobals();
  }
  // If initialization gets as far as the story index, this function runs.
  async initializeWithStoryIndex(t) {
    return await super.initializeWithStoryIndex(t), this.selectSpecifiedStory();
  }
  // Use the selection specifier to choose a story, then render it
  async selectSpecifiedStory() {
    if (!this.storyStoreValue)
      throw new V({
        methodName: "selectSpecifiedStory"
      });
    if (this.selectionStore.selection) {
      await this.renderSelection();
      return;
    }
    if (!this.selectionStore.selectionSpecifier) {
      this.renderMissingStory();
      return;
    }
    let { storySpecifier: t, args: o } = this.selectionStore.selectionSpecifier, s2 = this.storyStoreValue.storyIndex.entryFromSpecifier(t);
    if (!s2) {
      t === "*" ? this.renderStoryLoadingException(t, new Pr()) : this.renderStoryLoadingException(
        t,
        new Or({ storySpecifier: t.toString() })
      );
      return;
    }
    let { id: i, type: a } = s2;
    this.selectionStore.setSelection({ storyId: i, viewMode: a }), this.channel.emit(ao, this.selectionStore.selection), this.channel.emit(
      rt,
      this.selectionStore.selection
    ), await this.renderSelection({ persistedArgs: o });
  }
  // EVENT HANDLERS
  // This happens when a config file gets reloaded
  async onGetProjectAnnotationsChanged({
    getProjectAnnotations: t
  }) {
    await super.onGetProjectAnnotationsChanged({ getProjectAnnotations: t }), this.selectionStore.selection && this.renderSelection();
  }
  // This happens when a glob gets HMR-ed
  async onStoriesChanged({
    importFn: t,
    storyIndex: o
  }) {
    await super.onStoriesChanged({ importFn: t, storyIndex: o }), this.selectionStore.selection ? await this.renderSelection() : await this.selectSpecifiedStory();
  }
  onKeydown(t) {
    if (!this.storyRenders.find((o) => o.disableKeyListeners) && !cu(t)) {
      let { altKey: o, ctrlKey: s2, metaKey: i, shiftKey: a, key: c, code: l, keyCode: p } = t;
      this.channel.emit(Zt, {
        event: { altKey: o, ctrlKey: s2, metaKey: i, shiftKey: a, key: c, code: l, keyCode: p }
      });
    }
  }
  async onSetCurrentStory(t) {
    this.selectionStore.setSelection({ viewMode: "story", ...t }), await this.storeInitializationPromise, this.channel.emit(rt, this.selectionStore.selection), this.renderSelection();
  }
  onUpdateQueryParams(t) {
    this.selectionStore.setQueryParams(t);
  }
  async onUpdateGlobals({ globals: t }) {
    var _a, _b;
    let o = this.currentRender instanceof je && this.currentRender.story || void 0;
    super.onUpdateGlobals({ globals: t, currentStory: o }), (this.currentRender instanceof Br || this.currentRender instanceof qr) && await ((_b = (_a = this.currentRender).rerender) == null ? void 0 : _b.call(_a));
  }
  async onUpdateArgs({ storyId: t, updatedArgs: o }) {
    super.onUpdateArgs({ storyId: t, updatedArgs: o });
  }
  async onPreloadStories({ ids: t }) {
    await this.storeInitializationPromise, this.storyStoreValue && await Promise.allSettled(t.map((o) => {
      var _a;
      return (_a = this.storyStoreValue) == null ? void 0 : _a.loadEntry(o);
    }));
  }
  // RENDERING
  // We can either have:
  // - a story selected in "story" viewMode,
  //     in which case we render it to the root element, OR
  // - a story selected in "docs" viewMode,
  //     in which case we render the docsPage for that story
  async renderSelection({ persistedArgs: t } = {}) {
    var _a, _b, _c2, _d2;
    let { renderToCanvas: o } = this;
    if (!this.storyStoreValue || !o)
      throw new V({ methodName: "renderSelection" });
    let { selection: s2 } = this.selectionStore;
    if (!s2)
      throw new Error("Cannot call renderSelection as no selection was made");
    let { storyId: i } = s2, a;
    try {
      a = await this.storyStoreValue.storyIdToEntry(i);
    } catch (S2) {
      this.currentRender && await this.teardownRender(this.currentRender), this.renderStoryLoadingException(i, S2);
      return;
    }
    let c = ((_a = this.currentSelection) == null ? void 0 : _a.storyId) !== i, l = ((_b = this.currentRender) == null ? void 0 : _b.type) !== a.type;
    a.type === "story" ? this.view.showPreparingStory({ immediate: l }) : this.view.showPreparingDocs({ immediate: l }), ((_c2 = this.currentRender) == null ? void 0 : _c2.isPreparing()) && await this.teardownRender(this.currentRender);
    let p;
    a.type === "story" ? p = new je(
      this.channel,
      this.storyStoreValue,
      o,
      this.mainStoryCallbacks(i),
      i,
      "story"
    ) : du(a) ? p = new Br(
      this.channel,
      this.storyStoreValue,
      a,
      this.mainStoryCallbacks(i)
    ) : p = new qr(
      this.channel,
      this.storyStoreValue,
      a,
      this.mainStoryCallbacks(i)
    );
    let u = this.currentSelection;
    this.currentSelection = s2;
    let d = this.currentRender;
    this.currentRender = p;
    try {
      await p.prepare();
    } catch (S2) {
      d && await this.teardownRender(d), S2 !== Ae && this.renderStoryLoadingException(i, S2);
      return;
    }
    let h = !c && d && !p.isEqual(d);
    if (t && Mn(p) && (fe(!!p.story), this.storyStoreValue.args.updateFromPersisted(p.story, t)), d && !d.torndown && !c && !h && !l) {
      this.currentRender = d, this.channel.emit(co, i), this.view.showMain();
      return;
    }
    if (d && await this.teardownRender(d, { viewModeChanged: l }), u && (c || l) && this.channel.emit(oo, i), Mn(p)) {
      fe(!!p.story);
      let {
        parameters: S2,
        initialArgs: m,
        argTypes: T2,
        unmappedArgs: y2,
        initialGlobals: R2,
        userGlobals: x2,
        storyGlobals: g,
        globals: b2
      } = this.storyStoreValue.getStoryContext(p.story);
      this.channel.emit(io, {
        id: i,
        parameters: S2,
        initialArgs: m,
        argTypes: T2,
        args: y2
      }), this.channel.emit(Ce, { userGlobals: x2, storyGlobals: g, globals: b2, initialGlobals: R2 });
    } else {
      let { parameters: S2 } = this.storyStoreValue.projectAnnotations, { initialGlobals: m, globals: T2 } = this.storyStoreValue.userGlobals;
      if (this.channel.emit(Ce, {
        globals: T2,
        initialGlobals: m,
        storyGlobals: {},
        userGlobals: T2
      }), fu(p) || ((_d2 = p.entry.tags) == null ? void 0 : _d2.includes(Qi))) {
        if (!p.csfFiles)
          throw new Cr({ storyId: i });
        ({ parameters: S2 } = this.storyStoreValue.preparedMetaFromCSFFile({
          csfFile: p.csfFiles[0]
        }));
      }
      this.channel.emit(Yt, {
        id: i,
        parameters: S2
      });
    }
    Mn(p) ? (fe(!!p.story), this.storyRenders.push(p), this.currentRender.renderToElement(
      this.view.prepareForStory(p.story)
    )) : this.currentRender.renderToElement(
      this.view.prepareForDocs(),
      // This argument is used for docs, which is currently only compatible with HTMLElements
      this.renderStoryToElement.bind(this)
    );
  }
  async teardownRender(t, { viewModeChanged: o = false } = {}) {
    var _a;
    this.storyRenders = this.storyRenders.filter((s2) => s2 !== t), await ((_a = t == null ? void 0 : t.teardown) == null ? void 0 : _a.call(t, { viewModeChanged: o }));
  }
  // UTILITIES
  mainStoryCallbacks(t) {
    return {
      showStoryDuringRender: /* @__PURE__ */ n(() => this.view.showStoryDuringRender(), "showStoryDuringRender"),
      showMain: /* @__PURE__ */ n(() => this.view.showMain(), "showMain"),
      showError: /* @__PURE__ */ n((o) => this.renderError(t, o), "showError"),
      showException: /* @__PURE__ */ n((o) => this.renderException(t, o), "showException")
    };
  }
  renderPreviewEntryError(t, o) {
    super.renderPreviewEntryError(t, o), this.view.showErrorDisplay(o);
  }
  renderMissingStory() {
    this.view.showNoPreview(), this.channel.emit(tt);
  }
  renderStoryLoadingException(t, o) {
    I$1.error(o), this.view.showErrorDisplay(o), this.channel.emit(tt, t);
  }
  // renderException is used if we fail to render the story and it is uncaught by the app layer
  renderException(t, o) {
    let { name: s2 = "Error", message: i = String(o), stack: a } = o;
    this.channel.emit(lo, { name: s2, message: i, stack: a }), this.channel.emit(Pe, { newPhase: "errored", storyId: t }), this.view.showErrorDisplay(
      o
    ), I$1.error(`Error rendering story '${t}':`), I$1.error(o);
  }
  // renderError is used by the various app layers to inform the user they have done something
  // wrong -- for instance returned the wrong thing from a story
  renderError(t, { title: o, description: s2 }) {
    I$1.error(`Error rendering story ${o}: ${s2}`), this.channel.emit(no, { title: o, description: s2 }), this.channel.emit(Pe, { newPhase: "errored", storyId: t }), this.view.showErrorDisplay({
      message: o,
      stack: s2
    });
  }
};
n(Un, "PreviewWithSelection");
var Ue = Un;
var Hr = ue(kt());
var da = ue(kt());
var pa = /^[a-zA-Z0-9 _-]*$/, ua = /^-?[0-9]+(\.[0-9]+)?$/, Uu = /^#([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i, fa = /^(rgba?|hsla?)\(([0-9]{1,3}),\s?([0-9]{1,3})%?,\s?([0-9]{1,3})%?,?\s?([0-9](\.[0-9]{1,2})?)?\)$/i, Wn = /* @__PURE__ */ n((r = "", e) => r === null || r === "" || !pa.test(r) ? false : e == null || e instanceof Date || typeof e == "number" || typeof e == "boolean" ? true : typeof e == "string" ? pa.test(e) || ua.test(e) || Uu.test(e) || fa.test(e) : Array.isArray(e) ? e.every((t) => Wn(
  r,
  t
)) : $$1(e) ? Object.entries(e).every(([t, o]) => Wn(t, o)) : false, "validateArgs"), Gu = {
  delimiter: ";",
  // we're parsing a single query param
  nesting: true,
  arrayRepeat: true,
  arrayRepeatSyntax: "bracket",
  nestingSyntax: "js",
  // objects are encoded using dot notation
  valueDeserializer(r) {
    if (r.startsWith("!")) {
      if (r === "!undefined")
        return;
      if (r === "!null")
        return null;
      if (r === "!true")
        return true;
      if (r === "!false")
        return false;
      if (r.startsWith("!date(") && r.endsWith(")"))
        return new Date(r.replaceAll(" ", "+").slice(6, -1));
      if (r.startsWith("!hex(") && r.endsWith(")"))
        return `#${r.slice(5, -1)}`;
      let e = r.slice(1).match(fa);
      if (e)
        return r.startsWith("!rgba") || r.startsWith("!RGBA") ? `${e[1]}(${e[2]}, ${e[3]}, ${e[4]}, ${e[5]})` : r.startsWith("!hsla") || r.startsWith(
          "!HSLA"
        ) ? `${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%, ${e[5]})` : r.startsWith("!rgb") || r.startsWith("!RGB") ? `${e[1]}(${e[2]}, ${e[3]}, ${e[4]})` : `${e[1]}(${e[2]}, ${e[3]}%, ${e[4]}%)`;
    }
    return ua.test(r) ? Number(r) : r;
  }
}, $n = /* @__PURE__ */ n((r) => {
  let e = r.split(";").map((t) => t.replace("=", "~").replace(":", "="));
  return Object.entries((0, da.parse)(e.join(";"), Gu)).reduce((t, [o, s2]) => Wn(o, s2) ? Object.assign(t, { [o]: s2 }) : (j$1.warn(_$1`
      Omitted potentially unsafe URL args.

      More info: https://storybook.js.org/docs/writing-stories/args#setting-args-through-the-url
    `), t), {});
}, "parseArgsParam");
var { history: ya, document: xe } = E$1;
function qu(r) {
  let e = (r || "").match(/^\/story\/(.+)/);
  if (!e)
    throw new Error(`Invalid path '${r}',  must start with '/story/'`);
  return e[1];
}
n(qu, "pathToId");
var ma = /* @__PURE__ */ n(({
  selection: r,
  extraParams: e
}) => {
  let t = xe == null ? void 0 : xe.location.search.slice(1), { path: o, selectedKind: s2, selectedStory: i, ...a } = (0, Hr.parse)(t);
  return `?${(0, Hr.stringify)({
    ...a,
    ...e,
    ...r && { id: r.storyId, viewMode: r.viewMode }
  })}`;
}, "getQueryString"), Bu = /* @__PURE__ */ n((r) => {
  if (!r)
    return;
  let e = ma({ selection: r }), { hash: t = "" } = xe.location;
  xe.title = r.storyId, ya.replaceState({}, "", `${xe.location.pathname}${e}${t}`);
}, "setPath"), Vu = /* @__PURE__ */ n((r) => r != null && typeof r == "object" && Array.isArray(r) === false, "isObject"), Vr = /* @__PURE__ */ n(
  (r) => {
    if (r !== void 0) {
      if (typeof r == "string")
        return r;
      if (Array.isArray(r))
        return Vr(r[0]);
      if (Vu(r))
        return Vr(
          Object.values(r).filter(Boolean)
        );
    }
  },
  "getFirstString"
), Hu = /* @__PURE__ */ n(() => {
  if (typeof xe < "u") {
    let r = xe.location.search.slice(1), e = (0, Hr.parse)(r), t = typeof e.args == "string" ? $n(e.args) : void 0, o = typeof e.globals == "string" ? $n(e.globals) : void 0, s2 = Vr(e.viewMode);
    (typeof s2 != "string" || !s2.match(/docs|story/)) && (s2 = "story");
    let i = Vr(e.path), a = i ? qu(i) : Vr(e.id);
    if (a)
      return { storySpecifier: a, args: t, globals: o, viewMode: s2 };
  }
  return null;
}, "getSelectionSpecifierFromPath"), Yn = class Yn2 {
  constructor() {
    this.selectionSpecifier = Hu();
  }
  setSelection(e) {
    this.selection = e, Bu(this.selection);
  }
  setQueryParams(e) {
    let t = ma({ extraParams: e }), { hash: o = "" } = xe.location;
    ya.replaceState({}, "", `${xe.location.pathname}${t}${o}`);
  }
};
n(Yn, "UrlStore");
var Be = Yn;
var $a = ue(Ha()), Ya = ue(kt());
var { document: z$1 } = E$1, za = 100, Ka = /* @__PURE__ */ ((i) => (i.MAIN = "MAIN", i.NOPREVIEW = "NOPREVIEW", i.PREPARING_STORY = "PREPARING_STORY", i.PREPARING_DOCS = "PREPARING_DOCS", i.ERROR = "ERROR", i))(Ka || {}), rs = {
  PREPARING_STORY: "sb-show-preparing-story",
  PREPARING_DOCS: "sb-show-preparing-docs",
  MAIN: "sb-show-main",
  NOPREVIEW: "sb-show-nopreview",
  ERROR: "sb-show-errordisplay"
}, ts = {
  centered: "sb-main-centered",
  fullscreen: "sb-main-fullscreen",
  padded: "sb-main-padded"
}, Wa = new $a.default({
  escapeXML: true
}), os = class os2 {
  constructor() {
    this.testing = false;
    if (typeof z$1 < "u") {
      let { __SPECIAL_TEST_PARAMETER__: e } = (0, Ya.parse)(z$1.location.search.slice(1));
      switch (e) {
        case "preparing-story": {
          this.showPreparingStory(), this.testing = true;
          break;
        }
        case "preparing-docs": {
          this.showPreparingDocs(), this.testing = true;
          break;
        }
      }
    }
  }
  // Get ready to render a story, returning the element to render to
  prepareForStory(e) {
    return this.showStory(), this.applyLayout(e.parameters.layout), z$1.documentElement.scrollTop = 0, z$1.documentElement.scrollLeft = 0, this.storyRoot();
  }
  storyRoot() {
    return z$1.getElementById("storybook-root");
  }
  prepareForDocs() {
    return this.showMain(), this.showDocs(), this.applyLayout("fullscreen"), z$1.documentElement.scrollTop = 0, z$1.documentElement.scrollLeft = 0, this.docsRoot();
  }
  docsRoot() {
    return z$1.getElementById("storybook-docs");
  }
  applyLayout(e = "padded") {
    if (e === "none") {
      z$1.body.classList.remove(this.currentLayoutClass), this.currentLayoutClass = null;
      return;
    }
    this.checkIfLayoutExists(e);
    let t = ts[e];
    z$1.body.classList.remove(this.currentLayoutClass), z$1.body.classList.add(t), this.currentLayoutClass = t;
  }
  checkIfLayoutExists(e) {
    ts[e] || I$1.warn(
      _$1`
          The desired layout: ${e} is not a valid option.
          The possible options are: ${Object.keys(ts).join(", ")}, none.
        `
    );
  }
  showMode(e) {
    clearTimeout(this.preparingTimeout), Object.keys(Ka).forEach((t) => {
      t === e ? z$1.body.classList.add(rs[t]) : z$1.body.classList.remove(rs[t]);
    });
  }
  showErrorDisplay({ message: e = "", stack: t = "" }) {
    let o = e, s2 = t, i = e.split(`
`);
    i.length > 1 && ([o] = i, s2 = i.slice(1).join(`
`).replace(/^\n/, "")), z$1.getElementById("error-message").innerHTML = Wa.toHtml(o), z$1.getElementById("error-stack").innerHTML = Wa.toHtml(s2), this.showMode("ERROR");
  }
  showNoPreview() {
    var _a, _b;
    this.testing || (this.showMode("NOPREVIEW"), (_a = this.storyRoot()) == null ? void 0 : _a.setAttribute("hidden", "true"), (_b = this.docsRoot()) == null ? void 0 : _b.setAttribute("hidden", "true"));
  }
  showPreparingStory({ immediate: e = false } = {}) {
    clearTimeout(this.preparingTimeout), e ? this.showMode("PREPARING_STORY") : this.preparingTimeout = setTimeout(
      () => this.showMode("PREPARING_STORY"),
      za
    );
  }
  showPreparingDocs({ immediate: e = false } = {}) {
    clearTimeout(this.preparingTimeout), e ? this.showMode("PREPARING_DOCS") : this.preparingTimeout = setTimeout(() => this.showMode("PREPARING_DOCS"), za);
  }
  showMain() {
    this.showMode("MAIN");
  }
  showDocs() {
    this.storyRoot().setAttribute("hidden", "true"), this.docsRoot().removeAttribute("hidden");
  }
  showStory() {
    this.docsRoot().setAttribute("hidden", "true"), this.storyRoot().removeAttribute("hidden");
  }
  showStoryDuringRender() {
    z$1.body.classList.add(rs.MAIN);
  }
};
n(os, "WebView");
var He = os;
var ns = class ns2 extends Ue {
  constructor(t, o) {
    super(t, o, new Be(), new He());
    this.importFn = t;
    this.getProjectAnnotations = o;
    E$1.__STORYBOOK_PREVIEW__ = this;
  }
};
n(ns, "PreviewWeb");
var Wr = ns;
var { document: ze } = E$1, wf = [
  "application/javascript",
  "application/ecmascript",
  "application/x-ecmascript",
  "application/x-javascript",
  "text/ecmascript",
  "text/javascript",
  "text/javascript1.0",
  "text/javascript1.1",
  "text/javascript1.2",
  "text/javascript1.3",
  "text/javascript1.4",
  "text/javascript1.5",
  "text/jscript",
  "text/livescript",
  "text/x-ecmascript",
  "text/x-javascript",
  // Support modern javascript
  "module"
], _f = "script", Xa = "scripts-root";
function $r() {
  let r = ze.createEvent("Event");
  r.initEvent("DOMContentLoaded", true, true), ze.dispatchEvent(r);
}
n($r, "simulateDOMContentLoaded");
function Cf(r, e, t) {
  let o = ze.createElement("script");
  o.type = r.type === "module" ? "module" : "text/javascript", r.src ? (o.onload = e, o.onerror = e, o.src = r.src) : o.textContent = r.innerText, t ? t.appendChild(o) : ze.head.appendChild(o), r.parentNode.removeChild(r), r.src || e();
}
n(Cf, "insertScript");
function Ja(r, e, t = 0) {
  r[t](() => {
    t++, t === r.length ? e() : Ja(r, e, t);
  });
}
n(Ja, "insertScriptsSequentially");
function ss(r) {
  let e = ze.getElementById(Xa);
  e ? e.innerHTML = "" : (e = ze.createElement("div"), e.id = Xa, ze.body.appendChild(e));
  let t = Array.from(r.querySelectorAll(_f));
  if (t.length) {
    let o = [];
    t.forEach((s2) => {
      let i = s2.getAttribute("type");
      (!i || wf.includes(i)) && o.push((a) => Cf(s2, a, e));
    }), o.length && Ja(o, $r, void 0);
  } else
    $r();
}
n(ss, "simulatePageLoad");
var Qa = {
  "@storybook/global": Ht,
  "storybook/internal/channels": br,
  "@storybook/channels": br,
  "@storybook/core/channels": br,
  "storybook/internal/client-logger": mr,
  "@storybook/client-logger": mr,
  "@storybook/core/client-logger": mr,
  "storybook/internal/core-events": ge,
  "@storybook/core-events": ge,
  "@storybook/core/core-events": ge,
  "storybook/internal/preview-errors": kr,
  "@storybook/core-events/preview-errors": kr,
  "@storybook/core/preview-errors": kr,
  "storybook/internal/preview-api": Yr,
  "@storybook/preview-api": Yr,
  "@storybook/core/preview-api": Yr,
  "storybook/internal/types": Tr,
  "@storybook/types": Tr,
  "@storybook/core/types": Tr
};
var el = ue(Za());
var ls;
function Pf() {
  var _a;
  return ls || (ls = new el.default((_a = E$1.navigator) == null ? void 0 : _a.userAgent).getBrowserInfo()), ls;
}
n(Pf, "getBrowserInfo");
function rl(r) {
  return r.browserInfo = Pf(), r;
}
n(rl, "prepareForTelemetry");
function Of(r) {
  let e = r.error || r;
  e.fromStorybook && E$1.sendTelemetryError(e);
}
n(Of, "errorListener");
function If({ reason: r }) {
  r.fromStorybook && E$1.sendTelemetryError(r);
}
n(If, "unhandledRejectionListener");
function Ff() {
  cs.forEach((r) => {
    E$1[yo[r]] = Qa[r];
  }), E$1.sendTelemetryError = (r) => {
    E$1.__STORYBOOK_ADDONS_CHANNEL__.emit(uo, rl(r));
  }, E$1.addEventListener("error", Of), E$1.addEventListener("unhandledrejection", If);
}
n(Ff, "setup");
Ff();
const { createBrowserChannel } = __STORYBOOK_MODULE_CHANNELS__;
const { addons } = __STORYBOOK_MODULE_PREVIEW_API__;
const channel = createBrowserChannel({ page: "preview" });
addons.setChannel(channel);
window.__STORYBOOK_ADDONS_CHANNEL__ = channel;
if (window.CONFIG_TYPE === "DEVELOPMENT") {
  window.__STORYBOOK_SERVER_CHANNEL__ = channel;
}
var b = Object.create;
var f = Object.defineProperty;
var v = Object.getOwnPropertyDescriptor;
var P = Object.getOwnPropertyNames;
var O = Object.getPrototypeOf, _ = Object.prototype.hasOwnProperty;
var s = (e, r) => f(e, "name", { value: r, configurable: true });
var $ = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports);
var j = (e, r, t, n2) => {
  if (r && typeof r == "object" || typeof r == "function")
    for (let a of P(r))
      !_.call(e, a) && a !== t && f(e, a, { get: () => r[a], enumerable: !(n2 = v(r, a)) || n2.enumerable });
  return e;
};
var C = (e, r, t) => (t = e != null ? b(O(e)) : {}, j(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  f(t, "default", { value: e, enumerable: true }),
  e
));
var T = $((g) => {
  Object.defineProperty(g, "__esModule", { value: true }), g.isEqual = /* @__PURE__ */ function() {
    var e = Object.prototype.toString, r = Object.getPrototypeOf, t = Object.getOwnPropertySymbols ? function(n2) {
      return Object.keys(n2).concat(Object.getOwnPropertySymbols(n2));
    } : Object.keys;
    return function(n2, a) {
      return (/* @__PURE__ */ s(function d(o, i, p) {
        var c, u, l, m = e.call(o), h = e.call(i);
        if (o === i) return true;
        if (o == null || i == null) return false;
        if (p.indexOf(o) > -1 && p.indexOf(i) > -1) return true;
        if (p.push(o, i), m != h || (c = t(o), u = t(i), c.length != u.length || c.some(function(A) {
          return !d(o[A], i[A], p);
        }))) return false;
        switch (m.slice(8, -1)) {
          case "Symbol":
            return o.valueOf() == i.valueOf();
          case "Date":
          case "Number":
            return +o == +i || +o != +o && +i != +i;
          case "RegExp":
          case "Function":
          case "String":
          case "Boolean":
            return "" + o == "" + i;
          case "Set":
          case "Map":
            c = o.entries(), u = i.entries();
            do
              if (!d((l = c.next()).value, u.next().value, p)) return false;
            while (!l.done);
            return true;
          case "ArrayBuffer":
            o = new Uint8Array(o), i = new Uint8Array(i);
          case "DataView":
            o = new Uint8Array(o.buffer), i = new Uint8Array(i.buffer);
          case "Float32Array":
          case "Float64Array":
          case "Int8Array":
          case "Int16Array":
          case "Int32Array":
          case "Uint8Array":
          case "Uint16Array":
          case "Uint32Array":
          case "Uint8ClampedArray":
          case "Arguments":
          case "Array":
            if (o.length != i.length) return false;
            for (l = 0; l < o.length; l++) if ((l in o || l in i) && (l in o != l in i || !d(o[l], i[l], p))) return false;
            return true;
          case "Object":
            return d(r(o), r(i), p);
          default:
            return false;
        }
      }, "n"))(n2, a, []);
    };
  }();
});
function R(e) {
  return e.replace(/_/g, " ").replace(/-/g, " ").replace(/\./g, " ").replace(/([^\n])([A-Z])([a-z])/g, (r, t, n2, a) => `${t} ${n2}${a}`).replace(
    /([a-z])([A-Z])/g,
    (r, t, n2) => `${t} ${n2}`
  ).replace(/([a-z])([0-9])/gi, (r, t, n2) => `${t} ${n2}`).replace(/([0-9])([a-z])/gi, (r, t, n2) => `${t} ${n2}`).replace(/(\s|^)(\w)/g, (r, t, n2) => `${t}${n2.toUpperCase()}`).replace(/ +/g, " ").trim();
}
s(R, "toStartCaseStr");
var y = C(T());
var x = /* @__PURE__ */ s((e) => e.map((r) => typeof r < "u").filter(Boolean).length, "count"), E = /* @__PURE__ */ s((e, r) => {
  let { exists: t, eq: n2, neq: a, truthy: d } = e;
  if (x([t, n2, a, d]) > 1)
    throw new Error(`Invalid conditional test ${JSON.stringify({ exists: t, eq: n2, neq: a })}`);
  if (typeof n2 < "u")
    return (0, y.isEqual)(r, n2);
  if (typeof a < "u")
    return !(0, y.isEqual)(r, a);
  if (typeof t < "u") {
    let i = typeof r < "u";
    return t ? i : !i;
  }
  return (typeof d > "u" ? true : d) ? !!r : !r;
}, "testValue"), z = /* @__PURE__ */ s((e, r, t) => {
  if (!e.if)
    return true;
  let { arg: n2, global: a } = e.if;
  if (x([n2, a]) !== 1)
    throw new Error(`Invalid conditional value ${JSON.stringify({ arg: n2, global: a })}`);
  let d = n2 ? r[n2] : t[a];
  return E(e.if, d);
}, "includeConditionalArg");
const { composeConfigs: M, normalizeProjectAnnotations: N } = __STORYBOOK_MODULE_PREVIEW_API__;
function L(e) {
  let r, t = {
    _tag: "Preview",
    input: e,
    get composed() {
      if (r)
        return r;
      let { addons: n2, ...a } = e;
      return r = N(M([...n2 ?? [], a])), r;
    },
    meta(n2) {
      return I(n2, this);
    }
  };
  return globalThis.globalProjectAnnotations = t.composed, t;
}
s(L, "__definePreview");
function W(e) {
  return e != null && typeof e == "object" && "_tag" in e && (e == null ? void 0 : e._tag) === "Preview";
}
s(W, "isPreview");
function H(e) {
  return e != null && typeof e == "object" && "_tag" in e && (e == null ? void 0 : e._tag) === "Meta";
}
s(H, "isMeta");
function I(e, r) {
  return {
    _tag: "Meta",
    input: e,
    preview: r,
    get composed() {
      throw new Error("Not implemented");
    },
    story(t) {
      return U(t, this);
    }
  };
}
s(I, "defineMeta");
function U(e, r) {
  return {
    _tag: "Story",
    input: e,
    meta: r,
    get composed() {
      throw new Error("Not implemented");
    }
  };
}
s(U, "defineStory");
function K(e) {
  return e != null && typeof e == "object" && "_tag" in e && (e == null ? void 0 : e._tag) === "Story";
}
s(K, "isStory");
var D = /* @__PURE__ */ s((e) => e.toLowerCase().replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "-").replace(
  /-+/g,
  "-"
).replace(/^-+/, "").replace(/-+$/, ""), "sanitize");
function S(e, r) {
  return Array.isArray(r) ? r.includes(e) : e.match(r);
}
s(S, "matches");
function te(e, { includeStories: r, excludeStories: t }) {
  return (
    // https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs
    e !== "__esModule" && (!r || S(e, r)) && (!t || !S(e, t))
  );
}
s(te, "isExportStory");
const importers = {
  "./components/App.stories.tsx": () => __vitePreload(() => import("./App.stories-CwwTu7pH.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0, import.meta.url),
  "./components/Header.stories.tsx": () => __vitePreload(() => import("./Header.stories-CZOyr_G7.js"), true ? __vite__mapDeps([5,1,6,3,4,7,8,9]) : void 0, import.meta.url),
  "./components/Logo.stories.tsx": () => __vitePreload(() => import("./Logo.stories-CDkwnt2E.js"), true ? __vite__mapDeps([10,1,11,7,8,9,4]) : void 0, import.meta.url),
  "./components/Navigation.stories.tsx": () => __vitePreload(() => import("./Navigation.stories-DzPpUJo_.js"), true ? __vite__mapDeps([12,1,13,7,8,9]) : void 0, import.meta.url)
};
async function importFn(path) {
  return await importers[path]();
}
Ff();
const { composeConfigs, PreviewWeb } = __STORYBOOK_MODULE_PREVIEW_API__;
const getProjectAnnotations = async (hmrPreviewAnnotationModules = []) => {
  const preview = await __vitePreload(() => import("./preview-D7sfXr67.js"), true ? __vite__mapDeps([14,4,2,1,3,6,7,8,9,11,13,15]) : void 0, import.meta.url);
  if (W(preview.default)) {
    return preview.default.composed;
  }
  const configs = await Promise.all([
    hmrPreviewAnnotationModules[0] ?? __vitePreload(() => import("./entry-preview-Bad8ztxj.js"), true ? __vite__mapDeps([16,17,8]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[1] ?? __vitePreload(() => import("./entry-preview-docs-SvAANoI5.js"), true ? __vite__mapDeps([18,17,19,8]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[2] ?? __vitePreload(() => import("./preview-Gh7_2Y77.js"), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[3] ?? __vitePreload(() => import("./preview-CsKYd6En.js"), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[4] ?? __vitePreload(() => import("./preview-7WCR7baq.js"), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[5] ?? __vitePreload(() => import("./preview-wekBJc4A.js"), true ? __vite__mapDeps([20,21]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[6] ?? __vitePreload(() => import("./preview-ClXAjPvx.js"), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[7] ?? __vitePreload(() => import("./preview-DzlOvQYX.js"), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[8] ?? __vitePreload(() => import("./preview-CtNj_3Tt.js"), true ? __vite__mapDeps([22,21]) : void 0, import.meta.url),
    hmrPreviewAnnotationModules[9] ?? __vitePreload(() => import("./preview-D-kgaXrl.js"), true ? [] : void 0, import.meta.url),
    hmrPreviewAnnotationModules[10] ?? __vitePreload(() => import("./preview-VMy2o69I.js"), true ? __vite__mapDeps([23,24]) : void 0, import.meta.url)
  ]);
  return composeConfigs([...configs, preview]);
};
window.__STORYBOOK_PREVIEW__ = window.__STORYBOOK_PREVIEW__ || new PreviewWeb(importFn, getProjectAnnotations);
window.__STORYBOOK_STORY_STORE__ = window.__STORYBOOK_STORY_STORE__ || window.__STORYBOOK_PREVIEW__.storyStore;
export {
  D,
  __vitePreload as _,
  z
};
