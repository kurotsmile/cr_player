class CR_Player{
    audio_player=null;
    emp_ui_player=null;
    
    onCreate(){
        this.audio_player=new Audio();
    }

    play(url_mp3){
        this.set_mp3(url_mp3).audio_player.play();
        $("body").append('<div style="display:fix;top:0px;left:0px;left:0px;backrgound:white;">thanh</div>');
    }

    set_mp3(url_mp3){
        this.audio_player.src=url_mp3;
        return this;
    }

    uiPlayer(){

    }

    set_mediaSession(s_title,s_artist,s_album,s_url_avatar){
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: s_title,
              artist: s_artist,
              album: s_album,
              artwork: [
                {
                  src: s_url_avatar,
                  sizes: "384x384",
                  type: "image/jpg",
                }
              ],
            });
          
            navigator.mediaSession.setActionHandler("play", () => {
                cr_player.audio_player.play();
            });
            navigator.mediaSession.setActionHandler("pause", () => {
                cr_player.audio_player.pause();
            });
            navigator.mediaSession.setActionHandler("stop", () => {
                cr_player.audio_player.stop();
            });
            navigator.mediaSession.setActionHandler("seekbackward", () => {
              /* Code excerpted. */
            });
            navigator.mediaSession.setActionHandler("seekforward", () => {
              /* Code excerpted. */
            });
            navigator.mediaSession.setActionHandler("seekto", () => {
              /* Code excerpted. */
            });
            navigator.mediaSession.setActionHandler("previoustrack", () => {
                cr_player.audio_player.prev();
            });
            navigator.mediaSession.setActionHandler("nexttrack", () => {
                cr_player.audio_player.next();
            });
        }
    }
    
}
var cr_player=new CR_Player();