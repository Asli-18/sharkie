/**
 * The game world: holds the current level, player (Sharkie), Heads-Up Display bars, projectiles, camera, update loop, rendering, and collision handling.
 */
class World {
    /** Player character instance. */
    sharkie = new Sharkie(this);
    /** Active level data, for example, terrain, enemies, and collectibles. */
    level;
    /** Canvas element used for rendering. */
    canvas;
    /** 2D drawing context obtained from the canvas. */
    ctx;
    /** Keyboard input state object. */
    keyboard;
    /** Camera offset on the X axis. */
    camera_x = 0;
    /** Heads-Up Display health bar. */
    healthBar = new HealthBar();
    /** Heads-Up Display coin progress bar. */
    coinBar = new CoinBar();
    /** Heads-Up Display poison-flask progress bar. */
    poisonFlaskBar = new PoisonFlaskBar();
    /** Heads-Up Display endboss health bar. */
    endbossHealthbar = new EndbossHealthBar();
    /** Active air-bubble projectiles. */
    airBubbles = [];
    /** Active poison-bubble projectiles. */
    poisonBubbles = [];
    /** True once the game has ended (win/lose). */
    gameOver = false;
    /** Optional interval id used by collision checks. */
    collisionInterval = null;
    /** Poison energy cost per poison shot. */
    POISON_COST = 5;

    /**
     * Creates the world, sets up rendering and main loops.
     * @param {HTMLCanvasElement} canvas - Target canvas to draw on.
     * @param {Object} keyboard - Keyboard/input state provider.
     */
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

    /**
     * Wires up back-references so entities/Heads-Up Display elements can access the world.
     * Also caches the endboss instance from the level.
     * @returns {void}
     */
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

    /**
     * Starts the periodic game logic loop of collisions, item collection, and enemy encounters.
     * Runs every 200 ms while the game is active.
     * @returns {void}
     */
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

    /**
     * Checks player and enemy collisions and applies damage & Heads-Up Display updates.
     * @returns {void}
     */
    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.sharkie.isColliding(enemy)) {
                if (enemy instanceof JellyFish) {
                    this.sharkie.hit(5, 'electric');
                } else if (enemy instanceof PufferFish) {
                    this.sharkie.hit(5, 'poisoned');
                } else if (enemy instanceof Whale) {
                    this.sharkie.hit(10, 'poisoned');
                } else {
                    this.sharkie.hit(5, 'poisoned');
                }
                this.healthBar.setPercentage(this.sharkie.energy);
            }
        });
    }

    /**
     * Handles coin pickups: plays sound effects, increments counter, updates coin Heads-Up Display,
     * and removes collected coins from the level.
     * @returns {void}
     */
    checkCollisionCoins() {
        this.level.coin.forEach((coin, index) => {
            if (this.sharkie.isColliding(coin) && this.coinBar.percentage < 100) {
                AUDIO_COIN.currentTime = 0;
                AUDIO_COIN.play();
                AUDIO_COIN.volume = 0.1;
                this.sharkie.coin++;
                // 1 coin = 5%
                let percentage = this.sharkie.coin * 5;
                if (percentage > 100) percentage = 100;
                this.coinBar.setPercentage(percentage);
                this.level.coin.splice(index, 1);
            }
        });
    }

    /**
     * Handles poison-flask pickups: plays sound effects, increases poison bar by 5%,
     * and removes collected flasks from the level.
     * @returns {void}
     */
    checkCollisionPoisonFlasks() {
        this.level.poison_flask.forEach((flask, index) => {
            if (this.sharkie.isColliding(flask) && this.poisonFlaskBar.percentage < 100) {
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

    /**
     * Checks input for shooting air bubbles (W), gates firing rate,
     * and spawns a bubble after the attack animation.
     * @returns {void}
     */
    checkAirBubbles() {
        if (this.keyboard.W && this.keyboard.canShootW) {
            this.keyboard.canShootW = false;
            this.sharkie.shootBubble(() => {
                this.spawnBubble("air");
                setTimeout(() => this.keyboard.canShootW = true, 300);
            });
        }
    }

    /**
     * Checks input for shooting poison bubbles (E), consumes poison energy,
     * gates firing rate, and spawns a bubble after the attack animation.
     * @returns {void}
     */
    checkPoisonBubbles() {
        if (this.keyboard.E && this.keyboard.canShootE && this.poisonFlaskBar.percentage >= this.POISON_COST) {
            this.keyboard.canShootE = false;
            this.poisonFlaskBar.setPercentage(this.poisonFlaskBar.percentage - this.POISON_COST);
            this.sharkie.shootBubble(() => {
                this.spawnBubble("poison");
                setTimeout(() => this.keyboard.canShootE = true, 300);
            });
        }
    }

    /**
     * Spawns either an air or poison bubble in front of Sharkie.
     * Forces facing to the right if Sharkie was left-facing.
     * @param {"air"|"poison"} type - Bubble type to spawn.
     * @returns {void}
     */
    spawnBubble(type) {
        if (this.sharkie.otherDirection) {
            this.sharkie.otherDirection = false;
        }
        if (type === "air") {
            const airBubble = new AirBubbles(this.sharkie.x + 180, this.sharkie.y + 90);
            this.airBubbles.push(airBubble);
        }
        if (type === "poison") {
            if (this.poisonFlaskBar && this.poisonFlaskBar.percentage >= 0) {
                const poisonBubble = new PoisonBubbles(this.sharkie.x + 180, this.sharkie.y + 90);
                this.poisonBubbles.push(poisonBubble);
            }
        }
    }

    /**
     * Whether the poison flask Heads-Up Display bar should be displayed.
     * @returns {boolean} True if poison energy is available.
     */
    shouldDisplayPoisonFlaskBar() {
        const world = this.sharkie.world;
        return world &&
            Array.isArray(world.poisonBubbles) &&
            world.poisonFlaskBar &&
            world.poisonFlaskBar.percentage > 0;
    }

    /**
     * Resolves collisions between air bubbles and enemies,
     * applies damage rules, and removes the bubble on hit.
     * @returns {void}
     */
    checkCollisionAirBubbles() {
        this.airBubbles.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bubble.isColliding(enemy)) {
                    if (enemy instanceof Whale) {
                        if (enemy.isActive()) {
                            enemy.takeDamage(1);
                        }
                    } else {
                        this.handleEnemyDamage(enemy);
                    }
                    this.airBubbles.splice(bubbleIndex, 1);
                }
            });
        });
    }

    /**
     * Resolves collisions between poison bubbles and enemies,
     * applies damage rules, and removes the bubble on hit.
     * @returns {void}
     */
    checkCollisionPoisonBubbles() {
        this.poisonBubbles.forEach((bubble, bubbleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (bubble.isColliding(enemy)) {
                    if (enemy instanceof Whale) {
                        if (enemy.isActive()) {
                            enemy.takeDamage(10);
                        }
                    } else {
                        this.handleEnemyDamage(enemy);
                    }
                    this.poisonBubbles.splice(bubbleIndex, 1);
                }
            });
        });
    }

    /**
     * Plays damage sound effect and triggers the enemy's death routine.
     * @param {Object} enemy - The enemy instance that got hit.
     * @returns {void}
     */
    handleEnemyDamage(enemy) {
        AUDIO_DAMAGE.play();
        AUDIO_DAMAGE.volume = 0.1;
        enemy.die();
    }

    /**
     * Main render loop: clears the screen, applies camera transform, draws the landscape, entities, collectibles, projectiles,
     * then draws Heads-Up Display elements in screen space. Continues via requestAnimationFrame while the game is active.
     * @returns {void}
     */
    draw() {
        if (this.gameOver) return;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addLandscape();
        this.addToMap(this.sharkie);
        this.addObjectsToMap(this.level.enemies);
        this.addCollectiblesAndBubbles();
        this.ctx.translate(-this.camera_x, 0);
        this.addProgressBars();
        if (this.endbossHealthbar.visible) {
            this.addToMap(this.endbossHealthbar);
        }
        let self = this;
        this.animationFrameId = requestAnimationFrame(function () { self.draw(); });
    }

    /**
     * Draws static/ambient layers (lights and backgrounds).
     * @returns {void}
     */
    addLandscape() {
        this.addObjectsToMap(this.level.lights);
        this.addObjectsToMap(this.level.backgrounds);
    }

    /**
     * Draws Heads-Up Display progress bars (health, coin, poison).
     * @returns {void}
     */
    addProgressBars() {
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.poisonFlaskBar);
    }

    /**
     * Draws collectibles (flasks, coins) and active projectile bubbles.
     * @returns {void}
     */
    addCollectiblesAndBubbles() {
        this.addObjectsToMap(this.level.poison_flask);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.airBubbles);
        this.addObjectsToMap(this.poisonBubbles);
    }

    /**
     * Adds an array of drawable objects to the render pipeline.
     * @param {Object[]} objects - Drawable objects with a draw(ctx) API.
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Renders a single movable/drawable object with optional horizontal mirroring enabled for the object.
     * @param {Object} movebleObject - Object providing draw/drawFrame.
     * @returns {void}
     */
    addToMap(movebleObject) {
        if (!movebleObject.img) {
            console.warn("Fehler: Object ohne gültigem img:", movebleObject);
            return;
        }
        if (movebleObject.otherDirection) {
            this.flipImage(movebleObject);
        }
        movebleObject.draw(this.ctx);
        // movebleObject.drawFrame(this.ctx);
        // movebleObject.drawCollisionBorder(this.ctx);
        if (movebleObject.otherDirection) {
            this.flipImageBack(movebleObject);
        }
    }

    /**
     * Applies a horizontal flip to subsequent draw calls for the given object.
     * @param {Object} movebleObject - Object with x/width properties used for flipping.
     * @returns {void}
     */
    flipImage(movebleObject) {
        this.ctx.save();
        this.ctx.translate(movebleObject.width, 0);
        this.ctx.scale(-1, 1);
        movebleObject.x = movebleObject.x * -1;
    }

    /**
     * Restores canvas state and reverts the temporary x inversion applied in flipImage.
     * @param {Object} movebleObject - Same object passed to {@link flipImage}.
     * @returns {void}
     */
    flipImageBack(movebleObject) {
        movebleObject.x = movebleObject.x * -1;
        this.ctx.restore();
    }

    /**
     * Stops periodic timers and the animation frame loop managed by this world.
      * Safe to call multiple times.
     * @returns {void}
     */
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

    /**
     * Tears down the world: flags game over, stops timers/loops for the world, Sharkie, enemies, and bubbles, and clears the canvas.
     * @returns {void}
     */
    destroy() {
        this.gameOver = true;
        this.stopIntervals();
        if (this.sharkie && typeof this.sharkie.stopIntervals === 'function') {
            this.sharkie.stopIntervals();
        }
        if (this.level && Array.isArray(this.level.enemies)) {
            this.level.enemies.forEach(enemy => { if (enemy && typeof enemy.stopIntervals === 'function') { enemy.stopIntervals(); }});
        }
        const stopBubbleArray = (arr) => {
            if (Array.isArray(arr)) { arr.forEach(b => { if (b && typeof b.stopIntervals === 'function') { b.stopIntervals(); }}); arr.length = 0; }
        };
        stopBubbleArray(this.airBubbles);
        stopBubbleArray(this.poisonBubbles);
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /**
     * Shows the "lose" overlay and halts further gameplay progression.
     * @returns {void}
     */
    showLoseScreen() {
        this.gameOver = true;
        document.getElementById("lose-screen").classList.remove("d-none");
    }

    /**
     * Shows the "win" overlay and halts further gameplay progression.
     * @returns {void}
     */
    showWinScreen() {
        this.gameOver = true;
        document.getElementById("win-screen").classList.remove("d-none");
    }
}