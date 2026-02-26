//Elementos del DOM para llamar al modal o cerrarlo

const loginIcon = document.getElementById("login-btn-nav");
const modal = document.getElementById("login-modal");
const close = document.getElementById("close-btn");
const loginContent = document.getElementById("hide-after-login")

//formulario de login

const logoChange = document.getElementById("image-logo");
const form = document.getElementById("form-login");

loginIcon.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  logoChange.src = "/css-styles/icons/msn-login.gif";

  setTimeout(() => {
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const msj = document.getElementById("msj");
    const username = email.split("@")[0];
    msj.innerHTML = `Bienvenid@<br> al Club, <br> ${username}`;
    loginContent.style.display = "none";
    logoChange.src = "./css-styles/icons/msn-logo.jpg";
  }, 2000);
});

close.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "none";
});
