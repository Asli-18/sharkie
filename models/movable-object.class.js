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
    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
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
        this.otherDirection = false;
        console.log("y koordinate: ", this.y);
    }

    swimDown() {
        this.y += this.speed;
        this.otherDirection = false;
        console.log("y koordinate: ", this.y);
    }
}