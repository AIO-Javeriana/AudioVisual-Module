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
                    url: "https://webknox-question-answering.p.mashape.com/questions/answers",
                    data: { answerLookup: false, answerSearch: false, question: question},
                    type: "GET",
                    beforeSend: function(xhr)
                    {
                        xhr.setRequestHeader('X-Mashape-Key', 'LjjvxSR6ZHmshpvD3uHwyArX5Supp1I6RZdjsnY8w8LNQC2SUe');
                    }
                }).done(function( data ) {
                    processFunction(data.answer, callback);
                });
            });
        }

    }
}
