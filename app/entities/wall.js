var game;
var player;

var Wall = function(game, world, rightSide) {
    var height = 20;
    var walls = new Array(6);
    walls[0] = world.create(0, height / 4, "wall");
    walls[0].body.static = true;
    walls[0].height = height;
    walls[0].width = height;
    walls[0].body.setRectangle(3000, height);

    walls[1] = world.create(0, game.height - height / 2, "wall");
    walls[1].body.static = true;
    walls[1].height = height;
    walls[1].width = height;
    walls[1].body.setRectangle(3000, height);
    
    walls[2] = world.create(height / 2, height, "wall");
    walls[2].body.static = true;
    walls[2].body.setRectangle(height, 580 - height);
    walls[2].width = height;
    walls[2].height = 580 - height;
    
    walls[3] = world.create(height / 2, 875, "wall");
    walls[3].body.static = true;
    walls[3].body.setRectangle(height, 570 - height);
    walls[3].width = height;
    walls[3].height = 570 - height;
    
    walls[4] = world.create(game.width - height /2, 875, "wall");
    walls[4].body.static = true;
    walls[4].body.setRectangle(height, 570 - height);
    walls[4].width = height;
    walls[4].height = 570 - height;
    
    walls[5] = world.create(game.width - height /2, height, "wall");
    walls[5].body.static = true;
    walls[5].body.setRectangle(height, 580 - height);
    walls[5].width = height;
    walls[5].height = 580 - height;
    
    /*
    walls[3] = world.create(0, game.height * 0.75, "wall");
    walls[4] = world.create(game.width - height, height, "wall");
    walls[5] = world.create(game.width - height, game.height * 0.75, "wall");*/

    
    return walls;
}

module.exports = Wall;