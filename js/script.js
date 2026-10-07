const logo = document.getElementById("logo-principal");
const visor = document.getElementById("visor-logo");
const cerrar = document.getElementById("cerrar-logo");

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