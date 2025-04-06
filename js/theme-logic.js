export function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  export function applyStoredTheme() {
    const storedTheme = localStorage.getItem('theme');
    const body = document.body;
  
    if (storedTheme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }