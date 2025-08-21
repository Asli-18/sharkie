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
        // this.coinCounter = new CoinCounter(10, 40, 0);
        this.checkCollisions();
    }

    setWorld() {
        this.sharkie.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) =>{
                if(this.sharkie.isColliding(enemy)){
                    console.log('Collision with Sharkie ', enemy);
                    this.sharkie.hit(); 
                    console.log('Sharkie-Energy: ', this.sharkie.energy);
                    
                }
            });
        }, 200);
    }
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.backgrounds);
        this.addToMap(this.sharkie);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.level.coin);

        this.ctx.translate(-this.camera_x, 0);

        this.addObjectsToMap(this.level.progress);



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
            this.flipImage(movebleObject);
        }
        movebleObject.draw(this.ctx);
        movebleObject.drawFrame(this.ctx);
        if (movebleObject.otherDirection) {
            this.flipImageBack(movebleObject);
        }
    }

    flipImage(movebleObject) {
        this.ctx.save();
        this.ctx.translate(movebleObject.width, 0);
        this.ctx.scale(-1, 1);
        movebleObject.x = movebleObject.x * -1;
    }

    flipImageBack(movebleObject) {
        movebleObject.x = movebleObject.x * -1;
        this.ctx.restore();
    }


}