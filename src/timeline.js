import { showPostUser, saveDataPost } from "./post.js";
import { hideHamburguerBeforePost } from "./menu.js";

const dots = document.getElementById("dots");
const sectionTimeline = document.getElementById("sectionTimeline");
const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
const likeOff = document.getElementById("likeOff");
const likeOn = document.getElementById("likeOn");
// const printNumberLike = document.getElementById("numbersLikes");

// likeOff.addEventListener("click", likePost);
// likeOn.addEventListener("click", unLikePost);

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

  //onGetTask((querySnapshot) => {
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

  // let numberLikesCounter = 0;

  querySnapshot.docs.forEach((doc, index) => {
    const cardPost = doc.data();
    const likeOnId = "likeOn";
    const likeOffId = "likeOff";
    const dotsID = "dots" + index;

    sectionTimeline.innerHTML += `
          <div id="postTimelineContainer" class="post-timeline-container">
            <div id="headPostTimelineCont" class="head-post-timeline-cont">
              <div id="userProfileContainer" class="user-profile-container">
                <img src="/img/fotos de prueba/post1.jpg" alt="profile image" />
                <span>userNameProfile</span>
              </div>
              <div id="editDots" class="edit-dots">
                <button id="dots" class="dots" onclick="DotsMenu(${dotsID})"><strong>...</strong></button>
                <div class="dropdown-content" id="${dotsID}" onclick="report()" style="display: none;">
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
                <img src="/img/LikeOff.png" alt="LikeOff" class="like-off" onclick="likePost(${likeOffId})">
                <img src="/img/Likeon.png" alt="LikeOn" class="like-on" onclick="unLikePost${likeOnId}">
                
              </div>
                <div>
                  <button id="deleteButton" class="delete-button">Delete</button>      
                  <button id="editButton" class="edit-button">Edit</button>
                </div>
              </div>
            </div>
          </div>
          `;
    // console.log(document.getElementById(likeOffId));
    // document.getElementById(likeOffId).click = function () {
    //   likePost(likeOffId, likeOnId);
    // };
    // document.getElementById(likeOnId).onclick = function () {
    //   unLikePost(likeOffId, likeOnId);
    // };
    // numberLikesCounter += 1;
  });

  // <p id="numbersLikes${numberLikesCounter}"></p>

  //este botón se debe incluir y editar para ponerlo dentro del menú
  sectionTimeline.innerHTML += `<input id="testIrPost" type="button" value="Ir a post" />`;
  document.getElementById("testIrPost").onclick = testParaVerPost;
};

export const getCardPost = () => store.collection("userPostsCollection").get();

function testParaVerPost() {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
  hideHamburguerBeforePost();
}
