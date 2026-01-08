// src/pages/MatchAll.jsx
import { useEffect, useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAllBets } from "../api";
import BetsTab from "../components/match/BetsTab";
import { Skeleton } from "../components/ui/Skeleton";
import Accordion from "../components/ui/Accordion";
import { getMarketGroup } from "../utils/marketGroups";
import MatchSwitcher from "../components/match/MatchSwitcher";
import MiniSchedina from "../components/schedina/MiniSchedina";
import { useSchedinaStore } from "../store/schedinaStore";

const CATEGORY_MAP = {
  ANCHOR: "BASE",
  CONFIDENCE: "PRUDENTE",
  VALUE: "AGGRESSIVA",
  "CHECK NECESSARIO": "CHECK NECESSARIO",
};

const CATEGORY_CLASS = {
  BASE: "base",
  PRUDENTE: "prudente",
  AGGRESSIVA: "aggressiva",
  "CHECK NECESSARIO": "check",
};

export default function MatchAll() {
  const { matchKey } = useParams();
  const decodedKey = useMemo(
  () => (matchKey ? decodeURIComponent(matchKey) : ""),
  [matchKey]
);
  const navigate = useNavigate();

  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
const schedina = useSchedinaStore(state => state.schedina);
const addBet = useSchedinaStore(state => state.addBet);
const removeBet = useSchedinaStore(state => state.removeBet);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const data = await getAllBets(decodedKey);
        if (!alive) return;

        setBets(
          Array.isArray(data)
            ? data.map(b => {
                const uiCategory =
                  CATEGORY_MAP[b.family] || "CHECK NECESSARIO";

                return {
                  ...b,
                  uiCategory,
                  uiClass: CATEGORY_CLASS[uiCategory] || "check",
                  id: `${decodedKey}__${b.market}`,
                };
              })
            : []
        );
      } catch {
        if (!alive) return;
        setErr("Errore caricamento scommesse");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => (alive = false);
  }, [decodedKey]);

function toggleSchedina(bet) {
  schedina.find(b => b.id === bet.id)
    ? removeBet(bet.id)
    : addBet({
        ...bet,
        match: decodedKey,
        marketGroup: getMarketGroup(bet.market)
      });
}


  const grouped = useMemo(() => {
    return bets.reduce((acc, b) => {
      const group = getMarketGroup(b.market);
      if (!acc[group]) acc[group] = [];
      acc[group].push(b);
      return acc;
    }, {});
  }, [bets]);

  return (
    <div className="app-container">
      <div className="page-header">
        <div className="header-left">
          <Link to="/" className="link-btn">← Home</Link>
        </div>

        <div className="header-center">
          <MatchSwitcher currentMatchKey={decodedKey} mode="all" />
        </div>

        <div className="header-right">
          <button
            className="link-btn subtle"
            onClick={() => navigate(`/match/${encodeURIComponent(decodedKey)}`)}
          >
            ← Dettaglio match
          </button>
        </div>
      </div>

      <div className="two-columns">
        <div className="main-column">
          <div className="content-box content-bets">
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

            {!loading && !err && (
              <>
                <div className="legend center white">
                  <span className="badge base" /> BASE
                  <span className="badge prudente" /> PRUDENTE
                  <span className="badge aggressiva" /> AGGRESSIVA
                  <span className="badge check" /> CHECK NECESSARIO
                </div>

                {Object.entries(grouped).map(([groupName, groupBets]) => (
                  <Accordion
                    key={groupName}
                    title={`${groupName} (${groupBets.length})`}
                    compact
                  >
                    <BetsTab
                      bets={groupBets}
                      loading={false}
                      err=""
                      schedina={schedina}
                      onToggleSchedina={toggleSchedina}
                    />
                  </Accordion>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="side-column">
          <MiniSchedina />
        </div>
      </div>
    </div>
  );
}
