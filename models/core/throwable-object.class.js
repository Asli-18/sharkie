class ThrowableObject extends MovableObject {

    constructor() {
        super();
        this.x = 10;
        this.y = 200;
        this.speedX = 1;

    }

    throw() {

        this.propelBubble();
    }


}