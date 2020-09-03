import { showPostUser, saveDataPost } from "./post.js";
//import { hideHamburguerBeforePost, showHamburgerAfterLogin } from "./menu.js";

const USER_POSTS_COLLECTION = "userPostsCollection";
const sectionTimeline = document.getElementById("sectionTimeline");
const sectionMyProfile = document.getElementById("sectionMyProfile");
const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const userId = localStorage.getItem("userUID");

export const showMyProfile = () => {
  sectionMyProfile.style.display = "flex";
  sectionTimeline.style.display = "none";
  formPost.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";
  loadMyProfile();
};

export const loadMyProfile = async () => {
  const querySnapshot = await store
    .collection(USER_POSTS_COLLECTION)
    .where("userId", "==", userId)
    .get();

  let userPhoto = localStorage.getItem("userPhoto"); // Traemos la foto del usuario del local storage
  let userName = localStorage.getItem("userName");

  if (!userPhoto) {
    // Si no hay foto ponemos la por defecto
    userPhoto = "/img/fotos de prueba/profile.jpeg";
  }

  if (!userName) {
    // Si no hay nombre de usuario se coloca uno por defecto
    userName = "userNameProfile";
  }

  sectionMyProfile.innerHTML = ` 
            <div class = "header-profile">
              <img src="/img/Logo.png" alt="Logo" class="logo-profile" >
              <h1>Profile</h1>
            </div>
            <div id="userHead" class="user-head-profile"> 
                  <img src="${userPhoto}" alt="profile image" />
                  <span>${userName}</span>
            </div>`;

  let index = 0;
  let displayOff = "display: flex;";
  let displayOn = "display: none;";

  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const cardPost = querySnapshot.docs[i].data();
    const likeOnId = "likeOn" + index;
    const likeOffId = "likeOff" + index;
    const deleteButtonId = "deleteButton" + index;
    displayOff = "display: flex;";
    displayOn = "display: none;";

    for (let i = 0; i < cardPost.like.length; i++) {
      if (cardPost.like[i] == userId) {
        displayOff = "display: none;";
        displayOn = "display: flex;";
        break;
      }
    }

    sectionMyProfile.innerHTML += `
            <div id="cardPostContainer" class="card-post-container-profile">
              <div id="headerCard" class="header-card">
                <img src="${cardPost.url}" alt="Post image" />
                <p>${cardPost.placePost}</p>
              </div>
              <div id="descriptionCard" class="description-card">
                <p id="descriptionCardDate">${cardPost.dateImg}</p>
                <p>${cardPost.descriptionPost}</p>
              <div class="container-like">
                <button class = "btn-like" id="${likeOffId}" post-id="${querySnapshot.docs[i].id}" style="${displayOff}" > <img src="/img/LikeOff.png" alt="LikeOff" class="like-off" ></button>
                <button class = "btn-like" id="${likeOnId}" post-id="${querySnapshot.docs[i].id}" style="${displayOn}" > <img src="/img/LikeOn.png" alt="LikeOn" class="like-on" ></button>
                <p>${cardPost.like.length}</p>
              </div>
                <div>
                  <button id="${deleteButtonId}" post-id="${querySnapshot.docs[i].id}" class="delete-button">Delete</button>      
                  <button id="editButton" class="edit-button">Edit</button>
                </div>
              </div>
            </div>
          </div>
          `;
    index += 1;
  }

  for (let i = 0; i < index; i++) {
    const likeOnId = "likeOn" + i;
    const likeOffId = "likeOff" + i;
    const deleteButtonId = "deleteButton" + i;

    document.getElementById(likeOnId).addEventListener("click", function () {
      unLikePost(likeOnId, likeOffId);
    });
    document.getElementById(likeOffId).addEventListener("click", function () {
      likePost(likeOffId, likeOnId);
    });

    const postId = document
      .getElementById(deleteButtonId)
      .getAttribute("post-id");
    document
      .getElementById(deleteButtonId)
      .addEventListener("click", function () {
        deletePost(postId);
      });
  }
};

async function likePost(likeOffId, likeOnId) {
  const postId = document.getElementById(likeOffId).getAttribute("post-id");
  console.log(postId);
  const postObject = await store
    .collection(USER_POSTS_COLLECTION)
    .doc(postId)
    .get()
    .then((post) => {
      let likesContainer = post.data().like;
      likesContainer.push(userId);
      console.log(post.data());
      store.collection(USER_POSTS_COLLECTION).doc(postId).update({
        like: likesContainer,
      });
    });
  document.getElementById(likeOffId).style.display = "none";
  document.getElementById(likeOnId).style.display = "flex";
}

async function unLikePost(likeOnId, likeOffId) {
  const postId = document.getElementById(likeOffId).getAttribute("post-id");
  console.log(postId);
  const postObject = await store
    .collection(USER_POSTS_COLLECTION)
    .doc(postId)
    .get()
    .then((post) => {
      let likesContainer = post.data().like;
      for (let i = 0; i < likesContainer.length; i++) {
        if (likesContainer[i] == userId) {
          likesContainer.splice(i, 1);
          console.log(likesContainer);
          break;
        }
      }
      store.collection(USER_POSTS_COLLECTION).doc(postId).update({
        like: likesContainer,
      });
    });
  document.getElementById(likeOnId).style.display = "none";
  document.getElementById(likeOffId).style.display = "flex";
}

async function deletePost(postId) {
  const loader = document.querySelector(".loader-gif");
  loader.style.display = "flex";

  await store
    .collection(USER_POSTS_COLLECTION)
    .doc(postId)
    .get()
    .then(async function (sfDoc) {
      if (sfDoc.exists) {
        await store
          .collection(USER_POSTS_COLLECTION)
          .doc(postId)
          .delete()
          .then(async function () {
            console.log("Document successfully deleted!");
            await loadMyProfile();
          })
          .catch(function (error) {
            console.error("Error removing document: ", error);
          });
      }
    });
  loader.style.display = "none";
}

export const getCardPost = () => store.collection(USER_POSTS_COLLECTION).get();

/* function testParaVerPost() {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
  hideHamburguerBeforePost();
} */
function report() {
  document.getElementById("error404").style.display = "flex";
  document.getElementById("sectionTimeline").style.display = "none";
}
