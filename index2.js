var tm = new TimelineLite({paused:false});
tm.to("#square", 1, {morphSVG:{shape:"#star", shapeIndex:1}});
//comment out next line to disable findShapeIndex() UI
//findShapeIndex("#square", "#star");

$(document).on('click','#butt', function(){
    tm.play();
})
