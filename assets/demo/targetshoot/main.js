console.log("Running main.js");

// Menu Stuff
var menuBG = document.getElementById("menuBackground");
var levelSelect = document.getElementById("levelSelect");

var levelComplete = document.getElementById("levelComplete");

var menuButton = document.getElementById("menuButtonContainer");
var fireButton = document.getElementById("fireButton");
var resetButton = document.getElementById("resetButton");

var angleSlider = document.getElementById("angleSlider");
var angleSliderInner = angleSlider.children[0];

var help1 = document.getElementById("help1");
var help2 = document.getElementById("help2");

angleSlider.addEventListener("mousedown", function(e) {
    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = angleSlider.getBoundingClientRect();

    angleSlider.rangeWidth = angleSlider.offsetWidth;
    angleSlider.rangeLeft = elemRect.left - bodyRect.left;
    angleSlider.down = true;
    updateAngleSlider(e);
    return false;
});
angleSlider.addEventListener("mousemove", function(e) {
    updateAngleSlider(e);
});
angleSlider.addEventListener("mouseup", function(e) {
    angleSlider.down = false;
});

function updateAngleSlider(e) {
    if (angleSlider.down) {
        var l = e.pageX - angleSlider.rangeLeft;
        if (l > 90) {l = 90;}
        angleSliderInner.style.width = l + "px";
        ballDir.setAngle(l * 0.025 - 1.8);
        arrow.rotate = ballDir.getAngle() * 180 / Math.PI - 90;
        cannonBall.fireX = ballDir.x;
        cannonBall.fireY = ballDir.y;
    }
}


var powerSlider = document.getElementById("powerSlider");
var powerSliderInner = powerSlider.children[0];

powerSlider.addEventListener("mousedown", function(e) {
    var bodyRect = document.body.getBoundingClientRect(),
        elemRect = powerSlider.getBoundingClientRect();

    powerSlider.rangeWidth = powerSlider.offsetWidth;
    powerSlider.rangeLeft = elemRect.left - bodyRect.left;
    powerSlider.down = true;
    updatePowerSlider(e);
    return false;
});
powerSlider.addEventListener("mousemove", function(e) {
    updatePowerSlider(e);
});
powerSlider.addEventListener("mouseup", function(e) {
    powerSlider.down = false;
});

function updatePowerSlider(e) {
    if (powerSlider.down) {
        var l = e.pageX - powerSlider.rangeLeft;
        if (l > 90) {l = 90;}
        powerSliderInner.style.width = l + "px";
        ballDir.setLength(l * 0.005);
        arrow.height = ballDir.getLength() * 8;
        cannonBall.fireX = ballDir.x;
        cannonBall.fireY = ballDir.y;
    }
}

function openMenu() {
    canvas.style["-webkit-filter"] = "blur(5px)";
    menuButton.style["-webkit-filter"] = "blur(5px)";
    gameControls.style["-webkit-filter"] = "blur(5px)";
    menuBG.style.display = "inherit";
}

function closeMenu() {
    canvas.style["-webkit-filter"] = "blur(0)";
    menuButton.style["-webkit-filter"] = "blur(0)";
    gameControls.style["-webkit-filter"] = "blur(0)";
    menuBG.style.display = "none";
}

function nextLevel() {
    if (!level[currentLevel]) {currentLevel = 0};
    makeLevel(level[currentLevel]);
    levelComplete.style.display = "none";
}

function replayLevel() {
    console.log(currentLevel);
    makeLevel(level[currentLevel - 1]);
    levelComplete.style.display = "none";
}

function fireCannon() {
    if (!cannonBall.fired) {
        cannonBall.originalX = cannonBall.x, cannonBall.originalY = cannonBall.y;
        cannonBall.vx = cannonBall.fireX, cannonBall.vy = cannonBall.fireY, cannonBall.doPhysics = true;
        cannonBall.fired = true;
        fireButton.style.opacity = 0.2;
        resetButton.style.opacity = 1;
    }
}

function resetCannon() {
    if (cannonBall.fired) {
        cannonBall.vx = 0, cannonBall.vy = 0;
        cannonBall.x = cannonBall.originalX, cannonBall.y = cannonBall.originalY;
        cannonBall.doPhysics = false;
        cannonBall.fired = false;
        // Reset arrow direction
        /*cannonBall.fireX = 0, cannonBall.fireY = 0;
        ballDir.x = 0;
        ballDir.y = 0;
        arrow.height = 15;
        arrow.rotate = -90;*/
        fireButton.style.opacity = 1;
        resetButton.style.opacity = 0.2;
    }
}

// Menu Stuff End

function input() {
    // Up - Down - Left - Right ... & - ( - % - '
    if (keys["&"]) {
        cannonBall.fireY -= 0.002;
        ballDir.y =cannonBall.fireY;
        arrow.height = ballDir.getLength() * 8;
        arrow.rotate = ballDir.getAngle() * 180 / Math.PI - 90;
    }
    if (keys["("]) {
        cannonBall.fireY += 0.002;
        ballDir.y =cannonBall.fireY;
        arrow.height = ballDir.getLength() * 8;
        arrow.rotate = ballDir.getAngle() * 180 / Math.PI - 90;
    }
    if (keys["%"]) {
        cannonBall.fireX -= 0.002;
        ballDir.x = cannonBall.fireX;
        arrow.height = ballDir.getLength() * 8;
        arrow.rotate = ballDir.getAngle() * 180 / Math.PI - 90;
    }
    if (keys["'"]) {
        cannonBall.fireX += 0.002;
        ballDir.x = cannonBall.fireX;
        arrow.height = ballDir.getLength() * 8;
        arrow.rotate = ballDir.getAngle() * 180 / Math.PI - 90;
    }
    if (mouse.down && !mouse.clicked && !cannonBall.fired) {
        // Scale factor for auto-size
        var sf = canvas.width / 16;
        mouse.clicked = true;
        mouse.downX = mouse.x;
        mouse.downY = mouse.y;
        cannonBall.oldFireX = cannonBall.fireX;
        cannonBall.oldFireY = cannonBall.fireY;
    }
    if (mouse.down && !cannonBall.fired) {
        cannonBall.fireX = cannonBall.oldFireX + (mouse.x - mouse.downX) * 0.002;
        cannonBall.fireY = cannonBall.oldFireY + (mouse.y - mouse.downY) * 0.002;
        ballDir.x = cannonBall.fireX;
        ballDir.y = cannonBall.fireY;
        arrow.height = ballDir.getLength() * 8;
        arrow.rotate = ballDir.getAngle() * 180 / Math.PI - 90;
    }

    if (keys[" "] && !keyFired[" "]) {
        keyFired[" "] = true;
        if (!cannonBall.fired) {fireCannon()}
        else {resetCannon()}
    }
}

function physics(delta) {

    //document.getElementById("debug").innerHTML = "Delta: " + delta;
    for (i = 0; i < entityList.length; i++) {
        // Cycle through all entities
        var e = entityList[i];

        // If affected by physics add gravity and take drag
        if (e.doPhysics) {
            e.vx += gravity.x * delta;
            e.vy += gravity.y * delta;
            e.vx -= e.vx * drag.x * delta;
            e.vy -= e.vy * drag.y * delta;
        }

        // Move the object based on velocity
        e.x += e.vx * delta;
        e.y += e.vy * delta;

        // If the object collides with others do checks with all and resolve
        if (e.doPhysics) {
            for (j = 0; j < entityList.length; j++) {
                var e2 = entityList[j];
                if (collisionTest(e, e2) && e2.type == "PhysicsEntity") {

                    if (e.name == "cannonBall" && e2.name == "cupGoal") {
                        levelComplete.style.display = "inherit";
                        return // If ball is in goal make sure they don't collide
                    }

                    resolveCollision(e2, e, delta);
                }
            }
        }
    }
}

function render() {
    // Scale factor for auto-size
    var sf = canvas.width / 16;

    c.fillStyle = "#A5D6A7";
    c.fillRect(0, 0, 16*sf, 10*sf);

    /*// Draw the gridlines to canvas
    c.fillStyle = "#9E9E9E";
    for (i = 1; i < 16; i++) {
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

    for (i = 0; i < entityList.length; i++) {
        var e = entityList[i];
        //if (e.name == "cupLeft") {console.log(e.x + " " + e.y);}
        if (!e.invisible) {
            c.save();
            c.translate(e.x*sf + e.originX*sf, e.y*sf + e.originY*sf);
            c.rotate(e.rotate * Math.PI / 180);
            c.translate(-e.x*sf - e.originX*sf, -e.y*sf - e.originY*sf);

            c.fillStyle = e.colour;
            c.fillRect(e.x*sf, e.y*sf, e.width*sf, e.height*sf);

            c.restore();
        }
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
        // Get and store the position as old for next loop
        /*for (i = 0; i < entityList.length; i++) {
            var e = entityList[i];
            e.oldX = e.x;
            e.oldY = e.y;
        }*/
        //input();
        //update();
        physics(elapsed / frameDuration);
        lag -= frameDuration;
    }

    render();
    if (!cupSpeed == 0) {

        cupLeft.x += cupSpeed.x * xMod * (elapsed / frameDuration);
        cupBottom.x += cupSpeed.x * xMod * (elapsed / frameDuration);
        cupRight.x += cupSpeed.x * xMod * (elapsed / frameDuration);
        cupGoal.x += cupSpeed.x * xMod * (elapsed / frameDuration);
        if (cupLeft.x < cupMin.x) {xMod = 1;}
        if (cupLeft.x > cupMax.x) {xMod = -1;}

        cupLeft.y += cupSpeed.y * yMod * (elapsed / frameDuration);
        cupBottom.y += cupSpeed.y * yMod * (elapsed / frameDuration);
        cupRight.y += cupSpeed.y * yMod * (elapsed / frameDuration);
        cupGoal.y += cupSpeed.y * yMod * (elapsed / frameDuration);
        if (cupLeft.y < cupMin.y) {yMod = 1;}
        if (cupLeft.y > cupMax.y) {yMod = -1;}
    }

    // The current time is now previous for next loop
    previous = timestamp;
    fpsmeter.tick();
    animate(gameLoop);
}

// var [name] = new [Type](x, y, width, height, colour);
// SPECIAL CO-ORD SYSTEM: 16 units across, 10 down

var gravity, drag, cupSpeed, cupMax, cupMin, currentLevel;
var entityList = [];

var cannonBall, cupLeft, cupBottom, cupRight, cupGoal, ballDir, arrow, xMod = 1, yMod = 1;;

var fps = 60, previous = 0, frameDuration = 1000 / fps, lag = 0, oldTimestamp = 0;

function makeLevel(json) {
    entityList = [];

    currentLevel = json.level;
    gravity = json.variables.gravity || {x: 0, y: 0.005};
    drag = json.variables.drag || {x: 0.0001, y: 0.0001};
    cupSpeed = json.variables.cupSpeed || {x: 0, y: 0};
    cupMax = json.variables.cupMax || {x: 0, y: 0}
    cupMin = json.variables.cupMin || {x: 0, y: 0}

    for (i = 0; i < json.objects.length; i++) {
        var item = json.objects[i];
        var entity = new PhysicsEntity(item.name, item.x, item.y, item.width, item.height, item.colour);
        //console.log(entity.name + " " + entity.x + " " + entity.y + " " + entity.width + " " + entity.height + " " + entity.colour + " " + entity.invisible);
        if (item.doPhysics === false) {entity.doPhysics = false;}
        if (item.dynamic === false) {entity.dynamic = false;}
        if (item.friction) {entity.friction = item.friction;}
        if (item.invisible == true) {entity.invisible = true;}
        if (item.restitution) {entity.restitution = item.restitution;}
        entityList.push(entity);
    }

    // Put important objects into their own variables
    for (i = 0; i < entityList.length; i++) {
        var item = entityList[i];
        switch (item.name) {
            case "cannonBall":
                cannonBall = item;
                cannonBall.fireX = 0;
                cannonBall.fireY = 0;
                cannonBall.fired = false;
                break
            case "cupLeft":
                cupLeft = item;
                break
            case "cupRight":
                cupRight = item;
                break
            case "cupBottom":
                cupBottom = item;
                break
            case "cupGoal":
                cupGoal = item;
                break
        }
    }

    arrow = new Shape("arrow", cannonBall.x + 0.1, cannonBall.y + 0.1, 0.05, 0.05, "#FF5722");
    arrow.rotate = -90;
    ballDir = new Vector(0, 0);
    entityList.splice(0, 0, arrow);

    ballDir.setLength(0.25);
    arrow.height = ballDir.getLength() * 8;
    ballDir.setAngle(-0.55);
    arrow.rotate = ballDir.getAngle() * 180 / Math.PI - 90;
    cannonBall.fireX = ballDir.x;
    cannonBall.fireY = ballDir.y;

    fireButton.style.opacity = 1;
    resetButton.style.opacity = 0.2; // Just to make sure the fire button is lit
}

var level = [];

closeMenu();

loadJSON('levelData', function(json) {
    for (i = 0; i < json.length; i++) {
        level[i] = json[i];
    }
    makeLevel(level[0]);

    // Start loop
    gameLoop();
});