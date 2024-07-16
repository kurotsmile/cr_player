class CR_Player {

  theme = "theme_basic_top";
  audio_player = null;
  emp_ui_player = null;

  color_hightlight = "#bd92ff";

  name_song = "Carrot Player Music";
  name_singer = "Music Player";

  list_song = [];
  index_play_cur = 0;

  list_theme=['theme_basic_top','theme_basic_bottom','theme_dock_left','theme_dock_right'];

  mediaSession=true;

  path="cr_player";
  onCreate() {
    this.audio_player = new Audio();
    if(localStorage.getItem("cr_player_theme")!=null) this.theme=localStorage.getItem("cr_player_theme");
    if(localStorage.getItem("mediaSession")!=null){
      if(localStorage.getItem("mediaSession")=="true")
        this.mediaSession=true;
      else
        this.mediaSession=false;
    }
    $('head').append('<link rel="stylesheet" type="text/css" href="cr_player/theme.css">');
    $('head').append('<link id="'+this.theme+'" rel="stylesheet" type="text/css" href="cr_player/' + this.theme + '.css">');
    this.upDateInfoLoad();
  }

  upDateInfoLoad() {
    this.audio_player.addEventListener('canplaythrough', function () {
      cr_player.audio_player.play();
    }, false);

  
    this.audio_player.addEventListener('progress', function () {
      var buffered = this.buffered;
      if (buffered.length > 0) {
        var loadedPercentage = (buffered.end(0) / this.duration) * 100;
        $("#cr_singer").html('Audio loaded: ' + loadedPercentage.toFixed(2) + '%');
        $("#cr_btn_play").html('<i class="fas fa-spinner fa-spin"></i>');
      }

      if (cr_player.audio_player.readyState >= 2){
          $("#cr_singer").html(cr_player.name_singer);
          cr_player.checkIconPlay();
      }
    });

    this.audio_player.addEventListener('play', function () {
      setTimeout(() => {
        $("#cr_singer").html(cr_player.name_singer);
        cr_player.checkIconPlay();
      }, 1000);
    });

    this.audio_player.addEventListener('error', function () {
      setTimeout(() => {
        $("#cr_singer").html('Error loading the audio');
        $("#cr_btn_play").html('<i class="fas fa-exclamation-circle"></i>');
      }, 1000);
    });
  }

  play(url_mp3) {
    this.index_play_cur = 0;
    this.list_song = [];
    var obj_data = { "mp3": url_mp3, "name": "Song " + this.list_song.length, "artist": "Carrot Player Music" };
    this.list_song.push(obj_data);
    if(this.mediaSession) this.set_mediaSession(obj_data.name,obj_data.artist,"Music For Life",this.path+"/song.png");
    this.set_mp3(url_mp3);
    this.uiPlayer();
  }

  play(url_mp3, name_song) {
    this.index_play_cur = 0;
    this.list_song = [];
    var obj_data = { "mp3": url_mp3, "name": name_song, "artist": "Carrot Player Music" };
    this.list_song.push(obj_data);
    this.name_song = name_song;
    if(this.mediaSession) this.set_mediaSession(obj_data.name,obj_data.artist,"Music For Life",this.path+"/song.png");
    this.set_mp3(url_mp3);
    this.uiPlayer();
  }

  play(url_mp3, name_song, name_singer) {
    this.index_play_cur = 0;
    this.list_song = [];
    var obj_data = { "mp3": url_mp3, "name": name_song, "artist": name_singer };
    this.list_song.push(obj_data);
    this.name_song = name_song;
    this.name_singer = name_singer;
    if(this.mediaSession) this.set_mediaSession(obj_data.name,obj_data.artist,"Music For Life",this.path+"/song.png");
    this.set_mp3(url_mp3);
    this.uiPlayer();
  }

  play_animation(emp){
  
  }

  start(data){
    
    this.set_mp3(data.url);
    this.uiPlayer();
  }

  play_by_index(index) {
    var song = this.list_song[index];
    this.name_song = song.name;
    this.name_singer = song.artist;
    this.set_mp3(song.mp3);
    this.uiPlayer();
  }

  add_song(url_mp3) {
    var obj_data = { "mp3": url_mp3, "name": "Song " + this.list_song.length, "artist": "Carrot Player Music" };
    this.list_song.push(obj_data);
    this.check_add_song_to_playlist();
  }

  add_song(url_mp3, name, artist) {
    var obj_data = { "mp3": url_mp3, "name": name, "artist": artist };
    this.list_song.push(obj_data);
    this.check_add_song_to_playlist();
  }

  check_add_song_to_playlist() {
    swal.fire({
      icon: 'success',
      title: 'Add songs to the list',
      Text: 'Add song to playlist successfully!',
      iconColor: cr_player.color_hightlight,
      confirmButtonColor: cr_player.color_hightlight
    })

    if (this.list_song.length == 1) {
      this.set_mp3(url_mp3).audio_player.play();
      this.uiPlayer();
    } else {
      this.updateMetaInfo();
    }
  }

  set_mp3(url_mp3) {
    this.audio_player.src = url_mp3;
    this.audio_player.load();
  }

  uiPlayer() {
    if (this.emp_ui_player == null) {
      var html = '<div id="cr_player">';
      html += '<img role="button" src="cr_player/song.png" id="cr_song_avatar" onclick="cr_player.show_playlist()"/>';
      html += '<div id="cr_info" class="d-inline mt-2 ml-2">';
      html += '<div id="cr_name">' + this.name_song + '</div>';
      html += '<div id="cr_singer" style="color:' + this.color_hightlight + '">' + this.name_singer + '</div>';
      html += '</div>';
      html += '<button onclick="cr_player.playOrPause();" class="btn btn-sm btn-dark ml-2" id="cr_btn_play"><i class="far fa-play-circle"></i></button>';
      html += '<button onclick="cr_player.prev_song();" class="btn btn-sm btn-dark ml-1" id="cr_btn_next"><i class="fas fa-step-backward"></i></button>';
      html += '<button onclick="cr_player.next_song();" class="btn btn-sm btn-dark ml-1" id="cr_btn_prev"><i class="fas fa-step-forward"></i></button>';
      html += '<button onclick="cr_player.stop();" class="btn btn-sm btn-dark ml-1"><i class="far fa-stop-circle"></i></button>';
      html += '<button onclick="cr_player.show_setting();" class="btn btn-sm btn-dark ml-1 btn-setting"><i class="fas fa-tools"></i></button>';
      html += '</div>';
      this.emp_ui_player = $(html);
      $("body").append(this.emp_ui_player);
      this.updateMetaInfo();
    } else {
      $(this.emp_ui_player).fadeIn(500);
      this.updateMetaInfo();
    }
  }

  updateMetaInfo() {
    $(this.emp_ui_player).find("#cr_name").html(this.name_song);
    $(this.emp_ui_player).find("#cr_singer").html(this.name_singer);
    if (this.list_song.length > 1) {
      $("#cr_btn_next").show();
      $("#cr_btn_prev").show();
    } else {
      $("#cr_btn_next").hide();
      $("#cr_btn_prev").hide();
    }
  }

  hide() {
    $(this.emp_ui_player).fadeOut(500);
  }

  stop() {
    this.list_song=[];
    this.audio_player.pause();
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
        cr_player.playOrPause();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        cr_player.playOrPause();
      });
      navigator.mediaSession.setActionHandler("stop", () => {
        cr_player.stop();
      });
      navigator.mediaSession.setActionHandler("seekbackward", () => {

      });
      navigator.mediaSession.setActionHandler("seekforward", () => {

      });
      navigator.mediaSession.setActionHandler("seekto", () => {

      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        cr_player.prev_song();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        cr_player.next_song();
      });
    }
  }

  playOrPause() {
    if (this.audio_player.paused)
      this.audio_player.play();
    else
      this.audio_player.pause();
    this.checkIconPlay();
  }

  checkIconPlay() {
    if (this.audio_player.paused)
      $("#cr_btn_play").html('<i class="far fa-play-circle"></i>');
    else
      $("#cr_btn_play").html('<i class="fas fa-pause-circle"></i>');
  }

  show_setting() {
    var html='';
    html+='<div class="form-group">';
      html+='<label for="unlockallmp3"><i class="fas fa-brush"></i> Interface and themes</label>';
      html+='<select class="form-control" id="dropdown_theme"><select>';
      html+='<small class="form-text text-muted">Change the style of the music player</small>';
    html+='</div>';

    html+='<div class="form-group">';
      html+='<label for="mediaSession"><i class="fas fa-pager"></i> Media Session</label>';
      html+='<select class="form-control" id="mediaSession">';
      html+='<option value="true" '+(cr_player.mediaSession === true ? "selected='true'" : "") +'>On</option>';
      html+='<option value="false" '+(cr_player.mediaSession === false ? "selected='true'" : "") +'>Off</option>';
      html+='<select>';
      html+='<small class="form-text text-muted">Turn on the media Session function so that songs are not interrupted when switching browser tabs</small>';
    html+='</div>';

    swal.fire({
      title: "Setting",
      html: html,
      confirmButtonColor: cr_player.color_hightlight,
      didOpen:()=>{
        $(cr_player.list_theme).each(function(index,th){
          if(cr_player.theme==th)
            $("#dropdown_theme").append($('<option>', {value: th,text: th,selected:true}));
          else
            $("#dropdown_theme").append($('<option>', {value: th,text: th}));
        });
      }
    }).then((result)=>{
      if(result.isConfirmed){
          var new_theme_val=$("#dropdown_theme").val();
          if(new_theme_val!=cr_player.theme){
            cr_player.theme=new_theme_val;
            localStorage.setItem("cr_player_theme",cr_player.theme);
            $(cr_player.list_theme).each(function(index,th){
              $("#"+th).remove();
            });
            $('head').append('<link id="'+cr_player.theme+'" rel="stylesheet" type="text/css" href="cr_player/' + cr_player.theme + '.css">');
          }

          var mediaSession_status=$("#mediaSession").val();
          if(mediaSession_status=="true") cr_player.mediaSession=true;
          else cr_player.mediaSession=false;
          localStorage.setItem("mediaSession",mediaSession_status);
      }
    });
  }

  next_song() {
    this.index_play_cur++;
    if(this.index_play_cur>=this.list_song.length) this.index_play_cur=0;
    this.play_by_index(this.index_play_cur);
  }

  prev_song() {
    this.index_play_cur--;
    if(this.index_play_cur<0) this.index_play_cur=this.list_song.length-1;
    this.play_by_index(this.index_play_cur);
  }

  show_playlist() {
    if (this.list_song.length == 1) {
      this.playOrPause();
    } else {
      var html = '<center class="text-center w-100 d-block" style="width:100%"><table style="width:100%" class="table table-striped table-hover table-responsive fs-9 w-100 text-break"><tbody style="width:100%" id="box_list_song"></tbody></table></center>';
      swal.fire({
        title: "Playlist",
        html: html,
        iconColor: cr_player.color_hightlight,
        confirmButtonColor: cr_player.color_hightlight,
        didOpen: () => {
          $.each(cr_player.list_song, function (index, s) {
            var html = '';
            html = '<tr role="button">';
            if(cr_player.index_play_cur==index){
                html += '<td style="color:'+cr_player.color_hightlight+'"><i class="fas fa-volume-up"></i></td>';
                html += '<td style="color:'+cr_player.color_hightlight+';width:80%">' + s.name + '</td>';
                html += '<td><i class="fas fa-pause" title="pause"></i></td>';
            }
            else{
                html += '<th scope="row"><i class="fas fa-music"></i></th>';
                html += '<td style="width:80%">' + s.name + '</td>';
                html += '<td><i class="fas fa-play" title="Play One"></i></td>';
            }
            html += '<td class="box_all_btn"></td>';
            html += '</tr>';
            var item_box = $(html);
            $(item_box).click(() => {
              cr_player.index_play_cur=index;
              cr_player.play_by_index(index);
              Swal.close();
            });

            var btn_del = $('<i class="fas fa-trash"></i>');
            $(btn_del).click(function () {
              cr_player.list_song.splice(index, 1);
              $(item_box).remove();
              return false;
            });
            $(item_box).find(".box_all_btn").html(btn_del);
            $("#box_list_song").append(item_box);
          });
        }
      })
    }
  }

  set_color(color){
    this.color_hightlight=color;
  }
}
var cr_player = new CR_Player();