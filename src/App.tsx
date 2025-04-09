import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// @ts-ignore
import Home from "./Home.tsx";
// @ts-ignore
import AboutPage from "./AboutPage.tsx";
// @ts-ignore
import UserPage from "./UserPage.tsx";
// @ts-ignore
import UserDetailPage from "./UserDetailPage.tsx";
// @ts-ignore
import Profile from './Profile.tsx';
// @ts-ignore
import UserListPage from "./UserListPage.tsx";
// @ts-ignore
import AddProperty from "./AddProperty.tsx";
// @ts-ignore
import PropertyDetailPage from "./PropertyDetailPage.tsx";
// @ts-ignore
import Login from "./Login.tsx";
// @ts-ignore
import Registration from "./Registration.tsx";
// @ts-ignore
import BookingWrapper from "./BookingWrapper.tsx";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <header
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "2rem",
                    padding: "15px 0",
                    backgroundColor: "#f0f0f0",
                }}
            >
                <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
                    Главная
                </Link>
              <Link to="/profile" style={{ textDecoration: "none", color: "#333" }}>
                    Мой профиль
              </Link>
                <Link to="/about" style={{ textDecoration: "none", color: "#333" }}>
                    О недвижимости
                </Link>
                <Link to="/users" style={{ textDecoration: "none", color: "#333" }}>
                    Список владельцев
                </Link>
                <Link to="/addProperty" style={{ textDecoration: "none", color: "#333" }}>
                    Создать объявление
                </Link>

                {!isLoggedIn ? (
                    <>
                        <Link to="/login" style={{ textDecoration: "none", color: "#007bff" }}>
                            Вход
                        </Link>
                        <Link
                            to="/registration"
                            style={{ textDecoration: "none", color: "#28a745" }}
                        >
                            Регистрация
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                            borderRadius: "4px",
                        }}
                    >
                        Выйти
                    </button>
                )}
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="/users/:id" element={<UserDetailPage />} />
                <Route path="/addProperty" element={<AddProperty />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/registration" element={<Registration />} />
                {/* Маршрут для бронирования недвижимости, propertyId будет автоматически подставляться */}
                <Route path="/booking/:propertyId" element={<BookingWrapper />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default App;