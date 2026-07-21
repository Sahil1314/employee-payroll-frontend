import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBuilding, FaUsers, FaUserShield, FaCalendarAlt, FaMoneyCheckAlt, FaSignOutAlt } from "react-icons/fa";

function MainLayout({ children }) {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const menu = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaTachometerAlt />
        },
        {
            name: "Departments",
            path: "/departments",
            icon: <FaBuilding />
        },
        {
            name: "Employees",
            path: "/employees",
            icon: <FaUsers />
        },
        {
            name: "Users",
            path: "/users",
            icon: <FaUserShield />
        },
        {
            name: "Leaves",
            path: "/leaves",
            icon: <FaCalendarAlt />
        },
        {
            name: "Payroll",
            path: "/payroll",
            icon: <FaMoneyCheckAlt />
        }
    ];

  return (

    <div
        style={{
            display: "flex",
            minHeight: "100vh",
            background: "#F8FAFC"
        }}
    >

        {/* Sidebar */}

        <div
            style={{
                width: "260px",
                background: "#1E293B",
                color: "white",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0
            }}
        >

            <div className="text-center py-4">

                <h3 style={{ fontWeight: "700" }}>
                    HRMS
                </h3>

                <small className="text-secondary">
                    Employee Management
                </small>

            </div>

            <hr className="text-secondary" />

            <div className="px-3">

                {menu.map((item) => (

                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "12px 15px",
                            marginBottom: "10px",
                            borderRadius: "12px",
                            textDecoration: "none",
                            color: "white",
                            background:
                                location.pathname === item.path
                                    ? "#4F46E5"
                                    : "transparent"
                        }}
                    >

                        {item.icon}

                        {item.name}

                    </Link>

                ))}

            </div>

            <div className="mt-auto p-3">

                <button
                    className="btn btn-danger w-100"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt className="me-2" />

                    Logout

                </button>

            </div>

        </div>

        {/* Content */}

        <div
            style={{
                marginLeft: "260px",
                flex: 1,
                minHeight: "100vh",
                background: "#F8FAFC",
                padding: "30px",
                overflowX: "auto"
            }}
        >

            {children}

        </div>

    </div>

);

}

export default MainLayout;