import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserPage.css';

interface Property {
    id: number;
    title: string;
    description: string;
    pricePerNight: number;
    location: string;
    // можно добавить photoPath и amenityTypes, если нужно
}

const UserDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:8080/users/${id}/properties`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) throw new Error('Failed to fetch properties');
                const data = await response.json();
                setProperties(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchProperties();
    }, [id]);

    return (
        <div className="container">
            <h1>User Properties</h1>
            <ul className="property-list">
                {properties.map(property => (
                    <li key={property.id} className="property-item">
                        <h3>{property.title}</h3>
                        <p>{property.description}</p>
                        <p>Price per night: {property.pricePerNight}</p>
                        <p>Location: {property.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDetailPage;
