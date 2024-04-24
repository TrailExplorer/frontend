import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
// Other imports...
import TrailOverview from "./components/TrailOverviewPage/TrailOverviewPage"; // Assuming this component exists
import {
    getSearchResults,
    getStateNameByLatitudAndLongitude,
    getTrailsByDifficulty,
    getTrailsByLength,
    getTrailsByRating,
} from "./requests";

function App() {
    // Your application state and logic...
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
        <Router>
            <>
                <Navbar />
                <Routes>
                    {" "}
                    {/* Use Routes instead of Switch */}
                    <Route
                        path="/"
                        element={
                            <Home
                                showSearchResults={showSearchResults}
                                setShowSearchResults={setShowSearchResults}
                                maxLength={maxLength}
                                setMaxLength={setMaxLength}
                                lengthTrails={lengthTrails}
                                selectedDifficulty={selectedDifficulty}
                                setSelectedDifficulty={setSelectedDifficulty}
                                difficultTrails={difficultTrails}
                                selectedRating={selectedRating}
                                setSelectedRating={setSelectedRating}
                                ratingTrails={ratingTrails}
                                selectedState={selectedState}
                                setSelectedState={setSelectedState}
                                selectedTrailName={selectedTrailName}
                                setSelectedTrailName={setSelectedTrailName}
                                searchResults={searchResults}
                                handleSearch={handleSearch}
                            />
                        }
                    />
                    <Route
                        path="/:state_name/:id"
                        element={<TrailOverview />}
                    />
                    {/* Define other routes here */}
                </Routes>
            </>
        </Router>
    );
}

export default App;
