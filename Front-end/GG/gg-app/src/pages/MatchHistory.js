import React from "react";
import { useNavigate } from "react-router-dom";
import "./MatchHistory.css";

const MatchHistory = () => {
  const navigate = useNavigate();
  const matches = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    sessionName: `Session ${i + 1}`,
    turnNumber: Math.floor(Math.random() * 50) + 10, // Random turn count
    winner: i % 2 === 0 ? "Red Team" : "Blue Team", // Alternate winners
  }));

  return (
    <div className="match-history-container">
      <h2>Match History</h2>
      <div className="match-list">
        {matches.map((match) => (
          <div
            key={match.id}
            className="match-item"
            onClick={() => navigate(`/walkthrough/${match.id}`)} // Redirect on click
          >
            <p><strong>{match.sessionName}</strong></p>
            <p>Turns: {match.turnNumber}</p>
            <p>Winner: {match.winner}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHistory;
