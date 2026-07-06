/* ============================================================
   AVIRON — App Logic
   ============================================================ */
(function () {
  "use strict";

  const CFG = window.AVIRON_CONFIG || {};
  const I18N = window.AVIRON_I18N || {};
  const IMG_BASE = "assets/img/products/";

  const state = {
    lang: localStorage.getItem("aviron_lang") || "tr",
    filter: "all",
    products: [],
    activeProduct: null,
    activeImg: 0
  };

  /* -------- Product loading (default + admin overrides) -------- */
  // İleride /admin API'sini yazdığında burada fetch ile veriyi çekebilirsin.
  function loadProducts() {
    const base = (window.AVIRON_PRODUCTS || []).slice();
    try {
      const saved = JSON.parse(localStorage.getItem("aviron_products") || "null");
      if (Array.isArray(saved) && saved.length) return saved;
    } catch (e) { /* ignore */ }
    return base;
  }

  /* -------- i18n helpers -------- */
  function t(key) {
    const dict = I18N[state.lang] || {};
    return dict[key] != null ? dict[key] : (I18N.tr[key] || key);
  }
  function loc(field) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[state.lang] || field.tr || field.en || "";
  }

  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("#langToggle button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === state.lang);
    });
  }

  /* -------- Price formatting (hidden when empty) -------- */
  function priceText(p) {
    if (p.price == null) return "";
    const val = String(p.price).trim();
    if (!val) return "";
    // sadece rakamsa para birimi ekle, zaten biçimlendirilmişse olduğu gibi göster
    return /^[0-9][0-9.,]*$/.test(val) ? val + " " + (CFG.currency || "₺") : val;
  }
  function priceHtml(p, cls) {
    const txt = priceText(p);
    return txt ? '<div class="' + (cls || "price") + '">' + txt + "</div>" : "";
  }

  /* -------- Catalog download (custom upload or bundled PDF) -------- */
  function downloadCatalog(e) {
    if (e) e.preventDefault();
    let custom = null, customName = null;
    try {
      custom = localStorage.getItem("aviron_catalog");
      customName = localStorage.getItem("aviron_catalog_name");
    } catch (err) {}
    const a = document.createElement("a");
    a.href = custom || CFG.catalogPath || "#";
    a.download = (custom && customName) || CFG.catalogDownloadName || "aviron-katalog.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /* -------- WhatsApp link builder -------- */
  function waLink(product, customText) {
    const num = (CFG.whatsapp || "").replace(/\D/g, "");
    let msg;
    if (product) {
      const name = loc(product.name) + " — " + loc(product.subtitle);
      msg = t("wa.greeting") + "\n\n" +
            "*" + t("wa.product") + ":* " + name;
      if (customText && customText.trim()) {
        msg += "\n*" + t("wa.custom") + ":* " + customText.trim();
      }
    } else {
      msg = t("wa.generic");
    }
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }

  /* -------- Render product grid -------- */
  function renderGrid() {
    const grid = document.getElementById("productGrid");
    const items = state.products.filter(function (p) {
      return state.filter === "all" || p.category === state.filter;
    });
    grid.innerHTML = items.map(function (p) {
      const img = IMG_BASE + (p.images && p.images[0] ? p.images[0] : "");
      const badge = p.customizable
        ? '<span class="badge"><span class="dot"></span>' + t("card.customizable") + "</span>"
        : "";
      return (
        '<article class="card reveal" data-id="' + p.id + '">' +
          '<div class="card-media">' + badge +
            '<img src="' + img + '" alt="' + loc(p.name) + '" loading="lazy">' +
          "</div>" +
          '<div class="card-body">' +
            '<span class="card-sub">' + loc(p.subtitle) + "</span>" +
            '<h3 class="card-title">' + loc(p.name) + "</h3>" +
            '<p class="card-desc">' + loc(p.desc) + "</p>" +
            priceHtml(p, "card-price") +
            '<span class="card-cta">' + t("card.view") +
              ' <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
            "</span>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    grid.querySelectorAll(".card").forEach(function (card) {
      card.addEventListener("click", function () {
        openDetail(card.getAttribute("data-id"));
      });
    });
    observeReveals();
  }

  /* -------- Product detail overlay -------- */
  function openDetail(id) {
    const p = state.products.find(function (x) { return x.id === id; });
    if (!p) return;
    state.activeProduct = p;
    state.activeImg = 0;
    renderDetail();
    const ov = document.getElementById("detailOverlay");
    ov.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closeDetail() {
    document.getElementById("detailOverlay").classList.remove("open");
    document.body.classList.remove("modal-open");
    state.activeProduct = null;
  }

  function renderDetail() {
    const p = state.activeProduct;
    if (!p) return;
    const box = document.getElementById("detailBox");
    const imgs = p.images || [];
    const mainImg = IMG_BASE + (imgs[state.activeImg] || imgs[0] || "");

    const thumbs = imgs.length > 1
      ? '<div class="detail-thumbs">' + imgs.map(function (im, i) {
          return '<button class="' + (i === state.activeImg ? "active" : "") + '" data-idx="' + i + '">' +
                 '<img src="' + IMG_BASE + im + '" alt=""></button>';
        }).join("") + "</div>"
      : "";

    const customizer = p.customizable
      ? '<div class="customizer">' +
          '<label>' + t("detail.customize") + "</label>" +
          '<p class="hint">' + t("detail.customHint") + "</p>" +
          '<input type="text" id="customInput" maxlength="60" placeholder="' + loc(p.customExample) + '" value="">' +
          '<div class="preview-chip">' + t("detail.preview") + ': <b id="previewChip">' + t("detail.noText") + "</b></div>" +
        "</div>"
      : "";

    box.innerHTML =
      '<button class="detail-close" id="detailClose" aria-label="Close">✕</button>' +
      '<div class="detail-gallery">' +
        '<div class="detail-main-img"><img src="' + mainImg + '" id="detailMainImg" alt="' + loc(p.name) + '"></div>' +
        thumbs +
      "</div>" +
      '<div class="detail-info">' +
        '<span class="card-sub">' + loc(p.subtitle) + "</span>" +
        "<h2>" + loc(p.name) + "</h2>" +
        "<p>" + loc(p.desc) + "</p>" +
        priceHtml(p, "detail-price") +
        customizer +
        '<div class="detail-order">' +
          '<a href="#" class="btn btn-wa btn-block" id="detailOrder" target="_blank" rel="noopener">' +
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.4A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3 0 .2 0 .8-.2 1.5Z"/></svg>' +
            t("detail.order") +
          "</a>" +
        "</div>" +
      "</div>";

    // wire thumbnails
    box.querySelectorAll(".detail-thumbs button").forEach(function (b) {
      b.addEventListener("click", function () {
        state.activeImg = parseInt(b.getAttribute("data-idx"), 10);
        document.getElementById("detailMainImg").src = IMG_BASE + p.images[state.activeImg];
        box.querySelectorAll(".detail-thumbs button").forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
      });
    });

    // wire customizer + order button
    const input = document.getElementById("customInput");
    const chip = document.getElementById("previewChip");
    const orderBtn = document.getElementById("detailOrder");

    function refreshOrder() {
      const val = input ? input.value : "";
      if (chip) chip.textContent = val && val.trim() ? val.trim() : t("detail.noText");
      orderBtn.href = waLink(p, val);
    }
    if (input) input.addEventListener("input", refreshOrder);
    refreshOrder();

    document.getElementById("detailClose").addEventListener("click", closeDetail);
  }

  /* -------- Scroll reveal -------- */
  let io;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
    }
    document.querySelectorAll(".reveal:not(.visible)").forEach(function (el) { io.observe(el); });
  }

  /* -------- Wiring -------- */
  function setLang(lang) {
    state.lang = lang;
    localStorage.setItem("aviron_lang", lang);
    applyI18n();
    renderGrid();
    if (state.activeProduct) renderDetail();
    updateStaticWaLinks();
  }

  function updateStaticWaLinks() {
    ["contactWa", "footerWa"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.href = waLink(null, null);
    });
    const ig = CFG.instagram || "#";
    ["footerIg"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.href = ig;
    });
  }

  function init() {
    state.products = loadProducts();
    applyI18n();
    renderGrid();
    updateStaticWaLinks();
    observeReveals();

    document.getElementById("year").textContent = new Date().getFullYear();

    // catalog download links
    ["navCatalog", "footerCatalog"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", downloadCatalog);
    });

    // filters
    document.getElementById("filters").addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      state.filter = btn.getAttribute("data-filter");
      document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      renderGrid();
    });

    // language toggle
    document.getElementById("langToggle").addEventListener("click", function (e) {
      const btn = e.target.closest("button");
      if (btn) setLang(btn.getAttribute("data-lang"));
    });

    // header scroll state
    const header = document.getElementById("header");
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });

    // mobile menu
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("open");
      menuToggle.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        menuToggle.classList.remove("open");
      });
    });

    // overlay close (backdrop + ESC)
    const overlay = document.getElementById("detailOverlay");
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeDetail();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDetail();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
