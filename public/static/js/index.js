window.onload = function init() {
    meSpeak.loadConfig("./static/js/external/textToSpeech/mespeak_config.json");
	meSpeak.loadVoice('./static/js/external/textToSpeech/voices/es-la.json');
    var audioVisualModule = new AudioVisualModule('localhost', '9090', {
        imagesInfo: availableImages,
        soundsInfo: availableSounds,
        videosInfo: availableVideos,
        commandsInfo: voiceCommands
    });

    //Demo button
    $(document).on('click', '#demo', function () {
        audioVisualModule.availableModules.audioOutputModule.play('surprised', {volume: 1}, function(){
            console.log('termina audio');
        });
        audioVisualModule.availableModules.visualModule.renderSVGSet(idle(), function () {
            console.log('demo callback');
        });
    });
    
    //Demo: happy
    $(document).on('click', '#happy-demo', function () {
        
        audioVisualModule.availableModules.visualModule.renderSVGSet(toRender_happy, function () {
            console.log('happy-demo callback');
        });
        audioVisualModule.availableModules.visualModule.showDialogFrames(['Hola ','¿Cómo estás?'], { type: 'danger', tone: 'low', waitTime:'medium' }, function(){
            console.log('finished dialog frame');
        });
    });
    
    //Demo: Sad
    $(document).on('click', '#sad-demo', function () {
        audioVisualModule.availableModules.visualModule.renderSVGSet(toRender_sad, function () {
            console.log('sad-demo callback');
        });
    });
    
    $(document).on('click', '#disconnect', function () {
        audioVisualModule.availableModules.audioOutputModule = null;
    });
    
    //Demo: Talk
    $(document).on('click', '#talk-demo', function () {
        /*var msg = 'La Segunda Guerra Mundial fue un conflicto militar global que se desarrolló entre 1939 y 1945. En él se vieron implicadas la mayor parte de las naciones del mundo, incluidas todas las grandes potencias, agrupadas en dos alianzas militares enfrentadas: los Aliados de la Segunda Guerra Mundial y las Potencias del Eje.';
        
        audioVisualModule.availableModules.audioOutputModule.textToSpeech(msg, audioVisualModule.availableModules.visualModule, {}, function(){
            console.log('finished tts');
        });*/
        audioVisualModule.availableModules.videoModule.playVideo('digimon',null,function(){
            console.log('holi');
        });
    });
};
