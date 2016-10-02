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
     *       imageFiles: string array containing the name of all the desired sounds to be played during script perform.
     *       path: url where the sound files are hosted.
     *  }
     */
    constructor(id, imageObject){
        super(id);
        //'./assets/images/'
        this.imagesHostingPath = path;
        this.availableSVGAssets = this.getAvailableSVGAssets();
        this.availableImages = this.getImageFiles(imageFiles);
        this.renderedSVG = new SVGMorpheus('#svg-assets', {iconId: 'full-opened-eyes'});
    }

    /**
     *  Delegates the task of retrieving the information of the available images
     *  to retrieveImageInfoFromFolder from a given path.
     *  Note: The sound files must be stored in the path "/assets/images."
     *  @param imageObject The imageObject structure is the following:
     *  imageObject = {
     *       imageFiles: string array containing the name of all the desired sounds to be played during script perform.
     *       path: url where the sound files are hosted.
     *  }
     */
    getImageFiles(imageObject){
        if(imageObject.imageFiles != null)
            this.availableImages = imageFiles;
        else
            getImageFilesFromFolder(imageObject.path);
    }

    /**
     * Renders a set of SVG resources. This SVG resources must be correctly available
     * in the HTML file. For more info check: https://github.com/alexk111/SVG-Morpheus.
     */
    renderSVGSet(SVGSet){
        utils_renderSVGSet(SVGSet,this.renderedSVG);
    }

    /**
     * Retrieves information of image files from a given path.
     * @throws unimplementedFunction Because the function doesn´t need to be implemented yet.
     */
    retrieveImageInfoFromFolder(path){
        var unimplementedFunction = 'unimplemented function';
        throw unimplementedFunction;
    }

    /**
     * Shows a picture available in the image assets folder.
     */
    showPicture(image){
        $('#image-keeper').css('display','flex');
        $('#image-keeper #image img').attr('src',this.imagesHostingPath+image);
        $('#image-keeper #close').on('click', 'button', function(){
            $('#image-keeper').css('display','none');
        })
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

    /**
     * Shows a small frame. Useful to show conversation lines.
     * @param dialog text to be showed.
     */
    showDialogFrame(dialog){

    }
}
