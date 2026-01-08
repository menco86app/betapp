// src/components/schedina/SchedinaList.jsx
import { useSchedinaStore } from "../../store/schedinaStore";
import SchedinaRow from "./SchedinaRow";

export default function SchedinaList() {
  const schedina = useSchedinaStore(state => state.schedina);

  if (schedina.length === 0) {
    return (
      <div className="card">
        ⚠️ Nessuna scommessa selezionata
      </div>
    );
  }

  return (
    <div className="card schedina-list">
      {schedina.map(bet => (
        <SchedinaRow key={bet.id} bet={bet} />
      ))}
    </div>
  );
}
