import React , {useState, useEffect} from 'react';
import './Home.css';  // Correct CSS import
import { useNavigate } from 'react-router-dom';

import background from '../assets/background.png';
import clickSound from "../sounds/click.mp3";

const menuItems = [
    { label: 'MATCH HISTORY', position: 'right1' },
    { label: 'RULES & TUTORIAL', position: 'left1' },
    { label: 'START GAME', position: 'center' },
    { label: 'ANALYSIS TOOL', position: 'right2' },
    { label: 'LEADER BOARD', position: 'left2' },
    { label: 'SETTINGS', position: 'top' }
];



export const CircleButton = ({ label, onClick, className }) => {
    return (
        <div className={className}>
            <button 
                className="circleButton circleButton1"
                onClick={() => {new Audio(clickSound).play();
                    onClick()}}
                aria-label={label}
                tabIndex={0}
            >
                {label}  {/* Displaying label inside the button */}
            </button>
        </div>
    );
};

export const TopButton = ({ label, onClick, className }) => {
    return (
        <div className={className}>
            <button 
                className="TopButton"
                onClick={() => {new Audio(clickSound).play();
                    onClick()}}
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
    const [sessionName, setSessionName] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [hostname, setHostname] = useState(window.location.hostname);

    useEffect(() => {
        if (hostname === 'localhost') {
            setHostname('127.0.0.1');
        }
    }, [hostname]);

    const handleStartGameClick = () => {
        

        // For AI mode, you can still use a fetch if session needs to be initialized
        fetch(`http://${hostname}:8000/api/sessions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
                navigate(`/board/ai?sessionName=${data.name}&accessKey=${data.access_key}`);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
    

    const handleNavigation = (label) => {
        switch (label) {
            case 'MATCH HISTORY':
                navigate('/match-history');
                break;
            case 'RULES & TUTORIAL':
                navigate('/rules-tutorial');
                break;
            case 'START GAME':
                handleStartGameClick();
                break;
            case 'ANALYSIS TOOL':
                navigate('/analysis-tool');
                break;
            case 'LEADER BOARD':
                navigate('/leader-board');
                break;
                break;
            default:
                navigate('/');
        }
    };
    return (
        <main className="container">

            <img
                loading="lazy"
                src={background} //"https://cdn.builder.io/api/v1/image/assets/TEMP/22f1b63660476b3583838e2006560d0eb1c4da0fa34c43f42de47994a2ea3c4a?placeholderIfAbsent=true&apiKey=495cfffe0c9a47b6b0144a560efce18c"
                className="backgroundImage"
                alt=""
                role="presentation"
            />

            <div className="content">
                <header className="titleContainer">
                    <h1 className="gameTitle">
                        GAME OF THE
                    <div className="generalsText">GENERALS</div></h1>
                    {/* <div className="ggText">GG</div> */}
                    {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6962d0b2951eba34838f254230d6d8916bd67a1e341b31461db955573b98c2c?placeholderIfAbsent=true&apiKey=495cfffe0c9a47b6b0144a560efce18c"
                        className="logo"
                        alt="Game of Generals Logo"
                    /> */}
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

                {/*<nav className="TopMenu">
                {menuItems
                    .filter(item => item.position === 'top')
                    .map(item => (
                    <TopButton key={item.label} label={item.label} onClick={() => handleNavigation(item.label)} />
                    ))}
                </nav>*/}

            </div>
        </main>
    );
}

export default Home;
