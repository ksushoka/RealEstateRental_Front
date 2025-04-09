import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserPage.css';

interface Booking {
  checkInDate: string,
  checkOutDate: string,
  bookingDate: string,
  status: string,
  property: Property[]

}
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
  // можно добавить photoPath и amenityTypes, если нужно
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/users/properties`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        console.log(data)
        setProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProperties();
  }, [id]);
  // const { id } = useParams<{ id: string }>();
  const [bookingProperties, setBookingProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/booking/all`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        console.log(data)
        setBookingProperties(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProperties();
  }, [id]);

  return (
    <div className="container">
      <h1>Ваши объявления</h1>
      <ul className="property-list">
        {properties.map(property => (
          <li key={property.id} className="property-item">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price per night: {property.pricePerNight}</p>
            <p>Location: {property.location}</p>
            <div className="photo-gallery">
              {property.photos && property.photos.map(photo => (
                <img
                key={photo.id}
                src = {`http://localhost:8080/properties/photos/${photo.fileName}`}
                alt= 'property'
                style={{ width: '200px', height: '120px', marginRight: '0px' }}/>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <h1>Забронированные объявления</h1>
      <ul className="property-list">
        {bookingProperties.map(property => (
          <li key={property.id} className="property-item">
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <p>Price per night: {property.pricePerNight}</p>
            <p>Location: {property.location}</p>
            <div className="photo-gallery">
              {property.photos && property.photos.map(photo => (
                <img
                  key={photo.id}
                  src = {`http://localhost:8080/properties/photos/${photo.fileName}`}
                  alt= 'property'
                  style={{ width: '200px', height: '120px', marginRight: '0px' }}/>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;