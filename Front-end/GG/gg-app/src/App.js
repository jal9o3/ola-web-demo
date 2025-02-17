import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MatchHistory from './pages/MatchHistory';
import RulesTutorial from './pages/RulesTutorial';
import GameModes from './pages/GameModes';
import AnalysisTool from './pages/AnalysisTool';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import QuitGame from './pages/QuitGame';
import Board from './components/Board/Board'; // Cleaned import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match-history" element={<MatchHistory />} />
        <Route path="/rules-tutorial" element={<RulesTutorial />} />
        <Route path="/game-modes" element={<GameModes />} />
        <Route path="/analysis-tool" element={<AnalysisTool />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
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