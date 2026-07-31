function wp(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const i = Object.getOwnPropertyDescriptor(r, l);
          i &&
            Object.defineProperty(
              e,
              l,
              i.get ? i : { enumerable: !0, get: () => r[l] },
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
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const i of l)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const i = {};
    return (
      l.integrity && (i.integrity = l.integrity),
      l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const i = n(l);
    fetch(l.href, i);
  }
})();
function xp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var cc = { exports: {} },
  ai = {},
  fc = { exports: {} },
  U = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zr = Symbol.for("react.element"),
  Sp = Symbol.for("react.portal"),
  Ep = Symbol.for("react.fragment"),
  kp = Symbol.for("react.strict_mode"),
  Rp = Symbol.for("react.profiler"),
  Np = Symbol.for("react.provider"),
  Cp = Symbol.for("react.context"),
  jp = Symbol.for("react.forward_ref"),
  Pp = Symbol.for("react.suspense"),
  Tp = Symbol.for("react.memo"),
  _p = Symbol.for("react.lazy"),
  Pa = Symbol.iterator;
function Lp(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Pa && e[Pa]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var dc = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  pc = Object.assign,
  hc = {};
function Hn(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = hc),
    (this.updater = n || dc));
}
Hn.prototype.isReactComponent = {};
Hn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Hn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function mc() {}
mc.prototype = Hn.prototype;
function ms(e, t, n) {
  ((this.props = e),
    (this.context = t),
    (this.refs = hc),
    (this.updater = n || dc));
}
var gs = (ms.prototype = new mc());
gs.constructor = ms;
pc(gs, Hn.prototype);
gs.isPureReactComponent = !0;
var Ta = Array.isArray,
  gc = Object.prototype.hasOwnProperty,
  vs = { current: null },
  vc = { key: !0, ref: !0, __self: !0, __source: !0 };
function yc(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      gc.call(t, r) && !vc.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var a = Array(s), u = 0; u < s; u++) a[u] = arguments[u + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) l[r] === void 0 && (l[r] = s[r]);
  return {
    $$typeof: zr,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: vs.current,
  };
}
function Op(e, t) {
  return {
    $$typeof: zr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ys(e) {
  return typeof e == "object" && e !== null && e.$$typeof === zr;
}
function Ip(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var _a = /\/+/g;
function Fi(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Ip("" + e.key)
    : t.toString(36);
}
function Sl(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (i) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case zr:
          case Sp:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (l = l(o)),
      (e = r === "" ? "." + Fi(o, 0) : r),
      Ta(l)
        ? ((n = ""),
          e != null && (n = e.replace(_a, "$&/") + "/"),
          Sl(l, t, n, "", function (u) {
            return u;
          }))
        : l != null &&
          (ys(l) &&
            (l = Op(
              l,
              n +
                (!l.key || (o && o.key === l.key)
                  ? ""
                  : ("" + l.key).replace(_a, "$&/") + "/") +
                e,
            )),
          t.push(l)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), Ta(e)))
    for (var s = 0; s < e.length; s++) {
      i = e[s];
      var a = r + Fi(i, s);
      o += Sl(i, t, n, a, l);
    }
  else if (((a = Lp(e)), typeof a == "function"))
    for (e = a.call(e), s = 0; !(i = e.next()).done; )
      ((i = i.value), (a = r + Fi(i, s++)), (o += Sl(i, t, n, a, l)));
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
  return o;
}
function el(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Sl(e, r, "", "", function (i) {
      return t.call(n, i, l++);
    }),
    r
  );
}
function Ap(e) {
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
var ke = { current: null },
  El = { transition: null },
  Fp = {
    ReactCurrentDispatcher: ke,
    ReactCurrentBatchConfig: El,
    ReactCurrentOwner: vs,
  };
function wc() {
  throw Error("act(...) is not supported in production builds of React.");
}
U.Children = {
  map: el,
  forEach: function (e, t, n) {
    el(
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
      el(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      el(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ys(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
U.Component = Hn;
U.Fragment = Ep;
U.Profiler = Rp;
U.PureComponent = ms;
U.StrictMode = kp;
U.Suspense = Pp;
U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fp;
U.act = wc;
U.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var r = pc({}, e.props),
    l = e.key,
    i = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (o = vs.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (a in t)
      gc.call(t, a) &&
        !vc.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var u = 0; u < a; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: zr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
U.createContext = function (e) {
  return (
    (e = {
      $$typeof: Cp,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Np, _context: e }),
    (e.Consumer = e)
  );
};
U.createElement = yc;
U.createFactory = function (e) {
  var t = yc.bind(null, e);
  return ((t.type = e), t);
};
U.createRef = function () {
  return { current: null };
};
U.forwardRef = function (e) {
  return { $$typeof: jp, render: e };
};
U.isValidElement = ys;
U.lazy = function (e) {
  return { $$typeof: _p, _payload: { _status: -1, _result: e }, _init: Ap };
};
U.memo = function (e, t) {
  return { $$typeof: Tp, type: e, compare: t === void 0 ? null : t };
};
U.startTransition = function (e) {
  var t = El.transition;
  El.transition = {};
  try {
    e();
  } finally {
    El.transition = t;
  }
};
U.unstable_act = wc;
U.useCallback = function (e, t) {
  return ke.current.useCallback(e, t);
};
U.useContext = function (e) {
  return ke.current.useContext(e);
};
U.useDebugValue = function () {};
U.useDeferredValue = function (e) {
  return ke.current.useDeferredValue(e);
};
U.useEffect = function (e, t) {
  return ke.current.useEffect(e, t);
};
U.useId = function () {
  return ke.current.useId();
};
U.useImperativeHandle = function (e, t, n) {
  return ke.current.useImperativeHandle(e, t, n);
};
U.useInsertionEffect = function (e, t) {
  return ke.current.useInsertionEffect(e, t);
};
U.useLayoutEffect = function (e, t) {
  return ke.current.useLayoutEffect(e, t);
};
U.useMemo = function (e, t) {
  return ke.current.useMemo(e, t);
};
U.useReducer = function (e, t, n) {
  return ke.current.useReducer(e, t, n);
};
U.useRef = function (e) {
  return ke.current.useRef(e);
};
U.useState = function (e) {
  return ke.current.useState(e);
};
U.useSyncExternalStore = function (e, t, n) {
  return ke.current.useSyncExternalStore(e, t, n);
};
U.useTransition = function () {
  return ke.current.useTransition();
};
U.version = "18.3.1";
fc.exports = U;
var E = fc.exports;
const xc = xp(E),
  Dp = wp({ __proto__: null, default: xc }, [E]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var zp = E,
  Up = Symbol.for("react.element"),
  Mp = Symbol.for("react.fragment"),
  Bp = Object.prototype.hasOwnProperty,
  $p = zp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Hp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sc(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  (n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (o = t.ref));
  for (r in t) Bp.call(t, r) && !Hp.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: Up,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: $p.current,
  };
}
ai.Fragment = Mp;
ai.jsx = Sc;
ai.jsxs = Sc;
cc.exports = ai;
var f = cc.exports,
  ho = {},
  Ec = { exports: {} },
  Ue = {},
  kc = { exports: {} },
  Rc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(C, O) {
    var A = C.length;
    C.push(O);
    e: for (; 0 < A; ) {
      var z = (A - 1) >>> 1,
        V = C[z];
      if (0 < l(V, O)) ((C[z] = O), (C[A] = V), (A = z));
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var O = C[0],
      A = C.pop();
    if (A !== O) {
      C[0] = A;
      e: for (var z = 0, V = C.length, $e = V >>> 1; z < $e; ) {
        var b = 2 * (z + 1) - 1,
          ft = C[b],
          de = b + 1,
          dt = C[de];
        if (0 > l(ft, A))
          de < V && 0 > l(dt, ft)
            ? ((C[z] = dt), (C[de] = A), (z = de))
            : ((C[z] = ft), (C[b] = A), (z = b));
        else if (de < V && 0 > l(dt, A)) ((C[z] = dt), (C[de] = A), (z = de));
        else break e;
      }
    }
    return O;
  }
  function l(C, O) {
    var A = C.sortIndex - O.sortIndex;
    return A !== 0 ? A : C.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var o = Date,
      s = o.now();
    e.unstable_now = function () {
      return o.now() - s;
    };
  }
  var a = [],
    u = [],
    c = 1,
    d = null,
    g = 3,
    S = !1,
    y = !1,
    w = !1,
    v = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(C) {
    for (var O = n(u); O !== null; ) {
      if (O.callback === null) r(u);
      else if (O.startTime <= C)
        (r(u), (O.sortIndex = O.expirationTime), t(a, O));
      else break;
      O = n(u);
    }
  }
  function k(C) {
    if (((w = !1), m(C), !y))
      if (n(a) !== null) ((y = !0), J(N));
      else {
        var O = n(u);
        O !== null && ct(k, O.startTime - C);
      }
  }
  function N(C, O) {
    ((y = !1), w && ((w = !1), p(_), (_ = -1)), (S = !0));
    var A = g;
    try {
      for (
        m(O), d = n(a);
        d !== null && (!(d.expirationTime > O) || (C && !H()));
      ) {
        var z = d.callback;
        if (typeof z == "function") {
          ((d.callback = null), (g = d.priorityLevel));
          var V = z(d.expirationTime <= O);
          ((O = e.unstable_now()),
            typeof V == "function" ? (d.callback = V) : d === n(a) && r(a),
            m(O));
        } else r(a);
        d = n(a);
      }
      if (d !== null) var $e = !0;
      else {
        var b = n(u);
        (b !== null && ct(k, b.startTime - O), ($e = !1));
      }
      return $e;
    } finally {
      ((d = null), (g = A), (S = !1));
    }
  }
  var P = !1,
    j = null,
    _ = -1,
    D = 5,
    L = -1;
  function H() {
    return !(e.unstable_now() - L < D);
  }
  function ue() {
    if (j !== null) {
      var C = e.unstable_now();
      L = C;
      var O = !0;
      try {
        O = j(!0, C);
      } finally {
        O ? ce() : ((P = !1), (j = null));
      }
    } else P = !1;
  }
  var ce;
  if (typeof h == "function")
    ce = function () {
      h(ue);
    };
  else if (typeof MessageChannel < "u") {
    var fe = new MessageChannel(),
      Be = fe.port2;
    ((fe.port1.onmessage = ue),
      (ce = function () {
        Be.postMessage(null);
      }));
  } else
    ce = function () {
      v(ue, 0);
    };
  function J(C) {
    ((j = C), P || ((P = !0), ce()));
  }
  function ct(C, O) {
    _ = v(function () {
      C(e.unstable_now());
    }, O);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (C) {
      C.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      y || S || ((y = !0), J(N));
    }),
    (e.unstable_forceFrameRate = function (C) {
      0 > C || 125 < C
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (D = 0 < C ? Math.floor(1e3 / C) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return g;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (C) {
      switch (g) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = g;
      }
      var A = g;
      g = O;
      try {
        return C();
      } finally {
        g = A;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (C, O) {
      switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          C = 3;
      }
      var A = g;
      g = C;
      try {
        return O();
      } finally {
        g = A;
      }
    }),
    (e.unstable_scheduleCallback = function (C, O, A) {
      var z = e.unstable_now();
      switch (
        (typeof A == "object" && A !== null
          ? ((A = A.delay), (A = typeof A == "number" && 0 < A ? z + A : z))
          : (A = z),
        C)
      ) {
        case 1:
          var V = -1;
          break;
        case 2:
          V = 250;
          break;
        case 5:
          V = 1073741823;
          break;
        case 4:
          V = 1e4;
          break;
        default:
          V = 5e3;
      }
      return (
        (V = A + V),
        (C = {
          id: c++,
          callback: O,
          priorityLevel: C,
          startTime: A,
          expirationTime: V,
          sortIndex: -1,
        }),
        A > z
          ? ((C.sortIndex = A),
            t(u, C),
            n(a) === null &&
              C === n(u) &&
              (w ? (p(_), (_ = -1)) : (w = !0), ct(k, A - z)))
          : ((C.sortIndex = V), t(a, C), y || S || ((y = !0), J(N))),
        C
      );
    }),
    (e.unstable_shouldYield = H),
    (e.unstable_wrapCallback = function (C) {
      var O = g;
      return function () {
        var A = g;
        g = O;
        try {
          return C.apply(this, arguments);
        } finally {
          g = A;
        }
      };
    }));
})(Rc);
kc.exports = Rc;
var Vp = kc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Wp = E,
  ze = Vp;
function R(e) {
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
var Nc = new Set(),
  yr = {};
function fn(e, t) {
  (An(e, t), An(e + "Capture", t));
}
function An(e, t) {
  for (yr[e] = t, e = 0; e < t.length; e++) Nc.add(t[e]);
}
var xt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  mo = Object.prototype.hasOwnProperty,
  Qp =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  La = {},
  Oa = {};
function qp(e) {
  return mo.call(Oa, e)
    ? !0
    : mo.call(La, e)
      ? !1
      : Qp.test(e)
        ? (Oa[e] = !0)
        : ((La[e] = !0), !1);
}
function Kp(e, t, n, r) {
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
  if (t === null || typeof t > "u" || Kp(e, t, n, r)) return !0;
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
function Re(e, t, n, r, l, i, o) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o));
}
var me = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    me[e] = new Re(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  me[t] = new Re(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  me[e] = new Re(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  me[e] = new Re(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    me[e] = new Re(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  me[e] = new Re(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  me[e] = new Re(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  me[e] = new Re(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  me[e] = new Re(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ws = /[\-:]([a-z])/g;
function xs(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ws, xs);
    me[t] = new Re(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ws, xs);
    me[t] = new Re(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ws, xs);
  me[t] = new Re(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  me[e] = new Re(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
me.xlinkHref = new Re(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  me[e] = new Re(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Ss(e, t, n, r) {
  var l = me.hasOwnProperty(t) ? me[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Jp(t, n, l, r) && (n = null),
    r || l === null
      ? qp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
        ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
        : ((t = l.attributeName),
          (r = l.attributeNamespace),
          n === null
            ? e.removeAttribute(t)
            : ((l = l.type),
              (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
              r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Rt = Wp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  tl = Symbol.for("react.element"),
  gn = Symbol.for("react.portal"),
  vn = Symbol.for("react.fragment"),
  Es = Symbol.for("react.strict_mode"),
  go = Symbol.for("react.profiler"),
  Cc = Symbol.for("react.provider"),
  jc = Symbol.for("react.context"),
  ks = Symbol.for("react.forward_ref"),
  vo = Symbol.for("react.suspense"),
  yo = Symbol.for("react.suspense_list"),
  Rs = Symbol.for("react.memo"),
  Ct = Symbol.for("react.lazy"),
  Pc = Symbol.for("react.offscreen"),
  Ia = Symbol.iterator;
function Xn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ia && e[Ia]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Z = Object.assign,
  Di;
function lr(e) {
  if (Di === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Di = (t && t[1]) || "";
    }
  return (
    `
` +
    Di +
    e
  );
}
var zi = !1;
function Ui(e, t) {
  if (!e || zi) return "";
  zi = !0;
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
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var l = u.stack.split(`
`),
          i = r.stack.split(`
`),
          o = l.length - 1,
          s = i.length - 1;
        1 <= o && 0 <= s && l[o] !== i[s];
      )
        s--;
      for (; 1 <= o && 0 <= s; o--, s--)
        if (l[o] !== i[s]) {
          if (o !== 1 || s !== 1)
            do
              if ((o--, s--, 0 > s || l[o] !== i[s])) {
                var a =
                  `
` + l[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= o && 0 <= s);
          break;
        }
    }
  } finally {
    ((zi = !1), (Error.prepareStackTrace = n));
  }
  return (e = e ? e.displayName || e.name : "") ? lr(e) : "";
}
function Xp(e) {
  switch (e.tag) {
    case 5:
      return lr(e.type);
    case 16:
      return lr("Lazy");
    case 13:
      return lr("Suspense");
    case 19:
      return lr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = Ui(e.type, !1)), e);
    case 11:
      return ((e = Ui(e.type.render, !1)), e);
    case 1:
      return ((e = Ui(e.type, !0)), e);
    default:
      return "";
  }
}
function wo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case vn:
      return "Fragment";
    case gn:
      return "Portal";
    case go:
      return "Profiler";
    case Es:
      return "StrictMode";
    case vo:
      return "Suspense";
    case yo:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case jc:
        return (e.displayName || "Context") + ".Consumer";
      case Cc:
        return (e._context.displayName || "Context") + ".Provider";
      case ks:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Rs:
        return (
          (t = e.displayName || null),
          t !== null ? t : wo(e.type) || "Memo"
        );
      case Ct:
        ((t = e._payload), (e = e._init));
        try {
          return wo(e(t));
        } catch {}
    }
  return null;
}
function bp(e) {
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
      return wo(t);
    case 8:
      return t === Es ? "StrictMode" : "Mode";
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
function Ht(e) {
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
function Tc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Yp(e) {
  var t = Tc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (o) {
          ((r = "" + o), i.call(this, o));
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function nl(e) {
  e._valueTracker || (e._valueTracker = Yp(e));
}
function _c(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Tc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Dl(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function xo(e, t) {
  var n = t.checked;
  return Z({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Aa(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  ((n = Ht(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function Lc(e, t) {
  ((t = t.checked), t != null && Ss(e, "checked", t, !1));
}
function So(e, t) {
  Lc(e, t);
  var n = Ht(t.value),
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
    ? Eo(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Eo(e, t.type, Ht(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Fa(e, t, n) {
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
function Eo(e, t, n) {
  (t !== "number" || Dl(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var ir = Array.isArray;
function Pn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      ((l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0));
  } else {
    for (n = "" + Ht(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        ((e[l].selected = !0), r && (e[l].defaultSelected = !0));
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function ko(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(R(91));
  return Z({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Da(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(R(92));
      if (ir(n)) {
        if (1 < n.length) throw Error(R(93));
        n = n[0];
      }
      t = n;
    }
    (t == null && (t = ""), (n = t));
  }
  e._wrapperState = { initialValue: Ht(n) };
}
function Oc(e, t) {
  var n = Ht(t.value),
    r = Ht(t.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r));
}
function za(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ic(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ro(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Ic(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var rl,
  Ac = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        rl = rl || document.createElement("div"),
          rl.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = rl.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function wr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ur = {
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
  Gp = ["Webkit", "ms", "Moz", "O"];
Object.keys(ur).forEach(function (e) {
  Gp.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (ur[t] = ur[e]));
  });
});
function Fc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (ur.hasOwnProperty(e) && ur[e])
      ? ("" + t).trim()
      : t + "px";
}
function Dc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Fc(n, t[n], r);
      (n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l));
    }
}
var Zp = Z(
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
function No(e, t) {
  if (t) {
    if (Zp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(R(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(R(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(R(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(R(62));
  }
}
function Co(e, t) {
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
var jo = null;
function Ns(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Po = null,
  Tn = null,
  _n = null;
function Ua(e) {
  if ((e = Br(e))) {
    if (typeof Po != "function") throw Error(R(280));
    var t = e.stateNode;
    t && ((t = pi(t)), Po(e.stateNode, e.type, t));
  }
}
function zc(e) {
  Tn ? (_n ? _n.push(e) : (_n = [e])) : (Tn = e);
}
function Uc() {
  if (Tn) {
    var e = Tn,
      t = _n;
    if (((_n = Tn = null), Ua(e), t)) for (e = 0; e < t.length; e++) Ua(t[e]);
  }
}
function Mc(e, t) {
  return e(t);
}
function Bc() {}
var Mi = !1;
function $c(e, t, n) {
  if (Mi) return e(t, n);
  Mi = !0;
  try {
    return Mc(e, t, n);
  } finally {
    ((Mi = !1), (Tn !== null || _n !== null) && (Bc(), Uc()));
  }
}
function xr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = pi(n);
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
  if (n && typeof n != "function") throw Error(R(231, t, typeof n));
  return n;
}
var To = !1;
if (xt)
  try {
    var bn = {};
    (Object.defineProperty(bn, "passive", {
      get: function () {
        To = !0;
      },
    }),
      window.addEventListener("test", bn, bn),
      window.removeEventListener("test", bn, bn));
  } catch {
    To = !1;
  }
function eh(e, t, n, r, l, i, o, s, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (c) {
    this.onError(c);
  }
}
var cr = !1,
  zl = null,
  Ul = !1,
  _o = null,
  th = {
    onError: function (e) {
      ((cr = !0), (zl = e));
    },
  };
function nh(e, t, n, r, l, i, o, s, a) {
  ((cr = !1), (zl = null), eh.apply(th, arguments));
}
function rh(e, t, n, r, l, i, o, s, a) {
  if ((nh.apply(this, arguments), cr)) {
    if (cr) {
      var u = zl;
      ((cr = !1), (zl = null));
    } else throw Error(R(198));
    Ul || ((Ul = !0), (_o = u));
  }
}
function dn(e) {
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
function Hc(e) {
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
function Ma(e) {
  if (dn(e) !== e) throw Error(R(188));
}
function lh(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = dn(e)), t === null)) throw Error(R(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return (Ma(l), e);
        if (i === r) return (Ma(l), t);
        i = i.sibling;
      }
      throw Error(R(188));
    }
    if (n.return !== r.return) ((n = l), (r = i));
    else {
      for (var o = !1, s = l.child; s; ) {
        if (s === n) {
          ((o = !0), (n = l), (r = i));
          break;
        }
        if (s === r) {
          ((o = !0), (r = l), (n = i));
          break;
        }
        s = s.sibling;
      }
      if (!o) {
        for (s = i.child; s; ) {
          if (s === n) {
            ((o = !0), (n = i), (r = l));
            break;
          }
          if (s === r) {
            ((o = !0), (r = i), (n = l));
            break;
          }
          s = s.sibling;
        }
        if (!o) throw Error(R(189));
      }
    }
    if (n.alternate !== r) throw Error(R(190));
  }
  if (n.tag !== 3) throw Error(R(188));
  return n.stateNode.current === n ? e : t;
}
function Vc(e) {
  return ((e = lh(e)), e !== null ? Wc(e) : null);
}
function Wc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Wc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Qc = ze.unstable_scheduleCallback,
  Ba = ze.unstable_cancelCallback,
  ih = ze.unstable_shouldYield,
  oh = ze.unstable_requestPaint,
  te = ze.unstable_now,
  sh = ze.unstable_getCurrentPriorityLevel,
  Cs = ze.unstable_ImmediatePriority,
  qc = ze.unstable_UserBlockingPriority,
  Ml = ze.unstable_NormalPriority,
  ah = ze.unstable_LowPriority,
  Kc = ze.unstable_IdlePriority,
  ui = null,
  at = null;
function uh(e) {
  if (at && typeof at.onCommitFiberRoot == "function")
    try {
      at.onCommitFiberRoot(ui, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var tt = Math.clz32 ? Math.clz32 : dh,
  ch = Math.log,
  fh = Math.LN2;
function dh(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - ((ch(e) / fh) | 0)) | 0);
}
var ll = 64,
  il = 4194304;
function or(e) {
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
function Bl(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var s = o & ~l;
    s !== 0 ? (r = or(s)) : ((i &= o), i !== 0 && (r = or(i)));
  } else ((o = n & ~l), o !== 0 ? (r = or(o)) : i !== 0 && (r = or(i)));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      ((n = 31 - tt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l));
  return r;
}
function ph(e, t) {
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
function hh(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;
  ) {
    var o = 31 - tt(i),
      s = 1 << o,
      a = l[o];
    (a === -1
      ? (!(s & n) || s & r) && (l[o] = ph(s, t))
      : a <= t && (e.expiredLanes |= s),
      (i &= ~s));
  }
}
function Lo(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Jc() {
  var e = ll;
  return ((ll <<= 1), !(ll & 4194240) && (ll = 64), e);
}
function Bi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ur(e, t, n) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - tt(t)),
    (e[t] = n));
}
function mh(e, t) {
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
    var l = 31 - tt(n),
      i = 1 << l;
    ((t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i));
  }
}
function js(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - tt(n),
      l = 1 << r;
    ((l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l));
  }
}
var W = 0;
function Xc(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var bc,
  Ps,
  Yc,
  Gc,
  Zc,
  Oo = !1,
  ol = [],
  It = null,
  At = null,
  Ft = null,
  Sr = new Map(),
  Er = new Map(),
  Pt = [],
  gh =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function $a(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      It = null;
      break;
    case "dragenter":
    case "dragleave":
      At = null;
      break;
    case "mouseover":
    case "mouseout":
      Ft = null;
      break;
    case "pointerover":
    case "pointerout":
      Sr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Er.delete(t.pointerId);
  }
}
function Yn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = Br(t)), t !== null && Ps(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function vh(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ((It = Yn(It, e, t, n, r, l)), !0);
    case "dragenter":
      return ((At = Yn(At, e, t, n, r, l)), !0);
    case "mouseover":
      return ((Ft = Yn(Ft, e, t, n, r, l)), !0);
    case "pointerover":
      var i = l.pointerId;
      return (Sr.set(i, Yn(Sr.get(i) || null, e, t, n, r, l)), !0);
    case "gotpointercapture":
      return (
        (i = l.pointerId),
        Er.set(i, Yn(Er.get(i) || null, e, t, n, r, l)),
        !0
      );
  }
  return !1;
}
function ef(e) {
  var t = Yt(e.target);
  if (t !== null) {
    var n = dn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Hc(n)), t !== null)) {
          ((e.blockedOn = t),
            Zc(e.priority, function () {
              Yc(n);
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
function kl(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Io(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((jo = r), n.target.dispatchEvent(r), (jo = null));
    } else return ((t = Br(n)), t !== null && Ps(t), (e.blockedOn = n), !1);
    t.shift();
  }
  return !0;
}
function Ha(e, t, n) {
  kl(e) && n.delete(t);
}
function yh() {
  ((Oo = !1),
    It !== null && kl(It) && (It = null),
    At !== null && kl(At) && (At = null),
    Ft !== null && kl(Ft) && (Ft = null),
    Sr.forEach(Ha),
    Er.forEach(Ha));
}
function Gn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Oo ||
      ((Oo = !0),
      ze.unstable_scheduleCallback(ze.unstable_NormalPriority, yh)));
}
function kr(e) {
  function t(l) {
    return Gn(l, e);
  }
  if (0 < ol.length) {
    Gn(ol[0], e);
    for (var n = 1; n < ol.length; n++) {
      var r = ol[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    It !== null && Gn(It, e),
      At !== null && Gn(At, e),
      Ft !== null && Gn(Ft, e),
      Sr.forEach(t),
      Er.forEach(t),
      n = 0;
    n < Pt.length;
    n++
  )
    ((r = Pt[n]), r.blockedOn === e && (r.blockedOn = null));
  for (; 0 < Pt.length && ((n = Pt[0]), n.blockedOn === null); )
    (ef(n), n.blockedOn === null && Pt.shift());
}
var Ln = Rt.ReactCurrentBatchConfig,
  $l = !0;
function wh(e, t, n, r) {
  var l = W,
    i = Ln.transition;
  Ln.transition = null;
  try {
    ((W = 1), Ts(e, t, n, r));
  } finally {
    ((W = l), (Ln.transition = i));
  }
}
function xh(e, t, n, r) {
  var l = W,
    i = Ln.transition;
  Ln.transition = null;
  try {
    ((W = 4), Ts(e, t, n, r));
  } finally {
    ((W = l), (Ln.transition = i));
  }
}
function Ts(e, t, n, r) {
  if ($l) {
    var l = Io(e, t, n, r);
    if (l === null) (bi(e, t, r, Hl, n), $a(e, r));
    else if (vh(l, e, t, n, r)) r.stopPropagation();
    else if (($a(e, r), t & 4 && -1 < gh.indexOf(e))) {
      for (; l !== null; ) {
        var i = Br(l);
        if (
          (i !== null && bc(i),
          (i = Io(e, t, n, r)),
          i === null && bi(e, t, r, Hl, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else bi(e, t, r, null, n);
  }
}
var Hl = null;
function Io(e, t, n, r) {
  if (((Hl = null), (e = Ns(r)), (e = Yt(e)), e !== null))
    if (((t = dn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Hc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((Hl = e), null);
}
function tf(e) {
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
      switch (sh()) {
        case Cs:
          return 1;
        case qc:
          return 4;
        case Ml:
        case ah:
          return 16;
        case Kc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var _t = null,
  _s = null,
  Rl = null;
function nf() {
  if (Rl) return Rl;
  var e,
    t = _s,
    n = t.length,
    r,
    l = "value" in _t ? _t.value : _t.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return (Rl = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Nl(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function sl() {
  return !0;
}
function Va() {
  return !1;
}
function Me(e) {
  function t(n, r, l, i, o) {
    ((this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null));
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(i) : i[s]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? sl
        : Va),
      (this.isPropagationStopped = Va),
      this
    );
  }
  return (
    Z(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = sl));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = sl));
      },
      persist: function () {},
      isPersistent: sl,
    }),
    t
  );
}
var Vn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Ls = Me(Vn),
  Mr = Z({}, Vn, { view: 0, detail: 0 }),
  Sh = Me(Mr),
  $i,
  Hi,
  Zn,
  ci = Z({}, Mr, {
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
    getModifierState: Os,
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
        : (e !== Zn &&
            (Zn && e.type === "mousemove"
              ? (($i = e.screenX - Zn.screenX), (Hi = e.screenY - Zn.screenY))
              : (Hi = $i = 0),
            (Zn = e)),
          $i);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Hi;
    },
  }),
  Wa = Me(ci),
  Eh = Z({}, ci, { dataTransfer: 0 }),
  kh = Me(Eh),
  Rh = Z({}, Mr, { relatedTarget: 0 }),
  Vi = Me(Rh),
  Nh = Z({}, Vn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Ch = Me(Nh),
  jh = Z({}, Vn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Ph = Me(jh),
  Th = Z({}, Vn, { data: 0 }),
  Qa = Me(Th),
  _h = {
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
  Lh = {
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
  Oh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Ih(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Oh[e]) ? !!t[e] : !1;
}
function Os() {
  return Ih;
}
var Ah = Z({}, Mr, {
    key: function (e) {
      if (e.key) {
        var t = _h[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Nl(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? Lh[e.keyCode] || "Unidentified"
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
    getModifierState: Os,
    charCode: function (e) {
      return e.type === "keypress" ? Nl(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Nl(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  Fh = Me(Ah),
  Dh = Z({}, ci, {
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
  qa = Me(Dh),
  zh = Z({}, Mr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Os,
  }),
  Uh = Me(zh),
  Mh = Z({}, Vn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Bh = Me(Mh),
  $h = Z({}, ci, {
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
  Hh = Me($h),
  Vh = [9, 13, 27, 32],
  Is = xt && "CompositionEvent" in window,
  fr = null;
xt && "documentMode" in document && (fr = document.documentMode);
var Wh = xt && "TextEvent" in window && !fr,
  rf = xt && (!Is || (fr && 8 < fr && 11 >= fr)),
  Ka = " ",
  Ja = !1;
function lf(e, t) {
  switch (e) {
    case "keyup":
      return Vh.indexOf(t.keyCode) !== -1;
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
function of(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var yn = !1;
function Qh(e, t) {
  switch (e) {
    case "compositionend":
      return of(t);
    case "keypress":
      return t.which !== 32 ? null : ((Ja = !0), Ka);
    case "textInput":
      return ((e = t.data), e === Ka && Ja ? null : e);
    default:
      return null;
  }
}
function qh(e, t) {
  if (yn)
    return e === "compositionend" || (!Is && lf(e, t))
      ? ((e = nf()), (Rl = _s = _t = null), (yn = !1), e)
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
      return rf && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Kh = {
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
function Xa(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Kh[e.type] : t === "textarea";
}
function sf(e, t, n, r) {
  (zc(r),
    (t = Vl(t, "onChange")),
    0 < t.length &&
      ((n = new Ls("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t })));
}
var dr = null,
  Rr = null;
function Jh(e) {
  yf(e, 0);
}
function fi(e) {
  var t = Sn(e);
  if (_c(t)) return e;
}
function Xh(e, t) {
  if (e === "change") return t;
}
var af = !1;
if (xt) {
  var Wi;
  if (xt) {
    var Qi = "oninput" in document;
    if (!Qi) {
      var ba = document.createElement("div");
      (ba.setAttribute("oninput", "return;"),
        (Qi = typeof ba.oninput == "function"));
    }
    Wi = Qi;
  } else Wi = !1;
  af = Wi && (!document.documentMode || 9 < document.documentMode);
}
function Ya() {
  dr && (dr.detachEvent("onpropertychange", uf), (Rr = dr = null));
}
function uf(e) {
  if (e.propertyName === "value" && fi(Rr)) {
    var t = [];
    (sf(t, Rr, e, Ns(e)), $c(Jh, t));
  }
}
function bh(e, t, n) {
  e === "focusin"
    ? (Ya(), (dr = t), (Rr = n), dr.attachEvent("onpropertychange", uf))
    : e === "focusout" && Ya();
}
function Yh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return fi(Rr);
}
function Gh(e, t) {
  if (e === "click") return fi(t);
}
function Zh(e, t) {
  if (e === "input" || e === "change") return fi(t);
}
function em(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var rt = typeof Object.is == "function" ? Object.is : em;
function Nr(e, t) {
  if (rt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!mo.call(t, l) || !rt(e[l], t[l])) return !1;
  }
  return !0;
}
function Ga(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Za(e, t) {
  var n = Ga(e);
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
    n = Ga(n);
  }
}
function cf(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? cf(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function ff() {
  for (var e = window, t = Dl(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Dl(e.document);
  }
  return t;
}
function As(e) {
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
function tm(e) {
  var t = ff(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    cf(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && As(n)) {
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
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        ((r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = Za(n, i)));
        var o = Za(n, r);
        l &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
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
var nm = xt && "documentMode" in document && 11 >= document.documentMode,
  wn = null,
  Ao = null,
  pr = null,
  Fo = !1;
function eu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Fo ||
    wn == null ||
    wn !== Dl(r) ||
    ((r = wn),
    "selectionStart" in r && As(r)
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
    (pr && Nr(pr, r)) ||
      ((pr = r),
      (r = Vl(Ao, "onSelect")),
      0 < r.length &&
        ((t = new Ls("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = wn))));
}
function al(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var xn = {
    animationend: al("Animation", "AnimationEnd"),
    animationiteration: al("Animation", "AnimationIteration"),
    animationstart: al("Animation", "AnimationStart"),
    transitionend: al("Transition", "TransitionEnd"),
  },
  qi = {},
  df = {};
xt &&
  ((df = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete xn.animationend.animation,
    delete xn.animationiteration.animation,
    delete xn.animationstart.animation),
  "TransitionEvent" in window || delete xn.transitionend.transition);
function di(e) {
  if (qi[e]) return qi[e];
  if (!xn[e]) return e;
  var t = xn[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in df) return (qi[e] = t[n]);
  return e;
}
var pf = di("animationend"),
  hf = di("animationiteration"),
  mf = di("animationstart"),
  gf = di("transitionend"),
  vf = new Map(),
  tu =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Wt(e, t) {
  (vf.set(e, t), fn(t, [e]));
}
for (var Ki = 0; Ki < tu.length; Ki++) {
  var Ji = tu[Ki],
    rm = Ji.toLowerCase(),
    lm = Ji[0].toUpperCase() + Ji.slice(1);
  Wt(rm, "on" + lm);
}
Wt(pf, "onAnimationEnd");
Wt(hf, "onAnimationIteration");
Wt(mf, "onAnimationStart");
Wt("dblclick", "onDoubleClick");
Wt("focusin", "onFocus");
Wt("focusout", "onBlur");
Wt(gf, "onTransitionEnd");
An("onMouseEnter", ["mouseout", "mouseover"]);
An("onMouseLeave", ["mouseout", "mouseover"]);
An("onPointerEnter", ["pointerout", "pointerover"]);
An("onPointerLeave", ["pointerout", "pointerover"]);
fn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
fn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
fn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
fn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
fn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var sr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  im = new Set("cancel close invalid load scroll toggle".split(" ").concat(sr));
function nu(e, t, n) {
  var r = e.type || "unknown-event";
  ((e.currentTarget = n), rh(r, t, void 0, e), (e.currentTarget = null));
}
function yf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var s = r[o],
            a = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), a !== i && l.isPropagationStopped())) break e;
          (nu(l, s, u), (i = a));
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((s = r[o]),
            (a = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            a !== i && l.isPropagationStopped())
          )
            break e;
          (nu(l, s, u), (i = a));
        }
    }
  }
  if (Ul) throw ((e = _o), (Ul = !1), (_o = null), e);
}
function q(e, t) {
  var n = t[Bo];
  n === void 0 && (n = t[Bo] = new Set());
  var r = e + "__bubble";
  n.has(r) || (wf(t, e, 2, !1), n.add(r));
}
function Xi(e, t, n) {
  var r = 0;
  (t && (r |= 4), wf(n, e, r, t));
}
var ul = "_reactListening" + Math.random().toString(36).slice(2);
function Cr(e) {
  if (!e[ul]) {
    ((e[ul] = !0),
      Nc.forEach(function (n) {
        n !== "selectionchange" && (im.has(n) || Xi(n, !1, e), Xi(n, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ul] || ((t[ul] = !0), Xi("selectionchange", !1, t));
  }
}
function wf(e, t, n, r) {
  switch (tf(t)) {
    case 1:
      var l = wh;
      break;
    case 4:
      l = xh;
      break;
    default:
      l = Ts;
  }
  ((n = l.bind(null, t, n, e)),
    (l = void 0),
    !To ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
        ? e.addEventListener(t, n, { passive: l })
        : e.addEventListener(t, n, !1));
}
function bi(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var s = r.stateNode.containerInfo;
        if (s === l || (s.nodeType === 8 && s.parentNode === l)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var a = o.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = o.stateNode.containerInfo),
              a === l || (a.nodeType === 8 && a.parentNode === l))
            )
              return;
            o = o.return;
          }
        for (; s !== null; ) {
          if (((o = Yt(s)), o === null)) return;
          if (((a = o.tag), a === 5 || a === 6)) {
            r = i = o;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  $c(function () {
    var u = i,
      c = Ns(n),
      d = [];
    e: {
      var g = vf.get(e);
      if (g !== void 0) {
        var S = Ls,
          y = e;
        switch (e) {
          case "keypress":
            if (Nl(n) === 0) break e;
          case "keydown":
          case "keyup":
            S = Fh;
            break;
          case "focusin":
            ((y = "focus"), (S = Vi));
            break;
          case "focusout":
            ((y = "blur"), (S = Vi));
            break;
          case "beforeblur":
          case "afterblur":
            S = Vi;
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
            S = Wa;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = kh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = Uh;
            break;
          case pf:
          case hf:
          case mf:
            S = Ch;
            break;
          case gf:
            S = Bh;
            break;
          case "scroll":
            S = Sh;
            break;
          case "wheel":
            S = Hh;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = Ph;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = qa;
        }
        var w = (t & 4) !== 0,
          v = !w && e === "scroll",
          p = w ? (g !== null ? g + "Capture" : null) : g;
        w = [];
        for (var h = u, m; h !== null; ) {
          m = h;
          var k = m.stateNode;
          if (
            (m.tag === 5 &&
              k !== null &&
              ((m = k),
              p !== null && ((k = xr(h, p)), k != null && w.push(jr(h, k, m)))),
            v)
          )
            break;
          h = h.return;
        }
        0 < w.length &&
          ((g = new S(g, y, null, n, c)), d.push({ event: g, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((g = e === "mouseover" || e === "pointerover"),
          (S = e === "mouseout" || e === "pointerout"),
          g &&
            n !== jo &&
            (y = n.relatedTarget || n.fromElement) &&
            (Yt(y) || y[St]))
        )
          break e;
        if (
          (S || g) &&
          ((g =
            c.window === c
              ? c
              : (g = c.ownerDocument)
                ? g.defaultView || g.parentWindow
                : window),
          S
            ? ((y = n.relatedTarget || n.toElement),
              (S = u),
              (y = y ? Yt(y) : null),
              y !== null &&
                ((v = dn(y)), y !== v || (y.tag !== 5 && y.tag !== 6)) &&
                (y = null))
            : ((S = null), (y = u)),
          S !== y)
        ) {
          if (
            ((w = Wa),
            (k = "onMouseLeave"),
            (p = "onMouseEnter"),
            (h = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((w = qa),
              (k = "onPointerLeave"),
              (p = "onPointerEnter"),
              (h = "pointer")),
            (v = S == null ? g : Sn(S)),
            (m = y == null ? g : Sn(y)),
            (g = new w(k, h + "leave", S, n, c)),
            (g.target = v),
            (g.relatedTarget = m),
            (k = null),
            Yt(c) === u &&
              ((w = new w(p, h + "enter", y, n, c)),
              (w.target = m),
              (w.relatedTarget = v),
              (k = w)),
            (v = k),
            S && y)
          )
            t: {
              for (w = S, p = y, h = 0, m = w; m; m = hn(m)) h++;
              for (m = 0, k = p; k; k = hn(k)) m++;
              for (; 0 < h - m; ) ((w = hn(w)), h--);
              for (; 0 < m - h; ) ((p = hn(p)), m--);
              for (; h--; ) {
                if (w === p || (p !== null && w === p.alternate)) break t;
                ((w = hn(w)), (p = hn(p)));
              }
              w = null;
            }
          else w = null;
          (S !== null && ru(d, g, S, w, !1),
            y !== null && v !== null && ru(d, v, y, w, !0));
        }
      }
      e: {
        if (
          ((g = u ? Sn(u) : window),
          (S = g.nodeName && g.nodeName.toLowerCase()),
          S === "select" || (S === "input" && g.type === "file"))
        )
          var N = Xh;
        else if (Xa(g))
          if (af) N = Zh;
          else {
            N = Yh;
            var P = bh;
          }
        else
          (S = g.nodeName) &&
            S.toLowerCase() === "input" &&
            (g.type === "checkbox" || g.type === "radio") &&
            (N = Gh);
        if (N && (N = N(e, u))) {
          sf(d, N, n, c);
          break e;
        }
        (P && P(e, g, u),
          e === "focusout" &&
            (P = g._wrapperState) &&
            P.controlled &&
            g.type === "number" &&
            Eo(g, "number", g.value));
      }
      switch (((P = u ? Sn(u) : window), e)) {
        case "focusin":
          (Xa(P) || P.contentEditable === "true") &&
            ((wn = P), (Ao = u), (pr = null));
          break;
        case "focusout":
          pr = Ao = wn = null;
          break;
        case "mousedown":
          Fo = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((Fo = !1), eu(d, n, c));
          break;
        case "selectionchange":
          if (nm) break;
        case "keydown":
        case "keyup":
          eu(d, n, c);
      }
      var j;
      if (Is)
        e: {
          switch (e) {
            case "compositionstart":
              var _ = "onCompositionStart";
              break e;
            case "compositionend":
              _ = "onCompositionEnd";
              break e;
            case "compositionupdate":
              _ = "onCompositionUpdate";
              break e;
          }
          _ = void 0;
        }
      else
        yn
          ? lf(e, n) && (_ = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      (_ &&
        (rf &&
          n.locale !== "ko" &&
          (yn || _ !== "onCompositionStart"
            ? _ === "onCompositionEnd" && yn && (j = nf())
            : ((_t = c),
              (_s = "value" in _t ? _t.value : _t.textContent),
              (yn = !0))),
        (P = Vl(u, _)),
        0 < P.length &&
          ((_ = new Qa(_, e, null, n, c)),
          d.push({ event: _, listeners: P }),
          j ? (_.data = j) : ((j = of(n)), j !== null && (_.data = j)))),
        (j = Wh ? Qh(e, n) : qh(e, n)) &&
          ((u = Vl(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new Qa("onBeforeInput", "beforeinput", null, n, c)),
            d.push({ event: c, listeners: u }),
            (c.data = j))));
    }
    yf(d, t);
  });
}
function jr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Vl(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    (l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = xr(e, n)),
      i != null && r.unshift(jr(e, i, l)),
      (i = xr(e, t)),
      i != null && r.push(jr(e, i, l))),
      (e = e.return));
  }
  return r;
}
function hn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ru(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var s = n,
      a = s.alternate,
      u = s.stateNode;
    if (a !== null && a === r) break;
    (s.tag === 5 &&
      u !== null &&
      ((s = u),
      l
        ? ((a = xr(n, i)), a != null && o.unshift(jr(n, a, s)))
        : l || ((a = xr(n, i)), a != null && o.push(jr(n, a, s)))),
      (n = n.return));
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var om = /\r\n?/g,
  sm = /\u0000|\uFFFD/g;
function lu(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      om,
      `
`,
    )
    .replace(sm, "");
}
function cl(e, t, n) {
  if (((t = lu(t)), lu(e) !== t && n)) throw Error(R(425));
}
function Wl() {}
var Do = null,
  zo = null;
function Uo(e, t) {
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
var Mo = typeof setTimeout == "function" ? setTimeout : void 0,
  am = typeof clearTimeout == "function" ? clearTimeout : void 0,
  iu = typeof Promise == "function" ? Promise : void 0,
  um =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof iu < "u"
        ? function (e) {
            return iu.resolve(null).then(e).catch(cm);
          }
        : Mo;
function cm(e) {
  setTimeout(function () {
    throw e;
  });
}
function Yi(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          (e.removeChild(l), kr(t));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  kr(t);
}
function Dt(e) {
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
function ou(e) {
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
var Wn = Math.random().toString(36).slice(2),
  st = "__reactFiber$" + Wn,
  Pr = "__reactProps$" + Wn,
  St = "__reactContainer$" + Wn,
  Bo = "__reactEvents$" + Wn,
  fm = "__reactListeners$" + Wn,
  dm = "__reactHandles$" + Wn;
function Yt(e) {
  var t = e[st];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[St] || n[st])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = ou(e); e !== null; ) {
          if ((n = e[st])) return n;
          e = ou(e);
        }
      return t;
    }
    ((e = n), (n = e.parentNode));
  }
  return null;
}
function Br(e) {
  return (
    (e = e[st] || e[St]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Sn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(R(33));
}
function pi(e) {
  return e[Pr] || null;
}
var $o = [],
  En = -1;
function Qt(e) {
  return { current: e };
}
function K(e) {
  0 > En || ((e.current = $o[En]), ($o[En] = null), En--);
}
function Q(e, t) {
  (En++, ($o[En] = e.current), (e.current = t));
}
var Vt = {},
  xe = Qt(Vt),
  je = Qt(!1),
  ln = Vt;
function Fn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Vt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function Pe(e) {
  return ((e = e.childContextTypes), e != null);
}
function Ql() {
  (K(je), K(xe));
}
function su(e, t, n) {
  if (xe.current !== Vt) throw Error(R(168));
  (Q(xe, t), Q(je, n));
}
function xf(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(R(108, bp(e) || "Unknown", l));
  return Z({}, n, r);
}
function ql(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Vt),
    (ln = xe.current),
    Q(xe, e),
    Q(je, je.current),
    !0
  );
}
function au(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(R(169));
  (n
    ? ((e = xf(e, t, ln)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      K(je),
      K(xe),
      Q(xe, e))
    : K(je),
    Q(je, n));
}
var gt = null,
  hi = !1,
  Gi = !1;
function Sf(e) {
  gt === null ? (gt = [e]) : gt.push(e);
}
function pm(e) {
  ((hi = !0), Sf(e));
}
function qt() {
  if (!Gi && gt !== null) {
    Gi = !0;
    var e = 0,
      t = W;
    try {
      var n = gt;
      for (W = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      ((gt = null), (hi = !1));
    } catch (l) {
      throw (gt !== null && (gt = gt.slice(e + 1)), Qc(Cs, qt), l);
    } finally {
      ((W = t), (Gi = !1));
    }
  }
  return null;
}
var kn = [],
  Rn = 0,
  Kl = null,
  Jl = 0,
  Ve = [],
  We = 0,
  on = null,
  vt = 1,
  yt = "";
function Xt(e, t) {
  ((kn[Rn++] = Jl), (kn[Rn++] = Kl), (Kl = e), (Jl = t));
}
function Ef(e, t, n) {
  ((Ve[We++] = vt), (Ve[We++] = yt), (Ve[We++] = on), (on = e));
  var r = vt;
  e = yt;
  var l = 32 - tt(r) - 1;
  ((r &= ~(1 << l)), (n += 1));
  var i = 32 - tt(t) + l;
  if (30 < i) {
    var o = l - (l % 5);
    ((i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (l -= o),
      (vt = (1 << (32 - tt(t) + l)) | (n << l) | r),
      (yt = i + e));
  } else ((vt = (1 << i) | (n << l) | r), (yt = e));
}
function Fs(e) {
  e.return !== null && (Xt(e, 1), Ef(e, 1, 0));
}
function Ds(e) {
  for (; e === Kl; )
    ((Kl = kn[--Rn]), (kn[Rn] = null), (Jl = kn[--Rn]), (kn[Rn] = null));
  for (; e === on; )
    ((on = Ve[--We]),
      (Ve[We] = null),
      (yt = Ve[--We]),
      (Ve[We] = null),
      (vt = Ve[--We]),
      (Ve[We] = null));
}
var De = null,
  Fe = null,
  X = !1,
  Ze = null;
function kf(e, t) {
  var n = Qe(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
}
function uu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (De = e), (Fe = Dt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (De = e), (Fe = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = on !== null ? { id: vt, overflow: yt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Qe(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (De = e),
            (Fe = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ho(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Vo(e) {
  if (X) {
    var t = Fe;
    if (t) {
      var n = t;
      if (!uu(e, t)) {
        if (Ho(e)) throw Error(R(418));
        t = Dt(n.nextSibling);
        var r = De;
        t && uu(e, t)
          ? kf(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (X = !1), (De = e));
      }
    } else {
      if (Ho(e)) throw Error(R(418));
      ((e.flags = (e.flags & -4097) | 2), (X = !1), (De = e));
    }
  }
}
function cu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  De = e;
}
function fl(e) {
  if (e !== De) return !1;
  if (!X) return (cu(e), (X = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Uo(e.type, e.memoizedProps))),
    t && (t = Fe))
  ) {
    if (Ho(e)) throw (Rf(), Error(R(418)));
    for (; t; ) (kf(e, t), (t = Dt(t.nextSibling)));
  }
  if ((cu(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(R(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Fe = Dt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Fe = null;
    }
  } else Fe = De ? Dt(e.stateNode.nextSibling) : null;
  return !0;
}
function Rf() {
  for (var e = Fe; e; ) e = Dt(e.nextSibling);
}
function Dn() {
  ((Fe = De = null), (X = !1));
}
function zs(e) {
  Ze === null ? (Ze = [e]) : Ze.push(e);
}
var hm = Rt.ReactCurrentBatchConfig;
function er(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(R(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(R(147, e));
      var l = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (o) {
            var s = l.refs;
            o === null ? delete s[i] : (s[i] = o);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(R(284));
    if (!n._owner) throw Error(R(290, e));
  }
  return e;
}
function dl(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      R(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function fu(e) {
  var t = e._init;
  return t(e._payload);
}
function Nf(e) {
  function t(p, h) {
    if (e) {
      var m = p.deletions;
      m === null ? ((p.deletions = [h]), (p.flags |= 16)) : m.push(h);
    }
  }
  function n(p, h) {
    if (!e) return null;
    for (; h !== null; ) (t(p, h), (h = h.sibling));
    return null;
  }
  function r(p, h) {
    for (p = new Map(); h !== null; )
      (h.key !== null ? p.set(h.key, h) : p.set(h.index, h), (h = h.sibling));
    return p;
  }
  function l(p, h) {
    return ((p = Bt(p, h)), (p.index = 0), (p.sibling = null), p);
  }
  function i(p, h, m) {
    return (
      (p.index = m),
      e
        ? ((m = p.alternate),
          m !== null
            ? ((m = m.index), m < h ? ((p.flags |= 2), h) : m)
            : ((p.flags |= 2), h))
        : ((p.flags |= 1048576), h)
    );
  }
  function o(p) {
    return (e && p.alternate === null && (p.flags |= 2), p);
  }
  function s(p, h, m, k) {
    return h === null || h.tag !== 6
      ? ((h = io(m, p.mode, k)), (h.return = p), h)
      : ((h = l(h, m)), (h.return = p), h);
  }
  function a(p, h, m, k) {
    var N = m.type;
    return N === vn
      ? c(p, h, m.props.children, k, m.key)
      : h !== null &&
          (h.elementType === N ||
            (typeof N == "object" &&
              N !== null &&
              N.$$typeof === Ct &&
              fu(N) === h.type))
        ? ((k = l(h, m.props)), (k.ref = er(p, h, m)), (k.return = p), k)
        : ((k = Ol(m.type, m.key, m.props, null, p.mode, k)),
          (k.ref = er(p, h, m)),
          (k.return = p),
          k);
  }
  function u(p, h, m, k) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== m.containerInfo ||
      h.stateNode.implementation !== m.implementation
      ? ((h = oo(m, p.mode, k)), (h.return = p), h)
      : ((h = l(h, m.children || [])), (h.return = p), h);
  }
  function c(p, h, m, k, N) {
    return h === null || h.tag !== 7
      ? ((h = nn(m, p.mode, k, N)), (h.return = p), h)
      : ((h = l(h, m)), (h.return = p), h);
  }
  function d(p, h, m) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return ((h = io("" + h, p.mode, m)), (h.return = p), h);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case tl:
          return (
            (m = Ol(h.type, h.key, h.props, null, p.mode, m)),
            (m.ref = er(p, null, h)),
            (m.return = p),
            m
          );
        case gn:
          return ((h = oo(h, p.mode, m)), (h.return = p), h);
        case Ct:
          var k = h._init;
          return d(p, k(h._payload), m);
      }
      if (ir(h) || Xn(h))
        return ((h = nn(h, p.mode, m, null)), (h.return = p), h);
      dl(p, h);
    }
    return null;
  }
  function g(p, h, m, k) {
    var N = h !== null ? h.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return N !== null ? null : s(p, h, "" + m, k);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case tl:
          return m.key === N ? a(p, h, m, k) : null;
        case gn:
          return m.key === N ? u(p, h, m, k) : null;
        case Ct:
          return ((N = m._init), g(p, h, N(m._payload), k));
      }
      if (ir(m) || Xn(m)) return N !== null ? null : c(p, h, m, k, null);
      dl(p, m);
    }
    return null;
  }
  function S(p, h, m, k, N) {
    if ((typeof k == "string" && k !== "") || typeof k == "number")
      return ((p = p.get(m) || null), s(h, p, "" + k, N));
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case tl:
          return (
            (p = p.get(k.key === null ? m : k.key) || null),
            a(h, p, k, N)
          );
        case gn:
          return (
            (p = p.get(k.key === null ? m : k.key) || null),
            u(h, p, k, N)
          );
        case Ct:
          var P = k._init;
          return S(p, h, m, P(k._payload), N);
      }
      if (ir(k) || Xn(k)) return ((p = p.get(m) || null), c(h, p, k, N, null));
      dl(h, k);
    }
    return null;
  }
  function y(p, h, m, k) {
    for (
      var N = null, P = null, j = h, _ = (h = 0), D = null;
      j !== null && _ < m.length;
      _++
    ) {
      j.index > _ ? ((D = j), (j = null)) : (D = j.sibling);
      var L = g(p, j, m[_], k);
      if (L === null) {
        j === null && (j = D);
        break;
      }
      (e && j && L.alternate === null && t(p, j),
        (h = i(L, h, _)),
        P === null ? (N = L) : (P.sibling = L),
        (P = L),
        (j = D));
    }
    if (_ === m.length) return (n(p, j), X && Xt(p, _), N);
    if (j === null) {
      for (; _ < m.length; _++)
        ((j = d(p, m[_], k)),
          j !== null &&
            ((h = i(j, h, _)),
            P === null ? (N = j) : (P.sibling = j),
            (P = j)));
      return (X && Xt(p, _), N);
    }
    for (j = r(p, j); _ < m.length; _++)
      ((D = S(j, p, _, m[_], k)),
        D !== null &&
          (e && D.alternate !== null && j.delete(D.key === null ? _ : D.key),
          (h = i(D, h, _)),
          P === null ? (N = D) : (P.sibling = D),
          (P = D)));
    return (
      e &&
        j.forEach(function (H) {
          return t(p, H);
        }),
      X && Xt(p, _),
      N
    );
  }
  function w(p, h, m, k) {
    var N = Xn(m);
    if (typeof N != "function") throw Error(R(150));
    if (((m = N.call(m)), m == null)) throw Error(R(151));
    for (
      var P = (N = null), j = h, _ = (h = 0), D = null, L = m.next();
      j !== null && !L.done;
      _++, L = m.next()
    ) {
      j.index > _ ? ((D = j), (j = null)) : (D = j.sibling);
      var H = g(p, j, L.value, k);
      if (H === null) {
        j === null && (j = D);
        break;
      }
      (e && j && H.alternate === null && t(p, j),
        (h = i(H, h, _)),
        P === null ? (N = H) : (P.sibling = H),
        (P = H),
        (j = D));
    }
    if (L.done) return (n(p, j), X && Xt(p, _), N);
    if (j === null) {
      for (; !L.done; _++, L = m.next())
        ((L = d(p, L.value, k)),
          L !== null &&
            ((h = i(L, h, _)),
            P === null ? (N = L) : (P.sibling = L),
            (P = L)));
      return (X && Xt(p, _), N);
    }
    for (j = r(p, j); !L.done; _++, L = m.next())
      ((L = S(j, p, _, L.value, k)),
        L !== null &&
          (e && L.alternate !== null && j.delete(L.key === null ? _ : L.key),
          (h = i(L, h, _)),
          P === null ? (N = L) : (P.sibling = L),
          (P = L)));
    return (
      e &&
        j.forEach(function (ue) {
          return t(p, ue);
        }),
      X && Xt(p, _),
      N
    );
  }
  function v(p, h, m, k) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === vn &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case tl:
          e: {
            for (var N = m.key, P = h; P !== null; ) {
              if (P.key === N) {
                if (((N = m.type), N === vn)) {
                  if (P.tag === 7) {
                    (n(p, P.sibling),
                      (h = l(P, m.props.children)),
                      (h.return = p),
                      (p = h));
                    break e;
                  }
                } else if (
                  P.elementType === N ||
                  (typeof N == "object" &&
                    N !== null &&
                    N.$$typeof === Ct &&
                    fu(N) === P.type)
                ) {
                  (n(p, P.sibling),
                    (h = l(P, m.props)),
                    (h.ref = er(p, P, m)),
                    (h.return = p),
                    (p = h));
                  break e;
                }
                n(p, P);
                break;
              } else t(p, P);
              P = P.sibling;
            }
            m.type === vn
              ? ((h = nn(m.props.children, p.mode, k, m.key)),
                (h.return = p),
                (p = h))
              : ((k = Ol(m.type, m.key, m.props, null, p.mode, k)),
                (k.ref = er(p, h, m)),
                (k.return = p),
                (p = k));
          }
          return o(p);
        case gn:
          e: {
            for (P = m.key; h !== null; ) {
              if (h.key === P)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === m.containerInfo &&
                  h.stateNode.implementation === m.implementation
                ) {
                  (n(p, h.sibling),
                    (h = l(h, m.children || [])),
                    (h.return = p),
                    (p = h));
                  break e;
                } else {
                  n(p, h);
                  break;
                }
              else t(p, h);
              h = h.sibling;
            }
            ((h = oo(m, p.mode, k)), (h.return = p), (p = h));
          }
          return o(p);
        case Ct:
          return ((P = m._init), v(p, h, P(m._payload), k));
      }
      if (ir(m)) return y(p, h, m, k);
      if (Xn(m)) return w(p, h, m, k);
      dl(p, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        h !== null && h.tag === 6
          ? (n(p, h.sibling), (h = l(h, m)), (h.return = p), (p = h))
          : (n(p, h), (h = io(m, p.mode, k)), (h.return = p), (p = h)),
        o(p))
      : n(p, h);
  }
  return v;
}
var zn = Nf(!0),
  Cf = Nf(!1),
  Xl = Qt(null),
  bl = null,
  Nn = null,
  Us = null;
function Ms() {
  Us = Nn = bl = null;
}
function Bs(e) {
  var t = Xl.current;
  (K(Xl), (e._currentValue = t));
}
function Wo(e, t, n) {
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
function On(e, t) {
  ((bl = e),
    (Us = Nn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ce = !0), (e.firstContext = null)));
}
function Ke(e) {
  var t = e._currentValue;
  if (Us !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Nn === null)) {
      if (bl === null) throw Error(R(308));
      ((Nn = e), (bl.dependencies = { lanes: 0, firstContext: e }));
    } else Nn = Nn.next = e;
  return t;
}
var Gt = null;
function $s(e) {
  Gt === null ? (Gt = [e]) : Gt.push(e);
}
function jf(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), $s(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Et(e, r)
  );
}
function Et(e, t) {
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
var jt = !1;
function Hs(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Pf(e, t) {
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
function wt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function zt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), M & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Et(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), $s(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Et(e, n)
  );
}
function Cl(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), js(e, n));
  }
}
function du(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (l = i = o) : (i = i.next = o), (n = n.next));
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
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
function Yl(e, t, n, r) {
  var l = e.updateQueue;
  jt = !1;
  var i = l.firstBaseUpdate,
    o = l.lastBaseUpdate,
    s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s,
      u = a.next;
    ((a.next = null), o === null ? (i = u) : (o.next = u), (o = a));
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (s = c.lastBaseUpdate),
      s !== o &&
        (s === null ? (c.firstBaseUpdate = u) : (s.next = u),
        (c.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var d = l.baseState;
    ((o = 0), (c = u = a = null), (s = i));
    do {
      var g = s.lane,
        S = s.eventTime;
      if ((r & g) === g) {
        c !== null &&
          (c = c.next =
            {
              eventTime: S,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var y = e,
            w = s;
          switch (((g = t), (S = n), w.tag)) {
            case 1:
              if (((y = w.payload), typeof y == "function")) {
                d = y.call(S, d, g);
                break e;
              }
              d = y;
              break e;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (
                ((y = w.payload),
                (g = typeof y == "function" ? y.call(S, d, g) : y),
                g == null)
              )
                break e;
              d = Z({}, d, g);
              break e;
            case 2:
              jt = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (g = l.effects),
          g === null ? (l.effects = [s]) : g.push(s));
      } else
        ((S = {
          eventTime: S,
          lane: g,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          c === null ? ((u = c = S), (a = d)) : (c = c.next = S),
          (o |= g));
      if (((s = s.next), s === null)) {
        if (((s = l.shared.pending), s === null)) break;
        ((g = s),
          (s = g.next),
          (g.next = null),
          (l.lastBaseUpdate = g),
          (l.shared.pending = null));
      }
    } while (!0);
    if (
      (c === null && (a = d),
      (l.baseState = a),
      (l.firstBaseUpdate = u),
      (l.lastBaseUpdate = c),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do ((o |= l.lane), (l = l.next));
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    ((an |= o), (e.lanes = o), (e.memoizedState = d));
  }
}
function pu(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(R(191, l));
        l.call(r);
      }
    }
}
var $r = {},
  ut = Qt($r),
  Tr = Qt($r),
  _r = Qt($r);
function Zt(e) {
  if (e === $r) throw Error(R(174));
  return e;
}
function Vs(e, t) {
  switch ((Q(_r, t), Q(Tr, e), Q(ut, $r), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ro(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ro(t, e)));
  }
  (K(ut), Q(ut, t));
}
function Un() {
  (K(ut), K(Tr), K(_r));
}
function Tf(e) {
  Zt(_r.current);
  var t = Zt(ut.current),
    n = Ro(t, e.type);
  t !== n && (Q(Tr, e), Q(ut, n));
}
function Ws(e) {
  Tr.current === e && (K(ut), K(Tr));
}
var Y = Qt(0);
function Gl(e) {
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
var Zi = [];
function Qs() {
  for (var e = 0; e < Zi.length; e++)
    Zi[e]._workInProgressVersionPrimary = null;
  Zi.length = 0;
}
var jl = Rt.ReactCurrentDispatcher,
  eo = Rt.ReactCurrentBatchConfig,
  sn = 0,
  G = null,
  ie = null,
  se = null,
  Zl = !1,
  hr = !1,
  Lr = 0,
  mm = 0;
function ge() {
  throw Error(R(321));
}
function qs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!rt(e[n], t[n])) return !1;
  return !0;
}
function Ks(e, t, n, r, l, i) {
  if (
    ((sn = i),
    (G = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (jl.current = e === null || e.memoizedState === null ? wm : xm),
    (e = n(r, l)),
    hr)
  ) {
    i = 0;
    do {
      if (((hr = !1), (Lr = 0), 25 <= i)) throw Error(R(301));
      ((i += 1),
        (se = ie = null),
        (t.updateQueue = null),
        (jl.current = Sm),
        (e = n(r, l)));
    } while (hr);
  }
  if (
    ((jl.current = ei),
    (t = ie !== null && ie.next !== null),
    (sn = 0),
    (se = ie = G = null),
    (Zl = !1),
    t)
  )
    throw Error(R(300));
  return e;
}
function Js() {
  var e = Lr !== 0;
  return ((Lr = 0), e);
}
function ot() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (se === null ? (G.memoizedState = se = e) : (se = se.next = e), se);
}
function Je() {
  if (ie === null) {
    var e = G.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ie.next;
  var t = se === null ? G.memoizedState : se.next;
  if (t !== null) ((se = t), (ie = e));
  else {
    if (e === null) throw Error(R(310));
    ((ie = e),
      (e = {
        memoizedState: ie.memoizedState,
        baseState: ie.baseState,
        baseQueue: ie.baseQueue,
        queue: ie.queue,
        next: null,
      }),
      se === null ? (G.memoizedState = se = e) : (se = se.next = e));
  }
  return se;
}
function Or(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function to(e) {
  var t = Je(),
    n = t.queue;
  if (n === null) throw Error(R(311));
  n.lastRenderedReducer = e;
  var r = ie,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      ((l.next = i.next), (i.next = o));
    }
    ((r.baseQueue = l = i), (n.pending = null));
  }
  if (l !== null) {
    ((i = l.next), (r = r.baseState));
    var s = (o = null),
      a = null,
      u = i;
    do {
      var c = u.lane;
      if ((sn & c) === c)
        (a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action)));
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (a === null ? ((s = a = d), (o = r)) : (a = a.next = d),
          (G.lanes |= c),
          (an |= c));
      }
      u = u.next;
    } while (u !== null && u !== i);
    (a === null ? (o = r) : (a.next = s),
      rt(r, t.memoizedState) || (Ce = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = a),
      (n.lastRenderedState = r));
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do ((i = l.lane), (G.lanes |= i), (an |= i), (l = l.next));
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function no(e) {
  var t = Je(),
    n = t.queue;
  if (n === null) throw Error(R(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = (l = l.next);
    do ((i = e(i, o.action)), (o = o.next));
    while (o !== l);
    (rt(i, t.memoizedState) || (Ce = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function _f() {}
function Lf(e, t) {
  var n = G,
    r = Je(),
    l = t(),
    i = !rt(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (Ce = !0)),
    (r = r.queue),
    Xs(Af.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (se !== null && se.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Ir(9, If.bind(null, n, r, l, t), void 0, null),
      ae === null)
    )
      throw Error(R(349));
    sn & 30 || Of(n, t, l);
  }
  return l;
}
function Of(e, t, n) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = G.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (G.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
}
function If(e, t, n, r) {
  ((t.value = n), (t.getSnapshot = r), Ff(t) && Df(e));
}
function Af(e, t, n) {
  return n(function () {
    Ff(t) && Df(e);
  });
}
function Ff(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !rt(e, n);
  } catch {
    return !0;
  }
}
function Df(e) {
  var t = Et(e, 1);
  t !== null && nt(t, e, 1, -1);
}
function hu(e) {
  var t = ot();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Or,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = ym.bind(null, G, e)),
    [t.memoizedState, e]
  );
}
function Ir(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = G.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (G.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function zf() {
  return Je().memoizedState;
}
function Pl(e, t, n, r) {
  var l = ot();
  ((G.flags |= e),
    (l.memoizedState = Ir(1 | t, n, void 0, r === void 0 ? null : r)));
}
function mi(e, t, n, r) {
  var l = Je();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ie !== null) {
    var o = ie.memoizedState;
    if (((i = o.destroy), r !== null && qs(r, o.deps))) {
      l.memoizedState = Ir(t, n, i, r);
      return;
    }
  }
  ((G.flags |= e), (l.memoizedState = Ir(1 | t, n, i, r)));
}
function mu(e, t) {
  return Pl(8390656, 8, e, t);
}
function Xs(e, t) {
  return mi(2048, 8, e, t);
}
function Uf(e, t) {
  return mi(4, 2, e, t);
}
function Mf(e, t) {
  return mi(4, 4, e, t);
}
function Bf(e, t) {
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
function $f(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null),
    mi(4, 4, Bf.bind(null, t, e), n)
  );
}
function bs() {}
function Hf(e, t) {
  var n = Je();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && qs(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Vf(e, t) {
  var n = Je();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && qs(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Wf(e, t, n) {
  return sn & 21
    ? (rt(n, t) || ((n = Jc()), (G.lanes |= n), (an |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ce = !0)), (e.memoizedState = n));
}
function gm(e, t) {
  var n = W;
  ((W = n !== 0 && 4 > n ? n : 4), e(!0));
  var r = eo.transition;
  eo.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((W = n), (eo.transition = r));
  }
}
function Qf() {
  return Je().memoizedState;
}
function vm(e, t, n) {
  var r = Mt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    qf(e))
  )
    Kf(t, n);
  else if (((n = jf(e, t, n, r)), n !== null)) {
    var l = Ee();
    (nt(n, e, r, l), Jf(n, t, r));
  }
}
function ym(e, t, n) {
  var r = Mt(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (qf(e)) Kf(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var o = t.lastRenderedState,
          s = i(o, n);
        if (((l.hasEagerState = !0), (l.eagerState = s), rt(s, o))) {
          var a = t.interleaved;
          (a === null
            ? ((l.next = l), $s(t))
            : ((l.next = a.next), (a.next = l)),
            (t.interleaved = l));
          return;
        }
      } catch {
      } finally {
      }
    ((n = jf(e, t, l, r)),
      n !== null && ((l = Ee()), nt(n, e, r, l), Jf(n, t, r)));
  }
}
function qf(e) {
  var t = e.alternate;
  return e === G || (t !== null && t === G);
}
function Kf(e, t) {
  hr = Zl = !0;
  var n = e.pending;
  (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t));
}
function Jf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    ((r &= e.pendingLanes), (n |= r), (t.lanes = n), js(e, n));
  }
}
var ei = {
    readContext: Ke,
    useCallback: ge,
    useContext: ge,
    useEffect: ge,
    useImperativeHandle: ge,
    useInsertionEffect: ge,
    useLayoutEffect: ge,
    useMemo: ge,
    useReducer: ge,
    useRef: ge,
    useState: ge,
    useDebugValue: ge,
    useDeferredValue: ge,
    useTransition: ge,
    useMutableSource: ge,
    useSyncExternalStore: ge,
    useId: ge,
    unstable_isNewReconciler: !1,
  },
  wm = {
    readContext: Ke,
    useCallback: function (e, t) {
      return ((ot().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: Ke,
    useEffect: mu,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Pl(4194308, 4, Bf.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Pl(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Pl(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = ot();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (n.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, n) {
      var r = ot();
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
        (e = e.dispatch = vm.bind(null, G, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = ot();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: hu,
    useDebugValue: bs,
    useDeferredValue: function (e) {
      return (ot().memoizedState = e);
    },
    useTransition: function () {
      var e = hu(!1),
        t = e[0];
      return ((e = gm.bind(null, e[1])), (ot().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = G,
        l = ot();
      if (X) {
        if (n === void 0) throw Error(R(407));
        n = n();
      } else {
        if (((n = t()), ae === null)) throw Error(R(349));
        sn & 30 || Of(r, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (l.queue = i),
        mu(Af.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Ir(9, If.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = ot(),
        t = ae.identifierPrefix;
      if (X) {
        var n = yt,
          r = vt;
        ((n = (r & ~(1 << (32 - tt(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Lr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":"));
      } else ((n = mm++), (t = ":" + t + "r" + n.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  xm = {
    readContext: Ke,
    useCallback: Hf,
    useContext: Ke,
    useEffect: Xs,
    useImperativeHandle: $f,
    useInsertionEffect: Uf,
    useLayoutEffect: Mf,
    useMemo: Vf,
    useReducer: to,
    useRef: zf,
    useState: function () {
      return to(Or);
    },
    useDebugValue: bs,
    useDeferredValue: function (e) {
      var t = Je();
      return Wf(t, ie.memoizedState, e);
    },
    useTransition: function () {
      var e = to(Or)[0],
        t = Je().memoizedState;
      return [e, t];
    },
    useMutableSource: _f,
    useSyncExternalStore: Lf,
    useId: Qf,
    unstable_isNewReconciler: !1,
  },
  Sm = {
    readContext: Ke,
    useCallback: Hf,
    useContext: Ke,
    useEffect: Xs,
    useImperativeHandle: $f,
    useInsertionEffect: Uf,
    useLayoutEffect: Mf,
    useMemo: Vf,
    useReducer: no,
    useRef: zf,
    useState: function () {
      return no(Or);
    },
    useDebugValue: bs,
    useDeferredValue: function (e) {
      var t = Je();
      return ie === null ? (t.memoizedState = e) : Wf(t, ie.memoizedState, e);
    },
    useTransition: function () {
      var e = no(Or)[0],
        t = Je().memoizedState;
      return [e, t];
    },
    useMutableSource: _f,
    useSyncExternalStore: Lf,
    useId: Qf,
    unstable_isNewReconciler: !1,
  };
function Ye(e, t) {
  if (e && e.defaultProps) {
    ((t = Z({}, t)), (e = e.defaultProps));
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Qo(e, t, n, r) {
  ((t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Z({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n));
}
var gi = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? dn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ee(),
      l = Mt(e),
      i = wt(r, l);
    ((i.payload = t),
      n != null && (i.callback = n),
      (t = zt(e, i, l)),
      t !== null && (nt(t, e, l, r), Cl(t, e, l)));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = Ee(),
      l = Mt(e),
      i = wt(r, l);
    ((i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = zt(e, i, l)),
      t !== null && (nt(t, e, l, r), Cl(t, e, l)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = Ee(),
      r = Mt(e),
      l = wt(n, r);
    ((l.tag = 2),
      t != null && (l.callback = t),
      (t = zt(e, l, r)),
      t !== null && (nt(t, e, r, n), Cl(t, e, r)));
  },
};
function gu(e, t, n, r, l, i, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, o)
      : t.prototype && t.prototype.isPureReactComponent
        ? !Nr(n, r) || !Nr(l, i)
        : !0
  );
}
function Xf(e, t, n) {
  var r = !1,
    l = Vt,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Ke(i))
      : ((l = Pe(t) ? ln : xe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? Fn(e, l) : Vt)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = gi),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function vu(e, t, n, r) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && gi.enqueueReplaceState(t, t.state, null));
}
function qo(e, t, n, r) {
  var l = e.stateNode;
  ((l.props = n), (l.state = e.memoizedState), (l.refs = {}), Hs(e));
  var i = t.contextType;
  (typeof i == "object" && i !== null
    ? (l.context = Ke(i))
    : ((i = Pe(t) ? ln : xe.current), (l.context = Fn(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (Qo(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && gi.enqueueReplaceState(l, l.state, null),
      Yl(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308));
}
function Mn(e, t) {
  try {
    var n = "",
      r = t;
    do ((n += Xp(r)), (r = r.return));
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ro(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Ko(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Em = typeof WeakMap == "function" ? WeakMap : Map;
function bf(e, t, n) {
  ((n = wt(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = t.value;
  return (
    (n.callback = function () {
      (ni || ((ni = !0), (rs = r)), Ko(e, t));
    }),
    n
  );
}
function Yf(e, t, n) {
  ((n = wt(-1, n)), (n.tag = 3));
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    ((n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Ko(e, t);
      }));
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        (Ko(e, t),
          typeof r != "function" &&
            (Ut === null ? (Ut = new Set([this])) : Ut.add(this)));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function yu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Em();
    var l = new Set();
    r.set(t, l);
  } else ((l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l)));
  l.has(n) || (l.add(n), (e = Dm.bind(null, e, t, n)), t.then(e, e));
}
function wu(e) {
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
function xu(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = wt(-1, 1)), (t.tag = 2), zt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var km = Rt.ReactCurrentOwner,
  Ce = !1;
function Se(e, t, n, r) {
  t.child = e === null ? Cf(t, null, n, r) : zn(t, e.child, n, r);
}
function Su(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    On(t, l),
    (r = Ks(e, t, n, r, i, l)),
    (n = Js()),
    e !== null && !Ce
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        kt(e, t, l))
      : (X && n && Fs(t), (t.flags |= 1), Se(e, t, r, l), t.child)
  );
}
function Eu(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !la(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Gf(e, t, i, r, l))
      : ((e = Ol(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var o = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Nr), n(o, r) && e.ref === t.ref)
    )
      return kt(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = Bt(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Gf(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Nr(i, r) && e.ref === t.ref)
      if (((Ce = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        e.flags & 131072 && (Ce = !0);
      else return ((t.lanes = e.lanes), kt(e, t, l));
  }
  return Jo(e, t, n, r, l);
}
function Zf(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Q(jn, Ie),
        (Ie |= n));
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
          Q(jn, Ie),
          (Ie |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        Q(jn, Ie),
        (Ie |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      Q(jn, Ie),
      (Ie |= r));
  return (Se(e, t, l, n), t.child);
}
function ed(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Jo(e, t, n, r, l) {
  var i = Pe(n) ? ln : xe.current;
  return (
    (i = Fn(t, i)),
    On(t, l),
    (n = Ks(e, t, n, r, i, l)),
    (r = Js()),
    e !== null && !Ce
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        kt(e, t, l))
      : (X && r && Fs(t), (t.flags |= 1), Se(e, t, n, l), t.child)
  );
}
function ku(e, t, n, r, l) {
  if (Pe(n)) {
    var i = !0;
    ql(t);
  } else i = !1;
  if ((On(t, l), t.stateNode === null))
    (Tl(e, t), Xf(t, n, r), qo(t, n, r, l), (r = !0));
  else if (e === null) {
    var o = t.stateNode,
      s = t.memoizedProps;
    o.props = s;
    var a = o.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Ke(u))
      : ((u = Pe(n) ? ln : xe.current), (u = Fn(t, u)));
    var c = n.getDerivedStateFromProps,
      d =
        typeof c == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    (d ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((s !== r || a !== u) && vu(t, o, r, u)),
      (jt = !1));
    var g = t.memoizedState;
    ((o.state = g),
      Yl(t, r, o, l),
      (a = t.memoizedState),
      s !== r || g !== a || je.current || jt
        ? (typeof c == "function" && (Qo(t, n, c, r), (a = t.memoizedState)),
          (s = jt || gu(t, n, s, r, g, a, u))
            ? (d ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (o.props = r),
          (o.state = a),
          (o.context = u),
          (r = s))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1)));
  } else {
    ((o = t.stateNode),
      Pf(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : Ye(t.type, s)),
      (o.props = u),
      (d = t.pendingProps),
      (g = o.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Ke(a))
        : ((a = Pe(n) ? ln : xe.current), (a = Fn(t, a))));
    var S = n.getDerivedStateFromProps;
    ((c =
      typeof S == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((s !== d || g !== a) && vu(t, o, r, a)),
      (jt = !1),
      (g = t.memoizedState),
      (o.state = g),
      Yl(t, r, o, l));
    var y = t.memoizedState;
    s !== d || g !== y || je.current || jt
      ? (typeof S == "function" && (Qo(t, n, S, r), (y = t.memoizedState)),
        (u = jt || gu(t, n, u, r, g, y, a) || !1)
          ? (c ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, y, a),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, y, a)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (s === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && g === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = y)),
        (o.props = r),
        (o.state = y),
        (o.context = a),
        (r = u))
      : (typeof o.componentDidUpdate != "function" ||
          (s === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && g === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Xo(e, t, n, r, i, l);
}
function Xo(e, t, n, r, l, i) {
  ed(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return (l && au(t, n, !1), kt(e, t, i));
  ((r = t.stateNode), (km.current = t));
  var s =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = zn(t, e.child, null, i)), (t.child = zn(t, null, s, i)))
      : Se(e, t, s, i),
    (t.memoizedState = r.state),
    l && au(t, n, !0),
    t.child
  );
}
function td(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? su(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && su(e, t.context, !1),
    Vs(e, t.containerInfo));
}
function Ru(e, t, n, r, l) {
  return (Dn(), zs(l), (t.flags |= 256), Se(e, t, n, r), t.child);
}
var bo = { dehydrated: null, treeContext: null, retryLane: 0 };
function Yo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function nd(e, t, n) {
  var r = t.pendingProps,
    l = Y.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    s;
  if (
    ((s = o) ||
      (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    s
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    Q(Y, l & 1),
    e === null)
  )
    return (
      Vo(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = o))
                : (i = wi(o, r, 0, null)),
              (e = nn(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = Yo(n)),
              (t.memoizedState = bo),
              e)
            : Ys(t, o))
    );
  if (((l = e.memoizedState), l !== null && ((s = l.dehydrated), s !== null)))
    return Rm(e, t, o, r, s, l, n);
  if (i) {
    ((i = r.fallback), (o = t.mode), (l = e.child), (s = l.sibling));
    var a = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = Bt(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      s !== null ? (i = Bt(s, i)) : ((i = nn(i, o, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? Yo(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = bo),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = Bt(i, { mode: "visible", children: r.children })),
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
function Ys(e, t) {
  return (
    (t = wi({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function pl(e, t, n, r) {
  return (
    r !== null && zs(r),
    zn(t, e.child, null, n),
    (e = Ys(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Rm(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ro(Error(R(422)))), pl(e, t, o, r))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((i = r.fallback),
          (l = t.mode),
          (r = wi({ mode: "visible", children: r.children }, l, 0, null)),
          (i = nn(i, l, o, null)),
          (i.flags |= 2),
          (r.return = t),
          (i.return = t),
          (r.sibling = i),
          (t.child = r),
          t.mode & 1 && zn(t, e.child, null, o),
          (t.child.memoizedState = Yo(o)),
          (t.memoizedState = bo),
          i);
  if (!(t.mode & 1)) return pl(e, t, o, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var s = r.dgst;
    return (
      (r = s),
      (i = Error(R(419))),
      (r = ro(i, r, void 0)),
      pl(e, t, o, r)
    );
  }
  if (((s = (o & e.childLanes) !== 0), Ce || s)) {
    if (((r = ae), r !== null)) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
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
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      ((l = l & (r.suspendedLanes | o) ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), Et(e, l), nt(r, e, l, -1)));
    }
    return (ra(), (r = ro(Error(R(421)))), pl(e, t, o, r));
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = zm.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Fe = Dt(l.nextSibling)),
      (De = t),
      (X = !0),
      (Ze = null),
      e !== null &&
        ((Ve[We++] = vt),
        (Ve[We++] = yt),
        (Ve[We++] = on),
        (vt = e.id),
        (yt = e.overflow),
        (on = t)),
      (t = Ys(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Nu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  (r !== null && (r.lanes |= t), Wo(e.return, t, n));
}
function lo(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function rd(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((Se(e, t, r.children, n), (r = Y.current), r & 2))
    ((r = (r & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Nu(e, n, t);
        else if (e.tag === 19) Nu(e, n, t);
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
  if ((Q(Y, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          ((e = n.alternate),
            e !== null && Gl(e) === null && (l = n),
            (n = n.sibling));
        ((n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          lo(t, !1, l, n, i));
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && Gl(e) === null)) {
            t.child = l;
            break;
          }
          ((e = l.sibling), (l.sibling = n), (n = l), (l = e));
        }
        lo(t, !0, n, null, i);
        break;
      case "together":
        lo(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Tl(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function kt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (an |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(R(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Bt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (n = n.sibling = Bt(e, e.pendingProps)),
        (n.return = t));
    n.sibling = null;
  }
  return t.child;
}
function Nm(e, t, n) {
  switch (t.tag) {
    case 3:
      (td(t), Dn());
      break;
    case 5:
      Tf(t);
      break;
    case 1:
      Pe(t.type) && ql(t);
      break;
    case 4:
      Vs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      (Q(Xl, r._currentValue), (r._currentValue = l));
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (Q(Y, Y.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
            ? nd(e, t, n)
            : (Q(Y, Y.current & 1),
              (e = kt(e, t, n)),
              e !== null ? e.sibling : null);
      Q(Y, Y.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return rd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        Q(Y, Y.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Zf(e, t, n));
  }
  return kt(e, t, n);
}
var ld, Go, id, od;
ld = function (e, t) {
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
Go = function () {};
id = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    ((e = t.stateNode), Zt(ut.current));
    var i = null;
    switch (n) {
      case "input":
        ((l = xo(e, l)), (r = xo(e, r)), (i = []));
        break;
      case "select":
        ((l = Z({}, l, { value: void 0 })),
          (r = Z({}, r, { value: void 0 })),
          (i = []));
        break;
      case "textarea":
        ((l = ko(e, l)), (r = ko(e, r)), (i = []));
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Wl);
    }
    No(n, r);
    var o;
    n = null;
    for (u in l)
      if (!r.hasOwnProperty(u) && l.hasOwnProperty(u) && l[u] != null)
        if (u === "style") {
          var s = l[u];
          for (o in s) s.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (yr.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((s = l != null ? l[u] : void 0),
        r.hasOwnProperty(u) && a !== s && (a != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (o in s)
              !s.hasOwnProperty(o) ||
                (a && a.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in a)
              a.hasOwnProperty(o) &&
                s[o] !== a[o] &&
                (n || (n = {}), (n[o] = a[o]));
          } else (n || (i || (i = []), i.push(u, n)), (n = a));
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (s = s ? s.__html : void 0),
              a != null && s !== a && (i = i || []).push(u, a))
            : u === "children"
              ? (typeof a != "string" && typeof a != "number") ||
                (i = i || []).push(u, "" + a)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (yr.hasOwnProperty(u)
                  ? (a != null && u === "onScroll" && q("scroll", e),
                    i || s === a || (i = []))
                  : (i = i || []).push(u, a));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
od = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function tr(e, t) {
  if (!X)
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
function ve(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling));
  else
    for (l = e.child; l !== null; )
      ((n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling));
  return ((e.subtreeFlags |= r), (e.childLanes = n), t);
}
function Cm(e, t, n) {
  var r = t.pendingProps;
  switch ((Ds(t), t.tag)) {
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
      return (ve(t), null);
    case 1:
      return (Pe(t.type) && Ql(), ve(t), null);
    case 3:
      return (
        (r = t.stateNode),
        Un(),
        K(je),
        K(xe),
        Qs(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (fl(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ze !== null && (os(Ze), (Ze = null)))),
        Go(e, t),
        ve(t),
        null
      );
    case 5:
      Ws(t);
      var l = Zt(_r.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        (id(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(R(166));
          return (ve(t), null);
        }
        if (((e = Zt(ut.current)), fl(t))) {
          ((r = t.stateNode), (n = t.type));
          var i = t.memoizedProps;
          switch (((r[st] = t), (r[Pr] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              (q("cancel", r), q("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              q("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < sr.length; l++) q(sr[l], r);
              break;
            case "source":
              q("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (q("error", r), q("load", r));
              break;
            case "details":
              q("toggle", r);
              break;
            case "input":
              (Aa(r, i), q("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                q("invalid", r));
              break;
            case "textarea":
              (Da(r, i), q("invalid", r));
          }
          (No(n, i), (l = null));
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var s = i[o];
              o === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (i.suppressHydrationWarning !== !0 &&
                      cl(r.textContent, s, e),
                    (l = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (i.suppressHydrationWarning !== !0 &&
                      cl(r.textContent, s, e),
                    (l = ["children", "" + s]))
                : yr.hasOwnProperty(o) &&
                  s != null &&
                  o === "onScroll" &&
                  q("scroll", r);
            }
          switch (n) {
            case "input":
              (nl(r), Fa(r, i, !0));
              break;
            case "textarea":
              (nl(r), za(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Wl);
          }
          ((r = l), (t.updateQueue = r), r !== null && (t.flags |= 4));
        } else {
          ((o = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Ic(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                  ? (e = o.createElement(n, { is: r.is }))
                  : ((e = o.createElement(n)),
                    n === "select" &&
                      ((o = e),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[st] = t),
            (e[Pr] = r),
            ld(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((o = Co(n, r)), n)) {
              case "dialog":
                (q("cancel", e), q("close", e), (l = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (q("load", e), (l = r));
                break;
              case "video":
              case "audio":
                for (l = 0; l < sr.length; l++) q(sr[l], e);
                l = r;
                break;
              case "source":
                (q("error", e), (l = r));
                break;
              case "img":
              case "image":
              case "link":
                (q("error", e), q("load", e), (l = r));
                break;
              case "details":
                (q("toggle", e), (l = r));
                break;
              case "input":
                (Aa(e, r), (l = xo(e, r)), q("invalid", e));
                break;
              case "option":
                l = r;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = Z({}, r, { value: void 0 })),
                  q("invalid", e));
                break;
              case "textarea":
                (Da(e, r), (l = ko(e, r)), q("invalid", e));
                break;
              default:
                l = r;
            }
            (No(n, l), (s = l));
            for (i in s)
              if (s.hasOwnProperty(i)) {
                var a = s[i];
                i === "style"
                  ? Dc(e, a)
                  : i === "dangerouslySetInnerHTML"
                    ? ((a = a ? a.__html : void 0), a != null && Ac(e, a))
                    : i === "children"
                      ? typeof a == "string"
                        ? (n !== "textarea" || a !== "") && wr(e, a)
                        : typeof a == "number" && wr(e, "" + a)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (yr.hasOwnProperty(i)
                          ? a != null && i === "onScroll" && q("scroll", e)
                          : a != null && Ss(e, i, a, o));
              }
            switch (n) {
              case "input":
                (nl(e), Fa(e, r, !1));
                break;
              case "textarea":
                (nl(e), za(e));
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Ht(r.value));
                break;
              case "select":
                ((e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Pn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Pn(e, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Wl);
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
      return (ve(t), null);
    case 6:
      if (e && t.stateNode != null) od(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(R(166));
        if (((n = Zt(_r.current)), Zt(ut.current), fl(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[st] = t),
            (i = r.nodeValue !== n) && ((e = De), e !== null))
          )
            switch (e.tag) {
              case 3:
                cl(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  cl(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[st] = t),
            (t.stateNode = r));
      }
      return (ve(t), null);
    case 13:
      if (
        (K(Y),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (X && Fe !== null && t.mode & 1 && !(t.flags & 128))
          (Rf(), Dn(), (t.flags |= 98560), (i = !1));
        else if (((i = fl(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(R(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(R(317));
            i[st] = t;
          } else
            (Dn(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (ve(t), (i = !1));
        } else (Ze !== null && (os(Ze), (Ze = null)), (i = !0));
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Y.current & 1 ? oe === 0 && (oe = 3) : ra())),
          t.updateQueue !== null && (t.flags |= 4),
          ve(t),
          null);
    case 4:
      return (
        Un(),
        Go(e, t),
        e === null && Cr(t.stateNode.containerInfo),
        ve(t),
        null
      );
    case 10:
      return (Bs(t.type._context), ve(t), null);
    case 17:
      return (Pe(t.type) && Ql(), ve(t), null);
    case 19:
      if ((K(Y), (i = t.memoizedState), i === null)) return (ve(t), null);
      if (((r = (t.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) tr(i, !1);
        else {
          if (oe !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = Gl(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    tr(i, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;
                )
                  ((i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (e = o.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling));
                return (Q(Y, (Y.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          i.tail !== null &&
            te() > Bn &&
            ((t.flags |= 128), (r = !0), tr(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Gl(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              tr(i, !0),
              i.tail === null && i.tailMode === "hidden" && !o.alternate && !X)
            )
              return (ve(t), null);
          } else
            2 * te() - i.renderingStartTime > Bn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), tr(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = i.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (i.last = o));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = te()),
          (t.sibling = null),
          (n = Y.current),
          Q(Y, r ? (n & 1) | 2 : n & 1),
          t)
        : (ve(t), null);
    case 22:
    case 23:
      return (
        na(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Ie & 1073741824 && (ve(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : ve(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(R(156, t.tag));
}
function jm(e, t) {
  switch ((Ds(t), t.tag)) {
    case 1:
      return (
        Pe(t.type) && Ql(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Un(),
        K(je),
        K(xe),
        Qs(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (Ws(t), null);
    case 13:
      if ((K(Y), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(R(340));
        Dn();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (K(Y), null);
    case 4:
      return (Un(), null);
    case 10:
      return (Bs(t.type._context), null);
    case 22:
    case 23:
      return (na(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var hl = !1,
  ye = !1,
  Pm = typeof WeakSet == "function" ? WeakSet : Set,
  T = null;
function Cn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ee(e, t, r);
      }
    else n.current = null;
}
function Zo(e, t, n) {
  try {
    n();
  } catch (r) {
    ee(e, t, r);
  }
}
var Cu = !1;
function Tm(e, t) {
  if (((Do = $l), (e = ff()), As(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            s = -1,
            a = -1,
            u = 0,
            c = 0,
            d = e,
            g = null;
          t: for (;;) {
            for (
              var S;
              d !== n || (l !== 0 && d.nodeType !== 3) || (s = o + l),
                d !== i || (r !== 0 && d.nodeType !== 3) || (a = o + r),
                d.nodeType === 3 && (o += d.nodeValue.length),
                (S = d.firstChild) !== null;
            )
              ((g = d), (d = S));
            for (;;) {
              if (d === e) break t;
              if (
                (g === n && ++u === l && (s = o),
                g === i && ++c === r && (a = o),
                (S = d.nextSibling) !== null)
              )
                break;
              ((d = g), (g = d.parentNode));
            }
            d = S;
          }
          n = s === -1 || a === -1 ? null : { start: s, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (zo = { focusedElem: e, selectionRange: n }, $l = !1, T = t; T !== null; )
    if (((t = T), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (T = e));
    else
      for (; T !== null; ) {
        t = T;
        try {
          var y = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var w = y.memoizedProps,
                    v = y.memoizedState,
                    p = t.stateNode,
                    h = p.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? w : Ye(t.type, w),
                      v,
                    );
                  p.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var m = t.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 &&
                    m.documentElement &&
                    m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(R(163));
            }
        } catch (k) {
          ee(t, t.return, k);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (T = e));
          break;
        }
        T = t.return;
      }
  return ((y = Cu), (Cu = !1), y);
}
function mr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        ((l.destroy = void 0), i !== void 0 && Zo(t, n, i));
      }
      l = l.next;
    } while (l !== r);
  }
}
function vi(e, t) {
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
function es(e) {
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
function sd(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), sd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[st], delete t[Pr], delete t[Bo], delete t[fm], delete t[dm])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function ad(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ju(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || ad(e.return)) return null;
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
function ts(e, t, n) {
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
          n != null || t.onclick !== null || (t.onclick = Wl)));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ts(e, t, n), e = e.sibling; e !== null; )
      (ts(e, t, n), (e = e.sibling));
}
function ns(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (ns(e, t, n), e = e.sibling; e !== null; )
      (ns(e, t, n), (e = e.sibling));
}
var pe = null,
  Ge = !1;
function Nt(e, t, n) {
  for (n = n.child; n !== null; ) (ud(e, t, n), (n = n.sibling));
}
function ud(e, t, n) {
  if (at && typeof at.onCommitFiberUnmount == "function")
    try {
      at.onCommitFiberUnmount(ui, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ye || Cn(n, t);
    case 6:
      var r = pe,
        l = Ge;
      ((pe = null),
        Nt(e, t, n),
        (pe = r),
        (Ge = l),
        pe !== null &&
          (Ge
            ? ((e = pe),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : pe.removeChild(n.stateNode)));
      break;
    case 18:
      pe !== null &&
        (Ge
          ? ((e = pe),
            (n = n.stateNode),
            e.nodeType === 8
              ? Yi(e.parentNode, n)
              : e.nodeType === 1 && Yi(e, n),
            kr(e))
          : Yi(pe, n.stateNode));
      break;
    case 4:
      ((r = pe),
        (l = Ge),
        (pe = n.stateNode.containerInfo),
        (Ge = !0),
        Nt(e, t, n),
        (pe = r),
        (Ge = l));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ye &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          ((i = i.tag),
            o !== void 0 && (i & 2 || i & 4) && Zo(n, t, o),
            (l = l.next));
        } while (l !== r);
      }
      Nt(e, t, n);
      break;
    case 1:
      if (
        !ye &&
        (Cn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (s) {
          ee(n, t, s);
        }
      Nt(e, t, n);
      break;
    case 21:
      Nt(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ye = (r = ye) || n.memoizedState !== null), Nt(e, t, n), (ye = r))
        : Nt(e, t, n);
      break;
    default:
      Nt(e, t, n);
  }
}
function Pu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    (n === null && (n = e.stateNode = new Pm()),
      t.forEach(function (r) {
        var l = Um.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      }));
  }
}
function be(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          s = o;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              ((pe = s.stateNode), (Ge = !1));
              break e;
            case 3:
              ((pe = s.stateNode.containerInfo), (Ge = !0));
              break e;
            case 4:
              ((pe = s.stateNode.containerInfo), (Ge = !0));
              break e;
          }
          s = s.return;
        }
        if (pe === null) throw Error(R(160));
        (ud(i, o, l), (pe = null), (Ge = !1));
        var a = l.alternate;
        (a !== null && (a.return = null), (l.return = null));
      } catch (u) {
        ee(l, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) (cd(t, e), (t = t.sibling));
}
function cd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((be(t, e), it(e), r & 4)) {
        try {
          (mr(3, e, e.return), vi(3, e));
        } catch (w) {
          ee(e, e.return, w);
        }
        try {
          mr(5, e, e.return);
        } catch (w) {
          ee(e, e.return, w);
        }
      }
      break;
    case 1:
      (be(t, e), it(e), r & 512 && n !== null && Cn(n, n.return));
      break;
    case 5:
      if (
        (be(t, e),
        it(e),
        r & 512 && n !== null && Cn(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          wr(l, "");
        } catch (w) {
          ee(e, e.return, w);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          s = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            (s === "input" && i.type === "radio" && i.name != null && Lc(l, i),
              Co(s, o));
            var u = Co(s, i);
            for (o = 0; o < a.length; o += 2) {
              var c = a[o],
                d = a[o + 1];
              c === "style"
                ? Dc(l, d)
                : c === "dangerouslySetInnerHTML"
                  ? Ac(l, d)
                  : c === "children"
                    ? wr(l, d)
                    : Ss(l, c, d, u);
            }
            switch (s) {
              case "input":
                So(l, i);
                break;
              case "textarea":
                Oc(l, i);
                break;
              case "select":
                var g = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var S = i.value;
                S != null
                  ? Pn(l, !!i.multiple, S, !1)
                  : g !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Pn(l, !!i.multiple, i.defaultValue, !0)
                      : Pn(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[Pr] = i;
          } catch (w) {
            ee(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((be(t, e), it(e), r & 4)) {
        if (e.stateNode === null) throw Error(R(162));
        ((l = e.stateNode), (i = e.memoizedProps));
        try {
          l.nodeValue = i;
        } catch (w) {
          ee(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        (be(t, e), it(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          kr(t.containerInfo);
        } catch (w) {
          ee(e, e.return, w);
        }
      break;
    case 4:
      (be(t, e), it(e));
      break;
    case 13:
      (be(t, e),
        it(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (ea = te())),
        r & 4 && Pu(e));
      break;
    case 22:
      if (
        ((c = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ye = (u = ye) || c), be(t, e), (ye = u)) : be(t, e),
        it(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (T = e, c = e.child; c !== null; ) {
            for (d = T = c; T !== null; ) {
              switch (((g = T), (S = g.child), g.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  mr(4, g, g.return);
                  break;
                case 1:
                  Cn(g, g.return);
                  var y = g.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    ((r = g), (n = g.return));
                    try {
                      ((t = r),
                        (y.props = t.memoizedProps),
                        (y.state = t.memoizedState),
                        y.componentWillUnmount());
                    } catch (w) {
                      ee(r, n, w);
                    }
                  }
                  break;
                case 5:
                  Cn(g, g.return);
                  break;
                case 22:
                  if (g.memoizedState !== null) {
                    _u(d);
                    continue;
                  }
              }
              S !== null ? ((S.return = g), (T = S)) : _u(d);
            }
            c = c.sibling;
          }
        e: for (c = null, d = e; ; ) {
          if (d.tag === 5) {
            if (c === null) {
              c = d;
              try {
                ((l = d.stateNode),
                  u
                    ? ((i = l.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((s = d.stateNode),
                      (a = d.memoizedProps.style),
                      (o =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (s.style.display = Fc("display", o))));
              } catch (w) {
                ee(e, e.return, w);
              }
            }
          } else if (d.tag === 6) {
            if (c === null)
              try {
                d.stateNode.nodeValue = u ? "" : d.memoizedProps;
              } catch (w) {
                ee(e, e.return, w);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            ((d.child.return = d), (d = d.child));
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            (c === d && (c = null), (d = d.return));
          }
          (c === d && (c = null),
            (d.sibling.return = d.return),
            (d = d.sibling));
        }
      }
      break;
    case 19:
      (be(t, e), it(e), r & 4 && Pu(e));
      break;
    case 21:
      break;
    default:
      (be(t, e), it(e));
  }
}
function it(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (ad(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(R(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (wr(l, ""), (r.flags &= -33));
          var i = ju(e);
          ns(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            s = ju(e);
          ts(e, s, o);
          break;
        default:
          throw Error(R(161));
      }
    } catch (a) {
      ee(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function _m(e, t, n) {
  ((T = e), fd(e));
}
function fd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; T !== null; ) {
    var l = T,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || hl;
      if (!o) {
        var s = l.alternate,
          a = (s !== null && s.memoizedState !== null) || ye;
        s = hl;
        var u = ye;
        if (((hl = o), (ye = a) && !u))
          for (T = l; T !== null; )
            ((o = T),
              (a = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Lu(l)
                : a !== null
                  ? ((a.return = o), (T = a))
                  : Lu(l));
        for (; i !== null; ) ((T = i), fd(i), (i = i.sibling));
        ((T = l), (hl = s), (ye = u));
      }
      Tu(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (T = i)) : Tu(e);
  }
}
function Tu(e) {
  for (; T !== null; ) {
    var t = T;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ye || vi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ye)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ye(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = t.updateQueue;
              i !== null && pu(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                pu(t, o, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
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
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var d = c.dehydrated;
                    d !== null && kr(d);
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
              throw Error(R(163));
          }
        ye || (t.flags & 512 && es(t));
      } catch (g) {
        ee(t, t.return, g);
      }
    }
    if (t === e) {
      T = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      ((n.return = t.return), (T = n));
      break;
    }
    T = t.return;
  }
}
function _u(e) {
  for (; T !== null; ) {
    var t = T;
    if (t === e) {
      T = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      ((n.return = t.return), (T = n));
      break;
    }
    T = t.return;
  }
}
function Lu(e) {
  for (; T !== null; ) {
    var t = T;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            vi(4, t);
          } catch (a) {
            ee(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              ee(t, l, a);
            }
          }
          var i = t.return;
          try {
            es(t);
          } catch (a) {
            ee(t, i, a);
          }
          break;
        case 5:
          var o = t.return;
          try {
            es(t);
          } catch (a) {
            ee(t, o, a);
          }
      }
    } catch (a) {
      ee(t, t.return, a);
    }
    if (t === e) {
      T = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      ((s.return = t.return), (T = s));
      break;
    }
    T = t.return;
  }
}
var Lm = Math.ceil,
  ti = Rt.ReactCurrentDispatcher,
  Gs = Rt.ReactCurrentOwner,
  qe = Rt.ReactCurrentBatchConfig,
  M = 0,
  ae = null,
  le = null,
  he = 0,
  Ie = 0,
  jn = Qt(0),
  oe = 0,
  Ar = null,
  an = 0,
  yi = 0,
  Zs = 0,
  gr = null,
  Ne = null,
  ea = 0,
  Bn = 1 / 0,
  mt = null,
  ni = !1,
  rs = null,
  Ut = null,
  ml = !1,
  Lt = null,
  ri = 0,
  vr = 0,
  ls = null,
  _l = -1,
  Ll = 0;
function Ee() {
  return M & 6 ? te() : _l !== -1 ? _l : (_l = te());
}
function Mt(e) {
  return e.mode & 1
    ? M & 2 && he !== 0
      ? he & -he
      : hm.transition !== null
        ? (Ll === 0 && (Ll = Jc()), Ll)
        : ((e = W),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : tf(e.type))),
          e)
    : 1;
}
function nt(e, t, n, r) {
  if (50 < vr) throw ((vr = 0), (ls = null), Error(R(185)));
  (Ur(e, n, r),
    (!(M & 2) || e !== ae) &&
      (e === ae && (!(M & 2) && (yi |= n), oe === 4 && Tt(e, he)),
      Te(e, r),
      n === 1 && M === 0 && !(t.mode & 1) && ((Bn = te() + 500), hi && qt())));
}
function Te(e, t) {
  var n = e.callbackNode;
  hh(e, t);
  var r = Bl(e, e === ae ? he : 0);
  if (r === 0)
    (n !== null && Ba(n), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Ba(n), t === 1))
      (e.tag === 0 ? pm(Ou.bind(null, e)) : Sf(Ou.bind(null, e)),
        um(function () {
          !(M & 6) && qt();
        }),
        (n = null));
    else {
      switch (Xc(r)) {
        case 1:
          n = Cs;
          break;
        case 4:
          n = qc;
          break;
        case 16:
          n = Ml;
          break;
        case 536870912:
          n = Kc;
          break;
        default:
          n = Ml;
      }
      n = wd(n, dd.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = n));
  }
}
function dd(e, t) {
  if (((_l = -1), (Ll = 0), M & 6)) throw Error(R(327));
  var n = e.callbackNode;
  if (In() && e.callbackNode !== n) return null;
  var r = Bl(e, e === ae ? he : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = li(e, r);
  else {
    t = r;
    var l = M;
    M |= 2;
    var i = hd();
    (ae !== e || he !== t) && ((mt = null), (Bn = te() + 500), tn(e, t));
    do
      try {
        Am();
        break;
      } catch (s) {
        pd(e, s);
      }
    while (!0);
    (Ms(),
      (ti.current = i),
      (M = l),
      le !== null ? (t = 0) : ((ae = null), (he = 0), (t = oe)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Lo(e)), l !== 0 && ((r = l), (t = is(e, l)))), t === 1)
    )
      throw ((n = Ar), tn(e, 0), Tt(e, r), Te(e, te()), n);
    if (t === 6) Tt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !Om(l) &&
          ((t = li(e, r)),
          t === 2 && ((i = Lo(e)), i !== 0 && ((r = i), (t = is(e, i)))),
          t === 1))
      )
        throw ((n = Ar), tn(e, 0), Tt(e, r), Te(e, te()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(R(345));
        case 2:
          bt(e, Ne, mt);
          break;
        case 3:
          if (
            (Tt(e, r), (r & 130023424) === r && ((t = ea + 500 - te()), 10 < t))
          ) {
            if (Bl(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              (Ee(), (e.pingedLanes |= e.suspendedLanes & l));
              break;
            }
            e.timeoutHandle = Mo(bt.bind(null, e, Ne, mt), t);
            break;
          }
          bt(e, Ne, mt);
          break;
        case 4:
          if ((Tt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - tt(r);
            ((i = 1 << o), (o = t[o]), o > l && (l = o), (r &= ~i));
          }
          if (
            ((r = l),
            (r = te() - r),
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
                          : 1960 * Lm(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Mo(bt.bind(null, e, Ne, mt), r);
            break;
          }
          bt(e, Ne, mt);
          break;
        case 5:
          bt(e, Ne, mt);
          break;
        default:
          throw Error(R(329));
      }
    }
  }
  return (Te(e, te()), e.callbackNode === n ? dd.bind(null, e) : null);
}
function is(e, t) {
  var n = gr;
  return (
    e.current.memoizedState.isDehydrated && (tn(e, t).flags |= 256),
    (e = li(e, t)),
    e !== 2 && ((t = Ne), (Ne = n), t !== null && os(t)),
    e
  );
}
function os(e) {
  Ne === null ? (Ne = e) : Ne.push.apply(Ne, e);
}
function Om(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!rt(i(), l)) return !1;
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
function Tt(e, t) {
  for (
    t &= ~Zs,
      t &= ~yi,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var n = 31 - tt(t),
      r = 1 << n;
    ((e[n] = -1), (t &= ~r));
  }
}
function Ou(e) {
  if (M & 6) throw Error(R(327));
  In();
  var t = Bl(e, 0);
  if (!(t & 1)) return (Te(e, te()), null);
  var n = li(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Lo(e);
    r !== 0 && ((t = r), (n = is(e, r)));
  }
  if (n === 1) throw ((n = Ar), tn(e, 0), Tt(e, t), Te(e, te()), n);
  if (n === 6) throw Error(R(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    bt(e, Ne, mt),
    Te(e, te()),
    null
  );
}
function ta(e, t) {
  var n = M;
  M |= 1;
  try {
    return e(t);
  } finally {
    ((M = n), M === 0 && ((Bn = te() + 500), hi && qt()));
  }
}
function un(e) {
  Lt !== null && Lt.tag === 0 && !(M & 6) && In();
  var t = M;
  M |= 1;
  var n = qe.transition,
    r = W;
  try {
    if (((qe.transition = null), (W = 1), e)) return e();
  } finally {
    ((W = r), (qe.transition = n), (M = t), !(M & 6) && qt());
  }
}
function na() {
  ((Ie = jn.current), K(jn));
}
function tn(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), am(n)), le !== null))
    for (n = le.return; n !== null; ) {
      var r = n;
      switch ((Ds(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && Ql());
          break;
        case 3:
          (Un(), K(je), K(xe), Qs());
          break;
        case 5:
          Ws(r);
          break;
        case 4:
          Un();
          break;
        case 13:
          K(Y);
          break;
        case 19:
          K(Y);
          break;
        case 10:
          Bs(r.type._context);
          break;
        case 22:
        case 23:
          na();
      }
      n = n.return;
    }
  if (
    ((ae = e),
    (le = e = Bt(e.current, null)),
    (he = Ie = t),
    (oe = 0),
    (Ar = null),
    (Zs = yi = an = 0),
    (Ne = gr = null),
    Gt !== null)
  ) {
    for (t = 0; t < Gt.length; t++)
      if (((n = Gt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          ((i.next = l), (r.next = o));
        }
        n.pending = r;
      }
    Gt = null;
  }
  return e;
}
function pd(e, t) {
  do {
    var n = le;
    try {
      if ((Ms(), (jl.current = ei), Zl)) {
        for (var r = G.memoizedState; r !== null; ) {
          var l = r.queue;
          (l !== null && (l.pending = null), (r = r.next));
        }
        Zl = !1;
      }
      if (
        ((sn = 0),
        (se = ie = G = null),
        (hr = !1),
        (Lr = 0),
        (Gs.current = null),
        n === null || n.return === null)
      ) {
        ((oe = 1), (Ar = t), (le = null));
        break;
      }
      e: {
        var i = e,
          o = n.return,
          s = n,
          a = t;
        if (
          ((t = he),
          (s.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            c = s,
            d = c.tag;
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var g = c.alternate;
            g
              ? ((c.updateQueue = g.updateQueue),
                (c.memoizedState = g.memoizedState),
                (c.lanes = g.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var S = wu(o);
          if (S !== null) {
            ((S.flags &= -257),
              xu(S, o, s, i, t),
              S.mode & 1 && yu(i, u, t),
              (t = S),
              (a = u));
            var y = t.updateQueue;
            if (y === null) {
              var w = new Set();
              (w.add(a), (t.updateQueue = w));
            } else y.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              (yu(i, u, t), ra());
              break e;
            }
            a = Error(R(426));
          }
        } else if (X && s.mode & 1) {
          var v = wu(o);
          if (v !== null) {
            (!(v.flags & 65536) && (v.flags |= 256),
              xu(v, o, s, i, t),
              zs(Mn(a, s)));
            break e;
          }
        }
        ((i = a = Mn(a, s)),
          oe !== 4 && (oe = 2),
          gr === null ? (gr = [i]) : gr.push(i),
          (i = o));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
              var p = bf(i, a, t);
              du(i, p);
              break e;
            case 1:
              s = a;
              var h = i.type,
                m = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (Ut === null || !Ut.has(m))))
              ) {
                ((i.flags |= 65536), (t &= -t), (i.lanes |= t));
                var k = Yf(i, s, t);
                du(i, k);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      gd(n);
    } catch (N) {
      ((t = N), le === n && n !== null && (le = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function hd() {
  var e = ti.current;
  return ((ti.current = ei), e === null ? ei : e);
}
function ra() {
  ((oe === 0 || oe === 3 || oe === 2) && (oe = 4),
    ae === null || (!(an & 268435455) && !(yi & 268435455)) || Tt(ae, he));
}
function li(e, t) {
  var n = M;
  M |= 2;
  var r = hd();
  (ae !== e || he !== t) && ((mt = null), tn(e, t));
  do
    try {
      Im();
      break;
    } catch (l) {
      pd(e, l);
    }
  while (!0);
  if ((Ms(), (M = n), (ti.current = r), le !== null)) throw Error(R(261));
  return ((ae = null), (he = 0), oe);
}
function Im() {
  for (; le !== null; ) md(le);
}
function Am() {
  for (; le !== null && !ih(); ) md(le);
}
function md(e) {
  var t = yd(e.alternate, e, Ie);
  ((e.memoizedProps = e.pendingProps),
    t === null ? gd(e) : (le = t),
    (Gs.current = null));
}
function gd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = jm(n, t)), n !== null)) {
        ((n.flags &= 32767), (le = n));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((oe = 6), (le = null));
        return;
      }
    } else if (((n = Cm(n, t, Ie)), n !== null)) {
      le = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      le = t;
      return;
    }
    le = t = e;
  } while (t !== null);
  oe === 0 && (oe = 5);
}
function bt(e, t, n) {
  var r = W,
    l = qe.transition;
  try {
    ((qe.transition = null), (W = 1), Fm(e, t, n, r));
  } finally {
    ((qe.transition = l), (W = r));
  }
  return null;
}
function Fm(e, t, n, r) {
  do In();
  while (Lt !== null);
  if (M & 6) throw Error(R(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(R(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (mh(e, i),
    e === ae && ((le = ae = null), (he = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      ml ||
      ((ml = !0),
      wd(Ml, function () {
        return (In(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = qe.transition), (qe.transition = null));
    var o = W;
    W = 1;
    var s = M;
    ((M |= 4),
      (Gs.current = null),
      Tm(e, n),
      cd(n, e),
      tm(zo),
      ($l = !!Do),
      (zo = Do = null),
      (e.current = n),
      _m(n),
      oh(),
      (M = s),
      (W = o),
      (qe.transition = i));
  } else e.current = n;
  if (
    (ml && ((ml = !1), (Lt = e), (ri = l)),
    (i = e.pendingLanes),
    i === 0 && (Ut = null),
    uh(n.stateNode),
    Te(e, te()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      ((l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest }));
  if (ni) throw ((ni = !1), (e = rs), (rs = null), e);
  return (
    ri & 1 && e.tag !== 0 && In(),
    (i = e.pendingLanes),
    i & 1 ? (e === ls ? vr++ : ((vr = 0), (ls = e))) : (vr = 0),
    qt(),
    null
  );
}
function In() {
  if (Lt !== null) {
    var e = Xc(ri),
      t = qe.transition,
      n = W;
    try {
      if (((qe.transition = null), (W = 16 > e ? 16 : e), Lt === null))
        var r = !1;
      else {
        if (((e = Lt), (Lt = null), (ri = 0), M & 6)) throw Error(R(331));
        var l = M;
        for (M |= 4, T = e.current; T !== null; ) {
          var i = T,
            o = i.child;
          if (T.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var u = s[a];
                for (T = u; T !== null; ) {
                  var c = T;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      mr(8, c, i);
                  }
                  var d = c.child;
                  if (d !== null) ((d.return = c), (T = d));
                  else
                    for (; T !== null; ) {
                      c = T;
                      var g = c.sibling,
                        S = c.return;
                      if ((sd(c), c === u)) {
                        T = null;
                        break;
                      }
                      if (g !== null) {
                        ((g.return = S), (T = g));
                        break;
                      }
                      T = S;
                    }
                }
              }
              var y = i.alternate;
              if (y !== null) {
                var w = y.child;
                if (w !== null) {
                  y.child = null;
                  do {
                    var v = w.sibling;
                    ((w.sibling = null), (w = v));
                  } while (w !== null);
                }
              }
              T = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) ((o.return = i), (T = o));
          else
            e: for (; T !== null; ) {
              if (((i = T), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    mr(9, i, i.return);
                }
              var p = i.sibling;
              if (p !== null) {
                ((p.return = i.return), (T = p));
                break e;
              }
              T = i.return;
            }
        }
        var h = e.current;
        for (T = h; T !== null; ) {
          o = T;
          var m = o.child;
          if (o.subtreeFlags & 2064 && m !== null) ((m.return = o), (T = m));
          else
            e: for (o = h; T !== null; ) {
              if (((s = T), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      vi(9, s);
                  }
                } catch (N) {
                  ee(s, s.return, N);
                }
              if (s === o) {
                T = null;
                break e;
              }
              var k = s.sibling;
              if (k !== null) {
                ((k.return = s.return), (T = k));
                break e;
              }
              T = s.return;
            }
        }
        if (
          ((M = l), qt(), at && typeof at.onPostCommitFiberRoot == "function")
        )
          try {
            at.onPostCommitFiberRoot(ui, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((W = n), (qe.transition = t));
    }
  }
  return !1;
}
function Iu(e, t, n) {
  ((t = Mn(n, t)),
    (t = bf(e, t, 1)),
    (e = zt(e, t, 1)),
    (t = Ee()),
    e !== null && (Ur(e, 1, t), Te(e, t)));
}
function ee(e, t, n) {
  if (e.tag === 3) Iu(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Iu(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Ut === null || !Ut.has(r)))
        ) {
          ((e = Mn(n, e)),
            (e = Yf(t, e, 1)),
            (t = zt(t, e, 1)),
            (e = Ee()),
            t !== null && (Ur(t, 1, e), Te(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function Dm(e, t, n) {
  var r = e.pingCache;
  (r !== null && r.delete(t),
    (t = Ee()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ae === e &&
      (he & n) === n &&
      (oe === 4 || (oe === 3 && (he & 130023424) === he && 500 > te() - ea)
        ? tn(e, 0)
        : (Zs |= n)),
    Te(e, t));
}
function vd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = il), (il <<= 1), !(il & 130023424) && (il = 4194304))
      : (t = 1));
  var n = Ee();
  ((e = Et(e, t)), e !== null && (Ur(e, t, n), Te(e, n)));
}
function zm(e) {
  var t = e.memoizedState,
    n = 0;
  (t !== null && (n = t.retryLane), vd(e, n));
}
function Um(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(R(314));
  }
  (r !== null && r.delete(t), vd(e, n));
}
var yd;
yd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || je.current) Ce = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return ((Ce = !1), Nm(e, t, n));
      Ce = !!(e.flags & 131072);
    }
  else ((Ce = !1), X && t.flags & 1048576 && Ef(t, Jl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      (Tl(e, t), (e = t.pendingProps));
      var l = Fn(t, xe.current);
      (On(t, n), (l = Ks(null, t, r, e, l, n)));
      var i = Js();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Pe(r) ? ((i = !0), ql(t)) : (i = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Hs(t),
            (l.updater = gi),
            (t.stateNode = l),
            (l._reactInternals = t),
            qo(t, r, e, n),
            (t = Xo(null, t, r, !0, i, n)))
          : ((t.tag = 0), X && i && Fs(t), Se(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Tl(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = Bm(r)),
          (e = Ye(r, e)),
          l)
        ) {
          case 0:
            t = Jo(null, t, r, e, n);
            break e;
          case 1:
            t = ku(null, t, r, e, n);
            break e;
          case 11:
            t = Su(null, t, r, e, n);
            break e;
          case 14:
            t = Eu(null, t, r, Ye(r.type, e), n);
            break e;
        }
        throw Error(R(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Jo(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        ku(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((td(t), e === null)) throw Error(R(387));
        ((r = t.pendingProps),
          (i = t.memoizedState),
          (l = i.element),
          Pf(e, t),
          Yl(t, r, null, n));
        var o = t.memoizedState;
        if (((r = o.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            ((l = Mn(Error(R(423)), t)), (t = Ru(e, t, r, n, l)));
            break e;
          } else if (r !== l) {
            ((l = Mn(Error(R(424)), t)), (t = Ru(e, t, r, n, l)));
            break e;
          } else
            for (
              Fe = Dt(t.stateNode.containerInfo.firstChild),
                De = t,
                X = !0,
                Ze = null,
                n = Cf(t, null, r, n),
                t.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((Dn(), r === l)) {
            t = kt(e, t, n);
            break e;
          }
          Se(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Tf(t),
        e === null && Vo(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (o = l.children),
        Uo(r, l) ? (o = null) : i !== null && Uo(r, i) && (t.flags |= 32),
        ed(e, t),
        Se(e, t, o, n),
        t.child
      );
    case 6:
      return (e === null && Vo(t), null);
    case 13:
      return nd(e, t, n);
    case 4:
      return (
        Vs(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = zn(t, null, r, n)) : Se(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Su(e, t, r, l, n)
      );
    case 7:
      return (Se(e, t, t.pendingProps, n), t.child);
    case 8:
      return (Se(e, t, t.pendingProps.children, n), t.child);
    case 12:
      return (Se(e, t, t.pendingProps.children, n), t.child);
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (o = l.value),
          Q(Xl, r._currentValue),
          (r._currentValue = o),
          i !== null)
        )
          if (rt(i.value, o)) {
            if (i.children === l.children && !je.current) {
              t = kt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var s = i.dependencies;
              if (s !== null) {
                o = i.child;
                for (var a = s.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      ((a = wt(-1, n & -n)), (a.tag = 2));
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        (c === null
                          ? (a.next = a)
                          : ((a.next = c.next), (c.next = a)),
                          (u.pending = a));
                      }
                    }
                    ((i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      Wo(i.return, n, t),
                      (s.lanes |= n));
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((o = i.return), o === null)) throw Error(R(341));
                ((o.lanes |= n),
                  (s = o.alternate),
                  s !== null && (s.lanes |= n),
                  Wo(o, n, t),
                  (o = i.sibling));
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((i = o.sibling), i !== null)) {
                    ((i.return = o.return), (o = i));
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        (Se(e, t, l.children, n), (t = t.child));
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        On(t, n),
        (l = Ke(l)),
        (r = r(l)),
        (t.flags |= 1),
        Se(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Ye(r, t.pendingProps)),
        (l = Ye(r.type, l)),
        Eu(e, t, r, l, n)
      );
    case 15:
      return Gf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Ye(r, l)),
        Tl(e, t),
        (t.tag = 1),
        Pe(r) ? ((e = !0), ql(t)) : (e = !1),
        On(t, n),
        Xf(t, r, l),
        qo(t, r, l, n),
        Xo(null, t, r, !0, e, n)
      );
    case 19:
      return rd(e, t, n);
    case 22:
      return Zf(e, t, n);
  }
  throw Error(R(156, t.tag));
};
function wd(e, t) {
  return Qc(e, t);
}
function Mm(e, t, n, r) {
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
function Qe(e, t, n, r) {
  return new Mm(e, t, n, r);
}
function la(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function Bm(e) {
  if (typeof e == "function") return la(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === ks)) return 11;
    if (e === Rs) return 14;
  }
  return 2;
}
function Bt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Qe(e.tag, t, e.key, e.mode)),
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
function Ol(e, t, n, r, l, i) {
  var o = 2;
  if (((r = e), typeof e == "function")) la(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case vn:
        return nn(n.children, l, i, t);
      case Es:
        ((o = 8), (l |= 8));
        break;
      case go:
        return (
          (e = Qe(12, n, t, l | 2)),
          (e.elementType = go),
          (e.lanes = i),
          e
        );
      case vo:
        return ((e = Qe(13, n, t, l)), (e.elementType = vo), (e.lanes = i), e);
      case yo:
        return ((e = Qe(19, n, t, l)), (e.elementType = yo), (e.lanes = i), e);
      case Pc:
        return wi(n, l, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Cc:
              o = 10;
              break e;
            case jc:
              o = 9;
              break e;
            case ks:
              o = 11;
              break e;
            case Rs:
              o = 14;
              break e;
            case Ct:
              ((o = 16), (r = null));
              break e;
          }
        throw Error(R(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Qe(o, n, t, l)),
    (t.elementType = e),
    (t.type = r),
    (t.lanes = i),
    t
  );
}
function nn(e, t, n, r) {
  return ((e = Qe(7, e, r, t)), (e.lanes = n), e);
}
function wi(e, t, n, r) {
  return (
    (e = Qe(22, e, r, t)),
    (e.elementType = Pc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function io(e, t, n) {
  return ((e = Qe(6, e, null, t)), (e.lanes = n), e);
}
function oo(e, t, n) {
  return (
    (t = Qe(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function $m(e, t, n, r, l) {
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
    (this.eventTimes = Bi(0)),
    (this.expirationTimes = Bi(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Bi(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null));
}
function ia(e, t, n, r, l, i, o, s, a) {
  return (
    (e = new $m(e, t, n, s, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Qe(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Hs(i),
    e
  );
}
function Hm(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: gn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function xd(e) {
  if (!e) return Vt;
  e = e._reactInternals;
  e: {
    if (dn(e) !== e || e.tag !== 1) throw Error(R(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Pe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(R(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Pe(n)) return xf(e, n, t);
  }
  return t;
}
function Sd(e, t, n, r, l, i, o, s, a) {
  return (
    (e = ia(n, r, !0, e, l, i, o, s, a)),
    (e.context = xd(null)),
    (n = e.current),
    (r = Ee()),
    (l = Mt(n)),
    (i = wt(r, l)),
    (i.callback = t ?? null),
    zt(n, i, l),
    (e.current.lanes = l),
    Ur(e, l, r),
    Te(e, r),
    e
  );
}
function xi(e, t, n, r) {
  var l = t.current,
    i = Ee(),
    o = Mt(l);
  return (
    (n = xd(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = wt(i, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = zt(l, t, o)),
    e !== null && (nt(e, l, o, i), Cl(e, l, o)),
    o
  );
}
function ii(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Au(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function oa(e, t) {
  (Au(e, t), (e = e.alternate) && Au(e, t));
}
function Vm() {
  return null;
}
var Ed =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function sa(e) {
  this._internalRoot = e;
}
Si.prototype.render = sa.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(R(409));
  xi(e, t, null, null);
};
Si.prototype.unmount = sa.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (un(function () {
      xi(null, e, null, null);
    }),
      (t[St] = null));
  }
};
function Si(e) {
  this._internalRoot = e;
}
Si.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Gc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Pt.length && t !== 0 && t < Pt[n].priority; n++);
    (Pt.splice(n, 0, e), n === 0 && ef(e));
  }
};
function aa(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Ei(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Fu() {}
function Wm(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = ii(o);
        i.call(u);
      };
    }
    var o = Sd(t, r, e, 0, null, !1, !1, "", Fu);
    return (
      (e._reactRootContainer = o),
      (e[St] = o.current),
      Cr(e.nodeType === 8 ? e.parentNode : e),
      un(),
      o
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var u = ii(a);
      s.call(u);
    };
  }
  var a = ia(e, 0, !1, null, null, !1, !1, "", Fu);
  return (
    (e._reactRootContainer = a),
    (e[St] = a.current),
    Cr(e.nodeType === 8 ? e.parentNode : e),
    un(function () {
      xi(t, a, n, r);
    }),
    a
  );
}
function ki(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var s = l;
      l = function () {
        var a = ii(o);
        s.call(a);
      };
    }
    xi(t, o, e, l);
  } else o = Wm(n, t, e, l, r);
  return ii(o);
}
bc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = or(t.pendingLanes);
        n !== 0 &&
          (js(t, n | 1), Te(t, te()), !(M & 6) && ((Bn = te() + 500), qt()));
      }
      break;
    case 13:
      (un(function () {
        var r = Et(e, 1);
        if (r !== null) {
          var l = Ee();
          nt(r, e, 1, l);
        }
      }),
        oa(e, 1));
  }
};
Ps = function (e) {
  if (e.tag === 13) {
    var t = Et(e, 134217728);
    if (t !== null) {
      var n = Ee();
      nt(t, e, 134217728, n);
    }
    oa(e, 134217728);
  }
};
Yc = function (e) {
  if (e.tag === 13) {
    var t = Mt(e),
      n = Et(e, t);
    if (n !== null) {
      var r = Ee();
      nt(n, e, t, r);
    }
    oa(e, t);
  }
};
Gc = function () {
  return W;
};
Zc = function (e, t) {
  var n = W;
  try {
    return ((W = e), t());
  } finally {
    W = n;
  }
};
Po = function (e, t, n) {
  switch (t) {
    case "input":
      if ((So(e, n), (t = n.name), n.type === "radio" && t != null)) {
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
            var l = pi(r);
            if (!l) throw Error(R(90));
            (_c(r), So(r, l));
          }
        }
      }
      break;
    case "textarea":
      Oc(e, n);
      break;
    case "select":
      ((t = n.value), t != null && Pn(e, !!n.multiple, t, !1));
  }
};
Mc = ta;
Bc = un;
var Qm = { usingClientEntryPoint: !1, Events: [Br, Sn, pi, zc, Uc, ta] },
  nr = {
    findFiberByHostInstance: Yt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  qm = {
    bundleType: nr.bundleType,
    version: nr.version,
    rendererPackageName: nr.rendererPackageName,
    rendererConfig: nr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Rt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = Vc(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: nr.findFiberByHostInstance || Vm,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var gl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!gl.isDisabled && gl.supportsFiber)
    try {
      ((ui = gl.inject(qm)), (at = gl));
    } catch {}
}
Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qm;
Ue.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!aa(t)) throw Error(R(200));
  return Hm(e, t, null, n);
};
Ue.createRoot = function (e, t) {
  if (!aa(e)) throw Error(R(299));
  var n = !1,
    r = "",
    l = Ed;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = ia(e, 1, !1, null, null, n, !1, r, l)),
    (e[St] = t.current),
    Cr(e.nodeType === 8 ? e.parentNode : e),
    new sa(t)
  );
};
Ue.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(R(188))
      : ((e = Object.keys(e).join(",")), Error(R(268, e)));
  return ((e = Vc(t)), (e = e === null ? null : e.stateNode), e);
};
Ue.flushSync = function (e) {
  return un(e);
};
Ue.hydrate = function (e, t, n) {
  if (!Ei(t)) throw Error(R(200));
  return ki(null, e, t, !0, n);
};
Ue.hydrateRoot = function (e, t, n) {
  if (!aa(e)) throw Error(R(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = "",
    o = Ed;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Sd(t, null, e, 1, n ?? null, l, !1, i, o)),
    (e[St] = t.current),
    Cr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      ((n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l));
  return new Si(t);
};
Ue.render = function (e, t, n) {
  if (!Ei(t)) throw Error(R(200));
  return ki(null, e, t, !1, n);
};
Ue.unmountComponentAtNode = function (e) {
  if (!Ei(e)) throw Error(R(40));
  return e._reactRootContainer
    ? (un(function () {
        ki(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[St] = null));
        });
      }),
      !0)
    : !1;
};
Ue.unstable_batchedUpdates = ta;
Ue.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!Ei(n)) throw Error(R(200));
  if (e == null || e._reactInternals === void 0) throw Error(R(38));
  return ki(e, t, n, !1, r);
};
Ue.version = "18.3.1-next-f1338f8080-20240426";
function kd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kd);
    } catch (e) {
      console.error(e);
    }
}
(kd(), (Ec.exports = Ue));
var Km = Ec.exports,
  Du = Km;
((ho.createRoot = Du.createRoot), (ho.hydrateRoot = Du.hydrateRoot));
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Fr() {
  return (
    (Fr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Fr.apply(this, arguments)
  );
}
var Ot;
(function (e) {
  ((e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE"));
})(Ot || (Ot = {}));
const zu = "popstate";
function Jm(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: i, search: o, hash: s } = r.location;
    return ss(
      "",
      { pathname: i, search: o, hash: s },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default",
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : oi(l);
  }
  return bm(t, n, null, e);
}
function ne(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function ua(e, t) {
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
function Uu(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function ss(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    Fr(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? Qn(t) : t,
      { state: n, key: (t && t.key) || r || Xm() },
    )
  );
}
function oi(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function Qn(e) {
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
function bm(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: i = !1 } = r,
    o = l.history,
    s = Ot.Pop,
    a = null,
    u = c();
  u == null && ((u = 0), o.replaceState(Fr({}, o.state, { idx: u }), ""));
  function c() {
    return (o.state || { idx: null }).idx;
  }
  function d() {
    s = Ot.Pop;
    let v = c(),
      p = v == null ? null : v - u;
    ((u = v), a && a({ action: s, location: w.location, delta: p }));
  }
  function g(v, p) {
    s = Ot.Push;
    let h = ss(w.location, v, p);
    u = c() + 1;
    let m = Uu(h, u),
      k = w.createHref(h);
    try {
      o.pushState(m, "", k);
    } catch (N) {
      if (N instanceof DOMException && N.name === "DataCloneError") throw N;
      l.location.assign(k);
    }
    i && a && a({ action: s, location: w.location, delta: 1 });
  }
  function S(v, p) {
    s = Ot.Replace;
    let h = ss(w.location, v, p);
    u = c();
    let m = Uu(h, u),
      k = w.createHref(h);
    (o.replaceState(m, "", k),
      i && a && a({ action: s, location: w.location, delta: 0 }));
  }
  function y(v) {
    let p = l.location.origin !== "null" ? l.location.origin : l.location.href,
      h = typeof v == "string" ? v : oi(v);
    return (
      (h = h.replace(/ $/, "%20")),
      ne(
        p,
        "No window.location.(origin|href) available to create URL for href: " +
          h,
      ),
      new URL(h, p)
    );
  }
  let w = {
    get action() {
      return s;
    },
    get location() {
      return e(l, o);
    },
    listen(v) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(zu, d),
        (a = v),
        () => {
          (l.removeEventListener(zu, d), (a = null));
        }
      );
    },
    createHref(v) {
      return t(l, v);
    },
    createURL: y,
    encodeLocation(v) {
      let p = y(v);
      return { pathname: p.pathname, search: p.search, hash: p.hash };
    },
    push: g,
    replace: S,
    go(v) {
      return o.go(v);
    },
  };
  return w;
}
var Mu;
(function (e) {
  ((e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error"));
})(Mu || (Mu = {}));
function Ym(e, t, n) {
  return (n === void 0 && (n = "/"), Gm(e, t, n));
}
function Gm(e, t, n, r) {
  let l = typeof t == "string" ? Qn(t) : t,
    i = ca(l.pathname || "/", n);
  if (i == null) return null;
  let o = Rd(e);
  Zm(o);
  let s = null;
  for (let a = 0; s == null && a < o.length; ++a) {
    let u = fg(i);
    s = ag(o[a], u);
  }
  return s;
}
function Rd(e, t, n, r) {
  (t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = ""));
  let l = (i, o, s) => {
    let a = {
      relativePath: s === void 0 ? i.path || "" : s,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i,
    };
    a.relativePath.startsWith("/") &&
      (ne(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let u = $t([r, a.relativePath]),
      c = n.concat(a);
    (i.children &&
      i.children.length > 0 &&
      (ne(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".'),
      ),
      Rd(i.children, t, c, u)),
      !(i.path == null && !i.index) &&
        t.push({ path: u, score: og(u, i.index), routesMeta: c }));
  };
  return (
    e.forEach((i, o) => {
      var s;
      if (i.path === "" || !((s = i.path) != null && s.includes("?"))) l(i, o);
      else for (let a of Nd(i.path)) l(i, o, a);
    }),
    t
  );
}
function Nd(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [i, ""] : [i];
  let o = Nd(r.join("/")),
    s = [];
  return (
    s.push(...o.map((a) => (a === "" ? i : [i, a].join("/")))),
    l && s.push(...o),
    s.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function Zm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : sg(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const eg = /^:[\w-]+$/,
  tg = 3,
  ng = 2,
  rg = 1,
  lg = 10,
  ig = -2,
  Bu = (e) => e === "*";
function og(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(Bu) && (r += ig),
    t && (r += ng),
    n
      .filter((l) => !Bu(l))
      .reduce((l, i) => l + (eg.test(i) ? tg : i === "" ? rg : lg), r)
  );
}
function sg(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function ag(e, t, n) {
  let { routesMeta: r } = e,
    l = {},
    i = "/",
    o = [];
  for (let s = 0; s < r.length; ++s) {
    let a = r[s],
      u = s === r.length - 1,
      c = i === "/" ? t : t.slice(i.length) || "/",
      d = ug(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: u },
        c,
      ),
      g = a.route;
    if (!d) return null;
    (Object.assign(l, d.params),
      o.push({
        params: l,
        pathname: $t([i, d.pathname]),
        pathnameBase: gg($t([i, d.pathnameBase])),
        route: g,
      }),
      d.pathnameBase !== "/" && (i = $t([i, d.pathnameBase])));
  }
  return o;
}
function ug(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = cg(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let i = l[0],
    o = i.replace(/(.)\/+$/, "$1"),
    s = l.slice(1);
  return {
    params: r.reduce((u, c, d) => {
      let { paramName: g, isOptional: S } = c;
      if (g === "*") {
        let w = s[d] || "";
        o = i.slice(0, i.length - w.length).replace(/(.)\/+$/, "$1");
      }
      const y = s[d];
      return (
        S && !y ? (u[g] = void 0) : (u[g] = (y || "").replace(/%2F/g, "/")),
        u
      );
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e,
  };
}
function cg(e, t, n) {
  (t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    ua(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'),
    ));
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, s, a) => (
            r.push({ paramName: s, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
        ? (l += "\\/*$")
        : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function fg(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      ua(
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
function ca(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
const dg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  pg = (e) => dg.test(e);
function hg(e, t) {
  t === void 0 && (t = "/");
  let {
      pathname: n,
      search: r = "",
      hash: l = "",
    } = typeof e == "string" ? Qn(e) : e,
    i;
  if (n)
    if (pg(n)) i = n;
    else {
      if (n.includes("//")) {
        let o = n;
        ((n = n.replace(/\/\/+/g, "/")),
          ua(
            !1,
            "Pathnames cannot have embedded double slashes - normalizing " +
              (o + " -> " + n),
          ));
      }
      n.startsWith("/") ? (i = $u(n.substring(1), "/")) : (i = $u(n, t));
    }
  else i = t;
  return { pathname: i, search: vg(r), hash: yg(l) };
}
function $u(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function so(e, t, n, r) {
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
function mg(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function fa(e, t) {
  let n = mg(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function da(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = Qn(e))
    : ((l = Fr({}, e)),
      ne(
        !l.pathname || !l.pathname.includes("?"),
        so("?", "pathname", "search", l),
      ),
      ne(
        !l.pathname || !l.pathname.includes("#"),
        so("#", "pathname", "hash", l),
      ),
      ne(!l.search || !l.search.includes("#"), so("#", "search", "hash", l)));
  let i = e === "" || l.pathname === "",
    o = i ? "/" : l.pathname,
    s;
  if (o == null) s = n;
  else {
    let d = t.length - 1;
    if (!r && o.startsWith("..")) {
      let g = o.split("/");
      for (; g[0] === ".."; ) (g.shift(), (d -= 1));
      l.pathname = g.join("/");
    }
    s = d >= 0 ? t[d] : "/";
  }
  let a = hg(l, s),
    u = o && o !== "/" && o.endsWith("/"),
    c = (i || o === ".") && n.endsWith("/");
  return (!a.pathname.endsWith("/") && (u || c) && (a.pathname += "/"), a);
}
const $t = (e) => e.join("/").replace(/\/\/+/g, "/"),
  gg = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  vg = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  yg = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function wg(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const Cd = ["post", "put", "patch", "delete"];
new Set(Cd);
const xg = ["get", ...Cd];
new Set(xg);
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Dr() {
  return (
    (Dr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Dr.apply(this, arguments)
  );
}
const pa = E.createContext(null),
  Sg = E.createContext(null),
  Kt = E.createContext(null),
  Ri = E.createContext(null),
  Jt = E.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  jd = E.createContext(null);
function Eg(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  qn() || ne(!1);
  let { basename: r, navigator: l } = E.useContext(Kt),
    { hash: i, pathname: o, search: s } = Td(e, { relative: n }),
    a = o;
  return (
    r !== "/" && (a = o === "/" ? r : $t([r, o])),
    l.createHref({ pathname: a, search: s, hash: i })
  );
}
function qn() {
  return E.useContext(Ri) != null;
}
function Hr() {
  return (qn() || ne(!1), E.useContext(Ri).location);
}
function Pd(e) {
  E.useContext(Kt).static || E.useLayoutEffect(e);
}
function Ni() {
  let { isDataRoute: e } = E.useContext(Jt);
  return e ? Fg() : kg();
}
function kg() {
  qn() || ne(!1);
  let e = E.useContext(pa),
    { basename: t, future: n, navigator: r } = E.useContext(Kt),
    { matches: l } = E.useContext(Jt),
    { pathname: i } = Hr(),
    o = JSON.stringify(fa(l, n.v7_relativeSplatPath)),
    s = E.useRef(!1);
  return (
    Pd(() => {
      s.current = !0;
    }),
    E.useCallback(
      function (u, c) {
        if ((c === void 0 && (c = {}), !s.current)) return;
        if (typeof u == "number") {
          r.go(u);
          return;
        }
        let d = da(u, JSON.parse(o), i, c.relative === "path");
        (e == null &&
          t !== "/" &&
          (d.pathname = d.pathname === "/" ? t : $t([t, d.pathname])),
          (c.replace ? r.replace : r.push)(d, c.state, c));
      },
      [t, r, o, i, e],
    )
  );
}
function Td(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = E.useContext(Kt),
    { matches: l } = E.useContext(Jt),
    { pathname: i } = Hr(),
    o = JSON.stringify(fa(l, r.v7_relativeSplatPath));
  return E.useMemo(() => da(e, JSON.parse(o), i, n === "path"), [e, o, i, n]);
}
function Rg(e, t) {
  return Ng(e, t);
}
function Ng(e, t, n, r) {
  qn() || ne(!1);
  let { navigator: l } = E.useContext(Kt),
    { matches: i } = E.useContext(Jt),
    o = i[i.length - 1],
    s = o ? o.params : {};
  o && o.pathname;
  let a = o ? o.pathnameBase : "/";
  o && o.route;
  let u = Hr(),
    c;
  if (t) {
    var d;
    let v = typeof t == "string" ? Qn(t) : t;
    (a === "/" || ((d = v.pathname) != null && d.startsWith(a)) || ne(!1),
      (c = v));
  } else c = u;
  let g = c.pathname || "/",
    S = g;
  if (a !== "/") {
    let v = a.replace(/^\//, "").split("/");
    S = "/" + g.replace(/^\//, "").split("/").slice(v.length).join("/");
  }
  let y = Ym(e, { pathname: S }),
    w = _g(
      y &&
        y.map((v) =>
          Object.assign({}, v, {
            params: Object.assign({}, s, v.params),
            pathname: $t([
              a,
              l.encodeLocation
                ? l.encodeLocation(v.pathname).pathname
                : v.pathname,
            ]),
            pathnameBase:
              v.pathnameBase === "/"
                ? a
                : $t([
                    a,
                    l.encodeLocation
                      ? l.encodeLocation(v.pathnameBase).pathname
                      : v.pathnameBase,
                  ]),
          }),
        ),
      i,
      n,
      r,
    );
  return t && w
    ? E.createElement(
        Ri.Provider,
        {
          value: {
            location: Dr(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              c,
            ),
            navigationType: Ot.Pop,
          },
        },
        w,
      )
    : w;
}
function Cg() {
  let e = Ag(),
    t = wg(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return E.createElement(
    E.Fragment,
    null,
    E.createElement("h2", null, "Unexpected Application Error!"),
    E.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? E.createElement("pre", { style: l }, n) : null,
    null,
  );
}
const jg = E.createElement(Cg, null);
class Pg extends E.Component {
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
      ? E.createElement(
          Jt.Provider,
          { value: this.props.routeContext },
          E.createElement(jd.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function Tg(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = E.useContext(pa);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    E.createElement(Jt.Provider, { value: t }, r)
  );
}
function _g(e, t, n, r) {
  var l;
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
  let o = e,
    s = (l = n) == null ? void 0 : l.errors;
  if (s != null) {
    let c = o.findIndex(
      (d) => d.route.id && (s == null ? void 0 : s[d.route.id]) !== void 0,
    );
    (c >= 0 || ne(!1), (o = o.slice(0, Math.min(o.length, c + 1))));
  }
  let a = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let c = 0; c < o.length; c++) {
      let d = o[c];
      if (
        ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c),
        d.route.id)
      ) {
        let { loaderData: g, errors: S } = n,
          y =
            d.route.loader &&
            g[d.route.id] === void 0 &&
            (!S || S[d.route.id] === void 0);
        if (d.route.lazy || y) {
          ((a = !0), u >= 0 ? (o = o.slice(0, u + 1)) : (o = [o[0]]));
          break;
        }
      }
    }
  return o.reduceRight((c, d, g) => {
    let S,
      y = !1,
      w = null,
      v = null;
    n &&
      ((S = s && d.route.id ? s[d.route.id] : void 0),
      (w = d.route.errorElement || jg),
      a &&
        (u < 0 && g === 0
          ? (Dg("route-fallback"), (y = !0), (v = null))
          : u === g &&
            ((y = !0), (v = d.route.hydrateFallbackElement || null))));
    let p = t.concat(o.slice(0, g + 1)),
      h = () => {
        let m;
        return (
          S
            ? (m = w)
            : y
              ? (m = v)
              : d.route.Component
                ? (m = E.createElement(d.route.Component, null))
                : d.route.element
                  ? (m = d.route.element)
                  : (m = c),
          E.createElement(Tg, {
            match: d,
            routeContext: { outlet: c, matches: p, isDataRoute: n != null },
            children: m,
          })
        );
      };
    return n && (d.route.ErrorBoundary || d.route.errorElement || g === 0)
      ? E.createElement(Pg, {
          location: n.location,
          revalidation: n.revalidation,
          component: w,
          error: S,
          children: h(),
          routeContext: { outlet: null, matches: p, isDataRoute: !0 },
        })
      : h();
  }, null);
}
var _d = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(_d || {}),
  Ld = (function (e) {
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
  })(Ld || {});
function Lg(e) {
  let t = E.useContext(pa);
  return (t || ne(!1), t);
}
function Og(e) {
  let t = E.useContext(Sg);
  return (t || ne(!1), t);
}
function Ig(e) {
  let t = E.useContext(Jt);
  return (t || ne(!1), t);
}
function Od(e) {
  let t = Ig(),
    n = t.matches[t.matches.length - 1];
  return (n.route.id || ne(!1), n.route.id);
}
function Ag() {
  var e;
  let t = E.useContext(jd),
    n = Og(),
    r = Od();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Fg() {
  let { router: e } = Lg(_d.UseNavigateStable),
    t = Od(Ld.UseNavigateStable),
    n = E.useRef(!1);
  return (
    Pd(() => {
      n.current = !0;
    }),
    E.useCallback(
      function (l, i) {
        (i === void 0 && (i = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, Dr({ fromRouteId: t }, i))));
      },
      [e, t],
    )
  );
}
const Hu = {};
function Dg(e, t, n) {
  Hu[e] || (Hu[e] = !0);
}
function zg(e, t) {
  (e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath);
}
function ha(e) {
  let { to: t, replace: n, state: r, relative: l } = e;
  qn() || ne(!1);
  let { future: i, static: o } = E.useContext(Kt),
    { matches: s } = E.useContext(Jt),
    { pathname: a } = Hr(),
    u = Ni(),
    c = da(t, fa(s, i.v7_relativeSplatPath), a, l === "path"),
    d = JSON.stringify(c);
  return (
    E.useEffect(
      () => u(JSON.parse(d), { replace: n, state: r, relative: l }),
      [u, d, l, n, r],
    ),
    null
  );
}
function ar(e) {
  ne(!1);
}
function Ug(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = Ot.Pop,
    navigator: i,
    static: o = !1,
    future: s,
  } = e;
  qn() && ne(!1);
  let a = t.replace(/^\/*/, "/"),
    u = E.useMemo(
      () => ({
        basename: a,
        navigator: i,
        static: o,
        future: Dr({ v7_relativeSplatPath: !1 }, s),
      }),
      [a, s, i, o],
    );
  typeof r == "string" && (r = Qn(r));
  let {
      pathname: c = "/",
      search: d = "",
      hash: g = "",
      state: S = null,
      key: y = "default",
    } = r,
    w = E.useMemo(() => {
      let v = ca(c, a);
      return v == null
        ? null
        : {
            location: { pathname: v, search: d, hash: g, state: S, key: y },
            navigationType: l,
          };
    }, [a, c, d, g, S, y, l]);
  return w == null
    ? null
    : E.createElement(
        Kt.Provider,
        { value: u },
        E.createElement(Ri.Provider, { children: n, value: w }),
      );
}
function Mg(e) {
  let { children: t, location: n } = e;
  return Rg(as(t), n);
}
new Promise(() => {});
function as(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    E.Children.forEach(e, (r, l) => {
      if (!E.isValidElement(r)) return;
      let i = [...t, l];
      if (r.type === E.Fragment) {
        n.push.apply(n, as(r.props.children, i));
        return;
      }
      (r.type !== ar && ne(!1), !r.props.index || !r.props.children || ne(!1));
      let o = {
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
      (r.props.children && (o.children = as(r.props.children, i)), n.push(o));
    }),
    n
  );
}
/**
 * React Router DOM v6.30.3
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
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    us.apply(this, arguments)
  );
}
function Bg(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    l,
    i;
  for (i = 0; i < r.length; i++)
    ((l = r[i]), !(t.indexOf(l) >= 0) && (n[l] = e[l]));
  return n;
}
function $g(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Hg(e, t) {
  return e.button === 0 && (!t || t === "_self") && !$g(e);
}
const Vg = [
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
  Wg = "6";
try {
  window.__reactRouterVersion = Wg;
} catch {}
const Qg = "startTransition",
  Vu = Dp[Qg];
function qg(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    i = E.useRef();
  i.current == null && (i.current = Jm({ window: l, v5Compat: !0 }));
  let o = i.current,
    [s, a] = E.useState({ action: o.action, location: o.location }),
    { v7_startTransition: u } = r || {},
    c = E.useCallback(
      (d) => {
        u && Vu ? Vu(() => a(d)) : a(d);
      },
      [a, u],
    );
  return (
    E.useLayoutEffect(() => o.listen(c), [o, c]),
    E.useEffect(() => zg(r), [r]),
    E.createElement(Ug, {
      basename: t,
      children: n,
      location: s.location,
      navigationType: s.action,
      navigator: o,
      future: r,
    })
  );
}
const Kg =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Jg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Wu = E.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: l,
        reloadDocument: i,
        replace: o,
        state: s,
        target: a,
        to: u,
        preventScrollReset: c,
        viewTransition: d,
      } = t,
      g = Bg(t, Vg),
      { basename: S } = E.useContext(Kt),
      y,
      w = !1;
    if (typeof u == "string" && Jg.test(u) && ((y = u), Kg))
      try {
        let m = new URL(window.location.href),
          k = u.startsWith("//") ? new URL(m.protocol + u) : new URL(u),
          N = ca(k.pathname, S);
        k.origin === m.origin && N != null
          ? (u = N + k.search + k.hash)
          : (w = !0);
      } catch {}
    let v = Eg(u, { relative: l }),
      p = Xg(u, {
        replace: o,
        state: s,
        target: a,
        preventScrollReset: c,
        relative: l,
        viewTransition: d,
      });
    function h(m) {
      (r && r(m), m.defaultPrevented || p(m));
    }
    return E.createElement(
      "a",
      us({}, g, { href: y || v, onClick: w || i ? r : h, ref: n, target: a }),
    );
  });
var Qu;
(function (e) {
  ((e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState"));
})(Qu || (Qu = {}));
var qu;
(function (e) {
  ((e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration"));
})(qu || (qu = {}));
function Xg(e, t) {
  let {
      target: n,
      replace: r,
      state: l,
      preventScrollReset: i,
      relative: o,
      viewTransition: s,
    } = t === void 0 ? {} : t,
    a = Ni(),
    u = Hr(),
    c = Td(e, { relative: o });
  return E.useCallback(
    (d) => {
      if (Hg(d, n)) {
        d.preventDefault();
        let g = r !== void 0 ? r : oi(u) === oi(c);
        a(e, {
          replace: g,
          state: l,
          preventScrollReset: i,
          relative: o,
          viewTransition: s,
        });
      }
    },
    [u, a, c, r, l, n, e, i, o, s],
  );
}
function Id(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: bg } = Object.prototype,
  { getPrototypeOf: Ci } = Object,
  { iterator: ji, toStringTag: Ad } = Symbol,
  Pi = ((e) => (t) => {
    const n = bg.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  lt = (e) => ((e = e.toLowerCase()), (t) => Pi(t) === e),
  Ti = (e) => (t) => typeof t === e,
  { isArray: Kn } = Array,
  $n = Ti("undefined");
function Vr(e) {
  return (
    e !== null &&
    !$n(e) &&
    e.constructor !== null &&
    !$n(e.constructor) &&
    _e(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Fd = lt("ArrayBuffer");
function Yg(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Fd(e.buffer)),
    t
  );
}
const Gg = Ti("string"),
  _e = Ti("function"),
  Dd = Ti("number"),
  Wr = (e) => e !== null && typeof e == "object",
  Zg = (e) => e === !0 || e === !1,
  Il = (e) => {
    if (Pi(e) !== "object") return !1;
    const t = Ci(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Ad in e) &&
      !(ji in e)
    );
  },
  ev = (e) => {
    if (!Wr(e) || Vr(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  tv = lt("Date"),
  nv = lt("File"),
  rv = (e) => !!(e && typeof e.uri < "u"),
  lv = (e) => e && typeof e.getParts < "u",
  iv = lt("Blob"),
  ov = lt("FileList"),
  sv = (e) => Wr(e) && _e(e.pipe);
function av() {
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
const Ku = av(),
  Ju = typeof Ku.FormData < "u" ? Ku.FormData : void 0,
  uv = (e) => {
    if (!e) return !1;
    if (Ju && e instanceof Ju) return !0;
    const t = Ci(e);
    if (!t || t === Object.prototype || !_e(e.append)) return !1;
    const n = Pi(e);
    return (
      n === "formdata" ||
      (n === "object" && _e(e.toString) && e.toString() === "[object FormData]")
    );
  },
  cv = lt("URLSearchParams"),
  [fv, dv, pv, hv] = ["ReadableStream", "Request", "Response", "Headers"].map(
    lt,
  ),
  mv = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Qr(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, l;
  if ((typeof e != "object" && (e = [e]), Kn(e)))
    for (r = 0, l = e.length; r < l; r++) t.call(null, e[r], r, e);
  else {
    if (Vr(e)) return;
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      o = i.length;
    let s;
    for (r = 0; r < o; r++) ((s = i[r]), t.call(null, e[s], s, e));
  }
}
function zd(e, t) {
  if (Vr(e)) return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    l;
  for (; r-- > 0; ) if (((l = n[r]), t === l.toLowerCase())) return l;
  return null;
}
const en =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Ud = (e) => !$n(e) && e !== en;
function cs() {
  const { caseless: e, skipUndefined: t } = (Ud(this) && this) || {},
    n = {},
    r = (l, i) => {
      if (i === "__proto__" || i === "constructor" || i === "prototype") return;
      const o = (e && zd(n, i)) || i;
      Il(n[o]) && Il(l)
        ? (n[o] = cs(n[o], l))
        : Il(l)
          ? (n[o] = cs({}, l))
          : Kn(l)
            ? (n[o] = l.slice())
            : (!t || !$n(l)) && (n[o] = l);
    };
  for (let l = 0, i = arguments.length; l < i; l++)
    arguments[l] && Qr(arguments[l], r);
  return n;
}
const gv = (e, t, n, { allOwnKeys: r } = {}) => (
    Qr(
      t,
      (l, i) => {
        n && _e(l)
          ? Object.defineProperty(e, i, {
              value: Id(l, n),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, i, {
              value: l,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: r },
    ),
    e
  ),
  vv = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  yv = (e, t, n, r) => {
    ((e.prototype = Object.create(t.prototype, r)),
      Object.defineProperty(e.prototype, "constructor", {
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n));
  },
  wv = (e, t, n, r) => {
    let l, i, o;
    const s = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (l = Object.getOwnPropertyNames(e), i = l.length; i-- > 0; )
        ((o = l[i]),
          (!r || r(o, e, t)) && !s[o] && ((t[o] = e[o]), (s[o] = !0)));
      e = n !== !1 && Ci(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  xv = (e, t, n) => {
    ((e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length));
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  Sv = (e) => {
    if (!e) return null;
    if (Kn(e)) return e;
    let t = e.length;
    if (!Dd(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  Ev = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Ci(Uint8Array)),
  kv = (e, t) => {
    const r = (e && e[ji]).call(e);
    let l;
    for (; (l = r.next()) && !l.done; ) {
      const i = l.value;
      t.call(e, i[0], i[1]);
    }
  },
  Rv = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  Nv = lt("HTMLFormElement"),
  Cv = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, l) {
      return r.toUpperCase() + l;
    }),
  Xu = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  jv = lt("RegExp"),
  Md = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    (Qr(n, (l, i) => {
      let o;
      (o = t(l, i, e)) !== !1 && (r[i] = o || l);
    }),
      Object.defineProperties(e, r));
  },
  Pv = (e) => {
    Md(e, (t, n) => {
      if (_e(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (_e(r)) {
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
  Tv = (e, t) => {
    const n = {},
      r = (l) => {
        l.forEach((i) => {
          n[i] = !0;
        });
      };
    return (Kn(e) ? r(e) : r(String(e).split(t)), n);
  },
  _v = () => {},
  Lv = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Ov(e) {
  return !!(e && _e(e.append) && e[Ad] === "FormData" && e[ji]);
}
const Iv = (e) => {
    const t = new Array(10),
      n = (r, l) => {
        if (Wr(r)) {
          if (t.indexOf(r) >= 0) return;
          if (Vr(r)) return r;
          if (!("toJSON" in r)) {
            t[l] = r;
            const i = Kn(r) ? [] : {};
            return (
              Qr(r, (o, s) => {
                const a = n(o, l + 1);
                !$n(a) && (i[s] = a);
              }),
              (t[l] = void 0),
              i
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  Av = lt("AsyncFunction"),
  Fv = (e) => e && (Wr(e) || _e(e)) && _e(e.then) && _e(e.catch),
  Bd = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((n, r) => (
            en.addEventListener(
              "message",
              ({ source: l, data: i }) => {
                l === en && i === n && r.length && r.shift()();
              },
              !1,
            ),
            (l) => {
              (r.push(l), en.postMessage(n, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    _e(en.postMessage),
  ),
  Dv =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(en)
      : (typeof process < "u" && process.nextTick) || Bd,
  zv = (e) => e != null && _e(e[ji]),
  x = {
    isArray: Kn,
    isArrayBuffer: Fd,
    isBuffer: Vr,
    isFormData: uv,
    isArrayBufferView: Yg,
    isString: Gg,
    isNumber: Dd,
    isBoolean: Zg,
    isObject: Wr,
    isPlainObject: Il,
    isEmptyObject: ev,
    isReadableStream: fv,
    isRequest: dv,
    isResponse: pv,
    isHeaders: hv,
    isUndefined: $n,
    isDate: tv,
    isFile: nv,
    isReactNativeBlob: rv,
    isReactNative: lv,
    isBlob: iv,
    isRegExp: jv,
    isFunction: _e,
    isStream: sv,
    isURLSearchParams: cv,
    isTypedArray: Ev,
    isFileList: ov,
    forEach: Qr,
    merge: cs,
    extend: gv,
    trim: mv,
    stripBOM: vv,
    inherits: yv,
    toFlatObject: wv,
    kindOf: Pi,
    kindOfTest: lt,
    endsWith: xv,
    toArray: Sv,
    forEachEntry: kv,
    matchAll: Rv,
    isHTMLForm: Nv,
    hasOwnProperty: Xu,
    hasOwnProp: Xu,
    reduceDescriptors: Md,
    freezeMethods: Pv,
    toObjectSet: Tv,
    toCamelCase: Cv,
    noop: _v,
    toFiniteNumber: Lv,
    findKey: zd,
    global: en,
    isContextDefined: Ud,
    isSpecCompliantForm: Ov,
    toJSONObject: Iv,
    isAsyncFn: Av,
    isThenable: Fv,
    setImmediate: Bd,
    asap: Dv,
    isIterable: zv,
  };
let I = class $d extends Error {
  static from(t, n, r, l, i, o) {
    const s = new $d(t.message, n || t.code, r, l, i);
    return (
      (s.cause = t),
      (s.name = t.name),
      t.status != null && s.status == null && (s.status = t.status),
      o && Object.assign(s, o),
      s
    );
  }
  constructor(t, n, r, l, i) {
    (super(t),
      Object.defineProperty(this, "message", {
        value: t,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      n && (this.code = n),
      r && (this.config = r),
      l && (this.request = l),
      i && ((this.response = i), (this.status = i.status)));
  }
  toJSON() {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: x.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  }
};
I.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
I.ERR_BAD_OPTION = "ERR_BAD_OPTION";
I.ECONNABORTED = "ECONNABORTED";
I.ETIMEDOUT = "ETIMEDOUT";
I.ERR_NETWORK = "ERR_NETWORK";
I.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
I.ERR_DEPRECATED = "ERR_DEPRECATED";
I.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
I.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
I.ERR_CANCELED = "ERR_CANCELED";
I.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
I.ERR_INVALID_URL = "ERR_INVALID_URL";
I.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const Uv = null;
function fs(e) {
  return x.isPlainObject(e) || x.isArray(e);
}
function Hd(e) {
  return x.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ao(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (l, i) {
          return ((l = Hd(l)), !n && i ? "[" + l + "]" : l);
        })
        .join(n ? "." : "")
    : t;
}
function Mv(e) {
  return x.isArray(e) && !e.some(fs);
}
const Bv = x.toFlatObject(x, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function _i(e, t, n) {
  if (!x.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (n = x.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (v, p) {
        return !x.isUndefined(p[v]);
      },
    )));
  const r = n.metaTokens,
    l = n.visitor || d,
    i = n.dots,
    o = n.indexes,
    s = n.Blob || (typeof Blob < "u" && Blob),
    a = n.maxDepth === void 0 ? 100 : n.maxDepth,
    u = s && x.isSpecCompliantForm(t);
  if (!x.isFunction(l)) throw new TypeError("visitor must be a function");
  function c(w) {
    if (w === null) return "";
    if (x.isDate(w)) return w.toISOString();
    if (x.isBoolean(w)) return w.toString();
    if (!u && x.isBlob(w))
      throw new I("Blob is not supported. Use a Buffer instead.");
    return x.isArrayBuffer(w) || x.isTypedArray(w)
      ? u && typeof Blob == "function"
        ? new Blob([w])
        : Buffer.from(w)
      : w;
  }
  function d(w, v, p) {
    let h = w;
    if (x.isReactNative(t) && x.isReactNativeBlob(w))
      return (t.append(ao(p, v, i), c(w)), !1);
    if (w && !p && typeof w == "object") {
      if (x.endsWith(v, "{}"))
        ((v = r ? v : v.slice(0, -2)), (w = JSON.stringify(w)));
      else if (
        (x.isArray(w) && Mv(w)) ||
        ((x.isFileList(w) || x.endsWith(v, "[]")) && (h = x.toArray(w)))
      )
        return (
          (v = Hd(v)),
          h.forEach(function (k, N) {
            !(x.isUndefined(k) || k === null) &&
              t.append(
                o === !0 ? ao([v], N, i) : o === null ? v : v + "[]",
                c(k),
              );
          }),
          !1
        );
    }
    return fs(w) ? !0 : (t.append(ao(p, v, i), c(w)), !1);
  }
  const g = [],
    S = Object.assign(Bv, {
      defaultVisitor: d,
      convertValue: c,
      isVisitable: fs,
    });
  function y(w, v, p = 0) {
    if (!x.isUndefined(w)) {
      if (p > a)
        throw new I(
          "Object is too deeply nested (" + p + " levels). Max depth: " + a,
          I.ERR_FORM_DATA_DEPTH_EXCEEDED,
        );
      if (g.indexOf(w) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      (g.push(w),
        x.forEach(w, function (m, k) {
          (!(x.isUndefined(m) || m === null) &&
            l.call(t, m, x.isString(k) ? k.trim() : k, v, S)) === !0 &&
            y(m, v ? v.concat(k) : [k], p + 1);
        }),
        g.pop());
    }
  }
  if (!x.isObject(e)) throw new TypeError("data must be an object");
  return (y(e), t);
}
function bu(e) {
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
function ma(e, t) {
  ((this._pairs = []), e && _i(e, this, t));
}
const Vd = ma.prototype;
Vd.append = function (t, n) {
  this._pairs.push([t, n]);
};
Vd.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, bu);
      }
    : bu;
  return this._pairs
    .map(function (l) {
      return n(l[0]) + "=" + n(l[1]);
    }, "")
    .join("&");
};
function $v(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function Wd(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || $v,
    l = x.isFunction(n) ? { serialize: n } : n,
    i = l && l.serialize;
  let o;
  if (
    (i
      ? (o = i(t, l))
      : (o = x.isURLSearchParams(t) ? t.toString() : new ma(t, l).toString(r)),
    o)
  ) {
    const s = e.indexOf("#");
    (s !== -1 && (e = e.slice(0, s)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o));
  }
  return e;
}
class Yu {
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
    x.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const ga = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
  },
  Hv = typeof URLSearchParams < "u" ? URLSearchParams : ma,
  Vv = typeof FormData < "u" ? FormData : null,
  Wv = typeof Blob < "u" ? Blob : null,
  Qv = {
    isBrowser: !0,
    classes: { URLSearchParams: Hv, FormData: Vv, Blob: Wv },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  va = typeof window < "u" && typeof document < "u",
  ds = (typeof navigator == "object" && navigator) || void 0,
  qv =
    va &&
    (!ds || ["ReactNative", "NativeScript", "NS"].indexOf(ds.product) < 0),
  Kv =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Jv = (va && window.location.href) || "http://localhost",
  Xv = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: va,
        hasStandardBrowserEnv: qv,
        hasStandardBrowserWebWorkerEnv: Kv,
        navigator: ds,
        origin: Jv,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  we = { ...Xv, ...Qv };
function bv(e, t) {
  return _i(e, new we.classes.URLSearchParams(), {
    visitor: function (n, r, l, i) {
      return we.isNode && x.isBuffer(n)
        ? (this.append(r, n.toString("base64")), !1)
        : i.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function Yv(e) {
  return x
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function Gv(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const l = n.length;
  let i;
  for (r = 0; r < l; r++) ((i = n[r]), (t[i] = e[i]));
  return t;
}
function Qd(e) {
  function t(n, r, l, i) {
    let o = n[i++];
    if (o === "__proto__") return !0;
    const s = Number.isFinite(+o),
      a = i >= n.length;
    return (
      (o = !o && x.isArray(l) ? l.length : o),
      a
        ? (x.hasOwnProp(l, o)
            ? (l[o] = x.isArray(l[o]) ? l[o].concat(r) : [l[o], r])
            : (l[o] = r),
          !s)
        : ((!l[o] || !x.isObject(l[o])) && (l[o] = []),
          t(n, r, l[o], i) && x.isArray(l[o]) && (l[o] = Gv(l[o])),
          !s)
    );
  }
  if (x.isFormData(e) && x.isFunction(e.entries)) {
    const n = {};
    return (
      x.forEachEntry(e, (r, l) => {
        t(Yv(r), l, n, 0);
      }),
      n
    );
  }
  return null;
}
const mn = (e, t) => (e != null && x.hasOwnProp(e, t) ? e[t] : void 0);
function Zv(e, t, n) {
  if (x.isString(e))
    try {
      return ((t || JSON.parse)(e), x.trim(e));
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (n || JSON.stringify)(e);
}
const qr = {
  transitional: ga,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        l = r.indexOf("application/json") > -1,
        i = x.isObject(t);
      if ((i && x.isHTMLForm(t) && (t = new FormData(t)), x.isFormData(t)))
        return l ? JSON.stringify(Qd(t)) : t;
      if (
        x.isArrayBuffer(t) ||
        x.isBuffer(t) ||
        x.isStream(t) ||
        x.isFile(t) ||
        x.isBlob(t) ||
        x.isReadableStream(t)
      )
        return t;
      if (x.isArrayBufferView(t)) return t.buffer;
      if (x.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          t.toString()
        );
      let s;
      if (i) {
        const a = mn(this, "formSerializer");
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return bv(t, a).toString();
        if ((s = x.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const u = mn(this, "env"),
            c = u && u.FormData;
          return _i(s ? { "files[]": t } : t, c && new c(), a);
        }
      }
      return i || l ? (n.setContentType("application/json", !1), Zv(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = mn(this, "transitional") || qr.transitional,
        r = n && n.forcedJSONParsing,
        l = mn(this, "responseType"),
        i = l === "json";
      if (x.isResponse(t) || x.isReadableStream(t)) return t;
      if (t && x.isString(t) && ((r && !l) || i)) {
        const s = !(n && n.silentJSONParsing) && i;
        try {
          return JSON.parse(t, mn(this, "parseReviver"));
        } catch (a) {
          if (s)
            throw a.name === "SyntaxError"
              ? I.from(a, I.ERR_BAD_RESPONSE, this, null, mn(this, "response"))
              : a;
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
  env: { FormData: we.classes.FormData, Blob: we.classes.Blob },
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
x.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  qr.headers[e] = {};
});
const ey = x.toObjectSet([
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
  ty = (e) => {
    const t = {};
    let n, r, l;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (o) {
            ((l = o.indexOf(":")),
              (n = o.substring(0, l).trim().toLowerCase()),
              (r = o.substring(l + 1).trim()),
              !(!n || (t[n] && ey[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r)));
          }),
      t
    );
  },
  Gu = Symbol("internals"),
  ny = /[^\x09\x20-\x7E\x80-\xFF]/g;
function ry(e) {
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
function rr(e) {
  return e && String(e).trim().toLowerCase();
}
function ly(e) {
  return ry(e.replace(ny, ""));
}
function Al(e) {
  return e === !1 || e == null ? e : x.isArray(e) ? e.map(Al) : ly(String(e));
}
function iy(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const oy = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function uo(e, t, n, r, l) {
  if (x.isFunction(r)) return r.call(this, t, n);
  if ((l && (t = n), !!x.isString(t))) {
    if (x.isString(r)) return t.indexOf(r) !== -1;
    if (x.isRegExp(r)) return r.test(t);
  }
}
function sy(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function ay(e, t) {
  const n = x.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (l, i, o) {
        return this[r].call(this, t, l, i, o);
      },
      configurable: !0,
    });
  });
}
let Le = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const l = this;
    function i(s, a, u) {
      const c = rr(a);
      if (!c) throw new Error("header name must be a non-empty string");
      const d = x.findKey(l, c);
      (!d || l[d] === void 0 || u === !0 || (u === void 0 && l[d] !== !1)) &&
        (l[d || a] = Al(s));
    }
    const o = (s, a) => x.forEach(s, (u, c) => i(u, c, a));
    if (x.isPlainObject(t) || t instanceof this.constructor) o(t, n);
    else if (x.isString(t) && (t = t.trim()) && !oy(t)) o(ty(t), n);
    else if (x.isObject(t) && x.isIterable(t)) {
      let s = {},
        a,
        u;
      for (const c of t) {
        if (!x.isArray(c))
          throw TypeError("Object iterator must return a key-value pair");
        s[(u = c[0])] = (a = s[u])
          ? x.isArray(a)
            ? [...a, c[1]]
            : [a, c[1]]
          : c[1];
      }
      o(s, n);
    } else t != null && i(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = rr(t)), t)) {
      const r = x.findKey(this, t);
      if (r) {
        const l = this[r];
        if (!n) return l;
        if (n === !0) return iy(l);
        if (x.isFunction(n)) return n.call(this, l, r);
        if (x.isRegExp(n)) return n.exec(l);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = rr(t)), t)) {
      const r = x.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || uo(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let l = !1;
    function i(o) {
      if (((o = rr(o)), o)) {
        const s = x.findKey(r, o);
        s && (!n || uo(r, r[s], s, n)) && (delete r[s], (l = !0));
      }
    }
    return (x.isArray(t) ? t.forEach(i) : i(t), l);
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      l = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || uo(this, this[i], i, t, !0)) && (delete this[i], (l = !0));
    }
    return l;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      x.forEach(this, (l, i) => {
        const o = x.findKey(r, i);
        if (o) {
          ((n[o] = Al(l)), delete n[i]);
          return;
        }
        const s = t ? sy(i) : String(i).trim();
        (s !== i && delete n[i], (n[s] = Al(l)), (r[s] = !0));
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
      x.forEach(this, (r, l) => {
        r != null && r !== !1 && (n[l] = t && x.isArray(r) ? r.join(", ") : r);
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
    return (n.forEach((l) => r.set(l)), r);
  }
  static accessor(t) {
    const r = (this[Gu] = this[Gu] = { accessors: {} }).accessors,
      l = this.prototype;
    function i(o) {
      const s = rr(o);
      r[s] || (ay(l, o), (r[s] = !0));
    }
    return (x.isArray(t) ? t.forEach(i) : i(t), this);
  }
};
Le.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
x.reduceDescriptors(Le.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
x.freezeMethods(Le);
function co(e, t) {
  const n = this || qr,
    r = t || n,
    l = Le.from(r.headers);
  let i = r.data;
  return (
    x.forEach(e, function (s) {
      i = s.call(n, i, l.normalize(), t ? t.status : void 0);
    }),
    l.normalize(),
    i
  );
}
function qd(e) {
  return !!(e && e.__CANCEL__);
}
let Kr = class extends I {
  constructor(t, n, r) {
    (super(t ?? "canceled", I.ERR_CANCELED, n, r),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function Kd(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new I(
          "Request failed with status code " + n.status,
          [I.ERR_BAD_REQUEST, I.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n,
        ),
      );
}
function uy(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function cy(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let l = 0,
    i = 0,
    o;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (a) {
      const u = Date.now(),
        c = r[i];
      (o || (o = u), (n[l] = a), (r[l] = u));
      let d = i,
        g = 0;
      for (; d !== l; ) ((g += n[d++]), (d = d % e));
      if (((l = (l + 1) % e), l === i && (i = (i + 1) % e), u - o < t)) return;
      const S = c && u - c;
      return S ? Math.round((g * 1e3) / S) : void 0;
    }
  );
}
function fy(e, t) {
  let n = 0,
    r = 1e3 / t,
    l,
    i;
  const o = (u, c = Date.now()) => {
    ((n = c), (l = null), i && (clearTimeout(i), (i = null)), e(...u));
  };
  return [
    (...u) => {
      const c = Date.now(),
        d = c - n;
      d >= r
        ? o(u, c)
        : ((l = u),
          i ||
            (i = setTimeout(() => {
              ((i = null), o(l));
            }, r - d)));
    },
    () => l && o(l),
  ];
}
const si = (e, t, n = 3) => {
    let r = 0;
    const l = cy(50, 250);
    return fy((i) => {
      const o = i.loaded,
        s = i.lengthComputable ? i.total : void 0,
        a = s != null ? Math.min(o, s) : o,
        u = Math.max(0, a - r),
        c = l(u);
      r = Math.max(r, a);
      const d = {
        loaded: a,
        total: s,
        progress: s ? a / s : void 0,
        bytes: u,
        rate: c || void 0,
        estimated: c && s ? (s - a) / c : void 0,
        event: i,
        lengthComputable: s != null,
        [t ? "download" : "upload"]: !0,
      };
      e(d);
    }, n);
  },
  Zu = (e, t) => {
    const n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  ec =
    (e) =>
    (...t) =>
      x.asap(() => e(...t)),
  dy = we.hasStandardBrowserEnv
    ? ((e, t) => (n) => (
        (n = new URL(n, we.origin)),
        e.protocol === n.protocol &&
          e.host === n.host &&
          (t || e.port === n.port)
      ))(
        new URL(we.origin),
        we.navigator && /(msie|trident)/i.test(we.navigator.userAgent),
      )
    : () => !0,
  py = we.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, l, i, o) {
          if (typeof document > "u") return;
          const s = [`${e}=${encodeURIComponent(t)}`];
          (x.isNumber(n) && s.push(`expires=${new Date(n).toUTCString()}`),
            x.isString(r) && s.push(`path=${r}`),
            x.isString(l) && s.push(`domain=${l}`),
            i === !0 && s.push("secure"),
            x.isString(o) && s.push(`SameSite=${o}`),
            (document.cookie = s.join("; ")));
        },
        read(e) {
          if (typeof document > "u") return null;
          const t = document.cookie.match(
            new RegExp("(?:^|; )" + e + "=([^;]*)"),
          );
          return t ? decodeURIComponent(t[1]) : null;
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
function hy(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function my(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Jd(e, t, n) {
  let r = !hy(t);
  return e && (r || n === !1) ? my(e, t) : t;
}
const tc = (e) => (e instanceof Le ? { ...e } : e);
function cn(e, t) {
  t = t || {};
  const n = {};
  function r(u, c, d, g) {
    return x.isPlainObject(u) && x.isPlainObject(c)
      ? x.merge.call({ caseless: g }, u, c)
      : x.isPlainObject(c)
        ? x.merge({}, c)
        : x.isArray(c)
          ? c.slice()
          : c;
  }
  function l(u, c, d, g) {
    if (x.isUndefined(c)) {
      if (!x.isUndefined(u)) return r(void 0, u, d, g);
    } else return r(u, c, d, g);
  }
  function i(u, c) {
    if (!x.isUndefined(c)) return r(void 0, c);
  }
  function o(u, c) {
    if (x.isUndefined(c)) {
      if (!x.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, c);
  }
  function s(u, c, d) {
    if (x.hasOwnProp(t, d)) return r(u, c);
    if (x.hasOwnProp(e, d)) return r(void 0, u);
  }
  const a = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: s,
    headers: (u, c, d) => l(tc(u), tc(c), d, !0),
  };
  return (
    x.forEach(Object.keys({ ...e, ...t }), function (c) {
      if (c === "__proto__" || c === "constructor" || c === "prototype") return;
      const d = x.hasOwnProp(a, c) ? a[c] : l,
        g = x.hasOwnProp(e, c) ? e[c] : void 0,
        S = x.hasOwnProp(t, c) ? t[c] : void 0,
        y = d(g, S, c);
      (x.isUndefined(y) && d !== s) || (n[c] = y);
    }),
    n
  );
}
const Xd = (e) => {
    const t = cn({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: l,
      xsrfCookieName: i,
      headers: o,
      auth: s,
    } = t;
    if (
      ((t.headers = o = Le.from(o)),
      (t.url = Wd(
        Jd(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer,
      )),
      s &&
        o.set(
          "Authorization",
          "Basic " +
            btoa(
              (s.username || "") +
                ":" +
                (s.password ? unescape(encodeURIComponent(s.password)) : ""),
            ),
        ),
      x.isFormData(n))
    ) {
      if (we.hasStandardBrowserEnv || we.hasStandardBrowserWebWorkerEnv)
        o.setContentType(void 0);
      else if (x.isFunction(n.getHeaders)) {
        const a = n.getHeaders(),
          u = ["content-type", "content-length"];
        Object.entries(a).forEach(([c, d]) => {
          u.includes(c.toLowerCase()) && o.set(c, d);
        });
      }
    }
    if (
      we.hasStandardBrowserEnv &&
      (x.isFunction(r) && (r = r(t)), r === !0 || (r == null && dy(t.url)))
    ) {
      const u = l && i && py.read(i);
      u && o.set(l, u);
    }
    return t;
  },
  gy = typeof XMLHttpRequest < "u",
  vy =
    gy &&
    function (e) {
      return new Promise(function (n, r) {
        const l = Xd(e);
        let i = l.data;
        const o = Le.from(l.headers).normalize();
        let { responseType: s, onUploadProgress: a, onDownloadProgress: u } = l,
          c,
          d,
          g,
          S,
          y;
        function w() {
          (S && S(),
            y && y(),
            l.cancelToken && l.cancelToken.unsubscribe(c),
            l.signal && l.signal.removeEventListener("abort", c));
        }
        let v = new XMLHttpRequest();
        (v.open(l.method.toUpperCase(), l.url, !0), (v.timeout = l.timeout));
        function p() {
          if (!v) return;
          const m = Le.from(
              "getAllResponseHeaders" in v && v.getAllResponseHeaders(),
            ),
            N = {
              data:
                !s || s === "text" || s === "json"
                  ? v.responseText
                  : v.response,
              status: v.status,
              statusText: v.statusText,
              headers: m,
              config: e,
              request: v,
            };
          (Kd(
            function (j) {
              (n(j), w());
            },
            function (j) {
              (r(j), w());
            },
            N,
          ),
            (v = null));
        }
        ("onloadend" in v
          ? (v.onloadend = p)
          : (v.onreadystatechange = function () {
              !v ||
                v.readyState !== 4 ||
                (v.status === 0 &&
                  !(v.responseURL && v.responseURL.indexOf("file:") === 0)) ||
                setTimeout(p);
            }),
          (v.onabort = function () {
            v &&
              (r(new I("Request aborted", I.ECONNABORTED, e, v)), (v = null));
          }),
          (v.onerror = function (k) {
            const N = k && k.message ? k.message : "Network Error",
              P = new I(N, I.ERR_NETWORK, e, v);
            ((P.event = k || null), r(P), (v = null));
          }),
          (v.ontimeout = function () {
            let k = l.timeout
              ? "timeout of " + l.timeout + "ms exceeded"
              : "timeout exceeded";
            const N = l.transitional || ga;
            (l.timeoutErrorMessage && (k = l.timeoutErrorMessage),
              r(
                new I(
                  k,
                  N.clarifyTimeoutError ? I.ETIMEDOUT : I.ECONNABORTED,
                  e,
                  v,
                ),
              ),
              (v = null));
          }),
          i === void 0 && o.setContentType(null),
          "setRequestHeader" in v &&
            x.forEach(o.toJSON(), function (k, N) {
              v.setRequestHeader(N, k);
            }),
          x.isUndefined(l.withCredentials) ||
            (v.withCredentials = !!l.withCredentials),
          s && s !== "json" && (v.responseType = l.responseType),
          u && (([g, y] = si(u, !0)), v.addEventListener("progress", g)),
          a &&
            v.upload &&
            (([d, S] = si(a)),
            v.upload.addEventListener("progress", d),
            v.upload.addEventListener("loadend", S)),
          (l.cancelToken || l.signal) &&
            ((c = (m) => {
              v &&
                (r(!m || m.type ? new Kr(null, e, v) : m),
                v.abort(),
                (v = null));
            }),
            l.cancelToken && l.cancelToken.subscribe(c),
            l.signal &&
              (l.signal.aborted
                ? c()
                : l.signal.addEventListener("abort", c))));
        const h = uy(l.url);
        if (h && we.protocols.indexOf(h) === -1) {
          r(new I("Unsupported protocol " + h + ":", I.ERR_BAD_REQUEST, e));
          return;
        }
        v.send(i || null);
      });
    },
  yy = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let r = new AbortController(),
        l;
      const i = function (u) {
        if (!l) {
          ((l = !0), s());
          const c = u instanceof Error ? u : this.reason;
          r.abort(
            c instanceof I ? c : new Kr(c instanceof Error ? c.message : c),
          );
        }
      };
      let o =
        t &&
        setTimeout(() => {
          ((o = null), i(new I(`timeout of ${t}ms exceeded`, I.ETIMEDOUT)));
        }, t);
      const s = () => {
        e &&
          (o && clearTimeout(o),
          (o = null),
          e.forEach((u) => {
            u.unsubscribe
              ? u.unsubscribe(i)
              : u.removeEventListener("abort", i);
          }),
          (e = null));
      };
      e.forEach((u) => u.addEventListener("abort", i));
      const { signal: a } = r;
      return ((a.unsubscribe = () => x.asap(s)), a);
    }
  },
  wy = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let r = 0,
      l;
    for (; r < n; ) ((l = r + t), yield e.slice(r, l), (r = l));
  },
  xy = async function* (e, t) {
    for await (const n of Sy(e)) yield* wy(n, t);
  },
  Sy = async function* (e) {
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
  nc = (e, t, n, r) => {
    const l = xy(e, t);
    let i = 0,
      o,
      s = (a) => {
        o || ((o = !0), r && r(a));
      };
    return new ReadableStream(
      {
        async pull(a) {
          try {
            const { done: u, value: c } = await l.next();
            if (u) {
              (s(), a.close());
              return;
            }
            let d = c.byteLength;
            if (n) {
              let g = (i += d);
              n(g);
            }
            a.enqueue(new Uint8Array(c));
          } catch (u) {
            throw (s(u), u);
          }
        },
        cancel(a) {
          return (s(a), l.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  rc = 64 * 1024,
  { isFunction: vl } = x,
  Ey = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(
    x.global,
  ),
  { ReadableStream: lc, TextEncoder: ic } = x.global,
  oc = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  ky = (e) => {
    e = x.merge.call({ skipUndefined: !0 }, Ey, e);
    const { fetch: t, Request: n, Response: r } = e,
      l = t ? vl(t) : typeof fetch == "function",
      i = vl(n),
      o = vl(r);
    if (!l) return !1;
    const s = l && vl(lc),
      a =
        l &&
        (typeof ic == "function"
          ? (
              (y) => (w) =>
                y.encode(w)
            )(new ic())
          : async (y) => new Uint8Array(await new n(y).arrayBuffer())),
      u =
        i &&
        s &&
        oc(() => {
          let y = !1;
          const w = new n(we.origin, {
              body: new lc(),
              method: "POST",
              get duplex() {
                return ((y = !0), "half");
              },
            }),
            v = w.headers.has("Content-Type");
          return (w.body != null && w.body.cancel(), y && !v);
        }),
      c = o && s && oc(() => x.isReadableStream(new r("").body)),
      d = { stream: c && ((y) => y.body) };
    l &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((y) => {
        !d[y] &&
          (d[y] = (w, v) => {
            let p = w && w[y];
            if (p) return p.call(w);
            throw new I(
              `Response type '${y}' is not supported`,
              I.ERR_NOT_SUPPORT,
              v,
            );
          });
      });
    const g = async (y) => {
        if (y == null) return 0;
        if (x.isBlob(y)) return y.size;
        if (x.isSpecCompliantForm(y))
          return (
            await new n(we.origin, { method: "POST", body: y }).arrayBuffer()
          ).byteLength;
        if (x.isArrayBufferView(y) || x.isArrayBuffer(y)) return y.byteLength;
        if ((x.isURLSearchParams(y) && (y = y + ""), x.isString(y)))
          return (await a(y)).byteLength;
      },
      S = async (y, w) => {
        const v = x.toFiniteNumber(y.getContentLength());
        return v ?? g(w);
      };
    return async (y) => {
      let {
          url: w,
          method: v,
          data: p,
          signal: h,
          cancelToken: m,
          timeout: k,
          onDownloadProgress: N,
          onUploadProgress: P,
          responseType: j,
          headers: _,
          withCredentials: D = "same-origin",
          fetchOptions: L,
        } = Xd(y),
        H = t || fetch;
      j = j ? (j + "").toLowerCase() : "text";
      let ue = yy([h, m && m.toAbortSignal()], k),
        ce = null;
      const fe =
        ue &&
        ue.unsubscribe &&
        (() => {
          ue.unsubscribe();
        });
      let Be;
      try {
        if (
          P &&
          u &&
          v !== "get" &&
          v !== "head" &&
          (Be = await S(_, p)) !== 0
        ) {
          let z = new n(w, { method: "POST", body: p, duplex: "half" }),
            V;
          if (
            (x.isFormData(p) &&
              (V = z.headers.get("content-type")) &&
              _.setContentType(V),
            z.body)
          ) {
            const [$e, b] = Zu(Be, si(ec(P)));
            p = nc(z.body, rc, $e, b);
          }
        }
        x.isString(D) || (D = D ? "include" : "omit");
        const J = i && "credentials" in n.prototype;
        if (x.isFormData(p)) {
          const z = _.getContentType();
          z &&
            /^multipart\/form-data/i.test(z) &&
            !/boundary=/i.test(z) &&
            _.delete("content-type");
        }
        const ct = {
          ...L,
          signal: ue,
          method: v.toUpperCase(),
          headers: _.normalize().toJSON(),
          body: p,
          duplex: "half",
          credentials: J ? D : void 0,
        };
        ce = i && new n(w, ct);
        let C = await (i ? H(ce, L) : H(w, ct));
        const O = c && (j === "stream" || j === "response");
        if (c && (N || (O && fe))) {
          const z = {};
          ["status", "statusText", "headers"].forEach((ft) => {
            z[ft] = C[ft];
          });
          const V = x.toFiniteNumber(C.headers.get("content-length")),
            [$e, b] = (N && Zu(V, si(ec(N), !0))) || [];
          C = new r(
            nc(C.body, rc, $e, () => {
              (b && b(), fe && fe());
            }),
            z,
          );
        }
        j = j || "text";
        let A = await d[x.findKey(d, j) || "text"](C, y);
        return (
          !O && fe && fe(),
          await new Promise((z, V) => {
            Kd(z, V, {
              data: A,
              headers: Le.from(C.headers),
              status: C.status,
              statusText: C.statusText,
              config: y,
              request: ce,
            });
          })
        );
      } catch (J) {
        throw (
          fe && fe(),
          J && J.name === "TypeError" && /Load failed|fetch/i.test(J.message)
            ? Object.assign(
                new I("Network Error", I.ERR_NETWORK, y, ce, J && J.response),
                { cause: J.cause || J },
              )
            : I.from(J, J && J.code, y, ce, J && J.response)
        );
      }
    };
  },
  Ry = new Map(),
  bd = (e) => {
    let t = (e && e.env) || {};
    const { fetch: n, Request: r, Response: l } = t,
      i = [r, l, n];
    let o = i.length,
      s = o,
      a,
      u,
      c = Ry;
    for (; s--; )
      ((a = i[s]),
        (u = c.get(a)),
        u === void 0 && c.set(a, (u = s ? new Map() : ky(t))),
        (c = u));
    return u;
  };
bd();
const ya = { http: Uv, xhr: vy, fetch: { get: bd } };
x.forEach(ya, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const sc = (e) => `- ${e}`,
  Ny = (e) => x.isFunction(e) || e === null || e === !1;
function Cy(e, t) {
  e = x.isArray(e) ? e : [e];
  const { length: n } = e;
  let r, l;
  const i = {};
  for (let o = 0; o < n; o++) {
    r = e[o];
    let s;
    if (
      ((l = r),
      !Ny(r) && ((l = ya[(s = String(r)).toLowerCase()]), l === void 0))
    )
      throw new I(`Unknown adapter '${s}'`);
    if (l && (x.isFunction(l) || (l = l.get(t)))) break;
    i[s || "#" + o] = l;
  }
  if (!l) {
    const o = Object.entries(i).map(
      ([a, u]) =>
        `adapter ${a} ` +
        (u === !1
          ? "is not supported by the environment"
          : "is not available in the build"),
    );
    let s = n
      ? o.length > 1
        ? `since :
` +
          o.map(sc).join(`
`)
        : " " + sc(o[0])
      : "as no adapter specified";
    throw new I(
      "There is no suitable adapter to dispatch the request " + s,
      "ERR_NOT_SUPPORT",
    );
  }
  return l;
}
const Yd = { getAdapter: Cy, adapters: ya };
function fo(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Kr(null, e);
}
function ac(e) {
  return (
    fo(e),
    (e.headers = Le.from(e.headers)),
    (e.data = co.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Yd.getAdapter(
      e.adapter || qr.adapter,
      e,
    )(e).then(
      function (r) {
        return (
          fo(e),
          (r.data = co.call(e, e.transformResponse, r)),
          (r.headers = Le.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          qd(r) ||
            (fo(e),
            r &&
              r.response &&
              ((r.response.data = co.call(e, e.transformResponse, r.response)),
              (r.response.headers = Le.from(r.response.headers)))),
          Promise.reject(r)
        );
      },
    )
  );
}
const Gd = "1.15.1",
  Li = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Li[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  },
);
const uc = {};
Li.transitional = function (t, n, r) {
  function l(i, o) {
    return (
      "[Axios v" +
      Gd +
      "] Transitional option '" +
      i +
      "'" +
      o +
      (r ? ". " + r : "")
    );
  }
  return (i, o, s) => {
    if (t === !1)
      throw new I(
        l(o, " has been removed" + (n ? " in " + n : "")),
        I.ERR_DEPRECATED,
      );
    return (
      n &&
        !uc[o] &&
        ((uc[o] = !0),
        console.warn(
          l(
            o,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future",
          ),
        )),
      t ? t(i, o, s) : !0
    );
  };
};
Li.spelling = function (t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function jy(e, t, n) {
  if (typeof e != "object")
    throw new I("options must be an object", I.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let l = r.length;
  for (; l-- > 0; ) {
    const i = r[l],
      o = t[i];
    if (o) {
      const s = e[i],
        a = s === void 0 || o(s, i, e);
      if (a !== !0)
        throw new I("option " + i + " must be " + a, I.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new I("Unknown option " + i, I.ERR_BAD_OPTION);
  }
}
const Fl = { assertOptions: jy, validators: Li },
  He = Fl.validators;
let rn = class {
  constructor(t) {
    ((this.defaults = t || {}),
      (this.interceptors = { request: new Yu(), response: new Yu() }));
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let l = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(l)
          : (l = new Error());
        const i = (() => {
          if (!l.stack) return "";
          const o = l.stack.indexOf(`
`);
          return o === -1 ? "" : l.stack.slice(o + 1);
        })();
        try {
          if (!r.stack) r.stack = i;
          else if (i) {
            const o = i.indexOf(`
`),
              s =
                o === -1
                  ? -1
                  : i.indexOf(
                      `
`,
                      o + 1,
                    ),
              a = s === -1 ? "" : i.slice(s + 1);
            String(r.stack).endsWith(a) ||
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
      (n = cn(this.defaults, n)));
    const { transitional: r, paramsSerializer: l, headers: i } = n;
    (r !== void 0 &&
      Fl.assertOptions(
        r,
        {
          silentJSONParsing: He.transitional(He.boolean),
          forcedJSONParsing: He.transitional(He.boolean),
          clarifyTimeoutError: He.transitional(He.boolean),
          legacyInterceptorReqResOrdering: He.transitional(He.boolean),
        },
        !1,
      ),
      l != null &&
        (x.isFunction(l)
          ? (n.paramsSerializer = { serialize: l })
          : Fl.assertOptions(
              l,
              { encode: He.function, serialize: He.function },
              !0,
            )),
      n.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (n.allowAbsoluteUrls = !0)),
      Fl.assertOptions(
        n,
        {
          baseUrl: He.spelling("baseURL"),
          withXsrfToken: He.spelling("withXSRFToken"),
        },
        !0,
      ),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase()));
    let o = i && x.merge(i.common, i[n.method]);
    (i &&
      x.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (y) => {
          delete i[y];
        },
      ),
      (n.headers = Le.concat(o, i)));
    const s = [];
    let a = !0;
    this.interceptors.request.forEach(function (w) {
      if (typeof w.runWhen == "function" && w.runWhen(n) === !1) return;
      a = a && w.synchronous;
      const v = n.transitional || ga;
      v && v.legacyInterceptorReqResOrdering
        ? s.unshift(w.fulfilled, w.rejected)
        : s.push(w.fulfilled, w.rejected);
    });
    const u = [];
    this.interceptors.response.forEach(function (w) {
      u.push(w.fulfilled, w.rejected);
    });
    let c,
      d = 0,
      g;
    if (!a) {
      const y = [ac.bind(this), void 0];
      for (
        y.unshift(...s), y.push(...u), g = y.length, c = Promise.resolve(n);
        d < g;
      )
        c = c.then(y[d++], y[d++]);
      return c;
    }
    g = s.length;
    let S = n;
    for (; d < g; ) {
      const y = s[d++],
        w = s[d++];
      try {
        S = y(S);
      } catch (v) {
        w.call(this, v);
        break;
      }
    }
    try {
      c = ac.call(this, S);
    } catch (y) {
      return Promise.reject(y);
    }
    for (d = 0, g = u.length; d < g; ) c = c.then(u[d++], u[d++]);
    return c;
  }
  getUri(t) {
    t = cn(this.defaults, t);
    const n = Jd(t.baseURL, t.url, t.allowAbsoluteUrls);
    return Wd(n, t.params, t.paramsSerializer);
  }
};
x.forEach(["delete", "get", "head", "options"], function (t) {
  rn.prototype[t] = function (n, r) {
    return this.request(
      cn(r || {}, { method: t, url: n, data: (r || {}).data }),
    );
  };
});
x.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (i, o, s) {
      return this.request(
        cn(s || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: i,
          data: o,
        }),
      );
    };
  }
  ((rn.prototype[t] = n()), (rn.prototype[t + "Form"] = n(!0)));
});
let Py = class Zd {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (i) {
      n = i;
    });
    const r = this;
    (this.promise.then((l) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; ) r._listeners[i](l);
      r._listeners = null;
    }),
      (this.promise.then = (l) => {
        let i;
        const o = new Promise((s) => {
          (r.subscribe(s), (i = s));
        }).then(l);
        return (
          (o.cancel = function () {
            r.unsubscribe(i);
          }),
          o
        );
      }),
      t(function (i, o, s) {
        r.reason || ((r.reason = new Kr(i, o, s)), n(r.reason));
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
      token: new Zd(function (l) {
        t = l;
      }),
      cancel: t,
    };
  }
};
function Ty(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function _y(e) {
  return x.isObject(e) && e.isAxiosError === !0;
}
const ps = {
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
Object.entries(ps).forEach(([e, t]) => {
  ps[t] = e;
});
function ep(e) {
  const t = new rn(e),
    n = Id(rn.prototype.request, t);
  return (
    x.extend(n, rn.prototype, t, { allOwnKeys: !0 }),
    x.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (l) {
      return ep(cn(e, l));
    }),
    n
  );
}
const re = ep(qr);
re.Axios = rn;
re.CanceledError = Kr;
re.CancelToken = Py;
re.isCancel = qd;
re.VERSION = Gd;
re.toFormData = _i;
re.AxiosError = I;
re.Cancel = re.CanceledError;
re.all = function (t) {
  return Promise.all(t);
};
re.spread = Ty;
re.isAxiosError = _y;
re.mergeConfig = cn;
re.AxiosHeaders = Le;
re.formToJSON = (e) => Qd(x.isHTMLForm(e) ? new FormData(e) : e);
re.getAdapter = Yd.getAdapter;
re.HttpStatusCode = ps;
re.default = re;
const {
    Axios: x0,
    AxiosError: S0,
    CanceledError: E0,
    isCancel: k0,
    CancelToken: R0,
    VERSION: N0,
    all: C0,
    Cancel: j0,
    isAxiosError: P0,
    spread: T0,
    toFormData: _0,
    AxiosHeaders: L0,
    HttpStatusCode: O0,
    formToJSON: I0,
    getAdapter: A0,
    mergeConfig: F0,
  } = re,
  et = re.create({ baseURL: "http://localhost:5000/api/", timeout: 5e3 });
et.interceptors.request.use((e) => {
  const t = sessionStorage.getItem("token");
  return (t && (e.headers.Authorization = `Bearer ${t}`), e);
});
et.interceptors.response.use(
  (e) => e,
  (e) => {
    var r, l;
    const t = ((r = e.config) == null ? void 0 : r.url) || "",
      n = /\/(login|register)(\?|$)/.test(t);
    return (
      ((l = e.response) == null ? void 0 : l.status) === 401 &&
        !n &&
        (sessionStorage.removeItem("token"),
        sessionStorage.removeItem("user"),
        window.dispatchEvent(new Event("auth:session-expired"))),
      Promise.reject(e)
    );
  },
);
const hs = {
    register: (e) => et.post("/register", e),
    login: (e) => et.post("/login", e),
    me: () => et.get("/me"),
    updateProfile: (e) => et.put("/profile", e),
  },
  yl = {
    start: (e) => et.post("/interview/session", { action: "start", setup: e }),
    review: (e) => et.post("/interview/session", { action: "review", ...e }),
    finish: (e) => et.post("/interview/session", { action: "finish", ...e }),
    clear: (e) => et.delete(`/interview/session/${encodeURIComponent(e)}`),
  },
  Ly = {
    speak: (e) =>
      et.post("/speech/speak", { text: e }, { responseType: "arraybuffer" }),
  },
  tp = E.createContext(null);
function Oy({ children: e }) {
  const [t, n] = E.useState(() => {
      const a = sessionStorage.getItem("user");
      return a ? JSON.parse(a) : null;
    }),
    [r, l] = E.useState(!0);
  (E.useEffect(() => {
    sessionStorage.getItem("token")
      ? hs
          .me()
          .then((u) => {
            (n(u.data), sessionStorage.setItem("user", JSON.stringify(u.data)));
          })
          .catch(() => {
            (sessionStorage.removeItem("token"),
              sessionStorage.removeItem("user"),
              n(null));
          })
          .finally(() => l(!1))
      : l(!1);
  }, []),
    E.useEffect(() => {
      const a = () => {
        n(null);
      };
      return (
        window.addEventListener("auth:session-expired", a),
        () => {
          window.removeEventListener("auth:session-expired", a);
        }
      );
    }, []));
  const i = (a, u) => {
      (sessionStorage.setItem("token", a),
        sessionStorage.setItem("user", JSON.stringify(u)),
        n(u));
    },
    o = () => {
      (sessionStorage.removeItem("token"),
        sessionStorage.removeItem("user"),
        n(null));
    },
    s = (a) => {
      n((u) => {
        const c = { ...u, ...a };
        return (sessionStorage.setItem("user", JSON.stringify(c)), c);
      });
    };
  return f.jsx(tp.Provider, {
    value: { user: t, loading: r, login: i, logout: o, updateUser: s },
    children: e,
  });
}
const Oi = () => E.useContext(tp);
function Iy() {
  return f.jsx("main", {
    className: "landing-page",
    children: f.jsx("div", {
      className: "landing-shell",
      children: f.jsxs("section", {
        className: "landing-grid",
        children: [
          f.jsxs("div", {
            className: "landing-hero",
            children: [
              f.jsx("p", {
                className: "eyebrow",
                children: "Adaptive interview practice",
              }),
              f.jsx("h1", { children: "AI Interview Assistant" }),
              f.jsx("p", {
                className: "landing-copy",
                children:
                  "A guided interview workspace for internship prep, job readiness, and language practice with structured feedback and timed sessions.",
              }),
              f.jsxs("div", {
                className: "landing-actions",
                children: [
                  f.jsx(Wu, {
                    to: "/auth",
                    className: "btn btn-primary",
                    children: "Create account",
                  }),
                  f.jsx(Wu, {
                    to: "/auth",
                    className: "btn btn-secondary",
                    children: "Login",
                  }),
                ],
              }),
              f.jsxs("div", {
                className: "landing-highlights",
                children: [
                  f.jsxs("div", {
                    className: "landing-highlight",
                    children: [
                      f.jsx("strong", { children: "3 tracks" }),
                      f.jsx("span", {
                        children: "Internship, job, and language sessions",
                      }),
                    ],
                  }),
                  f.jsxs("div", {
                    className: "landing-highlight",
                    children: [
                      f.jsx("strong", { children: "Timed" }),
                      f.jsx("span", {
                        children: "3 or 5 minute interview sessions",
                      }),
                    ],
                  }),
                  f.jsxs("div", {
                    className: "landing-highlight",
                    children: [
                      f.jsx("strong", { children: "Live feedback" }),
                      f.jsx("span", {
                        children: "Scores, insights, and final review",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          f.jsxs("aside", {
            className: "landing-preview",
            children: [
              f.jsxs("div", {
                className: "preview-card preview-card-main",
                children: [
                  f.jsx("p", {
                    className: "preview-label",
                    children: "Today’s flow",
                  }),
                  f.jsx("h3", {
                    children:
                      "Pick a path, answer naturally, and review the result.",
                  }),
                  f.jsx("p", {
                    children:
                      "The interview adapts to your profile so the first question, feedback, and final summary all stay track-aware.",
                  }),
                ],
              }),
              f.jsxs("div", {
                className: "preview-stack",
                children: [
                  f.jsxs("article", {
                    className: "feature-card",
                    children: [
                      f.jsx("h3", { children: "Internship mode" }),
                      f.jsx("p", {
                        children:
                          "Role, skills, projects, stack, and interview level.",
                      }),
                    ],
                  }),
                  f.jsxs("article", {
                    className: "feature-card",
                    children: [
                      f.jsx("h3", { children: "Job mode" }),
                      f.jsx("p", {
                        children:
                          "Experience, previous internships, and deeper role questions.",
                      }),
                    ],
                  }),
                  f.jsxs("article", {
                    className: "feature-card",
                    children: [
                      f.jsx("h3", { children: "Language mode" }),
                      f.jsx("p", {
                        children:
                          "Target language, current level, and speaking confidence.",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
}
const Ay = ({ message: e, onMouseEnter: t, onMouseLeave: n, onClose: r }) =>
    f.jsxs("div", {
      role: "status",
      "aria-live": "polite",
      onMouseEnter: t,
      onMouseLeave: n,
      style: {
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#ff4d4f",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "white",
        padding: "12px 14px 12px 18px",
        borderRadius: "8px",
        fontWeight: "bold",
        zIndex: 9999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      },
      children: [
        f.jsx("span", { children: e }),
        f.jsx("button", {
          type: "button",
          onClick: r,
          "aria-label": "Dismiss error message",
          style: {
            border: "none",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
            padding: 0,
          },
          children: "×",
        }),
      ],
    }),
  Fy = ({ message: e, onMouseEnter: t, onMouseLeave: n, onClose: r }) =>
    f.jsxs("div", {
      role: "status",
      "aria-live": "polite",
      onMouseEnter: t,
      onMouseLeave: n,
      style: {
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#52c41a",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "white",
        padding: "12px 14px 12px 18px",
        borderRadius: "8px",
        fontWeight: "bold",
        zIndex: 9999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      },
      children: [
        f.jsx("span", { children: e }),
        f.jsx("button", {
          type: "button",
          onClick: r,
          "aria-label": "Dismiss success message",
          style: {
            border: "none",
            background: "transparent",
            color: "white",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
            padding: 0,
          },
          children: "×",
        }),
      ],
    }),
  np = E.createContext(),
  Dy = ({ children: e }) => {
    const [t, n] = E.useState(null),
      r = E.useRef(null),
      l = E.useRef(0),
      i = E.useRef(4e3),
      o = () => {
        r.current && (clearTimeout(r.current), (r.current = null));
      },
      s = () => {
        (o(), (i.current = 4e3), (l.current = 0), n(null));
      },
      a = (y = i.current) => {
        (o(),
          (l.current = Date.now()),
          (r.current = setTimeout(() => {
            s();
          }, y)));
      },
      u = (y, w) => {
        ((i.current = 4e3), n({ type: y, message: w }), a(4e3));
      },
      c = (y) => {
        u("error", y);
      },
      d = (y) => {
        u("success", y);
      },
      g = () => {
        if (!t || !r.current) return;
        const y = Date.now() - l.current;
        ((i.current = Math.max(0, i.current - y)), o());
      },
      S = () => {
        !t || r.current || i.current <= 0 || a(i.current);
      };
    return (
      E.useEffect(() => o, []),
      f.jsxs(np.Provider, {
        value: { showError: c, showSuccess: d },
        children: [
          e,
          (t == null ? void 0 : t.type) === "error" &&
            f.jsx(Ay, {
              message: t.message,
              onClose: s,
              onMouseEnter: g,
              onMouseLeave: S,
            }),
          (t == null ? void 0 : t.type) === "success" &&
            f.jsx(Fy, {
              message: t.message,
              onClose: s,
              onMouseEnter: g,
              onMouseLeave: S,
            }),
        ],
      })
    );
  },
  zy = () => E.useContext(np);
function Uy() {
  const [e, t] = E.useState(!0),
    [n, r] = E.useState({ name: "", email: "", password: "" }),
    l = Ni(),
    { login: i } = Oi(),
    { showError: o, showSuccess: s } = zy(),
    a = (c) => {
      r({ ...n, [c.target.name]: c.target.value });
    },
    u = async (c) => {
      var d, g;
      c.preventDefault();
      try {
        if (e) {
          const S = await hs.login({ email: n.email, password: n.password });
          (i(S.data.token, S.data.user), s("Login successful"), l("/home"));
        } else {
          const S = await hs.register(n);
          (i(S.data.token, S.data.user),
            s("Registration successful"),
            l("/home"));
        }
      } catch (S) {
        o(
          ((g = (d = S.response) == null ? void 0 : d.data) == null
            ? void 0
            : g.message) || "Something went wrong",
        );
      }
    };
  return f.jsx("div", {
    className: "auth-page",
    children: f.jsxs("div", {
      className: "auth-shell",
      children: [
        f.jsxs("section", {
          className: "auth-card",
          children: [
            f.jsxs("div", {
              className: "auth-card-top",
              children: [
                f.jsx("span", {
                  className: "auth-card-chip",
                  children: e ? "Sign in" : "Join now",
                }),
                f.jsx("button", {
                  className: "auth-switch",
                  onClick: () => t(!e),
                  children: e ? "Need an account?" : "Already have an account?",
                }),
              ],
            }),
            f.jsx("h3", {
              className: "auth-form-title",
              children: e ? "Login" : "Register",
            }),
            f.jsxs("form", {
              className: "auth-form",
              onSubmit: u,
              children: [
                !e &&
                  f.jsx("input", {
                    name: "name",
                    placeholder: "Name",
                    onChange: a,
                    required: !0,
                  }),
                f.jsx("input", {
                  name: "email",
                  type: "email",
                  placeholder: "Email",
                  onChange: a,
                  required: !0,
                }),
                f.jsx("input", {
                  name: "password",
                  type: "password",
                  placeholder: "Password",
                  onChange: a,
                  required: !0,
                }),
                f.jsx("button", {
                  type: "submit",
                  className: "auth-submit",
                  children: e ? "Login" : "Register",
                }),
              ],
            }),
          ],
        }),
        f.jsxs("section", {
          className: "auth-copy-panel",
          children: [
            f.jsx("p", {
              className: "auth-eyebrow",
              children: "Private workspace",
            }),
            f.jsx("h2", {
              className: "auth-title",
              children: e ? "Welcome back" : "Create your profile",
            }),
            f.jsx("p", {
              className: "auth-subtitle",
              children: e
                ? "Continue your tracked interview sessions with a clean, distraction-free interface."
                : "Set up your account once, then start interviews for internship, job, or language practice.",
            }),
            f.jsxs("div", {
              className: "auth-points",
              children: [
                f.jsxs("div", {
                  className: "auth-point",
                  children: [
                    f.jsx("strong", { children: "Fast entry" }),
                    f.jsx("span", {
                      children: "Email and password login with instant access.",
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "auth-point",
                  children: [
                    f.jsx("strong", { children: "Track aware" }),
                    f.jsx("span", {
                      children:
                        "Internship, job, and language flows live in one place.",
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "auth-point",
                  children: [
                    f.jsx("strong", { children: "Clean review" }),
                    f.jsx("span", {
                      children:
                        "Clear scores, feedback, and final results after each session.",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
const wl = {
    track: "internship",
    role: "",
    subjects: "",
    projects: "",
    techStack: [],
    experience: "",
    previousInternships: "",
    language: "",
    languageLevel: "",
    interviewLevel: "Beginner",
    durationMinutes: "3",
    notes: "",
  },
  wa = { accuracy: 0, confidence: 0, vocabulary: 0, english: 0, overall: 0 },
  My = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
    "QA Engineer",
    "DevOps Engineer",
    "Mobile Developer",
  ],
  By = [
    "OOPs",
    "System Design",
    "Computer Networking",
    "DBMS",
    "Python",
    "SQL",
    "Operating Systems",
  ],
  $y = [
    "MERN",
    "MEAN",
    "React + Node.js",
    "Next.js",
    "Django",
    "Flask",
    "FastAPI",
    "Spring Boot",
    ".NET",
    "AWS",
    "Docker",
    "Kubernetes",
  ],
  Hy = [
    "English",
    "Spanish",
    "French",
    "German",
    "Japanese",
    "Korean",
    "Hindi",
    "Arabic",
    "Mandarin",
    "Portuguese",
  ],
  Vy = [
    "No experience yet",
    "Internship experience",
    "Freelance experience",
    "1-2 years",
    "3-5 years",
    "5+ years",
  ],
  Wy = ["None", "1 internship", "2 internships", "3+ internships"],
  rp = ["Beginner", "Intermediate", "Advanced"],
  xa = ["3", "5"],
  Qy = [
    {
      name: "role",
      label: "Role",
      placeholder: "Describe the role you have held or are interested in",
      required: !0,
      suggestions: My,
      tracks: ["internship", "job"],
    },
    {
      name: "subjects",
      label: "Topics/Subjects",
      placeholder:
        "Operating System, OOPs, DSA, Computer Networking, or any specific topics",
      required: !0,
      suggestions: By,
      tracks: ["internship", "job"],
    },
    {
      name: "projects",
      label: "Projects",
      placeholder: "Describe projects or practical work you have done",
      required: !0,
      tracks: ["internship", "job"],
    },
    {
      name: "techStack",
      label: "Tech Stack",
      placeholder: "Select technologies",
      required: !0,
      type: "multiselect",
      suggestions: $y,
      tracks: ["internship", "job"],
    },
    {
      name: "experience",
      label: "Experience",
      placeholder: "Share job experience, freelance work, or say none",
      suggestions: Vy,
      tracks: ["job"],
    },
    {
      name: "previousInternships",
      label: "Previous internships",
      placeholder: "Mention previous internships or say none",
      suggestions: Wy,
      tracks: ["job"],
    },
    {
      name: "language",
      label: "Language to learn",
      placeholder: "English, Spanish, German, French, or any language",
      required: !0,
      suggestions: Hy,
      tracks: ["language"],
    },
    {
      name: "languageLevel",
      label: "Current level",
      placeholder: "Beginner, intermediate, or advanced",
      required: !0,
      type: "select",
      options: ["Beginner", "Intermediate", "Advanced"],
      tracks: ["language"],
    },
    {
      name: "interviewLevel",
      label: "Interview level",
      placeholder: "Beginner, Intermediate, or Advanced",
      required: !0,
      type: "select",
      options: rp,
      tracks: ["internship", "job", "language"],
    },
    {
      name: "notes",
      label: "Anything else we should know?",
      placeholder: "Goals, interview focus, gaps, or special instructions",
      type: "textarea",
      tracks: ["internship", "job", "language"],
    },
  ],
  lp = [
    {
      value: "internship",
      label: "Ready for internship",
      description:
        "Focus on role fit, projects, skills, tech stack, and interview basics.",
    },
    {
      value: "job",
      label: "Ready for job",
      description:
        "Covers role fit plus experience, previous internships, and stronger depth.",
    },
    {
      value: "language",
      label: "Want to learn language",
      description:
        "Focuses on the language you want to learn and your current level.",
    },
  ],
  ip = (e) => Qy.filter((t) => !t.tracks || t.tracks.includes(e)),
  Ae = (e) =>
    String(e || "")
      .trim()
      .toLowerCase(),
  qy = (e) => {
    const t = Ae(e == null ? void 0 : e.track),
      n = String((e == null ? void 0 : e.durationMinutes) || "").trim();
    if (!["internship", "job", "language"].includes(t) || !xa.includes(n))
      return !1;
    if (t === "language") {
      if (
        !Ae(e == null ? void 0 : e.language) ||
        !Ae(e == null ? void 0 : e.languageLevel) ||
        !["beginner", "intermediate", "advanced"].includes(
          Ae(e == null ? void 0 : e.languageLevel),
        )
      )
        return !1;
    } else if (
      !Ae(e == null ? void 0 : e.role) ||
      !Ae(e == null ? void 0 : e.subjects) ||
      !Array.isArray(e == null ? void 0 : e.techStack) ||
      e.techStack.length === 0
    )
      return !1;
    return !!Ae(e == null ? void 0 : e.interviewLevel);
  },
  Ky = (e) => {
    const t = Ae(e == null ? void 0 : e.track);
    if (!["internship", "job", "language"].includes(t))
      return "Please choose a valid interview track.";
    if (
      !xa.includes(
        String((e == null ? void 0 : e.durationMinutes) || "").trim(),
      )
    )
      return "Please choose a valid interview time.";
    if (t === "language") {
      if (!Ae(e == null ? void 0 : e.language))
        return "Please choose the language you want to learn.";
      if (!Ae(e == null ? void 0 : e.languageLevel))
        return "Please choose your current language level.";
    } else {
      if (!Ae(e == null ? void 0 : e.role))
        return "Please choose a role first.";
      if (!Ae(e == null ? void 0 : e.subjects))
        return "Please add your subjects first.";
      if (
        !Array.isArray(e == null ? void 0 : e.techStack) ||
        e.techStack.length === 0
      )
        return "Please add your tech stack first.";
    }
    return Ae(e == null ? void 0 : e.interviewLevel)
      ? ""
      : "Please choose the interview level.";
  },
  Sa = (e) => {
    var t;
    return (
      ((t = lp.find((n) => n.value === e)) == null ? void 0 : t.label) ||
      "Interview"
    );
  },
  Jy = (e) =>
    e.track === "language"
      ? [
          `Language: ${e.language || "Not set"}`,
          `Level: ${e.languageLevel || "Not set"}`,
        ]
      : [
          `Role: ${e.role || "Not set"}`,
          `Subjects: ${e.subjects || "Not set"}`,
        ],
  Xy = "Speak your answer, then pause for 3-4 seconds to submit.";
function by({ onAutoSubmit: e, autoSubmitSilence: t, isBusy: n }) {
  const r = E.useRef(null),
    l = E.useRef(null),
    i = E.useRef(""),
    o = E.useRef(!1),
    s = E.useRef(e),
    a = E.useRef(t),
    u = E.useRef(n),
    [c, d] = E.useState(""),
    [g, S] = E.useState(!1),
    [y, w] = E.useState(!0),
    [v, p] = E.useState(""),
    [h, m] = E.useState(Xy);
  (E.useEffect(() => {
    s.current = e;
  }, [e]),
    E.useEffect(() => {
      a.current = t;
    }, [t]),
    E.useEffect(() => {
      u.current = n;
    }, [n]),
    E.useEffect(() => {
      i.current = c;
    }, [c]),
    E.useEffect(() => {
      o.current = g;
    }, [g]));
  const k = () => {
      l.current && (clearTimeout(l.current), (l.current = null));
    },
    N = (D) => {
      (k(),
        !(!a.current || u.current || !o.current) &&
          (l.current = setTimeout(() => {
            var H;
            const L = String(D || i.current || "").trim();
            L &&
              o.current &&
              !u.current &&
              ((H = s.current) == null || H.call(s, L, !0));
          }, 6e3)));
    };
  E.useEffect(() => {
    const D = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!D) {
      (w(!1), p("Voice input is not supported in this browser."));
      return;
    }
    const L = new D();
    return (
      (L.lang = "en-US"),
      (L.interimResults = !0),
      (L.continuous = !0),
      (L.onresult = (H) => {
        let ue = "",
          ce = "";
        for (let Be = 0; Be < H.results.length; Be++) {
          const J = H.results[Be][0].transcript;
          H.results[Be].isFinal ? (ue += J + " ") : (ce += J);
        }
        const fe = (ue + ce).trim();
        (d(fe),
          p(""),
          m("Listening... pause to submit automatically."),
          fe && N(fe));
      }),
      (L.onerror = (H) => {
        (p(H.error || "Could not access the microphone."),
          S(!1),
          k(),
          m("Microphone stopped."));
      }),
      (L.onend = () => {
        if (o.current)
          try {
            L.start();
            return;
          } catch {}
        (S(!1), k());
      }),
      (r.current = L),
      () => {
        (k(), L.abort());
      }
    );
  }, []);
  const P = () => {
      if ((k(), r.current))
        try {
          r.current.stop();
        } catch {
          r.current.abort();
        }
      (S(!1), (o.current = !1), m("Listening stopped."));
    },
    j = () => {
      if (!r.current || !y)
        return (p("Voice input is not available in this browser."), !1);
      p("");
      try {
        return (r.current.start(), S(!0), m("Listening for your answer."), !0);
      } catch {
        return (p("Microphone could not be started. Try again."), S(!1), !1);
      }
    };
  return {
    answerText: c,
    setAnswerText: d,
    isListening: g,
    speechSupported: y,
    speechError: v,
    setSpeechError: p,
    voiceHint: h,
    setVoiceHint: m,
    startListening: j,
    stopListening: P,
    toggleListening: () => {
      if (o.current) {
        P();
        return;
      }
      j();
    },
    clearSilenceTimer: k,
  };
}
function Yy({ setSpeechError: e }) {
  const t = E.useRef(null),
    n = E.useRef(null),
    r = () => {
      (t.current && (t.current.pause(), (t.current = null)),
        n.current && (URL.revokeObjectURL(n.current), (n.current = null)));
    };
  return (
    E.useEffect(() => r, []),
    {
      speakReply: async (i, o) => {
        var a, u;
        const s = String(i || "").trim();
        if (s)
          try {
            r();
            const c = await Ly.speak(s),
              d = new Blob([c.data], { type: "audio/wav" }),
              g = URL.createObjectURL(d);
            n.current = g;
            const S = new Audio(g);
            ((t.current = S),
              (S.onended = () => {
                (n.current === g &&
                  (URL.revokeObjectURL(g), (n.current = null)),
                  o && o());
              }),
              (S.onerror = () => {
                (n.current === g &&
                  (URL.revokeObjectURL(g), (n.current = null)),
                  e("The Python speaker service could not play the audio."));
              }),
              S.play().catch((y) => {
                var w, v;
                e(
                  ((v =
                    (w = y == null ? void 0 : y.response) == null
                      ? void 0
                      : w.data) == null
                    ? void 0
                    : v.message) ||
                    y.message ||
                    "Could not generate spoken audio.",
                );
              }));
          } catch (c) {
            e(
              ((u =
                (a = c == null ? void 0 : c.response) == null
                  ? void 0
                  : a.data) == null
                ? void 0
                : u.message) ||
                c.message ||
                "Could not generate spoken audio.",
            );
          }
      },
      stopPlayback: r,
    }
  );
}
const Gy = (e) => String(e || "").trim(),
  xl = (e) => {
    const t = Math.max(0, Math.floor(Number(e) || 0)),
      n = Math.floor(t / 60),
      r = t % 60;
    return `${n}m ${String(r).padStart(2, "0")}s`;
  },
  po = () => ({
    analysisPoints: [],
    scores: wa,
    summaryText: "",
    improvedAnswer: "",
    improvedQuestion: "",
    nextQuestion: "",
    attemptNumber: 0,
    shouldRetry: !1,
    statusText: "",
    rate: 0,
    result: 0,
    total: 10,
  });
function Zy() {
  const [e, t] = E.useState(wl),
    [n, r] = E.useState("setup"),
    [l, i] = E.useState(""),
    [o, s] = E.useState(po()),
    [a, u] = E.useState([]),
    [c, d] = E.useState(!1),
    [g, S] = E.useState(!1),
    [y, w] = E.useState(!1),
    [v, p] = E.useState(""),
    [h, m] = E.useState(""),
    [k, N] = E.useState(!0),
    [P, j] = E.useState(!0),
    [_, D] = E.useState(null),
    [L, H] = E.useState(""),
    [ue, ce] = E.useState(0),
    [fe, Be] = E.useState(0),
    [J, ct] = E.useState(0),
    C = E.useRef(wl),
    O = E.useRef(""),
    A = E.useRef([]),
    z = E.useRef(!1),
    V = E.useRef(!1),
    $e = E.useRef(!1),
    b = E.useRef(null),
    ft = E.useRef(() => {}),
    de = E.useRef(""),
    dt = E.useRef(0),
    Jr = E.useRef(Number(wl.durationMinutes) || 3);
  (E.useEffect(() => {
    ((C.current = e), (Jr.current = Number(e.durationMinutes) || 3));
  }, [e]),
    E.useEffect(() => {
      O.current = l;
    }, [l]),
    E.useEffect(() => {
      A.current = a;
    }, [a]),
    E.useEffect(() => {
      z.current = g;
    }, [g]),
    E.useEffect(() => {
      de.current = L;
    }, [L]),
    E.useEffect(() => {
      dt.current = ue;
    }, [ue]),
    E.useEffect(() => {
      try {
        const B = localStorage.getItem("aiInterview.inProgress"),
          $ = localStorage.getItem("aiInterview.setup");
        if (B === "1" && $) {
          const Oe = JSON.parse($);
          (t((Xe) => ({ ...Xe, ...Oe })),
            setTimeout(() => {
              ja(Oe);
            }, 50));
        }
      } catch {}
    }, []),
    E.useEffect(() => {
      if (n !== "live" || !dt.current) return;
      const B = Jr.current * 60,
        $ = () => {
          const Oe = Math.max(0, Math.floor((Date.now() - dt.current) / 1e3)),
            Xe = Math.max(0, B - Oe);
          try {
            console.debug(
              "[timer] elapsed=",
              Oe,
              "remaining=",
              Xe,
              "phase=",
              n,
            );
          } catch {}
          (ct(Math.min(Oe, B)),
            Be(Xe),
            Xe <= 0 &&
              n === "live" &&
              (console.debug("[timer] time expired, calling finishInterview"),
              Ca("time-limit")));
        };
      return (
        $(),
        (b.current = window.setInterval($, 1e3)),
        () => {
          b.current && (clearInterval(b.current), (b.current = null));
        }
      );
    }, [n, ue]));
  const {
      answerText: ap,
      setAnswerText: Ii,
      isListening: up,
      speechSupported: cp,
      speechError: fp,
      setSpeechError: Ea,
      voiceHint: dp,
      setVoiceHint: Xr,
      startListening: ka,
      toggleListening: pp,
      stopListening: br,
    } = by({
      onAutoSubmit: (B, $) => ft.current(B, $),
      autoSubmitSilence: P,
      isBusy: g || c,
    }),
    { speakReply: Ra, stopPlayback: Ai } = Yy({ setSpeechError: Ea }),
    hp = (B, $) => {
      t((Oe) => ({ ...Oe, [B]: $ }));
    },
    mp = (B) => {
      t(($) => ({ ...wl, ...$, track: B }));
    },
    Na = () => ({
      trackLabel: Sa(C.current.track),
      setup: C.current,
      history: A.current,
      scores: o.scores,
      analysisPoints: o.analysisPoints,
      summaryText: o.summaryText,
      focusText: o.statusText,
      followUpQuestion: o.nextQuestion,
      improvedAnswer: o.improvedAnswer,
      timeRemainingLabel: xl(fe),
      timeElapsedLabel: xl(J),
    }),
    Yr = async (B, $ = !1) => {
      var Xe, pn;
      if (n !== "live") return;
      const Oe = Gy(B);
      if (!Oe) {
        p("Please enter or speak an answer first.");
        return;
      }
      if (!O.current) {
        p("Start the interview first.");
        return;
      }
      if (!V.current) {
        V.current = !0;
        try {
          (S(!0), (z.current = !0), p(""), br());
          const F = await yl.review({
              setup: C.current,
              sessionId: de.current,
              question: O.current,
              answer: Oe,
              history: A.current,
            }),
            Jn = Array.isArray(F.data.analysis) ? F.data.analysis : [],
            pt = { ...wa, ...F.data.scores },
            ht = F.data.nextQuestion || O.current;
          (s({
            analysisPoints: Jn,
            scores: pt,
            summaryText: F.data.summary || "",
            improvedAnswer: F.data.improvedAnswer || "",
            improvedQuestion: F.data.improvedQuestion || "",
            nextQuestion: ht,
            attemptNumber: F.data.attemptNumber || 1,
            shouldRetry: !!F.data.shouldRetry,
            rate: Number(F.data.rate ?? F.data.result ?? pt.overall) || 0,
            result: Number(F.data.result ?? F.data.rate ?? pt.overall) || 0,
            total: Number(F.data.total || 10) || 10,
            statusText: F.data.shouldRetry
              ? F.data.retryQuestion || "Try the answer once more."
              : F.data.sessionState === "advance"
                ? "Moving to the next interview question."
                : "Interview feedback updated.",
          }),
            u((Gr) => {
              const Zr = [
                ...Gr,
                {
                  question: O.current,
                  answer: Oe,
                  analysis: Jn,
                  scores: pt,
                  summary: F.data.summary || "",
                  improvedAnswer: F.data.improvedAnswer || "",
                  improvedQuestion: F.data.improvedQuestion || "",
                  nextQuestion: ht,
                  attemptNumber: F.data.attemptNumber || 1,
                  shouldRetry: !!F.data.shouldRetry,
                  rate: Number(F.data.rate ?? F.data.result ?? pt.overall) || 0,
                  result:
                    Number(F.data.result ?? F.data.rate ?? pt.overall) || 0,
                  total: Number(F.data.total || 10) || 10,
                },
              ];
              return ((A.current = Zr), Zr);
            }),
            (O.current = ht),
            i(ht),
            k &&
              (await Ra(
                [F.data.summary, F.data.improvedAnswer, ht].filter(Boolean)
                  .join(`

`),
                () => {
                  ka();
                },
              )));
        } catch (F) {
          p(
            ((pn = (Xe = F.response) == null ? void 0 : Xe.data) == null
              ? void 0
              : pn.message) ||
              "Could not get feedback from the AI interviewer.",
          );
        } finally {
          (S(!1),
            (z.current = !1),
            (V.current = !1),
            $ && Xr("Answer submitted automatically after silence."));
        }
      }
    };
  E.useEffect(() => {
    ft.current = Yr;
  }, [Yr]);
  const Ca = async (B = "manual") => {
      if (!($e.current || n !== "live")) {
        (($e.current = !0),
          w(!0),
          console.debug("[finishInterview] start", {
            reason: B,
            sessionId: de.current,
          }),
          br(),
          Ai(),
          b.current && (clearInterval(b.current), (b.current = null)));
        try {
          const $ = await yl.finish({
            setup: C.current,
            sessionId: de.current,
            history: A.current,
            currentQuestion: O.current,
            reason: B,
          });
          (console.debug(
            "[finishInterview] finish response",
            $ == null ? void 0 : $.data,
          ),
            D({ ...Na(), ...$.data }));
        } catch {
          (console.error("[finishInterview] error finishing interview"),
            D(Na()));
        } finally {
          try {
            (localStorage.removeItem("aiInterview.inProgress"),
              localStorage.removeItem("aiInterview.setup"));
          } catch {}
          (r("result"), w(!1), ($e.current = !1));
          try {
            de.current &&
              (console.debug(
                "[finishInterview] clearing server session",
                de.current,
              ),
              yl.clear(de.current).catch(($) => {
                console.warn(
                  "[finishInterview] clear failed",
                  ($ == null ? void 0 : $.message) || $,
                );
              }));
          } catch ($) {
            console.warn(
              "[finishInterview] clear attempt error",
              ($ == null ? void 0 : $.message) || $,
            );
          }
          ((de.current = ""), H(""));
        }
      }
    },
    gp = async (B) => {
      (B && typeof B.preventDefault == "function" && B.preventDefault(),
        await ja(C.current));
    },
    ja = async (B) => {
      var Xe, pn;
      const $ = Ky(B);
      if (!qy(B)) {
        m($ || "Please complete the interview setup.");
        return;
      }
      if (B.track === "language") {
        if (!B.language.trim() || !B.languageLevel.trim()) {
          m("Language and level are required to start the interview.");
          return;
        }
      } else if (!B.role.trim() || !B.subjects.trim()) {
        m("Role and subjects are required to start the interview.");
        return;
      }
      try {
        (d(!0),
          m(""),
          p(""),
          D(null),
          s(po()),
          u([]),
          (A.current = []),
          Ii(""),
          Ai());
        const F = await yl.start(B),
          Jn = F.data.question || "Please introduce yourself.",
          pt = F.data.sessionId || "",
          ht = F.data.startedAt || Date.now(),
          Gr = typeof ht == "number" ? ht : Number(new Date(ht)) || Date.now(),
          Zr = Number(F.data.durationMinutes) || Number(B.durationMinutes) || 3;
        (H(pt),
          ce(Gr),
          (Jr.current = Zr),
          (de.current = pt),
          (dt.current = Gr),
          (O.current = Jn),
          i(Jn),
          r("live"),
          setTimeout(() => {
            ka();
          }, 1e3));
        try {
          (localStorage.setItem("aiInterview.inProgress", "1"),
            localStorage.setItem("aiInterview.setup", JSON.stringify(B)));
        } catch {}
        F.data.intro && Xr(F.data.intro);
      } catch (F) {
        m(
          ((pn = (Xe = F.response) == null ? void 0 : Xe.data) == null
            ? void 0
            : pn.message) || "Could not start the interview session.",
        );
      } finally {
        d(!1);
      }
    },
    vp = () => {
      (b.current && (clearInterval(b.current), (b.current = null)),
        r("setup"),
        D(null),
        H(""),
        ce(0),
        Be(0),
        ct(0),
        i(""),
        s(po()),
        u([]),
        (A.current = []),
        p(""),
        m(""),
        Ii(""),
        Xr("Interview reset. Choose a new track to begin again."),
        br(),
        Ai());
      try {
        (localStorage.removeItem("aiInterview.inProgress"),
          localStorage.removeItem("aiInterview.setup"));
      } catch {}
    },
    yp = () => {
      Ra(
        [o.summaryText, o.improvedAnswer, o.nextQuestion].filter(Boolean).join(`

`),
      );
    };
  return {
    setup: e,
    setupFields: ip(e.track),
    interviewPhase: n,
    interviewStarted: n === "live",
    interviewFinished: n === "result",
    currentQuestion: l,
    analysisPoints: o.analysisPoints,
    scores: o.scores,
    summaryText: o.summaryText,
    followUpQuestion: o.nextQuestion,
    focusText: o.statusText,
    improvedAnswer: o.improvedAnswer,
    reviewData: o,
    history: a,
    startingInterview: c,
    loadingReview: g,
    error: v,
    setupError: h,
    autoSpeakReply: k,
    setAutoSpeakReply: N,
    autoSubmitSilence: P,
    setAutoSubmitSilence: j,
    answerText: ap,
    setAnswerText: Ii,
    isListening: up,
    speechSupported: cp,
    speechError: fp,
    setSpeechError: Ea,
    voiceHint: dp,
    setVoiceHint: Xr,
    updateSetupField: hp,
    updateTrack: mp,
    startInterview: gp,
    submitAnswer: Yr,
    sendAnswer: Yr,
    toggleListening: pp,
    stopListening: br,
    replayFeedback: yp,
    finishInterview: Ca,
    finishingInterview: y,
    resultData: _,
    restartInterview: vp,
    sessionId: L,
    timeRemainingLabel: xl(fe),
    timeElapsedLabel: xl(J),
    totalTimeLabel: `${Jr.current} minutes`,
  };
}
function e0({ onLogout: e }) {
  return f.jsxs("header", {
    className: "home-appbar",
    children: [
      f.jsx("h1", { children: "AI Interview Assistant" }),
      f.jsx("button", {
        type: "button",
        className: "home-logout",
        onClick: e,
        children: "Logout",
      }),
    ],
  });
}
const t0 = (e) =>
  e.track === "language"
    ? `Language: ${e.language || "Not set"}`
    : `Role: ${e.role || "Not set"}`;
function n0({
  setup: e,
  timeRemainingLabel: t,
  totalTimeLabel: n,
  sessionState: r,
}) {
  return f.jsxs("section", {
    className: "home-details-strip",
    children: [
      f.jsxs("article", {
        className: "home-detail-card",
        children: [
          f.jsx("span", { children: "Session" }),
          f.jsx("strong", {
            children: r === "retry" ? "Retry round" : "Live chat",
          }),
        ],
      }),
      f.jsxs("article", {
        className: "home-detail-card",
        children: [
          f.jsx("span", { children: "Track" }),
          f.jsx("strong", { children: Sa(e.track) }),
        ],
      }),
      f.jsxs("article", {
        className: "home-detail-card",
        children: [
          f.jsx("span", { children: "Timeline" }),
          f.jsxs("strong", { children: [t, " left of ", n] }),
        ],
      }),
      f.jsxs("article", {
        className: "home-detail-card",
        children: [
          f.jsx("span", { children: "Context" }),
          f.jsx("strong", { children: t0(e) }),
        ],
      }),
      f.jsxs("article", {
        className: "home-detail-card",
        children: [
          f.jsx("span", { children: "Difficulty" }),
          f.jsx("strong", { children: e.interviewLevel || "Not set" }),
        ],
      }),
    ],
  });
}
function r0({
  setup: e,
  onChange: t,
  onSubmit: n,
  startingInterview: r,
  setupError: l,
  onTrackChange: i,
}) {
  const o = ip(e.track);
  return f.jsxs("form", {
    className: "home-box home-setup-box",
    onSubmit: n,
    children: [
      f.jsxs("div", {
        className: "home-box-head",
        children: [
          f.jsxs("div", {
            children: [
              f.jsx("label", { children: "Interview setup" }),
              f.jsx("p", {
                children:
                  "Choose a track, fill in your context, and the AI will shape the interview around it.",
              }),
            ],
          }),
          f.jsx("span", { className: "home-badge", children: "Step 1" }),
        ],
      }),
      f.jsx("div", {
        className: "home-track-grid",
        role: "radiogroup",
        "aria-label": "Interview track",
        children: lp.map((s) =>
          f.jsxs(
            "button",
            {
              type: "button",
              className: `home-track-card ${e.track === s.value ? "is-active" : ""}`,
              onClick: () => i(s.value),
              children: [
                f.jsx("strong", { children: s.label }),
                f.jsx("span", { children: s.description }),
              ],
            },
            s.value,
          ),
        ),
      }),
      f.jsxs("div", {
        className: "home-setup-grid",
        children: [
          f.jsxs("label", {
            className: "home-field",
            children: [
              f.jsxs("span", {
                children: [
                  "Interview time ",
                  f.jsx("em", { className: "home-required", children: "*" }),
                ],
              }),
              f.jsx("select", {
                value: e.durationMinutes,
                onChange: (s) => t("durationMinutes", s.target.value),
                required: !0,
                children: xa.map((s) =>
                  f.jsxs("option", { value: s, children: [s, " minutes"] }, s),
                ),
              }),
            ],
          }),
          o.map((s) =>
            f.jsxs(
              "label",
              {
                className: "home-field",
                children: [
                  f.jsxs("span", {
                    children: [
                      s.label,
                      s.required
                        ? f.jsx("em", {
                            className: "home-required",
                            children: "*",
                          })
                        : null,
                    ],
                  }),
                  s.type === "select"
                    ? f.jsxs("select", {
                        value: e[s.name],
                        onChange: (a) => t(s.name, a.target.value),
                        required: s.required,
                        children: [
                          f.jsx("option", {
                            value: "",
                            children: "Select one",
                          }),
                          (s.options || rp).map((a) =>
                            f.jsx("option", { value: a, children: a }, a),
                          ),
                        ],
                      })
                    : s.type === "multiselect"
                      ? f.jsxs("div", {
                          className: "multi-select-container",
                          children: [
                            f.jsx("div", {
                              className: "selected-tags",
                              children: (e[s.name] || []).map((a) =>
                                f.jsxs(
                                  "div",
                                  {
                                    className: "tag",
                                    children: [
                                      a,
                                      f.jsx("button", {
                                        type: "button",
                                        onClick: () => {
                                          const u = e[s.name].filter(
                                            (c) => c !== a,
                                          );
                                          t(s.name, u);
                                        },
                                        children: "×",
                                      }),
                                    ],
                                  },
                                  a,
                                ),
                              ),
                            }),
                            f.jsxs("select", {
                              value: "",
                              onChange: (a) => {
                                const u = a.target.value;
                                if (!u) return;
                                const c = e[s.name] || [];
                                c.includes(u) || t(s.name, [...c, u]);
                              },
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "Select technologies",
                                }),
                                s.suggestions.map((a) =>
                                  f.jsx("option", { value: a, children: a }, a),
                                ),
                              ],
                            }),
                          ],
                        })
                      : s.type === "textarea"
                        ? f.jsx("textarea", {
                            value: e[s.name],
                            onChange: (a) => t(s.name, a.target.value),
                            placeholder: s.placeholder,
                            rows: "3",
                            required: s.required,
                          })
                        : f.jsxs(f.Fragment, {
                            children: [
                              f.jsx("input", {
                                list: `${s.name}-options`,
                                value: e[s.name],
                                onChange: (a) => t(s.name, a.target.value),
                                placeholder: s.placeholder,
                                required: s.required,
                              }),
                              s.suggestions
                                ? f.jsx("datalist", {
                                    id: `${s.name}-options`,
                                    children: s.suggestions.map((a) =>
                                      f.jsx("option", { value: a }, a),
                                    ),
                                  })
                                : null,
                            ],
                          }),
                  s.suggestions
                    ? f.jsxs("small", {
                        className: "home-field-hint",
                        children: [
                          "Suggestions: ",
                          s.suggestions.slice(0, 5).join(", "),
                        ],
                      })
                    : null,
                ],
              },
              s.name,
            ),
          ),
        ],
      }),
      l ? f.jsx("p", { className: "home-error", children: l }) : null,
      f.jsx("button", {
        className: "home-primary-button",
        type: "submit",
        disabled: r,
        children: r ? "Preparing interview..." : "Start tailored interview",
      }),
    ],
  });
}
const l0 = "/assets/interview-avator-Bm8FVJuL.jpg";
function i0({ question: e }) {
  return f.jsxs(f.Fragment, {
    children: [
      f.jsxs("div", {
        className: "home-box-head",
        children: [
          f.jsx("div", {
            children: f.jsx("label", { children: "Question screen" }),
          }),
          f.jsx("span", { className: "home-badge", children: "Live" }),
        ],
      }),
      f.jsxs("div", {
        className: "home-question-card",
        children: [
          f.jsx("img", {
            src: l0,
            alt: "Interview Avatar",
            className: "question-image",
          }),
          f.jsx("div", {
            className: "question-overlay",
            children: f.jsx("p", {
              children: e || "Your first question will appear here.",
            }),
          }),
        ],
      }),
    ],
  });
}
const o0 = [
  ["Accuracy", "accuracy"],
  ["Confidence", "confidence"],
  ["Vocabulary", "vocabulary"],
  ["English", "english"],
  ["Overall", "overall"],
];
function op({ scores: e }) {
  return f.jsx("div", {
    className: "home-score-grid",
    children: o0.map(([t, n]) =>
      f.jsxs(
        "div",
        {
          className: "home-score-chip",
          children: [
            f.jsx("span", { children: t }),
            f.jsxs("strong", {
              children: [Number((e == null ? void 0 : e[n]) || 0), "/10"],
            }),
          ],
        },
        t,
      ),
    ),
  });
}
function sp({
  summaryText: e,
  focusText: t,
  followUpQuestion: n,
  followUpLabel: r = "Next question suggestion",
  compact: l = !1,
  improvedAnswer: i,
}) {
  const o = i || e;
  return f.jsxs("div", {
    className: "home-summary-card",
    children: [
      f.jsx("h4", {
        children: l ? "Live recap" : i ? "Improved answer" : "Summary",
      }),
      f.jsx("p", { children: o || "AI rewritten answer will appear here." }),
      t
        ? f.jsxs("p", {
            className: "home-summary-focus",
            children: ["Focus: ", t],
          })
        : null,
      !l && n
        ? f.jsxs("p", {
            className: "home-summary-focus",
            children: [r, ": ", n],
          })
        : null,
    ],
  });
}
function s0({ value: e, isListening: t }) {
  return f.jsxs("div", {
    className: "home-answer-display",
    children: [
      t &&
        f.jsx("div", {
          className: "live-indicator",
          children: "🎤 Listening...",
        }),
      e || "Start speaking... your answer will appear here.",
    ],
  });
}
function a0({
  isListening: e,
  speechSupported: t,
  autoSubmitSilence: n,
  onToggleAutoSubmit: r,
  autoSpeakReply: l,
  onToggleAutoSpeak: i,
  onToggleListening: o,
  onReplayFeedback: s,
  onSendAnswer: a,
  loadingReview: u,
  finishingInterview: c,
  onFinishInterview: d,
  voiceHint: g,
  speechError: S,
  hasFeedback: y,
}) {
  const w = e ? "Stop listening" : "Start listening";
  return f.jsxs("div", {
    className: "home-voice-options",
    children: [
      f.jsxs("div", {
        className: "home-voice-row",
        children: [
          f.jsxs("label", {
            className: "home-toggle",
            children: [
              f.jsx("input", { type: "checkbox", checked: n, onChange: r }),
              "Auto-submit on silence",
            ],
          }),
          f.jsxs("label", {
            className: "home-toggle",
            children: [
              f.jsx("input", { type: "checkbox", checked: l, onChange: i }),
              "Auto-speak feedback",
            ],
          }),
        ],
      }),
      f.jsxs("div", {
        className: "home-voice-row",
        children: [
          f.jsx("button", {
            type: "button",
            className: "home-voice-button",
            onClick: o,
            disabled: !t || u || c,
            children: w,
          }),
          f.jsx("button", {
            type: "button",
            className: "home-secondary-button",
            onClick: s,
            disabled: !y || u || c,
            children: "Replay feedback",
          }),
          f.jsx("button", {
            type: "button",
            className: "home-secondary-button",
            onClick: a,
            disabled: u || c,
            children: "Submit answer",
          }),
          f.jsx("button", {
            type: "button",
            className: "home-secondary-button",
            onClick: d,
            disabled: u || c,
            children: c ? "Ending interview..." : "End interview",
          }),
        ],
      }),
      g ? f.jsx("p", { className: "home-support-note", children: g }) : null,
      S ? f.jsx("p", { className: "home-support-note", children: S }) : null,
      t
        ? null
        : f.jsx("p", {
            className: "home-support-note",
            children: "Speech recognition is not supported in this browser.",
          }),
      y
        ? f.jsx("p", {
            className: "home-support-note",
            children:
              "You can end the interview anytime to view the result screen.",
          })
        : null,
    ],
  });
}
function u0({
  setup: e,
  currentQuestion: t,
  reviewData: n,
  answerText: r,
  onAnswerChange: l,
  onReplayFeedback: i,
  onSendAnswer: o,
  onToggleListening: s,
  onFinishInterview: a,
  isListening: u,
  speechSupported: c,
  autoSubmitSilence: d,
  onToggleAutoSubmit: g,
  autoSpeakReply: S,
  onToggleAutoSpeak: y,
  loadingReview: w,
  finishingInterview: v,
  speechError: p,
  voiceHint: h,
  error: m,
  timeLimitLabel: k,
  timeRemainingLabel: N,
}) {
  const P = (n == null ? void 0 : n.scores) || wa,
    j = (n == null ? void 0 : n.summaryText) || "",
    _ = (n == null ? void 0 : n.improvedAnswer) || "",
    D = (n == null ? void 0 : n.nextQuestion) || "",
    L = (n == null ? void 0 : n.statusText) || "",
    H = !!(j || _ || D);
  return f.jsxs("div", {
    className: "home-interview-grid",
    children: [
      f.jsxs("div", {
        className: "home-interview-stack home-interview-stack-left",
        children: [
          f.jsx("section", {
            className: "home-box home-panel home-question-panel",
            children: f.jsx(i0, { question: t, setup: e }),
          }),
          f.jsxs("section", {
            className: "home-box home-panel home-improved-panel",
            children: [
              f.jsx("div", {
                className: "home-box-head",
                children: f.jsx("div", {
                  children: f.jsx("label", {
                    children: "Improved answer screen",
                  }),
                }),
              }),
              f.jsx(sp, {
                summaryText: j,
                focusText: L,
                followUpQuestion: D,
                improvedAnswer: _,
              }),
            ],
          }),
        ],
      }),
      f.jsxs("div", {
        className: "home-interview-stack home-interview-stack-right",
        children: [
          f.jsxs("section", {
            className: "home-box home-panel home-answer-panel",
            children: [
              f.jsx("div", {
                className: "home-box-head",
                children: f.jsx("div", {
                  children: f.jsx("label", { children: "Answer screen" }),
                }),
              }),
              f.jsx(s0, { value: r, onChange: l }),
              f.jsx(a0, {
                isListening: u,
                speechSupported: c,
                autoSubmitSilence: d,
                onToggleAutoSubmit: g,
                autoSpeakReply: S,
                onToggleAutoSpeak: y,
                onToggleListening: s,
                onReplayFeedback: i,
                onSendAnswer: o,
                loadingReview: w,
                finishingInterview: v,
                onFinishInterview: a,
                voiceHint: h,
                speechError: p,
                hasFeedback: H,
              }),
              m ? f.jsx("p", { className: "home-error", children: m }) : null,
            ],
          }),
          f.jsxs("section", {
            className: "home-box home-panel home-live-score-panel",
            children: [
              f.jsxs("div", {
                className: "home-box-head",
                children: [
                  f.jsx("div", {
                    children: f.jsx("label", { children: "Live scores" }),
                  }),
                  f.jsx("span", { className: "home-badge", children: "Live" }),
                ],
              }),
              f.jsx(op, { scores: P }),
            ],
          }),
        ],
      }),
    ],
  });
}
function c0({ analysisPoints: e, scores: t, summaryText: n, statusText: r }) {
  const l = Number((t == null ? void 0 : t.overall) || 0);
  return f.jsxs("div", {
    className: "home-analysis-card home-result-card",
    children: [
      f.jsxs("div", {
        className: "home-result-topline",
        children: [
          f.jsxs("div", {
            children: [
              f.jsx("h4", { children: "Result snapshot" }),
              f.jsx("p", {
                children:
                  r || "AI analysis of the current answer appears here.",
              }),
            ],
          }),
          f.jsxs("div", {
            className: "home-result-score",
            children: [
              f.jsxs("strong", { children: [l, "/10"] }),
              f.jsx("span", { children: "Overall" }),
            ],
          }),
        ],
      }),
      n
        ? f.jsx("p", { className: "home-result-summary-text", children: n })
        : null,
      e.length > 0
        ? f.jsx("ul", {
            children: e.map((i) => f.jsx("li", { children: i }, i)),
          })
        : f.jsx("p", {
            className: "home-placeholder",
            children: "Your feedback will appear here after you answer.",
          }),
    ],
  });
}
function f0({
  setup: e,
  history: t,
  scores: n,
  analysisPoints: r,
  summaryText: l,
  focusText: i,
  followUpQuestion: o,
  finalSummary: s,
  strengths: a = [],
  improvements: u = [],
  nextSteps: c = [],
  readinessLabel: d,
  closingMessage: g,
  onRestart: S,
}) {
  const y = Sa(e.track),
    w = Jy(e);
  return f.jsxs("div", {
    className: "home-result-layout",
    children: [
      f.jsxs("section", {
        className: "home-box home-result-main",
        children: [
          f.jsxs("div", {
            className: "home-box-head",
            children: [
              f.jsxs("div", {
                children: [
                  f.jsx("label", { children: "Interview result" }),
                  f.jsxs("p", {
                    children: [
                      y,
                      " completed in ",
                      e.durationMinutes || "3",
                      " minutes.",
                    ],
                  }),
                ],
              }),
              f.jsx("span", { className: "home-badge", children: "Result" }),
            ],
          }),
          f.jsx(op, { scores: n }),
          f.jsx(c0, { analysisPoints: r }),
          f.jsx(sp, {
            summaryText: s || l,
            focusText: g || i,
            followUpQuestion: d || o,
            followUpLabel: "Readiness",
          }),
          f.jsxs("div", {
            className: "home-result-lists",
            children: [
              f.jsxs("div", {
                className: "home-result-list",
                children: [
                  f.jsx("h4", { children: "Strengths" }),
                  a.length > 0
                    ? f.jsx("ul", {
                        children: a.map((v) => f.jsx("li", { children: v }, v)),
                      })
                    : f.jsx("p", {
                        className: "home-placeholder",
                        children: "No strengths were returned.",
                      }),
                ],
              }),
              f.jsxs("div", {
                className: "home-result-list",
                children: [
                  f.jsx("h4", { children: "Improvements" }),
                  u.length > 0
                    ? f.jsx("ul", {
                        children: u.map((v) => f.jsx("li", { children: v }, v)),
                      })
                    : f.jsx("p", {
                        className: "home-placeholder",
                        children: "No improvements were returned.",
                      }),
                ],
              }),
              f.jsxs("div", {
                className: "home-result-list",
                children: [
                  f.jsx("h4", { children: "Next steps" }),
                  c.length > 0
                    ? f.jsx("ul", {
                        children: c.map((v) => f.jsx("li", { children: v }, v)),
                      })
                    : f.jsx("p", {
                        className: "home-placeholder",
                        children: "No next steps were returned.",
                      }),
                ],
              }),
            ],
          }),
          f.jsxs("div", {
            className: "home-result-history",
            children: [
              f.jsx("h4", { children: "Interview history" }),
              t.length > 0
                ? t.map((v, p) =>
                    f.jsxs(
                      "article",
                      {
                        className: "home-history-item",
                        children: [
                          f.jsxs("p", {
                            children: [
                              f.jsxs("strong", { children: ["Q", p + 1, ":"] }),
                              " ",
                              v.question,
                              v.attemptNumber
                                ? ` (Attempt ${v.attemptNumber})`
                                : "",
                            ],
                          }),
                          f.jsxs("p", {
                            children: [
                              f.jsx("strong", { children: "A:" }),
                              " ",
                              v.answer,
                            ],
                          }),
                          v.rate !== void 0 || v.result !== void 0
                            ? f.jsxs("p", {
                                className: "home-summary-focus",
                                children: [
                                  "Score: ",
                                  Number(v.rate ?? v.result ?? 0),
                                  "/",
                                  Number(v.total || 10),
                                ],
                              })
                            : null,
                          v.improvedQuestion
                            ? f.jsxs("p", {
                                className: "home-summary-focus",
                                children: [
                                  "Improved question: ",
                                  v.improvedQuestion,
                                ],
                              })
                            : null,
                          v.improvedAnswer
                            ? f.jsxs("p", {
                                className: "home-summary-focus",
                                children: [
                                  "Improved answer: ",
                                  v.improvedAnswer,
                                ],
                              })
                            : null,
                          v.summary
                            ? f.jsxs("p", {
                                className: "home-summary-focus",
                                children: ["AI note: ", v.summary],
                              })
                            : null,
                        ],
                      },
                      `${v.question}-${p}`,
                    ),
                  )
                : f.jsx("p", {
                    className: "home-placeholder",
                    children: "No answers were recorded.",
                  }),
            ],
          }),
          f.jsx("button", {
            type: "button",
            className: "home-primary-button",
            onClick: S,
            children: "Start another interview",
          }),
        ],
      }),
      f.jsxs("aside", {
        className: "home-box home-result-side",
        children: [
          f.jsxs("div", {
            className: "home-box-head",
            children: [
              f.jsxs("div", {
                children: [
                  f.jsx("label", { children: "Profile recap" }),
                  f.jsx("p", {
                    children: "The setup that shaped this interview.",
                  }),
                ],
              }),
              f.jsx("span", { className: "home-badge", children: "Profile" }),
            ],
          }),
          f.jsxs("div", {
            className: "home-result-profile",
            children: [
              f.jsxs("p", {
                children: [f.jsx("strong", { children: "Track:" }), " ", y],
              }),
              w.map((v) => f.jsx("p", { children: v }, v)),
              f.jsxs("p", {
                children: [
                  f.jsx("strong", { children: "Interview level:" }),
                  " ",
                  e.interviewLevel || "Not set",
                ],
              }),
              e.projects
                ? f.jsxs("p", {
                    children: [
                      f.jsx("strong", { children: "Projects:" }),
                      " ",
                      e.projects,
                    ],
                  })
                : null,
              e.techStack
                ? f.jsxs("p", {
                    children: [
                      f.jsx("strong", { children: "Tech stack:" }),
                      " ",
                      e.techStack,
                    ],
                  })
                : null,
              e.experience
                ? f.jsxs("p", {
                    children: [
                      f.jsx("strong", { children: "Experience:" }),
                      " ",
                      e.experience,
                    ],
                  })
                : null,
              e.previousInternships
                ? f.jsxs("p", {
                    children: [
                      f.jsx("strong", { children: "Previous internships:" }),
                      " ",
                      e.previousInternships,
                    ],
                  })
                : null,
              e.notes
                ? f.jsxs("p", {
                    children: [
                      f.jsx("strong", { children: "Notes:" }),
                      " ",
                      e.notes,
                    ],
                  })
                : null,
            ],
          }),
        ],
      }),
    ],
  });
}
function d0() {
  var l, i, o, s, a, u, c, d, g, S, y, w, v;
  const { user: e, logout: t } = Oi(),
    n = Ni(),
    r = Zy();
  return e
    ? f.jsxs("div", {
        className: `home-page ${r.interviewStarted && !r.interviewFinished ? "home-live-mode" : ""}`,
        children: [
          f.jsx(e0, {
            onLogout: () => {
              (t(), n("/auth"));
            },
          }),
          r.interviewStarted || r.interviewFinished
            ? f.jsx(n0, {
                setup: r.setup,
                timeRemainingLabel: r.timeRemainingLabel,
                totalTimeLabel: r.totalTimeLabel,
                sessionState: r.sessionState,
              })
            : null,
          r.interviewStarted
            ? r.interviewFinished
              ? f.jsx(f0, {
                  setup:
                    ((l = r.resultData) == null ? void 0 : l.setup) || r.setup,
                  history:
                    ((i = r.resultData) == null ? void 0 : i.history) ||
                    r.history,
                  scores:
                    ((o = r.resultData) == null ? void 0 : o.scores) ||
                    r.scores,
                  analysisPoints:
                    ((s = r.resultData) == null ? void 0 : s.analysisPoints) ||
                    r.analysisPoints,
                  summaryText:
                    ((a = r.resultData) == null ? void 0 : a.finalSummary) ||
                    r.summaryText,
                  focusText:
                    ((u = r.resultData) == null ? void 0 : u.closingMessage) ||
                    r.focusText,
                  followUpQuestion:
                    ((c = r.resultData) == null ? void 0 : c.readinessLabel) ||
                    r.followUpQuestion,
                  finalSummary:
                    (d = r.resultData) == null ? void 0 : d.finalSummary,
                  strengths:
                    ((g = r.resultData) == null ? void 0 : g.strengths) || [],
                  improvements:
                    ((S = r.resultData) == null ? void 0 : S.improvements) ||
                    [],
                  nextSteps:
                    ((y = r.resultData) == null ? void 0 : y.nextSteps) || [],
                  readinessLabel:
                    (w = r.resultData) == null ? void 0 : w.readinessLabel,
                  closingMessage:
                    (v = r.resultData) == null ? void 0 : v.closingMessage,
                  onRestart: r.restartInterview,
                })
              : f.jsx(u0, {
                  setup: r.setup,
                  currentQuestion: r.currentQuestion,
                  reviewData: r.reviewData,
                  answerText: r.answerText,
                  onAnswerChange: r.setAnswerText,
                  onReplayFeedback: r.replayFeedback,
                  onSendAnswer: r.sendAnswer,
                  onToggleListening: r.toggleListening,
                  onFinishInterview: r.finishInterview,
                  isListening: r.isListening,
                  speechSupported: r.speechSupported,
                  autoSubmitSilence: r.autoSubmitSilence,
                  onToggleAutoSubmit: r.setAutoSubmitSilence,
                  autoSpeakReply: r.autoSpeakReply,
                  onToggleAutoSpeak: r.setAutoSpeakReply,
                  loadingReview: r.loadingReview,
                  finishingInterview: r.finishingInterview,
                  speechError: r.speechError,
                  voiceHint: r.voiceHint,
                  error: r.error,
                  timeLimitLabel: r.totalTimeLabel,
                  timeRemainingLabel: r.timeRemainingLabel,
                })
            : f.jsx("div", {
                className: "home-setup-shell",
                children: f.jsx(r0, {
                  setup: r.setup,
                  onChange: r.updateSetupField,
                  onTrackChange: r.updateTrack,
                  onSubmit: r.startInterview,
                  startingInterview: r.startingInterview,
                  setupError: r.setupError,
                }),
              }),
        ],
      })
    : f.jsx("p", {
        className: "home-loading",
        children: "Loading user info...",
      });
}
const p0 = ({ children: e }) => {
    const { user: t, loading: n } = Oi();
    return n
      ? f.jsx("div", { className: "app-loading", children: "Loading..." })
      : t
        ? f.jsx(ha, { to: "/home", replace: !0 })
        : e;
  },
  h0 = ({ children: e }) => {
    const { user: t, loading: n } = Oi();
    return n
      ? f.jsx("div", { className: "app-loading", children: "Loading..." })
      : t
        ? e
        : f.jsx(ha, { to: "/auth", replace: !0 });
  };
function m0() {
  return f.jsxs(Mg, {
    children: [
      f.jsx(ar, { path: "/", element: f.jsx(Iy, {}) }),
      f.jsx(ar, {
        path: "/auth",
        element: f.jsx(p0, { children: f.jsx(Uy, {}) }),
      }),
      f.jsx(ar, {
        path: "/home",
        element: f.jsx(h0, { children: f.jsx(d0, {}) }),
      }),
      f.jsx(ar, { path: "*", element: f.jsx(ha, { to: "/", replace: !0 }) }),
    ],
  });
}
ho.createRoot(document.getElementById("root")).render(
  f.jsx(xc.StrictMode, {
    children: f.jsx(qg, {
      children: f.jsx(Oy, { children: f.jsx(Dy, { children: f.jsx(m0, {}) }) }),
    }),
  }),
);
