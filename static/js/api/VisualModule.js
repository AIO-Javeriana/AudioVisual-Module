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
            this.msg.fadeOut(velocity, function(){
                $( this ).removeClass();
                $( this ).empty();
                $( this ).addClass("alert");
                switch (msg_type) {
                    case 'error':
                        $( this ).addClass("alert-danger");
                        break;
                    case 'info':
                        $( this ).addClass("alert-info");
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
                $( this ).html(msg_text);
                $( this ).fadeIn(velocity);
            });
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
        
        this.update_battery_status = function(level){
            $("#battery_status").children("i").hide();
            switch (true) {
                case (level<10):
                    $("#battery_empty").show();
                    break;
                case (level>=10 && level<20):
                    $("#battery_10").show();
                    break;
                case (level>=20 && level<30):
                    $("#battery_20").show();
                    break;
                case (level>=30 && level<40):
                    $("#battery_40").show();
                    break;
                case (level>=40 && level<50):
                    $("#battery_50").show();
                    break;
                case (level>=50 && level<60):
                    $("#battery_60").show();
                    break;
                case (level>=60 && level<70):
                    $("#battery_70").show();
                    break;    
                case (level>=70 && level<80):
                    $("#battery_80").show();
                    break;
                case (level>=80 && level<90):
                    $("#battery_90").show();
                    break;
                case (level>=90):
                    $("#battery_full").show();
                    break;
            }
        }
    }
}
