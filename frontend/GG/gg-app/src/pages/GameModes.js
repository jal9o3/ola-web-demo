import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameModes.css';

const GameModes = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sessionName, setSessionName] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [showPvpModal, setShowPvpModal] = useState(false);
    const [joinSessionId, setJoinSessionId] = useState('');

    const modes = [
        { label: 'Easy Mode', key: 'easy' },
        { label: 'Average Mode', key: 'average' },
        { label: 'Hard Mode', key: 'hard' },
        { label: 'Fog Mode', key: 'fog' },
        { label: 'PVP Mode', key: 'pvp' }
    ];

    const handleModeClick = (mode) => {
        if (mode === 'pvp') {
            setShowPvpModal(true); // Show the PvP modal
            return;
        }

        fetch('http://127.0.0.1:8000/api/sessions/', {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
                // Include other headers as needed
            },
            body: JSON.stringify({
                mode
                // Add more key-value pairs as needed
            }), // Convert the data to a JSON string
        })
            .then(response => {
                if (!response.ok) {
                    // Handle HTTP errors
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .then(data => {
                // Handle the parsed data
                console.log(data);
                setSessionName(data.name); // Save session name
                setAccessKey(data.access_key); // Save access key
                navigate(`/board/${mode}?sessionName=${data.name}&accessKey=${data.access_key}`); // Redirect with query parameters
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleCreatePvpSession = () => {
        fetch('http://127.0.0.1:8000/api/sessions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mode: 'pvp' }), // Specify PvP mode
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setSessionName(data.name);
                setAccessKey(data.access_key);
                navigate(`/board/pvp?sessionName=${data.name}&accessKey=${data.access_key}`);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleJoinPvpSession = () => {
        fetch(`http://127.0.0.1:8000/api/sessions/join/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_name: joinSessionId }), // Pass the session ID to join
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setSessionName(data.name);
                setAccessKey(data.access_key);
                navigate(`/board/pvp?sessionName=${data.name}&accessKey=${data.access_key}`);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % modes.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + modes.length) % modes.length);
    };

    const handleBackButtonClick = () => {
        navigate(-1); 
      };

    return (
        <div className="game-mode-container">
        <button className="back-button" onClick={handleBackButtonClick}>
        ⬅ Back
      </button>
            <h1 className="game-mode-title">GAME MODES</h1>
            <div className="carousel-container">
                <div className="carousel">
                    {modes.map((mode, index) => {
                        const position = index === currentIndex
                            ? 'center'
                            : index === (currentIndex + 1) % modes.length
                                ? 'right'
                                : index === (currentIndex - 1 + modes.length) % modes.length
                                    ? 'left'
                                    : 'hidden';

                        return (
                            <div
                                key={mode.key}
                                className={`mode-card ${position}`}
                                onClick={() => handleModeClick(mode.key)}
                            >
                                {mode.label}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="nav-buttons">
                <button className="nav-button" onClick={handlePrev}>&lt;</button>
                <button className="nav-button" onClick={handleNext}>&gt;</button>
            </div>

            {showPvpModal && (
                <div className="pvp-modal">
                    <h2>PvP Mode</h2>
                    <button onClick={handleCreatePvpSession}>Create New Session</button>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter Session ID"
                            value={joinSessionId}
                            onChange={(e) => setJoinSessionId(e.target.value)}
                        />
                        <button onClick={handleJoinPvpSession}>Join Session</button>
                    </div>
                    <button onClick={() => setShowPvpModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default GameModes;
