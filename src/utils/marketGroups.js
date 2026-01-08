export function getMarketGroup(market) {
  // 🔒 NORMALIZZAZIONE DIFENSIVA
  const m = String(market ?? "").toLowerCase();

  // ESITO FINALE
  if (["1", "x", "2"].includes(m)) return "Esito Finale";

  // DOPPIA CHANCE
  if (["1x", "x2", "12"].includes(m)) return "Doppia Chance";

  // GOL / NOGOL
  if (m.includes("gol") && !m.includes("multi")) return "Gol / No Gol";

  // UNDER / OVER
  if (m.startsWith("under") || m.startsWith("over")) return "Under / Over";

  // MULTIGOL
  if (m.includes("multigol")) return "Multigol";

  // PRIMO TEMPO
  if (m.includes("pt")) return "Primo Tempo";

  // RISULTATO ESATTO (1-0, 2-1 ecc)
  if (/^\d+\s*-\s*\d+$/.test(m)) return "Risultato Esatto";

  // DATE / ALTRO SPORCO
  if (m.includes("t")) return "Altro";

  return "Altri Mercati";
}
