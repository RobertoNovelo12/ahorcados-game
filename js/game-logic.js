export let currentWord = '';  
export let canType = true;  
export let canDelete = true;  
export let wordLines = [];  
export let targetWord = '';  

export function setTargetWord(word) {
    targetWord = word.toUpperCase();  
    wordLines = [];  
    currentWord = '';  
    canType = true;  
    canDelete = true;  
}

export function updateWordDisplay() {
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';
    wordLines.forEach(word => {
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('word-line');
        word.split('').forEach(letter => {
            const letterDiv = document.createElement('div');
            letterDiv.classList.add('letter-line');
            letterDiv.textContent = letter;
            lineDiv.appendChild(letterDiv);
        });
        wordDisplay.appendChild(lineDiv);
    });

    const currentLineDiv = document.createElement('div');
    currentLineDiv.classList.add('word-line');

    for (let i = 0; i < targetWord.length; i++) {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter-line');
        letterDiv.textContent = i < currentWord.length ? currentWord[i] : '_';
        currentLineDiv.appendChild(letterDiv);
    }
    wordDisplay.appendChild(currentLineDiv);
}

export function handleKeyPress(letter) {
    if (canType && currentWord.length < targetWord.length) {
        
        currentWord += letter;
        updateWordDisplay(); 
        canType = false;  
        canDelete = true; 
    }
}

export function handleBackspace() {
    if (canDelete && currentWord.length > 0) {
        
        currentWord = currentWord.slice(0, -1);
        updateWordDisplay();
        canType = true;  
        canDelete = false; 
    }
}

export function handleEnter() {
    const modalMessage = document.getElementById('modalMessage');
    const modalWord = document.getElementById('modalWord');
    const restartModal = document.getElementById('restartModal');
    const restartButton = document.getElementById('restartButton');
    const closeModalButton = document.getElementById('closeModalButton');
    if (currentWord.length === targetWord.length) {
        if (currentWord === targetWord) {
            wordLines.push(currentWord);  
            currentWord = '';  
            canType = true;  
            canDelete = true;  
            updateWordDisplay();  
            modalMessage.textContent = "¡Felicidades, adivinaste la palabra!";
            modalWord.textContent = ""; 
        } else {
            modalMessage.textContent = "¡Buen intento!";
            modalWord.textContent = `La palabra era: ${targetWord}`;
        }
        restartModal.style.display = 'flex';
        restartButton.onclick = () => {
            restartModal.style.display = 'none';  
            fetchRandomWord();  
            updateWordDisplay();  
        };
        closeModalButton.onclick = () => {
            restartModal.style.display = 'none';  
        };
    }
    else {
        canType = true;
        updateWordDisplay(); 
    }
}