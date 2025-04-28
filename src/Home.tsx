import { useState, useEffect } from "react";
import axios from "axios";
import "./property.css";
import { Link } from 'react-router-dom';

interface Property {
    id: number;
    title: string;
    description: string;
    pricePerNight: number;
    location: string;
    photos: string[];
    averageRating: number;
}

const Home = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        location: "",
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get<Property[]>("http://localhost:8080/properties", {
                params: filters,
            });
            const data = Array.isArray(response.data) ? response.data : [];
            setProperties(data);
        } catch (error) {
            console.error("Ошибка при загрузке недвижимости:", error);
            setProperties([]);
        }
    };

    return (
        <div className="container">
            <h1 className="header">🏡 Найдите жилье</h1>

            <div className="filter-container">
                <input
                    type="number"
                    placeholder="Мин. цена"
                    className="form-input"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Макс. цена"
                    className="form-input"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Локация"
                    className="form-input"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
                <button className="button blue-button" onClick={fetchProperties}>
                    🔍 Поиск
                </button>
            </div>

            <div className="properties-grid">
                {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                ))}
            </div>
        </div>
    );
};
// @ts-ignore
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const totalPhotos = property.photos?.length || 0;
    const maxDescriptionLength = 100;

    const handlePrev = () => {
        setCurrentPhotoIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentPhotoIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1));
    };

    return (
        <Link to={`/properties/${property.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="property-card">
                <div className="slider-container" style={{ position: "relative" }}>
                    {totalPhotos > 0 ? (
                        <>
                            <img
                                src={`http://localhost:8080/properties/photos/${property.photos[currentPhotoIndex]}`}
                                alt={property.title}
                                className="property-image"
                            />
                            {totalPhotos > 1 && (
                                <>
                                    <button onClick={handlePrev} className="slider-button slider-button-left">
                                        &#9664;
                                    </button>
                                    <button onClick={handleNext} className="slider-button slider-button-right">
                                        &#9654;
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="image-placeholder">
                            <span>Нет изображения</span>
                        </div>
                    )}
                </div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "0.5rem" }}>
                    {property.title}
                </h2>
                <p className="description" style={{
                    color: "#4b5563",
                    margin: "0.5rem 0",
                    width: "200px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>
                    {property.description.length > maxDescriptionLength
                        ? property.description.slice(0, maxDescriptionLength) + "..."
                        : property.description}
                </p>
                <p style={{ fontSize: "1.125rem", fontWeight: "700", margin: "0.5rem 0" }}>
                    💰 {property.pricePerNight} ₽/ночь
                </p>
                <p style={{ fontSize: "1.125rem", fontWeight: "900", margin: "0.5rem 0", color: "#FF0000" }}>
                    {property.location}
                </p>
                <button className="button green-button" style={{ width: "100%", marginTop: "0.75rem" }}>
                    Забронировать
                </button>
            </div>
        </Link>
    );
};

export default Home;