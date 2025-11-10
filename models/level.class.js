/**
 * Container for all entities and configuration of a single game level.
 */
class Level {

    /**
     * Foreground/ambient light objects used for visual effects.
     * @type {Object[]}
     */
    lights;

    /**
     * Background layers/elements drawn behind gameplay.
     * @type {Object[]}
     */
    backgrounds;

    /**
     * Enemy actors present in this level.
     * @type {Object[]}
     */
    enemies;

    /**
     * Collectible poison flasks available in this level.
     * @type {Object[]}
     */
    poison_flask;

    /**
     * Collectible coins available in this level.
     * @type {Object[]}
     */
    coin;

    /**
     * Air-bubble pickups/restores placed in this level.
     * @type {Object[]}
     */
    air_bubbles;

    /**
     * Player projectiles (poison bubbles) pre-placed in the level, if any.
     * @type {Object[]}
     */
    poison_bubbles;

    /**
     * World X coordinate at which the level ends (win/transition trigger).
     * @type {number}
     */
    level_end_x = 4200;

    /**
     * Creates a new level with the provided entity collections.
     *
     * @param {Object[]} lights - Light/effect objects.
     * @param {Object[]} backgrounds - Background layers/elements.
     * @param {Object[]} enemies - Enemy actors.
     * @param {Object[]} poison_flask - Poison flask collectibles.
     * @param {Object[]} coin - Coin collectibles.
     * @param {Object[]} air_bubbles - Air-bubble pickups.
     * @param {Object[]} poison_bubbles - Pre-placed poison-bubble projectiles.
     */
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