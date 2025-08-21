class MovableObject {
    x = 10;
    y = 200;
    img;
    width = 200;
    height = 180;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection;
    energy = 100;
    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Sharkie || this instanceof JellyFish || this instanceof PufferFish || this instanceof Coin || this instanceof Whale) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'purple';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
        }
    }

    isDead() {
        return this.energy == 0;
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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
        console.log("x koordinate: ", this.x);
    }

    swimLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
        console.log("x koordinate: ", this.x);
    }
    swimUp() {
        this.y -= this.speed;
        // this.otherDirection = false;
        console.log("y koordinate: ", this.y);
    }

    swimDown() {
        this.y += this.speed;
        // this.otherDirection = false;
        console.log("y koordinate: ", this.y);
    }
}