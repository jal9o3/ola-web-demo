import React from 'react';
import './Home.css';  // Correct CSS import
import { useNavigate } from 'react-router-dom';

const menuItems = [
    { label: 'MATCH HISTORY', position: 'right1' },
    { label: 'RULES & TUTORIAL', position: 'left1' },
    { label: 'GAME MODES', position: 'left2' },
    { label: 'ANALYSIS TOOL', position: 'right2' },
    { label: 'LEADERBOARD', position: 'center' },
    { label: 'SETTINGS', position: 'bottom' },
    { label: 'QUIT GAME', position: 'bottom' }
];

export const CircleButton = ({ label, onClick, className }) => {
    return (
        <div className={className}>
            <button 
                className="circleButton circleButton1"
                onClick={onClick}
                aria-label={label}
                tabIndex={0}
            >
                {label}  {/* Displaying label inside the button */}
            </button>
        </div>
    );
};

export const BottomButton = ({ label, onClick, className }) => {
    return (
        <div className={className}>
            <button 
                className="bottomButton"  // Unique class for styling bottom buttons
                onClick={onClick}
                aria-label={label}
                tabIndex={0}
            >
                {label}
            </button>
        </div>
    );
};

function Home() {
    const navigate = useNavigate();

    const handleNavigation = (label) => {
        switch (label) {
            case 'MATCH HISTORY':
                navigate('/match-history');
                break;
            case 'RULES & TUTORIAL':
                navigate('/rules-tutorial');
                break;
            case 'GAME MODES':
                navigate('/game-modes');
                break;
            case 'ANALYSIS TOOL':
                navigate('/analysis-tool');
                break;
            case 'LEADERBOARD':
                navigate('/leaderboard');
                break;
            case 'SETTINGS':
                navigate('/settings');
                break;
            case 'QUIT GAME':
                navigate('/quit-game');
                break;
            default:
                navigate('/');
        }
    };
    return (
        <main className="container">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f1b63660476b3583838e2006560d0eb1c4da0fa34c43f42de47994a2ea3c4a?placeholderIfAbsent=true&apiKey=495cfffe0c9a47b6b0144a560efce18c"
                className="backgroundImage"
                alt=""
                role="presentation"
            />
            <div className="content">
                <header className="titleContainer">
                    <h1 className="gameTitle">
                        GAME<br />OF THE
                    </h1>
                    <div className="generalsText">GENERALS</div>
                    <div className="ggText">GG</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6962d0b2951eba34838f254230d6d8916bd67a1e341b31461db955573b98c2c?placeholderIfAbsent=true&apiKey=495cfffe0c9a47b6b0144a560efce18c"
                        className="logo"
                        alt="Game of Generals Logo"
                    />
                </header>

                <nav className="rightMenu1">
                {menuItems
    .filter(item => item.position === 'right1')
    .map(item => (
      <CircleButton key={item.label} label={item.label} onClick={() => handleNavigation(item.label)} />
    ))}
</nav>

<nav className="rightMenu2">
  {menuItems
    .filter(item => item.position === 'right2')
    .map(item => (
      <CircleButton key={item.label} label={item.label} onClick={() => handleNavigation(item.label)} />
    ))}
</nav>

<nav className="leftMenu1">
  {menuItems
    .filter(item => item.position === 'left1')
    .map(item => (
      <CircleButton key={item.label} label={item.label} onClick={() => handleNavigation(item.label)} />
    ))}
</nav>

<nav className="leftMenu2">
  {menuItems
    .filter(item => item.position === 'left2')
    .map(item => (
      <CircleButton key={item.label} label={item.label} onClick={() => handleNavigation(item.label)} />
    ))}
</nav>

<nav className="centerMenu">
  {menuItems
    .filter(item => item.position === 'center')
    .map(item => (
      <CircleButton key={item.label} label={item.label} onClick={() => handleNavigation(item.label)} />
    ))}
</nav>

<nav className="bottomMenu">
  {menuItems
    .filter(item => item.position === 'bottom')
    .map(item => (
      <BottomButton key={item.label} label={item.label} onClick={() => handleNavigation(item.label)} />
    ))}
</nav>

            </div>
        </main>
    );
}

export default Home;
