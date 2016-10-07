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
     *      path: path of the folder,
     *      availableVideoFiles: [
     *          {
     *              name: name of the available video files in the path,
     *              file: video file to be played.
     *              url: url of the video to be played. 
     *          }
     *      ],
     *      errorVideo:{
     *          file: file of the video to be displayed if an error occurs
     *          url: url of the video to be displayed if an error occurs
     *      }
     *  }
     *  
     *
     *  availableVideos is an optional String array which must contain the name of the
     *  videos available in path.
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

        this.player = null;

        
        /**
         *  Show a video. The played video will depend on the parameters of the videoObject.
         *  @param videoObject  Object containing the information of the video to be played.
         *  {
         *      name: name of the video,
         *      url: url of the video to be played (Only YouTube is supported at the moment),
         *      file: video file to be played.
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
                    this.showVideoFromYouTube(videoObject.url);
                }else if(typeof videoObject.file !== "undefined" ){
                    this.showVideoFile(this.storingPath + this.image.file);
                }
            }  
        }
    }

    /**
     *  Obtains a video from the list of available videos and returns it.
     *  @returns source of the video from the requested name.
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
     *  Plays a video from YouTube with the given url
     *  @param url url of the video to be played.
     */
    showVideoFromYouTube(url, properties, callback){

        $('#msg').css('z-index', 3);
        var videoPlayer = $('<div>',{
            'id': 'video-player'
        })
        $('#show-video').append(videoPlayer);
        $('#show-video').css('display','flex');
        
        var id = this.getParameterByName('v', url);

        var player = new YT.Player('video-player', {
            height: '400',
            width: '800',
            videoId: id,
            events: {
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange
            }
        });
        
        //setTimeout(function(){ player.stopVideo() }, 3000);

        $('#show-video #close').on('click', 'button', function(){
            $('#show-video').css('display','none');
            $('#msg').css('z-index', 0);
            player.stopVideo()
            $('#show-video').remove('#video-player');
        })

        //player.playVideo();
    }

    // autoplay video
    onPlayerReady(event) {
        event.target.playVideo();
    }

    // when video ends
    onPlayerStateChange(event) {        
        if(event.data === 0) {            
            alert('done');
        }
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


    /**
     *  Plays a video from a folder of video resources.
     *  @param videoObject object which contains the path of the folder and optionally the available videos to be played.
     */
    showVideoFile(file){
        throw 'Not implemented function exception';
    }

    /**
     *  Gets the video resources from path.
     *  @param name name of the video to be played.
     */
    getVideoFilesFromFolder(path){
        throw 'Not implemented function exception';
    }
}
