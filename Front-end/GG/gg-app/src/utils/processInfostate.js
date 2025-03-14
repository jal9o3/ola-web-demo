export const processInfostate = (current_infostate, humanColor, rankHierarchy, initialPieces, BLUE_FLAG, BLUE_SPY, RED_FLAG, RED_SPY) => {
  const newPieces = [];
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 9; col++) {
      if (
        current_infostate[row][col][0] === 0 &&
        current_infostate[row][col][1] === 0
      ) {
        // Empty tile
      } else if (
        current_infostate[row][col][0] >= BLUE_FLAG &&
        current_infostate[row][col][0] <= BLUE_SPY &&
        current_infostate[row][col][1] >= BLUE_FLAG &&
        current_infostate[row][col][1] <= BLUE_SPY &&
        humanColor === "blue"
      ) {
        const pieceName = Object.keys(rankHierarchy).find(
          (key) => rankHierarchy[key] === current_infostate[row][col][0]
        );
        const piece = initialPieces.find(
          (p) => p.name === pieceName && p.team === humanColor
        );
        newPieces.push({
          id: pieceName,
          name: pieceName,
          src: piece ? piece.src : null,
          position: { row, col },
          team: humanColor,
        });
      } else if (
        current_infostate[row][col][0] >= BLUE_FLAG &&
        current_infostate[row][col][0] <= BLUE_SPY &&
        current_infostate[row][col][1] >= BLUE_FLAG &&
        current_infostate[row][col][1] <= BLUE_SPY &&
        humanColor === "red"
      ) {
        newPieces.push({
          id: `opponent-${row}-${col}`,
          name: null,
          src: null,
          position: { row, col },
          team: "blue",
        });
      } else if (
        current_infostate[row][col][0] >= RED_FLAG &&
        current_infostate[row][col][0] <= RED_SPY &&
        current_infostate[row][col][1] >= RED_FLAG &&
        current_infostate[row][col][1] <= RED_SPY &&
        humanColor === "red"
      ) {
        const pieceName = Object.keys(rankHierarchy).find(
          (key) =>
            rankHierarchy[key] === current_infostate[row][col][0] - BLUE_SPY
        );
        const piece = initialPieces.find(
          (p) => p.name === pieceName && p.team === humanColor
        );
        newPieces.push({
          id: pieceName,
          name: pieceName,
          src: piece ? piece.src : null,
          position: { row, col },
          team: humanColor,
        });
      } else if (
        current_infostate[row][col][0] >= RED_FLAG &&
        current_infostate[row][col][0] <= RED_SPY &&
        current_infostate[row][col][1] >= RED_FLAG &&
        current_infostate[row][col][1] <= RED_SPY &&
        humanColor === "blue"
      ) {
        newPieces.push({
          id: `opponent-${row}-${col}`,
          name: null,
          src: null,
          position: { row, col },
          team: "red",
        });
      }
    }
  }
  return newPieces;
};