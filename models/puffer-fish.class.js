class PufferFish extends MovableObject {
    // IMAGES_SWING = [
    //     'assets/img/enemy/puffer-fisch-swim-green-1.png',
    //     'assets/img/enemy/puffer-fisch-swim-green-2.png',
    //     'assets/img/enemy/puffer-fisch-swim-green-3.png',
    //     'assets/img/enemy/puffer-fisch-swim-green-4.png',
    //     'assets/img/enemy/puffer-fisch-swim-green-5.png',
    //     'assets/img/enemy/puffer-fisch-swim-green-6.png'
    // ];

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.width = 50;
        this.height = 50;
        this.x = 200 + Math.random() * 500;
        this.y = 30 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    // animate() {
    //     setInterval(() => {
    //         let i = this.currentImage % this.IMAGES_SWING.length;
    //         let path = this.IMAGES_SWING[i];
    //         this.img = this.imageCache[path];
    //         this.currentImage++;
    //     }, 100);
    // }

}

