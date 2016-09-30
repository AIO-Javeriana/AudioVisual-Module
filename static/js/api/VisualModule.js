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
            $("#battery_status").removeClass();
            $("#battery_status").addClass("mdi mdi-light mdi-18px");
            switch (true) {
                case (level<10):
                    $("#battery_status").addClass("mdi-battery-alert");
                    break;
                case (level>=10 && level<20):
                    $("#battery_status").addClass("mdi-battery-10");
                    break;
                case (level>=20 && level<30):
                    $("#battery_status").addClass("mdi-battery-20");
                    break;
                case (level>=30 && level<40):
                    $("#battery_status").addClass("mdi-battery-30");
                    break;
                case (level>=40 && level<50):
                    $("#battery_status").addClass("mdi-battery-40");
                    break;
                case (level>=50 && level<60):
                    $("#battery_status").addClass("mdi-battery-50");
                    break;
                case (level>=60 && level<70):
                    $("#battery_status").addClass("mdi-battery-60");
                    break;    
                case (level>=70 && level<80):
                    $("#battery_status").addClass("mdi-battery-70");
                    break;
                case (level>=80 && level<90):
                    $("#battery_status").addClass("mdi-battery-80");
                    break;
                case (level>=90):
                    $("#battery_status").addClass("mdi-battery");
                    break;
            }
        }
    }
}
