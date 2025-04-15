import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import './PVPWaitingRoom.css';


function PVPWaitingRoom() {
    const navigate = useNavigate();
    const [joinSessionId, setJoinSessionId] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const [accessKey, setAccessKey] = useState(null);
    const [opponentJoined, setOpponentJoined] = useState(true); //set to true to view the PVPBoard for development

    const handleBackButtonClick = () => {
        navigate(-1); 
      };

    const handleCreateSession = () => {
        fetch('http://127.0.0.1:8000/api/sessions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mode: 'pvp' }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setSessionId(data.name);
                setAccessKey(data.access_key);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleJoinSession = () => {
        fetch(`http://127.0.0.1:8000/api/sessions/join/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_name: joinSessionId }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                navigate(`/pvp-board?sessionName=${data.name}&accessKey=${data.access_key}`);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    // Poll the backend to check if someone has joined the session
    useEffect(() => {
        if (sessionId) {
            const interval = setInterval(() => {
                fetch(`http://127.0.0.1:8000/api/sessions/${sessionId}/status/`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.opponent_joined) {
                            setOpponentJoined(true);
                            clearInterval(interval); // Stop polling once opponent joins
                        }
                    })
                    .catch(error => {
                        console.error('Error checking session status:', error);
                    });
            }, 3000); // Poll every 3 seconds

            return () => clearInterval(interval); // Cleanup interval on component unmount
        }
    }, [sessionId]);

    const handleStartGame = () => {
        navigate(`/pvp-board?sessionName=${sessionId}&accessKey=${accessKey}`);
    };

    return (
        <div className="waiting-room-container">
            <div className="white-box">
                <button className="back-button" onClick={handleBackButtonClick}>
                ⬅ Back
                </button>
                <h1 className="title">Waiting Room</h1>
                {!sessionId ? (
                    <div>
                    <button className="create-session-button" onClick={handleCreateSession}>
                        Create New Session
                    </button>
                    <div className="join-session-container">
                        <input
                            type="text"
                            placeholder="Enter Session ID"
                            value={joinSessionId}
                            onChange={(e) => setJoinSessionId(e.target.value)}
                            className="session-input"
                        />
                        <button className="join-session-button" onClick={handleJoinSession}>
                            Join Session
                        </button>
                    </div>
                </div>
                ):(
                    <div>
                        <p>Session ID: <strong>{sessionId}</strong></p>
                        <p>Waiting for an opponent to join...</p>
                        {opponentJoined && (
                            <button className="start-game-button" onClick={handleStartGame}>
                                Start Game
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PVPWaitingRoom;