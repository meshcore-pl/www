---
title: Wprowadzenie
description: Czym jest Noise Floor w MeshCore, jak znaleźć źródło zakłóceń i kiedy zastosować filtr.
createdAt: 13.07.2026
updatedAt: 18.07.2026
---

## Podstawowe pojęcia i skróty
Niektóre z nich zostały ustalone przez naszą społeczność. W kolumnie `Pojęcie` słowa pokrywają się z naszym oficjalnym tłumaczeniem w aplikacji MeshCore. Nie znajdziesz więc tutaj żadnej rozbieżności ani nie pomylisz się przy czymkolwiek.

| Pojęcie                        | Ang. tł.         | Co oznacza?                                                                                                                                                 |
|--------------------------------|:-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Preset                         |                  | Gotowy zestaw ustawień radia, m.in. częstotliwość, szerokość pasma, SF i CR. Urządzenia muszą korzystać z tego samego presetu, aby się ze sobą komunikować. |
| Współczynnik rozpraszania (SF) | Spreading Factor | Wyższa wartość ułatwia odbiór słabszego sygnału, ale wydłuża czas nadawania.                                                                                |
| Współczynnik kodowania (CR)    | Coding Rate      | Określa ilość danych dodawanych w celu korekcji błędów. Większa odporność oznacza dłuższy czas nadawania.                                                   |
| Companion                      |                  | Urządzenie LoRa, które łączy się z telefonem lub komputerem przez Bluetooth lub USB. Służy do wysyłania i odbierania wiadomości.                            |
| Repeater (RPT)                 |                  | Węzeł (tzw. przekaźnik), który przekazuje dalej odebrane pakiety i zwiększa zasięg sieci.                                                                   |
| Room Server (RS)               |                  | Osobny firmware. Zwykle używany do grupowych, lokalnych rozmów. Przechowuje historię wiadomości i udostępnia ją użytkownikom po połączeniu.                 |
| Advert                         |                  | Pakiet rozgłoszeniowy z informacjami o urządzeniu - pojawi się na liście kontaktów.                                                                         |
| Advert 0-hop                   | Advert Zero Hop  | Advert lokalny, który dociera tylko do urządzeń znajdujących się w bezpośrednim zasięgu radiowym. Repeatery nie przekazują go dalej.                        |
| Advert do wszystkich           | Flood Routed     | Advert rozsyłany przez sieć i przekazywany dalej przez repeatery. Dzięki temu może dotrzeć również do urządzeń poza bezpośrednim zasięgiem.                 |
| Antena dookólna (360)          |                  | Antena nadająca i odbierająca sygnał we wszystkich kierunkach wokół siebie.                                                                                 |
| Antena kierunkowa              |                  | Antena skupiająca sygnał w wybranym kierunku. Wymaga odpowiedniego ustawienia. Zwykle może zapewnić większy zasięg w tym kierunku.                          |

