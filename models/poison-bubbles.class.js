class PoisonBubbles extends ThrowableObject {
    IMAGE = [
        'assets/img/sharkie/green-bubble.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGE);
        this.x = x;
        this.y = y;
        this.height = 35;
        this.width = 35;
        this.speedX = 1;
        this.throw();
    }
}
