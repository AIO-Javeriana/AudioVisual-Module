//VisualModule
class VisualModule {
    constructor( imageFiles ){
        this.availableSVGAssets = this.getAvailableSVGAssets();
        this.availableImages = imageFiles;
        this.renderedSVG = new SVGMorpheus('#svg-assets', {iconId: 'full-opened-eyes'});
    }

    renderSVGSet(SVGSet){
        utils_renderSVGSet(SVGSet,this.renderedSVG);
    }

    //probar con el while y el terminar la funcion de repetir ok?
    showPicture(image){
        $('#image-keeper').css('display','flex');
        $('#image-keeper #image img').attr('src','./assets/images/'+image);
        $('#image-keeper #close').on('click', 'button', function(){
            $('#image-keeper').css('display','none');
        })
    }

    getAvailableSVGAssets(){
        var availableSVGAssets = [];
        $('svg g').each(function(){
            var svgId = $(this).attr('id');
            availableSVGAssets.push(svgId);
        });
        return availableSVGAssets;
    }

    showDialogFrame(dialog){
        
    }
}
