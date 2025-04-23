import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Walkthrough.css";

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

  // Sample formations (to be replaced with actual data)
  const [blueFormation, setBlueFormation] = useState([]);
  const [redFormation, setRedFormation] = useState([]);
  const [gameData, setGameData] = useState(null);

  // Sample move list - format: "fromRow fromCol toRow toCol"
  const [moveList, setMoveList] = useState([]);

  const redOffset = 15;
  const blank = 0;

  useEffect(() => {
    if (matchId) {
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
            setBlueFormation(data.game_data.human_initial_formation);
            const adjustedRedFormation =
              data.game_data.ai_initial_formation.map((rank) =>
                rank !== blank ? rank - redOffset : rank
              );
            setRedFormation(adjustedRedFormation);
          } else {
            const adjustedRedFormation =
              data.game_data.human_initial_formation.map((rank) =>
                rank !== blank ? rank - redOffset : rank
              );
            setBlueFormation(data.game_data.ai_initial_formation);
            setRedFormation(adjustedRedFormation);
          }
          setMoveList(data.game_data.move_list);
        })
        .catch((error) => {
          console.error("Error sending match ID:", error);
        });
    }
  }, [matchId]);

  const [moveIndex, setMoveIndex] = useState(0);
  const [boardState, setBoardState] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("Blue's Turn");
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    const initialBoard = initializeBoard();
    setBoardState(initialBoard);
  }, []);

  useEffect(() => {
    console.log("Component mounted or updated");
  }, []);

  useEffect(() => {
    if (
      blueFormation.length > 0 &&
      redFormation.length > 0 &&
      moveList.length >= 0
    ) {
      const initialBoard = initializeBoard();
      setBoardState(initialBoard);
    }
    console.log("Blue Formation:");
    console.log(blueFormation);
    console.log("Red Formation:");
    console.log(redFormation);
    console.log("Move List:");
    console.log(moveList);
  }, [blueFormation, redFormation, moveList]);

  const handleBackButtonClick = () => {
    navigate(`/match-history`);
  };

  const handleAnalyzeGame = () => {
    if (gameData) {
      navigate(`/analysis-tool`, {
        state: {
          initialBlueFormation: blueFormation,
          initialRedFormation: redFormation,
          humanColor: gameData.human_color,
        },
      });
    }
  };

  const initializeBoard = () => {
    const board = Array(8)
      .fill()
      .map(() => Array(9).fill(null));

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

  return (
    <div className="walkthrough-container">
      <div className="walkthrough-top-controls">
        <button className="back-button" onClick={handleBackButtonClick}>
          ⬅ Back
        </button>
        <button className="analyze-button" onClick={handleAnalyzeGame}>
          Analyze Game
        </button>
      </div>

      <div className="walkthrough-header">
        <h1>GAME WALKTHROUGH</h1>
        <div className="turn-indicator">
          <h5>Turn: {currentTurn}</h5>
        </div>
      </div>

      <div className="walkthrough-controls">
        <button
          onClick={handleBackward}
          disabled={moveIndex === 0}
          className="control-button"
        >
          ← Previous
        </button>
        <span className="move-counter">
          Move {moveIndex} of {moveList.length}
        </span>
        <button
          onClick={handleForward}
          disabled={moveIndex >= moveList.length}
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

      <div className="move-history">
        <h3>Move History</h3>
        <div className="move-list">
          {moveList.map((move, index) => (
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
              {index % 2 === 0 ? "Blue" : "Red"}:{" "}
              {`${move[0]},${move[1]}) → (${move[2]},${move[3]}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Walkthrough;