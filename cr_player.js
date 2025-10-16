class CR_Player {

  theme = "theme_basic_top";
  audio_player = null;
  emp_ui_player = null;

  color_hightlight = "#bd92ff";

  name_song = "Carrot Player Music";
  name_singer = "Music Player";

  list_song = [];
  index_play_cur = 0;
  index_loop_cur = 0;

  list_theme = [
    'theme_basic_top',
    'theme_basic_bottom',
    'theme_dock_left',
    'theme_dock_right',
    'theme_chill_beats'
  ];

  mediaSession = true;
  time_step = 10;

  path = "cr_player";

  list_loop_id = [
    'loop_all',
    'loop_one',
    'loop_random'
  ];

  list_loop_icon = [
    '<i class="fas fa-undo"></i>',
    '<i class="fab fa-stumbleupon-circle"></i>',
    '<i class="fas fa-random"></i>'
  ];

  onCreate() {
    this.audio_player = new Audio();
    if (localStorage.getItem("cr_player_theme") != null) this.theme = localStorage.getItem("cr_player_theme");
    if (localStorage.getItem("mediaSession") != null) {
      if (localStorage.getItem("mediaSession") == "true")
        this.mediaSession = true;
      else
        this.mediaSession = false;
    }
    $('head').append('<link rel="stylesheet" type="text/css" href="cr_player/theme.css">');
    $('head').append('<link id="' + this.theme + '" rel="stylesheet" type="text/css" href="cr_player/' + this.theme + '.css">');

    if (typeof jQuery == 'undefined') this.addJs('https://code.jquery.com/jquery-3.6.0.min.js');
    if (typeof Swal == 'undefined') this.addJs('https://cdn.jsdelivr.net/npm/sweetalert2@11');
    if (this.isLinkLoaded('all.min.css') == false) this.addCss('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
    this.upDateInfoLoad();
  }

  addJs(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;;
    document.head.appendChild(script);
  }

  addCss(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  isLinkLoaded(s_link) {
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      if (links[i].href && links[i].href.includes(s_link)) {
        return true;
      }
    }
    return false;
  }

  upDateInfoLoad() {

    this.audio_player.addEventListener('ended', function () {
      if (this.index_loop_cur == 0) cr_player.next_song();
      if (this.index_loop_cur == 1) cr_player.pause();
      if (this.index_loop_cur == 2) {
        var index_random = Math.floor(Math.random() * cr_player.list_song.length);
        cr_player.play_by_index(index_random);
      }
    });

    this.audio_player.addEventListener("loadeddata", () => {
      let duration = cr_player.audio_player.duration;
      $("#cr_player_timer").attr('max', duration.toFixed(2));
      $("#cr_time_length").html(cr_player.formatTime(duration));
    });

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

      if (cr_player.audio_player.readyState >= 2) {
        $("#cr_singer").html(cr_player.name_singer);
        cr_player.checkIconPlay();
      }
    });

    this.audio_player.addEventListener("timeupdate", (event) => {
      $("#cr_player_timer").attr('value', cr_player.audio_player.currentTime.toFixed(2));
      $("#cr_time_info").html(cr_player.formatTime(cr_player.audio_player.currentTime));
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
    if (this.mediaSession) this.set_mediaSession(obj_data.name, obj_data.artist, "Music For Life", this.path + "/song.png");
    this.set_mp3(url_mp3);
    this.uiPlayer();
  }

  play(url_mp3, name_song) {
    this.index_play_cur = 0;
    this.list_song = [];
    var obj_data = { "mp3": url_mp3, "name": name_song, "artist": "Carrot Player Music" };
    this.list_song.push(obj_data);
    this.name_song = name_song;
    if (this.mediaSession) this.set_mediaSession(obj_data.name, obj_data.artist, "Music For Life", this.path + "/song.png");
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
    if (this.mediaSession) this.set_mediaSession(obj_data.name, obj_data.artist, "Music For Life", this.path + "/song.png");
    this.set_mp3(url_mp3);
    this.uiPlayer();
  }

  play_emp(emp, is_add = false) {
    var data_song = {};
    var e = $(emp);
    data_song["name"] = e.attr("cr-name");
    data_song["url"] = e.attr("cr-url");
    data_song["artist"] = e.attr("cr-artist");
    data_song["album"] = e.attr("cr-artist");
    data_song["avatar"] = e.attr("cr-avatar");
    data_song["youtube"] = e.attr("cr-youtube");
    this.start(data_song, is_add);
  }

  add_emp(emp) {
    this.play_emp(emp, true);
  }

  start(data, is_add = false) {
    this.name_song = data.name;
    this.name_singer = data.artist;
    data["mp3"] = data.url;
    data["avatar"] = this.path + "/song.png";
    if (is_add == false) this.list_song = [];
    this.list_song.push(data);
    if (this.mediaSession) this.set_mediaSession(data.name, data.artist, "Music For Life", data.avatar);
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
      html += '<div id="cr_time_info">00:00:00</div>';
      html += '<div id="cr_time_length">00:00:00</div>';
      html += '<img role="button" src="cr_player/song.png" id="cr_song_avatar" onclick="cr_player.show_playlist()"/>';
      html += '<div id="cr_info" class="d-inline mt-2 ml-2">';
      html += '<div id="cr_name">' + this.name_song + '</div>';
      html += '<div id="cr_singer" style="color:' + this.color_hightlight + '">' + this.name_singer + '</div>';
      html += '</div>';
      html += '<button onclick="cr_player.playOrPause();" class="btn btn-sm btn-dark ml-2" id="cr_btn_play" title="Play Or Pause"><i class="far fa-play-circle"></i></button>';
      html += '<button onclick="cr_player.prev_song();" class="btn btn-sm btn-dark ml-1" id="cr_btn_next" title="Next Song"><i class="fas fa-step-backward"></i></button>';
      html += '<button onclick="cr_player.seekbackward();" class="btn btn-sm btn-dark ml-1" id="cr_btn_backward" title="Backward"><i class="fas fa-backward"></i></button>';
      html += '<button onclick="cr_player.seekforward();" class="btn btn-sm btn-dark ml-1" id="cr_btn_forward" title="Forward"><i class="fas fa-forward"></i></button>';
      html += '<button onclick="cr_player.next_song();" class="btn btn-sm btn-dark ml-1" id="cr_btn_prev" title="Prev Song"><i class="fas fa-step-forward"></i></button>';
      html += '<button onclick="cr_player.loop();" class="btn btn-sm btn-dark ml-1" id="cr_btn_loop" title="Loop"><i class="fas fa-undo"></i></button>';
      html += '<button onclick="cr_player.stop();" class="btn btn-sm btn-dark ml-1 btn-stop" title="Stop"><i class="far fa-stop-circle"></i></button>';
      html += '<button onclick="cr_player.show_playlist();" class="btn btn-sm btn-dark ml-1 btn-playlist" title="Playlist"><i class="fas fa-list-alt"></i></button>';
      html += '<button onclick="cr_player.show_setting();" class="btn btn-sm btn-dark ml-1 btn-setting" title="Setting"><i class="fas fa-tools"></i></button>';
      html += '<progress id="cr_player_timer" value="32" max="100"> 32% </progress>';
      html += '<div id="cr_video"></div>';
      html += '</div>';
      this.emp_ui_player = $(html);
      $("body").append(this.emp_ui_player);
      this.updateMetaInfo();
    } else {
      $(this.emp_ui_player).fadeIn(500);
      this.updateMetaInfo();
    }
    $("[title]").tooltip();
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
    this.list_song = [];
    this.audio_player.pause();
    this.hide();
  }

  seekbackward() {
    var newTime = this.audio_player.currentTime - this.time_step;
    this.audio_player.currentTime = newTime < 0 ? 0 : newTime;
  }

  seekforward() {
    var newTime = this.audio_player.currentTime + this.time_step;
    this.audio_player.currentTime = newTime < 0 ? 0 : newTime;
  }

  set_time_step(timer) {
    this.time_step = timer;
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
        cr_player.seekbackward();
      });
      navigator.mediaSession.setActionHandler("seekforward", () => {
        cr_player.seekforward();
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

  btn_play() {
    this.audio_player.play();
    this.checkIconPlay();
  }

  pause() {
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
    var html = '';
    html += '<div class="form-group">';
    html += '<label for="unlockallmp3"><i class="fas fa-brush"></i> Interface and themes</label>';
    html += '<select class="form-control" id="dropdown_theme"><select>';
    html += '<small class="form-text text-muted">Change the style of the music player</small>';
    html += '</div>';

    html += '<div class="form-group">';
    html += '<label for="mediaSession"><i class="fas fa-pager"></i> Media Session</label>';
    html += '<select class="form-control" id="mediaSession">';
    html += '<option value="true" ' + (cr_player.mediaSession === true ? "selected='true'" : "") + '>On</option>';
    html += '<option value="false" ' + (cr_player.mediaSession === false ? "selected='true'" : "") + '>Off</option>';
    html += '<select>';
    html += '<small class="form-text text-muted">Turn on the media Session function so that songs are not interrupted when switching browser tabs</small>';
    html += '</div>';

    swal.fire({
      title: "Setting",
      html: html,
      confirmButtonColor: cr_player.color_hightlight,
      didOpen: () => {
        $(cr_player.list_theme).each(function (index, th) {
          if (cr_player.theme == th)
            $("#dropdown_theme").append($('<option>', { value: th, text: th, selected: true }));
          else
            $("#dropdown_theme").append($('<option>', { value: th, text: th }));
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        var new_theme_val = $("#dropdown_theme").val();
        if (new_theme_val != cr_player.theme) {
          cr_player.set_theme(new_theme_val);
          localStorage.setItem("cr_player_theme", cr_player.theme);
        }

        var mediaSession_status = $("#mediaSession").val();
        if (mediaSession_status == "true") cr_player.mediaSession = true;
        else cr_player.mediaSession = false;
        localStorage.setItem("mediaSession", mediaSession_status);
      }
    });
  }

  set_theme(name_theme) {
    cr_player.theme = name_theme;
    $(cr_player.list_theme).each(function (index, th) {
      $("#" + th).remove();
    });
    $('head').append('<link id="' + name_theme + '" rel="stylesheet" type="text/css" href="cr_player/' + name_theme + '.css">');
  }

  next_song() {
    this.index_play_cur++;
    if (this.index_play_cur >= this.list_song.length) this.index_play_cur = 0;
    this.play_by_index(this.index_play_cur);
  }

  prev_song() {
    this.index_play_cur--;
    if (this.index_play_cur < 0) this.index_play_cur = this.list_song.length - 1;
    this.play_by_index(this.index_play_cur);
  }

  show_playlist() {
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
          if (cr_player.index_play_cur == index) {
            html += '<td style="color:' + cr_player.color_hightlight + '"><i class="fas fa-volume-up"></i></td>';
            html += '<td style="color:' + cr_player.color_hightlight + ';width:80%">' + s.name + '</td>';
            html += '<td><i class="fas fa-pause" title="pause"></i></td>';
          }
          else {
            html += '<th scope="row"><i class="fas fa-music"></i></th>';
            html += '<td style="width:80%">' + s.name + '</td>';
            html += '<td><i class="fas fa-play" title="Play One"></i></td>';
          }
          html += '<td class="box_all_btn"></td>';
          html += '</tr>';
          var item_box = $(html);
          $(item_box).click(() => {
            cr_player.index_play_cur = index;
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
    });
  }

  set_color(color) {
    this.color_hightlight = color;
  }

  formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    var seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  loop() {
    this.index_loop_cur++;
    if (this.index_loop_cur >= this.list_loop_id.length) this.index_loop_cur = 0;
    $("#cr_btn_loop").html(this.list_loop_icon[this.index_loop_cur]);
    swal.fire({
      title: "Loop Song",
      text: cr_player.list_loop_id[cr_player.index_loop_cur],
      confirmButtonColor: cr_player.color_hightlight
    });
  }
}
var cr_player = new CR_Player();