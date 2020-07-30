// Este es el punto de entrada de tu aplicacion

// import { auth } from "firebase";

// import { myFunction } from "./lib/index.js";

// myFunction();

var provider = new firebase.auth.GoogleAuthProvider();

const formLogin = document.querySelector("#formLogin");
const formSignin = document.querySelector("#formSignin");
const sectionLogin = document.getElementById("sectionLogin");
const sectionSignin = document.getElementById("sectionSignin");
const signinView = document.getElementById("signinView");
const loginView = document.getElementById("loginView");
const signin = document.getElementById("signin");
const warnUser = document.getElementById("warnUser");


formLogin.addEventListener("submit", formAuth);
formSignin.addEventListener("submit", formAuth);
sectionSignin.style.display = "none";
signinView.addEventListener("click", returnSignin);
loginView.addEventListener("click", changeView);
signin.addEventListener("click", formAuth);



function changeView() {
  
  sectionSignin.style.display = "block";
  sectionLogin.style.display = "none";
  warnUser.innerHTML = "";
}

function returnSignin() {
  
  sectionSignin.style.display = "none";
  sectionLogin.style.display = "block";

  warnUser.innerHTML = "";

}

function formAuth() {
  
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
 
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      warnUser.style.display = "none";
      console.log("sign up");
    })
    .catch((error) => {
      warnUser.innerHTML="User already exist";
      // console.log ("warnUser");
      
    });

}
  function googleAuth() {
    
//  const signGoogle = document.querySelector("#signGoogle").value;
//  console.log (signGoogle);

// registro con google
  auth
  .signInWithPopup(provider)
  .then(function(result) {
  // toma el resultado
  // var token = result.credential.accessToken;
  // reasigno la informacion del usuario  del api google.
  var user = result.user;
  // ...
  console.log (user);
})
    .catch(function(error) {
  // manejo de errores.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
  }