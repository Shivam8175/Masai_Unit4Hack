import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ScenarioForm from "./pages/ScenarioForm";
import Visualization from "./pages/Visualization";
import PastAnalysis from "./pages/PastAnalysis";
import AddIncome from "./pages/Addincome";
import LogExpense from "./pages/LogExpense";
import AdjustSavings from "./pages/AdjustSavings";

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scenario" element={<ScenarioForm />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/past-analysis" element={<PastAnalysis />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/log-expense" element={<LogExpense />} />
            <Route path="/adjust-savings" element={<AdjustSavings />} />
            <Route path="/adjust-savings" element={<AdjustSavings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;
