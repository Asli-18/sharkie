/**
 * Projectile representing an air bubble thrown by the player.
 *
 * Extends {@link ThrowableObject}.
 */
class AirBubbles extends ThrowableObject {

    /**
     * Creates an air-bubble projectile at the given world position, sets its sprite/size,
     * and immediately starts its throw/motion behavior.
     *
     * @param {number} x - Initial x position in world coordinates.
     * @param {number} y - Initial y position in world coordinates.
     * @param {boolean} otherDirection - direction flag.
     */
    constructor(x, y, otherDirection) {
        super(x, y, otherDirection);
        this.loadImage('assets/img/sharkie/white-bubble.png');
        this.height = 30;
        this.width = 30;
        this.throw();
    }
}