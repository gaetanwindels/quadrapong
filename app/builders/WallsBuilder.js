var WallFactory = require("./../factories/WallFactory.js");

var WallsBuilder = {};

WallsBuilder.makeWalls = function(game, world) {
    var walls = [];
    walls.push(WallFactory.makeTopLeftWall(game, world));
    walls.push(WallFactory.makeTopRightWall(game, world));
    walls.push(WallFactory.makeBottomLeftWall(game, world));
    walls.push(WallFactory.makeBottomRightWall(game, world));
    return walls;
}

module.exports = WallsBuilder;