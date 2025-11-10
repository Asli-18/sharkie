const frameChangeTime = 250;
/**
 * Collectible coin that cycles through sprite frames.
 * Extends {@link MovableObject}.
 */
class Coin extends MovableObject {
    /** 
     * @type {number} Width of the sprite in pixels. 
     */
    width = 25;

    /** 
     * @type {number} Height of the sprite in pixels.
     */
    height = 25;

    /**
     * Animation frames for the coin.
     * @type {IMAGES: string[]}
     */
    IMAGES = [
        'assets/img/resource-display/coin-1.png',
        'assets/img/resource-display/coin-2.png',
        'assets/img/resource-display/coin-3.png',
        'assets/img/resource-display/coin-4.png'
    ];

    /**
     * Creates a new {@link Coin} at the given world coordinates.
     * @param {number} x - world coordinate x
     * @param {number} y - world coordinate y
     */
    constructor(x, y) {
        super();
        this.loadImage('assets/img/resource-display/coin-1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Starts the coin animation (frame change every 250 ms)
     */
    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES.length;
            let path = this.IMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, frameChangeTime);
    }
}