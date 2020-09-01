import { showPostUser, saveDataPost } from "./post.js";
import { hideHamburguerBeforePost, showHamburguerAfterPost } from "./menu.js";
import { showMyProfile } from "./my-profile.js";

const USER_POSTS_COLLECTION = "userPostsCollection";
const sectionTimeline = document.getElementById("sectionTimeline");
const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const sectionMyProfile = document.getElementById("sectionMyProfile");
const userId = localStorage.getItem("userUID");

export const showTimelineAfterAuth = () => {
  sectionTimeline.style.display = "flex";
  sectionMyProfile.style.display = "none";
  formPost.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";
  loadTimeline();
  showHamburguerAfterPost();
};

export const loadTimeline = async () => {
  const getCardPost = () => store.collection(USER_POSTS_COLLECTION).get();

  const onGetTask = (callback) =>
    store.collection(USER_POSTS_COLLECTION).onSnapshot(callback);

  let userPhoto = localStorage.getItem("userPhoto"); // Traemos la foto del usuario del local storage
  let userName = localStorage.getItem("userName"); // Traemos el nombre del usuario del local storage

  if (!userPhoto) // Si no hay foto ponemos la por defecto
  {
    userPhoto = "/img/fotos de prueba/profile.jpeg"
  }

  if (!userName) // Si no hay nombre de usuario se coloca uno por defecto
  {
    userName = "userNameProfile"
  }

  const querySnapshot = await store.collection(USER_POSTS_COLLECTION).orderBy("dateImg", "desc").limit(20).get();

  sectionTimeline.innerHTML = `<div id="headLogoUserContainer" class="head-logo-user-container">
  <div id="containerLogoTimeline" class="container-logo-timeline">
    <img src="/img/Logo.png" alt="Logo" />
    <p>Terra Tour</p>
  </div>
  <div id="userHead" class="user-head">
    <span>${userName}</span>
    <img src="${userPhoto}" alt="profile image" />
  </div>
 </div>`;

  let index = 0;
  let displayOff = "display: flex;"
  let displayOn = "display: none;"

  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const cardPost = querySnapshot.docs[i].data();
    const likeOnId = "likeOn" + index;
    const likeOffId = "likeOff" + index;
    const dotsID = "dots" + index;
    const dotsButtonId = "dotsButton" + index;
    displayOff = "display: flex;"
    displayOn = "display: none;"

    for (let i = 0; i < cardPost.like.length; i++) {
      if (cardPost.like[i] == userId) {
        displayOff = "display: none;"
        displayOn = "display: flex;"
        break;
      }
    }


    sectionTimeline.innerHTML += `
          <div id="postTimelineContainer" class="post-timeline-container">
            <div id="headPostTimelineCont" class="head-post-timeline-cont">
              <div id="userProfileContainer" class="user-profile-container">
                <img src="/img/fotos de prueba/profile.jpeg" alt="profile image" />
                <span>userNameProfile</span>
              </div>
              <div id="editDots" class="edit-dots">
                <button id="${dotsButtonId}" class="dots"><strong>...</strong></button>
                <div class="dropdown-content" id="${dotsID}" style="display: none;">
                  <a href="#">Report</a>
                </div>
              </div>
            </div>

            <div id="cardPostContainer" class="card-post-container">
              <div id="headerCard" class="header-card">
                <img src="${cardPost.url}" alt="Post image" />
                <p>${cardPost.placePost}</p>
              </div>
              <div id="descriptionCard" class="description-card">
                  <p id="descriptionCardDate">${cardPost.dateImg}</p>
                  <p>${cardPost.descriptionPost}</p>
                <div class="container-like">
                  <button id="${likeOffId}" post-id="${querySnapshot.docs[i].id}" style="${displayOff}" > <img src="/img/LikeOff.png" alt="LikeOff" class="like-off" ></button>
                  <button id="${likeOnId}" post-id="${querySnapshot.docs[i].id}" style="${displayOn}" > <img src="/img/LikeOn.png" alt="LikeOn" class="like-on" ></button>
                </div>
                <p>${cardPost.like.length}</p>
              </div>
            </div>
          </div>
          `;
    index += 1;
  }

  sectionTimeline.innerHTML += `<input id="testIrPost" type="button" value="Ir a post" /> 
  <input id="testIrMyProfile" type="button" value="Ir a My profile" />`;
  document.getElementById("testIrPost").onclick = testParaVerPost;
  document.getElementById("testIrMyProfile").onclick = showMyProfile;

  for (let i = 0; i < index; i++) {
    const likeOnId = "likeOn" + i;
    const likeOffId = "likeOff" + i;
    const dotsID = "dots" + i;
    const dotsButtonId = "dotsButton" + i;

    document.getElementById(likeOnId).addEventListener("click", function () {
      unLikePost(likeOnId, likeOffId);
    });
    document.getElementById(likeOffId).addEventListener("click", function () {
      likePost(likeOffId, likeOnId);
    });
    document
      .getElementById(dotsButtonId)
      .addEventListener("click", function () {
        dotsMenu(dotsID);
      });
  }

  const myDropdown = document.getElementsByClassName("dropdown-content");
  for (let index = 0; index < myDropdown.length; index++) {
    document
      .getElementById(myDropdown[index].id)
      .addEventListener("click", report);
  }
};

export const getCardPost = () => store.collection(USER_POSTS_COLLECTION).get();

function testParaVerPost() {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
  hideHamburguerBeforePost();
}

async function likePost(likeOffId, likeOnId) {
  const postId = document
    .getElementById(likeOffId)
    .getAttribute("post-id");
  console.log(postId)
  const postObject = await store
    .collection(USER_POSTS_COLLECTION)
    .doc(postId)
    .get().
    then((post) => {
      let likesContainer = post.data().like;
      likesContainer.push(userId)
      console.log(post.data())
      store
        .collection(USER_POSTS_COLLECTION)
        .doc(postId).update({
          like: likesContainer,
        })
    })
  document.getElementById(likeOffId).style.display = "none";
  document.getElementById(likeOnId).style.display = "flex";
}

async function unLikePost(likeOnId, likeOffId) {
  const postId = document
    .getElementById(likeOffId)
    .getAttribute("post-id");
  console.log(postId)
  const postObject = await store
    .collection(USER_POSTS_COLLECTION)
    .doc(postId)
    .get().
    then((post) => {
      let likesContainer = post.data().like;
      for (let i = 0; i < likesContainer.length; i++) {
        if (likesContainer[i] == userId) {
          likesContainer.splice(i, 1);
          console.log(likesContainer)
          break;
        }
      }
      //console.log(likesContainer)
      store
        .collection(USER_POSTS_COLLECTION)
        .doc(postId).update({
          like: likesContainer,
        })
    })
  document.getElementById(likeOnId).style.display = "none";
  document.getElementById(likeOffId).style.display = "flex";
}

function report() {
  document.getElementById("error404").style.display = "flex";
  document.getElementById("sectionTimeline").style.display = "none";
}

function dotsMenu(dotsID) {
  if (document.getElementById(dotsID).style.display == "none")
    document.getElementById(dotsID).style.display = "block";
  else document.getElementById(dotsID).style.display = "none";
}
