function createLevelOne() {
    return new Level(
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

            new Water(4320, 0),
            new SeaBackground(4320, 0),
            new Seabed(4320, 0),
            new Light(4320, 0),
        ],
        [
            new JellyFish("lilaPink"),
            new PufferFish(),
            new JellyFish(),
            new JellyFish("lilaPink"),
            new PufferFish("pinkGreen"),
            new PufferFish("greenSalmon"),
            new PufferFish("pinkGreen"),
            new JellyFish("lilaPink"),
            new JellyFish(),
            new PufferFish("greenSalmon"),
            new Whale()
            // new JellyFish(),
            // new PufferFish("pinkGreen"),
            // new PufferFish("greenSalmon"),
            // new JellyFish(),

            // new JellyFish("lilaPink"),
            // new JellyFish("lilaPink"),
            // new PufferFish("pinkGreen"),
            // new PufferFish("greenSalmon"),

        ],
        [
            new PoisonFlask(300, 410),
            new PoisonFlask(350, 400),
            new PoisonFlask(400, 400),
            new PoisonFlask(450, 410),
            // -----
            new PoisonFlask(1180, 300),
            new PoisonFlask(1220, 300),
            new PoisonFlask(1260, 300),
            new PoisonFlask(1300, 300),
            new PoisonFlask(1340, 300),
            new PoisonFlask(1380, 300),
            new PoisonFlask(1420, 300),
            new PoisonFlask(1460, 300),

            new PoisonFlask(1700, 410),
            new PoisonFlask(1735, 400),
            new PoisonFlask(1770, 410),

            // ->
            new PoisonFlask(1900, 200),
            new PoisonFlask(1940, 200),
            new PoisonFlask(1980, 200),
            new PoisonFlask(2040, 200),
            new PoisonFlask(1960, 130),
            new PoisonFlask(2000, 165),
            new PoisonFlask(1960, 270),
            new PoisonFlask(2000, 235),

            // new PoisonFlask(2400, 210),// 1900
            // new PoisonFlask(2440, 210),// 1940
            // new PoisonFlask(2480, 210),// 1980
            // new PoisonFlask(2540, 210),// 2040
            // new PoisonFlask(2460, 140),// 1960
            // new PoisonFlask(2500, 175),// 2000
            // new PoisonFlask(2460, 280),// 1960
            // new PoisonFlask(2500, 245),// 2000

            new PoisonFlask(2900, 210),// 1900
            new PoisonFlask(2940, 210),// 1940
            new PoisonFlask(2980, 210),// 1980
            new PoisonFlask(3040, 210),// 2040
            new PoisonFlask(2960, 140),// 1960
            new PoisonFlask(3000, 175),// 2000
            new PoisonFlask(2960, 280),// 1960
            new PoisonFlask(3000, 245),// 2000
        ],
        [
            new Coin(150, 400),
            new Coin(200, 390),
            new Coin(250, 380),
            new Coin(300, 370),
            new Coin(350, 360),
            new Coin(400, 360),
            new Coin(450, 370),
            new Coin(500, 380),
            new Coin(550, 390),
            new Coin(600, 400),
            // DA
            new Coin(1200, 120),
            new Coin(1200, 150),
            new Coin(1200, 180),
            new Coin(1200, 210),
            new Coin(1200, 240),
            new Coin(1230, 120),
            new Coin(1260, 130),
            new Coin(1280, 150),
            new Coin(1280, 210),
            new Coin(1290, 180),
            new Coin(1260, 230),
            new Coin(1230, 240),
            new Coin(1400, 120),
            new Coin(1385, 150),
            new Coin(1370, 180),
            new Coin(1355, 210),
            new Coin(1340, 240),
            new Coin(1415, 150),
            new Coin(1430, 180),
            new Coin(1445, 210),
            new Coin(1460, 240),
            new Coin(1400, 210),

            // ->
            new Coin(2400, 210),// 1900
            new Coin(2440, 210),// 1940
            new Coin(2480, 210),// 1980
            new Coin(2540, 210),// 2040
            new Coin(2460, 140),// 1960
            new Coin(2500, 175),// 2000
            new Coin(2460, 280),// 1960
            new Coin(2500, 245),// 2000
        ],
        [new AirBubbles()],
        [new PoisonBubbles()],

    );
}