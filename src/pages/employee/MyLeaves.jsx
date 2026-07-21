import { useEffect, useState } from "react";
import { applyLeave, getMyLeaves } from "../../services/leaveService";
import {
    FaCalendarCheck,
    FaPaperPlane,
    FaClipboardList
} from "react-icons/fa";

function MyLeaves() {

    const [leave, setLeave] = useState({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: ""
    });

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        loadLeaves();
    }, []);

    const loadLeaves = async () => {
        try {
            const data = await getMyLeaves();
            setLeaves(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setLeave({
            ...leave,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await applyLeave(leave);

            alert("Leave applied successfully.");

            setLeave({
                leaveType: "",
                startDate: "",
                endDate: "",
                reason: ""
            });

            loadLeaves();

        } catch (error) {

            console.error(error);

            alert("Failed to apply leave.");

        }
    };

    return (

        <div className="container-fluid p-4">

            {/* Header */}

            <div className="mb-4">

                <h2 className="fw-bold">

                    My Leaves

                </h2>

                <p className="text-muted">

                    Apply for leave and monitor your leave requests.

                </p>

            </div>

            {/* Apply Leave Card */}

            <div className="card border-0 shadow-sm mb-5">

                <div className="card-body p-4">

                    <h4 className="fw-bold mb-4">

                        <FaCalendarCheck className="me-2 text-primary" />

                        Apply Leave

                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-lg-6 mb-3">

                                <label className="form-label">

                                    Leave Type

                                </label>

                                <select
                                    className="form-select"
                                    name="leaveType"
                                    value={leave.leaveType}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Leave Type
                                    </option>

                                    <option value="CASUAL">
                                        Casual Leave
                                    </option>

                                    <option value="SICK">
                                        Sick Leave
                                    </option>

                                    <option value="ANNUAL">
                                        Annual Leave
                                    </option>

                                </select>

                            </div>

                            <div className="col-lg-6 mb-3">

                                <label className="form-label">

                                    Start Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="startDate"
                                    value={leave.startDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-lg-6 mb-3">

                                <label className="form-label">

                                    End Date

                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="endDate"
                                    value={leave.endDate}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-lg-6 mb-3">

                                <label className="form-label">

                                    Reason

                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="reason"
                                    value={leave.reason}
                                    onChange={handleChange}
                                    placeholder="Enter reason for leave..."
                                    required
                                />

                            </div>

                        </div>

                        <button
                            className="btn btn-primary px-4 py-2"
                        >

                            <FaPaperPlane className="me-2" />

                            Apply Leave

                        </button>

                    </form>

                </div>

            </div>

            {/* Leave History */}

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h4 className="fw-bold mb-4">

                        <FaClipboardList className="me-2 text-success" />

                        Leave History

                    </h4>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Reason</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>
                                {leaves.length === 0 ? (

    <tr>

        <td
            colSpan="6"
            className="text-center py-5"
        >

            <h5 className="text-muted">

                No Leave Records Found

            </h5>

            <p className="text-secondary mb-0">

                Apply for your first leave request.

            </p>

        </td>

    </tr>

) : (

    leaves.map((leave) => (

        <tr key={leave.id}>

            <td>

                #{leave.id}

            </td>

            <td>

                <span className="fw-semibold">

                    {leave.leaveType}

                </span>

            </td>

            <td>

                {leave.startDate}

            </td>

            <td>

                {leave.endDate}

            </td>

            <td
                style={{
                    maxWidth: "250px"
                }}
            >

                {leave.reason}

            </td>

            <td>

                <span
                    className={`badge px-3 py-2 ${
                        leave.status === "APPROVED"
                            ? "bg-success"
                            : leave.status === "PENDING"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                    }`}
                >

                    {leave.status}

                </span>

            </td>

        </tr>

    ))

)}

</tbody>

</table>

</div>

</div>

</div>

</div>

);

}

export default MyLeaves;