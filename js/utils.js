
var  renderedSVG;
 function renderSVG(svgId, animationProperties, callback, renderingSVGId, SVGSet){
        renderedSVG.to(svgId, animationProperties, function(){
            console.log(renderingSVGId);
            callback(renderingSVGId, SVGSet);
        });
    }

function utils_renderSVGSet(SVGSet,renderedSVG_){
        renderedSVG=renderedSVG_;
        renderingSVGId = 0;
        renderSVG(SVGSet[renderingSVGId].id, SVGSet[renderingSVGId].properties, renderSVGSetCallback, renderingSVGId, SVGSet);
    }

function renderSVGSetCallback(renderingSVGId, SVGSet){
        renderingSVGId ++;
        if (renderingSVGId < SVGSet.length){
            renderSVG(SVGSet[renderingSVGId].id, SVGSet[renderingSVGId].properties, renderSVGSetCallback, renderingSVGId, SVGSet )
        }else{
            console.log('termino la animación');
        }
    }
