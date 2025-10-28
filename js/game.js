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
const audioBtn = document.getElementById('audio-btn');
const audioIcon = document.getElementById('audio-icon');
let audioMuted = false;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log("My Character is ", world.sharkie);

    // AUDIO_OCEAN.play();
}

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
    // console.log(event);
    // console.log("TRUE");

});

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
    // console.log(event);
});

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

function gameStart() {
    const start = document.getElementById('start-screen');
    start.classList.add('d-none');
    if (window.world && typeof window.world.destroy === 'function') {
        window.world.destroy();
    }
}


fullScreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        openFullScreen();
    } else {
        closeFullscreen();
    }
});

function openFullScreen() {
    if (fullScreenMode.requestFullscreen) {
        fullScreenMode.requestFullscreen();
    } else if (fullScreenMode.mozRequestFullScreen) {
        // Firefox
        fullScreenMode.mozRequestFullScreen();
    } else if (fullScreenMode.webkitRequestFullscreen) {
        // Chrome, Safari & Opera
        fullScreenMode.webkitRequestFullscreen();
    } else if (fullScreenMode.msRequestFullscreen) {
        // IE/Edge
        fullScreenMode.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        // Chrome, Safari & Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
    }
}

audioBtn.addEventListener('click', () => {
    if (audioMuted) {
        AUDIO_OCEAN.play();
        audioIcon.src = './assets/icon/audio-icon.png';
        audioMuted = false;
    } else {
        AUDIO_OCEAN.pause();
        audioIcon.src = './assets/icon/audio-muted-icon.png';
        audioMuted = true;
    }
});

function toggleInfoScreen() {
    const infoBtn = document.getElementById('info-screen-wrapper');
    infoBtn.classList.toggle('d-none');
}

function backToMenu() {
    if (window.world && typeof window.world.destroy === 'function') {
        window.world.destroy();
    }
    document.getElementById("lose-screen").classList.add("d-none");
    document.getElementById("win-screen").classList.add("d-none");
    document.getElementById("start-screen").classList.remove("d-none");
}
