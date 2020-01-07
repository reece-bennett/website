var debug = true; // False for on at the start, strange I know right? ;)
function toggleDebug() {
    if (debug) {
        document.getElementById("debug").style.visibility = "hidden";
        debug = false;
        console.log("Turning off debug");
    } else {
        document.getElementById("debug").style.visibility = "visible";
        debug = true;
        console.log("Turning on debug");
    }
}
toggleDebug();

// Menu stuff
var menuBG = document.getElementById("menuBackground");
var main = document.getElementById("startScreenContainer");
var options = document.getElementById("optionsContainer");
var help = document.getElementById("helpContainer");
var menuButton = document.getElementById("menuButtonContainer");
var start = document.getElementById("startGameContainer");
var restart = document.getElementById("gameOverContainer");
var pUpContainer = document.getElementById("powerUpContainer");

// All menus start hidden so reveal main menu
main.style.opacity = "1";
main.style.display = "inherit";

function openMenu() {
    canvas.style["-webkit-filter"] = "blur(5px)";

    menuButton.style["-webkit-filter"] = "blur(5px)";

    menuBG.style.display = "inherit";
    menuBG.style.opacity = "1";
}

function closeMenu() {
    canvas.style["-webkit-filter"] = "blur(0)";

    menuButton.style["-webkit-filter"] = "blur(0)";

    menuBG.style.opacity = "0";
    menuBG.style.display = "none";

    start.style.display = "inherit";
    start.style.opacity = "1";
}

function changeMenu(from, to) {
    var from, to;
    switch (from) {
        case "main": from = main; break;
        case "options": from = options; break;
        case "help": from = help; break;
    }
    switch (to) {
        case "main": to = main; break;
        case "options": to = options; break;
        case "help": to = help; break;
    }
    from.style.opacity = "0";
    from.style.display = "none";

    to.style.display = "inherit";
    to.style.opacity = "1";
}

function gameOver(winner) {
    restart.style.display = "inherit";
    restart.style.opacity = "1";
    document.getElementById("gameOverText").innerHTML = winner + " wins!"
}

function startGame() {
    start.style.opacity = "0";
    restartGame();
    start.style.display = "none";
}

function toggleFPS() {
    if (fpsmeterEnabled) {
        fpsmeterEnabled = false;
        fpsmeter.hide();
    } else {
        fpsmeterEnabled = true;
        fpsmeter.show();
    }
}
// Menu stuff end

function restartGame() {
    // Close the restart menu if open
    restart.style.opacity = "0";
    restart.style.display = "none";

    ball.x = ball.orgX;
    ball.y = ball.orgY;
    if (Math.random() > 0.5) {ball.vx = 0.1;}
    else {ball.vx = -0.1;}
    if (Math.random() > 0.5) {ball.vy = 0.01;}
    else {ball.vy = -0.01;}
    paddle.x = paddle.orgX;
    paddle.y = paddle.orgY;
    comPaddle.x = comPaddle.orgX;
    comPaddle.y = comPaddle.orgY;
    paddle.height = paddleHeight;
    comPaddle.height = paddleHeight;
}

function input() {

    if (keys.W) {paddle.vy -= paddleSpeed;}
    if (keys.S) {paddle.vy += paddleSpeed;}
    /*if (keys.O) {comPaddle.vy -= paddleSpeed;}
    if (keys.L) {comPaddle.vy += paddleSpeed;}*/
    if (keys["&"]) {comPaddle.vy -= paddleSpeed;}
    if (keys["("]) {comPaddle.vy += paddleSpeed;}
    if (keys[" "] && !keyFired[" "]) {restartGame(); keyFired[" "] = true;}

    /*if (keys.Z && !keyFired.Z) {keyFired.Z = true, lastHit = paddle;
        powerUp.effect = "short"; doPowerUp(true);}
    if (keys.X && !keyFired.X) {keyFired.X = true, lastHit = paddle;
        powerUp.effect = "long"; doPowerUp(true);}
    if (keys.C && !keyFired.C) {keyFired.C = true, lastHit = paddle;
        powerUp.effect = "fast"; doPowerUp(true);}
    if (keys.V && !keyFired.V) {keyFired.D = true, lastHit = paddle;
        powerUp.effect = "slow"; doPowerUp(true);}*/

    /*if (keys["&"]) {ball.vy = 0; ball.vx = 0; ball.y -= 0.2;}
    if (keys["'"]) {ball.vy = 0; ball.vx = 0; ball.x += 0.2;}
    if (keys["("]) {ball.vy = 0; ball.vx = 0; ball.y += 0.2;}
    if (keys["%"]) {ball.vy = 0; ball.vx = 0; ball.x -= 0.2;}*/

    /*if (keys.F) {ball.vx -= 0.2;}
    if (keys.G) {ball.vx += 0.2;}*/

    if (touchList.length == 0) {t = 1}
    else {t = touchList.length}
    for (i = 0; i < touchList.length; i++) {
        var touch = {
            x: touchList[i].pageX,
            y: touchList[i].pageY,
        };
        //document.getElementById("debug").innerHTML = "X: " + touch.x.toFixed() + " Y: " + touch.y.toFixed() + " W: " + touchWidth.toFixed() + " H " + touchHeight.toFixed();
        //console.log(cw);
        //console.log(window.innerWidth);
        if (touch.y < sh / 2 && touch.x < sw * 0.3) {paddle.vy -= paddleSpeed;;}
        if (touch.y > sh / 2 && touch.x < sw * 0.3) {paddle.vy += paddleSpeed;;}
        if (touch.y < sh / 2 && touch.x > sw * 0.7) {comPaddle.vy -= paddleSpeed;}
        if (touch.y > sh / 2 && touch.x > sw * 0.7) {comPaddle.vy += paddleSpeed;}
    }
}

var computerPlayer;
function doComputerMove() {
    // The computer paddle just follows the ball
    if ( (comPaddle.y + comPaddle.height / 2) - (ball.y + ball.height / 2) > 0.5) {comPaddle.vy -= paddleSpeed;}
    if ( (comPaddle.y + comPaddle.height / 2) - (ball.y + ball.height / 2) < -0.5 ) {comPaddle.vy += paddleSpeed;}
}

function physics(delta, timestamp) {
    // Cycle Entities
    for (i = 0; i < entityList.length; i++) {
        var e = entityList[i];
        // If affected by physics add gravity and take drag
        if (e.doPhysics) {
            if (e == ball) {m = 0.01;}
            else {m = 1;}
            e.vx += gravity.x * delta;
            e.vy += gravity.y * delta;
            e.vx -= e.vx * drag.x * m * delta;
            e.vy -= e.vy * drag.y * m * delta;
        }

        // Stop the ball going really fast in y direction
        if (ball.vy > 0.15) {ball.vy = 0.15;}
        if (ball.vy < -0.15) {ball.vy = -0.15;}

        e.x += e.vx * delta;
        e.y += e.vy * delta;

        // If the object collides with others do checks with all and resolve
        if (e.movable) {
            for (j = 0; j < entityList.length; j++) {
                var e2 = entityList[j];
                if (collisionTest(e, e2)) {
                    if (e == ball && (e2 == paddle || e2 == comPaddle)) {
                        lastHit = e2;
                        e2.movable = false;
                        resolveCollision(e2, e, delta);
                        e2.movable = true;
                        if (Math.abs(ball.vx) != 0.1) {
                            var s = Math.abs(0.1 / ball.vx);
                            ball.vx *= s;
                            ball.vy *= s;
                        }
                        break
                    }
                    if (e2 == powerUp) {doPowerUp(true); break}
                    resolveCollision(e2, e, delta);
                }
            }
        }
    }
}

function doPowerUp(hit) {
    var index = entityList.indexOf(powerUp);

    // If powerup is not in the game
    if (index === -1) {
        // 5 < X < 11       2 < Y < 8
        powerUp.effect = effects[Math.round(Math.random() * (effects.length - 1))];
        console.log(powerUp.effect);
        powerUp.x = 5 + Math.random() * 6;
        powerUp.y = 2 + Math.random() * 6;

        entityList.push(powerUp);
        scene.push(powerUp);
    }

    // If powerup hit
    if (hit) {
        // Remove the powerup from the lists so it respawns
        entityList.splice(index, 1);
        scene.splice(index, 1);

        // Make sure a paddle has been hit (eg. not start of game)
        if (lastHit) {
            // Apply the effect to the lastHit object
            var div = document.createElement("div");

            switch (powerUp.effect) {
                case "short":
                    lastHit.height -= 0.5;
                    if (lastHit.height < paddleHeight / 2) {lastHit.height = paddleHeight / 2;}
                    div.innerHTML = "Short Paddle!"
                    break;
                case "long":
                    lastHit.height += 0.5;
                    if (lastHit.height > paddleHeight * 2) {lastHit.height = paddleHeight * 2;}
                    div.innerHTML = "Long Paddle!"
                    break;
                case "fast":
                    ball.vx *= 2;
                    ball.vy *= 2;
                    div.innerHTML = "Fast Ball!"
                    break;
                case "slow":
                    ball.vx *= 0.8;
                    ball.vy *= 0.8;
                    div.innerHTML = "Slow Ball!"
                    break;
            }
            div.className = "powerUp";
            pUpContainer.appendChild(div);
            setTimeout(function() {pUpContainer.removeChild(div)}, 1500);
            console.log("Hit");
        }
    }
}

function render() {
    // Scale factor for auto-size
    var sf = cw / 16;

    c.fillStyle = "#FFE0B2";
    c.fillRect(0, 0, 16*sf, 10*sf);

    // Draw the gridlines to canvas
    /*for (i = 1; i < 16; i++) {
        // The beginPath is VERYYY important, causes mass lag if ommitted!
        c.beginPath();
        c.moveTo(i*sf, 0);
        c.lineTo(i*sf, 10*sf);
        c.stroke();
        c.beginPath();
        c.moveTo(0, i*sf);
        c.lineTo(16*sf, i*sf);
        c.stroke();
    }*/

    for (i = 0; i < scene.length; i++) {
        var e = scene[i];

        c.save();
        c.translate(e.x*sf + e.originX*sf, e.y*sf + e.originY*sf);
        c.rotate(e.rotate * Math.PI / 180);
        c.translate(-e.x*sf - e.originX*sf, -e.y*sf - e.originY*sf);

        c.fillStyle = e.colour;
        c.fillRect(e.x*sf, e.y*sf, e.width*sf, e.height*sf);

        c.restore();
    }
}

var fpsmeterEnabled = false;
var fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'colorful', left: 'auto', right: '5px', heat: '1' });
fpsmeter.hide();
if (fpsmeterEnabled) {fpsmeter.show();}

function gameLoop(timestamp) {
    // If gameLoop has just started or something went wrong
    if (!timestamp) {timestamp = 0;}
    // Time since last frame
    var elapsed = timestamp - previous;
    // If there is a very large (1 second) gap between last frame set to what it should be
    if (elapsed > 1000) {elapsed = frameDuration;}
    lag += elapsed;

    while (lag >= frameDuration) {
        input();
        if (computerPlayer) {doComputerMove();}
        physics(elapsed / frameDuration, timestamp);
        doPowerUp();

        if (ball.x < 0.5 && computerPlayer) {gameOver("Computer");}
        else if (ball.x < 0.5 && !computerPlayer) {gameOver("Blue player");}
        else if (ball.x > 15 && computerPlayer) {gameOver("Player");}
        else if (ball.x > 15 && !computerPlayer) {gameOver("Red player");}

        lag -= frameDuration;
    }

    render();

    fpsmeter.tick();

    // The current time is now previous for next loop
    previous = timestamp;
    animate(gameLoop);
}

// var [name] = new [Type](x, y, width, height, colour);
// SPECIAL CO-ORD SYSTEM: 16 units across, 10 down

var leftBorder = new PhysicsEntity(-160, 0, 160, 10, "#558B2F");
leftBorder.name = "lBorder", leftBorder.restitution = 0;
leftBorder.doPhysics = false, leftBorder.movable = false;

var topBorder = new PhysicsEntity(-160, -160, 336, 160, "#558B2F");
topBorder.name = "tBorder", topBorder.restitution = 1;
topBorder.doPhysics = false, topBorder.movable = false;

var rightBorder = new PhysicsEntity(16, 0, 160, 10, "#558B2F");
rightBorder.name = "rBorder", rightBorder.restitution = 0;
rightBorder.doPhysics = false, rightBorder.movable = false;

var bottomBorder = new PhysicsEntity(-160, 10, 336, 160, "#558B2F");
bottomBorder.name = "bBorder", bottomBorder.restitution = 1;
bottomBorder.doPhysics = false, bottomBorder.movable = false;

var paddleHeight = 2.5, paddleSpeed = 0.05;
var paddle = new PhysicsEntity(2, 5 - paddleHeight / 2, 0.5, paddleHeight, "#FF7043");
paddle.name = "paddle", paddle.restitution = 1, paddle.movable = true;
paddle.orgX = paddle.x, paddle.orgY = paddle.y;

var comPaddle = new PhysicsEntity(13.5, 5 - paddleHeight / 2, 0.5, paddleHeight, "#78909C");
comPaddle.name = "comPaddle", comPaddle.restitution = 1, comPaddle.movable = true;
comPaddle.orgX = comPaddle.x, comPaddle.orgY = comPaddle.y;

var ball = new PhysicsEntity(7.75, 4.75, 0.5, 0.5, "#8D6E63");
ball.name = "ball", ball.restitution = 1, ball.doPhysics = true;
ball.orgX = ball.x, ball.orgY = ball.y;

// PowerUp stuff
var powerUp = new Shape(0, 0, 0.4, 0.4, "#FFD600");
powerUp.effect = [], powerUp.doPowerUp = false, powerUp.movable = false;
var effects = ["long", "short", "fast", "slow"];
var lastHit;

var entityList = [ball, paddle, comPaddle, leftBorder, topBorder, rightBorder, bottomBorder];
var scene = [paddle, ball, comPaddle, leftBorder, topBorder, rightBorder, bottomBorder];

// World Variables
var gravity = {x: 0, y: 0};
var drag = {x: 0, y: 0.2};

// Setup and start loop
var fps = 60, previous = 0, frameDuration = 1000 / fps, lag = 0, oldTimestamp = 0;
gameLoop();