import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';
import clickSound from "../sounds/click.mp3";

const Leaderboard = () => {
  const navigate = useNavigate();
  
  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
    new Audio(clickSound).play();
  };

  const [scores, setScores] = useState([]);
  const [modelName, setModelName] = useState('csd10k');
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leaderboard/' + modelName + '/');
        const text = await response.text();  // Get raw response as text
        console.log(text);  // Log the raw response to see what is returned
    
        // If the response is JSON, parse it
        const data = JSON.parse(text);
        setScores(data.results.map(item => ({
          name: item.player_name,
          score: item.turns_taken
        })));
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };    
    fetchScores();
  }, [modelName]);
  

  return (
    <div className="leaderboard-container">
      <button className="back-button" onClick={handleBackButtonClick}>
        ⬅ Back
      </button>
      <h1 className="leaderboard-title">Leaderboard</h1>
      
      <div className="difficulty-select">
        <label htmlFor="difficulty">Difficulty: </label>
        <select id="difficulty" 
          value={modelName} 
          onChange={(e) => {
            new Audio(clickSound).play();
            setModelName(e.target.value)
          }}
          >
          <option value="fivelayer">Easy</option>
          <option value="fivelayer10k">Medium</option>
          <option value="csd10k">Hard</option>
          <option value="fog-mode">Fog</option>
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
          <p className="no-scores">No scores available for {modelName}.</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
