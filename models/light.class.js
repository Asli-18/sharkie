class Light extends MovableObject {
    // assets/img/background/light-full.png
    x = 0;
    y = 0;
    width = 720;
    height = 580;

    constructor() {
        super().loadImage('assets/img/background/light-left.png');
        this.animate();
    }
}