import React, { useEffect } from "react";
import "./TileGroup.scss";
import TrailCard from "../TrailCard/TrailCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const trails = [
    {
        title: "Trail 1",
        location: "Location 1",
        imageUrl:
            "https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating: 4,
        tags: ["tag1", "tag2", "tag3"],
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum auctor dapibus. Suspendisse nisi est, tristique ut arcu ac, pulvinar tincidunt erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque id arcu tortor. Integer eget semper purus, et finibus metus. Mauris ac neque quam. Vivamus nisi tortor, gravida eleifend eros ac, mollis porta metus. Donec dictum metus in lacus rutrum, vel interdum tortor ullamcorper. Integer lobortis augue risus, vitae tempor erat varius et. Duis et rutrum risus, nec semper lectus. Etiam ac aliquam est. Nunc fringilla ex eget purus vulputate, nec sodales neque blandit. Integer commodo lectus lectus, sed eleifend est porttitor quis. Maecenas mattis tempus luctus. In vulputate, erat ut pharetra mattis, justo est hendrerit tortor, ac dignissim sem lacus a metus. Morbi sem mi, efficitur eget justo sit amet, commodo tristique ipsum.Phasellus rutrum nulla non tellus ullamcorper feugiat. Pellentesque quis justo vel enim efficitur dictum. Vivamus lorem mauris, viverra sit amet nisl at, convallis maximus magna. Donec vel consectetur ex, ut vulputate ante. Proin eu nibh egestas, hendrerit eros eu, laoreet libero. Vivamus vehicula bibendum dictum. Nulla euismod, enim non placerat viverra, est nisi viverra metus, vitae tincidunt felis est at.",
    },
    {
        title: "Trail 2",
        location: "Location 2",
        imageUrl:
            "https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating: 3,
        tags: ["tag1", "tag2", "tag3"],
        description: "Description 2",
    },
    {
        title: "Trail 3",
        location: "Location 3",
        imageUrl:
            "https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating: 5,
        tags: ["tag1", "tag2", "tag3"],
        description: "Description 3",
    },
    {
        title: "Trail 4",
        location: "Location 4",
        imageUrl:
            "https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating: 2,
        tags: ["tag1", "tag2", "tag3"],
        description: "Description 4",
    },
    {
        title: "Trail 5",
        location: "Location 5",
        imageUrl:
            "https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        rating: 4,
        tags: ["tag1", "tag2", "tag3"],
        description: "Description 5",
    },
];

const TileGroup = (props) => {
    const slideLeft = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft -= 325;
    };

    const slideRight = () => {
        const slider = document.getElementById("slider");
        slider.scrollLeft += 325;
    };

    const handleArrowVisibility = () => {
        const slider = document.getElementById("slider");
        const leftArrow = document.querySelector(".arrow-left");
        const rightArrow = document.querySelector(".arrow-right");
        if (
            slider.scrollLeft === 0 ||
            slider.scrollWidth <= slider.clientWidth
        ) {
            leftArrow.style.display = "none";
        } else {
            leftArrow.style.display = "block";
        }

        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
            rightArrow.style.display = "none";
        } else {
            rightArrow.style.display = "block";
        }
    };

    useEffect(() => {
        handleArrowVisibility();
        const slider = document.getElementById("slider");
        slider.addEventListener("scroll", handleArrowVisibility);
    }, []);

    return (
        <div className="tile-group">
            <p className="title">{props.title}</p>
            <MdChevronLeft
                className="arrow arrow-left"
                size={40}
                onClick={slideLeft}
            />
            <div
                id="slider"
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
                size={40}
                onClick={slideRight}
            />
        </div>
    );
};

export default TileGroup;
