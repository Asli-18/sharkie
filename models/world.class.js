class World {
    lights = [
        new Light()
    ];

    backgrounds = [
        new Water(),
        new SeaBackground(),
        new Seabed()

    ];

    sharkie = new Sharkie();
    enemies = [
        new PufferFish(),
        new JellyFish(),
        new JellyFish(),
        new PufferFish(),
    ];

    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {


        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.addObjectsToMap(this.lights);
        // this.lights.forEach(light => {
        //     this.addToMap(light);
        // });
        this.addObjectsToMap(this.backgrounds);
        // this.backgrounds.forEach(background => {
        //     this.addToMap(background);
        // });
        this.addToMap(this.sharkie);

        this.addObjectsToMap(this.enemies);

        // this.enemies.forEach(enemy => {
        //     this.addToMap(enemy);
        // });


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
        this.ctx.drawImage(movebleObject.img, movebleObject.x, movebleObject.y, movebleObject.width, movebleObject.height);
    }

}