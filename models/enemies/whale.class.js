/**
 * Endboss that plays an intro, idles, then chases the player.
 * Can take damage, play a death animation, float up, and remove itself from the world.
 * Extends {@link MovableObject}.
 */
class Whale extends MovableObject {
    /**
     * World-space x coordinate of the boss spawn.
     */
    x = 3500;

    /**
     * World-space y coordinate of the boss spawn.
     */
    y = 0;

    /**
     * width from Endboss
     */
    width = 350;

    /**
     * height from Endboss
     */
    height = 350;

    /**
     * check play Intro
     */
    hasPlayedIntro = false;

    /**
     * check start Intro
     */
    introStarted = false;

    /**
     * check chasing
     */
    isChasing = false;

    /**
     * the energy from Endboss
     */
    energy = 100;

    /**
     * check dead 
     */
    isDead = false;

    /**
     * Interval ID for the floating animation loop or null if not running.
     */
    floatingInterval = null;

    /**
     * check other Direction from Endboss.
     */
    otherDirection = false;

    /**
     * Whether the boss fight is active.
     */
    active = false;

    /**
     * interval in milliseconds for floating animation
     */
    FLOATING_INTERVAL_MS = 120;

    /**
     * interval in milliseconds for intro animation
     */
    INTRO_ANIMATION_INTERVAL_MS = 100;

    /**
     * interval in milliseconds for dead animation
     */
    DIE_ANIMATION_INTERVAL_MS = 150;

    /**
     * interval in milliseconds for float up and remove animation
     */
    REMOVE_ANIMATION_INTERVAL_MS = 1000 / 60;

    /**
     * Intro animation frames, played once when player gets near.
     * @type {string[]}
     */
    IMAGES_WHALE_INTRODUCE = [
        'assets/img/enemy/monster-whale-introduce-1.png',
        'assets/img/enemy/monster-whale-introduce-2.png',
        'assets/img/enemy/monster-whale-introduce-3.png',
        'assets/img/enemy/monster-whale-introduce-4.png',
        'assets/img/enemy/monster-whale-introduce-5.png',
        'assets/img/enemy/monster-whale-introduce-6.png',
        'assets/img/enemy/monster-whale-introduce-7.png',
        'assets/img/enemy/monster-whale-introduce-8.png',
        'assets/img/enemy/monster-whale-introduce-9.png',
        'assets/img/enemy/monster-whale-introduce-10.png'
    ];

    /**
     * Idle/floating animation frames.
     * @type {string[]}
     */
    IMAGES_WHALE_FLOATING = [
        'assets/img/enemy/monster-whale-floating-1.png',
        'assets/img/enemy/monster-whale-floating-2.png',
        'assets/img/enemy/monster-whale-floating-3.png',
        'assets/img/enemy/monster-whale-floating-4.png',
        'assets/img/enemy/monster-whale-floating-5.png',
        'assets/img/enemy/monster-whale-floating-6.png',
        'assets/img/enemy/monster-whale-floating-7.png',
        'assets/img/enemy/monster-whale-floating-8.png',
        'assets/img/enemy/monster-whale-floating-9.png',
        'assets/img/enemy/monster-whale-floating-10.png',
        'assets/img/enemy/monster-whale-floating-11.png',
        'assets/img/enemy/monster-whale-floating-12.png',
        'assets/img/enemy/monster-whale-floating-13.png'
    ];

    /**
     * Death animation frames.
     * @type {string[]}
     */
    IMAGES_WHALE_DEAD = [
        'assets/img/enemy/monster-whale-dead-1.png',
        'assets/img/enemy/monster-whale-dead-2.png',
        'assets/img/enemy/monster-whale-dead-3.png',
        'assets/img/enemy/monster-whale-dead-4.png',
        'assets/img/enemy/monster-whale-dead-5.png',
        'assets/img/enemy/monster-whale-dead-6.png'
    ];

    /**
     * Creates a new {@link Whale} boss.
     * @param {string} [imagePath='assets/img/enemy/monster-whale-introduce-1.png'] - Initial image to load.
     */
    constructor(imagePath = 'assets/img/enemy/monster-whale-introduce-1.png') {
        super().loadImage(imagePath);
        this.offset = { top: 150, left: 20, right: 30, bottom: 60, };
        this.loadImages(this.IMAGES_WHALE_INTRODUCE);
        this.loadImages(this.IMAGES_WHALE_FLOATING);
        this.loadImages(this.IMAGES_WHALE_DEAD);
        this.speed = 5.5;
    }

    /**
     * Returns whether the boss is currently active.
     * @returns 
     */
    isActive() {
        return this.active === true;
    }

    /**
     * Triggers the intro sequence when the player is nearby, tracks the player when enabled, and turns towards the player.
     * @param {any} sharkie - character
     */
    update(sharkie) {
        if (!this.hasPlayedIntro && this.isNear(sharkie)) {
            this.playIntroAnimation();
            this.hasPlayedIntro = true;
        }
        if (this.isChasing) {
            this.chase(sharkie);
        }
        this.lookAtSharkie(sharkie);
    }

    /**
     * Updates the facing direction based on the player's x-position.
     * Freezes facing when dead.
     * @param {x:number} sharkie - x coordinates of character
     * @returns 
     */
    lookAtSharkie(sharkie) {
        if (this.isDead) {
            this.otherDirection = this.freezeDirection;
            return;
        }
        if (sharkie.x < this.x) {
            this.otherDirection = false;
        } else {
            this.otherDirection = true;
        }
    }

    /**
     * Checks if the player is within the intro trigger area.
     * @param {{x:number,y:number}} sharkie - x and y coordinates of character
     * @returns {boolean}
     */
    isNear(sharkie) {
        const distanceX = Math.abs(this.x - sharkie.x);
        const distanceY = Math.abs(this.y - sharkie.y);
        return distanceX < 400 && distanceY < 150;
    }

    /**
     * Plays the one-time intro animation, shows the boss healthbar, then starts floating.
     * Afterwards, chases the player after a delay.
     * @returns {void}
     */
    playIntroAnimation() {
        if (this.introStarted) return;
        this.introStarted = true;
        if (this.world && this.world.endbossHealthbar) {
            this.world.endbossHealthbar.show();
        }
        this.active = true;
        if (this.world && this.world.endbossHealthbar) {
            this.world.endbossHealthbar.show();
        }
        this.currentImage = 0;
        this.introIntervalId = setInterval(() => {
            if (this.currentImage < this.IMAGES_WHALE_INTRODUCE.length) {
                const path = this.IMAGES_WHALE_INTRODUCE[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(this.introIntervalId);
                this.introIntervalId = null;
                this.playFloatingAnimation();
                setTimeout(() => this.startChase(), 3000);
            }
        }, this.INTRO_ANIMATION_INTERVAL_MS);
    }

    /**
     * Starts the idle/floating loop, frame cycling.
     * @returns {void}
     */
    playFloatingAnimation() {
        this.currentImage = 0;
        this.floatingInterval = setInterval(() => {
            const i = this.currentImage % this.IMAGES_WHALE_FLOATING.length;
            const path = this.IMAGES_WHALE_FLOATING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, this.FLOATING_INTERVAL_MS);
    }

    /**
     * Enables chasing behavior.
     * @returns {void}
     */
    startChase() {
        this.isChasing = true;
    }

    /**
     * Moves continuously towards the player.
     * @param {{x:number,y:number}} sharkie - x and y coordinates of character
     * @returns {void}
     */
    chase(sharkie) {
        const distanceX = sharkie.x - this.x;
        const distanceY = sharkie.y - this.y;

        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance > 0) {
            this.x += (distanceX / distance) * this.speed;
            this.y += (distanceY / distance) * this.speed * 0.6;
        }
    }

    /**
     * Applies incoming damage, updates healthbar, and triggers death if below threshold.
     * @param {number} amount - Damage to apply.
     * @returns {void}
     */
    takeDamage(amount) {
        if (!this.isActive() || this.isDead) return;
        this.energy -= amount;
        AUDIO_WHALE_DAMAGE.play();
        AUDIO_WHALE_DAMAGE.volume = 0.1;
        if (this.energy < 15) this.energy = 0;
        if (this.world && this.world.endbossHealthbar) {
            this.world.endbossHealthbar.setPercentage(this.energy);
        }
        if (this.energy <= 15) {
            this.die();
        }
    }

    /**
     * Plays the death animation once, then starts floating upward off-screen.
     * Safe to call multiple times.
     * @returns {void}
     */
    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.speed = 0;
        this.isChasing = false;
        this.freezeDirection = this.otherDirection;

        if (this.floatingInterval) {
            clearInterval(this.floatingInterval);
            this.floatingInterval = null;
        }
        this.currentImage = 0;
        this.deathIntervalId = setInterval(() => {
            if (this.currentImage < this.IMAGES_WHALE_DEAD.length) {
                const path = this.IMAGES_WHALE_DEAD[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                clearInterval(this.deathIntervalId);
                this.deathIntervalId = null;
                this.floatUpAndRemove();
            }
        }, this.DIE_ANIMATION_INTERVAL_MS);
    }

    /**
     * Moves upward until fully off-screen, then removes the entity from the world.
     * @returns {void}
     */
    floatUpAndRemove() {
        this.floatIntervalId = setInterval(() => {
            if (this.y > -this.height) {
                this.y -= 1.5;
            } else {
                clearInterval(this.floatIntervalId);
                this.floatIntervalId = null;
                this.removeFromWorld();
            }
        }, this.REMOVE_ANIMATION_INTERVAL_MS);
    }

    /**
     * Clears all active intervals related to this entity.
     * Useful when unloading the level or resetting the boss.
     * @returns {void}
     */
    stopIntervals() {
        if (this.introIntervalId) {
            clearInterval(this.introIntervalId);
            this.introIntervalId = null;
        }
        if (this.floatingInterval) {
            clearInterval(this.floatingInterval);
            this.floatingInterval = null;
        }
        if (this.deathIntervalId) {
            clearInterval(this.deathIntervalId);
            this.deathIntervalId = null;
        }
        if (this.floatIntervalId) {
            clearInterval(this.floatIntervalId);
            this.floatIntervalId = null;
        }
    }
}