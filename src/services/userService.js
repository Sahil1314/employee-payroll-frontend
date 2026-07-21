import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

const getToken = () => {
    return localStorage.getItem("token");
};

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllUsers = async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
};

export const addUser = async (user) => {
    const response = await axios.post(API_URL, user, getHeaders());
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(`${API_URL}/${id}`, user, getHeaders());
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`, getHeaders());
};