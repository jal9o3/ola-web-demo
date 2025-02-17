import React, { useState, useEffect } from 'react';
import './AnalysisTool.css';

const initialBoard = () => {
    const board = Array(8).fill(null).map(() => Array(9).fill(null));

    // Define initial red and blue piece positions
    const redPositions = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
        [1, 4] // Example middle piece for red
    ];

    const bluePositions = [
        [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8],
        [6, 4] // Example middle piece for blue
    ];

    redPositions.forEach(([row, col]) => (board[row][col] = "🔴"));
    bluePositions.forEach(([row, col]) => (board[row][col] = "🔵"));

    return board;
};

const AnalysisTool = () => {
    const [board, setBoard] = useState(initialBoard);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [probability, setProbability] = useState(100); // 🔥 Starts at 100%

    const handleCellClick = (row, col) => {
        const newBoard = board.map(r => [...r]);

        if (selectedPiece) {
            if (selectedPiece.row !== undefined && selectedPiece.col !== undefined) {
                // Moving an existing piece
                newBoard[row][col] = selectedPiece.piece;
                newBoard[selectedPiece.row][selectedPiece.col] = null;
            } else {
                // Placing a new piece
                newBoard[row][col] = selectedPiece.piece;
            }
            setSelectedPiece(null);
            updateProbability(); // 🔥 Decrease probability slightly on each move
        } else if (newBoard[row][col]) {
            setSelectedPiece({ piece: newBoard[row][col], row, col });
        }

        setBoard(newBoard);
    };

    const updateProbability = () => {
        setProbability(prev => Math.max(prev - Math.floor(Math.random() * 5) - 1, 0)); // 🔥 Gradually decreases
    };

    return (
        <div className="analysis-tool-container">
            <h1 className="title">Game Analysis Tool</h1>
            <div className="board">
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            className={`cell ${cell === "🔴" ? "red" : cell === "🔵" ? "blue" : ""}`}
                        >
                            {cell && <span>{cell}</span>}
                        </div>
                    ))
                )}
            </div>

            {/* Probability Display (Separate from Board) */}
            <div className="probability-container">
                {probability}%
            </div>

            <div className="buttons">
                {["🔴", "🔵"].map(piece => (
                    <button
                        key={piece}
                        onClick={() => setSelectedPiece({ piece })} // Corrected piece selection
                        className="button"
                    >
                        {piece}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AnalysisTool;
