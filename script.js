const form = document.getElementById("investment-form");
const list = document.getElementById("investment-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;

  const response = await fetch("/api/investments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, amount })
  });

  const newInvestment = await response.json();
  addToList(newInvestment);
  form.reset();
});

async function loadInvestments() {
  const res = await fetch("/api/investments");
  const data = await res.json();
  data.forEach(addToList);
}

function addToList(investment) {
  const li = document.createElement("li");
  li.textContent = `${investment.name}: $${investment.amount}`;
  list.appendChild(li);
}

loadInvestments();