// src/api.js
const API =
  "https://script.google.com/macros/s/AKfycbxIG1F_oJHMLoUAxCJrYDMxDzLV4YU67J_7wvjnv1KcW78Oj18IXcBx1wklYLU1hD8Rag/exec"; // <-- URL MENCOBET (quello del deploy pubblico)

// helper: gestisce sia array che oggetti e intercetta {error:...}
async function fetchJson(url) {
  const r = await fetch(url, { cache: "no-store" });
  const text = await r.text();           // Apps Script spesso è più safe così
  const data = JSON.parse(text);

  if (data && typeof data === "object" && !Array.isArray(data) && data.error) {
    throw new Error(data.message || data.error || "API error");
  }
  return data;
}

export async function getMatches() {
  const data = await fetchJson(`${API}?action=matches`);
  return Array.isArray(data) ? data : [];
}

export async function getRecommended(matchKey) {
  const data = await fetchJson(
    `${API}?action=recommended&matchKey=${encodeURIComponent(matchKey)}`
  );
  return Array.isArray(data) ? data : [];
}

export async function getAllBets(matchKey) {
  const data = await fetchJson(
    `${API}?action=allbets&matchKey=${encodeURIComponent(matchKey)}`
  );
  return Array.isArray(data) ? data : [];
}

export async function getMatchMeta(matchKey) {
  // ORA passa dallo stesso WebApp pubblico
  return await fetchJson(
    `${API}?action=matchMeta&matchKey=${encodeURIComponent(matchKey)}`
  );
}
