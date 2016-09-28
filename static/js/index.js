/**
 * Revisar y arreglar en el uml
 * AudioInput (nombres de las funciones, atributos necesitados y framework usado)
 * AudioOutput (eliminar funciones pause y stop, eliminar libreria soundJs)
 * AVM y Body part tendrán acceso a un objeto Activity que será el que diga que es lo que tiene que hacer cada módulo.
 * Revisar lo que hizo Stiven
 * diseñar y hacer los cuadros de dialogo para el servicio showDialogPrompt.
 * VisualModule: Añadir showDialogPrompt, showSVGSet, getAvailableSVGAssets. Borrar paint() del modelo de UML.
 * Hay que borrar el modelo de BodyPart del diagrama de uml, los servicios todos se ofrecen desde el módulo de comunicaciones.
 */

//Disables the annoying mic permission asking prompt in chrome.
var debug = true;

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
                duration: 250,
                easing: 'quint-in',
                rotation: 'none'
            },
            delay: 0
        },{
            id:'full-opened-eyes',
            properties: {
                duration: 250,
                easing: 'quint-in',
                rotation: 'none'
            },
            delay: 0
        }
    ];

    $(document).on('click','#boton', function(){
        //audioOutputModule.play('surprised.mp3', 0.1);
        visualModule.renderSVGSet(toRender);
    })
};
