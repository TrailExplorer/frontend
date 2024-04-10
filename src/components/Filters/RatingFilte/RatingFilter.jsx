import "./RatingFilter.css";
import React, { useState } from "react";

const RatingFilter = () => {
    const [selectedRating, setSelectedRating] = useState(null);
    const ratings = ["3", "3.5", "4", "4.5"];
    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    return (
        <div className="rating-filter">
            {ratings.map((rating) => (
                <button
                    className={`rating-button ${
                        selectedRating === rating ? "selected" : ""
                    }`}
                    onClick={() => handleRatingChange(rating)}
                >
                    &gt;= {rating}
                </button>
            ))}
        </div>
    );
};

export default RatingFilter;
