

function Hero(game, x, y) {
    this.moveSpeed = 200;
    this.jump_speed = 400;
    this.bounce_speed = 200;

    Phaser.Sprite.call(this, game, x, y, 'hero');
    this.anchor.set(0.5, 0.5);
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;

    this.animations.add('stop', [0]);
    this.animations.add('walk', [1, 2], 8, true);
    this.animations.add('jump', [3]);
    this.animations.add('fall', [4]);
    this.animations.add('die', [5, 6, 5, 6, 5, 6], 8);
    this.animations.play('stop');

}

Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function(direction) {
    this.body.velocity.x = direction * this.moveSpeed;
    if (this.body.velocity.x < 0) {
        this.scale.x = -1;
    }
    if (this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
};

Hero.prototype.jump = function() {
    if (this.body) {
        this.body.velocity.y = -this.jump_speed;
    }
};

Hero.prototype.bounce = function() {
    this.body.velocity.y = -this.bounce_speed;
};

Hero.prototype.getMoveAnimName = function() {
    var name = 'stop';

    if (this.body.velocity.y < 0) {
        name = 'jump';
    } else if (this.body.velocity.y > 0 && !this.body.touching.down) {
        name = 'fall';
    } else if (this.body.velocity.x != 0 && this.body.touching.down) {
        name = 'walk';
    }
    return name;
};

Hero.prototype.die = function(next) {
    this.animations.play('die').onComplete.addOnce(function() {
        next();
    });
};

Hero.prototype.update = function() {
    const ALL_MOVE_ANIMS = ['stop', 'jump', 'fall', 'walk'];
    var newAnim = this.getMoveAnimName();
    var curAnim = this.animations.name;
    if (!curAnim || (ALL_MOVE_ANIMS.includes(curAnim) && curAnim !== newAnim)) {
        this.animations.play(newAnim);
    }
};
