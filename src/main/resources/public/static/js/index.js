
var blinking = false;

window.onload = function init() {
    meSpeak.loadConfig("./static/js/external/textToSpeech/mespeak_config.json");
	meSpeak.loadVoice('./static/js/external/textToSpeech/voices/es-la.json');
    var audioVisualModule = new AudioVisualModule('localhost', '9090', {
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

    //Demo: Talk
    $(document).on('click', '#talk-demo', function () {
        var msg = 'La Segunda Guerra Mundial fue un conflicto militar global que se desarrolló entre 1939 y 1945. En él se vieron implicadas la mayor parte de las naciones del mundo, incluidas todas las grandes potencias, agrupadas en dos alianzas militares enfrentadas: los Aliados de la Segunda Guerra Mundial y las Potencias del Eje. Fue la mayor contienda bélica de la Historia, con más de cien millones de militares movilizados y un estado de «guerra total» en que los grandes contendientes destinaron toda su capacidad económica, militar y científica al servicio del esfuerzo bélico, borrando la distinción entre recursos civiles y militares. Marcada por hechos de enorme repercusión histórica que incluyeron la muerte masiva de civiles, el Holocausto y el uso, por primera y única vez, de armas nucleares en un conflicto militar, la Segunda Guerra Mundial fue el conflicto más mortífero en la historia de la humanidad,1 con un resultado final de entre 50 y 70 millones de víctimas.';
        var timer_blink = window.setInterval(function(){
            if(!blinking){
                blinking = true;
                audioVisualModule.availableModules.visualModule.blink(function(){
                    blinking = false;
                })
            }
        }, 1500);
        
        audioVisualModule.availableModules.audioOutputModule.textToSpeech(msg,{}, function(){
            window.clearInterval(timer_blink)
        });
        /*while(talking){
            if(!blinking){
                console.log("prueba");
                blinking = true;
                
            }
        }
        audioVisualModule.availableModules.audioOutputModule.textToSpeech(msg,{}, function(){
            console.log('termino tts');
            talking = false;    
        });*/
        
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
