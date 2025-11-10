/**
 * Movable entity with position, velocity, animation helpers,
 * hit/health logic, and utility methods for death/removal.
 * Extends {@link DrawableObject}.
 */
class MovableObject extends DrawableObject {

    /** Horizontal/vertical movement speed. */
    speed = 0.15;

    /** Facing flag; true when facing left. */
    otherDirection;

    /** Current health/energy points. */
    energy = 100;

    /** Vertical velocity used by gravity-like movement. */
    speedY = 0;

    /** Vertical velocity. */
    speedY = 0;

    /** Acceleration factor used by gravity updates. */
    acceleration = 2.5;

    /** Timestamp of the last hit. */
    lastHit = 0;

    /** Optional rotation angle for visual tilt during movement. */
    angle;

    /**
     * Collision offset used to shrink the effective hitbox and debug frame.
     * @type {{top:number,left:number,right:number,bottom:number}}
     */
    offset = { top: 0, left: 0, right: 0, bottom: 0};

    /** Creates a movable drawable. */
    constructor() {
        super();
    }

    /**
     * Applies a simple gravity step at 25 Hz while above ground: updates y by speedY and decreases speedY by acceleration.
     * @returns {void}
     */
    applyGravity() {
        this.gravityIntervalId = setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Moves a bubble object to the left as long as it is above the ground: Updates the x-coordinate by speedX and decreases speedX by the acceleration.
     * @returns {void}
     */
    propelBubble() {
        this.propelIntervalId = setInterval(() => {
            if (this.isAboveGround()) {
                this.x -= this.speedX;
                this.speedX -= this.acceleration;
            }
        }, 1000 / 15);
    }

    /**
     * Returns true while the object is considered "in the water".
     * Bubbles are always above ground; other objects use a y-threshold.
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof AirBubbles || this instanceof PoisonBubbles) {
            return true;
        } else {
            return this.y < 700;
        }
    }

    /**
     * Collision frame to determine the collision.
     * @param {MovableObject} movebleObject - The other object to test against.
     * @returns {boolean} True if hitboxes overlap.
     */
    isColliding(movebleObject) {
        return (
            this.x + this.width - this.offset.right > movebleObject.x + movebleObject.offset.left &&
            this.y + this.height - this.offset.bottom > movebleObject.y + movebleObject.offset.top &&
            this.x + this.offset.left < movebleObject.x + movebleObject.width - movebleObject.offset.right &&
            this.y + this.offset.top < movebleObject.y + movebleObject.height - movebleObject.offset.bottom
        );
    }

    /**
     * Applies a standard hit: subtracts 5 energy and stamps lastHit
     * (unless already at/below 0).
     * @returns {void}
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Returns true for a short invulnerability/hurt window after a hit.
     * Window length: 0.5 seconds.
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Returns true if the object is flagged dead or out of energy.
     * @returns {boolean}
     */
    isDead() {
        return this.dead || this.energy <= 0;
    }

    /**
     * Default linear movement to the left at ~60 FPS.
     * (Used by simple enemies/objects.)
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     * Advances a sprite animation by one frame using an image list.
     * Uses {@link DrawableObject#imageCache}.
     * @param {string[]} images - Ordered list of sprite frame paths.
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves right by `speed` and sets facing to right.
     * @returns {void}
     */
    swimRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves left by `speed` and sets facing to left.
     * @returns {void}
     */
    swimLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Moves up by `speed` and tilts slightly upward.
     * @returns {void}
     */
    swimUp() {
        this.y -= this.speed;
        this.angle = -Math.PI / 6;
    }

    /**
     * Moves down by `speed` and tilts slightly downward.
     * @returns {void}
     */
    swimDown() {
        this.y += this.speed;
        this.angle = Math.PI / 6;
    }

    /**
     * Picks a sprite variant set for swimming from `SWIMMING_VARIANTS`.
     * Expects subclass to define `SWIMMING_VARIANTS`.
     * @param {string|number} variant - Key/index of the desired variant.
     * @returns {void}
     */
    setVariant(variant) {
        if (this.SWIMMING_VARIANTS[variant]) {
            this.images = this.SWIMMING_VARIANTS[variant];
        }
    }

    /**
     * Advances the current variant animation (uses `this.images` list).
     * @returns {void}
     */
    animation() {
        let i = this.currentImage % this.images.length;
        let path = this.images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Starts the death flow: stops movement, flags dead, swaps to a death variant set, then plays the death animation and floats up.
     * Expects subclass to define `DEAD_VARIANTS` and `variant`.
     * @returns {void}
     */
    die() {
        this.speed = 0;
        this.dead = true;
        this.images = this.DEAD_VARIANTS[this.variant];
        this.currentImage = 0;
        this.loadImages(this.images);
        this.playDeathAnimation(() => {
            this.floatUpAndRemove();
        });
    }

    /**
     * Plays the current `images` list as a death animation (10 FPS).
     * Calls the provided callback when finished.
     * @param {Function} [callback] - Invoked after final frame.
     * @returns {void}
     */
    playDeathAnimation(callback) {
        let frame = 0;
        const interval = setInterval(() => {
            if (frame < this.images.length) {
                this.currentImage = frame;
                frame++;
                console.log(this.images);

            } else {
                clearInterval(interval);
                console.log("stopppt die Animation");

                if (callback) callback();
            }
        }, 100);
    }

    /**
     * Floats the object upward until reaching y <= 0, then removes from world.
     * Runs at ~60 FPS.
     * @returns {void}
     */
    floatUpAndRemove() {
        console.log("floatUpAndRemove called");
        const interval = setInterval(() => {
            console.log("y =", this.y);
            if (this.y > 0) {
                this.y -= 3.5;
            } else {
                clearInterval(interval);
                console.log("calling removeFromWorld()");
                this.removeFromWorld();
            }
        }, 1000 / 60);
    }

    /**
     * Removes this instance from the world's enemy list.
     * Safe no-op if world/level/enemies are missing.
     * @returns {void}
     */
    removeFromWorld() {
        console.log("Removing from world:", this);
        if (!this.world || !this.world.level || !this.world.level.enemies) return;

        const index = this.world.level.enemies.indexOf(this);
        console.log("Index in enemies array:", index);

        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
            console.log("Enemy removed!");
        }
    }

    /**
     * Clears interval timers.
     * @returns {void}
     */
    stopIntervals() {
        if (this.propelIntervalId) {
            clearInterval(this.propelIntervalId);
            this.propelIntervalId = null;
        }
        if (this.gravityIntervalId) {
            clearInterval(this.gravityIntervalId);
            this.gravityIntervalId = null;
        }
    }
}