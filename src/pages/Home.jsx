// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMatches } from "../api";
import { Skeleton } from "../components/ui/Skeleton";

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await getMatches();
        if (!alive) return;
        setMatches(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!alive) return;
        setErr(e.message || "Errore API");
        setMatches([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => (alive = false);
  }, []);

return (
  <div className="app-container">
  

    {/* HEADER */}
    <div className="page-header">
      {/* SINISTRA */}
      <div className="header-links">
        <span className="link-btn active">🏠 Home</span>
      </div>

      {/* CENTRO */}
      <div className="header-center">
        <strong>BETAPP Usa la testa 🧠</strong>
      </div>

      {/* DESTRA */}
      <div className="header-right">
        <button className="link-btn subtle">
          🔐 Login
        </button>
      </div>
    </div>

    <div className="home-box">
      <h1 className="page-title">⚽ Partite di oggi</h1>
      <div className="page-subtitle">
        Analisi pre-match e value bet disponibili
      </div>

      {loading && (
        <div className="list">
          {[1, 2, 3].map(i => (
            <div key={i} className="card">
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </div>
          ))}
        </div>
      )}

      {err && <div className="error-box">❌ {err}</div>}

      {!loading && !err && matches.length === 0 && (
        <div>Nessuna partita trovata.</div>
      )}

      {!loading && !err && (
        <div className="list">
          {matches.map(m => (
            <div
  key={m.matchKey}
  className="card home-card"
  onClick={() =>
    navigate(`/match/${encodeURIComponent(m.matchKey)}`)
  }
>
  <div className="home-match">
    {m.homeTeam} – {m.awayTeam}
  </div>

  <div className="home-meta">
    Consigliate <b>{m.numRecommended}</b> · Value <b>{m.numValue}</b>
  </div>
</div>

          ))}
        </div>
      )}
    </div>
    </div>
  );
}
