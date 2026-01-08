// src/components/match/BetsTab.jsx
import { Skeleton } from "../ui/Skeleton";

export default function BetsTab({
  bets,
  loading,
  err,
  schedina = [],
  onToggleSchedina
}) {
  if (loading) {
    return (
      <div className="list">
        {[1, 2, 3].map(i => (
          <div key={i} className="card">
            <Skeleton />
            <Skeleton width="50%" />
          </div>
        ))}
      </div>
    );
  }

  if (err) return <div className="error-box">❌ {err}</div>;
  if (!bets || bets.length === 0) return <div>Nessuna scommessa.</div>;

  return (
    <div className="list">
      {bets.map(b => {
        const checked = schedina.some(s => s.id === b.id);

        return (
          <div key={b.id} className="card">

            {/* HEADER */}
<div className="bet-header">
  <div className="bet-title">
    <strong>{b.market}</strong>
  </div>

  <span className={`badge-dot ${b.uiClass}`} />
</div>


            {/* INFO */}
            <div className="bet-info center">
              Quota <b>{b.odds}</b> · Prob <b>{(b.prob * 100).toFixed(1)}%</b>
            </div>

            <div className="bet-ev center">
              EV <b>{Number(b.ev).toFixed(3)}</b>
            </div>

            {/* 👇 AGGIUNGI ALLA SCHEDINA */}
            <div className="bet-add">
              <label className="bet-add-label">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleSchedina(b)}
                />
                <span>Aggiungi alla schedina</span>
              </label>
            </div>

          </div>
        );
      })}
    </div>
  );
}
