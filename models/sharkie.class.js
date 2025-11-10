/**
 * Player character "Sharkie": handles movement, animations, attacks, damage, and death.
 * 
 * Extends {@link MovableObject}.
 */
class Sharkie extends MovableObject {

    /**
     * Swim animation frames.
     * @type {string[]}
     */
    IMAGES_SWIMMING = [
        'assets/img/sharkie/sharkie-swim-1.png',
        'assets/img/sharkie/sharkie-swim-2.png',
        'assets/img/sharkie/sharkie-swim-3.png',
        'assets/img/sharkie/sharkie-swim-4.png',
        'assets/img/sharkie/sharkie-swim-5.png',
        'assets/img/sharkie/sharkie-swim-6.png'
    ];
    /**
     * Short idle animation frames (shown after brief inactivity).
     * @type {string[]}
     */
    IMAGES_IDLE_SHORT = [
        'assets/img/sharkie/sharkie-idle-1.png',
        'assets/img/sharkie/sharkie-idle-2.png',
        'assets/img/sharkie/sharkie-idle-3.png',
        'assets/img/sharkie/sharkie-idle-4.png',
        'assets/img/sharkie/sharkie-idle-5.png',
        'assets/img/sharkie/sharkie-idle-6.png',
        'assets/img/sharkie/sharkie-idle-7.png',
        'assets/img/sharkie/sharkie-idle-8.png',
        'assets/img/sharkie/sharkie-idle-9.png',
        'assets/img/sharkie/sharkie-idle-10.png',
        'assets/img/sharkie/sharkie-idle-11.png',
        'assets/img/sharkie/sharkie-idle-12.png',
        'assets/img/sharkie/sharkie-idle-13.png',
        'assets/img/sharkie/sharkie-idle-14.png',
        'assets/img/sharkie/sharkie-idle-15.png',
        'assets/img/sharkie/sharkie-idle-16.png',
        'assets/img/sharkie/sharkie-idle-17.png',
        'assets/img/sharkie/sharkie-idle-18.png'
    ];

    /**
     * Long idle animation frames (shown after extended inactivity).
     * @type {string[]}
     */
    IMAGES_IDLE_LONG = [
        'assets/img/sharkie/sharkie-long-idle-1.png',
        'assets/img/sharkie/sharkie-long-idle-2.png',
        'assets/img/sharkie/sharkie-long-idle-3.png',
        'assets/img/sharkie/sharkie-long-idle-4.png',
        'assets/img/sharkie/sharkie-long-idle-5.png',
        'assets/img/sharkie/sharkie-long-idle-6.png',
        'assets/img/sharkie/sharkie-long-idle-7.png',
        'assets/img/sharkie/sharkie-long-idle-8.png',
        'assets/img/sharkie/sharkie-long-idle-9.png',
        'assets/img/sharkie/sharkie-long-idle-10.png',
        'assets/img/sharkie/sharkie-long-idle-11.png',
        'assets/img/sharkie/sharkie-long-idle-12.png',
        'assets/img/sharkie/sharkie-long-idle-13.png',
        'assets/img/sharkie/sharkie-long-idle-14.png'
    ];

    /**
     * Sleep animation frames (very long inactivity).
     * @type {string[]}
     */
    IMAGES_SLEPP = [
        'assets/img/sharkie/sharkie-long-idle-11.png',
        'assets/img/sharkie/sharkie-long-idle-12.png',
        'assets/img/sharkie/sharkie-long-idle-13.png',
        'assets/img/sharkie/sharkie-long-idle-14.png'
    ];

    /**
     * Hurt animation when poisoned.
     * @type {string[]}
     */
    IMAGES_HURT_POISONED = [
        'assets/img/sharkie/sharkie-hurt-poisoned-2.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-3.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-4.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-5.png'
    ];

    /**
     * Hurt animation when electrocuted.
     * @type {string[]}
     */
    IMAGES_HURT_ELECTRIC = [
        'assets/img/sharkie/sharkie-hurt-electric-shock-1.png',
        'assets/img/sharkie/sharkie-hurt-electric-shock-2.png',
        'assets/img/sharkie/sharkie-hurt-electric-shock-3.png'
    ];

    /**
     * Death animation (no rising to surface).
     * @type {string[]}
     */
    IMAGES_DEAD_WITHOUT_RISING = [
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-1.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-2.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-3.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-4.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-5.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-6.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-7.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-8.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-9.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-10.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-11.png',
        'assets/img/sharkie/sharkie-dead-poisoned-without-rising-12.png'
    ];

    /**
     * Attack animation: bubble trap (without spawning the bubble here).
     * @type {string[]}
     */
    IMAGES_ATTACK_BUBBLE = [
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-1.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-2.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-3.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-4.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-5.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-6.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-7.png'
    ];

    /**
     * Attack animation: fin slap (melee).
     * @type {string[]}
     */
    IMAGES_ATTACK_FIN_SLAP = [
        'assets/img/sharkie/sharkie-attack-fin-slap-1.png',
        'assets/img/sharkie/sharkie-attack-fin-slap-2.png',
        'assets/img/sharkie/sharkie-attack-fin-slap-3.png',
        'assets/img/sharkie/sharkie-attack-fin-slap-4.png',
        'assets/img/sharkie/sharkie-attack-fin-slap-5.png',
        'assets/img/sharkie/sharkie-attack-fin-slap-6.png',
        'assets/img/sharkie/sharkie-attack-fin-slap-7.png',
        'assets/img/sharkie/sharkie-attack-fin-slap-8.png'
    ];

    /**
     * Base movement speed.
     * @type {number}
     */
    speed = 4;

    /**
     * Timestamp of the last user input (for idle/sleep state logic).
     * @type {number}
     */
    lastKeyPress = Date.now();

    /**
     * Collected coin count.
     * @type {number}
     */
    coin = 0;

    /**
     * Collected poison amount (used for poison shots).
     * @type {number}
     */
    poison = 0;

    /**
     * Whether a bubble-shot animation/action is currently active.
     * @type {boolean}
     */
    shootingBubble = false;

    /**
     * Current shot type (e.g., 'air' or 'poison'); null if none.
     * @type {string|null}
     */
    shootType = null;

    /**
     * Facing/flip flag: true when facing left.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Whether the death sequence has already started.
     * @type {boolean}
     */
    deathStarted = false;

    /**
     * Initializes Sharkie, loads sprites, and starts animation/state loops.
     */
    constructor() {
        super().loadImage('assets/img/sharkie/sharkie-swim-1.png');
        this.offset = {
            top: 85,
            left: 40,
            right: 40,
            bottom: 40,
        };
        this.world = world;
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_IDLE_SHORT);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_SLEPP);
        this.loadImages(this.IMAGES_DEAD_WITHOUT_RISING);
        this.loadImages(this.IMAGES_HURT_POISONED);
        this.loadImages(this.IMAGES_HURT_ELECTRIC);
        this.loadImages(this.IMAGES_ATTACK_BUBBLE);
        this.loadImages(this.IMAGES_ATTACK_FIN_SLAP);
        this.animate();
    }

    /**
     * Plays a list of frames exactly once, then calls an optional callback.
     * @param {string[]} images - Frame paths to play in order.
     * @param {number} [frameMs=100] - Milliseconds per frame.
     * @param {Function} [onDone] - Optional callback invoked after the last frame.
     */
    playOnce(images, frameMs = 100, onDone) {
        let frame = 0;
        const interval = setInterval(() => {
            if (frame < images.length) {
                this.img = this.imageCache[images[frame]];
                frame++;
            } else {
                clearInterval(interval);
                if (typeof onDone === 'function') onDone();
            }
        }, frameMs);
    }

    /**
     * Starts the death sequence once, then shows the lose screen.
     * @returns {void}
     */
    startDeathSequence() {
        if (this.deathStarted) return;
        this.deathStarted = true;
        this.world && this.world.poisonFlaskBar && this.world.poisonFlaskBar.setPercentage(0);
        this.speed = 0;
        this.playOnce(this.IMAGES_DEAD_WITHOUT_RISING, 80, () => {
            setTimeout(() => {
                if (this.world) this.world.showLoseScreen();
            }, 200);
        });
    }

    /**
     * Applies damage if not currently hurt or dead, updates UI, and plays a hurt sound.
     * @param {number} [damage=5] - Damage amount to subtract from energy.
     * @param {'poisoned'|'electric'} [type='poisoned'] - Hurt type (affects animation).
     * @returns {void}
     */
    hit(damage = 5, type = 'poisoned') {
        if (this.isHurt() || this.deathStarted) return;
        this.energy -= damage;
        if (this.energy < 0) this.energy = 0;
        this.lastHit = new Date().getTime();
        this.hurtType = type;
        if (this.world && this.world.healthBar) {
            this.world.healthBar.setPercentage(this.energy);
        }
        AUDIO_SHARKIE_DAMAGE.currentTime = 0;
        AUDIO_SHARKIE_DAMAGE.volume = 0.1;
        AUDIO_SHARKIE_DAMAGE.play();
    }

    /**
     * Starts movement and state/animation loops, handles input and state transitions.
     */
    animate() {
        this.movementIntervalId = setInterval(() => { this.handleMovementInput(); this.world.camera_x = -this.x + 50; }, 1000 / 60);
        this.stateIntervalId = setInterval(() => { this.updateStateFrame(); }, 120);
    }

    /**
     * Evaluates inputs and current state for this tick and updates animations/flows.
     * May trigger the death sequence or play hurt/idle/attack/swim animations.
     * @returns {void}
     */
    updateStateFrame() {
        const now = Date.now();
        const idleTime = now - this.lastKeyPress;
        if (!this.isHurt() && this.hurtType) {
            this.hurtType = null;
        }
        if (this.isDead()) {
            this.startDeathSequence();
            return;
        } else if (this.isHurt()) {
            this.handleHurtAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.handleSwimRightAndLeftAnimation();
        } else if (this.world.keyboard.UP || this.world.keyboard.DOWN) {
            this.handleSwimUpAndDownAnimation();
        } else if (this.world.keyboard.E || this.world.keyboard.W) {
            this.handleBubbleAttack();
        } else if (this.world.keyboard.F) {
            this.handleFinSlapAttack();
        } else if (this.isAboveGround()) {
            this.handleIdleAnimation(idleTime);
        }
    }
    /**
     * Plays the swim animation for horizontal movement and refreshes the idle timer.
     */
    handleSwimRightAndLeftAnimation() {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.lastKeyPress = Date.now();
    }
    /**
     * Plays the swim animation for vertical movement and refreshes the idle timer.
     */
    handleSwimUpAndDownAnimation() {
        this.playAnimation(this.IMAGES_SWIMMING);
        this.lastKeyPress = Date.now();
    }

    /**
     * Handles the bubble attack input: plays SFX, triggers the attack animation,
     * and refreshes the idle timer.
     */
    handleBubbleAttack() {
        AUDIO_BUBBBLE.play();
        AUDIO_BUBBBLE.volume = 0.09;
        this.shootBubble();
        this.lastKeyPress = Date.now();
    }

    /**
     * Handles the fin slap input: plays SFX, performs the attack,
     * and refreshes the idle timer.
     */
    handleFinSlapAttack() {
        AUDIO_SLAP.play();
        AUDIO_SLAP.volume = 0.1;
        this.finSlapAttack();
        this.lastKeyPress = Date.now();
    }

    /**
     * Selects an idle animation based on inactivity time.
     * @param {number} idleTime - Milliseconds since the last key press.
     */
    handleIdleAnimation(idleTime) {
        if (idleTime < 1000) {
            this.playAnimation(this.IMAGES_IDLE_SHORT);
        } else if (idleTime >= 1000 && idleTime < 6000) {
            this.playAnimation(this.IMAGES_IDLE_SHORT);
        } else if (idleTime >= 6000 && idleTime < 7000) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
        } else {
            this.playAnimation(this.IMAGES_SLEPP);
        }
    }

    /**
     * Chooses and plays the correct hurt animation based on {@link Sharkie#hurtType}.
     */
    handleHurtAnimation() {
        if (this.hurtType === 'electric') {
            this.playAnimation(this.IMAGES_HURT_ELECTRIC);
        } else {
            this.playAnimation(this.IMAGES_HURT_POISONED);
        }
    }

    /**
     * Reads keyboard input and dispatches to direction-specific movement handlers.
     * Includes world bounds checks for x/y movement.
     */
    handleMovementInput() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.handleMovementInputToRight();
        }
        if (this.world.keyboard.LEFT && this.x > -1000) {
            this.handleMovementInputToLeft();
        }
        if (this.world.keyboard.UP && this.y > 50) {
            this.handleMovementInputToUp();
        }
        if (this.world.keyboard.DOWN && this.y < 320) {
            this.handleMovementInputToDown();
        }
    }

    /**
     * Moves downward (swimDown) and refreshes the idle timer.
     */
    handleMovementInputToDown() {
        this.swimDown();
        this.lastKeyPress = Date.now();
    }

    /**
     * Moves upward (swimUp) and refreshes the idle timer.
     */
    handleMovementInputToUp() {
        this.swimUp();
        this.lastKeyPress = Date.now();
    }

    /**
     * Moves left (swimLeft), sets facing to left, and refreshes the idle timer.
     */
    handleMovementInputToLeft() {
        this.swimLeft();
        this.otherDirection = true;
        this.lastKeyPress = Date.now();
    }

    /**
     * Moves right (swimRight), sets facing to right, and refreshes the idle timer.
     */
    handleMovementInputToRight() {
        this.swimRight();
        this.otherDirection = false;
        this.lastKeyPress = Date.now();
    }

    /**
     * Performs the fin slap attack: plays the animation and applies damage within a hitbox.
     * @returns {void}
     */
    finSlapAttack() {
        this.playAnimation(this.IMAGES_ATTACK_FIN_SLAP);
        let hitbox = { x: this.otherDirection ? this.x - 60 : this.x + this.width, y: this.y + this.height / 3, width: 60, height: this.height / 2 };
        this.world.level.enemies.forEach(enemy => {
            if (enemy instanceof JellyFish && this.isCollidingWithHitbox(hitbox, enemy) || enemy instanceof PufferFish && this.isCollidingWithHitbox(hitbox, enemy)) {
                enemy.hit();
                if (enemy.energy <= 0) {
                    enemy.die(enemy.variant);
                }
            }
        });
    }

    /**
     * Collision test between a rectangular hitbox and an enemy.
     * @param {{x:number,y:number,width:number,height:number}} hitbox - Attack rectangle.
     * @param {Object} enemy - Enemy object with x, y, width, height.
     * @returns {boolean} True if rectangles overlap.
     */
    isCollidingWithHitbox(hitbox, enemy) {
        return (hitbox.x < enemy.x + enemy.width && hitbox.x + hitbox.width > enemy.x && hitbox.y < enemy.y + enemy.height && hitbox.y + hitbox.height > enemy.y);
    }

    /**
     * Plays the bubble attack animation and optionally calls a callback after the animation duration (does not spawn a bubble here).
     * @param {Function} [callback] - Invoked after the animation completes.
     * @returns {void}
     */
    shootBubble(callback) {
        this.playAnimation(this.IMAGES_ATTACK_BUBBLE, 60);
        const animationDuration = this.IMAGES_ATTACK_BUBBLE.length * 60;
        setTimeout(() => {
            if (typeof callback === 'function') {
                callback();
            } else {
                console.warn('Sharkie No callback provided, skipping bubble spawn');
            }
        }, animationDuration);
    }

    /**
     * Resets poison amount and updates the poison Heads-Up Display bar to 0%.
     * @returns {void}
     */
    resetPoison() {
        this.poison = 0;
        if (this.world && this.world.poisonFlaskBar) {
            this.world.poisonFlaskBar.setPercentage(0);
        }
    }

    /**
     * Stops running intervals created by {@link animate}.
     * @returns {void}
     */
    stopIntervals() {
        if (this.movementIntervalId) {
            clearInterval(this.movementIntervalId);
            this.movementIntervalId = null;
        }
        if (this.stateIntervalId) {
            clearInterval(this.stateIntervalId);
            this.stateIntervalId = null;
        }
    }
}