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
        this.recording = false;
        /*this.record = new Recorder(mediaStreamSource, {
            workerPath: "./js/external/recorderWorker.js"
        });*/
    
        /**
         * Starts to record.
         */
        this.startRecording = function(){
            this.record.clear();
            this.record.record();
        }

        /**
         * Stops the recording.
         */
        this.stopRecording = function() {
            this.record.stop();
        }

        /**
         * Prepares the recording file to be downloaded.
         * @param recording's name
         */
        this.exportRecording = function(name) {
            this.record.exportWAV(function (blob) {
                var url = URL.createObjectURL(blob);
                var download = document.createElement('a');
                download.href = url;
                download.download = name + '.wav';
                download.click();
            });
        }

        /**
         * A play, stop and exportRecording implementation, if not recording
         * starts to record. If recording, stops and saves the recording.
         * @param name recording's name
         */
        this.toggleRecord = function(name){
            if (!this.recording) {
                this.startRecording();
            } else {
                this.stopRecording();
                this.exportRecording(name);
            }
            this.recording = !this.recording;
        }
        
        
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
