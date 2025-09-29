class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection;
    energy = 100;
    speedY = 0;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    angle;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };






    constructor() {
        super();
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);


    }
    propelBubble() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.x -= this.speedX;
                this.speedX -= this.acceleration;
            }
        }, 1000 / 15);
    }

    isAboveGround() {
        if (this instanceof AirBubbles || this instanceof PoisonBubbles) {
            return true;
        } else {
            return this.y < 700;
        }
    }

    isColliding(movebleObject) {
        return (
            this.x + this.width - this.offset.right > movebleObject.x + movebleObject.offset.left &&
            this.y + this.height - this.offset.bottom > movebleObject.y + movebleObject.offset.top &&
            this.x + this.offset.left < movebleObject.x + movebleObject.width - movebleObject.offset.right &&
            this.y + this.offset.top < movebleObject.y + movebleObject.height - movebleObject.offset.bottom
        );
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    isDead() {
        return this.dead || this.energy <= 0;
    }

    animate() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    // animation for sharkie
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    swimRight() {
        this.x += this.speed;
        this.otherDirection = false;
        // console.log("x koordinate: ", this.x);
    }

    swimLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        // console.log("x koordinate: ", this.x);
    }
    swimUp() {
        this.y -= this.speed;
        this.angle = -Math.PI / 6;
        // this.otherDirection = false;
        // console.log("y koordinate: ", this.y);
    }

    swimDown() {
        this.y += this.speed;
        this.angle = Math.PI / 6;
        // this.otherDirection = false;
        // console.log("y koordinate: ", this.y);
    }

    setVariant(variant) {
        if (this.SWIMMING_VARIANTS[variant]) {
            this.images = this.SWIMMING_VARIANTS[variant];
        }
    }

    // animation for jelly fish and pufferfish
    animation() {
        let i = this.currentImage % this.images.length;
        let path = this.images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    die() {
        // if (this.isDead()) return;
        this.speed = 0;
        this.dead = true;

        this.images = this.DEAD_VARIANTS[this.variant];
        this.currentImage = 0;
        this.loadImages(this.images);
        this.playDeathAnimation(() => {
            this.floatUpAndRemove();
        });
    }

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



}