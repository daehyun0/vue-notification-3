(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".vue-notification-group{display:block;position:fixed;z-index:5000}.vue-notification-wrapper{display:block;overflow:hidden;width:100%;margin:0;padding:0}.notification-title{font-weight:600}.vue-notification-template{display:block;box-sizing:border-box;background:white;text-align:left}.vue-notification{display:block;box-sizing:border-box;text-align:left;font-size:12px;padding:10px;margin:0 5px 5px;color:#fff;background:#44A4FC;border-left:5px solid #187FE7}.vue-notification.warn{background:#ffb648;border-left-color:#f48a06}.vue-notification.error{background:#E54D42;border-left-color:#b82e24}.vue-notification.success{background:#68CD86;border-left-color:#42a85f}.vn-fade-enter-active,.vn-fade-leave-active,.vn-fade-move{transition:all .5s}.vn-fade-enter,.vn-fade-leave-to{opacity:0}")),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
import { openBlock as a, createBlock as y, TransitionGroup as N, withCtx as g, renderSlot as v, createElementBlock as p, normalizeStyle as A, resolveDynamicComponent as w, Fragment as O, renderList as S, normalizeClass as E, createElementVNode as D, createCommentVNode as k } from "vue";
function I(t) {
  return { all: t = t || /* @__PURE__ */ new Map(), on: function(e, i) {
    var n = t.get(e);
    n ? n.push(i) : t.set(e, [i]);
  }, off: function(e, i) {
    var n = t.get(e);
    n && (i ? n.splice(n.indexOf(i) >>> 0, 1) : t.set(e, []));
  }, emit: function(e, i) {
    var n = t.get(e);
    n && n.slice().map(function(o) {
      o(i);
    }), (n = t.get("*")) && n.slice().map(function(o) {
      o(e, i);
    });
  } };
}
const f = I(), b = {
  x: ["left", "center", "right"],
  y: ["top", "bottom"]
}, B = ((t) => () => t++)(0), H = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter((e) => e), R = (t) => {
  typeof t == "string" && (t = H(t));
  let e = null, i = null;
  return t.forEach((n) => {
    b.y.indexOf(n) !== -1 && (i = n), b.x.indexOf(n) !== -1 && (e = n);
  }), { x: e, y: i };
};
function G(t, e, i) {
  let n, o = e;
  this.pause = function() {
    clearTimeout(i.timer), o -= Date.now() - n;
  }, this.resume = function() {
    n = Date.now(), clearTimeout(i.timer), i.timer = setTimeout(t, o);
  }, this.resume();
}
const m = {
  position: ["top", "right"],
  cssAnimation: "vn-fade",
  velocityAnimation: {
    enter: (t) => {
      var e = t.clientHeight;
      return {
        height: [e, 0],
        opacity: [1, 0]
      };
    },
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
}, T = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [n, o] of e)
    i[n] = o;
  return i;
}, M = {
  name: "VelocityGroup",
  methods: {
    enter(t, e) {
      this.$emit("enter", t, e);
    },
    leave(t, e) {
      this.$emit("leave", t, e);
    },
    afterLeave() {
      this.$emit("afterLeave");
    }
  }
};
function V(t, e, i, n, o, r) {
  return a(), y(N, {
    css: !1,
    onEnter: r.enter,
    onLeave: r.leave,
    onAfterLeave: r.afterLeave
  }, {
    default: g(() => [
      v(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["onEnter", "onLeave", "onAfterLeave"]);
}
const W = /* @__PURE__ */ T(M, [["render", V]]), Y = {
  inheritAttrs: !1,
  name: "CssGroup",
  props: ["name"]
};
function j(t, e, i, n, o, r) {
  return a(), y(N, { name: i.name }, {
    default: g(() => [
      v(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["name"]);
}
const z = /* @__PURE__ */ T(Y, [["render", j]]), h = "[-+]?[0-9]*.?[0-9]+", x = [
  {
    name: "px",
    regexp: new RegExp(`^${h}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${h}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${h}$`)
  }
];
var F = (t) => {
  if (t === "auto")
    return {
      type: t,
      value: 0
    };
  for (var e = 0; e < x.length; e++) {
    let i = x[e];
    if (i.regexp.test(t))
      return {
        type: i.name,
        value: parseFloat(t)
      };
  }
  return {
    type: "",
    value: t
  };
};
const P = (t) => {
  switch (typeof t) {
    case "number":
      return { type: "px", value: t };
    case "string":
      return F(t);
    default:
      return { type: "", value: t };
  }
};
const d = {
  IDLE: 0,
  DESTROYED: 2
}, q = {
  name: "Notifications",
  components: {
    VelocityGroup: W,
    CssGroup: z
  },
  props: {
    group: {
      type: String,
      default: ""
    },
    width: {
      type: [Number, String],
      default: 300
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    position: {
      type: [String, Array],
      default: () => m.position
    },
    classes: {
      type: String,
      default: "vue-notification"
    },
    animationType: {
      type: String,
      default: "css",
      validator(t) {
        return t === "css" || t === "velocity";
      }
    },
    animation: {
      type: Object,
      default() {
        return m.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      default: m.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
    /* Todo */
    cooldown: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 3e3
    },
    delay: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1 / 0
    },
    ignoreDuplicates: {
      type: Boolean,
      default: !1
    },
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    pauseOnHover: {
      type: Boolean,
      default: !1
    }
  },
  data() {
    return {
      list: [],
      velocity: et.params.velocity,
      timerControl: ""
    };
  },
  mounted() {
    f.on("add", this.addItem), f.on("close", this.closeItem);
  },
  computed: {
    actualWidth() {
      return P(this.width);
    },
    /**
      * isVelocityAnimation
      */
    isVA() {
      return this.animationType === "velocity";
    },
    componentName() {
      return this.isVA ? "VelocityGroup" : "CssGroup";
    },
    styles() {
      const { x: t, y: e } = R(this.position), i = this.actualWidth.value, n = this.actualWidth.type;
      let o = {
        width: i + n,
        [e]: "0px"
      };
      return t === "center" ? o.left = `calc(50% - ${i / 2}${n})` : o[t] = "0px", o;
    },
    active() {
      return this.list.filter((t) => t.state !== d.DESTROYED);
    },
    botToTop() {
      return this.styles.hasOwnProperty("bottom");
    }
  },
  methods: {
    destroyIfNecessary(t) {
      this.$emit("click", t), this.closeOnClick && this.destroy(t);
    },
    pauseTimeout() {
      this.pauseOnHover && this.timerControl.pause();
    },
    resumeTimeout() {
      this.pauseOnHover && this.timerControl.resume();
    },
    addItem(t) {
      if (t.group = t.group || "", t.data = t.data || {}, this.group !== t.group)
        return;
      if (t.clean || t.clear) {
        this.destroyAll();
        return;
      }
      const e = typeof t.duration == "number" ? t.duration : this.duration, i = typeof t.speed == "number" ? t.speed : this.speed, n = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : this.ignoreDuplicates;
      let { title: o, text: r, type: s, data: l, id: C } = t;
      const c = {
        id: C || B(),
        title: o,
        text: r,
        type: s,
        state: d.IDLE,
        speed: i,
        length: e + 2 * i,
        data: l
      };
      e >= 0 && (this.timerControl = new G(() => this.destroy(c), c.length, c));
      let L = this.reverse ? !this.botToTop : this.botToTop, u = -1;
      const _ = this.active.some(($) => $.title === t.title && $.text === t.text);
      (!n || !_) && (L ? (this.list.push(c), this.active.length > this.max && (u = 0)) : (this.list.unshift(c), this.active.length > this.max && (u = this.active.length - 1)), u !== -1 && this.destroy(this.active[u]));
    },
    closeItem(t) {
      this.destroyById(t);
    },
    notifyClass(t) {
      return [
        "vue-notification-template",
        this.classes,
        t.type
      ];
    },
    notifyWrapperStyle(t) {
      return this.isVA ? null : { transition: `all ${t.speed}ms` };
    },
    destroy(t) {
      clearTimeout(t.timer), t.state = d.DESTROYED, this.isVA || this.clean(), this.$emit("destroy", t);
    },
    destroyById(t) {
      const e = this.list.find((i) => i.id === t);
      e && this.destroy(e);
    },
    destroyAll() {
      this.active.forEach(this.destroy);
    },
    getAnimation(t, e) {
      const i = this.animation[t];
      return typeof i == "function" ? i.call(this, e) : i;
    },
    enter(t, e) {
      const i = this.getAnimation("enter", t);
      this.velocity(t, i, {
        duration: this.speed,
        complete: e
      });
    },
    leave(t, e) {
      let i = this.getAnimation("leave", t);
      this.velocity(t, i, {
        duration: this.speed,
        complete: e
      });
    },
    clean() {
      this.list = this.list.filter((t) => t.state !== d.DESTROYED);
    }
  }
}, J = q, K = ["data-id"], Q = ["onClick"], U = ["innerHTML"], X = ["innerHTML"];
function Z(t, e, i, n, o, r) {
  return a(), p("div", {
    class: "vue-notification-group",
    style: A(t.styles)
  }, [
    (a(), y(w(t.componentName), {
      name: t.animationName,
      onEnter: t.enter,
      onLeave: t.leave,
      onAfterLeave: t.clean
    }, {
      default: g(() => [
        (a(!0), p(O, null, S(t.active, (s) => (a(), p("div", {
          class: "vue-notification-wrapper",
          style: A(t.notifyWrapperStyle(s)),
          key: s.id,
          "data-id": s.id,
          onMouseenter: e[0] || (e[0] = (...l) => t.pauseTimeout && t.pauseTimeout(...l)),
          onMouseleave: e[1] || (e[1] = (...l) => t.resumeTimeout && t.resumeTimeout(...l))
        }, [
          v(t.$slots, "body", {
            class: E([t.classes, s.type]),
            item: s,
            close: () => t.destroy(s)
          }, () => [
            D("div", {
              class: E(t.notifyClass(s)),
              onClick: (l) => t.destroyIfNecessary(s)
            }, [
              s.title ? (a(), p("div", {
                key: 0,
                class: "notification-title",
                innerHTML: s.title
              }, null, 8, U)) : k("", !0),
              D("div", {
                class: "notification-content",
                innerHTML: s.text
              }, null, 8, X)
            ], 10, Q)
          ])
        ], 44, K))), 128))
      ]),
      _: 3
    }, 40, ["name", "onEnter", "onLeave", "onAfterLeave"]))
  ], 4);
}
const tt = /* @__PURE__ */ T(J, [["render", Z]]), et = {
  install(t, e = {}) {
    if (this.installed)
      return;
    this.installed = !0, this.params = e, t.component(e.componentName || "notifications", tt);
    const i = (o) => {
      typeof o == "string" && (o = { title: "", text: o }), typeof o == "object" && f.emit("add", o);
    };
    i.close = function(o) {
      f.emit("close", o);
    };
    const n = e.name || "notify";
    t.config.globalProperties["$" + n] = i, t[n] = i;
  }
};
export {
  et as default
};
