# Pigeon Defenders

Premium static website for Pigeon Defenders, a Metro Vancouver bird-proofing company.

## Project Structure

- `src/pages/` - source HTML pages
- `src/styles/main.css` - source stylesheet
- `src/scripts/main.js` - source JavaScript
- `public/images/` - optimized site images
- `public/robots.txt` and `public/sitemap.xml` - SEO files copied to the site root
- `scripts/build.mjs` - static build script
- `dist/` - generated deployment output

## Commands

```sh
npm run build
npm run dev
```

`npm run build` creates the deployable static site in `dist/`. Vercel serves that folder.
