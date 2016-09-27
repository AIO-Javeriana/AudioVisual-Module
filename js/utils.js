
var  renderedSVG;
 function renderSVG(svgId, animationProperties, callback, renderingSVGId, SVGSet){
        renderedSVG.to(svgId, animationProperties, function(){
            console.log(renderingSVGId);
            callback(renderingSVGId, SVGSet);
        });
    }

function renderSVGSet_UTILS(SVGSet,renderedSVG_){
        renderedSVG=renderedSVG_;
        renderingSVGId = 0; 
        renderSVG(SVGSet[renderingSVGId].id, SVGSet[renderingSVGId].properties, thingsToDoAfter, renderingSVGId, SVGSet);
    }

function thingsToDoAfter(renderingSVGId, SVGSet){
        renderingSVGId ++;
        if (renderingSVGId < SVGSet.length){
            renderSVG(SVGSet[renderingSVGId].id, SVGSet[renderingSVGId].properties, thingsToDoAfter, renderingSVGId, SVGSet )
        }else{
            console.log('termino la animación');
        }
    }