class Eyes extends BodyPart{

    constructor(name, eyesColor, canvas){
        super(name);
        this.eyesColor = eyesColor;
        this.idleAnimationsNumber = 2;
    }

    idle(){
        var choice = Math.floor((Math.random() * this.idleAnimationsNumber) + 1);
        switch (choice) {
            case 1:
                this.wink();
                break;
            case 2:
                this.blink();
                break;
            default:
                this.blink();
                break;
        }
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