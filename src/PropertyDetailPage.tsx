import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./property-detail.css";

interface Property {
    id: number;
    title: string;
    description: string;
    pricePerNight: number;
    location: string;
    photos: string[];
    amenityTypes: string[];
    hostId: number;
}

interface User {
    id: number;
    username: string;
    photoPath: string;
    email: string;
}

interface ReviewDTO {
    username: string;
    rating: number;
    comment: string;
}

const MAX_STARS = 5;

const Star: React.FC<{
    filled: boolean;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}> = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <span
        className={`star ${filled ? 'filled' : ''}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        ★
    </span>
);

const PropertyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [owner, setOwner] = useState<User | null>(null);
    const [reviews, setReviews] = useState<ReviewDTO[]>([]);
    const [newRating, setNewRating] = useState<number>(MAX_STARS);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [newComment, setNewComment] = useState<string>(""
    );
    const [checkInDate, setCheckInDate] = useState<string>(""
    );
    const [checkOutDate, setCheckOutDate] = useState<string>(""
    );
    const [bookingStatus, setBookingStatus] = useState<string | null>(null);
    const [reviewStatus, setReviewStatus] = useState<string | null>(null);

    // Загрузка данных о недвижимости
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<Property>(
                    `http://localhost:8080/properties/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setProperty(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке недвижимости:", error);
            }
        };
        fetchProperty();
    }, [id]);

    // Загрузка данных о владельце
    useEffect(() => {
        const fetchOwner = async () => {
            if (property?.hostId) {
                try {
                    const token = localStorage.getItem("token");
                    const response = await axios.get<User>(
                        `http://localhost:8080/users/${property.hostId}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setOwner(response.data);
                } catch (error) {
                    console.error("Ошибка при загрузке владельца:", error);
                }
            }
        };
        fetchOwner();
    }, [property?.hostId]);

    // Загрузка отзывов
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get<ReviewDTO[]>(
                    `http://localhost:8080/review/property/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setReviews(response.data);
            } catch (error) {
                console.error("Ошибка при загрузке отзывов:", error);
            }
        };
        fetchReviews();
    }, [id]);

    // Бронирование
    const handleBooking = async () => {
        if (!checkInDate || !checkOutDate) {
            setBookingStatus("Выберите даты!");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:8080/booking/save`,
                null,
                {
                    params: {
                        propertyId: id,
                        checkInDate,
                        checkOutDate,
                    },
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setBookingStatus("Бронирование успешно!");
        } catch (error) {
            setBookingStatus("Ошибка при бронировании.");
            console.error(error);
        }
    };

    // Отправка отзыва
    const handleReviewSubmit = async () => {
        if (!newComment) {
            setReviewStatus("Введите текст отзыва!");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:8080/review/save/${id}`,
                { rating: newRating, comment: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReviewStatus("Отзыв добавлен!");
            const response = await axios.get<ReviewDTO[]>(
                `http://localhost:8080/review/property/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReviews(response.data);
            setNewComment("");
            setNewRating(MAX_STARS);
        } catch (error) {
            setReviewStatus("Ошибка при отправке отзыва.");
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
                    property.photos.map((fileName, index) => (
                        <img
                            key={`${id}-${fileName}-${index}`}
                            src={`http://localhost:8080/properties/photos/${fileName}`}
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

            <div className="owner-section">
                <h2>Владелец жилья</h2>
                {owner ? (
                    <div className="owner-profile">
                        <div className="owner-photo-container">
                            <img
                                src={owner.photoPath
                                    ? `http://localhost:8080/users/photos/${owner.photoPath}`
                                    : '/default-avatar.png'}
                                alt={owner.username}
                                className="owner-photo"
                            />
                        </div>
                        <div className="owner-info">
                            <h3>{owner.username}</h3>
                            <p>Контакты: {owner.email}</p>
                            <Link to={`/user/${owner.id}`} className="profile-link">
                                Посмотреть профиль
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>Загрузка информации о владельце...</div>
                )}
            </div>

            <div className="booking-form">
                <h3>Забронировать</h3>
                <label>Дата заезда:</label>
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                />
                <label>Дата выезда:</label>
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                />
                <button onClick={handleBooking} className="book-button">
                    Забронировать
                </button>
                {bookingStatus && <p className="status-message">{bookingStatus}</p>}
            </div>

            <div className="reviews-section">
                <h3>Отзывы</h3>
                {reviews.length > 0 ? (
                    reviews.map((rev, idx) => (
                        <div key={idx} className="review-item">
                            <div className="star-display">
                                {Array.from({ length: MAX_STARS }, (_, i) => (
                                    <Star key={i} filled={i < rev.rating} />
                                ))}
                            </div>
                            <p><strong>{rev.username}</strong></p>
                            <p>{rev.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>Пока нет отзывов.</p>
                )}

                <h4>Оставить отзыв</h4>
                <label>Рейтинг:</label>
                <div className="star-input">
                    {Array.from({ length: MAX_STARS }, (_, i) => {
                        const starValue = i + 1;
                        return (
                            <Star
                                key={i}
                                filled={hoverRating
                                    ? i < hoverRating
                                    : i < newRating}
                                onClick={() => setNewRating(starValue)}
                                onMouseEnter={() => setHoverRating(starValue)}
                                onMouseLeave={() => setHoverRating(0)}
                            />
                        );
                    })}
                </div>
                <label>Комментарий:</label>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                />
                <button onClick={handleReviewSubmit} className="review-submit-button">
                    Отправить отзыв
                </button>
                {reviewStatus && <p className="status-message">{reviewStatus}</p>}
            </div>
        </div>
    );
};

export default PropertyDetailPage;