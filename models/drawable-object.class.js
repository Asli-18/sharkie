class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 10;
    y = 200;
    width = 200;
    height = 180;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Sharkie || this instanceof JellyFish || this instanceof PufferFish || this instanceof Coin ||  this instanceof PoisonFlask || this instanceof Whale) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'purple';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}