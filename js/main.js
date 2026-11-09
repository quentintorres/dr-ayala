const nav = document.querySelector("[data-nav]");
const links = [...document.querySelectorAll(".nav-links a")];

if (nav) {
  const markScrolled = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  markScrolled();
  window.addEventListener("scroll", markScrolled, { passive: true });
}

if ("IntersectionObserver" in window) {
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const on = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-current", on);
          if (on) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
  );
  sections.forEach((section) => current.observe(section));

  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!calm) {
    document.documentElement.classList.add("has-reveal");
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));
  }
}

const player = document.querySelector("[data-player]");

if (player) {
  player.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    if (player.classList.contains("is-playing")) return;
    event.preventDefault();
    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/videoseries?list=${player.dataset.player}&autoplay=1&rel=0&playsinline=1`;
    frame.title = "Latest Ready. Set. Monday. episode";
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    player.classList.add("is-playing");
    player.removeAttribute("href");
    player.setAttribute("role", "group");
    player.querySelector("img").replaceWith(frame);
  });
}
