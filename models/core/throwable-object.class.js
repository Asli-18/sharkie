/**
 * 
 */
class ThrowableObject extends MovableObject {
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} otherDirection 
     */
    constructor(x, y, otherDirection) {
        super();
        this.x = x;
        this.y = y;
        this.speedX = this.checkDirection(otherDirection);

    }
    /**
     * 
     */
    throw() {
        this.propelBubble();
    }
    /**
     * 
     * @param {*} otherDirection 
     * @returns 
     */
    checkDirection(otherDirection) {
        if (otherDirection) {
            return -5;
        } else {
            return 5;
        }
    }
}