//VisualModule
class VisualModule {
    constructor( imageFiles ){
        this.availableImages = imageFiles;
        this.renderedSVG = new SVGMorpheus('#svg-assets', {iconId: 'full-opened-eyes'});
        this.msg = $("#msg");
        
        this.renderSVGSet = function(SVGSet){
            utils_renderSVGSet(SVGSet,this.renderedSVG);
        }
        
        this.showDialogFrame = function(dialog, msg_type, velocity){
            this.msg.fadeOut(velocity);
            this.msg.removeClass();
            this.msg.empty();
            this.msg.addClass("alert");
            switch (msg_type) {
                case 'error':
                    this.msg.addClass("alert-danger");
                    break;
                case 'info':
                    this.msg.addClass("alert-info");
                    break;
            }
            var msg_text = "";
            $.each( dialog, function( index, value ){
                switch (value.tone) {
                    case 'YELL':
                        msg_text += "<strong>" + value.msg + "</strong>";
                        break;
                    case 'NORMAL':
                        msg_text += value.msg;
                        break;
                }
            });
            this.msg.append(msg_text);
            this.msg.fadeIn(velocity);
        }
        
        //probar con el while y el terminar la funcion de repetir ok?
        this.showPicture = function(image){
            $('#image-keeper').css('display','flex');
            $('#image-keeper #image img').attr('src','./assets/images/'+image);
            $('#image-keeper #close').on('click', 'button', function(){
                $('#image-keeper').css('display','none');
            })
        }
        
        this.getAvailableSVGAssets = function(){
            var availableSVGAssets = [];
            $('svg g').each(function(){
                var svgId = $(this).attr('id');
                availableSVGAssets.push(svgId);
            });
            return availableSVGAssets;
        }
    }
}
