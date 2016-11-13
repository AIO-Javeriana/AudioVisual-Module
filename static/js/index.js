/**
 * Revisar y arreglar en el uml
 */

var visualModule = new VisualModule('1', availableImages);
var audioOutputModule = new AudioOutputModule('2', availableSounds);

var audioInputModule = new AudioInputModule('3', null);
audioInputModule.speechToText(audioInputModule.answer);
window.onload = function init() {

    //Asking browser for mic permission

    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;
    } catch (e) {
        throw 'No web audio support in this browser!';
    }

    //Resourses for mic correctly working
    //navigator.getUserMedia({ audio: true }, function (stream) {
    //audioContext = new AudioContext();
    /*audioVisualModule = new AudioVisualModule('http://localhost', '9090', {
        imagesInfo: availableImages,
        soundsInfo: availableSounds
    });*/

    //}, function (error) {
    //throw ('Error: you need to allow the application to use the microphone.' + error);
    //});

    /*$(document).on('click', '#boton', function () {
        //audioOutputModule.play('surprised', {volume: 1});
        visualModule.showPicture('katy', { timeout: 5000 }, function () {
            alert('done');
        });
        /* videoModule.showVideo('digimon',{autoplay: true}, function(){
                alert('done');
            });*/
        /*
        visualModule.renderSVGSet(toRender, function(){
            console.log('hola');
        });
        */
    //});
};

/**
 * Functions for buttons response
 */

//Demo button
$(document).on('click', '#demo', function () {
    audioOutputModule.play('surprised', {volume: 1}, function(){
        console.log('termina audio');
    });
    visualModule.renderSVGSet(idle(), function () {
        console.log('hola');
    });
});

//Demo: happy
$(document).on('click', '#happy-demo', function () {
    visualModule.renderSVGSet(toRender_happy, function () {
        console.log('hola');
    });
});

//Demo: Sad
$(document).on('click', '#sad-demo', function () {
    visualModule.renderSVGSet(toRender_sad, function () {
        console.log('hola');
    });
})