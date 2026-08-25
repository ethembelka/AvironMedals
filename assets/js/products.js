/*
 * AVIRON — Ürün Kataloğu / Product Catalog
 * ---------------------------------------------------------------
 * Bu dosya sitenin varsayılan ürün verisidir. Backend yoktur.
 * Admin panelinden yapılan değişiklikler tarayıcıda (localStorage)
 * saklanır ve JSON olarak dışa aktarılabilir. İleride /admin API'si
 * yazıldığında veriyi oradan çekmek için app.js içindeki
 * loadProducts() fonksiyonunu düzenlemen yeterli.
 *
 * Her ürün iki dilde (tr / en) ad, alt başlık ve açıklama içerir.
 * "customizable: true" olan ürünlerde müşteri ek yazı ekleyebilir.
 */
window.AVIRON_PRODUCTS = [
  /* ===================== MADALYA ASKILARI ===================== */
  {
    id: "zirve",
    category: "aski",
    featured: true,
    name: { tr: "Zirve", en: "Summit" },
    subtitle: { tr: "Madalya Askısı", en: "Medal Hanger" },
    desc: {
      tr: "Aviron'un imzası. Dağ silüetiyle yükselen lazer kesim metal askı; zirveye giden her yarışın anısını duvarına taşır.",
      en: "Aviron's signature piece. A laser-cut metal hanger rising with a mountain silhouette — every race that led to the summit, on your wall."
    },
    customizable: false,
    customPrompt: { tr: "Üstüne yazılacak isim / slogan", en: "Name / slogan to engrave" },
    customExample: { tr: "örn. AHMET YILMAZ", en: "e.g. AHMET YILMAZ" },
    images: ["tile_aviron.jpg"]
  },
  {
    id: "azim",
    category: "aski",
    featured: true,
    name: { tr: "Azim", en: "Never Give Up" },
    subtitle: { tr: "Madalya Askısı", en: "Medal Hanger" },
    desc: {
      tr: "\"Never Give Up\" — pes etmeyenlerin manifestosu. Her madalya, vazgeçmediğin bir anın kanıtı olarak yan yana dizilir.",
      en: "\"Never Give Up\" — a manifesto for those who push through. Each medal lines up as proof of a moment you refused to quit."
    },
    customizable: false,
    customPrompt: { tr: "Eklemek istediğin yazı", en: "Text to add" },
    customExample: { tr: "örn. KEEP GOING", en: "e.g. KEEP GOING" },
    images: ["tile_nevergiveup.jpg"]
  },
  {
    id: "demir-adam",
    category: "aski",
    featured: true,
    name: { tr: "Demir Adam", en: "Iron" },
    subtitle: { tr: "Triatlon Madalya Askısı", en: "Triathlon Medal Hanger" },
    desc: {
      tr: "Swim · Bike · Run. Yüz, pedalla, koş. Triatletlerin üç disiplinini tek barda buluşturan silüetli askı. İstersen bitiş sürelerini de yazdır.",
      en: "Swim · Bike · Run. Three disciplines on a single silhouetted bar. Add your finish splits if you like."
    },
    customizable: false,
    customPrompt: { tr: "İsim ve/veya bitiş süreleri", en: "Name and/or finish times" },
    customExample: { tr: "örn. KOEN — 5:41:26", en: "e.g. KOEN — 5:41:26" },
    images: ["tile_triathlon.jpg", "photo_triathlon_wall.jpg", "photo_triathlon_pro.jpg"]
  },
  {
    id: "ritim",
    category: "aski",
    name: { tr: "Ritim", en: "Run" },
    subtitle: { tr: "Koşu Madalya Askısı", en: "Running Medal Hanger" },
    desc: {
      tr: "run. Asfaltın ritmi, bitiş çizgisinin coşkusu. 5K'dan maratona her koşunun madalyası burada asılı kalır.",
      en: "run. The rhythm of the road, the rush of the finish line. From 5K to marathon, every medal hangs here."
    },
    customizable: false,
    customPrompt: { tr: "İsim / mesafe", en: "Name / distance" },
    customExample: { tr: "örn. FINISHER 42.195K", en: "e.g. FINISHER 42.195K" },
    images: ["tile_run.jpg"]
  },
  {
    id: "akinti",
    category: "aski",
    name: { tr: "Akıntı", en: "Swim" },
    subtitle: { tr: "Yüzme Madalya Askısı", en: "Swimming Medal Hanger" },
    desc: {
      tr: "Kulaç kulaç kazanılmış her madalya için. Yüzücü silüetiyle tasarlanmış, açık su ve havuz derecelerini onurlandıran askı.",
      en: "For every medal earned stroke by stroke. A swimmer-silhouette hanger honoring your pool and open-water results."
    },
    customizable: false,
    customPrompt: { tr: "İsim / kulüp", en: "Name / club" },
    customExample: { tr: "örn. OPEN WATER 2026", en: "e.g. OPEN WATER 2026" },
    images: ["tile_swim.jpg", "photo_swim.jpg"]
  },
  {
    id: "servis",
    category: "aski",
    name: { tr: "Servis", en: "Ace" },
    subtitle: { tr: "Tenis Madalya Askısı", en: "Tennis Medal Hanger" },
    desc: {
      tr: "Raket motifli, kort tutkunlarına özel. Gümüş ve siyah metal seçenekleriyle; turnuva adını üstüne yazdırabilirsin.",
      en: "A racket-motif hanger for court lovers. In silver or black metal — engrave your tournament name on top."
    },
    customizable: false,
    customPrompt: { tr: "Turnuva / kulüp adı", en: "Tournament / club name" },
    customExample: { tr: "örn. WIMBLEDON", en: "e.g. WIMBLEDON" },
    images: ["tile_tennis.jpg", "photo_tennis_silver.jpg", "photo_tennis_black.jpg", "photo_tennis_wimbledon.jpg"]
  },
  {
    id: "fora",
    category: "aski",
    name: { tr: "Fora", en: "Crew" },
    subtitle: { tr: "Kürek Madalya Askısı", en: "Rowing Medal Hanger" },
    desc: {
      tr: "Aviron, Fransızca'da \"kürek\" demek. Ekibin silüeti ve kürek terimleriyle bezeli bu askı, regatta madalyalarının doğal evi.",
      en: "\"Aviron\" is French for rowing. Adorned with a crew silhouette and rowing terms — the natural home for your regatta medals."
    },
    customizable: false,
    customPrompt: { tr: "Kulüp / ekip adı", en: "Club / crew name" },
    customExample: { tr: "örn. KAYA — PAIR 8+", en: "e.g. KAYA — PAIR 8+" },
    images: ["photo_rowing.jpg", "photo_rowing2.jpg"]
  },
  {
    id: "patika",
    category: "aski",
    name: { tr: "Patika", en: "Trail" },
    subtitle: { tr: "Ultra Trail Madalya Askısı", en: "Ultra Trail Medal Hanger" },
    desc: {
      tr: "Dreams & Dedication. Dağ patikalarının, ultra mesafelerin ve gece koşularının askısı. Bitirdiğin parkurun adını taşı.",
      en: "Dreams & Dedication. For mountain trails, ultra distances and night runs. Carry the name of the course you conquered."
    },
    customizable: false,
    customPrompt: { tr: "Yarış / parkur adı", en: "Race / course name" },
    customExample: { tr: "örn. BELGRAD ULTRA TRAIL", en: "e.g. BELGRAD ULTRA TRAIL" },
    images: ["photo_trail.jpg"]
  },
  {
    id: "cok-yonlu",
    category: "aski",
    name: { tr: "Çok Yönlü", en: "Multi-Sport" },
    subtitle: { tr: "Multi-Sport Madalya Askısı", en: "Multi-Sport Medal Hanger" },
    desc: {
      tr: "Swim · Cycle · Run · Row. Tek bir branşa sığmayanlara. Tüm disiplinlerinin madalyalarını tek, güçlü bir kompozisyonda topla.",
      en: "Swim · Cycle · Run · Row. For those who won't fit in one discipline. Gather every medal in one bold composition."
    },
    customizable: false,
    customPrompt: { tr: "İsim / slogan", en: "Name / slogan" },
    customExample: { tr: "örn. DO IT ALL", en: "e.g. DO IT ALL" },
    images: ["photo_multisport.jpg"]
  },
  {
    id: "bedel",
    category: "aski",
    name: { tr: "Bedel", en: "No Pain No Gain" },
    subtitle: { tr: "Madalya Askısı", en: "Medal Hanger" },
    desc: {
      tr: "\"No Pain No Gain.\" Sade, güçlü, doğrudan. Her damla terin karşılığını duvarında görmek isteyenler için.",
      en: "\"No Pain No Gain.\" Clean, strong, direct. For those who want to see the reward for every drop of sweat on their wall."
    },
    customizable: false,
    customPrompt: { tr: "Eklemek istediğin yazı", en: "Text to add" },
    customExample: { tr: "örn. EARNED NOT GIVEN", en: "e.g. EARNED NOT GIVEN" },
    images: ["photo_nopainnogain.jpg"]
  },

  /* ===================== ÇERÇEVELER ===================== */
  {
    id: "rolyef",
    category: "cerceve",
    featured: true,
    name: { tr: "Rölyef", en: "Relief" },
    subtitle: { tr: "3D Koşu Rotası + Pace", en: "3D Route + Pace" },
    desc: {
      tr: "Parkurunun gerçek yükseltileriyle kabartma haline getirilmiş 3D rota. Mesafe, tırmanış ve pace bilgileriyle; bir yarış değil, bir arazi.",
      en: "Your course rendered in true-elevation 3D relief. With distance, ascent and pace — not just a race, but a landscape."
    },
    customizable: true,
    customPrompt: { tr: "Rota adı & derece (mesafe / süre / pace)", en: "Route name & stats (distance / time / pace)" },
    customExample: { tr: "örn. TIERRA ROJA — 108.15 mi", en: "e.g. TIERRA ROJA — 108.15 mi" },
    images: ["tile_3droute.jpg", "photo_3droute_hand.jpg"]
  },
  {
    id: "panorama",
    category: "cerceve",
    featured: true,
    name: { tr: "Panorama", en: "Collection" },
    subtitle: { tr: "Çoklu Madalya Çerçevesi", en: "Multi-Medal Shadow Box" },
    desc: {
      tr: "Koleksiyonunu bir sanat eserine çevir. Izgara düzeninde, derinlikli shadow-box çerçeve; en değerli madalyalarını sergiler.",
      en: "Turn your collection into a piece of art. A deep grid shadow box that showcases your most treasured medals."
    },
    customizable: true,
    customPrompt: { tr: "Plaka yazısı (isim / dönem)", en: "Plaque text (name / era)" },
    customExample: { tr: "örn. 2019–2026 KOLEKSİYON", en: "e.g. 2019–2026 COLLECTION" },
    images: ["tile_multimedal.jpg"]
  },
  {
    id: "iz",
    category: "cerceve",
    name: { tr: "İz", en: "Route" },
    subtitle: { tr: "Madalya + Rota Çerçevesi", en: "Medal + Route Frame" },
    desc: {
      tr: "O tek madalya ve onu kazandığın rota, yan yana. Minimal tipografi ve harita baskısıyla; anlatısı olan bir çerçeve.",
      en: "That one medal and the route that earned it, side by side. Minimal typography and a map print — a frame with a story."
    },
    customizable: true,
    customPrompt: { tr: "Etkinlik adı, tarih ve derece", en: "Event name, date and result" },
    customExample: { tr: "örn. ANY MARATHON — 3:07:57", en: "e.g. ANY MARATHON — 3:07:57" },
    images: ["tile_medalroute.jpg", "photo_route_weekend.jpg"]
  },
  {
    id: "zafer",
    category: "cerceve",
    name: { tr: "Zafer", en: "Colors" },
    subtitle: { tr: "Madalya + Forma Çerçevesi", en: "Medal + Jersey Frame" },
    desc: {
      tr: "Yarış forman, göğüs numaran ve madalyan bir arada. O günün tüm parçalarını koruyan, hikâyeni tam anlatan çerçeve.",
      en: "Your race jersey, bib and medal together. A frame that preserves every piece of the day and tells the whole story."
    },
    customizable: true,
    customPrompt: { tr: "Plaka yazısı", en: "Plaque text" },
    customExample: { tr: "örn. LONDON 2024 — FINISHER", en: "e.g. LONDON 2024 — FINISHER" },
    images: ["tile_medaljersey.jpg"]
  },
  {
    id: "ani",
    category: "cerceve",
    name: { tr: "Anı", en: "Memoir" },
    subtitle: { tr: "Madalya + Bib + Fotoğraf", en: "Medal + Bib + Photo" },
    desc: {
      tr: "Madalya, göğüs numarası ve bitiş fotoğrafın bir arada. O anı — teri, gülümsemeyi, rakamı — birlikte çerçeveler.",
      en: "Medal, race bib and your finish photo together. It frames the moment — the sweat, the smile, the number."
    },
    customizable: true,
    customPrompt: { tr: "Plaka yazısı (etkinlik / tarih)", en: "Plaque text (event / date)" },
    customExample: { tr: "örn. TCS — 10806", en: "e.g. TCS — 10806" },
    images: ["tile_medalbib.jpg"]
  },
  {
    id: "besli",
    category: "cerceve",
    name: { tr: "Beşli", en: "Big 5" },
    subtitle: { tr: "Big 5 Çerçeve", en: "Big 5 Frame" },
    desc: {
      tr: "Beş madalya, tek bir zarif yatay çerçevede. Bir serinin, bir yılın ya da bir hedefin tamamlanışını kutlayan kompozisyon.",
      en: "Five medals in one elegant horizontal frame. A composition that celebrates a series, a year, or a goal completed."
    },
    customizable: true,
    customPrompt: { tr: "Her madalya için etiket / seri adı", en: "Label per medal / series name" },
    customExample: { tr: "örn. THE BIG FIVE 2026", en: "e.g. THE BIG FIVE 2026" },
    images: ["tile_big5.jpg"]
  }
];
