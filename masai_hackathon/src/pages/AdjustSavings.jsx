import React, { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import "./AdjustSavings.css";

const AdjustSavings = () => {
  const { finances, updateFinances } = useContext(FinanceContext);
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("add");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    let newSavings = finances.savings;
    if (action === "add") {
      newSavings += Number(amount);
    } else {
      if (Number(amount) > finances.savings) {
        setError("Cannot withdraw more than available savings");
        return;
      }
      newSavings -= Number(amount);
    }

    updateFinances({ ...finances, savings: newSavings });
    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Adjust Savings</h2>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="action" className="form-label">
              Action
            </label>
            <select
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="form-input"
            >
              <option value="add">Add to Savings</option>
              <option value="withdraw">Withdraw from Savings</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount
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
          {error && <p className="error-message">{error}</p>}
          <div className="form-actions">
            <button type="submit" className="action-button adjust-savings">
              Adjust Savings
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

export default AdjustSavings;
