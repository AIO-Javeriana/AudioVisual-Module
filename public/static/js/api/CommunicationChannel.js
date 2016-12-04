var EventsEnum = {
    REGISTRATION: "REGISTRATION",
    REGISTRATION_REPLY: "REGISTRATION_REPLY",
    WORK_ASSIGNATION: "WORK_ASSIGNATION",
    WORK_ASSIGNATION_REPLY: "WORK_ASSIGNATION_REPLY",
    WORK_STATUS: "WORK_STATUS",
    WORK_STATUS_REPLY: "WORK_STATUS_REPLY",
    ALL_BEGINS: "ALL_BEGINS",
    ACTION_FINISHED: "ACTION_FINISHED",
    GET_SENSOR_SERVICES: "GET_SENSOR_SERVICES",
    SUBSCRIPTION_SENSOR_SERVICE: "SUBSCRIPTION_SENSOR_SERVICE",
    SENSOR_SERVICE: "SENSOR_SERVICE",
    EMOTIONAL_EVENT: "EMOTIONAL_EVENT",
    PARTICIPATION_EVENT: "PARTICIPATION_EVENT",
    SUBSCRIPTION_SENSOR_SERVICE_REPLY: "SUBSCRIPTION_SENSOR_SERVICE_REPLY",
    NECESSITY_FOR_MODULE: "NECESSITY_FOR_MODULE",
    FINISHED_EXECUTE_COMMAND: "FINISHED_EXECUTE_COMMAND",
    SENSOR_SERVICE_REPLY: "SENSOR_SERVICE_REPLY",
    GET_SENSOR_SERVICES_REPLY: "GET_SENSOR_SERVICES_REPLY",
    MODULE_REGISTRATION_SERVICE: "MODULE_REGISTRATION_SERVICE",
    COMMANDS_ASSIGNATION: "COMMANDS_ASSIGNATION",
    POSSIBLE_SUPPLIER: "POSSIBLE_SUPPLIER",
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
            var dialog = ["Oh No!!!", "Error de conexión", "Que mala suerte!!"];
            modules.visualModule.showDialogFrames(dialog, { type: 'danger', tone: 'low', waitTime: 'short' }, function () {
                console.log('end of connect error');
            });
        });

        this.socket.on('connect', function () {
            var ID = "AUDIO_VISUAL";
            var commands = [{ COMMAND: "ATTENTION_CYCLE", PARAMS: [], INTERRUPTIBLE: false, SERVICE: false },
                { COMMAND: "DECIR", PARAMS: ["TEXTO", "TONO"], INTERRUPTIBLE: false, SERVICE: false },
                { COMMAND: "RESPONDER", PARAMS: [], INTERRUPTIBLE: false, SERVICE: false },
                { COMMAND: "INFORM_NECESSITY", PARAMS: [], INTERRUPTIBLE: false, SERVICE: false },
                { COMMAND: "REPRODUCIR-SONIDO", PARAMS: ["SONIDO"], INTERRUPTIBLE: false, SERVICE: false }
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

        this.socket.on(EventsEnum.REGISTRATION_REPLY, function() {
            var msg = { MODULE_ID: "AUDIO_VISUAL",  EVENT_NAME: EventsEnum.MODULE_REGISTRATION_SERVICE};    
            this.emit(EventsEnum.MODULE_REGISTRATION_SERVICE, JSON.stringify(msg));
        });
        
        this.socket.on(EventsEnum.POSSIBLE_SUPPLIER, function(msg){
            var JSONmsg = JSON.parse(msg);
            //console.log(EventsEnum.POSSIBLE_SUPPLIER+" : "+msg);
            //console.log(JSONmsg.DATA.COMMAND)
            if(JSONmsg.DATA.COMMAND == "BATTERY_LVL"){
                console.log("Enviando peticion de subscripcion a servicio");
                var msg = { MODULE_ID: "AUDIO_VISUAL",  EVENT_NAME: EventsEnum.SUBSCRIPTION_SENSOR_SERVICE, SENSOR_SERVICE_NAME: JSONmsg.DATA.COMMAND};    
                this.emit(EventsEnum.SUBSCRIPTION_SENSOR_SERVICE, JSON.stringify(msg));
            }
        });
        
        this.socket.on(EventsEnum.SENSOR_SERVICE_REPLY, function(msg){
            var JSONmsg = JSON.parse(msg);
             if(JSONmsg.DATA.SENSOR_SERVICE_NAME == "BATTERY_LVL"){
                console.log(EventsEnum.SENSOR_SERVICE_REPLY+" : "+JSONmsg.DATA.PARAMS.BATTERY_LVL);
                modules.visualModule.updateBatteryStatus(JSONmsg.DATA.PARAMS.BATTERY_LVL);
            }
        });
        
        this.socket.on(EventsEnum.ALL_BEGINS, function (msg) {
            var JSONmsg = JSON.parse(msg);
            var GROUP_ID = JSONmsg.GROUP_ID;
            var commands = mapCommands[GROUP_ID];
            if (commands != null) {
                for (var i = 0; i < commands.length; i++) {
                    var params = commands[i].PARAMS;
                    var dataCallback = {
                        socket: this,
                        command: commands[i]
                    };
                    var callback = function () {
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
                    switch (commands[i].COMMAND) {
                        case "ATTENTION_CYCLE":
                            var dice = Math.floor((Math.random() * 10) + 1);

                            if (1 <= dice && dice <= 7) {
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
                            } else if (7 < dice && dice <= 8) {
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

                            if (-1 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.8) {
                                modules.visualModule.sadHigh(function () { });
                            } else if (-0.7 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.4) {
                                modules.visualModule.sadMedium(function () { });
                            } else if (-0.4 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.1) {
                                modules.visualModule.sadLow(function () { });
                            } else if (0.1 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 0.3) {
                                modules.visualModule.happyLow(function () { });
                            } else if (0.4 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 0.7) {
                                modules.visualModule.happyMedium(function () { });
                            } else if (0.8 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 1) {
                                modules.visualModule.happyHigh(function () { });
                            } else {
                                modules.visualModule.neutral(function () { });
                            }

                            if (modules.audioOutputModule != null) {
                                modules.audioOutputModule.textToSpeech(params.TEXTO, modules.visualModule, null, callback);
                            } else {
                                modules.visualModule.showDialogFrames([params.TEXTO], { type: 'info', tone: 'low', waitTime: 'short' }, callback);
                            }
                            break;

                        case "RESPONDER":
                            modules.audioOutputModule.textToSpeech("Preguntame lo que quieras", modules.visualModule, null, function () {
                                modules.audioInputModule.answer(function (data, callback) {
                                    if (modules.audioOutputModule != null) {
                                        modules.audioOutputModule.textToSpeech(data, modules.visualModule, null, callback);
                                    } else {
                                        modules.visualModule.showDialogFrames([params.TEXTO], { type: 'info', tone: 'low', waitTime: 'short' }, function () {
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
                                });
                            });
                            break;
                        case "INFORM_NECESSITY":

                            if (-1 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.8) {
                                modules.visualModule.sadHigh(callback);
                            } else if (-0.7 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.4) {
                                modules.visualModule.sadMedium(function () { });
                            } else if (-0.4 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= -0.1) {
                                modules.visualModule.sadLow(function () { });
                            } else if (0.1 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 0.3) {
                                modules.visualModule.happyLow(function () { });
                            } else if (0.4 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 0.7) {
                                modules.visualModule.happyMedium(function () { });
                            } else if (0.8 <= params.EMOTIONAL_VALUE && params.EMOTIONAL_VALUE <= 1) {
                                modules.visualModule.happyHigh(function () { });
                            } else {
                                modules.visualModule.neutral(function () { });
                            }

                            if (modules.audioOutputModule != null) {
                                modules.audioOutputModule.textToSpeech(params.SERVICES, modules.visualModule, null, function () {
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
                            if (modules.visualModule != null) {
                                modules.visualModule.showDialogFrames([params.SERVICES], { type: 'danger', tone: 'low', waitTime: 'short' }, function () {
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
                        case "REPRODUCIR-SONIDO":
                            modules.audioOutputModule.play(params.SONIDO, null, callback);
                            break;
                        case "REPRODUCIR-VIDEO":
                            modules.videoModule.playVideo(params.VIDEO, null, callback);
                            break;
                    }
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
