/**
 * AudioOutput class: plays sounds.
 * @author Fabián Andrés Merchán Jiménez
 * */
class AudioOutputModule extends Module {

    /**
     * Initialize the AudioOutputModule
     * @param soundFiles string array containing the name of all the desired sounds to be played during script perform.
     */
    constructor( id, soundFiles ) {
        super(id);
        this.availableSounds = createAudioObjects(soundFiles);
    }

    /**
     *  Delegates the task of create the audio objects, to createAudioObjectsFromArray
     *  if there is an array containing the soundFles and is sent.
     *  Note: The sound files must be stored in the path "/assets/sounds."
     *  @param soundObject The soundObject structure is the following:
     *  soundObject = {
     *       soundFiles: string array containing the name of all the desired sounds to be played during script perform.
     *       path: url where the sound files are hosted.
     *  }
     */
    createAudioObjects(soundObject){
        if(soundObject.path == null)
            createAudioObjectsFromFolder(soundObject.soundFiles);
        else
            createAudioObjectsFromArray(soundObject.path);
    }

    /**
     *  Creates audio objects if a array containing the audio file's name is provided.
     *  Note: The sound files must be stored in the path "/assets/sounds."
     */
    createAudioObjectsFromArray(soundFiles){
        var temp = [];
        for(var i=0; i<soundFiles.length; i++){
            var sound = {
                name : soundFiles,
                audio : new Audio('assets/sounds/'+soundFiles)
            }
            temp.push(sound);
        }
        return temp;
    }

    /**
     * Creates audio objects from a path wich contains audioFiles.
     * @throws unimplementedFunction Because the function doesn´t need to be implemented yet.
     */
    createAudioObjectsFromFolder(path){
        var unimplementedFunction = 'unimplemented function';
        throw unimplementedFunction;
    }

    /**
     * Looks for a audio Object given a name
     * @param name sound to look for
     * @return audio Object corresponding to the sound name. null if not founded.
     */
    getSound(name){
        var sound = null;
        for( var i=0; i<this.availableSounds.length; i++ )
            if( this.availableSounds[i].name == name )
                return this.availableSounds[i].audio;
    }

    /**
     * plays a sound.
     * @param soundName name of the sound.
     * @param volume level of volume to play the sound.
     */
    play( soundName, volume ) {
        var audio = this.getSound(soundName);
        audio.volume = volume;
        audio.play();
    }
}
