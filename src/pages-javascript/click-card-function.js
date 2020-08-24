export function dotsMenu(dotsID) {
  if (document.getElementById(dotsID.id).style.display == "none")
    document.getElementById(dotsID.id).style.display = "block";
  else document.getElementById(dotsID.id).style.display = "none";
}

//Oculta el menu si se preciona afuera del menu
export const dropDown = (window.onclick = function (e) {
  if (e.target.nodeName != "STRONG") {
    const myDropdown = document.getElementsByClassName("dropdown-content");
    for (let index = 0; index < myDropdown.length; index++) {
      document.getElementById(myDropdown[index].id).style.display = "none";
    }
  }
});

export function report() {
  document.getElementById("section404").style.display = "block";
  document.getElementById("sectionTimeline").style.display = "none";
}

export function likePost(likeOffId, likeOnId) {
  document.getElementById(likeOffId).style.display = "none";
  document.getElementById(likeOnId).style.display = "flex";
}

export function unLikePost(likeOnId, likeOffId) {
  document.getElementById(likeOnId).style.display = "none";
  document.getElementById(likeOffId).style.display = "flex";
}
