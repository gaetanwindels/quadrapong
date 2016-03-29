var Player = function(game, world, x, y, color, isVertical) {
    this.player = world.create(x, y, color);
    var height = game.width / 18;
    var width = game.width / 5;

    this.isVertical = isVertical;

    this.isInputActive = true;

    this.player.width = isVertical ? height : width;
    this.player.height = isVertical ? width : height;

    if (isVertical) {
        this.player.body.setRectangle(height, width);
    } else {
        this.player.body.setRectangle(width, height);
    }

    //this.player.mass = 0.1;

    this.player.body.static = true;

    this.activateInput = function(isActive) {
        this.isInputActive = isActive;
    }

    this.player.update = function() {
        if (this.isInputActive && this.isVertical) {
            this.player.body.y = game.input.mousePointer.y;
        } else if(this.isInputActive && !this.isVertical) {
            this.player.body.x = game.input.mousePointer.x;
        }
    }.bind(this);
}

module.exports = Player;