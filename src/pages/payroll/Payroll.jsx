import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import MainLayout from "../../layouts/MainLayout";

import PayrollForm from "./PayrollForm";
import PayrollTable from "./PayrollTable";
import SalarySummary from "./SalarySummary";

import {
    getAllPayrolls,
    addPayroll,
    updatePayroll,
    deletePayroll
} from "../../services/payrollService";

import { getAllEmployees } from "../../services/employeeService";

const Payroll = () => {

    const [employees, setEmployees] = useState([]);
    const [payrolls, setPayrolls] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [employeeId, setEmployeeId] = useState("");
    const [basicSalary, setBasicSalary] = useState("");
    const [bonus, setBonus] = useState("");
    const [deductions, setDeductions] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");

    useEffect(() => {
        loadEmployees();
        loadPayrolls();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadPayrolls = async () => {
        try {
            const data = await getAllPayrolls();
            setPayrolls(data);
        } catch (error) {
            console.error(error);
        }
    };

    const clearForm = () => {
        setEditingId(null);
        setEmployeeId("");
        setBasicSalary("");
        setBonus("");
        setDeductions("");
        setPaymentDate("");
        setPaymentStatus("");
    };

    const handleSavePayroll = async (e) => {

        e.preventDefault();

        const payroll = {
            employeeId: Number(employeeId),
            basicSalary,
            bonus,
            deductions,
            paymentDate,
            paymentStatus
        };

        try {

            if (editingId) {
                await updatePayroll(editingId, payroll);
                alert("Payroll Updated Successfully");
            } else {
                await addPayroll(payroll);
                alert("Payroll Generated Successfully");
            }

            clearForm();
            loadPayrolls();

        } catch (error) {

            console.log(error);

            if (error.response) {
                console.log(error.response.data);
                alert(JSON.stringify(error.response.data));
            } else {
                alert(error.message);
            }
        }
    };

    const handleEditPayroll = (payroll) => {

        setEditingId(payroll.id);

        setEmployeeId(payroll.employeeId);
        setBasicSalary(payroll.basicSalary);
        setBonus(payroll.bonus);
        setDeductions(payroll.deductions);
        setPaymentDate(payroll.paymentDate);
        setPaymentStatus(payroll.paymentStatus);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleDeletePayroll = async (id) => {

        if (!window.confirm("Delete this payroll?")) {
            return;
        }

        try {

            await deletePayroll(id);

            alert("Payroll Deleted Successfully");

            loadPayrolls();

        } catch (error) {

            console.error(error);

            alert("Failed to delete payroll.");
        }
    };

    return (
        <MainLayout>

            <Container className="mt-4">

                <h2 className="mb-4">
                    Payroll Management
                </h2>

                <SalarySummary payrolls={payrolls} />

                <Card className="shadow-sm p-4 mb-4">

                    <PayrollForm

                        employees={employees}

                        employeeId={employeeId}
                        setEmployeeId={setEmployeeId}

                        basicSalary={basicSalary}
                        setBasicSalary={setBasicSalary}

                        bonus={bonus}
                        setBonus={setBonus}

                        deductions={deductions}
                        setDeductions={setDeductions}

                        paymentDate={paymentDate}
                        setPaymentDate={setPaymentDate}

                        paymentStatus={paymentStatus}
                        setPaymentStatus={setPaymentStatus}

                        editingId={editingId}

                        handleSavePayroll={handleSavePayroll}

                        clearForm={clearForm}
                    />

                </Card>

                <Card className="shadow-sm p-4">

                    <PayrollTable
                        payrolls={payrolls}
                        handleEditPayroll={handleEditPayroll}
                        handleDeletePayroll={handleDeletePayroll}
                    />

                </Card>

            </Container>

        </MainLayout>
    );
};

export default Payroll;