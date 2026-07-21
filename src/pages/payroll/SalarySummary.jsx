import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const SalarySummary = ({ payrolls }) => {
    const totalPayrolls = payrolls.length;

    const totalBasicSalary = payrolls.reduce(
        (sum, payroll) => sum + Number(payroll.basicSalary || 0),
        0
    );

    const totalBonus = payrolls.reduce(
        (sum, payroll) => sum + Number(payroll.bonus || 0),
        0
    );

    const totalDeductions = payrolls.reduce(
        (sum, payroll) => sum + Number(payroll.deductions || 0),
        0
    );

    const totalNetSalary = payrolls.reduce(
        (sum, payroll) => sum + Number(payroll.netSalary || 0),
        0
    );

    return (
        <Row className="mb-4">
            <Col md={3}>
                <Card className="text-center shadow-sm">
                    <Card.Body>
                        <h6>Total Payrolls</h6>
                        <h3>{totalPayrolls}</h3>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={3}>
                <Card className="text-center shadow-sm">
                    <Card.Body>
                        <h6>Basic Salary</h6>
                        <h3>₹ {totalBasicSalary.toFixed(2)}</h3>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={3}>
                <Card className="text-center shadow-sm">
                    <Card.Body>
                        <h6>Total Bonus</h6>
                        <h3>₹ {totalBonus.toFixed(2)}</h3>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={3}>
                <Card className="text-center shadow-sm">
                    <Card.Body>
                        <h6>Net Salary</h6>
                        <h3>₹ {totalNetSalary.toFixed(2)}</h3>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={12} className="mt-3">
                <Card className="shadow-sm border-danger">
                    <Card.Body className="text-center">
                        <h5 className="text-danger">
                            Total Deductions : ₹ {totalDeductions.toFixed(2)}
                        </h5>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default SalarySummary;