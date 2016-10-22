/**
 * AudioOutput class: plays sounds.
 * @author Fabián Andrés Merchán Jiménez
 * */

class AudioOutputModule extends Module {

    /**
     *  Initialize the AudioOutputModule
     *  @param soundFiles Object with an string array containing the name of all
     *      the desired sounds to be played during script perform and the path where the files are gonna be hosted.
     *      {
     *          path: path where the audio files are hosted,
     *          availableSoundFiles:[
     *              {
     *                  name: name or tag for the sound file,
     *                  file: name of the file
     *              }
     *          ]
     *      }
     */
    constructor( id, soundFiles ) {
        super(id);
        if(soundFiles.path != null){
            this.resourcesPath = soundFiles.path;
            this.availableSounds = this.createAudioObjects(soundFiles.availableSoundFiles);
        }
    
        /**
         *  Plays a sound.
         *  @param name Name of the sound to be played.
         *  @param properties Object containing the properties of the sound to be played.
         *  {
         *      volume: volume level of the sound
         *  }
         */
        this.play = function( name, properties ) {
            var audio = this.getAudio(name);
            audio.volume = 0.5;
            if( typeof properties !== "undefined"){
                if( typeof properties.volume !== "undefined" && properties.volume != null && 0 <= properties.volume && properties.volume <= 1 ){
                    audio.volume = properties.volume;
                }
            }
            audio.play();
        }

        this.textToSpeech= function(message, options, callback){
            var entityMap = {
                "á": "a",
                "é": "e",
                "í": "i",
                'ó': 'o',
                "ú": 'u',
                "Á": 'A',
                "É": "E",
                "Í": "I",
                "Ó": "O",
                'Ú': 'U;',
                "?": '',
                "¿": '',
                "!": '',
                "¡": ''
            };

            message = this.escapeHtml(message, entityMap);
            var properties = {
                message: '', 
                volume: 0.5,
                rate: 1,
                pitch: 2,
                onend: function(){}
            }

            properties.message = message;
            if(typeof options !== "undefined"){
                if(typeof options.volume !== "undefined")
                    properties.volume = options.volume;
                if(typeof options.rate !== "undefined")
                    properties.rate = options.rate;
                if(typeof options.pitch !== "undefined")
                    properties.pitch = options.pitch;
                if(typeof options !== "undefined")
                    properties.onend = callback;
            }
            
            if('speechSynthesis' in window){
                var msg = new SpeechSynthesisUtterance(message);
                var voices = window.speechSynthesis.getVoices();
                
                msg.voiceURI = 'native';
                msg.volume = properties.volume;
                msg.rate = properties.rate;
                msg.pitch = properties.pitch;
                msg.text = properties.message;
                msg.lang = 'es-ES';
                msg.onend = properties.onend;

                speechSynthesis.speak(msg);
            }else{
                throw 'Text to speech not available'
            }
        }

    }

    /**
     *  If an array of available sound files is not provided, it will try to retrieve
     *  the information of available sound files.
     *  @param availableSoundFiles object which contains the information of available
     *      sound resources.
     *      {
     *           name: name or tag of the sound,
     *           file: name of the audio file
     *       }
     */
     createAudioObjects(availableSoundFiles){
        if(availableSoundFiles != null){
            return this.createAudioObjectsFromArray(availableSoundFiles);
        }else{
            try {
                return this.createAudioObjectsFromFolder();
            } catch (e) {
                console.log(e);
            }
        }
    }

    /**
     *  Creates the audio objects if an array with the sound information is provided.
     */
    createAudioObjectsFromArray(availableSoundFiles){
        var temp = [];
        for(var i=0; i<availableSoundFiles.length; i++){
            var sound = {
                name : availableSoundFiles[i].name,
                file : availableSoundFiles[i].file,
                audio : new Audio(this.resourcesPath+availableSoundFiles[i].file)
            }
            temp.push(sound);
        }
        return temp;
    }

    /**
     * Creates audio objects from a path wich contains audioFiles.
     * @throws unimplementedFunction Because the function doesn´t need to be implemented yet.
     */
    createAudioObjectsFromFolder(){
        var unimplementedFunction = 'Unimplemented function exception';
        throw unimplementedFunction;
    }

    /**
     *  Looks for an audio Object given a name
     *  @param name sound to look for
     *  @return audio Object corresponding to the sound name. null if not founded.
     */
    getAudio(name){
        var sound = null;
        for( var i=0; i<this.availableSounds.length; i++ )
            if( this.availableSounds[i].name == name )
                sound = this.availableSounds[i].audio;
        return sound;
    }

    escapeHtml(string, entityMap) {
        return String(string).replace(/[áéíóúÁÉÍÓÚ?¿!¡]/g, function (s) {
            return entityMap[s];
        });
    }

}
