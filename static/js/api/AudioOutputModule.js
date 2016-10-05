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
     *                  file: name of the file.
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
     *  Plays a sound.
     *  @param name Name of the sound to be played.
     *  @param properties Object containing the properties of the sound to be played.
     *  {
     *      volume: volume level of the sound
     *  }
     */
    play( name, properties ) {
        var audio = this.getAudio(name);
        audio.volume = 0.5;
        if( typeof properties !== "undefined"){
            if( typeof properties.volume !== "undefined" && properties.volume != null && 0 <= properties.volume && properties.volume <= 1 ){
                audio.volume = properties.volume;
            }
        }
        audio.play();
    }
}
