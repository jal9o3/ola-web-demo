import './Board.css'
import Ranks from './bits/Ranks'
import Files from './bits/Files'
import Pieces from './Pieces/Pieces';

const getClassName = (rank, file) => {
    // Define logic for className based on rank and file
    // For example, you could return different class names for different conditions
    return "tile";  // Simply return a class name here
  };

const Board = () => {
    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(9).fill().map((x,i) => i+1)

    console.log("Ranks:", ranks); // Debugging
    console.log("Files:", files); // Debugging

    return ( <div className='board'>
        <Ranks ranks={ranks}/>
            <div className='tiles'>
                {ranks.map((rank, i) =>
                    files.map((file, j) =>
                        <div key={file + '-' + rank} className={getClassName(9-1, j)}>
                        </div>
                    )
                )}
            </div>
            <Pieces/>
            <Files files={files}/>
        </div>
    )
}

export default Board
