# Pigeon Defenders UI Redesign Brief

## Goal
Improve the Pigeon Defenders website so it feels premium, local, trustworthy, and conversion-focused while keeping performance, SEO, and accessibility strong.

## Brand
- Company: Pigeon Defenders
- Phone: 236-999-5739
- Email: support@pigeondefenders.ca
- Tone: clear, confident, local, practical, human
- Core message: Keep Birds Out. Keep Your Space Safe.

## Visual Direction
- Use deep navy as the main anchor color, lime green only for action/highlight states, white for breathing room, and charcoal/slate for body text.
- Avoid heavy dark overlays that hide the real installation photos.
- Keep the design mobile-first, clean, polished, and contractor-professional.
- The site should feel like a reliable local service business, not a generic landing page.

## Homepage Improvements To Prioritize
- Hero: strong headline, real project image, simple quote/call actions, readable copy, no oversized cropped image panel that feels broken.
- Header: logo should look intentional and clean despite the non-transparent logo background.
- Services: clear cards with real images, consistent crop ratios, concise copy, and obvious service links.
- Gallery: make the photos feel like proof of real work. Add short captions that explain what the viewer is seeing.
- Trust/process: make this scannable and calm, not crowded.
- Contact/quote CTA: repeat naturally, with call, text, and form options.

## Performance Guardrails
- Do not use layout-shifting hero experiments.
- Keep image dimensions explicit.
- Keep hero image optimized and responsive.
- Avoid huge animation libraries.
- Use CSS transitions/scroll reveals only when they do not cause CLS.
- Keep mobile PageSpeed near or above 96.

## Image Assets
Use the corrected assets in `deliverables/corrected-pictures/` or the same files in `public/images/`.

Best hero candidates:
- `pigeon-defenders-hero-mobile.webp`
- `pigeon-defenders-hero-desktop.webp`
- `balcony-netting-focused-installation-640.webp`

Best service/gallery assets:
- `balcony-netting-focused-installation-640.webp`
- `condo-balcony-netting-focused-640.webp`
- `pigeon-spikes-close-up-installation-640.webp`
- `pigeon-spike-roofline-focused-640.webp`
- `balcony-cleaning-finished-space-640.webp`
- `pigeon-proof-balcony-before-after-focused-640.webp`
- `pet-safe-balcony-cat-netting-640.webp`

## Do Not Break
- SEO titles/meta
- LocalBusiness, Service, and FAQ schema
- sitemap.xml and robots.txt
- click-to-call and click-to-text links
- responsive mobile sticky call/text bar
- real business images
