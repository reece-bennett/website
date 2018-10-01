console.log("Running classes.js");

// Physics classes
function Shape(name, x, y, width, height, colour) {
    this.name = name || noName;
    this.type = "Shape";

    this.x = x || 0;
    this.y = y || 0;

    this.vx = 0;
    this.vy = 0;

    this.width = width || 50;
    this.height = height || 50;

    this.rotate = 0;
    this.originX = this.width / 2;
    this.originY = this.height / 2;

    this.colour = colour || "#00BCD4";

    this.getTop = function() {return this.y;}
    this.getRight = function() {return this.x + this.width;}
    this.getBottom = function() {return this.y + this.height;}
    this.getLeft = function() {return this.x;}

    this.getMidX = function() {return this.x + this.width / 2;}
    this.getMidY = function() {return this.y + this.height / 2;}
}

function PhysicsEntity(name, x, y, width, height, colour, invisible) {
    // Inherit the Shape class, input required variables
    Shape.call(this, name, x, y, width, height, colour);

    this.type = "PhysicsEntity";

    this.invisible = false;

    this.doPhysics = true; // Affected by gravity, collisions etc?

    this.restitution = 0.7;
    this.stickyThreshold = 0.005;
    this.friction = 0.05;
}
PhysicsEntity.prototype = Object.create(Shape.prototype);

function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    this.setAngle = function(angle) {
        var length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    this.getAngle = function() {return Math.atan2(this.y, this.x);}
    this.setLength = function(length) {
        var angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
    this.getLength = function() {return Math.sqrt(this.x * this.x + this.y * this.y)}
    this.add = function(v2) {return new vector(this.x + v2.x, this.y + v2.y);}
    this.subtract = function(v2) {return new vector(this.x - v2.x, this.y - v2.y);}
    this.multiply = function(val) {return new vector(this.x * val, this.y * val);}
    this.divide = function(val) {return new vecor(this.x / val, this.y / val);}
    this.addTo = function(v2) {this.x += v2.x; this.y += v2.y;}
    this.subtractFrom = function(v2) {this.x -= v2.x; this.y -= v2.y;}
    this.multiplyBy = function(val) {this.x *= val; this.y *= val;}
    this.divideBy = function(val) {this.x /= val; this.y /= val;}
    this.dot = function(v2) {return this.x * v2.x + this.y * v2.y;}
}

console.log("classes.js has run");