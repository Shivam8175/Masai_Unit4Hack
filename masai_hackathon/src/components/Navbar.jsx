import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Financial Time Machine</h1>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Dashboard
          </Link>
          <Link to="/scenario" className="navbar-link">
            New Scenario
          </Link>
          <Link to="/visualization" className="navbar-link">
            Visualization
          </Link>
          <Link to="/past-analysis" className="navbar-link">
            Past Analysis
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
