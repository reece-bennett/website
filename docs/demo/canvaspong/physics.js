var Collision = {
    elastic: function(restitution, stickyThreshold) {
        this.restitution = restitution || 0.7;
        this.stickyThreshold = stickyThreshold || 0.01;
    },
};

var PhysicsEntity = function(collisionName, type) {

    this.name = "name";
    this.colour = "grey";

    // The type of Entity, Dynamic = affected by physics, Kinematic = not affected
    this.type = type || "dynamic";
    // Type of colliision, Elastic for bouncy, None for passthough
    this.collision = collisionName || "elastic";

    this.width = 20;
    this.height = 20;

    // Calculate and store the half widths
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;

    // Position data
    this.x = 0;
    this.y = 0;

    // Velocity
    this.vx = 0;
    this.vy = 0;

    // Acceleration
    this.ax = 0;
    this.ay = 0;

    // Friction (> 1 is more friction)
    this.fx = 1;
    this.fy = 1;
};

// Physics entity calculations
PhysicsEntity.prototype = {

    // Update the halfWidth / Heights
    update: function() {
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
    },

    // Get the midpoints
    getMidX: function() {
        return this.halfWidth + this.x;
    },
    getMidY: function() {
        return this.halfHeight + this.y;
    },

    // Gets the needed coordinate for each side
    getTop: function() {
        return this.y;
    },
    getRight: function() {
        return this.x + this.width;
    },
    getBottom: function() {
        return this.y + this.height;
    },
    getLeft: function() {
        return this.x;
    },
};
