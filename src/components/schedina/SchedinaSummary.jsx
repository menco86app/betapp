// src/components/schedina/SchedinaSummary.jsx
import { useMemo } from "react";
import { useSchedinaStore } from "../../store/schedinaStore";

export default function SchedinaSummary() {
  const schedina = useSchedinaStore(s => s.schedina);
  const stake = useSchedinaStore(s => s.stake);
  const setStake = useSchedinaStore(s => s.setStake);

  // 🔢 quota totale
  const quotaTotale = useMemo(() => {
    return schedina.reduce(
      (acc, b) => acc * Number(b.odds || 1),
      1
    );
  }, [schedina]);

  // 🎁 bonus stile Sisal
  const bonusPercent = useMemo(() => {
    const eventi = schedina.length;

    if (eventi < 2) return 0;
    if (quotaTotale < 2.5) return 0;
    if (eventi >= 2 && quotaTotale < 5) return 0.05;
    if (eventi >= 3 && quotaTotale < 10) return 0.1;
    if (eventi >= 4 && quotaTotale >= 10) return 0.15;

    return 0;
  }, [schedina.length, quotaTotale]);

  // 💰 vincita
  const vincitaBase = stake * quotaTotale;
  const bonusVal = vincitaBase * bonusPercent;
  const vincitaTotale = vincitaBase + bonusVal;

  return (
    <div className="card schedina-summary">
      <div className="row">
        <span>Puntata</span>
        <div className="stake-controls">
          <button onClick={() => setStake(Math.max(1, stake - 1))}>−</button>
          <input
            type="number"
            min={1}
            value={stake}
            onChange={e => setStake(Number(e.target.value))}
          />
          <button onClick={() => setStake(stake + 1)}>+</button>
        </div>
      </div>

      <div className="row">
        <span>Quota totale</span>
        <b>{quotaTotale.toFixed(2)}</b>
      </div>

      <div className="row">
        <span>Bonus</span>
        <b>+{(bonusPercent * 100).toFixed(0)}%</b>
      </div>

      <div className="row highlight">
        <span>Vincita potenziale</span>
        <b>{vincitaTotale.toFixed(2)} €</b>
      </div>
    </div>
  );
}
