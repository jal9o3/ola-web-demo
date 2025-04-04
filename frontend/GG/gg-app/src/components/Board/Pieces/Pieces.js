import './Pieces.css'
import Piece from './Piece'
import {useState, useRef} from 'react';
import { createPosition, copyPosition} from '../../../helper'

const Pieces = () => {

    const ref = useRef()

    const [state, setState] = useState(createPosition())

    const calculateCoords = e => {
        const { width, left, top } = ref.current.getBoundingClientRect();
        const size = width / 9;
    
        const y = Math.floor((e.clientX - left) / size);
        const x = Math.floor((e.clientY - top) / size);
    
        return { x, y };
    };      

const onDrop = e => {
    const newPosition = copyPosition(state);
    const { x, y } = calculateCoords(e);
    const [p, rank, file] = e.dataTransfer.getData('text/plain').split(',');

    console.log(`Moving piece ${p} from (${rank}, ${file}) to (${x}, ${y})`);

    newPosition[rank][file] = '';  
    newPosition[x][y] = p;

    console.log('New Board State:', newPosition);
    setState(newPosition);
};


    const onDragOver = e => e.preventDefault()

    return <div 
    ref={ref}
    onDrop={onDrop}
    onDragOver={onDragOver}
    className = 'pieces'>
        {state.map((r,rank) =>
        r.map((f,file) =>
            state[rank][file]
            ? <Piece
                key={rank+'-'+file}
                rank={rank}
                file={file}
                piece={state[rank][file]}
                />
            : null
        ))}
    </div>
}


export default Pieces
