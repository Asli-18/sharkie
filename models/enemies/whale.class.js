class Whale extends MovableObject {
    x = 3500;
    y = 0;
    width = 350;
    height = 350;

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
    // assets/img/enemy/monster-whale-dead-1.png

    IMAGES_WHALE_DEAD = [
        'assets/img/enemy/monster-whale-dead-1.png',
        'assets/img/enemy/monster-whale-dead-2.png',
        'assets/img/enemy/monster-whale-dead-3.png',
        'assets/img/enemy/monster-whale-dead-4.png',
        'assets/img/enemy/monster-whale-dead-5.png',
        'assets/img/enemy/monster-whale-dead-6.png'
    ];

    hasPlayedIntro = false;
    introStarted = false;
    isChasing = false;
    energy = 100;
    isDead = false;
    floatingInterval = null;
    otherDirection = false;

    constructor(imagePath = 'assets/img/enemy/monster-whale-introduce-1.png') {
        super().loadImage(imagePath);
        this.offset = { top: 150, left: 20, right: 30, bottom: 60, };
        this.loadImages(this.IMAGES_WHALE_INTRODUCE);
        this.loadImages(this.IMAGES_WHALE_FLOATING);
        this.loadImages(this.IMAGES_WHALE_DEAD);
        this.speed = 5.5;
    }

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


    isNear(sharkie) {
        const distanceX = Math.abs(this.x - sharkie.x);
        const distanceY = Math.abs(this.y - sharkie.y);
        return distanceX < 400 && distanceY < 150;
    }

    playIntroAnimation() {
        if (this.introStarted) return;
        this.introStarted = true;
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
        }, 100);
    }


    playFloatingAnimation() {
        this.currentImage = 0;
        this.floatingInterval = setInterval(() => {
            const i = this.currentImage % this.IMAGES_WHALE_FLOATING.length;
            const path = this.IMAGES_WHALE_FLOATING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 120);
    }

    startChase() {
        this.isChasing = true;
    }

    chase(sharkie) {
        const distancex = sharkie.x - this.x;
        const distancey = sharkie.y - this.y;

        const distance = Math.sqrt(distancex * distancex + distancey * distancey);
        if (distance > 0) {
            this.x += (distancex / distance) * this.speed;
            this.y += (distancey / distance) * this.speed * 0.6;
        }
    }

    takeDamage(amount) {
        if (this.isDead) return;
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
        }, 150);
    }

    floatUpAndRemove() {
        this.floatIntervalId = setInterval(() => {
            if (this.y > -this.height) {
                this.y -= 1.5;
            } else {
                clearInterval(this.floatIntervalId);
                this.floatIntervalId = null;
                this.removeFromWorld();
            }
        }, 1000 / 60);
    }

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