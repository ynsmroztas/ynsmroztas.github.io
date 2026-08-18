# mitsec — ynsmroztas.github.io v2

Dark + neon, terminal estetiğinde çok sayfalı portfolyo + **admin paneli**.
Build adımı yok, framework yok — dosyaları repoya koy, Pages yayınlar.

## Dosyalar

```
index.html        ana sayfa (hero, stats, tools, writeups, CVE, skills, contact)
tools.html        etiket filtreli tool arşivi
writeups.html     etiket filtreli writeup arşivi
research.html     CVE timeline + Hall of Fame
lab.html          interaktif sandbox terminal
admin.html        içerik yönetim paneli  ← burası
content.json      TÜM içerik burada (tek kaynak)
assets/style.css  tasarım sistemi (renk/tipografi/komponent)
assets/render.js  ortak render fonksiyonları (build + tarayıcı)
assets/app.js     runtime (matrix, ⌘K palet, filtre, typing, lab)
robots.txt        admin.html'i indekslemez
.nojekyll         GitHub Pages'in Jekyll'i atlaması için
```

## Kurulum

```bash
git clone https://github.com/ynsmroztas/ynsmroztas.github.io
cd ynsmroztas.github.io
# eski astro dosyalarini temizle (istersen once yedek al: git branch backup-astro)
cp -r /yeni/site/* .
git add -A && git commit -m "site: v2 redesign + admin panel" && git push
```

Settings → Pages → Source: `main` / root. 1-2 dk içinde yayında.

> Astro'yu bırakmak istersen: bu dosyaları `public/` altına koy, `astro.config` içindeki
> sayfaları sil. Pages `dist/`'i yayınlar, statik dosyalar aynen kopyalanır.

## Admin paneli

`https://ynsmroztas.github.io/admin.html`

- **Varsayılan parola:** `mitsec` → panel içinden *"panel parolasını değiştir"* ile değiştir.
  (Parola sadece UI'yi gizler, statik sitede gerçek auth yok — asıl koruma token'da.)
- Sol menüden bölüm seç: Genel / Statlar / Tools / Writeups / CVE / Skills / HOF / Linkler.
- Her kayıt: düzenle, sırala (↑↓), sil. Yeni kayıt en üste eklenir.
- Düzenlemeler otomatik olarak tarayıcı taslağına yazılır — sekmeyi kapatsan da kaybolmaz.

### Yayınlama — 2 yol

**1. GitHub'a doğrudan commit (önerilen)**

*Yayınla* sekmesinde:

| alan | değer |
|---|---|
| owner | `ynsmroztas` |
| repo | `ynsmroztas.github.io` |
| branch | `main` |
| dosya yolu | `content.json` |
| token | fine-grained PAT |

Token oluştur: GitHub → Settings → Developer settings → **Fine-grained tokens** →
Repository access: sadece `ynsmroztas.github.io` → Permissions: **Contents: Read and write**.
Başka hiçbir izne gerek yok. Token yalnızca senin tarayıcının `localStorage`'ında durur,
"token'ı unut" ile silinir.

**2. Manuel**

*content.json indir* → dosyayı repo köküne koy → commit.

## İçerik ekleme (panel olmadan)

`content.json` düzenlemen yeterli, HTML'e dokunma:

```json
{ "name": "YeniTool", "tag": "recon", "lang": "Python",
  "url": "https://github.com/ynsmroztas/yenitool",
  "desc": "Ne yaptığı." }
```

Sayfalar `content.json`'ı fetch edip kendini yeniden çizer.
Statik HTML'i de tazelemek istersen (SEO/no-JS için):

```bash
node build.js
```

## Özellikler

- ⌘K / Ctrl+K / `/` → global komut paleti (tool, writeup, CVE, link araması)
- Dark ↔ light tema, tercihi hatırlar
- Matrix rain + grid + glow arka plan katmanları (`prefers-reduced-motion` saygılı)
- Scroll reveal, animasyonlu skill bar'ları, HOF marquee
- Etiket filtreleri (tools & writeups)
- Hero'da yazılan canlı terminal, `lab.html`'de çalışan sandbox shell
- Tam responsive — 390px'de yatay taşma yok
