
var  renderedSVG;
 function renderSVG(svgId, animationProperties, callback, SVGIterator, SVGSet){
    renderedSVG.to(svgId, animationProperties, function(){
        callback(SVGIterator, SVGSet);
    });
}

function utils_renderSVGSet(SVGSet,renderedSVG_){
    renderedSVG=renderedSVG_;
    var SVGIterator = 0;
    setTimeout( function(){
        renderSVG(SVGSet[SVGIterator].id, SVGSet[SVGIterator].properties, renderSVGSetCallback, SVGIterator, SVGSet);
    }  , SVGSet[SVGIterator].delay );
}

function renderSVGSetCallback(SVGIterator, SVGSet){
    SVGIterator ++;
    if (SVGIterator < SVGSet.length){
        setTimeout( function(){
            renderSVG(SVGSet[SVGIterator].id, SVGSet[SVGIterator].properties, renderSVGSetCallback, SVGIterator, SVGSet);
        }  , SVGSet[SVGIterator].delay );
    }
}
