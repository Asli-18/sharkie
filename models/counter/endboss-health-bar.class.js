class EndbossHealthBar extends DrawableObject {
    IMAGES_HEALT_BAR = [
        'assets/img/resource-display/progressbar-life-purple-0.png',
        'assets/img/resource-display/progressbar-life-purple-20.png',
        'assets/img/resource-display/progressbar-life-purple-40.png',
        'assets/img/resource-display/progressbar-life-purple-60.png',
        'assets/img/resource-display/progressbar-life-purple-80.png',
        'assets/img/resource-display/progressbar-life-purple-100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALT_BAR);
        this.x = 700;
        this.y = 0;
        this.height = 40;
        this.width = 140;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALT_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        if (this.percentage <= 15 && this.world && !this.endbossDefeated) {
            this.endbossDefeated = true;
            if (this.world.whale) {
                this.world.whale.die();
            }
            setTimeout(() => {
                this.world.showWinScreen();
            }, 3000);
        }
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