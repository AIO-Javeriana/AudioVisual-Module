
class Communication_channel{

    constructor(hostname, port, aioUi){
        this.HOSTNAME = hostname;
        this.PORT = port;
        this.socket = io.connect(this.HOSTNAME+":"+this.PORT);
        this.socket.on('connect_error', function(err) {
            aioUi.visual_module.stage.addChild(new createjs.Text("Connection error: " + err, "20px Arial", "#ff7700"));
        });    
        this.socket.on('BLINK', function(data){
            aioUi.blink(task_finished);
        });
        this.socket.on('HAPPY', function(data){
            data = JSON.parse(data);
            aioUi.happy(data.get(level),task_finished);
        });
        this.socket.on('SURPRISED', function(data){
            aioUi.surprised(task_finished);
        });
    }
    connect(MODULE_ID){
        var signed = false;
        var module_info = {"ID":MODULE_ID,'COMMANDS':[{"COMMAND":"BLINK","PARAMS":[]}]};
        this.socket.emit('SUBSCRIPTION', JSON.stringify(module_info), function(error, message){
            if(error == null){
                signed = true;
            }
        });
        return signed;
    }

    task_finished(){
        this.socket.emit('ACTION_FINISH', "", function(error, message){
            if(error == null){
                // mostrar error en pantalla
            }
        });
    }
}

function task_finished(){
    if(aioUi.communication_channel != null)
        aioUi.communication_channel.task_finished();
}   
