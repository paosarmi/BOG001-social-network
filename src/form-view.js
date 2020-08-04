// Este es el punto de entrada de tu aplicacion

//const { auth } = require("firebase");

//const { auth } = require("firebase");

//import { auth } from index.html;
// import { myFunction } from "./lib/index.js";
// myFunction();

const sectionLogin = document.getElementById("sectionLogin");
const sectionSignin = document.getElementById("sectionSignin");
const signinView = document.getElementById("signinView");
const loginView = document.getElementById("loginView");
const signin = document.getElementById("signin");
const login = document.getElementById("login");
const warnUser = document.getElementById("warnUser");
const warnNoExist = document.getElementById("warnNoExist");
const signGoogle = document.getElementById("signGoogle");
const loginGoogle = document.getElementById("loginGoogle");

sectionSignin.style.display = "none";
signinView.addEventListener("click", returnSignin);
loginView.addEventListener("click", changeView);
signin.addEventListener("click", formAuth);
login.addEventListener("click", loginAuth);
signGoogle.addEventListener("click", googleAuth);
loginGoogle.addEventListener("click", googleAuth);

function changeView() {
  sectionSignin.style.display = "block";
  sectionLogin.style.display = "none";
  warnUser.innerHTML = "";
  warnNoExist.innerHTML = "";
}

function returnSignin() {
  sectionSignin.style.display = "none";
  sectionLogin.style.display = "block";
  warnUser.innerHTML = "";
  warnNoExist.innerHTML = "";
}

function formAuth() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const pass = document.getElementById("password").value;
  if (pass == null || pass.length == 0 || /^\s+$/.test(pass)) {
    warnUser.innerHTML = "You must enter the password";
    return false;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      warnUser.style.display = "none";
      console.log("sign up");
    })
    .catch((error) => {
      warnUser.innerHTML = "User already exist";
      // console.log ("warnUser");
    });
}

function loginAuth() {
  const email = document.querySelector("#emailLogin").value;
  const password = document.querySelector("#passwordLogin").value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      warnNoExist.innerHTML = "";
      console.log("Correcto");
    })
    .catch((error) => {
      warnNoExist.innerHTML = "Username does not exist.";
      console.log(error);
    });
}

function googleAuth() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");

  auth
    .signInWithPopup(provider)
    .then(function (result) {
      const token = result.credential.accesstoken;
      const user = result.user;
      console.log(user);
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorEmail = error.email;
      const errorCredential = error.credential;

      if (errorCode === "auth/account-exists-with-different-credential") {
        alert("User already exist.");
      }
    });
}
