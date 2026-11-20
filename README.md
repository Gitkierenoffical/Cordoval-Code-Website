# Cordoval Code

Website for Cordoval Code, the free, open-source desktop AI coding app for Windows and Linux. It is the standalone site for [code.cordoval.co.uk](https://code.cordoval.co.uk).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
npm run preview
```

The production build is static files in `dist/`.

## Deploy on Vercel

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |

`vercel.json` permanently redirects `/code` to `/`, which is how the code host treats that path today. Other paths fall back to `index.html`, and the app then replaces the address with `/`.

Links to the rest of Cordoval stay absolute. The footer link to the main site is [https://cordoval.co.uk/](https://cordoval.co.uk/). Privacy and terms are not hosted here; they live at [https://www.cordoval.co.uk/privacy](https://www.cordoval.co.uk/privacy) and [https://www.cordoval.co.uk/terms](https://www.cordoval.co.uk/terms).
