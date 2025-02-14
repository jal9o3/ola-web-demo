export const getCharacter = file => String.fromCharCode(file + 96)

export const createPosition = () => {
    const position = new Array(8).fill('').map(x=> new Array(9).fill(''))
    console.log(position)
    
    position[7][2] = 'Captain'
    position[7][0] = 'Major'
    position[2][6] = 'Spy'

    return position
}

export const copyPosition = position => {
    const newPosition = new Array(8).fill('').map(x=> new Array(9).fill(''))

    for (let rank = 0; rank <8; rank++) {
        for (let file = 0; file < 9; file++) {
            newPosition[rank][file] = position[rank][file]
        }
        return newPosition
    }
}
