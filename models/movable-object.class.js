class MovableObject {
    x = 120;
    y = 400;
    img;

    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    swimRight() {
        console.log("swiming right!");

    }

    swimLeft() {
        console.log("swiming left!");

    }
}