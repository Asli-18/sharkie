class Level{
    lights;
    backgrounds;
    enemies;
    progress;
    coin;
    level_end_x = 2880;

    constructor(lights, backgrounds, enemies, progress, coin){
        this.lights = lights;
        this.backgrounds = backgrounds;
        this.enemies = enemies;
        this.progress = progress;
        this.coin = coin;
    }
}
