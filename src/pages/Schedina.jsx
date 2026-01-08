// src/pages/Schedina.jsx
import { Link } from "react-router-dom";
import SchedinaList from "../components/schedina/SchedinaList";
import SchedinaSummary from "../components/schedina/SchedinaSummary";

export default function Schedina() {
  return (
    <div className="app-container">
      {/* HEADER */}
      <div className="page-header">
        <div className="header-left">
          <Link to="/matches" className="link-btn">
            ← Scommesse
          </Link>
        </div>

        <div className="header-center">
          <h2>📋 Schedina</h2>
        </div>

        <div className="header-right" />
      </div>

      {/* CONTENUTO */}
      <div className="two-columns">
        {/* COLONNA SINISTRA */}
        <div className="main-column">
          <SchedinaList />
        </div>

        {/* COLONNA DESTRA (STICKY) */}
        <div className="side-column sticky">
          <SchedinaSummary />
        </div>
      </div>
    </div>
  );
}
