import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import "./PastAnalysis.css"; // Import the external CSS file

const PastAnalysis = () => {
  const { pastDecisions } = useContext(FinanceContext);

  return (
    <div className="past-analysis-container">
      <h2 className="past-analysis-title">Past Decisions Analysis</h2>
      <div className="past-analysis-card">
        {pastDecisions.length === 0 ? (
          <p className="no-decisions-message">No past decisions recorded.</p>
        ) : (
          <ul className="decisions-list">
            {pastDecisions.map((decision) => (
              <li key={decision.id} className="decision-item">
                <span className="decision-title">{decision.title}</span> -
                Impact: ${decision.impact}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PastAnalysis;
