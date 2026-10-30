/* Visor del logo: se activa solo en las paginas que tienen el header con
   #logo-principal, #visor-logo y #cerrar-logo. Las guardas evitan el
   TypeError que lanzaba el script en paginas sin el visor. */
const logo = document.getElementById("logo-principal");
const visor = document.getElementById("visor-logo");
const cerrar = document.getElementById("cerrar-logo");

if (logo && visor && cerrar) {
    logo.addEventListener("click", () => {
        visor.style.display = "flex";
    });

    cerrar.addEventListener("click", (e) => {
        e.stopPropagation();
        visor.style.display = "none";
    });

    visor.addEventListener("click", () => {
        visor.style.display = "none";
    });
}
