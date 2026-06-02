const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("js-enabled");

const progress = document.createElement("div");
progress.className = "scroll-progress";
progress.setAttribute("aria-hidden", "true");
document.body.prepend(progress);

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

if (menuButton && navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (header) {
  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.setProperty("--progress", amount.toFixed(4));
};
updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

const revealTargets = document.querySelectorAll(
  ".section-head, .proof-strip > *, .card, .problem-copy, .problem-card, .gallery-item, .quote-flow-grid > *, .quote-points span, .split > *, .step, .areas span, details, .quote-panel, .cta .wrap, .service-hero .wrap > *, .local-area-card"
);
const canAnimateReveals = window.matchMedia("(min-width: 701px) and (prefers-reduced-motion: no-preference)").matches;

if (canAnimateReveals && "IntersectionObserver" in window) {
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 45}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -28px 0px" });

  revealTargets.forEach((element) => observer.observe(element));
}

if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll(".card, .problem-card, .gallery-item, .local-area-card, .quote-panel").forEach((element) => {
    element.classList.add("tilt-ready");
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
      element.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
      element.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      element.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--glow-x", "50%");
      element.style.setProperty("--glow-y", "50%");
    });
  });

  const heroImage = document.querySelector(".hero-media img");
  if (heroImage) {
    let ticking = false;
    const moveHero = () => {
      const offset = Math.min(window.scrollY * 0.08, 42);
      heroImage.style.transform = `translate3d(0, ${offset}px, 0) scale(1.045)`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(moveHero);
        ticking = true;
      }
    }, { passive: true });
    moveHero();
  }
}

const solutionData = {
  balcony: {
    title: "Balcony Bird Netting",
    copy: "Best when birds are entering the balcony opening, nesting behind furniture, or leaving droppings across the floor.",
    steps: ["Text wide balcony photos", "Review gaps and anchor points", "Install discreet netting"],
    link: "balcony-bird-netting.html",
    label: "View Balcony Netting",
    meter: "88%",
  },
  ledge: {
    title: "Pigeon Spike Installation",
    copy: "Best when pigeons are landing on ledges, beams, signs, rooflines, gutters, or narrow balcony edges.",
    steps: ["Identify landing zones", "Prepare the surface", "Install humane deterrents"],
    link: "pigeon-spike-installation.html",
    label: "View Pigeon Spikes",
    meter: "78%",
  },
  pet: {
    title: "Pet & Cat Netting",
    copy: "Best when you want a more controlled balcony setup for cats or small pets while also blocking bird entry.",
    steps: ["Share balcony layout", "Check rail and side gaps", "Fit pet-safe netting"],
    link: "pet-cat-netting.html",
    label: "View Pet Netting",
    meter: "84%",
  },
  commercial: {
    title: "Commercial Bird Control",
    copy: "Best for storefronts, strata buildings, signs, rooflines, warehouses, entrances, and shared commercial spaces.",
    steps: ["Send building photos", "Map pressure points", "Quote a durable system"],
    link: "commercial-bird-control.html",
    label: "View Commercial Service",
    meter: "92%",
  },
};

const finderPanel = document.querySelector("[data-solution-panel]");
const finderTabs = document.querySelectorAll(".finder-tab");
if (finderPanel && finderTabs.length) {
  const title = finderPanel.querySelector("[data-solution-title]");
  const copy = finderPanel.querySelector("[data-solution-copy]");
  const stepOne = finderPanel.querySelector("[data-solution-step-one]");
  const stepTwo = finderPanel.querySelector("[data-solution-step-two]");
  const stepThree = finderPanel.querySelector("[data-solution-step-three]");
  const link = finderPanel.querySelector("[data-solution-link]");
  const meter = finderPanel.querySelector("[data-solution-meter]");

  finderTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.solution;
      const data = solutionData[key];
      if (!data) return;

      finderTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      finderPanel.classList.remove("is-switching");
      void finderPanel.offsetWidth;
      finderPanel.classList.add("is-switching");

      title.textContent = data.title;
      copy.textContent = data.copy;
      stepOne.textContent = data.steps[0];
      stepTwo.textContent = data.steps[1];
      stepThree.textContent = data.steps[2];
      link.textContent = data.label;
      link.href = data.link;
      meter.style.setProperty("--meter", data.meter);
    });
  });
}

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

document.querySelectorAll("form[data-quote-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name") || "";
    const city = formData.get("city") || "";
    const service = formData.get("service") || "bird-proofing";
    const message = formData.get("message") || "";
    const text = `Hi Pigeon Defenders, I'm ${name}. I need a quote for ${service} in ${city}. ${message}`.trim();
    window.location.href = `sms:2369995739&body=${encodeURIComponent(text)}`;
  });
});
