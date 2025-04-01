import React, { useState, useEffect } from "react";
import "./Board.css";

// Import images
import Gen5 from "../../assets/Gen5.png";
import Gen5b from "../../assets/Gen5b.png";
import Gen4 from "../../assets/Gen4.png";
import Gen4b from "../../assets/Gen4b.png";
import Gen3 from "../../assets/Gen3.png";
import Gen3b from "../../assets/Gen3b.png";
import Gen2 from "../../assets/Gen2.png";
import Gen2b from "../../assets/Gen2b.png";
import Gen1 from "../../assets/Gen1.png";
import Gen1b from "../../assets/Gen1b.png";
import Flag from "../../assets/Flag.png";
import Flagb from "../../assets/Flagb.png";
import Colonel from "../../assets/Colonel.png";
import Colonelb from "../../assets/Colonelb.png";
import Captain from "../../assets/Captain.png";
import Captainb from "../../assets/Captainb.png";
import Lieu1st from "../../assets/Lieu1st.png";
import Lieu1stb from "../../assets/Lieu1stb.png";
import Lieu2nd from "../../assets/Lieu2nd.png";
import Lieu2ndb from "../../assets/Lieu2ndb.png";
import Spy from "../../assets/Spy.png";
import Spyb from "../../assets/Spyb.png";
import Major from "../../assets/Major.png";
import Majorb from "../../assets/Majorb.png";
import Private from "../../assets/Private.png";
import Privateb from "../../assets/Privateb.png";
import Sergeant from "../../assets/Sergeant.png";
import Sergeantb from "../../assets/Sergeantb.png";
import Lieucol from "../../assets/Lieucol.png";
import Lieucolb from "../../assets/Lieucolb.png";

import { processInfostate } from "../../utils/processInfostate";

// Initial Pieces with 6 Privates and 2 Spies
const initialPieces = [
  { id: 1, name: "5-star General", src: Gen5b, position: null, team: "blue" },
  { id: 2, name: "4-star General", src: Gen4b, position: null, team: "blue" },
  { id: 3, name: "3-star General", src: Gen3b, position: null, team: "blue" },
  { id: 4, name: "2-star General", src: Gen2b, position: null, team: "blue" },
  { id: 5, name: "1-star General", src: Gen1b, position: null, team: "blue" },
  { id: 6, name: "Flag", src: Flagb, position: null, team: "blue" },
  { id: 7, name: "Colonel", src: Colonelb, position: null, team: "blue" },
  { id: 8, name: "Captain", src: Captainb, position: null, team: "blue" },
  {
    id: 9,
    name: "1st Lieutenant",
    src: Lieu1stb,
    position: null,
    team: "blue",
  },
  {
    id: 10,
    name: "2nd Lieutenant",
    src: Lieu2ndb,
    position: null,
    team: "blue",
  },
  { id: 11, name: "Spy", src: Spyb, position: null, team: "blue" },
  { id: 12, name: "Spy", src: Spyb, position: null, team: "blue" },
  { id: 13, name: "Major", src: Majorb, position: null, team: "blue" },
  { id: 14, name: "Private", src: Privateb, position: null, team: "blue" },
  { id: 15, name: "Private", src: Privateb, position: null, team: "blue" },
  { id: 16, name: "Private", src: Privateb, position: null, team: "blue" },
  { id: 17, name: "Private", src: Privateb, position: null, team: "blue" },
  { id: 18, name: "Private", src: Privateb, position: null, team: "blue" },
  { id: 19, name: "Private", src: Privateb, position: null, team: "blue" },
  { id: 20, name: "Sergeant", src: Sergeantb, position: null, team: "blue" },
  {
    id: 21,
    name: "Lieutenant Colonel",
    src: Lieucolb,
    position: null,
    team: "blue",
  },
  { id: 22, name: "5-star General", src: Gen5, position: null, team: "red" },
  { id: 23, name: "4-star General", src: Gen4, position: null, team: "red" },
  { id: 24, name: "3-star General", src: Gen3, position: null, team: "red" },
  { id: 25, name: "2-star General", src: Gen2, position: null, team: "red" },
  { id: 26, name: "1-star General", src: Gen1, position: null, team: "red" },
  { id: 27, name: "Flag", src: Flag, position: null, team: "red" },
  { id: 28, name: "Colonel", src: Colonel, position: null, team: "red" },
  { id: 29, name: "Captain", src: Captain, position: null, team: "red" },
  {
    id: 30,
    name: "1st Lieutenant",
    src: Lieu1st,
    position: null,
    team: "red",
  },
  {
    id: 31,
    name: "2nd Lieutenant",
    src: Lieu2nd,
    position: null,
    team: "red",
  },
  { id: 32, name: "Spy", src: Spy, position: null, team: "red" },
  { id: 33, name: "Spy", src: Spy, position: null, team: "red" },
  { id: 34, name: "Major", src: Major, position: null, team: "red" },
  { id: 35, name: "Private", src: Private, position: null, team: "red" },
  { id: 36, name: "Private", src: Private, position: null, team: "red" },
  { id: 37, name: "Private", src: Private, position: null, team: "red" },
  { id: 38, name: "Private", src: Private, position: null, team: "red" },
  { id: 39, name: "Private", src: Private, position: null, team: "red" },
  { id: 40, name: "Private", src: Private, position: null, team: "red" },
  { id: 41, name: "Sergeant", src: Sergeant, position: null, team: "red" },
  {
    id: 42,
    name: "Lieutenant Colonel",
    src: Lieucol,
    position: null,
    team: "red",
  },
];
// The pieces that belong to the AI will have their names and images set to null

const Board = () => {
  const BLUE_FLAG = 1;
  const BLUE_SPY = 15; // Rankings are 1 to 15
  const RED_FLAG = 16;
  const RED_SPY = 30; // Red pieces are denoted as ranking + 15

  const [aiColor, setAiColor] = useState("");
  const [humanColor, setHumanColor] = useState("");
  const [current_infostate, setCurrentInfostate] = useState([]);
  const [currentTurn, setCurrentTurn] = useState("Your turn"); // Default to player's turn
  const [modelName, setModelName] = useState("csd10k");

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessKey = urlParams.get("accessKey");
      const sessionName = urlParams.get("sessionName");

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/sessions/game-data/?session_name=${sessionName}&access_key=${accessKey}`
        );
        const data = await response.json();
        console.log(data);

        const setColor = (color) => {
          if (color === "R") return "red";
          if (color === "B") return "blue";
          return color;
        };

        setAiColor(setColor(data.ai_color));
        setHumanColor(setColor(data.human_color));
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchData();
  }, []);

  const [pieces, setPieces] = useState(initialPieces);
  const [gameStarted, setGameStarted] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [opponentVisible, setOpponentVisible] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    position: { x: 0, y: 0 },
  });

  const rankHierarchy = {
    Spy: 15, // Spy can eliminate all officers except privates
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
    Flag: 1, // Flag can be eliminated by any piece including the opponent's flag
  };

  const randomizePieces = () => {
    if (!humanColor) return; // Ensure humanColor is set before proceeding

    const availablePositions = [];
    for (let row = 5; row <= 7; row++) {
      for (let col = 0; col < 9; col++) {
        availablePositions.push({ row, col });
      }
    }

    // Shuffle the available positions
    for (let i = availablePositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availablePositions[i], availablePositions[j]] = [
        availablePositions[j],
        availablePositions[i],
      ];
    }

    // Get the pieces that belong to the human player
    const playerPieces = pieces.filter(
      (piece) => piece.team === humanColor && piece.position === null
    );

    // Assign random positions to the player pieces
    const newPieces = playerPieces.map((piece, index) => {
      const position = availablePositions[index];
      return { ...piece, position };
    });

    // Update the pieces state
    setPieces((prevPieces) => {
      const updatedPieces = prevPieces.map((piece) =>
        piece.team === humanColor
          ? newPieces.find((p) => p.id === piece.id) || piece
          : piece
      );
      return updatedPieces;
    });
  };

  const handleTileClick = (row, col) => {
    if (!gameStarted) return;

    const urlParams = new URLSearchParams(window.location.search);
    const sessionName = urlParams.get("sessionName");
    const accessKey = urlParams.get("accessKey");

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
        // Submit the move to the backend using PATCH
        fetch(`http://127.0.0.1:8000/api/sessions/game-data/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_name: sessionName,
            access_key: accessKey,
            move: move,
            model: modelName,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCurrentInfostate(data.current_infostate); // This will trigger the top-level useEffect
          })
          .catch((error) => console.error("Error updating game data:", error));
        setSelectedPiece(null); // Deselect the piece after the move

        // Move the selected piece if no opponent piece is present
        setPieces((prevPieces) =>
          prevPieces.map((p) =>
            p.id === selectedPiece.id ? { ...p, position: { row, col } } : p
          )
        );
        // Switch turn to AI after player's move
        setCurrentTurn("AI's turn");

        // Simulate AI's move (this is just a placeholder for actual AI logic)
        setTimeout(() => {
          // Here you would implement the AI's logic to make a move
          // For now, we'll just switch back to the player's turn
          setCurrentTurn("Your turn");
        }, 1000); // Simulate a delay for the AI's turn
      } else if (isValidMove && alliedPiece) {
        alert("Allies cannot be challenged! Choose another spot.");
        setSelectedPiece(null); // Deselect the piece after the move
      } else if (isValidMove) {
        const move = `${position.row}${position.col}${row}${col}`;
        // Submit the move to the backend using PATCH
        fetch(`http://127.0.0.1:8000/api/sessions/game-data/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_name: sessionName,
            access_key: accessKey,
            move: move,
            model: modelName,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setCurrentInfostate(data.current_infostate); // This will trigger the top-level useEffect
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

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    if (gameStarted) return;

    const pieceId = e.dataTransfer.getData("pieceId");
    if (!pieceId) return;

    // Ensure placement is within rows 5, 6, and 7
    if (!gameStarted && (row < 5 || row > 7)) {
      alert(
        "You can only place pieces in rows 5, 6, and 7 before the game starts!"
      );
      return;
    }

    // Prevent placing pieces on top of each other
    const isOccupied = pieces.some(
      (p) => p.position?.row === row && p.position?.col === col
    );
    if (isOccupied) {
      //alert("This tile is already occupied! Choose another spot.");
      return;
    }

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
    setPlayClicked(true);
    setOpponentVisible(true);

    // Remove highlight after 1 second for better UI feedback
    setTimeout(() => setPlayClicked(false), 10000);

    const lastThreeRows = [];

    for (let row = 5; row < 8; row++) {
      for (let col = 0; col < 9; col++) {
        const piece = pieces.find(
          (p) => p.position?.row === row && p.position?.col === col
        );
        lastThreeRows.push({ row, col, piece });
      }
    }

    // Sort the array from left to right, top to bottom
    lastThreeRows.sort((a, b) => {
      if (a.row === b.row) {
        return a.col - b.col;
      }
      return a.row - b.row;
    });

    const formationValues = lastThreeRows.map((tile) =>
      tile.piece ? rankHierarchy[tile.piece.name] : 0
    );
    const urlParams = new URLSearchParams(window.location.search);
    const sessionName = urlParams.get("sessionName");
    const accessKey = urlParams.get("accessKey");
    console.log(sessionName);
    console.log(accessKey);

    // Send the formation values to the backend using PATCH
    fetch(`http://127.0.0.1:8000/api/sessions/game-data/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_name: sessionName,
        access_key: accessKey,
        human_initial_formation: formationValues,
        model: modelName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.current_infostate);
        setCurrentInfostate(data.current_infostate);
      })
      .catch((error) => console.error("Error updating game data:", error));
  };

  useEffect(() => {
    if (current_infostate.length > 0) {
      const newPieces = processInfostate(
        current_infostate,
        humanColor,
        rankHierarchy,
        initialPieces,
        BLUE_FLAG,
        BLUE_SPY,
        RED_FLAG,
        RED_SPY
      );
      setPieces(newPieces);
    }
  }, [current_infostate]);

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

  const handleHelpClick = () => {
    const hierarchy = `
            Rank Hierarchy:

            Spy: 15 (Can only be defeated by privates)
            5-star General: 14
            4-star General: 13
            3-star General: 12
            2-star General: 11
            1-star General: 10
            Colonel: 9
            Lieutenant Colonel: 8
            Major: 7
            Captain: 6
            1st Lieutenant: 5
            2nd Lieutenant: 4
            Sergeant: 3
            Private: 2
            Flag: 1 (Flag can be eliminated by any piece including the opponent's flag)
        `;
    alert(hierarchy);
  };

  const handleDragStart = (e, pieceId) => {
    e.dataTransfer.setData("pieceId", pieceId);
  };

  const allowDrop = (e) => e.preventDefault();

  const allPiecesPlaced = pieces.every((piece) => piece.position !== null);
  const allHumanPiecesPlaced = pieces
    .filter((piece) => piece.team === humanColor)
    .every((piece) => piece.position !== null);

  return (
  <div className="board-container">
  <button className="back-button" onClick={handleBackButtonClick}>
        ⬅ Back
      </button>
    {gameStarted && (
      <div className="turn-indicator">
        <h3>Turn: {currentTurn}</h3>
      </div>
    )}

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

      <div className="button-container">
        <button
          onClick={handlePlayClick}
          className={`play-button ${allHumanPiecesPlaced ? "" : "disabled"} ${
            playClicked ? "clicked" : ""
          }`}
          disabled={!allHumanPiecesPlaced}
        >
          Play
        </button>

        <button
          onClick={randomizePieces}
          className="randomize-button"
          disabled={gameStarted} // Disable if the game has started
        >
          Randomize
        </button>
      </div>

      <div className="game-board">
        {/* For every row */}
        {Array.from({ length: 8 }).map(
          (
            _, // Current element
            row // Current index
          ) =>
            // For every column
            Array.from({ length: 9 }).map((_, col) => {
              const piece = pieces.find(
                (p) => p.position?.row === row && p.position?.col === col
              ); // Find the piece at the current position if any
              return (
                <div
                  key={`${row}-${col}`}
                  className={`tile ${
                    selectedPiece?.position?.row === row &&
                    selectedPiece?.position?.col === col
                      ? "selected"
                      : ""
                  }`} // If piece's location matches selected piece, add to 'selected' class
                  onClick={() => handleTileClick(row, col)}
                  onDrop={(e) => handleDrop(e, row, col)}
                  onDragOver={allowDrop}
                >
                  {piece ? (
                    piece.team === humanColor ? (
                      // Set the image of a visible piece
                      <img
                        src={piece.src}
                        alt={piece.name}
                        className="piece-image"
                        draggable={!gameStarted}
                        onDragStart={(e) => handleDragStart(e, piece.id)}
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
                    ) : gameStarted ? (
                      // Display the placeholder for a hidden piece only when the game has started
                      <div className="opponent-placeholder"></div>
                    ) : // Otherwise, display an empty tile
                    null
                  ) : // Otherwise, display an empty tile
                  null}
                </div>
              );
            })
        )}
        {tooltip.visible && (
          <Tooltip text={tooltip.text} position={tooltip.position} />
        )}
      </div>

      <div className="piece-selection">
        <div className="above-content">
          {!allPiecesPlaced && <h3>Available Pieces</h3>}
          <button onClick={handleHelpClick} className="help-button">
            ?
          </button>
        </div>

        <div className="pieces-list">
          {!allPiecesPlaced ? (
            pieces
              .filter(
                (piece) => piece.position === null && piece.team === humanColor
              )
              .map((piece) => (
                <div key={piece.id} className="piece-container">
                  <img
                    src={piece.src}
                    alt={piece.name}
                    className="piece-image"
                    draggable={!gameStarted}
                    onDragStart={(e) => handleDragStart(e, piece.id)}
                    onMouseEnter={(e) => {
                      setTooltip({
                        visible: true,
                        text: piece.name,
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
                </div>
              ))
          ) : (
            <p></p> // Optional message when all pieces are placed
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
