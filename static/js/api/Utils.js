var  renderedSVG;
 function renderSVG(svgId, animationProperties, callback, SVGIterator, SVGSet,dataCallback,endCallback){
     renderedSVG.to(svgId, animationProperties, function(){
        callback(SVGIterator, SVGSet,dataCallback, endCallback);
    });
}

function utils_renderSVGSet(SVGSet,renderedSVG_,dataCallback,endCallback){
    renderedSVG=renderedSVG_;
    var SVGIterator = 0;
    setTimeout( function(){
        renderSVG(SVGSet[SVGIterator].id, SVGSet[SVGIterator].properties, renderSVGSetCallback, SVGIterator, SVGSet,dataCallback, endCallback);
    }  , SVGSet[SVGIterator].delay );
}

function renderSVGSetCallback(SVGIterator, SVGSet,dataCallback,endCallback){
    SVGIterator ++;
    if (SVGIterator < SVGSet.length){
        setTimeout( function(){
            renderSVG(SVGSet[SVGIterator].id, SVGSet[SVGIterator].properties, renderSVGSetCallback, SVGIterator, SVGSet,dataCallback,endCallback);
        }  , SVGSet[SVGIterator].delay );
    }else{
        if(endCallback != null){
            endCallback(dataCallback);
        }
    }
}

var player;
function utils_showVideo(url, properties, callback){
    $('#msg').css('z-index', 3);
    var videoPlayer = $('<div>',{
        'id': 'video-player'
    })
    $('#show-video').append(videoPlayer);
    $('#show-video').css('display','flex');

    var id = getParameterByName('v', url);


    console.log(player);
    var player = new YT.Player('video-player', {
        height: '400',
        width: '800',
        videoId: id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    console.log(player);


    //setTimeout(function(){ player.stopVideo() }, 3000);

    $('#show-video #close').on('click', 'button', function(){
        $('#show-video').remove('#vi    deo-player');
        $('#show-video').css('display','none');
        $('#msg').css('z-index', 0);
        console.log(player);
        player.stopVideo();
        
    })
    player.playVideo();
}

// autoplay video
function onPlayerReady(event) {
    event.target.playVideo();
}

// when video ends
function onPlayerStateChange(event) {        
    if(event.data === 0) {            
        alert('done');
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



