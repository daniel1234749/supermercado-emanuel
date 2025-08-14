document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (!toggle || !menu) return;

  // Abrir/cerrar menú
  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("menu-abierto");
    toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
  });

  // Cerrar al hacer click en un link del menú (útil en mobile)
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (menu.classList.contains("menu-abierto")) {
        menu.classList.remove("menu-abierto");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Cerrar con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("menu-abierto")) {
      menu.classList.remove("menu-abierto");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});
