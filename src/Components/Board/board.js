import React from 'react';
import './board.css';
import Row from '../Row/row';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {boardSize, board} = this.props;

        let rows = [];
        for(let i=0 ; i<boardSize ; i++) {
            rows.push(<Row key = {i} boardSize = {boardSize} cellValues = {board[i]}/>);
        }

        return (
            <div className = "board">
                {rows}
            </div>
        );
    }
}

export default Board;