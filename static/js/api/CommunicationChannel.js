var EventsEnum = {
    REGISTRATION: "REGISTRATION",
    REGISTRATION_REPLY: "REGISTRATION_REPLY",
    WORK_ASSIGNATION:"WORK_ASSIGNATION",
    WORK_ASSIGNATION_REPLY:"WORK_ASSIGNATION-REPLY",
    WORK_STATUS:"WORK_STATUS",
    WORK_STATUS_REPLY:"WORK_STATUS-REPLY",
    ALL_BEGINS:"ALL_BEGINS",
    ACTION_FINISHED:"ACTION_FINISHED",
    GET_SENSOR_SERVICES:"GET_SENSOR-SERVICES",
    SUBSCRIPTION_SENSOR_SERVICE:"SUBSCRIPTION_SENSOR-SERVICE",
    SENSOR_SERVICE:"SENSOR_SERVICE",
    EMOTIONAL_EVENT:"EMOTIONAL_EVENT",
    PARTICIPATION_EVENT:"PARTICIPATION_EVENT",
    SUBSCRIPTION_SENSOR_SERVICE_REPLY:"SUBSCRIPTION_SENSOR-SERVICE-REPLY",
    NECESSITY_FOR_MODULE:"NECESSITY_FOR-MODULE",
    FINISHED_EXECUTE_COMMAND:"FINISHED_EXECUTE_COMMAND",
    SENSOR_SERVICE_REPLY:"SENSOR_SERVICE_REPLY",
    GET_SENSOR_SERVICES_REPLY:"GET_SENSOR_SERVICES-REPLY",
    COMMANDS_ASSIGNATION:"COMMANDS_ASSIGNATION",
    NOT_DEFINED:"NOT_DEFINED"
};

var mapCommands = [];

class CommunicationChannel{
    constructor(host, port, modules){
        this.id = 'CommunicationChannel'
        this.commands = [{"COMMAND":"BLINK","PARAMS":[], "INTERRUPTIBLE": false}];
        this.host = host;
        this.port = port;
        this.modules = modules;

        //Battery level emulation
        var level = Math.floor((Math.random() * 100) + 1);
        this.modules.visualModule.updateBatteryStatus(level);



        this.socket = io.connect(this.host+":"+this.port);
        this.socket.on('connect_error', function(err) {
            var i = Math.floor((Math.random() * 10) + 1);
            var dialog = [{msg: "Oh No!!!", tone:"YELL"}, {msg: "Error de conexión", tone:"NORMAL"}, {msg: "Que mala suerte!!", tone:"YELL"}];
            modules.visualModule.showDialogFrame(dialog, "error","slow");
        });
        
        this.socket.on('connect', function(){
            var ID = "AUDIO_VISUAL";
            var commands = [{COMMAND:"BLINK",PARAMS:[], INTERRUPTIBLE: false, SERVICE: false}];
            var module_info = {
                MODULE_ID:ID,
                COMMANDS:commands
            };
            this.emit(EventsEnum.REGISTRATION, JSON.stringify(module_info));
        });

        this.socket.on(EventsEnum.WORK_ASSIGNATION, function(msg){
          var JSONmsg = JSON.parse(msg);
          var GROUP_ID = JSONmsg.GROUP_ID;
          var COMMAND_ID = JSONmsg.COMMAND_ID;
          var reply = {MODULE_ID: "AUDIO_VISUAL", REPLY: "ACCEPTED", COMMAND_ID:COMMAND_ID, COMMAND_GROUP:GROUP_ID};
          if(mapCommands[GROUP_ID] == null){
            mapCommands[GROUP_ID] = [];
          }
          mapCommands[GROUP_ID].push(JSONmsg);
          this.emit(EventsEnum.WORK_ASSIGNATION_REPLY,JSON.stringify(reply));
        })

        this.socket.on(EventsEnum.ALL_BEGINS, function(msg) {
          var JSONmsg = JSON.parse(msg);
          var GROUP_ID = JSONmsg.GROUP_ID;
          var commands = mapCommands[GROUP_ID];
          for (var i = 0; i < commands.length; i++) {
            switch(commands[i].COMMAND){
                case "BLINK":
                  
                  var toRender = this.idle();

                  var dataCallback = {
                      socket: this,
                      command: commands[i]
                  };
                  
                  modules.visualModule.renderSVGSet(toRender,dataCallback,function(dataCallback){
                    
                    var reply = {
                        MODULE_ID:"AUDIO_VISUAL", 
                        COMMAND_ID: dataCallback.command.COMMAND_ID, 
                        GROUP_ID: dataCallback.command.GROUP_ID, 
                        STATUS:"DONE", 
                        MSG:""
                    };

                    dataCallback.socket.emit(EventsEnum.ACTION_FINISHED,JSON.stringify(reply));
                  });
              break;
            }
          }
        });
        
        this.socket.on('BATTERY_LVL', function(level) {
            modules.visualModule.updateBatteryStatus(level); 
        });
    }

    idle(){
        
        var sneakyLookingRight = [{
                id:'conector_full-opened-eyes_looking-sneaky',
                properties: {
                    duration: 1,
                    easing: 'linear',
                    rotation: 'none'
                },
                delay: 0
            },{
                id:'sneaky-looking-right',
                properties: {
                    duration: 500,
                    easing: 'linear',
                    rotation: 'none'
                },
                delay: 0
            },{
                id:'conector_sneaky-looking-right_full-opened-eyes',
                properties: {
                    duration: 100,
                    easing: 'quint-in',
                    rotation: 'none'
                },
                delay: 500
            },{
                id:'full-opened-eyes',
                properties: {
                    duration: 500,
                    easing: 'linear',
                    rotation: 'none'
                },
                delay: 0
            }
        ];

        var sneakyLookingLeft = [{
                    id:'conector_full-opened-eyes_looking-sneaky',
                    properties: {
                        duration: 1,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 0
                },{
                    id:'sneaky-looking-left',
                    properties: {
                        duration: 500,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 0
                },{
                    id:'conector_sneaky-looking-left_full-opened-eyes',
                    properties: {
                        duration: 100,
                        easing: 'quint-in',
                        rotation: 'none'
                    },
                    delay: 500
                },{
                    id:'full-opened-eyes',
                    properties: {
                        duration: 500,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 0
                }
            ];

        var blink = [{
                    id:'full-closed-eyes',
                    properties: {
                        duration: 125,
                        easing: 'quint-in',
                        rotation: 'none'
                    },
                    delay: 0
                },{
                    id:'full-opened-eyes',
                    properties: {
                        duration: 125,
                        easing: 'quint-in',
                        rotation: 'none'
                    },
                    delay: 0
                }
            ];

        var number = Math.floor((Math.random() * 5) + 1); //Número entre uno y tres
        switch(number){
            case 1:
                return sneakyLookingRight;
            case 2:
                return sneakyLookingLeft;
            default:
                return blink;
        };
        
    }
}