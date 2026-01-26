/* STATE */

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let monthlyIncome = Number(localStorage.getItem('monthlyIncome')) || 2645;
let monthlyExpenses = Number(localStorage.getItem('monthlyExpenses')) || 1895;

/* INIT */

const today = new Date().toISOString().split('T')[0];
document.getElementById('incomeDate').value = today;
document.getElementById('expenseDate').value = today;

document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    updateTransactionsTable();
    saveToLocalStorage();
});

/* MODALS */

function openIncomeModal() {
    toggleModal('incomeModal', true);
}

function openExpenseModal() {
    toggleModal('expenseModal', true);
}

function closeModal(id) {
    toggleModal(id, false);
}

function toggleModal(id, open) {
    document.getElementById(id).style.display = open ? 'block' : 'none';
    document.body.style.overflow = open ? 'hidden' : 'auto';

    if (!open) {
        const form = id === 'incomeModal' ? 'incomeForm' : 'expenseForm';
        document.getElementById(form).reset();
        document.getElementById(id === 'incomeModal' ? 'incomeDate' : 'expenseDate').value = today;
    }
}

window.onclick = e => {
    ['incomeModal', 'expenseModal'].forEach(id => {
        if (e.target === document.getElementById(id)) closeModal(id);
    });
};

/* ADD TRANSACTIONS */

function addIncome() {
    addTransaction({
        amount: +document.getElementById('incomeAmount').value,
        category: document.getElementById('incomeCategory').value,
        description: document.getElementById('incomeDescription').value,
        date: document.getElementById('incomeDate').value,
        type: 'income'
    });
}

function addExpense() {
    addTransaction({
        amount: -Math.abs(document.getElementById('expenseAmount').value),
        category: document.getElementById('expenseCategory').value,
        description: document.getElementById('expenseDescription').value,
        date: document.getElementById('expenseDate').value,
        type: 'expense'
    });
}

function addTransaction({ amount, category, description, date, type }) {
    if (!amount || !category || !date) {
        alert('Please fill all required fields');
        return;
    }

    transactions.unshift({
        id: crypto.randomUUID(),
        date,
        category: capitalize(category),
        amount,
        status: 'Success',
        type,
        description
    });

    if (type === 'income') monthlyIncome += amount;
    else monthlyExpenses += Math.abs(amount);

    updateDashboard();
    updateTransactionsTable();
    saveToLocalStorage();
    closeModal(type === 'income' ? 'incomeModal' : 'expenseModal');
    showNotification(`${capitalize(type)} added successfully!`);
}

/* DELETE */
function deleteTransaction(id) {
    const t = transactions.find(x => x.id === id);
    if (!t) return;

    if (t.type === 'income') monthlyIncome -= t.amount;
    else monthlyExpenses -= Math.abs(t.amount);

    transactions = transactions.filter(x => x.id !== id);

    updateDashboard();
    updateTransactionsTable();
    saveToLocalStorage();
    showNotification('Transaction deleted');
}

/* UI UPDATES */

function updateDashboard() {
    document.querySelector('.income-amount').textContent = formatCurrency(monthlyIncome);
    document.querySelector('.expense-amount').textContent = formatCurrency(monthlyExpenses);

    const limit = 10000;
    const used = monthlyExpenses;
    const percent = Math.min((used / limit) * 100, 100);

    document.querySelector('.spending-limit').textContent =
        formatCurrency(limit - used);

    document.querySelector('.progress-fill').style.width = `${percent}%`;
}

function updateTransactionsTable() {
    const tbody = document.querySelector('.transactions-table tbody');
    tbody.innerHTML = '';

    transactions.forEach(t => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${formatDate(t.date)}</td>
            <td>${t.category}</td>
            <td style="color:${t.amount > 0 ? '#10b981' : '#ef4444'}">
                ${t.amount > 0 ? '+' : '-'}${formatCurrency(Math.abs(t.amount))}
            </td>
            <td><span class="status-success">${t.status}</span></td>
            <td>
                <button class="action-btn" onclick="deleteTransaction('${t.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

/* UTILITIES */

function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('monthlyIncome', monthlyIncome);
    localStorage.setItem('monthlyExpenses', monthlyExpenses);
}

function formatCurrency(num) {
    return `$${num.toLocaleString()}.00`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showNotification(msg) {
    const n = document.createElement('div');
    n.textContent = msg;
    n.style.cssText = `
        position:fixed;top:2rem;right:2rem;
        background:#10b981;color:#fff;
        padding:1rem 1.5rem;border-radius:8px;
        z-index:1001;
    `;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
}

/* EXPORT */

document.querySelector('.export-btn').onclick = () => {
    let csv = "Date,Category,Amount,Status\n";
    transactions.forEach(t => {
        csv += `${t.date},${t.category},${t.amount},${t.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'transactions.csv';
    a.click();
};
