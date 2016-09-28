var audio_context,audioRecorder, recording;
class AudioOutput{
    constructor(){
        this.recording = false;
        aioUi.visual_module.canvas.element.addEventListener('click', this.toggle_record, false);

        audio_context = new AudioContext;
        navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
            //Informar error en pantalla
        });
    }

    toggle_record(){

        if(recording == false){
            this.recording = true;
            setTimeout(function(){
                console.log("Analysing");
                this.recording = false;
                audioRecorder.exportWAV(function(blob) {
                    // send to google
                });
            },3000);
            console.log("recording....");
            audioRecorder.clear();
            audioRecorder.record();
        }
    }
}

    