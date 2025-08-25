class Light extends MovableObject {
    // assets/img/background/light-full.png
    x = 0;
    y = 0;
    width = 1400;
    height = 580;

    constructor(x, y) {
        super().loadImage('assets/img/background/light-full.png');
        this.x = x;
        this.y = y;
        this.animate();

    }
}