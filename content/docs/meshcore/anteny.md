---
title: Lista anten
description: Porównanie popularnych anten do modułów LoRa 868 MHz - zasięg, zysk, złącza.
---

W trakcie budowy.

---


# Lista anten
Spis anten, których używamy lub używaliśmy. Polecamy te od GIZONT-a. Nie wierz w podany zysk.

## Pod companiony
1. [AliExpress](https://pl.aliexpress.com/item/1005004607615001.html) `(zysk 10 dBi)` - znakomita pod companiona, da się na niej sporo kilometrów wykręcić.
2. [AliExpress](https://pl.aliexpress.com/item/1005007308749444.html) `(zysk 10 dBi)` - nie kupuj opcji z kablem. Przeczytaj informacje na samym dole.
3. [AliExpress](https://pl.aliexpress.com/item/1005007308749444.html) `(zysk 10 dBi)` - taki tam stojący kikucik.
4. [AliExpress](https://pl.aliexpress.com/item/1005001386195377.html) `(zysk 3 dBi)` - mały kikucik. Jeśli jesteś bardzo blisko jakiegokolwiek RPT, a z companionem i tak nie wychodzisz na dwór, wersja 5 cm lub 11 cm będzie w sam raz.

## Pod repeatery
1. [AliExpress](https://pl.aliexpress.com/item/1005007463706065.html) `(zysk 8 dBi)` - znakomita pod RPT, wykręciliśmy na niej ponad 10 km (companion w aucie, antena nr 1 z listy powyżej). Istnieje jeszcze [taka podobna](https://pl.aliexpress.com/item/1005006109449349.html), aczkolwiek mieliśmy jej w łapach. Bierz wersję 55 cm. Napisz do sprzedającego, że chcesz biały kolor. Pod żadnym pozorem nie bierz czarnej. Biała lepiej odbija promienie słoneczne i mniej się nagrzewa.
2. [Allegro](https://allegro.pl/oferta/antena-dipol-atk-10-800-980-mhz-12-8-dbi-lte900-do-licznikow-energii-7339950391) `(ATK-10, zysk 12,8 dBi)` - znakomita antena kierunkowa. Pamiętaj, że ATK-10 nadaje też trochę na boki. Istnieje również ATK-20, która ma większy zysk ale za to jest jeszcze większa.
    - [Allegro](https://allegro.pl/oferta/przewod-antenowy-gsm-wlan-lte-50-om-tri-lan-240-1m-8383105296) - koncentryk, około 30-40 cm powinno wystarczyć.
    - [Allegro](https://allegro.pl/oferta/wtyk-n-zaciskany-na-przewod-rf-5-tri-lan-240-h-155-zloty-18298610874) - wtyk N na koncentryk.
3. [AliExpress](https://pl.aliexpress.com/item/1005005869328733.html) `(zysk 7 dBi)` - mniejsza antena kierunkowa, jeśli np. przeszkadza Ci wielkość ATK-10. Ona również nadaje trochę na boki, ale mniej niż ATK-10 - zdecydowanie mniej wydajniejsza

## Pod BLE
1. [AliExpress](https://pl.aliexpress.com/item/1005009684416243.html) - taka mi wystarczyła, można wybrać długość przewodu. Przykleiłem ją od spodu puszki. Nie widzę sensu robić inaczej.
2. [AliExpress](https://pl.aliexpress.com/item/1005008294463974.html) - plastikowa, w większości przypadków powinna być OK.

## Zalecenia przewodów
Nigdy nie używaj pigtaila `1.13 Cable`, ma on czarną izolację. Więcej strat w TX niż pożytku. Używaj `RG178`. Jest jeszcze lepsza wersja, czyli `RG316`. Chińczycy nie produkują jednak takich kabli ze złączem `RF-1`, bo nie jest to standardowa konfiguracja. Jeśli napiszesz do sprzedawcy na AliExpress, powinien zrobić go na zamówienie. Ostrzegam: taki pigtail nie będzie zbyt elastyczny. W niektórych przypadkach złącze `RF-1` może samo odpiąć się od płytki. W każdym razie i tak zalecam `RG178`.

## Filtry BPF
Używaj ich wyłącznie wtedy, gdy masz bardzo wysoki NF. Więcej informacji na ich temat znajdziesz [tutaj](/dokumentacja/meshcore/wprowadzenie#noise-floor---czym-jest).
