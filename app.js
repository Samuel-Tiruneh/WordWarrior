window.addEventListener('load', init);

const levels = {
    easy: 5,
    medium: 3,
    hard: 2
};

let currentLevel = levels.easy; // Default to easy
let time = currentLevel;
let score = 0;
let isPlaying;

// Load high score from local storage
let highScore = parseInt(localStorage.getItem('highScore')) || 0;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const gameModeSelect = document.querySelector('#game-mode'); // Select element for game mode
const highScoreDisplay = document.querySelector('#high-score'); // Display for high score

const words = [
    'hat', 'river', 'lucky', 'forest', 'summer', 'beach', 'dream', 'smile', 'cloud',
    'whisper', 'candle', 'travel', 'magic', 'adventure', 'garden', 'mountain',
    'sunshine', 'shadow', 'thunder', 'lightning', 'rainbow', 'butterfly', 'ocean',
    'universe', 'galaxy', 'meteor', 'star', 'comet', 'planet', 'nebula', 'eclipse',
    'cosmos', 'rocket', 'spaceship', 'alien', 'astronaut', 'moon',
    'earth', 'venus', 'mars',
    'jupiter', 'saturn',
    'uranus', 'neptune',
    'pluto',
    'asteroid',
    'space',
    'galaxy',
    'orbit'
];

function init() {
    seconds.innerHTML = currentLevel;
    
    // Display the high score
    displayHighScore();

    showWord(words);

    wordInput.addEventListener('input', startMatch);
    
    // Listen for changes in game mode selection
    gameModeSelect.addEventListener('change', changeLevel);
    
    // Add event listener for New Game button
    document.querySelector('#new-game').addEventListener('click', startNewGame);

    setInterval(countdown, 1000);
    setInterval(checkStatus, 50);
}

function changeLevel() {
    const selectedMode = gameModeSelect.value;
    
    // Update current level based on selection
    currentLevel = levels[selectedMode];
    
    // Reset time based on current level
    time = currentLevel;
    
    seconds.innerHTML = currentLevel; // Update displayed time
}

function startNewGame() {
    score = 0; // Reset score
    time = currentLevel; // Reset time based on current level
    isPlaying = false; // Set isPlaying to false

    scoreDisplay.innerHTML = score; // Update displayed score
    timeDisplay.innerHTML = time; // Update displayed time
    message.innerHTML = ''; // Clear message
    wordInput.value = ''; // Clear input field
    
    showWord(words); // Show a new word
}

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1; // Reset time for next word
        showWord(words);
        wordInput.value = '';
        score++;
        message.innerHTML = 'Correct! 🎉'; // Add emoji and change message
        message.style.color = 'green'; // Change text color to green
        
        checkHighScore(); // Check if this is a new high score
        displayHighScore(); // Update displayed high score
    }
    
   if (score == -1) {
       scoreDisplay.innerHTML = 0;
   } else {
       scoreDisplay.innerHTML = score;
   }
}

function matchWords() {
   return wordInput.value === currentWord.innerHTML; 
}

function showWord(words) {
   const randIndex = Math.floor(Math.random() * words.length);
   currentWord.innerHTML = words[randIndex];
}

function countdown() {
   if (time > 0) {
       time--;
   } else if (time === 0) {
       isPlaying = false;
   }

   timeDisplay.innerHTML = time;
}

function checkStatus() {
   if (!isPlaying && time === 0) {
       message.innerHTML = 'Game over! 😢'; 
       message.style.color = 'red'; 
       score = -1;

       resetHighScore(); // Reset high score after 5 minutes if not beaten.
   }
}

// Function to check and update the high score.
function checkHighScore() {
   if (score > highScore) {
       highScore = score;
       localStorage.setItem('highScore', highScore); 
   }
}

// Function to reset the high score.
function resetHighScore() {
   const now = Date.now();
   const fiveMinutesAgo = now - (5 * 60 * 1000); 
   const storedHighScoreTime = localStorage.getItem('highScoreTime');

   if (storedHighScoreTime && storedHighScoreTime < fiveMinutesAgo) {
       localStorage.removeItem('highScore');
       localStorage.removeItem('highScoreTime');
       highScore = 0; 
   }
}

// Function to display the high score.
function displayHighScore() {
   const storedHighScore = localStorage.getItem('highScore') || 0;
   document.querySelector('#high-score').innerHTML = `High Score: ${storedHighScore}`;
}
