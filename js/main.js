import { toggleTheme, applyStoredTheme } from './theme-logic.js';
import { setupButtons } from './buttons-logic.js';
import { renderKeyboard } from './keyboard-logic.js';
import { setTargetWord, useHint, updateWordDisplay, hideModal } from './game-logic.js';

let selectedWord = '';
let selectedHint = '';

async function fetchRandomWord() {
    try {
        const response = await fetch('../public/words.json');
        if (!response.ok) throw new Error('Error al cargar el diccionario');
        
        const data = await response.json();
        const words = data.words;

        if (!words || words.length === 0) throw new Error('No hay palabras disponibles');
        
        const random = words[Math.floor(Math.random() * words.length)];
        selectedWord = random.word;
        selectedHint = random.hint || 'Sin pista disponible';

        setTargetWord(selectedWord, selectedHint);
    } catch (error) {
        console.error('Error:', error.message);
        document.getElementById('error-message').textContent = 'Error al cargar las palabras. Intenta recargar la página.';
    }
}

async function resetGame() {
    await fetchRandomWord();
    renderKeyboard();
    updateWordDisplay();
}

document.addEventListener('DOMContentLoaded', async () => {
    applyStoredTheme();
    setupButtons();

    
    await fetchRandomWord();
    renderKeyboard();

    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    
    const hintBtn = document.getElementById('hintBtn');
    if (hintBtn) {
        hintBtn.addEventListener('click', useHint);
    }

    
    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
        restartButton.addEventListener('click', async () => {
            await resetGame();
            hideModal();
        });
    }

    const restartGameBtn = document.getElementById('restartGameBtn');
    if (restartGameBtn) {
        restartGameBtn.addEventListener('click', async () => {
            await resetGame();
            hideModal();
        });
    }

    const closeModalBtn = document.getElementById('closeModalButton');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
    }
});