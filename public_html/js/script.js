
var stage = null;

var charX = 0;
var charY = 0;

var KEYCODE_LEFT = 37, 
        KEYCODE_RIGHT = 39,
        KEYCODE_UP = 38, 
        KEYCODE_DOWN = 40;

var MOVEMENT_SPEED = 5;

var char_spritesheet;

jQuery(document).ready(function() {
    bootstrap();
});

var characters = [];

function keyDown(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
                if(!character.bLeft) {
                    character.sprite.gotoAndPlay("run_left");
                    character.bLeft = true;
                }
                break;
        case KEYCODE_RIGHT: 
                if(!character.bRight) {
                    character.sprite.gotoAndPlay("run_right");
                    character.bRight = true;
                }
                break;
        case KEYCODE_UP: 
                if(!character.bUp) {
                    character.sprite.gotoAndPlay("run_up");
                    character.bUp = true;
                }
                break;
        case KEYCODE_DOWN: 
                if(!character.bDown) {
                    character.sprite.gotoAndPlay("run_down");
                    character.bDown = true;
                }
                break;
    }
}

function isMoving() {
    return character.bUp || character.bDown || character.bRight || character.bLeft;
}

function keyUp(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
                character.bLeft = false;
                if(!isMoving())
                    character.sprite.gotoAndStop("left");
                break;
        case KEYCODE_RIGHT: 
                character.bRight = false;
                if(!isMoving())
                    character.sprite.gotoAndStop("right");
                break;
        case KEYCODE_UP: 
                character.bUp = false;
                if(!isMoving())
                    character.sprite.gotoAndStop("up");
                break;
        case KEYCODE_DOWN: 
                character.bDown = false;
                if(!isMoving())
                    character.sprite.gotoAndStop("down");
                break;
    }
}


function processInput() {
    for(char in characters) {
        if(characters[char].bUp) {
            characters[char].sprite.y -= MOVEMENT_SPEED;
        } else if(characters[char].bDown) {
            characters[char].sprite.y += MOVEMENT_SPEED;
        }

        if(characters[char].bRight) {
            characters[char].sprite.x += MOVEMENT_SPEED;
        } else if(characters[char].bLeft) {
            characters[char].sprite.x -= MOVEMENT_SPEED;
        }
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
    char_spritesheet = new createjs.SpriteSheet({
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
    
    character = addNewCharacter(50,50);
    
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function addNewCharacter(posX, posY) {
    var sprite = new createjs.Sprite(char_spritesheet, "down");
    
    var char = new Agriculture.Character(sprite);
    char.sprite.setTransform(posX ,posY,1,1);
    char.sprite.framerate = 10;
    stage.addChild(char.sprite);
    
    characters.push(char);
    
    return char;
}

function tick(event) {
    stage.update(event);
}