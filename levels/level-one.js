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
        new CoinCounter(-30, 10),
        new HealthCounter(-30, 50),
        new PoisonFlaskCounter(-40, 100)
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

        new Coin(1225, 20),
        new Coin(1235, 30),
        new Coin(1245, 40),
        new Coin(1255, 50),
        new Coin(1265, 60)
    ]
);