import React, { useState } from 'react';
import './UserPage.css';

const UserPage: React.FC = () => {
  // Состояние для текстовых полей
  const [formData, setFormData] = useState({ username: '', password: '' });
  // Состояние для выбранного файла
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<{ username: string; password: string; photoPath?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Обработчик выбора файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Собираем данные в FormData
    const data = new FormData();
    data.append('username', formData.username);
    data.append('password', formData.password);
    if (file) {
      data.append('photo', file);
    }

    try {
      const response = await fetch('http://localhost:8080/users/save', {
        method: 'POST',
        body: data, // При использовании FormData не нужно задавать Content-Type
      });
      if (!response.ok) throw new Error('Something went wrong');
      const responseData = await response.json();
      setUser(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div className="container">
        <div className="card">
          <h1 className="title">Add User</h1>
          <form onSubmit={handleSubmit} className="form">
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="input"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="input"
            />
            {/* Поле для выбора файла */}
            <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="input"
                accept="image/*"
            />
            <button type="submit" className="button">Add User</button>
          </form>
          {user && (
              <div className="user-info">
                <h2>User Info</h2>
                <p><span>Username:</span> {user.username}</p>
                <p><span>Password:</span> {user.password}</p>
                {user.photoPath && (
                    <div>
                      <p><span>Photo:</span></p>
                      {/* Отображаем фотографию; обращаемся к серверу по указанному пути */}
                      <img src={`http://localhost:8080${user.photoPath}`} alt="User" width="150" />
                    </div>
                )}
              </div>
          )}
        </div>
      </div>
  );
};

export default UserPage;
