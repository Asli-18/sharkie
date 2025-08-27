class Coin extends MovableObject {
    width = 25;
    height = 25;
    IMAGES = [
        'assets/img/resource-display/coin-1.png',
        'assets/img/resource-display/coin-2.png',
        'assets/img/resource-display/coin-3.png',
        'assets/img/resource-display/coin-4.png'
    ];

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES.length;
            let path = this.IMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 250);
        // setInterval(() => {
        //     this.y += this.speed * this.direction;
        //     if (this.y > 400 || this.y < 50) {
        //         this.direction *= -1;
        //     }
        // }, 1000 / 60);
    }
}