let applications = [];
let idCounter = 1;

function submitApplication() {
    const name = document.getElementById("applicantName").value.trim();
    const age = document.getElementById("applicantAge").value;
    const type = document.getElementById("applicantType").value;
    const loanAmount = document.getElementById("loanAmount").value;
    const criteriaValue = document.getElementById("criteriaValue").value;

    // Validation
    if (!name || !age || !type || !loanAmount || !criteriaValue) {
        alert("Please fill in all fields!");
        return;
    }

    if (age < 18) {
        alert("Applicant must be at least 18 years old!");
        return;
    }

    // Determine approval status
    let status;
    if (type === "Student") {
        status = criteriaValue >= 80 ? "Approved" : "Rejected";
    } else {
        status = criteriaValue >= 50000 ? "Approved" : "Rejected";
    }

    // Create application object
    const application = {
        id: idCounter++,
        name: name,
        age: age,
        type: type,
        loanAmount: loanAmount,
        criteriaValue: criteriaValue,
        status: status
    };

    applications.push(application);

    // Clear form
    document.getElementById("applicantName").value = "";
    document.getElementById("applicantAge").value = "";
    document.getElementById("applicantType").value = "";
    document.getElementById("loanAmount").value = "";
    document.getElementById("criteriaValue").value = "";

    // Update table
    renderTable();
}

function renderTable() {
    const tableBody = document.getElementById("applicationTable");
    const noRecords = document.getElementById("noRecords");

    if (applications.length === 0) {
        tableBody.innerHTML = "";
        noRecords.style.display = "block";
        return;
    }

    noRecords.style.display = "none";

    let html = "";
    for (let i = 0; i < applications.length; i++) {
        const app = applications[i];
        const statusClass = app.status === "Approved" ? "status-approved" : "status-rejected";
        const criteriaLabel = app.type === "Student" ? app.criteriaValue + " marks" : "₹" + Number(app.criteriaValue).toLocaleString();

        html += `
            <tr>
                <td>${app.id}</td>
                <td>${app.name}</td>
                <td>${app.age}</td>
                <td>${app.type}</td>
                <td>₹${Number(app.loanAmount).toLocaleString()}</td>
                <td>${criteriaLabel}</td>
                <td><span class="${statusClass}">${app.status}</span></td>
            </tr>
        `;
    }

    tableBody.innerHTML = html;
}
