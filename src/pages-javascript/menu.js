import { showMyProfile } from "./my-profile.js";

const menuContainer = document.querySelector("#menuContainer");
const sectionTimeline = document.querySelector("#sectionTimeline");
const formPost = document.querySelector("#formPost");
const sectionSignin = document.querySelector("#sectionSignin");
const sectionLogin = document.querySelector("#sectionLogin");
const sectionMyProfile = document.getElementById("sectionMyProfile");
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
  document.getElementById("postButton").addEventListener("click", showPost);
  document
    .getElementById("myProfileButton")
    .addEventListener("click", showMyProfile);
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

export function showPost() {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  sectionMyProfile.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";
  hideHamburguerBeforePost();
}

/*   sectionTimeline.innerHTML += `<input id="testIrPost" type="button" value="Ir a post" /> 
  <input id="testIrMyProfile" type="button" value="Ir a My profile" />`;
   document.getElementById("testIrPost").onclick = testParaVerPost;
  document.getElementById("testIrMyProfile").onclick = showMyProfile; */
