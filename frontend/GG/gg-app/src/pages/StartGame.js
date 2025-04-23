import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartGame.css';

const GameModes = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sessionName, setSessionName] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [hostname, setHostname] = useState(window.location.hostname);

    useEffect(() => {
        if (hostname === 'localhost') {
            setHostname('127.0.0.1');
        }
    }, [hostname]);

    const modes = [
        { label: 'Versus AI', key: 'ai' },
        { label: 'PVP Mode', key: 'pvp' }
    ];

    const handleModeClick = (mode) => {
        if (mode === 'pvp') {
            navigate('/pvp-waiting-room');
            return;
        }

        // For AI mode, you can still use a fetch if session needs to be initialized
        fetch(`http://${hostname}:8000/api/sessions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mode }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSessionName(data.name);
                setAccessKey(data.access_key);
                navigate(`/board/${mode}?sessionName=${data.name}&accessKey=${data.access_key}`);
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
        </div>
    );
};

export default GameModes;
