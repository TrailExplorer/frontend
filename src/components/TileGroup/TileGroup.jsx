import React, { useEffect, useState } from "react";
import "./TileGroup.scss";
import TrailCard from "../TrailCard/TrailCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FcFilledFilter } from "react-icons/fc";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import RatingFilter from "../Filters/RatingFilte/RatingFilter";
import LengthFilter from "../Filters/LengthFilter/LengthFilter";
import DifficultyFilter from "../Filters/DifficultyFilter/DifficultyFilter";
import { getTrailDetails } from "../../requests";

const TileGroup = (props) => {
    const slideLeft = () => {
        const slider = document.getElementById(`slider${props.childNo}`);
        slider.scrollLeft -= 325;
    };

    const slideRight = () => {
        const slider = document.getElementById(`slider${props.childNo}`);
        slider.scrollLeft += 325;
    };

    const [trails, setTrails] = useState([]);

    const handleArrowVisibility = () => {
        const slider = document.getElementById(`slider${props.childNo}`);
        const leftArrow = document.getElementById(`arrow-left${props.childNo}`);
        const rightArrow = document.getElementById(
            `arrow-right${props.childNo}`
        );
        if (
            slider.scrollLeft === 0 ||
            slider.scrollWidth <= slider.clientWidth
        ) {
            leftArrow.style.display = "none";
        } else {
            leftArrow.style.display = "block";
        }

        if (
            slider.scrollWidth <= slider.clientWidth ||
            slider.scrollLeft + slider.clientWidth >= slider.scrollWidth
        ) {
            rightArrow.style.display = "none";
        } else {
            rightArrow.style.display = "block";
        }
    };

    useEffect(() => {
        handleArrowVisibility();
        const slider = document.getElementById(`slider${props.childNo}`);
        slider.addEventListener("scroll", handleArrowVisibility);
    });

    useEffect(() => {
        getTrailDetails(10000147, "ohio").then((response) => {
            setTrails([response, response, response, response]);
        });
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const getFilterContent = () => {
        if (props.title === "Top Rated Trails")
            return <RatingFilter ratings={[1, 2, 3, 4, 5]} />;
        else if (props.title === "Lengthy Trails") return <LengthFilter />;
        else if (props.title === "Difficult Trails")
            return <DifficultyFilter />;
        return (
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        );
    };

    return (
        <div className="tile-group">
            <div className="title-container">
                <span className="title">
                    {props.title} &nbsp; &nbsp;
                    <FcFilledFilter
                        className="filter-icon"
                        display={
                            props.title !== "Recommended" ? "block" : "none"
                        }
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
                        {getFilterContent()}
                    </Popover>
                </span>
            </div>
            <div className="tile-group-parent">
                <MdChevronLeft
                    className="arrow arrow-left"
                    id={`arrow-left${props.childNo}`}
                    size={40}
                    onClick={slideLeft}
                />
                <div
                    id={"slider" + props.childNo}
                    className="tile-group-container disable-scrollbars"
                >
                    {trails.map((trail, index) => {
                        return (
                            <div className="trail-card-parent" key={index}>
                                <TrailCard trail={trail} />
                            </div>
                        );
                    })}
                </div>
                <MdChevronRight
                    className="arrow arrow-right"
                    id={`arrow-right${props.childNo}`}
                    size={40}
                    onClick={slideRight}
                />
            </div>
        </div>
    );
};

export default TileGroup;
