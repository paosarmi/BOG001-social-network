import { showPostUser, saveDataPost } from "./post.js";
//import { hideHamburguerBeforePost, showHamburgerAfterLogin } from "./menu.js";

const USER_PROFILE_COLLECTION = "userProfileCollection";
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
  const userId = localStorage.getItem("userUID");
  const querySnapshot = await store
    .collection(USER_POSTS_COLLECTION)
    .where("userId", "==", userId)
    .get();

  let userName = "";
  let userPhoto = "/img/Profile_placeholder.png";
  const userProfile = await store
    .collection(USER_PROFILE_COLLECTION)
    .where("userId", "==", userId)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const dataProfile = querySnapshot.docs[0].data();
        userName = dataProfile.userName;
        if (dataProfile.picture) {
          userPhoto = dataProfile.picture;
        }
      }
    });

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
    const likeOnId = "likeOnProfile" + index;
    const likeOffId = "likeOffProfile" + index;
    const modalId = "openModalProfile" + index;
    const modalContainer = "modalContainerId" + index;
    const cancelId = "cancelModalProfile" + index;
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
                <button id="${likeOffId}" post-id="${querySnapshot.docs[i].id}" style="${displayOff} class="btn-like" ><img src="/img/LikeOff.png" alt="LikeOff" class="like-off" ></button>
                <button id="${likeOnId}" post-id="${querySnapshot.docs[i].id}" style="${displayOn}" class="btn-like"><img src="/img/LikeOn.png" alt="LikeOn" class="like-on" ></button>
                <p>${cardPost.like.length}</p>
              </div>
                <div>
                  <button id="${modalId}" post-id="${querySnapshot.docs[i].id}" class="delete-button">Delete</button>     
                    <div id = "${modalContainer}" class = "modal-container">
                      <div class = "modal">
                      <h1>Delete post!</h1>
                        <div class = "modal-button">
                        <button id="${deleteButtonId}" post-id="${querySnapshot.docs[i].id}" class="confirm-button">Confirm</button>
                        <button id="${cancelId}" class="cancel-button">Cancel</button>
                        </div>
                      </div>
                      </div>
                      </div>
                    <div> 
                  <button id="editButton" class="edit-button">Edit</button>
              </div>
            </div>
          </div>
          `;
    index += 1;
  }

  for (let i = 0; i < index; i++) {
    const likeOnId = "likeOnProfile" + i;
    const likeOffId = "likeOffProfile" + i;
    const modalId = "openModalProfile" + i;
    const modalContainer = "modalContainerId" + i;
    const cancelId = "cancelModalProfile" + i;
    const deleteButtonId = "deleteButton" + i;


    document.getElementById(likeOnId).addEventListener("click", function () {
      unLikePost(likeOnId, likeOffId);
    });
    document.getElementById(likeOffId).addEventListener("click", function () {
      likePost(likeOffId, likeOnId);
    });

    const modalContainerDOM = document.getElementById(modalContainer);

    document.getElementById(modalId).addEventListener("click", function () {
      modalContainerDOM.style.display = "flex";
      modalContainerDOM.style.opacity = "1";
      modalContainerDOM.style.visibility = "visible";
    });

    document.getElementById(cancelId).addEventListener("click", function () {
      modalContainerDOM.style.display = "none";
    });

    const postId = document
      .getElementById(deleteButtonId)
      .getAttribute("post-id");
    document.getElementById(deleteButtonId).addEventListener("click", function () {
      deletePost(postId);
    });
  };
};

async function likePost(likeOffId, likeOnId) {
  const postId = document.getElementById(likeOffId).getAttribute("post-id");
  const userId = localStorage.getItem("userUID");
  await store
    .collection(USER_POSTS_COLLECTION)
    .doc(postId)
    .get()
    .then((post) => {
      let likesContainer = post.data().like;
      likesContainer.push(userId);
      store.collection(USER_POSTS_COLLECTION).doc(postId).update({
        like: likesContainer,
      });
    });
  document.getElementById(likeOffId).style.display = "none";
  document.getElementById(likeOnId).style.display = "flex";
}

async function unLikePost(likeOnId, likeOffId) {
  const postId = document.getElementById(likeOffId).getAttribute("post-id");
  const userId = localStorage.getItem("userUID");
  await store
    .collection(USER_POSTS_COLLECTION)
    .doc(postId)
    .get()
    .then((post) => {
      let likesContainer = post.data().like;
      for (let i = 0; i < likesContainer.length; i++) {
        if (likesContainer[i] == userId) {
          likesContainer.splice(i, 1);
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
