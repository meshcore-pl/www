---
title: Wprowadzenie
description: Słownik pojęć MeshCore (preset, SF, CR, advert) oraz zasady legalnego nadawania w paśmie 868-869 MHz - limity mocy ERP, duty cycle 10% i konfiguracja CLI.
createdAt: 13.07.2026
updatedAt: 21.07.2026
---

# Wprowadzenie
Dziękujemy za zainteresowanie tematem! Pamiętaj, że dokumentacja jest nadal w trakcie prac. Sama domena `meshcorepolska.org` nie ma jeszcze nawet dwóch miesięcy.
Witryna wraz z dokumentacją jest open source - kod źródłowy znajdziesz na [GitHubie](https://github.com/meshcore-pl/website).
Zapraszamy was wszystkich na [naszą grupę na Discordzie](https://meshcorepolska.org/discord).

**OSTRZEŻENIE: NIGDY NIE USTAWIAJ DOKŁADNEJ LOKALIZACJI SWOJEGO REPEATERA NA MAPIE!**

## Pojęcia, legalność i duty cycle
Niektóre z nich zostały ustalone przez naszą społeczność. W kolumnie `Pojęcie` słowa pokrywają się z naszym oficjalnym tłumaczeniem w aplikacji MeshCore. Nie znajdziesz więc tutaj żadnej rozbieżności ani nie pomylisz się przy czymkolwiek.

| Pojęcie                        | Ang. tł.         | Co oznacza?                                                                                                                                                 |
|--------------------------------|:-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Preset                         |                  | Gotowy zestaw ustawień radia, m.in. częstotliwość, szerokość pasma, SF i CR. Urządzenia muszą korzystać z tego samego presetu, aby się ze sobą komunikować. |
| Współczynnik rozpraszania (SF) | Spreading Factor | Wyższa wartość ułatwia odbiór słabszego sygnału, ale wydłuża czas nadawania.                                                                                |
| Współczynnik kodowania (CR)    | Coding Rate      | Określa ilość danych dodawanych w celu korekcji błędów. Większa odporność oznacza dłuższy czas nadawania.                                                   |
| Duty cycle                     |                  | Maksymalny procent czasu w ciągu godziny, w jakim urządzenie może nadawać. Patrz [Legalność i duty cycle](#legalnosc-i-duty-cycle) niżej.                   |
| Companion                      |                  | Urządzenie LoRa, które łączy się z telefonem lub komputerem przez Bluetooth lub USB. Służy do wysyłania i odbierania wiadomości.                            |
| Repeater (RPT)                 |                  | Węzeł (tzw. przekaźnik), który przekazuje dalej odebrane pakiety i zwiększa zasięg sieci.                                                                   |
| Room Server (RS)               |                  | Osobny firmware. Zwykle używany do grupowych, lokalnych rozmów. Przechowuje historię wiadomości i udostępnia ją użytkownikom po połączeniu.                 |
| Advert                         |                  | Pakiet rozgłoszeniowy z informacjami o urządzeniu - pojawi się na liście kontaktów.                                                                         |
| Advert 0-hop                   | Advert Zero Hop  | Advert lokalny, który dociera tylko do urządzeń znajdujących się w bezpośrednim zasięgu radiowym. Repeatery nie przekazują go dalej.                        |
| Advert do wszystkich           | Flood Routed     | Advert rozsyłany przez sieć i przekazywany dalej przez repeatery. Dzięki temu może dotrzeć również do urządzeń poza bezpośrednim zasięgiem.                 |
| Antena dookólna (360)          |                  | Antena nadająca i odbierająca sygnał we wszystkich kierunkach wokół siebie.                                                                                 |
| Antena kierunkowa              |                  | Antena skupiająca sygnał w wybranym kierunku. Wymaga odpowiedniego ustawienia. Zwykle może zapewnić większy zasięg w tym kierunku.                          |


## Legalność i duty cycle
`869.40-869.65 MHz` jest pasmem bezlicencyjnym (SRD: Short Range Device), a nie amatorskim. Nie potrzebujesz więc licencji krótkofalarskiej, żeby korzystać z MeshCore (869.618 MHz).

- Limit mocy to `500 mW ERP` (27 dBm)
- Limit duty cycle to **10%** (maksymalnie około 6 minut nadawania na godzinę)

Domyślny duty cycle dla repeaterów po sflashowaniu firmware to `50%`. To pięć razy więcej niż dopuszcza prawo dla tego zakresu. Ustaw go na `10%` komendą CLI:
```
set dutycycle 10
```

### Czy 10% duty cycle nie ogranicza za bardzo sieci?
Do komunikacji tekstowej w zupełności to wystarczy. Realny czas nadawania pojedynczego pakietu to zwykle od kilkuset milisekund do około 800 milisekund do 1.6 sekundy (zależnie od długości wiadomości). Poniżej znajdziesz zmierzone wartości na naszym presecie:

| Pakiet                                                    | Companion | Repeater (+1 hop) |
|-----------------------------------------------------------|-----------|-------------------|
| Advert 0-hop                                              | 1167 ms   | -                 |
| Advert do wszystkich                                      | 1167 ms   | 1183 ms           |
| Wiadomość „h” (1 znak)                                    | 517 ms    | 533 ms            |
| Wiadomość z pangramem „The quick brown fox...” (43 znaki) | 800 ms    | 817 ms            |
| Wiadomość Lorem ipsum (135 znaków, limit)                 | 1583 ms   | 1600 ms           |

Nawet najdłuższy z tych pakietów (1,6 s) zmieściłby się 225 razy w budżecie 6 minut na godzinę, wysyłany bez przerwy. Każdy hop przez repeater dokłada stały narzut - w tych pomiarach około 16-17 ms, niezależnie od długości wiadomości. Powyższe pomiary pochodzą z [nagrania SDR](https://www.youtube.com/watch?v=mbBEsTQGjNI).

Realnym ograniczeniem nie jest legalność, tylko skalowanie. Repeater przekazuje nie tylko wiadomości, ale i adverty rozgłoszeniowe do wszystkich z każdego urządzenia w zasięgu.

MeshCore posiada także system kolejek TX: 32 sloty dla RPT i RS, 16 dla companiona. Gdy ta się zapełni, pakiety po prostu czekają na swoją kolej.

### Moc nadajnika i zysk anteny (ERP)
Pamiętaj, że liczy się moc promieniowana (ERP), nie moc samego modułu. Zysk anteny (zobacz [listę anten](https://meshcorepolska.org/dokumentacja/meshcore/anteny)) dolicza się do mocy nadajnika.
Antena kierunkowa z wysokim zyskiem, ustawiona na maksymalną moc, łatwo przekroczy limit.

### Jak obliczyć ERP?
**Wzór na ERP:** `moc nadajnika w dBm` + `zysk anteny w dBi` - `2,15 dB`. Ta poprawka wynika z różnicy między:
- izotropem (dBi, punkt teoretyczny promieniujący równomiernie)
- anteną dipolową (dBd), do której odnosi się ERP

Pamiętaj, że dB to skala logarytmiczna. W tym wzorze najpierw sumujesz wartości w dB (moc nadajnika, zysk anteny, straty), dopiero na końcu odczytujesz sumę w mW - nie sumuje się osobno wartości w mW na każdym etapie.

| dBm                                | mW                                      |
|------------------------------------|-----------------------------------------|
| <span class="is-legal">20</span>   | <span class="is-legal">100,0</span>     |
| <span class="is-legal">21</span>   | <span class="is-legal">125,9</span>     |
| <span class="is-legal">22</span>   | <span class="is-legal">158,5</span>     |
| <span class="is-legal">23</span>   | <span class="is-legal">199,5</span>     |
| <span class="is-legal">24</span>   | <span class="is-legal">251,2</span>     |
| <span class="is-legal">25</span>   | <span class="is-legal">316,2</span>     |
| <span class="is-legal">26</span>   | <span class="is-legal">398,1</span>     |
| <span class="is-legal">27</span>   | <span class="is-legal">501,2</span>     |
| <span class="is-illegal">28</span> | <span class="is-illegal">631,0</span>   |
| <span class="is-illegal">29</span> | <span class="is-illegal">794,3</span>   |
| <span class="is-illegal">30</span> | <span class="is-illegal">1 000,0</span> |
| <span class="is-illegal">31</span> | <span class="is-illegal">1 258,9</span> |
| <span class="is-illegal">32</span> | <span class="is-illegal">1 584,9</span> |
| <span class="is-illegal">33</span> | <span class="is-illegal">1 995,3</span> |
| <span class="is-illegal">34</span> | <span class="is-illegal">2 511,9</span> |
| <span class="is-illegal">35</span> | <span class="is-illegal">3 162,3</span> |
| <span class="is-illegal">36</span> | <span class="is-illegal">3 981,1</span> |

27 dBm to prawie dokładnie 500 mW, dlatego jest jeszcze legalne. Każde złącze, przejściówka, kabel antenowy czy filtr pasmowy wprowadzają stratę, więc realny budżet mocy rzadko wychodzi równo.

**Scenariusz:** moduł nadający `20 dBm` z anteną `ATK-10` (`12,8 dBi` z [listy anten](https://meshcorepolska.org/dokumentacja/meshcore/anteny))  
**Obliczenie:** 20 + 12,8 - 2,15 = 30,65 dBm  
**Werdykt:** około `1161 mW` - ponad dwa razy więcej niż dozwolone `500 mW`. Nielegalne.
