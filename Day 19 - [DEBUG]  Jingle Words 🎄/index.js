import JSConfetti from 'js-confetti';

let word = 'santa'; 
let wordArr = word.split('');

const wordDisplay = document.getElementById('word-display');
const restart = document.getElementById('restart');
const input = document.getElementById('user-input');
const submit = document.getElementById('submit');

restart.addEventListener('click', startGame);
document.addEventListener('submit', handleGuess);

startGame();

async function startGame() {
    input.value = '';
    input.disabled = true;
    submit.disabled = true;
    // Chaotic Evil
    word = (await fetch('https://random-word-api.herokuapp.com/word').then(response => response.json()))[0];
    wordArr = word.split('');
    input.disabled = false;
    submit.disabled = false;
    renderSpaces();
}

function renderSpaces() {
    const wordHtml = wordArr.map(() => {
        return '<span class="letter">-</span>';
    });
    wordDisplay.innerHTML = wordHtml.join('');
}

function renderGuess(arr) {
    const wordHtml = arr.map((letter) => {
        return `<span class="letter">${letter}</span>`;
    });
    wordDisplay.innerHTML = wordHtml.join('');
}

function handleGuess(e) {
    e.preventDefault();
    let currentState = [];
    let guess = input.value;
    const guessArr = guess.split('');
    if (guess.length === word.length) {
        wordArr.forEach((letter, index) => {
            if (letter === guessArr[index]) {
                currentState.push(letter); 
            } else {
                currentState.push('-');
            }
        });        
    } else {
        input.style.border = '2px solid red';
        wordArr.forEach(() => {
            currentState.push('-');
        });  
        setTimeout(function() {
            input.style.border = '2px solid #999';            
        }, 3000);
    }
    renderGuess(currentState);
    checkWin(guess);
    input.value = '';
}

function checkWin(guess) {
    if (word === guess) {
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            emojis: ['🧑‍🎄', '🎅'],
            emojiSize: 50,
            confettiNumber: 60,
            confettiRadius: 6,
        });
        jsConfetti.addConfetti();
    }
}
