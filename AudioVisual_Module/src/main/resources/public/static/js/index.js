
window.onload = function init() {
    
    var audioVisualModule = new AudioVisualModule('http://localhost', '9090', {
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
};