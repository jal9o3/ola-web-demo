import React from "react";
import "./MatchHistory.css";

const MatchHistory = () => {
  const matches = Array.from({ length: 20 }, (_, i) => `Match ${i + 1}`);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      {/* Match History Title */}
      <h1 className="match-title">MATCH HISTORY</h1>

      {/* Match Cards Container */}
      <div className="match-container">
        {matches.map((match, index) => (
          <div key={index} className="match-card">
            {match}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHistory;