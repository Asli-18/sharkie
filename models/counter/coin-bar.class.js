class CoinBar extends DrawableObject {
    IMAGES_COIN_BAR = [
        'assets/img/resource-display/progressbar-coin-green-0.png',
        'assets/img/resource-display/progressbar-coin-green-20.png',
        'assets/img/resource-display/progressbar-coin-green-40.png',
        'assets/img/resource-display/progressbar-coin-green-60.png',
        'assets/img/resource-display/progressbar-coin-green-80.png',
        'assets/img/resource-display/progressbar-coin-green-100.png'
    ];

    percentage = 100;

    constructor() {
        super().loadImages(this.IMAGES_COIN_BAR);
        this.x = 10;
        this.y = 40;
        this.height = 40;
        this.width = 140;
        this.setPercentage(0);
    }
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}