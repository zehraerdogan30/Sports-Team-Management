import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import Warning from "../components/Warning";
import Info from "../components/Info";
import type { Team, Player } from "../types";

import "../components/Body.css";   // panel stili
import "./TeamList.css";          // oyuncu listesi stili

const TeamDetails: React.FC = () => {
  const { id } = useParams();
  const teamId = Number(id);

  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // yeni oyuncu formu
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerNumber, setNewPlayerNumber] = useState<number | "">("");
  const [newPlayerPosition, setNewPlayerPosition] = useState("");

  // takım + oyuncuları çek
  useEffect(() => {
    if (!teamId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [teamRes, playersRes] = await Promise.all([
          api.get<Team>(`/teams/${teamId}`),
          api.get<Player[]>("/players", { params: { teamId } }),
        ]);

        setTeam(teamRes.data);
        setPlayers(playersRes.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not load team details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teamId]);

  useEffect(() => {
    setPlayerCount(players.length);
  }, [players]);

  // Oyuncu ekleme
  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !teamId ||
      !newPlayerName.trim() ||
      !newPlayerPosition.trim() ||
      newPlayerNumber === ""
    ) {
      return;
    }

    try {
      const res = await api.post<Player>("/players", {
        teamId,
        name: newPlayerName.trim(),
        number: Number(newPlayerNumber),
        position: newPlayerPosition.trim(),
      });

      setPlayers((prev) => [...prev, res.data]);
      setNewPlayerName("");
      setNewPlayerNumber("");
      setNewPlayerPosition("");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Could not add player.");
    }
  };

  // Oyuncu sil
  const deletePlayer = async (pid: number | string) => {
    try {
      await api.delete(`/players/${pid}`);
    setPlayers((prev) => prev.filter((p) => p.id !== pid));
    } catch (err) {
      console.error(err);
      setError("Could not delete player.");
    }
  };

  if (!id || Number.isNaN(teamId)) {
    return <p>Invalid team id.</p>;
  }

  return (
    <div className="app-shell">
      <main className="app-main">
        <p className="back-link-wrapper">
          <Link to="/" className="back-link">
            ← Back to teams
          </Link>
        </p>

        {loading && <p>Loading team...</p>}
        {error && <p className="error-text">{error}</p>}

        {team && (
          <section className="panel">
            <header className="panel-header">
              <h1 className="panel-title">{team.name}</h1>
              <p className="panel-subtitle">
                Manage players, positions and squad for this team.
              </p>
            </header>

            {playerCount < 11 ? (
              <Warning
                message={`This team has only ${playerCount} players. It should have at least 11.`}
              />
            ) : (
              <Info
                message={`This team has ${playerCount} players. The team is complete.`}
              />
            )}

            {/* OYUNCU LİSTESİ */}
            <div className="players-list">
              {players.length === 0 ? (
                <p className="players-empty">
                  No players yet. Add the first player below.
                </p>
              ) : (
                players.map((p) => (
                  <div key={p.id} className="player-row">
                    <div className="player-main">
                      <span className="player-number">#{p.number}</span>
                      <span className="player-name">{p.name}</span>
                    </div>
                    <div className="player-meta">
                      <span className="player-position">{p.position}</span>
                      <button
                        type="button"
                        className="player-delete-btn"
                        onClick={() => deletePlayer(p.id!)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* YENİ OYUNCU FORMU */}
            <div className="add-player-card">
              <h2 className="add-team-title">Add New Player</h2>
              <form onSubmit={handleAddPlayer} className="add-player-form">
                <input
                  type="text"
                  placeholder="Name"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="add-team-input"
                />
                <input
                  type="number"
                  placeholder="Number"
                  value={newPlayerNumber}
                  onChange={(e) =>
                    setNewPlayerNumber(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  className="add-team-input"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={newPlayerPosition}
                  onChange={(e) => setNewPlayerPosition(e.target.value)}
                  className="add-team-input"
                />
                <button type="submit" className="add-team-btn">
                  Add Player
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default TeamDetails;
