export let guessedLetters = [];
export let wrongLetters = [];
export let targetWord = '';
export let remainingAttempts = 6;
export let gameOver = false;
export let hintLettersUsed = 0;
export let hintLetters = [];
export let currentHint = '';

// Configura la palabra objetivo
export function setTargetWord(word, hint) {
    targetWord = word.toUpperCase();
    currentHint = hint;
    guessedLetters = [];
    wrongLetters = [];
    hintLetters = [];
    hintLettersUsed = 0;
    remainingAttempts = 6;
    gameOver = false;
    
    updateWordDisplay();
    updateHintDisplay();
}

// Actualiza el display de la pista
function updateHintDisplay() {
    const hintElement = document.getElementById('hint-text');
    if (hintElement) {
        hintElement.textContent = `💡 Pista: ${currentHint}`;
    }
}

// Función para usar pista
export function useHint() {
    if (gameOver || hintLettersUsed >= 2) return;
    
    const unrevealedLetters = targetWord.split('').filter((letter, index) => 
        !guessedLetters.includes(letter) && 
        !hintLetters.includes(index) && 
        letter !== ' '
    );
    
    if (unrevealedLetters.length > 0) {
        const randomLetter = unrevealedLetters[
            Math.floor(Math.random() * unrevealedLetters.length)
        ];
        
        targetWord.split('').forEach((letter, index) => {
            if (letter === randomLetter) {
                hintLetters.push(index);
            }
        });
        
        hintLettersUsed++;
        triggerHintEffect();
        checkWin();
        updateWordDisplay();
    }
}

// Efecto visual para pistas
function triggerHintEffect() {
    const wordDisplay = document.getElementById('word-display');
    if (wordDisplay) {
        wordDisplay.classList.add('hint-reveal');
        setTimeout(() => {
            wordDisplay.classList.remove('hint-reveal');
        }, 1000);
    }
}

// Maneja la pulsación de una letra
export function handleKeyPress(letter) {
    if (gameOver) return;
    
    letter = letter.toUpperCase();
    
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
        triggerShakeEffect();
        return;
    }
    
    if (targetWord.includes(letter)) {
        guessedLetters.push(letter);
        checkWin();
    } else {
        wrongLetters.push(letter);
        remainingAttempts--;
        triggerIncorrectEffect();
        checkLose();
    }
    
    updateWordDisplay();
    updateKeyboardStyles();
}

// Efecto shake para errores
function triggerShakeEffect() {
    const wordDisplay = document.getElementById('word-display');
    if (wordDisplay) {
        wordDisplay.classList.add('shake');
        setTimeout(() => {
            wordDisplay.classList.remove('shake');
        }, 600);
    }
}

// Efecto para letras incorrectas
function triggerIncorrectEffect() {
    const hangmanImage = document.getElementById('hangman-image');
    if (hangmanImage) {
        hangmanImage.classList.add('error-flash');
        setTimeout(() => {
            hangmanImage.classList.remove('error-flash');
        }, 500);
    }
}

// Verifica si el jugador ganó
function checkWin() {
    const wordGuessed = targetWord.split('').every((letter, index) => 
        guessedLetters.includes(letter) || 
        hintLetters.includes(index) || 
        letter === ' '
    );
    
    if (wordGuessed) {
        gameOver = true;
        showModal(true);
    }
}

// Verifica si el jugador perdió
function checkLose() {
    if (remainingAttempts <= 0) {
        gameOver = true;
        showModal(false);
    }
}

// Actualiza la visualización de la palabra
export function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    const wrongLettersDisplay = document.getElementById('wrong-letters');
    const hangmanImage = document.getElementById('hangman-image');
    const attemptsDisplay = document.getElementById('attempts-count');
    
    if (wordDisplay) {
        wordDisplay.innerHTML = targetWord.split('').map((letter, index) => {
            let classes = 'letter';
            if (guessedLetters.includes(letter) || hintLetters.includes(index)) {
                classes += ' correct-letter';
            } else if (wrongLetters.includes(letter)) {
                classes += ' incorrect-letter';
            } else if (letter === ' ') {
                classes += ' space';
            }
            
            const content = guessedLetters.includes(letter) || hintLetters.includes(index) ? 
                letter : 
                (letter === ' ' ? ' ' : '_');
            
            return `<span class="${classes}">${content}</span>`;
        }).join('');
    }
    
    if (wrongLettersDisplay) {
        wrongLettersDisplay.textContent = `Letras incorrectas: ${wrongLetters.join(', ')}`;
    }
    
    if (hangmanImage) {
        hangmanImage.src = `images/hangman-${6 - remainingAttempts}.png`;
    }
    
    if (attemptsDisplay) {
        attemptsDisplay.textContent = remainingAttempts;
    }
}

// Actualiza estilos del teclado
function updateKeyboardStyles() {
    const buttons = document.querySelectorAll('.key-button');
    buttons.forEach(btn => {
        const letter = btn.textContent;
        btn.classList.remove('correct-key', 'wrong-key');
        
        if (guessedLetters.includes(letter)) {
            btn.classList.add('correct-key');
        } else if (wrongLetters.includes(letter)) {
            btn.classList.add('wrong-key');
        }
    });
}

// Muestra el modal de resultado
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
            word.textContent = targetWord;
        }
        
        modal.style.display = 'block';
    }
}