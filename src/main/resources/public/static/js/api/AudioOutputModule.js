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
     *                  name[String]: name or tag for the sound file,
     *                  file[String]: name of the file
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
         *  @param name[String] Name of the sound to be played.
         *  @param properties[Object] Contains the properties of the sound to be played.
         *  {
         *      volume[float]: volume level of the sound, 0<=volume<=1, Default: 0.5.
         *  }
         */
        this.play = function( name, properties, callback ){
            var audio = this.getAudio(name);
            audio.volume = 0.5;
            if( typeof properties !== "undefined"){
                if( typeof properties.volume !== "undefined" && properties.volume != null && 0 <= properties.volume && properties.volume <= 1 ){
                    audio.volume = properties.volume;
                }
            }

            audio.addEventListener("ended", function(){
                callback();
            });

            audio.play();
        }

        /**
         * Makes a voice to say the text sent.
         * For more information see: https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
         * @param message[String]
         * @param options[Object] {
         *      volume[float]:  volume level of the voice. 0<= volume <=1. Default: 0.5
         *      pitch[float]:   specifies the speaking pitch 0.1 <= pitch <= 2. Default 2. 
         *      rate[float]:  specifies the speaking rate. 0 <= rate <= 2. Default: 1.
         * }
         * @param callback[function] function to be called when the speech finishes.
         * */
        var talking = false;
        this.textToSpeech= function(message, visualModule, options, callback){
            var talk_loop = window.setInterval(function(){
                if(!talking){
                    talking = true;
                    visualModule.talk(function(){
                        talking = false;
                    })
                }
            }, 650);
            
            meSpeak.speak(message, {variant:"whisper"},function(){
                window.clearInterval(talk_loop);
                callback();
            }); 
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

    /**
     * Eliminates accents from the text to be syntetized
     * @string[String] : Text to be formatted.   
     * @entityMap[Object] : Characters with accents list with their non accent representation. 
     */
    escapeHtml(string, entityMap) {
        return String(string).replace(/[áéíóúÁÉÍÓÚ?¿!¡]/g, function (s) {
            return entityMap[s];
        });
    }

}
