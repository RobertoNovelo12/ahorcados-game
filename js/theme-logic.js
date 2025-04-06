export function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
  
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.src = isDark ? 'public/sun-icon.svg' : 'public/moon-icon.svg';
  }
  
  export function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
  
    if (storedTheme === 'dark') {
      body.classList.add('dark');
      themeIcon.src = 'public/sun-icon.svg';
    } else {
      body.classList.remove('dark');
      themeIcon.src = 'public/moon-icon.svg';
    }
  } 