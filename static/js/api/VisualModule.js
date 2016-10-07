/**
 *  Manages the resources like images and animations the can be shown in the Visual Module.
 *  To animate the SVG assets we use SVG-Morpheus from github: https://github.com/alexk111/SVG-Morpheus.
 */
class VisualModule extends Module{

    /**
     *  The image files information can be obtained from a folder if a path is given.
     *  but in the actual version is needed an string array containing the names of the
     *  image files available in the folder  "/assets/images."
     *  @param imageObject The imageObject structure is the following:
     *  imageObject = {
     *          path: path where the image files are stored.
     *          availableImageFiles:[
     *              {
     *                  name: name or tag for the sound file,
     *                  file: name of the file.
     *                  url: url of the image source from the web.
     *              }
     *          ],
     *          errorImage:{
     *            file: name of the file.
     *            url: url of the image source from the web.
     *          }
     *      }
     */
    constructor(id, imageObject){
        super(id);
        this.storingPath = imageObject.path;
        this.availableSVGAssets = this.getAvailableSVGAssets();
        this.availableImages = imageObject.availableImageFiles;
        this.renderedSVG = new SVGMorpheus('#svg-assets', {iconId: 'full-opened-eyes'});
        this.msg = $("#msg");
        this.errorImageSource = null;

        this.errorImageSource = 'http://hdimagesnew.com/wp-content/uploads/2016/09/image-not-found.jpg';
        if( typeof imageObject.errorImage !== "undefined" ){
            if( typeof imageObject.errorImage.url !== "undefined" && imageObject.errorImage.url != null)
                this.errorImageSource = imageObject.errorImage.url;
            else if( typeof imageObject.errorImage.path !== "undefined" && imageObject.errorImage.path != null)
                this.errorImageSource = imageObject.errorImage.path;       
        }
        
        this.renderSVGSet = function(SVGSet, endCallback){
            utils_renderSVGSet(SVGSet,this.renderedSVG, endCallback);
        }
    
        /**
         * Shows a small frame. Useful to show conversation lines.
         * This function uses bootstrap alerts.
         * @param dialog text to be showed.
         */
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


        /**
         * Renders a set of SVG resources. This SVG resources must be correctly available
         * in the HTML file. For more info check: https://github.com/alexk111/SVG-Morpheus.
         * @param SVGSet set of SVG assets availables in the HTML file with the following structure
         *      {
         *          [
         *              {
         *                  id: id of the SVG to be rendered,
         *                  properties: {
         *                  duration: duration of the animation being rendered,
         *                  easing: velocity of the animation. available easings in the github repository,
         *                  rotation: rotation of the animation. available rotations in the github repository
         *              },
         *              delay: time to wait before this animation starts.
         *          ]
         *      }
         * 
         */
        this.renderSVGSet = function(SVGSet){
            utils_renderSVGSet(SVGSet,this.renderedSVG);
        }

        /**
         *  Shows a picture available in the image assets folder.
         *  @param name Name of the picture to be shown.
         */
        this.showPicture = function(name){
            var imageObject = this.getImageObjectByName(name);
            var image = this.errorImageSource;

            if(imageObject != null){
                if(typeof imageObject.url !== "undefined"){
                    image = imageObject.url;
                }else if(typeof imageObject.file !== "undefined" ){
                    image = this.storingPath + this.image.file
                }
            }        

            $('#msg').css('z-index', 3);
            $('#image-keeper').css('display','flex');
            $('#image-keeper #image img')
                .on('error', function() { $(this).attr('src',this.errorImage); })
                .attr('src',image);
            $('#image-keeper #close').on('click', 'button', function(){
                $('#image-keeper').css('display','none');
                $('#msg').css('z-index', 0);
            })
        }
        
        this.updateBatteryStatus = function(level){
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

    /**
     *   Obtains the image source given the name.
     *   @returns The image source, url have priority. Default error image if url and path are null.
     */
    getImageObjectByName(name){
        var length = this.availableImages.length;
        var toShow = null
        for(var i=0; i<length; i++){
            if(this.availableImages[i].name == name){
                toShow = this.availableImages[i];
            }
        }
        return toShow;
    }

    /**
     *  Retrieves from the HTML file the information of all the avilable SVG
     *  assets that can be rendered.
     *  @return the id of each available SVG asset.
     */
    getAvailableSVGAssets(){
        var availableSVGAssets = [];
        $('svg g').each(function(){
            var svgId = $(this).attr('id');
            availableSVGAssets.push(svgId);
        });
        return availableSVGAssets;
    }
}