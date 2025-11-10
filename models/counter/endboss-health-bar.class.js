/**
 * Heads-Up Display element that displays the endboss's health as a 6-step bar.
 *
 * Extends {@link DrawableObject}.
 */
class EndbossHealthBar extends DrawableObject {

    /**
     * Sprite frames for the bar at 0/20/40/60/80/100 percent.
     * Index 0/1/2/3/4/5 corresponds to 0%, 20%, 40%, 60%, 80%, 100%.
     *
     * @type {string[]}
     */
    IMAGES_HEALT_BAR = [
        'assets/img/resource-display/progressbar-life-purple-0.png',
        'assets/img/resource-display/progressbar-life-purple-20.png',
        'assets/img/resource-display/progressbar-life-purple-40.png',
        'assets/img/resource-display/progressbar-life-purple-60.png',
        'assets/img/resource-display/progressbar-life-purple-80.png',
        'assets/img/resource-display/progressbar-life-purple-100.png'
    ];

    /**
     * Current progress value in percent (0–100).
     */
    percentage = 100;

    /**
     * Whether the bar is currently shown on the Heads-Up Display.
     */
    visible = false;

    /**
     * Creates the endboss health-bar Heads-Up Display element at a fixed position and initializes the sprites.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALT_BAR);
        this.x = 700;
        this.y = 0;
        this.height = 40;
        this.width = 140;
        this.setPercentage(100);
    }

    /**
     * Makes the health bar visible on the Heads-Up Display.
     *
     * @returns {void}
     */
    show() {
        this.visible = true;
    }

    /**
     * Sets the health percentage and updates the displayed frame.
     *
     * Also triggers the endboss defeat sequence once when the value reaches ≤ 15%.
     * The frame index is resolved with clamping to 0–100.
     *
     * @param {number} percentage - New health value in percent (0–100).
     * @returns {void}
     */
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

    /**
     * Maps the current (clamped) percentage to a frame index 0–5.
     * Clamps {@link EndbossHealthBar#percentage} into 0–100 before mapping.
     *
     * @returns {0|1|2|3|4|5} Frame index for {@link EndbossHealthBar#IMAGES_HEALT_BAR}.
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