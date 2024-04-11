import React, { useCallback, useEffect, useState } from "react";

import { TextField, Button } from "@mui/material";
import "./LengthFilter.css";
import TileGroup from "../../TileGroup/TileGroup";
import { getTrailsByLength } from "../../../requests";

const LengthFilter = (props) => {
    const [maxLength, setMaxLength] = useState(1000);
    const [trails, setTrails] = useState([]);

    const handleMaxLengthChange = (e) => {
        setMaxLength(Number(e.target.value));
    };

    const requestTrailsFromLength = useCallback(async () => {
        getTrailsByLength(props?.stateName, maxLength).then((response) => {
            setTrails(response);
        });
    }, [maxLength, props?.stateName]);

    useEffect(() => {
        requestTrailsFromLength();
    }, [requestTrailsFromLength]);

    const handleFilter = (e) => {
        e.preventDefault();
        requestTrailsFromLength();
    };

    const popoverContent = (
        <form className="length-filter">
            <TextField
                type="number"
                id="maxLength"
                label="Maximum Length (miles)"
                value={maxLength === 0 ? "" : maxLength}
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

    return (
        <TileGroup
            title="Lengthy Trails"
            className="tile"
            childNo={2}
            popoverContent={popoverContent}
            trails={trails}
        />
    );
};

export default LengthFilter;
