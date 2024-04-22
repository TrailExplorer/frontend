import React, { useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./DifficultyFilter.css";
import TileGroup from "../../TileGroup/TileGroup";
import { getTrailsByDifficulty } from "../../../requests";

const DifficultyFilter = (props) => {
    const difficultyLevels = [1, 2, 3, 4, 5, 6, 7];
    const [selectedDifficulty, setSelectedDifficulty] = React.useState(7);
    const [trails, setTrails] = React.useState([]);

    useEffect(() => {
        getTrailsByDifficulty(props?.stateName, selectedDifficulty).then(
            (response) => {
                setTrails(response);
            }
        );
    }, [selectedDifficulty, props?.stateName]);

    const handleDifficultyChange = (e) => {
        setSelectedDifficulty(Number(e.target.value));
    };

    const popoverContent = (
        <div className="difficulty-filter">
            <FormControl>
                <InputLabel id="difficulty-label">Difficulty:</InputLabel>
                <Select
                    labelId="difficulty-label"
                    id="difficulty"
                    onChange={handleDifficultyChange}
                    value={selectedDifficulty}
                >
                    {difficultyLevels.map((level) => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );

    return (
        <TileGroup
            title="Difficult Trails"
            className="tile"
            childNo={3}
            popoverContent={popoverContent}
            trails={trails}
        />
    );
};

export default DifficultyFilter;
