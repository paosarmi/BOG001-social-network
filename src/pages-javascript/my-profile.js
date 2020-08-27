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

  sectionMyProfile.innerHTML = ` 
            <div id="userHead" class="user-head"> 
                  <img src="/img/fotos de prueba/profile.jpeg" alt="profile image" />
                  <span>userNameProfile</span>
            </div>`;

  let index = 0;
  for (let i = 0; i < querySnapshot.docs.length; i++) {
    const cardPost = querySnapshot.docs[i].data();
    const likeOnId = "likeOn" + index;
    const likeOffId = "likeOff" + index;
    const deleteButtonId = "deleteButton" + index;

    sectionMyProfile.innerHTML += `
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
                  <button id="${deleteButtonId}" post-id="${querySnapshot.docs[i].id}" class="delete-button">Delete</button>      
                  <button id="editButton" class="edit-button">Edit</button>
                </div>
              </div>
            </div>
          </div>
          `;
    index += 1;
  }

  sectionMyProfile.innerHTML += `<input id="testIrPost" type="button" value="Ir a post" />`;
  document.getElementById("testIrPost").onclick = testParaVerPost;

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
