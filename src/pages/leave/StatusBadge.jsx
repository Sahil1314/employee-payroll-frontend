function StatusBadge({ status }) {

    let badgeClass = "bg-secondary";

    switch (status) {

        case "APPROVED":
            badgeClass = "bg-success";
            break;

        case "REJECTED":
            badgeClass = "bg-danger";
            break;

        case "PENDING":
            badgeClass = "bg-warning text-dark";
            break;

        default:
            badgeClass = "bg-secondary";
    }

    return (
        <span className={`badge ${badgeClass}`}>
            {status}
        </span>
    );
}

export default StatusBadge;