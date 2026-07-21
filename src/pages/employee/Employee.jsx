import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "../../services/employeeService";

import { getAllDepartments } from "../../services/departmentService";
import { getAllUsers } from "../../services/userService";

import {
    FaUserPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaUsers,
    FaMoneyBillWave,
    FaBriefcase,
    FaEnvelope,
    FaPhone,
    FaBuilding
} from "react-icons/fa";

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [salary, setSalary] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [userId, setUserId] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {
        loadEmployees();
        loadDepartments();
        loadUsers();
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (error) {
            console.log(error);
            alert("Unable to load employees");
        }
    };

    const loadDepartments = async () => {
        try {
            const data = await getAllDepartments();
            setDepartments(data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();

            setUsers(
                data.filter(
                    (user) => user.role === "EMPLOYEE"
                )
            );

        } catch (error) {
            console.log(error);
        }
    };

    const clearForm = () => {

        setEditingId(null);

        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setDesignation("");
        setSalary("");
        setDepartmentId("");
        setUserId("");

    };

    const handleSaveEmployee = async () => {

        const employee = {

            firstName,
            lastName,
            email,
            phoneNumber,
            designation,
            salary,
            departmentId,
            userId

        };

        try {

            if (editingId) {

                await updateEmployee(
                    editingId,
                    employee
                );

                alert("Employee Updated Successfully");

            } else {

                await addEmployee(employee);

                alert("Employee Added Successfully");

            }

            clearForm();

            loadEmployees();

        } catch (error) {

            console.log(error);

            alert("Operation Failed");

        }

    };

    const handleEditEmployee = (employee) => {

        setEditingId(employee.id);

        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmail(employee.email);
        setPhoneNumber(employee.phoneNumber);
        setDesignation(employee.designation);
        setSalary(employee.salary);
        setDepartmentId(employee.departmentId);
        setUserId(employee.userId);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const handleDeleteEmployee = async (id) => {

        if (!window.confirm("Delete this employee?"))
            return;

        try {

            await deleteEmployee(id);

            alert("Employee Deleted Successfully");

            loadEmployees();

        } catch (error) {

            console.log(error);

            alert("Unable to Delete Employee");

        }

    };

    const filteredEmployees = useMemo(() => {

        return employees.filter((employee) => {

            const keyword = search.toLowerCase();

            return (

                employee.firstName?.toLowerCase().includes(keyword) ||

                employee.lastName?.toLowerCase().includes(keyword) ||

                employee.email?.toLowerCase().includes(keyword) ||

                employee.departmentName
                    ?.toLowerCase()
                    .includes(keyword) ||

                employee.designation
                    ?.toLowerCase()
                    .includes(keyword)

            );

        });

    }, [employees, search]);

    return (

        <MainLayout>
            <div className="container-fluid py-4">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2 className="fw-bold mb-1">
                Employee Management
            </h2>

            <p className="text-muted mb-0">
                Manage employee records, departments and user mapping.
            </p>

        </div>

    </div>

    {/* Statistics */}

    <div className="row mb-4">

        <div className="col-lg-4 col-md-6 mb-3">

            <div className="card border-0 shadow-sm">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <small className="text-muted">
                            Total Employees
                        </small>

                        <h2 className="fw-bold mt-2">
                            {employees.length}
                        </h2>

                    </div>

                    <FaUsers
                        size={42}
                        color="#4F46E5"
                    />

                </div>

            </div>

        </div>

        <div className="col-lg-4 col-md-6 mb-3">

            <div className="card border-0 shadow-sm">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <small className="text-muted">
                            Departments
                        </small>

                        <h2 className="fw-bold mt-2">
                            {departments.length}
                        </h2>

                    </div>

                    <FaBuilding
                        size={42}
                        color="#06B6D4"
                    />

                </div>

            </div>

        </div>

        <div className="col-lg-4 col-md-12 mb-3">

            <div className="card border-0 shadow-sm">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>

                        <small className="text-muted">
                            Employee Users
                        </small>

                        <h2 className="fw-bold mt-2">
                            {users.length}
                        </h2>

                    </div>

                    <FaUserPlus
                        size={42}
                        color="#22C55E"
                    />

                </div>

            </div>

        </div>

    </div>

    {/* Form */}

    <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

            <h4 className="fw-bold mb-4">

                {editingId
                    ? "Update Employee"
                    : "Add New Employee"}

            </h4>

            <div className="row g-3">

                <div className="col-lg-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                    />

                </div>

                <div className="col-lg-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                    />

                </div>

                <div className="col-lg-3">

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>

                <div className="col-lg-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) =>
                            setPhoneNumber(e.target.value)
                        }
                    />

                </div>

                <div className="col-lg-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Designation"
                        value={designation}
                        onChange={(e) =>
                            setDesignation(e.target.value)
                        }
                    />

                </div>

                <div className="col-lg-3">

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Salary"
                        value={salary}
                        onChange={(e) =>
                            setSalary(e.target.value)
                        }
                    />

                </div>

                <div className="col-lg-3">

                    <select
                        className="form-select"
                        value={departmentId}
                        onChange={(e) =>
                            setDepartmentId(e.target.value)
                        }
                    >

                        <option value="">
                            Select Department
                        </option>

                        {departments.map((department) => (

                            <option
                                key={department.id}
                                value={department.id}
                            >

                                {department.departmentName}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="col-lg-3">

                    <select
                        className="form-select"
                        value={userId}
                        onChange={(e) =>
                            setUserId(e.target.value)
                        }
                    >

                        <option value="">
                            Select User
                        </option>

                        {users.map((user) => (

                            <option
                                key={user.id}
                                value={user.id}
                            >

                                {user.username}

                            </option>

                        ))}

                    </select>

                </div>

                <div className="col-12">

                    <button
                        className={`btn ${
                            editingId
                                ? "btn-warning"
                                : "btn-primary"
                        } w-100 py-2`}
                        onClick={handleSaveEmployee}
                    >

                        {editingId
                            ? "Update Employee"
                            : "Add Employee"}

                    </button>

                </div>

            </div>

        </div>

    </div>

    {/* Search */}

    <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

            <div className="input-group">

                <span className="input-group-text">

                    <FaSearch />

                </span>

                <input
                    className="form-control"
                    placeholder="Search by name, email, department or designation..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

        </div>

    </div>
        {/* Employee Table */}

    <div className="card border-0 shadow-sm">

        <div className="card-body">

            <div className="table-responsive">

                <table className="table table-hover align-middle">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>

                            <th>Employee</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Designation</th>

                            <th>Department</th>

                            <th>Salary</th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredEmployees.length > 0 ?

                                filteredEmployees.map((employee) => (

                                    <tr key={employee.id}>

                                        <td>

                                            {employee.id}

                                        </td>

                                        <td>

                                            <div className="fw-bold">

                                                {employee.firstName} {employee.lastName}

                                            </div>

                                        </td>

                                        <td>

                                            <FaEnvelope
                                                className="me-2 text-primary"
                                            />

                                            {employee.email}

                                        </td>

                                        <td>

                                            <FaPhone
                                                className="me-2 text-success"
                                            />

                                            {employee.phoneNumber}

                                        </td>

                                        <td>

                                            <span className="badge bg-info">

                                                <FaBriefcase className="me-1" />

                                                {employee.designation}

                                            </span>

                                        </td>

                                        <td>

                                            <span className="badge bg-secondary">

                                                <FaBuilding className="me-1" />

                                                {employee.departmentName}

                                            </span>

                                        </td>

                                        <td className="fw-bold text-success">

                                            <FaMoneyBillWave className="me-1" />

                                            ₹ {employee.salary}

                                        </td>

                                        <td className="text-center">

                                            <button

                                                className="btn btn-warning btn-sm me-2"

                                                onClick={() =>
                                                    handleEditEmployee(employee)
                                                }

                                            >

                                                <FaEdit />

                                            </button>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() =>
                                                    handleDeleteEmployee(employee.id)
                                                }

                                            >

                                                <FaTrash />

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center py-5"
                                        >

                                            <FaUsers
                                                size={50}
                                                className="text-secondary mb-3"
                                            />

                                            <h5>

                                                No Employees Found

                                            </h5>

                                            <p className="text-muted">

                                                Try another search keyword.

                                            </p>

                                        </td>

                                    </tr>

                                )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    </div>

</div>

</MainLayout>

);

}

export default Employee;