class AudioInput{
    
    constructor(){
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        this.registerSounds():
    }

    registerSound(path, name){
        createjs.Sound.registerSound(path, name);
    }

    idle(onFinish){
        //ToDo
    }

    happy(level, onFinish){
        //ToDo
    }

    angry(level, onFinish){
        //ToDo
    }

    confused(level, onFinish){
        //ToDo
    }
    
    surprised(level, onFinish){
        createjs.Sound.play("SURPRISED");
    }

    sleeping(level, onFinish){
        //ToDo
    }

    registerSound(path, name){
        createjs.Sound.registerSound(path, name);
    }
}