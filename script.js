// loading screen
window.addEventListener("load", function() {

  var loadingScreen1 = document.getElementById("loading-screen");
  var loadingScreen2 = document.getElementById("loading-screen-2");
  
  var video1 = document.getElementById("loading-video-1");
  var video2 = document.getElementById("loading-video-2");
  
  var gameScreen = document.getElementById("game-screen");

  loadingScreen2.style.display = "none";
  gameScreen.style.display = "none";

  video1.addEventListener("ended", function() {
    video1.style.display = "none";
    loadingScreen2.style.display = "block";
    video2.play();
  });

  video2.addEventListener("ended", function() {
    loadingScreen2.style.display = "none";
    gameScreen.style.display = "block";
  });

  setTimeout(function() {
    loadingScreen1.style.display = "none";
    video1.play();
  }, 2000);
  
});




//tampilan pilih char
var characters = ['fburung.png', 'fmonyet.png', 'fpanda.png'];
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

document.querySelectorAll('.character-option img').forEach(function(img) {
  img.addEventListener('click', function() {
    currentCharacter = parseInt(this.dataset.index);
    updatePreview();
  });
});

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

//get input name
const submitButton = document.querySelector('.choose-button');

submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  const inputName = document.querySelector('.your-name').value;
  console.log('Nama yang diinputkan:', inputName);

  const sapaElemen = document.querySelector('#sapa');
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  if (hours >= 5 && hours < 12) {
    sapaElemen.textContent = `Good morning ${inputName}`;
  } else if (hours >= 12 && hours < 18) {
    sapaElemen.textContent = `Good afternoon ${inputName}`;
  } else {
    sapaElemen.textContent = `Good evening ${inputName}`;
  }

});
setInterval(function() {
  const jamElemen = document.querySelector("#jam");
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  jamElemen.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);


//pergantian screen
const gameplayScreen = document.getElementById("gameplay-screen");
const gameScreen = document.getElementById("game-screen");

gameplayScreen.style.display = "none";

const submitNameButton = document.getElementById("submit-name");
submitNameButton.addEventListener("click", () => {
  gameScreen.style.display = "none";
  gameplayScreen.style.display = "block";
});

//ganti background
let background = document.querySelector('body');
let now = new Date();
let hour = now.getHours();

if (hour >= 5 && hour < 12) {
  background.style.backgroundImage = 'url("pagi.png")';
} else if (hour >= 12 && hour < 18) {
  background.style.backgroundImage = 'url("siang.png")';
} else {
  background.style.backgroundImage = 'url("malam.png")';
}


//gameplay
let health = 100;
let hunger = 0;
let happiness = 50;
let sleep = 100;

const updateStatusBar = () => {
  const healthElem = document.querySelector('#status-bar span:nth-of-type(1)');
  const hungerElem = document.querySelector('#status-bar span:nth-of-type(2)');
  const happinessElem = document.querySelector('#status-bar span:nth-of-type(3)');
  const sleepElem = document.querySelector('#status-bar span:nth-of-type(4)');

  healthElem.innerText = `Health: ${health < 0 ? 0 : health}`;
  hungerElem.innerText = `Hunger: ${hunger < 0 ? 0 : hunger}`;
  happinessElem.innerText = `Happiness: ${happiness < 0 ? 0 : happiness}`;
  sleepElem.innerText = `Sleep: ${sleep < 0 ? 0 : sleep}`;
};

const startTamagotchi = () => {
  const gameElem = document.querySelector('#game');
  // currentCharacter = parseInt(document.querySelector('.character-option img.selected').dataset.index);
  gameElem.innerHTML = `
    <div>
      <img src="${characters[currentCharacter]}" alt="Tamagotchi" width="100">
      <p>Click the Tamagotchi to feed it</p>
    </div>
  `;

  const tamagotchiImg = gameElem.querySelector('img');
  tamagotchiImg.style.width = '400px';
  tamagotchiImg.addEventListener('click', () => {
    if (hunger < 10) {
      hunger -= 10;
      happiness += 5;
      updateStatusBar();
    } else {
      alert('Your Tamagotchi is full!');
    }
  });

  const sleepButton = document.querySelector('#tidur');
  sleepButton.addEventListener('click', () => {
    if (sleep <= 75) {
      sleep += 25;
    } else if (sleep < 100) {
      sleep = 100;
    } else {
      alert('Your Tamagotchi is already fully rested!');
    }
    updateStatusBar();
  })

  const obatButton = document.querySelector('#obat');
  obatButton.addEventListener('click', () => {
    if (health <= 100) {
      health += 5;
      if (health > 100) {
        health = 100;
      }
      happiness -= 5;
      updateStatusBar();
    } else {
      alert('Your Tamagotchi is already healthy!');
    }
  });

  const gameLoop = setInterval(() => {
    hunger += 1;
    happiness -= 1;
  
    if (hunger >= 100) {
      clearInterval(gameLoop);
      alert('Your Tamagotchi has died of hunger!');
    }
  
    if (happiness <= 0) {
      clearInterval(gameLoop);
      alert('Your Tamagotchi has died of sadness!');
    }
  
    health -= 1;
  
    // decrease sleep idle
    if (hunger < 90 && happiness > 10) {
      sleep -= 2;
    }
  
    // decrease sleep playing
    if (game) {
      sleep -= 5;
    }
  
    if (sleep <= 0) {
      clearInterval(gameLoop);
      alert('Your Tamagotchi has died of exhaustion!');
    }
  
    console.log(`health: ${health}, hunger: ${hunger}, happiness: ${happiness}, sleep: ${sleep}`);
    updateStatusBar();
  }, 5000);
};
startTamagotchi();

const startSnake = () => {
	const gameElem = document.querySelector('#game');
	gameElem.innerHTML = `
		<canvas id="snake-canvas" width="451" height="451"></canvas>
	`;

	const canvas = gameElem.querySelector('#snake-canvas');
	const ctx = canvas.getContext('2d');
	const gridSize = 10;
	const snake = [{ x: 200, y: 200 }];
	let food = { x: getRandomInt(0, 39) * gridSize, y: getRandomInt(0, 39) * gridSize };
	let dx = 0;
	let dy = 0;

	const drawSnake = () => {
		snake.forEach(segment => {
			ctx.fillStyle = '#333';
			ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
		});
	};

	const drawFood = () => {
		ctx.fillStyle = '#f00';
		ctx.fillRect(food.x, food.y, gridSize, gridSize);
	};

	const moveSnake = () => {
		const head = { x: snake[0].x + dx, y: snake[0].y + dy };
		snake.unshift(head);

		if (head.x === food.x && head.y === food.y) {
			food = { x: getRandomInt(0, 39) * gridSize, y: getRandomInt(0, 39) * gridSize };
			happiness += 10;
			updateStatusBar();
		} else {
			snake.pop();
		}
	};

  const handleKeyPress = (event) => {
    if (event.keyCode === 37) {
      dx = -gridSize;
      dy = 0;
    } else if (event.keyCode === 38) {
      dx = 0;
      dy = -gridSize;
    } else if (event.keyCode === 39) {
      dx = gridSize;
      dy = 0;
    } else if (event.keyCode === 40) {
      dx = 0;
      dy = gridSize;
    }
  };

	const gameLoop = setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawSnake();
		drawFood();
		moveSnake();

		if (snake[0].x < 0 || snake[0].x > canvas.width - gridSize || snake[0].y < 0 || snake[0].y > canvas.height - gridSize) {
			clearInterval(gameLoop);
			alert('Game over!');
		}

  updateStatusBar();
	}, 100);

	document.addEventListener('keydown', handleKeyPress);
};

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

document.querySelector('#makan').addEventListener('click', startTamagotchi);
document.querySelector('#main').addEventListener('click', startSnake);