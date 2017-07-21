PlayState.onHeroVsSpider = function(hero, spider) {
    this.sfx.stomp.play();

    if (spider.body.touching.up) {
        hero.bounce();
        spider.die();
    } else if (!this.hero.isDying) {
        this.hero.isDying = true;
        this.hero.die();
    }
};

PlayState.onHeroVsCoin = function(hero, coin) {
    this.sfx.coin.play();
    this.coinCount++;
    this.coinFont.text = 'x' + this.coinCount;
    coin.kill();
};

PlayState.onHeroVsDoor = function(hero, door) {
    if (this.heroHasKey) {
        if (!this.heroMovingToDoor) {
            this.heroMovingToDoor = true;
            this.sfx.door.play();
            this.door.animations.play('open');
        }
    }
};

PlayState.onHeroVsKey = function(hero, key) {
    this.heroHasKey = true;
    this.sfx.key.play();
    this.keyIcon.frame = 1;
    key.kill();
};

PlayState.onHeroInDoor = function() {
    this.hero.animations.play('blink');
    this.fadeCamera(false, function() {
        this.game.state.restart(true, false, {
            level: this.level + 1,
        });
    }, this);
};
