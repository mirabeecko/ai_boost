# AI Boost – Webová prezentace

[![GitHub](https://img.shields.io/badge/GitHub-ai__boost-blue?logo=github)](https://github.com/mirabeecko/ai_boost)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Moderní, responzivní jednoduchá webová stránka pro službu AI Boost – 3denní transformace firmy pomocí AI.

## ✨ Funkce

- 🎨 **Sexy moderní design** s gradienty a animacemi
- 📱 **Plně responzivní** – perfektní na mobilu, tabletu i desktopu
- ⚡ **Rychlé načítání** – vanilla JS, žádné frameworky
- 🎭 **Interaktivní animace** – hover efekty, floating elementy, pulsing ikony
- 📧 **PHP kontaktní formulář** s validací a AJAX odesláním
- 🔒 **GDPR compliant** – cookie banner, privacy modal
- 🎯 **SEO optimalizované** – meta tagy, Open Graph, JSON-LD
- ♿ **Přístupné** – ARIA atributy, správný kontrast

## 🌐 Live Demo

Otevřete `index.html` ve vašem prohlížeči nebo spusťte lokální server:

```bash
# Python 3
python3 -m http.server 8000

# PHP
php -S localhost:8000
```

Poté otevřete: http://localhost:8000

## 📁 Struktura projektu

```
ai-boost/
├── index.html          # Hlavní stránka (one-page)
├── styles.css          # Stylování (mobile-first)
├── script.js           # Interaktivita a validace
├── send.php            # Zpracování kontaktního formuláře
├── README.md           # Tento soubor
└── img/                # Složka pro obrázky
    ├── hero-illustration.svg
    ├── og-image.jpg
    └── icons/
        ├── clock.svg
        ├── chart.svg
        ├── rocket.svg
        ├── scale.svg
        ├── eye.svg
        └── support.svg
```

## 🚀 Nasazení na web hosting

### Krok 1: Připravte soubory

1. Stáhněte všechny soubory z této složky
2. Připravte obrázky (viz sekce "Obrázky" níže)

### Krok 2: Nahrání na hosting

**Přes FTP:**

1. Připojte se k vašemu webhostingu přes FTP klienta (např. FileZilla)
   - Host: ftp.vas-hosting.cz
   - Username: vaše_uživatelské_jméno
   - Password: vaše_heslo

2. Nahrajte všechny soubory do kořenové složky webu (většinou `public_html` nebo `www`)

3. Ujistěte se, že struktura souborů je zachována

**Přes webové rozhraní (cPanel):**

1. Přihlaste se do cPanelu vašeho hostingu
2. Otevřete "Správce souborů" (File Manager)
3. Přejděte do složky `public_html`
4. Nahrajte všechny soubory pomocí tlačítka "Nahrát" (Upload)

### Krok 3: Konfigurace e-mailů

1. Otevřete soubor `send.php`
2. Na řádku 29 zkontrolujte, že je správně nastavený e-mail:
   ```php
   $recipient_email = 'miroslavbrozek@gmail.com';
   ```
3. Uložte změny

### Krok 4: Test kontaktního formuláře

1. Otevřete váš web v prohlížeči
2. Přejděte na sekci "Kontakt"
3. Vyplňte testovací formulář
4. Zkontrolujte, zda vám přišel e-mail

**Pokud e-mail nepřišel:**

- Zkontrolujte SPAM složku
- Kontaktujte váš hosting a ověřte, zda podporuje PHP funkci `mail()`
- Pokud `mail()` nefunguje, použijte SMTP řešení (viz níže)

### Krok 5: Nastavení obrázků

Nahraďte placeholder obrázky vlastními:

- `/img/hero-illustration.svg` – ilustrace AI pro hero sekci
- `/img/og-image.jpg` – náhledový obrázek pro sociální sítě (1200×630 px)
- `/img/icons/*.svg` – ikony pro benefit karty (můžete stáhnout z [Heroicons](https://heroicons.com/) nebo [Feather Icons](https://feathericons.com/))

## 📧 Pokud nefunguje mail() funkce

### Řešení: PHPMailer se SMTP

Některé hostingy blokují `mail()` funkci. V tom případě použijte PHPMailer:

1. **Stáhněte PHPMailer:**
   - https://github.com/PHPMailer/PHPMailer/archive/refs/heads/master.zip

2. **Nahrajte na server:**
   - Vytvořte složku `/lib/PHPMailer/`
   - Nahrajte soubory `PHPMailer.php`, `SMTP.php`, `Exception.php`

3. **Upravte send.php:**
   - Odkomentujte sekci "ALTERNATIVE: PHPMailer for SMTP" na konci souboru
   - Vyplňte údaje vašeho SMTP serveru:
     ```php
     $mail->Host       = 'smtp.example.com';        // např. smtp.gmail.com
     $mail->Username   = 'your-email@example.com';  // váš e-mail
     $mail->Password   = 'your-password';           // vaše heslo
     $mail->Port       = 587;                       // port (587 nebo 465)
     ```

4. **Pro Gmail SMTP:**
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Zapněte "Méně zabezpečené aplikace" nebo použijte "Hesla aplikací"

## 🎨 Přizpůsobení designu

### Změna barev

Otevřete `styles.css` a upravte CSS proměnné na začátku souboru:

```css
:root {
  --color-primary: #2563EB;      /* Hlavní modrá */
  --color-secondary: #0EA5E9;    /* Sekundární azurová */
  --color-accent: #10B981;       /* Zelená pro akcentaci */
  /* ... další barvy ... */
}
```

### Změna textů

Všechny texty jsou přímo v souboru `index.html`. Najděte příslušnou sekci a upravte obsah.

### Změna písma

V souboru `styles.css` na řádku 22:

```css
--font-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif;
```

Případně přidejte Google Font do `<head>` v `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

A aktualizujte CSS:

```css
--font-base: 'Inter', sans-serif;
```

## 🔒 GDPR a soukromí

Web obsahuje:

- ✅ Modal s informacemi o zpracování osobních údajů
- ✅ Souhlas uživatele před odesláním formuláře
- ✅ Cookie banner (pouze funkční cookies)
- ✅ Honeypot pole proti spamu

Pro plnou GDPR compliance doporučujeme:

1. Konzultovat s právníkem specifika vašeho podnikání
2. Doplnit případně podrobnější dokument "Zásady ochrany osobních údajů"
3. Evidovat souhlasy uživatelů (volitelně ukládat do databáze)

## 📊 SEO optimalizace

Web obsahuje:

- ✅ Správné HTML5 sémantické značky
- ✅ Meta tagy (title, description)
- ✅ Open Graph a Twitter Cards
- ✅ JSON-LD strukturovaná data
- ✅ Optimalizované nadpisy (H1, H2, H3)
- ✅ Alt texty pro obrázky

### Doporučené další kroky:

1. **Ověřte web v Google Search Console:**
   - https://search.google.com/search-console

2. **Vytvořte sitemap.xml:**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://vas-web.cz/</loc>
       <lastmod>2025-11-08</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

3. **Vytvořte robots.txt:**
   ```
   User-agent: *
   Allow: /
   Sitemap: https://vas-web.cz/sitemap.xml
   ```

4. **Přidejte Google Analytics (volitelně):**
   - Přidejte GA4 kód do `<head>` v `index.html`

## ⚡ Výkon a rychlost

Web je optimalizován pro rychlost:

- ✅ Žádné externí knihovny (čistý vanilla JS)
- ✅ Minimalističký CSS (mobile-first)
- ✅ Lazy loading obrázků
- ✅ Preconnect na fonty

### Jak dále zlepšit výkon:

1. **Minifikujte CSS a JS:**
   - Online nástroj: https://www.minifier.org/
   - Přejmenujte na `styles.min.css` a `script.min.js`
   - Aktualizujte odkazy v HTML

2. **Optimalizujte obrázky:**
   - Použijte formát WebP pro menší velikost
   - Komprimujte obrázky: https://tinypng.com/

3. **Zapněte HTTPS:**
   - Většina moderních hostingů nabízí Let's Encrypt zdarma
   - HTTPS je důležité pro SEO a bezpečnost

4. **Povolte kompresi GZIP:**
   - Přidejte do `.htaccess`:
     ```apache
     <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/css application/javascript
     </IfModule>
     ```

## 📱 Responzivita

Web je plně responzivní a testovaný na:

- 📱 Mobilní telefony (320px+)
- 📱 Tablety (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Velké obrazovky (1440px+)

## ♿ Přístupnost

Web splňuje základní standardy přístupnosti:

- ✅ Správný kontrast textu
- ✅ Focus styly pro klávesnicovou navigaci
- ✅ ARIA atributy
- ✅ Alt texty pro obrázky
- ✅ Sémantické HTML

## 🐛 Řešení častých problémů

### Formulář se neodešle

1. Zkontrolujte konzoli prohlížeče (F12) pro chyby
2. Ověřte, že `send.php` má správná práva (644)
3. Zkontrolujte, že hosting podporuje PHP
4. Otestujte SMTP alternativu

### Obrázky se nezobrazují

1. Zkontrolujte cestu k obrázkům v HTML
2. Ověřte, že složka `/img/` má správná práva (755)
3. Nahrajte placeholder obrázky nebo vlastní

### Menu nefunguje na mobilu

1. Zkontrolujte, že je správně nahrán `script.js`
2. Otevřete konzoli (F12) a zkontrolujte JavaScript chyby

### Stránka není vidět na Googlu

1. Může trvat několik týdnů, než Google stránku zaindexuje
2. Přidejte web do Google Search Console
3. Vytvořte a odešlete sitemap.xml

## 📞 Podpora

Pro technickou podporu nebo dotazy kontaktujte:

- **E-mail:** miroslavbrozek@gmail.com
- **Lokalita:** Krupka a okolí

## 📄 Licence

Tento web byl vytvořen pro službu AI Boost. Všechna práva vyhrazena.

---

**Verze:** 1.0
**Poslední aktualizace:** 2025-11-08
**Vytvořeno pomocí:** Vanilla HTML, CSS, JavaScript + PHP
