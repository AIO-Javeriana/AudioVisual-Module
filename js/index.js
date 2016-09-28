/**
 * Revisar y arreglar en el uml
 * AudioInput (nombres de las funciones, atributos necesitados y framework usado)
 * AudioOutput (eliminar funciones pause y stop, eliminar libreria soundJs)
 * AVM y Body part tendrán acceso a un objeto Activity que será el que diga que es lo que tiene que hacer cada módulo.
 * Revisar lo que hizo Stiven
 * diseñar y hacer los cuadros de dialogo para el servicio showDialogPrompt
 */

//Disables the annoying mic permission asking prompt in chrome.
var debug = true;

//VisualModule
class VisualModule {
    constructor( imageFiles ){
        this.availableSVGAssets = this.getAvailableSVGAssets();
        this.availableImages = imageFiles;
        this.renderedSVG = new SVGMorpheus('#svg-assets', {iconId: 'full-opened-eyes'});
    }

    renderSVGSet(SVGSet){
        utils_renderSVGSet(SVGSet,this.renderedSVG);
    }

    //probar con el while y el terminar la funcion de repetir ok?
    showPicture(image){
        $('#image-keeper').css('display','flex');
        $('#image-keeper #image img').attr('src','./assets/images/'+image);
        $('#image-keeper #close').on('click', 'button', function(){
            $('#image-keeper').css('display','none');
        })
    }

    getAvailableSVGAssets(){
        var availableSVGAssets = [];
        $('svg g').each(function(){
            var svgId = $(this).attr('id');
            availableSVGAssets.push(svgId);
        });
        return availableSVGAssets;
    }
}

/**
 * AudioOutput class: plays sounds.
 * */
class AudioOutputModule {

    /**
     * Initialize the AudioOutputModule
     * @param soundFiles string array containing the name of all the desired sounds to be played during script perform.
    */
    constructor( soundFiles ) {
        this.availableSounds = [];
        for(var i=0; i<soundFiles.length; i++){
            var sound = {
                name : soundFiles,
                audio : new Audio('assets/sounds/'+soundFiles)
            }
            this.availableSounds.push(sound);
        }
    }

    /**
     * Looks for a audio Object given a name
     * @param name sound to look for
     * @return audio Object corresponding to the sound name. null if not founded.
     */
    getSound(name){
        var sound = null;
        for( var i=0; i<this.availableSounds.length; i++ )
            if( this.availableSounds[i].name == name )
                return this.availableSounds[i].audio;
    }

    /**
     * plays a sound.
     * @param soundName name of the sound.
     * @param volume level of volume to play the sound.
     */
    play( soundName, volume ) {
        var audio = this.getSound(soundName);
        audio.volume = volume;
        audio.play();
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
            audioInputModule = new AudioInputModule(mediaStreamSource);

        }, function (error) {
            throw ('Error: you need to allow the application to use the microphone.' + error);
        });
    }

    var availableSounds = ['surprised.mp3'];
    var audioOutputModule = new AudioOutputModule(availableSounds);
    var visualModule = new VisualModule();
    var nId = 0;

    var toRender = [
        {
            id:'sneaky-looking-right',
            properties: {
                duration: 500,
                easing: 'linear',
                rotation: 'none'
            }
        },{
            id:'sneaky-looking-left',
            properties: {
                duration: 500,
                easing: 'linear',
                rotation: 'none'
            }
        }
    ];



    /*
    setInterval(function(){
        console.log(time)
        switch (nId) {
            case 0:
                visualModule.renderSVG('sneaky-looking-right',);
                break;
            case 1:
                visualModule.renderSVG('sneaky-looking-left',{
                    duration: 500,
                    easing: 'linear',
                    rotation: 'none'
                });
                break;
            default:
        }
        nId = (nId + 1)%2 ;
    }, 2000);
    */

    $(document).on('click','#boton', function(){
        //audioOutputModule.play('surprised.mp3', 0.1);
        visualModule.renderSVGSet(toRender);
    })
};
