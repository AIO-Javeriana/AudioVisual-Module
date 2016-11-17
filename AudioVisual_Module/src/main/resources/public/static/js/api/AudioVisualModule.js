class AudioVisualModule extends Module{

    constructor(host, port, optional){
        super('AudioVisualModule');
        this.availableModules = {
            audioOutputModule: new AudioOutputModule('audioOutputModule', optional.soundsInfo),
            visualModule: new VisualModule('visualModule', optional.imagesInfo),
            audioInputModule: new AudioInputModule('3', null),
            videoModule: null
        };
        //this.communicationChannel = new CommunicationChannel(host, port, this.availableModules);
    }   
}
