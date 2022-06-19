function getPrincipalDiagonal(input: string [][], scale: number): string[] {
    const result: string[] = [];
    for (let i = 0; i < scale; i++) {
        for (let j = 0; j < scale; j++) {

            // Condition for principal diagonal
            if (i == j) {
                result.push(input[i][j]);
            }
        }
    }

    return result;
}
function getSecondaryDiagonal(input: string [][], scale: number): string[] {
    const result: string[] = [];

    for (let i = 0; i < scale; i++) {
        for (let j = 0; j < scale; j++) {

            // Condition for secondary diagonal
            if ((i + j) == (scale - 1)) {
                result.push(input[i][j]);
            }
        }
    }

    return result;
}

export function checkWinner(board: string [] [], scale: number): 'Human' | 'Robot' | null {
    for (let i = 0; i < board.length; i++) {
        const col = board[i];
        if (col.every((cell) => cell === "O")) {
            return 'Robot';
        } else if (col.every((cell) => cell === "X")) {
            return 'Human';
        }
    }
    for (let i = 0; i < scale; i++) {
        const row = board.map((row) => row[i]);
        if (row.every((cell) => cell === 'O')) {
            return 'Robot';
        } else if (row.every((cell) => cell === "X")) {
            return 'Human';
        }
    }

    const diagonal1 = getPrincipalDiagonal(board, scale);
    const diagonal2 = getSecondaryDiagonal(board, scale);

    if (diagonal1.every((cell) => cell === "O")) {
        return 'Robot';
    } else if (diagonal1.every((cell) => cell === "X")) {
        return "Human";
    } else if (diagonal2.every((cell) => cell === "O")) {
        return 'Robot';
    } else if (diagonal2.every((cell) => cell === "X")) {
        return 'Human';
    }

    return null;
}

export function getEmptyCells(board: string [] []) {
    let emptyCells: { row: number, col: number } [] = [];

    board.forEach((col, idx) => {
        col.forEach((cell, idy) => {
            if (cell === '') {
                emptyCells.push({col: idx, row: idy});
            }
        })
    })

    return emptyCells;
}

export function playRobot(board: string [] []): string [] [] {
    const newBoard: string [] [] = JSON.parse(JSON.stringify(board));
    let emptyCells: { row: number, col: number } [] = getEmptyCells(newBoard)
    const randomIndex: number = Math.floor(Math.random() * emptyCells.length);
    const randomCell: { row: number, col: number } = emptyCells[randomIndex];
    newBoard[randomCell.col][randomCell.row] = 'O';

    return newBoard;
}
