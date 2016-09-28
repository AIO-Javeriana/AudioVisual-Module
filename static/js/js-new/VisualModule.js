class VisualModule extends Module{

    constructor(id, character, width, length, profile){
        super(id);
        this.activeCharacter = null;
        this.setActiveCharacter(character);
        this.activeProfile = profile;
        this.canvas = new Canvas(width, length, this.activeProfile.getBackgroundColor());
        this.activeCharacter.addBodyPart(new Eyes(this.canvas,140,100,this.activeProfile.getEyesColor() ));
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
}