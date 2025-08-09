document.addEventListener("DOMContentLoaded", function() {
    // ======================================================================
    // LÓGICA PARA EL CARRUSEL PRINCIPAL DE IMÁGENES
    // ======================================================================
    const carrusel = document.querySelector(".carrusel");
    const slides = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let currentIndex = 0;

    function updateCarrusel() {
        if (carrusel && slides.length > 0) {
            const slideWidth = slides[0].offsetWidth + 15; // Ancho + el gap
            carrusel.scrollLeft = currentIndex * slideWidth;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - 3;
            }
            updateCarrusel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentIndex < slides.length - 3) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarrusel();
        });
    }

    // ======================================================================
    // LÓGICA PARA EL BANNER DE PROMOCIONES ROTATIVAS
    // ======================================================================
    const promoSlides = document.querySelectorAll('.promo-slide');
    let currentPromoIndex = 0;

    function showPromoSlide() {
        // Oculta todas las diapositivas
        promoSlides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Muestra la diapositiva actual
        promoSlides[currentPromoIndex].classList.add('active');

        // Pasa a la siguiente diapositiva, volviendo al inicio si es la última
        currentPromoIndex = (currentPromoIndex + 1) % promoSlides.length;
    }

    // Muestra la primera diapositiva al cargar la página
    if (promoSlides.length > 0) {
        showPromoSlide();
        
        // Configura el intervalo para cambiar las diapositivas cada 2000ms
        setInterval(showPromoSlide, 2000);
    }
});