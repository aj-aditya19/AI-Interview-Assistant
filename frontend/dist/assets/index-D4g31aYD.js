function jp(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const s in r)
        if (s !== "default" && !(s in e)) {
          const i = Object.getOwnPropertyDescriptor(r, s);
          i &&
            Object.defineProperty(
              e,
              s,
              i.get ? i : { enumerable: !0, get: () => r[s] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === "childList")
        for (const l of i.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i);
  }
})();
function Np(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Sc = { exports: {} },
  Oi = {},
  jc = { exports: {} },
  B = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var fs = Symbol.for("react.element"),
  kp = Symbol.for("react.portal"),
  Ep = Symbol.for("react.fragment"),
  Cp = Symbol.for("react.strict_mode"),
  Rp = Symbol.for("react.profiler"),
  bp = Symbol.for("react.provider"),
  Pp = Symbol.for("react.context"),
  Tp = Symbol.for("react.forward_ref"),
  _p = Symbol.for("react.suspense"),
  Op = Symbol.for("react.memo"),
  Lp = Symbol.for("react.lazy"),
  Ma = Symbol.iterator;
function Ip(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ma && e[Ma]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Nc = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  kc = Object.assign,
  Ec = {};
function pr(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Ec),
    (this.updater = n || Nc));
}
pr.prototype.isReactComponent = {};
pr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
pr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Cc() {}
Cc.prototype = pr.prototype;
function Lo(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = Ec),
    (this.updater = n || Nc));
}
var Io = (Lo.prototype = new Cc());
Io.constructor = Lo;
kc(Io, pr.prototype);
Io.isPureReactComponent = !0;
var Ba = Array.isArray,
  Rc = Object.prototype.hasOwnProperty,
  Ao = { current: null },
  bc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Pc(e, t, n) {
  var r,
    s = {},
    i = null,
    l = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (l = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      Rc.call(t, r) && !bc.hasOwnProperty(r) && (s[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) s.children = n;
  else if (1 < a) {
    for (var u = Array(a), d = 0; d < a; d++) u[d] = arguments[d + 2];
    s.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) s[r] === void 0 && (s[r] = a[r]);
  return {
    $$typeof: fs,
    type: e,
    key: i,
    ref: l,
    props: s,
    _owner: Ao.current,
  };
}
function Ap(e, t) {
  return {
    $$typeof: fs,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Do(e) {
  return typeof e == "object" && e !== null && e.$$typeof === fs;
}
function Dp(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var $a = /\/+/g;
function el(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Dp("" + e.key)
    : t.toString(36);
}
function Hs(e, t, n, r, s) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var l = !1;
  if (e === null) l = !0;
  else
    switch (i) {
      case "string":
      case "number":
        l = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case fs:
          case kp:
            l = !0;
        }
    }
  if (l)
    return (
      (l = e),
      (s = s(l)),
      (e = r === "" ? "." + el(l, 0) : r),
      Ba(s)
        ? ((n = ""),
          e != null && (n = e.replace($a, "$&/") + "/"),
          Hs(s, t, n, "", function (d) {
            return d;
          }))
        : s != null &&
          (Do(s) &&
            (s = Ap(
              s,
              n +
                (!s.key || (l && l.key === s.key)
                  ? ""
                  : ("" + s.key).replace($a, "$&/") + "/") +
                e,
            )),
          t.push(s)),
      1
    );
  if (((l = 0), (r = r === "" ? "." : r + ":"), Ba(e)))
    for (var a = 0; a < e.length; a++) {
      i = e[a];
      var u = r + el(i, a);
      l += Hs(i, t, n, u, s);
    }
  else if (((u = Ip(e)), typeof u == "function"))
    for (e = u.call(e), a = 0; !(i = e.next()).done; )
      ((i = i.value), (u = r + el(i, a++)), (l += Hs(i, t, n, u, s)));
  else if (i === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return l;
}
function Es(e, t, n) {
  if (e == null) return e;
  var r = [],
    s = 0;
  return (
    Hs(e, r, "", "", function (i) {
      return t.call(n, i, s++);
    }),
    r
  );
}
function zp(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Be = { current: null },
  Ws = { transition: null },
  Fp = {
    ReactCurrentDispatcher: Be,
    ReactCurrentBatchConfig: Ws,
    ReactCurrentOwner: Ao,
  };
function Tc() {
  throw Error("act(...) is not supported in production builds of React.");
}
B.Children = {
  map: Es,
  forEach: function (e, t, n) {
    Es(
      e,
      function () {
        t.apply(this, arguments);
      },
      n,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Es(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Es(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Do(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
B.Component = pr;
B.Fragment = Ep;
B.Profiler = Rp;
B.PureComponent = Lo;
B.StrictMode = Cp;
B.Suspense = _p;
B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fp;
B.act = Tc;
B.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = kc({}, e.props),
    s = e.key,
    i = e.ref,
    l = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (l = Ao.current)),
      t.key !== void 0 && (s = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (u in t)
      Rc.call(t, u) &&
        !bc.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var d = 0; d < u; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: fs, type: e.type, key: s, ref: i, props: r, _owner: l };
};
B.createContext = function (e) {
  return (
    (e = {
      $$typeof: Pp,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: bp, _context: e }),
    (e.Consumer = e)
  );
};
B.createElement = Pc;
B.createFactory = function (e) {
  var t = Pc.bind(null, e);
  return ((t.type = e), t);
};
B.createRef = function () {
  return { current: null };
};
B.forwardRef = function (e) {
  return { $$typeof: Tp, render: e };
};
B.isValidElement = Do;
B.lazy = function (e) {
  return { $$typeof: Lp, _payload: { _status: -1, _result: e }, _init: zp };
};
B.memo = function (e, t) {
  return { $$typeof: Op, type: e, compare: t === void 0 ? null : t };
};
B.startTransition = function (e) {
  var t = Ws.transition;
  Ws.transition = {};
  try {
    e();
  } finally {
    Ws.transition = t;
  }
};
B.unstable_act = Tc;
B.useCallback = function (e, t) {
  return Be.current.useCallback(e, t);
};
B.useContext = function (e) {
  return Be.current.useContext(e);
};
B.useDebugValue = function () {};
B.useDeferredValue = function (e) {
  return Be.current.useDeferredValue(e);
};
B.useEffect = function (e, t) {
  return Be.current.useEffect(e, t);
};
B.useId = function () {
  return Be.current.useId();
};
B.useImperativeHandle = function (e, t, n) {
  return Be.current.useImperativeHandle(e, t, n);
};
B.useInsertionEffect = function (e, t) {
  return Be.current.useInsertionEffect(e, t);
};
B.useLayoutEffect = function (e, t) {
  return Be.current.useLayoutEffect(e, t);
};
B.useMemo = function (e, t) {
  return Be.current.useMemo(e, t);
};
B.useReducer = function (e, t, n) {
  return Be.current.useReducer(e, t, n);
};
B.useRef = function (e) {
  return Be.current.useRef(e);
};
B.useState = function (e) {
  return Be.current.useState(e);
};
B.useSyncExternalStore = function (e, t, n) {
  return Be.current.useSyncExternalStore(e, t, n);
};
B.useTransition = function () {
  return Be.current.useTransition();
};
B.version = "18.3.1";
jc.exports = B;
var w = jc.exports;
const _c = Np(w),
  Up = jp({ __proto__: null, default: _c }, [w]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Mp = w,
  Bp = Symbol.for("react.element"),
  $p = Symbol.for("react.fragment"),
  Hp = Object.prototype.hasOwnProperty,
  Wp = Mp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Vp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Oc(e, t, n) {
  var r,
    s = {},
    i = null,
    l = null;
  (n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (l = t.ref));
  for (r in t) Hp.call(t, r) && !Vp.hasOwnProperty(r) && (s[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) s[r] === void 0 && (s[r] = t[r]);
  return {
    $$typeof: Bp,
    type: e,
    key: i,
    ref: l,
    props: s,
    _owner: Wp.current,
  };
}
Oi.Fragment = $p;
Oi.jsx = Oc;
Oi.jsxs = Oc;
Sc.exports = Oi;
var o = Sc.exports,
  Ol = {},
  Lc = { exports: {} },
  tt = {},
  Ic = { exports: {} },
  Ac = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(P, I) {
    var L = P.length;
    P.push(I);
    e: for (; 0 < L; ) {
      var D = (L - 1) >>> 1,
        Q = P[D];
      if (0 < s(Q, I)) ((P[D] = I), (P[L] = Q), (L = D));
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var I = P[0],
      L = P.pop();
    if (L !== I) {
      P[0] = L;
      e: for (var D = 0, Q = P.length, ze = Q >>> 1; D < ze; ) {
        var ke = 2 * (D + 1) - 1,
          _t = P[ke],
          F = ke + 1,
          te = P[F];
        if (0 > s(_t, L))
          F < Q && 0 > s(te, _t)
            ? ((P[D] = te), (P[F] = L), (D = F))
            : ((P[D] = _t), (P[ke] = L), (D = ke));
        else if (F < Q && 0 > s(te, L)) ((P[D] = te), (P[F] = L), (D = F));
        else break e;
      }
    }
    return I;
  }
  function s(P, I) {
    var L = P.sortIndex - I.sortIndex;
    return L !== 0 ? L : P.id - I.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var l = Date,
      a = l.now();
    e.unstable_now = function () {
      return l.now() - a;
    };
  }
  var u = [],
    d = [],
    f = 1,
    p = null,
    g = 3,
    y = !1,
    j = !1,
    S = !1,
    N = typeof setTimeout == "function" ? setTimeout : null,
    c = typeof clearTimeout == "function" ? clearTimeout : null,
    m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(P) {
    for (var I = n(d); I !== null; ) {
      if (I.callback === null) r(d);
      else if (I.startTime <= P)
        (r(d), (I.sortIndex = I.expirationTime), t(u, I));
      else break;
      I = n(d);
    }
  }
  function x(P) {
    if (((S = !1), h(P), !j))
      if (n(u) !== null) ((j = !0), oe(k));
      else {
        var I = n(d);
        I !== null && He(x, I.startTime - P);
      }
  }
  function k(P, I) {
    ((j = !1), S && ((S = !1), c(T), (T = -1)), (y = !0));
    var L = g;
    try {
      for (
        h(I), p = n(u);
        p !== null && (!(p.expirationTime > I) || (P && !U()));
      ) {
        var D = p.callback;
        if (typeof D == "function") {
          ((p.callback = null), (g = p.priorityLevel));
          var Q = D(p.expirationTime <= I);
          ((I = e.unstable_now()),
            typeof Q == "function" ? (p.callback = Q) : p === n(u) && r(u),
            h(I));
        } else r(u);
        p = n(u);
      }
      if (p !== null) var ze = !0;
      else {
        var ke = n(d);
        (ke !== null && He(x, ke.startTime - I), (ze = !1));
      }
      return ze;
    } finally {
      ((p = null), (g = L), (y = !1));
    }
  }
  var C = !1,
    R = null,
    T = -1,
    H = 5,
    O = -1;
  function U() {
    return !(e.unstable_now() - O < H);
  }
  function pe() {
    if (R !== null) {
      var P = e.unstable_now();
      O = P;
      var I = !0;
      try {
        I = R(!0, P);
      } finally {
        I ? M() : ((C = !1), (R = null));
      }
    } else C = !1;
  }
  var M;
  if (typeof m == "function")
    M = function () {
      m(pe);
    };
  else if (typeof MessageChannel < "u") {
    var V = new MessageChannel(),
      le = V.port2;
    ((V.port1.onmessage = pe),
      (M = function () {
        le.postMessage(null);
      }));
  } else
    M = function () {
      N(pe, 0);
    };
  function oe(P) {
    ((R = P), C || ((C = !0), M()));
  }
  function He(P, I) {
    T = N(function () {
      P(e.unstable_now());
    }, I);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (P) {
      P.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      j || y || ((j = !0), oe(k));
    }),
    (e.unstable_forceFrameRate = function (P) {
      0 > P || 125 < P
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (H = 0 < P ? Math.floor(1e3 / P) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return g;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (P) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var I = 3;
          break;
        default:
          I = g;
      }
      var L = g;
      g = I;
      try {
        return P();
      } finally {
        g = L;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (P, I) {
      switch (P) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          P = 3;
      }
      var L = g;
      g = P;
      try {
        return I();
      } finally {
        g = L;
      }
    }),
    (e.unstable_scheduleCallback = function (P, I, L) {
      var D = e.unstable_now();
      switch (
        (typeof L == "object" && L !== null
          ? ((L = L.delay), (L = typeof L == "number" && 0 < L ? D + L : D))
          : (L = D),
        P)
      ) {
        case 1:
          var Q = -1;
          break;
        case 2:
          Q = 250;
          break;
        case 5:
          Q = 1073741823;
          break;
        case 4:
          Q = 1e4;
          break;
        default:
          Q = 5e3;
      }
      return (
        (Q = L + Q),
        (P = {
          id: f++,
          callback: I,
          priorityLevel: P,
          startTime: L,
          expirationTime: Q,
          sortIndex: -1,
        }),
        L > D
          ? ((P.sortIndex = L),
            t(d, P),
            n(u) === null &&
              P === n(d) &&
              (S ? (c(T), (T = -1)) : (S = !0), He(x, L - D)))
          : ((P.sortIndex = Q), t(u, P), j || y || ((j = !0), oe(k))),
        P
      );
    }),
    (e.unstable_shouldYield = U),
    (e.unstable_wrapCallback = function (P) {
      var I = g;
      return function () {
        var L = g;
        g = I;
        try {
          return P.apply(this, arguments);
        } finally {
          g = L;
        }
      };
    }));
})(Ac);
Ic.exports = Ac;
var qp = Ic.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qp = w,
  et = qp;
function E(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Dc = new Set(),
  qr = {};
function Ln(e, t) {
  (rr(e, t), rr(e + "Capture", t));
}
function rr(e, t) {
  for (qr[e] = t, e = 0; e < t.length; e++) Dc.add(t[e]);
}
var zt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ll = Object.prototype.hasOwnProperty,
  Kp =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ha = {},
  Wa = {};
function Yp(e) {
  return Ll.call(Wa, e)
    ? !0
    : Ll.call(Ha, e)
      ? !1
      : Kp.test(e)
        ? (Wa[e] = !0)
        : ((Ha[e] = !0), !1);
}
function Gp(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Jp(e, t, n, r) {
  if (t === null || typeof t > "u" || Gp(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function $e(e, t, n, r, s, i, l) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = s),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = l));
}
var be = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    be[e] = new $e(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  be[t] = new $e(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  be[e] = new $e(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  be[e] = new $e(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    be[e] = new $e(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  be[e] = new $e(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  be[e] = new $e(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  be[e] = new $e(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  be[e] = new $e(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var zo = /[\-:]([a-z])/g;
function Fo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(zo, Fo);
    be[t] = new $e(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(zo, Fo);
    be[t] = new $e(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(zo, Fo);
  be[t] = new $e(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  be[e] = new $e(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
be.xlinkHref = new $e(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  be[e] = new $e(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Uo(e, t, n, r) {
  var s = be.hasOwnProperty(t) ? be[t] : null;
  (s !== null
    ? s.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Jp(t, n, s, r) && (n = null),
    r || s === null
      ? Yp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : s.mustUseProperty
        ? (e[s.propertyName] = n === null ? (s.type === 3 ? !1 : "") : n)
        : ((t = s.attributeName),
          (r = s.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((s = s.type),
              (n = s === 3 || (s === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Bt = Qp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Cs = Symbol.for("react.element"),
  Un = Symbol.for("react.portal"),
  Mn = Symbol.for("react.fragment"),
  Mo = Symbol.for("react.strict_mode"),
  Il = Symbol.for("react.profiler"),
  zc = Symbol.for("react.provider"),
  Fc = Symbol.for("react.context"),
  Bo = Symbol.for("react.forward_ref"),
  Al = Symbol.for("react.suspense"),
  Dl = Symbol.for("react.suspense_list"),
  $o = Symbol.for("react.memo"),
  qt = Symbol.for("react.lazy"),
  Uc = Symbol.for("react.offscreen"),
  Va = Symbol.iterator;
function kr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Va && e[Va]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ie = Object.assign,
  tl;
function Lr(e) {
  if (tl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      tl = (t && t[1]) || "";
    }
  return (
    `
` +
    tl +
    e
  );
}
var nl = !1;
function rl(e, t) {
  if (!e || nl) return "";
  nl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (d) {
          var r = d;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (d) {
          r = d;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (
        var s = d.stack.split(`
`),
          i = r.stack.split(`
`),
          l = s.length - 1,
          a = i.length - 1;
        1 <= l && 0 <= a && s[l] !== i[a];
      )
        a--;
      for (; 1 <= l && 0 <= a; l--, a--)
        if (s[l] !== i[a]) {
          if (l !== 1 || a !== 1)
            do
              if ((l--, a--, 0 > a || s[l] !== i[a])) {
                var u =
                  `
` + s[l].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= l && 0 <= a);
          break;
        }
    }
  } finally {
    ((nl = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? Lr(e) : "";
}
function Xp(e) {
  switch (e.tag) {
    case 5:
      return Lr(e.type);
    case 16:
      return Lr("Lazy");
    case 13:
      return Lr("Suspense");
    case 19:
      return Lr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = rl(e.type, !1)), e);
    case 11:
      return ((e = rl(e.type.render, !1)), e);
    case 1:
      return ((e = rl(e.type, !0)), e);
    default:
      return "";
  }
}
function zl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Mn:
      return "Fragment";
    case Un:
      return "Portal";
    case Il:
      return "Profiler";
    case Mo:
      return "StrictMode";
    case Al:
      return "Suspense";
    case Dl:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Fc:
        return (e.displayName || "Context") + ".Consumer";
      case zc:
        return (e._context.displayName || "Context") + ".Provider";
      case Bo:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case $o:
        return (
          (t = e.displayName || null),
          t !== null ? t : zl(e.type) || "Memo"
        );
      case qt:
        ((t = e._payload), (e = e._init));
        try {
          return zl(e(t));
        } catch {}
    }
  return null;
}
function Zp(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return zl(t);
    case 8:
      return t === Mo ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function un(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Mc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function eh(e) {
  var t = Mc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var s = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return s.call(this);
        },
        set: function (l) {
          ((r = "" + l), i.call(this, l));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (l) {
          r = "" + l;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Rs(e) {
  e._valueTracker || (e._valueTracker = eh(e));
}
function Bc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Mc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function si(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Fl(e, t) {
  var n = t.checked;
  return ie({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function qa(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = un(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function $c(e, t) {
  ((t = t.checked), t != null && Uo(e, "checked", t, !1));
}
function Ul(e, t) {
  $c(e, t);
  var n = un(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? Ml(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Ml(e, t.type, un(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Qa(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    ((t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n));
}
function Ml(e, t, n) {
  (t !== "number" || si(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Ir = Array.isArray;
function Jn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var s = 0; s < n.length; s++) t["$" + n[s]] = !0;
    for (n = 0; n < e.length; n++)
      ((s = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== s && (e[n].selected = s),
        s && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + un(n), t = null, s = 0; s < e.length; s++) {
      if (e[s].value === n) {
        ((e[s].selected = !0), r && (e[s].defaultSelected = !0));
        return;
      }
      t !== null || e[s].disabled || (t = e[s]);
    }
    t !== null && (t.selected = !0);
  }
}
function Bl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
  return ie({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Ka(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(E(92));
      if (Ir(n)) {
        if (1 < n.length) throw Error(E(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: un(n) };
}
function Hc(e, t) {
  var n = un(t.value),
    r = un(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function Ya(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Wc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function $l(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Wc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var bs,
  Vc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, s) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, s);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        bs = bs || document.createElement("div"),
          bs.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = bs.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Qr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var zr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  th = ["Webkit", "ms", "Moz", "O"];
Object.keys(zr).forEach(function (e) {
  th.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (zr[t] = zr[e]));
  });
});
function qc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (zr.hasOwnProperty(e) && zr[e])
      ? ("" + t).trim()
      : t + "px";
}
function Qc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        s = qc(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, s) : (e[n] = s));
    }
}
var nh = ie(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function Hl(e, t) {
  if (t) {
    if (nh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(E(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(E(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(E(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(E(62));
  }
}
function Wl(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Vl = null;
function Ho(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var ql = null,
  Xn = null,
  Zn = null;
function Ga(e) {
  if ((e = ms(e))) {
    if (typeof ql != "function") throw Error(E(280));
    var t = e.stateNode;
    t && ((t = zi(t)), ql(e.stateNode, e.type, t));
  }
}
function Kc(e) {
  Xn ? (Zn ? Zn.push(e) : (Zn = [e])) : (Xn = e);
}
function Yc() {
  if (Xn) {
    var e = Xn,
      t = Zn;
    if (((Zn = Xn = null), Ga(e), t)) for (e = 0; e < t.length; e++) Ga(t[e]);
  }
}
function Gc(e, t) {
  return e(t);
}
function Jc() {}
var sl = !1;
function Xc(e, t, n) {
  if (sl) return e(t, n);
  sl = !0;
  try {
    return Gc(e, t, n);
  } finally {
    ((sl = !1), (Xn !== null || Zn !== null) && (Jc(), Yc()));
  }
}
function Kr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = zi(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(E(231, t, typeof n));
  return n;
}
var Ql = !1;
if (zt)
  try {
    var Er = {};
    (Object.defineProperty(Er, "passive", {
      get: function () {
        Ql = !0;
      },
    }),
      window.addEventListener("test", Er, Er),
      window.removeEventListener("test", Er, Er));
  } catch {
    Ql = !1;
  }
function rh(e, t, n, r, s, i, l, a, u) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (f) {
    this.onError(f);
  }
}
var Fr = !1,
  ii = null,
  li = !1,
  Kl = null,
  sh = {
    onError: function (e) {
      ((Fr = !0), (ii = e));
    },
  };
function ih(e, t, n, r, s, i, l, a, u) {
  ((Fr = !1), (ii = null), rh.apply(sh, arguments));
}
function lh(e, t, n, r, s, i, l, a, u) {
  if ((ih.apply(this, arguments), Fr)) {
    if (Fr) {
      var d = ii;
      ((Fr = !1), (ii = null));
    } else throw Error(E(198));
    li || ((li = !0), (Kl = d));
  }
}
function In(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Zc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Ja(e) {
  if (In(e) !== e) throw Error(E(188));
}
function oh(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = In(e)), t === null)) throw Error(E(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var s = n.return;
    if (s === null) break;
    var i = s.alternate;
    if (i === null) {
      if (((r = s.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (s.child === i.child) {
      for (i = s.child; i; ) {
        if (i === n) return (Ja(s), e);
        if (i === r) return (Ja(s), t);
        i = i.sibling;
      }
      throw Error(E(188));
    }
    if (n.return !== r.return) ((n = s), (r = i));
    else {
      for (var l = !1, a = s.child; a; ) {
        if (a === n) {
          ((l = !0), (n = s), (r = i));
          break;
        }
        if (a === r) {
          ((l = !0), (r = s), (n = i));
          break;
        }
        a = a.sibling;
      }
      if (!l) {
        for (a = i.child; a; ) {
          if (a === n) {
            ((l = !0), (n = i), (r = s));
            break;
          }
          if (a === r) {
            ((l = !0), (r = i), (n = s));
            break;
          }
          a = a.sibling;
        }
        if (!l) throw Error(E(189));
      }
    }
    if (n.alternate !== r) throw Error(E(190));
  }
  if (n.tag !== 3) throw Error(E(188));
  return n.stateNode.current === n ? e : t;
}
function ed(e) {
  return ((e = oh(e)), e !== null ? td(e) : null);
}
function td(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = td(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var nd = et.unstable_scheduleCallback,
  Xa = et.unstable_cancelCallback,
  ah = et.unstable_shouldYield,
  uh = et.unstable_requestPaint,
  ce = et.unstable_now,
  ch = et.unstable_getCurrentPriorityLevel,
  Wo = et.unstable_ImmediatePriority,
  rd = et.unstable_UserBlockingPriority,
  oi = et.unstable_NormalPriority,
  dh = et.unstable_LowPriority,
  sd = et.unstable_IdlePriority,
  Li = null,
  bt = null;
function fh(e) {
  if (bt && typeof bt.onCommitFiberRoot == "function")
    try {
      bt.onCommitFiberRoot(Li, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var vt = Math.clz32 ? Math.clz32 : mh,
  ph = Math.log,
  hh = Math.LN2;
function mh(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((ph(e) / hh) | 0)) | 0);
}
var Ps = 64,
  Ts = 4194304;
function Ar(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ai(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    s = e.suspendedLanes,
    i = e.pingedLanes,
    l = n & 268435455;
  if (l !== 0) {
    var a = l & ~s;
    a !== 0 ? (r = Ar(a)) : ((i &= l), i !== 0 && (r = Ar(i)));
  } else ((l = n & ~s), l !== 0 ? (r = Ar(l)) : i !== 0 && (r = Ar(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & s) &&
    ((s = r & -r), (i = t & -t), s >= i || (s === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - vt(t)), (s = 1 << n), (r |= e[n]), (t &= ~s));
  return r;
}
function gh(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function vh(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      s = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;
  ) {
    var l = 31 - vt(i),
      a = 1 << l,
      u = s[l];
    (u === -1
      ? (!(a & n) || a & r) && (s[l] = gh(a, t))
      : u <= t && (e.expiredLanes |= a),
      (i &= ~a));
  }
}
function Yl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function id() {
  var e = Ps;
  return ((Ps <<= 1), !(Ps & 4194240) && (Ps = 64), e);
}
function il(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ps(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - vt(t)),
    (e[t] = n));
}
function yh(e, t) {
  var n = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var s = 31 - vt(n),
      i = 1 << s;
    ((t[s] = 0), (r[s] = -1), (e[s] = -1), (n &= ~i));
  }
}
function Vo(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - vt(n),
      s = 1 << r;
    ((s & t) | (e[r] & t) && (e[r] |= t), (n &= ~s));
  }
}
var K = 0;
function ld(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var od,
  qo,
  ad,
  ud,
  cd,
  Gl = !1,
  _s = [],
  Zt = null,
  en = null,
  tn = null,
  Yr = new Map(),
  Gr = new Map(),
  Kt = [],
  wh =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Za(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Zt = null;
      break;
    case "dragenter":
    case "dragleave":
      en = null;
      break;
    case "mouseover":
    case "mouseout":
      tn = null;
      break;
    case "pointerover":
    case "pointerout":
      Yr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Gr.delete(t.pointerId);
  }
}
function Cr(e, t, n, r, s, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [s],
      }),
      t !== null && ((t = ms(t)), t !== null && qo(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      s !== null && t.indexOf(s) === -1 && t.push(s),
      e);
}
function xh(e, t, n, r, s) {
  switch (t) {
    case "focusin":
      return ((Zt = Cr(Zt, e, t, n, r, s)), !0);
    case "dragenter":
      return ((en = Cr(en, e, t, n, r, s)), !0);
    case "mouseover":
      return ((tn = Cr(tn, e, t, n, r, s)), !0);
    case "pointerover":
      var i = s.pointerId;
      return (Yr.set(i, Cr(Yr.get(i) || null, e, t, n, r, s)), !0);
    case "gotpointercapture":
      return (
        (i = s.pointerId),
        Gr.set(i, Cr(Gr.get(i) || null, e, t, n, r, s)),
        !0
      );
  }
  return !1;
}
function dd(e) {
  var t = wn(e.target);
  if (t !== null) {
    var n = In(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Zc(n)), t !== null)) {
          ((e.blockedOn = t),
            cd(e.priority, function () {
              ad(n);
            }));
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Vs(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Jl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Vl = r), n.target.dispatchEvent(r), (Vl = null));
    } else return ((t = ms(n)), t !== null && qo(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function eu(e, t, n) {
  Vs(e) && n.delete(t);
}
function Sh() {
  ((Gl = !1),
    Zt !== null && Vs(Zt) && (Zt = null),
    en !== null && Vs(en) && (en = null),
    tn !== null && Vs(tn) && (tn = null),
    Yr.forEach(eu),
    Gr.forEach(eu));
}
function Rr(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Gl ||
      ((Gl = !0),
      et.unstable_scheduleCallback(et.unstable_NormalPriority, Sh)));
}
function Jr(e) {
  function t(s) {
    return Rr(s, e);
  }
  if (0 < _s.length) {
    Rr(_s[0], e);
    for (var n = 1; n < _s.length; n++) {
      var r = _s[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Zt !== null && Rr(Zt, e),
      en !== null && Rr(en, e),
      tn !== null && Rr(tn, e),
      Yr.forEach(t),
      Gr.forEach(t),
      n = 0;
    n < Kt.length;
    n++
  )
    ((r = Kt[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < Kt.length && ((n = Kt[0]), n.blockedOn === null); )
    (dd(n), n.blockedOn === null && Kt.shift());
}
var er = Bt.ReactCurrentBatchConfig,
  ui = !0;
function jh(e, t, n, r) {
  var s = K,
    i = er.transition;
  er.transition = null;
  try {
    ((K = 1), Qo(e, t, n, r));
  } finally {
    ((K = s), (er.transition = i));
  }
}
function Nh(e, t, n, r) {
  var s = K,
    i = er.transition;
  er.transition = null;
  try {
    ((K = 4), Qo(e, t, n, r));
  } finally {
    ((K = s), (er.transition = i));
  }
}
function Qo(e, t, n, r) {
  if (ui) {
    var s = Jl(e, t, n, r);
    if (s === null) (ml(e, t, r, ci, n), Za(e, r));
    else if (xh(s, e, t, n, r)) r.stopPropagation();
    else if ((Za(e, r), t & 4 && -1 < wh.indexOf(e))) {
      for (; s !== null; ) {
        var i = ms(s);
        if (
          (i !== null && od(i),
          (i = Jl(e, t, n, r)),
          i === null && ml(e, t, r, ci, n),
          i === s)
        )
          break;
        s = i;
      }
      s !== null && r.stopPropagation();
    } else ml(e, t, r, null, n);
  }
}
var ci = null;
function Jl(e, t, n, r) {
  if (((ci = null), (e = Ho(r)), (e = wn(e)), e !== null))
    if (((t = In(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Zc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((ci = e), null);
}
function fd(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ch()) {
        case Wo:
          return 1;
        case rd:
          return 4;
        case oi:
        case dh:
          return 16;
        case sd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Gt = null,
  Ko = null,
  qs = null;
function pd() {
  if (qs) return qs;
  var e,
    t = Ko,
    n = t.length,
    r,
    s = "value" in Gt ? Gt.value : Gt.textContent,
    i = s.length;
  for (e = 0; e < n && t[e] === s[e]; e++);
  var l = n - e;
  for (r = 1; r <= l && t[n - r] === s[i - r]; r++);
  return (qs = s.slice(e, 1 < r ? 1 - r : void 0));
}
function Qs(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Os() {
  return !0;
}
function tu() {
  return !1;
}
function nt(e) {
  function t(n, r, s, i, l) {
    ((this._reactName = n),
      (this._targetInst = s),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = l),
      (this.currentTarget = null));
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(i) : i[a]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Os
        : tu),
      (this.isPropagationStopped = tu),
      this
    );
  }
  return (
    ie(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Os));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Os));
      },
      persist: function () {},
      isPersistent: Os,
    }),
    t
  );
}
var hr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Yo = nt(hr),
  hs = ie({}, hr, { view: 0, detail: 0 }),
  kh = nt(hs),
  ll,
  ol,
  br,
  Ii = ie({}, hs, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Go,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== br &&
            (br && e.type === "mousemove"
              ? ((ll = e.screenX - br.screenX), (ol = e.screenY - br.screenY))
              : (ol = ll = 0),
            (br = e)),
          ll);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : ol;
    },
  }),
  nu = nt(Ii),
  Eh = ie({}, Ii, { dataTransfer: 0 }),
  Ch = nt(Eh),
  Rh = ie({}, hs, { relatedTarget: 0 }),
  al = nt(Rh),
  bh = ie({}, hr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Ph = nt(bh),
  Th = ie({}, hr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  _h = nt(Th),
  Oh = ie({}, hr, { data: 0 }),
  ru = nt(Oh),
  Lh = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Ih = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Ah = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Dh(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ah[e]) ? !!t[e] : !1;
}
function Go() {
  return Dh;
}
var zh = ie({}, hs, {
    key: function (e) {
      if (e.key) {
        var t = Lh[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Qs(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Ih[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Go,
    charCode: function (e) {
      return e.type === "keypress" ? Qs(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Qs(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Fh = nt(zh),
  Uh = ie({}, Ii, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  su = nt(Uh),
  Mh = ie({}, hs, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Go,
  }),
  Bh = nt(Mh),
  $h = ie({}, hr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Hh = nt($h),
  Wh = ie({}, Ii, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Vh = nt(Wh),
  qh = [9, 13, 27, 32],
  Jo = zt && "CompositionEvent" in window,
  Ur = null;
zt && "documentMode" in document && (Ur = document.documentMode);
var Qh = zt && "TextEvent" in window && !Ur,
  hd = zt && (!Jo || (Ur && 8 < Ur && 11 >= Ur)),
  iu = " ",
  lu = !1;
function md(e, t) {
  switch (e) {
    case "keyup":
      return qh.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function gd(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Bn = !1;
function Kh(e, t) {
  switch (e) {
    case "compositionend":
      return gd(t);
    case "keypress":
      return t.which !== 32 ? null : ((lu = !0), iu);
    case "textInput":
      return ((e = t.data), e === iu && lu ? null : e);
    default:
      return null;
  }
}
function Yh(e, t) {
  if (Bn)
    return e === "compositionend" || (!Jo && md(e, t))
      ? ((e = pd()), (qs = Ko = Gt = null), (Bn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return hd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Gh = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function ou(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Gh[e.type] : t === "textarea";
}
function vd(e, t, n, r) {
  (Kc(r),
    (t = di(t, "onChange")),
    0 < t.length &&
      ((n = new Yo("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var Mr = null,
  Xr = null;
function Jh(e) {
  bd(e, 0);
}
function Ai(e) {
  var t = Wn(e);
  if (Bc(t)) return e;
}
function Xh(e, t) {
  if (e === "change") return t;
}
var yd = !1;
if (zt) {
  var ul;
  if (zt) {
    var cl = "oninput" in document;
    if (!cl) {
      var au = document.createElement("div");
      (au.setAttribute("oninput", "return;"),
        (cl = typeof au.oninput == "function"));
    }
    ul = cl;
  } else ul = !1;
  yd = ul && (!document.documentMode || 9 < document.documentMode);
}
function uu() {
  Mr && (Mr.detachEvent("onpropertychange", wd), (Xr = Mr = null));
}
function wd(e) {
  if (e.propertyName === "value" && Ai(Xr)) {
    var t = [];
    (vd(t, Xr, e, Ho(e)), Xc(Jh, t));
  }
}
function Zh(e, t, n) {
  e === "focusin"
    ? (uu(), (Mr = t), (Xr = n), Mr.attachEvent("onpropertychange", wd))
    : e === "focusout" && uu();
}
function em(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Ai(Xr);
}
function tm(e, t) {
  if (e === "click") return Ai(t);
}
function nm(e, t) {
  if (e === "input" || e === "change") return Ai(t);
}
function rm(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var wt = typeof Object.is == "function" ? Object.is : rm;
function Zr(e, t) {
  if (wt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var s = n[r];
    if (!Ll.call(t, s) || !wt(e[s], t[s])) return !1;
  }
  return !0;
}
function cu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function du(e, t) {
  var n = cu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = cu(n);
  }
}
function xd(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? xd(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function Sd() {
  for (var e = window, t = si(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = si(e.document);
  }
  return t;
}
function Xo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function sm(e) {
  var t = Sd(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    xd(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Xo(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        ((n.selectionStart = t),
          (n.selectionEnd = Math.min(e, n.value.length)));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var s = n.textContent.length,
          i = Math.min(r.start, s);
        ((r = r.end === void 0 ? i : Math.min(r.end, s)),
          !e.extend && i > r && ((s = r), (r = i), (i = s)),
          (s = du(n, i)));
        var l = du(n, r);
        s &&
          l &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== s.node ||
            e.anchorOffset !== s.offset ||
            e.focusNode !== l.node ||
            e.focusOffset !== l.offset) &&
          ((t = t.createRange()),
          t.setStart(s.node, s.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(l.node, l.offset))
            : (t.setEnd(l.node, l.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      ((e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var im = zt && "documentMode" in document && 11 >= document.documentMode,
  $n = null,
  Xl = null,
  Br = null,
  Zl = !1;
function fu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Zl ||
    $n == null ||
    $n !== si(r) ||
    ((r = $n),
    "selectionStart" in r && Xo(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Br && Zr(Br, r)) ||
      ((Br = r),
      (r = di(Xl, "onSelect")),
      0 < r.length &&
        ((t = new Yo("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = $n))));
}
function Ls(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Hn = {
    animationend: Ls("Animation", "AnimationEnd"),
    animationiteration: Ls("Animation", "AnimationIteration"),
    animationstart: Ls("Animation", "AnimationStart"),
    transitionend: Ls("Transition", "TransitionEnd"),
  },
  dl = {},
  jd = {};
zt &&
  ((jd = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Hn.animationend.animation,
    delete Hn.animationiteration.animation,
    delete Hn.animationstart.animation),
  "TransitionEvent" in window || delete Hn.transitionend.transition);
function Di(e) {
  if (dl[e]) return dl[e];
  if (!Hn[e]) return e;
  var t = Hn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in jd) return (dl[e] = t[n]);
  return e;
}
var Nd = Di("animationend"),
  kd = Di("animationiteration"),
  Ed = Di("animationstart"),
  Cd = Di("transitionend"),
  Rd = new Map(),
  pu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function dn(e, t) {
  (Rd.set(e, t), Ln(t, [e]));
}
for (var fl = 0; fl < pu.length; fl++) {
  var pl = pu[fl],
    lm = pl.toLowerCase(),
    om = pl[0].toUpperCase() + pl.slice(1);
  dn(lm, "on" + om);
}
dn(Nd, "onAnimationEnd");
dn(kd, "onAnimationIteration");
dn(Ed, "onAnimationStart");
dn("dblclick", "onDoubleClick");
dn("focusin", "onFocus");
dn("focusout", "onBlur");
dn(Cd, "onTransitionEnd");
rr("onMouseEnter", ["mouseout", "mouseover"]);
rr("onMouseLeave", ["mouseout", "mouseover"]);
rr("onPointerEnter", ["pointerout", "pointerover"]);
rr("onPointerLeave", ["pointerout", "pointerover"]);
Ln(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Ln(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Ln("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ln(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Ln(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Ln(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Dr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  am = new Set("cancel close invalid load scroll toggle".split(" ").concat(Dr));
function hu(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), lh(r, t, void 0, e), (e.currentTarget = null));
}
function bd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      s = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var l = r.length - 1; 0 <= l; l--) {
          var a = r[l],
            u = a.instance,
            d = a.currentTarget;
          if (((a = a.listener), u !== i && s.isPropagationStopped())) break e;
          (hu(s, a, d), (i = u));
        }
      else
        for (l = 0; l < r.length; l++) {
          if (
            ((a = r[l]),
            (u = a.instance),
            (d = a.currentTarget),
            (a = a.listener),
            u !== i && s.isPropagationStopped())
          )
            break e;
          (hu(s, a, d), (i = u));
        }
    }
  }
  if (li) throw ((e = Kl), (li = !1), (Kl = null), e);
}
function J(e, t) {
  var n = t[so];
  n === void 0 && (n = t[so] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Pd(t, e, 2, !1), n.add(r));
}
function hl(e, t, n) {
  var r = 0;
  (t && (r |= 4), Pd(n, e, r, t));
}
var Is = "_reactListening" + Math.random().toString(36).slice(2);
function es(e) {
  if (!e[Is]) {
    ((e[Is] = !0),
      Dc.forEach(function (n) {
        n !== "selectionchange" && (am.has(n) || hl(n, !1, e), hl(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Is] || ((t[Is] = !0), hl("selectionchange", !1, t));
  }
}
function Pd(e, t, n, r) {
  switch (fd(t)) {
    case 1:
      var s = jh;
      break;
    case 4:
      s = Nh;
      break;
    default:
      s = Qo;
  }
  ((n = s.bind(null, t, n, e)),
    (s = void 0),
    !Ql ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (s = !0),
    r
      ? s !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: s })
        : e.addEventListener(t, n, !0)
      : s !== void 0
        ? e.addEventListener(t, n, { passive: s })
        : e.addEventListener(t, n, !1));
}
function ml(e, t, n, r, s) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var l = r.tag;
      if (l === 3 || l === 4) {
        var a = r.stateNode.containerInfo;
        if (a === s || (a.nodeType === 8 && a.parentNode === s)) break;
        if (l === 4)
          for (l = r.return; l !== null; ) {
            var u = l.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = l.stateNode.containerInfo),
              u === s || (u.nodeType === 8 && u.parentNode === s))
            )
              return;
            l = l.return;
          }
        for (; a !== null; ) {
          if (((l = wn(a)), l === null)) return;
          if (((u = l.tag), u === 5 || u === 6)) {
            r = i = l;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  Xc(function () {
    var d = i,
      f = Ho(n),
      p = [];
    e: {
      var g = Rd.get(e);
      if (g !== void 0) {
        var y = Yo,
          j = e;
        switch (e) {
          case "keypress":
            if (Qs(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Fh;
            break;
          case "focusin":
            ((j = "focus"), (y = al));
            break;
          case "focusout":
            ((j = "blur"), (y = al));
            break;
          case "beforeblur":
          case "afterblur":
            y = al;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = nu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Ch;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Bh;
            break;
          case Nd:
          case kd:
          case Ed:
            y = Ph;
            break;
          case Cd:
            y = Hh;
            break;
          case "scroll":
            y = kh;
            break;
          case "wheel":
            y = Vh;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = _h;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = su;
        }
        var S = (t & 4) !== 0,
          N = !S && e === "scroll",
          c = S ? (g !== null ? g + "Capture" : null) : g;
        S = [];
        for (var m = d, h; m !== null; ) {
          h = m;
          var x = h.stateNode;
          if (
            (h.tag === 5 &&
              x !== null &&
              ((h = x),
              c !== null && ((x = Kr(m, c)), x != null && S.push(ts(m, x, h)))),
            N)
          )
            break;
          m = m.return;
        }
        0 < S.length &&
          ((g = new y(g, j, null, n, f)), p.push({ event: g, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((g = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          g &&
            n !== Vl &&
            (j = n.relatedTarget || n.fromElement) &&
            (wn(j) || j[Ft]))
        )
          break e;
        if (
          (y || g) &&
          ((g =
            f.window === f
              ? f
              : (g = f.ownerDocument)
                ? g.defaultView || g.parentWindow
                : window),
          y
            ? ((j = n.relatedTarget || n.toElement),
              (y = d),
              (j = j ? wn(j) : null),
              j !== null &&
                ((N = In(j)), j !== N || (j.tag !== 5 && j.tag !== 6)) &&
                (j = null))
            : ((y = null), (j = d)),
          y !== j)
        ) {
          if (
            ((S = nu),
            (x = "onMouseLeave"),
            (c = "onMouseEnter"),
            (m = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((S = su),
              (x = "onPointerLeave"),
              (c = "onPointerEnter"),
              (m = "pointer")),
            (N = y == null ? g : Wn(y)),
            (h = j == null ? g : Wn(j)),
            (g = new S(x, m + "leave", y, n, f)),
            (g.target = N),
            (g.relatedTarget = h),
            (x = null),
            wn(f) === d &&
              ((S = new S(c, m + "enter", j, n, f)),
              (S.target = h),
              (S.relatedTarget = N),
              (x = S)),
            (N = x),
            y && j)
          )
            t: {
              for (S = y, c = j, m = 0, h = S; h; h = Dn(h)) m++;
              for (h = 0, x = c; x; x = Dn(x)) h++;
              for (; 0 < m - h; ) ((S = Dn(S)), m--);
              for (; 0 < h - m; ) ((c = Dn(c)), h--);
              for (; m--; ) {
                if (S === c || (c !== null && S === c.alternate)) break t;
                ((S = Dn(S)), (c = Dn(c)));
              }
              S = null;
            }
          else S = null;
          (y !== null && mu(p, g, y, S, !1),
            j !== null && N !== null && mu(p, N, j, S, !0));
        }
      }
      e: {
        if (
          ((g = d ? Wn(d) : window),
          (y = g.nodeName && g.nodeName.toLowerCase()),
          y === "select" || (y === "input" && g.type === "file"))
        )
          var k = Xh;
        else if (ou(g))
          if (yd) k = nm;
          else {
            k = em;
            var C = Zh;
          }
        else
          (y = g.nodeName) &&
            y.toLowerCase() === "input" &&
            (g.type === "checkbox" || g.type === "radio") &&
            (k = tm);
        if (k && (k = k(e, d))) {
          vd(p, k, n, f);
          break e;
        }
        (C && C(e, g, d),
          e === "focusout" &&
            (C = g._wrapperState) &&
            C.controlled &&
            g.type === "number" &&
            Ml(g, "number", g.value));
      }
      switch (((C = d ? Wn(d) : window), e)) {
        case "focusin":
          (ou(C) || C.contentEditable === "true") &&
            (($n = C), (Xl = d), (Br = null));
          break;
        case "focusout":
          Br = Xl = $n = null;
          break;
        case "mousedown":
          Zl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Zl = !1), fu(p, n, f));
          break;
        case "selectionchange":
          if (im) break;
        case "keydown":
        case "keyup":
          fu(p, n, f);
      }
      var R;
      if (Jo)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        Bn
          ? md(e, n) && (T = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      (T &&
        (hd &&
          n.locale !== "ko" &&
          (Bn || T !== "onCompositionStart"
            ? T === "onCompositionEnd" && Bn && (R = pd())
            : ((Gt = f),
              (Ko = "value" in Gt ? Gt.value : Gt.textContent),
              (Bn = !0))),
        (C = di(d, T)),
        0 < C.length &&
          ((T = new ru(T, e, null, n, f)),
          p.push({ event: T, listeners: C }),
          R ? (T.data = R) : ((R = gd(n)), R !== null && (T.data = R)))),
        (R = Qh ? Kh(e, n) : Yh(e, n)) &&
          ((d = di(d, "onBeforeInput")),
          0 < d.length &&
            ((f = new ru("onBeforeInput", "beforeinput", null, n, f)),
            p.push({ event: f, listeners: d }),
            (f.data = R))));
    }
    bd(p, t);
  });
}
function ts(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function di(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var s = e,
      i = s.stateNode;
    (s.tag === 5 &&
      i !== null &&
      ((s = i),
      (i = Kr(e, n)),
      i != null && r.unshift(ts(e, i, s)),
      (i = Kr(e, t)),
      i != null && r.push(ts(e, i, s))),
      (e = e.return));
  }
  return r;
}
function Dn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function mu(e, t, n, r, s) {
  for (var i = t._reactName, l = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      d = a.stateNode;
    if (u !== null && u === r) break;
    (a.tag === 5 &&
      d !== null &&
      ((a = d),
      s
        ? ((u = Kr(n, i)), u != null && l.unshift(ts(n, u, a)))
        : s || ((u = Kr(n, i)), u != null && l.push(ts(n, u, a)))),
      (n = n.return));
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var um = /\r\n?/g,
  cm = /\u0000|\uFFFD/g;
function gu(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      um,
      `
`,
    )
    .replace(cm, "");
}
function As(e, t, n) {
  if (((t = gu(t)), gu(e) !== t && n)) throw Error(E(425));
}
function fi() {}
var eo = null,
  to = null;
function no(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var ro = typeof setTimeout == "function" ? setTimeout : void 0,
  dm = typeof clearTimeout == "function" ? clearTimeout : void 0,
  vu = typeof Promise == "function" ? Promise : void 0,
  fm =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof vu < "u"
        ? function (e) {
            return vu.resolve(null).then(e).catch(pm);
          }
        : ro;
function pm(e) {
  setTimeout(function () {
    throw e;
  });
}
function gl(e, t) {
  var n = t,
    r = 0;
  do {
    var s = n.nextSibling;
    if ((e.removeChild(n), s && s.nodeType === 8))
      if (((n = s.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(s), Jr(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = s;
  } while (n);
  Jr(t);
}
function nn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function yu(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var mr = Math.random().toString(36).slice(2),
  Rt = "__reactFiber$" + mr,
  ns = "__reactProps$" + mr,
  Ft = "__reactContainer$" + mr,
  so = "__reactEvents$" + mr,
  hm = "__reactListeners$" + mr,
  mm = "__reactHandles$" + mr;
function wn(e) {
  var t = e[Rt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Ft] || n[Rt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = yu(e); e !== null; ) {
          if ((n = e[Rt])) return n;
          e = yu(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function ms(e) {
  return (
    (e = e[Rt] || e[Ft]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Wn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(E(33));
}
function zi(e) {
  return e[ns] || null;
}
var io = [],
  Vn = -1;
function fn(e) {
  return { current: e };
}
function X(e) {
  0 > Vn || ((e.current = io[Vn]), (io[Vn] = null), Vn--);
}
function Y(e, t) {
  (Vn++, (io[Vn] = e.current), (e.current = t));
}
var cn = {},
  De = fn(cn),
  qe = fn(!1),
  Cn = cn;
function sr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return cn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var s = {},
    i;
  for (i in n) s[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = s)),
    s
  );
}
function Qe(e) {
  return ((e = e.childContextTypes), e != null);
}
function pi() {
  (X(qe), X(De));
}
function wu(e, t, n) {
  if (De.current !== cn) throw Error(E(168));
  (Y(De, t), Y(qe, n));
}
function Td(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var s in r) if (!(s in t)) throw Error(E(108, Zp(e) || "Unknown", s));
  return ie({}, n, r);
}
function hi(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || cn),
    (Cn = De.current),
    Y(De, e),
    Y(qe, qe.current),
    !0
  );
}
function xu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(E(169));
  (n
    ? ((e = Td(e, t, Cn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      X(qe),
      X(De),
      Y(De, e))
    : X(qe),
    Y(qe, n));
}
var Lt = null,
  Fi = !1,
  vl = !1;
function _d(e) {
  Lt === null ? (Lt = [e]) : Lt.push(e);
}
function gm(e) {
  ((Fi = !0), _d(e));
}
function pn() {
  if (!vl && Lt !== null) {
    vl = !0;
    var e = 0,
      t = K;
    try {
      var n = Lt;
      for (K = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((Lt = null), (Fi = !1));
    } catch (s) {
      throw (Lt !== null && (Lt = Lt.slice(e + 1)), nd(Wo, pn), s);
    } finally {
      ((K = t), (vl = !1));
    }
  }
  return null;
}
var qn = [],
  Qn = 0,
  mi = null,
  gi = 0,
  it = [],
  lt = 0,
  Rn = null,
  It = 1,
  At = "";
function vn(e, t) {
  ((qn[Qn++] = gi), (qn[Qn++] = mi), (mi = e), (gi = t));
}
function Od(e, t, n) {
  ((it[lt++] = It), (it[lt++] = At), (it[lt++] = Rn), (Rn = e));
  var r = It;
  e = At;
  var s = 32 - vt(r) - 1;
  ((r &= ~(1 << s)), (n += 1));
  var i = 32 - vt(t) + s;
  if (30 < i) {
    var l = s - (s % 5);
    ((i = (r & ((1 << l) - 1)).toString(32)),
      (r >>= l),
      (s -= l),
      (It = (1 << (32 - vt(t) + s)) | (n << s) | r),
      (At = i + e));
  } else ((It = (1 << i) | (n << s) | r), (At = e));
}
function Zo(e) {
  e.return !== null && (vn(e, 1), Od(e, 1, 0));
}
function ea(e) {
  for (; e === mi; )
    ((mi = qn[--Qn]), (qn[Qn] = null), (gi = qn[--Qn]), (qn[Qn] = null));
  for (; e === Rn; )
    ((Rn = it[--lt]),
      (it[lt] = null),
      (At = it[--lt]),
      (it[lt] = null),
      (It = it[--lt]),
      (it[lt] = null));
}
var Ze = null,
  Xe = null,
  Z = !1,
  gt = null;
function Ld(e, t) {
  var n = ot(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function Su(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ze = e), (Xe = nn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ze = e), (Xe = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Rn !== null ? { id: It, overflow: At } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = ot(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ze = e),
            (Xe = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function lo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function oo(e) {
  if (Z) {
    var t = Xe;
    if (t) {
      var n = t;
      if (!Su(e, t)) {
        if (lo(e)) throw Error(E(418));
        t = nn(n.nextSibling);
        var r = Ze;
        t && Su(e, t)
          ? Ld(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (Z = !1), (Ze = e));
      }
    } else {
      if (lo(e)) throw Error(E(418));
      ((e.flags = (e.flags & -4097) | 2), (Z = !1), (Ze = e));
    }
  }
}
function ju(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ze = e;
}
function Ds(e) {
  if (e !== Ze) return !1;
  if (!Z) return (ju(e), (Z = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !no(e.type, e.memoizedProps))),
    t && (t = Xe))
  ) {
    if (lo(e)) throw (Id(), Error(E(418)));
    for (; t; ) (Ld(e, t), (t = nn(t.nextSibling)));
  }
  if ((ju(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(E(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Xe = nn(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Xe = null;
    }
  } else Xe = Ze ? nn(e.stateNode.nextSibling) : null;
  return !0;
}
function Id() {
  for (var e = Xe; e; ) e = nn(e.nextSibling);
}
function ir() {
  ((Xe = Ze = null), (Z = !1));
}
function ta(e) {
  gt === null ? (gt = [e]) : gt.push(e);
}
var vm = Bt.ReactCurrentBatchConfig;
function Pr(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(E(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(E(147, e));
      var s = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (l) {
            var a = s.refs;
            l === null ? delete a[i] : (a[i] = l);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(E(284));
    if (!n._owner) throw Error(E(290, e));
  }
  return e;
}
function zs(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      E(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function Nu(e) {
  var t = e._init;
  return t(e._payload);
}
function Ad(e) {
  function t(c, m) {
    if (e) {
      var h = c.deletions;
      h === null ? ((c.deletions = [m]), (c.flags |= 16)) : h.push(m);
    }
  }
  function n(c, m) {
    if (!e) return null;
    for (; m !== null; ) (t(c, m), (m = m.sibling));
    return null;
  }
  function r(c, m) {
    for (c = new Map(); m !== null; )
      (m.key !== null ? c.set(m.key, m) : c.set(m.index, m), (m = m.sibling));
    return c;
  }
  function s(c, m) {
    return ((c = on(c, m)), (c.index = 0), (c.sibling = null), c);
  }
  function i(c, m, h) {
    return (
      (c.index = h),
      e
        ? ((h = c.alternate),
          h !== null
            ? ((h = h.index), h < m ? ((c.flags |= 2), m) : h)
            : ((c.flags |= 2), m))
        : ((c.flags |= 1048576), m)
    );
  }
  function l(c) {
    return (e && c.alternate === null && (c.flags |= 2), c);
  }
  function a(c, m, h, x) {
    return m === null || m.tag !== 6
      ? ((m = kl(h, c.mode, x)), (m.return = c), m)
      : ((m = s(m, h)), (m.return = c), m);
  }
  function u(c, m, h, x) {
    var k = h.type;
    return k === Mn
      ? f(c, m, h.props.children, x, h.key)
      : m !== null &&
          (m.elementType === k ||
            (typeof k == "object" &&
              k !== null &&
              k.$$typeof === qt &&
              Nu(k) === m.type))
        ? ((x = s(m, h.props)), (x.ref = Pr(c, m, h)), (x.return = c), x)
        : ((x = ei(h.type, h.key, h.props, null, c.mode, x)),
          (x.ref = Pr(c, m, h)),
          (x.return = c),
          x);
  }
  function d(c, m, h, x) {
    return m === null ||
      m.tag !== 4 ||
      m.stateNode.containerInfo !== h.containerInfo ||
      m.stateNode.implementation !== h.implementation
      ? ((m = El(h, c.mode, x)), (m.return = c), m)
      : ((m = s(m, h.children || [])), (m.return = c), m);
  }
  function f(c, m, h, x, k) {
    return m === null || m.tag !== 7
      ? ((m = kn(h, c.mode, x, k)), (m.return = c), m)
      : ((m = s(m, h)), (m.return = c), m);
  }
  function p(c, m, h) {
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return ((m = kl("" + m, c.mode, h)), (m.return = c), m);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Cs:
          return (
            (h = ei(m.type, m.key, m.props, null, c.mode, h)),
            (h.ref = Pr(c, null, m)),
            (h.return = c),
            h
          );
        case Un:
          return ((m = El(m, c.mode, h)), (m.return = c), m);
        case qt:
          var x = m._init;
          return p(c, x(m._payload), h);
      }
      if (Ir(m) || kr(m))
        return ((m = kn(m, c.mode, h, null)), (m.return = c), m);
      zs(c, m);
    }
    return null;
  }
  function g(c, m, h, x) {
    var k = m !== null ? m.key : null;
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return k !== null ? null : a(c, m, "" + h, x);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Cs:
          return h.key === k ? u(c, m, h, x) : null;
        case Un:
          return h.key === k ? d(c, m, h, x) : null;
        case qt:
          return ((k = h._init), g(c, m, k(h._payload), x));
      }
      if (Ir(h) || kr(h)) return k !== null ? null : f(c, m, h, x, null);
      zs(c, h);
    }
    return null;
  }
  function y(c, m, h, x, k) {
    if ((typeof x == "string" && x !== "") || typeof x == "number")
      return ((c = c.get(h) || null), a(m, c, "" + x, k));
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Cs:
          return (
            (c = c.get(x.key === null ? h : x.key) || null),
            u(m, c, x, k)
          );
        case Un:
          return (
            (c = c.get(x.key === null ? h : x.key) || null),
            d(m, c, x, k)
          );
        case qt:
          var C = x._init;
          return y(c, m, h, C(x._payload), k);
      }
      if (Ir(x) || kr(x)) return ((c = c.get(h) || null), f(m, c, x, k, null));
      zs(m, x);
    }
    return null;
  }
  function j(c, m, h, x) {
    for (
      var k = null, C = null, R = m, T = (m = 0), H = null;
      R !== null && T < h.length;
      T++
    ) {
      R.index > T ? ((H = R), (R = null)) : (H = R.sibling);
      var O = g(c, R, h[T], x);
      if (O === null) {
        R === null && (R = H);
        break;
      }
      (e && R && O.alternate === null && t(c, R),
        (m = i(O, m, T)),
        C === null ? (k = O) : (C.sibling = O),
        (C = O),
        (R = H));
    }
    if (T === h.length) return (n(c, R), Z && vn(c, T), k);
    if (R === null) {
      for (; T < h.length; T++)
        ((R = p(c, h[T], x)),
          R !== null &&
            ((m = i(R, m, T)),
            C === null ? (k = R) : (C.sibling = R),
            (C = R)));
      return (Z && vn(c, T), k);
    }
    for (R = r(c, R); T < h.length; T++)
      ((H = y(R, c, T, h[T], x)),
        H !== null &&
          (e && H.alternate !== null && R.delete(H.key === null ? T : H.key),
          (m = i(H, m, T)),
          C === null ? (k = H) : (C.sibling = H),
          (C = H)));
    return (
      e &&
        R.forEach(function (U) {
          return t(c, U);
        }),
      Z && vn(c, T),
      k
    );
  }
  function S(c, m, h, x) {
    var k = kr(h);
    if (typeof k != "function") throw Error(E(150));
    if (((h = k.call(h)), h == null)) throw Error(E(151));
    for (
      var C = (k = null), R = m, T = (m = 0), H = null, O = h.next();
      R !== null && !O.done;
      T++, O = h.next()
    ) {
      R.index > T ? ((H = R), (R = null)) : (H = R.sibling);
      var U = g(c, R, O.value, x);
      if (U === null) {
        R === null && (R = H);
        break;
      }
      (e && R && U.alternate === null && t(c, R),
        (m = i(U, m, T)),
        C === null ? (k = U) : (C.sibling = U),
        (C = U),
        (R = H));
    }
    if (O.done) return (n(c, R), Z && vn(c, T), k);
    if (R === null) {
      for (; !O.done; T++, O = h.next())
        ((O = p(c, O.value, x)),
          O !== null &&
            ((m = i(O, m, T)),
            C === null ? (k = O) : (C.sibling = O),
            (C = O)));
      return (Z && vn(c, T), k);
    }
    for (R = r(c, R); !O.done; T++, O = h.next())
      ((O = y(R, c, T, O.value, x)),
        O !== null &&
          (e && O.alternate !== null && R.delete(O.key === null ? T : O.key),
          (m = i(O, m, T)),
          C === null ? (k = O) : (C.sibling = O),
          (C = O)));
    return (
      e &&
        R.forEach(function (pe) {
          return t(c, pe);
        }),
      Z && vn(c, T),
      k
    );
  }
  function N(c, m, h, x) {
    if (
      (typeof h == "object" &&
        h !== null &&
        h.type === Mn &&
        h.key === null &&
        (h = h.props.children),
      typeof h == "object" && h !== null)
    ) {
      switch (h.$$typeof) {
        case Cs:
          e: {
            for (var k = h.key, C = m; C !== null; ) {
              if (C.key === k) {
                if (((k = h.type), k === Mn)) {
                  if (C.tag === 7) {
                    (n(c, C.sibling),
                      (m = s(C, h.props.children)),
                      (m.return = c),
                      (c = m));
                    break e;
                  }
                } else if (
                  C.elementType === k ||
                  (typeof k == "object" &&
                    k !== null &&
                    k.$$typeof === qt &&
                    Nu(k) === C.type)
                ) {
                  (n(c, C.sibling),
                    (m = s(C, h.props)),
                    (m.ref = Pr(c, C, h)),
                    (m.return = c),
                    (c = m));
                  break e;
                }
                n(c, C);
                break;
              } else t(c, C);
              C = C.sibling;
            }
            h.type === Mn
              ? ((m = kn(h.props.children, c.mode, x, h.key)),
                (m.return = c),
                (c = m))
              : ((x = ei(h.type, h.key, h.props, null, c.mode, x)),
                (x.ref = Pr(c, m, h)),
                (x.return = c),
                (c = x));
          }
          return l(c);
        case Un:
          e: {
            for (C = h.key; m !== null; ) {
              if (m.key === C)
                if (
                  m.tag === 4 &&
                  m.stateNode.containerInfo === h.containerInfo &&
                  m.stateNode.implementation === h.implementation
                ) {
                  (n(c, m.sibling),
                    (m = s(m, h.children || [])),
                    (m.return = c),
                    (c = m));
                  break e;
                } else {
                  n(c, m);
                  break;
                }
              else t(c, m);
              m = m.sibling;
            }
            ((m = El(h, c.mode, x)), (m.return = c), (c = m));
          }
          return l(c);
        case qt:
          return ((C = h._init), N(c, m, C(h._payload), x));
      }
      if (Ir(h)) return j(c, m, h, x);
      if (kr(h)) return S(c, m, h, x);
      zs(c, h);
    }
    return (typeof h == "string" && h !== "") || typeof h == "number"
      ? ((h = "" + h),
        m !== null && m.tag === 6
          ? (n(c, m.sibling), (m = s(m, h)), (m.return = c), (c = m))
          : (n(c, m), (m = kl(h, c.mode, x)), (m.return = c), (c = m)),
        l(c))
      : n(c, m);
  }
  return N;
}
var lr = Ad(!0),
  Dd = Ad(!1),
  vi = fn(null),
  yi = null,
  Kn = null,
  na = null;
function ra() {
  na = Kn = yi = null;
}
function sa(e) {
  var t = vi.current;
  (X(vi), (e._currentValue = t));
}
function ao(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function tr(e, t) {
  ((yi = e),
    (na = Kn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ve = !0), (e.firstContext = null)));
}
function ct(e) {
  var t = e._currentValue;
  if (na !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Kn === null)) {
      if (yi === null) throw Error(E(308));
      ((Kn = e), (yi.dependencies = { lanes: 0, firstContext: e }));
    } else Kn = Kn.next = e;
  return t;
}
var xn = null;
function ia(e) {
  xn === null ? (xn = [e]) : xn.push(e);
}
function zd(e, t, n, r) {
  var s = t.interleaved;
  return (
    s === null ? ((n.next = n), ia(t)) : ((n.next = s.next), (s.next = n)),
    (t.interleaved = n),
    Ut(e, r)
  );
}
function Ut(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    ((e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return));
  return n.tag === 3 ? n.stateNode : null;
}
var Qt = !1;
function la(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Fd(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function Dt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function rn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), q & 2)) {
    var s = r.pending;
    return (
      s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
      (r.pending = t),
      Ut(e, n)
    );
  }
  return (
    (s = r.interleaved),
    s === null ? ((t.next = t), ia(r)) : ((t.next = s.next), (s.next = t)),
    (r.interleaved = t),
    Ut(e, n)
  );
}
function Ks(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Vo(e, n));
  }
}
function ku(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var s = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var l = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (s = i = l) : (i = i.next = l), (n = n.next));
      } while (n !== null);
      i === null ? (s = i = t) : (i = i.next = t);
    } else s = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: s,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n));
    return;
  }
  ((e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t));
}
function wi(e, t, n, r) {
  var s = e.updateQueue;
  Qt = !1;
  var i = s.firstBaseUpdate,
    l = s.lastBaseUpdate,
    a = s.shared.pending;
  if (a !== null) {
    s.shared.pending = null;
    var u = a,
      d = u.next;
    ((u.next = null), l === null ? (i = d) : (l.next = d), (l = u));
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (a = f.lastBaseUpdate),
      a !== l &&
        (a === null ? (f.firstBaseUpdate = d) : (a.next = d),
        (f.lastBaseUpdate = u)));
  }
  if (i !== null) {
    var p = s.baseState;
    ((l = 0), (f = d = u = null), (a = i));
    do {
      var g = a.lane,
        y = a.eventTime;
      if ((r & g) === g) {
        f !== null &&
          (f = f.next =
            {
              eventTime: y,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var j = e,
            S = a;
          switch (((g = t), (y = n), S.tag)) {
            case 1:
              if (((j = S.payload), typeof j == "function")) {
                p = j.call(y, p, g);
                break e;
              }
              p = j;
              break e;
            case 3:
              j.flags = (j.flags & -65537) | 128;
            case 0:
              if (
                ((j = S.payload),
                (g = typeof j == "function" ? j.call(y, p, g) : j),
                g == null)
              )
                break e;
              p = ie({}, p, g);
              break e;
            case 2:
              Qt = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (g = s.effects),
          g === null ? (s.effects = [a]) : g.push(a));
      } else
        ((y = {
          eventTime: y,
          lane: g,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          f === null ? ((d = f = y), (u = p)) : (f = f.next = y),
          (l |= g));
      if (((a = a.next), a === null)) {
        if (((a = s.shared.pending), a === null)) break;
        ((g = a),
          (a = g.next),
          (g.next = null),
          (s.lastBaseUpdate = g),
          (s.shared.pending = null));
      }
    } while (!0);
    if (
      (f === null && (u = p),
      (s.baseState = u),
      (s.firstBaseUpdate = d),
      (s.lastBaseUpdate = f),
      (t = s.shared.interleaved),
      t !== null)
    ) {
      s = t;
      do ((l |= s.lane), (s = s.next));
      while (s !== t);
    } else i === null && (s.shared.lanes = 0);
    ((Pn |= l), (e.lanes = l), (e.memoizedState = p));
  }
}
function Eu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        s = r.callback;
      if (s !== null) {
        if (((r.callback = null), (r = n), typeof s != "function"))
          throw Error(E(191, s));
        s.call(r);
      }
    }
}
var gs = {},
  Pt = fn(gs),
  rs = fn(gs),
  ss = fn(gs);
function Sn(e) {
  if (e === gs) throw Error(E(174));
  return e;
}
function oa(e, t) {
  switch ((Y(ss, t), Y(rs, e), Y(Pt, gs), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : $l(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = $l(t, e)));
  }
  (X(Pt), Y(Pt, t));
}
function or() {
  (X(Pt), X(rs), X(ss));
}
function Ud(e) {
  Sn(ss.current);
  var t = Sn(Pt.current),
    n = $l(t, e.type);
  t !== n && (Y(rs, e), Y(Pt, n));
}
function aa(e) {
  rs.current === e && (X(Pt), X(rs));
}
var re = fn(0);
function xi(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var yl = [];
function ua() {
  for (var e = 0; e < yl.length; e++)
    yl[e]._workInProgressVersionPrimary = null;
  yl.length = 0;
}
var Ys = Bt.ReactCurrentDispatcher,
  wl = Bt.ReactCurrentBatchConfig,
  bn = 0,
  se = null,
  ge = null,
  Se = null,
  Si = !1,
  $r = !1,
  is = 0,
  ym = 0;
function Te() {
  throw Error(E(321));
}
function ca(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!wt(e[n], t[n])) return !1;
  return !0;
}
function da(e, t, n, r, s, i) {
  if (
    ((bn = i),
    (se = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ys.current = e === null || e.memoizedState === null ? jm : Nm),
    (e = n(r, s)),
    $r)
  ) {
    i = 0;
    do {
      if ((($r = !1), (is = 0), 25 <= i)) throw Error(E(301));
      ((i += 1),
        (Se = ge = null),
        (t.updateQueue = null),
        (Ys.current = km),
        (e = n(r, s)));
    } while ($r);
  }
  if (
    ((Ys.current = ji),
    (t = ge !== null && ge.next !== null),
    (bn = 0),
    (Se = ge = se = null),
    (Si = !1),
    t)
  )
    throw Error(E(300));
  return e;
}
function fa() {
  var e = is !== 0;
  return ((is = 0), e);
}
function Ct() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (Se === null ? (se.memoizedState = Se = e) : (Se = Se.next = e), Se);
}
function dt() {
  if (ge === null) {
    var e = se.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ge.next;
  var t = Se === null ? se.memoizedState : Se.next;
  if (t !== null) ((Se = t), (ge = e));
  else {
    if (e === null) throw Error(E(310));
    ((ge = e),
      (e = {
        memoizedState: ge.memoizedState,
        baseState: ge.baseState,
        baseQueue: ge.baseQueue,
        queue: ge.queue,
        next: null,
      }),
      Se === null ? (se.memoizedState = Se = e) : (Se = Se.next = e));
  }
  return Se;
}
function ls(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function xl(e) {
  var t = dt(),
    n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = ge,
    s = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (s !== null) {
      var l = s.next;
      ((s.next = i.next), (i.next = l));
    }
    ((r.baseQueue = s = i), (n.pending = null));
  }
  if (s !== null) {
    ((i = s.next), (r = r.baseState));
    var a = (l = null),
      u = null,
      d = i;
    do {
      var f = d.lane;
      if ((bn & f) === f)
        (u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
          (r = d.hasEagerState ? d.eagerState : e(r, d.action)));
      else {
        var p = {
          lane: f,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null,
        };
        (u === null ? ((a = u = p), (l = r)) : (u = u.next = p),
          (se.lanes |= f),
          (Pn |= f));
      }
      d = d.next;
    } while (d !== null && d !== i);
    (u === null ? (l = r) : (u.next = a),
      wt(r, t.memoizedState) || (Ve = !0),
      (t.memoizedState = r),
      (t.baseState = l),
      (t.baseQueue = u),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    s = e;
    do ((i = s.lane), (se.lanes |= i), (Pn |= i), (s = s.next));
    while (s !== e);
  } else s === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Sl(e) {
  var t = dt(),
    n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    s = n.pending,
    i = t.memoizedState;
  if (s !== null) {
    n.pending = null;
    var l = (s = s.next);
    do ((i = e(i, l.action)), (l = l.next));
    while (l !== s);
    (wt(i, t.memoizedState) || (Ve = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function Md() {}
function Bd(e, t) {
  var n = se,
    r = dt(),
    s = t(),
    i = !wt(r.memoizedState, s);
  if (
    (i && ((r.memoizedState = s), (Ve = !0)),
    (r = r.queue),
    pa(Wd.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (Se !== null && Se.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      os(9, Hd.bind(null, n, r, s, t), void 0, null),
      je === null)
    )
      throw Error(E(349));
    bn & 30 || $d(n, t, s);
  }
  return s;
}
function $d(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (se.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function Hd(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Vd(t) && qd(e));
}
function Wd(e, t, n) {
  return n(function () {
    Vd(t) && qd(e);
  });
}
function Vd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !wt(e, n);
  } catch {
    return !0;
  }
}
function qd(e) {
  var t = Ut(e, 1);
  t !== null && yt(t, e, 1, -1);
}
function Cu(e) {
  var t = Ct();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ls,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Sm.bind(null, se, e)),
    [t.memoizedState, e]
  );
}
function os(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = se.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (se.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function Qd() {
  return dt().memoizedState;
}
function Gs(e, t, n, r) {
  var s = Ct();
  ((se.flags |= e),
    (s.memoizedState = os(1 | t, n, void 0, r === void 0 ? null : r)));
}
function Ui(e, t, n, r) {
  var s = dt();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ge !== null) {
    var l = ge.memoizedState;
    if (((i = l.destroy), r !== null && ca(r, l.deps))) {
      s.memoizedState = os(t, n, i, r);
      return;
    }
  }
  ((se.flags |= e), (s.memoizedState = os(1 | t, n, i, r)));
}
function Ru(e, t) {
  return Gs(8390656, 8, e, t);
}
function pa(e, t) {
  return Ui(2048, 8, e, t);
}
function Kd(e, t) {
  return Ui(4, 2, e, t);
}
function Yd(e, t) {
  return Ui(4, 4, e, t);
}
function Gd(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Jd(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    Ui(4, 4, Gd.bind(null, t, e), n)
  );
}
function ha() {}
function Xd(e, t) {
  var n = dt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ca(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Zd(e, t) {
  var n = dt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ca(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function ef(e, t, n) {
  return bn & 21
    ? (wt(n, t) || ((n = id()), (se.lanes |= n), (Pn |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ve = !0)), (e.memoizedState = n));
}
function wm(e, t) {
  var n = K;
  ((K = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = wl.transition;
  wl.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((K = n), (wl.transition = r));
  }
}
function tf() {
  return dt().memoizedState;
}
function xm(e, t, n) {
  var r = ln(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    nf(e))
  )
    rf(t, n);
  else if (((n = zd(e, t, n, r)), n !== null)) {
    var s = Me();
    (yt(n, e, r, s), sf(n, t, r));
  }
}
function Sm(e, t, n) {
  var r = ln(e),
    s = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (nf(e)) rf(t, s);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var l = t.lastRenderedState,
          a = i(l, n);
        if (((s.hasEagerState = !0), (s.eagerState = a), wt(a, l))) {
          var u = t.interleaved;
          (u === null
            ? ((s.next = s), ia(t))
            : ((s.next = u.next), (u.next = s)),
            (t.interleaved = s));
          return;
        }
      } catch {
      } finally {
      }
    ((n = zd(e, t, s, r)),
      n !== null && ((s = Me()), yt(n, e, r, s), sf(n, t, r)));
  }
}
function nf(e) {
  var t = e.alternate;
  return e === se || (t !== null && t === se);
}
function rf(e, t) {
  $r = Si = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function sf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Vo(e, n));
  }
}
var ji = {
    readContext: ct,
    useCallback: Te,
    useContext: Te,
    useEffect: Te,
    useImperativeHandle: Te,
    useInsertionEffect: Te,
    useLayoutEffect: Te,
    useMemo: Te,
    useReducer: Te,
    useRef: Te,
    useState: Te,
    useDebugValue: Te,
    useDeferredValue: Te,
    useTransition: Te,
    useMutableSource: Te,
    useSyncExternalStore: Te,
    useId: Te,
    unstable_isNewReconciler: !1,
  },
  jm = {
    readContext: ct,
    useCallback: function (e, t) {
      return ((Ct().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: ct,
    useEffect: Ru,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Gs(4194308, 4, Gd.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Gs(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Gs(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Ct();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = Ct();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = xm.bind(null, se, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Ct();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: Cu,
    useDebugValue: ha,
    useDeferredValue: function (e) {
      return (Ct().memoizedState = e);
    },
    useTransition: function () {
      var e = Cu(!1),
        t = e[0];
      return ((e = wm.bind(null, e[1])), (Ct().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = se,
        s = Ct();
      if (Z) {
        if (n === void 0) throw Error(E(407));
        n = n();
      } else {
        if (((n = t()), je === null)) throw Error(E(349));
        bn & 30 || $d(r, t, n);
      }
      s.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (s.queue = i),
        Ru(Wd.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        os(9, Hd.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Ct(),
        t = je.identifierPrefix;
      if (Z) {
        var n = At,
          r = It;
        ((n = (r & ~(1 << (32 - vt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = is++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = ym++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Nm = {
    readContext: ct,
    useCallback: Xd,
    useContext: ct,
    useEffect: pa,
    useImperativeHandle: Jd,
    useInsertionEffect: Kd,
    useLayoutEffect: Yd,
    useMemo: Zd,
    useReducer: xl,
    useRef: Qd,
    useState: function () {
      return xl(ls);
    },
    useDebugValue: ha,
    useDeferredValue: function (e) {
      var t = dt();
      return ef(t, ge.memoizedState, e);
    },
    useTransition: function () {
      var e = xl(ls)[0],
        t = dt().memoizedState;
      return [e, t];
    },
    useMutableSource: Md,
    useSyncExternalStore: Bd,
    useId: tf,
    unstable_isNewReconciler: !1,
  },
  km = {
    readContext: ct,
    useCallback: Xd,
    useContext: ct,
    useEffect: pa,
    useImperativeHandle: Jd,
    useInsertionEffect: Kd,
    useLayoutEffect: Yd,
    useMemo: Zd,
    useReducer: Sl,
    useRef: Qd,
    useState: function () {
      return Sl(ls);
    },
    useDebugValue: ha,
    useDeferredValue: function (e) {
      var t = dt();
      return ge === null ? (t.memoizedState = e) : ef(t, ge.memoizedState, e);
    },
    useTransition: function () {
      var e = Sl(ls)[0],
        t = dt().memoizedState;
      return [e, t];
    },
    useMutableSource: Md,
    useSyncExternalStore: Bd,
    useId: tf,
    unstable_isNewReconciler: !1,
  };
function ht(e, t) {
  if (e && e.defaultProps) {
    ((t = ie({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function uo(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : ie({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var Mi = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? In(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Me(),
      s = ln(e),
      i = Dt(r, s);
    ((i.payload = t),
      n != null && (i.callback = n),
      (t = rn(e, i, s)),
      t !== null && (yt(t, e, s, r), Ks(t, e, s)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Me(),
      s = ln(e),
      i = Dt(r, s);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = rn(e, i, s)),
      t !== null && (yt(t, e, s, r), Ks(t, e, s)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Me(),
      r = ln(e),
      s = Dt(n, r);
    ((s.tag = 2),
      t != null && (s.callback = t),
      (t = rn(e, s, r)),
      t !== null && (yt(t, e, r, n), Ks(t, e, r)));
  },
};
function bu(e, t, n, r, s, i, l) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, l)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Zr(n, r) || !Zr(s, i)
        : !0
  );
}
function lf(e, t, n) {
  var r = !1,
    s = cn,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = ct(i))
      : ((s = Qe(t) ? Cn : De.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? sr(e, s) : cn)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Mi),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = s),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function Pu(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Mi.enqueueReplaceState(t, t.state, null));
}
function co(e, t, n, r) {
  var s = e.stateNode;
  ((s.props = n), (s.state = e.memoizedState), (s.refs = {}), la(e));
  var i = t.contextType;
  (typeof i == "object" && i !== null
    ? (s.context = ct(i))
    : ((i = Qe(t) ? Cn : De.current), (s.context = sr(e, i))),
    (s.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (uo(e, t, i, n), (s.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function" ||
      (typeof s.UNSAFE_componentWillMount != "function" &&
        typeof s.componentWillMount != "function") ||
      ((t = s.state),
      typeof s.componentWillMount == "function" && s.componentWillMount(),
      typeof s.UNSAFE_componentWillMount == "function" &&
        s.UNSAFE_componentWillMount(),
      t !== s.state && Mi.enqueueReplaceState(s, s.state, null),
      wi(e, n, s, r),
      (s.state = e.memoizedState)),
    typeof s.componentDidMount == "function" && (e.flags |= 4194308));
}
function ar(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Xp(r)), (r = r.return));
    while (r);
    var s = n;
  } catch (i) {
    s =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: s, digest: null };
}
function jl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function fo(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Em = typeof WeakMap == "function" ? WeakMap : Map;
function of(e, t, n) {
  ((n = Dt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (ki || ((ki = !0), (jo = r)), fo(e, t));
    }),
    n
  );
}
function af(e, t, n) {
  ((n = Dt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var s = t.value;
    ((n.payload = function () {
      return r(s);
    }),
      (n.callback = function () {
        fo(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        (fo(e, t),
          typeof r != "function" &&
            (sn === null ? (sn = new Set([this])) : sn.add(this)));
        var l = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: l !== null ? l : "",
        });
      }),
    n
  );
}
function Tu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Em();
    var s = new Set();
    r.set(t, s);
  } else ((s = r.get(t)), s === void 0 && ((s = new Set()), r.set(t, s)));
  s.has(n) || (s.add(n), (e = Um.bind(null, e, t, n)), t.then(e, e));
}
function _u(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ou(e, t, n, r, s) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = s), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Dt(-1, 1)), (t.tag = 2), rn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Cm = Bt.ReactCurrentOwner,
  Ve = !1;
function Ue(e, t, n, r) {
  t.child = e === null ? Dd(t, null, n, r) : lr(t, e.child, n, r);
}
function Lu(e, t, n, r, s) {
  n = n.render;
  var i = t.ref;
  return (
    tr(t, s),
    (r = da(e, t, n, r, i, s)),
    (n = fa()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~s),
        Mt(e, t, s))
      : (Z && n && Zo(t), (t.flags |= 1), Ue(e, t, r, s), t.child)
  );
}
function Iu(e, t, n, r, s) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !ja(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), uf(e, t, i, r, s))
      : ((e = ei(n.type, null, r, t, t.mode, s)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & s))) {
    var l = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Zr), n(l, r) && e.ref === t.ref)
    )
      return Mt(e, t, s);
  }
  return (
    (t.flags |= 1),
    (e = on(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function uf(e, t, n, r, s) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Zr(i, r) && e.ref === t.ref)
      if (((Ve = !1), (t.pendingProps = r = i), (e.lanes & s) !== 0))
        e.flags & 131072 && (Ve = !0);
      else return ((t.lanes = e.lanes), Mt(e, t, s));
  }
  return po(e, t, n, r, s);
}
function cf(e, t, n) {
  var r = t.pendingProps,
    s = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Y(Gn, Je),
        (Je |= n));
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Y(Gn, Je),
          (Je |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        Y(Gn, Je),
        (Je |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Y(Gn, Je),
      (Je |= r));
  return (Ue(e, t, s, n), t.child);
}
function df(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function po(e, t, n, r, s) {
  var i = Qe(n) ? Cn : De.current;
  return (
    (i = sr(t, i)),
    tr(t, s),
    (n = da(e, t, n, r, i, s)),
    (r = fa()),
    e !== null && !Ve
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~s),
        Mt(e, t, s))
      : (Z && r && Zo(t), (t.flags |= 1), Ue(e, t, n, s), t.child)
  );
}
function Au(e, t, n, r, s) {
  if (Qe(n)) {
    var i = !0;
    hi(t);
  } else i = !1;
  if ((tr(t, s), t.stateNode === null))
    (Js(e, t), lf(t, n, r), co(t, n, r, s), (r = !0));
  else if (e === null) {
    var l = t.stateNode,
      a = t.memoizedProps;
    l.props = a;
    var u = l.context,
      d = n.contextType;
    typeof d == "object" && d !== null
      ? (d = ct(d))
      : ((d = Qe(n) ? Cn : De.current), (d = sr(t, d)));
    var f = n.getDerivedStateFromProps,
      p =
        typeof f == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function";
    (p ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((a !== r || u !== d) && Pu(t, l, r, d)),
      (Qt = !1));
    var g = t.memoizedState;
    ((l.state = g),
      wi(t, r, l, s),
      (u = t.memoizedState),
      a !== r || g !== u || qe.current || Qt
        ? (typeof f == "function" && (uo(t, n, f, r), (u = t.memoizedState)),
          (a = Qt || bu(t, n, a, r, g, u, d))
            ? (p ||
                (typeof l.UNSAFE_componentWillMount != "function" &&
                  typeof l.componentWillMount != "function") ||
                (typeof l.componentWillMount == "function" &&
                  l.componentWillMount(),
                typeof l.UNSAFE_componentWillMount == "function" &&
                  l.UNSAFE_componentWillMount()),
              typeof l.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (l.props = r),
          (l.state = u),
          (l.context = d),
          (r = a))
        : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((l = t.stateNode),
      Fd(e, t),
      (a = t.memoizedProps),
      (d = t.type === t.elementType ? a : ht(t.type, a)),
      (l.props = d),
      (p = t.pendingProps),
      (g = l.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = ct(u))
        : ((u = Qe(n) ? Cn : De.current), (u = sr(t, u))));
    var y = n.getDerivedStateFromProps;
    ((f =
      typeof y == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function") ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((a !== p || g !== u) && Pu(t, l, r, u)),
      (Qt = !1),
      (g = t.memoizedState),
      (l.state = g),
      wi(t, r, l, s));
    var j = t.memoizedState;
    a !== p || g !== j || qe.current || Qt
      ? (typeof y == "function" && (uo(t, n, y, r), (j = t.memoizedState)),
        (d = Qt || bu(t, n, d, r, g, j, u) || !1)
          ? (f ||
              (typeof l.UNSAFE_componentWillUpdate != "function" &&
                typeof l.componentWillUpdate != "function") ||
              (typeof l.componentWillUpdate == "function" &&
                l.componentWillUpdate(r, j, u),
              typeof l.UNSAFE_componentWillUpdate == "function" &&
                l.UNSAFE_componentWillUpdate(r, j, u)),
            typeof l.componentDidUpdate == "function" && (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof l.componentDidUpdate != "function" ||
              (a === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = j)),
        (l.props = r),
        (l.state = j),
        (l.context = u),
        (r = d))
      : (typeof l.componentDidUpdate != "function" ||
          (a === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 4),
        typeof l.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return ho(e, t, n, r, i, s);
}
function ho(e, t, n, r, s, i) {
  df(e, t);
  var l = (t.flags & 128) !== 0;
  if (!r && !l) return (s && xu(t, n, !1), Mt(e, t, i));
  ((r = t.stateNode), (Cm.current = t));
  var a =
    l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && l
      ? ((t.child = lr(t, e.child, null, i)), (t.child = lr(t, null, a, i)))
      : Ue(e, t, a, i),
    (t.memoizedState = r.state),
    s && xu(t, n, !0),
    t.child
  );
}
function ff(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? wu(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && wu(e, t.context, !1),
    oa(e, t.containerInfo));
}
function Du(e, t, n, r, s) {
  return (ir(), ta(s), (t.flags |= 256), Ue(e, t, n, r), t.child);
}
var mo = { dehydrated: null, treeContext: null, retryLane: 0 };
function go(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function pf(e, t, n) {
  var r = t.pendingProps,
    s = re.current,
    i = !1,
    l = (t.flags & 128) !== 0,
    a;
  if (
    ((a = l) ||
      (a = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0),
    a
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (s |= 1),
    Y(re, s & 1),
    e === null)
  )
    return (
      oo(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((l = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (l = { mode: "hidden", children: l }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = l))
                : (i = Hi(l, r, 0, null)),
              (e = kn(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = go(n)),
              (t.memoizedState = mo),
              e)
            : ma(t, l))
    );
  if (((s = e.memoizedState), s !== null && ((a = s.dehydrated), a !== null)))
    return Rm(e, t, l, r, a, s, n);
  if (i) {
    ((i = r.fallback), (l = t.mode), (s = e.child), (a = s.sibling));
    var u = { mode: "hidden", children: r.children };
    return (
      !(l & 1) && t.child !== s
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = on(s, u)), (r.subtreeFlags = s.subtreeFlags & 14680064)),
      a !== null ? (i = on(a, i)) : ((i = kn(i, l, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (l = e.child.memoizedState),
      (l =
        l === null
          ? go(n)
          : {
              baseLanes: l.baseLanes | n,
              cachePool: null,
              transitions: l.transitions,
            }),
      (i.memoizedState = l),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = mo),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = on(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function ma(e, t) {
  return (
    (t = Hi({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Fs(e, t, n, r) {
  return (
    r !== null && ta(r),
    lr(t, e.child, null, n),
    (e = ma(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Rm(e, t, n, r, s, i, l) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = jl(Error(E(422)))), Fs(e, t, l, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (s = t.mode),
          (r = Hi({ mode: "visible", children: r.children }, s, 0, null)),
          (i = kn(i, s, l, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && lr(t, e.child, null, l),
          (t.child.memoizedState = go(l)),
          (t.memoizedState = mo),
          i);
  if (!(t.mode & 1)) return Fs(e, t, l, null);
  if (s.data === "$!") {
    if (((r = s.nextSibling && s.nextSibling.dataset), r)) var a = r.dgst;
    return (
      (r = a),
      (i = Error(E(419))),
      (r = jl(i, r, void 0)),
      Fs(e, t, l, r)
    );
  }
  if (((a = (l & e.childLanes) !== 0), Ve || a)) {
    if (((r = je), r !== null)) {
      switch (l & -l) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      ((s = s & (r.suspendedLanes | l) ? 0 : s),
        s !== 0 &&
          s !== i.retryLane &&
          ((i.retryLane = s), Ut(e, s), yt(r, e, s, -1)));
    }
    return (Sa(), (r = jl(Error(E(421)))), Fs(e, t, l, r));
  }
  return s.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Mm.bind(null, e)),
      (s._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Xe = nn(s.nextSibling)),
      (Ze = t),
      (Z = !0),
      (gt = null),
      e !== null &&
        ((it[lt++] = It),
        (it[lt++] = At),
        (it[lt++] = Rn),
        (It = e.id),
        (At = e.overflow),
        (Rn = t)),
      (t = ma(t, r.children)),
      (t.flags |= 4096),
      t);
}
function zu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), ao(e.return, t, n));
}
function Nl(e, t, n, r, s) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: s,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = s));
}
function hf(e, t, n) {
  var r = t.pendingProps,
    s = r.revealOrder,
    i = r.tail;
  if ((Ue(e, t, r.children, n), (r = re.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && zu(e, n, t);
        else if (e.tag === 19) zu(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    r &= 1;
  }
  if ((Y(re, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (s) {
      case "forwards":
        for (n = t.child, s = null; n !== null; )
          ((e = n.alternate),
            e !== null && xi(e) === null && (s = n),
            (n = n.sibling));
        ((n = s),
          n === null
            ? ((s = t.child), (t.child = null))
            : ((s = n.sibling), (n.sibling = null)),
          Nl(t, !1, s, n, i));
        break;
      case "backwards":
        for (n = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && xi(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = n), (n = s), (s = e));
        }
        Nl(t, !0, n, null, i);
        break;
      case "together":
        Nl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Js(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Mt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Pn |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(E(153));
  if (t.child !== null) {
    for (
      e = t.child, n = on(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = on(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function bm(e, t, n) {
  switch (t.tag) {
    case 3:
      (ff(t), ir());
      break;
    case 5:
      Ud(t);
      break;
    case 1:
      Qe(t.type) && hi(t);
      break;
    case 4:
      oa(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        s = t.memoizedProps.value;
      (Y(vi, r._currentValue), (r._currentValue = s));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Y(re, re.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? pf(e, t, n)
            : (Y(re, re.current & 1),
              (e = Mt(e, t, n)),
              e !== null ? e.sibling : null);
      Y(re, re.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return hf(e, t, n);
        t.flags |= 128;
      }
      if (
        ((s = t.memoizedState),
        s !== null &&
          ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
        Y(re, re.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), cf(e, t, n));
  }
  return Mt(e, t, n);
}
var mf, vo, gf, vf;
mf = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
vo = function () {};
gf = function (e, t, n, r) {
  var s = e.memoizedProps;
  if (s !== r) {
    ((e = t.stateNode), Sn(Pt.current));
    var i = null;
    switch (n) {
      case "input":
        ((s = Fl(e, s)), (r = Fl(e, r)), (i = []));
        break;
      case "select":
        ((s = ie({}, s, { value: void 0 })),
          (r = ie({}, r, { value: void 0 })),
          (i = []));
        break;
      case "textarea":
        ((s = Bl(e, s)), (r = Bl(e, r)), (i = []));
        break;
      default:
        typeof s.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = fi);
    }
    Hl(n, r);
    var l;
    n = null;
    for (d in s)
      if (!r.hasOwnProperty(d) && s.hasOwnProperty(d) && s[d] != null)
        if (d === "style") {
          var a = s[d];
          for (l in a) a.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
        } else
          d !== "dangerouslySetInnerHTML" &&
            d !== "children" &&
            d !== "suppressContentEditableWarning" &&
            d !== "suppressHydrationWarning" &&
            d !== "autoFocus" &&
            (qr.hasOwnProperty(d)
              ? i || (i = [])
              : (i = i || []).push(d, null));
    for (d in r) {
      var u = r[d];
      if (
        ((a = s != null ? s[d] : void 0),
        r.hasOwnProperty(d) && u !== a && (u != null || a != null))
      )
        if (d === "style")
          if (a) {
            for (l in a)
              !a.hasOwnProperty(l) ||
                (u && u.hasOwnProperty(l)) ||
                (n || (n = {}), (n[l] = ""));
            for (l in u)
              u.hasOwnProperty(l) &&
                a[l] !== u[l] &&
                (n || (n = {}), (n[l] = u[l]));
          } else (n || (i || (i = []), i.push(d, n)), (n = u));
        else
          d === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (i = i || []).push(d, u))
            : d === "children"
              ? (typeof u != "string" && typeof u != "number") ||
                (i = i || []).push(d, "" + u)
              : d !== "suppressContentEditableWarning" &&
                d !== "suppressHydrationWarning" &&
                (qr.hasOwnProperty(d)
                  ? (u != null && d === "onScroll" && J("scroll", e),
                    i || a === u || (i = []))
                  : (i = i || []).push(d, u));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
vf = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Tr(e, t) {
  if (!Z)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          (t.alternate !== null && (n = t), (t = t.sibling));
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function _e(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var s = e.child; s !== null; )
      ((n |= s.lanes | s.childLanes),
        (r |= s.subtreeFlags & 14680064),
        (r |= s.flags & 14680064),
        (s.return = e),
        (s = s.sibling));
  else
    for (s = e.child; s !== null; )
      ((n |= s.lanes | s.childLanes),
        (r |= s.subtreeFlags),
        (r |= s.flags),
        (s.return = e),
        (s = s.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Pm(e, t, n) {
  var r = t.pendingProps;
  switch ((ea(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (_e(t), null);
    case 1:
      return (Qe(t.type) && pi(), _e(t), null);
    case 3:
      return (
        (r = t.stateNode),
        or(),
        X(qe),
        X(De),
        ua(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Ds(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), gt !== null && (Eo(gt), (gt = null)))),
        vo(e, t),
        _e(t),
        null
      );
    case 5:
      aa(t);
      var s = Sn(ss.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (gf(e, t, n, r, s),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(E(166));
          return (_e(t), null);
        }
        if (((e = Sn(Pt.current)), Ds(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[Rt] = t), (r[ns] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (J("cancel", r), J("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              J("load", r);
              break;
            case "video":
            case "audio":
              for (s = 0; s < Dr.length; s++) J(Dr[s], r);
              break;
            case "source":
              J("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (J("error", r), J("load", r));
              break;
            case "details":
              J("toggle", r);
              break;
            case "input":
              (qa(r, i), J("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                J("invalid", r));
              break;
            case "textarea":
              (Ka(r, i), J("invalid", r));
          }
          (Hl(n, i), (s = null));
          for (var l in i)
            if (i.hasOwnProperty(l)) {
              var a = i[l];
              l === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (i.suppressHydrationWarning !== !0 &&
                      As(r.textContent, a, e),
                    (s = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (i.suppressHydrationWarning !== !0 &&
                      As(r.textContent, a, e),
                    (s = ["children", "" + a]))
                : qr.hasOwnProperty(l) &&
                  a != null &&
                  l === "onScroll" &&
                  J("scroll", r);
            }
          switch (n) {
            case "input":
              (Rs(r), Qa(r, i, !0));
              break;
            case "textarea":
              (Rs(r), Ya(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = fi);
          }
          ((r = s), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((l = s.nodeType === 9 ? s : s.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Wc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = l.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = l.createElement(n, { is: r.is }))
                  : ((e = l.createElement(n)),
                    n === "select" &&
                      ((l = e),
                      r.multiple
                        ? (l.multiple = !0)
                        : r.size && (l.size = r.size)))
              : (e = l.createElementNS(e, n)),
            (e[Rt] = t),
            (e[ns] = r),
            mf(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((l = Wl(n, r)), n)) {
              case "dialog":
                (J("cancel", e), J("close", e), (s = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (J("load", e), (s = r));
                break;
              case "video":
              case "audio":
                for (s = 0; s < Dr.length; s++) J(Dr[s], e);
                s = r;
                break;
              case "source":
                (J("error", e), (s = r));
                break;
              case "img":
              case "image":
              case "link":
                (J("error", e), J("load", e), (s = r));
                break;
              case "details":
                (J("toggle", e), (s = r));
                break;
              case "input":
                (qa(e, r), (s = Fl(e, r)), J("invalid", e));
                break;
              case "option":
                s = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (s = ie({}, r, { value: void 0 })),
                  J("invalid", e));
                break;
              case "textarea":
                (Ka(e, r), (s = Bl(e, r)), J("invalid", e));
                break;
              default:
                s = r;
            }
            (Hl(n, s), (a = s));
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var u = a[i];
                i === "style"
                  ? Qc(e, u)
                  : i === "dangerouslySetInnerHTML"
                    ? ((u = u ? u.__html : void 0), u != null && Vc(e, u))
                    : i === "children"
                      ? typeof u == "string"
                        ? (n !== "textarea" || u !== "") && Qr(e, u)
                        : typeof u == "number" && Qr(e, "" + u)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (qr.hasOwnProperty(i)
                          ? u != null && i === "onScroll" && J("scroll", e)
                          : u != null && Uo(e, i, u, l));
              }
            switch (n) {
              case "input":
                (Rs(e), Qa(e, r, !1));
                break;
              case "textarea":
                (Rs(e), Ya(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + un(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Jn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Jn(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof s.onClick == "function" && (e.onclick = fi);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (_e(t), null);
    case 6:
      if (e && t.stateNode != null) vf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(E(166));
        if (((n = Sn(ss.current)), Sn(Pt.current), Ds(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Rt] = t),
            (i = r.nodeValue !== n) && ((e = Ze), e !== null))
          )
            switch (e.tag) {
              case 3:
                As(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  As(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Rt] = t),
            (t.stateNode = r));
      }
      return (_e(t), null);
    case 13:
      if (
        (X(re),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (Z && Xe !== null && t.mode & 1 && !(t.flags & 128))
          (Id(), ir(), (t.flags |= 98560), (i = !1));
        else if (((i = Ds(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(E(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(E(317));
            i[Rt] = t;
          } else
            (ir(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (_e(t), (i = !1));
        } else (gt !== null && (Eo(gt), (gt = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || re.current & 1 ? ve === 0 && (ve = 3) : Sa())),
          t.updateQueue !== null && (t.flags |= 4),
          _e(t),
          null);
    case 4:
      return (
        or(),
        vo(e, t),
        e === null && es(t.stateNode.containerInfo),
        _e(t),
        null
      );
    case 10:
      return (sa(t.type._context), _e(t), null);
    case 17:
      return (Qe(t.type) && pi(), _e(t), null);
    case 19:
      if ((X(re), (i = t.memoizedState), i === null)) return (_e(t), null);
      if (((r = (t.flags & 128) !== 0), (l = i.rendering), l === null))
        if (r) Tr(i, !1);
        else {
          if (ve !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((l = xi(e)), l !== null)) {
                for (
                  t.flags |= 128,
                    Tr(i, !1),
                    r = l.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (l = i.alternate),
                    l === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = l.childLanes),
                        (i.lanes = l.lanes),
                        (i.child = l.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = l.memoizedProps),
                        (i.memoizedState = l.memoizedState),
                        (i.updateQueue = l.updateQueue),
                        (i.type = l.type),
                        (e = l.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (Y(re, (re.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            ce() > ur &&
            ((t.flags |= 128), (r = !0), Tr(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = xi(l)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Tr(i, !0),
              i.tail === null && i.tailMode === "hidden" && !l.alternate && !Z)
            )
              return (_e(t), null);
          } else
            2 * ce() - i.renderingStartTime > ur &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Tr(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((l.sibling = t.child), (t.child = l))
          : ((n = i.last),
            n !== null ? (n.sibling = l) : (t.child = l),
            (i.last = l));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = ce()),
          (t.sibling = null),
          (n = re.current),
          Y(re, r ? (n & 1) | 2 : n & 1),
          t)
        : (_e(t), null);
    case 22:
    case 23:
      return (
        xa(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Je & 1073741824 && (_e(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : _e(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(E(156, t.tag));
}
function Tm(e, t) {
  switch ((ea(t), t.tag)) {
    case 1:
      return (
        Qe(t.type) && pi(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        or(),
        X(qe),
        X(De),
        ua(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (aa(t), null);
    case 13:
      if ((X(re), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(E(340));
        ir();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (X(re), null);
    case 4:
      return (or(), null);
    case 10:
      return (sa(t.type._context), null);
    case 22:
    case 23:
      return (xa(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var Us = !1,
  Ie = !1,
  _m = typeof WeakSet == "function" ? WeakSet : Set,
  _ = null;
function Yn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ae(e, t, r);
      }
    else n.current = null;
}
function yo(e, t, n) {
  try {
    n();
  } catch (r) {
    ae(e, t, r);
  }
}
var Fu = !1;
function Om(e, t) {
  if (((eo = ui), (e = Sd()), Xo(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var s = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var l = 0,
            a = -1,
            u = -1,
            d = 0,
            f = 0,
            p = e,
            g = null;
          t: for (;;) {
            for (
              var y;
              p !== n || (s !== 0 && p.nodeType !== 3) || (a = l + s),
                p !== i || (r !== 0 && p.nodeType !== 3) || (u = l + r),
                p.nodeType === 3 && (l += p.nodeValue.length),
                (y = p.firstChild) !== null;
            )
              ((g = p), (p = y));
            for (;;) {
              if (p === e) break t;
              if (
                (g === n && ++d === s && (a = l),
                g === i && ++f === r && (u = l),
                (y = p.nextSibling) !== null)
              )
                break;
              ((p = g), (g = p.parentNode));
            }
            p = y;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (to = { focusedElem: e, selectionRange: n }, ui = !1, _ = t; _ !== null; )
    if (((t = _), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (_ = e));
    else
      for (; _ !== null; ) {
        t = _;
        try {
          var j = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (j !== null) {
                  var S = j.memoizedProps,
                    N = j.memoizedState,
                    c = t.stateNode,
                    m = c.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? S : ht(t.type, S),
                      N,
                    );
                  c.__reactInternalSnapshotBeforeUpdate = m;
                }
                break;
              case 3:
                var h = t.stateNode.containerInfo;
                h.nodeType === 1
                  ? (h.textContent = "")
                  : h.nodeType === 9 &&
                    h.documentElement &&
                    h.removeChild(h.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(E(163));
            }
        } catch (x) {
          ae(t, t.return, x);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (_ = e));
          break;
        }
        _ = t.return;
      }
  return ((j = Fu), (Fu = !1), j);
}
function Hr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var s = (r = r.next);
    do {
      if ((s.tag & e) === e) {
        var i = s.destroy;
        ((s.destroy = void 0), i !== void 0 && yo(t, n, i));
      }
      s = s.next;
    } while (s !== r);
  }
}
function Bi(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function wo(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function yf(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), yf(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Rt], delete t[ns], delete t[so], delete t[hm], delete t[mm])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function wf(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Uu(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || wf(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function xo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = fi)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (xo(e, t, n), e = e.sibling; e !== null; )
      (xo(e, t, n), (e = e.sibling));
}
function So(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (So(e, t, n), e = e.sibling; e !== null; )
      (So(e, t, n), (e = e.sibling));
}
var Ee = null,
  mt = !1;
function Vt(e, t, n) {
  for (n = n.child; n !== null; ) (xf(e, t, n), (n = n.sibling));
}
function xf(e, t, n) {
  if (bt && typeof bt.onCommitFiberUnmount == "function")
    try {
      bt.onCommitFiberUnmount(Li, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Ie || Yn(n, t);
    case 6:
      var r = Ee,
        s = mt;
      ((Ee = null),
        Vt(e, t, n),
        (Ee = r),
        (mt = s),
        Ee !== null &&
          (mt
            ? ((e = Ee),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ee.removeChild(n.stateNode)));
      break;
    case 18:
      Ee !== null &&
        (mt
          ? ((e = Ee),
            (n = n.stateNode),
            e.nodeType === 8
              ? gl(e.parentNode, n)
              : e.nodeType === 1 && gl(e, n),
            Jr(e))
          : gl(Ee, n.stateNode));
      break;
    case 4:
      ((r = Ee),
        (s = mt),
        (Ee = n.stateNode.containerInfo),
        (mt = !0),
        Vt(e, t, n),
        (Ee = r),
        (mt = s));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ie &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        s = r = r.next;
        do {
          var i = s,
            l = i.destroy;
          ((i = i.tag),
            l !== void 0 && (i & 2 || i & 4) && yo(n, t, l),
            (s = s.next));
        } while (s !== r);
      }
      Vt(e, t, n);
      break;
    case 1:
      if (
        !Ie &&
        (Yn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (a) {
          ae(n, t, a);
        }
      Vt(e, t, n);
      break;
    case 21:
      Vt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Ie = (r = Ie) || n.memoizedState !== null), Vt(e, t, n), (Ie = r))
        : Vt(e, t, n);
      break;
    default:
      Vt(e, t, n);
  }
}
function Mu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new _m()),
      t.forEach(function (r) {
        var s = Bm.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(s, s));
      }));
  }
}
function pt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var s = n[r];
      try {
        var i = e,
          l = t,
          a = l;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              ((Ee = a.stateNode), (mt = !1));
              break e;
            case 3:
              ((Ee = a.stateNode.containerInfo), (mt = !0));
              break e;
            case 4:
              ((Ee = a.stateNode.containerInfo), (mt = !0));
              break e;
          }
          a = a.return;
        }
        if (Ee === null) throw Error(E(160));
        (xf(i, l, s), (Ee = null), (mt = !1));
        var u = s.alternate;
        (u !== null && (u.return = null), (s.return = null));
      } catch (d) {
        ae(s, t, d);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (Sf(t, e), (t = t.sibling));
}
function Sf(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((pt(t, e), Nt(e), r & 4)) {
        try {
          (Hr(3, e, e.return), Bi(3, e));
        } catch (S) {
          ae(e, e.return, S);
        }
        try {
          Hr(5, e, e.return);
        } catch (S) {
          ae(e, e.return, S);
        }
      }
      break;
    case 1:
      (pt(t, e), Nt(e), r & 512 && n !== null && Yn(n, n.return));
      break;
    case 5:
      if (
        (pt(t, e),
        Nt(e),
        r & 512 && n !== null && Yn(n, n.return),
        e.flags & 32)
      ) {
        var s = e.stateNode;
        try {
          Qr(s, "");
        } catch (S) {
          ae(e, e.return, S);
        }
      }
      if (r & 4 && ((s = e.stateNode), s != null)) {
        var i = e.memoizedProps,
          l = n !== null ? n.memoizedProps : i,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            (a === "input" && i.type === "radio" && i.name != null && $c(s, i),
              Wl(a, l));
            var d = Wl(a, i);
            for (l = 0; l < u.length; l += 2) {
              var f = u[l],
                p = u[l + 1];
              f === "style"
                ? Qc(s, p)
                : f === "dangerouslySetInnerHTML"
                  ? Vc(s, p)
                  : f === "children"
                    ? Qr(s, p)
                    : Uo(s, f, p, d);
            }
            switch (a) {
              case "input":
                Ul(s, i);
                break;
              case "textarea":
                Hc(s, i);
                break;
              case "select":
                var g = s._wrapperState.wasMultiple;
                s._wrapperState.wasMultiple = !!i.multiple;
                var y = i.value;
                y != null
                  ? Jn(s, !!i.multiple, y, !1)
                  : g !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Jn(s, !!i.multiple, i.defaultValue, !0)
                      : Jn(s, !!i.multiple, i.multiple ? [] : "", !1));
            }
            s[ns] = i;
          } catch (S) {
            ae(e, e.return, S);
          }
      }
      break;
    case 6:
      if ((pt(t, e), Nt(e), r & 4)) {
        if (e.stateNode === null) throw Error(E(162));
        ((s = e.stateNode), (i = e.memoizedProps));
        try {
          s.nodeValue = i;
        } catch (S) {
          ae(e, e.return, S);
        }
      }
      break;
    case 3:
      if (
        (pt(t, e), Nt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Jr(t.containerInfo);
        } catch (S) {
          ae(e, e.return, S);
        }
      break;
    case 4:
      (pt(t, e), Nt(e));
      break;
    case 13:
      (pt(t, e),
        Nt(e),
        (s = e.child),
        s.flags & 8192 &&
          ((i = s.memoizedState !== null),
          (s.stateNode.isHidden = i),
          !i ||
            (s.alternate !== null && s.alternate.memoizedState !== null) ||
            (ya = ce())),
        r & 4 && Mu(e));
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Ie = (d = Ie) || f), pt(t, e), (Ie = d)) : pt(t, e),
        Nt(e),
        r & 8192)
      ) {
        if (
          ((d = e.memoizedState !== null),
          (e.stateNode.isHidden = d) && !f && e.mode & 1)
        )
          for (_ = e, f = e.child; f !== null; ) {
            for (p = _ = f; _ !== null; ) {
              switch (((g = _), (y = g.child), g.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Hr(4, g, g.return);
                  break;
                case 1:
                  Yn(g, g.return);
                  var j = g.stateNode;
                  if (typeof j.componentWillUnmount == "function") {
                    ((r = g), (n = g.return));
                    try {
                      ((t = r),
                        (j.props = t.memoizedProps),
                        (j.state = t.memoizedState),
                        j.componentWillUnmount());
                    } catch (S) {
                      ae(r, n, S);
                    }
                  }
                  break;
                case 5:
                  Yn(g, g.return);
                  break;
                case 22:
                  if (g.memoizedState !== null) {
                    $u(p);
                    continue;
                  }
              }
              y !== null ? ((y.return = g), (_ = y)) : $u(p);
            }
            f = f.sibling;
          }
        e: for (f = null, p = e; ; ) {
          if (p.tag === 5) {
            if (f === null) {
              f = p;
              try {
                ((s = p.stateNode),
                  d
                    ? ((i = s.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((a = p.stateNode),
                      (u = p.memoizedProps.style),
                      (l =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (a.style.display = qc("display", l))));
              } catch (S) {
                ae(e, e.return, S);
              }
            }
          } else if (p.tag === 6) {
            if (f === null)
              try {
                p.stateNode.nodeValue = d ? "" : p.memoizedProps;
              } catch (S) {
                ae(e, e.return, S);
              }
          } else if (
            ((p.tag !== 22 && p.tag !== 23) ||
              p.memoizedState === null ||
              p === e) &&
            p.child !== null
          ) {
            ((p.child.return = p), (p = p.child));
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            (f === p && (f = null), (p = p.return));
          }
          (f === p && (f = null),
            (p.sibling.return = p.return),
            (p = p.sibling));
        }
      }
      break;
    case 19:
      (pt(t, e), Nt(e), r & 4 && Mu(e));
      break;
    case 21:
      break;
    default:
      (pt(t, e), Nt(e));
  }
}
function Nt(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (wf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(E(160));
      }
      switch (r.tag) {
        case 5:
          var s = r.stateNode;
          r.flags & 32 && (Qr(s, ""), (r.flags &= -33));
          var i = Uu(e);
          So(e, i, s);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo,
            a = Uu(e);
          xo(e, a, l);
          break;
        default:
          throw Error(E(161));
      }
    } catch (u) {
      ae(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Lm(e, t, n) {
  ((_ = e), jf(e));
}
function jf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; _ !== null; ) {
    var s = _,
      i = s.child;
    if (s.tag === 22 && r) {
      var l = s.memoizedState !== null || Us;
      if (!l) {
        var a = s.alternate,
          u = (a !== null && a.memoizedState !== null) || Ie;
        a = Us;
        var d = Ie;
        if (((Us = l), (Ie = u) && !d))
          for (_ = s; _ !== null; )
            ((l = _),
              (u = l.child),
              l.tag === 22 && l.memoizedState !== null
                ? Hu(s)
                : u !== null
                  ? ((u.return = l), (_ = u))
                  : Hu(s));
        for (; i !== null; ) ((_ = i), jf(i), (i = i.sibling));
        ((_ = s), (Us = a), (Ie = d));
      }
      Bu(e);
    } else
      s.subtreeFlags & 8772 && i !== null ? ((i.return = s), (_ = i)) : Bu(e);
  }
}
function Bu(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Ie || Bi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Ie)
                if (n === null) r.componentDidMount();
                else {
                  var s =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : ht(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    s,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = t.updateQueue;
              i !== null && Eu(t, i, r);
              break;
            case 3:
              var l = t.updateQueue;
              if (l !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Eu(t, l, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var d = t.alternate;
                if (d !== null) {
                  var f = d.memoizedState;
                  if (f !== null) {
                    var p = f.dehydrated;
                    p !== null && Jr(p);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(E(163));
          }
        Ie || (t.flags & 512 && wo(t));
      } catch (g) {
        ae(t, t.return, g);
      }
    }
    if (t === e) {
      _ = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (_ = n));
      break;
    }
    _ = t.return;
  }
}
function $u(e) {
  for (; _ !== null; ) {
    var t = _;
    if (t === e) {
      _ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (_ = n));
      break;
    }
    _ = t.return;
  }
}
function Hu(e) {
  for (; _ !== null; ) {
    var t = _;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Bi(4, t);
          } catch (u) {
            ae(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var s = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              ae(t, s, u);
            }
          }
          var i = t.return;
          try {
            wo(t);
          } catch (u) {
            ae(t, i, u);
          }
          break;
        case 5:
          var l = t.return;
          try {
            wo(t);
          } catch (u) {
            ae(t, l, u);
          }
      }
    } catch (u) {
      ae(t, t.return, u);
    }
    if (t === e) {
      _ = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      ((a.return = t.return), (_ = a));
      break;
    }
    _ = t.return;
  }
}
var Im = Math.ceil,
  Ni = Bt.ReactCurrentDispatcher,
  ga = Bt.ReactCurrentOwner,
  at = Bt.ReactCurrentBatchConfig,
  q = 0,
  je = null,
  he = null,
  Re = 0,
  Je = 0,
  Gn = fn(0),
  ve = 0,
  as = null,
  Pn = 0,
  $i = 0,
  va = 0,
  Wr = null,
  We = null,
  ya = 0,
  ur = 1 / 0,
  Ot = null,
  ki = !1,
  jo = null,
  sn = null,
  Ms = !1,
  Jt = null,
  Ei = 0,
  Vr = 0,
  No = null,
  Xs = -1,
  Zs = 0;
function Me() {
  return q & 6 ? ce() : Xs !== -1 ? Xs : (Xs = ce());
}
function ln(e) {
  return e.mode & 1
    ? q & 2 && Re !== 0
      ? Re & -Re
      : vm.transition !== null
        ? (Zs === 0 && (Zs = id()), Zs)
        : ((e = K),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : fd(e.type))),
          e)
    : 1;
}
function yt(e, t, n, r) {
  if (50 < Vr) throw ((Vr = 0), (No = null), Error(E(185)));
  (ps(e, n, r),
    (!(q & 2) || e !== je) &&
      (e === je && (!(q & 2) && ($i |= n), ve === 4 && Yt(e, Re)),
      Ke(e, r),
      n === 1 && q === 0 && !(t.mode & 1) && ((ur = ce() + 500), Fi && pn())));
}
function Ke(e, t) {
  var n = e.callbackNode;
  vh(e, t);
  var r = ai(e, e === je ? Re : 0);
  if (r === 0)
    (n !== null && Xa(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Xa(n), t === 1))
      (e.tag === 0 ? gm(Wu.bind(null, e)) : _d(Wu.bind(null, e)),
        fm(function () {
          !(q & 6) && pn();
        }),
        (n = null));
    else {
      switch (ld(r)) {
        case 1:
          n = Wo;
          break;
        case 4:
          n = rd;
          break;
        case 16:
          n = oi;
          break;
        case 536870912:
          n = sd;
          break;
        default:
          n = oi;
      }
      n = Tf(n, Nf.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function Nf(e, t) {
  if (((Xs = -1), (Zs = 0), q & 6)) throw Error(E(327));
  var n = e.callbackNode;
  if (nr() && e.callbackNode !== n) return null;
  var r = ai(e, e === je ? Re : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ci(e, r);
  else {
    t = r;
    var s = q;
    q |= 2;
    var i = Ef();
    (je !== e || Re !== t) && ((Ot = null), (ur = ce() + 500), Nn(e, t));
    do
      try {
        zm();
        break;
      } catch (a) {
        kf(e, a);
      }
    while (!0);
    (ra(),
      (Ni.current = i),
      (q = s),
      he !== null ? (t = 0) : ((je = null), (Re = 0), (t = ve)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((s = Yl(e)), s !== 0 && ((r = s), (t = ko(e, s)))), t === 1)
    )
      throw ((n = as), Nn(e, 0), Yt(e, r), Ke(e, ce()), n);
    if (t === 6) Yt(e, r);
    else {
      if (
        ((s = e.current.alternate),
        !(r & 30) &&
          !Am(s) &&
          ((t = Ci(e, r)),
          t === 2 && ((i = Yl(e)), i !== 0 && ((r = i), (t = ko(e, i)))),
          t === 1))
      )
        throw ((n = as), Nn(e, 0), Yt(e, r), Ke(e, ce()), n);
      switch (((e.finishedWork = s), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(E(345));
        case 2:
          yn(e, We, Ot);
          break;
        case 3:
          if (
            (Yt(e, r), (r & 130023424) === r && ((t = ya + 500 - ce()), 10 < t))
          ) {
            if (ai(e, 0) !== 0) break;
            if (((s = e.suspendedLanes), (s & r) !== r)) {
              (Me(), (e.pingedLanes |= e.suspendedLanes & s));
              break;
            }
            e.timeoutHandle = ro(yn.bind(null, e, We, Ot), t);
            break;
          }
          yn(e, We, Ot);
          break;
        case 4:
          if ((Yt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, s = -1; 0 < r; ) {
            var l = 31 - vt(r);
            ((i = 1 << l), (l = t[l]), l > s && (s = l), (r &= ~i));
          }
          if (
            ((r = s),
            (r = ce() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * Im(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = ro(yn.bind(null, e, We, Ot), r);
            break;
          }
          yn(e, We, Ot);
          break;
        case 5:
          yn(e, We, Ot);
          break;
        default:
          throw Error(E(329));
      }
    }
  }
  return (Ke(e, ce()), e.callbackNode === n ? Nf.bind(null, e) : null);
}
function ko(e, t) {
  var n = Wr;
  return (
    e.current.memoizedState.isDehydrated && (Nn(e, t).flags |= 256),
    (e = Ci(e, t)),
    e !== 2 && ((t = We), (We = n), t !== null && Eo(t)),
    e
  );
}
function Eo(e) {
  We === null ? (We = e) : We.push.apply(We, e);
}
function Am(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var s = n[r],
            i = s.getSnapshot;
          s = s.value;
          try {
            if (!wt(i(), s)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      ((n.return = t), (t = n));
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function Yt(e, t) {
  for (
    t &= ~va,
      t &= ~$i,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - vt(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function Wu(e) {
  if (q & 6) throw Error(E(327));
  nr();
  var t = ai(e, 0);
  if (!(t & 1)) return (Ke(e, ce()), null);
  var n = Ci(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Yl(e);
    r !== 0 && ((t = r), (n = ko(e, r)));
  }
  if (n === 1) throw ((n = as), Nn(e, 0), Yt(e, t), Ke(e, ce()), n);
  if (n === 6) throw Error(E(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    yn(e, We, Ot),
    Ke(e, ce()),
    null
  );
}
function wa(e, t) {
  var n = q;
  q |= 1;
  try {
    return e(t);
  } finally {
    ((q = n), q === 0 && ((ur = ce() + 500), Fi && pn()));
  }
}
function Tn(e) {
  Jt !== null && Jt.tag === 0 && !(q & 6) && nr();
  var t = q;
  q |= 1;
  var n = at.transition,
    r = K;
  try {
    if (((at.transition = null), (K = 1), e)) return e();
  } finally {
    ((K = r), (at.transition = n), (q = t), !(q & 6) && pn());
  }
}
function xa() {
  ((Je = Gn.current), X(Gn));
}
function Nn(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), dm(n)), he !== null))
    for (n = he.return; n !== null; ) {
      var r = n;
      switch ((ea(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && pi());
          break;
        case 3:
          (or(), X(qe), X(De), ua());
          break;
        case 5:
          aa(r);
          break;
        case 4:
          or();
          break;
        case 13:
          X(re);
          break;
        case 19:
          X(re);
          break;
        case 10:
          sa(r.type._context);
          break;
        case 22:
        case 23:
          xa();
      }
      n = n.return;
    }
  if (
    ((je = e),
    (he = e = on(e.current, null)),
    (Re = Je = t),
    (ve = 0),
    (as = null),
    (va = $i = Pn = 0),
    (We = Wr = null),
    xn !== null)
  ) {
    for (t = 0; t < xn.length; t++)
      if (((n = xn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var s = r.next,
          i = n.pending;
        if (i !== null) {
          var l = i.next;
          ((i.next = s), (r.next = l));
        }
        n.pending = r;
      }
    xn = null;
  }
  return e;
}
function kf(e, t) {
  do {
    var n = he;
    try {
      if ((ra(), (Ys.current = ji), Si)) {
        for (var r = se.memoizedState; r !== null; ) {
          var s = r.queue;
          (s !== null && (s.pending = null), (r = r.next));
        }
        Si = !1;
      }
      if (
        ((bn = 0),
        (Se = ge = se = null),
        ($r = !1),
        (is = 0),
        (ga.current = null),
        n === null || n.return === null)
      ) {
        ((ve = 1), (as = t), (he = null));
        break;
      }
      e: {
        var i = e,
          l = n.return,
          a = n,
          u = t;
        if (
          ((t = Re),
          (a.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var d = u,
            f = a,
            p = f.tag;
          if (!(f.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var g = f.alternate;
            g
              ? ((f.updateQueue = g.updateQueue),
                (f.memoizedState = g.memoizedState),
                (f.lanes = g.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var y = _u(l);
          if (y !== null) {
            ((y.flags &= -257),
              Ou(y, l, a, i, t),
              y.mode & 1 && Tu(i, d, t),
              (t = y),
              (u = d));
            var j = t.updateQueue;
            if (j === null) {
              var S = new Set();
              (S.add(u), (t.updateQueue = S));
            } else j.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              (Tu(i, d, t), Sa());
              break e;
            }
            u = Error(E(426));
          }
        } else if (Z && a.mode & 1) {
          var N = _u(l);
          if (N !== null) {
            (!(N.flags & 65536) && (N.flags |= 256),
              Ou(N, l, a, i, t),
              ta(ar(u, a)));
            break e;
          }
        }
        ((i = u = ar(u, a)),
          ve !== 4 && (ve = 2),
          Wr === null ? (Wr = [i]) : Wr.push(i),
          (i = l));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var c = of(i, u, t);
              ku(i, c);
              break e;
            case 1:
              a = u;
              var m = i.type,
                h = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof m.getDerivedStateFromError == "function" ||
                  (h !== null &&
                    typeof h.componentDidCatch == "function" &&
                    (sn === null || !sn.has(h))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var x = af(i, a, t);
                ku(i, x);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Rf(n);
    } catch (k) {
      ((t = k), he === n && n !== null && (he = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function Ef() {
  var e = Ni.current;
  return ((Ni.current = ji), e === null ? ji : e);
}
function Sa() {
  ((ve === 0 || ve === 3 || ve === 2) && (ve = 4),
    je === null || (!(Pn & 268435455) && !($i & 268435455)) || Yt(je, Re));
}
function Ci(e, t) {
  var n = q;
  q |= 2;
  var r = Ef();
  (je !== e || Re !== t) && ((Ot = null), Nn(e, t));
  do
    try {
      Dm();
      break;
    } catch (s) {
      kf(e, s);
    }
  while (!0);
  if ((ra(), (q = n), (Ni.current = r), he !== null)) throw Error(E(261));
  return ((je = null), (Re = 0), ve);
}
function Dm() {
  for (; he !== null; ) Cf(he);
}
function zm() {
  for (; he !== null && !ah(); ) Cf(he);
}
function Cf(e) {
  var t = Pf(e.alternate, e, Je);
  ((e.memoizedProps = e.pendingProps),
    t === null ? Rf(e) : (he = t),
    (ga.current = null));
}
function Rf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Tm(n, t)), n !== null)) {
        ((n.flags &= 32767), (he = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((ve = 6), (he = null));
        return;
      }
    } else if (((n = Pm(n, t, Je)), n !== null)) {
      he = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      he = t;
      return;
    }
    he = t = e;
  } while (t !== null);
  ve === 0 && (ve = 5);
}
function yn(e, t, n) {
  var r = K,
    s = at.transition;
  try {
    ((at.transition = null), (K = 1), Fm(e, t, n, r));
  } finally {
    ((at.transition = s), (K = r));
  }
  return null;
}
function Fm(e, t, n, r) {
  do nr();
  while (Jt !== null);
  if (q & 6) throw Error(E(327));
  n = e.finishedWork;
  var s = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(E(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (yh(e, i),
    e === je && ((he = je = null), (Re = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Ms ||
      ((Ms = !0),
      Tf(oi, function () {
        return (nr(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = at.transition), (at.transition = null));
    var l = K;
    K = 1;
    var a = q;
    ((q |= 4),
      (ga.current = null),
      Om(e, n),
      Sf(n, e),
      sm(to),
      (ui = !!eo),
      (to = eo = null),
      (e.current = n),
      Lm(n),
      uh(),
      (q = a),
      (K = l),
      (at.transition = i));
  } else e.current = n;
  if (
    (Ms && ((Ms = !1), (Jt = e), (Ei = s)),
    (i = e.pendingLanes),
    i === 0 && (sn = null),
    fh(n.stateNode),
    Ke(e, ce()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((s = t[n]), r(s.value, { componentStack: s.stack, digest: s.digest }));
  if (ki) throw ((ki = !1), (e = jo), (jo = null), e);
  return (
    Ei & 1 && e.tag !== 0 && nr(),
    (i = e.pendingLanes),
    i & 1 ? (e === No ? Vr++ : ((Vr = 0), (No = e))) : (Vr = 0),
    pn(),
    null
  );
}
function nr() {
  if (Jt !== null) {
    var e = ld(Ei),
      t = at.transition,
      n = K;
    try {
      if (((at.transition = null), (K = 16 > e ? 16 : e), Jt === null))
        var r = !1;
      else {
        if (((e = Jt), (Jt = null), (Ei = 0), q & 6)) throw Error(E(331));
        var s = q;
        for (q |= 4, _ = e.current; _ !== null; ) {
          var i = _,
            l = i.child;
          if (_.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var d = a[u];
                for (_ = d; _ !== null; ) {
                  var f = _;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Hr(8, f, i);
                  }
                  var p = f.child;
                  if (p !== null) ((p.return = f), (_ = p));
                  else
                    for (; _ !== null; ) {
                      f = _;
                      var g = f.sibling,
                        y = f.return;
                      if ((yf(f), f === d)) {
                        _ = null;
                        break;
                      }
                      if (g !== null) {
                        ((g.return = y), (_ = g));
                        break;
                      }
                      _ = y;
                    }
                }
              }
              var j = i.alternate;
              if (j !== null) {
                var S = j.child;
                if (S !== null) {
                  j.child = null;
                  do {
                    var N = S.sibling;
                    ((S.sibling = null), (S = N));
                  } while (S !== null);
                }
              }
              _ = i;
            }
          }
          if (i.subtreeFlags & 2064 && l !== null) ((l.return = i), (_ = l));
          else
            e: for (; _ !== null; ) {
              if (((i = _), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Hr(9, i, i.return);
                }
              var c = i.sibling;
              if (c !== null) {
                ((c.return = i.return), (_ = c));
                break e;
              }
              _ = i.return;
            }
        }
        var m = e.current;
        for (_ = m; _ !== null; ) {
          l = _;
          var h = l.child;
          if (l.subtreeFlags & 2064 && h !== null) ((h.return = l), (_ = h));
          else
            e: for (l = m; _ !== null; ) {
              if (((a = _), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Bi(9, a);
                  }
                } catch (k) {
                  ae(a, a.return, k);
                }
              if (a === l) {
                _ = null;
                break e;
              }
              var x = a.sibling;
              if (x !== null) {
                ((x.return = a.return), (_ = x));
                break e;
              }
              _ = a.return;
            }
        }
        if (
          ((q = s), pn(), bt && typeof bt.onPostCommitFiberRoot == "function")
        )
          try {
            bt.onPostCommitFiberRoot(Li, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((K = n), (at.transition = t));
    }
  }
  return !1;
}
function Vu(e, t, n) {
  ((t = ar(n, t)),
    (t = of(e, t, 1)),
    (e = rn(e, t, 1)),
    (t = Me()),
    e !== null && (ps(e, 1, t), Ke(e, t)));
}
function ae(e, t, n) {
  if (e.tag === 3) Vu(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Vu(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (sn === null || !sn.has(r)))
        ) {
          ((e = ar(n, e)),
            (e = af(t, e, 1)),
            (t = rn(t, e, 1)),
            (e = Me()),
            t !== null && (ps(t, 1, e), Ke(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Um(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = Me()),
    (e.pingedLanes |= e.suspendedLanes & n),
    je === e &&
      (Re & n) === n &&
      (ve === 4 || (ve === 3 && (Re & 130023424) === Re && 500 > ce() - ya)
        ? Nn(e, 0)
        : (va |= n)),
    Ke(e, t));
}
function bf(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Ts), (Ts <<= 1), !(Ts & 130023424) && (Ts = 4194304))
      : (t = 1));
  var n = Me();
  ((e = Ut(e, t)), e !== null && (ps(e, t, n), Ke(e, n)));
}
function Mm(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), bf(e, n));
}
function Bm(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        s = e.memoizedState;
      s !== null && (n = s.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(E(314));
  }
  (r !== null && r.delete(t), bf(e, n));
}
var Pf;
Pf = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || qe.current) Ve = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Ve = !1), bm(e, t, n));
      Ve = !!(e.flags & 131072);
    }
  else ((Ve = !1), Z && t.flags & 1048576 && Od(t, gi, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Js(e, t), (e = t.pendingProps));
      var s = sr(t, De.current);
      (tr(t, n), (s = da(null, t, r, e, s, n)));
      var i = fa();
      return (
        (t.flags |= 1),
        typeof s == "object" &&
        s !== null &&
        typeof s.render == "function" &&
        s.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Qe(r) ? ((i = !0), hi(t)) : (i = !1),
            (t.memoizedState =
              s.state !== null && s.state !== void 0 ? s.state : null),
            la(t),
            (s.updater = Mi),
            (t.stateNode = s),
            (s._reactInternals = t),
            co(t, r, e, n),
            (t = ho(null, t, r, !0, i, n)))
          : ((t.tag = 0), Z && i && Zo(t), Ue(null, t, s, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Js(e, t),
          (e = t.pendingProps),
          (s = r._init),
          (r = s(r._payload)),
          (t.type = r),
          (s = t.tag = Hm(r)),
          (e = ht(r, e)),
          s)
        ) {
          case 0:
            t = po(null, t, r, e, n);
            break e;
          case 1:
            t = Au(null, t, r, e, n);
            break e;
          case 11:
            t = Lu(null, t, r, e, n);
            break e;
          case 14:
            t = Iu(null, t, r, ht(r.type, e), n);
            break e;
        }
        throw Error(E(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : ht(r, s)),
        po(e, t, r, s, n)
      );
    case 1:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : ht(r, s)),
        Au(e, t, r, s, n)
      );
    case 3:
      e: {
        if ((ff(t), e === null)) throw Error(E(387));
        ((r = t.pendingProps),
          (i = t.memoizedState),
          (s = i.element),
          Fd(e, t),
          wi(t, r, null, n));
        var l = t.memoizedState;
        if (((r = l.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: l.cache,
              pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
              transitions: l.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((s = ar(Error(E(423)), t)), (t = Du(e, t, r, n, s)));
            break e;
          } else if (r !== s) {
            ((s = ar(Error(E(424)), t)), (t = Du(e, t, r, n, s)));
            break e;
          } else
            for (
              Xe = nn(t.stateNode.containerInfo.firstChild),
                Ze = t,
                Z = !0,
                gt = null,
                n = Dd(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((ir(), r === s)) {
            t = Mt(e, t, n);
            break e;
          }
          Ue(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Ud(t),
        e === null && oo(t),
        (r = t.type),
        (s = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (l = s.children),
        no(r, s) ? (l = null) : i !== null && no(r, i) && (t.flags |= 32),
        df(e, t),
        Ue(e, t, l, n),
        t.child
      );
    case 6:
      return (e === null && oo(t), null);
    case 13:
      return pf(e, t, n);
    case 4:
      return (
        oa(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = lr(t, null, r, n)) : Ue(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : ht(r, s)),
        Lu(e, t, r, s, n)
      );
    case 7:
      return (Ue(e, t, t.pendingProps, n), t.child);
    case 8:
      return (Ue(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (Ue(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (s = t.pendingProps),
          (i = t.memoizedProps),
          (l = s.value),
          Y(vi, r._currentValue),
          (r._currentValue = l),
          i !== null)
        )
          if (wt(i.value, l)) {
            if (i.children === s.children && !qe.current) {
              t = Mt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var a = i.dependencies;
              if (a !== null) {
                l = i.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (i.tag === 1) {
                      ((u = Dt(-1, n & -n)), (u.tag = 2));
                      var d = i.updateQueue;
                      if (d !== null) {
                        d = d.shared;
                        var f = d.pending;
                        (f === null
                          ? (u.next = u)
                          : ((u.next = f.next), (f.next = u)),
                          (d.pending = u));
                      }
                    }
                    ((i.lanes |= n),
                      (u = i.alternate),
                      u !== null && (u.lanes |= n),
                      ao(i.return, n, t),
                      (a.lanes |= n));
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10) l = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((l = i.return), l === null)) throw Error(E(341));
                ((l.lanes |= n),
                  (a = l.alternate),
                  a !== null && (a.lanes |= n),
                  ao(l, n, t),
                  (l = i.sibling));
              } else l = i.child;
              if (l !== null) l.return = i;
              else
                for (l = i; l !== null; ) {
                  if (l === t) {
                    l = null;
                    break;
                  }
                  if (((i = l.sibling), i !== null)) {
                    ((i.return = l.return), (l = i));
                    break;
                  }
                  l = l.return;
                }
              i = l;
            }
        (Ue(e, t, s.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (s = t.type),
        (r = t.pendingProps.children),
        tr(t, n),
        (s = ct(s)),
        (r = r(s)),
        (t.flags |= 1),
        Ue(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (s = ht(r, t.pendingProps)),
        (s = ht(r.type, s)),
        Iu(e, t, r, s, n)
      );
    case 15:
      return uf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : ht(r, s)),
        Js(e, t),
        (t.tag = 1),
        Qe(r) ? ((e = !0), hi(t)) : (e = !1),
        tr(t, n),
        lf(t, r, s),
        co(t, r, s, n),
        ho(null, t, r, !0, e, n)
      );
    case 19:
      return hf(e, t, n);
    case 22:
      return cf(e, t, n);
  }
  throw Error(E(156, t.tag));
};
function Tf(e, t) {
  return nd(e, t);
}
function $m(e, t, n, r) {
  ((this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function ot(e, t, n, r) {
  return new $m(e, t, n, r);
}
function ja(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Hm(e) {
  if (typeof e == "function") return ja(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Bo)) return 11;
    if (e === $o) return 14;
  }
  return 2;
}
function on(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ot(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function ei(e, t, n, r, s, i) {
  var l = 2;
  if (((r = e), typeof e == "function")) ja(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else
    e: switch (e) {
      case Mn:
        return kn(n.children, s, i, t);
      case Mo:
        ((l = 8), (s |= 8));
        break;
      case Il:
        return (
          (e = ot(12, n, t, s | 2)),
          (e.elementType = Il),
          (e.lanes = i),
          e
        );
      case Al:
        return ((e = ot(13, n, t, s)), (e.elementType = Al), (e.lanes = i), e);
      case Dl:
        return ((e = ot(19, n, t, s)), (e.elementType = Dl), (e.lanes = i), e);
      case Uc:
        return Hi(n, s, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case zc:
              l = 10;
              break e;
            case Fc:
              l = 9;
              break e;
            case Bo:
              l = 11;
              break e;
            case $o:
              l = 14;
              break e;
            case qt:
              ((l = 16), (r = null));
              break e;
          }
        throw Error(E(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = ot(l, n, t, s)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function kn(e, t, n, r) {
  return ((e = ot(7, e, r, t)), (e.lanes = n), e);
}
function Hi(e, t, n, r) {
  return (
    (e = ot(22, e, r, t)),
    (e.elementType = Uc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function kl(e, t, n) {
  return ((e = ot(6, e, null, t)), (e.lanes = n), e);
}
function El(e, t, n) {
  return (
    (t = ot(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function Wm(e, t, n, r, s) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = il(0)),
    (this.expirationTimes = il(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = il(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = s),
    (this.mutableSourceEagerHydrationData = null));
}
function Na(e, t, n, r, s, i, l, a, u) {
  return (
    (e = new Wm(e, t, n, a, u)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = ot(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    la(i),
    e
  );
}
function Vm(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Un,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function _f(e) {
  if (!e) return cn;
  e = e._reactInternals;
  e: {
    if (In(e) !== e || e.tag !== 1) throw Error(E(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Qe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(E(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Qe(n)) return Td(e, n, t);
  }
  return t;
}
function Of(e, t, n, r, s, i, l, a, u) {
  return (
    (e = Na(n, r, !0, e, s, i, l, a, u)),
    (e.context = _f(null)),
    (n = e.current),
    (r = Me()),
    (s = ln(n)),
    (i = Dt(r, s)),
    (i.callback = t ?? null),
    rn(n, i, s),
    (e.current.lanes = s),
    ps(e, s, r),
    Ke(e, r),
    e
  );
}
function Wi(e, t, n, r) {
  var s = t.current,
    i = Me(),
    l = ln(s);
  return (
    (n = _f(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Dt(i, l)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = rn(s, t, l)),
    e !== null && (yt(e, s, l, i), Ks(e, s, l)),
    l
  );
}
function Ri(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function qu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function ka(e, t) {
  (qu(e, t), (e = e.alternate) && qu(e, t));
}
function qm() {
  return null;
}
var Lf =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Ea(e) {
  this._internalRoot = e;
}
Vi.prototype.render = Ea.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(E(409));
  Wi(e, t, null, null);
};
Vi.prototype.unmount = Ea.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (Tn(function () {
      Wi(null, e, null, null);
    }),
      (t[Ft] = null));
  }
};
function Vi(e) {
  this._internalRoot = e;
}
Vi.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ud();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Kt.length && t !== 0 && t < Kt[n].priority; n++);
    (Kt.splice(n, 0, e), n === 0 && dd(e));
  }
};
function Ca(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function qi(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Qu() {}
function Qm(e, t, n, r, s) {
  if (s) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var d = Ri(l);
        i.call(d);
      };
    }
    var l = Of(t, r, e, 0, null, !1, !1, "", Qu);
    return (
      (e._reactRootContainer = l),
      (e[Ft] = l.current),
      es(e.nodeType === 8 ? e.parentNode : e),
      Tn(),
      l
    );
  }
  for (; (s = e.lastChild); ) e.removeChild(s);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var d = Ri(u);
      a.call(d);
    };
  }
  var u = Na(e, 0, !1, null, null, !1, !1, "", Qu);
  return (
    (e._reactRootContainer = u),
    (e[Ft] = u.current),
    es(e.nodeType === 8 ? e.parentNode : e),
    Tn(function () {
      Wi(t, u, n, r);
    }),
    u
  );
}
function Qi(e, t, n, r, s) {
  var i = n._reactRootContainer;
  if (i) {
    var l = i;
    if (typeof s == "function") {
      var a = s;
      s = function () {
        var u = Ri(l);
        a.call(u);
      };
    }
    Wi(t, l, e, s);
  } else l = Qm(n, t, e, s, r);
  return Ri(l);
}
od = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Ar(t.pendingLanes);
        n !== 0 &&
          (Vo(t, n | 1), Ke(t, ce()), !(q & 6) && ((ur = ce() + 500), pn()));
      }
      break;
    case 13:
      (Tn(function () {
        var r = Ut(e, 1);
        if (r !== null) {
          var s = Me();
          yt(r, e, 1, s);
        }
      }),
        ka(e, 1));
  }
};
qo = function (e) {
  if (e.tag === 13) {
    var t = Ut(e, 134217728);
    if (t !== null) {
      var n = Me();
      yt(t, e, 134217728, n);
    }
    ka(e, 134217728);
  }
};
ad = function (e) {
  if (e.tag === 13) {
    var t = ln(e),
      n = Ut(e, t);
    if (n !== null) {
      var r = Me();
      yt(n, e, t, r);
    }
    ka(e, t);
  }
};
ud = function () {
  return K;
};
cd = function (e, t) {
  var n = K;
  try {
    return ((K = e), t());
  } finally {
    K = n;
  }
};
ql = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Ul(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var s = zi(r);
            if (!s) throw Error(E(90));
            (Bc(r), Ul(r, s));
          }
        }
      }
      break;
    case "textarea":
      Hc(e, n);
      break;
    case "select":
      ((t = n.value), t != null && Jn(e, !!n.multiple, t, !1));
  }
};
Gc = wa;
Jc = Tn;
var Km = { usingClientEntryPoint: !1, Events: [ms, Wn, zi, Kc, Yc, wa] },
  _r = {
    findFiberByHostInstance: wn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  Ym = {
    bundleType: _r.bundleType,
    version: _r.version,
    rendererPackageName: _r.rendererPackageName,
    rendererConfig: _r.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Bt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = ed(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: _r.findFiberByHostInstance || qm,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Bs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Bs.isDisabled && Bs.supportsFiber)
    try {
      ((Li = Bs.inject(Ym)), (bt = Bs));
    } catch {}
}
tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Km;
tt.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ca(t)) throw Error(E(200));
  return Vm(e, t, null, n);
};
tt.createRoot = function (e, t) {
  if (!Ca(e)) throw Error(E(299));
  var n = !1,
    r = "",
    s = Lf;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (s = t.onRecoverableError)),
    (t = Na(e, 1, !1, null, null, n, !1, r, s)),
    (e[Ft] = t.current),
    es(e.nodeType === 8 ? e.parentNode : e),
    new Ea(t)
  );
};
tt.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(E(188))
      : ((e = Object.keys(e).join(",")), Error(E(268, e)));
  return ((e = ed(t)), (e = e === null ? null : e.stateNode), e);
};
tt.flushSync = function (e) {
  return Tn(e);
};
tt.hydrate = function (e, t, n) {
  if (!qi(t)) throw Error(E(200));
  return Qi(null, e, t, !0, n);
};
tt.hydrateRoot = function (e, t, n) {
  if (!Ca(e)) throw Error(E(405));
  var r = (n != null && n.hydratedSources) || null,
    s = !1,
    i = "",
    l = Lf;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (s = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (l = n.onRecoverableError)),
    (t = Of(t, null, e, 1, n ?? null, s, !1, i, l)),
    (e[Ft] = t.current),
    es(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (s = n._getVersion),
        (s = s(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, s])
          : t.mutableSourceEagerHydrationData.push(n, s));
  return new Vi(t);
};
tt.render = function (e, t, n) {
  if (!qi(t)) throw Error(E(200));
  return Qi(null, e, t, !1, n);
};
tt.unmountComponentAtNode = function (e) {
  if (!qi(e)) throw Error(E(40));
  return e._reactRootContainer
    ? (Tn(function () {
        Qi(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[Ft] = null));
        });
      }),
      !0)
    : !1;
};
tt.unstable_batchedUpdates = wa;
tt.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!qi(n)) throw Error(E(200));
  if (e == null || e._reactInternals === void 0) throw Error(E(38));
  return Qi(e, t, n, !1, r);
};
tt.version = "18.3.1-next-f1338f8080-20240426";
function If() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(If);
    } catch (e) {
      console.error(e);
    }
}
(If(), (Lc.exports = tt));
var Gm = Lc.exports,
  Ku = Gm;
((Ol.createRoot = Ku.createRoot), (Ol.hydrateRoot = Ku.hydrateRoot));
/**
 * @remix-run/router v1.23.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function us() {
  return (
    (us = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    us.apply(null, arguments)
  );
}
var Xt;
(function (e) {
  ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(Xt || (Xt = {}));
const Yu = "popstate";
function Jm(e) {
  e === void 0 && (e = {});
  function t(r, s) {
    let { pathname: i, search: l, hash: a } = r.location;
    return Co(
      "",
      { pathname: i, search: l, hash: a },
      (s.state && s.state.usr) || null,
      (s.state && s.state.key) || "default",
    );
  }
  function n(r, s) {
    return typeof s == "string" ? s : bi(s);
  }
  return Zm(t, n, null, e);
}
function de(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Ra(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Xm() {
  return Math.random().toString(36).substr(2, 8);
}
function Gu(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Co(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    us(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? gr(t) : t,
      { state: n, key: (t && t.key) || r || Xm() },
    )
  );
}
function bi(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function gr(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    (r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e));
  }
  return t;
}
function Zm(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: s = document.defaultView, v5Compat: i = !1 } = r,
    l = s.history,
    a = Xt.Pop,
    u = null,
    d = f();
  d == null && ((d = 0), l.replaceState(us({}, l.state, { idx: d }), ""));
  function f() {
    return (l.state || { idx: null }).idx;
  }
  function p() {
    a = Xt.Pop;
    let N = f(),
      c = N == null ? null : N - d;
    ((d = N), u && u({ action: a, location: S.location, delta: c }));
  }
  function g(N, c) {
    a = Xt.Push;
    let m = Co(S.location, N, c);
    d = f() + 1;
    let h = Gu(m, d),
      x = S.createHref(m);
    try {
      l.pushState(h, "", x);
    } catch (k) {
      if (k instanceof DOMException && k.name === "DataCloneError") throw k;
      s.location.assign(x);
    }
    i && u && u({ action: a, location: S.location, delta: 1 });
  }
  function y(N, c) {
    a = Xt.Replace;
    let m = Co(S.location, N, c);
    d = f();
    let h = Gu(m, d),
      x = S.createHref(m);
    (l.replaceState(h, "", x),
      i && u && u({ action: a, location: S.location, delta: 0 }));
  }
  function j(N) {
    let c = s.location.origin !== "null" ? s.location.origin : s.location.href,
      m = typeof N == "string" ? N : bi(N);
    return (
      (m = m.replace(/ $/, "%20")),
      de(
        c,
        "No window.location.(origin|href) available to create URL for href: " +
          m,
      ),
      new URL(m, c)
    );
  }
  let S = {
    get action() {
      return a;
    },
    get location() {
      return e(s, l);
    },
    listen(N) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        s.addEventListener(Yu, p),
        (u = N),
        () => {
          (s.removeEventListener(Yu, p), (u = null));
        }
      );
    },
    createHref(N) {
      return t(s, N);
    },
    createURL: j,
    encodeLocation(N) {
      let c = j(N);
      return { pathname: c.pathname, search: c.search, hash: c.hash };
    },
    push: g,
    replace: y,
    go(N) {
      return l.go(N);
    },
  };
  return S;
}
var Ju;
(function (e) {
  ((e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error"));
})(Ju || (Ju = {}));
function eg(e, t, n) {
  return (n === void 0 && (n = "/"), tg(e, t, n));
}
function tg(e, t, n, r) {
  let s = typeof t == "string" ? gr(t) : t,
    i = ba(s.pathname || "/", n);
  if (i == null) return null;
  let l = Af(e);
  ng(l);
  let a = null,
    u = hg(i);
  for (let d = 0; a == null && d < l.length; ++d) a = dg(l[d], u);
  return a;
}
function Af(e, t, n, r) {
  (t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = ""));
  let s = (i, l, a) => {
    let u = {
      relativePath: a === void 0 ? i.path || "" : a,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: l,
      route: i,
    };
    u.relativePath.startsWith("/") &&
      (de(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let d = an([r, u.relativePath]),
      f = n.concat(u);
    (i.children &&
      i.children.length > 0 &&
      (de(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + d + '".'),
      ),
      Af(i.children, t, f, d)),
      !(i.path == null && !i.index) &&
        t.push({ path: d, score: ug(d, i.index), routesMeta: f }));
  };
  return (
    e.forEach((i, l) => {
      var a;
      if (i.path === "" || !((a = i.path) != null && a.includes("?"))) s(i, l);
      else for (let u of Df(i.path)) s(i, l, u);
    }),
    t
  );
}
function Df(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    s = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return s ? [i, ""] : [i];
  let l = Df(r.join("/")),
    a = [];
  return (
    a.push(...l.map((u) => (u === "" ? i : [i, u].join("/")))),
    s && a.push(...l),
    a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function ng(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : cg(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const rg = /^:[\w-]+$/,
  sg = 3,
  ig = 2,
  lg = 1,
  og = 10,
  ag = -2,
  Xu = (e) => e === "*";
function ug(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Xu) && (r += ag),
    t && (r += ig),
    n
      .filter((s) => !Xu(s))
      .reduce((s, i) => s + (rg.test(i) ? sg : i === "" ? lg : og), r)
  );
}
function cg(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, s) => r === t[s])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function dg(e, t, n) {
  let { routesMeta: r } = e,
    s = {},
    i = "/",
    l = [];
  for (let a = 0; a < r.length; ++a) {
    let u = r[a],
      d = a === r.length - 1,
      f = i === "/" ? t : t.slice(i.length) || "/",
      p = fg(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: d },
        f,
      ),
      g = u.route;
    if (!p) return null;
    (Object.assign(s, p.params),
      l.push({
        params: s,
        pathname: an([i, p.pathname]),
        pathnameBase: wg(an([i, p.pathnameBase])),
        route: g,
      }),
      p.pathnameBase !== "/" && (i = an([i, p.pathnameBase])));
  }
  return l;
}
function fg(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = pg(e.path, e.caseSensitive, e.end),
    s = t.match(n);
  if (!s) return null;
  let i = s[0],
    l = i.replace(/(.)\/+$/, "$1"),
    a = s.slice(1);
  return {
    params: r.reduce((d, f, p) => {
      let { paramName: g, isOptional: y } = f;
      if (g === "*") {
        let S = a[p] || "";
        l = i.slice(0, i.length - S.length).replace(/(.)\/+$/, "$1");
      }
      const j = a[p];
      return (
        y && !j ? (d[g] = void 0) : (d[g] = (j || "").replace(/%2F/g, "/")),
        d
      );
    }, {}),
    pathname: i,
    pathnameBase: l,
    pattern: e,
  };
}
function pg(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Ra(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    ));
  let r = [],
    s =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (l, a, u) => (
            r.push({ paramName: a, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (s += "\\/*$")
        : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"),
    [new RegExp(s, t ? void 0 : "i"), r]
  );
}
function hg(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Ra(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ")."),
      ),
      e
    );
  }
}
function ba(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
const mg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  gg = (e) => mg.test(e);
function vg(e, t) {
  t === void 0 && (t = "/");
  let {
      pathname: n,
      search: r = "",
      hash: s = "",
    } = typeof e == "string" ? gr(e) : e,
    i;
  if (n)
    if (gg(n)) i = n;
    else {
      if (n.includes("//")) {
        let l = n;
        ((n = zf(n)),
          Ra(
            !1,
            "Pathnames cannot have embedded double slashes - normalizing " +
              (l + " -> " + n),
          ));
      }
      n.startsWith("/") ? (i = Zu(n.substring(1), "/")) : (i = Zu(n, t));
    }
  else i = t;
  return { pathname: i, search: xg(r), hash: Sg(s) };
}
function Zu(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((s) => {
      s === ".." ? n.length > 1 && n.pop() : s !== "." && n.push(s);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Cl(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function yg(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function Pa(e, t) {
  let n = yg(e);
  return t
    ? n.map((r, s) => (s === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Ta(e, t, n, r) {
  r === void 0 && (r = !1);
  let s;
  typeof e == "string"
    ? (s = gr(e))
    : ((s = us({}, e)),
      de(
        !s.pathname || !s.pathname.includes("?"),
        Cl("?", "pathname", "search", s),
      ),
      de(
        !s.pathname || !s.pathname.includes("#"),
        Cl("#", "pathname", "hash", s),
      ),
      de(!s.search || !s.search.includes("#"), Cl("#", "search", "hash", s)));
  let i = e === "" || s.pathname === "",
    l = i ? "/" : s.pathname,
    a;
  if (l == null) a = n;
  else {
    let p = t.length - 1;
    if (!r && l.startsWith("..")) {
      let g = l.split("/");
      for (; g[0] === ".."; ) (g.shift(), (p -= 1));
      s.pathname = g.join("/");
    }
    a = p >= 0 ? t[p] : "/";
  }
  let u = vg(s, a),
    d = l && l !== "/" && l.endsWith("/"),
    f = (i || l === ".") && n.endsWith("/");
  return (!u.pathname.endsWith("/") && (d || f) && (u.pathname += "/"), u);
}
const zf = (e) => e.replace(/\/\/+/g, "/"),
  an = (e) => zf(e.join("/")),
  wg = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  xg = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Sg = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function jg(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const Ff = ["post", "put", "patch", "delete"];
new Set(Ff);
const Ng = ["get", ...Ff];
new Set(Ng);
/**
 * React Router v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function cs() {
  return (
    (cs = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    cs.apply(null, arguments)
  );
}
const _a = w.createContext(null),
  kg = w.createContext(null),
  hn = w.createContext(null),
  Ki = w.createContext(null),
  $t = w.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Uf = w.createContext(null);
function Eg(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  vr() || de(!1);
  let { basename: r, navigator: s } = w.useContext(hn),
    { hash: i, pathname: l, search: a } = $f(e, { relative: n }),
    u = l;
  return (
    r !== "/" && (u = l === "/" ? r : an([r, l])),
    s.createHref({ pathname: u, search: a, hash: i })
  );
}
function vr() {
  return w.useContext(Ki) != null;
}
function Tt() {
  return (vr() || de(!1), w.useContext(Ki).location);
}
function Mf(e) {
  w.useContext(hn).static || w.useLayoutEffect(e);
}
function Ne() {
  let { isDataRoute: e } = w.useContext($t);
  return e ? Fg() : Cg();
}
function Cg() {
  vr() || de(!1);
  let e = w.useContext(_a),
    { basename: t, future: n, navigator: r } = w.useContext(hn),
    { matches: s } = w.useContext($t),
    { pathname: i } = Tt(),
    l = JSON.stringify(Pa(s, n.v7_relativeSplatPath)),
    a = w.useRef(!1);
  return (
    Mf(() => {
      a.current = !0;
    }),
    w.useCallback(
      function (d, f) {
        if ((f === void 0 && (f = {}), !a.current)) return;
        if (typeof d == "number") {
          r.go(d);
          return;
        }
        let p = Ta(d, JSON.parse(l), i, f.relative === "path");
        (e == null &&
          t !== "/" &&
          (p.pathname = p.pathname === "/" ? t : an([t, p.pathname])),
          (f.replace ? r.replace : r.push)(p, f.state, f));
      },
      [t, r, l, i, e],
    )
  );
}
function Bf() {
  let { matches: e } = w.useContext($t),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function $f(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = w.useContext(hn),
    { matches: s } = w.useContext($t),
    { pathname: i } = Tt(),
    l = JSON.stringify(Pa(s, r.v7_relativeSplatPath));
  return w.useMemo(() => Ta(e, JSON.parse(l), i, n === "path"), [e, l, i, n]);
}
function Rg(e, t) {
  return bg(e, t);
}
function bg(e, t, n, r) {
  vr() || de(!1);
  let { navigator: s } = w.useContext(hn),
    { matches: i } = w.useContext($t),
    l = i[i.length - 1],
    a = l ? l.params : {};
  l && l.pathname;
  let u = l ? l.pathnameBase : "/";
  l && l.route;
  let d = Tt(),
    f;
  if (t) {
    var p;
    let N = typeof t == "string" ? gr(t) : t;
    (u === "/" || ((p = N.pathname) != null && p.startsWith(u)) || de(!1),
      (f = N));
  } else f = d;
  let g = f.pathname || "/",
    y = g;
  if (u !== "/") {
    let N = u.replace(/^\//, "").split("/");
    y = "/" + g.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let j = eg(e, { pathname: y }),
    S = Lg(
      j &&
        j.map((N) =>
          Object.assign({}, N, {
            params: Object.assign({}, a, N.params),
            pathname: an([
              u,
              s.encodeLocation
                ? s.encodeLocation(N.pathname).pathname
                : N.pathname,
            ]),
            pathnameBase:
              N.pathnameBase === "/"
                ? u
                : an([
                    u,
                    s.encodeLocation
                      ? s.encodeLocation(N.pathnameBase).pathname
                      : N.pathnameBase,
                  ]),
          }),
        ),
      i,
      n,
      r,
    );
  return t && S
    ? w.createElement(
        Ki.Provider,
        {
          value: {
            location: cs(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              f,
            ),
            navigationType: Xt.Pop,
          },
        },
        S,
      )
    : S;
}
function Pg() {
  let e = zg(),
    t = jg(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    s = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return w.createElement(
    w.Fragment,
    null,
    w.createElement("h2", null, "Unexpected Application Error!"),
    w.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? w.createElement("pre", { style: s }, n) : null,
    null,
  );
}
const Tg = w.createElement(Pg, null);
class _g extends w.Component {
  constructor(t) {
    (super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      }));
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n,
    );
  }
  render() {
    return this.state.error !== void 0
      ? w.createElement(
          $t.Provider,
          { value: this.props.routeContext },
          w.createElement(Uf.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function Og(e) {
  let { routeContext: t, match: n, children: r } = e,
    s = w.useContext(_a);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = n.route.id),
    w.createElement($t.Provider, { value: t }, r)
  );
}
function Lg(e, t, n, r) {
  var s;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let l = e,
    a = (s = n) == null ? void 0 : s.errors;
  if (a != null) {
    let f = l.findIndex(
      (p) => p.route.id && (a == null ? void 0 : a[p.route.id]) !== void 0,
    );
    (f >= 0 || de(!1), (l = l.slice(0, Math.min(l.length, f + 1))));
  }
  let u = !1,
    d = -1;
  if (n && r && r.v7_partialHydration)
    for (let f = 0; f < l.length; f++) {
      let p = l[f];
      if (
        ((p.route.HydrateFallback || p.route.hydrateFallbackElement) && (d = f),
        p.route.id)
      ) {
        let { loaderData: g, errors: y } = n,
          j =
            p.route.loader &&
            g[p.route.id] === void 0 &&
            (!y || y[p.route.id] === void 0);
        if (p.route.lazy || j) {
          ((u = !0), d >= 0 ? (l = l.slice(0, d + 1)) : (l = [l[0]]));
          break;
        }
      }
    }
  return l.reduceRight((f, p, g) => {
    let y,
      j = !1,
      S = null,
      N = null;
    n &&
      ((y = a && p.route.id ? a[p.route.id] : void 0),
      (S = p.route.errorElement || Tg),
      u &&
        (d < 0 && g === 0
          ? (Ug("route-fallback"), (j = !0), (N = null))
          : d === g &&
            ((j = !0), (N = p.route.hydrateFallbackElement || null))));
    let c = t.concat(l.slice(0, g + 1)),
      m = () => {
        let h;
        return (
          y
            ? (h = S)
            : j
              ? (h = N)
              : p.route.Component
                ? (h = w.createElement(p.route.Component, null))
                : p.route.element
                  ? (h = p.route.element)
                  : (h = f),
          w.createElement(Og, {
            match: p,
            routeContext: { outlet: f, matches: c, isDataRoute: n != null },
            children: h,
          })
        );
      };
    return n && (p.route.ErrorBoundary || p.route.errorElement || g === 0)
      ? w.createElement(_g, {
          location: n.location,
          revalidation: n.revalidation,
          component: S,
          error: y,
          children: m(),
          routeContext: { outlet: null, matches: c, isDataRoute: !0 },
        })
      : m();
  }, null);
}
var Hf = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Hf || {}),
  Wf = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Wf || {});
function Ig(e) {
  let t = w.useContext(_a);
  return (t || de(!1), t);
}
function Ag(e) {
  let t = w.useContext(kg);
  return (t || de(!1), t);
}
function Dg(e) {
  let t = w.useContext($t);
  return (t || de(!1), t);
}
function Vf(e) {
  let t = Dg(),
    n = t.matches[t.matches.length - 1];
  return (n.route.id || de(!1), n.route.id);
}
function zg() {
  var e;
  let t = w.useContext(Uf),
    n = Ag(),
    r = Vf();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Fg() {
  let { router: e } = Ig(Hf.UseNavigateStable),
    t = Vf(Wf.UseNavigateStable),
    n = w.useRef(!1);
  return (
    Mf(() => {
      n.current = !0;
    }),
    w.useCallback(
      function (s, i) {
        (i === void 0 && (i = {}),
          n.current &&
            (typeof s == "number"
              ? e.navigate(s)
              : e.navigate(s, cs({ fromRouteId: t }, i))));
      },
      [e, t],
    )
  );
}
const ec = {};
function Ug(e, t, n) {
  ec[e] || (ec[e] = !0);
}
function Mg(e, t) {
  (e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath);
}
function cr(e) {
  let { to: t, replace: n, state: r, relative: s } = e;
  vr() || de(!1);
  let { future: i, static: l } = w.useContext(hn),
    { matches: a } = w.useContext($t),
    { pathname: u } = Tt(),
    d = Ne(),
    f = Ta(t, Pa(a, i.v7_relativeSplatPath), u, s === "path"),
    p = JSON.stringify(f);
  return (
    w.useEffect(
      () => d(JSON.parse(p), { replace: n, state: r, relative: s }),
      [d, p, s, n, r],
    ),
    null
  );
}
function we(e) {
  de(!1);
}
function Bg(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: s = Xt.Pop,
    navigator: i,
    static: l = !1,
    future: a,
  } = e;
  vr() && de(!1);
  let u = t.replace(/^\/*/, "/"),
    d = w.useMemo(
      () => ({
        basename: u,
        navigator: i,
        static: l,
        future: cs({ v7_relativeSplatPath: !1 }, a),
      }),
      [u, a, i, l],
    );
  typeof r == "string" && (r = gr(r));
  let {
      pathname: f = "/",
      search: p = "",
      hash: g = "",
      state: y = null,
      key: j = "default",
    } = r,
    S = w.useMemo(() => {
      let N = ba(f, u);
      return N == null
        ? null
        : {
            location: { pathname: N, search: p, hash: g, state: y, key: j },
            navigationType: s,
          };
    }, [u, f, p, g, y, j, s]);
  return S == null
    ? null
    : w.createElement(
        hn.Provider,
        { value: d },
        w.createElement(Ki.Provider, { children: n, value: S }),
      );
}
function $g(e) {
  let { children: t, location: n } = e;
  return Rg(Ro(t), n);
}
new Promise(() => {});
function Ro(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    w.Children.forEach(e, (r, s) => {
      if (!w.isValidElement(r)) return;
      let i = [...t, s];
      if (r.type === w.Fragment) {
        n.push.apply(n, Ro(r.props.children, i));
        return;
      }
      (r.type !== we && de(!1), !r.props.index || !r.props.children || de(!1));
      let l = {
        id: r.props.id || i.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (l.children = Ro(r.props.children, i)), n.push(l));
    }),
    n
  );
}
/**
 * React Router DOM v6.30.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function bo() {
  return (
    (bo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    bo.apply(null, arguments)
  );
}
function Hg(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if ({}.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) !== -1) continue;
      n[r] = e[r];
    }
  return n;
}
function Wg(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Vg(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Wg(e);
}
const qg = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  Qg = "6";
try {
  window.__reactRouterVersion = Qg;
} catch {}
const Kg = "startTransition",
  tc = Up[Kg];
function Yg(e) {
  let { basename: t, children: n, future: r, window: s } = e,
    i = w.useRef();
  i.current == null && (i.current = Jm({ window: s, v5Compat: !0 }));
  let l = i.current,
    [a, u] = w.useState({ action: l.action, location: l.location }),
    { v7_startTransition: d } = r || {},
    f = w.useCallback(
      (p) => {
        d && tc ? tc(() => u(p)) : u(p);
      },
      [u, d],
    );
  return (
    w.useLayoutEffect(() => l.listen(f), [l, f]),
    w.useEffect(() => Mg(r), [r]),
    w.createElement(Bg, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: l,
      future: r,
    })
  );
}
const Gg =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Jg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  qf = w.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: s,
        reloadDocument: i,
        replace: l,
        state: a,
        target: u,
        to: d,
        preventScrollReset: f,
        viewTransition: p,
      } = t,
      g = Hg(t, qg),
      { basename: y } = w.useContext(hn),
      j,
      S = !1;
    if (typeof d == "string" && Jg.test(d) && ((j = d), Gg))
      try {
        let h = new URL(window.location.href),
          x = d.startsWith("//") ? new URL(h.protocol + d) : new URL(d),
          k = ba(x.pathname, y);
        x.origin === h.origin && k != null
          ? (d = k + x.search + x.hash)
          : (S = !0);
      } catch {}
    let N = Eg(d, { relative: s }),
      c = Xg(d, {
        replace: l,
        state: a,
        target: u,
        preventScrollReset: f,
        relative: s,
        viewTransition: p,
      });
    function m(h) {
      (r && r(h), h.defaultPrevented || c(h));
    }
    return w.createElement(
      "a",
      bo({}, g, { href: j || N, onClick: S || i ? r : m, ref: n, target: u }),
    );
  });
var nc;
(function (e) {
  ((e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState"));
})(nc || (nc = {}));
var rc;
(function (e) {
  ((e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration"));
})(rc || (rc = {}));
function Xg(e, t) {
  let {
      target: n,
      replace: r,
      state: s,
      preventScrollReset: i,
      relative: l,
      viewTransition: a,
    } = t === void 0 ? {} : t,
    u = Ne(),
    d = Tt(),
    f = $f(e, { relative: l });
  return w.useCallback(
    (p) => {
      if (Vg(p, n)) {
        p.preventDefault();
        let g = r !== void 0 ? r : bi(d) === bi(f);
        u(e, {
          replace: g,
          state: s,
          preventScrollReset: i,
          relative: l,
          viewTransition: a,
        });
      }
    },
    [d, u, f, r, s, n, e, i, l, a],
  );
}
function Qf(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: Zg } = Object.prototype,
  { getPrototypeOf: dr } = Object,
  { iterator: vs, toStringTag: Kf } = Symbol,
  Pi = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  ds = (e, t) => {
    let n = e;
    const r = [];
    for (; n != null && n !== Object.prototype; ) {
      if (r.indexOf(n) !== -1) return !1;
      if ((r.push(n), Pi(n, t))) return !0;
      n = dr(n);
    }
    return !1;
  },
  ev = (e, t) => (e != null && ds(e, t) ? e[t] : void 0),
  Oa = ((e) => (t) => {
    const n = Zg.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  xt = (e) => ((e = e.toLowerCase()), (t) => Oa(t) === e),
  Yi = (e) => (t) => typeof t === e,
  { isArray: _n } = Array,
  fr = Yi("undefined");
function yr(e) {
  return (
    e !== null &&
    !fr(e) &&
    e.constructor !== null &&
    !fr(e.constructor) &&
    Ye(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Yf = xt("ArrayBuffer");
function tv(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Yf(e.buffer)),
    t
  );
}
const nv = Yi("string"),
  Ye = Yi("function"),
  Gf = Yi("number"),
  wr = (e) => e !== null && typeof e == "object",
  rv = (e) => e === !0 || e === !1,
  ti = (e) => {
    if (!wr(e)) return !1;
    const t = dr(e);
    return (
      (t === null || t === Object.prototype || dr(t) === null) &&
      !ds(e, Kf) &&
      !ds(e, vs)
    );
  },
  sv = (e) => {
    if (!wr(e) || yr(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  iv = xt("Date"),
  lv = xt("File"),
  ov = (e) => !!(e && typeof e.uri < "u"),
  av = (e) => e && typeof e.getParts < "u",
  uv = xt("Blob"),
  cv = xt("FileList"),
  dv = (e) => wr(e) && Ye(e.pipe);
function fv() {
  return typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : {};
}
const sc = fv(),
  ic = typeof sc.FormData < "u" ? sc.FormData : void 0,
  pv = (e) => {
    if (!e) return !1;
    if (ic && e instanceof ic) return !0;
    const t = dr(e);
    if (!t || t === Object.prototype || !Ye(e.append)) return !1;
    const n = Oa(e);
    return (
      n === "formdata" ||
      (n === "object" && Ye(e.toString) && e.toString() === "[object FormData]")
    );
  },
  hv = xt("URLSearchParams"),
  [mv, gv, vv, yv] = ["ReadableStream", "Request", "Response", "Headers"].map(
    xt,
  ),
  wv = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ys(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, s;
  if ((typeof e != "object" && (e = [e]), _n(e)))
    for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
  else {
    if (yr(e)) return;
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      l = i.length;
    let a;
    for (r = 0; r < l; r++) ((a = i[r]), t.call(null, e[a], a, e));
  }
}
function Jf(e, t) {
  if (yr(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    s;
  for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s;
  return null;
}
const jn =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Xf = (e) => !fr(e) && e !== jn;
function Po(...e) {
  const { caseless: t, skipUndefined: n } = (Xf(this) && this) || {},
    r = {},
    s = (i, l) => {
      if (l === "__proto__" || l === "constructor" || l === "prototype") return;
      const a = (t && typeof l == "string" && Jf(r, l)) || l,
        u = Pi(r, a) ? r[a] : void 0;
      ti(u) && ti(i)
        ? (r[a] = Po(u, i))
        : ti(i)
          ? (r[a] = Po({}, i))
          : _n(i)
            ? (r[a] = i.slice())
            : (!n || !fr(i)) && (r[a] = i);
    };
  for (let i = 0, l = e.length; i < l; i++) {
    const a = e[i];
    if (!a || yr(a) || (ys(a, s), typeof a != "object" || _n(a))) continue;
    const u = Object.getOwnPropertySymbols(a);
    for (let d = 0; d < u.length; d++) {
      const f = u[d];
      _v.call(a, f) && s(a[f], f);
    }
  }
  return r;
}
const xv = (e, t, n, { allOwnKeys: r } = {}) => (
    ys(
      t,
      (s, i) => {
        n && Ye(s)
          ? Object.defineProperty(e, i, {
              __proto__: null,
              value: Qf(s, n),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, i, {
              __proto__: null,
              value: s,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: r },
    ),
    e
  ),
  Sv = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  jv = (e, t, n, r) => {
    ((e.prototype = Object.create(t.prototype, r)),
      Object.defineProperty(e.prototype, "constructor", {
        __proto__: null,
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "super", {
        __proto__: null,
        value: t.prototype,
      }),
      n && Object.assign(e.prototype, n));
  },
  Nv = (e, t, n, r) => {
    let s, i, l;
    const a = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), i = s.length; i-- > 0; )
        ((l = s[i]),
          (!r || r(l, e, t)) && !a[l] && ((t[l] = e[l]), (a[l] = !0)));
      e = n !== !1 && dr(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  kv = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  Ev = (e) => {
    if (!e) return null;
    if (_n(e)) return e;
    let t = e.length;
    if (!Gf(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Cv = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && dr(Uint8Array)),
  Rv = (e, t) => {
    const r = (e && e[vs]).call(e);
    let s;
    for (; (s = r.next()) && !s.done; ) {
      const i = s.value;
      t.call(e, i[0], i[1]);
    }
  },
  bv = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  Pv = xt("HTMLFormElement"),
  Tv = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
      return r.toUpperCase() + s;
    }),
  { propertyIsEnumerable: _v } = Object.prototype,
  Ov = xt("RegExp"),
  Zf = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    (ys(n, (s, i) => {
      let l;
      (l = t(s, i, e)) !== !1 && (r[i] = l || s);
    }),
      Object.defineProperties(e, r));
  },
  Lv = (e) => {
    Zf(e, (t, n) => {
      if (Ye(e) && ["arguments", "caller", "callee"].includes(n)) return !1;
      const r = e[n];
      if (Ye(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  Iv = (e, t) => {
    const n = {},
      r = (s) => {
        s.forEach((i) => {
          n[i] = !0;
        });
      };
    return (_n(e) ? r(e) : r(String(e).split(t)), n);
  },
  Av = () => {},
  Dv = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function zv(e) {
  return !!(e && Ye(e.append) && e[Kf] === "FormData" && e[vs]);
}
const Fv = (e) => {
    const t = new WeakSet(),
      n = (r) => {
        if (wr(r)) {
          if (t.has(r)) return;
          if (yr(r)) return r;
          if (!("toJSON" in r)) {
            t.add(r);
            const s = _n(r) ? [] : {};
            return (
              ys(r, (i, l) => {
                const a = n(i);
                !fr(a) && (s[l] = a);
              }),
              t.delete(r),
              s
            );
          }
        }
        return r;
      };
    return n(e);
  },
  Uv = xt("AsyncFunction"),
  Mv = (e) => e && (wr(e) || Ye(e)) && Ye(e.then) && Ye(e.catch),
  ep = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, r) => (
            jn.addEventListener(
              "message",
              ({ source: s, data: i }) => {
                s === jn && i === n && r.length && r.shift()();
              },
              !1,
            ),
            (s) => {
              (r.push(s), jn.postMessage(n, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    Ye(jn.postMessage),
  ),
  Bv =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(jn)
      : (typeof process < "u" && process.nextTick) || ep,
  tp = (e) => e != null && Ye(e[vs]),
  $v = (e) => e != null && ds(e, vs) && tp(e),
  v = {
    isArray: _n,
    isArrayBuffer: Yf,
    isBuffer: yr,
    isFormData: pv,
    isArrayBufferView: tv,
    isString: nv,
    isNumber: Gf,
    isBoolean: rv,
    isObject: wr,
    isPlainObject: ti,
    isEmptyObject: sv,
    isReadableStream: mv,
    isRequest: gv,
    isResponse: vv,
    isHeaders: yv,
    isUndefined: fr,
    isDate: iv,
    isFile: lv,
    isReactNativeBlob: ov,
    isReactNative: av,
    isBlob: uv,
    isRegExp: Ov,
    isFunction: Ye,
    isStream: dv,
    isURLSearchParams: hv,
    isTypedArray: Cv,
    isFileList: cv,
    forEach: ys,
    merge: Po,
    extend: xv,
    trim: wv,
    stripBOM: Sv,
    inherits: jv,
    toFlatObject: Nv,
    kindOf: Oa,
    kindOfTest: xt,
    endsWith: kv,
    toArray: Ev,
    forEachEntry: Rv,
    matchAll: bv,
    isHTMLForm: Pv,
    hasOwnProperty: Pi,
    hasOwnProp: Pi,
    hasOwnInPrototypeChain: ds,
    getSafeProp: ev,
    reduceDescriptors: Zf,
    freezeMethods: Lv,
    toObjectSet: Iv,
    toCamelCase: Tv,
    noop: Av,
    toFiniteNumber: Dv,
    findKey: Jf,
    global: jn,
    isContextDefined: Xf,
    isSpecCompliantForm: zv,
    toJSONObject: Fv,
    isAsyncFn: Uv,
    isThenable: Mv,
    setImmediate: ep,
    asap: Bv,
    isIterable: tp,
    isSafeIterable: $v,
  },
  Hv = v.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Wv = (e) => {
    const t = {};
    let n, r, s;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (l) {
            ((s = l.indexOf(":")),
              (n = l.substring(0, s).trim().toLowerCase()),
              (r = l.substring(s + 1).trim()),
              !(!n || (t[n] && Hv[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r)));
          }),
      t
    );
  };
function Vv(e) {
  let t = 0,
    n = e.length;
  for (; t < n; ) {
    const r = e.charCodeAt(t);
    if (r !== 9 && r !== 32) break;
    t += 1;
  }
  for (; n > t; ) {
    const r = e.charCodeAt(n - 1);
    if (r !== 9 && r !== 32) break;
    n -= 1;
  }
  return t === 0 && n === e.length ? e : e.slice(t, n);
}
const qv = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"),
  Qv = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function La(e, t) {
  return v.isArray(e) ? e.map((n) => La(n, t)) : Vv(String(e).replace(t, ""));
}
const Kv = (e) => La(e, qv),
  Yv = (e) => La(e, Qv);
function np(e) {
  const t = Object.create(null);
  return (
    v.forEach(e.toJSON(), (n, r) => {
      t[r] = Yv(n);
    }),
    t
  );
}
const lc = Symbol("internals");
function Or(e) {
  return e && String(e).trim().toLowerCase();
}
function ni(e) {
  return e === !1 || e == null ? e : v.isArray(e) ? e.map(ni) : Kv(String(e));
}
function Gv(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const Jv = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Rl(e, t, n, r, s) {
  if (v.isFunction(r)) return r.call(this, t, n);
  if ((s && (t = n), !!v.isString(t))) {
    if (v.isString(r)) return t.indexOf(r) !== -1;
    if (v.isRegExp(r)) return r.test(t);
  }
}
function Xv(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Zv(e, t) {
  const n = v.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      __proto__: null,
      value: function (s, i, l) {
        return this[r].call(this, t, s, i, l);
      },
      configurable: !0,
    });
  });
}
let Ae = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function i(a, u, d) {
      const f = Or(u);
      if (!f) return;
      const p = v.findKey(s, f);
      (!p || s[p] === void 0 || d === !0 || (d === void 0 && s[p] !== !1)) &&
        (s[p || u] = ni(a));
    }
    const l = (a, u) => v.forEach(a, (d, f) => i(d, f, u));
    if (v.isPlainObject(t) || t instanceof this.constructor) l(t, n);
    else if (v.isString(t) && (t = t.trim()) && !Jv(t)) l(Wv(t), n);
    else if (v.isObject(t) && v.isSafeIterable(t)) {
      let a = Object.create(null),
        u,
        d;
      for (const f of t) {
        if (!v.isArray(f))
          throw new TypeError("Object iterator must return a key-value pair");
        ((d = f[0]),
          v.hasOwnProp(a, d)
            ? ((u = a[d]), (a[d] = v.isArray(u) ? [...u, f[1]] : [u, f[1]]))
            : (a[d] = f[1]));
      }
      l(a, n);
    } else t != null && i(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = Or(t)), t)) {
      const r = v.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n) return s;
        if (n === !0) return Gv(s);
        if (v.isFunction(n)) return n.call(this, s, r);
        if (v.isRegExp(n)) return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = Or(t)), t)) {
      const r = v.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Rl(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function i(l) {
      if (((l = Or(l)), l)) {
        const a = v.findKey(r, l);
        a && (!n || Rl(r, r[a], a, n)) && (delete r[a], (s = !0));
      }
    }
    return (v.isArray(t) ? t.forEach(i) : i(t), s);
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      s = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || Rl(this, this[i], i, t, !0)) && (delete this[i], (s = !0));
    }
    return s;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      v.forEach(this, (s, i) => {
        const l = v.findKey(r, i);
        if (l) {
          ((n[l] = ni(s)), delete n[i]);
          return;
        }
        const a = t ? Xv(i) : String(i).trim();
        (a !== i && delete n[i], (n[a] = ni(s)), (r[a] = !0));
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      v.forEach(this, (r, s) => {
        r != null && r !== !1 && (n[s] = t && v.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return (n.forEach((s) => r.set(s)), r);
  }
  static accessor(t) {
    const r = (this[lc] = this[lc] = { accessors: {} }).accessors,
      s = this.prototype;
    function i(l) {
      const a = Or(l);
      r[a] || (Zv(s, l), (r[a] = !0));
    }
    return (v.isArray(t) ? t.forEach(i) : i(t), this);
  }
};
Ae.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
v.reduceDescriptors(Ae.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
v.freezeMethods(Ae);
const ey = "[REDACTED ****]";
function ty(e) {
  if (v.hasOwnProp(e, "toJSON")) return !0;
  let t = Object.getPrototypeOf(e);
  for (; t && t !== Object.prototype; ) {
    if (v.hasOwnProp(t, "toJSON")) return !0;
    t = Object.getPrototypeOf(t);
  }
  return !1;
}
function ny(e, t) {
  const n = new Set(t.map((i) => String(i).toLowerCase())),
    r = [],
    s = (i) => {
      if (i === null || typeof i != "object" || v.isBuffer(i)) return i;
      if (r.indexOf(i) !== -1) return;
      (i instanceof Ae && (i = i.toJSON()), r.push(i));
      let l;
      if (v.isArray(i))
        ((l = []),
          i.forEach((a, u) => {
            const d = s(a);
            v.isUndefined(d) || (l[u] = d);
          }));
      else {
        if (!v.isPlainObject(i) && ty(i)) return (r.pop(), i);
        l = Object.create(null);
        for (const [a, u] of Object.entries(i)) {
          const d = n.has(a.toLowerCase()) ? ey : s(u);
          v.isUndefined(d) || (l[a] = d);
        }
      }
      return (r.pop(), l);
    };
  return s(e);
}
let b = class rp extends Error {
  static from(t, n, r, s, i, l) {
    const a = new rp(t.message, n || t.code, r, s, i);
    return (
      Object.defineProperty(a, "cause", {
        __proto__: null,
        value: t,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      (a.name = t.name),
      t.status != null && a.status == null && (a.status = t.status),
      l && Object.assign(a, l),
      a
    );
  }
  constructor(t, n, r, s, i) {
    (super(t),
      Object.defineProperty(this, "message", {
        __proto__: null,
        value: t,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      n && (this.code = n),
      r && (this.config = r),
      s && (this.request = s),
      i && ((this.response = i), (this.status = i.status)));
  }
  toJSON() {
    const t = this.config,
      n = t && v.hasOwnProp(t, "redact") ? t.redact : void 0,
      r = v.isArray(n) && n.length > 0 ? ny(t, n) : v.toJSONObject(t);
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: r,
      code: this.code,
      status: this.status,
    };
  }
};
b.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
b.ERR_BAD_OPTION = "ERR_BAD_OPTION";
b.ECONNABORTED = "ECONNABORTED";
b.ETIMEDOUT = "ETIMEDOUT";
b.ECONNREFUSED = "ECONNREFUSED";
b.ERR_NETWORK = "ERR_NETWORK";
b.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
b.ERR_DEPRECATED = "ERR_DEPRECATED";
b.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
b.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
b.ERR_CANCELED = "ERR_CANCELED";
b.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
b.ERR_INVALID_URL = "ERR_INVALID_URL";
b.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const ry = null,
  sp = 100;
function To(e) {
  return v.isPlainObject(e) || v.isArray(e);
}
function ip(e) {
  return v.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function bl(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (s, i) {
          return ((s = ip(s)), !n && i ? "[" + s + "]" : s);
        })
        .join(n ? "." : "")
    : t;
}
function sy(e) {
  return v.isArray(e) && !e.some(To);
}
const iy = v.toFlatObject(v, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Gi(e, t, n) {
  if (!v.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (n = v.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (m, h) {
        return !v.isUndefined(h[m]);
      },
    )));
  const r = n.metaTokens,
    s = n.visitor || j,
    i = n.dots,
    l = n.indexes,
    a = n.Blob || (typeof Blob < "u" && Blob),
    u = n.maxDepth === void 0 ? sp : n.maxDepth,
    d = a && v.isSpecCompliantForm(t),
    f = [];
  if (!v.isFunction(s)) throw new TypeError("visitor must be a function");
  function p(c) {
    if (c === null) return "";
    if (v.isDate(c)) return c.toISOString();
    if (v.isBoolean(c)) return c.toString();
    if (!d && v.isBlob(c))
      throw new b("Blob is not supported. Use a Buffer instead.");
    if (v.isArrayBuffer(c) || v.isTypedArray(c)) {
      if (d && typeof a == "function") return new a([c]);
      if (typeof Buffer < "u") return Buffer.from(c);
      throw new b(
        "Blob is not supported. Use a Buffer instead.",
        b.ERR_NOT_SUPPORT,
      );
    }
    return c;
  }
  function g(c) {
    if (c > u)
      throw new b(
        "Object is too deeply nested (" + c + " levels). Max depth: " + u,
        b.ERR_FORM_DATA_DEPTH_EXCEEDED,
      );
  }
  function y(c, m) {
    if (u === 1 / 0) return JSON.stringify(c);
    const h = [];
    return JSON.stringify(c, function (k, C) {
      if (!v.isObject(C)) return C;
      for (; h.length && h[h.length - 1] !== this; ) h.pop();
      return (h.push(C), g(m + h.length - 1), C);
    });
  }
  function j(c, m, h) {
    let x = c;
    if (v.isReactNative(t) && v.isReactNativeBlob(c))
      return (t.append(bl(h, m, i), p(c)), !1);
    if (c && !h && typeof c == "object") {
      if (v.endsWith(m, "{}")) ((m = r ? m : m.slice(0, -2)), (c = y(c, 1)));
      else if (
        (v.isArray(c) && sy(c)) ||
        ((v.isFileList(c) || v.endsWith(m, "[]")) && (x = v.toArray(c)))
      )
        return (
          (m = ip(m)),
          x.forEach(function (C, R) {
            !(v.isUndefined(C) || C === null) &&
              t.append(
                l === !0 ? bl([m], R, i) : l === null ? m : m + "[]",
                p(C),
              );
          }),
          !1
        );
    }
    return To(c) ? !0 : (t.append(bl(h, m, i), p(c)), !1);
  }
  const S = Object.assign(iy, {
    defaultVisitor: j,
    convertValue: p,
    isVisitable: To,
  });
  function N(c, m, h = 0) {
    if (!v.isUndefined(c)) {
      if ((g(h), f.indexOf(c) !== -1))
        throw new Error("Circular reference detected in " + m.join("."));
      (f.push(c),
        v.forEach(c, function (k, C) {
          (!(v.isUndefined(k) || k === null) &&
            s.call(t, k, v.isString(C) ? C.trim() : C, m, S)) === !0 &&
            N(k, m ? m.concat(C) : [C], h + 1);
        }),
        f.pop());
    }
  }
  if (!v.isObject(e)) throw new TypeError("data must be an object");
  return (N(e), t);
}
function oc(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20/g, function (r) {
    return t[r];
  });
}
function Ia(e, t) {
  ((this._pairs = []), e && Gi(e, this, t));
}
const lp = Ia.prototype;
lp.append = function (t, n) {
  this._pairs.push([t, n]);
};
lp.toString = function (t) {
  const n = t ? (r) => t.call(this, r, oc) : oc;
  return this._pairs
    .map(function (s) {
      return n(s[0]) + "=" + n(s[1]);
    }, "")
    .join("&");
};
function ly(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function op(e, t, n) {
  if (!t) return e;
  e = e || "";
  const r = v.isFunction(n) ? { serialize: n } : n,
    s = v.getSafeProp(r, "encode") || ly,
    i = v.getSafeProp(r, "serialize");
  let l;
  if (
    (i
      ? (l = i(t, r))
      : (l = v.isURLSearchParams(t) ? t.toString() : new Ia(t, r).toString(s)),
    l)
  ) {
    const a = e.indexOf("#");
    (a !== -1 && (e = e.slice(0, a)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + l));
  }
  return e;
}
class ac {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    v.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const Aa = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
    advertiseZstdAcceptEncoding: !1,
    validateStatusUndefinedResolves: !0,
  },
  oy = typeof URLSearchParams < "u" ? URLSearchParams : Ia,
  ay = typeof FormData < "u" ? FormData : null,
  uy = typeof Blob < "u" ? Blob : null,
  cy = {
    isBrowser: !0,
    classes: { URLSearchParams: oy, FormData: ay, Blob: uy },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Da = typeof window < "u" && typeof document < "u",
  _o = (typeof navigator == "object" && navigator) || void 0,
  dy =
    Da &&
    (!_o || ["ReactNative", "NativeScript", "NS"].indexOf(_o.product) < 0),
  fy =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  py = (Da && window.location.href) || "http://localhost",
  hy = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Da,
        hasStandardBrowserEnv: dy,
        hasStandardBrowserWebWorkerEnv: fy,
        navigator: _o,
        origin: py,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  Ce = { ...hy, ...cy };
function my(e, t) {
  return Gi(e, new Ce.classes.URLSearchParams(), {
    visitor: function (n, r, s, i) {
      return Ce.isNode && v.isBuffer(n)
        ? (this.append(r, n.toString("base64")), !1)
        : i.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
const uc = sp;
function ap(e) {
  if (e > uc)
    throw new b(
      "FormData field is too deeply nested (" +
        e +
        " levels). Max depth: " +
        uc,
      b.ERR_FORM_DATA_DEPTH_EXCEEDED,
    );
}
function gy(e) {
  const t = [],
    n = /\w+|\[(\w*)]/g;
  let r;
  for (; (r = n.exec(e)) !== null; )
    (ap(t.length), t.push(r[0] === "[]" ? "" : r[1] || r[0]));
  return t;
}
function vy(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const s = n.length;
  let i;
  for (r = 0; r < s; r++) ((i = n[r]), (t[i] = e[i]));
  return t;
}
function up(e) {
  function t(n, r, s, i) {
    ap(i);
    let l = n[i++];
    if (l === "__proto__") return !0;
    const a = Number.isFinite(+l),
      u = i >= n.length;
    return (
      (l = !l && v.isArray(s) ? s.length : l),
      u
        ? (v.hasOwnProp(s, l)
            ? (s[l] = v.isArray(s[l]) ? s[l].concat(r) : [s[l], r])
            : (s[l] = r),
          !a)
        : ((!v.hasOwnProp(s, l) || !v.isObject(s[l])) && (s[l] = []),
          t(n, r, s[l], i) && v.isArray(s[l]) && (s[l] = vy(s[l])),
          !a)
    );
  }
  if (v.isFormData(e) && v.isFunction(e.entries)) {
    const n = {};
    return (
      v.forEachEntry(e, (r, s) => {
        t(gy(r), s, n, 0);
      }),
      n
    );
  }
  return null;
}
const zn = (e, t) => (e != null && v.hasOwnProp(e, t) ? e[t] : void 0);
function yy(e, t, n) {
  if (v.isString(e))
    try {
      return ((t || JSON.parse)(e), v.trim(e));
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const ws = {
  transitional: Aa,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        s = r.indexOf("application/json") > -1,
        i = v.isObject(t);
      if ((i && v.isHTMLForm(t) && (t = new FormData(t)), v.isFormData(t)))
        return s ? JSON.stringify(up(t)) : t;
      if (
        v.isArrayBuffer(t) ||
        v.isBuffer(t) ||
        v.isStream(t) ||
        v.isFile(t) ||
        v.isBlob(t) ||
        v.isReadableStream(t)
      )
        return t;
      if (v.isArrayBufferView(t)) return t.buffer;
      if (v.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          t.toString()
        );
      let a;
      if (i) {
        const u = zn(this, "formSerializer");
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return my(t, u).toString();
        if ((a = v.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const d = zn(this, "env"),
            f = d && d.FormData;
          return Gi(a ? { "files[]": t } : t, f && new f(), u);
        }
      }
      return i || s ? (n.setContentType("application/json", !1), yy(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = zn(this, "transitional") || ws.transitional,
        r = n && n.forcedJSONParsing,
        s = zn(this, "responseType"),
        i = s === "json";
      if (v.isResponse(t) || v.isReadableStream(t)) return t;
      if (t && v.isString(t) && ((r && !s) || i)) {
        const a = !(n && n.silentJSONParsing) && i;
        try {
          return JSON.parse(t, zn(this, "parseReviver"));
        } catch (u) {
          if (a)
            throw u.name === "SyntaxError"
              ? b.from(u, b.ERR_BAD_RESPONSE, this, null, zn(this, "response"))
              : u;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Ce.classes.FormData, Blob: Ce.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
v.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (e) => {
  ws.headers[e] = {};
});
function Pl(e, t) {
  const n = this || ws,
    r = t || n,
    s = Ae.from(r.headers);
  let i = r.data;
  return (
    v.forEach(e, function (a) {
      i = a.call(n, i, s.normalize(), t ? t.status : void 0);
    }),
    s.normalize(),
    i
  );
}
function cp(e) {
  return !!(e && e.__CANCEL__);
}
let xs = class extends b {
  constructor(t, n, r) {
    (super(t ?? "canceled", b.ERR_CANCELED, n, r),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function dp(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new b(
          "Request failed with status code " + n.status,
          n.status >= 400 && n.status < 500
            ? b.ERR_BAD_REQUEST
            : b.ERR_BAD_RESPONSE,
          n.config,
          n.request,
          n,
        ),
      );
}
function wy(e) {
  const t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
  return (t && t[1]) || "";
}
function xy(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let s = 0,
    i = 0,
    l;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (u) {
      const d = Date.now(),
        f = r[i];
      (l || (l = d), (n[s] = u), (r[s] = d));
      let p = i,
        g = 0;
      for (; p !== s; ) ((g += n[p++]), (p = p % e));
      if (((s = (s + 1) % e), s === i && (i = (i + 1) % e), d - l < t)) return;
      const y = f && d - f;
      return y ? Math.round((g * 1e3) / y) : void 0;
    }
  );
}
function Sy(e, t) {
  let n = 0,
    r = 1e3 / t,
    s,
    i;
  const l = (d, f = Date.now()) => {
    ((n = f), (s = null), i && (clearTimeout(i), (i = null)), e(...d));
  };
  return [
    (...d) => {
      const f = Date.now(),
        p = f - n;
      p >= r
        ? l(d, f)
        : ((s = d),
          i ||
            (i = setTimeout(() => {
              ((i = null), l(s));
            }, r - p)));
    },
    () => s && l(s),
  ];
}
const Ti = (e, t, n = 3) => {
    let r = 0;
    const s = xy(50, 250);
    return Sy((i) => {
      if (!i || typeof i.loaded != "number") return;
      const l = i.loaded,
        a = i.lengthComputable ? i.total : void 0,
        u = a != null ? Math.min(l, a) : l,
        d = Math.max(0, u - r),
        f = s(d);
      r = Math.max(r, u);
      const p = {
        loaded: u,
        total: a,
        progress: a ? u / a : void 0,
        bytes: d,
        rate: f || void 0,
        estimated: f && a ? (a - u) / f : void 0,
        event: i,
        lengthComputable: a != null,
        [t ? "download" : "upload"]: !0,
      };
      e(p);
    }, n);
  },
  cc = (e, t) => {
    const n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  dc =
    (e) =>
    (...t) =>
      v.asap(() => e(...t)),
  jy = Ce.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, Ce.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(Ce.origin),
        Ce.navigator && /(msie|trident)/i.test(Ce.navigator.userAgent),
      )
    : () => !0,
  Ny = Ce.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, s, i, l) {
          if (typeof document > "u") return;
          const a = [`${e}=${encodeURIComponent(t)}`];
          (v.isNumber(n) && a.push(`expires=${new Date(n).toUTCString()}`),
            v.isString(r) && a.push(`path=${r}`),
            v.isString(s) && a.push(`domain=${s}`),
            i === !0 && a.push("secure"),
            v.isString(l) && a.push(`SameSite=${l}`),
            (document.cookie = a.join("; ")));
        },
        read(e) {
          if (typeof document > "u") return null;
          const t = document.cookie.split(";");
          for (let n = 0; n < t.length; n++) {
            const r = t[n].replace(/^\s+/, ""),
              s = r.indexOf("=");
            if (s !== -1 && r.slice(0, s) === e)
              try {
                return decodeURIComponent(r.slice(s + 1));
              } catch {
                return r.slice(s + 1);
              }
          }
          return null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function ky(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ey(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
const Cy = /^https?:(?!\/\/)/i,
  Ry = /[\t\n\r]/g;
function by(e) {
  let t = 0;
  for (; t < e.length && e.charCodeAt(t) <= 32; ) t++;
  return e.slice(t);
}
function Py(e) {
  return by(e).replace(Ry, "");
}
function fc(e, t) {
  if (typeof e == "string" && Cy.test(Py(e)))
    throw new b(
      'Invalid URL: missing "//" after protocol',
      b.ERR_INVALID_URL,
      t,
    );
}
function fp(e, t, n, r) {
  fc(t, r);
  let s = !ky(t);
  return e && (s || n === !1) ? (fc(e, r), Ey(e, t)) : t;
}
const pc = (e) => (e instanceof Ae ? { ...e } : e);
function On(e, t) {
  ((e = e || {}), (t = t || {}));
  const n = Object.create(null);
  Object.defineProperty(n, "hasOwnProperty", {
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: !1,
    writable: !0,
    configurable: !0,
  });
  function r(f, p, g, y) {
    return v.isPlainObject(f) && v.isPlainObject(p)
      ? v.merge.call({ caseless: y }, f, p)
      : v.isPlainObject(p)
        ? v.merge({}, p)
        : v.isArray(p)
          ? p.slice()
          : p;
  }
  function s(f, p, g, y) {
    if (v.isUndefined(p)) {
      if (!v.isUndefined(f)) return r(void 0, f, g, y);
    } else return r(f, p, g, y);
  }
  function i(f, p) {
    if (!v.isUndefined(p)) return r(void 0, p);
  }
  function l(f, p) {
    if (v.isUndefined(p)) {
      if (!v.isUndefined(f)) return r(void 0, f);
    } else return r(void 0, p);
  }
  function a(f) {
    const p = v.hasOwnProp(t, "transitional") ? t.transitional : void 0;
    if (!v.isUndefined(p))
      if (v.isPlainObject(p)) {
        if (v.hasOwnProp(p, f)) return p[f];
      } else return;
    const g = v.hasOwnProp(e, "transitional") ? e.transitional : void 0;
    if (v.isPlainObject(g) && v.hasOwnProp(g, f)) return g[f];
  }
  function u(f, p, g) {
    if (v.hasOwnProp(t, g)) return r(f, p);
    if (v.hasOwnProp(e, g)) return r(void 0, f);
  }
  const d = {
    url: i,
    method: i,
    data: i,
    baseURL: l,
    transformRequest: l,
    transformResponse: l,
    paramsSerializer: l,
    timeout: l,
    timeoutMessage: l,
    withCredentials: l,
    withXSRFToken: l,
    adapter: l,
    responseType: l,
    xsrfCookieName: l,
    xsrfHeaderName: l,
    onUploadProgress: l,
    onDownloadProgress: l,
    decompress: l,
    maxContentLength: l,
    maxBodyLength: l,
    beforeRedirect: l,
    transport: l,
    httpAgent: l,
    httpsAgent: l,
    cancelToken: l,
    socketPath: l,
    allowedSocketPaths: l,
    responseEncoding: l,
    validateStatus: u,
    headers: (f, p, g) => s(pc(f), pc(p), g, !0),
  };
  return (
    v.forEach(Object.keys({ ...e, ...t }), function (p) {
      if (p === "__proto__" || p === "constructor" || p === "prototype") return;
      const g = v.hasOwnProp(d, p) ? d[p] : s,
        y = v.hasOwnProp(e, p) ? e[p] : void 0,
        j = v.hasOwnProp(t, p) ? t[p] : void 0,
        S = g(y, j, p);
      (v.isUndefined(S) && g !== u) || (n[p] = S);
    }),
    v.hasOwnProp(t, "validateStatus") &&
      v.isUndefined(t.validateStatus) &&
      a("validateStatusUndefinedResolves") === !1 &&
      (v.hasOwnProp(e, "validateStatus")
        ? (n.validateStatus = r(void 0, e.validateStatus))
        : delete n.validateStatus),
    n
  );
}
const Ty = ["content-type", "content-length"];
function _y(e, t, n) {
  if (n !== "content-only") {
    e.set(t);
    return;
  }
  Object.entries(t || {}).forEach(([r, s]) => {
    Ty.includes(r.toLowerCase()) && e.set(r, s);
  });
}
const Oy = (e) =>
  encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (t, n) =>
    String.fromCharCode(parseInt(n, 16)),
  );
function pp(e) {
  const t = On({}, e),
    n = (g) => (v.hasOwnProp(t, g) ? t[g] : void 0),
    r = n("data");
  let s = n("withXSRFToken");
  const i = n("xsrfHeaderName"),
    l = n("xsrfCookieName");
  let a = n("headers");
  const u = n("auth"),
    d = n("baseURL"),
    f = n("allowAbsoluteUrls"),
    p = n("url");
  if (
    ((t.headers = a = Ae.from(a)),
    (t.url = op(fp(d, p, f, t), n("params"), n("paramsSerializer"))),
    u)
  ) {
    const g = v.getSafeProp(u, "username") || "",
      y = v.getSafeProp(u, "password") || "";
    try {
      a.set("Authorization", "Basic " + btoa(g + ":" + (y ? Oy(y) : "")));
    } catch (j) {
      throw b.from(j, b.ERR_BAD_OPTION_VALUE, e);
    }
  }
  if (
    (v.isFormData(r) &&
      (Ce.hasStandardBrowserEnv ||
      Ce.hasStandardBrowserWebWorkerEnv ||
      v.isReactNative(r)
        ? a.setContentType(void 0)
        : v.isFunction(r.getHeaders) &&
          _y(a, r.getHeaders(), n("formDataHeaderPolicy"))),
    Ce.hasStandardBrowserEnv &&
      (v.isFunction(s) && (s = s(t)), s === !0 || (s == null && jy(t.url))))
  ) {
    const y = i && l && Ny.read(l);
    y && a.set(i, y);
  }
  return t;
}
const Ly = typeof XMLHttpRequest < "u",
  Iy =
    Ly &&
    function (e) {
      return new Promise(function (n, r) {
        const s = pp(e);
        let i = s.data;
        const l = Ae.from(s.headers).normalize();
        let { responseType: a, onUploadProgress: u, onDownloadProgress: d } = s,
          f,
          p,
          g,
          y,
          j;
        function S() {
          (y && y(),
            j && j(),
            s.cancelToken && s.cancelToken.unsubscribe(f),
            s.signal && s.signal.removeEventListener("abort", f));
        }
        let N = new XMLHttpRequest();
        (N.open(s.method.toUpperCase(), s.url, !0), (N.timeout = s.timeout));
        function c() {
          if (!N) return;
          const h = Ae.from(
              "getAllResponseHeaders" in N && N.getAllResponseHeaders(),
            ),
            k = {
              data:
                !a || a === "text" || a === "json"
                  ? N.responseText
                  : N.response,
              status: N.status,
              statusText: N.statusText,
              headers: h,
              config: e,
              request: N,
            };
          (dp(
            function (R) {
              (n(R), S());
            },
            function (R) {
              (r(R), S());
            },
            k,
          ),
            (N = null));
        }
        ("onloadend" in N
          ? (N.onloadend = c)
          : (N.onreadystatechange = function () {
              !N ||
                N.readyState !== 4 ||
                (N.status === 0 &&
                  !(N.responseURL && N.responseURL.startsWith("file:"))) ||
                setTimeout(c);
            }),
          (N.onabort = function () {
            N &&
              (r(new b("Request aborted", b.ECONNABORTED, e, N)),
              S(),
              (N = null));
          }),
          (N.onerror = function (x) {
            const k = x && x.message ? x.message : "Network Error",
              C = new b(k, b.ERR_NETWORK, e, N);
            ((C.event = x || null), r(C), S(), (N = null));
          }),
          (N.ontimeout = function () {
            let x = s.timeout
              ? "timeout of " + s.timeout + "ms exceeded"
              : "timeout exceeded";
            const k = s.transitional || Aa;
            (s.timeoutErrorMessage && (x = s.timeoutErrorMessage),
              r(
                new b(
                  x,
                  k.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
                  e,
                  N,
                ),
              ),
              S(),
              (N = null));
          }),
          i === void 0 && l.setContentType(null),
          "setRequestHeader" in N &&
            v.forEach(np(l), function (x, k) {
              N.setRequestHeader(k, x);
            }),
          v.isUndefined(s.withCredentials) ||
            (N.withCredentials = !!s.withCredentials),
          a && a !== "json" && (N.responseType = s.responseType),
          d && (([g, j] = Ti(d, !0)), N.addEventListener("progress", g)),
          u &&
            N.upload &&
            (([p, y] = Ti(u)),
            N.upload.addEventListener("progress", p),
            N.upload.addEventListener("loadend", y)),
          (s.cancelToken || s.signal) &&
            ((f = (h) => {
              N &&
                (r(!h || h.type ? new xs(null, e, N) : h),
                N.abort(),
                S(),
                (N = null));
            }),
            s.cancelToken && s.cancelToken.subscribe(f),
            s.signal &&
              (s.signal.aborted
                ? f()
                : s.signal.addEventListener("abort", f))));
        const m = wy(s.url);
        if (m && !Ce.protocols.includes(m)) {
          (r(new b("Unsupported protocol " + m + ":", b.ERR_BAD_REQUEST, e)),
            S());
          return;
        }
        N.send(i || null);
      });
    },
  Ay = (e, t) => {
    if (((e = e ? e.filter(Boolean) : []), !t && !e.length)) return;
    const n = new AbortController();
    let r = !1;
    const s = function (u) {
      if (!r) {
        ((r = !0), l());
        const d = u instanceof Error ? u : this.reason;
        n.abort(
          d instanceof b ? d : new xs(d instanceof Error ? d.message : d),
        );
      }
    };
    let i =
      t &&
      setTimeout(() => {
        ((i = null), s(new b(`timeout of ${t}ms exceeded`, b.ETIMEDOUT)));
      }, t);
    const l = () => {
      e &&
        (i && clearTimeout(i),
        (i = null),
        e.forEach((u) => {
          u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
        }),
        (e = null));
    };
    e.forEach((u) => u.addEventListener("abort", s, { once: !0 }));
    const { signal: a } = n;
    return ((a.unsubscribe = () => v.asap(l)), a);
  },
  Dy = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let r = 0,
      s;
    for (; r < n; ) ((s = r + t), yield e.slice(r, s), (r = s));
  },
  zy = async function* (e, t) {
    for await (const n of Fy(e)) yield* Dy(n, t);
  },
  Fy = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await t.read();
        if (n) break;
        yield r;
      }
    } finally {
      await t.cancel();
    }
  },
  hc = (e, t, n, r) => {
    const s = zy(e, t);
    let i = 0,
      l,
      a = (u) => {
        l || ((l = !0), r && r(u));
      };
    return new ReadableStream(
      {
        async pull(u) {
          try {
            const { done: d, value: f } = await s.next();
            if (d) {
              (a(), u.close());
              return;
            }
            let p = f.byteLength;
            if (n) {
              let g = (i += p);
              n(g);
            }
            u.enqueue(new Uint8Array(f));
          } catch (d) {
            throw (a(d), d);
          }
        },
        cancel(u) {
          return (a(u), s.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  _i = (e) =>
    (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102),
  Uy = (e, t, n) =>
    t + 2 < n && _i(e.charCodeAt(t + 1)) && _i(e.charCodeAt(t + 2));
function My(e) {
  if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
  const t = e.indexOf(",");
  if (t < 0) return 0;
  const n = e.slice(5, t),
    r = e.slice(t + 1);
  if (/;base64/i.test(n)) {
    let l = r.length;
    const a = r.length;
    for (let y = 0; y < a; y++)
      if (r.charCodeAt(y) === 37 && y + 2 < a) {
        const j = r.charCodeAt(y + 1),
          S = r.charCodeAt(y + 2);
        _i(j) && _i(S) && ((l -= 2), (y += 2));
      }
    let u = 0,
      d = a - 1;
    const f = (y) =>
      y >= 2 &&
      r.charCodeAt(y - 2) === 37 &&
      r.charCodeAt(y - 1) === 51 &&
      (r.charCodeAt(y) === 68 || r.charCodeAt(y) === 100);
    (d >= 0 && (r.charCodeAt(d) === 61 ? (u++, d--) : f(d) && (u++, (d -= 3))),
      u === 1 && d >= 0 && (r.charCodeAt(d) === 61 || f(d)) && u++);
    const g = Math.floor(l / 4) * 3 - (u || 0);
    return g > 0 ? g : 0;
  }
  let i = 0;
  for (let l = 0, a = r.length; l < a; l++) {
    const u = r.charCodeAt(l);
    if (u === 37 && Uy(r, l, a)) ((i += 1), (l += 2));
    else if (u < 128) i += 1;
    else if (u < 2048) i += 2;
    else if (u >= 55296 && u <= 56319 && l + 1 < a) {
      const d = r.charCodeAt(l + 1);
      d >= 56320 && d <= 57343 ? ((i += 4), l++) : (i += 3);
    } else i += 3;
  }
  return i;
}
const za = "1.18.1",
  mc = 64 * 1024,
  { isFunction: $s } = v,
  By = (e) =>
    encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (t, n) =>
      String.fromCharCode(parseInt(n, 16)),
    ),
  gc = (e) => {
    if (!v.isString(e)) return e;
    try {
      return decodeURIComponent(e);
    } catch {
      return e;
    }
  },
  vc = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  $y = (e) => {
    const t = e.indexOf("://");
    let n = e;
    return (
      t !== -1 && (n = n.slice(t + 3)),
      n.includes("@") || n.includes(":")
    );
  },
  Hy = (e) => {
    const t = v.global !== void 0 && v.global !== null ? v.global : globalThis,
      { ReadableStream: n, TextEncoder: r } = t;
    e = v.merge.call(
      { skipUndefined: !0 },
      { Request: t.Request, Response: t.Response },
      e,
    );
    const { fetch: s, Request: i, Response: l } = e,
      a = s ? $s(s) : typeof fetch == "function",
      u = $s(i),
      d = $s(l);
    if (!a) return !1;
    const f = a && $s(n),
      p =
        a &&
        (typeof r == "function"
          ? (
              (c) => (m) =>
                c.encode(m)
            )(new r())
          : async (c) => new Uint8Array(await new i(c).arrayBuffer())),
      g =
        u &&
        f &&
        vc(() => {
          let c = !1;
          const m = new i(Ce.origin, {
              body: new n(),
              method: "POST",
              get duplex() {
                return ((c = !0), "half");
              },
            }),
            h = m.headers.has("Content-Type");
          return (m.body != null && m.body.cancel(), c && !h);
        }),
      y = d && f && vc(() => v.isReadableStream(new l("").body)),
      j = { stream: y && ((c) => c.body) };
    a &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((c) => {
        !j[c] &&
          (j[c] = (m, h) => {
            let x = m && m[c];
            if (x) return x.call(m);
            throw new b(
              `Response type '${c}' is not supported`,
              b.ERR_NOT_SUPPORT,
              h,
            );
          });
      });
    const S = async (c) => {
        if (c == null) return 0;
        if (v.isBlob(c)) return c.size;
        if (v.isSpecCompliantForm(c))
          return (
            await new i(Ce.origin, { method: "POST", body: c }).arrayBuffer()
          ).byteLength;
        if (v.isArrayBufferView(c) || v.isArrayBuffer(c)) return c.byteLength;
        if ((v.isURLSearchParams(c) && (c = c + ""), v.isString(c)))
          return (await p(c)).byteLength;
      },
      N = async (c, m) => {
        const h = v.toFiniteNumber(c.getContentLength());
        return h ?? S(m);
      };
    return async (c) => {
      let {
        url: m,
        method: h,
        data: x,
        signal: k,
        cancelToken: C,
        timeout: R,
        onDownloadProgress: T,
        onUploadProgress: H,
        responseType: O,
        headers: U,
        withCredentials: pe = "same-origin",
        fetchOptions: M,
        maxContentLength: V,
        maxBodyLength: le,
      } = pp(c);
      const oe = v.isNumber(V) && V > -1,
        He = v.isNumber(le) && le > -1,
        P = (F) => (v.hasOwnProp(c, F) ? c[F] : void 0);
      let I = s || fetch;
      O = O ? (O + "").toLowerCase() : "text";
      let L = Ay([k, C && C.toAbortSignal()], R),
        D = null;
      const Q =
        L &&
        L.unsubscribe &&
        (() => {
          L.unsubscribe();
        });
      let ze,
        ke = null;
      const _t = () =>
        new b(
          "Request body larger than maxBodyLength limit",
          b.ERR_BAD_REQUEST,
          c,
          D,
        );
      try {
        let F;
        const te = P("auth");
        if (te) {
          const z = v.getSafeProp(te, "username") || "",
            Fe = v.getSafeProp(te, "password") || "";
          F = { username: z, password: Fe };
        }
        if ($y(m)) {
          const z = new URL(m, Ce.origin);
          if (!F && (z.username || z.password)) {
            const Fe = gc(z.username),
              St = gc(z.password);
            F = { username: Fe, password: St };
          }
          (z.username || z.password) &&
            ((z.username = ""), (z.password = ""), (m = z.href));
        }
        if (
          (F &&
            (U.delete("authorization"),
            U.set(
              "Authorization",
              "Basic " +
                btoa(By((F.username || "") + ":" + (F.password || ""))),
            )),
          oe && typeof m == "string" && m.startsWith("data:") && My(m) > V)
        )
          throw new b(
            "maxContentLength size of " + V + " exceeded",
            b.ERR_BAD_RESPONSE,
            c,
            D,
          );
        if (He && h !== "get" && h !== "head") {
          const z = await S(x);
          if (typeof z == "number" && isFinite(z) && ((ze = z), z > le))
            throw _t();
        }
        const An = He && (v.isReadableStream(x) || v.isStream(x)),
          Sr = (z, Fe, St) =>
            hc(
              z,
              mc,
              (jt) => {
                if (He && jt > le) throw (ke = _t());
                Fe && Fe(jt);
              },
              St,
            );
        if (g && h !== "get" && h !== "head" && (H || An)) {
          if (((ze = ze ?? (await N(U, x))), ze !== 0 || An)) {
            let z = new i(m, { method: "POST", body: x, duplex: "half" }),
              Fe;
            if (
              (v.isFormData(x) &&
                (Fe = z.headers.get("content-type")) &&
                U.setContentType(Fe),
              z.body)
            ) {
              const [St, jt] = (H && cc(ze, Ti(dc(H)))) || [];
              x = Sr(z.body, St, jt);
            }
          }
        } else if (An && !u && f && h !== "get" && h !== "head") x = Sr(x);
        else if (An && u && !g && h !== "get" && h !== "head")
          throw new b(
            "Stream request bodies are not supported by the current fetch implementation",
            b.ERR_NOT_SUPPORT,
            c,
            D,
          );
        v.isString(pe) || (pe = pe ? "include" : "omit");
        const Xi = u && "credentials" in i.prototype;
        if (v.isFormData(x)) {
          const z = U.getContentType();
          z &&
            /^multipart\/form-data/i.test(z) &&
            !/boundary=/i.test(z) &&
            U.delete("content-type");
        }
        U.set("User-Agent", "axios/" + za, !1);
        const Ss = {
          ...M,
          signal: L,
          method: h.toUpperCase(),
          headers: np(U.normalize()),
          body: x,
          duplex: "half",
          credentials: Xi ? pe : void 0,
        };
        D = u && new i(m, Ss);
        let me = await (u ? I(D, M) : I(m, Ss));
        const js = Ae.from(me.headers);
        if (oe) {
          const z = v.toFiniteNumber(js.getContentLength());
          if (z != null && z > V)
            throw new b(
              "maxContentLength size of " + V + " exceeded",
              b.ERR_BAD_RESPONSE,
              c,
              D,
            );
        }
        const mn = y && (O === "stream" || O === "response");
        if (y && me.body && (T || oe || (mn && Q))) {
          const z = {};
          ["status", "statusText", "headers"].forEach((Ht) => {
            z[Ht] = me[Ht];
          });
          const Fe = v.toFiniteNumber(js.getContentLength()),
            [St, jt] = (T && cc(Fe, Ti(dc(T), !0))) || [];
          let jr = 0;
          const Zi = (Ht) => {
            if (oe && ((jr = Ht), jr > V))
              throw new b(
                "maxContentLength size of " + V + " exceeded",
                b.ERR_BAD_RESPONSE,
                c,
                D,
              );
            St && St(Ht);
          };
          me = new l(
            hc(me.body, mc, Zi, () => {
              (jt && jt(), Q && Q());
            }),
            z,
          );
        }
        O = O || "text";
        let ft = await j[v.findKey(j, O) || "text"](me, c);
        if (oe && !y && !mn) {
          let z;
          if (
            (ft != null &&
              (typeof ft.byteLength == "number"
                ? (z = ft.byteLength)
                : typeof ft.size == "number"
                  ? (z = ft.size)
                  : typeof ft == "string" &&
                    (z =
                      typeof r == "function"
                        ? new r().encode(ft).byteLength
                        : ft.length)),
            typeof z == "number" && z > V)
          )
            throw new b(
              "maxContentLength size of " + V + " exceeded",
              b.ERR_BAD_RESPONSE,
              c,
              D,
            );
        }
        return (
          !mn && Q && Q(),
          await new Promise((z, Fe) => {
            dp(z, Fe, {
              data: ft,
              headers: Ae.from(me.headers),
              status: me.status,
              statusText: me.statusText,
              config: c,
              request: D,
            });
          })
        );
      } catch (F) {
        if ((Q && Q(), L && L.aborted && L.reason instanceof b)) {
          const te = L.reason;
          throw (
            (te.config = c),
            D && (te.request = D),
            F !== te &&
              Object.defineProperty(te, "cause", {
                __proto__: null,
                value: F,
                writable: !0,
                enumerable: !1,
                configurable: !0,
              }),
            te
          );
        }
        if (ke) throw (D && !ke.request && (ke.request = D), ke);
        if (F instanceof b) throw (D && !F.request && (F.request = D), F);
        if (
          F &&
          F.name === "TypeError" &&
          /Load failed|fetch/i.test(F.message)
        ) {
          const te = new b(
            "Network Error",
            b.ERR_NETWORK,
            c,
            D,
            F && F.response,
          );
          throw (
            Object.defineProperty(te, "cause", {
              __proto__: null,
              value: F.cause || F,
              writable: !0,
              enumerable: !1,
              configurable: !0,
            }),
            te
          );
        }
        throw b.from(F, F && F.code, c, D, F && F.response);
      }
    };
  },
  Wy = new Map(),
  hp = (e) => {
    let t = (e && e.env) || {};
    const { fetch: n, Request: r, Response: s } = t,
      i = [r, s, n];
    let l = i.length,
      a = l,
      u,
      d,
      f = Wy;
    for (; a--; )
      ((u = i[a]),
        (d = f.get(u)),
        d === void 0 && f.set(u, (d = a ? new Map() : Hy(t))),
        (f = d));
    return d;
  };
hp();
const Fa = { http: ry, xhr: Iy, fetch: { get: hp } };
v.forEach(Fa, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { __proto__: null, value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { __proto__: null, value: t });
  }
});
const yc = (e) => `- ${e}`,
  Vy = (e) => v.isFunction(e) || e === null || e === !1;
function qy(e, t) {
  e = v.isArray(e) ? e : [e];
  const { length: n } = e;
  let r, s;
  const i = {};
  for (let l = 0; l < n; l++) {
    r = e[l];
    let a;
    if (
      ((s = r),
      !Vy(r) && ((s = Fa[(a = String(r)).toLowerCase()]), s === void 0))
    )
      throw new b(`Unknown adapter '${a}'`);
    if (s && (v.isFunction(s) || (s = s.get(t)))) break;
    i[a || "#" + l] = s;
  }
  if (!s) {
    const l = Object.entries(i).map(
      ([u, d]) =>
        `adapter ${u} ` +
        (d === !1
          ? "is not supported by the environment"
          : "is not available in the build"),
    );
    let a = n
      ? l.length > 1
        ? `since :
` +
          l.map(yc).join(`
`)
        : " " + yc(l[0])
      : "as no adapter specified";
    throw new b(
      "There is no suitable adapter to dispatch the request " + a,
      b.ERR_NOT_SUPPORT,
    );
  }
  return s;
}
const mp = { getAdapter: qy, adapters: Fa };
function Tl(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new xs(null, e);
}
function wc(e) {
  return (
    Tl(e),
    (e.headers = Ae.from(e.headers)),
    (e.data = Pl.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    mp
      .getAdapter(
        e.adapter || ws.adapter,
        e,
      )(e)
      .then(
        function (r) {
          (Tl(e), (e.response = r));
          try {
            r.data = Pl.call(e, e.transformResponse, r);
          } finally {
            delete e.response;
          }
          return ((r.headers = Ae.from(r.headers)), r);
        },
        function (r) {
          if (!cp(r) && (Tl(e), r && r.response)) {
            e.response = r.response;
            try {
              r.response.data = Pl.call(e, e.transformResponse, r.response);
            } finally {
              delete e.response;
            }
            r.response.headers = Ae.from(r.response.headers);
          }
          return Promise.reject(r);
        },
      )
  );
}
const Ji = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Ji[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  },
);
const xc = {};
Ji.transitional = function (t, n, r) {
  function s(i, l) {
    return (
      "[Axios v" +
      za +
      "] Transitional option '" +
      i +
      "'" +
      l +
      (r ? ". " + r : "")
    );
  }
  return (i, l, a) => {
    if (t === !1)
      throw new b(
        s(l, " has been removed" + (n ? " in " + n : "")),
        b.ERR_DEPRECATED,
      );
    return (
      n &&
        !xc[l] &&
        ((xc[l] = !0),
        console.warn(
          s(
            l,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future",
          ),
        )),
      t ? t(i, l, a) : !0
    );
  };
};
Ji.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function Qy(e, t, n) {
  if (typeof e != "object" || e === null)
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const i = r[s],
      l = Object.prototype.hasOwnProperty.call(t, i) ? t[i] : void 0;
    if (l) {
      const a = e[i],
        u = a === void 0 || l(a, i, e);
      if (u !== !0)
        throw new b("option " + i + " must be " + u, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new b("Unknown option " + i, b.ERR_BAD_OPTION);
  }
}
const ri = { assertOptions: Qy, validators: Ji },
  Oe = ri.validators;
let En = class {
  constructor(t) {
    ((this.defaults = t || {}),
      (this.interceptors = { request: new ac(), response: new ac() }));
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let s = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(s)
          : (s = new Error());
        const i = (() => {
          if (!s.stack) return "";
          const l = s.stack.indexOf(`
`);
          return l === -1 ? "" : s.stack.slice(l + 1);
        })();
        try {
          if (!r.stack) r.stack = i;
          else if (i) {
            const l = i.indexOf(`
`),
              a =
                l === -1
                  ? -1
                  : i.indexOf(
                      `
`,
                      l + 1,
                    ),
              u = a === -1 ? "" : i.slice(a + 1);
            String(r.stack).endsWith(u) ||
              (r.stack +=
                `
` + i);
          }
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    (typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = On(this.defaults, n)));
    const { transitional: r, paramsSerializer: s, headers: i } = n;
    (r !== void 0 &&
      ri.assertOptions(
        r,
        {
          silentJSONParsing: Oe.transitional(Oe.boolean),
          forcedJSONParsing: Oe.transitional(Oe.boolean),
          clarifyTimeoutError: Oe.transitional(Oe.boolean),
          legacyInterceptorReqResOrdering: Oe.transitional(Oe.boolean),
          advertiseZstdAcceptEncoding: Oe.transitional(Oe.boolean),
          validateStatusUndefinedResolves: Oe.transitional(Oe.boolean),
        },
        !1,
      ),
      s != null &&
        (v.isFunction(s)
          ? (n.paramsSerializer = { serialize: s })
          : ri.assertOptions(
              s,
              { encode: Oe.function, serialize: Oe.function },
              !0,
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      ri.assertOptions(
        n,
        {
          baseUrl: Oe.spelling("baseURL"),
          withXsrfToken: Oe.spelling("withXSRFToken"),
        },
        !0,
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase()));
    let l = i && v.merge(i.common, i[n.method]);
    (i &&
      v.forEach(
        ["delete", "get", "head", "post", "put", "patch", "query", "common"],
        (j) => {
          delete i[j];
        },
      ),
      (n.headers = Ae.concat(l, i)));
    const a = [];
    let u = !0;
    this.interceptors.request.forEach(function (S) {
      if (typeof S.runWhen == "function" && S.runWhen(n) === !1) return;
      u = u && S.synchronous;
      const N = n.transitional || Aa;
      N && N.legacyInterceptorReqResOrdering
        ? a.unshift(S.fulfilled, S.rejected)
        : a.push(S.fulfilled, S.rejected);
    });
    const d = [];
    this.interceptors.response.forEach(function (S) {
      d.push(S.fulfilled, S.rejected);
    });
    let f,
      p = 0,
      g;
    if (!u) {
      const j = [wc.bind(this), void 0];
      for (
        j.unshift(...a), j.push(...d), g = j.length, f = Promise.resolve(n);
        p < g;
      )
        f = f.then(j[p++], j[p++]);
      return f;
    }
    g = a.length;
    let y = n;
    for (; p < g; ) {
      const j = a[p++],
        S = a[p++];
      try {
        y = j(y);
      } catch (N) {
        S.call(this, N);
        break;
      }
    }
    try {
      f = wc.call(this, y);
    } catch (j) {
      return Promise.reject(j);
    }
    for (p = 0, g = d.length; p < g; ) f = f.then(d[p++], d[p++]);
    return f;
  }
  getUri(t) {
    t = On(this.defaults, t);
    const n = fp(t.baseURL, t.url, t.allowAbsoluteUrls, t);
    return op(n, t.params, t.paramsSerializer);
  }
};
v.forEach(["delete", "get", "head", "options"], function (t) {
  En.prototype[t] = function (n, r) {
    return this.request(
      On(r || {}, {
        method: t,
        url: n,
        data: r && v.hasOwnProp(r, "data") ? r.data : void 0,
      }),
    );
  };
});
v.forEach(["post", "put", "patch", "query"], function (t) {
  function n(r) {
    return function (i, l, a) {
      return this.request(
        On(a || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: i,
          data: l,
        }),
      );
    };
  }
  ((En.prototype[t] = n()),
    t !== "query" && (En.prototype[t + "Form"] = n(!0)));
});
let Ky = class gp {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (i) {
      n = i;
    });
    const r = this;
    (this.promise.then((s) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; ) r._listeners[i](s);
      r._listeners = null;
    }),
      (this.promise.then = (s) => {
        let i;
        const l = new Promise((a) => {
          (r.subscribe(a), (i = a));
        }).then(s);
        return (
          (l.cancel = function () {
            r.unsubscribe(i);
          }),
          l
        );
      }),
      t(function (i, l, a) {
        r.reason || ((r.reason = new xs(i, l, a)), n(r.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (r) => {
        t.abort(r);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new gp(function (s) {
        t = s;
      }),
      cancel: t,
    };
  }
};
function Yy(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Gy(e) {
  return v.isObject(e) && e.isAxiosError === !0;
}
const Oo = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(Oo).forEach(([e, t]) => {
  Oo[t] = e;
});
function vp(e) {
  const t = new En(e),
    n = Qf(En.prototype.request, t);
  return (
    v.extend(n, En.prototype, t, { allOwnKeys: !0 }),
    v.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (s) {
      return vp(On(e, s));
    }),
    n
  );
}
const fe = vp(ws);
fe.Axios = En;
fe.CanceledError = xs;
fe.CancelToken = Ky;
fe.isCancel = cp;
fe.VERSION = za;
fe.toFormData = Gi;
fe.AxiosError = b;
fe.Cancel = fe.CanceledError;
fe.all = function (t) {
  return Promise.all(t);
};
fe.spread = Yy;
fe.isAxiosError = Gy;
fe.mergeConfig = On;
fe.AxiosHeaders = Ae;
fe.formToJSON = (e) => up(v.isHTMLForm(e) ? new FormData(e) : e);
fe.getAdapter = mp.getAdapter;
fe.HttpStatusCode = Oo;
fe.default = fe;
const {
    Axios: Sx,
    AxiosError: jx,
    CanceledError: Nx,
    isCancel: kx,
    CancelToken: Ex,
    VERSION: Cx,
    all: Rx,
    Cancel: bx,
    isAxiosError: Px,
    spread: Tx,
    toFormData: _x,
    AxiosHeaders: Ox,
    HttpStatusCode: Lx,
    formToJSON: Ix,
    getAdapter: Ax,
    mergeConfig: Dx,
    create: zx,
  } = fe,
  ee = fe.create({ baseURL: "http://localhost:5000/api/" });
ee.interceptors.request.use((e) => {
  const t = localStorage.getItem("iq_token");
  return (t && (e.headers.Authorization = `Bearer ${t}`), e);
});
ee.interceptors.response.use(
  (e) => e,
  (e) => {
    var r, s;
    const t = ((r = e.config) == null ? void 0 : r.url) || "",
      n = /\/(login|register|forgot-password|reset-password)(\?|$)/.test(t);
    return (
      ((s = e.response) == null ? void 0 : s.status) === 401 &&
        !n &&
        (localStorage.removeItem("iq_token"), (window.location.href = "/auth")),
      Promise.reject(e)
    );
  },
);
const yp = w.createContext(null);
function Jy({ children: e }) {
  const [t, n] = w.useState(null),
    [r, s] = w.useState(() => localStorage.getItem("iq_token") || null),
    [i, l] = w.useState(!0);
  w.useEffect(() => {
    r
      ? ee
          .get("/auth/me")
          .then((f) => n(f.data))
          .catch(() => {
            (localStorage.removeItem("iq_token"), s(null));
          })
          .finally(() => l(!1))
      : l(!1);
  }, [r]);
  const a = (f, p) => {
      (localStorage.setItem("iq_token", f), s(f), n(p));
    },
    u = () => {
      (localStorage.removeItem("iq_token"), s(null), n(null));
    },
    d = async () => {
      const f = await ee.get("/auth/me");
      n(f.data);
    };
  return o.jsx(yp.Provider, {
    value: {
      user: t,
      token: r,
      loading: i,
      login: a,
      logout: u,
      refreshUser: d,
    },
    children: e,
  });
}
function xr() {
  const e = w.useContext(yp);
  if (!e) throw new Error("useAuth must be used within AuthProvider");
  return e;
}
const Xy = {
    heading: "Welcome back",
    subheading: "Sign in to continue your prep",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Your password",
    submitButton: "Sign in",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    registerLink: "Create one",
  },
  Zy = {
    heading: "Create your account",
    subheading: "Start preparing for your dream job",
    nameLabel: "Full name",
    namePlaceholder: "Aditya Jaiswal",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    phoneLabel: "Phone number (optional)",
    phonePlaceholder: "+91 98765 43210",
    passwordLabel: "Password",
    passwordPlaceholder: "Min. 6 characters",
    submitButton: "Create account",
    hasAccount: "Already have an account?",
    loginLink: "Sign in",
  },
  ew = {
    heading: "Reset your password",
    subheading: "Enter your email and we'll send you a one-time OTP",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    submitButton: "Send OTP",
    otpLabel: "OTP",
    otpPlaceholder: "Enter 6-digit code",
    newPasswordLabel: "New password",
    newPasswordPlaceholder: "Enter your new password",
    confirmButton: "Reset password",
    backToLogin: "Back to sign in",
    successMessage:
      "OTP sent successfully. Check your inbox and enter the code below.",
  },
  tw = {
    heading: "Set new password",
    subheading: "Choose a strong password for your account",
    passwordLabel: "New password",
    passwordPlaceholder: "Min. 6 characters",
    submitButton: "Update password",
    successMessage: "Password updated. You can now sign in.",
  },
  nw = {
    required: "This field is required",
    invalidEmail: "Enter a valid email address",
    passwordTooShort: "Password must be at least 6 characters",
    loginFailed: "Invalid email or password",
    genericError: "Something went wrong. Please try again.",
  },
  xe = {
    login: Xy,
    register: Zy,
    forgotPassword: ew,
    resetPassword: tw,
    errors: nw,
  };
function rw() {
  const [e, t] = w.useState("login"),
    [n, r] = w.useState({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
    }),
    [s, i] = w.useState(""),
    [l, a] = w.useState(!1),
    { login: u } = xr(),
    d = Ne(),
    f = xe[e],
    p = (j) => {
      (r({ ...n, [j.target.name]: j.target.value }), i(""));
    },
    g = async (j) => {
      var S, N;
      if ((j.preventDefault(), !n.email || !n.password)) {
        i(xe.errors.required);
        return;
      }
      if (e === "register" && !n.fullName) {
        i(xe.errors.required);
        return;
      }
      if (n.password.length < 6) {
        i(xe.errors.passwordTooShort);
        return;
      }
      a(!0);
      try {
        const c = e === "login" ? "/auth/login" : "/auth/register",
          m =
            e === "login"
              ? { email: n.email, password: n.password }
              : {
                  fullName: n.fullName,
                  email: n.email,
                  password: n.password,
                  phoneNumber: n.phoneNumber,
                },
          h = await ee.post(c, m);
        (u(h.data.token, h.data.user), d("/home"));
      } catch (c) {
        i(
          ((N = (S = c.response) == null ? void 0 : S.data) == null
            ? void 0
            : N.message) || xe.errors.genericError,
        );
      } finally {
        a(!1);
      }
    },
    y = () => {
      (t(e === "login" ? "register" : "login"),
        i(""),
        r({ fullName: "", email: "", password: "", phoneNumber: "" }));
    };
  return o.jsxs("div", {
    className: "auth-page",
    children: [
      o.jsxs("div", {
        className: "auth-left",
        children: [
          o.jsxs("div", {
            className: "auth-brand",
            children: [
              o.jsx("div", { className: "auth-logo", children: "IQ" }),
              o.jsx("h1", {
                className: "auth-brand-name",
                children: "InterviewIQ",
              }),
            ],
          }),
          o.jsxs("div", {
            className: "auth-tagline",
            children: [
              o.jsx("p", { children: "Practice smarter." }),
              o.jsx("p", { children: "Interview better." }),
            ],
          }),
          o.jsxs("ul", {
            className: "auth-features",
            children: [
              o.jsx("li", {
                children: "AI-powered mock interviews with real-time feedback",
              }),
              o.jsx("li", { children: "HR, Technical, and behavioral rounds" }),
              o.jsx("li", { children: "PPDT practice for SSB aspirants" }),
              o.jsx("li", {
                children: "Detailed performance reports after every session",
              }),
            ],
          }),
        ],
      }),
      o.jsx("div", {
        className: "auth-right",
        children: o.jsxs("div", {
          className: "auth-form-card",
          children: [
            o.jsx("h2", { className: "auth-heading", children: f.heading }),
            o.jsx("p", {
              className: "auth-subheading",
              children: f.subheading,
            }),
            s &&
              o.jsx("div", {
                className: "alert alert-error mt-16",
                children: s,
              }),
            o.jsxs("form", {
              onSubmit: g,
              className: "auth-form",
              noValidate: !0,
              children: [
                e === "register" &&
                  o.jsxs("div", {
                    className: "form-group",
                    children: [
                      o.jsx("label", {
                        className: "form-label",
                        children: f.nameLabel,
                      }),
                      o.jsx("input", {
                        className: "form-input",
                        type: "text",
                        name: "fullName",
                        placeholder: f.namePlaceholder,
                        value: n.fullName,
                        onChange: p,
                        autoComplete: "name",
                      }),
                    ],
                  }),
                o.jsxs("div", {
                  className: "form-group",
                  children: [
                    o.jsx("label", {
                      className: "form-label",
                      children: f.emailLabel,
                    }),
                    o.jsx("input", {
                      className: "form-input",
                      type: "email",
                      name: "email",
                      placeholder: f.emailPlaceholder,
                      value: n.email,
                      onChange: p,
                      autoComplete: "email",
                    }),
                  ],
                }),
                e === "register" &&
                  o.jsxs("div", {
                    className: "form-group",
                    children: [
                      o.jsx("label", {
                        className: "form-label",
                        children: f.phoneLabel,
                      }),
                      o.jsx("input", {
                        className: "form-input",
                        type: "tel",
                        name: "phoneNumber",
                        placeholder: f.phonePlaceholder,
                        value: n.phoneNumber,
                        onChange: p,
                      }),
                    ],
                  }),
                o.jsxs("div", {
                  className: "form-group",
                  children: [
                    o.jsxs("div", {
                      className: "flex justify-between items-center",
                      children: [
                        o.jsx("label", {
                          className: "form-label",
                          children: f.passwordLabel,
                        }),
                        e === "login" &&
                          o.jsx(qf, {
                            to: "/forgot-password",
                            className: "auth-forgot",
                            children: xe.login.forgotPassword,
                          }),
                      ],
                    }),
                    o.jsx("input", {
                      className: "form-input",
                      type: "password",
                      name: "password",
                      placeholder: f.passwordPlaceholder,
                      value: n.password,
                      onChange: p,
                      autoComplete:
                        e === "login" ? "current-password" : "new-password",
                    }),
                  ],
                }),
                o.jsx("button", {
                  type: "submit",
                  className: "btn btn-primary btn-lg btn-full mt-8",
                  disabled: l,
                  children: l
                    ? o.jsx("span", {
                        className: "spinner",
                        style: { borderTopColor: "#fff" },
                      })
                    : f.submitButton,
                }),
              ],
            }),
            o.jsxs("p", {
              className: "auth-switch",
              children: [
                e === "login" ? xe.login.noAccount : xe.register.hasAccount,
                " ",
                o.jsx("button", {
                  className: "auth-switch-btn",
                  onClick: y,
                  children:
                    e === "login"
                      ? xe.login.registerLink
                      : xe.register.loginLink,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function sw() {
  const e = Ne(),
    [t, n] = w.useState(""),
    [r, s] = w.useState(""),
    [i, l] = w.useState(""),
    [a, u] = w.useState(!1),
    [d, f] = w.useState(!1),
    [p, g] = w.useState(""),
    y = xe.forgotPassword,
    j = async (N) => {
      var c, m;
      if ((N.preventDefault(), !t)) {
        g(xe.errors.required);
        return;
      }
      f(!0);
      try {
        (await ee.post("/auth/forgot-password", { email: t }), u(!0), g(""));
      } catch (h) {
        g(
          ((m = (c = h.response) == null ? void 0 : c.data) == null
            ? void 0
            : m.message) || xe.errors.genericError,
        );
      } finally {
        f(!1);
      }
    },
    S = async (N) => {
      var c, m;
      if ((N.preventDefault(), !r || r.length !== 6)) {
        g("Please enter a valid 6-digit OTP");
        return;
      }
      if (!i || i.length < 6) {
        g(xe.errors.passwordTooShort);
        return;
      }
      f(!0);
      try {
        (await ee.post("/auth/reset-password-otp", {
          email: t,
          otp: r,
          newPassword: i,
        }),
          g(""),
          e("/auth", { replace: !0 }));
      } catch (h) {
        g(
          ((m = (c = h.response) == null ? void 0 : c.data) == null
            ? void 0
            : m.message) || xe.errors.genericError,
        );
      } finally {
        f(!1);
      }
    };
  return o.jsx("div", {
    style: {
      minHeight: "100vh",
      background: "var(--color-bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    },
    children: o.jsxs("div", {
      style: { width: "100%", maxWidth: 400 },
      children: [
        o.jsx("div", {
          style: { marginBottom: 8 },
          children: o.jsxs(qf, {
            to: "/auth",
            style: {
              fontSize: "0.875rem",
              color: "var(--color-primary)",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            },
            children: ["← ", y.backToLogin],
          }),
        }),
        o.jsxs("div", {
          className: "card mt-16",
          children: [
            o.jsx("h2", {
              style: {
                fontFamily: "var(--font-display)",
                fontSize: "1.375rem",
                fontWeight: 700,
                marginBottom: 6,
              },
              children: y.heading,
            }),
            o.jsx("p", {
              className: "body-text",
              style: { marginBottom: 24 },
              children: y.subheading,
            }),
            a
              ? o.jsxs("form", {
                  onSubmit: S,
                  style: { display: "flex", flexDirection: "column", gap: 16 },
                  children: [
                    o.jsx("div", {
                      className: "alert alert-success",
                      children: y.successMessage,
                    }),
                    p &&
                      o.jsx("div", {
                        className: "alert alert-error",
                        children: p,
                      }),
                    o.jsxs("div", {
                      className: "form-group",
                      children: [
                        o.jsx("label", {
                          className: "form-label",
                          children: y.otpLabel,
                        }),
                        o.jsx("input", {
                          className: "form-input",
                          type: "text",
                          inputMode: "numeric",
                          maxLength: 6,
                          placeholder: y.otpPlaceholder,
                          value: r,
                          onChange: (N) => {
                            (s(N.target.value.replace(/\D/g, "").slice(0, 6)),
                              g(""));
                          },
                        }),
                      ],
                    }),
                    o.jsxs("div", {
                      className: "form-group",
                      children: [
                        o.jsx("label", {
                          className: "form-label",
                          children: y.newPasswordLabel,
                        }),
                        o.jsx("input", {
                          className: "form-input",
                          type: "password",
                          placeholder: y.newPasswordPlaceholder,
                          value: i,
                          onChange: (N) => {
                            (l(N.target.value), g(""));
                          },
                        }),
                      ],
                    }),
                    o.jsx("button", {
                      type: "submit",
                      className: "btn btn-primary btn-full",
                      disabled: d,
                      children: d
                        ? o.jsx("span", {
                            className: "spinner",
                            style: { borderTopColor: "#fff" },
                          })
                        : y.confirmButton,
                    }),
                  ],
                })
              : o.jsxs("form", {
                  onSubmit: j,
                  style: { display: "flex", flexDirection: "column", gap: 16 },
                  children: [
                    p &&
                      o.jsx("div", {
                        className: "alert alert-error",
                        children: p,
                      }),
                    o.jsxs("div", {
                      className: "form-group",
                      children: [
                        o.jsx("label", {
                          className: "form-label",
                          children: y.emailLabel,
                        }),
                        o.jsx("input", {
                          className: "form-input",
                          type: "email",
                          placeholder: y.emailPlaceholder,
                          value: t,
                          onChange: (N) => {
                            (n(N.target.value), g(""));
                          },
                        }),
                      ],
                    }),
                    o.jsx("button", {
                      type: "submit",
                      className: "btn btn-primary btn-full",
                      disabled: d,
                      children: d
                        ? o.jsx("span", {
                            className: "spinner",
                            style: { borderTopColor: "#fff" },
                          })
                        : y.submitButton,
                    }),
                  ],
                }),
          ],
        }),
      ],
    }),
  });
}
function iw() {
  const { token: e } = Bf(),
    t = Ne(),
    [n, r] = w.useState(""),
    [s, i] = w.useState(!1),
    [l, a] = w.useState(!1),
    [u, d] = w.useState(""),
    f = xe.resetPassword,
    p = async (g) => {
      var y, j;
      if ((g.preventDefault(), !n || n.length < 6)) {
        d(xe.errors.passwordTooShort);
        return;
      }
      a(!0);
      try {
        (await ee.post(`/auth/reset-password/${e}`, { newPassword: n }),
          i(!0),
          setTimeout(() => t("/auth"), 2500));
      } catch (S) {
        d(
          ((j = (y = S.response) == null ? void 0 : y.data) == null
            ? void 0
            : j.message) || xe.errors.genericError,
        );
      } finally {
        a(!1);
      }
    };
  return o.jsx("div", {
    style: {
      minHeight: "100vh",
      background: "var(--color-bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    },
    children: o.jsx("div", {
      style: { width: "100%", maxWidth: 400 },
      children: o.jsxs("div", {
        className: "card",
        children: [
          o.jsx("h2", {
            style: {
              fontFamily: "var(--font-display)",
              fontSize: "1.375rem",
              fontWeight: 700,
              marginBottom: 6,
            },
            children: f.heading,
          }),
          o.jsx("p", {
            className: "body-text",
            style: { marginBottom: 24 },
            children: f.subheading,
          }),
          s
            ? o.jsx("div", {
                className: "alert alert-success",
                children: f.successMessage,
              })
            : o.jsxs("form", {
                onSubmit: p,
                style: { display: "flex", flexDirection: "column", gap: 16 },
                children: [
                  u &&
                    o.jsx("div", {
                      className: "alert alert-error",
                      children: u,
                    }),
                  o.jsxs("div", {
                    className: "form-group",
                    children: [
                      o.jsx("label", {
                        className: "form-label",
                        children: f.passwordLabel,
                      }),
                      o.jsx("input", {
                        className: "form-input",
                        type: "password",
                        placeholder: f.passwordPlaceholder,
                        value: n,
                        onChange: (g) => {
                          (r(g.target.value), d(""));
                        },
                        autoComplete: "new-password",
                      }),
                    ],
                  }),
                  o.jsx("button", {
                    type: "submit",
                    className: "btn btn-primary btn-full",
                    disabled: l,
                    children: l
                      ? o.jsx("span", {
                          className: "spinner",
                          style: { borderTopColor: "#fff" },
                        })
                      : f.submitButton,
                  }),
                ],
              }),
        ],
      }),
    }),
  });
}
function ut() {
  var u, d;
  const { user: e, logout: t } = xr(),
    n = Ne(),
    r = Tt(),
    [s, i] = w.useState(!1),
    l = () => {
      (t(), n("/auth"));
    },
    a = [
      { label: "Dashboard", path: "/home" },
      { label: "Interview", path: "/interview/setup" },
      { label: "PPDT", path: "/ppdt/setup" },
      { label: "Communication", path: "/communication" },
      { label: "History", path: "/interview/history" },
    ];
  return o.jsxs("nav", {
    className: "navbar",
    children: [
      o.jsxs("div", {
        className: "container navbar-inner",
        children: [
          o.jsxs("button", {
            className: "navbar-logo",
            onClick: () => n("/home"),
            children: [
              o.jsx("span", { className: "logo-icon", children: "IQ" }),
              o.jsx("span", {
                className: "logo-text",
                children: "InterviewIQ",
              }),
            ],
          }),
          o.jsx("div", {
            className: "navbar-links",
            children: a.map((f) =>
              o.jsx(
                "button",
                {
                  className: `navbar-link ${r.pathname.startsWith(f.path.split("/")[1] === "home" ? "/home" : `/${f.path.split("/")[1]}`) ? "active" : ""}`,
                  onClick: () => n(f.path),
                  children: f.label,
                },
                f.path,
              ),
            ),
          }),
          o.jsxs("div", {
            className: "navbar-user",
            children: [
              o.jsx("div", {
                className: "user-avatar",
                title: e == null ? void 0 : e.fullName,
                children:
                  e != null && e.profilePicture
                    ? o.jsx("img", { src: e.profilePicture, alt: e.fullName })
                    : o.jsx("span", {
                        children:
                          ((d =
                            (u = e == null ? void 0 : e.fullName) == null
                              ? void 0
                              : u[0]) == null
                            ? void 0
                            : d.toUpperCase()) || "U",
                      }),
              }),
              o.jsx("button", {
                className: "btn btn-ghost btn-sm",
                onClick: l,
                children: "Sign out",
              }),
            ],
          }),
          o.jsxs("button", {
            className: "navbar-hamburger",
            onClick: () => i(!s),
            "aria-label": "Toggle menu",
            children: [o.jsx("span", {}), o.jsx("span", {}), o.jsx("span", {})],
          }),
        ],
      }),
      s &&
        o.jsxs("div", {
          className: "navbar-mobile-menu",
          children: [
            a.map((f) =>
              o.jsx(
                "button",
                {
                  className: "mobile-nav-link",
                  onClick: () => {
                    (n(f.path), i(!1));
                  },
                  children: f.label,
                },
                f.path,
              ),
            ),
            o.jsx("button", {
              className: "mobile-nav-link",
              style: { color: "var(--color-error)" },
              onClick: l,
              children: "Sign out",
            }),
          ],
        }),
    ],
  });
}
const lw = "Good to see you",
  ow = "Pick a module and start practicing",
  aw = {
    interview: {
      title: "AI Interview",
      description:
        "Full mock interview with HR, Technical, and other rounds. Real-time feedback after every answer.",
      buttonText: "Start interview",
      tag: "Live",
    },
    ppdt: {
      title: "PPDT Practice",
      description:
        "SSB-style perception and description test. Observe an image, then narrate your story under time pressure.",
      buttonText: "Start PPDT",
      tag: "Live",
    },
    communication: {
      title: "Communication",
      description:
        "Practice real conversations with AI personas. Improve your spoken and written expression.",
      buttonText: "Start Communication",
      tag: "Live",
    },
    ats: {
      title: "ATS Resume Score",
      description:
        "See how your resume scores against your target role and get actionable suggestions.",
      badge: "Coming soon",
      buttonText: "Notify me",
    },
  },
  uw = {
    interviews: "Interviews done",
    ppdt: "PPDT sessions",
    avgScore: "Avg. score",
    bestScore: "Best score",
  },
  cw = "You're on the waitlist! We'll let you know when it launches.",
  dw = "You're already on the waitlist for this.",
  ne = {
    greeting: lw,
    subtitle: ow,
    tiles: aw,
    stats: uw,
    notifySuccess: cw,
    notifyAlready: dw,
  };
function fw() {
  var d;
  const { user: e } = xr(),
    t = Ne(),
    [n, r] = w.useState(""),
    [s, i] = w.useState(""),
    l = async (f) => {
      var p;
      r(f);
      try {
        (await ee.post("/waitlist", { feature: f }), i(ne.notifySuccess));
      } catch (g) {
        ((p = g.response) == null ? void 0 : p.status) === 409 &&
          i(ne.notifyAlready);
      } finally {
        (r(""), setTimeout(() => i(""), 4e3));
      }
    },
    a = (e == null ? void 0 : e.stats) || {},
    u = () => {
      const f = new Date().getHours();
      return f < 12
        ? "Good morning"
        : f < 17
          ? "Good afternoon"
          : "Good evening";
    };
  return o.jsxs("div", {
    className: "page-wrapper",
    children: [
      o.jsx(ut, {}),
      o.jsxs("div", {
        className: "container home-container",
        children: [
          o.jsx("div", {
            className: "home-header",
            children: o.jsxs("div", {
              children: [
                o.jsxs("h1", {
                  className: "display-heading",
                  children: [
                    u(),
                    ", ",
                    (d = e == null ? void 0 : e.fullName) == null
                      ? void 0
                      : d.split(" ")[0],
                    " 👋",
                  ],
                }),
                o.jsx("p", {
                  className: "body-text mt-8",
                  children: ne.subtitle,
                }),
              ],
            }),
          }),
          o.jsx("div", {
            className: "home-stats",
            children: [
              { label: ne.stats.interviews, value: a.totalInterviews ?? 0 },
              { label: ne.stats.ppdt, value: a.totalPPDTSessions ?? 0 },
              {
                label: ne.stats.avgScore,
                value: a.averageInterviewScore
                  ? `${a.averageInterviewScore}/10`
                  : "—",
              },
              {
                label: ne.stats.bestScore,
                value: a.bestInterviewScore
                  ? `${a.bestInterviewScore}/10`
                  : "—",
              },
            ].map((f) =>
              o.jsxs(
                "div",
                {
                  className: "stat-card card",
                  children: [
                    o.jsx("span", {
                      className: "stat-value",
                      children: f.value,
                    }),
                    o.jsx("span", {
                      className: "stat-label",
                      children: f.label,
                    }),
                  ],
                },
                f.label,
              ),
            ),
          }),
          s &&
            o.jsx("div", {
              className: "alert alert-success mt-16",
              children: s,
            }),
          o.jsxs("div", {
            className: "home-tiles",
            children: [
              o.jsxs("div", {
                className: "module-tile card",
                children: [
                  o.jsxs("div", {
                    className: "tile-header",
                    children: [
                      o.jsx("div", {
                        className: "tile-icon tile-icon-primary",
                        children: "🎙️",
                      }),
                      o.jsx("span", {
                        className: "badge badge-live",
                        children: ne.tiles.interview.tag,
                      }),
                    ],
                  }),
                  o.jsx("h3", {
                    className: "tile-title",
                    children: ne.tiles.interview.title,
                  }),
                  o.jsx("p", {
                    className: "tile-desc",
                    children: ne.tiles.interview.description,
                  }),
                  o.jsx("button", {
                    className: "btn btn-primary mt-20",
                    onClick: () => t("/interview/setup"),
                    children: ne.tiles.interview.buttonText,
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "module-tile card",
                children: [
                  o.jsxs("div", {
                    className: "tile-header",
                    children: [
                      o.jsx("div", {
                        className: "tile-icon tile-icon-secondary",
                        children: "🖼️",
                      }),
                      o.jsx("span", {
                        className: "badge badge-live",
                        children: ne.tiles.ppdt.tag,
                      }),
                    ],
                  }),
                  o.jsx("h3", {
                    className: "tile-title",
                    children: ne.tiles.ppdt.title,
                  }),
                  o.jsx("p", {
                    className: "tile-desc",
                    children: ne.tiles.ppdt.description,
                  }),
                  o.jsx("button", {
                    className: "btn btn-primary mt-20",
                    onClick: () => t("/ppdt/setup"),
                    children: ne.tiles.ppdt.buttonText,
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "module-tile card",
                children: [
                  o.jsxs("div", {
                    className: "tile-header",
                    children: [
                      o.jsx("div", {
                        className: "tile-icon tile-icon-secondary",
                        children: "💬",
                      }),
                      o.jsx("span", {
                        className: "badge badge-live",
                        children: ne.tiles.communication.tag,
                      }),
                    ],
                  }),
                  o.jsx("h3", {
                    className: "tile-title",
                    children: ne.tiles.communication.title,
                  }),
                  o.jsx("p", {
                    className: "tile-desc",
                    children: ne.tiles.communication.description,
                  }),
                  o.jsx("button", {
                    className: "btn btn-primary mt-20",
                    onClick: () => t("/communication"),
                    children: ne.tiles.communication.buttonText,
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "module-tile card tile-disabled",
                children: [
                  o.jsxs("div", {
                    className: "tile-header",
                    children: [
                      o.jsx("div", {
                        className: "tile-icon tile-icon-muted",
                        children: "📄",
                      }),
                      o.jsx("span", {
                        className: "badge badge-muted",
                        children: ne.tiles.ats.badge,
                      }),
                    ],
                  }),
                  o.jsx("h3", {
                    className: "tile-title",
                    children: ne.tiles.ats.title,
                  }),
                  o.jsx("p", {
                    className: "tile-desc",
                    children: ne.tiles.ats.description,
                  }),
                  o.jsx("button", {
                    className: "btn btn-ghost mt-20",
                    onClick: () => l("ats"),
                    disabled: n === "ats",
                    children:
                      n === "ats"
                        ? o.jsx("span", { className: "spinner" })
                        : ne.tiles.ats.buttonText,
                  }),
                ],
              }),
            ],
          }),
          o.jsx("div", {
            className: "home-quick mt-24",
            children: o.jsx("button", {
              className: "btn btn-ghost btn-sm",
              onClick: () => t("/interview/history"),
              children: "View past interviews →",
            }),
          }),
        ],
      }),
    ],
  });
}
function _l({
  tags: e = [],
  onChange: t,
  placeholder: n = "Add and press Enter",
}) {
  const [r, s] = w.useState(""),
    i = (a) => {
      if ((a.key === "Enter" || a.key === ",") && r.trim()) {
        a.preventDefault();
        const u = r.trim().replace(/,$/, "");
        (u && !e.includes(u) && t([...e, u]), s(""));
      }
      a.key === "Backspace" && !r && e.length > 0 && t(e.slice(0, -1));
    },
    l = (a) => {
      t(e.filter((u, d) => d !== a));
    };
  return o.jsxs("div", {
    style: {
      border: "1px solid var(--color-border)",
      borderRadius: "var(--radius-input)",
      padding: "8px 12px",
      background: "var(--color-card)",
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      cursor: "text",
    },
    onClick: (a) => {
      var u;
      return (u = a.currentTarget.querySelector("input")) == null
        ? void 0
        : u.focus();
    },
    children: [
      e.map((a, u) =>
        o.jsxs(
          "span",
          {
            className: "tag",
            children: [
              a,
              o.jsx("button", {
                className: "tag-remove",
                onClick: () => l(u),
                type: "button",
                children: "×",
              }),
            ],
          },
          u,
        ),
      ),
      o.jsx("input", {
        type: "text",
        value: r,
        onChange: (a) => s(a.target.value),
        onKeyDown: i,
        placeholder: e.length === 0 ? n : "",
        style: {
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "0.9375rem",
          color: "var(--color-text-primary)",
          minWidth: "120px",
          flex: 1,
        },
      }),
    ],
  });
}
const pw = "Set up your interview",
  hw = { profile: "Profile", rounds: "Rounds", review: "Review" },
  mw = {
    reason: "I'm preparing for",
    targetRole: "Target role",
    targetRolePlaceholder: "e.g. Software Engineer",
    targetCompany: "Target company",
    targetCompanyPlaceholder: "e.g. Google (optional)",
    skills: "Your skills",
    skillsPlaceholder: "Add a skill and press Enter",
    techStack: "Tech stack",
    techStackPlaceholder: "Add a technology and press Enter",
    projects: "Projects",
    projectsPlaceholder: "Add a project name and press Enter",
    difficulty: "Difficulty level",
    additionalMessage: "Anything else to know?",
    additionalMessagePlaceholder:
      "Share context that might help the AI interviewer (optional)",
    rounds: "Interview rounds",
    roundsHelp: "Drag to reorder. At least one round required.",
    roundDurationUnit: "min",
  },
  gw = [
    { value: "internship", label: "An internship" },
    { value: "placement", label: "Campus placement" },
    { value: "other", label: "Something else" },
  ],
  vw = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
    "DevOps Engineer",
    "Cloud Engineer",
  ],
  yw = [
    {
      value: "Beginner",
      label: "Beginner",
      hint: "Fundamental questions, slower pace",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
      hint: "Standard industry-level questions",
    },
    {
      value: "Advanced",
      label: "Advanced",
      hint: "Senior-level depth and cross-cutting topics",
    },
  ],
  ww = [
    {
      value: "hr",
      label: "HR Round",
      description: "Behavioural and culture-fit questions",
    },
    {
      value: "technical",
      label: "Technical Round",
      description: "Coding, system design, domain knowledge",
    },
    {
      value: "other",
      label: "Other Round",
      description: "Managerial, case study, or custom",
    },
  ],
  xw = { next: "Continue", back: "Back", start: "Start interview" },
  Sw = "Your saved profiles",
  jw = "Use this profile",
  W = {
    heading: pw,
    steps: hw,
    labels: mw,
    reasonOptions: gw,
    roleOptions: vw,
    difficultyOptions: yw,
    roundOptions: ww,
    buttons: xw,
    savedProfiles: Sw,
    useProfile: jw,
  },
  Nw = {
    label: "",
    reason: "placement",
    targetRole: "",
    targetCompany: "",
    skills: [],
    techStack: [],
    projects: [],
    difficulty: "Intermediate",
    rounds: [
      { roundType: "hr", durationMinutes: 5 },
      { roundType: "technical", durationMinutes: 5 },
    ],
    additionalMessage: "",
    isDefault: !1,
  };
function kw() {
  var N;
  const e = Ne(),
    [t, n] = w.useState(1),
    [r, s] = w.useState(Nw),
    [i, l] = w.useState([]),
    [a, u] = w.useState(!1),
    [d, f] = w.useState("");
  w.useEffect(() => {
    ee.get("/interview-profiles")
      .then((c) => l(c.data))
      .catch(() => {});
  }, []);
  const p = (c, m) => s((h) => ({ ...h, [c]: m })),
    g = (c) => {
      const m = r.rounds;
      if (m.some((x) => x.roundType === c)) {
        if (m.length === 1) return;
        p(
          "rounds",
          m.filter((x) => x.roundType !== c),
        );
      } else p("rounds", [...m, { roundType: c, durationMinutes: 5 }]);
    },
    y = (c, m) => {
      const h = Math.min(60, Math.max(1, Number(m) || 1));
      p(
        "rounds",
        r.rounds.map((x) =>
          x.roundType === c ? { ...x, durationMinutes: h } : x,
        ),
      );
    },
    j = (c) => {
      (s({
        label: c.label,
        reason: c.reason,
        targetRole: c.targetRole,
        targetCompany: c.targetCompany || "",
        skills: c.skills || [],
        techStack: c.techStack || [],
        projects: c.projects || [],
        difficulty: c.difficulty,
        rounds: c.rounds,
        additionalMessage: c.additionalMessage || "",
        isDefault: !1,
      }),
        n(3));
    },
    S = async () => {
      var c, m;
      if (!r.targetRole) {
        f("Target role is required");
        return;
      }
      (u(!0), f(""));
      try {
        const x = (
            await ee.post("/interview-profiles", {
              label:
                r.label ||
                `${r.targetRole} — ${new Date().toLocaleDateString()}`,
              reason: r.reason,
              targetRole: r.targetRole,
              targetCompany: r.targetCompany,
              skills: r.skills,
              techStack: r.techStack,
              projects: r.projects,
              difficulty: r.difficulty,
              rounds: r.rounds,
              additionalMessage: r.additionalMessage,
              isDefault: r.isDefault,
            })
          ).data._id,
          k = await ee.post("/interview/session", {
            action: "start",
            profileId: x,
          });
        e("/interview/live", {
          state: {
            sessionId: k.data.sessionId,
            profileId: x,
            firstQuestion: k.data.question,
            currentRound: k.data.currentRound,
            currentRoundIndex: k.data.currentRoundIndex,
            totalRounds: k.data.totalRounds,
            roundDurationMinutes: k.data.roundDurationMinutes,
            rounds: r.rounds,
            targetRole: r.targetRole,
            targetCompany: r.targetCompany,
            difficulty: r.difficulty,
          },
        });
      } catch (h) {
        f(
          ((m = (c = h.response) == null ? void 0 : c.data) == null
            ? void 0
            : m.message) || "Failed to start interview",
        );
      } finally {
        u(!1);
      }
    };
  return o.jsxs("div", {
    className: "page-wrapper",
    children: [
      o.jsx(ut, {}),
      o.jsxs("div", {
        className: "container setup-container",
        children: [
          o.jsx("div", {
            className: "setup-steps",
            children: [W.steps.profile, W.steps.rounds, W.steps.review].map(
              (c, m) =>
                o.jsxs(
                  "div",
                  {
                    className: `setup-step ${t === m + 1 ? "active" : ""} ${t > m + 1 ? "done" : ""}`,
                    children: [
                      o.jsx("div", {
                        className: "step-dot",
                        children: t > m + 1 ? "✓" : m + 1,
                      }),
                      o.jsx("span", { children: c }),
                    ],
                  },
                  c,
                ),
            ),
          }),
          o.jsxs("div", {
            className: "setup-layout",
            children: [
              o.jsxs("div", {
                className: "setup-main",
                children: [
                  t === 1 &&
                    o.jsxs("div", {
                      className: "card",
                      children: [
                        o.jsx("h2", {
                          className: "section-heading mb-24",
                          children: W.heading,
                        }),
                        o.jsxs("div", {
                          className: "setup-fields",
                          children: [
                            o.jsxs("div", {
                              className: "form-group",
                              children: [
                                o.jsx("label", {
                                  className: "form-label",
                                  children: W.labels.reason,
                                }),
                                o.jsx("div", {
                                  className: "reason-options",
                                  children: W.reasonOptions.map((c) =>
                                    o.jsxs(
                                      "label",
                                      {
                                        className: `reason-option ${r.reason === c.value ? "selected" : ""}`,
                                        children: [
                                          o.jsx("input", {
                                            type: "radio",
                                            name: "reason",
                                            value: c.value,
                                            checked: r.reason === c.value,
                                            onChange: () =>
                                              p("reason", c.value),
                                          }),
                                          c.label,
                                        ],
                                      },
                                      c.value,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                            o.jsxs("div", {
                              className: "form-group",
                              children: [
                                o.jsx("label", {
                                  className: "form-label",
                                  children: W.labels.targetRole,
                                }),
                                o.jsx("input", {
                                  className: "form-input",
                                  list: "role-options",
                                  placeholder: W.labels.targetRolePlaceholder,
                                  value: r.targetRole,
                                  onChange: (c) =>
                                    p("targetRole", c.target.value),
                                }),
                                o.jsx("datalist", {
                                  id: "role-options",
                                  children: W.roleOptions.map((c) =>
                                    o.jsx("option", { value: c }, c),
                                  ),
                                }),
                              ],
                            }),
                            o.jsxs("div", {
                              className: "form-group",
                              children: [
                                o.jsx("label", {
                                  className: "form-label",
                                  children: W.labels.targetCompany,
                                }),
                                o.jsx("input", {
                                  className: "form-input",
                                  placeholder:
                                    W.labels.targetCompanyPlaceholder,
                                  value: r.targetCompany,
                                  onChange: (c) =>
                                    p("targetCompany", c.target.value),
                                }),
                              ],
                            }),
                            o.jsxs("div", {
                              className: "form-group",
                              children: [
                                o.jsx("label", {
                                  className: "form-label",
                                  children: W.labels.skills,
                                }),
                                o.jsx(_l, {
                                  tags: r.skills,
                                  onChange: (c) => p("skills", c),
                                  placeholder: W.labels.skillsPlaceholder,
                                }),
                              ],
                            }),
                            o.jsxs("div", {
                              className: "form-group",
                              children: [
                                o.jsx("label", {
                                  className: "form-label",
                                  children: W.labels.techStack,
                                }),
                                o.jsx(_l, {
                                  tags: r.techStack,
                                  onChange: (c) => p("techStack", c),
                                  placeholder: W.labels.techStackPlaceholder,
                                }),
                              ],
                            }),
                            o.jsxs("div", {
                              className: "form-group",
                              children: [
                                o.jsx("label", {
                                  className: "form-label",
                                  children: W.labels.projects,
                                }),
                                o.jsx(_l, {
                                  tags: r.projects,
                                  onChange: (c) => p("projects", c),
                                  placeholder: W.labels.projectsPlaceholder,
                                }),
                              ],
                            }),
                            o.jsxs("div", {
                              className: "form-group",
                              children: [
                                o.jsx("label", {
                                  className: "form-label",
                                  children: W.labels.additionalMessage,
                                }),
                                o.jsx("textarea", {
                                  className: "form-textarea",
                                  placeholder:
                                    W.labels.additionalMessagePlaceholder,
                                  value: r.additionalMessage,
                                  onChange: (c) =>
                                    p("additionalMessage", c.target.value),
                                  rows: 3,
                                }),
                              ],
                            }),
                          ],
                        }),
                        o.jsxs("div", {
                          className: "setup-actions",
                          children: [
                            o.jsx("button", {
                              className: "btn btn-primary",
                              onClick: () => {
                                if (!r.targetRole) {
                                  f("Target role is required");
                                  return;
                                }
                                (f(""), n(2));
                              },
                              children: W.buttons.next,
                            }),
                            d &&
                              o.jsx("span", {
                                className: "form-error",
                                children: d,
                              }),
                          ],
                        }),
                      ],
                    }),
                  t === 2 &&
                    o.jsxs("div", {
                      className: "card",
                      children: [
                        o.jsx("h2", {
                          className: "section-heading mb-8",
                          children: W.labels.rounds,
                        }),
                        o.jsx("p", {
                          className: "body-text mb-24",
                          children: W.labels.roundsHelp,
                        }),
                        o.jsx("div", {
                          className: "rounds-list",
                          children: W.roundOptions.map((c) => {
                            const m = r.rounds.find(
                              (h) => h.roundType === c.value,
                            );
                            return o.jsxs(
                              "label",
                              {
                                className: `round-option ${m ? "selected" : ""}`,
                                children: [
                                  o.jsx("input", {
                                    type: "checkbox",
                                    checked: !!m,
                                    onChange: () => g(c.value),
                                  }),
                                  o.jsxs("div", {
                                    children: [
                                      o.jsx("div", {
                                        className: "round-option-label",
                                        children: c.label,
                                      }),
                                      o.jsx("div", {
                                        className: "round-option-desc",
                                        children: c.description,
                                      }),
                                    ],
                                  }),
                                  m &&
                                    o.jsxs("div", {
                                      className: "round-duration-input",
                                      onClick: (h) => h.preventDefault(),
                                      children: [
                                        o.jsx("input", {
                                          type: "number",
                                          min: 1,
                                          max: 60,
                                          value: m.durationMinutes,
                                          onChange: (h) =>
                                            y(c.value, h.target.value),
                                        }),
                                        o.jsx("span", {
                                          children: W.labels.roundDurationUnit,
                                        }),
                                      ],
                                    }),
                                ],
                              },
                              c.value,
                            );
                          }),
                        }),
                        o.jsxs("div", {
                          className: "form-group mt-24",
                          children: [
                            o.jsx("label", {
                              className: "form-label",
                              children: W.labels.difficulty,
                            }),
                            o.jsx("div", {
                              className: "difficulty-options",
                              children: W.difficultyOptions.map((c) =>
                                o.jsxs(
                                  "label",
                                  {
                                    className: `difficulty-option ${r.difficulty === c.value ? "selected" : ""}`,
                                    children: [
                                      o.jsx("input", {
                                        type: "radio",
                                        name: "difficulty",
                                        value: c.value,
                                        checked: r.difficulty === c.value,
                                        onChange: () =>
                                          p("difficulty", c.value),
                                      }),
                                      o.jsx("span", {
                                        className: "diff-label",
                                        children: c.label,
                                      }),
                                      o.jsx("span", {
                                        className: "diff-hint",
                                        children: c.hint,
                                      }),
                                    ],
                                  },
                                  c.value,
                                ),
                              ),
                            }),
                          ],
                        }),
                        o.jsxs("div", {
                          className: "setup-actions",
                          children: [
                            o.jsx("button", {
                              className: "btn btn-ghost",
                              onClick: () => n(1),
                              children: W.buttons.back,
                            }),
                            o.jsx("button", {
                              className: "btn btn-primary",
                              onClick: () => n(3),
                              children: W.buttons.next,
                            }),
                          ],
                        }),
                      ],
                    }),
                  t === 3 &&
                    o.jsxs("div", {
                      className: "card",
                      children: [
                        o.jsx("h2", {
                          className: "section-heading mb-24",
                          children: "Review & start",
                        }),
                        o.jsxs("div", {
                          className: "review-rows",
                          children: [
                            o.jsx(Fn, { label: "Role", value: r.targetRole }),
                            r.targetCompany &&
                              o.jsx(Fn, {
                                label: "Company",
                                value: r.targetCompany,
                              }),
                            o.jsx(Fn, {
                              label: "Reason",
                              value:
                                (N = W.reasonOptions.find(
                                  (c) => c.value === r.reason,
                                )) == null
                                  ? void 0
                                  : N.label,
                            }),
                            o.jsx(Fn, {
                              label: "Difficulty",
                              value: r.difficulty,
                            }),
                            o.jsx(Fn, {
                              label: "Rounds",
                              value: r.rounds
                                .map((c) => {
                                  var h;
                                  return `${(h = W.roundOptions.find((x) => x.value === c.roundType)) == null ? void 0 : h.label} (${c.durationMinutes} min)`;
                                })
                                .join(" → "),
                            }),
                            r.skills.length > 0 &&
                              o.jsx(Fn, {
                                label: "Skills",
                                value: r.skills.join(", "),
                              }),
                          ],
                        }),
                        d &&
                          o.jsx("div", {
                            className: "alert alert-error mt-16",
                            children: d,
                          }),
                        o.jsxs("div", {
                          className: "setup-actions mt-24",
                          children: [
                            o.jsx("button", {
                              className: "btn btn-ghost",
                              onClick: () => n(2),
                              children: W.buttons.back,
                            }),
                            o.jsx("button", {
                              className: "btn btn-primary btn-lg",
                              onClick: S,
                              disabled: a,
                              children: a
                                ? o.jsx("span", {
                                    className: "spinner",
                                    style: { borderTopColor: "#fff" },
                                  })
                                : W.buttons.start,
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
              i.length > 0 &&
                t !== 3 &&
                o.jsx("div", {
                  className: "setup-sidebar",
                  children: o.jsxs("div", {
                    className: "card",
                    children: [
                      o.jsx("h3", {
                        className: "section-heading mb-16",
                        style: { fontSize: "1rem" },
                        children: W.savedProfiles,
                      }),
                      o.jsx("div", {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          gap: 12,
                        },
                        children: i
                          .slice(0, 5)
                          .map((c) =>
                            o.jsxs(
                              "div",
                              {
                                className: "saved-profile-item",
                                children: [
                                  o.jsxs("div", {
                                    children: [
                                      o.jsx("div", {
                                        style: {
                                          fontWeight: 500,
                                          fontSize: "0.9rem",
                                        },
                                        children: c.label,
                                      }),
                                      o.jsxs("div", {
                                        style: {
                                          fontSize: "0.8125rem",
                                          color: "var(--color-text-secondary)",
                                        },
                                        children: [
                                          c.targetRole,
                                          " · ",
                                          c.difficulty,
                                        ],
                                      }),
                                    ],
                                  }),
                                  o.jsx("button", {
                                    className: "btn btn-secondary btn-sm",
                                    onClick: () => j(c),
                                    children: W.useProfile,
                                  }),
                                ],
                              },
                              c._id,
                            ),
                          ),
                      }),
                    ],
                  }),
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Fn({ label: e, value: t }) {
  return o.jsxs("div", {
    className: "review-row",
    children: [
      o.jsx("span", { className: "review-label", children: e }),
      o.jsx("span", { className: "review-value", children: t }),
    ],
  });
}
const Ew = {
    hr: "HR Round",
    technical: "Technical Round",
    other: "Other Round",
  },
  Cw = {
    aiSpeaking: "AI is speaking...",
    listening: "Listening to you...",
    processing: "Processing your answer...",
    waitingForAnswer: "Your turn to answer",
    roundComplete: "Round complete",
    interviewComplete: "Interview complete",
  },
  Rw = { aiLabel: "InterviewIQ", youLabel: "You" },
  bw = {
    startAnswering: "Start answering",
    stopAnswering: "Done answering",
    submitAnswer: "Submit answer",
    nextRound: "Next round",
    finishInterview: "Finish interview",
    skipQuestion: "Skip question",
  },
  Pw = {
    voiceHint: "Speak clearly — your answer is being transcribed in real time",
    roundTransition: "Moving to the next round...",
    retryHint: "That answer was brief. Try to elaborate more.",
    timerWarning: "Round is about to wrap up",
  },
  Tw = { elapsed: "Elapsed", roundTime: "Round time" },
  _w = "AI Interviewer",
  Ow = "Your camera",
  Lw = "Camera not available",
  Iw = "Microphone access is needed to answer questions",
  st = {
    roundLabels: Ew,
    status: Cw,
    conversationLabels: Rw,
    controls: bw,
    hints: Pw,
    timer: Tw,
    avatarAlt: _w,
    cameraLabel: Ow,
    cameraError: Lw,
    micError: Iw,
  },
  Aw = "/assets/interviewer-BPP_2qpx.jpg";
function Dw() {
  var Ht, Ua;
  const e = Ne(),
    n = Tt().state;
  w.useEffect(() => {
    (n != null && n.sessionId) || e("/interview/setup", { replace: !0 });
  }, [e, n == null ? void 0 : n.sessionId]);
  const {
      sessionId: r,
      firstQuestion: s,
      currentRound: i,
      currentRoundIndex: l,
      rounds: a = [],
    } = n || {},
    [u, d] = w.useState(s || ""),
    [f, p] = w.useState(i || "hr"),
    [g, y] = w.useState(l || 0),
    [j, S] = w.useState("waitingForAnswer"),
    [N, c] = w.useState(""),
    [m, h] = w.useState([{ role: "ai", text: s || "" }]),
    [x, k] = w.useState(0),
    [C, R] = w.useState(0),
    [T, H] = w.useState(!1),
    [O, U] = w.useState(!1),
    [pe, M] = w.useState(""),
    [V, le] = w.useState(""),
    [oe, He] = w.useState(null),
    [P, I] = w.useState(!1),
    L = (((Ht = a[g]) == null ? void 0 : Ht.durationMinutes) || 5) * 60,
    D = w.useRef(!1),
    Q = w.useRef(null),
    ze = w.useRef(null),
    ke = w.useRef(""),
    _t = w.useRef(null),
    F = w.useRef(null),
    te = w.useRef(window.speechSynthesis),
    An = w.useRef(null),
    Sr = w.useRef(null),
    Xi = w.useRef(document.createElement("canvas"));
  (w.useEffect(
    () => (
      (_t.current = setInterval(() => k((A) => A + 1), 1e3)),
      () => clearInterval(_t.current)
    ),
    [],
  ),
    w.useEffect(
      () => (
        (F.current = setInterval(() => R((A) => A + 1), 1e3)),
        () => clearInterval(F.current)
      ),
      [f],
    ));
  const Ss = async () => {
    const A = Q.current;
    if (!A || A.readyState !== 4) return;
    const $ = Xi.current;
    (($.width = A.videoWidth), ($.height = A.videoHeight));
    const G = $.getContext("2d");
    G &&
      (G.drawImage(A, 0, 0),
      $.toBlob(async (Pe) => {
        if (Pe)
          try {
            const ue = new FormData();
            ue.append("image", Pe, "frame.jpg");
            const Wt = await (
              await fetch("http://localhost:5000/api/face-detect", {
                method: "POST",
                body: ue,
              })
            ).json();
            Wt != null && Wt.emotion && le(Wt.emotion);
          } catch (ue) {
            console.error("Face Detect Error:", ue);
          }
      }, "image/jpeg"));
  };
  w.useEffect(() => {
    let A;
    return (
      (async () => {
        try {
          ((A = await navigator.mediaDevices.getUserMedia({
            video: !0,
            audio: !1,
          })),
            Q.current && (Q.current.srcObject = A),
            (Sr.current = setInterval(() => {
              Ss();
            }, 1e3)));
        } catch (G) {
          console.error(G);
        }
      })(),
      () => {
        (clearInterval(Sr.current),
          A == null || A.getTracks().forEach((G) => G.stop()));
      }
    );
  }, []);
  const me = w.useCallback((A) => {
    if (!te.current) return;
    te.current.cancel();
    const $ = new SpeechSynthesisUtterance(A);
    (($.rate = 0.95),
      ($.pitch = 1),
      ($.onstart = () => S("aiSpeaking")),
      ($.onend = () => S("waitingForAnswer")),
      te.current.speak($));
  }, []);
  (w.useEffect(() => {
    s && me(s);
  }, [s, me]),
    w.useEffect(() => {
      var A;
      (A = An.current) == null || A.scrollIntoView({ behavior: "smooth" });
    }, [m]));
  const js = () => {
      const A = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!A) {
        M(st.micError);
        return;
      }
      const $ = new A();
      (($.continuous = !0),
        ($.interimResults = !0),
        ($.lang = "en-IN"),
        (ke.current = ""),
        ($.onresult = (G) => {
          let Pe = "";
          for (let ue = G.resultIndex; ue < G.results.length; ue++) {
            const rt = G.results[ue][0].transcript;
            G.results[ue].isFinal ? (ke.current += rt + " ") : (Pe += rt);
          }
          c((ke.current + " " + Pe).trim());
        }),
        ($.onerror = (G) => {
          G.error !== "no-speech" && M("Microphone error: " + G.error);
        }),
        $.start(),
        (ze.current = $),
        S("listening"),
        c(""));
    },
    mn = () => {
      var A;
      ((A = ze.current) == null || A.stop(), S("waitingForAnswer"));
    },
    ft = async () => {
      var $, G, Pe;
      const A = N.trim();
      if (A) {
        (mn(),
          S("processing"),
          U(!0),
          h((ue) => [...ue, { role: "user", text: A }]),
          c(""));
        try {
          const ue = await ee.post("/interview/session", {
            action: "answer",
            sessionId: r,
            answer: A,
          });
          ($ = ue.data) != null && $.evaluation && He(ue.data.evaluation);
          const {
            nextQuestion: rt,
            interviewComplete: Wt,
            roundComplete: Ns,
            currentRound: ks,
            currentRoundIndex: gn,
          } = ue.data;
          if (Wt) {
            H(!0);
            const Ge =
              "That concludes our interview. Thank you for your time! I'll now prepare your detailed feedback report.";
            (h((Nr) => [...Nr, { role: "ai", text: Ge }]),
              me(Ge),
              S("interviewComplete"));
          } else {
            if (Ns) {
              const Ge = `Great work on the ${st.roundLabels[f]} round. Let's move on to the ${st.roundLabels[ks]} round.`;
              (h((Nr) => [...Nr, { role: "ai", text: Ge }]),
                p(ks),
                y(gn),
                R(0),
                (D.current = !1),
                me(Ge),
                setTimeout(() => {
                  (d(rt), h((Nr) => [...Nr, { role: "ai", text: rt }]), me(rt));
                }, 3e3));
            } else
              (d(rt), h((Ge) => [...Ge, { role: "ai", text: rt }]), me(rt));
            S("waitingForAnswer");
          }
        } catch (ue) {
          (M(
            ((Pe = (G = ue.response) == null ? void 0 : G.data) == null
              ? void 0
              : Pe.message) || "Failed to submit answer",
          ),
            S("waitingForAnswer"));
        } finally {
          U(!1);
        }
      }
    },
    z = async () => {
      var A, $, G;
      (U(!0), (A = te.current) == null || A.cancel());
      try {
        const Pe = await ee.post("/interview/session", {
          action: "finish",
          sessionId: r,
          durationSeconds: x,
        });
        e("/interview/result", { state: { record: Pe.data.record } });
      } catch (Pe) {
        M(
          ((G = ($ = Pe.response) == null ? void 0 : $.data) == null
            ? void 0
            : G.message) || "Failed to finish interview",
        );
      } finally {
        U(!1);
      }
    },
    Fe = async () => {
      var A, $, G;
      (ze.current && mn(),
        (A = te.current) == null || A.cancel(),
        S("processing"),
        U(!0));
      try {
        const Pe = await ee.post("/interview/session", {
            action: "timeout",
            sessionId: r,
          }),
          {
            nextQuestion: ue,
            interviewComplete: rt,
            roundComplete: Wt,
            currentRound: Ns,
            currentRoundIndex: ks,
          } = Pe.data;
        if (rt) {
          H(!0);
          const gn =
            "That's time! That concludes our interview. Thank you for your time! I'll now prepare your detailed feedback report.";
          (h((Ge) => [...Ge, { role: "ai", text: gn }]),
            me(gn),
            S("interviewComplete"));
        } else if (Wt) {
          const gn = `Time's up for the ${st.roundLabels[f]} round. Let's move on to the ${st.roundLabels[Ns]} round.`;
          (h((Ge) => [...Ge, { role: "ai", text: gn }]),
            p(Ns),
            y(ks),
            R(0),
            (D.current = !1),
            me(gn),
            setTimeout(() => {
              (d(ue), h((Ge) => [...Ge, { role: "ai", text: ue }]), me(ue));
            }, 3e3),
            S("waitingForAnswer"));
        }
      } catch (Pe) {
        (M(
          ((G = ($ = Pe.response) == null ? void 0 : $.data) == null
            ? void 0
            : G.message) || "Failed to move on from round",
        ),
          S("waitingForAnswer"));
      } finally {
        U(!1);
      }
    };
  w.useEffect(() => {
    T || O || (C >= L && !D.current && ((D.current = !0), Fe()));
  }, [C, L, T, O]);
  const St = C >= L - 30 && !T,
    jt = (A) => {
      const $ = Math.floor(A / 60)
          .toString()
          .padStart(2, "0"),
        G = (A % 60).toString().padStart(2, "0");
      return `${$}:${G}`;
    },
    jr = Object.entries((oe == null ? void 0 : oe.scores) || {}),
    Zi =
      ((Ua = oe == null ? void 0 : oe.scores) == null ? void 0 : Ua.overall) ??
      "—";
  return n != null && n.sessionId
    ? o.jsxs("div", {
        className: "live-page",
        children: [
          o.jsxs("div", {
            className: "live-topbar",
            children: [
              o.jsxs("div", {
                className: "live-topbar-left",
                children: [
                  o.jsx("div", { className: "live-logo", children: "IQ" }),
                  o.jsx("span", {
                    className: "live-title",
                    children: "InterviewIQ",
                  }),
                ],
              }),
              o.jsx("div", {
                className: "live-round-indicator",
                children: a.map((A, $) =>
                  o.jsx(
                    "div",
                    {
                      className: `round-pill ${$ === g ? "active" : ""} ${$ < g ? "done" : ""}`,
                      children: st.roundLabels[A.roundType],
                    },
                    A.roundType,
                  ),
                ),
              }),
              o.jsxs("div", {
                className: "live-timer",
                children: [
                  o.jsx("span", {
                    className: "timer-label",
                    children: st.timer.elapsed,
                  }),
                  o.jsx("span", { className: "timer-value", children: jt(x) }),
                ],
              }),
              o.jsxs("div", {
                className: "live-timer",
                children: [
                  o.jsx("span", {
                    className: "timer-label",
                    children: st.timer.roundTime,
                  }),
                  o.jsx("span", {
                    className: `timer-value ${St ? "timer-warning" : ""}`,
                    children: jt(Math.max(0, L - C)),
                  }),
                ],
              }),
            ],
          }),
          o.jsxs("div", {
            className: "live-main",
            children: [
              o.jsxs("div", {
                className: "live-left",
                children: [
                  o.jsxs("div", {
                    className: "live-screen-stack",
                    children: [
                      o.jsxs("div", {
                        className: "screen-card card interviewer-panel",
                        children: [
                          o.jsxs("div", {
                            className: "screen-header",
                            children: [
                              o.jsx("span", {
                                className: "screen-tag",
                                children: "Interviewer",
                              }),
                              o.jsx("span", {
                                className: "screen-status",
                                children:
                                  j === "listening"
                                    ? "Listening"
                                    : j === "processing"
                                      ? "Reviewing"
                                      : "Ready",
                              }),
                            ],
                          }),
                          o.jsx("div", {
                            className: "interviewer-body",
                            children: o.jsxs("div", {
                              className: `interviewer-portrait ${P ? "fallback-active" : ""}`,
                              children: [
                                o.jsx("img", {
                                  src: Aw,
                                  alt: "Interviewer",
                                  onLoad: () => I(!1),
                                  onError: () => I(!0),
                                }),
                                o.jsx("div", {
                                  className: "interviewer-bubble",
                                  children: o.jsx("p", { children: u }),
                                }),
                                o.jsx("div", {
                                  className: "portrait-fallback",
                                  children: "AI",
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      o.jsxs("div", {
                        className: "screen-card card user-panel",
                        children: [
                          o.jsxs("div", {
                            className: "screen-header",
                            children: [
                              o.jsx("span", {
                                className: "screen-tag",
                                children: "User Screen",
                              }),
                              o.jsx("span", {
                                className: "screen-status",
                                children:
                                  j === "listening" ? "Recording" : "Live",
                              }),
                            ],
                          }),
                          o.jsxs("div", {
                            className: "camera-wrap user-camera-wrap",
                            children: [
                              o.jsx("video", {
                                ref: Q,
                                autoPlay: !0,
                                muted: !0,
                                playsInline: !0,
                                className: "camera-video",
                              }),
                              o.jsx("div", {
                                className: "user-live-subtitle",
                                children:
                                  N || "Your live answer will appear here...",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  o.jsx("div", {
                    className: "live-controls",
                    children: T
                      ? o.jsx("button", {
                          className: "btn btn-primary btn-lg",
                          onClick: z,
                          disabled: O,
                          children: O
                            ? o.jsx("span", {
                                className: "spinner",
                                style: { borderTopColor: "#fff" },
                              })
                            : "View my results →",
                        })
                      : o.jsxs(o.Fragment, {
                          children: [
                            j === "listening"
                              ? o.jsxs("button", {
                                  className: "btn btn-danger btn-lg",
                                  onClick: mn,
                                  children: [
                                    o.jsx("span", { className: "pulse-dot" }),
                                    st.controls.stopAnswering,
                                  ],
                                })
                              : o.jsx("button", {
                                  className: "btn btn-primary btn-lg",
                                  onClick: js,
                                  disabled:
                                    j === "aiSpeaking" ||
                                    j === "processing" ||
                                    O,
                                  children: st.controls.startAnswering,
                                }),
                            N &&
                              o.jsx("button", {
                                className: "btn btn-secondary btn-lg",
                                onClick: ft,
                                disabled:
                                  O || j === "aiSpeaking" || j === "processing",
                                children: O
                                  ? o.jsx("span", { className: "spinner" })
                                  : st.controls.submitAnswer,
                              }),
                            o.jsx("button", {
                              className: "btn btn-ghost",
                              onClick: z,
                              disabled: O,
                              children: st.controls.finishInterview,
                            }),
                          ],
                        }),
                  }),
                  pe &&
                    o.jsx("div", {
                      className: "alert alert-error mt-16",
                      children: pe,
                    }),
                ],
              }),
              o.jsxs("aside", {
                className: "live-right",
                children: [
                  o.jsxs("div", {
                    className: "insight-card card",
                    children: [
                      o.jsxs("div", {
                        className: "insight-header",
                        children: [
                          o.jsx("span", {
                            className: "insight-label",
                            children: "Expression",
                          }),
                          o.jsx("span", {
                            className: "emotion-pill",
                            children: V || "Neutral",
                          }),
                        ],
                      }),
                      o.jsxs("div", {
                        className: "score-box",
                        children: [
                          o.jsx("span", { children: Zi }),
                          o.jsx("small", { children: "/10" }),
                        ],
                      }),
                    ],
                  }),
                  o.jsxs("div", {
                    className: "insight-card card",
                    children: [
                      o.jsx("h3", { children: "Answer breakdown" }),
                      jr.length
                        ? o.jsx("div", {
                            className: "score-grid",
                            children: jr.map(([A, $]) =>
                              o.jsxs(
                                "div",
                                {
                                  className: "mini-score",
                                  children: [
                                    o.jsx("span", { children: A }),
                                    o.jsxs("strong", { children: [$, "/10"] }),
                                  ],
                                },
                                A,
                              ),
                            ),
                          })
                        : o.jsx("p", {
                            className: "empty-state",
                            children:
                              "Submit an answer to see the AI scoring here.",
                          }),
                    ],
                  }),
                  o.jsxs("div", {
                    className: "insight-card card",
                    children: [
                      o.jsx("h3", { children: "Improvement" }),
                      o.jsx("p", {
                        className: "improvement-text",
                        children:
                          (oe == null ? void 0 : oe.improvedAnswer) ||
                          "Your improved answer will appear here after the system evaluates your response.",
                      }),
                    ],
                  }),
                  o.jsxs("div", {
                    className: "insight-card card",
                    children: [
                      o.jsx("h3", { children: "Live transcript" }),
                      o.jsx("div", {
                        className: "live-transcript-box",
                        children:
                          j === "listening" && N
                            ? o.jsx("p", { children: N })
                            : o.jsx("p", {
                                className: "empty-state",
                                children: "Waiting for your response...",
                              }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : null;
}
function wp({ label: e, score: t, maxScore: n = 10 }) {
  const r = Math.min(100, (t / n) * 100),
    s =
      t >= 7
        ? "var(--color-primary)"
        : t >= 4
          ? "var(--color-secondary)"
          : "#dc2626";
  return o.jsxs("div", {
    style: { display: "flex", flexDirection: "column", gap: 6 },
    children: [
      o.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        children: [
          o.jsx("span", {
            style: { fontSize: "0.875rem", color: "var(--color-text-primary)" },
            children: e,
          }),
          o.jsx("span", {
            style: { fontSize: "0.875rem", fontWeight: 600, color: s },
            children: t != null ? `${t}/10` : "—",
          }),
        ],
      }),
      o.jsx("div", {
        className: "score-bar-track",
        children: o.jsx("div", {
          className: "score-bar-fill",
          style: { width: `${r}%`, background: s },
        }),
      }),
    ],
  });
}
const zw = "Interview complete",
  Fw = "Here's how you performed across all rounds",
  Uw = {
    overallScore: "Overall score",
    readiness: "Interview readiness",
    breakdown: "Score breakdown",
    roundWise: "Round-wise performance",
    strengths: "What you did well",
    weaknesses: "Areas to improve",
    recommendations: "Action plan",
    summary: "Final assessment",
  },
  Mw = {
    communication: "Communication",
    confidence: "Confidence",
    technical: "Technical depth",
    fluency: "Fluency",
    vocabulary: "Vocabulary",
    grammar: "Grammar",
    clarity: "Clarity",
  },
  Bw = { hr: "HR Round", technical: "Technical Round", other: "Other Round" },
  $w = {
    tryAgain: "Practice again",
    viewHistory: "View all interviews",
    goHome: "Back to dashboard",
  },
  Hw = {
    question: "Question",
    yourAnswer: "Your answer",
    betterAnswer: "Suggested answer",
  },
  ye = {
    heading: zw,
    subheading: Fw,
    sections: Uw,
    scoreLabels: Mw,
    roundLabels: Bw,
    buttons: $w,
    turnLabels: Hw,
  };
function Ww() {
  var l, a, u, d, f;
  const e = Ne(),
    n = (l = Tt().state) == null ? void 0 : l.record,
    [r, s] = w.useState(null);
  if (!n)
    return o.jsxs("div", {
      className: "page-wrapper",
      children: [
        o.jsx(ut, {}),
        o.jsxs("div", {
          className: "container",
          style: { paddingTop: 60, textAlign: "center" },
          children: [
            o.jsx("p", {
              className: "body-text",
              children: "No result data found.",
            }),
            o.jsx("button", {
              className: "btn btn-primary mt-16",
              onClick: () => e("/home"),
              children: "Back to dashboard",
            }),
          ],
        }),
      ],
    });
  const i =
    {
      "Interview Ready": "var(--color-ready)",
      Promising: "var(--color-promising)",
      "Needs Improvement": "var(--color-needs)",
      "Keep Practicing": "var(--color-practicing)",
    }[n.readinessLabel] || "var(--color-text-secondary)";
  return o.jsxs("div", {
    className: "page-wrapper",
    children: [
      o.jsx(ut, {}),
      o.jsxs("div", {
        className: "container result-container",
        children: [
          o.jsxs("div", {
            className: "result-header",
            children: [
              o.jsxs("div", {
                children: [
                  o.jsx("h1", {
                    className: "display-heading",
                    children: ye.heading,
                  }),
                  o.jsx("p", {
                    className: "body-text mt-8",
                    children: ye.subheading,
                  }),
                ],
              }),
              o.jsxs("div", {
                className: "result-header-actions",
                children: [
                  o.jsx("button", {
                    className: "btn btn-ghost",
                    onClick: () => e("/interview/history"),
                    children: ye.buttons.viewHistory,
                  }),
                  o.jsx("button", {
                    className: "btn btn-primary",
                    onClick: () => e("/interview/setup"),
                    children: ye.buttons.tryAgain,
                  }),
                ],
              }),
            ],
          }),
          o.jsxs("div", {
            className: "result-layout",
            children: [
              o.jsxs("div", {
                className: "result-main",
                children: [
                  o.jsxs("div", {
                    className: "card result-overview",
                    children: [
                      o.jsxs("div", {
                        className: "overview-score",
                        children: [
                          o.jsxs("div", {
                            className: "big-score",
                            children: [
                              n.overallScore ?? "—",
                              o.jsx("span", { children: "/10" }),
                            ],
                          }),
                          o.jsx("div", {
                            className: "score-caption",
                            children: ye.sections.overallScore,
                          }),
                        ],
                      }),
                      o.jsx("div", { className: "overview-divider" }),
                      o.jsxs("div", {
                        className: "overview-readiness",
                        children: [
                          o.jsx("div", {
                            className: "readiness-label",
                            style: { color: i, borderColor: i },
                            children: n.readinessLabel,
                          }),
                          o.jsx("div", {
                            className: "score-caption",
                            children: ye.sections.readiness,
                          }),
                        ],
                      }),
                      o.jsxs("div", {
                        className: "overview-meta",
                        children: [
                          o.jsxs("span", {
                            className: "meta-item",
                            children: ["🎯 ", n.targetRole],
                          }),
                          n.targetCompany &&
                            o.jsxs("span", {
                              className: "meta-item",
                              children: ["🏢 ", n.targetCompany],
                            }),
                          o.jsxs("span", {
                            className: "meta-item",
                            children: ["📊 ", n.difficulty],
                          }),
                        ],
                      }),
                    ],
                  }),
                  o.jsxs("div", {
                    className: "card mt-20",
                    children: [
                      o.jsx("h2", {
                        className: "section-heading mb-20",
                        children: ye.sections.breakdown,
                      }),
                      o.jsx("div", {
                        className: "breakdown-grid",
                        children:
                          n.result &&
                          Object.entries(n.result).map(([p, g]) =>
                            o.jsx(
                              wp,
                              { label: ye.scoreLabels[p] || p, score: g },
                              p,
                            ),
                          ),
                      }),
                    ],
                  }),
                  ((a = n.rounds) == null ? void 0 : a.length) > 0 &&
                    o.jsxs("div", {
                      className: "card mt-20",
                      children: [
                        o.jsx("h2", {
                          className: "section-heading mb-20",
                          children: ye.sections.roundWise,
                        }),
                        o.jsx("div", {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                          },
                          children: n.rounds.map((p, g) => {
                            var y, j;
                            return o.jsxs(
                              "div",
                              {
                                className: "round-block",
                                children: [
                                  o.jsxs("button", {
                                    className: "round-block-header",
                                    onClick: () => s(r === g ? null : g),
                                    children: [
                                      o.jsxs("div", {
                                        className: "flex items-center gap-12",
                                        children: [
                                          o.jsx("span", {
                                            className: "badge badge-primary",
                                            children:
                                              ye.roundLabels[p.roundType] ||
                                              p.roundType,
                                          }),
                                          o.jsxs("span", {
                                            style: {
                                              fontSize: "0.875rem",
                                              color:
                                                "var(--color-text-secondary)",
                                            },
                                            children: [
                                              ((y = p.turns) == null
                                                ? void 0
                                                : y.length) ?? 0,
                                              " questions",
                                            ],
                                          }),
                                        ],
                                      }),
                                      o.jsxs("div", {
                                        className: "flex items-center gap-12",
                                        children: [
                                          o.jsxs("span", {
                                            style: {
                                              fontWeight: 700,
                                              color: "var(--color-primary)",
                                            },
                                            children: [
                                              p.roundScore ?? "—",
                                              "/10",
                                            ],
                                          }),
                                          o.jsx("span", {
                                            style: {
                                              color: "var(--color-text-muted)",
                                            },
                                            children: r === g ? "▲" : "▼",
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  r === g &&
                                    ((j = p.turns) == null
                                      ? void 0
                                      : j.map((S, N) =>
                                          o.jsxs(
                                            "div",
                                            {
                                              className: "turn-block",
                                              children: [
                                                o.jsxs("div", {
                                                  className: "turn-section",
                                                  children: [
                                                    o.jsx("span", {
                                                      className: "turn-label",
                                                      children:
                                                        ye.turnLabels.question,
                                                    }),
                                                    o.jsx("p", {
                                                      className: "turn-text",
                                                      children: S.question,
                                                    }),
                                                  ],
                                                }),
                                                o.jsxs("div", {
                                                  className: "turn-section",
                                                  children: [
                                                    o.jsx("span", {
                                                      className: "turn-label",
                                                      children:
                                                        ye.turnLabels
                                                          .yourAnswer,
                                                    }),
                                                    o.jsx("p", {
                                                      className: "turn-text",
                                                      children: S.answer,
                                                    }),
                                                  ],
                                                }),
                                                S.improvedAnswer &&
                                                  o.jsxs("div", {
                                                    className:
                                                      "turn-section improved",
                                                    children: [
                                                      o.jsx("span", {
                                                        className: "turn-label",
                                                        children:
                                                          ye.turnLabels
                                                            .betterAnswer,
                                                      }),
                                                      o.jsx("p", {
                                                        className: "turn-text",
                                                        children:
                                                          S.improvedAnswer,
                                                      }),
                                                    ],
                                                  }),
                                                S.scores &&
                                                  o.jsx("div", {
                                                    className: "turn-scores",
                                                    children: Object.entries(
                                                      S.scores,
                                                    ).map(([c, m]) =>
                                                      o.jsxs(
                                                        "div",
                                                        {
                                                          className:
                                                            "turn-score-pill",
                                                          children: [
                                                            o.jsx("span", {
                                                              children: c,
                                                            }),
                                                            o.jsxs("strong", {
                                                              children: [
                                                                m,
                                                                "/10",
                                                              ],
                                                            }),
                                                          ],
                                                        },
                                                        c,
                                                      ),
                                                    ),
                                                  }),
                                              ],
                                            },
                                            N,
                                          ),
                                        )),
                                ],
                              },
                              g,
                            );
                          }),
                        }),
                      ],
                    }),
                ],
              }),
              o.jsxs("div", {
                className: "result-sidebar",
                children: [
                  n.finalSummary &&
                    o.jsxs("div", {
                      className: "card",
                      children: [
                        o.jsx("h3", {
                          className: "section-heading mb-12",
                          style: { fontSize: "1rem" },
                          children: ye.sections.summary,
                        }),
                        o.jsx("p", {
                          className: "body-text",
                          style: { fontSize: "0.9rem" },
                          children: n.finalSummary,
                        }),
                      ],
                    }),
                  ((u = n.strengths) == null ? void 0 : u.length) > 0 &&
                    o.jsxs("div", {
                      className: "card mt-16",
                      children: [
                        o.jsx("h3", {
                          className: "section-heading mb-12",
                          style: { fontSize: "1rem" },
                          children: ye.sections.strengths,
                        }),
                        o.jsx("ul", {
                          className: "feedback-list strengths-list",
                          children: n.strengths.map((p, g) =>
                            o.jsx("li", { children: p }, g),
                          ),
                        }),
                      ],
                    }),
                  ((d = n.weaknesses) == null ? void 0 : d.length) > 0 &&
                    o.jsxs("div", {
                      className: "card mt-16",
                      children: [
                        o.jsx("h3", {
                          className: "section-heading mb-12",
                          style: { fontSize: "1rem" },
                          children: ye.sections.weaknesses,
                        }),
                        o.jsx("ul", {
                          className: "feedback-list weaknesses-list",
                          children: n.weaknesses.map((p, g) =>
                            o.jsx("li", { children: p }, g),
                          ),
                        }),
                      ],
                    }),
                  ((f = n.recommendations) == null ? void 0 : f.length) > 0 &&
                    o.jsxs("div", {
                      className: "card mt-16",
                      children: [
                        o.jsx("h3", {
                          className: "section-heading mb-12",
                          style: { fontSize: "1rem" },
                          children: ye.sections.recommendations,
                        }),
                        o.jsx("ol", {
                          className: "feedback-list reco-list",
                          children: n.recommendations.map((p, g) =>
                            o.jsx("li", { children: p }, g),
                          ),
                        }),
                      ],
                    }),
                  o.jsx("button", {
                    className: "btn btn-ghost btn-full mt-16",
                    onClick: () => e("/home"),
                    children: ye.buttons.goHome,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Vw() {
  const e = Ne(),
    [t, n] = w.useState([]),
    [r, s] = w.useState(!0);
  w.useEffect(() => {
    ee.get("/interview/records")
      .then((l) => n(l.data))
      .catch(() => {})
      .finally(() => s(!1));
  }, []);
  const i = (l) =>
    ({
      "Interview Ready": "var(--color-ready)",
      Promising: "var(--color-promising)",
      "Needs Improvement": "var(--color-needs)",
      "Keep Practicing": "var(--color-practicing)",
    })[l] || "var(--color-text-muted)";
  return o.jsxs("div", {
    className: "page-wrapper",
    children: [
      o.jsx(ut, {}),
      o.jsxs("div", {
        className: "container",
        style: { paddingTop: 40, paddingBottom: 60, maxWidth: 900 },
        children: [
          o.jsxs("div", {
            className: "flex items-center justify-between mb-24",
            children: [
              o.jsxs("div", {
                children: [
                  o.jsx("h1", {
                    className: "display-heading",
                    children: "Interview history",
                  }),
                  o.jsx("p", {
                    className: "body-text mt-8",
                    children: "All your past mock interview sessions",
                  }),
                ],
              }),
              o.jsx("button", {
                className: "btn btn-primary",
                onClick: () => e("/interview/setup"),
                children: "New interview",
              }),
            ],
          }),
          r
            ? o.jsx("div", {
                style: { textAlign: "center", paddingTop: 60 },
                children: o.jsx("div", {
                  className: "spinner",
                  style: { margin: "0 auto" },
                }),
              })
            : t.length === 0
              ? o.jsxs("div", {
                  className: "card empty-state",
                  children: [
                    o.jsx("div", {
                      className: "empty-state-icon",
                      children: "🎙️",
                    }),
                    o.jsx("p", {
                      style: {
                        color: "var(--color-text-secondary)",
                        marginBottom: 16,
                      },
                      children: "You haven't completed any interviews yet.",
                    }),
                    o.jsx("button", {
                      className: "btn btn-primary",
                      onClick: () => e("/interview/setup"),
                      children: "Start your first interview",
                    }),
                  ],
                })
              : o.jsx("div", {
                  style: { display: "flex", flexDirection: "column", gap: 14 },
                  children: t.map((l) => {
                    var a;
                    return o.jsxs(
                      "div",
                      {
                        className: "card history-card",
                        children: [
                          o.jsxs("div", {
                            className: "history-card-left",
                            children: [
                              o.jsxs("div", {
                                className: "history-score",
                                children: [
                                  l.overallScore ?? "—",
                                  o.jsx("span", { children: "/10" }),
                                ],
                              }),
                              o.jsx("div", {
                                className: "history-readiness",
                                style: { color: i(l.readinessLabel) },
                                children: l.readinessLabel || "—",
                              }),
                            ],
                          }),
                          o.jsxs("div", {
                            className: "history-card-body",
                            children: [
                              o.jsx("div", {
                                className: "history-role",
                                children: l.targetRole || "Interview",
                              }),
                              o.jsxs("div", {
                                className: "history-meta",
                                children: [
                                  l.targetCompany &&
                                    o.jsx("span", {
                                      children: l.targetCompany,
                                    }),
                                  o.jsx("span", { children: l.interviewType }),
                                  o.jsx("span", { children: l.difficulty }),
                                  o.jsx("span", {
                                    children: new Date(
                                      l.createdAt,
                                    ).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }),
                                  }),
                                ],
                              }),
                              o.jsx("div", {
                                style: {
                                  display: "flex",
                                  gap: 6,
                                  flexWrap: "wrap",
                                  marginTop: 8,
                                },
                                children:
                                  (a = l.rounds) == null
                                    ? void 0
                                    : a.map((u, d) =>
                                        o.jsxs(
                                          "span",
                                          {
                                            className: "badge badge-muted",
                                            style: { fontSize: "0.75rem" },
                                            children: [
                                              u.roundType,
                                              " · ",
                                              u.roundScore ?? "—",
                                              "/10",
                                            ],
                                          },
                                          d,
                                        ),
                                      ),
                              }),
                            ],
                          }),
                          o.jsx("button", {
                            className: "btn btn-secondary btn-sm",
                            onClick: () =>
                              e("/interview/result", { state: { record: l } }),
                            style: { flexShrink: 0 },
                            children: "View report",
                          }),
                        ],
                      },
                      l._id,
                    );
                  }),
                }),
        ],
      }),
      o.jsx("style", {
        children: `
        .history-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          transition: border-color 0.15s;
        }
        .history-card:hover { border-color: var(--color-primary); }
        .history-card-left {
          text-align: center;
          min-width: 70px;
          flex-shrink: 0;
        }
        .history-score {
          font-family: var(--font-display);
          font-size: 1.625rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
        }
        .history-score span { font-size: 0.875rem; color: var(--color-text-muted); font-weight: 400; }
        .history-readiness { font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 4px; font-weight: 500; }
        .history-card-body { flex: 1; min-width: 0; }
        .history-role { font-weight: 600; font-size: 1rem; color: var(--color-text-primary); }
        .history-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
        }
        .history-meta span:not(:last-child)::after { content: "·"; margin-left: 8px; }
        @media (max-width: 640px) {
          .history-card { flex-wrap: wrap; }
        }
      `,
      }),
    ],
  });
}
const qw = {
    heading: "PPDT Practice",
    subheading: "SSB-style image perception and description test",
    difficultyLabel: "Choose difficulty",
    startButton: "Start session",
    howItWorks: {
      title: "How it works",
      steps: [
        "An image is shown for a fixed time — observe every detail.",
        "The image disappears. Narrate a story based on what you saw.",
        "Your response is evaluated for observation, imagination, and communication.",
      ],
    },
  },
  Qw = {
    viewingHeading: "Observe the image carefully",
    viewingSubtext: "The image will disappear when the timer ends",
    hiddenHeading: "Now describe what you saw",
    hiddenSubtext: "Narrate a story based on the image. Speak clearly.",
    submitButton: "Submit response",
    listeningLabel: "Listening...",
    responseLabel: "Your response",
  },
  Kw = {
    heading: "PPDT result",
    subheading: "Here's how your story was evaluated",
    overallScore: "Overall score",
    breakdown: "Score breakdown",
    scoreLabels: {
      observation: "Observation",
      imagination: "Imagination",
      communication: "Communication",
      confidence: "Confidence",
      storyStructure: "Story structure",
      officerLikeQualities: "Officer-like qualities",
    },
    yourResponse: "Your response",
    referenceDescription: "Reference description",
    recommendations: "Suggestions to improve",
    buttons: { tryAgain: "Try another image", goHome: "Back to dashboard" },
  },
  Yw = [
    {
      value: "Beginner",
      label: "Beginner",
      hint: "30s to observe, 3 min to respond",
    },
    {
      value: "Intermediate",
      label: "Intermediate",
      hint: "30s to observe, 4 min to respond",
    },
    {
      value: "Advanced",
      label: "Advanced",
      hint: "30s to observe, 5 min to respond",
    },
  ],
  Le = { setup: qw, live: Qw, result: Kw, difficultyOptions: Yw };
function Gw() {
  const e = Ne(),
    [t, n] = w.useState("Beginner"),
    [r, s] = w.useState([]),
    [i, l] = w.useState(!1),
    [a, u] = w.useState(!0);
  w.useEffect(() => {
    ee.get("/ppdt/images")
      .then((f) => s(f.data))
      .catch(() => {})
      .finally(() => u(!1));
  }, []);
  const d = async () => {
    const f = r.filter((g) => g.difficulty === t);
    if (f.length === 0) return;
    const p = f[Math.floor(Math.random() * f.length)];
    l(!0);
    try {
      const g = await ee.post("/ppdt/session/start", {
        imageId: p.id,
        difficulty: t,
      });
      e("/ppdt/live", {
        state: {
          sessionId: g.data.sessionId,
          imageUrl: g.data.imageUrl,
          viewDurationSeconds: g.data.viewDurationSeconds,
          responseDurationSeconds: g.data.responseDurationSeconds,
          difficulty: g.data.difficulty,
        },
      });
    } catch (g) {
      console.error(g);
    } finally {
      l(!1);
    }
  };
  return o.jsxs("div", {
    className: "page-wrapper",
    children: [
      o.jsx(ut, {}),
      o.jsx("div", {
        className: "container ppdt-setup-container",
        children: o.jsxs("div", {
          className: "ppdt-setup-layout",
          children: [
            o.jsxs("div", {
              className: "ppdt-setup-main",
              children: [
                o.jsx("h1", {
                  className: "display-heading",
                  children: Le.setup.heading,
                }),
                o.jsx("p", {
                  className: "body-text mt-8 mb-32",
                  children: Le.setup.subheading,
                }),
                o.jsxs("div", {
                  className: "card",
                  children: [
                    o.jsx("h2", {
                      className: "section-heading mb-20",
                      children: Le.setup.difficultyLabel,
                    }),
                    o.jsx("div", {
                      className: "ppdt-difficulty-list",
                      children: Le.difficultyOptions.map((f) =>
                        o.jsxs(
                          "label",
                          {
                            className: `ppdt-diff-option ${t === f.value ? "selected" : ""}`,
                            children: [
                              o.jsx("input", {
                                type: "radio",
                                name: "difficulty",
                                value: f.value,
                                checked: t === f.value,
                                onChange: () => n(f.value),
                              }),
                              o.jsxs("div", {
                                children: [
                                  o.jsx("div", {
                                    className: "ppdt-diff-label",
                                    children: f.label,
                                  }),
                                  o.jsx("div", {
                                    className: "ppdt-diff-hint",
                                    children: f.hint,
                                  }),
                                ],
                              }),
                            ],
                          },
                          f.value,
                        ),
                      ),
                    }),
                    o.jsx("button", {
                      className: "btn btn-primary btn-lg mt-24",
                      onClick: d,
                      disabled: i || a,
                      children: i
                        ? o.jsx("span", {
                            className: "spinner",
                            style: { borderTopColor: "#fff" },
                          })
                        : Le.setup.startButton,
                    }),
                  ],
                }),
              ],
            }),
            o.jsxs("div", {
              className: "ppdt-how-card card",
              children: [
                o.jsx("h3", {
                  className: "section-heading mb-16",
                  children: Le.setup.howItWorks.title,
                }),
                o.jsx("ol", {
                  className: "ppdt-steps",
                  children: Le.setup.howItWorks.steps.map((f, p) =>
                    o.jsxs(
                      "li",
                      {
                        children: [
                          o.jsx("div", {
                            className: "ppdt-step-num",
                            children: p + 1,
                          }),
                          o.jsx("p", { children: f }),
                        ],
                      },
                      p,
                    ),
                  ),
                }),
                o.jsxs("div", {
                  className: "ppdt-tip mt-24",
                  children: [
                    o.jsx("strong", { children: "Tip:" }),
                    " Observe every person, their expression, and the setting. Your story should have a clear beginning, middle, and conclusion.",
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
const kt = { VIEWING: "viewing", RESPONDING: "responding" };
function Jw() {
  const e = Ne(),
    n = Tt().state;
  w.useEffect(() => {
    (n != null && n.sessionId) || e("/ppdt/setup", { replace: !0 });
  }, []);
  const {
      sessionId: r,
      imageUrl: s,
      viewDurationSeconds: i = 30,
      responseDurationSeconds: l = 180,
    } = n || {},
    [a, u] = w.useState(kt.VIEWING),
    [d, f] = w.useState(i),
    [p, g] = w.useState(""),
    [y, j] = w.useState(!1),
    [S, N] = w.useState(!1),
    [c, m] = w.useState(""),
    [h, x] = w.useState(0),
    k = w.useRef(null),
    C = w.useRef(""),
    R = w.useRef(null);
  (w.useEffect(() => {
    if (a === kt.VIEWING)
      return (
        (R.current = setInterval(() => {
          f((M) =>
            M <= 1
              ? (clearInterval(R.current), u(kt.RESPONDING), f(l), 0)
              : M - 1,
          );
        }, 1e3)),
        () => clearInterval(R.current)
      );
  }, [a]),
    w.useEffect(() => {
      if (a === kt.RESPONDING)
        return (
          (R.current = setInterval(() => {
            (x((M) => M + 1),
              f((M) => (M <= 1 ? (clearInterval(R.current), H(), 0) : M - 1)));
          }, 1e3)),
          () => clearInterval(R.current)
        );
    }, [a]),
    w.useEffect(() => {
      a === kt.RESPONDING && T();
    }, [a]));
  const T = () => {
      const M = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!M) {
        m(Le.live.listeningLabel + " not supported");
        return;
      }
      const V = new M();
      ((V.continuous = !0),
        (V.interimResults = !0),
        (V.lang = "en-IN"),
        (C.current = ""),
        (V.onresult = (le) => {
          let oe = "";
          for (let He = le.resultIndex; He < le.results.length; He++) {
            const P = le.results[He][0].transcript;
            le.results[He].isFinal ? (C.current += P + " ") : (oe += P);
          }
          g((C.current + " " + oe).trim());
        }),
        (V.onerror = () => {}),
        V.start(),
        (k.current = V),
        j(!0));
    },
    H = () => {
      var M;
      ((M = k.current) == null || M.stop(), j(!1));
    },
    O = async () => {
      var M, V;
      if ((H(), clearInterval(R.current), !p.trim())) {
        m("Please describe what you saw before submitting.");
        return;
      }
      N(!0);
      try {
        const le = await ee.post("/ppdt/session/submit", {
          sessionId: r,
          userAnswer: p.trim(),
          durationSeconds: h,
        });
        e("/ppdt/result", { state: { record: le.data.record } });
      } catch (le) {
        m(
          ((V = (M = le.response) == null ? void 0 : M.data) == null
            ? void 0
            : V.message) || "Failed to submit response",
        );
      } finally {
        N(!1);
      }
    },
    U = (M) => {
      const V = Math.floor(M / 60)
          .toString()
          .padStart(2, "0"),
        le = (M % 60).toString().padStart(2, "0");
      return `${V}:${le}`;
    },
    pe = d <= 30 && a === kt.RESPONDING;
  return n != null && n.sessionId
    ? o.jsxs("div", {
        className: "ppdt-live-page",
        children: [
          o.jsxs("div", {
            className: "ppdt-topbar",
            children: [
              o.jsxs("div", {
                className: "flex items-center gap-12",
                children: [
                  o.jsx("div", { className: "live-logo", children: "IQ" }),
                  o.jsx("span", {
                    style: {
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                    },
                    children: "PPDT Practice",
                  }),
                ],
              }),
              o.jsxs("div", {
                className: `ppdt-timer ${pe ? "urgent" : ""}`,
                children: [
                  o.jsx("span", {
                    className: "timer-label",
                    children: a === kt.VIEWING ? "Observe" : "Time left",
                  }),
                  o.jsx("span", { className: "timer-value", children: U(d) }),
                ],
              }),
            ],
          }),
          o.jsxs("div", {
            className: "ppdt-main container",
            children: [
              o.jsx("div", {
                className: "ppdt-phase-header",
                children:
                  a === kt.VIEWING
                    ? o.jsxs(o.Fragment, {
                        children: [
                          o.jsx("h2", {
                            className: "section-heading",
                            children: Le.live.viewingHeading,
                          }),
                          o.jsx("p", {
                            className: "body-text",
                            children: Le.live.viewingSubtext,
                          }),
                        ],
                      })
                    : o.jsxs(o.Fragment, {
                        children: [
                          o.jsx("h2", {
                            className: "section-heading",
                            children: Le.live.hiddenHeading,
                          }),
                          o.jsx("p", {
                            className: "body-text",
                            children: Le.live.hiddenSubtext,
                          }),
                        ],
                      }),
              }),
              o.jsxs("div", {
                className: "ppdt-content",
                children: [
                  o.jsx("div", {
                    className: "ppdt-image-wrap card",
                    children:
                      a === kt.VIEWING
                        ? o.jsx("img", {
                            src: s,
                            alt: "PPDT image",
                            className: "ppdt-image",
                          })
                        : o.jsxs("div", {
                            className: "ppdt-image-hidden",
                            children: [
                              o.jsx("span", { children: "🖼️" }),
                              o.jsx("p", {
                                children:
                                  "Image hidden — narrate your story from memory",
                              }),
                            ],
                          }),
                  }),
                  a === kt.RESPONDING &&
                    o.jsxs("div", {
                      className: "ppdt-response-wrap card",
                      children: [
                        o.jsxs("div", {
                          className: "ppdt-response-header",
                          children: [
                            o.jsx("span", {
                              className: "ppdt-response-label",
                              children: Le.live.responseLabel,
                            }),
                            y &&
                              o.jsxs("div", {
                                className: "flex items-center gap-8",
                                children: [
                                  o.jsx("span", { className: "pulse-dot" }),
                                  o.jsx("span", {
                                    style: {
                                      fontSize: "0.8125rem",
                                      color: "var(--color-error)",
                                    },
                                    children: Le.live.listeningLabel,
                                  }),
                                ],
                              }),
                          ],
                        }),
                        o.jsx("div", {
                          className: "ppdt-transcript",
                          children:
                            p ||
                            o.jsx("span", {
                              className: "ppdt-transcript-placeholder",
                              children:
                                "Start speaking — your words will appear here...",
                            }),
                        }),
                        c &&
                          o.jsx("div", {
                            className: "alert alert-error mt-12",
                            children: c,
                          }),
                        o.jsxs("div", {
                          className: "ppdt-controls mt-16",
                          children: [
                            y
                              ? o.jsx("button", {
                                  className: "btn btn-ghost",
                                  onClick: H,
                                  children: "Pause",
                                })
                              : o.jsx("button", {
                                  className: "btn btn-secondary",
                                  onClick: T,
                                  disabled: S,
                                  children: "Resume",
                                }),
                            o.jsx("button", {
                              className: "btn btn-primary btn-lg",
                              onClick: O,
                              disabled: S || !p.trim(),
                              children: S
                                ? o.jsx("span", {
                                    className: "spinner",
                                    style: { borderTopColor: "#fff" },
                                  })
                                : Le.live.submitButton,
                            }),
                          ],
                        }),
                      ],
                    }),
                ],
              }),
            ],
          }),
        ],
      })
    : null;
}
function Xw() {
  var s, i;
  const e = Ne(),
    n = (s = Tt().state) == null ? void 0 : s.record,
    r = Le.result;
  return n
    ? o.jsxs("div", {
        className: "page-wrapper",
        children: [
          o.jsx(ut, {}),
          o.jsxs("div", {
            className: "container",
            style: { paddingTop: 40, paddingBottom: 60, maxWidth: 900 },
            children: [
              o.jsxs("div", {
                className:
                  "flex items-center justify-between mb-24 flex-wrap gap-16",
                children: [
                  o.jsxs("div", {
                    children: [
                      o.jsx("h1", {
                        className: "display-heading",
                        children: r.heading,
                      }),
                      o.jsx("p", {
                        className: "body-text mt-8",
                        children: r.subheading,
                      }),
                    ],
                  }),
                  o.jsxs("div", {
                    className: "flex gap-12",
                    children: [
                      o.jsx("button", {
                        className: "btn btn-ghost",
                        onClick: () => e("/ppdt/setup"),
                        children: r.buttons.tryAgain,
                      }),
                      o.jsx("button", {
                        className: "btn btn-ghost",
                        onClick: () => e("/home"),
                        children: r.buttons.goHome,
                      }),
                    ],
                  }),
                ],
              }),
              o.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "1fr 300px",
                  gap: 24,
                  alignItems: "start",
                },
                children: [
                  o.jsxs("div", {
                    children: [
                      o.jsxs("div", {
                        className: "card flex items-center gap-24",
                        style: { padding: 28 },
                        children: [
                          o.jsxs("div", {
                            children: [
                              o.jsxs("div", {
                                style: {
                                  fontFamily: "var(--font-display)",
                                  fontSize: "3rem",
                                  fontWeight: 700,
                                  color: "var(--color-primary)",
                                  lineHeight: 1,
                                },
                                children: [
                                  n.overallScore ?? "—",
                                  o.jsx("span", {
                                    style: {
                                      fontSize: "1.25rem",
                                      color: "var(--color-text-muted)",
                                      fontWeight: 400,
                                    },
                                    children: "/10",
                                  }),
                                ],
                              }),
                              o.jsx("div", {
                                style: {
                                  fontSize: "0.8125rem",
                                  color: "var(--color-text-secondary)",
                                  marginTop: 4,
                                },
                                children: r.overallScore,
                              }),
                            ],
                          }),
                          o.jsxs("div", {
                            style: {
                              display: "flex",
                              gap: 8,
                              flexWrap: "wrap",
                            },
                            children: [
                              o.jsx("span", {
                                className: "badge badge-muted",
                                children: n.difficulty,
                              }),
                              o.jsx("span", {
                                className: "badge badge-muted",
                                children: n.imageId,
                              }),
                            ],
                          }),
                        ],
                      }),
                      o.jsxs("div", {
                        className: "card mt-20",
                        children: [
                          o.jsx("h2", {
                            className: "section-heading mb-20",
                            children: r.breakdown,
                          }),
                          o.jsx("div", {
                            style: {
                              display: "flex",
                              flexDirection: "column",
                              gap: 14,
                            },
                            children:
                              n.result &&
                              Object.entries(n.result).map(([l, a]) =>
                                o.jsx(
                                  wp,
                                  { label: r.scoreLabels[l] || l, score: a },
                                  l,
                                ),
                              ),
                          }),
                        ],
                      }),
                      n.userAnswer &&
                        o.jsxs("div", {
                          className: "card mt-20",
                          children: [
                            o.jsx("h3", {
                              className: "section-heading mb-12",
                              style: { fontSize: "1rem" },
                              children: r.yourResponse,
                            }),
                            o.jsx("p", {
                              style: {
                                fontSize: "0.9375rem",
                                lineHeight: 1.65,
                                color: "var(--color-text-primary)",
                              },
                              children: n.userAnswer,
                            }),
                          ],
                        }),
                      n.referenceDescription &&
                        o.jsxs("div", {
                          className: "card mt-16",
                          style: { borderColor: "var(--color-primary)" },
                          children: [
                            o.jsx("h3", {
                              className: "section-heading mb-12",
                              style: { fontSize: "1rem" },
                              children: r.referenceDescription,
                            }),
                            o.jsx("p", {
                              style: {
                                fontSize: "0.9375rem",
                                lineHeight: 1.65,
                                color: "var(--color-text-secondary)",
                              },
                              children: n.referenceDescription,
                            }),
                          ],
                        }),
                    ],
                  }),
                  o.jsx("div", {
                    children:
                      ((i = n.recommendations) == null ? void 0 : i.length) >
                        0 &&
                      o.jsxs("div", {
                        className: "card",
                        children: [
                          o.jsx("h3", {
                            className: "section-heading mb-16",
                            style: { fontSize: "1rem" },
                            children: r.recommendations,
                          }),
                          o.jsx("ul", {
                            style: {
                              listStyle: "none",
                              display: "flex",
                              flexDirection: "column",
                              gap: 10,
                            },
                            children: n.recommendations.map((l, a) =>
                              o.jsxs(
                                "li",
                                {
                                  style: {
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "flex-start",
                                    fontSize: "0.875rem",
                                    color: "var(--color-text-primary)",
                                    lineHeight: 1.5,
                                  },
                                  children: [
                                    o.jsxs("span", {
                                      style: {
                                        color: "var(--color-primary)",
                                        fontWeight: 700,
                                        flexShrink: 0,
                                      },
                                      children: [a + 1, "."],
                                    }),
                                    l,
                                  ],
                                },
                                a,
                              ),
                            ),
                          }),
                        ],
                      }),
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    : o.jsxs("div", {
        className: "page-wrapper",
        children: [
          o.jsx(ut, {}),
          o.jsxs("div", {
            className: "container",
            style: { paddingTop: 60, textAlign: "center" },
            children: [
              o.jsx("p", {
                className: "body-text",
                children: "No result data found.",
              }),
              o.jsx("button", {
                className: "btn btn-primary mt-16",
                onClick: () => e("/ppdt/setup"),
                children: "Try again",
              }),
            ],
          }),
        ],
      });
}
const Zw = {
    heading: "Communication Practice",
    subheading:
      "Improve your spoken English — vocabulary, hard words, tongue twisters, and tenses",
    cards: [
      {
        type: "vocab",
        title: "Vocabulary Words",
        description:
          "Learn and pronounce common vocabulary words with meanings.",
      },
      {
        type: "hardWords",
        title: "Hard Words",
        description: "Practice tricky, hard-to-pronounce words.",
      },
      {
        type: "tongueTwisters",
        title: "Tongue Twisters",
        description:
          "Sharpen your articulation and speed with classic tongue twisters.",
      },
      {
        type: "tenses",
        title: "Tenses & Verb Fluency",
        description:
          "Practice speaking sentences across different tenses fluently.",
      },
    ],
  },
  ex = {
    backButton: "Back",
    progressLabel: "Word",
    micStart: "Tap to speak",
    micListening: "Listening...",
    yourSpeechLabel: "You said",
    nextButton: "Next",
    finishButton: "Finish",
    restartButton: "Restart",
    completeHeading: "Great job!",
    completeSubtext: "You've completed this practice set.",
    matchGood: "Nice pronunciation!",
    matchOkay: "Good try — keep practicing this one.",
    matchLow: "Try again, say it clearly.",
    meaningLabel: "Meaning",
    exampleLabel: "Example",
    typeMeta: {
      vocab: {
        title: "Vocabulary Words",
        instruction: "Read the word aloud, then check its meaning below.",
      },
      hardWords: {
        title: "Hard Words",
        instruction: "These words are tricky — say them slowly and clearly.",
      },
      tongueTwisters: {
        title: "Tongue Twisters",
        instruction: "Say it fast and clean, without stumbling.",
      },
      tenses: {
        title: "Tenses & Verb Fluency",
        instruction:
          "Read the sentence aloud naturally, like you're speaking it.",
      },
    },
  },
  xp = { hub: Zw, practice: ex };
function tx() {
  const e = Ne(),
    { hub: t } = xp;
  return o.jsxs("div", {
    className: "comm-hub-page",
    children: [
      o.jsx(ut, {}),
      o.jsxs("div", {
        className: "container comm-hub-main",
        children: [
          o.jsx("h1", { className: "comm-hub-heading", children: t.heading }),
          o.jsx("p", {
            className: "comm-hub-subheading",
            children: t.subheading,
          }),
          o.jsx("div", {
            className: "comm-hub-grid",
            children: t.cards.map((n) =>
              o.jsxs(
                "button",
                {
                  className: "comm-hub-card",
                  onClick: () => e(`/communication/practice/${n.type}`),
                  children: [
                    o.jsx("h3", {
                      className: "comm-hub-card-title",
                      children: n.title,
                    }),
                    o.jsx("p", {
                      className: "comm-hub-card-desc",
                      children: n.description,
                    }),
                  ],
                },
                n.type,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
const nx = [
    {
      id: "v11",
      word: "Astute",
      meaning: "Having or showing an ability to accurately assess situations.",
      example:
        "The interviewer appreciated her astute observations about system design.",
    },
    {
      id: "v12",
      word: "Diligent",
      meaning: "Showing careful and persistent effort.",
      example: "He was diligent in completing every coding challenge.",
    },
    {
      id: "v13",
      word: "Innovative",
      meaning: "Introducing new ideas or methods.",
      example:
        "The team proposed an innovative solution to reduce server costs.",
    },
    {
      id: "v14",
      word: "Proficient",
      meaning: "Competent or skilled in doing something.",
      example: "She is proficient in C++, Python, and JavaScript.",
    },
    {
      id: "v15",
      word: "Intuitive",
      meaning: "Easy to understand or use.",
      example: "The app has an intuitive user interface.",
    },
    {
      id: "v16",
      word: "Robust",
      meaning: "Strong and unlikely to fail.",
      example: "The authentication system is robust against common attacks.",
    },
    {
      id: "v17",
      word: "Scalable",
      meaning: "Able to handle increased demand.",
      example: "Cloud infrastructure makes applications scalable.",
    },
    {
      id: "v18",
      word: "Transparent",
      meaning: "Easy to perceive or detect; open and honest.",
      example: "The manager was transparent about the project's challenges.",
    },
    {
      id: "v19",
      word: "Comprehensive",
      meaning: "Complete and including everything necessary.",
      example: "She wrote a comprehensive project report.",
    },
    {
      id: "v20",
      word: "Adaptive",
      meaning: "Able to adjust to new conditions.",
      example: "Successful developers are adaptive to changing technologies.",
    },
    {
      id: "v21",
      word: "Articulate",
      meaning: "Able to express ideas clearly.",
      example: "He gave an articulate explanation of the algorithm.",
    },
    {
      id: "v22",
      word: "Analytical",
      meaning: "Using logical reasoning to examine information.",
      example: "Analytical thinking is essential for debugging.",
    },
    {
      id: "v23",
      word: "Credible",
      meaning: "Able to be believed or trusted.",
      example: "Always support your claims with credible sources.",
    },
    {
      id: "v24",
      word: "Efficient",
      meaning: "Achieving results with minimal waste.",
      example: "The optimized algorithm is more efficient.",
    },
    {
      id: "v25",
      word: "Exceptional",
      meaning: "Unusually good.",
      example: "She delivered an exceptional presentation.",
    },
    {
      id: "v26",
      word: "Fundamental",
      meaning: "Forming the base or core of something.",
      example: "Data structures are fundamental to programming.",
    },
    {
      id: "v27",
      word: "Hypothetical",
      meaning: "Based on assumptions rather than facts.",
      example: "The interviewer asked a hypothetical system design question.",
    },
    {
      id: "v28",
      word: "Impartial",
      meaning: "Treating all sides equally.",
      example: "A good reviewer remains impartial.",
    },
    {
      id: "v29",
      word: "Intrinsic",
      meaning: "Belonging naturally to something.",
      example: "Curiosity is an intrinsic quality of great learners.",
    },
    {
      id: "v30",
      word: "Judicious",
      meaning: "Having or showing good judgment.",
      example: "The architect made a judicious technology choice.",
    },
    {
      id: "v31",
      word: "Lucrative",
      meaning: "Producing a great deal of profit.",
      example: "Software engineering can be a lucrative career.",
    },
    {
      id: "v32",
      word: "Monotonous",
      meaning: "Dull because of repetition.",
      example: "Automating monotonous tasks saves time.",
    },
    {
      id: "v33",
      word: "Noteworthy",
      meaning: "Deserving attention.",
      example: "His open-source contributions are noteworthy.",
    },
    {
      id: "v34",
      word: "Optimal",
      meaning: "Best or most favorable.",
      example: "Binary search is optimal for sorted arrays.",
    },
    {
      id: "v35",
      word: "Perceptive",
      meaning: "Quick to notice or understand things.",
      example: "She made a perceptive comment about the architecture.",
    },
    {
      id: "v36",
      word: "Proactive",
      meaning: "Taking action before necessary.",
      example: "Being proactive helped prevent production issues.",
    },
    {
      id: "v37",
      word: "Rational",
      meaning: "Based on reason or logic.",
      example: "Choose the most rational solution.",
    },
    {
      id: "v38",
      word: "Sophisticated",
      meaning: "Advanced and complex.",
      example: "The application uses a sophisticated caching strategy.",
    },
    {
      id: "v39",
      word: "Substantial",
      meaning: "Of considerable importance or size.",
      example: "The update brought substantial improvements.",
    },
    {
      id: "v40",
      word: "Sustainable",
      meaning: "Able to continue over time.",
      example: "Write sustainable and maintainable code.",
    },
    {
      id: "v41",
      word: "Tangible",
      meaning: "Clear and definite; able to be touched.",
      example: "The internship gave him tangible industry experience.",
    },
    {
      id: "v42",
      word: "Unprecedented",
      meaning: "Never done or known before.",
      example: "The app reached unprecedented growth.",
    },
    {
      id: "v43",
      word: "Viable",
      meaning: "Capable of working successfully.",
      example: "This business model is financially viable.",
    },
    {
      id: "v44",
      word: "Vigilant",
      meaning: "Keeping careful watch for danger.",
      example: "Developers should remain vigilant about security risks.",
    },
    {
      id: "v45",
      word: "Comprehensive",
      meaning: "Including nearly everything.",
      example: "He created a comprehensive study plan.",
    },
    {
      id: "v46",
      word: "Elaborate",
      meaning: "Containing many details.",
      example: "She gave an elaborate explanation of the project.",
    },
    {
      id: "v47",
      word: "Ingenious",
      meaning: "Very clever and inventive.",
      example: "The engineer devised an ingenious optimization.",
    },
    {
      id: "v48",
      word: "Lucid",
      meaning: "Expressed clearly and easy to understand.",
      example: "His documentation is remarkably lucid.",
    },
    {
      id: "v49",
      word: "Plausible",
      meaning: "Seeming reasonable or probable.",
      example: "The explanation sounded plausible.",
    },
    {
      id: "v50",
      word: "Profound",
      meaning: "Very great or intense.",
      example: "The book had a profound impact on her thinking.",
    },
    {
      id: "v51",
      word: "Eloquent",
      meaning: "Fluent and persuasive in speaking or writing.",
      example: "She gave an eloquent presentation during the interview.",
    },
    {
      id: "v52",
      word: "Discern",
      meaning: "To recognize or perceive clearly.",
      example: "It was difficult to discern the root cause of the bug.",
    },
    {
      id: "v53",
      word: "Acumen",
      meaning: "The ability to make good judgments.",
      example: "Business acumen is valuable for entrepreneurs.",
    },
    {
      id: "v54",
      word: "Dexterous",
      meaning: "Skillful with the hands or mind.",
      example: "The developer was dexterous at solving complex problems.",
    },
    {
      id: "v55",
      word: "Expedite",
      meaning: "To make a process happen faster.",
      example: "Automation helped expedite deployment.",
    },
    {
      id: "v56",
      word: "Fortify",
      meaning: "To strengthen.",
      example: "Regular testing helps fortify software quality.",
    },
    {
      id: "v57",
      word: "Galvanize",
      meaning: "To motivate people into action.",
      example: "The team lead galvanized everyone before the release.",
    },
    {
      id: "v58",
      word: "Mitigate",
      meaning: "To make less severe.",
      example: "Backups mitigate the risk of data loss.",
    },
    {
      id: "v59",
      word: "Nuance",
      meaning: "A subtle difference in meaning or expression.",
      example:
        "Understanding the nuance of the requirement prevented mistakes.",
    },
    {
      id: "v60",
      word: "Scrutinize",
      meaning: "To examine something very carefully.",
      example: "Always scrutinize your code before creating a pull request.",
    },
  ],
  rx = [
    {
      id: "h11",
      word: "Antidisestablishmentarianism",
      hint: "AN-tee-dis-ih-stab-lish-men-TAIR-ee-uh-niz-um",
      meaning:
        "A political position opposing the separation of church and state.",
    },
    {
      id: "h12",
      word: "Pseudopseudohypoparathyroidism",
      hint: "SOO-doh-SOO-doh-HY-poh-par-uh-THY-roi-diz-um",
      meaning: "A rare inherited disorder resembling pseudohypoparathyroidism.",
    },
    {
      id: "h13",
      word: "Floccinaucinihilipilification",
      hint: "FLOK-si-NAW-si-NY-hi-li-pil-ih-fi-KAY-shun",
      meaning: "The act of considering something worthless.",
    },
    {
      id: "h14",
      word: "Supercalifragilisticexpialidocious",
      hint: "SOO-per-KAL-ih-FRAJ-uh-lis-tik-EK-spee-al-ih-DOH-shus",
      meaning: "A nonsense word meaning extraordinarily wonderful.",
    },
    {
      id: "h15",
      word: "Synecdoche",
      hint: "si-NEK-duh-kee",
      meaning: "A figure of speech where a part represents the whole.",
    },
    {
      id: "h16",
      word: "Quintessential",
      hint: "kwin-tuh-SEN-shul",
      meaning: "Representing the most perfect example of something.",
    },
    {
      id: "h17",
      word: "Cacophony",
      hint: "kuh-KOF-uh-nee",
      meaning: "A harsh mixture of unpleasant sounds.",
    },
    {
      id: "h18",
      word: "Epistemology",
      hint: "eh-pis-tuh-MOL-uh-jee",
      meaning: "The study of knowledge and belief.",
    },
    {
      id: "h19",
      word: "Paradigm",
      hint: "PAIR-uh-dime",
      meaning: "A typical example or model of something.",
    },
    {
      id: "h20",
      word: "Juxtaposition",
      hint: "JUK-stuh-puh-ZISH-un",
      meaning: "Placing two things side by side for comparison.",
    },
    {
      id: "h21",
      word: "Machiavellian",
      hint: "mak-ee-uh-VEL-ee-un",
      meaning: "Cunning, scheming, and manipulative.",
    },
    {
      id: "h22",
      word: "Sesquipedalian",
      hint: "ses-kwi-puh-DAY-lee-un",
      meaning: "Given to using long words.",
    },
    {
      id: "h23",
      word: "Perspicacious",
      hint: "pur-spi-KAY-shus",
      meaning: "Having keen insight and understanding.",
    },
    {
      id: "h24",
      word: "Obstreperous",
      hint: "ub-STREP-er-us",
      meaning: "Noisy, difficult to control, and unruly.",
    },
    {
      id: "h25",
      word: "Pulchritudinous",
      hint: "pul-kri-TOO-di-nus",
      meaning: "Physically beautiful.",
    },
    {
      id: "h26",
      word: "Vicissitude",
      hint: "vih-SIS-ih-tood",
      meaning: "A change of circumstances or fortune.",
    },
    {
      id: "h27",
      word: "Circumlocution",
      hint: "sir-kum-loh-KYOO-shun",
      meaning: "Using many words where fewer would do.",
    },
    {
      id: "h28",
      word: "Incontrovertible",
      hint: "in-kon-truh-VUR-tuh-bul",
      meaning: "Impossible to deny or dispute.",
    },
    {
      id: "h29",
      word: "Magnanimous",
      hint: "mag-NAN-uh-mus",
      meaning: "Very generous or forgiving.",
    },
    {
      id: "h30",
      word: "Obfuscation",
      hint: "ob-fus-KAY-shun",
      meaning: "The act of making something unclear.",
    },
    {
      id: "h31",
      word: "Perfunctory",
      hint: "per-FUNK-tuh-ree",
      meaning: "Done with little interest or effort.",
    },
    {
      id: "h32",
      word: "Recalcitrant",
      hint: "rih-KAL-sih-trunt",
      meaning: "Stubbornly refusing to obey authority.",
    },
    {
      id: "h33",
      word: "Ubiquitous",
      hint: "yoo-BIK-wih-tus",
      meaning: "Present or found everywhere.",
    },
    {
      id: "h34",
      word: "Lugubrious",
      hint: "loo-GOO-bree-us",
      meaning: "Looking or sounding sad and gloomy.",
    },
    {
      id: "h35",
      word: "Equanimity",
      hint: "ee-kwuh-NIM-ih-tee",
      meaning: "Mental calmness under pressure.",
    },
    {
      id: "h36",
      word: "Fastidious",
      hint: "fas-TID-ee-us",
      meaning: "Very attentive to detail; hard to please.",
    },
    {
      id: "h37",
      word: "Loquacious",
      hint: "loh-KWAY-shus",
      meaning: "Very talkative.",
    },
    {
      id: "h38",
      word: "Sycophant",
      hint: "SIK-uh-funt",
      meaning: "A person who flatters powerful people.",
    },
    {
      id: "h39",
      word: "Iconoclast",
      hint: "eye-KON-uh-klast",
      meaning: "Someone who attacks established beliefs.",
    },
    {
      id: "h40",
      word: "Munificent",
      hint: "myoo-NIF-ih-sunt",
      meaning: "Very generous.",
    },
    {
      id: "h41",
      word: "Obsequious",
      hint: "ub-SEE-kwee-us",
      meaning: "Overly obedient or flattering.",
    },
    {
      id: "h42",
      word: "Plethora",
      hint: "PLETH-er-uh",
      meaning: "An excessive amount.",
    },
    {
      id: "h43",
      word: "Sagacious",
      hint: "suh-GAY-shus",
      meaning: "Having good judgment and wisdom.",
    },
    {
      id: "h44",
      word: "Tenacious",
      hint: "tuh-NAY-shus",
      meaning: "Persistent and determined.",
    },
    {
      id: "h45",
      word: "Vituperative",
      hint: "vy-too-per-uh-tiv",
      meaning: "Harshly abusive in speech or writing.",
    },
    {
      id: "h46",
      word: "Abstemious",
      hint: "ab-STEE-mee-us",
      meaning: "Not indulging excessively in food or drink.",
    },
    {
      id: "h47",
      word: "Ebullient",
      hint: "ih-BULL-yunt",
      meaning: "Cheerful and energetic.",
    },
    {
      id: "h48",
      word: "Garrulous",
      hint: "GAR-uh-lus",
      meaning: "Excessively talkative.",
    },
    {
      id: "h49",
      word: "Impecunious",
      hint: "im-pih-KYOO-nee-us",
      meaning: "Having little or no money.",
    },
    {
      id: "h50",
      word: "Ineffable",
      hint: "in-EF-uh-bul",
      meaning: "Too great to be expressed in words.",
    },
    {
      id: "h51",
      word: "Laconic",
      hint: "luh-KON-ik",
      meaning: "Using very few words.",
    },
    {
      id: "h52",
      word: "Mellifluous",
      hint: "meh-LIF-loo-us",
      meaning: "Sweet or musical sounding.",
    },
    {
      id: "h53",
      word: "Nonplussed",
      hint: "non-PLUST",
      meaning: "Completely confused or surprised.",
    },
    {
      id: "h54",
      word: "Pernicious",
      hint: "per-NISH-us",
      meaning: "Very harmful or destructive.",
    },
    {
      id: "h55",
      word: "Quixotic",
      hint: "kwik-SOT-ik",
      meaning: "Idealistic but unrealistic.",
    },
    {
      id: "h56",
      word: "Soliloquy",
      hint: "suh-LIL-uh-kwee",
      meaning: "A speech given by a character alone on stage.",
    },
    {
      id: "h57",
      word: "Surreptitious",
      hint: "sur-up-TISH-us",
      meaning: "Kept secret, especially because it is improper.",
    },
    {
      id: "h58",
      word: "Taciturn",
      hint: "TAS-ih-turn",
      meaning: "Reserved or saying very little.",
    },
    {
      id: "h59",
      word: "Verisimilitude",
      hint: "ver-ih-sih-MIL-ih-tood",
      meaning: "The appearance of being true or real.",
    },
    {
      id: "h60",
      word: "Zeitgeist",
      hint: "ZYTE-gyst",
      meaning: "The defining spirit or mood of a particular period of history.",
    },
  ],
  sx = [
    {
      id: "t11",
      text: "Thirty-three thirsty thieves thought that they thrilled the throne throughout Thursday.",
    },
    { id: "t12", text: "Fred fed Ted bread, and Ted fed Fred bread." },
    { id: "t13", text: "Truly rural, truly rural, truly rural." },
    { id: "t14", text: "The sixth sick sheik's sixth sheep is sick." },
    { id: "t15", text: "Which wristwatches are Swiss wristwatches?" },
    { id: "t16", text: "Toy boat, toy boat, toy boat." },
    { id: "t17", text: "Freshly fried fresh flesh." },
    {
      id: "t18",
      text: "Lesser leather never weathered wetter weather better.",
    },
    { id: "t19", text: "A big black bug bit a big black bear." },
    { id: "t20", text: "Black background, brown background." },
    { id: "t21", text: "Blue bluebird blinks." },
    { id: "t22", text: "Can you can a can as a canner can can a can?" },
    { id: "t23", text: "Cooks cook cupcakes quickly." },
    { id: "t24", text: "Eleven benevolent elephants." },
    { id: "t25", text: "Four fine fresh fish for you." },
    { id: "t26", text: "Green glass globes glow greenly." },
    { id: "t27", text: "He threw three free throws." },
    { id: "t28", text: "Irish wristwatch, Swiss wristwatch." },
    { id: "t29", text: "I scream, you scream, we all scream for ice cream." },
    { id: "t30", text: "Near an ear, a nearer ear, a nearly eerie ear." },
    { id: "t31", text: "Nine nice night nurses nursing nicely." },
    {
      id: "t32",
      text: "Round and round the rugged rock the ragged rascal ran.",
    },
    { id: "t33", text: "Rolling red wagons race rapidly." },
    { id: "t34", text: "Really leery, rarely Larry." },
    { id: "t35", text: "Seven slick snakes slowly slid southward." },
    { id: "t36", text: "Silly Sally swiftly shooed seven silly sheep." },
    { id: "t37", text: "Slimy snakes slither silently." },
    { id: "t38", text: "Three gray geese in the green grass grazing." },
    { id: "t39", text: "Three free throws." },
    { id: "t40", text: "Two tiny tigers take two taxis to town." },
    { id: "t41", text: "Wayne went to Wales to watch walruses." },
    { id: "t42", text: "We surely shall see the sunshine soon." },
    { id: "t43", text: "Double bubble gum bubbles double." },
    { id: "t44", text: "Crisp crusts crackle crunchily." },
    { id: "t45", text: "Five frantic frogs fled from fifty fierce fish." },
    { id: "t46", text: "Busy buzzing bees buzz busily." },
    { id: "t47", text: "Tiny turtles tiptoe through the tulips." },
    { id: "t48", text: "Quick queens quietly question quirky quails." },
    { id: "t49", text: "Brisk brave brothers brought bright blue bricks." },
    { id: "t50", text: "Clever clowns clean colorful clothes carefully." },
    { id: "t51", text: "Happy hippos hop home happily." },
    { id: "t52", text: "Little Lucy likes licking lemon lollipops." },
    { id: "t53", text: "Many merry monkeys make messy music." },
    { id: "t54", text: "Noisy neighbors never notice new noises." },
    { id: "t55", text: "Perfect purple parrots proudly perform." },
    { id: "t56", text: "Quiet queens quickly quilt quirky quilts." },
    { id: "t57", text: "Rapid rabbits race around rocky roads." },
    { id: "t58", text: "Sharp sharks share shiny shells." },
    { id: "t59", text: "Tiny twin tigers twirled toward tall trees." },
    { id: "t60", text: "Zany zebras zigzag zealously through the zoo." },
  ],
  ix = [
    {
      id: "g1",
      text: "I have been working on this project since morning.",
      tense: "Present Perfect Continuous",
    },
    {
      id: "g2",
      text: "She finished the assignment before the deadline.",
      tense: "Simple Past",
    },
    {
      id: "g3",
      text: "By next month, I will have completed my final year project.",
      tense: "Future Perfect",
    },
    {
      id: "g4",
      text: "They are currently reviewing the pull request.",
      tense: "Present Continuous",
    },
    {
      id: "g5",
      text: "I had already deployed the app before the meeting started.",
      tense: "Past Perfect",
    },
    {
      id: "g6",
      text: "We will discuss the results tomorrow morning.",
      tense: "Simple Future",
    },
    {
      id: "g7",
      text: "He usually practices interview questions every evening.",
      tense: "Simple Present",
    },
    {
      id: "g8",
      text: "I was debugging the API when the server crashed.",
      tense: "Past Continuous",
    },
    {
      id: "g9",
      text: "By the time you arrive, I will be presenting my project.",
      tense: "Future Continuous",
    },
    {
      id: "g10",
      text: "She has completed three internships so far.",
      tense: "Present Perfect",
    },
  ],
  lx = { vocab: nx, hardWords: rx, tongueTwisters: sx, tenses: ix };
function ox(e, t) {
  const n = (l) =>
      l
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .split(/\s+/)
        .filter(Boolean),
    r = n(e),
    s = new Set(n(t));
  if (r.length === 0) return 0;
  const i = r.filter((l) => s.has(l)).length;
  return Math.round((i / r.length) * 100);
}
function ax() {
  const { type: e } = Bf(),
    t = Ne(),
    { practice: n } = xp,
    r = n.typeMeta[e],
    s = lx[e] || [],
    [i, l] = w.useState(0),
    [a, u] = w.useState(""),
    [d, f] = w.useState(!1),
    [p, g] = w.useState(!1),
    [y, j] = w.useState(!1),
    S = w.useRef(null),
    N = w.useRef(""),
    c = s[i],
    m = (c == null ? void 0 : c.word) || (c == null ? void 0 : c.text) || "";
  w.useEffect(
    () => () => {
      var O;
      return (O = S.current) == null ? void 0 : O.stop();
    },
    [],
  );
  const h = () => {
      const O = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!O) return;
      const U = new O();
      ((U.continuous = !0),
        (U.interimResults = !0),
        (U.lang = "en-IN"),
        (N.current = ""),
        u(""),
        g(!1),
        (U.onresult = (pe) => {
          let M = "";
          for (let V = pe.resultIndex; V < pe.results.length; V++) {
            const le = pe.results[V][0].transcript;
            pe.results[V].isFinal ? (N.current += le + " ") : (M += le);
          }
          u((N.current + " " + M).trim());
        }),
        (U.onerror = () => f(!1)),
        (U.onend = () => {
          (f(!1), g(!0));
        }),
        U.start(),
        (S.current = U),
        f(!0));
    },
    x = () => {
      var O;
      ((O = S.current) == null || O.stop(), f(!1), g(!0));
    },
    k = () => {
      (u(""), g(!1), (N.current = ""));
    },
    C = () => {
      if (i + 1 >= s.length) {
        j(!0);
        return;
      }
      (l(i + 1), k());
    },
    R = () => {
      (l(0), j(!1), k());
    };
  if (!r || s.length === 0)
    return o.jsxs("div", {
      className: "comm-practice-page",
      children: [
        o.jsx(ut, {}),
        o.jsxs("div", {
          className: "container comm-practice-main",
          children: [
            o.jsx("p", { children: "Invalid practice type." }),
            o.jsx("button", {
              className: "btn btn-secondary",
              onClick: () => t("/communication"),
              children: n.backButton,
            }),
          ],
        }),
      ],
    });
  if (y)
    return o.jsxs("div", {
      className: "comm-practice-page",
      children: [
        o.jsx(ut, {}),
        o.jsxs("div", {
          className: "container comm-practice-main comm-practice-complete",
          children: [
            o.jsx("h2", { children: n.completeHeading }),
            o.jsx("p", { children: n.completeSubtext }),
            o.jsxs("div", {
              className: "comm-practice-complete-actions",
              children: [
                o.jsx("button", {
                  className: "btn btn-secondary",
                  onClick: R,
                  children: n.restartButton,
                }),
                o.jsx("button", {
                  className: "btn btn-primary",
                  onClick: () => t("/communication"),
                  children: n.backButton,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  const T = p ? ox(m, a) : null,
    H =
      T === null
        ? ""
        : T >= 70
          ? n.matchGood
          : T >= 40
            ? n.matchOkay
            : n.matchLow;
  return o.jsxs("div", {
    className: "comm-practice-page",
    children: [
      o.jsx(ut, {}),
      o.jsxs("div", {
        className: "container comm-practice-main",
        children: [
          o.jsxs("button", {
            className: "comm-practice-back",
            onClick: () => t("/communication"),
            children: ["← ", n.backButton],
          }),
          o.jsx("h2", { className: "comm-practice-title", children: r.title }),
          o.jsx("p", {
            className: "comm-practice-instruction",
            children: r.instruction,
          }),
          o.jsxs("div", {
            className: "comm-practice-progress",
            children: [n.progressLabel, " ", i + 1, " / ", s.length],
          }),
          o.jsxs("div", {
            className: "comm-practice-card",
            children: [
              o.jsx("p", { className: "comm-practice-target", children: m }),
              c.hint &&
                o.jsxs("p", {
                  className: "comm-practice-hint",
                  children: ["/ ", c.hint, " /"],
                }),
              c.tense &&
                o.jsxs("p", {
                  className: "comm-practice-tense",
                  children: ["(", c.tense, ")"],
                }),
            ],
          }),
          o.jsx("div", {
            className: "comm-practice-mic-area",
            children: o.jsx("button", {
              className: `comm-practice-mic-btn ${d ? "listening" : ""}`,
              onClick: d ? x : h,
              children: d ? n.micListening : n.micStart,
            }),
          }),
          a &&
            o.jsxs("div", {
              className: "comm-practice-transcript",
              children: [
                o.jsxs("span", {
                  className: "comm-practice-transcript-label",
                  children: [n.yourSpeechLabel, ":"],
                }),
                " ",
                a,
              ],
            }),
          p &&
            o.jsxs("div", {
              className: "comm-practice-feedback",
              children: [
                o.jsxs("span", {
                  className: "comm-practice-score",
                  children: [T, "%"],
                }),
                " ",
                H,
              ],
            }),
          p &&
            (c.meaning || c.example) &&
            o.jsxs("div", {
              className: "comm-practice-details",
              children: [
                c.meaning &&
                  o.jsxs("p", {
                    children: [
                      o.jsxs("strong", { children: [n.meaningLabel, ":"] }),
                      " ",
                      c.meaning,
                    ],
                  }),
                c.example &&
                  o.jsxs("p", {
                    children: [
                      o.jsxs("strong", { children: [n.exampleLabel, ":"] }),
                      " ",
                      c.example,
                    ],
                  }),
              ],
            }),
          o.jsx("div", {
            className: "comm-practice-actions",
            children: o.jsx("button", {
              className: "btn btn-primary",
              onClick: C,
              children: i + 1 >= s.length ? n.finishButton : n.nextButton,
            }),
          }),
        ],
      }),
    ],
  });
}
const ux = {
    heading: "Admin sign in",
    subheading: "InterviewIQ admin portal",
    emailLabel: "Admin email",
    emailPlaceholder: "admin@interviewiq.in",
    passwordLabel: "Password",
    submitButton: "Sign in to admin",
    notAdmin: "This account does not have admin access.",
  },
  cx = {
    heading: "Admin dashboard",
    tabs: {
      overview: "Overview",
      users: "Users",
      interviews: "Interviews",
      ppdt: "PPDT",
    },
    stats: {
      totalUsers: "Total users",
      totalInterviews: "Interviews completed",
      totalPPDT: "PPDT sessions",
      avgScore: "Avg. interview score",
      recentSignups: "New this week",
    },
    tables: {
      users: {
        columns: [
          "Name",
          "Email",
          "Role",
          "Interviews",
          "Avg. score",
          "Joined",
        ],
      },
      interviews: {
        columns: ["User", "Role", "Type", "Difficulty", "Score", "Date"],
      },
      ppdt: { columns: ["User", "Image", "Difficulty", "Score", "Date"] },
    },
    emptyState: "No records found.",
    logout: "Sign out",
  },
  Sp = { login: ux, dashboard: cx };
function dx() {
  const e = Ne(),
    [t, n] = w.useState({ email: "", password: "" }),
    [r, s] = w.useState(""),
    [i, l] = w.useState(!1),
    a = Sp.login,
    u = async (d) => {
      var f, p;
      (d.preventDefault(), l(!0), s(""));
      try {
        const g = await ee.post("/auth/login", t);
        if (g.data.user.role !== "admin") {
          s(a.notAdmin);
          return;
        }
        (localStorage.setItem("iq_token", g.data.token), e("/admin/dashboard"));
      } catch (g) {
        s(
          ((p = (f = g.response) == null ? void 0 : f.data) == null
            ? void 0
            : p.message) || "Login failed",
        );
      } finally {
        l(!1);
      }
    };
  return o.jsx("div", {
    className: "admin-login-page",
    children: o.jsxs("div", {
      className: "admin-login-card card",
      children: [
        o.jsxs("div", {
          className: "admin-login-logo",
          children: [
            o.jsx("div", { className: "admin-logo-icon", children: "IQ" }),
            o.jsxs("div", {
              children: [
                o.jsx("div", {
                  style: { fontFamily: "var(--font-display)", fontWeight: 700 },
                  children: "InterviewIQ",
                }),
                o.jsx("div", {
                  style: {
                    fontSize: "0.75rem",
                    color: "var(--color-text-muted)",
                  },
                  children: "Admin portal",
                }),
              ],
            }),
          ],
        }),
        o.jsx("h2", {
          className: "section-heading mt-24 mb-8",
          children: a.heading,
        }),
        o.jsx("p", {
          className: "body-text mb-24",
          style: { fontSize: "0.875rem" },
          children: a.subheading,
        }),
        r &&
          o.jsx("div", { className: "alert alert-error mb-16", children: r }),
        o.jsxs("form", {
          onSubmit: u,
          style: { display: "flex", flexDirection: "column", gap: 16 },
          children: [
            o.jsxs("div", {
              className: "form-group",
              children: [
                o.jsx("label", {
                  className: "form-label",
                  children: a.emailLabel,
                }),
                o.jsx("input", {
                  className: "form-input",
                  type: "email",
                  placeholder: a.emailPlaceholder,
                  value: t.email,
                  onChange: (d) => n({ ...t, email: d.target.value }),
                  autoComplete: "email",
                }),
              ],
            }),
            o.jsxs("div", {
              className: "form-group",
              children: [
                o.jsx("label", {
                  className: "form-label",
                  children: a.passwordLabel,
                }),
                o.jsx("input", {
                  className: "form-input",
                  type: "password",
                  placeholder: "Password",
                  value: t.password,
                  onChange: (d) => n({ ...t, password: d.target.value }),
                  autoComplete: "current-password",
                }),
              ],
            }),
            o.jsx("button", {
              type: "submit",
              className: "btn btn-primary btn-full",
              disabled: i,
              children: i
                ? o.jsx("span", {
                    className: "spinner",
                    style: { borderTopColor: "#fff" },
                  })
                : a.submitButton,
            }),
          ],
        }),
      ],
    }),
  });
}
const fx = ["overview", "users", "interviews", "ppdt"];
function px() {
  const e = Ne(),
    t = Sp.dashboard,
    [n, r] = w.useState("overview"),
    [s, i] = w.useState(null),
    [l, a] = w.useState([]),
    [u, d] = w.useState([]),
    [f, p] = w.useState([]),
    [g, y] = w.useState(!1),
    j = async () => {
      const h = await ee.get("/admin/stats");
      i(h.data);
    },
    S = async () => {
      const h = await ee.get("/admin/users?limit=50");
      a(h.data.users);
    },
    N = async () => {
      const h = await ee.get("/admin/interview-records?limit=50");
      d(h.data.records);
    },
    c = async () => {
      const h = await ee.get("/admin/ppdt-records?limit=50");
      p(h.data.records);
    };
  w.useEffect(() => {
    (y(!0),
      (async () => {
        try {
          (await j(),
            n === "users" && (await S()),
            n === "interviews" && (await N()),
            n === "ppdt" && (await c()));
        } catch (x) {
          console.error(x);
        } finally {
          y(!1);
        }
      })());
  }, [n]);
  const m = () => {
    (localStorage.removeItem("iq_token"), e("/admin/login"));
  };
  return o.jsxs("div", {
    className: "page-wrapper",
    children: [
      o.jsx("div", {
        className: "admin-navbar",
        children: o.jsxs("div", {
          className: "container admin-navbar-inner",
          children: [
            o.jsxs("div", {
              className: "flex items-center gap-12",
              children: [
                o.jsx("div", { className: "admin-logo-icon", children: "IQ" }),
                o.jsxs("div", {
                  children: [
                    o.jsx("span", {
                      style: {
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                      },
                      children: "InterviewIQ",
                    }),
                    o.jsx("span", {
                      className: "badge badge-secondary",
                      style: { marginLeft: 10, fontSize: "0.7rem" },
                      children: "Admin",
                    }),
                  ],
                }),
              ],
            }),
            o.jsx("button", {
              className: "btn btn-ghost btn-sm",
              onClick: m,
              children: t.logout,
            }),
          ],
        }),
      }),
      o.jsxs("div", {
        className: "container admin-container",
        children: [
          o.jsx("div", {
            className: "flex items-center justify-between mb-24",
            children: o.jsx("h1", {
              className: "display-heading",
              children: t.heading,
            }),
          }),
          o.jsx("div", {
            className: "admin-tabs",
            children: fx.map((h) =>
              o.jsx(
                "button",
                {
                  className: `admin-tab ${n === h ? "active" : ""}`,
                  onClick: () => r(h),
                  children: t.tabs[h],
                },
                h,
              ),
            ),
          }),
          g &&
            o.jsx("div", {
              style: { textAlign: "center", paddingTop: 48 },
              children: o.jsx("div", {
                className: "spinner",
                style: { margin: "0 auto" },
              }),
            }),
          !g &&
            n === "overview" &&
            s &&
            o.jsx("div", {
              children: o.jsx("div", {
                className: "admin-stats-grid",
                children: [
                  { label: t.stats.totalUsers, value: s.totalUsers },
                  { label: t.stats.totalInterviews, value: s.totalInterviews },
                  { label: t.stats.totalPPDT, value: s.totalPPDT },
                  {
                    label: t.stats.avgScore,
                    value: s.avgInterviewScore
                      ? `${s.avgInterviewScore}/10`
                      : "—",
                  },
                  { label: t.stats.recentSignups, value: s.recentSignups },
                ].map((h) =>
                  o.jsxs(
                    "div",
                    {
                      className: "admin-stat-card card",
                      children: [
                        o.jsx("div", {
                          className: "admin-stat-value",
                          children: h.value,
                        }),
                        o.jsx("div", {
                          className: "admin-stat-label",
                          children: h.label,
                        }),
                      ],
                    },
                    h.label,
                  ),
                ),
              }),
            }),
          !g &&
            n === "users" &&
            o.jsx("div", {
              className: "card",
              style: { padding: 0 },
              children: o.jsx("div", {
                className: "table-wrapper",
                children: o.jsxs("table", {
                  children: [
                    o.jsx("thead", {
                      children: o.jsx("tr", {
                        children: t.tables.users.columns.map((h) =>
                          o.jsx("th", { children: h }, h),
                        ),
                      }),
                    }),
                    o.jsx("tbody", {
                      children:
                        l.length === 0
                          ? o.jsx("tr", {
                              children: o.jsx("td", {
                                colSpan: 6,
                                style: {
                                  textAlign: "center",
                                  color: "var(--color-text-muted)",
                                  padding: 32,
                                },
                                children: t.emptyState,
                              }),
                            })
                          : l.map((h) => {
                              var x, k;
                              return o.jsxs(
                                "tr",
                                {
                                  children: [
                                    o.jsx("td", {
                                      children: o.jsx("div", {
                                        style: { fontWeight: 500 },
                                        children: h.fullName,
                                      }),
                                    }),
                                    o.jsx("td", {
                                      style: {
                                        color: "var(--color-text-secondary)",
                                      },
                                      children: h.email,
                                    }),
                                    o.jsx("td", {
                                      children: o.jsx("span", {
                                        className: `badge ${h.role === "admin" ? "badge-secondary" : "badge-muted"}`,
                                        children: h.role,
                                      }),
                                    }),
                                    o.jsx("td", {
                                      children:
                                        ((x = h.stats) == null
                                          ? void 0
                                          : x.totalInterviews) ?? 0,
                                    }),
                                    o.jsx("td", {
                                      children:
                                        (k = h.stats) != null &&
                                        k.averageInterviewScore
                                          ? `${h.stats.averageInterviewScore}/10`
                                          : "—",
                                    }),
                                    o.jsx("td", {
                                      style: {
                                        color: "var(--color-text-secondary)",
                                        fontSize: "0.8125rem",
                                      },
                                      children: new Date(
                                        h.createdAt,
                                      ).toLocaleDateString("en-IN"),
                                    }),
                                  ],
                                },
                                h._id,
                              );
                            }),
                    }),
                  ],
                }),
              }),
            }),
          !g &&
            n === "interviews" &&
            o.jsx("div", {
              className: "card",
              style: { padding: 0 },
              children: o.jsx("div", {
                className: "table-wrapper",
                children: o.jsxs("table", {
                  children: [
                    o.jsx("thead", {
                      children: o.jsx("tr", {
                        children: t.tables.interviews.columns.map((h) =>
                          o.jsx("th", { children: h }, h),
                        ),
                      }),
                    }),
                    o.jsx("tbody", {
                      children:
                        u.length === 0
                          ? o.jsx("tr", {
                              children: o.jsx("td", {
                                colSpan: 6,
                                style: {
                                  textAlign: "center",
                                  color: "var(--color-text-muted)",
                                  padding: 32,
                                },
                                children: t.emptyState,
                              }),
                            })
                          : u.map((h) => {
                              var x, k;
                              return o.jsxs(
                                "tr",
                                {
                                  children: [
                                    o.jsxs("td", {
                                      children: [
                                        o.jsx("div", {
                                          style: { fontWeight: 500 },
                                          children:
                                            ((x = h.userId) == null
                                              ? void 0
                                              : x.fullName) || "—",
                                        }),
                                        o.jsx("div", {
                                          style: {
                                            fontSize: "0.8rem",
                                            color: "var(--color-text-muted)",
                                          },
                                          children:
                                            (k = h.userId) == null
                                              ? void 0
                                              : k.email,
                                        }),
                                      ],
                                    }),
                                    o.jsx("td", {
                                      children: h.targetRole || "—",
                                    }),
                                    o.jsx("td", {
                                      children: o.jsx("span", {
                                        className: "badge badge-muted",
                                        children: h.interviewType,
                                      }),
                                    }),
                                    o.jsx("td", {
                                      children: h.difficulty || "—",
                                    }),
                                    o.jsx("td", {
                                      style: {
                                        fontWeight: 600,
                                        color: "var(--color-primary)",
                                      },
                                      children: h.overallScore
                                        ? `${h.overallScore}/10`
                                        : "—",
                                    }),
                                    o.jsx("td", {
                                      style: {
                                        color: "var(--color-text-secondary)",
                                        fontSize: "0.8125rem",
                                      },
                                      children: new Date(
                                        h.createdAt,
                                      ).toLocaleDateString("en-IN"),
                                    }),
                                  ],
                                },
                                h._id,
                              );
                            }),
                    }),
                  ],
                }),
              }),
            }),
          !g &&
            n === "ppdt" &&
            o.jsx("div", {
              className: "card",
              style: { padding: 0 },
              children: o.jsx("div", {
                className: "table-wrapper",
                children: o.jsxs("table", {
                  children: [
                    o.jsx("thead", {
                      children: o.jsx("tr", {
                        children: t.tables.ppdt.columns.map((h) =>
                          o.jsx("th", { children: h }, h),
                        ),
                      }),
                    }),
                    o.jsx("tbody", {
                      children:
                        f.length === 0
                          ? o.jsx("tr", {
                              children: o.jsx("td", {
                                colSpan: 5,
                                style: {
                                  textAlign: "center",
                                  color: "var(--color-text-muted)",
                                  padding: 32,
                                },
                                children: t.emptyState,
                              }),
                            })
                          : f.map((h) => {
                              var x, k;
                              return o.jsxs(
                                "tr",
                                {
                                  children: [
                                    o.jsxs("td", {
                                      children: [
                                        o.jsx("div", {
                                          style: { fontWeight: 500 },
                                          children:
                                            ((x = h.userId) == null
                                              ? void 0
                                              : x.fullName) || "—",
                                        }),
                                        o.jsx("div", {
                                          style: {
                                            fontSize: "0.8rem",
                                            color: "var(--color-text-muted)",
                                          },
                                          children:
                                            (k = h.userId) == null
                                              ? void 0
                                              : k.email,
                                        }),
                                      ],
                                    }),
                                    o.jsx("td", {
                                      style: {
                                        color: "var(--color-text-secondary)",
                                      },
                                      children: h.imageId,
                                    }),
                                    o.jsx("td", {
                                      children: o.jsx("span", {
                                        className: "badge badge-muted",
                                        children: h.difficulty,
                                      }),
                                    }),
                                    o.jsx("td", {
                                      style: {
                                        fontWeight: 600,
                                        color: "var(--color-primary)",
                                      },
                                      children: h.overallScore
                                        ? `${h.overallScore}/10`
                                        : "—",
                                    }),
                                    o.jsx("td", {
                                      style: {
                                        color: "var(--color-text-secondary)",
                                        fontSize: "0.8125rem",
                                      },
                                      children: new Date(
                                        h.createdAt,
                                      ).toLocaleDateString("en-IN"),
                                    }),
                                  ],
                                },
                                h._id,
                              );
                            }),
                    }),
                  ],
                }),
              }),
            }),
        ],
      }),
    ],
  });
}
function Et({ children: e }) {
  const { user: t, loading: n } = xr();
  return n
    ? o.jsx("div", {
        className: "page-wrapper flex items-center justify-center",
        style: { minHeight: "100vh" },
        children: o.jsx("div", { className: "spinner" }),
      })
    : t
      ? e
      : o.jsx(cr, { to: "/auth", replace: !0 });
}
function hx({ children: e }) {
  const { user: t, loading: n } = xr();
  return n
    ? o.jsx("div", {
        className: "page-wrapper flex items-center justify-center",
        style: { minHeight: "100vh" },
        children: o.jsx("div", { className: "spinner" }),
      })
    : t
      ? t.role !== "admin"
        ? o.jsx(cr, { to: "/home", replace: !0 })
        : e
      : o.jsx(cr, { to: "/admin/login", replace: !0 });
}
function mx({ children: e }) {
  const { user: t, loading: n } = xr();
  return n ? null : t ? o.jsx(cr, { to: "/home", replace: !0 }) : e;
}
function gx() {
  return o.jsxs($g, {
    children: [
      o.jsx(we, {
        path: "/",
        element: o.jsx(cr, { to: "/auth", replace: !0 }),
      }),
      o.jsx(we, {
        path: "/auth",
        element: o.jsx(mx, { children: o.jsx(rw, {}) }),
      }),
      o.jsx(we, { path: "/forgot-password", element: o.jsx(sw, {}) }),
      o.jsx(we, { path: "/reset-password/:token", element: o.jsx(iw, {}) }),
      o.jsx(we, {
        path: "/home",
        element: o.jsx(Et, { children: o.jsx(fw, {}) }),
      }),
      o.jsx(we, {
        path: "/interview/setup",
        element: o.jsx(Et, { children: o.jsx(kw, {}) }),
      }),
      o.jsx(we, {
        path: "/interview/live",
        element: o.jsx(Et, { children: o.jsx(Dw, {}) }),
      }),
      o.jsx(we, {
        path: "/interview/result",
        element: o.jsx(Et, { children: o.jsx(Ww, {}) }),
      }),
      o.jsx(we, {
        path: "/interview/history",
        element: o.jsx(Et, { children: o.jsx(Vw, {}) }),
      }),
      o.jsx(we, {
        path: "/ppdt/setup",
        element: o.jsx(Et, { children: o.jsx(Gw, {}) }),
      }),
      o.jsx(we, {
        path: "/ppdt/live",
        element: o.jsx(Et, { children: o.jsx(Jw, {}) }),
      }),
      o.jsx(we, {
        path: "/ppdt/result",
        element: o.jsx(Et, { children: o.jsx(Xw, {}) }),
      }),
      o.jsx(we, {
        path: "/communication",
        element: o.jsx(Et, { children: o.jsx(tx, {}) }),
      }),
      o.jsx(we, {
        path: "/communication/practice/:type",
        element: o.jsx(Et, { children: o.jsx(ax, {}) }),
      }),
      o.jsx(we, { path: "/admin/login", element: o.jsx(dx, {}) }),
      o.jsx(we, {
        path: "/admin/dashboard",
        element: o.jsx(hx, { children: o.jsx(px, {}) }),
      }),
      o.jsx(we, {
        path: "*",
        element: o.jsx(cr, { to: "/home", replace: !0 }),
      }),
    ],
  });
}
function vx() {
  return o.jsx(Jy, { children: o.jsx(gx, {}) });
}
Ol.createRoot(document.getElementById("root")).render(
  o.jsx(_c.StrictMode, { children: o.jsx(Yg, { children: o.jsx(vx, {}) }) }),
);
