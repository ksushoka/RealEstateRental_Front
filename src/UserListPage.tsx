import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserPage.css';

interface User {
    id: number;
    username: string;
    password: string;
    photoPath?: string;
}

const UserListPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/users/all', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                console.log("Fetched data:", data);
                setUsers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">User List</h1>
                <ul className="user-list">
                    {users.map(user => (
                        <li key={user.id} className="user-item">
                            <Link to={`/users/${user.id}`}>
                                <p><span>Username:</span> {user.username}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserListPage;
