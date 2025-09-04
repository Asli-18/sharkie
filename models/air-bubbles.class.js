class AirBubbles extends ThrowableObject {
    IMAGE = [
        'assets/img/sharkie/white-bubble.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 30;
        this.speedX = 1;
        this.throw();
    }
}