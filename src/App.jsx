import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Department from "./pages/department/Department";
import Employee from "./pages/employee/Employee";
import User from "./pages/user/User";
import Leave from "./pages/leave/Leave";
import Payroll from "./pages/payroll/Payroll";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import MyProfile from "./pages/employee/MyProfile";
import MyLeaves from "./pages/employee/MyLeaves";
import MyPayroll from "./pages/employee/MyPayroll";
import Payslip from "./pages/employee/Payslip";
function App() {
    return (
        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

           <Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/departments"
    element={
        <ProtectedRoute>
            <Department />
        </ProtectedRoute>
    }
/>
<Route
    path="/employees"
    element={
        <ProtectedRoute>
            <Employee />
        </ProtectedRoute>
    }
/>
<Route
    path="/users"
    element={
        <ProtectedRoute>
            <User />
        </ProtectedRoute>
    }
/>
<Route
    path="/leaves"
    element={
        <ProtectedRoute>
            <Leave />
        </ProtectedRoute>
    }
/>
<Route
    path="/payroll"
    element={
        <ProtectedRoute>
            <Payroll />
        </ProtectedRoute>
    }
/>
<Route
    element={
        <ProtectedRoute>
            <EmployeeLayout />
        </ProtectedRoute>
    }
>
    <Route
        path="/employee-dashboard"
        element={<EmployeeDashboard />}
    />

    <Route
        path="/my-profile"
        element={<MyProfile />}
    />

    <Route
        path="/my-leaves"
        element={<MyLeaves />}
    />

    <Route
        path="/my-payroll"
        element={<MyPayroll />}
    />

    <Route
        path="/payslip"
        element={<Payslip />}
    />
</Route>
        </Routes>
    );
}

export default App;