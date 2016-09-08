var aioUi;

function init() {
    aioUi = new AioUi();
    //var myVar = setInterval(test, 4000);
    aioUi.happy(10,task_finished);
}

function test(){
    
    var dice = Math.floor(Math.random() * (100 - 1) + 1);
    if(dice == 2){
        aioUi.wink(task_finished);
    }else{
        aioUi.happy(10,task_finished);
    }
}


class Canvas {
    constructor(backgroundColor, height, width){
        this.width = width;
        this.height = height;
        this.element = document.getElementById('stage-canvas');
        $('canvas').css('background-color', backgroundColor);
    }
}

class Profile{
    constructor(gender, backgroundColor,eyesColor){
        this.gender = gender;
        this.backgroundColor = backgroundColor;
        this.eyesColor = eyesColor;
    }
}

class Visual_module{
    constructor(MODULE_ID, height, width, profile){
        this.MODULE_ID = MODULE_ID;
        this.canvas = new Canvas(profile.backgroundColor, height, width);
        var context = this.canvas.element.getContext('2d');
        context.lineWidth = 8;
        context.lineJoin = "round";
        this.stage = new createjs.Stage("stage-canvas");
        this.eyes = new Eyes(this.canvas,140,100,profile.eyes_color);
        this.stage.addChild(this.eyes.eye_left_shape);
        this.stage.addChild(this.eyes.eye_right_shape);
        this.stage.addChild(this.eyes.left_eye_rect);
        this.stage.addChild(this.eyes.right_eye_rect);
        
        this.stage.update();
    };
    
    surprised(onFinish){
        this.eyes.surprised(onFinish);
    }
    
    blink(onFinish){
        this.eyes.blink(onFinish);
    }
    
    wink(onFinish){
        this.eyes.wink(onFinish);
    }
    
    happy(lvl, onFinish){
        this.eyes.happy(lvl, onFinish);
    }
}

class Eyes{
    
    constructor(canvas,height,width,color){
        this.height = height;
        this.width = width;
        this.color = color;
        this.cornerSize = 30;
        this.spaceInBetween = 20;
        this.eyes_curvature = 0;
        
        this.left = {
            side : 'left',
            x : canvas.width/2 - this.width - this.spaceInBetween/2, 
            y : canvas.height/2 - this.height/2
        };
        
        this.right = {
            side : 'right',
            x : canvas.width/2 + this.spaceInBetween/2,
            y : canvas.height/2 - this.height/2
        };
        
        this.eye_left_shape = new createjs.Shape();
        this.eye_left_shape.graphics.beginFill(this.color);
        this.eye_left_shape.graphics.drawRoundRect(this.left.x, this.left.y, this.width, this.height, this.cornerSize);
        this.eye_left_shape.graphics.endFill();
    
        this.eye_right_shape = new createjs.Shape();
        this.eye_right_shape.graphics.beginFill(this.color);
        this.eye_right_shape.graphics.drawRoundRect(this.right.x, this.right.y, this.width, this.height, this.cornerSize);
        this.eye_right_shape.graphics.endFill();
        
        this.happyEyes_closed = new createjs.Shape();
        this.happyEyes_closed.graphics.beginFill(this.color);
        this.happyEyes_closed.graphics.arcTo(100, 100, 300, 350, this.width/2);
        this.happyEyes_closed.graphics.endFill();
        
        this.left_eye_rect = new createjs.Shape();
        this.left_eye_rect.graphics.beginStroke("#455A64");
        this.left_eye_rect.visible = false;
        this.left_eye_rect.graphics.moveTo(this.left.x, this.left.y+10).curveTo(this.left.x+(this.width/2), this.left.y-30, this.left.x+this.width, this.left.y+10);
        
        this.right_eye_rect = new createjs.Shape();
        this.right_eye_rect.graphics.beginStroke("#455A64");
        this.right_eye_rect.visible = false;
        this.right_eye_rect.graphics.moveTo(this.right.x, this.right.y+10).curveTo(this.right.x+(this.width/2), this.right.y-30, this.right.x+this.width, this.right.y+10);
        
    }
    
    happy(level, onFinish){
        createjs.Tween.get(this.eye_left_shape, {loop:false})
          .to({scaleY:0.05, y: this.left.y}, 450, createjs.Ease.getPowIn(7))
          .to({visible:false})
          .call(this.happy_recursive_function);

        createjs.Tween.get(this.eye_right_shape, {loop:false})
          .to({scaleY:0.05, y: this.right.y}, 450, createjs.Ease.getPowIn(7))
          .to({visible:false})
          
        createjs.Ticker.setFPS(100);
        createjs.Ticker.addEventListener("tick", tickHandler);
    }
    
    happy_recursive_function(){
        if(aioUi.visual_module.eyes.eyes_curvature >= 20){
            task_finished();
            return;
        }
        aioUi.visual_module.eyes.left_eye_rect.graphics.command.cpy = aioUi.visual_module.eyes.left.y-aioUi.visual_module.eyes.eyes_curvature;
        aioUi.visual_module.eyes.right_eye_rect.graphics.command.cpy = aioUi.visual_module.eyes.left.y-aioUi.visual_module.eyes.eyes_curvature;
        aioUi.visual_module.eyes.right_eye_rect.visible = true;
        aioUi.visual_module.eyes.eyes_curvature+=4;
        createjs.Tween.get(aioUi.visual_module.eyes.left_eye_rect)
        .to({visible:true})
        .call(aioUi.visual_module.eyes.happy_recursive_function);
    }
    
    blink(onFinish){
        createjs.Tween.get(this.eye_left_shape, {loop:false})
          .to({scaleY:0.05, y: this.left.y+(this.height/2)}, 300, createjs.Ease.getPowIn(7))
          .to({scaleY:1, y: 0}, 150, createjs.Ease.getPowIn(7))
          .wait(1500)
          .call(onFinish);
        
        createjs.Tween.get(this.eye_right_shape, {loop:false})
          .to({scaleY:0.05, y: this.right.y+(this.height/2)}, 300, createjs.Ease.getPowIn(7))
          .to({scaleY:1, y: 0}, 150, createjs.Ease.getPowIn(7))
          .wait(1500);
          
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", tickHandler);
    }
    
    surprised(onFinish){
        createjs.Tween.get(this.eye_left_shape)
          .to({scaleY:1.4, scaleX:1.4, x: this.eye_left_shape.x-(this.width*1.3),y:this.eye_left_shape.y-(this.height*0.6)}, 200)
          .wait(1500)
          .call(onFinish);
        //*
        createjs.Tween.get(this.eye_right_shape)
          .to({scaleY:1.4, scaleX:1.4, x: this.eye_right_shape.x-(this.width*1.5),y:this.eye_right_shape.y-(this.height*0.6)}, 200)
          .wait(1500)
          .call(onFinish);
        //*/
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", tickHandler);
    }
    
    wink(onFinish){
        createjs.Tween.get(this.eye_right_shape, {loop:false})
          .to({scaleY:0.05, y: this.left.y+(this.height/2)}, 500, createjs.Ease.getPowIn(7))
          .wait(300)
          .to({scaleY:1, y: 0}, 250, createjs.Ease.getPowIn(7))
          .call(onFinish);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", tickHandler);
    }
};

// SERVICES

function tickHandler() {
    aioUi.visual_module.stage.update();
}

