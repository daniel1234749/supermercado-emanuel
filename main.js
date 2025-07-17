const productos = [
  { id: 1, nombre: "Arroz 1kg", precio: 850, imagen: "img/arroz.jpeg" },
  { id: 2, nombre: "Fideos 500g", precio: 750, imagen: "img/fideos.jpeg" },
  { id: 3, nombre: "Harina Graciela 000 paq x 1 kg", precio: 699, imagen: "img/graciela.jpg" },
  { id: 4, nombre: "Cafe Arlistan x 100gr", precio: 680, imagen: "img/arlistan.jpg" },
  { id: 5, nombre: "Yerba Broche de Oro x 500gr", precio: 1299.9, imagen: "img/yerba.jpg" },
  { id: 6, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" },
  { id: 7, nombre: "Galletitas Serranitas x 3 unid", precio: 1059, imagen: "img/serranitas.jpg" },
  { id: 6, nombre: "Leche en polvo Purisima est x 800gr", precio: 8299, imagen: "img/purisima.jpg" },
  { id: 6, nombre: "Pure de papas Maggi x 125gr", precio: 1099, imagen: "img/maggi.jpg" },
  { id: 6, nombre: "Mermelada Marolio x 454gr", precio: 1499, imagen: "img/merm-marolio.jpg" },
  { id: 6, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" },
  { id: 6, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" },
  { id: 6, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" },
  { id: 6, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" }
  
  
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

  // Mostrar botón vaciar si hay productos
  const btnVaciar = document.querySelector("#vaciar-carrito");
  btnVaciar.style.display = carrito.length > 0 ? "block" : "none";
}

document.addEventListener("click", (e) => {
  // Agregar producto
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

  // Eliminar producto
  if (e.target.classList.contains("btn-eliminar")) {
    const id = parseInt(e.target.dataset.id);
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
  }

  // Vaciar carrito
  if (e.target.id === "vaciar-carrito") {
    carrito = [];
    actualizarCarrito();
  }

  // Enviar pedido por WhatsApp
 if (e.target.id === "enviar-whatsapp") {
  if (carrito.length === 0) return alert("Tu carrito está vacío.");

  const nombre = document.querySelector("#nombre")?.value || "Cliente";
  const telefono = document.querySelector("#telefono")?.value || "Sin número";

  const mensaje = carrito.map(item =>
    `${item.nombre} x${item.cantidad}`
  ).join(", ");

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

  // Formulario proveedor
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

  // Formulario contacto
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
let index = 0;
const itemsPerPage = 3;
const totalSlides = slides.length;

function updateSlider() {
  track.style.transform = `translateX(-${index * (100 / itemsPerPage)}%)`;
}

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index -= itemsPerPage;
    updateSlider();
  }
});

nextBtn.addEventListener("click", () => {
  if (index + itemsPerPage < totalSlides) {
    index += itemsPerPage;
    updateSlider();
  }
});
