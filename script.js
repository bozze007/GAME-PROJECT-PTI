window.addEventListener("load", function() {
  var loadingScreen = document.getElementById("loading-screen");
  var gameScreen = document.getElementById("game-screen");

  setTimeout(function() {
    loadingScreen.style.opacity = 0;
    setTimeout(function() {
      loadingScreen.style.display = "none";
      gameScreen.style.display = "block";
      setTimeout(function() {
        gameScreen.style.opacity = 1;
      }, 100);
    }, 500);
  }, 3000);
});

//efek video loading screen
var video1 = document.getElementById("loading-video-1");
var video2 = document.getElementById("loading-video-2");

video1.addEventListener("ended", function() {
  video1.style.display = "none";
  video2.style.display = "block";
  video2.play();
});

//tampilan pilih char
var characters = ['burung-removebg-preview.png', 'monyet-removebg-preview.png', 'panda-removebg-preview.png'];
var currentCharacter = 0;

function updatePreview() {
    var previewImage = document.getElementById('preview-image');
    var previewText = document.getElementById('preview-text');
    var currentIndex = parseInt(previewImage.dataset.index);
      if (currentIndex === currentCharacter) {
        return;
        }
          previewImage.classList.remove('fade-in');
          previewImage.classList.add('fade-out');
          setTimeout(function() {
          previewImage.src = characters[currentCharacter];
          previewImage.dataset.index = currentCharacter;
          previewImage.classList.remove('fade-out');
          previewImage.classList.add('fade-in');
          switch (currentCharacter) {
          case 0:
          break;
          case 1:
          break;
          case 2:
          break;
          }
        }, 200);
      }  
      
      document.getElementById('left-arrow').addEventListener('click', function() {
      currentCharacter--;
      if (currentCharacter < 0) {
      currentCharacter = characters.length - 1;
      }
      updatePreview();
      });
      
      document.getElementById('right-arrow').addEventListener('click', function() {
      currentCharacter++;
      if (currentCharacter > characters.length - 1) {
      currentCharacter = 0;
      }
      updatePreview();
      });
