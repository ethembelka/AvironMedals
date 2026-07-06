# Aviron — Tanıtım Sitesi

> **Medals Deserve Walls** — Yarışlarda kazanılan madalyaları kişiye özel askı ve çerçevelerle duvar dekoruna dönüştüren Aviron markasının tanıtım sitesi.

Backend gerektirmez. Saf HTML + CSS + JavaScript. GitHub Pages, Netlify veya herhangi bir statik sunucuya doğrudan yüklenebilir.

## Dosya Yapısı

```
index.html            → Ana tanıtım sayfası (hero, koleksiyon, nasıl çalışır, hakkımızda, iletişim)
admin.html            → Gizli yönetim paneli (ürün ekle/düzenle/sil)
robots.txt            → /admin arama motorlarından gizli
assets/
  css/style.css       → Tasarım sistemi (site)
  css/admin.css       → Admin panel stilleri
  js/config.js        → ⚙️ WhatsApp numarası, Instagram, admin şifresi
  js/products.js      → 📦 Ürün kataloğu verisi (varsayılan)
  js/app.js           → Site mantığı (TR/EN, filtre, ürün detayı, WhatsApp)
  js/admin.js         → Admin panel mantığı
  img/products/       → Ürün görselleri
  img/logo.svg        → Aviron logosu
datas/                → Kaynak katalog PDF + orijinal fotoğraflar (siteye dahil değil)
```

## Yapman Gerekenler

1. **WhatsApp numarası** — `assets/js/config.js` → `whatsapp` alanı. Şu an `905447701200` (0544 770 12 00). İletişim ve sipariş linkleri WhatsApp'ı otomatik mesajla açar; müşteri sadece **Gönder**'e basar. Instagram linkini de ekleyebilirsin.
2. **Admin şifresini değiştir.** Aynı dosyada `adminPassword`. (Bu geçici bir kilittir — aşağıya bak.)

### Fiyatlar
Ürün fiyatları opsiyoneldir. Admin panelde bir ürünü düzenleyip **Fiyat** alanına yazarsan sitede görünür (sadece sayı yazarsan otomatik `₺` eklenir). **Boş bırakılırsa fiyat hiç gösterilmez.**

### Katalog (PDF)
- Güncel katalog: `assets/catalog/aviron-katalog-2026.pdf`. Site menüsünde ve footer'da **"Kataloğu İndir"** linkleri bu dosyayı indirir.
- Kataloğu güncellemek için ya bu dosyayı yenisiyle değiştir, ya da admin panelde **"Katalog Yükle"** ile yeni PDF seç (tarayıcıda saklanır; kalıcı/paylaşılır olması için dosyayı doğrudan değiştirmen önerilir).

## Yerel Önizleme

```bash
python -m http.server 5500
# tarayıcı: http://localhost:5500
```
> Not: `file://` ile açarsan yazı tipleri/JS çalışır ama basit bir sunucu üzerinden açman en sağlıklısı.

## Yönetim Paneli

- Adres: `admin.html` (menüde link yok, müşteri göremez).
- Giriş şifresi: `config.js` içindeki `adminPassword` (varsayılan `aviron2026`).
- Ürün ekleyebilir, düzenleyebilir, silebilir; görsel adlarını girebilirsin.
- Değişiklikler tarayıcının `localStorage`'ında saklanır. **JSON Dışa Aktar** ile yedek al, kalıcı hale getirmek için `assets/js/products.js` içine işle.

### İleride `/admin` API'ni yazınca

Yapı buna hazır bırakıldı. Sadece şu üç noktayı sunucuya bağla:
- `admin.js` → `initLogin()` içindeki şifre kontrolünü API çağrısıyla değiştir.
- `admin.js` → `persist()` fonksiyonunu ürünleri sunucuya kaydedecek şekilde güncelle.
- `app.js` → `loadProducts()` fonksiyonunu sunucudan `fetch` edecek şekilde güncelle.

## Yeni Görsel Ekleme

Görseli `assets/img/products/` klasörüne koy, ardından admin panelde ilgili ürünün **Görseller** alanına dosya adını yaz (örn. `yeni-urun.jpg`). Büyük fotoğrafları yüklemeden önce ~1200px genişliğe küçültmen önerilir.
```
