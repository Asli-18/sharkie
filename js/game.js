let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log("My Character is ", world.sharkie);


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


const body = document.body;
const toggleBtn = document.getElementById("toggle-mode");

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
    let start = document.getElementById('start-screen');
    start.classList.add('d-none');
}
const fullScreenBtn = document.getElementById('full-screen-btn');
const fullScreenMode = document.getElementById('full-screen-mode');

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

function toggleInfoScreen() {
    const infoBtn = document.getElementById('info-screen-wrapper');
    infoBtn.classList.toggle('d-none');
}

function backToMenu() {
    document.getElementById("lose-screen").classList.add("d-none");
    document.getElementById("start-screen").classList.remove("d-none");
}