/**
 * Heads-Up Display element that displays the character's poison flask bar.
 *
 * Extends {@link DrawableObject}.
 */
class PoisonFlaskBar extends DrawableObject {

    /**
     * Sprite frames for the bar at 0/20/40/60/80/100 percent.
     * Index 0/1/2/3/4/5 corresponds to 0%, 20%, 40%, 60%, 80%, 100%.
     *
     * @type {string[]}
     */
    IMAGES_POISON_FLASK_BAR = [
        'assets/img/resource-display/progressbar-poisoned-bubble-green-0.png',
        'assets/img/resource-display/progressbar-poisoned-bubble-green-20.png',
        'assets/img/resource-display/progressbar-poisoned-bubble-green-40.png',
        'assets/img/resource-display/progressbar-poisoned-bubble-green-60.png',
        'assets/img/resource-display/progressbar-poisoned-bubble-green-80.png',
        'assets/img/resource-display/progressbar-poisoned-bubble-green-100.png'
    ];

    /**
     * Current progress value in percent (0–100).
     */
    percentage = 0;

    /**
     * Creates the poison-flask Heads-Up Display bar at a fixed position and initializes the sprites.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_POISON_FLASK_BAR);
        this.x = 10;
        this.y = 80;
        this.height = 40;
        this.width = 140;
        this.setPercentage(0);
    }

    /**
     * Sets the poison percentage and updates the displayed frame.
     *
     * Clamps the value to the range 0–100 before mapping to a frame.
     * @param {number} percentage - New poison value in percent (0–100).
     */
    setPercentage(percentage) {
        percentage = Math.max(0, Math.min(100, percentage | 0));
        this.percentage = percentage;
        const idx = this.resolveImageIndex(percentage);
        const path = this.IMAGES_POISON_FLASK_BAR[idx];
        this.img = this.imageCache[path];
    }

    /**
     * Maps the current (already clamped) percentage to a frame index 0–5.
     * Expects {@link PoisonFlaskBar#percentage} to be within 0–100.
     *
     * @returns {0|1|2|3|4|5} Frame index for {@link PoisonFlaskBar#IMAGES_POISON_FLASK_BAR}.
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