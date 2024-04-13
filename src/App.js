import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
// Other imports...
import TrailOverview from "./components/TrailOverviewPage/TrailOverviewPage"; // Assuming this component exists

function App() {
    // Your application state and logic...

    return (
        <Router>
            <>
                <Navbar />
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/" element={<Home />} />
                    <Route path="/:state_name/:id" element={<TrailOverview />} />
                    {/* Define other routes here */}
                </Routes>
            </>
        </Router>
    );
}

export default App;

