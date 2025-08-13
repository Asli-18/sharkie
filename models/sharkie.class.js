class Sharkie extends MovableObject {
    IMAGES_SWING = [
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
        this.loadImages(this.IMAGES_SWING);
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                console.log("x koordinate: ", this.x);
            }
            if (this.world.keyboard.LEFT && this.x > -1000) {
                this.x -= this.speed;
                this.otherDirection = true;
                console.log("x koordinate: ", this.x);
            }
            this.world.camera_x = -this.x + 50;
        }, 1000 / 60);
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.x += this.speed;

                let i = this.currentImage % this.IMAGES_SWING.length;
                let path = this.IMAGES_SWING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    swimUp() {

    }
}