try {
    window.addEventListener("load", init, false);
} catch (e) {
    window.onload = init;
}
// Globals (variable)
let time = 10;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const restart = document.querySelector('#restart');

const words = [
    'textbook', 'book', 'used', 'study', 'subject', 'People', 'textbook', 'learn', 'facts', 'methods', 'about', 'certain', 'subject', 'Textbooks', 'sometimes', 'have', 'questions', 'test', 'knowledge', 'understanding', 'learner', 'workbook', 'type', 'textbook', 'that', 'only', 'practice', 'questions', 'exercises', 'Workbooks', 'designed', 'teach', 'provide', 'practice', 'highlight', 'areas', 'which', 'need', 'more', 'learning', 'revision', 'guide', 'type', 'textbook', 'that', 'used', 'remind', 'learner', 'about', 'subject', 'give', 'himher', 'extra', 'practice', 'especially', 'before', 'examination', 'textbook', 'usually', 'lent', 'students', 'school', 'accompany', 'course', 'school', 'teaching', 'Sometimes', 'especially', 'university', 'students', 'have', 'textbooks', 'they', 'need', 'themselves', 'borrow', 'them', 'from', 'library Most', 'textbooks', 'only', 'published', 'printed', 'format', 'However', 'some', 'available', 'online', 'electronic', 'books'
];

// Initialize Game
function init() {
    showWord(words);

    // Start matching word input
    wordInput.addEventListener('input', startMatch);

    // Call countdown every second
    setInterval(countDown, 1000);
    // Check Game status
    setInterval(checkStatus, 50);
}

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = 10;
        showWord(words);
        wordInput.value = '';
        score++;
        if (score >= 10 && score < 15) {
            time = 7;
        } else if (score >= 15 && score < 20) {
            time = 5;
        } else if (score >= 20) {
            time = 3;
        }
        scoreDisplay.innerHTML = score;
    } else {
        isPlaying = false;
    }
}

// Match current word to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

// Pick & show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countDown() {
    // Make sure time is not run out
    if (time > 0) {
        time--;
    } else if (time === 0) {
        wordInput.readOnly = true;
        isPlaying = false;
    }

    // Show the time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!';
        message.style.color = 'red';
        wordInput.innerHTML = '';
        score = 0;
        scoreDisplay.innerHTML = score;
        restart.classList.add('d-inline');
    }
}

function restartGame() {
    wordInput.readOnly = false;
    message.innerHTML = '';
    isPlaying = true;
    time = 10;
    wordInput.value = '';
}

restart.addEventListener('click', restartGame);
restart.addEventListener('click', startMatch);