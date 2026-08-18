# ASD Judo Karate Sommavilla — Sito ufficiale

Sito statico moderno per **ASD Judo Karate Sommavilla**: Judo (sport principale), Karate,
Difesa Personale e Psicomotricità, a **Villafranca di Verona** e **Sommacampagna**.

Costruito con **Astro 5** + **Vue 3** + **TypeScript**. Static-first: la maggior parte delle
pagine è renderizzata a build time; Vue viene usato solo dove serve interattività
(modale contatti, form e menu mobile). Le statistiche di visita usano l'unico script
esterno opt-in **Cloudflare Web Analytics** (cookieless, attivo solo se imposti il token).
Nessun cookie banner: il sito non utilizza strumenti che richiedono consenso.

---

## Requisiti

- Node.js ≥ 18.17 (consigliato: Node 20 o 22)
- npm

## Installazione

```bash
npm install
```

## Sviluppo

```bash
npm run dev
```

Apre il dev server su `http://localhost:4321`.

## Build di produzione

```bash
npm run build
```

Genera il sito statico in `dist/`. Le immagini vengono ottimizzate automaticamente
(WebP/AVIF, `srcset`, `width`/`height`).

## Preview della build

```bash
npm run preview
```

## Verifica TypeScript / diagnostica

```bash
npm run check
```

## Deploy su hosting Aruba

Il progetto genera HTML statico in `dist/`. Per pubblicare su **Aruba Hosting** carica
via FTP o tramite il File Manager l'intero contenuto di `dist/` nella directory radice
del sito (ad es. `www-data/` o `htdocs/`, a seconda del piano). Le pagine Astro hanno
percorsi `/privacy-policy/` ecc., quindi assicurati che l'hosting serva gli URL senza estensione.

Prima del deploy imposta il dominio reale del sito negli **unici** due punti che lo usano:
- `astro.config.mjs` → proprietà `site:`;
- `public/robots.txt` → riga `Sitemap:`.

> Nota: Aruba non fa da proxy verso Cloudflare, quindi Cloudflare Web Analytics usa la
> modalità **manuale** già implementata (beacon in `src/components/CloudflareAnalytics.astro`,
> payload verso `cloudflareinsights.com`). Devi solo registrare l'hostname del dominio reale
> nella dashboard Cloudflare Web Analytics e impostare `PUBLIC_CF_WEB_ANALYTICS_TOKEN`.

## Deploy su GitHub Pages (alternativa)

Il progetto può essere pubblicato anche su GitHub Pages caricando il contenuto di `dist/`
sul branch/pagine servito da Pages (lo YAML di esempio è in fondo al README).

---

## Struttura del progetto

```text
/
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   ├── logo.png
│   ├── robots.txt
│   ├── og/                     # immagini Open Graph (generate con `npm run og`)
│   └── images/placeholders/    # placeholder per foto non ancora disponibili
└── src/
    ├── assets/images/          # foto sorgente (ottimizzate da astro:assets)
    │   ├── courses/
    │   ├── home/
    │   └── instructors/
    ├── components/             # componenti Astro riutilizzabili
    │   ├── vue/                # isole Vue (modale, form, menu)
    │   └── CourseLayout.astro  # template pagine sport
    ├── content.config.ts       # schema del futuro blog (Content Collections)
    ├── data/                   # FONTE UNICA DEI DATI
    │   ├── site.ts
    │   ├── courses.ts
    │   ├── locations.ts
    │   ├── instructors.ts
    │   ├── contacts.ts
    │   ├── socials.ts
    │   ├── navigation.ts
    │   └── story.ts
    ├── layouts/BaseLayout.astro
    ├── pages/
    │   ├── index.astro
    │   ├── sport/              # judo, karate, difesa-personale, psicomotricita
    │   ├── sedi.astro
    │   ├── chi-siamo.astro
    │   ├── contatti.astro
    │   ├── privacy-policy.astro
    │   ├── cookie-policy.astro
    │   ├── 404.astro
    │   ├── blog/               # pronta per il blog
    │   └── news.astro
    ├── styles/                 # design system (tokens + global)
    └── utils/                  # seo, immagini, date, telefono
```

---

## Come modificare i contenuti

Tutte le informazioni sono centralizzate in `src/data/`. Quando cambia un dato,
si aggiorna **un solo file**.

### Aggiungere / modificare un corso

In `src/data/courses.ts`:

1. Aggiungi un nuovo elemento all'array `courses` (oppure modifica quello esistente).
2. Crea la pagina in `src/pages/sport/<slug>.astro` copiando il modello delle
   pagine esistenti (ad es. `judo.astro`).
3. Aggiungi il corso alla voce "Sport" della navigazione in `src/data/navigation.ts`.
4. Aggiungi la foto in `src/assets/images/courses/` (stessa chiave di `image`).

Campi principali del modello `Course`: `slug`, `name`, `number`, `tagline`,
`intro`, `whatYouLearn`, `benefits`, `targets`, `schedule`, `startDates`,
`locations`, `instructorSlugs`, `image`, `faqs`, `seo`.

### Modificare gli orari

In `src/data/courses.ts`, campo `schedule` del corso:

```ts
schedule: [
  { location: 'sommacampagna', group: 'Bambini', days: 'Lunedì e Giovedì', time: '17:00–18:00' },
  ...
],
```

Le date di inizio vanno nel campo `startDates` (formato ISO `yyyy-mm-dd`).

### Aggiungere un tecnico

In `src/data/instructors.ts`:

```ts
{
  slug: 'nome-cognome',
  name: 'Nome Cognome',
  role: 'Maestro',          // Maestro / Istruttore / Allenatore / Tecnico…
  grade: '5° DAN',          // lascia vuoto se non noto
  courses: ['judo'],        // slug dei corsi seguiti
  image: 'instructors/nome-cognome',
  bio: '',
},
```

Aggiungi poi la foto in `src/assets/images/instructors/`. Se non c'è foto, usa
`image: ''` e viene mostrato il placeholder.

### Modificare le sedi

In `src/data/locations.ts` (nome struttura, indirizzo, CAP, città, corsi ospitati,
query per Google Maps).

### Modificare i contatti

In `src/data/contacts.ts` (email, numero WhatsApp in formato E.164, referenti).
Numeri e messaggi WhatsApp usano automaticamente il formato internazionale.

### Sostituire le immagini

Le fotografie sorgente stanno in `src/assets/images/`. Basta rimpiazzare il file
mantenendo lo stesso nome: la resa nel sito resta identica (ottimizzazione,
dimensioni e alt testuali sono centralizzati nei dati e nei componenti).

Immagini non ancora disponibili → placeholder espliciti in `public/images/placeholders/`.

### Configurare Forminit

Il form invia una richiesta `POST` in `multipart/form-data` all'endpoint
configurato, usando la convenzione dei "Form Blocks" di Forminit: ogni campo è
nominato `fi-{blockType}-{name}` (es. `fi-sender-email`, `fi-text-message`).

```env
PUBLIC_FORM_ENDPOINT=
```

Copia `.env.example` in `.env` e inserisci l'endpoint ricevuto da Forminit
(es. `https://forminit.com/f/{formId}`). Se l'endpoint è vuoto, in sviluppo il
form simula l'invio con successo (utile per testare l'UX).

I blocchi inviati (da `onSubmit()` in `src/components/vue/ContactForm.vue`):

| Blocco Forminit | Campo del form |
| --- | --- |
| `fi-sender-firstName` | Nome |
| `fi-sender-lastName` | Cognome |
| `fi-sender-email` | Email |
| `fi-text-phone` | Telefono (blocco `text`: evita la validazione E.164 di `sender.phone`) |
| `fi-text-corso` | Corso scelto |
| `fi-text-sede` | Sede scelta |
| `fi-text-message` | Messaggio |

> Nota: un body JSON piatto con chiavi arbitrarie viene rifiutato da Forminit
> con `400 Bad Request`. Per cambiare i blocchi inviati adatta `onSubmit()`
> in `src/components/vue/ContactForm.vue`.

### Aggiungere articoli al blog

1. Crea un file `src/content/blog/mio-articolo.md` (Markdown).
2. Frontmatter (schema in `src/content.config.ts`):

```md
---
title: "Titolo dell'articolo"
description: "Breve descrizione per SEO e card."
publishDate: 2026-01-15
author: "Nome Cognome"
category: "News"      # Judo | Karate | Difesa Personale | Psicomotricità | News | Eventi | Società
tags: ["judo"]
image: ./cover.jpg    # opzionale
imageAlt: "Descrizione"
draft: false
---

Contenuto in Markdown…
```

L'articolo comparirà automaticamente in `/blog/` e in `/blog/titolo/`.


---

## SEO

- `title`, meta description, canonical, Open Graph e Twitter Card per ogni pagina
  (componente `src/components/SEO.astro`, layout `BaseLayout.astro`).
- Dati strutturati JSON-LD: `Organization` + `SportsOrganization`,
  `SportsActivityLocation` per le due sedi, `Course`, `FAQPage`, `BreadcrumbList`,
  `Person`, `Article` (blog).
- `sitemap-index.xml` generata automaticamente da `@astrojs/sitemap`.
- `robots.txt` in `public/robots.txt`.
- Breadcrumb visivi nelle pagine interne.
- URL puliti e SEO friendly (`/sport/judo/`, `/sport/psicomotricita/`, …).
- Heading gerarchici (un solo `H1` per pagina, da `course.seo.h1`).
- Keyword locali inserite in modo naturale (judo Villafranca di Verona,
  karate Sommacampagna, ecc.).

## Performance

- Immagini elaborate con `astro:assets` (WebP/AVIF, `srcset`, `sizes`,
  `width`/`height`, lazy loading sotto la fold, `fetchpriority="high"` sulla LCP).
- Font self-hosted con `font-display: swap` (Saira Condensed + Source Sans 3 Variable).
- JavaScript minimale: Astro static + poche isole Vue.
- Nessuna libreria UI, nessun iframe Google Maps (solo link), nessun feed social
  incorporato.
- CSS minimizzato e scoped per componente.

## Accessibilità

- HTML semantico (`header`, `nav`, `main`, `article`, `footer`), skip link.
- Navigazione da tastiera, focus visibile, focus trap nella modale.
- Modale: `aria-modal`, ESC, click fuori, scroll lock, chiusura con X.
- Form: label associate, errori associati ai campi (`aria-invalid`,
  `aria-describedby`), stati `aria-live` per successo/errore, anti double submit,
  honeypot anti-spam.
- Contrasti verificati (WCAG 2.2 AA dove possibile).
- `prefers-reduced-motion` rispettato.

## TODO noti

- **Foto reali**: sostituire le foto provvisorie in `src/assets/images/` con le
  fotografie ufficiali della società (stesso nome file = nessuna modifica al codice).
- **Giorgio Malesani**: aggiungere grado/qualifica quando disponibile
  (`src/data/instructors.ts`).
- **Enrico Felizzi**: grado non indicato nella comunicazione ufficiale (lasciato vuoto).
- **Instagram**: URL da configurare in `src/data/socials.ts` quando disponibile.
- **Facebook**: URL presente nella comunicazione precedente, da verificare.
- **Storia**: date e tappe storiche da completare in `src/data/story.ts`
  (non sono stati inventati dati).
- **Privacy/Cookie Policy**: bozze predisposte (vedi `src/pages/privacy-policy.astro` e
  `cookie-policy.astro`); vanno verificate/adattate da un professionista
  (titolare o consulente GDPR) e completati i placeholder.
- **Cloudflare Web Analytics**: impostare il token `PUBLIC_CF_WEB_ANALYTICS_TOKEN` per attivare il beacon.
- **Anno di fondazione**: da configurare in `src/data/site.ts`.

---

## Workflow GitHub Actions (esempio — solo se si usa GitHub Pages; con Aruba non serve)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## Variabili d'ambiente

| Variabile | Uso |
| --- | --- |
| `PUBLIC_FORM_ENDPOINT` | Endpoint Forminit per l'invio del modulo di contatto (vuoto = simulazione in locale) |
| `PUBLIC_FORMINIT_EMAIL` | Email di destinazione Forminit (opzionale, riservata per integrazioni future) |
| `PUBLIC_CF_WEB_ANALYTICS_TOKEN` | Token pubblico Cloudflare Web Analytics (se vuoto il beacon non viene caricato) |

Nessun segreto o API key viene esposto nel bundle client. Il token Cloudflare è pubblico
(compare nel client come da documentazione del fornitore) e non è una chiave segreta.

