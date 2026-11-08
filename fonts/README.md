# Fonty

Pliki `.woff2` są ładowane przez `next/font/local` w `fonts.js`.

| Plik               | Font   | Grubość |
| ------------------ | ------ | ------- |
| `inter-300.woff2`  | Inter  | 300     |
| `inter-400.woff2`  | Inter  | 400     |
| `inter-500.woff2`  | Inter  | 500     |
| `outfit-300.woff2` | Outfit | 300     |
| `outfit-500.woff2` | Outfit | 500     |

## Pochodzenie

Wygenerowane z fontów zmiennych z repozytorium Google Fonts:

- `Inter[opsz,wght].ttf` – https://github.com/google/fonts/tree/main/ofl/inter
- `Outfit[wght].ttf` – https://github.com/google/fonts/tree/main/ofl/outfit

Każdy plik to jedna grubość (`wght`, dla Inter także `opsz=14`) ograniczona do
zestawów znaków `latin` + `latin-ext` (polskie znaki), skonwertowana do WOFF2
narzędziem [`subset-font`](https://www.npmjs.com/package/subset-font).

Licencja: SIL Open Font License 1.1 (`LICENSE-Inter.txt`, `LICENSE-Outfit.txt`).
