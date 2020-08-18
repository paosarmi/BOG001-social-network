import { showPostUser, saveDataPost } from "./post.js";


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
  store.collection("userPostsCollection").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
    })
  });
  // window.addEventListener("DOMContentLoaded"){
  //   const
  // }
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
  testIrPost.style.display = "flex";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
}


