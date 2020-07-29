// Este es el punto de entrada de tu aplicacion

// import { auth } from "firebase";

// import { myFunction } from "./lib/index.js";

// myFunction();
const formLogin = document.querySelector("#formLogin");
const formSignin = document.querySelector("#formSignin");
const sectionLogin = document.getElementById("sectionLogin");
const sectionSignin = document.getElementById("sectionSignin");
const signinView = document.getElementById("signinView");
const loginView = document.getElementById("loginView");

formLogin.addEventListener("submit", formAuth);
formSignin.addEventListener("submit", formAuth);
sectionSignin.style.display = "none";
signinView.addEventListener("click", returnSignin);
loginView.addEventListener("click", changeView);

function changeView() {
  sectionSignin.style.display = "block";
  sectionLogin.style.display = "none";
}

function returnSignin() {
  sectionSignin.style.display = "none";
  sectionLogin.style.display = "block";
}

function formAuth() {
  const user = document.querySelector("#user").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const confirm = document.querySelector("#confirm").value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      console.log(error);
    })
    .then((userCredential) => {
      formSignin.reset();

      console.log("sign up");
    });
}
