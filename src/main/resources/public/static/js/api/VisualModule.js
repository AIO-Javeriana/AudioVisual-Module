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
         *      [
         *          {
         *              id[String]: id of the SVG to be rendered,
         *              properties[Object]: {
         *                 duration[integer]: duration of the animation being rendered, time in ms.
         *                 easing[String]: velocity of the animation. available easings in the github repository,
         *                 rotation[String]: rotation of the animation. available rotations in the github repository
         *              },
         *              delay[integer]: time to wait before this animation starts, time in ms.
         *          }
         *      ]
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

        /**
         * State of the actor at lowest level of sadness.
         * @param callback[function] function to be called when animation finishes.
         */
        this.sadLow = function(callback){
            var toRender = [
                {
                    id:'almost-closed-sad-eyes',
                    properties: {
                        duration: 500,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 500
                }
            ];
            this.renderSVGSet(toRender,callback);
        }

        /**
         * State of the actor at medium level of sadness.
         * @param callback[function] function to be called when animation finishes.
         */
        this.sadMedium = function(callback){
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
            this.renderSVGSet(toRender,callback);
        }
        
        /**
         * State of the actor at highest level of sadness.
         * @param callback[function] function to be called when animation finishes.
         */
        this.sadHigh = function(callback){
            var toRender = [
                {
                    id:'slightly-closed-sad-eyes',
                    properties: {
                        duration: 500,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 500
                }
            ];
            this.renderSVGSet(toRender,callback);
        }

        /**
         * State of the actor at lowest level of happiness.
         * @param callback[function] function to be called when animation finishes.
         */
        this.happyLow = function(callback){
            var toRender = [
                {
                    id:'slightly-closed-happy-eyes',
                    properties: {
                        duration: 500,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 500
                }
            ];
            this.renderSVGSet(toRender,callback);
        }

        /**
         * State of the actor at medium level of happiness.
         * @param callback[function] function to be called when animation finishes.
         */
        this.happyMedium = function(callback){
            var toRender = [
                {
                    id:'medium-closed-happy-eyes',
                    properties: {
                        duration: 500,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 500
                }
            ];
            this.renderSVGSet(toRender,callback);
        }

        /**
         * State of the actor at highest level of happiness.
         * @param callback[function] function to be called when animation finishes.
         */
        this.happyHigh = function(callback){
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
            this.renderSVGSet(toRender,callback);
        }

        /**
         * State of the actor at neutral state.
         * @param callback[function] function to be called when animation finishes.
         */
        this.neutral = function(callback){
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
            this.renderSVGSet(toRender,callback);
        }

        this.talk = function(callback){
            var toRender = [
                {
                    id:'full-opened-eyes_opened-talking-mouth',
                    properties: {
                        duration: 200,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 0
                },{
                    id:'full-opened-eyes_closed-talking-mouth',
                    properties: {
                        duration: 100,
                        easing: 'linear',
                        rotation: 'none'
                    },
                    delay: 0
                }
            ];
            this.renderSVGSet(toRender,callback);
        }

        /**
         * Shows a small frame. Useful to show conversation lines.
         * This function uses bootstrap alerts.
         * @param dialogs[String[]] Array of texts that will be shown.
         * @param options[Object]{
         *          tone[String]: Determines the tone of the dialog frame, ie. high te text gonna be uppercase. values = ['low', 'medium', 'high']. Default = 'medium'.
         *          type[String]: Determines the type of the dialog frame, ie. danger makes dialog frame red. values = ['success','info', 'warning', 'danger']. Default: info.
         *                        more info http://www.w3schools.com/bootstrap/bootstrap_alerts.asp           Colors:    (green)  (blue)   (yellow)    (red)
         *          waitTime[String]: time to wait between spawning each dialog frame: values = ['short', 'medium', 'high'].
         *                                                                          time values =  (1s)     (2.5s)   (4s)
         *      }
         * @param callback[function] function to be called when animation finishes.
         */
        this.showDialogFrames = function(dialogs, options, callback){
            utils_showDialogFrames(dialogs, options, callback);
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