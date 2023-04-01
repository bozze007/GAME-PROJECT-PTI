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

