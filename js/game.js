let canvas;
let world;
let keyboard = new Keyboard();
let AUDIO_OCEAN = new Audio('audio/ocean.mp3');
AUDIO_OCEAN.loop = true;
AUDIO_OCEAN.volume = 0.2;
let AUDIO_BUBBBLE = new Audio('audio/bubble_3.mp3')
let AUDIO_COIN = new Audio('audio/coin.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');
let AUDIO_SLAP = new Audio('audio/slap.mp3');
let AUDIO_SHARKIE_DAMAGE = new Audio('audio/sharkie-damage.mp3');
let AUDIO_WHALE_DAMAGE = new Audio('audio/whale-damage.mp3');
let AUDIO_DAMAGE = new Audio('audio/damage.mp3');
const body = document.body;
const toggleBtn = document.getElementById("toggle-mode");
const fullScreenBtn = document.getElementById('full-screen-btn');
const fullScreenMode = document.getElementById('full-screen-mode');
let audioMuted = true;
const audioBtn = document.getElementById('audio-btn');
const audioIcon = document.getElementById('audio-icon');
let autoplayArmed = false;
let wantsAudio = true;


/**
 * Initializes the game world and binds the canvas.
 * Creates a new {@link World} instance with the global keyboard state.
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Global keydown handler: sets movement/attack flags on the shared keyboard state.
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 87) {
        keyboard.W = true;
    }
    if (event.keyCode == 69) {
        keyboard.E = true;
    }
    if (event.keyCode == 70) {
        keyboard.F = true;
    }
});

/**
 * Global keyup handler: clears movement/attack flags and re-arms shot rate-limiters.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 87) {
        keyboard.W = false;
        keyboard.canShootW = true;
    }
    if (event.keyCode == 69) {
        keyboard.E = false;
        keyboard.canShootE = true;
    }
    if (event.keyCode == 70) {
        keyboard.F = false;
    }
});

/**
 * Toggles day/night CSS theme and updates the toggle icon.
 */
toggleBtn.addEventListener("click", () => {
    if (body.classList.contains("day")) {
        body.classList.remove("day");
        body.classList.add("night");
        toggleBtn.innerHTML = `<img class="size" src="./assets/icon/day-mode-icon.png"></img>`;
    } else {
        body.classList.remove("night");
        body.classList.add("day");
        toggleBtn.innerHTML = `<img class="size" src="./assets/icon/night-mode-icon.png" alt="">`;
    }
});

/**
 * Hides the start screen and cleans up a previous world instance if present.
 * Intended to be called when starting/restarting the game.
 * @returns {void}
 */
function gameStart() {
    const start = document.getElementById('start-screen');
    start.classList.add('d-none');
    if (window.world && typeof window.world.destroy === 'function') {
        window.world.destroy();
    }
}

/**
 * Fullscreen button handler: toggles fullscreen on/off.
 */
fullScreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        openFullScreen();
    } else {
        closeFullscreen();
    }
});

/**
 * Requests fullscreen mode for the main container.
 * @returns {void}
 */
function openFullScreen() {
    if (fullScreenMode.requestFullscreen) {
        fullScreenMode.requestFullscreen();
    } else if (fullScreenMode.mozRequestFullScreen) {
        fullScreenMode.mozRequestFullScreen();
    } else if (fullScreenMode.webkitRequestFullscreen) {
        fullScreenMode.webkitRequestFullscreen();
    } else if (fullScreenMode.msRequestFullscreen) {
        fullScreenMode.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 * @returns {void}
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
 * Updates the speaker icon to reflect the current mute state.
 * @returns {void}
 */
function updateAudioIcon() {
    if (audioIcon) {
        if (audioMuted === true) {
            audioIcon.src = './assets/icon/audio-muted-icon.png';
        } else {
            audioIcon.src = './assets/icon/audio-icon.png';
        }
    }
}

/**
 * Attempts to start the ocean ambience. If autoplay is blocked, the call will fail and the function returns false.
 * @returns {Promise<boolean>} True if playback started, else false.
 */
async function startOceanAudio() {
    try {
        AUDIO_OCEAN.load();
        await AUDIO_OCEAN.play();
        audioMuted = false;
        updateAudioIcon();
        return true;
    } catch (e) {
        audioMuted = true;
        updateAudioIcon();
        return false;
    }
}

/**
 * Arms a one-time user interaction (pointer/keyboard/touch) to trigger audio playback when autoplay is blocked.
 * @returns {void}
 */
function armFirstInteractionStart() {
    autoplayArmed = true;
    let events = ['pointerdown', 'keydown', 'touchstart'];
    function handler() {
        if (autoplayArmed === true && wantsAudio === true) {
            startOceanAudio().then(function (ok) {
                if (ok) {
                    autoplayArmed = false;
                    for (let i = 0; i < events.length; i++) {
                        window.removeEventListener(events[i], handler);
                    }
                }
            });
        } else {
            autoplayArmed = false;
            for (let j = 0; j < events.length; j++) {
                window.removeEventListener(events[j], handler);
            }
        }
    }
    for (let i = 0; i < events.length; i++) {
        window.addEventListener(events[i], handler, { once: true });
    }
}

/**
 * Returns true when a small portrait device is detected.
 * @returns {boolean}
 */
function isSmallPortrait() {
    return window.innerWidth <= 992 && window.innerHeight > window.innerWidth;
}

/**
 * Shows/hides the rotate-screen overlay depending on device orientation/size.
 * @returns {void}
 */
function updateOrientationOverlay() {
    const overlay = document.getElementById('rotate-screen-message');
    if (!overlay) return;
    overlay.classList.toggle('is-visible', isSmallPortrait());
}

/**
 * Bootstraps UI on initial DOM load: tries to start ocean audio, updates the speaker icon and updates the rotate-screen overlay.
 */
document.addEventListener('DOMContentLoaded', function () {
    startOceanAudio().then(function (ok) {
        if (!ok) {
            armFirstInteractionStart();
        } else {
            autoplayArmed = false;
        }
        updateAudioIcon();
    });
    updateOrientationOverlay();
});

/**
 * Recalculates orientation overlay on viewport resize.
 */
window.addEventListener('resize', updateOrientationOverlay);

/**
 * Recalculates orientation overlay on device orientation change.
 */
window.addEventListener('orientationchange', updateOrientationOverlay);


/**
 * Pauses ocean audio when the tab is hidden, resumes if unmuted and desired.
 */
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        AUDIO_OCEAN.pause();
    } else {
        if (audioMuted === false && wantsAudio === true) {
            AUDIO_OCEAN.play().catch(function () { });
        }
    }
});

/**
 * Audio button click handler: toggles mute state and (re)starts/pauses ambience.
 */
if (audioBtn) {
    audioBtn.addEventListener('click', function (ev) {
        if (audioMuted === true) {
            wantsAudio = true;
            startOceanAudio().then(function (ok) {
                if (ok) autoplayArmed = false;
            });
        } else {
            wantsAudio = false;
            AUDIO_OCEAN.pause();
            audioMuted = true;
            autoplayArmed = false;
            updateAudioIcon();
        }
    });
}

/**
 * Toggle visibility of overlay screens by id (start-screen, info-screen, privacy-policy-screen, legal-notice-screen).
 * @param {string} btnID - Element id of the screen wrapper to toggle.
 * @returns {void}
 */
function toggleScreens(btnID) {
    let btn = document.getElementById(btnID);
    btn.classList.toggle('d-none');
}

/**
 * Returns to the main menu: stops the current world, hides win/lose screens and shows the start screen.
 * @returns {void}
 */
function backToMenu() {
    if (window.world && typeof window.world.destroy === 'function') {
        window.world.destroy();
    }
    document.getElementById("lose-screen").classList.add("d-none");
    document.getElementById("win-screen").classList.add("d-none");
    document.getElementById("start-screen").classList.remove("d-none");
}