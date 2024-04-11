import TileGroup from "../../TileGroup/TileGroup";
import "./RatingFilter.css";
import React, { useState } from "react";

const RatingFilter = () => {
    const [selectedRating, setSelectedRating] = useState(null);
    const ratings = ["3", "3.5", "4", "4.5"];
    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    const popoverContent = (
        <div className="rating-filter">
            {ratings.map((rating) => (
                <button
                    className={`rating-button ${
                        selectedRating === rating ? "selected" : ""
                    }`}
                    onClick={() => handleRatingChange(rating)}
                    key={rating}
                >
                    &gt;= {rating}
                </button>
            ))}
        </div>
    );

    return (
        <TileGroup
            title="Highly Rated Trails"
            className="tile"
            childNo={1}
            popoverContent={popoverContent}
        />
    );
};

export default RatingFilter;
