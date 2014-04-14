
var Agriculture = Agriculture || {};

Agriculture.Character = function(id, sprite, velX, velY) {
    this.id = id;
    this.sprite = sprite;
    this.velocity = {
        "x": velX,
        "y": velY
    };
    this.position = function() {
        return {
            "x": this.sprite.x,
            "y": this.sprite.y
        };
    };
    
    var lastXDir = 0;
    var lastYDir = 0;
    
    this.refreshSprite = function() {
        
        var vx = this.velocity.x;
        var vy = this.velocity.y;
        
        //STAY STILL?
        if(vx === 0 && vy === 0) {
            if(lastXDir > 0){
                this.sprite.gotoAndStop("right");
            }
            else if(lastXDir < 0){
                this.sprite.gotoAndStop("left");
            }
            else if(lastYDir > 0){
                this.sprite.gotoAndStop("down");
            }
            else if(lastYDir < 0){
                this.sprite.gotoAndStop("up");
            }
        }
        
        //MOVEMENT?
        if(vx < 0) {
            this.sprite.gotoAndPlay("run_left");
            lastXDir = -1;
        }
        else if(vx > 0) {
            this.sprite.gotoAndPlay("run_right");
            lastXDir = 1;
        }
        else {
            lastXDir = 0;
        }
        
        if(vy < 0) {
            this.sprite.gotoAndPlay("run_up");
            lastYDir = -1;
        }
        else if(vy > 0) {
            this.sprite.gotoAndPlay("run_down");
            lastYDir = 1;
        }
        else {
            lastYDir = 0;
        }
        
    };
};
