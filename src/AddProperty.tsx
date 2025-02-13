// AddProperty.tsx
import { useState } from "react";
import axios from "axios";
import "./property.css";

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        pricePerNight: "",
        photos: [] as File[],
    });

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.photos.length === 0) return alert("Выберите фото!");

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("pricePerNight", formData.pricePerNight);
        // Добавляем все выбранные файлы
        formData.photos.forEach((photo) => {
            data.append("photos", photo);
        });

        try {
            await axios.post("http://localhost:8080/properties", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Недвижимость добавлена!");
            setFormData({ title: "", description: "", pricePerNight: "", photos: [] });
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
