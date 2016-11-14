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
     *          path[String]: path where the image files are stored.
     *          availableImageFiles[Object]:[
     *              {
     *                  name[String]: name or tag for the sound file,
     *                  file[String]: name of the file.
     *                  url[String]: url of the image source from the web.
     *              }
     *          ],
     *          errorImage:{
     *            file[String]: name of the file.
     *            url[String]: url of the image source from the web.
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
        
         /**
         * Renders a set of SVG resources. This SVG resources must be correctly available
         * in the HTML file. For more info check: https://github.com/alexk111/SVG-Morpheus.
         * @param SVGSet set of SVG assets availables in the HTML file with the following structure
         *      {
         *          [
         *              {
         *                  id[String]: id of the SVG to be rendered,
         *                  properties[Object]: {
         *                  duration[integer]: duration of the animation being rendered, time in ms.
         *                  easing[String]: velocity of the animation. available easings in the github repository,
         *                  rotation[String]: rotation of the animation. available rotations in the github repository
         *              },
         *              delay[integer]: time to wait before this animation starts, time in ms.
         *          ]
         *      }
         * 
         */
        this.renderSVGSet = function(SVGSet, callback){
            utils_renderSVGSet(SVGSet,this.renderedSVG, callback);
        }
        
        /**
         * Makes the face blink once.
         * @param callback[function] function to be called when animation finishes.
         */
        this.blink = function(callback){
            var toRender = [{
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
            this.renderSVGSet(toRender,callback);
        }

        /**
         * Makes the face to look in a sneaky way to the right.
         * @param callback[function] function to be called when animation finishes.
         */
        this.sneakyLookRight = function(callback){
            var toRender = [{
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
            this.renderSVGSet(toRender,callback);
        }

        /**
         * Makes the face to look in a sneaky way to the left.
         * @param callback[function] function to be called when animation finishes.
         */
        this.sneakyLookLeft = function(callback){
            var toRender = [{
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
            this.renderSVGSet(toRender,callback);
        }

        this.changeEmotion = function(emotionalValue){
            if (emotionalValue == 0){
                var toRender = [
                    {
                        id:'full-opened-eyes',
                        properties: {
                            duration: 500,
                            easing: 'linear',
                            rotation: 'none'
                        },
                        delay: 500
                    }
                ];
            }else if(emotionalValue > 0){
                var toRender = [
                    {
                        id:'almost-closed-happy-eyes',
                        properties: {
                            duration: 500,
                            easing: 'linear',
                            rotation: 'none'
                        },
                        delay: 500
                    }
                ];
            }else{
                var toRender = [
                    {
                        id:'medium-closed-sad-eyes',
                        properties: {
                            duration: 500,
                            easing: 'linear',
                            rotation: 'none'
                        },
                        delay: 500
                    }
                ];
            }
            this.renderSVGSet(toRender,null,function(dataCallback){});
        }

        /**
         * Shows a small frame. Useful to show conversation lines.
         * This function uses bootstrap alerts.
         * @param dialog[String] text to be showed.
         */
        this.showDialogFrame = function(dialog, msg_type, velocity, callback){
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
                callback();
            });
        }
        
        /**
         *  Shows a picture available in the image assets folder.
         *  @param name[String] Name of the picture to be shown.
         */
        this.showPicture = function(name, options, callback){
            var imageObject = this.getImageObjectByName(name);
            var image = this.errorImageSource;
            var time = 0;
            if(imageObject != null){
                if(typeof imageObject.url !== "undefined"){
                    image = imageObject.url;
                }else if(typeof imageObject.file !== "undefined" ){
                    image = this.storingPath + this.image.file
                }

                if(typeof options.timeout !== "undefined"){
                    time = options.timeout;
                }
            }        
            
            this.showImagePreview(image);
            var that = this;
            var callback_ = callback;
            $('#image-keeper #close').on('click', 'button', function(){
                that.closeImagePreview(); 
                callback();
            });
            setTimeout(function(){
                that.closeImagePreview(); 
                callback();
            }, time);
        }        
    }

    /**
     * Closes the show picture preview window
     */
    closeImagePreview(){
        $('#image-keeper').css('display','none');
        $('#msg').css('z-index', 0);
    }

    /**
     * Shows up the show picture preview window
     * @param image[String] image to be shown.
     */
    showImagePreview(image){
        $('#msg').css('z-index', 3);
        $('#image-keeper').css('display','flex');
        $('#image-keeper #image img')
            .on('error', function() { $(this).attr('src',this.errorImage); })
            .attr('src',image);
    }

    /**
     *   Obtains the image source given the name.
     *   @returns [String] The image source, url have priority over path file. Default error image if url and path are null.
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
     *  Shows a picture available in the image assets folder.
     *  @param name[String] Name of the picture to be shown.
     */
    showPicture(name){
        var image = this.getImageByName(name);
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

    /**
     *  Retrieves from the HTML file the information of all the avilable SVG
     *  assets that can be rendered.
     *  @return [String[]] the id of each available SVG asset.
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