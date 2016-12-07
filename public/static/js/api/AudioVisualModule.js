class AudioVisualModule extends Module{

    constructor(host, port, optional){
        super('AudioVisualModule');
        this.availableModules = {
            audioOutputModule: new AudioOutputModule('audioOutputModule', optional.soundsInfo),
            visualModule: new VisualModule('visualModule', optional.imagesInfo),
            audioInputModule: new AudioInputModule('audioInputModule'),
            videoModule: new VideoModule('videoModule', optional.videosInfo)
        };
        this.startAnnyang(this.availableModules.audioOutputModule);
        this.communicationChannel = new CommunicationChannel(host, port, this.availableModules);
    }

    startAnnyang(audioOutputModule){
        var tts = function(texto){
            audioOutputModule.textToSpeech(texto, null, null, function(){});
        }

        var started = false;

        if (annyang) {
            var commands = {
                'hola aio': function() { tts('Hola amigo') },
                'hola miguel': function() { tts('Hola amigo') },
                'hola': function() { tts('Hola amigo'); },
                'hello': function() { tts('Hola amigo'); },
                'what\'s your name': function() {tts('Mi nombre es AIO');},
                'start': function(){
                    var text = 'Hola, yo soy AIO y les doy la bienvenida a la sustentación del trabajo de grado de Stiven Avila, Miguel Bermeo y Fabian Merchán, llamado plataforma de dramatización robótica modular, dirigida por Alejandra gonzalez y Enrique Gonzalez.';
                    //var text = 'stiven hijueputa';
                    if(!started){
                        tts(text);
                        started = true;
                    }
                },
                'thanks': function(){ tts('a ti, gracias'); }
            };

            annyang.addCommands(commands);
            
            annyang.start();

            annyang.addCallback('result', function(phrases) {
                console.log(phrases[0]);
                for(var i=0; i<phrases.length; i++ ){
                    console.log(phrases[i]);
                }
            });
        }
    }
}
