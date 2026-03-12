import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import type { Team } from "../types";
import "./Body.css";

const Body: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTeamName, setNewTeamName] = useState("");

  // Tüm takımları çek
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const res = await api.get<Team[]>("/teams");
        setTeams(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not load teams.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Yeni takım ekle
  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTeamName.trim()) return;

    try {
      const res = await api.post<Team>("/teams", {
        name: newTeamName.trim(),
      });

      setTeams((prev) => [...prev, res.data]);
      setNewTeamName("");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Could not add team.");
    }
  };

  // Takım sil
  const handleDeleteTeam = async (id: number | string | undefined) => {
    if (id === undefined) return;

    try {
      await api.delete(`/teams/${id}`);
      setTeams((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError("Could not delete team.");
    }
  };

  return (
    <div className="app-shell">
      <main className="app-main">
        <section className="panel">
          <header className="panel-header">
            <h1 className="panel-title">Teams</h1>
            <p className="panel-subtitle">
              Manage professional clubs, squads and rosters.
            </p>
          </header>

          {loading && <p className="panel-info-text">Loading teams...</p>}
          {error && <p className="panel-error-text">{error}</p>}

          <div className="team-pills">
            {teams.map((team) => (
              <div key={team.id} className="team-pill">
                <Link
                  to={`/team/${team.id}`}
                  className="team-pill-name"
                >
                  {team.name}
                </Link>
                <button
                  type="button"
                  className="team-pill-remove"
                  onClick={() => handleDeleteTeam(team.id)}
                >
                  ×
                </button>
              </div>
            ))}

            {!loading && !error && teams.length === 0 && (
              <p className="panel-info-text">
                No teams yet. Add your first team below.
              </p>
            )}
          </div>

          <div className="add-team-card">
            <h2 className="add-team-title">Add New Team</h2>
            <form className="add-team-form" onSubmit={handleAddTeam}>
              <input
                className="add-team-input"
                placeholder="Team name"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
              <button type="submit" className="add-team-btn">
                Add Team
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Body;
