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

const revealTargets = document.querySelectorAll(
  ".section-head, .proof-strip > *, .card, .problem-copy, .problem-card, .gallery-item, .quote-flow-grid > *, .quote-points span, .split > *, .step, .areas span, details, .quote-panel, .cta .wrap, .service-hero .wrap > *"
);

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add("is-visible"));
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
