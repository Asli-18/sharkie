class CoinBar extends DrawableObject {
    IMAGES_COIN_BAR = [
        'assets/img/resource-display/progressbar-coin-green-0.png',
        'assets/img/resource-display/progressbar-coin-green-20.png',
        'assets/img/resource-display/progressbar-coin-green-40.png',
        'assets/img/resource-display/progressbar-coin-green-60.png',
        'assets/img/resource-display/progressbar-coin-green-80.png',
        'assets/img/resource-display/progressbar-coin-green-100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_BAR);
        this.x = 10;
        this.y = 40;
        this.height = 40;
        this.width = 140;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        percentage = Math.max(0, Math.min(100, percentage | 0));
        this.percentage = percentage;
        const idx = this.resolveImageIndex(percentage);
        const path = this.IMAGES_COIN_BAR[idx];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}