var EventsEnum = {
    REGISTRATION: "REGISTRATION",
    REGISTRATION_REPLY: "REGISTRATION_REPLY",
    WORK_ASSIGNATION: "WORK_ASSIGNATION",
    WORK_ASSIGNATION_REPLY: "WORK_ASSIGNATION-REPLY",
    WORK_STATUS: "WORK_STATUS",
    WORK_STATUS_REPLY: "WORK_STATUS-REPLY",
    ALL_BEGINS: "ALL_BEGINS",
    ACTION_FINISHED: "ACTION_FINISHED",
    GET_SENSOR_SERVICES: "GET_SENSOR-SERVICES",
    SUBSCRIPTION_SENSOR_SERVICE: "SUBSCRIPTION_SENSOR-SERVICE",
    SENSOR_SERVICE: "SENSOR_SERVICE",
    EMOTIONAL_EVENT: "EMOTIONAL_EVENT",
    PARTICIPATION_EVENT: "PARTICIPATION_EVENT",
    SUBSCRIPTION_SENSOR_SERVICE_REPLY: "SUBSCRIPTION_SENSOR-SERVICE-REPLY",
    NECESSITY_FOR_MODULE: "NECESSITY_FOR-MODULE",
    FINISHED_EXECUTE_COMMAND: "FINISHED_EXECUTE_COMMAND",
    SENSOR_SERVICE_REPLY: "SENSOR_SERVICE_REPLY",
    GET_SENSOR_SERVICES_REPLY: "GET_SENSOR_SERVICES-REPLY",
    COMMANDS_ASSIGNATION: "COMMANDS_ASSIGNATION",
    NOT_DEFINED: "NOT_DEFINED"
};

var mapCommands = [];

class CommunicationChannel {
    constructor(host, port, modules) {
        this.id = 'CommunicationChannel'
        this.host = host;
        this.port = port;
        this.modules = modules;

        this.socket = io.connect(this.host + ":" + this.port);
        this.socket.on('connect_error', function (err) {
            var i = Math.floor((Math.random() * 10) + 1);
            var dialog = ["Oh No!!!","Error de conexión","Que mala suerte!!"];
            modules.visualModule.showDialogFrames(dialog, { type: 'danger', tone: 'low', waitTime:'short' }, function(){
                console.log('end of connect error');
            });
        });

        this.socket.on('connect', function () {
            var ID = "AUDIO_VISUAL";
            var commands = [{ COMMAND: "ATTENTION_CYCLE", PARAMS: [], INTERRUPTIBLE: false, SERVICE: false }, 
                            { COMMAND: "DECIR", PARAMS: ["TEXTO", "TONO"], INTERRUPTIBLE: false, SERVICE: false },
                            { COMMAND: "RESPONDER", PARAMS: [], INTERRUPTIBLE: false, SERVICE: false },
                            ];
            var module_info = {
                MODULE_ID: ID,
                COMMANDS: commands
            };
            this.emit(EventsEnum.REGISTRATION, JSON.stringify(module_info));
        });

        this.socket.on(EventsEnum.WORK_ASSIGNATION, function (msg) {
            var JSONmsg = JSON.parse(msg);
            var GROUP_ID = JSONmsg.GROUP_ID;
            var COMMAND_ID = JSONmsg.COMMAND_ID;
            var reply = { MODULE_ID: "AUDIO_VISUAL", REPLY: "ACCEPTED", COMMAND_ID: COMMAND_ID, COMMAND_GROUP: GROUP_ID };
            if (mapCommands[GROUP_ID] == null) {
                mapCommands[GROUP_ID] = [];
            }
            mapCommands[GROUP_ID].push(JSONmsg);
            this.emit(EventsEnum.WORK_ASSIGNATION_REPLY, JSON.stringify(reply));
        })

        this.socket.on(EventsEnum.ALL_BEGINS, function (msg) {
            var JSONmsg = JSON.parse(msg);
            var GROUP_ID = JSONmsg.GROUP_ID;
            var commands = mapCommands[GROUP_ID];
            for (var i = 0; i < commands.length; i++) {
                var params = commands[i].PARAMS;
                switch (commands[i].COMMAND) {
                    case "ATTENTION_CYCLE":
                        var dice = Math.floor((Math.random() * 10) + 1);
                        var dataCallback = {
                            socket: this,
                            command: commands[i]
                        };

                        if (1 <= dice && dice <= 6) {
                            modules.visualModule.blink(function () {
                                var reply = {
                                    MODULE_ID: "AUDIO_VISUAL",
                                    COMMAND_ID: dataCallback.command.COMMAND_ID,
                                    GROUP_ID: dataCallback.command.GROUP_ID,
                                    STATUS: "DONE",
                                    ERROR_MESSAGE: "",
                                    FINISH_MESSAGE: ""
                                };
                                dataCallback.socket.emit(EventsEnum.ACTION_FINISHED, JSON.stringify(reply));
                            });
                        } else if (7 <= dice && dice <= 8) {
                            modules.visualModule.sneakyLookRight(function () {
                                var reply = {
                                    MODULE_ID: "AUDIO_VISUAL",
                                    COMMAND_ID: dataCallback.command.COMMAND_ID,
                                    GROUP_ID: dataCallback.command.GROUP_ID,
                                    STATUS: "DONE",
                                    ERROR_MESSAGE: "",
                                    FINISH_MESSAGE: ""
                                };
                                dataCallback.socket.emit(EventsEnum.ACTION_FINISHED, JSON.stringify(reply));
                            });
                        } else if (9 <= dice && dice <= 10) {
                            modules.visualModule.sneakyLookLeft(function () {
                                var reply = {
                                    MODULE_ID: "AUDIO_VISUAL",
                                    COMMAND_ID: dataCallback.command.COMMAND_ID,
                                    GROUP_ID: dataCallback.command.GROUP_ID,
                                    STATUS: "DONE",
                                    ERROR_MESSAGE: "",
                                    FINISH_MESSAGE: ""
                                };
                                dataCallback.socket.emit(EventsEnum.ACTION_FINISHED, JSON.stringify(reply));
                            });
                        }

                        break;

                    case "DECIR":
                        var dataCallback = {
                            socket: this,
                            command: commands[i]
                        };
                        var callback = function(){
                            var reply = {
                                MODULE_ID: "AUDIO_VISUAL",
                                COMMAND_ID: dataCallback.command.COMMAND_ID,
                                GROUP_ID: dataCallback.command.GROUP_ID,
                                STATUS: "DONE",
                                ERROR_MESSAGE: "",
                                FINISH_MESSAGE: ""
                            };
                            dataCallback.socket.emit(EventsEnum.ACTION_FINISHED, JSON.stringify(reply));
                        }
                        if(-1 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.8){
                            modules.visualModule.sadHigh(callback);
                        }else if( -0.7 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.4 ){
                            modules.visualModule.sadMedium(callback);
                        }else if( -0.3 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.1 ){
                            modules.visualModule.sadLow(callback);
                        }else if( 0.1 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 0.3 ){
                            modules.visualModule.happyLow(callback);
                        }else if( 0.4 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 0.7 ){
                            modules.visualModule.happyMedium(callback);
                        }else if( 0.8 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 1 ){
                            modules.visualModule.happyHigh(callback);
                        }else{
                            modules.visualModule.neutral(callback);
                        }

                        if(modules.audioOutputModule != null){
                            modules.audioOutputModule.textToSpeech(params.TEXTO, null, function () {
                                var reply = {
                                    MODULE_ID: "AUDIO_VISUAL",
                                    COMMAND_ID: dataCallback.command.COMMAND_ID,
                                    GROUP_ID: dataCallback.command.GROUP_ID,
                                    STATUS: "DONE",
                                    ERROR_MESSAGE: "",
                                    FINISH_MESSAGE: ""
                                };
                                dataCallback.socket.emit(EventsEnum.ACTION_FINISHED, JSON.stringify(reply));
                            });
                        }else{
                            modules.visualModule.showDialogFrames([params.TEXTO], { type: 'info', tone: 'low', waitTime:'short' }, function(){
                                var reply = {
                                    MODULE_ID: "AUDIO_VISUAL",
                                    COMMAND_ID: dataCallback.command.COMMAND_ID,
                                    GROUP_ID: dataCallback.command.GROUP_ID,
                                    STATUS: "DONE",
                                    ERROR_MESSAGE: "",
                                    FINISH_MESSAGE: ""
                                };
                                dataCallback.socket.emit(EventsEnum.ACTION_FINISHED, JSON.stringify(reply));
                            });
                        }
                        break;

                        case "RESPONDER":
                            var dataCallback = {
                                socket: this,
                                command: commands[i]
                            };
                            console.log("Responder " + dataCallback.command.COMMAND_ID);
                            modules.audioOutputModule.textToSpeech("Preguntame lo que quieras", null, function () {
                                modules.audioInputModule.answer(function(data, callback){
                                    audioOutputModule.textToSpeech(data, null, function(){
                                        var reply = {
                                            MODULE_ID: "AUDIO_VISUAL",
                                            COMMAND_ID: dataCallback.command.COMMAND_ID,
                                            GROUP_ID: dataCallback.command.GROUP_ID,
                                            STATUS: "DONE",
                                            ERROR_MESSAGE: "",
                                            FINISH_MESSAGE: ""
                                        };
                                        console.log("Enviando " + dataCallback.command.COMMAND_ID);
                                        dataCallback.socket.emit(EventsEnum.ACTION_FINISHED, JSON.stringify(reply));
                                    });   
                                }); 
                            });
                        break;
                }
            }
        });

        // TODO: CHECK IF IS WORKING
        this.socket.on(EventsEnum.WORK_STATUS, function (msg) {
            var JSONmsg = JSON.parse(msg);
            var GROUP_ID = JSONmsg.GROUP_ID;
            var COMMAND_ID = JSONmsg.COMMAND_ID;
            var reply = { MODULE_ID: "AUDIO_VISUAL", STATUS: "WORKING", COMMAND_ID: COMMAND_ID, GROUP_ID: GROUP_ID, MSG: "" };
            this.emit(EventsEnum.WORK_STATUS_REPLY, JSON.stringify(reply));
        })
    }
}