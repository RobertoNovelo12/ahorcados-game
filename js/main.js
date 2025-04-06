import { toggleTheme, applyStoredTheme } from './theme-logic.js';
import { setupButtons } from './buttons-logic.js';

document.addEventListener('DOMContentLoaded', () => {
  applyStoredTheme();

  const themeToggleBtn = document.getElementById('themeToggle');
  themeToggleBtn.addEventListener('click', toggleTheme);

  setupButtons();
});