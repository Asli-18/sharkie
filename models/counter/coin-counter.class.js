class CoinCounter extends MovableObject{
    x = 0;
    y = 0;
    width = 45;
    height = 45;


    constructor(x, y) {
        super().loadImage('assets/img/resource-display/coin-100.png');
        this.x = x;
        this.y = y;
 
    }
}