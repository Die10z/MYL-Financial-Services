/* ------------------------------------------------------------------ *
 * Visor del logo
 * Solo se activa en las paginas que tienen el header con #logo-principal,
 * #visor-logo y #cerrar-logo; las guardas evitan el TypeError en paginas
 * sin el visor.
 * ------------------------------------------------------------------ */
const logo = document.getElementById("logo-principal");
const visor = document.getElementById("visor-logo");
const cerrar = document.getElementById("cerrar-logo");

if (logo && visor && cerrar) {
    const abrir = () => {
        visor.style.display = "flex";
        cerrar.focus();
    };

    const ocultar = () => {
        visor.style.display = "none";
        logo.focus();
    };

    logo.addEventListener("click", abrir);

    // El logo es un <img role="button">, asi que necesita Enter y Espacio
    // para funcionar con teclado igual que un boton real.
    logo.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            abrir();
        }
    });

    cerrar.addEventListener("click", (e) => {
        e.stopPropagation();
        ocultar();
    });

    visor.addEventListener("click", ocultar);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && visor.style.display === "flex") {
            ocultar();
        }
    });
}

/* ------------------------------------------------------------------ *
 * Formulario de contacto (Formspree)
 * Mejora progresiva: si este script no corre, el <form> igual hace un
 * POST normal contra action. Con JS, se envia sin salir de la pagina.
 * ------------------------------------------------------------------ */
const formulario = document.querySelector(".formulario");
const estadoForm = document.querySelector(".form-estado");

if (formulario && estadoForm) {
    const mostrar = (texto, tipo) => {
        estadoForm.textContent = texto;
        estadoForm.dataset.estado = tipo;
    };

    formulario.addEventListener("submit", async (e) => {
        const accion = formulario.getAttribute("action") || "";

        // Si todavia no se configuro el endpoint, avisar en vez de fallar.
        if (accion.includes("REEMPLAZAR")) {
            e.preventDefault();
            mostrar("El formulario todavía no está conectado. Falta configurar Formspree.", "error");
            return;
        }

        e.preventDefault();
        mostrar("Enviando...", "enviando");

        try {
            const respuesta = await fetch(accion, {
                method: "POST",
                body: new FormData(formulario),
                headers: { Accept: "application/json" }
            });

            if (respuesta.ok) {
                formulario.reset();
                mostrar("¡Gracias! Tu mensaje se envió correctamente.", "ok");
                return;
            }

            const datos = await respuesta.json().catch(() => null);
            const detalle = datos && datos.errors && datos.errors[0]
                ? datos.errors[0].message
                : "No se pudo enviar. Intentá de nuevo en un momento.";
            mostrar(detalle, "error");
        } catch (error) {
            mostrar("No se pudo conectar. Revisá tu conexión e intentá de nuevo.", "error");
        }
    });
}

/* ------------------------------------------------------------------ *
 * Pulido visual: sombra del header al scrollear y aparicion suave de
 * los bloques. Si el navegador no soporta IntersectionObserver, los
 * elementos quedan visibles (nunca se ocultan desde el CSS).
 * ------------------------------------------------------------------ */
const encabezado = document.querySelector("header");

if (encabezado) {
    const ajustarHeader = () => {
        encabezado.classList.toggle("header-solido", window.scrollY > 8);
    };

    ajustarHeader();
    window.addEventListener("scroll", ajustarHeader, { passive: true });
}

const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!sinMovimiento && "IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    document
        .querySelectorAll(".hero-text, .hero-image, .tarjeta, .Menu-servicios, .formulario")
        .forEach((el) => {
            el.classList.add("revelar");
            observador.observe(el);
        });
}

