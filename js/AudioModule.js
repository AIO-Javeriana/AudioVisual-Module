class AudioModule extends Module{

    constructor(id){
        super(id);
        this.audioInput = new audioInput();  
        this.registerSound("../sounds/surprised.mp3","SURPRISED");

    }

    setActiveCharacter(character){
        this.activeCharacter = character;
    }

    getActiveCharacter(){
        console.log(this.activeCharacter.name);
    }

    idle(onFinish){
        this.activeCharacter.idle();
    }

    happy(level, onFinish){
        this.activeCharacter.happy(level);
    }

    angry(level, onFinish){
        this.activeCharacter.angry(level);
    }

    confused(level, onFinish){
        this.activeCharacter.confused(level);
    }
    
    surprised(level, onFinish){
        this.activeCharacter.surprised(level);
    }

    sleeping(level, onFinish){
        this.activeCharacter.sleeping(level);
    }

    registerSound(path, name){
        this.audioInput.registerSound(path, name);
    }

}