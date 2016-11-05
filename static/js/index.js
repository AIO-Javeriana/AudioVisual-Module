/**
 * Revisar y arreglar en el uml
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
        }, {
            name: 'portrait',
            file: 'portrait-test.jpg'
        }, {
            name: 'small',
            file: 'small-size-test.jpg'
        }, {
            name: 'katy',
            url: 'http://multimedia.cdn.com.do/2016/08/Estudios-afirman-hombres-con-barba-son-m%C3%A1s-infieles4.jpg'
        }
    ],
    errorImage: {
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


var videos = {
    path: './assets/sounds/',
    availableVideoFiles: [
        {
            name: 'digimon',
            url: 'https://www.youtube.com/watch?v=b1uH4BnswKQ'
        }, {
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
    //navigator.getUserMedia({ audio: true }, function (stream) {
    //audioContext = new AudioContext();
    /*audioVisualModule = new AudioVisualModule('http://localhost', '9090', {
        imagesInfo: availableImages,
        soundsInfo: availableSounds
    });*/

    //}, function (error) {
    //throw ('Error: you need to allow the application to use the microphone.' + error);
    //});

    var visualModule = new VisualModule('1', availableImages);
    var audioOutputModule = new AudioOutputModule('2', availableSounds);

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

    var pressed = false;
    $('#menu').on('click', '#main', function () {
        var $img = $(this).find('img');
        var position = 0;
        if (!pressed) {
            $(this).css('transition-duration', '0.3s');
            $(this).css('transition-timing-function', 'linear');
            $(this).css('transform', 'scale(0.7,0.7)');
            $img.attr('src', './static/imgs/clear_black_100px.png');
        } else {
            $(this).css('transition-duration', '0.3s');
            $(this).css('transition-timing-function', 'linear');
            $(this).css('transform', 'scale(1.2,1.2)');
            $img.attr('src', './static/imgs/menu_black_100px.png');
        }

        $('li button').each(function () {
            if (!pressed)
                position += 80;
            $(this).css('transition-duration', '0.5s');
            $(this).css('transition-timing-function', 'ease');
            $(this).css('transform', 'translate(0px,' + position + 'px)');
        });
        pressed = !pressed;
    });

    $(document).on('click', '#clear', function () {
        audioOutputModule.play('surprised', {volume: 1}, function(){
            console.log('termina audio');
        });
        visualModule.renderSVGSet(idle(), function () {
            console.log('hola');
        });
    });
    $(document).on('click', '#power', function () {
        visualModule.renderSVGSet(toRender_sad, function () {
            console.log('hola');
        });
    });
    $(document).on('click', '#menuu', function () {
        visualModule.renderSVGSet(toRender_happy, function () {
            console.log('hola');
        });
    })
};

function idle() {
    var number = Math.floor((Math.random() * 5) + 1); //Número entre uno y tres
    switch (number) {
        case 1:
            return sneakyLookingRight;
        case 2:
            return sneakyLookingLeft;
        default:
            return blink;
    };
}

