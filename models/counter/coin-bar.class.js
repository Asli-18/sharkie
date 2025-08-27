class CoinBar extends MovableObject {

    width = 45;
    height = 45;

    constructor(x, y, startCoins = 0) {
        super();

        this.x = x;
        this.y = y;
        this.coins = startCoins;
        console.log(startCoins);

        this.img = new Image();
        this.loadImage('assets/img/resource-display/coin-100.png');
  
    }

}