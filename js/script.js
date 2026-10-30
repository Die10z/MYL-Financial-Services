/* ------------------------------------------------------------------ *
 * El logo del header es ahora un enlace a index.html (volver al inicio),
 * por convencion de navegacion. El visor ampliado quedo sin disparador:
 * su marcado y su CSS siguen en el proyecto para no perder el trabajo,
 * pero no se enganchan eventos.
 * ------------------------------------------------------------------ */

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

