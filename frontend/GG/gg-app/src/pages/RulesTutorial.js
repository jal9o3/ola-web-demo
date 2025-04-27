import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RulesTutorial.css';

import clickSound from "../sounds/click.mp3";

//import Rules
import RuleTitle from '../assets/rules/RuleTitle.png';
import Rule1 from '../assets/rules/Rule1.png';
import Rule2 from '../assets/rules/Rule2.png';
import Rule3 from '../assets/rules/Rule3.png';

import Tutorial from '../assets/tutorials/Tutorial.png';
import Step1 from '../assets/tutorials/Step1.png';
import Step2 from '../assets/tutorials/Step2.png';
import Step3 from '../assets/tutorials/Step3.png';
import Step4 from '../assets/tutorials/Step4.png';
import Step5 from '../assets/tutorials/Step5.png';
import Step6 from '../assets/tutorials/Step6.png';
import Step7 from '../assets/tutorials/Step7.png';
import Step8 from '../assets/tutorials/Step8.png';
import Step9 from '../assets/tutorials/Step9.png';
import Step10 from '../assets/tutorials/Step10.png';
import Step11 from '../assets/tutorials/Step11.png';
import Step12 from '../assets/tutorials/Step12.png';
import Step13 from '../assets/tutorials/Step13.png';
import Step14 from '../assets/tutorials/Step14.png';
import Step15 from '../assets/tutorials/Step15.png';
import Step16 from '../assets/tutorials/Step16.png';
import Step17 from '../assets/tutorials/Step17.png';
import Step18 from '../assets/tutorials/Step18.png';


const RulesTutorial = () => {

    const set1 = [
        { illustration: RuleTitle, instruction: 'Rules' },
        { illustration: Rule1, instruction: "Preparing for Battle: Arrange your set of pieces on the first three (3) rows on your end of the board. You are free to arrange the pieces according to your strategy of style of play." },
        { illustration: Rule2, instruction: 'Rules of Elimination' },
        { illustration: Rule3, instruction: 'Movement, Challenging, and End of Game' }
    ];

    const set2 = [
        { illustration: Step1, instruction: 'Rules and Tutorial: Navigate this page through the buttons shown above. "RULES" show the rules of the game. "TUTORIALS" show how to use the application.' },
        { illustration: Tutorial, instruction: '' },
        { illustration: Step2, instruction: 'Step 1: Click "Start Game" to begin playing.' },
        { illustration: Step3, instruction: 'Step 2: Choose a model based on your preference – Milestone 1, 2, 3, or R.' },
        { illustration: Step4, instruction: 'Step 3: You can place your pieces manually or click "Randomize" to automatically place your pieces.' },
        { illustration: Step5, instruction: 'Step 4: Optionally, enable "Storm Mode" if you want to play in storm mode.' },
        { illustration: Step6, instruction: 'Step 5: Click "Play" button to begin the game.' },
        { illustration: Step7, instruction: 'Step 6: You can move your pieces either up, down, left, or right. But in "Storm Mode", you can only move to tiles that are not occupied by a cloud(gray tiles).' },
        { illustration: Step8, instruction: 'Step 7: You can also click "Help" to view piece rankings if you’re unsure. Click "OK" to close the help dialog.' },
        { illustration: Step9, instruction: 'Step 8: If you win, input your name in the popup for the leaderboard and click "Submit". You can also click "View Walkthrough" to replay your match.' },
        { illustration: Step10, instruction: 'Step 9: Click "Match History" to view your previous matches.' },
        { illustration: Step11, instruction: 'Step 10: You can freely choose any past games to view'},
        { illustration: Step12, instruction: 'Step 11: After choosing past game, you can view how the game went with the "Next" and "Previous" buttons to watch how the game did. Additionally, click "Analyze Game" if you want to explore more scenarios and/or learn strategies from AI' },
        { illustration: Step13, instruction: 'Step 12: There is a suggested moves from the AI to teach you a better move.' },
        { illustration: Step14, instruction: 'Step 13: You can move the opponent\'s pieces to see how the game would go. Click "Undo" to return to the last move.' },
        { illustration: Step15, instruction: 'Step 14: Click "Analysis Tool" if you want to create your own game, and test different scenarios.' },
        { illustration: Step16, instruction: 'Step 15: Here, you can freely decide the formation of your pieces and the opponent\'s pieces. Also, you can choose the model, team, and the first to move. If all is ready, Click "Begin Analysis" if you wish the analysis to start. There is a suggested move from the AI on the right side, you can follow this. An "Undo" button is added to adjust and make decisions and strategies more flexible.' },
        { illustration: Step17, instruction: 'Step 16: Click "Leaderboard if you want to see who is leading on different models used.' },
        { illustration: Step18, instruction: 'Step 17: Leaderboard' }
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
        <div className="rules-tutorial-page">
            <button className="back-button" onClick={handleBackButtonClick}>
                ⬅ Back
            </button>
        <div className="navigation-container">
            
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
        </div>
    );
};

export default RulesTutorial;