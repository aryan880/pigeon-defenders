import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const pagesDir = join(root, "src/pages");
const sitemapPath = join(root, "public/sitemap.xml");
const site = "https://pigeondefenders.ca";
const phone = "236-999-5739";
const tel = "+12369995739";
const email = "support@pigeondefenders.ca";
const lastmod = "2026-06-01";

const cities = [
  { name: "Vancouver", slug: "vancouver", context: "downtown condos, older walk-up apartments, strata towers, storefront signs, and rooflines near busy commercial streets", note: "Vancouver properties often need discreet work because balconies, signs, ledges, and shared entrances are highly visible." },
  { name: "Burnaby", slug: "burnaby", context: "high-rise condos around Brentwood and Metrotown, townhomes, strata buildings, retail plazas, and mixed-use properties", note: "Burnaby jobs often involve balcony openings, roofline ledges, signs, and shared strata areas where clean presentation matters." },
  { name: "Richmond", slug: "richmond", context: "condos, low-rise strata buildings, warehouses, retail signs, exposed ledges, and properties close to open parking or loading areas", note: "Richmond projects often need durable exterior materials because open exposures and commercial zones can attract repeat roosting." },
  { name: "Surrey", slug: "surrey", context: "townhomes, condo balconies, storefronts, warehouses, signs, rooflines, and commercial entrances across growing neighbourhoods", note: "Surrey bird control often combines practical prevention with clear quoting for homes, businesses, and property managers." },
  { name: "Coquitlam", slug: "coquitlam", context: "condo balconies, strata buildings, townhomes, commercial fronts, covered entries, and roofline edges around busy residential areas", note: "Coquitlam properties often need tidy balcony protection and ledge deterrents that blend into newer building finishes." },
  { name: "North Vancouver", slug: "north-vancouver", context: "condos, apartments, townhomes, exposed balconies, building ledges, storefronts, and commercial rooflines near wet coastal conditions", note: "North Vancouver work benefits from clean detailing and exterior-rated materials because weather and visibility both matter." },
  { name: "West Vancouver", slug: "west-vancouver", context: "condos, homes, strata balconies, waterfront-facing properties, rooflines, ledges, and visible exterior architectural details", note: "West Vancouver jobs often require a refined finish because the protected area may be visible from patios, entries, or neighbouring homes." },
  { name: "Delta", slug: "delta", context: "homes, townhomes, commercial properties, warehouses, covered entries, rooflines, ledges, and balcony openings", note: "Delta projects often focus on durable deterrents and straightforward cleaning or exclusion for repeat bird pressure." },
  { name: "Langley", slug: "langley", context: "homes, townhomes, strata communities, warehouses, storefronts, signs, rooflines, and commercial loading areas", note: "Langley bird proofing often includes both residential comfort and practical commercial protection." },
  { name: "New Westminster", slug: "new-westminster", context: "condo towers, older apartment balconies, strata buildings, storefront signs, ledges, rooflines, and compact urban properties", note: "New Westminster projects often need balcony-focused solutions and careful work around visible ledges and shared building areas." },
];

const services = [
  {
    key: "bird-netting",
    title: "Balcony Bird Netting",
    slugPrefix: "bird-netting",
    serviceType: "Balcony bird netting and bird proofing",
    image: "balcony-netting-focused-installation-640.webp",
    imageWidth: 640,
    imageHeight: 857,
    imageAlt: "Balcony bird netting installation",
    keyword: "bird netting",
    h1: (city) => `Balcony Bird Netting ${city}`,
    titleTag: (city) => `Bird Netting for ${city} Condos | Pigeon Defenders`,
    desc: (city) => `Discreet balcony bird netting in ${city} for condos, apartments, strata buildings, and homes. Humane pigeon control. Call or text ${phone}.`,
    intro: (city) => `Balcony bird netting in ${city} is often the cleanest way to stop pigeons from entering a balcony, nesting behind furniture, or leaving droppings across the floor. Pigeon Defenders installs discreet netting systems for condos, apartments, townhomes, and strata properties where the balcony needs to stay bright, usable, and protected.`,
    benefits: ["Blocks pigeons from entering the full balcony opening", "Helps reduce droppings, feathers, nesting debris, and noise", "Keeps light and airflow while adding a physical bird barrier", "Can be paired with balcony cleaning before installation", "Works for many condo, apartment, and strata balcony layouts"],
    process: (city) => `We start by reviewing photos of the balcony opening, railing, ceiling, side gaps, and any nesting activity. For ${city} buildings, we also consider visibility, wind exposure, access, and strata expectations. The installation is planned around clean anchor points, consistent tension, and a finished look that feels intentional rather than temporary.`,
    materials: "Materials may include UV-stable bird netting, perimeter support line, clips, anchors, cable, and tensioning hardware selected for exterior exposure and a tidy finish.",
    faqs: [
      ["Is balcony bird netting visible from outside?", "Most balcony netting is selected and tensioned to be discreet from normal viewing distance. Visibility depends on lighting, balcony shape, and the chosen anchor points."],
      ["Can you install bird netting on high-rise balconies?", "Yes, where access and building rules allow. Photos help us confirm whether the balcony is a good fit and what installation method is appropriate."],
      ["Do you clean the balcony before installing netting?", "Yes. If pigeons have left droppings or nesting debris, balcony cleaning can be included before the netting is installed."],
      ["Is bird netting humane?", "Yes. Netting is an exclusion method that blocks access without trapping, poisoning, or harming birds."],
    ],
  },
  {
    key: "pigeon-spikes",
    title: "Pigeon Spike Installation",
    slugPrefix: "pigeon-spikes",
    serviceType: "Pigeon spike installation",
    image: "pigeon-spikes-close-up-installation-640.webp",
    imageWidth: 640,
    imageHeight: 618,
    imageAlt: "Pigeon spike installation on ledge",
    keyword: "pigeon spikes",
    h1: (city) => `Pigeon Spike Installation ${city}`,
    titleTag: (city) => `Pigeon Spikes ${city} | Pigeon Defenders`,
    desc: (city) => `Professional pigeon spike installation in ${city} for ledges, signs, beams, rooflines, gutters, and balconies. Humane bird deterrents. Call ${phone}.`,
    intro: (city) => `Pigeon spike installation in ${city} is a practical way to stop birds from landing on narrow ledges, beams, signs, gutters, rooflines, and balcony edges. Pigeon Defenders installs humane landing deterrents that help reduce droppings, repeat roosting, and visible mess on residential, strata, and commercial properties.`,
    benefits: ["Discourages pigeons from landing on ledges and rooflines", "Useful for signs, beams, gutters, parapets, and balcony edges", "Humane bird deterrent rather than a trap", "Can reduce repeat cleaning and staining", "Works well with netting or cleaning when pressure is heavier"],
    process: (city) => `We review photos to identify the exact landing zones and the surfaces birds are using. In ${city}, that might be a condo balcony cap, storefront sign, roofline edge, or exposed beam. The surface may be cleaned or prepared first, then the spike layout is installed to reduce gaps where pigeons could simply shift over and continue roosting.`,
    materials: "Materials may include UV-stable spike bases, stainless steel pins, exterior adhesive, surface-appropriate fasteners, and cleaning preparation where needed.",
    faqs: [
      ["Are pigeon spikes humane?", "Yes. Pigeon spikes are a landing deterrent. They make a surface uncomfortable to use without trapping or poisoning birds."],
      ["Where can pigeon spikes be installed?", "They can be installed on many ledges, beams, signs, rooflines, gutters, parapets, and narrow balcony edges when the surface is suitable."],
      ["Do pigeon spikes work for nesting balconies?", "Spikes work best on landing edges. If birds are entering a larger balcony opening, bird netting may be a better solution."],
      ["Can you quote pigeon spikes from photos?", "Often, yes. Clear photos showing the ledge, height, material, and bird activity help us recommend coverage."],
    ],
  },
  {
    key: "commercial-bird-control",
    title: "Commercial Bird Control",
    slugPrefix: "commercial-bird-control",
    serviceType: "Commercial bird control and bird proofing",
    image: "pigeon-spike-roofline-focused-640.webp",
    imageWidth: 640,
    imageHeight: 1012,
    imageAlt: "Commercial bird control pigeon spike installation",
    keyword: "commercial bird control",
    h1: (city) => `Commercial Bird Control ${city}`,
    titleTag: (city) => `Commercial Pigeon Control ${city} | Pigeon Defenders`,
    desc: (city) => `Commercial bird control in ${city} for storefronts, strata buildings, warehouses, signs, rooflines, ledges, and entrances. Call ${phone}.`,
    intro: (city) => `Commercial bird control in ${city} helps property managers, storefront owners, strata councils, warehouses, and local businesses reduce pigeon mess around visible and high-traffic areas. Pigeon Defenders installs humane bird proofing systems for signs, ledges, rooflines, beams, entrances, loading areas, and shared spaces.`,
    benefits: ["Reduces droppings near entrances, signs, walkways, and loading areas", "Helps protect visible building surfaces from repeat roosting", "Supports cleaner shared spaces for residents, customers, and staff", "Can include spikes, netting, cleaning, or combined prevention", "Clear scopes for managers, owners, and strata approvals"],
    process: (city) => `We begin by reviewing photos of the affected building area and identifying where birds land, shelter, or nest. For ${city} commercial properties, we consider business hours, access, customer visibility, signage, surface material, and approval requirements. The recommended system is matched to the pressure point rather than forcing one generic fix.`,
    materials: "Commercial systems may include stainless or exterior-rated spikes, UV-stable bird netting, cable, clips, anchors, tensioning hardware, surface-appropriate fasteners, and cleaning preparation.",
    faqs: [
      ["What commercial bird control services do you offer?", "Pigeon Defenders offers pigeon spikes, bird netting, cleaning, and humane exclusion planning for commercial and strata properties."],
      ["Can you work with property managers or strata councils?", "Yes. We can provide a clear scope from photos when possible and explain what system is recommended for approval."],
      ["Will the system look obvious on the building?", "The goal is a tidy, durable installation. Visibility depends on the building and system, but low-profile materials are used where possible."],
      ["Can work be planned around business hours?", "Where scheduling allows, we can discuss timing that reduces disruption for customers, residents, and staff."],
    ],
  },
  {
    key: "balcony-cleaning",
    title: "Balcony Cleaning",
    slugPrefix: "balcony-cleaning",
    serviceType: "Balcony cleaning and pigeon mess cleanup",
    image: "balcony-cleaning-finished-space-640.webp",
    imageWidth: 640,
    imageHeight: 755,
    imageAlt: "Balcony cleaning after pigeon mess removal",
    keyword: "balcony cleaning",
    h1: (city) => `Balcony Cleaning ${city}`,
    titleTag: (city) => `Pigeon Balcony Cleaning ${city} | Pigeon Defenders`,
    desc: (city) => `Balcony cleaning in ${city} for pigeon droppings, feathers, nesting debris, and bird mess before netting or spikes. Call or text ${phone}.`,
    intro: (city) => `Balcony cleaning in ${city} helps reset outdoor spaces affected by pigeon droppings, feathers, nesting debris, and repeat roosting. Pigeon Defenders cleans balcony mess before bird netting, pigeon spike installation, or pet safety netting so the area starts fresh and is easier to protect long term.`,
    benefits: ["Removes visible pigeon droppings and nesting debris", "Prepares the balcony before netting or spike installation", "Helps make the space usable again", "Identifies where birds are likely to return", "Can be quoted with prevention in one clear scope"],
    process: (city) => `The fastest first step is to text photos of the balcony. For ${city} residents, wide photos show size and access, while close-up photos show droppings, ledges, nesting material, and surface conditions. We clarify the cleaning scope and explain whether bird netting, spikes, or a combined plan is needed to stop the same mess from returning.`,
    materials: "Cleaning tools and products depend on the surface and mess level. When prevention follows cleaning, the crew also considers anchor points, ledges, and surfaces that need to be prepared for installation.",
    faqs: [
      ["Do you clean pigeon droppings before bird proofing?", "Yes. Cleaning can be completed before netting or pigeon spike installation so the space starts cleaner and easier to protect."],
      ["Can balcony cleaning be quoted from photos?", "Often, yes. Clear photos help show size, access, surface type, and the amount of bird mess."],
      ["Will cleaning alone stop pigeons from returning?", "Cleaning improves the space, but prevention such as netting or spikes is usually needed if pigeons are still landing or nesting."],
      ["Can you clean condo balconies?", "Yes. We help with condo and strata balcony cleaning where access and building rules allow."],
    ],
  },
  {
    key: "pet-cat-netting",
    title: "Pet & Cat Netting",
    slugPrefix: "pet-cat-netting",
    serviceType: "Pet safety balcony netting and cat netting",
    image: "pet-safe-balcony-cat-netting-640.webp",
    imageWidth: 640,
    imageHeight: 853,
    imageAlt: "Pet and cat balcony netting installation",
    keyword: "pet and cat netting",
    h1: (city) => `Pet & Cat Balcony Netting ${city}`,
    titleTag: (city) => `Pet & Cat Netting ${city} | Pigeon Defenders`,
    desc: (city) => `Pet and cat balcony netting in ${city} for condo balconies, apartments, and homes. Discreet netting that helps protect pets and keep birds out.`,
    intro: (city) => `Pet and cat balcony netting in ${city} helps create a more controlled balcony environment for households with cats, small pets, and families. Pigeon Defenders installs discreet netting systems that can support pet safety goals while also blocking pigeons from entering, nesting, or leaving droppings behind.`,
    benefits: ["Helps reduce open balcony risk for cats and small pets", "Can also block pigeons from entering the balcony", "Keeps the balcony usable for daily living", "Designed around railings, side gaps, doors, and furniture", "Useful for many condo and apartment layouts"],
    process: (city) => `We review photos of the full balcony, railing, ceiling, corners, and side gaps. For ${city} homes and condos, we also ask about pet behaviour, supervision expectations, bird activity, and building rules. The installation focuses on clean anchors, consistent tension, and reducing the gaps that matter most for pets and birds.`,
    materials: "Materials may include exterior-rated netting, perimeter support line, clips, anchors, and tensioning hardware selected for the balcony layout and visibility concerns.",
    faqs: [
      ["Is balcony netting safe for cats?", "Pet netting can help reduce balcony risk, but the final setup depends on the balcony, anchor points, pet behaviour, and supervision expectations."],
      ["Can pet netting also keep pigeons out?", "Yes. A well-planned balcony netting system can support pet safety goals while also blocking pigeons from entering."],
      ["Can you install pet netting on a condo balcony?", "Often, yes, when building rules and access allow it. Photos help determine whether the balcony is suitable."],
      ["Will the balcony still feel open?", "The goal is a discreet layout that keeps the balcony bright and usable while adding a protective boundary."],
    ],
  },
];

const serviceNav = [
  ["Bird Netting", "balcony-bird-netting.html"],
  ["Pigeon Spikes", "pigeon-spike-installation.html"],
  ["Balcony Cleaning", "balcony-cleaning.html"],
  ["Pet Netting", "pet-cat-netting.html"],
  ["Areas", "service-areas.html"],
  ["Contact", "contact.html"],
];

const coreUrls = [
  ["/", "1.0", "weekly"],
  ["/balcony-bird-netting.html", "0.9", "monthly"],
  ["/pigeon-spike-installation.html", "0.9", "monthly"],
  ["/balcony-cleaning.html", "0.8", "monthly"],
  ["/pet-cat-netting.html", "0.8", "monthly"],
  ["/commercial-bird-control.html", "0.9", "monthly"],
  ["/service-areas.html", "0.7", "monthly"],
  ["/contact.html", "0.7", "monthly"],
];

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const allPages = cities.flatMap((city) => services.map((service) => ({
  city,
  service,
  slug: `${service.slugPrefix}-${city.slug}`,
})));

const navHtml = serviceNav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");

const headerHtml = (topText) => `
  <div class="top-strip"><div class="wrap"><span>${escapeHtml(topText)}</span><span class="top-actions"><a href="tel:${tel}">Call or Text ${phone}</a><a href="mailto:${email}">${email}</a></span></div></div>
  <header class="site-header"><div class="wrap nav"><a class="logo" href="/"><img src="images/pigeon-defenders-logo.webp" alt="Pigeon Defenders logo" width="420" height="231" decoding="async" fetchpriority="high"></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="nav-links" aria-label="Primary navigation">${navHtml}</nav><a class="btn btn-primary desktop-cta" href="tel:${tel}">Call or Text ${phone}</a></div></header>`;

const footerHtml = `
  <footer class="site-footer"><div class="wrap footer-grid"><div><img class="footer-logo" src="images/pigeon-defenders-logo.webp" alt="Pigeon Defenders logo" width="420" height="231" decoding="async" loading="lazy"><p>Smart solutions. Lasting results. Protect your home. Protect our community.</p></div><div><h3>Services</h3><a href="balcony-bird-netting.html">Balcony Bird Netting</a><a href="pigeon-spike-installation.html">Pigeon Spikes</a><a href="balcony-cleaning.html">Balcony Cleaning</a><a href="pet-cat-netting.html">Pet & Cat Netting</a></div><div><h3>Company</h3><a href="commercial-bird-control.html">Commercial</a><a href="service-areas.html">Areas</a><a href="contact.html">Contact</a></div><div><h3>Contact</h3><p><a href="tel:${tel}">${phone}</a></p><p><a href="mailto:${email}">${email}</a></p></div></div></footer>
  <div class="sticky-mobile"><a class="btn btn-dark" href="sms:2369995739">Text</a><a class="btn btn-primary" href="tel:${tel}">Call</a></div><script src="script.js" defer></script>`;

function linkFor(page) {
  return `${page.slug}.html`;
}

function relatedLinks(current) {
  const sameCity = allPages.filter((page) => page.city.slug === current.city.slug && page.slug !== current.slug);
  const sameService = allPages
    .filter((page) => page.service.key === current.service.key && page.city.slug !== current.city.slug)
    .slice(0, 6);
  return { sameCity, sameService };
}

function paragraphSet(city, service) {
  return [
    `${service.intro(city.name)} Every project is quoted around the actual layout, not a generic package. That means we look at the surface, access, bird pressure, visibility, and whether cleaning or prevention should happen first.`,
    `People searching for ${service.keyword} ${city.name}, pigeon control ${city.name}, bird proofing ${city.name}, or bird deterrent ${city.name} are usually dealing with the same pattern: birds return because the building gives them a comfortable place to land, nest, or shelter. A lasting fix removes that comfort without relying on harmful methods.`,
    `The service is useful for ${city.context}. We also help nearby Metro Vancouver communities, including Vancouver, Burnaby, Richmond, Surrey, Coquitlam, North Vancouver, West Vancouver, Delta, Langley, and New Westminster.`,
  ];
}

function jsonScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function pageHtml(page) {
  const { city, service, slug } = page;
  const canonical = `${site}/${slug}.html`;
  const related = relatedLinks(page);
  const title = service.titleTag(city.name);
  const desc = service.desc(city.name);
  const paragraphs = paragraphSet(city, service);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: service.h1(city.name),
    url: canonical,
    serviceType: service.serviceType,
    description: desc,
    image: `${site}/images/${service.image}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${site}/#business`,
      name: "Pigeon Defenders",
      url: `${site}/`,
      telephone: "+1-236-999-5739",
      email,
    },
    areaServed: { "@type": "City", name: city.name },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${site}/service-areas.html` },
      { "@type": "ListItem", position: 3, name: service.h1(city.name), item: canonical },
    ],
  };

  return `<!doctype html>
<html lang="en-CA">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <link rel="shortcut icon" href="/favicon.ico"><link rel="icon" type="image/png" sizes="64x64" href="/favicon.png?v=3"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3">
  <meta name="description" content="${escapeHtml(desc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site}/images/${service.image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">
  <meta name="twitter:image" content="${site}/images/${service.image}">
  <link rel="stylesheet" href="styles.css">
  ${jsonScript(serviceSchema)}
  ${jsonScript(faqSchema)}
  ${jsonScript(breadcrumbSchema)}
</head>
<body class="local-service-page">
  ${headerHtml(`${service.title} in ${city.name} by Pigeon Defenders`)}
  <main>
    <section class="service-hero"><div class="wrap"><div><span class="eyebrow">${escapeHtml(service.keyword)} ${escapeHtml(city.name)}</span><h1>${escapeHtml(service.h1(city.name))}</h1><p>${escapeHtml(paragraphs[0])}</p><div class="hero-actions"><a class="btn btn-primary" href="contact.html">Get Free Quote</a><a class="btn btn-light" href="sms:2369995739">Text Photos</a></div></div><img src="images/${service.image}" alt="${escapeHtml(service.imageAlt)} in ${escapeHtml(city.name)}" width="${service.imageWidth}" height="${service.imageHeight}" decoding="async" fetchpriority="high"></div></section>
    <section><div class="wrap split"><div><span class="eyebrow">Local Service</span><h2>Built for ${escapeHtml(city.name)} properties.</h2>${paragraphs.slice(1).map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</div><div><h3>Best fit for</h3><ul class="check-list">${service.benefits.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div></div></section>
    <section class="band"><div class="wrap split"><div><span class="eyebrow">Benefits</span><h2>Why ${escapeHtml(service.title.toLowerCase())} matters in ${escapeHtml(city.name)}.</h2><p>Bird problems become expensive when the same ledge, balcony, entrance, or sign has to be cleaned repeatedly. A proper bird proofing service reduces the reason birds return, which helps protect the space after the first visit. The right solution also makes the property easier to maintain because the system is matched to the bird behaviour and the building surface.</p><p>For ${escapeHtml(city.name)} homeowners, renters, strata councils, and commercial managers, the goal is usually a mix of comfort, appearance, and prevention. Pigeon Defenders focuses on humane methods, clean workmanship, practical quotes, and material choices that make sense for Metro Vancouver weather.</p></div><div><h3>Service benefits</h3><ul class="check-list">${service.benefits.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div></div></section>
    <section><div class="wrap split"><div><span class="eyebrow">Process</span><h2>Clear quote, clean installation, lasting prevention.</h2><p>${escapeHtml(service.process(city.name))}</p><p>Most quotes begin with photos. A wide photo shows the full area, while close-up photos show landing edges, droppings, corners, access, and material details. If the project needs a closer look, we explain that before recommending a final scope.</p><p>Once the plan is clear, the crew prepares the area, installs the selected system, checks gaps or landing points, and leaves the site looking tidy. When cleaning is needed, it can be planned before the bird-proofing system goes in.</p></div><div><h3>Materials used</h3><p>${escapeHtml(service.materials)}</p><h3>Why choose Pigeon Defenders</h3><ul class="check-list"><li>Local Metro Vancouver service</li><li>Humane bird control methods</li><li>Clean installation on visible surfaces</li><li>Free quotes from photos when possible</li><li>Residential, strata, and commercial support</li></ul></div></div></section>
    <section class="band"><div class="wrap split"><div><span class="eyebrow">${escapeHtml(city.name)} Service Area</span><h2>Serving ${escapeHtml(city.name)} and nearby communities.</h2><p>Pigeon Defenders provides ${escapeHtml(service.title.toLowerCase())} in ${escapeHtml(city.name)} and across Metro Vancouver. We also serve Vancouver, Burnaby, Richmond, Surrey, Coquitlam, North Vancouver, West Vancouver, Delta, Langley, and New Westminster. If you are nearby and are not sure whether your city is covered, text photos and we will confirm availability.</p></div><div><h3>Related services in ${escapeHtml(city.name)}</h3><div class="areas">${related.sameCity.map((item) => `<a href="${linkFor(item)}"><span>${escapeHtml(item.service.title)}</span></a>`).join("")}</div></div></div></section>
    <section><div class="wrap"><div class="section-head center"><span class="eyebrow">Local FAQ</span><h2>Questions about ${escapeHtml(service.title.toLowerCase())} in ${escapeHtml(city.name)}.</h2></div><div class="faq-list">${service.faqs.map(([q, a]) => `<details><summary>${escapeHtml(q)}</summary><p>${escapeHtml(a)}</p></details>`).join("")}</div></div></section>
    <section class="band"><div class="wrap"><div class="section-head center"><span class="eyebrow">Related Local Pages</span><h2>More ways we help in ${escapeHtml(city.name)}.</h2><p>Use these focused links to compare nearby services and similar city pages without overwhelming the page.</p></div><div class="areas">${related.sameCity.map((item) => `<a href="${linkFor(item)}"><span>${escapeHtml(item.service.title)} ${escapeHtml(item.city.name)}</span></a>`).join("")}</div><div class="areas local-page-links">${related.sameService.map((item) => `<a href="${linkFor(item)}"><span>${escapeHtml(item.service.title)} ${escapeHtml(item.city.name)}</span></a>`).join("")}</div></div></section>
    <section class="cta"><div class="wrap"><h2>Get a free ${escapeHtml(service.title.toLowerCase())} quote in ${escapeHtml(city.name)}.</h2><p>Text photos of the problem area and Pigeon Defenders will recommend the cleanest practical solution.</p><a class="btn btn-primary" href="tel:${tel}">Call or Text ${phone}</a></div></section>
  </main>
  ${footerHtml}
</body>
</html>
`;
}

function sitemapXml() {
  const core = coreUrls.map(([path, priority, changefreq]) => `  <url><loc>${site}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
  const local = allPages.map((page) => `  <url><loc>${site}/${page.slug}.html</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.65</priority></url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...core, ...local].join("\n")}
</urlset>
`;
}

await mkdir(pagesDir, { recursive: true });
for (const page of allPages) {
  await writeFile(join(pagesDir, `${page.slug}.html`), pageHtml(page));
}
await writeFile(sitemapPath, sitemapXml());

const localFiles = (await readdir(pagesDir)).filter((file) => allPages.some((page) => `${page.slug}.html` === file));
const sample = await readFile(join(pagesDir, localFiles[0]), "utf8");
const words = (sample.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").match(/[A-Za-z0-9'’+-]+/g) || []).length;
console.log(`Generated ${localFiles.length} local service pages. Sample visible word count: ${words}.`);
