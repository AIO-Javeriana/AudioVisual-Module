/**
 * AudioOutput class: plays sounds.
 * @author Fabián Andrés Merchán Jiménez
 * */
class AudioOutputModule extends Module{

    /**
     * Initialize the AudioOutputModule
     * @param soundFiles string array containing the name of all the desired sounds to be played during script perform.
    */
    constructor( id, soundFiles ) {
        super(id);
        this.availableSounds = [];
        for(var i=0; i<soundFiles.length; i++){
            var sound = {
                name : soundFiles,
                audio : new Audio('assets/sounds/'+soundFiles)
            }
            this.availableSounds.push(sound);
        }
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
