---
title: Wprowadzenie
description: Czym jest Noise Floor w MeshCore, jak znaleźć źródło zakłóceń i kiedy zastosować filtr.
---

W trakcie budowy.

---

## Podstawowe pojęcia i skróty
Niektóre z nich zostały ustalone przez naszą społeczność. W kolumnie `Pojęcie` słowa pokrywają się z naszym oficjalnym tłumaczeniem w aplikacji MeshCore. Nie znajdziesz więc tutaj żadnej rozbieżności ani nie pomylisz się przy czymkolwiek.

| Pojęcie                        | Ang. tł.         | Co oznacza?                                                                                                                                                 |
|--------------------------------|:-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Preset                         |                  | Gotowy zestaw ustawień radia, m.in. częstotliwość, szerokość pasma, SF i CR. Urządzenia muszą korzystać z tego samego presetu, aby się ze sobą komunikować. |
| Współczynnik rozpraszania (SF) | Spreading Factor | Wyższa wartość ułatwia odbiór słabszego sygnału, ale wydłuża czas nadawania.                                                                                |
| Współczynnik kodowania (CR)    | Coding Rate      | Określa ilość danych dodawanych w celu korekcji błędów. Większa odporność oznacza dłuższy czas nadawania.                                                   |
| Advert                         |                  | Pakiet rozgłoszeniowy z informacjami o urządzeniu - pojawi się na liście kontaktów.                                                                         |
| Advert 0-hop                   | Advert Zero Hop  | Advert lokalny, który dociera tylko do urządzeń znajdujących się w bezpośrednim zasięgu radiowym. Repeatery nie przekazują go dalej.                        |
| Advert do wszystkich           | Flood Routed     | Advert rozsyłany przez sieć i przekazywany dalej przez repeatery. Dzięki temu może dotrzeć również do urządzeń poza bezpośrednim zasięgiem.                 |
| Companion                      |                  | Urządzenie LoRa, które łączy się z telefonem lub komputerem przez Bluetooth lub USB. Służy do wysyłania i odbierania wiadomości.                            |
| Repeater (RPT)                 |                  | Węzeł (tzw. przekaźnik), który przekazuje dalej odebrane pakiety i zwiększa zasięg sieci.                                                                   |
| Room Server (RS)               |                  | Osobny firmware. Zwykle używany do grupowych, lokalnych rozmów. Przechowuje historię wiadomości i udostępnia ją użytkownikom po połączeniu.                 |
| Antena dookólna (360)          |                  | Antena nadająca i odbierająca sygnał we wszystkich kierunkach wokół siebie.                                                                                 |
| Antena kierunkowa              |                  | Antena skupiająca sygnał w wybranym kierunku. Wymaga odpowiedniego ustawienia. Zwykle może zapewnić większy zasięg w tym kierunku.                          |


## Noise Floor - czym jest?
Jest to wskaźnik poziomu szumu i zakłóceń odbieranych przez radio. Im bardziej ujemny wynik, tym lepiej: `-120 dB` oznacza znacznie lepsze warunki niż `-90 dB`.
Wysoki NF utrudnia odbiór słabszych repeaterów i zmniejsza realny zasięg.

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

### Jak prawidłowo sprawdzić NF?
Nie sugeruj się jednym odczytem. Sprawdź NF kilka razy i porównaj wyniki o różnych porach. Porównuj pomiary wykonane na tym samym urządzeniu, z tą samą anteną i konfiguracją.

### Co może podnosić NF?
Najczęściej są to zasilacze impulsowe, przetwornice, ładowarki USB, falowniki, optymalizatory instalacji fotowoltaicznych i inna elektronika.
Sam przewód zwykle nie jest źródłem problemu, ale może przenosić i wypromieniowywać zakłócenia.

Częstotliwość, na której działamy (869,618 MHz), znajduje się pomiędzy pasmami LTE 800 (B20) i LTE 900 (B8).
Duża liczba pobliskich BTS-ów również może mieć wpływ na NF.

### Jak znaleźć źródło zakłóceń?
Zacznij od przeniesienia płytki w inne miejsce. Jeżeli jest to możliwe, zasil ją bezpośrednio z ogniwa (np. 18650) i odłączaj po kolei elektronikę znajdującą się w pobliżu.
Po każdej zmianie sprawdź NF ponownie. W ten sposób szybko ustalisz, czy problem jest lokalny.
Jeśli zasilasz płytkę przez PoE, częstym powodem może okazać się nawet sam splitter.

### Kiedy filtr ma sens?
Filtr może pomóc, gdy odbiornik jest zagłuszany przez silne sygnały spoza naszej częstotliwości. Pamiętaj, że nie usunie on zakłóceń występujących dokładnie na 869,618 MHz.
Najpierw zmień lokalizację i wyklucz pobliską elektronikę, a dopiero potem kupuj filtr.

### Polecane filtry BPF
1. [Goły filtr](https://pl.aliexpress.com/item/1005007438690164.html) - tania opcja. Płytkę można dodatkowo zabezpieczyć np. kolejną warstwą termokurczu.
2. [Filtr z obudową](https://pl.aliexpress.com/item/1005007509062592.html) - zalecana opcja, jeśli budżet nie boli. NF raczej stosunkowo się nie poprawi względem pierwszej propozycji, aczkolwiek możliwe, że filtr w takiej wersji przetrwa znacznie dłużej.

### Mam filtr, co dalej? Ważne!
Przed podłączeniem koniecznie sprawdź maksymalną dopuszczalną moc wejściową filtra. Jeśli wynosi ona 20 dBm (100 mW), ustaw moc nadawania na nie więcej niż 20 dBm. Przekroczenie tej wartości może uszkodzić filtr.
Niestety coś kosztem czegoś.
