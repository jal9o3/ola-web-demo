import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MatchHistory from './pages/MatchHistory';
import Walkthrough from "./pages/Walkthrough";
import RulesTutorial from './pages/RulesTutorial';
import GameModes from './pages/GameModes';
import AnalysisTool from './pages/AnalysisTool';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import QuitGame from './pages/QuitGame';
import Board from './components/Board/Board';
import AudioPlayer from '../src/AudioPlayer'; 


function App() {
  const audioRef = useRef(null); // Create a ref for the audio player

  return (
    <Router>
      <AudioPlayer ref={audioRef} /> {/* Include the AudioPlayer */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match-history" element={<MatchHistory />} />
        <Route path="/walkthrough/:matchId" element={<Walkthrough />} />
        <Route path="/rules-tutorial" element={<RulesTutorial />} />
        <Route path="/game-modes" element={<GameModes />} />
        <Route path="/analysis-tool" element={<AnalysisTool />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings audioRef={audioRef} />} /> {/* Pass the audio ref */}
        <Route path="/quit-game" element={<QuitGame />} />
        <Route path="/board/:mode" element={<Board />} /> 
      </Routes>
    </Router>
  );
}

export default App;

/*
import React from 'react';
import Board from './components/Board/Board'; // Ensure correct import path

function App() {
  return <Board />;
}

export default App;
*/
