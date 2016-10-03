
class CommunicationChannel{
    constructor(host, port, modules){
        this.id = 'CommunicationChannel'
        this.commands = [{"COMMAND":"BLINK","PARAMS":[], "INTERRUPTIBLE": false}];
        this.host = host;
        this.port = port;
        this.modules = modules;
        
        //BATTERY LEVEL EMULATION
        var level = Math.floor((Math.random() * 100) + 1);
        this.modules.visualModule.updateBatteryStatus(level); 
        
        this.socket = io.connect(this.HOSTNAME+":"+this.PORT);
        this.socket.on('connect_error', function(err) {
            var i = Math.floor((Math.random() * 10) + 1);
            var dialog = [{msg: "Oh No!!!", tone:"YELL"}, {msg: "Error de conexión", tone:"NORMAL"}, {msg: "Que mala suerte!!", tone:"YELL"}];
            console.log(this.modules);
            modules.visualModule.showDialogFrame(dialog, "error","slow");
        });
        
        this.socket.on('connect', function(){
            var module_info = {"ID":this.id,'COMMANDS':this.commands};
            this.socket.emit('SUBSCRIPTION', JSON.stringify(module_info), function(error, message){
                if(error != null){
                    modules.visualModule.showDialogFrame("Error de subscripción", "error", "slow");
                }else{
                    this.id = message;
                }
            });    
        });
        
        this.socket.on('BATTERY_LVL', function(level) {
            modules.visualModule.update_battery_status(level); 
        });
    }    

}