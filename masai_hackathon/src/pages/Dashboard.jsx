import React, { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const { finances } = useContext(FinanceContext);
  const [savingsRate, setSavingsRate] = useState(0);
  const [trend, setTrend] = useState("neutral");
  const [suggestions, setSuggestions] = useState([]);
  const [aiQuery, setAiQuery] = useState("");
  const [aiConversation, setAiConversation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (finances.income > 0) {
      const rate = ((finances.savings / finances.income) * 100).toFixed(1);
      setSavingsRate(rate);

      if (rate > 20) setTrend("positive");
      else if (rate > 10) setTrend("neutral");
      else setTrend("negative");
    }

    const generateSuggestions = () => {
      const newSuggestions = [];

      if (finances.expenses > finances.income * 0.5) {
        const overspendPercent = (
          (finances.expenses / finances.income) * 100 -
          50
        ).toFixed(0);
        newSuggestions.push(
          `Reduce discretionary spending (currently spending ${overspendPercent}% above recommended)`
        );
      }

      if (finances.savings < finances.income * 0.1) {
        const shortfall = (finances.income * 0.1 - finances.savings).toFixed(0);
        newSuggestions.push(
          `Increase savings by $${shortfall} to reach 10% of income`
        );
      } else if (finances.savings < finances.income * 0.2) {
        newSuggestions.push(
          "Great start! Consider increasing savings to 20% for better financial security"
        );
      }

      if (
        finances.investments < finances.savings * 0.3 &&
        finances.savings > 0
      ) {
        newSuggestions.push(
          "Consider investing 30% of your savings for long-term growth"
        );
      }

      if (finances.savings < finances.expenses * 3) {
        newSuggestions.push(
          "Build your emergency fund to cover 3-6 months of expenses"
        );
      }

      if (finances.debt && finances.debt > 0) {
        if (finances.debt > finances.income * 0.4) {
          newSuggestions.push("Prioritize paying down high-interest debt");
        } else {
          newSuggestions.push(
            "Consider debt consolidation if you have multiple high-interest loans"
          );
        }
      }

      if (newSuggestions.length === 0) {
        newSuggestions.push(
          "Your financial habits are excellent! Keep up the good work!"
        );
      }

      return newSuggestions;
    };

    setSuggestions(generateSuggestions());
  }, [finances]);

  const handleAiQuery = () => {
    if (!aiQuery.trim()) return;

    const generateAiResponse = (query) => {
      const lowerQuery = query.toLowerCase();
      let response = "I'm not sure how to answer that. Could you clarify?";

      if (lowerQuery.includes("savings")) {
        response = `Your current savings are $${
          finances.savings?.toLocaleString() || "0"
        }. Your savings rate is ${savingsRate}%. ${
          savingsRate < 10
            ? "Try increasing your savings to at least 10% of your income."
            : savingsRate < 20
            ? "You're doing well, but consider saving 20% for better security."
            : "Excellent savings rate! Keep it up."
        }`;
      } else if (
        lowerQuery.includes("investment") ||
        lowerQuery.includes("invest")
      ) {
        response = `Your investments are currently $${
          finances.investments?.toLocaleString() || "0"
        }. ${
          finances.investments < finances.savings * 0.3 && finances.savings > 0
            ? "Consider allocating 30% of your savings to investments for growth."
            : "Your investment allocation looks balanced."
        }`;
      } else if (
        lowerQuery.includes("expense") ||
        lowerQuery.includes("spending")
      ) {
        response = `Your monthly expenses are $${
          finances.expenses?.toLocaleString() || "0"
        }, which is ${
          finances.expenses > 0 && finances.income > 0
            ? `${((finances.expenses / finances.income) * 100).toFixed(
                0
              )}% of your income`
            : "not calculated"
        }. ${
          finances.expenses > finances.income * 0.5
            ? "Try reducing discretionary spending to keep expenses below 50% of income."
            : "Your expenses are well-managed."
        }`;
      } else if (lowerQuery.includes("debt")) {
        response = finances.debt
          ? `Your debt is $${finances.debt.toLocaleString()}. ${
              finances.debt > finances.income * 0.4
                ? "Focus on paying down high-interest debt first."
                : "Consider consolidating or paying off smaller debts."
            }`
          : "You have no recorded debt. Great job!";
      } else if (lowerQuery.includes("emergency fund")) {
        response = `Your savings are $${
          finances.savings?.toLocaleString() || "0"
        }. ${
          finances.savings < finances.expenses * 3
            ? "Aim to build an emergency fund covering 3-6 months of expenses."
            : "Your emergency fund looks solid!"
        }`;
      }

      return response;
    };

    const response = generateAiResponse(aiQuery);
    setAiConversation([
      ...aiConversation,
      { type: "user", text: aiQuery },
      { type: "ai", text: response },
    ]);
    setAiQuery("");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Financial Dashboard</h1>
        <p className="dashboard-subtitle">Your complete financial overview</p>
      </header>

      <div className="metrics-grid">
        <div className="metric-card income-card">
          <div className="metric-icon">💰</div>
          <h3 className="metric-title">Monthly Income</h3>
          <p className="metric-value">
            ${finances.income?.toLocaleString() || "0"}
          </p>
          <p className="metric-description">Before taxes and deductions</p>
        </div>

        <div className="metric-card expenses-card">
          <div className="metric-icon">💸</div>
          <h3 className="metric-title">Monthly Expenses</h3>
          <p className="metric-value">
            ${finances.expenses?.toLocaleString() || "0"}
          </p>
          <div className="expense-breakdown">
            <span className="expense-ratio">
              {finances.expenses > 0 && finances.income > 0
                ? `${((finances.expenses / finances.income) * 100).toFixed(
                    0
                  )}% of income`
                : "N/A"}
            </span>
          </div>
        </div>

        <div className="metric-card savings-card">
          <div className="metric-icon">🏦</div>
          <h3 className="metric-title">Savings</h3>
          <p className="metric-value">
            ${finances.savings?.toLocaleString() || "0"}
          </p>
          <div className={`savings-rate ${trend}`}>
            Savings Rate: {savingsRate}%
          </div>
        </div>

        <div className="metric-card investments-card">
          <div className="metric-icon">📈</div>
          <h3 className="metric-title">Investments</h3>
          <p className="metric-value">
            ${finances.investments?.toLocaleString() || "0"}
          </p>
          <p className="metric-description">Total portfolio value</p>
        </div>
      </div>

      <div className="financial-health">
        <h3 className="section-title">Financial Health</h3>
        <div className="health-indicator">
          <div className={`health-meter ${trend}`}>
            <div
              className="meter-fill"
              style={{ width: `${Math.min(savingsRate, 100)}%` }}
            ></div>
          </div>
          <div className="health-labels">
            <span>Poor</span>
            <span>Fair</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>
      </div>

      <div className="advisor-card">
        <h3 className="advisor-title">
          <span className="ai-icon">🤖</span> AI Financial Advisor
        </h3>
        <div className="suggestions-container">
          <h4 className="suggestions-title">Personalized Suggestions</h4>
          {suggestions.map((suggestion, index) => (
            <div key={index} className={`suggestion-item ${trend}`}>
              <span className="suggestion-bullet">•</span>
              {suggestion}
            </div>
          ))}
        </div>
        <div className="ai-chat-container">
          <h4 className="ai-chat-title">Ask Your AI Advisor</h4>
          <div className="ai-conversation">
            {aiConversation.map((message, index) => (
              <div
                key={index}
                className={`ai-message ${
                  message.type === "user" ? "user-message" : "ai-response"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="ai-input-container">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Ask about savings, investments, debt..."
              className="ai-input"
              onKeyPress={(e) => e.key === "Enter" && handleAiQuery()}
            />
            <button onClick={handleAiQuery} className="ai-submit-button">
              Send
            </button>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3 className="section-title">Quick Actions</h3>
        <div className="action-buttons">
          <button
            onClick={() => navigate("/add-income")}
            className="action-button add-income"
          >
            Add Income
          </button>
          <button
            onClick={() => navigate("/log-expense")}
            className="action-button log-expense"
          >
            Log Expense
          </button>
          <button
            onClick={() => navigate("/adjust-savings")}
            className="action-button adjust-savings"
          >
            Adjust Savings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
