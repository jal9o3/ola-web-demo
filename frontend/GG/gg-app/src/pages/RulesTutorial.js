import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RulesTutorial.css';

import clickSound from "../sounds/click.mp3";

import Step1 from '../assets/Step1.png';
import Step2 from '../assets/Step2.png';
import Step3 from '../assets/Step3.png';
import Step4 from '../assets/Step4.png';
import Step5 from '../assets/Step5.png';
import Step6 from '../assets/Step6.png';
import Step7 from '../assets/Step7.png';

const RulesTutorial = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const steps = [
        { illustration: Step1, instruction: 'Step 1: Click "Start Game" to begin playing.' },
        { illustration: Step2, instruction: 'Step 2: Choose a model based on your preference – Milestone 1, 2, 3, or R.' },
        { illustration: Step3, instruction: 'Step 3: You can place your pieces manually or click "Randomize" to automatically place your pieces. Optionally, enable "Fog Mode" if you want to play in fog mode, here if the tile is occupied by a fog, you can`t move to that tile.' },
        { illustration: Step4, instruction: 'Step 4: Click the "Play" button when you’re ready to begin.' },
        { illustration: Step5, instruction: 'Step 5: Use the "Help" button to view piece rankings if you’re unsure. Click "OK" to close the help dialog.' },
        { illustration: Step6, instruction: 'Step 6: On your turn, select a piece and click a destination tile. You can move one tile at a time to any adjacent space—up, down, left, or right. To battle, click your piece, then click an opponent’s piece. The lower-ranked piece loses, so if your piece disappears, you lose. If it stays, you win. If both disappear, it`s a tie in rank.'},
        { illustration: Step7, instruction: 'Step 7: If you win, input your name in the popup for the leaderboard and click "Submit". You can also click "View Walkthrough" to replay your match.'}
    ];

    const handleBackButtonClick = () => {
        new Audio(clickSound).play(); // Play the audio file
        navigate(-1); // Go back to the previous page
      };

    const handleNext = () => {
        new Audio(clickSound).play(); // Play the audio file
        if (currentIndex < steps.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            navigate('/'); // Redirect to Home after clicking FINISH
        }
    };

    const handleBack = () => {
        new Audio(clickSound).play(); // Play the audio file
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="navigation-container">
            <button className="back-button" onClick={handleBackButtonClick}>
                    ⬅ Back
                </button>
            <button className={`previous-button ${currentIndex === 0 ? "": "disabled"}}`}
                onClick={handleBack} 
                disabled={currentIndex === 0}>BACK</button>
            
            <div className="rules-tutorial-container">
                
                <h1 className="rules-tutorial-title">RULES AND TUTORIAL</h1>
                <div className="illustration-box">
                    <img src={steps[currentIndex].illustration} alt={`Step ${currentIndex + 1}`} className="tutorial-image" />
                </div>
                <div className="instruction-box">
                    <p>{steps[currentIndex].instruction}</p>
                </div>
                
            </div>
            <button className="next-button" onClick={handleNext}>
                {currentIndex < steps.length - 1 ? 'NEXT' : 'FINISH'}
            </button>
        </div>
    );
};

export default RulesTutorial;
