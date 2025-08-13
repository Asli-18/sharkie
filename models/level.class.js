class Level{
    lights;
    backgrounds;
    enemies;
    level_end_x = 2880;

    constructor(lights, backgrounds, enemies){
        this.lights = lights;
        this.backgrounds = backgrounds;
        this.enemies = enemies;
    }
}
