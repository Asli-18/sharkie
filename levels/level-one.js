const level_one = new Level(
    [
        new Light()
    ],
    [
        new Water(-1440, 0),
        new SeaBackground(-1440, 0),
        new Seabed(-1440, 0),
        new Light(-1440, 0),

        new Water(0, 0),
        new SeaBackground(0, 0),
        new Seabed(0, 0),
        new Light(0, 0),

        new Water(1440, 0),
        new SeaBackground(1440, 0),
        new Seabed(1440, 0),
        new Light(1440, 0),

        new Water(2880, 0),
        new SeaBackground(2880, 0),
        new Seabed(2880, 0),
        new Light(2880, 0),
    ],
    [
        new JellyFish('assets/img/enemy/jelly-fish-green-1.png'),
        new JellyFish('assets/img/enemy/jelly-fish-pink-1.png'),
        new PufferFish('assets/img/enemy/puffer-fish-swim-green-1.png'),
        new JellyFish('assets/img/enemy/jelly-fish-lila-1.png'),
        new JellyFish('assets/img/enemy/jelly-fish-yellow-1.png'),
        new PufferFish('assets/img/enemy/puffer-fish-swim-salmon-1.png'),
        new PufferFish('assets/img/enemy/puffer-fish-swim-salmon-1.png'),
        new PufferFish('assets/img/enemy/puffer-fish-swim-pink-1.png')
    ]
);