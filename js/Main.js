var audioVisualModule;
function main(){
    audioVisualModule = new AudioVisualModule();
    //idle_every_x_seconds(1);
}

function idle_every_x_seconds(x){
    window.setInterval(function(){
        console.log('entro');
        audioVisualModule.idle();
    }, x*1000);
}