var game;
var player;

var Goal = function(game, world, rightSide) {
    if (rightSide) {
        var goal = world.create(game.width - 10, game.height / 2, "goal");
    } else {
        var goal = world.create(10, game.height / 2, "goal");
    }
    
    goal.opacity = 0.6;
    goal.width = 20;
    goal.height = game.height / 3;
    goal.body.setRectangle(40, game.height / 3);
    goal.body.static = true;
    goal.alpha = 0.5;
    
    return goal;
}

module.exports = Goal;