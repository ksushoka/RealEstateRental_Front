// AddProperty.tsx
import { useState } from "react";
import axios from "axios";
import "./property.css";

// const AmenityTypes = {
//     WI_FI: "Интернет",
//     FRIDGE: "Холодильник",
//     KETTLE: "Чайник",
//     TV: "Телевизор",
// } as const;

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        pricePerNight: "",
        location: "",
        amenityTypes: [] as String[],
        photos: [] as File[],
    });
    // const handleAmenityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const selected = Array.from(e.target.selectedOptions).map(
    //       (option) => option.value
    //     );
    //     setFormData({ ...formData, amenityTypes: selected });
    // };

    const handleChange = (
        // @ts-ignore
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // @ts-ignore
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Преобразуем FileList в массив
            const filesArray = Array.from(e.target.files);
            setFormData({ ...formData, photos: filesArray });
        }
    };
    // @ts-ignore
    const handleAmenityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions as HTMLOptionElement[]).map(option => option.value);
        setFormData({ ...formData, amenityTypes: selectedOptions });
    };
    // @ts-ignore
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.photos.length === 0) return alert("Выберите фото!");

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("pricePerNight", formData.pricePerNight);
        data.append("location", formData.location);
        // Добавляем все выбранные файлы
        formData.amenityTypes.forEach((amenityType) => {
            data.append("amenityTypes", amenityType);
        });
        formData.photos.forEach((photo) => {
            data.append("photos", photo);
        });

        try {
            await axios.post("http://localhost:8080/properties", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Недвижимость добавлена!");
            setFormData({ title: "", description: "", pricePerNight: "",location: "", amenityTypes: [], photos: [] });
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div
            className="container"
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <div className="form-container">
                <h2
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: "1rem",
                    }}
                >
                    Добавить недвижимость
                </h2>
                <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                    <input
                        type="text"
                        name="title"
                        placeholder="Название"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Описание"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-input"
                        style={{ height: "6rem" }}
                        required
                    />
                    <input
                        type="number"
                        name="pricePerNight"
                        placeholder="Цена за ночь"
                        value={formData.pricePerNight}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                    type="text"
                    name="location"
                    placeholder="Местоположение"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input"
                    required
                    />
                    <select
                        name="amenityTypes"
                        multiple
                        value={formData.amenityTypes}
                        onChange={handleAmenityChange}
                        className="form-input"
                        required
                        >
                        <option value="WI_FI">Интернет</option>
                        <option value="FRIDGE">Холодильник</option>
                        <option value="KETTLE">Чайник</option>
                        <option value="TV">Телевизор</option>
                    </select>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="form-input"
                        required
                    />
                    <button type="submit" className="button blue-button">
                        ➕ Добавить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
