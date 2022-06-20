function getPrincipalDiagonal(input: readonly string [][], scale: number): string[] {
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
function getSecondaryDiagonal(input: readonly string [][], scale: number): string[] {
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

export function checkWinner(board: readonly string [] [], scale: number): 'Human' | 'Robot' | null {
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

export function getEmptyCells(board: readonly string [] []) {
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
