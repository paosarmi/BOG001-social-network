const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");

export const showPostAfterLogin = () => {
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
};
