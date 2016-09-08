class Profile{

    constructor(name, gender, backgroundColor,eyesColor ){
        this.name = name;
        this.gender = gender;
        this.backgroundColor = backgroundColor;
        this.eyesColor = eyesColor;
    }

    getName(){
        return this.name;
    }

    getGender(){
        return this.gender;
    }

    getBackgroundColor(){
        return this.backgroundColor;
    }

    getEyesColor(){
        return this.eyesColor;
    }

}