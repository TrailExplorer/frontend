import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./DifficultyFilter.css";

const DifficultyFilter = () => {
    const difficultyLevels = [1, 2, 3, 4, 5, 6, 7];
    const handleDifficultyChange = (e) => {};

    return (
        <div className="difficulty-filter">
            <FormControl>
                <InputLabel id="difficulty-label">Difficulty:</InputLabel>
                <Select
                    labelId="difficulty-label"
                    id="difficulty"
                    onChange={handleDifficultyChange}
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
};

export default DifficultyFilter;
