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
        new JellyFish(),
        new PufferFish(),
        new JellyFish(),
        new JellyFish(),
        new PufferFish(),
        new PufferFish(),
        new Whale()
    ],
    [
        new PoisonFlask(330, 410),
        new PoisonFlask(365, 400),
        new PoisonFlask(400, 410),
        // -----
        new PoisonFlask(1180, 200),
        new PoisonFlask(1220, 200),
        new PoisonFlask(1260, 200),
        new PoisonFlask(1300, 200),
        new PoisonFlask(1340, 200),
        new PoisonFlask(1380, 200),
        new PoisonFlask(1420, 200),
        new PoisonFlask(1460, 200),

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
        new Coin(1200, 20),
        new Coin(1200, 50),
        new Coin(1200, 80),
        new Coin(1200, 110),
        new Coin(1200, 140),
        new Coin(1230, 20),
        new Coin(1260, 30),
        new Coin(1280, 50),
        new Coin(1280, 110),
        new Coin(1290, 80),
        new Coin(1260, 130),
        new Coin(1230, 140),
        new Coin(1400, 20),
        new Coin(1385, 50),
        new Coin(1370, 80),
        new Coin(1355, 110),
        new Coin(1340, 140),
        new Coin(1415, 50),
        new Coin(1430, 80),
        new Coin(1445, 110),
        new Coin(1460, 140),
        new Coin(1400, 110),
        // ->
        new Coin(2400, 210),// 1900
        new Coin(2440, 210),// 1940
        new Coin(2480, 210),// 1980
        new Coin(2540, 210),// 2040
        new Coin(2460, 140),// 1960
        new Coin(2500, 175),// 2000
        new Coin(2460, 280),// 1960
        new Coin(2500, 245),// 2000
    ]
);