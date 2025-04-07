import { handleKeyPress, updateWordDisplay } from './game-logic.js';

export function renderKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';  
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    
    rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('key-row');           
        row.forEach(letter => {
            const btn = document.createElement('button');
            btn.classList.add('key-button');
            btn.setAttribute('data-key', letter);
            btn.textContent = letter;
            
            btn.addEventListener('click', () => handleKeyPress(letter));           
            rowDiv.appendChild(btn);  
        });        
        keyboard.appendChild(rowDiv);  
    });
}

export function renderWordLines() {
    const display = document.getElementById('word-display');
    display.innerHTML = '';
    updateWordDisplay();  
}

function handlePhysicalKeyboard(e) {
    if (e.key.length === 1 && /^[a-zA-ZñÑ]$/.test(e.key)) {
        const letter = e.key.toUpperCase();
        handleKeyPress(letter);
        const virtualButton = document.querySelector(`.key-button[data-key="${letter}"]`);
        if (virtualButton) {
            virtualButton.classList.add('active');
            setTimeout(() => {
                virtualButton.classList.remove('active');
            }, 100);
        }
    }
    else if (e.key === 'Enter') {
        const restartBtn = document.getElementById('restartGameBtn');
        if (restartBtn) restartBtn.click();
    }
}

export function initKeyboard() {
    renderKeyboard();
    document.addEventListener('keydown', handlePhysicalKeyboard);
}

window.addEventListener('resize', renderKeyboard);