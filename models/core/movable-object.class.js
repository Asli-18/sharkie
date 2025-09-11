class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection;
    energy = 100;
    speedY = 0;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;

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
        return this.energy == 15;
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
        // this.otherDirection = false;
        // console.log("y koordinate: ", this.y);
    }

    swimDown() {
        this.y += this.speed;
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
}