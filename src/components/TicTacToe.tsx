import * as React from "react";
import {useState} from "react";
import {checkWinner, getEmptyCells} from "../utils";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import '../App.css';
import {Column} from './Column';
import {Cell} from './Cell';
import {useSelector, shallowEqual} from "react-redux";
import {TicTacToeState} from "../type";

interface TicTacToeProps {
    scale?: number;
    robotTimeout: number;
    saveBoard: (scale: number) => {};
    changeBoard: (col: number, row: number, value: string) => {}
}

export function TicTacToe({scale, robotTimeout, saveBoard, changeBoard}: TicTacToeProps) {
    const board: readonly string[][] = useSelector(
        (state: TicTacToeState) => state.board,
        shallowEqual
    )
    const [humanTurn, setHumanTurn] = React.useState<boolean>(true);
    const [winner, setWinner] = useState<'Robot' | 'Human' | 'Tie' | null>(null);

    React.useEffect(() => {
        saveBoard(scale);
    }, [scale]);
    React.useEffect(() => {
        if (!humanTurn) {
            setTimeout(() => {
                let emptyCells: { row: number, col: number } [] = getEmptyCells(JSON.parse(JSON.stringify(board)))
                const randomIndex: number = Math.floor(Math.random() * emptyCells.length);
                const randomCell: { row: number, col: number } = emptyCells[randomIndex];
                changeBoard(randomCell.col, randomCell.row, 'O');
                setHumanTurn(true);
            }, robotTimeout)
        }
    }, [humanTurn])
    React.useEffect(() => {
        const winner = checkWinner(board, scale);
        if (winner) {
            setWinner(winner);
        } else if (getEmptyCells(board)?.length === 0 && !winner) {
            setWinner('Tie');
        }
    }, [board]);
    const handleModalClose = () => {
        saveBoard(scale);
        setHumanTurn(true);
        setWinner(null);
    }
    const handleChange = (row: number, column: number) => {
        if (!humanTurn || board[column][row] !== '') {
            return;
        }

        changeBoard(column, row, 'X');
        setHumanTurn(false);
    }

    return (
        <div className={"container"}>
            <>
                {board.map((c, idx) => {
                    const cells = board[idx];
                    return (
                        <Column key={idx}>
                            {cells.map((cell: string, idy: number) => (
                                <Cell value={cell} column={idx} row={idy} key={idy} onChange={handleChange}/>))}
                        </Column>)
                })}
            </>
            <Dialog
                open={!!winner}
                onClose={handleModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {winner === 'Human' && 'You win'}
                    {winner === 'Robot' && 'You lose'}
                    {winner === 'Tie' && 'It is a tie!'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You can start the game again. Good luck!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose}>Start again</Button>
                </DialogActions>
            </Dialog>
        </div>)
}
