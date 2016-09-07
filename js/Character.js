class Character{

    constructor(name, profile){
        this.name = name;
        this.currentProfile = profile;
        this.bodyParts = [];
    }

    getName(){
        return this.name;
    }

    addBodyPart(bodyPart){
        this.bodyPart.push(bodyPart);
    }

    getAvailableBodyParts(){
        return this.bodyParts;
    }

}