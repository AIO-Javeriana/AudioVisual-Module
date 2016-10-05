/**
 * Revisar y arreglar en el uml
 * AudioInput (nombres de las funciones, atributos necesitados y framework usado)
 * AudioOutput (eliminar funciones pause y stop, eliminar libreria soundJs)
 * AVM y Body part tendrán acceso a un objeto Activity que será el que diga que es lo que tiene que hacer cada módulo.
 * VisualModule: Añadir showDialogPrompt, showSVGSet, getAvailableSVGAssets. Borrar paint() del modelo de UML.
 * Hay que borrar el modelo de BodyPart del diagrama de uml, los servicios todos se ofrecen desde el módulo de comunicaciones.
 */

/*
 *  main block
 */

var availableSounds = ['surprised.mp3'];

var availableImages = ['landscape-test.jpg', 'portrait-test.jpg', 'small-size-test.jpg'];

var toRender = [
        {
            id:'sneaky-looking-right',
            properties: {
                duration: 500,
                easing: 'linear',
                rotation: 'none'
            },
            delay: 0
        },{
            id:'sneaky-looking-left',
            properties: {
                duration: 500,
                easing: 'linear',
                rotation: 'none'
            },
            delay: 500
        },{
            id:'full-opened-eyes',
            properties: {
                duration: 500,
                easing: 'linear',
                rotation: 'none'
            },
            delay: 500
        },{
            id:'full-closed-eyes',
            properties: {
                duration: 125,
                easing: 'quint-in',
                rotation: 'none'
            },
            delay: 0
        },{
            id:'full-opened-eyes',
            properties: {
                duration: 125,
                easing: 'quint-in',
                rotation: 'none'
            },
            delay: 0
        }
    ];

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
    navigator.getUserMedia({ audio: true }, function (stream) {
        audioContext = new AudioContext();
        var mediaStreamSource = audioContext.createMediaStreamSource(stream);
        mediaStreamSource.connect(audioContext.destination);

        //For now audioInput needs to be here to work correctly
        //audioInputModule = new AudioInputModule(mediaStreamSource);
        audioVisualModule = new AudioVisualModule('localhost','1234',{
            imagesInfo: availableImages,
            soundsInfo: availableSounds,
            audioStreamSource: mediaStreamSource
        });

    }, function (error) {
        throw ('Error: you need to allow the application to use the microphone.' + error);
    });
    
    var audioOutputModule = new AudioOutputModule('1', availableSounds);
    var visualModule = new VisualModule('2', availableImages);
    
    var communication_channel = new CommunicationChannel("localhost","1234",{
        visualModule:visualModule,
        audioOutputModule:audioOutputModule
    });

    $(document).on('click','#boton', function(){
         //audioOutputModule.play('surprised.mp3', 0.1);
         visualModule.showPicture('landscape-test.jpg');
     })
};
