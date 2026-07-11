# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt

Strona [meshcorepolska.org](https://meshcorepolska.org), czyli polska społeczność sieci mesh MeshCore. Express 5 + EJS (SSR), CommonJS, Node >= 20.6. Cała treść strony i komunikaty są po polsku. Licencja PolyForm Noncommercial 1.0.0.

## Uruchamianie

```
node index.js
```

Wymaga pliku `.env` (wzór w `.env.default`; ładowany przez `process.loadEnvFile()`, nie dotenv). Zmienne: `NODE_ENV`, `DOMAIN`, `PORT`, `DISCORD_INVITE_CODE`. `DOMAIN` to pełny adres strony z protokołem, używany też w canonicalach i tagach OG.

- Brak kroku budowania. Frontend to czysty CSS i vanilla JS serwowane z `public/`.
- Brak testów (skrypt `npm test` odwołuje się do jesta, którego nie ma w zależnościach).
- Lint: `npx eslint .` (flat config w `eslint.config.mjs`; eslint nie jest w devDependencies).
- Produkcja: PM2, aplikacja nazywa się `mcpl` (`ecosystem.config.js`). Deploy: `npm run update` (pull + `npm ci --omit=dev` + `pm2 restart mcpl`). Serwer po starcie wysyła `process.send('ready')` (PM2 `wait_ready`).

## Architektura

`index.js` składa całość: helmet (bez CSP), `express.static('public')`, morgan, rate limiter (tylko w produkcji), timeout, potem routery i obsługa błędów.

- `routes/Pages.js`: strony HTML. `/` renderuje `views/index.ejs`, `/discord` przekierowuje na zaproszenie Discord (celowo `discord.com/invite` zamiast `discord.gg`, żeby uniknąć łańcucha przekierowań).
- `routes/Api.js`: `/api/v1/discord-stats`, jedyny endpoint API. Dane z `services/discordInvite.js` (invite API Discorda) z 60-sekundowym cache w pamięci procesu, plus `Cache-Control: public, max-age=60` na odpowiedzi. Liczby członków/online są przybliżone (approximate_* z API).
- `utils/renderError.js`: wszystkie błędy (404/429/500/503) renderują `views/error.ejs` z polskim komunikatem.
- Widoki: `views/includes/header.ejs` przyjmuje `title` i `description`; strony przekazują też `siteUrl` i `canonicalUrl` (routing musi je dostarczyć do `res.render`).
- `public/js/mesh-map.js`: animowana mapa Polski na canvasie w hero (kontur kraju z geoBoundaries uproszczony do 300 punktów, deterministyczny PRNG z seedem, graf węzłów z gwarancją spójności, krawędzie testowane na przecięcie z granicą). Zmiana układu siatki = zmiana seeda w `mulberry32(...)`.
- `public/js/main.js`: pobiera statystyki Discorda i odsłania widget w hero.
- `public/js/lightbox.js`: powiększanie obrazów w overlayu; podpina się pod każdy link `a[data-lightbox]`.

## Styl kodu

- Tabulatory, pojedyncze cudzysłowy, średniki, `prefer-const`, przecinki końcowe w wieloliniowych tablicach/obiektach (patrz `eslint.config.mjs`).
- Nie dodawaj komentarzy w kodzie, właściciel utrzymuje kod bez komentarzy.
- Pliki w `public/js` to skrypty przeglądarkowe (IIFE, globalne API przeglądarki); reszta to CommonJS pod Node.
