/**
 * Heads-Up Display element that displays the character's health bar.
 *
 * Extends {@link DrawableObject}.
 */
class HealthBar extends DrawableObject {

    /**
     * Sprite frames for the bar at 0/20/40/60/80/100 percent.
     * Index 0/1/2/3/4/5 corresponds to 0%, 20%, 40%, 60%, 80%, 100%.
     *
     * @type {string[]}
     */
    IMAGES_HEALT_BAR = [
        'assets/img/resource-display/progressbar-life-green-0.png',
        'assets/img/resource-display/progressbar-life-green-20.png',
        'assets/img/resource-display/progressbar-life-green-40.png',
        'assets/img/resource-display/progressbar-life-green-60.png',
        'assets/img/resource-display/progressbar-life-green-80.png',
        'assets/img/resource-display/progressbar-life-green-100.png'
    ];

    /**
     * Current progress value in percent (0–100).
     */
    percentage = 100;

    /**
     * Creates the health-bar Heads-Up Display element at a fixed position and initializes the sprites.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALT_BAR);
        this.x = 10;
        this.y = 0;
        this.height = 40;
        this.width = 140;
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage and updates the displayed frame.
     *
     * The value will be clamped to 0–100 when resolving the frame.
     * @param {number} percentage - New health value in percent (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALT_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        // console.log("HealthBar Percentage:", this.percentage);
    }

    /**
     * Maps the current (clamped) percentage to a frame index 0–5.
     * Expects {@link HealthBar#percentage} and clamps it into 0–100 before mapping.
     *
     * @returns {0|1|2|3|4|5} Frame index for {@link HealthBar#IMAGES_HEALT_BAR}.
     */
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