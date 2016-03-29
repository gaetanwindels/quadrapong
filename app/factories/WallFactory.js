var WallFactory = {};

var wallHeightFactor = 8;

WallFactory.makeTopLeftWall = function(game, world) {
    var height = game.height / wallHeightFactor;
    var wall = world.create(height / 2, height / 2, "wall");

    wall.body.static = true;
    wall.height = height;
    wall.width = height;
    wall.body.setRectangle(height, height);
    return wall;
};

WallFactory.makeTopRightWall = function(game, world) {
    var height = game.height / wallHeightFactor;
    var wall = world.create(game.width - (height / 2), height / 2, "wall");

    wall.body.static = true;
    wall.height = height;
    wall.width = height;
    wall.body.setRectangle(height, height);
    return wall;
};

WallFactory.makeBottomLeftWall = function(game, world) {
    var height = game.height / wallHeightFactor;
    var wall = world.create(height / 2, game.height - (height / 2), "wall");

    wall.body.static = true;
    wall.height = height;
    wall.width = height;
    wall.body.setRectangle(height, height);
    return wall;
};

WallFactory.makeBottomRightWall = function(game, world) {
    var height = game.height / wallHeightFactor;
    var wall = world.create(game.height - (height / 2), game.height - (height / 2), "wall");

    wall.body.static = true;
    wall.height = height;
    wall.width = height;
    wall.body.setRectangle(height, height);
    return wall;
};

module.exports = WallFactory;