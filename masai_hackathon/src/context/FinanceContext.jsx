import React, { createContext, useState, useEffect } from "react";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [finances, setFinances] = useState({
    income: 0,
    expenses: 0,
    savings: 0,
    investments: 0,
    spendingPatterns: [],
  });

  const [scenarios, setScenarios] = useState([]);
  const [pastDecisions, setPastDecisions] = useState([]);

  useEffect(() => {
    // Simulate fetching encrypted financial data
    const fetchData = async () => {
      // In a real app, this would be an API call with encryption
      const mockData = {
        income: 5000,
        expenses: 3000,
        savings: 10000,
        investments: 5000,
        spendingPatterns: [
          { category: "Food", amount: 500, frequency: "monthly" },
        ],
      };
      setFinances(mockData);
    };
    fetchData();
  }, []);

  const addScenario = (scenario) => {
    setScenarios([...scenarios, scenario]);
  };

  const addPastDecision = (decision) => {
    setPastDecisions([...pastDecisions, decision]);
  };

  return (
    <FinanceContext.Provider
      value={{
        finances,
        scenarios,
        pastDecisions,
        addScenario,
        addPastDecision,
        setFinances,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
