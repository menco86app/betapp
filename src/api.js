// src/api.js
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 12000);


// helper robusto
async function fetchJson(action, params = {}) {
  console.log("API_URL:", import.meta.env.VITE_API_URL);
  console.log("API_KEY:", import.meta.env.VITE_API_KEY);
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT);

  const qs = new URLSearchParams({
    action,
    key: API_KEY,
    ...params
  });

  try {
    const r = await fetch(`${API_URL}?${qs}`, {
      cache: "no-store",
      signal: ctrl.signal
    });

    const text = await r.text();

    if (!r.ok) {
      throw new Error(`HTTP ${r.status}`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Risposta non JSON dall'API");
    }

    if (data && typeof data === "object" && data.error) {
      throw new Error(data.message || data.error);
    }

    return data;
  } finally {
    clearTimeout(t);
  }
}

export const getMatches = async () => {
  const data = await fetchJson("matches");
  return Array.isArray(data) ? data : [];
};

export const getRecommended = async (matchKey) => {
  const data = await fetchJson("recommended", { matchKey });
  return Array.isArray(data) ? data : [];
};

export const getAllBets = async (matchKey) => {
  const data = await fetchJson("allbets", { matchKey });
  return Array.isArray(data) ? data : [];
};

export const getMatchMeta = async (matchKey) => {
  return await fetchJson("matchMeta", { matchKey });
};
