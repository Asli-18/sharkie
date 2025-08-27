class Level {
    lights;
    backgrounds;
    enemies;
    poison_flask;
    coin;
    level_end_x = 2880;

    constructor(lights, backgrounds, enemies, poison_flask, coin) {
        this.lights = lights;
        this.backgrounds = backgrounds;
        this.enemies = enemies;
        this.poison_flask = poison_flask;
        this.coin = coin;
    }
}
