import axios from "axios";

const API_URL = "http://34.221.171.212:8080/";

const backendRequest = async (url, method, params) => {
    try {
        const response = await axios({
            method,
            url: API_URL + url,
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getTrailDetails = async (trail_id, state_name) => {
    return await backendRequest("get-trail-details", "GET", {
        trail_id,
        state_name: state_name ? state_name.toLowerCase() : null,
    });
};

export const getTrailsByDifficulty = async (
    state_name = "",
    difficulty_rating = 0
) => {
    return await backendRequest("get-trails-by-difficulty-rating", "GET", {
        state_name: state_name ? state_name.toLowerCase() : null,
        difficulty_rating,
    });
};

export const getTrailsByLength = async (state_name = "", length = 0) => {
    let milesToMetres = length * 1609.34;
    return await backendRequest("get-trails-by-length", "GET", {
        state_name: state_name ? state_name.toLowerCase() : null,
        length: milesToMetres,
    });
};

export const getTrailsByRating = async (rating = 0, state_name = "") => {
    return await backendRequest("get-trails-by-rating", "GET", {
        rating,
        state_name: state_name ? state_name.toLowerCase() : null,
    });
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
        const stateName = response.data.address.state;
        return stateName;
    } catch (error) {
        console.error("Error:", error);
    }
};