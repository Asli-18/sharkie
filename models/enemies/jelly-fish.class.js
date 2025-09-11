class JellyFish extends MovableObject {
    width = 50;
    height = 50;
    speed = 0.05;
    direction = 1;
    SWIMMING_VARIANTS = {
        yellowGreen: [
            'assets/img/enemy/jelly-fish-yellow-1.png',
            'assets/img/enemy/jelly-fish-yellow-2.png',
            'assets/img/enemy/jelly-fish-yellow-3.png',
            'assets/img/enemy/jelly-fish-yellow-4.png',
            'assets/img/enemy/jelly-fish-green-1.png',
            'assets/img/enemy/jelly-fish-green-2.png',
            'assets/img/enemy/jelly-fish-green-3.png',
            'assets/img/enemy/jelly-fish-green-4.png'
        ],
        lilaPink: [
            'assets/img/enemy/jelly-fish-lila-1.png',
            'assets/img/enemy/jelly-fish-lila-2.png',
            'assets/img/enemy/jelly-fish-lila-3.png',
            'assets/img/enemy/jelly-fish-lila-4.png',
            'assets/img/enemy/jelly-fish-pink-1.png',
            'assets/img/enemy/jelly-fish-pink-2.png',
            'assets/img/enemy/jelly-fish-pink-3.png',
            'assets/img/enemy/jelly-fish-pink-4.png'
        ]
    }

    constructor(variant = "yellowGreen") {
        super();
        this.initJellyFish(variant);
    }

    initJellyFish(variant) {
        this.setVariant(variant);
        this.loadImages(this.images);
        this.setRandomPosition();
        this.setRandomSpeed();
        this.animate();
    }

    setVariant(variant) {
        // this.images = this.SWIMMG_VARIANTS[variant] || this.SWIMMG_VARIANTS.yellowGreen;
        if (this.SWIMMING_VARIANTS[variant]) {
            this.images = this.SWIMMING_VARIANTS[variant];
        } else {
            this.images = this.SWIMMING_VARIANTS.yellowGreen;
        }
    }

    setRandomPosition() {
        this.x = 250 + Math.random() * 2500;
        this.y = 30 + Math.random() * 400;
    }

    setRandomSpeed() {
        this.speed = 0.05 + Math.random() * 0.1;
    }

    animate() {
        setInterval(() => this.animationJellyFish(), 250);
        setInterval(() => this.moveJellyFish(), 1000 / 60);
    }

    animationJellyFish() {
        let i = this.currentImage % this.images.length;
        let path = this.images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveJellyFish() {
        this.y += this.speed * this.direction;
        if (this.y > 400 || this.y < 50) {
            this.direction *= -1;
        }
    }
}