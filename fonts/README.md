# Fonty

Pliki `.woff2` są ładowane przez `next/font/local` w `fonts.js`.

| Plik               | Font   | Grubość |
| ------------------ | ------ | ------- |
| `roboto-300.woff2` | Roboto | 300     |
| `roboto-400.woff2` | Roboto | 400     |
| `roboto-500.woff2` | Roboto | 500     |
| `outfit-300.woff2` | Outfit | 300     |
| `outfit-500.woff2` | Outfit | 500     |

## Pochodzenie

Wygenerowane z fontów zmiennych z repozytorium Google Fonts:

- `Roboto[wdth,wght].ttf` – https://github.com/google/fonts/tree/main/ofl/roboto
- `Outfit[wght].ttf` – https://github.com/google/fonts/tree/main/ofl/outfit

Każdy plik to jedna grubość (`wght`, dla Roboto także `wdth=100`) ograniczona do
zestawów znaków `latin` + `latin-ext` (polskie znaki), skonwertowana do WOFF2
narzędziem [`subset-font`](https://www.npmjs.com/package/subset-font).

Licencja: SIL Open Font License 1.1 (`LICENSE-Roboto.txt`, `LICENSE-Outfit.txt`).
