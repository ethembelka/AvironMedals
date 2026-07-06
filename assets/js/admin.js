/* ============================================================
   AVIRON — Admin Panel Logic
   ------------------------------------------------------------
   Backend yok. Ürünler tarayıcıda localStorage'da saklanır
   (anahtar: "aviron_products"). Site (app.js) aynı anahtarı okur.
   İleride /admin API'ni yazdığında:
     - login()  -> sunucuya POST edip token al
     - save()   -> ürünleri sunucuya PUT/POST et
     - load()   -> sunucudan GET et
   yeterli olacak. Yapı buna uygun bırakıldı.
   ============================================================ */
(function () {
  "use strict";

  const CFG = window.AVIRON_CONFIG || {};
  const IMG_BASE = "assets/img/products/";
  const STORE_KEY = "aviron_products";
  const AUTH_KEY = "aviron_admin_auth";

  let products = [];
  let editingId = null; // null => yeni ürün

  /* ---------- data ---------- */
  function loadProducts() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      if (Array.isArray(saved) && saved.length) return saved;
    } catch (e) {}
    // varsayılan katalogun kopyası
    return JSON.parse(JSON.stringify(window.AVIRON_PRODUCTS || []));
  }
  function persist() {
    localStorage.setItem(STORE_KEY, JSON.stringify(products));
  }

  /* ---------- auth ---------- */
  function isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  }
  function showPanel() {
    document.getElementById("loginWrap").style.display = "none";
    document.getElementById("panel").style.display = "block";
    products = loadProducts();
    renderGrid();
  }

  function initLogin() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const pass = document.getElementById("loginPass").value;
      const err = document.getElementById("loginError");
      // TODO: gerçek doğrulama için /admin API çağrısıyla değiştir.
      if (pass === (CFG.adminPassword || "aviron2026")) {
        sessionStorage.setItem(AUTH_KEY, "1");
        showPanel();
      } else {
        err.textContent = "Hatalı şifre. Tekrar dene.";
        document.getElementById("loginPass").value = "";
      }
    });
  }

  /* ---------- grid ---------- */
  function renderGrid() {
    const grid = document.getElementById("adminGrid");
    document.getElementById("countLine").textContent =
      products.length + " ürün · Değişiklikler bu tarayıcıda saklanır";

    let html = products.map(function (p) {
      const img = IMG_BASE + ((p.images && p.images[0]) || "");
      const catLabel = p.category === "cerceve" ? "Çerçeve" : "Madalya Askısı";
      return (
        '<div class="admin-card">' +
          '<div class="thumb"><img src="' + img + '" alt=""></div>' +
          '<div class="body">' +
            '<span class="cat">' + catLabel + "</span>" +
            '<span class="name">' + (loc(p.name)) + "</span>" +
            '<span class="sub">' + (loc(p.subtitle)) + "</span>" +
          "</div>" +
          '<div class="actions">' +
            '<button class="btn btn-ghost btn-sm" data-edit="' + p.id + '">Düzenle</button>' +
          "</div>" +
        "</div>"
      );
    }).join("");

    html +=
      '<button class="admin-add" id="addCard">' +
        '<span class="plus">+</span><span>Yeni Ürün Ekle</span>' +
      "</button>";

    grid.innerHTML = html;

    grid.querySelectorAll("[data-edit]").forEach(function (b) {
      b.addEventListener("click", function () { openEditor(b.getAttribute("data-edit")); });
    });
    document.getElementById("addCard").addEventListener("click", function () { openEditor(null); });
  }

  function loc(field) {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field.tr || field.en || "";
  }

  /* ---------- editor ---------- */
  const $ = function (id) { return document.getElementById(id); };

  function openEditor(id) {
    editingId = id;
    const p = id ? products.find(function (x) { return x.id === id; }) : null;
    $("editorTitle").textContent = p ? "Ürünü Düzenle" : "Yeni Ürün";
    $("deleteBtn").style.display = p ? "inline-flex" : "none";

    $("f_id").value = p ? p.id : "";
    $("f_id").readOnly = !!p;
    $("f_category").value = p ? p.category : "aski";
    $("f_price").value = p && p.price != null ? String(p.price) : "";
    $("f_name_tr").value = p ? loc2(p.name, "tr") : "";
    $("f_name_en").value = p ? loc2(p.name, "en") : "";
    $("f_sub_tr").value = p ? loc2(p.subtitle, "tr") : "";
    $("f_sub_en").value = p ? loc2(p.subtitle, "en") : "";
    $("f_desc_tr").value = p ? loc2(p.desc, "tr") : "";
    $("f_desc_en").value = p ? loc2(p.desc, "en") : "";
    $("f_images").value = p && p.images ? p.images.join(", ") : "";
    $("f_customizable").checked = p ? !!p.customizable : true;
    $("f_cp_tr").value = p ? loc2(p.customPrompt, "tr") : "";
    $("f_ce_tr").value = p ? loc2(p.customExample, "tr") : "";

    refreshImgPreview();
    toggleCustomFields();
    $("editorOverlay").classList.add("open");
  }
  function loc2(field, lang) {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || "";
  }
  function closeEditor() { $("editorOverlay").classList.remove("open"); }

  function refreshImgPreview() {
    const names = $("f_images").value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    $("imgPreview").innerHTML = names.map(function (n) {
      return '<img src="' + IMG_BASE + n + '" alt="' + n + '" title="' + n + '">';
    }).join("");
  }
  function toggleCustomFields() {
    $("customFields").style.display = $("f_customizable").checked ? "grid" : "none";
  }

  function slugify(s) {
    return (s || "").toLowerCase()
      .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
      .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function saveProduct() {
    let id = ($("f_id").value || "").trim();
    if (!id) id = slugify($("f_name_tr").value || $("f_name_en").value || "urun-" + Date.now());
    if (!id) { toast("Geçerli bir ID gir."); return; }

    // yeni üründe id çakışması kontrolü
    if (!editingId && products.some(function (p) { return p.id === id; })) {
      toast("Bu ID zaten kullanılıyor."); return;
    }

    const images = $("f_images").value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    const obj = {
      id: id,
      category: $("f_category").value,
      price: $("f_price").value.trim(),
      name: { tr: $("f_name_tr").value.trim(), en: $("f_name_en").value.trim() },
      subtitle: { tr: $("f_sub_tr").value.trim(), en: $("f_sub_en").value.trim() },
      desc: { tr: $("f_desc_tr").value.trim(), en: $("f_desc_en").value.trim() },
      customizable: $("f_customizable").checked,
      customPrompt: { tr: $("f_cp_tr").value.trim(), en: $("f_cp_tr").value.trim() },
      customExample: { tr: $("f_ce_tr").value.trim(), en: $("f_ce_tr").value.trim() },
      images: images
    };

    if (!obj.name.tr && !obj.name.en) { toast("En az bir dilde isim gir."); return; }
    // EN boşsa TR ile doldur (site tek dilde de düzgün görünsün)
    ["name", "subtitle", "desc"].forEach(function (k) {
      if (!obj[k].en) obj[k].en = obj[k].tr;
      if (!obj[k].tr) obj[k].tr = obj[k].en;
    });

    if (editingId) {
      const i = products.findIndex(function (p) { return p.id === editingId; });
      products[i] = obj;
    } else {
      products.push(obj);
    }
    persist();
    renderGrid();
    closeEditor();
    toast("Kaydedildi ✓");
  }

  function deleteProduct() {
    if (!editingId) return;
    if (!confirm("Bu ürünü silmek istediğine emin misin?")) return;
    products = products.filter(function (p) { return p.id !== editingId; });
    persist();
    renderGrid();
    closeEditor();
    toast("Ürün silindi");
  }

  /* ---------- import / export / reset ---------- */
  function exportJson() {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aviron-products.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("JSON indirildi");
  }
  function importJson(file) {
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error("Dizi bekleniyor");
        products = data;
        persist();
        renderGrid();
        toast("İçe aktarıldı ✓");
      } catch (e) {
        toast("Geçersiz JSON dosyası");
      }
    };
    reader.readAsText(file);
  }
  /* ---------- catalog upload ---------- */
  // Backend yok: yüklenen PDF tarayıcıda (localStorage) saklanır ve site
  // "Kataloğu İndir" linklerinde bunu kullanır. Kalıcı/paylaşılır olması için
  // dosyayı assets/catalog/ içine koyup config.js'teki catalogPath'i güncelle.
  function uploadCatalog(file) {
    if (!file) return;
    if (file.type !== "application/pdf") { toast("Lütfen bir PDF dosyası seç."); return; }
    const reader = new FileReader();
    reader.onload = function () {
      try {
        localStorage.setItem("aviron_catalog", reader.result);
        localStorage.setItem("aviron_catalog_name", file.name);
        toast("Katalog yüklendi ✓ (site linklerinde aktif)");
      } catch (e) {
        toast("Dosya çok büyük — assets/catalog/ içine elle koymalısın.");
      }
    };
    reader.readAsDataURL(file);
  }

  function resetDefaults() {
    if (!confirm("Tüm değişiklikler silinip varsayılan katalog geri yüklenecek. Emin misin?")) return;
    localStorage.removeItem(STORE_KEY);
    products = loadProducts();
    renderGrid();
    toast("Varsayılana dönüldü");
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2400);
  }

  /* ---------- init ---------- */
  function init() {
    initLogin();
    if (isLoggedIn()) showPanel();

    $("editorClose").addEventListener("click", closeEditor);
    $("cancelBtn").addEventListener("click", closeEditor);
    $("saveBtn").addEventListener("click", saveProduct);
    $("deleteBtn").addEventListener("click", deleteProduct);
    $("newBtn").addEventListener("click", function () { openEditor(null); });
    $("f_images").addEventListener("input", refreshImgPreview);
    $("f_customizable").addEventListener("change", toggleCustomFields);

    $("exportBtn").addEventListener("click", exportJson);
    $("importBtn").addEventListener("click", function () { $("importFile").click(); });
    $("importFile").addEventListener("change", function (e) {
      if (e.target.files[0]) importJson(e.target.files[0]);
    });
    $("resetBtn").addEventListener("click", resetDefaults);
    $("catalogBtn").addEventListener("click", function () { $("catalogFile").click(); });
    $("catalogFile").addEventListener("change", function (e) {
      if (e.target.files[0]) uploadCatalog(e.target.files[0]);
      e.target.value = "";
    });
    $("logoutBtn").addEventListener("click", function () {
      sessionStorage.removeItem(AUTH_KEY);
      location.reload();
    });

    $("editorOverlay").addEventListener("click", function (e) {
      if (e.target === $("editorOverlay")) closeEditor();
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
