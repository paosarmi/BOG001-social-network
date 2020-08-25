const menuContainer = document.querySelector("#menuContainer");
const sectionTimeline = document.querySelector("#sectionTimeline");
const formPost = document.querySelector("#formPost");
const sectionSignin = document.querySelector("#sectionSignin");
const sectionLogin = document.querySelector("#sectionLogin");
const hamburger = document.querySelector(".hamburger");

export const showHamburgerAfterLogin = () => {
  menuContainer.style.display = "flex";
  sectionSignin.style.display = "none";
  sectionLogin.style.display = "none";
};

export const hideHamburguerBeforePost = () => {
  menuContainer.style.display = "none";
  formPost.style.display = "flex";
  sectionTimeline.style.display = "none";
};

export const showHamburguerAfterPost = () => {
  menuContainer.style.display = "flex";
  formPost.style.display = "none";
  sectionTimeline.style.display = "flex";
};

hamburger.addEventListener("click", menuHamburguer);

function menuHamburguer() {
  hamburger.classList.toggle("is-active");
}
