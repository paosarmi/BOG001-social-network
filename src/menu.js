const menuContainer = document.querySelector("#menuContainer");
const sectionTimeline = document.querySelector("#sectionTimeline");
const formPost = document.querySelector("#formPost");
const sectionSignin = document.querySelector("#sectionSignin");
const sectionLogin = document.querySelector("#sectionLogin");
const hamburger = document.querySelector(".hamburger");

export const hamburgerFloatMenu = () => {
  menuContainer.style.display = "flex";
  sectionTimeline.style.display = "flex";
  formPost.style.display = "none";
  sectionSignin.style.display = "none";
  sectionLogin.style.display = "none";
};

hamburger.addEventListener("click", menuHamburguer);

function menuHamburguer() {
  hamburger.classList.toggle("is-active");
}
