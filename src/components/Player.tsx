import React from "react";
import "./Player.css";
import type { Player as PlayerType } from "../types";

interface PlayerProps {//ihtiyac listesi
  player: PlayerType;
  onEdit?: (player: PlayerType) => void;
  onDelete?: (id: PlayerType["id"]) => void;
}

const Player: React.FC<PlayerProps> = ({ player, onEdit, onDelete }) => {//verileri dısarıdan alıyor(baska component)
  return (
    <div className="player-card">
      <h3>
        #{player.number} {player.name}
      </h3>
      <p>Position: {player.position}</p>

      {(onEdit || onDelete) && (
        <div className="player-buttons">
          {onEdit && (
            <button className="edit-btn" onClick={() => onEdit(player)}>
              Edit
            </button>
          )}

          {onDelete && (
            <button
              className="delete-btn"
              onClick={() => onDelete(player.id)}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Player;
