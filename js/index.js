const $ = selectors => document.querySelector(selectors);

const header = $("header");
// const headerHeight = header.offsetHeight;
// const showNavbarAt = $("#about").offsetTop - headerHeight;

// function checkShowHeader() {
//   if (window.pageYOffset >= showNavbarAt) {
//     header.classList.add("shown");
//   } else {
//     header.classList.remove("shown");
//   }
// }

// window.onscroll = checkShowHeader;
// checkShowHeader();

$("#navbar-button").addEventListener("click", () => {
  console.log("Opening");
  header.classList.toggle("open");
});