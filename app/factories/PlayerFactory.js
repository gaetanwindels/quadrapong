var Player = require("./../entities/Player.js");

var PlayerFactory = {};

PlayerFactory.makeLeftPlayer = function(game, world) {
    var player = new Player(game, world, game.width / 30, game.height / 2, "yellow", true);
    var height = player.player.height;
    var width = player.player.width;
    player.player.body.addPolygon({}, [[0, 0], [width / 1.4, 0], [width, height / 2], [width / 1.4, height], [0, height]]);
    return player;
};

PlayerFactory.makeRightPlayer = function(game, world) {
    var player = new Player(game, world, game.width - (game.width / 30), game.height / 2, "blue", true);
    var height = player.player.height;
    var width = player.player.width;
    player.player.body.x = player.player.x - width;
    player.player.body.addPolygon({}, [[width, 0], [width - width / 1.4, 0], [0, height / 2],
                                       [width - width / 1.4, height], [width, height]]);
    return player;
};

PlayerFactory.makeTopPlayer = function(game, world) {
    var player = new Player(game, world, game.width / 2, game.height / 30, "green", false);
    var height = player.player.height;
    var width = player.player.width;
    player.player.body.addPolygon({}, [[0, 0], [width, 0], [width, height / 1.4],
                                       [width / 2, height], [0, height / 1.4]]);
    return player;
};

PlayerFactory.makeBottomPlayer = function(game, world) {
    var player = new Player(game, world, game.width / 2, game.height - (game.height / 30), "goal", false);
    var height = player.player.height;
    var width = player.player.width;
    player.player.body.y = player.player.y - height;
    player.player.body.addPolygon({}, [[0, height], [width, height], [width, height - height / 1.4],
                                       [width / 2, 0], [0, height - height / 1.4]]);
    return player;
};

module.exports = PlayerFactory;