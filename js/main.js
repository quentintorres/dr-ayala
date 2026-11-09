const nav = document.querySelector("[data-nav]");
const links = [...document.querySelectorAll(".nav-links a")];

const markScrolled = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 8);
};

markScrolled();
window.addEventListener("scroll", markScrolled, { passive: true });

const sections = links
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          const current = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("is-current", current);
          if (current) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}
