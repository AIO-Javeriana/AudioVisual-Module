var  renderedSVG;
 function renderSVG(svgId, animationProperties, callback, SVGIterator, SVGSet,endCallback){
     renderedSVG.to(svgId, animationProperties, function(){
        callback(SVGIterator, SVGSet, endCallback);
    });
}

function utils_renderSVGSet(SVGSet,renderedSVG_,endCallback){
    renderedSVG=renderedSVG_;
    var SVGIterator = 0;
    setTimeout( function(){
        renderSVG(SVGSet[SVGIterator].id, SVGSet[SVGIterator].properties, renderSVGSetCallback, SVGIterator, SVGSet, endCallback);
    }  , SVGSet[SVGIterator].delay );
}

function renderSVGSetCallback(SVGIterator, SVGSet,endCallback){
    SVGIterator ++;
    if (SVGIterator < SVGSet.length){
        setTimeout( function(){
            renderSVG(SVGSet[SVGIterator].id, SVGSet[SVGIterator].properties, renderSVGSetCallback, SVGIterator, SVGSet,endCallback);
        }  , SVGSet[SVGIterator].delay );
    }else{
        if(endCallback != null){
            endCallback();
        }
    }
}
