import React, { useState } from 'react';
import './Board.css';

// Import images from assets
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
import Captain from '../../assets/Captainb.png';
import Captainb from '../../assets/Captainb.png'
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
import Lieucolb from '../../assets/Lieucolb.png'

const initialPieces = [
    { id: 1, name: "Gen5", src: Gen5, position: { row: 0, col: 0 } },
    { id: 2, name: "Gen5b", src: Gen5b, position: { row: 0, col: 1 } },
    { id: 3, name: "Gen4", src: Gen4, position: { row: 0, col: 2 } },
    { id: 4, name: "Gen4b", src: Gen4b, position: { row: 0, col: 3 } },
    { id: 5, name: "Gen3", src: Gen3, position: { row: 0, col: 4 } },
    { id: 6, name: "Gen3b", src: Gen3b, position: { row: 0, col: 5 } },
    { id: 7, name: "Gen2", src: Gen2, position: { row: 0, col: 6 } },
    { id: 8, name: "Gen2b", src: Gen2b, position: { row: 0, col: 7 } },
    { id: 9, name: "Gen1", src: Gen1, position: { row: 0, col: 8 } },
    { id: 10, name: "Gen1b", src: Gen1b, position: { row: 1, col: 0 } },
    { id: 11, name: "Flag", src: Flag, position: { row: 1, col: 1 } },
    { id: 12, name: "Flagb", src: Flagb, position: { row: 1, col: 2 } },
    { id: 13, name: "Colonel", src: Colonel, position: { row: 1, col: 3 } },
    { id: 14, name: "Colonelb", src: Colonelb, position: { row: 1, col: 4 } },
    { id: 15, name: "Captain", src: Captain, position: { row: 1, col: 5 } },
    { id: 16, name: "Captainb", src: Captainb, position: { row: 1, col: 6 } },
    { id: 17, name: "Lieu1st", src: Lieu1st, position: { row: 1, col: 7 } },
    { id: 18, name: "Lieu1stb", src: Lieu1stb, position: { row: 1, col: 8 } },
    { id: 19, name: "Lieu2nd", src: Lieu2nd, position: { row: 2, col: 0 } },
    { id: 20, name: "Lieu2ndb", src: Lieu2ndb, position: { row: 2, col: 1 } },
    { id: 21, name: "Spy", src: Spy, position: { row: 2, col: 2 } },
    { id: 22, name: "Spyb", src: Spyb, position: { row: 2, col: 3 } },
    { id: 23, name: "Major", src: Major, position: { row: 2, col: 4 } },
    { id: 24, name: "Majorb", src: Majorb, position: { row: 2, col: 5 } },
    { id: 25, name: "Private", src: Private, position: { row: 2, col: 6 } },
    { id: 26, name: "Privateb", src: Privateb, position: { row: 2, col: 7 } },
    { id: 27, name: "Sergeant", src: Sergeant, position: { row: 2, col: 8 } },
    { id: 28, name: "Sergeantb", src: Sergeantb, position: { row: 3, col: 6 } },
    { id: 29, name: "Lieucol", src: Lieucol, position: { row: 3, col: 7 } },
    { id: 30, name: "Lieucolb", src: Lieucolb, position: { row: 3, col: 8 } },
];

const Board = () => {
    const [pieces] = useState(initialPieces);

    return (
        <div className='board'>
            <div className='tiles'>
                {Array.from({ length: 8 }).map((_, row) =>
                    Array.from({ length: 9 }).map((_, col) => {
                        const piece = pieces.find(p => p.position.row === row && p.position.col === col);
                        return (
                            <div key={`${row}-${col}`} className='tile'>
                                {piece && <img src={piece.src} alt={piece.name} className='piece-image' />}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Board;
