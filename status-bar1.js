const hewanPeliharaan = {
  makan: 100,
  tidur: 100,
  main: 100,
  kesehatan: 100
};

// Function to update the status bar value
function updateStatusBar() {
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bar => {
    const value = bar.querySelector('.value');
    const label = bar.classList[1];
    value.style.width = `${hewanPeliharaan[label]}%`;
  });
}

// Function to increase the value of a specific status bar
function increaseBar(status) {
  if (hewanPeliharaan[status] < 100) {
    hewanPeliharaan[status] += 10;
  }
  updateStatusBar();
}

// Add event listener to the "Makan" button
const makanBtn = document.querySelector('#makan-btn');
makanBtn.addEventListener('click', () => {
  increaseBar('makan');
});

// Function to decrease the value of a specific status bar
function decreaseBar(status) {
    if (hewanPeliharaan[status] > 0) {
      hewanPeliharaan[status] -= 10;
    }
    updateStatusBar();
  }
  
  // Add event listener to the "Tidur" button
  const tidurBtn = document.querySelector('#tidur-btn');
  tidurBtn.addEventListener('click', () => {
    decreaseBar('tidur');
  });
  
  // Add event listener to the "Main" button
  const mainBtn = document.querySelector('#main-btn');
  mainBtn.addEventListener('click', () => {
    decreaseBar('main');
  });
  
  // Add event listener to the "Kesehatan" button
  const kesehatanBtn = document.querySelector('#kesehatan-btn');
  kesehatanBtn.addEventListener('click', () => {
    decreaseBar('kesehatan');
  });
  
