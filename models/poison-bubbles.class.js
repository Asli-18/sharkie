class PoisonBubbles extends ThrowableObject {

    constructor(x, y) {
        super();
        this.loadImage('assets/img/sharkie/green-bubble.png');
        this.x = x;
        this.y = y;
        this.height = 35;
        this.width = 35;
        this.speedX = 1;
        this.throw();
    }
}
