class Sharkie extends MovableObject {
    IMAGES_SWIMMING = [
        'assets/img/sharkie/sharkie-swim-1.png',
        'assets/img/sharkie/sharkie-swim-2.png',
        'assets/img/sharkie/sharkie-swim-3.png',
        'assets/img/sharkie/sharkie-swim-4.png',
        'assets/img/sharkie/sharkie-swim-5.png',
        'assets/img/sharkie/sharkie-swim-6.png'
    ];
    IMAGES_IDLE = [
        'assets/img/sharkie/sharkie-idle-1.png',
        'assets/img/sharkie/sharkie-idle-2.png',
        'assets/img/sharkie/sharkie-idle-3.png',
        'assets/img/sharkie/sharkie-idle-4.png',
        'assets/img/sharkie/sharkie-idle-5.png',
        'assets/img/sharkie/sharkie-idle-6.png',
        'assets/img/sharkie/sharkie-idle-7.png',
        'assets/img/sharkie/sharkie-idle-8.png',
        'assets/img/sharkie/sharkie-idle-9.png',
        'assets/img/sharkie/sharkie-idle-10.png',
        'assets/img/sharkie/sharkie-idle-11.png',
        'assets/img/sharkie/sharkie-idle-12.png',
        'assets/img/sharkie/sharkie-idle-13.png',
        'assets/img/sharkie/sharkie-idle-14.png',
        'assets/img/sharkie/sharkie-idle-15.png',
        'assets/img/sharkie/sharkie-idle-16.png',
        'assets/img/sharkie/sharkie-idle-17.png',
        'assets/img/sharkie/sharkie-idle-18.png'
    ];

    IMAGES_DEAD_ELECTRO_SHOCK = [
        'assets/img/sharkie/sharkie-dead-electro-shock-1.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-2.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-3.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-4.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-5.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-6.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-7.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-8.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-9.png',
        'assets/img/sharkie/sharkie-dead-electro-shock-10.png'
    ];

    IMAGES_HURT_POISONED = [
        'assets/img/sharkie/sharkie-hurt-poisoned-2.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-3.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-4.png',
        'assets/img/sharkie/sharkie-hurt-poisoned-5.png'
    ];
    IMAGES_SWIMMING = [
        'assets/img/sharkie/sharkie-swim-1.png',
        'assets/img/sharkie/sharkie-swim-2.png',
        'assets/img/sharkie/sharkie-swim-3.png',
        'assets/img/sharkie/sharkie-swim-4.png',
        'assets/img/sharkie/sharkie-swim-5.png',
        'assets/img/sharkie/sharkie-swim-6.png'
    ];
    speed = 4;
    world;


    constructor() {
        super().loadImage('assets/img/sharkie/sharkie-swim-1.png');
        this.loadImages(this.IMAGES_SWIMMING);
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.swimRight();
            }
            if (this.world.keyboard.LEFT && this.x > -1000) {
                this.swimLeft();
            }
            if (this.world.keyboard.UP && this.y > -45) {
                this.swimUp();
            }
            if (this.world.keyboard.DOWN && this.y < 320) {
                this.swimDown();
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                let i = this.currentImage % this.IMAGES_SWIMMING.length;
                let path = this.IMAGES_SWIMMING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 120);
    }


}