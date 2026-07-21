import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";
import MainLayout from "../../layouts/MainLayout";

import {
    FaUsers,
    FaBuilding,
    FaUserShield,
    FaCalendarAlt,
    FaHourglassHalf,
    FaCheckCircle,
    FaTimesCircle,
    FaMoneyCheckAlt,
    FaRupeeSign
} from "react-icons/fa";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const data = await getDashboardData();
            setDashboard(data);
        } catch (error) {
            console.log(error);
            alert("Unable to load dashboard");
        }
    };

    if (!dashboard) {
        return (
            <MainLayout>
                <div className="text-center mt-5">
                    <h3>Loading Dashboard...</h3>
                </div>
            </MainLayout>
        );
    }

    const cards = [
        {
            title: "Total Employees",
            value: dashboard.totalEmployees,
            icon: <FaUsers size={40} color="#4F46E5" />
        },
        {
            title: "Total Departments",
            value: dashboard.totalDepartments,
            icon: <FaBuilding size={40} color="#06B6D4" />
        },
        {
            title: "Total Users",
            value: dashboard.totalUsers,
            icon: <FaUserShield size={40} color="#22C55E" />
        },
        {
            title: "Total Leaves",
            value: dashboard.totalLeaves,
            icon: <FaCalendarAlt size={40} color="#F59E0B" />
        },
        {
            title: "Pending Leaves",
            value: dashboard.pendingLeaves,
            icon: <FaHourglassHalf size={40} color="#EAB308" />
        },
        {
            title: "Approved Leaves",
            value: dashboard.approvedLeaves,
            icon: <FaCheckCircle size={40} color="#22C55E" />
        },
        {
            title: "Rejected Leaves",
            value: dashboard.rejectedLeaves,
            icon: <FaTimesCircle size={40} color="#EF4444" />
        },
        {
            title: "Total Payrolls",
            value: dashboard.totalPayrolls,
            icon: <FaMoneyCheckAlt size={40} color="#6366F1" />
        },
        {
            title: "Total Salary Paid",
            value: `₹ ${dashboard.totalSalaryPaid}`,
            icon: <FaRupeeSign size={40} color="#16A34A" />
        }
    ];

    return (
        <MainLayout>

            <div className="container-fluid">

                <div className="mb-5">

                    <h2 className="fw-bold">
                        Employee Leave & Payroll Dashboard
                    </h2>

                    <p className="text-muted">
                        Welcome back! Here's an overview of your HRMS.
                    </p>

                </div>

                <div className="row">

                    {cards.map((card, index) => (

                        <div
                            className="col-xl-4 col-lg-4 col-md-6 mb-4"
                            key={index}
                        >

                            <div
                                className="card shadow-sm border-0 h-100"
                                style={{
                                    borderRadius: "18px"
                                }}
                            >

                                <div className="card-body">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <small
                                                className="text-muted"
                                                style={{
                                                    fontSize: "15px"
                                                }}
                                            >
                                                {card.title}
                                            </small>

                                            <h2
                                                className="fw-bold mt-3"
                                            >
                                                {card.value}
                                            </h2>

                                        </div>

                                        {card.icon}

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </MainLayout>
    );
}

export default Dashboard;