class Character{

    constructor(name, profile){
        this.name = name;
        this.currentProfile = profile;
        this.bodyParts = [];

        this.addBodyPart(new Eyes('Eyes'));
    }

    getName(){
        return this.name;
    }

    addBodyPart(bodyPart){
        this.bodyParts.push(bodyPart);
    }

    getAvailableBodyParts(){
        return this.bodyParts;
    }

    idle(onFinish){
        for (var i = 0; i < this.bodyParts.length; i++)          
            this.bodyParts[i].idle(onFinish);
    }
    
    happy(level, onFinish){
        for (var i = 0; i < this.bodyParts.length; i++)          
            this.bodyParts[i].happy(level, onFinish);
    }

    angry(level, onFinish){
        for (var i = 0; i < this.bodyParts.length; i++)          
            this.bodyParts[i].angry(level, onFinish);
    }

    confused(level, onFinish){
        for (var i = 0; i < this.bodyParts.length; i++)          
            this.bodyParts[i].confused(level, onFinish);
    }
    
    surprised(level, onFinish){
        for (var i = 0; i < this.bodyParts.length; i++)          
            this.bodyParts[i].surprised(level, onFinish);
    }

    sleeping(level, onFinish){
        for (var i = 0; i < this.bodyParts.length; i++)          
            this.bodyParts[i].sleeping(level, onFinish);
    }
}