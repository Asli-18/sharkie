class ThrowableObject extends MovableObject {

    constructor(x, y, otherDirection) {
        super();
        this.x = x;
        this.y = y;
        this.speedX = this.checkDirection(otherDirection);

    }

    throw() {
        this.propelBubble();
    }

    checkDirection(otherDirection) {
        if (otherDirection) {
           return -5;
        } else {
            return 5;
        }
    }
}