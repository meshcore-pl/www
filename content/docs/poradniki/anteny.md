---
title: Lista anten
description: Porównanie popularnych anten do modułów LoRa 868 MHz - zasięg, zysk, złącza.
---

# Lista anten

## Anteny dookólne (omnidirectional)

Idealne do węzłów stacjonarnych i mobilnych - nadają i odbierają sygnał we wszystkich kierunkach.

| Model | Zysk | Złącze | Długość | Uwagi |
|---|---|---|---|---|
| Taoglas FXP73 | 1.5 dBi | U.FL | 194 mm | Elastyczna, do montażu wewnętrznego |
| Linx ANT-868-CW-HWR | 2.0 dBi | SMA | 87 mm | Kompaktowa, dobra do prototypów |
| Molex 2137720100 | 3.0 dBi | SMA-RP | 195 mm | Solidna, do zastosowań przemysłowych |
| Fiberglass 868 5dBi | 5.0 dBi | N-type | 440 mm | Zewnętrzna, wysoki zysk |

## Anteny kierunkowe (directional)

Do połączeń punkt-punkt na duże odległości (kilometry).

| Model | Zysk | Kąt poziomy | Złącze | Zasięg szacowany |
|---|---|---|---|---|
| Yagi 868 MHz 9dBi | 9.0 dBi | 45° | N-type | ~15 km (LOS) |
| Panel 868 12dBi | 12.0 dBi | 30° | N-type | ~25 km (LOS) |
| Grid Parabolic 16dBi | 16.0 dBi | 15° | N-type | ~40 km (LOS) |

## Przewody i adaptery

| Typ | Zastosowanie |
|---|---|
| U.FL → SMA pigtail 15 cm | Wyprowadzenie anteny z obudowy |
| SMA(m) → N-type(f) | Adapter do zewnętrznych anten |
| Kabel LMR-400 | Gruby kabel niskostatyczny, do wież i masztów |

## Wskazówki montażowe

### Polaryzacja

MeshCore używa polaryzacji pionowej. Ustaw antenę pionowo, inaczej stracisz kilka dB efektywnego zasięgu.

### Przepięcia

Jeśli antena jest na zewnątrz, koniecznie zastosuj ogranicznik przepięć (surge protector) między kablem a urządzeniem.

### Kable

Każde 10 m kabla LMR-200 to ok. 1.5 dB straty. Przy długich trasach używaj LMR-400 lub bezpośrednio montuj urządzenie przy antenie.
