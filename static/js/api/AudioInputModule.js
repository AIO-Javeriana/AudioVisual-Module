/**
 * AudioInput class: records and saves recordings when asked
 * AudioInput uses Matt Diamond's RecorderJS: https://github.com/mattdiamond/Recorderjs
 * if streaming needed see Chris-Rudmin's forked RecorderJs: https://github.com/chris-rudmin/Recorderjs
 * @author Fabián Andrés Merchán Jiménez
 **/

class AudioInputModule extends Module{

    /**
     * @param mediaStreamSource media stream source needed to record.
     */
    constructor(id, mediaStreamSource) {
        super(id);        
        
        this.speechToText = function(callback){
            var recognition = new webkitSpeechRecognition();
            recognition.onresult = function(event) { 
                for(var i = 0; i < event.results[0].length; i++){
                    if(event.results[i].isFinal){
                        for(var j = 0; j < event.results[i].length; j++){
                            callback(event.results[i][j].transcript);
                        };
                    }
                };
            }

            recognition.onerror = function(event) {
                console.log(event.error);
            };
            
            recognition.start();
        }
        
        this.answer = function(question){
            console.log(question);
        }

    }
}
