import { toggleTheme, applyStoredTheme } from './theme-logic.js';
import { setupButtons } from './buttons-logic.js';
import { renderKeyboard, renderWordLines } from './keyboard-logic.js';
import { 
    handleKeyPress, 
    handleBackspace, 
    handleEnter, 
    updateWordDisplay,
    setTargetWord
} from './game-logic.js';

let selectedWord = '';

async function fetchRandomWord() {
    try {
        const response = await fetch('../public/words.json');
        const data = await response.json();
        const words = data.words;
        selectedWord = words[Math.floor(Math.random() * words.length)];
        setTargetWord(selectedWord); 
        renderWordLines(); 
        updateWordDisplay(); 
    } catch (error) {
        console.error('Error al cargar el diccionario:', error);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    applyStoredTheme(); 
    await fetchRandomWord(); 
    renderKeyboard(); 
});

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', async () => {
    await fetchRandomWord();  
    const restartModal = document.getElementById('restartModal');
    restartModal.style.display = 'none';  
    renderWordLines();  
    updateWordDisplay(); 
});

const restartGameBtn = document.getElementById('restartGameBtn');
restartGameBtn.addEventListener('click', async () => {
    await fetchRandomWord();  
    const restartModal = document.getElementById('restartModal');
    restartModal.style.display = 'none';  
    renderWordLines();  
    updateWordDisplay(); 
});

document.addEventListener('DOMContentLoaded', () => {
    applyStoredTheme();

    const themeToggleBtn = document.getElementById('themeToggle');
    themeToggleBtn.addEventListener('click', toggleTheme);

    setupButtons();
});