class Eye extends BodyPart{
    constructor(eyesColor){
        this.name = "Eye";
        this.eyesColor = eyesColor;
    }

    idle(){
        wink();
        blink();
    }
    
    happy(level, onFinish){
        console.log("happy at "+level*100+"%");
    }

    angry(level, onFinish){
        console.log("angry at "+level*100+"%");
    }

    confused(level, onFinish){
        console.log("confused at "+level*100+"%");
    }
    
    surprised(level, onFinish){
        console.log("surprised at "+level*100+"%");
    }

    sleeping(level, onFinish){
        console.log("sleeping at "+level*100+"%");
    }

    wink(){
        console.log('wink');
    }

    blink(){
        console.log('blink')
    }
}