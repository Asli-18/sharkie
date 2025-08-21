class PoisonFlaskCounter extends MovableObject{
    width = 65;
    height = 65;


    constructor(x, y) {
        super().loadImage('assets/img/resource-display/poisoned-bubble-100.png');
        this.x = x;
        this.y = y;
    }
}