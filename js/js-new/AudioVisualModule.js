class AudioVisualModule{
    
    constructor(){
        
        this.height = 400;
        this.width = 800;

        // Available profiles B9F6CA 43A047 o CFD8DC 455A64
        this.profiles = [];
        this.availableCharacters = [];

        this.currentProfile = null;
        this.addProfile('kike', 'Boy','#CFD8DC', '#FFFFFF');
        this.addProfile('aleja', 'Girl','#FFEBEE', '#FF4081');
        this.setCurrentProfile('kike');
        this.addCharacter('aio', this.currentProfile);
        this.currentCharacter = null;
        this.setCurrentCharacter('aio');       

        // Visual Module
        this.visualModule = new VisualModule(1, this.currentCharacter, this.height, this.width, this.currentProfile);
        
        /*

        // Audio Module
        this.audioModule = new Audio_module("Audio_module",this);
        
        // Communications
        /*
        this.communication_channel =  new Communication_channel("http://localhost","9090", this);
        if(!this.communication_channel.connect(this.MODULE_ID)){
            //INFORMAR ERROR EN PANTALLA
        }
        //*/
    }

    idle(){
        this.visualModule.idle();
    }

    addProfile(name, gender, backgroundColor, eyesColor){
        this.profiles.push( new Profile(name, gender, backgroundColor, eyesColor));
    }

    printProfiles(){
        console.log(this.profiles);
    }

    addCharacter(name, profile){
        this.availableCharacters.push(new Character(name, profile));
    }

    setWidth(width){
        this.width=width;
    }
    
    getWidth(){
        return width;
    }

    setHeight(height){
        this.height=height;
    }
    
    getHeight(){
        return height;
    }

    setCurrentProfile(name){
        for (var i = 0; i < this.profiles.length; i++) {
            if( this.profiles[i].getName() == name )
                this.currentProfile = this.profiles[i];
        }
    }

    setCurrentCharacter(name){
        for (var i = 0; i < this.availableCharacters.length; i++) {
            if( this.availableCharacters[i].getName() == name )
                this.currentCharacter = this.availableCharacters[i];
        }
    }

    addCharacter(name){
        this.availableCharacters.push(new Character('aio'))
    }

}