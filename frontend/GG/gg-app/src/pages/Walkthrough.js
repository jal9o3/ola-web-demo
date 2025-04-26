import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Walkthrough.css";

import scrollSound from "../sounds/scroll.mp3";
import clickSound from "../sounds/click.mp3";
import moveSound from "../sounds/move.mp3";

import Gen5 from "../assets/Gen5.png";
import Gen5b from "../assets/Gen5b.png";
import Gen4 from "../assets/Gen4.png";
import Gen4b from "../assets/Gen4b.png";
import Gen3 from "../assets/Gen3.png";
import Gen3b from "../assets/Gen3b.png";
import Gen2 from "../assets/Gen2.png";
import Gen2b from "../assets/Gen2b.png";
import Gen1 from "../assets/Gen1.png";
import Gen1b from "../assets/Gen1b.png";
import Flag from "../assets/Flag.png";
import Flagb from "../assets/Flagb.png";
import Colonel from "../assets/Colonel.png";
import Colonelb from "../assets/Colonelb.png";
import Captain from "../assets/Captain.png";
import Captainb from "../assets/Captainb.png";
import Lieu1st from "../assets/Lieu1st.png";
import Lieu1stb from "../assets/Lieu1stb.png";
import Lieu2nd from "../assets/Lieu2nd.png";
import Lieu2ndb from "../assets/Lieu2ndb.png";
import Spy from "../assets/Spy.png";
import Spyb from "../assets/Spyb.png";
import Major from "../assets/Major.png";
import Majorb from "../assets/Majorb.png";
import Private from "../assets/Private.png";
import Privateb from "../assets/Privateb.png";
import Sergeant from "../assets/Sergeant.png";
import Sergeantb from "../assets/Sergeantb.png";
import Lieucol from "../assets/Lieucol.png";
import Lieucolb from "../assets/Lieucolb.png";

const initialPieces = [
  { id: 1, name: "5-star General", src: Gen5b, rank: 14, team: "blue" },
  { id: 2, name: "4-star General", src: Gen4b, rank: 13, team: "blue" },
  { id: 3, name: "3-star General", src: Gen3b, rank: 12, team: "blue" },
  { id: 4, name: "2-star General", src: Gen2b, rank: 11, team: "blue" },
  { id: 5, name: "1-star General", src: Gen1b, rank: 10, team: "blue" },
  { id: 6, name: "Flag", src: Flagb, rank: 1, team: "blue" },
  { id: 7, name: "Colonel", src: Colonelb, rank: 9, team: "blue" },
  { id: 8, name: "Captain", src: Captainb, rank: 6, team: "blue" },
  { id: 9, name: "1st Lieutenant", src: Lieu1stb, rank: 5, team: "blue" },
  { id: 10, name: "2nd Lieutenant", src: Lieu2ndb, rank: 4, team: "blue" },
  { id: 11, name: "Spy", src: Spyb, rank: 15, team: "blue" },
  { id: 12, name: "Spy", src: Spyb, rank: 15, team: "blue" },
  { id: 13, name: "Major", src: Majorb, rank: 7, team: "blue" },
  { id: 14, name: "Private", src: Privateb, rank: 2, team: "blue" },
  { id: 15, name: "Private", src: Privateb, rank: 2, team: "blue" },
  { id: 16, name: "Private", src: Privateb, rank: 2, team: "blue" },
  { id: 17, name: "Private", src: Privateb, rank: 2, team: "blue" },
  { id: 18, name: "Private", src: Privateb, rank: 2, team: "blue" },
  { id: 19, name: "Private", src: Privateb, rank: 2, team: "blue" },
  { id: 20, name: "Sergeant", src: Sergeantb, rank: 3, team: "blue" },
  { id: 21, name: "Lieutenant Colonel", src: Lieucolb, rank: 8, team: "blue" },
  { id: 22, name: "5-star General", src: Gen5, rank: 14, team: "red" },
  { id: 23, name: "4-star General", src: Gen4, rank: 13, team: "red" },
  { id: 24, name: "3-star General", src: Gen3, rank: 12, team: "red" },
  { id: 25, name: "2-star General", src: Gen2, rank: 11, team: "red" },
  { id: 26, name: "1-star General", src: Gen1, rank: 10, team: "red" },
  { id: 27, name: "Flag", src: Flag, rank: 1, team: "red" },
  { id: 28, name: "Colonel", src: Colonel, rank: 9, team: "red" },
  { id: 29, name: "Captain", src: Captain, rank: 6, team: "red" },
  { id: 30, name: "1st Lieutenant", src: Lieu1st, rank: 5, team: "red" },
  { id: 31, name: "2nd Lieutenant", src: Lieu2nd, rank: 4, team: "red" },
  { id: 32, name: "Spy", src: Spy, rank: 15, team: "red" },
  { id: 33, name: "Spy", src: Spy, rank: 15, team: "red" },
  { id: 34, name: "Major", src: Major, rank: 7, team: "red" },
  { id: 35, name: "Private", src: Private, rank: 2, team: "red" },
  { id: 36, name: "Private", src: Private, rank: 2, team: "red" },
  { id: 37, name: "Private", src: Private, rank: 2, team: "red" },
  { id: 38, name: "Private", src: Private, rank: 2, team: "red" },
  { id: 39, name: "Private", src: Private, rank: 2, team: "red" },
  { id: 40, name: "Private", src: Private, rank: 2, team: "red" },
  { id: 41, name: "Sergeant", src: Sergeant, rank: 3, team: "red" },
  { id: 42, name: "Lieutenant Colonel", src: Lieucol, rank: 8, team: "red" },
];

const Walkthrough = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const matchId = queryParams.get("id");

  console.log("Match ID:", matchId);

  const [blueFormation, setBlueFormation] = useState([]);
  const [redFormation, setRedFormation] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [moveList, setMoveList] = useState([]);
  const [moveProbabilities, setMoveProbabilities] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);
  const [boardState, setBoardState] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("Blue's Turn");
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    position: { x: 0, y: 0 },
  });

  const redOffset = 15;
  const blank = 0;

  useEffect(() => {
    if (matchId) {
      // Fetch game data with move probabilities
      fetch("http://localhost:8000/api/history/ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: matchId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send match ID");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Match ID sent successfully:", data);
          setGameData(data.game_data);

          if (data.game_data.human_color === "B") {
            setBlueFormation(data.game_data.human_initial_formation || Array(27).fill(0));
            const adjustedRedFormation =
              data.game_data.ai_initial_formation.map((rank) =>
                rank !== blank ? rank - redOffset : rank
              );
            setRedFormation(adjustedRedFormation);
          } else {
            const adjustedRedFormation =
              data.game_data.human_initial_formation.map((rank) =>
                rank !== blank ? rank - redOffset : rank
              ) || Array(27).fill(0);
            setBlueFormation(data.game_data.ai_initial_formation);
            setRedFormation(adjustedRedFormation);
          }
          
          setMoveList(data.game_data.move_list);
          
          // Set up initial board to analyze moves
          const initialBoardState = initializeBoard(
            data.game_data.human_color === "B" ? 
              data.game_data.human_initial_formation : 
              data.game_data.ai_initial_formation,
            data.game_data.human_color === "B" ? 
              data.game_data.ai_initial_formation : 
              data.game_data.human_initial_formation
          );
          
          // Generate move probabilities based on analysis
          if (data.game_data.move_list.length > 0) {
            const analyzedMoves = analyzeAllMoves(
              data.game_data.move_list,
              initialBoardState,
              data.game_data.human_color
            );
            setMoveProbabilities(analyzedMoves);
          }
        })
        .catch((error) => {
          console.error("Error sending match ID:", error);
        });
    }
  }, [matchId]);

  useEffect(() => {
    const initialBoard = initializeBoard();
    setBoardState(initialBoard);
  }, [blueFormation, redFormation]);

  useEffect(() => {
    if (gameData && blueFormation.length > 0 && redFormation.length > 0) {
      // Initialize board with the formations
      const initialBoard = initializeBoard(blueFormation, redFormation);
      setBoardState(initialBoard);
      
      // Analyze moves after board is properly initialized
      if (moveList.length > 0) {
        const analyzedMoves = analyzeAllMoves(
          moveList,
          initialBoard,
          gameData.human_color
        );
        setMoveProbabilities(analyzedMoves);
      }
    }
  }, [gameData, blueFormation, redFormation, moveList]);

  const handleBackButtonClick = () => {
    navigate(`/match-history`);
    playSound("click");
  };

  const handleAnalyzeGame = () => {
    playSound("click");
    if (gameData) {
      navigate(`/analysis-tool`, {
        state: {
          initialBlueFormation: blueFormation,
          initialRedFormation: redFormation,
          humanColor: gameData.human_color,
          moveProbabilities: moveProbabilities
        },
      });
    }
  };

  const initializeBoard = (blueFormation = [], redFormation = []) => {
    const board = Array(8).fill().map(() => Array(9).fill(null));

    for (let row = 2; row >= 0; row--) {
      for (let col = 8; col >= 0; col--) {
        const index = (2 - row) * 9 + (8 - col);
        const pieceRank = blueFormation[index];

        if (pieceRank > 0) {
          const piece = initialPieces.find(
            (p) =>
              p.team === "blue" &&
              p.rank === pieceRank &&
              !board.some((r) => r.includes(p))
          );

          if (piece) {
            board[row][col] = { ...piece, position: { row, col } };
          }
        }
      }
    }

    for (let row = 5; row < 8; row++) {
      for (let col = 0; col < 9; col++) {
        const index = (row - 5) * 9 + col;
        const pieceRank = redFormation[index];

        if (pieceRank > 0) {
          const piece = initialPieces.find(
            (p) =>
              p.team === "red" &&
              p.rank === pieceRank &&
              !board.some((r) => r.includes(p))
          );

          if (piece) {
            board[row][col] = { ...piece, position: { row, col } };
          }
        }
      }
    }

    return board;
  };

  // Function to analyze moves and assign probabilities
  const analyzeAllMoves = (moves, initialBoard, humanColor) => {
    // Make deep copy of the board to avoid mutating the original
    let currentBoard = JSON.parse(JSON.stringify(initialBoard));
    const analyzedMoves = [];
    let currentTeam = "blue"; // Blue goes first
    
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const fromRow = parseInt(move[0]);
      const fromCol = parseInt(move[1]);
      const toRow = parseInt(move[2]);
      const toCol = parseInt(move[3]);
      
      // Log board state for debugging
      console.log(`Analyzing move ${i}:`, fromRow, fromCol, toRow, toCol);
      console.log("Board state:", currentBoard[fromRow][fromCol]);
      
      // Verify piece exists at source location
      if (!currentBoard[fromRow][fromCol]) {
        console.warn("No piece at source location for move", i);
        analyzedMoves.push({ probability: 0.1, evaluation: "Invalid move" });
        continue;
      }
      
      const analysis = analyzeMoveQuality(
        currentBoard, 
        fromRow, 
        fromCol, 
        toRow, 
        toCol,
        currentTeam
      );
      
      analyzedMoves.push(analysis);
      
      // Apply move to update the board state
      currentBoard = applyMoveToBoard(
        currentBoard, 
        fromRow, 
        fromCol, 
        toRow, 
        toCol
      );
      
      // Switch teams for next move
      currentTeam = currentTeam === "blue" ? "red" : "blue";
    }
    
    return analyzedMoves;
  };
  
  // Function to analyze the quality of a move
  const analyzeMoveQuality = (board, fromRow, fromCol, toRow, toCol, team) => {
    const movingPiece = board[fromRow][fromCol];
    const targetCell = board[toRow][toCol];
    
    if (!movingPiece) return { probability: 0.5, evaluation: "Invalid move" };
    
    // Check if target cell is empty
    if (!targetCell) {
      // Check if move puts piece at risk (near higher rank enemies)
      const riskFactor = checkRiskFactor(board, toRow, toCol, movingPiece.rank, team);
      if (riskFactor > 0) {
        return { 
          probability: 0.3, 
          evaluation: "Bad move - moving toward stronger opponent"
        };
      }
      return { probability: 0.5, evaluation: "Neutral move" };
    }
    
    // Check if target is an opponent piece
    if (targetCell.team !== team) {
      // Private capturing Spy
      if (movingPiece.rank === 2 && targetCell.rank === 15) {
        return { probability: 0.9, evaluation: "Excellent move - Private captures Spy" };
      }
      
      // Higher rank capturing lower rank
      if (movingPiece.rank > targetCell.rank && !(movingPiece.rank === 15 && targetCell.rank === 2)) {
        return { probability: 0.9, evaluation: "Excellent move - capturing lower rank" };
      }
      
      // Equal rank (both pieces eliminated)
      if (movingPiece.rank === targetCell.rank) {
        return { probability: 0.65, evaluation: "Good move - trading equal pieces" };
      }
      
      // Spy trying to capture Private
      if (movingPiece.rank === 15 && targetCell.rank === 2) {
        return { probability: 0.2, evaluation: "Bad move - Spy can't capture Private" };
      }
      
      // Lower rank moving to higher rank
      return { 
        probability: 0.2, 
        evaluation: "Bad move - moving toward stronger opponent" 
      };
    }
    
    // Should not move onto friendly piece
    return { probability: 0.1, evaluation: "Invalid move - friendly piece" };
  };
  
  // Function to check if a position puts a piece at risk
  const checkRiskFactor = (board, row, col, pieceRank, team) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1] // Up, Down, Left, Right
    ];
    
    let riskFactor = 0;
    
    // Check adjacent cells
    for (const [drow, dcol] of directions) {
      const newRow = row + drow;
      const newCol = col + dcol;
      
      if (
        newRow >= 0 && newRow < 8 && 
        newCol >= 0 && newCol < 9 && 
        board[newRow][newCol]
      ) {
        const adjacentPiece = board[newRow][newCol];
        
        if (adjacentPiece.team !== team) {
          // Special case: Private is not at risk from Spy
          if (pieceRank === 2 && adjacentPiece.rank === 15) {
            continue;
          }
          
          // Special case: Spy is at risk from Private
          if (pieceRank === 15 && adjacentPiece.rank === 2) {
            riskFactor += 1;
            continue;
          }
          
          // Normal case: At risk from higher ranks
          if (adjacentPiece.rank > pieceRank) {
            riskFactor += 1;
          }
        }
      }
    }
    
    return riskFactor;
  };
  
  // Function to apply a move to the board without modifying state
  const applyMoveToBoard = (board, fromRow, fromCol, toRow, toCol) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    const movingPiece = newBoard[fromRow][fromCol];
    
    if (!movingPiece) return newBoard;
    
    const targetPiece = newBoard[toRow][toCol];
    
    if (targetPiece) {
      if (targetPiece.team !== movingPiece.team) {
        if (
          (movingPiece.rank === 2 && targetPiece.rank === 15) ||
          (movingPiece.rank > targetPiece.rank &&
           !(movingPiece.rank === 15 && targetPiece.rank === 2))
        ) {
          newBoard[toRow][toCol] = {
            ...movingPiece,
            position: { row: toRow, col: toCol },
          };
          newBoard[fromRow][fromCol] = null;
        } else if (movingPiece.rank === targetPiece.rank) {
          newBoard[toRow][toCol] = null;
          newBoard[fromRow][fromCol] = null;
        } else {
          newBoard[fromRow][fromCol] = null;
        }
      }
    } else {
      newBoard[toRow][toCol] = {
        ...movingPiece,
        position: { row: toRow, col: toCol },
      };
      newBoard[fromRow][fromCol] = null;
    }
    
    return newBoard;
  };

  const handleForward = () => {
    if (moveIndex < moveList.length) {
      const move = moveList[moveIndex];
      const fromRow = parseInt(move[0]);
      const fromCol = parseInt(move[1]);
      const toRow = parseInt(move[2]);
      const toCol = parseInt(move[3]);

      applyMove(fromRow, fromCol, toRow, toCol);

      setMoveIndex((prevIndex) => prevIndex + 1);
      setCurrentTurn(moveIndex % 2 === 0 ? "Red's Turn" : "Blue's Turn");
      setButtonClicked(true);
    }
  };

  const handleBackward = () => {
    if (moveIndex > 0) {
      setMoveIndex((prevIndex) => prevIndex - 1);

      const initialBoard = initializeBoard();
      setBoardState(initialBoard);

      for (let i = 0; i < moveIndex - 1; i++) {
        const move = moveList[i];
        const fromRow = parseInt(move[0]);
        const fromCol = parseInt(move[1]);
        const toRow = parseInt(move[2]);
        const toCol = parseInt(move[3]);

        applyMove(fromRow, fromCol, toRow, toCol);
      }

      setCurrentTurn((moveIndex - 1) % 2 === 0 ? "Red's Turn" : "Blue's Turn");
      setButtonClicked(true);
    }
  };

  const applyMove = (fromRow, fromCol, toRow, toCol) => {
    setBoardState((prevBoard) => {
      const newBoard = JSON.parse(JSON.stringify(prevBoard));
      const movingPiece = newBoard[fromRow][fromCol];

      if (!movingPiece) return prevBoard;

      const targetPiece = newBoard[toRow][toCol];

      if (targetPiece) {
        if (targetPiece.team !== movingPiece.team) {
          if (
            (movingPiece.rank === 2 && targetPiece.rank === 15) ||
            (movingPiece.rank > targetPiece.rank &&
              !(movingPiece.rank === 15 && targetPiece.rank === 2))
          ) {
            newBoard[toRow][toCol] = {
              ...movingPiece,
              position: { row: toRow, col: toCol },
            };
            newBoard[fromRow][fromCol] = null;
          } else if (movingPiece.rank === targetPiece.rank) {
            newBoard[toRow][toCol] = null;
            newBoard[fromRow][fromCol] = null;
          } else {
            newBoard[fromRow][fromCol] = null;
          }
        }
      } else {
        newBoard[toRow][toCol] = {
          ...movingPiece,
          position: { row: toRow, col: toCol },
        };
        newBoard[fromRow][fromCol] = null;
      }

      return newBoard;
    });
  };

  const Tooltip = ({ text, position }) => {
    return (
      <div
        className="piece-tooltip"
        style={{ top: position.y, left: position.x }}
      >
        {text}
      </div>
    );
  };

  // Function to get color for probability indicator
  const getProbabilityColor = (probability) => {
    if (probability >= 0.8) return "#4caf50"; // Green for excellent moves
    if (probability >= 0.6) return "#8bc34a"; // Light green for good moves
    if (probability >= 0.4) return "#ffc107"; // Yellow for neutral moves
    if (probability >= 0.2) return "#ff9800"; // Orange for questionable moves
    return "#f44336"; // Red for poor moves
  };

  // Function to get text description for probability
  const getProbabilityDescription = (probability) => {
    if (probability >= 0.8) return "Excellent move";
    if (probability >= 0.6) return "Good move";
    if (probability >= 0.4) return "Neutral move";
    if (probability >= 0.2) return "Questionable move";
    return "Poor move";
  };

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

    const sounds = useRef({});
    
    useEffect(() => {
      // Preload sounds
      sounds.current = {
        click: new Audio(clickSound),
        move: new Audio(moveSound),
      };
    }, []);
  
    const playSound = (type) => {
      const sound = sounds.current[type];
      if (sound) {
        sound.currentTime = 0; // rewind
        sound.play().catch((error) => {
          console.error("Audio playback failed:", error);
        })
      }
    };

    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
      // Play the move sound whenever the board state changes
      playSound("move");
      setButtonClicked(false);
    }, [boardState, buttonClicked]);

  return (
    <div className="walkthrough-container">
      <button className="back-button" onClick={handleBackButtonClick}>
          ⬅ Back
        </button>
      <div className="walkthrough-top-controls">
        <button className="analyze-button" onClick={handleAnalyzeGame}>
          Analyze Game
        </button>
        </div>

      <div className="walkthrough-header">
        <h1>GAME WALKTHROUGH</h1>
      </div>

      <div className="walkthrough-controls">
      <button
          onClick={handleBackward}
          disabled={moveIndex === 0 || moveList.length === 0}
          className="control-button"
        >
          ← Previous
        </button>
      <div className="turn-indicator">
          <h5>Turn: {currentTurn}</h5>
        </div>
        <span className="move-counter">
          Move {moveIndex} of {moveList.length}
        </span>
        <button
          onClick={handleForward}
          disabled={moveIndex >= moveList.length || moveList.length === 0}
          className="control-button"
        >
          Next →
        </button>
      </div>

      <div className="game-board-walkthrough">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 9 }).map((_, col) => {
            const piece = boardState[row] && boardState[row][col];
            return (
              <div
                key={`${row}-${col}`}
                className={`tile-walkthrough ${piece ? piece.team : ""}`}
              >
                {piece && (
                  <img
                    src={piece.src}
                    alt={piece.name}
                    className="piece-image"
                    onMouseEnter={(e) => {
                      setTooltip({
                        visible: true,
                        text: piece.name,
                        position: {
                          x: e.clientX,
                          y: e.clientY,
                        },
                      });
                    }}
                    onMouseLeave={() =>
                      setTooltip({
                        visible: false,
                        text: "",
                        position: {
                          x: 0,
                          y: 0,
                        },
                      })
                    }
                  />
                )}
              </div>
            );
          })
        )}
        {tooltip.visible && (
          <Tooltip text={tooltip.text} position={tooltip.position} />
        )}
      </div>

      <div className="move-history"
        onScroll={handleScroll}>
        <h3>Move History</h3>
        <div className="move-list">
          {moveList.map((move, index) => {
            const probability = moveProbabilities[index]?.probability || 0.5;
            const evaluation = moveProbabilities[index]?.evaluation || 
              getProbabilityDescription(probability);
            
            return (
              <div
                key={index}
                className={`move-item ${index === moveIndex - 1 ? "active" : ""}`}
                onClick={() => {
                  const initialBoard = initializeBoard();
                  setBoardState(initialBoard);

                  for (let i = 0; i <= index; i++) {
                    const currentMove = moveList[i];
                    const fromRow = parseInt(currentMove[0]);
                    const fromCol = parseInt(currentMove[1]);
                    const toRow = parseInt(currentMove[2]);
                    const toCol = parseInt(currentMove[3]);

                    applyMove(fromRow, fromCol, toRow, toCol);
                  }

                  setMoveIndex(index + 1);
                  setCurrentTurn(
                    (index + 1) % 2 === 0 ? "Red's Turn" : "Blue's Turn"
                  );
                }}
              >
                <div className="move-content">
                  <div className="move-text">
                    {index % 2 === 0 ? "Blue" : "Red"}:{" "}
                    {`(${move[0]},${move[1]}) → (${move[2]},${move[3]})`}
                  </div>
                  <div className="move-evaluation-container">
                    <div className="move-probability">
                      <div 
                        className="probability-bar"
                        style={{
                          width: `${probability * 100}%`,
                          backgroundColor: getProbabilityColor(probability)
                        }}
                      ></div>
                    </div>
                    <div className="move-evaluation">{evaluation}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;