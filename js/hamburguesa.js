document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  if (!toggle || !menu) return;

  // Abrir / cerrar menú
  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("menu-abierto");
    toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
  });

  // Cerrar al hacer click en un link
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (menu.classList.contains("menu-abierto")) {
        menu.classList.remove("menu-abierto");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Submenús en móvil por click
  document.querySelectorAll(".dropdown > a").forEach(drop => {
    drop.addEventListener("click", e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = drop.nextElementSibling;
        submenu.classList.toggle("submenu-abierto");
      }
    });
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("menu-abierto")) {
      menu.classList.remove("menu-abierto");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});


