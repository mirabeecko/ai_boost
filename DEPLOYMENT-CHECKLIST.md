# 🚀 Checklist pro nasazení webu AI Boost

Použijte tento checklist pro úspěšné nasazení webu na hosting.

## ✅ Před nahráním na server

- [ ] Zkontrolujte, že máte všechny soubory:
  - [ ] `index.html`
  - [ ] `styles.css`
  - [ ] `script.js`
  - [ ] `send.php`
  - [ ] `README.md`
  - [ ] Složka `/img/` s ikonami a ilustracemi

- [ ] Vytvořte og-image.jpg (1200×630 px) podle instrukcí v `og-image-placeholder.txt`

- [ ] V `send.php` zkontrolujte e-mail na řádku 29:
  ```php
  $recipient_email = 'miroslavbrozek@gmail.com';
  ```

## ✅ Nahrání na hosting

- [ ] Připojte se k hostingu přes FTP nebo cPanel
- [ ] Nahrajte všechny soubory do složky `public_html` nebo `www`
- [ ] Zachovejte strukturu složek (hlavně `/img/icons/`)
- [ ] Nastavte práva souborů:
  - Soubory: 644 (rw-r--r--)
  - Složky: 755 (rwxr-xr-x)

## ✅ Testování

- [ ] Otevřete web v prohlížeči
- [ ] Zkontrolujte, že se všechny sekce správně zobrazují
- [ ] Otestujte navigaci v menu
- [ ] Zkontrolujte responzivitu na mobilu (F12 → Device Toolbar)
- [ ] Vyplňte a odešlete testovací formulář
- [ ] Zkontrolujte, že vám přišel e-mail (včetně SPAM složky)

## ✅ SEO a metadata

- [ ] Zkontrolujte title a description v `<head>`
- [ ] Ověřte Open Graph obrázek (og-image.jpg)
- [ ] Vytvořte `sitemap.xml` (šablona v README.md)
- [ ] Vytvořte `robots.txt` (šablona v README.md)
- [ ] Zaregistrujte web v Google Search Console

## ✅ Pokud formulář nefunguje

- [ ] Zkontrolujte konzoli prohlížeče (F12) pro chyby
- [ ] Ověřte, že `send.php` má správná práva (644)
- [ ] Kontaktujte hosting a ověřte podporu `mail()` funkce
- [ ] Pokud `mail()` nefunguje, nastavte SMTP (viz README.md)

## ✅ Optimalizace

- [ ] Minifikujte CSS a JS (volitelné, viz README.md)
- [ ] Optimalizujte obrázky (TinyPNG, Squoosh)
- [ ] Zapněte HTTPS certifikát (Let's Encrypt)
- [ ] Povolte GZIP kompresi v `.htaccess`

## ✅ Obsah

- [ ] Nahraďte placeholder obrázky vlastními
- [ ] Zkontrolujte všechny texty a ceny
- [ ] Ověřte kontaktní údaje
- [ ] Aktualizujte případové studie vlastními příklady

## ✅ GDPR a právní

- [ ] Zkontrolujte text v GDPR modalu
- [ ] Ověřte IČO v textu (Tělovýchovná jednota Krupka z.s., IČO 46070516)
- [ ] Konzultujte GDPR s právníkem (volitelné)

## ✅ Marketing

- [ ] Sdílejte web na sociálních sítích
- [ ] Přidejte odkaz do Google My Business
- [ ] Nastavte Google Analytics (volitelné)
- [ ] Připravte reklamní kampaně (Google Ads, Facebook, atd.)

## 📧 Kontakt pro podporu

Pokud narazíte na problémy:
- E-mail: miroslavbrozek@gmail.com
- Viz podrobný README.md pro řešení častých problémů

---

**Tip:** Vytiskněte si tento checklist a zaškrtávejte body postupně při nasazení webu.
