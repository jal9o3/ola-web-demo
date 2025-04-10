import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

const Leaderboard = () => {
  const navigate = useNavigate();
  
  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const [scores, setScores] = useState([
    {name: 'Carlos Magsen', score: 4},
    {name: 'Hikaru Nagasaki', score: 12},
    {name: 'Anonymous', score: 20},
    {name: 'Park Bo Gum', score: 29},
    {name: 'Anonymous', score: 31},
    {name: 'Zhong Xi Na', score: 35},
  ]);
  const [difficulty, setDifficulty] = useState('Easy'); // Default difficulty

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:3000/leaderboard');
        const text = await response.text();  // Get raw response as text
        console.log(text);  // Log the raw response to see what is returned
    
        // If the response is JSON, parse it
        const data = JSON.parse(text);
        setScores(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };    
    fetchScores();
  }, [difficulty]); // Re-fetch when difficulty changes
  

  return (
    <div className="leaderboard-container">
      <button className="back-button" onClick={handleBackButtonClick}>
        ⬅ Back
      </button>
      <h1 className="leaderboard-title">Leaderboard</h1>
      
      <div className="difficulty-select">
        <label htmlFor="difficulty">Difficulty: </label>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Fog">Fog</option>
        </select>
      </div>

      <div className="leaderboard-list">
        {scores.length > 0 ? (
          scores.map((user, index) => (
            <div key={index} className="leaderboard-item">
              <span className="rank">{index + 1}</span>
              <span className="username">{user.name}</span>
              <span className="score">{user.score}</span>
            </div>
          ))
        ) : (
          <p className="no-scores">No scores available for {difficulty}.</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
