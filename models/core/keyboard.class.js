class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    W = false;
    E = false;
    F = false;

    // key limit to fire only one bubble
    canShootW = true;
    canShootE = true;

    constructor() {
        this.bindBtnPressEvents();
    }

    bindBtnPressEvents() {
        document.getElementById('btn-left').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btn-left').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btn-right').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btn-right').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btn-down').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.DOWN = true;
        });
        document.getElementById('btn-down').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.DOWN = false;
        });
        document.getElementById('btn-up').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.UP = true;
        });
        document.getElementById('btn-up').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.UP = false;
        });

        document.getElementById('btn-air-bubble').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.W = true;
        });
        document.getElementById('btn-air-bubble').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.W = false;
        });
        document.getElementById('btn-poison-bubble').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.E = true;
        });
        document.getElementById('btn-poison-bubble').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.E = false;
        });
        document.getElementById('btn-fin-slap').addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.F = true;
        });
        document.getElementById('btn-fin-slap').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.F = false;
        });
    }
}