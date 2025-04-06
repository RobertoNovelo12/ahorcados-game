export function renderKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
  
    const rows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Eliminar'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Aceptar']
    ];
  
    rows.forEach(row => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('key-row');
      
      row.forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.classList.add('key-button');
        btn.setAttribute('data-key', letter);

        if (window.innerWidth <= 600) {
          if (letter === 'Eliminar') {
            btn.textContent = '←';
          } else if (letter === 'Aceptar') {
            btn.textContent = '↵';
          }
        }

        if (letter === 'Eliminar') {
          btn.addEventListener('click', handleBackspace);
        } else if (letter === 'Aceptar') {
          btn.addEventListener('click', handleEnter);
        } else {
          btn.addEventListener('click', () => handleKeyPress(letter));
        }
  
        rowDiv.appendChild(btn);
      });
  
      keyboard.appendChild(rowDiv);
    });
  }

  function handleKeyPress(letter) {
    console.log('Letra presionada:', letter);
  }
  
  function handleBackspace() {
    console.log('Borrar letra');
  }
  
  function handleEnter() {
    console.log('Confirmar palabra');
  }
  
  window.addEventListener('resize', renderKeyboard);  