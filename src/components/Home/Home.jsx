import React, { useEffect, useState } from "react";
import "../Home/Home.scss";
import "../Home/Home.css";
import RatingFilter from "../Filters/RatingFilte/RatingFilter";
import LengthFilter from "../Filters/LengthFilter/LengthFilter";
import DifficultyFilter from "../Filters/DifficultyFilter/DifficultyFilter";
import { getStateNameByLatitudAndLongitude } from "../../requests";
import Search from "../Search/Search";
import states from "./USStates.json";
import {
    getTrailsByLength,
    getTrailsByDifficulty,
    getTrailsByRating,
    getSearchResults,
} from "../../requests";

const Home = () => {
    const [stateName, setStateName] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [maxLength, setMaxLength] = useState(1);
    const [lengthTrails, setLengthTrails] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState(7);
    const [difficultTrails, setDifficultTrails] = useState([]);
    const [selectedRating, setSelectedRating] = useState(null);
    const [ratingTrails, setRatingTrails] = useState([]);
    const [selectedState, setSelectedState] = useState("alabama");
    const [selectedTrailName, setSelectedTrailName] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            getTrailsByLength(stateName, maxLength).then((response) => {
                setLengthTrails(response);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [stateName, maxLength]);

    useEffect(() => {
        getTrailsByDifficulty(stateName, selectedDifficulty).then(
            (response) => {
                setDifficultTrails(response);
            }
        );
    }, [selectedDifficulty, stateName]);

    useEffect(() => {
        getTrailsByRating(selectedRating, stateName).then((response) => {
            setRatingTrails(response);
        });
    }, [selectedRating, stateName]);

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

    const handleSearch = (e) => {
        e.preventDefault();
        setShowSearchResults(true);
        getSearchResults(selectedState, selectedTrailName).then((response) => {
            setSearchResults(response);
        });
    };

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
                    <form className="homeCard grid">
                        <div className="inputgroup">
                            <div className="locationDiv">
                                <label htmlFor="statename">State Name</label>
                                <select
                                    name="stateName"
                                    required={true}
                                    value={selectedState}
                                    onChange={(e) => {
                                        setSelectedState(e.target.value);
                                    }}
                                >
                                    {states.map((state) => {
                                        return (
                                            <option
                                                key={state}
                                                value={state.toLowerCase()}
                                            >
                                                {state}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div
                                className="trailLengthDiv"
                                value={selectedTrailName}
                                onChange={(e) => {
                                    setSelectedTrailName(e.target.value);
                                }}
                            >
                                <label htmlFor="trailName">Trail Name</label>
                                <input
                                    type="text"
                                    name="trailName"
                                    placeholder="Enter Trail Name"
                                />
                            </div>
                        </div>

                        <button
                            className="btn"
                            type="submit"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </form>

                    <div className="tileGroups grid">
                        {showSearchResults && (
                            <Search
                                title="Search Results"
                                setShowSearchResults={setShowSearchResults}
                                trails={searchResults}
                            />
                        )}
                        {!showSearchResults && (
                            <>
                                <LengthFilter
                                    setMaxLength={setMaxLength}
                                    trails={lengthTrails}
                                    maxLength={maxLength}
                                />
                                <DifficultyFilter
                                    selectedDifficulty={selectedDifficulty}
                                    setSelectedDifficulty={
                                        setSelectedDifficulty
                                    }
                                    trails={difficultTrails}
                                />
                                <RatingFilter
                                    selectedRating={selectedRating}
                                    setSelectedRating={setSelectedRating}
                                    trails={ratingTrails}
                                />
                            </>
                        )}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Home;
