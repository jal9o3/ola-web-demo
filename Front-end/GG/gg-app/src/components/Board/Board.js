import React, { useState } from 'react';
import './Board.css';

// Import images
import Gen5 from '../../assets/Gen5.png';
import Gen5b from '../../assets/Gen5b.png';
import Gen4 from '../../assets/Gen4.png';
import Gen4b from '../../assets/Gen4b.png';
import Gen3 from '../../assets/Gen3.png';
import Gen3b from '../../assets/Gen3b.png';
import Gen2 from '../../assets/Gen2.png';
import Gen2b from '../../assets/Gen2b.png';
import Gen1 from '../../assets/Gen1.png';
import Gen1b from '../../assets/Gen1b.png';
import Flag from '../../assets/Flag.png';
import Flagb from '../../assets/Flagb.png';
import Colonel from '../../assets/Colonel.png';
import Colonelb from '../../assets/Colonelb.png';
import Captain from '../../assets/Captain.png';
import Captainb from '../../assets/Captainb.png';
import Lieu1st from '../../assets/Lieu1st.png';
import Lieu1stb from '../../assets/Lieu1stb.png';
import Lieu2nd from '../../assets/Lieu2nd.png';
import Lieu2ndb from '../../assets/Lieu2ndb.png';
import Spy from '../../assets/Spy.png';
import Spyb from '../../assets/Spyb.png';
import Major from '../../assets/Major.png';
import Majorb from '../../assets/Majorb.png';
import Private from '../../assets/Private.png';
import Privateb from '../../assets/Privateb.png';
import Sergeant from '../../assets/Sergeant.png';
import Sergeantb from '../../assets/Sergeantb.png';
import Lieucol from '../../assets/Lieucol.png';
import Lieucolb from '../../assets/Lieucolb.png';

const urlParams = new URLSearchParams(window.location.search);
const accessKey = urlParams.get('accessKey');
const sessionName = urlParams.get('sessionName');

fetch(`http://127.0.0.1:8000/api/sessions/game-data/?session_name=${sessionName}&access_key=${accessKey}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching game data:', error));

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
    { id: 9, name: "1st Lieutenant", src: Lieu1stb, position: null, team: "blue" },
    { id: 10, name: "2nd Lieutenant", src: Lieu2ndb, position: null, team: "blue" },
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
    { id: 21, name: "Lieutenant Colonel", src: Lieucolb, position: null, team: "blue" },
    { id: 22, name: "5-star General", src: Gen5, position: { row: 0, col: 0 }, team: "red" },
    { id: 23, name: "4-star General", src: Gen4, position: { row: 0, col: 1 }, team: "red" },
    { id: 24, name: "3-star General", src: Gen3, position: { row: 0, col: 2 }, team: "red" },
    { id: 25, name: "2-star General", src: Gen2, position: { row: 0, col: 3 }, team: "red" },
    { id: 26, name: "1-star General", src: Gen1, position: { row: 0, col: 4 }, team: "red" },
    { id: 27, name: "Flag", src: Flag, position: { row: 0, col: 5 }, team: "red" },
    { id: 28, name: "Colonel", src: Colonel, position: { row: 0, col: 6 }, team: "red" },
    { id: 29, name: "Captain", src: Captain, position: { row: 0, col: 7 }, team: "red" },
    { id: 30, name: "1st Lieutenant", src: Lieu1st, position: { row: 0, col: 8 }, team: "red" },
    { id: 31, name: "2nd Lieutenant", src: Lieu2nd, position: { row: 1, col: 0 }, team: "red" },
    { id: 32, name: "Spy", src: Spy, position: { row: 1, col: 1 }, team: "red" },
    { id: 33, name: "Spy", src: Spy, position: { row: 1, col: 2 }, team: "red" },
    { id: 34, name: "Major", src: Major, position: { row: 1, col: 3 }, team: "red" },
    { id: 35, name: "Private", src: Private, position: { row: 1, col: 4 }, team: "red" },
    { id: 36, name: "Private", src: Private, position: { row: 1, col: 5 }, team: "red" },
    { id: 37, name: "Private", src: Private, position: { row: 1, col: 6 }, team: "red" },
    { id: 38, name: "Private", src: Private, position: { row: 1, col: 7 }, team: "red" },
    { id: 39, name: "Private", src: Private, position: { row: 1, col: 8 }, team: "red" },
    { id: 40, name: "Private", src: Private, position: { row: 2, col: 0 }, team: "red" },
    { id: 41, name: "Sergeant", src: Sergeant, position: { row: 2, col: 1 }, team: "red" },
    { id: 42, name: "Lieutenant Colonel", src: Lieucol, position: { row: 2, col: 2 }, team: "red" },
];

const Board = () => {
    const [pieces, setPieces] = useState(initialPieces);
    const [gameStarted, setGameStarted] = useState(false);
    const [playClicked, setPlayClicked] = useState(false);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [opponentVisible, setOpponentVisible] = useState(false);
    const [tooltip, setTooltip] = useState({ visible: false, text: '', position: { x: 0, y: 0 } });

    const rankHierarchy = {
        "Spy": 15, // Spy can eliminate all officers except privates
        "5-star General": 14,
        "4-star General": 13,
        "3-star General": 12,
        "2-star General": 11,
        "1-star General": 10,
        "Colonel": 9,
        "Lieutenant Colonel": 8,
        "Major": 7,
        "Captain": 6,
        "1st Lieutenant": 5,
        "2nd Lieutenant": 4,
        "Sergeant": 3,
        "Private": 2,
        "Flag": 1 // Flag can be eliminated by any piece including the opponent's flag
    };

    const handleTileClick = (row, col) => {
        if (!gameStarted) return;

        if (selectedPiece) {
            const { position, team, name } = selectedPiece;

            // Allow moves only Up, Left, or Right (one tile)
            const isValidMove =
                (row === position.row - 1 && col === position.col) ||  // Up
                (row === position.row && col === position.col - 1) ||  // Left
                (row === position.row && col === position.col + 1) ||  // Right
                (row === position.row + 1 && col === position.col);    // Down

            // Check for opponent and allied pieces 
            const opponentPiece = pieces.find(p => p.position?.row === row
                && p.position?.col === col && p.team !== team);
            const alliedPiece = pieces.some(p => p.position?.row === row
                && p.position?.col === col && p.team == team);

            if (isValidMove) {
                if (opponentPiece) {
                    const opponentRank = rankHierarchy[opponentPiece.name];
                    const selectedRank = rankHierarchy[name];

                    // Determine the outcome based on ranks
                    if (selectedRank > opponentRank) {
                        // Player's piece wins
                        setPieces(prevPieces => prevPieces.filter(
                            p => p.id !== opponentPiece.id)); // Remove opponent piece
                        setPieces(prevPieces =>
                            prevPieces.map(p =>
                                p.id === selectedPiece.id ? { ...p, position: { row, col } } : p
                            )
                        );
                    } else if (selectedRank < opponentRank) {
                        // Opponent's piece wins
                        setPieces(prevPieces => prevPieces.filter(
                            p => p.id !== selectedPiece.id)); // Remove player's piece
                    } else {
                        // Both pieces are eliminated
                        setPieces(prevPieces => prevPieces.filter(
                            p => p.id !== selectedPiece.id && p.id !== opponentPiece.id));
                    }
                } else if (alliedPiece) {
                    //alert("Allies cannot be challenged! Choose another spot.");
                    return;
                } else {
                    // Move the selected piece if no opponent piece is present
                    setPieces(prevPieces =>
                        prevPieces.map(p =>
                            p.id === selectedPiece.id ? { ...p, position: { row, col } } : p
                        )
                    );
                }
                setSelectedPiece(null); // Deselect the piece after the move

            } else {
                // If the move is invalid, do not change the selected piece
                const piece = pieces.find(p => p.position?.row === row && p.position?.col === col
                    && p.team === "blue");
                if (piece) setSelectedPiece(piece); // Allow selecting a new piece
            }
        } else {
            // Allow selecting a piece if none is currently selected
            const piece = pieces.find(p => p.position?.row === row && p.position?.col === col
                && p.team === "blue");
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
            alert("You can only place pieces in rows 5, 6, and 7 before the game starts!");
            return;
        }

        // Prevent placing pieces on top of each other
        const isOccupied = pieces.some(p => p.position?.row === row && p.position?.col === col);
        if (isOccupied) {
            //alert("This tile is already occupied! Choose another spot.");
            return;
        }

        setPieces(prevPieces =>
            prevPieces.map(piece =>
                piece.id.toString() === pieceId ? { ...piece, position: { row, col } } : piece
            )
        );
    };

    const handlePlayClick = () => {
        setGameStarted(true);
        setPlayClicked(true);
        setOpponentVisible(true);

        // Remove highlight after 1 second for better UI feedback
        setTimeout(() => setPlayClicked(false), 10000);
    };

    const Tooltip = ({ text, position }) => {
        return (
            <div className="piece-tooltip" style={{ top: position.y, left: position.x }}>
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

    const allPiecesPlaced = pieces.every(piece => piece.position !== null);



    return (
        <div className='board-container'>
            <button
                onClick={handlePlayClick}
                className={`play-button ${allPiecesPlaced ? '' : 'disabled'} ${playClicked ? 'clicked' : ''}`}
                disabled={!allPiecesPlaced}
            >
                Play
            </button>

            <div className='game-board'>
                {Array.from({ length: 8 }).map((_, row) =>
                    Array.from({ length: 9 }).map((_, col) => {
                        const piece = pieces.find(p => p.position?.row === row && p.position?.col === col);
                        return (
                            <div
                                key={`${row}-${col}`}
                                className={`tile ${selectedPiece?.position?.row === row
                                    && selectedPiece?.position?.col === col ? 'selected' : ''}`}
                                onClick={() => handleTileClick(row, col)}
                                onDrop={(e) => handleDrop(e, row, col)}
                                onDragOver={allowDrop}
                            >
                                {piece ? (
                                    piece.team === "blue" ? (
                                        <img
                                            src={piece.src}
                                            alt={piece.name}
                                            className='piece-image'
                                            draggable={!gameStarted}
                                            onDragStart={(e) => handleDragStart(e, piece.id)}
                                            onMouseEnter={(e) => {
                                                setTooltip({
                                                    visible: true, text: piece.name, position: {
                                                        x: e.clientX, y: e.clientY
                                                    }
                                                });
                                            }}
                                            onMouseLeave={() => setTooltip({
                                                visible: false, text: '', position: {
                                                    x: 0, y: 0
                                                }
                                            })}
                                        />
                                    ) : (
                                        <div className="opponent-placeholder"></div> // Placeholder for opponent's pieces
                                    )
                                ) : null}
                            </div>
                        );
                    })
                )}
                {tooltip.visible && <Tooltip text={tooltip.text} position={tooltip.position} />}
            </div>

            <div className='piece-selection'>
                <div className='above-content'>
                    {!allPiecesPlaced && <h3>Available Pieces</h3>}
                    <button
                        onClick={handleHelpClick}
                        className="help-button">?</button>
                </div>

                <div className='pieces-list'>
                    {!allPiecesPlaced ? (
                        pieces
                            .filter(piece => piece.position === null)
                            .map(piece => (
                                <div key={piece.id} className="piece-container">
                                    <img
                                        src={piece.src}
                                        alt={piece.name}
                                        className='piece-image'
                                        draggable={!gameStarted}
                                        onDragStart={(e) => handleDragStart(e, piece.id)}
                                        onMouseEnter={(e) => {
                                            setTooltip({ visible: true, text: piece.name, position: { x: e.clientX, y: e.clientY } });
                                        }}
                                        onMouseLeave={() => setTooltip({ visible: false, text: '', position: { x: 0, y: 0 } })}
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