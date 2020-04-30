/*
Game Funciton:
- Player must guess a number between a min and max
- Player gets acertain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if they loose
- Let a plyer choose to play again
*/

// Game Values
let min = 1, 
    max = 10, 
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI Elements
const gameWrapper = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
    
// Assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
gameWrapper.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Listen for guess
guessBtn.addEventListener('click', function(e){
    let guess = parseInt(guessInput.value);
    console.log(guess);

    // Validate check if out side min and max
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please Enter a Number Between ${min} and ${max} - guesses left ${guessesLeft}`, 'red');
        return;
    }

    if(guess === winningNum) {
        gameOver(true, `${winningNum} is correct! You Win!!!!`);
    } else {
        // Wrong number
        guessesLeft -= 1; // taking away one from total guess left
        if(guessesLeft === 0) {
            gameOver(false, `Game Over - You lost. The correct number was ${winningNum}`);
        } else {
            // Game continues - answer wrong
            // clear guess input
            guessInput.value = '';

            // tell user wrong guess and how many guess left
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'orange');

        }
    }
});

// Game over
/**
 * 
 * @param {boolean} won 
 * @param {string} msg 
 */
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // set border color 
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;
    setMessage(msg);

    // play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// get winning number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 
 * @param {string} msg 
 * @param {string} color 
 */
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}




