import React from "react";
import { useParams } from "react-router-dom";

// @ts-ignore
import Booking from "./Booking.tsx";

const BookingWrapper: React.FC = () => {
    const { propertyId } = useParams<{ propertyId: string }>();

    return propertyId ? (
        <Booking propertyId={parseInt(propertyId, 10)} />
    ) : (
        <div>Неверный идентификатор недвижимости</div>
    );
};

export default BookingWrapper;
