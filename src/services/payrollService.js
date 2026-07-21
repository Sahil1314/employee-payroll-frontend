import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/payroll`;

const getToken = () => {
    return localStorage.getItem("token");
};

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
});

export const getAllPayrolls = async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
};

export const addPayroll = async (payroll) => {
    const response = await axios.post(API_URL, payroll, getHeaders());
    return response.data;
};

export const updatePayroll = async (id, payroll) => {
    const response = await axios.put(
        `${API_URL}/${id}`,
        payroll,
        getHeaders()
    );
    return response.data;
};

export const deletePayroll = async (id) => {
    await axios.delete(`${API_URL}/${id}`, getHeaders());
};

export const getPayrollByEmployee = async (employeeId) => {
    const response = await axios.get(
        `${API_URL}/employee/${employeeId}`,
        getHeaders()
    );
    return response.data;
};
export const getMyPayroll = async () => {
    const response = await axios.get(
        `${API_URL}/my`,
        getHeaders()
    );
    return response.data;
};
export const downloadPayslip = async (payrollId) => {

    const response = await axios.get(

        `${API_URL}/payslip/${payrollId}`,

        {
            ...getHeaders(),
            responseType: "blob",
        }
    );

    return response.data;
};

export const getPayrollByStatus = async (status) => {
    const response = await axios.get(
        `${API_URL}/status/${status}`,
        getHeaders()
    );
    return response.data;
};