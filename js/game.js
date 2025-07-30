let canvas;
let ctx;

let world = new World();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    console.log("My Character is ", world.sharkie);
    
    // character.src = '../img/1.Sharkie/3.Swim/1.png';


    // ctx.drawImage(character, 20, 20, 150, 130);


}