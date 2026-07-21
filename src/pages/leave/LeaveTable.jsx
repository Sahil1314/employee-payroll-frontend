import StatusBadge from "./StatusBadge";

function LeaveTable({
    leaves,
    handleEditLeave,
    handleDeleteLeave,
    handleStatusUpdate,
}) {

    return (

        <div className="card shadow-sm">

            <div className="card-header bg-dark text-white">

                <h5 className="mb-0">
                    Leave Records
                </h5>

            </div>

            <div className="card-body">

                <table className="table table-bordered table-hover">

                    <thead className="table-light">

                        <tr>

                            <th>ID</th>
                            <th>Employee</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {leaves.length === 0 ? (

                            <tr>

                                <td colSpan="8" className="text-center">

                                    No Leave Records Found

                                </td>

                            </tr>

                        ) : (

                            leaves.map((leave) => (

                                <tr key={leave.id}>

                                    <td>{leave.id}</td>

                                    <td>{leave.employeeName}</td>

                                    <td>{leave.leaveType}</td>

                                    <td>{leave.startDate}</td>

                                    <td>{leave.endDate}</td>

                                    <td>{leave.reason}</td>

                                    <td>

                                        <StatusBadge
                                            status={leave.status}
                                        />

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => handleEditLeave(leave)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() => handleDeleteLeave(leave.id)}
                                        >
                                            Delete
                                        </button>

                                        {leave.status !== "APPROVED" && (

                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        leave.id,
                                                        "APPROVED"
                                                    )
                                                }
                                            >
                                                Approve
                                            </button>

                                        )}

                                        {leave.status !== "REJECTED" && (

                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        leave.id,
                                                        "REJECTED"
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default LeaveTable;