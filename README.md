# 🎮 Juego de Ahorcados

¡Bienvenido al clásico juego del Ahorcado! Esta versión está desarrollada utilizando HTML5, CSS y JavaScript puro, ofreciendo una experiencia interactiva y visualmente atractiva.

## 🕹️ Características

- **Interfaz Gráfica con Canvas**: El juego utiliza el elemento `<canvas>` para renderizar en 2D, permitiendo una representación visual dinámica del muñeco (stickman) que se dibuja progresivamente con cada error del jugador.

- **Teclado Virtual Integrado**: Pensando en la accesibilidad desde dispositivos móviles, se ha incorporado un teclado virtual en pantalla que facilita la interacción sin necesidad de un teclado físico.

- **Palabras Aleatorias desde JSON**: Las palabras a adivinar se almacenan en un archivo JSON y se seleccionan de forma aleatoria cada vez que se inicia o reinicia el juego, garantizando una experiencia única en cada partida.

- **Diseño Responsivo**: La interfaz se adapta a diferentes tamaños de pantalla, asegurando una experiencia óptima tanto en computadoras de escritorio como en dispositivos móviles.

## 🚀 Demo en Vivo

Puedes probar el juego directamente en tu navegador a través del siguiente enlace:

👉 [ahorcados-game.vercel.app](https://ahorcados-game.vercel.app)

## 📂 Estructura del Proyecto

```
ahorcados-game/
├── index.html
├── instructions.html
├── js/
│   ├── main.js
│   └── words.json
├── styles/
│   └── style.css
├── source/
│   └── images/
├── LICENSE
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura del contenido y elementos semánticos.
- **CSS3**: Estilización y diseño responsivo.
- **JavaScript**: Lógica del juego, manejo de eventos y manipulación del DOM.
- **Canvas API**: Renderizado gráfico del muñeco del ahorcado.

## 📌 Cómo Jugar

1. Al iniciar el juego, se seleccionará una palabra al azar que deberás adivinar letra por letra.
2. Utiliza el teclado virtual en pantalla para seleccionar letras.
3. Cada vez que selecciones una letra incorrecta, se dibujará una parte del muñeco.
4. El juego termina cuando adivinas la palabra completa o se completa el dibujo del muñeco.

## 📄 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE), lo que significa que puedes utilizarlo, modificarlo y distribuirlo libremente, siempre y cuando incluyas la licencia original.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar el juego, corregir errores o añadir nuevas funcionalidades, no dudes en hacer un fork del repositorio y enviar un pull request.
