class AirBubbles extends ThrowableObject {
    constructor(x, y, otherDirection) {
        super(x, y, otherDirection); 
        this.loadImage('assets/img/sharkie/white-bubble.png');
        // this.x = x;
        // this.y = y;
        this.height = 30;
        this.width = 30;
        // this.checkDirection(otherDirection);
        this.throw();
    }
}
