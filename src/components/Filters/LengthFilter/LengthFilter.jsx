import React, { useState } from "react";

import { TextField, Button } from "@mui/material";
import "./LengthFilter.css";

const LengthFilter = () => {
    const [minLength, setMinLength] = useState(0);

    const [maxLength, setMaxLength] = useState(10);

    const handleMinLengthChange = (e) => {
        setMinLength(Number(e.target.value));
    };

    const handleMaxLengthChange = (e) => {
        setMaxLength(Number(e.target.value));
    };

    const handleFilter = () => {};

    return (
        <form className="length-filter">
            <TextField
                type="number"
                id="minLength"
                label="Minimum Length (miles)"
                value={minLength}
                onChange={handleMinLengthChange}
            />

            <TextField
                type="number"
                id="maxLength"
                label="Maximum Length (miles)"
                value={maxLength}
                onChange={handleMaxLengthChange}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleFilter}
                type="submit"
            >
                Filter
            </Button>
        </form>
    );
};

export default LengthFilter;
