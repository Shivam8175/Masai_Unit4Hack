import React, { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FinanceContext } from "../context/FinanceContext";
import "./ScenarioForm.css";

const ScenarioForm = () => {
  const { addScenario, finances } = useContext(FinanceContext);
  const [scenario, setScenario] = useState({
    title: "",
    type: "career",
    category: "general",
    amount: 0,
    timeframe: 12,
    riskLevel: "low",
    expectedReturn: 0,
    monthlyContribution: 0,
    isRecurring: false,
    notes: "",
  });
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    titleRef.current?.focus();
    generateAiSuggestion();
  }, [scenario, finances]);

  const generateAiSuggestion = () => {
    let suggestion = "";
    const { amount, monthlyContribution, timeframe, type, isRecurring } =
      scenario;

    if (type === "investment" && scenario.expectedReturn > 10) {
      suggestion =
        "High expected returns (>10%) carry increased risk. Consider diversifying your portfolio.";
    } else if (amount > finances.income * 0.5 && !isRecurring) {
      suggestion = `The amount ($${amount.toLocaleString()}) exceeds 50% of your monthly income. Consider a longer timeframe or recurring contributions.`;
    } else if (monthlyContribution > finances.income * 0.3) {
      suggestion =
        "Your monthly contribution exceeds 30% of your income. Ensure this aligns with your budget.";
    } else if (timeframe < 6 && amount > finances.savings) {
      suggestion =
        "Short timeframes with high amounts may strain your savings. Extend the timeframe or reduce the amount.";
    } else {
      suggestion =
        "Your scenario looks balanced. Ensure your budget supports your goals!";
    }

    setAiSuggestion(suggestion);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!scenario.title.trim()) newErrors.title = "Title is required.";
    if (scenario.amount <= 0) newErrors.amount = "Amount must be positive.";
    if (scenario.timeframe <= 0)
      newErrors.timeframe = "Timeframe must be positive.";
    if (scenario.monthlyContribution < 0)
      newErrors.monthlyContribution = "Contribution cannot be negative.";
    if (scenario.expectedReturn < 0)
      newErrors.expectedReturn = "Expected return cannot be negative.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    addScenario({ ...scenario, id: Date.now() });
    navigate("/visualization");
  };

  const handleChange = (field, value) => {
    setScenario({ ...scenario, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="scenario-form-container">
      <h2 className="scenario-form-title">Plan Your Financial Future</h2>
      <div className="ai-suggestion-box">
        <span className="ai-icon">🤖</span>
        <p className="ai-suggestion-text">{aiSuggestion}</p>
      </div>
      <form onSubmit={handleSubmit} className="scenario-form">
        <div className="form-group">
          <label className="form-label">Scenario Title</label>
          <input
            ref={titleRef}
            type="text"
            value={scenario.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`form-input ${errors.title ? "input-error" : ""}`}
            placeholder="e.g., New Job Opportunity"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Scenario Type</label>
          <select
            value={scenario.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="form-input"
          >
            <option value="career">Career Change</option>
            <option value="investment">Investment</option>
            <option value="purchase">Major Purchase</option>
            <option value="retirement">Retirement</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            value={scenario.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="form-input"
          >
            <option value="general">General</option>
            <option value="housing">Housing</option>
            <option value="transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="retirement">Retirement</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Amount ($)</label>
          <input
            type="number"
            value={scenario.amount}
            onChange={(e) => handleChange("amount", Number(e.target.value))}
            className={`form-input ${errors.amount ? "input-error" : ""}`}
            placeholder="e.g., 5000"
            min="0"
          />
          {errors.amount && <span className="error-text">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Timeframe (Months)</label>
          <input
            type="number"
            value={scenario.timeframe}
            onChange={(e) => handleChange("timeframe", Number(e.target.value))}
            className={`form-input ${errors.timeframe ? "input-error" : ""}`}
            placeholder="e.g., 12"
            min="1"
          />
          {errors.timeframe && (
            <span className="error-text">{errors.timeframe}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Risk Level</label>
          <select
            value={scenario.riskLevel}
            onChange={(e) => handleChange("riskLevel", e.target.value)}
            className="form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Expected Return (%)</label>
          <input
            type="number"
            value={scenario.expectedReturn}
            onChange={(e) =>
              handleChange("expectedReturn", Number(e.target.value))
            }
            className={`form-input ${
              errors.expectedReturn ? "input-error" : ""
            }`}
            placeholder="e.g., 5"
            min="0"
            step="0.1"
          />
          {errors.expectedReturn && (
            <span className="error-text">{errors.expectedReturn}</span>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Monthly Contribution ($)</label>
          <input
            type="number"
            value={scenario.monthlyContribution}
            onChange={(e) =>
              handleChange("monthlyContribution", Number(e.target.value))
            }
            className={`form-input ${
              errors.monthlyContribution ? "input-error" : ""
            }`}
            placeholder="e.g., 200"
            min="0"
          />
          {errors.monthlyContribution && (
            <span className="error-text">{errors.monthlyContribution}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label className="form-label checkbox-label">
            <input
              type="checkbox"
              checked={scenario.isRecurring}
              onChange={(e) => handleChange("isRecurring", e.target.checked)}
            />
            Recurring Scenario (e.g., monthly contributions)
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea
            value={scenario.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="form-input textarea"
            placeholder="Additional details or goals..."
            rows="4"
          />
        </div>

        <button type="submit" className="submit-button">
          Create Scenario
        </button>
      </form>
    </div>
  );
};

export default ScenarioForm;
