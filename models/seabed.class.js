class Seabed extends MovableObject {
    x = 0;
    y = 0;
    width = 1440;
    height = 480;


    constructor(x, y) {
        super().loadImage('assets/img/background/seabed-dark-full.png');
        this.x = x;
        this.y = y;
    }
}