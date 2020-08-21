import { getCardPost } from "./timeline.js";

const x = document.getElementById("x");
const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const sendPost = document.getElementById("sendPost");
const invalidPost = document.getElementById("invalidPost");
const imgPost = document.getElementById("imgPost");
const sectionTimeline = document.getElementById("sectionTimeline");
var image;


x.addEventListener("click",getBack);
imgPost.addEventListener("change", getImage);
sendPost.addEventListener("click", formPostView);

export const showPostUser = () => {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
};

function getBack(){
  sectionTimeline.style.display = "flex";
  testIrPost.style.display = "flex";
  formPost.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";
}

function getImage(event) {
  image = event.target.files[0];
}

export const saveDataPost = (placePost, descriptionPost, userId, url) => {
  const datePost = new Date();
  const dateImg = datePost.toISOString().slice(0, 10);
  const docData = store
    .collection("userPostsCollection")
    .add({
      userId: userId,
      placePost: placePost,
      descriptionPost: descriptionPost,
      image: image.name,
      dateImg: dateImg,
      url: url,
    })
    .then((docRef) => {})
    .catch((error) => {});
};

function formPostView() {
  const placePost = document.querySelector("#placePost").value;
  const descriptionPost = document.querySelector("#descriptionPost").value;
  const userId = localStorage.getItem("userUID");
  const imgPost = document.querySelector("#imgPost").value;
  const fileName = imgPost.replace(/^.*[\\\/]/, "");

  if (placePost == null || placePost.length == 0 || /^\s+$/.test(placePost)) {
    invalidPost.innerHTML = "You must enter a valid place";
    return false;
  }

  if (imgPost == null || imgPost.length == 0 || /^\s+$/.test(imgPost)) {
    invalidPost.innerHTML = "You must enter a valid image";
    return false;
  }

  if (
    descriptionPost == null ||
    descriptionPost.length == 0 ||
    /^\s+$/.test(descriptionPost)
  ) {
    invalidPost.innerHTML = "You must enter a valid description place";
    return false;
  }

  const prueba = "userCollectionMultimedia/" + userId + "/" + image.name;
  const storageRef = storage.ref(prueba);
  const imageRef = storageRef
    .put(image)
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      saveDataPost(placePost, descriptionPost, userId, url);
    })
    .catch(function (error) {});

  getCardPost();
}
