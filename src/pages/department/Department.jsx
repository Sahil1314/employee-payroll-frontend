import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import {
    getAllDepartments,
    addDepartment,
    deleteDepartment,
    updateDepartment
} from "../../services/departmentService";

function Department() {

    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState("");
    const [departmentCode, setDepartmentCode] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const data = await getAllDepartments();
            setDepartments(data);
        } catch (error) {
            console.log(error);
            alert("Unable to load departments");
        }
    };

    const handleAddDepartment = async () => {

        try {

            if (editingId) {

                await updateDepartment(editingId, {
                    departmentName,
                    departmentCode
                });

                alert("Department Updated Successfully");

                setEditingId(null);

            } else {

                await addDepartment({
                    departmentName,
                    departmentCode
                });

                alert("Department Added Successfully");

            }

            setDepartmentName("");
            setDepartmentCode("");

            loadDepartments();

        } catch (error) {

            console.log(error);

            alert("Operation Failed");

        }

    };

    const handleEditDepartment = (department) => {

        setEditingId(department.id);

        setDepartmentName(department.departmentName);

        setDepartmentCode(department.departmentCode);

    };

    const handleDeleteDepartment = async (id) => {

        if (!window.confirm("Delete this department?")) return;

        try {

            await deleteDepartment(id);

            alert("Department Deleted Successfully");

            loadDepartments();

        } catch (error) {

            console.log(error);

            alert("Department cannot be deleted because employees are assigned to it.");

        }

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    Department Management
                </h2>

                <div className="row mb-4">

                    <div className="col-md-5">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Department Name"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                        />

                    </div>

                    <div className="col-md-5">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Department Code"
                            value={departmentCode}
                            onChange={(e) => setDepartmentCode(e.target.value)}
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className={`btn ${editingId ? "btn-warning" : "btn-success"} w-100`}
                            onClick={handleAddDepartment}
                        >
                            {editingId ? "Update" : "Add"}

                        </button>

                    </div>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Department Name</th>
                            <th>Department Code</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {departments.map((department) => (

                            <tr key={department.id}>

                                <td>{department.id}</td>

                                <td>{department.departmentName}</td>

                                <td>{department.departmentCode}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEditDepartment(department)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteDepartment(department.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );
}

export default Department;