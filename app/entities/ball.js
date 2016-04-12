var Ball = function(game, world) {
    var _speed = game.width * 1.5;

    this.ball = world.create(game.width / 2, game.height / 2, "wall");
    this.ball.width = game.height / 23;
    this.ball.height = game.height / 23;
    this.ball.body.mass = 1;
    this.ball.body.setCircle(game.height / 40);
    this.ball.body.collideWorldBounds = false;
    this.ball.body.damping = 0;
    this.ball.body.fixedRotation = true;

    /**
     * Randomizes y and x velocities
     */
    this.randomizeDirection = function() {
        var minusX = Math.random() * 2 | 0 ? -1 : 1;
        var minusY = Math.random() * 2 | 0 ? -1 : 1;
        this.ball.body.velocity.x = minusX * Math.floor(Math.random() * _speed + 1);
        this.ball.body.velocity.y = minusY * (_speed - Math.abs(this.ball.body.velocity.x));
    }

    this.ball.update = function() {
        if (this.ball.body.x < 0 || this.ball.body.x > game.width ||
            this.ball.body.y < 0 || this.ball.body.y > game.height) {

            this.ball.body.x = game.width / 2;
            this.ball.body.y = game.height / 2;
            this.ball.body.velocity.x = 0;
            this.ball.body.velocity.y = 0;

            window.setTimeout(this.randomizeDirection.bind(this), 1000);
        }

        //this.ball.rotation = this.ball.body.velocity.x / (game.height / 40);
        this.ball.angle = 0;
    }.bind(this);

    window.setTimeout(this.randomizeDirection.bind(this), 1000);
}

module.exports = Ball;