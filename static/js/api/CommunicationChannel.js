
class CommunicationChannel{
    constructor(hostname, port,modules){
        this.ID = "AUDIO_VISUAL";
        this.commands = [{"COMMAND":"BLINK","PARAMS":[], "INTERRUPTIBLE": false}];
        this.HOSTNAME = hostname;
        this.PORT = port;
        //*
        this.socket = io.connect(this.HOSTNAME+":"+this.PORT);
        this.socket.on('connect_error', function(err) {
            var dialog = [{msg: "Oh No!!!", tone:"YELL"}, {msg: "Error de conexión", tone:"NORMAL"}];
            modules.visualModule.showDialogFrame(dialog, "error","slow");
        });
        
        this.socket.on('connect', function(){
            var module_info = {"ID":this.ID,'COMMANDS':this.commands};
            this.socket.emit('SUBSCRIPTION', JSON.stringify(module_info), function(error, message){
                if(error != null){
                    modules.visualModule.showDialogFrame("Error de subscripción", "error", "slow");
                }else{
                    this.ID = message;
                }
            });    
        })
        //*/
    }    
    
}