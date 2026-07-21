import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaBuilding
} from "react-icons/fa";

import "./login.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            const response = await login(username, password);

            localStorage.setItem("token", response.token);

            const decoded = jwtDecode(response.token);

            localStorage.setItem("username", decoded.sub);
            localStorage.setItem("role", decoded.role);

            if (decoded.role === "ROLE_ADMIN") {

                navigate("/dashboard");

            } else if (decoded.role === "ROLE_EMPLOYEE") {

                navigate("/employee-dashboard");

            } else {

                alert("Unknown Role");

            }

        } catch (error) {

            console.log(error);

            alert("Invalid Username or Password");

        }

    };

   return (
    <div className="login-page">

        <div className="login-left">

            <h1>🏢 HRMS</h1>

            <h2>Employee Leave & Payroll Management System</h2>

            <p>
                Manage Employees, Leave Requests and Payroll
                from one secure platform.
            </p>

            <div className="feature-list">

                <div>✔ Employee Management</div>
                <div>✔ Leave Management</div>
                <div>✔ Payroll Management</div>
                <div>✔ Secure Login</div>

            </div>

        </div>

        <div className="login-right">

            <div className="login-card">

                <h2>Welcome Back 👋</h2>

                <p className="subtitle">
                    Sign in to continue
                </p>

                <label>Username</label>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="login-btn"
                    onClick={handleLogin}
                >
                    Login
                </button>

                <div className="footer">

                    © 2026 HRMS

                    <br />

                    Designed & Developed by
                    <strong> Sahil Pisal</strong>

                </div>

            </div>

        </div>

    </div>
);

}

export default Login;