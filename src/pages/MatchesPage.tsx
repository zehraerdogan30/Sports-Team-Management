import React, { useState } from "react";
import "../components/Body.css";
import "./TeamList.css";

type MatchStatus = "Upcoming" | "Finished";

type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  status: MatchStatus;
  score?: string;
  competition: string;
};

const initialMatches: Match[] = [
  {
    id: 1,
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    date: "2025-03-12",
    time: "20:45",
    venue: "Camp Nou",
    status: "Upcoming",
    competition: "La Liga",
  },
  {
    id: 2,
    homeTeam: "Beşiktaş",
    awayTeam: "Tenerife CD",
    date: "2025-02-01",
    time: "19:00",
    venue: "Vodafone Park",
    status: "Upcoming",
    competition: "Friendly",
  },
  {
    id: 3,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    date: "2025-01-10",
    time: "21:00",
    venue: "Santiago Bernabéu",
    status: "Finished",
    score: "2 : 2",
    competition: "Copa del Rey",
  },
  {
    id: 4,
    homeTeam: "Beşiktaş",
    awayTeam: "Real Madrid",
    date: "2024-12-18",
    time: "18:30",
    venue: "Vodafone Park",
    status: "Finished",
    score: "1 : 0",
    competition: "Friendly",
  },
];

const MatchesPage: React.FC = () => {
  const [filter, setFilter] = useState<MatchStatus | "All">("All");

  const filteredMatches =
    filter === "All"
      ? initialMatches
      : initialMatches.filter((m) => m.status === filter);

  return (
    <div className="app-shell">
      <main className="app-main">
        <section className="panel">
          <header className="panel-header matches-header">
            <div>
              <h1 className="panel-title">Matches</h1>
              <p className="panel-subtitle">
                Match schedule and recent results for your managed teams.
              </p>
            </div>

            <div className="match-filters">
              <button
                type="button"
                className={
                  "match-filter-btn" + (filter === "All" ? " match-filter-btn--active" : "")
                }
                onClick={() => setFilter("All")}
              >
                All
              </button>
              <button
                type="button"
                className={
                  "match-filter-btn" +
                  (filter === "Upcoming" ? " match-filter-btn--active" : "")
                }
                onClick={() => setFilter("Upcoming")}
              >
                Upcoming
              </button>
              <button
                type="button"
                className={
                  "match-filter-btn" +
                  (filter === "Finished" ? " match-filter-btn--active" : "")
                }
                onClick={() => setFilter("Finished")}
              >
                Finished
              </button>
            </div>
          </header>

          <div className="matches-list">
            {filteredMatches.map((match) => (
              <article key={match.id} className="match-card">
                <div className="match-main">
                  <div className="match-teams">
                    <span className="match-team">{match.homeTeam}</span>
                    <span className="match-vs">vs</span>
                    <span className="match-team">{match.awayTeam}</span>
                  </div>

                  <div className="match-meta">
                    <span className="match-date">
                      {match.date} • {match.time}
                    </span>
                    <span className="match-venue">{match.venue}</span>
                  </div>
                </div>

                <div className="match-side">
                  <span
                    className={
                      "match-status match-status--" + match.status.toLowerCase()
                    }
                  >
                    {match.status}
                  </span>

                  <span className="match-competition">
                    {match.competition}
                  </span>

                  {match.status === "Finished" && match.score && (
                    <span className="match-score">{match.score}</span>
                  )}
                </div>
              </article>
            ))}

            {filteredMatches.length === 0 && (
              <p className="players-empty">No matches for this filter.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MatchesPage;
