/**
 * Heads-Up Display element that displays the player's collected coin progress as a 6-step bar.
 * 
 * Extends {@link DrawableObject}.
 */
class CoinBar extends DrawableObject {

    /**
     * Sprite frames for the bar at 0/20/40/60/80/100 percent.
     * Index 0/1/2/3/4/5 corresponds to 0%, 20%, 40%, 60%, 80%, 100%.
     * @type {string[]}
     */
    IMAGES_COIN_BAR = [
        'assets/img/resource-display/progressbar-coin-green-0.png',
        'assets/img/resource-display/progressbar-coin-green-20.png',
        'assets/img/resource-display/progressbar-coin-green-40.png',
        'assets/img/resource-display/progressbar-coin-green-60.png',
        'assets/img/resource-display/progressbar-coin-green-80.png',
        'assets/img/resource-display/progressbar-coin-green-100.png'
    ];

    /** 
     * Current progress value in percent (0–100). 
     */
    percentage = 0;

    /**
     * Creates a new {@link CoinBar} at a fixed Heads-Up Display position and initializes the sprite.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_BAR);
        this.x = 10;
        this.y = 40;
        this.height = 40;
        this.width = 140;
        this.setPercentage(0);
    }

    /**
     * Updates the progress percentage and switches the sprite to the matching step.
     * Value is clamped to 0–100 and floored to an integer.
     * 
     * @param {number} percentage - New progress value in percent.
     * @returns {void}
     */
    setPercentage(percentage) {
        percentage = Math.max(0, Math.min(100, percentage | 0));
        this.percentage = percentage;
        const idx = this.resolveImageIndex(percentage);
        const path = this.IMAGES_COIN_BAR[idx];
        this.img = this.imageCache[path];
    }

    /**
     * Maps the current {@link CoinBar#percentage} to a frame index.
     * Thresholds: 0, 20, 40, 60, 80, 100.
     *
     * @returns {0|1|2|3|4|5} Frame index for {@link CoinBar#IMAGES_COIN_BAR}.
     */
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