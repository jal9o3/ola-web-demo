import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RulesTutorial.css';

const RulesTutorial = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const steps = [
        { illustration: 'Step 1 Illustration', instruction: 'Step 1 Instruction and Rules' },
        { illustration: 'Step 2 Illustration', instruction: 'Step 2 Instruction and Rules' },
        { illustration: 'Step 3 Illustration', instruction: 'Step 3 Instruction and Rules' }
    ];

    const handleNext = () => {
        if (currentIndex < steps.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate('/game');
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="rules-tutorial-container">
            <h1 className="rules-tutorial-title">RULES AND TUTORIAL</h1>
            <div className="illustration-box">
                <p>{steps[currentIndex].illustration}</p>
            </div>
            <div className="instruction-box">
                <p>{steps[currentIndex].instruction}</p>
            </div>
            <div className="nav-buttons">
                <button className="back-button" onClick={handleBack} disabled={currentIndex === 0}>BACK</button>
                <button className="next-button" onClick={handleNext}>{currentIndex < steps.length - 1 ? 'NEXT' : 'FINISH'}</button>
            </div>
        </div>
    );
};

export default RulesTutorial;
