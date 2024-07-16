
# cr_player

`cr_player` is a simple music player for websites, making it easy to integrate and use music playback features on your webpage.

<img src="song.png" alt="cr_player" width="150"/>

## Installation

1. Download `cr_player.js` from your GitHub repository.
2. Add the `cr_player.js` file to your web project.
3. Add the `Swal2` and `FontAwesome v5` libraries to your project:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Player</title>
    <!-- Add Swal2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Add FontAwesome v5 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <!-- Add other HTML elements here -->

    <!-- Load cr_player.js -->
    <script src="path/to/cr_player.js"></script>
    <script>
        // Initialize cr_player
        cr_player.onCreate();

        // Example: Play an audio file
        cr_player.play('url/to/your/audiofile.mp3');
    </script>
</body>
</html>
```

### Introduction

`cr_player` provides functions to create and play music on your website.

#### `cr_player.onCreate()`

This function is called to initialize the music player when the webpage loads. You should call this function right after loading `cr_player.js` in your HTML file.

```javascript
cr_player.onCreate();
```

#### `cr_player.play(url_audio)`

This function is used to play an audio file. You need to pass in the URL of the audio file you want to play.

```javascript
cr_player.play('url/to/your/audiofile.mp3');
```

### Complete Example

Here is a complete example of how to use `cr_player` on your website:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Player</title>
    <!-- Add Swal2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Add FontAwesome v5 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <h1>Welcome to My Music Player</h1>
    <button onclick="cr_player.play('url/to/your/audiofile.mp3')">Play Music</button>

    <!-- Load cr_player.js -->
    <script src="path/to/cr_player.js"></script>
    <script>
        // Initialize cr_player
        cr_player.onCreate();

        // Example: Play an audio file when the user clicks the button
        document.querySelector('button').addEventListener('click', function() {
            cr_player.play('url/to/your/audiofile.mp3');
        });
    </script>
</body>
</html>
```

### Adding Songs to Playlist

You can add songs to the currently playing playlist using one of the following methods:

#### 1. `add_song(url_mp3)`

This method adds a song to the playlist with just the URL to the MP3 file.

```javascript
// Syntax
cr_player.add_song(url_mp3);

// Example
cr_player.add_song('https://example.com/music/song1.mp3');
```

#### 2. `add_song(url_mp3, name, artist)`

This method adds a song to the playlist with the URL to the MP3 file, the song name, and the artist name.

```javascript
// Syntax
cr_player.add_song(url_mp3, name, artist);

// Example
cr_player.add_song('https://example.com/music/song2.mp3', 'Song Title', 'Artist Name');
```

I hope this guide helps you easily install and use `cr_player` for your web project. If you have any questions or encounter any issues, please create an issue on GitHub or contact me via email.

## cr_player Media Session Guide

This guide provides instructions on how to enable and disable the `mediaSession` feature in `cr_player`. The `mediaSession` can be toggled programmatically via commands or manually through the settings interface.

### Enabling/Disabling Media Session Programmatically

You can enable or disable the `mediaSession` feature using the following commands:


```javascript
//Enable Media Session
cr_player.mediaSession = true;

//Disable Media Session
cr_player.mediaSession = fale;
```


## Contact

- Email: [tranthienthanh93@gmail.com](mailto:tranthienthanh93@gmail.com)
- Email: [tranrot93@gmail.com](mailto:tranrot93@gmail.com)

Thank you for using `cr_player`!
