import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const PayrollForm = ({
    employees,
    employeeId,
    setEmployeeId,
    basicSalary,
    setBasicSalary,
    bonus,
    setBonus,
    deductions,
    setDeductions,
    paymentDate,
    setPaymentDate,
    paymentStatus,
    setPaymentStatus,
    editingId,
    handleSavePayroll,
    clearForm
}) => {
    return (
        <Form onSubmit={handleSavePayroll} className="mb-4">
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Employee</Form.Label>
                        <Form.Select
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            required
                        >
                            <option value="">Select Employee</option>

                            {employees.map((employee) => (
                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Basic Salary</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Basic Salary"
                            value={basicSalary}
                            onChange={(e) =>
                                setBasicSalary(e.target.value)
                            }
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Bonus</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Bonus"
                            value={bonus}
                            onChange={(e) =>
                                setBonus(e.target.value)
                            }
                            required
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Deductions</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Deductions"
                            value={deductions}
                            onChange={(e) =>
                                setDeductions(e.target.value)
                            }
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Payment Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={paymentDate}
                            onChange={(e) =>
                                setPaymentDate(e.target.value)
                            }
                            required
                        />
                    </Form.Group>
                </Col>

                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Payment Status</Form.Label>
                        <Form.Select
                            value={paymentStatus}
                            onChange={(e) =>
                                setPaymentStatus(e.target.value)
                            }
                            required
                        >
                            <option value="">
                                Select Payment Status
                            </option>
                            <option value="PENDING">
                                PENDING
                            </option>
                            <option value="PAID">
                                PAID
                            </option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <div className="mt-3">
                <Button type="submit" variant="primary">
                    {editingId
                        ? "Update Payroll"
                        : "Generate Payroll"}
                </Button>

                <Button
                    variant="secondary"
                    className="ms-2"
                    onClick={clearForm}
                >
                    Clear
                </Button>
            </div>
        </Form>
    );
};

export default PayrollForm;