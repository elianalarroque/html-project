const form = document.getElementById("contact-form");
const mensaje = document.getElementById("final");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  mensaje.removeAttribute("hidden"); // muestra la sección
  form.style.display = "none";
});
