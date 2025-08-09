// ==============================================================================
// Lógica para Productos y Carrito (Buenos Aires)
// ==============================================================================

const productos = [
    { id: 101, nombre: "Aceite Cocinero 900cc", precio: 2349, imagen: "img/cocinero.jpg" },
    { id: 102, nombre: "Azúcar Ledesma 1kg", precio: 999, imagen: "img/azucar-ledesma.jpg" },
    { id: 103, nombre: "Yerba Playadito x 1kg", precio: 2149, imagen: "img/playadito.jpg" },
    { id: 104, nombre: "Lavandina Ayudín 1L", precio: 799, imagen: "img/ayudin.jpg" },
    { id: 105, nombre: "Fideos Don Vicente 500g", precio: 950, imagen: "img/donvicente.jpg" },
    { id: 106, nombre: "Café La Morenita x 250gr", precio: 1850, imagen: "img/morenita.jpg" },
    { id: 107, nombre: "Leche La Serenísima x 1L", precio: 1599, imagen: "img/laserenisima.png" },
    { id: 108, nombre: "Jabón en polvo Ala 800g", precio: 2599, imagen: "img/ala.jpg" },
    { id: 109, nombre: "Rollo de cocina Celestial x 3 unid.", precio: 999 , imagen: "img/celestial.jpeg" },
    { id: 110, nombre: "Jabon en pan Seiseme x 300 gr", precio: 999 , imagen: "img/seiseme.jpeg" },
    { id: 111, nombre: "Lustramuebles Blem x 360cc", precio: 3999 , imagen: "img/blem.jpeg" },
    { id: 112, nombre: "Detergente Magistral x 500 cc", precio: 2899 , imagen: "img/magistral.jpeg" },
    { id: 113, nombre: "Suavizante Vivere clasico x 900cc", precio: 2099 , imagen: "img/vivere.jpeg" },
    { id: 114, nombre: "Perfume para ropa Algabo dp x 250gr", precio: 1499, imagen: "img/algabo.jpeg" }
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

// Actualizar carrito y mostrar en modal
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
// Lógica para abrir/cerrar modal carrito
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
// Manejo global de eventos para agregar, eliminar, vaciar y enviar WhatsApp
// ==============================================================================

document.addEventListener("click", (e) => {
    // Agregar producto al carrito
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

    // Eliminar producto del carrito
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

    // Enviar pedido por WhatsApp desde modal carrito
    if (e.target.id === "enviar-whatsapp") {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const nombre = document.querySelector("#nombre")?.value || "Cliente";
        const telefono = document.querySelector("#telefono")?.value || "Sin número";

        const mensajeItems = carrito.map(item =>
            `${item.nombre} x${item.cantidad}`
        ).join(", ");

        const total = document.querySelector("#total")?.textContent || "0.00";

        const texto = `Hola, soy ${nombre} (${telefono}). Quiero hacer un pedido: ${mensajeItems}. Total: $${total}`;
        const whatsappURL = `https://wa.me/5493863431725?text=${encodeURIComponent(texto)}`;
        window.open(whatsappURL, "_blank");

        document.querySelector("#form-pedido")?.reset();
        carrito = [];
        actualizarCarrito();
        modalCarrito.style.display = 'none';
    }
});

// ==============================================================================
// Inicialización al cargar el DOM
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarrito();
});