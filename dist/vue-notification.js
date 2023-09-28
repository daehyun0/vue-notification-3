import w, { openBlock as a, createBlock as m, TransitionGroup as x, withCtx as g, renderSlot as v, createElementBlock as p, normalizeStyle as E, resolveDynamicComponent as S, Fragment as O, renderList as k, normalizeClass as A, createElementVNode as D, createCommentVNode as I } from "vue";
const f = new w({ name: "vue-notification" }), N = {
  x: ["left", "center", "right"],
  y: ["top", "bottom"]
}, B = ((t) => () => t++)(0), H = (t) => typeof t != "string" ? [] : t.split(/\s+/gi).filter((e) => e), R = (t) => {
  typeof t == "string" && (t = H(t));
  let e = null, i = null;
  return t.forEach((o) => {
    N.y.indexOf(o) !== -1 && (i = o), N.x.indexOf(o) !== -1 && (e = o);
  }), { x: e, y: i };
};
function V(t, e, i) {
  let o, n = e;
  this.pause = function() {
    clearTimeout(i.timer), n -= Date.now() - o;
  }, this.resume = function() {
    o = Date.now(), clearTimeout(i.timer), i.timer = setTimeout(t, n);
  }, this.resume();
}
const y = {
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
}, $ = (t, e) => {
  const i = t.__vccOpts || t;
  for (const [o, n] of e)
    i[o] = n;
  return i;
}, G = {
  name: "VelocityGroup",
  methods: {
    enter(t, e) {
      this.$emit("enter", { el: t, complete: e });
    },
    leave(t, e) {
      this.$emit("leave", { el: t, complete: e });
    },
    afterLeave() {
      this.$emit("afterLeave");
    }
  }
};
function M(t, e, i, o, n, r) {
  return a(), m(x, {
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
const W = /* @__PURE__ */ $(G, [["render", M]]), Y = {
  name: "CssGroup",
  props: ["name"]
};
function j(t, e, i, o, n, r) {
  return a(), m(x, { name: i.name }, {
    default: g(() => [
      v(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["name"]);
}
const z = /* @__PURE__ */ $(Y, [["render", j]]), h = "[-+]?[0-9]*.?[0-9]+", b = [
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
  for (var e = 0; e < b.length; e++) {
    let i = b[e];
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
      default: () => y.position
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
        return y.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      default: y.cssAnimation
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
    f.$on("add", this.addItem), f.$on("close", this.closeItem);
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
      const { x: t, y: e } = R(this.position), i = this.actualWidth.value, o = this.actualWidth.type;
      let n = {
        width: i + o,
        [e]: "0px"
      };
      return t === "center" ? n.left = `calc(50% - ${i / 2}${o})` : n[t] = "0px", n;
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
      const e = typeof t.duration == "number" ? t.duration : this.duration, i = typeof t.speed == "number" ? t.speed : this.speed, o = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : this.ignoreDuplicates;
      let { title: n, text: r, type: s, data: l, id: C } = t;
      const c = {
        id: C || B(),
        title: n,
        text: r,
        type: s,
        state: d.IDLE,
        speed: i,
        length: e + 2 * i,
        data: l
      };
      e >= 0 && (this.timerControl = new V(() => this.destroy(c), c.length, c));
      let L = this.reverse ? !this.botToTop : this.botToTop, u = -1;
      const _ = this.active.some((T) => T.title === t.title && T.text === t.text);
      (!o || !_) && (L ? (this.list.push(c), this.active.length > this.max && (u = 0)) : (this.list.unshift(c), this.active.length > this.max && (u = this.active.length - 1)), u !== -1 && this.destroy(this.active[u]));
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
    enter({ el: t, complete: e }) {
      const i = this.getAnimation("enter", t);
      this.velocity(t, i, {
        duration: this.speed,
        complete: e
      });
    },
    leave({ el: t, complete: e }) {
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
function Z(t, e, i, o, n, r) {
  return a(), p("div", {
    class: "vue-notification-group",
    style: E(t.styles)
  }, [
    (a(), m(S(t.componentName), {
      name: t.animationName,
      onEnter: t.enter,
      onLeave: t.leave,
      onAfterLeave: t.clean
    }, {
      default: g(() => [
        (a(!0), p(O, null, k(t.active, (s) => (a(), p("div", {
          class: "vue-notification-wrapper",
          style: E(t.notifyWrapperStyle(s)),
          key: s.id,
          "data-id": s.id,
          onMouseenter: e[0] || (e[0] = (...l) => t.pauseTimeout && t.pauseTimeout(...l)),
          onMouseleave: e[1] || (e[1] = (...l) => t.resumeTimeout && t.resumeTimeout(...l))
        }, [
          v(t.$slots, "body", {
            class: A([t.classes, s.type]),
            item: s,
            close: () => t.destroy(s)
          }, () => [
            D("div", {
              class: A(t.notifyClass(s)),
              onClick: (l) => t.destroyIfNecessary(s)
            }, [
              s.title ? (a(), p("div", {
                key: 0,
                class: "notification-title",
                innerHTML: s.title
              }, null, 8, U)) : I("", !0),
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
const tt = /* @__PURE__ */ $(J, [["render", Z]]), et = {
  install(t, e = {}) {
    if (this.installed)
      return;
    this.installed = !0, this.params = e, t.component(e.componentName || "notifications", tt);
    const i = (n) => {
      typeof n == "string" && (n = { title: "", text: n }), typeof n == "object" && f.$emit("add", n);
    };
    i.close = function(n) {
      f.$emit("close", n);
    };
    const o = e.name || "notify";
    t.prototype["$" + o] = i, t[o] = i;
  }
};
export {
  et as default
};
