
export let guessedLetters = [];
export let wrongLetters = [];
export let targetWord = '';
export let remainingAttempts = 6;
export let gameOver = false;
export let hintLettersUsed = 0;
export let currentHint = '';
export let currentWord = []; 


export function setTargetWord(word, hint) {
    targetWord = word.toUpperCase().split('');
    currentHint = hint;
    guessedLetters = [];
    wrongLetters = [];
    currentWord = Array(targetWord.length).fill('_');
    hintLettersUsed = 0;
    remainingAttempts = 6;
    gameOver = false;
    
    updateWordDisplay();
    updateHintDisplay();
    updateKeyboardStyles();
    updateAttemptsDisplay();
}


function updateHintDisplay() {
    const hintElement = document.getElementById('hint-text');
    if (hintElement) {
        hintElement.textContent = `💡 Pista: ${currentHint}`;
    }
}


function updateAttemptsDisplay() {
    const attemptsDisplay = document.getElementById('attempts-count');
    if (attemptsDisplay) {
        attemptsDisplay.textContent = `Intentos restantes: ${remainingAttempts}`;
    }
}


export function handleKeyPress(letter) {
    if (gameOver) return;
    
    letter = letter.toUpperCase();
    
    
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
        triggerShakeEffect();
        return;
    }
    
    if (targetWord.includes(letter)) {
        guessedLetters.push(letter);
        
        
        targetWord.forEach((char, index) => {
            if (char === letter) {
                currentWord[index] = letter;
            }
        });
        updateKeyboardStyles(letter, true, false);
        checkWin();
    } else {
        wrongLetters.push(letter);
        remainingAttempts--;
        updateKeyboardStyles(letter, false, false);
        updateAttemptsDisplay();
        checkLose();
    }
    updateWordDisplay();
}


export function updateKeyboardStyles(letter = null, isCorrect = false, isPresent = false) {
    const buttons = document.querySelectorAll('.key-button');
    buttons.forEach(btn => {
        const btnLetter = btn.textContent;
        
        if (btnLetter === letter) {
            btn.classList.remove('correct', 'present', 'incorrect');
            
            if (isCorrect) {
                btn.classList.add('correct');
            } else if (isPresent) {
                btn.classList.add('present');
            } else {
                btn.classList.add('incorrect');
            }
        }
    });
}


function checkWin() {
    const wordGuessed = currentWord.every((letter, index) => 
        letter === targetWord[index] || targetWord[index] === ' '
    );
    
    if (wordGuessed) {
        gameOver = true;
        showModal(true);
    }
}


function checkLose() {
    if (remainingAttempts <= 0) {
        gameOver = true;
        showModal(false);
    }
}


export function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    const wrongLettersDisplay = document.getElementById('wrong-letters');
    const hangmanImage = document.getElementById('hangman-image');
    
    if (wordDisplay) {
        wordDisplay.innerHTML = '';
        
        currentWord.forEach((letter, index) => {
            const letterElement = document.createElement('span');
            letterElement.className = 'letter';
            
            if (letter !== '_') {
                letterElement.textContent = letter;
                letterElement.classList.add('correct');
            } else {
                letterElement.textContent = '_';
            }
            
            wordDisplay.appendChild(letterElement);
        });
    }
    
    if (wrongLettersDisplay) {
        wrongLettersDisplay.textContent = `Letras incorrectas: ${wrongLetters.join(', ')}`;
    }
    
    if (hangmanImage) {
        hangmanImage.src = `images/hangman-${6 - remainingAttempts}.png`;
    }
}



export function showModal(isWinner) {
    const modal = document.getElementById('restartModal');
    const message = document.getElementById('modalMessage');
    const word = document.getElementById('modalWord');
    
    if (modal && message && word) {
        if (isWinner) {
            message.textContent = '¡Bien hecho! Adivinaste la palabra';
            word.textContent = '';
        } else {
            message.textContent = '¡Buen intento! La palabra era:';
            word.textContent = targetWord.join('');
        }
        
        modal.classList.add('active');
    }
}

export function hideModal() {
    const modal = document.getElementById('restartModal');
    if (modal) {
        modal.classList.remove('active');
    }
}


export function useHint() {
    if (gameOver || hintLettersUsed >= 2) return;

    const unrevealedIndices = targetWord
        .map((letter, index) => currentWord[index] === '_' ? index : -1)
        .filter(index => index !== -1);

    if (unrevealedIndices.length > 0) {
        const randomIndex = unrevealedIndices[
            Math.floor(Math.random() * unrevealedIndices.length)
        ];
        const hintLetter = targetWord[randomIndex];

        
        targetWord.forEach((letter, index) => {
            if (letter === hintLetter && currentWord[index] === '_') {
                currentWord[index] = hintLetter;
                triggerHintEffect(index);
            }
        });

        
        if (!guessedLetters.includes(hintLetter)) {
            guessedLetters.push(hintLetter);
        }

        hintLettersUsed++;
        updateKeyboardStyles(hintLetter, true, false);
        updateWordDisplay();
        checkWin();
    }
}


function triggerHintEffect(index) {
    const letters = document.querySelectorAll('.letter');
    if (letters[index]) {
        letters[index].classList.add('hint-reveal');
        setTimeout(() => {
            letters[index].classList.remove('hint-reveal');
        }, 1000);
    }
}