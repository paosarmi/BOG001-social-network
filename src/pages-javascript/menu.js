const menuContainer = document.querySelector("#menuContainer");
const sectionTimeline = document.querySelector("#sectionTimeline");
const formPost = document.querySelector("#formPost");
const sectionSignin = document.querySelector("#sectionSignin");
const sectionLogin = document.querySelector("#sectionLogin");
const hamburger = document.querySelector(".hamburger");
const menu = document.getElementById("menuUList");

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

document.addEventListener("DOMContentLoaded", function (event) {
  document
    .querySelector(".menu-container")
    .addEventListener("click", function () {
      if (menu.classList[0] === "showing") {
        document.getElementById("menuUList").classList.remove("showing");
      } else {
        document.getElementById("menuUList").className = "showing";
      }
    });

  document.querySelectorAll('li[name="menuItem"').forEach((item) => {
    item.addEventListener("click", function () {
      document.getElementById("menuUList").classList.remove("showing");
    });
  });
});
