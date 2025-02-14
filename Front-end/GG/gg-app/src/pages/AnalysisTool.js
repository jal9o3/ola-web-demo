import React, { useState } from 'react';
import './AnalysisTool.css'

const initialBoard = Array(8).fill(null).map(() => Array(9).fill(null));

const AnalysisTool = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [probabilities, setProbabilities] = useState({});

  const handleCellClick = (row, col) => {
    const newBoard = board.map(row => [...row]);
    
    if (selectedPiece) {
      newBoard[row][col] = selectedPiece;
      setSelectedPiece(null);
    } else if (newBoard[row][col]) {
      setSelectedPiece(newBoard[row][col]);
      newBoard[row][col] = null;
    }

    setBoard(newBoard);
    calculateProbabilities(newBoard);
  };

  const calculateProbabilities = (currentBoard) => {
    const newProbabilities = {};

    currentBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (!cell) {
          newProbabilities[`${rowIndex}-${colIndex}`] = Math.floor(Math.random() * 100) + 1;
        }
      });
    });

    setProbabilities(newProbabilities);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Game Analysis Tool</h1>
      <div className="grid grid-cols-9 gap-1 bg-gray-800 p-2">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              onClick={() => handleCellClick(rowIndex, colIndex)} 
              className="w-16 h-16 bg-white flex items-center justify-center border border-gray-300 relative cursor-pointer"
            >
              {cell && <span className="text-xl">{cell}</span>}
              {probabilities[`${rowIndex}-${colIndex}`] && (
                <span className="absolute bottom-1 right-1 text-xs bg-black text-white px-1 rounded">
                  {probabilities[`${rowIndex}-${colIndex}`]}%
                </span>
              )}
            </div>
          ))
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {["F", "G", "H", "I"].map(piece => (
          <button 
            key={piece} 
            onClick={() => setSelectedPiece(piece)} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {piece}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnalysisTool;
