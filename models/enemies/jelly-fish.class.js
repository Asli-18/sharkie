/**
 * JellyFish enemy that oscillates vertically and changes direction at bounds.
 * Extends {@link MovableObject}.
 *
 * @typedef {'yellowGreen'|'lilaPink'} JellyVariant
 */
class JellyFish extends MovableObject {
    /** 
     * @type {number} Width of the sprite in pixels. 
     */
    width = 50;

    /** 
     * @type {number} Height of the sprite in pixels. 
     */
    height = 50;

    /** 
     * @type {number} Base movement speed (pixels per frame). 
     */
    speed = 0.05;

    /** 
     * @type {1|-1} Vertical direction multiplier; flips at bounds. 
     */
    direction = 1;

    /** 
     * @type {boolean} Death state flag (not used in movement). 
     */
    isDead = false;

    /** 
     * @type {number} Hit points / damage threshold. 
     */
    energy = 15;

    /**
     * Animation frames for each swimming color variant.
     * Keys map to arrays of image paths.
     * @type {{yellowGreen: string[], lilaPink: string[]}}
     */
    SWIMMING_VARIANTS = {
        yellowGreen: [
            'assets/img/enemy/jelly-fish-yellow-1.png',
            'assets/img/enemy/jelly-fish-yellow-2.png',
            'assets/img/enemy/jelly-fish-yellow-3.png',
            'assets/img/enemy/jelly-fish-yellow-4.png',
            'assets/img/enemy/jelly-fish-green-1.png',
            'assets/img/enemy/jelly-fish-green-2.png',
            'assets/img/enemy/jelly-fish-green-3.png',
            'assets/img/enemy/jelly-fish-green-4.png'
        ],
        lilaPink: [
            'assets/img/enemy/jelly-fish-lila-1.png',
            'assets/img/enemy/jelly-fish-lila-2.png',
            'assets/img/enemy/jelly-fish-lila-3.png',
            'assets/img/enemy/jelly-fish-lila-4.png',
            'assets/img/enemy/jelly-fish-pink-1.png',
            'assets/img/enemy/jelly-fish-pink-2.png',
            'assets/img/enemy/jelly-fish-pink-3.png',
            'assets/img/enemy/jelly-fish-pink-4.png'
        ]
    }

    /**
     * Death animation frames for each color variant.
     * @type {{yellowGreen: string[], lilaPink: string[]}}
     */
    DEAD_VARIANTS = {
        yellowGreen: [
            'assets/img/enemy/jelly-fish-dead-yellow-1.png',
            'assets/img/enemy/jelly-fish-dead-yellow-2.png',
            'assets/img/enemy/jelly-fish-dead-yellow-3.png',
            'assets/img/enemy/jelly-fish-dead-yellow-4.png',
            'assets/img/enemy/jelly-fish-dead-green-1.png',
            'assets/img/enemy/jelly-fish-dead-green-2.png',
            'assets/img/enemy/jelly-fish-dead-green-3.png',
            'assets/img/enemy/jelly-fish-dead-green-4.png'
        ],
        lilaPink: [
            'assets/img/enemy/jelly-fish-dead-lila-1.png',
            'assets/img/enemy/jelly-fish-dead-lila-2.png',
            'assets/img/enemy/jelly-fish-dead-lila-3.png',
            'assets/img/enemy/jelly-fish-dead-lila-4.png',
            'assets/img/enemy/jelly-fish-dead-pink-1.png',
            'assets/img/enemy/jelly-fish-dead-pink-2.png',
            'assets/img/enemy/jelly-fish-dead-pink-3.png',
            'assets/img/enemy/jelly-fish-dead-pink-4.png'
        ]
    }
    /**
     * Creates a new {@link JellyFish}.
     * @param {JellyFishVariant} variant - Colorway and animation set to use.
     * @param {any} [world=null] - Optional reference to the game world.
     */
    constructor(variant = "yellowGreen", world = null) {
        super().loadImage('assets/img/enemy/jelly-fish-yellow-1.png');
        this.world = world;
        this.variant = variant;
        this.init(variant);

    }

    /**
     * Initializes images, randomizes position/speed, and starts animation & movement.
     * @param {JellyFishVariant} variant - Colorway to initialize.
     * @returns {void}
     */
    init(variant) {
        super.setVariant(variant);
        this.loadImages(this.images);
        this.setRandomPosition();
        this.setRandomSpeed();
        this.animate();
    }

    /**
     * Randomizes the initial world position within allowed bounds.
     * @returns {void}
     */
    setRandomPosition() {
        this.x = 250 + Math.random() * 1800;
        this.y = 30 + Math.random() * 350;
    }

    /**
     * Randomizes the vertical movement speed.
     * @returns {void}
     */
    setRandomSpeed() {
        this.speed = 0.05 + Math.random() * 0.1;
    }

    /**
     * Starts frame animation in the vertical direction.
     * @returns {void}
     */
    animate() {
        this.stopIntervals();
        this.animationInterval = setInterval(() => super.animation(), 250);
        this.movementInterval = setInterval(() => this.move(), 1000 / 60);
    }

    /**
     * Moves the jellyfish up/down and flips direction at bounds.
     * @returns {void}
     */
    move() {
        this.y += this.speed * this.direction;
        if (this.y > 400 || this.y < 50) {
            this.direction *= -1;
        }
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