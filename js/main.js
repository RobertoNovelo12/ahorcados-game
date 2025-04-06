import { toggleTheme, applyStoredTheme } from './theme-logic.js';
import { setupButtons } from './buttons-logic.js';
import { renderKeyboard } from './keyboard-logic.js';

let selectedWord = '';

async function fetchRandomWord() {
  try {
    const response = await fetch('./public/words.json');
    const data = await response.json();
    const words = data.words;
    selectedWord = words[Math.floor(Math.random() * words.length)];
    renderWordLines(selectedWord);
  } catch (error) {
    console.error('Error al cargar el diccionario:', error);
  }
}

function renderWordLines(word) {
  const display = document.getElementById('word-display');
  display.innerHTML = '';

  for (let i = 0; i < word.length; i++) {
    const line = document.createElement('div');
    line.classList.add('letter-line');
    line.setAttribute('data-index', i);
    display.appendChild(line);
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  applyStoredTheme();
  await fetchRandomWord();
  renderKeyboard();
});

document.addEventListener('DOMContentLoaded', () => {
  applyStoredTheme();

  const themeToggleBtn = document.getElementById('themeToggle');
  themeToggleBtn.addEventListener('click', toggleTheme);

  setupButtons();
});