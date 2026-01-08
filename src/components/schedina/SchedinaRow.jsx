// src/components/schedina/SchedinaRow.jsx
import { useSchedinaStore } from "../../store/schedinaStore";

export default function SchedinaRow({ bet }) {
  const removeBet = useSchedinaStore(state => state.removeBet);

  return (
    <div className="schedina-row">
<div className="schedina-info">
  <div className="schedina-match">
    {bet.match}
  </div>

  {bet.marketGroup && (
    <div className="schedina-market-group">
      {bet.marketGroup}
    </div>
  )}

  <div className="schedina-market">
    {bet.market}
  </div>
</div>


      <div className="schedina-right">
        <div className="schedina-odds">
          Quota <b>{Number(bet.odds).toFixed(2)}</b>
        </div>

        <button
          className="schedina-remove"
          onClick={() => removeBet(bet.id)}
          title="Rimuovi scommessa"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
