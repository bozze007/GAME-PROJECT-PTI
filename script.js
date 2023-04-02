// Wait for the page to load
window.addEventListener("load", function() {

  // Get the loading screen elements
  var loadingScreen1 = document.getElementById("loading-screen");
  var loadingScreen2 = document.getElementById("loading-screen-2");
  
  // Get the videos
  var video1 = document.getElementById("loading-video-1");
  var video2 = document.getElementById("loading-video-2");
  
  // Get the game screen element
  var gameScreen = document.getElementById("game-screen");

  // Hide the second loading screen and the game screen
  loadingScreen2.style.display = "none";
  gameScreen.style.display = "none";

  // When the first video ends, hide it and show the second video
  video1.addEventListener("ended", function() {
    video1.style.display = "none";
    loadingScreen2.style.display = "block";
    video2.play();
  });

  // When the second video ends, hide the loading screen and show the game screen
  video2.addEventListener("ended", function() {
    loadingScreen2.style.display = "none";
    gameScreen.style.display = "block";
  });

  // Wait for 3 seconds and then hide the first loading screen and show the first video
  setTimeout(function() {
    loadingScreen1.style.display = "none";
    video1.play();
  }, 3000);
  
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

