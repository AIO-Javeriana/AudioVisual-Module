/**
 * AudioInput class: records and saves recordings when asked
 * AudioInput uses Matt Diamond's RecorderJS: https://github.com/mattdiamond/Recorderjs
 * if streaming needed see Chris-Rudmin's forked RecorderJs: https://github.com/chris-rudmin/Recorderjs
 * @author Fabián Andrés Merchán Jiménez
 **/

class AudioInputModule extends Module{

    /**
     * @param mediaStreamSource media stream source needed to record.
     */
    constructor(id, mediaStreamSource) {
        super(id);        
        
        this.speechToText = function(processFunction){
            var recognition = new webkitSpeechRecognition();
            recognition.onresult = function(event) { 
                for(var i = 0; i < event.results[0].length; i++){
                    if(event.results[i].isFinal){
                        for(var j = 0; j < event.results[i].length; j++){
                            processFunction(event.results[i][j].transcript);
                        };
                    }
                };
            }

            recognition.onerror = function(event) {
                console.log(event.error);
            };
            
            recognition.start();
        }
        
        this.answer = function(processFunction, callback){
            this.speechToText(function(question){
                $.ajax({
                    url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
                    data: { key: "trnsl.1.1.20161114T200315Z.3c3ab99e5b147085.058271e128f7f2506533bc569277afbf4ff14029", 
                            text: question, 
                            lang: "es-en"
                    },
                    type: "GET",
                }).done(function( data ) {
                    console.log(data.text[0]);
                    $.ajax({
                        url: "https://webknox-question-answering.p.mashape.com/questions/answers",
                        data: { answerLookup: false, answerSearch: false, question: data.text[0]},
                        type: "GET",
                        beforeSend: function(xhr)
                        {
                            xhr.setRequestHeader('X-Mashape-Key', 'LjjvxSR6ZHmshpvD3uHwyArX5Supp1I6RZdjsnY8w8LNQC2SUe');
                        }
                    }).done(function( data ) {
                        $.ajax({
                            url: "https://translate.yandex.net/api/v1.5/tr.json/translate",
                            data: { key: "trnsl.1.1.20161114T200315Z.3c3ab99e5b147085.058271e128f7f2506533bc569277afbf4ff14029", 
                                    text: data.answer, 
                                    lang: "en-es"
                            },
                            type: "GET",
                        }).done(function( data ) {
                            console.log(data.text);
                            processFunction(data.text, callback);
                        });
                    });
                });
            });
        }

    }
}
