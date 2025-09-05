class JellyFish extends MovableObject {
    width = 50;
    height = 50;
    IMAGES_SWIMMING = [
        'assets/img/enemy/jelly-fish-yellow-1.png',
        'assets/img/enemy/jelly-fish-yellow-2.png',
        'assets/img/enemy/jelly-fish-yellow-3.png',
        'assets/img/enemy/jelly-fish-yellow-4.png',
        'assets/img/enemy/jelly-fish-green-1.png',
        'assets/img/enemy/jelly-fish-green-2.png',
        'assets/img/enemy/jelly-fish-green-3.png',
        'assets/img/enemy/jelly-fish-green-4.png'
    ];

    // IMAGES_PUFFER_FISH_YELLOW = [
    //     'assets/img/enemy/jelly-fish-yellow-1.png',
    //     'assets/img/enemy/jelly-fish-yellow-2.png',
    //     'assets/img/enemy/jelly-fish-yellow-3.png',
    //     'assets/img/enemy/jelly-fish-yellow-4.png'
    // ]; 

    // IMAGES_PUFFER_FISH_GREEN = [
    //     'assets/img/enemy/jelly-fish-green-1.png',
    //     'assets/img/enemy/jelly-fish-green-2.png',
    //     'assets/img/enemy/jelly-fish-green-3.png',
    //     'assets/img/enemy/jelly-fish-green-4.png'
    // ];

    speed = 0.05;
    direction = 1;
    // 'assets/img/enemy/jelly-fish-lila-1.png'
    constructor(imagePath = 'assets/img/enemy/jelly-fish-yellow-1.png') {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 250 + Math.random() * 2500;
        this.y = 30 + Math.random() * 400;
        this.speed = 0.05 + Math.random() * 0.1;
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
            this.y += this.speed * this.direction;
            if (this.y > 400 || this.y < 50) {
                this.direction *= -1;
            }
        }, 1000 / 60);
    }
}