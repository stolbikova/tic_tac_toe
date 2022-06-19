import * as React from "react";
import * as ReactDOM from "react-dom";
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore, Store} from "redux";
import {BoardAction, DispatchType, TicTacToeState} from "./type";
import reducer from "./store/reducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";

const store: Store<TicTacToeState, BoardAction> & {
    dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);

reportWebVitals();
