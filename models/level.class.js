class Level {
    lights;
    backgrounds;
    enemies;
    poison_flask;
    coin;
    air_bubbles;
    poison_bubbles;
    level_end_x = 4200;

    constructor(lights, backgrounds, enemies, poison_flask, coin, air_bubbles, poison_bubbles) {
        this.lights = lights;
        this.backgrounds = backgrounds;
        this.enemies = enemies;
        this.poison_flask = poison_flask;
        this.coin = coin;
        this.air_bubbles = air_bubbles;
        this.poison_bubbles = poison_bubbles;
    }
}
