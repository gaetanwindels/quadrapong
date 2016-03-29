var Player = require("./../entities/Player.js");

var PlayerFactory = {};

PlayerFactory.makeLeftPlayer = function(game, world) {
    return new Player(game, world, game.width / 20, game.height / 2, "yellow", true);
};

PlayerFactory.makeRightPlayer = function(game, world) {
    return new Player(game, world, game.width - (game.width / 20), game.height / 2, "blue", true);
};

PlayerFactory.makeTopPlayer = function(game, world) {
    return new Player(game, world, game.width / 2, game.height / 20, "green", false);
};

PlayerFactory.makeBottomPlayer = function(game, world) {
    return new Player(game, world, game.width / 2, game.height - (game.height / 20), "goal", false);
};

module.exports = PlayerFactory;