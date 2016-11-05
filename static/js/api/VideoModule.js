/**
 *  Plays a video from youtube or from a folder. Actually this application supports only
 *  (revisar archivos de video soportados por google chrome)
 */
class VideoModule extends Module{

    /**
     *  initialize a VideoModule with a given Id and if a videoObject is provided¨
     *  it loads the available videos in the folder of the given path.
     *  @param id id of the new Module.
     *  @param videosObject object containing the info of a video folder:
     *  {
     *      path[String]: path of the folder,
     *      availableVideoFiles[Object]: [
     *          {
     *              name[String]: name of the available video files in the path,
     *              file[String]: video file to be played.
     *              url[String]: url of the video to be played. 
     *          }
     *      ],
     *      errorVideo[Object]:{
     *          file[String]: file of the video to be displayed if an error occurs
     *          url[String]: url of the video to be displayed if an error occurs
     *      }
     *  }
     *  
     *
     *  availableVideos is an optional String array which must contain the name of the
     *  videos available in the given path.
     */
    constructor(id, videosObject){
        super(id);
        if(typeof videosObject !== "undefined" ){
            this.storagePath = videosObject.path;
            this.availableVideos = videosObject.availableVideoFiles;
            if(typeof videosObject.errorVideo !== "undefined")
                this.errorVideo = videosObject.errorVideo;
            else
                this.errorVideo = {
                    name:  'default error video',
                    url: 'https://www.youtube.com/watch?v=sDj72zqZakE'
                }
        }
        
        /**
         *  Show a video. The played video will depend on the parameters of the videoObject.
         *  @param videoObject[Object]  Object containing the information of the video to be played.
         *  {
         *      name[String]: name of the video,
         *      url[String]: url of the video to be played (Only YouTube is supported at the moment),
         *      file[String]: video file to be played.
         *  }
         *  Passing the url or the file is enough. But if the two parameters are passed to the function,
         *  playing the video from the url is priority.
         */
        this.showVideo = function(name, options, callback){
            var videoObject = this.getVideoObjectByName(name);

            if( videoObject == null )
                videoObject = this.errorVideo;
            else{
                if(typeof videoObject.url !== "undefined"){
                    this.showVideoFromYouTube(videoObject);
                }else if(typeof videoObject.file !== "undefined" ){
                    this.showVideoFile(this.storingPath + this.image.file);
                }
            }  
        }
    }

    /**
     *  Obtains a video from the list of available videos and returns it.
     *  @returns [String] source of the video from the requested name.
     */
    getVideoObjectByName(name){
        var length = this.availableVideos.length;
        var toShow = null;
        for(var i=0; i<length; i++){
            if( this.availableVideos[i].name == name)
                toShow = this.availableVideos[i];
        } 
        return toShow;
    }

    /**
     * Creates necesary elements for a youtube video to be played correctly.
     * @param videoObject[Object] Contains video info. 
    */
    createYouTubeElement(videoObject){
        var url = 'http://www.youtube.com/embed/' + this.getParameterByName('v', videoObject.url) + '?enablejsapi=1';
        $('body').append('<div id="show-video">'+
            '<div id="close">'+
                '<button>X</button>'+
                '</div>'+
                '<div id="'+videoObject.name+'">'+
                    '<iframe width="800" height="400" frameborder="0" title="YouTube video player" type="text/html" src="'+url+'">'+
                    '</iframe>'+
                '</div>'+
            '</div>');
    }

    /**
     *  Plays a video from YouTube with the given url
     *  @param url[String] url of the video to be played.
     */
    showVideoFromYouTube(videoObject, properties, callback){
        //See http://stackoverflow.com/questions/7443578/youtube-iframe-api-how-do-i-control-a-iframe-player-thats-already-in-the-html?rq=1
        this.createYouTubeElement(videoObject);
        $('#show-video').css('display','flex');
        setTimeout(function() {
            callPlayer(videoObject.name,"playVideo");
        }, 500);
        $('#show-video #close').on('click', 'button', function(){
            $('#show-video').css('display','none');
            $('#msg').css('z-index', 0);
            callPlayer(videoObject.name,"stopVideo");
        });
    }

    
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}
