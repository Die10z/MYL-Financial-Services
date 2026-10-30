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
