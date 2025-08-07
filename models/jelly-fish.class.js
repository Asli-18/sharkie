class JellyFish extends MovableObject {
// 'assets/img/enemy/jelly-fish-lila-1.png'
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.width = 50;
        this.height = 50;
        this.x = 250 + Math.random() * 500;
        this.y = 30 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.28;
        this.animate();
    }
}