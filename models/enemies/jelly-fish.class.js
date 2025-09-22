class JellyFish extends MovableObject {
    width = 50;
    height = 50;
    speed = 0.05;
    direction = 1;
    isDead = false;
    energy = 15;
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

    DEAD_VARIANTS = {
        yellowGreen: [
            'assets/img/enemy/jelly-fish-dead-yellow-1.png',
            'assets/img/enemy/jelly-fish-dead-yellow-2.png',
            'assets/img/enemy/jelly-fish-dead-yellow-3.png',
            'assets/img/enemy/jelly-fish-dead-yellow-4.png',
            'assets/img/enemy/jelly-fish-dead-green-1.png',
            'assets/img/enemy/jelly-fish-dead-green-2.png',
            'assets/img/enemy/jelly-fish-dead-green-3.png',
            'assets/img/enemy/jelly-fish-dead-green-4.png'
        ],
        lilaPink: [
            'assets/img/enemy/jelly-fish-dead-lila-1.png',
            'assets/img/enemy/jelly-fish-dead-lila-2.png',
            'assets/img/enemy/jelly-fish-dead-lila-3.png',
            'assets/img/enemy/jelly-fish-dead-lila-4.png',
            'assets/img/enemy/jelly-fish-dead-pink-1.png',
            'assets/img/enemy/jelly-fish-dead-pink-2.png',
            'assets/img/enemy/jelly-fish-dead-pink-3.png',
            'assets/img/enemy/jelly-fish-dead-pink-4.png'
        ]
    }

    constructor(variant = "yellowGreen", world = null) {
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

    // setVariant(variant) {
    //     if (this.SWIMMING_VARIANTS[variant]) {
    //         this.images = this.SWIMMING_VARIANTS[variant];
    //     } 
    // }

    setRandomPosition() {
        this.x = 250 + Math.random() * 2500;
        this.y = 30 + Math.random() * 400;
    }

    setRandomSpeed() {
        this.speed = 0.05 + Math.random() * 0.1;
    }

    animate() {
        setInterval(() => super.animation(), 250);
        setInterval(() => this.move(), 1000 / 60);
        // setInterval(() => {
        //     if (this.isHurt()) {
        //         this.loadImages(this.DEAD_VARIANTS);
        //     }
        // }, 120
        // );
    }

    move() {
        this.y += this.speed * this.direction;
        if (this.y > 400 || this.y < 50) {
            this.direction *= -1;
        }
    }
}