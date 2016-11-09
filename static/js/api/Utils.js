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

function idle() {
    var number = Math.floor((Math.random() * 5) + 1); //Número entre uno y tres
    switch (number) {
        case 1:
            return sneakyLookingRight;
        case 2:
            return sneakyLookingLeft;
        default:
            return blink;
    };
}

//Objects

var availableImages = {
    path: './assets/images/',
    availableImageFiles: [
        {
            name: 'landscape',
            file: 'landscape-test.jpg'
        }, {
            name: 'portrait',
            file: 'portrait-test.jpg'
        }, {
            name: 'small',
            file: 'small-size-test.jpg'
        }, {
            name: 'katy',
            url: 'http://multimedia.cdn.com.do/2016/08/Estudios-afirman-hombres-con-barba-son-m%C3%A1s-infieles4.jpg'
        }
    ],
    errorImage: {
        url: 'https://www.quia.com/files/quia/users/sstone13/Emergenciasmedicas/caerse.gif'
    }
};

var availableSounds = {
    path: './assets/sounds/',
    availableSoundFiles: [
        {
            name: 'surprised',
            file: 'surprised.mp3'
        }
    ]
};


var availableVideos = {
    path: './assets/sounds/',
    availableVideoFiles: [
        {
            name: 'digimon',
            url: 'https://www.youtube.com/watch?v=b1uH4BnswKQ'
        }, {
            name: 'dora',
            url: 'https://www.youtube.com/watch?v=EdgV1FMFDq4'
        }
    ],
    errorVideo: {
        url: 'https://www.youtube.com/watch?v=sDj72zqZakE'
    }
}

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
