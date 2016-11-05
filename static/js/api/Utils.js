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

//Objects

var sneakyLookingRight = [{
        id:'conector_full-opened-eyes_looking-sneaky',
        properties: {
            duration: 1,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 0
    },{
        id:'sneaky-looking-right',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 0
    },{
        id:'conector_sneaky-looking-right_full-opened-eyes',
        properties: {
            duration: 100,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 500
    },{
        id:'full-opened-eyes',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 0
    }
];

var sneakyLookingLeft = [{
            id:'conector_full-opened-eyes_looking-sneaky',
            properties: {
                duration: 1,
                easing: 'linear',
                rotation: 'none'
            },
            delay: 0
        },{
            id:'sneaky-looking-left',
            properties: {
                duration: 500,
                easing: 'linear',
                rotation: 'none'
            },
            delay: 0
        },{
            id:'conector_sneaky-looking-left_full-opened-eyes',
            properties: {
                duration: 100,
                easing: 'quint-in',
                rotation: 'none'
            },
            delay: 500
        },{
            id:'full-opened-eyes',
            properties: {
                duration: 500,
                easing: 'linear',
                rotation: 'none'
            },
            delay: 0
        }
    ];

var blink = [{
            id:'full-closed-eyes',
            properties: {
                duration: 125,
                easing: 'quint-in',
                rotation: 'none'
            },
            delay: 0
        },{
            id:'full-opened-eyes',
            properties: {
                duration: 125,
                easing: 'quint-in',
                rotation: 'none'
            },
            delay: 0
        }
    ];

var toRender = [
    {
        id: 'conector_full-opened-eyes_looking-sneaky',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 0
    }, {
        id: 'sneaky-looking-right',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 0
    }, {
        id: 'sneaky-looking-left',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'conector_sneaky-looking-left_full-opened-eyes',
        properties: {
            duration: 1,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 1
    }, {
        id: 'full-opened-eyes',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'full-closed-eyes',
        properties: {
            duration: 125,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 0
    }, {
        id: 'full-opened-eyes',
        properties: {
            duration: 125,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 0
    }
];


var toRender_sad = [
    {
        id: 'slightly-closed-sad-eyes',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 0
    }, {
        id: 'medium-closed-sad-eyes',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'almost-closed-sad-eyes',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'full-opened-eyes',
        properties: {
            duration: 125,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'full-closed-eyes',
        properties: {
            duration: 125,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 0
    }, {
        id: 'full-opened-eyes',
        properties: {
            duration: 125,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 0
    }
];

var toRender_happy = [
    {
        id: 'slightly-closed-happy-eyes',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'medium-closed-happy-eyes',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'almost-closed-happy-eyes',
        properties: {
            duration: 500,
            easing: 'linear',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'full-opened-eyes',
        properties: {
            duration: 125,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 500
    }, {
        id: 'full-closed-eyes',
        properties: {
            duration: 125,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 0
    }, {
        id: 'full-opened-eyes',
        properties: {
            duration: 125,
            easing: 'quint-in',
            rotation: 'none'
        },
        delay: 0
    }
];
