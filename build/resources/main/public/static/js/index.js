
window.onload = function init() {
    meSpeak.loadConfig("/static/js/external/textToSpeech/mespeak_config.json");
	meSpeak.loadVoice('/static/js/external/textToSpeech/voices/es-la.json');
    var audioVisualModule = new AudioVisualModule('10.42.0.119', '9090', {
        imagesInfo: availableImages,
        soundsInfo: availableSounds
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
};
