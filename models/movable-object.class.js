class MovableObject {
    x = 10;
    y = 200;
    img;
    width = 200;
    height = 150;

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