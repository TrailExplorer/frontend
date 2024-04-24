import "./Search.css";
import TrailCard from "../TrailCard/TrailCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { FcFilledFilter } from "react-icons/fc";
import { MenuItem, Popover, Select, TextField } from "@mui/material";

function Search(props) {
    const difficultyLevels = [1, 2, 3, 4, 5, 6, 7];
    const ratings = ["3", "3.5", "4", "4.5", "5"];

    const [page, setPage] = useState(1);
    const [selectedDifficulty, setSelectedDifficulty] = useState(7);
    const [anchorEl, setAnchorEl] = useState(null);
    const [maxLength, setMaxLength] = useState(5);
    const [maxElevationGain, setMaxElevationGain] = useState(2000);
    const [selectedRating, setSelectedRating] = useState("5");

    const filteredTrails = props.trails.filter((trail) => {
        return (
            Number(trail.difficulty_rating) <= Number(selectedDifficulty) &&
            Number(trail.length) <= Number(maxLength) * 1609.34 &&
            Number(trail.elevation_gain) <= Number(maxElevationGain) &&
            Number(trail.avg_rating) <= Number(selectedRating)
        );
    });

    const getTrailCards = function () {
        const trailCards = [];
        for (
            let i = (page - 1) * 15;
            i < Math.min(page * 15, filteredTrails.length);
            i++
        ) {
            trailCards.push(
                <TrailCard
                    trail={filteredTrails[i]}
                    key={filteredTrails[i].id}
                />
            );
        }
        return trailCards;
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const popOver = function () {
        return (
            <div
                style={{
                    width: "300px",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignContent: "center",
                    gap: "1rem",
                    padding: "1rem",
                }}
            >
                <h3 style={{ textAlign: "center" }}>Filters</h3>
                <label htmlFor="difficulty">Difficulty Level:</label>
                <Select
                    labelId="difficulty-label"
                    id="difficulty"
                    onChange={(e) => {
                        setSelectedDifficulty(e.target.value);
                    }}
                    value={selectedDifficulty}
                >
                    {difficultyLevels.map((level) => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </Select>

                <label htmlFor="maxLength">Trail Length:</label>
                <TextField
                    type="number"
                    id="maxLength"
                    label="Maximum Length (miles)"
                    value={maxLength}
                    onChange={(e) => {
                        setMaxLength(Number(e.target.value));
                    }}
                />

                <label htmlFor="elevationGain">Elevation Gain:</label>
                <TextField
                    type="number"
                    id="elevationGain"
                    label="Elevation Gain (feet)"
                    value={maxElevationGain}
                    onChange={(e) => {
                        setMaxElevationGain(Number(e.target.value));
                    }}
                />

                <label htmlFor="ratings">Max Rating:</label>
                <Select
                    labelId="ratings-label"
                    id="ratings"
                    onChange={(e) => {
                        setSelectedRating(e.target.value);
                    }}
                    value={selectedRating}
                >
                    {ratings.map((level) => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        );
    };

    return (
        <div>
            <div className="paginationGroup">
                <div className="titleGroup">
                    <button
                        className="back-button"
                        onClick={() => {
                            props.setShowSearchResults(false);
                        }}
                    >
                        <ArrowBackIcon fontSize="small" />
                    </button>
                    <span className="title">{props.title} &nbsp; &nbsp;</span>
                    <FcFilledFilter
                        className="filter-icon"
                        onClick={handleClick}
                    />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        {popOver()}
                    </Popover>
                </div>
                {filteredTrails?.length ? (
                    <Pagination
                        count={Math.ceil(filteredTrails.length / 15)}
                        color="primary"
                        onChange={(e, value) => {
                            setPage(value);
                        }}
                    />
                ) : (
                    <></>
                )}
            </div>

            <br />
            <div className="grid-container">
                {props?.trails?.length === 0 ? (
                    <div className="empty-trails">
                        <h1>No Matching Trails!</h1>
                    </div>
                ) : (
                    getTrailCards()
                )}
            </div>
        </div>
    );
}

export default Search;
