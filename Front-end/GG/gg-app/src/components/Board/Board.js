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

const initialPieces = [
    { id: 1, name: "5-star General", src: Gen5b, position: null },
    { id: 2, name: "4-star General", src: Gen4b, position: null },
    { id: 3, name: "3-star General", src: Gen3b, position: null },
    { id: 4, name: "2-star General", src: Gen2b, position: null },
    { id: 5, name: "1-star General", src: Gen1b, position: null },
    { id: 6, name: "Flag", src: Flagb, position: null },
    { id: 7, name: "Colonel", src: Colonelb, position: null },
    { id: 8, name: "Captain", src: Captainb, position: null },
    { id: 9, name: "1st Lieutenant", src: Lieu1stb, position: null },
    { id: 10, name: "2nd Lieutenant", src: Lieu2ndb, position: null },
    { id: 11, name: "Spy", src: Spyb, position: null },
    { id: 12, name: "Major", src: Majorb, position: null },
    { id: 13, name: "Private", src: Privateb, position: null },
    { id: 14, name: "Sergeant", src: Sergeantb, position: null },
    { id: 15, name: "Lieucol", src: Lieucolb, position: null },
];

const Board = () => {
    const [pieces, setPieces] = useState(initialPieces);
    const [gameStarted, setGameStarted] = useState(false);
    const [selectedPiece, setSelectedPiece] = useState(null);

    const handleTileClick = (row, col) => {
        if (!gameStarted) return;

        if (selectedPiece) {
            const { position } = selectedPiece;

            // Allow moves only Up, Left, or Right (one tile)
            const isValidMove =
                (row === position.row - 1 && col === position.col) ||  // Up
                (row === position.row && col === position.col - 1) ||  // Left
                (row === position.row && col === position.col + 1);    // Right

            if (isValidMove) {
                setPieces(prevPieces =>
                    prevPieces.map(p =>
                        p.id === selectedPiece.id ? { ...p, position: { row, col } } : p
                    )
                );
            }
            setSelectedPiece(null); // Deselect piece after move
        } else {
            const piece = pieces.find(p => p.position?.row === row && p.position?.col === col);
            if (piece) setSelectedPiece(piece);
        }
    };

    const handleDrop = (e, row, col) => {
        e.preventDefault();
        if (gameStarted) return; // Disable drag-and-drop after game starts

        const pieceId = e.dataTransfer.getData("pieceId");
        if (!pieceId) return;

        if (!gameStarted && (row < 5 || row > 7)) {
            alert("You can only place pieces in rows 5, 6, and 7 before the game starts!");
            return;
        }

        const existingPiece = pieces.find(p => p.position?.row === row && p.position?.col === col);
        if (existingPiece) {
            alert("This tile is already occupied! Choose another spot.");
            return; // Prevent overlapping
        }

        setPieces(prevPieces =>
            prevPieces.map(piece =>
                piece.id.toString() === pieceId ? { ...piece, position: { row, col } } : piece
            )
        );
    };

    const handleDragStart = (e, pieceId) => {
        e.dataTransfer.setData("pieceId", pieceId);
    };

    const allowDrop = (e) => e.preventDefault();

    const allPiecesPlaced = pieces.every(piece => piece.position !== null);

    return (
        <div className='board-container'>
            <button 
                onClick={() => setGameStarted(true)} 
                className={`play-button ${allPiecesPlaced ? '' : 'disabled'}`}
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
                                className={`tile ${selectedPiece?.position?.row === row && selectedPiece?.position?.col === col ? 'selected' : ''}`}
                                onClick={() => handleTileClick(row, col)}
                                onDrop={(e) => handleDrop(e, row, col)}
                                onDragOver={allowDrop}
                            >
                                {piece && (
                                    <img
                                        src={piece.src}
                                        alt={piece.name}
                                        className='piece-image'
                                        draggable={!gameStarted}
                                        onDragStart={(e) => handleDragStart(e, piece.id)}
                                    />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
            <div className='piece-selection'>
                <h3>Available Pieces</h3>
                <div className='pieces-list'>
                    {pieces
                        .filter(piece => piece.position === null)
                        .map(piece => (
                            <img
                                key={piece.id}
                                src={piece.src}
                                alt={piece.name}
                                className='piece-image'
                                draggable={!gameStarted}
                                onDragStart={(e) => handleDragStart(e, piece.id)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Board;