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

window.addEventListener('resize', renderKeyboard);