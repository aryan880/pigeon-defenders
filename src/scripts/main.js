const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const scrollProgress = document.createElement("div");

scrollProgress.className = "scroll-progress";
scrollProgress.setAttribute("aria-hidden", "true");
document.body.prepend(scrollProgress);
document.body.classList.add("is-loaded");

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
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    document.documentElement.style.setProperty("--scroll-progress", String(Math.min(Math.max(progress, 0), 1)));
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
}

const hero = document.querySelector(".hero");
const canUsePointerEffects = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

if (hero && canUsePointerEffects) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty("--hero-x", `${x}%`);
    hero.style.setProperty("--hero-y", `${y}%`);
  }, { passive: true });
}

const revealTargets = document.querySelectorAll(
  ".section-head, .system-card, .card, .problem-copy, .problem-card, .gallery-item, .quote-flow-grid > *, .quote-points span, .split > *, .step, .areas span, details, .quote-panel, .cta .wrap, .service-hero .wrap > *"
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

if (canUsePointerEffects) {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
    }, { passive: true });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
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
