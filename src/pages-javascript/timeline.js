import { showPostUser, saveDataPost } from "./post.js";
import { hideHamburguerBeforePost } from "./menu.js";
// import {
//   dotsMenu,
//   report,
//   likePost,
//   unLikePost,
//   dropDown,
// } from "./click-card-function.js";

const dots = document.getElementById("dots");
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

export const loadTimeline = async () => {
  const getCardPost = () => store.collection("userPostsCollection").get();

  const onGetTask = (callback) =>
    store.collection("userPostsCollection").onSnapshot(callback);

  const querySnapshot = await store.collection("userPostsCollection").get();

  sectionTimeline.innerHTML = `<div id="headLogoUserContainer" class="head-logo-user-container">
  <div id="containerLogoTimeline" class="container-logo-timeline">
    <img src="/img/Logo.png" alt="Logo" />
    <p>Terra Tour</p>
  </div>
  <div id="userHead" class="user-head">
    <span>userNameProfile</span>
    <img src="/img/fotos de prueba/profile.jpeg" alt="profile image" />
  </div>
</div>`;

  let index = 0;
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const cardPost = querySnapshot.docs[i].data();
    const likeOnId = "likeOn" + index;
    const likeOffId = "likeOff" + index;
    const dotsID = "dots" + index;
    const dotsButtonId = "dotsButton" + index;

    sectionTimeline.innerHTML += `
          <div id="postTimelineContainer" class="post-timeline-container">
            <div id="headPostTimelineCont" class="head-post-timeline-cont">
              <div id="userProfileContainer" class="user-profile-container">
                <img src="/img/fotos de prueba/post1.jpg" alt="profile image" />
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
              <button id="${likeOffId}" > <img src="/img/LikeOff.png" alt="LikeOff" class="like-off" ></button>
              <button id="${likeOnId}" style="display: none;" > <img src="/img/LikeOn.png" alt="LikeOn" class="like-on" ></button>
                
              </div>
                <div>
                  <button id="deleteButton" class="delete-button">Delete</button>      
                  <button id="editButton" class="edit-button">Edit</button>
                </div>
              </div>
            </div>
          </div>
          `;
    index += 1;
  }

  sectionTimeline.innerHTML += `<input id="testIrPost" type="button" value="Ir a post" />`;
  document.getElementById("testIrPost").onclick = testParaVerPost;

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

export const getCardPost = () => store.collection("userPostsCollection").get();

function testParaVerPost() {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
  hideHamburguerBeforePost();
}

function likePost(likeOffId, likeOnId) {
  document.getElementById(likeOffId).style.display = "none";
  document.getElementById(likeOnId).style.display = "flex";
}

function unLikePost(likeOnId, likeOffId) {
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
