/* Visor del logo. Solo se activa en las paginas que tienen el header con
   #logo-principal, #visor-logo y #cerrar-logo; las guardas evitan el
   TypeError en paginas sin el visor. */
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
