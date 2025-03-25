import React from 'react';
import './about-page.css';

const AboutPage: React.FC = () => {
  return (
      <div className="about-container">
        <h1 className="about-title">О нас</h1>
        <p className="about-description">
          Добро пожаловать в наш сервис аренды недвижимости в СНГ! Мы помогаем находить комфортное жилье для долгосрочной и краткосрочной аренды.
        </p>

        <section className="features">
          <h2>Наши преимущества</h2>
          <ul>
            <li>🔍 Удобный поиск недвижимости</li>
            <li>💰 Прозрачные цены без скрытых комиссий</li>
            <li>🛡️ Безопасные сделки и проверенные объявления</li>
            <li>📞 Поддержка клиентов 24/7</li>
          </ul>
        </section>

        <section className="how-to-use">
          <h2>Как пользоваться?</h2>
          <ol>
            <li>🔎 Найдите подходящую недвижимость</li>
            <li>📩 Свяжитесь с владельцем через платформу</li>
            <li>✅ Забронируйте и заселяйтесь с комфортом!</li>
          </ol>
        </section>

        <section className="contact-info">
          <h2>Свяжитесь с нами</h2>
          <p>📍 Минск, Беларусь</p>
          <p>📧 support@rental.by</p>
          <p>📞 +375 29 123 45 67</p>
        </section>
      </div>
  );
};

export default AboutPage;
