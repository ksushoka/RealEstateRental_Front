import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// @ts-ignore
import HomePage from './HomePage.tsx';
// @ts-ignore
import AboutPage from './AboutPage.tsx';
// @ts-ignore
import UserPage from './UserPage.tsx';
// @ts-ignore
import UserDetailPage from './UserDetailPage.tsx'; // Импортируем новый компонент

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/user">Add User</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        {/* Основные маршруты */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<UserPage />} />

        {/* Динамический маршрут для страницы студента по ID */}
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;