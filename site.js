"use strict";
/* Скрипти сайту (бургер-меню, spotlight/ripple на кнопках, scroll reveal) — як в index.html */
(function () {
  const burger = document.querySelector(".burger-btn");
  const nav = document.querySelector(".main-nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("active");
      document.body.classList.toggle("nav-open");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        document.body.classList.remove("nav-open");
      });
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("active") && !nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("active");
        document.body.classList.remove("nav-open");
      }
    });
  }
})();

(function () {
  var SEL = ".btn-hero,.btn-all-news,.btn-event";
  document.addEventListener("pointermove", function (e) {
    var el = e.target.closest && e.target.closest(SEL);
    if (!el) return;
    var r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (e.clientX - r.left) + "px");
    el.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });
  document.addEventListener("pointerdown", function (e) {
    var b = e.target.closest && e.target.closest(SEL);
    if (!b || b.disabled) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2.2;
    var s = document.createElement("span");
    s.className = "btn-ripple";
    s.style.cssText = "width:" + d + "px;height:" + d + "px;left:" + (e.clientX - r.left - d / 2) + "px;top:" + (e.clientY - r.top - d / 2) + "px";
    b.appendChild(s);
    setTimeout(function () { s.remove(); }, 700);
  });
})();

(function () {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("revealed"); }); return; }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add("revealed");
      el.addEventListener("transitionend", function onEnd(e) {
        if (e.propertyName === "transform") {
          el.style.transform = "";
          el.style.transition = "";
          el.removeEventListener("transitionend", onEnd);
        }
      });
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach(function (el) { observer.observe(el); });
})();
