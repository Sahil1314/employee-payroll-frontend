import { useEffect, useState } from "react";
import { getMyProfile } from "../../services/employeeService";

function MyProfile() {

    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await getMyProfile();
            setEmployee(data);
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };

    if (!employee) {
        return <h4>Loading...</h4>;
    }

    return (
        <>
            <h2 className="text-center mb-4">My Profile</h2>

            <div className="card p-4 shadow">

                <h4 className="text-center mb-4">
                    Employee Details
                </h4>

                <table className="table table-bordered">

                    <tbody>

                        <tr>
                            <th>First Name</th>
                            <td>{employee.firstName}</td>
                        </tr>

                        <tr>
                            <th>Last Name</th>
                            <td>{employee.lastName}</td>
                        </tr>

                        <tr>
                            <th>Email</th>
                            <td>{employee.email}</td>
                        </tr>

                        <tr>
                            <th>Phone</th>
                            <td>{employee.phoneNumber}</td>
                        </tr>

                        <tr>
                            <th>Department</th>
                            <td>{employee.departmentName}</td>
                        </tr>

                        <tr>
                            <th>Designation</th>
                            <td>{employee.designation}</td>
                        </tr>

                        <tr>
                            <th>Salary</th>
                            <td>₹ {employee.salary}</td>
                        </tr>

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default MyProfile;