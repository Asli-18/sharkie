class World {
    level = level_one;
    sharkie = new Sharkie();

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

        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.backgrounds);
        this.addToMap(this.sharkie);
        this.addObjectsToMap(this.level.enemies);

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
        if (!movebleObject.img) {
            console.warn("Fehler: Object ohne gültigem img:", movebleObject);
            return; 
        }
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