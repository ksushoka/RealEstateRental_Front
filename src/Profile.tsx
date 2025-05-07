import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';

interface Property {
  id: number;
  title: string;
  description: string;
  pricePerNight: number;
  location: string;
  photos: string[]; // Изменено на массив строк
  amenityTypes: string[];
}

interface Booking {
  id: number;
  checkInDate: string;
  checkOutDate: string;
  bookingDate: string;
  status: string;
  propertyId: number; // Изменено с property на propertyId
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookingProperties, setBookingProperties] = useState<Booking[]>([]);
  const [bookedProperties, setBookedProperties] = useState<Map<number, Property>>(new Map());

  // Загрузка объявлений пользователя
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Property[]>(`http://localhost:8080/users/properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchProperties();
  }, [id]);

  // Загрузка бронирований
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Booking[]>(`http://localhost:8080/booking/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookingProperties(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, [id]);

  // Загрузка данных по забронированным свойствам
  useEffect(() => {
    const fetchBookedProperties = async () => {
      const propertyIds = Array.from(new Set(bookingProperties.map(b => b.propertyId)));
      try {
        const token = localStorage.getItem('token');
        const properties = await Promise.all(
            propertyIds.map(id =>
                axios.get<Property>(`http://localhost:8080/properties/${id}`,
                  {headers:{
                    Authorization:`Bearer ${token}`
                    }})
                    .then(res => res.data)
                    .catch(() => null)
            )
        );

        const validProperties = properties.filter(p => p !== null) as Property[];
        const newMap = new Map<number, Property>();
        validProperties.forEach(p => newMap.set(p.id, p));
        setBookedProperties(newMap);
      } catch (error) {
        console.error('Error fetching booked properties:', error);
      }
    };

    if (bookingProperties.length > 0) {
      fetchBookedProperties();
    }
  }, [bookingProperties]);

  return (
      <div className="container">
        <h1>Ваши объявления</h1>
        <ul className="property-list">
          {properties.map(property => (
              <li key={property.id} className="property-item">
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <p><b>Цена за ночь: {property.pricePerNight} ₽</b></p>
                <p><b>Местоположение: {property.location}</b></p>
                <div className="photo-gallery">
                  {property.photos.map((fileName, index) => (
                      <img
                          key={`${property.id}-${fileName}-${index}`}
                          src={`http://localhost:8080/properties/photos/${fileName}`}
                          alt="property"
                          style={{ width: '200px', height: '120px', marginRight: '0px' }}
                      />
                  ))}
                </div>
              </li>
          ))}
        </ul>

        <h1>Забронированные объявления</h1>
        <ul className="property-list">
          {bookingProperties.map(booking => {
            const property = bookedProperties.get(booking.propertyId);
            if (!property) return null;

            return (
                <li key={booking.id} className="property-item">
                  <h3>{property.title}</h3>
                  <p>{property.description}</p>
                  <p><b>Цена за ночь: {property.pricePerNight} ₽</b></p>
                  <p><b>Местоположение: {property.location}</b></p>
                  <p>
                    <strong>Бронирование:</strong> с {booking.checkInDate} по {booking.checkOutDate}
                  </p>
                  <p>
                    <strong>Дата брони:</strong> {new Date(booking.bookingDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Статус:</strong> {booking.status}
                  </p>
                  <div className="photo-gallery">
                    {property.photos.map((fileName, index) => (
                        <img
                            key={`${property.id}-${fileName}-${index}`}
                            src={`http://localhost:8080/properties/photos/${fileName}`}
                            alt="property"
                            style={{ width: '200px', height: '120px', marginRight: '0px' }}
                        />
                    ))}
                  </div>
                </li>
            );
          })}
        </ul>
      </div>
  );
};

export default Profile;