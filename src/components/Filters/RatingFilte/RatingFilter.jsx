import TileGroup from "../../TileGroup/TileGroup";
import "./RatingFilter.css";

const RatingFilter = (props) => {
    const ratings = ["3", "3.5", "4", "4.5"];

    const popoverContent = (
        <div className="rating-filter">
            {ratings.map((rating) => (
                <button
                    className={`rating-button ${
                        props.selectedRating === rating ? "selected" : ""
                    }`}
                    onClick={(e) => props.setSelectedRating(e.target.value)}
                    key={rating}
                >
                    &lt;= {rating}
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
            trails={props.trails}
        />
    );
};

export default RatingFilter;
