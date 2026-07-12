---
title: Komendy CLI
description: Pełna lista komend interfejsu CLI MeshCore z tłumaczeniem na język polski.
---

## Komendy podstawowe

| Komenda | Opis |
|---|---|
| `help` | Wyświetla listę dostępnych komend |
| `status` | Pokazuje aktualny stan węzła (czas pracy, sygnał, bateria) |
| `reboot` | Restartuje urządzenie |
| `reset factory` | Przywraca ustawienia fabryczne (uwaga: usuwa wszystkie dane) |

## Konfiguracja węzła

| Komenda | Opis |
|---|---|
| `set name <nazwa>` | Ustawia nazwę węzła widoczną w sieci |
| `set channel <nazwa>` | Ustawia nazwę kanału (musi być taka sama u wszystkich) |
| `set txpower <0-22>` | Ustawia moc nadawania w dBm |
| `set freq <MHz>` | Ustawia częstotliwość (np. `868.0`) |
| `get config` | Wyświetla aktualną konfigurację |

## Sieć i routing

| Komenda | Opis |
|---|---|
| `nodes` | Lista wszystkich znanych węzłów w sieci |
| `ping <node_id>` | Wysyła ping do konkretnego węzła |
| `traceroute <node_id>` | Pokazuje ścieżkę pakietu do celu |
| `mesh stats` | Statystyki sieci mesh (pakiety, retransmisje, kolizje) |

## Wiadomości

| Komenda | Opis |
|---|---|
| `send <node_id> <treść>` | Wysyła wiadomość do konkretnego węzła |
| `broadcast <treść>` | Wysyła wiadomość do wszystkich węzłów |
| `msg history` | Historia ostatnich wiadomości |

## Diagnostyka

| Komenda | Opis |
|---|---|
| `lora stats` | Statystyki radia LoRa (RSSI, SNR, airtime) |
| `log level <debug\|info\|warn\|error>` | Zmienia poziom logowania |
| `log dump` | Wyświetla ostatnie logi systemowe |
| `battery` | Aktualny poziom naładowania baterii |

## Uwagi

Komendy CLI są dostępne przez port szeregowy (115200 baud) lub terminal w aplikacji MeshCore Companion. Wielkość liter nie ma znaczenia.
