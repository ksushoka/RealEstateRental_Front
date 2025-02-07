import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetailPage = () => {
  const { id } = useParams(); // Получаем ID из URL

  return (
    <div>
      <h1>User Detail Page</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default UserDetailPage;