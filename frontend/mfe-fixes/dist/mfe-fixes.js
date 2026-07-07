import mt, { useState as R, useEffect as X, useMemo as Ae } from "react";
import { createRoot as gt } from "react-dom/client";
var Re = { exports: {} }, B = {};
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
  var g = mt, l = Symbol.for("react.element"), n = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), p = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), o = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), U = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), Ee = Symbol.for("react.offscreen"), Z = Symbol.iterator, Ie = "@@iterator";
  function Te(e) {
    if (e === null || typeof e != "object")
      return null;
    var s = Z && e[Z] || e[Ie];
    return typeof s == "function" ? s : null;
  }
  var E = g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function v(e) {
    {
      for (var s = arguments.length, r = new Array(s > 1 ? s - 1 : 0), a = 1; a < s; a++)
        r[a - 1] = arguments[a];
      Ne("error", e, r);
    }
  }
  function Ne(e, s, r) {
    {
      var a = E.ReactDebugCurrentFrame, d = a.getStackAddendum();
      d !== "" && (s += "%s", r = r.concat([d]));
      var m = r.map(function(u) {
        return String(u);
      });
      m.unshift("Warning: " + s), Function.prototype.apply.call(console[e], console, m);
    }
  }
  var De = !1, _e = !1, Oe = !1, Le = !1, Fe = !1, ee;
  ee = Symbol.for("react.module.reference");
  function Me(e) {
    return !!(typeof e == "string" || typeof e == "function" || e === i || e === p || Fe || e === b || e === C || e === U || Le || e === Ee || De || _e || Oe || typeof e == "object" && e !== null && (e.$$typeof === W || e.$$typeof === O || e.$$typeof === w || e.$$typeof === o || e.$$typeof === h || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    e.$$typeof === ee || e.getModuleId !== void 0));
  }
  function Ye(e, s, r) {
    var a = e.displayName;
    if (a)
      return a;
    var d = s.displayName || s.name || "";
    return d !== "" ? r + "(" + d + ")" : r;
  }
  function te(e) {
    return e.displayName || "Context";
  }
  function A(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case i:
        return "Fragment";
      case n:
        return "Portal";
      case p:
        return "Profiler";
      case b:
        return "StrictMode";
      case C:
        return "Suspense";
      case U:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case o:
          var s = e;
          return te(s) + ".Consumer";
        case w:
          var r = e;
          return te(r._context) + ".Provider";
        case h:
          return Ye(e, e.render, "ForwardRef");
        case O:
          var a = e.displayName || null;
          return a !== null ? a : A(e.type) || "Memo";
        case W: {
          var d = e, m = d._payload, u = d._init;
          try {
            return A(u(m));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var P = Object.assign, N = 0, se, re, ie, ae, oe, ne, ce;
  function le() {
  }
  le.__reactDisabledLog = !0;
  function Be() {
    {
      if (N === 0) {
        se = console.log, re = console.info, ie = console.warn, ae = console.error, oe = console.group, ne = console.groupCollapsed, ce = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: le,
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
      N++;
    }
  }
  function Ue() {
    {
      if (N--, N === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: P({}, e, {
            value: se
          }),
          info: P({}, e, {
            value: re
          }),
          warn: P({}, e, {
            value: ie
          }),
          error: P({}, e, {
            value: ae
          }),
          group: P({}, e, {
            value: oe
          }),
          groupCollapsed: P({}, e, {
            value: ne
          }),
          groupEnd: P({}, e, {
            value: ce
          })
        });
      }
      N < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var G = E.ReactCurrentDispatcher, q;
  function L(e, s, r) {
    {
      if (q === void 0)
        try {
          throw Error();
        } catch (d) {
          var a = d.stack.trim().match(/\n( *(at )?)/);
          q = a && a[1] || "";
        }
      return `
` + q + e;
    }
  }
  var H = !1, F;
  {
    var We = typeof WeakMap == "function" ? WeakMap : Map;
    F = new We();
  }
  function ue(e, s) {
    if (!e || H)
      return "";
    {
      var r = F.get(e);
      if (r !== void 0)
        return r;
    }
    var a;
    H = !0;
    var d = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var m;
    m = G.current, G.current = null, Be();
    try {
      if (s) {
        var u = function() {
          throw Error();
        };
        if (Object.defineProperty(u.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(u, []);
          } catch (x) {
            a = x;
          }
          Reflect.construct(e, [], u);
        } else {
          try {
            u.call();
          } catch (x) {
            a = x;
          }
          e.call(u.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (x) {
          a = x;
        }
        e();
      }
    } catch (x) {
      if (x && a && typeof x.stack == "string") {
        for (var c = x.stack.split(`
`), k = a.stack.split(`
`), f = c.length - 1, y = k.length - 1; f >= 1 && y >= 0 && c[f] !== k[y]; )
          y--;
        for (; f >= 1 && y >= 0; f--, y--)
          if (c[f] !== k[y]) {
            if (f !== 1 || y !== 1)
              do
                if (f--, y--, y < 0 || c[f] !== k[y]) {
                  var S = `
` + c[f].replace(" at new ", " at ");
                  return e.displayName && S.includes("<anonymous>") && (S = S.replace("<anonymous>", e.displayName)), typeof e == "function" && F.set(e, S), S;
                }
              while (f >= 1 && y >= 0);
            break;
          }
      }
    } finally {
      H = !1, G.current = m, Ue(), Error.prepareStackTrace = d;
    }
    var T = e ? e.displayName || e.name : "", j = T ? L(T) : "";
    return typeof e == "function" && F.set(e, j), j;
  }
  function Ge(e, s, r) {
    return ue(e, !1);
  }
  function qe(e) {
    var s = e.prototype;
    return !!(s && s.isReactComponent);
  }
  function M(e, s, r) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return ue(e, qe(e));
    if (typeof e == "string")
      return L(e);
    switch (e) {
      case C:
        return L("Suspense");
      case U:
        return L("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case h:
          return Ge(e.render);
        case O:
          return M(e.type, s, r);
        case W: {
          var a = e, d = a._payload, m = a._init;
          try {
            return M(m(d), s, r);
          } catch {
          }
        }
      }
    return "";
  }
  var D = Object.prototype.hasOwnProperty, de = {}, he = E.ReactDebugCurrentFrame;
  function Y(e) {
    if (e) {
      var s = e._owner, r = M(e.type, e._source, s ? s.type : null);
      he.setExtraStackFrame(r);
    } else
      he.setExtraStackFrame(null);
  }
  function He(e, s, r, a, d) {
    {
      var m = Function.call.bind(D);
      for (var u in e)
        if (m(e, u)) {
          var c = void 0;
          try {
            if (typeof e[u] != "function") {
              var k = Error((a || "React class") + ": " + r + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw k.name = "Invariant Violation", k;
            }
            c = e[u](s, u, a, r, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (f) {
            c = f;
          }
          c && !(c instanceof Error) && (Y(d), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", r, u, typeof c), Y(null)), c instanceof Error && !(c.message in de) && (de[c.message] = !0, Y(d), v("Failed %s type: %s", r, c.message), Y(null));
        }
    }
  }
  var $e = Array.isArray;
  function $(e) {
    return $e(e);
  }
  function Ke(e) {
    {
      var s = typeof Symbol == "function" && Symbol.toStringTag, r = s && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return r;
    }
  }
  function Ve(e) {
    try {
      return me(e), !1;
    } catch {
      return !0;
    }
  }
  function me(e) {
    return "" + e;
  }
  function ge(e) {
    if (Ve(e))
      return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), me(e);
  }
  var pe = E.ReactCurrentOwner, ze = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, fe, ye;
  function Je(e) {
    if (D.call(e, "ref")) {
      var s = Object.getOwnPropertyDescriptor(e, "ref").get;
      if (s && s.isReactWarning)
        return !1;
    }
    return e.ref !== void 0;
  }
  function Qe(e) {
    if (D.call(e, "key")) {
      var s = Object.getOwnPropertyDescriptor(e, "key").get;
      if (s && s.isReactWarning)
        return !1;
    }
    return e.key !== void 0;
  }
  function Xe(e, s) {
    typeof e.ref == "string" && pe.current;
  }
  function Ze(e, s) {
    {
      var r = function() {
        fe || (fe = !0, v("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
      };
      r.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: r,
        configurable: !0
      });
    }
  }
  function et(e, s) {
    {
      var r = function() {
        ye || (ye = !0, v("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", s));
      };
      r.isReactWarning = !0, Object.defineProperty(e, "ref", {
        get: r,
        configurable: !0
      });
    }
  }
  var tt = function(e, s, r, a, d, m, u) {
    var c = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: l,
      // Built-in properties that belong on the element
      type: e,
      key: s,
      ref: r,
      props: u,
      // Record the component responsible for creating this element.
      _owner: m
    };
    return c._store = {}, Object.defineProperty(c._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(c, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: a
    }), Object.defineProperty(c, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: d
    }), Object.freeze && (Object.freeze(c.props), Object.freeze(c)), c;
  };
  function st(e, s, r, a, d) {
    {
      var m, u = {}, c = null, k = null;
      r !== void 0 && (ge(r), c = "" + r), Qe(s) && (ge(s.key), c = "" + s.key), Je(s) && (k = s.ref, Xe(s, d));
      for (m in s)
        D.call(s, m) && !ze.hasOwnProperty(m) && (u[m] = s[m]);
      if (e && e.defaultProps) {
        var f = e.defaultProps;
        for (m in f)
          u[m] === void 0 && (u[m] = f[m]);
      }
      if (c || k) {
        var y = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
        c && Ze(u, y), k && et(u, y);
      }
      return tt(e, c, k, d, a, pe.current, u);
    }
  }
  var K = E.ReactCurrentOwner, be = E.ReactDebugCurrentFrame;
  function I(e) {
    if (e) {
      var s = e._owner, r = M(e.type, e._source, s ? s.type : null);
      be.setExtraStackFrame(r);
    } else
      be.setExtraStackFrame(null);
  }
  var V;
  V = !1;
  function z(e) {
    return typeof e == "object" && e !== null && e.$$typeof === l;
  }
  function ve() {
    {
      if (K.current) {
        var e = A(K.current.type);
        if (e)
          return `

Check the render method of \`` + e + "`.";
      }
      return "";
    }
  }
  function rt(e) {
    return "";
  }
  var ke = {};
  function it(e) {
    {
      var s = ve();
      if (!s) {
        var r = typeof e == "string" ? e : e.displayName || e.name;
        r && (s = `

Check the top-level render call using <` + r + ">.");
      }
      return s;
    }
  }
  function xe(e, s) {
    {
      if (!e._store || e._store.validated || e.key != null)
        return;
      e._store.validated = !0;
      var r = it(s);
      if (ke[r])
        return;
      ke[r] = !0;
      var a = "";
      e && e._owner && e._owner !== K.current && (a = " It was passed a child from " + A(e._owner.type) + "."), I(e), v('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', r, a), I(null);
    }
  }
  function we(e, s) {
    {
      if (typeof e != "object")
        return;
      if ($(e))
        for (var r = 0; r < e.length; r++) {
          var a = e[r];
          z(a) && xe(a, s);
        }
      else if (z(e))
        e._store && (e._store.validated = !0);
      else if (e) {
        var d = Te(e);
        if (typeof d == "function" && d !== e.entries)
          for (var m = d.call(e), u; !(u = m.next()).done; )
            z(u.value) && xe(u.value, s);
      }
    }
  }
  function at(e) {
    {
      var s = e.type;
      if (s == null || typeof s == "string")
        return;
      var r;
      if (typeof s == "function")
        r = s.propTypes;
      else if (typeof s == "object" && (s.$$typeof === h || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      s.$$typeof === O))
        r = s.propTypes;
      else
        return;
      if (r) {
        var a = A(s);
        He(r, e.props, "prop", a, e);
      } else if (s.PropTypes !== void 0 && !V) {
        V = !0;
        var d = A(s);
        v("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", d || "Unknown");
      }
      typeof s.getDefaultProps == "function" && !s.getDefaultProps.isReactClassApproved && v("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ot(e) {
    {
      for (var s = Object.keys(e.props), r = 0; r < s.length; r++) {
        var a = s[r];
        if (a !== "children" && a !== "key") {
          I(e), v("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), I(null);
          break;
        }
      }
      e.ref !== null && (I(e), v("Invalid attribute `ref` supplied to `React.Fragment`."), I(null));
    }
  }
  var Ce = {};
  function Se(e, s, r, a, d, m) {
    {
      var u = Me(e);
      if (!u) {
        var c = "";
        (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var k = rt();
        k ? c += k : c += ve();
        var f;
        e === null ? f = "null" : $(e) ? f = "array" : e !== void 0 && e.$$typeof === l ? (f = "<" + (A(e.type) || "Unknown") + " />", c = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e, v("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", f, c);
      }
      var y = st(e, s, r, d, m);
      if (y == null)
        return y;
      if (u) {
        var S = s.children;
        if (S !== void 0)
          if (a)
            if ($(S)) {
              for (var T = 0; T < S.length; T++)
                we(S[T], e);
              Object.freeze && Object.freeze(S);
            } else
              v("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            we(S, e);
      }
      if (D.call(s, "key")) {
        var j = A(e), x = Object.keys(s).filter(function(ht) {
          return ht !== "key";
        }), J = x.length > 0 ? "{key: someKey, " + x.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!Ce[j + J]) {
          var dt = x.length > 0 ? "{" + x.join(": ..., ") + ": ...}" : "{}";
          v(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, J, j, dt, j), Ce[j + J] = !0;
        }
      }
      return e === i ? ot(y) : at(y), y;
    }
  }
  function nt(e, s, r) {
    return Se(e, s, r, !0);
  }
  function ct(e, s, r) {
    return Se(e, s, r, !1);
  }
  var lt = ct, ut = nt;
  B.Fragment = i, B.jsx = lt, B.jsxs = ut;
})();
Re.exports = B;
var t = Re.exports;
const Q = [
  {
    slug: "docker-container-exits-immediately",
    title: "Container exits immediately after start",
    tags: [
      "Docker"
    ],
    summary: "Container starts but exits within seconds. docker ps shows nothing.",
    issue: "You run `docker run myapp` and the container stops immediately. `docker ps` is empty.",
    cause: "Docker containers only live as long as their PID 1 process. If your CMD finishes, exits, or crashes due to a missing env variable, the container dies with it.",
    fix: [
      "Check logs: `docker logs <container_id>`",
      "Run interactively to debug: `docker run -it myapp /bin/sh`",
      'Make sure CMD runs in the foreground. Wrong: `service nginx start` — Right: `nginx -g "daemon off;"`',
      "Check for missing required env variables that cause the app to crash on startup"
    ],
    date: "2026-06-01"
  },
  {
    slug: "docker-permission-denied-sock",
    title: "permission denied: /var/run/docker.sock",
    tags: [
      "Docker",
      "Linux"
    ],
    summary: "Running docker commands fails with permission denied on the socket.",
    issue: "`docker ps` fails: `Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock`",
    cause: "Only root and members of the `docker` group can access the socket. Your user is in neither.",
    fix: [
      "Add user to docker group: `sudo usermod -aG docker $USER`",
      "Log out and back in (or reconnect SSH) — group changes only apply to new sessions",
      "Verify: run `groups` and confirm `docker` appears",
      "Test: `docker ps` should now work without sudo"
    ],
    date: "2026-06-02"
  },
  {
    slug: "docker-build-cache-stale",
    title: "Docker build using stale cache after code change",
    tags: [
      "Docker"
    ],
    summary: "Image rebuilds skip your code changes and serve old content.",
    issue: "You changed app code, rebuilt the image, but the running container still serves old behaviour.",
    cause: "Docker caches each layer. If `COPY` comes before `RUN npm install`, any code change busts all layers. But if `COPY . .` is too early and your Dockerfile is ordered badly, you may be copying stale files or running with an old base.",
    fix: [
      "Order Dockerfile correctly: COPY package*.json first, RUN npm install, then COPY . . — so code changes only bust the last layer",
      "Force a full rebuild when needed: `docker build --no-cache -t myapp .`",
      "Confirm the new image is being used: `docker inspect <container> | grep Image`",
      "Make sure you stopped the old container before running the new one"
    ],
    date: "2026-06-03"
  },
  {
    slug: "docker-container-cannot-reach-host",
    title: "Container cannot reach host or other containers",
    tags: [
      "Docker"
    ],
    summary: "App inside container fails to connect to localhost or sibling containers.",
    issue: "App inside container tries to connect to `localhost:5432` (postgres) but gets connection refused.",
    cause: "Inside a container, `localhost` refers to the container itself, not the host machine. Sibling containers are also not reachable via `localhost`.",
    fix: [
      "For host services on Linux: use `172.17.0.1` (default docker bridge gateway) or `--network host`",
      "For sibling containers: use Docker Compose and reference by service name, e.g. `postgres:5432`",
      "Check which network the container is on: `docker inspect <container> | grep NetworkMode`",
      "Use `docker network ls` and `docker network inspect bridge` to see connected containers and their IPs"
    ],
    date: "2026-06-04"
  },
  {
    slug: "docker-image-size-too-large",
    title: "Docker image is several GB — much larger than expected",
    tags: [
      "Docker"
    ],
    summary: "Built image is 2-3x bigger than it needs to be.",
    issue: "`docker images` shows your app image is 2.5 GB. Pulls and deploys are slow.",
    cause: "Common causes: using a full OS base image instead of alpine, including dev dependencies, not cleaning up apt/apk cache, COPY-ing unnecessary files like node_modules or .git.",
    fix: [
      "Switch base image to alpine variant: `FROM node:20-alpine` instead of `FROM node:20`",
      "Use multi-stage builds: build in one stage, copy only the output to a clean stage",
      "Add `.dockerignore` to exclude `node_modules`, `.git`, `*.log`, `deploy/` etc.",
      "After apt-get install, always run: `rm -rf /var/lib/apt/lists/*` in the same RUN layer",
      "Check what is bloating the image: `docker history myapp:latest`"
    ],
    date: "2026-06-05"
  },
  {
    slug: "docker-env-variable-not-available",
    title: "Environment variable not available inside container",
    tags: [
      "Docker"
    ],
    summary: "App inside container cannot read env variables you set on the host.",
    issue: "You set `export DB_URL=postgres://...` on the host but `process.env.DB_URL` is undefined inside the container.",
    cause: "Host environment variables are not automatically passed into containers. You must explicitly pass them.",
    fix: [
      "Pass single vars: `docker run -e DB_URL=$DB_URL myapp`",
      "Pass a file: `docker run --env-file .env myapp`",
      "In Compose: use `environment:` or `env_file:` section under the service",
      "Verify inside the container: `docker exec <container> env | grep DB_URL`"
    ],
    date: "2026-06-06"
  },
  {
    slug: "docker-volume-changes-not-persisted",
    title: "Data lost when container restarts",
    tags: [
      "Docker"
    ],
    summary: "Uploads or database data disappear every time the container is recreated.",
    issue: "Users upload files, container restarts, all uploads are gone.",
    cause: "Container filesystem is ephemeral. Anything written inside the container is lost when it is removed. You need a volume to persist data outside the container lifecycle.",
    fix: [
      "Mount a host directory: `docker run -v /host/uploads:/app/uploads myapp`",
      "Or use a named volume: `docker run -v myapp_uploads:/app/uploads myapp`",
      "List volumes: `docker volume ls`",
      "Inspect where data lives: `docker volume inspect myapp_uploads`",
      "In Compose, define volumes under the service and the top-level `volumes:` key"
    ],
    date: "2026-06-07"
  },
  {
    slug: "docker-port-already-in-use",
    title: "Port is already in use when starting container",
    tags: [
      "Docker"
    ],
    summary: "docker run fails because the host port is already bound.",
    issue: "`docker run -p 3000:3000 myapp` fails: `Bind for 0.0.0.0:3000 failed: port is already allocated`",
    cause: "Another process (or another container) is already listening on host port 3000.",
    fix: [
      "Find what is using the port: `sudo ss -tlnp | grep 3000` or `lsof -i :3000`",
      "Stop the conflicting process or container",
      "Or map to a different host port: `docker run -p 3001:3000 myapp` (host:container)",
      'List running containers and their ports: `docker ps --format "table {{.Names}}	{{.Ports}}"`'
    ],
    date: "2026-06-08"
  },
  {
    slug: "kubernetes-pod-crashloopbackoff",
    title: "Pod stuck in CrashLoopBackOff",
    tags: [
      "Kubernetes"
    ],
    summary: "Pod keeps restarting and never reaches Running state.",
    issue: "`kubectl get pods` shows STATUS: CrashLoopBackOff with RESTARTS climbing.",
    cause: "The container inside the pod is crashing. Kubernetes restarts it, it crashes again, and the backoff timer grows. Common causes: app crash on startup, missing env var, wrong command, missing file.",
    fix: [
      "Check logs from the latest crash: `kubectl logs <pod> --previous`",
      "Describe the pod to see events: `kubectl describe pod <pod>`",
      "Common fix 1: add missing env var via ConfigMap or Secret and reference it in the Deployment",
      "Common fix 2: verify the container CMD/entrypoint is correct — test image locally first with `docker run`",
      "Common fix 3: if init containers are defined, check their logs too: `kubectl logs <pod> -c <init-container-name>`"
    ],
    date: "2026-06-01"
  },
  {
    slug: "kubernetes-imagepullbackoff",
    title: "Pod stuck in ImagePullBackOff or ErrImagePull",
    tags: [
      "Kubernetes"
    ],
    summary: "Kubernetes cannot pull the container image.",
    issue: "`kubectl get pods` shows ErrImagePull or ImagePullBackOff. Pod never starts.",
    cause: "Kubernetes cannot fetch the image. Usually: wrong image name/tag, private registry without credentials, or image was never pushed.",
    fix: [
      "Check the exact error: `kubectl describe pod <pod>` and look at Events section",
      "Verify the image exists: `docker pull <image>:<tag>` from your local machine",
      "For private registries, create a Secret: `kubectl create secret docker-registry regcred --docker-server=... --docker-username=... --docker-password=...`",
      "Reference the secret in your pod spec under `imagePullSecrets:`",
      "Check your Deployment YAML for typos in the image name or tag"
    ],
    date: "2026-06-02"
  },
  {
    slug: "kubernetes-service-not-reachable",
    title: "Service is not reachable inside the cluster",
    tags: [
      "Kubernetes"
    ],
    summary: "Pods cannot reach a Service by its DNS name or ClusterIP.",
    issue: "Pod A tries to curl `http://my-service:8080` but gets connection refused or no route to host.",
    cause: "Possible causes: Service selector does not match pod labels, wrong targetPort, no running pods backing the service, or CoreDNS issue.",
    fix: [
      "Verify the service has endpoints: `kubectl get endpoints my-service` — if empty, selector is wrong",
      "Check label match: compare `kubectl get svc my-service -o yaml` selector with `kubectl get pods --show-labels`",
      "Test DNS resolution from inside a pod: `kubectl run tmp --image=busybox --rm -it -- nslookup my-service`",
      "Verify the targetPort matches the port your app listens on inside the container",
      "Check if backing pods are Running: `kubectl get pods -l app=my-service`"
    ],
    date: "2026-06-03"
  },
  {
    slug: "kubernetes-pending-pod-no-resources",
    title: "Pod stuck in Pending — insufficient resources",
    tags: [
      "Kubernetes"
    ],
    summary: "Pod never schedules because no node has enough CPU or memory.",
    issue: "`kubectl get pods` shows STATUS: Pending for a long time. Pod never starts.",
    cause: "No node in the cluster satisfies the pod resource requests. Either requests are too high or nodes are fully booked.",
    fix: [
      'Check why it is pending: `kubectl describe pod <pod>` and read Events — look for "Insufficient cpu" or "Insufficient memory"',
      "Lower resource requests in your Deployment YAML if they are unrealistically high",
      'Check node capacity: `kubectl describe nodes | grep -A5 "Allocated resources"`',
      "Add more nodes to the cluster (or enable cluster autoscaler if on cloud)",
      "Check if any PodDisruptionBudgets or taints are blocking scheduling"
    ],
    date: "2026-06-04"
  },
  {
    slug: "kubernetes-secret-not-available-in-pod",
    title: "Secret value is empty or unavailable in pod",
    tags: [
      "Kubernetes"
    ],
    summary: "Environment variable backed by a Secret is empty inside the container.",
    issue: "You defined an env var from a Secret in your Deployment, but inside the pod the variable is empty.",
    cause: "Secret does not exist in the same namespace, key name is wrong, or Secret was not base64 encoded correctly when created manually.",
    fix: [
      "Verify the secret exists: `kubectl get secret <secret-name> -n <namespace>`",
      'Check the key: `kubectl get secret <secret-name> -o jsonpath="{.data}" | python3 -m json.tool`',
      'Decode to verify value: `kubectl get secret <secret-name> -o jsonpath="{.data.MY_KEY}" | base64 -d`',
      "Ensure namespace matches — secrets are namespace-scoped",
      "After fixing the secret, restart the deployment: `kubectl rollout restart deployment/<name>`"
    ],
    date: "2026-06-05"
  },
  {
    slug: "kubernetes-oomkilled",
    title: "Container killed with OOMKilled",
    tags: [
      "Kubernetes"
    ],
    summary: "Container keeps dying because it exceeds its memory limit.",
    issue: "`kubectl describe pod <pod>` shows `OOMKilled` in Last State. Pod restarts repeatedly.",
    cause: "The container exceeded its `resources.limits.memory` and the kernel killed it. The limit is either too low for the workload or there is a memory leak.",
    fix: [
      "Find how much memory the app actually uses: `kubectl top pods` (requires metrics-server)",
      "Increase the memory limit in your Deployment YAML — set limit slightly above peak observed usage",
      "Check for memory leaks in your application code",
      "Set both requests and limits: requests for scheduling, limits to cap runaway processes",
      "Monitor over time: `kubectl top pods --containers` to track per-container usage"
    ],
    date: "2026-06-06"
  },
  {
    slug: "kubernetes-ingress-404",
    title: "Ingress returns 404 or does not route traffic",
    tags: [
      "Kubernetes"
    ],
    summary: "Ingress is created but traffic hits 404 or goes to the wrong backend.",
    issue: "You created an Ingress resource but requests to your domain return 404.",
    cause: "Common causes: Ingress controller not installed, wrong serviceName or servicePort in Ingress YAML, missing IngressClass annotation, or host header mismatch.",
    fix: [
      "Verify ingress controller pods are running: `kubectl get pods -n ingress-nginx`",
      "Check your Ingress YAML: service name and port must exactly match the Service resource",
      "Add the correct IngressClass: `ingressClassName: nginx` (or whichever controller you use)",
      "Test without host matching first — remove the `host:` field to see if path routing works",
      "Check ingress controller logs: `kubectl logs -n ingress-nginx deploy/ingress-nginx-controller`"
    ],
    date: "2026-06-07"
  },
  {
    slug: "kubernetes-deployment-not-updating",
    title: "Deployment update not rolling out — same old pods",
    tags: [
      "Kubernetes"
    ],
    summary: "You updated the image tag but pods still run the old version.",
    issue: "`kubectl set image deployment/myapp myapp=myapp:v2` ran without error but pods are still running v1.",
    cause: "If you use `latest` tag, Kubernetes will not pull a new image because the tag has not changed — it thinks nothing changed. Or the rollout is paused/stuck.",
    fix: [
      "Never use `latest` in production — use explicit versioned tags like `myapp:1.4.2`",
      "Force re-pull for same tag (only for testing): add `imagePullPolicy: Always` to the container spec",
      "Check rollout status: `kubectl rollout status deployment/myapp`",
      "See rollout history: `kubectl rollout history deployment/myapp`",
      "If rollout is stuck, describe pods for errors: `kubectl describe pod <new-pod>`"
    ],
    date: "2026-06-08"
  },
  {
    slug: "linux-disk-full-no-space",
    title: "Disk full — no space left on device",
    tags: [
      "Linux"
    ],
    summary: 'Server throws "no space left on device" but du shows plenty of space.',
    issue: 'Writes fail with "No space left on device" but `df -h` shows only 60% used.',
    cause: "Inodes exhausted, not disk blocks. Each file uses one inode regardless of size. Thousands of tiny files (logs, temp files, mail queue) can exhaust inodes while disk space looks fine.",
    fix: [
      "Check inodes: `df -i` — if IUse% is near 100%, inodes are the problem",
      'Find directories with most files: `find / -xdev -type f | cut -d "/" -f 2 | sort | uniq -c | sort -rn | head`',
      "Common culprits: /var/spool/mail, /var/log, /tmp — clean up old files",
      'Delete old logs: `sudo journalctl --vacuum-time=7d` or `sudo find /var/log -name "*.gz" -delete`',
      "For actual disk full: find large files with `du -sh /* | sort -rh | head -20`"
    ],
    date: "2026-06-01"
  },
  {
    slug: "linux-process-wont-die",
    title: "kill command does not stop the process",
    tags: [
      "Linux"
    ],
    summary: "Process keeps running after kill. Even kill -9 does not work.",
    issue: "`kill <pid>` runs without error but the process is still listed in `ps aux`.",
    cause: "`kill` without flags sends SIGTERM which the process can ignore or handle. A zombie process cannot be killed — it is already dead, waiting for its parent to call wait(). A process in uninterruptible sleep (D state) cannot be killed until the I/O completes.",
    fix: [
      "Use SIGKILL: `kill -9 <pid>` — cannot be caught or ignored by the process",
      "Check process state first: `ps aux | grep <name>` — look at the STAT column",
      "If state is Z (zombie): kill the parent process instead",
      "If state is D (disk wait): wait for I/O to complete or check for hung NFS/disk",
      "Find PID by name: `pgrep -l nginx` or `pidof nginx`"
    ],
    date: "2026-06-02"
  },
  {
    slug: "linux-ssh-permission-denied",
    title: "SSH: Permission denied (publickey)",
    tags: [
      "Linux"
    ],
    summary: "SSH login fails with publickey error even with correct key.",
    issue: "`ssh user@host` returns: `Permission denied (publickey,gssapi-keyex,gssapi-with-mic)`",
    cause: "SSH key not added to authorized_keys, wrong permissions on .ssh directory, or sshd not accepting the key type.",
    fix: [
      "Check .ssh directory permissions on the server: `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`",
      "Verify your public key is in authorized_keys: `cat ~/.ssh/authorized_keys`",
      "Add your key: `ssh-copy-id -i ~/.ssh/id_rsa.pub user@host`",
      "Check sshd config allows pubkey: `grep PubkeyAuthentication /etc/ssh/sshd_config` should be `yes`",
      "Debug with verbose mode: `ssh -vvv user@host` and look at which keys are tried"
    ],
    date: "2026-06-03"
  },
  {
    slug: "linux-high-cpu-process-not-visible",
    title: "High CPU but no obvious process in top",
    tags: [
      "Linux"
    ],
    summary: "Server is slow and CPU is high but top does not show the culprit.",
    issue: "`top` shows overall CPU at 90%+ but no single process shows high usage. Server is sluggish.",
    cause: "CPU may be spent in kernel/system time (si, sy columns), many short-lived processes spawning too fast to catch, or a process running as a different user not visible with your permissions.",
    fix: [
      "Check kernel vs user CPU split in top: press `1` to see per-core breakdown",
      "High `sy` (system) means kernel work — check for many syscalls: `strace -p <pid>`",
      "Catch short-lived processes: `ps -eo pid,ppid,cmd,%cpu --sort=-%cpu | head -20`",
      "Check if iowait is the real culprit (CPU waiting on disk): look at `wa` in top",
      "Use `perf top` for real-time kernel profiling on what is consuming CPU cycles"
    ],
    date: "2026-06-04"
  },
  {
    slug: "linux-cron-job-not-running",
    title: "Cron job not running as expected",
    tags: [
      "Linux"
    ],
    summary: "Cron entry looks correct but the job never runs.",
    issue: "You added a crontab entry but the script never executes at the scheduled time.",
    cause: "Common causes: wrong cron syntax, script not executable, PATH is different in cron environment (no /usr/local/bin etc.), or output silently failing because cron has no mail configured.",
    fix: [
      "Verify cron syntax at crontab.guru — paste your expression",
      "Make script executable: `chmod +x /path/to/script.sh`",
      "Redirect output to a log to capture errors: `* * * * * /path/script.sh >> /tmp/cron.log 2>&1`",
      "Use absolute paths inside the script — cron has a minimal PATH",
      "Check cron logs: `grep CRON /var/log/syslog | tail -20`",
      "Test the script manually as the cron user: `sudo -u www-data /path/script.sh`"
    ],
    date: "2026-06-05"
  },
  {
    slug: "linux-port-already-in-use",
    title: "Port already in use — cannot start service",
    tags: [
      "Linux"
    ],
    summary: "Service fails to start because another process holds the port.",
    issue: 'Starting nginx/node/app fails with "address already in use" for port 80 or 3000.',
    cause: "Another process is already listening on that port. Could be a zombie process, a previous instance that did not clean up, or a conflicting service.",
    fix: [
      "Find what is using the port: `sudo ss -tlnp | grep :3000`",
      "Or: `sudo lsof -i :3000`",
      "Kill the conflicting process: `sudo kill -9 <pid>`",
      "If it is a systemd service: `sudo systemctl stop <service-name>`",
      "For nginx: check if another nginx instance is already running: `ps aux | grep nginx`"
    ],
    date: "2026-06-06"
  },
  {
    slug: "linux-file-permission-denied-root",
    title: "Permission denied even as root",
    tags: [
      "Linux"
    ],
    summary: "Even with sudo you cannot write to a file.",
    issue: '`sudo echo "config" > /etc/myapp.conf` returns permission denied.',
    cause: "The shell redirect `>` runs as your user, not root. sudo only elevates the `echo` command — the redirect is handled before sudo takes effect. Also, file might have immutable flag set.",
    fix: [
      'Use tee instead: `echo "config" | sudo tee /etc/myapp.conf`',
      "Or use sudo sh: `sudo sh -c 'echo \"config\" > /etc/myapp.conf'`",
      "Check for immutable flag: `lsattr /etc/myapp.conf` — if it shows `i`, run `sudo chattr -i /etc/myapp.conf`",
      "Check SELinux context if on RHEL/CentOS: `ls -Z /etc/myapp.conf`"
    ],
    date: "2026-06-07"
  },
  {
    slug: "linux-load-average-high",
    title: "Load average is high but CPU usage is low",
    tags: [
      "Linux"
    ],
    summary: "top shows load average of 20+ but CPUs are mostly idle.",
    issue: "Server feels slow. `uptime` shows load average 25. But `top` shows CPU at only 15% usage.",
    cause: "Load average counts both CPU-bound and I/O-waiting processes. High load + low CPU = I/O bottleneck. Processes are queuing, waiting for disk or network reads to complete.",
    fix: [
      "Confirm it is I/O: check `wa` (iowait) column in `top` — if high, disks are the bottleneck",
      "Find what is hammering disk: `iotop -o` (shows only active I/O processes)",
      "Check disk health: `iostat -xz 1` — look at `%util` and `await` columns",
      "Check for a runaway database query or log-write loop",
      "If NFS mounted: check if NFS server is slow or unreachable"
    ],
    date: "2026-06-08"
  },
  {
    slug: "nginx-502-bad-gateway",
    title: "Nginx returns 502 Bad Gateway",
    tags: [
      "Nginx"
    ],
    summary: "Nginx is running but proxying to your app returns 502.",
    issue: "`curl localhost` returns 502 Bad Gateway.",
    cause: "Nginx cannot reach the upstream app. Either the app is down, listening on wrong port, or proxy_pass address is wrong.",
    fix: [
      "Check if your app is running: `systemctl status myapp` or `docker ps`",
      "Verify app is listening: `ss -tlnp | grep 3000`",
      "Test upstream directly: `curl http://localhost:3000`",
      "Read nginx error log: `sudo tail -f /var/log/nginx/error.log`",
      "If using Docker: ensure the app container and nginx can reach each other (same network or use host IP)"
    ],
    date: "2026-06-01"
  },
  {
    slug: "nginx-ssl-cert-not-found",
    title: "Nginx fails to start: SSL cert file not found",
    tags: [
      "Nginx",
      "SSL"
    ],
    summary: "nginx -t fails because cert paths in config do not exist yet.",
    issue: "`sudo nginx -t` gives: `cannot load certificate .../fullchain.pem: No such file or directory`",
    cause: "Your nginx.conf references Let's Encrypt cert paths but certbot has not run yet.",
    fix: [
      "First use a plain HTTP nginx config with no SSL blocks",
      "Run certbot: `sudo certbot --nginx -d yourdomain.com`",
      "Certbot will update your nginx config automatically with correct cert paths",
      "Reload: `sudo systemctl reload nginx`"
    ],
    date: "2026-06-02"
  },
  {
    slug: "nginx-413-request-entity-too-large",
    title: "413 Request Entity Too Large on file upload",
    tags: [
      "Nginx"
    ],
    summary: "File uploads fail with 413 error.",
    issue: "Users trying to upload files get 413 Request Entity Too Large.",
    cause: "Nginx has a default `client_max_body_size` of 1MB. Any upload larger than this is rejected before it reaches your app.",
    fix: [
      "Increase the limit in nginx.conf inside the `server` or `location` block: `client_max_body_size 50M;`",
      "Reload nginx: `sudo systemctl reload nginx`",
      'Also check if your app framework has its own body size limit (Express: `express.json({ limit: "50mb" })`)'
    ],
    date: "2026-06-03"
  },
  {
    slug: "nginx-redirect-loop",
    title: "ERR_TOO_MANY_REDIRECTS — redirect loop",
    tags: [
      "Nginx"
    ],
    summary: "Browser shows too many redirects when hitting the site.",
    issue: 'Opening the site gives "ERR_TOO_MANY_REDIRECTS" in the browser.',
    cause: "Usually happens when nginx redirects HTTP to HTTPS but the upstream app also redirects, or when the proxy_pass and server_name create a loop.",
    fix: [
      "Check your server blocks for conflicting redirect rules",
      "If using `return 301 https://...` in the HTTP block, make sure the HTTPS block does NOT also redirect",
      "Pass the scheme to the upstream app: `proxy_set_header X-Forwarded-Proto $scheme;`",
      "If your app redirects based on protocol header, trust the nginx forwarded header, not the raw connection",
      "Test with `curl -I http://yourdomain.com` and follow each hop to find where the loop starts"
    ],
    date: "2026-06-04"
  },
  {
    slug: "nginx-config-test-fails",
    title: "nginx -t fails with cryptic emerg error",
    tags: [
      "Nginx"
    ],
    summary: "nginx config test throws emerg error and nginx will not reload.",
    issue: '`sudo nginx -t` shows: `nginx: [emerg] unknown directive "server_namee"` or similar.',
    cause: "Syntax error in the config file — typo in a directive name, missing semicolon, unclosed bracket, or a corrupt file from copy-paste.",
    fix: [
      "Read the exact error — it includes file path and line number",
      "Open the file: `sudo nano /etc/nginx/sites-available/mysite`",
      "Common errors: missing `;` at end of line, unclosed `{`, typo in directive name",
      "Validate with: `sudo nginx -t 2>&1` — piping stderr helps see full output",
      "Start from a minimal working config and add blocks one at a time to find the bad section"
    ],
    date: "2026-06-05"
  },
  {
    slug: "nginx-connection-refused-on-443",
    title: "Connection refused on port 443 (HTTPS)",
    tags: [
      "Nginx",
      "SSL"
    ],
    summary: "HTTP works but HTTPS gives connection refused.",
    issue: "`curl https://yourdomain.com` gives: `curl: (7) Failed to connect to yourdomain.com port 443`",
    cause: "Nginx is not listening on port 443. Either the SSL server block is missing, nginx is not reloaded after adding it, or firewall blocks 443.",
    fix: [
      "Check what ports nginx listens on: `sudo ss -tlnp | grep nginx`",
      "Verify your nginx config has a `listen 443 ssl;` block",
      "Reload nginx after config changes: `sudo systemctl reload nginx`",
      "Open port in firewall: `sudo ufw allow 443` or the equivalent for your cloud security group",
      "Check certbot ran successfully and cert files exist at the referenced paths"
    ],
    date: "2026-06-06"
  },
  {
    slug: "nginx-upstream-timed-out",
    title: "Nginx 504 Gateway Timeout",
    tags: [
      "Nginx"
    ],
    summary: "Slow requests result in 504 from nginx before the app responds.",
    issue: "Some requests return 504 Gateway Timeout after 60 seconds.",
    cause: "The upstream app is taking longer than nginx's `proxy_read_timeout` (default 60s) to respond.",
    fix: [
      "Increase timeout in nginx config: `proxy_read_timeout 120s;` inside the location block",
      "Also set: `proxy_connect_timeout 60s;` and `proxy_send_timeout 60s;`",
      "Reload nginx: `sudo systemctl reload nginx`",
      "Investigate why the app is slow — the timeout is a workaround, not a fix",
      "Add request tracing to find slow database queries or external API calls"
    ],
    date: "2026-06-07"
  },
  {
    slug: "nginx-static-files-404",
    title: "Static files return 404 through nginx",
    tags: [
      "Nginx"
    ],
    summary: "CSS, JS, or image files return 404 when served via nginx.",
    issue: "HTML loads but all linked CSS and JS return 404.",
    cause: "The `root` or `alias` path in the nginx config points to the wrong directory, or the location block for static files is missing.",
    fix: [
      "Check the `root` directive in your nginx server block — it must point to the directory containing static files",
      "If serving from `/public`: `root /var/www/myapp/public;`",
      "Add explicit location for static extensions if needed: `location ~* \\.(css|js|png)$ { root /var/www/myapp/public; }`",
      "Verify file actually exists on disk at the expected path",
      "Check nginx access log to see exact path being requested: `sudo tail -f /var/log/nginx/access.log`"
    ],
    date: "2026-06-08"
  },
  {
    slug: "cicd-pipeline-passes-prod-broken",
    title: "Pipeline passes but production is broken",
    tags: [
      "CI/CD"
    ],
    summary: "All CI tests go green but the deployed app crashes in production.",
    issue: "CI pipeline passes every check. Deployment goes through. Production serves 500 errors.",
    cause: "Tests pass against mocked dependencies. Real production has different env vars, live database schema, secrets that differ from test values, or the deploy target has different OS/package versions.",
    fix: [
      "Run integration tests against a real database, not mocks",
      "Add a smoke test stage after deployment — curl a health endpoint: `curl -f https://yourapp.com/health`",
      "Use the same base Docker image in CI and production",
      "Check if a missing env var in production is causing the crash",
      "Add a rollback step: if smoke test fails, automatically redeploy previous version"
    ],
    date: "2026-06-01"
  },
  {
    slug: "cicd-slow-builds",
    title: "CI builds are very slow — taking 15-20 minutes",
    tags: [
      "CI/CD"
    ],
    summary: "Pipeline takes too long, blocking developer feedback.",
    issue: "Every PR triggers a 20-minute CI run. Team is slowing down.",
    cause: "Deps installed fresh every run, no Docker layer cache, tests not parallelised, or building when only docs changed.",
    fix: [
      "Cache dependencies: most CI systems support caching node_modules or pip based on lock file hash",
      "Use Docker build cache or a layer cache (e.g. GitHub Actions cache for Docker layers)",
      "Parallelise test suites across multiple workers",
      "Add path filters: skip CI for changes to docs/, README, or non-code files",
      "Profile what is slow: add `time` before expensive steps to find the bottleneck"
    ],
    date: "2026-06-02"
  },
  {
    slug: "cicd-secret-exposed-in-logs",
    title: "Secret accidentally printed in CI logs",
    tags: [
      "CI/CD"
    ],
    summary: "A token or password appears in plain text in the pipeline output.",
    issue: "Running a build command printed `DB_PASSWORD=mysecret` in the CI log that is visible to all team members.",
    cause: "The command echoed env vars (e.g. `set -x` in shell scripts, verbose build tools), or the secret was passed as a CLI argument rather than an env var.",
    fix: [
      "Rotate the exposed secret immediately — treat it as compromised",
      "Remove `set -x` from shell scripts that run in CI",
      "Pass secrets as environment variables, never as CLI arguments",
      "Use your CI system's secret masking — most platforms auto-mask registered secrets in logs",
      'Audit your scripts: `grep -r "echo.*SECRET" .` to find accidental prints'
    ],
    date: "2026-06-03"
  },
  {
    slug: "cicd-deploy-overwrites-running-traffic",
    title: "Deployment causes downtime — requests drop during rollout",
    tags: [
      "CI/CD"
    ],
    summary: "Every deployment causes a brief outage as the old container is replaced.",
    issue: "Users see errors or connection resets for 10-20 seconds during every deployment.",
    cause: "Old container is stopped before the new one is ready. No graceful handoff of traffic.",
    fix: [
      "Use rolling deployments — start new instance before killing old one",
      "On Kubernetes: configure `RollingUpdate` strategy with `maxUnavailable: 0`",
      "With Docker on a single host: use a blue-green approach — run both containers, switch nginx upstream, then stop old one",
      "Add health check to new container and wait for it to pass before routing traffic",
      "Configure nginx upstream with keepalive and `proxy_next_upstream error timeout`"
    ],
    date: "2026-06-04"
  },
  {
    slug: "cicd-environment-variable-not-set",
    title: "Pipeline fails: environment variable not set",
    tags: [
      "CI/CD"
    ],
    summary: "Build script errors because a required env var is undefined in CI.",
    issue: "`CI: Required env var STRIPE_KEY not set` — build fails but works locally.",
    cause: "The variable is in your local `.env` file (not committed) but not added to the CI platform secrets.",
    fix: [
      "Add the secret to your CI platform: GitHub Actions Secrets, GitLab CI Variables, or Jenkins Credentials",
      "Reference it in the pipeline YAML: `env: STRIPE_KEY: ${{ secrets.STRIPE_KEY }}`",
      "Add a validation step at the top of your pipeline: fail fast if required vars are missing",
      "Never commit .env files — use .env.example to document required variables"
    ],
    date: "2026-06-05"
  },
  {
    slug: "cicd-merge-conflict-blocks-pipeline",
    title: "Stale branch causes pipeline failures not related to your change",
    tags: [
      "CI/CD"
    ],
    summary: "Your PR fails tests that your change did not touch.",
    issue: "Your PR adds a login feature. CI fails a payment test. Your code did not touch payments.",
    cause: "Your branch is behind main. Someone else's merged change broke the payment tests. Now your CI picks up their broken code too.",
    fix: [
      "Rebase or merge main into your branch before pushing",
      "Enable branch protection: require branches to be up to date before merging",
      "Set up CI to always run against the merge result, not just your branch tip",
      "Communicate with the team about failing tests on main — fix main first"
    ],
    date: "2026-06-06"
  },
  {
    slug: "cicd-docker-push-auth-failed",
    title: "docker push fails with authentication required in CI",
    tags: [
      "CI/CD",
      "Docker"
    ],
    summary: "Pipeline cannot push image to registry — auth error.",
    issue: "CI step `docker push myregistry/myapp:v1` fails: `unauthorized: authentication required`",
    cause: "The CI runner is not logged into the registry. Credentials either not set or incorrectly referenced.",
    fix: [
      "Add a login step before push: `docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY`",
      "Store credentials as CI secrets, not hardcoded in the YAML",
      "For ECR (AWS): use `aws ecr get-login-password | docker login --username AWS --password-stdin <registry>`",
      "For GCR: use `gcloud auth configure-docker` or a service account key",
      "Verify the secret names match what your YAML references exactly (case-sensitive)"
    ],
    date: "2026-06-07"
  },
  {
    slug: "cicd-rollback-no-previous-version",
    title: "Need to rollback but no previous version available",
    tags: [
      "CI/CD"
    ],
    summary: "Production is broken but you cannot rollback because old image was overwritten.",
    issue: "Production deploy broke. You try to rollback but the previous image was tagged `latest` and is gone.",
    cause: "Using mutable tags like `latest` means every push overwrites the previous image. You cannot go back.",
    fix: [
      "Always tag images with immutable identifiers: git commit SHA (`myapp:abc1234`) or semver (`myapp:1.4.2`)",
      "Keep at least the last 5 image versions in your registry",
      "Store the deployed image tag in your CD pipeline output or deployment record",
      "Rollback command: `kubectl set image deployment/myapp myapp=myapp:abc1233` (previous SHA)",
      "Automate rollback: if smoke test fails post-deploy, re-deploy the previous tag automatically"
    ],
    date: "2026-06-08"
  },
  {
    slug: "aws-ec2-cannot-connect-ssh",
    title: "Cannot SSH into EC2 instance",
    tags: [
      "AWS"
    ],
    summary: "SSH connection to EC2 times out or is refused.",
    issue: "`ssh -i mykey.pem ec2-user@<ip>` hangs or gives connection refused.",
    cause: "Security group does not allow port 22, wrong key pair, wrong username, or instance is in a private subnet with no route to internet.",
    fix: [
      "Check Security Group inbound rules — port 22 must allow your IP or 0.0.0.0/0",
      "Verify correct username for the AMI: `ec2-user` (Amazon Linux), `ubuntu` (Ubuntu), `admin` (Debian)",
      "Check key pair: must use the .pem file used when the instance was launched",
      "Verify instance has a public IP (or use a bastion host if in private subnet)",
      'Check instance status in Console — it must be in "running" state and pass status checks'
    ],
    date: "2026-06-01"
  },
  {
    slug: "aws-s3-403-access-denied",
    title: "S3 returns 403 Access Denied",
    tags: [
      "AWS"
    ],
    summary: "Reading or writing to S3 fails with 403 even though permissions look right.",
    issue: "`aws s3 cp file.txt s3://mybucket/` returns: `upload failed: An error occurred (AccessDenied)`",
    cause: 'IAM policy does not grant the required s3:PutObject permission, bucket policy explicitly denies, or "Block Public Access" settings are blocking the operation.',
    fix: [
      "Check IAM policy attached to your user/role includes `s3:GetObject` / `s3:PutObject` for the bucket ARN",
      "Check bucket policy for explicit Deny statements — they override IAM allows",
      'If accessing publicly: check "Block Public Access" settings in S3 console',
      "Test with AWS Policy Simulator: IAM console > Policy Simulator — test your actions",
      "Check the bucket region matches your CLI config: `aws s3 ls s3://mybucket --region eu-west-1`"
    ],
    date: "2026-06-02"
  },
  {
    slug: "aws-rds-connection-timeout",
    title: "Application cannot connect to RDS",
    tags: [
      "AWS"
    ],
    summary: "App gets connection timeout when connecting to RDS database.",
    issue: 'App throws: `could not connect to server: Connection timed out — Is the server running on host "mydb.xxx.rds.amazonaws.com"`',
    cause: "RDS security group does not allow inbound traffic from the app server, or RDS is in a private subnet the app cannot reach.",
    fix: [
      "Check RDS security group — it must allow inbound on port 5432 (Postgres) or 3306 (MySQL) from the app's security group or IP",
      "Ensure both app and RDS are in the same VPC, or VPC peering is configured",
      "RDS should be in private subnets — app accesses it via VPC, not public internet",
      "Test connectivity from app server: `nc -zv mydb.xxx.rds.amazonaws.com 5432`",
      'Check RDS instance is in "Available" state in the console'
    ],
    date: "2026-06-03"
  },
  {
    slug: "aws-lambda-timeout",
    title: "Lambda function times out",
    tags: [
      "AWS"
    ],
    summary: "Lambda hits timeout limit and never completes the task.",
    issue: "Lambda function returns: `Task timed out after 3.00 seconds`",
    cause: "Default Lambda timeout is 3 seconds. If your function does DB queries, calls external APIs, or processes large files, it exceeds this limit.",
    fix: [
      "Increase timeout in Lambda console (Configuration > General configuration) — max is 15 minutes",
      "Profile what is slow inside the function — add timestamps around each operation",
      "Move heavy processing to a background job (SQS + Lambda consumer) instead of synchronous",
      "For very long tasks: use Step Functions or ECS Fargate instead of Lambda",
      "Set timeout to expected duration + 20% buffer, not the maximum"
    ],
    date: "2026-06-04"
  },
  {
    slug: "aws-iam-assume-role-failed",
    title: "AWS assume role fails with AccessDenied",
    tags: [
      "AWS"
    ],
    summary: "Cross-account or service assume-role call is denied.",
    issue: "`aws sts assume-role --role-arn arn:aws:iam::123:role/MyRole` returns AccessDenied.",
    cause: "The IAM entity calling AssumeRole is not listed in the role's trust policy, or the entity's permission policy does not include `sts:AssumeRole`.",
    fix: [
      "Check the target role's Trust Policy — the calling account/user/service must be in `Principal`",
      "Check the caller's IAM policy includes `sts:AssumeRole` for the target role ARN",
      "If cross-account: both the trust policy (in target account) and the permission policy (in source account) must be set",
      "Verify you are using the correct role ARN (exact match, no typos)",
      "Use CloudTrail to see the exact denied API call and which policy blocked it"
    ],
    date: "2026-06-05"
  },
  {
    slug: "aws-alb-504-timeout",
    title: "ALB returns 504 Gateway Timeout",
    tags: [
      "AWS"
    ],
    summary: "Application Load Balancer returns 504 for slow requests.",
    issue: "Some requests hitting the ALB return 504 after 60 seconds.",
    cause: "ALB idle timeout (default 60s) is shorter than your app's response time. ALB closes the connection before the backend finishes.",
    fix: [
      "Increase ALB idle timeout: EC2 console > Load Balancers > your ALB > Attributes > Idle timeout",
      "Set it slightly above your slowest expected response time",
      "Also check if your target group health check is failing — unhealthy targets get 502/504",
      "Profile your app to reduce response time for slow endpoints",
      "For very long operations: return 202 Accepted immediately and process asynchronously"
    ],
    date: "2026-06-06"
  },
  {
    slug: "aws-cloudwatch-logs-not-appearing",
    title: "Logs not appearing in CloudWatch",
    tags: [
      "AWS"
    ],
    summary: "Application logs not showing up in CloudWatch Log Groups.",
    issue: "Your app is running on EC2/ECS but no logs appear in CloudWatch.",
    cause: "CloudWatch agent not installed or configured, IAM role missing `logs:PutLogEvents` permission, or wrong log group name.",
    fix: [
      "For EC2: install and configure the CloudWatch agent — `sudo yum install amazon-cloudwatch-agent`",
      "For ECS: add `awslogs` log driver in task definition",
      "Check IAM role has: `logs:CreateLogGroup`, `logs:CreateLogStream`, `logs:PutLogEvents`",
      "Verify the log group exists in the same region as your service",
      "Check agent status: `sudo systemctl status amazon-cloudwatch-agent`"
    ],
    date: "2026-06-07"
  },
  {
    slug: "aws-ec2-high-cost-unexpected",
    title: "Unexpected high AWS bill from EC2",
    tags: [
      "AWS"
    ],
    summary: "AWS bill is much higher than expected due to EC2 usage.",
    issue: "Monthly bill shows EC2 charges 5x higher than budgeted.",
    cause: "Forgotten running instances (especially in non-default regions), data transfer charges, using On-Demand when Reserved would be cheaper, or NAT Gateway data charges.",
    fix: [
      "Enable AWS Cost Explorer and look at usage by service and region",
      "Check ALL regions for running instances — use AWS Config or Trusted Advisor",
      "Set up billing alerts: Budgets console > create budget with alert at 80% of expected",
      "Stop/terminate instances not in use — stopped instances still pay for EBS storage",
      "Data transfer: traffic out of AWS costs money — check NAT Gateway charges separately",
      "For predictable workloads: switch to Reserved Instances or Savings Plans (up to 72% cheaper)"
    ],
    date: "2026-06-08"
  },
  {
    slug: "git-accidentally-committed-secret",
    title: "Secret accidentally committed to Git",
    tags: [
      "Git"
    ],
    summary: "API key or password committed to the repo — need to remove it from history.",
    issue: "You committed and pushed a file containing `AWS_SECRET=AKIAIOSFODNN7...` to GitHub.",
    cause: ".env or config file was not in .gitignore and was accidentally staged and committed.",
    fix: [
      "FIRST: rotate the secret immediately — assume it is compromised",
      "Remove from history: `git filter-repo --path .env --invert-paths` (install git-filter-repo)",
      "Force push the cleaned history: `git push --force --all`",
      "Add to .gitignore: `.env`, `*.pem`, `credentials.json`",
      "Use pre-commit hooks or tools like `gitleaks` to scan for secrets before every commit",
      "If pushed to a public repo: GitHub will likely alert you via their secret scanning feature"
    ],
    date: "2026-06-01"
  },
  {
    slug: "git-detached-head",
    title: "Stuck in detached HEAD state",
    tags: [
      "Git"
    ],
    summary: 'git status shows "HEAD detached" and commits seem to disappear.',
    issue: '`git status` shows "HEAD detached at abc1234". Commits you make seem to vanish.',
    cause: "You checked out a specific commit hash or tag instead of a branch. Git is now not on any branch — commits are made but not reachable via any branch name.",
    fix: [
      "To go back to a branch: `git checkout main` (or master/your branch name)",
      "To save your work: create a branch from the detached state: `git checkout -b my-work`",
      "To see what HEAD is: `git log --oneline -5`",
      "Commits in detached HEAD are not lost immediately — git gc will clean them up after 30 days"
    ],
    date: "2026-06-02"
  },
  {
    slug: "git-merge-conflict-resolution",
    title: "Merge conflict blocks PR merge",
    tags: [
      "Git"
    ],
    summary: "PR cannot be merged due to conflicts with the target branch.",
    issue: 'GitHub shows "This branch has conflicts that must be resolved" and the merge button is disabled.',
    cause: "Same lines were changed in both the source branch and the target branch (e.g. main).",
    fix: [
      "Pull the latest target branch: `git fetch origin && git checkout main && git pull`",
      "Merge target into your branch: `git checkout my-feature && git merge main`",
      "Open conflicting files — look for `<<<<<<`, `=======`, `>>>>>>>` markers",
      "Edit the file to keep the correct code, remove the conflict markers",
      "Stage resolved files: `git add <file>` then `git commit`",
      "Push and the PR conflict should clear"
    ],
    date: "2026-06-03"
  },
  {
    slug: "git-revert-pushed-commit",
    title: "Need to undo a commit already pushed to main",
    tags: [
      "Git"
    ],
    summary: "Bad commit was merged to main — need to remove it without rewriting history.",
    issue: "A bad change was pushed to main. Force-push is not allowed. Need to undo it safely.",
    cause: "The commit introduced a bug or broke production.",
    fix: [
      "Use `git revert` — it creates a new commit that undoes the change, safe for shared branches",
      "`git revert <commit-sha>` — creates the inverse commit",
      "Push normally: `git push origin main`",
      "If the commit is a merge commit: `git revert -m 1 <merge-commit-sha>`",
      "Do NOT use `git reset --hard` on shared branches — it rewrites history and breaks other developers"
    ],
    date: "2026-06-04"
  },
  {
    slug: "git-large-file-push-rejected",
    title: "Push rejected: file too large",
    tags: [
      "Git"
    ],
    summary: "git push fails because a large file was committed.",
    issue: "`git push` fails: `remote: error: File data/model.bin is 210.00 MB; exceeds GitHub maximum file size of 100.00 MB`",
    cause: "A large binary or data file was committed to the repo. GitHub/GitLab reject files over 100MB.",
    fix: [
      "Remove the file from the last commit without losing your other changes: `git rm --cached data/model.bin && git commit --amend`",
      "If the file is in multiple commits: use `git filter-repo --path data/model.bin --invert-paths`",
      "Add the file type to .gitignore to prevent future accidents",
      'For large files you need to version: use Git LFS (`git lfs track "*.bin"`)',
      "For datasets and models: use cloud storage (S3) and reference by URL instead of committing"
    ],
    date: "2026-06-05"
  },
  {
    slug: "git-wrong-branch-commit",
    title: "Committed to main instead of feature branch",
    tags: [
      "Git"
    ],
    summary: "Accidentally committed directly to main (or wrong branch).",
    issue: "You ran `git commit` and `git push` but forgot to switch to your feature branch first.",
    cause: "Committed while on main. If not yet pushed, easy to fix. If pushed to a protected branch, need git revert.",
    fix: [
      "If NOT yet pushed: `git reset HEAD~1` to undo the commit while keeping changes, then switch branches and recommit",
      "If pushed to main: use `git revert <sha>` to create an undo commit and push it",
      "Move the changes to the right branch: `git stash` after reset, then `git checkout feature-branch && git stash pop`",
      "Prevent future accidents: enable branch protection rules on main to require PRs"
    ],
    date: "2026-06-06"
  },
  {
    slug: "git-history-diverged",
    title: "Branches have diverged — push rejected",
    tags: [
      "Git"
    ],
    summary: "git push rejected because remote has commits your local branch does not.",
    issue: "`git push` fails: `rejected — non-fast-forward: Updates were rejected because the remote contains work that you do not have locally`",
    cause: "Someone else pushed to the same branch, or you pushed from another machine. Your local branch is behind the remote.",
    fix: [
      "Pull first: `git pull --rebase origin main` (rebase keeps history linear)",
      "Or: `git pull origin main` (creates a merge commit)",
      "Resolve any conflicts that arise, then push again",
      "Do NOT use `git push --force` unless you are the only one on that branch — it overwrites others' work",
      "Use `--force-with-lease` if you must force push: safer, fails if someone else pushed"
    ],
    date: "2026-06-07"
  },
  {
    slug: "git-submodule-not-cloned",
    title: "Submodule directory is empty after git clone",
    tags: [
      "Git"
    ],
    summary: "After cloning a repo, submodule folders are empty.",
    issue: "You cloned a repo. A folder like `vendor/somelib` exists but is empty. Code fails to build.",
    cause: "Git submodules are not automatically cloned. You need an extra step to fetch their content.",
    fix: [
      "Initialize and fetch submodules: `git submodule update --init --recursive`",
      "Or clone with submodules from the start: `git clone --recurse-submodules <url>`",
      "To update submodules to their latest commit: `git submodule update --remote`",
      "Check registered submodules: `cat .gitmodules`"
    ],
    date: "2026-06-08"
  }
], Pe = [
  {
    slug: "netflix-architecture",
    title: "Netflix System Architecture",
    icon: "NETFLIX",
    tag: "MICROSERVICES",
    difficulty: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80",
    desc: "How Netflix serves 270M users across 190 countries. Microservices, Chaos Engineering, multi-region active-active, and the Zuul API gateway that handles 2M requests per second.",
    components: [
      "Route53",
      "Zuul API Gateway",
      "Eureka (Service Discovery)",
      "Hystrix (Circuit Breaker)",
      "Apache Kafka",
      "Cassandra",
      "EVCache (Memcached)",
      "Chaos Monkey"
    ]
  },
  {
    slug: "spotify-architecture",
    title: "Spotify Engineering Architecture",
    icon: "SPOTIFY",
    tag: "PLATFORM",
    difficulty: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=600&q=80",
    desc: "How Spotify scaled to 600M users with the Squad model, Backstage developer portal, GCP-native infrastructure, and the Confidence CI/CD platform that deploys 250 times a day.",
    components: [
      "GCP GKE",
      "Backstage (Dev Portal)",
      "Confidence (CI/CD)",
      "Apache Beam (Data)",
      "BigQuery",
      "Pub/Sub",
      "Flink",
      "Backend for Frontend (BFF)"
    ]
  },
  {
    slug: "4-tier-production-aws",
    title: "4-Tier Production App: DNS to Database",
    icon: "AWS",
    tag: "AWS",
    difficulty: "Intermediate",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    desc: "Complete end-to-end production architecture: DNS resolution to database writes. Route53 to CloudFront to WAF to ALB to EKS to PostgreSQL. The blueprint most funded startups run in production.",
    components: [
      "Route53 (DNS)",
      "CloudFront (CDN)",
      "AWS WAF",
      "ALB (Load Balancer)",
      "EKS (App Tier)",
      "RDS PostgreSQL",
      "ElastiCache Redis",
      "S3 + SQS"
    ]
  },
  {
    slug: "4-tier-service-mesh",
    title: "4-Tier with Service Mesh and Observability",
    icon: "K8S",
    tag: "KUBERNETES",
    difficulty: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80",
    desc: "Production-grade 4-tier setup with a service mesh layer: DNS to Ingress to Istio to microservices. Full observability with Prometheus, Grafana, Jaeger tracing, and OpenTelemetry from day one.",
    components: [
      "Route53 (DNS)",
      "Traefik / NGINX Ingress",
      "Istio Service Mesh (mTLS)",
      "Kubernetes Microservices",
      "Prometheus + Grafana",
      "Jaeger (Tracing)",
      "OpenTelemetry Collector",
      "ELK Stack"
    ]
  },
  {
    slug: "serverless-aws",
    title: "Serverless Architecture on AWS",
    icon: "AWS",
    tag: "AWS",
    difficulty: "Beginner",
    thumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&q=80",
    desc: "Event-driven app with Lambda, API Gateway, and DynamoDB. Zero server management, infinite scale on demand.",
    components: [
      "API Gateway",
      "Lambda",
      "DynamoDB",
      "S3",
      "SQS",
      "SNS",
      "CloudWatch"
    ]
  },
  {
    slug: "multi-region-dr",
    title: "Multi-Region Disaster Recovery",
    icon: "DR",
    tag: "AWS",
    difficulty: "Advanced",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    desc: "Active-passive DR across two AWS regions with RTO under 30 minutes. The question that separates senior engineers.",
    components: [
      "Route53 Failover",
      "RDS Cross-Region Replica",
      "S3 Replication",
      "AMI Copy",
      "CloudFormation StackSets"
    ]
  }
], je = "http://localhost:8080";
function pt() {
  const [g, l] = R(window.location.pathname);
  X(() => {
    const i = () => l(window.location.pathname);
    return window.addEventListener("popstate", i), () => window.removeEventListener("popstate", i);
  }, []);
  const n = (i, b) => {
    i.preventDefault(), window.history.pushState(null, "", b), l(b);
  };
  if (g.startsWith("/fixes")) {
    const i = g.replace(/^\/fixes\/?/, "");
    return i ? /* @__PURE__ */ t.jsx(yt, { slug: i, onNavigate: n }) : /* @__PURE__ */ t.jsx(ft, { onNavigate: n });
  }
  if (g.startsWith("/stories")) {
    const i = g.replace(/^\/stories\/?/, "");
    return i ? /* @__PURE__ */ t.jsx(vt, { slug: i, onNavigate: n }) : /* @__PURE__ */ t.jsx(bt, { onNavigate: n });
  }
  if (g.startsWith("/architectures")) {
    const i = g.replace(/^\/architectures\/?/, "");
    return i ? /* @__PURE__ */ t.jsx(xt, { slug: i, onNavigate: n }) : /* @__PURE__ */ t.jsx(kt, { onNavigate: n });
  }
  return null;
}
function ft({ onNavigate: g }) {
  const [l, n] = R(""), [i, b] = R(null), p = Ae(() => {
    const o = /* @__PURE__ */ new Set();
    return Q.forEach((h) => h.tags.forEach((C) => o.add(C))), [...o];
  }, []), w = Ae(() => {
    const o = l.toLowerCase().trim();
    return Q.filter((h) => o ? (h.title + " " + h.summary + " " + h.tags.join(" ")).toLowerCase().includes(o) : i ? h.tags.includes(i) : !0);
  }, [l, i]);
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    /* @__PURE__ */ t.jsx("section", { className: "fl-hero", children: /* @__PURE__ */ t.jsxs("div", { className: "fl-hero-inner", children: [
      /* @__PURE__ */ t.jsx("h1", { children: "Production Fixes" }),
      /* @__PURE__ */ t.jsx("p", { children: "Real issues from real deployments. Each fix is tagged by tool so you can find what you need fast." }),
      /* @__PURE__ */ t.jsxs("div", { className: "fl-search-wrap", children: [
        /* @__PURE__ */ t.jsx(
          "input",
          {
            type: "text",
            className: "fl-search",
            placeholder: "Search fixes... e.g. 502, permission denied, OOMKilled",
            autoComplete: "off",
            value: l,
            onChange: (o) => n(o.target.value)
          }
        ),
        /* @__PURE__ */ t.jsx("span", { className: "fl-search-icon", children: "🔍" })
      ] })
    ] }) }),
    /* @__PURE__ */ t.jsx("section", { className: "section", children: /* @__PURE__ */ t.jsxs("div", { className: "section-inner", children: [
      !l && /* @__PURE__ */ t.jsxs("div", { className: "fl-tags", children: [
        /* @__PURE__ */ t.jsx("a", { href: "/fixes", className: `fl-tag${i ? "" : " fl-tag--active"}`, onClick: (o) => {
          o.preventDefault(), b(null);
        }, children: "All" }),
        p.map((o) => /* @__PURE__ */ t.jsx("a", { href: `/fixes?tag=${o}`, className: `fl-tag${i === o ? " fl-tag--active" : ""}`, onClick: (h) => {
          h.preventDefault(), b(o);
        }, children: o }, o))
      ] }),
      l && /* @__PURE__ */ t.jsxs("div", { className: "fl-count", children: [
        w.length,
        " fix",
        w.length !== 1 ? "es" : "",
        " found"
      ] }),
      /* @__PURE__ */ t.jsx("div", { className: "fl-list", children: w.map((o) => {
        const h = `/fixes/${o.slug}`;
        return /* @__PURE__ */ t.jsxs("a", { href: h, className: "fl-card", onClick: (C) => g(C, h), children: [
          /* @__PURE__ */ t.jsx("div", { className: "fl-card-tags", children: o.tags.map((C) => /* @__PURE__ */ t.jsx("span", { className: "fl-card-tag", children: C }, C)) }),
          /* @__PURE__ */ t.jsx("h2", { className: "fl-card-title", children: o.title }),
          /* @__PURE__ */ t.jsx("p", { className: "fl-card-summary", children: o.summary }),
          /* @__PURE__ */ t.jsx("span", { className: "fl-card-cta", children: "Read fix →" })
        ] }, o.slug);
      }) }),
      w.length === 0 && /* @__PURE__ */ t.jsx("div", { className: "fl-empty", children: "No fixes match your search." })
    ] }) })
  ] });
}
function yt({ slug: g, onNavigate: l }) {
  const n = Q.find((i) => i.slug === g);
  return n ? /* @__PURE__ */ t.jsx("section", { className: "section", children: /* @__PURE__ */ t.jsxs("div", { className: "section-inner fd-layout", children: [
    /* @__PURE__ */ t.jsx("a", { href: "/fixes", className: "fd-back", onClick: (i) => l(i, "/fixes"), children: "← Back to all fixes" }),
    /* @__PURE__ */ t.jsx("div", { className: "fd-tags", children: n.tags.map((i) => /* @__PURE__ */ t.jsx("span", { className: "fl-card-tag", children: i }, i)) }),
    /* @__PURE__ */ t.jsx("h1", { className: "fd-title", children: n.title }),
    /* @__PURE__ */ t.jsxs("div", { className: "fd-block fd-block--issue", children: [
      /* @__PURE__ */ t.jsx("div", { className: "fd-block-label", children: "The Issue" }),
      /* @__PURE__ */ t.jsx("p", { children: n.issue })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "fd-block fd-block--cause", children: [
      /* @__PURE__ */ t.jsx("div", { className: "fd-block-label", children: "Root Cause" }),
      /* @__PURE__ */ t.jsx("p", { children: n.cause })
    ] }),
    /* @__PURE__ */ t.jsxs("div", { className: "fd-block fd-block--fix", children: [
      /* @__PURE__ */ t.jsx("div", { className: "fd-block-label", children: "How to Fix" }),
      /* @__PURE__ */ t.jsx("ol", { className: "fd-steps", children: n.fix.map((i, b) => /* @__PURE__ */ t.jsx("li", { children: /* @__PURE__ */ t.jsx("code", { children: i }) }, b)) })
    ] }),
    /* @__PURE__ */ t.jsx("div", { className: "fd-footer", children: /* @__PURE__ */ t.jsx("a", { href: "/fixes", className: "btn-secondary", onClick: (i) => l(i, "/fixes"), children: "← More fixes" }) })
  ] }) }) : /* @__PURE__ */ t.jsx("div", { style: { padding: 40, textAlign: "center" }, children: "Fix not found." });
}
function bt({ onNavigate: g }) {
  const [l, n] = R([]), [i, b] = R(!0);
  if (X(() => {
    fetch(`${je}/api/content/stories`).then((o) => o.json()).then((o) => {
      n(o), b(!1);
    }).catch(() => b(!1));
  }, []), i) return /* @__PURE__ */ t.jsx("div", { style: { padding: 40, textAlign: "center" }, children: "Loading stories..." });
  const [p, ...w] = l;
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    /* @__PURE__ */ t.jsx("section", { className: "page-header", children: /* @__PURE__ */ t.jsxs("div", { className: "section-inner", children: [
      /* @__PURE__ */ t.jsx("h1", { children: "Stories" }),
      /* @__PURE__ */ t.jsx("p", { children: "Production outages, company histories, and tool origins." })
    ] }) }),
    /* @__PURE__ */ t.jsx("section", { className: "section", children: /* @__PURE__ */ t.jsxs("div", { className: "section-inner", children: [
      !p && /* @__PURE__ */ t.jsx("p", { className: "empty-state", children: "Stories coming soon." }),
      p && /* @__PURE__ */ t.jsxs("a", { href: `/stories/${p.slug}`, className: "blog-featured-card", onClick: (o) => g(o, `/stories/${p.slug}`), children: [
        /* @__PURE__ */ t.jsxs("div", { className: "bfc-thumb", "data-tag": p.tag, children: [
          p.thumbnail && /* @__PURE__ */ t.jsx("img", { src: p.thumbnail, alt: p.title, loading: "lazy" }),
          /* @__PURE__ */ t.jsx("span", { className: "wn-thumb-tag", children: p.tag })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "bfc-body", children: [
          /* @__PURE__ */ t.jsx("span", { className: "card-tag", children: p.tag }),
          /* @__PURE__ */ t.jsx("h2", { className: "bfc-title", children: p.title }),
          /* @__PURE__ */ t.jsxs("span", { className: "card-meta", children: [
            p.readTime,
            " min read · ",
            p.category
          ] })
        ] })
      ] }),
      w.length > 0 && /* @__PURE__ */ t.jsx("div", { className: "blog-grid", children: w.map((o) => {
        const h = `/stories/${o.slug}`;
        return /* @__PURE__ */ t.jsxs("a", { href: h, className: "blog-grid-card", onClick: (C) => g(C, h), children: [
          /* @__PURE__ */ t.jsxs("div", { className: "bgc-thumb", "data-tag": o.tag, children: [
            o.thumbnail && /* @__PURE__ */ t.jsx("img", { src: o.thumbnail, alt: o.title, loading: "lazy" }),
            /* @__PURE__ */ t.jsx("span", { className: "wn-thumb-tag", children: o.tag })
          ] }),
          /* @__PURE__ */ t.jsxs("div", { className: "bgc-body", children: [
            /* @__PURE__ */ t.jsx("span", { className: "card-tag", children: o.tag }),
            /* @__PURE__ */ t.jsx("h3", { className: "bgc-title", children: o.title }),
            /* @__PURE__ */ t.jsxs("span", { className: "card-meta", children: [
              o.readTime,
              " min read · ",
              o.category
            ] })
          ] })
        ] }, o.slug);
      }) })
    ] }) })
  ] });
}
function vt({ slug: g, onNavigate: l }) {
  const [n, i] = R(null), [b, p] = R(!0), [w, o] = R(null);
  return X(() => {
    p(!0), fetch(`${je}/api/content/stories/${g}`).then((h) => {
      if (!h.ok) throw new Error(`HTTP ${h.status}`);
      return h.json();
    }).then((h) => {
      i(h), p(!1);
    }).catch((h) => {
      o(h.message), p(!1);
    });
  }, [g]), b ? /* @__PURE__ */ t.jsx("div", { style: { padding: 40, textAlign: "center" }, children: "Loading story..." }) : w ? /* @__PURE__ */ t.jsxs("div", { style: { padding: 40, textAlign: "center" }, children: [
    "Error: ",
    w
  ] }) : /* @__PURE__ */ t.jsx("article", { className: "article-page", children: /* @__PURE__ */ t.jsxs("div", { className: "article-inner", children: [
    /* @__PURE__ */ t.jsxs("div", { className: "article-meta", children: [
      /* @__PURE__ */ t.jsx("span", { className: "card-tag", children: n.tag }),
      /* @__PURE__ */ t.jsxs("span", { className: "card-meta", children: [
        n.date,
        " · ",
        n.readTime,
        " min read"
      ] })
    ] }),
    /* @__PURE__ */ t.jsx("h1", { children: n.title }),
    /* @__PURE__ */ t.jsx("div", { className: "article-body", dangerouslySetInnerHTML: { __html: n.htmlBody } }),
    /* @__PURE__ */ t.jsx("div", { className: "article-footer", children: /* @__PURE__ */ t.jsx("a", { href: "/stories", className: "btn-secondary", onClick: (h) => l(h, "/stories"), children: "← Back to stories" }) })
  ] }) });
}
function kt({ onNavigate: g }) {
  return /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    /* @__PURE__ */ t.jsx("div", { className: "tools-page-hero", children: /* @__PURE__ */ t.jsxs("div", { className: "section-inner", children: [
      /* @__PURE__ */ t.jsx("p", { className: "tools-page-eyebrow", children: "Project Architectures" }),
      /* @__PURE__ */ t.jsxs("h1", { className: "tools-page-title", children: [
        "Real-World Systems",
        /* @__PURE__ */ t.jsx("br", {}),
        "for DevOps Interviews"
      ] }),
      /* @__PURE__ */ t.jsx("p", { className: "tools-page-sub", children: "Production architectures from companies like Zepto, Razorpay, and Flipkart — explained with components, trade-offs, and the exact interview angles they test." })
    ] }) }),
    /* @__PURE__ */ t.jsx("section", { className: "cat-page-section", children: /* @__PURE__ */ t.jsx("div", { className: "section-inner", children: /* @__PURE__ */ t.jsx("div", { className: "blog-grid tc-blog-grid", children: Pe.map((l) => {
      const n = `/architectures/${l.slug}`;
      return /* @__PURE__ */ t.jsxs("a", { href: n, className: "blog-grid-card tc-blog-card", onClick: (i) => g(i, n), children: [
        /* @__PURE__ */ t.jsxs("div", { className: "bgc-thumb", children: [
          l.thumbnail ? /* @__PURE__ */ t.jsx("img", { src: l.thumbnail, alt: l.title, loading: "lazy" }) : /* @__PURE__ */ t.jsx("div", { className: "arch-thumb-fallback", "data-tag": l.tag }),
          /* @__PURE__ */ t.jsx("span", { className: "wn-thumb-tag", children: l.icon })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "bgc-body", children: [
          /* @__PURE__ */ t.jsx("span", { className: "card-tag", children: l.tag }),
          /* @__PURE__ */ t.jsx("h3", { className: "bgc-title", children: l.title }),
          /* @__PURE__ */ t.jsx("p", { className: "tc-card-desc", children: l.desc }),
          /* @__PURE__ */ t.jsx("div", { className: "tc-card-tools", children: l.components.map((i) => /* @__PURE__ */ t.jsx("span", { className: "tc-card-pill", children: i }, i)) }),
          /* @__PURE__ */ t.jsxs("span", { className: "card-meta", children: [
            l.difficulty,
            " · View Architecture →"
          ] })
        ] })
      ] }, l.slug);
    }) }) }) })
  ] });
}
function xt({ slug: g, onNavigate: l }) {
  const n = Pe.find((i) => i.slug === g);
  return n ? /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    /* @__PURE__ */ t.jsx("div", { className: "arch-detail-hero", "data-tag": n.tag, children: /* @__PURE__ */ t.jsxs("div", { className: "section-inner", children: [
      /* @__PURE__ */ t.jsx("a", { href: "/architectures", className: "arch-back", onClick: (i) => l(i, "/architectures"), children: "← All Architectures" }),
      /* @__PURE__ */ t.jsxs("div", { className: "arch-detail-meta", children: [
        /* @__PURE__ */ t.jsx("span", { className: "card-tag", children: n.tag }),
        /* @__PURE__ */ t.jsx("span", { className: `arch-difficulty arch-difficulty-${n.difficulty}`, children: n.difficulty })
      ] }),
      /* @__PURE__ */ t.jsx("h1", { className: "arch-detail-title", children: n.title }),
      /* @__PURE__ */ t.jsx("p", { className: "arch-detail-desc", children: n.desc })
    ] }) }),
    /* @__PURE__ */ t.jsx("section", { className: "section", children: /* @__PURE__ */ t.jsx("div", { className: "section-inner", children: /* @__PURE__ */ t.jsxs("div", { className: "arch-coming-soon", children: [
      /* @__PURE__ */ t.jsx("div", { className: "arch-cs-icon", children: "🏗️" }),
      /* @__PURE__ */ t.jsx("h2", { className: "arch-cs-title", children: "Coming Soon" }),
      /* @__PURE__ */ t.jsxs("p", { className: "arch-cs-text", children: [
        "We're building out the full breakdown for ",
        /* @__PURE__ */ t.jsx("strong", { children: n.title }),
        " — including architecture diagrams, component deep-dives, and scenario-based interview Q&As."
      ] }),
      /* @__PURE__ */ t.jsx("a", { href: "/architectures", className: "arch-cs-back", onClick: (i) => l(i, "/architectures"), children: "← Back to Architectures" })
    ] }) }) })
  ] }) : /* @__PURE__ */ t.jsx("div", { style: { padding: 40, textAlign: "center" }, children: "Architecture not found." });
}
let _ = null;
function St() {
  return Promise.resolve();
}
function At() {
  const g = document.getElementById("rc-fixes");
  return _ = gt(g), _.render(/* @__PURE__ */ t.jsx(pt, {})), Promise.resolve();
}
function Rt() {
  return _ && (_.unmount(), _ = null), Promise.resolve();
}
export {
  St as bootstrap,
  At as mount,
  Rt as unmount
};
