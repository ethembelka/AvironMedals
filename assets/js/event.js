/* ============================================================
   AVIRON — Etkinlik / Lazer Kazıma Formu
   ------------------------------------------------------------
   Gönderimler config.event.formEndpoint (Google Apps Script Web App)
   üzerinden bir Google Tablosu'na yazılır. Backend/sunucu yok.
   Kurulum: docs/etkinlik-form-kurulumu.md
   ============================================================ */
(function () {
  "use strict";

  var CFG = (window.AVIRON_CONFIG || {});
  var EV = CFG.event || {};
  var IMG_BASE = "assets/img/products/";
  var MAXLEN = EV.engravingMaxLength || 40;

  function $(id) { return document.getElementById(id); }

  /* ---------- config-driven text ---------- */
  function applyConfig() {
    if (EV.name) $("evBadge").textContent = EV.name.toLocaleUpperCase("tr-TR");
    if (EV.discountCode) $("evDiscount").textContent = EV.discountCode;
    if (EV.discountPercent) $("evPct").textContent = EV.discountPercent;
    var ig = $("evInstagram");
    if (ig && CFG.instagram) ig.href = CFG.instagram;
  }

  /* ---------- live engraving preview ---------- */
  function onEngravingInput() {
    var val = $("evEngraving").value;
    var plate = $("evPlate");
    var span = plate.querySelector("span");
    if (val.trim()) {
      plate.classList.remove("empty");
      span.textContent = val.trim();
    } else {
      plate.classList.add("empty");
      span.textContent = "önizleme burada görünecek";
    }
  }

  /* ---------- validation ---------- */
  function digits(s) { return (s || "").replace(/\D/g, ""); }

  function setInvalid(fieldName, invalid) {
    var el = document.querySelector('[data-field="' + fieldName + '"]');
    if (el) el.classList.toggle("invalid", !!invalid);
  }

  function validate() {
    var ok = true;
    var name = $("evName").value.trim();
    var phone = $("evPhone").value.trim();
    var email = $("evEmail").value.trim();
    var engraving = $("evEngraving").value.trim();
    var kvkk = $("evKvkk").checked;

    setInvalid("name", !name);
    if (!name) ok = false;

    var phoneOk = digits(phone).length >= 10;
    setInvalid("phone", !phoneOk);
    if (!phoneOk) ok = false;

    var emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setInvalid("email", !emailOk);
    if (!emailOk) ok = false;

    setInvalid("engraving", !engraving);
    if (!engraving) ok = false;

    setInvalid("kvkk", !kvkk);
    if (!kvkk) ok = false;

    return ok;
  }

  /* ---------- unique code ---------- */
  function genCode() {
    return "AV-" + String(Date.now()).slice(-6);
  }

  /* ---------- WhatsApp fallback (event connectivity safety net) ---------- */
  function waFallback(data) {
    var num = (CFG.whatsapp || "").replace(/\D/g, "");
    var msg =
      "🏅 KAZIMA TALEBİ (" + (EV.name || "Etkinlik") + ")\n\n" +
      "Kod: " + data.code + "\n" +
      "Ad Soyad: " + data.name + "\n" +
      "Telefon: " + data.phone + "\n" +
      (data.email ? "E-posta: " + data.email + "\n" : "") +
      (data.race ? "Yarış: " + data.race + "\n" : "") +
      "Kazınacak Yazı: " + data.engraving;
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg);
  }

  /* ---------- submit to Google Sheet (Apps Script) ---------- */
  function sendToSheet(data) {
    var endpoint = EV.formEndpoint;
    if (!endpoint) {
      // Henüz yapılandırılmadı — önizleme/test için başarı say, uyar.
      console.warn("[Aviron] event.formEndpoint boş — gönderim KAYDEDİLMEDİ. config.js'te ayarla.");
      return Promise.resolve();
    }
    // JSON gövde => 'simple request' (preflight yok). Apps Script sunucu tarafında yazar.
    return fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  /* ---------- product highlights on thank-you ---------- */
  function renderPromo() {
    var prods = (window.AVIRON_PRODUCTS || []);
    var featured = prods.filter(function (p) { return p.featured; });
    var pool = featured.length >= 3 ? featured : prods;
    // Kategorileri harmanla: hem askı hem çerçeve görünsün (reklam için daha iyi)
    var aski = pool.filter(function (p) { return p.category === "aski"; });
    var cer = pool.filter(function (p) { return p.category === "cerceve"; });
    var pick = [];
    for (var i = 0; pick.length < 3 && (i < aski.length || i < cer.length); i++) {
      if (i < aski.length) pick.push(aski[i]);
      if (pick.length < 3 && i < cer.length) pick.push(cer[i]);
    }
    if (pick.length < 3) pick = pool.slice(0, 3);
    $("evPromo").innerHTML = pick.map(function (p) {
      var img = IMG_BASE + ((p.images && p.images[0]) || "");
      var name = (p.name && (p.name.tr || p.name.en)) || "";
      return '<a href="index.html#products">' +
               '<div class="im"><img src="' + img + '" alt="' + name + '" loading="lazy"></div>' +
               '<div class="nm">' + name + "</div>" +
             "</a>";
    }).join("");
  }

  function showDone(code) {
    $("evCodeVal").textContent = code;
    renderPromo();
    $("evForm").style.display = "none";
    var done = $("evDone");
    done.classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- submit handler ---------- */
  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      var firstInvalid = document.querySelector(".ev-field.invalid, .ev-consent.invalid");
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    var btn = $("evSubmit");
    var data = {
      code: genCode(),
      name: $("evName").value.trim(),
      phone: $("evPhone").value.trim(),
      email: $("evEmail").value.trim(),
      race: $("evRace").value.trim(),
      engraving: $("evEngraving").value.trim(),
      marketing: $("evMarketing").checked ? "evet" : "hayir",
      event: EV.name || "",
      ts: new Date().toISOString()
    };

    btn.classList.add("ev-submitting");
    btn.innerHTML = '<span class="spin"></span>Gönderiliyor...';

    sendToSheet(data)
      .then(function () {
        showDone(data.code);
      })
      .catch(function (err) {
        console.error("[Aviron] gönderim hatası:", err);
        // İnternet/endpoint sorunu — kimse kaybolmasın: WhatsApp yedeği sun.
        btn.classList.remove("ev-submitting");
        btn.innerHTML = "Gönder ve Kodumu Al";
        var wa = waFallback(data);
        if (window.confirm(
          "Bağlantı sorunu yaşandı, form kaydedilemedi.\n\n" +
          "Bilgilerini kaybetmemek için WhatsApp üzerinden göndermek ister misin? " +
          "(Açılacak mesajı sadece Gönder'e basman yeterli.)"
        )) {
          window.open(wa, "_blank");
          showDone(data.code);
        }
      });
  }

  /* ---------- KVKK aydınlatma metni (basit modal) ---------- */
  function showKvkk(e) {
    e.preventDefault();
    var txt =
      "KİŞİSEL VERİLERİN KORUNMASI — AYDINLATMA METNİ\n\n" +
      "Bu form aracılığıyla topladığımız ad-soyad, telefon ve (varsa) e-posta " +
      "bilgilerin, yalnızca talep ettiğin madalya kazıma hizmetinin sağlanması ve " +
      "seninle iletişim kurulması amacıyla işlenir. Bilgilerin üçüncü kişilerle " +
      "paylaşılmaz. Pazarlama onayı verdiysen, kampanyalarımızdan haberdar etmek için " +
      "de kullanılabilir; bu onayı dilediğin zaman geri çekebilirsin.";
    window.alert(txt);
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    $("evEngraving").addEventListener("input", onEngravingInput);
    $("evForm").addEventListener("submit", onSubmit);
    $("evKvkkLink").addEventListener("click", showKvkk);

    // hatalı alanı düzeltince kırmızıyı kaldır
    ["evName", "evPhone", "evEmail", "evEngraving"].forEach(function (id) {
      $(id).addEventListener("input", function () {
        var wrap = $(id).closest(".ev-field");
        if (wrap) wrap.classList.remove("invalid");
      });
    });
    $("evKvkk").addEventListener("change", function () {
      if ($("evKvkk").checked) setInvalid("kvkk", false);
    });
  });
})();
