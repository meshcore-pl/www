---
title: Wprowadzenie
description: Czym jest MeshCore i jak zacząć.
---

# Wprowadzenie

## Czym jest MeshCore?

MeshCore to otwartoźródłowy firmware dla modułów LoRa, umożliwiający tworzenie zdecentralizowanych sieci mesh bez dostępu do internetu. Komunikacja odbywa się bezpośrednio między urządzeniami w zasięgu radiowym.

## Wymagania sprzętowe

Do uruchomienia MeshCore potrzebujesz jednego z obsługiwanych modułów:

| Moduł | Chip LoRa | Pasmo | Uwagi |
|---|---|---|---|
| Heltec V3 | SX1262 | 868 MHz | Popularny, ma wyświetlacz OLED |
| TTGO LoRa32 | SX1276 | 868 MHz | Tańsza alternatywa |
| RAK4631 | SX1262 | 868 MHz | Modularny, WisBlock |

## Instalacja firmware

### Przez przeglądarkę (zalecane)

Przejdź na stronę [flashera MeshCore](https://flasher.meshcore.io/) i podłącz urządzenie przez USB. Przeglądarka przeprowadzi cię przez cały proces.

### Przez PlatformIO

```bash
git clone https://github.com/ripplebiz/MeshCore
cd MeshCore
pio run -t upload -e heltec-v3
```

## Pierwsze uruchomienie

Po wgraniu firmware podłącz się przez Bluetooth lub USB i skorzystaj z aplikacji MeshCore Companion. Przy pierwszym uruchomieniu ustaw:

1. Nazwę węzła (node name)
2. Kanał (channel) - musi być identyczny u wszystkich węzłów w sieci
3. Moc nadawania (TX power)
