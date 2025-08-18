class Whale extends MovableObject {
    x = 2600;
    y = 0;
    width = 350;
    height = 350;
    IMAGES_INTRODUCE = [
        'assets/img/enemy/monster-whale-introduce-1.png',
        'assets/img/enemy/monster-whale-introduce-2.png',
        'assets/img/enemy/monster-whale-introduce-3.png',
        'assets/img/enemy/monster-whale-introduce-4.png',
        'assets/img/enemy/monster-whale-introduce-5.png',
        'assets/img/enemy/monster-whale-introduce-6.png',
        'assets/img/enemy/monster-whale-introduce-7.png',
        'assets/img/enemy/monster-whale-introduce-8.png',
        'assets/img/enemy/monster-whale-introduce-9.png',
        'assets/img/enemy/monster-whale-introduce-10.png',
    ];
    IMAGES_FLOATING = [
        'assets/img/enemy/monster-whale-floating-1.png',
        'assets/img/enemy/monster-whale-floating-2.png',
        'assets/img/enemy/monster-whale-floating-3.png',
        'assets/img/enemy/monster-whale-floating-4.png',
        'assets/img/enemy/monster-whale-floating-5.png',
        'assets/img/enemy/monster-whale-floating-6.png',
        'assets/img/enemy/monster-whale-floating-7.png',
        'assets/img/enemy/monster-whale-floating-8.png',
        'assets/img/enemy/monster-whale-floating-9.png',
        'assets/img/enemy/monster-whale-floating-10.png',
        'assets/img/enemy/monster-whale-floating-11.png',
        'assets/img/enemy/monster-whale-floating-12.png',
        'assets/img/enemy/monster-whale-floating-13.png'
    ];


    constructor(imagePath = 'assets/img/enemy/monster-whale-introduce-1.png') {
        super().loadImage(imagePath);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        // this.x = 250 + Math.random() * 500;
        // this.y = 30 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.28;
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_INTRODUCE.length;
            let path = this.IMAGES_INTRODUCE[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 100);
    }
}