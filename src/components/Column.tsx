import {ReactElement} from "react";
import * as React from "react";

interface ColumnProps {
    children?: ReactElement [];
}

export const Column: React.FC<ColumnProps> = ({children}) => {
    return (<div>{children}</div>)
}
