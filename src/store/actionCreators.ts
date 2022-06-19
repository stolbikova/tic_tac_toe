import * as actionTypes from "./actionTypes"

export function changeBoard(col: number, row: number, value: string) {
    return {
        type: actionTypes.CHANGE_BOARD,
        col,
        row,
        value
    }
}
export function saveBoard(scale: number) {
    return {
        type: actionTypes.SAVE_BOARD,
        scale
    }
}
