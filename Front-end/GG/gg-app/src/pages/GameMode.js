import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameMode.css';

const GameMode = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const modes = [
        { label: 'Hard Mode', key: 'hard' },
        { label: 'Fog Mode', key: 'fog' },
        { label: 'Easy Mode', key: 'easy' },
        { label: 'Average Mode', key: 'average' }
    ];

    const handleModeClick = (mode) => {
        navigate(`/game/${mode}`);
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
                        const position = index === currentIndex ? 'center' : index === (currentIndex + 1) % modes.length ? 'right' : index === (currentIndex - 1 + modes.length) % modes.length ? 'left' : 'hidden';
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
