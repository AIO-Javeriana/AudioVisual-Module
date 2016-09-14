var button = document.getElementById("toggle");

var morph = new TimelineMax({paused:true});
morph.to("#brain", 0.6, { morphSVG: "#cognitive", ease:Power1.easeOut });

window.addEventListener('scroll', function() {
  if (morph.progress() === 0) {
    morph.play();
  }
});


button.addEventListener("click", function() {
  if (morph.progress() === 0) { //if it's at the beginning, start playing
    morph.play();
  } else { //otherwise toggle the direction on-the-fly
    morph.reversed( !morph.reversed() );
  }
});