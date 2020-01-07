// Canvas compatability code, makes it work in IE
var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

// Auto-resize function, keeps gameRatio
var gameRatio = 16/10;
function resizeWindow() {
    if (window.innerWidth / window.innerHeight > gameRatio) {
        sh = window.innerHeight;
        sw = window.innerWidth;
        ch = canvas.height = window.innerHeight;
        cw = canvas.width = window.innerHeight * gameRatio;
    } if (window.innerWidth / window.innerHeight < gameRatio) {
        sh = window.innerHeight;
        sw = window.innerWidth;
        ch = canvas.height = window.innerWidth / gameRatio;
        cw = canvas.width = window.innerWidth;
    }
}

// When resized or rotated on mobile
window.addEventListener("resize", resizeWindow);
window.addEventListener("orientationchange", resizeWindow);

// Set up the canvas object
this.canvas = document.createElement("canvas");
this.c = canvas.getContext("2d");
cw = canvas.width = window.innerWidth;
ch = canvas.height = window.innerHeight;
resizeWindow();
document.body.appendChild(canvas);

// Key Detection
var keys = {}; // List of held keys
var keyFired = {}; // Allows for repeat protection, use !keyFired.Y and keyFired.Y = true;
document.onkeydown = function(key) {
    var k = String.fromCharCode(key.which);
    if (keys[k] === true) return;
    keys[k] = true;
    //console.log(keys); // Enable for key logging
};
document.onkeyup = function(key) {
    var k = String.fromCharCode(key.which);
    keys[k] = false;
    keyFired[k] = false;
};
window.addEventListener("focus", function() {
    keysHeld = {};
});

// Touch Detection
var touchList = [];
canvas.addEventListener("touchstart", touchStart, false);
canvas.addEventListener("touchmove", touchMove, false);
canvas.addEventListener("touchend", touchEnd, false);
function touchStart(event) {
    event.preventDefault();
    console.log("Start");
    //console.log(event);
    touchList = event.touches;
}
function touchMove(event) {
    event.preventDefault();
    //console.log("Move");
    //console.log(event);
    touchList = event.touches;
}
function touchEnd(event) {
    event.preventDefault();
    //console.log("End");
    //console.log(event);
    touchList = event.touches;
}