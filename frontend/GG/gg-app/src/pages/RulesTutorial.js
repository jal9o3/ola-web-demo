import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RulesTutorial.css';

import clickSound from "../sounds/click.mp3";

//import Rules
import Rule1 from '../assets/rules/Rule1.png';
import Rule2 from '../assets/rules/Rule2.png';
import Rule3 from '../assets/rules/Rule3.png';


import Step1 from '../assets/tutorials/Step1.png';
import Step2 from '../assets/tutorials/Step2.png';
import Step3 from '../assets/tutorials/Step3.png';
import Step4 from '../assets/tutorials/Step4.png';
import Step5 from '../assets/tutorials/Step5.png';
import Step6 from '../assets/tutorials/Step6.png';
import Step7 from '../assets/tutorials/Step7.png';

const RulesTutorial = () => {

    const set1 = [
        { illustration: Rule1, instruction: "Preparing for Battle: Arrange your set of pieces on the first three (3) rows on your end of the board. You are free to arrange the pieces according to your strategy of style of play." },
        { illustration: Rule2, instruction: 'Rules of Elimination' },
        { illustration: Rule3, instruction: 'Movement, Challenging, and End of Game' }
    ];

    const set2 = [
        { illustration: Step1, instruction: 'Rules and Tutorial: Navigate this page thrugh the bottons shown above. "RULES" show the rules of the game. "TUTORIALS" show how to use the application.' },
        { illustration: Step2, instruction: 'Start Game 1: Click "Start Game" to begin playing.' },
        { illustration: Step3, instruction: 'Start Game 2: Choose a model based on your preference – Milestone 1, 2, 3, or R.' },
        { illustration: Step4, instruction: 'Start Game 3: You can place your pieces manually or click "Randomize" to automatically place your pieces. Optionally, enable "Storm Mode" if you want to play in storm mode, here if the tile is occupied by a cloud, you can`t move to that tile.' },
        { illustration: Step5, instruction: 'Start Game 4: Click the "Play" button when you’re ready to begin.' },
        { illustration: Step6, instruction: 'Start Game 5: Use the "Help" button to view piece rankings if you’re unsure. Click "OK" to close the help dialog.'},
        { illustration: Step7, instruction: 'Start Game 6: If you win, input your name in the popup for the leaderboard and click "Submit". You can also click "View Walkthrough" to replay your match.'}
    ];

    

    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSet, setActiveSet] = useState(set2); // Dynamically manage sets

    const handleBackButtonClick = () => {
        new Audio(clickSound).play(); // Play the audio file
        navigate(-1); // Go back to the previous page
      };

    const handleNext = () => {
        new Audio(clickSound).play(); // Play the audio file
        if (currentIndex < activeSet.length - 1) {
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

    const handleSetSteps = (set) => {
        new Audio(clickSound).play(); // Play the audio file
        setActiveSet(set);
        setCurrentIndex(0); // Reset to the first step
    };

    return (
        <div className="navigation-container">
            <button className="back-button" onClick={handleBackButtonClick}>
                ⬅ Back
            </button>
            
            <button className={`previous-button ${currentIndex === 0 ? "": "disabled"}}`}
                onClick={handleBack} 
                disabled={currentIndex === 0}>BACK
            </button>
            {activeSet.length > 0 && (
                <div className="rules-tutorial-container">
                    
                    <div className="set-selection-buttons">
                        <button
                            className={`set1-button ${activeSet === set1 ? "focus" : ""}`}
                            onClick={() => handleSetSteps(set1)}
                        >
                            RULES
                        </button>

                        <h1 className="title"> AND </h1>

                        <button
                            className={`set2-button ${activeSet === set2 ? "focus" : ""}`}
                            onClick={() => handleSetSteps(set2)}
                        >
                            TUTORIALS
                        </button>
                    </div>

                    <div className="illustration-box">
                        <img src={activeSet[currentIndex].illustration} alt={`Step${currentIndex + 1}`} className="tutorial-image" />
                    </div>

                    <div className="instruction-box">
                        <p>{activeSet[currentIndex].instruction}</p>
                    </div>
                </div>
            )}

            <button className="next-button" onClick={handleNext}>
                {currentIndex < activeSet.length - 1 ? 'NEXT' : 'FINISH'}
            </button>
        </div>
        
    );
};

export default RulesTutorial;
