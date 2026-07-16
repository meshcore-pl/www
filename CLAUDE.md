# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Strona [meshcorepolska.org](https://meshcorepolska.org), czyli polska społeczność sieci mesh MeshCore. Express 5 + EJS (SSR), CommonJS, Node >= 20.12. Cała treść strony i komunikaty są po polsku. Licencja PolyForm Noncommercial 1.0.0.

## Uruchamianie

```
node index.js
```

Wymaga pliku `.env` (wzór w `.env.default`; ładowany przez `process.loadEnvFile()`, nie dotenv). Zmienne: `NODE_ENV`, `DOMAIN`, `PORT`, `DISCORD_INVITE_CODE`. `DOMAIN` to pełny adres strony z protokołem, bez ukośnika na końcu; przypisywany raz przy starcie do `app.locals.domain` i stamtąd widoczny we wszystkich widokach (canonicale, tagi OG).

- Brak kroku budowania. Frontend to czysty CSS i JS serwowane bezpośrednio z `public/`.
- Brak testów (skrypt `npm test` odwołuje się do jesta, którego nie ma w zależnościach).
- Lint: `npx eslint .` (flat config w `eslint.config.mjs`; eslint nie jest w devDependencies).
- Produkcja: PM2, aplikacja nazywa się `mcpl` (`ecosystem.config.js`). Deploy: `npm run update` (pull + `npm ci --omit=dev` + `pm2 restart mcpl`). Serwer po starcie wysyła `process.send('ready')` (PM2 `wait_ready`).
- `services/IndexNow.js` to samodzielny skrypt (nie route) do ręcznego zgłaszania URL-i z `public/sitemap.xml` do IndexNow; wymaga pliku klucza w `public/`.

## Architektura

`index.js` składa całość: helmet (bez CSP), `express.static('public')`, morgan, rate limiter (tylko w produkcji), timeout, potem routery i obsługa błędów. `app.locals.domain` ustawiany raz przy starcie.

- `routes/Pages.js`: strony statyczne. `/` renderuje `views/index.ejs`, `/discord` przekierowuje na zaproszenie Discord (celowo `discord.com/invite` zamiast `discord.gg`, żeby uniknąć łańcucha przekierowań).
- `routes/Api.js`: `/api/v1/discord-stats`, jedyny endpoint API. Dane z `services/discordInvite.js` (invite API Discorda) z 60-sekundowym cache w pamięci procesu, plus `Cache-Control: public, max-age=60` na odpowiedzi. Liczby członków/online są przybliżone (approximate_* z API).
- `utils/renderError.js`: wszystkie błędy (404/429/500/503) renderują `views/error.ejs` z polskim komunikatem; `title`/`description` liczone są w samym widoku na podstawie `status`, bez `canonical` (strony błędów nie mają linku kanonicznego).
- Widoki: `views/includes/header.ejs` przyjmuje płaskie pola `title`, `description`, opcjonalne `keywords`, `noindex`, `canonical` (ścieżka względna, np. `/dokumentacja`; brak = brak `<link rel="canonical">`), `css` (nazwa lub tablica nazw arkuszy w `public/css`) oraz `page` używane jako `data-page` na `<body>`. `domain` pochodzi z `app.locals` (ustawiony raz w `index.js`, widoczny automatycznie wszędzie, bez przeliczania na każdy request). Dane są statyczne albo liczone bezpośrednio w wywołaniu `include`; wyjątkiem jest `routes/Docs.js` dla pojedynczej strony dokumentacji, gdzie `title`, `description` i `canonical` muszą zostać policzone w trasie, bo trafiają też do odpowiedzi JSON używanej przez `docs-router.js`.
- `public/js/mesh-map.js`: animowana mapa Polski na canvasie w hero (kontur kraju z geoBoundaries uproszczony do 300 punktów, deterministyczny PRNG z seedem, graf węzłów z gwarancją spójności, krawędzie testowane na przecięcie z granicą). Zmiana układu siatki = zmiana seeda w `mulberry32(...)`.
- `public/js/index.js`: pobiera statystyki Discorda i odsłania widget w hero strony głównej.
- `public/js/lightbox.js`: powiększanie obrazów w overlayu; podpina się pod każdy link `a[data-lightbox]`.
- `public/js/nav.js`: zachowanie nagłówka (cień przy scrollu, mobilne menu).

### System dokumentacji (`/dokumentacja`)

Treść dokumentacji jest plikami Markdown, renderowanymi server-side, z SPA-podobną nawigacją po stronie klienta.

- `data/docs.js`: statyczna struktura grup i stron (slug, title, icon, description dla każdej grupy; slug/title dla każdej strony). To jedyne źródło prawdy o tym, jakie strony istnieją i w jakiej kolejności.
- `content/docs/<grupa>/<slug>.md`: treść stron, frontmatter (`title`, `description`) + Markdown. Każda strona wpisana w `data/docs.js` musi mieć odpowiadający plik `.md`, inaczej `services/docs.js` wyrzuci błąd przy starcie (pliki są czytane synchronicznie raz, przy imporcie modułu).
- `services/docs.js`: wczytuje i parsuje wszystkie strony przy starcie procesu (`marked` + `frontmatter-md`), buduje spis treści (h2/h3) i cache'uje wynik w pamięci (`Map`). Nagłówkom nadaje `id` (slugified, z obsługą polskich znaków diakrytycznych) do kotwiczenia w TOC. Zmiana treści `.md` wymaga restartu procesu, nie ma hot reloadu.
- `routes/Docs.js`: trzy trasy — indeks, grupa, pojedyncza strona. Indeks i grupa to zawsze pełny render EJS. Tylko trasa pojedynczej strony (`/dokumentacja/:group/:slug`) potrafi odpowiedzieć na dwa sposoby: pełny render EJS albo JSON z wyrenderowanym fragmentem HTML (gdy request ma nagłówek `X-Docs-Fetch: 1`) — używane przez router kliencki do podmiany treści bez przeładowania strony.
- `public/js/docs-router.js`: ładowany wyłącznie na stronach dokumentów, przechwytuje kliknięcia w linki prowadzące do innych stron dokumentów (`/dokumentacja/:group/:slug`), robi `fetch` z `X-Docs-Fetch: 1`, podmienia `#docs-view` i metadane (title, canonical, OG) bez pełnego przeładowania. Linki do indeksu czy strony grupy nie są przechwytywane — to zwykła nawigacja przeglądarki. Zarządza cyklem życia modułów stron przez `public/js/lib/page.js` (rejestr `init`/`destroy` per moduł, żeby np. listenery scrolla z poprzedniej strony nie zostały po nawigacji).
- `public/js/docs.js`: logika strony treści dokumentacji (podświetlanie bloków kodu, aktywna pozycja w spisie treści przy scrollu, płynne przewijanie do kotwic). Rejestruje się przez `definePage()` z `lib/page.js`, więc `docs-router.js` woła jego `init`/`destroy` przy każdej nawigacji SPA.
- Pliki `public/js/docs.js`, `docs-router.js`, `lib/page.js` to moduły ES (`import`/`export`, `type="module"` w EJS), inne skrypty w `public/js` są zwykłymi skryptami globalnymi ładowanymi z `defer`.

## Styl kodu

- Tabulatory, pojedyncze cudzysłowy, średniki, `prefer-const`, przecinki końcowe w wieloliniowych tablicach/obiektach (patrz `eslint.config.mjs`).
- Nie dodawaj komentarzy w kodzie, właściciel utrzymuje kod bez komentarzy.
- Nie używaj znaku — (pauzy) w plikach zapisywanych do repo.
- Backend (`routes/`, `services/`, `middlewares/`, `utils/`) to CommonJS (`require`/`module.exports`). `public/js` to skrypty przeglądarkowe: większość to globalne IIFE-podobne skrypty bez modułów, ale pliki związane z dokumentacją (`docs.js`, `docs-router.js`, `lib/page.js`) są modułami ES.
