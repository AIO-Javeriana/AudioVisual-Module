
class CommunicationChannel{
    constructor(hostname, port,modules){
        this.ID = "AUDIO_VISUAL";
        this.commands = [{"COMMAND":"BLINK","PARAMS":[], "INTERRUPTIBLE": false}];
        this.HOSTNAME = hostname;
        this.PORT = port;
        //*
        this.socket = io.connect(this.HOSTNAME+":"+this.PORT);
        this.socket.on('connect_error', function(err) {
            var i = Math.floor((Math.random() * 10) + 1);
            if(i % 2 == 0){
                var dialog = [{msg: "Oh No!!!", tone:"YELL"}, {msg: "Error de conexión", tone:"NORMAL"}, {msg: "Que mala suerte!!", tone:"YELL"}];
                modules.visualModule.showDialogFrame(dialog, "error","slow");
            }else{
                var dialog = [{msg: "Hola!!!", tone:"YELL"}, {msg: "Soy AIO", tone:"NORMAL"}];
                modules.visualModule.showDialogFrame(dialog, "info","slow");
            }
            //BATTERY LEVEL
            // TODO: associate with a socket event
            var level = Math.floor((Math.random() * 100) + 1);
            modules.visualModule.update_battery_status(level);    
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