PlayState.onHeroVsSpider = function(hero, spider) {
    this.sfx.stomp.play();

    if (spider.body.touching.up) {
        hero.bounce();
        spider.die();
    } else
        this.game.state.restart(true, false, {
            level: 0
        });
};

PlayState.onHeroVsCoin = function(hero, coin) {
    this.sfx.coin.play();
    this.coinCount++;
    this.coinFont.text = `x${this.coinCount}`;
    coin.kill();
};

PlayState.onHeroVsDoor = function(hero, door) {
    if (this.hasKey) {
        if (!this.heroInDoor) {
            this.sfx.door.play();
            this.door.animations.play('open');
            // End of fade triggers a restart of the next level
            this.fadeCamera(false);
        }
        this.heroInDoor = true;
    }
};

PlayState.onHeroVsKey = function(hero, key) {
    this.hasKey = true;
    this.sfx.key.play();
    this.keyIcon.frame = 1;
    key.kill();
};
