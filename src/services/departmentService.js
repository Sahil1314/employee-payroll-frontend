import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/departments`;

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getAllDepartments = async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
};

export const addDepartment = async (department) => {
    const response = await axios.post(API_URL, department, getHeaders());
    return response.data;
};

export const updateDepartment = async (id, department) => {
    const response = await axios.put(`${API_URL}/${id}`, department, getHeaders());
    return response.data;
};

export const deleteDepartment = async (id) => {
    await axios.delete(`${API_URL}/${id}`, getHeaders());
};