console.log("Running loadJSON.js");

function loadJSON(url, onsuccess) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        console.log(url + " ReadyState: " + request.readyState);
        if ((request.readyState == 4) && (request.status == 200)) {// if DONE and SUCCESS
            console.log(url + ".json has loaded!");
            onsuccess(JSON.parse(request.responseText));
        }
    }
    console.log("Open request for " + url + ".json");
    request.open("GET", url + ".json", true);
    request.send();
}

console.log("loadJSON.js has run");