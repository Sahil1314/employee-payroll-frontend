import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/employees`;

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getAllEmployees = async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
};

export const getEmployeeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getHeaders());
    return response.data;
};
export const getMyProfile = async () => {
    const response = await axios.get(
        `${API_URL}/profile`,
        getHeaders()
    );

    return response.data;
};

export const addEmployee = async (employee) => {
    const response = await axios.post(API_URL, employee, getHeaders());
    return response.data;
};

export const updateEmployee = async (id, employee) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        employee,
        getHeaders()
    );

    return response.data;
};

export const deleteEmployee = async (id) => {
    await axios.delete(`${API_URL}/${id}`, getHeaders());
};