import React, { useEffect, useState } from "react";
import api from "../api/api";
import type { Player } from "../types";
import "../components/Body.css";
import "./TeamList.css";

const PlayersPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const res = await api.get<Player[]>("/players");
        setPlayers(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not load players.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="app-shell">
      <main className="app-main">
        <section className="panel">
          <header className="panel-header">
            <h1 className="panel-title">Players</h1>
            <p className="panel-subtitle">
              Overview of all players across your teams.
            </p>
          </header>

          {loading && <p>Loading players...</p>}
          {error && <p className="error-text">{error}</p>}

          <div className="players-list">
            {players.map((p) => (
              <div key={p.id} className="player-row">
                <div className="player-main">
                  <span className="player-number">#{p.number}</span>
                  <span className="player-name">{p.name}</span>
                </div>
                <div className="player-meta">
                  <span className="player-position">
                    {p.position} · Team {p.teamId}
                  </span>
                </div>
              </div>
            ))}

            {!loading && !error && players.length === 0 && (
              <p className="players-empty">No players found.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayersPage;
