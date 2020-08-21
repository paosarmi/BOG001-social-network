import { showPostUser, saveDataPost } from "./post.js";
import { hamburgerFloatMenu } from "./menu.js";

const dots = document.getElementById("dots");
const sectionTimeline = document.getElementById("sectionTimeline");
const formPost = document.getElementById("formPost");
const header = document.getElementById("header");
const footer = document.getElementById("footer");
// const likeOff = document.getElementById("likeOff");
// const likeOn = document.getElementById("likeOn");
// const printNumberLike = document.getElementById("numbersLikes");

// likeOff.addEventListener("click", likePost);
// likeOn.addEventListener("click", unLikePost);

export const showTimelineAfterAuth = () => {
  sectionTimeline.style.display = "flex";
  formPost.style.display = "none";
  header.style.display = "none";
  footer.style.display = "none";
};



export const getCardPost = () => store.collection("userPostsCollection").get();

const onGetTask = (callback) =>
  store.collection("userPostsCollection").onSnapshot(callback);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTask((querySnapshot) => {
    // const querySnapshot = await getCardPost();

    sectionTimeline.innerHTML += `<div id="headLogoUserContainer" class="head-logo-user-container">
  <div id="containerLogoTimeline" class="container-logo-timeline">
    <img src="/img/Logo.png" alt="Logo" />
    <p>Terra Tour</p>
  </div>
  <div id="userHead" class="user-head">
    <span>userNameProfile</span>
    <img src="/img/fotos de prueba/profile.jpeg" alt="profile image" />
  </div>
</div>`;

    let numberLikesCounter = 0;

    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      const userPostsCollection = doc.data();
      const cardPost = doc.data();

      const likeOnId = "likeOn" + numberLikesCounter;
      const likeOffId = "likeOff" + numberLikesCounter;
      const dotsID = "dots" + numberLikesCounter;

      sectionTimeline.innerHTML += `
          <div id="postTimelineContainer" class="post-timeline-container">
            <div id="headPostTimelineCont" class="head-post-timeline-cont">
              <div id="userProfileContainer" class="user-profile-container">
                <img src="/img/fotos de prueba/post1.jpg" alt="profile image" />
                <span>userNameProfile</span>
              </div>
              <div id="editDots" class="edit-dots">
                <p id="dots" class="dots" onclick="DotsMenu(${dotsID})"><strong>...</strong></p>
                <div class="dropdown-content" id="${dotsID}" onclick="report()">
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
                  <img src="/img/LikeOff.png" alt="LikeOff" class="like-off" id="${likeOffId}">
                  <img src="/img/Likeon.png" alt="LikeOn" class="like-on" id="${likeOnId}">
                  <p id="numbersLikes${numberLikesCounter}"></p>
                </div>
                <div>
                  <button id="DeleteButton" class="delete-button">Delete</button>      
                  <button id="EditButton" class="edit-button">Edit</button>
                </div>
              </div>
            </div>
          </div>
          `;
     

      document.getElementById(likeOffId).onclick = function () {
        likePost(likeOffId, likeOnId);
      };
      document.getElementById(likeOnId).onclick = function () {
        unLikePost(likeOffId, likeOnId);
      };
      numberLikesCounter += 1;
    });

    //este botón se debe incluir y editar para ponerlo dentro del menú
    sectionTimeline.innerHTML += `<input id="testIrPost" type="button" value="Ir a post" />`;
    document.getElementById("testIrPost").onclick = testParaVerPost;
  });
});

function testParaVerPost() {
  sectionTimeline.style.display = "none";
  formPost.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
}


function likePost(likeOffId, likeOnId) {
  document.getElementById(likeOffId).style.display = "none";
  document.getElementById(likeOnId).style.display = "flex";
  // printNumberLike.innerHTML = "1";
  // printNumberLike.style.display = "flex";
}

function unLikePost(likeOffId, likeOnId) {
  document.getElementById(likeOnId).style.display = "none";
  document.getElementById(likeOffId).style.display = "flex";
  // printNumberLike.style.display = "none";
}


{/* <div id="headerCard" class="header-card">
        <img src="${cardPost.url}" alt="Post image" />
        <p>${cardPost.placePost}</p>
        </div>
      <div id="descriptionCard" class="description-card">
        <p id="descriptionCardDate">${cardPost.dateImg}</p>
        <p>${cardPost.descriptionPost}</p>
      </div> */}