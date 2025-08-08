class World {
    lights = level_one.lights;
    backgrounds = level_one.backgrounds;
    sharkie = new Sharkie();
    enemies = level_one.enemies;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.sharkie.world = this;
    }
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.lights);
        this.addObjectsToMap(this.backgrounds);
        this.addToMap(this.sharkie);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);

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
        if (movebleObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movebleObject.width, 0);
            this.ctx.scale(-1, 1);
            movebleObject.x = movebleObject.x * -1;
        }
        this.ctx.drawImage(movebleObject.img, movebleObject.x, movebleObject.y, movebleObject.width, movebleObject.height);
        if (movebleObject.otherDirection) {
            movebleObject.x = movebleObject.x * -1;
            this.ctx.restore();
        }
    }

}