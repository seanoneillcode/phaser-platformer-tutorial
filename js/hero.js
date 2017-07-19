function Hero(game, x, y) {
    // call Phaser.Sprite constructor
    Phaser.Sprite.call(this, game, x, y, 'hero');
    this.anchor.set(0.5, 0.5);
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;

    this.animations.add('stop', [0]);
    this.animations.add('walk', [1, 2], 8, true);
    this.animations.add('jump', [3]);
    this.animations.add('fall', [4]);
}

// inherit from Phaser.Sprite
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;

Hero.prototype.move = function(direction) {
    const SPEED = 200;
    this.body.velocity.x = direction * SPEED;
    if (this.body.velocity.x < 0)
        this.scale.x = -1;
    else
        this.scale.x = 1;
};

Hero.prototype.jump = function() {
    if (this.body)
        this.body.velocity.y = -400;
};

// Hero.prototype.jump = function(pressDuration) {
//     var startingJump = false;
//
//     if (this.body) {
//         startingJump = (this.body.touching.down && !pressDuration);
//         var ongoingJump = (this.body.velocity.y < 0 && pressDuration && pressDuration < 500);
//
//         console.log(pressDuration);
//         if (startingJump)
//             this.body.velocity.y = -600;
//         else if (ongoingJump)
//             this.body.velocity.y = -300;
//     }
//
//     return startingJump;
// };

Hero.prototype.bounce = function() {
    const SPEED = 200;
    this.body.velocity.y = -SPEED;
};

Hero.prototype.getAnimName = function() {
    var name = 'stop';

    if (this.body.velocity.y < 0)
        name = 'jump';
    else if (this.body.velocity.y > 0 && !this.body.touching.down)
        name = 'fall';
    else if (this.body.velocity.x != 0 && this.body.touching.down)
        name = 'walk';

    return name;
};

Hero.prototype.update = function() {
    var animName = this.getAnimName();
    if (this.animations.name !== animName)
        this.animations.play(animName);
};
