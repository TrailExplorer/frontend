import React, { useEffect, useState } from "react";

import { TextField } from "@mui/material";
import "./LengthFilter.css";
import TileGroup from "../../TileGroup/TileGroup";
import { getTrailsByLength } from "../../../requests";

const LengthFilter = (props) => {
    const [maxLength, setMaxLength] = useState(1);
    const [trails, setTrails] = useState([]);

    const handleMaxLengthChange = (e) => {
        setMaxLength(Number(e.target.value));
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            getTrailsByLength(props?.stateName, maxLength).then((response) => {
                setTrails(response);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [props?.stateName, maxLength]);

    const popoverContent = (
        <form className="length-filter">
            <TextField
                type="number"
                id="maxLength"
                label="Maximum Length (miles)"
                value={maxLength}
                onChange={handleMaxLengthChange}
            />
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
