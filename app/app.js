var Ball = require("./entities/ball.js");
var WallsBuilder = require("./builders/WallsBuilder.js");
var PlayersBuilder = require("./builders/PlayersBuilder.js");

var game = new Phaser.Game(700, 700, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var world;
var player;
var bulletCollisionGroup;
var ballCollisionGroup;

function preload() {
    game.load.image('ball', 'assets/ball.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('goal', 'assets/goal.jpg');
    game.load.image('wall', 'assets/white.jpg');
    game.load.image('blue', 'assets/blue.jpg');
    game.load.image('bg', 'assets/battlefield.jpg');
    game.load.image('yellow', 'assets/yellow.jpg');
    game.load.image('green', 'assets/green.jpg');
    //game.load.spritesheet('ball', 'assets/ball.png', 50, 50);
}

function create() { 
    // background
    var bg = game.add.sprite(0, 0, 'bg');
    bg.x = 0;
    bg.y = 0;
    bg.height = game.height;
    bg.width = game.width;
    
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
    var playersBuilder = new PlayersBuilder();
    
    var walls = WallsBuilder.makeWalls(game, world);
    
    var players = playersBuilder.makePlayers(game, world);
        
    var ball = new Ball(game, world);
    ball.ball.body.setCollisionGroup(ballCollisionGroup);
    ball.ball.body.collides([ballCollisionGroup, bulletCollisionGroup]);

    for (var i = 0; i < walls.length; i++) {
        walls[i].body.setCollisionGroup(ballCollisionGroup);
        walls[i].body.collides([ballCollisionGroup, bulletCollisionGroup]);
    }

    for (var i = 0; i < walls.length; i++) {
        players[i].player.body.setCollisionGroup(ballCollisionGroup);
        players[i].player.body.collides([ballCollisionGroup, bulletCollisionGroup]);
    }
    

}

function update() {

}

module.exports = game;