import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./MatchHistory.css";
import scrollSound from "../sounds/scroll.mp3";
import clickSound from "../sounds/click.mp3";


const MatchHistory = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const longColor = (color) => {
    if (color === "R") return "Red";
    if (color === "B") return "Blue";
    return color;
  };

  const handleBackButtonClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/history/ai/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch match history");
        }
        const data = await response.json();
        console.log("Fetched match history:", data);
        setMatches(data.results);
      } catch (error) {
        console.error("Error fetching match history:", error);
      }
    };

    fetchMatchHistory();
  }, []);

  const lastScrollLeftRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const audioRef = useRef(new Audio(scrollSound));
  const lastSoundTimeRef = useRef(0);

  const handleScroll = (e) => {
    const now = Date.now();
    if (now - lastSoundTimeRef.current < 100) return; // prevents the sound from playig too frequently
  
    const currentScrollLeft = e.target.scrollLeft;
    const deltaX = Math.abs(currentScrollLeft - lastScrollLeftRef.current); // Distance scrolled since last event
    const deltaTime = now - lastScrollTimeRef.current; // Time since last scrolled
  
    if (deltaTime > 0) {
      const speed = (deltaX / deltaTime) * 1000; // Calculate scroll speed in pixels per second
  
      const audio = audioRef.current;
      audio.volume = Math.min(1, speed / 1000); // Adjust volume based on scroll speed
      audio.currentTime = 0;
      audio.play();
  
      lastSoundTimeRef.current = now;
    }
  
    lastScrollLeftRef.current = currentScrollLeft;
    lastScrollTimeRef.current = now;
  };

  return (
    <div className="match-history-container">
      <button className="back-button" 
        onClick={() => {new Audio(clickSound).play();
          handleBackButtonClick()}}>
        ⬅ Back
      </button>
      <h2>Match History</h2>
      <div className="match-list" onScroll={handleScroll}>
        
        {matches.map((match) => {
          const playerWon = match.winner === match.human_color;;
          
          
          return (
            <div
              key={match.id}
              className={`match-item ${playerWon ? "win" : "loss"}`}
              onClick={() => {
                new Audio(clickSound).play()
                navigate(`/walkthrough?id=${match.id}`)}}
            >
              <p>
                <strong>Game {match.id}</strong>
              </p>
              <p>Turns: {match.turn_number}</p>
              <p>Winner: {longColor(match.winner)}</p>
              <p className="result-tag">{playerWon ? "You Won" : "You Lost"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchHistory;