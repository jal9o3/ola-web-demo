import React from "react";
import './MatchHistory.css'

const MatchHistory = () => {
  const matches = Array.from({ length: 20 }, (_, i) => `Match ${i + 1}`);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">MATCH HISTORY</h1>
      <div className="overflow-x-auto whitespace-nowrap px-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-700 flex space-x-4">
        {matches.map((match, index) => (
          <div
            key={index}
            className="bg-blue-500 text-black text-xl font-semibold p-6 rounded-lg shadow-lg w-48 text-center transform transition-transform duration-300 hover:scale-105"
          >
            {match}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHistory;
