import React from 'react';

const AboutPage = () => {
  return (
    // <div>
    //   <h1>О сайте</h1>
    //   <p>Это информация о странице.</p>
    // </div>

  <body>
  <h1>Интерактивность с помощью JavaScript</h1>
  <p id="message">Нажмите на кнопку, чтобы изменить этот текст.</p>
  <button onclick="changeText()">Нажми меня</button>
  <h1>Заголовок</h1>
  <p>Первый абзац.</p>
  <p>Второй абзац.</p>
  </body>
  );
};

export default AboutPage;
