import * as React from "react";
import {useState} from "react";
import {checkWinner, getEmptyCells, playRobot} from "../utils";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import '../App.css';
import {Column} from './Column';
import {Cell} from './Cell';

interface TicTacToeProps {
    scale?: number;
    robotTimeout: number;
}

const GET_DEFAULT_BOARD = (scale: number) => new Array(scale).fill(new Array(scale).fill(""));

export function TicTacToe({scale, robotTimeout}: TicTacToeProps) {
    const [board, setBoard] = React.useState<string [] []>(GET_DEFAULT_BOARD(scale));
    const [humanTurn, setHumanTurn] = React.useState<boolean>(true);
    const [winner, setWinner] = useState<'Robot' | 'Human' | 'Tie' | null>(null);

    React.useEffect(() => {
        setBoard(GET_DEFAULT_BOARD(scale));
    }, [scale]);
    React.useEffect(() => {
        if (getEmptyCells(board)?.length === 0 && !checkWinner(board, scale)) {
            setWinner('Tie');
        }
    }, [board]);
    const handleModalClose = () => {
        setBoard(GET_DEFAULT_BOARD(scale));
        setHumanTurn(true);
        setWinner(null);
    }
    const handleChange = (row: number, column: number) => {
        if (!humanTurn || board[column][row] !== '') {
            return;
        }

        // deep copy
        const newBoard: string [][] = JSON.parse(JSON.stringify(board));
        newBoard[column][row] = 'X';
        setBoard([...newBoard]);
        setHumanTurn(false);


        // TODO: check winner
        if (checkWinner(newBoard, scale) === 'Human') {
            setWinner('Human');
            return;
        }

        setTimeout(() => {
            // Robot turn
            const tmpBoard: string [][] = playRobot(newBoard);
            setBoard([...tmpBoard]);

            if (checkWinner(tmpBoard, scale) === 'Robot') {
                setWinner('Robot');
                return;
            }
            setHumanTurn(true);
        }, robotTimeout)
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
