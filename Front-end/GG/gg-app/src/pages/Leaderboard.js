import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

const Leaderboard = () => {
  const navigate = useNavigate();
  
  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const [scores, setScores] = useState([]);
  const [selectedMode, setSelectedMode] = useState('Easy'); // State for the selected mode


  useEffect(() => {
    // Fetch leaderboard data from an API or use static data
    const fetchScores = async () => {
      const response = await fetch('API URL'); // Replace with your API URL
      const data = await response.json();
      setScores(data);
    };

    fetchScores();
  }, []);

  useEffect(() => { //for testing response
  // Use static data for testing
  const staticData = [
    { name: 'Player1', score: 100, mode: 'Easy' },
  { name: 'Player2', score: 90, mode: 'Medium' },
  { name: 'Player3', score: 80, mode: 'Hard' },
  { name: 'Player4', score: 70, mode: 'Fog' },
  { name: 'Player5', score: 60, mode: 'Easy' },
  { name: 'Player6', score: 50, mode: 'Medium' },
  { name: 'Player7', score: 40, mode: 'Hard' },
  { name: 'Player8', score: 30, mode: 'Fog' },
  { name: 'Player1', score: 100, mode: 'Easy' },
  { name: 'Player2', score: 90, mode: 'Medium' },
  { name: 'Player3', score: 80, mode: 'Hard' },
  { name: 'Player4', score: 70, mode: 'Fog' },
  { name: 'Player5', score: 60, mode: 'Easy' },
  { name: 'Player6', score: 50, mode: 'Medium' },
  { name: 'Player7', score: 40, mode: 'Hard' },
  { name: 'Player8', score: 30, mode: 'Fog' },
  { name: 'Player1', score: 100, mode: 'Easy' },
  { name: 'Player2', score: 90, mode: 'Medium' },
  { name: 'Player3', score: 80, mode: 'Hard' },
  { name: 'Player4', score: 70, mode: 'Fog' },
  { name: 'Player5', score: 60, mode: 'Easy' },
  { name: 'Player6', score: 50, mode: 'Medium' },
  { name: 'Player7', score: 40, mode: 'Hard' },
  { name: 'Player8', score: 30, mode: 'Fog' },
  ];
  setScores(staticData); // Set the static data to the scores state
  }, []);

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value); // Update the selected mode
    console.log(`Selected mode: ${event.target.value}`); // Debugging log
    // You can add logic here to fetch or filter data based on the selected mode
  };

  const filteredScores = scores.filter((user) => user.mode === selectedMode);

  return (
    <div className="leaderboard-container">
      <button className="back-button" onClick={handleBackButtonClick}>
        ⬅ Back
      </button>
      <h1 className="leaderboard-title">Leaderboard</h1>

      {/* Dropdown for selecting mode */}
      <div className="mode-selector">
        <label htmlFor="mode">Select Mode: </label>
        <select id="mode" value={selectedMode} onChange={handleModeChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="Fog">Fog</option>
        </select>
      </div>

      <div className="leaderboard-list">
        {filteredScores.map((user, index) => (
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