class HealthCounter extends DrawableObject {
    IMAGES_HEALT_BAR = [
        'assets/img/resource-display/progressbar-life-green-0.png',
        'assets/img/resource-display/progressbar-life-green-20.png',
        'assets/img/resource-display/progressbar-life-green-40.png',
        'assets/img/resource-display/progressbar-life-green-60.png',
        'assets/img/resource-display/progressbar-life-green-80.png',
        'assets/img/resource-display/progressbar-life-green-100.png'
    ];

    percentage = 100;

    constructor() {
        super().loadImages(this.IMAGES_HEALT_BAR);
        this.x = 10;
        this.y = 0;
        this.height = 50;
        this.width = 150;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALT_BAR[this.resolveImageIndex()];
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