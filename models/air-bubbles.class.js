class AirBubbles extends ThrowableObject {

    constructor(x, y) {
        super();
        this.loadImage('assets/img/sharkie/white-bubble.png');
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 30;
        this.speedX = 1;
        this.throw();
    }
}