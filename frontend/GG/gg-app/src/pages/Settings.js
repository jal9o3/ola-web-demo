import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

import clickSound from '../sounds/click.mp3'; // Import your audio file

const Settings = ({ audioRef }) => {
  const navigate = useNavigate();
  
  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
    new Audio(clickSound).play(); // Play the audio file
  };

  const [volume, setVolume] = useState(100); // Default volume level

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100; // Set volume as a fraction
    }
  }, [volume, audioRef]);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="settings-container">
      <button className="back-button" onClick={handleBackButtonClick}>
        ⬅ Back
      </button>
      <h1 className="settings-title">Settings</h1>
      <div className="volume-control">
        <label htmlFor="volume-slider">Volume: {volume}</label>
        <input
          id="volume-slider"
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default Settings;