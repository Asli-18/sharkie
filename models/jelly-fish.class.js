class JellyFish extends MovableObject {
    width = 50;
    height = 50;
    IMAGES_SWIMMING = [
        'assets/img/enemy/jelly-fish-lila-1.png',
        'assets/img/enemy/jelly-fish-lila-2.png',
        'assets/img/enemy/jelly-fish-lila-3.png',
        'assets/img/enemy/jelly-fish-lila-4.png'
    ];

    // 'assets/img/enemy/jelly-fish-lila-1.png'
    constructor() {
        super().loadImage('assets/img/enemy/jelly-fish-lila-1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.x = 250 + Math.random() * 500;
        this.y = 30 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.28;
        this.animate();
    }
}