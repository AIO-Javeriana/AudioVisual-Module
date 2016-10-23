class AudioVisualModule extends Module{

    constructor(host, port, optional){
        super('AudioVisualModule');
        this.availableModules = {
            audioOutputModule: new AudioOutputModule('audioOutputModule', optional.soundsInfo),
            visualModule: new VisualModule('visualModule', optional.imagesInfo),
            //audioInputModule: new AudioInputModule('audioInputModule', optional.audioStreamSource),
            videoModule: null
        };
        this.communicationChannel = new CommunicationChannel(host, port, this.availableModules);
    }   
}
