import axios from "axios";

export const getTrailDetails = async (trail_id, state_name) => {
    try {
        const response = await axios({
            method: "GET",
            url: `http://34.221.171.212:8080/get-trail-details`,
            params: {
                state_name,
                trail_id,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getTrailsByDifficulty = async (
    state_name = "",
    difficulty_rating = 0
) => {
    try {
        const response = await axios({
            method: "GET",
            url: `http://34.221.171.212:8080/get-trails-by-difficulty-rating`,
            params: {
                state_name: state_name ? state_name.toLowerCase() : null,
                difficulty_rating,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getTrailsByLength = async (state_name = "", length = 0) => {
    try {
        const response = await axios({
            method: "GET",
            url: `http://34.221.171.212:8080/get-trails-by-length`,
            params: {
                state_name: state_name ? state_name.toLowerCase() : null,
                length,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getStateNameByLatitudAndLongitude = async (
    latitude,
    longitude
) => {
    try {
        const response = await axios({
            method: "GET",
            url: `https://nominatim.openstreetmap.org/reverse`,
            params: {
                lat: latitude,
                lon: longitude,
                format: "json",
            },
        });
        const stateName = response.features[0].properties.address.state;
        return stateName;
    } catch (error) {
        console.error("Error:", error);
    }
};
