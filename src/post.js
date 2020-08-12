const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const sendPost = document.getElementById("sendPost");
const invalidPost = document.getElementById("invalidPost");

sendPost.addEventListener("click", formPostView);

export const showPostAfterLogin = () => {
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

const collectionImagePost = (imgPost) => {
  const storageRef = storage.ref();
  const imagesRef = storageRef.child("images");
  const fileName = imgPost;
  const spaceRef = imagesRef.child(fileName);
    
  };
  console.log("subio");

 function formPostView() {
  const placePost = document.querySelector("#placePost").value;
  const descriptionPost = document.querySelector("#descriptionPost").value;
  const imgPost = document.querySelector("#imgPost").value;
 
  if (placePost == null || placePost.length == 0 || /^\s+$/.test(placePost)) {
    invalidPost.innerHTML = "You must enter a valid place";
    return false;
  }

  if (descriptionPost == null || descriptionPost.length == 0 || /^\s+$/.test(descriptionPost)) {
    invalidPost.innerHTML = "You must enter a valid description place";
    return false;
  }

  saveDataPost(placePost, descriptionPost);

  console.log(placePost, descriptionPost);
}


