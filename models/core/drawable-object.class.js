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
        if (this instanceof Sharkie || this instanceof JellyFish || this instanceof PufferFish || this instanceof Coin || this instanceof PoisonFlask || this instanceof Whale) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'purple';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // drawHitbox(ctx) {
    //     const hitbox = { x: this.x, y: this.y, width: this.width, height: this.height };
    //     ctx.beginPath();
    //     ctx.lineWidth = 2;
    //     ctx.strokeStyle = 'blue';
    //     ctx.rect(hitbox.x, hitbox.y, hitbox.width, hitbox.height);
    //     ctx.stroke();
    // }

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

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


}