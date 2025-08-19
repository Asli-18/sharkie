class HealthCounter extends MovableObject{
    x = 0;
    y = 0;
    width = 45;
    height = 45;


    constructor(x, y) {
        super().loadImage('assets/img/resource-display/life-100.png');
        this.x = x;
        this.y = y;
    }
}