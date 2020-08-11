const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const sendPost = document.getElementById("sendPost");

sendPost.addEventListener("click", formPostView);

export const showPostAfterLogin = () => {
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
};

const saveDataPost = (placePost, descriptionPost) =>
  store.collection("userCollection").doc().set({
    placePost: placePost,
    descriptionPost: descriptionPost,
  });

async function formPostView() {
  const placePost = document.getElementById("placePost").value;
  const descriptionPost = document.getElementById("descriptionPost").value;

  await saveDataPost(placePost, descriptionPost);

  console.log(placePost, descriptionPost);
}
