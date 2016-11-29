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

        this.availableVideos; 
        this.player;

        if(videosObject != null )
            this.availableVideos = videosObject;
        
        this.player = this.initPlayer();

        /**
         * 
         */
        this.playVideo = function(name, options, callback){
            var id = this.getVideoId(name);
            var properties = {
                volume: 100,
                speed: 1,
                callback: function(){}
            };

            //Checking options
            if(callback != null)
                properties.callback = callback;
            if(options != null){
                if(options.volume != null)
                    properties.volume = options.volume*100;
                if(options.speed != null)
                    properties.speed = options.speed;
            }

            //Setting options
            this.player.addEventListener('onStateChange', function(event){
                if(event.data === 0) {    
                    properties.callback();
                }
            });
            this.player.setVolume(properties.volume);
            this.player.setPlaybackRate(properties.speed);
            this.player.cueVideoById(id);
            this.player.playVideo();
        }
    }

    getVideoId(name){
        console.log(availableVideos);
        var tam = this.availableVideos.length;
        for(var i=0; i<tam; i++){
            if(this.availableVideos[i].name == name)
                return this.youtube_parser(this.availableVideos[i].url);
        }
        return 'sDj72zqZakE';
    }

    // autoplay video
    onPlayerReady(event){
        this.player.setVolume(100);
        this.player.setPlaybackRate(1);
    }

    //taken from http://stackoverflow.com/a/8260383/3622319
    youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    initPlayer (){
        var player;
        player = new YT.Player('player', {
            height: '480',
            width: '800',
            videoId: 'sDj72zqZakE',
            events: {
                'onPlayerReady': this.onPlayerReady
            }
        });
        return player;
    }
}
