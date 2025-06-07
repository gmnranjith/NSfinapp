const formArea = document.getElementById("formArea");
const summary = document.getElementById("summary");

function showCustomerForm() {
  formArea.innerHTML = `
        <h4>New Customer</h4>
        <form onsubmit="addCustomer(event)">
            <input type="text" id="customerName" placeholder="Name" class="form-control mb-2" required>
            <input type="text" id="customerPhone" placeholder="Phone" class="form-control mb-2" required>
            <input type="text" id="customerAddress" placeholder="Address" class="form-control mb-2" required>
            <input type="text" id="customerArea" placeholder="Area" class="form-control mb-2" required>
            <button type="submit" class="btn btn-success">Save</button>
        </form>
        <hr><h5>Customers List</h5><ul class="list-group" id="customerList"></ul>`;
  renderCustomers();
}
function addCustomer(e) {
  e.preventDefault();
  const customer = {
    id: Date.now(),
    name: document.getElementById("customerName").value,
    phone: document.getElementById("customerPhone").value,
    address: document.getElementById("customerAddress").value,
    area: document.getElementById("customerArea").value,
  };
  let customers = JSON.parse(localStorage.getItem("customers")) || [];
  customers.push(customer);
  localStorage.setItem("customers", JSON.stringify(customers));
  showCustomerForm();
}
function renderCustomers() {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const list = document.getElementById("customerList");
  list.innerHTML = "";
  customers.forEach((c) => {
    list.innerHTML += `<li class='list-group-item'>${c.name} - ${c.phone}</li>`;
  });
}

function showLoanForm() {
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  if (!customers.length)
    return (formArea.innerHTML =
      "<p class='text-danger'>Add customers first.</p>");
  formArea.innerHTML = `
        <h4>New Loan</h4>
        <form onsubmit="addLoan(event)">
            <select id="loanCustomerId" class="form-control mb-2" required>
                ${customers
                  .map((c) => `<option value="${c.id}">${c.name}</option>`)
                  .join("")}
            </select>
            <input type="number" id="loanAmount" placeholder="Loan Amount" class="form-control mb-2" required>
            <input type="number" id="installment" placeholder="Installment" class="form-control mb-2" required>
            <input type="date" id="startDate" class="form-control mb-2" required>
            <input type="number" id="duration" placeholder="Weeks" class="form-control mb-2" required>
            <button type="submit" class="btn btn-success">Save</button>
        </form><hr><h5>Loan List</h5><ul class="list-group" id="loanList"></ul>`;
  renderLoans();
}
function addLoan(e) {
  e.preventDefault();
  const loan = {
    id: Date.now(),
    customerId: document.getElementById("loanCustomerId").value,
    amount: +document.getElementById("loanAmount").value,
    installment: +document.getElementById("installment").value,
    startDate: document.getElementById("startDate").value,
    duration: +document.getElementById("duration").value,
  };
  let loans = JSON.parse(localStorage.getItem("loans")) || [];
  loans.push(loan);
  localStorage.setItem("loans", JSON.stringify(loans));
  showLoanForm();
}
function renderLoans() {
  const loans = JSON.parse(localStorage.getItem("loans")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const list = document.getElementById("loanList");
  list.innerHTML = "";
  loans.forEach((l) => {
    const c = customers.find((x) => x.id == l.customerId);
    list.innerHTML += `<li class='list-group-item'>${c?.name} - ₹${l.amount} for ${l.duration} weeks</li>`;
  });
}

function showCollectorForm() {
  formArea.innerHTML = `
        <h4>New Collector</h4>
        <form onsubmit="addCollector(event)">
            <input type="text" id="collectorName" placeholder="Name" class="form-control mb-2" required>
            <input type="text" id="collectorPhone" placeholder="Phone" class="form-control mb-2" required>
            <button type="submit" class="btn btn-success">Save</button>
        </form><hr><h5>Collectors List</h5><ul class="list-group" id="collectorList"></ul>`;
  renderCollectors();
}
function addCollector(e) {
  e.preventDefault();
  const collector = {
    id: Date.now(),
    name: document.getElementById("collectorName").value,
    phone: document.getElementById("collectorPhone").value,
  };
  let collectors = JSON.parse(localStorage.getItem("collectors")) || [];
  collectors.push(collector);
  localStorage.setItem("collectors", JSON.stringify(collectors));
  showCollectorForm();
}
function renderCollectors() {
  const collectors = JSON.parse(localStorage.getItem("collectors")) || [];
  const list = document.getElementById("collectorList");
  list.innerHTML = "";
  collectors.forEach((c) => {
    list.innerHTML += `<li class='list-group-item'>${c.name} - ${c.phone}</li>`;
  });
}

function showCollectionForm() {
  const loans = JSON.parse(localStorage.getItem("loans")) || [];
  const collectors = JSON.parse(localStorage.getItem("collectors")) || [];
  if (!loans.length || !collectors.length) {
    return (formArea.innerHTML =
      "<p class='text-danger'>Add loans and collectors first.</p>");
  }
  formArea.innerHTML = `
        <h4>Record Collection</h4>
        <form onsubmit="addCollection(event)">
            <input type="date" id="collectionDate" class="form-control mb-2" required>
            <select id="collectionLoanId" class="form-control mb-2" required>
                ${loans
                  .map(
                    (l) =>
                      `<option value="${l.id}">Loan ${l.id} - ₹${l.amount}</option>`
                  )
                  .join("")}
            </select>
            <input type="number" id="collectionAmount" placeholder="Amount" class="form-control mb-2" required>
            <select id="collectionCollectorId" class="form-control mb-2" required>
                ${collectors
                  .map((c) => `<option value="${c.id}">${c.name}</option>`)
                  .join("")}
            </select>
            <button type="submit" class="btn btn-success">Save</button>
        </form><hr><h5>Collections List</h5><ul class="list-group" id="collectionList"></ul>`;
  renderCollections();
}
function addCollection(e) {
  e.preventDefault();
  const collection = {
    id: Date.now(),
    date: document.getElementById("collectionDate").value,
    loanId: document.getElementById("collectionLoanId").value,
    amount: +document.getElementById("collectionAmount").value,
    collectorId: document.getElementById("collectionCollectorId").value,
  };
  let collections = JSON.parse(localStorage.getItem("collections")) || [];
  collections.push(collection);
  localStorage.setItem("collections", JSON.stringify(collections));
  showCollectionForm();
}
function renderCollections() {
  const collections = JSON.parse(localStorage.getItem("collections")) || [];
  const loans = JSON.parse(localStorage.getItem("loans")) || [];
  const collectors = JSON.parse(localStorage.getItem("collectors")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  const list = document.getElementById("collectionList");
  list.innerHTML = "";
  collections.forEach((c) => {
    const loan = loans.find((l) => l.id == c.loanId);
    const customer = customers.find((cu) => cu.id == loan?.customerId);
    const collector = collectors.find((col) => col.id == c.collectorId);
    list.innerHTML += `<li class='list-group-item'>${c.date}: ₹${c.amount} from ${customer?.name} by ${collector?.name}</li>`;
  });
}

function renderDashboard() {
  const loans = JSON.parse(localStorage.getItem("loans")) || [];
  const collectors = JSON.parse(localStorage.getItem("collectors")) || [];
  const customers = JSON.parse(localStorage.getItem("customers")) || [];
  summary.innerHTML = `
        <div class="col-md-4"><div class="card text-bg-primary mb-3"><div class="card-body">
            <h5>Total Customers</h5><p>${customers.length}</p></div></div></div>
        <div class="col-md-4"><div class="card text-bg-success mb-3"><div class="card-body">
            <h5>Total Loans</h5><p>${loans.length}</p></div></div></div>
        <div class="col-md-4"><div class="card text-bg-warning mb-3"><div class="card-body">
            <h5>Total Collectors</h5><p>${collectors.length}</p></div></div></div>`;
}

renderDashboard();
