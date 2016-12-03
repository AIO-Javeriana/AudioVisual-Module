/**
 * AudioInput class: records and saves recordings when asked
 * AudioInput uses Matt Diamond's RecorderJS: https://github.com/mattdiamond/Recorderjs
 * if streaming needed see Chris-Rudmin's forked RecorderJs: https://github.com/chris-rudmin/Recorderjs
 * @author Fabián Andrés Merchán Jiménez
 **/

class AudioInputModule extends Module{

    /**
     * @param id string to identify the module
     */
    constructor(id) {
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
                var question = toQuestion(question);
                console.log(question);
                $.ajax({
                    url: "https://translation.googleapis.com/language/translate/v2",
                    data: { key: "AIzaSyDxnqLNmCv2j3ZWqUb30qnZ-OJMWO3ZEQA", 
                            q: question,
                            source: "es",
                            target: "en"
                    },
                    type: "GET",
                }).done(function( data) {
                    console.log(data.data.translations[0].translatedText);
                    $.ajax({
                        url: "https://webknox-question-answering.p.mashape.com/questions/answers",
                        data: { answerLookup: false, answerSearch: false, question: data.data.translations[0].translatedText},
                        type: "GET",
                        beforeSend: function(xhr)
                        {
                            xhr.setRequestHeader('X-Mashape-Key', 'LjjvxSR6ZHmshpvD3uHwyArX5Supp1I6RZdjsnY8w8LNQC2SUe');
                        }
                    }).done(function( data ) {
                        $.ajax({
                            url: "https://translation.googleapis.com/language/translate/v2",
                            data: { key: "AIzaSyDxnqLNmCv2j3ZWqUb30qnZ-OJMWO3ZEQA", 
                                    q: data.answer, 
                                    source: "en",
                                    target: "es"
                            },
                            type: "GET",
                        }).done(function( data ) {
                            console.log(data.data.translations[0].translatedText);
                            processFunction(data.data.translations[0].translatedText, callback);
                        });
                    });
                });
            });
        }
    }
}
