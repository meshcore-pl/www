---
title: Lista anten
description: Porównanie popularnych anten do modułów LoRa 868 MHz - zasięg, zysk, złącza.
---

# Lista anten (których używam/używałem) (generalnie to polecam te od GIZONTa)
*nie wierz w podany zysk*
## Pod Companiony
1. [AliExpress](https://pl.aliexpress.com/item/1005004607615001.html) `(zysk niby 10 dBi)` - znakomita pod companiona, da się na niej sporo km wykręcić.
2. [AliExpress](https://pl.aliexpress.com/item/1005007308749444.html) `(zysk niby 10 dBi)` - Nie kupuj opcji z kablem. Przeczytaj info na samym dole.
3. [AliExpress](https://pl.aliexpress.com/item/1005007308749444.html) `(zysk niby 10 dBi)` - taki tam stojący kikucik
4. [AliExpress](https://pl.aliexpress.com/item/1005001386195377.html) `(zysk 3 dBi)` - mały kikucik, mam wersję 5 cm. Jeśli jesteś bardzo blisko jakiegokolwiek RPT, a z companionem i tak nie wychodzisz na dwór, to wersja 5 cm lub 11 cm będzie w sam raz
## Pod Repeatery
1. [AliExpress](https://pl.aliexpress.com/item/1005007463706065.html) `(zysk 8 dBi)` - znakomita pod RPT, wykręciłem na niej ponad 10 km (companion w aucie, antena nr. 1 z listy powyżej). Jeszcze istnieje [taka podobna](https://pl.aliexpress.com/item/1005006109449349.html), aczkolwiek nie miałem jej w łapach. Bierz wersje 55 cm. Napisz do sprzedającego że chcesz biały kolor - pod żadnym pozorem nie bierz czarnego. Biały lepiej odbija promienie słoneczne, najmniej się nagrzewa.
2. [Allegro](https://allegro.pl/oferta/antena-dipol-atk-10-800-980-mhz-12-8-dbi-lte900-do-licznikow-energii-7339950391) `(ATK-10, zysk 12,8 dBi)` - znakomita kierunkowa, pamiętaj że ATK-10 nadaje też trochę na boki. Istnieje także ATK-20, ma ona większy zysk + jest jeszcze większa.
    - [Allegro](https://allegro.pl/oferta/przewod-antenowy-gsm-wlan-lte-50-om-tri-lan-240-1m-8383105296) - koncentryk, długość 30cm-40cm około powinna starczyć
    - [Allegro](https://allegro.pl/oferta/wtyk-n-zaciskany-na-przewod-rf-5-tri-lan-240-h-155-zloty-18298610874) - wtyk N na koncentryka
3. [AliExpress](https://pl.aliexpress.com/item/1005005869328733.html) `(zysk 7 dBi)` - mniejsza antena kierunkowa, jeśli np. wielkość ATK-10 ci przeszkadza. ona również nadaje trochę na boki, ale mniej niż w przypadku ATK-10.
### Pod BLE
1. [AliExpress](https://pl.aliexpress.com/item/1005009684416243.html) - taka mi wystarczyła, gdyż można tam długość przewodu wybrać. Przykleiłem sobie ją od spodu puszki. Nie widzę sensu robić inaczej.
2. [AliExpress](https://pl.aliexpress.com/item/1005008294463974.html) - plastikowa, w większości przypadków powinna być OK.
## Zalecenia przewodów
Nigdy nie używaj pigtaila `1.13 Cable`, on ma taki czarny kolor izolacji. Więcej strat w TX niż pożytku. Używaj `RG178`. Ogólnie jest jeszcze lepsza wersja - `RG316`. Natomiast Chińczyki takich kabli ze złączem `RF-1` nie produkują - bo nie jest to standard. Natomiast jeśli Chińczykowi na AliExpress napiszesz, to ci go zrobi. Ostrzegam: nie będzie ten pigtail mocno elastyczny. W niektórych przypadkach złącze `RF-1` może samo ci się odpiąć od płytki. W każdym razie i tak zalecam `RG178`.
## Filtry BPF (używaj wyłącznie gdy masz bardzo niski NF)

