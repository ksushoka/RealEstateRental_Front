import React, { useState } from "react";
import axios from "axios";

interface BookingProps {
    propertyId: number;
    // Функция обратного вызова для уведомления об успешном бронировании
    onBookingSuccess?: () => void;
}

const Booking: React.FC<BookingProps> = ({ propertyId, onBookingSuccess }) => {
    const [checkInDate, setCheckInDate] = useState<string>("");
    const [checkOutDate, setCheckOutDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleBooking = async () => {
        setLoading(true);
        setError(null);
        try {
            // Получаем токен авторизации, если требуется
            const token = localStorage.getItem("token");

            // Отправляем запрос на бронирование
            const response = await axios.post(
                "http://localhost:8080/booking/save",
                null,
                {
                    params: {
                        propertyId,
                        checkInDate,
                        checkOutDate,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Бронирование успешно:", response.data);
            if (onBookingSuccess) {
                onBookingSuccess();
            }
        } catch (err: any) {
            console.error("Ошибка бронирования:", err);
            setError("Ошибка бронирования. Попробуйте позже.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h2>Забронировать недвижимость</h2>
            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                    Дата заезда:
                </label>
                <input
                    type="datetime-local"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    style={{ padding: "0.5rem", width: "100%" }}
                />
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem" }}>
                    Дата выезда:
                </label>
                <input
                    type="datetime-local"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    style={{ padding: "0.5rem", width: "100%" }}
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
                onClick={handleBooking}
                disabled={loading}
                style={{
                    backgroundColor: "#28a745",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                {loading ? "Бронируется..." : "Забронировать"}
            </button>
        </div>
    );
};

export default Booking;
