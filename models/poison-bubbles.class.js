/**
 * Projectile representing a poison bubble thrown by the player.
 *
 * Extends {@link ThrowableObject}.
 */
class PoisonBubbles extends ThrowableObject {

    /**
     * Creates a poison bubble at the given world position, sets its sprite/size,
     * and immediately starts its throw/motion behavior.
     *
     * @param {number} x - Initial x position in world coordinates.
     * @param {number} y - Initial y position in world coordinates.
     * @param {boolean} otherDirection - direction flag
     */
    constructor(x, y, otherDirection) {
        super(x, y, otherDirection);
        this.loadImage('assets/img/sharkie/green-bubble.png');
        this.height = 35;
        this.width = 35;
        this.throw();
    }
}
