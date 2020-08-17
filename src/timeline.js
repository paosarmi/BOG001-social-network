import { showPostUser } from "./post.js";

const sectionTimeline = document.getElementById("sectionTimeline");
const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");

export const showTimelineAfterAuth = () => {
  sectionTimeline.style.display = "flex";
  formPost.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";
};

export const getCardPost = () => {
  const placePost = document.querySelector("#placePost").value;
  const descriptionPost = document.querySelector("#descriptionPost").value;
  const imgPost = document.querySelector("#imgPost").value;
};

// function () {
//     //acá vamos de las publicaciones a publicar
//     //traemos el botón (menú postear)
//     //al botón le pasamos el evento click
//     //luego pasamos función (showPostUser) para que funciones el post.js
// }

const testIrPost = document.getElementById("testIrPost");

testIrPost.addEventListener("click", testParaVerPost);

function testParaVerPost() {
  sectionTimeline.style.display = "none";
  testIrPost.style.display = "block";
  formPost.style.display = "block";
  header.style.display = "none";
  footer.style.display = "none";
}
