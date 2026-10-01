/*
 * AVIRON — Site Konfigürasyonu / Site Config
 * ---------------------------------------------------------------
 * WhatsApp numaranı buraya yaz (ülke kodu dahil, sadece rakam).
 * Örn. Türkiye 0555 123 45 67  ->  "905551234567"
 */
window.AVIRON_CONFIG = {
  // WhatsApp numarası (uluslararası format, + ve boşluk YOK). 0544 770 12 00 -> 90 5447701200
  whatsapp: "905447701200",
  instagram: "https://www.instagram.com/aviron.tr",
  email: "hello@avironmedals.com",
  // Para birimi simgesi — fiyatların yanında gösterilir.
  currency: "₺",
  // Katalog PDF yolu (bu dosyayı değiştirerek kataloğu güncelleyebilirsin) ve
  // indirilirken kullanıcıya inecek dosya adı.
  catalogPath: "assets/catalog/aviron-katalog-2026.pdf",
  catalogDownloadName: "Aviron-Katalog-2026.pdf",
  // Admin panel şifresi — SADECE geçici demo kilidi. Gerçek güvenlik
  // için /admin API'ni yazdığında sunucu tarafı doğrulama kullan.
  adminPassword: "aviron2026",

  // ---- Etkinlik / Lazer Kazıma Formu (etkinlik.html) ----
  event: {
    name: "Gaziantep Koşusu",          // etkinlik başlığı
    city: "Gaziantep",
    // Google Apps Script "Web App" URL'i — form gönderimleri buraya (Google Tablosu'na) düşer.
    // ARKADAŞININ Google hesabında oluşturulacak. Hesabı/tabloyu değiştirmek için
    // SADECE bu URL'i değiştirmen yeterli (kurulum: docs/etkinlik-form-kurulumu.md).
    formEndpoint: "https://script.google.com/macros/s/AKfycbxRR8zZENG3SUmqtWnVAbNifjl179lPktS96NVbhYcZ23dMV_5ffNy1Zjv8PwG1l_QGAA/exec",
    discountCode: "GAZIANTEP10",        // teşekkür ekranında gösterilen indirim kodu
    discountPercent: 10,
    engravingMaxLength: 40              // kazınacak yazı için karakter sınırı (lazer alanı)
  }
};

/* Arayüz metinleri — TR / EN */
window.AVIRON_I18N = {
  tr: {
    "nav.products": "Ürünler",
    "nav.hangers": "Askılar",
    "nav.frames": "Çerçeveler",
    "nav.how": "Nasıl Çalışır",
    "nav.about": "Hakkımızda",
    "nav.contact": "İletişim",
    "nav.event": "Gaziantep Koşusu",
    "nav.order": "Sipariş Ver",
    "nav.catalog": "Kataloğu İndir",
    "catalog.download": "Kataloğu İndir (PDF)",
    "price.from": "",

    "event.eyebrow": "ETKİNLİK",
    "event.title": "Gaziantep Koşusu'ndayız",
    "event.body": "Gaziantep Koşusu'nda yanınızdayız! Yarışta kazandığınız madalyalara, etkinlik alanında yerinde lazer kazıma yapıyoruz. Adınızı, derecenizi ya da unutmak istemediğiniz o sözü yazın; biz madalyanıza kazıyalım. İşlem birkaç dakika sürer ve bu etkinliğe özel ücretsizdir.",
    "event.cta": "Kazıma için formu doldur",

    "hero.tagline": "MADALYALAR DUVARI HAK EDER",
    "hero.title": "Zaferlerin bir çekmecede değil, duvarında yaşasın.",
    "hero.subtitle": "Yarışlarda kazandığın madalyaları, kişiye özel tasarlanmış askı ve çerçevelerle evinin en şık dekoruna dönüştürüyoruz.",
    "hero.cta": "Ürünleri Keşfet",
    "hero.cta2": "Nasıl Çalışır?",

    "products.title": "Koleksiyon",
    "products.subtitle": "Sporuna ve hikâyene göre seç. Hepsi kişiye özel yazıyla tamamlanır.",
    "filter.all": "Tümü",
    "filter.aski": "Madalya Askıları",
    "filter.cerceve": "Çerçeveler",
    "card.customizable": "Kişiye Özel",
    "card.view": "İncele",

    "how.title": "Üç Adımda Senin Olur",
    "how.subtitle": "Basit, hızlı ve tamamen sana özel.",
    "how.step1.t": "Ürününü Seç",
    "how.step1.d": "Koleksiyondan sporuna ve tarzına en uygun askı ya da çerçeveyi seç.",
    "how.step2.t": "Yazını Ekle",
    "how.step2.d": "İsmini, yarışını, sloganını ya da derecelerini yaz — anında önizle.",
    "how.step3.t": "WhatsApp'tan Sipariş Ver",
    "how.step3.d": "Tek tıkla WhatsApp'a geç, ürünü ve yazını biz hazır iletelim. Üretip sana gönderelim.",

    "detail.customize": "Kişiselleştir",
    "detail.customHint": "Ürünün üzerine eklenmesini istediğin yazıyı gir. Boş bırakırsan sade halinde üretiriz.",
    "detail.preview": "Önizleme",
    "detail.order": "WhatsApp'tan Sipariş Ver",
    "detail.back": "← Koleksiyona Dön",
    "detail.otherProducts": "Diğer Ürünler",
    "detail.noText": "(yazısız)",

    "about.title": "Aviron Hakkında",
    "about.body": "Aviron, bitiş çizgisini geçtiğin o anın hak ettiği değeri görmesi için kuruldu. Kazandığın her madalya bir hikâye; biz o hikâyeyi, elde üretilen kişiye özel askı ve çerçevelerle duvarına taşıyoruz. Çünkü madalyalar çekmecede değil, gözünün önünde yaşamalı.",
    "about.stat1": "Kişiye Özel Tasarım",
    "about.stat2": "El İşçiliği Kalite",
    "about.stat3": "Sporcuya Özel Model",

    "contact.title": "İletişime Geç",
    "contact.subtitle": "Sorularını, ölçülerini ve fikirlerini WhatsApp'tan bize yaz. Sana en uygun tasarımı birlikte bulalım.",
    "contact.whatsapp": "WhatsApp'tan Yaz",

    "footer.tagline": "Madalyalar duvarı hak eder.",
    "footer.rights": "Tüm hakları saklıdır.",

    "wa.greeting": "Merhaba Aviron! 👋 Aşağıdaki ürünle ilgileniyorum:",
    "wa.product": "Ürün",
    "wa.custom": "Eklenecek yazı",
    "wa.generic": "Merhaba Aviron! 👋 Ürünleriniz hakkında bilgi almak istiyorum."
  },
  en: {
    "nav.products": "Products",
    "nav.hangers": "Hangers",
    "nav.frames": "Frames",
    "nav.how": "How It Works",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.event": "Gaziantep Run",
    "nav.order": "Order Now",
    "nav.catalog": "Download Catalog",
    "catalog.download": "Download Catalog (PDF)",
    "price.from": "",

    "event.eyebrow": "EVENT",
    "event.title": "We're at the Gaziantep Run",
    "event.body": "We're at the Gaziantep Run! We laser-engrave the medals you win, right there at the event. Write your name, your result, or that phrase you never want to forget — and we'll engrave it onto your medal. It takes a few minutes and is free for this event.",
    "event.cta": "Fill in the engraving form",

    "hero.tagline": "MEDALS DESERVE WALLS",
    "hero.title": "Let your victories live on your wall, not in a drawer.",
    "hero.subtitle": "We turn the medals you win into the finest décor in your home — with personalized hangers and frames.",
    "hero.cta": "Explore Products",
    "hero.cta2": "How It Works?",

    "products.title": "The Collection",
    "products.subtitle": "Choose by your sport and your story. Each one is finished with your custom text.",
    "filter.all": "All",
    "filter.aski": "Medal Hangers",
    "filter.cerceve": "Frames",
    "card.customizable": "Personalized",
    "card.view": "View",

    "how.title": "Yours in Three Steps",
    "how.subtitle": "Simple, fast and entirely your own.",
    "how.step1.t": "Choose Your Piece",
    "how.step1.d": "Pick the hanger or frame that best fits your sport and style.",
    "how.step2.t": "Add Your Text",
    "how.step2.d": "Type your name, race, slogan or splits — preview it instantly.",
    "how.step3.t": "Order via WhatsApp",
    "how.step3.d": "One tap to WhatsApp — your product and text arrive ready. We craft and ship it to you.",

    "detail.customize": "Personalize",
    "detail.customHint": "Enter the text you'd like on your piece. Leave blank for the plain version.",
    "detail.preview": "Preview",
    "detail.order": "Order via WhatsApp",
    "detail.back": "← Back to Collection",
    "detail.otherProducts": "Other Products",
    "detail.noText": "(no text)",

    "about.title": "About Aviron",
    "about.body": "Aviron was born so that the moment you cross the finish line gets the value it deserves. Every medal is a story — we carry that story to your wall with handcrafted, personalized hangers and frames. Because medals shouldn't live in a drawer, but in plain sight.",
    "about.stat1": "Personalized Design",
    "about.stat2": "Handcrafted Quality",
    "about.stat3": "Athlete-Specific Models",

    "contact.title": "Get in Touch",
    "contact.subtitle": "Send your questions, measurements and ideas over WhatsApp. Let's find the perfect design together.",
    "contact.whatsapp": "Message on WhatsApp",

    "footer.tagline": "Medals deserve walls.",
    "footer.rights": "All rights reserved.",

    "wa.greeting": "Hello Aviron! 👋 I'm interested in the following product:",
    "wa.product": "Product",
    "wa.custom": "Text to add",
    "wa.generic": "Hello Aviron! 👋 I'd like to learn more about your products."
  }
};
