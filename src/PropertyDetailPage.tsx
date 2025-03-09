import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './property-detail.css'; // можно добавить собственные стили

// Интерфейсы для типов данных
interface Photo {
    id: number;
    fileName: string;
}

interface Property {
    id: number;
    title: string;
    description: string;
    pricePerNight: number;
    location: string;
    photos: Photo[];
    // Добавлено поле удобств, предполагается, что API возвращает массив строк
    amenityTypes: string[];
}

const PropertyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Токен:", token); // Проверяем, есть ли токен
                const response = await axios.get<Property>(
                    `http://localhost:8080/properties/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProperty(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке недвижимости:", error);
                if (axios.isAxiosError(error)) {
                    console.error("Ответ сервера:", error.response);
                }
            }
        };
        fetchProperty();
    }, [id]);

    if (!property) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="property-detail-container">
            <Link to="/" className="back-link">← Назад к списку</Link>
            <h1>{property.title}</h1>
            <div className="photo-gallery">
                {property.photos && property.photos.length > 0 ? (
                    property.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={`http://localhost:8080/properties/photos/${photo.fileName}`}
                            alt={property.title}
                            className="property-photo"
                        />
                    ))
                ) : (
                    <div>Нет изображений</div>
                )}
            </div>
            <p>{property.description}</p>
            <p><strong>Цена за ночь:</strong> {property.pricePerNight} ₽</p>
            <p><strong>Локация:</strong> {property.location}</p>
            <div className="amenities">
                <h3>Удобства:</h3>
                {property.amenityTypes && property.amenityTypes.length > 0 ? (
                    <ul>
                        {property.amenityTypes.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Удобства отсутствуют</p>
                )}
            </div>
        </div>
    );
};

export default PropertyDetailPage;
