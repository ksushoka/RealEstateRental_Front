import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// @ts-ignore
import Home from './Home.tsx';
// @ts-ignore
import AboutPage from './AboutPage.tsx';
// @ts-ignore
import UserPage from './UserPage.tsx';
// @ts-ignore
import UserDetailPage from './UserDetailPage.tsx'; // Импортируем новый компонент

// @ts-ignore
import UserListPage from './UserListPage.tsx';

// @ts-ignore
import AddProperty from './AddProperty.tsx';


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
          <li>
            <Link to="/users">User List</Link>
          </li>
          <li>
            <Link to="/addProperty">Add Property</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        {/* Основные маршруты */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/users" element={<UserListPage />} />
        {/* Динамический маршрут для страницы студента по ID */}
        <Route path="/user/:id" element={<UserDetailPage />} />
        <Route path="addProperty" element={<AddProperty />} />
      </Routes>
    </Router>
  );
};

export default App;