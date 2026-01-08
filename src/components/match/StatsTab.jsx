// src/components/match/StatsTab.jsx

export default function StatsTab({ meta }) {
  const stats = meta?.stats;

  if (
    !meta ||
    !meta.home ||
    !meta.away ||
    !stats ||
    !stats.goalsFor ||
    !stats.goalsAgainst
  ) {
    return (
      <div className="card">
        <p>📊 Caricamento statistiche…</p>
      </div>
    );
  }

  const { home, away } = meta;

  return (
    <div className="duel-stats">

      {/* ================= HEADER ================= */}
      <div className="duel-header">
        <span>{home.team}</span>
        <span>{away.team}</span>
      </div>

      {/* ================= TOTALI GOL (ULTIME 6) ================= */}
      <StatDuel
         label={
  <>
    GOL FATTI
    <br />
    <span className="label-sub">Ultime 6</span>
  </>       
         }
        left={home.golFatti6}
        right={away.golFatti6}
        max={Math.max(home.golFatti6, away.golFatti6, 1)}
        better="higher"
      />

      <StatDuel
        label={
  <>
    GOL SUBITI
    <br />
    <span className="label-sub">Ultime 6</span>
  </>       
         }
        left={home.golSubiti6}
        right={away.golSubiti6}
        max={Math.max(home.golSubiti6, away.golSubiti6, 1)}
        better="lower"
      />

      {/* ================= FORMA ================= */}
      <div className="card form-card card-form">
        <div className="duel-bars">
          <div className="form-row">
            {stats.form.home.map((r, i) => (
              <span key={i} className={`form-dot ${r}`}>{r}</span>
            ))}
          </div>

          <div className="duel-label">
  FORMA
  <br />
  <span className="label-sub">Ultime 6</span>
</div>


          <div className="form-row">
            {stats.form.away.map((r, i) => (
              <span key={i} className={`form-dot ${r}`}>{r}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MEDIE ================= */}
      <StatDuel
        label={
  <>
    MEDIA GOL FATTI
    <br />
    <span className="label-sub">Ultime 6</span>
  </>
}
        left={home.mediaGolFatti6}
        right={away.mediaGolFatti6}
        max={Math.max(home.mediaGolFatti6, away.mediaGolFatti6, 1)}
        decimals
        better="higher"
      />

      <StatDuel
        label={
  <>
    MEDIA GOL SUBITI
    <br />
    <span className="label-sub">Ultime 6</span>
  </>
}
        left={home.mediaGolSubiti6}
        right={away.mediaGolSubiti6}
        max={Math.max(home.mediaGolSubiti6, away.mediaGolSubiti6, 1)}
        decimals
        better="lower"
      />

      {/* ================= GOL / NOGOL ================= */}
      <StatDuel
        label="% Gol"
        left={stats.btts.home * 100}
        right={stats.btts.away * 100}
        max={100}
        better="higher"
      />

      <StatDuel
        label="% NoGol"
        left={stats.nogol.home * 100}
        right={stats.nogol.away * 100}
        max={100}
        better="higher"
      />

      {/* ================= OVER ================= */}
      <StatDuel label="% Over 0.5" left={stats.over05.home * 100} right={stats.over05.away * 100} max={100} />
      <StatDuel label="% Over 1.5" left={stats.over15.home * 100} right={stats.over15.away * 100} max={100} />
      <StatDuel label="% Over 2.5" left={stats.over25.home * 100} right={stats.over25.away * 100} max={100} />
    </div>
  );
}

/* ======================================================
   DUELLO BASE
====================================================== */

function StatDuel({ label, left, right, max, decimals, better }) {
  const safeMax = max || 1;

  const leftPct = Math.min(100, (left / safeMax) * 100);
  const rightPct = Math.min(100, (right / safeMax) * 100);

  const leftBetter =
    better === "higher" ? left > right : left < right;
  const rightBetter =
    better === "higher" ? right > left : right < left;

  const fmt = v =>
    decimals
      ? Number(v || 0).toFixed(1)
      : Number(v || 0).toFixed(0);

  return (
    <div className="stat-duel">
      <div className="duel-values">
        <span>{fmt(left)}</span>
        <span>{fmt(right)}</span>
      </div>

      <div className="duel-bars">
        <div className={`bar left ${leftBetter ? "better" : ""}`}>
          <div className="fill" style={{ width: `${leftPct}%` }} />
        </div>

        <div className="duel-label">{label}</div>

        <div className={`bar right ${rightBetter ? "better" : ""}`}>
          <div className="fill" style={{ width: `${rightPct}%` }} />
        </div>
      </div>
    </div>
  );
}
