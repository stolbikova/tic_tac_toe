export type TicTacToeState = {
    board: string [][];
}

type BoardAction = {
    type: string;
    col: number;
    row: number;
    value: string;
    scale: number;
}
type DispatchType = (args: BoardAction) => BoardAction
