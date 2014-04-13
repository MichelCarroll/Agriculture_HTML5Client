
var stage = null;

var charX = 0;
var charY = 0;

var KEYCODE_LEFT = 37, 
        KEYCODE_RIGHT = 39,
        KEYCODE_UP = 38, 
        KEYCODE_DOWN = 40;

var MOVEMENT_SPEED = 5;

var bUp = false, 
        bDown = false, 
        bLeft = false, 
        bRight = false;

jQuery(document).ready(function() {
    bootstrap();
});

var characters = [];

function keyDown(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
                if(!bLeft) {
                    character.sprite.gotoAndPlay("run_left");
                    bLeft = true;
                }
                break;
        case KEYCODE_RIGHT: 
                if(!bRight) {
                    character.sprite.gotoAndPlay("run_right");
                    bRight = true;
                }
                break;
        case KEYCODE_UP: 
                if(!bUp) {
                    character.sprite.gotoAndPlay("run_up");
                    bUp = true;
                }
                break;
        case KEYCODE_DOWN: 
                if(!bDown) {
                    character.sprite.gotoAndPlay("run_down");
                    bDown = true;
                }
                break;
    }
}

function isMoving() {
    return bUp || bDown || bRight || bLeft;
}

function keyUp(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
                bLeft = false;
                if(!isMoving())
                    character.sprite.gotoAndPlay("left");
                break;
        case KEYCODE_RIGHT: 
                bRight = false;
                if(!isMoving())
                    character.sprite.gotoAndPlay("right");
                break;
        case KEYCODE_UP: 
                bUp = false;
                if(!isMoving())
                    character.sprite.gotoAndPlay("up");
                break;
        case KEYCODE_DOWN: 
                bDown = false;
                if(!isMoving())
                    character.sprite.gotoAndPlay("down");
                break;
    }
}


function processInput() {
    if(bUp) {
        character.sprite.y -= MOVEMENT_SPEED;
    } else if(bDown) {
        character.sprite.y += MOVEMENT_SPEED;
    }
    
    if(bRight) {
        character.sprite.x += MOVEMENT_SPEED;
    } else if(bLeft) {
        character.sprite.x -= MOVEMENT_SPEED;
    }
}

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
    
    this.document.onkeyup = keyUp;
    this.document.onkeydown = keyDown;
    
    setInterval(function() {
        processInput();
    }, 50);
}

function loadDoneHandler() {
    var data = new createjs.SpriteSheet({
        "images": [loader.getResult("character")],
        "frames": {"regX": 16, "height": 48, "count": 16, "regY": 24, "width": 32},
        "animations": {
            "run_down": [0, 3, "run_down", 1],
            "run_left": [4, 7, "run_left", 1],
            "run_right": [8, 11, "run_right", 1],
            "run_up": [12, 15, "run_up", 1],
            
            "down": [0, 0, "down", 1],
            "left": [4, 4, "left", 1],
            "right": [8, 8, "right", 1],
            "up": [12, 12, "up", 1]
        }
    });
    
    var sprite = new createjs.Sprite(data, "down");
    
    character = new Agriculture.Character(sprite);
    character.sprite.setTransform(50 ,50,1,1);
    character.sprite.framerate = 10;
    stage.addChild(character.sprite);
    
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    stage.update(event);
}