class World {
    sharkie = new Sharkie(this);
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    poisonFlaskBar = new PoisonFlaskBar();
    endbossHealthbar = new EndbossHealthBar();
    airBubbles = [];
    poisonBubbles = [];
    gameOver = false;
    collisionInterval = null;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = createLevelOne();
        this.intervals = [];
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.sharkie.world = this;
        this.healthBar.world = this;
        this.coinBar.world = this;
        this.poisonFlaskBar.world = this;
        this.endbossHealthbar.world = this;
        this.whale = this.level.enemies.find(enemy => enemy instanceof Whale);
        this.level.enemies.forEach(enemy => { enemy.world = this; });
        this.airBubbles.forEach(bubble => bubble.world = this);
        this.poisonBubbles.forEach(bubble => bubble.world = this);
    }

    run() {
        let mainInterval = setInterval(() => {
            if (this.gameOver) return;
            this.checkCollisionEnemies();
            this.checkCollisionCoins();
            this.checkCollisionPoisonFlasks();
            this.checkAirBubbles();
            this.checkPoisonBubbles();
            this.checkCollisionAirBubbles();
            this.checkCollisionPoisonBubbles();
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Whale) {
                    enemy.update(this.sharkie);
                }
            });
        }, 200);

        this.intervals.push(mainInterval);
    }

    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.sharkie.isColliding(enemy)) {
                console.log('Collision with Enemy: ', enemy);
                if (enemy instanceof JellyFish) {
                    this.sharkie.hit(5, 'electric');
                } else if (enemy instanceof PufferFish) {
                    this.sharkie.hit(5, 'poisoned');
                } else if (enemy instanceof Whale) {
                    this.sharkie.hit(10, 'poisoned');
                } else {
                    this.sharkie.hit(5, 'poisoned');
                }
                console.log('Sharkie-Energy: ', this.sharkie.energy);
                this.healthBar.setPercentage(this.sharkie.energy);
            }
        });
    }

    checkCollisionCoins() {
        this.level.coin.forEach((coin, index) => {
            if (this.sharkie.isColliding(coin) && this.coinBar.percentage < 100) {
                console.log('Sharkie collected coin');
                AUDIO_COIN.currentTime = 0;
                AUDIO_COIN.play();
                AUDIO_COIN.volume = 0.1;
                this.sharkie.coin++;
                // 1 Coin = 5 %
                let percentage = this.sharkie.coin * 5;
                if (percentage > 100) percentage = 100;
                this.coinBar.setPercentage(percentage);
                this.level.coin.splice(index, 1);
            }
        });
    }

    checkCollisionPoisonFlasks() {
        this.level.poison_flask.forEach((flask, index) => {
            if (this.sharkie.isColliding(flask) && this.poisonFlaskBar.percentage < 100) {
                console.log('Sharkie collected poison flask');
                AUDIO_BOTTLE.currentTime = 0;
                AUDIO_BOTTLE.play();
                AUDIO_BOTTLE.volume = 0.09;
                this.level.poison_flask.splice(index, 1);
                let percentage = this.poisonFlaskBar.percentage + 5;
                if (percentage > 100) percentage = 100;
                this.poisonFlaskBar.setPercentage(percentage);
            }
        });
    }

    checkAirBubbles() {
        if (this.keyboard.W && this.keyboard.canShootW) {
            this.keyboard.canShootW = false;
            this.sharkie.shootBubble(() => {
                this.spawnBubble("air");
                setTimeout(() => this.keyboard.canShootW = true, 300);
            });
        }
    }

    checkPoisonBubbles() {
        if (this.keyboard.E && this.keyboard.canShootE && this.poisonFlaskBar.percentage >= 5) {
            this.keyboard.canShootE = false;
            this.sharkie.shootBubble(() => {
                this.spawnBubble("poison");

                let percentage = this.poisonFlaskBar.percentage - 5;
                if (percentage < 0) percentage = 0;
                this.poisonFlaskBar.setPercentage(percentage);

                setTimeout(() => this.keyboard.canShootE = true, 300);
            });
        } else if (this.keyboard.E && this.keyboard.canShootE) {
            console.log("Nicht genug Poison-Energie, um Bubble zu schießen", this.poisonFlaskBar.percentage);
        }
    }

    spawnBubble(type) {
        if (this.sharkie.otherDirection) {
            this.sharkie.otherDirection = false;
            console.log("Sharkie darf nicht nach links schießen -> automatisch nach rechts gedreht");
        }
        if (type === "air") {
            const airBubble = new AirBubbles(this.sharkie.x + 180, this.sharkie.y + 90);
            this.airBubbles.push(airBubble);
        }
        if (type === "poison") {
            if (this.shouldDisplayPoisonFlaskBar()) {
                const poisonBubble = new PoisonBubbles(this.sharkie.x + 180, this.sharkie.y + 90);
                this.poisonBubbles.push(poisonBubble);
                this.sharkie.world.poisonFlaskBar.setPercentage(this.sharkie.world.poisonFlaskBar.percentage - 10);
            }
        }
    }

    shouldDisplayPoisonFlaskBar() {
        const world = this.sharkie.world;
        return world &&
            Array.isArray(world.poisonBubbles) &&
            world.poisonFlaskBar &&
            world.poisonFlaskBar.percentage > 0;
    }

    checkCollisionAirBubbles() {
        this.airBubbles.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bubble.isColliding(enemy)) {
                    if (enemy instanceof Whale) {

                        enemy.takeDamage(1);
                    } else {
                        AUDIO_DAMAGE.play();
                        AUDIO_DAMAGE.volume = 0.1;
                        enemy.die();
                    }
                    this.airBubbles.splice(bubbleIndex, 1);
                }
            });
        });
    }

    checkCollisionPoisonBubbles() {
        this.poisonBubbles.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isColliding(enemy)) {
                    if (enemy instanceof Whale) {
                        enemy.takeDamage(10);
                    } else {
                        AUDIO_DAMAGE.play();
                        AUDIO_DAMAGE.volume = 0.1;
                        enemy.die();
                    }
                    this.poisonBubbles.splice(bubbleIndex, 1);
                }
            });
        });
    }

    draw() {
        if (this.gameOver) return;
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
        if (this.endbossHealthbar.visible) {
            this.addToMap(this.endbossHealthbar);
        }
        let self = this;
        this.animationFrameId = requestAnimationFrame(function () {
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
    stopIntervals() {
        if (Array.isArray(this.intervals)) {
            this.intervals.forEach(id => clearInterval(id));
            this.intervals = [];
        }
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    destroy() {
        this.gameOver = true;
        this.stopIntervals();
        if (this.sharkie && typeof this.sharkie.stopIntervals === 'function') {
            this.sharkie.stopIntervals();
        }
        if (this.level && Array.isArray(this.level.enemies)) {
            this.level.enemies.forEach(enemy => {
                if (enemy && typeof enemy.stopIntervals === 'function') {
                    enemy.stopIntervals();
                }
            });
        }
        const stopBubbleArray = (arr) => {
            if (Array.isArray(arr)) {
                arr.forEach(b => {
                    if (b && typeof b.stopIntervals === 'function') {
                        b.stopIntervals();
                    }
                });
                arr.length = 0;
            }
        };
        stopBubbleArray(this.airBubbles);
        stopBubbleArray(this.poisonBubbles);
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    showLoseScreen() {
        this.gameOver = true;
        // this.stopIntervals();
        // this.sharkie.stopIntervals();
        // this.level.enemies.forEach(enemy => {
        //     if (enemy.stopIntervals) enemy.stopIntervals();
        // });
        document.getElementById("lose-screen").classList.remove("d-none");
    }

    showWinScreen() {
        this.gameOver = true;
        // this.stopIntervals();
        // this.sharkie.stopIntervals();
        // this.level.enemies.forEach(enemy => {
        //     if (enemy.stopIntervals) enemy.stopIntervals();
        // });
        document.getElementById("win-screen").classList.remove("d-none");
    }
}