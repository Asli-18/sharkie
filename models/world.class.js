class World {
    lights = [
        new Light()
    ];

    backgrounds = [
        new Water(),
        new SeaBackground(),
        new Seabed(),
        new Light()

    ];

    sharkie = new Sharkie();
    enemies = [
        new JellyFish('assets/img/enemy/jelly-fish-green-1.png'),
        new JellyFish('assets/img/enemy/jelly-fish-pink-1.png'),
        new PufferFish('assets/img/enemy/puffer-fish-swim-green-1.png'),
        new JellyFish('assets/img/enemy/jelly-fish-lila-1.png'),
        new JellyFish('assets/img/enemy/jelly-fish-yellow-1.png'),
        new PufferFish('assets/img/enemy/puffer-fish-swim-salmon-1.png'),
        new PufferFish('assets/img/enemy/puffer-fish-swim-salmon-1.png'),
        new PufferFish('assets/img/enemy/puffer-fish-swim-pink-1.png')
    ];

    canvas;
    ctx;
    keyboard;
    camera_x = -100;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.sharkie.world = this;
    }
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.addObjectsToMap(this.lights);
        this.addObjectsToMap(this.backgrounds);
        this.addToMap(this.sharkie);
        this.addObjectsToMap(this.enemies);
        
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movebleObject) {
        if(movebleObject.otherDirection){
            this.ctx.save();
            this.ctx.translate(movebleObject.width, 0);
            this.ctx.scale(-1, 1);
            movebleObject.x = movebleObject.x * -1;
        }
        this.ctx.drawImage(movebleObject.img, movebleObject.x, movebleObject.y, movebleObject.width, movebleObject.height);
        if(movebleObject.otherDirection){
             movebleObject.x = movebleObject.x * -1;
            this.ctx.restore();
        }
    }

}