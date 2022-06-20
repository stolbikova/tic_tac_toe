import * as React from "react";
import './App.css';
import {TicTacToe} from "./components/TicTacToe";
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {Dispatch} from "redux";
import {useDispatch} from "react-redux";
import {changeBoard, saveBoard} from "./store/actionCreators";

const DEFAULT_SCALE = 3;
const ROBOT_TIMEOUT = 1000;

export function App() {
    const [scale, setScale] = useState<number>(DEFAULT_SCALE);
    const [error, setError] = useState<boolean>(false);

    const dispatch: Dispatch<any> = useDispatch();
    const chBoard = React.useCallback(
        (col: number, row: number, value: string) => dispatch(changeBoard(col, row, value)),
        [dispatch]
    );
    const svBoard = React.useCallback(
        (scale: number) => dispatch(saveBoard(scale)),
        [dispatch]
    );
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
        const value: number = Number(e.target.value);

        if (value > 2) {
            setScale(value);
            setError(false);
        } else {
            setError(true);
        }
    }

    return (
        <div className="app">
            <TextField
                onChange={handleChange}
                error={error}
                label="Scale"
                helperText={error ? "Invalid number. Please enter number >= 3" : ""}
            />
            <TicTacToe scale={scale} robotTimeout={ROBOT_TIMEOUT} saveBoard={svBoard} changeBoard={chBoard} />
        </div>
    );
}
