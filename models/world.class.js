class World {
    sharkie = new Sharkie(this);
    level = level_one;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    poisonFlaskBar = new PoisonFlaskBar();
    airBubbles = [];
    poisonBubbles = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.sharkie.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBubbles();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.sharkie.isColliding(enemy)) {
                console.log('Collision with Enemy: ', enemy);
                this.sharkie.hit();
                console.log('Sharkie-Energy: ', this.sharkie.energy);
                this.healthBar.setPercentage(this.sharkie.energy);
            }
        });
        this.level.coin.forEach((coin, index) => {
            if (this.sharkie.isColliding(coin) && this.coinBar.percentage < 100) {
                console.log('Sharkie collected coin');
                this.sharkie.coin++;
                // 1 Coin = 5 %
                let percentage = this.sharkie.coin * 5;
                if (percentage > 100) percentage = 100;
                this.coinBar.setPercentage(percentage);
                this.level.coin.splice(index, 1);
            }
        });
        this.level.poison_flask.forEach((flask, index) => {
            if (this.sharkie.isColliding(flask) && this.poisonFlaskBar.percentage < 100) {
                console.log('Sharkie collected poison flask');
                this.sharkie.poison++;
                // 1 Flasche = 5 %
                let percentage = this.sharkie.poison * 5;
                if (percentage > 100) percentage = 100;
                this.poisonFlaskBar.setPercentage(percentage);
                this.level.poison_flask.splice(index, 1);
            }
        });
    }

    checkBubbles() {
        if (this.keyboard.W) {
            let air_bubbles = new AirBubbles(this.sharkie.x + 200, this.sharkie.y + 100);
            this.airBubbles.push(air_bubbles);
        }
        if (this.keyboard.E) {
            let poison_bubbles = new PoisonBubbles(this.sharkie.x + 200, this.sharkie.y + 100);
            this.poisonBubbles.push(poison_bubbles);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);


        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.backgrounds);


        // this.ctx.translate(-this.camera_x, 0);
        // this.addToMap(this.healthBar);
        // this.ctx.translate(this.camera_x, 0);


        this.addToMap(this.sharkie);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.poison_flask);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.airBubbles);
        this.addObjectsToMap(this.poisonBubbles);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonFlaskBar);

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
        // movebleObject.drawHitbox(this.ctx);
        movebleObject.drawCollisionBorder(this.ctx);
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