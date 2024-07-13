
# cr_player

`cr_player` là một trình phát nhạc đơn giản cho website, giúp bạn dễ dàng tích hợp và sử dụng các tính năng phát nhạc trên trang web của mình.

![cr_player](https://github.com/kurotsmile/cr_player/blob/cd1e347950e4a7a7ada7d244ea8dc49b8b5b457a/song.png)

## Cài đặt

1. Tải `cr_player.js` từ repository GitHub của bạn.
2. Thêm file `cr_player.js` vào dự án web của bạn.
3. Thêm các thư viện `Swal2` và `FontAwesome v5` vào dự án của bạn:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Player</title>
    <!-- Thêm Swal2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Thêm FontAwesome v5 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <!-- Thêm các phần tử HTML khác ở đây -->

    <!-- Tải cr_player.js -->
    <script src="path/to/cr_player.js"></script>
    <script>
        // Khởi tạo cr_player
        cr_player.onCreate();

        // Ví dụ: Phát một file audio
        cr_player.play('url/to/your/audiofile.mp3');
    </script>
</body>
</html>
```

### Giới thiệu

`cr_player` cung cấp các hàm để tạo và phát nhạc trên trang web của bạn.

#### `cr_player.onCreate()`

Hàm này được gọi để khởi tạo trình phát nhạc khi trang web được tải. Bạn nên gọi hàm này ngay sau khi tải `cr_player.js` trong file HTML của bạn.

```javascript
cr_player.onCreate();
```

#### `cr_player.play(url_audio)`

Hàm này được sử dụng để phát một file audio. Bạn cần truyền vào URL của file audio muốn phát.

```javascript
cr_player.play('url/to/your/audiofile.mp3');
```

### Ví dụ hoàn chỉnh

Dưới đây là ví dụ hoàn chỉnh về cách sử dụng `cr_player` trên trang web của bạn:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Player</title>
    <!-- Thêm Swal2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Thêm FontAwesome v5 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>
    <h1>Welcome to My Music Player</h1>
    <button onclick="cr_player.play('url/to/your/audiofile.mp3')">Play Music</button>

    <!-- Tải cr_player.js -->
    <script src="path/to/cr_player.js"></script>
    <script>
        // Khởi tạo cr_player
        cr_player.onCreate();

        // Ví dụ: Phát một file audio khi người dùng nhấn nút
        document.querySelector('button').addEventListener('click', function() {
            cr_player.play('url/to/your/audiofile.mp3');
        });
    </script>
</body>
</html>
```

Hy vọng hướng dẫn này sẽ giúp bạn dễ dàng cài đặt và sử dụng `cr_player` cho dự án web của mình. Nếu có bất kỳ câu hỏi hay gặp vấn đề gì, xin vui lòng tạo một issue trên GitHub hoặc liên hệ với tôi qua email.

## Liên hệ

- Email: [tranthienthanh93@gmail.com](mailto:tranthienthanh93@gmail.com)
- Email: [tranrot93@gmail.com](mailto:tranrot93@gmail.com)

Cảm ơn bạn đã sử dụng `cr_player`!
