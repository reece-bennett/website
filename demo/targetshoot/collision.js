console.log("Running collision.js");

function collisionTest(obj1, obj2) {

    // Exit if testing object against itself
    if (obj1 === obj2) {return false}

    // Get and store the edges of bounding boxes
    var l1 = obj1.getLeft();
    var r1 = obj1.getRight();
    var t1 = obj1.getTop();
    var b1 = obj1.getBottom();

    var l2 = obj2.getLeft();
    var r2 = obj2.getRight();
    var t2 = obj2.getTop();
    var b2 = obj2.getBottom();

    // If any of the edges are beyond the other then they cannot be colliding
    if (l1 > r2 || r1 < l2 || t1 > b2 || b1 < t2) {return false;}

    // Else they must be
    return true;
}

function resolveCollision(obj1, obj2, delta) {

    // Get and store midpoints
    var midX1 = obj1.getMidX();
    var midY1 = obj1.getMidY();
    var midX2 = obj2.getMidX();
    var midY2 = obj2.getMidY();

    // Use the normalized sides to find the shortest exit
    var dx = (midX1 - midX2) / (obj1.width / 2 + obj2.width / 2);
    var dy = (midY1 - midY2) / (obj1.height / 2 + obj2.height / 2);

    // Also get absolute values so things don't go negative
    var absDX = Math.abs(dx);
    var absDY = Math.abs(dy);

    if (absDX > absDY) {
        // Coming from a side
        if (dx > 0) {
            // Coming from the left
            obj2.x = obj1.getLeft() - obj2.width;
        } else {
            // Coming from the right
            obj2.x = obj1.getRight();
        }
        // Modify velocity
        if (Math.abs(obj2.vx) < obj1.stickyThreshold) {
            obj2.vx = 0;
        }
        if (obj1.doPhysics) {
            obj1.vx = obj2.vx * obj1.restitution * obj2.restitution;
            obj1.x += obj1.vx * delta;
        }
        if (obj2.doPhysics) {
            obj2.vx = -obj2.vx * obj1.restitution * obj2.restitution;
            obj2.vy -= obj2.vy * obj1.friction;
            obj2.x += obj2.vx * delta;
        }
    }

    if (absDX < absDY) {
        // Coming from top or bottom
        if (dy > 0) {
            // Coming from the top
            obj2.y = obj1.getTop() - obj2.height;
        } else {
            // Coming from the bottom
            obj2.y = obj1.getBottom();
        }
        // Modify velocity
        if (Math.abs(obj2.vy) < obj1.stickyThreshold) {
            obj2.vy = 0;
        }
        if (obj1.doPhysics) {
            obj1.vy = obj2.vy * obj1.restitution * obj2.restitution;
            obj1.y += obj1.vx * delta;
        }
        if (obj2.doPhysics) {
            obj2.vy = -obj2.vy * obj1.restitution * obj2.restitution;
            obj2.vx -= obj2.vx * obj1.friction;
            obj2.y += obj2.vy * delta;
        }
    }
}

console.log("collision.js has run");