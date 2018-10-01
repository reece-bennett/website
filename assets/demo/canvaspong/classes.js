// All the required classes
function Shape(x, y, width, height, colour) {
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

function PhysicsEntity(x, y, width, height, colour) {
    // Inherit the Shape class, input required variables
    Shape.call(this, x, y, width, height, colour);

    this.doPhysics = true; // Affected by gravity, drag etc?
    this.movable = true; // Moved in collisions?

    this.restitution = 0.7;
    this.stickyThreshold = 0.005;
    this.friction = 0.05;
}
PhysicsEntity.prototype = Object.create(Shape.prototype);