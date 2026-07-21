function LeaveForm({
    employees,
    editingId,
    employeeId,
    setEmployeeId,
    leaveType,
    setLeaveType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    reason,
    setReason,
    handleSaveLeave,
    clearForm,
}) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                    {editingId ? "Update Leave" : "Apply Leave"}
                </h5>
            </div>

            <div className="card-body">

                <div className="row g-3">

                    <div className="col-md-6">

                        <label className="form-label">
                            Employee
                        </label>

                        <select
                            className="form-select"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        >

                            <option value="">
                                Select Employee
                            </option>

                            {employees.map((employee) => (

                                <option
                                    key={employee.id}
                                    value={employee.id}
                                >
                                    {employee.firstName} {employee.lastName}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">
                            Leave Type
                        </label>

                        <select
                            className="form-select"
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                        >

                            <option value="">
                                Select Leave Type
                            </option>

                            <option value="Casual Leave">
                                Casual Leave
                            </option>

                            <option value="Sick Leave">
                                Sick Leave
                            </option>

                            <option value="Earned Leave">
                                Earned Leave
                            </option>

                            <option value="Maternity Leave">
                                Maternity Leave
                            </option>

                            <option value="Paternity Leave">
                                Paternity Leave
                            </option>

                            <option value="Loss of Pay">
                                Loss of Pay
                            </option>

                        </select>

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">
                            Start Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                    </div>

                    <div className="col-md-6">

                        <label className="form-label">
                            End Date
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />

                    </div>

                    <div className="col-md-12">

                        <label className="form-label">
                            Reason
                        </label>

                        <textarea
                            rows="3"
                            className="form-control"
                            placeholder="Enter leave reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />

                    </div>

                    <div className="col-md-2">

                        <button
                            className={`btn ${editingId ? "btn-warning" : "btn-success"} w-100`}
                            onClick={handleSaveLeave}
                        >
                            {editingId ? "Update" : "Apply"}
                        </button>

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-secondary w-100"
                            onClick={clearForm}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default LeaveForm;