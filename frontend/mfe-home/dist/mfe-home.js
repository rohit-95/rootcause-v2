import B, { useState as I, useRef as us, useEffect as hs } from "react";
import { createRoot as ms } from "react-dom/client";
var Ce = { exports: {} }, G = {};
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
  var i = B, d = Symbol.for("react.element"), p = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), _ = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), y = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), Pe = Symbol.for("react.offscreen"), Z = Symbol.iterator, Te = "@@iterator";
  function Re(s) {
    if (s === null || typeof s != "object")
      return null;
    var r = Z && s[Z] || s[Te];
    return typeof r == "function" ? r : null;
  }
  var R = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function f(s) {
    {
      for (var r = arguments.length, a = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
        a[n - 1] = arguments[n];
      Ee("error", s, a);
    }
  }
  function Ee(s, r, a) {
    {
      var n = R.ReactDebugCurrentFrame, l = n.getStackAddendum();
      l !== "" && (r += "%s", a = a.concat([l]));
      var c = a.map(function(o) {
        return String(o);
      });
      c.unshift("Warning: " + r), Function.prototype.apply.call(console[s], console, c);
    }
  }
  var De = !1, Ae = !1, Oe = !1, Ie = !1, Fe = !1, ee;
  ee = Symbol.for("react.module.reference");
  function _e(s) {
    return !!(typeof s == "string" || typeof s == "function" || s === u || s === k || Fe || s === j || s === g || s === T || Ie || s === Pe || De || Ae || Oe || typeof s == "object" && s !== null && (s.$$typeof === Y || s.$$typeof === y || s.$$typeof === P || s.$$typeof === _ || s.$$typeof === N || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    s.$$typeof === ee || s.getModuleId !== void 0));
  }
  function Le(s, r, a) {
    var n = s.displayName;
    if (n)
      return n;
    var l = r.displayName || r.name || "";
    return l !== "" ? a + "(" + l + ")" : a;
  }
  function se(s) {
    return s.displayName || "Context";
  }
  function w(s) {
    if (s == null)
      return null;
    if (typeof s.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
      return s.displayName || s.name || null;
    if (typeof s == "string")
      return s;
    switch (s) {
      case u:
        return "Fragment";
      case p:
        return "Portal";
      case k:
        return "Profiler";
      case j:
        return "StrictMode";
      case g:
        return "Suspense";
      case T:
        return "SuspenseList";
    }
    if (typeof s == "object")
      switch (s.$$typeof) {
        case _:
          var r = s;
          return se(r) + ".Consumer";
        case P:
          var a = s;
          return se(a._context) + ".Provider";
        case N:
          return Le(s, s.render, "ForwardRef");
        case y:
          var n = s.displayName || null;
          return n !== null ? n : w(s.type) || "Memo";
        case Y: {
          var l = s, c = l._payload, o = l._init;
          try {
            return w(o(c));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var S = Object.assign, A = 0, re, ae, ie, ne, te, oe, le;
  function ce() {
  }
  ce.__reactDisabledLog = !0;
  function Me() {
    {
      if (A === 0) {
        re = console.log, ae = console.info, ie = console.warn, ne = console.error, te = console.group, oe = console.groupCollapsed, le = console.groupEnd;
        var s = {
          configurable: !0,
          enumerable: !0,
          value: ce,
          writable: !0
        };
        Object.defineProperties(console, {
          info: s,
          log: s,
          warn: s,
          error: s,
          group: s,
          groupCollapsed: s,
          groupEnd: s
        });
      }
      A++;
    }
  }
  function We() {
    {
      if (A--, A === 0) {
        var s = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: S({}, s, {
            value: re
          }),
          info: S({}, s, {
            value: ae
          }),
          warn: S({}, s, {
            value: ie
          }),
          error: S({}, s, {
            value: ne
          }),
          group: S({}, s, {
            value: te
          }),
          groupCollapsed: S({}, s, {
            value: oe
          }),
          groupEnd: S({}, s, {
            value: le
          })
        });
      }
      A < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var H = R.ReactCurrentDispatcher, $;
  function L(s, r, a) {
    {
      if ($ === void 0)
        try {
          throw Error();
        } catch (l) {
          var n = l.stack.trim().match(/\n( *(at )?)/);
          $ = n && n[1] || "";
        }
      return `
` + $ + s;
    }
  }
  var K = !1, M;
  {
    var qe = typeof WeakMap == "function" ? WeakMap : Map;
    M = new qe();
  }
  function de(s, r) {
    if (!s || K)
      return "";
    {
      var a = M.get(s);
      if (a !== void 0)
        return a;
    }
    var n;
    K = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var c;
    c = H.current, H.current = null, Me();
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
          } catch (b) {
            n = b;
          }
          Reflect.construct(s, [], o);
        } else {
          try {
            o.call();
          } catch (b) {
            n = b;
          }
          s.call(o.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (b) {
          n = b;
        }
        s();
      }
    } catch (b) {
      if (b && n && typeof b.stack == "string") {
        for (var t = b.stack.split(`
`), v = n.stack.split(`
`), h = t.length - 1, m = v.length - 1; h >= 1 && m >= 0 && t[h] !== v[m]; )
          m--;
        for (; h >= 1 && m >= 0; h--, m--)
          if (t[h] !== v[m]) {
            if (h !== 1 || m !== 1)
              do
                if (h--, m--, m < 0 || t[h] !== v[m]) {
                  var x = `
` + t[h].replace(" at new ", " at ");
                  return s.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", s.displayName)), typeof s == "function" && M.set(s, x), x;
                }
              while (h >= 1 && m >= 0);
            break;
          }
      }
    } finally {
      K = !1, H.current = c, We(), Error.prepareStackTrace = l;
    }
    var D = s ? s.displayName || s.name : "", C = D ? L(D) : "";
    return typeof s == "function" && M.set(s, C), C;
  }
  function Be(s, r, a) {
    return de(s, !1);
  }
  function Ge(s) {
    var r = s.prototype;
    return !!(r && r.isReactComponent);
  }
  function W(s, r, a) {
    if (s == null)
      return "";
    if (typeof s == "function")
      return de(s, Ge(s));
    if (typeof s == "string")
      return L(s);
    switch (s) {
      case g:
        return L("Suspense");
      case T:
        return L("SuspenseList");
    }
    if (typeof s == "object")
      switch (s.$$typeof) {
        case N:
          return Be(s.render);
        case y:
          return W(s.type, r, a);
        case Y: {
          var n = s, l = n._payload, c = n._init;
          try {
            return W(c(l), r, a);
          } catch {
          }
        }
      }
    return "";
  }
  var O = Object.prototype.hasOwnProperty, ue = {}, he = R.ReactDebugCurrentFrame;
  function q(s) {
    if (s) {
      var r = s._owner, a = W(s.type, s._source, r ? r.type : null);
      he.setExtraStackFrame(a);
    } else
      he.setExtraStackFrame(null);
  }
  function Ye(s, r, a, n, l) {
    {
      var c = Function.call.bind(O);
      for (var o in s)
        if (c(s, o)) {
          var t = void 0;
          try {
            if (typeof s[o] != "function") {
              var v = Error((n || "React class") + ": " + a + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw v.name = "Invariant Violation", v;
            }
            t = s[o](r, o, n, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (h) {
            t = h;
          }
          t && !(t instanceof Error) && (q(l), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", a, o, typeof t), q(null)), t instanceof Error && !(t.message in ue) && (ue[t.message] = !0, q(l), f("Failed %s type: %s", a, t.message), q(null));
        }
    }
  }
  var He = Array.isArray;
  function V(s) {
    return He(s);
  }
  function $e(s) {
    {
      var r = typeof Symbol == "function" && Symbol.toStringTag, a = r && s[Symbol.toStringTag] || s.constructor.name || "Object";
      return a;
    }
  }
  function Ke(s) {
    try {
      return me(s), !1;
    } catch {
      return !0;
    }
  }
  function me(s) {
    return "" + s;
  }
  function pe(s) {
    if (Ke(s))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", $e(s)), me(s);
  }
  var fe = R.ReactCurrentOwner, Ve = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ve, ge;
  function Ue(s) {
    if (O.call(s, "ref")) {
      var r = Object.getOwnPropertyDescriptor(s, "ref").get;
      if (r && r.isReactWarning)
        return !1;
    }
    return s.ref !== void 0;
  }
  function Qe(s) {
    if (O.call(s, "key")) {
      var r = Object.getOwnPropertyDescriptor(s, "key").get;
      if (r && r.isReactWarning)
        return !1;
    }
    return s.key !== void 0;
  }
  function ze(s, r) {
    typeof s.ref == "string" && fe.current;
  }
  function Je(s, r) {
    {
      var a = function() {
        ve || (ve = !0, f("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
      };
      a.isReactWarning = !0, Object.defineProperty(s, "key", {
        get: a,
        configurable: !0
      });
    }
  }
  function Xe(s, r) {
    {
      var a = function() {
        ge || (ge = !0, f("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
      };
      a.isReactWarning = !0, Object.defineProperty(s, "ref", {
        get: a,
        configurable: !0
      });
    }
  }
  var Ze = function(s, r, a, n, l, c, o) {
    var t = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: d,
      // Built-in properties that belong on the element
      type: s,
      key: r,
      ref: a,
      props: o,
      // Record the component responsible for creating this element.
      _owner: c
    };
    return t._store = {}, Object.defineProperty(t._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(t, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: n
    }), Object.defineProperty(t, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: l
    }), Object.freeze && (Object.freeze(t.props), Object.freeze(t)), t;
  };
  function es(s, r, a, n, l) {
    {
      var c, o = {}, t = null, v = null;
      a !== void 0 && (pe(a), t = "" + a), Qe(r) && (pe(r.key), t = "" + r.key), Ue(r) && (v = r.ref, ze(r, l));
      for (c in r)
        O.call(r, c) && !Ve.hasOwnProperty(c) && (o[c] = r[c]);
      if (s && s.defaultProps) {
        var h = s.defaultProps;
        for (c in h)
          o[c] === void 0 && (o[c] = h[c]);
      }
      if (t || v) {
        var m = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
        t && Je(o, m), v && Xe(o, m);
      }
      return Ze(s, t, v, l, n, fe.current, o);
    }
  }
  var U = R.ReactCurrentOwner, be = R.ReactDebugCurrentFrame;
  function E(s) {
    if (s) {
      var r = s._owner, a = W(s.type, s._source, r ? r.type : null);
      be.setExtraStackFrame(a);
    } else
      be.setExtraStackFrame(null);
  }
  var Q;
  Q = !1;
  function z(s) {
    return typeof s == "object" && s !== null && s.$$typeof === d;
  }
  function xe() {
    {
      if (U.current) {
        var s = w(U.current.type);
        if (s)
          return `

Check the render method of \`` + s + "`.";
      }
      return "";
    }
  }
  function ss(s) {
    return "";
  }
  var ye = {};
  function rs(s) {
    {
      var r = xe();
      if (!r) {
        var a = typeof s == "string" ? s : s.displayName || s.name;
        a && (r = `

Check the top-level render call using <` + a + ">.");
      }
      return r;
    }
  }
  function je(s, r) {
    {
      if (!s._store || s._store.validated || s.key != null)
        return;
      s._store.validated = !0;
      var a = rs(r);
      if (ye[a])
        return;
      ye[a] = !0;
      var n = "";
      s && s._owner && s._owner !== U.current && (n = " It was passed a child from " + w(s._owner.type) + "."), E(s), f('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', a, n), E(null);
    }
  }
  function we(s, r) {
    {
      if (typeof s != "object")
        return;
      if (V(s))
        for (var a = 0; a < s.length; a++) {
          var n = s[a];
          z(n) && je(n, r);
        }
      else if (z(s))
        s._store && (s._store.validated = !0);
      else if (s) {
        var l = Re(s);
        if (typeof l == "function" && l !== s.entries)
          for (var c = l.call(s), o; !(o = c.next()).done; )
            z(o.value) && je(o.value, r);
      }
    }
  }
  function as(s) {
    {
      var r = s.type;
      if (r == null || typeof r == "string")
        return;
      var a;
      if (typeof r == "function")
        a = r.propTypes;
      else if (typeof r == "object" && (r.$$typeof === N || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      r.$$typeof === y))
        a = r.propTypes;
      else
        return;
      if (a) {
        var n = w(r);
        Ye(a, s.props, "prop", n, s);
      } else if (r.PropTypes !== void 0 && !Q) {
        Q = !0;
        var l = w(r);
        f("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", l || "Unknown");
      }
      typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && f("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function is(s) {
    {
      for (var r = Object.keys(s.props), a = 0; a < r.length; a++) {
        var n = r[a];
        if (n !== "children" && n !== "key") {
          E(s), f("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), E(null);
          break;
        }
      }
      s.ref !== null && (E(s), f("Invalid attribute `ref` supplied to `React.Fragment`."), E(null));
    }
  }
  var ke = {};
  function Ne(s, r, a, n, l, c) {
    {
      var o = _e(s);
      if (!o) {
        var t = "";
        (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (t += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var v = ss();
        v ? t += v : t += xe();
        var h;
        s === null ? h = "null" : V(s) ? h = "array" : s !== void 0 && s.$$typeof === d ? (h = "<" + (w(s.type) || "Unknown") + " />", t = " Did you accidentally export a JSX literal instead of a component?") : h = typeof s, f("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", h, t);
      }
      var m = es(s, r, a, l, c);
      if (m == null)
        return m;
      if (o) {
        var x = r.children;
        if (x !== void 0)
          if (n)
            if (V(x)) {
              for (var D = 0; D < x.length; D++)
                we(x[D], s);
              Object.freeze && Object.freeze(x);
            } else
              f("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            we(x, s);
      }
      if (O.call(r, "key")) {
        var C = w(s), b = Object.keys(r).filter(function(ds) {
          return ds !== "key";
        }), J = b.length > 0 ? "{key: someKey, " + b.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!ke[C + J]) {
          var cs = b.length > 0 ? "{" + b.join(": ..., ") + ": ...}" : "{}";
          f(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, J, C, cs, C), ke[C + J] = !0;
        }
      }
      return s === u ? is(m) : as(m), m;
    }
  }
  function ns(s, r, a) {
    return Ne(s, r, a, !0);
  }
  function ts(s, r, a) {
    return Ne(s, r, a, !1);
  }
  var os = ts, ls = ns;
  G.Fragment = u, G.jsx = os, G.jsxs = ls;
})();
Ce.exports = G;
var e = Ce.exports;
const ps = [
  { slug: "linux", name: "Linux", icon: "LNX", category: "Foundation", tagline: "Shell, permissions, processes, and sysadmin fundamentals.", color: "#E8A838", available: !0 },
  { slug: "docker", name: "Docker", icon: "DCK", category: "Containers", tagline: "Containers, images, networking, and production patterns.", color: "#2496ED", available: !1 },
  { slug: "kubernetes", name: "Kubernetes", icon: "K8S", category: "Orchestration", tagline: "Pods, deployments, services, and cluster operations.", color: "#326CE5", available: !1 },
  { slug: "aws", name: "AWS", icon: "AWS", category: "Cloud", tagline: "EC2, S3, IAM, VPC, and core cloud services explained.", color: "#FF9900", available: !1 },
  { slug: "cicd", name: "CI/CD", icon: "CCD", category: "Automation", tagline: "GitHub Actions, Jenkins, pipelines, and release automation.", color: "#2ECC71", available: !1 },
  { slug: "monitoring", name: "Monitoring", icon: "MON", category: "Observability", tagline: "Prometheus, Grafana, alerting, and production observability.", color: "#E6522C", available: !1 },
  { slug: "devsecops", name: "DevSecOps", icon: "SEC", category: "Security", tagline: "Shift left security, SAST/DAST, secrets management, and compliance.", color: "#9B59B6", available: !1 },
  { slug: "git", name: "Git", icon: "GIT", category: "Foundation", tagline: "Branching, rebasing, GitOps, and real-world team workflows.", color: "#F05032", available: !1 }
], fs = [
  { slug: "docker-container-exits-immediately", title: "Container exits immediately after start", tags: ["Docker"], summary: "Container starts but exits within seconds. docker ps shows nothing." },
  { slug: "docker-permission-denied-sock", title: "permission denied: /var/run/docker.sock", tags: ["Docker", "Linux"], summary: "Running docker commands fails with permission denied on the socket." },
  { slug: "docker-build-cache-stale", title: "Docker build using stale cache after code change", tags: ["Docker"], summary: "Image rebuilds skip your code changes and serve old content." },
  { slug: "docker-container-cannot-reach-host", title: "Container cannot reach host or other containers", tags: ["Docker"], summary: "App inside container fails to connect to localhost or sibling containers." },
  { slug: "docker-image-size-too-large", title: "Docker image is several GB — much larger than expected", tags: ["Docker"], summary: "Built image is 2-3x bigger than it needs to be." },
  { slug: "docker-env-variable-not-available", title: "Environment variable not available inside container", tags: ["Docker"], summary: "App inside container cannot read env variables you set on the host." }
], X = [
  {
    topic: "Linux",
    color: "#E8A838",
    level: "Mid Level",
    type: "Scenario Question",
    q: "Your cron job has been running fine for three weeks. Today it did not run. There are no errors in the cron log. The server looks perfectly healthy — CPU normal, memory fine, disk not full. Your manager is asking why the job failed. Walk me through exactly how you debug this.",
    blur: "Start by verifying cron is actually running: systemctl status cron. Then check the full cron log at /var/log/syslog or journalctl -u cron. A common trap: cron runs with a minimal PATH — your .bashrc is not sourced. Reproduce with env -i /bin/sh -c your-script.sh. Also check /var/mail/root — cron emails failed output there by default...",
    cta: "Read Full Answer + 61 More Linux Questions →",
    link: "/interview-prep/linux"
  },
  {
    topic: "Docker",
    color: "#2496ED",
    level: "Senior Level",
    type: "Scenario Question",
    q: "Your container keeps restarting every 30 seconds. docker ps shows status as Restarting. The application was working yesterday and nothing in the image changed. What is your debugging process?",
    blur: 'Run docker logs <container> to see the last crash output. Check the exit code with docker inspect <container> --format="{{.State.ExitCode}}". Exit code 137 means OOMKilled — the container hit its memory limit. Exit code 1 is an app crash. Check if a required env variable or mounted secret is missing. Run the container interactively with docker run -it --entrypoint sh to debug inside...',
    cta: "Read Full Answer + More Docker Questions →",
    link: "/interview-prep/docker"
  },
  {
    topic: "Kubernetes",
    color: "#326CE5",
    level: "Senior Level",
    type: "Scenario Question",
    q: "A pod is stuck in CrashLoopBackOff. The app team says the code is fine and it works locally in Docker. Kubernetes is new to this team. Walk through your full diagnosis.",
    blur: "Start with kubectl describe pod <pod> — look at Events at the bottom. Then kubectl logs <pod> --previous to see the last crash. Common causes: missing ConfigMap or Secret the pod depends on, wrong image tag, liveness probe failing too early, or resource limits set too low. Check if the container even starts: kubectl exec -it <pod> -- sh...",
    cta: "Read Full Answer + More Kubernetes Questions →",
    link: "/interview-prep/kubernetes"
  },
  {
    topic: "Nginx",
    color: "#009900",
    level: "Mid Level",
    type: "Scenario Question",
    q: "Users are hitting a 502 Bad Gateway. Nginx is running. The upstream app server is running. Nothing was deployed today. The error started 20 minutes ago. What do you check?",
    blur: 'Check /var/log/nginx/error.log — 502 usually says "connect() failed" or "upstream timed out". Verify the upstream is actually accepting connections: curl http://127.0.0.1:3000/health. Check if the app ran out of worker processes or file descriptors. Look at ulimit -n and ss -tlnp. If the upstream is a socket file, check if it was recreated with wrong permissions after a restart...',
    cta: "Read Full Answer + More Production Fixes →",
    link: "/fixes"
  },
  {
    topic: "AWS",
    color: "#FF9900",
    level: "Senior Level",
    type: "Scenario Question",
    q: "Your EC2 instance is running but you cannot SSH into it. The instance was working fine this morning. No one made changes to the security group. What is your step-by-step diagnosis?",
    blur: "Check the instance status checks in the EC2 console — a failed system status check means the underlying host has an issue, use Stop/Start (not Reboot) to migrate it. Check the security group allows port 22 from your IP. Check the NACL for the subnet. Try EC2 Instance Connect or Session Manager if SSH is blocked. Check /var/log/auth.log via the EC2 serial console. Disk full on the root volume will also prevent SSH...",
    cta: "Read Full Answer + More AWS Questions →",
    link: "/interview-prep/aws"
  },
  {
    topic: "Git",
    color: "#F05032",
    level: "Mid Level",
    type: "Scenario Question",
    q: "A developer pushed directly to main and broke the build. You need to undo their commit without losing anyone else's work that was pushed after. What is the safest approach?",
    blur: "Never use git reset --hard on a shared branch — it rewrites history and breaks everyone else. Use git revert <commit-sha> instead — it creates a new commit that undoes the changes. If multiple commits need reverting, revert them in reverse order. Then push normally. If the bad commit introduced a secret, you also need to rotate that credential immediately — revert does not erase git history...",
    cta: "Read Full Answer + More Git Questions →",
    link: "/interview-prep/git"
  }
];
function vs() {
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("section", { className: "ab-hero", children: /* @__PURE__ */ e.jsxs("div", { className: "ab-hero-inner", children: [
      /* @__PURE__ */ e.jsx("div", { className: "ab-avatar", children: "RS" }),
      /* @__PURE__ */ e.jsxs("div", { children: [
        /* @__PURE__ */ e.jsx("h1", { className: "ab-name", children: "Rohit Sutar" }),
        /* @__PURE__ */ e.jsx("p", { className: "ab-role", children: "DevOps & Platform Engineer · 7+ years" }),
        /* @__PURE__ */ e.jsxs("div", { className: "ab-links", children: [
          /* @__PURE__ */ e.jsx("a", { href: "https://instagram.com/rootcausedaily", target: "_blank", rel: "noopener noreferrer", className: "ab-link ab-link--ig", children: "📷 @rootcausedaily" }),
          /* @__PURE__ */ e.jsx("a", { href: "https://www.youtube.com/@rootcause-hq", target: "_blank", rel: "noopener noreferrer", className: "ab-link ab-link--yt", children: "▶ rootcause-hq" }),
          /* @__PURE__ */ e.jsx("a", { href: "mailto:rsutar.2408@gmail.com", className: "ab-link", children: "✉ rsutar.2408@gmail.com" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ e.jsx("section", { className: "section", children: /* @__PURE__ */ e.jsxs("div", { className: "section-inner ab-layout", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "ab-main", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "ab-block", children: [
          /* @__PURE__ */ e.jsx("div", { className: "ab-block-label", children: "Who I Am" }),
          /* @__PURE__ */ e.jsx("p", { className: "ab-lead", children: "I am Rohit Sutar — a DevOps and Platform Engineer with 7+ years of experience building, scaling, and debugging cloud-native systems in production." }),
          /* @__PURE__ */ e.jsx("p", { children: "My work spans the full DevOps stack: writing Dockerfiles, managing Kubernetes clusters, setting up CI/CD pipelines, configuring Nginx, debugging live incidents at odd hours, and building observability from scratch. Most of the fixes in the Production Fixes section are things I have personally dealt with on real systems." }),
          /* @__PURE__ */ e.jsx("p", { children: "Outside of work I share DevOps content on Instagram and YouTube — short tips, scenario breakdowns, and production war stories that do not fit in a tweet." })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "ab-block", children: [
          /* @__PURE__ */ e.jsx("div", { className: "ab-block-label", children: "Why I Built Root Cause Daily" }),
          /* @__PURE__ */ e.jsx("p", { children: "I have been on both sides of the DevOps interview table — as a candidate and as someone interviewing engineers. The same pattern kept repeating: people who memorized documentation would freeze the moment you asked a real scenario. People who had operated systems in production would answer naturally, even for tools they had only touched briefly." }),
          /* @__PURE__ */ e.jsx("p", { children: "The gap is not knowledge. It is exposure. Knowing what a cron job is and knowing how to debug one that stopped running without leaving any errors are two completely different things." }),
          /* @__PURE__ */ e.jsx("p", { children: "Most interview prep on the internet teaches the first. I built Root Cause Daily to teach the second — scenario-based questions written around how production actually breaks, with model answers that show how a senior engineer thinks through a problem, not just what the answer is." }),
          /* @__PURE__ */ e.jsx("p", { children: "The Production Fixes section exists for the same reason: the best way to build that mental model is to read real incidents, understand the root cause, and see the exact steps that fixed it." })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "ab-block", children: [
          /* @__PURE__ */ e.jsx("div", { className: "ab-block-label", children: "What I Work With" }),
          /* @__PURE__ */ e.jsxs("div", { className: "ab-skills", children: [
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill ab-skill--linux", children: "Linux" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill ab-skill--docker", children: "Docker" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill ab-skill--k8s", children: "Kubernetes" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill ab-skill--aws", children: "AWS" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "Terraform" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "GitHub Actions" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "ArgoCD" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "Helm" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "Prometheus" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "Grafana" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "Nginx" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "GitOps" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "CI/CD" }),
            /* @__PURE__ */ e.jsx("span", { className: "ab-skill", children: "DevSecOps" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("aside", { className: "ab-sidebar", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "ab-card", children: [
          /* @__PURE__ */ e.jsx("div", { className: "ab-card-title", children: "Find Me Online" }),
          /* @__PURE__ */ e.jsxs("ul", { className: "ab-card-list", children: [
            /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: "https://instagram.com/rootcausedaily", target: "_blank", rel: "noopener noreferrer", children: "📷 Instagram — @rootcausedaily" }) }),
            /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: "https://www.youtube.com/@rootcause-hq", target: "_blank", rel: "noopener noreferrer", children: "▶ YouTube — rootcause-hq" }) }),
            /* @__PURE__ */ e.jsx("li", { children: /* @__PURE__ */ e.jsx("a", { href: "mailto:rsutar.2408@gmail.com", children: "✉ rsutar.2408@gmail.com" }) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "ab-card", children: [
          /* @__PURE__ */ e.jsx("div", { className: "ab-card-title", children: "What I Cover Here" }),
          /* @__PURE__ */ e.jsxs("ul", { className: "ab-card-list", children: [
            /* @__PURE__ */ e.jsx("li", { children: "📄 In-depth notes PDFs" }),
            /* @__PURE__ */ e.jsx("li", { children: "🎯 Scenario interview questions" }),
            /* @__PURE__ */ e.jsx("li", { children: "🔥 Production failure stories" }),
            /* @__PURE__ */ e.jsx("li", { children: "🔧 Real production fixes" }),
            /* @__PURE__ */ e.jsx("li", { children: "📖 Deep-dive articles" })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "ab-card", children: [
          /* @__PURE__ */ e.jsx("div", { className: "ab-card-title", children: "Topics" }),
          /* @__PURE__ */ e.jsxs("ul", { className: "ab-card-list", children: [
            /* @__PURE__ */ e.jsxs("li", { children: [
              /* @__PURE__ */ e.jsx("a", { href: "/interview-prep/linux", children: "Linux" }),
              " — Available Now"
            ] }),
            /* @__PURE__ */ e.jsxs("li", { children: [
              /* @__PURE__ */ e.jsx("a", { href: "/interview-prep/docker", children: "Docker" }),
              " — Coming Soon"
            ] }),
            /* @__PURE__ */ e.jsxs("li", { children: [
              /* @__PURE__ */ e.jsx("a", { href: "/interview-prep/kubernetes", children: "Kubernetes" }),
              " — Coming Soon"
            ] }),
            /* @__PURE__ */ e.jsxs("li", { children: [
              /* @__PURE__ */ e.jsx("a", { href: "/interview-prep/aws", children: "AWS" }),
              " — Coming Soon"
            ] }),
            /* @__PURE__ */ e.jsxs("li", { children: [
              /* @__PURE__ */ e.jsx("a", { href: "/interview-prep/cicd", children: "CI/CD" }),
              " — Coming Soon"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "ab-card ab-card--cta", children: [
          /* @__PURE__ */ e.jsx("div", { className: "ab-card-title", children: "Follow Along" }),
          /* @__PURE__ */ e.jsx("p", { children: "Short DevOps tips, production war stories, and scenario breakdowns — on Instagram and YouTube." }),
          /* @__PURE__ */ e.jsx("a", { href: "https://instagram.com/rootcausedaily", target: "_blank", rel: "noopener noreferrer", className: "btn-primary ab-cta-btn", style: { marginBottom: 10 }, children: "📷 Instagram" }),
          /* @__PURE__ */ e.jsx("a", { href: "https://www.youtube.com/@rootcause-hq", target: "_blank", rel: "noopener noreferrer", className: "btn-secondary ab-cta-btn", children: "▶ YouTube" })
        ] })
      ] })
    ] }) })
  ] });
}
const gs = [
  {
    num: "Phase 1",
    title: "Linux Fundamentals",
    duration: "2 – 4 weeks",
    tag: "live",
    why: "This is where every DevOps engineer should start. Linux is the OS every container runs on, every cloud VM runs on, every CI runner runs on.",
    cols: [
      { sections: [{ label: "Learn", items: ["Linux installation & file system structure", "Permissions (chmod, chown)", "Users and groups", "Processes (ps, top, kill)", "Package managers (apt, yum)", "Services (systemctl)", "Networking: ping, curl, netstat, ss, dig, nslookup", "SSH, Cron jobs, Logs (journalctl, /var/log)"] }] },
      { sections: [{ label: "Practice", items: ["Create users & configure SSH", "Install Nginx", "Host a website on Linux"] }], cta: { text: "Linux Questions & Notes →", href: "/interview-prep/linux" } }
    ]
  },
  {
    num: "Phase 2",
    title: "Networking Fundamentals",
    duration: "2 weeks",
    why: "Most DevOps issues are networking issues.",
    cols: [
      { sections: [{ label: "Learn", items: ["OSI Model, TCP/IP, HTTP/HTTPS", "DNS, Ports, Firewalls, NAT", "Load Balancers & Reverse Proxy", "SSL/TLS, CIDR, Subnets"] }] },
      { sections: [{ label: "Practice", items: ["Configure DNS", "Install Nginx reverse proxy", "Generate SSL certificates", "Debug network problems"] }] }
    ]
  },
  {
    num: "Phase 3",
    title: "Scripting",
    duration: "2 – 4 weeks",
    why: "Automation is the heart of DevOps.",
    cols: [
      { sections: [
        { label: "Bash", items: ["Variables, Loops, Functions, Arrays", "Conditions, Reading files"] },
        { label: "Build", items: ["Backup script", "Log cleanup script", "Health check script"] }
      ] },
      { sections: [
        { label: "Python", recommended: !0, items: ["Variables, Functions, Lists, Dictionaries", "APIs, File handling, Exception handling"] },
        { label: "Build", items: ["Server monitoring tool", "Slack notifications", "Automation scripts"] }
      ] }
    ]
  },
  {
    num: "Phase 4",
    title: "Git & GitHub",
    duration: "1 week",
    cols: [
      { sections: [{ label: "Learn", items: ["Repository, Branches, Merge, Rebase", "Pull Requests, Git Tags, Cherry-pick", "Git Hooks"] }] },
      { sections: [{ label: "Practice", items: ["Create repositories & feature branches", "Release tags & Pull Requests"] }] }
    ]
  },
  {
    num: "Phase 5",
    title: "Containers — Docker",
    duration: "2 weeks",
    tag: "soon",
    cols: [
      { sections: [{ label: "Learn", items: ["Images, Containers, Dockerfile", "Volumes, Networks, Multi-stage builds", "Docker Compose, Registry"] }] },
      { sections: [{ label: "Build", items: ["Containerize a Java, Node, and Python app", "Push images to Docker Hub, ACR, ECR"] }] }
    ]
  },
  {
    num: "Phase 6",
    title: "CI/CD",
    duration: "3 – 4 weeks",
    tag: "soon",
    why: "This is where DevOps becomes real.",
    cols: [
      { sections: [
        { label: "Learn", items: ["Build & release pipelines", "Artifacts & secrets management", "Environment promotion, pipeline templates", "Reusable workflows"] },
        { label: "Tools", items: ["GitHub Actions", "Jenkins", "Azure DevOps"] }
      ] },
      { sections: [{ label: "Build" }], pipeline: ["Code", "Build", "Test", "Security Scan", "Docker Build", "Push Image", "Deploy"] }
    ]
  },
  {
    num: "Phase 7",
    title: "Cloud Fundamentals — Azure",
    duration: "4 weeks",
    tag: "soon",
    why: "Pick one cloud first and go deep. Azure is a strong choice given its enterprise adoption and AKS maturity.",
    cols: [
      { sections: [
        { label: "Compute & Storage", items: ["Virtual Machines & Scale Sets", "Storage Accounts & Blob Storage"] },
        { label: "Networking", items: ["VNet, NSG, Load Balancer", "Application Gateway, Private Endpoints"] }
      ] },
      { sections: [
        { label: "Security", items: ["Managed Identity, Key Vault, RBAC"] },
        { label: "Containers & Monitoring", items: ["AKS, ACR", "Azure Monitor, Log Analytics, Alerts"] }
      ] }
    ]
  },
  {
    num: "Phase 8",
    title: "Infrastructure as Code — Terraform",
    duration: "3 weeks",
    tag: "soon",
    cols: [
      { sections: [{ label: "Learn", items: ["Providers, Resources, Variables, Outputs", "Modules, State, Remote Backend", "Workspaces, Data Sources"] }] },
      { sections: [{ label: "Build" }], pipeline: ["VNet", "AKS", "ACR", "Key Vault", "Database"] }
    ]
  },
  {
    num: "Phase 9",
    title: "Kubernetes",
    duration: "6 – 8 weeks",
    tag: "soon",
    major: !0,
    why: 'This is where many engineers stop being "Cloud Engineers" and become "Senior DevOps Engineers."',
    cols: [
      { sections: [
        { label: "Core Concepts", items: ["Pods, ReplicaSets, Deployments", "Services, ConfigMaps, Secrets", "Namespaces, Jobs, CronJobs", "Persistent Volumes"] },
        { label: "Networking", items: ["Ingress, NetworkPolicy, Service Mesh"] },
        { label: "Scaling & Security", items: ["HPA, Cluster Autoscaler", "RBAC, Service Accounts, Pod Security"] },
        { label: "Advanced", items: ["Operators, Helm, CRDs"] }
      ] },
      { sections: [{ label: "Build" }], pipeline: ["Application", "Docker", "Kubernetes", "Ingress", "TLS", "Autoscaling"] }
    ]
  },
  {
    num: "Phase 10",
    title: "GitOps",
    duration: "2 weeks",
    tag: "soon",
    cols: [
      { sections: [
        { label: "Learn", items: ["Declarative deployments", "Git as source of truth", "Sync strategies, Rollbacks"] },
        { label: "Tools", items: ["ArgoCD", "Flux"] }
      ] },
      { sections: [{ label: "Build" }], pipeline: ["Git", "ArgoCD", "Kubernetes"] }
    ]
  },
  {
    num: "Phase 11",
    title: "Monitoring & Observability",
    duration: "3 weeks",
    tag: "soon",
    cols: [
      { sections: [
        { label: "Learn", items: ["Metrics, Logs, Tracing, Alerting"] },
        { label: "Tools", items: ["Prometheus & Grafana", "Loki, OpenTelemetry, ELK"] }
      ] },
      { sections: [{ label: "Build a Dashboard tracking", items: ["CPU & Memory", "Request count & Error rate", "Latency"] }] }
    ]
  },
  {
    num: "Phase 12",
    title: "Security & DevSecOps",
    duration: "3 weeks",
    tag: "soon",
    cols: [
      { sections: [{ label: "Learn", items: ["Secrets management", "Container & image scanning", "Dependency scanning", "IAM & Supply chain security", "Policy as Code"] }] },
      { sections: [{ label: "Tools", items: ["Trivy, Checkov, SonarQube", "Snyk, OPA, Kyverno"] }] }
    ]
  },
  {
    num: "Phase 13",
    title: "Real Production Architecture",
    duration: "Capstone",
    major: !0,
    why: "Everything comes together into a single production-grade pipeline.",
    pipelineHorizontal: ["GitHub", "GitHub Actions", "Terraform", "Azure", "AKS", "ArgoCD", "Application", "Ingress", "Monitoring", "Alerts"]
  },
  {
    num: "Phase 14",
    title: "Platform Engineering",
    duration: "Advanced",
    cols: [
      { sections: [{ label: "Learn", items: ["Internal Developer Platforms", "Golden Paths & Self-service Infrastructure", "Developer Experience", "Backstage, Crossplane", "Kubernetes Operators"] }] }
    ]
  },
  {
    num: "Phase 15",
    title: "AI + DevOps",
    duration: "The Future",
    tag: "future",
    future: !0,
    cols: [
      { sections: [{ label: "Learn", items: ["AI-assisted incident management", "AI-generated pipelines", "AIOps & LLM integrations", "MCP Servers", "AI Agents for operations"] }] }
    ]
  }
];
function bs() {
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx("section", { className: "rm-hero", children: /* @__PURE__ */ e.jsxs("div", { className: "rm-hero-inner", children: [
      /* @__PURE__ */ e.jsx("div", { className: "rm-badge", children: "DevOps Roadmap 2026" }),
      /* @__PURE__ */ e.jsx("h1", { className: "rm-title", children: "From Beginner to Expert" }),
      /* @__PURE__ */ e.jsxs("p", { className: "rm-sub", children: [
        "Think of DevOps as a journey:",
        /* @__PURE__ */ e.jsx("br", {}),
        /* @__PURE__ */ e.jsx("strong", { children: "Linux → Programming → Cloud → Automate Everything → Design Platforms → Lead Architecture" })
      ] }),
      /* @__PURE__ */ e.jsx("p", { className: "rm-sub", style: { marginTop: 10 }, children: "There is no real end. You keep moving toward Platform Engineering, Cloud Architecture, and AI-driven Operations." })
    ] }) }),
    /* @__PURE__ */ e.jsx("section", { className: "section rm-section", children: /* @__PURE__ */ e.jsxs("div", { className: "section-inner", children: [
      /* @__PURE__ */ e.jsx("div", { className: "rm-phases", children: gs.map((i) => /* @__PURE__ */ e.jsx(xs, { phase: i }, i.num)) }),
      /* @__PURE__ */ e.jsx("div", { className: "rm-notify", style: { marginTop: 48 }, children: /* @__PURE__ */ e.jsxs("div", { className: "rm-notify-inner", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "rm-notify-text", children: [
          /* @__PURE__ */ e.jsx("div", { className: "rm-notify-title", children: "Linux is live. Start here." }),
          /* @__PURE__ */ e.jsx("div", { className: "rm-notify-sub", children: "62 scenario questions with model answers, deep notes PDF, and real production fixes. More phases launching soon." })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "rm-notify-btns", children: [
          /* @__PURE__ */ e.jsx("a", { href: "/interview-prep/linux", className: "btn-primary", children: "Start with Linux →" }),
          /* @__PURE__ */ e.jsx("a", { href: "https://instagram.com/rootcausedaily", target: "_blank", rel: "noopener noreferrer", className: "btn-secondary", children: "Follow for updates" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function xs({ phase: i }) {
  return /* @__PURE__ */ e.jsxs("div", { className: `rm-phase${i.major ? " rm-phase--major" : ""}${i.future ? " rm-phase--future" : ""}`, children: [
    /* @__PURE__ */ e.jsxs("div", { className: "rm-phase-head", children: [
      /* @__PURE__ */ e.jsx("div", { className: "rm-phase-num", children: i.num }),
      /* @__PURE__ */ e.jsxs("div", { className: "rm-phase-meta", children: [
        /* @__PURE__ */ e.jsx("div", { className: "rm-phase-title", children: i.title }),
        /* @__PURE__ */ e.jsx("div", { className: "rm-phase-duration", children: i.duration })
      ] }),
      i.tag === "live" && /* @__PURE__ */ e.jsx("div", { className: "rm-phase-tag rm-phase-tag--live", children: "Available on Root Cause" }),
      i.tag === "soon" && /* @__PURE__ */ e.jsx("div", { className: "rm-phase-tag rm-phase-tag--soon", children: "Coming Soon" }),
      i.tag === "future" && /* @__PURE__ */ e.jsx("div", { className: "rm-phase-tag rm-phase-tag--future", children: "Emerging" })
    ] }),
    i.why && /* @__PURE__ */ e.jsx("p", { className: "rm-phase-why", children: i.why }),
    i.pipelineHorizontal && /* @__PURE__ */ e.jsx("div", { className: "rm-pipeline rm-pipeline--horizontal", children: i.pipelineHorizontal.map((d, p) => /* @__PURE__ */ e.jsxs(B.Fragment, { children: [
      /* @__PURE__ */ e.jsx("div", { className: `rm-pipe-step${p === i.pipelineHorizontal.length - 1 ? " rm-pipe-step--end" : ""}`, children: d }),
      p < i.pipelineHorizontal.length - 1 && /* @__PURE__ */ e.jsx("div", { className: "rm-pipe-arrow", children: "→" })
    ] }, d)) }),
    i.cols && /* @__PURE__ */ e.jsx("div", { className: "rm-cols", children: i.cols.map((d, p) => /* @__PURE__ */ e.jsxs("div", { children: [
      d.sections.map((u, j) => /* @__PURE__ */ e.jsxs(B.Fragment, { children: [
        /* @__PURE__ */ e.jsxs("div", { className: "rm-col-label", style: j > 0 ? { marginTop: 12 } : void 0, children: [
          u.label,
          u.recommended && /* @__PURE__ */ e.jsx("span", { className: "rm-rec", children: "Recommended" })
        ] }),
        u.items && /* @__PURE__ */ e.jsx("ul", { className: "rm-list", children: u.items.map((k) => /* @__PURE__ */ e.jsx("li", { children: k }, k)) })
      ] }, u.label)),
      d.pipeline && /* @__PURE__ */ e.jsx("div", { className: "rm-pipeline", children: d.pipeline.map((u, j) => /* @__PURE__ */ e.jsxs(B.Fragment, { children: [
        /* @__PURE__ */ e.jsx("div", { className: `rm-pipe-step${j === d.pipeline.length - 1 ? " rm-pipe-step--end" : ""}`, children: u }),
        j < d.pipeline.length - 1 && /* @__PURE__ */ e.jsx("div", { className: "rm-pipe-arrow", children: "↓" })
      ] }, u)) }),
      d.cta && /* @__PURE__ */ e.jsx("a", { href: d.cta.href, className: "rm-phase-cta", children: d.cta.text })
    ] }, p)) })
  ] });
}
const Se = 9e3;
function ys() {
  const [i] = I(window.location.pathname);
  return i === "/about" ? /* @__PURE__ */ e.jsx(vs, {}) : i === "/roadmap" ? /* @__PURE__ */ e.jsx(bs, {}) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(js, {}),
    /* @__PURE__ */ e.jsx(ws, {}),
    /* @__PURE__ */ e.jsx(ks, {}),
    /* @__PURE__ */ e.jsx(Ns, {}),
    /* @__PURE__ */ e.jsx(Ss, {}),
    /* @__PURE__ */ e.jsx(Cs, {}),
    /* @__PURE__ */ e.jsx(Ps, {}),
    /* @__PURE__ */ e.jsx(Rs, {})
  ] });
}
function js() {
  return /* @__PURE__ */ e.jsx("section", { className: "hero", children: /* @__PURE__ */ e.jsxs("div", { className: "hero-inner", children: [
    /* @__PURE__ */ e.jsx("div", { className: "hero-badge", children: "🎯 DevOps & DevSecOps Interview Prep" }),
    /* @__PURE__ */ e.jsxs("h1", { className: "hero-title", children: [
      "Good engineers fix problems.",
      /* @__PURE__ */ e.jsx("br", {}),
      /* @__PURE__ */ e.jsx("span", { className: "hero-accent", children: "Great ones find the root cause." })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "hero-sub", children: "Interview prep built around how production actually breaks. Scenario questions with model answers, deep notes, and real failure stories — for every major DevOps topic. One-time purchase, yours forever." }),
    /* @__PURE__ */ e.jsxs("div", { className: "hero-actions", children: [
      /* @__PURE__ */ e.jsx("a", { href: "/interview-prep/linux", className: "btn-primary", children: "Start with Linux →" }),
      /* @__PURE__ */ e.jsx("a", { href: "/interview-prep", className: "btn-secondary", children: "See All Topics" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "hero-stats", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "hero-stat", children: [
        /* @__PURE__ */ e.jsx("span", { className: "hero-stat-num", children: "62+" }),
        /* @__PURE__ */ e.jsx("span", { className: "hero-stat-label", children: "Scenario Questions" })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "hero-stat", children: /* @__PURE__ */ e.jsx("span", { className: "hero-stat-divider" }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "hero-stat", children: [
        /* @__PURE__ */ e.jsx("span", { className: "hero-stat-num", children: "20" }),
        /* @__PURE__ */ e.jsx("span", { className: "hero-stat-label", children: "Chapters" })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "hero-stat", children: /* @__PURE__ */ e.jsx("span", { className: "hero-stat-divider" }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "hero-stat", children: [
        /* @__PURE__ */ e.jsx("span", { className: "hero-stat-num", children: "8" }),
        /* @__PURE__ */ e.jsx("span", { className: "hero-stat-label", children: "DevOps Topics" })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "hero-stat", children: /* @__PURE__ */ e.jsx("span", { className: "hero-stat-divider" }) }),
      /* @__PURE__ */ e.jsxs("div", { className: "hero-stat", children: [
        /* @__PURE__ */ e.jsx("span", { className: "hero-stat-num", children: "₹299" }),
        /* @__PURE__ */ e.jsx("span", { className: "hero-stat-label", children: "Starts at" })
      ] })
    ] })
  ] }) });
}
function ws() {
  const [i, d] = I(0), [p, u] = I(!1), [j, k] = I(0), P = us(null), _ = X.length, N = (T) => {
    clearTimeout(P.current), u(!0), setTimeout(() => {
      d(T), u(!1), k((y) => y + 1);
    }, 300);
  };
  hs(() => (P.current = setTimeout(() => {
    N((i + 1) % _);
  }, Se), () => clearTimeout(P.current)), [i]);
  const g = X[i];
  return /* @__PURE__ */ e.jsx("section", { className: "section sample-section", children: /* @__PURE__ */ e.jsxs("div", { className: "section-inner", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "sample-label-row", children: [
      /* @__PURE__ */ e.jsx("div", { className: "sample-label", children: "🔍 Free Sample — See the quality before you buy" }),
      /* @__PURE__ */ e.jsx("div", { className: "sample-dots", children: X.map((T, y) => /* @__PURE__ */ e.jsx(
        "button",
        {
          className: `sd${y === i ? " sd--active" : ""}`,
          onClick: () => N(y)
        },
        y
      )) })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: `sample-card${p ? " sample-fade-out" : " sample-fade-in"}`, children: [
      /* @__PURE__ */ e.jsx("div", { className: "sample-progress-bar", children: /* @__PURE__ */ e.jsx("div", { className: "sample-progress-fill", style: { animation: `sample-progress ${Se}ms linear forwards` } }, j) }),
      /* @__PURE__ */ e.jsxs("div", { className: "sample-card-header", children: [
        /* @__PURE__ */ e.jsxs("div", { className: "sample-tags", children: [
          /* @__PURE__ */ e.jsx("span", { className: "sample-tag", style: { background: g.color + "22", color: g.color, border: `1px solid ${g.color}44` }, children: g.topic }),
          /* @__PURE__ */ e.jsx("span", { className: "sample-tag sample-tag--level", children: g.level }),
          /* @__PURE__ */ e.jsx("span", { className: "sample-tag sample-tag--type", children: g.type })
        ] }),
        /* @__PURE__ */ e.jsx("div", { className: "sample-q-num", children: "Question from the Interview Questions PDF" })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "sample-question", children: g.q }),
      /* @__PURE__ */ e.jsxs("div", { className: "sample-answer-teaser", children: [
        /* @__PURE__ */ e.jsx("div", { className: "sample-answer-label", children: "🔒 Model Answer — locked in the PDF" }),
        /* @__PURE__ */ e.jsx("div", { className: "sample-answer-blur", children: g.blur }),
        /* @__PURE__ */ e.jsx("a", { href: g.link, className: "sample-unlock-btn", children: g.cta })
      ] })
    ] })
  ] }) });
}
function ks() {
  return /* @__PURE__ */ e.jsx("section", { className: "section courses-section", children: /* @__PURE__ */ e.jsxs("div", { className: "section-inner", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "section-header", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "section-title", children: "Every Major DevOps Topic" }),
      /* @__PURE__ */ e.jsx("p", { className: "section-sub", children: "Notes, scenario interview questions, and real failure stories for each topic. Linux is live. More launching soon." })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "courses-grid", children: ps.map((i) => /* @__PURE__ */ e.jsxs("a", { href: `/interview-prep/${i.slug}`, className: `course-card${i.available ? "" : " course-card--soon"}`, children: [
      /* @__PURE__ */ e.jsxs("div", { className: "course-card-top", children: [
        /* @__PURE__ */ e.jsx("span", { className: "course-icon", style: { background: i.color }, children: i.icon }),
        !i.available && /* @__PURE__ */ e.jsx("span", { className: "course-badge-soon", children: "Coming Soon" }),
        i.available && /* @__PURE__ */ e.jsx("span", { className: "course-badge-live", children: "Live Now" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "course-card-body", children: [
        /* @__PURE__ */ e.jsx("h3", { className: "course-name", children: i.name }),
        /* @__PURE__ */ e.jsx("p", { className: "course-tagline", children: i.tagline }),
        /* @__PURE__ */ e.jsx("div", { className: "course-category", children: i.category })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "course-card-footer", children: i.available ? /* @__PURE__ */ e.jsx("span", { className: "course-cta", children: "Notes & Questions →" }) : /* @__PURE__ */ e.jsx("span", { className: "course-cta-muted", children: "Coming soon" }) })
    ] }, i.slug)) })
  ] }) });
}
function Ns() {
  const i = [
    "What is the difference between chmod 755 and chmod 644?",
    "What does the kill command do?",
    "What is a cron job?",
    "List the Linux file permission types.",
    "What is /etc/fstab used for?"
  ], d = [
    "A developer's script works on their laptop but gets permission denied on the server. The file is 755. Debug this.",
    "A process is consuming 100% CPU but your app is idle. How do you identify and handle it without causing downtime?",
    "Your cron job ran fine for weeks. It did not run today. No errors in the log. Diagnose.",
    "A server's load average is 8 but CPU usage shows only 15%. What is happening and how do you fix it?",
    "After a reboot, a mount is missing and your app cannot start. Walk through diagnosing and fixing it permanently."
  ];
  return /* @__PURE__ */ e.jsx("section", { className: "section diff-section", children: /* @__PURE__ */ e.jsxs("div", { className: "section-inner", children: [
    /* @__PURE__ */ e.jsx("h2", { className: "section-title", children: "Scenario vs Textbook. Here is the Difference." }),
    /* @__PURE__ */ e.jsxs("div", { className: "diff-table", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "diff-col diff-col--bad", children: [
        /* @__PURE__ */ e.jsx("div", { className: "diff-col-header diff-col-header--bad", children: "📚 Textbook Questions (everywhere else)" }),
        i.map((p) => /* @__PURE__ */ e.jsxs("div", { className: "diff-item diff-item--bad", children: [
          '"',
          p,
          '"'
        ] }, p))
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "diff-col diff-col--good", children: [
        /* @__PURE__ */ e.jsx("div", { className: "diff-col-header diff-col-header--good", children: "🎯 Scenario Questions (Root Cause)" }),
        d.map((p) => /* @__PURE__ */ e.jsxs("div", { className: "diff-item diff-item--good", children: [
          '"',
          p,
          '"'
        ] }, p))
      ] })
    ] }),
    /* @__PURE__ */ e.jsx("p", { className: "diff-note", children: "Real interviewers at product companies ask scenarios. They want to see how you think, not what you memorized." })
  ] }) });
}
function Ss() {
  return /* @__PURE__ */ e.jsx("section", { className: "section fixes-preview-section", children: /* @__PURE__ */ e.jsxs("div", { className: "section-inner", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "section-header", children: [
      /* @__PURE__ */ e.jsx("h2", { className: "section-title", children: "Production Fixes" }),
      /* @__PURE__ */ e.jsx("p", { className: "section-sub", children: "Real issues, root causes, and step-by-step fixes — tagged by tool." })
    ] }),
    /* @__PURE__ */ e.jsx("div", { className: "fp-grid", children: fs.map((i) => /* @__PURE__ */ e.jsxs("a", { href: `/fixes/${i.slug}`, className: "fp-card", children: [
      /* @__PURE__ */ e.jsx("div", { className: "fp-card-tags", children: i.tags.map((d) => /* @__PURE__ */ e.jsx("span", { className: "fl-card-tag", children: d }, d)) }),
      /* @__PURE__ */ e.jsx("div", { className: "fp-card-title", children: i.title }),
      /* @__PURE__ */ e.jsx("div", { className: "fp-card-summary", children: i.summary }),
      /* @__PURE__ */ e.jsx("span", { className: "fp-card-cta", children: "Read fix →" })
    ] }, i.slug)) }),
    /* @__PURE__ */ e.jsx("div", { className: "fp-footer", children: /* @__PURE__ */ e.jsx("a", { href: "/fixes", className: "btn-secondary", children: "Browse all fixes →" }) })
  ] }) });
}
function Cs() {
  return /* @__PURE__ */ e.jsx("section", { className: "section failure-teaser-section", children: /* @__PURE__ */ e.jsx("div", { className: "section-inner", children: /* @__PURE__ */ e.jsxs("div", { className: "failure-teaser-box", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "failure-teaser-text", children: [
      /* @__PURE__ */ e.jsx("span", { className: "failure-teaser-eyebrow", children: "🔥 Coming Soon" }),
      /* @__PURE__ */ e.jsx("h2", { children: "Real Production Failure Stories" }),
      /* @__PURE__ */ e.jsx("p", { children: "The cron job that took down payments at 2am. The chmod 777 that caused a data breach. The disk that filled up silently and killed the database. Real incidents, root causes, and what was learned. Nothing makes you stand out in an interview like a war story." }),
      /* @__PURE__ */ e.jsxs("span", { className: "failure-teaser-follow", children: [
        "Follow ",
        /* @__PURE__ */ e.jsx("strong", { children: "@rootcausedaily" }),
        " on Instagram for early previews"
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "failure-teaser-cards", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "failure-card", children: [
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-icon", children: "🔥" }),
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-title", children: "Disk at 100%" }),
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-sub", children: "Production DB crash at 3am" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "failure-card", children: [
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-icon", children: "🔑" }),
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-title", children: "chmod 777" }),
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-sub", children: "Security incident that cost 3 jobs" })
      ] }),
      /* @__PURE__ */ e.jsxs("div", { className: "failure-card", children: [
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-icon", children: "⚡" }),
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-title", children: "Cron + Timezone" }),
        /* @__PURE__ */ e.jsx("div", { className: "failure-card-sub", children: "Billing ran twice, 40,000 users charged" })
      ] })
    ] })
  ] }) }) });
}
function Ps() {
  return /* @__PURE__ */ e.jsx("section", { className: "section arch-teaser-section", children: /* @__PURE__ */ e.jsx("div", { className: "section-inner", children: /* @__PURE__ */ e.jsxs("div", { className: "arch-teaser-row", children: [
    /* @__PURE__ */ e.jsxs("div", { className: "arch-teaser-text", children: [
      /* @__PURE__ */ e.jsx("h2", { children: "How Big Companies Do It" }),
      /* @__PURE__ */ e.jsx("p", { children: "Real architecture breakdowns — Netflix, Spotify, Uber, Zomato. See the tools you are learning in action at production scale." }),
      /* @__PURE__ */ e.jsx("a", { href: "/architectures", className: "btn-secondary", children: "Browse Architectures →" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "arch-teaser-logos", children: [
      /* @__PURE__ */ e.jsx("span", { children: "Netflix" }),
      /* @__PURE__ */ e.jsx("span", { children: "Spotify" }),
      /* @__PURE__ */ e.jsx("span", { children: "Uber" }),
      /* @__PURE__ */ e.jsx("span", { children: "Airbnb" }),
      /* @__PURE__ */ e.jsx("span", { children: "Zomato" }),
      /* @__PURE__ */ e.jsx("span", { children: "Flipkart" })
    ] })
  ] }) }) });
}
const Ts = [
  {
    q: "Is this just another list of interview questions I can find on Google?",
    a: `No. Google gives you textbook questions — "What is chmod?" or "Explain the Linux boot process." We give you scenario questions — "A developer's script works on their laptop but fails on the server with permission denied. The file has 755. Debug this step by step." That is the format real interviewers at product companies use. The model answers are written by engineers who have been on both sides of the table.`
  },
  {
    q: "I am a developer, not a DevOps engineer. Is this for me?",
    a: "Yes, if you are targeting a DevOps, SRE, Platform, or Cloud role — or if your current role involves working with servers, CI/CD, or cloud. The notes assume you have used a terminal before, but do not assume DevOps experience. The interview questions are tiered from beginner to expert."
  },
  {
    q: "I have an interview in 3 days. Is there time?",
    a: "Yes. In 3 days, skip the notes and go straight to the interview questions PDF. Read all 62 questions and their model answers. Pay extra attention to anything that surprises you — those are your gaps. You will not master Linux in 3 days, but you will know exactly what to say for the most common scenarios."
  },
  {
    q: "What format are the PDFs? Can I read on my phone?",
    a: "Standard PDF, optimised for reading. They work on phone, tablet, laptop — anything with a PDF viewer. No DRM, no expiry. Download once and keep it forever. Most people use them on their laptop for studying and on their phone for quick review before an interview."
  }
];
function Rs() {
  const [i, d] = I(null);
  return /* @__PURE__ */ e.jsx("section", { className: "section faq-section", children: /* @__PURE__ */ e.jsxs("div", { className: "section-inner", children: [
    /* @__PURE__ */ e.jsx("div", { className: "section-header", children: /* @__PURE__ */ e.jsx("h2", { className: "section-title", children: "Frequently Asked Questions" }) }),
    /* @__PURE__ */ e.jsx("div", { className: "faq-list", children: Ts.map((p, u) => /* @__PURE__ */ e.jsxs("div", { className: `faq-item${i === u ? " faq-open" : ""}`, children: [
      /* @__PURE__ */ e.jsxs("button", { className: "faq-q", onClick: () => d(i === u ? null : u), children: [
        p.q,
        /* @__PURE__ */ e.jsx("span", { className: "faq-chevron", children: "▾" })
      ] }),
      /* @__PURE__ */ e.jsx("div", { className: "faq-a", children: p.a })
    ] }, u)) })
  ] }) });
}
let F = null;
function As() {
  return Promise.resolve();
}
function Os() {
  const i = document.getElementById("rc-home");
  return F = ms(i), F.render(/* @__PURE__ */ e.jsx(ys, {})), Promise.resolve();
}
function Is() {
  return F && (F.unmount(), F = null), Promise.resolve();
}
export {
  As as bootstrap,
  Os as mount,
  Is as unmount
};
