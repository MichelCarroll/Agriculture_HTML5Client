
var Agriculture = Agriculture || {};

(function() {
    
    Agriculture.Character = function (){};
    var p = Agriculture.Character.prototype = new createjs.Sprite();
    p.sprite_initialize = createjs.Sprite.prototype.initialize;


    p.position = function() {
        return {
            "x": this.x,
            "y": this.y
        };
    };
    
    p.character_id = 0;
    
    p.velocity = {
        "x": 0,
        "y": 0
    };
    
    p.initialize = function(character_id, char_spritesheet, frameOrAnimation, velX, velY) {

        this.sprite_initialize(char_spritesheet, frameOrAnimation);

        this.character_id = character_id;
        this.velocity = {
            "x": velX,
            "y": velY
        };
    };

    var lastXDir = 0;
    var lastYDir = 0;
    
    p.refreshSprite = function() {

        var vx = this.velocity.x;
        var vy = this.velocity.y;

        //STAY STILL?
        if(vx === 0 && vy === 0) {
            if(lastXDir > 0){
                this.gotoAndStop("right");
            }
            else if(lastXDir < 0){
                this.gotoAndStop("left");
            }
            else if(lastYDir > 0){
                this.gotoAndStop("down");
            }
            else if(lastYDir < 0){
                this.gotoAndStop("up");
            }
        }

        //MOVEMENT?
        if(vx < 0) {
            this.gotoAndPlay("run_left");
            lastXDir = -1;
        }
        else if(vx > 0) {
            this.gotoAndPlay("run_right");
            lastXDir = 1;
        }
        else {
            lastXDir = 0;
        }

        if(vy < 0) {
            this.gotoAndPlay("run_up");
            lastYDir = -1;
        }
        else if(vy > 0) {
            this.gotoAndPlay("run_down");
            lastYDir = 1;
        }
        else {
            lastYDir = 0;
        }

    };

    
})();