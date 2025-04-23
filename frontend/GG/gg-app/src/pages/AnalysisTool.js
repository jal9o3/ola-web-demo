// AnalysisTool.js
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./AnalysisTool.css"; // Ensure you create this CSS file

// Import images (same as in Board.js)
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

import { processInfostate } from "../utils/processInfostate";

// Initial Pieces with positions for both player and opponent
const initialPieces = [
  {
    id: 1,
    name: "5-star General",
    src: Gen5,
    position: { row: 5, col: 0 },
    team: "red",
  },
  {
    id: 2,
    name: "4-star General",
    src: Gen4,
    position: { row: 5, col: 1 },
    team: "red",
  },
  {
    id: 3,
    name: "3-star General",
    src: Gen3,
    position: { row: 5, col: 2 },
    team: "red",
  },
  {
    id: 4,
    name: "2-star General",
    src: Gen2,
    position: { row: 5, col: 3 },
    team: "red",
  },
  {
    id: 5,
    name: "1-star General",
    src: Gen1,
    position: { row: 5, col: 4 },
    team: "red",
  },
  {
    id: 6,
    name: "Flag",
    src: Flag,
    position: { row: 5, col: 5 },
    team: "red",
  },
  {
    id: 7,
    name: "Colonel",
    src: Colonel,
    position: { row: 5, col: 6 },
    team: "red",
  },
  {
    id: 8,
    name: "Captain",
    src: Captain,
    position: { row: 5, col: 7 },
    team: "red",
  },
  {
    id: 9,
    name: "1st Lieutenant",
    src: Lieu1st,
    position: { row: 5, col: 8 },
    team: "red",
  },
  {
    id: 10,
    name: "2nd Lieutenant",
    src: Lieu2nd,
    position: { row: 6, col: 0 },
    team: "red",
  },
  {
    id: 11,
    name: "Spy",
    src: Spy,
    position: { row: 6, col: 1 },
    team: "red",
  },
  {
    id: 12,
    name: "Spy",
    src: Spy,
    position: { row: 6, col: 2 },
    team: "red",
  },
  {
    id: 13,
    name: "Major",
    src: Major,
    position: { row: 6, col: 3 },
    team: "red",
  },
  {
    id: 14,
    name: "Private",
    src: Private,
    position: { row: 6, col: 4 },
    team: "red",
  },
  {
    id: 15,
    name: "Private",
    src: Private,
    position: { row: 6, col: 5 },
    team: "red",
  },
  {
    id: 16,
    name: "Private",
    src: Private,
    position: { row: 6, col: 6 },
    team: "red",
  },
  {
    id: 17,
    name: "Private",
    src: Private,
    position: { row: 6, col: 7 },
    team: "red",
  },
  {
    id: 18,
    name: "Private",
    src: Private,
    position: { row: 6, col: 8 },
    team: "red",
  },
  {
    id: 42,
    name: "Private",
    src: Private,
    position: { row: 7, col: 0 },
    team: "red",
  },
  {
    id: 19,
    name: "Sergeant",
    src: Sergeant,
    position: { row: 7, col: 1 },
    team: "red",
  },
  {
    id: 20,
    name: "Lieutenant Colonel",
    src: Lieucol,
    position: { row: 7, col: 2 },
    team: "red",
  },
  {
    id: 21,
    name: "5-star General",
    src: Gen5b,
    position: { row: 0, col: 0 },
    team: "blue",
  },
  {
    id: 22,
    name: "4-star General",
    src: Gen4b,
    position: { row: 0, col: 1 },
    team: "blue",
  },
  {
    id: 23,
    name: "3-star General",
    src: Gen3b,
    position: { row: 0, col: 2 },
    team: "blue",
  },
  {
    id: 24,
    name: "2-star General",
    src: Gen2b,
    position: { row: 0, col: 3 },
    team: "blue",
  },
  {
    id: 25,
    name: "1-star General",
    src: Gen1b,
    position: { row: 0, col: 4 },
    team: "blue",
  },
  {
    id: 26,
    name: "Flag",
    src: Flagb,
    position: { row: 0, col: 5 },
    team: "blue",
  },
  {
    id: 27,
    name: "Colonel",
    src: Colonelb,
    position: { row: 0, col: 6 },
    team: "blue",
  },
  {
    id: 28,
    name: "Captain",
    src: Captainb,
    position: { row: 0, col: 7 },
    team: "blue",
  },
  {
    id: 29,
    name: "1st Lieutenant",
    src: Lieu1stb,
    position: { row: 0, col: 8 },
    team: "blue",
  },
  {
    id: 30,
    name: "2nd Lieutenant",
    src: Lieu2ndb,
    position: { row: 1, col: 0 },
    team: "blue",
  },
  {
    id: 31,
    name: "Spy",
    src: Spyb,
    position: { row: 1, col: 1 },
    team: "blue",
  },
  {
    id: 32,
    name: "Spy",
    src: Spyb,
    position: { row: 1, col: 2 },
    team: "blue",
  },
  {
    id: 33,
    name: "Major",
    src: Majorb,
    position: { row: 1, col: 3 },
    team: "blue",
  },
  {
    id: 34,
    name: "Private",
    src: Privateb,
    position: { row: 1, col: 4 },
    team: "blue",
  },
  {
    id: 35,
    name: "Private",
    src: Privateb,
    position: { row: 1, col: 5 },
    team: "blue",
  },
  {
    id: 36,
    name: "Private",
    src: Privateb,
    position: { row: 1, col: 6 },
    team: "blue",
  },
  {
    id: 37,
    name: "Private",
    src: Privateb,
    position: { row: 1, col: 7 },
    team: "blue",
  },
  {
    id: 38,
    name: "Private",
    src: Privateb,
    position: { row: 1, col: 8 },
    team: "blue",
  },
  {
    id: 39,
    name: "Private",
    src: Privateb,
    position: { row: 2, col: 0 },
    team: "blue",
  },
  {
    id: 40,
    name: "Sergeant",
    src: Sergeantb,
    position: { row: 2, col: 1 },
    team: "blue",
  },
  {
    id: 41,
    name: "Lieutenant Colonel",
    src: Lieucolb,
    position: { row: 2, col: 2 },
    team: "blue",
  },
];

// Rank hierarchy for combat resolution
const rankHierarchy = {
  Spy: 15, // Spy can eliminate all officers but is defeated by Private
  "5-star General": 14,
  "4-star General": 13,
  "3-star General": 12,
  "2-star General": 11,
  "1-star General": 10,
  Colonel: 9,
  "Lieutenant Colonel": 8,
  Major: 7,
  Captain: 6,
  "1st Lieutenant": 5,
  "2nd Lieutenant": 4,
  Sergeant: 3,
  Private: 2,
  Flag: 1, // Flag can be eliminated by any piece
};

const AnalysisTool = () => {
  const navigate = useNavigate();
  const [pieces, setPieces] = useState(initialPieces);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    position: { x: 0, y: 0 },
  });
  const [suggestedMoves, setSuggestedMoves] = useState([]);
  const [validMoves, setValidMoves] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [color, setColor] = useState("B");
  const [toMove, setToMove] = useState("B");
  const [infostateMatrix, setInfoStateMatrix] = useState([]);
  const [anticipating, setAnticipating] = useState(false);
  const [modelName, setModelName] = useState("csd10k"); // Initialize with a default value
  const [strategy, setStrategy] = useState({});
  const [action, setAction] = useState("");
  const [outcome, setOutcome] = useState("");
  const [sampledChoice, setSampledChoice] = useState(null);
  const [aiFormation, setAIFormation] = useState([]);
  const [moveList, setMoveList] = useState([]);
  const [moveListIndex, setMoveListIndex] = useState(-1);
  const [infostateMatrixList, setInfoStateMatrixList] = useState([]);
  const [pieceArrayList, setPieceArrayList] = useState([]);

  
  const BLUE_FLAG = 1;
  const BLUE_SPY = 15; // Rankings are 1 to 15
  const RED_FLAG = 16;
  const RED_SPY = 30; // Red pieces are denoted as ranking + 15

  // Calculate valid moves when a piece is selected
  useEffect(() => {
    if (selectedPiece && gameStarted) {
      const { position, team } = selectedPiece;
      const moves = [];

      // Define possible movement directions
      const directions = [
        { row: position.row - 1, col: position.col }, // Up
        { row: position.row + 1, col: position.col }, // Down
        { row: position.row, col: position.col - 1 }, // Left
        { row: position.row, col: position.col + 1 }, // Right
      ];

      // Evaluate each direction for valid moves
      directions.forEach((dir) => {
        if (dir.row >= 0 && dir.row < 8 && dir.col >= 0 && dir.col < 9) {
          const isAlliedPiece = pieces.some(
            (p) =>
              p.position?.row === dir.row &&
              p.position?.col === dir.col &&
              p.team === team
          );

          if (!isAlliedPiece) {
            const opponentPiece = pieces.find(
              (p) =>
                p.position?.row === dir.row &&
                p.position?.col === dir.col &&
                p.team !== team
            );

            let moveType = opponentPiece ? "attack" : "move";
            let probability = 100;
            let outcomeDescription = "Safe move";

            // Determine combat outcomes
            if (opponentPiece) {
              const { name } = selectedPiece;
              const selectedRank = rankHierarchy[name];
              const opponentRank = rankHierarchy[opponentPiece.name];

              if (name === "Spy" && opponentPiece.name === "Private") {
                probability = 0;
                outcomeDescription = "Defeat: Spy loses to Private";
              } else if (name === "Spy") {
                outcomeDescription = "Victory: Spy defeats officer";
              } else if (opponentPiece.name === "Spy" && name === "Private") {
                outcomeDescription = "Victory: Private defeats Spy";
              } else if (opponentPiece.name === "Spy") {
                probability = 0;
                outcomeDescription = "Defeat: Spy defeats officer";
              } else {
                if (selectedRank > opponentRank) {
                  outcomeDescription = `Victory: ${name} defeats ${opponentPiece.name}`;
                } else if (selectedRank < opponentRank) {
                  probability = 0;
                  outcomeDescription = `Defeat: ${opponentPiece.name} defeats ${name}`;
                } else {
                  probability = 0;
                  outcomeDescription = `Draw: Both pieces eliminated`;
                }
              }
            }

            moves.push({
              position: { row: dir.row, col: dir.col },
              type: moveType,
              probability,
              description: outcomeDescription,
              opponentPiece: opponentPiece || null,
            });
          }
        }
      });

      setValidMoves(moves);

      // Generate suggested moves based on valid moves
      const winningMoves = moves.filter(
        (move) => move.type === "attack" && move.probability === 100
      );
      const safeMoves = moves.filter((move) => move.type === "move");

      const sortedMoves = [...winningMoves, ...safeMoves];

      // Add probability/confidence values
      const suggestedWithConfidence = sortedMoves.map((move, index) => {
        const baseConfidence = index === 0 ? 90 : 90 - index * 15;
        const confidence = Math.max(baseConfidence, 50);
        return { ...move, confidence };
      });

      setSuggestedMoves(suggestedWithConfidence.slice(0, 3)); // Top 3 suggestions
    } else {
      setValidMoves([]);
      setSuggestedMoves([]);
    }
  }, [selectedPiece, pieces, gameStarted]);

  const handleTileClick = (row, col) => {
    if (!gameStarted) return;

    // Remove the outcomeContainer if it exists
    const existingOutcomeContainer =
      document.querySelector(".outcome-container");
    if (existingOutcomeContainer) {
      document.body.removeChild(existingOutcomeContainer);
    }

    if (selectedPiece) {
      const { position, team, name } = selectedPiece;

      // Allow moves in all directions (one tile)
      const isValidMove =
        (row === position.row - 1 && col === position.col) || // Up
        (row === position.row && col === position.col - 1) || // Left
        (row === position.row && col === position.col + 1) || // Right
        (row === position.row + 1 && col === position.col); // Down

      // Check for opponent and allied pieces
      const opponentPiece = pieces.find(
        (p) =>
          p.position?.row === row && p.position?.col === col && p.team !== team
      );
      const alliedPiece = pieces.some(
        (p) =>
          p.position?.row === row && p.position?.col === col && p.team === team
      );

      if (isValidMove && opponentPiece) {
        const move = `${position.row}${position.col}${row}${col}`;
        const outcomeContainer = document.createElement("div");
        outcomeContainer.className = "outcome-container"; // Add a class for easier selection
        outcomeContainer.style.position = "absolute";
        outcomeContainer.style.top = "50%";
        outcomeContainer.style.left = "50%";
        outcomeContainer.style.transform = "translate(-50%, -50%)";
        outcomeContainer.style.backgroundColor = "white";
        outcomeContainer.style.padding = "20px";
        outcomeContainer.style.border = "1px solid black";
        outcomeContainer.style.zIndex = "1000";

        const winButton = document.createElement("button");
        winButton.textContent = "Win";
        winButton.onclick = () => {
          setOutcome("win");
          setAction(move);
          document.body.removeChild(outcomeContainer);
        };

        const lossButton = document.createElement("button");
        lossButton.textContent = "Loss";
        lossButton.onclick = () => {
          setOutcome("loss");
          setAction(move);
          document.body.removeChild(outcomeContainer);
        };

        const drawButton = document.createElement("button");
        drawButton.textContent = "Draw";
        drawButton.onclick = () => {
          setOutcome("draw");
          setAction(move);
          document.body.removeChild(outcomeContainer);
        };

        outcomeContainer.appendChild(winButton);
        outcomeContainer.appendChild(lossButton);
        outcomeContainer.appendChild(drawButton);

        document.body.appendChild(outcomeContainer);

        setSelectedPiece(null); // Deselect the piece after the move
      } else if (isValidMove && alliedPiece) {
        alert("Allies cannot be challenged! Choose another spot.");
        setSelectedPiece(null); // Deselect the piece
      } else if (isValidMove) {
        const move = `${position.row}${position.col}${row}${col}`;
        fetch(`http://127.0.0.1:8000/api/analysis/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model_name: modelName,
            infostate_matrix: infostateMatrix,
            color: color,
            player_to_move: toMove,
            anticipating: anticipating,
            player_move: move,
            move_result: "occupy",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setInfoStateMatrix(data.infostate_matrix);
            setInfoStateMatrixList((prevList) => [
              ...prevList,
              data.infostate_matrix,
            ]);
            setStrategy(data.strategy);
            setSampledChoice(data.sampled_action);
            setAnticipating(data.anticipating);
            setToMove(data.player_to_move);
          })
          .catch((error) => console.error("Error updating game data:", error));
        setSelectedPiece(null); // Deselect the piece after the move
      } else {
        // If the move is invalid, allow selecting a new piece
        const piece = pieces.find(
          (p) => p.position?.row === row && p.position?.col === col
        );
        if (piece) setSelectedPiece(piece);
      }
    } else {
      // Allow selecting a piece if none is currently selected
      const piece = pieces.find(
        (p) => p.position?.row === row && p.position?.col === col
      );
      if (piece) setSelectedPiece(piece);
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1); 
  };

  const allowDrop = (e) => e.preventDefault();

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData("pieceId");
    if (!pieceId) return;

    const draggedPiece = pieces.find((p) => p.id.toString() === pieceId);
    if (!draggedPiece) return;

    if (gameStarted) {
      // Game has started - restrict movement to adjacent tiles
      const { position, team } = draggedPiece;

      // Check if the target position is adjacent to the current position
      const isValidMove =
        (row === position.row - 1 && col === position.col) || // Up
        (row === position.row && col === position.col - 1) || // Left
        (row === position.row && col === position.col + 1) || // Right
        (row === position.row + 1 && col === position.col); // Down

      if (!isValidMove) {
        return; // Prevent dropping on non-adjacent tiles
      }

      // Check for opponent piece in target position
      const opponentPiece = pieces.find(
        (p) =>
          p.position?.row === row && p.position?.col === col && p.team !== team
      );
      if (opponentPiece) {
        // Handle combat using the same logic as in handleTileClick
        const name = draggedPiece.name;

        // Handle special case for Spy first
        if (name === "Spy" && opponentPiece.name === "Private") {
          // Spy loses to Private
          console.log(`${opponentPiece.name} defeats ${name}`);
          setPieces((prevPieces) =>
            prevPieces.filter((p) => p.id !== draggedPiece.id)
          );
        } else if (name === "Spy" && opponentPiece.name !== "Flag") {
          // Spy wins against all officers
          console.log(`${name} defeats ${opponentPiece.name}`);
          setPieces((prevPieces) =>
            prevPieces
              .map((p) =>
                p.id === draggedPiece.id ? { ...p, position: { row, col } } : p
              )
              .filter((p) => p.id !== opponentPiece.id)
          );
        } else if (opponentPiece.name === "Spy" && name === "Private") {
          // Private defeats Spy
          console.log(`${name} defeats ${opponentPiece.name}`);
          setPieces((prevPieces) =>
            prevPieces
              .map((p) =>
                p.id === draggedPiece.id ? { ...p, position: { row, col } } : p
              )
              .filter((p) => p.id !== opponentPiece.id)
          );
        } else if (opponentPiece.name === "Spy" && name !== "Flag") {
          // Spy defeats all officers
          console.log(`${opponentPiece.name} defeats ${name}`);
          setPieces((prevPieces) =>
            prevPieces.filter((p) => p.id !== draggedPiece.id)
          );
        } else {
          // Regular combat resolution based on rank
          const selectedRank = rankHierarchy[name];
          const opponentRank = rankHierarchy[opponentPiece.name];

          if (selectedRank > opponentRank) {
            // Player's piece wins
            console.log(`${name} defeats ${opponentPiece.name}`);
            setPieces((prevPieces) =>
              prevPieces
                .map((p) =>
                  p.id === draggedPiece.id
                    ? { ...p, position: { row, col } }
                    : p
                )
                .filter((p) => p.id !== opponentPiece.id)
            );
          } else if (selectedRank < opponentRank) {
            // Opponent's piece wins
            console.log(`${opponentPiece.name} defeats ${name}`);
            setPieces((prevPieces) =>
              prevPieces
                .map((p) =>
                  p.id === opponentPiece.id
                    ? { ...p, position: { row, col } }
                    : p
                )
                .filter((p) => p.id !== draggedPiece.id)
            );
          } else {
            // Both pieces are eliminated
            console.log(
              `${name} and ${opponentPiece.name} are both eliminated`
            );
            setPieces((prevPieces) =>
              prevPieces.filter(
                (p) => p.id !== draggedPiece.id && p.id !== opponentPiece.id
              )
            );
          }
        }
        return;
      }

      // Check for allied piece in target position
      const alliedPiece = pieces.some(
        (p) =>
          p.position?.row === row && p.position?.col === col && p.team === team
      );
      if (alliedPiece) {
        alert("Allies cannot be challenged! Choose another spot.");
        return;
      }
    } else {
      // During setup phase - enforce team-specific placement restrictions

      // Check if the position is already occupied
      const isOccupied = pieces.some(
        (p) => p.position?.row === row && p.position?.col === col
      );
      if (isOccupied) return;

      // Enforce placement zones based on team
      if (draggedPiece.team === "opponent") {
        // Opponent pieces can only be placed in top 3 rows (0-2)
        if (row > 2) {
          alert("Opponent pieces can only be placed in the top 3 rows!");
          return;
        }
      } else if (draggedPiece.team === "player") {
        // Player pieces can only be placed in bottom 3 rows (5-7)
        if (row < 5) {
          alert("Your pieces can only be placed in the bottom 3 rows!");
          return;
        }
      }
    }

    // Update the position of the dragged piece
    setPieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.id.toString() === pieceId
          ? { ...piece, position: { row, col } }
          : piece
      )
    );
  };

  const handlePlayClick = () => {
    setGameStarted(true);

    const boardMatrix = Array.from({ length: 8 }, () =>
      Array.from({ length: 9 }, () => Array(2).fill(0))
    );
    console.log("Initialized board matrix:", boardMatrix);
    pieces.forEach((piece) => {
      if (piece.team === "blue" && color === "B") {
        const { row, col } = piece.position;
        const rankValue = rankHierarchy[piece.name];
        boardMatrix[row][col][0] = rankValue;
        boardMatrix[row][col][1] = rankValue;
      } else if (piece.team === "red" && color === "B") {
        const { row, col } = piece.position;
        boardMatrix[row][col] = [RED_FLAG, RED_SPY];
      } else if (piece.team === "red" && color === "R") {
        const { row, col } = piece.position;
        const rankValue = rankHierarchy[piece.name];
        boardMatrix[row][col][0] = rankValue + BLUE_SPY;
        boardMatrix[row][col][1] = rankValue + BLUE_SPY;
      } else if (piece.team === "blue" && color === "R") {
        const { row, col } = piece.position;
        boardMatrix[row][col] = [BLUE_FLAG, BLUE_SPY];
      }
    });
    console.log(boardMatrix);
    setInfoStateMatrix(boardMatrix);
    setInfoStateMatrixList((prevList) => [...prevList, boardMatrix]);
  };

  const handleGetAIFormation = () => {
    const filteredPieces = pieces.filter((piece) => {
      if (color === "B" && piece.team === "blue") {
        return false; // Remove blue pieces if color is B
      }
      if (color === "R" && piece.team === "red") {
        return false; // Remove red pieces if color is R
      }
      return true; // Keep all other pieces
    });
    setPieces(filteredPieces);

    fetch(`http://127.0.0.1:8000/api/aiformation/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAIFormation(data);
      })
      .catch((error) => console.error("Error updating game data:", error));
  };

  const handleUndo = () => {
    // Reverse the toMove
    setToMove((prevToMove) => (prevToMove === "B" ? "R" : "B"));
    // Reverse the anticipating value
    if (anticipating) {
      setAnticipating(false);
    }
    // Move to the previous piece array
    setPieces(pieceArrayList[pieceArrayList.length - 2]);
    setPieceArrayList((prevList) => prevList.slice(0, -1));
    // Move to the previous infostate matrix array
    setInfoStateMatrix(infostateMatrixList[infostateMatrixList.length - 2]);
    setInfoStateMatrixList((prevList) => prevList.slice(0, -1));
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

  // Log changes to color and toMove
  useEffect(() => {
    console.log("Color changed to:", color);
  }, [color]);

  useEffect(() => {
    console.log("ToMove changed to:", toMove);
  }, [toMove]);

  useEffect(() => {
    console.log(infostateMatrix);
  }, [infostateMatrix]);

  useEffect(() => {
    const teamColor = color === "B" ? "blue" : "red";
    if (infostateMatrix.length > 0) {
      const newPieces = processInfostate(
        infostateMatrix,
        teamColor,
        rankHierarchy,
        initialPieces,
        BLUE_FLAG,
        BLUE_SPY,
        RED_FLAG,
        RED_SPY
      );
      console.log(infostateMatrix);
      console.log("Model Name:");
      console.log(modelName);
      setPieces(newPieces);
      setPieceArrayList((prevList) => [...prevList, newPieces]);

      fetch(`http://127.0.0.1:8000/api/analysis/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model_name: modelName,
          infostate_matrix: infostateMatrix,
          color: color,
          player_to_move: toMove,
          anticipating: anticipating,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setStrategy(data.strategy);
          setSampledChoice(data.sampled_action);
        })
        .catch((error) => console.error("Error updating game data:", error));
    }
  }, [infostateMatrix, modelName]);

  useEffect(() => {
    const tuples = [];
    if (color === "R") {
      for (let row = 5; row <= 7; row++) {
        for (let col = 0; col <= 8; col++) {
          tuples.push([row, col]);
        }
      }
    } else if (color === "B") {
      for (let row = 2; row >= 0; row--) {
        for (let col = 8; col >= 0; col--) {
          tuples.push([row, col]);
        }
      }
    }
    console.log("Generated tuples:", tuples);

    aiFormation.forEach((value) => {
      if (value === 0) {
        tuples.shift(); // Remove the first element in tuples
      } else {
        const rankName = Object.keys(rankHierarchy).find(
          (key) => rankHierarchy[key] === value
        );
        const team = color === "B" ? "blue" : "red";
        const position = tuples.shift(); // Get and remove the first element in tuples

        const newPiece = {
          id: pieces.length + 1 + Math.floor(Math.random() * 1000), // Generate a new unique ID with randomness
          name: rankName,
          src:
            initialPieces.find(
              (piece) => piece.name === rankName && piece.team === team
            )?.src || "", // Use the src from initialPieces or fallback to an empty string
          position: { row: position[0], col: position[1] },
          team: team,
        };

        setPieces((prevPieces) => [...prevPieces, newPiece]);
      }
    });
    console.log(pieces);
  }, [aiFormation]);

  useEffect(() => {
    const strategySum = Object.values(strategy).reduce(
      (sum, value) => sum + value,
      0
    );
    console.log("Sum of strategy values:", strategySum);
  }, [strategy]);

  useEffect(() => {
    console.log(outcome);
    fetch(`http://127.0.0.1:8000/api/analysis/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_name: modelName,
        infostate_matrix: infostateMatrix,
        color: color,
        player_to_move: toMove,
        anticipating: anticipating,
        player_move: action,
        move_result: outcome,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInfoStateMatrix(data.infostate_matrix);
        setInfoStateMatrixList((prevList) => [
          ...prevList,
          data.infostate_matrix,
        ]);
        setStrategy(data.strategy);
        setSampledChoice(data.sampled_action);
        setAnticipating(data.anticipating);
        setToMove(data.player_to_move);
      })
      .catch((error) => console.error("Error updating game data:", error));
  }, [outcome, action]);

  return (
    <div className="analysis-tool-container">
      <button className="back-button" onClick={handleBackButtonClick}>
        ⬅ Back
      </button>
      
      <div className="left-functions">
        {!gameStarted && (
          <>
          <button
            onClick={handlePlayClick}
            className="play-button"
          >
            Begin Analysis
          </button>

          <button
            onClick={handleGetAIFormation}
            className="ai-formation-button"
          >
            Get AI Formation
          </button>

            <div className="model-selector">
              <label htmlFor="model-select">Choose Model:</label>
              <select
                id="model-select"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              >
                <option value="fivelayer">fivelayer</option>
                <option value="fivelayer10k">fivelayer10k</option>
                <option value="csd10k">csd10k</option>
              </select>
            </div>

            <div className="color-selector">
              <label htmlFor="color-select">Choose Team:</label>
              <select
                id="color-select"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                disabled={gameStarted}
              >
                <option value="B">Blue</option>
                <option value="R">Red</option>
              </select>
            </div>

            <div className="to-move-selector">
              <label htmlFor="to-move-select">Player to move:</label>
              <select
                id="to-move-select"
                value={toMove}
                onChange={(e) => setToMove(e.target.value)}
              >
                <option value="B">Blue</option>
                <option value="R">Red</option>
              </select>
            </div>
            </>
        )}
      </div>
    

      

      {gameStarted &&
        infostateMatrixList.length > 1 &&
        pieceArrayList.length > 1 && (
          <button
            onClick={handleUndo}
            className="undo-button"
            disabled={!gameStarted}
          >
            Undo
          </button>
        )}

      {color === "R" && (
        <div className="game-board-container">
          <div className="row-numbers">
            {Array.from({ length: 8 }).map((_, row) => (
              <div key={row} className="row-number">
                {row} {/* Zero-indexed row numbers */}
              </div>
            ))}
          </div>
          <div className="game-board">
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 9 }).map((_, col) => {
                const piece = pieces.find(
                  (p) => p.position?.row === row && p.position?.col === col
                );
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`tile ${
                      selectedPiece?.position?.row === row &&
                      selectedPiece?.position?.col === col
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleTileClick(row, col)}
                    onDrop={(e) => handleDrop(e, row, col)}
                    onDragOver={allowDrop}
                    onMouseEnter={(e) => {
                      setTooltip({
                        visible: true,
                        text: `Row: ${row}, Col: ${col}`,
                        position: { x: e.clientX, y: e.clientY },
                      });
                    }}
                    onMouseLeave={() =>
                      setTooltip({
                        visible: false,
                        text: "",
                        position: { x: 0, y: 0 },
                      })
                    }
                  >
                    {piece ? (
                      (piece.team === "blue" && color === "R") ||
                      (piece.team === "red" && color === "B") ? (
                        <div
                          className="opponent-placeholder"
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.setData("pieceId", piece.id);
                          }}
                        ></div>
                      ) : (
                        <img
                          src={piece.src}
                          alt={piece.name}
                          className="piece-image"
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.setData("pieceId", piece.id);
                          }}
                          onMouseEnter={(e) => {
                            setTooltip({
                              visible: true,
                              text: `${piece.name} (Row: ${row}, Col: ${col})`,
                              position: { x: e.clientX, y: e.clientY },
                            });
                          }}
                          onMouseLeave={() =>
                            setTooltip({
                              visible: false,
                              text: "",
                              position: { x: 0, y: 0 },
                            })
                          }
                        />
                      )
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
          <div className="column-numbers">
            {Array.from({ length: 9 }).map((_, col) => (
              <div key={col} className="column-number">
                {col} {/* Zero-indexed column numbers */}
              </div>
            ))}
          </div>
        </div>
      )}

      {color === "B" && (
        <div className="game-board-container">
          <div className="row-numbers">
            {Array.from({ length: 8 }).map((_, row) => (
              <div key={row} className="row-number">
                {7 - row} {/* Row numbers are reversed for the flipped board */}
              </div>
            ))}
          </div>
          <div className={`game-board flipped`}>
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 9 }).map((_, col) => {
                const flippedRow = 7 - row;
                const flippedCol = 8 - col;
                const piece = pieces.find(
                  (p) =>
                    p.position?.row === flippedRow &&
                    p.position?.col === flippedCol
                );
                return (
                  <div
                    key={`${flippedRow}-${flippedCol}`}
                    className={`tile ${
                      selectedPiece?.position?.row === flippedRow &&
                      selectedPiece?.position?.col === flippedCol
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleTileClick(flippedRow, flippedCol)}
                    onDrop={(e) => handleDrop(e, flippedRow, flippedCol)}
                    onDragOver={allowDrop}
                    onMouseEnter={(e) => {
                      setTooltip({
                        visible: true,
                        text: `Row: ${flippedRow}, Col: ${flippedCol}`,
                        position: { x: e.clientX, y: e.clientY },
                      });
                    }}
                    onMouseLeave={() =>
                      setTooltip({
                        visible: false,
                        text: "",
                        position: { x: 0, y: 0 },
                      })
                    }
                  >
                    {piece ? (
                      (piece.team === "blue" && color === "R") ||
                      (piece.team === "red" && color === "B") ? (
                        <div
                          className="opponent-placeholder"
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.setData("pieceId", piece.id);
                          }}
                        ></div>
                      ) : (
                        <img
                          src={piece.src}
                          alt={piece.name}
                          className="piece-image"
                          draggable={true}
                          onDragStart={(e) => {
                            e.dataTransfer.setData("pieceId", piece.id);
                          }}
                          onMouseEnter={(e) => {
                            setTooltip({
                              visible: true,
                              text: `${piece.name} (Row: ${flippedRow}, Col: ${flippedCol})`,
                              position: { x: e.clientX, y: e.clientY },
                            });
                          }}
                          onMouseLeave={() =>
                            setTooltip({
                              visible: false,
                              text: "",
                              position: { x: 0, y: 0 },
                            })
                          }
                        />
                      )
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
          <div className="column-numbers">
            {Array.from({ length: 9 }).map((_, col) => (
              <div key={col} className="column-number">
                {8 - col}{" "}
                {/* Column numbers are reversed for the flipped board */}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="analysis-container">
        <h3>Suggested Strategy:</h3>
        <div className="suggested-moves">
          {Object.entries(strategy)
            .sort(([, valueA], [, valueB]) => valueB - valueA) // Sort by descending values
            .map(([key, value]) => (
              <div key={key}>
                {key}: {value}
              </div>
            ))}
        </div>
        <div className="sampled-action"></div>
        <h3>Sampled Action:</h3>
        <p>{sampledChoice ? sampledChoice : "No action sampled yet"}</p>
      </div>
    </div>
  );
};

export default AnalysisTool;
