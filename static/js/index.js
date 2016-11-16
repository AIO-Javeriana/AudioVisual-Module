window.onload = function init() {
    /*audioVisualModule = new AudioVisualModule('http://localhost', '9090', {
        imagesInfo: availableImages,
        soundsInfo: availableSounds
    });*/
};

/**
 * Functions for buttons response, just for testings ans demonstration purposes.
 */
//var visualModule = new VisualModule('1', availableImages);
var audioOutputModule = new AudioOutputModule('2', availableSounds);
var audioInputModule = new AudioInputModule('3', null);

/*audioInputModule.answer(function(data, callback){
    audioOutputModule.textToSpeech(data, null, callback);    
});*/


//Demo button
$(document).on('click', '#demo', function () {
    audioOutputModule.play('surprised', {volume: 1}, function(){
        console.log('termina audio');
    });
    visualModule.renderSVGSet(idle(), function () {
        console.log('demo callback');
    });
});

//Demo: happy
$(document).on('click', '#happy-demo', function () {
    visualModule.renderSVGSet(toRender_happy, function () {
        console.log('happy-demo callback');
    });
    visualModule.showDialogFrames(['Hola ','¿Cómo estás?'], { type: 'danger', tone: 'low', waitTime:'medium' }, function(){
        console.log('finished dialog frame');
    });
});

//Demo: Sad
$(document).on('click', '#sad-demo', function () {
    visualModule.renderSVGSet(toRender_sad, function () {
        console.log('sad-demo callback');
    });
})