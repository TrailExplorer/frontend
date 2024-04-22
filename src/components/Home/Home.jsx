import React, { useEffect, useState } from "react";
import "../Home/Home.scss";
import "../Home/Home.css";
import Recommendations from "../Filters/Recommendations/Recommendations";
import RatingFilter from "../Filters/RatingFilte/RatingFilter";
import LengthFilter from "../Filters/LengthFilter/LengthFilter";
import DifficultyFilter from "../Filters/DifficultyFilter/DifficultyFilter";
import { getStateNameByLatitudAndLongitude } from "../../requests";

const Home = () => {
    const [stateName, setStateName] = useState("");
    useEffect(() => {
        const getStateName = async () => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const stateName = await getStateNameByLatitudAndLongitude(
                    latitude,
                    longitude
                );

                setStateName(stateName);
            });
        };
        getStateName();
    }, []);

    return (
        <React.Fragment>
            <section className="home">
                <div className="seccontainer container">
                    <div className="homeText">
                        <h1 className="title">Find Your Next Adventure</h1>
                        <p className="subTitle">
                            Explore the best trails in the world
                        </p>
                        <button className="btn">
                            <a href="#home">Explore</a>
                        </button>
                    </div>
                    <div className="homeCard grid">
                        <div className="inputgroup">
                            <div className="locationDiv">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    placeholder="Enter Location"
                                />
                            </div>

                            <div className="trailLengthDiv">
                                <label htmlFor="trailLength">
                                    Trail Length
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Trail Length"
                                />
                            </div>
                        </div>

                        <button className="btn">Search</button>
                    </div>

                    <div className="tileGroups grid">
                        <Recommendations stateName={stateName} />
                        <RatingFilter stateName={stateName} />
                        <LengthFilter stateName={stateName} />
                        <DifficultyFilter stateName={stateName} />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Home;
