class Sharkie extends MovableObject {
    IMAGES_SWING = [
        'assets/img/sharkie/sharkie-swim-1.png',
        'assets/img/sharkie/sharkie-swim-2.png',
        'assets/img/sharkie/sharkie-swim-3.png',
        'assets/img/sharkie/sharkie-swim-4.png',
        'assets/img/sharkie/sharkie-swim-5.png',
        'assets/img/sharkie/sharkie-swim-6.png'
    ];



    constructor() {
        super().loadImage('assets/img/sharkie/sharkie-swim-1.png');
        this.loadImages(this.IMAGES_SWING);
        this.animate();
    }

    animate() {
        setInterval(()=>{ 
        let i = this.currentImage % this.IMAGES_SWING.length;
        let path = this.IMAGES_SWING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 100);
    }

    swimUp() {

    }
}