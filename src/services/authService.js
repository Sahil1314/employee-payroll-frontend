import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });

        console.log("Success:", response.data);
        return response.data;

    } catch (error) {

        console.log("Axios Error:", error);

        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Response:", error.response.data);
        }

        throw error;
    }
};