
var audio_context,audioRecorder, recording;

class Audio_module{
    
    constructor(MODULE_ID, aioUi){
        this.MODULE_ID = MODULE_ID;
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
        
        audio_context = new AudioContext;
        navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
            //Informar error en pantalla
        });
        recording = false;
        aioUi.visual_module.canvas.element.addEventListener('click', this.toggle_record, false);
        createjs.Sound.registerSound("../sounds/surprised.mp3", "SURPRISED");
    };
    
    startUserMedia(stream) {
        var input = audio_context.createMediaStreamSource(stream);
        audioRecorder = new Recorder(input);
    }
    
    toggle_record(){
    
        if(recording == false){
            recording = true;
            setTimeout(function(){
                console.log("Analysing");
                recording = false;
                audioRecorder.exportWAV(function(blob) {
                    // send to google
                });
            },3000);
            console.log("recording....");
            audioRecorder.clear();
            audioRecorder.record();
        }
    }
    
    
    surprised(onFinish){
        createjs.Sound.play("SURPRISED");
    }
    
}
