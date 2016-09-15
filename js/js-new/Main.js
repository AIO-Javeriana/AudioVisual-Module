$( document ).ready(function() {
    
});

var tl = new TimelineLite({paused:false});
tl.to("#opened-eyes-1", 0.6, { morphSVG: "#sleeping-eyes-1", ease:Power1.easeOut });

$(document).on('click','#button-test',function(e){
    tl.play();
});

/*
$("#button-test").on( "click", function() {
    console.log('al menos entro');  
  if (tl.progress() === 0) { //if it's at the beginning, start playing
    console.log('entro al if');
    tl.play();
  } else { //otherwise toggle the direction on-the-fly
    tl.reversed( !tl.reversed() );
  }
});
*/

/*
var audioVisualModule;
function main(){
    console.log('entro al main');
    tl.play();
    //audioVisualModule = new AudioVisualModule();
    //idle_every_x_seconds(1);
}

function idle_every_x_seconds(x){
    window.setInterval(function(){
        console.log('entro');
        audioVisualModule.idle();
    }, x*1000);
}

*/