import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    Navbar,
    Nav,
    Container,
    Button
} from "react-bootstrap";

function EmployeeLayout() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");
    };

    return (

        <div className="d-flex">

            <div
                className="bg-dark text-white p-3"
                style={{
                    width: "250px",
                    minHeight: "100vh"
                }}
            >

                <h3 className="text-center mb-4">
                    Employee
                </h3>

                <Nav className="flex-column">

                    <Nav.Link
                        as={Link}
                        to="/employee-dashboard"
                        className="text-white"
                    >
                        🏠 Dashboard
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to="/my-profile"
                        className="text-white"
                    >
                        👤 My Profile
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to="/my-leaves"
                        className="text-white"
                    >
                        📝 My Leaves
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to="/my-payroll"
                        className="text-white"
                    >
                        💰 My Payroll
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to="/payslip"
                        className="text-white"
                    >
                        📄 Download Payslip
                    </Nav.Link>

                </Nav>

                <Button
                    variant="danger"
                    className="mt-4 w-100"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </div>

            <div className="flex-grow-1">

                <Navbar bg="light" className="shadow-sm">
                    <Container>
                        <Navbar.Brand>
                            Employee Leave & Payroll System
                        </Navbar.Brand>
                    </Container>
                </Navbar>

                <Container className="mt-4">
                    <Outlet />
                </Container>

            </div>

        </div>

    );
}

export default EmployeeLayout;