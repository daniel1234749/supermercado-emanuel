// ==============================================================================
// PRODUCTOS Y CARRITO
// ==============================================================================

const productos = [
    { id: 1, nombre: "Arroz 1kg", precio: 850, imagen: "img/arroz.jpeg" },
    { id: 2, nombre: "Fideos 500g", precio: 750, imagen: "img/fideos.jpeg" },
    { id: 3, nombre: "Harina Graciela 000 paq x 1 kg", precio: 699, imagen: "img/graciela.jpg" },
    { id: 4, nombre: "Cafe Arlistan x 100gr", precio: 680, imagen: "img/arlistan.jpg" },
    { id: 5, nombre: "Yerba Broche de Oro x 500gr", precio: 1299.9, imagen: "img/yerba.jpg" },
    { id: 6, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" },
    { id: 7, nombre: "Galletitas Serranitas x 3 unid", precio: 1059, imagen: "img/serranitas.jpg" },
    { id: 8, nombre: "Leche en polvo Purisima est x 800gr", precio: 8299, imagen: "img/purisima.jpg" },
    { id: 9, nombre: "Pure de papas Maggi x 125gr", precio: 1099, imagen: "img/maggi.jpg" },
    { id: 10, nombre: "Mermelada Marolio x 454gr", precio: 1499, imagen: "img/merm-marolio.jpg" },
    { id: 11, nombre: "Pure de tomate La Huerta x 530gr", precio: 699, imagen: "img/huerta.jpeg" },
    { id: 12, nombre: "Caballa Marolio x 380gr", precio: 2199, imagen: "img/caballa_marolio.jpeg" },
    { id: 13, nombre: "Mayonesa Hellmanns x 475gr", precio: 2099, imagen: "img/hellmans.jpeg" },
    { id: 14, nombre: "Polenta Prestopronta x 500gr", precio: 999, imagen: "img/prestopronta.jpeg" }
];

let carrito = [];

// Mostrar productos en la página
function mostrarProductos() {
    const contenedor = document.querySelector("#lista-productos");
    if (contenedor) {
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
}

// Actualizar carrito
function actualizarCarrito() {
    const items = document.querySelector("#items-carrito");
    const totalElement = document.querySelector("#total");
    const btnVaciar = document.querySelector("#vaciar-carrito");
    const contadorElement = document.querySelector("#contador-carrito");

    if (items && totalElement && btnVaciar) {
        items.innerHTML = "";
        let total = 0;
        let totalItems = 0;

        carrito.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
                <button class="btn-eliminar" data-id="${item.id}">❌</button>
            `;
            items.appendChild(li);
            total += item.precio * item.cantidad;
            totalItems += item.cantidad;
        });

        totalElement.textContent = total.toFixed(2);
        btnVaciar.style.display = carrito.length > 0 ? "block" : "none";

        if (contadorElement) {
            contadorElement.textContent = totalItems;
            contadorElement.style.display = totalItems > 0 ? "inline-block" : "none";
        }
    }
}

// ==============================================================================
// MODAL CARRITO
// ==============================================================================

const modalCarrito = document.getElementById('modal-carrito');
const btnAbrirCarrito = document.getElementById('abrir-carrito');
const btnCerrarCarrito = document.getElementById('cerrar-carrito');

if (btnAbrirCarrito && modalCarrito && btnCerrarCarrito) {
    btnAbrirCarrito.addEventListener('click', () => {
        modalCarrito.style.display = 'flex';
    });

    btnCerrarCarrito.addEventListener('click', () => {
        modalCarrito.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modalCarrito) {
            modalCarrito.style.display = 'none';
        }
    });
}

// ==============================================================================
// EVENTOS GLOBALES
// ==============================================================================

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

    // Enviar carrito por WhatsApp
    if (e.target.id === "enviar-whatsapp") {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const nombre = document.querySelector("#nombre_carrito")?.value || "Cliente";
        const telefono = document.querySelector("#telefono_carrito")?.value || "Sin número";

        const mensajeItems = carrito.map(item =>
            `${item.nombre} x${item.cantidad}`
        ).join(", ");

        const total = document.querySelector("#total")?.textContent || "0.00";

        const texto = `Hola, soy ${nombre} (${telefono}). Quiero hacer un pedido: ${mensajeItems}. Total: $${total}`;
        const whatsappURL = `https://wa.me/5493863431725?text=${encodeURIComponent(texto)}`;
        window.open(whatsappURL, "_blank");

        carrito = [];
        actualizarCarrito();
        modalCarrito.style.display = 'none';
    }
});

// ==============================================================================
// FORMULARIO CONTACTO CLIENTES
// ==============================================================================

document.getElementById("form-contacto")?.addEventListener("submit", function (e) {
    e.preventDefault();

    // Usar IDs reales del HTML
    const nombre = document.getElementById("nombre")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const mensaje = document.getElementById("mensaje")?.value.trim();

    if (!nombre || !email || !telefono || !mensaje) {
        alert("Por favor, completá todos los campos.");
        return;
    }

    const texto = `Hola, soy ${nombre} (${telefono}, ${email}). ${mensaje}`;
    const whatsappURL = `https://wa.me/5493863431725?text=${encodeURIComponent(texto)}`;
    window.open(whatsappURL, "_blank");

    this.reset();
});

// ==============================================================================
// FORMULARIO PROVEEDORES
// ==============================================================================

document.getElementById("form-proveedor")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre_proveedor")?.value.trim();
    const email = document.getElementById("email_proveedor")?.value.trim();
    const telefono = document.getElementById("telefono_proveedor")?.value.trim();
    const mensaje = document.getElementById("mensaje_proveedor")?.value.trim();

    if (!nombre || !email || !telefono || !mensaje) {
        alert("Por favor, completá todos los campos.");
        return;
    }

    const texto = `Hola, soy ${nombre} (${telefono}, ${email}). ${mensaje}`;
    const whatsappURL = `https://wa.me/5493863431725?text=${encodeURIComponent(texto)}`;
    window.open(whatsappURL, "_blank");

    this.reset();
});

// ==============================================================================
// INICIALIZACIÓN
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarrito();
});
