(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*var Player = require("./entities/player.js");

var Goal = require("./entities/goal.js");*/
var Ball = require("./entities/ball.js");
var WallsBuilder = require("./builders/WallsBuilder.js");
var PlayersBuilder = require("./builders/PlayersBuilder.js");

var game = new Phaser.Game(700, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var world;
var player;
var player2;
var bullets = [];
var bulletCollisionGroup;
var ballCollisionGroup;

function preload() {
    game.load.image('ball', 'assets/ball.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('player', 'assets/player.jpg');
    game.load.image('goal', 'assets/goal.jpg');
    game.load.image('wall', 'assets/grey.jpg');
    game.load.image('blue', 'assets/blue.jpg');
    game.load.image('yellow', 'assets/yellow.png');
    game.load.image('green', 'assets/green.png');
    //game.load.spritesheet('ball', 'assets/ball.png', 50, 50);
}

function create() {
    //  We're going to be using physics, so enable the 2pjs Physics system
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 0;
    game.physics.p2.gravity.x = 0;
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 1;

    ballCollisionGroup = game.physics.p2.createCollisionGroup();
    bulletCollisionGroup = game.physics.p2.createCollisionGroup();

    world = game.add.group();

    world.enableBody = true;
    //world.enableBodyDebug = true;
    world.physicsBodyType = Phaser.Physics.P2JS;
    
    game.physics.p2.updateBoundsCollisionGroup();
    
    // adding entities

/*    player = world.create(game.width / 4 - 50, game.height / 2 - 25, "ball");
    player.width = 50;
    player.height = 50;
    player.body.setCircle(25);*/
    var players = PlayersBuilder.makePlayers(game, world);
    var walls = WallsBuilder.makeWalls(game, world);
    var ball = new Ball(game, world);
    ball.ball.body.setCollisionGroup(ballCollisionGroup);
    ball.ball.body.collides([ballCollisionGroup, bulletCollisionGroup]);

/*    var ball = Ball(game, world);
    player = Player(game, world);
    var goal2 = Goal(game, world, true);
    
    var goal = Goal(game, world);*/
    for (var i = 0; i < walls.length; i++) {
        walls[i].body.setCollisionGroup(ballCollisionGroup);
        walls[i].body.collides([ballCollisionGroup, bulletCollisionGroup]);
    }

    for (var i = 0; i < walls.length; i++) {
        players[i].player.body.setCollisionGroup(ballCollisionGroup);
        players[i].player.body.collides([ballCollisionGroup, bulletCollisionGroup]);
    }
    

/*
    player.body.collides([ballCollisionGroup, bulletCollisionGroup]);
    player.body.setCollisionGroup(ballCollisionGroup);
    ball.body.setCollisionGroup(ballCollisionGroup);*/
    //var cursors = game.input.keyboard.createCursorKeys();
}

function update() {

}

module.exports = game;
},{"./builders/PlayersBuilder.js":2,"./builders/WallsBuilder.js":3,"./entities/ball.js":5}],2:[function(require,module,exports){
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
},{"./../factories/PlayerFactory.js":6}],3:[function(require,module,exports){
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
},{"./../factories/WallFactory.js":7}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
var Ball = function(game, world) {
    var _speed = game.width * 1.5;

    this.ball = world.create(game.width / 2, game.height / 2, "ball");
    this.ball.width = game.height / 20;
    this.ball.height = game.height / 20;
    this.ball.body.mass = 1;
    this.ball.body.setCircle(game.height / 40);
    this.ball.body.collideWorldBounds = false;
    this.ball.body.damping = 0;

    /**
     * Randomizes y and x velocities
     */
    this.randomizeDirection = function() {
        var minus1 = Math.floor((Math.random() * 2 | 0)) ? -1 : 1;
        var minus2 = Math.floor((Math.random() * 2 | 0)) ? -1 : 1;
        this.ball.body.velocity.x = minus1 * Math.floor((Math.random() * _speed) + 1);
        this.ball.body.velocity.y = minus2 * (_speed - Math.abs(this.ball.body.velocity.x));
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
    }.bind(this);

    window.setTimeout(this.randomizeDirection.bind(this), 1000);
}

module.exports = Ball;
},{}],6:[function(require,module,exports){
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
},{"./../entities/Player.js":4}],7:[function(require,module,exports){
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
},{}]},{},[1]);
