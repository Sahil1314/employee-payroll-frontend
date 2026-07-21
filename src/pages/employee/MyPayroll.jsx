import { useEffect, useState } from "react";
import { getMyPayroll, downloadPayslip } from "../../services/payrollService";


function MyPayroll() {

    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        loadPayrolls();
    }, []);

    const loadPayrolls = async () => {
        try {
            const data = await getMyPayroll();
            setPayrolls(data);
        } catch (error) {
            console.error(error);
            alert("Failed to load payroll records.");
        }
    };
    const handleDownload = async (payrollId) => {

    try {

        const pdf = await downloadPayslip(payrollId);

        const url = window.URL.createObjectURL(
            new Blob([pdf])
        );

        const link = document.createElement("a");

        link.href = url;

        link.download = `Payslip_${payrollId}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    } catch (error) {

        console.error(error);

        alert("Unable to download payslip.");
    }

};

    return (
        <div className="container mt-4">

            <h2>My Payroll</h2>

            <table className="table table-bordered table-striped">

               <thead>

<tr>

<th>ID</th>

<th>Basic Salary</th>

<th>Bonus</th>

<th>Deductions</th>

<th>Net Salary</th>

<th>Payment Date</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>
                <tbody>

                    {payrolls.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No payroll records found.
                            </td>
                        </tr>
                    ) : (
                        payrolls.map((payroll) => (
                            <tr key={payroll.id}>
                                <td>{payroll.id}</td>
                                <td>₹ {payroll.basicSalary}</td>
                                <td>₹ {payroll.bonus}</td>
                                <td>₹ {payroll.deductions}</td>
                                <td>₹ {payroll.netSalary}</td>
                                <td>{payroll.paymentDate}</td>
                                <td>{payroll.paymentStatus}</td>
                                <td>

<button
    className="btn btn-success btn-sm"
    onClick={() => handleDownload(payroll.id)}
>

Download PDF

</button>

</td>
                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default MyPayroll;