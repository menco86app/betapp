// src/components/schedina/MiniSchedina.jsx
import { useNavigate } from "react-router-dom";
import { useSchedinaStore } from "../../store/schedinaStore";

export default function MiniSchedina() {
  const navigate = useNavigate();
  const schedina = useSchedinaStore(state => state.schedina);
  const clear = useSchedinaStore(state => state.clear);

  const quotaTotale = schedina.reduce(
    (acc, b) => acc * Number(b.odds || 1),
    1
  );

  const countLabel =
    schedina.length === 1
      ? "1 Evento selezionato"
      : `${schedina.length} Eventi selezionati`;

  return (
    <div className="card mini-schedina">
      {/* HEADER */}
      <div className="mini-header centered">
        <div className="mini-title">🧾 Schedina</div>

        {schedina.length > 0 && (
          <button
            className="mini-clear"
            onClick={clear}
            title="Svuota schedina"
          >
            <div className="mini-clear-text">Svuota schedina</div>
            🗑️
          </button>
        )}
      </div>

      {/* CONTEGGIO */}
      <div className="mini-count centered">
        {countLabel}
      </div>

      {/* QUOTA */}
      <div className="mini-quota centered">
        Quota totale <b>{quotaTotale.toFixed(2)}</b>
      </div>

      {/* CTA */}
      <div className="mini-cta">
        <button
          className="mini-go"
          onClick={() => navigate("/schedina")}
        >
          Vai alla schedina →
        </button>
      </div>
    </div>
  );
}
