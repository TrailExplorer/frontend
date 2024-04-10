import React from "react";
import "../Home/Home.scss";
import "../Home/Home.css";
import TileGroup from "../TileGroup/TileGroup";

const subsections = [
    {
        title: "Recommended",
    },
    {
        title: "Top Rated Trails",
    },
    {
        title: "Lengthy Trails",
    },
    {
        title: "Difficult Trails",
    },
];

const Home = () => {
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
                        {subsections.map((subsection, index) => (
                            <TileGroup
                                title={subsection.title}
                                className="tile"
                                key={index}
                                childNo={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Home;
