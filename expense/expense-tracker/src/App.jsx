import React, { useState, useEffect } from 'react';

// કેટેગરી લિસ્ટ
const CATEGORIES = ['Food', 'Fuel', 'Bills', 'Shopping', 'Salary', 'Other'];

// કલર થીમ્સ (પાઇ ચાર્ટ અને ટેગ્સ માટે)
const CATEGORY_COLORS = {
  Food: '#f59e0b',
  Fuel: '#ef4444',
  Bills: '#3b82f6',
  Shopping: '#ec4899',
  Salary: '#10b981',
  Other: '#8b5cf6',
};

function App() {
  // ૧. ટ્રાન્ઝેક્શન સ્ટેટ (LocalStorage માંથી ડેટા લોડ કરવો)
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('daily_expense_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local storage data', e);
      }
    }
    return [
      { id: 1, title: 'Salary Credited', amount: 35000, type: 'income', category: 'Salary', date: '2026-10-20' },
      { id: 2, title: 'Grocery Shopping', amount: 2400, type: 'expense', category: 'Food', date: '2026-10-21' },
      { id: 3, title: 'CNG Fuel', amount: 1500, type: 'expense', category: 'Fuel', date: '2026-10-22' }
    ];
  });

  // ૨. ફોર્મ ઇનપુટ સ્ટેટ્સ
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');

  // ૩. LocalStorage માં ઓટોમેટિક સેવ કરવું
  useEffect(() => {
    localStorage.setItem('daily_expense_data', JSON.stringify(transactions));
  }, [transactions]);

  // ૪. ડાયનેમિક કેલ્ક્યુલેશન્સ
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const finalBalance = totalIncome - totalExpense;

  // ૫. નવું ટ્રાન્ઝેક્શન ઉમેરવું
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount || Number(amount) <= 0) return;

    const newEntry = {
      id: Date.now(),
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      category: type === 'income' ? 'Salary' : category,
      date: new Date().toISOString().split('T')[0]
    };

    setTransactions([newEntry, ...transactions]);
    setTitle('');
    setAmount('');
  };

  // ૬. ટ્રાન્ઝેક્શન ડીલીટ કરવું
  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // ૭. પાઇ ચાર્ટ ડેટા જનરેશન (કેટેગરી મુજબ ખર્ચ)
  const expenseByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

  // CSS conic-gradient દ્વારા પાઇ ચાર્ટ બનાવવો
  let cumulativePercent = 0;
  const gradientParts = Object.keys(expenseByCategory).map((cat) => {
    const val = expenseByCategory[cat];
    const percent = totalExpense > 0 ? (val / totalExpense) * 100 : 0;
    const start = cumulativePercent;
    cumulativePercent += percent;
    const color = CATEGORY_COLORS[cat] || '#94a3b8';
    return `${color} ${start}% ${cumulativePercent}%`;
  });

  const pieChartStyle = {
    background:
      totalExpense > 0 && gradientParts.length > 0
        ? `conic-gradient(${gradientParts.join(', ')})`
        : '#e2e8f0',
  };

  return (
    <div className="tracker-app">
      {/* ૧. મુખ્ય હેડર */}
      <header className="app-header">
        <h2>💰 Daily Expense & Budget Counter</h2>
        <p>Keep track of your cashflow, categorize expenses, and watch your balance grow.</p>
      </header>

      {/* ૨. ટોપ બેલેન્સ કાર્ડ્સ */}
      <section className="summary-cards">
        <div className="card balance-card">
          <h4>Net Balance</h4>
          <p className={`amount-display ${finalBalance >= 0 ? 'text-green' : 'text-red'}`}>
            ₹{finalBalance.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="card income-card">
          <h4>Total Income</h4>
          <p className="amount-display text-green">+₹{totalIncome.toLocaleString('en-IN')}</p>
        </div>
        <div className="card expense-card">
          <h4>Total Expense</h4>
          <p className="amount-display text-red">-₹{totalExpense.toLocaleString('en-IN')}</p>
        </div>
      </section>

      {/* ૩. વચ્ચેનો વર્કસ્પેસ એરિયા (ઇનપુટ ફોર્મ + પાઇ ચાર્ટ) */}
      <div className="workspace-grid">
        {/* ટ્રાન્ઝેક્શન એડ કરવાનું ફોર્મ */}
        <section className="card-panel form-panel">
          <h3>➕ Add New Transaction</h3>
          <form className="entry-form" onSubmit={handleAddTransaction}>
            <div className="input-field">
              <label>Description</label>
              <input
                type="text"
                placeholder="e.g. Petrol, Grocery, Rent"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="input-field">
              <label>Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 1500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                step="any"
                required
              />
            </div>

            <div className="input-row">
              <div className="input-field">
                <label>Flow Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="expense">Expense (-)</option>
                  <option value="income">Income (+)</option>
                </select>
              </div>

              {type === 'expense' && (
                <div className="input-field">
                  <label>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {CATEGORIES.filter((c) => c !== 'Salary').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Add Record 📝
            </button>
          </form>
        </section>

        {/* પાઇ ચાર્ટ બ્રેકડાઉન */}
        <section className="card-panel chart-panel">
          <h3>📊 Expense Breakdown</h3>
          <div className="chart-container">
            <div className="pie-chart-mock" style={pieChartStyle}>
              <div className="pie-hole">
                <span>Total Exp</span>
                <strong>₹{totalExpense.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="chart-legend">
              {Object.keys(expenseByCategory).length > 0 ? (
                Object.keys(expenseByCategory).map((cat) => (
                  <div key={cat} className="legend-item">
                    <span
                      className="dot"
                      style={{ background: CATEGORY_COLORS[cat] || '#94a3b8' }}
                    ></span>
                    <span className="legend-name">{cat}:</span>
                    <strong>₹{expenseByCategory[cat].toLocaleString('en-IN')}</strong>
                  </div>
                ))
              ) : (
                <p className="empty-msg">No expenses recorded yet.</p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ૪. ટ્રાન્ઝેક્શન હિસ્ટ્રી લિસ્ટ */}
      <section className="card-panel history-panel">
        <h3>📋 Transaction History</h3>
        {transactions.length === 0 ? (
          <p className="empty-msg">No transactions found. Add one above!</p>
        ) : (
          <ul className="items-list">
            {transactions.map((item) => (
              <li key={item.id} className={`list-item ${item.type}`}>
                <div className="item-left">
                  <span
                    className="item-category-tag"
                    style={{ backgroundColor: CATEGORY_COLORS[item.category] || '#64748b' }}
                  >
                    {item.category}
                  </span>
                  <div>
                    <p className="item-title">{item.title}</p>
                    <small className="item-date">{item.date}</small>
                  </div>
                </div>
                <div className="item-right">
                  <span className={`item-amount ${item.type === 'income' ? 'income-val' : 'expense-val'}`}>
                    {item.type === 'income' ? '+' : '-'}₹{Number(item.amount).toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                    title="Delete Entry"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;