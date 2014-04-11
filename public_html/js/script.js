
var stage = null;

jQuery(document).ready(function() {
    bootstrap();
    
});


function bootstrap() {
    stage = new createjs.Stage("game");

    // grab canvas width and height for later calculations:
    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [
        {src:"images/character.png", id:"character"}
    ];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", loadDoneHandler);
    loader.loadManifest(manifest);
}

function loadDoneHandler() {
    var data = new createjs.SpriteSheet({
        "images": [loader.getResult("character")],
        "frames": {"regX": 0, "height": 48, "count": 64, "regY": 0, "width": 32},
        "animations": {
            "down": [0, 3, "down", 1],
            "left": [4, 7, "left", 1],
            "right": [8, 11, "right", 1],
            "up": [12, 15, "up", 1]
        }
    });
    
    grant = new createjs.Sprite(data, "down");
    grant.setTransform(100,100,1,1);
    grant.framerate = 30;
    stage.addChild(grant);
    
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    stage.update(event);
}