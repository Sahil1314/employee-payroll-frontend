import React from "react";
import { Table, Button, Badge } from "react-bootstrap";

const PayrollTable = ({
    payrolls,
    handleEditPayroll,
    handleDeletePayroll
}) => {

    const getStatusBadge = (status) => {
        switch (status) {
            case "PAID":
                return <Badge bg="success">PAID</Badge>;
            case "PENDING":
                return <Badge bg="warning" text="dark">PENDING</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <Table striped bordered hover responsive className="mt-4">
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Basic Salary</th>
                    <th>Bonus</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                    <th width="180">Actions</th>
                </tr>
            </thead>

            <tbody>
                {payrolls.length === 0 ? (
                    <tr>
                        <td colSpan="9" className="text-center">
                            No Payroll Records Found
                        </td>
                    </tr>
                ) : (
                    payrolls.map((payroll) => (
                        <tr key={payroll.id}>
                            <td>{payroll.id}</td>

                            <td>{payroll.employeeName}</td>

                            <td>
                                ₹ {Number(payroll.basicSalary).toFixed(2)}
                            </td>

                            <td>
                                ₹ {Number(payroll.bonus).toFixed(2)}
                            </td>

                            <td>
                                ₹ {Number(payroll.deductions).toFixed(2)}
                            </td>

                            <td className="fw-bold text-success">
                                ₹ {Number(payroll.netSalary).toFixed(2)}
                            </td>

                            <td>{payroll.paymentDate}</td>

                            <td>
                                {getStatusBadge(payroll.paymentStatus)}
                            </td>

                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEditPayroll(payroll)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() =>
                                        handleDeletePayroll(payroll.id)
                                    }
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </Table>
    );
};

export default PayrollTable;