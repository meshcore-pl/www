---
title: Wprowadzenie
description: Czym jest MeshCore i jak zacząć.
---

W trakcie budowy.

---


## Noise Floor - czym jest?
Jest to wskaźnik poziomu szumu i zakłóceń odbieranych przez radio. Im bardziej ujemny wynik, tym lepiej: `-120 dB` oznacza znacznie lepsze warunki niż `-90 dB`.
Wysoki NF utrudnia odbiór słabszych repeaterów i zmniejsza realny zasięg.
Jeśli wynik jest słaby, spróbuj przenieść płytkę w inne miejsce i sprawdź, czy w pobliżu nie ma żadnego zasilacza impulsowego, przetwornicy, falownika lub innej elektroniki, która może powodować zakłócenia.
Należy również zwrócić uwagę na to, że częstotliwość, na której działamy (869,618 MHz), znajduje się pomiędzy pasmami LTE 800 (B20) i LTE 900 (B8). Spora liczba BTS-ów może mieć realny wpływ na NF.

### Poziomy NF

| NF                | Ocena                                | Co zrobić?                                                                                                 |
|-------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------|
| `≤ -120 dB`       | Super warunki                        | Nic, tylko się cieszyć! (:                                                                                 |
| `-120 do -110 dB` | Dobrze                               | Tragedii nie ma, będzie ok!                                                                                |
| `-110 do -100 dB` | Przeciętnie                          | Zmień lokalizację urządzenia. Jeśli to nie pomoże, rozważ filtr.                                           |
| `-100 do -90 dB`  | Źle                                  | Sprawdź NF w innym miejscu i przenieś urządzenie. Kolejnym krokiem jest filtr.                             |
| `-90 do -80 dB`   | Bardzo źle                           | Prawdopodobnie w pobliżu znajduje się silne źródło zakłóceń. Zmień miejsce, a w ostateczności użyj filtra. |
| `-80 do -70 dB`   | Fatalnie                             | Zmiana miejsca może nie wystarczyć. Użyj filtra.                                                           |
| `> -70 dB`        | Praktycznie brak warunków do odbioru | Wyrazy współczucia. Bez filtra zabawa z MeshCore raczej nie ma sensu.                                      |
