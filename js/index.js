/**
 * Revisar y arreglar en el uml
 * AudioInput (nombres de las funciones, atributos necesitados y framework usado)
 * AudioOutput ()
 */

var debug = true;

//AudioOutput class
class AudioOutput {
    contructor() {

    }

    play() {

    }

    pause() {

    }

    stop() {

    }
}

/**
 * AudioInput class: records and saves recordings when asked
 * AudioInput uses Matt Diamond's RecorderJS: https://github.com/mattdiamond/Recorderjs
 * if streaming needed see Chris-Rudmin's forked RecorderJs: https://github.com/chris-rudmin/Recorderjs
 * */
class AudioInputModule {

    /**
     * @param source media stream source needed to record.
     */
    constructor(mediaStreamSource) {
        this.recording = false;
        this.record = new Recorder(mediaStreamSource, {
            workerPath: "/js/recorderWorker.js"
        });
    }

    /**
     * Pauses a recording. Not implemented yet since RecorderJS doesn't have an implementation.
     */
    pauseRecording() {
        throw 'not implemented yet';
    }

    /**
     * Start recording. The function it's explained itself by the name.
     */
    startRecording() {
        this.record.clear();
        this.record.record();
    }

    /**
     * Stop recording. The function it's explained itself by the name.
     */
    stopRecording() {
        this.record.stop();
    }

    /**
     * Prepares the recording to be downloaded.
     * @param recording's name
     */
    exportRecording(name) {
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
     * starts to record. If not, stops and saves the recording.
     * @param name recording's name
     */
    toggleRecord(name) {
        if (!this.recording) {
            this.startRecording();
        } else {
            this.stopRecording();
            this.exportRecording(name);
        }
        this.recording = !this.recording;
    }
}

/*
 *  main block 
 */
window.onload = function init() {

    //Asking browser for mic permission
    if (!debug) {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
            window.URL = window.URL || window.webkitURL;
        } catch (e) {
            throw 'No web audio support in this browser!';
        }

        //Resourses for mic correctly working
        navigator.getUserMedia({ audio: true }, function (stream) {
            audioContext = new AudioContext();
            var mediaStreamSource = audioContext.createMediaStreamSource(stream);
            mediaStreamSource.connect(audioContext.destination);

            //For now audioInput needs to be here to work correctly
            audioInput = new AudioInputModule(mediaStreamSource);

        }, function (error) {
            throw ('Error: you need to allow the application to use the microphone.' + error);
        });
    }

};

/*  
    var morfeo = new  SVGMorpheus('#face-set', {iconId: 'medium-closed-happy-eyes'});
    morfeo.to('full-closed-happy-eyes', {rotation: 'none', duration: 500});
*/