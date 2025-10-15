class PufferFish extends MovableObject {
    width = 50;
    height = 50;
    energy = 15;

    isDead = false;

    SWIMMING_VARIANTS = {
        salmonPink: [
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
        ],
        greenSalmon: [
            'assets/img/enemy/puffer-fish-swim-green-1.png',
            'assets/img/enemy/puffer-fish-swim-green-2.png',
            'assets/img/enemy/puffer-fish-swim-green-3.png',
            'assets/img/enemy/puffer-fish-swim-green-4.png',
            'assets/img/enemy/puffer-fish-swim-green-5.png',
            'assets/img/enemy/puffer-fish-transition-salmon-1.png',
            'assets/img/enemy/puffer-fish-transition-salmon-2.png',
            'assets/img/enemy/puffer-fish-transition-salmon-3.png',
            'assets/img/enemy/puffer-fish-transition-salmon-4.png',
            'assets/img/enemy/puffer-fish-transition-salmon-5.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-1.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-2.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-3.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-4.png',
            'assets/img/enemy/puffer-fish-bubbleswim-salmon-5.png',
            'assets/img/enemy/puffer-fish-transition-salmon-5.png',
            'assets/img/enemy/puffer-fish-transition-salmon-4.png',
            'assets/img/enemy/puffer-fish-transition-salmon-3.png',
            'assets/img/enemy/puffer-fish-transition-green-2.png',
            'assets/img/enemy/puffer-fish-transition-green-1.png',
        ],
        pinkGreen: [
            'assets/img/enemy/puffer-fish-swim-pink-1.png',
            'assets/img/enemy/puffer-fish-swim-pink-2.png',
            'assets/img/enemy/puffer-fish-swim-pink-3.png',
            'assets/img/enemy/puffer-fish-swim-pink-4.png',
            'assets/img/enemy/puffer-fish-swim-pink-5.png',
            'assets/img/enemy/puffer-fish-transition-green-1.png',
            'assets/img/enemy/puffer-fish-transition-green-2.png',
            'assets/img/enemy/puffer-fish-transition-green-3.png',
            'assets/img/enemy/puffer-fish-transition-green-4.png',
            'assets/img/enemy/puffer-fish-transition-green-5.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-1.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-2.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-3.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-4.png',
            'assets/img/enemy/puffer-fish-bubbleswim-green-5.png',
            'assets/img/enemy/puffer-fish-transition-green-5.png',
            'assets/img/enemy/puffer-fish-transition-green-4.png',
            'assets/img/enemy/puffer-fish-transition-green-3.png',
            'assets/img/enemy/puffer-fish-transition-pink-2.png',
            'assets/img/enemy/puffer-fish-transition-pink-1.png',
        ]
    }

    DEAD_VARIANTS = {
        salmonPink: [
            'assets/img/enemy/puffer-fish-dead-salmon-1.png',
            'assets/img/enemy/puffer-fish-dead-salmon-2.png',
            'assets/img/enemy/puffer-fish-dead-salmon-3.png'
        ],
        greenSalmon: [
            'assets/img/enemy/puffer-fish-dead-green-1.png',
            'assets/img/enemy/puffer-fish-dead-green-2.png',
            'assets/img/enemy/puffer-fish-dead-green-3.png'
        ],
        pinkGreen: [
            'assets/img/enemy/puffer-fish-dead-pink-1.png',
            'assets/img/enemy/puffer-fish-dead-pink-2.png',
            'assets/img/enemy/puffer-fish-dead-pink-3.png'
        ]
    }

    constructor(variant = "salmonPink", world = null) {
        super();
        this.world = world;
        this.variant = variant;
        this.init(variant);
    }

    init(variant) {
        super.setVariant(variant);
        this.loadImages(this.images);
        this.setRandomPosition();
        this.setRandomSpeed();
        this.animate();
    }

    setRandomPosition() {
        this.x = 200 + Math.random() * 1800;
        this.y = 30 + Math.random() * 400;
    }

    setRandomSpeed() {
        this.speed = 0.15 + Math.random() * 0.20;
    }

    animate() {
        setInterval(() => super.animation(), 250);
        setInterval(() => this.move(), 1000 / 60);
    }

    // animation() {
    //     let i = this.currentImage % this.images.length;
    //     let path = this.images[i];
    //     this.img = this.imageCache[path];
    //     this.currentImage++;
    // }

    move() {
        this.x -= this.speed;
    }
}

