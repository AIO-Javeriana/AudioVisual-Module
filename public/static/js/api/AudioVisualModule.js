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
        //this.communicationChannel = new CommunicationChannel(host, port, this.availableModules);
    }

    startAnnyang(audioOutputModule){
        var tts = function(texto){
            audioOutputModule.textToSpeech(texto, null, null, function(){});
        }

        if (annyang) {
            var commands = {
                'hola aio': function() { tts('Hola amigo') },
                'hola miguel': function() { tts('Hola amigo') },
                'hola': function() { tts('Hola amigo'); },
                'hello': function() { tts('Hola amigo'); },
                'como te llamas': function() {tts('Mi nombre es AIO');}
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
