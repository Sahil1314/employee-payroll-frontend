import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
} from "../../services/userService";

function User() {

    const [users, setUsers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EMPLOYEE");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.log(error);
            alert("Unable to load users");
        }
    };

    const clearForm = () => {
        setEditingId(null);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("EMPLOYEE");
    };

    const handleSaveUser = async () => {

        const user = {
            username,
            email,
            password,
            role,
        };

        try {

            if (editingId) {

                await updateUser(editingId, user);
                alert("User Updated Successfully");

            } else {

                await addUser(user);
                alert("User Added Successfully");

            }

            clearForm();
            loadUsers();

        } catch (error) {

            console.log(error);

            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Operation Failed");
            }

        }

    };

    const handleEditUser = (user) => {

        setEditingId(user.id);
        setUsername(user.username);
        setEmail(user.email);
        setPassword("");
        setRole(user.role);

    };

    const handleDeleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        try {

            await deleteUser(id);

            alert("User Deleted Successfully");

            loadUsers();

        } catch (error) {

            console.log(error);

            alert("Unable to Delete User");

        }

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <h2 className="mb-4">
                    User Management
                </h2>

                <div className="row g-3 mb-4">

                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="col-md-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="col-md-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="col-md-2">
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <button
                            className={`btn ${editingId ? "btn-warning" : "btn-success"} w-100`}
                            onClick={handleSaveUser}
                        >
                            {editingId ? "Update" : "Add"}
                        </button>
                        <button
    className="btn btn-secondary w-100 mt-2"
    onClick={clearForm}
>
    Cancel
</button>
                    </div>

                </div>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEditUser(user)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteUser(user.id)}
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

export default User;