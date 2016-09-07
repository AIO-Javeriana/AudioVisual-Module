class VisualModule extends module{
    constructor(character, width, length){
        this.activeCharacter = null;
        setActiveCharacter(character);
        this.canvas = new Canvas(width, length);
    }

    setActiveCharacter(character){
        this.activeCharacter = character;
    }

    getActiveCharacter(){
        console.log(this.activeCharacter.name);
    }
}