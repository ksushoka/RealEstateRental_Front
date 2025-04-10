import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./property-detail.css";

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
    amenityTypes: string[];
}

const PropertyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [checkInDate, setCheckInDate] = useState<string>("");
    const [checkOutDate, setCheckOutDate] = useState<string>("");
    const [bookingStatus, setBookingStatus] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<Property>(
                    `http://localhost:8080/properties/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProperty(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке недвижимости:", error);
            }
        };
        fetchProperty();
    }, [id]);

    const handleBooking = async () => {
        if (!checkInDate || !checkOutDate) {
            setBookingStatus("Выберите даты!");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            // Use the date strings directly without adding time
            const response = await axios.post(
                `http://localhost:8080/booking/save`,
                null,
                {
                    params: {
                        propertyId: id,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                    },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setBookingStatus("Бронирование успешно!");
            console.log(response.data);
        } catch (error) {
            setBookingStatus("Ошибка при бронировании.");
            console.error(error);
        }
    };


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
                      key={`${photo.id}-${photo.fileName}-${index}`}
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

            {/* Форма бронирования */}
            <div className="booking-form">
                <h3>Забронировать</h3>
                <label>Дата заезда:</label>
                <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                <label>Дата выезда:</label>
                <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                <button onClick={handleBooking} className="book-button">Забронировать</button>
                {bookingStatus && <p className="status-message">{bookingStatus}</p>}
            </div>
        </div>
    );
};

export default PropertyDetailPage;
