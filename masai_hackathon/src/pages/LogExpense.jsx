import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import "./LogExpense.css";

const LogExpense = () => {
  const { finances, updateFinances } = useContext(FinanceContext);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = [
    "Housing",
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid expense amount");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }

    const newExpenses = finances.expenses + Number(amount);
    updateFinances({ ...finances, expenses: newExpenses });
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Log Expense</h2>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Expense Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="form-input"
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description (Optional)
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g., Grocery shopping"
              className="form-input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="action-button log-expense">
              Log Expense
            </button>
            <button
              type="button"
              className="action-button cancel"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogExpense;
