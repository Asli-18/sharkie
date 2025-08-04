class PufferFish extends MovableObject {

    constructor(){
        super().loadImage('assets/img/enemy/puffer-fish-bubbleswim-green-1.png');
        this.x = 200 + Math.random() * 500;
    }

}