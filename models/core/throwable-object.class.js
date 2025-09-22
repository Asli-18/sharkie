class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.speedX = 1;

    }

    throw() {
        this.propelBubble();
    }


}