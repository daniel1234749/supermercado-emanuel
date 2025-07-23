const productos = [
  { id: 101, nombre: "Aceite Cocinero 900cc", precio: 2349, imagen: "img/cocinero.jpg" },
  { id: 102, nombre: "Azúcar Ledesma 1kg", precio: 999, imagen: "img/azucar-ledesma.jpg" },
  { id: 103, nombre: "Yerba Playadito x 1kg", precio: 2149, imagen: "img/playadito.jpg" },
  { id: 104, nombre: "Lavandina Ayudín 1L", precio: 799, imagen: "img/ayudin.jpg" },
  { id: 105, nombre: "Fideos Don Vicente 500g", precio: 950, imagen: "img/donvicente.jpg" },
  { id: 106, nombre: "Café La Morenita x 250gr", precio: 1850, imagen: "img/morenita.jpg" },
  { id: 107, nombre: "Leche La Serenísima x 1L", precio: 1599, imagen: "img/laserenisima.png" },
  { id: 108, nombre: "Jabón en polvo Ala 800g", precio: 2599, imagen: "img/ala.jpg" }
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.querySelector("#lista-productos");
  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h4>${producto.nombre}</h4>
      <p>Precio: $${producto.precio}</p>
      <button data-id="${producto.id}" class="btn-agregar">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });
}

function actualizarCarrito() {
  const items = document.querySelector("#items-carrito");
  items.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
      <button class="btn-eliminar" data-id="${item.id}">❌</button>
    `;
    items.appendChild(li);
    total += item.precio * item.cantidad;
  });

  document.querySelector("#total").textContent = total;
  document.querySelector("#vaciar-carrito").style.display = carrito.length > 0 ? "block" : "none";
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-agregar")) {
    const id = parseInt(e.target.dataset.id);
    const producto = productos.find(p => p.id === id);
    const existe = carrito.find(p => p.id === id);
    if (existe) {
      existe.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
  }

  if (e.target.classList.contains("btn-eliminar")) {
    const id = parseInt(e.target.dataset.id);
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
  }

  if (e.target.id === "vaciar-carrito") {
    carrito = [];
    actualizarCarrito();
  }

  if (e.target.id === "enviar-whatsapp") {
    if (carrito.length === 0) return alert("Tu carrito está vacío.");

    const nombre = document.querySelector("#nombre")?.value || "Cliente";
    const telefono = document.querySelector("#telefono")?.value || "Sin número";
    const mensaje = carrito.map(item => `${item.nombre} x${item.cantidad}`).join(", ");
    const total = document.querySelector("#total").textContent;

    const texto = `Hola, soy ${nombre} (${telefono}). Quiero hacer un pedido: ${mensaje}. Total: $${total}`;
    const whatsappURL = `https://wa.me/5493863431725?text=${encodeURIComponent(texto)}`;
    window.open(whatsappURL, "_blank");

    document.querySelector("#form-pedido")?.reset();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  actualizarCarrito();

  const formProveedor = document.querySelector("#form-proveedor");
  if (formProveedor) {
    formProveedor.addEventListener("submit", function(e) {
      e.preventDefault();
      const nombre = document.querySelector("#nombre").value;
      const email = document.querySelector("#email").value;
      const telefono = document.querySelector("#telefono").value;
      const mensaje = document.querySelector("#mensaje").value;
      const texto = `Hola, soy ${nombre}, mi email es ${email} y teléfono ${telefono}. Quiero ofrecer productos: ${mensaje}`;
      const whatsappURL = `https://wa.me/+5493863431725?text=${encodeURIComponent(texto)}`;
      window.open(whatsappURL, "_blank");
    });
  }

  const formContacto = document.querySelector("#form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", function(e) {
      e.preventDefault();
      const nombre = document.querySelector("#nombre").value;
      const telefono = document.querySelector("#telefono").value;
      const mensaje = document.querySelector("#mensaje").value;
      const texto = `Hola, soy ${nombre}, mi teléfono es ${telefono}. ${mensaje ? "Comentario: " + mensaje : ""}`;
      const whatsappURL = `https://wa.me/+5493863431725?text=${encodeURIComponent(texto)}`;
      window.open(whatsappURL, "_blank");
    });
  }
});
