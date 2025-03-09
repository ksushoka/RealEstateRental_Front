import React, { useEffect, useState } from 'react';
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
                const token = localStorage.getItem('token'); // Токен хранится в localStorage
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

    // const handleDelete = async (username: string) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/users/delete/${username}`, {
    //             method: 'DELETE',
    //         });
    //         if (!response.ok) throw new Error('Failed to delete user');
    //         setUsers((prevUsers) => prevUsers.filter(user => user.username !== username));
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    return (
        <div className="container">
            <div className="card">
                <h1 className="title">User List</h1>
                <ul className="user-list">
                    {users.map((user) => (
                        <li key={user.id} className="user-item">
                            <p><span>Username:</span> {user.username}</p>
                            {/*<p><span>Password:</span> {user.password}</p>*/}
                            {/*{user.photoPath && (*/}
                            {/*    <img src={`http://localhost:8080${user.photoPath}`} alt="User" width="100" />*/}
                            {/*)}*/}
                            <p></p>
                            {/*<button className="delete-button" onClick={() => handleDelete(user.username)}>*/}
                            {/*    Delete*/}
                            {/*</button>*/}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserListPage;
