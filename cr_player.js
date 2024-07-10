class CR_Player {

  theme = "basic";
  audio_player = null;
  emp_ui_player = null;

  color_hightlight="#bd92ff";

  name_song="Carrot Player Music";
  name_singer="Music Player";

  onCreate() {
    this.audio_player = new Audio();
    $('head').append('<link rel="stylesheet" type="text/css" href="cr_player/theme_' + this.theme + '.css">');
  }

  play(url_mp3) {
    this.set_mp3(url_mp3).audio_player.play();
    this.uiPlayer();
  }

  play(url_mp3,name_song){
    this.name_song=name_song;
    this.set_mp3(url_mp3).audio_player.play();
    this.uiPlayer();
  }

  play(url_mp3,name_song,name_singer){
    this.name_song=name_song;
    this.name_singer=name_singer;
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
      html+='<img src="cr_player/song.png" id="cr_song_avatar"/>';
      html+='<div id="cr_info" class="d-inline mt-2 ml-2">';
      html+='<div id="cr_name">'+this.name_song+'</div>';
      html+='<div id="cr_singer" style="color:'+this.color_hightlight+'">'+this.name_singer+'</div>';
      html+='</div>';
      html+='<button onclick="cr_player.play();" class="btn btn-sm btn-dark ml-2"><i class="far fa-play-circle"></i></button>';
      html+='<button onclick="cr_player.stop();" class="btn btn-sm btn-dark ml-1"><i class="fas fa-step-backward"></i></button>';
      html+='<button onclick="cr_player.stop();" class="btn btn-sm btn-dark ml-1"><i class="fas fa-step-forward"></i></button>';
      html+='<button onclick="cr_player.stop();" class="btn btn-sm btn-dark ml-1"><i class="far fa-stop-circle"></i></button>';
      html+='<button onclick="cr_player.hide();" class="btn btn-sm btn-dark ml-1 btn-setting"><i class="fas fa-tools"></i></button>';
      html+='</div>';
      this.emp_ui_player=$(html);
      $("body").append(this.emp_ui_player);
      $(this.emp_ui_player).find("#cr_name").html(this.name_song);
      $(this.emp_ui_player).find("#cr_singer").html(this.name_singer);
    }else{
      $(this.emp_ui_player).fadeIn(500);
      $(this.emp_ui_player).find("#cr_name").html(this.name_song);
      $(this.emp_ui_player).find("#cr_singer").html(this.name_singer);
    }
  }

  hide(){
    $(this.emp_ui_player).fadeOut(500);
  }

  stop(){
    this.audio_player.pause();
    this.audio_player.currentTime = 0;
    this.hide();
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