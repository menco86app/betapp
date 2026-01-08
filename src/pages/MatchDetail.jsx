// src/pages/MatchDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecommended, getMatchMeta } from "../api";
import CommentTab from "../components/match/CommentTab";
import StatsTab from "../components/match/StatsTab";
import BetsTab from "../components/match/BetsTab";
import MatchSwitcher from "../components/match/MatchSwitcher";
import MiniSchedina from "../components/schedina/MiniSchedina";
import { useSchedinaStore } from "../store/schedinaStore";
import { getMarketGroup } from "../utils/marketGroups";

const CATEGORY_MAP = {
  ANCHOR: "BASE",
  CONFIDENCE: "PRUDENTE",
  VALUE: "AGGRESSIVA",
};

const CATEGORY_CLASS = {
  BASE: "base",
  PRUDENTE: "prudente",
  AGGRESSIVA: "aggressiva",
};

export default function MatchDetail() {
  const { matchKey } = useParams();
  const decodedKey = useMemo(() => decodeURIComponent(matchKey), [matchKey]);

  const [tab, setTab] = useState("comment");
  const [bets, setBets] = useState([]);
  const [matchMeta, setMatchMeta] = useState(null);
  const [loadingBets, setLoadingBets] = useState(true);
  const [errBets, setErrBets] = useState("");
const schedina = useSchedinaStore(state => state.schedina);
const addBet = useSchedinaStore(state => state.addBet);
const removeBet = useSchedinaStore(state => state.removeBet);
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoadingBets(true);
        const data = await getRecommended(decodedKey);
        if (!alive) return;

        setBets(
          Array.isArray(data)
            ? data.map(b => ({
                ...b,
                id: `${decodedKey}__${b.market}`,
                uiCategory: CATEGORY_MAP[b.category],
                uiClass: CATEGORY_CLASS[CATEGORY_MAP[b.category]],
              }))
            : []
        );
      } catch {
        if (!alive) return;
        setErrBets("Errore caricamento scommesse");
      } finally {
        if (!alive) return;
        setLoadingBets(false);
      }

      try {
        const meta = await getMatchMeta(decodedKey);
        if (!alive) return;
        setMatchMeta(meta);
      } catch {
        setMatchMeta(null);
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
          <Link to={`/matches/${encodeURIComponent(decodedKey)}`}

            className="link-btn"
          >
            📋 Tutte le scommesse
          </Link>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab==="comment"?"active":""}`} onClick={()=>setTab("comment")}>
          📝 Commento
        </button>
        <button className={`tab ${tab==="stats"?"active":""}`} onClick={()=>setTab("stats")}>
          📈 Statistiche
        </button>
        <button className={`tab ${tab==="bets"?"active":""}`} onClick={()=>setTab("bets")}>
          ✅ Scommesse
        </button>
      </div>

      {tab === "comment" && (
        <div className="content-box comment-box">
          <CommentTab comment={matchMeta?.comment} />
        </div>
      )}

      {tab === "stats" && (
        <div className="content-box stats-box">
          <StatsTab meta={matchMeta} />
        </div>
      )}

      {tab === "bets" && (
        <div className="two-columns">
          <div className="main-column">
            <div className="content-box content-bets">
              <div className="legend center white">
                <span className="badge base" /> BASE
                <span className="badge prudente" /> PRUDENTE
                <span className="badge aggressiva" /> AGGRESSIVA
              </div>

              <BetsTab
                bets={bets}
                loading={loadingBets}
                err={errBets}
                schedina={schedina}
                onToggleSchedina={toggleSchedina}
              />
            </div>
          </div>

          <div className="side-column">
            <MiniSchedina />
          </div>
        </div>
      )}
    </div>
  );
}
