import { redrawStickman, initStickman } from './player-logic.js';

export function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.src = isDark ? 'source/sun-icon.svg' : 'source/moon-icon.svg';
    }
    redrawStickman(window.currentWrongCount || 0);
}

export function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    const root = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    if (storedTheme === 'dark') {
        root.classList.add('dark');
        if (themeIcon) themeIcon.src = 'source/sun-icon.svg';
    } else {
        root.classList.remove('dark');
        if (themeIcon) themeIcon.src = 'source/moon-icon.svg';
    }
    initStickman();
}