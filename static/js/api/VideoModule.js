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
     *       path: path of the folder,
     *       availableVideoFiles: name of the available video files in the path.
     *   }
     *
     *  availableVideos is an optional String array which must contain the name of the
     *  videos available in path.
     */
    constructor(id, videosObject){
        super(id);
    }

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
    showVideo(videoObject){
        if(videoObject.url != null)
            this.showVideoFromYouTube(videoObject.url);
        else
            this.showVideoFromFolder(videoObject.path);
    }

    /**
     *  Plays a video from YouTube with the given url
     *  @param url url of the video to be played.
     */
    showVideoFromYouTube(url){
        throw 'Not implemented function exception';
    }

    /**
     *  Plays a video from a folder of video resources.
     *  @param videoObject object which contains the path of the folder and optionally the available videos to be played.
     */
    showVideoFromFolder(file){
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
