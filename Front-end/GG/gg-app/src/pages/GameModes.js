import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameModes.css';

const GameMode = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sessionName, setSessionName] = useState('');
    const [accessKey, setAccessKey] = useState('');

    const modes = [
        { label: 'Hard Mode', key: 'hard' },
        { label: 'Fog Mode', key: 'fog' },
        { label: 'Easy Mode', key: 'easy' },
        { label: 'Average Mode', key: 'average' }
    ];

    const handleModeClick = (mode) => {
        fetch('http://127.0.0.1:8000/api/sessions/', {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
                // Include other headers as needed
            },
            body: JSON.stringify({
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

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % modes.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + modes.length) % modes.length);
    };

    return (
        <div className="game-mode-container">
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
        </div>
    );
};

export default GameMode;
