import * as React from "react";

interface CellProps {
    row: number;
    column: number;
    status?: 'Human' | "Robot" | null;
    onChange: (row: number, column: number) => void;
    value: string;
}

export const Cell: React.FC<CellProps> = ({row, column, value, onChange}) => {
    const handlePlay = (row: number, col: number) => {
        onChange(row, column);
    }

    return (
        <div className={"cell"} onClick={() => handlePlay(row, column)}>
            <span>{value}</span>
        </div>
    )
}
