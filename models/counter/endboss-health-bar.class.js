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
    visible = false;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALT_BAR);
        this.x = 700;
        this.y = 0;
        this.height = 40;
        this.width = 140;
        this.setPercentage(100);
    }
    show() { 
        this.visible = true; 
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
        let percentage = this.percentage;
        if (percentage < 0) {
            percentage = 0;
        } else if (percentage > 100) {
            percentage = 100;
        }

        if (percentage === 0) {
            return 0;
        } else if (percentage <= 20) {
            return 1;
        } else if (percentage <= 40) {
            return 2;
        } else if (percentage <= 60) {
            return 3;
        } else if (percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}