/**
 * AudioInput class: records and saves recordings when asked
 * AudioInput uses Matt Diamond's RecorderJS: https://github.com/mattdiamond/Recorderjs
 * if streaming needed see Chris-Rudmin's forked RecorderJs: https://github.com/chris-rudmin/Recorderjs
 * @author Fabián Andrés Merchán Jiménez
 **/

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
