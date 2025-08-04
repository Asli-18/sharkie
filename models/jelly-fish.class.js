class JellyFish extends MovableObject {

    constructor(){
        super().loadImage('assets/img/enemy/jelly-fish-lila-1.png');
        this.x = 250 + Math.random() * 500;
    }
}