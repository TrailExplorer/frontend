import React, { useEffect } from "react";
import "../Home/Home.scss";
import "../Home/Home.css";
import RatingFilter from "../Filters/RatingFilte/RatingFilter";
import LengthFilter from "../Filters/LengthFilter/LengthFilter";
import DifficultyFilter from "../Filters/DifficultyFilter/DifficultyFilter";
import Search from "../Search/Search";
import states from "./USStates.json";
import { Link } from "react-router-dom";

const Home = (props) => {
    const {
        showSearchResults,
        setShowSearchResults,
        maxLength,
        setMaxLength,
        lengthTrails,
        selectedDifficulty,
        setSelectedDifficulty,
        difficultTrails,
        selectedRating,
        setSelectedRating,
        ratingTrails,
        selectedState,
        setSelectedState,
        selectedTrailName,
        setSelectedTrailName,
        searchResults,
        handleSearch,
    } = props;

    const [randomTrail, setRandomTrail] = React.useState(null);
    useEffect(() => {
        setRandomTrail(
            ratingTrails[Math.floor(Math.random() * ratingTrails.length)]
        );
    }, [ratingTrails]);

    const getRandomTrail = () => {
        if (!randomTrail) return "/";
        return `/${randomTrail.state_name.toLowerCase()}/${
            randomTrail.trail_id
        }`;
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
                            <Link to={getRandomTrail()}>Explore</Link>
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
