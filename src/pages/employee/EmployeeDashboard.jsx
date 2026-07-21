import { Card, Row, Col } from "react-bootstrap";
import {
    FaUser,
    FaCalendarCheck,
    FaMoneyBillWave,
    FaFileInvoiceDollar
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {

    const username = localStorage.getItem("username") || "Employee";
    const navigate = useNavigate();

    const cards = [
        {
            title: "My Profile",
            text: "View and update your personal information.",
            icon: <FaUser size={32} color="#2563EB" />,
            path: "/my-profile"
        },
        {
            title: "My Leaves",
            text: "Apply leave and track leave requests.",
            icon: <FaCalendarCheck size={32} color="#16A34A" />,
            path: "/my-leaves"
        },
        {
            title: "My Payroll",
            text: "View salary and payroll information.",
            icon: <FaMoneyBillWave size={32} color="#F59E0B" />,
            path: "/my-payroll"
        },
        {
            title: "Download Payslip",
            text: "Download your latest monthly payslip.",
            icon: <FaFileInvoiceDollar size={32} color="#DC2626" />,
            path: "/payslip"
        }
    ];

    return (

        <div className="container-fluid">

            {/* Welcome */}

            <div className="mb-5">

                <h2 className="fw-bold">
                    Welcome, {username} 👋
                </h2>

                <p className="text-muted">
                    Access your profile, leave requests and payroll information.
                </p>

            </div>

            {/* Cards */}

            <Row className="g-4">

                {cards.map((card, index) => (

                    <Col
                        xl={3}
                        lg={6}
                        md={6}
                        sm={12}
                        key={index}
                    >

                        <Card
                            className="border-0 shadow-sm h-100"
                            style={{
                                cursor: "pointer",
                                borderRadius: "18px",
                                transition: ".3s"
                            }}
                            onClick={() => navigate(card.path)}
                            onMouseEnter={(e) => {

                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.boxShadow =
                                    "0 20px 40px rgba(0,0,0,.12)";

                            }}
                            onMouseLeave={(e) => {

                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                    "0 .125rem .25rem rgba(0,0,0,.075)";

                            }}
                        >

                            <Card.Body className="p-4">

                                <div className="mb-3">

                                    {card.icon}

                                </div>

                                <h5 className="fw-bold">

                                    {card.title}

                                </h5>

                                <p className="text-muted mb-0">

                                    {card.text}

                                </p>

                            </Card.Body>

                        </Card>

                    </Col>

                ))}

            </Row>

        </div>

    );

}

export default EmployeeDashboard;