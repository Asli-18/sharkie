class PoisonFlask extends MovableObject {
    width = 40;
    height = 40;
    IMAGES = [ //assets\img\resource-display\poisoned-bubble-bottle-1.png
        'assets/img/resource-display/poisoned-bubble-bottle-1.png',
        'assets/img/resource-display/poisoned-bubble-bottle-2.png',
        'assets/img/resource-display/poisoned-bubble-bottle-3.png',
        'assets/img/resource-display/poisoned-bubble-bottle-4.png',
        'assets/img/resource-display/poisoned-bubble-bottle-5.png',
        'assets/img/resource-display/poisoned-bubble-bottle-6.png',
        'assets/img/resource-display/poisoned-bubble-bottle-7.png',
        'assets/img/resource-display/poisoned-bubble-bottle-8.png'
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
    }
}