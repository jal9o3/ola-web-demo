import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import './PVPWaitingRoom.css';


function PVPWaitingRoom() {
    const navigate = useNavigate();
    const [joinSessionId, setJoinSessionId] = useState('');

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
                alert(`Session created! Share this session ID with your opponent: ${data.name}`);
                navigate(`/pvp-board/pvp?sessionName=${data.name}&accessKey=${data.access_key}`);
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
                navigate(`/pvp-board/pvp?sessionName=${data.name}&accessKey=${data.access_key}`);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    return (
        <div className="waiting-room-container">
            <button className="back-button" onClick={handleBackButtonClick}>
            ⬅ Back
            </button>
            <h1 className="title">Waiting Room</h1>
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
        </div>
    );
}

export default PVPWaitingRoom;