export function setupButtons() {
    document.getElementById('helpBtn').addEventListener('click', () => {
      alert('Aquí irá la ayuda del juego.');
    });
  
    document.getElementById('hintBtn').addEventListener('click', () => {
      alert('Aquí irá una pista sobre la palabra.');
    });
  }  