/**
 * Revisar y arreglar en el uml
 * AudioInput (nombres de las funciones, atributos necesitados y framework usado)
 * AudioOutput (eliminar funciones pause y stop, eliminar libreria soundJs), el path no es manejable por el usuario.
 * AVM y Body part tendrán acceso a un objeto Activity que será el que diga que es lo que tiene que hacer cada módulo.
 * VisualModule: Añadir showDialogPrompt, showSVGSet, getAvailableSVGAssets. Borrar paint() del modelo de UML.
 * Hay que borrar el modelo de BodyPart del diagrama de uml, los servicios todos se ofrecen desde el módulo de comunicaciones.
 * ToDo:
 *  - pensar en la forma de como obtener los recursos de imagenes y audio, no pasandolasd desde el index. //
 *  - showVideo: ¿Otro módulo?, ¿Módulo visual? ¿Pero entonces como se conecta con el modulo de audio?. //check
 */

/*
 *  main block
 */

var availableImages = {
    path: './assets/images/',
    availableImageFiles: [
        {
            name: 'landscape',
            file: 'landscape-test.jpg'
        },{
            name: 'portrait',
            file: 'portrait-test.jpg'
        },{
            name: 'small',
            file: 'small-size-test.jpg'
        },{
            name: 'katy',
            url: 'http://multimedia.cdn.com.do/2016/08/Estudios-afirman-hombres-con-barba-son-m%C3%A1s-infieles4.jpg'
        }
    ],
    errorImage:{
        url: 'https://www.quia.com/files/quia/users/sstone13/Emergenciasmedicas/caerse.gif'
    }
};

var availableSounds = {
        path: './assets/sounds/',
        availableSoundFiles: [
            {
                name: 'surprised',
                file: 'surprised.mp3'
            }
        ]
};

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

var videos = {
    path: './assets/sounds/',
    availableVideoFiles:[
        {
            name: 'digimon',
            url: 'https://www.youtube.com/watch?v=b1uH4BnswKQ'
        },{
            name: 'dora',
            url: 'https://www.youtube.com/watch?v=EdgV1FMFDq4'
        }
    ],
    errorVideo: {
        url: 'https://www.youtube.com/watch?v=sDj72zqZakE'
    }
}

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
        /*
        /audioVisualModule = new AudioVisualModule('localhost','1234',{
            imagesInfo: availableImages,
            soundsInfo: availableSounds,
            audioStreamSource: mediaStreamSource
        });
        */

    }, function (error) {
        throw ('Error: you need to allow the application to use the microphone.' + error);
    });
    
    var audioOutputModule = new AudioOutputModule('1', availableSounds);
    var visualModule = new VisualModule('2', availableImages);
    var videoModule = new VideoModule('3',videos);
    
    /*
    var communication_channel = new CommunicationChannel("localhost","1234",{
        visualModule:visualModule,
        audioOutputModule:audioOutputModule
    });
    */

    $(document).on('click','#boton', function(){
         //audioOutputModule.play('surprised', {volume: 1});
         //visualModule.showPicture('katy');
         videoModule = new VideoModule()
         /*
         visualModule.renderSVGSet(toRender, function(){
             console.log('hola');
         });
         */
     })
};
