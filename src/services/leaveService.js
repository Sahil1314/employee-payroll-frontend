import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/leaves`;

const getToken = () => {
    return localStorage.getItem("token");
};

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllLeaves = async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
};

export const addLeave = async (leave) => {
    const response = await axios.post(API_URL, leave, getHeaders());
    return response.data;
};
export const applyLeave = async (leaveData) => {
    const response = await axios.post(
        `${API_URL}/apply`,
        leaveData,
        getHeaders()
    );
    return response.data;
};
export const getMyLeaves = async () => {
    const response = await axios.get(
        `${API_URL}/my`,
        getHeaders()
    );
    return response.data;
};

export const updateLeave = async (id, leave) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        leave,
        getHeaders()
    );
    return response.data;
};

export const deleteLeave = async (id) => {
    await axios.delete(`${API_URL}/${id}`, getHeaders());
};

export const updateLeaveStatus = async (id, status) => {
    const response = await axios.patch(
        `${API_URL}/${id}/status?status=${status}`,
        {},
        getHeaders()
    );
    return response.data;
};

export const getLeavesByEmployee = async (employeeId) => {
    const response = await axios.get(
        `${API_URL}/employee/${employeeId}`,
        getHeaders()
    );
    return response.data;
};

export const getLeavesByStatus = async (status) => {
    const response = await axios.get(
        `${API_URL}/status/${status}`,
        getHeaders()
    );
    return response.data;
};