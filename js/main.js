// ==============================================================================
// Lógica para Productos y Carrito
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
    { id: 11, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" },
    { id: 12, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" },
    { id: 13, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" },
    { id: 14, nombre: "Galletitas Providencia x 3 unid", precio: 929, imagen: "img/galleta.jpg" }
];

let carrito = [];

function mostrarProductos() {
    const contenedor = document.querySelector("#lista-productos");
    // Solo si el contenedor existe en la página actual (ej. productos.html o productos-bsas.html)
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

function actualizarCarrito() {
    const items = document.querySelector("#items-carrito");
    const totalElement = document.querySelector("#total");
    const btnVaciar = document.querySelector("#vaciar-carrito");

    // Solo si los elementos del carrito existen en la página actual
    if (items && totalElement && btnVaciar) {
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

        totalElement.textContent = total.toFixed(2); // Asegura dos decimales para el total

        // Mostrar botón vaciar si hay productos
        btnVaciar.style.display = carrito.length > 0 ? "block" : "none";
    }
}

// ==============================================================================
// Manejo de Eventos Global (clicks en botones de agregar/eliminar/vaciar)
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

    // Enviar pedido por WhatsApp (desde el formulario de pedido si existe)
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
        document.querySelector("#form-pedido")?.reset(); // Reinicia el formulario después de enviar
    }
});


// ==============================================================================
// Lógica que se ejecuta cuando el DOM está completamente cargado
// ==============================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar la visualización de productos y carrito (si están presentes en la página)
    mostrarProductos();
    actualizarCarrito();

    // --- Lógica para Formularios de Contacto y Proveedor ---

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
            formProveedor.reset(); // Reinicia el formulario
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
            formContacto.reset(); // Reinicia el formulario
        });
    }

    // ==============================================================================
    // Lógica del Carrusel de Imágenes (Actualizada para múltiples ítems visibles)
    // ==============================================================================

    const carrusel = document.querySelector(".carrusel"); // Seleccionamos el contenedor desplazable
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    if (carrusel && slides.length > 0 && prevBtn && nextBtn) {
        // Para asegurar que el carrusel se desplace por "unidad" de imagen visible
        function getSlideScrollAmount() {
            // Obtiene el ancho de la primera diapositiva y el gap (15px)
            // Se asume que todas las diapositivas tienen el mismo ancho y gap
            const slideWidth = slides[0].offsetWidth;
            const gap = 15; // El gap definido en tu CSS
            return slideWidth + gap;
        }

        // Navegación con botón anterior
        prevBtn.addEventListener("click", () => {
            const scrollAmount = getSlideScrollAmount();
            carrusel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });

            // Opcional: loop infinito para el carrusel
            // if (carrusel.scrollLeft - scrollAmount < 0) {
            //     carrusel.scrollLeft = carrusel.scrollWidth; // Ir al final
            // } else {
            //     carrusel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            // }
        });

        // Navegación con botón siguiente
        nextBtn.addEventListener("click", () => {
            const scrollAmount = getSlideScrollAmount();
            carrusel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });

            // Opcional: loop infinito para el carrusel
            // if (carrusel.scrollLeft + scrollAmount >= carrusel.scrollWidth - carrusel.offsetWidth) {
            //     carrusel.scrollLeft = 0; // Ir al principio
            // } else {
            //     carrusel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            // }
        });

        // NOTA: Se ha eliminado el setInterval para auto-avance,
        // ya que la navegación por múltiples ítems suele ser manual o requiere
        // una lógica de auto-avance más sofisticada para grupos de elementos.
    }

    // ==============================================================================
    // Lógica para Lightbox (Ampliar Imagen al Clic)
    // ==============================================================================

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeButton = document.querySelector('.close-button');

    // Aseguramos que los elementos del lightbox existan antes de añadir listeners
    if (lightbox && lightboxImg && closeButton) {

        // Abre el lightbox cuando se hace clic en una imagen del carrusel
        slides.forEach(slide => {
            slide.addEventListener('click', () => {
                lightbox.classList.add('active'); // Activa la visualización de la modal
                lightboxImg.src = slide.src; // Establece la fuente de la imagen en la modal
            });
        });

        // Cierra el lightbox al hacer clic en el botón de cerrar
        closeButton.addEventListener('click', () => {
            lightbox.classList.remove('active'); // Desactiva la visualización de la modal
        });

        // Cierra el lightbox al hacer clic fuera de la imagen (en el fondo oscuro)
        lightbox.addEventListener('click', (e) => {
            // Si el clic fue directamente en el fondo de la lightbox (no en la imagen)
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

        // Opcional: Cierra el lightbox al presionar la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }
}); // Cierre de document.addEventListener("DOMContentLoaded" ...