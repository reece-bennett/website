function getID(id) {
  return document.getElementById(id);
}

var page = {}
var search = "";
var gotLink = false;

window.onload = function() {
  page.searchBar = getID("searchBar");
  page.instructions = getID("instructions");
  page.sim = getID("sim-container");
  page.address = getID("sim-addressBar");
  page.simSearch = getID("sim-searchBar");
  page.simPage = getID("sim-page");

  search = getSearch();
  if (search) {
    page.instructions.hidden = false;
    page.sim.hidden = false;
    getID("searchContainer").hidden = true;
    console.log("Query is: " + search);
    enterAddress(search);
  }

  page.searchBar.addEventListener("keyup", function() {
    console.log("input changed");
    if (page.searchBar.value != "") {
      getID("getLink").disabled = false;
      getID("preview").disabled = false;
    } else {
      getID("getLink").disabled = true;
      getID("preview").disabled = true;
    }
  });
}

function getLink() {
  var search = page.searchBar.value;
  page.searchBar.value = window.location.href + "?q=" + encodeURIComponent(search);
  page.searchBar.select();
  var status = document.execCommand("copy");
  if (status) {
    console.log("Copied: " + page.searchBar.value);
  } else {
    console.log("Copying failed");
  }
  getID("getLink").hidden = true;
  getID("searchAgain").hidden = false;
  gotLink = true;
}

function getSearch() {
  var url = window.location.href;
  var s = url.split("?q=")[1]
  return s;
}

// Step 1: visit Hoogle
// Step 2: Type your query
// Step 3: Click the button
// Thats it!

function typeInto(el, string, i, callback) {
  setTimeout(function() {
    el.innerHTML = el.innerHTML + string[0];
    if (--i) typeInto(el, string.slice(1), i, callback);
    if (i == 0) callback();
  }, 100);
}

function goToHoogle() {
  page.instructions.innerHTML = "That's it!";

  setTimeout(function() {
    window.location.href = "https://www.haskell.org/hoogle/?q=" + search;
  }, 3000);
}

function enterSearch() {
  page.instructions.innerHTML = "Step 2: Type your query";
  var s = decodeURIComponent(search);
  typeInto(page.simSearch, s, s.length, function() {
    setTimeout(function() { goToHoogle() }, 2000);
  });
}

function enterAddress() {
  page.instructions.innerHTML = "Step 1: Go to Hoogle";
  var url = "https://www.haskell.org/hoogle/";
  typeInto(page.address, url, url.length, function() {
    page.simPage.hidden = false;
    setTimeout(function() { enterSearch(); }, 2000);
  });
}

function doSearchAgain() {
  getID("getLink").hidden = false;
  getID("searchAgain").hidden = true;
  gotLink = false;
}

function doPreview() {
  console.log("Preview");
  var isHidden = page.searchBar.hidden;
  if (gotLink) {
    window.open(page.searchBar.value);
  } else {
    window.open(window.location.href + "?q=" + encodeURIComponent(page.searchBar.value));
  }
}