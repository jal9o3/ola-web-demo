// AnalysisTool.js
import React, { useState, useEffect } from 'react';
import './AnalysisTool.css'; // Ensure you create this CSS file

// Import images (same as in Board.js)
import Gen5 from '../assets/Gen5.png';
import Gen5b from '../assets/Gen5b.png';
import Gen4 from '../assets/Gen4.png';
import Gen4b from '../assets/Gen4b.png';
import Gen3 from '../assets/Gen3.png';
import Gen3b from '../assets/Gen3b.png';
import Gen2 from '../assets/Gen2.png';
import Gen2b from '../assets/Gen2b.png';
import Gen1 from '../assets/Gen1.png';
import Gen1b from '../assets/Gen1b.png';
import Flag from '../assets/Flag.png';
import Flagb from '../assets/Flagb.png';
import Colonel from '../assets/Colonel.png';
import Colonelb from '../assets/Colonelb.png';
import Captain from '../assets/Captain.png';
import Captainb from '../assets/Captainb.png';
import Lieu1st from '../assets/Lieu1st.png';
import Lieu1stb from '../assets/Lieu1stb.png';
import Lieu2nd from '../assets/Lieu2nd.png';
import Lieu2ndb from '../assets/Lieu2ndb.png';
import Spy from '../assets/Spy.png';
import Spyb from '../assets/Spyb.png';
import Major from '../assets/Major.png';
import Majorb from '../assets/Majorb.png';
import Private from '../assets/Private.png';
import Privateb from '../assets/Privateb.png';
import Sergeant from '../assets/Sergeant.png';
import Sergeantb from '../assets/Sergeantb.png';
import Lieucol from '../assets/Lieucol.png';
import Lieucolb from '../assets/Lieucolb.png';

// Initial Pieces with positions for both player and opponent
const initialPieces = [
    { id: 1, name: "5-star General", src: Gen5b, position: { row: 5, col: 0 }, team: "player" },
    { id: 2, name: "4-star General", src: Gen4b, position: { row: 5, col: 1 }, team: "player" },
    { id: 3, name: "3-star General", src: Gen3b, position: { row: 5, col: 2 }, team: "player" },
    { id: 4, name: "2-star General", src: Gen2b, position: { row: 5, col: 3 }, team: "player" },
    { id: 5, name: "1-star General", src: Gen1b, position: { row: 5, col: 4 }, team: "player" },
    { id: 6, name: "Flag", src: Flagb, position: { row: 5, col: 5 }, team: "player" },
    { id: 7, name: "Colonel", src: Colonelb, position: { row: 5, col: 6 }, team: "player" },
    { id: 8, name: "Captain", src: Captainb, position: { row: 5, col: 7 }, team: "player" },
    { id: 9, name: "1st Lieutenant", src: Lieu1stb, position: { row: 5, col: 8 }, team: "player" },
    { id: 10, name: "2nd Lieutenant", src: Lieu2ndb, position: { row: 6, col: 0 }, team: "player" },
    { id: 11, name: "Spy", src: Spyb, position: { row: 6, col: 1 }, team: "player" },
    { id: 12, name: "Spy", src: Spyb, position: { row: 6, col: 2 }, team: "player" },
    { id: 13, name: "Major", src: Majorb, position: { row: 6, col: 3 }, team: "player" },
    { id: 14, name: "Private", src: Privateb, position: { row: 6, col: 4 }, team: "player" },
    { id: 15, name: "Private", src: Privateb, position: { row: 6, col: 5 }, team: "player" },
    { id: 16, name: "Private", src: Privateb, position: { row: 6, col: 6 }, team: "player" },
    { id: 17, name: "Private", src: Privateb, position: { row: 6, col: 7 }, team: "player" },
    { id: 18, name: "Private", src: Privateb, position: { row: 6, col: 8 }, team: "player" },
    { id: 19, name: "Sergeant", src: Sergeantb, position: { row: 7, col: 0 }, team: "player" },
    { id: 20, name: "Lieutenant Colonel", src: Lieucolb, position: { row: 7, col: 1 }, team: "player" },
    { id: 21, name: "5-star General", src: Gen5, position: { row: 0, col: 0 }, team: "opponent" },
    { id: 22, name: "4-star General", src: Gen4, position: { row: 0, col: 1 }, team: "opponent" },
    { id: 23, name: "3-star General", src: Gen3, position: { row: 0, col: 2 }, team: "opponent" },
    { id: 24, name: "2-star General", src: Gen2, position: { row: 0, col: 3 }, team: "opponent" },
    { id: 25, name: "1-star General", src: Gen1, position: { row: 0, col: 4 }, team: "opponent" },
    { id: 26, name: "Flag", src: Flag, position: { row: 0, col: 5 }, team: "opponent" },
    { id: 27, name: "Colonel", src: Colonel, position: { row: 0, col: 6 }, team: "opponent" },
    { id: 28, name: "Captain", src: Captain, position: { row: 0, col: 7 }, team: "opponent" },
    { id: 29, name: "1st Lieutenant", src: Lieu1st, position: { row: 0, col: 8 }, team: "opponent" },
    { id: 30, name: "2nd Lieutenant", src: Lieu2nd, position: { row: 1, col: 0 }, team: "opponent" },
    { id: 31, name: "Spy", src: Spy, position: { row: 1, col: 1 }, team: "opponent" },
    { id: 32, name: "Spy", src: Spy, position: { row: 1, col: 2 }, team: "opponent" },
    { id: 33, name: "Major", src: Major, position: { row: 1, col: 3 }, team: "opponent" },
    { id: 34, name: "Private", src: Private, position: { row: 1, col: 4 }, team: "opponent" },
    { id: 35, name: "Private", src: Private, position: { row: 1, col: 5 }, team: "opponent" },
    { id: 36, name: "Private", src: Private, position: { row: 1, col: 6 }, team: "opponent" },
    { id: 37, name: "Private", src: Private, position: { row: 1, col: 7 }, team: "opponent" },
    { id: 38, name: "Private", src: Private, position: { row: 1, col: 8 }, team: "opponent" },
    { id: 39, name: "Private", src: Private, position: { row: 2, col: 0 }, team: "opponent" },
    { id: 40, name: "Sergeant", src: Sergeant, position: { row: 2, col: 1 }, team: "opponent" },
    { id: 41, name: "Lieutenant Colonel", src: Lieucol, position: { row: 2, col: 2 }, team: "opponent" },
];

// Rank hierarchy for combat resolution
const rankHierarchy = {
    "5-star General": 10,
    "4-star General": 9,
    "3-star General": 8,
    "2-star General": 7,
    "1-star General": 6,
    "Lieutenant Colonel": 5,
    "Colonel": 4,
    "Major": 3,
    "Captain": 2,
    "1st Lieutenant": 1,
    "2nd Lieutenant": 1,
    "Sergeant": 1,
    "Private": 0,
    "Spy": -1, // Spy can eliminate all officers but is defeated by Private
    "Flag": -1 // Flag can be eliminated by any piece
};

const AnalysisTool = () => {
    const [pieces, setPieces] = useState(initialPieces);
    const [gameStarted, setGameStarted] = useState(false);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, text: '', position: { x: 0, y: 0 } });
    const [suggestedMoves, setSuggestedMoves] = useState([]);
    const [validMoves, setValidMoves] = useState([]);

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
                { row: position.row, col: position.col + 1 }  // Right
            ];
    
            // Evaluate each direction for valid moves
            directions.forEach(dir => {
                if (dir.row >= 0 && dir.row < 8 && dir.col >= 0 && dir.col < 9) {
                    const isAlliedPiece = pieces.some(p => 
                        p.position?.row === dir.row && 
                        p.position?.col === dir.col && 
                        p.team === team
                    );
    
                    if (!isAlliedPiece) {
                        const opponentPiece = pieces.find(p => 
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
                            opponentPiece: opponentPiece || null
                        });
                    }
                }
            });
    
            setValidMoves(moves);
    
            // Generate suggested moves based on valid moves
            const winningMoves = moves.filter(move => move.type === "attack" && move.probability === 100);
            const safeMoves = moves.filter(move => move.type === "move");
    
            const sortedMoves = [
                ...winningMoves,
                ...safeMoves
            ];
    
            // Add probability/confidence values
            const suggestedWithConfidence = sortedMoves.map((move, index) => {
                const baseConfidence = index === 0 ? 90 : 90 - (index * 15);
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
    
        if (selectedPiece) {
            const { position, team, name } = selectedPiece;
    
            // Allow moves in all directions (one tile)
            const isValidMove =
                (row === position.row - 1 && col === position.col) ||  // Up
                (row === position.row && col === position.col - 1) ||  // Left
                (row === position.row && col === position.col + 1) ||  // Right
                (row === position.row + 1 && col === position.col);    // Down
    
            // Check for opponent and allied pieces 
            const opponentPiece = pieces.find(p => p.position?.row === row && p.position?.col === col && p.team !== team);
            const alliedPiece = pieces.some(p => p.position?.row === row && p.position?.col === col && p.team === team);
    
            if (isValidMove) {
                if (opponentPiece) {
                    // Handle special case for Spy first
                    if (name === "Spy" && opponentPiece.name === "Private") {
                        // Spy loses to Private
                        console.log(`${opponentPiece.name} defeats ${name}`);
                        setPieces(prevPieces => prevPieces.filter(p => p.id !== selectedPiece.id));
                    } else if (name === "Spy" && opponentPiece.name !== "Flag") {
                        // Spy wins against all officers
                        console.log(`${name} defeats ${opponentPiece.name}`);
                        setPieces(prevPieces => 
                            prevPieces.map(p => 
                                p.id === selectedPiece.id ? { ...p, position: { row, col } } : p
                            ).filter(p => p.id !== opponentPiece.id)
                        );
                    } else if (opponentPiece.name === "Spy" && name === "Private") {
                        // Private defeats Spy
                        console.log(`${name} defeats ${opponentPiece.name}`);
                        setPieces(prevPieces => 
                            prevPieces.map(p => 
                                p.id === selectedPiece.id ? { ...p, position: { row, col } } : p
                            ).filter(p => p.id !== opponentPiece.id)
                        );
                    } else if (opponentPiece.name === "Spy" && name !== "Flag") {
                        // Spy defeats all officers
                        console.log(`${opponentPiece.name} defeats ${name}`);
                        setPieces(prevPieces => prevPieces.filter(p => p.id !== selectedPiece.id));
                    } else {
                        // Regular combat resolution based on rank
                        const selectedRank = rankHierarchy[name];
                        const opponentRank = rankHierarchy[opponentPiece.name];
    
                        if (selectedRank > opponentRank) {
                            // Player's piece wins
                            console.log(`${name} defeats ${opponentPiece.name}`);
                            setPieces(prevPieces => 
                                prevPieces.map(p => 
                                    p.id === selectedPiece.id ? { ...p, position: { row, col } } : p
                                ).filter(p => p.id !== opponentPiece.id)
                            );
                        } else if (selectedRank < opponentRank) {
                            // Opponent's piece wins
                            console.log(`${opponentPiece.name} defeats ${name}`);
                            setPieces(prevPieces => 
                                prevPieces.map(p => 
                                    p.id === opponentPiece.id ? { ...p, position: { row, col } } : p
                                ).filter(p => p.id !== selectedPiece.id)
                            );
                        } else {
                            // Both pieces are eliminated
                            console.log(`${name} and ${opponentPiece.name} are both eliminated`);
                            setPieces(prevPieces => 
                                prevPieces.filter(p => p.id !== selectedPiece.id && p.id !== opponentPiece.id)
                            );
                        }
                    }
                } else if (alliedPiece) {
                    // Alert if trying to move to an allied piece
                    alert("Allies cannot be challenged! Choose another spot.");
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
                // If the move is invalid, allow selecting a new piece
                const piece = pieces.find(p => p.position?.row === row && p.position?.col === col);
                if (piece) setSelectedPiece(piece);
            }
        } else {
            // Allow selecting a piece if none is currently selected
            const piece = pieces.find(p => p.position?.row === row && p.position?.col === col);
            if (piece) setSelectedPiece(piece);
        }
    };

    const allowDrop = (e) => e.preventDefault();
    
    const handleDrop = (e, row, col) => {
        e.preventDefault();
        const pieceId = e.dataTransfer.getData("pieceId");
        if (!pieceId) return;
    
        const draggedPiece = pieces.find(p => p.id.toString() === pieceId);
        if (!draggedPiece) return;
    
        if (gameStarted) {
            // Game has started - restrict movement to adjacent tiles
            const { position, team } = draggedPiece;
    
            // Check if the target position is adjacent to the current position
            const isValidMove =
                (row === position.row - 1 && col === position.col) ||  // Up
                (row === position.row && col === position.col - 1) ||  // Left
                (row === position.row && col === position.col + 1) ||  // Right
                (row === position.row + 1 && col === position.col);    // Down
    
            if (!isValidMove) {
                return; // Prevent dropping on non-adjacent tiles
            }
    
            // Check for opponent piece in target position
            const opponentPiece = pieces.find(p => p.position?.row === row && p.position?.col === col && p.team !== team);
            if (opponentPiece) {
                // Handle combat using the same logic as in handleTileClick
                const name = draggedPiece.name;
    
                // Handle special case for Spy first
                if (name === "Spy" && opponentPiece.name === "Private") {
                    // Spy loses to Private
                    console.log(`${opponentPiece.name} defeats ${name}`);
                    setPieces(prevPieces => prevPieces.filter(p => p.id !== draggedPiece.id));
                } else if (name === "Spy" && opponentPiece.name !== "Flag") {
                    // Spy wins against all officers
                    console.log(`${name} defeats ${opponentPiece.name}`);
                    setPieces(prevPieces => 
                        prevPieces.map(p => 
                            p.id === draggedPiece.id ? { ...p, position: { row, col } } : p
                        ).filter(p => p.id !== opponentPiece.id)
                    );
                } else if (opponentPiece.name === "Spy" && name === "Private") {
                    // Private defeats Spy
                    console.log(`${name} defeats ${opponentPiece.name}`);
                    setPieces(prevPieces => 
                        prevPieces.map(p => 
                            p.id === draggedPiece.id ? { ...p, position: { row, col } } : p
                        ).filter(p => p.id !== opponentPiece.id)
                    );
                } else if (opponentPiece.name === "Spy" && name !== "Flag") {
                    // Spy defeats all officers
                    console.log(`${opponentPiece.name} defeats ${name}`);
                    setPieces(prevPieces => prevPieces.filter(p => p.id !== draggedPiece.id));
                } else {
                    // Regular combat resolution based on rank
                    const selectedRank = rankHierarchy[name];
                    const opponentRank = rankHierarchy[opponentPiece.name];
    
                    if (selectedRank > opponentRank) {
                        // Player's piece wins
                        console.log(`${name} defeats ${opponentPiece.name}`);
                        setPieces(prevPieces => 
                            prevPieces.map(p => 
                                p.id === draggedPiece.id ? { ...p, position: { row, col } } : p
                            ).filter(p => p.id !== opponentPiece.id)
                        );
                    } else if (selectedRank < opponentRank) {
                        // Opponent's piece wins
                        console.log(`${opponentPiece.name} defeats ${name}`);
                        setPieces(prevPieces => 
                            prevPieces.map(p => 
                                p.id === opponentPiece.id ? { ...p, position: { row, col } } : p
                            ).filter(p => p.id !== draggedPiece.id)
                        );
                    } else {
                        // Both pieces are eliminated
                        console.log(`${name} and ${opponentPiece.name} are both eliminated`);
                        setPieces(prevPieces => 
                            prevPieces.filter(p => p.id !== draggedPiece.id && p.id !== opponentPiece.id)
                        );
                    }
                }
                return;
            }
    
            // Check for allied piece in target position
            const alliedPiece = pieces.some(p => p.position?.row === row && p.position?.col === col && p.team === team);
            if (alliedPiece) {
                alert("Allies cannot be challenged! Choose another spot.");
                return;
            }
        } else {
            // During setup phase - enforce team-specific placement restrictions
    
            // Check if the position is already occupied
            const isOccupied = pieces.some(p => p.position?.row === row && p.position?.col === col);
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
        setPieces(prevPieces =>
            prevPieces.map(piece =>
                piece.id.toString() === pieceId ? { ...piece, position: { row, col } } : piece
            )
        );
    };

    const handlePlayClick = () => {
        setGameStarted(true);
    };

    const Tooltip = ({ text, position }) => {
        return (
            <div className="piece-tooltip" style={{ top: position.y, left: position.x }}>
                {text}
            </div>
        );
    };

    return (
        <div className='analysis-tool-container'>
            <button 
                onClick={handlePlayClick} 
                className='play-button'
                disabled={gameStarted}
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
                                className={`tile ${selectedPiece?.position?.row === row && selectedPiece?.position?.col === col ? 'selected' : ''}`}
                                onClick={() => handleTileClick(row, col)}
                                onDrop={(e) => handleDrop(e, row, col)}
                                onDragOver={allowDrop}
                            >
                                {piece ? (
                                    <img
                                        src={piece.src}
                                        alt={piece.name}
                                        className='piece-image'
                                        draggable={true}
                                        onDragStart={(e) => {
                                            e.dataTransfer.setData("pieceId", piece.id);
                                        }}
                                        onMouseEnter={(e) => {
                                            setTooltip({ visible: true, text: piece.name, position: { x: e.clientX, y: e.clientY } });
                                        }}
                                        onMouseLeave={() => setTooltip({ visible: false, text: '', position: { x: 0, y: 0 } })}
                                    />
                                ) : null}
                            </div>
                        );
                    })
                )}
                {tooltip.visible && <Tooltip text={tooltip.text} position={tooltip.position} />}
            </div>

            <div className='analysis-container'>
            <h3>Suggested Moves for {selectedPiece ? selectedPiece.name : 'Selected Piece'}</h3>
                <div className='suggested-moves'>
                    {selectedPiece ? (
                        suggestedMoves.length > 0 ? (
                            suggestedMoves.map((move, index) => (
                                <div key={index} className="suggested-move-item">
                                    <p>
                                        <strong>Move {index + 1}:</strong> Move {selectedPiece.name} to ({move.position.row}, {move.position.col}) 
                                        - Probability: {move.confidence}%
                                    </p>
                                    <p className="move-description">{move.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>No valid moves available for this piece.</p>
                        )
                    ) : (
                        <p>Select a piece to see suggested moves.</p>
                    )}
                    </div>
            </div>
        </div>
    );
};

export default AnalysisTool;