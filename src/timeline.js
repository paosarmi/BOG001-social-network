import { showPostUser, saveDataPost } from "./post.js";

const sectionTimeline = document.getElementById("sectionTimeline");
const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const likeOff = document.getElementById("likeOff");
const likeOn = document.getElementById("likeOn");
const printNumberLike = document.getElementById("numbersLikes");
const postTimelineContainer = document.getElementById("postTimelineContainer");

likeOff.addEventListener("click", likePost);
likeOn.addEventListener("click", dontLikePost);

export const showTimelineAfterAuth = () => {
  sectionTimeline.style.display = "flex";
  formPost.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";
};

export const getCardPost = () => store.collection("userPostsCollection").get();

window.addEventListener("DOMContentLoaded", async (e) => {
  const querySnapshot = await getCardPost();
  querySnapshot.forEach((doc) => {
    console.log(doc.data());

    const cardPost = doc.data();

    postTimelineContainer.innerHTML += `<div id="cardPostContainer" class="card-post-container">
      <div id="headerCard" class="header-card">
        <img src="${cardPost.url}" alt="Post image" />
        <p>${cardPost.placePost}</p>
        </div>
      <div id="descriptionCard" class="description-card">
        <p id="descriptionCardDate">${cardPost.dateImg}</p>
        <p>${cardPost.descriptionPost}</p>
      </div>
    </div>`;
  });
});

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
  testIrPost.style.display = "flex";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
}

function likePost() {
  likeOff.style.display = "none";
  likeOn.style.display = "flex";
  printNumberLike.innerHTML = "1";
  printNumberLike.style.display = "flex";
}

function dontLikePost() {
  likeOn.style.display = "none";
  likeOff.style.display = "flex";
  printNumberLike.style.display = "none";
}
