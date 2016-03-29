var PlayerFactory = require("./../factories/PlayerFactory.js");

var PlayersBuilder = {};

PlayersBuilder.makePlayers = function(game, world) {
    var players = [];
    players.push(PlayerFactory.makeLeftPlayer(game, world));
    players.push(PlayerFactory.makeRightPlayer(game, world));
    players.push(PlayerFactory.makeTopPlayer(game, world));
    players.push(PlayerFactory.makeBottomPlayer(game, world));

    players[0].activateInput(true);
    return players;
}

module.exports = PlayersBuilder;