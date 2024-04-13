import axios from "axios";

export const getTrailDetails = async (trail_id, state_name) => {
    try {
        const response = await axios({
            method: "GET",
            url: `http://127.0.0.1:8081/get-trail-details`,
            params: {
                state_name,
                trail_id,
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
