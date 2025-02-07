import React, { useState } from 'react';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="number"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
          required
        />
        <button type="submit">Add User</button>
      </form>
      {user && (
        <div>
          <h2>User Info</h2>
          <p>Username: {user.username}</p>
          <p>Password: {user.password}</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
