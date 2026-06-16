// Load employees from localStorage on page load
let employees = JSON.parse(localStorage.getItem("employees")) || [];
let idCounter = employees.length > 0
    ? Math.max(...employees.map(emp => emp.id)) + 1
    : 1;

// Save employees to localStorage
function saveToLocalStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

// Add a new employee
function addEmployee() {
    const name = document.getElementById("empName").value.trim();
    const age = document.getElementById("empAge").value;
    const department = document.getElementById("empDepartment").value;
    const salary = document.getElementById("empSalary").value;

    // Validation
    if (!name || !age || !department || !salary) {
        alert("Please fill in all fields!");
        return;
    }

    if (age < 18 || age > 65) {
        alert("Age must be between 18 and 65!");
        return;
    }

    if (salary <= 0) {
        alert("Salary must be a positive number!");
        return;
    }

    // Create employee object
    const employee = {
        id: idCounter++,
        name: name,
        age: parseInt(age),
        department: department,
        salary: parseFloat(salary)
    };

    employees.push(employee);
    saveToLocalStorage();

    // Clear form
    document.getElementById("empName").value = "";
    document.getElementById("empAge").value = "";
    document.getElementById("empDepartment").value = "";
    document.getElementById("empSalary").value = "";

    renderTable();
}

// Delete an employee by ID
function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(emp => emp.id !== id);
        saveToLocalStorage();
        renderTable();
    }
}

// Edit an employee by ID
function editEmployee(id) {
    const emp = employees.find(emp => emp.id === id);
    if (!emp) return;

    // Populate form with existing values
    document.getElementById("empName").value = emp.name;
    document.getElementById("empAge").value = emp.age;
    document.getElementById("empDepartment").value = emp.department;
    document.getElementById("empSalary").value = emp.salary;

    // Remove the old entry temporarily
    employees = employees.filter(emp => emp.id !== id);
    saveToLocalStorage();
    renderTable();
}

// Search employees by name or department
function searchEmployee() {
    const query = document.getElementById("search").value.toLowerCase().trim();
    const rows = document.querySelectorAll("#employeeTable tr");

    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const department = row.cells[3].textContent.toLowerCase();
        const match = name.includes(query) || department.includes(query);
        row.style.display = match ? "" : "none";
    });
}

// Render the employee table
function renderTable() {
    const tableBody = document.getElementById("employeeTable");

    if (employees.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; color:#6b4c3a; padding:30px; font-style:italic;">
                    No employees added yet.
                </td>
            </tr>
        `;
        return;
    }

    let html = "";
    for (let i = 0; i < employees.length; i++) {
        const emp = employees[i];
        html += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.age}</td>
                <td>${emp.department}</td>
                <td>₹${Number(emp.salary).toLocaleString()}</td>
                <td>
                    <button onclick="editEmployee(${emp.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>
        `;
    }

    tableBody.innerHTML = html;
}

// Initial render on page load
renderTable();
