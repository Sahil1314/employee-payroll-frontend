import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import LeaveForm from "./LeaveForm";
import LeaveTable from "./LeaveTable";

import {
    getAllLeaves,
    addLeave,
    updateLeave,
    deleteLeave,
    updateLeaveStatus,
} from "../../services/leaveService";

import { getAllEmployees } from "../../services/employeeService";

function Leave() {

    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [employeeId, setEmployeeId] = useState("");
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        loadLeaves();
        loadEmployees();
    }, []);

    const loadLeaves = async () => {
        try {
            const data = await getAllLeaves();
            setLeaves(data);
        } catch (error) {
            console.log(error);
            alert("Unable to load leave records");
        }
    };

    const loadEmployees = async () => {
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (error) {
            console.log(error);
        }
    };

    const clearForm = () => {
        setEditingId(null);
        setEmployeeId("");
        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setReason("");
    };

    const handleSaveLeave = async () => {

        const leave = {
            employeeId,
            leaveType,
            startDate,
            endDate,
            reason,
        };

        try {

            if (editingId) {

                await updateLeave(editingId, leave);
                alert("Leave Updated Successfully");

            } else {

                await addLeave(leave);
                alert("Leave Applied Successfully");

            }

            clearForm();
            loadLeaves();

        }catch (error) {

    console.log(error);

    if (error.response) {

        console.log(error.response.data);
        alert(JSON.stringify(error.response.data));

    } else {

        alert(error.message);

    }

}

    };

    const handleEditLeave = (leave) => {

        setEditingId(leave.id);
        setEmployeeId(leave.employeeId);
        setLeaveType(leave.leaveType);
        setStartDate(leave.startDate);
        setEndDate(leave.endDate);
        setReason(leave.reason);

    };

    const handleDeleteLeave = async (id) => {

        if (!window.confirm("Delete this leave record?")) return;

        try {

            await deleteLeave(id);

            alert("Leave Deleted Successfully");

            loadLeaves();

        } catch (error) {

            console.log(error);

            alert("Unable to delete leave");

        }

    };

    const handleStatusUpdate = async (id, status) => {

        try {

            await updateLeaveStatus(id, status);

            loadLeaves();

        } catch (error) {

            console.log(error);

            alert("Unable to update leave status");

        }

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Leave Management
                </h2>

                <LeaveForm
                    employees={employees}
                    editingId={editingId}
                    employeeId={employeeId}
                    setEmployeeId={setEmployeeId}
                    leaveType={leaveType}
                    setLeaveType={setLeaveType}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    reason={reason}
                    setReason={setReason}
                    handleSaveLeave={handleSaveLeave}
                    clearForm={clearForm}
                />

                <LeaveTable
                    leaves={leaves}
                    handleEditLeave={handleEditLeave}
                    handleDeleteLeave={handleDeleteLeave}
                    handleStatusUpdate={handleStatusUpdate}
                />

            </div>

        </MainLayout>

    );

}

export default Leave;