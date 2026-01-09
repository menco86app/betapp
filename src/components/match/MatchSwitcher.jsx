//src/components/match/MatchSwitcher.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getMatches } from "../../api";

export default function MatchSwitcher({ currentMatchKey }) {
  const [open, setOpen] = useState(false);
  const [matches, setMatches] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // 🧠 capiamo dove siamo DAVVERO
const isAllBets = location.pathname.startsWith("/matches");

  useEffect(() => {
    (async () => {
      const data = await getMatches();
      setMatches(Array.isArray(data) ? data : []);
    })();
  }, []);

  const handleSelect = (key) => {
    setOpen(false);

navigate(
  isAllBets
    ? `/matches/${encodeURIComponent(key)}`
    : `/match/${encodeURIComponent(key)}`
);

  };

  return (
    <div className="match-switcher">
<button
  className={`match-title ${!currentMatchKey ? "placeholder" : ""}`}
  onClick={() => setOpen(!open)}
>
  📊 {currentMatchKey || "Seleziona un incontro"}
  <span className={`arrow ${open ? "open" : ""}`}>▼</span>
</button>



      {open && (
        <div className="match-dropdown">
          {matches.map((m) => (
            <div
              key={m.matchKey}
              className={`match-option ${
                m.matchKey === currentMatchKey ? "active" : ""
              }`}
              onClick={() => handleSelect(m.matchKey)}
            >
              {m.matchKey}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
