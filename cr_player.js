class CR_Player {

  theme = "basic";
  audio_player = null;
  emp_ui_player = null;

  onCreate() {
    this.audio_player = new Audio();
    $('head').append('<link rel="stylesheet" type="text/css" href="cr_player/theme_' + this.theme + '.css">');
    this.uiPlayer();
  }

  play(url_mp3) {
    this.set_mp3(url_mp3).audio_player.play();
    this.uiPlayer();
  }

  set_mp3(url_mp3) {
    this.audio_player.src = url_mp3;
    return this;
  }

  uiPlayer() {
    if(this.emp_ui_player==null){
      var html='<div id="cr_player">';
      html+='<button class="btn btn-sm btn-dark mt-2 ml-2"><i class="far fa-play-circle"></i></button>';
      html+='<button onclick="cr_player.hide();" class="btn btn-sm btn-dark mt-2 ml-1"><i class="fas fa-window-close"></i></button>';
      html+='</div>';
      this.emp_ui_player=$(html);
      $("body").append(this.emp_ui_player);
    }else{
      $(this.emp_ui_player).fadeIn(500);
    }
  }

  hide(){
    $(this.emp_ui_player).fadeOut(500);
  }

  set_mediaSession(s_title, s_artist, s_album, s_url_avatar) {
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
var cr_player = new CR_Player();