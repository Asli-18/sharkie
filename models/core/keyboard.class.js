/**
 * Input state for keyboard and on-screen touch controls.
 * Booleans represent the current "pressed" state of each action. 
 * Mobile buttons (by element id) set/reset these flags via touch events.
 */
class Keyboard {

    /** Move left key pressed. */
    LEFT = false;

    /** Move right key pressed. */
    RIGHT = false;

    /** Move up key pressed. */
    UP = false;

    /** Move down key pressed. */
    DOWN = false;

    /** Space/action key pressed (reserved/general). */
    SPACE = false;

    /** Air-bubble shoot key pressed (maps to 'W'). */
    W = false;

    /** Poison-bubble shoot key pressed (maps to 'E'). */
    E = false;

    /** Fin-slap melee attack key pressed (maps to 'F'). */
    F = false;

    /**
     * Fire-rate gate for air bubbles.
     * True means the next W-shot is allowed; set to false during cooldown.
     */
    canShootW = true;

    /**
     * Fire-rate gate for poison bubbles.
     * True means the next E-shot is allowed; set to false during cooldown.
     */
    canShootE = true;

    /**
     * Creates a keyboard/touch input state and binds touch listeners for the on-screen mobile controls.
     */
    constructor() {
        this.bindBtnPressEvents();
    }

    /**
     * Attaches touchstart/touchend handlers for all on-screen buttons.
     * Expects the corresponding elements (btn-left/right/up/down, etc.) to exist.
     * @returns {void}
     */
    bindBtnPressEvents() {
        this.handleTouchStart();
        this.handleTouchEnd();
    }

    /**
     * Registers touchstart handlers to set input flags to true while pressed.
     * Prevents default to avoid scrolling/zooming on mobile.
     * @returns {void}
     */
    handleTouchStart() {
        document.getElementById('btn-left').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btn-right').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btn-down').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.DOWN = true;
        });
        document.getElementById('btn-up').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.UP = true;
        });
        document.getElementById('btn-air-bubble').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.W = true;
        });
        document.getElementById('btn-poison-bubble').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.E = true;
        });
        document.getElementById('btn-fin-slap').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.F = true;
        });
    }

    /**
     * Registers touchend handlers to reset input flags to false when released.
     * Prevents default to avoid unwanted gestures on mobile.
     * @returns {void}
     */
    handleTouchEnd() {
        document.getElementById('btn-left').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btn-right').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btn-down').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.DOWN = false;
        });
        document.getElementById('btn-up').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.UP = false;
        });
        document.getElementById('btn-air-bubble').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.W = false;
        });
        document.getElementById('btn-poison-bubble').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.E = false;
        });
        document.getElementById('btn-fin-slap').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.F = false;
        });
    }
}
