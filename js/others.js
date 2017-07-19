PlayState.handleCollisions = function() {
    this.game.physics.arcade.collide(this.hero, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.enemyWalls);
    this.game.physics.arcade.overlap(this.hero, this.coins, this.onHeroVsCoin, null, this);
    this.game.physics.arcade.overlap(this.hero, this.door, this.onHeroVsDoor, null, this);
    this.game.physics.arcade.overlap(this.hero, this.key, this.onHeroVsKey, null, this);
    this.game.physics.arcade.collide(this.hero, this.spiders, this.onHeroVsSpider, null, this);
};

PlayState.handleInput = function() {
    if (this.keys.left.isDown)
        this.hero.move(-1);
    else if (this.keys.right.isDown)
        this.hero.move(1);
    else
        this.hero.move(0);

    if (this.hero.body.velocity.y < 0)
        console.log(this.hero.body.velocity.y);

    // holding key for a short time
    if (this.keys.up.isDown) {
        if (this.keys.up.duration > 0 && this.keys.up.duration < 200 && this.hero.isJumping)
            this.hero.jump();
    }

    // if (this.keys.up.isDown) {
    //     var startedJump = this.hero.jump(this.keys.up.duration);
    //     if (startedJump)
    //         this.sfx.jump.play();
    // }
};

PlayState.fadeCamera = function(fadeIn) {
    if (fadeIn)
        this.game.camera.flash(0, 500);
    else
        this.game.camera.fade(0, 500);
};
