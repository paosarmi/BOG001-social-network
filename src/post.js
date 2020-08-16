const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const sendPost = document.getElementById("sendPost");
const invalidPost = document.getElementById("invalidPost");
const imgPost = document.getElementById("imgPost");
const sectionTimeline = document.getElementById("sectionTimeline");

imgPost.addEventListener("change", collectionImagePost);
sendPost.addEventListener("click", formPostView);

export const showPostUser = () => {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
};

const saveDataPost = (placePost, descriptionPost) => {
  const docData = store.collection("userCollection").doc().set({
    placePost: placePost,
    descriptionPost: descriptionPost,
  });
};

function collectionImagePost(event) {
  const file = event.target.files[0];
  const storageRef = storage.ref("userCollectionMultimedia/" + file.name);
  const imageRef = storageRef.put(file);
  console.log(file);
}

function formPostView() {
  const placePost = document.querySelector("#placePost").value;
  const descriptionPost = document.querySelector("#descriptionPost").value;
  const imgPost = document.querySelector("#imgPost").value;

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

  saveDataPost(placePost, descriptionPost);

  console.log(placePost, descriptionPost);
}
