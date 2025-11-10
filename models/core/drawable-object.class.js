/**
 * Base drawable entity with position, size, and sprite handling.
 * Provides image loading, drawing, and optional debug outlines.
 */
class DrawableObject {

    /**
     * Current sprite image to render.
     * @type {HTMLImageElement}
     */
    img;
    /**
     * Cache of preloaded images keyed by file path.
     * @type {Record<string, HTMLImageElement>}
     */
    imageCache = {};
    /**
     * Frame counter/index used by animation routines.
     * @type {number}
     */
    currentImage = 0;
    /**
     * World-space X coordinate.
     * @type {number}
     */
    x = 10;
    /**
     * World-space Y coordinate.
     * @type {number}
     */
    y = 200;
    /**
     * Render width in pixels.
     * @type {number}
     */
    width = 200;
    /**
     * Render height in pixels.
     * @type {number}
     */
    height = 180;

    /**
     * Loads a single image and sets it as the active sprite.
     * @param {string} path - Image file path.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the current sprite at (x, y) with (width, height).
     * @param {CanvasRenderingContext2D} ctx - 2D drawing context.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a purple debug rectangle around the object's render bounds.
     * Only active for selected game entities (player, enemies, items, bubbles).
     * @param {CanvasRenderingContext2D} ctx - 2D drawing context.
     * @returns {void}
     */
    drawFrame(ctx) {
        if (this instanceof Sharkie || this instanceof JellyFish || this instanceof PufferFish || this instanceof Coin || this instanceof PoisonFlask || this instanceof Whale || this instanceof AirBubbles|| this instanceof PoisonBubbles) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'purple';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a yellow debug rectangle for the collision hitbox.
     * Expects subclasses to define `offset` with {top,left,right,bottom} numbers.
     * Active for selected characters/enemies only.
     * @param {CanvasRenderingContext2D} ctx - 2D drawing context.
     * @returns {void}
     */
    drawCollisionBorder(ctx) {
        if (this instanceof Sharkie || this instanceof JellyFish || this instanceof PufferFish || this instanceof Whale) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'yellow';
            const rectX = this.x + this.offset.left;
            const rectY = this.y + this.offset.top;
            const rectWidth = this.width - this.offset.right - this.offset.left;
            const rectHeight = this.height - this.offset.bottom - this.offset.top;
            ctx.rect(rectX, rectY, rectWidth, rectHeight);
            ctx.stroke();
        }
    }

    /**
     * Preloads multiple images into {@link DrawableObject#imageCache}.
     * @param {string[]} array - List of image paths to cache.
     * @returns {void}
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}