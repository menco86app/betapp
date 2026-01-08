// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Prehome from "./pages/Prehome.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MatchDetail from "./pages/MatchDetail.jsx";
import MatchAll from "./pages/MatchAll.jsx";
import Schedina from "./pages/Schedina.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Prehome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Dettaglio match */}
        <Route path="/match/:matchKey" element={<MatchDetail />} />

        {/* Tutte le scommesse */}
        <Route path="/matches" element={<MatchAll />} />
        <Route path="/matches/:matchKey" element={<MatchAll />} />

        {/* Schedina */}
        <Route path="/schedina" element={<Schedina />} />
      </Routes>
    </div>
  );
}
