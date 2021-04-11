PlayState.loadLevel = function(data) {
    // groups
    this.platforms = this.game.add.group();
    this.coins = this.game.add.group();
    this.spiders = this.game.add.group();
    this.enemyWalls = this.game.add.group();
    this.decorations = this.game.add.group();

    // spawn entities
    this.spawnDecorations(data.decoration);
    this.spawnDoor(data.door);
    this.spawnKey(data.key);
    data.platforms.forEach(this.spawnPlatform, this);
    this.spawnCharacters({
        hero: data.hero,
        spiders: data.spiders,
    });
    data.coins.forEach(this.spawnCoin, this);

    const GRAVITY = 1200;
    this.game.physics.arcade.gravity.y = GRAVITY;

    this.enemyWalls.visible = false;

    this.fadeCamera(true);
};

PlayState.spawnDecorations = function(decorations) {
    for (var i = 0, item; item = decorations[i]; i++) {
        this.decorations.create(item.x, item.y, 'decorations', item.frame);
    }
};

PlayState.spawnDoor = function(door) {
    this.door = this.game.add.sprite(door.x, door.y, 'door');
    this.door.anchor.set(0.5, 1);
    this.door.animations.add('closed', [0]);
    this.door.animations.add('open', [1]);
    this.door.animations.play('closed');

    this.game.physics.enable(this.door);
    this.door.body.allowGravity = false;
};

PlayState.spawnKey = function(key) {
    this.key = this.game.add.sprite(key.x, key.y, 'key');
    this.key.anchor.set(0.5, 0.5);

    this.game.physics.enable(this.key);
    this.key.body.allowGravity = false;

    this.key.y -= 3;
    this.game.add.tween(this.key)
        .to({
            y: this.key.y + 6
        }, 800, Phaser.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .loop()
        .start();
};

PlayState.spawnPlatform = function(platform) {
    var sprite = this.platforms.create(
        platform.x, platform.y, platform.image
    );

    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
    sprite.body.immovable = true;

    this.spawnEnemyWall(platform.x, platform.y, 'left');
    this.spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};

PlayState.spawnEnemyWall = function(x, y, side) {
    var sprite = this.enemyWalls.create(x, y, 'invisible-wall');
    sprite.anchor.set(side == 'left' ? 1 : 0, 1);

    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
};

PlayState.spawnCharacters = function(data) {
    data.spiders.forEach(this.spawnSpider, this);
    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);
};

PlayState.spawnSpider = function(spider) {
    var sprite = new Spider(this.game, spider.x, spider.y);
    this.spiders.add(sprite);
};

PlayState.spawnCoin = function(coin) {
    var sprite = this.coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);
    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true);
    sprite.animations.play('rotate');

    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
};
