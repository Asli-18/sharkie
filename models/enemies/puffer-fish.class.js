/**
 * Enemy that swims from right to left and can be defeated.
 * Plays a death animation and then floats upward when dead.
 * Extends {@link MovableObject}.
 *
 * @typedef {'salmonPink'|'greenSalmon'|'pinkGreen'} PufferVariant
 */
class PufferFish extends MovableObject {
    /**
     *  @type {number} Width of the sprite in pixels.
     */
    width = 50;

    /** 
     * @type {number} Height of the sprite in pixels. 
     */
    height = 50;

    /** 
     * @type {number} Hit points (damage threshold before death). 
     */
    energy = 15;

    /** 
     * @type {boolean} Tracks death state (note: methods also use `this.dead`). 
     */
    isDead = false;

    /**
     * Animation frames for each swimming color variant.
     * Keys map to arrays of image paths.
     * @type {{salmonPink: string[], greenSalmon: string[], pinkGreen: string[]}}
     */
    SWIMMING_VARIANTS = {
        salmonPink: [
            'assets/img/enemy/puffer-fish-swim-salmon-1.png',
            'assets/img/enemy/puffer-fish-swim-salmon-2.png',
            'assets/img/enemy/puffer-fish-swim-salmon-3.png',
            'assets/img/enemy/puffer-fish-swim-salmon-4.png',
            'assets/img/enemy/puffer-fish-swim-salmon-5.png',
            'assets/img/enemy/puffer-fish-transition-pink-1.png',
            'assets/img/enemy/puffer-fish-transition-pink-2.png',
            'assets/img/enemy/puffer-fish-transition-pink-3.png',
            'assets/img/enemy/puffer-fish-transition-pink-4.png',
            'assets/img/enemy/puffer-fish-transition-pink-5.png',
            'assets/img/enemy/puffer-fish-bubbleswim-pink-1.png',
            'assets/img/enemy/puffer-fish-bubbleswim-pink-2.png',
            'assets/img/enemy/puffer-fish-bubbleswim-pink-3.png',
            'assets/img/enemy/puffer-fish-bubbleswim-pink-4.png',
            'assets/img/enemy/puffer-fish-bubbleswim-pink-5.png',
            'assets/img/enemy/puffer-fish-transition-pink-5.png',
            'assets/img/enemy/puffer-fish-transition-pink-4.png',
            'assets/img/enemy/puffer-fish-transition-pink-3.png',
            'assets/img/enemy/puffer-fish-transition-salmon-2.png',
            'assets/img/enemy/puffer-fish-transition-salmon-1.png',
        ],
        greenSalmon: [
            'assets/img/enemy/puffer-fish-swim-green-1.png',
            'assets/img/enemy/puffer-fish-swim-green-2.png',
            'assets/img/enemy/puffer-fish-swim-green-3.png',
            'assets/img/enemy/puffer-fish-swim-green-4.png',
            'assets/img/enemy/puffer-fish-swim-green-5.png',
            'assets/img/enemy/puffer-fish-transition-salmon-1.png',
            'assets/img/enemy/puffer-fish-transition-salmon-2.png',
            'assets/img/enemy/puffer-fish-transition-salmon-3.png',
            'assets/img/enemy/puffer-fish-transition-salmon-4.png',
            'assets/img/enemy/puffer-fish-transition-salmon-5.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-1.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-2.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-3.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-4.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-5.png',
            'assets/img/enemy/puffer-fish-transition-salmon-5.png',
            'assets/img/enemy/puffer-fish-transition-salmon-4.png',
            'assets/img/enemy/puffer-fish-transition-salmon-3.png',
            'assets/img/enemy/puffer-fish-transition-green-2.png',
            'assets/img/enemy/puffer-fish-transition-green-1.png',
        ],
        pinkGreen: [
            'assets/img/enemy/puffer-fish-swim-pink-1.png',
            'assets/img/enemy/puffer-fish-swim-pink-2.png',
            'assets/img/enemy/puffer-fish-swim-pink-3.png',
            'assets/img/enemy/puffer-fish-swim-pink-4.png',
            'assets/img/enemy/puffer-fish-swim-pink-5.png',
            'assets/img/enemy/puffer-fish-transition-green-1.png',
            'assets/img/enemy/puffer-fish-transition-green-2.png',
            'assets/img/enemy/puffer-fish-transition-green-3.png',
            'assets/img/enemy/puffer-fish-transition-green-4.png',
            'assets/img/enemy/puffer-fish-transition-green-5.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-1.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-2.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-3.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-4.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-5.png',
            'assets/img/enemy/puffer-fish-transition-green-5.png',
            'assets/img/enemy/puffer-fish-transition-green-4.png',
            'assets/img/enemy/puffer-fish-transition-green-3.png',
            'assets/img/enemy/puffer-fish-transition-pink-2.png',
            'assets/img/enemy/puffer-fish-transition-pink-1.png',
        ]
    }

    /**
     * Death animation frames for each color variant.
     * Keys map to arrays of image paths.
     * @type {{salmonPink: string[], greenSalmon: string[], pinkGreen: string[]}}
     */
    DEAD_VARIANTS = {
        salmonPink: [
            'assets/img/enemy/puffer-fish-dead-salmon-1.png',
            'assets/img/enemy/puffer-fish-dead-salmon-2.png',
            'assets/img/enemy/puffer-fish-dead-salmon-3.png'
        ],
        greenSalmon: [
            'assets/img/enemy/puffer-fish-dead-green-1.png',
            'assets/img/enemy/puffer-fish-dead-green-2.png',
            'assets/img/enemy/puffer-fish-dead-green-3.png'
        ],
        pinkGreen: [
            'assets/img/enemy/puffer-fish-dead-pink-1.png',
            'assets/img/enemy/puffer-fish-dead-pink-2.png',
            'assets/img/enemy/puffer-fish-dead-pink-3.png'
        ]
    }

    /**
     * Creates a new {@link PufferFish}.
     *
     * @param {PufferVariant} [variant='salmonPink'] - Colorway and animation set to use.
     * @param {any} [world=null] - Optional reference to the game world.
     */
    constructor(variant = "salmonPink", world = null) {
        super().loadImage('assets/img/enemy/puffer-fish-swim-salmon-1.png');
        this.world = world;
        this.variant = variant;
        this.init(variant);
    }

    /**
     * Initializes sprite images, randomizes position and speed, and starts animation/movement.
     * @param {PufferVariant} variant - Colorway to initialize.
     */
    init(variant) {
        this.setVariant(variant);
        this.loadImages(this.images);
        this.setRandomPosition();
        this.setRandomSpeed();
        this.animate();
    }

    /**
     * Randomizes the initial world position within allowed bounds.
     */
    setRandomPosition() {
        this.x = 200 + Math.random() * 1800;
        this.y = 30 + Math.random() * 400;
    }

    /**
     * Randomizes the horizontal swimming speed.
     */
    setRandomSpeed() {
        this.speed = 0.15 + Math.random() * 0.20;
    }

    /**
     * Starts the frame animation and continuous leftward movement.
     * Stores interval IDs on the instance for later cleanup.
     * @returns {void} 
     */
    animate() {
        this.animationInterval = setInterval(() => {
            if (!this.dead) super.animation();
        }, 250);

        this.movementInterval = setInterval(() => {
            if (!this.dead) this.x -= this.speed;
        }, 1000 / 60);
    }

    /**
     * Kills the fish once and triggers the death sequence (swap frames, stop movement, float up).
     * @returns {void}
     */
    die() {
        if (this.dead) return;
        this.dead = true;
        clearInterval(this.animationInterval);
        clearInterval(this.movementInterval);
        this.images = this.DEAD_VARIANTS[this.variant];
        this.currentImage = 0;
        this.loadImages(this.images);
        this.playDeathThenFloatUp();
    }

    /**
     * Plays the death frames once, then schedules the floating animation.
     */
    playDeathThenFloatUp() {
        let frame = 0;
        const interval = setInterval(() => {
            if (frame < this.images.length) {
                const path = this.images[frame];
                this.img = this.imageCache[path];
                frame++;
            } else {
                clearInterval(interval);

                this.img = this.imageCache[this.images[this.images.length - 1]];

                setTimeout(() => this.floatUp(), 300);
            }
        }, 150);
    }

    /**
     * Moves the fish upward off-screen after death.
     * @returns {void} 
     */
    floatUp() {
        const interval = setInterval(() => {
            if (this.y > -100) {
                this.y -= 1.2;
            } else {
                clearInterval(interval);
            }
        }, 1000 / 60);
    }

    /**
     * Stops running intervals if present.
     * Useful when removing the entity or resetting the level.
     * @returns {void} 
     */
    stopIntervals() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        if (this.movementInterval) {
            clearInterval(this.movementInterval);
            this.movementInterval = null;
        }
    }
}