import './Board.css';
import Ranks from './bits/Ranks';
import Files from './bits/Files';
import Pieces from './Pieces/Pieces';

const getClassName = (rank, file) => {
    // You can modify this function to return different class names based on the rank & file
    return "tile";
};

const Board = () => {
    // Generate rank labels (8 to 1)
    const ranks = Array.from({ length: 8 }, (_, i) => 8 - i);
    
    // Generate file labels (1 to 9)
    const files = Array.from({ length: 9 }, (_, i) => i + 1);

    console.log("Ranks:", ranks); // Debugging
    console.log("Files:", files); // Debugging

    return (
        <div className='board'>
                    <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22f1b63660476b3583838e2006560d0eb1c4da0fa34c43f42de47994a2ea3c4a?placeholderIfAbsent=true&apiKey=495cfffe0c9a47b6b0144a560efce18c"
                className="backgroundImage"
                alt=""
                role="presentation"
            />
            <Ranks ranks={ranks} />
            <div className='tiles'>
                {ranks.map((rank) =>
                    files.map((file) => (
                        <div key={`${file}-${rank}`} className={getClassName(rank, file)}>
                        </div>
                    ))
                )}
            </div>
            <Pieces />
            <Files files={files} />
        </div>
    );
};

export default Board;
