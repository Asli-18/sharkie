class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection;
    energy = 100;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 700;
    }

    isColliding(movebleObject) {
        return this.x + this.width > movebleObject.x &&
            this.y + this.height > movebleObject.y &&
            this.x < movebleObject.x &&
            this.y < movebleObject.y + movebleObject.height;
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
        return this.energy == 0;
    }

    animate() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

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
}