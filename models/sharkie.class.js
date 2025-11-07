class Sharkie extends MovableObject {
    IMAGES_SWIMMING = [
        'assets/img/sharkie/sharkie-swim-1.png',
        'assets/img/sharkie/sharkie-swim-2.png',
        'assets/img/sharkie/sharkie-swim-3.png',
        'assets/img/sharkie/sharkie-swim-4.png',
        'assets/img/sharkie/sharkie-swim-5.png',
        'assets/img/sharkie/sharkie-swim-6.png'
    ];
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

    IMAGES_SLEPP = [
        'assets/img/sharkie/sharkie-long-idle-11.png',
        'assets/img/sharkie/sharkie-long-idle-12.png',
        'assets/img/sharkie/sharkie-long-idle-13.png',
        'assets/img/sharkie/sharkie-long-idle-14.png'
    ];

    IMAGES_HURT_POISONED = [
        'assets/img/sharkie/sharkie-hurt-poisoned-2.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-3.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-4.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-5.png'
    ];

    IMAGES_HURT_ELECTRIC = [
        'assets/img/sharkie/sharkie-hurt-electric-shock-1.png',
        'assets/img/sharkie/sharkie-hurt-electric-shock-2.png',
        'assets/img/sharkie/sharkie-hurt-electric-shock-3.png'
    ];

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

    IMAGES_ATTACK_BUBBLE = [
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-1.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-2.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-3.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-4.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-5.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-6.png',
        'assets/img/sharkie/sharkie-attack-bubble-trap-without-bubble-7.png'
    ];

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

    speed = 4;
    lastKeyPress = Date.now();
    coin = 0;
    poison = 0;
    shootingBubble = false;
    shootType = null;
    // false = rechts, true = links
    otherDirection = false;

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

    deathStarted = false;

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

    animate() {
        this.movementIntervalId = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.swimRight();
                this.otherDirection = false;
                this.lastKeyPress = Date.now();
            }
            if (this.world.keyboard.LEFT && this.x > -1000) {
                this.swimLeft();
                this.otherDirection = true;
                this.lastKeyPress = Date.now();
            }
            if (this.world.keyboard.UP && this.y > 50) {
                this.swimUp();
                this.lastKeyPress = Date.now();
            }
            if (this.world.keyboard.DOWN && this.y < 320) {
                this.swimDown();
                this.lastKeyPress = Date.now();
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);

        this.stateIntervalId = setInterval(() => {
            const now = Date.now();
            const idleTime = now - this.lastKeyPress;
            if (!this.isHurt() && this.hurtType) {
                this.hurtType = null;
            }
            if (this.isDead()) {
                this.startDeathSequence();
                return;
            } else if (this.isHurt()) {
                if (this.hurtType === 'electric') {
                    this.playAnimation(this.IMAGES_HURT_ELECTRIC);
                } else {
                    this.playAnimation(this.IMAGES_HURT_POISONED);
                }
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_SWIMMING);
                this.lastKeyPress = Date.now();
            } else if (this.world.keyboard.UP || this.world.keyboard.DOWN) {
                this.playAnimation(this.IMAGES_SWIMMING);
                this.lastKeyPress = Date.now();
            } else if (this.world.keyboard.E || this.world.keyboard.W) {
                AUDIO_BUBBBLE.play();
                AUDIO_BUBBBLE.volume = 0.09;
                this.shootBubble();
                this.lastKeyPress = Date.now();
            } else if (this.world.keyboard.F) {
                AUDIO_SLAP.play();
                AUDIO_SLAP.volume = 0.1;
                this.finSlapAttack();
                this.lastKeyPress = Date.now();
            } else if (this.isAboveGround()) {
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
        }, 120);
    }

    finSlapAttack() {
        this.playAnimation(this.IMAGES_ATTACK_FIN_SLAP);
        let hitbox = {
            x: this.otherDirection
                ? this.x - 60
                : this.x + this.width,
            y: this.y + this.height / 3,
            width: 60,
            height: this.height / 2
        };
        this.world.level.enemies.forEach(enemy => {
            if (enemy instanceof JellyFish && this.isCollidingWithHitbox(hitbox, enemy) || enemy instanceof PufferFish && this.isCollidingWithHitbox(hitbox, enemy)) {
                enemy.hit();
                if (enemy.energy <= 0) {
                    enemy.die(enemy.variant);
                    console.log("die - fin slap");
                }
            }
        });
    }

    isCollidingWithHitbox(hitbox, enemy) {
        return (
            hitbox.x < enemy.x + enemy.width &&
            hitbox.x + hitbox.width > enemy.x &&
            hitbox.y < enemy.y + enemy.height &&
            hitbox.y + hitbox.height > enemy.y
        );
    }

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

    resetPoison() {
        this.poison = 0;
        if (this.world && this.world.poisonFlaskBar) {
            this.world.poisonFlaskBar.setPercentage(0);
        }
    }

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