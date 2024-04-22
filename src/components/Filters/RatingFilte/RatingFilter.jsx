import { getTrailsByRating } from "../../../requests";
import TileGroup from "../../TileGroup/TileGroup";
import "./RatingFilter.css";
import React, { useEffect, useState } from "react";

const RatingFilter = (props) => {
    const [selectedRating, setSelectedRating] = useState(null);
    const [trails, setTrails] = useState([]);
    const ratings = ["3", "3.5", "4", "4.5"];
    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    useEffect(() => {
        getTrailsByRating(selectedRating, props?.stateName).then((response) => {
            setTrails(response);
        });
    }, [selectedRating, props?.stateName]);

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
            trails={trails}
        />
    );
};

export default RatingFilter;
