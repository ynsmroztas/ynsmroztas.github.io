(function () {
  const btn = document.querySelector("[data-burger]");
  const links = document.querySelector("[data-links]");
  if (btn && links) {
    btn.addEventListener("click", () => links.classList.toggle("open"));
  }
  const stage = document.querySelector("[data-tilt]");
  if (stage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const title = stage.querySelector(".title3d");
    stage.addEventListener("mousemove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      title.style.transform = `rotateX(${16 - y * 10}deg) rotateY(${-12 + x * 16}deg) translateZ(24px)`;
    });
    stage.addEventListener("mouseleave", () => {
      title.style.transform = "";
    });
  }
})();
