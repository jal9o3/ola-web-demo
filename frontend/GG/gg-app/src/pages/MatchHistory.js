import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MatchHistory.css";

const MatchHistory = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  const handleBackButtonClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/history/ai/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch match history");
        }
        const data = await response.json();
        console.log("Fetched match history:", data);
        setMatches(data.results);
      } catch (error) {
        console.error("Error fetching match history:", error);
      }
    };

    fetchMatchHistory();
  }, []);

  return (
    <div className="match-history-container">
      <button className="back-button" onClick={handleBackButtonClick}>
        ⬅ Back
      </button>
      <h2>Match History</h2>
      <div className="match-list">
        {matches.map((match) => {
          const winner = match.player_to_move === "B" ? "Red" : "Blue";
          const playerWon = winner === "Blue";
          
          return (
            <div
              key={match.id}
              className={`match-item ${playerWon ? "win" : "loss"}`}
              onClick={() => navigate(`/walkthrough?id=${match.id}`)}
            >
              <p>
                <strong>Game {match.id}</strong>
              </p>
              <p>Turns: {match.turn_number}</p>
              <p>Winner: {winner}</p>
              <p className="result-tag">{playerWon ? "You Won" : "You Lost"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchHistory;