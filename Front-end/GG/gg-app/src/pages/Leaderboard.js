import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from an API or use static data
    const fetchScores = async () => {
      const response = await fetch('API_URL'); // Replace with your API URL
      const data = await response.json();
      setScores(data);
    };

    fetchScores();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <div className="leaderboard-list">
        {scores.map((user, index) => (
          <div key={index} className="leaderboard-item">
            <span className="rank">{index + 1}</span>
            <span className="username">{user.name}</span>
            <span className="score">{user.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;