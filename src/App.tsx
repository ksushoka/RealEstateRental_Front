// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// @ts-ignore
import Home from './Home.tsx';
// @ts-ignore
import AboutPage from './AboutPage.tsx';
// @ts-ignore
import UserPage from './UserPage.tsx';
// @ts-ignore
import UserDetailPage from './UserDetailPage.tsx';
// @ts-ignore
import UserListPage from './UserListPage.tsx';
// @ts-ignore
import AddProperty from './AddProperty.tsx';
// @ts-ignore
import PropertyDetailPage from './PropertyDetailPage.tsx'; // Импорт нового компонента

const App = () => {
  return (
      <Router>
        <header
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              padding: '15px 0',
              backgroundColor: '#f0f0f0',
            }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
            Home
          </Link>
          <Link to="/about" style={{ textDecoration: 'none', color: '#333' }}>
            About
          </Link>
          <Link to="/user" style={{ textDecoration: 'none', color: '#333' }}>
            Add User
          </Link>
          <Link to="/users" style={{ textDecoration: 'none', color: '#333' }}>
            User List
          </Link>
          <Link to="/addProperty" style={{ textDecoration: 'none', color: '#333' }}>
            Add Property
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route path="/addProperty" element={<AddProperty />} />
          {/* Новый маршрут для страницы деталей недвижимости */}
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
        </Routes>
      </Router>
  );
};

export default App;
