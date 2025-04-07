import { toggleTheme, applyStoredTheme } from './theme-logic.js';
import { setupButtons } from './buttons-logic.js';
import { renderKeyboard } from './keyboard-logic.js';
import { setTargetWord, useHint } from './game-logic.js';

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
        // Puedes mostrar un mensaje al usuario si lo deseas
        document.getElementById('error-message').textContent = 'Error al cargar las palabras. Intenta recargar la página.';
    }
}

// Inicialización del juego
document.addEventListener('DOMContentLoaded', async () => {
    applyStoredTheme();
    setupButtons();
    
    // Verificar que los elementos existen antes de usarlos
    if (document.getElementById('themeToggle')) {
        document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    }
    
    await fetchRandomWord();
    renderKeyboard();
});

// Manejadores de eventos con verificación de elementos
const restartButton = document.getElementById('restartButton');
if (restartButton) {
    restartButton.addEventListener('click', async () => {
        await fetchRandomWord();
        const modal = document.getElementById('restartModal');
        if (modal) modal.style.display = 'none';
    });
}

const restartGameBtn = document.getElementById('restartGameBtn');
if (restartGameBtn) {
    restartGameBtn.addEventListener('click', async () => {
        await fetchRandomWord();
        const modal = document.getElementById('restartModal');
        if (modal) modal.style.display = 'none';
    });
}

const hintBtn = document.getElementById('hintBtn');
if (hintBtn) {
    hintBtn.addEventListener('click', useHint);
}