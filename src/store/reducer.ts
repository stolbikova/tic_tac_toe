import * as actionTypes from "./actionTypes"
import {BoardAction, TicTacToeState} from "../type";

const DEFAULT_SCALE = 3;
const initialState: TicTacToeState = {
    board: new Array(DEFAULT_SCALE).fill(new Array(DEFAULT_SCALE).fill(""))
}

const reducer = (
    state: TicTacToeState = initialState,
    action: BoardAction
): TicTacToeState => {
    switch (action.type) {
        case actionTypes.CHANGE_BOARD:
            const newBoard: string[][] = JSON.parse(JSON.stringify(state.board));
            newBoard[action.col][action.row] = action.value;

            return {
                ...state,
                board: newBoard
            }
        case actionTypes.SAVE_BOARD:
            return {
                ...state,
                board: new Array(action.scale).fill(new Array(action.scale).fill(""))
            }

    }
    return state
}

export default reducer
