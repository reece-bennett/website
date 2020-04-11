const $ = selectors => document.querySelector(selectors);

const header = $("header");
const headerHeight = header.offsetHeight;
const yPos = $("#about").offsetTop - headerHeight;

function checkHeader() {
  if (window.pageYOffset >= yPos) {
    header.classList.add("shown");
  } else {
    header.classList.remove("shown");
  }
};

window.onscroll = checkHeader;
checkHeader();

$("#navbar-button").addEventListener("click", () => {
  header.classList.toggle("open");
});