import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Walkthrough.css";

const Walkthrough = () => {
  const { matchId } = useParams(); // Get match ID from URL (for future expansion)
  
  // Example formations (6 empty spaces, pieces range from 1-15)
  const initialBlueFormation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6];
  const initialRedFormation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6];

  // Example move history (format: "startRow startCol destRow destCol")
  const moveList = ["0001", "1202", "2503", "3604", "4705"];

  const [moveIndex, setMoveIndex] = useState(0);
  const [blueFormation, setBlueFormation] = useState([...initialBlueFormation]);
  const [redFormation, setRedFormation] = useState([...initialRedFormation]);

  // Function to apply a move
  const applyMove = (index) => {
    if (index < 0 || index >= moveList.length) return;
    
    const move = moveList[index];
    const startRow = parseInt(move[0]);
    const startCol = parseInt(move[1]);
    const destRow = parseInt(move[2]);
    const destCol = parseInt(move[3]);

    // Logic to update piece positions (only a basic swap for now)
    let updatedBlue = [...blueFormation];
    let updatedRed = [...redFormation];

    // Determine if the piece is in Blue or Red formation
    if (startRow <= 2) {
      const piece = updatedBlue[startRow * 9 + startCol];
      updatedBlue[startRow * 9 + startCol] = 0;
      updatedBlue[destRow * 9 + destCol] = piece;
      setBlueFormation(updatedBlue);
    } else {
      const piece = updatedRed[(startRow - 5) * 9 + startCol];
      updatedRed[(startRow - 5) * 9 + startCol] = 0;
      updatedRed[(destRow - 5) * 9 + destCol] = piece;
      setRedFormation(updatedRed);
    }

    setMoveIndex(index);
  };

  return (
    <div className="walkthrough-container">
      <h2>Match Walkthrough (Match {matchId})</h2>
      
      {/* Board Display */}
      <div className="board">
        {blueFormation.map((piece, i) => (
          <div key={i} className={`square ${piece ? "occupied" : "empty"}`}>
            {piece !== 0 ? `B${piece}` : ""}
          </div>
        ))}
        {redFormation.map((piece, i) => (
          <div key={i + 27} className={`square ${piece ? "occupied" : "empty"}`}>
            {piece !== 0 ? `R${piece}` : ""}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="controls">
        <button onClick={() => applyMove(moveIndex - 1)} disabled={moveIndex === 0}>
          ◀ Prev
        </button>
        <span>Move {moveIndex + 1} / {moveList.length}</span>
        <button onClick={() => applyMove(moveIndex + 1)} disabled={moveIndex === moveList.length - 1}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default Walkthrough;
