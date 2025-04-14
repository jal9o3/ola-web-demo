import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameModes.css';

const GameModes = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sessionName, setSessionName] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [hostname, setHostname] = useState(window.location.hostname);

    useEffect(() => {
        console.log("Hostname:", hostname)

        if (hostname === 'localhost') {
            setHostname('127.0.0.1');
        }

        console.log("Hostname:", hostname)
    }, [hostname]);


    const modes = [
        { label: 'Easy Mode', key: 'easy' },
        { label: 'Average Mode', key: 'average' },
        { label: 'Hard Mode', key: 'hard' },
        { label: 'Fog Mode', key: 'fog' },
        { label: 'PVP Mode', key: 'pvp' }
    ];

    const handleModeClick = (mode) => {
        if (mode === 'pvp') {
            // Directly navigate to the waiting room
            navigate('/pvp-waiting-room');
            return;
        }

        fetch(`http://${hostname}:8000/api/sessions/`, {
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
        </div>
    );
};

export default GameModes;
