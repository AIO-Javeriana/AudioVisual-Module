class AudioVisualModule{
    
    constructor(){
        
        // Available profiles B9F6CA 43A047 o CFD8DC 455A64
        this.profiles = [];
        this.availableCharacters = [];

        this.currentProfile = null;
        this.addProfile('kike', 'Boy','#CFD8DC', '#455A64');
        this.addProfile('aleja', 'Girl','#FFEBEE', '#FF4081');
        this.setCurrentProfile('kike');

        this.addCharacter('aio', currentProfile);
        this.currentCharacter = null;
        this.setCurrentCharacter('aio');       

        // Visual Module
        this.visual_module = new Visual_module(this.currentCharacter, 400, 800);
        
        /*

        // Audio Module
        this.audio_module = new Audio_module("Audio_module",this);
        
        // Communications
        /*
        this.communication_channel =  new Communication_channel("http://localhost","9090", this);
        if(!this.communication_channel.connect(this.MODULE_ID)){
            //INFORMAR ERROR EN PANTALLA
        }
        //*/
        
        // testing
        //this.eyes.blink(task_finished);
        //this.visual_module.eyes.smile(10,task_finished);


    }
    
    surprised(onFinish){
        /*if(this.audio_module != null)
            this.audio_module.surprised(onFinish);
        if(this.visual_module != null)
            this.visual_module.surprised(onFinish);*/
    }

    idle(onFinish){
        //ToDo
    }
    
    happy(level, onFinish){
        /*if(this.visual_module != null)
            this.visual_module.happy(10,onFinish);*/
    }

    angry(level, onFinish){
        //ToDo
    }

    confused(level, onFinish){
        //ToDo
    }
    
    surprised(level, onFinish){
        //ToDo
    }

    sleeping(level, onFinish){
        //ToDo
    }

    addProfile(name, gender, backgroundColor, eyesColor){
        this.profiles.push( new Profile(name, gender, backgroundColor, eyesColor));
    }

    printProfiles(){
        console.log(this.profiles);
    }

    addCharacter(name){
        this.availableCharacters.push(new Character(name));
    }

    setCurrentProfile(name){
        for (var i = 0; i < this.profiles.length; i++) {
            if( this.profiles[i].getName() == name )
                this.currentProfile = this.profiles[i];
        }
    }

    setCurrentCharacter(name){
        for (var i = 0; i < this.profiles.length; i++) {
            if( this.availableCharacters[i].getName() == name )
                this.currentCharacter = this.availableCharacters[i];
        }
    }

    addCharacter(name){
        this.availableCharacters.push(new Character('aio'))
    }

}