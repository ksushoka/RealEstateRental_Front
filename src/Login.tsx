import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    setIsLoggedIn: (loggedIn: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/login', { username, password });
            console.log('Ответ от сервера:', response.data);

            const token = response.data?.result;
            if (token) {
                localStorage.setItem('token', token);
                console.log('Токен сохранён в localStorage:', token);
                setIsLoggedIn(true); // Обновляем состояние авторизации
                navigate('/');
            } else {
                console.warn('Токен не найден в ответе сервера:', response.data);
            }
        } catch (err) {
            console.error('Ошибка при входе:', err);
            setError('Ошибка при входе. Проверьте введённые данные.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f5f5f5',
        }}>
            <form onSubmit={handleSubmit} style={{
                background: '#fff',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                width: '300px',
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Вход в систему</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Имя пользователя</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                        required
                    />
                </div>
                <button type="submit" style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;
