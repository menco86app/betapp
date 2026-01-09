import { useNavigate } from "react-router-dom";

export default function PreHome() {
  const navigate = useNavigate();

  const enterAsGuest = () => {
    localStorage.setItem("userRole", "guest");
    navigate("/home");
  };

  return (
    <div className="prehome">


      {/* HEADER */}
      <header className="prehome-header">
        <div className="logo">⚽ MencoBet</div>
        <button className="link-btn" onClick={() => navigate("/login")}>
          Accedi
        </button>
      </header>

      {/* HERO */}

      <section className="hero">
        <h1>Analisi calcio. Value bet. Decisioni migliori.</h1>
        <p>
          Modelli statistici avanzati per individuare value bet reali,
          con dati chiari e leggibili.
        </p>

        <div className="hero-actions">
          <button className="btn primary" onClick={enterAsGuest}>
            🚀 Entra come ospite
          </button>
          <button className="btn secondary" onClick={() => navigate("/login")}>
            🔐 Accedi / Registrati
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          📊 <h3>Statistiche avanzate</h3>
          <p>Ultime 6 gare, forma, gol, trend.</p>
        </div>
        <div className="feature-card">
          💰 <h3>Value Bet</h3>
          <p>EV, probabilità reali e mercati selezionati.</p>
        </div>
        <div className="feature-card">
          🤖 <h3>Modello matematico</h3>
          <p>Analisi automatica, senza emozioni.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2026 MencoBet</span>
        <div className="footer-links">
          <a>Privacy</a>
          <a>Cookie</a>
          <a>Disclaimer</a>
        </div>
      </footer>

    </div>
  );
}
