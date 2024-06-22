  (function() {
      var width = 320;
      var height = 0;
      var streaming = false;
      var video = null;
      var canvas = null;
      var photo = null;
      var startbutton = null;
      var downloadbutton = null;

      function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        downloadbutton = document.getElementById('downloadbutton');

        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })
       .then(function(stream) {
          video.srcObject = stream;
          video.play();
        })
       .catch(function(err) {
          console.log("An error occurred: " + err);
        });

        video.addEventListener('canplay', function(ev) {
          if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            if (isNaN(height)) {
              height = width / (4 / 3);
            }
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
          }
        }, false);

        startbutton.addEventListener('click', function(ev) {
          takepicture();
          ev.preventDefault();
        }, false);

        downloadbutton.addEventListener('click', function(ev) {
          download();
          ev.preventDefault();
        }, false);
      }

      function takepicture() {
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      }

      function download() {
        var link = document.createElement('a');
        link.href = photo.src;
        link.download = 'photo.png';
        link.click();
      }

      startup();
    })()
