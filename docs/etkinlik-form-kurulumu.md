# Etkinlik Kazıma Formu — Google Tablosu Kurulumu

Bu form (`etkinlik.html`) gönderimleri **ücretsiz, sunucusuz** olarak bir **Google Tablosuna** yazar.
Veri **hangi Google hesabında** Apps Script kurulursa **o hesaba** düşer. Hesabı değiştirmek için
sadece `assets/js/config.js` → `event.formEndpoint` içindeki URL değiştirilir.

> Aşağıdaki adımları **verinin düşmesini istediğin Google hesabında** (ör. arkadaşının hesabı) yap.

## 1. Google Tablosu oluştur
1. O hesapla giriş yap → yeni tabloya git: **https://sheets.new**
2. Adını ver: `Aviron Kazıma Kayıtları`

## 2. Apps Script'i ekle
1. Tabloda üstten **Uzantılar → Apps Script**.
2. Açılan editördeki tüm kodu sil, aşağıdakini yapıştır:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Kayitlar') || ss.insertSheet('Kayitlar');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Zaman', 'Kod', 'Ad Soyad', 'Telefon', 'E-posta',
                       'Yaris/Madalya', 'Kazinacak Yazi', 'Pazarlama Onayi', 'Durum']);
    }
    sheet.appendRow([
      new Date(),
      data.code || '',
      data.name || '',
      "'" + (data.phone || ''),   // baştaki ' telefonu metin olarak tutar
      data.email || '',
      data.race || '',
      data.engraving || '',
      data.marketing || '',
      ''                           // Durum: kazıma yapılınca elle "✔" yaz
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Kaydet** (💾 / Ctrl+S).

## 3. Web App olarak yayınla
1. Sağ üstte **Dağıt (Deploy) → Yeni dağıtım**.
2. Tür (⚙️) → **Web uygulaması**.
3. Ayarlar:
   - **Şu şekilde çalıştır:** `Ben` (kendi hesabın)
   - **Erişim izni:** `Herkes` (Anyone)
4. **Dağıt** → Google izin isteyecek → hesabınla **İzin ver** (uyarı çıkarsa "Gelişmiş → devam et").
5. Sana bir **Web uygulaması URL'i** verir; `.../exec` ile biter. **Kopyala.**

## 4. Siteye bağla
1. `assets/js/config.js` dosyasını aç.
2. `event.formEndpoint` alanına kopyaladığın URL'i yapıştır:
   ```js
   formEndpoint: "https://script.google.com/macros/s/AKfy...../exec",
   ```
3. Değişikliği kaydet → `main`'e push et (canlıya çıksın).

## 5. Test et
1. `etkinlik.html`'i aç, formu doldur, gönder.
2. Google Tablosunda **Kayitlar** sekmesinde yeni satır belirmeli.

## Etkinlik günü
- Tabloyu telefon/tablet/bilgisayarda açık tut.
- Yeni satırlar geldikçe **Kazinacak Yazi**'yı lazerle işle.
- Bitince **Durum** sütununa `✔` yaz — sıradan çıkmış olsun.
- Kişi, standa **kodunu** (AV-XXXXXX) gösterir; tabloda o koddan bulursun.

## Hesabı/tabloyu değiştirmek istersen
Yukarıdaki adımları farklı bir hesapta tekrarla, yeni `.../exec` URL'ini
`config.js` → `event.formEndpoint`'e yaz. Başka hiçbir şey değişmez.

## Notlar
- **Sınırsız + ücretsiz:** Google Apps Script + Sheets bu ölçekte ücret almaz.
- Koddan kaynağı (SPF/DNS) etkileyen bir şey yok — sadece veri toplama.
- Kod değiştirirsen **yeni bir dağıtım** (veya "dağıtımı yönet → düzenle → yeni sürüm") gerekir.
