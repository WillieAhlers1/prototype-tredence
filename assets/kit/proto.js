/* prototype-tredence scene engine (from prototype-frontier, unchanged).  Don't edit per prototype.
   Scenes:  <section class="scene" id="..." data-title="..."> ... <aside class="notes">what the presenter says</aside></section>
   Beats:   data-beat="1..n" reveals an element on the nth "next"; add data-auto="ms" to play it automatically
            that long after the previous beat, counted from when the previous beat's text has finished streaming.
            Optional data-hide="n" hides an element again at beat n.
   Effects: data-type (types character by character; data-type="words" streams words like a Copilot answer),
            data-count (counts up a number), .work > li[data-beat] (spinner, then a check after data-run ms, default 1100).
   Motion:  automatic.  Content that moves because something appeared or hid glides to its new place, hidden
            elements fade out, scenes crossfade, .cpa-pane slides in while the conversation glides over, and typed
            text fades in word by word in space reserved for it, so nothing jumps.  Anything after typed text in the
            same beat (sources, buttons) appears when the text finishes.  data-morph="name" on an element that hides
            and on one that appears in the same beat makes the new one glide from the old one's place.  Off in
            ?check mode and when the OS asks for reduced motion.  Timings are the --t-* tokens in proto-style.js.
   Steps:   process steps that are visible (queued) from the start and change state on beats:
            data-run-at="n" (spinner, then done after data-run ms), data-wait-at="n" (waiting for the user),
            data-done-at="n" (done, usually the beat after an approval click).  data-auto on a step times its
            run-at or wait-at beat, exactly like data-auto on a data-beat element.
   Clicks:  data-go="next" | "prev" | "<scene id>" on any element.  The next one to click gets a soft cue ring.
            When the demo waits and nothing is cued, a "Next: <scene>" (or "Continue") pill fades in, bottom right.
   Icons:   <i class="ic" data-icon="mail"></i>.  Avatars: <span class="avatar" data-name="Megan Bowen"></span>.
   Charts:  <figure class="pbi" data-chart="line|area|column|bar|waterfall" data-x="Jul,Aug" data-series="Actual:1,2;Plan:2,3"
            data-fmt="$0.0M"> is a Power BI visual in the Fluent 2 defaults.  It grows in when it shows (after any typed
            text before it in its beat), hovering it shows Power BI's tooltip, and <div class="pbi-tip" data-at="Aug"
            data-beat="n"> inside it pins that tooltip on a beat.  Options: references/engine.md.
   Clicks:  Back and Next buttons, bottom right, on every scene (no keys needed).
   Keys:    → Space PageDown next · ← PageUp previous scene · R replay scene · Home/End · 1–9 jump ·
            N notes · H click cues · F fullscreen · ? help.  URL #<scene id> opens a scene; ?check = test mode. */
(function () {
  "use strict";
  const W = 1920, H = 1080;
  const stage = document.querySelector(".stage");
  if (!stage) return;
  const scenes = Array.from(stage.querySelectorAll(":scope > .scene"));
  const check = /[?&]check\b/.test(location.search);
  const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motion = !check && !reduced;
  let idx = 0, beat = 0, booted = false, fade = null, hashOk = true;
  const timers = new Set(), typers = new Set(), state = new WeakMap();
  const later = (fn, ms) => { const t = setTimeout(() => { timers.delete(t); fn(); }, ms); timers.add(t); };

  // ---------- icons, avatars, gradient ----------
  const NS = "http://www.w3.org/2000/svg";
  const defs = document.createElementNS(NS, "svg");
  defs.setAttribute("width", "0"); defs.setAttribute("height", "0"); defs.style.position = "absolute";
  defs.innerHTML = '<defs><linearGradient id="proto-grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#38b9b6"/>' +
    '<stop offset=".45" stop-color="#1d90b2"/><stop offset="1" stop-color="#8661c5"/></linearGradient></defs>';
  document.body.appendChild(defs);

  function icon(name, cls) {
    const paths = (window.FLUENT_ICONS || {})[name];
    if (!paths) { console.warn("prototype: unknown icon", name); return null; }
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 20 20"); s.setAttribute("aria-hidden", "true");
    s.setAttribute("class", cls || "ic"); s.innerHTML = paths;
    return s;
  }
  document.querySelectorAll("i[data-icon]").forEach(el => {
    const s = icon(el.dataset.icon, el.className || "ic");
    if (s) { s.setAttribute("data-icon", el.dataset.icon); el.replaceWith(s); }
  });
  document.querySelectorAll(".avatar[data-name]").forEach(el => {
    const name = el.dataset.name.trim();
    if (!el.textContent.trim()) {
      const parts = name.replace(/[^\p{L}\s'-]/gu, "").split(/\s+/).filter(Boolean);
      const ini = (parts[0] || "?")[0] + (parts.length > 1 ? parts[parts.length - 1][0] : "");
      el.insertBefore(document.createTextNode(ini.toUpperCase()), el.firstChild);
    }
    if (!/\bav-\d\b/.test(el.className)) {
      let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
      el.classList.add("av-" + (h % 10));
    }
    el.setAttribute("title", name);
  });

  // ---------- concept label (always on) ----------
  const label = document.body.dataset.concept || "Concept demo · Fictitious data";
  const badge = document.createElement("div");
  badge.className = "concept"; badge.setAttribute("role", "note");
  const bi = icon("info"); if (bi) badge.appendChild(bi);
  badge.appendChild(document.createTextNode(label));
  stage.appendChild(badge);

  // ---------- scaling ----------
  function fit() {
    const s = Math.min(innerWidth / W, innerHeight / H);
    stage.style.transformOrigin = "center center";
    stage.style.transform = `translate(-50%,-50%) scale(${s})`;
  }
  addEventListener("resize", fit); fit();

  // ---------- presenter chrome ----------
  const dots = document.createElement("nav"); dots.className = "proto-dots";
  scenes.forEach((s, i) => {
    const d = document.createElement("i"); d.title = (i + 1) + ". " + (s.dataset.title || s.id);
    d.addEventListener("click", () => go(i)); dots.appendChild(d);
  });
  const notes = document.createElement("div"); notes.className = "proto-notes";
  const help = document.createElement("div"); help.className = "proto-help";
  help.innerHTML = [["→", "next"], ["←", "previous scene"], ["R", "replay scene"], ["1–9", "jump to scene"],
    ["N", "presenter notes"], ["H", "click cues on/off"], ["F", "full screen"], ["?", "this help"]]
    .map(([k, v]) => `<div><kbd>${k}</kbd>${v}</div>`).join("");
  document.body.append(dots, notes, help);
  document.body.classList.add("cues");
  let dotTimer;
  addEventListener("mousemove", e => {
    if (e.clientY > innerHeight - 90) { dots.classList.add("show"); clearTimeout(dotTimer); dotTimer = setTimeout(() => dots.classList.remove("show"), 1600); }
  });

  // ---------- "next" pill ----------
  // When the demo is waiting for the presenter and nothing in the scene is cued, say how to go on.  It names the
  // next scene at the end of a scene, says "Continue" mid-scene, never shows on the last stop, and H hides it with the cues.
  const pill = document.createElement("button");
  pill.type = "button"; pill.className = "proto-next"; pill.tabIndex = -1;
  const pillText = document.createElement("span"); pill.appendChild(pillText);
  const pa = icon("arrow_right"); if (pa) pill.appendChild(pa);
  pill.addEventListener("click", e => { e.stopPropagation(); pill.blur(); next(); });
  stage.appendChild(pill);

  // ---------- back and next buttons ----------
  // Always on (except in ?check), so anyone can click through the demo without knowing the keys.  Next does what →
  // does: the next beat, or the next scene at the end of one.  Back goes to the previous scene, shown finished.
  const nav = document.createElement("div"); nav.className = "proto-nav";
  const navBtn = (ic, label, fn) => {
    const b = document.createElement("button");
    b.type = "button"; b.tabIndex = -1; b.title = label; b.setAttribute("aria-label", label);
    const i = icon(ic); if (i) b.appendChild(i);
    b.addEventListener("click", e => { e.stopPropagation(); b.blur(); fn(); });
    nav.appendChild(b); return b;
  };
  const navBack = navBtn("arrow_left", "Back", () => prev());
  const navNext = navBtn("arrow_right", "Next", () => next());
  if (!check) stage.appendChild(nav);
  function navState() {
    navBack.disabled = idx === 0;
    navNext.disabled = idx === scenes.length - 1 && beat >= beatsOf(scenes[idx]);
  }

  let pillTimer = 0;
  function armPill() {
    clearTimeout(pillTimer); pill.classList.remove("show");
    navState();
    if (check) return;
    let quiet = 0;
    const tick = () => {
      const s = scenes[idx];
      navState();
      if (timers.size || typers.size) quiet = 0;
      else if (s.querySelector(".cue")) return;
      else if ((quiet += 250) >= 1250) {
        const end = beat >= beatsOf(s), n = scenes[idx + 1];
        if (end && !n) return;
        pillText.textContent = end ? "Next: " + (n.dataset.title || n.id) : "Continue";
        return pill.classList.add("show");
      }
      pillTimer = setTimeout(tick, 250);
    };
    pillTimer = setTimeout(tick, 250);
  }

  // ---------- beats ----------
  function beatsOf(scene) {
    const set = new Set();
    scene.querySelectorAll("[data-beat]").forEach(el => set.add(+el.dataset.beat));
    scene.querySelectorAll(STEP).forEach(el => ["runAt", "waitAt", "doneAt"].forEach(k => { if (el.dataset[k]) set.add(+el.dataset[k]); }));
    return Math.max(0, ...set);
  }
  const STEP = "[data-run-at],[data-wait-at],[data-done-at]";
  const autoAt = (scene, b) => scene.querySelectorAll(`[data-beat="${b}"][data-auto],[data-run-at="${b}"][data-auto],[data-wait-at="${b}"][data-auto]`);
  function remember(el) {
    if (!state.has(el)) state.set(el, { html: el.innerHTML, text: el.textContent });
    return state.get(el);
  }
  scenes.forEach(s => s.querySelectorAll("[data-type],[data-count]").forEach(remember));

  function resetScene(scene) {
    scene.getAnimations({ subtree: true }).forEach(a => { if (a.constructor === Animation) a.cancel(); });
    scene.querySelectorAll(".proto-ghost").forEach(g => g.remove());
    scene.querySelectorAll("[data-beat]").forEach(el => el.classList.remove("in"));
    scene.querySelectorAll(".gone,.clicked,.typing,.counting,.m-late,.m-hold").forEach(el =>
      el.classList.remove("gone", "clicked", "typing", "counting", "m-late", "m-hold"));
    scene.querySelectorAll(".work li").forEach(li => li.classList.remove("run", "done"));
    scene.querySelectorAll(STEP).forEach(el => el.classList.remove("run", "wait", "done"));
    scene.querySelectorAll("[data-type],[data-count]").forEach(el => { el.innerHTML = remember(el).html; });
    scene.querySelectorAll("[data-type]").forEach(el => { if (el.closest("[data-beat]")) blankText(el); });
    scene.querySelectorAll(".pbi-plot.hov").forEach(p => p.classList.remove("hov"));
  }
  // Typed text: every word (or character) becomes a transparent span, so the finished layout is reserved up front
  // and nothing reflows while it streams.  Child elements with text (citations) show with their first unit.
  function blankText(el) {
    const words = el.dataset.type === "words", units = [];
    (function wrap(node) {
      Array.from(node.childNodes).forEach(n => {
        if (n.nodeType === 3) {
          const parts = words ? n.nodeValue.match(/\S+\s*|\s+/g) : Array.from(n.nodeValue);
          if (parts) n.replaceWith(...parts.map(t => {
            if (words && !t.trim()) return t;
            const sp = document.createElement("span"); sp.className = "tw"; sp.textContent = t; units.push(sp); return sp;
          }));
        } else if (n.nodeType === 1) {
          const k = units.length;
          if (n.textContent.trim()) { n.classList.add("tw-box"); wrap(n); if (units[k]) (units[k].boxes = units[k].boxes || []).push(n); }
          else { n.classList.add("tw"); units.push(n); }
        }
      });
    })(el);
    el._units = units;
  }
  // Returns how long the text takes, so the next automatic beat can wait for it.
  function type(el, fast) {
    const u = el._units;
    if (!u) return 0;
    const show = k => { u[k].classList.add("shown"); (u[k].boxes || []).forEach(b => b.classList.add("shown")); };
    const end = () => { el.classList.remove("typing"); el.querySelectorAll(".cur").forEach(c => c.classList.remove("cur")); el._units = null; };
    if (fast || !u.length) { u.forEach((_, k) => show(k)); end(); return 0; }
    const per = 1000 / (+el.dataset.speed || (el.dataset.type === "words" ? 18 : 55)), t0 = performance.now(), job = {};
    let n = 0;
    el.classList.add("typing");
    typers.add(job);
    (function step(now) {
      const want = Math.min(u.length, Math.floor((now - t0) / per) + 1);
      if (want > n) { if (n) u[n - 1].classList.remove("cur"); while (n < want) show(n++); u[n - 1].classList.add("cur"); }
      if (n < u.length) job.raf = requestAnimationFrame(step); else { typers.delete(job); end(); }
    })(t0);
    return u.length * per;
  }
  function count(el, fast) {
    const txt = remember(el).text, m = txt.match(/-?[\d,]*\.?\d+/);
    if (!m) return;
    const end = parseFloat(m[0].replace(/,/g, "")), dec = (m[0].split(".")[1] || "").length;
    const fmt = v => v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    const set = v => el.textContent = txt.replace(m[0], fmt(v));
    if (fast) { el.classList.remove("counting"); set(end); return; }
    const t0 = performance.now(), dur = +el.dataset.count || 900, job = {};
    el.classList.add("counting");
    typers.add(job);
    (function step(now) {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      set(end * e);
      if (p < 1) job.raf = requestAnimationFrame(step); else { typers.delete(job); el.classList.remove("counting"); }
    })(t0);
  }

  // ---------- motion ----------
  // FLIP: measure every visible block before and after a change, then play each one from where it was to where it
  // is.  Positions come from the offset chain, which ignores transforms, so running animations don't skew them.
  const root = getComputedStyle(document.documentElement);
  const tok = (name, d) => parseFloat(root.getPropertyValue(name)) || d;
  const T = { enter: tok("--t-enter", 340), glide: tok("--t-glide", 520), exit: tok("--t-exit", 180), scene: tok("--t-scene", 400),
    late: tok("--t-late", 100), ease: root.getPropertyValue("--ease-out").trim() || "cubic-bezier(.1,.9,.2,1)",
    glideEase: root.getPropertyValue("--ease-glide").trim() || "cubic-bezier(.25,.1,.1,1)" };
  const inlineEl = new WeakMap();
  function measure(scene) {
    const out = new Map(), memo = new Map();
    const pos = el => {
      if (!el || el === scene || !scene.contains(el)) return [0, 0];
      let p = memo.get(el);
      if (!p) {
        const op = el.offsetParent, base = pos(op), edge = op && op !== scene && scene.contains(op) ? [op.clientLeft, op.clientTop] : [0, 0];
        p = [base[0] + edge[0] + el.offsetLeft, base[1] + edge[1] + el.offsetTop];
        memo.set(el, p);
      }
      return p;
    };
    const w = document.createTreeWalker(scene, NodeFilter.SHOW_ELEMENT, { acceptNode(n) {
      if (!(n instanceof HTMLElement) || n.matches(".proto-ghost,.tw,.notes")) return NodeFilter.FILTER_REJECT;
      if (!n.offsetParent) return getComputedStyle(n).display === "contents" ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_REJECT;
      let inl = inlineEl.get(n);
      if (inl === undefined) { inl = getComputedStyle(n).display.startsWith("inline"); inlineEl.set(n, inl); }
      return inl ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    } });
    for (let n; (n = w.nextNode());) { const p = pos(n); out.set(n, { x: p[0], y: p[1], w: n.offsetWidth, h: n.offsetHeight }); }
    return out;
  }
  // Elements hidden at this beat: copy them first, so the copy can fade out where the original was.
  const STRIP = ["id", "data-go", "data-cue", "data-beat", "data-hide", "data-type", "data-count", "data-auto", "data-run-at",
    "data-wait-at", "data-done-at", "data-morph"];
  function leavers(scene, b) {
    const els = Array.from(scene.querySelectorAll(`[data-hide="${b}"]`)).filter(el => el.offsetParent && !el.classList.contains("gone"));
    return els.filter(el => !els.some(o => o !== el && o.contains(el))).map(el => {
      const g = el.cloneNode(true), src = [el, ...el.querySelectorAll("*")], dup = [g, ...g.querySelectorAll("*")], morphs = [];
      src.forEach((x, k) => { if (x.dataset && x.dataset.morph) morphs.push([x, dup[k]]); });
      g.querySelectorAll("[data-beat]:not(.in),.gone").forEach(x => x.remove());
      [g, ...g.querySelectorAll("*")].forEach(x => { STRIP.forEach(a => x.removeAttribute(a)); x.classList.remove("cue", "typing", "cur"); });
      g.classList.add("proto-ghost"); g.setAttribute("aria-hidden", "true"); g.inert = true;
      return { el, g, morphs, rect: el.getBoundingClientRect(), w: el.offsetWidth, h: el.offsetHeight };
    });
  }
  function dropGhosts(list, sources) {
    list.forEach(({ el, g, morphs, rect, w, h }) => {
      if (sources.has(el) || !el.parentNode) return;
      morphs.forEach(([x, c]) => { if (sources.has(x)) c.style.visibility = "hidden"; });
      Object.assign(g.style, { position: "absolute", left: "0px", top: "0px", margin: "0", width: w + "px", height: h + "px", pointerEvents: "none" });
      el.parentNode.insertBefore(g, el);
      const r = g.getBoundingClientRect(), k = r.width / (g.offsetWidth || 1) || 1;
      g.style.left = (rect.left - r.left) / k + "px";
      g.style.top = (rect.top - r.top) / k + "px";
      g.animate([{ opacity: 1 }, { opacity: 0 }], { duration: T.exit, easing: "linear", fill: "forwards" }).onfinish = () => g.remove();
    });
  }
  // A new element starts with the same offset as its nearest sibling that was already there, so a new chat message
  // rises with the conversation instead of appearing on top of it.
  function sibling(el, before, after, pa) {
    for (const dir of ["previousElementSibling", "nextElementSibling"])
      for (let s = el[dir]; s; s = s[dir]) {
        const b = before.get(s), a = after.get(s);
        if (b && a) return [b.x - a.x - pa[0], b.y - a.y - pa[1]];
      }
    return [0, 0];
  }
  // The morph target stays fully visible while it glides; the rest of what appears with it fades in around it.
  function holdPath(scene, t, before) {
    const path = [];
    for (let e = t; e && e !== scene && !before.has(e); e = e.parentElement) path.push(e);
    path.forEach(e => { if (e.matches("[data-beat].in")) e.classList.add("m-hold"); });
    path.slice(1).forEach(e => Array.from(e.children).forEach(c => {
      if (!path.includes(c)) c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: T.enter, delay: T.late, easing: T.ease, fill: "backwards" });
    }));
  }
  function glide(scene, before, after, ghosts) {
    const off = new Map(), abs = new Map(), roots = [], sources = new Set(), from = new Map();
    before.forEach((r, el) => { const m = el.dataset.morph; if (m && !after.has(el)) from.set(m, [el, r]); });
    let moved = false;
    after.forEach((a, el) => {
      let p = el.parentElement;
      while (p && p !== scene && !after.has(p)) p = p.parentElement;
      const pa = abs.get(p) || [0, 0], b = before.get(el), m = !b && el.dataset.morph && from.get(el.dataset.morph);
      let o = [0, 0];
      if (b) { o = [b.x - a.x - pa[0], b.y - a.y - pa[1]]; if (Math.abs(o[0]) >= 1 || Math.abs(o[1]) >= 1) moved = true; }
      else if (m) {
        const s = m[1];
        o = [s.x + s.w / 2 - a.x - a.w / 2 - pa[0], s.y + s.h / 2 - a.y - a.h / 2 - pa[1]];
        sources.add(m[0]); holdPath(scene, el, before); moved = true;
      } else if (!p || p === scene || before.has(p)) { o = sibling(el, before, after, pa); roots.push(el); }
      off.set(el, o); abs.set(el, [pa[0] + o[0], pa[1] + o[1]]);
    });
    const wait = ghosts.length ? Math.round(T.exit / 3) : 0, late = moved || ghosts.length;
    off.forEach((o, el) => {
      if (Math.abs(o[0]) < .5 && Math.abs(o[1]) < .5) return;
      el.animate([{ translate: `${o[0]}px ${o[1]}px` }, { translate: "0px 0px" }],
        { duration: T.glide, delay: wait, easing: T.glideEase, fill: "backwards", composite: "add" });
    });
    roots.forEach(el => {
      if (el.classList.contains("m-hold")) return;
      if (late) el.classList.add("m-late");
      if (!el.matches("[data-beat].in"))
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: T.enter, delay: late ? T.late : 0, easing: T.ease, fill: "backwards" });
    });
    dropGhosts(ghosts, sources);
  }
  // Run a DOM change with motion: measure, change, measure, animate the difference.
  function change(scene, fn, b) {
    if (!motion || scene !== scenes[idx]) return fn();
    const before = measure(scene), ghosts = b == null ? [] : leavers(scene, b);
    const r = fn();
    glide(scene, before, measure(scene), ghosts);
    return r;
  }

  // ---------- Power BI visuals ----------
  // A chart is drawn at its real width the first time it shows, with Power BI's Fluent 2 defaults, and grows in with
  // its beat the way Power BI animates a visual.  Hovering it shows Power BI's tooltip.  Syntax: references/engine.md.
  const CHART = "figure.pbi[data-chart]";
  const PAL = ["#118DFF", "#12239E", "#E66C37", "#6B007B", "#E044A7", "#744EC2", "#D9B300", "#D64550", "#197278", "#1AAB40"];
  // Waterfall: blue up, orange down, navy total, all from the Fluent 2 palette, set the way a report author would in the
  // format pane.  The theme's own sentiment colours (soft green #9FD89F, rose #EEACB2) read as red and green, which
  // colour-blind viewers can't separate and which clash with a blue total.  data-colors="increase,decrease,total" overrides.
  const WF = { up: ["Increase", "#118DFF"], down: ["Decrease", "#E66C37"], total: ["Total", "#12239E"] };
  const pen = document.createElement("canvas").getContext("2d");
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const list = s => (s || "").split(",").map(t => t.trim()).filter(Boolean);
  const r1 = v => Math.round(v * 10) / 10;
  const decs = v => ((+v.toFixed(10)).toString().split(".")[1] || "").length;
  let clips = 0;
  // data-fmt="$0.0M": prefix, decimals and suffix.  Values are in display units already (4.2 with $0.0M is $4.2M).
  function fmtOf(f) {
    const m = (f || "0").match(/^([^\d#.-]*)[#,0]*(?:\.([#0]+))?(.*)$/) || ["", "", "", ""];
    const out = (v, d) => {
      d = d == null ? out.dec : d;
      return (v < 0 ? "-" : "") + m[1] + Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }) + m[3];
    };
    out.dec = (m[2] || "").length;
    return out;
  }
  function ticks(lo, hi) {
    if (hi <= lo) hi = lo + 1;
    const raw = (hi - lo) / 4, mag = Math.pow(10, Math.floor(Math.log10(raw))), r = raw / mag;
    const step = (r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10) * mag, out = [];
    for (let v = Math.floor(lo / step + 1e-9) * step; v <= Math.ceil(hi / step - 1e-9) * step + step / 2; v += step) out.push(+v.toFixed(10));
    return out;
  }
  function parse(fig) {
    const d = fig.dataset, kind = d.chart, colors = list(d.colors), dash = list(d.dash), asLine = list(d.line);
    let cats = (d.x || "").split(",").map(s => s.trim());
    const series = (d.series || "").split(";").filter(s => s.trim()).map((s, k) => {
      const c = s.indexOf(":"), name = c >= 0 ? s.slice(0, c).trim() : "Value";
      const vals = (c >= 0 ? s.slice(c + 1) : s).split(",").map(v => v.trim() === "" ? null : +v);
      return { name, vals, color: colors[k] || PAL[k % PAL.length], dash: dash.includes(name),
        line: kind === "line" || kind === "area" || asLine.includes(name) };
    });
    let bars = null, vals;
    if (kind === "waterfall") {
      // "=Label" is a total bar at its absolute value; a final total is added unless data-total="none".
      const v = (series[0] || { vals: [] }).vals;
      let run = 0;
      bars = cats.map((c, i) => {
        const x = v[i] || 0;
        if (c[0] === "=") { run = x; return { cat: c.slice(1).trim(), a: 0, b: x, v: x, k: "total" }; }
        const a = run; run += x;
        return { cat: c, a, b: run, v: x, k: x < 0 ? "down" : "up" };
      });
      if (d.total !== "none") bars.push({ cat: d.total || "Total", a: 0, b: run, v: run, k: "total" });
      cats = bars.map(b => b.cat);
      vals = bars.flatMap(b => [b.a, b.b]);
    } else vals = series.flatMap(s => s.vals.filter(v => v != null && !isNaN(v)));
    if (!vals.length) vals = [0, 1];
    let lo = Math.min(...vals), hi = Math.max(...vals);
    if (d.min !== "auto") { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
    if (d.min && d.min !== "auto") lo = +d.min;
    if (d.max) hi = +d.max;
    const wf = { up: [WF.up[0], colors[0] || WF.up[1]], down: [WF.down[0], colors[1] || WF.down[1]], total: [WF.total[0], colors[2] || WF.total[1]] };
    const legend = bars ? Object.keys(wf).filter(k => bars.some(b => b.k === k)).map(k => wf[k])
      : series.length > 1 ? series.map(s => [s.name, s.color]) : [];
    return { kind, cats, series, bars, wf, ticks: ticks(lo, hi), fmt: fmtOf(d.fmt), legend };
  }
  function draw(fig) {
    const plot = fig._plot, w = plot ? plot.clientWidth : 0;
    if (!w) return false;
    if (fig._w === w) return true;
    fig._w = w;
    const D = fig._d, d = fig.dataset, fmt = D.fmt, n = D.cats.length, labels = /\blabels\b/.test(d.style || "");
    const tk = D.ticks, lo = tk[0], hi = tk[tk.length - 1], tl = tk.map(v => fmt(v, decs(tk[1] - tk[0])));
    const base = lo > 0 ? lo : hi < 0 ? hi : 0, clip = "pf-clip-" + (++clips);
    pen.font = "12px " + getComputedStyle(fig).fontFamily;
    const tw = s => pen.measureText(s).width;
    // obs: what a pinned or hover tooltip should not cover (plotted data and axis labels), as [x0, y0, x1, y1].
    let H, ax = "", cx = "", body = "", late = "", g;
    const obs = [];
    if (D.kind === "bar") {
      // Horizontal bars: categories down the left, values along the bottom (or as labels at the bar ends).
      const bot = labels ? 0 : 22, bs = D.series, m = bs.length;
      H = +d.h || Math.max(96, n * (m > 1 ? 44 : 34)) + bot;
      const left = Math.min(w * .4, Math.ceil(Math.max(...D.cats.map(tw))) + 12);
      const right = labels ? Math.ceil(Math.max(0, ...bs.flatMap(s => s.vals.filter(v => v != null).map(v => tw(fmt(v)))))) + 10 : 14;
      const band = (H - bot) / n, gw = band * .5, bw = gw / (m + .1 * (m - 1));
      const Y = i => band * (i + .5), X = v => left + (v - lo) / (hi - lo || 1) * (w - left - right);
      obs.push([0, 0, left, H]); if (!labels) obs.push([0, H - bot, w, H]);
      if (!labels) tk.forEach((v, k) => ax += `<line class="gl" x1="${r1(X(v))}" x2="${r1(X(v))}" y1="0" y2="${H - bot}"/>` +
        `<text x="${r1(X(v))}" y="${H - 5}" text-anchor="middle">${esc(tl[k])}</text>`);
      D.cats.forEach((c, i) => {
        let t = c;
        while (t.length > 1 && tw(t) > left - 12) t = t.slice(0, -2) + "…";
        cx += `<text x="${left - 10}" y="${r1(Y(i))}" dy=".35em" text-anchor="end">${esc(t)}</text>`;
      });
      bs.forEach((s, j) => s.vals.forEach((v, i) => {
        if (v == null) return;
        const y = Y(i) - gw / 2 + j * bw * 1.1, x0 = X(Math.min(v, base)), x1 = X(Math.max(v, base));
        body += `<rect class="grow hz${v < base ? " dn" : ""}" data-i="${i}" x="${r1(x0)}" y="${r1(y)}" width="${r1(Math.max(x1 - x0, .5))}" height="${r1(bw)}" fill="${s.color}"/>`;
        obs.push([x0, y, x1, y + bw]);
        if (labels) { late += `<text class="dl" x="${r1(x1 + 6)}" y="${r1(y + bw / 2)}" dy=".35em">${esc(fmt(v))}</text>`; obs.push([x1, y, x1 + 6 + tw(fmt(v)), y + bw]); }
      }));
      g = { hit: (px, py) => py >= 0 && py < H - bot && px >= 0 ? Math.min(n - 1, Math.floor(py / band)) : -1,
        at: i => {
          const vs = bs.map(s => s.vals[i]).filter(v => v != null);
          return { xl: left, xr: X(Math.max(base, ...vs)) + 2, y: Y(i), dots: [], rows: bs.filter(s => s.vals[i] != null).map(s => [s.name, fmt(s.vals[i])]) };
        } };
    } else {
      const top = labels ? 22 : 8, bot = 22;
      H = +d.h || 220;
      const left = labels ? 0 : Math.ceil(Math.max(...tl.map(tw))) + 10, band = (w - left - 4) / n;
      const X = i => left + band * (i + .5), Y = v => top + (hi - v) / (hi - lo || 1) * (H - top - bot);
      obs.push([0, H - bot, w, H]); if (!labels) obs.push([0, 0, left, H]);
      if (!labels) tk.forEach((v, k) => ax += `<line class="gl" x1="${left}" x2="${w}" y1="${r1(Y(v))}" y2="${r1(Y(v))}"/>` +
        `<text x="${left - 10}" y="${r1(Y(v))}" dy=".35em" text-anchor="end">${esc(tl[k])}</text>`);
      const every = Math.max(1, Math.ceil((Math.max(...D.cats.map(tw)) + 12) / band));
      D.cats.forEach((c, i) => { if (i % every === 0) cx += `<text x="${r1(X(i))}" y="${H - 5}" text-anchor="middle">${esc(c)}</text>`; });
      const cols = D.series.filter(s => !s.line), lines = D.series.filter(s => s.line), m = cols.length;
      const gw = band * .5, bw = gw / (m + .1 * Math.max(0, m - 1));
      let rows, dots;
      if (D.bars) {
        D.bars.forEach((b, i) => {
          const y0 = Y(Math.max(b.a, b.b)), y1 = Y(Math.min(b.a, b.b)), x = X(i) - gw / 2;
          body += `<rect class="grow${b.k === "down" ? " dn" : ""}" data-i="${i}" x="${r1(x)}" y="${r1(y0)}" width="${r1(gw)}" height="${r1(Math.max(y1 - y0, .5))}" fill="${D.wf[b.k][1]}"/>`;
          obs.push([x, labels ? y0 - 20 : y0, x + gw, y1]);
          const nx = D.bars[i + 1];
          if (nx && (nx.k !== "total" || nx.b === b.b)) late += `<line class="cn" x1="${r1(x + gw)}" x2="${r1(X(i + 1) - gw / 2)}" y1="${r1(Y(b.b))}" y2="${r1(Y(b.b))}"/>`;
          if (labels) late += `<text class="dl" x="${r1(X(i))}" y="${r1(y0 - 6)}" text-anchor="middle">${esc(b.k === "total" ? fmt(b.b) : (b.v > 0 ? "+" : "") + fmt(b.v))}</text>`;
        });
        rows = i => { const b = D.bars[i]; return [[b.k === "total" ? "Total" : WF[b.k][0], b.k === "total" ? fmt(b.b) : (b.v > 0 ? "+" : "") + fmt(b.v)]]; };
        dots = () => [];
      } else {
        cols.forEach((s, j) => s.vals.forEach((v, i) => {
          if (v == null) return;
          const x = X(i) - gw / 2 + j * bw * 1.1, y0 = Y(Math.max(v, base)), y1 = Y(Math.min(v, base));
          body += `<rect class="grow${v < base ? " dn" : ""}" data-i="${i}" x="${r1(x)}" y="${r1(y0)}" width="${r1(bw)}" height="${r1(Math.max(y1 - y0, .5))}" fill="${s.color}"/>`;
          obs.push([x, labels && v >= base ? y0 - 20 : y0, x + bw, labels && v < base ? y1 + 20 : y1]);
          if (labels) late += `<text class="dl" x="${r1(x + bw / 2)}" y="${r1(v < base ? y1 + 16 : y0 - 6)}" text-anchor="middle">${esc(fmt(v))}</text>`;
        }));
        // Lines: smooth (monotone, so a curve never overshoots a point) unless data-style="straight"; empty values are gaps.
        const smooth = !/\bstraight\b/.test(d.style || ""), wipe = [];
        lines.forEach(s => {
          const segs = [[]];
          s.vals.forEach((v, i) => v == null ? segs.push([]) : segs[segs.length - 1].push([X(i), Y(v)]));
          segs.filter(p => p.length).forEach(p => {
            p.forEach((q, k) => {
              const r = p[k + 1] || q, steps = Math.max(1, Math.ceil(Math.hypot(r[0] - q[0], r[1] - q[1]) / 5));
              for (let u = 0; u <= steps; u++) { const x = q[0] + (r[0] - q[0]) * u / steps, y = q[1] + (r[1] - q[1]) * u / steps; obs.push([x - 3, y - (labels ? 24 : 3), x + 3, y + 3]); }
            });
            const path = curve(p, smooth);
            if (D.kind === "area") wipe.push(`<path class="ar" d="${path}L${r1(p[p.length - 1][0])},${r1(Y(base))}L${r1(p[0][0])},${r1(Y(base))}Z" fill="${s.color}"/>`);
            wipe.push(p.length > 1 ? `<path class="ln${s.dash ? " dash" : ""}" d="${path}" stroke="${s.color}"/>`
              : `<circle cx="${r1(p[0][0])}" cy="${r1(p[0][1])}" r="3" fill="${s.color}"/>`);
          });
          if (labels) s.vals.forEach((v, i) => { if (v != null) late += `<circle cx="${r1(X(i))}" cy="${r1(Y(v))}" r="4" fill="${s.color}"/>` +
            `<text class="dl" x="${r1(X(i))}" y="${r1(Y(v) - 10)}" text-anchor="middle">${esc(fmt(v))}</text>`; });
        });
        if (wipe.length) body += `<defs><clipPath id="${clip}"><rect class="wipe" x="0" y="-12" width="${w + 12}" height="${H + 24}" ` +
          `style="transform-box:fill-box;transform-origin:0 0"/></clipPath></defs><g clip-path="url(#${clip})">${wipe.join("")}</g>`;
        rows = i => D.series.filter(s => s.vals[i] != null).map(s => [s.name, fmt(s.vals[i])]);
        dots = i => lines.filter(s => s.vals[i] != null).map(s => [X(i), Y(s.vals[i]), s.color]);
      }
      g = { hit: (px, py) => px >= left && py >= 0 && py <= H ? Math.min(n - 1, Math.floor((px - left) / band)) : -1,
        at: i => {
          const ds = dots(i), vs = D.bars ? [D.bars[i].a, D.bars[i].b] : D.series.map(s => s.vals[i]).filter(v => v != null);
          return { xl: X(i) - (ds.length ? 0 : gw / 2), xr: X(i) + (ds.length ? 0 : gw / 2), y: Y(Math.max(base, ...vs)), dots: ds, rows: rows(i) };
        } };
    }
    let svg = plot.querySelector(":scope > svg");
    if (!svg) {
      svg = document.createElementNS(NS, "svg"); svg.setAttribute("role", "img");
      const t = fig.querySelector(".pbi-head > b"); if (t) svg.setAttribute("aria-label", t.textContent.trim());
      plot.prepend(svg);
    }
    svg.setAttribute("width", w); svg.setAttribute("height", H); svg.setAttribute("viewBox", `0 0 ${w} ${H}`);
    svg.innerHTML = `<g class="ax">${ax}</g><g class="cx">${cx}</g>${body}<g class="late">${late}</g>`;
    plot.style.height = H + "px";
    fig._g = g; fig._obs = obs; fig._h = H; fig._hover = -1;
    plot.querySelectorAll(":scope > .pbi-tip:not(.hov)").forEach(t => {
      const at = t.dataset.at, k = D.cats.indexOf(at);
      tipFill(fig, t, k >= 0 ? k : at != null && at !== "" && !isNaN(at) ? +at : n - 1);
    });
    return true;
  }
  function curve(p, smooth) {
    const pt = q => r1(q[0]) + "," + r1(q[1]);
    if (!smooth || p.length < 3) return "M" + p.map(pt).join("L");
    const n = p.length, s = [], t = [];
    for (let i = 0; i < n - 1; i++) s[i] = (p[i + 1][1] - p[i][1]) / (p[i + 1][0] - p[i][0]);
    t[0] = s[0]; t[n - 1] = s[n - 2];
    for (let i = 1; i < n - 1; i++) t[i] = s[i - 1] * s[i] <= 0 ? 0 : (Math.sign(s[i - 1]) + Math.sign(s[i])) * Math.min(Math.abs(s[i - 1]), Math.abs(s[i]), Math.abs(s[i - 1] + s[i]) / 4);
    let out = "M" + pt(p[0]);
    for (let i = 0; i < n - 1; i++) {
      const h = (p[i + 1][0] - p[i][0]) / 3;
      out += "C" + pt([p[i][0] + h, p[i][1] + t[i] * h]) + " " + pt([p[i + 1][0] - h, p[i + 1][1] - t[i + 1] * h]) + " " + pt(p[i + 1]);
    }
    return out;
  }
  // Power BI's tooltip: the category, then each series' value, beside the point.  Rows written inside a .pbi-tip
  // (<span>Gap</span><b>$0.3M</b>) are added at the end.  The box goes beside the point where it hides the least data.
  function tipFill(fig, tip, i) {
    i = Math.max(0, Math.min(fig._d.cats.length - 1, i));
    const t = fig._g && fig._g.at(i);
    if (!t) return;
    const xn = fig.dataset.xname, cat = fig._d.cats[i], rows = [...(xn ? [[xn, cat]] : []), ...t.rows, ...(tip._rows || [])];
    const fam = getComputedStyle(fig).fontFamily, m = (s, b) => { pen.font = (b ? "600 " : "") + "12px " + fam; return pen.measureText(s).width; };
    const bw = Math.ceil(Math.max(Math.max(0, ...rows.map(r => m(r[0]))) + 16 + Math.max(0, ...rows.map(r => m(r[1], 1))), xn ? 0 : m(cat, 1))) + 26;
    const [x, y] = spot(fig, t, bw, (rows.length + (xn ? 0 : 1)) * 20 + 12);
    tip.innerHTML = t.dots.map(([x, y, c]) => `<i class="dot" style="left:${r1(x)}px;top:${r1(y)}px;--c:${c}"></i>`).join("") +
      `<div class="box" style="left:${x}px;top:${y}px">` +
      (xn ? `<span>${esc(xn)}</span><b>${esc(cat)}</b>` : `<span class="hd">${esc(cat)}</span>`) +
      t.rows.map(([k, v]) => `<span>${esc(k)}</span><b>${esc(v)}</b>`).join("") + (tip._extra || "") + "</div>";
  }
  // Tries the box right and left of the point (stepping further out) at every height in the plot; scores what it
  // would cover (lines, bars, axis labels) first, then how far it sits from the point.  Right is slightly preferred.
  function spot(fig, t, bw, bh) {
    const W = fig._w, H = fig._h, obs = fig._obs || [];
    const cover = (x, y) => {
      let a = 0;
      for (const o of obs) {
        const ox = Math.min(x + bw + 4, o[2]) - Math.max(x - 4, o[0]), oy = Math.min(y + bh + 4, o[3]) - Math.max(y - 4, o[1]);
        if (ox > 0 && oy > 0) a += ox * oy;
      }
      return a;
    };
    let best = null;
    [1, -1].forEach(side => [0, 24, 56, 96].forEach(out => {
      const want = side > 0 ? t.xr + 14 + out : t.xl - 14 - bw - out, x = Math.max(0, Math.min(W - bw, want));
      for (let y = 0; y <= Math.max(0, H - bh); y += 4) {
        const far = Math.max(0, y + 8 - t.y, t.y - 8 - (y + bh)) + Math.abs(t.y - y - bh / 2) * .25 + out + Math.abs(x - want) * 2 + (side < 0 ? 6 : 0);
        const c = cover(x, y) * 4 + far;
        if (!best || c < best[0]) best = [c, x, y];
      }
    }));
    return [r1(best[1]), r1(best[2])];
  }
  // Returns how long the visual takes to grow in, so the next automatic beat (a tooltip, say) waits for it.
  function grow(fig, delay) {
    const svg = fig._plot.querySelector(":scope > svg");
    if (!svg) return 0;
    const ease = "cubic-bezier(.33,0,.2,1)", fade = [{ opacity: 0 }, { opacity: 1 }], wf = !!fig._d.bars;
    const A = (el, kf, dur, at) => el.animate(kf, { id: "pf-chart", duration: dur, delay: at, easing: ease, fill: "backwards" });
    svg.querySelectorAll(".ax,.cx").forEach(el => A(el, fade, 300, delay));
    let end = delay + 300;
    const wipe = svg.querySelector(".wipe");
    if (wipe) { A(wipe, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], 1100, delay + 120); end = delay + 1220; }
    const gap = wf ? 110 : Math.min(70, 600 / Math.max(1, fig._d.cats.length)), dur = wf ? 420 : 640;
    svg.querySelectorAll(".grow").forEach(b => {
      const at = delay + 120 + (+b.dataset.i) * gap;
      A(b, [{ transform: b.classList.contains("hz") ? "scaleX(0)" : "scaleY(0)" }, { transform: "none" }], dur, at);
      end = Math.max(end, at + dur);
    });
    const late = svg.querySelector(".late");
    if (late.childElementCount) { A(late, fade, 300, end - 120); end += 180; }
    later(() => {}, end);
    return end;
  }
  function drawAll(scene) { scene.querySelectorAll(CHART).forEach(draw); }
  document.querySelectorAll(CHART).forEach(fig => {
    const plot = document.createElement("div"), head = fig.querySelector(":scope > .pbi-head");
    plot.className = "pbi-plot";
    head ? head.after(plot) : fig.prepend(plot);
    fig._plot = plot; fig._d = parse(fig);
    fig.querySelectorAll(":scope > .pbi-tip").forEach(t => {
      t._extra = t.innerHTML;
      t._rows = [...t.querySelectorAll("span")].map((k, j) => [k.textContent, (t.querySelectorAll("b")[j] || {}).textContent || ""]);
      t.innerHTML = ""; plot.appendChild(t);
    });
    if (fig._d.legend.length) {
      const lg = document.createElement("div"); lg.className = "pbi-legend";
      lg.innerHTML = fig._d.legend.map(([t, c]) => `<span><i style="--c:${c}"></i>${esc(t)}</span>`).join("");
      plot.after(lg);
    }
    let hov = null;
    plot.addEventListener("mousemove", e => {
      if (!fig._g) return;
      const r = plot.getBoundingClientRect(), k = r.width / (plot.offsetWidth || 1) || 1;
      const i = fig._g.hit((e.clientX - r.left) / k, (e.clientY - r.top) / k);
      if (i < 0) return plot.classList.remove("hov");
      if (!hov || !hov.isConnected) { hov = document.createElement("div"); hov.className = "pbi-tip hov"; plot.appendChild(hov); }
      if (fig._hover !== i) { tipFill(fig, hov, i); fig._hover = i; }
      plot.classList.add("hov");
    });
    plot.addEventListener("mouseleave", () => plot.classList.remove("hov"));
  });
  document.querySelectorAll(".pbi").forEach(el => {
    const bar = document.createElement("div");
    bar.className = "pbi-icons"; bar.setAttribute("aria-hidden", "true");
    ["filter", "full_screen_maximize", "more_horizontal"].forEach(n => { const s = icon(n); if (s) bar.appendChild(s); });
    el.appendChild(bar);
  });

  function run(scene, el, fast) {
    el.classList.remove("wait", "done"); el.classList.add("run");
    const done = () => { el.classList.remove("run"); el.classList.add("done"); };
    fast ? done() : later(() => change(scene, done), +el.dataset.run || 1100);
  }
  // Whatever follows streaming text in the same beat (sources, actions) appears once the text has finished.
  function afterText(root, t, d) {
    for (let e = t; e && e !== root; e = e.parentElement)
      for (let s = e.nextElementSibling; s; s = s.nextElementSibling)
        if (!s.hasAttribute("data-beat"))
          s.animate([{ opacity: 0 }, { opacity: 1 }], { id: "pf-after", duration: T.enter, delay: d, easing: T.ease, fill: "backwards" });
  }
  function apply(scene, b, fast) {
    let busy = 0;
    // Only effects that belong to this beat: a typed line inside a later nested beat waits for that beat.
    const own = (el, sel) => (el.matches(sel) ? [el] : []).concat(Array.from(el.querySelectorAll(sel)).filter(x => x.closest("[data-beat]") === el));
    // Counters and charts that come after typed text in the same beat start when the text has finished.
    const after = (typed, x) => typed.reduce((m, [t, d]) => {
      const p = t.compareDocumentPosition(x);
      return p & 4 && !(p & 16) ? Math.max(m, d) : m;
    }, 0);
    if (b === 0) scene.querySelectorAll(CHART).forEach(f => { if (!f.closest("[data-beat]") && draw(f) && !fast) busy = Math.max(busy, grow(f, T.late)); });
    scene.querySelectorAll(`[data-beat="${b}"]`).forEach(el => {
      el.classList.add("in");
      const typed = [];
      own(el, "[data-type]").forEach(t => { const d = type(t, fast); typed.push([t, d]); busy = Math.max(busy, d); if (d) afterText(el, t, d); });
      own(el, "[data-count]").forEach(c => { const w = after(typed, c); if (w) { later(() => count(c), w); busy = Math.max(busy, w); } else count(c, fast); });
      // A visual in a pane that slides in starts growing once the pane is mostly in.
      own(el, CHART).forEach(f => { if (draw(f) && !fast) busy = Math.max(busy, grow(f, Math.max(after(typed, f), el.matches(".cpa-pane") ? T.glide / 2 : 0))); });
      if (el.matches(".work li")) run(scene, el, fast);
    });
    scene.querySelectorAll(`[data-run-at="${b}"]`).forEach(el => run(scene, el, fast));
    scene.querySelectorAll(`[data-wait-at="${b}"]`).forEach(el => { el.classList.remove("run", "done"); el.classList.add("wait"); });
    scene.querySelectorAll(`[data-done-at="${b}"]`).forEach(el => { el.classList.remove("run", "wait"); el.classList.add("done"); });
    scene.querySelectorAll(`[data-hide="${b}"]`).forEach(el => el.classList.add("gone"));
    drawAll(scene);
    return busy;
  }
  function reveal(scene, b, fast, pre) {
    const step = () => { if (pre) pre(); return apply(scene, b, fast); };
    const busy = fast ? step() : change(scene, step, b);
    beat = b;
    cue(scene);
    if (fast) return;
    const nxt = autoAt(scene, b + 1);
    if (nxt.length) later(() => reveal(scene, b + 1), busy + Math.max(...Array.from(nxt).map(e => +e.dataset.auto || 0)));
  }
  function clearTimers() {
    timers.forEach(clearTimeout); typers.forEach(j => cancelAnimationFrame(j.raf));
    timers.clear(); typers.clear();
  }
  function finishRunning(scene) {
    scene.querySelectorAll(".work li.run,.run[data-run-at]").forEach(li => { li.classList.remove("run"); li.classList.add("done"); });
    scene.querySelectorAll(".typing").forEach(el => type(el, true));
    scene.querySelectorAll(".counting").forEach(el => count(el, true));
    scene.getAnimations({ subtree: true }).forEach(a => { if (a.id === "pf-after" || a.id === "pf-chart") a.finish(); });
  }
  function cue(scene) {
    scene.querySelectorAll(".cue").forEach(e => e.classList.remove("cue"));
    const live = Array.from(scene.querySelectorAll("[data-go]")).filter(e => {
      const b = e.closest("[data-beat]");
      return (!b || b.classList.contains("in")) && !e.closest(".gone") && !e.classList.contains("clicked");
    });
    const target = live.find(e => e.hasAttribute("data-cue")) || (beat >= beatsOf(scene) ? live[live.length - 1] : null);
    if (target) target.classList.add("cue");
  }

  function go(i, opts) {
    opts = opts || {};
    i = Math.max(0, Math.min(scenes.length - 1, i));
    clearTimers();
    if (fade) fade.cancel();
    const old = scenes[idx];
    scenes.forEach(s => s.classList.remove("on", "leaving", "warming"));
    const s = scenes[i]; idx = i; beat = 0;
    s.classList.add("on");
    stage.classList.toggle("scene-frame-on", s.classList.contains("frame"));
    resetScene(s);
    drawAll(s);
    // Crossfade: the new scene fades in over the old one, which stays put until the fade ends.
    if (motion && booted) {
      if (old !== s) old.classList.add("leaving");
      const f = fade = s.animate([{ opacity: old === s ? .2 : 0 }, { opacity: 1 }], { duration: T.scene, easing: T.ease });
      f.onfinish = f.oncancel = () => { if (old !== scenes[idx]) old.classList.remove("leaving"); if (fade === f) fade = null; };
    }
    booted = true;
    if (opts.end) { stage.classList.add("instant"); for (let b = 1; b <= beatsOf(s); b++) reveal(s, b, true); requestAnimationFrame(() => stage.classList.remove("instant")); }
    else reveal(s, 0, check || reduced);
    if (check || reduced) for (let b = 1; b <= beatsOf(s) && autoAt(s, b).length; b++) reveal(s, b, true);
    Array.from(dots.children).forEach((d, j) => d.classList.toggle("on", j === i));
    notes.innerHTML = "<b>" + (i + 1) + " / " + scenes.length + " · " + (s.dataset.title || s.id) + "</b>" + ((s.querySelector(".notes") || {}).innerHTML || "");
    // Sandboxed previews (OneDrive, SharePoint, Teams) refuse URL changes; the address is a convenience, so skip it there.
    if (!check && hashOk) try { history.replaceState(null, "", "#" + s.id); } catch (e) { hashOk = false; }
    armPill();
  }
  function next() {
    const s = scenes[idx], max = beatsOf(s), fast = check || reduced, busy = timers.size || typers.size;
    clearTimers();
    if (beat < max) {
      reveal(s, beat + 1, fast, busy ? () => finishRunning(s) : null);
      if (fast) while (beat < max && autoAt(s, beat + 1).length) reveal(s, beat + 1, true);
      armPill();
    } else if (idx < scenes.length - 1) go(idx + 1);
  }
  function prev() { if (idx > 0) go(idx - 1, { end: true }); }

  // Warm-up.  The first time anything is painted is slow (glyphs, icons and shadows are prepared once), and shows as
  // a hitch in front of the audience.  While the opening scene is up, paint every other scene once at its start and
  // once at its end, almost transparent, then put it back.
  function warm(list) {
    const s = list.shift();
    if (!s) return;
    if (s === scenes[idx] || s.classList.contains("leaving")) return warm(list);
    resetScene(s);
    s.classList.add("warming");
    setTimeout(() => {
      if (s !== scenes[idx]) { for (let b = 1; b <= beatsOf(s); b++) apply(s, b, true); drawAll(s); }
      setTimeout(() => {
        s.classList.remove("warming");
        if (s !== scenes[idx]) resetScene(s);
        setTimeout(() => warm(list), 40);
      }, 140);
    }, 140);
  }

  addEventListener("keydown", e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (k === "ArrowRight" || k === " " || k === "PageDown" || k === "Enter") { e.preventDefault(); next(); }
    else if (k === "ArrowLeft" || k === "PageUp" || k === "Backspace") { e.preventDefault(); prev(); }
    else if (k === "Home") go(0);
    else if (k === "End") go(scenes.length - 1);
    else if (k === "r" || k === "R") go(idx);
    else if (k === "n" || k === "N") notes.classList.toggle("show");
    else if (k === "h" || k === "H") document.body.classList.toggle("cues");
    else if (k === "?") help.classList.toggle("show");
    else if (k === "f" || k === "F") { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}); }
    else if (/^[1-9]$/.test(k)) go(+k - 1);
  });
  stage.addEventListener("click", e => {
    const t = e.target.closest("[data-go]");
    if (!t || !stage.contains(t)) return;
    e.preventDefault();
    t.classList.add("clicked");
    const g = t.dataset.go;
    if (g === "next" || g === "") next();
    else if (g === "prev") prev();
    else { const j = scenes.findIndex(s => s.id === g); if (j >= 0) go(j); }
  });

  // Test API for check_prototype.py
  window.proto = {
    scenes: scenes.map(s => ({ id: s.id, title: s.dataset.title || s.id, beats: beatsOf(s) })),
    go: (i, end) => go(i, { end }), next, prev,
    state: () => ({ scene: idx, beat, max: beatsOf(scenes[idx]), busy: timers.size + typers.size > 0 }),
    check
  };
  if (check) stage.classList.add("instant");
  const start = scenes.findIndex(s => "#" + s.id === location.hash);
  go(start >= 0 ? start : 0);
  if (motion) (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(() => warm(scenes.slice()), 300));
})();
