import fr, { useState as P, useEffect as Z } from "react";
import { createRoot as dr } from "react-dom/client";
var je = { exports: {} }, M = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function() {
  var g = fr, R = Symbol.for("react.element"), m = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), j = Symbol.for("react.provider"), v = Symbol.for("react.context"), S = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), W = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), we = Symbol.for("react.offscreen"), Q = Symbol.iterator, Ce = "@@iterator";
  function Pe(e) {
    if (e === null || typeof e != "object")
      return null;
    var r = Q && e[Q] || e[Ce];
    return typeof r == "function" ? r : null;
  }
  var O = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function h(e) {
    {
      for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
        t[n - 1] = arguments[n];
      Oe("error", e, t);
    }
  }
  function Oe(e, r, t) {
    {
      var n = O.ReactDebugCurrentFrame, i = n.getStackAddendum();
      i !== "" && (r += "%s", t = t.concat([i]));
      var s = t.map(function(o) {
        return String(o);
      });
      s.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, s);
    }
  }
  var ke = !1, Ae = !1, De = !1, Fe = !1, $e = !1, ee;
  ee = Symbol.for("react.module.reference");
  function We(e) {
    return !!(typeof e == "string" || typeof e == "function" || e === b || e === T || $e || e === d || e === p || e === V || Fe || e === we || ke || Ae || De || typeof e == "object" && e !== null && (e.$$typeof === z || e.$$typeof === W || e.$$typeof === j || e.$$typeof === v || e.$$typeof === S || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    e.$$typeof === ee || e.getModuleId !== void 0));
  }
  function Ie(e, r, t) {
    var n = e.displayName;
    if (n)
      return n;
    var i = r.displayName || r.name || "";
    return i !== "" ? t + "(" + i + ")" : t;
  }
  function re(e) {
    return e.displayName || "Context";
  }
  function x(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case b:
        return "Fragment";
      case m:
        return "Portal";
      case T:
        return "Profiler";
      case d:
        return "StrictMode";
      case p:
        return "Suspense";
      case V:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case v:
          var r = e;
          return re(r) + ".Consumer";
        case j:
          var t = e;
          return re(t._context) + ".Provider";
        case S:
          return Ie(e, e.render, "ForwardRef");
        case W:
          var n = e.displayName || null;
          return n !== null ? n : x(e.type) || "Memo";
        case z: {
          var i = e, s = i._payload, o = i._init;
          try {
            return x(o(s));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var w = Object.assign, D = 0, te, ne, ae, oe, ie, se, le;
  function ue() {
  }
  ue.__reactDisabledLog = !0;
  function Le() {
    {
      if (D === 0) {
        te = console.log, ne = console.info, ae = console.warn, oe = console.error, ie = console.group, se = console.groupCollapsed, le = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: ue,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      D++;
    }
  }
  function Ye() {
    {
      if (D--, D === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: w({}, e, {
            value: te
          }),
          info: w({}, e, {
            value: ne
          }),
          warn: w({}, e, {
            value: ae
          }),
          error: w({}, e, {
            value: oe
          }),
          group: w({}, e, {
            value: ie
          }),
          groupCollapsed: w({}, e, {
            value: se
          }),
          groupEnd: w({}, e, {
            value: le
          })
        });
      }
      D < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var U = O.ReactCurrentDispatcher, H;
  function I(e, r, t) {
    {
      if (H === void 0)
        try {
          throw Error();
        } catch (i) {
          var n = i.stack.trim().match(/\n( *(at )?)/);
          H = n && n[1] || "";
        }
      return `
` + H + e;
    }
  }
  var N = !1, L;
  {
    var Be = typeof WeakMap == "function" ? WeakMap : Map;
    L = new Be();
  }
  function ce(e, r) {
    if (!e || N)
      return "";
    {
      var t = L.get(e);
      if (t !== void 0)
        return t;
    }
    var n;
    N = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var s;
    s = U.current, U.current = null, Le();
    try {
      if (r) {
        var o = function() {
          throw Error();
        };
        if (Object.defineProperty(o.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(o, []);
          } catch (E) {
            n = E;
          }
          Reflect.construct(e, [], o);
        } else {
          try {
            o.call();
          } catch (E) {
            n = E;
          }
          e.call(o.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (E) {
          n = E;
        }
        e();
      }
    } catch (E) {
      if (E && n && typeof E.stack == "string") {
        for (var a = E.stack.split(`
`), y = n.stack.split(`
`), u = a.length - 1, c = y.length - 1; u >= 1 && c >= 0 && a[u] !== y[c]; )
          c--;
        for (; u >= 1 && c >= 0; u--, c--)
          if (a[u] !== y[c]) {
            if (u !== 1 || c !== 1)
              do
                if (u--, c--, c < 0 || a[u] !== y[c]) {
                  var _ = `
` + a[u].replace(" at new ", " at ");
                  return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), typeof e == "function" && L.set(e, _), _;
                }
              while (u >= 1 && c >= 0);
            break;
          }
      }
    } finally {
      N = !1, U.current = s, Ye(), Error.prepareStackTrace = i;
    }
    var A = e ? e.displayName || e.name : "", C = A ? I(A) : "";
    return typeof e == "function" && L.set(e, C), C;
  }
  function Me(e, r, t) {
    return ce(e, !1);
  }
  function Ve(e) {
    var r = e.prototype;
    return !!(r && r.isReactComponent);
  }
  function Y(e, r, t) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return ce(e, Ve(e));
    if (typeof e == "string")
      return I(e);
    switch (e) {
      case p:
        return I("Suspense");
      case V:
        return I("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return Me(e.render);
        case W:
          return Y(e.type, r, t);
        case z: {
          var n = e, i = n._payload, s = n._init;
          try {
            return Y(s(i), r, t);
          } catch {
          }
        }
      }
    return "";
  }
  var F = Object.prototype.hasOwnProperty, fe = {}, de = O.ReactDebugCurrentFrame;
  function B(e) {
    if (e) {
      var r = e._owner, t = Y(e.type, e._source, r ? r.type : null);
      de.setExtraStackFrame(t);
    } else
      de.setExtraStackFrame(null);
  }
  function ze(e, r, t, n, i) {
    {
      var s = Function.call.bind(F);
      for (var o in e)
        if (s(e, o)) {
          var a = void 0;
          try {
            if (typeof e[o] != "function") {
              var y = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw y.name = "Invariant Violation", y;
            }
            a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (u) {
            a = u;
          }
          a && !(a instanceof Error) && (B(i), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), B(null)), a instanceof Error && !(a.message in fe) && (fe[a.message] = !0, B(i), h("Failed %s type: %s", t, a.message), B(null));
        }
    }
  }
  var Ue = Array.isArray;
  function K(e) {
    return Ue(e);
  }
  function He(e) {
    {
      var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return t;
    }
  }
  function Ne(e) {
    try {
      return ve(e), !1;
    } catch {
      return !0;
    }
  }
  function ve(e) {
    return "" + e;
  }
  function pe(e) {
    if (Ne(e))
      return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", He(e)), ve(e);
  }
  var ge = O.ReactCurrentOwner, Ke = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, he, ye;
  function Ge(e) {
    if (F.call(e, "ref")) {
      var r = Object.getOwnPropertyDescriptor(e, "ref").get;
      if (r && r.isReactWarning)
        return !1;
    }
    return e.ref !== void 0;
  }
  function Xe(e) {
    if (F.call(e, "key")) {
      var r = Object.getOwnPropertyDescriptor(e, "key").get;
      if (r && r.isReactWarning)
        return !1;
    }
    return e.key !== void 0;
  }
  function Je(e, r) {
    typeof e.ref == "string" && ge.current;
  }
  function qe(e, r) {
    {
      var t = function() {
        he || (he = !0, h("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
      };
      t.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: t,
        configurable: !0
      });
    }
  }
  function Ze(e, r) {
    {
      var t = function() {
        ye || (ye = !0, h("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
      };
      t.isReactWarning = !0, Object.defineProperty(e, "ref", {
        get: t,
        configurable: !0
      });
    }
  }
  var Qe = function(e, r, t, n, i, s, o) {
    var a = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: R,
      // Built-in properties that belong on the element
      type: e,
      key: r,
      ref: t,
      props: o,
      // Record the component responsible for creating this element.
      _owner: s
    };
    return a._store = {}, Object.defineProperty(a._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(a, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: n
    }), Object.defineProperty(a, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: i
    }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
  };
  function er(e, r, t, n, i) {
    {
      var s, o = {}, a = null, y = null;
      t !== void 0 && (pe(t), a = "" + t), Xe(r) && (pe(r.key), a = "" + r.key), Ge(r) && (y = r.ref, Je(r, i));
      for (s in r)
        F.call(r, s) && !Ke.hasOwnProperty(s) && (o[s] = r[s]);
      if (e && e.defaultProps) {
        var u = e.defaultProps;
        for (s in u)
          o[s] === void 0 && (o[s] = u[s]);
      }
      if (a || y) {
        var c = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
        a && qe(o, c), y && Ze(o, c);
      }
      return Qe(e, a, y, i, n, ge.current, o);
    }
  }
  var G = O.ReactCurrentOwner, me = O.ReactDebugCurrentFrame;
  function k(e) {
    if (e) {
      var r = e._owner, t = Y(e.type, e._source, r ? r.type : null);
      me.setExtraStackFrame(t);
    } else
      me.setExtraStackFrame(null);
  }
  var X;
  X = !1;
  function J(e) {
    return typeof e == "object" && e !== null && e.$$typeof === R;
  }
  function be() {
    {
      if (G.current) {
        var e = x(G.current.type);
        if (e)
          return `

Check the render method of \`` + e + "`.";
      }
      return "";
    }
  }
  function rr(e) {
    return "";
  }
  var Ee = {};
  function tr(e) {
    {
      var r = be();
      if (!r) {
        var t = typeof e == "string" ? e : e.displayName || e.name;
        t && (r = `

Check the top-level render call using <` + t + ">.");
      }
      return r;
    }
  }
  function Re(e, r) {
    {
      if (!e._store || e._store.validated || e.key != null)
        return;
      e._store.validated = !0;
      var t = tr(r);
      if (Ee[t])
        return;
      Ee[t] = !0;
      var n = "";
      e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + x(e._owner.type) + "."), k(e), h('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), k(null);
    }
  }
  function Te(e, r) {
    {
      if (typeof e != "object")
        return;
      if (K(e))
        for (var t = 0; t < e.length; t++) {
          var n = e[t];
          J(n) && Re(n, r);
        }
      else if (J(e))
        e._store && (e._store.validated = !0);
      else if (e) {
        var i = Pe(e);
        if (typeof i == "function" && i !== e.entries)
          for (var s = i.call(e), o; !(o = s.next()).done; )
            J(o.value) && Re(o.value, r);
      }
    }
  }
  function nr(e) {
    {
      var r = e.type;
      if (r == null || typeof r == "string")
        return;
      var t;
      if (typeof r == "function")
        t = r.propTypes;
      else if (typeof r == "object" && (r.$$typeof === S || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      r.$$typeof === W))
        t = r.propTypes;
      else
        return;
      if (t) {
        var n = x(r);
        ze(t, e.props, "prop", n, e);
      } else if (r.PropTypes !== void 0 && !X) {
        X = !0;
        var i = x(r);
        h("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
      }
      typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && h("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ar(e) {
    {
      for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
        var n = r[t];
        if (n !== "children" && n !== "key") {
          k(e), h("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), k(null);
          break;
        }
      }
      e.ref !== null && (k(e), h("Invalid attribute `ref` supplied to `React.Fragment`."), k(null));
    }
  }
  var _e = {};
  function xe(e, r, t, n, i, s) {
    {
      var o = We(e);
      if (!o) {
        var a = "";
        (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var y = rr();
        y ? a += y : a += be();
        var u;
        e === null ? u = "null" : K(e) ? u = "array" : e !== void 0 && e.$$typeof === R ? (u = "<" + (x(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : u = typeof e, h("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", u, a);
      }
      var c = er(e, r, t, i, s);
      if (c == null)
        return c;
      if (o) {
        var _ = r.children;
        if (_ !== void 0)
          if (n)
            if (K(_)) {
              for (var A = 0; A < _.length; A++)
                Te(_[A], e);
              Object.freeze && Object.freeze(_);
            } else
              h("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            Te(_, e);
      }
      if (F.call(r, "key")) {
        var C = x(e), E = Object.keys(r).filter(function(cr) {
          return cr !== "key";
        }), q = E.length > 0 ? "{key: someKey, " + E.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!_e[C + q]) {
          var ur = E.length > 0 ? "{" + E.join(": ..., ") + ": ...}" : "{}";
          h(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, q, C, ur, C), _e[C + q] = !0;
        }
      }
      return e === b ? ar(c) : nr(c), c;
    }
  }
  function or(e, r, t) {
    return xe(e, r, t, !0);
  }
  function ir(e, r, t) {
    return xe(e, r, t, !1);
  }
  var sr = ir, lr = or;
  M.Fragment = b, M.jsx = sr, M.jsxs = lr;
})();
je.exports = M;
var l = je.exports;
const Se = "http://localhost:8080";
function vr() {
  const [g, R] = P(window.location.pathname);
  Z(() => {
    const d = () => R(window.location.pathname);
    return window.addEventListener("popstate", d), () => window.removeEventListener("popstate", d);
  }, []);
  const m = (d, T) => {
    d.preventDefault(), window.history.pushState(null, "", T), R(T);
  }, b = g.replace(/^\/articles\/?/, "");
  return b ? /* @__PURE__ */ l.jsx(hr, { slug: b, onNavigate: m }) : /* @__PURE__ */ l.jsx(pr, { onNavigate: m });
}
function pr({ onNavigate: g }) {
  const [R, m] = P([]), [b, d] = P(!0), [T, j] = P(null);
  return Z(() => {
    fetch(`${Se}/api/content/articles`).then((v) => {
      if (!v.ok) throw new Error(`HTTP ${v.status}`);
      return v.json();
    }).then((v) => {
      m(v), d(!1);
    }).catch((v) => {
      j(v.message), d(!1);
    });
  }, []), b ? /* @__PURE__ */ l.jsx("div", { style: f.state, children: "Loading articles..." }) : T ? /* @__PURE__ */ l.jsxs("div", { style: f.state, children: [
    "Error: ",
    T
  ] }) : /* @__PURE__ */ l.jsxs("div", { style: f.container, children: [
    /* @__PURE__ */ l.jsx("h1", { style: f.heading, children: "Articles" }),
    /* @__PURE__ */ l.jsx("div", { style: f.grid, children: R.map((v) => /* @__PURE__ */ l.jsx(gr, { article: v, onNavigate: g }, v.slug)) })
  ] });
}
function gr({ article: g, onNavigate: R }) {
  var b;
  const m = `/articles/${g.slug}`;
  return /* @__PURE__ */ l.jsxs("a", { href: m, style: f.card, onClick: (d) => R(d, m), children: [
    /* @__PURE__ */ l.jsx("div", { style: f.cardTags, children: (b = g.tags) == null ? void 0 : b.map((d) => /* @__PURE__ */ l.jsx("span", { style: f.tag, children: d }, d)) }),
    /* @__PURE__ */ l.jsx("h2", { style: f.cardTitle, children: g.title }),
    /* @__PURE__ */ l.jsx("p", { style: f.cardSummary, children: g.summary }),
    /* @__PURE__ */ l.jsx("span", { style: f.cardCta, children: "Read article →" })
  ] });
}
function hr({ slug: g, onNavigate: R }) {
  var S;
  const [m, b] = P(null), [d, T] = P(!0), [j, v] = P(null);
  return Z(() => {
    T(!0), v(null), fetch(`${Se}/api/content/articles/${g}`).then((p) => {
      if (!p.ok) throw new Error(`HTTP ${p.status}`);
      return p.json();
    }).then((p) => {
      b(p), T(!1);
    }).catch((p) => {
      v(p.message), T(!1);
    });
  }, [g]), d ? /* @__PURE__ */ l.jsx("div", { style: f.state, children: "Loading article..." }) : j ? /* @__PURE__ */ l.jsxs("div", { style: f.state, children: [
    "Error: ",
    j
  ] }) : /* @__PURE__ */ l.jsxs("div", { style: f.container, children: [
    /* @__PURE__ */ l.jsx("a", { href: "/articles", style: f.back, onClick: (p) => R(p, "/articles"), children: "← Back to articles" }),
    /* @__PURE__ */ l.jsx("div", { style: f.cardTags, children: (S = m.tags) == null ? void 0 : S.map((p) => /* @__PURE__ */ l.jsx("span", { style: f.tag, children: p }, p)) }),
    /* @__PURE__ */ l.jsx("h1", { style: f.detailTitle, children: m.title }),
    /* @__PURE__ */ l.jsx("p", { style: f.detailMeta, children: m.date }),
    /* @__PURE__ */ l.jsx("div", { style: f.detailBody, dangerouslySetInnerHTML: { __html: m.htmlBody } })
  ] });
}
const f = {
  container: { maxWidth: 900, margin: "0 auto", padding: "40px 24px" },
  heading: { fontSize: 28, fontWeight: 700, marginBottom: 32, color: "#e2e8f0" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
  card: { display: "block", background: "#1e2130", borderRadius: 10, padding: 24, textDecoration: "none", border: "1px solid #2d3148" },
  cardTags: { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" },
  tag: { fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "#6366f122", color: "#818cf8", border: "1px solid #6366f144" },
  cardTitle: { fontSize: 16, fontWeight: 600, color: "#e2e8f0", marginBottom: 10, lineHeight: 1.4 },
  cardSummary: { fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 16 },
  cardCta: { fontSize: 13, color: "#6366f1", fontWeight: 500 },
  state: { padding: 40, textAlign: "center", color: "#94a3b8" },
  back: { display: "inline-block", marginBottom: 24, color: "#6366f1", textDecoration: "none", fontSize: 14 },
  detailTitle: { fontSize: 32, fontWeight: 700, color: "#e2e8f0", marginBottom: 8, lineHeight: 1.3 },
  detailMeta: { fontSize: 13, color: "#94a3b8", marginBottom: 32 },
  detailBody: { color: "#cbd5e1", fontSize: 16, lineHeight: 1.8 }
};
let $ = null;
function br() {
  return Promise.resolve();
}
function Er() {
  const g = document.getElementById("rc-articles");
  return $ = dr(g), $.render(/* @__PURE__ */ l.jsx(vr, {})), Promise.resolve();
}
function Rr() {
  return $ && ($.unmount(), $ = null), Promise.resolve();
}
export {
  br as bootstrap,
  Er as mount,
  Rr as unmount
};
