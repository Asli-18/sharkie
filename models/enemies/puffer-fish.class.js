class PufferFish extends MovableObject {
    width = 50;
    height = 50;
    IMAGES_SWIMMING = [
        'assets/img/enemy/puffer-fish-swim-salmon-1.png',
        'assets/img/enemy/puffer-fish-swim-salmon-2.png',
        'assets/img/enemy/puffer-fish-swim-salmon-3.png',
        'assets/img/enemy/puffer-fish-swim-salmon-4.png',
        'assets/img/enemy/puffer-fish-swim-salmon-5.png',
        'assets/img/enemy/puffer-fish-transition-pink-1.png',
        'assets/img/enemy/puffer-fish-transition-pink-2.png',
        'assets/img/enemy/puffer-fish-transition-pink-3.png',
        'assets/img/enemy/puffer-fish-transition-pink-4.png',
        'assets/img/enemy/puffer-fish-transition-pink-5.png',
        'assets/img/enemy/puffer-fish-bubbleswim-pink-1.png',
        'assets/img/enemy/puffer-fish-bubbleswim-pink-2.png',
        'assets/img/enemy/puffer-fish-bubbleswim-pink-3.png',
        'assets/img/enemy/puffer-fish-bubbleswim-pink-4.png',
        'assets/img/enemy/puffer-fish-bubbleswim-pink-5.png',
        'assets/img/enemy/puffer-fish-transition-pink-5.png',
        'assets/img/enemy/puffer-fish-transition-pink-4.png',
        'assets/img/enemy/puffer-fish-transition-pink-3.png',
        'assets/img/enemy/puffer-fish-transition-salmon-2.png',
        'assets/img/enemy/puffer-fish-transition-salmon-1.png',
    ];

    constructor(imagePath = 'assets/img/enemy/puffer-fish-swim-salmon-1.png') {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 200 + Math.random() * 2500;
        this.y = 30 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.20;

        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_SWIMMING.length;
            let path = this.IMAGES_SWIMMING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 250);

        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}

