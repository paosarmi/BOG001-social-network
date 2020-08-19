const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const sendPost = document.getElementById("sendPost");
const invalidPost = document.getElementById("invalidPost");
const imgPost = document.getElementById("imgPost");
const sectionTimeline = document.getElementById("sectionTimeline");

//imgPost.addEventListener("change", collectionImagePost);
sendPost.addEventListener("click", formPostView);

export const showPostUser = () => {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
};

export const saveDataPost = (placePost, descriptionPost) => {
  const imgPost = document.querySelector("#imgPost").value;
  const userId = localStorage.getItem("userUID");
  //.replace deja unicamente el nombre del archivo o foto que se subió quitando el path anterior
  const fileName = imgPost.replace(/^.*[\\\/]/, "");
  const datePost = new Date();
  const dateImg = datePost.toISOString().slice(0, 10);
  const docData = store
    .collection("userPostsCollection")
    .add({
      userId: userId,
      placePost: placePost,
      descriptionPost: descriptionPost,
      fileName: fileName,
      dateImg: dateImg,
    })
    .then((docRef) => {
      //acá se puede llamar el metodo collectionImagePost para guardar el archivo que se sube en el post
      collectionImagePost(userId, imgPost, fileName);
      console.log(collectionImagePost);
    })
    .catch((error) => {
      //acá el error ej: "no se pudo guardar post"
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const errorEmail = error.email;
      // const errorCredential = error.credential;
      console.log(error);
    });
};

function collectionImagePost(userId, imgPost, fileName) {
  // const file = event.target.files[0];
  const storageRef = storage.ref(
    "userCollectionMultimedia/" + userId + "/" + fileName
  );
  const imageRef = storageRef.put(imgPost, fileName);
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
