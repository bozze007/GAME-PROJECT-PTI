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





//main game
// inisialisasi variabel
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var bird = {x: 50, y: canvas.height / 2, width: 30, height: 30, speed: 0};
var gravity = 1;
var pipes = [{x: canvas.width, y: 0, width: 50, height: 150}];
var pipeSpeed = 5;
var score = 0;

// membuat fungsi untuk menggambar burung
function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// membuat fungsi untuk menggambar pipa
function drawPipes() {
  ctx.fillStyle = "green";
  for (var i = 0; i < pipes.length; i++) {
    ctx.fillRect(pipes[i].x, pipes[i].y, pipes[i].width, pipes[i].height);
  }
}

// membuat fungsi untuk menggambar skor
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// membuat fungsi untuk menggerakkan pipa
function movePipes() {
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].x -= pipeSpeed;
    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1);
    }
  }
  if (pipes[pipes.length - 1].x < canvas.width - 200) {
    pipes.push({x: canvas.width, y: Math.random() * (canvas.height - 150), width: 50, height: 150});
  }
}

// membuat fungsi untuk mendeteksi tabrakan
function checkCollision() {
  if (bird.y < 0 || bird.y + bird.height > canvas.height) {
    return true;
  }
  for (var i = 0; i < pipes.length; i++) {
    if (bird.x + bird.width > pipes[i].x && bird.x < pipes[i].x + pipes[i].width &&
        (bird.y < pipes[i].y || bird.y + bird.height > pipes[i].y + pipes[i].height)) {
      return true;
    }
  }
  return false;
}

// membuat fungsi untuk memperbarui skor
function updateScore() {
  for (var i = 0; i < pipes.length; i++) {
    if (pipes[i].x + pipes[i].width < bird.x && pipes[i].x + pipes[i].width + pipeSpeed >= bird.x) {
      score++;
    }
  }
}

// membuat fungsi untuk memperbarui layar
function update() {
    bird.speed += gravity;
    bird.y += bird.speed;
    if (checkCollision()) {
    alert("Game Over! Score: " + score);
    location.reload();
    }
    movePipes();
    updateScore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    drawPipes();
    drawScore();
    requestAnimationFrame(update);
    }
    
    // membuat event untuk menggerakkan burung
    document.addEventListener("keydown", function(event) {
    if (event.keyCode == 32) {
    bird.speed = -10;
    }
    });
    
    // memanggil fungsi update
    update();
